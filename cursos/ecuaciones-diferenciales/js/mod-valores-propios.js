/* contenidoOficial original (índice a cubrir):
   - Métodos de resolución de sistemas lineales
   - Reducción
   - Sistemas con coeficientes indeterminados
   - Valores propios */
registerModule({id:'valores-propios',title:'Reducción y valores propios',unidad:'IV',semanas:[16],evaluacion:['control-5'],
  lead:'El caso de valores propios reales distintos es directo; valor propio repetido y complejo conjugado piden cada uno un paso extra, y son el corazón de esta unidad.',
  build(sec){

    /* -------- Card 1: el método en tres pasos -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'El método en tres pasos'));
    c1.append(el('p',{},'La reducción de una EDO de orden $n$ a un sistema $\\mathbf{X}\'=A\\mathbf{X}$ (tema Sistemas lineales de primer orden) deja el problema listo para este método: encontrar los valores y vectores propios de $A$.'));
    c1.append(el('ol',{},
      el('li',{},el('b',{},'Valores propios: '),el('span',{html:'resolver $\\det(A-\\lambda I)=0$ — un polinomio de grado n en λ.'})),
      el('li',{},el('b',{},'Vector propio para cada $\\lambda_i$: '),el('span',{html:'resolver $(A-\\lambda_iI)\\,v^{(i)}=0$.'})),
      el('li',{},el('b',{},'Solución general: '),el('span',{html:'$\\mathbf{X}(t)=C_1e^{\\lambda_1t}v^{(1)}+\\cdots+C_ne^{\\lambda_nt}v^{(n)}$, si hay n valores propios distintos o suficientes vectores propios.'}))
    ));
    c1.append(el('p',{class:'note'},'La condición "o suficientes vectores propios" del paso 3 es la que falla en el caso de valor propio repetido (card "Caso 2"): ahí un solo vector propio no alcanza para armar la base de soluciones, y hace falta un paso extra. El material revisado (index-v3.html, vault, Canvas 2026-2) solo cubre el sistema homogéneo $\\mathbf{X}\'=A\\mathbf{X}$; para un sistema no homogéneo $\\mathbf{X}\'=A\\mathbf{X}+\\mathbf{G}(t)$ haría falta un método análogo a coeficientes indeterminados o variación de parámetros extendido a sistemas, que no aparece en ninguna de las tres fuentes — no se documenta acá para no inventarlo.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Sistemas X′=AX: valores y vectores propios" (los tres pasos); nota "Sistemas de EDO lineales" del vault.'));
    sec.append(c1);

    /* -------- Card 2: caso 1, reales distintos -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Caso 1: valores propios reales distintos'));
    c2.append(el('p',{},'Resolver $\\mathbf{X}\'=A\\mathbf{X}$ con $A=\\begin{pmatrix}4&2\\\\3&3\\end{pmatrix}$.'));
    Pasos(c2,[
      {tex:'\\det(A-\\lambda I)=(4-\\lambda)(3-\\lambda)-6=\\lambda^2-7\\lambda+6=0',nota:'Determinante de A−λI, igualado a 0.'},
      {tex:'(\\lambda-6)(\\lambda-1)=0\\ \\Longrightarrow\\ \\lambda_1=6,\\ \\lambda_2=1',nota:'Dos raíces reales distintas.'},
      {tex:'\\lambda_1=6:\\ \\begin{pmatrix}-2&2\\\\3&-3\\end{pmatrix}v=0',nota:'(A−6I)v=0. Ambas filas dan la misma condición v₁=v₂ (deben ser proporcionales: A−6I es singular).'},
      {tex:'v^{(1)}=(1,1)',nota:'Vector propio de λ=6.'},
      {tex:'\\lambda_2=1:\\ \\begin{pmatrix}3&2\\\\3&2\\end{pmatrix}v=0',nota:'(A−I)v=0, es decir 3v₁+2v₂=0.'},
      {tex:'v^{(2)}=(2,-3)',nota:'Se elige v₁=2, v₂=−3.'},
      {tex:'x(t)=C_1e^{6t}+2C_2e^{t},\\qquad y(t)=C_1e^{6t}-3C_2e^{t}',nota:'Solución general en componentes: dos valores propios distintos alcanzan directamente para la base.'}
    ],{modId:'valores-propios',titulo:'Caso 1: A=[[4,2],[3,3]], λ=6,1'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación de los vectores propios: '),'$Av^{(1)}=\\begin{pmatrix}4&2\\\\3&3\\end{pmatrix}\\begin{pmatrix}1\\\\1\\end{pmatrix}=\\begin{pmatrix}6\\\\6\\end{pmatrix}=6\\begin{pmatrix}1\\\\1\\end{pmatrix}$ ✓ ($=\\lambda_1v^{(1)}$). $Av^{(2)}=\\begin{pmatrix}4&2\\\\3&3\\end{pmatrix}\\begin{pmatrix}2\\\\-3\\end{pmatrix}=\\begin{pmatrix}2\\\\-3\\end{pmatrix}=1\\cdot\\begin{pmatrix}2\\\\-3\\end{pmatrix}$ ✓ ($=\\lambda_2v^{(2)}$). Y por sustitución directa, con $x=C_1e^{6t}+2C_2e^{t}$, $y=C_1e^{6t}-3C_2e^{t}$: $x\'=6C_1e^{6t}+2C_2e^{t}$, y $4x+2y=4C_1e^{6t}+8C_2e^{t}+2C_1e^{6t}-6C_2e^{t}=6C_1e^{6t}+2C_2e^{t}=x\'$ ✓; análogamente $y\'=6C_1e^{6t}-3C_2e^{t}=3x+3y$ ✓.'));
    c2.append(el('p',{},'Como ambos valores propios son positivos, el origen es un ',el('b',{},'nodo inestable'),': toda trayectoria se aleja del origen (ver la card "Los tres retratos de fase"). Si los dos valores propios tuvieran signo opuesto —como en el ejercicio 17 de index-v3.html (mismo tema, matriz $A=\\begin{pmatrix}3&-2\\\\2&-2\\end{pmatrix}$), con $\\lambda=2,-1$— el retrato sería un ',el('b',{},'punto silla'),' en vez de un nodo.'));
    c2.append(el('p',{class:'fuente'},'Fuente: ejemplo de elaboración propia (matriz distinta a la del ejercicio 17 de index-v3.html, para no repetirlo), siguiendo el método de la card "El método en tres pasos"; verificado arriba.'));
    sec.append(c2);

    /* -------- Card 3: caso 2, real repetido -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Caso 2: valor propio real repetido, con un solo vector propio'));
    c3.append(el('p',{},'Cuando $\\lambda$ es una raíz doble de $\\det(A-\\lambda I)=0$ pero $(A-\\lambda I)v=0$ solo tiene ',el('b',{},'una'),' dirección de solución (no dos independientes), un vector propio no alcanza para la base — hace falta un ',el('b',{},'vector propio generalizado'),' $w$:'));
    Pasos(c3,[
      {tex:'\\mathbf{X}_2(t)=e^{\\lambda t}(tv+w)',nota:'Segunda solución propuesta, análoga al factor "×t" de la Unidad II (raíz repetida de la ecuación característica escalar).'},
      {tex:'\\mathbf{X}_2\'(t)=e^{\\lambda t}(\\lambda tv+\\lambda w+v)',nota:'Derivando (regla del producto).'},
      {tex:'A\\mathbf{X}_2=e^{\\lambda t}(tAv+Aw)=e^{\\lambda t}(t\\lambda v+Aw)',nota:'Usando que Av=λv (v es vector propio de λ).'},
      {tex:'\\text{Igualando }\\mathbf{X}_2\'=A\\mathbf{X}_2:\\ \\ \\lambda w+v=Aw\\ \\Longrightarrow\\ (A-\\lambda I)w=v',nota:'Los términos con t coinciden automáticamente; queda una condición algebraica sobre w.'}
    ],{modId:'valores-propios',titulo:'De dónde sale el vector propio generalizado'});
    c3.append(el('p',{},'Aplicado a $A=\\begin{pmatrix}3&-1\\\\1&1\\end{pmatrix}$:'));
    Pasos(c3,[
      {tex:'\\det(A-\\lambda I)=(3-\\lambda)(1-\\lambda)+1=\\lambda^2-4\\lambda+4=(\\lambda-2)^2=0',nota:'Raíz doble λ=2.'},
      {tex:'(A-2I)v=0\\ \\Longrightarrow\\ \\begin{pmatrix}1&-1\\\\1&-1\\end{pmatrix}v=0\\ \\Longrightarrow\\ v=(1,1)',nota:'Una sola dirección: v₁=v₂. Las dos filas dan la misma ecuación (matriz de rango 1) — es la señal de que hace falta w.'},
      {tex:'(A-2I)w=v\\ \\Longrightarrow\\ \\begin{pmatrix}1&-1\\\\1&-1\\end{pmatrix}w=\\begin{pmatrix}1\\\\1\\end{pmatrix}',nota:'Condición sobre w del paso anterior, con los números de esta A y este v.'},
      {tex:'w_1-w_2=1\\ \\Longrightarrow\\ w=(1,0)',nota:'Se elige la solución más simple (w₂=0).'},
      {tex:'x(t)=e^{2t}(C_1+C_2+C_2t),\\qquad y(t)=e^{2t}(C_1+C_2t)',nota:'Solución general en componentes, con las dos soluciones independientes ya construidas.'}
    ],{modId:'valores-propios',titulo:'Caso 2: A=[[3,−1],[1,1]], λ=2 (doble)'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'en componentes, $x(t)=e^{2t}(C_1+C_2+C_2t)$, $y(t)=e^{2t}(C_1+C_2t)$. Derivando, $x\'=e^{2t}(2C_1+3C_2+2C_2t)$, y $3x-y=e^{2t}\\big[3(C_1+C_2+C_2t)-(C_1+C_2t)\\big]=e^{2t}(2C_1+3C_2+2C_2t)$ ✓ ($=x\'$). Análogamente $y\'=e^{2t}(2C_1+2C_2t+C_2)$, y $x+y=e^{2t}\\big[(C_1+C_2+C_2t)+(C_1+C_2t)\\big]=e^{2t}(2C_1+C_2+2C_2t)=y\'$ ✓.'));
    c3.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Campbell, Zill) para valor propio repetido con un solo vector propio — index-v3.html marca explícitamente este caso como "no cubierto en el material revisado", igual que la nota del vault "Sistemas de EDO lineales". Ejemplo numérico y verificación son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: caso 3, complejos conjugados -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Caso 3: valores propios complejos conjugados'));
    c4.append(el('p',{},'Si $\\lambda=\\alpha\\pm\\beta i$ con vector propio complejo $v=v_r+iv_i$ (parte real e imaginaria, cada una un vector real), la solución compleja $e^{\\lambda t}v$ se separa en dos soluciones ',el('b',{},'reales'),' independientes — su parte real y su parte imaginaria:'));
    c4.append(el('div',{class:'formula',html:'$$\\text{Re}(e^{\\lambda t}v)=e^{\\alpha t}\\big(v_r\\cos\\beta t-v_i\\sin\\beta t\\big)$$'}));
    c4.append(el('div',{class:'formula',html:'$$\\text{Im}(e^{\\lambda t}v)=e^{\\alpha t}\\big(v_r\\sin\\beta t+v_i\\cos\\beta t\\big)$$'}));
    c4.append(el('p',{},'La solución general es $\\mathbf{X}(t)=C_1\\,\\text{Re}(e^{\\lambda t}v)+C_2\\,\\text{Im}(e^{\\lambda t}v)$.'));
    c4.append(el('p',{},'Aplicado a $A=\\begin{pmatrix}-1&-4\\\\1&-1\\end{pmatrix}$:'));
    Pasos(c4,[
      {tex:'\\det(A-\\lambda I)=(-1-\\lambda)^2+4=\\lambda^2+2\\lambda+5=0',nota:'Ecuación característica.'},
      {tex:'\\lambda=\\dfrac{-2\\pm\\sqrt{4-20}}{2}=-1\\pm2i',nota:'Discriminante negativo: α=−1, β=2.'},
      {tex:'(A-(-1+2i)I)v=0\\ \\Longrightarrow\\ \\begin{pmatrix}-2i&-4\\\\1&-2i\\end{pmatrix}v=0',nota:'Sustituyendo λ=−1+2i en A−λI.'},
      {tex:'-2iv_1-4v_2=0\\ \\Longrightarrow\\ v=(2,-i)',nota:'De la fila 1: v₂=−iv₁/2; con v₁=2, v₂=−i.'},
      {tex:'v=(2,-i)=(2,0)+i(0,-1)\\ \\Longrightarrow\\ v_r=(2,0),\\ v_i=(0,-1)',nota:'Separando la parte real e imaginaria del vector propio.'},
      {tex:'x(t)=e^{-t}(2C_1\\cos2t+2C_2\\sin2t)',nota:'Componente x, sustituyendo α=−1, β=2, vᵣ, v_i en la fórmula general.'},
      {tex:'y(t)=e^{-t}(C_1\\sin2t-C_2\\cos2t)',nota:'Componente y, misma sustitución.'}
    ],{modId:'valores-propios',titulo:'Caso 3: A=[[−1,−4],[1,−1]], λ=−1±2i'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'en componentes, $x(t)=e^{-t}(2C_1\\cos2t+2C_2\\sin2t)$, $y(t)=e^{-t}(C_1\\sin2t-C_2\\cos2t)$. Derivando, $x\'=e^{-t}\\big[(-2C_1+4C_2)\\cos2t+(-4C_1-2C_2)\\sin2t\\big]$, y $-x-4y=e^{-t}\\big[(-2C_1+4C_2)\\cos2t+(-2C_2-4C_1)\\sin2t\\big]$ ✓ ($=x\'$). Análogamente $y\'=e^{-t}\\big[(2C_1+C_2)\\cos2t+(2C_2-C_1)\\sin2t\\big]$, y $x-y=e^{-t}\\big[(2C_1+C_2)\\cos2t+(2C_2-C_1)\\sin2t\\big]=y\'$ ✓.'));
    c4.append(el('p',{},'Como $\\alpha=-1\\lt0$, las trayectorias giran ',el('b',{},'hacia'),' el origen (foco estable): la oscilación de $\\cos2t$/$\\sin2t$ combinada con el decaimiento $e^{-t}$ traza una espiral que se cierra, visible en la card "Los tres retratos de fase".'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Sistemas X′=AX" (fórmula general de la solución real a partir de un vector propio complejo, en la animación de retrato de fase); matriz, ejemplo numérico y verificación son elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: los tres retratos de fase -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Los tres retratos de fase'));
    c5.append(el('p',{},'Cada trayectoria de las tres cards anteriores, dibujada en el plano $xy$ (no $x$ vs. $t$): nodo (caso 1), nodo impropio (caso 2, mismo aspecto cualitativo que un nodo porque λ es real) y foco en espiral (caso 3, porque λ es complejo).'));
    const cols=el('div',{class:'flexcols'});
    c5.append(cols);

    const colA=el('div',{style:'flex:1 1 15rem'});
    colA.append(el('p',{class:'note'},el('b',{},'Caso 1 — nodo')));
    const planoA=Plano(colA,{xMin:-2.5,xMax:2.5,yMin:-2.5,yMax:2.5,alto:230});
    planoA.dibujar(P=>{
      P.ejes();
      const trayA=(C1,C2)=>t=>[C1*Math.exp(6*t)+2*C2*Math.exp(t), C1*Math.exp(6*t)-3*C2*Math.exp(t)];
      P.parametrica(trayA(0,0.4),-2,0.35,{color:'--s1'});
      P.parametrica(trayA(0.05,0),-1,0.32,{color:'--s1'});
      P.parametrica(trayA(0.02,0.25),-2.5,0.35,{color:'--s6'});
    });
    cols.append(colA);

    const colB=el('div',{style:'flex:1 1 15rem'});
    colB.append(el('p',{class:'note'},el('b',{},'Caso 2 — repetido')));
    const planoB=Plano(colB,{xMin:-2.5,xMax:2.5,yMin:-2.5,yMax:2.5,alto:230});
    planoB.dibujar(P=>{
      P.ejes();
      const trayB=(C1,C2)=>t=>[Math.exp(2*t)*(C1+C2+C2*t), Math.exp(2*t)*(C1+C2*t)];
      P.parametrica(trayB(0.15,0.3),-3,0.3,{color:'--s1'});
      P.parametrica(trayB(-0.15,-0.3),-3,0.3,{color:'--s1'});
      P.parametrica(trayB(0.3,-0.1),-3,0.35,{color:'--s6'});
    });
    cols.append(colB);

    const colC=el('div',{style:'flex:1 1 15rem'});
    colC.append(el('p',{class:'note'},el('b',{},'Caso 3 — espiral')));
    const planoC=Plano(colC,{xMin:-2.5,xMax:2.5,yMin:-2.5,yMax:2.5,alto:230});
    planoC.dibujar(P=>{
      P.ejes();
      const trayC=(C1,C2)=>t=>[Math.exp(-t)*(2*C1*Math.cos(2*t)+2*C2*Math.sin(2*t)), Math.exp(-t)*(C1*Math.sin(2*t)-C2*Math.cos(2*t))];
      P.parametrica(trayC(1,0),0,5,{color:'--s1'});
      P.parametrica(trayC(0,1),0,5,{color:'--s6'});
    });
    cols.append(colC);

    c5.append(el('p',{class:'note'},'En el caso 1 (izquierda), las curvas se alejan del origen curvándose desde la dirección lenta $(2,-3)$ hacia la rápida $(1,1)$ — ambos valores propios positivos, nodo inestable. En el caso 2 (centro), sin oscilación, también se alejan pero sin una segunda dirección propia genuina — de ahí el nombre "nodo impropio". En el caso 3 (derecha), la espiral gira y se ',el('b',{},'contrae'),' hacia el origen porque $\\alpha=-1\\lt0$: si $\\alpha$ fuera positivo, la espiral se alejaría en vez de acercarse.'));
    c5.append(el('p',{class:'fuente'},'Fuente: elaboración propia (implementación interactiva), usando las fórmulas de X(t) verificadas por sustitución en las cards "Caso 1", "Caso 2" y "Caso 3" de este tema; las constantes C₁, C₂ elegidas para cada trayectoria son solo para que se vean dentro del gráfico, sin significado físico particular.'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));

    c6.append(el('details',{},
      el('summary',{},'Con la solución general del Caso 1 ($A=\\begin{pmatrix}4&2\\\\3&3\\end{pmatrix}$), hallar la solución particular con $\\mathbf{X}(0)=(3,-2)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$C_1+2C_2=3,\\qquad C_1-3C_2=-2$$'}),
        el('div',{class:'formula',html:'$$\\text{Restando: } 5C_2=5\\ \\Rightarrow\\ C_2=1,\\quad C_1=3-2(1)=1$$'}),
        el('div',{class:'formula',html:'$$x(t)=e^{6t}+2e^{t},\\qquad y(t)=e^{6t}-3e^{t}$$'}),
        el('p',{class:'note'},'Verificación: $\\mathbf{X}(0)=(1,1)+(2,-3)=(3,-2)$ ✓, la condición pedida.'))));

    c6.append(el('details',{},
      el('summary',{},'Con la solución general del Caso 3 ($A=\\begin{pmatrix}-1&-4\\\\1&-1\\end{pmatrix}$), hallar la solución particular con $\\mathbf{X}(0)=(4,0)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$x(0)=2C_1=4\\ \\Rightarrow\\ C_1=2, \\qquad y(0)=-C_2=0\\ \\Rightarrow\\ C_2=0$$'}),
        el('div',{class:'formula',html:'$$x(t)=4e^{-t}\\cos2t, \\qquad y(t)=2e^{-t}\\sin2t$$'}),
        el('p',{class:'note'},'Con $C_2=0$ la solución queda más simple: es la trayectoria azul de la card "Los tres retratos de fase" (caso 3), escalada.'))));

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicios de elaboración propia, aplicando las soluciones generales ya verificadas en las cards "Caso 1: valores propios reales distintos" y "Caso 3: valores propios complejos conjugados" con otras condiciones iniciales.'));
    sec.append(c6);
  }});
