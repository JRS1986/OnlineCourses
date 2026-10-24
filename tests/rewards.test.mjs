import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {File} from 'node:buffer';
import {blankProgress,normalizeProgress,stepKey,pathSignature} from '../web/progress.js';
import {earnedBadges,pathComplete} from '../web/achievements.js';
import {prepareEvidence,detectEvidenceType,checkEvidenceCapacity,createEvidenceStore,MAX_FILE_BYTES,MAX_TOTAL_BYTES} from '../web/evidence.js';
const data=JSON.parse(readFileSync(new URL('../_site/data.json',import.meta.url)));

test('resource badges and milestones follow completion marks without duplicates',()=>{
  const state=blankProgress(data);assert.deepEqual(earnedBadges(data,state),[]);
  state.completedCourses.C11=true;
  assert.deepEqual(earnedBadges(data,state).map(b=>b.id),['milestone:first-finish','course:C11']);
  for(const course of data.courses.slice(0,10))state.completedCourses[course.id]=true;
  const badges=earnedBadges(data,state);
  assert.equal(badges.filter(b=>b.type==='milestone').length,3);assert.equal(new Set(badges.map(b=>b.id)).size,badges.length);
  delete state.completedCourses.C11;
  assert.ok(!earnedBadges(data,state).some(b=>b.id==='course:C11'));
});

test('a path badge requires every block and explicit exit-check confirmation',()=>{
  const state=blankProgress(data),path=data.paths.find(p=>p.id==='D3');
  state.completedPaths.D3=pathSignature(path);
  assert.equal(pathComplete(path,state),false);
  state.completedPaths={};
  for(const step of path.steps)state.completedSteps[stepKey(path,step)]=true;
  assert.equal(pathComplete(path,state),false);
  state.completedPaths.D3=pathSignature(path);
  assert.equal(pathComplete(path,state),true);assert.ok(earnedBadges(data,state).some(b=>b.id==='path:D3'));
  const restored=normalizeProgress(data,JSON.parse(JSON.stringify(state)));
  assert.equal(pathComplete(path,restored),true);
  delete state.completedSteps[stepKey(path,path.steps[0])];
  assert.ok(!earnedBadges(data,normalizeProgress(data,state)).some(b=>b.id==='path:D3'));
});

test('changed exit criteria and old backups cannot retain a stale path badge',()=>{
  const state=blankProgress(data),path=data.paths[0];
  for(const step of path.steps)state.completedSteps[stepKey(path,step)]=true;
  state.completedPaths[path.id]=pathSignature(path);
  const changed=structuredClone(data);changed.paths[0].outcome+=' New exit check.';
  assert.deepEqual(normalizeProgress(changed,state).completedPaths,{});
  delete state.completedPaths;assert.deepEqual(normalizeProgress(data,state).completedPaths,{});
});

test('file types are detected from content rather than a claimed extension',async()=>{
  const cases=[['%PDF-1.7\n','application/pdf'],[new Uint8Array([137,80,78,71,13,10,26,10,0]),'image/png'],[new Uint8Array([255,216,255,224]),'image/jpeg'],['RIFF1234WEBPdata','image/webp']];
  for(const [bytes,mime] of cases){
    const file=new File([bytes],'completion.html',{type:'text/html'});
    const result=await prepareEvidence(data,file,'course:C11');
    assert.equal(result.mime,mime);assert.equal(result.blob.type,mime);assert.ok(!result.name.endsWith('.html'));
  }
  await assert.rejects(()=>prepareEvidence(data,new File(['<svg onload="bad()"/>'],'certificate.png',{type:'image/png'}),'course:C11'),/not supported/);
  assert.equal(detectEvidenceType(new Uint8Array()),null);
});

test('attachments reject empty, oversized, and unrelated-target files',async()=>{
  await assert.rejects(()=>prepareEvidence(data,new File([],'empty.pdf'),'course:C11'),/non-empty/);
  await assert.rejects(()=>prepareEvidence(data,{size:MAX_FILE_BYTES+1},'course:C11'),/10 MB/);
  const file=new File(['%PDF-1.4'],'completion.pdf');
  for(const target of ['course:UNKNOWN','path:UNKNOWN','https://example.com','course:C11:extra',''])await assert.rejects(()=>prepareEvidence(data,file,target),/Choose a course/);
  const item=await prepareEvidence(data,file,'path:D3');assert.equal(item.target,'path:D3');
});

test('filenames are normalized while original file bytes are preserved',async()=>{
  const file=new File(['%PDF-1.4\nhello'],'../unsafe\\name.exe',{type:'application/octet-stream'});
  const item=await prepareEvidence(data,file,'course:C11');
  assert.ok(!/[\\/]/.test(item.name));assert.ok(item.name.endsWith('.pdf'));assert.equal(await item.blob.text(),await file.text());
});

test('attachment capacity enforces both file count and total bytes',()=>{
  assert.doesNotThrow(()=>checkEvidenceCapacity([{size:MAX_TOTAL_BYTES-10}],10));
  assert.throws(()=>checkEvidenceCapacity([{size:MAX_TOTAL_BYTES-10}],11),/100 MB/);
  assert.throws(()=>checkEvidenceCapacity(Array.from({length:50},()=>({size:1})),1),/50 attachments/);
});

test('denied IndexedDB access reports failure without pretending files are saved',async()=>{
  const store=createEvidenceStore(data,()=>{throw new Error('blocked');},'test-evidence');
  await assert.rejects(()=>store.list(),/unavailable/);
  await assert.rejects(()=>store.add(new File(['%PDF-1.4'],'test.pdf'),'course:C11'),/unavailable/);
});
