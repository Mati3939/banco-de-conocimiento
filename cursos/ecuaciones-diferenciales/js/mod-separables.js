registerModule({id:'separables',title:'Variables separables',unidad:'I',semanas:[2],evaluacion:['control-1','certamen-1'],
  lead:'La primera técnica de resolución: cuándo una EDO se puede reescribir para dejar toda la x de un lado y toda la y del otro, y de ahí integrar directo. Sigue el apunte del profesor Miguel Borbolla paso a paso.',
  build(sec){

    /* -------- Card 1: actividad inicial, crecimiento del dinero -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Actividad inicial: crecimiento del dinero'));
    c1.append(el('p',{},'El apunte arranca con este problema: a un capital se le aplica un interés $r$ compuesto continuamente, de modo que la razón a la que cambia el dinero $S=S(t)$ es proporcional al dinero presente:'));
    Pasos(c1,[
      {tex:'\\dfrac{dS}{dt}=rS',nota:'Planteamiento: la EDO que modela el interés compuesto continuo.'},
      {tex:'\\dfrac{dS}{S}=r\\,dt',nota:'Separando variables: toda la S (con su diferencial) a la izquierda, todo el resto a la derecha.'},
      {tex:'\\int\\dfrac{dS}{S}=\\int r\\,dt\\ \\Longrightarrow\\ \\ln|S|=rt+C_1',nota:'Integrando ambos lados.'},
      {tex:'S=e^{rt+C_1}=e^{C_1}e^{rt}=k\\,e^{rt}',nota:'Despejando S (k=e^{C₁}>0; incluyendo k=0 se recupera también la solución trivial S=0).'},
      {tex:'S(0)=C\\ \\Longrightarrow\\ k=C\\ \\Longrightarrow\\ S(t)=Ce^{rt}',nota:'Usando el valor conocido S(0)=C (el capital inicial), queda la función de crecimiento del dinero.'}
    ],{modId:'separables',titulo:'Actividad inicial: crecimiento del dinero, dS/dt=rS'});
    c1.append(el('p',{class:'note'},'Esta misma EDO — una cantidad que cambia en proporción a sí misma — es el patrón detrás de todo crecimiento (o decaimiento) exponencial, y reaparece más adelante en este tema (modelo de crecimiento exponencial, sección 6.1 del apunte).'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 2 (Actividad inicial: crecimiento del dinero), Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: definición -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Definición'));
    c2.append(el('p',{},'Una EDO recibe el nombre de ',el('b',{},'variables separables'),' cuando puede escribirse de la forma:'));
    c2.append(el('div',{class:'formula',html:'$$y\'=f(x)g(y)\\qquad\\text{o, equivalentemente,}\\qquad \\dfrac{1}{g(y)}\\,dy=f(x)\\,dx$$'}));
    c2.append(el('p',{},'El apunte trae dos listas para afinar el ojo — cuáles ecuaciones ',el('b',{},'son'),' de este tipo y cuáles no, aunque a primera vista se parezcan:'));
    c2.append(el('p',{class:'note'},el('b',{},'Son de variables separables:')));
    c2.append(el('ol',{},
      el('li',{html:'$\\dfrac{dy}{dx}=-\\dfrac{x}{y}$ — ya está separada: $y\\,dy=-x\\,dx$.'}),
      el('li',{html:'$3x(y^2+1)\\,dx+y(x^2+2)\\,dy=0$ — se reordena a $\\dfrac{y}{y^2+1}\\,dy=-\\dfrac{3x}{x^2+2}\\,dx$.'}),
      el('li',{html:'$y\'=\\dfrac{x+xy^2}{4y}$ — el numerador factoriza como $x(1+y^2)$, y el denominador $4y$ es puramente de y: $f(x)=x$, $g(y)=\\dfrac{1+y^2}{4y}$.'})
    ));
    c2.append(el('p',{class:'note'},el('b',{},'No son de variables separables:')));
    c2.append(el('ol',{},
      el('li',{html:'$\\dfrac{dy}{dx}=x-y$ — es una diferencia, no un producto $f(x)g(y)$.'}),
      el('li',{html:'$\\dfrac{dy}{dx}=-\\dfrac{x+2y}{x-5y}$ — numerador y denominador mezclan x e y linealmente; no se puede aislar una función pura de x de una pura de y.'}),
      el('li',{html:'$y\'=\\dfrac{x+xy^2}{x+4y}$ — el numerador sí factoriza como $x(1+y^2)$, pero el denominador $x+4y$ NO es puramente de y (a diferencia del ítem 3 de la lista de arriba, donde el denominador era $4y$): no se puede separar.'})
    ));
    c2.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 3 (definición y las dos listas de ejemplos), Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: la técnica en 3 (4) pasos -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'La técnica de resolución'));
    c3.append(el('p',{},'El apunte da el procedimiento en estos pasos:'));
    c3.append(el('div',{class:'card',style:'background:color-mix(in srgb, var(--s1) 8%, var(--surface)); border-left:3px solid var(--s1)'},
      el('p',{},el('b',{},'Paso 1 — el que se olvida: '),'cada solución $y=y_0$ de la ecuación $g(y)=0$ es TAMBIÉN una solución de la EDO. Son las soluciones "constantes" (o singulares), y se pierden si uno divide por $g(y)$ sin fijarse antes en sus raíces.')));
    c3.append(el('ol',{},
      el('li',{},el('b',{},'Paso 2 — separar variables: '),el('span',{html:'se reordena a $\\dfrac{1}{g(y)}\\,dy=f(x)\\,dx$.'})),
      el('li',{},el('b',{},'Paso 3 — integrar ambos lados: '),el('span',{html:'se obtiene una relación $G(y)=F(x)+C$, la solución general implícita.'})),
      el('li',{},el('b',{},'Paso 4 — despejar y, si es posible: '),'para dejar la solución general en forma explícita.')
    ));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 3.1 (Técnica de resolución de una EDO de variables separables), Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: Ejemplo 1 y Ejemplo 2 del apunte -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejemplo 1 y Ejemplo 2 del apunte'));
    c4.append(el('p',{},el('b',{},'Ejemplo 1: '),'resolver $(x^2+4)\\dfrac{dy}{dx}=xy$.'));
    Pasos(c4,[
      {tex:'(x^2+4)\\dfrac{dy}{dx}=xy\\ \\Longrightarrow\\ \\dfrac{dy}{dx}=\\dfrac{xy}{x^2+4}',nota:'Es de variables separables: f(x)=x/(x²+4), g(y)=y.'},
      {tex:'\\text{Paso 1: }y=0\\text{ es solución}',nota:'Raíz de g(y)=y=0 — no hay que perderla.'},
      {tex:'\\text{Paso 2: }\\dfrac{dy}{y}=\\dfrac{x\\,dx}{x^2+4}',nota:'Separando variables.'},
      {tex:'\\text{Paso 3: }\\ln|y|=\\tfrac12\\ln(x^2+4)+C',nota:'Integrando ambos lados (la derecha con sustitución u=x²+4).'},
      {tex:'\\text{Paso 4: }y=K\\sqrt{x^2+4}',nota:'Despejando y (K=±e^C, y K=0 recupera la solución del paso 1) — solución general explícita.'}
    ],{modId:'separables',titulo:'Ejemplo 1 del apunte: (x²+4)dy/dx=xy'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'con $y=K\\sqrt{x^2+4}$, $y\'=\\dfrac{Kx}{\\sqrt{x^2+4}}$. Lado izquierdo: $(x^2+4)y\'=(x^2+4)\\dfrac{Kx}{\\sqrt{x^2+4}}=Kx\\sqrt{x^2+4}$. Lado derecho: $xy=x\\cdot K\\sqrt{x^2+4}=Kx\\sqrt{x^2+4}$. Coinciden.'));
    c4.append(el('p',{},el('b',{},'Ejemplo 2: '),'para $y\'=\\dfrac{x(1+y)}{1+x^2}$, (1) encontrar la solución general y (2) la particular con $y(0)=4$.'));
    Pasos(c4,[
      {tex:'\\dfrac{dy}{1+y}=\\dfrac{x\\,dx}{1+x^2}',nota:'Separando variables.'},
      {tex:'\\int\\dfrac{dy}{1+y}=\\int\\dfrac{x\\,dx}{1+x^2}\\ \\Longrightarrow\\ \\ln(1+y)=\\tfrac12\\ln(1+x^2)+C',nota:'Integrando ambos lados (asumiendo 1+y>0).'},
      {tex:'\\ln(1+y)=\\ln\\big(D\\sqrt{1+x^2}\\big),\\quad D=e^C',nota:'Reescribiendo la constante como D=e^C>0, para meter todo dentro de un solo logaritmo.'},
      {tex:'y=D\\sqrt{1+x^2}-1',nota:'Despejando y: solución general explícita.'},
      {tex:'y(0)=4\\ \\Longrightarrow\\ 4=D\\cdot1-1\\ \\Longrightarrow\\ D=5',nota:'Imponiendo la condición inicial del enunciado.'},
      {tex:'y=5\\sqrt{1+x^2}-1',nota:'Solución particular que cumple y(0)=4.'}
    ],{modId:'separables',titulo:'Ejemplo 2 del apunte: y′=x(1+y)/(1+x²), y(0)=4'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución: '),'con $y=5\\sqrt{1+x^2}-1$, $y\'=\\dfrac{5x}{\\sqrt{1+x^2}}$. Lado derecho: $\\dfrac{x(1+y)}{1+x^2}=\\dfrac{x\\cdot5\\sqrt{1+x^2}}{1+x^2}=\\dfrac{5x}{\\sqrt{1+x^2}}$ — coincide con y′. Y $y(0)=5\\sqrt1-1=4$, la condición pedida.'));
    c4.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 3.2 (Ejemplos desarrollados 1 y 2), Ecuaciones Diferenciales, Canvas 2026-2. La misma EDO del Ejemplo 2 es, además, la pregunta 2 de la Pauta Control 1 semana 1 2026 (con y(0)=e−1 en vez de y(0)=4) — ver el tema "Qué es una EDO".'));
    sec.append(c4);

    /* -------- Card 5: ley de enfriamiento de Newton -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ley de enfriamiento de Newton'));
    c5.append(el('p',{},'Actividad de modelación resuelta del apunte: "una habitación se mantiene a 70°, y un objeto se enfría de 350° a 150° en 45 minutos. ¿Qué tiempo se necesitará para enfriar dicho objeto hasta 80°?"'));
    Pasos(c5,[
      {tex:'\\dfrac{dT}{dt}=k(T-70)',nota:'Ley de enfriamiento de Newton: la tasa de cambio de T es proporcional a la diferencia con la temperatura ambiente (70°).'},
      {tex:'\\dfrac{dT}{T-70}=k\\,dt\\ \\Longrightarrow\\ \\ln(T-70)=kt+C',nota:'Separando e integrando.'},
      {tex:'T=70+Ce^{kt}',nota:'Despejando T (relabeling e^C como C).'},
      {tex:'T(0)=350\\ \\Rightarrow\\ 350=70+C\\ \\Rightarrow\\ C=280',nota:'Usando la temperatura inicial.'},
      {tex:'T(45)=150\\ \\Rightarrow\\ 150=70+280e^{45k}\\ \\Rightarrow\\ e^{45k}=\\dfrac27',nota:'Usando el dato de los 45 minutos para hallar k.'},
      {tex:'k=\\dfrac{\\ln(2/7)}{45}\\approx-0{,}028\\ \\Rightarrow\\ T(t)=70+280e^{-0{,}028t}',nota:'Despejando k y armando la función completa de enfriamiento.'},
      {tex:'80=70+280e^{-0{,}028t}\\ \\Rightarrow\\ e^{-0{,}028t}=\\dfrac1{28}',nota:'Buscando t para T=80°.'},
      {tex:'t=\\dfrac{\\ln(28)}{0{,}028}\\approx119\\text{ min}',nota:'Despejando t: aproximadamente 119 minutos.'}
    ],{modId:'separables',titulo:'Ley de enfriamiento de Newton: T=70+280e^(−0,028t)'});
    const planoEnf=Plano(c5,{xMin:0,xMax:250,yMin:50,yMax:380,alto:280});
    planoEnf.dibujar(P=>{
      P.ejes();
      P.curva(()=>70,{color:'--muted',grosor:1,guiones:true});
      P.curva(t=>70+280*Math.exp(-0.028*t),{color:'--s1',grosor:2.5});
      P.punto(45,150,{color:'--s4',etiqueta:'(45, 150°)'});
      P.punto(119,80,{color:'--s6',etiqueta:'(119, 80°)'});
    });
    c5.append(el('p',{class:'note'},'La curva (azul) parte en 350° y se acerca cada vez más despacio a la línea punteada de 70° (temperatura ambiente) sin llegar nunca a tocarla — así se ve, geométricamente, que $\\lim_{t\\to\\infty}T(t)=70$. Los puntos marcados son los dos datos usados: a los 45 min el objeto está a 150°, y llega a 80° recién cerca de los 119 min.'));
    c5.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 4.1 (Ley de enfriamiento de Newton), Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: sobre el peso de una persona -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Sobre el peso de una persona'));
    c6.append(el('p',{},'Segunda actividad de modelación del apunte: $\\dfrac{dw}{dt}=\\dfrac{K}{3500}-\\dfrac{17{,}5}{3500}w$, con $w$ el peso en libras, $t$ en días y $K$ el consumo diario de calorías (constante, con $K-17{,}5w\\gt0$). (a) Hallar la solución general explícita. (b) Una persona de 180 libras comienza una dieta de 2000 calorías diarias: ¿cuánto tardará en perder 10 libras?'));
    Pasos(c6,[
      {tex:'\\dfrac{dw}{dt}=\\dfrac{1}{3500}(K-17{,}5w)',nota:'Reescribiendo el lado derecho con denominador común.'},
      {tex:'\\dfrac{dw}{K-17{,}5w}=\\dfrac{1}{3500}\\,dt',nota:'Separando variables.'},
      {tex:'-\\dfrac{1}{17{,}5}\\ln(K-17{,}5w)=\\dfrac{1}{3500}t+C_1',nota:'Integrando (la izquierda con sustitución u=K−17,5w, du=−17,5 dw).'},
      {tex:'K-17{,}5w=C_3e^{-0{,}005t}',nota:'Despejando: se multiplica por −17,5 y se exponencia (0,005 = 17,5/3500).'},
      {tex:'w=\\dfrac{K}{17{,}5}+Ce^{-0{,}005t}',nota:'Solución general explícita (parte a): se despeja w y se relabelea la constante.'}
    ],{modId:'separables',titulo:'Peso de una persona: solución general de dw/dt=(K−17,5w)/3500'});
    c6.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución (vale para cualquier C): '),'con $w=\\dfrac{K}{17{,}5}+Ce^{-0{,}005t}$, $\\dfrac{dw}{dt}=-0{,}005Ce^{-0{,}005t}$. Y $\\dfrac{K-17{,}5w}{3500}=\\dfrac{K-17{,}5(\\frac{K}{17{,}5}+Ce^{-0{,}005t})}{3500}=\\dfrac{-17{,}5Ce^{-0{,}005t}}{3500}=-0{,}005Ce^{-0{,}005t}$ — coincide con dw/dt para cualquier valor de C, así que la solución general está correctamente derivada.'));
    c6.append(el('p',{},el('b',{},'Parte (b): '),'con $K=2000$, $w(0)=180$: el apunte reemplaza directamente y da $C\\approx63{,}72$, con lo que $w=\\dfrac{2000}{17{,}5}+63{,}72\\,e^{-0{,}005t}$, y despejando $t$ para $w=170$ obtiene $t\\approx26{,}84$ días (≈27 días).'));
    c6.append(el('p',{class:'note'},el('b',{},'Nota de verificación: '),'recalculando C directamente de $w(0)=180=\\dfrac{2000}{17{,}5}+C$ da $C=180-114{,}29\\approx65{,}71$, no los $63{,}72$ que escribe el apunte — hay una pequeña inconsistencia aritmética en el original del profesor. La fórmula general (verificada arriba) es correcta para cualquier C; se deja registrada la cifra del apunte porque es la que aparece efectivamente en la fuente, junto con esta observación para que no genere confusión al recalcular.'));
    c6.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, sección 4.2 (Sobre el peso de una persona), Ecuaciones Diferenciales, Canvas 2026-2.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios'));
    c7.append(el('p',{class:'note'},'Primero los propuestos del apunte (con su propia solución), después una selección de ejercicios_variables_separables.pdf resueltos acá y verificados por sustitución.'));

    const mk=(resumen,solHtml)=>{ c7.append(el('details',{},el('summary',{},resumen),el('div',{},solHtml))); };

    mk('Apunte, ejercicio 1 — Dada y′=y(1−y): (a) solución general explícita; (b) solución particular con y(0)=1/2.',
      el('div',{},
        el('div',{class:'formula',html:'$$\\text{(a) }y=\\dfrac{c}{c+e^{-x}}\\qquad\\text{(b) }y=\\dfrac{1}{1+e^{-x}}$$'}),
        el('p',{class:'note'},'La misma familia de soluciones $y=\\dfrac{1}{1+Ke^{-x}}$ (equivalente a la del apunte con $K=1/c$) es, además, la pregunta 2 de una Pauta Control 1 de Ecuaciones Diferenciales (archivo PAUTA_CONTROL 1_EDO_SEM2_2026 — comparte el encabezado "Primer Semestre 2026" con la pauta de la semana 1, pero no se pudo confirmar en qué semana se publicó este archivo en Canvas), que pide demostrar exactamente que esta función resuelve y′=y(1−y).')));

    mk('Apunte, ejercicio 2a — Determinar la solución general de dy/dx = −(4x+xy²)/(y+x²y).',
      el('div',{},
        el('div',{class:'formula',html:'$$(1+x^2)(4+y^2)=C$$'}),
        el('p',{class:'note'},'Se separa como $\\dfrac{y\\,dy}{4+y^2}=-\\dfrac{x\\,dx}{1+x^2}$ e integrando ambos lados con sustitución simple queda $\\ln(4+y^2)=-\\ln(1+x^2)+2C_1$, es decir $(1+x^2)(4+y^2)=C$.')));

    mk('Apunte, ejercicio 3 — Comprobar que la curva que pasa por (1,0), con pendiente y′=(y−1)/(x²+x), es y(1+x)=1−x.',
      el('div',{},
        el('p',{},'Despejando, $y=\\dfrac{1-x}{1+x}$. Verificación en (1,0): $y(1)=\\dfrac{1-1}{1+1}=0$ ✓.'),
        el('div',{class:'formula',html:'$$y\'=\\dfrac{-(1+x)-(1-x)}{(1+x)^2}=\\dfrac{-2}{(1+x)^2}$$'}),
        el('div',{class:'formula',html:'$$\\dfrac{y-1}{x^2+x}=\\dfrac{\\frac{1-x}{1+x}-1}{x(x+1)}=\\dfrac{\\frac{-2x}{1+x}}{x(x+1)}=\\dfrac{-2}{(1+x)^2}$$'}),
        el('p',{class:'note'},'Los dos lados coinciden: la pendiente de la curva es, en efecto, $(y-1)/(x^2+x)$ en todo punto.')));

    mk('Apunte, ejercicio 4 — Toda EDO y′=f(ax+by+c) se reduce a separable con u=ax+by+c. Aplicarlo a dy/dx = 2+√(y−2x+3).',
      el('div',{},
        el('p',{},'Con $u=y-2x+3$ (a=−2, b=1, c=3): $\\dfrac{du}{dx}=\\dfrac{dy}{dx}-2$, así que la EDO se vuelve $\\dfrac{du}{dx}+2=2+\\sqrt u$, es decir $\\dfrac{du}{dx}=\\sqrt u$ — ya separable.'),
        el('div',{class:'formula',html:'$$\\dfrac{du}{\\sqrt u}=dx\\ \\Longrightarrow\\ 2\\sqrt u=x+c\\ \\Longrightarrow\\ 4u=(x+c)^2$$'}),
        el('div',{class:'formula',html:'$$4(y-2x+3)=(x+c)^2$$'})));

    mk('Apunte, sección 6.1 — Modelo de crecimiento exponencial: 100 moscas al segundo día, 300 al cuarto día. ¿Población original?',
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dP}{dt}=kP\\ \\Longrightarrow\\ P(t)=P_0e^{kt}$$'}),
        el('p',{},'Con $P(2)=100$ y $P(4)=300$: dividiendo, $e^{2k}=3$, así que $P_0=100/e^{2k}=100/3\\approx33{,}3$.'),
        el('p',{class:'note'},'Respuesta del apunte: aproximadamente 33 moscas.')));

    mk('Apunte, sección 6.2 — Modelo de crecimiento logístico: población limitada a 800.000; 400.000 en 1995, 500.000 en 2000. ¿Población en 2005?',
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dP}{dt}=kP(M-P)$$'}),
        el('p',{class:'note'},'Respuesta del apunte: aproximadamente 589.000 habitantes.')));

    mk('ejercicios_variables_separables.pdf (8) — (1+x²)dy = x(1+y²)dx.',
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dy}{1+y^2}=\\dfrac{x\\,dx}{1+x^2}\\ \\Longrightarrow\\ \\arctan(y)=\\tfrac12\\ln(1+x^2)+C$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente, $\\dfrac{y\'}{1+y^2}=\\dfrac{x}{1+x^2}$, que reordenado es la EDO original.')));

    mk('ejercicios_variables_separables.pdf (11) — dy/dx = x³/(1+y²).',
      el('div',{},
        el('div',{class:'formula',html:'$$(1+y^2)\\,dy=x^3\\,dx\\ \\Longrightarrow\\ y+\\dfrac{y^3}{3}=\\dfrac{x^4}{4}+C$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente, $(1+y^2)y\'=x^3$, exactamente la EDO original.')));

    mk('ejercicios_variables_separables.pdf (18) — y′ = y(1−y)/x, x≠0.',
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{dy}{y(1-y)}=\\dfrac{dx}{x}\\ \\Longrightarrow\\ \\ln\\Big|\\dfrac{y}{1-y}\\Big|=\\ln|x|+C\\ \\Longrightarrow\\ y=\\dfrac{Kx}{1+Kx}$$'}),
        el('p',{class:'note'},'Misma estructura logística que el ejercicio 1 del apunte, ahora con x en vez de $e^{-x}$ como variable de la familia.')));

    c7.append(el('p',{class:'fuente'},'Fuente: apunte "Variables separables", profesor Miguel Borbolla, secciones 5 y 6 (Ejercicios propuestos y Actividades propuestas de modelado); ejercicios (8), (11) y (18) de "ejercicios_variables_separables.pdf", Canvas 2026-2 — resueltos y verificados acá.'));
    sec.append(c7);
  }});
