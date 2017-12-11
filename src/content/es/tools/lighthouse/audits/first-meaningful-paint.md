project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Primera pintura significativa".

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Primera pintura significativa {: .page-title }

## Por qué es importante la auditoría {: #why }

La carga de la página es un aspecto clave para saber cómo un usuario percibe el rendimiento de tu
página. Para más información, consulta [Medir el rendimiento con el método RAIL](/web/fundamentals/performance/rail).

Esta auditoría identifica el tiempo en el que el usuario cree que el contenido
primario de la página está visible.

## Cómo aprobar la auditoría {: #how }

Cuanto más bajo sea tu puntaje de Primera pintura significativa, más rápido parecerá que la página
muestra su contenido primario.

[Optimizar la Ruta Crítica de Representación](/web/fundamentals/performance/critical-rendering-path/)
es especialmente útil para lograr una Primera pintura significativa más rápida.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Primera pintura significativa esencialmente es la pintura luego de que se produce el mayor
cambio de diseño en la parte superior de la página y se cargan las fuentes web. Para más información, consulta la
especificación:
[Primera pintura significativa: un enfoque basado en el diseño](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view).


{# wf_devsite_translation #}
