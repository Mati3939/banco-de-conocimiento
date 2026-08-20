/* contenidoOficial original (índice a cubrir):
   - La transformada de Laplace como solución de las ecuaciones diferenciales
   - Teorema de convolución
   - Aplicaciones
   - Función escalón (Heaviside) */
registerModule({id:'laplace-edo',title:'Resolución de EDO, convolución y Heaviside',unidad:'III',semanas:[13],evaluacion:['control-4'],
  lead:'Transformar la EDO completa, despejar y antitransformar resuelve un PVI de una sola pasada; la función escalón y la convolución extienden el método a forzamientos que se encienden por tramos.',
  build(sec){

    /* -------- Card 1: el método en tres pasos, con un PVI completo -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'El método en tres pasos'));
    c1.append(el('p',{},'Resolver un PVI con Laplace tiene siempre la misma estructura, usando las transformadas de $y\'$ y $y\'\'$ del tema "Fórmulas elementales y propiedades" (que ya incorporan las condiciones iniciales):'));
    c1.append(el('ol',{},
      el('li',{},el('b',{},'Transformar '),'toda la ecuación, término a término (linealidad).'),
      el('li',{},el('b',{},'Despejar '),'$Y(s)$ algebraicamente — queda un problema de álgebra, no de cálculo.'),
      el('li',{},el('b',{},'Antitransformar '),'con $\\mathcal{L}^{-1}$ (fracciones parciales y completar cuadrados) para volver a $y(t)$.')
    ));
    c1.append(el('p',{class:'note'},'La ventaja frente a coeficientes indeterminados o variación de parámetros (unidades anteriores): no hace falta calcular $y_h$ y $y_p$ por separado ni resolver un sistema para las constantes $c_1,c_2$ al final — las condiciones iniciales entran ',el('b',{},'desde el primer paso'),', al transformar $y\'$ e $y\'\'$.'));
    c1.append(el('p',{},'Ejemplo completo: resolver $y\'\'+y\'-6y=e^t\\cos(2t)$, $y(0)=1$, $y\'(0)=\\tfrac18$.'));
    Pasos(c1,[
      {tex:'\\big(s^2Y-s-\\tfrac18\\big)+\\big(sY-1\\big)-6Y = \\mathcal{L}\\{e^t\\cos2t\\}',nota:'Se transforma cada término: L{y′′} y L{y′} traen las condiciones iniciales (tema "Fórmulas elementales y propiedades").'},
      {tex:'\\mathcal{L}\\{e^t\\cos2t\\} = \\dfrac{s-1}{(s-1)^2+4}',nota:'Primer teorema de traslación (a=1) sobre L{cos2t}=s/(s²+4) — mismo tema.'},
      {tex:'(s^2+s-6)\\,Y = s+\\dfrac98+\\dfrac{s-1}{(s-1)^2+4}',nota:'Se agrupan los términos en Y de un lado y el resto —incluidas las condiciones iniciales— del otro, usando los dos pasos anteriores.'},
      {tex:'s^2+s-6=(s+3)(s-2)',nota:'El polinomio característico factoriza con las mismas raíces λ=−3,2 que daría el método de coeficientes indeterminados.'},
      {tex:'Y(s) = \\dfrac{83/200}{s+3}+\\dfrac{133/200}{s-2} + Y_2(s)',nota:'Fracciones parciales de la parte con raíces reales; se deja Y₂(s) para la parte con el factor cuadrático (s−1)²+4, en el siguiente paso.'},
      {tex:'Y_2(s) = -\\dfrac{2}{25}\\cdot\\dfrac{s-1}{(s-1)^2+4} + \\dfrac{3}{50}\\cdot\\dfrac{2}{(s-1)^2+4}',nota:'Fracciones parciales de la parte cuadrática, completando el cuadrado — técnica del tema "Fórmulas elementales y propiedades".'},
      {tex:'y(t) = \\dfrac{83}{200}e^{-3t}+\\dfrac{133}{200}e^{2t} + y_2(t)',nota:'Antitransformando la parte racional: 1/(s−a)→e^{at}.'},
      {tex:'y_2(t) = -\\dfrac{2}{25}e^t\\cos2t + \\dfrac{3}{50}e^t\\sin2t',nota:'Antitransformando Y₂(s): primer teorema de traslación sobre cos2t y sen2t. La solución completa es y(t)=(83/200)e^{-3t}+(133/200)e^{2t}+y₂(t).'}
    ],{modId:'laplace-edo',titulo:'PVI completo: y′′+y′−6y=e^t cos2t, y(0)=1, y′(0)=1/8'});
    c1.append(el('p',{class:'note'},el('b',{},'Verificación en las condiciones iniciales: '),'$y(0)=\\tfrac{83}{200}+\\tfrac{133}{200}-\\tfrac{2}{25}=\\tfrac{83+133-16}{200}=\\tfrac{200}{200}=1$ ✓. Derivando y evaluando en $t=0$: $y\'(0)=-3\\cdot\\tfrac{83}{200}+2\\cdot\\tfrac{133}{200}+\\big(\\tfrac{-2}{25}\\cdot0+\\tfrac{3}{50}\\cdot2\\big)=\\tfrac{-249+266}{200}+\\tfrac{1}{25}=\\tfrac{17}{200}+\\tfrac{8}{200}=\\tfrac{25}{200}=\\tfrac18$ ✓.'));
    c1.append(el('p',{class:'note'},el('b',{},'Verificación en la ecuación: '),'$e^{-3t}$ y $e^{2t}$ son soluciones de la homogénea (sus exponentes son justo las raíces $-3,2$ de $s^2+s-6$), así que no aportan nada al aplicar $y\'\'+y\'-6y$ — toda la ecuación la debe cumplir la parte $e^t(C\\cos2t+D\\sin2t)$ con $C=-2/25$, $D=3/50$. Sustituyendo esa parte y sus derivadas se obtiene, para el coeficiente de $e^t\\cos2t$: $-8C+6D=-8(-\\tfrac{2}{25})+6(\\tfrac{3}{50})=\\tfrac{16}{25}+\\tfrac{9}{25}=1$ ✓; y para $e^t\\sin2t$: $-6C-8D=\\tfrac{12}{25}-\\tfrac{12}{25}=0$ ✓ — exactamente el lado derecho $e^t\\cos2t+0\\cdot e^t\\sin2t$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Transformada inversa y solución de un PVI"; nota "Transformada inversa de Laplace y solución de PVI" del vault (mismo PVI y resultado). La verificación en la ecuación (coeficientes C, D) es elaboración propia, no incluida en v3 ni en la nota.'));
    sec.append(c1);

    /* -------- Card 2: función escalón de Heaviside -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Función escalón de Heaviside, para entradas por tramos'));
    c2.append(el('p',{},'Muchos forzamientos reales se "encienden" recién en $t=a$ y no antes — un interruptor, una fuerza que empieza a aplicarse en cierto momento. La ',el('b',{},'función escalón unitario'),' (o de Heaviside) modela justo eso:'));
    c2.append(el('div',{class:'formula',html:'$$u(t-a) = \\begin{cases} 0, & t\\lt a \\\\ 1, & t\\geq a \\end{cases}$$'}));
    c2.append(el('p',{},'Con ella, cualquier entrada "por tramos" se escribe como una sola expresión válida para todo $t$. Por ejemplo, un pulso rectangular de altura $A$ entre $t=a$ y $t=b$ es una resta de dos escalones:'));
    c2.append(el('div',{class:'formula',html:'$$A\\big[u(t-a)-u(t-b)\\big] = \\begin{cases} 0, & t\\lt a \\\\ A, & a\\leq t\\lt b \\\\ 0, & t\\geq b \\end{cases}$$'}));
    c2.append(el('p',{},'El segundo teorema de traslación —visto en el tema "Fórmulas elementales y propiedades"— es lo que permite transformar (y antitransformar) estas entradas: $\\mathcal{L}\\{f(t-a)u(t-a)\\}=e^{-as}F(s)$, y en particular $\\mathcal{L}\\{u(t-a)\\}=e^{-as}/s$.'));
    c2.append(el('p',{},'Aplicación completa: resolver $x\'\'+4x\'+5x=3u(t-2)$, $x(0)=0$, $x\'(0)=0$ (un sistema masa-resorte-amortiguador en reposo, al que se le aplica una fuerza constante $3$ recién desde $t=2$).'));
    Pasos(c2,[
      {tex:'(s^2+4s+5)\\,X = \\dfrac{3e^{-2s}}{s}',nota:'Condiciones iniciales nulas: L{x′′}=s²X, L{x′}=sX. Lado derecho: L{3u(t-2)}=3e^{-2s}/s.'},
      {tex:'X(s) = 3e^{-2s}\\cdot\\dfrac{1}{s(s^2+4s+5)}',nota:'Se despeja X(s); queda el factor e^{-2s} multiplicando una función racional "sin retraso".'},
      {tex:'\\dfrac{1}{s(s^2+4s+5)} = \\dfrac{1/5}{s} - \\dfrac{(s+4)/5}{s^2+4s+5}',nota:'Fracciones parciales (llamar G(s) al resultado): A=1/5 evaluando en s=0; igualando coeficientes se obtiene el resto.'},
      {tex:'= \\dfrac{1/5}{s} - \\dfrac15\\cdot\\dfrac{s+2}{(s+2)^2+1} - \\dfrac25\\cdot\\dfrac{1}{(s+2)^2+1}',nota:'Completando el cuadrado (s+2)²+1 y separando (s+4)=(s+2)+2 en el numerador, para reconocer la forma de cos/sen desplazados.'},
      {tex:'g(t) = \\dfrac15\\Big[1 - e^{-2t}\\cos t - 2e^{-2t}\\sin t\\Big]',nota:'Antitransformando G(s) término a término, factorizando el 1/5 común.'},
      {tex:'x(t) = 3\\,g(t-2)\\,u(t-2)',nota:'Segundo teorema de traslación (tema "Fórmulas elementales y propiedades"): X(s)=3e^{-2s}G(s) ⇒ x(t)=3g(t-2)u(t-2).'},
      {tex:'x(t)=0,\\quad t\\lt2',nota:'El escalón todavía no se activó: el sistema sigue en reposo.'},
      {tex:'\\text{con }\\tau=t-2,\\ t\\geq2:\\quad x = \\dfrac35\\Big[1-e^{-2\\tau}\\cos\\tau-2e^{-2\\tau}\\sin\\tau\\Big]',nota:'Sustituyendo g(t-2) (paso anterior) y factorizando 3/5=3·(1/5) en común.'}
    ],{modId:'laplace-edo',titulo:'Masa-resorte con forzamiento escalón: x′′+4x′+5x=3u(t−2)'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución (para $t\\geq2$, con $\\tau=t-2$): '),'derivando $x=\\tfrac35\\big[1-e^{-2\\tau}\\cos\\tau-2e^{-2\\tau}\\sin\\tau\\big]$ respecto de $\\tau$ se simplifica a $x\'=3e^{-2\\tau}\\sin\\tau$ (y $x\'(0)=0$, coincidiendo con el reposo justo antes de $t=2$), y derivando otra vez, $x\'\'=3e^{-2\\tau}(\\cos\\tau-2\\sin\\tau)$. Sumando $x\'\'+4x\'+5x$ los términos con $e^{-2\\tau}\\cos\\tau$ y $e^{-2\\tau}\\sin\\tau$ se cancelan entre sí, y queda exactamente $3$ — el lado derecho de la ecuación para $t\\geq2$. En $t=2$ ($\\tau=0$): $x=\\tfrac35-\\tfrac35=0$ y $x\'=0$, empalmando sin salto con el reposo de antes — coherente con que el escalón no es un impulso, así que no hay salto de velocidad.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Función escalón unitario (Heaviside) y traslación en t" (definición, pulso rectangular, y el mismo ejemplo del sistema masa-resorte). La verificación por sustitución directa en la ecuación (v3 verifica esto por integración numérica Runge-Kutta) es elaboración propia y algebraica, verificada arriba.'));
    sec.append(c2);

    /* -------- Card 3: teorema de convolución -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Teorema de convolución'));
    c3.append(el('p',{},'Cuando $Y(s)$ queda como un producto $F(s)G(s)$ que no aparece tal cual en ninguna fila de la tabla, la ',el('b',{},'convolución'),' permite antitransformarlo sin fracciones parciales, a partir de las antitransformadas $f(t)$ y $g(t)$ ya conocidas por separado:'));
    c3.append(el('div',{class:'formula',html:'$$(f*g)(t) = \\int_0^t f(\\tau)\\,g(t-\\tau)\\,d\\tau \\qquad\\qquad \\mathcal{L}\\{f*g\\} = F(s)\\,G(s)$$'}));
    c3.append(el('p',{class:'note'},'La convolución es ',el('b',{},'conmutativa'),': $(f*g)(t)=(g*f)(t)$, aunque el integrando $f(\\tau)g(t-\\tau)$ no lo sea función a función — el desplazamiento relativo $\\tau\\to t-\\tau$ compensa el orden. No confundir con el producto ordinario $f(t)g(t)$: la convolución integra sobre $\\tau$, no multiplica punto a punto en un mismo instante.'));
    c3.append(el('p',{},'Verificación del teorema con $f(t)=t$, $g(t)=e^t$: por definición, integrando por partes,'));
    Pasos(c3,[
      {tex:'(f*g)(t) = \\int_0^t \\tau\\,e^{t-\\tau}\\,d\\tau = e^t\\int_0^t \\tau\\,e^{-\\tau}\\,d\\tau',nota:'Se saca e^t de la integral (no depende de τ).'},
      {tex:'\\int_0^t\\tau e^{-\\tau}d\\tau = \\big[-\\tau e^{-\\tau}-e^{-\\tau}\\big]_0^t = 1-e^{-t}-te^{-t}',nota:'Por partes (u=τ, dv=e^{-τ}dτ), igual que en el cálculo de L{t} del tema "Definición y linealidad de la transformada".'},
      {tex:'(f*g)(t) = e^t\\big(1-e^{-t}-te^{-t}\\big) = e^t-t-1',nota:'Se distribuye e^t y se simplifica.'}
    ],{modId:'laplace-edo',titulo:'Convolución directa: (t*e^t)(t)=e^t−t−1'});
    c3.append(el('p',{},'Por el otro camino, transformando por separado y multiplicando: $F(s)=1/s^2$, $G(s)=1/(s-1)$, y descomponiendo el producto en fracciones parciales:'));
    Pasos(c3,[
      {tex:'F(s)G(s) = \\dfrac{1}{s^2(s-1)} = \\dfrac{A}{s}+\\dfrac{B}{s^2}+\\dfrac{C}{s-1}',nota:'Fracciones parciales con un polo doble en s=0.'},
      {tex:'1=As(s-1)+B(s-1)+Cs^2',nota:'Se multiplica todo por s²(s−1) para quitar denominadores.'},
      {tex:'B=-1\\ (s=0),\\quad C=1\\ (s=1)',nota:'Se evalúa en cada raíz del denominador para despejar B y C directo.'},
      {tex:'A=-C=-1',nota:'Igualando el coeficiente de s² a ambos lados (debe ser A+C=0, ya que a la izquierda no hay término en s²) se despeja A.'},
      {tex:'\\mathcal{L}^{-1}\\{F(s)G(s)\\} = -1-t+e^t',nota:'Se lee la tabla al revés: −1/s→−1, −1/s²→−t, 1/(s−1)→e^t.'}
    ],{modId:'laplace-edo',titulo:'Convolución vía transformada: L⁻¹{F(s)G(s)}'});
    c3.append(el('p',{class:'note'},'Los dos caminos dan $e^t-t-1$ (el segundo, reordenado: $-1-t+e^t$): la integral de convolución directa y el producto de transformadas antitransformado por separado coinciden, confirmando el teorema en este caso — y de paso mostrando que, cuando conviene, se puede elegir el camino más corto según cuál de las dos cuentas sea más simple.'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Función impulso (delta de Dirac) y teorema de convolución" (definición, teorema, y el mismo ejemplo con f(t)=t, g(t)=e^t); la comprobación de las fracciones parciales del segundo camino se rehace y verifica acá.'));
    sec.append(c3);

    /* -------- Card 4: ejercicios -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejercicios'));

    c4.append(el('details',{},
      el('summary',{},'Resolver $y\'+3y=u(t-1)$, $y(0)=0$, con la transformada de Laplace.'),
      el('div',{},
        el('div',{class:'formula',html:'$$(s+3)Y=\\dfrac{e^{-s}}{s}\\ \\Rightarrow\\ Y(s)=e^{-s}\\cdot\\dfrac{1}{s(s+3)}=e^{-s}\\left(\\dfrac{1/3}{s}-\\dfrac{1/3}{s+3}\\right)$$'}),
        el('div',{class:'formula',html:'$$y(t) = \\begin{cases} 0, & t\\lt1 \\\\ \\dfrac13\\big(1-e^{-3(t-1)}\\big), & t\\geq1 \\end{cases}$$'}),
        el('p',{class:'note'},'Verificación de coherencia física: cuando $t\\to\\infty$, $y\\to1/3$ — el equilibrio de $y\'+3y=1$ (forzamiento $1$, coeficiente $3$) es justo $1/3$, como debía dar un forzamiento constante desde $t=1$ en adelante.'))));

    c4.append(el('details',{},
      el('summary',{},'Verificar el teorema de convolución con $f(t)=1$, $g(t)=t$: calcular $(f*g)(t)$ por definición y por transformada, y comprobar que coinciden.'),
      el('div',{},
        el('div',{class:'formula',html:'$$(f*g)(t)=\\int_0^t 1\\cdot(t-\\tau)\\,d\\tau = \\Big[t\\tau-\\dfrac{\\tau^2}{2}\\Big]_0^t = t^2-\\dfrac{t^2}{2}=\\dfrac{t^2}{2}$$'}),
        el('div',{class:'formula',html:'$$F(s)G(s)=\\dfrac1s\\cdot\\dfrac{1}{s^2}=\\dfrac{1}{s^3}\\ \\Longrightarrow\\ \\mathcal{L}^{-1}\\left\\{\\dfrac1{s^3}\\right\\}=\\dfrac{t^2}{2}$$'}),
        el('p',{class:'note'},'Coincide con la tabla ($\\mathcal{L}\\{t^n\\}=n!/s^{n+1}$, con $n=2$: $2!/s^3=2/s^3$, así que $1/s^3\\to t^2/2$) — mismo resultado por los dos caminos.'))));

    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia, aplicando el segundo teorema de traslación y el teorema de convolución de este mismo tema; el primer ejercicio sigue el mismo patrón que el ejemplo "Aplicación completa" de la card "Función escalón de Heaviside, para entradas por tramos" con otros coeficientes.'));
    sec.append(c4);
  }});
