registerModule({
  id: 'relacional-vs-nosql', title: 'Relacional vs. no relacional', unidad: 'I',
  semanas: [1], evaluacion: ['certamen-1'],
  lead: 'La diferencia no es "tablas contra documentos": es que una implementa integridad referencial y la otra no. Todo lo demás —velocidad, indexación, estadística— sale de esa única decisión.',
  build(sec) {

    /* -------- Card 1: los tres conceptos base -------- */
    const c1 = el('div', { class: 'card' });
    c1.append(el('h3', {}, 'Dato, registro, entidad'));
    c1.append(el('p', {}, 'Cualquier base de datos, relacional o no, tiene estos tres niveles. Van de lo más chico a lo más grande:'));
    c1.append(el('ul', {},
      el('li', {}, el('b', {}, 'Dato'), ' — también llamado ', el('b', {}, 'atributo'), '. Es la unidad atómica de un registro: no se parte más.'),
      el('li', {}, el('b', {}, 'Registro'), ' — una colección de atributos relacionados lógicamente entre sí.'),
      el('li', {}, el('b', {}, 'Entidad'), ' — la estructura general que define a cada registro.')
    ));
    c1.append(el('p', { class: 'note' }, 'Dicho de otro modo: la entidad es el molde, el registro es una pieza salida de ese molde, y el atributo es cada medida del molde. Cuando en Unidad II se hable de "tabla", va a ser el nombre físico de lo que acá se llama entidad.'));
    c1.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02 — Centralización y propagación», diapositiva 13, Canvas 2026-2. La analogía del molde es propia.'));
    sec.append(c1);

    /* -------- Card 2: integridad referencial -------- */
    const c2 = el('div', { class: 'card' });
    c2.append(el('h3', {}, 'Lo que agrega "relacional": integridad referencial'));
    c2.append(el('p', {}, 'Una base relacional implementa una relación entre dos o más entidades. Eso le permite implementar el concepto de ', el('b', {}, 'integridad referencial'), ', que en la práctica significa una sola cosa:'));
    c2.append(el('div', { class: 'formula' },
      el('p', { style: 'margin:0' }, 'No se puede modificar ni eliminar datos de las entidades transaccionales sin verificar antes las entidades maestras.')));
    c2.append(el('p', { class: 'note' }, 'Es una barrera que la base pone sola, sin que el programa se lo pida. Si intentás borrar un cliente que tiene facturas, la base se niega. Esa negativa es la integridad referencial funcionando — y también es la razón de que las operaciones administrativas sean lentas: cada una tiene que pasar por esa capa de verificación.'));
    c2.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositiva 13, Canvas 2026-2. El ejemplo del cliente con facturas es propio.'));
    sec.append(c2);

    /* -------- Card 3: la comparación -------- */
    const c3 = el('div', { class: 'card' });
    c3.append(el('h3', {}, 'Las dos columnas'));
    c3.append(el('p', {}, 'Una base no relacional ', el('b', {}, 'no'), ' implementa integridad referencial. Sus entidades se llaman ', el('b', {}, 'documentos'), ', y sus datos no necesariamente tienen sentido lógico entre sí (aunque deberían). De esa diferencia se desprende todo lo que sigue:'));

    const cols = el('div', { class: 'flexcols' });
    const colSQL = el('div', { style: 'flex:1 1 20rem' });
    colSQL.append(el('h4', { style: 'margin:0 0 .7rem; font-size:1rem' }, 'Relacional (SQL)'));
    colSQL.append(el('ul', {},
      el('li', {}, 'Operaciones administrativas ', el('b', {}, 'lentas'), ', por la capa de integridad referencial.'),
      el('li', {}, 'Indexación ', el('b', {}, 'simple'), ': aplica un índice numérico. No funciona bien indexando texto.'),
      el('li', {}, 'Recuperar datos se vuelve lento cuando no se busca por un atributo indexado.'),
      el('li', {}, 'Permite ', el('b', {}, 'operaciones estadísticas'), ' sobre conjuntos de datos.')
    ));
    const colNo = el('div', { style: 'flex:1 1 20rem' });
    colNo.append(el('h4', { style: 'margin:0 0 .7rem; font-size:1rem' }, 'No relacional (NoSQL)'));
    colNo.append(el('ul', {},
      el('li', {}, 'Operaciones administrativas ', el('b', {}, 'rápidas'), ': no hay integridad referencial que verificar.'),
      el('li', {}, 'Recuperación de datos mucho más rápida, con mejor indexación y además ', el('b', {}, 'indexación compleja (texto)'), '.'),
      el('li', {}, 'Las operaciones estadísticas se vuelven ', el('b', {}, 'engorrosas'), ': el foco de este tipo de base es recuperar la información, no resumirla.')
    ));
    cols.append(colSQL, colNo);
    c3.append(cols);

    c3.append(el('p', { class: 'note' }, 'Leído al derecho: se elige relacional cuando importa que el dato sea consistente y se lo va a interrogar en conjunto; se elige NoSQL cuando importa recuperar rápido y el texto pesa más que la consistencia.'));

    c3.append(el('details', {},
      el('summary', {}, 'Nota sobre la diapositiva 15'),
      el('div', {},
        el('p', {}, 'La diapositiva del lado NoSQL arrastra dos errores de copiado que conviene tener presentes al estudiar de ella:'),
        el('ul', {},
          el('li', {}, 'Dice «las operaciones administrativas de una base de datos ', el('b', {}, 'relacional'), ' son rápidas». Por el contexto —es la diapositiva de NoSQL, y la razón que da es «no implementa integridad referencial»— debería decir ', el('b', {}, 'no relacional'), '.'),
          el('li', {}, 'Las dos últimas viñetas quedaron entreveradas con el texto de la diapositiva anterior, la de SQL.')
        ),
        el('p', { class: 'note' }, 'Lo que está arriba en la columna NoSQL es la lectura corregida. Si en el certamen aparece la frase textual, la respuesta correcta sigue siendo la del sentido, no la del tipeo.')
      )));
    c3.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositivas 14 y 15, Canvas 2026-2. La corrección de la diapositiva 15 y la regla de cuándo elegir cada una son propias.'));
    sec.append(c3);

    /* -------- Card 4: resumen -------- */
    const c4 = el('div', { class: 'card' });
    c4.append(el('h3', {}, 'Para cerrar la unidad'));
    c4.append(el('ul', {},
      el('li', {}, 'Los RDBMS permiten gestionar bases de datos relacionales.'),
      el('li', {}, 'El componente "relacional" se refiere a la ', el('b', {}, 'capa de integridad referencial'), ' sobre los datos.'),
      el('li', {}, 'Los RDBMS más conocidos son Oracle, DB2, MySQL y PostgreSQL.'),
      el('li', {}, 'Las bases NoSQL también se conocen como ', el('b', {}, 'bases de datos documentales'), '.')
    ));
    c4.append(el('p', { class: 'note' }, 'De acá en adelante el curso se queda en el mundo relacional. La Unidad II modela ese mundo con un MER; las Unidades III y IV lo consultan y lo programan con SQL.'));
    c4.append(el('p', { class: 'fuente' }, 'Fuente: «Bases de datos 02», diapositiva 16 (resumen), Canvas 2026-2. El párrafo final es propio, apoyado en la sección D del programa de la asignatura.'));
    sec.append(c4);
  }
});
