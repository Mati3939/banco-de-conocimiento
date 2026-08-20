registerModule({id:'varias-variables',title:'Funciones de varias variables',unidad:'II',semanas:[3],
  evaluacion:['test-1','certamen-1'],
  lead:'Antes de derivar hace falta poder describir una función de dos variables: dónde vive, cómo se ve su gráfica en el espacio, y qué corte queda al fijar su altura.',
  build(sec){

    /* -------- Card 1: dominio y recorrido -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Funciones de varias variables: dominio y recorrido'));
    c1.append(el('p',{},'Una función real de dos variables asigna a cada par $(x,y)$ de un subconjunto $D\\subseteq\\mathbb R^2$ un único número real:'));
    c1.append(el('div',{class:'formula',html:'$$f:D\\subseteq\\mathbb R^2\\to\\mathbb R,\\qquad z=f(x,y)$$'}));
    c1.append(el('p',{},'El ',el('b',{},'dominio'),' $D$ es el subconjunto de $\\mathbb R^2$ donde la fórmula tiene sentido (igual que en una variable: raíces con argumento no negativo, denominadores no nulos, logaritmos con argumento positivo). El ',el('b',{},'recorrido'),' es el conjunto de valores $z$ que efectivamente toma $f$ sobre $D$.'));
    c1.append(el('p',{},'Dos ejemplos típicos — uno con raíz, uno con logaritmo — muestran cómo una desigualdad en $x,y$ se convierte en una región sombreada del plano:'));
    const flex1=el('div',{class:'flexcols'});
    const col1a=el('div',{style:'flex:1 1 320px'}), col1b=el('div',{style:'flex:1 1 320px'});
    col1a.append(el('p',{class:'note',style:'font-weight:600'},'Con raíz'));
    col1a.append(el('div',{class:'formula',html:'$$f(x,y)=\\sqrt{9-x^2-y^2}\\ \\Longrightarrow\\ D=\\{(x,y):x^2+y^2\\le9\\}$$'}));
    const planoRaiz=Plano(col1a,{xMin:-4,xMax:4,yMin:-4,yMax:4,alto:260});
    planoRaiz.dibujar(P=>{
      P.ejes();
      P.region(x=>Math.sqrt(Math.max(0,9-x*x)),x=>-Math.sqrt(Math.max(0,9-x*x)),-3,3,{color:'--s1',alpha:0.28});
      P.parametrica(t=>[3*Math.cos(t),3*Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2});
    });
    col1a.append(el('p',{class:'note'},'Bajo la raíz no puede quedar un número negativo: $9-x^2-y^2\\ge0\\iff x^2+y^2\\le9$ — el disco cerrado de radio 3.'));
    col1b.append(el('p',{class:'note',style:'font-weight:600'},'Con logaritmo'));
    col1b.append(el('div',{class:'formula',html:'$$g(x,y)=\\ln(y-x^2)\\ \\Longrightarrow\\ D=\\{(x,y):y\\gt x^2\\}$$'}));
    const planoLog=Plano(col1b,{xMin:-3,xMax:3,yMin:-1,yMax:5,alto:260});
    planoLog.dibujar(P=>{
      P.ejes();
      P.region(x=>5,x=>x*x,-2.2,2.2,{color:'--s5',alpha:0.28});
      P.curva(x=>x*x,{color:'--s5',grosor:2});
    });
    col1b.append(el('p',{class:'note'},'El logaritmo exige argumento estrictamente positivo: $y-x^2\\gt0\\iff y\\gt x^2$ — la región abierta arriba de la parábola (el borde mismo, la curva $y=x^2$, no pertenece al dominio).'));
    flex1.append(col1a,col1b);
    c1.append(flex1);
    c1.append(el('p',{class:'fuente'},'Fuente: elaboración propia (dominio y recorrido de funciones de dos variables, contenido estándar de Stewart) — el Listado 1 de Canvas 2026-2 solo trae ítems de funciones vectoriales (ver los otros temas de la Unidad I); esta unidad, al igual que hace index-v3.html con límites y continuidad, se arma con el temario genérico del curso.'));
    sec.append(c1);

    /* función compartida por las cards 2, 3 y 4: un paraboloide simple */
    const fPar=(x,y)=>x*x+y*y;

    /* -------- Card 2: interpretación geométrica en R³ -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Interpretación geométrica en $\\mathbb R^3$'));
    c2.append(el('p',{},'La gráfica de $f$ es el conjunto de puntos $(x,y,f(x,y))$ con $(x,y)\\in D$ — una superficie en $\\mathbb R^3$, la versión "de dos variables" de la curva $y=f(x)$ del cálculo de una variable:'));
    c2.append(el('div',{class:'formula',html:'$$\\text{gráfica de }f=\\{(x,y,f(x,y)):(x,y)\\in D\\}\\subseteq\\mathbb R^3$$'}));
    c2.append(el('p',{},'Ejemplo que va a acompañar esta card y las dos siguientes: el paraboloide $f(x,y)=x^2+y^2$. Arrastrá para rotarlo:'));
    const espGraf=Espacio(c2,{alto:440,escala:28});
    espGraf.dibujar(E=>{
      E.ejes3({largo:2});
      E.superficie((u,v)=>[u,v,fPar(u,v)],{uMin:-1.8,uMax:1.8,vMin:-1.8,vMax:1.8,nu:14,nv:14});
    });
    c2.append(el('p',{class:'note'},'Es un "tazón": el mínimo está en $(0,0,0)$ y la altura crece igual de rápido en todas las direcciones horizontales, porque $f$ depende de $x$ e $y$ solo a través de $x^2+y^2$ (la distancia al origen al cuadrado).'));
    c2.append(el('p',{class:'fuente'},'Fuente: elaboración propia (gráfica de una función de dos variables como superficie, Stewart) — el paraboloide $x^2+y^2$ es un ejemplo estándar, elegido para reutilizarse en las dos cards siguientes.'));
    sec.append(c2);

    /* -------- Card 3: tabla de doble entrada -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Tabla de doble entrada'));
    c3.append(el('p',{},'"Visualización gráfica, tabla de doble entrada" está en el temario oficial: antes de imaginar la superficie completa, conviene ver algunos de sus valores en una grilla. Misma $f(x,y)=x^2+y^2$ de la card anterior:'));
    Tabla(c3,{columnas:['y \\ x','-2','-1','0','1','2'],filas:[
      ['2','8','5','4','5','8'],
      ['1','5','2','1','2','5'],
      ['0','4','1','0','1','4'],
      ['-1','5','2','1','2','5'],
      ['-2','8','5','4','5','8']
    ]});
    c3.append(el('p',{class:'note'},'Cada celda es $x^2+y^2$ para esa fila y columna — p.ej. la esquina superior izquierda es $(-2)^2+2^2=4+4=8$. La tabla es simétrica en las cuatro direcciones porque $f(x,y)=f(-x,y)=f(x,-y)$: los cuatro "8" de las esquinas son justo los cuatro puntos más altos de la malla que se vio en la card anterior.'));
    c3.append(el('p',{class:'fuente'},'Fuente: elaboración propia — misma función $f(x,y)=x^2+y^2$ de la card "Interpretación geométrica"; la tabla de doble entrada la pide el temario oficial (Canvas 2026-2), pero sin valores concretos asignados.'));
    sec.append(c3);

    /* -------- Card 4: curvas de nivel -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Curvas de nivel'));
    c4.append(el('p',{},'La curva de nivel $k$ de $f$ es el conjunto de puntos del dominio donde $f$ vale exactamente $k$ — el "mapa de altura" que queda al cortar la gráfica con el plano horizontal $z=k$ y mirarlo desde arriba:'));
    c4.append(el('div',{class:'formula',html:'$$\\text{curva de nivel }k:\\quad\\{(x,y)\\in D: f(x,y)=k\\}$$'}));
    c4.append(el('p',{},'Para $f(x,y)=x^2+y^2$: $x^2+y^2=k$ es una circunferencia de radio $\\sqrt k$ (si $k\\gt0$; para $k=0$ es solo el origen). A la izquierda, el mapa de curvas de nivel; a la derecha, el mismo corte visto sobre la superficie:'));
    const flex4=el('div',{class:'flexcols'});
    const col4a=el('div',{style:'flex:1 1 320px'}), col4b=el('div',{style:'flex:1 1 320px'});
    let kNivel=1.5;
    const planoNivel=Plano(col4a,{xMin:-2.6,xMax:2.6,yMin:-2.6,yMax:2.6,alto:340});
    planoNivel.dibujar(P=>{
      P.ejes();
      const r=Math.sqrt(kNivel);
      P.parametrica(t=>[r*Math.cos(t),r*Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2.4});
    });
    const espNivel=Espacio(col4b,{alto:440,escala:28});
    espNivel.dibujar(E=>{
      E.ejes3({largo:2});
      E.superficie((u,v)=>[u,v,fPar(u,v)],{uMin:-1.8,uMax:1.8,vMin:-1.8,vMax:1.8,nu:14,nv:14,color:'--grid'});
      E.superficie((u,v)=>[u,v,kNivel],{uMin:-2.1,uMax:2.1,vMin:-2.1,vMax:2.1,nu:6,nv:6,color:'--s4'});
      const r=Math.sqrt(kNivel);
      E.curva3(t=>[r*Math.cos(t),r*Math.sin(t),kNivel],0,2*Math.PI,{color:'--s1',grosor:3});
    });
    flex4.append(col4a,col4b);
    c4.append(flex4);
    const notaNivel=el('p',{class:'note'});
    function actualizarNivel(){
      notaNivel.textContent='k = '+kNivel.toFixed(2)+'  →  circunferencia de radio √k ≈ '+Math.sqrt(kNivel).toFixed(2)+'. El plano horizontal (naranjo) corta la superficie exactamente en esa circunferencia (azul), a la misma altura que se dibuja sola en el mapa de la izquierda.';
    }
    actualizarNivel();
    c4.append(notaNivel);
    c4.append(el('div',{class:'controls'},
      el('label',{},'k:'),
      el('input',{type:'range',min:'0.25',max:'3',step:'0.25',value:String(kNivel),oninput:e=>{ kNivel=parseFloat(e.target.value); planoNivel.redibujar(); espNivel.redibujar(); actualizarNivel(); }})
    ));
    c4.append(el('p',{class:'note'},'Verificación en $k=1$: $x^2+y^2=1$ es la circunferencia unitaria, radio $\\sqrt1=1$; llevando el slider a $k=1$ el radio mostrado en el mapa coincide con el radio del corte en la superficie 3D, como debe ser por construcción (ambos vienen de la misma fórmula $r=\\sqrt k$).'));
    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia — misma función $f(x,y)=x^2+y^2$ de las cards "Interpretación geométrica en $\\mathbb R^3$" y "Tabla de doble entrada"; "mapa de curvas de nivel" está en el temario oficial (Canvas 2026-2).'));
    sec.append(c4);

    /* -------- Card 5: funciones implícitas -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Funciones implícitas: cuándo $F(x,y,z)=0$ define $z=f(x,y)$'));
    c5.append(el('p',{},'No toda superficie viene dada como $z=f(x,y)$: a veces aparece como una ecuación $F(x,y,z)=0$ que mezcla las tres variables (por ejemplo, una esfera $x^2+y^2+z^2=4$). El teorema de la función implícita dice cuándo esa ecuación sí puede despejarse, al menos cerca de un punto:'));
    c5.append(el('div',{class:'formula',html:'$$F(x,y,z)=0,\\ \\ \\dfrac{\\partial F}{\\partial z}(x_0,y_0,z_0)\\ne0\\ \\Longrightarrow\\ z=f(x,y)\\ \\text{cerca de }(x_0,y_0,z_0)$$'}));
    c5.append(el('p',{},'Con la esfera $F(x,y,z)=x^2+y^2+z^2-4=0$: $\\dfrac{\\partial F}{\\partial z}=2z$.'));
    c5.append(el('ul',{},
      el('li',{},'En el polo norte $(0,0,2)$: $\\partial F/\\partial z=4\\ne0$ → cerca de ahí la esfera sí es la gráfica de una función, $z=\\sqrt{4-x^2-y^2}$ (el hemisferio superior).'),
      el('li',{},'En el ecuador, p.ej. $(2,0,0)$: $\\partial F/\\partial z=0$ → el teorema no garantiza nada ahí. Y en efecto, cerca del ecuador un mismo $(x,y)$ tiene dos alturas posibles (arriba y abajo de la esfera): la superficie no es la gráfica de ninguna función $z=f(x,y)$ en esa zona.')
    ));
    c5.append(el('p',{class:'note'},'Este resultado es el puente hacia la derivación implícita: una vez que se sabe que $z=f(x,y)$ existe cerca de un punto (aunque no se pueda despejar a mano), se puede hallar $\\partial z/\\partial x$ y $\\partial z/\\partial y$ derivando $F$ implícitamente — sin despejar nunca $f$ explícitamente.'));
    c5.append(el('p',{class:'fuente'},'Fuente: elaboración propia (teorema de la función implícita, Stewart) — no está cubierto en Canvas 2026-2 ni en el material de la generación anterior del vault; sirve de puente hacia "Derivación implícita", en el tema "Derivadas parciales".'));
    sec.append(c5);

    /* -------- Card 6: superficies cuádricas -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Superficies cuádricas'));
    c6.append(el('p',{},'Las superficies cuádricas son el análogo 3D de las cónicas: seis formas canónicas definidas por una ecuación de segundo grado en $x,y,z$, que reaparecen una y otra vez como dominios de integración en las unidades siguientes.'));
    const nombresCua=['Elipsoide','Hiperboloide de 1 hoja','Hiperboloide de 2 hojas','Paraboloide elíptico','Paraboloide hiperbólico (silla)','Cono elíptico'];
    const ecCua=['x² / a² + y² / b² + z² / c² = 1','x² / a² + y² / b² − z² / c² = 1','−x² / a² − y² / b² + z² / c² = 1','z = x² / a² + y² / b²','z = x² / a² − y² / b²','z² = x² / a² + y² / b²'];
    function cuadricaPunto(tp,u,v){
      const theta=v*2*Math.PI;
      if(tp===1){ const phi=u*Math.PI; return [1.3*Math.sin(phi)*Math.cos(theta),0.9*Math.sin(phi)*Math.sin(theta),1.1*Math.cos(phi)]; }
      if(tp===2){ const s=(u-0.5)*2; return [1.1*Math.cosh(s)*Math.cos(theta),1.1*Math.cosh(s)*Math.sin(theta),1.3*Math.sinh(s)]; }
      /* tp 3: el vértice de esta hoja está en z=1.3 (no en el origen) — es una
         propiedad real del hiperboloide de dos hojas, pero como Espacio centra
         su proyección en el origen del mundo (a diferencia de anim-cuadricas en
         v3, que recalcula centro y escala por figura), sin corrección la única
         hoja mostrada queda pegada al borde superior del lienzo. Se resta el
         punto medio del rango de z (≈1.827, entre 1.3 y 1.3·cosh(1.2)≈2.354)
         solo para centrarla en pantalla; la ecuación mostrada no cambia. */
      if(tp===3){ const s=u*1.2; return [1.0*Math.sinh(s)*Math.cos(theta),1.0*Math.sinh(s)*Math.sin(theta),1.3*Math.cosh(s)-1.827]; }
      if(tp===4){ const r=u*1.4; return [r*Math.cos(theta),r*Math.sin(theta)*0.85,r*r*0.6]; }
      if(tp===5){ const X=(u-0.5)*3,Y=(v-0.5)*3; return [X,Y,(X*X-Y*Y)*0.4]; }
      const s=(u-0.5)*3; return [0.7*s*Math.cos(theta),0.7*s*Math.sin(theta),s];
    }
    let tipoCua=1;
    const espCua=Espacio(c6,{alto:460,escala:80});
    espCua.dibujar(E=>{
      E.ejes3({largo:1.6});
      E.superficie((u,v)=>cuadricaPunto(tipoCua,u,v),{uMin:0,uMax:1,vMin:0,vMax:1,nu:12,nv:26});
    });
    const notaCua=el('p',{class:'note',style:'font-weight:600'});
    function actualizarCua(){ notaCua.textContent=nombresCua[tipoCua-1]+':   '+ecCua[tipoCua-1]; }
    actualizarCua();
    c6.append(notaCua);
    btnGroup(c6,nombresCua.map((n,i)=>({label:n,value:i+1})),v=>{ tipoCua=v; actualizarCua(); espCua.redibujar(); });
    c6.append(el('p',{class:'note'},'El hiperboloide de una hoja es una superficie conexa (se puede ir de un lado a otro sin salir de ella); el de dos hojas está partido en dos piezas separadas — esa es la diferencia geométrica clave entre ambos, y se ve con solo alternar entre los dos botones. El ',el('b',{},'método de las trazas'),' (cortar con $x=k$, $y=k$ o $z=k$ y mirar qué cónica queda) es la forma práctica de reconocer cuál es cuál sin la animación.'));
    c6.append(el('p',{class:'fuente'},'Fuente: elaboración propia (ecuaciones canónicas de Stewart), reciclando la parametrización y la lógica de rotación de "Superficies cuádricas rotables en 3D" de index-v3.html — no viene de Canvas 2026-2 ni del material de la generación anterior.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios'));
    c7.append(el('p',{class:'note'},'El Listado 1 de Canvas 2026-2 no trae ítems de esta unidad (sus 25 ítems son de funciones vectoriales y el triedro TNB, ver los otros temas de la Unidad I). Los ejercicios 1, 2 y 4 de abajo son elaboración propia; solo el ejercicio 3 reutiliza contenido ya auditado de index-v3.html.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Determine el dominio de $p(x,y)=\\sqrt{x^2-y}$ y de $q(x,y)=\\ln(4-x^2-y^2)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$p:\\ x^2-y\\ge0\\iff y\\le x^2\\qquad\\qquad q:\\ 4-x^2-y^2\\gt0\\iff x^2+y^2\\lt4$$'}),
        el('p',{class:'note'},'$D_p$ es la región a partir de la parábola $y=x^2$ hacia abajo; $D_q$ es el disco ',el('i',{},'abierto'),' de radio 2 (sin incluir la circunferencia borde, porque el logaritmo exige desigualdad estricta).')));
    c7.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Describa las curvas de nivel de $f(x,y)=xy$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$xy=k$$'}),
        el('p',{class:'note'},'Para $k\\ne0$: hipérbolas $y=k/x$ (en el primer y tercer cuadrante si $k\\gt0$; en el segundo y cuarto si $k\\lt0$). Para $k=0$: la unión de los dos ejes coordenados ($x=0$ o $y=0$), que es el caso degenerado donde la hipérbola colapsa en sus asíntotas.')));
    c7.append(ej2);

    const ej3=el('details',{},
      el('summary',{},'Ejercicio 3 — Clasifique la cuádrica $x^2+y^2-z^2=1$ y describa sus trazas en $z=k$, $x=0$ y $y=0$.'),
      el('div',{},
        el('p',{},'Es un ',el('b',{},'hiperboloide de una hoja'),' (eje $z$): un solo término negativo, superficie conexa.'),
        el('div',{class:'formula',html:'$$\\text{traza }z=k:\\ x^2+y^2=1+k^2\\ \\text{(circunferencia, radio }\\sqrt{1+k^2}\\text{)}$$'}),
        el('div',{class:'formula',html:'$$\\text{traza }x=0:\\ y^2-z^2=1\\ \\text{(hipérbola)}\\qquad\\text{traza }y=0:\\ x^2-z^2=1\\ \\text{(hipérbola)}$$'})));
    c7.append(ej3);

    const ej4=el('details',{},
      el('summary',{},'Ejercicio 4 — Para $F(x,y,z)=x^2-y^2+z^2-1=0$, ¿dónde falla la condición del teorema de la función implícita para despejar $z$?'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{\\partial F}{\\partial z}=2z=0\\iff z=0$$'}),
        el('p',{class:'note'},'En todo punto con $z=0$ sobre la superficie (p.ej. $(1,0,0)$, ya que $1-0+0=1$ ✓) el teorema no garantiza que $z$ se pueda despejar como función de $x,y$: ahí $F=0$ se reduce a $x^2-y^2=1$, y las dos ramas $z=\\pm\\sqrt{1-x^2+y^2}$ se tocan en $z=0$ — mismo fenómeno que en el ecuador de la esfera. (Este plano $z=0$ ',el('i',{},'no'),' es la "cintura" del hiperboloide: $F=0$ es un hiperboloide de una hoja de eje $y$ —por el signo negativo en $y^2$—, y su cintura, la sección circular de radio mínimo perpendicular al eje, está en $y=0$: ahí $x^2+z^2=1$.)')));
    c7.append(ej4);

    c7.append(el('p',{class:'fuente'},'Fuente: ejercicios 1 y 2, elaboración propia. Ejercicio 3: index-v3.html (contenido auditado), ejercicio "Clasificar la cuádrica x²+y²-z²=1" de la Unidad 1. Ejercicio 4: elaboración propia, aplicando el teorema de la función implícita de la card "Funciones implícitas" a una cuádrica.'));
    sec.append(c7);
  }});
