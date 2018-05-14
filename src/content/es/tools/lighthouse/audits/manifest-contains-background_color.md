project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene la propiedad background_color".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene color de fondo  {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando la app web se carga desde la pantalla de inicio de un usuario, el navegador usa la propiedad
`background_color` para el color de fondo del navegador durante
la carga de la app. Esto crea una transición suave entre el lanzamiento de la app y
la carga de su contenido.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `background_color` al manifiesto de apps web. El valor puede ser cualquier
color válido de la CSS.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

La auditoría se aprueba si el manifiesto contiene la propiedad `background_color`.
El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos. Lighthouse no
valida que el valor sea un color válido de la CSS.


{# wf_devsite_translation #}
