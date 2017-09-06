project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene la propiedad theme_color".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene un color de tema  {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando el usuario accede a tu app en Chrome para Android, propiedad `theme_color`
de tu manifiesto de apps web determina el color de la barra de direcciones. Esto tiene
efecto independientemente de si el usuario agregó tu app a la pantalla de inicio.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `theme_color` al manifiesto de apps web. El valor puede ser cualquier
color válido de la CSS.

    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

La auditoría se aprueba si el manifiesto contiene la propiedad `theme_color`.
El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos. Lighthouse no
valida que el valor sea un color válido de la CSS.


{# wf_devsite_translation #}
