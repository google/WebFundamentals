project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprende a usar Chrome y DevTools para encontrar problemas de memoria que afecten el rendimiento de la página, incluidos fugas o aumentos de memoria y recolecciones frecuentes de elementos no usados.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-04-13 #}

# Solucionar problemas de memoria {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Aprende a usar Chrome y DevTools para encontrar problemas de memoria
que afecten el rendimiento de la página, incluidos fugas o aumentos de memoria y recolecciones
frecuentes de elementos no usados.


### TL;DR {: .hide-from-toc }
- Descubre el volumen de memoria que consume tu página actualmente con el Administrador de tareas de Chrome.
- Visualiza el uso de la memoria en el tiempo con grabaciones de líneas de tiempo.
- Identifica árboles separados del DOM (una causa común de las fugas de memoria) con capturas de pantalla de montón.
- Averigua el momento en que se asigna memoria nueva a tu montón JS con grabaciones de líneas de tiempo de asignación.


## Información general

Según el espíritu del modelo de rendimiento [RAIL][RAIL], el enfoque de los esfuerzos
de rendimiento deben ser los usuarios.

Muchos problemas de memoria son importantes porque, a menudo, los usuarios pueden
percibirlos. Los usuarios pueden percibir problemas de memoria de las siguientes
formas:

* **El rendimiento de una página empeora progresivamente con el tiempo:** esto probablemente sea
  un síntoma de una fuga de memoria. Una fuga de memoria se produce cuando, por un error en la página, 
  esta última usa progresivamente más y más memoria con el tiempo. 
* **El rendimiento de una página exhibe deficiencias constantes:** esto tal vez sea un síntoma
  de un aumento de memoria. Un aumento de memoria se produce cuando una página usa más memoria que
  la necesaria para lograr una velocidad óptima.
* **Una página funciona con lentitud o parece pausarse con frecuencia:** es posible que esto
  sea un indicio de recolecciones frecuentes de elementos no usados. La recolección de elementos no usados
  tiene lugar cuando el navegador reclama memoria. El navegador determina el momento en que esto sucede.
  Durante la recolección, la ejecución de todas las secuencias de comandos se pausa. Por lo tanto, si el navegador realiza
  muchas recolecciones de elementos no usados, se producirán muchas pausas en la ejecución de las secuencias de comandos.

### Aumento de memoria: ¿cuánto es "demasiado"?

Una fuga de memoria es fácil de definir. Si un sitio usa cada vez más
memoria, significa que existe una fuga. Sin embargo, un aumento de memoria es un poco
más difícil de precisar. ¿Qué califica como “usar demasiada memoria”?

No se aplican números estrictos a esto, debido a que los
distintos dispositivos y navegadores tienen capacidades diferentes. La misma página que
se ejecuta con fluidez en un smartphone de gama alta puede fallar en uno
de gama baja.

La clave consiste en usar el modelo RAIL y centrarse en los usuarios. Descubre
los dispositivos que tienen popularidad entre los usuarios y luego prueba tu página en
ellos. Si la experiencia es mala en general, es posible que la página
exceda las capacidades de memoria de esos dispositivos.

[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## Monitorear el uso de la memoria en tiempo real con el Administrador de tareas de Chrome

Usa el Administrador de tareas de Chrome como punto de partida para tu investigación
sobre el problema de memoria. El Administrador de tareas es un monitor en tiempo real que te indica
la cantidad de memoria que una página usa en el momento.

1. Presiona <kbd>Shift</kbd>+<kbd>Esc</kbd> o dirígete al menú principal
   de Chrome y selecciona **More tools** > **Task manager** para abrir
   el Administrador de tareas.

   ![Apertura del Administrador
   de tareas](imgs/task-manager.png)

1. Haz clic con el botón secundario en el encabezado de la tabla en el Administrador de tareas y habilita **JavaScript
   memory**.

   ![Habilitación de javascript
   memory](imgs/js-memory.png)

Estas dos columnas te brindan información diferente sobre la manera en la que tu página usa la memoria:

* La columna **Memory** representa la memoria nativa. Los nodos del DOM se almacenan en la
  memoria nativa. Si este valor aumenta, significa que hay en curso un proceso de creación de nodos del DOM.
* La columna **JavaScript Memory** representa el montón JS. Esta columna
  contiene dos valores. El valor que se aplica a este tema es el número
  en tiempo real (el número entre paréntesis). El número en tiempo real representa
  la cantidad de memoria que usan los objetos accesibles de tu página. Si este
  número aumenta, significa que se crean objetos nuevos o que aumenta el volumen de los objetos
  existentes.

<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## Visualizar fugas de memoria con grabaciones de Timeline

También puedes usar el panel Timeline como otro punto de partida para la
investigación. El panel Timeline te ayuda a visualizar el uso de memoria de una página
con el paso del tiempo.

1. Abre el panel **Timeline** en DevTools.
1. Habilita la casilla de verificación **Memory**.
1. [Realiza una grabación][recording].

Sugerencia: Una práctica recomendada consiste en comenzar y finalizar la grabación con una recolección forzada
de elementos no usados. Haz clic en el botón **collect garbage**
(![botón para forzar la recolección de elementos no usados][cg]{:.inline})
durante la grabación para forzar la recolección de elementos no usados.

Para explicar las grabaciones de memoria de Timeline, ten en cuenta el código a continuación:

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

Cada vez que se presiona el botón al que se hace referencia en el código, se agregan diez 
mil nodos `div` al
cuerpo del documento y se inserta una cadena de un millón de caracteres `x` en
la matriz `x`. Si se ejecuta este código, se realiza una grabación en Timeline como la que 
se muestra en la siguiente captura de pantalla:

![Ejemplo de crecimiento simple][sg]

Primero, explicaremos la interfaz de usuario.
El gráfico **HEAP** en el subpanel **Overview** (debajo de **NET**) representa el montón
JS. Debajo del subpanel **Overview**, se encuentra el subpanel **Counter**. Puedes ver el uso de la
memoria desglosado por montón JS (como sucede con el gráfico **HEAP** del subpanel
**Overview**), documentos, nodos del DOM, receptores y memoria de la GPU.
Si inhabilitas una casilla de verificación, se oculta esa información en el gráfico.

Ahora, analizaremos el código en comparación con la captura de pantalla.
Si observas el contador de nodos (el gráfico verde), puedes notar que coincide
perfectamente con el código. El recuento de nodos aumenta
en pasos discretos. Puedes suponer que cada aumento en el recuento de nodos es una
llamada a `grow()`. El gráfico del montón JS (azul) no es tan directo.
Siguiendo las prácticas recomendadas, la primera depresión es en realidad una recolección forzada
de elementos no usados (que se logra haciendo clic en el botón **collect garbage**).
A medida que la grabación avanza, puedes ver que el tamaño del montón JS aumenta rápidamente. Esto es
natural y esperable: el código JavaScript crea los nodos del DOM con cada
clic en un botón y realiza mucho trabajo cuando crea la cadena de un millón de
caracteres. El aspecto clave aquí es el hecho de que el montón JS termina más arriba que al
comenzar (el “comienzo” en este caso es el punto después de la recolección
forzada de elementos no usados). En el mundo real, si vieras este patrón de aumento
del tamaño del montón JS o de los nodos, posiblemente indicaría una fuga de memoria.

[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## Descubrir fugas de memoria de árboles separados del DOM con capturas de pantalla del montón

Un nodo del DOM solo puede estar sujeto a la recolección de elementos no usados si no hay referencias a él
en el árbol del DOM o el código JavaScript de la página. Se dice que un nodo está 
“separado” cuando se quita del árbol del DOM y JavaScript
hace, de todos modos, referencia a él. Los nodos separados del DOM son una causa común de fugas de memoria. En
esta sección, aprenderás a usar los generadores de perfiles de montón de DevTools para identificar nodos
separados.

A continuación, se ofrece un ejemplo simple de nodos separados del DOM. 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

Cuando se hace clic en el botón al que se hace referencia en el código, se crea un nodo `ul` con diez campos secundarios `li`
. El código hace referencia a estos nodos, pero no existen en el
árbol del DOM, por lo cual están separados.

Las capturas de pantalla del montón son una manera de identificar los nodos separados. Como su nombre lo indica,
las capturas de pantalla del montón te muestran la distribución de la memoria entre los objetos JS de la página
y los nodos del DOM en el momento en el que se toma la captura de pantalla.

Para tomar una captura de pantalla, abre DevTools y ve a el panel **Profiles**, selecciona
el botón de selección **Take Heap Snapshot** y luego presiona el botón **Take
Snapshot**. 

![take heap snapshot][ths]

El procesamiento y la carga de la captura de pantalla pueden demorar un poco. Una vez finalizado esto, selecciona la captura de pantalla
en el panel izquierdo (llamado **HEAP SNAPSHOTS**). 

Escribe `Detached` en el cuadro de texto **Class filter** para buscar los árboles separados del
DOM.

![filtrado de nodos separados][df]

Expande los triángulos para investigar un árbol separado.

![investigación de un árbol separado][ed]

Los nodos destacados en amarillo tienen referencias directas a ellos desde el código 
JavaScript. Los nodos destacados en rojo no tienen referencias directas. Existen
únicamente porque son parte del árbol del nodo amarillo. En general, te convendrá enfocarte
en los nodos amarillos. Corrige el código para que el nodo amarillo no exista
por más tiempo del que sea necesario. También deberías deshacerte de los nodos rojos que forman
parte del árbol del nodo amarillo.

Haz clic en un nodo amarillo para investigarlo más. En el subpanel **Objects** 
puedes ver más información sobre el código que hace referencia a él. Por ejemplo,
en la siguiente captura de pantalla puedes ver que la variable `detachedTree` hace
referencia al nodo. Para corregir esta fuga de memoria en particular, debes 
analizar el código que usa `detachedTree` y asegurarte de que quite su referencia al
nodo cuando ya no sea necesaria.

![investigación de un nodo amarillo][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## Identificar fugas de memoria del montón JS con líneas del tiempo de asignación

La línea de tiempo de asignación es otra herramienta que puede ayudarte a rastrear 
fugas de memoria en el montón JS. 

A continuación, se ofrece un ejemplo de código de línea de tiempo de asignación:

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

Cada vez que se presiona el botón al que se hace referencia en el código, se agrega una cadena de un
millón de caracteres a la matriz `x`.

Para grabar una línea de tiempo de asignación, abre DevTools, ve al panel **Profiles**,
activa el botón de selección **Record Allocation Timeline**, presiona el botón **Start**,
realiza la acción que sospechas que genera la fuga de memoria y
luego presiona el botón **stop recording** 
(![botón stop recording][sr]{:.inline}).
 

A medida que realices la grabación, observa si aparecen barras azules en la línea del tiempo
de asignación, como se muestra en la siguiente captura de pantalla. 

![asignaciones nuevas][na]

Las barras azules representan asignaciones de memoria nuevas. Esas asignaciones nuevas
están expuestas a fugas de memoria. Puedes ampliar una barra para filtrar el subpanel
**Constructor** a fin de que se muestren únicamente los objetos que se asignaron durante el
plazo especificado. 

![línea del tiempo de asignación ampliada][zat]

Expande el objeto y haz clic en su valor para ver más detalles en el subpanel
**Object**. Por ejemplo, en la siguiente captura de pantalla, al observar los detalles
del objeto recientemente asignado, podrías detectar que se
asignó a la variable `x` en el ámbito de `Window`.

![detalles del objeto][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## Investigar asignación de memoria por función {: #allocation-profile }

Usa el tipo **Record Allocation Profiler** para ver la asignación de memoria por
función de JavaScript.

![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. Selecciona el botón de selección **Record Allocation Profiler**. Si hay un
   proceso de trabajo en la página, puedes seleccionar ese como objetivo del perfil utilizando
   el menú desplegable que aparece junto al botón **Start**.
1. Presiona el botón **Start**.
1. Realiza las acciones en la página que deseas investigar.
1. Presiona el botón **Stop** cuando hayas finalizado con todas las acciones.

DevTools te muestra un desglose de la asignación de memoria por función. La vista
predeterminada es **Heavy (Bottom Up)**, en la que se muestran las funciones que asignaron la
mayor cantidad de memoria en la parte superior.

![Perfil de asignación](imgs/allocation-profile.png)

## Identificar recolecciones frecuentes de elementos no usados

Si tu página parece pausarse con frecuencia, es posible que haya problemas con la recolección de
elementos no usados. 

Puedes usar el Administrador de tareas de Chrome o las grabaciones de memoria de Timeline para
identificar recolecciones frecuentes de elementos no usados. En el Administrador de tareas, los valores
de **Memory** o **JavaScript Memory** que aumentan y disminuyen con frecuencia representan recolecciones
frecuentes de elementos no usados En las grabaciones de Timeline, los gráficos del montón
JS o de recuento de nodos que aumentan y disminuyen con frecuencia indican que hay recolecciones frecuentes de elementos no usados.

Una vez identificado el problema, puedes usar la grabación de la línea de tiempo de asignación
para descubrir los puntos en los que se asigna la memoria y las funciones que
generan las asignaciones. 


{# wf_devsite_translation #}
