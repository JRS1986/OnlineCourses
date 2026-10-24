// Progressive visual enhancements; all navigation also works without motion.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
let activeCleanup = () => {};

export function installMotionControl() {
  const button = document.querySelector('#motion-toggle');
  const sync = () => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
    button.textContent = `Motion ${motionEnabled ? 'on' : 'off'}`;
    button.setAttribute('aria-pressed', String(motionEnabled));
  };
  button.addEventListener('click', () => { motionEnabled = !motionEnabled; sync(); });
  reducedMotion.addEventListener('change', ev => { motionEnabled = !ev.matches; sync(); });
  sync();
}

const layers = {
  embedded: {number:'01', role:'THE REFLEXES', title:'Embedded AI', detail:'Small models. Fast decisions. Intelligence close to the sensor.', path:'D1', cue:'SENSE → CLASSIFY'},
  edge: {number:'02', role:'LOCAL PERCEPTION', title:'Edge AI', detail:'Combine signals, understand the scene, and coordinate locally.', path:'D2', cue:'PERCEIVE → COORDINATE'},
  agentic: {number:'03', role:'PLANNING & TOOL USE', title:'Agentic AI', detail:'Plan a task, use tools, check the result, and decide what comes next.', path:'D3', cue:'PLAN → ACT → VERIFY'},
};

export function brainExplorer() {
  return `<div class="brain-explorer" aria-label="Explore the three Industrial AI roles">
    <div class="explorer-top"><span><i class="signal-dot"></i> INDUSTRIAL INTELLIGENCE</span><span class="explorer-coordinate">SYS / 03</span></div>
    <div class="brain-viewport"><div class="brain-world">
      <svg class="brain-grid" viewBox="0 0 500 420" aria-hidden="true"><defs><pattern id="lab-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width=".6"/></pattern></defs><rect width="500" height="420" fill="url(#lab-grid)"/><ellipse cx="250" cy="220" rx="210" ry="115"/><ellipse cx="250" cy="220" rx="155" ry="190" transform="rotate(38 250 220)"/><path d="M250 18V402M28 220H472"/><circle cx="250" cy="220" r="174" stroke-dasharray="2 12"/></svg>
      <div class="neural-stack">${Object.entries(layers).reverse().map(([key,l])=>`<button class="neural-layer ${key} ${key==='agentic'?'selected':''}" data-layer="${key}" aria-pressed="${key==='agentic'}"><span class="chip-number">${l.number}</span><span><small>${l.role}</small><strong>${l.title}</strong></span><span class="chip-glyph" aria-hidden="true">${key==='agentic'?'✳':key==='edge'?'▦':'⏣'}</span></button>`).join('')}</div>
      <span class="map-coordinate coord-a">48° / N</span><span class="map-coordinate coord-b">INTELLIGENCE AT EVERY LEVEL</span>
    </div></div>
    <div class="zoom-controls" aria-label="Diagram zoom"><span>EXPLORE THE SYSTEM</span><button id="zoom-out" aria-label="Zoom out">−</button><button id="zoom-reset" aria-label="Reset diagram zoom">100%</button><button id="zoom-in" aria-label="Zoom in">+</button></div>
    <div class="explorer-detail" aria-live="polite"><div><span id="brain-cue">${layers.agentic.cue}</span><p id="brain-detail">${layers.agentic.detail}</p></div><a id="brain-path" href="#paths/D3" aria-label="Explore Agentic AI learning path">↗</a></div>
  </div>`;
}

export function enhanceView() {
  activeCleanup();
  const cleanups = [];
  const main = document.querySelector('main');
  if (motionEnabled) {
    main.animate([{opacity:.5, transform:'translateY(12px) scale(.99)'},{opacity:1, transform:'none'}], {duration:380,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  const explorer = document.querySelector('.brain-explorer');
  if (explorer) {
    let zoom = 1;
    const world = explorer.querySelector('.brain-world');
    const updateZoom = () => {
      world.style.setProperty('--map-zoom',zoom);
      explorer.querySelector('#zoom-reset').textContent=`${Math.round(zoom*100)}%`;
      explorer.querySelector('#zoom-in').disabled=zoom>=1.4;
      explorer.querySelector('#zoom-out').disabled=zoom<=.8;
    };
    explorer.querySelector('#zoom-in').addEventListener('click',()=>{zoom=Math.min(1.4,Number((zoom+.1).toFixed(1)));updateZoom();});
    explorer.querySelector('#zoom-out').addEventListener('click',()=>{zoom=Math.max(.8,Number((zoom-.1).toFixed(1)));updateZoom();});
    explorer.querySelector('#zoom-reset').addEventListener('click',()=>{zoom=1;updateZoom();});
    explorer.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{
      const key=button.dataset.layer, layer=layers[key];
      explorer.dataset.layer=key;
      explorer.querySelectorAll('[data-layer]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
      explorer.querySelector('#brain-cue').textContent=layer.cue;
      explorer.querySelector('#brain-detail').textContent=layer.detail;
      const link=explorer.querySelector('#brain-path');link.href=`#paths/${layer.path}`;link.setAttribute('aria-label',`Explore ${layer.title} learning path`);
    }));
    const move = ev => {
      if(!motionEnabled || ev.pointerType==='touch')return;
      const rect=explorer.getBoundingClientRect();
      world.style.setProperty('--map-x',`${(ev.clientX-rect.left-rect.width/2)*.025}px`);
      world.style.setProperty('--map-y',`${(ev.clientY-rect.top-rect.height/2)*.025}px`);
    };
    const leave=()=>{world.style.setProperty('--map-x','0px');world.style.setProperty('--map-y','0px');};
    explorer.addEventListener('pointermove',move);explorer.addEventListener('pointerleave',leave);
    cleanups.push(()=>{explorer.removeEventListener('pointermove',move);explorer.removeEventListener('pointerleave',leave);});
  }
  activeCleanup=()=>cleanups.forEach(fn=>fn());
}
