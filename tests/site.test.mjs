import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {questionsFor, scoreAnswers, recommend, makePlan} from '../web/assessment.js';
import {createMarkdown} from '../web/markdown.js';

const data = JSON.parse(readFileSync(new URL('../_site/data.json', import.meta.url)));
const md = createMarkdown(data);

test('generated content includes all paths, resources, and exactly two questions per domain', () => {
  assert.equal(data.paths.length,11);
  assert.equal(data.courses.length,45);
  assert.equal(data.questions.length,20);
  const resources = new Set(data.courses.map(c=>c.id));
  assert.equal(resources.size,data.courses.length);
  for (const path of data.paths) {
    assert.equal(path.steps.reduce((total,s)=>total+s.hours,0),path.hours,path.id);
    for (const id of [...path.allResources,...path.resources]) assert.ok(resources.has(id),id);
    for (const domain of path.domains) assert.equal(questionsFor(data,path.id).filter(q=>q.domain===domain).length,2,domain);
  }
  for (const refs of Object.values(data.refreshers)) for(const id of refs) assert.ok(resources.has(id));
});

test('browser recommendations match Python for every score combination and evidence choice', () => {
  const cases=JSON.parse(execFileSync('python3',['-c',`
import sys, json, itertools
sys.path.insert(0, 'scripts')
from assess import PATHS, recommend
cases=[]
for goal, path in PATHS.items():
    for values in itertools.product(range(3), repeat=len(path.domains)):
        scores=dict(zip(path.domains,values))
        for evidence in (False,True):
            blocks=[dict(id=i,hours=h,reason=r) for i,h,r in recommend(goal,scores,evidence)]
            cases.append(dict(goal=goal,scores=scores,evidence=evidence,blocks=blocks))
print(json.dumps(cases))
`],{cwd:new URL('..',import.meta.url),maxBuffer:5*1024*1024,encoding:'utf8'}));
  assert.ok(cases.length>1000);
  for(const c of cases) assert.deepEqual(recommend(data,c.goal,c.scores,c.evidence),c.blocks,JSON.stringify([c.goal,c.scores,c.evidence]));
  console.log(`Verified ${cases.length} recommendation combinations.`);
});

test('all-correct, incorrect, and uncertain answers produce honest domain scores',()=>{
  for(const path of data.paths) {
    const qs=questionsFor(data,path.id);
    const correct=Object.fromEntries(qs.map(q=>[q.id,q.correct]));
    const wrong=Object.fromEntries(qs.map(q=>[q.id,(q.correct+1)%q.options.length]));
    const unknown=Object.fromEntries(qs.map(q=>[q.id,null]));
    assert.ok(Object.values(scoreAnswers(data,path.id,correct)).every(n=>n===2));
    assert.ok(Object.values(scoreAnswers(data,path.id,wrong)).every(n=>n===0));
    assert.deepEqual(scoreAnswers(data,path.id,unknown),scoreAnswers(data,path.id,wrong));
  }
});

test('incomplete and invalid submissions fail before a plan is returned',()=>{
  assert.throws(()=>scoreAnswers(data,'D3',{}),/every question/);
  assert.throws(()=>questionsFor(data,'unknown'),/Unknown/);
  for(const invalid of [-1,4,1.5,true,'1']) {
    assert.throws(()=>scoreAnswers(data,'P0',{[data.questions[0].id]:invalid}),/Invalid/);
  }
  assert.throws(()=>recommend(data,'P0',{use:3}),/Invalid/);
  assert.throws(()=>recommend(data,'P0',{use:2,python:2}),/Invalid/);
});

test('a tight schedule keeps prerequisites and reports the full duration',()=>{
  const settings={goal:'D1',hours:0.5,weeks:1,evidence:false,live:false,language:'German'};
  const answers=Object.fromEntries(questionsFor(data,'D1').map(q=>[q.id,null]));
  const plan=makePlan(data,settings,answers);
  assert.deepEqual(plan.blocks.map(b=>b.id),['P1','C06','D1']);
  assert.equal(plan.total,52);assert.equal(plan.capacity,.5);assert.equal(plan.estimatedWeeks,104);
  assert.equal(plan.feedback.length,8);
  for(const patch of [{hours:0},{hours:41},{hours:NaN},{weeks:0},{weeks:1.5},{weeks:53},{evidence:'yes'},{language:'invalid'}]) assert.throws(()=>makePlan(data,{...settings,...patch},answers));
});

test('user-only paths do not introduce programming prerequisites',()=>{
  for(const goal of ['P0','W1','W2','W3','T1']) {
    const path=data.paths.find(p=>p.id===goal);
    assert.deepEqual(recommend(data,goal,Object.fromEntries(path.domains.map(d=>[d,0]))).map(b=>b.id),[goal]);
  }
});

test('Markdown links resolve within the project site and unsafe markup stays inert',()=>{
  assert.equal(md.hrefFor('CATALOG.md#c11'),'#courses/C11');
  assert.equal(md.hrefFor('LEARNING_PATHS.md#d3-agentic-ai-and-loops'),'#paths/D3');
  assert.equal(md.hrefFor('../templates/LEARNING_RECORD.md','docs/PRACTICE.md'),'#guide/learning-record');
  assert.equal(md.hrefFor('PRACTICE.md#b1-sensor-data-contract'),'#guide/practice?section=b1-sensor-data-contract');
  for(const bad of ['javascript:alert(1)','data:text/html,bad','//evil.example'])assert.equal(md.hrefFor(bad),null);
  const html=md.render('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[bad](javascript:bad)');
  assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img'));assert.ok(!html.includes('href="javascript:'));
  assert.match(md.inline('[Provider](https://example.org)'),/rel="noopener noreferrer"/);
});

test('rendered curriculum links point to existing pages and section anchors',()=>{
  const rendered=new Map(Object.entries(data.guides).map(([id,g])=>[id,md.render(g.body,g.source)]));
  for(const [id,html] of rendered) {
    for(const match of html.matchAll(/href="(#[^"]+)"/g)) {
      const href=match[1].replaceAll('&amp;','&');
      const [route,query='']=href.slice(1).split('?');const [kind,key]=route.split('/');
      if(kind==='courses' && key)assert.ok(data.courses.some(c=>c.id===key),`${id}: ${href}`);
      if(kind==='paths' && key)assert.ok(data.paths.some(p=>p.id===key),`${id}: ${href}`);
      if(kind==='guide') {
        assert.ok(rendered.has(key),`${id}: ${href}`);
        const section=new URLSearchParams(query).get('section');
        if(section)assert.ok(rendered.get(key).includes(`id="${section}"`),`${id}: missing ${href}`);
      }
    }
  }
});

test('static entry assets are relative for repository-subpath hosting',()=>{
  const html=readFileSync(new URL('../_site/index.html',import.meta.url),'utf8');
  for(const [,asset] of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g))assert.ok(readFileSync(new URL(`../_site/${asset}`,import.meta.url)).length);
  assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html));
  assert.ok(!readFileSync(new URL('../web/app.js',import.meta.url),'utf8').includes('localStorage'));
});
