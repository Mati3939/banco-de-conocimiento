/* contenidoOficial original (índice a cubrir):
   - Interpretación geométrica de las derivadas parciales
   - Vector normal a una superficie, gradiente, plano tangente y recta normal
   - Aproximación lineal
   La interpretación geométrica de f_x, f_y ya está cubierta en mod-derivadas-parciales.js
   (card "Interpretación geométrica") y no se repite acá; este módulo arma el
   gradiente propiamente tal y lo usa para el plano tangente y la aproximación
   lineal. La derivada direccional (la otra mitad de "#tema-gradiente" en
   index-v3.html) se reparte al módulo mod-direccional.js, para no duplicar. */
registerModule({id:'gradiente',title:'Gradiente, plano tangente y aproximación lineal',unidad:'II',semanas:[5],
  evaluacion:['test-2','certamen-1'],
  lead:'Con las mismas derivadas parciales se arma el vector gradiente, y con el gradiente, el plano que mejor aproxima una superficie cerca de un punto.',
  build(sec){
    const movil=window.innerWidth<700; /* ver nota en la card 4: la escala de un Espacio
      es fija (no se recalcula con el ancho real del lienzo), así que si se elige un
      solo valor tiene que servir tanto para el lienzo angosto del teléfono (~344px)
      como para el ancho del escritorio (~1057px) — y ahí siempre gana el más chico.
      Eligiendo la escala según el ancho de la ventana en el momento de construir el
      módulo, el escritorio puede usar una escala bastante mayor sin que el teléfono
      se recorte. */

    /* -------- Card 1: vector gradiente -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Vector gradiente'));
    c1.append(el('p',{},'El ',el('b',{},'gradiente'),' de $f$ junta todas sus derivadas parciales (tema ',el('b',{},'Derivadas parciales'),') en un solo vector:'));
    c1.append(el('div',{class:'formula',html:'$$\\nabla f(x,y) = \\langle f_x,\\,f_y\\rangle \\qquad \\nabla f(x,y,z) = \\langle f_x,\\,f_y,\\,f_z\\rangle$$'}));
    c1.append(el('p',{},'No es un concepto nuevo — es solo una forma de empaquetar las parciales que ya se sabían calcular. Ejemplo: para $f(x,y)=x^2y-3xy^2$ en el punto $(2,1)$:'));
    c1.append(el('div',{class:'formula',html:'$$f_x=2xy-3y^2,\\qquad f_y=x^2-6xy$$'}));
    c1.append(el('div',{class:'formula',html:'$$\\nabla f(2,1)=\\langle2(2)(1)-3(1)^2,\\ (2)^2-6(2)(1)\\rangle=\\langle1,\\,-8\\rangle$$'}));
    c1.append(el('p',{class:'note'},'Verificación de cada componente por separado: $f_x(2,1)=2(2)(1)-3(1)^2=4-3=1$; $f_y(2,1)=(2)^2-6(2)(1)=4-12=-8$. Ambas coinciden con el vector de arriba.'));
    c1.append(el('p',{},'Lo que hace útil a $\\nabla f$ no es el empaquetado en sí, sino dos propiedades geométricas que las parciales sueltas no muestran: da la dirección de máximo crecimiento de $f$ (tema ',el('b',{},'Derivada direccional y aplicaciones'),') y es perpendicular a las curvas y superficies de nivel — lo que se usa en la próxima card para construir el plano tangente.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Gradiente y derivada direccional"; nota "Gradiente y derivada direccional" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2 — el Listado 1 y la Guía de Ayudantía 1 de Canvas 2026-2 solo cubren funciones vectoriales y el triedro TNB de la Unidad I). El ejemplo numérico es elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: plano tangente y recta normal -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Plano tangente y recta normal'));
    c2.append(el('p',{},'Para que el gradiente dé un vector normal a una superficie hace falta un truco: escribir $z=f(x,y)$ como el nivel 0 de una función de tres variables, $F(x,y,z)=f(x,y)-z$. Ahí sí, $\\nabla F$ es perpendicular a la superficie:'));
    c2.append(el('div',{class:'formula',html:'$$\\nabla F=\\langle F_x,F_y,F_z\\rangle=\\langle f_x,\\,f_y,\\,-1\\rangle$$'}));
    c2.append(el('p',{},'con esa normal, el plano tangente en $(x_0,y_0,z_0)$ y la recta normal salen directo:'));
    c2.append(el('div',{class:'formula',html:'$$z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)\\qquad\\text{(plano tangente)}$$'}));
    c2.append(el('p',{},el('b',{},'Recta normal: '),'pasa por $(x_0,y_0,z_0)$ con vector director $\\nabla F(x_0,y_0,z_0)$. Ejemplo — plano tangente a $z=f(x,y)=2x^2-y^2$ en $(4,3,23)$:'));
    Pasos(c2,[
      {tex:'F(x,y,z)=2x^2-y^2-z',nota:'Se escribe la superficie como F=0.'},
      {tex:'\\nabla F=\\langle4x,\\,-2y,\\,-1\\rangle',nota:'F_x=4x, F_y=-2y (parciales de f), F_z=-1 (derivada de -z).'},
      {tex:'\\nabla F(4,3,23)=\\langle16,\\,-6,\\,-1\\rangle',nota:'Se evalúa en el punto dado.'},
      {tex:'16(x-4)-6(y-3)-1(z-23)=0',nota:'Normal · (X-X₀) = 0.'},
      {tex:'16x-6y-z=16(4)-6(3)-23=23',nota:'Se agrupan las constantes al lado derecho.'}
    ],{modId:'gradiente',titulo:'Plano tangente a z=2x²−y² en (4,3,23)'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación: '),'el punto mismo tiene que satisfacer su propio plano tangente: $16(4)-6(3)-23=64-18-23=23$ ✓. La recta normal en ese punto usa el mismo vector director $\\langle16,-6,-1\\rangle$: $X(t)=(4,3,23)+t\\langle16,-6,-1\\rangle$.'));
    c2.append(el('p',{class:'note'},'El $-1$ en la componente $z$ de $\\nabla F$ viene de derivar $-z$ respecto de $z$; olvidarlo invierte la orientación del plano. Y ojo: esto es el plano tangente a una ',el('b',{},'superficie'),' — no confundir con el plano rectificante u osculador de una ',el('b',{},'curva'),' (tema Triedro de Frenet), que también usan un vector normal pero son conceptos distintos.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 10 ("Plano tangente a un paraboloide hiperbólico"); coincide con la nota "Plano tangente y recta normal" del vault (repo generación anterior 2024-2025, no es Canvas 2026-2).'));
    sec.append(c2);

    /* -------- Card 3: aproximación lineal y diferencial total -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Aproximación lineal y diferencial total'));
    c3.append(el('p',{},'El plano tangente de la card "Plano tangente y recta normal" no es solo geometría: da la mejor aproximación ',el('b',{},'lineal'),' de $f$ cerca de $(a,b)$, escrita con el gradiente:'));
    c3.append(el('div',{class:'formula',html:'$$L(x,y)=f(a,b)+\\nabla f(a,b)\\cdot(x-a,\\,y-b)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$$'}));
    c3.append(el('p',{},'Es la misma $L(x,y)$ y el mismo diferencial total $dz=f_x\\,dx+f_y\\,dy$ del tema ',el('b',{},'Derivadas parciales'),' (card "Diferencial y diferencial total", con el ejemplo de propagación de error en $P=8{,}31nT/V$) — acá solo se reescribe con $\\nabla f$ en vez de las parciales sueltas. Otro ejemplo, para ver qué tan buena es la aproximación cuando el punto está cerca: $f(x,y)=\\sqrt{x^2+y^2}$ en $(a,b)=(3,4)$, donde $f(3,4)=5$ exacto (triángulo 3-4-5):'));
    Pasos(c3,[
      {tex:'f_x=\\dfrac{x}{\\sqrt{x^2+y^2}},\\quad f_y=\\dfrac{y}{\\sqrt{x^2+y^2}}',nota:'Parciales de la norma.'},
      {tex:'f_x(3,4)=\\dfrac35=0{,}6,\\qquad f_y(3,4)=\\dfrac45=0{,}8',nota:'Evaluadas en (3,4).'},
      {tex:'L(x,y)=5+0{,}6(x-3)+0{,}8(y-4)',nota:'L(x,y)=f(a,b)+∇f(a,b)·(x−a,y−b).'},
      {tex:'L(3{,}02,\\ 3{,}97)=5+0{,}6(0{,}02)+0{,}8(-0{,}03)',nota:'Δx=0,02, Δy=−0,03.'},
      {tex:'L(3{,}02,\\ 3{,}97)=5+0{,}012-0{,}024=4{,}988',nota:'Sumando los tres términos.'}
    ],{modId:'gradiente',titulo:'Aproximación lineal de f(x,y)=√(x²+y²) en (3,4)'});
    c3.append(el('p',{class:'note'},el('b',{},'Verificación contra el valor real: '),'$f(3{,}02,\\,3{,}97)=\\sqrt{3{,}02^2+3{,}97^2}=\\sqrt{9{,}1204+15{,}7609}=\\sqrt{24{,}8813}\\approx4{,}98812$. La aproximación lineal dio $4{,}988$: un error de apenas $\\approx0{,}00012$, porque $(3{,}02,\\,3{,}97)$ está muy cerca de $(3,4)$ — el error de $L$ crece con el cuadrado de la distancia al punto base, no linealmente.'));
    c3.append(el('p',{class:'fuente'},'Fuente: fórmula de L(x,y), index-v3.html (contenido auditado), tema "Plano tangente y recta normal" (Unidad 2 de esa página) reescrita con ∇f; conecta con la card "Diferencial y diferencial total" de mod-derivadas-parciales.js. El ejemplo de f=√(x²+y²) y su verificación son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: plano tangente móvil (interactivo) -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Plano tangente móvil sobre un paraboloide'));
    c4.append(el('p',{},'Superficie $z=f(x,y)=(x^2+y^2)/4$: arrastrá para rotar, y movés $x_0,y_0$ para ver cómo cambia el plano tangente punto a punto.'));
    const fTan=(x,y)=>(x*x+y*y)/4;
    const offGrad=(fTan(2.5,2.5))/2; /* fTan va de 0 a 3,125 en el dominio ±2,5: se le resta la
      mitad de ese rango a todo lo que se dibuja (superficie, parche y punto) para que quede
      centrado en el origen de pantalla del Espacio, en vez de "flotando" en la mitad superior
      del lienzo — el mismo tipo de arreglo que usa cuadricaPunto(tp=3) en mod-varias-variables.js.
      La ecuación de f que se muestra en el texto NO cambia, solo el dibujo. */
    let x0G=1.3, y0G=-0.8;
    const escalaTan=movil?38:110;
    const espTan=Espacio(c4,{alto:460,escala:escalaTan});
    espTan.dibujar(E=>{
      E.superficie((u,v)=>[u,v,fTan(u,v)-offGrad],{uMin:-2.5,uMax:2.5,vMin:-2.5,vMax:2.5,nu:16,nv:16,color:'--grid'});
      const z0=fTan(x0G,y0G), fx0=x0G/2, fy0=y0G/2;
      const xMinP=Math.max(-2.5,x0G-0.9), xMaxP=Math.min(2.5,x0G+0.9);
      const yMinP=Math.max(-2.5,y0G-0.9), yMaxP=Math.min(2.5,y0G+0.9);
      E.superficie((u,v)=>[u,v,(z0+fx0*(u-x0G)+fy0*(v-y0G))-offGrad],{uMin:xMinP,uMax:xMaxP,vMin:yMinP,vMax:yMaxP,nu:6,nv:6,color:'--s4'});
      E.punto3([x0G,y0G,z0-offGrad],{color:'--s2',r:4});
    });
    const notaTan=el('p',{class:'note'});
    function actualizarTan(){
      const z0=fTan(x0G,y0G), fx0=x0G/2, fy0=y0G/2;
      notaTan.textContent='(x₀,y₀) = ('+x0G.toFixed(2)+', '+y0G.toFixed(2)+'), f(x₀,y₀) = '+z0.toFixed(3)+'. f_x = x₀/2 = '+fx0.toFixed(2)+', f_y = y₀/2 = '+fy0.toFixed(2)+' — esa es la inclinación del parche naranjo (el plano tangente) en cada dirección.';
    }
    actualizarTan();
    c4.append(notaTan);
    c4.append(el('div',{class:'controls'},
      el('label',{},'x₀:'),
      el('input',{type:'range',min:'-2.5',max:'2.5',step:'0.1',value:String(x0G),oninput:e=>{ x0G=parseFloat(e.target.value); espTan.redibujar(); actualizarTan(); }}),
      el('label',{},'y₀:'),
      el('input',{type:'range',min:'-2.5',max:'2.5',step:'0.1',value:String(y0G),oninput:e=>{ y0G=parseFloat(e.target.value); espTan.redibujar(); actualizarTan(); }})
    ));
    c4.append(el('p',{class:'note'},'Cerca del punto verde, el parche naranjo (el plano) y la malla gris (la superficie) casi se confunden; alejándose se separan — esa separación creciente es justo el error que comete $L(x,y)$ de la card "Aproximación lineal y diferencial total". Como $f$ depende de $x,y$ solo a través de $x^2+y^2$, la inclinación del plano solo depende de $(x_0,y_0)$ mismo, nunca de otra cosa.'));
    c4.append(el('p',{class:'fuente'},'Fuente: elaboración propia (implementación interactiva); misma superficie $z=(x^2+y^2)/4$ y mismos valores iniciales $x_0=1{,}3$, $y_0=-0{,}8$ de la animación "Plano tangente móvil sobre un paraboloide" de index-v3.html (contenido auditado). Fórmulas de f_x, f_y verificadas arriba en la card "Vector gradiente" (mismo procedimiento, otra función).'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));
    c5.append(el('p',{class:'note'},'Canvas 2026-2 no trae material de esta unidad: el Listado 1 y la Guía de Ayudantía 1 solo cubren funciones vectoriales y el triedro TNB (Unidad I). Ambos ejercicios de abajo son elaboración propia.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Para $z=f(x,y)=x^2+xy+2y^2$, halle el plano tangente y la recta normal en $(1,2)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$f(1,2)=1+2+8=11,\\qquad f_x=2x+y,\\ \\ f_y=x+4y$$'}),
        el('div',{class:'formula',html:'$$\\nabla F(1,2)=\\langle f_x(1,2),\\,f_y(1,2),\\,-1\\rangle=\\langle4,\\,9,\\,-1\\rangle$$'}),
        el('div',{class:'formula',html:'$$\\text{Plano: }4(x-1)+9(y-2)-(z-11)=0\\ \\Longrightarrow\\ z=4x+9y-11$$'}),
        el('p',{class:'note'},'Verificación: en $(1,2)$, $z=4(1)+9(2)-11=4+18-11=11$ ✓, igual al $f(1,2)$ de partida. Recta normal: $(1,2,11)+t\\langle4,9,-1\\rangle$.')));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Con $f(x,y)=xe^{y}$, use aproximación lineal en $(2,0)$ para estimar $f(2{,}1,\\ 0{,}05)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$f(2,0)=2,\\qquad f_x=e^y\\ \\Rightarrow\\ f_x(2,0)=1,\\qquad f_y=xe^y\\ \\Rightarrow\\ f_y(2,0)=2$$'}),
        el('div',{class:'formula',html:'$$L(x,y)=2+(x-2)+2y\\ \\Longrightarrow\\ L(2{,}1,\\ 0{,}05)=2+0{,}1+0{,}1=2{,}2$$'}),
        el('p',{class:'note'},'Verificación contra el valor real: $f(2{,}1,\\,0{,}05)=2{,}1\\,e^{0{,}05}\\approx2{,}1(1{,}05127)\\approx2{,}208$. Diferencia $\\approx0{,}008$ — más grande que en la card "Aproximación lineal", porque acá el punto se movió proporcionalmente más lejos del punto base.')));
    c5.append(ej2);

    c5.append(el('p',{class:'fuente'},'Fuente: ambos ejercicios, elaboración propia. Ejercicio 1 aplica el método de la card "Plano tangente y recta normal" con otra superficie; ejercicio 2 aplica la fórmula de L(x,y) de la card "Aproximación lineal y diferencial total".'));
    sec.append(c5);
  }});
