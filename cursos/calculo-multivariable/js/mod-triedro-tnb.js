registerModule({id:'triedro-tnb',title:'Triedro móvil T, N, B',
  unidad:'I',semanas:[2],evaluacion:['test-1','certamen-1'],
  lead:'Tres vectores ortogonales que viajan pegados a la curva — tangente, normal y binormal — y que definen tres rectas y tres planos en cada punto. El procedimiento exacto que pide el Control 1.',
  build(sec){

    /* -------- Card 1: vector tangente unitario T -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Vector tangente unitario T'));
    c1.append(el('p',{},'Ya se vio que $\\mathbf r\'(t)$ es tangente a la curva. Normalizándolo se obtiene el primer vector del triedro:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf T(t)=\\dfrac{\\mathbf r\'(t)}{\\lVert\\mathbf r\'(t)\\rVert}$$'}));
    c1.append(el('p',{class:'note'},'$\\mathbf T$ apunta siempre en la dirección en la que se recorre la curva, y por construcción tiene norma 1 en todo punto donde $\\mathbf r\'(t)\\ne\\mathbf 0$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (vector tangente unitario), Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: N y B -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'N y B: el procedimiento de la Guía de Ayudantía'));
    c2.append(el('p',{},'La Guía de Ayudantía 1 da un orden de cálculo que evita el error más común (derivar $\\mathbf T$ para sacar $\\mathbf N$, que es innecesariamente largo):'));
    c2.append(el('div',{class:'formula',html:'$$\\mathbf T\\sim\\mathbf r\'(t_0)\\qquad \\mathbf B\\sim\\mathbf r\'(t_0)\\times\\mathbf r\'\'(t_0)\\qquad \\mathbf N=\\mathbf B\\times\\mathbf T$$'}));
    c2.append(el('p',{},'Primero se consigue $\\mathbf B$ con un solo producto cruz (usando $\\mathbf r\'$ y $\\mathbf r\'\'$, que ya hay que calcular igual), y con $\\mathbf T$ y $\\mathbf B$ ya calculados, $\\mathbf N=\\mathbf B\\times\\mathbf T$ sale gratis — sin derivar $\\mathbf T$.'));
    c2.append(el('div',{class:'card',style:'background:color-mix(in srgb, var(--s1) 7%, var(--surface)); border-left:3px solid var(--s1)'},
      el('p',{},el('b',{},'Advertencia de la guía: '),'no hay que normalizar $\\mathbf B$ ni $\\mathbf N$, salvo que el enunciado pida explícitamente vectores ',el('i',{},'unitarios'),'. Para escribir rectas y planos solo importa la ',el('b',{},'dirección'),' — normalizar es trabajo extra que no cambia la recta ni el plano resultante.')));
    c2.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, "TIPO 2: Triedro TNB", pasos 2 a 4, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: el triedro sobre la hélice -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'El triedro sobre la hélice'));
    c3.append(el('p',{},'Ítem 20 del Listado 1: para la hélice circular $\\mathbf r(t)=(\\cos t,\\sin t,t)$,'));
    c3.append(el('div',{class:'formula',html:'$$\\mathbf r\'(t)=(-\\sin t,\\cos t,1)\\qquad \\mathbf r\'\'(t)=(-\\cos t,-\\sin t,0)$$'}));
    c3.append(el('div',{class:'formula',html:'$$\\mathbf T(t)=\\dfrac{(-\\sin t,\\cos t,1)}{\\sqrt2}\\qquad \\mathbf N(t)=(-\\cos t,-\\sin t,0)\\qquad \\mathbf B(t)=\\dfrac{(\\sin t,-\\cos t,1)}{\\sqrt2}$$'}));
    c3.append(el('p',{},'Los tres, unitarios y dibujados desde el mismo punto de la curva, se ven claramente distintos entre sí — moveé $t$:'));
    const espT=Espacio(c3,{alto:500,escala:42});
    let tTri=1.5;
    function TNBhelice(t){
      const r=Math.SQRT1_2;
      const T=[-Math.sin(t)*r,Math.cos(t)*r,r];
      const N=[-Math.cos(t),-Math.sin(t),0];
      const B=[Math.sin(t)*r,-Math.cos(t)*r,r];
      return {T,N,B};
    }
    espT.dibujar(E=>{
      E.ejes3({largo:3});
      E.curva3(t=>[Math.cos(t),Math.sin(t),t],-Math.PI,Math.PI,{color:'--grid',grosor:1.5});
      const P=[Math.cos(tTri),Math.sin(tTri),tTri];
      const {T,N,B}=TNBhelice(tTri);
      const esc=1.7;
      E.punto3(P,{color:'--ink2'});
      E.vector3(P,[T[0]*esc,T[1]*esc,T[2]*esc],{color:'--s1',etiqueta:'T'});
      E.vector3(P,[N[0]*esc,N[1]*esc,N[2]*esc],{color:'--s6',etiqueta:'N'});
      E.vector3(P,[B[0]*esc,B[1]*esc,B[2]*esc],{color:'--s7',etiqueta:'B'});
    });
    c3.append(el('div',{class:'controls'},
      el('label',{},'t:'),
      el('input',{type:'range',min:String(-Math.PI),max:String(Math.PI),step:'0.03',value:String(tTri),oninput:e=>{ tTri=parseFloat(e.target.value); espT.redibujar(); }})
    ));
    c3.append(el('p',{class:'note'},'T (azul) siempre roza la curva (es tangente); N (naranjo) apunta horizontal hacia el eje de la hélice (es el que "hace curvar" el movimiento); B (violeta) es perpendicular a los otros dos y define el plano osculador. Ítem 20 también pide demostrar que, para cualquier curva suave, $\\lVert\\mathbf B\\rVert=1$ y $\\mathbf B$ es ortogonal a $\\mathbf T$ y a $\\mathbf N$: como $\\mathbf B:=\\mathbf T\\times\\mathbf N$ y $\\mathbf T,\\mathbf N$ son unitarios y ortogonales entre sí, el producto cruz de dos vectores ortonormales es también unitario, y todo producto cruz es ortogonal a ambos factores — así que $\\mathbf B\\perp\\mathbf T$ y $\\mathbf B\\perp\\mathbf N$ por construcción.'));
    c3.append(el('p',{class:'fuente'},'Fuente: ítem 20, Listado 1, Cálculo Multivariable, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: los tres planos -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Los tres planos y las tres rectas'));
    c4.append(el('p',{},'Cada uno de los tres vectores del triedro sirve de ',el('b',{},'normal'),' a un plano y de ',el('b',{},'director'),' a una recta — pero no al mismo, según esta tabla de la guía:'));
    Tabla(c4,{columnas:['Plano','Normal','Recta','Director'],filas:[
      ['Osculador','B','Tangente','T'],
      ['Normal','T','Normal principal','N'],
      ['Rectificante','N','Binormal','B']
    ]});
    c4.append(el('p',{class:'note'},'Mnemónico: cada plano lleva de normal el vector que NO le da nombre — el plano "normal" tiene de normal a T, no a N; el plano "rectificante" tiene de normal a N, no a B.'));
    c4.append(el('div',{class:'formula',html:'$$X(\\lambda)=P_0+\\lambda\\vec v\\ \\ (\\text{recta})\\qquad\\qquad \\vec v\\cdot(X-P_0)=0\\ \\ (\\text{plano})$$'}));
    c4.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, tabla "PLANOS / RECTAS", Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: ejemplo resuelto Control 1 2026-1 -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejemplo resuelto — Control 1, 2026-1'));
    c5.append(el('p',{},'Sea $\\mathbf r(t)=(t,\\,t^2,\\,\\ln t)$, $t\\gt0$. Determine la recta binormal y el plano osculador en $t_0=1$.'));
    Pasos(c5,[
      {tex:'P_0=\\mathbf r(1)=(1,1,0)',nota:'Paso 1 de la guía: ubicar el punto, evaluando r en t₀.'},
      {tex:'\\mathbf r\'(t)=\\Big(1,\\,2t,\\,\\dfrac1t\\Big)\\ \\Rightarrow\\ \\mathbf r\'(1)=(1,2,1)',nota:'Paso 2: derivar como función y recién ahí evaluar en t₀=1.'},
      {tex:'\\mathbf r\'\'(t)=\\Big(0,\\,2,\\,-\\dfrac1{t^2}\\Big)\\ \\Rightarrow\\ \\mathbf r\'\'(1)=(0,2,-1)',nota:'Segunda derivada, evaluada también en t₀=1.'},
      {tex:'\\mathbf r\'(1)\\times\\mathbf r\'\'(1)=(-4,1,2)',nota:'Paso 3: producto cruz — (2(-1)-1(2), 1(0)-1(-1), 1(2)-2(0)) = (-4,1,2), la dirección de B.'},
      {tex:'R_B(\\lambda)=(1,1,0)+\\lambda(-4,1,2)\\qquad \\dfrac{x-1}{-4}=\\dfrac{y-1}{1}=\\dfrac{z}{2}',nota:'Recta binormal: paramétrica y simétrica, con dirección B y punto P₀ (sin normalizar).'},
      {tex:'(-4,1,2)\\cdot(x-1,y-1,z)=0\\ \\Rightarrow\\ -4x+y+2z+3=0',nota:'Plano osculador: normal B, punto P₀.'}
    ],{modId:'triedro-tnb',titulo:'Recta binormal y plano osculador de r(t)=(t,t²,ln t) en t₀=1'});
    c5.append(el('p',{class:'note'},el('b',{},'Verificación del producto cruz (dos agrupaciones distintas): '),'con la fórmula por componentes $(a_2b_3-a_3b_2,\\ a_3b_1-a_1b_3,\\ a_1b_2-a_2b_1)$ y $\\mathbf a=(1,2,1)$, $\\mathbf b=(0,2,-1)$: $x=2(-1)-1(2)=-4$; $y=1(0)-1(-1)=1$; $z=1(2)-2(0)=2$, es decir $(-4,1,2)$. Con el determinante simbólico $\\begin{vmatrix}\\hat i&\\hat j&\\hat k\\\\1&2&1\\\\0&2&-1\\end{vmatrix}$ se expande igual por la primera fila y da el mismo resultado. Coincide además con la Pauta oficial del Control 1 2026-1 y con el ejemplo resuelto de la Guía de Ayudantía 1.'));
    c5.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 CMUL 2026-1, pregunta 1; reproducido paso a paso en la Guía de Ayudantía 1 ("Ejemplo resuelto, Control 1 2026-1"), Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: errores que descuentan -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Errores que descuentan puntaje'));
    c6.append(el('p',{},'Lista literal de la Guía de Ayudantía 1, columna "Triedro TNB":'));
    c6.append(el('ul',{class:'note'},
      el('li',{},'Normalizar T, N o B cuando no lo piden — trabajo extra que no cambia la recta ni el plano.'),
      el('li',{},'Derivar T para sacar N, en vez de usar $\\mathbf N=\\mathbf B\\times\\mathbf T$ una vez que ya se tiene $\\mathbf B$.'),
      el('li',{},'Confundir qué vector es la normal de cada plano — revisar siempre la tabla: osculador ⟂ B, normal ⟂ T, rectificante ⟂ N.'),
      el('li',{},'Evaluar en $t_0$ antes de derivar, en vez de derivar $\\mathbf r(t)$ como función y recién ahí reemplazar $t_0$.')
    ));
    c6.append(el('p',{class:'fuente'},'Fuente: Guía de Ayudantía 1 — Cálculo Multivariable, recuadro "Errores que descuentan" (columna TIPO 2), Canvas 2026-2.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios — Listado 1, ítems 20 a 25'));

    const mk=(n,enun,solHtml)=>{
      c7.append(el('details',{},
        el('summary',{},'Ítem '+n+' — '+enun),
        el('div',{},solHtml)));
    };

    mk('20','T(t), N(t), B(t) para la hélice r(t)=(cos t, sin t, t); demuestre ‖B‖=1 y B ortogonal a T y N.',
      el('p',{},'Ya resuelto en la card del triedro sobre la hélice.'));

    mk('21','Curva r(t)=(eᵗ, e⁻ᵗ, √2 t): T(0), N(0), B(0).',
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf r(0)=(1,1,0),\\quad \\mathbf r\'(0)=(1,-1,\\sqrt2),\\quad \\mathbf r\'\'(0)=(1,1,0)$$'}),
        el('div',{class:'formula',html:'$$\\lVert\\mathbf r\'(0)\\rVert=\\sqrt{1+1+2}=2\\ \\Rightarrow\\ \\mathbf T(0)=\\dfrac{(1,-1,\\sqrt2)}{2}$$'}),
        el('div',{class:'formula',html:'$$\\mathbf r\'(0)\\times\\mathbf r\'\'(0)=(-\\sqrt2,\\sqrt2,2)\\ \\Rightarrow\\ \\mathbf B(0)=\\dfrac{(-\\sqrt2,\\sqrt2,2)}{2\\sqrt2}=\\dfrac{(-1,1,\\sqrt2)}{2}$$'}),
        el('div',{class:'formula',html:'$$\\mathbf N(0)=\\mathbf B(0)\\times\\mathbf T(0)=\\dfrac{(1,1,0)}{\\sqrt2}$$'})));

    mk('22','Rectas tangente, normal y binormal a la curva del ítem 21, en P₀=r(0).',
      el('div',{},
        el('p',{},'Usando las direcciones sin normalizar del ítem 21 ($\\mathbf r\'(0)=(1,-1,\\sqrt2)$, $\\mathbf r\'(0)\\times\\mathbf r\'\'(0)=(-\\sqrt2,\\sqrt2,2)$, $(1,1,0)$):'),
        el('div',{class:'formula',html:'$$R_T(t)=(1,1,0)+t(1,-1,\\sqrt2)$$'}),
        el('div',{class:'formula',html:'$$R_N(t)=(1,1,0)+t(1,1,0)$$'}),
        el('div',{class:'formula',html:'$$R_B(t)=(1,1,0)+t(-\\sqrt2,\\sqrt2,2)$$'})));

    mk('23','Curva r(t)=(t, (t+1)², t³−1): rectas tangente, normal y binormal en la intersección con z=0.',
      el('div',{},
        el('div',{class:'formula',html:'$$z=0:\\ t^3-1=0\\ \\Rightarrow\\ t=1,\\quad P_0=\\mathbf r(1)=(1,4,0)$$'}),
        el('div',{class:'formula',html:'$$\\mathbf r\'(1)=(1,4,3),\\quad \\mathbf r\'\'(1)=(0,2,6),\\quad \\mathbf r\'(1)\\times\\mathbf r\'\'(1)=(18,-6,2)\\sim(9,-3,1)$$'}),
        el('div',{class:'formula',html:'$$\\mathbf N\\sim\\mathbf B\\times\\mathbf T=(9,-3,1)\\times(1,4,3)=(-13,-26,39)\\sim(-1,-2,3)$$'}),
        el('p',{},'Forma simétrica de las tres rectas por $P_0=(1,4,0)$:'),
        el('div',{class:'formula',html:'$$\\text{tangente: }\\dfrac{x-1}{1}=\\dfrac{y-4}{4}=\\dfrac z3\\qquad \\text{normal: }\\dfrac{x-1}{-1}=\\dfrac{y-4}{-2}=\\dfrac z3\\qquad \\text{binormal: }\\dfrac{x-1}{9}=\\dfrac{y-4}{-3}=\\dfrac z1$$'})));

    mk('24','Hélice r(t)=(cos t, sin t, t): planos osculador, normal y rectificante en (0,1,π/2); verificar que las rectas tangente y binormal quedan en el rectificante.',
      el('div',{},
        el('div',{class:'formula',html:'$$t_0=\\pi/2:\\quad \\mathbf r\'(\\pi/2)=(-1,0,1),\\quad \\mathbf r\'\'(\\pi/2)=(0,-1,0)$$'}),
        el('div',{class:'formula',html:'$$\\mathbf B\\sim\\mathbf r\'\\times\\mathbf r\'\'=(1,0,1),\\qquad \\mathbf N\\sim\\mathbf B\\times\\mathbf T=(0,-1,0)$$'}),
        el('div',{class:'formula',html:'$$\\text{osculador }(\\perp B):\\ x+z=\\dfrac\\pi2\\qquad \\text{normal }(\\perp T):\\ z-x=\\dfrac\\pi2\\qquad \\text{rectificante }(\\perp N):\\ y=1$$'}),
        el('p',{},'Verificación: la recta tangente $X(\\lambda)=(0,1,\\pi/2)+\\lambda(-1,0,1)$ y la binormal $X(\\mu)=(0,1,\\pi/2)+\\mu(1,0,1)$ tienen ambas componente $y$ constante e igual a 1 para todo $\\lambda,\\mu$ — así que las dos quedan contenidas en el plano rectificante $y=1$.')));

    mk('25','Hélice r(t)=(cos t, sin t, t): puntos donde la binormal es paralela al plano x+z=0.',
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf B(t)\\sim(\\sin t,-\\cos t,1)\\quad\\text{(dirección general, calculada en la card del triedro)}$$'}),
        el('p',{},'Paralela al plano $x+z=0$ (normal $(1,0,1)$) $\\iff$ dirección ortogonal a la normal:'),
        el('div',{class:'formula',html:'$$(\\sin t,-\\cos t,1)\\cdot(1,0,1)=\\sin t+1=0\\ \\Rightarrow\\ \\sin t=-1\\ \\Rightarrow\\ t=-\\dfrac\\pi2+2k\\pi,\\ k\\in\\mathbb Z$$'}),
        el('p',{},'Puntos: $\\mathbf r(t)=\\Big(0,\\,-1,\\,-\\dfrac\\pi2+2k\\pi\\Big)$.')));

    c7.append(el('p',{class:'fuente'},'Fuente: ítems 20 a 25, Listado 1, Cálculo Multivariable, Canvas 2026-2.'));
    sec.append(c7);
  }});
