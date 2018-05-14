project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene la propiedad short_name".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene un nombre corto  {: .page-title }

## Por qué es importante la auditoría {: #why }

Después de que el usuario agrega tu app a la pantalla de inicio, `short_name` es el texto que
se muestra en la pantalla de inicio junto al ícono de tu app. Por lo general, se usa
cuando no hay espacio suficiente para mostrar el nombre completo de tu app.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `short_name` al manifiesto de apps web.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

La [extensión máxima
recomendada](https://developer.chrome.com/apps/manifest/name#short_name) de Chrome es de
12 caracteres.

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

La auditoría se aprueba si el manifiesto contiene la propiedad `short_name` o la propiedad `name`.
El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos.


{# wf_devsite_translation #}
