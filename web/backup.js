import {normalizeProgress} from './progress.js';
import {earnedBadges} from './achievements.js';
import {prepareEvidence,MAX_FILES,MAX_FILE_BYTES,MAX_TOTAL_BYTES} from './evidence.js';

const MAGIC=new TextEncoder().encode('IAIBKP1\n');
export const MAX_MANIFEST_BYTES=1024*1024;
export const MAX_BACKUP_BYTES=12+MAX_MANIFEST_BYTES+MAX_TOTAL_BYTES;
const record=value=>value!==null && typeof value==='object' && !Array.isArray(value);
const digest=async blob=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer())),b=>b.toString(16).padStart(2,'0')).join('');
const validDate=value=>typeof value==='string' && Number.isFinite(Date.parse(value));
const fail=message=>{throw new Error(message);};

// Binary container: eight-byte magic, four-byte manifest length, UTF-8 JSON,
// then the original file bytes in manifest order. No base64 expansion or unzip.
export async function createFullBackup(data,progress,files,onStatus=()=>{}){
  const normalized=normalizeProgress(data,progress);
  if(files.length>MAX_FILES)fail('Too many attachments for a full backup.');
  const manifest={format:'industrial-ai-full-backup',version:1,exportedAt:new Date().toISOString(),progress:normalized,badges:earnedBadges(data,normalized).map(b=>b.id),files:[]};
  const blobs=[];let total=0;
  for(const [index,file] of files.entries()){
    onStatus(`Packing certificate ${index+1} of ${files.length}…`);
    const checked=await prepareEvidence(data,new File([file.blob],file.name),file.target);
    total+=checked.size;if(total>MAX_TOTAL_BYTES)fail('Attachments exceed the 100 MB backup limit.');
    if(file.size!==checked.size || file.mime!==checked.mime || !validDate(file.createdAt))fail('An attachment record is damaged. Download your originals before trying again.');
    manifest.files.push({id:file.id,target:file.target,name:checked.name,mime:checked.mime,size:checked.size,createdAt:file.createdAt,sha256:await digest(checked.blob)});
    blobs.push(checked.blob);
  }
  const encoded=new TextEncoder().encode(JSON.stringify(manifest));
  if(encoded.length>MAX_MANIFEST_BYTES)fail('The backup metadata is too large.');
  const header=new Uint8Array(12);header.set(MAGIC);new DataView(header.buffer).setUint32(8,encoded.length,true);
  return new Blob([header,encoded,...blobs],{type:'application/octet-stream'});
}

export async function readFullBackup(data,file,onStatus=()=>{}){
  if(!file || file.size<12 || file.size>MAX_BACKUP_BYTES)fail('Choose a full .iai-backup file from this guide (up to 101 MB).');
  const header=new Uint8Array(await file.slice(0,12).arrayBuffer());
  if(!MAGIC.every((byte,i)=>header[i]===byte))fail('This is not a supported full backup. Use the progress-only restore for older JSON backups.');
  const length=new DataView(header.buffer).getUint32(8,true);
  if(length===0 || length>MAX_MANIFEST_BYTES || 12+length>file.size)fail('The backup is incomplete or damaged.');
  let manifest;
  try{manifest=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(await file.slice(12,12+length).arrayBuffer()));}catch{fail('The backup metadata is damaged.');}
  if(!record(manifest) || manifest.format!=='industrial-ai-full-backup' || manifest.version!==1)fail('This backup format is not supported by this version of the guide.');
  if(!validDate(manifest.exportedAt) || !Array.isArray(manifest.files) || manifest.files.length>MAX_FILES)fail('The backup has invalid attachment metadata.');
  const progress=normalizeProgress(data,manifest.progress);
  const files=[],ids=new Set();let offset=12+length,total=0;
  for(const [index,item] of manifest.files.entries()){
    onStatus(`Checking certificate ${index+1} of ${manifest.files.length}…`);
    if(!record(item) || typeof item.id!=='string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(item.id) || ids.has(item.id) || typeof item.name!=='string' || item.name.length>160 || !validDate(item.createdAt) || typeof item.sha256!=='string' || !/^[a-f0-9]{64}$/.test(item.sha256))fail('The backup has invalid or duplicate attachment records.');
    if(!Number.isSafeInteger(item.size) || item.size<=0 || item.size>MAX_FILE_BYTES)fail('The backup contains an invalid attachment size.');
    total+=item.size;if(total>MAX_TOTAL_BYTES || offset+item.size>file.size)fail('The backup is incomplete or exceeds the attachment limit.');
    const checked=await prepareEvidence(data,new File([file.slice(offset,offset+item.size)],item.name),item.target);
    if(checked.mime!==item.mime || await digest(checked.blob)!==item.sha256)fail(`The attachment “${item.name}” is damaged. Choose an intact backup.`);
    files.push({...checked,id:item.id,createdAt:item.createdAt});ids.add(item.id);offset+=item.size;
  }
  if(offset!==file.size)fail('The backup has unexpected trailing data.');
  // Badge eligibility comes from validated progress, never a claimed badge list.
  return {progress,files,badges:earnedBadges(data,progress),exportedAt:manifest.exportedAt,totalBytes:total};
}

// Files and a recovery journal commit together in IndexedDB. If the tab closes
// before localStorage is updated, the next visit finishes that same restore.
// The restore ID prevents an uncleared journal from replaying over newer work.
export async function recoverFullRestore(evidenceStore,progressStore){
  const pending=await evidenceStore.pendingRestore();if(!pending)return null;
  if(progressStore.state.restoreId!==pending.id)progressStore.replace({...pending.progress,restoreId:pending.id});
  const persistent=progressStore.status==='ready';
  if(persistent)try{await evidenceStore.finishRestore(pending.id);}catch{/* The saved restore ID makes retrying cleanup safe. */}
  return {persistent};
}
export async function restoreFullBackup(snapshot,evidenceStore,progressStore){
  await evidenceStore.stageRestore(snapshot);
  try{return await recoverFullRestore(evidenceStore,progressStore);}
  catch{throw new Error('Your full backup is safely staged. Reload the guide to finish restoring it.');}
}
