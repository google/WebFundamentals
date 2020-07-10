project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Descubre todas las maneras de pausar código en Chrome DevTools.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Puntos de interrupción para pausar el código {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa puntos de interrupción para pausar el código JavaScript. En esta guía, se explican los distintos tipos
de puntos de interrupción disponibles en DevTools, cómo usarlos y cómo
configurarlos. Puedes encontrar un tutorial práctico del proceso de depuración en [Comenzar
a depurar JavaScript en Chrome
DevTools](/web/tools/chrome-devtools/javascript/).

## Descripción general del uso de cada tipo de punto de interrupción {: #overview }

El tipo más conocido de punto de interrupción es el de línea de código. Pero la configuración de puntos de interrupción
de línea de código puede no ser eficiente, en especial si no se sabe exactamente
dónde buscar o si se trabaja con una base de código de gran tamaño. Se puede ahorrar
tiempo durante la depuración si se sabe cómo y cuándo usar los demás tipos
de puntos de interrupción.

<table>
  <tr><th>Tipo de punto de interrupción</th><th>Se usa para pausar…</th></tr>
  <tr>
    <td><a href="#loc">Línea de código</a></td>
    <td>
      En una región de código exacta.
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">Línea de código condicional</a></td>
    <td>
      En una región de código exacta, pero solo cuando hay otra condición que es verdadera.
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      En código que cambia o quita un nodo de DOM
      específico, o alguno de sus elementos secundarios.
    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      Cuando una URL de XHR incluye un patrón de string.
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">Receptor de eventos</a></td>
    <td>
      En código que se ejecuta después de que se activa un evento, como
      <code>click</code>.
    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">Excepción</a></td>
    <td>
      En una línea de código que genera una excepción detectada
      o no detectada.
    </td>
  </tr>
  <tr>
    <td><a href="#function">Función</a></td>
    <td>
      Cuando se llama a una función específica.
    </td>
  </tr>
</table>

## Puntos de interrupción de línea de código {: #loc }

Los puntos de interrupción de línea de código se usan si se sabe cuál es la región de código exacta que se
necesita investigar. DevTools *siempre* hace una pausa antes de que se ejecute esta
línea de código.

Para definir un punto de interrupción de línea de código en DevTools:

1. Haz clic en la pestaña **Sources**.
1. Abre el archivo que incluye la línea de código donde deseas agregar la interrupción.
1. Ve a la línea de código.
1. A la izquierda de la línea de código se encuentra la columna del número de línea. Haz clic en ella. Aparecerá
   un ícono azul sobre la columna del número de línea.

<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="Un punto de interrupción de línea de código."
  <figcaption>
    <b>Figura 1</b>: Punto de interrupción de línea de código definido en la línea <b>29</b>
  </figcaption>
</figure>

### Puntos de interrupción de línea de código en el código {: #debugger }

Realiza una llamada a `debugger` desde el código para hacer una pausa en esa línea. Esto es equivalente a
un [punto de interrupción de línea de código](#loc), excepto que el punto de interrupción se define en el
código, no en la IU de DevTools.

    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### Puntos de interrupción de línea de código condicionales {: #conditional-loc }

Usa un punto de interrupción de línea de código condicional si sabes cuál es la región de
código exacta que necesitas investigar, pero deseas pausar solo si hay alguna
otra condición que es verdadera.

Para definir un punto de interrupción de línea de código condicional:

1. Haz clic en la pestaña **Sources**.
1. Abre el archivo que incluye la línea de código donde deseas agregar la interrupción.
1. Ve a la línea de código.
1. A la izquierda de la línea de código se encuentra la columna del número de línea. Haz clic con el botón secundario en ella.
1. Selecciona **Add conditional breakpoint**. Aparecerá un diálogo debajo de la
   línea de código.
1. Ingresa la condición en el diálogo.
1. Presiona <kbd>Intro</kbd> para activar el punto de interrupción. Aparecerá un ícono naranja
   encima de la columna del número de línea.

<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt="Un punto de interrupción de código de línea condicional."
  <figcaption>
    <b>Figura 2</b>: Punto de interrupción de línea de código condicional definido en la línea
    <b>32</b>
  </figcaption>
</figure>

### Administración de puntos de interrupción de línea de código {: #manage-loc }

Utiliza el panel **Breakpoints** para inhabilitar o quitar puntos de interrupción de código de línea para
una sola ubicación.

<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="El panel Breakpoints."
  <figcaption>
    <b>Figura 3</b>: Panel <b>Breakpoints</b> con dos puntos de interrupción
    de línea de código, uno en la línea 15 de <code>get-started.js</code> y otro en
    la línea 32
  </figcaption>
</figure>

* Marca la casilla de verificación que se encuentra junto a una entrada para inhabilitar ese punto de interrupción.
* Haz clic con el botón secundario en una entrada para quitar ese punto de interrupción.
* Haz clic con el botón secundario en cualquier lugar del panel **Breakpoints** para desactivar, inhabilitar o quitar todos los
  puntos de interrupción. Inhabilitar
  todos los puntos de interrupción es equivalente a desmarcar cada uno de ellos. La desactivación de todos los
  puntos de interrupción indica a DevTools que se deben ignorar todos los puntos de interrupción de línea de código, pero que
  también se debe conservar el estado de habilitado para que queden en el mismo
  estado que antes cuando se los reactive.

<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="Puntos de interrupción desactivados en el panel Breakpoints."
  <figcaption>
    <b>Figura 4</b>: Los puntos de interrupción desactivados en el panel <b>Breakpoints</b>
    están inhabilitados y son transparentes
  </figcaption>
</figure>

## Puntos de interrupción de cambio de DOM {: #dom }

Usa un punto de interrupción de cambio de DOM cuando desees hacer una pausa en el código que cambie
un nodo del DOM o alguno de sus elementos secundarios.

Para definir un punto de interrupción de cambio de DOM:

1. Haz clic en la pestaña **Elements**.
1. Ve al elemento en el que deseas establecer el punto de interrupción.
1. Haz clic con el botón secundario en el elemento.
1. Coloca el cursor sobre **Break on** y selecciona **Subtree modifications**, **Attribute
  modifications** o **Node removal**.

<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="Menú contextual para la creación de un punto de interrupción de cambio de DOM."
  <figcaption>
    <b>Figura 5</b>: Menú contextual para la creación de un punto de interrupción de cambio de DOM
  </figcaption>
</figure>

### Tipos de puntos de interrupción de cambio de DOM {: #dom-types }

* **Modificaciones de subárboles**: Se ejecuta cuando se quita o se agrega un elemento secundario del nodo
  actualmente seleccionado o cuando se modifica el contenido de un elemento secundario. No
  se ejecuta cuando cambian los atributos de un nodo secundario ni cuando se realizan cambios en el
  nodo actualmente seleccionado.

* **Modificaciones de atributos**: Se ejecuta cuando se agrega o se quita un atributo
  en el nodo actualmente seleccionado o cuando se cambia el valor de un atributo.

* **Eliminación de nodos**: Se ejecuta cuando se quita el nodo actualmente seleccionado.

## Puntos de interrupción XHR/Fetch {: #xhr }

Usa un punto de interrupción XHR si deseas interrumpir cuando la URL de solicitud de una XHR
incluye una string especificada. DevTools hace una pausa en la línea de código donde la
XHR llama a `send()`.

Note: Esta función también se usa con las solicitudes [Fetch][Fetch].

Por ejemplo, esto es útil cuando ves que la
página solicita una URL incorrecta y deseas encontrar con rapidez el código fuente de AJAX o
Fetch que causa dicha solicitud incorrecta.

Para definir un punto de interrupción XHR:

1. Haz clic en la pestaña **Sources**.
1. Expande el panel **XHR Breakpoints**.
1. Haz clic en **Add breakpoint**.
1. Ingresa la string donde deseas realizar la interrupción. DevTools hace una pausa cuando la
   string está presente en una URL de solicitud XHR.
1. Presiona <kbd>Intro</kbd> para confirmar.

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="Creación de un punto de interrupción XHR."
  <figcaption>
    <b>Figura 6</b>: Creación de un punto de interrupción XHR en <b>XHR Breakpoints</b>
    para solicitudes que incluyan <code>org</code> en la URL
  </figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Puntos de interrupción de receptor de eventos {: #event-listeners }

Usa los puntos de interrupción de receptor de eventos cuando desees hacer una pausa en el código
del receptor de eventos que se ejecuta después de la activación de un evento. Puedes seleccionar eventos específicos,
como `click`, o categorías de eventos, como todos los eventos de mouse.

1. Haz clic en la pestaña **Sources**.
1. Expande el panel **Event Listener Breakpoints**. DevTools muestra una lista
   de categorías de eventos, como **Animation**.
1. Marca una de estas categorías para hacer una pausa siempre que se active un evento de
   esa categoría, o expande la categoría y marca un evento específico.

<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="Creación de un punto de interrupción de receptor de eventos."
  <figcaption>
    <b>Figura 7</b>: Creación de un punto de interrupción de receptor de eventos para
    <code>deviceorientation</code>
  </figcaption>
</figure>

## Puntos de interrupción de excepción {: #exceptions }

Usa puntos de interrupción de excepción cuando desees hacer una pausa en la línea de código que
genera una excepción detectada o no detectada.

1. Haz clic en la pestaña **Sources**.
1. Haz clic en **Pause on exceptions** ![Pause on
   exceptions](imgs/pause-on-exceptions.png){:.devtools-inline}. Cuando se habilita,
   se pone de color azul.
1. (Opcional) Marca la casilla de verificación **Pause On Caught Exceptions** si también
   quieres hacer una pausa en las excepciones detectadas, además de las no detectadas.

<figure>
  <img src="imgs/uncaught-exception.png"
       alt="Pausa en una excepción no detectada."
  <figcaption>
    <b>Figura 7</b>: Pausa en una excepción no detectada
  </figcaption>
</figure>

## Puntos de interrupción de función {: #function }

Llama a `debug(functionName)`, donde `functionName` es la función que quieres
depurar, cuando desees hacer una pausa cada vez que se llame a una función específica. Puedes
insertar `debug()` en el código (como instrucción `console.log()`) o llamarla
desde la consola de DevTools. `debug()` es equivalente a definir un
[punto de interrupción de línea de código](#loc) en la primera línea de la función.

    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### Asegúrate de que la función objetivo esté dentro del alcance. {: #scope }

DevTools genera un `ReferenceError` si la función que deseas depurar no está
dentro del alcance.

    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

Asegurarse de que la función objetivo esté dentro del alcance puede ser difícil si
la llamada a `debug()` se hace desde la consola de DevTools. La siguiente es una estrategia posible:

1. Define un [punto de interrupción de línea de código](#loc) en un lugar donde la función esté
   dentro del alcance.
1. Activa el punto de interrupción.
1. Llama a `debug()` en la consola de DevTools mientras el código esté en pausa
   en el punto de interrupción de línea de código.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
