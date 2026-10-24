import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {blankProgress,createProgressStore,stepKey,pathSignature} from '../web/progress.js';
import {earnedBadges} from '../web/achievements.js';
import {createFullBackup,readFullBackup,recoverFullRestore,restoreFullBackup,MAX_BACKUP_BYTES,MAX_MANIFEST_BYTES} from '../web/backup.js';
const data=JSON.parse(readFileSync(new URL('../_site/data.json',import.meta.url)));
const progress=()=>{
  const p=blankProgress(data),path=data.paths.find(p=>p.id==='W2');p.completedCourses.C31=true;p.lastPathId='W2';
  for(const step of path.steps)p.completedSteps[stepKey(path,step)]=true;
  p.completedPaths.W2=pathSignature(path);return p;
};
const fileRecord=()=>({id:'certificate-1',target:'course:C31',name:'my-certificate.pdf',mime:'application/pdf',size:19,blob:new Blob(['%PDF-1.4\nTEST ONLY\n']),createdAt:'2026-10-24T12:00:00Z'});
function certificate(){const f=fileRecord();f.size=f.blob.size;return f;}
async function editManifest(blob,edit){
  const bytes=new Uint8Array(await blob.arrayBuffer()),length=new DataView(bytes.buffer).getUint32(8,true);
  const manifest=JSON.parse(new TextDecoder().decode(bytes.slice(12,12+length)));edit(manifest);
  const encoded=new TextEncoder().encode(JSON.stringify(manifest)),header=bytes.slice(0,12);new DataView(header.buffer).setUint32(8,encoded.length,true);
  return new Blob([header,encoded,bytes.slice(12+length)]);
}
function memoryStore(){
  const entries=new Map();let blocked=false;
  const storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>{if(blocked)throw Error('quota');entries.set(key,value);},removeItem:key=>entries.delete(key)};
  const store=createProgressStore(data,()=>storage,'learning');store.load();
  return {store,storage,block:value=>{blocked=value;}};
}
function journalStore(p){
  let pending=p,failCleanup=false;
  return {pendingRestore:async()=>pending,finishRestore:async id=>{if(failCleanup)throw Error('interrupted');if(pending?.id===id)pending=null;},stageRestore:async snapshot=>{pending={id:'new-restore',progress:snapshot.progress};},failCleanup:value=>{failCleanup=value;}};
}

test('full backups round-trip progress, path badges, attachment associations, dates, and original bytes',async()=>{
  const source=progress(),attachment=certificate(),archive=await createFullBackup(data,source,[attachment]);
  const restored=await readFullBackup(data,archive);
  assert.deepEqual(restored.progress,source);assert.deepEqual(restored.badges,earnedBadges(data,source));
  assert.equal(restored.files[0].target,attachment.target);assert.equal(restored.files[0].createdAt,attachment.createdAt);
  assert.equal(restored.files[0].name,attachment.name);assert.equal(await restored.files[0].blob.text(),await attachment.blob.text());
  assert.equal(restored.totalBytes,attachment.size);
});

test('empty full backups are valid and claimed badges never grant achievements',async()=>{
  const archive=await createFullBackup(data,blankProgress(data),[]);
  const changed=await editManifest(archive,m=>{m.badges=['path:D3','course:C11'];});
  const restored=await readFullBackup(data,changed);assert.deepEqual(restored.files,[]);assert.deepEqual(restored.badges,[]);
});

test('full backup validation rejects wrong formats, oversized metadata, and incomplete containers',async()=>{
  await assert.rejects(()=>readFullBackup(data,new Blob(['this is not a backup'])),/supported full backup/);
  await assert.rejects(()=>readFullBackup(data,{size:MAX_BACKUP_BYTES+1}),/101 MB/);
  const archive=await createFullBackup(data,progress(),[certificate()]);
  await assert.rejects(()=>readFullBackup(data,archive.slice(0,archive.size-1)),/incomplete/);
  await assert.rejects(()=>readFullBackup(data,new Blob([archive,'extra'])),/trailing/);
  const header=new Uint8Array(await archive.slice(0,12).arrayBuffer());new DataView(header.buffer).setUint32(8,MAX_MANIFEST_BYTES+1,true);
  await assert.rejects(()=>readFullBackup(data,new Blob([header])),/damaged/);
  await assert.rejects(()=>readFullBackup(data,new Blob([archive.slice(0,12),'!'])),/incomplete/);
});

test('a changed certificate byte fails checksum validation before restore',async()=>{
  const archive=await createFullBackup(data,progress(),[certificate()]);
  const tampered=new Blob([archive.slice(0,archive.size-1),'X']);
  await assert.rejects(()=>readFullBackup(data,tampered),/damaged/);
});

test('invalid versions, duplicate files, unknown targets, and misleading types are rejected',async()=>{
  const archive=await createFullBackup(data,progress(),[certificate()]);
  for(const edit of [m=>{m.version=2;},m=>{m.files.push({...m.files[0]});},m=>{m.files[0].target='course:UNKNOWN';},m=>{m.files[0].mime='image/png';},m=>{m.files[0].size=-1;},m=>{m.files[0].sha256='bad';}]){
    await assert.rejects(()=>editManifest(archive,edit).then(blob=>readFullBackup(data,blob)));
  }
});

test('failed staging leaves existing progress unchanged',async()=>{
  const {store}=memoryStore(),before=structuredClone(store.state);
  await assert.rejects(()=>restoreFullBackup({progress:progress(),files:[]},{stageRestore:async()=>{throw Error('quota');}},store),/quota/);
  assert.deepEqual(store.state,before);
});

test('a staged restore recovers after interruption and persists across a fresh progress store',async()=>{
  const {store,storage}=memoryStore(),evidence=journalStore({id:'restore-1',progress:progress()});
  assert.deepEqual(await recoverFullRestore(evidence,store),{persistent:true});
  const reopened=createProgressStore(data,()=>storage,'learning');reopened.load();
  assert.equal(reopened.state.completedCourses.C31,true);assert.equal(reopened.state.restoreId,'restore-1');
  assert.equal(await evidence.pendingRestore(),null);assert.equal(await recoverFullRestore(evidence,reopened),null);
});

test('an uncleared recovery journal does not overwrite subsequent learner changes',async()=>{
  const {store}=memoryStore(),evidence=journalStore({id:'restore-1',progress:progress()});evidence.failCleanup(true);
  await recoverFullRestore(evidence,store);store.update(p=>{p.completedCourses.C11=true;});
  evidence.failCleanup(false);await recoverFullRestore(evidence,store);
  assert.equal(store.state.completedCourses.C11,true);assert.equal(await evidence.pendingRestore(),null);
});

test('clearing progress does not replay an already applied restore whose journal cleanup failed',async()=>{
  const {store,storage}=memoryStore(),evidence=journalStore({id:'restore-1',progress:progress()});evidence.failCleanup(true);
  await recoverFullRestore(evidence,store);store.clear();
  const reopened=createProgressStore(data,()=>storage,'learning');reopened.load();
  evidence.failCleanup(false);await recoverFullRestore(evidence,reopened);
  assert.deepEqual(reopened.state.completedCourses,{});assert.deepEqual(reopened.state.completedPaths,{});
});

test('blocked progress storage retains the recovery journal for a later successful visit',async()=>{
  const memory=memoryStore(),evidence=journalStore({id:'restore-1',progress:progress()});memory.block(true);
  assert.deepEqual(await recoverFullRestore(evidence,memory.store),{persistent:false});
  assert.equal(memory.store.state.completedCourses.C31,true);assert.ok(await evidence.pendingRestore());
  memory.block(false);const reopened=createProgressStore(data,()=>memory.storage,'learning');reopened.load();
  assert.deepEqual(await recoverFullRestore(evidence,reopened),{persistent:true});assert.equal(reopened.state.completedCourses.C31,true);
});

test('successful full restore stages once and updates the learning state',async()=>{
  const {store}=memoryStore(),evidence=journalStore(null);
  assert.deepEqual(await restoreFullBackup({progress:progress(),files:[]},evidence,store),{persistent:true});
  assert.equal(store.state.restoreId,'new-restore');assert.equal(earnedBadges(data,store.state).length,3);
});
