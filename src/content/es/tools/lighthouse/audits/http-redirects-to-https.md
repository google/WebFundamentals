project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio redirecciona el tráfico HTTP a HTTPS".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# El sitio redirecciona el tráfico HTTP a HTTPS  {: .page-title }

## Por qué es importante la auditoría {: #why }

Todos los sitios deben estar protegidos con HTTPS. Consulta el siguiente documento de Lighthouse para
conocer el motivo: [El sitio está en HTTPS](https).

Cuando hayas configurado HTTPS, debes asegurarte de que todo el tráfico HTTP
a tu sitio se redireccione a HTTPS.

## Cómo aprobar la auditoría {: #how }

1. Usa vínculos canónicos en el elemento `head` de tu código HTML para ayudar a los motores de búsqueda a descubrir
   la mejor manera de obtener la página.

       <link rel="canonical" href="https://example.com"/>

2. Configura tu servidor para que redireccione el tráfico HTTP a HTTPS. Consulta la documentación de tu
   servidor para identificar la mejor manera de hacer esto.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse cambia la dirección URL de la página a `http`, la carga y espera que se produzca el
evento del depurador de Chrome que indica que la página es segura. Si
Lighthouse no recibe el evento en 10 segundos, la auditoría falla.


{# wf_devsite_translation #}
