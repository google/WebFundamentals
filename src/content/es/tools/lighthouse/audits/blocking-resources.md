project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para las auditorías de Lighthouse "El sitio no usa etiquetas de enlaces que demoran la primera pintura" y "El sitio no usa etiquetas de secuencias de comandos en el encabezado que demoran la primera pintura".

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-01 #}

# El sitio no usa recursos que demoran la primera pintura  {: .page-title }

## Por qué es importante la auditoría {: #why }

Las cargas rápidas de las páginas proporcionan una mayor captación de usuarios, aumentan el número de vistas de la página y
 mejoran la conversión.

Puedes mejorar la velocidad de carga de la página si integras enlaces y secuencias de comandos que
son necesarios para la primera pintura y difieres los innecesarios.

## Cómo aprobar la auditoría {: #how }

En tu informe, Lighthouse enumera todos los enlaces o secuencias de comandos detectados que bloquean la representación
representación. El objetivo es reducir esta cantidad.

Tal como se menciona en [Cómo se implementa la auditoría](#implementation), Lighthouse
indica tres tipos de enlaces que bloquean la representación: secuencias de comandos, hojas de estilo e importaciones
HTML. La forma en que optimizas depende del tipo de recurso con el que trabajas.

Note: Si a continuación se hace referencia a un recurso como "crítico", significa que el
recurso es necesario para la primera pintura o es crucial para la funcionalidad central de la
página.

* Respecto de las secuencias de comandos críticas, considera integrarlas en tu HTML. Respecto de las secuencias de comandos
  no críticas, considera marcarlas con los atributos `async` o `defer` .
  Para obtener más información, consulta [Cómo agregar interactividad con JavaScript][js].
* Respecto de las hojas de estilo, considera dividir tus estilos en archivos diferentes,
  organizados por consulta de medios y luego agrega un atributo `media` a cada
  enlace de hoja de estilo. Cuando carga una página, el navegador solo bloquea la primera
  pintura para recuperar las hojas de estilo que coinciden con el dispositivo del usuario. Para más información, consulta
  [Bloqueo de representación de CSS][css].
* Respecto de las importaciones HTML no críticas, márcalas con el atributo `async`. Como regla
  general, `async` debe usarse con importaciones HTML la mayor cantidad de veces posible.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse identifica tres tipos de recursos de bloqueo.

Una etiqueta `<script>` que:

* está en el `<head>` del documento.
* No posee un atributo `defer`.
* No posee un atributo `async`.

Una etiqueta `<link rel="stylesheet">` que:

* no posee un atributo `disabled`. Cuando este atributo está presente,
  el navegador no descarga la hoja de estilo.
* No posee un atributo `media` que coincide con el dispositivo del usuario.

Una etiqueta `<link rel="import">` que:

* No posee un atributo `async`.


{# wf_devsite_translation #}
