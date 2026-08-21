/* contenidoOficial original (índice a cubrir):
   - Derivada direccional, vector gradiente. Aplicaciones
   - Aplicaciones de las derivadas parciales
   El vector gradiente en sí (definición, plano tangente, aproximación lineal)
   ya está en mod-gradiente.js; este módulo se queda con la mitad de
   "#tema-gradiente" en index-v3.html que es propiamente derivada direccional:
   la definición como proyección del gradiente, el crecimiento máximo, la
   perpendicularidad con las curvas de nivel, y aplicaciones. */
registerModule({id:'direccional',title:'Derivada direccional y aplicaciones',unidad:'II',semanas:[8],
  evaluacion:['certamen-2'],
  lead:'Cuánto cambia f si nos movemos en una dirección cualquiera, no solo en los ejes — y por qué esa dirección tiene un máximo, no crece sin límite.',
  build(sec){

    /* -------- Card 1: derivada direccional como proyección del gradiente -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Derivada direccional como proyección del gradiente'));
    c1.append(el('p',{},'La derivada direccional mide la tasa de cambio de $f$ al movernos desde $(x_0,y_0)$ en la dirección de un vector ',el('b',{},'unitario'),' $\\hat u$:'));
    c1.append(el('div',{class:'formula',html:'$$D_{\\hat u}f(x_0,y_0)=\\lim_{h\\to0}\\dfrac{f(x_0+hu_1,\\,y_0+hu_2)-f(x_0,y_0)}{h}=\\nabla f(x_0,y_0)\\cdot\\hat u$$'}));
    c1.append(el('p',{},'La igualdad de la derecha (que evita volver a la definición de límite cada vez) sale de aplicar la regla de la cadena a $g(h)=f(x_0+hu_1,y_0+hu_2)$ y evaluar $g\'(0)$ — el mismo tema Regla de la cadena de mod-derivadas-parciales.js, con $x(h)=x_0+hu_1$, $y(h)=y_0+hu_2$.'));
    c1.append(el('p',{},'Es una generalización directa de las parciales: con $\\hat u=(1,0)$ se recupera $D_{\\hat u}f=f_x$, y con $\\hat u=(0,1)$, $D_{\\hat u}f=f_y$ — moverse "en la dirección de $x$" o "en la dirección de $y$" son solo dos casos particulares entre infinitos.'));
    c1.append(el('p',{},'Ejemplo — razón de cambio de un potencial eléctrico $V(x,y,z)=5x^2-3xy+xyz$ en $P(3,4,5)$, en la dirección de $v=\\langle1,1,-1\\rangle$ (que no es unitario: $\\lVert v\\rVert=\\sqrt3$):'));
    Pasos(c1,[
      {tex:'\\nabla V=\\langle10x-3y+yz,\\ -3x+xz,\\ xy\\rangle',nota:'Las tres parciales de V.'},
      {tex:'\\nabla V(3,4,5)=\\langle10(3)-3(4)+4(5),\\ -3(3)+3(5),\\ 3(4)\\rangle',nota:'Se evalúa cada componente en P, sin simplificar todavía.'},
      {tex:'\\nabla V(3,4,5)=\\langle38,\\,6,\\,12\\rangle',nota:'Simplificando cada componente.'},
      {tex:'\\hat u=\\dfrac{v}{\\lVert v\\rVert}=\\dfrac{1}{\\sqrt3}\\langle1,1,-1\\rangle',nota:'Normalizar es obligatorio: v no es unitario.'},
      {tex:'D_{\\hat u}V=\\nabla V\\cdot\\hat u=\\dfrac{38+6-12}{\\sqrt3}=\\dfrac{32}{\\sqrt3}=\\dfrac{32\\sqrt3}{3}\\approx18{,}48',nota:'Producto punto, dividido por √3.'}
    ],{modId:'direccional',titulo:'Derivada direccional de un potencial eléctrico'});
    c1.append(el('p',{class:'note'},'$V$ crece a razón de $\\approx18{,}5$ por unidad de distancia en esa dirección — bastante menos que el máximo posible, $\\lVert\\nabla V(3,4,5)\\rVert=\\sqrt{38^2+6^2+12^2}\\approx40{,}2$ (card "Máximo crecimiento y norma del gradiente").'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 9 ("Derivada direccional de un potencial eléctrico"); nota "Gradiente y derivada direccional" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2). La definición como límite y su reducción por regla de la cadena son desarrollo estándar de la materia.'));
    sec.append(c1);

    /* -------- Card 2: máximo crecimiento -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Máximo crecimiento y norma del gradiente'));
    c2.append(el('p',{},'Como $D_{\\hat u}f=\\nabla f\\cdot\\hat u=\\lVert\\nabla f\\rVert\\cos\\theta$ (con $\\theta$ el ángulo entre $\\nabla f$ y $\\hat u$, y $\\hat u$ unitario), y $\\cos\\theta$ vale entre $-1$ y $1$:'));
    c2.append(el('ul',{},
      el('li',{},el('b',{},'Máximo crecimiento: '),el('span',{html:'$D_{\\hat u}f=\\lVert\\nabla f\\rVert$, cuando $\\hat u=\\nabla f/\\lVert\\nabla f\\rVert$ (θ=0, mismo sentido que ∇f).'})),
      el('li',{},el('b',{},'Máximo decrecimiento: '),el('span',{html:'$D_{\\hat u}f=-\\lVert\\nabla f\\rVert$, cuando $\\hat u=-\\nabla f/\\lVert\\nabla f\\rVert$ (θ=π, sentido opuesto).'})),
      el('li',{},'En cualquier otra dirección, $D_{\\hat u}f$ queda estrictamente entre esos dos extremos.')
    ));
    c2.append(el('p',{},'Ejemplo: dirección y magnitud del máximo crecimiento de $f(x,y)=4y\\sqrt{x}$ en $(4,1)$:'));
    Pasos(c2,[
      {tex:'f_x=\\dfrac{2y}{\\sqrt{x}},\\qquad f_y=4\\sqrt{x}',nota:'Parciales de f.'},
      {tex:'\\nabla f(4,1)=\\Big\\langle\\dfrac{2(1)}{2},\\ 4(2)\\Big\\rangle=\\langle1,\\,8\\rangle',nota:'√4=2, evaluando en (4,1).'},
      {tex:'\\lVert\\nabla f(4,1)\\rVert=\\sqrt{1^2+8^2}=\\sqrt{65}\\approx8{,}06',nota:'Máxima tasa de crecimiento posible desde ese punto.'}
    ],{modId:'direccional',titulo:'Máximo crecimiento de f(x,y)=4y√x en (4,1)'});
    c2.append(el('p',{class:'note'},'Dirección de máximo crecimiento: $\\hat u=\\dfrac{1}{\\sqrt{65}}\\langle1,8\\rangle\\approx\\langle0{,}12,\\,0{,}99\\rangle$ — casi vertical, porque $f_y=8$ domina largamente sobre $f_x=1$. En la dirección opuesta, $-\\hat u$, $f$ decrece a la misma tasa $-\\sqrt{65}$: es la dirección de máximo decrecimiento.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejercicio 11 ("Hallar la dirección y magnitud del máximo crecimiento..."), tema "Gradiente y derivada direccional".'));
    sec.append(c2);

    /* -------- Card 3: gradiente perpendicular a las curvas de nivel (interactivo) -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'El gradiente es perpendicular a las curvas de nivel'));
    c3.append(el('p',{},'Sobre una curva de nivel $f(x,y)=k$ (tema Funciones de varias variables), $f$ no cambia por definición — y eso obliga a $\\nabla f$ a ser perpendicular a la curva en cada punto. Con $f(x,y)=x^2+2y^2$, derivando $x^2+2y^2=k$ implícitamente (tema Derivadas parciales):'));
    Pasos(c3,[
      {tex:'2x+4y\\,y\'=0\\ \\Longrightarrow\\ y\'=-\\dfrac{x}{2y}',nota:'Pendiente de la tangente a la curva de nivel, por derivación implícita.'},
      {tex:'\\text{tangente} \\sim (1,\\,y\')=\\Big(1,\\,-\\dfrac{x}{2y}\\Big)\\qquad \\nabla f=(2x,\\,4y)',nota:'Vector tangente a la curva vs. el gradiente, en el mismo punto.'},
      {tex:'\\nabla f\\cdot(1,y\')=2x\\cdot1+4y\\Big(-\\dfrac{x}{2y}\\Big)=2x-2x=0',nota:'Producto punto nulo: son perpendiculares, para cualquier (x,y) con y≠0.'}
    ],{modId:'direccional',titulo:'Por qué ∇f ⊥ curva de nivel, para f=x²+2y²'});
    c3.append(el('p',{},'Movés el punto y la dirección $\\hat u$ abajo: la flecha de acento es $\\nabla f(x_0,y_0)$ — siempre perpendicular a la elipse de nivel (en azul) que pasa por el punto. La flecha verde es $\\hat u$; $D_{\\hat u}f$ nunca supera $\\lVert\\nabla f\\rVert$, y lo alcanza justo cuando $\\hat u$ se alinea con $\\nabla f$.'));
    let x0D=1.2, y0D=0.6, angD=0;
    const planoGrad=Plano(c3,{xMin:-3.6,xMax:3.6,yMin:-3.6,yMax:3.6,alto:380});
    const nivelD=(k,color)=>P=>P.parametrica(t=>[Math.sqrt(k)*Math.cos(t),Math.sqrt(k/2)*Math.sin(t)],0,2*Math.PI,{color,grosor:1});
    planoGrad.dibujar(P=>{
      P.ejes();
      [0.5,1.5,3,4.5,6,9].forEach(k=>nivelD(k,'--grid')(P));
      const k0=x0D*x0D+2*y0D*y0D;
      nivelD(k0,'--s1')(P);
      const g=[2*x0D,4*y0D];
      P.vector(x0D,y0D,x0D+0.4*g[0],y0D+0.4*g[1],{color:'--s4',etiqueta:'∇f'});
      const ang=angD*Math.PI/180;
      P.vector(x0D,y0D,x0D+1.1*Math.cos(ang),y0D+1.1*Math.sin(ang),{color:'--s2',etiqueta:'û'});
      P.punto(x0D,y0D,{color:'--s5',r:4});
    });
    const notaGrad=el('p',{class:'note'});
    function actualizarGrad(){
      const k0=x0D*x0D+2*y0D*y0D;
      const g=[2*x0D,4*y0D], gnorm=Math.hypot(g[0],g[1]);
      const ang=angD*Math.PI/180, u=[Math.cos(ang),Math.sin(ang)];
      const Du=g[0]*u[0]+g[1]*u[1];
      notaGrad.textContent='(x₀,y₀) = ('+x0D.toFixed(2)+', '+y0D.toFixed(2)+'), curva de nivel k = '+k0.toFixed(2)+'. ∇f = ('+g[0].toFixed(2)+', '+g[1].toFixed(2)+'), ‖∇f‖ ≈ '+gnorm.toFixed(2)+'. Con û a '+angD+'°: D_û f = ∇f·û ≈ '+Du.toFixed(2)+' (máximo posible ±'+gnorm.toFixed(2)+', alcanzado solo cuando û se alinea con ∇f o su opuesto).';
    }
    actualizarGrad();
    c3.append(notaGrad);
    c3.append(el('div',{class:'controls'},
      el('label',{},'x₀:'),
      el('input',{type:'range',min:'-2',max:'2',step:'0.1',value:String(x0D),oninput:e=>{ x0D=parseFloat(e.target.value); planoGrad.redibujar(); actualizarGrad(); }}),
      el('label',{},'y₀:'),
      el('input',{type:'range',min:'-2',max:'2',step:'0.1',value:String(y0D),oninput:e=>{ y0D=parseFloat(e.target.value); planoGrad.redibujar(); actualizarGrad(); }}),
      el('label',{},'dirección û:'),
      el('input',{type:'range',min:'0',max:'360',step:'5',value:String(angD),oninput:e=>{ angD=parseFloat(e.target.value); planoGrad.redibujar(); actualizarGrad(); }})
    ));
    c3.append(el('p',{class:'fuente'},'Fuente: derivación algebraica, elaboración propia. Interactivo: misma $f(x,y)=x^2+2y^2$ y mismos valores iniciales $x_0=1{,}2$, $y_0=0{,}6$ de la animación "Curvas de nivel y vector gradiente" de index-v3.html (contenido auditado), reimplementada con la primitiva Plano en vez de un canvas a medida.'));
    sec.append(c3);

    /* -------- Card 4: aplicación — dirección de enfriamiento más rápido -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Aplicación: dirección de máximo descenso'));
    c4.append(el('p',{},'Si $\\nabla f$ apunta hacia donde $f$ crece más rápido, $-\\nabla f$ apunta hacia donde ',el('b',{},'decrece'),' más rápido — la idea detrás de todo método de "descenso más pronunciado" (que reaparece, aplicado a la búsqueda de mínimos, en el tema Extremos, Hessiano, Taylor y Lagrange). Ejemplo con un campo de temperatura $T(x,y)=100-x^2-2y^2$ (más caliente cerca del origen): desde $P(2,1)$, ¿hacia dónde hay que moverse para enfriarse lo más rápido posible?'));
    Pasos(c4,[
      {tex:'\\nabla T=\\langle-2x,\\,-4y\\rangle\\ \\Longrightarrow\\ \\nabla T(2,1)=\\langle-4,\\,-4\\rangle',nota:'∇T apunta hacia donde T crece: hacia el origen, el punto más caliente.'},
      {tex:'\\lVert\\nabla T(2,1)\\rVert=\\sqrt{16+16}=4\\sqrt2\\approx5{,}657',nota:'Magnitud del máximo calentamiento posible.'},
      {tex:'\\hat u_{\\text{frío}}=-\\dfrac{\\nabla T(2,1)}{\\lVert\\nabla T(2,1)\\rVert}=\\dfrac{1}{\\sqrt2}\\langle1,1\\rangle',nota:'Enfriamiento más rápido: dirección opuesta al gradiente (alejándose del origen).'},
      {tex:'D_{\\hat u_{\\text{frío}}}T=-\\lVert\\nabla T(2,1)\\rVert=-4\\sqrt2\\approx-5{,}657\\ (^\\circ/\\text{u})',nota:'Tasa de enfriamiento máxima posible desde P — es −‖∇T‖ por la card "Máximo crecimiento".'}
    ],{modId:'direccional',titulo:'Dirección de enfriamiento más rápido desde P(2,1)'});
    c4.append(el('p',{class:'note'},'Tiene sentido con el mapa de calor: desde $(2,1)$, alejarse del origen en línea recta —dirección $(1,1)/\\sqrt2$— es exactamente la dirección que aumenta más rápido $x^2+2y^2$ y por lo tanto baja más rápido $T=100-x^2-2y^2$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia (aplicación estándar del gradiente a campos escalares, tema "Aplicaciones de las derivadas parciales" del temario oficial) — no hay Guía ni Control de Canvas 2026-2 que cubra esta unidad.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Canvas 2026-2 no trae material de esta unidad: el Listado 1 y la Guía de Ayudantía 1 solo cubren funciones vectoriales y el triedro TNB (Unidad I). Ambos ejercicios de abajo son elaboración propia.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Para $f(x,y)=x^2e^{y}$, halle $D_{\\hat u}f(1,0)$ en la dirección de $v=(3,4)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\nabla f=\\langle2xe^y,\\,x^2e^y\\rangle\\ \\Longrightarrow\\ \\nabla f(1,0)=\\langle2,\\,1\\rangle$$'}),
        el('div',{class:'formula',html:'$$\\lVert v\\rVert=5\\ \\Longrightarrow\\ \\hat u=\\Big(\\dfrac35,\\dfrac45\\Big)\\ \\Longrightarrow\\ D_{\\hat u}f=\\dfrac{2(3)+1(4)}{5}=\\dfrac{10}{5}=2$$'}),
        el('p',{class:'note'},'v=(3,4) no es unitario (‖v‖=5, es el triángulo 3-4-5) — normalizarlo primero es el paso que más se olvida.')));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Para $f(x,y)=x^2-y^2$ en $(2,-1)$, halle la dirección y la tasa de decrecimiento más rápido.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\nabla f=\\langle2x,\\,-2y\\rangle\\ \\Longrightarrow\\ \\nabla f(2,-1)=\\langle4,\\,2\\rangle,\\qquad \\lVert\\nabla f\\rVert=\\sqrt{20}=2\\sqrt5$$'}),
        el('div',{class:'formula',html:'$$\\hat u=-\\dfrac{\\langle4,2\\rangle}{2\\sqrt5}=\\dfrac{1}{\\sqrt5}\\langle-2,-1\\rangle,\\qquad D_{\\hat u}f=-2\\sqrt5\\approx-4{,}47$$'}),
        el('p',{class:'note'},'Misma idea de la card "Aplicación: dirección de máximo descenso", con otra función y otro punto.')));
    c5.append(ej2);

    c5.append(el('p',{class:'fuente'},'Fuente: ambos ejercicios, elaboración propia, aplicando la fórmula $D_{\\hat u}f=\\nabla f\\cdot\\hat u$ de la card "Derivada direccional como proyección del gradiente".'));
    sec.append(c5);
  }});
