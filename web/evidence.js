export const MAX_FILE_BYTES=10*1024*1024;
export const MAX_TOTAL_BYTES=100*1024*1024;
export const MAX_FILES=50;
export const EVIDENCE_ACCEPT='.pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp';
export function validEvidenceTarget(data,target){
  const [kind,id,...rest]=String(target).split(':');
  return rest.length===0 && (kind==='course' && data.courses.some(c=>c.id===id) || kind==='path' && data.paths.some(p=>p.id===id));
}
export function detectEvidenceType(bytes){
  const starts=values=>values.every((v,i)=>bytes[i]===v);
  if(starts([0x25,0x50,0x44,0x46,0x2d]))return 'application/pdf';
  if(starts([137,80,78,71,13,10,26,10]))return 'image/png';
  if(starts([255,216,255]))return 'image/jpeg';
  if(starts([82,73,70,70]) && [87,69,66,80].every((v,i)=>bytes[i+8]===v))return 'image/webp';
  return null;
}
export function checkEvidenceCapacity(records,bytes){
  if(records.length>=MAX_FILES)throw new Error('This browser already has 50 attachments. Remove an old file before adding another.');
  if(records.reduce((sum,r)=>sum+r.size,0)+bytes>MAX_TOTAL_BYTES)throw new Error('The 100 MB attachment limit would be exceeded. Download and remove older files first.');
}
export async function prepareEvidence(data,file,target){
  if(!validEvidenceTarget(data,target))throw new Error('Choose a course or learning path for this file.');
  if(!file || !Number.isFinite(file.size) || file.size<=0)throw new Error('Choose a non-empty file.');
  if(file.size>MAX_FILE_BYTES)throw new Error('Each attachment must be 10 MB or smaller.');
  const mime=detectEvidenceType(new Uint8Array(await file.slice(0,16).arrayBuffer()));
  if(!mime)throw new Error('Use a PDF, PNG, JPEG, or WebP file. Other formats are not supported.');
  const extension={'application/pdf':'pdf','image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[mime];
  const original=String(file.name||'Completion').replace(/[\u0000-\u001f\u007f/\\]/g,'').slice(0,150);
  const name=(original.replace(/\.[^.]+$/,'')||'Completion')+'.'+extension;
  return {target,name,mime,size:file.size,blob:file.slice(0,file.size,mime)};
}

export function createEvidenceStore(data,getIndexedDB,dbName){
  let opening;
  function open(){
    if(!opening)opening=new Promise((resolve,reject)=>{
      let request,blocked=false;
      try{request=getIndexedDB().open(dbName,2);}catch{reject(new Error('Browser file storage is unavailable. Your progress still works; keep the original file.'));return;}
      request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('files'))request.result.createObjectStore('files',{keyPath:'id'});if(!request.result.objectStoreNames.contains('restore'))request.result.createObjectStore('restore');};
      request.onsuccess=()=>{const db=request.result;if(blocked){db.close();return;}db.onversionchange=()=>{db.close();opening=null;};resolve(db);};
      request.onerror=()=>reject(new Error('Browser file storage is unavailable. Your progress still works; keep the original file.'));
      request.onblocked=()=>{blocked=true;reject(new Error('Close other tabs of this guide and try attaching the file again.'));};
    }).catch(error=>{opening=null;throw error;});
    return opening;
  }
  async function transact(mode,operation,names=['files']){
    const db=await open();
    return new Promise((resolve,reject)=>{
      let result,reason;
      const tx=db.transaction(names,mode),files=tx.objectStore(names[0]);
      const fail=error=>{reason=error;tx.abort();};
      tx.oncomplete=()=>resolve(result);
      tx.onabort=()=>reject(reason||new Error('The browser could not save this change. Storage may be full or disabled; keep your original files.'));
      tx.onerror=()=>{}; // onabort reports the failed transaction once.
      try{operation(files,value=>{result=value;},fail,tx);}catch(error){fail(error);}
    });
  }
  const list=()=>transact('readonly',(files,done)=>{const req=files.getAll();req.onsuccess=()=>done(req.result.map(({blob,...metadata})=>metadata).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)));});
  const get=id=>transact('readonly',(files,done)=>{const req=files.get(id);req.onsuccess=()=>done(req.result);});
  const add=async(file,target)=>{
    const prepared=await prepareEvidence(data,file,target);
    const entry={...prepared,id:crypto.randomUUID(),createdAt:new Date().toISOString()};
    return transact('readwrite',(files,done,fail)=>{
      const req=files.getAll();req.onsuccess=()=>{
        try{checkEvidenceCapacity(req.result,entry.size);files.add(entry);done(entry.id);}catch(error){fail(error);}
      };
    });
  };
  const remove=id=>transact('readwrite',(files,done)=>{files.delete(id);done(true);});
  const clear=()=>transact('readwrite',(files,done)=>{files.clear();done(true);});
  const all=()=>transact('readonly',(files,done)=>{const req=files.getAll();req.onsuccess=()=>done(req.result);});
  const stageRestore=snapshot=>transact('readwrite',(files,done,fail,tx)=>{
    files.clear();for(const file of snapshot.files)files.add(file);
    const pending={id:crypto.randomUUID(),progress:snapshot.progress};
    tx.objectStore('restore').put(pending,'pending');done(pending.id);
  },['files','restore']);
  const pendingRestore=()=>transact('readonly',(journal,done)=>{const req=journal.get('pending');req.onsuccess=()=>done(req.result);},['restore']);
  const finishRestore=id=>transact('readwrite',(journal,done)=>{const req=journal.get('pending');req.onsuccess=()=>{if(req.result?.id===id)journal.delete('pending');done(true);};},['restore']);
  return {list,get,add,remove,clear,all,stageRestore,pendingRestore,finishRestore};
}
