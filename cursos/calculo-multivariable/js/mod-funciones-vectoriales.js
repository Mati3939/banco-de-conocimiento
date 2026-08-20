registerModule({id:'funciones-vectoriales',title:'Funciones vectoriales: dominio, derivada y recta tangente',
  unidad:'I',semanas:[1],evaluacion:['test-1','certamen-1'],
  lead:'Una función vectorial junta tres funciones escalares en una sola curva; su derivada, componente a componente, da el vector tangente.',
  build(sec){

    /* -------- Card 1: qué es una función vectorial -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Qué es una función vectorial'));
    c1.append(el('p',{},'Una función vectorial asigna a cada número real $t$ (el parámetro) un punto de R³, juntando tres funciones escalares — una por coordenada:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf r(t)=(x(t),\\,y(t),\\,z(t))$$'}));
    c1.append(el('p',{},'A medida que $t$ recorre su dominio, el punto $\\mathbf r(t)$ traza una curva en el espacio. Ejemplo: la hélice circular $\\mathbf r(t)=(\\cos t,\\sin t,t)$ — la misma curva que protagoniza el ítem 20 del Listado 1 y todo el triedro TNB más adelante. Movés $t$ y mirás cómo se va trazando:'));
    const espCurva=Espacio(c1,{alto:440,escala:50});
    let tTraza=0;
    const dCurva=el('p',{class:'note'});
    function pintarTraza(){
      espCurva.redibujar();
    }
    espCurva.dibujar(E=>{
      E.ejes3({largo:3});
      E.curva3(t=>[Math.cos(t),Math.sin(t),t],-Math.PI,tTraza,{color:'--s5'});
      const P=[Math.cos(tTraza),Math.sin(tTraza),tTraza];
      E.punto3(P,{color:'--s4'});
    });
    function actualizarTraza(){
      dCurva.innerHTML='t = '+tTraza.toFixed(2)+' → r(t) ≈ ('+Math.cos(tTraza).toFixed(2)+', '+Math.sin(tTraza).toFixed(2)+', '+tTraza.toFixed(2)+').';
    }
    c1.append(dCurva);
    c1.append(el('div',{class:'controls'},
      el('label',{},'t:'),
      el('input',{type:'range',min:String(-Math.PI),max:String(Math.PI),step:'0.05',value:String(tTraza),oninput:e=>{ tTraza=parseFloat(e.target.value); pintarTraza(); actualizarTraza(); }})
    ));
    actualizarTraza();
    c1.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (definición de función vectorial — la calendarización 2026-2 solo lista "Derivada de funciones vectoriales" para la Semana 1, sin un ítem separado de definición); curva del ítem 20, Listado 1, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: dominio -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Dominio'));
    c2.append(el('p',{},'El dominio de $\\mathbf r(t)=(x(t),y(t),z(t))$ es la ',el('b',{},'intersección'),' de los dominios de las tres componentes — las tres tienen que estar definidas a la vez.'));
    c2.append(el('p',{},el('b',{},'Ítem 13(a):'),' $\\mathbf r(t)=\\big(t^3,\\ \\ln(3-t),\\ \\sqrt t\\big)$.'));
    c2.append(el('div',{class:'formula',html:'$$t^3:\\ \\mathbb R\\qquad \\ln(3-t):\\ 3-t\\gt0\\iff t\\lt3\\qquad \\sqrt t:\\ t\\ge0$$'}));
    c2.append(el('div',{class:'formula',html:'$$\\text{Dom}(\\mathbf r)=\\mathbb R\\cap(-\\infty,3)\\cap[0,\\infty)=[0,3)$$'}));
    c2.append(el('p',{},el('b',{},'Ítem 13(b):'),' $\\mathbf r(t)=\\big(\\ln(t-1),\\ \\sqrt{4-t^2},\\ e^t\\big)$.'));
    c2.append(el('div',{class:'formula',html:'$$\\ln(t-1):\\ t\\gt1\\qquad \\sqrt{4-t^2}:\\ 4-t^2\\ge0\\iff -2\\le t\\le2\\qquad e^t:\\ \\mathbb R$$'}));
    c2.append(el('div',{class:'formula',html:'$$\\text{Dom}(\\mathbf r)=(1,\\infty)\\cap[-2,2]\\cap\\mathbb R=(1,2]$$'}));
    c2.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (dominio de una función vectorial como intersección de dominios — no figura como ítem propio en la calendarización 2026-2); ítem 13, Listado 1, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: derivada componente a componente -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Derivada componente a componente'));
    c3.append(el('p',{},'Igual que en una variable, la derivada es el límite del cociente incremental — solo que ahora el cociente es un vector:'));
    c3.append(el('div',{class:'formula',html:'$$\\mathbf r\'(t)=\\lim_{h\\to0}\\dfrac{\\mathbf r(t+h)-\\mathbf r(t)}{h}=\\big(x\'(t),\\,y\'(t),\\,z\'(t)\\big)$$'}));
    c3.append(el('p',{},'El límite existe si y solo si existen los tres límites de las componentes por separado — de ahí que derivar una función vectorial sea simplemente derivar cada componente. Geométricamente, $\\mathbf r\'(t_0)$ es el vector ',el('b',{},'tangente'),' a la curva en $\\mathbf r(t_0)$: apunta en la dirección en la que se mueve el punto al crecer $t$, y su norma es la rapidez con la que se recorre la curva.'));
    c3.append(el('p',{class:'fuente'},'Fuente: "Derivada de funciones vectoriales", contenido de la Semana 1 según la calendarización oficial, Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: reglas de derivación de productos -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Reglas de derivación de productos'));
    c4.append(el('p',{},'La derivada de un producto punto o cruz de dos funciones vectoriales sigue la misma regla del producto de una variable, respetando el orden en el producto cruz (no es conmutativo):'));
    c4.append(el('div',{class:'formula',html:'$$\\big(\\mathbf u\\cdot\\mathbf v\\big)\'=\\mathbf u\'\\cdot\\mathbf v+\\mathbf u\\cdot\\mathbf v\'\\qquad\\qquad \\big(\\mathbf u\\times\\mathbf v\\big)\'=\\mathbf u\'\\times\\mathbf v+\\mathbf u\\times\\mathbf v\'$$'}));
    c4.append(el('p',{},el('b',{},'Ítem 19(a):'),' si $\\lVert\\mathbf r(t)\\rVert$ es constante, entonces $\\mathbf r(t)\\cdot\\mathbf r\'(t)=0$.'));
    Pasos(c4,[
      {tex:'f(t)=\\mathbf r(t)\\cdot\\mathbf r(t)=\\lVert\\mathbf r(t)\\rVert^2',nota:'Se define f como el producto punto de r consigo mismo.'},
      {tex:'\\lVert\\mathbf r(t)\\rVert\\ \\text{constante}\\ \\Rightarrow\\ f(t)\\ \\text{constante}\\ \\Rightarrow\\ f\'(t)=0',nota:'Si la norma no cambia, tampoco cambia su cuadrado.'},
      {tex:'f\'(t)=\\mathbf r\'(t)\\cdot\\mathbf r(t)+\\mathbf r(t)\\cdot\\mathbf r\'(t)=2\\,\\mathbf r(t)\\cdot\\mathbf r\'(t)',nota:'Regla del producto punto aplicada a f(t)=r(t)·r(t).'},
      {tex:'2\\,\\mathbf r(t)\\cdot\\mathbf r\'(t)=0\\ \\Rightarrow\\ \\mathbf r(t)\\cdot\\mathbf r\'(t)=0',nota:'Se despeja: el producto punto es cero, es decir, r y r\' son ortogonales.'}
    ],{modId:'funciones-vectoriales',titulo:'Ítem 19(a) — demostración'});
    c4.append(el('p',{class:'note'},'Interpretación geométrica: si $\\lVert\\mathbf r(t)\\rVert$ es constante, la curva vive sobre una esfera centrada en el origen. La velocidad $\\mathbf r\'(t)$ es siempre tangente a esa esfera, y por eso es ortogonal al radio $\\mathbf r(t)$.'));
    c4.append(el('p',{},el('b',{},'Ítem 19(b):'),' si $u(t)=\\mathbf r(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big)$, entonces $u\'(t)=\\mathbf r(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'\'(t)\\big)$.'));
    Pasos(c4,[
      {tex:'u\'(t)=\\mathbf r\'(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big)+\\mathbf r(t)\\cdot\\dfrac{d}{dt}\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big)',nota:'Regla del producto punto, tratando (r\'×r\'\') como el segundo factor.'},
      {tex:'\\mathbf r\'(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big)=0',nota:'r\'×r\'\' es ortogonal a r\' (propiedad del producto cruz), así que este término se anula.'},
      {tex:'\\dfrac{d}{dt}\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'(t)\\big)=\\mathbf r\'\'(t)\\times\\mathbf r\'\'(t)+\\mathbf r\'(t)\\times\\mathbf r\'\'\'(t)=\\mathbf r\'(t)\\times\\mathbf r\'\'\'(t)',nota:'Regla del producto cruz; el primer término se anula porque todo vector cruz consigo mismo da 0.'},
      {tex:'u\'(t)=0+\\mathbf r(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'\'(t)\\big)=\\mathbf r(t)\\cdot\\big(\\mathbf r\'(t)\\times\\mathbf r\'\'\'(t)\\big)',nota:'Se reemplazan los dos resultados anteriores y queda lo pedido.'}
    ],{modId:'funciones-vectoriales',titulo:'Ítem 19(b) — demostración'});
    c4.append(el('p',{class:'fuente'},'Fuente: "Derivada de productos vectoriales", contenido de la Semana 1 según la calendarización oficial; ítem 19, Listado 1, Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: recta tangente -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Recta tangente'));
    c5.append(el('p',{},el('b',{},'Ítems 14 y 15:'),' la misma recta, por dos caminos. Ítem 14 — con cálculo en una variable, recta tangente a $y=2-x^2$ en $(1,1)$: $y\'=-2x$, en $x=1$ la pendiente es $-2$, y la recta es $y=3-2x$.'));
    c5.append(el('p',{},'Ítem 15 — la misma parábola parametrizada como $\\mathbf r(t)=(\\sqrt t,\\,2-t)$, en $t=1$ (que da el punto $(1,1)$):'));
    Pasos(c5,[
      {tex:'\\mathbf r(1)=(\\sqrt1,\\,2-1)=(1,1)',nota:'Verificación: en t=1 se llega al mismo punto (1,1).'},
      {tex:'\\mathbf r\'(t)=\\Big(\\dfrac{1}{2\\sqrt t},\\,-1\\Big)\\ \\Rightarrow\\ \\mathbf r\'(1)=\\Big(\\dfrac12,\\,-1\\Big)',nota:'Se deriva componente a componente y se evalúa en t=1.'},
      {tex:'R_T(t)=(1,1)+t\\Big(\\dfrac12,-1\\Big)\\ \\Rightarrow\\ x=1+\\dfrac t2,\\ y=1-t',nota:'Recta tangente en forma paramétrica.'},
      {tex:'t=2(x-1)\\ \\Rightarrow\\ y=1-2(x-1)=3-2x',nota:'Se elimina t: es exactamente la recta y=3-2x del ítem 14 — misma recta, dos caminos.'}
    ],{modId:'funciones-vectoriales',titulo:'Ítem 15 — recta tangente paramétrica ≡ ítem 14'});
    c5.append(el('p',{},el('b',{},'Ítem 17:'),' tangente a la hélice $x=2\\cos t,\\ y=\\sin t,\\ z=t$ en el punto $(0,1,\\pi/2)$. Se necesita $t_0$ tal que $\\mathbf r(t_0)=(0,1,\\pi/2)$: como $\\sin t_0=1$, $t_0=\\pi/2$ (y en efecto $2\\cos(\\pi/2)=0$, $z=\\pi/2$).'));
    Pasos(c5,[
      {tex:'\\mathbf r\'(t)=(-2\\sin t,\\,\\cos t,\\,1)\\ \\Rightarrow\\ \\mathbf r\'(\\pi/2)=(-2,\\,0,\\,1)',nota:'Se deriva y se evalúa en t₀=π/2.'},
      {tex:'R_T(t)=(0,1,\\pi/2)+t(-2,0,1)',nota:'Recta tangente en forma paramétrica: x=-2t, y=1, z=π/2+t.'}
    ],{modId:'funciones-vectoriales',titulo:'Ítem 17 — tangente a la hélice'});
    c5.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (recta tangente a una curva paramétrica, consecuencia directa de "Derivada de funciones vectoriales", Semana 1 según la calendarización oficial); ítems 14, 15 y 17, Listado 1, Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: aplicación — el dron -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Aplicación: el dron que corta motor'));
    c6.append(el('p',{},'Ítem 18: un dron sigue $\\mathbf r(t)=(2\\cos t,\\,2\\sin t,\\,3t)$. En $t_0=\\pi/2$ se corta el motor y continúa en línea recta con la velocidad que llevaba en ese instante — la recta tangente en $t_0$. ¿En qué punto cruza el plano $z=0$?'));
    Pasos(c6,[
      {tex:'P_0=\\mathbf r(\\pi/2)=(2\\cos\\tfrac\\pi2,\\,2\\sin\\tfrac\\pi2,\\,3\\cdot\\tfrac\\pi2)=\\Big(0,\\,2,\\,\\dfrac{3\\pi}2\\Big)',nota:'Posición del dron cuando se corta el motor.'},
      {tex:'\\mathbf r\'(t)=(-2\\sin t,\\,2\\cos t,\\,3)\\ \\Rightarrow\\ \\mathbf r\'(\\pi/2)=(-2,\\,0,\\,3)',nota:'Velocidad en ese instante: la dirección en la que sigue en línea recta.'},
      {tex:'X(s)=\\Big(0,\\,2,\\,\\dfrac{3\\pi}2\\Big)+s(-2,0,3)',nota:'Ecuación vectorial de la recta que sigue el dron tras cortar el motor.'},
      {tex:'x=-2s,\\quad y=2,\\quad z=\\dfrac{3\\pi}2+3s',nota:'La misma recta, escrita componente a componente.'},
      {tex:'z=0:\\ \\ \\dfrac{3\\pi}2+3s=0\\ \\Rightarrow\\ s=-\\dfrac\\pi2',nota:'Se impone z=0 y se despeja el parámetro s.'},
      {tex:'x=-2\\Big(-\\dfrac\\pi2\\Big)=\\pi,\\quad y=2,\\quad z=0',nota:'Se reemplaza s en x e y.'}
    ],{modId:'funciones-vectoriales',titulo:'Ítem 18 — dónde cruza el dron el plano z=0'});
    c6.append(el('p',{},'El dron cruza el plano $z=0$ en el punto $(\\pi,\\,2,\\,0)$.'));
    c6.append(el('p',{class:'note'},el('b',{},'Verificación:'),' con el parámetro original $t=t_0+s=\\pi/2-\\pi/2=0$, se recalcula por el otro camino: $x=-2\\big(t-\\tfrac\\pi2\\big)$ con $t=0$ da $x=-2(-\\pi/2)=\\pi$; $y=2+0=2$; $z=\\tfrac{3\\pi}2+3(0-\\tfrac\\pi2)=\\tfrac{3\\pi}2-\\tfrac{3\\pi}2=0$. Mismo punto $(\\pi,2,0)$ por las dos parametrizaciones.'));
    c6.append(el('p',{class:'fuente'},'Fuente: ítem 18, Listado 1, Cálculo Multivariable, Canvas 2026-2.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios — Listado 1, ítems 13 a 19'));

    const mk=(n,enun,solHtml)=>{
      c7.append(el('details',{},
        el('summary',{},'Ítem '+n+' — '+enun),
        el('div',{},solHtml)));
    };

    mk('13','Dominio de (a) (t³, ln(3−t), √t) y (b) (ln(t−1), √(4−t²), eᵗ).',
      el('p',{},'Ya resuelto en la card de dominio: (a) $[0,3)$, (b) $(1,2]$.'));

    mk('14','Recta tangente a y=2−x² en (1,1), con métodos de una variable.',
      el('p',{},'$y\'=-2x$, en $x=1$ la pendiente es $-2$: $y=3-2x$.'));

    mk('15','Recta tangente a r(t)=(√t, 2−t) en t=1. Comprobar que es la misma del ítem 14.',
      el('p',{},'Ya resuelto en la card de recta tangente: mismo resultado, $y=3-2x$.'));

    mk('16','r\'(t) para r(t)=(1+t³)i + t e^{-t} j + sin(2t) k, y T(0).',
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf r\'(t)=\\big(3t^2,\\ e^{-t}(1-t),\\ 2\\cos(2t)\\big)\\ \\Rightarrow\\ \\mathbf r\'(0)=(0,1,2)$$'}),
        el('div',{class:'formula',html:'$$\\lVert\\mathbf r\'(0)\\rVert=\\sqrt{0+1+4}=\\sqrt5\\ \\Rightarrow\\ \\mathbf T(0)=\\dfrac{1}{\\sqrt5}(0,1,2)$$'})));

    mk('17','Recta tangente a la hélice x=2cos t, y=sin t, z=t en (0,1,π/2).',
      el('p',{},'Ya resuelto en la card de recta tangente: $X(t)=(0,1,\\pi/2)+t(-2,0,1)$.'));

    mk('18','El dron que corta motor: recta y punto donde cruza z=0.',
      el('p',{},'Ya resuelto en la card de aplicación: cruza en $(\\pi,2,0)$.'));

    mk('19','Demuestre (a) r·r\'=0 si ‖r‖ es constante; (b) la regla de derivación del triple producto u=r·(r\'×r\'\').',
      el('p',{},'Ya resueltos ambos en la card de reglas de derivación de productos.'));

    c7.append(el('p',{class:'fuente'},'Fuente: ítems 13 a 19, Listado 1, Cálculo Multivariable, Canvas 2026-2.'));
    sec.append(c7);
  }});
