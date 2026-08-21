/* contenidoOficial original (índice a cubrir):
   - Extremos locales de funciones reales de varias variables
   - Criterio de la segunda derivada y el Hessiano de una función real de varias variables
   - Polinomio de Taylor
   - Extremos condicionados
   - El teorema de multiplicadores de Lagrange
   - Aplicaciones */
registerModule({id:'extremos',title:'Extremos, Hessiano, Taylor y Lagrange',unidad:'II',semanas:[9],
  evaluacion:['certamen-2'],
  lead:'El análogo de "f\'=0" para funciones de dos variables: encontrar y clasificar máximos, mínimos y puntos silla, y qué cambia cuando el punto además tiene que cumplir una restricción.',
  build(sec){
    const movil=window.innerWidth<700; /* ver nota larga en la card 1: la escala de un
      Espacio es fija, así que se calcula distinto para el lienzo angosto del teléfono
      (~344px) que para el escritorio (~1057px). */

    /* -------- Card 1: puntos críticos y el criterio del Hessiano -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Puntos críticos y el criterio del Hessiano'));
    c1.append(el('p',{},'Un ',el('b',{},'punto crítico'),' de $f(x,y)$ cumple $f_x=f_y=0$ (tema Derivadas parciales). La ',el('b',{},'matriz Hessiana'),' decide, en cada uno, si hay un mínimo, un máximo o un punto silla:'));
    c1.append(el('div',{class:'formula',html:'$$Hf(a,b)=\\begin{bmatrix}f_{xx}&f_{xy}\\\\f_{yx}&f_{yy}\\end{bmatrix}_{(a,b)},\\qquad D=f_{xx}(a,b)\\,f_{yy}(a,b)-\\big(f_{xy}(a,b)\\big)^2$$'}));
    c1.append(el('ul',{},
      el('li',{},'$D>0$ y $f_{xx}>0$ → mínimo local.'),
      el('li',{},'$D>0$ y $f_{xx}<0$ → máximo local.'),
      el('li',{},'$D<0$ → punto silla (ni máximo ni mínimo).'),
      el('li',{},'$D=0$ → el criterio no concluye; hace falta otro método.')
    ));
    c1.append(el('p',{},'Es el análogo 2D del criterio de la segunda derivada de una variable, pero hace falta el determinante $D$ (no solo el signo de $f_{xx}$) porque en dos variables la "concavidad" puede ser distinta según la dirección — de ahí el punto silla, que no tiene equivalente en una variable. Ejemplo, con un único $f$ que produce los dos casos no triviales a la vez: $f(x,y)=x^3+y^3-3xy$.'));
    Pasos(c1,[
      {tex:'f_x=3x^2-3y=0\\ \\Longrightarrow\\ y=x^2',nota:'Primera parcial igualada a 0.'},
      {tex:'f_y=3y^2-3x=0\\ \\Longrightarrow\\ x=y^2',nota:'Segunda parcial igualada a 0.'},
      {tex:'x=(x^2)^2=x^4\\ \\Longrightarrow\\ x^4-x=0\\ \\Longrightarrow\\ x(x^3-1)=0',nota:'Se sustituye y=x² en x=y² para dejar todo en x.'},
      {tex:'x=0\\ (\\Rightarrow y=0)\\qquad\\text{o}\\qquad x=1\\ (\\Rightarrow y=1)',nota:'x³=1 solo tiene la raíz real x=1; las otras dos son complejas y no cuentan acá.'},
      {tex:'f_{xx}=6x,\\quad f_{yy}=6y,\\quad f_{xy}=-3\\ \\Longrightarrow\\ D=36xy-9',nota:'Segundas parciales y el determinante D, en función de (x,y).'},
      {tex:'(0,0):\\ D=-9<0\\ \\Rightarrow\\ \\text{silla}',nota:'D negativo en el primer punto crítico.'},
      {tex:'(1,1):\\ D=27>0,\\ f_{xx}=6>0\\ \\Rightarrow\\ \\text{mínimo local}',nota:'D positivo y f_xx positivo en el segundo.'}
    ],{modId:'extremos',titulo:'Puntos críticos de f(x,y)=x³+y³−3xy'});
    c1.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$f(0,0)=0$ y $f(1,1)=1+1-3=-1$. Si $(1,1)$ es un mínimo local, $f$ ahí debería ser menor que en puntos cercanos: probando $(1{,}1,\\ 1{,}1)$, $f=1{,}331+1{,}331-3{,}63=-0{,}968$, mayor que $-1$ ✓ (consistente con mínimo). En $(0,0)$, probando en dos direcciones distintas — $(0{,}1,0)$: $f=0{,}001>0$; $(0{,}1,\\,0{,}2)$: $f=0{,}001+0{,}008-0{,}06=-0{,}051<0$ — el signo cambia según la dirección, la firma de un punto silla.'));
    c1.append(el('p',{},'La figura de abajo no es esta $f$ (que crece sin cota fuera de la zona de los puntos críticos y no entra cómodo en un lienzo): son los tres modelos genéricos que el criterio $D$ distingue — un mínimo, un máximo y una silla — cada uno con su propio $D$, para ver la forma que corresponde a cada caso.'));
    const critSup=(tipo,x,y)=>{
      if(tipo===1)return (x*x+y*y)/2-1.125;      /* mínimo: D=1>0, fxx=1>0 */
      if(tipo===2)return -(x*x+y*y)/2+1.125;     /* máximo: D=1>0, fxx=-1<0 */
      return (x*x-y*y)/2;                          /* silla: D=-1<0, ya centrado */
    };
    const escalaCrit=movil?65:165;
    const espCrit=Espacio(c1,{alto:460,escala:escalaCrit});
    let tipoCrit=1;
    espCrit.dibujar(E=>{
      E.superficie((u,v)=>[u,v,critSup(tipoCrit,u,v)],{uMin:-1.5,uMax:1.5,vMin:-1.5,vMax:1.5,nu:14,nv:14});
      E.punto3([0,0,critSup(tipoCrit,0,0)],{color:'--s2',r:5});
    });
    const notaCrit=el('p',{class:'note',style:'font-weight:600'});
    const datosCrit=[
      {n:'Mínimo — f=(x²+y²)/2',d:'f_xx=1, f_yy=1, f_xy=0 → D=1>0, f_xx=1>0 → mínimo en (0,0,0).'},
      {n:'Máximo — f=−(x²+y²)/2',d:'f_xx=−1, f_yy=−1, f_xy=0 → D=1>0, f_xx=−1<0 → máximo en (0,0,0).'},
      {n:'Silla — f=(x²−y²)/2',d:'f_xx=1, f_yy=−1, f_xy=0 → D=−1<0 → punto silla en (0,0,0).'}
    ];
    function actualizarCrit(){ notaCrit.textContent=datosCrit[tipoCrit-1].n+':  '+datosCrit[tipoCrit-1].d; }
    actualizarCrit();
    c1.append(notaCrit);
    btnGroup(c1,[{label:'Mínimo',value:1},{label:'Máximo',value:2},{label:'Silla',value:3}],v=>{ tipoCrit=v; actualizarCrit(); espCrit.redibujar(); });
    c1.append(el('p',{class:'fuente'},'Fuente: criterio del Hessiano, index-v3.html (contenido auditado) y nota "Puntos críticos y criterio de la segunda derivada" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2). El ejemplo $f=x^3+y^3-3xy$ es un ejemplo estándar de la materia (Stewart/Larson); verificado arriba. Los tres modelos 3D (mínimo/máximo/silla) son elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: extremos absolutos en una región cerrada -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Extremos absolutos en una región cerrada'));
    c2.append(el('p',{},'El criterio del Hessiano solo aplica a puntos críticos ',el('b',{},'interiores'),'. En una región cerrada y acotada, los extremos absolutos pueden estar ahí o en la ',el('b',{},'frontera'),' — y en la frontera el Hessiano no sirve: hay que comparar $f$ ahí por separado. Ejemplo: extremos absolutos de $f(x,y)=xy^2$ en $D=\\{x\\ge0,\\,y\\ge0,\\,x^2+y^2\\le3\\}$ (un cuarto de disco).'));
    const planoReg=Plano(c2,{xMin:-0.5,xMax:2.2,yMin:-0.5,yMax:2.2,alto:340});
    planoReg.dibujar(P=>{
      P.ejes();
      P.region(x=>Math.sqrt(Math.max(0,3-x*x)),x=>0,0,Math.sqrt(3),{color:'--s1',alpha:0.22});
      P.parametrica(t=>[Math.sqrt(3)*Math.cos(t),Math.sqrt(3)*Math.sin(t)],0,Math.PI/2,{color:'--s1',grosor:2.2});
      P.punto(0,0,{color:'--muted',etiqueta:'(0,0)'});
      P.punto(Math.sqrt(3),0,{color:'--muted',etiqueta:'(√3,0)'});
      P.punto(0,Math.sqrt(3),{color:'--muted',etiqueta:'(0,√3)'});
      P.punto(1,Math.SQRT2,{color:'--s2',r:5,etiqueta:'(1,√2): máx f=2'});
    });
    c2.append(el('p',{class:'note'},'Región $D$ (celeste) con su borde curvo $x^2+y^2=3$ (arco azul) y los tres candidatos "de esquina"; el punto verde es el máximo absoluto que se encuentra abajo.'));
    c2.append(el('p',{},el('b',{},'Interior: '),'$f_x=y^2=0\\Rightarrow y=0$, pero $y=0$ ya es borde de $D$, no interior (donde se exige $y>0$) — no hay puntos críticos en el interior abierto. Todo el análisis se reduce a la frontera, en sus tres tramos:'));
    Pasos(c2,[
      {tex:'\\text{lado }x=0\\ (0\\le y\\le\\sqrt3):\\quad f(0,y)=0',nota:'Un lado recto de la región.'},
      {tex:'\\text{lado }y=0\\ (0\\le x\\le\\sqrt3):\\quad f(x,0)=0',nota:'El otro lado recto.'},
      {tex:'\\text{arco }x^2+y^2=3:\\quad x=\\sqrt3\\cos\\theta,\\ y=\\sqrt3\\sin\\theta,\\ \\theta\\in[0,\\pi/2]',nota:'Se parametriza el borde curvo.'},
      {tex:'g(\\theta)=f=\\sqrt3\\cos\\theta\\cdot3\\sin^2\\theta=3\\sqrt3\\,\\cos\\theta\\sin^2\\theta',nota:'f restringida al arco, como función de una sola variable θ.'},
      {tex:'g\'(\\theta)=3\\sqrt3\\sin\\theta\\,(2\\cos^2\\theta-\\sin^2\\theta)=0',nota:'Derivando (regla del producto) y factorizando sinθ.'},
      {tex:'\\sin\\theta=0\\ (g=0,\\text{ extremo del arco})\\quad\\text{o}\\quad\\tan^2\\theta=2',nota:'Se descarta sinθ=0 (ya cubierto por los lados rectos) y se resuelve el otro factor.'},
      {tex:'\\theta=\\arctan\\sqrt2\\approx54{,}7^\\circ',nota:'Ángulo que resuelve tan²θ=2 en el primer cuadrante.'},
      {tex:'\\cos\\theta=\\dfrac{1}{\\sqrt3},\\qquad \\sin\\theta=\\sqrt{\\dfrac23}',nota:'Seno y coseno de ese ángulo.'},
      {tex:'x=1,\\quad y=\\sqrt2,\\quad f(1,\\sqrt2)=1\\cdot2=2',nota:'Se recuperan x,y del ángulo y se evalúa f.'}
    ],{modId:'extremos',titulo:'Frontera de D: el arco x²+y²=3'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$\\cos^2\\theta+\\sin^2\\theta=\\tfrac13+\\tfrac23=1$ ✓, y el punto está en el arco: $1^2+(\\sqrt2)^2=1+2=3$ ✓. Conclusión: máximo absoluto $f=2$ en $(1,\\sqrt2)$; mínimo absoluto $f=0$, alcanzado en ',el('i',{},'todo'),' el borde recto ($x=0$ o $y=0$), no en un único punto.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejercicio 12 ("Hallar los extremos absolutos de f(x,y)=xy² en la región D=..."), tema "Puntos críticos y criterio de la segunda derivada"; coincide con el ejemplo de la nota "Puntos críticos y criterio de la segunda derivada" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2).'));
    sec.append(c2);

    /* -------- Card 3: polinomio de Taylor -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Polinomio de Taylor en dos variables'));
    c3.append(el('p',{},'La aproximación lineal $L(x,y)$ del tema Gradiente, plano tangente y aproximación lineal es en realidad el ',el('b',{},'primer'),' polinomio de Taylor, $P_1$. Sumando un término cuadrático se obtiene $P_2$, que aproxima mejor cerca de $(a,b)$:'));
    c3.append(el('div',{class:'formula',html:'$$P_2(x,y)=f(a,b)+f_x(a,b)\\Delta x+f_y(a,b)\\Delta y+\\tfrac12\\big[f_{xx}(a,b)\\Delta x^2+2f_{xy}(a,b)\\Delta x\\Delta y+f_{yy}(a,b)\\Delta y^2\\big]$$'}));
    c3.append(el('p',{},'con $\\Delta x=x-a$, $\\Delta y=y-b$. La parte cuadrática es exactamente la misma combinación $f_{xx},f_{xy},f_{yy}$ del determinante $D$ de la card "Puntos críticos y el criterio del Hessiano": en un punto crítico (donde $f_x=f_y=0$), $P_2-f(a,b)$ es esa forma cuadrática pura, y si es siempre positiva (mínimo), siempre negativa (máximo) o cambia de signo (silla) es justo lo que decide el criterio $D$ — el test del Hessiano ',el('i',{},'es'),' un test sobre el término cuadrático de Taylor.'));
    c3.append(el('p',{},'Ejemplo: $P_2$ de $f(x,y)=e^x\\cos y$ alrededor de $(0,0)$.'));
    Pasos(c3,[
      {tex:'f(0,0)=1',nota:'Valor de f en el origen.'},
      {tex:'f_x=e^x\\cos y\\ \\Rightarrow\\ f_x(0,0)=1',nota:'Parcial de primer orden en x, evaluada en el origen.'},
      {tex:'f_y=-e^x\\sin y\\ \\Rightarrow\\ f_y(0,0)=0',nota:'Parcial de primer orden en y, evaluada en el origen.'},
      {tex:'f_{xx}=e^x\\cos y\\ \\Rightarrow\\ f_{xx}(0,0)=1',nota:'Segunda parcial pura en x.'},
      {tex:'f_{xy}=-e^x\\sin y\\ \\Rightarrow\\ f_{xy}(0,0)=0',nota:'Segunda parcial mixta.'},
      {tex:'f_{yy}=-e^x\\cos y\\ \\Rightarrow\\ f_{yy}(0,0)=-1',nota:'Segunda parcial pura en y.'},
      {tex:'P_2(x,y)=1+x+\\tfrac12\\big[x^2+0-y^2\\big]=1+x+\\dfrac{x^2-y^2}{2}',nota:'Se reemplazan los valores en la fórmula general.'}
    ],{modId:'extremos',titulo:'Taylor de segundo orden de eˣcos y en (0,0)'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación en $(0{,}1,\\,0{,}2)$: '),'valor real $f=e^{0{,}1}\\cos(0{,}2)=1{,}105171\\times0{,}980067\\approx1{,}08311$. Con $P_2$: $1+0{,}1+\\dfrac{0{,}01-0{,}04}{2}=1{,}1-0{,}015=1{,}085$. Diferencia $\\approx0{,}0019$ (un $0{,}17\\%$) — mucho más chica que si solo se usara $P_1=1{,}1$ (diferencia $\\approx0{,}017$), porque $P_2$ ya incorpora la curvatura de $f$ cerca del origen.'));
    c3.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Stewart/Larson, polinomio de Taylor de dos variables) — no está en index-v3.html, en el vault ni en Canvas 2026-2, que no traen este subtema. Ejemplo y verificación son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: multiplicadores de Lagrange -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Multiplicadores de Lagrange'));
    c4.append(el('p',{},'Cuando el extremo de $f(x,y)$ tiene que cumplir además una restricción $g(x,y)=k$ (no todo el plano vale, solo la curva $g=k$), el Hessiano ya no aplica directo: en el extremo, la curva de nivel de $f$ es ',el('b',{},'tangente'),' a la curva de restricción, es decir sus gradientes son paralelos:'));
    c4.append(el('div',{class:'formula',html:'$$\\nabla f(x,y)=\\lambda\\,\\nabla g(x,y),\\qquad g(x,y)=k$$'}));
    c4.append(el('p',{},'Son 3 ecuaciones ($f_x=\\lambda g_x$, $f_y=\\lambda g_y$, $g=k$) en las 3 incógnitas $x,y,\\lambda$ — $\\lambda$ es auxiliar, no un candidato a extremo. Ejemplo: extremos absolutos de $f(x,y)=x^2+2y^2$ sujeto a $g(x,y)=x^2+y^2=1$.'));
    Pasos(c4,[
      {tex:'\\langle2x,\\,4y\\rangle=\\lambda\\langle2x,\\,2y\\rangle\\ \\Longrightarrow\\ 2x=2\\lambda x,\\quad 4y=2\\lambda y',nota:'Condición de Lagrange, componente a componente.'},
      {tex:'x(1-\\lambda)=0\\ \\Rightarrow\\ x=0\\ \\text{o}\\ \\lambda=1',nota:'De la primera ecuación.'},
      {tex:'y(4-2\\lambda)=0\\ \\Rightarrow\\ y=0\\ \\text{o}\\ \\lambda=2',nota:'De la segunda. λ no puede ser 1 y 2 a la vez: no hay solución con x≠0 y y≠0 simultáneamente — se analiza por casos.'},
      {tex:'\\text{Caso }x=0:\\ y^2=1\\Rightarrow y=\\pm1\\ \\Rightarrow\\ f(0,\\pm1)=2',nota:'Con la restricción x²+y²=1.'},
      {tex:'\\text{Caso }y=0:\\ x^2=1\\Rightarrow x=\\pm1\\ \\Rightarrow\\ f(\\pm1,0)=1',nota:'El otro caso.'}
    ],{modId:'extremos',titulo:'Lagrange: f=x²+2y² sobre x²+y²=1'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación: '),'ambos puntos cumplen la restricción — $(0,1)$: $0+1=1$ ✓; $(1,0)$: $1+0=1$ ✓. Y probando un tercer punto cualquiera de la circunferencia, $(\\tfrac{1}{\\sqrt2},\\tfrac{1}{\\sqrt2})$: $f=\\tfrac12+1=\\tfrac32$, entre $1$ y $2$ ✓ — consistente con que $1$ y $2$ son de verdad el mínimo y el máximo. Como $g=1$ es una curva cerrada y acotada, los extremos absolutos existen y están entre los candidatos de Lagrange — no hace falta revisar "frontera" aparte, porque la restricción ya es toda la frontera.'));
    c4.append(el('p',{class:'note'},'Dividir por una variable que podría ser 0 (p. ej. despejar $\\lambda=f_x/g_x$ directamente) pierde soluciones — por eso arriba se trabajó por casos.'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 11 ("Extremos de f sobre una circunferencia (Lagrange)"), tema "Multiplicadores de Lagrange" — marcado ahí como "agregado en auditoría" (Stewart, cap. Multiplicadores de Lagrange); no está en el vault ni en Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: Lagrange con restricción múltiple -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Lagrange con restricción múltiple'));
    c5.append(el('p',{},'Con dos restricciones $g(x,y,z)=k_1$, $h(x,y,z)=k_2$ (en $\\mathbb R^3$, cada una define una superficie; juntas, su intersección suele ser una curva), la condición usa un multiplicador por restricción:'));
    c5.append(el('div',{class:'formula',html:'$$\\nabla f=\\lambda\\,\\nabla g+\\mu\\,\\nabla h,\\qquad g=k_1,\\ \\ h=k_2$$'}));
    c5.append(el('p',{},'Ejemplo: minimizar $f(x,y,z)=x^2+y^2+z^2$ (el cuadrado de la distancia al origen) sujeto a $g:x+y+z=1$ y $h:x-y=1$ — geométricamente, la distancia mínima al origen sobre la recta donde se cortan esos dos planos.'));
    Pasos(c5,[
      {tex:'\\langle2x,2y,2z\\rangle=\\lambda\\langle1,1,1\\rangle+\\mu\\langle1,-1,0\\rangle',nota:'Condición de Lagrange con dos multiplicadores.'},
      {tex:'2x=\\lambda+\\mu,\\qquad 2y=\\lambda-\\mu,\\qquad 2z=\\lambda',nota:'Tres ecuaciones, una por componente.'},
      {tex:'\\text{Sumando las dos primeras: }2x+2y=2\\lambda\\ \\Rightarrow\\ x+y=\\lambda=2z',nota:'El z-componente da λ=2z directo; sumar las otras dos elimina μ.'},
      {tex:'x+y+z=1\\ \\text{ y }\\ x+y=2z\\ \\Longrightarrow\\ 3z=1\\ \\Rightarrow\\ z=\\dfrac13',nota:'Se sustituye x+y=2z en la primera restricción.'},
      {tex:'x+y=2z=\\dfrac23',nota:'Con z=1/3 ya conocido.'},
      {tex:'\\text{Con }x-y=1\\text{ y }x+y=\\dfrac23:\\ \\ x=\\dfrac56,\\quad y=-\\dfrac16',nota:'Sistema 2×2 en x,y a partir de la segunda restricción.'}
    ],{modId:'extremos',titulo:'Lagrange con dos restricciones: distancia mínima a una recta'});
    c5.append(el('p',{class:'note'},el('b',{},'Verificación de las restricciones: '),'$x+y+z=\\tfrac56-\\tfrac16+\\tfrac13=\\tfrac{5-1+2}{6}=1$ ✓; $x-y=\\tfrac56+\\tfrac16=1$ ✓. Valor mínimo: $f=\\big(\\tfrac56\\big)^2+\\big(\\tfrac16\\big)^2+\\big(\\tfrac13\\big)^2=\\tfrac{25}{36}+\\tfrac1{36}+\\tfrac4{36}=\\tfrac{30}{36}=\\tfrac56$.'));
    c5.append(el('p',{class:'note'},el('b',{},'Segunda verificación, por un camino distinto: '),'la recta intersección se puede parametrizar directo de las dos restricciones ($x=y+1$, y con $z=1-x-y$ queda $z=-2y$), dando $x=t+1,\\ y=t,\\ z=-2t$. Entonces $f=(t+1)^2+t^2+4t^2=6t^2+2t+1$, que se minimiza en una variable con $f\'(t)=12t+2=0\\Rightarrow t=-\\tfrac16$: $x=\\tfrac56$, $y=-\\tfrac16$, $z=\\tfrac13$, $f=6(\\tfrac1{36})+2(-\\tfrac16)+1=\\tfrac16-\\tfrac13+1=\\tfrac56$ — mismo punto y mismo valor que con Lagrange.'));
    c5.append(el('p',{class:'fuente'},'Fuente: fórmula con dos restricciones, index-v3.html (contenido auditado), tema "Multiplicadores de Lagrange". El ejemplo numérico (distancia mínima a la recta x+y+z=1, x−y=1) y ambas verificaciones son elaboración propia — no hay ejemplo de restricción múltiple en index-v3.html, el vault ni Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Canvas 2026-2 no trae material de esta unidad: el Listado 1 y la Guía de Ayudantía 1 solo cubren funciones vectoriales y el triedro TNB (Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Clasifique los puntos críticos de $f(x,y)=x^2+y^2-4x+2y+5$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$f_x=2x-4=0\\Rightarrow x=2,\\qquad f_y=2y+2=0\\Rightarrow y=-1$$'}),
        el('div',{class:'formula',html:'$$f_{xx}=2,\\ f_{yy}=2,\\ f_{xy}=0\\ \\Rightarrow\\ D=4>0,\\ f_{xx}=2>0\\ \\Rightarrow\\ \\text{mínimo local en }(2,-1)$$'}),
        el('p',{class:'note'},'$f(2,-1)=4+1-8-2+5=0$. Como $D$ y $f_{xx}$ no dependen de $(x,y)$ (son constantes), es en realidad un mínimo ',el('i',{},'absoluto'),' — completando cuadrados, $f=(x-2)^2+(y+1)^2$, siempre $\\ge0$.')));
    c6.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con Lagrange, maximice $f(x,y)=xy$ sujeto a $x+y=10$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\nabla f=\\langle y,x\\rangle=\\lambda\\langle1,1\\rangle\\ \\Rightarrow\\ y=\\lambda=x\\ \\Rightarrow\\ x=y$$'}),
        el('div',{class:'formula',html:'$$\\text{Con }x+y=10:\\ x=y=5,\\qquad f(5,5)=25$$'}),
        el('p',{class:'note'},'El producto de dos números de suma fija se maximiza cuando son iguales — mismo ejercicio 13 de index-v3.html.')));
    c6.append(ej2);

    const ej3=el('details',{},
      el('summary',{},'Ejercicio 3 — Con Lagrange en 3 variables, minimice $f(x,y,z)=x+y+z$ sujeto a $xyz=1$, con $x,y,z>0$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\nabla f=\\langle1,1,1\\rangle=\\lambda\\langle yz,xz,xy\\rangle\\ \\Rightarrow\\ yz=xz=xy=\\dfrac1\\lambda$$'}),
        el('div',{class:'formula',html:'$$yz=xz\\ (z\\neq0)\\Rightarrow x=y;\\quad xz=xy\\ (x\\neq0)\\Rightarrow y=z\\ \\Rightarrow\\ x=y=z$$'}),
        el('div',{class:'formula',html:'$$x^3=1\\Rightarrow x=1,\\qquad f(1,1,1)=3$$'}),
        el('p',{class:'note'},'Caso particular de la desigualdad AM-GM: $x+y+z\\ge3\\sqrt[3]{xyz}=3$. Mismo ejercicio 14 de index-v3.html.')));
    c6.append(ej3);

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, elaboración propia (aplicando el criterio de la card "Puntos críticos y el criterio del Hessiano"). Ejercicios 2 y 3: index-v3.html (contenido auditado), ejercicios 13 y 14, tema "Multiplicadores de Lagrange" — resueltos acá en vez de solo citados, para no dejarlos sin desarrollo.'));
    sec.append(c6);
  }});
