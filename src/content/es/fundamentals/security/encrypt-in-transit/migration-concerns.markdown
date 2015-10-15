---
title: "Inquietudes sobre la migración"
updated_on: 2015-03-27
translation_priority: 0

---

En esta sección, trataremos las inquietudes que se les podrían plantear a los operadores sobre la migración a HTTPS.

{% include shared/toc.liquid %}

## Clasificación de la búsqueda

[Google utiliza el protocolo HTTPS como indicador de buena calidad
de búsqueda](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google también publica una guía sobre [cómo transferir, mover o migrar su
sitio](https://support.google.com/webmasters/topic/6029673) y seguir manteniendo su
clasificación de la búsqueda. En Bing, también se publican las [pautas para
administradores web](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

## Rendimiento

Si las capas de contenido y aplicaciones están bien sincronizadas (consulte [los libros de Steve Souders
](https://stevesouders.com/) para obtener más información), las inquietudes que se plantean inquietudes sobre el rendimiento restante de la TLS (Seguridad de la capa de transporte)
son, generalmente, más pequeñas, en relación con el costo total de la
aplicación. Además, puede reducir y amortizar esos costos. (Para obtener más
información sobre la optimización de TLS y otras generalidades, consulte [High Performance Browser
Networking] [Redes del navegador de alto rendimiento](http://chimera.labs.oreilly.com/books/1230000000545) [de Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545)). Consulte también [OpenSSL
Cookbook (Guía de OpenSSL)](https://www.feistyduck.com/books/openssl-cookbook/) y [Bulletproof
SSL And TLS (SSL y TSL a prueba de balas)](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/) de Ivan
Ristic.

En algunos casos, la TLS puede mejorar el rendimiento, principalmente como resultado de lograr que se utilice
HTTP/2. Chris Palmer dio [una charla sobre el rendimiento de HTTPS y HTTP/2 en la Cumbre de Desarrollo de Chrome 
, en 2014]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things).

## Encabezados de referencia

Los agentes de usuario no enviarán el encabezado de referencia cuando los usuarios sigan los vínculos desde su sitio
HTTPS a otros sitios HTTP. Si esto representa un problema, se puede solucionar de diferentes
maneras:

* Se deben migrar los otros sitios a HTTPS. Tal vez esta guía les resulte
 útil :) Si los sitios de referencia pueden completar la sección "Habilitación de HTTPS en sus servidores" de esta guía, podrá cambiar
 los vínculos de su sitio al de ellos, de http:// a https://, o bien podrá utilizar
 vínculos relativos de protocolo.
* Puede utilizar el nuevo [estándar de la política
 de referencias](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
 para tratar diferentes problemas con los encabezados de referencia.

Como los motores de búsqueda se están migrando a HTTPS, es probable que vea más encabezados
de referencia cuando migre a HTTPS.

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Los clientes NO DEBEN incluir un campo de encabezado de referencia en una solicitud de HTTP (no segura) si la página de referencia se transfiriera mediante un protocolo de seguridad.<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">Según las RFC (Solicitudes de comentarios) de HTTP</a></p></blockquote>

## Ingresos por anuncios

Los operadores del sitio que monetizan su sitio al mostrar anuncios desean asegurarse de que la
migración a HTTPS no reduzca las impresiones de los anuncios. Sin embargo, debido a las inquietudes de seguridad
del contenido mixto, un Iframe de HTTP no funcionará en una página HTTPS. Aquí se presenta un problema delicado de accionamiento colectivo
: hasta que los anunciantes publiquen en los sitios HTTPS,
los operadores de sitios no pueden migrar a HTTPS sin perder ingresos por anuncios; pero hasta que los
operadores migren a HTTPS, los anunciantes se sienten poco motivados para publicar en los sitios HTTPS.

Los anunciantes deben ofrecer, al menos, el servicio de anuncios a través de HTTPS (como, por ejemplo, mediante la
"Habilitación de HTTPS en sus servidores», que se menciona en esta guía). Muchos ya lo están haciendo. Debe solicitarles a los anunciantes que no ofrecen
HTTPS que al menos comiencen a hacerlo. Tal vez deba posponer la realización de la sección "Conversión de las URL dentro de los sitios en relativas" de
esta guía hasta que una cantidad suficiente de anunciantes interoperen adecuadamente.

