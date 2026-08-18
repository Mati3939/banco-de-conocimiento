registerModule({id:'axiomas',title:'Axiomas de probabilidad y Bonferroni',
  unidad:'I',semanas:[2],evaluacion:['control-1','certamen-1'],
  lead:'Las cuatro reglas de las que se deduce todo lo demás: de ahí salen el complemento, la regla de la suma, la inclusión-exclusión y la cota de Bonferroni.',
  build(sec){

    /* -------- Card 1: los axiomas -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Los axiomas'));
    c1.append(el('p',{},'Sea ',el('span',{html:'$\\varepsilon$'}),' un experimento y Ω un espacio muestral asociado. Con cada evento A asociamos un número real P(A), la probabilidad de A, que satisface:'));
    c1.append(el('ol',{},
      el('li',{html:'$0\\le P(A)\\le 1,\\ \\ \\forall A\\subseteq\\Omega$'}),
      el('li',{html:'$P(\\Omega)=1$'}),
      el('li',{html:'Si A y B son eventos mutuamente excluyentes, $P(A\\cup B)=P(A)+P(B)$.'}),
      el('li',{html:'Si $A_1,A_2,\\dots,A_n$ son eventos que se excluyen mutuamente de par en par (aditividad numerable):'})
    ));
    c1.append(el('div',{class:'formula',html:'$$P\\Big(\\bigcup_{i=1}^{\\infty}A_i\\Big)=P(A_1)+P(A_2)+\\cdots$$'}));
    c1.append(el('p',{class:'note'},'Para cualquier n finito, el axioma 4 se reduce a $P\\big(\\bigcup_{i=1}^{n}A_i\\big)=\\sum_{i=1}^{n}P(A_i)$.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (nociones básicas de probabilidad), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: propiedades derivadas -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Propiedades derivadas'));
    c2.append(el('ul',{},
      el('li',{html:'$P(\\emptyset)=0$ — si ∅ es el conjunto vacío.'}),
      el('li',{html:'$P(A^c)=1-P(A)$ — Aᶜ es el evento complementario de A.'}),
      el('li',{html:'Monotonía: si $A\\subseteq B$, entonces $P(A)\\le P(B)$.'}),
      el('li',{html:'$P(A\\cap B^c)=P(A)-P(A\\cap B)$, para A y B cualquiera.'})
    ));
    c2.append(el('p',{},'La más usada, la ',el('b',{},'regla de la suma'),', se deduce de los axiomas así:'));
    c2.append(el('div',{class:'formula',html:'$$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$$'}));
    Pasos(c2,[
      {tex:'A\\cup B=A\\cup(B\\setminus A),\\quad A\\cap(B\\setminus A)=\\emptyset',nota:'Se parte A∪B en dos trozos que no se superponen.'},
      {tex:'P(A\\cup B)=P(A)+P(B\\setminus A)',nota:'Axioma 3 (aditividad para eventos mutuamente excluyentes).'},
      {tex:'B=(A\\cap B)\\cup(B\\setminus A)',nota:'B también se parte en dos trozos disjuntos.'},
      {tex:'P(B)=P(A\\cap B)+P(B\\setminus A)\\ \\Rightarrow\\ P(B\\setminus A)=P(B)-P(A\\cap B)',nota:'Axioma 3 otra vez; de aquí se despeja P(B\\A).'},
      {tex:'P(A\\cup B)=P(A)+P(B)-P(A\\cap B)',nota:'Se sustituye P(B\\A) en el paso 2. Queda demostrada la regla de la suma.'}
    ],{modId:'axiomas',titulo:'Deducción desde los axiomas'});
    c2.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (teoremas 1, 2, 5 y 6), Teresa Salgado — Canvas 2026-2. La deducción paso a paso es propia, construida con esas mismas propiedades.'));
    sec.append(c2);

    /* -------- Card 3: inclusión-exclusión para tres eventos -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Inclusión-exclusión para tres eventos'));
    c3.append(el('p',{},'Si A, B y C son tres eventos cualquiera:'));
    c3.append(el('div',{class:'formula',html:'$$P(A\\cup B\\cup C)=P(A)+P(B)+P(C)$$'}));
    c3.append(el('div',{class:'formula',html:'$$-\\,P(A\\cap B)-P(A\\cap C)-P(B\\cap C)+P(A\\cap B\\cap C)$$'}));
    c3.append(el('p',{class:'note'},'Se suman las probabilidades individuales, se restan las tres intersecciones de a pares (ahí la intersección triple quedó restada de más, tres veces) y se vuelve a sumar la intersección triple una vez, para compensar.'));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (teorema 4), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: teorema de Bonferroni -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Teorema de Bonferroni'));
    c4.append(el('div',{class:'formula',html:'$$P(A\\cap B)\\ge P(A)+P(B)-1$$'}));
    c4.append(el('p',{class:'note'},'Se deduce de la regla de la suma y de que ninguna probabilidad supera 1: como $A\\cup B\\subseteq\\Omega$, la monotonía y el axioma 2 dan $P(A\\cup B)\\le P(\\Omega)=1$. Reemplazando $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\le 1$ y despejando $P(A\\cap B)$ se obtiene la cota. Fijamos P(B)=0,60 como ejemplo y movemos P(A) con el control para ver cómo cambia.'));
    const PB_BONF=0.6;
    let PA_BONF=0.5;
    const lecturaBonf=el('p',{class:'note'});
    function actualizarBonf(){
      const cota=PA_BONF+PB_BONF-1;
      lecturaBonf.innerHTML='<b>P(A) = '+PA_BONF.toFixed(2)+'</b>, P(B) = 0,60 → cota = P(A)+P(B)−1 = <b>'+cota.toFixed(2)+'</b>'+
        (cota<0?' (cota trivial: toda probabilidad es ≥ 0, así que no aporta información).':' (P(A∩B) no puede ser menor que este valor).');
    }
    const planoBonf=Plano(c4,{xMin:0,xMax:1,yMin:-1,yMax:1,alto:220});
    planoBonf.dibujar(P=>{
      P.ejes();
      P.curva(x=>x+PB_BONF-1,{color:'--s1'});
      P.curva(()=>0,{color:'--axis',guiones:true});
      P.punto(PA_BONF,PA_BONF+PB_BONF-1,{color:'--s4',r:6,etiqueta:'cota actual'});
      P.texto(0.05,0.9,'cota = P(A)+P(B)-1  (P(B)=0,60 fijo)',{color:'--ink2',tam:11});
    });
    actualizarBonf();
    c4.append(lecturaBonf);
    c4.append(el('div',{class:'controls'},
      el('label',{},'P(A):'),
      el('input',{type:'range',min:'0',max:'1',step:'0.01',value:String(PA_BONF),oninput:e=>{
        PA_BONF=parseFloat(e.target.value);
        planoBonf.redibujar();
        actualizarBonf();
      }})
    ));
    c4.append(el('p',{class:'fuente'},'Fuente: derivado de las propiedades del apunte Semana 1 (teoremas 3 y 5, axioma 2), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios de la Guía 1 -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios — Guía 1'));

    const ej1=el('details',{},
      el('summary',{},'Ejercicio 1 — Club deportivo de 100 socios (Fútbol, Básquetbol, Tenis).'),
      el('div',{},
        el('p',{},'Datos: solo F∩Bq = 15, solo F∩T = 5, solo Bq∩T = 4, solo F = 30, total Bq = 45, solo T = mitad de "solo F" = 15, los tres deportes = 6.'),
        el('p',{},'De "total Bq = 45" se despeja "solo Bq": 45 − 15 (F∩Bq) − 4 (Bq∩T) − 6 (los tres) = ',el('b',{},'20'),'.'),
        el('ul',{},
          el('li',{html:'a) Solo Tenis: $15/100=15\\%$'}),
          el('li',{html:'b) Solo Básquetbol: $20/100=20\\%$'}),
          el('li',{html:'c) Exactamente un deporte: $(30+20+15)/100=65\\%$'}),
          el('li',{html:'d) Básquetbol y no Tenis: $(20+15)/100=35\\%$ (solo Bq, más F∩Bq sin T)'}),
          el('li',{html:'e) Exactamente dos deportes: $(15+5+4)/100=24\\%$'})
        ),
        el('p',{class:'note'},'Verificación: sumando las 7 regiones (30+20+15+15+5+4+6=95) sobran 5 socios que no practican ningún deporte — consistente con 100 socios en total.')
      ));
    c5.append(ej1);

    const ej2=el('details',{},
      el('summary',{},'Ejercicio 2 — Demuestre que $P(A\\cap B^c)=P(A)-P(A\\cap B)$.'),
      el('div',{},
        el('p',{},'A se puede partir en dos trozos disjuntos: la parte que está en B y la que no:'),
        el('div',{class:'formula',html:'$$A=(A\\cap B)\\cup(A\\cap B^c),\\qquad (A\\cap B)\\cap(A\\cap B^c)=\\emptyset$$'}),
        el('p',{},'Por el axioma 3 (aditividad para eventos mutuamente excluyentes):'),
        el('div',{class:'formula',html:'$$P(A)=P(A\\cap B)+P(A\\cap B^c)$$'}),
        el('p',{},'Despejando $P(A\\cap B^c)$ queda la propiedad buscada. ∎')
      ));
    c5.append(ej2);

    const ej4=el('details',{},
      el('summary',{},'Ejercicio 4 — Especialistas médicos: Pediatría 30%, Cirugía 40%, Interna 20%.'),
      el('div',{},
        el('p',{},'Datos: P(Ped∩Cir)=0,10, P(Ped∩Int)=0,05, P(Cir∩Int)=0,08, P(al menos una)=0,70.'),
        el('p',{},'Con inclusión-exclusión para tres eventos: $0{,}70=0{,}30+0{,}40+0{,}20-0{,}10-0{,}05-0{,}08+P(P\\cap C\\cap I)$, de donde:'),
        el('ul',{},
          el('li',{html:'a) Las tres especialidades: $P(P\\cap C\\cap I)=0{,}70-0{,}67=0{,}03=3\\%$'}),
          el('li',{html:'b) Pediatra o internista: $0{,}30+0{,}20-0{,}05=45\\%$'}),
          el('li',{html:'c) Solo cirujano: $P(C)-P(C\\cap P)-P(C\\cap I)+P(P\\cap C\\cap I)=0{,}40-0{,}10-0{,}08+0{,}03=25\\%$'}),
          el('li',{html:'d) Exactamente una especialidad: solo Ped (18%) + solo Cir (25%) + solo Int (10%) = 53%'})
        ),
        el('p',{class:'note'},'Verificación cruzada: sumando las 7 regiones del diagrama (18+25+10+7+2+5+3) da exactamente 70 — coincide con el 70% que ocurre al menos una especialidad, dato del enunciado.')
      ));
    c5.append(ej4);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicios 1, 2 y 4, Guía 1, Canvas 2026-2.'));
    sec.append(c5);
  }});
