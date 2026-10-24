import {questionsFor, makePlan} from './assessment.js';

export const STORAGE_VERSION = 1;
export const freshAssessment = (goal = '') => ({step:0, goal, hours:3, weeks:4, evidence:false, live:false, language:'English', answers:{}});
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function fingerprint(value) {
  let hash = 2166136261;
  for (const char of JSON.stringify(value)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(36);
}
export const assessmentVersion = data => fingerprint([data.questions, data.paths.map(p=>[p.id,p.domains])]);
export const stepKey = (path, step) => `${path.id}:${step.order}:${fingerprint([step.text,step.hours])}`;
export const pathSignature = path => JSON.stringify([path.steps.map(step=>stepKey(path,step)),path.outcome]);
export const storageKey = pathname => `industrial-ai:${pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/'}:learning:v1`;
export const blankProgress = data => ({version:STORAGE_VERSION, questionVersion:assessmentVersion(data), draft:freshAssessment(), savedPlan:null, completedCourses:{}, completedSteps:{}, completedChecks:{}, completedPaths:{}, lastPathId:'', lastRoute:'#home', lastLearningRoute:'', updatedAt:null});

export function safeRoute(data, route) {
  if (typeof route !== 'string' || route.length>1500) return '#home';
  const [base] = route.split('?');
  if (['#home','#paths','#courses','#assessment','#plan','#progress'].includes(base)) return base==='#assessment' ? base : route;
  const [kind,id] = base.slice(1).split('/');
  if (kind==='paths' && data.paths.some(p=>p.id===id) || kind==='courses' && data.courses.some(c=>c.id===id) || kind==='guide' && Object.hasOwn(data.guides,id)) return route;
  return '#home';
}

export function normalizeDraft(data, raw) {
  if (!record(raw) || !data.paths.some(p=>p.id===raw.goal)) return freshAssessment();
  const draft=freshAssessment(raw.goal);
  if (Number.isFinite(raw.hours) && raw.hours>=.5 && raw.hours<=40) draft.hours=raw.hours;
  if (Number.isInteger(raw.weeks) && raw.weeks>=1 && raw.weeks<=52) draft.weeks=raw.weeks;
  draft.evidence=raw.evidence===true;draft.live=raw.live===true;
  if(raw.language==='German')draft.language='German';
  const questions=questionsFor(data,draft.goal);
  for(const q of questions) {
    const answer=raw.answers?.[q.id];
    if(answer===null || Number.isInteger(answer) && answer>=0 && answer<q.options.length) draft.answers[q.id]=answer;
  }
  draft.step=Number.isInteger(raw.step) ? Math.max(0,Math.min(raw.step,questions.length+1)) : 0;
  // Resume at the first unanswered earlier question if content or storage was edited.
  const missing=questions.findIndex(q=>!Object.hasOwn(draft.answers,q.id));
  if(missing>=0)draft.step=Math.min(draft.step,missing+2);
  return draft;
}

export function normalizeProgress(data, raw) {
  if(!record(raw) || raw.version!==STORAGE_VERSION)throw new Error('This backup has an unsupported format.');
  const state=blankProgress(data);
  if(raw.questionVersion===state.questionVersion){
    state.draft=normalizeDraft(data,raw.draft);
    if(record(raw.savedPlan)){
      const snapshot=normalizeDraft(data,raw.savedPlan);
      try {makePlan(data,snapshot,snapshot.answers);state.savedPlan=snapshot;} catch { /* An incomplete snapshot is not a plan. */ }
    }
  }
  for(const c of data.courses)if(raw.completedCourses?.[c.id]===true)state.completedCourses[c.id]=true;
  for(const path of data.paths)for(const step of path.steps){const key=stepKey(path,step);if(raw.completedSteps?.[key]===true)state.completedSteps[key]=true;}
  for(const path of data.paths)if(raw.completedPaths?.[path.id]===pathSignature(path) && path.steps.every(step=>state.completedSteps[stepKey(path,step)]))state.completedPaths[path.id]=pathSignature(path);
  if(raw.completedChecks?.['python-utility']===true)state.completedChecks['python-utility']=true;
  if(data.paths.some(p=>p.id===raw.lastPathId))state.lastPathId=raw.lastPathId;
  state.lastRoute=safeRoute(data,raw.lastRoute);
  const learning=safeRoute(data,raw.lastLearningRoute);
  state.lastLearningRoute=/^#(?:paths|courses|guide)\//.test(learning)?learning:'';
  if(typeof raw.updatedAt==='string' && Number.isFinite(Date.parse(raw.updatedAt)))state.updatedAt=raw.updatedAt;
  if(typeof raw.restoreId==='string' && /^[a-zA-Z0-9_-]{1,80}$/.test(raw.restoreId))state.restoreId=raw.restoreId;
  return state;
}

// Read before applying each intent, so another tab's independent updates survive.
// A denied/quota-limited storage API falls back to a working in-memory session.
export function createProgressStore(data, getStorage, key) {
  let state=blankProgress(data), status='ready';
  function load(){
    if(status!=='ready')return state;
    try {
      const raw=getStorage().getItem(key);
      if(raw===null)state=blankProgress(data);
      else {
        try {state=normalizeProgress(data,JSON.parse(raw));}
        catch {status='invalid';}
      }
    }catch{status='unavailable';}
    return state;
  }
  function update(change){
    load();
    const next=structuredClone(state);change(next);
    next.updatedAt=new Date().toISOString();
    state=normalizeProgress(data,next);
    if(status==='ready')try{getStorage().setItem(key,JSON.stringify(state));}catch{status='unavailable';}
    return state;
  }
  function clear(){
    const restoreId=state.restoreId;
    state=blankProgress(data);
    // Keep only a completed-restore marker if journal cleanup was interrupted.
    // Otherwise a later recovery could resurrect the progress just cleared.
    if(restoreId)state.restoreId=restoreId;
    try{if(restoreId)getStorage().setItem(key,JSON.stringify(state));else getStorage().removeItem(key);status='ready';}catch{status='unavailable';}
    return state;
  }
  function refresh(){status='ready';load();return state;}
  function replace(next){
    state=normalizeProgress(data,next);status='ready';
    try{getStorage().setItem(key,JSON.stringify(state));}catch{status='unavailable';}
    return state;
  }
  return {load,update,clear,refresh,replace,get status(){return status;},get state(){return state;}};
}

// A course mark does not complete a path's exercises. Follow the plan's ordered
// prerequisites, then the first unchecked study block within each path.
export function nextLearningStep(data, state, pathId = '') {
  const findPath = id => data.paths.find(p=>p.id===id);
  const nextInPath = path => {
    const step=path.steps.find(s=>!state.completedSteps[stepKey(path,s)]);
    return step ? {kind:'step', pathId:path.id, order:step.order, title:`${path.title} · study block ${step.order}`, href:`#paths/${path.id}?step=${step.order}`} : null;
  };
  const finished = path => ({kind:'complete',pathId:path.id,title:state.completedPaths?.[path.id]===pathSignature(path)?`${path.title}: path finished`:`${path.title}: all study blocks complete`,href:`#paths/${path.id}?step=exit`});
  if(pathId){const path=findPath(pathId);return path ? nextInPath(path)||finished(path) : null;}
  if(state.savedPlan){
    const plan=makePlan(data,state.savedPlan,state.savedPlan.answers);
    for(const block of plan.blocks){
      const path=findPath(block.id);
      if(path){const next=nextInPath(path);if(next)return next;if(state.completedPaths?.[path.id]!==pathSignature(path))return finished(path);}
      else if(block.id==='practice'){
        if(!state.completedChecks?.['python-utility'])return {kind:'practice',title:'Confirm your Python skills in practice',href:'#guide/practice?section=b1-sensor-data-contract&check=python-utility'};
      }else if(!state.completedCourses[block.id]){
        const course=data.courses.find(c=>c.id===block.id);
        return {kind:'course',courseId:course.id,title:`Prerequisite: ${course.title}`,href:`#courses/${course.id}`};
      }
    }
    return finished(findPath(plan.settings.goal));
  }
  const recentId=state.lastLearningRoute?.match(/^#paths\/([^?]+)/)?.[1];
  const path=findPath(state.lastPathId)||findPath(recentId)||data.paths.find(p=>p.steps.some(s=>state.completedSteps[stepKey(p,s)]))||findPath(state.draft?.goal);
  return path ? nextInPath(path)||finished(path) : null;
}
