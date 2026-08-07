/* ================================================================
   Biblioteca v3 "Observatorio" — núcleo: copia evolucionada de
   assets/js/nucleo.js con LA MISMA API PÚBLICA:
     Anim.registrar / Anim.mapa / Anim.ejes / Anim.flecha
     colorVar(nombre)
     window.alternarTema()
     window.abrirPaleta()
     scroll-spy del lateral + barra .progreso-lectura
   Cada página define window.RUTA_BASE antes de cargar esto, igual que v2.

   NOVEDADES v3:
   1) Buscador integrado de portada: si existe #buscador-hero (+ el panel
      #buscador-resultados), Ctrl+K / "/" enfocan esa barra y los
      resultados se pintan en el panel glass debajo (dropdown, no modal).
      Si no existe, se usa el modal glass de siempre (.paleta-fondo).
   2) Anim.revelar(selector, opciones) — animación de entrada con GSAP +
      ScrollTrigger (fade + rise, stagger, once:true). Si GSAP no cargó o
      el usuario pide prefers-reduced-motion, deja los elementos visibles
      sin animar (nunca los oculta a propósito).
   ================================================================ */
window.INDICE = window.INDICE || [];

/* ---------- tema ---------- */
(function () {
  var guardado = null;
  try { guardado = localStorage.getItem("biblioteca-tema"); } catch (e) {}
  document.documentElement.setAttribute("data-tema", guardado || "oscuro");
  window.alternarTema = function () {
    var nuevo = document.documentElement.getAttribute("data-tema") === "oscuro" ? "claro" : "oscuro";
    document.documentElement.setAttribute("data-tema", nuevo);
    try { localStorage.setItem("biblioteca-tema", nuevo); } catch (e) {}
    var btn = document.querySelector(".btn-tema");
    if (btn) btn.textContent = nuevo === "oscuro" ? "☀️" : "🌙";
    document.dispatchEvent(new CustomEvent("temacambiado"));
  };
})();

/* ---------- utilidades ---------- */
function colorVar(nombre) {
  return getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
}

/* ================================================================
   Anim v3 — MISMA REGLA DE ORO que v2: cada animación se registra con
   Anim.registrar("id-animacion", function (sim) { ... }) y corre
   AISLADA: si lanza un error, las demás siguen funcionando y el
   error se muestra en el propio panel (.anim-error).
   ================================================================ */
var Anim = (function () {
  var registradas = [];
  var iniciado = false;

  function medirCanvas(canvas, ctx) {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth;
    if (!w || w < 10) {
      var padre = canvas.parentElement;
      w = (padre && padre.clientWidth) || 720;
    }
    var h = parseInt(canvas.getAttribute("data-alto")) || 360;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: w, h: h };
  }

  function crearSim(cont) {
    var canvas = cont.querySelector("canvas");
    if (!canvas) throw new Error("El panel no tiene <canvas>");
    var ctx = canvas.getContext("2d");
    var medidas = medirCanvas(canvas, ctx);
    var corriendo = false, t = 0, ultimo = null, rafId = null;
    var dibujar = function () {};

    function pintar(dt) {
      ctx.clearRect(0, 0, medidas.w, medidas.h);
      dibujar(ctx, t, dt || 0, medidas.w, medidas.h);
    }
    function paso(ahora) {
      if (!corriendo) return;
      if (ultimo === null) ultimo = ahora;
      var dt = Math.min((ahora - ultimo) / 1000, 0.05);
      ultimo = ahora; t += dt;
      try { pintar(dt); } catch (e) { api.fallar(e); return; }
      rafId = requestAnimationFrame(paso);
    }

    var api = {
      canvas: canvas, ctx: ctx, cont: cont,
      get w() { return medidas.w; },
      get h() { return medidas.h; },
      alDibujar: function (fn) { dibujar = fn; api.redibujar(); },
      jugar: function () { if (!corriendo) { corriendo = true; ultimo = null; rafId = requestAnimationFrame(paso); } },
      pausar: function () { corriendo = false; if (rafId) cancelAnimationFrame(rafId); },
      alternar: function () { corriendo ? api.pausar() : api.jugar(); },
      estaCorriendo: function () { return corriendo; },
      reiniciar: function () { t = 0; ultimo = null; api.redibujar(); },
      redibujar: function () { try { pintar(0); } catch (e) { api.fallar(e); } },
      obtenerT: function () { return t; },
      fijarT: function (v) { t = v; api.redibujar(); },
      remedir: function () { medidas = medirCanvas(canvas, ctx); api.redibujar(); },
      slider: function (id, alCambiar, formato) {
        var inp = document.getElementById(id);
        if (!inp) throw new Error("No existe el slider #" + id);
        var etiqueta = inp.closest(".control") ? inp.closest(".control").querySelector(".valor") : null;
        function refrescar() {
          var v = parseFloat(inp.value);
          if (etiqueta) etiqueta.textContent = formato ? formato(v) : String(v);
          if (alCambiar) alCambiar(v);
        }
        inp.addEventListener("input", function () {
          try { refrescar(); } catch (e) { api.fallar(e); }
        });
        refrescar();
        return inp;
      },
      botones: function (acciones) {
        cont.querySelectorAll("[data-accion]").forEach(function (btn) {
          var acc = btn.getAttribute("data-accion");
          btn.addEventListener("click", function () {
            try {
              if (acc === "jugar") {
                api.alternar();
                btn.textContent = api.estaCorriendo() ? "⏸ Pausa" : "▶ Reproducir";
              } else if (acciones && acciones[acc]) {
                acciones[acc]();
              } else if (acc === "reiniciar") {
                api.reiniciar();
              }
            } catch (e) { api.fallar(e); }
          });
        });
      },
      fallar: function (e) {
        api.pausar();
        var caja = cont.querySelector(".anim-error");
        if (caja) {
          caja.style.display = "block";
          caja.textContent = "⚠️ Esta animación tuvo un error: " + (e && e.message ? e.message : e);
        }
        if (window.console && console.error) console.error("[Anim:" + cont.id + "]", e);
      }
    };
    return api;
  }

  function iniciarTodas() {
    if (iniciado) return;
    iniciado = true;
    registradas.forEach(function (r) {
      var cont = document.getElementById(r.id);
      if (!cont) { console.error("[Anim] no existe el contenedor #" + r.id); return; }
      var sim;
      try {
        sim = crearSim(cont);
        r.fn(sim);
        sim.redibujar();
      } catch (e) {
        if (sim) sim.fallar(e);
        else console.error("[Anim:" + r.id + "]", e);
        var caja = cont.querySelector(".anim-error");
        if (caja) { caja.style.display = "block"; caja.textContent = "⚠️ Esta animación no pudo iniciarse: " + (e && e.message ? e.message : e); }
      }
      if (sim) {
        window.addEventListener("resize", function () { try { sim.remedir(); } catch (e) {} });
        document.addEventListener("temacambiado", function () { try { sim.redibujar(); } catch (e) {} });
        r.sim = sim;
      }
    });
  }

  /* ---- helper de animaciones de entrada (GSAP + ScrollTrigger) ---- */
  function revelar(selector, opciones) {
    opciones = opciones || {};
    var els = typeof selector === "string" ? document.querySelectorAll(selector) : selector;
    if (!els || !els.length) return;
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido || typeof window.gsap === "undefined") {
      // sin GSAP o con reduced-motion: dejar todo visible tal cual, sin animar
      Array.prototype.forEach.call(els, function (el) {
        el.style.opacity = "";
        el.style.transform = "";
      });
      return;
    }
    var distancia = opciones.distancia != null ? opciones.distancia : 18;
    var duracion = opciones.duracion != null ? opciones.duracion : 0.7;
    var stagger = opciones.stagger != null ? opciones.stagger : 0.07;
    var retraso = opciones.retraso || 0;
    var props = {
      opacity: 0, y: distancia, duration: duracion, stagger: stagger,
      delay: retraso, ease: "power2.out", clearProps: "transform,opacity"
    };
    try {
      if (opciones.scroll === false) {
        window.gsap.from(els, props);
      } else {
        if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
        var trigger = opciones.disparador || els[0];
        window.gsap.from(els, Object.assign({}, props, {
          scrollTrigger: { trigger: trigger, start: opciones.inicio || "top 87%", once: true }
        }));
      }
    } catch (e) {
      // si GSAP falla por lo que sea, no dejar la página rota: mostrar todo
      Array.prototype.forEach.call(els, function (el) { el.style.opacity = ""; el.style.transform = ""; });
      if (window.console && console.error) console.error("[Anim.revelar]", e);
    }
  }

  return {
    registrar: function (idContenedor, fn) { registradas.push({ id: idContenedor, fn: fn }); },
    iniciarTodas: iniciarTodas,
    revelar: revelar,
    mapa: function (w, h, r) {
      return {
        x: function (v) { return (v - r.xMin) / (r.xMax - r.xMin) * w; },
        y: function (v) { return h - (v - r.yMin) / (r.yMax - r.yMin) * h; },
        invX: function (px) { return r.xMin + px / w * (r.xMax - r.xMin); },
        escalaX: w / (r.xMax - r.xMin),
        escalaY: h / (r.yMax - r.yMin)
      };
    },
    ejes: function (ctx, m, w, h) {
      ctx.save();
      ctx.strokeStyle = colorVar("--tinta-3") || "#888";
      ctx.lineWidth = 1; ctx.globalAlpha = .55;
      ctx.beginPath();
      var y0 = Math.max(0, Math.min(h, m.y(0)));
      var x0 = Math.max(0, Math.min(w, m.x(0)));
      ctx.moveTo(0, y0); ctx.lineTo(w, y0);
      ctx.moveTo(x0, 0); ctx.lineTo(x0, h);
      ctx.stroke();
      ctx.restore();
    },
    flecha: function (ctx, x1, y1, x2, y2, color, grosor) {
      ctx.save();
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = grosor || 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      var ang = Math.atan2(y2 - y1, x2 - x1), L = 9;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - L * Math.cos(ang - .45), y2 - L * Math.sin(ang - .45));
      ctx.lineTo(x2 - L * Math.cos(ang + .45), y2 - L * Math.sin(ang + .45));
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  };
})();

/* ---------- búsqueda: lógica compartida entre el dropdown de portada y el modal ---------- */
(function () {
  function normalizar(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function buscarLista(q) {
    q = normalizar((q || "").trim());
    if (q.length < 2) return [];
    var terminos = q.split(/\s+/);
    var lista = [];
    for (var i = 0; i < window.INDICE.length; i++) {
      var it = window.INDICE[i];
      var texto = normalizar(it.t + " " + it.c + " " + (it.k || ""));
      var titulo = normalizar(it.t);
      var ok = true, puntos = 0;
      for (var j = 0; j < terminos.length; j++) {
        if (texto.indexOf(terminos[j]) === -1) { ok = false; break; }
        puntos += titulo.indexOf(terminos[j]) !== -1 ? 2 : 1;
        if (titulo.indexOf(terminos[j]) === 0) puntos += 2;
      }
      if (ok) lista.push([puntos, it]);
    }
    lista.sort(function (a, b) { return b[0] - a[0]; });
    return lista.slice(0, 10).map(function (par) { return par[1]; });
  }

  function pintarResultados(panel, lista, base, marcado) {
    panel.innerHTML = "";
    if (!lista.length) {
      panel.innerHTML = '<div class="sin-resultados">Sin resultados.</div>';
      return;
    }
    lista.forEach(function (it, n) {
      var a = document.createElement("a");
      a.href = base + it.u;
      a.innerHTML = "<span></span><span class='curso-tag'></span>";
      a.firstChild.textContent = it.t;
      a.lastChild.textContent = it.c;
      if (n === marcado) a.classList.add("marcado");
      panel.appendChild(a);
    });
  }

  /* ---- modo A: dropdown integrado de portada (#buscador-hero) ---- */
  function iniciarHero(input, panel) {
    var base = window.RUTA_BASE || "./";
    var marcado = 0;

    function pintar() {
      var lista = buscarLista(input.value);
      marcado = Math.min(marcado, Math.max(0, lista.length - 1));
      if (input.value.trim().length >= 2) {
        pintarResultados(panel, lista, base, marcado);
        panel.classList.add("visible");
      } else {
        panel.classList.remove("visible");
        panel.innerHTML = "";
      }
    }
    function abrir() {
      var hero = document.getElementById("hero");
      if (hero) { try { hero.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) { hero.scrollIntoView(); } }
      input.focus();
      pintar();
    }
    input.addEventListener("input", function () { marcado = 0; pintar(); });
    input.addEventListener("focus", function () { if (input.value.trim().length >= 2) pintar(); });
    input.addEventListener("keydown", function (e) {
      var enlaces = panel.querySelectorAll("a");
      if (e.key === "ArrowDown") { e.preventDefault(); marcado = Math.min(marcado + 1, enlaces.length - 1); pintar(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); marcado = Math.max(marcado - 1, 0); pintar(); }
      else if (e.key === "Enter" && enlaces[marcado]) { window.location.href = enlaces[marcado].href; }
      else if (e.key === "Escape") { panel.classList.remove("visible"); input.blur(); }
    });
    document.addEventListener("click", function (e) {
      var lente = input.closest(".buscador-lente");
      if (lente && !lente.contains(e.target)) panel.classList.remove("visible");
    });
    window.abrirPaleta = abrir;
  }

  /* ---- modo B: modal glass (páginas de curso) ---- */
  function iniciarModal() {
    var fondo = document.createElement("div");
    fondo.className = "paleta-fondo";
    fondo.innerHTML =
      '<div class="paleta" role="dialog" aria-label="Buscar en la biblioteca">' +
      '<input type="text" placeholder="Buscar tema, fórmula, curso…" aria-label="Buscar">' +
      '<div class="resultados"></div>' +
      '<div class="pista">↑↓ navegar · Enter abrir · Esc cerrar</div>' +
      "</div>";
    document.body.appendChild(fondo);
    var caja = fondo.querySelector("input");
    var panel = fondo.querySelector(".resultados");
    var base = window.RUTA_BASE || "./";
    var marcado = 0;

    function pintar() {
      var lista = buscarLista(caja.value);
      marcado = Math.min(marcado, Math.max(0, lista.length - 1));
      pintarResultados(panel, lista, base, marcado);
    }
    function abrir() { fondo.classList.add("visible"); caja.value = ""; marcado = 0; panel.innerHTML = ""; caja.focus(); }
    function cerrar() { fondo.classList.remove("visible"); }

    caja.addEventListener("input", function () { marcado = 0; pintar(); });
    caja.addEventListener("keydown", function (e) {
      var enlaces = panel.querySelectorAll("a");
      if (e.key === "ArrowDown") { e.preventDefault(); marcado = Math.min(marcado + 1, enlaces.length - 1); pintar(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); marcado = Math.max(marcado - 1, 0); pintar(); }
      else if (e.key === "Enter" && enlaces[marcado]) { window.location.href = enlaces[marcado].href; }
      else if (e.key === "Escape") cerrar();
    });
    fondo.addEventListener("click", function (e) { if (e.target === fondo) cerrar(); });
    window.abrirPaleta = abrir;
  }

  function construir() {
    var inputHero = document.getElementById("buscador-hero");
    var panelHero = document.getElementById("buscador-resultados");
    if (inputHero && panelHero) iniciarHero(inputHero, panelHero);
    else iniciarModal();

    // atajo global: Ctrl/Cmd+K y "/" (fuera de inputs) abren la búsqueda activa
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); window.abrirPaleta(); }
      else if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); window.abrirPaleta(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", construir);
  else construir();
})();

/* ---------- arranque de página ---------- */
document.addEventListener("DOMContentLoaded", function () {
  // botón de tema
  var btn = document.querySelector(".btn-tema");
  if (btn) {
    btn.textContent = document.documentElement.getAttribute("data-tema") === "oscuro" ? "☀️" : "🌙";
    btn.addEventListener("click", window.alternarTema);
  }
  var btnBuscar = document.querySelector(".btn-buscar");
  if (btnBuscar) btnBuscar.addEventListener("click", function () { window.abrirPaleta(); });

  // KaTeX
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false
    });
  }

  // animaciones: DESPUÉS del layout (y de KaTeX, que puede mover cosas)
  requestAnimationFrame(function () { Anim.iniciarTodas(); });

  // scroll-spy del lateral + barra de progreso
  var enlaces = Array.prototype.slice.call(document.querySelectorAll(".lateral nav a[href^='#']"));
  var barra = document.querySelector(".progreso-lectura");
  if (enlaces.length) {
    var objetivos = enlaces.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });
    var alScroll = function () {
      var y = window.scrollY + 120;
      var activo = 0;
      for (var i = 0; i < objetivos.length; i++) {
        if (objetivos[i] && objetivos[i].offsetTop <= y) activo = i;
      }
      enlaces.forEach(function (a, i) { a.classList.toggle("activo", i === activo); });
      if (barra) {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        barra.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
  }
});
