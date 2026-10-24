import {earnedBadges, pathComplete} from './achievements.js';
import {createEvidenceStore} from './evidence.js';
import {evidenceSection, mountEvidence} from './evidence-ui.js';
import {recoverFullRestore} from './backup.js';
import {fullBackupControls,mountFullBackup} from './backup-ui.js';
import {freshAssessment, createProgressStore, storageKey, stepKey, normalizeProgress, nextLearningStep, pathSignature} from './progress.js';
import {brainExplorer, enhanceView, installMotionControl, celebrateCompletion} from './experience.js';
import {escapeHTML as e, createMarkdown, slug} from './markdown.js';
import {questionsFor, makePlan} from './assessment.js';

const main = document.querySelector('main');
const domainNames = {use:'AI judgment',python:'Python',engineering:'Software practice',data:'Data & validation',loops:'Agents & loops',evaluation:'Evaluation',embedded:'Embedded deployment',edge:'Edge systems',cad:'Mechanical design',electronics:'Electronics'};
const icons = {P0:'◎',P1:'⌘',W1:'▤',W2:'◇',W3:'⊞',W4:'⌁',D1:'⏣',D2:'▦',D3:'✳',D4:'▥',T1:'▧'};
const groups = ['All paths','AI at work','Developing AI','Foundations','Teaching'];
installMotionControl();
let data, md, store, progress, evidenceStore, evidenceChannel;
let evidenceCleanup=()=>{};
let backupCleanup=()=>{};
let assessment = freshAssessment();
let result = null;
let toastTimer;


const pathById = id => data.paths.find(p => p.id === id);
const courseById = id => data.courses.find(c => c.id === id);
const routeOf = id => pathById(id) ? `#paths/${id}` : id === 'practice' ? '#guide/practice?section=b1-sensor-data-contract' : `#courses/${id}`;
const labelOf = id => pathById(id)?.title || courseById(id)?.title || 'Confirm your skills in practice';
function heading(kicker, title, text = '') { return `<div class="page-heading"><span class="eyebrow">${e(kicker)}</span><h1>${e(title)}</h1>${text ? `<p>${e(text)}</p>` : ''}</div>`; }
function badge(course) { return `<span class="access ${['Platform access','Video tier'].includes(course.accessLabel) ? 'paid' : course.accessLabel === 'Access varies' ? 'varies' : ''}">${e(course.accessLabel)}</span>`; }
function pathCard(p) {
  return `<article class="path-card" data-path="${p.id}"><div class="card-top"><span class="path-icon" aria-hidden="true">${icons[p.id]}</span><span class="id-label">${e(p.id)} / ${e(p.group.toUpperCase())}</span></div><h3><a href="#paths/${p.id}">${e(p.title)}</a></h3><p>${e(p.description)}</p>${pathProgress(p)}<div class="card-meta"><span>◷ ${p.hours} hours · ${p.steps.length} study blocks</span><a href="#paths/${p.id}" aria-label="Explore ${e(p.title)}">↗</a></div></article>`;
}
function resourceLink(id) { const c = courseById(id); return c ? `<a class="resource-link" href="#courses/${id}"><small>${progress.completedCourses[id] ? '✓ COMPLETED · ' : ''}${id} · ${e(c.type)}</small>${e(c.title)} ↗</a>` : ''; }
function home() {
  main.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow"><span class="signal-dot"></span> THE INDUSTRIAL AI PLAYGROUND</span><h1>Think it.<br>Learn it.<br><em>Build it<span class="hero-period">.</span></em></h1><p>From your first copilot to intelligence on the factory floor. Find your starting point. Make something that works.</p><div class="hero-actions"><a class="button" href="#assessment">Find my path <span aria-hidden="true">↗</span></a><a class="text-link" href="#paths">Explore the paths <span aria-hidden="true">→</span></a></div><div class="micro-note">10–15 MIN ASSESSMENT / ZERO SIGN-UP</div></div>${brainExplorer()}</section>
  <div class="stats-line"><span><strong>${data.paths.length}</strong> focused learning paths</span><span><strong>${data.courses.length}</strong> curated resources</span><span><strong>8</strong> industrial practice briefs</span></div>
  ${resumePanel()}<section aria-labelledby="routes-title"><div class="section-head"><div><h2 id="routes-title">What do you want to do with AI?</h2><p>Two starting points. Your expertise sets the direction.</p></div><span class="eyebrow">CHOOSE YOUR ROUTE</span></div><div class="route-grid"><article class="route-card work"><div class="route-number">01 <span>USE AI IN YOUR PROFESSION</span></div><span class="route-icon" aria-hidden="true">↗</span><h3>AI at work</h3><p>Make everyday work better. Apply AI to knowledge work, mechanical design, electronics, or software.</p><div class="tags"><span class="tag">Copilots</span><span class="tag">CAD & ECAD</span><span class="tag">Agentic coding</span></div><div class="route-bottom"><a class="text-link" href="#paths?group=AI%20at%20work">Explore work paths →</a><span>4 paths</span></div></article><article class="route-card develop"><div class="route-number">02 <span>BUILD INDUSTRIAL CAPABILITIES</span></div><span class="route-icon" aria-hidden="true">⌘</span><h3>Developing AI</h3><p>Build intelligence into products and systems. Go from a reliable data baseline to deployed models and agents.</p><div class="tags"><span class="tag">Embedded</span><span class="tag">Edge</span><span class="tag">Agentic systems</span></div><div class="route-bottom"><a class="text-link" href="#paths?group=Developing%20AI">Explore development paths →</a><span>4 paths</span></div></article></div></section>
  <section aria-labelledby="popular-title"><div class="section-head"><div><h2 id="popular-title">A few places to start</h2><p>Learn a little. Build something. Check that it works.</p></div><a class="text-link" href="#paths">All learning paths →</a></div><div class="cards">${['W1','W4','D1','D2','D3','D4'].map(id => pathCard(pathById(id))).join('')}</div></section>
  <section class="callout"><div><span class="eyebrow">LEARNING WORKS BETTER TOGETHER</span><h2>Bring your team along.</h2><p>Run a 90-minute workshop or build a three-session lecture series, with industrial examples and clear review criteria.</p></div><a class="button light" href="#guide/teaching">Open the teaching kit ↗</a></section>`;
}

function paths(params) {
  let group = groups.includes(params.get('group')) ? params.get('group') : 'All paths';
  let query = params.get('q') || '';
  main.innerHTML = `${heading('A ROUTE FOR YOUR GOAL','Learning paths','Choose what you want to accomplish. Each path brings together selected learning material, practical work, and a clear exit check.')}
  <div class="toolbar"><label class="search-box"><span class="visually-hidden">Search learning paths</span><input id="path-search" type="search" placeholder="Search paths, topics, or skills…" value="${e(query)}"></label><a class="text-link" href="#assessment">Not sure? Find my path →</a></div><div class="filters" role="group" aria-label="Filter learning paths">${groups.map(g => `<button class="filter ${group === g ? 'active' : ''}" aria-pressed="${group === g}" data-group="${g}">${g}</button>`).join('')}</div><p class="result-count" id="path-count" role="status"></p><div class="cards" id="path-list"></div><p class="micro-note">Hours cover selected study and practice. Prerequisite learning is additional.</p>`;
  function update() {
    const found = data.paths.filter(p => (group === 'All paths' || p.group === group) && `${p.title} ${p.description} ${p.domains.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
    document.querySelector('#path-list').innerHTML = found.length ? found.map(pathCard).join('') : empty('No paths found','Try a broader term or another category.');
    document.querySelector('#path-count').textContent = `${found.length} learning ${found.length === 1 ? 'path' : 'paths'}`;
    const q = new URLSearchParams(); if (group !== 'All paths') q.set('group',group); if (query) q.set('q',query);
    history.replaceState(null,'', '#paths' + (q.size ? '?' + q : ''));
    document.querySelectorAll('[data-group]').forEach(b => { b.classList.toggle('active', b.dataset.group === group); b.setAttribute('aria-pressed',String(b.dataset.group === group)); });
  }
  document.querySelector('#path-search').addEventListener('input', event => {query = event.target.value; update();});
  document.querySelectorAll('[data-group]').forEach(b => b.addEventListener('click', () => {group = b.dataset.group; update();}));
  update();
}
function empty(title, body, action = '') { return `<div class="empty-state"><h2>${e(title)}</h2><p>${e(body)}</p>${action}</div>`; }

function pathDetail(id, params) {
  const p = pathById(id); if (!p) return notFound();
  document.title = `${p.title} — Industrial AI`;
  main.innerHTML = `<div class="breadcrumb"><a href="#paths">Learning paths</a><span>/</span><span>${e(p.id)}</span></div><div class="path-detail"><article class="detail-main">${heading(`${p.group} / ${p.id}`, p.title, p.description)}<div class="prose">${md.render(p.intro,'docs/LEARNING_PATHS.md')}</div><div class="section-head"><h2>Your study sequence</h2></div>${pathProgress(p)}<ol class="timeline">${p.steps.map(s => `<li id="study-step-${s.order}" tabindex="-1"><span class="step-index">${s.order}</span><div class="step-content"><small>STUDY BLOCK ${s.order} · ${s.hours} ${s.hours === 1 ? 'HOUR' : 'HOURS'}</small><p>${md.inline(s.text,'docs/LEARNING_PATHS.md')}</p>${stepButton(p,s)}</div></li>`).join('')}</ol><div class="prose" id="path-exit-check" tabindex="-1">${md.render(p.outcome,'docs/LEARNING_PATHS.md')}${exitCheckControl(p)}</div><div class="notice">This is a focused study plan, not the full provider courses. Use the exit check to decide when to move on. Add time for any prerequisite gaps.</div>${badgeShelf(`path:${p.id}`)}${evidenceSection(data,`path:${p.id}`)}</article><aside class="detail-sidebar"><div class="detail-stats"><div><strong>${p.hours} h</strong><span>planned effort</span></div><div><strong>${p.steps.length}</strong><span>study blocks</span></div></div>${continuePanel(p.id)}<p class="progress-help">Tick off study blocks as you go. Course completion is tracked separately; finish the exit check to confirm your learning.</p><h3>Make this path your own.</h3><p>Check your starting knowledge and get a plan that fits your time.</p><a class="button" href="#assessment?goal=${id}">Assess my starting point ↗</a><button class="button secondary" id="share-path">Copy path link</button><h3 style="margin-top:24px">Start with these resources</h3>${p.resources.map(resourceLink).join('')}<a class="resource-link" href="#guide/learning-record"><small>MAKE PROGRESS VISIBLE</small>Learning record template ↗</a></aside></div>`;
  document.querySelector('#share-path').addEventListener('click', () => copyLink(location.href));
}

function courseCard(c) {
  return `<article class="course-card"><div class="card-top"><span class="id-label">${c.id} · ${e(c.type.toUpperCase())}</span>${badge(c)}</div><h3><a href="#courses/${c.id}">${e(c.title)}</a></h3><div class="course-provider">${md.inline(c.provider)}</div><div class="scope">${md.inline(c.scope)}</div><details><summary>Prerequisites & access</summary>${c.prerequisites ? `<p><strong>Start with:</strong> ${md.inline(c.prerequisites)}</p>` : ''}<p>${md.inline(c.access)}</p></details><a class="text-link" href="${e(c.url)}" target="_blank" rel="noopener noreferrer">Open learning resource ↗</a>${courseButton(c)}</article>`;
}

function courses(params) {
  let query = params.get('q') || '', category = params.get('category') || '', access = params.get('access') || '';
  const categories = [...new Set(data.courses.map(c => c.category))];
  const accesses = [...new Set(data.courses.map(c => c.accessLabel))];
  if (!categories.includes(category)) category = '';
  if (!accesses.includes(access)) access = '';
  const options = (items, value, label) => `<option value="">${label}</option>${items.map(s => `<option value="${e(s)}" ${s === value ? 'selected' : ''}>${e(s)}</option>`).join('')}`;
  main.innerHTML = `${heading('CURATED. CONNECTED. PRACTICAL.','Course library','Browse courses, tutorials, and references selected for engineering practice. Access notes distinguish learning materials from paid software, labs, and compute.')}
  <div class="toolbar"><label class="search-box"><span class="visually-hidden">Search courses and resources</span><input id="course-search" type="search" value="${e(query)}" placeholder="Search courses, providers, or skills…"></label><label><span class="visually-hidden">Resource topic</span><select id="course-category">${options(categories,category,'All topics')}</select></label><label><span class="visually-hidden">Access type</span><select id="course-access">${options(accesses,access,'All access types')}</select></label></div><div class="result-count" id="course-count" role="status"></div><div class="library-grid" id="course-list"></div>`;
  function update() {
    const found = data.courses.filter(c => (!category || c.category === category) && (!access || c.accessLabel === access) && `${c.title} ${c.provider} ${c.scope} ${c.prerequisites} ${c.id}`.toLowerCase().includes(query.toLowerCase()));
    document.querySelector('#course-count').textContent = `${found.length} of ${data.courses.length} resources · Reviewed 24 October 2026`;
    document.querySelector('#course-list').innerHTML = found.length ? found.map(courseCard).join('') : empty('No matching resources','Try another search term or clear a filter.', '<button class="button secondary" id="reset-filters">Clear filters</button>');
    document.querySelector('#reset-filters')?.addEventListener('click', () => {query='';category='';access='';document.querySelector('#course-search').value='';document.querySelector('#course-category').value='';document.querySelector('#course-access').value='';update();});
    const q = new URLSearchParams(); if(query) q.set('q',query); if(category) q.set('category',category); if(access) q.set('access',access);
    history.replaceState(null,'','#courses' + (q.size ? '?' + q : ''));
  }
  document.querySelector('#course-search').addEventListener('input', ev => {query=ev.target.value;update();});
  document.querySelector('#course-category').addEventListener('change', ev => {category=ev.target.value;update();});
  document.querySelector('#course-access').addEventListener('change', ev => {access=ev.target.value;update();});
  update();
}

function courseDetail(id) {
  const c = courseById(id); if (!c) return notFound();
  document.title = `${c.title} — Industrial AI`;
  const related = data.paths.filter(p => p.allResources.includes(id));
  main.innerHTML = `<div class="breadcrumb"><a href="#courses">Course library</a><span>/</span><span>${id}</span></div><div class="path-detail"><article><div class="page-heading"><span class="eyebrow">${e(c.type)} / ${id}</span><h1>${e(c.title)}</h1><div class="course-provider">${md.inline(c.provider)}</div>${badge(c)}</div><div class="prose"><h2>Suggested first study block</h2><p>${md.inline(c.scope)}</p>${c.prerequisites ? `<h2>Starting knowledge</h2><p>${md.inline(c.prerequisites)}</p>`:''}<h2>Access & practical value</h2><p>${md.inline(c.access)}</p><p>Study estimates refer to selected material and practice. The public listing was reviewed; individual accounts, labs, and certificates were not tested.</p></div><a class="button" href="${e(c.url)}" target="_blank" rel="noopener noreferrer">Visit the provider ↗</a>${courseButton(c)}${result?.blocks.some(b=>b.id===id)?continuePanel():''}<p class="micro-note">Mark the material you intended to study as complete. You can undo this at any time.</p>${badgeShelf(`course:${id}`)}${evidenceSection(data,`course:${id}`)}</article><aside class="detail-sidebar"><h3>Put this resource in context</h3><p>${related.length ? 'Study it as part of a focused path.' : 'An optional resource for deeper study.'}</p>${related.map(p=>`<a class="resource-link" href="#paths/${p.id}"><small>${p.id} · ${p.hours} HOURS</small>${e(p.title)} →</a>`).join('')}<a class="resource-link" href="#guide/research">Research & access limitations ↗</a></aside></div>`;
}

function guide(id, params) {
  const g = data.guides[id]; if (!g) return notFound();
  document.title = `${g.title} — Industrial AI`;
  const headings = [...g.body.matchAll(/^## (.+)$/gm)].map(m => ({title:m[1], id:slug(m[1])}));
  main.innerHTML = `<div class="breadcrumb"><a href="#home">Field guide</a><span>/</span><span>${e(g.title)}</span></div><div class="article-layout"><article class="prose">${md.render(g.body, g.source)}</article><aside class="article-toc"><strong>IN THIS GUIDE</strong>${headings.map(h => `<a href="#guide/${id}?section=${encodeURIComponent(h.id)}">${e(h.title)}</a>`).join('')}<a href="${e(data.repository)}/blob/master/${e(g.source)}" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a></aside></div>`;
  if(id==='practice' && params.get('check')==='python-utility'){
    document.getElementById('b1-sensor-data-contract')?.insertAdjacentHTML('afterend',`<div class="practice-check"><strong>Confirm your quiz results in practice</strong><p>Write, test, and explain a small sensor-data utility from B1. Mark this check complete after you can reproduce the result and explain it to a peer.</p><button class="completion-toggle ${progress.completedChecks['python-utility']?'is-complete':''}" data-check="python-utility" aria-pressed="${!!progress.completedChecks['python-utility']}">${progress.completedChecks['python-utility']?'Practice complete · undo':'Complete practice check'}</button>${continuePanel()}</div>`);
  }
  if(params.get('section')) requestAnimationFrame(() => document.getElementById(params.get('section'))?.scrollIntoView({block:'start'}));
}

function showAssessment(params, focus = false) {
  const supplied = params?.get('goal');
  if (supplied && pathById(supplied)) {
    if(supplied!==assessment.goal)assessment=freshAssessment(supplied);
    history.replaceState(null,'','#assessment');
    persistDraft();
  }
  const qs = assessment.goal ? questionsFor(data,assessment.goal) : [];
  const isQuestion = assessment.step >= 2;
  const totalSteps = 2 + (qs.length || 6);
  const questionIndex = assessment.step - 2;
  const label = assessment.step === 0 ? '01 / YOUR GOAL' : assessment.step === 1 ? '02 / YOUR STUDY WINDOW' : `03 / KNOWLEDGE CHECK ${questionIndex + 1} OF ${qs.length}`;
  const content = assessment.step === 0 ? goalForm() : assessment.step === 1 ? preferencesForm() : questionForm(qs[questionIndex]);
  main.innerHTML = `<div class="assessment-shell"><div class="assessment-title"><span class="eyebrow">A STARTING POINT THAT FITS YOU</span><h1>Find your learning path.</h1><p>A few questions about your goals, time, and starting knowledge. “Not sure” is always a useful answer.</p></div><div class="progress-labels"><span>${label}</span><span>${Math.round(assessment.step/totalSteps*100)}% complete</span></div><div class="progress-track" role="progressbar" aria-label="Assessment progress" aria-valuenow="${assessment.step}" aria-valuemin="0" aria-valuemax="${totalSteps}"><div class="progress-fill" style="width:${assessment.step/totalSteps*100}%"></div></div><form id="assessment-form" class="assessment-card">${content}<p class="form-error" id="assessment-error" role="alert"></p><div class="assessment-controls">${assessment.step ? '<button class="button secondary" type="button" id="assessment-back">← Back</button>' : '<span>Choose one goal to get started.</span>'}<button class="button" type="submit">${isQuestion && questionIndex === qs.length-1 ? 'Build my learning plan' : 'Continue'} <span aria-hidden="true">→</span></button></div></form><p class="privacy-note">${savingNote()} This is a learning aid, not a certification or employee assessment.</p></div>`;
  document.querySelector('#assessment-back')?.addEventListener('click', () => { captureForm(false); assessment.step--; persistDraft(); showAssessment(null,true); });
  document.querySelector('#assessment-form').addEventListener('submit', ev => {
    ev.preventDefault();
    try {
      captureForm(true);
      const count = questionsFor(data,assessment.goal).length;
      if (assessment.step === count + 1) {result = makePlan(data,assessment,assessment.answers); saveProgress(state=>{state.draft=structuredClone(assessment);state.savedPlan=structuredClone(assessment);}); location.hash='#plan';}
      else {assessment.step++; persistDraft(); showAssessment(null,true);}
    } catch(error) { document.querySelector('#assessment-error').textContent=error.message; }
  });
  document.querySelector('#assessment-form').addEventListener('input',()=>{captureForm(false);persistDraft();});
  if (focus) enhanceView();
  if (focus) { document.querySelector('#assessment-form').scrollIntoView({block:'start'}); const legend=document.querySelector('#assessment-form legend'); if(legend){legend.tabIndex=-1;legend.focus({preventScroll:true});} }
}
function goalForm() {
  return `<fieldset><legend>What would you like to accomplish?</legend><p class="question-note">Using AI in your profession and developing AI systems have different starting points.</p>${['AI at work','Developing AI','Foundations','Teaching'].map(group => `<div class="goal-group-label">${group}</div><div class="goal-grid">${data.paths.filter(p=>p.group===group).map(p=>`<label class="choice"><input type="radio" name="goal" value="${p.id}" ${assessment.goal===p.id?'checked':''} required><span>${e(p.title)}<small>${e(p.description)}</small></span></label>`).join('')}</div>`).join('')}</fieldset>`;
}
function preferencesForm() {
  const binary = (name, value, yes, no) => `<div class="goal-grid"><label class="choice"><input type="radio" name="${name}" value="false" ${!value?'checked':''}><span>${no}</span></label><label class="choice"><input type="radio" name="${name}" value="true" ${value?'checked':''}><span>${yes}</span></label></div>`;
  return `<fieldset><legend>Make room for learning.</legend><p class="question-note">Your goal: <strong>${e(pathById(assessment.goal).title)}</strong>. Keep the first study window realistic.</p><div class="form-row"><label class="field">Hours per week<input type="number" name="hours" min="0.5" max="40" step="0.5" value="${assessment.hours}" required><small>From half an hour to 40 hours</small></label><label class="field">Weeks to plan<input type="number" name="weeks" min="1" max="52" step="1" value="${assessment.weeks}" required><small>Your first study window</small></label></div><fieldset class="field-group"><legend>Have you completed relevant work you can explain to a peer?</legend>${binary('evidence',assessment.evidence,'Yes, I have an example','Not yet / not sure')}</fieldset><fieldset class="field-group"><legend>Are the needed tools, accounts, and hardware available and permitted?</legend>${binary('live',assessment.live,'Yes, live practice is possible','Use readings / simulation')}</fieldset><div class="form-row"><label class="field">Discussion language<select name="language"><option ${assessment.language==='English'?'selected':''}>English</option><option ${assessment.language==='German'?'selected':''}>German</option></select><small>Most technical sources are in English.</small></label></div></fieldset>`;
}
function questionForm(q) {
  if(!q) throw new Error('Question unavailable.');
  const selected = Object.hasOwn(assessment.answers,q.id) ? (assessment.answers[q.id] ?? 'unknown') : undefined;
  return `<fieldset><span class="eyebrow">${e(domainNames[q.domain])}</span><legend>${e(q.prompt)}</legend><p class="question-note">Choose the best answer. This helps identify useful material to study.</p>${[...q.options,'Not sure / not yet'].map((option,i)=>{const value=i===q.options.length?'unknown':i;return `<label class="choice wide"><input type="radio" name="answer" value="${value}" ${selected===value?'checked':''} required><span>${e(option)}</span></label>`;}).join('')}</fieldset>`;
}
function captureForm(required) {
  const form = new FormData(document.querySelector('#assessment-form'));
  if(assessment.step === 0) {
    const goal = form.get('goal');
    if(!pathById(goal)) {if(required) throw new Error('Choose a learning goal.'); return;}
    if(goal!==assessment.goal) assessment.answers={};
    assessment.goal=goal;
  } else if(assessment.step === 1) {
    const hours=Number(form.get('hours')), weeks=Number(form.get('weeks'));
    if(!Number.isFinite(hours)||hours<0.5||hours>40||!Number.isInteger(weeks)||weeks<1||weeks>52){if(required)throw new Error('Enter 0.5–40 hours and 1–52 whole weeks.');return;}
    Object.assign(assessment,{hours,weeks,evidence:form.get('evidence')==='true',live:form.get('live')==='true',language:form.get('language')});
  } else {
    const q=questionsFor(data,assessment.goal)[assessment.step-2], answer=form.get('answer');
    if(answer===null){if(required)throw new Error('Choose an answer or “Not sure”.');return;}
    assessment.answers[q.id]=answer==='unknown'?null:Number(answer);
  }
}

function plan() {
  if(!result){main.innerHTML=`${heading('YOUR NEXT STEP','Your learning plan','Find a useful starting point based on your goal, knowledge, and available time.')}${empty('Let’s find your starting point.','Complete the short assessment to see your suggested sequence, prerequisite gaps, and first study block.','<a class="button" href="#assessment">Start the assessment →</a>')}<p class="privacy-note">${savingNote()}</p>`;return;}
  const r=result, p=pathById(r.settings.goal);
  const first=r.blocks[0];
  const ready=Object.entries(r.scores).filter(([,n])=>n===2).map(([domain])=>domainNames[domain]);
  main.innerHTML=`<section class="result-hero"><span class="eyebrow">YOUR PERSONAL STARTING POINT</span><h1>${e(p.title)}</h1><p>${e(p.description)}</p><div class="plan-meta"><span><strong>${r.total} h</strong> suggested sequence</span><span><strong>${r.settings.hours} h</strong> per week</span><span><strong>~${r.estimatedWeeks} weeks</strong> at your pace</span></div></section>${continuePanel()}<div class="actions print-hide"><a class="button secondary small" href="#progress">My progress ↗</a><button class="button secondary small" id="download-plan">Download my plan ↓</button><button class="button secondary small" id="print-plan">Print / save PDF</button><button class="text-link" id="revise-plan" style="border:0;background:none">Review my answers</button><button class="text-link" id="restart-assessment" style="border:0;background:none">Start again</button></div>
  ${r.capacity<r.total?`<div class="notice">Your ${r.settings.weeks}-week window has room for <strong>${r.capacity} hours</strong>. The full suggested sequence needs about ${r.total} hours. Work through the blocks in order and carry the rest forward; prerequisites remain part of the plan.</div>`:'<div class="notice">The suggested study blocks fit your chosen window. Estimates cover selected learning and practice, not full courses. Move on when the exit checks pass.</div>'}
  <div class="plan-layout"><div><div class="section-head"><h2>Your suggested sequence</h2></div>${r.blocks.map((b,i)=>`<article class="plan-step"><span class="step-index">${i+1}</span><div><small>${b.hours} HOURS · ${b.id==='practice'?'PRACTICE CHECK':e(b.id)}</small><h3><a href="${routeOf(b.id)}">${e(labelOf(b.id))}</a></h3><p>${e(b.reason)}</p><a class="text-link" href="${routeOf(b.id)}">Open this step →</a></div></article>`).join('')}<div class="section-head"><h2>Where to focus</h2></div><p class="question-note">Two checks per topic suggest what to review. Confirm understanding with a worked example.</p><div class="knowledge-grid">${Object.entries(r.scores).map(([domain,n])=>`<div class="knowledge-item"><strong>${e(domainNames[domain])}</strong><span>${n===0?'Refresh the foundations':n===1?'Practise the gap':'Confirm with a worked example'} · ${n}/2 checks</span>${data.refreshers[domain].map(id=>`<a href="#courses/${id}" title="${e(courseById(id).title)}">${id} ↗</a>`).join('')}</div>`).join('')}</div><div class="notice">${r.settings.evidence&&ready.length?`You may skip introductory review in <strong>${e(ready.join(', '))}</strong> after explaining and reproducing the relevant example. Keep the capstone and peer review.`:'Use a small completed example to confirm your starting knowledge before skipping introductory material.'}</div>${r.feedback.length?`<details class="result-feedback"><summary>Review explanations for ${r.feedback.length} knowledge ${r.feedback.length===1?'gap':'gaps'}</summary><ul>${r.feedback.map(f=>`<li><strong>${e(f.prompt)}</strong><br>${e(f.explanation)}</li>`).join('')}</ul></details>`:''}</div><aside class="detail-sidebar"><span class="eyebrow">YOUR FIRST SESSION</span><h3>${Math.min(r.settings.hours,first.hours)} hours on ${first.id==='practice'?'practice':e(first.id)}</h3><p>${e(first.id===p.id?p.first_step:first.reason)}</p><a class="button" href="${routeOf(first.id)}">Open the first step →</a><h3 style="margin-top:24px">Practice mode</h3><p>${r.settings.live?'Use the tools and hardware available to you. Agree a usage budget; free material can still involve paid execution.':'Use public readings and paper or local simulation. Label live-model and target-device performance as not measured.'}</p>${domainGate(p.id)}${r.settings.language==='German'?'<p>Discuss and reflect in German. C01 has a German edition; most technical materials are English.</p>':''}<h3 style="margin-top:22px">Keep your progress</h3><p>Complete the exit check, ask a peer to review your work, then revisit any remaining gaps.</p><a class="resource-link" href="#guide/learning-record">Open the learning record ↗</a></aside></div><p class="privacy-note">${savingNote()}</p>`;
  document.querySelector('#download-plan').addEventListener('click',downloadPlan);
  document.querySelector('#print-plan').addEventListener('click',()=>window.print());
  document.querySelector('#revise-plan').addEventListener('click',()=>{assessment=structuredClone(progress.savedPlan || assessment);assessment.step=0;persistDraft();location.hash='#assessment';});
  document.querySelector('#restart-assessment').addEventListener('click',()=>{assessment=freshAssessment();persistDraft();location.hash='#assessment';});
}
function domainGate(id){
  const text=['W2','W3'].includes(id)?'Domain foundation: if you cannot check the design assumptions, work with a qualified peer before moving beyond the learning exercise.':id==='D1'?'Device preparation: C/C++ buffers, firmware tools, and target access are additional deployment prerequisites.':id==='D2'?'Edge preparation: Linux, packaging, and target access are needed for deployment. Laptop timings are not target-device measurements.':'';
  return text?`<p>${text}</p>`:'';
}
function downloadPlan(){
  const r=result,p=pathById(r.settings.goal);const base=location.href.split('#')[0];
  const lines=[`# My Industrial AI learning plan`, '', `Goal: ${p.title}`, `Created: ${new Date().toISOString().slice(0,10)}`,`Study window: ${r.settings.hours} hours/week for ${r.settings.weeks} weeks (${r.capacity} hours).`,`Suggested sequence: ${r.total} hours, approximately ${r.estimatedWeeks} weeks.`, '', '## Study sequence', ...r.blocks.map((b,i)=>`${i+1}. [${labelOf(b.id)}](${base}${routeOf(b.id)}) — ${b.hours} hours. ${b.reason}`), '', '## Starting knowledge', ...Object.entries(r.scores).map(([d,n])=>`- ${domainNames[d]}: ${n}/2 checks. Resources: ${data.refreshers[d].map(id=>`[${courseById(id).title}](${courseById(id).url})`).join(', ')}`), '', '## First study session', `${Math.min(r.settings.hours,r.blocks[0].hours)} hours on ${labelOf(r.blocks[0].id)}.`,r.blocks[0].id===p.id?p.first_step:r.blocks[0].reason,'', '## Practice mode',r.settings.live?'Permitted live tools/hardware; agree a usage budget.':'Public reading and paper/local simulation; live-model and target-device performance are not measured.',`Discussion language: ${r.settings.language}. Most technical materials are English.`, '', '## Learning progress',...data.courses.filter(c=>progress.completedCourses[c.id]).map(c=>`- [x] ${c.title}`),...data.paths.flatMap(path=>path.steps.filter(step=>progress.completedSteps[stepKey(path,step)]).map(step=>`- [x] ${path.title}: study block ${step.order}`)),'', '## Exit check',p.outcome, '', 'Estimates cover selected material, not full courses. Use the exit check before moving on. This formative assessment is not a certification.',`Guide: ${base}#paths/${p.id}`];
  // Use absolute site links in the exported Markdown, including embedded curriculum references.
  let text=lines.join('\n').replace(/\]\((?:CATALOG\.md#)([cr]\d+)\)/gi,(_,id)=>`](${base}#courses/${id.toUpperCase()})`).replace(/\]\((PRACTICE|LEARNING_PATHS)\.md#([^)]*)\)/g,(_,doc,anchor)=>`](${base}${md.hrefFor(`${doc}.md#${anchor}`,'docs/LEARNING_PATHS.md')})`);
  const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`industrial-ai-plan-${p.id.toLowerCase()}.md`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Learning plan downloaded.');
}
async function copyLink(value){try{await navigator.clipboard.writeText(value);notify('Path link copied.');}catch{let input=document.querySelector('.share-fallback');if(!input){input=document.createElement('input');input.className='share-fallback';input.readOnly=true;input.setAttribute('aria-label','Path link to copy');document.querySelector('.detail-sidebar').append(input);}input.value=value;input.focus();input.select();notify('Select and copy the path link.');}}
function notify(message){const el=document.querySelector('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500);}
function notFound(){main.innerHTML=empty('That page isn’t in the guide.','Choose a learning path or return to the overview.','<a class="button" href="#home">Back to overview →</a>');}
function render({remember=true}={}){
  const hash=location.hash.slice(1)||'home';
  if(hash==='main'){main.focus();return;}
  evidenceCleanup();
  backupCleanup();
  const [route,query='']=hash.split('?');const [page,id]=route.split('/');const params=new URLSearchParams(query);
  document.title='Industrial AI — Learning field guide';
  const active=page==='guide'?({teaching:'teaching',research:'research','industrial-ai':'map'}[id]||''):page;
  document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===active);if(a.dataset.nav===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.querySelector('nav').classList.remove('open');document.querySelector('.mobile-toggle').setAttribute('aria-expanded','false');
  if(page==='home')home();else if(page==='paths')id?pathDetail(id,params):paths(params);else if(page==='courses')id?courseDetail(id):courses(params);else if(page==='guide')guide(id,params);else if(page==='assessment')showAssessment(params);else if(page==='plan')plan();else if(page==='progress')progressPage();else notFound();
  const current=location.hash||'#home';
  if(remember && progress.lastRoute!==current)saveProgress(state=>{state.lastRoute=current;if(/^#(?:paths|courses|guide)\//.test(current))state.lastLearningRoute=current;if(page==='paths' && pathById(id))state.lastPathId=id;});
  updateSaveStatus();
  mountAttachments();
  enhanceView();
  window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
  if(page==='paths')requestAnimationFrame(()=>focusStudyTarget(params));
}

function saveProgress(change) {
  progress=store.update(change);
  updateSaveStatus();
}
function persistDraft(){saveProgress(state=>{state.draft=structuredClone(assessment);});}
function restoreAssessment(){
  assessment=structuredClone(progress.draft);
  result=progress.savedPlan ? makePlan(data,progress.savedPlan,progress.savedPlan.answers) : null;
}
function savingNote(){
  return store.status==='ready' ? 'Saved automatically in this browser. Nothing is uploaded. Resume here later, or manage backups and reset under My progress.' : 'Browser saving is unavailable. Progress is only kept for this visit; export it from My progress before leaving.';
}
function updateSaveStatus(){
  const warning=document.querySelector('#storage-warning');
  warning.hidden=store.status==='ready';
  warning.innerHTML=store.status==='invalid' ? 'The saved data format could not be read. Existing storage has been left untouched. You can use this visit, export progress, or <a href="#progress">clear this site’s saved data</a> to start saving again.' : 'Your browser could not save progress. This visit still works, but changes may be lost when you leave. <a href="#progress">Export your progress</a> to keep a copy.';
}
function mountAttachments(){
  evidenceCleanup();
  evidenceCleanup=mountEvidence(main,{data,store:evidenceStore,notify,channel:evidenceChannel});
}
function badgeShelf(target=''){
  const all=earnedBadges(data,progress);
  const badges=target?all.filter(b=>b.id===target):all;
  return `<section class="badge-shelf" data-badge-shelf="${e(target)}"><div class="section-head"><div><span class="eyebrow">SKILLS GROW. YOUR COLLECTION DOES TOO.</span><h2>${target?'Your completion badge':`Your badge collection <span class="badge-count">${badges.length}</span>`}</h2></div></div>${badges.length?`<div class="achievement-grid">${badges.map(b=>`<a class="achievement-badge ${b.type}" href="${e(b.href)}"><span class="badge-emblem" aria-hidden="true">${b.glyph}</span><span><small>${e(b.detail)}</small><strong>${e(b.title)}</strong></span></a>`).join('')}</div>`:`<div class="badge-empty"><span class="badge-emblem locked" aria-hidden="true">✦</span><div><strong>${target.startsWith('path:')?'A path worth finishing.':'Your first finish starts the collection.'}</strong><p>${target.startsWith('path:')?'Complete the study blocks and confirm the exit check to earn this badge.':'Mark a resource complete to earn its badge. Milestones unlock at 1, 5, and 10 completed resources.'}</p></div></div>`}<p class="micro-note">Personal learning badges reflect your completion marks. Provider certificates can be attached separately.</p></section>`;
}
function exitCheckControl(path){
  const ready=path.steps.every(step=>progress.completedSteps[stepKey(path,step)]),done=pathComplete(path,progress);
  return `<div class="exit-check-control" data-exit-check="${path.id}"><strong>${done?'Path finished. Badge earned!':'Make the finish count.'}</strong><p>${done?'You confirmed the exit check. Reopen it if you want to revisit your work.':'After completing the study blocks, confirm that you can explain your work and meet the exit criteria above.'}</p><button class="button ${done?'secondary':''}" data-path-finish="${path.id}" aria-pressed="${done}" ${ready?'':'disabled'}>${done?'Reopen this path':'Confirm exit check & finish path'}</button>${ready?'':'<small>Complete the remaining study blocks to unlock the finish.</small>'}</div>`;
}
function refreshRewards(){
  document.querySelectorAll('[data-badge-shelf]').forEach(el=>{el.outerHTML=badgeShelf(el.dataset.badgeShelf);});
  document.querySelectorAll('[data-exit-check]').forEach(el=>{el.outerHTML=exitCheckControl(pathById(el.dataset.exitCheck));});
}
main.addEventListener('click',event=>{
  const button=event.target.closest('[data-path-finish]');if(!button)return;
  const path=pathById(button.dataset.pathFinish);
  if(!path || !path.steps.every(step=>progress.completedSteps[stepKey(path,step)]))return;
  const done=!pathComplete(path,progress);
  saveProgress(state=>{if(done)state.completedPaths[path.id]=pathSignature(path);else delete state.completedPaths[path.id];});
  refreshRewards();refreshContinuePanels();
  document.querySelector(`[data-path-finish="${path.id}"]`)?.focus({preventScroll:true});
  if(done)celebrateCompletion({title:'Learning path complete!',detail:path.title+' · Path finisher badge earned',glyph:'◆'});
  else notify('Path reopened. Your study blocks and attachments are kept.');
});
function courseButton(c){
  const complete=!!progress.completedCourses[c.id];
  return `<button class="completion-toggle ${complete?'is-complete':''}" data-course="${c.id}" aria-pressed="${complete}" aria-label="${complete?'Undo completion of':'Mark complete:'} ${e(c.title)}"><span aria-hidden="true">${complete?'✓':'○'}</span> ${complete?'Completed · undo':'Mark complete'}</button>`;
}
function stepButton(path,step){
  const key=stepKey(path,step),complete=!!progress.completedSteps[key];
  return `<button class="completion-toggle ${complete?'is-complete':''}" data-step="${key}" aria-pressed="${complete}" aria-label="${complete?'Undo completion of':'Complete'} study block ${step.order}"><span aria-hidden="true">${complete?'✓':'○'}</span> ${complete?'Block complete · undo':'Complete this block'}</button>`;
}
function pathProgress(path){
  const count=path.steps.filter(s=>progress.completedSteps[stepKey(path,s)]).length;
  return `<div class="path-progress" data-path-progress="${path.id}"><span>${count} / ${path.steps.length} study blocks complete</span><progress value="${count}" max="${path.steps.length}" aria-label="Study blocks completed for ${e(path.title)}"></progress></div>`;
}
function continuePanel(pathId=''){
  const next=nextLearningStep(data,progress,pathId);
  const done=next?.kind==='complete';
  const finished=done && pathComplete(pathById(next.pathId),progress);
  const hint=!next?'Choose a path or finish the assessment to get a personal starting point.':finished?'Path finished. Enjoy your badge, revisit what you learned, or choose another learning path.':done?'Finish the exit check and record what you learned. You can undo a completion mark to revisit a block.':next.kind==='course'?'Complete this prerequisite resource before moving on to the next study block.':next.kind==='practice'?'Confirm your quiz results with a worked example before continuing.':'Your next unchecked study block, based on saved progress. Course marks do not replace the block’s exercises.';
  return `<section class="continue-panel ${done?'is-finished':''}" data-continue-path="${e(pathId)}"><div><span class="eyebrow">${finished?'PATH COMPLETE':done?'ALL STUDY BLOCKS CHECKED OFF':'YOUR NEXT STEP'}</span><h2>${e(next?.title||'Choose your learning path.')}</h2><p>${hint}</p></div><a class="button" data-continue-link href="${e(next?.href||'#paths')}">${finished?'Review learning path':done?'Review exit check':next?'Continue learning':'Choose a learning path'} <span aria-hidden="true">→</span></a></section>`;
}
function refreshContinuePanels(){
  document.querySelectorAll('[data-continue-path]').forEach(el=>{el.outerHTML=continuePanel(el.dataset.continuePath);});
}
function focusStudyTarget(params){
  const step=params.get('step');
  const target=step==='exit'?document.getElementById('path-exit-check'):/^\d+$/.test(step||'')?document.getElementById(`study-step-${step}`):null;
  if(!target)return;
  document.querySelectorAll('.current-study-step').forEach(el=>el.classList.remove('current-study-step'));
  target.classList.add('current-study-step');target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});
}
main.addEventListener('click',event=>{
  const link=event.target.closest('[data-continue-link]');
  if(!link || link.getAttribute('href')!==location.hash)return;
  // Repeated clicks on the current step still bring it back into view.
  event.preventDefault();
  const params=new URLSearchParams(location.hash.split('?')[1]||'');
  if(location.hash.startsWith('#paths/'))focusStudyTarget(params);
  else if(params.get('section'))document.getElementById(params.get('section'))?.scrollIntoView({block:'start'});
  else {window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
});
function resumePanel(){
  if(!assessment.goal && !result && !progress.lastLearningRoute && !Object.keys(progress.completedCourses).length)return '';
  return `${continuePanel()}<section class="resume-panel"><div><span class="eyebrow">YOUR LEARNING, PICKED UP RIGHT HERE</span><h2>Welcome back.</h2><p>${Object.keys(progress.completedCourses).length} resources completed · ${Object.keys(progress.completedSteps).length} study blocks completed</p></div><div class="actions">${assessment.goal?'<a class="button secondary small" href="#assessment">Resume assessment →</a>':''}${result?'<a class="button secondary small" href="#plan">Open my plan →</a>':''}<a class="button small" href="#progress">My progress ↗</a></div></section>`;
}
function progressPage(){
  backupCleanup();
  const completed=data.courses.filter(c=>progress.completedCourses[c.id]);
  const started=data.paths.filter(p=>p.steps.some(s=>progress.completedSteps[stepKey(p,s)]) || p.id===result?.settings.goal);
  const answered=Object.keys(assessment.answers).length;
  main.innerHTML=`${heading('YOUR PERSONAL LEARNING LOG','Small steps. Real progress.','Your assessment, plan, and completion marks are saved on this browser and device. No account needed.')}<div class="progress-summary"><div><strong>${completed.length}</strong><span>resources complete</span></div><div><strong>${Object.keys(progress.completedSteps).length}</strong><span>study blocks complete</span></div><div><strong>${answered}</strong><span>assessment answers saved</span></div></div>${continuePanel()}<div class="actions progress-links"><a class="button secondary small" href="#assessment">${assessment.goal?'Resume assessment':'Find my path'} →</a>${result?'<a class="button secondary small" href="#plan">Open saved plan →</a>':''}${progress.lastLearningRoute?`<a class="text-link" href="${e(progress.lastLearningRoute)}">Last learning page ↗</a>`:''}</div>${badgeShelf()}<div class="section-head"><h2>Your learning paths</h2><a class="text-link" href="#paths">Explore paths →</a></div><div class="cards">${started.length?started.map(pathCard).join(''):empty('Start with one study block.','Open a path and tick off each study block as you finish it.')}</div><p class="micro-note">Resource marks and study blocks are tracked separately. They record your progress; they do not replace a path’s exit check.</p><div class="section-head"><h2>Completed resources</h2><a class="text-link" href="#courses">Browse the library →</a></div><div class="library-grid">${completed.length?completed.map(courseCard).join(''):empty('Your first completion goes here.','Use “Mark complete” on any course or reading when you finish the material you intended to study.')}</div>${evidenceSection(data)}<section class="local-data-panel"><span class="eyebrow">YOU CONTROL YOUR DATA</span><h2>Keep a copy. Pick up anywhere.</h2><p>${savingNote()} Browser data is shared by people using the same browser profile. Clearing site data, private browsing, or switching devices can remove or separate your progress. There is no automatic cloud sync.</p>${fullBackupControls()}<details class="lightweight-backup"><summary>Progress-only JSON backup (without certificate files)</summary><div class="actions"><button class="button secondary" id="export-progress">Export progress JSON ↓</button><label class="button secondary import-label">Restore progress JSON<input id="import-progress" type="file" accept="application/json,.json"></label></div><p class="micro-note">JSON backups contain assessment answers, progress, and badge eligibility, but no attachment files. Restoring replaces this browser’s current learning data after you confirm.</p><div id="import-preview" role="status"></div></details><details class="clear-progress"><summary>Clear this site’s saved progress</summary><p>This removes assessment answers, the saved plan, completion marks, and resume links from this browser. Attached files are kept and can be removed separately in the evidence section. Export a backup first if you want to keep your progress.</p><button class="button secondary" id="clear-progress">Clear assessment and progress</button></details></section>`;
  document.querySelector('#export-progress').addEventListener('click',()=>{
    downloadFile('industrial-ai-progress.json',JSON.stringify(progress,null,2),'application/json');notify('Progress backup downloaded.');
  });
  document.querySelector('#import-progress').addEventListener('change',async ev=>{
    const file=ev.target.files[0];if(!file)return;
    const preview=document.querySelector('#import-preview');
    try{
      if(file.size>500000)throw new Error('Choose a progress backup smaller than 500 KB.');
      const raw=JSON.parse(await file.text());
      // Unknown versions and unrelated JSON fail before any saved data is changed.
      const imported=normalizeProgress(data,raw);
      preview.innerHTML=`<p>Restore ${Object.keys(imported.completedCourses).length} completed resources, ${Object.keys(imported.completedSteps).length} study blocks, and ${Object.keys(imported.draft.answers).length} assessment answers? This replaces your current learning data.</p><button class="button small" id="apply-backup">Restore this backup</button> <button class="button secondary small" id="cancel-backup">Cancel</button>`;
      document.querySelector('#apply-backup').addEventListener('click',()=>{saveProgress(state=>Object.assign(state,imported));restoreAssessment();render();notify('Backup restored'+(store.status==='ready'?' in this browser.':' for this visit; browser saving is unavailable.'));});
      document.querySelector('#cancel-backup').addEventListener('click',()=>{preview.innerHTML='';ev.target.value='';});
    }catch(error){preview.textContent=error instanceof SyntaxError?'That file is not a valid progress backup.':error.message;}
  });
  document.querySelector('#clear-progress').addEventListener('click',()=>{
    progress=store.clear();restoreAssessment();render({remember:false});notify(store.status==='ready'?'Local learning data cleared.':'This visit was reset, but browser storage could not be cleared. Check your browser’s site-data settings.');
  });
  backupCleanup=mountFullBackup(main,{data,progressStore:store,evidenceStore,channel:evidenceChannel,notify,onRestored:()=>{progress=store.state;restoreAssessment();render({remember:false});}});
}
function downloadFile(name,text,type){
  const url=URL.createObjectURL(new Blob([text],{type}));const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
main.addEventListener('click',event=>{
  const button=event.target.closest('[data-course], [data-step], [data-check]');if(!button)return;
  const field=button.dataset.course?'completedCourses':button.dataset.check?'completedChecks':'completedSteps';
  const key=button.dataset.course||button.dataset.step||button.dataset.check;
  const value=!progress[field][key];
  saveProgress(state=>{if(value)state[field][key]=true;else delete state[field][key];if(field==='completedSteps')state.lastPathId=key.split(':')[0];});
  if(location.hash==='#progress'){progressPage();mountAttachments();main.focus({preventScroll:true});}
  else {
    // Preserve focus and filter/scroll position when checking a course or study block.
    button.classList.toggle('is-complete',value);button.setAttribute('aria-pressed',String(value));
    button.innerHTML=`<span aria-hidden="true">${value?'✓':'○'}</span> ${value?(field==='completedCourses'?'Completed · undo':field==='completedChecks'?'Practice complete · undo':'Block complete · undo'):(field==='completedCourses'?'Mark complete':field==='completedChecks'?'Complete practice check':'Complete this block')}`;
    const label=field==='completedCourses'?courseById(key).title:field==='completedChecks'?'Python practice check':`study block ${key.split(':')[1]}`;
    button.setAttribute('aria-label',`${value?'Undo completion of':'Mark complete:'} ${label}`);
    document.querySelectorAll('[data-path-progress]').forEach(el=>{const p=pathById(el.dataset.pathProgress);el.outerHTML=pathProgress(p);});
  }
  refreshContinuePanels();refreshRewards();
  if(value && field==='completedCourses'){celebrateCompletion({title:'Resource complete!',detail:courseById(key).title+' · Badge earned',glyph:'✓'});return;}
  if(value && field==='completedSteps'){const path=pathById(key.split(':')[0]);if(path.steps.every(step=>progress.completedSteps[stepKey(path,step)])){celebrateCompletion({title:'All study blocks complete!',detail:'Ready for the '+path.title+' exit check.',glyph:'✦'});return;}}
  notify(store.status==='ready'?(value?'Progress saved. Nice work!':'Completion undone.'):'Updated for this visit. Browser saving is unavailable.');
});

document.querySelector('.mobile-toggle').addEventListener('click',event=>{const button=event.currentTarget;const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);});
try{
  const response=await fetch(new URL('./data.json',import.meta.url));
  if(!response.ok)throw new Error('Could not load the learning content.');
  data=await response.json();md=createMarkdown(data);
  store=createProgressStore(data,()=>window.localStorage,storageKey(location.pathname));
  progress=store.load();restoreAssessment();
  evidenceStore=createEvidenceStore(data,()=>window.indexedDB,storageKey(location.pathname)+':evidence');
  try{await recoverFullRestore(evidenceStore,store);progress=store.state;restoreAssessment();}catch{/* Attachments report unavailable file storage locally; ordinary progress still works. */}
  try{evidenceChannel=new BroadcastChannel(storageKey(location.pathname)+':evidence');}catch{/* Optional cross-tab file updates. */}
  if(!location.hash && progress.lastRoute!=='#home')history.replaceState(null,'',progress.lastRoute);
  render();window.addEventListener('hashchange',render);
  window.addEventListener('storage',event=>{
    if(event.key!==null && event.key!==storageKey(location.pathname))return;
    progress=store.refresh();restoreAssessment();render({remember:false});notify('Progress updated from another tab.');
  });
}catch(error){main.innerHTML=`${empty('The guide couldn’t load.','Please reload the page, or read the complete guide on GitHub.','<a class="button" href="https://github.com/JRS1986/OnlineCourses">Open the repository ↗</a>')}`;console.error(error);}
