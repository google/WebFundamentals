project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa Console API para escribir información a la consola, crear perfiles JavaScript e iniciar una sesión de depuración.

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Referencia de Console API {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Usa Console API para escribir información a la consola, 
crear perfiles JavaScript e iniciar una sesión de depuración.


## console.assert(expression, object) {:#assert}

Escribe un [error](#error) a la consola cuando la expresión evaluada es 
`false`. 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![Ejemplo de console.assert()](images/assert.png)

## console.clear() {:#clear}

Borra la consola.


    console.clear();
    

Si la casilla de verificación [**Preserve log**](index#preserve-log) está seleccionada, 
`console.clear()` queda inhabilitado. Sin embargo, si se presiona el botón para **borrar la consola** 
(![botón para borrar la consola](images/clear-console-button.png){:.inline})
o se aplica la combinación de teclas <kbd>Ctrl</kbd>+<kbd>L</kbd> mientras la consola esté seleccionada, se
podrá borrar la consola. 

Para obtener más información, consulta [Borrar la consola](index#clearing).

## console.count(label) {:#count}

Escribe la cantidad de veces que se ha invocado a `count()` en la misma 
línea y con la misma etiqueta.


    function login(name) {
      console.count(name + ' logged in');
    }
    

![Ejemplo de console.count()](images/count.png)

Para obtener más ejemplos, consulta [Contar ejecuciones de instrucciones][cse].

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

Idéntico a [`console.log()`](#log).

## console.dir(object) {:#dir}

Emite una representación JavaScript del objeto especificado. Si el objeto 
que se registra es un elemento HTML, se muestran las propiedades de su 
representación DOM, como se describe a continuación:


    console.dir(document.body);
    

![Ejemplo de`console.dir()` ](images/dir.png)

Obtén información sobre el formateador de objetos funcionalmente equivalentes (`%O`) y más 
en [Sustitución y formateo de string][of].

[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

Emite una representación XML de los elementos descendientes de `object` en caso de ser 
posible, en caso contrario, de la representación JavaScript. Llamar a `console.dirxml()`
en elementos HTML y XML es equivalente a llamar a [`console.log()`](#log).


    console.dirxml(document);
    

![Ejemplo de console.dirxml()](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

Emite un mensaje similar a [`console.log()`](#log), diseña el 
mensaje como un error e incluye un seguimiento de pila desde donde se llamó al 
método.


    console.error('error: name is undefined');
    

![Ejemplo de console.error()](images/error.png)

## console.group(object[, object, ...])

Inicia un nuevo grupo de registro con un título opcional. Todos los resultados de la consola
que se producen después de `console.group()` y antes de `console.groupEnd()` se agrupan
en la misma vista. 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![Ejemplo de console.group()](images/group.png)

También puedes anidar grupos:


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![Ejemplo de nested console.group()](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

## console.groupCollapsed(object[, object, ...])

Crea un nuevo grupo de registro que está inicialmente colapsado en vez de abierto. 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

Cierra un grupo de registro. Consulta [`console.group`](#group) para conocer un ejemplo.

## console.info(object [, object, ...])

Emite un mensaje como [`console.log()`](#log) pero también muestra un ícono (círculo
azul con una "i" blanca) al lado del resultado. 

## console.log(object [, object, ...]) {:#log}

Muestra un mensaje en la consola. Pasa uno o más objetos a este método.
Cada objeto se evalúa y se concatena en una string separada por espacios.


    console.log('Hello, Logs!');
    

### Especificadores de formato {:#format-specifiers}

El primer objeto que pasas puede contener uno o más **especificadores de formato**. Un
especificador de formato está compuesto por el signo de porcentaje (`%`) seguido de una letra
que indica el formato que se aplica. 

Guías relacionadas:

* [Organizar resultados de consola](console-write)

## console.profile([label]) {:#profile}

Inicia un perfil CPU JavaScript con una etiqueta opcional. Para completar el 
perfil, llama a `console.profileEnd()`. Cada perfil se agrega al panel **Profiles**.



    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

Detiene la sesión de generación de perfiles CPU JavaScript actual si una está en progreso y 
emite el informe al panel **Profiles**.

Consulta [`console.profile()`](#profile) para conocer un ejemplo.

## console.time(label) {:#time}

Inicia un temporizador nuevo con una etiqueta asociada. Cuando se llama a `console.timeEnd()` con 
la misma etiqueta, el temporizador se detiene y el tiempo transcurrido se
muestra en la consola. La precisión del temporizador alcanza valores en submilisegundos.
Las strings que se pasan a `time()` y `timeEnd()` deben coincidir. De lo contrario, el conteo del temporizador 
no finalizará.


    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![Ejemplo de console.time()](images/time.png)

## console.timeEnd(label) {:#timeend}

Detiene el temporizador actual si uno está en progreso y emite la etiqueta del temporizador 
seguido del tiempo transcurrido a la Consola. 

Consulta [`console.time()`](#time) para conocer un ejemplo. 

## console.timeStamp([label]) {:#timestamp}

Agrega un evento a **Timeline** durante una sesión de grabación. 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![Ejemplo de console.timeStamp()](images/timestamp.png)

Guías relacionadas:

* [Usar la herramienta
  Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)

## console.trace(object) {:#trace}

Emite un seguimiento de pila desde el punto donde se llamó al método. 

    console.trace();

![Ejemplo de console.trace()](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

Emite un mensaje como [`console.log()`](#log), pero también muestra un ícono de advertencia 
amarillo al lado del mensaje registrado.

    console.warn('user limit reached!');

![Ejemplo de console.warn()](images/warn.png)


{# wf_devsite_translation #}
