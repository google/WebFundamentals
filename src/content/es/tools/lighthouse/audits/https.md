project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio está en HTTPS".

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# El sitio está en HTTPS  {: .page-title }

## Por qué es importante la auditoría {: #why }

Todos los sitios web se deben proteger con HTTPS, incluso los que no manejan
datos confidenciales. HTTPS evita que los intrusos manipulen o escuchen pasivamente
las comunicaciones entre tu sitio y el de tus usuarios.

HTTPS también es un requisito previo para muchas funciones nuevas y potentes de las plataformas web, como
tomar fotografías o grabar audio.

Por definición, una app no puede calificar como una app web progresiva si no se ejecuta
en HTTPS. Esto se debe a que muchas tecnologías de apps web progresivas centrales, como
service worker, requieren HTTPS.

Para obtener más información sobre cómo se deben proteger todos los sitios con HTTPS, consulta
[Por qué usar siempre HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https).

## Cómo aprobar la auditoría {: #how }

Migra tu sitio a HTTPS.

Muchas plataformas de hosting, como
[Firebase](https://firebase.google.com/docs/hosting/){: .external } o [GitHub
Pages](https://pages.github.com/){: .external }, son seguras de manera predeterminada.

Si ejecutas tus propios servidores y necesitas una manera económica y sencilla de generar
certificados, consulta [Encriptemos](https://letsencrypt.org/){: .external }. Para obtener más ayuda
con la habilitación de HTTPS en tus servidores, consulta el siguiente conjunto de documentos: [Encriptar
datos en tránsito](/web/fundamentals/security/encrypt-in-transit/enable-https).

Si tu página ya se ejecuta en HTTPS, pero no apruebas esta auditoría,
es posible que tengas problemas con contenido mezclado. El término “contenido mezclado” se refiere a cuando un sitio
seguro solicita un recurso no protegido (HTTP). Consulta el siguiente documento sobre el
panel Security de Chrome DevTools para obtener información sobre cómo depurar estas situaciones.
[Comprende los problemas de seguridad](/web/tools/chrome-devtools/debug/security).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse espera que se produzca un evento del protocolo del depurador de Chrome que indique que
la página se ejecuta en una conexión segura. Si el evento no se produce dentro de los 10
segundos, la auditoría falla.


{# wf_devsite_translation #}
