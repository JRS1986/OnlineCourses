import {escapeHTML as e} from './markdown.js';
import {EVIDENCE_ACCEPT} from './evidence.js';

const sizeLabel=bytes=>bytes<1024*1024?`${Math.max(1,Math.round(bytes/1024))} KB`:`${(bytes/1024/1024).toFixed(1)} MB`;
const targetTitle=(data,target)=>{const [kind,id]=target.split(':');return (kind==='path'?data.paths:data.courses).find(item=>item.id===id)?.title||'Previous learning resource';};
export function evidenceSection(data,target=''){
  const options=target?'':`<label class="field">Attach to<select name="evidence-target" required><option value="">Choose a course or path…</option><optgroup label="Learning paths">${data.paths.map(p=>`<option value="path:${p.id}">${p.id} · ${e(p.title)}</option>`).join('')}</optgroup><optgroup label="Courses and readings">${data.courses.map(c=>`<option value="course:${c.id}">${c.id} · ${e(c.title)}</option>`).join('')}</optgroup></select></label>`;
  return `<section class="evidence-section" data-evidence-root data-evidence-target="${e(target)}"><span class="eyebrow">MAKE YOUR LEARNING VISIBLE</span><h2>${target?'Keep your completion evidence.':'Your certificates & evidence'}</h2><p>${target?e(targetTitle(data,target))+'. ':''}Attach certificates, screenshots, or PDF prints of completion pages. Files stay in this browser; they are never uploaded to a server.</p><form class="evidence-form">${options}<label class="evidence-dropzone"><span class="evidence-file-icon" aria-hidden="true">↥</span><strong>Attach a certificate or screenshot</strong><span>Choose files or drop them here</span><small>PDF, PNG, JPEG, WebP · 10 MB per file</small><input type="file" name="evidence-files" accept="${EVIDENCE_ACCEPT}" multiple aria-label="Attach certificates or screenshots"></label></form><p class="evidence-status" role="status" aria-live="polite"></p><div class="evidence-list"><p>Loading local attachments…</p></div><p class="evidence-footnote">These are personal records, not verified credentials. Attaching a file does not mark a course or path complete. Full backups in My progress include these files. Progress-only JSON backups do not.</p>${target?'<a class="text-link" href="#progress">Manage all attachments →</a>':'<details class="clear-evidence"><summary>Remove all local attachments</summary><p>Download anything you want to keep first. This only removes attachments; assessment answers, progress, and badges stay unchanged.</p><button class="button secondary small" data-clear-evidence>Remove all attachments from this browser</button></details>'}<dialog class="evidence-preview"><form method="dialog"><button class="button secondary small" aria-label="Close image preview">Close ✕</button></form><p class="preview-filename"></p><img alt="Completion evidence preview"></dialog></section>`;
}

export function mountEvidence(root,{data,store,notify,channel}){
  const section=root.querySelector('[data-evidence-root]');if(!section)return ()=>{};
  const list=section.querySelector('.evidence-list'),status=section.querySelector('.evidence-status');
  const input=section.querySelector('[name="evidence-files"]'),dropzone=section.querySelector('.evidence-dropzone');
  const dialog=section.querySelector('dialog');
  let active=true,busy=false,revision=0,previewUrl;
  const say=(message,error=false)=>{if(!active)return;status.textContent=message;status.classList.toggle('is-error',error);};
  const broadcast=()=>{try{channel?.postMessage({type:'evidence-changed'});}catch{/* Tab synchronization is optional. */}};
  async function refresh(){
    const current=++revision;
    try{
      const all=await store.list();if(!active||current!==revision)return;
      const rows=all.filter(item=>!section.dataset.evidenceTarget||item.target===section.dataset.evidenceTarget);
      list.innerHTML=rows.length?rows.map(item=>`<article class="evidence-item"><span class="evidence-type" aria-hidden="true">${item.mime==='application/pdf'?'PDF':'IMG'}</span><div class="evidence-info"><strong>${e(item.name)}</strong><span>${e(targetTitle(data,item.target))}</span><small>${sizeLabel(item.size)} · ${e(new Date(item.createdAt).toLocaleDateString())} · Saved in this browser</small></div><div class="evidence-actions">${item.mime.startsWith('image/')?`<button class="button secondary small" data-preview-evidence="${e(item.id)}">Preview</button>`:''}<button class="button secondary small" data-download-evidence="${e(item.id)}">Download</button><details><summary>Remove</summary><button class="button secondary small" data-remove-evidence="${e(item.id)}">Remove this file</button></details></div></article>`).join(''):'<div class="evidence-empty">Your certificates and completion records will appear here.</div>';
      if(!section.dataset.evidenceTarget)list.insertAdjacentHTML('beforeend',`<p class="micro-note">${all.length} / 50 attachments · ${sizeLabel(all.reduce((sum,item)=>sum+item.size,0))} / 100 MB stored</p>`);
    }catch(error){if(active){list.innerHTML='';say(error.message,true);}}
  }
  async function attach(files){
    if(busy||!files.length)return;
    const target=section.dataset.evidenceTarget||section.querySelector('[name="evidence-target"]')?.value;
    if(!target){say('Choose a course or path before attaching a file.',true);return;}
    busy=true;input.disabled=true;section.setAttribute('aria-busy','true');
    let count=0;const errors=[];
    for(const file of files){
      say(`Saving ${file.name} in this browser…`);
      try{await store.add(file,target);count++;}catch(error){errors.push(`${file.name}: ${error.message}`);}
    }
    busy=false;if(active){input.disabled=false;input.value='';section.removeAttribute('aria-busy');}
    if(count)broadcast();
    await refresh();
    say(`${count?`${count} ${count===1?'file':'files'} saved locally. `:''}${errors.join(' ')}`,!!errors.length);
  }
  const change=()=>attach([...input.files]);input.addEventListener('change',change);
  const over=event=>{event.preventDefault();dropzone.classList.add('drag-over');};
  const leave=()=>dropzone.classList.remove('drag-over');
  const drop=event=>{event.preventDefault();leave();attach([...event.dataTransfer.files]);};
  dropzone.addEventListener('dragover',over);dropzone.addEventListener('dragleave',leave);dropzone.addEventListener('drop',drop);
  const releasePreview=()=>{if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=null;dialog.querySelector('img').removeAttribute('src');};
  dialog.addEventListener('close',releasePreview);
  const click=async event=>{
    const button=event.target.closest('[data-preview-evidence],[data-download-evidence],[data-remove-evidence],[data-clear-evidence]');if(!button||busy)return;
    button.disabled=true;
    try{
      if(button.hasAttribute('data-clear-evidence')){await store.clear();broadcast();await refresh();say('All local attachments removed.');return;}
      if(button.dataset.removeEvidence){await store.remove(button.dataset.removeEvidence);broadcast();await refresh();say('Attachment removed.');return;}
      const item=await store.get(button.dataset.previewEvidence||button.dataset.downloadEvidence);
      if(!item)throw new Error('This file is no longer saved in this browser.');
      if(!active)return;
      if(button.dataset.previewEvidence){
        releasePreview();previewUrl=URL.createObjectURL(item.blob);dialog.querySelector('img').src=previewUrl;dialog.querySelector('.preview-filename').textContent=item.name;dialog.showModal();
      }else{
        const url=URL.createObjectURL(item.blob),link=document.createElement('a');link.href=url;link.download=item.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Attachment downloaded.');
      }
    }catch(error){say(error.message,true);}finally{if(button.isConnected)button.disabled=false;}
  };
  section.addEventListener('click',click);
  const sync=event=>{if(event.data?.type==='evidence-changed')refresh();};channel?.addEventListener('message',sync);
  refresh();
  return ()=>{active=false;revision++;section.removeEventListener('click',click);input.removeEventListener('change',change);dropzone.removeEventListener('dragover',over);dropzone.removeEventListener('dragleave',leave);dropzone.removeEventListener('drop',drop);channel?.removeEventListener('message',sync);dialog.close();releasePreview();};
}
