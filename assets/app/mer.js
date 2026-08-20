'use strict';
/* =====================================================================
   Mer(mount, spec) — diagrama entidad-relación en SVG.

   Es la primitiva central de Base de Datos: casi todo lo que se explica en
   Unidad II es "mirá este MER". A diferencia de las primitivas de math.js
   (canvas + addRelayout + repintado por evento) esta NO mide ni repinta
   nunca:
     - el SVG tiene viewBox y width:100%, así que escala solo al cambiar el
       ancho de la ventana o al entrar en modo Presentar;
     - los colores salen de clases CSS (.mer-entidad, .mer-attr…) que usan
       var(--…), así que el cambio de tema lo resuelve el navegador.
   Por eso acá no hay colorVar(), ni addRelayout, ni listener de
   'temacambiado': no harían nada.

   spec = {
     alto,                       // alto del viewBox (el ancho es siempre 1000)
     entidades:[{
       id, txt, x, y,            // x,y en 0..1 (fracción del viewBox)
       debil,                    // true → doble borde (entidad débil)
       lado,                     // 'arriba'|'abajo'|'izq'|'der' — hacia dónde
                                 //   se abre el abanico de atributos
       abanico,                  // grados que abarca el abanico (default 110)
       radio,                    // distancia al centro (default 122)
       paso,                     // se revela en este paso del Stepper
       attrs:[{t, pk, multi, derivado, compuesto, paso}]
     }],
     relaciones:[{id, txt, x, y, de, a, card:['1','N'], debil, paso}]
   }

   API: .hasta(n) revela lo que tenga paso<=n · .resaltar([ids]) · .todo()
   ===================================================================== */
const MER_NS = 'http://www.w3.org/2000/svg';
function merNodo(tag, attrs) {
  const n = document.createElementNS(MER_NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}
/* Ancho aproximado de un texto en unidades de viewBox. No hace falta medir de
   verdad: las cajas llevan holgura y el texto va centrado, así que un error de
   un par de píxeles no se nota. 8.4 es el avance medio de la fuente del sistema
   a font-size 15 con las mayúsculas y tildes que aparecen acá. */
const merAncho = (t, f) => String(t).length * (f || 8.4);

function Mer(mount, spec) {
  const alto = spec.alto || 360, W = 1000;
  const wrap = el('div', { class: 'mer' });
  const svg = merNodo('svg', {
    viewBox: '0 0 ' + W + ' ' + alto, class: 'mer-svg',
    role: 'img', 'aria-label': spec.titulo || 'Modelo entidad-relación'
  });
  wrap.append(svg); mount.append(wrap);

  /* Tres capas: las líneas van debajo de todo, las cajas encima (así una línea
     que entra a un rectángulo queda tapada por el relleno y no hace falta
     recortarla), y las cardinalidades arriba del todo. */
  const gLineas = merNodo('g', {}), gFormas = merNodo('g', {}), gCard = merNodo('g', {});
  svg.append(gLineas, gFormas, gCard);

  const porId = {};        // id -> {g}
  const centro = {};       // id -> {x,y}
  const registrados = [];  // {g, paso}
  const poner = (g, paso) => registrados.push({ g: g, paso: paso == null ? 0 : paso });

  function texto(x, y, t, cls) {
    const n = merNodo('text', {
      x: x, y: y, class: cls || 'mer-txt',
      'text-anchor': 'middle', 'dominant-baseline': 'central'
    });
    n.textContent = t; return n;
  }

  /* ---- entidades ---- */
  (spec.entidades || []).forEach(e => {
    const cx = e.x * W, cy = e.y * alto;
    centro[e.id] = { x: cx, y: cy };
    const w = Math.max(112, merAncho(e.txt) + 34), h = 46;
    const g = merNodo('g', { class: 'mer-nodo' });
    g.append(merNodo('rect', {
      x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 6,
      class: 'mer-entidad' + (e.debil ? ' debil' : '')
    }));
    if (e.debil) g.append(merNodo('rect', {
      x: cx - w / 2 + 5, y: cy - h / 2 + 5, width: w - 10, height: h - 10, rx: 4,
      class: 'mer-entidad'
    }));
    g.append(texto(cx, cy, e.txt, 'mer-txt fuerte'));
    gFormas.append(g); porId[e.id] = { g: g }; poner(g, e.paso);

    /* ---- atributos: abanico alrededor de la entidad ---- */
    const attrs = e.attrs || [];
    if (!attrs.length) return;
    const base = { arriba: -90, abajo: 90, izq: 180, der: 0 }[e.lado || 'arriba'];
    const span = e.abanico == null ? 110 : e.abanico;
    const r = e.radio == null ? 122 : e.radio;
    attrs.forEach((a, i) => {
      const t = attrs.length === 1 ? 0.5 : i / (attrs.length - 1);
      const ang = (base - span / 2 + span * t) * Math.PI / 180;
      /* el abanico es elíptico (1.25 en x, 0.78 en y): los lienzos son mucho
         más anchos que altos, y un abanico circular apilaría los atributos
         fuera del viewBox por arriba. */
      const rx = Math.max(46, merAncho(a.t, 4.9) + 18), ry = 19;
      /* Los extremos del abanico se salen del viewBox cuando la entidad está
         cerca de un borde (una elipse ancha como "razón social" colgando de una
         entidad en x=.85 termina en 1052 de 1000, y el SVG la recorta sin
         avisar). Se limita el centro para que la elipse entera entre; en el peor
         caso dos atributos quedan más juntos, que es preferible a que uno quede
         cortado. Va acá y no en cada módulo: si no, cada diagrama nuevo tendría
         que descubrir el recorte a ojo. */
      const ax = Math.min(W - rx - 4, Math.max(rx + 4, cx + Math.cos(ang) * r * 1.25));
      const ay = Math.min(alto - ry - 4, Math.max(ry + 4, cy + Math.sin(ang) * r * 0.78));
      const ga = merNodo('g', { class: 'mer-nodo' });
      const ln = merNodo('line', {
        x1: cx, y1: cy, x2: ax, y2: ay,
        class: 'mer-linea' + (a.derivado ? ' punteada' : '')
      });
      gLineas.append(ln);
      ga.append(merNodo('ellipse', {
        cx: ax, cy: ay, rx: rx, ry: ry,
        class: 'mer-attr' + (a.derivado ? ' derivado' : '') + (a.multi ? ' multi' : '')
      }));
      if (a.multi) ga.append(merNodo('ellipse', { cx: ax, cy: ay, rx: rx - 5, ry: ry - 5, class: 'mer-attr' }));
      ga.append(texto(ax, ay, a.t, 'mer-txt' + (a.pk ? ' pk' : '') + (a.compuesto ? ' comp' : '')));
      gFormas.append(ga);
      const p = a.paso == null ? e.paso : a.paso;
      poner(ga, p);
      poner(ln, p);   // la línea vive en otra capa: se revela junto con su elipse
    });
  });

  /* ---- relaciones ---- */
  (spec.relaciones || []).forEach(rel => {
    const cx = rel.x * W, cy = rel.y * alto;
    centro[rel.id] = { x: cx, y: cy };
    const w = Math.max(132, merAncho(rel.txt) + 56), h = 64;
    const g = merNodo('g', { class: 'mer-nodo' });
    const rombo = (kx, ky) =>
      cx + ',' + (cy - ky) + ' ' + (cx + kx) + ',' + cy + ' ' +
      cx + ',' + (cy + ky) + ' ' + (cx - kx) + ',' + cy;
    g.append(merNodo('polygon', { points: rombo(w / 2, h / 2), class: 'mer-rel' + (rel.debil ? ' debil' : '') }));
    if (rel.debil) g.append(merNodo('polygon', { points: rombo(w / 2 - 7, h / 2 - 7), class: 'mer-rel' }));
    g.append(texto(cx, cy, rel.txt, 'mer-txt'));
    gFormas.append(g); porId[rel.id] = { g: g }; poner(g, rel.paso);

    [[rel.de, 0], [rel.a, 1]].forEach(par => {
      const p = centro[par[0]]; if (!p) return;
      const ln = merNodo('line', { x1: p.x, y1: p.y, x2: cx, y2: cy, class: 'mer-linea' });
      gLineas.append(ln); poner(ln, rel.paso);
      const et = (rel.card || [])[par[1]];
      if (et == null) return;
      /* la cardinalidad va al 32% del trayecto desde la entidad: cerca de ella,
         que es donde se lee ("un Dueño tiene N Mascotas"), pero fuera de la caja. */
      const k = 0.32, mx = p.x + (cx - p.x) * k, my = p.y + (cy - p.y) * k;
      const gc = merNodo('g', { class: 'mer-nodo' });
      gc.append(merNodo('circle', { cx: mx, cy: my, r: 14, class: 'mer-cardfondo' }));
      gc.append(texto(mx, my, et, 'mer-txt card'));
      gCard.append(gc); poner(gc, rel.paso);
    });
  });

  const M = { svg: svg, wrap: wrap };
  M.hasta = function (n) {
    registrados.forEach(r => r.g.classList.toggle('oculto', r.paso > n));
  };
  M.todo = () => M.hasta(Infinity);
  M.resaltar = function (ids) {
    svg.querySelectorAll('.mer-nodo').forEach(g => g.classList.remove('hl'));
    (ids || []).forEach(id => { if (porId[id]) porId[id].g.classList.add('hl'); });
  };
  M.limpiarMarcas = () => M.resaltar([]);
  M.todo();
  return M;
}

/* Diccionario de datos: la tabla oficial del curso (Entidad, Atributo, Tipo,
   Descripción, PK, FK, Nulo). Es siempre la misma estructura, así que se arma
   desde una lista de filas en vez de repetir el <table> en cada módulo. */
function Diccionario(mount, filas, opts) {
  const o = opts || {};
  const cols = o.columnas || ['Entidad', 'Atributo', 'Tipo de datos', 'Descripción', 'PK', 'FK', 'Nulo'];
  const wrap = el('div', { class: 'tabla-va dicc' });
  const t = el('table');
  t.append(el('thead', {}, el('tr', {}, cols.map(c => el('th', {}, c)))));
  const tb = el('tbody');
  const celdas = [];
  filas.forEach(f => {
    const tr = el('tr', {}), fs = [];
    f.forEach((v, i) => {
      const marca = (v === 'Sí');
      const td = el('td', { class: (i >= cols.length - 3 ? 'centro' : '') + (marca ? ' ok' : '') }, String(v));
      fs.push(td); tr.append(td);
    });
    celdas.push(fs); tb.append(tr);
  });
  t.append(tb); wrap.append(t); mount.append(wrap);
  return {
    celda: (f, c) => celdas[f][c],
    resaltar(pares) {
      celdas.forEach(f => f.forEach(c => c.classList.remove('hl')));
      (pares || []).forEach(p => { if (celdas[p[0]] && celdas[p[0]][p[1]]) celdas[p[0]][p[1]].classList.add('hl'); });
    }
  };
}
