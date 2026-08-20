registerModule({id:'derivadas-parciales',title:'Derivadas parciales',unidad:'II',semanas:[4],
  evaluacion:['test-2','certamen-1'],
  lead:'Derivar una función de varias variables una variable a la vez — tratando el resto como constante — y con esa sola herramienta arrancan la regla de la cadena, el diferencial total y la derivación implícita.',
  build(sec){

    /* función compartida con mod-varias-variables.js, para la card 2 */
    const fPar=(x,y)=>x*x+y*y;

    /* -------- Card 1: derivada parcial -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Derivada parcial'));
    c1.append(el('p',{},'La derivada parcial mide cómo cambia $f$ respecto de ',el('b',{},'una sola variable'),', manteniendo la otra fija. Para $f(x,y)$:'));
    c1.append(el('div',{class:'formula',html:'$$f_x=\\dfrac{\\partial f}{\\partial x}=\\lim_{h\\to0}\\dfrac{f(x+h,y)-f(x,y)}{h}\\qquad f_y=\\dfrac{\\partial f}{\\partial y}=\\lim_{h\\to0}\\dfrac{f(x,y+h)-f(x,y)}{h}$$'}));
    c1.append(el('p',{},'En la práctica no hace falta volver a la definición de límite: para $f_x$ se deriva respecto de $x$ tratando $y$ como si fuera una constante, con las reglas usuales de una variable (y viceversa para $f_y$).'));
    c1.append(el('p',{},'Ejemplo: para $f(x,y)=x^2y^3+\\sin x$,'));
    c1.append(el('div',{class:'formula',html:'$$f_x=2xy^3+\\cos x\\qquad\\qquad f_y=3x^2y^2$$'}));
    c1.append(el('p',{class:'note'},'En $f_x$, $y^3$ se trató como una constante multiplicando $x^2$ (derivada $2x$) más $\\sin x$ derivado normal. En $f_y$, $x^2$ se trató como constante multiplicando $y^3$ (derivada $3y^2$); el término $\\sin x$ no depende de $y$, así que su derivada respecto de $y$ es 0 y desaparece.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte "Derivadas parciales" (repo de material de la generación 2024-2025, no es Canvas 2026-2 — Matías no cursa este ramo con este material; contenido auditado contra Stewart en index-v3.html). El ejemplo $f(x,y)=x^2y^3+\\sin x$ es elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: interpretación geométrica -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Interpretación geométrica'));
    c2.append(el('p',{},'Cortando la gráfica de $z=f(x,y)$ con el plano vertical $y=y_0$ queda una curva 2D (una sección de la superficie); $f_x(x_0,y_0)$ es la pendiente de esa curva en $x=x_0$. Mismo paraboloide $f(x,y)=x^2+y^2$ de la card "Interpretación geométrica en $\\mathbb R^3$" (tema "Funciones de varias variables"), cortado en $y=y_0$:'));
    let x0Der=1, y0Der=0.6;
    const espDer=Espacio(c2,{alto:440,escala:28});
    espDer.dibujar(E=>{
      E.ejes3({largo:2});
      E.superficie((u,v)=>[u,v,fPar(u,v)],{uMin:-1.8,uMax:1.8,vMin:-1.8,vMax:1.8,nu:14,nv:14,color:'--grid'});
      E.curva3(t=>[t,y0Der,fPar(t,y0Der)],-1.8,1.8,{color:'--s4',grosor:2.6});
      const z0=fPar(x0Der,y0Der), pend=2*x0Der;
      E.curva3(t=>[x0Der+t,y0Der,z0+pend*t],-0.3,0.3,{color:'--s2',grosor:3.2});
      E.punto3([x0Der,y0Der,z0],{color:'--s2',r:4});
    });
    const notaDer=el('p',{class:'note'});
    function actualizarDer(){
      const pend=2*x0Der;
      notaDer.textContent='y₀ = '+y0Der.toFixed(2)+', x₀ = '+x0Der.toFixed(2)+': la curva naranja es la sección z = x² + '+(y0Der*y0Der).toFixed(2)+' (una parábola en x, desplazada hacia arriba); la recta verde es su tangente en x₀, con pendiente f_x(x₀,y₀) = 2x₀ = '+pend.toFixed(2)+'.';
    }
    actualizarDer();
    c2.append(notaDer);
    c2.append(el('div',{class:'controls'},
      el('label',{},'x₀:'),
      el('input',{type:'range',min:'-1.5',max:'1.5',step:'0.1',value:String(x0Der),oninput:e=>{ x0Der=parseFloat(e.target.value); espDer.redibujar(); actualizarDer(); }}),
      el('label',{},'y₀ (mueve el plano de corte):'),
      el('input',{type:'range',min:'-1.5',max:'1.5',step:'0.1',value:String(y0Der),oninput:e=>{ y0Der=parseFloat(e.target.value); espDer.redibujar(); actualizarDer(); }})
    ));
    c2.append(el('p',{class:'note'},'Para este paraboloide, $f_x=2x$ no depende de $y$: mover $y_0$ desplaza la parábola de corte hacia arriba o abajo (porque cambia $f(x,y_0)=x^2+y_0^2$), pero no cambia su forma ni la pendiente en un $x_0$ dado — se puede verificar moviendo el slider de $y_0$ solo: la recta tangente mantiene el mismo ángulo. Simétricamente, $f_y=2y$ tampoco depende de $x$.'));
    c2.append(el('p',{class:'fuente'},'Fuente: elaboración propia (interpretación geométrica de la derivada parcial como pendiente de una sección, Stewart) — misma función $f(x,y)=x^2+y^2$ de mod-varias-variables.js.'));
    sec.append(c2);

    /* -------- Card 3: derivadas de orden superior y Clairaut -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Derivadas de orden superior y el teorema de Clairaut'));
    c3.append(el('p',{},'Derivando una segunda vez aparecen cuatro derivadas de orden 2 (dos "puras", dos "mixtas"):'));
    c3.append(el('div',{class:'formula',html:'$$f_{xx}=\\dfrac{\\partial^2f}{\\partial x^2},\\quad f_{yy}=\\dfrac{\\partial^2f}{\\partial y^2},\\quad f_{xy}=\\dfrac{\\partial}{\\partial y}\\Big(\\dfrac{\\partial f}{\\partial x}\\Big),\\quad f_{yx}=\\dfrac{\\partial}{\\partial x}\\Big(\\dfrac{\\partial f}{\\partial y}\\Big)$$'}));
    c3.append(el('p',{},el('b',{},'Teorema de Clairaut: '),'si $f_{xy}$ y $f_{yx}$ son ',el('i',{},'continuas'),', entonces son iguales. La notación $f_{xy}$ se lee de izquierda a derecha: "derivar primero respecto de $x$, luego esa derivada respecto de $y$" — orden inverso al que muchos asumen.'));
    Pasos(c3,[
      {tex:'f(x,y)=\\ln(x^2+y)',nota:'Función de ejemplo.'},
      {tex:'f_x=\\dfrac{2x}{x^2+y}\\qquad f_y=\\dfrac1{x^2+y}',nota:'Derivando ln(u) con u=x²+y: la derivada de u respecto de x es 2x, respecto de y es 1.'},
      {tex:'f_{xx}=\\dfrac{2(x^2+y)-2x(2x)}{(x^2+y)^2}=\\dfrac{-2x^2+2y}{(x^2+y)^2}',nota:'Regla del cociente sobre f_x, derivando otra vez respecto de x.'},
      {tex:'f_{xy}=\\dfrac{\\partial}{\\partial y}\\big[2x(x^2+y)^{-1}\\big]=-\\dfrac{2x}{(x^2+y)^2}',nota:'f_x otra vez, ahora respecto de y (2x es constante respecto de y).'},
      {tex:'f_{yx}=\\dfrac{\\partial}{\\partial x}\\big[(x^2+y)^{-1}\\big]=-\\dfrac{2x}{(x^2+y)^2}',nota:'f_y respecto de x: coincide con f_xy — se verifica Clairaut, porque ambas son continuas donde x²+y≠0.'}
    ],{modId:'derivadas-parciales',titulo:'f(x,y)=ln(x²+y): las cuatro derivadas de segundo orden'});
    c3.append(el('div',{class:'card',style:'background:color-mix(in srgb, var(--s8) 8%, var(--surface)); border-left:3px solid var(--s8)'},
      el('p',{},el('b',{},'Un contraejemplo cuando falla la continuidad: '),'para $f(x,y)=\\dfrac{xy(x^2-y^2)}{x^2+y^2}$ (con $f(0,0)=0$), un cálculo directo con la definición de límite da $f_x(0,y)=-y$ y $f_y(x,0)=x$ para todo punto sobre los ejes, de donde $f_{xy}(0,0)=-1$ pero $f_{yx}(0,0)=1$: ',el('i',{},'no'),' coinciden, porque en $(0,0)$ las derivadas mixtas de $f$ no son continuas.')));
    c3.append(el('p',{class:'fuente'},'Fuente principal: index-v3.html (contenido auditado), tema "Derivadas parciales" y ejemplo 7 ("Parciales mixtas y verificación de Clairaut"), coincide con el apunte "Derivadas parciales" (repo generación anterior 2024-2025) — no es Canvas 2026-2. El contraejemplo de discontinuidad de las mixtas es elaboración propia (ejemplo clásico de la literatura de cálculo, verificado a mano derivando f_x(0,y) y f_y(x,0) por definición de límite).'));
    sec.append(c3);

    /* -------- Card 4: diferencial y diferencial total -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Diferencial y diferencial total'));
    c4.append(el('p',{},'Cerca de un punto conocido, $f$ se puede aproximar por su plano tangente sin evaluar $f$ en el punto desplazado:'));
    c4.append(el('div',{class:'formula',html:'$$L(x,y)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$$'}));
    c4.append(el('div',{class:'formula',html:'$$dz=f_x(a,b)\\,dx+f_y(a,b)\\,dy\\qquad(dx=\\Delta x,\\ dy=\\Delta y)$$'}));
    c4.append(el('p',{},'$dz$ estima el cambio real $\\Delta z=f(a+dx,b+dy)-f(a,b)$ — útil para propagar errores de medición: si $dx,dy$ son errores en dos variables medidas, $dz$ estima el error resultante en $f$. Ejemplo: ley de gases ideales $P=8{,}31\\,nT/V$, con $n=4$ mol, $T=200$ K, $V=10$ L; si $dn=-1$ mol y $dV=0{,}5$ L (con $T$ fijo), estimar $dP$:'));
    Pasos(c4,[
      {tex:'\\dfrac{\\partial P}{\\partial n}=\\dfrac{8{,}31\\,T}{V}\\qquad \\dfrac{\\partial P}{\\partial V}=-\\dfrac{8{,}31\\,nT}{V^2}',nota:'Parciales de P respecto de n y de V, con T tratada como constante en ambas.'},
      {tex:'\\dfrac{\\partial P}{\\partial n}=\\dfrac{8{,}31(200)}{10}=166{,}2',nota:'Se sustituyen T=200, V=10.'},
      {tex:'\\dfrac{\\partial P}{\\partial V}=-\\dfrac{8{,}31(4)(200)}{10^2}=-66{,}48',nota:'Se sustituyen n=4, T=200, V=10 (con el cuadrado en el denominador).'},
      {tex:'dP=166{,}2(-1)+(-66{,}48)(0{,}5)=-166{,}2-33{,}24=-199{,}44',nota:'dP = (∂P/∂n)dn + (∂P/∂V)dV, con dn=-1 y dV=0,5.'}
    ],{modId:'derivadas-parciales',titulo:'Propagación de error en P=8,31nT/V'});
    c4.append(el('p',{class:'note'},el('b',{},'Verificación (dos agrupaciones distintas): '),'calculando cada término por separado y sumando al final: $166{,}2\\times(-1)=-166{,}2$, $-66{,}48\\times0{,}5=-33{,}24$, suma $-199{,}44$. Agrupando distinto —factorizando el signo negativo común antes de sumar—: $-(166{,}2+33{,}24)=-199{,}44$, mismo resultado. La presión estimada baja porque bajar $n$ (menos moles) y subir $V$ (más volumen) empujan la presión en la misma dirección.'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), ejercicio 10 ("propagación de error" con la ley de gases ideales), Unidad 4 — coincide en la fórmula con el apunte "Diferenciales y aproximación lineal" (repo generación anterior 2024-2025), aunque ese apunte trae otros valores numéricos; no es Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: regla de la cadena -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Regla de la cadena'));
    c5.append(el('p',{},'Cuando una variable depende de otras que a su vez dependen de terceras, la derivada total se obtiene sumando ',el('b',{},'todos los caminos'),' de un diagrama de árbol: cada camino aporta el producto de las derivadas a lo largo de él, y "olvidar" un camino es el error más frecuente. Dos casos, según cuántas variables "externas" haya al final del árbol:'));

    c5.append(el('p',{},el('b',{},'Caso 1 — una variable externa. '),'Si $V=f(r,h)$ con $r=r(t)$, $h=h(t)$ (ambas dependen del mismo parámetro $t$):'));
    c5.append(el('div',{class:'formula',html:'$$\\dfrac{dV}{dt}=\\dfrac{\\partial V}{\\partial r}\\dfrac{dr}{dt}+\\dfrac{\\partial V}{\\partial h}\\dfrac{dh}{dt}$$'}));
    const arbol1=Arbol(c5,{alto:200,nodos:[
      {id:'V',texto:'V(r,h)',fila:0,col:1},
      {id:'r',texto:'r(t)',fila:1,col:0},
      {id:'h',texto:'h(t)',fila:1,col:2},
      {id:'t1',texto:'t',fila:2,col:0},
      {id:'t2',texto:'t',fila:2,col:2}
    ],aristas:[['V','r'],['V','h'],['r','t1'],['h','t2']]});
    c5.append(el('p',{},'Ejemplo — razón de cambio relacionada: un cilindro con $r(t)=e^t$, $h(t)=e^{-t}$ y $V=\\pi r^2h$. En $t=1$: $r=e$, $h=e^{-1}$, $dr/dt=e$, $dh/dt=-e^{-1}$, y $\\partial V/\\partial r=2\\pi rh$, $\\partial V/\\partial h=\\pi r^2$:'));
    const acum1=el('p',{class:'note'});
    function reset1(){ arbol1.limpiarMarcas(); acum1.innerHTML='Presioná ▶ Siguiente para sumar los dos términos, rama por rama.'; }
    const pasos1=[
      {d:'Camino V→r→t: (∂V/∂r)(dr/dt) = 2π(e)(e⁻¹)(e) = 2πe ≈ 17,08',run:async()=>{ arbol1.resaltar(['V','r','t1']); acum1.innerHTML='Camino V→r→t: (∂V/∂r)(dr/dt) = 2π·e·e⁻¹·e = <b>2πe ≈ 17,08</b>.'; }},
      {d:'Camino V→h→t: (∂V/∂h)(dh/dt) = π(e²)(-e⁻¹) = -πe ≈ -8,54 → acumulado πe ≈ 8,54',run:async()=>{ arbol1.resaltar(['V','h','t2']); acum1.innerHTML='Camino V→h→t: (∂V/∂h)(dh/dt) = π·e²·(-e⁻¹) = <b>-πe ≈ -8,54</b>. Acumulado: 2πe + (-πe) = <b>πe ≈ 8,54</b>.'; }}
    ];
    new Stepper(c5,pasos1,reset1,'derivadas-parciales');
    reset1();
    c5.append(acum1);

    c5.append(el('p',{},el('b',{},'Caso 2 — dos variables externas. '),'Si $z=f(x,y)$ con $x=x(r,\\theta)$, $y=y(r,\\theta)$ (coordenadas polares), cada variable externa ($r$ y $\\theta$) tiene su propia derivada total, y cada una suma los dos caminos que le llegan:'));
    c5.append(el('div',{class:'formula',html:'$$\\dfrac{\\partial z}{\\partial r}=\\dfrac{\\partial z}{\\partial x}\\dfrac{\\partial x}{\\partial r}+\\dfrac{\\partial z}{\\partial y}\\dfrac{\\partial y}{\\partial r}$$'}));
    const arbol2=Arbol(c5,{alto:230,nodos:[
      {id:'z',texto:'z(x,y)',fila:0,col:1.5},
      {id:'x',texto:'x(r,θ)',fila:1,col:0.5},
      {id:'y',texto:'y(r,θ)',fila:1,col:2.5},
      {id:'r1',texto:'r',fila:2,col:0},
      {id:'th1',texto:'θ',fila:2,col:1},
      {id:'r2',texto:'r',fila:2,col:2},
      {id:'th2',texto:'θ',fila:2,col:3}
    ],aristas:[['z','x'],['z','y'],['x','r1'],['x','th1'],['y','r2'],['y','th2']]});
    const acum2=el('p',{class:'note'});
    function reset2(){ arbol2.limpiarMarcas(); acum2.innerHTML='Presioná ▶ Siguiente para recorrer primero los caminos hacia r, después hacia θ.'; }
    const pasos2=[
      {d:'Camino z→x→r: aporta (∂z/∂x)(∂x/∂r)',run:async()=>{ arbol2.resaltar(['z','x','r1']); acum2.innerHTML='Camino z→x→r: aporta <b>(∂z/∂x)(∂x/∂r)</b>.'; }},
      {d:'Camino z→y→r: aporta (∂z/∂y)(∂y/∂r) → ∂z/∂r = suma de los dos',run:async()=>{ arbol2.resaltar(['z','y','r2']); acum2.innerHTML='Camino z→y→r: aporta <b>(∂z/∂y)(∂y/∂r)</b>. Sumando ambos: <b>∂z/∂r = (∂z/∂x)(∂x/∂r) + (∂z/∂y)(∂y/∂r)</b>.'; }},
      {d:'Ahora la otra variable externa, θ. Camino z→x→θ: aporta (∂z/∂x)(∂x/∂θ)',run:async()=>{ arbol2.resaltar(['z','x','th1']); acum2.innerHTML='Ahora θ. Camino z→x→θ: aporta <b>(∂z/∂x)(∂x/∂θ)</b>.'; }},
      {d:'Camino z→y→θ: aporta (∂z/∂y)(∂y/∂θ) → ∂z/∂θ = suma de los dos',run:async()=>{ arbol2.resaltar(['z','y','th2']); acum2.innerHTML='Camino z→y→θ: aporta <b>(∂z/∂y)(∂y/∂θ)</b>. Sumando: <b>∂z/∂θ = (∂z/∂x)(∂x/∂θ) + (∂z/∂y)(∂y/∂θ)</b>.'; }}
    ];
    new Stepper(c5,pasos2,reset2,'derivadas-parciales');
    reset2();
    c5.append(acum2);
    c5.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Regla de la cadena multivariable" — el caso de dos variables externas ($r,\\theta$) y el ejemplo del cilindro coinciden con el apunte "Regla de la cadena multivariable" (repo generación anterior 2024-2025) y con el ejercicio 9 de index-v3.html; no es Canvas 2026-2.'));
    sec.append(c5);

    /* -------- Card 6: derivación implícita -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Derivación implícita'));
    c6.append(el('p',{},'Cuando $F(x,y)=0$ define $y$ como función de $x$ (aunque no se pueda despejar a mano), se puede hallar $dy/dx$ aplicando la regla de la cadena de la card "Regla de la cadena" directamente sobre $F$, sin despejar $y$ nunca:'));
    Pasos(c6,[
      {tex:'F(x,y(x))=0\\quad\\text{para todo }x\\text{ en el dominio}',nota:'Punto de partida: la ecuación vale idénticamente, con y visto como función de x.'},
      {tex:'\\dfrac{d}{dx}\\big[F(x,y(x))\\big]=0',nota:'Se deriva ambos lados respecto de x (el lado derecho, 0, tiene derivada 0).'},
      {tex:'F_x\\cdot1+F_y\\cdot\\dfrac{dy}{dx}=0',nota:'Regla de la cadena: x se deriva respecto de sí misma (da 1); y depende de x, así que aporta F_y·(dy/dx).'},
      {tex:'\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}\\qquad(F_y\\ne0)',nota:'Se despeja dy/dx — la misma condición F_y≠0 del teorema de la función implícita de la semana pasada.'}
    ],{modId:'derivadas-parciales',titulo:'Derivación implícita, deducida de la regla de la cadena'});
    c6.append(el('p',{},'Ejemplo: en la circunferencia $x^2+y^2=25$, hallar $dy/dx$ en el punto $(3,4)$.'));
    c6.append(el('div',{class:'formula',html:'$$F=x^2+y^2-25\\ \\Rightarrow\\ F_x=2x,\\ F_y=2y\\ \\Rightarrow\\ \\dfrac{dy}{dx}=-\\dfrac{2x}{2y}=-\\dfrac xy$$'}));
    c6.append(el('div',{class:'formula',html:'$$\\text{en }(3,4):\\quad \\dfrac{dy}{dx}=-\\dfrac34$$'}));
    c6.append(el('p',{class:'note'},el('b',{},'Verificación (dos caminos): '),'despejando explícitamente $y=\\sqrt{25-x^2}$ (rama superior, válida en $(3,4)$ porque $y=4\\gt0$) y derivando directo: $dy/dx=-x/\\sqrt{25-x^2}=-x/y$, que en $(3,4)$ da $-3/4$ — mismo resultado que con la fórmula implícita, sin necesidad de despejar $y$ para llegar ahí.'));
    c6.append(el('p',{class:'fuente'},'Fuente: elaboración propia (derivación implícita como aplicación directa de la regla de la cadena de la card "Regla de la cadena" a $F(x,y)=0$, Stewart) — no hay Guía ni Control de Canvas 2026-2 que cubra esta unidad; el ejemplo de la circunferencia es estándar.'));
    sec.append(c6);

    /* -------- Card 7: ejercicios -------- */
    const c7=el('div',{class:'card'});
    c7.append(el('h3',{},'Ejercicios'));
    c7.append(el('p',{class:'note'},'El Listado 1 de Canvas 2026-2 no trae ítems de esta unidad. Los ejercicios 1 y 2 reutilizan contenido ya auditado de index-v3.html; los ejercicios 3 y 4 remiten a cuentas ya resueltas arriba; el 5 es elaboración propia.'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Para $f(x,y)=x^3y^2-2xy$, halle $f_x$, $f_y$, $f_{xy}$ y $f_{yx}$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$f_x=3x^2y^2-2y,\\qquad f_y=2x^3y-2x$$'}),
        el('div',{class:'formula',html:'$$f_{xy}=\\dfrac{\\partial}{\\partial y}(3x^2y^2-2y)=6x^2y-2$$'}),
        el('div',{class:'formula',html:'$$f_{yx}=\\dfrac{\\partial}{\\partial x}(2x^3y-2x)=6x^2y-2\\quad\\checkmark\\text{ coinciden (Clairaut)}$$'})));
    c7.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Si $w=f(u,v)$ con $u=x+y$, $v=x-y$, demuestre que $w_x\\cdot w_y=(w_u)^2-(w_v)^2$.'),
      el('div',{},
        el('p',{},'Árbol: $w\\to u,v$; $u_x=1,u_y=1$; $v_x=1,v_y=-1$.'),
        el('div',{class:'formula',html:'$$w_x=w_uu_x+w_vv_x=w_u+w_v\\qquad w_y=w_uu_y+w_vv_y=w_u-w_v$$'}),
        el('div',{class:'formula',html:'$$w_x\\cdot w_y=(w_u+w_v)(w_u-w_v)=w_u^2-w_v^2\\qquad\\blacksquare$$'}),
        el('p',{class:'note'},'Diferencia de cuadrados: no hace falta conocer $f$ explícitamente, la identidad sale solo de la estructura del árbol.')));
    c7.append(ej2);

    const ej3=el('details',{},
      el('summary',{},'Ejercicio 3 — Cilindro $r(t)=e^t$, $h(t)=e^{-t}$: $dV/dt$ en $t=1$.'),
      el('div',{},el('p',{},'Ya resuelto arriba, en la card "Regla de la cadena" (Caso 1): $dV/dt|_{t=1}=\\pi e\\approx8{,}54$.')));
    c7.append(ej3);

    const ej4=el('details',{},
      el('summary',{},'Ejercicio 4 — Ley de gases $P=8{,}31nT/V$: estimar $dP$ con $n=4$, $T=200$, $V=10$, $dn=-1$, $dV=0{,}5$.'),
      el('div',{},el('p',{},'Ya resuelto arriba, en la card "Diferencial y diferencial total": $dP\\approx-199{,}44$.')));
    c7.append(ej4);

    const ej5=el('details',{},
      el('summary',{},'Ejercicio 5 — Derivación implícita: para $x^3+y^3=6xy$ (folium de Descartes), halle $dy/dx$ en el punto $(3,3)$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$F=x^3+y^3-6xy\\ \\Rightarrow\\ F_x=3x^2-6y,\\ \\ F_y=3y^2-6x$$'}),
        el('div',{class:'formula',html:'$$\\text{en }(3,3):\\ F_x=27-18=9,\\quad F_y=27-18=9$$'}),
        el('div',{class:'formula',html:'$$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}=-\\dfrac99=-1$$'}),
        el('p',{class:'note'},'Verificación con la forma factorizada $dy/dx=-\\dfrac{x^2-2y}{y^2-2x}$: en $(3,3)$ da $-\\dfrac{9-6}{9-6}=-\\dfrac33=-1$ — mismo resultado por el otro camino.')));
    c7.append(ej5);

    c7.append(el('p',{class:'fuente'},'Fuente: ejercicios 1 y 2, index-v3.html (contenido auditado), Unidad 4. Ejercicios 3 y 4: mismas cuentas de las cards "Regla de la cadena" y "Diferencial y diferencial total" de este módulo. Ejercicio 5: elaboración propia (folium de Descartes, ejemplo estándar de derivación implícita).'));
    sec.append(c7);
  }});
