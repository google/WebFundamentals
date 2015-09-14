---
title: "Activación de la seguridad de transporte estricta y cookies de seguridad"
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Debe utilizar la seguridad de transporte estricta de HTTP (HSTS) para evitar el costo del redireccionamiento mediante el código 301."
  - "Asegúrese de configurar siempre el marcador Secure en las cookies."
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

En este punto, ya está preparado para utilizar el protocolo HTTPS de forma segura. En primer lugar, utilice la [seguridad
de transporte
estricta](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) para indicarles
a los clientes que siempre se deben conectar a su servidor a través del protocolo HTTPS, incluso cuando
lo hagan siguiendo una referencia http://. De este modo, se eliminan los ataques, como los de [SSL
Stripping](http://www.thoughtcrime.org/software/sslstrip/), y también se evita el costo
de ida y vuelta del redireccionamiento mediante el código 301 que habilitamos en la sección "Redireccionamiento de HTTP a HTTPS."

**NOTA:** Es probable que los clientes que notaron que su sitio es un host de HSTS reconocido 
 [no quieran volver a usarlo](https://tools.ietf.org/html/rfc6797#section-12.1) [si en su
](https://tools.ietf.org/html/rfc6797#section-12.1)[sitio experimentan  alguna vez un error en
la configuración de la TLS (Seguridad en la capa de transporte)],(https://tools.ietf.org/html/rfc6797#section-12.1) (tal como
un certificado vencido). Esta es una elección de diseño explícito de HSTS y le
permite asegurarse de que los atacantes de la red no engañen a los clientes para que accedan al
sitio sin HTTPS. No habilite HSTS hasta que esté seguro de que el funcionamiento de su sitio
es lo suficientemente sólido como para evitar que el protocolo HTTPS se ejecute con
errores de validación de certificados.

Para activar la seguridad de transporte estricta de HTTP (HSTS), configure el encabezado de
seguridad de transporte estricta. [En la página de HSTS de OWASP encontrará vínculos de
instrucciones](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
para diferentes softwares de servidores.

La mayoría de los servidores web ofrece una capacidad similar para agregar encabezados personalizados.

**NOTA:** El campo max-age se mide en segundos. Puede comenzar con valores bajos y
aumentar gradualmente el valor del campo max-age a medida que se siente más cómodo usando un sitio que sea solamente
HTTPS.

También es importante asegurarse de que los clientes nunca envíen cookies (como para
realizar autenticaciones o debido a las preferencias del sitio) a través de HTTP. Por ejemplo, si la cookie de autenticación de un usuario
se expusiera en texto sin formato, se destruiría la garantía de seguridad
de toda la sesión, incluso si hizo todo lo demás
correctamente.

Por consiguiente, cambie la configuración de su aplicación web para que siempre se coloque el marcador Secure en las cookies
que se ejecutan. [En esta página de OWASP, se explica cómo configurar el marcador Secure
](https://www.owasp.org/index.php/SecureFlag) en diferentes marcos de
aplicaciones. El marcador se configura de manera diferente según el marco de cada aplicación.

