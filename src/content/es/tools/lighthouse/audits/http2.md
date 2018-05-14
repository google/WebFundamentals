project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio usa HTTP/2 para sus propios recursos".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# El sitio usa HTTP/2 para sus propios recursos  {: .page-title }

## Por qué es importante la auditoría {: #why }

HTTP/2 puede proporcionar los recursos de la página más rápido y con menos transferencia de
datos.

Consulta [Preguntas frecuentes sobre HTTP/2][faq] para ver una lista de los beneficios que HTTP/2
ofrece en comparación con HTTP/1.1.

Consulta [Introducción a HTTP/2][intro] para obtener información técnica detallada.

[preguntas frecuentes]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## Cómo aprobar la auditoría {: #how }

En **URLs**, Lighthouse enumera todos los recursos que no se proporcionaron mediante HTTP/2.
Para aprobar esta auditoría, proporciona estos recursos por HTTP/2.

Para obtener más información sobre cómo habilitar HTTP/2 en los servidores, consulta [Configurar HTTP/2][setup].

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse recopila todos los recursos que son del mismo host que la
página y luego comprueba la versión del protocolo HTTP de cada recurso.

Lighthouse excluye los recursos de otros hosts de esta auditoría, porque
asume que no tienes control sobre cómo se brindan estos recursos.


{# wf_devsite_translation #}
