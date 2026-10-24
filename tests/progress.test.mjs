import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshAssessment, blankProgress, normalizeDraft, normalizeProgress, createProgressStore, storageKey, stepKey} from '../web/progress.js';
import {questionsFor, makePlan} from '../web/assessment.js';
const data=JSON.parse(readFileSync(new URL('../_site/data.json',import.meta.url)));
const key=storageKey('/OnlineCourses/');
function memoryStorage(){
  const entries=new Map();
  return {getItem:k=>entries.get(k)??null,setItem:(k,v)=>entries.set(k,v),removeItem:k=>entries.delete(k),entries};
}
function completedDraft(goal='W2'){
  return {...freshAssessment(goal),step:questionsFor(data,goal).length+1,answers:Object.fromEntries(questionsFor(data,goal).map(q=>[q.id,q.correct]))};
}

test('draft selections, location, completed courses and blocks survive a fresh store',()=>{
  const disk=memoryStorage(),store=createProgressStore(data,()=>disk,key);
  const draft={...freshAssessment('D3'),step:3,hours:2,language:'German',answers:{[questionsFor(data,'D3')[0].id]:null}};
  const path=data.paths.find(p=>p.id==='D3'),step=stepKey(path,path.steps[0]);
  store.update(s=>{s.draft=draft;s.completedCourses.C11=true;s.completedSteps[step]=true;s.lastRoute='#assessment';});
  const restored=createProgressStore(data,()=>disk,key).load();
  assert.deepEqual(restored.draft,draft);
  assert.equal(restored.completedCourses.C11,true);assert.equal(restored.completedSteps[step],true);assert.equal(restored.lastRoute,'#assessment');
});

test('a new assessment does not erase a saved plan or course completions',()=>{
  const disk=memoryStorage(),store=createProgressStore(data,()=>disk,key);
  store.update(s=>{s.savedPlan=completedDraft();s.completedCourses.C31=true;});
  store.update(s=>{s.draft=freshAssessment('D1');});
  const restored=createProgressStore(data,()=>disk,key).load();
  assert.equal(restored.draft.goal,'D1');assert.equal(restored.savedPlan.goal,'W2');assert.equal(restored.completedCourses.C31,true);
  assert.equal(makePlan(data,restored.savedPlan,restored.savedPlan.answers).settings.goal,'W2');
});

test('invalid data cannot create completion, quiz scores, or external resume links',()=>{
  const state=blankProgress(data);state.draft={goal:'D3',hours:Infinity,weeks:-5,step:999,answers:{Q1:99}};
  state.savedPlan={goal:'D3',scores:{python:2}};state.completedCourses={C11:true,C12:'yes',HACK:true};state.lastRoute='https://example.org';
  const clean=normalizeProgress(data,state);
  assert.deepEqual(clean.completedCourses,{C11:true});assert.equal(clean.savedPlan,null);assert.equal(clean.lastRoute,'#home');assert.equal(clean.draft.step,2);
  assert.equal(clean.draft.hours,3);assert.equal(clean.draft.weeks,4);
  for(const invalid of [null,[],{}, {version:999}])assert.throws(()=>normalizeProgress(data,invalid),/format/);
});

test('assessment changes reset stale answers but retain resource progress',()=>{
  const state=blankProgress(data);state.draft=completedDraft();state.savedPlan=completedDraft();state.completedCourses.C31=true;
  const changed=structuredClone(data);changed.questions[0].prompt+=' Changed';
  const clean=normalizeProgress(changed,state);
  assert.equal(clean.draft.goal,'');assert.equal(clean.savedPlan,null);assert.equal(clean.completedCourses.C31,true);
});

test('edited study blocks lose their mark while unchanged blocks retain it',()=>{
  const state=blankProgress(data),path=data.paths[0];
  for(const step of path.steps)state.completedSteps[stepKey(path,step)]=true;
  const changed=structuredClone(data);changed.paths[0].steps[0].text+=' revised';
  const clean=normalizeProgress(changed,state);
  assert.equal(Object.keys(clean.completedSteps).length,path.steps.length-1);
});

test('denied access and quota failures retain a functional in-memory session',()=>{
  for(const getStorage of [()=>{throw new Error('blocked');},()=>({getItem:()=>null,setItem:()=>{throw new Error('quota');},removeItem:()=>{throw new Error('blocked');}})]){
    const store=createProgressStore(data,getStorage,key);store.load();store.update(s=>{s.completedCourses.C11=true;});store.update(s=>{s.draft=freshAssessment('D3');});
    assert.equal(store.status,'unavailable');assert.equal(store.state.completedCourses.C11,true);assert.equal(store.state.draft.goal,'D3');
    store.clear();assert.equal(store.status,'unavailable');assert.deepEqual(store.state.completedCourses,{});
  }
});

test('corrupt or future-version storage is not silently overwritten',()=>{
  for(const raw of ['bad json','{"version":999}']){
    const disk=memoryStorage();disk.setItem(key,raw);const store=createProgressStore(data,()=>disk,key);store.load();
    assert.equal(store.status,'invalid');store.update(s=>{s.completedCourses.C11=true;});assert.equal(disk.getItem(key),raw);
    store.clear();assert.equal(disk.getItem(key),null);assert.equal(store.status,'ready');
  }
});

test('independent tab updates merge and completion can be undone',()=>{
  const disk=memoryStorage(),a=createProgressStore(data,()=>disk,key),b=createProgressStore(data,()=>disk,key);
  a.load();b.load();a.update(s=>{s.completedCourses.C11=true;});b.update(s=>{s.completedCourses.C12=true;});
  assert.deepEqual(a.refresh().completedCourses,{C11:true,C12:true});
  a.update(s=>{delete s.completedCourses.C11;});assert.deepEqual(b.refresh().completedCourses,{C12:true});
  b.clear();assert.deepEqual(a.refresh().completedCourses,{});
});

test('JSON backups round-trip and clear removes only this guide’s record',()=>{
  const disk=memoryStorage();disk.setItem('another-project','keep');const store=createProgressStore(data,()=>disk,key);
  store.update(s=>{s.draft=completedDraft();s.savedPlan=completedDraft();s.completedCourses.C31=true;});
  const backup=JSON.stringify(store.state);store.clear();assert.equal(disk.getItem(key),null);assert.equal(disk.getItem('another-project'),'keep');
  const restored=normalizeProgress(data,JSON.parse(backup));store.update(s=>Object.assign(s,restored));
  assert.deepEqual(store.load().draft.answers,completedDraft().answers);assert.equal(store.state.completedCourses.C31,true);
  assert.equal(storageKey('/OnlineCourses/index.html'),key);assert.notEqual(storageKey('/OtherRepo/'),key);
});

test('resume cannot skip earlier unanswered questions',()=>{
  const raw={...completedDraft('D3'),step:11};delete raw.answers[questionsFor(data,'D3')[2].id];
  assert.equal(normalizeDraft(data,raw).step,4);
});
