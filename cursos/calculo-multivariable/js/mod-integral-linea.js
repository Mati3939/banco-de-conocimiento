/* contenidoOficial original (índice a cubrir):
   - Integral de línea y propiedades
   - Teorema fundamental del cálculo de las integrales de línea
   El tema "Campos vectoriales" de index-v3.html (#tema-campos-vectoriales, justo
   antes de #tema-integrales-linea) no tiene módulo propio en esta unidad: se
   cubre acá, como base necesaria antes de poder hablar de integrales de línea
   vectoriales y de campos conservativos. */
registerModule({id:'integral-linea',title:'Integral de línea y teorema fundamental',unidad:'IV',semanas:[12],
  evaluacion:['test-4','certamen-2'],
  lead:'Integrar a lo largo de una curva en vez de un intervalo, y cuándo esa integral solo depende de los puntos inicial y final.',
  build(sec){
    /* -------- Card 1: campos vectoriales y campos conservativos -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Campos vectoriales y campos conservativos'));
    c1.append(el('p',{},'Un ',el('b',{},'campo vectorial'),' asigna un vector —no un número— a cada punto del plano o del espacio (velocidad de un fluido, fuerza gravitacional, campo eléctrico):'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf F(x,y)=\\langle P(x,y),\\,Q(x,y)\\rangle,\\qquad \\mathbf F(x,y,z)=\\langle P,\\,Q,\\,R\\rangle$$'}));
    c1.append(el('p',{},'$\\mathbf F$ es ',el('b',{},'conservativo'),' si es el gradiente de alguna función escalar $f$ (la ',el('b',{},'función potencial'),'): $\\mathbf F=\\nabla f$. En el plano, con dominio simplemente conexo, hay una prueba directa sin tener que adivinar $f$:'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf F=\\langle P,Q\\rangle\\ \\text{conservativo}\\ \\Longleftrightarrow\\ \\dfrac{\\partial P}{\\partial y}=\\dfrac{\\partial Q}{\\partial x}$$'}));
    c1.append(el('p',{},'Dos ejemplos, ambos usados más abajo en este módulo o en Superficies paramétricas, gradiente, divergencia y rotacional: $\\mathbf F=\\langle y,x\\rangle$ tiene $P_y=1=Q_x=1$ — conservativo (es $\\nabla(xy)$). $\\mathbf F=\\langle-y,x\\rangle$ tiene $P_y=-1\\neq Q_x=1$ — ',el('i',{},'no'),' es conservativo (es el campo puramente rotacional que se compara con uno divergente en la card "Comparando dos campos" del módulo Superficies paramétricas, gradiente, divergencia y rotacional).'));
    c1.append(el('p',{class:'note'},'Los campos conservativos importan porque, como se ve en la card "Teorema fundamental de las integrales de línea", su integral de línea no depende del camino recorrido, solo de los puntos inicial y final — igual que en física, donde el trabajo de la gravedad no depende de la trayectoria, solo de la altura.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Campos vectoriales". Los dos ejemplos de conservatividad son elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: integral de línea de un campo escalar -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Integral de línea de un campo escalar'));
    c2.append(el('p',{},'La integral de línea de un campo ',el('b',{},'escalar'),' $f$ pondera por la longitud de arco recorrida — ',el('b',{},'no'),' depende de la orientación de la curva ni de cómo se parametrice, solo de la curva misma:'));
    c2.append(el('div',{class:'formula',html:'$$\\int_C f\\,ds=\\int_a^b f(\\mathbf r(t))\\,\\lVert\\mathbf r\'(t)\\rVert\\,dt$$'}));
    c2.append(el('p',{},'Ejemplo: $\\displaystyle\\int_C(x+y)\\,ds$, con $C$ el segmento de $(0,0)$ a $(1,1)$, parametrizado como $\\mathbf r(t)=\\langle t,t\\rangle$, $t\\in[0,1]$.'));
    Pasos(c2,[
      {tex:'\\mathbf r\'(t)=\\langle1,1\\rangle\\ \\Longrightarrow\\ \\lVert\\mathbf r\'(t)\\rVert=\\sqrt2',nota:'Derivada de la parametrización y su norma (constante, porque la recta se recorre a rapidez uniforme).'},
      {tex:'f(\\mathbf r(t))=x+y=t+t=2t',nota:'Se evalúa f sobre la curva.'},
      {tex:'\\int_C(x+y)\\,ds=\\int_0^1 2t\\cdot\\sqrt2\\,dt=\\sqrt2\\left[t^2\\right]_0^1=\\sqrt2\\approx1{,}414',nota:'Antiderivada en t, evaluada entre 0 y 1.'}
    ],{modId:'integral-linea',titulo:'∫(x+y) ds sobre el segmento (0,0)→(1,1)'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación con otra parametrización — por longitud de arco: '),'con $s\\in[0,\\sqrt2]$ recorriendo la misma recta a rapidez $1$, $x=y=s/\\sqrt2$ y $\\lVert\\mathbf r\'(s)\\rVert=1$: $\\displaystyle\\int_0^{\\sqrt2}\\dfrac{2s}{\\sqrt2}\\,ds=\\sqrt2\\left[\\dfrac{s^2}{2}\\right]_0^{\\sqrt2}=\\sqrt2\\cdot1=\\sqrt2$ — mismo resultado, con una parametrización completamente distinta, tal como garantiza la fórmula: $\\int_C f\\,ds$ no depende de cómo se recorra $C$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: fórmula, index-v3.html (contenido auditado), tema "Integrales de línea". Ejemplo: index-v3.html, ejercicio 18 ("Calcular ∫(x+y) ds…"), resuelto de nuevo acá con una segunda verificación (parametrización por longitud de arco) que no está en index-v3.'));
    sec.append(c2);

    /* -------- Card 3: integral de línea de un campo vectorial (trabajo) -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Integral de línea de un campo vectorial (trabajo)'));
    c3.append(el('p',{},'La integral de línea de un campo ',el('b',{},'vectorial'),' —el trabajo que hace $\\mathbf F$ al mover una partícula a lo largo de $C$— sí depende de la orientación: invertir el sentido de recorrido cambia el signo.'));
    c3.append(el('div',{class:'formula',html:'$$W=\\int_C\\mathbf F\\cdot d\\mathbf r=\\int_a^b\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r\'(t)\\,dt$$'}));
    c3.append(el('p',{},'Ejemplo: $\\mathbf F(x,y)=\\langle x^2,\\,xy\\rangle$ a lo largo de $\\mathbf r(t)=\\langle t,\\,t^2\\rangle$, $t\\in[0,1]$ (de $(0,0)$ a $(1,1)$).'));
    const planoW=Plano(c3,{xMin:-0.15,xMax:1.3,yMin:-0.15,yMax:1.4,alto:340});
    planoW.dibujar(P=>{
      P.ejes();
      P.campo((x,y)=>x===0?NaN:(x*y)/(x*x),{color:'--muted',nx:13,ny:11,largo:9});
      P.parametrica(t=>[t,t*t],0,1,{color:'--s1',grosor:2.2});
      for(const t of [0.25,0.5,0.75,1]){
        const x=t,y=t*t, Fx=x*x, Fy=x*y, esc=0.22;
        P.vector(x,y,x+esc*Fx,y+esc*Fy,{color:'--s4',punta:7});
      }
      P.punto(0,0,{color:'--s2',etiqueta:'(0,0)'});
      P.punto(1,1,{color:'--s2',etiqueta:'(1,1)'});
    });
    c3.append(el('p',{class:'note'},'Curva azul: $\\mathbf r(t)=\\langle t,t^2\\rangle$. Flechas naranjas: el campo $\\mathbf F=\\langle x^2,xy\\rangle$ evaluado ',el('i',{},'en la curva misma'),', en cuatro puntos — el trabajo suma la componente de esas flechas ',el('i',{},'a lo largo'),' de la curva. Flechas tenues de fondo: dirección de $\\mathbf F$ en todo el plano.'));
    Pasos(c3,[
      {tex:'\\mathbf r\'(t)=\\langle1,\\,2t\\rangle,\\qquad \\mathbf F(\\mathbf r(t))=\\langle t^2,\\;t\\cdot t^2\\rangle=\\langle t^2,\\,t^3\\rangle',nota:'Derivada de la curva y el campo evaluado sobre ella (x=t, y=t²).'},
      {tex:'\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r\'(t)=t^2\\cdot1+t^3\\cdot2t=t^2+2t^4',nota:'Producto punto componente a componente.'},
      {tex:'W=\\int_0^1(t^2+2t^4)\\,dt=\\left[\\dfrac{t^3}{3}+\\dfrac{2t^5}{5}\\right]_0^1=\\dfrac13+\\dfrac25=\\dfrac{11}{15}\\approx0{,}733',nota:'Antiderivada en t, evaluada entre 0 y 1 (común denominador 15).'}
    ],{modId:'integral-linea',titulo:'Trabajo de F=⟨x²,xy⟩ sobre r(t)=⟨t,t²⟩'});
    c3.append(el('p',{class:'note'},el('b',{},'Este campo no es conservativo: '),'$P_y=\\partial(x^2)/\\partial y=0$ pero $Q_x=\\partial(xy)/\\partial x=y$, que no es $0$ en general — no cumple la prueba de la card "Campos vectoriales y campos conservativos". Por eso el resultado sí depende de la curva: con la recta $\\mathbf r(t)=\\langle t,t\\rangle$ entre los ',el('i',{},'mismos'),' puntos $(0,0)$ y $(1,1)$, $\\mathbf F(\\mathbf r(t))=\\langle t^2,t^2\\rangle$, $\\mathbf r\'(t)=\\langle1,1\\rangle$, y $W=\\int_0^1 2t^2\\,dt=\\tfrac23\\approx0{,}667$ — distinto de $\\tfrac{11}{15}$. No es un error: es justo lo que distingue a un campo no conservativo, y lo contrario de lo que pasa en la card "Teorema fundamental de las integrales de línea".'));
    c3.append(el('p',{class:'fuente'},'Fuente: fórmula e ejemplo, index-v3.html (contenido auditado), ejemplo 14 ("Trabajo de un campo a lo largo de una curva parametrizada"), tema "Integrales de línea". La visualización con Plano y la comparación con la recta (path-dependencia) son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: función potencial -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Encontrar la función potencial'));
    c4.append(el('p',{},'Si $\\mathbf F=\\langle P,Q\\rangle$ pasa la prueba $P_y=Q_x$ de la card "Campos vectoriales y campos conservativos", su potencial $f$ (con $\\nabla f=\\mathbf F$) se construye integrando una componente y usando la otra para completar la constante de integración — que en realidad es una función de la variable que falta. Ejemplo: $\\mathbf F(x,y)=\\langle2xy,\\,x^2-y^2\\rangle$.'));
    Pasos(c4,[
      {tex:'P_y=2x,\\qquad Q_x=2x\\ \\Longrightarrow\\ P_y=Q_x',nota:'Primero se confirma que F es conservativo — si no, no existe f.'},
      {tex:'f(x,y)=\\int P\\,dx=\\int2xy\\,dx=x^2y+g(y)',nota:'Se integra P respecto de x; la "constante" puede depender de y, que no se tocó.'},
      {tex:'f_y=x^2+g\'(y)\\ \\overset{!}{=}\\ Q=x^2-y^2\\ \\Longrightarrow\\ g\'(y)=-y^2',nota:'Se deriva ese f respecto de y y se iguala a Q, para hallar g\'(y).'},
      {tex:'g(y)=-\\dfrac{y^3}{3}+C\\ \\Longrightarrow\\ f(x,y)=x^2y-\\dfrac{y^3}{3}',nota:'Se integra g\'(y); C se puede tomar 0, porque cualquier potencial sirve.'}
    ],{modId:'integral-linea',titulo:'Potencial de F=⟨2xy, x²−y²⟩'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación: '),'$f_x=\\partial(x^2y-y^3/3)/\\partial x=2xy=P$ ✓; $f_y=x^2-y^2=Q$ ✓ — ambas parciales de $f$ reproducen $\\mathbf F$ exactamente. Este $f$ se reutiliza en la card "Teorema fundamental de las integrales de línea".'));
    c4.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Stewart/Larson, método para hallar la función potencial) — index-v3.html solo define $\\mathbf F=\\nabla f$, sin mostrar cómo construir $f$; no está en el vault ni en Canvas 2026-2. El ejemplo y su verificación son elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: teorema fundamental de las integrales de línea -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Teorema fundamental de las integrales de línea'));
    c5.append(el('p',{},'Si $\\mathbf F=\\nabla f$ es conservativo, el ',el('b',{},'Teorema Fundamental de las integrales de línea'),' evita integrar del todo: solo hace falta evaluar el potencial en los extremos.'));
    c5.append(el('div',{class:'formula',html:'$$\\int_C\\nabla f\\cdot d\\mathbf r=f(\\mathbf r(b))-f(\\mathbf r(a))$$'}));
    c5.append(el('p',{},'En particular, sobre cualquier curva ',el('b',{},'cerrada'),' esa integral es siempre $0$ (el punto inicial y final coinciden). Con $\\mathbf F=\\langle2xy,x^2-y^2\\rangle$ y $f=x^2y-y^3/3$ de la card "Encontrar la función potencial", trabajo de $(0,0)$ a $(1,2)$:'));
    Pasos(c5,[
      {tex:'f(1,2)=1^2(2)-\\dfrac{2^3}{3}=2-\\dfrac83=-\\dfrac23,\\qquad f(0,0)=0',nota:'Se evalúa el potencial en los dos extremos.'},
      {tex:'\\int_C\\mathbf F\\cdot d\\mathbf r=f(1,2)-f(0,0)=-\\dfrac23',nota:'Teorema fundamental: la diferencia de potencial.'}
    ],{modId:'integral-linea',titulo:'FTLI: trabajo de F=⟨2xy,x²−y²⟩ de (0,0) a (1,2)'});
    c5.append(el('p',{class:'note'},el('b',{},'Verificación por dos caminos directos, sin usar el teorema — '),'recta $\\mathbf r(t)=\\langle t,2t\\rangle$: $\\mathbf F(\\mathbf r(t))=\\langle4t^2,\\,t^2-4t^2\\rangle=\\langle4t^2,-3t^2\\rangle$, $\\mathbf r\'=\\langle1,2\\rangle$, $\\int_0^1(4t^2-6t^2)\\,dt=\\int_0^1-2t^2\\,dt=-\\tfrac23$. Parábola $\\mathbf r(t)=\\langle t,2t^2\\rangle$ (mismos extremos): $\\mathbf F(\\mathbf r(t))=\\langle4t^3,\\,t^2-4t^4\\rangle$, $\\mathbf r\'=\\langle1,4t\\rangle$, $\\int_0^1(4t^3+4t^3-16t^5)\\,dt=\\int_0^1(8t^3-16t^5)\\,dt=2-\\tfrac83=-\\tfrac23$. Los tres caminos —el teorema y las dos curvas distintas— dan exactamente $-\\tfrac23$: es justo la independencia del camino que promete la conservatividad, en contraste con el campo no conservativo de la card "Integral de línea de un campo vectorial (trabajo)".'));
    c5.append(el('p',{class:'note'},el('b',{},'Curva cerrada: '),'recorriendo la recta de $(0,0)$ a $(1,2)$ y volviendo por la parábola (invertida, de $(1,2)$ a $(0,0)$), el segundo tramo aporta $-(-\\tfrac23)=\\tfrac23$ (invertir el sentido cambia el signo) — total $-\\tfrac23+\\tfrac23=0$, tal como dice el teorema para toda curva cerrada.'));
    c5.append(el('p',{class:'fuente'},'Fuente: enunciado, index-v3.html (contenido auditado), tema "Integrales de línea" ("Teorema Fundamental (campos conservativos)"). El ejemplo, ambas verificaciones por camino directo y la verificación de curva cerrada son elaboración propia, reutilizando F y f de la card "Encontrar la función potencial".'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Mostrar que $\\mathbf F(x,y,z)=\\langle yz,\\,xz,\\,xy\\rangle$ es conservativo y hallar su función potencial.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\operatorname{rot}\\mathbf F=\\left\\langle\\dfrac{\\partial(xy)}{\\partial y}-\\dfrac{\\partial(xz)}{\\partial z},\\ \\dfrac{\\partial(yz)}{\\partial z}-\\dfrac{\\partial(xy)}{\\partial x},\\ \\dfrac{\\partial(xz)}{\\partial x}-\\dfrac{\\partial(yz)}{\\partial y}\\right\\rangle=\\langle x-x,\\,y-y,\\,z-z\\rangle=\\mathbf 0$$'}),
        el('p',{class:'note'},'$\\operatorname{rot}\\mathbf F=\\mathbf0$ en todo $\\mathbb R^3$ (simplemente conexo) $\\Rightarrow$ conservativo — mismo criterio de la card "Comparando dos campos: uno rotacional, otro divergente" del módulo Superficies paramétricas, gradiente, divergencia y rotacional, extendido a 3D.'),
        el('div',{class:'formula',html:'$$f=\\int yz\\,dx=xyz+g(y,z);\\quad f_y=xz+g_y\\overset{!}{=}xz\\Rightarrow g_y=0;\\quad f_z=xy+h\'(z)\\overset{!}{=}xy\\Rightarrow h\'(z)=0$$'}),
        el('p',{},'$f(x,y,z)=xyz$ (a menos de una constante) — mismo método de la card "Encontrar la función potencial", con una variable más.')));
    c6.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con $\\mathbf F(x,y)=\\langle3x^2,\\,2y\\rangle$, calcule el trabajo de $(0,0)$ a $(1,1)$ a lo largo de $\\mathbf r(t)=\\langle t,\\,t^3\\rangle$, $t\\in[0,1]$.'),
      el('div',{},
        el('p',{},'Primero, ¿es conservativo? $P_y=0=Q_x$ ✓ — sí, con potencial $f=x^3+y^2$ (integrando $P$ en $x$ y comprobando que $f_y=2y=Q$).'),
        el('div',{class:'formula',html:'$$\\text{FTLI: }f(1,1)-f(0,0)=(1+1)-0=2$$'}),
        el('div',{class:'formula',html:'$$\\text{Directo: }\\mathbf r\'=\\langle1,3t^2\\rangle,\\ \\mathbf F(\\mathbf r(t))=\\langle3t^2,2t^3\\rangle,\\ \\int_0^1(3t^2+6t^5)\\,dt=1+1=2$$'}),
        el('p',{class:'note'},'Coinciden: $2=2$ — otra verificación del teorema fundamental, con un campo y una curva distintos de los de la card correspondiente.')));
    c6.append(ej2);

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, index-v3.html (contenido auditado), ejercicio 21 ("Mostrar que F=⟨yz,xz,xy⟩ es conservativo…"), resuelto acá con el método sistemático de la card "Encontrar la función potencial" en vez de solo verificar la respuesta. Ejercicio 2: elaboración propia.'));
    sec.append(c6);
  }});
