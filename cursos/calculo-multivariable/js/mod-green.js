/* contenidoOficial original (índice a cubrir):
   - Teorema de Green
   - Aplicaciones de la integral de línea
   Se reparte en: el enunciado y la orientación positiva de la frontera; las dos
   formas del teorema (circulación y flujo); el cálculo de áreas; y regiones con
   agujeros (dominios múltiplemente conexos). */
registerModule({id:'green',title:'Teorema de Green y aplicaciones',unidad:'IV',semanas:[13],
  evaluacion:[],
  lead:'Convertir una integral de línea cerrada en una integral doble sobre la región que encierra.',
  build(sec){
    /* -------- Card 1: el enunciado y la orientación positiva -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'El enunciado de Green y la orientación positiva'));
    c1.append(el('p',{},'El ',el('b',{},'Teorema de Green'),' convierte una integral de línea sobre una curva cerrada simple $C$ (borde de una región $D$) en una integral doble sobre $D$ — evitando integrar sobre la curva cuando la región es más simple:'));
    c1.append(el('div',{class:'formula',html:'$$\\oint_C(P\\,dx+Q\\,dy)=\\iint_D\\left(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)dA$$'}));
    c1.append(el('p',{},'Requiere $C$ simple (no se cruza a sí misma), cerrada, ',el('b',{},'orientada positivamente'),' (antihorario) y $D$ simplemente conexa. "Positiva" quiere decir: recorriendo $C$, la región $D$ queda siempre a la ',el('b',{},'izquierda'),'.'));
    const planoOr=Plano(c1,{xMin:-1.5,xMax:1.5,yMin:-1.5,yMax:1.5,alto:300});
    planoOr.dibujar(P=>{
      P.ejes();
      P.region(x=>Math.sqrt(Math.max(0,1-x*x)),x=>-Math.sqrt(Math.max(0,1-x*x)),-1,1,{color:'--s1',alpha:0.18});
      P.parametrica(t=>[Math.cos(t),Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2.2});
      for(const t of [0,Math.PI/2,Math.PI,3*Math.PI/2]){
        const x=Math.cos(t),y=Math.sin(t), tx=-Math.sin(t),ty=Math.cos(t), esc=0.35;
        P.vector(x,y,x+esc*tx,y+esc*ty,{color:'--s4',punta:7});
      }
      P.texto(-1.35,1.3,'D',{color:'--s1',tam:13});
    });
    c1.append(el('p',{class:'note'},'Región $D$ (celeste) con su borde $C$ (azul); las flechas naranjas son la dirección de recorrido — antihorario, así que $D$ queda a la izquierda en cada tramo. Recorrer $C$ en el sentido opuesto invierte el signo de la integral de línea, igual que invertir la orientación de cualquier curva (tema Integral de línea y teorema fundamental).'));
    c1.append(el('p',{},'Green es, en el fondo, el caso particular del Teorema de Stokes (tema Teorema de Stokes y Teorema de la divergencia (Gauss), módulo Integrales de superficie, flujo, Stokes y Gauss) cuando la superficie es plana y vive en el plano $xy$ — $\\partial_xQ-\\partial_yP$ es la componente $z$ del rotacional, formalizado recién en ese módulo.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Teorema de Green". La figura de la orientación es elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: las dos formas de Green -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Las dos formas de Green: circulación y flujo'));
    c2.append(el('p',{},'La forma de arriba —',el('b',{},'circulación'),'— mide cuánto "gira" $\\mathbf F$ a lo largo de $C$. Hay una segunda forma —',el('b',{},'flujo'),'— que mide cuánto "sale" $\\mathbf F$ a través de $C$, con $\\mathbf n$ el normal unitario ',el('b',{},'exterior'),' a $D$:'));
    c2.append(el('div',{class:'formula',html:'$$\\oint_C\\mathbf F\\cdot\\mathbf n\\,ds=\\iint_D\\left(\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}\\right)dA=\\iint_D\\operatorname{div}\\mathbf F\\,dA$$'}));
    c2.append(el('p',{},'No es un teorema aparte: con $C$ positivamente orientada, $\\mathbf n\\,ds=\\langle dy,-dx\\rangle$ (el tangente $\\mathbf r\'=\\langle x\',y\'\\rangle$ girado $-90°$). Sustituyendo, la forma de flujo es la forma de circulación aplicada al campo auxiliar $\\langle-Q,P\\rangle$:'));
    Pasos(c2,[
      {tex:'\\oint_C\\mathbf F\\cdot\\mathbf n\\,ds=\\oint_C(P\\,dy-Q\\,dx)=\\oint_C\\big((-Q)\\,dx+P\\,dy\\big)',nota:'Se reemplaza n ds=⟨dy,−dx⟩ y se reordena.'},
      {tex:'=\\iint_D\\left(\\dfrac{\\partial P}{\\partial x}-\\dfrac{\\partial(-Q)}{\\partial y}\\right)dA=\\iint_D\\left(\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}\\right)dA',nota:'Circulación de Green aplicada a (−Q,P) en vez de (P,Q).'}
    ],{modId:'green',titulo:'La forma de flujo, deducida de la forma de circulación'});
    c2.append(el('p',{},'Ejemplo, con $\\mathbf F(x,y)=\\langle x,y\\rangle$ (campo radial) y $D$ el disco unitario:'));
    const planoFlujo=Plano(c2,{xMin:-1.5,xMax:1.5,yMin:-1.5,yMax:1.5,alto:300});
    planoFlujo.dibujar(P=>{
      P.ejes();
      P.region(x=>Math.sqrt(Math.max(0,1-x*x)),x=>-Math.sqrt(Math.max(0,1-x*x)),-1,1,{color:'--s1',alpha:0.16});
      P.parametrica(t=>[Math.cos(t),Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2});
      for(const t of [0,Math.PI/3,2*Math.PI/3,Math.PI,4*Math.PI/3,5*Math.PI/3]){
        const x=Math.cos(t),y=Math.sin(t), esc=0.4;
        P.vector(x,y,x+esc*x,y+esc*y,{color:'--s4',punta:6});
      }
    });
    c2.append(el('p',{class:'note'},'En cada punto del borde, $\\mathbf F=\\langle x,y\\rangle$ (flechas naranjas) apunta exactamente en la dirección normal exterior — el campo "sale" lo más posible por todas partes, así que el flujo debería ser positivo y grande.'));
    Pasos(c2,[
      {tex:'\\operatorname{div}\\mathbf F=\\dfrac{\\partial x}{\\partial x}+\\dfrac{\\partial y}{\\partial y}=2\\quad\\text{(constante)}',nota:'Divergencia del campo radial.'},
      {tex:'\\oint_C\\mathbf F\\cdot\\mathbf n\\,ds=\\iint_D 2\\,dA=2\\cdot\\pi(1)^2=2\\pi',nota:'Con div F constante, la integral doble es 2 por el área del disco.'}
    ],{modId:'green',titulo:'Flujo de F=⟨x,y⟩ a través del círculo unitario'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación directa, sin Green: '),'en el círculo unitario, $x=\\cos\\theta,\\,y=\\operatorname{sen}\\theta$, y el normal exterior es $\\mathbf n=\\langle\\cos\\theta,\\operatorname{sen}\\theta\\rangle$ (el mismo punto, porque el radio es $1$). Entonces $\\mathbf F\\cdot\\mathbf n=x\\cos\\theta+y\\operatorname{sen}\\theta=\\cos^2\\theta+\\operatorname{sen}^2\\theta=1$ (constante), y con $ds=d\\theta$ (radio $1$): $\\displaystyle\\oint_C\\mathbf F\\cdot\\mathbf n\\,ds=\\int_0^{2\\pi}1\\,d\\theta=2\\pi$ — coincide exactamente con el resultado por Green.'));
    c2.append(el('p',{class:'fuente'},'Fuente: forma de circulación, index-v3.html (contenido auditado), tema "Teorema de Green"; la forma de flujo, su deducción, el ejemplo y la verificación directa son desarrollo estándar de la materia y elaboración propia — no están en index-v3.html, el vault ni Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: cálculo de áreas con Green -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Cálculo de áreas con Green'));
    c3.append(el('p',{},'Con $Q=x$, $P=0$ (o $Q=0$, $P=-y$), $\\partial_xQ-\\partial_yP=1$, así que la integral doble se vuelve el área de $D$ — el área se calcula recorriendo solo el ',el('b',{},'borde'),', útil cuando $D$ es más fácil de parametrizar por su frontera que por su interior:'));
    c3.append(el('div',{class:'formula',html:'$$A(D)=\\oint_C x\\,dy=-\\oint_C y\\,dx=\\dfrac12\\oint_C(x\\,dy-y\\,dx)$$'}));
    c3.append(el('p',{},'Ejemplo: el astroide $x=a\\cos^3t,\\ y=a\\operatorname{sen}^3t$, $t\\in[0,2\\pi]$ — una curva con $4$ "puntas", donde parametrizar el interior directamente es incómodo.'));
    const aAst=1;
    const planoAst=Plano(c3,{xMin:-1.3,xMax:1.3,yMin:-1.3,yMax:1.3,alto:300});
    planoAst.dibujar(P=>{
      P.ejes();
      P.parametrica(t=>[aAst*Math.pow(Math.cos(t),3),aAst*Math.pow(Math.sin(t),3)],0,2*Math.PI,{color:'--s1',grosor:2.2});
    });
    c3.append(el('p',{class:'note'},'El astroide (curva azul) no es del tipo "franja vertical simple" del tema Integrales dobles, Jacobiano y polares — describir su interior directamente exigiría partirlo en piezas; con Green basta recorrer el borde.'));
    Pasos(c3,[
      {tex:'dx=-3a\\cos^2t\\operatorname{sen}t\\,dt,\\qquad dy=3a\\operatorname{sen}^2t\\cos t\\,dt',nota:'Derivadas de x(t), y(t).'},
      {tex:'x\\,dy-y\\,dx=3a^2\\cos^4t\\operatorname{sen}^2t\\,dt+3a^2\\operatorname{sen}^4t\\cos^2t\\,dt',nota:'Se sustituye en x dy − y dx (el segundo término ya lleva el signo de −y dx).'},
      {tex:'=3a^2\\cos^2t\\operatorname{sen}^2t\\,(\\cos^2t+\\operatorname{sen}^2t)\\,dt',nota:'Se factoriza el comun 3a²·cos²t·sen²t.'},
      {tex:'=3a^2\\cos^2t\\operatorname{sen}^2t\\,dt=\\dfrac{3a^2}{4}\\operatorname{sen}^2(2t)\\,dt',nota:'Se usa sen²+cos²=1, y despues sen t·cos t = ½ sen(2t).'},
      {tex:'A=\\dfrac12\\int_0^{2\\pi}\\dfrac{3a^2}{4}\\operatorname{sen}^2(2t)\\,dt=\\dfrac{3a^2}{8}\\int_0^{2\\pi}\\operatorname{sen}^2(2t)\\,dt',nota:'Se saca la constante 3a²/8.'},
      {tex:'\\int_0^{2\\pi}\\operatorname{sen}^2(2t)\\,dt=\\pi\\ \\Longrightarrow\\ A=\\dfrac{3a^2}{8}\\cdot\\pi=\\dfrac{3\\pi a^2}{8}',nota:'sen² promedia ½ sobre cualquier número entero de períodos: ½·2π=π.'}
    ],{modId:'green',titulo:'Área del astroide x=a·cos³t, y=a·sen³t'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$\\tfrac{3\\pi a^2}{8}$ es exactamente el resultado conocido para el área encerrada por un astroide — y es menor que $\\pi a^2$ (el círculo de radio $a$ que lo circunscribe), como corresponde a una curva con las puntas "hundidas" hacia adentro.'));
    c3.append(el('p',{class:'fuente'},'Fuente: fórmula del área vía Green, index-v3.html (contenido auditado), tema "Teorema de Green". El ejemplo del astroide, su derivación completa y la verificación son elaboración propia — index-v3.html solo trae el caso de la elipse (ejercicio 19, resuelto en la card "Ejercicios" de este módulo).'));
    sec.append(c3);

    /* -------- Card 4: regiones con agujeros -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Green en regiones con agujeros'));
    c4.append(el('p',{},'Cuando $D$ tiene un agujero (no es simplemente conexa), Green se extiende sumando ',el('b',{},'todas'),' las curvas del borde — la exterior antihoraria y cada interior ',el('b',{},'horaria'),' (para que $D$ siga quedando a la izquierda en las dos):'));
    c4.append(el('div',{class:'formula',html:'$$\\oint_{C_{\\text{ext}}}(P\\,dx+Q\\,dy)+\\oint_{C_{\\text{int}}}(P\\,dx+Q\\,dy)=\\iint_D\\left(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\right)dA$$'}));
    let radioAgu=2;
    const planoAgu=Plano(c4,{xMin:-2.6,xMax:2.6,yMin:-2.6,yMax:2.6,alto:320});
    planoAgu.dibujar(P=>{
      P.ejes();
      P.parametrica(t=>[radioAgu*Math.cos(t),radioAgu*Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2});
      P.parametrica(t=>[Math.cos(t),Math.sin(t)],0,2*Math.PI,{color:'--s4',grosor:2});
      for(const t of [0,Math.PI/2,Math.PI,3*Math.PI/2]){
        const xo=radioAgu*Math.cos(t),yo=radioAgu*Math.sin(t), txo=-Math.sin(t),tyo=Math.cos(t);
        P.vector(xo,yo,xo+0.4*txo,yo+0.4*tyo,{color:'--s1',punta:6});
        const xi=Math.cos(t),yi=Math.sin(t), txi=Math.sin(t),tyi=-Math.cos(t);
        P.vector(xi,yi,xi+0.35*txi,yi+0.35*tyi,{color:'--s4',punta:6});
      }
      P.texto(-0.35,0.15,'origen',{color:'--muted',tam:11});
    });
    btnGroup(c4,[{label:'Radio exterior 2',value:2},{label:'Radio exterior 3',value:3}],v=>{ radioAgu=v; planoAgu.redibujar(); });
    c4.append(el('p',{class:'note'},'Región $D$: la corona entre el círculo interior (rojo, siempre radio $1$, horario) y el exterior (azul, radio ajustable, antihorario) — el agujero circular alrededor del origen, entre ambos, ',el('b',{},'no'),' es parte de $D$.'));
    c4.append(el('p',{},'Ejemplo clásico: $\\mathbf F=\\left\\langle\\dfrac{-y}{x^2+y^2},\\ \\dfrac{x}{x^2+y^2}\\right\\rangle$, indefinido en el origen. Fuera del origen, $Q_x-P_y=0$ en ',el('i',{},'todo'),' punto (verificable derivando directamente) — pero eso ',el('i',{},'no'),' dice que la circulación sea $0$, porque el origen (donde $\\mathbf F$ no está definido) queda dentro del agujero, y ahí Green normal no aplica.'));
    Pasos(c4,[
      {tex:'\\text{En un círculo de radio }r:\\ x=r\\cos\\theta,\\ y=r\\operatorname{sen}\\theta',nota:'Se calcula la circulación directa sobre cualquier círculo centrado en el origen.'},
      {tex:'P\\,dx=\\operatorname{sen}^2\\theta\\,d\\theta,\\qquad Q\\,dy=\\cos^2\\theta\\,d\\theta',nota:'Sustituyendo P, Q, dx, dy y simplificando (el radio r se cancela en ambos).'},
      {tex:'\\oint_{C_r}(P\\,dx+Q\\,dy)=\\int_0^{2\\pi}(\\operatorname{sen}^2\\theta+\\cos^2\\theta)\\,d\\theta=\\int_0^{2\\pi}1\\,d\\theta=2\\pi',nota:'Da 2π sobre CUALQUIER círculo centrado en el origen, sin importar el radio.'}
    ],{modId:'green',titulo:'Circulación de F=⟨−y,x⟩/(x²+y²) sobre un círculo de radio r'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación de la fórmula con agujero: '),'con $Q_x-P_y=0$ en toda la corona $D$, la fórmula de arriba da $\\oint_{C_{\\text{ext}}}+\\oint_{C_{\\text{int,horario}}}=0$, es decir $\\oint_{C_{\\text{ext,antihorario}}}=\\oint_{C_{\\text{int,antihorario}}}$. Y en efecto: el cálculo de arriba dio $2\\pi$ para ',el('i',{},'cualquier'),' radio $r$ — el círculo exterior (radio $2$ o $3$) y el interior (radio $1$) dan exactamente el mismo valor, $2\\pi$, confirmando la igualdad sin tener que elegir un radio específico.'));
    c4.append(el('p',{class:'note'},'Esta $\\mathbf F$ conecta con la identidad $\\operatorname{rot}(\\nabla f)=\\mathbf 0\\Rightarrow$ conservativo del tema Gradiente, divergencia y rotacional (módulo Superficies paramétricas, gradiente, divergencia y rotacional): acá $Q_x-P_y=0$ en todo punto donde $\\mathbf F$ está definida, pero $\\mathbf F$ ',el('i',{},'no'),' es conservativa en ese dominio (la circulación en torno al origen no es $0$) — porque el plano sin el origen no es simplemente conexo. Es el contraejemplo estándar de por qué esa implicación necesita esa hipótesis.'));
    c4.append(el('p',{class:'fuente'},'Fuente: extensión de Green a regiones con agujeros, desarrollo estándar de la materia (Stewart/Larson, Green en dominios múltiplemente conexos) — no está en index-v3.html, el vault ni Canvas 2026-2. El campo ⟨−y,x⟩/(x²+y²), su cálculo y ambas verificaciones son elaboración propia; es el mismo tipo de campo (por su forma ⟨−y,x⟩) que se compara con uno divergente en la card "Comparando dos campos" del módulo Superficies paramétricas, gradiente, divergencia y rotacional, aunque ahí no lleva el denominador que lo hace singular en el origen.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Con Green, deducir el área de una elipse $x=a\\cos t,\\,y=b\\operatorname{sen}t$ a partir de $A=\\tfrac12\\oint(x\\,dy-y\\,dx)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$dx=-a\\operatorname{sen}t\\,dt,\\quad dy=b\\cos t\\,dt\\ \\Longrightarrow\\ x\\,dy-y\\,dx=ab\\cos^2t\\,dt+ab\\operatorname{sen}^2t\\,dt=ab\\,dt$$'}),
        el('div',{class:'formula',html:'$$A=\\dfrac12\\int_0^{2\\pi}ab\\,dt=\\dfrac12\\cdot ab\\cdot2\\pi=\\pi ab$$'}),
        el('p',{class:'note'},'Coincide con la fórmula conocida del área de una elipse — mismo método de la card "Cálculo de áreas con Green", con una curva más simple que el astroide.')));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con Green (forma de circulación), evalúe $\\displaystyle\\oint_C(xy\\,dx+x^2\\,dy)$, con $C$ el borde del triángulo $(0,0),(1,0),(0,1)$, orientado positivamente.'),
      el('div',{},
        el('p',{},'Con $P=xy$, $Q=x^2$: $Q_x-P_y=2x-x=x$.'),
        el('div',{class:'formula',html:'$$\\oint_C(xy\\,dx+x^2\\,dy)=\\iint_D x\\,dA=\\int_0^1\\int_0^{1-x}x\\,dy\\,dx=\\int_0^1x(1-x)\\,dx=\\dfrac12-\\dfrac13=\\dfrac16$$'}),
        el('p',{class:'note'},'Verificación directa (sumando los 3 lados sin Green): en los dos catetos ($y=0$ o $x=0$) el integrando se anula; en la hipotenusa $x=1-t,\\,y=t$, $t\\in[0,1]$, da $\\int_0^1(1-t)(1-2t)\\,dt=\\tfrac16$ — los tres tramos suman $0+\\tfrac16+0=\\tfrac16$, igual que con Green.')));
    c5.append(ej2);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, index-v3.html (contenido auditado), ejercicio 19 ("Usar Green para deducir el área de una elipse…"). Ejercicio 2: index-v3.html, ejemplo 15 ("Teorema de Green sobre un triángulo"), presentado acá como ejercicio con la verificación directa que ya traía.'));
    sec.append(c5);
  }});
