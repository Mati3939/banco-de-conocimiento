registerModule({id:'geometria-vectorial',title:'Geometría vectorial en R² y R³',
  unidad:'I',semanas:[1],evaluacion:['test-1','certamen-1'],
  lead:'Vectores, sus tres productos (punto, cruz, triple) y cómo con ellos se escriben rectas y planos en el espacio — la base algebraica de toda la Unidad I.',
  build(sec){

    /* -------- Card 1: vectores en R² y R³ -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Vectores en R² y R³'));
    c1.append(el('p',{},'Un vector $\\mathbf v=(v_1,v_2,v_3)$ se suma componente a componente, se escala multiplicando cada componente por un número, y su norma (largo) es:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf u+\\mathbf v=(u_1+v_1,\\,u_2+v_2,\\,u_3+v_3)\\qquad \\lambda\\mathbf v=(\\lambda v_1,\\lambda v_2,\\lambda v_3)\\qquad \\lVert\\mathbf v\\rVert=\\sqrt{v_1^2+v_2^2+v_3^2}$$'}));
    c1.append(el('p',{},'Un vector es ',el('b',{},'unitario'),' si $\\lVert\\mathbf v\\rVert=1$. Cualquier vector no nulo se convierte en unitario dividiéndolo por su propia norma:'));
    c1.append(el('div',{class:'formula',html:'$$\\hat{\\mathbf v}=\\dfrac{\\mathbf v}{\\lVert\\mathbf v\\rVert}$$'}));
    c1.append(el('p',{},'Con $\\mathbf u=(2,1,2)$ y $\\mathbf v=(-1,2,1)$, la suma $\\mathbf u+\\mathbf v=(1,3,3)$ se ve así — arrastrá para rotar:'));
    const espV=Espacio(c1,{alto:420,escala:38});
    espV.dibujar(E=>{
      E.ejes3({largo:3});
      E.vector3([0,0,0],[2,1,2],{color:'--s1',etiqueta:'u'});
      E.vector3([0,0,0],[-1,2,1],{color:'--s6',etiqueta:'v'});
      E.vector3([0,0,0],[1,3,3],{color:'--s7',etiqueta:'u+v'});
      E.linea3([2,1,2],[1,3,3],{color:'--grid',guiones:true});
      E.linea3([-1,2,1],[1,3,3],{color:'--grid',guiones:true});
    });
    c1.append(el('p',{class:'note'},'Los guiones marcan el paralelogramo: u+v es la diagonal, exactamente la regla del paralelogramo de siempre, ahora en R³.'));
    c1.append(el('p',{class:'fuente'},'Fuente: "Geometría vectorial en IR2 y IR3", contenido del temario oficial (suma, ponderación, norma y vector unitario son desarrollo estándar de Stewart/Larson), Cálculo Multivariable — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: producto punto -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Producto punto'));
    c2.append(el('div',{class:'formula',html:'$$\\mathbf a\\cdot\\mathbf b=a_1b_1+a_2b_2+a_3b_3=\\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert\\cos\\theta$$'}));
    c2.append(el('p',{},'De la segunda igualdad sale el ángulo entre dos vectores, y de ahí la ',el('b',{},'proyección'),' de $\\mathbf b$ sobre $\\mathbf a$ — la "sombra" de $\\mathbf b$ en la dirección de $\\mathbf a$ — y la descomposición de $\\mathbf b$ en una parte paralela a $\\mathbf a$ y una ortogonal a $\\mathbf a$:'));
    c2.append(el('div',{class:'formula',html:'$$\\cos\\theta=\\dfrac{\\mathbf a\\cdot\\mathbf b}{\\lVert\\mathbf a\\rVert\\lVert\\mathbf b\\rVert}\\qquad \\operatorname{proy}_{\\mathbf a}\\mathbf b=\\dfrac{\\mathbf a\\cdot\\mathbf b}{\\lVert\\mathbf a\\rVert^2}\\,\\mathbf a\\qquad \\mathbf b=\\underbrace{\\operatorname{proy}_{\\mathbf a}\\mathbf b}_{\\parallel\\,\\mathbf a}+\\underbrace{(\\mathbf b-\\operatorname{proy}_{\\mathbf a}\\mathbf b)}_{\\perp\\,\\mathbf a}$$'}));
    c2.append(el('p',{},'Ítem 2 del Listado 1: descomponga $\\mathbf b=(1,1,3)$ como suma de un vector paralelo a $\\mathbf a=(2,1,2)$ y uno ortogonal a $\\mathbf a$:'));
    Pasos(c2,[
      {tex:'\\mathbf a\\cdot\\mathbf b=(2)(1)+(1)(1)+(2)(3)=9',nota:'Producto punto de a y b.'},
      {tex:'\\lVert\\mathbf a\\rVert^2=4+1+4=9',nota:'Norma al cuadrado de a.'},
      {tex:'\\operatorname{proy}_{\\mathbf a}\\mathbf b=\\dfrac{9}{9}\\,\\mathbf a=1\\cdot(2,1,2)=(2,1,2)',nota:'El escalar da exactamente 1: la componente paralela coincide con a.'},
      {tex:'\\mathbf b_{\\perp}=\\mathbf b-\\operatorname{proy}_{\\mathbf a}\\mathbf b=(1,1,3)-(2,1,2)=(-1,0,1)',nota:'La componente ortogonal es lo que sobra de b.'},
      {tex:'\\mathbf a\\cdot\\mathbf b_{\\perp}=(2)(-1)+(1)(0)+(2)(1)=-2+0+2=0',nota:'Verificación: el producto punto da 0, confirmando que (-1,0,1) es ortogonal a a.'}
    ],{modId:'geometria-vectorial',titulo:'Ítem 2 — descomposición de b respecto de a'});
    c2.append(el('p',{},'Entonces $\\mathbf b=(2,1,2)+(-1,0,1)$, con el primer sumando paralelo a $\\mathbf a$ y el segundo ortogonal a $\\mathbf a$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: "Geometría vectorial en IR2 y IR3", contenido del temario oficial (producto punto, ángulo y proyección son desarrollo estándar de Stewart/Larson); ítem 2, Listado 1, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: producto cruz -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Producto cruz'));
    c3.append(el('p',{},'El producto cruz de dos vectores de R³ se calcula como un determinante simbólico y da como resultado ',el('b',{},'otro vector'),', ortogonal a ambos factores:'));
    c3.append(el('div',{class:'formula',html:'$$\\mathbf a\\times\\mathbf b=\\begin{vmatrix}\\hat{\\mathbf i}&\\hat{\\mathbf j}&\\hat{\\mathbf k}\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}=(a_2b_3-a_3b_2,\\ a_3b_1-a_1b_3,\\ a_1b_2-a_2b_1)$$'}));
    c3.append(el('p',{},'Su norma mide el ',el('b',{},'área del paralelogramo'),' que forman $\\mathbf a$ y $\\mathbf b$; la mitad es el área del triángulo. Ítem 5 del Listado 1: área del triángulo de vértices $A(1,0,1)$, $B(2,3,0)$, $C(0,1,2)$:'));
    Pasos(c3,[
      {tex:'\\overrightarrow{AB}=B-A=(1,3,-1),\\quad \\overrightarrow{AC}=C-A=(-1,1,1)',nota:'Dos lados del triángulo desde el vértice A.'},
      {tex:'\\overrightarrow{AB}\\times\\overrightarrow{AC}=(4,0,4)',nota:'Producto cruz componente a componente: (3(1)-(-1)(1), (-1)(-1)-1(1), 1(1)-3(-1)) = (4,0,4).'},
      {tex:'\\lVert(4,0,4)\\rVert=\\sqrt{16+0+16}=\\sqrt{32}=4\\sqrt2',nota:'Norma del producto cruz: área del paralelogramo.'},
      {tex:'\\text{Área}=\\tfrac12\\lVert\\overrightarrow{AB}\\times\\overrightarrow{AC}\\rVert=2\\sqrt2\\approx2{,}828',nota:'El triángulo es la mitad del paralelogramo.'}
    ],{modId:'geometria-vectorial',titulo:'Ítem 5 — área del triángulo ABC'});
    c3.append(el('p',{},'Ítem 6 pide demostrar tres propiedades generales. La identidad de Lagrange (6c) relaciona los dos productos:'));
    c3.append(el('div',{class:'formula',html:'$$\\lVert\\mathbf a\\times\\mathbf b\\rVert^2+(\\mathbf a\\cdot\\mathbf b)^2=\\lVert\\mathbf a\\rVert^2\\lVert\\mathbf b\\rVert^2$$'}));
    c3.append(el('p',{class:'note'},'Verificación numérica con $\\mathbf a=(1,3,4)$, $\\mathbf b=(2,7,-5)$ del ítem 4: $\\mathbf a\\times\\mathbf b=(-43,13,1)$, así que $\\lVert\\mathbf a\\times\\mathbf b\\rVert^2=1849+169+1=2019$. Además $\\mathbf a\\cdot\\mathbf b=2+21-20=3$, así que $(\\mathbf a\\cdot\\mathbf b)^2=9$. Suma: $2019+9=2028$. Por otro lado $\\lVert\\mathbf a\\rVert^2\\lVert\\mathbf b\\rVert^2=26\\times78=2028$ — coinciden.'));
    c3.append(el('p',{class:'fuente'},'Fuente: "Geometría vectorial en IR2 y IR3", contenido del temario oficial (producto cruz, área e identidad de Lagrange son desarrollo estándar de Stewart/Larson); ítems 4, 5 y 6c, Listado 1, Canvas 2026-2. La verificación numérica de la identidad de Lagrange se agregó acá reutilizando los vectores del ítem 4.'));
    sec.append(c3);

    /* -------- Card 4: triple producto y coplanaridad -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Triple producto y coplanaridad'));
    c4.append(el('p',{},'El ',el('b',{},'triple producto escalar'),' $\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)$ da el volumen (con signo) del paralelepípedo que forman los tres vectores. Si el volumen es 0, los tres vectores son coplanares — no encierran ningún volumen:'));
    c4.append(el('div',{class:'formula',html:'$$V=\\big|\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)\\big|\\qquad \\mathbf a,\\mathbf b,\\mathbf c\\ \\text{coplanares}\\iff \\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)=0$$'}));
    c4.append(el('p',{},'Ítem 1 del Listado 1: ¿son coplanares $\\mathbf a=(1,2,-1)$, $\\mathbf b=(3,0,2)$ y $\\mathbf c=(5,4,0)$?'));
    Pasos(c4,[
      {tex:'\\mathbf b\\times\\mathbf c=\\big(0(0)-2(4),\\ 2(5)-3(0),\\ 3(4)-0(5)\\big)=(-8,10,12)',nota:'Primero el producto cruz de los otros dos vectores.'},
      {tex:'\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)=1(-8)+2(10)+(-1)(12)=-8+20-12=0',nota:'Se completa el triple producto con el producto punto.'},
      {tex:'V=|0|=0',nota:'Volumen nulo: los tres vectores SÍ son coplanares.'}
    ],{modId:'geometria-vectorial',titulo:'Ítem 1 — ¿son coplanares a, b y c?'});
    c4.append(el('p',{class:'note'},'Que el volumen dé exactamente 0 no es casualidad del redondeo — es el resultado exacto, y es la respuesta que pide el ítem: los tres vectores son coplanares.'));
    c4.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (triple producto escalar, volumen y coplanaridad — no figuran con ese nombre en el temario oficial, que solo lista "Geometría vectorial en IR2 y IR3"); ítem 1, Listado 1, Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: rectas en el espacio -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Rectas en el espacio'));
    c5.append(el('p',{},'Una recta queda determinada por un punto $P_0=(x_0,y_0,z_0)$ y un vector director $\\mathbf d=(d_1,d_2,d_3)$:'));
    c5.append(el('div',{class:'formula',html:'$$\\text{paramétrica: } X(t)=P_0+t\\,\\mathbf d\\qquad \\text{simétrica: } \\dfrac{x-x_0}{d_1}=\\dfrac{y-y_0}{d_2}=\\dfrac{z-z_0}{d_3}$$'}));
    c5.append(el('p',{},'Ítem 7 del Listado 1: recta por $(1,-2,4)$ con vector director $\\mathbf d=(3,1,-2)$:'));
    c5.append(el('div',{class:'formula',html:'$$\\begin{cases}x=1+3t\\\\y=-2+t\\\\z=4-2t\\end{cases}\\qquad\\qquad \\dfrac{x-1}{3}=\\dfrac{y+2}{1}=\\dfrac{z-4}{-2}$$'}));
    const espR=Espacio(c5,{alto:480,escala:32});
    espR.dibujar(E=>{
      E.ejes3({largo:4});
      E.curva3(t=>[1+3*t,-2+t,4-2*t],-1,1,{color:'--s5'});
      E.punto3([1,-2,4],{color:'--s2'});
      E.texto3([1,-2,4],'P₀(1,-2,4)');
      E.vector3([1,-2,4],[1.2,0.4,-0.8],{color:'--s1',etiqueta:'d'});
    });
    c5.append(el('p',{class:'note'},'La recta (en verde) pasa por $P_0$ con la dirección de $\\mathbf d$ (flecha azul, escalada para que se vea); el tramo dibujado corresponde a $t\\in[-1,1]$.'));
    c5.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (ecuaciones paramétrica y simétrica de la recta en R³ — no figuran con ese nombre en el temario oficial, que solo lista "Geometría vectorial en IR2 y IR3"); ítem 7, Listado 1, Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: planos -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Planos'));
    c6.append(el('p',{},'Un plano queda determinado por un punto $P_0$ y un vector normal $\\mathbf n=(A,B,C)$ (perpendicular a todo el plano):'));
    c6.append(el('div',{class:'formula',html:'$$\\mathbf n\\cdot(X-P_0)=0 \\iff A(x-x_0)+B(y-y_0)+C(z-z_0)=0 \\iff Ax+By+Cz=D$$'}));
    c6.append(el('p',{},el('b',{},'Ítem 8:'),' plano por $P(1,3,2)$, $Q(3,-1,6)$, $R(5,2,0)$. El normal sale del producto cruz de dos lados del triángulo PQR:'));
    Pasos(c6,[
      {tex:'\\overrightarrow{PQ}=(2,-4,4),\\quad \\overrightarrow{PR}=(4,-1,-2)',nota:'Dos vectores dentro del plano, ambos desde P.'},
      {tex:'\\mathbf n=\\overrightarrow{PQ}\\times\\overrightarrow{PR}=(12,20,14)\\ \\sim\\ (6,10,7)',nota:'Producto cruz; se simplifica dividiendo por 2 (solo importa la dirección).'},
      {tex:'6(x-1)+10(y-3)+7(z-2)=0',nota:'Ecuación punto-normal con P(1,3,2).'},
      {tex:'6x+10y+7z=50',nota:'Forma general. Verificación: Q y R también la satisfacen (18-10+42=50; 30+20+0=50).'}
    ],{modId:'geometria-vectorial',titulo:'Ítem 8 — plano por tres puntos'});
    c6.append(el('p',{},el('b',{},'Ítem 9:'),' ¿la recta está contenida, es paralela, o corta al plano? Se reemplaza $X(t)$ en la ecuación del plano; si el resultado es una identidad en $t$ (constante = D), la recta está contenida; si da una constante ≠ D (t se cancela), es paralela; si queda una ecuación en $t$ con solución, la corta ahí.'));
    c6.append(el('div',{class:'formula',html:'$$(a)\\ L:(1+2t,-1+t,3-t),\\ \\pi:x+y+3z=5 \\Rightarrow (1+2t)+(-1+t)+3(3-t)=9\\ne5\\ \\ \\Rightarrow\\ \\textbf{paralela}$$'}));
    c6.append(el('div',{class:'formula',html:'$$(b)\\ L:(1+t,2-t,3+2t),\\ \\pi:x+3y+z=10 \\Rightarrow (1+t)+3(2-t)+(3+2t)=10\\ \\ \\forall t\\ \\ \\Rightarrow\\ \\textbf{contenida}$$'}));
    c6.append(el('p',{},el('b',{},'Ítem 10:'),' intersección de $L:(2+t,1-t,3t)$ con $2x-y+z=7$:'));
    c6.append(el('div',{class:'formula',html:'$$2(2+t)-(1-t)+3t=3+6t=7\\ \\Rightarrow\\ t=\\tfrac23\\ \\Rightarrow\\ P=\\left(\\tfrac83,\\tfrac13,2\\right)$$'}));
    c6.append(el('p',{},el('b',{},'Ítem 11:'),' ángulo entre los planos $x+y+z=1$ (normal $(1,1,1)$) y $x-2y+3z=1$ (normal $(1,-2,3)$) — el mismo ángulo entre sus normales:'));
    c6.append(el('div',{class:'formula',html:'$$\\cos\\theta=\\dfrac{(1,1,1)\\cdot(1,-2,3)}{\\lVert(1,1,1)\\rVert\\lVert(1,-2,3)\\rVert}=\\dfrac{2}{\\sqrt3\\sqrt{14}}=\\dfrac{2}{\\sqrt{42}}\\ \\Rightarrow\\ \\theta\\approx72{,}0°$$'}));
    c6.append(el('p',{},el('b',{},'Ítem 12:'),' la recta de intersección de esos dos planos tiene como dirección $\\mathbf n_1\\times\\mathbf n_2$, y un punto se obtiene fijando una variable (aquí $z=0$):'));
    c6.append(el('div',{class:'formula',html:'$$\\mathbf n_1\\times\\mathbf n_2=(5,-2,-3)\\qquad z=0\\Rightarrow x+y=1,\\ x-2y=1\\Rightarrow(1,0,0)\\qquad X(t)=(1,0,0)+t(5,-2,-3)$$'}));
    c6.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de Stewart/Larson (ecuación del plano, posición relativa recta-plano, ángulo entre planos y recta de intersección — no figuran con ese nombre en el temario oficial, que solo lista "Geometría vectorial en IR2 y IR3"); ítems 8–12, Listado 1, Canvas 2026-2.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios — Listado 1, ítems 1 a 12'));

    const mk=(n,enun,solHtml)=>{
      const d=el('details',{},
        el('summary',{},'Ítem '+n+' — '+enun),
        el('div',{},solHtml));
      c7.append(d);
    };

    mk(1,'¿Son coplanares a=(1,2,-1), b=(3,0,2) y c=(5,4,0)?',
      el('p',{},'Ya resuelto en la card de triple producto: $\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)=0$, así que ',el('b',{},'sí son coplanares'),' (volumen 0).'));

    mk(2,'Descomponga b=(1,1,3) en paralelo y ortogonal a a=(2,1,2).',
      el('p',{},'Ya resuelto en la card de producto punto: $\\mathbf b=(2,1,2)+(-1,0,1)$.'));

    mk(3,'Ángulo entre dos diagonales de un cubo.',
      el('div',{},
        el('p',{},'Para un cubo unitario, dos diagonales de espacio son, por ejemplo, $(1,1,1)$ (de un vértice al opuesto) y $(-1,1,1)$ (de otro vértice al suyo opuesto):'),
        el('div',{class:'formula',html:'$$\\cos\\theta=\\dfrac{(1,1,1)\\cdot(-1,1,1)}{\\sqrt3\\cdot\\sqrt3}=\\dfrac{1}{3}\\ \\Rightarrow\\ \\theta=\\arccos\\!\\left(\\tfrac13\\right)\\approx70{,}53°$$'}),
        el('p',{class:'note'},'Por la simetría del cubo, cualquier otro par de diagonales de espacio da el mismo ángulo (se puede verificar con $(1,1,1)$ y $(1,-1,1)$: el producto punto también da 1).')));

    mk(4,'Vector unitario ortogonal a a=(1,3,4) y b=(2,7,-5). ¿Es única la respuesta?',
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathbf a\\times\\mathbf b=(-43,13,1),\\qquad \\lVert\\mathbf a\\times\\mathbf b\\rVert=\\sqrt{2019}\\approx44{,}93$$'}),
        el('div',{class:'formula',html:'$$\\hat{\\mathbf n}=\\dfrac{1}{\\sqrt{2019}}(-43,13,1)\\approx(-0{,}9569,\\ 0{,}2893,\\ 0{,}0223)$$'}),
        el('p',{class:'note'},'No es única: $-\\hat{\\mathbf n}$ también es unitario y ortogonal a ambos. Hay exactamente dos, opuestos entre sí.')));

    mk(5,'Área del triángulo A(1,0,1), B(2,3,0), C(0,1,2).',
      el('p',{},'Ya resuelto en la card de producto cruz: área $=2\\sqrt2\\approx2{,}828$.'));

    mk(6,'Demuestre: (a) a×a=Θ, (b) (a×b)·a=0, (c) identidad de Lagrange.',
      el('div',{},
        el('p',{},el('b',{},'(a)'),' $\\mathbf a\\times\\mathbf a=(a_2a_3-a_3a_2,\\ a_3a_1-a_1a_3,\\ a_1a_2-a_2a_1)=(0,0,0)$ — cada componente resta un producto consigo mismo. (El Listado usa Θ para el vector nulo.)'),
        el('p',{},el('b',{},'(b)'),' $(\\mathbf a\\times\\mathbf b)\\cdot\\mathbf a$ es un triple producto con dos vectores repetidos, equivalente al determinante de una matriz con dos filas iguales, que vale 0. Como el resultado es 0, $\\mathbf a\\times\\mathbf b$ es ortogonal a $\\mathbf a$ (y por el mismo argumento, a $\\mathbf b$).'),
        el('p',{},el('b',{},'(c)'),' Verificación numérica en la card de producto cruz, con $\\mathbf a=(1,3,4)$, $\\mathbf b=(2,7,-5)$: $2019+9=2028=26\\times78$.')));

    mk(7,'Ecuaciones paramétricas y simétricas de la recta por (1,-2,4) con d=(3,1,-2).',
      el('p',{},'Ya resuelto en la card de rectas.'));

    mk(8,'Ecuación del plano por P(1,3,2), Q(3,-1,6), R(5,2,0).',
      el('p',{},'Ya resuelto en la card de planos: $6x+10y+7z=50$.'));

    mk(9,'¿La recta está contenida, es paralela, o corta al plano? (a) y (b).',
      el('p',{},'Ya resuelto en la card de planos: (a) paralela, (b) contenida.'));

    mk(10,'Punto de intersección de L:(2+t,1-t,3t) con 2x-y+z=7.',
      el('p',{},'Ya resuelto en la card de planos: $P=(8/3,\\ 1/3,\\ 2)$.'));

    mk(11,'Ángulo entre los planos x+y+z=1 y x-2y+3z=1.',
      el('p',{},'Ya resuelto en la card de planos: $\\theta\\approx72{,}0°$.'));

    mk(12,'Recta de intersección de los dos planos del ítem anterior.',
      el('p',{},'Ya resuelto en la card de planos: $X(t)=(1,0,0)+t(5,-2,-3)$.'));

    c7.append(el('p',{class:'fuente'},'Fuente: ítems 1 a 12, Listado 1, Cálculo Multivariable, Canvas 2026-2.'));
    sec.append(c7);
  }});
