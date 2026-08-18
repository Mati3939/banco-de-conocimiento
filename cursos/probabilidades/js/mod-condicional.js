registerModule({id:'condicional',title:'Probabilidad condicional e independencia',
  unidad:'I',semanas:[2],evaluacion:['control-1','certamen-1'],
  lead:'Qué cambia cuando ya sabemos que ocurrió A: el mundo se achica a A, y P(B) se recalcula sobre ese mundo reducido.',
  build(sec){

    /* -------- Card 1: definición -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Definición'));
    c1.append(el('p',{},'Si $P(A)>0$, la probabilidad de B dado que ha ocurrido A, denotada $P(B\\mid A)$, se define:'));
    c1.append(el('div',{class:'formula',html:'$$P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}\\quad\\text{si } P(A)\\gt 0$$'}));
    c1.append(el('p',{class:'note'},'(Y $P(B\\mid A)=0$ si $P(A)=0$.) Análogamente, $P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}$ si $P(B)\\gt 0$.'));
    c1.append(el('p',{},el('b',{},'Observación del apunte: '),'cada vez que calculamos $P(B\\mid A)$ estamos calculando $P(B)$ con respecto al ',el('b',{},'espacio muestral reducido A'),' en vez de Ω.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (probabilidad condicional), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: espacio muestral reducido -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Espacio muestral reducido'));
    c2.append(el('p',{},'Antes de condicionar, A y B son dos regiones dentro de Ω. Al condicionar por A ("dado que ocurrió A"), el mundo relevante deja de ser Ω y pasa a ser A: todo lo que estaba fuera de A ya no cuenta, y P(B∣A) mide qué fracción de A cae también en B.'));
    function trazadoElipse(P,o){
      const c=P.ctx;
      c.beginPath();
      const rx=Math.abs(P.X(o.cx+o.r)-P.X(o.cx)), ry=Math.abs(P.Y(o.cy)-P.Y(o.cy+o.r));
      c.ellipse(P.X(o.cx),P.Y(o.cy),rx,ry,0,0,6.2832);
    }
    function dibujarVennCond(P,modo){
      const c=P.ctx;
      const caja={x0:-5,x1:5,y0:-3,y1:3};
      const A={cx:-1.4,cy:0,r:2.3}, B={cx:1.4,cy:0,r:2.3};
      c.save(); c.strokeStyle=colorVar('--axis'); c.lineWidth=1.5;
      c.strokeRect(P.X(caja.x0),P.Y(caja.y1),P.X(caja.x1)-P.X(caja.x0),P.Y(caja.y0)-P.Y(caja.y1));
      c.restore();
      if(modo==='despues'){
        // se oscurece todo lo que NO es A (destination-out recorta A del rectángulo gris)
        c.save();
        c.fillStyle=colorVar('--muted'); c.globalAlpha=0.30;
        c.fillRect(P.X(caja.x0),P.Y(caja.y1),P.X(caja.x1)-P.X(caja.x0),P.Y(caja.y0)-P.Y(caja.y1));
        c.globalCompositeOperation='destination-out'; c.globalAlpha=1;
        trazadoElipse(P,A); c.fill();
        c.restore();
        // A∩B, la porción que queda relevante, resaltada
        c.save();
        trazadoElipse(P,A); c.clip();
        c.fillStyle=colorVar('--s4'); c.globalAlpha=0.6;
        trazadoElipse(P,B); c.fill();
        c.restore();
        c.save(); c.strokeStyle=colorVar('--s1'); c.lineWidth=3; trazadoElipse(P,A); c.stroke(); c.restore();
        c.save(); c.strokeStyle=colorVar('--s5'); c.lineWidth=1.8; trazadoElipse(P,B); c.stroke(); c.restore();
        P.texto(A.cx-0.9,A.cy-1.9,'"nuevo Ω" = A',{tam:11,color:'--s1'});
      } else {
        c.save(); trazadoElipse(P,A); c.clip();
        c.fillStyle=colorVar('--s4'); c.globalAlpha=0.35;
        trazadoElipse(P,B); c.fill();
        c.restore();
        c.save(); c.strokeStyle=colorVar('--s1'); c.lineWidth=1.8; trazadoElipse(P,A); c.stroke(); c.restore();
        c.save(); c.strokeStyle=colorVar('--s5'); c.lineWidth=1.8; trazadoElipse(P,B); c.stroke(); c.restore();
        P.texto(caja.x0+0.3,caja.y1-0.35,'Ω',{tam:13,color:'--ink2'});
      }
      P.texto(A.cx-0.9,A.cy+0.15,'A',{tam:14,color:'--s1'});
      P.texto(B.cx+0.6,B.cy+0.15,'B',{tam:14,color:'--s5'});
    }
    let modoCond='antes';
    const planoCond=Plano(c2,{xMin:-5,xMax:5,yMin:-3.2,yMax:3.2,alto:230});
    planoCond.dibujar(P=>dibujarVennCond(P,modoCond));
    btnGroup(c2,[
      {label:'Antes de condicionar',value:'antes'},
      {label:'Después: dado A',value:'despues'}
    ],v=>{ modoCond=v; planoCond.redibujar(); });
    c2.append(el('p',{class:'fuente'},'Fuente: observación del apunte Semana 2 ("espacio muestral reducido"), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: regla de la multiplicación -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Regla de la multiplicación'));
    c3.append(el('p',{},'La definición de probabilidad condicional se puede reescribir para obtener P(A∩B):'));
    Pasos(c3,[
      {tex:'P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)},\\quad P(A)\\gt 0',nota:'Punto de partida: la definición de probabilidad condicional.'},
      {tex:'P(A\\cap B)=P(A)\\cdot P(B\\mid A)\\quad (2)',nota:'Se multiplican ambos lados por P(A).'},
      {tex:'P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)},\\quad P(B)\\gt 0',nota:'Análogamente, partiendo de la definición con los roles de A y B intercambiados.'},
      {tex:'P(A\\cap B)=P(B)\\cdot P(A\\mid B)\\quad (1)',nota:'Se multiplican ambos lados por P(B). (1) y (2) son la regla de la multiplicación.'}
    ],{modId:'condicional',titulo:'Deducción de (1) y (2)'});
    c3.append(el('p',{},'Ejemplo resuelto de la Guía 1: "La probabilidad de que el Banco Central recorte tasas este trimestre es P(R)=0,40. Dado que recorta, la probabilidad de que el mercado bursátil suba es P(A∣R)=0,85. ¿Cuál es la probabilidad de que ocurran ambas cosas?"'));
    c3.append(el('div',{class:'formula',html:'$$P(A\\cap R)=P(A\\mid R)\\cdot P(R)=0{,}85\\times 0{,}40=0{,}34$$'}));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (regla de la multiplicación); Ejemplo 3 de "Ejemplos Resueltos de Aplicación", Guía 1, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: independencia -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Independencia'));
    c4.append(el('p',{},'Dos eventos A y B se dicen mutuamente independientes si:'));
    c4.append(el('div',{class:'formula',html:'$$P(A\\mid B)=P(A)\\quad\\text{o, equivalentemente,}\\quad P(B\\mid A)=P(B)$$'}));
    c4.append(el('p',{},'La ocurrencia o no ocurrencia de un evento no afecta la probabilidad del otro. El apunte da el teorema equivalente, el que más se usa en la práctica:'));
    c4.append(el('div',{class:'formula',html:'$$A \\text{ y } B \\text{ independientes} \\iff P(A\\cap B)=P(A)\\cdot P(B)$$'}));
    c4.append(el('p',{},'Y si A y B son independientes, también lo son:'));
    c4.append(el('ul',{},
      el('li',{html:'A y $B^c$'}),
      el('li',{html:'$A^c$ y B'}),
      el('li',{html:'$A^c$ y $B^c$'})
    ));
    c4.append(el('p',{class:'note'},el('b',{},'Ojo: independiente no es lo mismo que mutuamente excluyente.'),' Si A y B son mutuamente excluyentes ($A\\cap B=\\emptyset$) y ambos tienen probabilidad positiva, entonces $P(A\\cap B)=0$, que no puede ser igual a $P(A)\\cdot P(B)$ (que es positivo) — así que dos eventos mutuamente excluyentes con probabilidad positiva son justo lo opuesto de independientes: saber que ocurrió uno garantiza que el otro NO ocurrió.'));
    c4.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (independencia de eventos y sus teoremas), Teresa Salgado — Canvas 2026-2. La observación final (independencia vs. mutuamente excluyentes) es una deducción propia a partir de esas mismas definiciones.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios de la Guía 1 -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios — Guía 1'));

    const ej3=el('details',{},
      el('summary',{},'Ejercicio 3 — 150 empleados de una fábrica, por sexo y turno.'),
      el('div',{},
        el('div',{class:'tabla-va',html:'<table><thead><tr><th>Turno</th><th>Hombre</th><th>Mujer</th></tr></thead>'+
          '<tbody><tr><td>Mañana</td><td>30</td><td>20</td></tr>'+
          '<tr><td>Tarde</td><td>25</td><td>35</td></tr>'+
          '<tr><td>Noche</td><td>15</td><td>25</td></tr></tbody></table>'}),
        el('ul',{},
          el('li',{html:'a) Hombre y turno noche: $15/150=10\\%$'}),
          el('li',{html:'b) No trabaja en la mañana: $1-50/150=100/150\\approx 66{,}67\\%$'}),
          el('li',{html:'c) Es mujer: $80/150\\approx 53{,}33\\%$'}),
          el('li',{html:'d) Hombre o turno tarde: $70/150+60/150-25/150=105/150=70\\%$'}),
          el('li',{html:'e) No es hombre y turno mañana: $20/150\\approx 13{,}33\\%$'})
        )
      ));
    c5.append(ej3);

    const ej6=el('details',{},
      el('summary',{},'Ejercicio 6 — 65% aprueba Cálculo, 50% Álgebra, 35% ambas. Dado que aprobó Cálculo, ¿P(aprobó Álgebra)?'),
      el('div',{},el('div',{class:'formula',html:'$$P(\\text{Álg}\\mid\\text{Cálc})=\\dfrac{0{,}35}{0{,}65}=\\dfrac{7}{13}\\approx 53{,}85\\%$$'})));
    c5.append(ej6);

    const ej7=el('details',{},
      el('summary',{},'Ejercicio 7 — Dos dados; dado que la suma es 8, ¿P(al menos un dado muestra 3)?'),
      el('div',{},
        el('p',{},'Pares que suman 8: (2,6),(3,5),(4,4),(5,3),(6,2) — 5 pares en total. De ellos, (3,5) y (5,3) tienen un 3.'),
        el('div',{class:'formula',html:'$$P=\\dfrac{2}{5}=40\\%$$'})));
    c5.append(ej7);

    const ej13=el('details',{},
      el('summary',{},'Ejercicio 13 — Dos fuentes de alimentación independientes, P(falla F1)=0,05, P(falla F2)=0,08. ¿P(no se pierde energía)?'),
      el('div',{},
        el('p',{},'El servidor pierde energía solo si fallan ambas a la vez (independientes):'),
        el('div',{class:'formula',html:'$$P(\\text{no pierde energía})=1-P(F_1)P(F_2)=1-0{,}05\\times 0{,}08=1-0{,}004=99{,}6\\%$$'})));
    c5.append(ej13);

    const ej14=el('details',{},
      el('summary',{},'Ejercicio 14 — A y B independientes, P(A)=0,4 y P(A∪B)=0,76. Halle P(B).'),
      el('div',{},
        el('p',{},'Como son independientes, $P(A\\cap B)=P(A)P(B)$, así que $P(A\\cup B)=P(A)+P(B)-P(A)P(B)$:'),
        el('div',{class:'formula',html:'$$0{,}76=0{,}4+0{,}6\\,P(B)\\ \\Rightarrow\\ P(B)=\\dfrac{0{,}36}{0{,}6}=0{,}6=60\\%$$'})));
    c5.append(ej14);

    const ej15=el('details',{},
      el('summary',{},'Ejercicio 15 — Dos cartas con reposición. A = "la primera es As", B = "la segunda es Picas". ¿Son independientes?'),
      el('div',{},
        el('p',{},'Con reposición, la segunda carta se saca de un mazo completo otra vez, sin importar qué salió primero:'),
        el('div',{class:'formula',html:'$$P(A)=\\dfrac{4}{52}=\\dfrac{1}{13},\\quad P(B)=\\dfrac{13}{52}=\\dfrac{1}{4},\\quad P(A\\cap B)=\\dfrac{1}{13}\\cdot\\dfrac{1}{4}=\\dfrac{1}{52}$$'}),
        el('p',{},'Como $P(A\\cap B)=P(A)\\cdot P(B)$, A y B son independientes. ✓')));
    c5.append(ej15);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicios 3, 6, 7, 13, 14 y 15, Guía 1, Canvas 2026-2.'));
    sec.append(c5);
  }});
