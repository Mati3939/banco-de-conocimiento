/* contenidoOficial original (índice a cubrir):
   - Unidad II: métodos de solución de ecuaciones diferenciales de segundo orden
   - Variación de parámetros */
registerModule({id:'variacion-parametros',title:'Variación de parámetros',unidad:'II',semanas:[8],evaluacion:['control-3','certamen-2'],
  lead:'Cuando el forzamiento no tiene una forma reconocible por la tabla del tema Reducción de orden y coeficientes indeterminados, la particular se arma variando las constantes de la homogénea en vez de proponerla directamente.',
  build(sec){

    /* -------- Card 1: de dónde sale el sistema -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'De dónde sale el sistema en $u_1\',u_2\'$'));
    c1.append(el('p',{},'Método ',el('b',{},'general'),' para hallar $y_p$ de $y\'\'+P(x)y\'+Q(x)y=f(x)$, sin restricción sobre la forma de $f(x)$ — funciona incluso con $\\sec x$, $\\ln x$, $1/x$, donde coeficientes indeterminados (tema ',el('b',{},'Reducción de orden y coeficientes indeterminados'),') no aplica. Con $y_h=c_1y_1+c_2y_2$ ya conocida, se deja que las "constantes" varíen con $x$:'));
    c1.append(el('div',{class:'formula',html:'$$y_p = u_1(x)\\,y_1+u_2(x)\\,y_2$$'}));
    c1.append(el('p',{},'De dónde sale el sistema que determina $u_1,u_2$:'));
    Pasos(c1,[
      {tex:'y_p\' = u_1\'y_1+u_1y_1\'+u_2\'y_2+u_2y_2\'',nota:'Derivando el producto: cuatro términos.'},
      {tex:'u_1\'y_1+u_2\'y_2=0\\quad(\\text{elección conveniente})\\ \\Longrightarrow\\ y_p\'=u_1y_1\'+u_2y_2\'',nota:'Se impone esta condición para que yₚ′ no traiga segundas derivadas de u₁,u₂ al derivar otra vez.'},
      {tex:'y_p\'\' = u_1\'y_1\'+u_1y_1\'\'+u_2\'y_2\'+u_2y_2\'\'',nota:'Derivando yₚ′ de nuevo (la condición del paso anterior es constante ≡0, no aporta derivada).'},
      {tex:'y_p\'\'+Py_p\'+Qy_p = u_1(y_1\'\'+Py_1\'+Qy_1)',nota:'Sustituyendo yₚ, yₚ′, yₚ″ en la EDO completa (primer término).'},
      {tex:'\\qquad+\\ u_2(y_2\'\'+Py_2\'+Qy_2)+u_1\'y_1\'+u_2\'y_2\'',nota:'El resto de los términos de la misma sustitución.'},
      {tex:'y_1\'\'+Py_1\'+Qy_1=0,\\qquad y_2\'\'+Py_2\'+Qy_2=0',nota:'y₁,y₂ resuelven la homogénea: ambos paréntesis del paso anterior se anulan.'},
      {tex:'u_1\'y_1\'+u_2\'y_2\'=f(x)',nota:'Queda esta segunda ecuación en u₁′,u₂′ (la primera es la condición u₁′y₁+u₂′y₂=0 impuesta antes).'},
      {tex:'\\begin{cases}u_1\'y_1+u_2\'y_2=0\\\\u_1\'y_1\'+u_2\'y_2\'=f(x)\\end{cases}',nota:'Sistema lineal 2×2 en u₁′,u₂′.'},
      {tex:'u_1\'=-\\dfrac{y_2f}{W},\\qquad u_2\'=\\dfrac{y_1f}{W}',nota:'Resuelto con la regla de Cramer, usando el Wronskiano W=y₁y₂′−y₂y₁′.'}
    ],{modId:'variacion-parametros',titulo:'De dónde sale el sistema en u₁′, u₂′'});
    c1.append(el('p',{},'Luego $u_1=\\int u_1\'\\,dx$, $u_2=\\int u_2\'\\,dx$, y $y_p=u_1y_1+u_2y_2$.'));
    c1.append(el('p',{class:'note'},'La ecuación debe estar en ',el('b',{},'forma estándar'),' (coeficiente 1 en $y\'\'$) antes de leer $f(x)$ — si no lo está, hay que dividir toda la ecuación primero. El costo frente a coeficientes indeterminados: las integrales de $u_1\',u_2\'$ pueden requerir técnicas avanzadas (por partes, sustitución trigonométrica).'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Variación de parámetros" (propuesta, sistema y fórmulas finales); la derivación paso a paso de por qué el sistema tiene esa forma —imponiendo $u_1\'y_1+u_2\'y_2=0$ y usando que $y_1,y_2$ resuelven la homogénea— es elaboración propia (desarrollo estándar de la materia).'));
    sec.append(c1);

    /* -------- Card 2: ejemplo y''+y=sec x -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Ejemplo: un forzamiento fuera de toda tabla'));
    c2.append(el('p',{},'Resolver $y\'\'+y=\\sec(x)$. $\\sec x$ no es polinomio, exponencial ni seno/coseno puro: coeficientes indeterminados no tiene fila que consultar, así que variación de parámetros es obligatorio acá, no solo una alternativa.'));
    Pasos(c2,[
      {tex:'y_h=c_1\\cos x+c_2\\sin x\\quad(\\lambda=\\pm i),\\qquad y_1=\\cos x,\\ y_2=\\sin x',nota:'Ecuación característica λ²+1=0.'},
      {tex:'W=\\cos x(\\cos x)-\\sin x(-\\sin x)=\\cos^2x+\\sin^2x=1',nota:'Wronskiano, con la identidad pitagórica.'},
      {tex:'u_1\'=-\\dfrac{\\sin x\\sec x}{1}=-\\tan x \\ \\Longrightarrow\\ u_1=\\ln|\\cos x|',nota:'u₁′=−y₂f/W; se integra −tan x.'},
      {tex:'u_2\'=\\dfrac{\\cos x\\sec x}{1}=1 \\ \\Longrightarrow\\ u_2=x',nota:'u₂′=y₁f/W=cos x · sec x=1.'},
      {tex:'y_p=u_1y_1+u_2y_2 = \\cos(x)\\ln|\\cos x|+x\\sin x',nota:'Se arma yₚ=u₁y₁+u₂y₂.'},
      {tex:'y(x)=c_1\\cos x+c_2\\sin x+\\cos(x)\\ln|\\cos x|+x\\sin x',nota:'Solución general.'}
    ],{modId:'variacion-parametros',titulo:'y″+y=sec x'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'derivando $y_p$: $y_p\'=-\\sin x\\ln|\\cos x|+x\\cos x$ (los términos $-\\sin x$ y $+\\sin x$ de la regla del producto se cancelan), y $y_p\'\'=-\\cos x\\ln|\\cos x|+\\dfrac{\\sin^2x}{\\cos x}+\\cos x-x\\sin x$. Sumando $y_p\'\'+y_p$: los términos $\\mp\\cos(x)\\ln|\\cos x|$ y $\\mp x\\sin x$ se cancelan entre sí, quedando $\\dfrac{\\sin^2x}{\\cos x}+\\cos x=\\dfrac{\\sin^2x+\\cos^2x}{\\cos x}=\\dfrac1{\\cos x}=\\sec x$ ✓ — exactamente el lado derecho.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 11 "Variación de parámetros con sec x"; nota "Variación de parámetros" del vault (mismo ejemplo). La verificación por sustitución directa es elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: ejemplo cruzado con Laplace -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'El mismo forzamiento, dos caminos distintos'));
    c3.append(el('p',{},'Resolver $y\'\'+y\'-6y=e^t\\cos(2t)$ por variación de parámetros — el mismo lado izquierdo y forzamiento que resuelve por transformada de Laplace el tema ',el('b',{},'Resolución de EDO, convolución y Heaviside'),', para comparar los dos métodos sobre el mismo problema.'));
    Pasos(c3,[
      {tex:'\\lambda^2+\\lambda-6=0\\ \\Longrightarrow\\ y_h=c_1e^{-3t}+c_2e^{2t},\\quad y_1=e^{-3t},\\ y_2=e^{2t}',nota:'Ecuación característica (λ+3)(λ−2)=0.'},
      {tex:'W=e^{-3t}(2e^{2t})-e^{2t}(-3e^{-3t})=5e^{-t}',nota:'Wronskiano.'},
      {tex:'u_1\'=-\\dfrac{e^{2t}\\cdot e^t\\cos2t}{5e^{-t}}=-\\dfrac{e^{4t}\\cos2t}{5}',nota:'u₁′=−y₂f/W.'},
      {tex:'u_1=-\\dfrac{e^{4t}(2\\cos2t+\\sin2t)}{50}',nota:'Integrando, con ∫e^{at}cos(bt)dt=e^{at}(a cos bt+b sin bt)/(a²+b²), a=4,b=2.'},
      {tex:'u_2\'=\\dfrac{e^{-3t}\\cdot e^t\\cos2t}{5e^{-t}}=\\dfrac{e^{-t}\\cos2t}{5}',nota:'u₂′=y₁f/W.'},
      {tex:'u_2=\\dfrac{e^{-t}(-\\cos2t+2\\sin2t)}{25}',nota:'Integrando, con la misma fórmula y a=−1,b=2.'},
      {tex:'y_p=u_1y_1+u_2y_2 = \\dfrac{e^t}{50}\\big(3\\sin2t-4\\cos2t\\big)',nota:'u₁y₁=−e^t(2cos2t+sin2t)/50; u₂y₂=e^t(−2cos2t+4sin2t)/50; sumando y agrupando.'}
    ],{modId:'variacion-parametros',titulo:'y″+y′−6y=e^t cos2t'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación por coeficientes: '),'escribiendo $y_p=e^t(C\\cos2t+D\\sin2t)$ con $C=-2/25$, $D=3/50$ (la misma $y_p$ de arriba), derivar dos veces y sustituir en $y\'\'+y\'-6y$ da, para el coeficiente de $\\cos2t$: $-8C+6D=-8(-2/25)+6(3/50)=16/25+9/25=1$ ✓; y para $\\sin2t$: $-6C-8D=12/25-12/25=0$ ✓ — el lado derecho $e^t\\cos2t$. Este resultado coincide con la parte $y_2(t)$ de la solución del PVI resuelta por Laplace en el tema Resolución de EDO, convolución y Heaviside ($-\\tfrac2{25}e^t\\cos2t+\\tfrac3{50}e^t\\sin2t$): mismo forzamiento, mismo $y_p$, dos métodos distintos.'));
    c3.append(el('p',{class:'fuente'},'Fuente: nota "Variación de parámetros" del vault (mismo ejemplo y mismo resultado $y_p=\\tfrac1{50}e^t\\{3\\sin2t-4\\cos2t\\}$); el desarrollo de $u_1,u_2$ paso a paso y la verificación por coeficientes son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: ejercicios -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejercicios'));
    c4.append(el('details',{},
      el('summary',{},'Hallar una solución particular de $y\'\'+4y=\\tan(2x)$ por variación de parámetros.'),
      el('div',{},
        el('p',{},'$y_h=c_1\\cos2x+c_2\\sin2x$ ($\\lambda=\\pm2i$). $y_1=\\cos2x$, $y_2=\\sin2x$, $W=2\\cos^22x+2\\sin^22x=2$.'),
        el('div',{class:'formula',html:'$$u_1\'=-\\dfrac{\\sin2x\\tan2x}{2}=-\\dfrac{1-\\cos^22x}{2\\cos2x}$$'}),
        el('div',{class:'formula',html:'$$u_1\'=-\\dfrac12\\sec2x+\\dfrac12\\cos2x$$'}),
        el('div',{class:'formula',html:'$$u_1=-\\dfrac14\\ln|\\sec2x+\\tan2x|+\\dfrac14\\sin2x$$'}),
        el('div',{class:'formula',html:'$$u_2\'=\\dfrac{\\cos2x\\tan2x}{2}=\\dfrac{\\sin2x}{2} \\ \\Longrightarrow\\ u_2=-\\dfrac14\\cos2x$$'}),
        el('div',{class:'formula',html:'$$y_p=u_1y_1+u_2y_2=-\\dfrac14\\cos(2x)\\,\\ln|\\sec2x+\\tan2x|$$'}),
        el('p',{class:'note'},'Verificación (usando que $\\frac{d}{dx}\\ln|\\sec u+\\tan u|=\\sec u\\cdot u\'$, con $u=2x$): sea $g(x)=\\ln|\\sec2x+\\tan2x|$, con $g\'(x)=2\\sec2x$. Entonces $y_p\'=\\tfrac12\\sin(2x)g(x)-\\tfrac12$ y $y_p\'\'=\\cos(2x)g(x)+\\tan(2x)$ (usando $\\cos2x\\cdot\\sec2x=1$). Sumando: $y_p\'\'+4y_p=\\cos(2x)g(x)+\\tan(2x)-\\cos(2x)g(x)=\\tan(2x)$ ✓.'))));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejercicio 12 de la Unidad 2 (mismo enunciado y resultado); la verificación por sustitución directa es elaboración propia.'));
    sec.append(c4);
  }});
