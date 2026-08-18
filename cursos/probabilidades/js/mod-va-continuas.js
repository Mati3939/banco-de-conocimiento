registerModule({id:'va-continuas',title:'Variables aleatorias continuas',
  unidad:'II',semanas:[3],evaluacion:['control-2','certamen-1'],
  lead:'Cuando el soporte de X ya no se puede enumerar: p(x) se convierte en densidad f(x), las sumas se vuelven integrales, y la probabilidad pasa a ser área bajo la curva.',
  build(sec){
    const FUENTE_PROVISORIA='Fuente provisoria: calendarización oficial + Walpole cap. III. Reemplazar cuando el profesor suba el apunte de la semana.';

    /* Ejemplo que recorre casi todo el módulo: densidad Exponencial de media θ=2,
       f(x)=(1/2)e^{-x/2}, x≥0. F(x)=1-e^{-x/2}. */
    const THETA=2;
    const dens=x=>(x<0)?NaN:(1/THETA)*Math.exp(-x/THETA);
    const nf=(x,d=4)=>x.toFixed(d).replace('.',',');

    /* -------- Card 1: del histograma a la densidad -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Del histograma a la densidad'));
    c1.append(el('p',{},'Cuando el soporte de X es continuo, no se puede hacer una lista de valores con su probabilidad como en el caso discreto. La intuición para llegar a f(x): si se parte el eje x en clases cada vez más angostas y en cada una se pone una barra con la altura de la densidad, al aumentar el número de clases el contorno de esas barras converge a una curva suave — esa curva es f(x).'));
    c1.append(el('p',{class:'note'},'Ilustración con una densidad Exponencial de media θ=2 (la misma que se usa en el resto de esta card): cada barra tiene la altura de f evaluada en el punto medio de su clase. Movés el número de clases para ver la convergencia.'));
    let nClases=6;
    const XMAX_HIST=9;
    const planoHist=Plano(c1,{xMin:0,xMax:XMAX_HIST,yMin:0,yMax:0.55,alto:260});
    function dibujarHist(P){
      P.ejes();
      const c=P.ctx, ancho=XMAX_HIST/nClases;
      for(let i=0;i<nClases;i++){
        const a=i*ancho, b=a+ancho, xm=a+ancho/2, h=dens(xm);
        c.save();
        c.fillStyle=colorVar('--s1'); c.globalAlpha=0.5;
        c.fillRect(P.X(a),P.Y(h),P.X(b)-P.X(a),P.Y(0)-P.Y(h));
        c.strokeStyle=colorVar('--axis'); c.lineWidth=1; c.globalAlpha=1;
        c.strokeRect(P.X(a),P.Y(h),P.X(b)-P.X(a),P.Y(0)-P.Y(h));
        c.restore();
      }
      P.curva(dens,{color:'--s4',grosor:2});
      P.texto(XMAX_HIST*0.55,0.5,nClases+' clases',{color:'--ink2'});
    }
    planoHist.dibujar(dibujarHist);
    c1.append(el('div',{class:'controls'},
      el('label',{},'Número de clases:'),
      el('input',{type:'range',min:'2',max:'45',step:'1',value:String(nClases),oninput:e=>{ nClases=parseInt(e.target.value,10); planoHist.redibujar(); }})
    ));
    c1.append(el('p',{class:'fuente'},FUENTE_PROVISORIA+' El histograma de esta card es una construcción ilustrativa propia (no hay datos muestrales reales del curso todavía) para mostrar la idea de convergencia; la densidad Exponencial(θ=2) sí es la familia notable del programa.'));
    sec.append(c1);

    /* -------- Card 2: función de densidad -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Función de densidad'));
    c2.append(el('p',{},'La función de densidad de probabilidad (fdp) de una variable aleatoria continua X debe cumplir:'));
    c2.append(el('div',{class:'formula',html:'$$f(x)\\ge 0\\ \\ \\forall x, \\qquad \\int_{-\\infty}^{\\infty}f(x)\\,dx=1$$'}));
    c2.append(el('p',{},'A diferencia del caso discreto, ',el('b',{},'f(x) no es una probabilidad'),' y puede superar 1 — lo que integra a 1 es el área bajo la curva, no f(x) en un punto. Por eso, en variables continuas, la probabilidad ',el('b',{},'es área'),':'));
    c2.append(el('div',{class:'formula',html:'$$P(a\\le X\\le b)=\\int_a^b f(x)\\,dx$$'}));
    c2.append(el('p',{},'Y esto tiene una consecuencia directa: el área de un intervalo de ancho 0 es 0, así que:'));
    c2.append(el('div',{class:'formula',html:'$$P(X=a)=\\int_a^a f(x)\\,dx=0\\ \\ \\text{para cualquier valor puntual } a$$'}));
    c2.append(el('p',{},'Con la misma densidad Exponencial(θ=2), ',el('span',{html:'$f(x)=\\tfrac12e^{-x/2}$'}),' para x≥0: el control mueve el ancho de un intervalo centrado en a=3. A medida que el ancho baja, el área (la probabilidad) baja con él, hasta casi desaparecer:'));
    let delta=1.0;
    const A0=3;
    const planoDens=Plano(c2,{xMin:0,xMax:9,yMin:0,yMax:0.55,alto:240});
    function dibujarDens(P){
      P.ejes();
      const a=Math.max(0,A0-delta), b=A0+delta;
      P.region(dens,()=>0,a,b,{color:'--s4',alpha:0.45});
      P.curva(dens,{color:'--s1',grosor:2});
    }
    planoDens.dibujar(dibujarDens);
    const lecturaDens=el('p',{class:'note'});
    function actualizarDens(){
      const a=Math.max(0,A0-delta), b=A0+delta;
      const area=Math.exp(-a/THETA)-Math.exp(-b/THETA); // integral exacta de f entre a y b
      lecturaDens.innerHTML='Intervalo [a=3−δ, b=3+δ] con δ='+nf(delta,2)+': área = P(a≤X≤b) = <b>'+nf(area,4)+'</b>.';
    }
    actualizarDens();
    c2.append(lecturaDens);
    c2.append(el('div',{class:'controls'},
      el('label',{},'δ (semiancho):'),
      el('input',{type:'range',min:'0.02',max:'2',step:'0.02',value:String(delta),oninput:e=>{ delta=parseFloat(e.target.value); planoDens.redibujar(); actualizarDens(); }})
    ));
    c2.append(el('p',{class:'note'},'Cuando δ→0 el área → 0, aunque f(3)≈'+nf(dens(A0),4)+' sea positivo — esa es la razón por la que P(X=a)=0 en el caso continuo: un punto no tiene ancho, y sin ancho no hay área.'));
    c2.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c2);

    /* -------- Card 3: FDA continua -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'FDA continua'));
    c3.append(el('p',{},'La función de distribución acumulada de una variable continua se define igual que en el caso discreto — F(x)=P(X≤x) —, pero como una integral en vez de una suma, y su derivada recupera la densidad:'));
    c3.append(el('div',{class:'formula',html:'$$F(x)=\\int_{-\\infty}^{x}f(t)\\,dt, \\qquad f(x)=F\'(x)$$'}));
    c3.append(el('p',{},'Para la Exponencial(θ=2):'));
    c3.append(el('div',{class:'formula',html:'$$F(x)=\\int_0^x \\tfrac12e^{-t/2}\\,dt = \\Big[-e^{-t/2}\\Big]_0^x = 1-e^{-x/2},\\ \\ x\\ge0$$'}));
    let xAcum=2;
    const planoAcum=Plano(c3,{xMin:0,xMax:9,yMin:0,yMax:0.55,alto:240});
    function dibujarAcum(P){
      P.ejes();
      P.region(dens,()=>0,0,xAcum,{color:'--s2',alpha:0.4});
      P.curva(dens,{color:'--s1',grosor:2});
    }
    planoAcum.dibujar(dibujarAcum);
    const lecturaAcum=el('p',{class:'note'});
    function actualizarAcum(){
      const Fx=1-Math.exp(-xAcum/THETA);
      lecturaAcum.innerHTML='F('+nf(xAcum,2)+') = 1 − e^(−'+nf(xAcum,2)+'/2) = <b>'+nf(Fx,4)+'</b> — exactamente el área sombreada, de 0 a '+nf(xAcum,2)+'.';
    }
    actualizarAcum();
    c3.append(lecturaAcum);
    c3.append(el('div',{class:'controls'},
      el('label',{},'x:'),
      el('input',{type:'range',min:'0',max:'9',step:'0.1',value:String(xAcum),oninput:e=>{ xAcum=parseFloat(e.target.value); planoAcum.redibujar(); actualizarAcum(); }})
    ));
    c3.append(el('p',{class:'note'},'Al mover el control hacia la derecha el área acumulada crece — así se ve F(x) "en vivo" como el área a la izquierda de x. Y en el sentido contrario, derivar F(x) devuelve f(x): la densidad es la razón de cambio de la acumulada.'));
    c3.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c3);

    /* -------- Card 4: esperanza, varianza y percentiles (caso continuo) -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Esperanza, varianza y percentiles en el caso continuo'));
    c4.append(el('div',{class:'formula',html:'$$E(X)=\\int_{-\\infty}^{\\infty}x\\,f(x)\\,dx, \\qquad \\text{Var}(X)=E(X^2)-\\big(E(X)\\big)^2, \\qquad x_p:\\ F(x_p)=p$$'}));
    c4.append(el('p',{},'Sobre la misma Exponencial(θ=2):'));
    Pasos(c4,[
      {tex:'E(X)=\\int_0^\\infty x\\cdot\\tfrac12e^{-x/2}\\,dx',nota:'Definición de esperanza para el caso continuo.'},
      {tex:'=\\Big[-x\\,e^{-x/2}\\Big]_0^\\infty+\\int_0^\\infty e^{-x/2}\\,dx',nota:'Integración por partes: u=x, dv=½e^{−x/2}dx ⇒ v=−e^{−x/2}. El primer término se anula en ambos extremos (en ∞ la exponencial domina a x; en 0 porque x=0).'},
      {tex:'E(X)=\\int_0^\\infty e^{-x/2}\\,dx=2',nota:'Queda solo la integral de la exponencial: E(X)=θ=2.'},
      {tex:'E(X^2)=\\int_0^\\infty x^2\\cdot\\tfrac12e^{-x/2}\\,dx=2\\theta\\cdot E(X)=2(2)(2)=8',nota:'Con una segunda integración por partes (mismo patrón, bajando x² a x): E(X²)=2θ·E(X)=2θ²; con θ=2, E(X²)=2(4)=8.'},
      {tex:'\\text{Var}(X)=E(X^2)-\\big(E(X)\\big)^2=8-2^2=4',nota:'Var(X)=θ²=4 — coincide con la propiedad general de la exponencial (desviación estándar = media = θ).'},
      {tex:'F(x_p)=p:\\ \\ 1-e^{-x_p/2}=p \\ \\Rightarrow\\ x_p=-2\\ln(1-p)',nota:'Percentil p: se despeja de la FDA. Con p=0,5 (mediana): $x_{0{,}5}=-2\\ln(0{,}5)=2\\ln2\\approx1{,}3863$.'}
    ],{modId:'va-continuas',titulo:'E(X), Var(X) y percentiles de Exp(θ=2)'});
    c4.append(el('p',{class:'note'},'La mediana (≈1,3863) es menor que la media (θ=2): la exponencial está sesgada a la derecha, con una cola larga hacia valores grandes.'));
    c4.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c4);

    /* -------- Card 5: ejemplo completo -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejemplo completo: de la densidad a E(X), Var(X) y la mediana'));
    c5.append(el('p',{},'Con una densidad distinta —una Uniforme, la otra familia continua notable del programa— para practicar el mismo recorrido completo: ',el('span',{html:'$X\\sim U(0,4)$'}),', con densidad constante f(x)=1/4 en [0,4]:'));
    Pasos(c5,[
      {tex:'f(x)=\\dfrac14,\\ \\ 0\\le x\\le4',nota:'Densidad constante en [0,4]; fuera de ese intervalo f(x)=0.'},
      {tex:'E(X)=\\int_0^4 x\\cdot\\dfrac14\\,dx=\\dfrac14\\Big[\\dfrac{x^2}{2}\\Big]_0^4=\\dfrac14(8)=2',nota:'Esperanza: coincide con el punto medio del intervalo (4/2=2) — la uniforme es simétrica.'},
      {tex:'E(X^2)=\\int_0^4 x^2\\cdot\\dfrac14\\,dx=\\dfrac14\\Big[\\dfrac{x^3}{3}\\Big]_0^4=\\dfrac14\\cdot\\dfrac{64}{3}=\\dfrac{16}{3}',nota:'Segundo momento, necesario para la varianza.'},
      {tex:'\\text{Var}(X)=E(X^2)-\\big(E(X)\\big)^2=\\dfrac{16}{3}-4=\\dfrac{4}{3}\\approx1{,}333',nota:'Verificación por otro camino: la fórmula general de la Uniforme(0,θ) da θ²/12; con θ=4, 16/12=4/3 — mismo resultado.'},
      {tex:'F(x)=\\dfrac{x}{4},\\ \\ 0\\le x\\le4 \\quad\\Rightarrow\\quad F(m)=0{,}5\\ \\Rightarrow\\ m=2',nota:'Mediana: se despeja de la FDA. Coincide con E(X)=2 porque la uniforme es simétrica respecto al punto medio.'}
    ],{modId:'va-continuas',titulo:'Uniforme(0,4): densidad, esperanza, varianza y mediana'});
    const planoUnif=Plano(c5,{xMin:-0.5,xMax:4.5,yMin:0,yMax:0.4,alto:180});
    planoUnif.dibujar(P=>{
      P.ejes();
      const f=x=>(x>=0&&x<=4)?0.25:NaN;
      P.region(f,()=>0,0,4,{color:'--s1',alpha:0.35});
      P.curva(f,{color:'--s1',grosor:2});
      const c=P.ctx;
      c.save(); c.strokeStyle=colorVar('--s4'); c.setLineDash([4,4]); c.lineWidth=1.6;
      c.beginPath(); c.moveTo(P.X(2),P.Y(0)); c.lineTo(P.X(2),P.Y(0.25)); c.stroke();
      c.restore();
      P.texto(2.1,0.29,'E(X) = mediana = 2',{color:'--s4'});
    });
    c5.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c5);
  }});
