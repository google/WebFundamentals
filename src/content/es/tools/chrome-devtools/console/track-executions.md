project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprovecha la API de la consola para medir tiempos de ejecución y contar ejecuciones de instrucciones.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Medir y contar ejecuciones {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Aprovecha la API de la consola para medir tiempos de ejecución y contar ejecuciones de instrucciones.


### TL;DR {: .hide-from-toc }
- Usa <code>console.time()</code> y <code>console.timeEnd()</code> para realizar el seguimiento del tiempo transcurrido entre los puntos de ejecución.
- Usa <code>console.count()</code> para realizar el recuento de las veces en que la misma cadena se pasa a una función.


## Medir los tiempos de ejecución

El método [`time()`](./console-reference#consoletimelabel) inicia un temporizador nuevo y es muy útil para medir cuánto tiempo demora una acción. Pasa una cadena al método para asignarle un nombre al marcador.

Cuando desees detener el temporizador, llama a [`timeEnd()`](./console-reference#consoletimeendlabel) y pásale la misma cadena que se le pasó al inicializador.

La consola registra la etiqueta y el tiempo transcurrido cuando el método `timeEnd()` se activa.

### Ejemplo básico

Aquí, medimos el inicio de un millón de matrices nuevas:


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

Esto genera lo siguiente en la consola:
![Tiempo transcurrido](images/track-executions-time-duration.png)

### Temporizadores en la herramienta Timeline

Cuando se produce una grabación de [Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) durante una operación de `time()`, esta también realiza anotaciones en la línea del tiempo. Se usa cuando deseas realizar el seguimiento de lo que hace tu app y de dónde viene.

Cómo se ve una anotación de `time()` en la línea del tiempo:

![Anotación de time() en la línea del tiempo](images/track-executions-time-annotation-on-timeline.png)

### Marcar la línea del tiempo

*Note: El método `timeStamp()` solo funciona cuando hay una grabación de Timeline en curso.

El [panel Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) proporciona una vista general completa de dónde invierte el tiempo el motor.
Puedes agregar una marca a la línea del tiempo desde la consola con [`timeStamp()`](./console-reference#consoletimestamplabel). Esta es una manera simple de relacionar eventos en tu app con otros eventos.

`timeStamp()` anota la línea del tiempo en las siguientes ubicaciones:

- Coloca una línea vertical amarilla en la vista de resumen e información de Timeline.
- Agrega un registro a la lista de eventos.

Este código de ejemplo:


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

genera las siguientes marcas de tiempo en la línea del tiempo:

![Marcas de tiempo en la línea del tiempo](images/track-executions-timestamp2.png)

## Contar ejecuciones de instrucciones

Usa el método `count()` para registrar una cadena indicada junto con la cantidad de veces que se proporciona la misma cadena. Cuando se da la instrucción exacta a `count()` en la misma línea, el número se incrementa.

Ejemplo de código con `count()` en contenido dinámico:


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

Resultado del ejemplo de código:

![resultado del ejemplo de console.count()](images/track-executions-console-count.png)




{# wf_devsite_translation #}
