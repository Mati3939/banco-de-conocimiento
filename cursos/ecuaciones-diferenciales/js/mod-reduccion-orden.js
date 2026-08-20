/* contenidoOficial original (índice a cubrir):
   - Reducción de orden
   - Método de los coeficientes indeterminados */
registerModule({id:'reduccion-orden',title:'Reducción de orden y coeficientes indeterminados',unidad:'II',semanas:[9],evaluacion:['control-3','certamen-2'],
  lead:'Dos métodos independientes que comparten módulo: reducción de orden encuentra una segunda solución de la homogénea a partir de una conocida; coeficientes indeterminados arma la particular cuando el forzamiento tiene una forma reconocible.',
  build(sec){

    /* -------- Card 1: reducción de orden -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Reducción de orden: construir la segunda solución'));
    c1.append(el('p',{},'Sirve cuando la EDO ',el('b',{},'no tiene coeficientes constantes'),' — no hay ecuación característica que resolver — pero ya se conoce ',el('b',{},'una'),' solución $y_1$ de $y\'\'+P(x)y\'+Q(x)y=0$. Proponiendo $y=v(x)\\,y_1(x)$:'));
    c1.append(el('div',{class:'formula',html:'$$y=vy_1,\\qquad y\'=v\'y_1+vy_1\',\\qquad y\'\'=v\'\'y_1+2v\'y_1\'+vy_1\'\'$$'}));
    c1.append(el('p',{},'Al sustituir en la EDO, todos los términos con $v$ ',el('i',{},'sin derivar'),' se cancelan automáticamente — porque $y_1$ ya es solución. Queda una ecuación de primer orden en $w=v\'$ (separable), y una vez hallado $w$: $v=\\int w\\,dx$, $y_2=v\\cdot y_1$. El atajo cerrado (fórmula de Abel) da lo mismo sin rehacer la sustitución:'));
    c1.append(el('div',{class:'formula',html:'$$y_2 = y_1\\int \\dfrac{e^{-\\int P(x)\\,dx}}{y_1(x)^2}\\,dx$$'}));
    c1.append(el('p',{},'Ejemplo completo (con la sustitución explícita, no el atajo): $y_1=\\ln(x)$ es solución de $xy\'\'+y\'=0$; hallar la solución general.'));
    Pasos(c1,[
      {tex:'y=v\\ln x,\\quad y\'=v\'\\ln x+\\dfrac{v}{x},\\quad y\'\'=v\'\'\\ln x+\\dfrac{2v\'}{x}-\\dfrac{v}{x^2}',nota:'Sustitución con y₁=ln x, y₁′=1/x, y₁″=−1/x².'},
      {tex:'x\\Big(v\'\'\\ln x+\\dfrac{2v\'}{x}-\\dfrac{v}{x^2}\\Big)+\\Big(v\'\\ln x+\\dfrac{v}{x}\\Big)=0',nota:'Se sustituye en xy″+y′=0.'},
      {tex:'x\\ln(x)\\,v\'\'+(2+\\ln x)\\,v\'=0',nota:'Los términos en v (sin derivar) se cancelan, como garantiza el método (−v/x+v/x=0); queda solo v′ y v″.'},
      {tex:'w=v\':\\qquad \\dfrac{w\'}{w}=-\\dfrac{2+\\ln x}{x\\ln x}',nota:'Ecuación de primer orden en w=v′, separable.'},
      {tex:'\\ln|w| = -2\\ln|\\ln x|-\\ln|x| \\ \\Longrightarrow\\ w=\\dfrac{1}{x(\\ln x)^2}',nota:'Integrando ambos lados (−2/(x ln x) y −1/x por separado).'},
      {tex:'v=\\int\\dfrac{dx}{x(\\ln x)^2} \\overset{u=\\ln x}{=} \\int u^{-2}\\,du = -\\dfrac{1}{\\ln x}',nota:'Sustitución u=ln x, du=dx/x.'},
      {tex:'y_2=v\\cdot y_1 = -\\dfrac{1}{\\ln x}\\cdot\\ln x=-1 \\ \\Longrightarrow\\ y(x)=c_1\\ln(x)+c_2',nota:'Absorbiendo el signo de y₂=−1 en la constante c₂, queda la solución general.'}
    ],{modId:'reduccion-orden',titulo:'xy″+y′=0 con y₁=ln(x)'});
    c1.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$y=c_1\\ln x+c_2\\ \\Rightarrow\\ y\'=c_1/x,\\ y\'\'=-c_1/x^2$, y $xy\'\'+y\'=x(-c_1/x^2)+c_1/x=-c_1/x+c_1/x=0$ ✓ para cualquier $c_1,c_2$. Y el Wronskiano de $y_1=\\ln x$, $y_2=1$ es $W=y_1y_2\'-y_2y_1\'=(\\ln x)(0)-1(1/x)=-1/x\\neq0$ para $x\\gt0$: $y_2$ sí es linealmente independiente de $y_1$, no una solución "de adorno".'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Reducción de orden" y ejemplo 8 "Reducción de orden" (mismo $y_1=\\ln x$, mismo resultado); nota "Reducción de orden" del vault (mismo desarrollo). La verificación del Wronskiano es elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: reducción de orden en una ecuación de Euler -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Un caso donde reducción de orden y el tema Euler coinciden'));
    c2.append(el('p',{},'Reducción de orden no exige que la EDO tenga coeficientes constantes ni que sea de Euler-Cauchy — funciona con cualquier $y_1$ conocida. Pero si la ecuación ',el('i',{},'sí'),' resulta ser de Euler-Cauchy (tema ',el('b',{},'La ecuación de Euler'),'), los dos métodos deben coincidir, porque ambos resuelven la misma EDO. Ejemplo: $y_1=x$ es solución de $x^2y\'\'+xy\'-y=0$; hallar $y_2$ por reducción de orden (usando el atajo de Abel, ya que la sustitución completa se hizo en la card "Reducción de orden: construir la segunda solución").'));
    Pasos(c2,[
      {tex:'y\'\'+\\dfrac1xy\'-\\dfrac1{x^2}y=0,\\quad P(x)=\\dfrac1x',nota:'Forma estándar (coeficiente 1 en y″), dividiendo la ecuación por x².'},
      {tex:'y_2=y_1\\int\\dfrac{e^{-\\int P\\,dx}}{y_1^2}\\,dx = x\\int\\dfrac{e^{-\\ln x}}{x^2}\\,dx',nota:'Fórmula de Abel con y₁=x.'},
      {tex:'= x\\int\\dfrac{1/x}{x^2}\\,dx = x\\int x^{-3}\\,dx = x\\cdot\\Big(-\\dfrac{x^{-2}}{2}\\Big)=-\\dfrac1{2x}',nota:'e^{-ln x}=1/x; se integra x⁻³.'},
      {tex:'y_2=\\dfrac1x\\ \\text{(descartando el }-\\tfrac12\\text{)},\\qquad y(x)=c_1x+\\dfrac{c_2}{x}',nota:'El factor −1/2 no aporta independencia lineal nueva; solución general.'}
    ],{modId:'reduccion-orden',titulo:'x²y″+xy′−y=0 con y₁=x'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$y_2=x^{-1}\\Rightarrow y_2\'=-x^{-2},\\ y_2\'\'=2x^{-3}$, y $x^2(2x^{-3})+x(-x^{-2})-x^{-1}=2x^{-1}-x^{-1}-x^{-1}=0$ ✓. Y en efecto $x^2y\'\'+xy\'-y=0$ es de Euler-Cauchy con $b=1,c=-1$: su ecuación indicial $r^2+(b-1)r+c=r^2-1=0$ da $r=\\pm1$ directamente — mismo resultado $y=c_1x+c_2x^{-1}$ que reducción de orden, sin necesitar la sustitución $y=vy_1$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejercicio 9 de la Unidad 2 ("Sabiendo que y₁=x es solución de x²y″+xy′−y=0…", mismo resultado); la conexión explícita con la ecuación indicial del tema La ecuación de Euler es elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: coeficientes indeterminados -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Coeficientes indeterminados: armar la particular'));
    c3.append(el('p',{},'Método distinto del anterior: no busca una segunda solución de la homogénea, sino la solución particular $y_p$ de la ecuación completa $ay\'\'+by\'+cy=g(x)$ (coeficientes constantes). Sirve cuando $g(x)$ tiene una forma "simple" — polinomio, exponencial, seno/coseno o combinaciones —, proponiendo $y_p$ con esa misma forma:'));
    Tabla(c3,{columnas:['g(x)','Forma propuesta de yₚ'],filas:[
      ['polinomio grado n','polinomio grado n'],
      ['$e^{rx}$','$Ae^{rx}$'],
      ['$\\sin(kx)$ o $\\cos(kx)$','$A\\sin(kx)+B\\cos(kx)$']
    ]});
    c3.append(el('p',{},el('b',{},'Regla de modificación: '),'si la forma propuesta ya aparece en la solución complementaria $y_h$ (la que sale de la ecuación característica $a\\lambda^2+b\\lambda+c=0$, con sus tres casos según el discriminante), se multiplica por $x$ — o por $x^2$ si sigue coincidiendo — hasta que deje de solaparse. Después se sustituye $y_p$ con sus derivadas en la ecuación completa y se igualan coeficientes término a término.'));
    c3.append(el('p',{class:'note'},'Es más rápido que variación de parámetros cuando aplica, pero ',el('b',{},'solo'),' funciona con ese tipo restringido de $g(x)$: con $\\tan x$, $\\ln x$, $1/x$, no hay fila de tabla que consultar — ahí es obligatorio el tema ',el('b',{},'Variación de parámetros'),', que no tiene esa restricción.'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Coeficientes indeterminados"; nota "Coeficientes indeterminados" del vault (misma tabla y regla de modificación).'));
    sec.append(c3);

    /* -------- Card 4: ejemplo completo de coeficientes indeterminados -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejemplo completo: un forzamiento sinusoidal'));
    c4.append(el('p',{},'Hallar la solución general de $\\ddot y+14\\dot y+49y=48\\sin t$ (un sistema masa-resorte-amortiguador forzado, tema ',el('b',{},'Vibraciones'),').'));
    Pasos(c4,[
      {tex:'\\lambda^2+14\\lambda+49=0\\ \\Longrightarrow\\ (\\lambda+7)^2=0\\ \\Longrightarrow\\ \\lambda=-7\\ (\\text{doble})',nota:'Ecuación característica de la parte homogénea; raíz real repetida.'},
      {tex:'y_h=(C_0+C_1t)e^{-7t}',nota:'Caso de raíz doble.'},
      {tex:'y_p=a_1\\sin t+a_2\\cos t',nota:'sin t no aparece en yₕ (que decae con e^{−7t}, sin oscilar): se propone yₚ directamente, sin modificar.'},
      {tex:'y_p\'=a_1\\cos t-a_2\\sin t,\\qquad y_p\'\'=-a_1\\sin t-a_2\\cos t',nota:'Derivadas de la propuesta.'},
      {tex:'\\sin t:\\ 48a_1-14a_2=48 \\qquad \\cos t:\\ 14a_1+48a_2=0',nota:'Sustituyendo yₚ, yₚ′, yₚ″ en la ecuación y agrupando coeficientes de sin t y cos t por separado.'},
      {tex:'a_2=-\\dfrac{7}{24}a_1',nota:'Despejando a₂ de la segunda ecuación.'},
      {tex:'a_1=\\dfrac{576}{625},\\qquad a_2=-\\dfrac{168}{625}',nota:'Sustituyendo en la primera ecuación y resolviendo (1250/24·a₁=48).'},
      {tex:'y(t)=(C_0+C_1t)e^{-7t}+\\dfrac{576}{625}\\sin t-\\dfrac{168}{625}\\cos t',nota:'Solución general: complementaria (transitorio) + particular (régimen permanente).'}
    ],{modId:'reduccion-orden',titulo:'ÿ+14ẏ+49y=48sin t'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'con $a_1=576/625$, $a_2=-168/625$, el coeficiente de $\\sin t$ en $y_p\'\'+14y_p\'+49y_p$ da $-a_1-14a_2+49a_1=48a_1-14a_2=48(576/625)-14(-168/625)=(27648+2352)/625=30000/625=48$ ✓; y el de $\\cos t$ da $-a_2+14a_1+49a_2=14a_1+48a_2=14(576/625)+48(-168/625)=(8064-8064)/625=0$ ✓ — exactamente el lado derecho $48\\sin t+0\\cdot\\cos t$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 10 "Coeficientes indeterminados en un sistema forzado"; nota "Aplicaciones de EDO de segundo orden - sistema masa-resorte" del vault (mismo sistema). La verificación por sustitución directa es elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));

    c5.append(el('details',{},
      el('summary',{},'Reducción de orden: dado que $y_1=x^2$ es solución de $x^2y\'\'-3xy\'+4y=0$, hallar la solución general.'),
      el('div',{},
        el('div',{class:'formula',html:'$$y\'\'-\\dfrac3xy\'+\\dfrac4{x^2}y=0,\\quad P(x)=-\\dfrac3x$$'}),
        el('div',{class:'formula',html:'$$y_2=x^2\\int\\dfrac{e^{\\int3/x\\,dx}}{x^4}\\,dx=x^2\\int\\dfrac{x^3}{x^4}\\,dx=x^2\\ln x$$'}),
        el('div',{class:'formula',html:'$$y(x)=c_1x^2+c_2x^2\\ln x$$'}),
        el('p',{class:'note'},'Verificación de $y_2$: $y_2\'=2x\\ln x+x$, $y_2\'\'=2\\ln x+3$; $x^2(2\\ln x+3)-3x(2x\\ln x+x)+4x^2\\ln x=(2-6+4)x^2\\ln x+(3-3)x^2=0$ ✓. Coincide con la solución de la ecuación de Euler-Cauchy $x^2y\'\'-3xy\'+4y=0$ (tema La ecuación de Euler) por su ecuación indicial $r^2-4r+4=(r-2)^2=0$, $r=2$ doble: $y=(c_1+c_2\\ln x)x^2$ — mismo resultado, otro camino.'))));

    c5.append(el('details',{},
      el('summary',{},'Coeficientes indeterminados: hallar una solución particular de $y\'\'-y\'-2y=4x^2$.'),
      el('div',{},
        el('p',{},'$\\lambda^2-\\lambda-2=(\\lambda-2)(\\lambda+1)=0\\Rightarrow y_h=c_1e^{2x}+c_2e^{-x}$ (no hay polinomios en $y_h$: sin modificación). Se propone $y_p=Ax^2+Bx+C$:'),
        el('div',{class:'formula',html:'$$2A-(2Ax+B)-2(Ax^2+Bx+C)=4x^2\\ \\Longrightarrow\\ -2Ax^2-(2A+2B)x+(2A-B-2C)=4x^2$$'}),
        el('div',{class:'formula',html:'$$x^2:\\,A=-2 \\quad x^1:\\,B=2 \\quad x^0:\\,C=-3 \\ \\Longrightarrow\\ y_p(x)=-2x^2+2x-3$$'}),
        el('p',{class:'note'},'Verificación: $y_p\'=-4x+2$, $y_p\'\'=-4$; $y_p\'\'-y_p\'-2y_p=-4-(-4x+2)-2(-2x^2+2x-3)=-4+4x-2+4x^2-4x+6=4x^2$ ✓.'))));

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicio de reducción de orden — elaboración propia, mismo caso que el ejemplo 9 de index-v3.html ("Ecuación de Euler-Cauchy: los tres casos"), solución (b), resuelto acá por reducción de orden en vez de por la ecuación indicial. Ejercicio de coeficientes indeterminados: index-v3.html (contenido auditado), ejercicio 11 de la Unidad 2.'));
    sec.append(c5);
  }});
