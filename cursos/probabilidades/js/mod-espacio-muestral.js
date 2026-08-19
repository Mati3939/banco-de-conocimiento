registerModule({id:'espacio-muestral',title:'Experimento, espacio muestral y eventos',
  unidad:'I',semanas:[1],evaluacion:['control-1','certamen-1'],
  lead:'El vocabulario base: qué es un experimento aleatorio, qué es Ω y qué es un evento.',
  build(sec){

    /* -------- Card 1: experimento determinístico vs aleatorio -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Experimento: determinístico vs. aleatorio'));
    c1.append(el('p',{},'Un ',el('b',{},'experimento'),' es un proceso natural o artificial que entrega información. Se distinguen dos tipos:'));
    c1.append(el('ul',{},
      el('li',{},el('b',{},'Determinístico: '),'cuando de antemano conocemos el resultado.'),
      el('li',{},el('b',{},'Aleatorio: '),'se conoce el conjunto de los resultados posibles, pero no cuál de ellos va a ocurrir.')
    ));
    c1.append(el('p',{},'Un experimento aleatorio tiene tres características:'));
    c1.append(el('ul',{},
      el('li',{},'Se puede repetir indefinidamente bajo las mismas condiciones esenciales.'),
      el('li',{},'No se conoce el resultado en el que finaliza el experimento, pero sí se conoce el número posible de resultados en el que puede terminar.'),
      el('li',{},'El resultado se produce al azar.')
    ));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1, Teresa Salgado — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: espacio muestral Ω -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Espacio muestral Ω'));
    c2.append(el('p',{},'Con cada experimento aleatorio ',el('span',{html:'$\\varepsilon$'}),' definimos el ',el('b',{},'espacio muestral'),' como el conjunto de todos los resultados posibles de ',el('span',{html:'$\\varepsilon$'}),'. Se designa ',el('span',{html:'$\\Omega$'}),'.'));
    const ejemplosEM=[
      ['1. Se lanza un dado y se observa el número que aparece en la cara superior.','\\Omega=\\{1,2,3,4,5,6\\}'],
      ['2. Se lanza una moneda cuatro veces y se cuenta el número total de caras obtenidas.','\\Omega=\\{0,1,2,3,4\\}'],
      ['3. Se lanza una moneda cuatro veces y se observa la sucesión de caras y sellos obtenidos.','\\Omega=\\{\\text{todas las sucesiones } a_1a_2a_3a_4 \\text{ con } a_i=C \\text{ o } S\\}'],
      ['4. Se fabrican artículos en una línea de producción y se cuenta el número de defectuosos producidos en 24 horas.','\\Omega=\\{0,1,2,\\dots,N\\},\\ N=\\text{máximo posible en 24 h}']
    ];
    ejemplosEM.forEach(([texto,tex])=>{
      c2.append(el('p',{},texto));
      c2.append(el('div',{class:'formula',html:'$$'+tex+'$$'}));
    });
    c2.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1, Teresa Salgado — Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: eventos -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Eventos'));
    c3.append(el('p',{},'Un ',el('b',{},'evento'),' A (respecto a un espacio muestral particular Ω asociado con un experimento) es un conjunto de resultados posibles. En la terminología de conjuntos, un evento es un ',el('b',{},'subconjunto'),' del espacio muestral Ω.'));
    c3.append(el('p',{},'Ejemplos de eventos, sobre los cuatro experimentos de la card anterior:'));
    c3.append(el('ul',{},
      el('li',{html:'$A_1$: Un número que ocurre; esto es, $A_1=\\{2,4,6\\}$ (experimento 1).'}),
      el('li',{html:'$A_2=\\{2\\}$; es decir, ocurren dos caras (experimento 2).'}),
      el('li',{},el('span',{class:'mathinline',html:'$A_3=\\{CCCC,\\ CCCS,\\ CCSC,\\ CSCC,\\ SCCC\\}$'}),'; es decir, salen más caras que sellos (experimento 3).'),
      el('li',{html:'$A_4=\\{0\\}$; es decir, todos los artículos fueron no defectuosos (experimento 4).'})
    ));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1, Teresa Salgado — Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: operaciones con eventos + Venn -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Operaciones con eventos'));
    c4.append(el('ul',{},
      el('li',{html:'<b>Unión</b> $A\\cup B$: ocurre $A$, o $B$, o ambos.'}),
      el('li',{html:'<b>Intersección</b> $A\\cap B$: ocurren $A$ y $B$ a la vez.'}),
      el('li',{html:'<b>Complemento</b> $A^c$: no ocurre $A$ (lo que está en $\\Omega$ y no en $A$).'}),
      el('li',{html:'<b>Mutuamente excluyentes</b>: $A\\cap B=\\emptyset$ — no pueden ocurrir al mismo tiempo. Si lo son, el axioma 3 da $P(A\\cup B)=P(A)+P(B)$.'})
    ));
    function dibujarVennEM(P,modo){
      const c=P.ctx;
      const caja={x0:-5,x1:5,y0:-3,y1:3};
      const A={cx:-1.4,cy:0,r:2.3}, B={cx:1.4,cy:0,r:2.3};
      function trazado(o){
        c.beginPath();
        const rx=Math.abs(P.X(o.cx+o.r)-P.X(o.cx)), ry=Math.abs(P.Y(o.cy)-P.Y(o.cy+o.r));
        c.ellipse(P.X(o.cx),P.Y(o.cy),rx,ry,0,0,6.2832);
      }
      // fondo según el modo
      if(modo==='union'){
        c.save(); c.fillStyle=colorVar('--s4'); c.globalAlpha=0.35;
        trazado(A); c.fill(); trazado(B); c.fill();
        c.restore();
      } else if(modo==='inter'){
        c.save();
        trazado(A); c.clip();
        c.fillStyle=colorVar('--s4'); c.globalAlpha=0.55;
        trazado(B); c.fill();
        c.restore();
      } else if(modo==='compl'){
        c.save();
        c.fillStyle=colorVar('--s4'); c.globalAlpha=0.35;
        c.fillRect(P.X(caja.x0),P.Y(caja.y1),P.X(caja.x1)-P.X(caja.x0),P.Y(caja.y0)-P.Y(caja.y1));
        c.globalCompositeOperation='destination-out'; c.globalAlpha=1;
        trazado(A); c.fill();
        c.restore();
      }
      // marco de Ω
      c.save(); c.strokeStyle=colorVar('--axis'); c.lineWidth=1.5;
      c.strokeRect(P.X(caja.x0),P.Y(caja.y1),P.X(caja.x1)-P.X(caja.x0),P.Y(caja.y0)-P.Y(caja.y1));
      c.restore();
      // contornos de A y B
      c.save(); c.strokeStyle=colorVar('--s1'); c.lineWidth=1.8; trazado(A); c.stroke(); c.restore();
      c.save(); c.strokeStyle=colorVar('--s5'); c.lineWidth=1.8; trazado(B); c.stroke(); c.restore();
      P.texto(caja.x0+0.3,caja.y1-0.35,'Ω',{tam:13,color:'--ink2'});
      P.texto(A.cx-0.9,A.cy,'A',{tam:14,color:'--s1'});
      P.texto(B.cx+0.6,B.cy,'B',{tam:14,color:'--s5'});
    }
    let modoVenn='union';
    const planoVenn=Plano(c4,{xMin:-5,xMax:5,yMin:-3.2,yMax:3.2,alto:230});
    planoVenn.dibujar(P=>dibujarVennEM(P,modoVenn));
    btnGroup(c4,[
      {label:'A ∪ B',value:'union'},
      {label:'A ∩ B',value:'inter'},
      {label:'Aᶜ',value:'compl'}
    ],v=>{ modoVenn=v; planoVenn.redibujar(); });
    c4.append(el('p',{class:'fuente'},'Fuente: notación de conjuntos (∪, ∩, complemento, mutuamente excluyentes) usada en el apunte Semana 1, Teresa Salgado — Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: las tres formas de asignar probabilidad -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Las tres formas de asignar probabilidad'));
    c5.append(el('p',{},'Una probabilidad mide las posibilidades de que ocurra un suceso futuro; toma valores entre 0 y 1. Existen tres maneras de asignarla:'));
    c5.append(el('ul',{},
      el('li',{},el('b',{},'Frecuencia relativa: '),'se basa en la experimentación o en datos históricos. Es el número de veces que ocurre un suceso dividido entre el número de veces que se realiza el experimento.'),
      el('li',{},el('b',{},'Probabilidad subjetiva: '),'refleja sentimientos u opiniones respecto de las posibilidades de que ocurra un resultado.'),
      el('li',{},el('b',{},'Probabilidad clásica: '),'supone que los sucesos de un experimento son igualmente probables. Es la que más se usa en juegos de azar; no se aplica en la toma de decisiones.')
    ));
    c5.append(el('p',{class:'note'},'La frecuencia relativa se comporta así: al repetir un experimento equiprobable muchas veces, la proporción observada converge al valor teórico. Abajo, la proporción de "6" al lanzar un dado muchas veces converge a 1/6 ≈ 0,1667 (probabilidad clásica).'));
    const N_DADO=400;
    let cuenta6=0; const serieFrec=[];
    for(let i=1;i<=N_DADO;i++){ if(Math.floor(Math.random()*6)===0)cuenta6++; serieFrec.push(cuenta6/i); }
    const planoFrec=Plano(c5,{xMin:1,xMax:N_DADO,yMin:0,yMax:0.5,alto:220});
    planoFrec.dibujar(P=>{
      P.ejes();
      P.curva(x=>{ const i=Math.max(1,Math.min(N_DADO,Math.round(x))); return serieFrec[i-1]; },{color:'--s1'});
      P.curva(()=>1/6,{color:'--s4',guiones:true});
      P.texto(N_DADO*0.55,1/6+0.035,'1/6 ≈ 0,1667',{color:'--s4',tam:12});
      P.texto(N_DADO*0.55,0.46,'frecuencia relativa de "sale 6"',{color:'--ink2',tam:11});
    });
    c5.append(el('p',{class:'fuente'},'Fuente: definiciones del apunte Semana 1, Teresa Salgado — Canvas 2026-2. Simulación propia de lanzamientos de dado para ilustrar la convergencia de la frecuencia relativa (concepto explicado en el apunte).'));
    sec.append(c5);
  }});
