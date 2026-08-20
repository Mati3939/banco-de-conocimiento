/* contenidoOficial original (índice a cubrir):
   - Aplicaciones: vibraciones (libres, amortiguadas, forzadas) */
registerModule({id:'vibraciones',title:'Vibraciones: libres, amortiguadas y forzadas',unidad:'II',semanas:[10],evaluacion:['taller-1','certamen-2'],
  lead:'El sistema masa-resorte-amortiguador es la EDO lineal de segundo orden con coeficientes constantes de siempre, pero cruzar el amortiguamiento crítico cambia cualitativamente la solución: de oscilante a no oscilante.',
  build(sec){

    /* -------- Card 1: el modelo -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'El modelo masa-resorte-amortiguador'));
    c1.append(el('p',{},'Un bloque de masa $m$ colgado de un resorte de constante $k$ (ley de Hooke), con amortiguamiento $c$ (proporcional a la velocidad, opuesto al movimiento) y una fuerza externa $F(t)$, se modela con la segunda ley de Newton — $y(t)$ el desplazamiento respecto al equilibrio estático:'));
    c1.append(el('div',{class:'formula',html:'$$m\\ddot y = -ky-c\\dot y+F(t) \\ \\Longrightarrow\\ m\\ddot y+c\\dot y+ky=F(t)$$'}));
    c1.append(el('p',{},'Es la misma EDO lineal de segundo orden de coeficientes constantes de siempre. Su ecuación característica $m\\lambda^2+c\\lambda+k=0$ tiene discriminante $c^2-4mk$, que clasifica el comportamiento ',el('b',{},'libre'),' ($F=0$) en tres regímenes:'));
    c1.append(el('ul',{},
      el('li',{},'Sin amortiguamiento ($c=0$): raíces complejas puras $\\lambda=\\pm i\\sqrt{k/m}$ — movimiento armónico simple, oscila indefinidamente sin decaer.'),
      el('li',{},el('b',{},'Subamortiguado'),' ($c^2\\lt4mk$): raíces complejas $\\lambda=\\alpha\\pm\\beta i$ con $\\alpha\\lt0$ — oscila mientras decae.'),
      el('li',{},el('b',{},'Críticamente amortiguado'),' ($c^2=4mk$): raíz real doble — vuelve al equilibrio lo más rápido posible sin oscilar.'),
      el('li',{},el('b',{},'Sobreamortiguado'),' ($c^2\\gt4mk$): raíces reales distintas, ambas negativas — vuelve al equilibrio más lento que el caso crítico, sin oscilar.'),
      el('li',{},'El primer paso (plantear la ecuación desde el diagrama de cuerpo libre con las tres fuerzas $ky$, $c\\dot y$, $F(t)$) es donde más se pierden puntos, no la resolución algebraica posterior.')
    ));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "El modelo masa-resorte-amortiguador"; nota "Aplicaciones de EDO de segundo orden - sistema masa-resorte" del vault.'));
    sec.append(c1);

    /* -------- Card 2: ejemplo numérico de los tres regímenes -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Los tres regímenes, con los mismos $m,k$'));
    c2.append(el('p',{},'Para $m=1\\text{ kg}$, $k=25\\text{ N/m}$ (sistema libre, $F=0$), $y(0)=0{,}4\\text{ m}$, $\\dot y(0)=0$, comparar la respuesta con $c=6$, $c=10$ y $c=16$ (valores de $c$ elegidos para ilustrar los tres regímenes; la nota original solo describe la clasificación, sin fijarlos).'));
    Pasos(c2,[
      {tex:'c_{\\text{crít}}^2=4mk=4(1)(25)=100 \\ \\Longrightarrow\\ c_{\\text{crít}}=10',nota:'Umbral que separa los tres regímenes para este resorte particular.'},
      {tex:'c=6\\ (c^2=36\\lt100):\\quad \\lambda=\\dfrac{-6\\pm\\sqrt{36-100}}{2}=-3\\pm4i',nota:'Subamortiguado: discriminante negativo, raíces complejas.'},
      {tex:'y(t)=e^{-3t}\\big(0{,}4\\cos4t+0{,}3\\sin4t\\big)',nota:'Con y(0)=0,4, ẏ(0)=0: c₁=0,4 y c₂=−αc₁/β=3(0,4)/4=0,3 (α=−3,β=4).'},
      {tex:'c=10\\ (c^2=100):\\quad \\lambda=-5\\ (\\text{doble}) \\ \\Longrightarrow\\ y(t)=(0{,}4+2t)e^{-5t}',nota:'Crítico: raíz real doble; c₂=−λc₁=5(0,4)=2.'},
      {tex:'c=16\\ (c^2=256\\gt100)',nota:'Sobreamortiguado: discriminante positivo.'},
      {tex:'\\lambda=\\dfrac{-16\\pm\\sqrt{256-100}}{2}\\approx-1{,}75,\\,-14{,}25',nota:'Raíces reales distintas.'},
      {tex:'y(t)\\approx0{,}456\\,e^{-1{,}75t}-0{,}056\\,e^{-14{,}25t}',nota:'Resolviendo y(0)=c₁+c₂=0,4, ẏ(0)=λ₁c₁+λ₂c₂=0 para las dos constantes.'}
    ],{modId:'vibraciones',titulo:'Los tres regímenes con m=1, k=25'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación del caso crítico: '),'con $y=(0{,}4+2t)e^{-5t}$: $y\'=-10te^{-5t}$ (los términos $2e^{-5t}$ y $-2e^{-5t}$ se cancelan), $y\'\'=(-10+50t)e^{-5t}$. Sustituyendo en $\\ddot y+10\\dot y+25y=0$: $(-10+50t)+10(-10t)+25(0{,}4+2t)=(-10+10)+(50t-100t+50t)=0$ ✓. Los tres parten de $y(0)=0{,}4$ con velocidad 0, pero solo el subamortiguado cruza $y=0$ más de una vez; el crítico es el que vuelve más rápido a $y\\approx0$ sin cruzarlo.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejemplo 12 "Los tres regímenes con los mismos m,k"; nota "Aplicaciones de EDO de segundo orden - sistema masa-resorte" del vault. La verificación por sustitución directa (caso crítico) es elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: gráfico interactivo -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Cruzar el amortiguamiento crítico'));
    c3.append(el('p',{},'Mismo sistema de la card "Los tres regímenes, con los mismos $m,k$" ($m=1\\text{ kg}$, $k=25\\text{ N/m}$, $y(0)=0{,}4\\text{ m}$, $\\dot y(0)=0$), con $c$ como deslizador: la curva pasa de oscilante a no oscilante exactamente en $c=10$.'));
    const mV=1,kV=25,y0V=0.4;
    let cAmort=6;
    function calcAmort(c){
      const disc=c*c-4*mV*kV;
      if(disc<-1e-9){
        const alpha=-c/(2*mV), beta=Math.sqrt(-disc)/(2*mV);
        const c2v=-alpha*y0V/beta;
        return {y:t=>Math.exp(alpha*t)*(y0V*Math.cos(beta*t)+c2v*Math.sin(beta*t)),
          texto:'subamortiguado — oscila mientras decae. λ = '+alpha.toFixed(2)+' ± '+beta.toFixed(2)+'i.'};
      } else if(disc<1e-9){
        const lam=-c/(2*mV);
        const c2v=-lam*y0V;
        return {y:t=>(y0V+c2v*t)*Math.exp(lam*t),
          texto:'crítico — vuelve al equilibrio lo más rápido posible, sin oscilar. λ = '+lam.toFixed(2)+' (doble).'};
      } else {
        const sq=Math.sqrt(disc);
        const l1=(-c+sq)/(2*mV), l2=(-c-sq)/(2*mV);
        const c1v=-l2*y0V/(l1-l2), c2v=l1*y0V/(l1-l2);
        return {y:t=>c1v*Math.exp(l1*t)+c2v*Math.exp(l2*t),
          texto:'sobreamortiguado — vuelve al equilibrio sin oscilar, más lento que el crítico. λ₁ = '+l1.toFixed(2)+', λ₂ = '+l2.toFixed(2)+'.'};
      }
    }
    const planoAmort=Plano(c3,{xMin:0,xMax:3,yMin:-0.5,yMax:0.5,alto:320});
    planoAmort.dibujar(P=>{
      P.ejes();
      P.curva(calcAmort(cAmort).y,{color:'--s1',grosor:2.5});
      P.punto(0,y0V,{color:'--s4',etiqueta:'y(0)=0,4'});
    });
    const notaAmort=el('p',{class:'note'});
    function actualizarNotaAmort(){
      notaAmort.textContent='c = '+cAmort.toFixed(1)+' (c_crít = 10): '+calcAmort(cAmort).texto;
    }
    actualizarNotaAmort();
    c3.append(notaAmort);
    c3.append(el('div',{class:'controls'},
      el('label',{},'amortiguamiento c:'),
      el('input',{type:'range',min:'0',max:'20',step:'0.2',value:String(cAmort),oninput:e=>{
        cAmort=parseFloat(e.target.value); planoAmort.redibujar(); actualizarNotaAmort();
      }})
    ));
    c3.append(el('p',{class:'note'},'A la izquierda del deslizador ($c\\lt10$) la curva cruza el eje $y=0$ una o más veces antes de decaer; a la derecha ($c\\gt10$), nunca lo cruza. En $c=10$ exacto (el punto medio del recorrido) está la frontera: decae lo más rápido posible sin llegar a cruzarlo.'));
    c3.append(el('p',{class:'fuente'},'Fuente: elaboración propia (implementación interactiva); mismos valores $m=1\\text{ kg}$, $k=25\\text{ N/m}$, $y_0=0{,}4\\text{ m}$ de la animación "Masa-resorte amortiguado" de index-v3.html (contenido auditado) y de la card "Los tres regímenes, con los mismos m,k". Las tres fórmulas de y(t) (por régimen) están verificadas a mano en esa card.'));
    sec.append(c3);

    /* -------- Card 4: vibraciones forzadas y resonancia -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Vibraciones forzadas y resonancia'));
    c4.append(el('p',{},'Caso ',el('b',{},'sin amortiguamiento'),' ($c=0$) forzado por $F(t)=F_0\\cos(\\gamma t)$: $m\\ddot y+ky=F_0\\cos(\\gamma t)$, con $\\omega=\\sqrt{k/m}$ la frecuencia natural. Por el tema Reducción de orden y coeficientes indeterminados, si $\\gamma\\neq\\omega$ se propone $y_p=A\\cos(\\gamma t)$ directamente (no hace falta término en seno: no hay $\\dot y$ en la ecuación):'));
    c4.append(el('div',{class:'formula',html:'$$A(k-m\\gamma^2)=F_0 \\ \\Longrightarrow\\ y_p=\\dfrac{F_0}{m(\\omega^2-\\gamma^2)}\\cos(\\gamma t)$$'}));
    c4.append(el('p',{},'Pero si $\\gamma=\\omega$ (la frecuencia de forzamiento coincide con la natural), $\\cos(\\omega t)$ ya está en $y_h=c_1\\cos\\omega t+c_2\\sin\\omega t$: por la regla de modificación, hay que multiplicar por $t$. Es el caso de ',el('b',{},'resonancia'),':'));
    Pasos(c4,[
      {tex:'y_p=t(A\\cos\\omega t+B\\sin\\omega t)',nota:'Propuesta modificada (×t), porque cos ωt y sin ωt ya están en yₕ.'},
      {tex:'y_p\'=(A\\cos\\omega t+B\\sin\\omega t)+t(-A\\omega\\sin\\omega t+B\\omega\\cos\\omega t)',nota:'Regla del producto.'},
      {tex:'y_p\'\'=2(-A\\omega\\sin\\omega t+B\\omega\\cos\\omega t)-\\omega^2t(A\\cos\\omega t+B\\sin\\omega t)',nota:'Derivando otra vez.'},
      {tex:'m\\ddot y_p+ky_p = m\\cdot2(-A\\omega\\sin\\omega t+B\\omega\\cos\\omega t)',nota:'Como k=mω², el término con t se cancela exacto entre −mω²t(…) y kt(…).'},
      {tex:'-2mA\\omega=0,\\quad 2mB\\omega=F_0 \\ \\Longrightarrow\\ A=0,\\ \\ B=\\dfrac{F_0}{2m\\omega}',nota:'Igualando con F₀cos(ωt): el lado derecho no tiene término en sin ωt.'},
      {tex:'y_p=\\dfrac{F_0}{2m\\omega}\\,t\\sin(\\omega t)',nota:'La amplitud crece sin límite con t — resonancia: la fuerza empuja siempre en fase con el movimiento.'}
    ],{modId:'vibraciones',titulo:'Resonancia: γ=ω'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación: '),'con $y_p=Bt\\sin\\omega t$, $B=F_0/(2m\\omega)$: $y_p\'=B\\sin\\omega t+B\\omega t\\cos\\omega t$, $y_p\'\'=2B\\omega\\cos\\omega t-B\\omega^2t\\sin\\omega t$. Sustituyendo, $m\\ddot y_p+ky_p=2mB\\omega\\cos\\omega t+t\\sin\\omega t\\,(-mB\\omega^2+kB)=2mB\\omega\\cos\\omega t$ (el término en $t\\sin\\omega t$ se anula porque $k=m\\omega^2$), y $2mB\\omega=2m\\cdot\\dfrac{F_0}{2m\\omega}\\cdot\\omega=F_0$ ✓ — exactamente $F_0\\cos(\\omega t)$.'));
    c4.append(el('p',{class:'note'},'Numéricamente, con $m=1\\text{ kg}$, $k=25\\text{ N/m}$ ($\\omega=5$ rad/s, mismo resorte de las cards anteriores) y $F_0=10\\text{ N}$: fuera de resonancia con $\\gamma=3$, $A=10/(1\\cdot(25-9))=0{,}625$; en resonancia ($\\gamma=5$), $B=10/(2\\cdot1\\cdot5)=1$ y $y_p=t\\sin(5t)$, cuya envolvente $\\pm t$ crece sin cota — el amortiguamiento ($c\\gt0$) de las cards anteriores es justo lo que evita este crecimiento indefinido en un sistema real.'));
    c4.append(el('p',{class:'fuente'},'Fuente: desarrollo estándar de la materia (Campbell, Zill) para vibraciones forzadas sin amortiguamiento y resonancia — no hay cobertura de este caso en index-v3.html, en las notas del vault, ni en material de Canvas 2026-2 para esta unidad. El método de coeficientes indeterminados aplicado (incluida la regla de modificación) es el del tema Reducción de orden y coeficientes indeterminados; la verificación por sustitución es elaboración propia.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios'));

    c5.append(el('details',{},
      el('summary',{},'Un bloque de $m=0{,}5\\text{ kg}$ en un resorte de $k=8\\text{ N/m}$ (sin amortiguamiento) se suelta desde $y_0=0{,}1\\text{ m}$ con velocidad 0. Hallar $y(t)$ y el período de oscilación.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\omega=\\sqrt{k/m}=\\sqrt{8/0{,}5}=\\sqrt{16}=4\\text{ rad/s}$$'}),
        el('div',{class:'formula',html:'$$y(t)=y_0\\cos(\\omega t)=0{,}1\\cos(4t)\\text{ m}$$'}),
        el('div',{class:'formula',html:'$$T=\\dfrac{2\\pi}{\\omega}=\\dfrac{2\\pi}{4}=\\dfrac{\\pi}{2}\\approx1{,}57\\text{ s}$$'}),
        el('p',{class:'note'},'Sin amortiguamiento y velocidad inicial 0, el término en seno se anula ($c_2=\\dot y(0)/\\omega=0$): queda un coseno puro con amplitud igual al desplazamiento inicial.'))));

    c5.append(el('details',{},
      el('summary',{},'Un sistema con $m=2\\text{ kg}$, $k=8\\text{ N/m}$, sin amortiguamiento, se fuerza con $F(t)=6\\cos(2t)\\text{ N}$. Sin resolver todavía, decidir si el sistema entra en resonancia, y si es así, hallar $y_p(t)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\omega=\\sqrt{k/m}=\\sqrt{8/2}=2\\text{ rad/s} = \\gamma \\ \\Longrightarrow\\ \\text{resonancia}$$'}),
        el('div',{class:'formula',html:'$$y_p=\\dfrac{F_0}{2m\\omega}\\,t\\sin(\\omega t)=\\dfrac{6}{2(2)(2)}\\,t\\sin(2t)=\\dfrac34\\,t\\sin(2t)$$'}),
        el('p',{class:'note'},'La frecuencia de forzamiento $\\gamma=2$ coincide con la natural $\\omega=2$: es justo el caso resonante de la card "Vibraciones forzadas y resonancia", con $F_0=6$, $m=2$, $\\omega=2$.'))));

    c5.append(el('p',{class:'fuente'},'Fuente: primer ejercicio, index-v3.html (contenido auditado), ejercicio 13 de la Unidad 2 (mismo enunciado). Segundo ejercicio: elaboración propia, aplicando la fórmula de resonancia de la card "Vibraciones forzadas y resonancia" con otros valores.'));
    sec.append(c5);
  }});
