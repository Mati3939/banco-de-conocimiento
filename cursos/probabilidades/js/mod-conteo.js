registerModule({id:'conteo',title:'Técnicas de conteo',
  unidad:'I',semanas:[1],evaluacion:['control-1','certamen-1'],
  lead:'Multiplicar, sumar, permutar o combinar: cómo contar sin enumerar cuando el espacio muestral es grande.',
  build(sec){

    /* -------- Card 1: principio multiplicativo -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Principio multiplicativo'));
    c1.append(el('p',{},'Si una operación A puede efectuarse de ',el('i',{},'n'),' formas y luego una operación B de ',el('i',{},'m'),' formas, la operación "A y B" puede ocurrir de ',el('i',{},'n·m'),' formas.'));
    c1.append(el('p',{},'Ejemplo del apunte: un menú de sopa + emparedado + postre + refresco, con 4 sopas, 3 emparedados, 5 postres y 4 refrescos posibles. El árbol de abajo muestra por qué se multiplica, con solo 2 sopas y las 3 emparedados (2 niveles):'));
    const arbolConteo=Arbol(c1,{alto:230,
      nodos:[
        {id:'raiz',texto:'Elegir sopa',fila:0,col:2},
        {id:'s1',texto:'Sopa 1',fila:1,col:1},
        {id:'s2',texto:'Sopa 2',fila:1,col:4},
        {id:'s1e1',texto:'Emp. 1',fila:2,col:0},
        {id:'s1e2',texto:'Emp. 2',fila:2,col:1},
        {id:'s1e3',texto:'Emp. 3',fila:2,col:2},
        {id:'s2e1',texto:'Emp. 1',fila:2,col:3},
        {id:'s2e2',texto:'Emp. 2',fila:2,col:4},
        {id:'s2e3',texto:'Emp. 3',fila:2,col:5},
      ],
      aristas:[['raiz','s1'],['raiz','s2'],
        ['s1','s1e1'],['s1','s1e2'],['s1','s1e3'],
        ['s2','s2e1'],['s2','s2e2'],['s2','s2e3']]});
    c1.append(el('p',{class:'note'},'2 sopas × 3 emparedados = 6 combinaciones (las 6 hojas del árbol). El problema real de la Guía usa las 4 sopas, así que multiplica los cuatro factores: 4×3×5×4 = ',el('b',{},'240'),' menús distintos.'));
    c1.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (principio de multiplicación, ejemplo 1), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c1);

    /* -------- Card 2: principio aditivo -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Principio aditivo'));
    c2.append(el('p',{},'Si una operación A puede ocurrir de ',el('i',{},'n'),' formas y una operación B de ',el('i',{},'m'),' formas, la operación "A o B" ocurre de ',el('i',{},'n+m'),' formas ',el('b',{},'cuando A y B no tienen elementos en común'),' (son mutuamente excluyentes).'));
    c2.append(el('div',{class:'formula',html:'$$A\\cap B=\\emptyset \\implies \\#(A\\text{ o }B)=n+m$$'}));
    c2.append(el('p',{},'Si A y B sí comparten elementos, hay que descontar la coincidencia:'));
    c2.append(el('div',{class:'formula',html:'$$A\\cap B\\ne\\emptyset \\implies \\#(A\\text{ o }B)=n+m-k,\\quad k=\\#(A\\cap B)$$'}));
    c2.append(el('p',{class:'note'},'Regla práctica: se suma cuando la elección es "esto O aquello" (una sola operación, entre alternativas); se multiplica cuando es "esto Y luego aquello" (varias operaciones consecutivas).'));
    c2.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (principio de adición), Teresa Salgado — Canvas 2026-2.'));
    sec.append(c2);

    /* -------- Card 3: experimentos equiprobables -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Experimentos equiprobables'));
    c3.append(el('p',{},'Si Ω es finito y equiprobable (todos sus resultados tienen la misma probabilidad de ocurrir), y un evento A contiene r de los n puntos de Ω:'));
    c3.append(el('div',{class:'formula',html:'$$P(A)=\\dfrac{\\#A}{\\#\\Omega}=\\dfrac{\\text{número de maneras en que A puede suceder}}{\\text{número de maneras en que }\\Omega\\text{ puede suceder}}$$'}));
    c3.append(el('p',{class:'note'},el('b',{},'Advertencia del apunte: '),'esta fórmula solo puede usarse con respecto a un espacio equiprobable — no se puede usar en general.'));
    c3.append(el('p',{},'Ejemplo del apunte: se selecciona una carta al azar de una baraja de 52 cartas. Sean A={espadas}, B={figuras: J, Q o K}.'));
    c3.append(el('div',{class:'formula',html:'$$P(A)=\\dfrac{13}{52}=0{,}25\\qquad P(B)=\\dfrac{12}{52}\\approx 0{,}2308\\qquad P(A\\cap B)=\\dfrac{3}{52}\\approx 0{,}0577$$'}));
    c3.append(el('p',{class:'note'},'(13 espadas de 52; 12 figuras de 52 —J, Q, K en cada uno de los 4 palos—; y la intersección son las 3 figuras que además son espadas: J♠, Q♠, K♠.)'));
    c3.append(el('p',{class:'fuente'},'Fuente: apunte Semana 1 (espacios muestrales equiprobables), Teresa Salgado — Canvas 2026-2. El apunte plantea el ejemplo de la baraja sin resolverlo; el cálculo de P(A), P(B) y P(A∩B) se completó aquí aplicando su propia fórmula.'));
    sec.append(c3);

    /* -------- Card 4: permutaciones, variaciones y combinaciones -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Permutaciones, variaciones y combinaciones'));
    c4.append(el('p',{},'Cuatro preguntas — ¿importa el orden? ¿se puede repetir? — determinan qué fórmula usar:'));
    const tablaConteo=Tabla(c4,{
      columnas:['¿Importa el orden?','¿Se repite?','Nombre','Fórmula'],
      filas:[
        ['Sí','No','Variación / permutación','$P^n_r=\\dfrac{n!}{(n-r)!}$'],
        ['Sí','Sí','Variación con repetición','$n^r$'],
        ['No','No','Combinación','$C^n_r=\\dfrac{n!}{(n-r)!\\,r!}$'],
        ['No','Sí','Combinación con repetición','$\\dbinom{n+r-1}{r}$']
      ]});
    c4.append(el('p',{class:'note'},'Casos especiales del apunte: si se toman los n objetos todos a la vez, el número de permutaciones es n!; en círculo es (n−1)!; y si hay grupos de objetos repetidos entre sí (r₁ iguales, r₂ iguales, …), el número de arreglos distintos es el ',el('b',{},'multinomial'),':'));
    c4.append(el('div',{class:'formula',html:'$$P^n_{r_1,r_2,\\dots,r_k}=\\dfrac{n!}{r_1!\\,r_2!\\cdots r_k!}$$'}));
    c4.append(el('p',{},'Desarrollo de un conteo concreto — Guía 1, ejercicio 5a: "Una contraseña se genera ordenando 3 letras A, 4 letras B y 2 letras C. ¿Cuántas contraseñas distintas pueden generarse?" (9 letras en total, con repeticiones dentro de cada grupo — se aplica el multinomial de arriba):'));
    Pasos(c4,[
      {tex:'n=9,\\ \\ r_A=3,\\ r_B=4,\\ r_C=2',nota:'9 letras a ordenar; 3 de un tipo, 4 de otro, 2 de otro.'},
      {tex:'P^9_{3,4,2}=\\dfrac{9!}{3!\\,4!\\,2!}',nota:'Se aplica la fórmula del multinomial.'},
      {tex:'=\\dfrac{362880}{6\\cdot 24\\cdot 2}=\\dfrac{362880}{288}',nota:'9!=362880; 3!=6, 4!=24, 2!=2, producto=288.'},
      {tex:'=1260',nota:'1260 contraseñas distintas.'}
    ],{modId:'conteo',titulo:'Guía 1, ejercicio 5a'});
    c4.append(el('p',{class:'fuente'},'Fuente: fórmulas del apunte Semana 1 (permutación, combinación, multinomial); ejercicio 5a de la Guía 1, Canvas 2026-2.'));
    sec.append(c4);

    /* -------- Card 5: ejercicios de conteo de la Guía 1 -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Ejercicios de conteo — Guía 1'));

    const ej5b=el('details',{},
      el('summary',{},'Ejercicio 5b — Un chef tiene 15 ingredientes (7 vegetales, 8 carnes) y debe elegir 8 para un plato.'),
      el('div',{},
        el('p',{},el('b',{},'1) ¿Cuántas combinaciones de 8 ingredientes puede formar?'),' No importa el orden ni se repiten ingredientes ⇒ combinación de 15 elegidos de a 8:'),
        el('div',{class:'formula',html:'$$C^{15}_{8}=\\dfrac{15!}{8!\\,7!}=6435$$'}),
        el('p',{},el('b',{},'2) ¿Cuántas contienen exactamente 3 vegetales?'),' 3 de los 7 vegetales y los 5 restantes de las 8 carnes:'),
        el('div',{class:'formula',html:'$$C^{7}_{3}\\cdot C^{8}_{5}=35\\cdot 56=1960$$'}),
        el('p',{},el('b',{},'3) ¿Cuántas contienen al menos 6 carnes?'),' Suma de los casos 6, 7 y 8 carnes (con 2, 1 y 0 vegetales respectivamente):'),
        el('div',{class:'formula',html:'$$C^{8}_{6}C^{7}_{2}+C^{8}_{7}C^{7}_{1}+C^{8}_{8}C^{7}_{0}=28\\cdot21+8\\cdot7+1\\cdot1=588+56+1=645$$'})
      ));
    c5.append(ej5b);

    const ej5c=el('details',{},
      el('summary',{},'Ejercicio 5c — Directorio de 18 gerentes (10 mujeres, 8 hombres); comité al azar de 5.'),
      el('div',{},
        el('p',{},el('b',{},'1) P(exactamente 3 mujeres seleccionadas):')),
        el('div',{class:'formula',html:'$$P=\\dfrac{C^{10}_{3}\\,C^{8}_{2}}{C^{18}_{5}}=\\dfrac{120\\cdot 28}{8568}=\\dfrac{3360}{8568}\\approx 0{,}3922=39{,}22\\%$$'}),
        el('p',{},el('b',{},'2) P(ninguna mujer seleccionada):')),
        el('div',{class:'formula',html:'$$P=\\dfrac{C^{10}_{0}\\,C^{8}_{5}}{C^{18}_{5}}=\\dfrac{1\\cdot 56}{8568}\\approx 0{,}0065=0{,}65\\%$$'})
      ));
    c5.append(ej5c);

    c5.append(el('p',{class:'fuente'},'Fuente: ejercicio 5 (b y c), Guía 1, Canvas 2026-2.'));
    sec.append(c5);
  }});
