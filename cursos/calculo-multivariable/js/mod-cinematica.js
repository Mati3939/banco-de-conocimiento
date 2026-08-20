registerModule({id:'cinematica',title:'Aplicaciones: posición, velocidad y aceleración',
  unidad:'I',semanas:[2],evaluacion:['test-1','certamen-1'],
  lead:'La misma maquinaria de derivadas de funciones vectoriales, leída como movimiento: dónde está, qué tan rápido y hacia dónde acelera un punto que se mueve en el espacio.',
  build(sec){

    /* -------- Card 1: posición, velocidad y aceleración -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Posición, velocidad y aceleración'));
    c1.append(el('p',{},'Si $\\mathbf r(t)$ describe la posición de una partícula en el instante $t$, sus dos primeras derivadas se leen como cinemática:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf v(t)=\\mathbf r\'(t)\\qquad \\mathbf a(t)=\\mathbf r\'\'(t)\\qquad \\text{rapidez}=\\lVert\\mathbf v(t)\\rVert$$'}));
    c1.append(el('p',{class:'note'},'$\\mathbf v(t)$ es tangente a la trayectoria (es el mismo vector que ya se usó para $\\mathbf T$) y apunta hacia donde se mueve la partícula; su norma, la rapidez, es un número (no un vector) — cuán rápido, sin importar la dirección.'));
    c1.append(el('p',{class:'fuente'},'Fuente: "Aplicaciones: Posición, Velocidad y Aceleración, Aceleración centrípeta y tangencial", contenido del temario oficial (posición, velocidad y aceleración como funciones vectoriales son desarrollo estándar de Stewart/Larson), Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: descomposición tangencial y normal -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Descomposición tangencial y normal'));
    c2.append(el('p',{},'La aceleración se puede escribir siempre como combinación de $\\mathbf T$ y $\\mathbf N$ (nunca tiene componente en $\\mathbf B$, porque el movimiento ocurre dentro del plano osculador en cada instante):'));
    c2.append(el('div',{class:'formula',html:'$$\\mathbf a(t)=a_T\\,\\mathbf T(t)+a_N\\,\\mathbf N(t)$$'}));
    c2.append(el('div',{class:'formula',html:'$$a_T=\\dfrac{d}{dt}\\lVert\\mathbf v(t)\\rVert=\\dfrac{\\mathbf v\\cdot\\mathbf a}{\\lVert\\mathbf v\\rVert}\\qquad\\qquad a_N=\\kappa\\,\\lVert\\mathbf v(t)\\rVert^2=\\sqrt{\\lVert\\mathbf a\\rVert^2-a_T^2}$$'}));
    c2.append(el('p',{class:'note'},el('b',{},'Lectura: '),'$a_T$ (componente tangencial) es cuánto ',el('i',{},'cambia la rapidez'),' — si la rapidez es constante, $a_T=0$. $a_N$ (componente normal) es cuánto se ',el('i',{},'curva'),' la trayectoria — depende de la curvatura $\\kappa$ y de la rapidez al cuadrado; es la responsable de que un auto tenga que frenar en una curva cerrada aunque mantenga la rapidez constante.'));
    c2.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (componentes tangencial y normal de la aceleración) sobre "Aplicaciones: Posición, Velocidad y Aceleración, Aceleración centrípeta y tangencial", contenido del temario oficial, Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: aceleración centrípeta -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Aceleración centrípeta'));
    c3.append(el('p',{},'Caso particular importante: movimiento circular uniforme, $\\mathbf r(t)=(R\\cos\\omega t,\\,R\\sin\\omega t)$, con $R$ y $\\omega$ constantes. La rapidez $\\lVert\\mathbf v\\rVert=R\\omega$ es constante, así que $a_T=0$: toda la aceleración es normal, apuntando siempre hacia el centro:'));
    c3.append(el('div',{class:'formula',html:'$$a_T=0\\qquad\\qquad a_N=\\lVert\\mathbf a\\rVert=R\\omega^2=\\dfrac{\\lVert\\mathbf v\\rVert^2}R$$'}));
    c3.append(el('p',{},'Con $R=3$ y $\\omega=1{,}2$ ($\\lVert\\mathbf v\\rVert=R\\omega=3{,}6$, $a_N=R\\omega^2=4{,}32$), moveé el ángulo y mirá que la velocidad (azul) siempre es tangente al círculo y la aceleración (naranjo) siempre apunta al centro:'));
    const R_CIN=3, OMEGA_CIN=1.2;
    const planoCirc=Plano(c3,{xMin:-6,xMax:6,yMin:-6,yMax:6,alto:340});
    let angCirc=0.7;
    planoCirc.dibujar(P=>{
      P.ejes();
      P.parametrica(th=>[R_CIN*Math.cos(th),R_CIN*Math.sin(th)],0,2*Math.PI,{color:'--grid',n:120});
      const pos=[R_CIN*Math.cos(angCirc),R_CIN*Math.sin(angCirc)];
      const vel=[-R_CIN*OMEGA_CIN*Math.sin(angCirc),R_CIN*OMEGA_CIN*Math.cos(angCirc)];
      const acc=[-OMEGA_CIN*OMEGA_CIN*pos[0],-OMEGA_CIN*OMEGA_CIN*pos[1]];
      P.punto(pos[0],pos[1],{color:'--ink2',r:5});
      P.vector(pos[0],pos[1],pos[0]+vel[0],pos[1]+vel[1],{color:'--s1',etiqueta:'v'});
      P.vector(pos[0],pos[1],pos[0]+acc[0],pos[1]+acc[1],{color:'--s6',etiqueta:'a = aₙ'});
      P.punto(0,0,{color:'--muted',r:3});
    });
    c3.append(el('div',{class:'controls'},
      el('label',{},'ángulo:'),
      el('input',{type:'range',min:'0',max:String(2*Math.PI),step:'0.03',value:String(angCirc),oninput:e=>{ angCirc=parseFloat(e.target.value); planoCirc.redibujar(); }})
    ));
    c3.append(el('p',{class:'note'},'La velocidad (azul) es siempre perpendicular al radio — tangente al círculo — y la aceleración (naranjo) es siempre anti-paralela al radio, es decir, apunta al centro: por eso se llama ',el('i',{},'centrípeta'),' ("que busca el centro"). Nunca hay componente tangencial: $a_T=0$ en todo el recorrido.'));
    c3.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (aceleración centrípeta, movimiento circular uniforme) sobre "Aceleración centrípeta y tangencial", contenido del temario oficial, Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: ejemplo resuelto -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejemplo resuelto'));
    c4.append(el('p',{},'Sobre la misma curva de la Pauta del Control 1 2026-1, $\\mathbf r(t)=(3\\cos t,\\,3\\sin t,\\,4t)$ (donde ya se calculó $\\lVert\\mathbf r\'(t)\\rVert=5$, constante), se completa la descomposición de la aceleración:'));
    Pasos(c4,[
      {tex:'\\mathbf v(t)=\\mathbf r\'(t)=(-3\\sin t,3\\cos t,4),\\quad \\lVert\\mathbf v(t)\\rVert=5',nota:'La rapidez no depende de t (ya se vio antes): se recorre siempre a la misma velocidad.'},
      {tex:'a_T=\\dfrac{d}{dt}\\lVert\\mathbf v(t)\\rVert=\\dfrac{d}{dt}(5)=0',nota:'Como la rapidez es constante, su derivada es 0: sin componente tangencial.'},
      {tex:'\\mathbf a(t)=\\mathbf r\'\'(t)=(-3\\cos t,-3\\sin t,0)',nota:'Segunda derivada: la aceleración.'},
      {tex:'\\lVert\\mathbf a(t)\\rVert=\\sqrt{9\\cos^2t+9\\sin^2t}=3',nota:'La aceleración también tiene norma constante.'},
      {tex:'a_N=\\sqrt{\\lVert\\mathbf a\\rVert^2-a_T^2}=\\sqrt{9-0}=3',nota:'Con a_T=0, toda la aceleración es normal: a_N=‖a‖=3.'},
      {tex:'\\kappa=\\dfrac{\\lVert\\mathbf r\'\\times\\mathbf r\'\'\\rVert}{\\lVert\\mathbf r\'\\rVert^3}=\\dfrac{\\lVert(12\\sin t,-12\\cos t,9)\\rVert}{5^3}=\\dfrac{15}{125}=\\dfrac{3}{25}',nota:'Verificación cruzada: se calcula κ independientemente, por la fórmula del triedro.'},
      {tex:'a_N=\\kappa\\,\\lVert\\mathbf v\\rVert^2=\\dfrac3{25}\\times25=3',nota:'Con la fórmula alternativa aₙ=κ‖v‖² se llega al mismo 3 — confirma el resultado por dos caminos.'}
    ],{modId:'cinematica',titulo:'r(t)=(3cos t,3sin t,4t): descomposición tangencial-normal de la aceleración'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación de $\\lVert\\mathbf r\'\\times\\mathbf r\'\'\\rVert$: '),'con $\\mathbf r\'=(-3\\sin t,3\\cos t,4)$ y $\\mathbf r\'\'=(-3\\cos t,-3\\sin t,0)$, el producto cruz da $(3\\cos t\\cdot0-4(-3\\sin t),\\ 4(-3\\cos t)-(-3\\sin t)(0),\\ (-3\\sin t)(-3\\sin t)-3\\cos t(-3\\cos t))=(12\\sin t,-12\\cos t,9)$, con norma $\\sqrt{144\\sin^2t+144\\cos^2t+81}=\\sqrt{144+81}=\\sqrt{225}=15$ — constante, coincide con lo usado arriba.'));
    c4.append(el('p',{class:'fuente'},'Fuente: curva de la Pauta Control 1 CMUL 2026-1 (pregunta 2), extendida acá con las fórmulas de descomposición tangencial-normal de "Aplicaciones: Posición, Velocidad y Aceleración, Aceleración centrípeta y tangencial", contenido del temario oficial (desarrollo estándar de Stewart/Larson), Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'El Listado 1 no trae ítems propios de cinemática (a_T, a_N) — su ítem 18 (el dron que corta motor, ya resuelto en el tema de funciones vectoriales) es el más cercano, y usa directamente velocidad y posición. El siguiente ejercicio extiende la curva de la Guía de Ayudantía 1 con la descomposición de esta card.'));

    const ej=el('details',{},
      el('summary',{},'r(t)=(t, t², t³) en t₀=1 (curva de la Guía de Ayudantía 1, ejercicios propuestos #2): calcule v, a, rapidez, a_T y a_N.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf v(1)=\\mathbf r\'(1)=(1,2,3),\\quad \\lVert\\mathbf v(1)\\rVert=\\sqrt{1+4+9}=\\sqrt{14}\\approx3{,}742$$'}),
        el('div',{class:'formula',html:'$$\\mathbf a(1)=\\mathbf r\'\'(1)=(0,2,6),\\quad \\lVert\\mathbf a(1)\\rVert=\\sqrt{0+4+36}=\\sqrt{40}\\approx6{,}325$$'}),
        el('div',{class:'formula',html:'$$a_T=\\dfrac{\\mathbf v\\cdot\\mathbf a}{\\lVert\\mathbf v\\rVert}=\\dfrac{(1)(0)+(2)(2)+(3)(6)}{\\sqrt{14}}=\\dfrac{22}{\\sqrt{14}}\\approx5{,}880$$'}),
        el('div',{class:'formula',html:'$$a_N=\\sqrt{\\lVert\\mathbf a\\rVert^2-a_T^2}=\\sqrt{40-34{,}571}\\approx2{,}330$$'}),
        el('p',{class:'note'},el('b',{},'Verificación con la fórmula alternativa: '),'$\\mathbf r\'(1)\\times\\mathbf r\'\'(1)=(1,2,3)\\times(0,2,6)=(6,-6,2)$, con norma $\\sqrt{36+36+4}=\\sqrt{76}\\approx8{,}718$; $\\kappa=8{,}718/14^{1{,}5}\\approx0{,}1664$, y $a_N=\\kappa\\lVert\\mathbf v\\rVert^2\\approx0{,}1664\\times14\\approx2{,}330$ — mismo valor por los dos caminos.'),
        el('p',{},'A diferencia de la hélice de la card "Ejemplo resuelto", acá $a_T\\ne0$: la partícula va acelerando en rapidez (no solo cambiando de dirección).')));
    c5.append(ej);

    c5.append(el('p',{class:'fuente'},'Fuente: ítem 18, Listado 1 (aplicación de velocidad/posición, ya resuelto en el tema "Funciones vectoriales"); curva de la Guía de Ayudantía 1, "Ejercicios propuestos" #2, extendida con las fórmulas de a_T/a_N de "Aplicaciones: Posición, Velocidad y Aceleración, Aceleración centrípeta y tangencial", contenido del temario oficial, Canvas 2026-2.'));
    sec.append(c5);
  }});
