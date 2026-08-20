registerModule({
  id: 'cardinalidades', title: 'Cardinalidades', unidad: 'II',
  semanas: [2], evaluacion: ['certamen-1'],
  lead: 'Cuántas veces una entidad se relaciona con otra. Se determina siempre con las mismas dos preguntas, y es donde se pierden más puntos por ir rápido.',
  build(sec) {

    /* -------- Card 1: las dos preguntas -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Las dos preguntas'));
    c1.append(el('p', {}, 'La cardinalidad indica cuántas veces una entidad se relaciona con otra. El ayudante da un procedimiento que no falla: para definirla, hacer siempre estas dos preguntas.'));
    c1.append(el('div', { class: 'formula' },
      el('ol', { style: 'margin:0; padding-left:1.3rem' },
        el('li', {}, '¿Cuántos ', el('b', {}, 'B'), ' puede tener un ', el('b', {}, 'A'), '?'),
        el('li', {}, '¿Cuántos ', el('b', {}, 'A'), ' puede tener un ', el('b', {}, 'B'), '?'))));
    c1.append(el('p', {}, el('b', {}, 'Regla práctica: '), 'si en un sentido hay "muchos" y en el otro "uno", la relación es ', el('b', {}, '1:N'), '. Si hay "muchos" en ambos sentidos, es ', el('b', {}, 'N:M'), '.'));
    c1.append(el('p', { class: 'note' }, 'El orden importa al escribirla. «Cliente 1:N Vehículo» y «Vehículo N:1 Cliente» dicen lo mismo, pero hay que leer de qué lado está el 1. Por eso conviene anotar la cardinalidad ', el('em', {}, 'pegada'), ' a cada entidad en el diagrama, no en el medio de la línea.'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Ayudantía 1 — Repaso de MER», diapositiva 5 (Ricardo Parra), Canvas 2026-2. La observación sobre dónde anotar la cardinalidad es propia.'));
    sec.append(c1);

    /* -------- Card 2: 1:N -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Uno a muchos (1:N)'));
    Mer(c2, {
      alto: 170, titulo: 'Cliente 1:N Vehículo',
      entidades: [
        { id: 'cli', txt: 'Cliente', x: .17, y: .5 },
        { id: 'veh', txt: 'Vehículo', x: .83, y: .5 }
      ],
      relaciones: [{ id: 'tiene', txt: 'Tiene', x: .5, y: .5, de: 'cli', a: 'veh', card: ['1', 'N'] }]
    });
    c2.append(el('p', {}, 'Un cliente puede tener muchos vehículos, pero cada vehículo pertenece a un solo cliente.'));
    c2.append(el('p', { class: 'note' }, 'Al implementarla, la clave del lado "1" baja como clave foránea al lado "N". No hace falta tabla intermedia.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Ayudantía 1», diapositiva 5, Canvas 2026-2. La nota sobre implementación sale de la regla de la clave foránea de «Bases de datos 04», diapositiva 9.'));
    sec.append(c2);

    /* -------- Card 3: N:M -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Muchos a muchos (N:M)'));
    Mer(c3, {
      alto: 170, titulo: 'Mecánico N:M Orden de trabajo',
      entidades: [
        { id: 'mec', txt: 'Mecánico', x: .17, y: .5 },
        { id: 'orden', txt: 'Orden de trabajo', x: .83, y: .5 }
      ],
      relaciones: [{ id: 'realiza', txt: 'Realiza', x: .5, y: .5, de: 'mec', a: 'orden', card: ['N', 'M'] }]
    });
    c3.append(el('p', {}, 'Un mecánico atiende muchas órdenes, y una orden puede requerir varios mecánicos.'));
    c3.append(el('p', { class: 'note' }, 'Este es el caso que más trabajo da después: una relación N:M no se puede implementar directamente en tablas. Se resuelve con una ', el('b', {}, 'entidad intermedia'), ' que toma las claves de las dos, y esa entidad casi siempre es una transacción con clave compuesta.'));
    c3.append(el('p', {}, 'Frase para reconocerla en un enunciado: ', el('em', {}, '"un mismo X puede aparecer en muchos Y distintos"'), '. Aparece casi textual en varios ejercicios de la guía —platos en pedidos, libros y socios, productos en pedidos.'));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Ayudantía 1», diapositiva 5, Canvas 2026-2. Las frases citadas son de los enunciados de «Ayudantía 1» (ejercicio 2) y de la Guía de ejercicios MER (ejercicios 1 y 6). La observación sobre la entidad intermedia es propia.'));
    sec.append(c3);

    /* -------- Card 4: 1:1 -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'Uno a uno (1:1)'));
    Mer(c4, {
      alto: 170, titulo: 'Persona 1:1 Cuenta',
      entidades: [
        { id: 'per', txt: 'Contratante', x: .17, y: .5 },
        { id: 'cta', txt: 'Cuenta', x: .83, y: .5 }
      ],
      relaciones: [{ id: 'paga', txt: 'Contrata', x: .5, y: .5, de: 'per', a: 'cta', card: ['1', '1'] }]
    });
    c4.append(el('p', {}, 'El caso menos frecuente. Ejemplo del ejercicio de streaming: quien contrata paga ', el('b', {}, 'un solo'), ' plan, asociado a una ', el('b', {}, 'única'), ' cuenta.'));
    c4.append(el('p', { class: 'note' }, 'Cuando aparece un 1:1, conviene preguntarse si las dos entidades no son en realidad una sola. A veces se justifican por separado (datos que se consultan poco, o que tienen permisos distintos), pero si no hay una razón, es señal de que el modelo se puede simplificar — es justo lo que busca el paso de ', el('b', {}, 'depuración'), '.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: enunciado del ejercicio 3 de «Ayudantía 1» (plataforma de streaming), Canvas 2026-2. La recomendación de revisar si el 1:1 se justifica es propia.'));
    sec.append(c4);

    /* -------- Card 5: práctica -------- */
    const c5 = el('div', { class: 'card' });
    c5.append(el('h3', {}, 'Determinar cardinalidades sobre enunciados reales'));
    c5.append(el('p', {}, 'Frases sacadas literalmente de los enunciados del curso. Aplicá las dos preguntas antes de abrir cada una.'));

    const casos = [
      ['«Cada libro fue escrito por un autor, y es común que el mismo autor aparezca en varios libros»',
        'Autor 1:N Libro',
        '¿Cuántos libros puede tener un autor? Varios. ¿Cuántos autores tiene un libro? Uno, según este enunciado. Uno y muchos → 1:N.',
        'Ojo: en la realidad un libro puede tener varios autores, pero acá manda el enunciado. Modelar lo que dice el caso, no lo que uno sabe del mundo.'],
      ['«No es raro que un socio retire varios libros distintos a lo largo del año, y que un mismo libro pase por las manos de más de un socio»',
        'Socio N:M Libro',
        'Muchos en los dos sentidos → N:M. Y como cada préstamo tiene fecha de retiro y fecha de devolución, la entidad intermedia (Préstamo) no es solo un puente: tiene atributos propios.',
        'Esta es la pista para reconocer una transacción: la relación N:M viene con datos colgando.'],
      ['«Cada comuna en Chile puede tener un solo Cuerpo de Bomberos, pero un Cuerpo de Bomberos puede pertenecer a una o más comunas»',
        'Cuerpo de Bomberos 1:N Comuna',
        '¿Cuántas comunas puede tener un cuerpo? Una o más. ¿Cuántos cuerpos puede tener una comuna? Uno solo. Uno y muchos → 1:N, con el 1 del lado del Cuerpo.',
        'Es el que más se equivoca porque la frase está escrita al revés de como se lee el diagrama. Las dos preguntas lo resuelven sin discutir.'],
      ['«Un profesor suele dictar varias secciones a la vez, igual que una sala suele usarse para distintas secciones durante el día»',
        'Profesor 1:N Sección, y Sala 1:N Sección',
        'Son dos relaciones distintas, no una. Cada sección tiene un profesor y una sala; cada profesor y cada sala tienen muchas secciones.',
        'Cuando una frase junta dos relaciones con «igual que», casi siempre hay que separarlas en dos líneas del diagrama.']
    ];
    casos.forEach(ca => {
      c5.append(el('details', {},
        el('summary', {}, ca[0]),
        el('div', {},
          el('p', {}, el('b', {}, ca[1])),
          el('p', {}, ca[2]),
          el('p', { class: 'note' }, ca[3]))));
    });
    c5.append(el('p', { class: 'fuente' }, 'Fuente: enunciados de la Guía de ejercicios MER, ejercicios 1 y 4, y del enunciado «MER Bomberos de Chile» (clase del 19/08), Canvas 2026-2. Las cardinalidades propuestas y su justificación son elaboración propia: los enunciados no vienen con solución.'));
    sec.append(c5);
  }
});
