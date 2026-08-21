/* contenidoOficial original (índice a cubrir):
   - Integración en IR² y IR³
   - Integrales dobles sobre regiones generales
   - Cambio de coordenadas y Jacobiano en las integrales dobles
   - Integrales dobles en coordenadas polares
   - Aplicaciones de las integrales dobles
   "Integración en IR³" (integrales triples) se reparte al módulo hermano
   mod-integrales-triples.js, para no duplicar — acá solo se menciona como
   contraste al presentar la integral doble. */
registerModule({id:'integrales-dobles',title:'Integrales dobles, Jacobiano y polares',unidad:'III',semanas:[10],
  evaluacion:['test-3','certamen-2'],
  lead:'Integrar sobre regiones generales del plano con el teorema de Fubini, invertir el orden cuando conviene, y cambiar de variable — con polares como el caso más frecuente — usando el Jacobiano.',
  build(sec){
    /* -------- Card 1: la integral doble como volumen y el teorema de Fubini -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'La integral doble como volumen y el teorema de Fubini'));
    c1.append(el('p',{},'Para $f(x,y)\\ge0$ definida en una región $D$ del plano, $\\displaystyle\\iint_D f\\,dA$ se define como el límite de una suma de Riemann — el mismo tipo de límite de la integral de una variable, pero repartiendo $D$ en celditas de área en vez de un intervalo en sub-intervalos —, y el resultado es exactamente el ',el('b',{},'volumen'),' entre la región $D$ (en el plano $z=0$) y la superficie $z=f(x,y)$. (La integral ',el('b',{},'triple'),' sobre un sólido de $\\mathbb R^3$, con la misma idea un nivel más arriba, es el tema del módulo Integrales triples, cilíndricas y esféricas.)'));
    c1.append(el('p',{},'Calcular ese límite directamente es poco práctico; el ',el('b',{},'teorema de Fubini'),' permite calcularlo como una integral ',el('b',{},'iterada'),': dos integrales de una variable, una adentro de la otra. Primero para un rectángulo $R=[a,b]\\times[c,d]$:'));
    c1.append(el('div',{class:'formula',html:'$$\\iint_R f\\,dA=\\int_a^b\\int_c^d f(x,y)\\,dy\\,dx=\\int_c^d\\int_a^b f(x,y)\\,dx\\,dy$$'}));
    c1.append(el('p',{},'Cualquiera de los dos órdenes da el mismo número — eso es lo que garantiza Fubini, con $f$ continua en $R$. Ejemplo, con $f(x,y)=x^2y$ en $R=[0,2]\\times[0,3]$:'));
    Pasos(c1,[
      {tex:'\\int_0^2\\int_0^3 x^2y\\,dy\\,dx',nota:'Se integra primero en y, con x fijo.'},
      {tex:'\\int_0^3 x^2y\\,dy=x^2\\left[\\dfrac{y^2}{2}\\right]_0^3=\\dfrac{9}{2}x^2',nota:'Antiderivada en y, evaluada entre 0 y 3.'},
      {tex:'\\int_0^2 \\dfrac{9}{2}x^2\\,dx=\\dfrac{9}{2}\\left[\\dfrac{x^3}{3}\\right]_0^2=\\dfrac{9}{2}\\cdot\\dfrac{8}{3}=12',nota:'Antiderivada en x, evaluada entre 0 y 2.'}
    ],{modId:'integrales-dobles',titulo:'∬_R x²y dA sobre R=[0,2]×[0,3], orden dy dx'});
    c1.append(el('p',{class:'note'},el('b',{},'Verificación en el otro orden: '),'$\\displaystyle\\int_0^3\\int_0^2 x^2y\\,dx\\,dy=\\int_0^3 y\\left[\\dfrac{x^3}{3}\\right]_0^2dy=\\int_0^3\\dfrac{8}{3}y\\,dy=\\dfrac{8}{3}\\left[\\dfrac{y^2}{2}\\right]_0^3=\\dfrac{8}{3}\\cdot\\dfrac{9}{2}=12$ — mismo resultado, $12$, tal como promete Fubini.'));
    c1.append(el('p',{},'Cuando $D$ no es un rectángulo, se describe con límites interiores variables — ',el('b',{},'región tipo I'),' (franjas verticales) o ',el('b',{},'tipo II'),' (franjas horizontales):'));
    c1.append(el('div',{class:'formula',html:'$$D=\\{a\\le x\\le b,\\ g_1(x)\\le y\\le g_2(x)\\}\\ \\Rightarrow\\ \\iint_D f\\,dA=\\int_a^b\\int_{g_1(x)}^{g_2(x)} f\\,dy\\,dx\\quad\\text{(tipo I)}$$'}));
    c1.append(el('div',{class:'formula',html:'$$D=\\{c\\le y\\le d,\\ h_1(y)\\le x\\le h_2(y)\\}\\ \\Rightarrow\\ \\iint_D f\\,dA=\\int_c^d\\int_{h_1(y)}^{h_2(y)} f\\,dx\\,dy\\quad\\text{(tipo II)}$$'}));
    c1.append(el('p',{class:'note'},'Los límites ',el('b',{},'exteriores'),' son siempre números; los ',el('b',{},'interiores'),' pueden depender de la variable exterior. El primer paso, siempre, es dibujar $D$: identificar qué curva queda arriba/abajo (tipo I) o izquierda/derecha (tipo II) es lo que da esos límites — de eso trata a fondo la card "Invertir el orden de integración".'));
    c1.append(el('p',{class:'fuente'},'Fuente: definición de la integral doble como volumen y teorema de Fubini en un rectángulo, desarrollo estándar de la materia (Stewart/Larson, cap. integrales dobles) — no está en index-v3.html ni en el vault, que van directo a regiones generales. Fórmulas de región tipo I/tipo II: index-v3.html (contenido auditado), tema "Integrales dobles sobre regiones generales (Teorema de Fubini)". Ejemplo numérico y su verificación son elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: invertir el orden de integración -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Invertir el orden de integración'));
    c2.append(el('p',{},'Muchas regiones se describen de las dos formas a la vez — y a veces un orden lleva a una integral que no se puede resolver a mano, mientras el otro sí. Región $D$ entre $y=x^2$ (abajo) e $y=x$ (arriba), para $x\\in[0,1]$ — un "lente" que se junta en $(0,0)$ y $(1,1)$ — con $f(x,y)=xy$:'));
    let modoFranja='v';
    const planoInv=Plano(c2,{xMin:-0.35,xMax:1.35,yMin:-0.35,yMax:1.35,alto:340});
    planoInv.dibujar(P=>{
      P.ejes();
      P.region(x=>x,x=>x*x,0,1,{color:'--s1',alpha:0.20});
      P.parametrica(t=>[t,t],0,1,{color:'--s2',grosor:2});
      P.parametrica(t=>[t,t*t],0,1,{color:'--s4',grosor:2});
      P.texto(0.82,0.68,'y=x',{color:'--s2'});
      P.texto(0.85,0.55,'y=x²',{color:'--s4'});
      if(modoFranja==='v'){
        for(let i=1;i<=9;i++){ const x=i/10; P.vector(x,x*x,x,x,{color:'--s7',punta:6}); }
        P.texto(0.05,1.22,'x fijo: y de x² a x',{color:'--s7',tam:12});
      } else {
        for(let i=1;i<=9;i++){ const y=i/10; P.vector(y,y,Math.sqrt(y),y,{color:'--s7',punta:6}); }
        P.texto(0.05,1.22,'y fijo: x de y a √y',{color:'--s7',tam:12});
      }
    });
    btnGroup(c2,[{label:'Franjas verticales (dy dx)',value:'v'},{label:'Franjas horizontales (dx dy)',value:'h'}],v=>{ modoFranja=v; planoInv.redibujar(); });
    c2.append(el('p',{class:'note'},'Cada flecha es la integral interior "de adentro": con franjas verticales, para cada $x$ fijo se suma $y$ desde la curva de abajo ($y=x^2$) hasta la de arriba ($y=x$); con horizontales, para cada $y$ fijo se suma $x$ desde la izquierda ($x=y$) hasta la derecha ($x=\\sqrt y$, despejando $x$ de $y=x^2$). Alterná el botón: es la misma región, descrita de dos formas.'));
    Pasos(c2,[
      {tex:'\\int_0^1\\int_{x^2}^{x} xy\\,dy\\,dx',nota:'Orden dy dx: franjas verticales.'},
      {tex:'\\int_{x^2}^{x} xy\\,dy=x\\left[\\dfrac{y^2}{2}\\right]_{x^2}^{x}=x\\left(\\dfrac{x^2}{2}-\\dfrac{x^4}{2}\\right)=\\dfrac{x^3-x^5}{2}',nota:'Antiderivada en y, evaluada entre x² y x.'},
      {tex:'\\int_0^1\\dfrac{x^3-x^5}{2}\\,dx=\\dfrac12\\left[\\dfrac{x^4}{4}-\\dfrac{x^6}{6}\\right]_0^1=\\dfrac12\\left(\\dfrac14-\\dfrac16\\right)=\\dfrac12\\cdot\\dfrac{1}{12}=\\dfrac{1}{24}',nota:'Antiderivada en x, evaluada entre 0 y 1.'}
    ],{modId:'integrales-dobles',titulo:'Orden dy dx: ∬xy dA sobre el lente y=x²…y=x'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación invirtiendo el orden: '),'$\\displaystyle\\int_0^1\\int_{y}^{\\sqrt y} xy\\,dx\\,dy=\\int_0^1 y\\left[\\dfrac{x^2}{2}\\right]_{y}^{\\sqrt y}dy=\\int_0^1 y\\cdot\\dfrac{y-y^2}{2}\\,dy=\\dfrac12\\int_0^1(y^2-y^3)\\,dy=\\dfrac12\\left(\\dfrac13-\\dfrac14\\right)=\\dfrac{1}{24}$ — mismo $1/24$ que con franjas verticales.'));
    c2.append(el('p',{class:'note'},'Cuando de verdad importa: con $f(x,y)=e^{y^2}$ en la región $\\{0\\le x\\le y\\le1\\}$, el orden $\\displaystyle\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$ pide una antiderivada de $e^{y^2}$ que no existe en forma elemental — está trabado. Invirtiendo a franjas horizontales, $\\displaystyle\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy=\\int_0^1 y\\,e^{y^2}\\,dy=\\left[\\tfrac12 e^{y^2}\\right]_0^1=\\tfrac{e-1}{2}\\approx0{,}859$, sí se resuelve — invertir el orden no es solo prolijidad, a veces es la única forma de terminar la cuenta.'));
    c2.append(el('p',{class:'fuente'},'Fuente: técnica y ambos ejemplos (el lente xy y el caso e^{y²}), desarrollo estándar de la materia (Stewart/Larson, invertir el orden de integración) — no está en index-v3.html ni en el vault, que no traen un ejemplo dedicado a esto. Ambas verificaciones son elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: cambio de variable general y el Jacobiano -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Cambio de variable general y el Jacobiano'));
    c3.append(el('p',{},'Igual que la sustitución $u=g(x)$ en una variable arrastra un factor $g\'(x)$, cambiar de $(x,y)$ a $(u,v)$ en una integral doble arrastra el ',el('b',{},'Jacobiano'),' — el análogo 2D de esa derivada:'));
    c3.append(el('div',{class:'formula',html:'$$\\iint_D f(x,y)\\,dA=\\iint_{D^*} f\\big(x(u,v),y(u,v)\\big)\\,|J|\\,du\\,dv,\\qquad J=\\dfrac{\\partial(x,y)}{\\partial(u,v)}=\\begin{vmatrix}x_u&x_v\\\\y_u&y_v\\end{vmatrix}$$'}));
    c3.append(el('p',{},'$D^*$ es la región $D$ vista en las variables nuevas. El truco vale la pena cuando $D$ se ve fea en $(x,y)$ pero simple en $(u,v)$ — o al revés, cuando el integrando se simplifica mucho. Ejemplo: $u=x+y$, $v=x-y$ manda el rombo $D$ de vértices $(0,0),(1,1),(2,0),(1,-1)$ a un ',el('b',{},'rectángulo'),' en $(u,v)$.'));
    Pasos(c3,[
      {tex:'x=\\dfrac{u+v}{2},\\quad y=\\dfrac{u-v}{2}',nota:'Se despeja x,y en función de u,v (invirtiendo u=x+y, v=x−y).'},
      {tex:'x_u=\\tfrac12,\\ x_v=\\tfrac12,\\quad y_u=\\tfrac12,\\ y_v=-\\tfrac12',nota:'Las cuatro parciales para el Jacobiano.'},
      {tex:'J=x_uy_v-x_vy_u=\\tfrac12\\!\\left(-\\tfrac12\\right)-\\tfrac12\\!\\left(\\tfrac12\\right)=-\\tfrac12\\ \\Rightarrow\\ |J|=\\tfrac12',nota:'Determinante 2×2, y su valor absoluto.'},
      {tex:'(0,0)\\to(0,0),\\ (1,1)\\to(2,0),\\ (2,0)\\to(2,2),\\ (1,-1)\\to(0,2)',nota:'Los 4 vértices del rombo, transformados con u=x+y, v=x−y.'},
      {tex:'D^*=[0,2]\\times[0,2]\\quad\\text{(un rectángulo)}',nota:'Los 4 vértices transformados forman un cuadrado alineado con los ejes.'}
    ],{modId:'integrales-dobles',titulo:'Cambio u=x+y, v=x−y: el rombo se vuelve rectángulo'});
    c3.append(el('p',{},'Con $f(x,y)=(x-y)^2=v^2$, integrar sobre el rombo directamente exige partirlo en dos triángulos; en $(u,v)$ es una caja:'));
    Pasos(c3,[
      {tex:'\\iint_D (x-y)^2\\,dA=\\iint_{D^*} v^2\\cdot\\tfrac12\\,du\\,dv=\\int_0^2\\int_0^2 \\tfrac12v^2\\,du\\,dv',nota:'Se reemplaza el integrando y el |J|=1/2 del paso anterior.'},
      {tex:'=\\tfrac12\\int_0^2 du\\int_0^2 v^2\\,dv=\\tfrac12\\cdot2\\cdot\\left[\\dfrac{v^3}{3}\\right]_0^2=\\tfrac12\\cdot2\\cdot\\dfrac83=\\dfrac83',nota:'Las dos integrales se separan (el integrando y la región ya no mezclan u con v).'}
    ],{modId:'integrales-dobles',titulo:'∬(x−y)² dA sobre el rombo, vía u=x+y,v=x−y'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación por el camino directo (sin cambio de variable): '),'partiendo el rombo en los dos triángulos $0\\le x\\le1$ ($-x\\le y\\le x$) y $1\\le x\\le2$ ($-(2-x)\\le y\\le 2-x$) y usando la antiderivada $-\\tfrac13(x-y)^3$ en $y$ en cada tramo, el primer triángulo da $\\int_0^1\\tfrac83x^3\\,dx=\\tfrac23$ y el segundo da $2$ (cálculo más largo, hecho aparte) — total $\\tfrac23+2=\\tfrac83$, igual que con el Jacobiano, pero con bastante más álgebra.'));
    c3.append(el('p',{class:'fuente'},'Fuente: fórmula general del Jacobiano, desarrollo estándar de la materia (Stewart/Larson, cambio de variables en integrales dobles) — no está en index-v3.html, que solo trae el caso particular de polares (card "Coordenadas polares: la integral doble en el plano r-θ"), ni en el vault. Ejemplo del rombo, ambas Pasos y la verificación directa son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: coordenadas polares -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Coordenadas polares: la integral doble en el plano r-θ'));
    c4.append(el('p',{},'El cambio a polares, $x=r\\cos\\theta$, $y=r\\operatorname{sen}\\theta$, es el caso de la card "Cambio de variable general y el Jacobiano" que más se usa: aplicando la fórmula del Jacobiano a este cambio en particular ($x_r=\\cos\\theta$, $x_\\theta=-r\\operatorname{sen}\\theta$, $y_r=\\operatorname{sen}\\theta$, $y_\\theta=r\\cos\\theta$) da $J=r\\cos^2\\theta+r\\operatorname{sen}^2\\theta=r$ — siempre $\\ge0$, así que $|J|=r$ directo:'));
    c4.append(el('div',{class:'formula',html:'$$\\iint_D f(x,y)\\,dA=\\int_\\alpha^\\beta\\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta,r\\operatorname{sen}\\theta)\\;r\\,dr\\,d\\theta$$'}));
    c4.append(el('p',{},'Conviene cuando $D$ tiene simetría radial (discos, sectores, coronas). Ejemplo: $\\displaystyle\\iint_D(x^2+y^2)\\,dA$ sobre el disco $D=\\{x^2+y^2\\le4\\}$.'));
    const planoPol=Plano(c4,{xMin:-2.6,xMax:2.6,yMin:-2.6,yMax:2.6,alto:320});
    planoPol.dibujar(P=>{
      P.ejes();
      P.region(x=>Math.sqrt(Math.max(0,4-x*x)),x=>-Math.sqrt(Math.max(0,4-x*x)),-2,2,{color:'--s1',alpha:0.18});
      P.parametrica(t=>[2*Math.cos(t),2*Math.sin(t)],0,2*Math.PI,{color:'--s1',grosor:2});
      P.parametrica(t=>[Math.cos(t),Math.sin(t)],0,2*Math.PI,{color:'--s4',guiones:true,grosor:1.3});
      for(let k=0;k<8;k++){ const a=k*Math.PI/4; P.parametrica(t=>[t*Math.cos(a),t*Math.sin(a)],0,2,{color:'--muted',grosor:1}); }
      P.texto(1.55,0.3,'r=1',{color:'--s4'}); P.texto(-2.35,1.55,'r=2 (borde de D)',{color:'--s1'});
    });
    c4.append(el('p',{class:'note'},'La grilla polar (rayos cada $\\pi/4$, circunferencia $r=1$ punteada) muestra por qué conviene el cambio: en polares $D$ es simplemente $0\\le r\\le2$, $0\\le\\theta\\le2\\pi$ — dos números por variable, sin curvas que despejar.'));
    Pasos(c4,[
      {tex:'x^2+y^2=r^2,\\qquad dA=r\\,dr\\,d\\theta',nota:'Se reescribe el integrando y el elemento de área en polares.'},
      {tex:'\\iint_D(x^2+y^2)\\,dA=\\int_0^{2\\pi}\\int_0^2 r^2\\cdot r\\,dr\\,d\\theta=\\int_0^{2\\pi}d\\theta\\int_0^2 r^3\\,dr',nota:'D es 0≤r≤2, 0≤θ≤2π; las dos integrales se separan.'},
      {tex:'=2\\pi\\cdot\\left[\\dfrac{r^4}{4}\\right]_0^2=2\\pi\\cdot4=8\\pi\\approx25{,}13',nota:'∫r³dr es potencia directa (Formulario de Integrales, Canvas 2026-2, sección "Potencias").'}
    ],{modId:'integrales-dobles',titulo:'∬(x²+y²) dA sobre el disco r≤2, en polares'});
    c4.append(el('p',{class:'note'},el('b',{},'Olvidar el factor $r$'),' en $dA=r\\,dr\\,d\\theta$ es el error más frecuente al cambiar a polares — sin él, el resultado de arriba daría $2\\pi\\cdot\\left[\\tfrac{r^3}{3}\\right]_0^2=\\tfrac{16\\pi}{3}\\approx16{,}76$, un número distinto y sin sentido dimensional (falta el factor de área que aporta el Jacobiano).'));
    c4.append(el('p',{class:'fuente'},'Fuente: fórmula e integral del disco, index-v3.html (contenido auditado), ejercicio 16 ("Calcular ∬(x²+y²)dA…usando coordenadas polares") y tema "Integrales dobles en coordenadas polares"; coincide con la nota "Integrales dobles en coordenadas polares" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2). La derivación de J=r a partir del Jacobiano general de la card "Cambio de variable general y el Jacobiano", la Plano interactiva y la verificación del error común son elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: aplicaciones -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Aplicaciones: área, volumen, masa y centro de masa'));
    c5.append(el('p',{},'Con $f=1$ la integral doble de la card "La integral doble como volumen y el teorema de Fubini" da el ',el('b',{},'área'),' de $D$; con $f\\ge0$ cualquiera, da el ',el('b',{},'volumen'),' bajo esa superficie. Ponderando por una densidad superficial $\\delta(x,y)$ (masa por unidad de área) se obtiene la ',el('b',{},'masa'),' y el ',el('b',{},'centro de masa'),' de una lámina plana — el análogo 2D de las fórmulas de masa y centro de gravedad de un sólido del módulo Integrales triples, cilíndricas y esféricas, cambiando volumen por área:'));
    c5.append(el('div',{class:'formula',html:'$$\\text{Área}(D)=\\iint_D dA,\\qquad M=\\iint_D \\delta(x,y)\\,dA$$'}));
    c5.append(el('div',{class:'formula',html:'$$\\bar x=\\dfrac{1}{M}\\iint_D x\\,\\delta\\,dA,\\qquad \\bar y=\\dfrac{1}{M}\\iint_D y\\,\\delta\\,dA$$'}));
    c5.append(el('p',{},'Ejemplo: lámina triangular $D=\\{x\\ge0,\\,y\\ge0,\\,x+y\\le2\\}$ con densidad $\\delta(x,y)=x+y$ (más densa lejos del origen). Con $y$ de $0$ a $2-x$:'));
    Pasos(c5,[
      {tex:'M=\\int_0^2\\int_0^{2-x}(x+y)\\,dy\\,dx',nota:'Masa: integral doble de δ sobre D.'},
      {tex:'\\int_0^{2-x}(x+y)\\,dy=x(2-x)+\\dfrac{(2-x)^2}{2}=2-\\dfrac{x^2}{2}',nota:'Antiderivada en y; los términos en x se simplifican (verificar expandiendo).'},
      {tex:'M=\\int_0^2\\left(2-\\dfrac{x^2}{2}\\right)dx=\\left[2x-\\dfrac{x^3}{6}\\right]_0^2=4-\\dfrac86=\\dfrac83',nota:'Antiderivada en x, evaluada entre 0 y 2.'}
    ],{modId:'integrales-dobles',titulo:'Masa de la lámina triangular con δ=x+y'});
    Pasos(c5,[
      {tex:'M\\bar x=\\int_0^2\\int_0^{2-x} x(x+y)\\,dy\\,dx=\\int_0^2\\left(2x-\\dfrac{x^3}{2}\\right)dx',nota:'Se multiplica δ por x, se integra en y y se simplifica (mismo tipo de álgebra que para M).'},
      {tex:'=\\left[x^2-\\dfrac{x^4}{8}\\right]_0^2=4-2=2\\ \\Rightarrow\\ \\bar x=\\dfrac{2}{8/3}=\\dfrac34',nota:'Se evalúa y se divide por M=8/3 de arriba.'}
    ],{modId:'integrales-dobles',titulo:'Centro de masa: x̄ de la lámina triangular'});
    c5.append(el('p',{class:'note'},el('b',{},'Por simetría: '),'$D$ y $\\delta=x+y$ no cambian al intercambiar $x\\leftrightarrow y$ (el triángulo es simétrico respecto de la recta $y=x$), así que $\\bar y=\\bar x=\\tfrac34$ sin recalcular la integral. Verificación de sentido físico: el centroide ',el('i',{},'geométrico'),' (densidad uniforme) de este triángulo es $(\\tfrac23,\\tfrac23)\\approx(0{,}67,0{,}67)$; con $\\delta$ creciendo hacia la hipotenusa, el centro de masa pesado, $(0{,}75,0{,}75)$, se corre un poco más allá de esa esquina opuesta al origen — justo lo que se espera.'));
    c5.append(el('p',{class:'fuente'},'Fuente: fórmulas de masa y centro de masa, desarrollo estándar de la materia, extendiendo a 2D las fórmulas de masa y centro de gravedad de index-v3.html (contenido auditado) para sólidos (tema "Aplicaciones de integrales múltiples" — ver también el módulo Integrales triples, cilíndricas y esféricas). El ejemplo de la lámina triangular y su verificación son elaboración propia.'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I); ambos ejercicios de abajo son elaboración propia.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Evalúe $\\displaystyle\\iint_D y\\,dA$ donde $D$ está acotada por $y=\\sqrt x$ (arriba) e $y=x^2$ (abajo), $0\\le x\\le1$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\int_0^1\\int_{x^2}^{\\sqrt x} y\\,dy\\,dx=\\int_0^1\\left(\\dfrac{x}{2}-\\dfrac{x^4}{2}\\right)dx=\\dfrac12\\left(\\dfrac12-\\dfrac15\\right)=\\dfrac12\\cdot\\dfrac{3}{10}=\\dfrac{3}{20}=0{,}15$$'}),
        el('p',{class:'note'},'Mismo tipo de región "lente" que la card "Invertir el orden de integración", con otras curvas: $\\sqrt x\\ge x^2$ en $[0,1]$, así que $\\sqrt x$ es la de arriba.')));
    c6.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con polares, evalúe $\\displaystyle\\iint_D e^{-(x^2+y^2)}\\,dA$ donde $D$ es el disco $x^2+y^2\\le1$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\int_0^{2\\pi}\\int_0^1 e^{-r^2}\\,r\\,dr\\,d\\theta=2\\pi\\int_0^1 r\\,e^{-r^2}\\,dr$$'}),
        el('div',{class:'formula',html:'$$\\int_0^1 r\\,e^{-r^2}\\,dr=\\left[-\\tfrac12e^{-r^2}\\right]_0^1=\\tfrac12(1-e^{-1})\\approx0{,}3161\\ \\Rightarrow\\ 2\\pi\\cdot0{,}3161\\approx1{,}986$$'}),
        el('p',{class:'note'},'En cartesianas, $e^{-(x^2+y^2)}$ no tiene antiderivada elemental en $x$ ni en $y$ por separado — este es justo el tipo de integral que solo se puede resolver cambiando a polares, donde $r\\,e^{-r^2}$ sí es directa (sustitución $u=-r^2$).')));
    c6.append(ej2);

    c6.append(el('p',{class:'fuente'},'Fuente: ambos ejercicios, elaboración propia. Ejercicio 1 aplica el método de la card "Invertir el orden de integración"; ejercicio 2 aplica el método de la card "Coordenadas polares".'));
    sec.append(c6);
  }});
