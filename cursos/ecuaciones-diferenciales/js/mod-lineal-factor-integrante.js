registerModule({id:'lineal-factor-integrante',title:'Lineal de primer orden y factor integrante',unidad:'I',semanas:[2],evaluacion:['control-1','certamen-1'],
  lead:'El método que funciona para CUALQUIER EDO lineal de primer orden, sea o no separable: multiplicar por un factor que convierte el lado izquierdo en la derivada de un producto.',
  build(sec){

    /* -------- Card 1: forma estándar -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Forma estándar'));
    c1.append(el('p',{},'Toda EDO lineal de primer orden se puede llevar a la forma estándar, con coeficiente 1 en $y\'$:'));
    c1.append(el('div',{class:'formula',html:'$$y\'+P(x)\\,y=Q(x)$$'}));
    c1.append(el('p',{},'Reconocerla: si la ecuación viene como $a(x)y\'+b(x)y=c(x)$, hay que ',el('b',{},'dividir por $a(x)$'),' antes de leer $P(x)=b(x)/a(x)$ y $Q(x)=c(x)/a(x)$ — es el error más común del método. Ejemplo (se resuelve completo en la card "Ejemplo resuelto de una pauta de Control 1 real"): $(1+t)\\dfrac{dy}{dt}+2y=6t^2$ se lleva a forma estándar dividiendo por $(1+t)$:'));
    c1.append(el('div',{class:'formula',html:'$$\\dfrac{dy}{dt}+\\dfrac{2}{1+t}\\,y=\\dfrac{6t^2}{1+t},\\qquad t\\ne-1$$'}));
    c1.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 2 ("Lineales con factor integrante"); ecuación de ejemplo tomada de la Pauta Control 1 EDO (PAUTA 02-2024), pregunta 1 — desarrollada completa en la card "Ejemplo resuelto" de este tema.'));
    sec.append(c1);

    /* -------- Card 2: de dónde sale el factor integrante -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'De dónde sale el factor integrante'));
    c2.append(el('p',{},'La idea: multiplicar toda la ecuación por una función $\\mu(x)$ elegida a propósito, de modo que el lado izquierdo se vuelva la derivada de un producto $(\\mu y)\'$. Se busca esa $\\mu$:'));
    Pasos(c2,[
      {tex:'\\mu(x)\\,y\'+\\mu(x)P(x)\\,y=\\mu(x)Q(x)',nota:'Se multiplica la forma estándar por μ(x), todavía desconocida.'},
      {tex:'\\dfrac{d}{dx}\\big[\\mu(x)y\\big]=\\mu\'(x)y+\\mu(x)y\'',nota:'Por la regla del producto, así se ve la derivada de μ·y — el objetivo es que el lado izquierdo de arriba sea justamente esto.'},
      {tex:'\\mu\'(x)y+\\mu(x)y\'=\\mu(x)y\'+\\mu(x)P(x)y\\ \\Longrightarrow\\ \\mu\'(x)=\\mu(x)P(x)',nota:'Igualando ambas expresiones y cancelando el término μy′ que aparece en las dos, queda una condición sobre μ.'},
      {tex:'\\dfrac{d\\mu}{\\mu}=P(x)\\,dx\\ \\Longrightarrow\\ \\ln|\\mu|=\\int P(x)\\,dx',nota:'La condición sobre μ es, a su vez, una EDO separable — se resuelve con la misma técnica del tema "Variables separables".'},
      {tex:'\\mu(x)=e^{\\int P(x)\\,dx}',nota:'Despejando μ: el factor integrante. Cualquier antiderivada de P sirve, no hace falta constante de integración acá.'}
    ],{modId:'lineal-factor-integrante',titulo:'De dónde sale μ(x)=e^(∫P dx)'});
    c2.append(el('p',{class:'note'},'Lo elegante: una vez encontrado $\\mu$, el lado izquierdo de la ecuación multiplicada YA es $(\\mu y)\'$ — no hay que "reconocerlo" a ojo, es una consecuencia directa de cómo se construyó $\\mu$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: derivación estándar del factor integrante (bibliografía del curso: Campbell, Zill; también en la nota del vault "EDO lineal de primer orden y factor integrante", material de generación anterior) — elaboración propia paso a paso, ya que no viene desarrollada en un PDF de Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: la receta -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'La receta'));
    c3.append(el('ol',{},
      el('li',{html:'Llevar la ecuación a forma estándar $y\'+P(x)y=Q(x)$ (dividir por el coeficiente de y′, si hace falta).'}),
      el('li',{html:'Calcular $\\mu(x)=e^{\\int P(x)\\,dx}$.'}),
      el('li',{html:'Multiplicar toda la ecuación por μ(x) y reconocer el lado izquierdo como $\\dfrac{d}{dx}[\\mu(x)y]$.'}),
      el('li',{html:'Integrar ambos lados respecto de x.'}),
      el('li',{html:'Despejar y: $y=\\dfrac{1}{\\mu(x)}\\Big[\\displaystyle\\int \\mu(x)Q(x)\\,dx+C\\Big]$.'}),
      el('li',{html:'Si hay condición inicial, imponerla al final para hallar C.'})
    ));
    c3.append(el('p',{class:'fuente'},'Fuente: síntesis de la derivación de la card "De dónde sale el factor integrante" — elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: ejemplo resuelto de una pauta real -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejemplo resuelto de una pauta de Control 1 real'));
    c4.append(el('p',{},'Pauta Control 1 EDO (PAUTA 02-2024), pregunta 1: resolver el PVI $(1+t)\\dfrac{dy}{dt}+2y=6t^2$, $y(0)=5$.'));
    Pasos(c4,[
      {tex:'\\dfrac{dy}{dt}+\\dfrac{2}{1+t}\\,y=\\dfrac{6t^2}{1+t},\\qquad t\\ne-1',nota:'Forma estándar: se divide toda la ecuación por (1+t). Ya es una EDO lineal de primer orden.'},
      {tex:'P(t)=\\dfrac{2}{1+t}\\ \\Longrightarrow\\ \\mu(t)=e^{\\int\\frac{2}{1+t}dt}=e^{2\\ln|1+t|}=(1+t)^2',nota:'Factor integrante: se integra P y se exponencia.'},
      {tex:'\\dfrac{d}{dt}\\big[(1+t)^2y\\big]=(1+t)^2\\cdot\\dfrac{6t^2}{1+t}=6t^2(1+t)',nota:'Multiplicando la forma estándar por μ(t): el lado izquierdo ya es la derivada de (1+t)²y.'},
      {tex:'(1+t)^2y=\\displaystyle\\int 6t^2(1+t)\\,dt=\\int(6t^2+6t^3)\\,dt=2t^3+\\tfrac32t^4+C',nota:'Integrando ambos lados.'},
      {tex:'y=\\dfrac{2t^3+\\frac32t^4+C}{(1+t)^2}',nota:'Despejando y: solución general.'},
      {tex:'y(0)=5\\ \\Longrightarrow\\ C=5',nota:'Imponiendo la condición inicial.'},
      {tex:'y(t)=\\dfrac{2t^3+\\frac32t^4+5}{(1+t)^2},\\qquad t\\in(-1,\\infty)',nota:'Solución particular (única) del PVI, con su intervalo de validez.'}
    ],{modId:'lineal-factor-integrante',titulo:'PVI real: (1+t)y′+2y=6t², y(0)=5'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación (derivando la forma implícita): '),'de $(1+t)^2y=2t^3+\\tfrac32t^4+C$, derivando ambos lados respecto de t con la regla del producto: $2(1+t)y+(1+t)^2y\'=6t^2+6t^3=6t^2(1+t)$. Dividiendo toda la igualdad por $(1+t)$: $2y+(1+t)y\'=6t^2$, es decir $(1+t)y\'+2y=6t^2$ — exactamente la EDO original. Y $y(0)=\\dfrac{0+0+5}{1}=5$, la condición pedida.'));
    c4.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 de Ecuaciones Diferenciales (PAUTA 02-2024), pregunta 1, Canvas 2026-2 — mismo ejemplo documentado en la nota del vault "EDO lineal de primer orden y factor integrante" (material de generación anterior).'));
    sec.append(c4);

    /* -------- Card 5: PVI con factor integrante -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'PVI con factor integrante: imponer la condición al final'));
    c5.append(el('p',{},'Ejercicio propio, siguiendo la misma receta, para practicar con un caso donde $P(x)$ es más simple: resolver $y\'-\\dfrac2xy=x^3$, $y(1)=2$ (con $x\\gt0$).'));
    Pasos(c5,[
      {tex:'P(x)=-\\dfrac2x\\ \\Longrightarrow\\ \\mu(x)=e^{\\int-\\frac2x dx}=e^{-2\\ln x}=x^{-2}',nota:'Ya está en forma estándar; se calcula μ directamente.'},
      {tex:'\\dfrac{d}{dx}\\Big[\\dfrac{y}{x^2}\\Big]=\\dfrac{x^3}{x^2}=x',nota:'Multiplicando por μ=1/x²: el lado izquierdo es la derivada de y/x².'},
      {tex:'\\dfrac{y}{x^2}=\\displaystyle\\int x\\,dx=\\dfrac{x^2}{2}+C',nota:'Integrando ambos lados.'},
      {tex:'y=\\dfrac{x^4}{2}+Cx^2',nota:'Despejando y: solución general.'},
      {tex:'y(1)=2\\ \\Longrightarrow\\ 2=\\dfrac12+C\\ \\Longrightarrow\\ C=\\dfrac32',nota:'Recién ahora, con la solución general ya despejada, se impone la condición inicial.'},
      {tex:'y=\\dfrac{x^4}{2}+\\dfrac32x^2',nota:'Solución particular del PVI.'}
    ],{modId:'lineal-factor-integrante',titulo:'PVI propio: y′−(2/x)y=x³, y(1)=2'});
    c5.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'con $y=\\tfrac{x^4}2+\\tfrac32x^2$, $y\'=2x^3+3x$. Entonces $y\'-\\dfrac2xy=2x^3+3x-\\dfrac2x\\Big(\\dfrac{x^4}2+\\dfrac32x^2\\Big)=2x^3+3x-(x^3+3x)=x^3$ — coincide con el lado derecho de la EDO. Y $y(1)=\\tfrac12+\\tfrac32=2$, la condición pedida.'));
    c5.append(el('p',{class:'fuente'},'Fuente: ejercicio de elaboración propia, siguiendo el procedimiento de la card "La receta" (no proviene de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));

    const mk=(resumen,solHtml)=>{ c6.append(el('details',{},el('summary',{},resumen),el('div',{},solHtml))); };

    mk('y′ + 3y = e^(−3x), y(0)=2.',
      el('div',{},
        el('div',{class:'formula',html:'$$\\mu(x)=e^{3x}\\ \\Longrightarrow\\ \\dfrac{d}{dx}[e^{3x}y]=e^{3x}e^{-3x}=1\\ \\Longrightarrow\\ e^{3x}y=x+C$$'}),
        el('div',{class:'formula',html:'$$y=(x+C)e^{-3x},\\quad y(0)=2\\Rightarrow C=2\\ \\Longrightarrow\\ y=(x+2)e^{-3x}$$'}),
        el('p',{class:'note'},'Verificación: $y\'=e^{-3x}(1-3x-6)=e^{-3x}(-3x-5)$; y $3y=3(x+2)e^{-3x}=e^{-3x}(3x+6)$, así que $y\'+3y=e^{-3x}(-3x-5+3x+6)=e^{-3x}$ ✓.')));

    mk('xy′ − y = x², x>0.',
      el('div',{},
        el('div',{class:'formula',html:'$$y\'-\\dfrac1xy=x\\ \\Longrightarrow\\ \\mu(x)=e^{-\\ln x}=\\dfrac1x\\ \\Longrightarrow\\ \\dfrac{d}{dx}\\Big[\\dfrac yx\\Big]=1$$'}),
        el('div',{class:'formula',html:'$$\\dfrac yx=x+C\\ \\Longrightarrow\\ y=x^2+Cx$$'}),
        el('p',{class:'note'},'Verificación: $y\'=2x+C$; $xy\'-y=x(2x+C)-(x^2+Cx)=2x^2+Cx-x^2-Cx=x^2$ ✓ (coincide con el lado derecho de la ecuación original xy′−y=x²).')));

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicios de elaboración propia, siguiendo la receta de este tema (no provienen de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c6);
  }});
