registerModule({id:'que-es-una-edo',title:'Qué es una EDO',unidad:'I',semanas:[1],evaluacion:['control-1','certamen-1'],
  lead:'El planteamiento general: qué es una ecuación diferencial, qué significa que una función la resuelva, y cómo se ve — sin resolver nada todavía — la familia completa de soluciones.',
  build(sec){

    /* -------- Card 1: qué es una ecuación diferencial -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Qué es una ecuación diferencial'));
    c1.append(el('p',{},'Una ecuación diferencial ordinaria (EDO) de primer orden relaciona una variable $x$, una función desconocida $y$ y su derivada $y\'$. En general tiene la forma:'));
    c1.append(el('div',{class:'formula',html:'$$F(x,y,y\')=0$$'}));
    c1.append(el('p',{},'Cuando en esa ecuación es posible despejar $y\'$, toma la forma explícita:'));
    c1.append(el('div',{class:'formula',html:'$$y\'=f(x,y)$$'}));
    c1.append(el('p',{class:'note'},'La diferencia con una ecuación algebraica común: acá lo que no se conoce no es un número, sino una función completa — "resolver" la EDO es encontrar esa función $y(x)$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla — Introducción, Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: orden, grado y linealidad -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Orden, grado y linealidad'));
    c2.append(el('p',{},'Tres formas de clasificar una EDO: el ',el('b',{},'orden'),' es el de la derivada más alta que aparece; el ',el('b',{},'grado'),' es la potencia a la que está elevada esa derivada más alta (si la ecuación es polinomial en las derivadas); y es ',el('b',{},'lineal'),' si $y$ y todas sus derivadas aparecen solo a la primera potencia, sin productos entre ellas ni funciones no lineales de $y$.'));
    Tabla(c2,{columnas:['Ecuación','Orden','Grado','¿Lineal?'],filas:[
      ['$\\dfrac{dy}{dx}=\\dfrac{x}{y}$','1','1','No — equivale a $y\\,y\'=x$, hay un producto $y\\cdot y\'$'],
      ['$x^2y\'\'-xy\'+y=8x^3$','2','1','Sí'],
      ['$(y\'\')^3+2y\'-y=0$','2','3','No — la derivada más alta está al cubo'],
      ['$\\dfrac{dS}{dt}=rS$','1','1','Sí'],
      ['$y\'+P(x)y=Q(x)$','1','1','Sí (forma general de EDO lineal de primer orden)']
    ]});
    c2.append(el('p',{class:'note'},'Las filas 2 y 4 son ecuaciones reales del curso (Pauta de Control 1, semana 1 2026, y el apunte de variables separables); la fila 4 ($dS/dt=rS$) se resuelve en el tema "Variables separables", card "Actividad inicial: crecimiento del dinero". Las filas 1, 3 y 5 son elaboración propia, elegidas para mostrar los distintos casos de la tabla.'));
    c2.append(el('p',{class:'fuente'},'Fuente: definiciones estándar de orden/grado/linealidad (bibliografía del curso: Campbell, Zill); ecuaciones de las filas 2 y 4 tomadas de fuentes citadas en las cards de este tema.'));
    sec.append(c2);

    /* -------- Card 3: solución de una EDO -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Solución de una EDO'));
    c3.append(el('p',{},'Una función $y=y(x)$ es ',el('b',{},'solución'),' de una EDO en un intervalo si, al reemplazarla a ella y a sus derivadas en la ecuación, la igualdad se cumple para todo $x$ del intervalo. Verificar una candidata es, literalmente, sustituir y comprobar — como en esta pregunta real de Control 1:'));
    c3.append(el('p',{},'Control 1 de EDO, semana 1 2026: dada $x^2y\'\'-xy\'+y=8x^3$, encontrar el valor de $C$ tal que $y(x)=x\\ln x+Cx^3$ sea solución, y el mayor intervalo donde vale.'));
    Pasos(c3,[
      {tex:'y=x\\ln x+Cx^3',nota:'Candidata a verificar.'},
      {tex:'y\'=\\ln x+1+3Cx^2',nota:'Primera derivada de la candidata.'},
      {tex:'y\'\'=\\dfrac1x+6Cx,\\qquad x\\gt0',nota:'Segunda derivada — necesita x>0 porque aparece ln x.'},
      {tex:'x^2y\'\'=x^2\\Big(\\dfrac1x+6Cx\\Big)=x+6Cx^3',nota:'Se sustituye y se simplifica el primer término del lado izquierdo de la ecuación.'},
      {tex:'-xy\'=-x(\\ln x+1+3Cx^2)=-x\\ln x-x-3Cx^3',nota:'Segundo término del lado izquierdo.'},
      {tex:'x^2y\'\'-xy\'+y=4Cx^3',nota:'Sumando los tres términos —(x+6Cx³)+(−x ln x−x−3Cx³)+(x ln x+Cx³), con el tercero siendo y misma sin derivar—: se cancela x con −x, y −x·ln x con +x·ln x; quedan solo los términos en Cx³, que se agrupan como (6C−3C+C)x³=4Cx³.'},
      {tex:'4Cx^3=8x^3\\ \\Rightarrow\\ C=2',nota:'Para que y sea solución, el resultado debe igualar el lado derecho de la EDO; como x³≠0 en x>0, se despeja C.'},
      {tex:'y(x)=x\\ln x+2x^3,\\qquad x\\in\\,]0,+\\infty[',nota:'La solución con su intervalo de validez: el mayor donde ln x está definido.'}
    ],{modId:'que-es-una-edo',titulo:'Verificar y hallar C: x²y′′−xy′+y=8x³, con y=x ln x+Cx³'});
    c3.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 de Ecuaciones Diferenciales, semana 1, 2026 (Primer Semestre 2026), pregunta 1, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: solución general y particular -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Solución general y particular'));
    c4.append(el('p',{},'La solución de una EDO de primer orden trae, en general, una constante arbitraria $C$: no es una única función sino una ',el('b',{},'familia'),' de curvas, una por cada valor de $C$ — la ',el('b',{},'solución general'),'. Una condición $y(x_0)=y_0$ elige, de esa familia, la curva que pasa exactamente por ese punto: la ',el('b',{},'solución particular'),'.'));
    c4.append(el('p',{},'Adelanto del tema de variables separables: la EDO $(x^2+4)y\'=xy$ (Ejemplo 1 del apunte, que se resuelve paso a paso más adelante) tiene solución general $y=C\\sqrt{x^2+4}$. Moveé $C$ y mirá cómo cada valor traza una curva distinta de la misma familia:'));
    const planoFam=Plano(c4,{xMin:-6,xMax:6,yMin:-14,yMax:14,alto:300});
    let Cfam=1;
    planoFam.dibujar(P=>{
      P.ejes();
      [-2,-1.3,-0.6,0.6,1.3,2].forEach(k=>{ if(Math.abs(k-Cfam)>0.05) P.curva(x=>k*Math.sqrt(x*x+4),{color:'--muted',grosor:1}); });
      P.curva(x=>Cfam*Math.sqrt(x*x+4),{color:'--s1',grosor:2.5});
      P.punto(0,2*Cfam,{color:'--s4',etiqueta:'C='+fmt(Cfam)});
    });
    c4.append(el('div',{class:'controls'},
      el('label',{},'C:'),
      el('input',{type:'range',min:'-2',max:'2',step:'0.1',value:String(Cfam),oninput:e=>{ Cfam=parseFloat(e.target.value); planoFam.redibujar(); }})
    ));
    c4.append(el('p',{class:'note'},'Todas las curvas grises son soluciones de la misma EDO — difieren solo en $C$. La azul es la que corresponde al valor de $C$ del control. Si además pidieran, por ejemplo, $y(0)=3$, eso fijaría $C=1{,}5$ (porque en $x=0$ la fórmula da $y=2C$) y de toda la familia quedaría una sola curva: la solución particular.'));
    c4.append(el('p',{class:'fuente'},'Fuente: familia de soluciones del Ejemplo 1 del apunte "Variables separables", profesor Miguel Borbolla (resuelto paso a paso en el tema de variables separables); la idea de familia + condición inicial ilustrada acá es elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: problema de valor inicial -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Problema de valor inicial'));
    c5.append(el('p',{},'Un ',el('b',{},'problema de valor inicial'),' (PVI) es una EDO más una condición $y(x_0)=y_0$ que fija un punto por el que debe pasar la solución:'));
    c5.append(el('div',{class:'formula',html:'$$y\'=f(x,y),\\qquad y(x_0)=y_0$$'}));
    c5.append(el('p',{},'Ejemplo real, Control 1 semana 1 2026: $y\'=\\dfrac{x(1+y)}{1+x^2}$, $y(0)=e-1$. La pauta entrega $y=e\\sqrt{1+x^2}-1$ (se deriva con la técnica de variables separables, más adelante en esta biblioteca); acá se verifica que en efecto cumple el PVI. Derivando la candidata:'));
    c5.append(el('div',{class:'formula',html:'$$y\'=e\\cdot\\dfrac{x}{\\sqrt{1+x^2}}$$'}));
    c5.append(el('p',{},'Y evaluando el lado derecho de la EDO con la misma candidata (usando $1+y=e\\sqrt{1+x^2}$):'));
    c5.append(el('div',{class:'formula',html:'$$\\dfrac{x(1+y)}{1+x^2}=\\dfrac{ex}{\\sqrt{1+x^2}}$$'}));
    c5.append(el('p',{class:'note'},'Ambos lados dan lo mismo: la solución cumple la ecuación. Y la condición inicial: $y(0)=e\\sqrt{1+0^2}-1=e-1$, exactamente lo pedido. Las dos verificaciones —la ecuación y la condición inicial— son necesarias: una función que solo cumple la ecuación resuelve la EDO, pero no necesariamente ',el('i',{},'este'),' PVI.'));
    c5.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 de Ecuaciones Diferenciales, semana 1, 2026 (Primer Semestre 2026), pregunta 2, Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: campo de direcciones -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Campo de direcciones'));
    c6.append(el('p',{},'Otra forma de visualizar $y\'=f(x,y)$ sin resolver nada: en cada punto $(x,y)$ del plano se dibuja un segmento con la pendiente que dicta $f(x,y)$ ahí. Cualquier curva solución tiene que ser, en todo punto por el que pasa, tangente a la rayita que le toca — por eso las curvas solución "siguen" el campo.'));
    const planoCampo=Plano(c6,{xMin:-6,xMax:6,yMin:-10,yMax:10,alto:320});
    planoCampo.dibujar(P=>{
      P.ejes();
      P.campo((x,y)=>x*y/(x*x+4),{nx:18,ny:14});
      [-2,-1,1,2].forEach(k=>P.curva(x=>k*Math.sqrt(x*x+4),{color:'--s1',grosor:2}));
      P.curva(()=>0,{color:'--s6',grosor:2});
    });
    c6.append(el('p',{class:'note'},'El campo (rayitas) es el de $y\'=\\dfrac{xy}{x^2+4}$ — la misma EDO de la card "Solución general y particular". Encima, cuatro curvas de la familia $y=C\\sqrt{x^2+4}$ (azul) y la solución trivial $y=0$ (naranjo, $C=0$): las cinco quedan tangentes a las rayitas en cada punto por el que pasan, que es justamente lo que significa ser solución de $y\'=f(x,y)$.'));
    c6.append(el('p',{class:'fuente'},'Fuente: EDO y familia de soluciones del Ejemplo 1 del apunte "Variables separables", profesor Miguel Borbolla; el campo de direcciones como herramienta de visualización es elaboración propia (no aparece dibujado en el apunte, que solo entrega la fórmula).'));
    sec.append(c6);
  }});
