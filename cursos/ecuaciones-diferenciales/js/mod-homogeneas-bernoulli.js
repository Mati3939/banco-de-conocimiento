registerModule({id:'homogeneas-bernoulli',title:'Homogéneas, coeficientes constantes y Bernoulli',unidad:'I',semanas:[4],evaluacion:['control-2','certamen-1'],
  lead:'Tres técnicas de sustitución que reducen una EDO a algo ya conocido: homogéneas y coeficientes constantes se vuelven separables con y=vx; Bernoulli se vuelve lineal con w=y^(1−n).',
  build(sec){

    /* -------- Card 1: función homogénea de grado n -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Función homogénea de grado n'));
    c1.append(el('p',{},'Una función $f(x,y)$ es homogénea de grado $n$ si, al escalar ambas variables por el mismo factor $t$, el resultado escala por $t^n$:'));
    c1.append(el('div',{class:'formula',html:'$$f(tx,ty)=t^n f(x,y)$$'}));
    c1.append(el('p',{},'Atajo rápido para reconocerla: sumar los exponentes de x e y en cada término (una raíz cuenta como exponente fraccionario) — si todos los términos dan el mismo total, la función es homogénea de ese grado. Ejemplos:'));
    c1.append(el('ol',{},
      el('li',{html:'$f(x,y)=x^2+xy$: cada término suma grado 2 ($x^2$ y $x\\cdot y$). Comprobando: $f(tx,ty)=t^2x^2+t^2xy=t^2(x^2+xy)=t^2f(x,y)$ — homogénea de grado 2.'}),
      el('li',{html:'$f(x,y)=\\sqrt{x^2+y^2}$: $f(tx,ty)=\\sqrt{t^2x^2+t^2y^2}=\\sqrt{t^2}\\sqrt{x^2+y^2}=|t|\\,f(x,y)$ — homogénea de grado 1 (para t>0).'}),
      el('li',{html:'$f(x,y)=x^2+y$ NO es homogénea: el primer término es de grado 2 y el segundo de grado 1 — no hay un n único que sirva para los dos a la vez.'})
    ));
    c1.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 4 ("Ecuaciones diferenciales homogéneas"); definición estándar (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: EDO homogénea y la sustitución -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'EDO homogénea y la sustitución'));
    c2.append(el('p',{},'Una EDO de primer orden es ',el('b',{},'homogénea'),' si se puede escribir $\\dfrac{dy}{dx}=f(x,y)$ con $f$ homogénea de grado 0 (equivalente: escrita como $M\\,dx+N\\,dy=0$, esto pasa cuando M y N son homogéneas del MISMO grado). La sustitución $y=vx$, con $v$ una nueva función de x, siempre la reduce a una separable:'));
    Pasos(c2,[
      {tex:'y=vx\\ \\Longrightarrow\\ dy=v\\,dx+x\\,dv',nota:'Se propone y=vx (v función de x) y se diferencia con la regla del producto.'},
      {tex:'\\dfrac{dy}{dx}=v+x\\dfrac{dv}{dx}',nota:'Dividiendo por dx: así se ve dy/dx en términos de v.'},
      {tex:'f(x,y)=f(x,vx)=f(1,v)',nota:'Como f es homogénea de grado 0, se puede sacar x de adentro usando t=1/x en la definición: f(x,vx)=f(1,v) — queda una función de v sola.'},
      {tex:'v+x\\dfrac{dv}{dx}=f(1,v)\\ \\Longrightarrow\\ x\\dfrac{dv}{dx}=f(1,v)-v',nota:'Igualando con la EDO original (dy/dx=f(x,y)) y despejando.'},
      {tex:'\\dfrac{dv}{f(1,v)-v}=\\dfrac{dx}{x}',nota:'Separable en v y x — se resuelve con la técnica del tema "Variables separables", y al final se deshace la sustitución con v=y/x.'}
    ],{modId:'homogeneas-bernoulli',titulo:'y=vx transforma una homogénea en separable'});
    c2.append(el('p',{class:'fuente'},'Fuente: derivación estándar de la sustitución y=vx (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: ejemplo resuelto de homogénea -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Ejemplo resuelto de homogénea'));
    c3.append(el('p',{},'Un problema real de Control 1: la Pauta Control 1 EDO (PAUTA 02-2024), pregunta 2, pide resolver $(x+y)y\'+x-y=0$. La pauta original lo resuelve con una sustitución algebraica ad hoc; acá se resuelve con el método general de este tema, porque la ecuación es homogénea: escrita como $(x-y)\\,dx+(x+y)\\,dy=0$, tanto $M=x-y$ como $N=x+y$ son homogéneas de grado 1.'));
    Pasos(c3,[
      {tex:'\\dfrac{dy}{dx}=\\dfrac{y-x}{x+y}',nota:'Despejando y′ de (x+y)y′+x−y=0.'},
      {tex:'y=vx\\ \\Longrightarrow\\ v+x\\dfrac{dv}{dx}=\\dfrac{vx-x}{x+vx}=\\dfrac{v-1}{1+v}',nota:'Sustituyendo y=vx (dy/dx=v+x dv/dx, card "EDO homogénea y la sustitución") y simplificando x.'},
      {tex:'x\\dfrac{dv}{dx}=\\dfrac{v-1}{1+v}-v=\\dfrac{-(1+v^2)}{1+v}',nota:'Despejando x dv/dx.'},
      {tex:'\\dfrac{1+v}{1+v^2}\\,dv=-\\dfrac{dx}{x}',nota:'Separando variables.'},
      {tex:'\\arctan(v)+\\tfrac12\\ln(1+v^2)=-\\ln|x|+C',nota:'Integrando: 1/(1+v²) da arctan(v), y v/(1+v²) da (1/2)ln(1+v²).'},
      {tex:'\\arctan\\Big(\\dfrac yx\\Big)+\\tfrac12\\ln\\Big(\\dfrac{x^2+y^2}{x^2}\\Big)+\\ln|x|=C',nota:'Deshaciendo la sustitución v=y/x.'},
      {tex:'\\arctan\\Big(\\dfrac yx\\Big)+\\tfrac12\\ln(x^2+y^2)=C',nota:'El −ln|x| de adentro del logaritmo se cancela con el +ln|x| de afuera: queda la solución general.'}
    ],{modId:'homogeneas-bernoulli',titulo:'(x+y)y′+x−y=0, Control 1 real'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación (derivando implícitamente): '),'de $\\arctan(y/x)+\\frac12\\ln(x^2+y^2)=C$, derivando respecto de x: $\\dfrac{y\'x-y}{x^2+y^2}+\\dfrac{x+yy\'}{x^2+y^2}=0$, es decir $y\'(x+y)+(x-y)=0$ — exactamente $(x+y)y\'+x-y=0$, la ecuación original. Se verificó además con una segunda sustitución independiente (x=uy en vez de y=vx), que llega a la misma familia de soluciones por otro camino.'));
    c3.append(el('p',{class:'note'},el('b',{},'Curiosidad geométrica: '),'en coordenadas polares ($x=r\\cos\\theta$, $y=r\\sin\\theta$), la solución es $\\theta+\\ln r=C$, es decir $r=Ae^{-\\theta}$ — una espiral logarítmica. El campo de direcciones y una de esas espirales (con A=1):'));
    const planoHom=Plano(c3,{xMin:-4,xMax:4,yMin:-4,yMax:4,alto:300});
    planoHom.dibujar(P=>{
      P.ejes();
      P.campo((x,y)=>(y-x)/(x+y));
      P.parametrica(t=>{const r=Math.exp(-t); return [r*Math.cos(t),r*Math.sin(t)];},-1.3,1.3,{color:'--s1',grosor:2.5});
    });
    c3.append(el('p',{class:'note'},'Los trazos grises son el campo de direcciones (la pendiente y′ en cada punto, según la ecuación original); la curva azul es la espiral $r=e^{-\\theta}$, una de las soluciones — se ve cómo en cada punto es tangente a los trazos del campo.'));
    c3.append(el('p',{class:'fuente'},'Fuente: Pauta Control 1 EDO (PAUTA 02-2024), pregunta 2, Canvas 2026-2 — la pauta original resuelve esta misma ecuación con una sustitución algebraica distinta (agrupando u=y−1, w=1+x) y llega a una expresión implícita de aspecto diferente; acá se resolvió con el método estándar de sustitución homogénea y=vx de la card "EDO homogénea y la sustitución", verificado de forma independiente por derivación implícita y por una segunda sustitución.'));
    sec.append(c3);

    /* -------- Card 4: coeficientes constantes -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Coeficientes constantes'));
    c4.append(el('p',{},'Un caso emparentado con las homogéneas:'));
    c4.append(el('div',{class:'formula',html:'$$\\dfrac{dy}{dx}=\\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$$'}));
    c4.append(el('p',{},'Si $c_1=c_2=0$ ya es homogénea (card "EDO homogénea y la sustitución"). Si no, hay dos ramas según cómo sean las rectas $a_1x+b_1y+c_1=0$ y $a_2x+b_2y+c_2=0$:'));
    c4.append(el('p',{},el('b',{},'Las rectas se cortan '),'en un punto $(h,k)$: se traslada el origen a ese punto, $X=x-h$, $Y=y-k$. Como $(h,k)$ anula ambas rectas, los términos constantes desaparecen:'));
    c4.append(el('div',{class:'formula',html:'$$\\dfrac{dY}{dX}=\\dfrac{a_1X+b_1Y}{a_2X+b_2Y}$$'}));
    c4.append(el('p',{},'homogénea en X, Y — resoluble con $Y=vX$ (mismo método de la card "EDO homogénea y la sustitución"), y al final se deshace el traslado con $x=X+h$, $y=Y+k$.'));
    c4.append(el('p',{},el('b',{},'Las rectas son paralelas: '),'no hay punto de intersección — entonces $a_2x+b_2y=k(a_1x+b_1y)$ para algún k constante. Sirve la sustitución $u=a_1x+b_1y$:'));
    Pasos(c4,[
      {tex:'u=a_1x+b_1y\\ \\Longrightarrow\\ \\dfrac{du}{dx}=a_1+b_1\\dfrac{dy}{dx}\\ \\Longrightarrow\\ \\dfrac{dy}{dx}=\\dfrac{1}{b_1}\\Big(\\dfrac{du}{dx}-a_1\\Big)',nota:'Se despeja dy/dx en términos de du/dx.'},
      {tex:'\\dfrac{1}{b_1}\\Big(\\dfrac{du}{dx}-a_1\\Big)=\\dfrac{u+c_1}{ku+c_2}',nota:'Sustituyendo en la EDO original: el numerador es a₁x+b₁y+c₁=u+c₁, y el denominador a₂x+b₂y+c₂=k(a₁x+b₁y)+c₂=ku+c₂ (por ser paralelas).'},
      {tex:'\\dfrac{du}{dx}=a_1+b_1\\dfrac{u+c_1}{ku+c_2}',nota:'Despejando du/dx: el lado derecho depende solo de u — separable en u y x.'}
    ],{modId:'homogeneas-bernoulli',titulo:'Rectas paralelas: sustitución u=a₁x+b₁y'});
    c4.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 4 ("Ecuaciones diferenciales con coeficientes constantes"); método estándar (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: Bernoulli -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Bernoulli'));
    c5.append(el('p',{},'Otra sustitución clásica. Una EDO de Bernoulli tiene la forma:'));
    c5.append(el('div',{class:'formula',html:'$$y\'+P(x)y=Q(x)y^n$$'}));
    c5.append(el('p',{},'con $n$ una constante (no necesariamente entero). La sustitución $w=y^{1-n}$ la vuelve lineal:'));
    Pasos(c5,[
      {tex:'y^{-n}y\'+P(x)y^{1-n}=Q(x)',nota:'Se divide toda la ecuación por y^n.'},
      {tex:'w=y^{1-n}\\ \\Longrightarrow\\ \\dfrac{dw}{dx}=(1-n)y^{-n}\\dfrac{dy}{dx}\\ \\Longrightarrow\\ y^{-n}y\'=\\dfrac{1}{1-n}\\dfrac{dw}{dx}',nota:'Se propone w=y^(1−n) y se deriva con la regla de la cadena.'},
      {tex:'\\dfrac{1}{1-n}\\dfrac{dw}{dx}+P(x)w=Q(x)',nota:'Sustituyendo en la ecuación del paso anterior (y^(1−n)=w).'},
      {tex:'\\dfrac{dw}{dx}+(1-n)P(x)\\,w=(1-n)Q(x)',nota:'Multiplicando por (1−n): ya es una EDO LINEAL en w, resoluble con factor integrante (tema "Lineal de primer orden y factor integrante").'},
      {tex:'y=w^{\\frac{1}{1-n}}',nota:'Una vez resuelta la lineal para w(x), se deshace la sustitución para volver a y.'}
    ],{modId:'homogeneas-bernoulli',titulo:'w=y^(1−n) linealiza Bernoulli'});
    c5.append(el('p',{class:'note'},el('b',{},'Advertencia: '),'$n=0$ da $y\'+Py=Q$ (ya lineal) y $n=1$ da $y\'+(P-Q)y=0$ (lineal homogénea) — ambos son casos triviales que NO necesitan la sustitución $w=y^{1-n}$.'));
    c5.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 4 ("Ecuaciones diferenciales de Bernoulli"); derivación estándar de la sustitución w=y^(1−n) (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c5);

    /* -------- Card 6: ejemplo resuelto de Bernoulli -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejemplo resuelto de Bernoulli'));
    c6.append(el('p',{},'Resolver el PVI $y\'+\\dfrac yx=xy^2$, $y(1)=1$ (con $x\\gt0$).'));
    Pasos(c6,[
      {tex:'n=2\\ \\Longrightarrow\\ w=y^{1-2}=y^{-1}=\\dfrac1y',nota:'Se identifica P(x)=1/x, Q(x)=x, n=2, y se define w=1/y.'},
      {tex:'\\dfrac{dw}{dx}+(1-2)\\dfrac1x w=(1-2)x\\ \\Longrightarrow\\ \\dfrac{dw}{dx}-\\dfrac1x w=-x',nota:'Aplicando la fórmula de la card "Bernoulli" con (1−n)=−1.'},
      {tex:'\\mu(x)=e^{\\int -\\frac1x dx}=e^{-\\ln x}=\\dfrac1x',nota:'Factor integrante de esta lineal en w (tema "Lineal de primer orden y factor integrante").'},
      {tex:'\\dfrac{d}{dx}\\Big[\\dfrac wx\\Big]=-x\\cdot\\dfrac1x=-1\\ \\Longrightarrow\\ \\dfrac wx=-x+C',nota:'Multiplicando por μ e integrando.'},
      {tex:'w=-x^2+Cx\\ \\Longrightarrow\\ y=\\dfrac1w=\\dfrac{1}{Cx-x^2}',nota:'Despejando w y deshaciendo la sustitución w=1/y.'},
      {tex:'y(1)=1\\ \\Longrightarrow\\ \\dfrac1{C-1}=1\\ \\Longrightarrow\\ C=2',nota:'Imponiendo la condición inicial.'},
      {tex:'y=\\dfrac{1}{2x-x^2}',nota:'Solución particular del PVI.'}
    ],{modId:'homogeneas-bernoulli',titulo:'PVI de Bernoulli: y′+y/x=xy², y(1)=1'});
    c6.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución '),'(vale para cualquier C, antes de imponer la condición inicial): con $y=\\dfrac1{Cx-x^2}$, sea $D=Cx-x^2$ (así $y=1/D$, $D\'=C-2x$, $y\'=-D\'/D^2$). Lado izquierdo: $y\'+\\dfrac yx=-\\dfrac{C-2x}{D^2}+\\dfrac1{xD}=\\dfrac{-x(C-2x)+D}{xD^2}=\\dfrac{-Cx+2x^2+Cx-x^2}{xD^2}=\\dfrac{x^2}{xD^2}=\\dfrac{x}{D^2}$. Lado derecho: $xy^2=\\dfrac{x}{D^2}$ — coinciden para cualquier C. Con C=2, $y(1)=\\frac1{2-1}=1$, la condición pedida.'));
    c6.append(el('p',{class:'fuente'},'Fuente: ejemplo de elaboración propia, siguiendo el método de la card "Bernoulli" (no proviene de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios'));
    c7.append(el('p',{class:'note'},'Uno por cada técnica de la card correspondiente, de elaboración propia.'));

    const mk=(resumen,solHtml)=>{ c7.append(el('details',{},el('summary',{},resumen),el('div',{},solHtml))); };

    mk('Homogénea — dy/dx = (x² + y²)/(xy).',
      el('div',{},
        el('div',{class:'formula',html:'$$y=vx\\ \\Rightarrow\\ v+x\\dfrac{dv}{dx}=\\dfrac{1+v^2}{v}\\ \\Rightarrow\\ x\\dfrac{dv}{dx}=\\dfrac{1+v^2}{v}-v=\\dfrac1v$$'}),
        el('div',{class:'formula',html:'$$v\\,dv=\\dfrac{dx}{x}\\ \\Rightarrow\\ \\dfrac{v^2}{2}=\\ln|x|+C_1\\ \\Rightarrow\\ y^2=x^2(2\\ln|x|+C)$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente, $2yy\'=2x(2\\ln|x|+C)+2x=2x(2\\ln|x|+C+1)$, y sustituyendo $y^2=x^2(2\\ln|x|+C)$ de vuelta, $y\'=\\dfrac{x(2\\ln|x|+C+1)}{y}=\\dfrac{x(1+2\\ln|x|+C)}{y}$ — que coincide con $\\dfrac{x^2+y^2}{xy}$ al reemplazar $x^2+y^2=x^2+x^2(2\\ln|x|+C)=x^2(1+2\\ln|x|+C)$.')));

    mk('Coeficientes constantes — dy/dx = (x + y − 2)/(x − y).',
      el('div',{},
        el('p',{class:'note'},'Las rectas $x+y-2=0$ y $x-y=0$ se cortan en $(1,1)$: con $X=x-1$, $Y=y-1$ la ecuación queda $\\dfrac{dY}{dX}=\\dfrac{X+Y}{X-Y}$, homogénea — mismo tipo que el ejemplo de la card "Ejemplo resuelto de homogénea", con el signo de v cambiado.'),
        el('div',{class:'formula',html:'$$Y=vX\\ \\Rightarrow\\ \\dfrac{1-v}{1+v^2}\\,dv=\\dfrac{dX}{X}\\ \\Rightarrow\\ \\arctan(v)-\\tfrac12\\ln(1+v^2)=\\ln|X|+C$$'}),
        el('div',{class:'formula',html:'$$\\arctan\\Big(\\dfrac{y-1}{x-1}\\Big)-\\tfrac12\\ln\\big((x-1)^2+(y-1)^2\\big)=C$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente en X,Y igual que en el ejemplo principal (con el signo de v invertido), se recupera $Y\'(X-Y)=X+Y$, es decir $\\dfrac{dY}{dX}=\\dfrac{X+Y}{X-Y}$ — la ecuación de partida.')));

    mk('Bernoulli — y′ − y/x = −y²/x, x>0.',
      el('div',{},
        el('div',{class:'formula',html:'$$n=2,\\ w=\\dfrac1y\\ \\Rightarrow\\ \\dfrac{dw}{dx}+\\dfrac1xw=\\dfrac1x\\ \\Rightarrow\\ \\mu(x)=x$$'}),
        el('div',{class:'formula',html:'$$\\dfrac{d}{dx}[xw]=1\\ \\Rightarrow\\ xw=x+C\\ \\Rightarrow\\ w=1+\\dfrac Cx\\ \\Rightarrow\\ y=\\dfrac{x}{x+C}$$'}),
        el('p',{class:'note'},'Verificación: con $y=\\dfrac{x}{x+C}$, $y\'=\\dfrac{C}{(x+C)^2}$. Lado izquierdo: $y\'-\\dfrac yx=\\dfrac C{(x+C)^2}-\\dfrac1{x+C}=\\dfrac{C-(x+C)}{(x+C)^2}=\\dfrac{-x}{(x+C)^2}$. Lado derecho: $-\\dfrac{y^2}{x}=-\\dfrac{x^2/(x+C)^2}{x}=\\dfrac{-x}{(x+C)^2}$ — coinciden.')));

    c7.append(el('p',{class:'fuente'},'Fuente: ejercicios de elaboración propia, siguiendo el método de cada card de este tema (no provienen de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c7);
  }});
