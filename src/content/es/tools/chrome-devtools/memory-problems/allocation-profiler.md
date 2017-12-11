project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa la herramienta de generación de perfiles de asignación para buscar objetos que la recolección de elementos no usados no procese correctamente, y que sigan reteniendo memoria.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Cómo usar la herramienta de generación de perfiles de asignación {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
Usa la herramienta de generación de perfiles de asignación para buscar objetos que la recolección de elementos no usados no procese correctamente, y que sigan reteniendo memoria.


## Cómo funciona la herramienta

El **generador de perfiles de asignación** combina la información de captura de pantalla detallada del
[generador de perfiles de montón](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)
con la actualización y el seguimiento incrementar del
[Panel de línea de tiempo](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool).
En forma similar a estas herramientas, la asignación de montón de los objetos de seguimiento involucra comenzar una grabación,
realizar una secuencia de acciones, y detener la grabación para fines de análisis.

La herramienta toma periódicamente capturas de pantalla de montón de toda la grabación (¡cada 50 ms!) y una captura de pantalla final al final de la grabación.

![Generador de perfiles de asignación](imgs/object-tracker.png)

Note: El número después del @ es un ID de objeto que se conserva entre las distintas capturas de pantalla tomadas. Esto permite una comparación precisa entre los estados de montón. Mostrar la dirección de un objeto no tiene sentido, ya que estos se mueven durante la recolección de elementos no usados.

## Habilita el generador de perfiles de asignación

Para comenzar a utilizar el generador de perfiles de asignación:

1. Asegúrate de tener el último [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html).
2. Abre Developer Tools y haz clic en el ícono de ajustes en la parte inferior derecha.
3. Ahora, abre el panel del generador de perfiles. Deberás ver un perfil denominado "Record Heap Allocations".

![Grabar generador de perfiles de asignación de montón](imgs/record-heap.png)

## Lee un perfil de asignación de montón

El perfil de asignación de montón muestra dónde se crean los objetos e identifica la ruta de retención.
En la siguiente captura de pantalla, las barras de la parte superior indican cuándo se encuentran nuevos objetos en el montón.

La altura de cada barra corresponde al tamaño de los objetos asignados recientemente
y el color de las barras indica si esos objetos todavía existen en la captura de pantalla de montón final.
Las barras azules indican los objetos que todavía existen al final de la línea de tiempo,
las barras grises indican los objetos que fueron asignados durante la línea de tiempo,
pero que desde entonces se sometieron a la recolección de elementos sin usar:

![Captura de pantalla del generador de perfiles de asignación](imgs/collected.png)

En la siguiente captura de pantalla, se ejecutó una acción diez veces.
El programa de muestra almacena en caché cinco objetos, por lo que se esperan las últimas cinco barras azules.
Sin embargo, la barra azul más a la izquierda indica un posible problema.

Luego, puedes usar los controles deslizantes de la línea de tiempo que figura arriba para acercar ese captura en particular
y ver los objetos que se asignaron recientemente en ese punto:

 ![Acercar la captura de pantalla](imgs/sliders.png)

Al hacer clic en un objeto específico del montón se mostrará su árbol de retención en la parte inferior de la captura de pantalla del montón. Si examinas la ruta de acceso de retención del objeto, obtendrás suficiente información para comprender la razón por la cual el objeto no fue recolectado y podrás efectuar los cambios requeridos en el código para quitar la referencia innecesaria.

## Ve la asignación de memoria por función {: #allocation-profiler }

También puedes ver la asignación de memoria por función JavaScript. Consulta
[Investigar asignación de memoria por función](index#allocation-profile) para
obtener más información.


{# wf_devsite_translation #}
