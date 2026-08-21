/* contenidoOficial original (índice a cubrir):
   - Integrales de superficie
   - Flujo de un campo vectorial
   - Teorema de Stokes. Aplicaciones
   - Teorema de la divergencia. Aplicaciones */
registerModule({id:'stokes-gauss',title:'Integrales de superficie, flujo, Stokes y Gauss',unidad:'IV',semanas:[16],
  evaluacion:['test-5'],
  lead:'Integrar sobre una superficie para medir el flujo de un campo a través de ella, y los dos teoremas que la conectan con línea y volumen.',
  build(sec){
    const movil=window.innerWidth<700; /* mismo criterio que mod-superficies.js: escala de Espacio
      elegida según el ancho real del lienzo (teléfono ~344px, escritorio ~1057px). */

    /* -------- Card 1: integral de superficie de un campo escalar -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Integral de superficie de un campo escalar'));
    c1.append(el('p',{},'Así como una integral de línea generaliza una integral simple a una curva, una ',el('b',{},'integral de superficie'),' generaliza una integral doble a una superficie curva $S$, usando el normal $\\mathbf r_u\\times\\mathbf r_v$ del tema Superficies paramétricas, gradiente, divergencia y rotacional:'));
    c1.append(el('div',{class:'formula',html:'$$\\iint_S f\\,dS=\\iint_D f(\\mathbf r(u,v))\\,\\lVert\\mathbf N\\rVert\\,dA$$'}));
    c1.append(el('p',{class:'note'},'donde $\\mathbf N=\\mathbf r_u\\times\\mathbf r_v$ es el vector normal de la parametrización, y $\\lVert\\mathbf N\\rVert$ es el factor por el que la parametrización estira el área.'));
    c1.append(el('p',{},'Con $f=1$ da el área (card "Área de una superficie paramétrica" de ese tema); con $f$ cualquiera, es una especie de "promedio ponderado". Ejemplo: $\\displaystyle\\iint_Sz\\,dS$ sobre el mismo cono $\\mathbf r(u,v)=\\langle u\\cos v,u\\operatorname{sen}v,u\\rangle$, $u\\in[0,h]$, donde ya se calculó $\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert=u\\sqrt2$.'));
    Pasos(c1,[
      {tex:'z=u\\ \\text{ sobre el cono}\\ \\Longrightarrow\\ z\\,dS=u\\cdot u\\sqrt2\\,du\\,dv=\\sqrt2\\,u^2\\,du\\,dv',nota:'Se sustituye z=u y el dS ya calculado.'},
      {tex:'\\iint_Sz\\,dS=\\sqrt2\\int_0^{2\\pi}dv\\int_0^h u^2\\,du=\\sqrt2\\cdot2\\pi\\cdot\\dfrac{h^3}{3}=\\dfrac{2\\sqrt2\\,\\pi h^3}{3}',nota:'Las dos integrales se separan (mismo tipo de cálculo que el área del cono).'}
    ],{modId:'stokes-gauss',titulo:'∬_S z dS sobre el cono, apertura u∈[0,h]'});
    c1.append(el('p',{class:'note'},el('b',{},'Verificación con la fórmula cartesiana: '),'el mismo cono es la gráfica $z=\\sqrt{x^2+y^2}$, con $dS=\\sqrt{1+f_x^2+f_y^2}\\,dA$. Aquí $f_x=x/r$, $f_y=y/r$ (con $r=\\sqrt{x^2+y^2}$), así que $f_x^2+f_y^2=1$ y $dS=\\sqrt2\\,dA$. En polares ($x=r\\cos\\theta$, $y=r\\operatorname{sen}\\theta$, $dA=r\\,dr\\,d\\theta$): $\\displaystyle\\iint_Sz\\,dS=\\iint r\\cdot\\sqrt2\\,r\\,dr\\,d\\theta=\\sqrt2\\int_0^{2\\pi}d\\theta\\int_0^h r^2\\,dr=\\sqrt2\\cdot2\\pi\\cdot\\dfrac{h^3}{3}=\\dfrac{2\\sqrt2\\,\\pi h^3}{3}$ — dos caminos completamente distintos (parametrización explícita vs. superficie gráfica), mismo resultado, para cualquier $h$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: fórmula, index-v3.html (contenido auditado), tema "Integrales de superficie". El ejemplo del cono y su verificación con la fórmula cartesiana son elaboración propia, reutilizando la superficie del tema Superficies paramétricas, gradiente, divergencia y rotacional.'));
    sec.append(c1);

    /* -------- Card 2: flujo de un campo vectorial -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Flujo de un campo vectorial'));
    c2.append(el('p',{},'Cuando $S$ está orientada (un lado "positivo" fijado por el normal), la ',el('b',{},'integral de flujo'),' mide cuánto "atraviesa" $\\mathbf F$ la superficie — el análogo de la forma de flujo de Green (tema Teorema de Green y aplicaciones), un nivel más arriba:'));
    c2.append(el('div',{class:'formula',html:'$$\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iint_S\\mathbf F\\cdot\\mathbf n\\,dS=\\iint_D\\mathbf F(\\mathbf r(u,v))\\cdot(\\mathbf r_u\\times\\mathbf r_v)\\,dA$$'}));
    c2.append(el('p',{},'Ejemplo: flujo de $\\mathbf F=\\langle0,0,1\\rangle$ (campo uniforme vertical) a través del mismo cono, $u\\in[0,h]$, con el normal $\\mathbf r_u\\times\\mathbf r_v=u\\langle-\\cos v,-\\operatorname{sen}v,1\\rangle$ de la card "Superficies paramétricas y su vector normal".'));
    Pasos(c2,[
      {tex:'\\mathbf F\\cdot(\\mathbf r_u\\times\\mathbf r_v)=\\langle0,0,1\\rangle\\cdot u\\langle-\\cos v,-\\operatorname{sen}v,1\\rangle=u',nota:'El producto punto solo sobrevive en la componente z (las otras dos de F son 0).'},
      {tex:'\\iint_S\\mathbf F\\cdot d\\mathbf S=\\int_0^{2\\pi}\\int_0^h u\\,du\\,dv=2\\pi\\cdot\\dfrac{h^2}{2}=\\pi h^2',nota:'Se integra: constante en v, lineal en u.'}
    ],{modId:'stokes-gauss',titulo:'Flujo de F=⟨0,0,1⟩ a través del cono'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación geométrica: '),'el flujo de un campo ',el('i',{},'constante'),' $\\mathbf F=c\\,\\mathbf k$ a través de cualquier superficie es $c$ veces el área de su ',el('i',{},'sombra'),' (proyección) sobre el plano $xy$, con signo según la orientación — para una superficie gráfica $z=g(x,y)$ sobre $D$, $\\mathbf n\\,dS=\\langle-g_x,-g_y,1\\rangle\\,dA$, así que $\\mathbf F\\cdot\\mathbf n\\,dS=c\\,dA$ exactamente. La sombra del cono (apertura $u\\in[0,h]$) sobre $xy$ es el disco de radio $h$, de área $\\pi h^2$ — coincide exactamente con la integral de arriba, para cualquier $h$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: fórmula del flujo, index-v3.html (contenido auditado), tema "Integrales de superficie". El ejemplo y la verificación geométrica (flujo de un campo constante = área de la sombra) son elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: Teorema de Stokes -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Teorema de Stokes'));
    c3.append(el('p',{},'El ',el('b',{},'Teorema de Stokes'),' generaliza Green a superficies no necesariamente planas: convierte una integral de línea sobre el borde $C$ de $S$ en el flujo del rotacional a través de $S$.'));
    c3.append(el('div',{class:'formula',html:'$$\\oint_C\\mathbf F\\cdot d\\mathbf r=\\iint_S(\\operatorname{rot}\\mathbf F)\\cdot d\\mathbf S$$'}));
    c3.append(el('p',{},'Si $S$ es plana y vive en el plano $xy$ ($\\mathbf n=\\mathbf k$), Stokes se reduce exactamente al Teorema de Green. Ejemplo con una superficie curva de verdad: $\\mathbf F=\\langle-y,x,0\\rangle$ (el campo rotacional de la card "Comparando dos campos" del tema Gradiente, divergencia y rotacional) y $S=$ hemisferio superior de radio $R$, con borde $C$ la circunferencia $x^2+y^2=R^2$ en $z=0$.'));
    const escalaHemi=movil?60:130;
    const espHemi=Espacio(c3,{alto:420,escala:escalaHemi});
    espHemi.dibujar(E=>{
      E.superficie((u,v)=>[u*Math.cos(v),u*Math.sin(v),Math.sqrt(Math.max(0,1-u*u))-0.4],{uMin:0,uMax:1,vMin:0,vMax:2*Math.PI,nu:8,nv:16,color:'--s7'});
      E.curva3(t=>[Math.cos(t),Math.sin(t),-0.4],0,2*Math.PI,{color:'--s1',grosor:2.2});
      for(const t of [0,Math.PI/2,Math.PI,3*Math.PI/2]){
        const x=Math.cos(t),y=Math.sin(t);
        E.vector3([x,y,-0.4],[-0.35*Math.sin(t),0.35*Math.cos(t),0],{color:'--s4'});
      }
    });
    c3.append(el('p',{class:'note'},'Malla morada: el hemisferio $S$ (radio $1$, ilustrativo). Curva azul: su borde $C$, el ecuador. Flechas naranjas: $\\mathbf F=\\langle-y,x,0\\rangle$ evaluado sobre $C$ — tangente a la circunferencia en todo punto, siempre en el sentido de recorrido.'));
    Pasos(c3,[
      {tex:'\\operatorname{rot}\\mathbf F=\\langle\\partial_y R-\\partial_z Q,\\ \\partial_z P-\\partial_x R,\\ \\partial_x Q-\\partial_y P\\rangle',nota:'Formula del rotacional, con P=−y, Q=x, R=0.'},
      {tex:'=\\langle 0-0,\\ 0-0,\\ 1-(-1)\\rangle=\\langle0,0,2\\rangle',nota:'Evaluando cada parcial: solo sobrevive la tercera componente.'},
      {tex:'\\iint_S(\\operatorname{rot}\\mathbf F)\\cdot d\\mathbf S=\\iint_S\\langle0,0,2\\rangle\\cdot d\\mathbf S=2\\iint_S\\mathbf k\\cdot d\\mathbf S',nota:'rot F es un campo constante ⟨0,0,2⟩: se saca el 2 y queda el flujo de k.'},
      {tex:'\\iint_S\\mathbf k\\cdot d\\mathbf S=\\text{area de la sombra de }S=\\pi R^2',nota:'Mismo principio de "flujo de campo constante = área de la sombra" de la card "Flujo de un campo vectorial" — la sombra del hemisferio es el disco de radio R.'},
      {tex:'\\Longrightarrow\\ \\iint_S(\\operatorname{rot}\\mathbf F)\\cdot d\\mathbf S=2\\pi R^2',nota:'Multiplicando por el 2 que salio del rotacional.'},
    ],{modId:'stokes-gauss',titulo:'Flujo de rot F a través del hemisferio, radio R'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación por el otro lado de Stokes — circulación directa sobre $C$: '),'con $x=R\\cos\\theta,\\,y=R\\operatorname{sen}\\theta,\\,z=0$: $\\mathbf F\\cdot d\\mathbf r=(-y\\,dx+x\\,dy)=(R^2\\operatorname{sen}^2\\theta+R^2\\cos^2\\theta)\\,d\\theta=R^2\\,d\\theta$, así que $\\displaystyle\\oint_C\\mathbf F\\cdot d\\mathbf r=\\int_0^{2\\pi}R^2\\,d\\theta=2\\pi R^2$ — igual al flujo del rotacional calculado arriba, y el mismo $2\\pi R^2$ al que llega la animación "Campo vectorial rotacional y trabajo acumulado" de index-v3.html recorriendo la curva ',el('i',{},'plana'),' (vía Green); acá se llega al mismo número integrando sobre una superficie ',el('i',{},'curva'),' que tiene ese mismo borde — Stokes no depende de qué superficie se elija, solo de su borde.'));
    c3.append(el('p',{class:'fuente'},'Fuente: enunciado, index-v3.html (contenido auditado), tema "Teorema de Stokes y Teorema de la divergencia (Gauss)". El ejemplo del hemisferio, reutilizando el campo de la animación "Campo vectorial rotacional y trabajo acumulado" de index-v3.html, y ambas verificaciones son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: Teorema de la divergencia (Gauss) -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Teorema de la divergencia (Gauss)'));
    c4.append(el('p',{},'El ',el('b',{},'Teorema de la divergencia'),' hace el mismo tipo de conexión que Stokes, un nivel más arriba: convierte el flujo por una superficie ',el('b',{},'cerrada'),' $S$ (borde de un sólido $V$) en una integral triple de la divergencia sobre todo $V$.'));
    c4.append(el('div',{class:'formula',html:'$$\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iiint_V(\\operatorname{div}\\mathbf F)\\,dV$$'}));
    c4.append(el('p',{},'Ejemplo: $\\mathbf F=\\langle x,y,z\\rangle$ sobre el sólido $V$ del cono de la card "Integral de superficie de un campo escalar" (apertura $u\\in[0,h]$) ',el('b',{},'cerrado'),' con la tapa plana $z=h$ (disco de radio $h$) — $S$ es la superficie lateral del cono más esa tapa.'));
    const escalaConoTapa=movil?60:130;
    const espConoTapa=Espacio(c4,{alto:440,escala:escalaConoTapa});
    espConoTapa.dibujar(E=>{
      E.superficie((u,v)=>[u*Math.cos(v),u*Math.sin(v),u-0.7],{uMin:0,uMax:1.4,vMin:0,vMax:2*Math.PI,nu:8,nv:16,color:'--s7'});
      E.superficie((u,v)=>[u*Math.cos(v),u*Math.sin(v),1.4-0.7],{uMin:0,uMax:1.4,vMin:0,vMax:2*Math.PI,nu:5,nv:16,color:'--s4'});
    });
    c4.append(el('p',{class:'note'},'Malla morada: la superficie lateral del cono. Malla naranja: la tapa plana en $z=h$ — juntas forman la superficie cerrada $S$ que encierra el sólido $V$.'));
    Pasos(c4,[
      {tex:'\\operatorname{div}\\mathbf F=1+1+1=3\\quad\\text{(constante)}',nota:'Divergencia del campo radial.'},
      {tex:'\\text{Vol}(V)=\\dfrac13\\pi r^2H=\\dfrac13\\pi h^2(h)=\\dfrac{\\pi h^3}{3}\\quad(r=H=h)',nota:'Fórmula del volumen del cono: radio h en la tapa, altura h.'},
      {tex:'\\iiint_V\\operatorname{div}\\mathbf F\\,dV=3\\cdot\\dfrac{\\pi h^3}{3}=\\pi h^3',nota:'div F constante: la integral triple es 3 por el volumen.'}
    ],{modId:'stokes-gauss',titulo:'∭div F dV sobre el sólido del cono+tapa'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación por el otro lado de Gauss — flujo directo sobre $S=$ lateral $\\cup$ tapa: '),'en la ',el('i',{},'lateral'),', $\\mathbf F(\\mathbf r(u,v))=\\langle u\\cos v,u\\operatorname{sen}v,u\\rangle=u\\,\\mathbf r_u$ (el campo apunta exactamente en la dirección $\\mathbf r_u$, tangente al cono) — por eso $\\mathbf F\\cdot(\\mathbf r_u\\times\\mathbf r_v)=0$ en todo punto, y el flujo lateral es $0$. En la ',el('i',{},'tapa'),' ($z=h$, normal exterior $\\langle0,0,1\\rangle$), $\\mathbf F\\cdot\\mathbf n=z=h$ es constante, así que el flujo ahí es $h\\cdot\\text{área}(\\text{tapa})=h\\cdot\\pi h^2=\\pi h^3$. Total: $0+\\pi h^3=\\pi h^3$ — coincide con la integral triple de arriba, para cualquier $h$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: enunciado, index-v3.html (contenido auditado), tema "Teorema de Stokes y Teorema de la divergencia (Gauss)" (que trae también el ejemplo del flujo de F=⟨x,y,z⟩ a través de una esfera, retomado en la card "Ejercicios" de este módulo). El ejemplo del cono con tapa y ambas verificaciones son elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: el mapa de los cuatro teoremas -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'El mapa de los cuatro teoremas'));
    c5.append(el('p',{},'El Teorema Fundamental de las integrales de línea (tema Integral de línea y teorema fundamental), Green, Stokes y Gauss son ',el('b',{},'la misma idea'),', repetida en dimensiones cada vez más altas: la integral de una derivada sobre una región es la integral de la función original sobre su frontera. Index-v3.html lo dice para Green/Stokes/Gauss: "el mismo patrón, en 1D, es el Teorema Fundamental del Cálculo" — la tabla de abajo lo hace explícito para los cuatro, incluyendo el de integrales de línea.'));
    Tabla(c5,{columnas:['Teorema','Borde','Integral de la "derivada"','Dim.'],filas:[
      ['Fundamental del Cálculo','$f(b)-f(a)$','$\\int_a^bf\'(x)\\,dx$','1D → 0D'],
      ['Fundamental de líneas','$f(\\mathbf r(b))-f(\\mathbf r(a))$','$\\int_C\\nabla f\\cdot d\\mathbf r$','1D → 0D'],
      ['Green','$\\oint_C(P\\,dx+Q\\,dy)$','$\\iint_D(Q_x-P_y)\\,dA$','2D → 1D'],
      ['Stokes','$\\oint_C\\mathbf F\\cdot d\\mathbf r$','$\\iint_S(\\operatorname{rot}\\mathbf F)\\cdot d\\mathbf S$','2D → 1D'],
      ['Gauss','$\\iint_S\\mathbf F\\cdot d\\mathbf S$','$\\iiint_V(\\operatorname{div}\\mathbf F)\\,dV$','3D → 2D']
    ]});
    c5.append(el('p',{class:'note'},'La última columna se lee: el ',el('b',{},'objeto'),' sobre el que se integra la derivada, y el ',el('b',{},'borde'),' donde vive el otro lado. Intervalo $[a,b]$ y sus dos puntos extremos; curva $C$ y sus dos extremos; región $D$ y su curva cerrada; superficie $S$ y su curva cerrada; sólido $V$ y su superficie cerrada.'));
    c5.append(el('p',{class:'note'},'Cada fila iguala sus dos primeras columnas de fórmula (el "término de borde" y la "integral de la derivada" son el mismo número) — en el Fundamental del Cálculo y el de líneas esa igualdad se escribe con el término de borde a la derecha; en Green, Stokes y Gauss, a la izquierda. Es solo convención de escritura, no una diferencia real.'));
    c5.append(el('p',{class:'note'},'La columna de la derecha telescopea: el ',el('i',{},'objeto'),' de una fila (curva, para el Fundamental de líneas) es el mismo tipo de cosa que el ',el('i',{},'borde'),' de la fila de abajo (curva cerrada, para Green y Stokes); y el borde de Gauss (superficie) es el mismo tipo de objeto que integra Stokes. La "derivada" también sube de nivel en cada escalón: derivada de una variable → gradiente → rotacional-$z$ (2D) → rotacional (3D) → divergencia.'));
    c5.append(el('p',{class:'fuente'},'Fuente: la observación de que Green/Stokes/Gauss comparten patrón con el Teorema Fundamental del Cálculo, index-v3.html (contenido auditado), tema "Teorema de Stokes y Teorema de la divergencia (Gauss)". Extender esa observación para incluir el Teorema Fundamental de las integrales de línea, y la tabla completa con la columna de dimensiones, son elaboración propia.'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Con el Teorema de la divergencia, calcule el flujo de $\\mathbf F(x,y,z)=\\langle x,y,z\\rangle$ a través de la esfera de radio $a$ centrada en el origen.'),
      el('div',{},
        el('p',{},'$\\operatorname{div}\\mathbf F=1+1+1=3$ (constante):'),
        el('div',{class:'formula',html:'$$\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iiint_V3\\,dV=3\\cdot\\dfrac43\\pi a^3=4\\pi a^3$$'}),
        el('p',{class:'note'},'Verificación directa: en la esfera, el normal unitario es $\\mathbf n=\\mathbf r/a$ (radial), y $\\mathbf F=\\mathbf r$, así que $\\mathbf F\\cdot\\mathbf n=\\mathbf r\\cdot\\mathbf r/a=a^2/a=a$ (constante en toda la esfera). Entonces $\\iint_S\\mathbf F\\cdot d\\mathbf S=a\\cdot\\text{área}(S)=a\\cdot4\\pi a^2=4\\pi a^3$ — coincide.')));
    c6.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con Stokes, evalúe $\\displaystyle\\oint_C\\mathbf F\\cdot d\\mathbf r$ para $\\mathbf F=\\langle-y,x,0\\rangle$, con $C$ la circunferencia $x^2+y^2=4$ en $z=3$ (orientada antihoraria vista desde arriba), usando como $S$ el disco plano que encierra.'),
      el('div',{},
        el('p',{},'Del cálculo de la card "Teorema de Stokes", $\\operatorname{rot}\\mathbf F=\\langle0,0,2\\rangle$ para este campo, sin importar la altura $z=3$ de la curva.'),
        el('div',{class:'formula',html:'$$\\iint_S(\\operatorname{rot}\\mathbf F)\\cdot d\\mathbf S=2\\cdot\\text{área}(S)=2\\cdot\\pi(2)^2=8\\pi$$'}),
        el('p',{class:'note'},'Con $R=2$ en la fórmula $2\\pi R^2$ de la card "Teorema de Stokes" da $2\\pi(4)=8\\pi$ — coincide. Como $S$ es plana, esto también es exactamente lo que daría Green aplicado a la circunferencia proyectada en el plano $z=3$.')));
    c6.append(ej2);

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, index-v3.html (contenido auditado), ejemplo 17 ("Flujo a través de una esfera (Teorema de la divergencia)"), presentado acá como ejercicio con la misma solución y verificación que ya traía. Ejercicio 2: elaboración propia, aplicando el método de la card "Teorema de Stokes" con otros datos.'));
    sec.append(c6);
  }});
