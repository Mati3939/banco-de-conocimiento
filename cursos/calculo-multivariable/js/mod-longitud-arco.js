registerModule({id:'longitud-arco',title:'Longitud de arco, reparametrización, curvatura y torsión',
  unidad:'I',semanas:[2],evaluacion:['test-1','certamen-1'],
  lead:'Cuánto mide una curva, cómo recorrerla usando esa misma medida como parámetro, y dos números que describen su forma: cuánto se curva y cuánto se retuerce fuera de su plano.',
  build(sec){

    /* -------- Card 1: longitud de arco -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Longitud de arco'));
    c1.append(el('p',{},'La longitud de la curva $\\mathbf r(t)$ entre $t=a$ y $t=b$ se obtiene integrando la rapidez $\\lVert\\mathbf r\'(t)\\rVert$ — sumando "distancia recorrida por instante" a lo largo de todo el recorrido:'));
    c1.append(el('div',{class:'formula',html:'$$L=\\int_a^b\\lVert\\mathbf r\'(t)\\rVert\\,dt$$'}));
    c1.append(el('p',{},'La Guía de Ayudantía 1 da 4 pasos fijos ("TIPO 1") para no perderse:'));
    c1.append(el('ol',{},
      el('li',{},el('b',{},'Derivar.'),' Obtener $\\mathbf r\'(t)$ componente a componente.'),
      el('li',{},el('b',{},'Sacar la norma y simplificar.'),' $\\lVert\\mathbf r\'(t)\\rVert=\\sqrt{[x\'(t)]^2+[y\'(t)]^2+[z\'(t)]^2}$ — usar $\\sin^2t+\\cos^2t=1$ y buscar cuadrados perfectos bajo la raíz.'),
      el('li',{},el('b',{},'Fijar los límites en $t$.'),' Si dan puntos en vez de valores del parámetro, resolver $\\mathbf r(t)=P$ mirando las tres componentes.'),
      el('li',{},el('b',{},'Integrar.'),' $L=\\int_a^b\\lVert\\mathbf r\'(t)\\rVert\\,dt$.')
    ));
    c1.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, "TIPO 1: Longitud de arco y reparametrización", pasos 1 a 4, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: ejemplo resuelto Control 1 2026-1 -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Ejemplo resuelto — Control 1, 2026-1'));
    c2.append(el('p',{},'Sea $\\mathbf r(t)=(3\\cos t,\\,3\\sin t,\\,4t)$. Calcule $L$ entre $t=0$ y $t=2\\pi$.'));
    Pasos(c2,[
      {tex:'\\mathbf r\'(t)=(-3\\sin t,\\,3\\cos t,\\,4)',nota:'Paso 1: derivar componente a componente.'},
      {tex:'\\lVert\\mathbf r\'(t)\\rVert=\\sqrt{9\\sin^2t+9\\cos^2t+16}=\\sqrt{9(\\sin^2t+\\cos^2t)+16}',nota:'Paso 2: se factoriza el 9 para usar la identidad pitagórica.'},
      {tex:'=\\sqrt{9+16}=\\sqrt{25}=5',nota:'sin²t+cos²t=1, así que la expresión bajo la raíz es constante: la rapidez es siempre 5.'},
      {tex:'L=\\int_0^{2\\pi}5\\,dt',nota:'Paso 3: los límites ya están en t (0 a 2π), no hace falta despejar nada.'},
      {tex:'L=5(2\\pi-0)=10\\pi\\ \\ [\\text{u}]',nota:'Paso 4: integrar. Como la rapidez es constante, la integral es solo "rapidez × tiempo".'}
    ],{modId:'longitud-arco',titulo:'r(t)=(3cos t, 3sin t, 4t): longitud de arco en [0,2π]'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación (dos caminos): '),'$9\\sin^2t+9\\cos^2t=9(\\sin^2t+\\cos^2t)=9(1)=9$, más $16$ da $25$, y $\\sqrt{25}=5$ — la rapidez es exactamente constante e igual a 5 para todo $t$ (no aproximada). Por otro lado, integrando directo sin factorizar: $\\int_0^{2\\pi}\\sqrt{9\\sin^2t+9\\cos^2t+16}\\,dt=\\int_0^{2\\pi}\\sqrt{25}\\,dt=\\int_0^{2\\pi}5\\,dt=10\\pi$ — mismo resultado. Coincide con la Pauta oficial del Control 1 2026-1.'));
    c2.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 CMUL 2026-1, pregunta 2(a); reproducido en la Guía de Ayudantía 1 ("Ejemplo resuelto, Control 1 2026-1"), Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: reparametrización por longitud de arco -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Reparametrización por longitud de arco'));
    c3.append(el('p',{},'La función longitud de arco acumulada desde $t=a$ es $s(t)$; invirtiéndola se consigue $t(s)$, que se reemplaza en cada componente de $\\mathbf r$:'));
    c3.append(el('div',{class:'formula',html:'$$s(t)=\\int_a^t\\lVert\\mathbf r\'(u)\\rVert\\,du\\ \\ \\longrightarrow\\ \\ t=t(s)\\ \\ \\longrightarrow\\ \\ \\tilde{\\mathbf r}(s)=\\mathbf r\\big(t(s)\\big),\\ \\ 0\\le s\\le L$$'}));
    c3.append(el('p',{},'Continuando el ejemplo de arriba, con $\\mathbf r(t)=(3\\cos t,3\\sin t,4t)$ y $\\lVert\\mathbf r\'(t)\\rVert=5$ ya calculado, reparametrizando desde $t=0$:'));
    Pasos(c3,[
      {tex:'s(t)=\\int_0^t5\\,du=5t',nota:'La rapidez es constante (5), así que la integral es lineal en t.'},
      {tex:'t=\\dfrac s5',nota:'Se despeja t en función de s.'},
      {tex:'\\tilde{\\mathbf r}(s)=\\Big(3\\cos\\dfrac s5,\\ 3\\sin\\dfrac s5,\\ \\dfrac{4s}5\\Big),\\ \\ 0\\le s\\le10\\pi',nota:'Se sustituye t=s/5 en cada componente; el rango de s sale de L=10π (calculado en la card anterior).'}
    ],{modId:'longitud-arco',titulo:'Reparametrización de r(t)=(3cos t,3sin t,4t) por longitud de arco'});
    c3.append(el('div',{class:'card',style:'background:color-mix(in srgb, var(--s5) 8%, var(--surface)); border-left:3px solid var(--s5)'},
      el('p',{},el('b',{},'Atajo de la guía: '),'si $\\lVert\\mathbf r\'(t)\\rVert=1$, la curva ya está parametrizada por longitud de arco — no hay nada que hacer, porque $s(t)=\\int_a^t1\\,du=t-a$.')));
    c3.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, "TIPO 1", paso 5 y atajo; ejemplo (b) del Control 1 2026-1, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: curvatura -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Curvatura'));
    c4.append(el('p',{},'La curvatura $\\kappa$ mide qué tan bruscamente gira la curva. El ',el('b',{},'círculo osculador'),' en un punto es el círculo que mejor aproxima la curva ahí: su radio es $1/\\kappa$ y es tangente a la curva en ese punto.'));
    c4.append(el('div',{class:'formula',html:'$$\\kappa(t)=\\dfrac{\\lVert\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\rVert}{\\lVert\\mathbf r\'(t)\\rVert^3}\\qquad\\qquad R_{\\text{osculador}}=\\dfrac1\\kappa$$'}));
    c4.append(el('p',{},'Con la parábola $y=x^2/2$ en el plano ($z=0$, así que $\\mathbf r(t)=(t,t^2/2,0)$), la fórmula se reduce a la de una variable, $\\kappa=\\lvert y\'\'\\rvert/(1+y\'^2)^{3/2}$, y el radio $1/\\kappa$ cambia con el punto — movés $x$ y mirás el círculo osculador achicarse o agrandarse:'));
    const XMAX_OSC=5, YMIN_OSC=-1, YMAX_OSC=7;
    const planoOsc=Plano(c4,{xMin:-XMAX_OSC,xMax:XMAX_OSC,yMin:YMIN_OSC,yMax:YMAX_OSC,alto:300});
    let xOsc=0.6;
    const fParab=x=>x*x/2;
    function centroOsc(x){
      // f(x)=x²/2, f'(x)=x, f''(x)=1 (constante)
      const Cx=-x*x*x, Cy=1+1.5*x*x, R=Math.pow(1+x*x,1.5);
      return {Cx,Cy,R};
    }
    planoOsc.dibujar(P=>{
      P.ejes();
      P.curva(fParab,{color:'--s5',grosor:2});
      const {Cx,Cy,R}=centroOsc(xOsc);
      P.parametrica(th=>[Cx+R*Math.cos(th),Cy+R*Math.sin(th)],0,2*Math.PI,{color:'--s6',grosor:1.6,n:120});
      const c=P.ctx;
      c.save(); c.strokeStyle=colorVar('--grid'); c.setLineDash([4,4]); c.lineWidth=1;
      c.beginPath(); c.moveTo(P.X(xOsc),P.Y(fParab(xOsc))); c.lineTo(P.X(Cx),P.Y(Cy)); c.stroke();
      c.restore();
      P.punto(xOsc,fParab(xOsc),{color:'--s1',r:5});
      P.punto(Cx,Cy,{color:'--s6',r:3});
    });
    const notaOsc=el('p',{class:'note'});
    function actualizarOsc(){
      const {R}=centroOsc(xOsc);
      const kappa=1/R;
      notaOsc.innerHTML='x = '+xOsc.toFixed(2)+': κ ≈ '+kappa.toFixed(3)+', radio osculador = 1/κ ≈ '+R.toFixed(3)+'. Cerca de x=0 (donde la parábola gira más) el círculo es chico; lejos del vértice, la curva se aplana y el círculo crece.';
    }
    actualizarOsc();
    c4.append(notaOsc);
    c4.append(el('div',{class:'controls'},
      el('label',{},'x:'),
      el('input',{type:'range',min:'-1',max:'1',step:'0.02',value:String(xOsc),oninput:e=>{ xOsc=parseFloat(e.target.value); planoOsc.redibujar(); actualizarOsc(); }})
    ));
    c4.append(el('p',{class:'note'},'Verificación en $x=0$: $y\'(0)=0$, $y\'\'=1$, así que $\\kappa(0)=1/(1+0)^{3/2}=1$ y el radio es exactamente 1 — el círculo osculador en el vértice de $y=x^2/2$ tiene radio 1, centrado en $(0,1)$, justo lo que muestra el control al llevar el slider a $x=0$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: "Torsión y Curvatura", contenido del temario oficial (el círculo osculador no figura con ese nombre en el temario oficial; es desarrollo estándar de Stewart/Larson), Cálculo Multivariable — Canvas 2026-2. La parábola y=x²/2 es un ejemplo propio para ilustrar la fórmula (no viene de un ítem del Listado 1).'));
    sec.append(c4);

    /* -------- Card 5: torsión -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Torsión'));
    c5.append(el('p',{},'Mientras la curvatura mide cuánto se dobla la curva dentro de su plano osculador, la torsión $\\tau$ mide cuánto se ',el('b',{},'sale'),' de ese plano — cuánto se retuerce en la tercera dimensión:'));
    c5.append(el('div',{class:'formula',html:'$$\\tau(t)=\\dfrac{\\big[\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big]\\cdot\\mathbf r\'\'\'(t)}{\\lVert\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\rVert^2}$$'}));
    c5.append(el('p',{class:'note'},'Si $\\tau=0$ en todo punto, la curva es plana — vive enteramente dentro de un único plano osculador (por ejemplo, cualquier curva con $z=0$ tiene torsión nula). En una hélice, en cambio, $\\tau$ es constante y distinta de 0: el plano osculador va rotando parejo a medida que la curva sube, sin nunca aplanarse.'));
    c5.append(el('p',{class:'fuente'},'Fuente: "Torsión y Curvatura", contenido del temario oficial (interpretación geométrica: desarrollo estándar de Stewart/Larson), Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: errores que descuentan -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Errores que descuentan puntaje'));
    c6.append(el('p',{},'Lista literal de la Guía de Ayudantía 1, columna "Longitud de arco y reparametrización":'));
    c6.append(el('ul',{class:'note'},
      el('li',{},'Integrar $\\lVert\\mathbf r(t)\\rVert$ en vez de $\\lVert\\mathbf r\'(t)\\rVert$ — hay que derivar primero, siempre.'),
      el('li',{},'Separar la raíz de una suma: $\\sqrt{a+b}\\ne\\sqrt a+\\sqrt b$. La simplificación correcta pasa por $\\sin^2+\\cos^2=1$ y cuadrados perfectos, no por "repartir" la raíz.'),
      el('li',{},'Poner los límites de integración en $x$ o en $z$ en vez de en $t$ — la integral de longitud de arco siempre es en el parámetro $t$.'),
      el('li',{},'Informar $L$ en unidades al cuadrado $[u^2]$ — la longitud de arco es una distancia, se informa en $[u]$, no en $[u^2]$.')
    ));
    c6.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, recuadro "Errores que descuentan" (columna TIPO 1), Canvas 2026-2.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios'));
    c7.append(el('p',{class:'note'},'El Listado 1 no trae ítems dedicados solo a longitud de arco (sus 25 ítems cubren geometría vectorial, funciones vectoriales/derivadas y el triedro TNB — ver los otros tres temas de esta unidad). Los dos ejercicios de abajo son los propios de longitud de arco de la Guía de Ayudantía 1, con solución oficial.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 (Guía Ayudantía 1) — r(t)=(2cos t, 2sin t, √5 t), 0≤t≤2π: (a) longitud de arco, (b) reparametrizar.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf r\'(t)=(-2\\sin t,2\\cos t,\\sqrt5)\\ \\Rightarrow\\ \\lVert\\mathbf r\'(t)\\rVert=\\sqrt{4\\sin^2t+4\\cos^2t+5}=\\sqrt9=3$$'}),
        el('div',{class:'formula',html:'$$L=\\int_0^{2\\pi}3\\,dt=6\\pi\\ [\\text{u}]$$'}),
        el('div',{class:'formula',html:'$$s(t)=3t\\ \\Rightarrow\\ t=\\dfrac s3\\ \\Rightarrow\\ \\tilde{\\mathbf r}(s)=\\Big(2\\cos\\dfrac s3,\\ 2\\sin\\dfrac s3,\\ \\dfrac{\\sqrt5\\,s}3\\Big),\\ \\ 0\\le s\\le6\\pi$$'})));
    c7.append(ej1);

    const ej3=el('details',{},
      el('summary',{},'Ejercicio 3 (Guía Ayudantía 1) — longitud de arco de r(t)=(eᵗsin t, eᵗcos t, eᵗ), 0≤t≤1.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf r\'(t)=e^t(\\sin t+\\cos t,\\ \\cos t-\\sin t,\\ 1)$$'}),
        el('div',{class:'formula',html:'$$\\lVert\\mathbf r\'(t)\\rVert=e^t\\sqrt{(\\sin t+\\cos t)^2+(\\cos t-\\sin t)^2+1}=e^t\\sqrt{2+1}=\\sqrt3\\,e^t$$'}),
        el('p',{class:'note'},'$(\\sin t+\\cos t)^2+(\\cos t-\\sin t)^2=2\\sin^2t+2\\cos^2t=2$ — los términos cruzados $2\\sin t\\cos t$ se cancelan entre sí.'),
        el('div',{class:'formula',html:'$$L=\\int_0^1\\sqrt3\\,e^t\\,dt=\\sqrt3\\,(e-1)\\ [\\text{u}]$$'})));
    c7.append(ej3);

    c7.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, "Ejercicios propuestos" 1 y 3, con solución oficial, Canvas 2026-2.'));
    sec.append(c7);
  }});
