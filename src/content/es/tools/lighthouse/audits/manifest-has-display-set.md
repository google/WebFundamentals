project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "La propiedad display del manifiesto está establecida".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# La propiedad de visualización del manifiesto está establecida  {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando tu app se inicia desde la pantalla de inicio, puedes usar la propiedad `display`
en el manifiesto de apps web para especificar el modo de visualización de la app.

## Cómo aprobar la auditoría {: #how }

Agrega la propiedad `display` al manifiesto de apps web y establécela en uno de los
siguientes valores: `fullscreen`, `standalone` o `browser`.

    {
      ...
      "display": "fullscreen",
      ...
    }

Consulta la [referencia de MDN sobre la propiedad
display](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) para
obtener más información sobre cada uno de estos valores.

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse obtiene el manifiesto y verifica que la propiedad `display`
exista y que su valor sea `fullscreen`, `standalone` o `browser`.

El manifiesto que Lighthouse obtiene no es el que Chrome
usa en la página, lo que puede dar resultados imprecisos.


{# wf_devsite_translation #}
