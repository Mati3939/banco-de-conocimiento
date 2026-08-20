registerModule({id:'bayes',title:'Probabilidad total y teorema de Bayes',
  unidad:'I',semanas:[2],evaluacion:['control-1','certamen-1'],
  lead:'Cómo combinar las probabilidades de varias causas posibles para hallar la de un efecto, y cómo invertir esa relación para preguntar "¿cuál causa fue?".',
  build(sec){

    /* -------- Card 1: partición de Ω -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Partición de Ω'));
    c1.append(el('p',{},'Sean $B_1,B_2,\\dots,B_k$ subconjuntos de Ω. Se dice que forman una ',el('b',{},'partición'),' de Ω si:'));
    c1.append(el('ol',{},
      el('li',{html:'$B_i\\cap B_j=\\emptyset$ (para $i\\ne j$: no se superponen entre sí).'}),
      el('li',{html:'$\\Omega=\\bigcup_{i=1}^{k}B_i$ (juntos cubren todo Ω, no dejan nada afuera).'}),
      el('li',{html:'$P(B_i)\\gt 0$ para todo $i$ (ninguna pieza tiene probabilidad nula).'})
    ));
    c1.append(el('p',{class:'note'},'Es exactamente "cortar Ω en pedazos" que no se pisan y que entre todos lo cubren completo — como las causas posibles de un efecto, cuando exactamente una de ellas tuvo que ocurrir.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (partición de Ω), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: teorema de probabilidad total -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Teorema de probabilidad total'));
    c2.append(el('p',{},'Sea $B_1,\\dots,B_k$ una partición de Ω y E cualquier evento de Ω. Entonces:'));
    c2.append(el('div',{class:'formula',html:'$$P(E)=\\sum_{i=1}^{k}P(B_i)\\,P(E\\mid B_i)$$'}));
    c2.append(el('p',{},'Ejemplo de la Guía 1 (ejercicio 8): una planta tiene 3 líneas de producción — A (45%), B (30%) y C (25%) — con tasas de defecto 2%, 3% y 5% respectivamente. El árbol muestra la partición {A,B,C} y, al avanzar, se va acumulando P(defectuoso):'));
    const arbolPT=Arbol(c2,{alto:230,nodos:[
      {id:'E',texto:'Pieza al azar',fila:0,col:1},
      {id:'LA',texto:'Línea A<br>45%',fila:1,col:0},
      {id:'LB',texto:'Línea B<br>30%',fila:1,col:1},
      {id:'LC',texto:'Línea C<br>25%',fila:1,col:2},
      {id:'DA',texto:'Defect. ∣A: 2%',fila:2,col:0},
      {id:'DB',texto:'Defect. ∣B: 3%',fila:2,col:1},
      {id:'DC',texto:'Defect. ∣C: 5%',fila:2,col:2}
    ],aristas:[['E','LA'],['E','LB'],['E','LC'],['LA','DA'],['LB','DB'],['LC','DC']]});
    const acumTxt=el('p',{class:'note'});
    c2.append(acumTxt);
    function actualizarAcum(msg){ acumTxt.innerHTML=msg; }
    function resetPT(){ arbolPT.limpiarMarcas(); actualizarAcum('Presioná ▶ Siguiente para ir sumando P(línea)·P(defectuoso∣línea), rama por rama.'); }
    const pasosPT=[
      {d:'Rama Línea A: 0,45 × 0,02 = 0,0090',run:async()=>{ arbolPT.resaltar(['LA','DA']); actualizarAcum('Rama A: 0,45 × 0,02 = <b>0,0090</b>. Acumulado: 0,0090.'); }},
      {d:'Rama Línea B: 0,30 × 0,03 = 0,0090 → acumulado 0,0180',run:async()=>{ arbolPT.resaltar(['LB','DB']); actualizarAcum('Rama B: 0,30 × 0,03 = 0,0090. Acumulado: 0,0090 + 0,0090 = <b>0,0180</b>.'); }},
      {d:'Rama Línea C: 0,25 × 0,05 = 0,0125 → acumulado 0,0305',run:async()=>{ arbolPT.resaltar(['LC','DC']); actualizarAcum('Rama C: 0,25 × 0,05 = 0,0125. Acumulado final: 0,0180 + 0,0125 = <b>0,0305 = 3,05 %</b> de piezas defectuosas.'); }}
    ];
    new Stepper(c2,pasosPT,resetPT,'bayes');
    resetPT();
    c2.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (teorema de probabilidad total); ejercicio 8, Guía 1, Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: teorema de Bayes -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Teorema de Bayes'));
    c3.append(el('p',{},'Sea $B_1,\\dots,B_k$ una partición de Ω y E un evento de Ω. Entonces:'));
    c3.append(el('div',{class:'formula',html:'$$P(B_i\\mid E)=\\dfrac{P(B_i)\\,P(E\\mid B_i)}{\\sum_{j=1}^{k}P(B_j)\\,P(E\\mid B_j)}\\qquad i=1,\\dots,k$$'}));
    c3.append(el('p',{},'Se deduce combinando la definición de condicional con el teorema de probabilidad total:'));
    Pasos(c3,[
      {tex:'P(B_i\\mid E)=\\dfrac{P(B_i\\cap E)}{P(E)}',nota:'Definición de probabilidad condicional.'},
      {tex:'P(B_i\\cap E)=P(B_i)\\,P(E\\mid B_i)',nota:'Regla de la multiplicación, forma (2).'},
      {tex:'P(E)=\\sum_{j=1}^{k}P(B_j)\\,P(E\\mid B_j)',nota:'Teorema de probabilidad total, aplicado al denominador.'},
      {tex:'P(B_i\\mid E)=\\dfrac{P(B_i)\\,P(E\\mid B_i)}{\\sum_{j=1}^{k}P(B_j)\\,P(E\\mid B_j)}',nota:'Sustituyendo los pasos 2 y 3 en el paso 1, queda el teorema de Bayes.'}
    ],{modId:'bayes',titulo:'Deducción del teorema de Bayes'});
    c3.append(el('p',{},'Ejemplo resuelto de la Guía 1: dos máquinas producen piezas metálicas — M1 el 60% (3% defectuosas), M2 el 40% (5% defectuosas). Si una pieza tomada al azar resulta defectuosa, ¿probabilidad de que sea de M2?'));
    c3.append(el('div',{class:'formula',html:'$$P(M_2\\mid D)=\\dfrac{P(M_2)P(D\\mid M_2)}{P(M_1)P(D\\mid M_1)+P(M_2)P(D\\mid M_2)}=\\dfrac{0{,}40\\times0{,}05}{0{,}60\\times0{,}03+0{,}40\\times0{,}05}=\\dfrac{0{,}020}{0{,}038}\\approx 52{,}63\\%$$'}));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte Semana 2 (teorema de Bayes); Ejemplo 1 de "Ejemplos Resueltos de Aplicación", Guía 1, Canvas 2026-2.'));
    sec.append(c3);

    /* -------- Card 4: el ejemplo del test médico -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'El ejemplo del test médico'));
    c4.append(el('p',{},'Guía 1, ejercicio 16: "Una enfermedad rara afecta al 1% de la población. Una prueba diagnóstica da positivo en el 95% de quienes tienen la enfermedad (sensibilidad) y da negativo en el 90% de quienes no la tienen (especificidad). Si una persona da positivo, ¿cuál es la probabilidad de que realmente tenga la enfermedad?"'));
    c4.append(el('p',{class:'note'},'La intuición dice "95% seguro". La cuenta dice otra cosa, porque la enfermedad es rara: entre todos los que dan positivo, la mayoría son falsos positivos de la enorme mayoría sana. Para verlo, conviene pensar en frecuencias naturales sobre 10 000 personas en vez de porcentajes.'));
    const arbolMed=Arbol(c4,{alto:230,nodos:[
      {id:'N',texto:'10 000 personas',fila:0,col:1.5},
      {id:'Enf',texto:'Enfermos (1%)<br>100',fila:1,col:0.5},
      {id:'San',texto:'Sanos (99%)<br>9 900',fila:1,col:2.5},
      {id:'EP',texto:'Test + : 95',fila:2,col:0},
      {id:'EN',texto:'Test − : 5',fila:2,col:1},
      {id:'SP',texto:'Test + : 990',fila:2,col:2},
      {id:'SN',texto:'Test − : 8 910',fila:2,col:3}
    ],aristas:[['N','Enf'],['N','San'],['Enf','EP'],['Enf','EN'],['San','SP'],['San','SN']]});
    c4.append(el('p',{},'La misma cuenta, en tabla de frecuencias naturales:'));
    Tabla(c4,{columnas:['','Test +','Test −','Total'],filas:[
      ['Enfermo (1%)','95','5','100'],
      ['Sano (99%)','990','8 910','9 900'],
      ['Total','1 085','8 915','10 000']
    ]});
    c4.append(el('div',{class:'formula',html:'$$P(\\text{enfermo}\\mid +)=\\dfrac{95}{1085}\\approx 0{,}0876=8{,}76\\%$$'}));
    c4.append(el('p',{class:'note'},'De los 1 085 que dan positivo, solo 95 están realmente enfermos: 990 son sanos con falso positivo (10% de 9 900). Con una enfermedad de baja prevalencia, aunque el test sea bueno, la mayoría de los positivos son falsos — la lección central de Bayes.'));
    c4.append(el('p',{class:'fuente'},'Fuente: ejercicio 16, Guía 1, Canvas 2026-2. Los 10 000 son una escala elegida para mostrar frecuencias naturales enteras; las proporciones (1%, 95%, 90%) son las del enunciado.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios de la Guía 1 sobre Bayes -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios — Guía 1'));

    const ej9=el('details',{},
      el('summary',{},'Ejercicio 9 — Cables de fibra óptica: proveedor 1 (70%, 6% no cumple estándar), proveedor 2 (30%, 4% no cumple). ¿P(cumple el estándar)?'),
      el('div',{},el('div',{class:'formula',html:'$$P(\\text{cumple})=0{,}70\\times0{,}94+0{,}30\\times0{,}96=0{,}658+0{,}288=94{,}6\\%$$'})));
    c5.append(ej9);

    const ej10=el('details',{},
      el('summary',{},'Ejercicio 10 — Continuando el ejercicio 8: si la pieza resultó defectuosa, ¿P(fue de la línea C)?'),
      el('div',{},
        el('p',{},'Con P(D)=0,0305 (calculado arriba, en la card de probabilidad total) y Bayes:'),
        el('div',{class:'formula',html:'$$P(C\\mid D)=\\dfrac{P(C)P(D\\mid C)}{P(D)}=\\dfrac{0{,}25\\times0{,}05}{0{,}0305}=\\dfrac{0{,}0125}{0{,}0305}\\approx 40{,}98\\%$$'})));
    c5.append(ej10);

    const ej11=el('details',{},
      el('summary',{},'Ejercicio 11 — IDS: detecta ataques el 98% de las veces, falsa alarma en 3% de conexiones normales, 2% de conexiones son ataques reales. Si alerta, ¿P(ataque real)?'),
      el('div',{},
        el('div',{class:'formula',html:'$$P(\\text{alerta})=0{,}02\\times0{,}98+0{,}98\\times0{,}03=0{,}0196+0{,}0294=0{,}0490$$'}),
        el('div',{class:'formula',html:'$$P(\\text{ataque}\\mid\\text{alerta})=\\dfrac{0{,}0196}{0{,}0490}=40\\%$$'})));
    c5.append(ej11);

    const ej12=el('details',{},
      el('summary',{},'Ejercicio 12 — Prueba de falla mecánica: sensibilidad 92%, especificidad 96%, prevalencia 8%. Si el resultado fue negativo, ¿P(en realidad sí tiene la falla)?'),
      el('div',{},
        el('p',{},'Falso negativo = 1 − sensibilidad = 8%.'),
        el('div',{class:'formula',html:'$$P(-)=0{,}08\\times0{,}08+0{,}92\\times0{,}96=0{,}0064+0{,}8832=0{,}8896$$'}),
        el('div',{class:'formula',html:'$$P(\\text{falla}\\mid -)=\\dfrac{0{,}0064}{0{,}8896}\\approx 0{,}72\\%$$'}),
        el('p',{class:'note'},'Contraste con la card "El ejemplo del test médico": ahí un positivo era mayormente falso (8,76%); acá un negativo sí es confiable (solo 0,72% de falla real), porque la especificidad es alta y jugar con el complemento cambia todo.')));
    c5.append(ej12);

    const ej17=el('details',{},
      el('summary',{},'Ejercicio 17 — Proveedores de componentes: A (50%, 1% defectuoso), B (30%, 2%), C (20%, 5%). Si un componente es defectuoso, ¿P(fue del proveedor B)?'),
      el('div',{},
        el('div',{class:'formula',html:'$$P(D)=0{,}50\\times0{,}01+0{,}30\\times0{,}02+0{,}20\\times0{,}05=0{,}005+0{,}006+0{,}010=0{,}021$$'}),
        el('div',{class:'formula',html:'$$P(B\\mid D)=\\dfrac{0{,}006}{0{,}021}=\\dfrac{2}{7}\\approx 28{,}57\\%$$'})));
    c5.append(ej17);

    const ej18=el('details',{},
      el('summary',{},'Ejercicio 18 — Filtro antispam: 75% de correos son spam; "gratis" aparece en 20% del spam y 3% del correo legítimo. Si un correo dice "gratis", ¿P(es spam)?'),
      el('div',{},
        el('div',{class:'formula',html:'$$P(\\text{gratis})=0{,}75\\times0{,}20+0{,}25\\times0{,}03=0{,}15+0{,}0075=0{,}1575$$'}),
        el('div',{class:'formula',html:'$$P(\\text{spam}\\mid\\text{gratis})=\\dfrac{0{,}15}{0{,}1575}=\\dfrac{20}{21}\\approx 95{,}24\\%$$'})));
    c5.append(ej18);

    const ej19=el('details',{},
      el('summary',{},'Ejercicio 19 — Exploración petrolera: 15% de pozos tienen petróleo; estudio sísmico favorable el 90% de las veces si hay petróleo, y falso positivo 12% si no lo hay. Si el estudio es favorable, ¿P(hay petróleo)?'),
      el('div',{},
        el('div',{class:'formula',html:'$$P(\\text{favorable})=0{,}15\\times0{,}90+0{,}85\\times0{,}12=0{,}135+0{,}102=0{,}237$$'}),
        el('div',{class:'formula',html:'$$P(\\text{petróleo}\\mid\\text{favorable})=\\dfrac{0{,}135}{0{,}237}\\approx 56{,}96\\%$$'})));
    c5.append(ej19);

    const ej20=el('details',{},
      el('summary',{},'Ejercicio 20 — 6% de clientes cae en mora; 85% de los morosos tuvo un atraso menor antes, y solo 10% de los al día lo tuvo. Si un cliente tuvo un atraso menor, ¿P(cae en mora)?'),
      el('div',{},
        el('div',{class:'formula',html:'$$P(\\text{atraso})=0{,}06\\times0{,}85+0{,}94\\times0{,}10=0{,}051+0{,}094=0{,}145$$'}),
        el('div',{class:'formula',html:'$$P(\\text{mora}\\mid\\text{atraso})=\\dfrac{0{,}051}{0{,}145}\\approx 35{,}17\\%$$'})));
    c5.append(ej20);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicios 9, 10, 11, 12, 17, 18, 19 y 20, Guía 1, Canvas 2026-2.'));
    sec.append(c5);
  }});
