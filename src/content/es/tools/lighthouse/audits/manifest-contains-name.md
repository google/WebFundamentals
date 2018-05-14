project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene la propiedad name".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene un nombre  {: .page-title }

## Por qué es importante la auditoría {: #why }

La propiedad `name` del manifiesto de apps web es un nombre de tu app
que el usuario puede leer, ya que su fin es que se muestre al dispositivo móvil del usuario.

Si no se proporciona una propiedad `short_name`, entonces `name` es la etiqueta que se usará
en la pantalla de inicio del dispositivo móvil junto al ícono de tu app.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `name` al manifiesto de apps web.

    {
      ...
      "name": "Air Horner",
      ...
    }

La [extensión
máxima](https://developer.chrome.com/apps/manifest/name) de Chrome es de 45 caracteres.

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse obtiene manifiesto y verifica que tenga la propiedad `name`.
El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos.


{# wf_devsite_translation #}
