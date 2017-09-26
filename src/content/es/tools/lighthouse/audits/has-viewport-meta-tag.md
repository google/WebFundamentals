project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia de la auditoría de Lighthouse “HTML tiene una metaetiqueta de la ventana de visualización”.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# HTML tiene una metaetiqueta de la ventana de visualización {: .page-title }

## Por qué es importante la auditoría {: #why }

Sin una metaetiqueta de la ventana de visualización, los dispositivos móviles representan páginas en longitudes de
pantallas de escritorio convencionales y, a continuación, cambian el tamaño de la página para que se adapte a la pantalla del dispositivo. Si configuras
la ventana de visualización, podrás controlar su longitud y su cambio de tamaño.
Consulta los siguientes vínculos para obtener más información:

* [Configurar la ventana de visualización](/speed/docs/insights/ConfigureViewport).
* [Definir la ventana de visualización](/web/fundamentals/design-and-ux/responsive/#set-the-viewport).

## Cómo aprobar la auditoría {: #how }

Agrega una etiqueta `<meta>` en el elemento `<head>` de tu HTML.

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

El par clave-valor `width=device-width` define la longitud de la ventana de visualización al valor de
la longitud del dispositivo. El par clave-valor `initial-scale=1` define el nivel inicial de
acercamiento cuando se visita la página.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse verifica si hay una etiqueta `<meta name="viewport">` en el elemento `<head>`
del documento. También controla si el código tiene un atributo `content` y si
el valor de este atributo contiene el texto `width=`. Sin embargo,
no verifica si `width` es igual a `device-width`. Lighthouse tampoco
verifica si hay un par clave-valor `initial-scale`.


{# wf_devsite_translation #}
