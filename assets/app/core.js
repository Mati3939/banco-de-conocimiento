'use strict';
/* =====================================================================
   Núcleo de las apps SPA de la Biblioteca (portado del Visualizador TOPD)
   API para módulos:
     registerModule({id, title, unidad, semanas, lead, evaluacion,
       contenidoOficial, puenteV3, pendiente, build(section)})
     el(tag, attrs, ...hijos)  $(sel)  fmt(x)  sleep(ms)
     Stepper(mount, steps, reset, modId) — animación paso a paso (← → en teclado)
     codeBox(mount)  btnGroup(mount, items, onpick)
     addRelayout(nodo, fn, dispose?) / relayout() — recalcular medidas; las
       entradas cuyo nodo ya salió del DOM se descartan solas (sin fugas)
     hashId() / hashParams() / setHashParams(obj) — estado en la URL
     activate(id) — muestra un módulo y arma su nav de unidad/tema
     renderMath(nodo) — KaTeX por módulo (se construyen en diferido)
   Convenciones CSS: ver Biblioteca/CONVENCIONES.md y assets/app/app.css
   (.unidad-nav .tema-nav .tema-nav button.pend .ficha-pendiente .evaluacion …)
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function el(tag,attrs={},...kids){
  const n=document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(k==='class')n.className=v;
    else if(k==='html')n.innerHTML=v;
    else if(k.startsWith('on'))n.addEventListener(k.slice(2),v);
    else if(k==='style')n.style.cssText=v;
    else n.setAttribute(k,v);
  }
  for(const k of kids.flat(9)){ if(k==null)continue; n.append(k.nodeType?k:document.createTextNode(k)); }
  return n;
}
const fmt=x=>(typeof x==='number'&&!Number.isInteger(x))?x.toFixed(1).replace('.',','):String(x);
/* Relayout: los módulos se construyen ocultos (las medidas dan 0), así que hay
   que recalcular al activarlos. Cada entrada queda ligada a un nodo; cuando ese
   nodo sale del DOM (ejercicio ya descartado) se elimina junto con su observer,
   para que recorrer muchas preguntas no acumule closures ni MutationObservers. */
const RELAYOUT=[];
function addRelayout(node,fn,dispose){ RELAYOUT.push({node,fn,dispose}); }
function relayout(){
  for(let i=RELAYOUT.length-1;i>=0;i--){
    const e=RELAYOUT[i];
    if(!e.node.isConnected){ if(e.dispose)e.dispose(); RELAYOUT.splice(i,1); continue; }
    e.fn();
  }
}

/* Paso a paso con botones y teclado */
let ACTIVE_STEPPER=null;
const STEPPERS_BY_MOD={};
class Stepper{
  /* steps: [{d:descripción html, run:async fn(esUltimo)}] ; reset: fn estado inicial
     modId: registra el stepper para las flechas del teclado en ese módulo */
  constructor(mount,steps,reset,modId){
    this.steps=steps; this.reset=reset; this.i=-1; this._run=0;
    this.cnt=el('span',{class:'cnt'},'inicio');
    this.desc=el('div',{class:'stepdesc',html:'Presiona <b>▶ Siguiente</b> para avanzar paso a paso.'});
    const bPrev=el('button',{class:'btn',onclick:()=>this.go(this.i-1)},'◀ Anterior');
    const bNext=el('button',{class:'btn primary',onclick:()=>this.go(this.i+1)},'▶ Siguiente');
    const bRe=el('button',{class:'btn',onclick:()=>this.go(-1)},'⟲ Reiniciar');
    const bar=el('div',{class:'stepper',onclick:()=>ACTIVE_STEPPER=this},bPrev,bNext,bRe,this.cnt);
    mount.append(bar,this.desc);
    if(modId)(STEPPERS_BY_MOD[modId]=STEPPERS_BY_MOD[modId]||[]).push(this);
  }
  async go(i){
    if(i<-1||i>=this.steps.length)return;
    ACTIVE_STEPPER=this;
    const tok=++this._run;
    this.i=i;
    if(i===-1){ this.reset(); this.cnt.textContent='inicio';
      this.desc.innerHTML='Presiona <b>▶ Siguiente</b> para avanzar paso a paso.'; return; }
    this.reset();
    this.cnt.textContent=`paso ${i+1}/${this.steps.length}`;
    this.desc.innerHTML=this.steps[i].d;
    for(let k=0;k<=i;k++){
      if(this._run!==tok)return; // otro clic interrumpió esta corrida
      await this.steps[k].run(k===i);
    }
  }
}

/* Estado en la URL: #merge?how=outer — compartible por WhatsApp.
   hashId() da el id sin parámetros; hashParams() el objeto {k:v};
   setHashParams(obj) los escribe sin recargar ni re-activar. */
const hashId=()=>decodeURIComponent(location.hash.slice(1).split('?')[0]);
function hashParams(){
  const q=location.hash.split('?')[1]||'';
  return Object.fromEntries(new URLSearchParams(q));
}
function setHashParams(obj){
  const clean=Object.fromEntries(Object.entries(obj).filter(([,v])=>v!=null&&v!==''));
  const q=new URLSearchParams(clean).toString();
  history.replaceState(null,'','#'+hashId()+(q?'?'+q:''));
}

/* ================= app shell ================= */
/* Un módulo = un TEMA. m = {
     id            slug ASCII, es el ancla en la URL
     title         nombre visible
     unidad        'inicio' | 'I' | 'II' | 'III' | 'IV'
     semanas       [3] o [3,4] — semanas oficiales del tema
     lead          una frase de orientación
     evaluacion    ['control-1','certamen-1'] — ids de CURSO.evaluaciones
     contenidoOficial  ['...','...'] — bullets literales de la calendarización
     puenteV3      '#ancla' dentro de index-v3.html, o null si no hay equivalente
     pendiente     true = todavía no se pasó la materia; no lleva build()
     build(sec)    construye el contenido; ausente si pendiente
   } */
const MODULES=[];
function registerModule(m){MODULES.push(m);}
const unidadesDe=()=>[...new Set(MODULES.map(m=>m.unidad))];
const temasDe=u=>MODULES.filter(m=>m.unidad===u);
const moduloPorId=id=>MODULES.find(m=>m.id===id);

/* Ficha de un tema que todavía no se cursa: fechas oficiales, contenidos
   literales de la calendarización, en qué evaluación entra, y el puente a la
   página v3, que en casi todos los casos ya tiene material escrito. */
function fichaPendiente(m){
  const C=window.CURSO;
  const sem=m.semanas.map(n=>{
    const s=(C.semanas||[]).find(x=>x.n===n);
    return s?`Semana ${n} (${s.desde} al ${s.hasta})`:`Semana ${n}`;
  }).join(' · ');
  const caja=el('div',{class:'ficha-pendiente'},
    el('h3',{},'Todavía no pasamos esta materia'),
    el('p',{class:'note'},sem));
  if(m.contenidoOficial&&m.contenidoOficial.length){
    caja.append(el('p',{class:'note',style:'font-weight:600;margin-bottom:.2rem'},
      'Contenidos según la calendarización oficial:'));
    caja.append(el('ul',{},m.contenidoOficial.map(t=>el('li',{},t))));
  }
  const evs=(m.evaluacion||[]).map(id=>(C.evaluaciones||[]).find(e=>e.id===id)).filter(Boolean);
  if(evs.length){
    caja.append(el('div',{},evs.map(e=>el('span',
      {class:'evaluacion'+(/certamen/.test(e.id)?' certamen':'')},
      e.nombre+' · '+e.fecha))));
  }
  if(m.puenteV3){
    caja.append(el('a',{class:'puente',href:'index-v3.html'+m.puenteV3},
      'Mientras tanto: ver este tema en la página anterior →'));
  }
  return caja;
}

function buildShell(){
  const nav=$('#nav'), main=$('#main');
  if(!MODULES.length)return;
  MODULES.forEach(m=>{
    const sec=el('section',{class:'module',id:'mod-'+m.id},
      el('h2',{},m.title), el('p',{class:'lead'},m.lead||''));
    main.append(sec); m._built=false; m._sec=sec;
  });
  /* fila 1: unidades · fila 2: temas de la unidad activa */
  const filaU=el('div',{class:'unidad-nav'}), filaT=el('div',{class:'tema-nav'});
  nav.append(filaU,filaT);
  unidadesDe().forEach(u=>{
    const et=u==='inicio'?'🏠 Inicio':('Unidad '+u+(window.CURSO.unidades[u]?' · '+window.CURSO.unidades[u]:''));
    const b=el('button',{onclick:()=>{
      pintarTemas(u);
      const primero=temasDe(u)[0]; if(primero)activate(primero.id);
    }},et);
    b.dataset.unidad=u; filaU.append(b);
  });
  window._filaTemas=filaT;
  const buscado=hashId();
  activate(moduloPorId(buscado)?buscado:MODULES[0].id);
  window.addEventListener('hashchange',()=>{
    const id=hashId();
    if(moduloPorId(id)&&!document.getElementById('mod-'+id).classList.contains('active'))activate(id);
  });
}

/* la fila 2 se repuebla cada vez que cambia la unidad activa */
function pintarTemas(u){
  const fila=window._filaTemas; if(!fila)return;
  fila.textContent='';
  temasDe(u).forEach((m,i)=>{
    const tecla=i<9?String(i+1)+'. ':'';
    const b=el('button',{class:m.pendiente?'pend':'',onclick:()=>activate(m.id)},tecla+m.title);
    b.dataset.mod=m.id; fila.append(b);
  });
  document.querySelectorAll('.unidad-nav button').forEach(b=>b.classList.toggle('on',b.dataset.unidad===u));
}

function activate(id){
  const m=moduloPorId(id); if(!m)return;
  if(!window._unidadActiva||window._unidadActiva!==m.unidad){
    window._unidadActiva=m.unidad; pintarTemas(m.unidad);
  }
  document.querySelectorAll('.module').forEach(s=>s.classList.toggle('active',s.id==='mod-'+id));
  document.querySelectorAll('.tema-nav button').forEach(b=>b.classList.toggle('on',b.dataset.mod===id));
  const on=document.querySelector('.tema-nav button.on');
  if(on)on.scrollIntoView({inline:'center',block:'nearest'});
  const keep=(hashId()===id);
  if(!keep)history.replaceState(null,'','#'+id);
  if(!m._built){
    if(m.pendiente)m._sec.append(fichaPendiente(m));
    else m.build(m._sec);
    m._built=true;
    renderMath(m._sec); // los módulos se construyen en diferido: KaTeX va acá
  }
  relayout();
  ACTIVE_STEPPER=(STEPPERS_BY_MOD[id]||[null])[0];
  window.scrollTo({top:0});
}

/* KaTeX por módulo. Si se renderizara una sola vez al cargar, las fórmulas de
   las pestañas nunca visitadas quedarían crudas. */
function renderMath(nodo){
  if(!window.renderMathInElement)return;
  window.renderMathInElement(nodo,{
    delimiters:[
      {left:'$$',right:'$$',display:true},
      {left:'$',right:'$',display:false}
    ],
    throwOnError:false
  });
}

/* helpers UI */
function codeBox(mount){const c=el('pre',{class:'code'});mount.append(c);return c;}
function btnGroup(mount,items,onpick,activeFirst=true){
  /* items: [{label,value}] — botones excluyentes; devuelve los botones */
  const wrap=el('div',{class:'controls'});
  const btns=items.map((it,i)=>el('button',{class:'btn'+((activeFirst&&i===0)?' on':''),onclick:()=>{
    btns.forEach(b=>b.classList.remove('on')); btns[i].classList.add('on'); onpick(it.value);
  }},it.label));
  wrap.append(...btns); mount.append(wrap); return btns;
}

/* tema, presentación y teclado */
document.addEventListener('DOMContentLoaded',()=>{
  const btnTheme=$('#btnTheme'), btnPres=$('#btnPres');
  const THEMES=[['','🌗 Auto'],['light','☀️ Claro'],['dark','🌙 Oscuro']];
  const TKEY='bib_tema';
  const leerTema=()=>{try{return localStorage.getItem(TKEY)||'';}catch(_){return '';}};
  const guardarTema=v=>{try{localStorage.setItem(TKEY,v);}catch(_){/* modo incógnito */}};
  const aplicarTema=v=>{
    if(v)document.documentElement.dataset.theme=v; else delete document.documentElement.dataset.theme;
    btnTheme.textContent=(THEMES.find(t=>t[0]===v)||THEMES[0])[1];
    /* mismo patrón que assets/js/observatorio.js:34 — Plano (math.js) escucha
       este evento para volver a leer colorVar() y redibujar el canvas; sin
       este dispatch el lienzo queda pintado con el tema anterior hasta el
       próximo resize. Se dispara también en la aplicación inicial (carga):
       en ese momento todavía no hay canvases con addRelayout (los módulos
       se construyen recién al activarlos), así que es inocuo, y deja un
       único punto de disparo en vez de duplicar la llamada. */
    document.dispatchEvent(new CustomEvent('temacambiado'));
  };
  /* el tema elegido sobrevive a la recarga: en una sala clara no hay que reclicar */
  let themeIdx=Math.max(0,THEMES.findIndex(t=>t[0]===leerTema()));
  aplicarTema(THEMES[themeIdx][0]);
  btnTheme.onclick=()=>{
    themeIdx=(themeIdx+1)%3;
    const v=THEMES[themeIdx][0];
    aplicarTema(v); guardarTema(v);
  };
  btnPres.onclick=()=>{
    const on=document.documentElement.classList.toggle('presenta');
    btnPres.textContent=on?'🖥️ Normal':'🖥️ Presentar';
    relayout();
  };
  document.addEventListener('keydown',e=>{
    if(e.target.matches('input,select,textarea'))return;
    if(e.shiftKey&&/^[!@#$]$/.test(e.key)){ // Shift+1..4
      const u=unidadesDe()[' !@#$'.indexOf(e.key)-0];
      if(u){const t=temasDe(u)[0]; if(t)activate(t.id);}
      e.preventDefault(); return;
    }
    if(e.key==='ArrowRight'&&ACTIVE_STEPPER){ACTIVE_STEPPER.go(ACTIVE_STEPPER.i+1);e.preventDefault();}
    else if(e.key==='ArrowLeft'&&ACTIVE_STEPPER){ACTIVE_STEPPER.go(ACTIVE_STEPPER.i-1);e.preventDefault();}
    else if(/^[1-9]$/.test(e.key)){
      const t=temasDe(window._unidadActiva||MODULES[0].unidad)[+e.key-1];
      if(t)activate(t.id);
    }
    else if(e.key==='Home'&&MODULES[0]){activate(MODULES[0].id);}
  });
  /* relayout() remide y repinta TODOS los canvases/árboles registrados via
     addRelayout — dispararlo en cada evento 'resize' (decenas por segundo
     durante un arrastre de ventana o una rotación de pantalla) sería carísimo
     y redundante. 150ms es el clásico "esperar a que el usuario termine de
     mover/rotar" antes de remedir: imperceptible como demora, pero evita
     recalcular en cada píxel intermedio. */
  let resizeTO=null;
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTO);
    resizeTO=setTimeout(relayout,150);
  });
  buildShell();
});

/* Lo que consumen los mod-*.js de los ramos y el gate probar-app.mjs */
window.MODULES=MODULES;
window.STEPPERS_BY_MOD=STEPPERS_BY_MOD;
window.activate=activate;
window.registerModule=registerModule;
window.renderMath=renderMath;
