/* contenidoOficial original (índice a cubrir):
   - Unidad III: transformada de Laplace
   - Definición de la transformada de Laplace
   - La transformada de Laplace como transformación lineal */
registerModule({id:'laplace-definicion',title:'Definición y linealidad de la transformada',unidad:'III',semanas:[11],evaluacion:['certamen-2'],
  lead:'La transformada de Laplace traduce una función de t en una función de s mediante una integral impropia; al ser lineal, se puede transformar (o antitransformar) término a término.',
  build(sec){

    /* -------- Card 1: la integral que define la transformada -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'La integral que define la transformada'));
    c1.append(el('p',{},'La ',el('b',{},'transformada de Laplace'),' de una función $f(t)$ definida para $t\\geq0$ es la función $F(s)$ que resulta de esta integral impropia:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{f(t)\\} = F(s) = \\int_0^\\infty e^{-st}f(t)\\,dt$$'}));
    c1.append(el('p',{},'La variable $t$ desaparece al integrar: lo que queda es una función de $s$. La convención de notación es esa misma — minúscula para la función original, mayúscula para su transformada: $f(t)\\to F(s)$, $y(t)\\to Y(s)$, etc.'));
    c1.append(el('p',{},'Por tratarse de una integral impropia, "calcular una transformada" siempre significa evaluar un límite. El caso más simple, $f(t)=1$:'));
    Pasos(c1,[
      {tex:'\\mathcal{L}\\{1\\} = \\int_0^\\infty e^{-st}\\cdot1\\,dt',nota:'Se aplica la definición con f(t)=1.'},
      {tex:'= \\lim_{T\\to\\infty}\\left[-\\dfrac{1}{s}e^{-st}\\right]_0^{T}',nota:'La integral impropia se calcula como el límite de una integral definida en [0,T].'},
      {tex:'= \\lim_{T\\to\\infty}\\left(-\\dfrac1s e^{-sT}+\\dfrac1s\\right)',nota:'Se evalúa la primitiva en T y en 0.'},
      {tex:'= \\dfrac1s',nota:'Para s positivo, e^{-sT}\\to0 cuando T\\to\\infty: el límite existe y la integral converge.'}
    ],{modId:'laplace-definicion',titulo:'Caso más simple: L{1}=1/s'});
    c1.append(el('p',{class:'note'},'El resultado solo vale para $s\\gt0$: si $s\\leq0$, $e^{-st}$ no decae y la integral diverge. Esa condición sobre $s$ —el ',el('b',{},'dominio de convergencia'),'— acompaña a toda transformada; se retoma en la próxima card.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Definición y transformadas básicas"; nota "Transformada de Laplace" del vault. El cálculo paso a paso de $\\mathcal{L}\\{1\\}$ es elaboración propia, verificado arriba.'));
    sec.append(c1);

    /* -------- Card 2: condiciones de existencia -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Condiciones de existencia'));
    c2.append(el('p',{},'No toda función tiene transformada de Laplace: la integral que la define puede simplemente no converger. Dos condiciones —una sobre las discontinuidades, otra sobre el crecimiento— garantizan que sí converja:'));
    c2.append(el('ul',{},
      el('li',{},el('b',{},'Continua por tramos en $[0,\\infty)$: '),'en cualquier intervalo finito, $f$ tiene a lo más un número finito de discontinuidades, y en cada una existen los límites laterales (son saltos, no asíntotas).'),
      el('li',{},el('b',{},'De orden exponencial $c$: '),el('span',{html:'existen constantes $M\\gt0$, $c$ y $T\\geq0$ tales que $|f(t)|\\leq M e^{ct}$ para todo $t\\geq T$ — la función no crece más rápido que alguna exponencial.'}))
    ));
    c2.append(el('div',{class:'formula',html:'$$f\\text{ continua por tramos en }[0,\\infty)\\ \\text{y de orden exponencial }c\\ \\Longrightarrow\\ \\mathcal{L}\\{f\\}(s)\\text{ existe para }s\\gt c$$'}));
    c2.append(el('p',{class:'note'},'Es una condición ',el('b',{},'suficiente'),', no necesaria: hay funciones con discontinuidades peores (no acotadas) que igual tienen transformada. Pero para toda función del curso —polinomios, exponenciales, senos y cosenos, y combinaciones de esas— alcanza con este criterio, y ya se sabe de entrada para qué $s$ la transformada existe.'));
    c2.append(el('p',{},el('b',{},'Contraejemplo: '),'$f(t)=e^{t^2}$ no es de orden exponencial para ningún $c$, porque $e^{t^2}/e^{ct}=e^{t^2-ct}\\to\\infty$ cuando $t\\to\\infty$ (el cuadrado siempre termina ganándole a cualquier $c$ lineal). En efecto, $\\int_0^\\infty e^{-st}e^{t^2}dt$ diverge para todo valor de $s$: esta función no tiene transformada de Laplace.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Definición y transformadas básicas" — trae la idea informal ("no crece más rápido que una exponencial"); el enunciado formal (continuidad por tramos + orden exponencial) y el contraejemplo $e^{t^2}$ son desarrollo estándar de la teoría de la transformada de Laplace (tratamiento clásico de Campbell/Zill para las condiciones de existencia).'));
    sec.append(c2);

    /* -------- Card 3: dos casos más, desde la definición -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Dos casos más, calculados desde la definición'));
    c3.append(el('p',{},'Con la misma integral se calculan las transformadas que después se usan como tabla (tema "Fórmulas elementales y propiedades", más adelante). Acá se derivan dos: $\\mathcal{L}\\{e^{at}\\}$, directo, y $\\mathcal{L}\\{t\\}$, que necesita integrar por partes.'));
    Pasos(c3,[
      {tex:'\\mathcal{L}\\{e^{at}\\} = \\int_0^\\infty e^{-st}e^{at}\\,dt = \\int_0^\\infty e^{-(s-a)t}\\,dt',nota:'Se agrupan los dos exponentes: e^{-st}e^{at}=e^{-(s-a)t}.'},
      {tex:'= \\lim_{T\\to\\infty}\\left[-\\dfrac{1}{s-a}e^{-(s-a)t}\\right]_0^{T} = \\dfrac{1}{s-a}',nota:'Misma integral que L{1}, con (s-a) en vez de s. Converge para s\\gt a.'}
    ],{modId:'laplace-definicion',titulo:'L{e^{at}}=1/(s−a), para s>a'});
    Pasos(c3,[
      {tex:'\\mathcal{L}\\{t\\} = \\int_0^\\infty t\\,e^{-st}\\,dt',nota:'Se aplica la definición con f(t)=t.'},
      {tex:'u=t,\\ dv=e^{-st}dt\\ \\Rightarrow\\ du=dt,\\ v=-\\dfrac1s e^{-st}',nota:'Integración por partes: no hay forma de resolver ∫t·e^{-st}dt directo, así que se baja el grado de t derivándolo.'},
      {tex:'= \\left[-\\dfrac{t}{s}e^{-st}\\right]_0^\\infty + \\dfrac1s\\int_0^\\infty e^{-st}\\,dt',nota:'Fórmula de partes: ∫u\\,dv=uv-∫v\\,du.'},
      {tex:'= 0 + \\dfrac1s\\cdot\\dfrac1s = \\dfrac1{s^2}',nota:'El término de borde se anula en los dos extremos (en t=0 por el factor t; cuando t\\to\\infty, la exponencial le gana al t). Lo que queda es (1/s) veces la integral de L{1}, ya calculada en la card "La integral que define la transformada".'}
    ],{modId:'laplace-definicion',titulo:'L{t}=1/s²'});
    c3.append(el('p',{class:'note'},'El mismo truco de integrar por partes, repetido, da $\\mathcal{L}\\{t^n\\}=\\dfrac{n!}{s^{n+1}}$ para cualquier entero $n\\geq0$ (con $n=0$ se recupera $\\mathcal{L}\\{1\\}=1/s$, y con $n=1$, el resultado de arriba). La tabla completa de transformadas elementales, con estos y otros casos, se arma en el tema "Fórmulas elementales y propiedades".'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tabla de "Definición y transformadas básicas" — trae el resultado $\\mathcal{L}\\{e^{at}\\}=1/(s-a)$ sin la derivación; la derivación paso a paso de $\\mathcal{L}\\{e^{at}\\}$ y de $\\mathcal{L}\\{t\\}$ (no incluida en v3 ni en las notas del vault) es elaboración propia, verificada arriba.'));
    sec.append(c3);

    /* -------- Card 4: linealidad -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'La transformada es lineal'));
    c4.append(el('p',{},'Para dos funciones $f,g$ con transformada, y constantes $a,b$:'));
    c4.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{a\\,f(t)+b\\,g(t)\\} = a\\,F(s)+b\\,G(s)$$'}));
    c4.append(el('p',{},'La demostración es inmediata porque la integral misma es lineal:'));
    Pasos(c4,[
      {tex:'\\mathcal{L}\\{af+bg\\} = \\int_0^\\infty e^{-st}\\big(a f(t)+b g(t)\\big)\\,dt',nota:'Se aplica la definición al integrando af(t)+bg(t).'},
      {tex:'= a\\int_0^\\infty e^{-st}f(t)\\,dt + b\\int_0^\\infty e^{-st}g(t)\\,dt',nota:'La integral de una suma es la suma de las integrales, y las constantes salen fuera — propiedad de linealidad de la integral, nada específico de Laplace.'},
      {tex:'= a\\,F(s) + b\\,G(s)',nota:'Cada integral es, por definición, la transformada de f y de g respectivamente.'}
    ],{modId:'laplace-definicion',titulo:'Linealidad: L{af+bg}=aF(s)+bG(s)'});
    c4.append(el('p',{},'La linealidad es lo que permite transformar (y, más adelante, antitransformar) término a término, sin volver a integrar cada vez. Ejemplo, usando $\\mathcal{L}\\{1\\}=1/s$ y $\\mathcal{L}\\{e^{at}\\}=1/(s-a)$ de las cards anteriores:'));
    c4.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{3-5e^{2t}\\} = 3\\,\\mathcal{L}\\{1\\} - 5\\,\\mathcal{L}\\{e^{2t}\\} = \\dfrac3s - \\dfrac{5}{s-2}\\qquad(s\\gt2)$$'}));
    c4.append(el('p',{class:'note'},'El dominio de convergencia final es la intersección de los dominios de cada término: $\\mathcal{L}\\{1\\}$ pide $s\\gt0$ y $\\mathcal{L}\\{e^{2t}\\}$ pide $s\\gt2$, así que la combinación completa solo converge para $s\\gt2$ — la condición más restrictiva de las dos manda.'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), fila "linealidad" de la tabla en "Definición y transformadas básicas"; la demostración desde la definición y el ejemplo son elaboración propia, verificados arriba.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Los dos usan solo linealidad y los resultados de $\\mathcal{L}\\{1\\}$ y $\\mathcal{L}\\{t\\}$ o $\\mathcal{L}\\{e^{at}\\}$ ya calculados en este tema — sin volver a integrar.'));

    c5.append(el('details',{},
      el('summary',{},'Calcular $\\mathcal{L}\\{4t-7\\}$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathcal{L}\\{4t-7\\} = 4\\,\\mathcal{L}\\{t\\} - 7\\,\\mathcal{L}\\{1\\} = \\dfrac{4}{s^2}-\\dfrac{7}{s} = \\dfrac{4-7s}{s^2}\\qquad(s\\gt0)$$'}),
        el('p',{class:'note'},'Linealidad directa: se transforma cada término por separado y se suma.'))));

    c5.append(el('details',{},
      el('summary',{},'Calcular $\\mathcal{L}\\{2e^{3t}+5\\}$ e indicar el dominio de convergencia.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\mathcal{L}\\{2e^{3t}+5\\} = \\dfrac{2}{s-3}+\\dfrac5s\\qquad(s\\gt3)$$'}),
        el('p',{class:'note'},'$\\mathcal{L}\\{e^{3t}\\}=1/(s-3)$ pide $s\\gt3$; $\\mathcal{L}\\{1\\}$ pide $s\\gt0$. Manda la más restrictiva: $s\\gt3$.'))));

    c5.append(el('p',{class:'fuente'},'Fuente: elaboración propia, aplicando la linealidad y los casos base de las cards "La integral que define la transformada" y "Dos casos más, calculados desde la definición" de este mismo tema.'));
    sec.append(c5);
  }});
