project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En esta guía se exploran las reglas de PageSpeed Insights en contexto: a qué debes prestar atención cuando optimices la ruta de acceso de representación crítica y por qué.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Reglas y recomendaciones de PageSpeed {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

En esta guía se exploran las reglas de PageSpeed Insights en contexto: a qué debes prestar atención cuando optimices la ruta de acceso de representación crítica y por qué.


## Elimina el lenguaje JavaScript y CSS que bloquea la representación

Para lograr el menor tiempo en la primera representación, debes minimizar y (cuando sea posible) eliminar la cantidad de recursos críticos de la página, minimizar la cantidad de bytes críticos descargados y optimizar la longitud de la ruta crítica.

## Optimiza el uso de JavaScript

Los recursos de JavaScript bloquean el analizador de forma predeterminada, a menos que esté marcado como `async` o se haya agregado mediante un fragmento JavaScript especial. El recurso JavaScript que bloquea al analizador obliga al navegador a esperar al CSSOM y pausa la construcción del DOM, lo cual puede demorar notablemente la primera representación.

### Elige recursos de JavaScript asincrónicos

Los recursos asincrónicos desbloquean el analizador de documentos y permiten que el navegador evite el bloqueo del CSSOM antes de ejecutar la secuencia de comandos. A menudo, si la secuencia de comandos puede usar el atributo `async`, también significa que no es esencial para la primera representación. Es buena idea cargar secuencias de comandos de forma asíncrona tras la primera representación.

### Evita las llamadas sincrónicas de servidores

Usa el método `navigator.sendBeacon()` para limitar los datos que envía XMLHttpRequests en
controladores `unload`. Debido a que para muchos navegadores es necesario que esas solicitudes
sean sincrónicas, estos pueden retardar las transiciones de página, algunas veces de forma notoria. En el siguiente
código se muestra la manera de usar `navigator.sendBeacon()` para enviar datos al servidor en el
controlador `pagehide`, en lugar del controlador `unload`.


    <script>
      function() {
        window.addEventListener('pagehide', logData, false);
        function logData() {
          navigator.sendBeacon(
            'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
            'Sent by a beacon!');
        }
      }();
    </script>
    

El nuevo método `fetch()` proporciona una forma fácil de solicitar datos de manera asincrónica. Debido a que aún no está disponible en todas partes, debes usar la detección de funciones para comprobar su presencia antes de usarlo. Este método procesa respuestas con promesas en lugar de varios controladores de eventos. A diferencia de la respuesta a una XMLHttpRequest, a partir de Chrome 43, una respuesta fetch será un objeto stream. Esto significa que una llamada a `json()` también muestra una promesa. 


    <script>
    fetch('./api/some.json')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log(data);  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
    </script>
    

El método `fetch()` puede controlar solicitudes POST.


    <script>
    fetch(url, {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'foo=bar&lorem=ipsum'  
    }).then(function() { // Aditional code });
    </script>
    

### Difiere el análisis de JavaScript

A fin de minimizar el trabajo que debe realizar el navegador para representar la página, deben diferirse las secuencias de comandos que no sean esenciales ni críticas para la construcción de contenido visible en la representación inicial.

### Evita la ejecución prolongada de JavaScript

La ejecución prolongada de JavaScript bloquea el navegador, y le impide construir el DOM y el CSSOM, y representar la página. Por lo tanto, se debe diferir cualquier lógica de inicialización y funcionalidad que no sean esenciales para la primera representación. Si es necesario ejecutar una secuencia de inicialización prolongada, considera dividirla en varias etapas para permitir que el navegador procese otros eventos entre medio.

## Optimiza el uso de CSS

CSS es necesario para construir el árbol de representación y JavaScript a menudo bloquea la CSS durante la construcción inicial de la página. Debes asegurarte de que la CSS que no sea esencial esté marcada como no crítica (por ejemplo, impresión y otras consultas de medios), y que la cantidad de CSS crítica y el tiempo necesario para proporcionarla sean lo más acotados posible.

### Coloca CSS en el encabezado del documento

Todos los recursos CSS se deben especificar lo antes posible en el documento HTML, de modo que el navegador pueda detectar las etiquetas `<link>` y enviar la solicitud de CSS cuanto antes.

### Evita la importación de CSS

La directiva de importación de CSS (`@import`) permite que una hoja de estilo importe reglas de otro archivo de hojas de estilo. No obstante, se deben evitar esas directivas porque generan recorridos adicionales en la ruta crítica: los recursos CSS importados solo se detectan después de recibir y analizar la hoja de estilo CSS con la regla `@import`.

### CSS integrado que bloquea el analizador

Para obtener el mayor rendimiento, debes considerar integrar la CSS crítica directamente en el documento HTML. Esto elimina la posibilidad de generar recorridos adicionales en la ruta crítica y, si se hace correctamente, se puede usar para proporcionar una extensión de ruta crítica de “un recorrido” cuando solo el lenguaje HTML actúe como recurso de bloqueo.



{# wf_devsite_translation #}
