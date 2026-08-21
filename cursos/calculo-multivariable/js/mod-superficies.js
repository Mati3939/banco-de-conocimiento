/* contenidoOficial original (índice a cubrir):
   - Superficies paramétricas y cálculo de áreas
   - Elementos de cálculo vectorial, gradiente, divergencia y rotacional */
registerModule({id:'superficies',title:'Superficies paramétricas, gradiente, divergencia y rotacional',unidad:'IV',semanas:[15],
  evaluacion:['test-5'],
  lead:'Parametrizar una superficie para calcular su área, y las tres derivadas que resumen cómo se comporta un campo vectorial.',
  build(sec){
    const movil=window.innerWidth<700; /* mismo criterio que mod-gradiente.js, mod-extremos.js y
      mod-integrales-triples.js: la escala de un Espacio es fija, así que hay que elegirla según
      el ancho real del lienzo en el momento de construir el módulo — angosto en el teléfono
      (~344px), amplio en escritorio (~1057px). */

    /* -------- Card 1: superficies paramétricas y su vector normal -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Superficies paramétricas y su vector normal'));
    c1.append(el('p',{},'Así como una curva se parametriza con $\\mathbf r(t)$, una ',el('b',{},'superficie'),' se parametriza con dos parámetros, $\\mathbf r(u,v)=\\langle x(u,v),y(u,v),z(u,v)\\rangle$. En cada punto, las derivadas parciales $\\mathbf r_u$ y $\\mathbf r_v$ son tangentes a la superficie (una recorre cada dirección de la "grilla" $u,v$); su producto cruz da un vector ',el('b',{},'normal'),':'));
    c1.append(el('div',{class:'formula',html:'$$\\mathbf r_u\\times\\mathbf r_v\\ \\perp\\ \\text{superficie en }\\mathbf r(u,v)$$'}));
    c1.append(el('p',{},'Ejemplo: el cono $z=\\sqrt{x^2+y^2}$, parametrizado como $\\mathbf r(u,v)=\\langle u\\cos v,\\,u\\operatorname{sen}v,\\,u\\rangle$, $u\\ge0$, $v\\in[0,2\\pi]$ (en $u$, la distancia al eje $z$; en $v$, el ángulo).'));
    Pasos(c1,[
      {tex:'\\mathbf r_u=\\langle\\cos v,\\,\\operatorname{sen}v,\\,1\\rangle,\\qquad \\mathbf r_v=\\langle-u\\operatorname{sen}v,\\,u\\cos v,\\,0\\rangle',nota:'Derivadas parciales de r respecto de u y de v.'},
      {tex:'\\mathbf r_u\\times\\mathbf r_v=\\langle-u\\cos v,\\,-u\\operatorname{sen}v,\\,u\\rangle=u\\langle-\\cos v,-\\operatorname{sen}v,1\\rangle',nota:'Producto cruz componente a componente (determinante 3×3 con la fila u_x,u_y,u_z, v_x,v_y,v_z).'}
    ],{modId:'superficies',titulo:'Vector normal del cono r(u,v)=⟨u cos v, u sen v, u⟩'});
    const escalaCono=movil?70:150;
    const espCono=Espacio(c1,{alto:440,escala:escalaCono});
    espCono.dibujar(E=>{
      E.superficie((u,v)=>[u*Math.cos(v),u*Math.sin(v),u-1],{uMin:0,uMax:2,vMin:0,vMax:2*Math.PI,nu:8,nv:18,color:'--s7'});
      const u0=1.4,v0=Math.PI/5;
      const p0=[u0*Math.cos(v0),u0*Math.sin(v0),u0-1];
      const n=[-Math.cos(v0),-Math.sin(v0),1]; /* normal normalizada en dirección, escalada para verse */
      E.vector3(p0,[0.55*n[0],0.55*n[1],0.55*n[2]],{color:'--s4',etiqueta:'n'});
      E.punto3(p0,{color:'--s2',r:4});
    });
    c1.append(el('p',{class:'note'},'Malla morada: el cono (desplazado hacia abajo solo para centrarlo en el lienzo). Punto verde: $\\mathbf r(1{,}4,\\,\\pi/5)$. Flecha naranja: el normal $\\mathbf r_u\\times\\mathbf r_v$ en ese punto, apuntando "hacia adentro y arriba" — girar el orden del producto cruz ($\\mathbf r_v\\times\\mathbf r_u$) da el normal opuesto, la otra orientación posible de la misma superficie.'));
    c1.append(el('p',{class:'note'},el('b',{},'Verificación — el normal es perpendicular a ambos tangentes: '),'$\\mathbf n\\cdot\\mathbf r_u=(-u\\cos v)(\\cos v)+(-u\\operatorname{sen}v)(\\operatorname{sen}v)+u(1)=-u+u=0$ ✓; $\\mathbf n\\cdot\\mathbf r_v=(-u\\cos v)(-u\\operatorname{sen}v)+(-u\\operatorname{sen}v)(u\\cos v)+u(0)=u^2\\cos v\\operatorname{sen}v-u^2\\operatorname{sen}v\\cos v=0$ ✓. Para una superficie ',el('i',{},'gráfica'),' $z=f(x,y)$ (parametrización trivial $x=u,y=v,z=f(u,v)$) esta misma fórmula da $\\mathbf r_u\\times\\mathbf r_v=\\langle-f_x,-f_y,1\\rangle$ — el mismo vector $\\nabla F=\\langle f_x,f_y,-1\\rangle$ (con el signo invertido) de la card "Plano tangente y recta normal" del tema Gradiente, plano tangente y aproximación lineal, ahora obtenido sin pasar por $F=f-z$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: fórmula del normal, index-v3.html (contenido auditado), tema "Integrales de superficie" (que la usa para $\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert$); no trae el ejemplo del cono. El ejemplo, su verificación y la conexión con el gradiente son elaboración propia.'));
    sec.append(c1);

    /* -------- Card 2: área de una superficie paramétrica -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Área de una superficie paramétrica'));
    c2.append(el('p',{},'La magnitud $\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert$ mide cuánto "estira" la parametrización un pedacito de área $du\\,dv$ — integrándola sobre el dominio $D$ de los parámetros se obtiene el área real de la superficie:'));
    c2.append(el('div',{class:'formula',html:'$$A(S)=\\iint_D\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert\\,dA$$'}));
    c2.append(el('p',{},'Con el cono de la card "Superficies paramétricas y su vector normal", de apertura $u\\in[0,h]$: $\\lVert\\mathbf r_u\\times\\mathbf r_v\\rVert=\\lVert u\\langle-\\cos v,-\\operatorname{sen}v,1\\rangle\\rVert=u\\sqrt{\\cos^2v+\\operatorname{sen}^2v+1}=u\\sqrt2$.'));
    Pasos(c2,[
      {tex:'A=\\int_0^{2\\pi}\\int_0^h u\\sqrt2\\,du\\,dv=\\sqrt2\\int_0^{2\\pi}dv\\int_0^h u\\,du',nota:'Se separan las dos integrales (el integrando no mezcla u con v).'},
      {tex:'=\\sqrt2\\cdot2\\pi\\cdot\\dfrac{h^2}{2}=\\sqrt2\\,\\pi h^2',nota:'Se evalúan ambas antiderivadas.'}
    ],{modId:'superficies',titulo:'Área lateral del cono, apertura u∈[0,h]'});
    c2.append(el('p',{class:'note'},el('b',{},'Verificación con la fórmula geométrica del cono: '),'este cono tiene, en $u=h$, radio $r=h$ y altura $z=h$ (semiángulo $45°$), así que su generatriz (distancia del vértice al borde) mide $\\ell=\\sqrt{r^2+h^2}=\\sqrt{h^2+h^2}=h\\sqrt2$. El área lateral de un cono es $A=\\pi r\\ell=\\pi\\cdot h\\cdot h\\sqrt2=\\sqrt2\\,\\pi h^2$ — coincide exactamente con la integral, sin usar parametrización alguna.'));
    c2.append(el('p',{class:'fuente'},'Fuente: fórmula del área, index-v3.html (contenido auditado), tema "Integrales de superficie" (ahí con $f=1$: $\\iint_Sf\\,dS$ da el área). El ejemplo del cono y su verificación con la fórmula geométrica son elaboración propia.'));
    sec.append(c2);

    /* -------- Card 3: gradiente, divergencia y rotacional -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Los tres operadores: gradiente, divergencia y rotacional'));
    c3.append(el('p',{},'Los tres se escriben con el mismo símbolo $\\nabla=\\langle\\partial_x,\\partial_y,\\partial_z\\rangle$, pero cada uno combina campo y "derivada vectorial" distinto — y cada uno cambia el ',el('i',{},'tipo'),' de lo que entra:'));
    c3.append(el('div',{class:'formula',html:'$$\\nabla f=\\Big\\langle\\dfrac{\\partial f}{\\partial x},\\dfrac{\\partial f}{\\partial y},\\dfrac{\\partial f}{\\partial z}\\Big\\rangle\\quad\\text{(escalar}\\to\\text{vector, tema Gradiente, plano tangente y aproximación lineal)}$$'}));
    c3.append(el('div',{class:'formula',html:'$$\\operatorname{div}\\mathbf F=\\nabla\\cdot\\mathbf F=\\dfrac{\\partial P}{\\partial x}+\\dfrac{\\partial Q}{\\partial y}+\\dfrac{\\partial R}{\\partial z}\\quad\\text{(vector}\\to\\text{escalar)}$$'}));
    c3.append(el('div',{class:'formula',html:'$$\\operatorname{rot}\\mathbf F=\\nabla\\times\\mathbf F=\\Big\\langle\\dfrac{\\partial R}{\\partial y}-\\dfrac{\\partial Q}{\\partial z},\\ \\dfrac{\\partial P}{\\partial z}-\\dfrac{\\partial R}{\\partial x},\\ \\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}\\Big\\rangle\\quad\\text{(vector}\\to\\text{vector)}$$'}));
    c3.append(el('p',{},'Interpretación física, pensando $\\mathbf F$ como la velocidad de un fluido: la ',el('b',{},'divergencia'),' mide expansión o contracción local (fuente si $\\operatorname{div}\\mathbf F>0$, sumidero si $<0$); el ',el('b',{},'rotacional'),' mide rotación local (si se pusiera una rueda de paletas diminuta en ese punto, giraría con eje $\\operatorname{rot}\\mathbf F$ y rapidez proporcional a $\\lVert\\operatorname{rot}\\mathbf F\\rVert$). Ejemplo, con $\\mathbf F(x,y,z)=\\langle xy,\\,yz,\\,xz\\rangle$:'));
    Pasos(c3,[
      {tex:'\\operatorname{div}\\mathbf F=\\dfrac{\\partial(xy)}{\\partial x}+\\dfrac{\\partial(yz)}{\\partial y}+\\dfrac{\\partial(xz)}{\\partial z}=y+z+x',nota:'Suma de las tres parciales "directas" (cada componente respecto de su propia variable).'},
      {tex:'\\operatorname{rot}\\mathbf F=\\Big\\langle\\dfrac{\\partial(xz)}{\\partial y}-\\dfrac{\\partial(yz)}{\\partial z},\\ \\dfrac{\\partial(xy)}{\\partial z}-\\dfrac{\\partial(xz)}{\\partial x},\\ \\dfrac{\\partial(yz)}{\\partial x}-\\dfrac{\\partial(xy)}{\\partial y}\\Big\\rangle',nota:'Se arma cada componente con la fórmula de arriba (P=xy, Q=yz, R=xz).'},
      {tex:'=\\langle0-y,\\ 0-z,\\ 0-x\\rangle=\\langle-y,-z,-x\\rangle',nota:'Cada término mixto (xz, xy, yz) deriva a 0 respecto de la variable que no tiene.'}
    ],{modId:'superficies',titulo:'div F y rot F de F=⟨xy,yz,xz⟩'});
    c3.append(el('p',{class:'note'},'Como $\\operatorname{rot}\\mathbf F=\\langle-y,-z,-x\\rangle\\neq\\mathbf0$ (salvo en el origen), este campo no es conservativo — reutilizado en la card "Identidades del cálculo vectorial" para verificar $\\operatorname{div}(\\operatorname{rot}\\mathbf F)=0$.'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Rotacional y divergencia" y ejemplo 16 ("Rotacional y divergencia de un campo"). La presentación de los tres operadores en paralelo (con sus tipos) y la interpretación física son elaboración propia.'));
    sec.append(c3);

    /* -------- Card 4: identidades del cálculo vectorial -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Identidades del cálculo vectorial'));
    c4.append(el('p',{},'Dos identidades siempre ciertas (para $f$ y $\\mathbf F$ con derivadas continuas), consecuencia directa de que las derivadas parciales mixtas son iguales ($f_{xy}=f_{yx}$, teorema de Clairaut):'));
    c4.append(el('div',{class:'formula',html:'$$\\operatorname{rot}(\\nabla f)=\\mathbf0\\qquad\\qquad\\operatorname{div}(\\operatorname{rot}\\mathbf F)=0$$'}));
    Pasos(c4,[
      {tex:'\\operatorname{rot}(\\nabla f)=\\big\\langle f_{zy}-f_{yz},\\ f_{xz}-f_{zx},\\ f_{yx}-f_{xy}\\big\\rangle',nota:'Se aplica la fórmula del rotacional a G=∇f=⟨f_x,f_y,f_z⟩.'},
      {tex:'f_{zy}=f_{yz},\\ \\ f_{xz}=f_{zx},\\ \\ f_{yx}=f_{xy}\\ \\Longrightarrow\\ \\operatorname{rot}(\\nabla f)=\\langle0,0,0\\rangle',nota:'Clairaut: cada par de mixtas es igual, así que cada componente se anula.'}
    ],{modId:'superficies',titulo:'Por qué rot(∇f)=0'});
    c4.append(el('p',{},el('b',{},'Verificación numérica: '),'con $f(x,y,z)=x^2y+yz$, $\\nabla f=\\langle2xy,\\,x^2+z,\\,y\\rangle$. Componente a componente: $\\partial_y(y)-\\partial_z(x^2+z)=1-1=0$; $\\partial_z(2xy)-\\partial_x(y)=0-0=0$; $\\partial_x(x^2+z)-\\partial_y(2xy)=2x-2x=0$ — $\\operatorname{rot}(\\nabla f)=\\langle0,0,0\\rangle$ ✓.'));
    c4.append(el('p',{},el('b',{},'La segunda identidad, verificada con el $\\mathbf F=\\langle xy,yz,xz\\rangle$ de la card "Los tres operadores": '),'ya se calculó ahí $\\operatorname{rot}\\mathbf F=\\langle-y,-z,-x\\rangle$. Su divergencia: $\\partial_x(-y)+\\partial_y(-z)+\\partial_z(-x)=0+0+0=0$ ✓ — se cumple con ese campo concreto, sin necesidad de repetir la prueba general de arriba.'));
    c4.append(el('p',{class:'note'},'El recíproco de la primera identidad —$\\operatorname{rot}\\mathbf F=\\mathbf0$ en un dominio simplemente conexo $\\Rightarrow\\mathbf F$ conservativo— ',el('i',{},'no'),' vale si el dominio tiene un agujero: la card "Green en regiones con agujeros" del módulo Teorema de Green y aplicaciones construye el contraejemplo estándar, un campo con rotacional (ahí, en su versión 2D) nulo en todas partes salvo un punto excluido, que aun así no es conservativo.'));
    c4.append(el('p',{class:'fuente'},'Fuente: enunciado de ambas identidades, index-v3.html (contenido auditado), tema "Rotacional y divergencia". Ambas derivaciones/verificaciones son elaboración propia — index-v3.html las enuncia pero no las demuestra.'));
    sec.append(c4);

    /* -------- Card 5: comparando dos campos, uno rotacional y otro divergente -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Comparando dos campos: uno rotacional, otro divergente'));
    c5.append(el('p',{},'En 2D, $\\operatorname{div}\\mathbf F=P_x+Q_y$ y la componente $z$ de $\\operatorname{rot}\\mathbf F$ es $Q_x-P_y$ (la misma expresión del Teorema de Green). Dos campos que aíslan cada comportamiento por separado:'));
    let modoCampo='rot';
    const planoComp=Plano(c5,{xMin:-1.6,xMax:1.6,yMin:-1.6,yMax:1.6,alto:340});
    planoComp.dibujar(P=>{
      P.ejes();
      const pts=[]; for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){ const x=i*0.45,y=j*0.45; if(x*x+y*y>0.06)pts.push([x,y]); }
      pts.forEach(([x,y])=>{
        const Fx=modoCampo==='rot'?-y:x, Fy=modoCampo==='rot'?x:y, esc=0.4;
        P.vector(x,y,x+esc*Fx,y+esc*Fy,{color:'--s4',punta:5,grosor:1.4});
      });
    });
    btnGroup(c5,[{label:'F=⟨−y,x⟩ (rotacional)',value:'rot'},{label:'F=⟨x,y⟩ (divergente)',value:'div'}],v=>{ modoCampo=v; planoComp.redibujar(); });
    const notaComp=el('p',{class:'note'});
    function actualizarComp(){
      notaComp.innerHTML=modoCampo==='rot'
        ?'$\\mathbf F=\\langle-y,x\\rangle$: $\\operatorname{div}\\mathbf F=\\partial_x(-y)+\\partial_y(x)=0+0=0$ (no se expande: cada flecha tiene la misma longitud que las vecinas a su mismo radio). $\\operatorname{rot}_z\\mathbf F=\\partial_x(x)-\\partial_y(-y)=1-(-1)=2\\neq0$ (todas las flechas giran en el mismo sentido, sin que ninguna "escape" radialmente) — mismo campo de la card "Campos vectoriales y campos conservativos" del tema Integral de línea y teorema fundamental, y del ejemplo con la animación "Campo vectorial rotacional…" de index-v3.html.'
        :'$\\mathbf F=\\langle x,y\\rangle$: $\\operatorname{div}\\mathbf F=\\partial_x(x)+\\partial_y(y)=1+1=2\\neq0$ (las flechas crecen al alejarse del origen: fuente pura). $\\operatorname{rot}_z\\mathbf F=\\partial_x(y)-\\partial_y(x)=0-0=0$ (sin giro: cada flecha apunta derecho hacia afuera, radial) — mismo campo de la card "Las dos formas de Green" del módulo Teorema de Green y aplicaciones.';
    }
    actualizarComp(); c5.append(notaComp);
    c5.append(el('p',{class:'note'},'Es el contraste más directo entre los dos operadores: un campo puede girar sin expandirse, expandirse sin girar, o (en general) ambas cosas a la vez — $\\operatorname{div}$ y $\\operatorname{rot}$ miden cada una por separado, y ninguna de las dos implica la otra.'));
    c5.append(el('p',{class:'fuente'},'Fuente: campo $\\langle-y,x\\rangle$, index-v3.html (contenido auditado), animación "Campo vectorial rotacional y trabajo acumulado"; campo $\\langle x,y\\rangle$, index-v3.html, tema "Teorema de Green" vía la card "Las dos formas de Green" del módulo Teorema de Green y aplicaciones. La comparación lado a lado con div y rot calculados para ambos es elaboración propia.'));
    sec.append(c5);

    /* -------- Card 6: ejercicios -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Ejercicios'));
    c6.append(el('p',{class:'note'},'Canvas 2026-2 no trae material propio de esta unidad (el Listado 1, la Guía de Ayudantía 1 y las pautas de Control 1 solo cubren funciones vectoriales y el triedro TNB, Unidad I).'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Para $\\mathbf F(x,y,z)=\\langle x^2,\\,y^2,\\,z^2\\rangle$, calcule $\\operatorname{div}\\mathbf F$ y $\\operatorname{rot}\\mathbf F$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\operatorname{div}\\mathbf F=2x+2y+2z$$'}),
        el('div',{class:'formula',html:'$$\\operatorname{rot}\\mathbf F=\\langle\\partial_y(z^2)-\\partial_z(y^2),\\ \\partial_z(x^2)-\\partial_x(z^2),\\ \\partial_x(y^2)-\\partial_y(x^2)\\rangle=\\langle0,0,0\\rangle$$'}),
        el('p',{class:'note'},'$\\operatorname{rot}\\mathbf F=\\mathbf0$ en todo $\\mathbb R^3$: por la identidad de la card "Identidades del cálculo vectorial" (recíproca, válida porque $\\mathbb R^3$ es simplemente conexo), $\\mathbf F$ es conservativo — de hecho $\\mathbf F=\\nabla\\big(\\tfrac{x^3+y^3+z^3}{3}\\big)$.')));
    c6.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Halle el área de la porción del plano $z=6-2x-3y$ que queda sobre el triángulo $D=\\{x,y\\ge0,\\,2x+3y\\le6\\}$ del plano $xy$.'),
      el('div',{},
        el('p',{},'Con la parametrización trivial $\\mathbf r(x,y)=\\langle x,y,6-2x-3y\\rangle$: $\\mathbf r_x=\\langle1,0,-2\\rangle$, $\\mathbf r_y=\\langle0,1,-3\\rangle$.'),
        el('div',{class:'formula',html:'$$\\mathbf r_x\\times\\mathbf r_y=\\langle2,3,1\\rangle,\\qquad \\lVert\\mathbf r_x\\times\\mathbf r_y\\rVert=\\sqrt{4+9+1}=\\sqrt{14}$$'}),
        el('div',{class:'formula',html:'$$A=\\iint_D\\sqrt{14}\\,dA=\\sqrt{14}\\cdot\\text{Área}(D)=\\sqrt{14}\\cdot\\dfrac{1}{2}(3)(2)=3\\sqrt{14}\\approx11{,}22$$'}),
        el('p',{class:'note'},'Para un plano, $\\lVert\\mathbf r_x\\times\\mathbf r_y\\rVert$ es constante (no depende de $x,y$), así que el área de la porción es solo ese factor de "estiramiento" por el área de la sombra $D$ — mismo principio que $dS=\\sqrt{1+f_x^2+f_y^2}\\,dA$ para una superficie gráfica.')));
    c6.append(ej2);

    c6.append(el('p',{class:'fuente'},'Fuente: ejercicio 1, index-v3.html (contenido auditado), ejercicio 21 ("Mostrar que F=⟨yz,xz,xy⟩ es conservativo…") adaptado a otro campo, para practicar la identidad recíproca en vez de repetir el mismo F. Ejercicio 2: elaboración propia, aplicando el método de la card "Área de una superficie paramétrica" a una superficie plana.'));
    sec.append(c6);
  }});
