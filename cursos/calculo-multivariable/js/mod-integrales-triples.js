/* contenidoOficial original (índice a cubrir):
   - Integrales triples
   - Cambio de variables y Jacobiano
   - Integrales triples en coordenadas cilíndricas y esféricas
   - Aplicaciones de las integrales triples (volumen, masa de un sólido, centro de masa) */
registerModule({id:'integrales-triples',title:'Integrales triples, cilíndricas y esféricas',unidad:'III',semanas:[11],
  evaluacion:['test-4','certamen-2'],
  lead:'Plantear una integral triple es, sobre todo, leer bien los límites del sólido; cilíndricas y esféricas los simplifican cuando hay simetría radial, al precio de arrastrar su propio Jacobiano.',
  build(sec){
    const movil=window.innerWidth<700; /* mismo criterio que mod-extremos.js y mod-gradiente.js: la
      escala de un Espacio es fija, así que hay que elegirla según el ancho real del lienzo en el
      momento de construir el módulo — angosto en el teléfono (~344px), amplio en escritorio
      (~1057px) — y además centrar restando el punto medio del rango de cada eje, para que la
      figura no quede recortada ni "flotando" en una esquina del lienzo. */

    /* -------- Card 1: la integral triple y cómo leer los límites de un sólido -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'La integral triple y cómo leer los límites de un sólido'));
    c1.append(el('p',{},'$\\displaystyle\\iiint_V f\\,dV$ es el límite de una suma de Riemann sobre un sólido $V\\subset\\mathbb R^3$ — la misma idea de la integral doble (tema ',el('b',{},'La integral doble como volumen y el teorema de Fubini'),' del módulo Integrales dobles, Jacobiano y polares) un nivel más arriba: con $f=1$ da el ',el('b',{},'volumen'),' de $V$; con $f=\\delta(x,y,z)\\ge0$, la ',el('b',{},'masa'),'. Fubini también aplica: se calcula como una integral iterada, en cualquiera de los $6$ órdenes posibles de $x,y,z$ (el doble de los $2$ órdenes de una integral doble).'));
    c1.append(el('div',{class:'formula',html:'$$\\iiint_V f\\,dV=\\int_a^b\\int_{g_1(x)}^{g_2(x)}\\int_{h_1(x,y)}^{h_2(x,y)} f(x,y,z)\\,dz\\,dy\\,dx$$'}));
    c1.append(el('p',{},'Para plantearla (en este orden $dz\\,dy\\,dx$): primero se ',el('b',{},'proyecta'),' $V$ sobre el plano $xy$ — esa sombra es una región $D$ tipo I/II corriente, con los mismos límites $a,b,g_1,g_2$ de una integral doble; después, para cada $(x,y)\\in D$, $z$ recorre el sólido desde la superficie de ',el('i',{},'abajo'),' ($h_1$) hasta la de ',el('i',{},'arriba'),' ($h_2$). Ejemplo: el tetraedro $x,y,z\\ge0$, $x+y+z\\le1$.'));
    const off1=0.5;
    const sh1=p=>[p[0]-off1,p[1]-off1,p[2]-off1];
    const A1=sh1([0,0,0]), B1=sh1([1,0,0]), C1=sh1([0,1,0]), D1=sh1([0,0,1]);
    const escalaTet=movil?190:380;
    const espTet=Espacio(c1,{alto:560,escala:escalaTet});
    const x0T=0.3,y0T=0.3,z0T=1-x0T-y0T;
    espTet.dibujar(E=>{
      E.linea3(A1,B1,{color:'--s1',grosor:2});
      E.linea3(B1,C1,{color:'--s1',grosor:2});
      E.linea3(C1,A1,{color:'--s1',grosor:2});
      E.linea3(A1,D1,{color:'--grid'});
      E.linea3(B1,D1,{color:'--grid'});
      E.linea3(C1,D1,{color:'--grid'});
      E.punto3(D1,{color:'--s4',r:4});
      E.linea3(sh1([x0T,y0T,0]),sh1([x0T,y0T,z0T]),{color:'--s2',grosor:2.5});
      E.punto3(sh1([x0T,y0T,z0T]),{color:'--s2',r:4});
      E.punto3(sh1([x0T,y0T,0]),{color:'--s2',r:3});
    });
    c1.append(el('p',{class:'note'},'Base azul: la sombra $D=\\{x,y\\ge0,\\,x+y\\le1\\}$ en el plano $xy$ (proyección del sólido). Vértice naranjo: el punto $(0,0,1)$. Segmento verde: en $(x_0,y_0)=(0{,}3,\\,0{,}3)$, $z$ va de $0$ a $1-x_0-y_0=0{,}4$ — el límite superior de $z$, leído directo de la cara inclinada $x+y+z=1$.'));
    Pasos(c1,[
      {tex:'D:\\ 0\\le x\\le1,\\ \\ 0\\le y\\le1-x\\qquad(\\text{proyección sobre }xy)',nota:'Región tipo I: la sombra del tetraedro.'},
      {tex:'0\\le z\\le1-x-y\\qquad(\\text{de la cara }x+y+z=1)',nota:'Límite superior de z, para (x,y) fijo en D.'},
      {tex:'V=\\int_0^1\\int_0^{1-x}\\int_0^{1-x-y} dz\\,dy\\,dx=\\int_0^1\\int_0^{1-x}(1-x-y)\\,dy\\,dx',nota:'Se integra en z primero (trivial: el integrando es 1).'},
      {tex:'\\int_0^{1-x}(1-x-y)\\,dy=\\dfrac{(1-x)^2}{2}',nota:'Con $b=1-x$: $\\int_0^b(b-y)\\,dy=b^2/2$ (antiderivada estándar).'},
      {tex:'V=\\int_0^1\\dfrac{(1-x)^2}{2}\\,dx=\\left[-\\dfrac{(1-x)^3}{6}\\right]_0^1=0-\\left(-\\dfrac16\\right)=\\dfrac16',nota:'Antiderivada en x; coincide con la fórmula conocida del volumen de un tetraedro.'}
    ],{modId:'integrales-triples',titulo:'Volumen del tetraedro x,y,z≥0, x+y+z≤1'});
    c1.append(el('p',{class:'note'},'Elegir bien el orden importa igual que en la card "Invertir el orden de integración" del módulo Integrales dobles, Jacobiano y polares — con 3 variables hay 6 órdenes posibles en vez de 2, y algunos dan límites mucho más simples que otros.'));
    c1.append(el('p',{class:'fuente'},'Fuente: definición de la integral triple, la lectura de límites vía proyección y la fórmula general, desarrollo estándar de la materia (Stewart/Larson, cap. integrales triples) — no está en index-v3.html ni en el vault, que van directo a cilíndricas/esféricas sin plantear antes el caso general en cartesianas. El ejemplo del tetraedro, su verificación y la figura son elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: los Jacobianos de cilíndricas y esféricas, deducidos -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Los Jacobianos de cilíndricas y esféricas, deducidos'));
    c2.append(el('p',{},'El cambio de variable en 3D usa el mismo tipo de Jacobiano que en 2D (tema ',el('b',{},'Cambio de variable general y el Jacobiano'),' del módulo Integrales dobles, Jacobiano y polares), solo que con una fila y columna más:'));
    c2.append(el('div',{class:'formula',html:'$$\\iiint_V f\\,dV=\\iiint_{V^*} f\\,|J|\\,du\\,dv\\,dw,\\qquad J=\\dfrac{\\partial(x,y,z)}{\\partial(u,v,w)}=\\det\\begin{bmatrix}x_u&x_v&x_w\\\\y_u&y_v&y_w\\\\z_u&z_v&z_w\\end{bmatrix}$$'}));
    c2.append(el('p',{},'Aplicado a ',el('b',{},'cilíndricas'),' ($x=r\\cos\\theta$, $y=r\\operatorname{sen}\\theta$, $z=z$):'));
    Pasos(c2,[
      {tex:'x_r=\\cos\\theta,\\ x_\\theta=-r\\operatorname{sen}\\theta,\\ x_z=0',nota:'Parciales de x.'},
      {tex:'y_r=\\operatorname{sen}\\theta,\\ y_\\theta=r\\cos\\theta,\\ y_z=0',nota:'Parciales de y.'},
      {tex:'z_r=0,\\ z_\\theta=0,\\ z_z=1',nota:'z no depende de r ni de θ.'},
      {tex:'J=\\det\\begin{bmatrix}\\cos\\theta&-r\\operatorname{sen}\\theta&0\\\\\\operatorname{sen}\\theta&r\\cos\\theta&0\\\\0&0&1\\end{bmatrix}',nota:'Matriz Jacobiana completa.'},
      {tex:'=1\\cdot\\big(\\cos\\theta\\cdot r\\cos\\theta-(-r\\operatorname{sen}\\theta)\\operatorname{sen}\\theta\\big)=r\\cos^2\\theta+r\\operatorname{sen}^2\\theta=r',nota:'Se expande por la tercera fila: solo el 1 de la esquina aporta.'}
    ],{modId:'integrales-triples',titulo:'Jacobiano de cilíndricas: J=r'});
    c2.append(el('p',{class:'note'},'Es el mismo $r$ del cambio a polares — tiene que serlo, porque cilíndricas es exactamente polares en el plano $xy$, con $z$ sin tocar.'));
    c2.append(el('p',{},'Aplicado a ',el('b',{},'esféricas'),' ($x=\\rho\\operatorname{sen}\\varphi\\cos\\theta$, $y=\\rho\\operatorname{sen}\\varphi\\operatorname{sen}\\theta$, $z=\\rho\\cos\\varphi$) hace falta una fila y columna más de álgebra, pero el mismo método:'));
    Pasos(c2,[
      {tex:'x_\\rho=\\operatorname{sen}\\varphi\\cos\\theta,\\ x_\\varphi=\\rho\\cos\\varphi\\cos\\theta,\\ x_\\theta=-\\rho\\operatorname{sen}\\varphi\\operatorname{sen}\\theta',nota:'Las tres parciales de x.'},
      {tex:'y_\\rho=\\operatorname{sen}\\varphi\\operatorname{sen}\\theta,\\ y_\\varphi=\\rho\\cos\\varphi\\operatorname{sen}\\theta,\\ y_\\theta=\\rho\\operatorname{sen}\\varphi\\cos\\theta',nota:'Las tres parciales de y.'},
      {tex:'z_\\rho=\\cos\\varphi,\\ z_\\varphi=-\\rho\\operatorname{sen}\\varphi,\\ z_\\theta=0',nota:'z no depende de θ.'},
      {tex:'J=x_\\theta\\begin{vmatrix}y_\\rho&y_\\varphi\\\\z_\\rho&z_\\varphi\\end{vmatrix}-y_\\theta\\begin{vmatrix}x_\\rho&x_\\varphi\\\\z_\\rho&z_\\varphi\\end{vmatrix}',nota:'Expandiendo por la 3ª columna ($z_\\theta=0$ anula un término): quedan los cofactores de las otras dos entradas.'},
      {tex:'\\begin{vmatrix}y_\\rho&y_\\varphi\\\\z_\\rho&z_\\varphi\\end{vmatrix}=-\\rho\\operatorname{sen}\\theta,\\qquad\\begin{vmatrix}x_\\rho&x_\\varphi\\\\z_\\rho&z_\\varphi\\end{vmatrix}=-\\rho\\cos\\theta',nota:'Cada 2×2 se simplifica con sen²φ+cos²φ=1.'},
      {tex:'J=(-\\rho\\operatorname{sen}\\varphi\\operatorname{sen}\\theta)(-\\rho\\operatorname{sen}\\theta)-(\\rho\\operatorname{sen}\\varphi\\cos\\theta)(-\\rho\\cos\\theta)',nota:'Se reemplazan x_θ, y_θ y los dos determinantes 2×2 del paso anterior.'},
      {tex:'J=\\rho^2\\operatorname{sen}\\varphi\\operatorname{sen}^2\\theta+\\rho^2\\operatorname{sen}\\varphi\\cos^2\\theta=\\rho^2\\operatorname{sen}\\varphi',nota:'Se expande cada producto y se factoriza ρ²senφ, usando sen²θ+cos²θ=1. Como φ∈[0,π], senφ≥0, así que |J|=J.'}
    ],{modId:'integrales-triples',titulo:'Jacobiano de esféricas: J=ρ²senφ'});
    c2.append(el('p',{class:'note'},'El jacobiano de esféricas es $\\rho^2\\operatorname{sen}\\varphi$, no $\\rho^2$ a secas — omitir el $\\operatorname{sen}\\varphi$ es el error más común al cambiar a esféricas. $\\varphi\\in[0,\\pi]$ se mide desde el eje $z$ positivo (no desde el plano $xy$); confundir esa convención invierte los límites.'));
    c2.append(el('p',{class:'fuente'},'Fuente: fórmula general del Jacobiano 3×3, desarrollo estándar de la materia (extendiendo a 3D el Jacobiano 2×2 del módulo Integrales dobles, Jacobiano y polares). Los resultados J=r y J=ρ²senφ coinciden con index-v3.html (contenido auditado), tema "Integrales triples y coordenadas cilíndricas-esféricas", y con la nota homónima del vault (repo generación anterior 2024-2025, no es Canvas 2026-2) — pero ninguna de las dos trae la deducción: ambas derivaciones completas son elaboración propia, verificadas paso a paso arriba.'));
    sec.append(c2);

    /* -------- Card 3: coordenadas cilíndricas y esféricas — ejemplos -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Coordenadas cilíndricas y esféricas: ejemplos'));
    c3.append(el('div',{class:'formula',html:'$$\\iiint_V f\\,dV=\\iiint f(r\\cos\\theta,r\\operatorname{sen}\\theta,z)\\;r\\,dz\\,dr\\,d\\theta\\qquad\\text{(cilíndricas)}$$'}));
    c3.append(el('div',{class:'formula',html:'$$\\iiint_V f\\,dV=\\iiint f\\;\\rho^2\\operatorname{sen}\\varphi\\;d\\rho\\,d\\varphi\\,d\\theta\\qquad\\text{(esféricas)}$$'}));
    c3.append(el('p',{},'Ejemplo en cilíndricas: volumen del sólido entre el plano $z=0$ y el paraboloide $z=x^2+y^2$, dentro del cilindro $x^2+y^2=9$ (es decir $r\\le3$). El paraboloide real ($z$ hasta $9$ en el borde) queda demasiado alto y angosto para un lienzo; la figura de abajo usa la versión más achatada $z=r^2/2$ — misma forma de sólido, misma lectura de límites, proporciones más cómodas para dibujar.'));
    const off3=2.25;
    const escalaSol=movil?52:82;
    const espSol=Espacio(c3,{alto:520,escala:escalaSol});
    espSol.dibujar(E=>{
      E.superficie((u,v)=>[u*Math.cos(v),u*Math.sin(v),u*u/2-off3],{uMin:0,uMax:3,vMin:0,vMax:2*Math.PI,nu:10,nv:18,color:'--s7'});
      E.curva3(t=>[3*Math.cos(t),3*Math.sin(t),0-off3],0,2*Math.PI,{color:'--s1',grosor:2});
      E.linea3([3,0,0-off3],[3,0,4.5-off3],{color:'--s4',grosor:2});
      E.linea3([1.5,0,0-off3],[1.5,0,1.125-off3],{color:'--s2',grosor:2.5});
      E.punto3([1.5,0,1.125-off3],{color:'--s2',r:4});
    });
    c3.append(el('p',{class:'note'},'Malla morada: el paraboloide (tapa curva del sólido, acá $z=r^2/2$ por escala del dibujo). Circunferencia azul: el borde $r=3$ en $z=0$ (base). Segmento naranjo: la pared vertical del cilindro en $r=3$. Segmento verde: en $r=1{,}5$, $z$ va de $0$ hasta el paraboloide — el límite superior de $z$ para cada $r$ fijo, sea $r^2$ (cuenta real, abajo) o $r^2/2$ (dibujo).'));
    Pasos(c3,[
      {tex:'V=\\int_0^{2\\pi}\\int_0^3\\int_0^{r^2} r\\,dz\\,dr\\,d\\theta',nota:'Para cada (r,θ), z va de 0 al paraboloide z=r².'},
      {tex:'\\int_0^{r^2} r\\,dz=r\\cdot r^2=r^3',nota:'El integrando r no depende de z: la integral interior es trivial.'},
      {tex:'V=\\int_0^{2\\pi}d\\theta\\int_0^3 r^3\\,dr=2\\pi\\left[\\dfrac{r^4}{4}\\right]_0^3',nota:'θ y r se separan.'},
      {tex:'=2\\pi\\cdot\\dfrac{81}{4}=\\dfrac{81\\pi}{2}=40{,}5\\pi\\approx127{,}23',nota:'81/4=20,25; por 2π.'}
    ],{modId:'integrales-triples',titulo:'Volumen bajo z=r² dentro de r≤3'});
    c3.append(el('p',{class:'note'},'Es la misma idea del ejercicio $\\iint(x^2+y^2)\\,dA$ sobre un disco del módulo Integrales dobles, Jacobiano y polares — ahí, esa integral doble ',el('i',{},'es'),' el volumen bajo el paraboloide (por la card "La integral doble como volumen"); acá se llega al mismo tipo de resultado integrando $dV$ directamente, con otro radio ($r\\le3$ en vez de $r\\le2$, de ahí que el número no coincida).'));
    c3.append(el('p',{},'Ejemplo en esféricas: volumen del sólido entre el vértice y la esfera $\\rho=2$, dentro del cono $\\varphi=\\pi/4$ (un "cono de helado").'));
    Pasos(c3,[
      {tex:'V=\\int_0^{2\\pi}\\int_0^{\\pi/4}\\int_0^{2} \\rho^2\\operatorname{sen}\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta',nota:'θ,φ,ρ con límites todos constantes: las tres integrales se separan.'},
      {tex:'\\int_0^2\\rho^2\\,d\\rho=\\dfrac83,\\qquad \\int_0^{\\pi/4}\\operatorname{sen}\\varphi\\,d\\varphi=\\big[-\\cos\\varphi\\big]_0^{\\pi/4}=1-\\dfrac{\\sqrt2}{2}',nota:'Cada integral simple (Formulario de Integrales, Canvas 2026-2, secciones "Potencias" y "Trigonométricas").'},
      {tex:'V=2\\pi\\left(1-\\dfrac{\\sqrt2}{2}\\right)\\cdot\\dfrac83=\\dfrac{(16-8\\sqrt2)\\pi}{3}\\approx4{,}907',nota:'Se multiplican los tres factores.'}
    ],{modId:'integrales-triples',titulo:'Volumen del "cono de helado" ρ≤2, φ≤π/4'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación por la fórmula del sector esférico: '),'$V=\\tfrac{2\\pi}{3}R^3(1-\\cos\\varphi_0)$ con $R=2$, $\\varphi_0=\\pi/4$: $\\tfrac{2\\pi}{3}(8)\\!\\left(1-\\tfrac{\\sqrt2}{2}\\right)=\\tfrac{16\\pi}{3}\\!\\left(1-\\tfrac{\\sqrt2}{2}\\right)$ — mismo resultado que integrando directamente.'));
    c3.append(el('p',{class:'fuente'},'Fuente: fórmulas de cilíndricas/esféricas, index-v3.html (contenido auditado), tema "Integrales triples y coordenadas cilíndricas-esféricas". Ambos ejemplos (paraboloide en el cilindro, cono de helado), sus verificaciones y la figura 3D son elaboración propia — no están en index-v3.html ni en el vault.'));
    sec.append(c3);

    /* -------- Card 4: aplicaciones -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Aplicaciones: volumen, masa y centro de gravedad'));
    c4.append(el('p',{},'Con densidad $\\delta(x,y,z)$ (masa por unidad de volumen):'));
    c4.append(el('div',{class:'formula',html:'$$M=\\iiint_V \\delta\\,dV,\\qquad \\text{Vol}(V)=\\iiint_V dV\\ \\ (\\delta=1)$$'}));
    c4.append(el('div',{class:'formula',html:'$$\\bar x=\\dfrac{\\iiint_V x\\,dV}{\\iiint_V dV},\\qquad \\bar y=\\dfrac{\\iiint_V y\\,dV}{\\iiint_V dV},\\qquad \\bar z=\\dfrac{\\iiint_V z\\,dV}{\\iiint_V dV}$$'}));
    c4.append(el('p',{class:'note'},'Para un sólido ',el('b',{},'homogéneo'),' la densidad se cancela en los tres cocientes (no depende de su valor) — son las mismas fórmulas del tema "Aplicaciones" que en el módulo Integrales dobles, Jacobiano y polares, con volumen en vez de área.'));
    c4.append(el('p',{},'Ejemplo: centro de gravedad del sólido homogéneo limitado por $y=\\sqrt{x}$, $y=2\\sqrt{x}$, $z=0$ y $z+x=6$.'));
    Pasos(c4,[
      {tex:'V=\\int_0^6\\int_{\\sqrt x}^{2\\sqrt x}\\int_0^{6-x} dz\\,dy\\,dx=\\int_0^6(6-x)\\sqrt x\\,dx',nota:'z va de 0 a 6−x; y de √x a 2√x, aportando el factor (2√x−√x)=√x.'},
      {tex:'=\\int_0^6\\left(6x^{1/2}-x^{3/2}\\right)dx=\\left[4x^{3/2}-\\dfrac25x^{5/2}\\right]_0^6',nota:'Antiderivadas de potencias fraccionarias.'},
      {tex:'6^{3/2}=6\\sqrt6,\\quad 6^{5/2}=36\\sqrt6',nota:'Potencias fraccionarias de 6, evaluadas.'},
      {tex:'V=4(6\\sqrt6)-\\dfrac25(36\\sqrt6)=24\\sqrt6-\\dfrac{72\\sqrt6}{5}=\\dfrac{48\\sqrt6}{5}\\approx23{,}52',nota:'Se sustituye en la antiderivada del paso anterior.'}
    ],{modId:'integrales-triples',titulo:'Volumen del sólido y=√x, y=2√x, z=0, z+x=6'});
    Pasos(c4,[
      {tex:'\\iiint_V x\\,dV=\\int_0^6 x(6-x)\\sqrt x\\,dx=\\int_0^6\\left(6x^{3/2}-x^{5/2}\\right)dx',nota:'Se multiplica el integrando anterior por x.'},
      {tex:'=\\left[\\dfrac{12}{5}x^{5/2}-\\dfrac27x^{7/2}\\right]_0^6,\\quad 6^{7/2}=216\\sqrt6',nota:'Antiderivada con la potencia 7/2.'},
      {tex:'=\\dfrac{432\\sqrt6}{5}-\\dfrac{432\\sqrt6}{7}=\\dfrac{864\\sqrt6}{35}\\ \\Rightarrow\\ \\bar x=\\dfrac{864\\sqrt6/35}{48\\sqrt6/5}=\\dfrac{18}{7}\\approx2{,}57',nota:'Común denominador 35; el √6 se cancela al dividir por V.'}
    ],{modId:'integrales-triples',titulo:'Centro de gravedad: x̄ del mismo sólido'});
    c4.append(el('p',{class:'note'},'Con el mismo método (integrando $y\\,dV$ y $z\\,dV$) se obtiene $\\bar y=\\tfrac{45}{8}\\approx5{,}63$ y $\\bar z=\\tfrac{12}{7}\\approx1{,}71$ — no re-derivados letra por letra acá, pero $V$ y $\\bar x$ sí se recalcularon desde cero arriba y coinciden exactamente con index-v3.html.'));
    c4.append(el('p',{class:'fuente'},'Fuente: fórmulas, index-v3.html (contenido auditado), tema "Aplicaciones de integrales múltiples"; coincide con la nota homónima del vault (repo generación anterior 2024-2025, no es Canvas 2026-2). Ejemplo del centro de gravedad: index-v3.html, ejemplo 13 ("Centro de gravedad de un sólido homogéneo") — V y x̄ verificados de nuevo desde cero arriba.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Halle la masa de la región dentro del cilindro $r\\le1$, entre $z=0$ y $z=r$ (un cono), con densidad $\\delta=z$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$M=\\int_0^{2\\pi}\\int_0^1\\int_0^r z\\cdot r\\,dz\\,dr\\,d\\theta,\\qquad \\int_0^r z\\,dz=\\dfrac{r^2}{2}$$'}),
        el('div',{class:'formula',html:'$$M=2\\pi\\int_0^1 r\\cdot\\dfrac{r^2}{2}\\,dr=2\\pi\\int_0^1\\dfrac{r^3}{2}\\,dr=2\\pi\\cdot\\dfrac18=\\dfrac{\\pi}{4}\\approx0{,}785$$'}),
        el('p',{class:'note'},'Mismo método de la card "Coordenadas cilíndricas y esféricas: ejemplos", con densidad en vez de f=1.')));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Deduzca el volumen de una esfera de radio $a$ integrando en coordenadas esféricas.'),
      el('div',{},
        el('div',{class:'formula',html:'$$V=\\int_0^{2\\pi}\\int_0^{\\pi}\\int_0^a \\rho^2\\operatorname{sen}\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=\\int_0^{2\\pi}d\\theta\\int_0^\\pi\\operatorname{sen}\\varphi\\,d\\varphi\\int_0^a\\rho^2\\,d\\rho$$'}),
        el('div',{class:'formula',html:'$$=2\\pi\\cdot\\big[-\\cos\\varphi\\big]_0^\\pi\\cdot\\left[\\dfrac{\\rho^3}{3}\\right]_0^a=2\\pi\\cdot2\\cdot\\dfrac{a^3}{3}=\\dfrac43\\pi a^3$$'}),
        el('p',{class:'note'},'Las tres integrales están completamente separadas (cada una depende de una sola variable) — coincide con la fórmula clásica del volumen de una esfera.')));
    c5.append(ej2);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, elaboración propia (aplicando el método de la card "Coordenadas cilíndricas y esféricas: ejemplos"). Ejercicio 2: index-v3.html (contenido auditado), ejercicio 17 ("Deducir el volumen de una esfera de radio a integrando en coordenadas esféricas").'));
    sec.append(c5);
  }});
