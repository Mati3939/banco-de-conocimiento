registerModule({id:'va-discretas',title:'Variables aleatorias discretas',
  unidad:'II',semanas:[3],evaluacion:['control-2','certamen-1'],
  lead:'De los resultados de un experimento a un número: la función de masa, la acumulada, y los dos valores que resumen toda variable — su promedio y su dispersión.',
  build(sec){
    const FUENTE_PROVISORIA='Fuente provisoria: temario oficial + Walpole cap. III. Reemplazar cuando el profesor suba el apunte de la semana.';

    /* Ejemplo que recorre todo el módulo: X = número de caras en 2 lanzamientos
       de una moneda. Ω={CC,CS,SC,SS} equiprobable (cada resultado con prob. 1/4). */
    const FMP=[0.25,0.5,0.25]; // p(0),p(1),p(2)
    const FDA=[0.25,0.75,1.0]; // F(0),F(1),F(2)

    /* -------- Card 1: qué es una variable aleatoria -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Qué es una variable aleatoria'));
    c1.append(el('p',{},'Una variable aleatoria X es una función que asigna un número real a cada resultado de un espacio muestral Ω:'));
    c1.append(el('div',{class:'formula',html:'$$X:\\Omega\\to\\mathbb{R}$$'}));
    c1.append(el('p',{},'Ejemplo clásico: se lanza una moneda dos veces (C=cara, S=sello); Ω={CC,CS,SC,SS}, los cuatro resultados equiprobables. Sea X = "número de caras obtenidas". El árbol muestra el mapeo desde cada resultado de Ω hasta su valor de X:'));
    Arbol(c1,{alto:230,nodos:[
      {id:'raiz',texto:'2 lanzamientos',fila:0,col:1.5},
      {id:'c1',texto:'1ª: Cara',fila:1,col:0.5},
      {id:'s1',texto:'1ª: Sello',fila:1,col:2.5},
      {id:'cc',texto:'2ª: Cara<br>CC → X=2',fila:2,col:0},
      {id:'cs',texto:'2ª: Sello<br>CS → X=1',fila:2,col:1},
      {id:'sc',texto:'2ª: Cara<br>SC → X=1',fila:2,col:2},
      {id:'ss',texto:'2ª: Sello<br>SS → X=0',fila:2,col:3}
    ],aristas:[['raiz','c1'],['raiz','s1'],['c1','cc'],['c1','cs'],['s1','sc'],['s1','ss']]});
    c1.append(el('p',{class:'note'},'X no tiene que ser inyectiva: dos resultados distintos de Ω (CS y SC) caen en el mismo valor de X (X=1). Eso es justamente lo que hace útil a X — agrupa resultados de Ω según una cantidad que interesa, en vez de tener que trabajar con las 4 combinaciones por separado.'));
    c1.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c1);

    /* -------- Card 2: función de masa de probabilidad -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Función de masa de probabilidad'));
    c2.append(el('p',{},'La función de masa de probabilidad (fmp) de una variable aleatoria discreta X, $p(x)=P(X=x)$, debe cumplir:'));
    c2.append(el('div',{class:'formula',html:'$$p(x)\\ge 0\\ \\ \\forall x, \\qquad \\sum_x p(x)=1$$'}));
    c2.append(el('p',{},'Con el ejemplo de la card "Qué es una variable aleatoria" — X = número de caras en 2 lanzamientos, con las 4 combinaciones de Ω equiprobables (probabilidad 1/4 cada una) —, la fmp queda:'));
    Tabla(c2,{columnas:['x','p(x)'],filas:[
      ['0','0,25'],
      ['1','0,50'],
      ['2','0,25']
    ]});
    Barras(c2,{etiquetas:['0','1','2'],valores:FMP,alto:200,formato:x=>x.toFixed(2)});
    c2.append(el('p',{class:'note'},'Se verifica la segunda condición sumando la columna p(x): 0,25+0,50+0,25=1. p(1)=0,50 porque hay 2 de los 4 resultados de Ω (CS y SC) que dan X=1, cada uno con probabilidad 1/4.'));
    c2.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c2);

    /* -------- Card 3: función de distribución acumulada -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Función de distribución acumulada'));
    c3.append(el('p',{},'La función de distribución acumulada (FDA) de X se define como:'));
    c3.append(el('div',{class:'formula',html:'$$F(x)=P(X\\le x)=\\sum_{t\\le x}p(t)$$'}));
    c3.append(el('p',{},'Como X es discreta, F es una función ',el('b',{},'escalonada'),': constante entre valores de X, con un salto de tamaño p(x) exactamente en cada x. Con la misma fmp de arriba:'));
    const barrasFDA=Barras(c3,{etiquetas:['0','1','2'],valores:FMP,alto:180,formato:x=>x.toFixed(2)});
    let nivelF=0; // 0: sólo el tramo x<0 (F=0); 1..3: tramos acumulados hasta x=0,1,2
    const planoFDA=Plano(c3,{xMin:-1,xMax:3,yMin:-0.15,yMax:1.15,alto:220});
    function dibujarEscalera(P){
      P.ejes();
      const c=P.ctx;
      const t=[{a:-1,b:0,h:0},{a:0,b:1,h:0.25},{a:1,b:2,h:0.75},{a:2,b:3,h:1}];
      t.forEach((tr,i)=>{
        const activo=i<=nivelF;
        c.save();
        c.strokeStyle=colorVar(activo?'--s2':'--muted');
        c.globalAlpha=activo?1:0.35;
        c.lineWidth=2.2;
        c.beginPath(); c.moveTo(P.X(tr.a),P.Y(tr.h)); c.lineTo(P.X(tr.b),P.Y(tr.h)); c.stroke();
        c.restore();
        // círculo cerrado a la izquierda (F sí toma ese valor ahí), abierto a la derecha
        c.save();
        c.fillStyle=colorVar(activo?'--s2':'--muted'); c.globalAlpha=activo?1:0.35;
        c.beginPath(); c.arc(P.X(tr.a),P.Y(tr.h),3.5,0,6.2832); c.fill(); c.restore();
        c.save();
        c.strokeStyle=colorVar(activo?'--s2':'--muted'); c.fillStyle=colorVar('--surface'); c.globalAlpha=activo?1:0.35;
        c.beginPath(); c.arc(P.X(tr.b),P.Y(tr.h),3.5,0,6.2832); c.fill(); c.stroke(); c.restore();
      });
      P.texto(-0.9,1.08,'F(x)',{color:'--ink2',tam:11});
    }
    planoFDA.dibujar(dibujarEscalera);
    const notaFDA=el('p',{class:'note'});
    function resetFDA(){ nivelF=0; barrasFDA.limpiarMarcas(); planoFDA.redibujar(); notaFDA.innerHTML='Presioná ▶ Siguiente para ir acumulando p(x) y ver cómo F(x) sube un escalón en cada valor de X.'; }
    const pasosFDA=[
      {d:'En x=0, F(0)=p(0)=0,25',run:async()=>{ nivelF=1; barrasFDA.marcar(0,'ok'); planoFDA.redibujar(); notaFDA.innerHTML='F(0)=p(0)=<b>0,25</b>.'; }},
      {d:'En x=1, F(1)=p(0)+p(1)=0,75',run:async()=>{ nivelF=2; barrasFDA.marcar(1,'ok'); planoFDA.redibujar(); notaFDA.innerHTML='F(1)=p(0)+p(1)=0,25+0,50=<b>0,75</b>.'; }},
      {d:'En x=2, F(2)=p(0)+p(1)+p(2)=1',run:async()=>{ nivelF=3; barrasFDA.marcar(2,'ok'); planoFDA.redibujar(); notaFDA.innerHTML='F(2)=p(0)+p(1)+p(2)=0,25+0,50+0,25=<b>1</b> (ya cubrió todo el soporte de X).'; }}
    ];
    new Stepper(c3,pasosFDA,resetFDA,'va-discretas');
    resetFDA();
    c3.append(notaFDA);
    c3.append(el('p',{class:'note'},el('span',{html:'$P(X\\le1)=F(1)=0{,}75$'}),', pero ',el('span',{html:'$P(X\\lt1)=P(X=0)=p(0)=0{,}25$'}),' — en variables discretas hay que ser explícito con el signo de la desigualdad, porque F(1) sí incluye el término p(1) y el otro caso no.'));
    c3.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c3);

    /* -------- Card 4: valor esperado y varianza -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Valor esperado y varianza'));
    c4.append(el('div',{class:'formula',html:'$$E(X)=\\sum_x x\\,p(x), \\qquad \\text{Var}(X)=E(X^2)-\\big(E(X)\\big)^2$$'}));
    c4.append(el('p',{},'Sobre la misma fmp (X = número de caras en 2 monedas):'));
    Pasos(c4,[
      {tex:'E(X)=0(0{,}25)+1(0{,}50)+2(0{,}25)',nota:'Se pondera cada valor de X por su probabilidad.'},
      {tex:'E(X)=0+0{,}50+0{,}50=1',nota:'En promedio, 1 cara en 2 lanzamientos — coincide con la intuición (np=2×0,5=1, pensando X como Binomial(2; 0,5)).'},
      {tex:'E(X^2)=0^2(0{,}25)+1^2(0{,}50)+2^2(0{,}25)=0+0{,}50+1=1{,}5',nota:'Se necesita E(X²) para la varianza.'},
      {tex:'\\text{Var}(X)=E(X^2)-\\big(E(X)\\big)^2=1{,}5-1^2=0{,}5',nota:'Fórmula de cálculo — la que conviene usar en la práctica.'},
      {tex:'\\text{Var}(X)=\\sum_x(x-1)^2p(x)',nota:'Verificación con la definición directa: se pondera cada desviación al cuadrado por su probabilidad.'},
      {tex:'\\text{Var}(X)=(0-1)^2(0{,}25)+(1-1)^2(0{,}50)+(2-1)^2(0{,}25)=0{,}5',nota:'Se reemplazan los valores de X=0,1,2: da el mismo 0,5 que la fórmula de cálculo, por otro camino.'}
    ],{modId:'va-discretas',titulo:'E(X) y Var(X) de X = número de caras en 2 monedas'});
    c4.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c4);

    /* -------- Card 5: momentos y percentiles -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Momentos y percentiles'));
    c5.append(el('p',{},'El momento de orden k respecto al origen y el momento central de orden k se definen:'));
    c5.append(el('div',{class:'formula',html:'$$\\mu\'_k=E(X^k)=\\sum_x x^k\\,p(x), \\qquad \\mu_k=E\\big[(X-\\mu)^k\\big]=\\sum_x (x-\\mu)^k\\,p(x)$$'}));
    c5.append(el('p',{class:'note'},'El momento de orden 1 respecto al origen es la esperanza ($\\mu\'_1=E(X)$); el momento central de orden 2 es la varianza ($\\mu_2=\\text{Var}(X)$) — ambos ya calculados en la card "Valor esperado y varianza" con este mismo ejemplo.'));
    c5.append(el('p',{},'El percentil p de X es el menor valor $x_p$ tal que F alcanza (o supera) p:'));
    c5.append(el('div',{class:'formula',html:'$$x_p=\\min\\{x : F(x)\\ge p\\}$$'}));
    c5.append(el('p',{},'Con la tabla de F(x) del ejemplo:'));
    Tabla(c5,{columnas:['x','p(x)','F(x)'],filas:[
      ['0','0,25','0,25'],
      ['1','0,50','0,75'],
      ['2','0,25','1,00']
    ]});
    c5.append(el('p',{class:'note'},el('b',{},'Mediana (percentil 50%): '),'el menor x con F(x)≥0,50 es x=1, porque ',el('span',{html:'$F(0)=0{,}25\\lt0{,}50$'}),' pero ',el('span',{html:'$F(1)=0{,}75\\ge0{,}50$'}),' → mediana = 1.',el('br'),el('b',{},'Percentil 90%: '),'el menor x con F(x)≥0,90 es x=2, porque ',el('span',{html:'$F(1)=0{,}75\\lt0{,}90$'}),' pero ',el('span',{html:'$F(2)=1\\ge0{,}90$'}),' → ',el('span',{html:'$x_{0{,}90}=2$'}),'.'));
    c5.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c5);
  }});
