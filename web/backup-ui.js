import {escapeHTML as e} from './markdown.js';
import {createFullBackup,readFullBackup,restoreFullBackup} from './backup.js';

export function fullBackupControls(){
  return `<section class="full-backup" aria-labelledby="full-backup-title"><div class="backup-symbol" aria-hidden="true">↗</div><div><span class="eyebrow">TAKE YOUR PROGRESS WITH YOU</span><h3 id="full-backup-title">New browser. Same learning journey.</h3><p>One full backup carries your assessment, learning plan, progress, badges, and every attached certificate or screenshot.</p><div class="actions"><button class="button" data-export-full>Download full backup ↓</button><label class="button secondary import-label">Restore full backup<input data-import-full type="file" accept=".iai-backup" aria-label="Choose a full backup to restore"></label></div><p class="backup-note">On your other device, open this guide → My progress → Restore full backup. The file stays with you; nothing is sent to a server. It contains your answers and certificate files and is not encrypted, so keep it somewhere private.</p><p data-backup-status role="status" aria-live="polite"></p><div data-backup-preview></div></div></section>`;
}

export function mountFullBackup(root,{data,progressStore,evidenceStore,onRestored,channel,notify}){
  const section=root.querySelector('.full-backup');if(!section)return ()=>{};
  const status=section.querySelector('[data-backup-status]'),preview=section.querySelector('[data-backup-preview]');
  const input=section.querySelector('[data-import-full]'),exportButton=section.querySelector('[data-export-full]');
  let active=true,busy=false,snapshot=null;
  const say=(message,error=false)=>{if(active){status.textContent=message;status.classList.toggle('is-error',error);}};
  const setBusy=value=>{busy=value;if(!active)return;section.setAttribute('aria-busy',String(value));section.querySelectorAll('button,input').forEach(control=>{control.disabled=value;});};
  const exportBackup=async()=>{
    if(busy)return;setBusy(true);say('Gathering your learning progress and certificates…');
    try{
      const progress=structuredClone(progressStore.load()),files=await evidenceStore.all();
      const archive=await createFullBackup(data,progress,files,say);if(!active)return;
      const url=URL.createObjectURL(archive),link=document.createElement('a');link.href=url;link.download=`industrial-ai-full-${new Date().toISOString().slice(0,10)}.iai-backup`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      say(`Full backup downloaded, including ${files.length} ${files.length===1?'attachment':'attachments'}. Keep this file to restore on another device.`);
    }catch(error){say(`Backup could not be created. ${error.message}`,true);}finally{setBusy(false);}
  };
  const chooseBackup=async()=>{
    if(busy)return;const file=input.files[0];if(!file)return;
    snapshot=null;preview.innerHTML='';setBusy(true);say('Reading and checking your full backup…');
    try{
      const candidate=await readFullBackup(data,file,say),existing=await evidenceStore.list();if(!active)return;
      snapshot=candidate;const p=candidate.progress;
      preview.innerHTML=`<div class="backup-review"><span class="eyebrow">READY TO RESTORE</span><h4>Everything in this file</h4><p>Exported ${e(new Date(candidate.exportedAt).toLocaleString())}.</p><div class="backup-counts"><span><strong>${Object.keys(p.completedCourses).length}</strong> resources</span><span><strong>${Object.keys(p.completedSteps).length}</strong> study blocks</span><span><strong>${candidate.badges.length}</strong> badges</span><span><strong>${candidate.files.length}</strong> files</span></div><p>${Object.keys(p.draft.answers).length} assessment answers · ${p.savedPlan?'Saved learning plan included':'No saved learning plan'} · ${(candidate.totalBytes/1024/1024).toFixed(1)} MB of attachments</p>${candidate.files.length?`<details><summary>Included certificates and screenshots</summary><ul>${candidate.files.map(f=>`<li><strong>${e(f.name)}</strong><span>${e(f.target)} · ${Math.max(1,Math.round(f.size/1024))} KB</span></li>`).join('')}</ul></details>`:''}<p><strong>This replaces this browser’s assessment, plan, progress, badges, and all ${existing.length} current attachments.</strong> Download a full backup first if you want to keep the current data. Badge eligibility is recalculated against the current learning paths.</p><div class="actions"><button class="button" data-restore-full>Restore everything from this backup</button><button class="button secondary" data-cancel-full>Cancel</button></div></div>`;
      say('Backup checked. Review its contents before restoring.');
    }catch(error){say(`${error.message} Your current data has not changed.`,true);}finally{input.value='';setBusy(false);}
  };
  const click=async event=>{
    if(busy)return;
    if(event.target.closest('[data-cancel-full]')){snapshot=null;preview.innerHTML='';say('Restore cancelled. Your current data has not changed.');return;}
    if(!event.target.closest('[data-restore-full]')||!snapshot)return;
    setBusy(true);say('Restoring your full learning backup…');
    try{
      const result=await restoreFullBackup(snapshot,evidenceStore,progressStore);
      snapshot=null;try{channel?.postMessage({type:'evidence-changed'});}catch{/* Optional tab sync. */}
      onRestored();
      notify(result?.persistent?'Full backup restored: progress, badges, and certificates.':'Backup retained. Progress saving is blocked; reload after enabling browser storage.');
    }catch(error){say(error.message,true);}finally{setBusy(false);}
  };
  exportButton.addEventListener('click',exportBackup);input.addEventListener('change',chooseBackup);section.addEventListener('click',click);
  return ()=>{active=false;snapshot=null;exportButton.removeEventListener('click',exportBackup);input.removeEventListener('change',chooseBackup);section.removeEventListener('click',click);};
}
