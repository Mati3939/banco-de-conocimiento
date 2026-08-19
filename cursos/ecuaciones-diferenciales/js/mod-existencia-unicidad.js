registerModule({id:'existencia-unicidad',title:'Operadores lineales, existencia y unicidad',unidad:'I',semanas:[1],evaluacion:['control-1','certamen-1'],
  lead:'De dónde salen las ecuaciones diferenciales en la práctica, qué significa que un operador sea lineal, y bajo qué condiciones un problema de valor inicial garantiza una única solución.',
  build(sec){

    /* -------- Card 1: de dónde salen las EDO -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'De dónde salen las EDO'));
    c1.append(el('p',{},'La calendarización oficial de la Unidad I lista, como ejemplos de planteamiento, la segunda ley de Newton y la ley de enfriamiento de Newton. A esos se suma el ejemplo con el que arranca el apunte del curso: el interés compuesto continuo.'));
    Tabla(c1,{columnas:['Fenómeno','Ecuación'],filas:[
      ['Segunda ley de Newton ($F=ma$, con $F$ conocida)','$m\\dfrac{d^2x}{dt^2}=F\\Big(t,x,\\dfrac{dx}{dt}\\Big)$'],
      ['Ley de enfriamiento de Newton','$\\dfrac{dT}{dt}=k(T-T_{amb})$'],
      ['Interés compuesto continuo (apunte, Actividad inicial)','$\\dfrac{dS}{dt}=rS$']
    ]});
    c1.append(el('p',{class:'note'},'Los tres comparten el mismo patrón: una ley física o financiera describe cómo cambia una cantidad ($x$, $T$, $S$) en función de su propio estado — y esa relación ES la ecuación diferencial. La de Newton queda de segundo orden (aparece $x\'\'$); las otras dos, de primer orden. Las dos últimas se resuelven paso a paso más adelante (tema de variables separables).'));
    c1.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 1 ("Planteamiento de las ecuaciones diferenciales. Ejemplos: Segunda Ley de Newton, Ley de Enfriamiento de Newton, etc."); apunte "Variables separables", profesor Miguel Borbolla, sección 2 (Actividad inicial: crecimiento del dinero), Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: operadores diferenciales lineales -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Operadores diferenciales lineales'));
    c2.append(el('p',{},'Un operador diferencial toma una función y devuelve otra, combinando sus derivadas con coeficientes:'));
    c2.append(el('div',{class:'formula',html:'$$L[y]=a_n\\,y^{(n)}+a_{n-1}\\,y^{(n-1)}+\\cdots+a_1\\,y\'+a_0\\,y$$'}));
    c2.append(el('p',{},'Se dice que $L$ es ',el('b',{},'lineal'),' cuando respeta combinaciones lineales: $L[c_1y_1+c_2y_2]=c_1L[y_1]+c_2L[y_2]$. Para un operador de segundo orden $L[y]=a_2y\'\'+a_1y\'+a_0y$, la demostración sale de que la derivada de una combinación lineal es la combinación lineal de las derivadas:'));
    Pasos(c2,[
      {tex:'u=c_1y_1+c_2y_2\\ \\Rightarrow\\ L[u]=a_2u\'\'+a_1u\'+a_0u',nota:'Se nombra u a la combinación, y se aplica L por definición del operador.'},
      {tex:'u\'=c_1y_1\'+c_2y_2\',\\qquad u\'\'=c_1y_1\'\'+c_2y_2\'\'',nota:'La derivada de una suma es la suma de las derivadas (se aplica dos veces: para u′ y para u″).'},
      {tex:'L[u]=c_1(a_2y_1\'\'+a_1y_1\'+a_0y_1)+c_2(a_2y_2\'\'+a_1y_2\'+a_0y_2)',nota:'Sustituyendo u, u′, u″ y reagrupando: todos los términos con c₁ por un lado, todos los con c₂ por otro.'},
      {tex:'L[u]=c_1L[y_1]+c_2L[y_2]',nota:'Cada paréntesis es, por definición, L aplicado a y₁ y a y₂ respectivamente.'}
    ],{modId:'existencia-unicidad',titulo:'Linealidad del operador L[y]=a₂y′′+a₁y′+a₀y'});
    c2.append(el('p',{class:'note'},'La demostración no usa nada específico de $a_2,a_1,a_0$ salvo que no dependan de $y$: por eso el mismo argumento vale para cualquier orden $n$, y es la razón profunda por la que las soluciones de una EDO lineal homogénea se pueden combinar linealmente para formar nuevas soluciones.'));
    c2.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 1 ("Operadores diferenciales lineales"); la demostración de linealidad es elaboración propia (aplicación estándar de la linealidad de la derivada, no viene desarrollada en el material de Canvas).'));
    sec.append(c2);

    /* -------- Card 3: ecuación diferencial lineal -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Ecuación diferencial lineal'));
    c3.append(el('p',{},'Con el operador $L$ de la card anterior, una EDO lineal de orden $n$ es $L[y]=g(x)$, es decir:'));
    c3.append(el('div',{class:'formula',html:'$$a_n(x)\\,y^{(n)}+a_{n-1}(x)\\,y^{(n-1)}+\\cdots+a_1(x)\\,y\'+a_0(x)\\,y=g(x)$$'}));
    c3.append(el('p',{},'Lo que la distingue de una no lineal: $y$ y todas sus derivadas aparecen solo a la primera potencia, sin productos entre ellas ($y\\cdot y\'$, por ejemplo) ni dentro de funciones no lineales ($\\sin y$, $e^y$, $\\sqrt y$). Los coeficientes $a_i(x)$ pueden depender de $x$ libremente — eso no rompe la linealidad.'));
    Tabla(c3,{columnas:['Ecuación','¿Lineal?','Por qué'],filas:[
      ['$y\'\'+2xy\'-y=e^x$','Sí','Coeficientes dependen de x; y, y′, y′′ a la primera potencia'],
      ['$yy\'\'+y\'=0$','No','Producto y·y″'],
      ['$y\'+\\sin(y)=x$','No','y aparece dentro de sin(·)'],
      ['$y\'+P(x)y=Q(x)$','Sí','Es la forma general de EDO lineal de primer orden (próximo tema)']
    ]});
    c3.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 1 ("Ecuaciones diferenciales lineales"); ejemplos de la tabla, elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: teorema de existencia y unicidad -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Teorema de existencia y unicidad'));
    c4.append(el('p',{},'Para el PVI $y\'=f(x,y)$, $y(x_0)=y_0$: si $f$ y $\\dfrac{\\partial f}{\\partial y}$ son continuas en un rectángulo que contiene a $(x_0,y_0)$, entonces el PVI tiene ',el('b',{},'una única'),' solución en algún intervalo alrededor de $x_0$.'));
    c4.append(el('p',{},'La hipótesis sobre $\\partial f/\\partial y$ no es un detalle técnico: si falla, puede realmente perderse la unicidad. Ejemplo clásico: $y\'=y^{1/3}$, $y(0)=0$. Acá $f(x,y)=y^{1/3}$ es continua en todas partes, pero $\\dfrac{\\partial f}{\\partial y}=\\dfrac13y^{-2/3}$ no está definida en $y=0$ — justo el punto inicial. Y en efecto, salen dos soluciones distintas del mismo punto:'));
    c4.append(el('div',{class:'formula',html:'$$y_1(x)=0$$'}));
    c4.append(el('p',{},'y, para $x\\ge0$ (extendida impar para $x\\lt0$):'));
    c4.append(el('div',{class:'formula',html:'$$y_2(x)=\\left(\\dfrac{2x}{3}\\right)^{3/2}$$'}));
    const planoUnic=Plano(c4,{xMin:-3,xMax:3,yMin:-3,yMax:3,alto:280});
    planoUnic.dibujar(P=>{
      P.ejes();
      P.curva(()=>0,{color:'--s1',grosor:2.5});
      P.curva(x=> x>=0 ? Math.pow(2*x/3,1.5) : -Math.pow(-2*x/3,1.5),{color:'--s6',grosor:2.5});
      P.punto(0,0,{color:'--s4',etiqueta:'(0,0)'});
    });
    c4.append(el('p',{class:'note'},'Verificación de $y_2$ para $x\\ge0$: con $y_2=(2x/3)^{3/2}$, $y_2\'=\\dfrac32(2x/3)^{1/2}\\cdot\\dfrac23=(2x/3)^{1/2}$; y $y_2^{1/3}=\\big[(2x/3)^{3/2}\\big]^{1/3}=(2x/3)^{1/2}$ — coinciden, así que $y_2$ también resuelve $y\'=y^{1/3}$. Ambas curvas (azul $y_1=0$ y naranjo $y_2$) pasan por el origen y cumplen la misma ecuación: el PVI no tiene solución única precisamente donde el teorema avisó que no podía garantizarlo.'));
    c4.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 1 ("Existencia y unicidad de soluciones"); el enunciado es el teorema clásico de existencia y unicidad de la bibliografía del curso (Campbell, Zill), y el contraejemplo $y\'=y^{1/3}$ es el ejemplo estándar de la teoría de EDO para ilustrar la falla de unicidad — elaboración propia a partir de esa teoría, no viene desarrollado en un PDF de Canvas.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));

    const ej1=el('details',{},
      el('summary',{},'Determine el orden y si es lineal: y′′′ − 4xy′ + (sin x)·y = eˣ.'),
      el('div',{},el('p',{},'Orden 3. Es lineal: los coeficientes ($-4x$, $\\sin x$) dependen solo de $x$, y $y$, $y\'$, $y\'\'\'$ aparecen a la primera potencia, sin productos entre ellas.')));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Determine el orden y si es lineal: y·y′ + x = 0.'),
      el('div',{},el('p',{},'Orden 1. No es lineal: aparece el producto $y\\cdot y\'$ (dos "incógnitas" del operador multiplicadas entre sí).')));
    c5.append(ej2);

    const ej3=el('details',{},
      el('summary',{},'Verificar que y=e^{2x} es solución de y″ − 4y = 0.'),
      el('div',{},
        el('div',{class:'formula',html:'$$y=e^{2x}\\ \\Rightarrow\\ y\'=2e^{2x}\\ \\Rightarrow\\ y\'\'=4e^{2x}$$'}),
        el('div',{class:'formula',html:'$$y\'\'-4y=4e^{2x}-4e^{2x}=0\\ \\checkmark$$'})));
    c5.append(ej3);

    const ej4=el('details',{},
      el('summary',{},'Aplicar el teorema de existencia y unicidad a y′=x²+y², y(0)=1: ¿garantiza solución única?'),
      el('div',{},el('p',{},'$f(x,y)=x^2+y^2$ y $\\partial f/\\partial y=2y$ son continuas en todo el plano — en particular en un rectángulo alrededor de $(0,1)$. El teorema garantiza que existe una única solución en algún intervalo alrededor de $x=0$, aunque no diga cuál es esa solución ni qué tan grande es el intervalo (esta EDO en particular no tiene solución elemental en términos de funciones conocidas).')));
    c5.append(ej4);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicios de clasificación y verificación, elaboración propia siguiendo las definiciones y el teorema de las cards anteriores de este tema.'));
    sec.append(c5);
  }});
