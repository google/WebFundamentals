project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto contiene íconos de al menos 192 píxeles".

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# El manifiesto contiene íconos de al menos 192 píxeles  {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando un usuario agrega tu app a la pantalla de inicio, el dispositivo móvil necesita un ícono para
mostrar. El ícono se especifica en la matriz `icons` del manifiesto de apps web.

Un ícono de 192 píxeles garantiza que tu ícono se muestra correctamente en los
dispositivos Android más grandes. Para los dispositivos que necesitan un ícono más pequeño, Android
puede reducir el ícono de 192 píxeles con una precisión razonable. En otras palabras,
aunque puedes proporcionar íconos más pequeños en el manifiesto de apps web, no es
necesario que lo hagas.

## Cómo aprobar la auditoría {: #how }

Agrega un ícono de 192 píxeles al manifiesto de apps web.

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

Consulta [El manifiesto existe](manifest-exists#how)
para obtener una lista de guías que muestran cómo implementar
y probar correctamente la compatibilidad con "Add to Homescreen" en tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

La auditoría solo puede garantizar que el ícono se muestre correctamente en los dispositivos Android.
Otros sistemas operativos pueden requerir otro tamaño de ícono para una presentación
óptima.

Lighthouse obtiene el manifiesto y verifica que la propiedad `icons`
haga referencia a un ícono de 192 píxeles. El manifiesto que Lighthouse obtiene no es
el que Chrome usa en la página, lo que puede dar
resultados imprecisos. Ten en cuenta que Lighthouse no controla si el ícono
existe realmente en la caché. Tan solo se asegura de que el manifiesto de apps
web defina un ícono de 192 píxeles.


{# wf_devsite_translation #}
