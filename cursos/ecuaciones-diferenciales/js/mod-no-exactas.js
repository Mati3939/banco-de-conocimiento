registerModule({id:'no-exactas',title:'Ecuaciones no exactas',unidad:'I',semanas:[3],evaluacion:['certamen-1'],
  lead:'Qué hacer cuando el criterio de exactitud falla: buscar un factor integrante que arregle la ecuación, en los dos casos donde eso es tratable a mano.',
  build(sec){

    /* -------- Card 1: cuando el criterio falla -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Cuando el criterio falla'));
    c1.append(el('p',{},'En el tema "Ecuaciones exactas" se vio el criterio $M_y=N_x$. Cuando $M_y\\ne N_x$, la ecuación'));
    c1.append(el('div',{class:'formula',html:'$$M(x,y)\\,dx+N(x,y)\\,dy=0$$'}));
    c1.append(el('p',{},'no es exacta tal como está escrita. Pero a veces existe una función $\\mu(x,y)$ — un ',el('b',{},'factor integrante'),' — tal que, al multiplicar TODA la ecuación por $\\mu$, la nueva ecuación sí es exacta:'));
    c1.append(el('div',{class:'formula',html:'$$\\mu(x,y)M(x,y)\\,dx+\\mu(x,y)N(x,y)\\,dy=0\\qquad\\text{ahora con } (\\mu M)_y=(\\mu N)_x$$'}));
    c1.append(el('p',{class:'note'},'Encontrar $\\mu$ en el caso general es tan difícil como resolver la EDO original. Pero hay dos casos particulares —cuando $\\mu$ depende de una sola variable— donde se puede calcular directo: se ven en las cards "Factor integrante que depende solo de x" y "Factor integrante que depende solo de y".'));
    c1.append(el('p',{class:'fuente'},'Fuente: Calendarización oficial 2026-2 de Ecuaciones Diferenciales, Unidad I, semana 3 ("Ecuaciones no exactas"); método estándar del factor integrante (bibliografía del curso: Campbell, Zill) — elaboración propia, ya que no viene desarrollado en un PDF de Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: factor integrante en x -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Factor integrante que depende solo de x'));
    c2.append(el('p',{},'Se busca $\\mu=\\mu(x)$ (sin y) tal que $\\mu M\\,dx+\\mu N\\,dy=0$ sea exacta:'));
    Pasos(c2,[
      {tex:'\\dfrac{\\partial}{\\partial y}(\\mu M)=\\dfrac{\\partial}{\\partial x}(\\mu N)',nota:'Condición de exactitud para la ecuación multiplicada por μ.'},
      {tex:'\\mu M_y=\\mu\'N+\\mu N_x',nota:'Como μ no depende de y, la derivada de la izquierda es directa; la de la derecha usa la regla del producto (μ sí depende de x).'},
      {tex:'\\mu\'N=\\mu(M_y-N_x)\\ \\Longrightarrow\\ \\dfrac{\\mu\'}{\\mu}=\\dfrac{M_y-N_x}{N}',nota:'Reordenando: queda una EDO separable en μ.'},
      {tex:'\\dfrac{d\\mu}{\\mu}=\\dfrac{M_y-N_x}{N}\\,dx',nota:'Válida solo si el lado derecho depende solamente de x — si aparece y, este caso no sirve.'},
      {tex:'\\mu(x)=e^{\\int \\frac{M_y-N_x}{N}\\,dx}',nota:'Integrando y exponenciando: el factor integrante.'}
    ],{modId:'no-exactas',titulo:'De dónde sale μ(x)'});
    c2.append(el('p',{class:'fuente'},'Fuente: derivación estándar del factor integrante en x (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: factor integrante en y -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Factor integrante que depende solo de y'));
    c3.append(el('p',{},'El caso simétrico: se busca $\\mu=\\mu(y)$ (sin x). El mismo procedimiento de la card "Factor integrante que depende solo de x", pero derivando al revés:'));
    Pasos(c3,[
      {tex:'\\mu\'M+\\mu M_y=\\mu N_x',nota:'Condición de exactitud: ahora μ no depende de x, así que la derivada de μN respecto de x es directa; la de μM respecto de y usa la regla del producto.'},
      {tex:'\\mu\'M=\\mu(N_x-M_y)\\ \\Longrightarrow\\ \\dfrac{\\mu\'}{\\mu}=\\dfrac{N_x-M_y}{M}',nota:'Reordenando, otra vez separable en μ — válida solo si el lado derecho depende solamente de y.'},
      {tex:'\\mu(y)=e^{\\int \\frac{N_x-M_y}{M}\\,dy}',nota:'Integrando y exponenciando: el factor integrante en y.'}
    ],{modId:'no-exactas',titulo:'De dónde sale μ(y)'});
    c3.append(el('p',{class:'fuente'},'Fuente: derivación estándar del factor integrante en y (bibliografía del curso: Campbell, Zill) — elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: cómo decidir cuál probar -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Cómo decidir cuál probar'));
    c4.append(el('p',{},'Frente a una no exacta, se calculan los dos cocientes y se ve cuál queda en una sola variable:'));
    Tabla(c4,{columnas:['Calculá','¿Depende solo de…?','Entonces'],filas:[
      ['$\\dfrac{M_y-N_x}{N}$','x','$\\mu(x)=e^{\\int \\frac{M_y-N_x}{N}\\,dx}$'],
      ['$\\dfrac{N_x-M_y}{M}$','y','$\\mu(y)=e^{\\int \\frac{N_x-M_y}{M}\\,dy}$']
    ]});
    c4.append(el('p',{class:'note'},'Si NINGUNO de los dos cocientes depende de una sola variable, este método simple no alcanza — haría falta buscar $\\mu$ de otra forma (por ejemplo, $\\mu(xy)$ o $\\mu(x+y)$), lo cual queda fuera del alcance de este curso.'));
    c4.append(el('p',{class:'fuente'},'Fuente: síntesis de las cards "Factor integrante que depende solo de x" y "Factor integrante que depende solo de y" — elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: ejemplo resuelto completo -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejemplo resuelto completo'));
    c5.append(el('p',{},'Resolver $(2y+x)\\,dx+x\\,dy=0$, con $x\\gt0$.'));
    c5.append(el('p',{class:'note'},'Criterio: $M_y=2$, $N_x=1$ — no son iguales, no es exacta tal como está.'));
    Pasos(c5,[
      {tex:'\\dfrac{M_y-N_x}{N}=\\dfrac{2-1}{x}=\\dfrac1x',nota:'Se prueba primero el cociente que da μ(x): depende solo de x — sirve.'},
      {tex:'\\mu(x)=e^{\\int \\frac1x\\,dx}=e^{\\ln x}=x',nota:'Se integra y se exponencia: el factor integrante es μ=x.'},
      {tex:'(2xy+x^2)\\,dx+x^2\\,dy=0',nota:'Se multiplica toda la ecuación original por μ=x. Ahora M_y=2x=N_x: ya es exacta.'},
      {tex:'F=\\displaystyle\\int(2xy+x^2)\\,dx=x^2y+\\dfrac{x^3}{3}+g(y)',nota:'Se construye F igual que en el tema "Ecuaciones exactas": se integra μM respecto de x.'},
      {tex:'F_y=x^2+g\'(y)=x^2\\ \\Longrightarrow\\ g\'(y)=0',nota:'Se deriva respecto de y y se iguala a μN=x² — acá g′(y) resulta 0.'},
      {tex:'x^2y+\\dfrac{x^3}{3}=C\\ \\Longrightarrow\\ y=\\dfrac{C}{x^2}-\\dfrac{x}{3}',nota:'Solución general, despejada explícitamente.'}
    ],{modId:'no-exactas',titulo:'(2y+x)dx+x dy=0'});
    c5.append(el('p',{class:'note'},el('b',{},'Verificación por sustitución en la ecuación ORIGINAL '),'(no la multiplicada por μ): con $y=\\dfrac{C}{x^2}-\\dfrac{x}{3}$, $y\'=-\\dfrac{2C}{x^3}-\\dfrac13$. Y de $(2y+x)dx+x\\,dy=0$ despejando, $\\dfrac{dy}{dx}=-\\dfrac{2y+x}{x}=-\\dfrac{2\\big(\\frac{C}{x^2}-\\frac x3\\big)+x}{x}=-\\dfrac{\\frac{2C}{x^2}-\\frac{2x}3+x}{x}=-\\dfrac{2C}{x^3}+\\dfrac23-1=-\\dfrac{2C}{x^3}-\\dfrac13$ — coincide con y′.'));
    c5.append(el('p',{class:'fuente'},'Fuente: ejemplo de elaboración propia, siguiendo el método de la card "Factor integrante que depende solo de x" (no proviene de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Ejercicio de elaboración propia, con el caso simétrico μ(y).'));

    const mk=(resumen,solHtml)=>{ c6.append(el('details',{},el('summary',{},resumen),el('div',{},solHtml))); };

    mk('y\\,dx + \\Big(2x+\\dfrac1y\\Big)dy = 0,\\quad y\\gt0.',
      el('div',{},
        el('div',{class:'formula',html:'$$M_y=1,\\ N_x=2\\ \\text{(no exacta)}\\qquad \\dfrac{N_x-M_y}{M}=\\dfrac{2-1}{y}=\\dfrac1y\\ \\Rightarrow\\ \\mu(y)=e^{\\int \\frac1y dy}=y$$'}),
        el('div',{class:'formula',html:'$$y^2\\,dx+(2xy+1)\\,dy=0\\ \\text{(exacta)}\\ \\Longrightarrow\\ F=xy^2+y=C$$'}),
        el('p',{class:'note'},'Verificación: de $xy^2+y=C$, derivando implícitamente, $y^2+2xyy\'+y\'=0\\Rightarrow y\'(2xy+1)=-y^2\\Rightarrow y\'=-\\dfrac{y^2}{2xy+1}$. Y de la ecuación original, $-M/N=-\\dfrac{y}{2x+1/y}=-\\dfrac{y^2}{2xy+1}$ (multiplicando arriba y abajo por y) — coincide.')));

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicio de elaboración propia, siguiendo el método de la card "Factor integrante que depende solo de y" (no proviene de un PDF de Canvas ni de una pauta oficial).'));
    sec.append(c6);
  }});
