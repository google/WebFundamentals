project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools ofrece herramientas para ayudarte a aplicar correcciones en páginas web en las que se produzcan excepciones y a depurar errores de tu JavaScript.

{# wf_updated_on: 2015-05-12 #}
{# wf_published_on: 2015-04-13 #}

# Manejar excepciones y errores {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools ofrece herramientas para ayudarte a aplicar correcciones en páginas web en las que se produzcan excepciones y a depurar errores de tu JavaScript.

Las excepciones de página y los errores de JavaScript pueden resultar bastante útiles si entiendes por qué ocurren. Cuando en la página se produce inicia una excepción o la secuencia de comandos produce un error, la consola proporciona información específica y confiable que te ayuda a ubicar y solucionar el problema. 

En la consola, puedes realizar el seguimiento de excepciones y recorrer las rutas de acceso de ejecución que las ocasionaron, detectarlas explícitamente o implícitamente (o ignorarlas), e incluso establecer administradores de error para recopilar y procesar automáticamente los datos de excepciones.


### TL;DR {: .hide-from-toc }
- Activa la pausa en excepciones para depurar el contexto del código cuando se desencadene la excepción.
- Imprime la pila de llamadas actual de JavaScript con <code>console.trace</code>.
- Dispón aserciones en tu código y genera excepciones con <code>console.assert()</code>.
- Registra los errores que se producen en el navegador con <code>window.onerror</code>.


## Realizar el seguimiento de excepciones

Cuando haya un inconveniente, abre la consola de DevTools (`Ctrl+Shift+J`/`Cmd+Option+J`) para ver los mensajes de error de JavaScript.
En cada mensaje, hay un vínculo con el nombre del archivo y el número de línea a los que puedes acceder.

Ejemplo de una excepción:
![Ejemplo de una excepción](images/track-exceptions-tracking-exceptions.jpg)

### Ver el seguimiento de pila de excepciones

No siempre está completamente claro cuál fue la ruta de acceso de ejecución que ocasiona un error.
Las pilas de llamadas completas de JavaScript incluyen excepciones en la consola.
Expande estos mensajes de la consola para ver los marcos de pila y navegar hasta las ubicaciones correspondientes del código:

![Seguimiento de pila de la excepciones](images/track-exceptions-exception-stack-trace.jpg)

### Aplicar pausas en excepciones de JavaScript

La próxima vez que ocurra una excepción,
pausa la ejecución de JavaScript e inspecciona la pila de llamadas de esta,
el ámbito de las variables y el estado de tu app.
En la parte inferior del panel Scripts, hay un botón de tres estados que te permite detener y cambiar distintos modos de administración de excepciones: ![Botón de pausa](images/track-exceptions-pause-gray.png){:.inline}

Puedes aplicar pausas en todas las excepciones o solo en las no detectadas, o bien directamente ignorarlas a todas.

![Pausar la ejecución](images/track-exceptions-pause-execution.jpg)

## Imprimir seguimientos de pila

Imprime mensajes
de registros en la consola para conocer en profundidad el comportamiento de tu página web.
Incluye seguimientos de pila asociados para que las entradas del registro sean más informativas. Hay varias formas de hacer esto.

### Error.stack
Cada objeto Error tiene una propiedad del tipo string llamada stack que contiene el seguimiento de pila:

![Ejemplo de Error.stack](images/track-exceptions-error-stack.jpg)

### console.trace()

Incluye llamadas a [`console.trace()`](./console-reference#consoletraceobject) en tu código para imprimir las pilas de llamadas de JavaScript actuales.

![Ejemplo de console.trace()](images/track-exceptions-console-trace.jpg)

### console.assert()

Dispón aserciones en tu código JavaScript: llama a [`console.assert()`](./console-reference#consoleassertexpression-object)
con la condición del error como el primer parámetro.
Cuando esta expresión se evalúe como false,
aparecerá un registro correspondiente de la consola.

![Ejemplo de console.assert()](images/track-exceptions-console-assert.jpg)

## Cómo examinar el seguimiento de pila para hallar desencadenadores

Veremos cómo usar las herramientas tratadas recién
y encontraremos la verdadera causa de un error.
Aquí se muestra una página HTML simple que incluye dos secuencias de comandos:

![Ejemplo de código](images/track-exceptions-example-code.png)

Cuando el usuario hace clic en la página,
el párrafo cambia su texto interno
y se llama a la función `callLibMethod()` provista por `lib.js`.

Esta función imprime un `console.log`
y después llama a `console.slog`,
un método que no provee la API de la consola.
Esto debería activar un error.

Cuando la página se ejecuta y haces clic en ella,
aparece este error:

![Error activado](images/track-exceptions-example-error-triggered.png)

Haz clic en la flecha para expandir el mensaje de error:

![Mensaje de error expandido](images/track-exceptions-example-error-message-expanded.png)

La consola indica que el error se activó en la línea 4 de `lib.js`,
que recibió una llamada de `script.js`, en el callback `addEventListener`,
una función anónima, en la línea 3.

Se trata de un ejemplo muy simple,
pero incluso en las depuraciones de seguimientos de registros más complicadas se emplea el mismo proceso.

## Administrar excepciones de tiempo de ejecución con window.onerror

Chrome expone la función del controlador `window.onerror`,
a la cual se llama cuando ocurre un error en la ejecución del código JavaScript.
Cuando se activa una excepción JavaScript en el contexto de la ventana y
un bloque Try/Catch no la detecta,
la función se invoca con el mensaje de la excepción,
la URL del archivo donde se activó la excepción
y el número de línea de dicho archivo
(se pasan como argumentos en ese orden).

Probablemente te resulte útil establecer un controlador de error que recolecte información sobre excepciones no detectadas y la devuelva a tu servidor con una llamada a AJAX POST, por ejemplo. De esta forma, puedes registrar todos los errores que se produzcan en el navegador del usuario y recibir notificaciones de dichos errores.

Ejemplo de uso de `window.onerror`:

![Ejemplo del controlador window.onerror](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
