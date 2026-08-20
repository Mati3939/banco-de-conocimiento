/* contenidoOficial original (índice a cubrir):
   - Unidad IV: sistemas de ecuaciones diferenciales
   - Introducción y teoremas básicos
   - Sistemas lineales de primer orden
   - Sistemas lineales de primer orden con coeficientes constantes */
registerModule({id:'sistemas',title:'Sistemas lineales de primer orden',unidad:'IV',semanas:[15],evaluacion:['taller-2'],
  lead:'Escribir un sistema en forma matricial es el primer paso, no el método completo: la resolución vía valores y vectores propios vive en el tema Reducción y valores propios.',
  build(sec){

    /* -------- Card 1: qué es un sistema -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Qué es un sistema lineal de primer orden'));
    c1.append(el('p',{},'Un sistema de EDO lineales de primer orden con coeficientes constantes modela varias cantidades que cambian ',el('b',{},'simultáneamente'),' e interactúan entre sí — poblaciones que compiten, corrientes en circuitos acoplados —, donde la derivada de cada variable depende de las demás. Se escribe en forma matricial:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf{X}\'(t) = A\\,\\mathbf{X}(t) \\qquad\\text{(homogéneo)} \\qquad\\qquad \\mathbf{X}\'(t) = A\\,\\mathbf{X}(t)+\\mathbf{G}(t) \\qquad\\text{(no homogéneo)}$$'}));
    c1.append(el('p',{},'con $A$ una matriz $n\\times n$ de coeficientes constantes, $\\mathbf{X}(t)=(x_1(t),\\ldots,x_n(t))$ el vector de incógnitas, y $\\mathbf{G}(t)$ un forzamiento externo (cero en el caso homogéneo). Por ejemplo, para $x_1\'=x_1+2x_2$, $x_2\'=3x_1+2x_2$:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf{X}\'=\\begin{pmatrix}1&2\\\\3&2\\end{pmatrix}\\mathbf{X}$$'}));
    c1.append(el('p',{class:'note'},'Cada fila de $A$ es literalmente una de las ecuaciones del sistema, leída por coeficientes: la fila $i$ dice de qué combinación de $x_1,\\ldots,x_n$ depende $x_i\'$. Escribir el sistema en esta forma no resuelve nada todavía — solo lo deja listo para el método del tema Reducción y valores propios.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Sistemas X′=AX: valores y vectores propios" (párrafo introductorio); nota "Sistemas de EDO lineales" del vault.'));
    sec.append(c1);

    /* -------- Card 2: reducción de una EDO de orden n -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'De una EDO de orden n a un sistema de primer orden'));
    c2.append(el('p',{},'Toda EDO lineal de orden $n$ se puede reescribir como un sistema de $n$ ecuaciones de primer orden — es la razón por la que el álgebra lineal entra a esta unidad. La sustitución es siempre la misma: llamar $x_1=y,\\,x_2=y\',\\,\\ldots,\\,x_n=y^{(n-1)}$, de modo que cada $x_i\'=x_{i+1}$ es automática, y solo la última fila usa la EDO original:'));
    Pasos(c2,[
      {tex:'y^{(n)}+a_{n-1}y^{(n-1)}+\\cdots+a_1y\'+a_0y=g(t)',nota:'EDO lineal de orden n con coeficientes constantes.'},
      {tex:'x_1=y,\\ x_2=y\',\\ \\ldots,\\ x_n=y^{(n-1)}',nota:'Se nombra cada derivada sucesiva como una variable nueva.'},
      {tex:'x_1\'=x_2,\\ x_2\'=x_3,\\ \\ldots,\\ x_{n-1}\'=x_n',nota:'Automático por la definición de las x_i: la derivada de cada una es justo la siguiente.'},
      {tex:'x_n\'=y^{(n)}=-a_0x_1-a_1x_2-\\cdots-a_{n-1}x_n+g(t)',nota:'La última fila es la única que usa la EDO original, despejando el término de mayor orden.'},
      {tex:'A=\\begin{pmatrix}0&1&0&\\cdots&0\\\\0&0&1&\\cdots&0\\\\\\vdots&&&\\ddots&\\vdots\\\\0&0&0&\\cdots&1\\\\-a_0&-a_1&-a_2&\\cdots&-a_{n-1}\\end{pmatrix}',nota:'Matriz compañera: unos justo arriba de la diagonal, y los coeficientes de la EDO (con signo cambiado) en la última fila.'}
    ],{modId:'sistemas',titulo:'Reducción general de orden n a un sistema de primer orden'});
    c2.append(el('p',{},'Aplicado al sistema masa-resorte-amortiguador del tema ',el('b',{},'Vibraciones: libres, amortiguadas y forzadas'),' (caso subamortiguado, $m=1$, $c=6$, $k=25$): la EDO $\\ddot y+6\\dot y+25y=0$ se reduce con $x_1=y,\\,x_2=\\dot y$:'));
    Pasos(c2,[
      {tex:'x_1\'=x_2,\\qquad x_2\'=-25x_1-6x_2',nota:'Sustituyendo a=25, b=6 en la matriz compañera de arriba.'},
      {tex:'A=\\begin{pmatrix}0&1\\\\-25&-6\\end{pmatrix}',nota:'Matriz 2×2 del sistema equivalente.'},
      {tex:'\\det(A-\\lambda I)=\\lambda^2+6\\lambda+25=0',nota:'Mismo polinomio característico que la EDO escalar original — la reducción no cambia el problema, solo su forma.'}
    ],{modId:'sistemas',titulo:'Reducción del ejemplo de Vibraciones: ÿ+6ẏ+25y=0'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$\\det(A-\\lambda I)=\\det\\begin{pmatrix}-\\lambda&1\\\\-25&-6-\\lambda\\end{pmatrix}=(-\\lambda)(-6-\\lambda)-(1)(-25)=\\lambda^2+6\\lambda+25$ ✓ — exactamente el mismo discriminante ($36-100=-64$) y las mismas raíces $\\lambda=-3\\pm4i$ que ya se calcularon (con otra notación) en la card "Los tres regímenes, con los mismos m,k" del tema Vibraciones. Es la confirmación de que valores propios de la matriz compañera y raíces de la ecuación característica son el mismo cálculo visto desde dos formalismos.'));
    c2.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Campbell, Zill) para la reducción de orden n — no está en index-v3.html ni en las notas del vault, que solo tratan el caso ya reducido. Los números del ejemplo (m=1, c=6, k=25) son los del tema Vibraciones: libres, amortiguadas y forzadas, reutilizados para mostrar la conexión.'));
    sec.append(c2);

    /* -------- Card 3: forma matricial y el caso diagonal -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'El caso más simple: A ya diagonal'));
    c3.append(el('p',{},'Cuando $A$ ya es diagonal, cada ecuación queda desacoplada: se resuelve una por una, cada una como la EDO escalar $x_i\'=\\lambda_ix_i$ del tema Variables separables ($x_i(t)=C_ie^{\\lambda_it}$). Por ejemplo, para $x\'=x$, $y\'=-2y$ (matriz $A=\\text{diag}(1,-2)$):'));
    c3.append(el('div',{class:'formula',html:'$$x(t)=C_1e^{t}, \\qquad y(t)=C_2e^{-2t}$$'}));
    c3.append(el('p',{},'Eliminando $t$ entre las dos ecuaciones ($e^t=x/C_1$, así que $e^{-2t}=(C_1/x)^2$) se obtiene la trayectoria en el plano $xy$ para cada elección de constantes:'));
    c3.append(el('div',{class:'formula',html:'$$y=\\dfrac{K}{x^2}, \\qquad K=C_2C_1^2$$'}));
    const planoDiag=Plano(c3,{xMin:-3,xMax:3,yMin:-3,yMax:3,alto:320});
    planoDiag.dibujar(P=>{
      P.ejes();
      [0.6,1.5,3,-0.6,-1.5,-3].forEach(K=>P.curva(x=>K/(x*x),{color:K>0?'--s1':'--s6',grosor:2}));
      P.texto(2.1,2.6,'eje x: y₀=0',{color:'--s4'});
      P.texto(-2.9,0.3,'eje y: x₀=0',{color:'--s4'});
    });
    c3.append(el('p',{class:'note'},'Las curvas $y=K/x^2$ (una por cada condición inicial) nunca cruzan los ejes: el eje $x$ (con $y_0=0$) y el eje $y$ (con $x_0=0$) son, ellos mismos, dos trayectorias — las que quedan sobre un solo vector propio, $(1,0)$ y $(0,1)$ respectivamente, que en este caso diagonal coinciden con los ejes coordenados. Cuando $A$ no es diagonal, el mismo fenómeno ocurre pero alineado con los vectores propios de $A$, no con los ejes — el tema Reducción y valores propios muestra esos casos.'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Sistemas X′=AX: valores y vectores propios" (ejemplo del caso diagonal). La eliminación de t para obtener y=K/x² y el gráfico son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: ejercicios -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejercicios'));

    c4.append(el('details',{},
      el('summary',{},'Reducir a un sistema de primer orden: $y\'\'\'-y=0$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$x_1=y,\\ x_2=y\',\\ x_3=y\'\' \\ \\Longrightarrow\\ x_1\'=x_2,\\ x_2\'=x_3,\\ x_3\'=y\'\'\'=y=x_1$$'}),
        el('div',{class:'formula',html:'$$A=\\begin{pmatrix}0&1&0\\\\0&0&1\\\\1&0&0\\end{pmatrix}$$'}),
        el('p',{class:'note'},'Matriz compañera con $a_0=-1$ (coeficiente de y en la EDO original, con signo cambiado en la última fila: $-a_0=1$), $a_1=a_2=0$.'))));

    c4.append(el('details',{},
      el('summary',{},'Reducir a un sistema de primer orden, incluido el vector de forzamiento: $y\'\'+4y\'+13y=e^{-t}$, $y(0)=1$, $y\'(0)=0$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$x_1=y,\\ x_2=y\'\\ \\Longrightarrow\\ x_1\'=x_2,\\ x_2\'=-13x_1-4x_2+e^{-t}$$'}),
        el('div',{class:'formula',html:'$$\\mathbf{X}\'=\\begin{pmatrix}0&1\\\\-13&-4\\end{pmatrix}\\mathbf{X}+\\begin{pmatrix}0\\\\e^{-t}\\end{pmatrix}, \\qquad \\mathbf{X}(0)=\\begin{pmatrix}1\\\\0\\end{pmatrix}$$'}),
        el('p',{class:'note'},'Sistema no homogéneo: el forzamiento $e^{-t}$ solo aparece en la fila de $x_2\'$, porque solo la EDO original (la fila de mayor orden) lo tiene.'))));

    c4.append(el('p',{class:'fuente'},'Fuente: ejercicios de elaboración propia, aplicando la reducción general de la card "De una EDO de orden n a un sistema de primer orden".'));
    sec.append(c4);
  }});
