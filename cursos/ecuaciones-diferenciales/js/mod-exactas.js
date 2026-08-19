registerModule({id:'exactas',title:'Ecuaciones exactas',unidad:'I',semanas:[3],evaluacion:['control-1','certamen-1'],
  lead:'Cuando M dx + N dy = 0 viene de una función potencial F, resolverla es solo reconstruir esa F paso a paso. Entra en el Control 1 de la semana 3.',
  build(sec){

    /* -------- Card 1: la idea -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'La idea'));
    c1.append(el('p',{},'Toda EDO de primer orden se puede escribir en forma diferencial:'));
    c1.append(el('div',{class:'formula',html:'$$M(x,y)\\,dx+N(x,y)\\,dy=0$$'}));
    c1.append(el('p',{},'Es ',el('b',{},'exacta'),' cuando el lado izquierdo es, literalmente, la diferencial total de alguna función $F(x,y)$ — una "función potencial" tal que:'));
    c1.append(el('div',{class:'formula',html:'$$F_x=M\\qquad\\text{y}\\qquad F_y=N$$'}));
    c1.append(el('p',{},'Si existe esa $F$, la EDO se reescribe como $dF=0$, y eso significa que $F$ es constante a lo largo de cualquier solución. La solución general queda entonces implícita, sin necesidad de integrar nada más una vez que se tiene $F$:'));
    c1.append(el('div',{class:'formula',html:'$$F(x,y)=C$$'}));
    c1.append(el('p',{class:'note'},'Resolver una exacta es, entonces, un problema distinto a separables o lineales: no hay que "despejar y" — hay que reconstruir la función $F$ de la que viene la ecuación.'));
    c1.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 3 ("Ecuaciones exactas"); definición estándar de exactitud (bibliografía del curso: Campbell, Zill) — elaboración propia, ya que no viene desarrollada en un PDF de Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: el criterio -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'El criterio'));
    c2.append(el('p',{},'Antes de intentar construir $F$, hay que confirmar que la ecuación es realmente exacta. El criterio:'));
    c2.append(el('div',{class:'formula',html:'$$\\dfrac{\\partial M}{\\partial y}=\\dfrac{\\partial N}{\\partial x}$$'}));
    c2.append(el('p',{},'Por qué funciona: si la ecuación es exacta, existe $F$ con $F_x=M$ y $F_y=N$. Entonces $M_y=F_{xy}$ y $N_x=F_{yx}$ — y como las derivadas parciales cruzadas de una misma función son iguales entre sí (siempre que sean continuas, teorema de Schwarz), se sigue que $M_y=N_x$. Es una condición necesaria; en las regiones donde $M$ y $N$ no tienen problemas de continuidad —el caso típico de este curso— también es suficiente.'));
    c2.append(el('p',{class:'note'},'Este criterio se verifica ',el('b',{},'siempre'),' antes de intentar resolver: si $M_y\\ne N_x$, la ecuación no es exacta tal como está escrita, y hace falta otra estrategia (ver el tema "Ecuaciones no exactas").'));
    c2.append(el('p',{class:'fuente'},'Fuente: criterio estándar de exactitud (bibliografía del curso: Campbell, Zill) — elaboración propia, ya que no viene desarrollado en un PDF de Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: construir F -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Construir F'));
    c3.append(el('p',{},'Una vez confirmada la exactitud, se reconstruye $F$ en cinco pasos, siempre en el mismo orden:'));
    Pasos(c3,[
      {tex:'F(x,y)=\\displaystyle\\int M(x,y)\\,dx=P(x,y)+g(y)',nota:'Se integra M respecto de x, tratando y como una constante. Como "la constante" de integración puede depender de y, se anota como una función desconocida g(y).'},
      {tex:'\\dfrac{\\partial F}{\\partial y}=\\dfrac{\\partial P}{\\partial y}+g\'(y)',nota:'Se deriva esa F respecto de y — la parte P(x,y) se deriva directo, y g(y) aporta g′(y).'},
      {tex:'\\dfrac{\\partial P}{\\partial y}+g\'(y)=N(x,y)',nota:'Se impone la otra condición que define a F: F_y tiene que ser igual a N.'},
      {tex:'g\'(y)=N(x,y)-\\dfrac{\\partial P}{\\partial y}',nota:'Se despeja g′(y). Si la ecuación es realmente exacta, esta expresión termina dependiendo solo de y (la x se cancela) — si no pasa eso, algo se calculó mal.'},
      {tex:'g(y)=\\displaystyle\\int\\Big(N-\\dfrac{\\partial P}{\\partial y}\\Big)dy\\ \\Longrightarrow\\ F(x,y)=P(x,y)+g(y)',nota:'Se integra para hallar g(y) y se arma F completa. La solución general de la EDO es F(x,y)=C.'}
    ],{modId:'exactas',titulo:'Construcción de F a partir de M y N'});
    c3.append(el('p',{class:'fuente'},'Fuente: síntesis del método de exactas (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: ejemplo resuelto -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Ejemplo resuelto'));
    c4.append(el('p',{},'Resolver el PVI $(3x^2+2xy)\\,dx+(x^2+2y)\\,dy=0$, $y(1)=2$.'));
    c4.append(el('p',{class:'note'},'Criterio primero: $M_y=2x$, $N_x=2x$ — son iguales, así que es exacta.'));
    Pasos(c4,[
      {tex:'F=\\displaystyle\\int(3x^2+2xy)\\,dx=x^3+x^2y+g(y)',nota:'Integrando M=3x²+2xy respecto de x.'},
      {tex:'F_y=x^2+g\'(y)',nota:'Derivando F respecto de y.'},
      {tex:'x^2+g\'(y)=x^2+2y\\ \\Longrightarrow\\ g\'(y)=2y',nota:'Igualando a N=x²+2y y despejando g′(y).'},
      {tex:'g(y)=y^2\\ \\Longrightarrow\\ F(x,y)=x^3+x^2y+y^2',nota:'Integrando g′(y) — no hace falta arrastrar una constante acá porque se agrupa en la C final.'},
      {tex:'x^3+x^2y+y^2=C',nota:'Solución general implícita: F(x,y)=C.'},
      {tex:'y(1)=2\\ \\Longrightarrow\\ 1+2+4=7\\ \\Longrightarrow\\ C=7',nota:'Imponiendo la condición inicial.'},
      {tex:'x^3+x^2y+y^2=7',nota:'Solución particular (implícita) del PVI.'}
    ],{modId:'exactas',titulo:'PVI: (3x²+2xy)dx+(x²+2y)dy=0, y(1)=2'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación: '),'por construcción, $F_x=3x^2+2xy=M$ y $F_y=x^2+2y=N$. Y sustituyendo en la ecuación original: derivando implícitamente $x^3+x^2y+y^2=7$ respecto de x, $3x^2+(2xy+x^2y\')+2yy\'=0$, es decir $y\'(x^2+2y)=-(3x^2+2xy)$, o sea $\\dfrac{dy}{dx}=-\\dfrac{3x^2+2xy}{x^2+2y}$ — exactamente lo que dice la ecuación original escrita como $\\frac{dy}{dx}=-M/N$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia. Se revisaron a fondo las cuatro pautas de Control 1 reales disponibles en Canvas 2026-2 (PAUTA_CONTROL 1_EDO_SEM1_2026, PAUTA_CONTROL 1_EDO_SEM2_2026, Pauta Control 1 EDO / PAUTA 02-2024, y Control 1 01-24) y ninguna trae un ejercicio de ecuaciones exactas — todas sus preguntas son de variables separables, lineales con factor integrante, o verificación de soluciones — pese a que "Ecuaciones exactas" figura en el temario de ese control según la calendarización oficial. Se deja esta nota para que quede registrado.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Ejercicios de elaboración propia, verificados por sustitución en la ecuación original.'));

    const mk=(resumen,solHtml)=>{ c5.append(el('details',{},el('summary',{},resumen),el('div',{},solHtml))); };

    mk('(2x+y)dx + (x−2y)dy = 0.',
      el('div',{},
        el('div',{class:'formula',html:'$$M_y=1=N_x\\ \\text{(exacta)}\\qquad F=\\int(2x+y)\\,dx=x^2+xy+g(y)$$'}),
        el('div',{class:'formula',html:'$$F_y=x+g\'(y)=x-2y\\ \\Rightarrow\\ g(y)=-y^2\\ \\Rightarrow\\ x^2+xy-y^2=C$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente, $2x+(y+xy\')-2yy\'=0\\Rightarrow y\'(x-2y)=-(2x+y)$, que reordenado es la ecuación original.')));

    mk('(y\\cos x + 2xe^y)dx + (\\sin x + x^2e^y - 1)dy = 0.',
      el('div',{},
        el('div',{class:'formula',html:'$$M_y=\\cos x+2xe^y=N_x\\ \\text{(exacta)}\\qquad F=\\int M\\,dx=y\\sin x+x^2e^y+g(y)$$'}),
        el('div',{class:'formula',html:'$$F_y=\\sin x+x^2e^y+g\'(y)=N\\ \\Rightarrow\\ g\'(y)=-1\\ \\Rightarrow\\ y\\sin x+x^2e^y-y=C$$'}),
        el('p',{class:'note'},'Verificación: derivando implícitamente, $y\'\\sin x+y\\cos x+2xe^y+x^2e^yy\'-y\'=0\\Rightarrow y\'(\\sin x+x^2e^y-1)=-(y\\cos x+2xe^y)$, que reordenado es la ecuación original.')));

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicios de elaboración propia, siguiendo el método de la card "Construir F" (no provienen de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c5);
  }});
