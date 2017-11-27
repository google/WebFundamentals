project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "La propiedad short_name del manifiesto no se truncará cuando se la muestra en la pantalla de inicio".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El nombre corto de manifiesto no se truncará cuando se lo muestre en la pantalla de inicio {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando el usuario agrega tu app web a la pantalla de inicio, la propiedad `short_name` se
muestra como la etiqueta junto al ícono de la app. Si `short_name` tiene más de
12 caracteres, se truncará en la pantalla de inicio.

Ten en cuenta que si `short_name` no figura, Chrome puede volver a la propiedad
`name` si esta es lo suficientemente corta.

## Cómo aprobar la auditoría {: #how }

Haz que la propiedad `short_name` tenga menos de 12 caracteres en el manifiesto de apps web.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

O bien, si no especificas una propiedad `short_name` en el manifiesto, haz que la propiedad
`name` tenga menos de 12 caracteres.

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse obtiene el manifiesto y verifica que la propiedad `short_name` tenga menos de
12 caracteres. Ten en cuenta que la propiedad `name` se puede usar como
respaldo para la propiedad `short_name`, por lo que Lighthouse también prueba esta propiedad como un respaldo.
Por lo tanto, si no incluyes `short_name` en tu manifiesto, pero `name` tiene
menos de 12 caracteres, se aprueba la auditoría. El manifiesto que Lighthouse
obtiene no es el que Chrome usa en la página, lo que puede dar
resultados imprecisos.


{# wf_devsite_translation #}
