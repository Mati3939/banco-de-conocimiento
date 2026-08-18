'use strict';
/* =====================================================================
   Primitivas de animación matemática para las apps de ramo.
   Reglas: se montan en un nodo, se registran con addRelayout, redibujan
   al cambiar tema/tamaño/modo presentación, y NINGUNA guarda colores
   literales — todo sale de colorVar().
   ===================================================================== */
function colorVar(nombre){
  return getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
}

/* Canvas con DPR correcto. Devuelve {canvas, ctx, w, h, medir}. */
function lienzo(mount, alto){
  const canvas=el('canvas',{class:'lienzo'});
  mount.append(canvas);
  const ctx=canvas.getContext('2d');
  const api={canvas,ctx,w:0,h:0};
  api.medir=function(){
    const dpr=window.devicePixelRatio||1;
    let w=canvas.clientWidth;
    if(!w||w<10)w=(mount.clientWidth||720);
    const h=alto||320;
    canvas.width=Math.round(w*dpr); canvas.height=Math.round(h*dpr);
    canvas.style.height=h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    api.w=w; api.h=h;
  };
  api.medir();
  return api;
}

/* Plano cartesiano 2D. Todo se dibuja en coordenadas matemáticas; el mapeo a
   píxeles lo hace la primitiva. */
function Plano(mount, opts){
  const o=Object.assign({xMin:-5,xMax:5,yMin:-5,yMax:5,alto:320},opts||{});
  const L=lienzo(mount,o.alto);
  const P={canvas:L.canvas, ctx:L.ctx};
  let pintor=null;

  const X=x=>( (x-o.xMin)/(o.xMax-o.xMin) )*L.w;
  const Y=y=>L.h-( (y-o.yMin)/(o.yMax-o.yMin) )*L.h;
  P.X=X; P.Y=Y;

  P.limpiar=function(){ L.ctx.clearRect(0,0,L.w,L.h); };

  P.ejes=function(){
    const c=L.ctx;
    c.save();
    c.strokeStyle=colorVar('--grid'); c.lineWidth=1;
    const pasoX=(o.xMax-o.xMin)/10, pasoY=(o.yMax-o.yMin)/10;
    for(let i=0;i<=10;i++){
      const x=o.xMin+i*pasoX, y=o.yMin+i*pasoY;
      c.beginPath(); c.moveTo(X(x),0); c.lineTo(X(x),L.h); c.stroke();
      c.beginPath(); c.moveTo(0,Y(y)); c.lineTo(L.w,Y(y)); c.stroke();
    }
    c.strokeStyle=colorVar('--axis'); c.lineWidth=1.5;
    if(o.yMin<=0&&o.yMax>=0){c.beginPath();c.moveTo(0,Y(0));c.lineTo(L.w,Y(0));c.stroke();}
    if(o.xMin<=0&&o.xMax>=0){c.beginPath();c.moveTo(X(0),0);c.lineTo(X(0),L.h);c.stroke();}
    c.restore();
  };

  P.curva=function(f,op){
    op=op||{}; const c=L.ctx;
    c.save(); c.strokeStyle=colorVar(op.color||'--s1'); c.lineWidth=op.grosor||2;
    if(op.guiones)c.setLineDash([5,4]);
    c.beginPath();
    const n=240; let primero=true;
    for(let i=0;i<=n;i++){
      const x=o.xMin+(o.xMax-o.xMin)*i/n, y=f(x);
      if(!isFinite(y)){primero=true;continue;}
      if(primero){c.moveTo(X(x),Y(y));primero=false;} else c.lineTo(X(x),Y(y));
    }
    c.stroke(); c.restore();
  };

  P.parametrica=function(f,t0,t1,op){
    op=op||{}; const c=L.ctx;
    c.save(); c.strokeStyle=colorVar(op.color||'--s1'); c.lineWidth=op.grosor||2;
    c.beginPath();
    const n=op.n||300;
    for(let i=0;i<=n;i++){
      const p=f(t0+(t1-t0)*i/n);
      if(i===0)c.moveTo(X(p[0]),Y(p[1])); else c.lineTo(X(p[0]),Y(p[1]));
    }
    c.stroke(); c.restore();
  };

  P.vector=function(x0,y0,x1,y1,op){
    op=op||{}; const c=L.ctx, col=colorVar(op.color||'--s4');
    c.save(); c.strokeStyle=col; c.fillStyle=col; c.lineWidth=op.grosor||2;
    c.beginPath(); c.moveTo(X(x0),Y(y0)); c.lineTo(X(x1),Y(y1)); c.stroke();
    const ang=Math.atan2(Y(y1)-Y(y0),X(x1)-X(x0)), l=op.punta||9;
    c.beginPath(); c.moveTo(X(x1),Y(y1));
    c.lineTo(X(x1)-l*Math.cos(ang-0.4),Y(y1)-l*Math.sin(ang-0.4));
    c.lineTo(X(x1)-l*Math.cos(ang+0.4),Y(y1)-l*Math.sin(ang+0.4));
    c.closePath(); c.fill();
    if(op.etiqueta)P.texto(x1,y1,op.etiqueta,{color:op.color||'--s4',dx:8,dy:-8});
    c.restore();
  };

  P.punto=function(x,y,op){
    op=op||{}; const c=L.ctx;
    c.save(); c.fillStyle=colorVar(op.color||'--s2');
    c.beginPath(); c.arc(X(x),Y(y),op.r||4,0,6.2832); c.fill(); c.restore();
    if(op.etiqueta)P.texto(x,y,op.etiqueta,{color:op.color||'--s2',dx:7,dy:-7});
  };

  P.region=function(f1,f2,a,b,op){
    op=op||{}; const c=L.ctx;
    c.save(); c.fillStyle=colorVar(op.color||'--s1'); c.globalAlpha=op.alpha||0.18;
    c.beginPath(); const n=120;
    for(let i=0;i<=n;i++){const x=a+(b-a)*i/n; if(i===0)c.moveTo(X(x),Y(f1(x))); else c.lineTo(X(x),Y(f1(x)));}
    for(let i=n;i>=0;i--){const x=a+(b-a)*i/n; c.lineTo(X(x),Y(f2(x)));}
    c.closePath(); c.fill(); c.restore();
  };

  /* campo de direcciones: f(x,y) devuelve la pendiente y' en ese punto */
  P.campo=function(f,op){
    op=op||{}; const c=L.ctx, nx=op.nx||16, ny=op.ny||12, largo=op.largo||11;
    c.save(); c.strokeStyle=colorVar(op.color||'--muted'); c.lineWidth=1.2;
    for(let i=0;i<=nx;i++)for(let j=0;j<=ny;j++){
      const x=o.xMin+(o.xMax-o.xMin)*i/nx, y=o.yMin+(o.yMax-o.yMin)*j/ny;
      const m=f(x,y); if(!isFinite(m))continue;
      const ang=Math.atan(m), dx=largo*Math.cos(ang), dy=largo*Math.sin(ang);
      c.beginPath(); c.moveTo(X(x)-dx,Y(y)+dy); c.lineTo(X(x)+dx,Y(y)-dy); c.stroke();
    }
    c.restore();
  };

  P.texto=function(x,y,s,op){
    op=op||{}; const c=L.ctx;
    c.save(); c.fillStyle=colorVar(op.color||'--ink2');
    c.font=(op.tam||12)+'px ui-monospace, Consolas, monospace';
    c.fillText(s,X(x)+(op.dx||0),Y(y)+(op.dy||0)); c.restore();
  };

  /* fn se guarda y se vuelve a correr en resize y cambio de tema */
  P.dibujar=function(fn){
    pintor=fn;
    const correr=()=>{L.medir(); P.limpiar(); pintor(P);};
    correr();
    addRelayout(L.canvas,correr);
    document.addEventListener('temacambiado',correr);
    return P;
  };
  P.redibujar=function(){ if(pintor){L.medir(); P.limpiar(); pintor(P);} };
  return P;
}

/* Derivación algebraica revelada línea a línea por el Stepper.
   lineas: [{tex:'x^2=4', nota:'Se resta 1 a ambos lados.'}]
   El LaTeX va SIN delimitadores: la primitiva agrega $$…$$. */
function Pasos(mount, lineas, opts){
  opts=opts||{};
  const caja=el('div',{class:'pasos'});
  if(opts.titulo)mount.append(el('p',{class:'note',style:'font-weight:600'},opts.titulo));
  const filas=lineas.map(L=>{
    const f=el('div',{class:'pasos-linea'},
      el('div',{class:'pasos-tex',html:'$$'+L.tex+'$$'}),
      el('div',{class:'pasos-nota',html:L.nota||''}));
    caja.append(f); return f;
  });
  mount.append(caja);
  const reset=()=>filas.forEach(f=>{f.classList.remove('vista','actual');});
  const steps=lineas.map((L,i)=>({
    d:L.nota||'',
    run:async(esUltimo)=>{
      filas[i].classList.add('vista');
      filas[i].classList.toggle('actual',esUltimo);
    }
  }));
  const stepper=new Stepper(mount,steps,reset,opts.modId);
  reset();
  return {stepper,filas};
}
