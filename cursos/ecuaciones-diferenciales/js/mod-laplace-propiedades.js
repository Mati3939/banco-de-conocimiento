/* contenidoOficial original (índice a cubrir):
   - Fórmulas elementales
   - Propiedades de la transformada de Laplace */
registerModule({id:'laplace-propiedades',title:'Fórmulas elementales y propiedades',unidad:'III',semanas:[12],evaluacion:['control-4'],
  lead:'Una tabla de transformadas elementales y un puñado de propiedades —traslación, derivadas, multiplicación por t— evitan volver a integrar cada vez que aparece una función nueva.',
  build(sec){

    /* -------- Card 1: tabla de transformadas elementales -------- */
    const c1=el('div',{class:'card'});
    c1.append(el('h3',{},'Tabla de transformadas elementales'));
    c1.append(el('p',{},'$\\mathcal{L}\\{1\\}$, $\\mathcal{L}\\{e^{at}\\}$ y $\\mathcal{L}\\{t\\}$ ya se calcularon desde la definición en el tema "Definición y linealidad de la transformada". El resto de esta tabla se obtiene con el mismo procedimiento (integrar, o aplicar por partes repetidamente); se listan directo para no repetir la derivación:'));
    Tabla(c1,{columnas:['$f(t)$','$F(s)=\\mathcal{L}\\{f(t)\\}$'],filas:[
      ['$1$','$\\dfrac1s$'],
      ['$t^n$ ($n=0,1,2,\\dots$)','$\\dfrac{n!}{s^{n+1}}$'],
      ['$e^{at}$','$\\dfrac{1}{s-a}$'],
      ['$\\sin(kt)$','$\\dfrac{k}{s^2+k^2}$'],
      ['$\\cos(kt)$','$\\dfrac{s}{s^2+k^2}$']
    ]});
    c1.append(el('p',{class:'note'},'Las filas de $1$, $t^n$ y $e^{at}$ son las que ya se verificaron desde la definición en el tema "Definición y linealidad de la transformada" (con $n=0$ y $n=1$). Las de $\\sin(kt)$ y $\\cos(kt)$ salen del mismo tipo de integral (por partes, dos veces, resolviendo un sistema porque la integral "se repite" tras la segunda aplicación) — no se rederivan acá porque no aportan una técnica nueva a las ya vistas.'));
    c1.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tabla de "Definición y transformadas básicas"; nota "Transformada de Laplace" del vault (mismas filas).'));
    sec.append(c1);

    /* -------- Card 2: primer teorema de traslación -------- */
    const c2=el('div',{class:'card'});
    c2.append(el('h3',{},'Primer teorema de traslación (desplazamiento en $s$)'));
    c2.append(el('p',{},'Multiplicar $f(t)$ por $e^{at}$ antes de transformar equivale a correr $F(s)$ una distancia $a$:'));
    c2.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{e^{at}f(t)\\} = F(s-a)$$'}));
    c2.append(el('p',{},'Sale directo de la definición: el factor $e^{at}$ se combina con el $e^{-st}$ de la integral, igual que en el cálculo de $\\mathcal{L}\\{e^{at}\\}$ del tema "Definición y linealidad de la transformada":'));
    Pasos(c2,[
      {tex:'\\mathcal{L}\\{e^{at}f(t)\\} = \\int_0^\\infty e^{-st}\\,e^{at}f(t)\\,dt',nota:'Se aplica la definición al producto e^{at}f(t).'},
      {tex:'= \\int_0^\\infty e^{-(s-a)t}f(t)\\,dt',nota:'Se agrupan los dos exponentes en uno solo, e^{-(s-a)t}.'},
      {tex:'= F(s-a)',nota:'Esta integral es exactamente F evaluada en (s-a) en vez de en s — la misma integral que define F(s), con s reemplazado por s-a.'}
    ],{modId:'laplace-propiedades',titulo:'Primer teorema de traslación: L{e^{at}f(t)}=F(s−a)'});
    c2.append(el('p',{},'Ejemplo: $\\mathcal{L}\\{e^{2t}\\cos(3t)\\}$. Con $f(t)=\\cos(3t)$, $F(s)=\\dfrac{s}{s^2+9}$ (tabla), y $a=2$:'));
    c2.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{e^{2t}\\cos3t\\} = F(s-2) = \\dfrac{s-2}{(s-2)^2+9}$$'}));
    c2.append(el('p',{class:'note'},'Regla práctica: en la transformada de $\\cos(3t)$, cada "$s$ suelta" se reemplaza por "$s-2$" — nunca solo el $s$ del numerador ni solo el del denominador.'));
    c2.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), fila "desplazamiento en s" de la tabla en "Definición y transformadas básicas"; la demostración desde la definición y el ejemplo son elaboración propia, verificados arriba.'));
    sec.append(c2);

    /* -------- Card 3: segundo teorema de traslación -------- */
    const c3=el('div',{class:'card'});
    c3.append(el('h3',{},'Segundo teorema de traslación (desplazamiento en $t$)'));
    c3.append(el('p',{},'El otro sentido: retrasar una función en el tiempo (y "apagarla" antes de que arranque) multiplica su transformada por una exponencial. El retraso se escribe con la ',el('b',{},'función escalón unitario'),' $u(t-a)$, que vale $0$ antes de $t=a$ y $1$ desde ahí en adelante:'));
    c3.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{f(t-a)\\,u(t-a)\\} = e^{-as}F(s) \\qquad\\Longleftrightarrow\\qquad \\mathcal{L}^{-1}\\{e^{-as}F(s)\\} = f(t-a)\\,u(t-a)$$'}));
    c3.append(el('p',{},'con $a\\geq0$ y $F(s)=\\mathcal{L}\\{f(t)\\}$ la transformada de la función ',el('b',{},'sin'),' retraso. Un caso particular útil, con $f(t)=1$ (así $F(s)=1/s$):'));
    c3.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{u(t-a)\\} = \\dfrac{e^{-as}}{s}$$'}));
    c3.append(el('p',{},'Ejemplo: $\\mathcal{L}\\{(t-2)^3u(t-2)\\}$. Con $f(t)=t^3$, $F(s)=6/s^4$ (tabla, $n=3$: $3!=6$), y $a=2$:'));
    c3.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{(t-2)^3u(t-2)\\} = e^{-2s}\\cdot\\dfrac{6}{s^4}$$'}));
    c3.append(el('p',{class:'note'},'El error más común con este teorema: aplicarlo a una función escrita en términos de $t$ sin haberla reescrito antes en términos de $(t-a)$. Este tema deja la herramienta lista; usarla para resolver una EDO con una entrada que se enciende en $t=a$ —incluyendo la función escalón completa y un pulso rectangular— se retoma en el tema "Resolución de EDO, convolución y Heaviside".'));
    c3.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Función escalón unitario (Heaviside) y traslación en t" (unidad de forzamiento discontinuo); el ejemplo con $(t-2)^3u(t-2)$ es elaboración propia, verificado arriba.'));
    sec.append(c3);

    /* -------- Card 4: transformada de derivadas y de integrales -------- */
    const c4=el('div',{class:'card'});
    c4.append(el('h3',{},'Transformada de derivadas y de integrales'));
    c4.append(el('p',{},'Esta es la propiedad que hace que Laplace sirva para resolver EDO: transforma una derivada en una expresión puramente algebraica, incorporando la condición inicial en el mismo paso. Con $y(0)$, $y\'(0)$ los valores en $t=0$:'));
    c4.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{y\'(t)\\} = sY(s)-y(0)$$'}));
    c4.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{y\'\'(t)\\} = s^2Y(s)-sy(0)-y\'(0)$$'}));
    c4.append(el('p',{},'La primera sale de integrar por partes:'));
    Pasos(c4,[
      {tex:'\\mathcal{L}\\{y\'(t)\\} = \\int_0^\\infty e^{-st}y\'(t)\\,dt',nota:'Se aplica la definición a f(t)=y′(t).'},
      {tex:'u=e^{-st},\\ dv=y\'(t)dt\\ \\Rightarrow\\ du=-se^{-st}dt,\\ v=y(t)',nota:'Integración por partes, eligiendo derivar la exponencial (que sí se puede volver a integrar).'},
      {tex:'= \\big[e^{-st}y(t)\\big]_0^\\infty + s\\int_0^\\infty e^{-st}y(t)\\,dt',nota:'Fórmula de partes: ∫u\\,dv=uv-∫v\\,du, con el signo ya distribuido.'},
      {tex:'= (0-y(0)) + s\\,Y(s) = sY(s)-y(0)',nota:'El término de borde se anula en el infinito (y de orden exponencial) y en t=0 da −y(0); la integral que queda es, por definición, Y(s).'}
    ],{modId:'laplace-propiedades',titulo:'Transformada de y′: L{y′}=sY(s)−y(0)'});
    c4.append(el('p',{class:'note'},'Aplicando el mismo resultado a $y\'$ en vez de a $y$ se obtiene la de $y\'\'$: $\\mathcal{L}\\{y\'\'\\}=s\\mathcal{L}\\{y\'\\}-y\'(0)=s\\big(sY(s)-y(0)\\big)-y\'(0)=s^2Y(s)-sy(0)-y\'(0)$. El patrón sigue para órdenes mayores, siempre restando las condiciones iniciales con potencias decrecientes de $s$.'));
    c4.append(el('p',{},'La operación inversa —integrar en vez de derivar— divide por $s$ en lugar de multiplicar. Con $g(t)=\\displaystyle\\int_0^t f(\\tau)\\,d\\tau$ (así $g(0)=0$, $g\'(t)=f(t)$):'));
    c4.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\left\\{\\int_0^t f(\\tau)\\,d\\tau\\right\\} = \\dfrac{F(s)}{s}$$'}));
    c4.append(el('p',{class:'note'},'Se deduce de la fórmula de $\\mathcal{L}\\{y\'\\}$ ya probada arriba: $\\mathcal{L}\\{g\'\\}=sG(s)-g(0)=sG(s)$ (porque $g(0)=0$); y $\\mathcal{L}\\{g\'\\}=\\mathcal{L}\\{f\\}=F(s)$ porque $g\'=f$. Igualando, $sG(s)=F(s)$, de donde $G(s)=F(s)/s$. Verificación con $f(t)=\\sin t$: $\\int_0^t\\sin\\tau\\,d\\tau=1-\\cos t$, y $\\mathcal{L}\\{1-\\cos t\\}=\\dfrac1s-\\dfrac{s}{s^2+1}=\\dfrac{1}{s(s^2+1)}$ — que es justo $F(s)/s$ con $F(s)=1/(s^2+1)$.'));
    c4.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Transformada inversa y solución de un PVI" (fórmulas de $\\mathcal{L}\\{y\'\\}$ y $\\mathcal{L}\\{y\'\'\\}$, sin demostración); la demostración por partes y la propiedad de la integral (no cubierta en v3 ni en las notas del vault) son desarrollo estándar, elaboración propia, verificadas arriba.'));
    sec.append(c4);

    /* -------- Card 5: derivada de la transformada -------- */
    const c5=el('div',{class:'card'});
    c5.append(el('h3',{},'Derivada de la transformada (multiplicación por $t$)'));
    c5.append(el('p',{},'Multiplicar $f(t)$ por $t$ antes de transformar equivale a derivar $F(s)$ respecto de $s$ (con signo cambiado); la versión general, con $t^n$, deriva $n$ veces:'));
    c5.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{t\\,f(t)\\} = -\\dfrac{d}{ds}F(s), \\qquad \\mathcal{L}\\{t^n f(t)\\} = (-1)^n\\dfrac{d^n}{ds^n}F(s)$$'}));
    c5.append(el('p',{},'Ejemplo: $\\mathcal{L}\\{t\\cos(2t)\\}$, con $F(s)=\\dfrac{s}{s^2+4}$ (tabla, $k=2$). Por la regla del cociente, $\\dfrac{d}{ds}\\Big(\\dfrac{s}{s^2+4}\\Big)=\\dfrac{(s^2+4)-s(2s)}{(s^2+4)^2}=\\dfrac{4-s^2}{(s^2+4)^2}$, y con el signo negativo de la propiedad:'));
    c5.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{t\\cos2t\\} = \\dfrac{s^2-4}{(s^2+4)^2}$$'}));
    c5.append(el('p',{},'Y para $\\mathcal{L}\\{t^2e^t\\}$, con $F(s)=\\dfrac{1}{s-1}$: derivando dos veces, $F\'(s)=-\\dfrac{1}{(s-1)^2}$ y $F\'\'(s)=\\dfrac{2}{(s-1)^3}$. Con signo $(-1)^2=+1$:'));
    c5.append(el('div',{class:'formula',html:'$$\\mathcal{L}\\{t^2e^t\\} = \\dfrac{2}{(s-1)^3}$$'}));
    c5.append(el('p',{class:'note'},'No olvidar el signo negativo en el caso $n=1$: es fácil derivar $F(s)$ bien y olvidarse de cambiarle el signo al resultado.'));
    c5.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Definición y transformadas básicas" (fórmula y ambos ejemplos); cálculos rehechos y verificados acá.'));
    sec.append(c5);

    /* -------- Card 6: transformada inversa y fracciones parciales -------- */
    const c6=el('div',{class:'card'});
    c6.append(el('h3',{},'Transformada inversa y fracciones parciales'));
    c6.append(el('p',{},'$\\mathcal{L}^{-1}$ deshace la transformada: dado $F(s)$, encuentra la $f(t)$ tal que $\\mathcal{L}\\{f(t)\\}=F(s)$. Como $\\mathcal{L}$ es lineal, $\\mathcal{L}^{-1}$ también lo es, así que la técnica es leer la tabla de esta card ',el('b',{},'al revés'),', término a término, después de descomponer $F(s)$ en piezas que sí estén en la tabla — normalmente con ',el('b',{},'fracciones parciales'),' y, si el denominador es cuadrático irreducible, ',el('b',{},'completando el cuadrado'),'.'));
    c6.append(el('p',{},'Ejemplo 1 — denominador cuadrático irreducible: $\\mathcal{L}^{-1}\\Big\\{\\dfrac{s}{s^2+4s+5}\\Big\\}$. Completando el cuadrado, $s^2+4s+5=(s+2)^2+1$, y separando el numerador para que aparezca $(s+2)$ (para el desplazamiento del primer teorema de traslación de esta card):'));
    Pasos(c6,[
      {tex:'\\dfrac{s}{s^2+4s+5} = \\dfrac{s}{(s+2)^2+1} = \\dfrac{(s+2)-2}{(s+2)^2+1}',nota:'Se completa el cuadrado en el denominador y se reescribe s=(s+2)−2 en el numerador.'},
      {tex:'= \\dfrac{s+2}{(s+2)^2+1} - \\dfrac{2}{(s+2)^2+1}',nota:'Se separa en dos fracciones, cada una ya con la forma F(s−a) de cos y de sen desplazados.'},
      {tex:'\\mathcal{L}^{-1}\\left\\{\\dfrac{s}{s^2+4s+5}\\right\\} = e^{-2t}\\cos t - 2e^{-2t}\\sin t',nota:'Primer teorema de traslación con a=−2 sobre L^{-1}{s/(s²+1)}=cos t y L^{-1}{1/(s²+1)}=sen t.'}
    ],{modId:'laplace-propiedades',titulo:'L⁻¹{s/(s²+4s+5)} completando el cuadrado'});
    c6.append(el('p',{},'Ejemplo 2 — fracciones parciales con raíces reales distintas: $\\mathcal{L}^{-1}\\Big\\{\\dfrac{3s+1}{(s-1)(s+2)}\\Big\\}$.'));
    Pasos(c6,[
      {tex:'\\dfrac{3s+1}{(s-1)(s+2)} = \\dfrac{A}{s-1}+\\dfrac{B}{s+2}',nota:'Planteo estándar de fracciones parciales con raíces simples.'},
      {tex:'3s+1=A(s+2)+B(s-1)',nota:'Se multiplica todo por (s-1)(s+2) para quitar denominadores.'},
      {tex:'s=1:\\ 4=3A\\Rightarrow A=\\tfrac43 \\qquad s=-2:\\ -5=-3B\\Rightarrow B=\\tfrac53',nota:'Se evalúa en cada raíz del denominador para despejar A y B por separado.'},
      {tex:'\\mathcal{L}^{-1}\\left\\{\\dfrac{3s+1}{(s-1)(s+2)}\\right\\} = \\dfrac43 e^{t} + \\dfrac53 e^{-2t}',nota:'Se lee la tabla al revés en cada fracción: 1/(s−a) → e^{at}.'}
    ],{modId:'laplace-propiedades',titulo:'L⁻¹{(3s+1)/((s−1)(s+2))} con fracciones parciales'});
    c6.append(el('p',{class:'note'},'Verificación del ejemplo 2: $A+B=\\tfrac43+\\tfrac53=3$ debe igualar el coeficiente de $s$ en $3s+1$ (sí, 3); y $2A-B=\\tfrac83-\\tfrac53=1$ debe igualar el término constante (sí, 1) — comprobando que $A(s+2)+B(s-1)=3s+1$ para todo $s$, no solo en las dos raíces usadas para despejar.'));
    c6.append(el('details',{},
      el('summary',{},'Ejercicio: calcular $\\mathcal{L}^{-1}\\Big\\{\\dfrac{1}{4s^2+1}\\Big\\}$.'),
      el('div',{},
        el('div',{class:'formula',html:'$$\\dfrac{1}{4s^2+1} = \\dfrac12\\cdot\\dfrac{1/2}{s^2+1/4}$$'}),
        el('p',{class:'note'},'Se saca el 4 de factor común en el denominador ($\\tfrac14\\cdot\\tfrac{1}{s^2+1/4}$) y se reescribe para que el numerador sea justo $k=1/2$, la forma $k/(s^2+k^2)$ de la tabla — si no, no calza con ninguna fila.'),
        el('div',{class:'formula',html:'$$\\mathcal{L}^{-1}\\left\\{\\dfrac{1}{4s^2+1}\\right\\}=\\dfrac12\\sin\\!\\Big(\\dfrac12t\\Big)$$'})
      )));
    c6.append(el('p',{class:'fuente'},'Fuente: index-v3.html (contenido auditado), tema "Transformada inversa y solución de un PVI" (ejemplo 1 con $s/(s^2+4s+5)$, y el ejercicio de $1/(4s^2+1)$); el ejemplo 2 con fracciones parciales de raíces reales distintas —no cubierto en v3 ni en las notas del vault— es elaboración propia, verificado arriba.'));
    sec.append(c6);
  }});
