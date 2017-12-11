project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa el panel Security para asegurarte de que todos los recursos de tu sitio estén protegidos con HTTPS.

{# wf_updated_on: 2016-03-09 #}
{# wf_published_on: 2015-12-21 #}

# Conoce los problemas de seguridad {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

HTTPS proporciona [seguridad crítica e integridad de datos][why-https]
para tus sitios web y las personas que confían a estos 
su información personal. Usa el panel Security de Chrome DevTools 
para depurar los problemas de seguridad y verificar que 
HTTPS esté bien implementado en tus sitios web.


### TL;DR {: .hide-from-toc }
- Usa Security Overview para determinar al instante si la página actual es segura o no.
- Inspecciona orígenes individuales para ver información sobre la conexión y el certificado (para orígenes seguros), o para conocer exactamente las solicitudes desprotegidas (para orígenes no seguros).


## Security Overview

Para ver la seguridad general de una página, abre DevTools y visita el panel 
Security. 

Lo primero que verás será Security Overview. A simple vista, 
Security Overview te informa si la página es segura. Si la página es segura, se indicará 
con el mensaje `This page is secure (valid HTTPS).`

![Security Overview, página segura](images/overview-secure.png)

Haz clic en **View certificate** para ver el certificado del servidor relacionado con el 
[origen principal][same-origin-policy]. 

![view certificate](images/view-certificate.png)

Si la página no es segura, se indicará con el mensaje `This page is not secure.`

En el panel Security, se distinguen dos tipos de páginas no seguras.
Si la página solicitada se proporciona a través de HTTP, el origen principal se marcará como 
no seguro. 

![Security Overview, origen principal no seguro](images/overview-non-secure.png)

Si la página solicitada se proporciona a través de HTTPS, pero luego 
obtiene contenido desde otros orígenes a través de HTTP, se 
marcará como no segura. Esto se conoce como una página de [contenido mixto][mixed-content].
 Las páginas de contenido mixto están parcialmente protegidas porque los rastreadores pueden tener acceso al contenido 
HTTP y este tipo de contenido es vulnerable a ataques de intermediarios. 

![Security Overview, contenido mixto](images/overview-mixed.png)

Haz clic en **View request in Network Panel** para abrir una vista filtrada del 
panel Network y ver con exactitud las solicitudes proporcionadas a través de HTTP. Aquí se mostrarán 
todas las solicitudes desprotegidas de todos los orígenes. 

![Panel Network, recursos no seguros, todos los orígenes](images/network-all.png)

## Inspecciona los orígenes

Usa el panel izquierdo para inspeccionar un origen individual, seguro o no seguro. 

Haz clic en un origen seguro para ver información detallada de la conexión y del certificado de 
dicho origen.

![Información del origen, seguro](images/origin-detail-secure.png)

Si haces clic en un origen no seguro, en el panel Security se proporcionará un vínculo a una vista filtrada del panel Network. 

![Información del origen, no seguro](images/origin-detail-non-secure.png)

Haz clic en el vínculo para ver con exactitud las solicitudes de dicho origen 
proporcionadas a través de HTTP. 

![Panel Network, recursos no seguros, un origen](images/network-one.png)





[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
