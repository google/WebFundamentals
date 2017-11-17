project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Latencia de entrada estimada".

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Latencia de entrada estimada  {: .page-title }

## Por qué es importante la auditoría {: #why }

La capacidad de respuesta a la entrada es un factor clave en la forma en que los usuarios perciben el rendimiento
de tu app. Las apps tienen 100 ms para responder a la entrada del usuario. Si superan ese tiempo,
el usuario percibe a la app como retardada. Para más información, consulta [Medir el rendimiento con el modelo
RAIL](/web/fundamentals/performance/rail).

Consulta la sección [Qué prueba la auditoría](#what) de este documento para conocer la
explicación de por qué esta auditoría prueba un puntaje objetivo de 50ms (en lugar de
100ms, que es lo que recomienda el modelo RAIL).

## Cómo aprobar la auditoría {: #how }

Para lograr que tu app responda a la entrada del usuario con mayor rapidez, necesitas optimizar la forma en que
tu código se ejecuta en el navegador. Comprueba la serie de técnicas detalladas
en los documentos [Rendimiento de la representación](/web/fundamentals/performance/rendering/).
 Estas sugerencias abarcan desde cálculos de descarga hasta web workers para
liberar la cadena principal, refactorizar tus selectores de CSS para realizar
menos cálculos, usar las propiedades de CSS que minimizan la cantidad de
operaciones intensivas en el navegador.

Una advertencia importante sobre esta auditoría es que no es una medición completa de
la latencia de entrada. Tal como se explica en la sección [Qué prueba este documento](#what) 
de este documento, esta auditoría no mide cuánto tiempo le lleva realmente a tu app
responder a la entrada de un usuario. En otras palabras, no mide que la respuesta de tu app a la entrada del usuario
esté visualmente completa.

Para medirla de forma manual, haz una grabación con
Timeline de Chrome DevTools. Para obtener más ayuda, consulta [Cómo usar la herramienta
Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).
 La idea básica consiste en iniciar una grabación, realizar la entrada de usuario
que deseas medir, detener la grabación y luego analizar el gráfico de llamas
para asegurarte de que todas las etapas de [la canalización
de píxeles](/web/fundamentals/performance/rendering/#the_pixel_pipeline) se
completen en 50ms.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

El modelo de rendimiento RAIL recomienda que las apps respondan a la entrada de usuario en
100ms, mientras que el puntaje objetivo de Lighthouse es de 50ms. ¿Por qué?

La razón por la que Lighthouse usa una métrica proxy para medir cuán bien responde
tu app a la entrada de usuario es la disponibilidad de la cadena principal. Lighthouse
asume que tu app necesita 50ms para responder por completo a la entrada del usuario
(desde realizar cualquier ejecución de JavaScript hasta pintar físicamente los píxeles
nuevos en la pantalla). Si tu cadena principal no está disponible en 50ms o más,
no deja suficiente tiempo para que tu app complete la respuesta.

Hay un 90 % de probabilidades de que un usuario experimente latencia de entrada en la
cantidad informada por Lighthouse o menos. El 10 % de los usuarios puede esperar que se produzca latencia
adicional.


{# wf_devsite_translation #}
