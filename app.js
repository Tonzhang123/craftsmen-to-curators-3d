import * as THREE from './vendor/three.module.min.js';

/* =========================================================
   Bilingual data for the three 3D scenes
   ========================================================= */
const DATA = {
  bloom: {
    title: { zh:'逆向修訂布魯姆分類法', en:"Inverted Revised Bloom's Taxonomy" },
    parts: [
      { id:'create',     label:'CREATE',     color:0xe8b04b, top:3.6, bottom:3.0,
        zh:{ sub:'創造 · 視覺與概念化', body:'學生以自然語言把高層敘事概念直接轉譯為視覺原型。GenAI 卸下執行負擔，讓創作從最高層開始。', kv:'起點：直接從「創造」開啟創作閉環' },
        en:{ sub:'Vision & Conceptualization', body:'Students translate high-level narrative concepts straight into visual prototypes using natural language. GenAI offloads execution, so creation begins at the top.', kv:'Starting point: the loop opens directly at CREATE' } },
      { id:'evaluate',   label:'EVALUATE',   color:0x5b9dff, top:3.0, bottom:2.4,
        zh:{ sub:'評價 · 美學與品質策展', body:'對照藝術意圖批判性地審視產出，判斷視覺連續性、情感共鳴與敘事節奏。', kv:'人類判斷力成為創意的地板' },
        en:{ sub:'Aesthetic & Quality Curation', body:'Critically examine outputs against artistic intent — judging visual continuity, emotional resonance and narrative rhythm.', kv:'Human judgment becomes the floor of creativity' } },
      { id:'analyze',    label:'ANALYZE',    color:0x46d6c4, top:2.4, bottom:1.8,
        zh:{ sub:'分析 · 解構與摩擦診斷', body:'當輸出偏離預期（角色變形、解剖幻覺）時解構失敗，診斷成因是提示詞歧義、參數誤配還是模型限制。', kv:'認知摩擦最集中的一層' },
        en:{ sub:'Deconstruction & Friction Diagnosis', body:'When output drifts (deformed characters, anatomical hallucinations), deconstruct the failure — ambiguous prompt, wrong parameter, or model limit?', kv:'The layer where cognitive friction concentrates' } },
      { id:'apply',      label:'APPLY',      color:0xb388ff, top:1.8, bottom:1.2,
        zh:{ sub:'應用 · 精準控制與提示詞工程', body:'以領域專屬語言（精確焦距、運鏡指令）或調整劇本邊界來化解摩擦。', kv:'把藝術直覺轉為結構化參數' },
        en:{ sub:'Precision Control & Prompt Engineering', body:'Use domain-specific language (exact focal length, camera moves) or reshape script boundaries to resolve friction.', kv:'Turning artistic intuition into structured parameters' } },
      { id:'understand', label:'UNDERSTAND', color:0xff7a8a, top:1.2, bottom:0.7,
        zh:{ sub:'理解 · 生成邏輯與電影語法', body:'在迭代循環中內化擴散模型潛空間機制與結構性電影語法。', kv:'迭代中悄然習得' },
        en:{ sub:'Generative Logic & Cinematic Grammar', body:'Internalize diffusion latent-space mechanics and structural film grammar through iterative loops.', kv:'Learned quietly through iteration' } },
      { id:'remember',   label:'REMEMBER',   color:0x9aa1b2, top:0.7, bottom:0.3,
        zh:{ sub:'記憶 · 工作流編碼', body:'把成功的提示詞語法、工具配置與流水線策略固化為可重用的個人模板。', kv:'沉澱為可複用知識' },
        en:{ sub:'Workflow Encoding', body:'Solidify successful prompt syntax, tool configs and pipeline strategies into reusable personal templates.', kv:'Sedimented into reusable knowledge' } },
    ],
    arrow: { zh:'學生認知路徑：由下而上「逆向」遍歷 —— 執行 → 策展', en:'Students traverse INVERSELY, bottom → top: execution → curation' }
  },
  constructs: {
    title: { zh:'概念框架 · 三個構念', en:'Conceptual Framework · Three Constructs' },
    parts: [
      { id:'cf', label:'COGNITIVE\nFRICTION', color:0xff7a8a, pos:[-3.4,1.7,0],
        zh:{ sub:'認知摩擦', body:'補充 Sweller 的外在認知負荷，納入與概率模型協商所帶來的操作負荷。', kv:'維度：視覺不一致 · 不可控運動 · 幻覺瑕疵<br>邊界：模型隨機性高時顯著' },
        en:{ sub:'Cognitive Friction', body:'Extends Sweller’s extraneous load to include the operational load of negotiating probabilistic models.', kv:'Dimensions: visual inconsistency · uncontrollable motion · artifacts<br>Boundary: salient when randomness is high' } },
      { id:'cs', label:'CURATORIAL\nSHIFT', color:0xe8b04b, pos:[3.4,1.7,0],
        zh:{ sub:'策展轉向', body:'觀察到修訂布魯姆分類法的逆向遍歷：從實體生產轉向生成 → 策展 → 提示詞精調。', kv:'維度：創作願景 · 批判選擇 · 診斷分析<br>邊界：適用於隨機生成模型' },
        en:{ sub:'The Curatorial Shift', body:'The observed inverse traversal of the Revised Bloom’s taxonomy — from physical making to generation → curation → prompt tuning.', kv:'Dimensions: creative vision · critical selection · diagnostic analysis<br>Boundary: applies to stochastic generators' } },
      { id:'ap', label:'ASSESSMENT\nPARADOX', color:0xb388ff, pos:[0,-1.9,0],
        zh:{ sub:'評估悖論', body:'挑戰面向成品的評估理論：只看最終影片，無法反映真實學習產出。', kv:'維度：過程—成品背離 · 評估者資訊不對稱<br>ICC = 0.488 (p = .052)' },
        en:{ sub:'The Assessment Paradox', body:'Challenges product-oriented assessment: the final film alone cannot reflect actual learning.', kv:'Dimensions: process–product divergence · rater information asymmetry<br>ICC = 0.488 (p = .052)' } },
    ],
    arrow: { zh:'三者環環相扣：摩擦迫使策展，策展造成評估落差', en:'Interlinked: friction forces curation; curation creates the assessment gap' }
  },
  method: {
    title: { zh:'方法論 · 三角驗證', en:'Methodology · Triangulation' },
    parts: [
      { id:'docs', label:'MAKING-OF\nDOCS', color:0x5b9dff, pos:[-3.6,1.2,0],
        zh:{ sub:'製作文檔', body:'劇本、分鏡、原始 AI 素材與 WeChat 過程紀錄，提供完整的創作軌跡。', kv:'用於重建提示詞迭代與工作流' },
        en:{ sub:'Making-of Docs', body:'Scripts, storyboards, raw AI assets and WeChat process logs — a complete creation trace.', kv:'Used to reconstruct prompt iterations and workflows' } },
      { id:'interviews', label:'SEMI-STRUCTURED\nINTERVIEWS', color:0x46d6c4, pos:[3.6,1.2,0],
        zh:{ sub:'半結構式訪談', body:'11 個團隊，每隊約 1 小時，深入了解主觀經驗與認知策略。', kv:'HAREC 倫理審批 HREP-20250566' },
        en:{ sub:'Semi-structured Interviews', body:'11 teams, ~1 hour each — probing subjective experience and cognitive strategies.', kv:'HAREC ethics approval HREP-20250566' } },
      { id:'matrix', label:'MARKING\nMATRIX', color:0xb388ff, pos:[0,-2.4,2.2],
        zh:{ sub:'評分矩陣', body:'10 個維度、7 點李克特量表；計算 ICC 與 Cohen’s κ 檢驗信度。', kv:'20% 片段雙人編碼：κ = 0.73 (p<.001)' },
        en:{ sub:'Marking Matrix', body:'10 dimensions, 7-point Likert; ICC and Cohen’s κ for reliability.', kv:'20% double-coded: κ = 0.73 (p<.001)' } },
      { id:'findings', label:'FINDINGS', color:0xe8b04b, pos:[0,-0.2,0], core:true,
        zh:{ sub:'交叉驗證的研究發現', body:'三個資料來源互為印證，收斂為認知摩擦、策展轉向與評估悖論三大發現。', kv:'多源三角互證提升結論可信度' },
        en:{ sub:'Cross-validated Findings', body:'Three sources corroborate one another, converging on friction, the curatorial shift, and the assessment paradox.', kv:'Multi-source triangulation strengthens credibility' } },
    ],
    arrow: { zh:'三源交會於中心 —— 交叉驗證', en:'Three sources converge at the center — cross-validation' }
  }
};

/* =========================================================
   Scene setup
   ========================================================= */
const stage = document.getElementById('stage');
const loading = document.getElementById('loading');
const infoPanel = document.getElementById('info');
const infoBody = document.getElementById('infoBody');
const infoClose = document.getElementById('infoClose');

let renderer, scene, camera, raycaster, mouse;
let currentScene = 'bloom';
let isEn = false;
let group = null;          // holds current scene objects
let clickables = [];       // meshes with userData.part
let hovered = null;
let raf = null;

// rotation state (custom controls, no OrbitControls dependency)
let rotX = -0.15, rotY = 0.5, targetRotX = -0.15, targetRotY = 0.5;
let zoom = 11, targetZoom = 11;
let dragging = false, lastX = 0, lastY = 0, autoRotate = true;

const LABEL_SCALE = 0.007;   // world units per pixel (labels sized relative to parts)

function init(){
  try{
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  }catch(e){
    loading.classList.add('err');
    loading.textContent = 'WebGL is not available in this browser.';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  stage.insertBefore(renderer.domElement, stage.firstChild);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, stage.clientWidth/stage.clientHeight, 0.1, 100);
  camera.position.set(0,0,zoom);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4,6,8); scene.add(key);
  const rim = new THREE.PointLight(0xe8b04b, 1.4, 40); rim.position.set(-6,-2,4); scene.add(rim);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  bindInput();
  buildScene(currentScene);
  loading.style.display='none';
  animate();
  window.addEventListener('resize', onResize);
}

/* ---------- helpers ---------- */
function makeLabel(text, color, opts){
  opts = opts || {};
  const lines = String(text).split('\n');
  const fontSize = opts.fontSize || 44;
  const pad = 18, lineH = fontSize*1.18;
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = 'bold '+fontSize+'px Segoe UI, Arial, sans-serif';
  let w = 0;
  lines.forEach(ln=>{ w = Math.max(w, measure.measureText(ln).width); });
  w = Math.ceil(w) + pad*2;
  const h = Math.ceil(lineH*lines.length) + pad;
  const canvas = document.createElement('canvas');
  canvas.width=w; canvas.height=h;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,w,h);
  ctx.font = 'bold '+fontSize+'px Segoe UI, Arial, sans-serif';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=10;
  ctx.fillStyle='#ffffff';
  lines.forEach((ln,i)=> ctx.fillText(ln, w/2, pad/2 + (i+0.5)*lineH));
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, transparent:true, depthTest:false }));
  const scale = opts.scale || LABEL_SCALE;
  spr.scale.set(w*scale, h*scale, 1);
  spr.renderOrder = 10;
  return spr;
}

function disposeGroup(g){
  if(!g) return;
  g.traverse(o=>{
    if(o.geometry) o.geometry.dispose();
    if(o.material){
      const mats = Array.isArray(o.material)?o.material:[o.material];
      mats.forEach(m=>{ if(m.map) m.map.dispose(); m.dispose(); });
    }
  });
  scene.remove(g);
}

function registerClickable(mesh, part, sceneKey){
  mesh.userData.part = part;
  mesh.userData.sceneKey = sceneKey;
  clickables.push(mesh);
}

/* ---------- scene builders ---------- */
function buildScene(key){
  disposeGroup(group);
  clickables = [];
  hovered = null;
  group = new THREE.Group();
  scene.add(group);

  if(key==='bloom') buildBloom();
  else if(key==='constructs') buildConstructs();
  else if(key==='method') buildMethod();

  targetRotX = rotX = -0.12;
  targetRotY = rotY = (key==='constructs') ? 0.12 : 0.5;
  targetZoom = zoom = 11;
  camera.position.z = zoom;
  infoPanel.classList.add('hidden');

  const cap = document.getElementById('sceneCap');
  const d = DATA[key];
  if(cap) cap.innerHTML = '<b>'+d.title[isEn?'en':'zh']+'</b><br>'+d.arrow[isEn?'en':'zh'];
}

function buildBloom(){
  const d = DATA.bloom;
  const H = 0.95, GAP = 0.06;
  const totalH = d.parts.length*(H+GAP);
  d.parts.forEach((p,i)=>{
    // trapezoidal prism: CylinderGeometry(radiusTop, radiusBottom, height, 4)
    const geo = new THREE.CylinderGeometry(p.top, p.bottom, H, 4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color:p.color, metalness:.25, roughness:.45,
      emissive:new THREE.Color(p.color), emissiveIntensity:.12,
      transparent:true, opacity:.94
    });
    const mesh = new THREE.Mesh(geo, mat);
    const y = totalH/2 - i*(H+GAP) - H/2;
    mesh.position.set(0, y, 0);
    mesh.rotation.y = Math.PI/4;
    group.add(mesh);
    registerClickable(mesh, p, 'bloom');

    const label = makeLabel(p.label, p.color);
    label.position.set(0, y, p.top+0.35);
    group.add(label);
  });
  // inverse-traversal arrow on the side
  const arrowMat = new THREE.LineBasicMaterial({ color:0xe8b04b, transparent:true, opacity:.8 });
  const pts = [ new THREE.Vector3(3.9,-totalH/2,0), new THREE.Vector3(3.9,totalH/2,0) ];
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  group.add(new THREE.Line(g, arrowMat));
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.18,0.5,12),
    new THREE.MeshBasicMaterial({color:0xe8b04b}));
  cone.position.set(3.9, totalH/2+0.2, 0); group.add(cone);
}

function buildConstructs(){
  const d = DATA.constructs;
  d.parts.forEach(p=>{
    const geo = new THREE.IcosahedronGeometry(1.15, 1);
    const mat = new THREE.MeshStandardMaterial({
      color:p.color, metalness:.35, roughness:.3,
      emissive:new THREE.Color(p.color), emissiveIntensity:.22, flatShading:true
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.fromArray(p.pos);
    group.add(mesh);
    registerClickable(mesh, p, 'constructs');
    const label = makeLabel(p.label, p.color);
    const below = p.pos[1] < 0;
    label.position.set(p.pos[0], p.pos[1] + (below ? -1.75 : 1.85), p.pos[2]);
    group.add(label);
  });
  // connecting triangle
  const pts = d.parts.map(p=>new THREE.Vector3().fromArray(p.pos));
  pts.push(pts[0].clone());
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({color:0x4a5266}));
  group.add(line);
  const core = new THREE.Mesh(new THREE.SphereGeometry(.32,20,20),
    new THREE.MeshBasicMaterial({color:0xe8b04b}));
  group.add(core);
}

function buildMethod(){
  const d = DATA.method;
  d.parts.forEach(p=>{
    const isCore = !!p.core;
    const geo = isCore
      ? new THREE.OctahedronGeometry(1.0, 0)
      : new THREE.BoxGeometry(1.9,1.25,1.9);
    const mat = new THREE.MeshStandardMaterial({
      color:p.color, metalness:.3, roughness:.4,
      emissive:new THREE.Color(p.color), emissiveIntensity:.22,
      transparent:true, opacity:isCore?1:.94
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.fromArray(p.pos);
    group.add(mesh);
    registerClickable(mesh, p, 'method');
    const label = makeLabel(p.label, p.color);
    label.position.set(p.pos[0], p.pos[1]+(isCore?1.5:1.15), p.pos[2]);
    group.add(label);
  });
  // lines from each source to the findings core
  const core = d.parts.find(p=>p.core);
  d.parts.filter(p=>!p.core).forEach(p=>{
    const a = new THREE.Vector3().fromArray(p.pos);
    const b = new THREE.Vector3().fromArray(core.pos);
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),
      new THREE.LineBasicMaterial({color:0x5a6272, transparent:true, opacity:.75})));
  });
}

/* ---------- interaction ---------- */
function bindInput(){
  const el = renderer.domElement;
  const down = e=>{ dragging=true; autoRotate=false; lastX=(e.touches?e.touches[0].clientX:e.clientX); lastY=(e.touches?e.touches[0].clientY:e.clientY); };
  const move = e=>{
    if(dragging){
      const x=(e.touches?e.touches[0].clientX:e.clientX), y=(e.touches?e.touches[0].clientY:e.clientY);
      targetRotY += (x-lastX)*0.008;
      targetRotX += (y-lastY)*0.006;
      targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));
      lastX=x; lastY=y;
    }else{
      const x=(e.touches?e.touches[0].clientX:e.clientX), y=(e.touches?e.touches[0].clientY:e.clientY);
      const r=el.getBoundingClientRect();
      mouse.x=((x-r.left)/r.width)*2-1; mouse.y=-((y-r.top)/r.height)*2+1;
    }
  };
  const up = e=>{
    if(dragging){
      const dx=Math.abs((e.changedTouches?e.changedTouches[0].clientX:e.clientX)-lastX);
      const dy=Math.abs((e.changedTouches?e.changedTouches[0].clientY:e.clientY)-lastY);
      if(dx<6 && dy<6) handleClick();
    }
    dragging=false;
  };
  el.addEventListener('mousedown',down); window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
  el.addEventListener('touchstart',down,{passive:true}); el.addEventListener('touchmove',move,{passive:true}); el.addEventListener('touchend',up,{passive:true});
  el.addEventListener('wheel',e=>{ e.preventDefault(); autoRotate=false;
    targetZoom=Math.max(6,Math.min(20,targetZoom+e.deltaY*0.01)); },{passive:false});

  infoClose.addEventListener('click',()=>infoPanel.classList.add('hidden'));

  document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    currentScene=b.dataset.scene;
    buildScene(currentScene);
  }));
  document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.lang button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    isEn = b.dataset.l==='en';
    document.body.classList.toggle('lang-en', isEn);
    // rebuild so sprite labels + arrow update language
    buildScene(currentScene);
  }));
}

function handleClick(){
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickables, false);
  if(!hits.length) return;
  showInfo(hits[0].object.userData.part, hits[0].object.userData.sceneKey);
}

function showInfo(part, sceneKey){
  const p = part[isEn?'en':'zh'];
  const title = DATA[sceneKey].title[isEn?'en':'zh'];
  const tagText = isEn ? 'Component' : '構件';
  infoBody.innerHTML =
    '<span class="tag">'+tagText+'</span>'+
    '<h2>'+p.sub+'</h2>'+
    '<div class="sub">'+title+'</div>'+
    '<p>'+p.body+'</p>'+
    (p.kv ? '<div class="kv">'+p.kv+'</div>' : '');
  infoPanel.classList.remove('hidden');
}

function onResize(){
  if(!renderer) return;
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  camera.aspect = stage.clientWidth/stage.clientHeight;
  camera.updateProjectionMatrix();
}

function animate(){
  raf = requestAnimationFrame(animate);
  if(autoRotate && !dragging) targetRotY += 0.0016;
  rotX += (targetRotX-rotX)*0.1;
  rotY += (targetRotY-rotY)*0.1;
  zoom += (targetZoom-zoom)*0.1;
  if(group){ group.rotation.x=rotX; group.rotation.y=rotY; }
  camera.position.z = zoom;
  renderer.render(scene, camera);
}

// exposed for automated verification
window.__app = {
  setScene(k){ currentScene=k; buildScene(k); },
  setLang(v){ isEn=(v==='en'); document.body.classList.toggle('lang-en',isEn); buildScene(currentScene); },
  openFirst(){ if(clickables.length) showInfo(clickables[0].userData.part, clickables[0].userData.sceneKey); },
  infoVisible(){ return !infoPanel.classList.contains('hidden'); },
  counts(){ return { bloom:DATA.bloom.parts.length, constructs:DATA.constructs.parts.length, method:DATA.method.parts.length }; },
  clickableCount(){ return clickables.length; }
};

init();
