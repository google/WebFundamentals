project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene la propiedad start_url".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene una URL de inicio  {: .page-title }

## Por qué es importante la auditoría {: #why }

Después de que tu app web se haya agregado a la pantalla de inicio del usuario, la propiedad `start_url`
en el manifiesto de apps web determina qué página de la app se carga primero
cuando el usuario inicia la app desde la pantalla de inicio.

Si no se encuentra la propiedad `start_url`, el navegador utiliza de manera predeterminada
lo que haya estado activo cuando el usuario decidió agrega la app a la pantalla de inicio.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `start_url` al manifiesto de apps web.

    {
      ...
      "start_url": ".",
      ...
    }

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse obtiene manifiesto y verifica que tenga la propiedad `start_url`.
El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos.


{# wf_devsite_translation #}
