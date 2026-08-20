registerModule({id:'modelos-discretos',title:'Modelos discretos',
  unidad:'II',semanas:[4],evaluacion:['control-2','certamen-1'],
  lead:'Cinco familias de variables aleatorias que aparecen una y otra vez — reconocer cuál usar es la mitad del problema.',
  build(sec){
    const FUENTE_PROVISORIA='Fuente provisoria: temario oficial + Walpole cap. IV. Reemplazar cuando el profesor suba el apunte de la semana.';
    const nf=(x,d=4)=>x.toFixed(d).replace('.',',');

    /* ---- pmf, todas estables numéricamente (recurrencia o comb() acotado) ---- */
    function comb(n,k){ if(k<0||k>n||n<0)return 0; k=Math.min(k,n-k); let r=1; for(let i=0;i<k;i++) r=r*(n-i)/(i+1); return r; }
    function pmfBinomial(n,p,xMax){ // x=0..xMax
      const out=new Array(xMax+1).fill(0);
      let px=Math.pow(1-p,n); out[0]=px;
      for(let x=0;x<xMax;x++){ if(x>=n){ out[x+1]=0; continue; } px=px*(n-x)/(x+1)*(p/(1-p)); out[x+1]=px; }
      return out;
    }
    function pmfGeometrica(p,count){ // índice i ↔ x=i+1
      const out=new Array(count);
      for(let i=0;i<count;i++){ const x=i+1; out[i]=p*Math.pow(1-p,x-1); }
      return out;
    }
    function pmfBinomialNegativa(r,p,xMax){ // x=0..xMax (0 para x<r)
      const out=new Array(xMax+1).fill(0);
      for(let x=r;x<=xMax;x++) out[x]=comb(x-1,r-1)*Math.pow(p,r)*Math.pow(1-p,x-r);
      return out;
    }
    /* Rango adaptativo del eje x para Binomial negativa: r y p determinan juntos
       dónde cae el pico (media r/p), así que un rango fijo se ve bien con los
       valores por defecto pero corta el gráfico a mitad de subida en el peor caso
       combinado (r y p en extremos opuestos: r=6, p=0,25 → media=24, pico en x=20,
       con un rango fijo de 24 el 42% de la masa quedaba fuera y sin decaimiento
       visible). Extender hasta media + 2,8 desviaciones estándar deja, en ese
       mismo peor caso, ~99% de la masa visible con la barra del borde ya al ~4%
       del pico — decaimiento claro, mismo criterio que Geométrica. Piso de 10
       para que combinaciones muy concentradas (r chico, p grande) no den un
       gráfico de 2-3 barras.
       */
    function xMaxBN(r,p){
      const media=r/p, de=Math.sqrt(r*(1-p))/p;
      return Math.max(10, Math.ceil(media + 2.8*de));
    }
    function pmfHipergeometrica(N,K,n,xMax){ // x=0..xMax
      const out=new Array(xMax+1).fill(0);
      const denom=comb(N,n), lo=Math.max(0,n-N+K), hi=Math.min(n,K);
      for(let x=lo;x<=hi&&x<=xMax;x++) out[x]=comb(K,x)*comb(N-K,n-x)/denom;
      return out;
    }
    function pmfPoisson(lambda,xMax){ // x=0..xMax
      const out=new Array(xMax+1).fill(0);
      let px=Math.exp(-lambda); out[0]=px;
      for(let x=0;x<xMax;x++){ px=px*lambda/(x+1); out[x+1]=px; }
      return out;
    }

    /* -------- Card 1: Bernoulli y Binomial -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Bernoulli y Binomial'));
    c1.append(el('p',{},'Situación: n ensayos ',el('b',{},'independientes'),', cada uno con la misma probabilidad de éxito p (con reemplazo, o de una población infinita); X = número de éxitos en los n ensayos. Bernoulli es el caso particular n=1.'));
    c1.append(el('div',{class:'formula',html:'$$\\text{Bernoulli: } p(x)=p^x(1-p)^{1-x},\\ x=0,1 \\qquad\\quad \\text{Binomial: } p(x)=\\binom{n}{x}p^x(1-p)^{n-x},\\ x=0,1,\\dots,n$$'}));
    c1.append(el('div',{class:'formula',html:'$$E(X)=np, \\qquad \\text{Var}(X)=np(1-p)$$'}));
    c1.append(el('p',{class:'note'},'Verificado a mano: con n=5, p=0,4, ',el('span',{html:'$p(2)=\\binom{5}{2}(0{,}4)^2(0{,}6)^3=10\\times0{,}16\\times0{,}216=0{,}3456$'}),' (parámetros por defecto del control, barra x=2 resaltada).'));
    let n1=5,p1=0.4;
    const barrasBin=Barras(c1,{valores:pmfBinomial(n1,p1,16),alto:220,formato:x=>x.toFixed(3)});
    barrasBin.marcar(2,'ok');
    const notaBin=el('p',{class:'note'});
    function actualizarBin(){
      barrasBin.setValores(pmfBinomial(n1,p1,16));
      if(n1===5&&Math.abs(p1-0.4)<1e-9)barrasBin.marcar(2,'ok'); else barrasBin.limpiarMarcas();
      notaBin.innerHTML='n='+n1+', p='+nf(p1,2)+' → E(X)=np='+nf(n1*p1,3)+', Var(X)=np(1−p)='+nf(n1*p1*(1-p1),3)+'.';
    }
    actualizarBin();
    c1.append(notaBin);
    c1.append(el('div',{class:'controls'},
      el('label',{},'n:'),
      el('input',{type:'range',min:'1',max:'16',step:'1',value:String(n1),oninput:e=>{ n1=parseInt(e.target.value,10); actualizarBin(); }}),
      el('label',{},'p:'),
      el('input',{type:'range',min:'0.05',max:'0.95',step:'0.05',value:String(p1),oninput:e=>{ p1=parseFloat(e.target.value); actualizarBin(); }})
    ));
    c1.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c1);

    /* -------- Card 2: Geométrica -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Geométrica'));
    c2.append(el('p',{},'Situación: ensayos independientes con probabilidad de éxito p constante; X = número de ',el('b',{},'intentos hasta obtener el primer éxito'),' (incluyéndolo). Es el caso particular r=1 de la Binomial negativa (card siguiente).'));
    c2.append(el('div',{class:'formula',html:'$$p(x)=p(1-p)^{x-1}, \\qquad x=1,2,3,\\dots$$'}));
    c2.append(el('div',{class:'formula',html:'$$E(X)=\\dfrac1p, \\qquad \\text{Var}(X)=\\dfrac{1-p}{p^2}$$'}));
    c2.append(el('p',{class:'note'},'Verificado a mano: con p=0,25, ',el('span',{html:'$p(3)=0{,}25\\times(0{,}75)^2=0{,}25\\times0{,}5625=0{,}140625$'}),' (barra x=3 resaltada por defecto).'));
    let p2=0.25;
    const etqGeo=Array.from({length:18},(_, i)=>String(i+1));
    const barrasGeo=Barras(c2,{etiquetas:etqGeo,valores:pmfGeometrica(p2,18),alto:220,formato:x=>x.toFixed(3)});
    barrasGeo.marcar(2,'ok');
    const notaGeo=el('p',{class:'note'});
    function actualizarGeo(){
      barrasGeo.setValores(pmfGeometrica(p2,18));
      if(Math.abs(p2-0.25)<1e-9)barrasGeo.marcar(2,'ok'); else barrasGeo.limpiarMarcas();
      notaGeo.innerHTML='p='+nf(p2,2)+' → E(X)=1/p='+nf(1/p2,3)+', Var(X)=(1−p)/p²='+nf((1-p2)/(p2*p2),3)+'.';
    }
    actualizarGeo();
    c2.append(notaGeo);
    c2.append(el('div',{class:'controls'},
      el('label',{},'p:'),
      el('input',{type:'range',min:'0.15',max:'0.9',step:'0.05',value:String(p2),oninput:e=>{ p2=parseFloat(e.target.value); actualizarGeo(); }})
    ));
    c2.append(el('p',{class:'note'},'Con p chico la cola es larga (X puede tardar muchos intentos en tener éxito); el gráfico muestra x hasta 18 — para p muy chico una parte de esa cola larga queda fuera del rango mostrado.'));
    c2.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c2);

    /* -------- Card 3: Binomial negativa -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Binomial negativa'));
    c3.append(el('p',{},'Situación: la misma familia de ensayos que la Geométrica, pero X = número de intentos hasta obtener el ',el('b',{},'r-ésimo éxito'),' (r fijo, no necesariamente 1).'));
    c3.append(el('div',{class:'formula',html:'$$p(x)=\\binom{x-1}{r-1}p^r(1-p)^{x-r}, \\qquad x=r,r+1,r+2,\\dots$$'}));
    c3.append(el('div',{class:'formula',html:'$$E(X)=\\dfrac{r}{p}, \\qquad \\text{Var}(X)=\\dfrac{r(1-p)}{p^2}$$'}));
    c3.append(el('p',{class:'note'},'Verificado a mano: con r=3, p=0,5, ',el('span',{html:'$p(5)=\\binom{4}{2}(0{,}5)^3(0{,}5)^2=6\\times0{,}125\\times0{,}25=0{,}1875$'}),' (barra x=5 resaltada por defecto).'));
    let r3=3,p3=0.5;
    const barrasBN=Barras(c3,{valores:pmfBinomialNegativa(r3,p3,xMaxBN(r3,p3)),alto:220,formato:x=>x.toFixed(3)});
    barrasBN.marcar(5,'ok');
    const notaBN=el('p',{class:'note'});
    function actualizarBN(){
      const xmBN=xMaxBN(r3,p3);
      barrasBN.setValores(pmfBinomialNegativa(r3,p3,xmBN));
      if(r3===3&&Math.abs(p3-0.5)<1e-9)barrasBN.marcar(5,'ok'); else barrasBN.limpiarMarcas();
      notaBN.innerHTML='r='+r3+', p='+nf(p3,2)+' → E(X)=r/p='+nf(r3/p3,3)+', Var(X)=r(1−p)/p²='+nf(r3*(1-p3)/(p3*p3),3)+' (gráfico hasta x='+xmBN+').';
    }
    actualizarBN();
    c3.append(notaBN);
    c3.append(el('div',{class:'controls'},
      el('label',{},'r:'),
      el('input',{type:'range',min:'1',max:'6',step:'1',value:String(r3),oninput:e=>{ r3=parseInt(e.target.value,10); actualizarBN(); }}),
      el('label',{},'p:'),
      el('input',{type:'range',min:'0.25',max:'0.9',step:'0.05',value:String(p3),oninput:e=>{ p3=parseFloat(e.target.value); actualizarBN(); }})
    ));
    c3.append(el('p',{class:'note'},'El eje x se adapta a r y p (hasta la media más ~2,8 desviaciones estándar) para que el pico y el decaimiento posterior se vean completos con cualquier combinación de sliders: en el caso por defecto llega hasta x='+xMaxBN(3,0.5)+', y en el peor caso combinado (r=6, p=0,25, donde la media r/p=24 es la más alta alcanzable) llega hasta x=48, mostrando ≈99% de la masa de probabilidad.'));
    c3.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c3);

    /* -------- Card 4: Hipergeométrica -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Hipergeométrica'));
    c4.append(el('p',{},'Situación: población finita de N elementos, K de ellos "éxito"; se extrae una muestra de tamaño n ',el('b',{},'sin reemplazo'),'; X = número de éxitos en la muestra. Es exactamente el mismo conteo que la Binomial, pero sin reemplazo: los ensayos ya no son independientes (sacar un éxito reduce la proporción de éxitos que quedan), así que p cambia ensayo a ensayo.'));
    c4.append(el('div',{class:'formula',html:'$$p(x)=\\dfrac{\\binom{K}{x}\\binom{N-K}{n-x}}{\\binom{N}{n}}, \\qquad x=\\max(0,n-N+K),\\dots,\\min(n,K)$$'}));
    c4.append(el('div',{class:'formula',html:'$$E(X)=n\\dfrac{K}{N}, \\qquad \\text{Var}(X)=n\\dfrac{K}{N}\\cdot\\dfrac{N-K}{N}\\cdot\\dfrac{N-n}{N-1}$$'}));
    c4.append(el('p',{class:'note'},'Verificado a mano: con N=20, K=8, n=5, ',el('span',{html:'$p(2)=\\dfrac{\\binom{8}{2}\\binom{12}{3}}{\\binom{20}{5}}=\\dfrac{28\\times220}{15504}\\approx0{,}3973$'}),' (barra x=2 resaltada por defecto). Verificación cruzada de Var(X) por dos caminos: ',el('span',{html:'$5(0{,}4)(0{,}6)(15/19)\\approx0{,}9474$'}),' y, agrupando distinto, ',el('span',{html:'$\\dfrac{5\\cdot8\\cdot12\\cdot15}{20\\cdot20\\cdot19}=\\dfrac{7200}{7600}\\approx0{,}9474$'}),' — mismo resultado.'));
    let N4=20,K4=8,n4=5;
    const barrasHip=Barras(c4,{valores:pmfHipergeometrica(N4,K4,n4,20),alto:220,formato:x=>x.toFixed(3)});
    barrasHip.marcar(2,'ok');
    const notaHip=el('p',{class:'note'});
    const inputK4=el('input',{type:'range',min:'0',max:'20',step:'1',value:String(K4),oninput:e=>{ K4=parseInt(e.target.value,10); actualizarHip(); }});
    const inputN4v=el('input',{type:'range',min:'1',max:'20',step:'1',value:String(n4),oninput:e=>{ n4=parseInt(e.target.value,10); actualizarHip(); }});
    function actualizarHip(){
      // K y n no pueden superar el tamaño de la población: se recortan a N, y el
      // control deslizante se reposiciona para reflejar el valor recortado (si no,
      // el thumb quedaría mostrando una posición que ya no es el valor real).
      if(K4>N4){ K4=N4; inputK4.value=String(K4); }
      if(n4>N4){ n4=N4; inputN4v.value=String(n4); }
      barrasHip.setValores(pmfHipergeometrica(N4,K4,n4,20));
      if(N4===20&&K4===8&&n4===5)barrasHip.marcar(2,'ok'); else barrasHip.limpiarMarcas();
      const varH=n4*(K4/N4)*((N4-K4)/N4)*((N4-n4)/(N4-1||1));
      notaHip.innerHTML='N='+N4+', K='+K4+', n='+n4+' → E(X)=nK/N='+nf(n4*K4/N4,3)+', Var(X)='+nf(varH,3)+'.';
    }
    actualizarHip();
    c4.append(notaHip);
    c4.append(el('div',{class:'controls'},
      el('label',{},'N:'),
      el('input',{type:'range',min:'5',max:'20',step:'1',value:String(N4),oninput:e=>{ N4=parseInt(e.target.value,10); actualizarHip(); }}),
      el('label',{},'K:'),
      inputK4,
      el('label',{},'n:'),
      inputN4v
    ));
    c4.append(el('p',{class:'note'},'Si K o n se llevan por encima de N con el control, se recortan a N (K y n nunca pueden superar el tamaño de la población). Cuando N es mucho mayor que n, la Hipergeométrica se aproxima bien por la Binomial con p=K/N — sacar unos pocos elementos de una población enorme casi no cambia la proporción de éxitos que queda.'));
    c4.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c4);

    /* -------- Card 5: Poisson -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Poisson'));
    c5.append(el('p',{},'Situación: número de eventos que ocurren en un intervalo fijo (de tiempo, área, volumen…) con tasa media λ constante, ocurriendo de forma independiente entre sí; X = número de eventos en el intervalo.'));
    c5.append(el('div',{class:'formula',html:'$$p(x)=\\dfrac{e^{-\\lambda}\\lambda^x}{x!}, \\qquad x=0,1,2,\\dots$$'}));
    c5.append(el('div',{class:'formula',html:'$$E(X)=\\text{Var}(X)=\\lambda$$'}));
    c5.append(el('p',{class:'note'},'Verificado a mano: con λ=4, ',el('span',{html:'$p(2)=\\dfrac{e^{-4}4^2}{2!}=8e^{-4}\\approx0{,}1465$'}),' (barra x=2 resaltada por defecto).'));
    let lam5=4;
    const barrasPois=Barras(c5,{valores:pmfPoisson(lam5,24),alto:200,formato:x=>x.toFixed(3)});
    barrasPois.marcar(2,'ok');
    const notaPois=el('p',{class:'note'});
    function actualizarPois(){
      barrasPois.setValores(pmfPoisson(lam5,24));
      if(Math.abs(lam5-4)<1e-9)barrasPois.marcar(2,'ok'); else barrasPois.limpiarMarcas();
      notaPois.innerHTML='λ='+nf(lam5,2)+' → E(X)=Var(X)=λ='+nf(lam5,3)+'.';
    }
    actualizarPois();
    c5.append(notaPois);
    c5.append(el('div',{class:'controls'},
      el('label',{},'λ:'),
      el('input',{type:'range',min:'1',max:'12',step:'0.5',value:String(lam5),oninput:e=>{ lam5=parseFloat(e.target.value); actualizarPois(); actualizarComparacion(); }})
    ));

    c5.append(el('p',{},'La Poisson es también el límite de la Binomial cuando n es grande y p es chico, con np=λ fijo. Abajo, la Binomial(n=100, p=λ/100) —n grande, p siempre ≤0,12 con este control— comparada con la Poisson(λ) de arriba, mismos parámetros y mismo eje x:'));
    const N_FIJO=100;
    const barrasCompBin=Barras(c5,{valores:pmfBinomial(N_FIJO,lam5/N_FIJO,24),alto:200,formato:x=>x.toFixed(3)});
    const lecturaComp=el('p',{class:'note'});
    function actualizarComparacion(){
      const pComp=lam5/N_FIJO;
      const binArr=pmfBinomial(N_FIJO,pComp,24);
      barrasCompBin.setValores(binArr);
      const poisArr=pmfPoisson(lam5,24);
      let maxDiff=0;
      for(let x=0;x<=24;x++) maxDiff=Math.max(maxDiff,Math.abs(binArr[x]-poisArr[x]));
      lecturaComp.innerHTML='Binomial(n=100, p='+nf(pComp,4)+'): p(2)='+nf(binArr[2],4)+'  vs.  Poisson(λ='+nf(lam5,2)+'): p(2)='+nf(poisArr[2],4)+'. Diferencia máxima entre las dos barras, en todo el rango mostrado: <b>'+nf(maxDiff,4)+'</b> — las dos formas prácticamente coinciden.';
    }
    actualizarComparacion();
    c5.append(lecturaComp);
    c5.append(el('p',{class:'note'},'Con los valores por defecto (λ=4 → n=100, p=0,04): p(2)=0,1465 en la Poisson contra 0,1450 en la Binomial — una diferencia de apenas 0,0015 (≈1% relativo). La regla práctica para que la aproximación sea buena: n≥100 y np menor que 10, o bien n≥20 y p≤0,05.'));
    c5.append(el('p',{class:'fuente'},FUENTE_PROVISORIA));
    sec.append(c5);

    /* -------- Card 6: cuál usar (tabla de decisión) -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Cuál usar'));
    c6.append(el('p',{},'Las tres preguntas que separan estas cinco familias: ¿hay un número fijo de ensayos, o se cuentan eventos en un intervalo continuo? Si hay ensayos fijos, ¿son con reemplazo (independientes) o sin reemplazo? Y si son independientes, ¿qué es exactamente lo que X cuenta?'));
    Tabla(c6,{columnas:['Si el problema dice…','Usá este modelo'],filas:[
      ['n ensayos fijos e independientes, p constante (con reemplazo o población infinita), y preguntan por el <b>número de éxitos</b> en esos n ensayos','<b>Binomial</b> (Bernoulli si n=1)'],
      ['Ensayos independientes, p constante, y preguntan <b>cuántos intentos hasta el primer éxito</b>','<b>Geométrica</b>'],
      ['Ensayos independientes, p constante, y preguntan <b>cuántos intentos hasta el r-ésimo éxito</b>','<b>Binomial negativa</b>'],
      ['Muestreo <b>sin reemplazo</b> de una población finita de tamaño N (los ensayos NO son independientes) y preguntan por el número de éxitos en la muestra','<b>Hipergeométrica</b>'],
      ['Se cuentan eventos en un intervalo continuo (tiempo, área, volumen…) con tasa media λ, sin un "n ensayos" identificable','<b>Poisson</b>'],
      ['Es Hipergeométrica pero N es mucho más grande que n (muestrear casi no cambia la proporción de éxitos)','Aproximar por <b>Binomial</b> con p=K/N'],
      ['Es Binomial pero n es grande y p es chico (regla práctica: n≥100 y np menor que 10, o n≥20 y p≤0,05)','Aproximar por <b>Poisson</b> con λ=np']
    ]});
    c6.append(el('p',{},'Formulario resumen de las cinco familias:'));
    Tabla(c6,{columnas:['Modelo','Parámetros','p(x)','E(X)','Var(X)'],filas:[
      ['Binomial','n, p','$\\binom{n}{x}p^x(1-p)^{n-x}$','np','np(1-p)'],
      ['Geométrica','p','$p(1-p)^{x-1}$','1/p','(1-p)/p²'],
      ['Binomial negativa','r, p','$\\binom{x-1}{r-1}p^r(1-p)^{x-r}$','r/p','r(1-p)/p²'],
      ['Hipergeométrica','N, K, n','$\\binom{K}{x}\\binom{N-K}{n-x}/\\binom{N}{n}$','nK/N','n·(K/N)·((N-K)/N)·((N-n)/(N-1))'],
      ['Poisson','λ','$e^{-\\lambda}\\lambda^x/x!$','λ','λ']
    ]});
    c6.append(el('p',{class:'note'},'El error más común al identificar el modelo: confundir "sin reemplazo de una población pequeña" (Hipergeométrica) con Binomial — la Binomial asume que p no cambia entre ensayos, y sin reemplazo de una población chica eso deja de ser cierto.'));
    c6.append(el('p',{class:'fuente'},FUENTE_PROVISORIA+' (esta card es una síntesis propia a partir de las cinco fmp de arriba, no una tabla textual del apunte).'));
    sec.append(c6);
  }});
