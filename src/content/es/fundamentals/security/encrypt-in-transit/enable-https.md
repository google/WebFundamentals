project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La habilitación de HTTPS en tus servidores es fundamental para la seguridad de tus páginas web. 

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-27 #}

# Habilitación de HTTPS en tus servidores {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* Crea un par de clave pública/privada de RSA de 2048 bit.
* Genera una solicitud de firma de certificados (CSR) que incluya tu clave pública.
* Comparte tu CSR con tu autoridad de certificación (CA) para recibir un certificado final o una cadena de certificados.
* Instala el certificado final en un lugar al que no se pueda acceder a través de la Web, como `/etc/ssl` (Linux y Unix), o donde lo requiera IIS (Windows).

## Generación de claves y solicitudes de firma de certificados

En esta sección, se usa el programa de línea de comandos OpenSSL, que se ofrece con la mayoría
de los sistemas de Linux, BSD y Mac OS X para generar claves privadas o públicas y una CSR.


### Generación de un par de claves públicas o privadas

Comencemos generando un par de clave de RSA de 2048 bit. Las claves más pequeñas, como las de
1024 bits, no son lo suficientemente resistentes a los ataques externos por fuerza bruta. Las
claves más grandes, como las de 4096 bits, son exageradas. Con el tiempo, el tamaño de las claves aumenta a medida que
el procesamiento por computadora se vuelva más económico. Actualmente, el punto óptimo es 2048.

El comando para generar el par de clave de RSA es:

    openssl genrsa -out www.example.com.key 2048

Esto brinda el siguiente resultado:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Genera una solicitud de firma de certificado

En este paso, incorporas tu clave pública y la información sobre tu organización
y tu sitio web en una solicitud de firma de certificado o CSR. El comando
*openssl* te pide en forma interactiva los metadatos obligatorios.

Si ejecutas el siguiente comando:

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

El resultado es el siguiente:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Para garantizar la validez de la CSR, ejecuta este comando:

    openssl req -text -in www.example.com.csr -noout

La respuesta debe ser así:

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### Envía la CSR a una autoridad de certificación

Distintas autoridades de certificación (CA) requieren distintos métodos para enviarles
tus CSR. Los métodos pueden incluir el uso de un formulario en su sitio web, el envío de la
CSR por correo electrónico u otra cosa. Algunas CA (o los revendedores) pueden incluso automatizar
el proceso de manera parcial o total (incluida, en algunos casos, la generación de pares de claves y de la
CSR).

Envía la CA a tu CSR y sigue las instrucciones para recibir el certificado
final o la cadena de certificados.

Las CA cobran diferentes montos de dinero por el servicio de comprobación
de tu clave pública.

También se ofrece la opción de asignar tu clave a más de un nombre de DNS, incluidos
varios nombres diferentes (p. ej., todas las instancias de example.com, www.example.com, example.net
y www.example.net) o nombres “comodín”, como \*.example.com.

Por ejemplo, una CA actualmente tiene los siguientes precios:

* Estándar: $16 al año; válido para example.com y www.example.com
* Comodín: $150/año; válido para example.com y \*.example.com

Considerando estos precios, los certificados comodín son económicos si posees más de 9
subdominios; de lo contrario, solo puedes comprar uno o más certificados para un solo nombre. (Si
posees más de cinco subdominios, por ejemplo, tal vez un certificado comodín
te resulte más conveniente cuando decidas habilitar HTTPS en tus servidores).

Note: Ten en cuenta que, en los certificados comodín, el comodín se aplica a una sola etiqueta de DNS. Un certificado que sea conveniente para \*.example.com será útil para foo.example.com y bar.example.com, pero _no_ para foo.bar.example.com.

Copia los certificados a todos tus servidores front-end en un
espacio al que no se pueda acceder a través de la Web, como `/etc/ssl` (Linux y Unix), o en cualquier lugar donde lo requiera IIS (Windows).

## Habilitación de HTTPS en tus servidores

La habilitación de HTTPS en tus servidores es un paso crítico para proporcionar seguridad en tus páginas web.

* Utiliza la herramienta Configuración del servidor de Mozilla para configurar tu servidor y permitir que sea compatible con HTTPS.
* Prueba regularmente tu sitio con la práctica herramienta SSL Server Test de Qualys y asegúrate de obtener una calificación A o A+, como mínimo.

En este punto, debes tomar una decisión crucial sobre las operaciones. Elige una de las siguientes:

* Dedicar una dirección IP diferente para cada nombre de host del que obtiene contenido tu servidor
  web.
* Utilizar el hosting virtual basado en nombres.

Si has utilizado distintas direcciones IP para cada nombre de host, puedes
fácilmente soportar HTTP y HTTPS para todos los clientes.

Sin embargo, la mayoría de los operadores de sitios usan hosting virtual basado en nombres para conservar direcciones
IP y porque, en general, resulta más conveniente. El problema con IE en
Windows XP y las versiones de Android anteriores a 2.3 es que este navegador no comprende la [indicación
de nombre de servidor](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external} (SNI),
que es fundamental para los hosting virtuales HTTPS basados en nombres.

En el futuro, y esperamos que sea un futuro cercano, los clientes que no ofrezcan compatibilidad con SNI serán reemplazados
por software moderno. Controla la cadena usuario-agente en tus registros de solicitudes para saber
el momento en que se produjo la migración de suficientes usuarios propios a un software moderno. (Puedes
decidir cuál es tu límite; tal vez &lt; 5% o &lt; 1%).

Si el servicio HTTPS aún no está disponible en tus servidores, habilítalo ahora mismo
(sin redireccionar HTTP a HTTPS. Consulta la información a continuación). Configura tu servidor web para usar
los certificados que compraste e instalaste. La herramienta [práctica para generar
configuraciones
de Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}
puede resultarte útil.

Si posees muchos nombres de host o subdominios, cada uno deberá usar el certificado
adecuado.

Warning: Si ya completaste estos pasos, pero usas HTTPS con le único objetivo de redirigir a los clientes a HTTP, deja de hacerlo ahora. Consulta la próxima sección para asegurarte de que HTTPS y HTTP funcionen correctamente.

Note: En última instancia, debes redireccionar las solicitudes de HTTP a HTTPS y usar Seguridad de transporte estricta HTTP (HSTS). Sin embargo, esta no es la etapa adecuada del proceso de migración para hacerlo. Consulta “Redirecciona de HTTP a HTTPS” y “Activa la Seguridad de transporte estricta y cookies de seguridad”.

Ahora mismo, y durante el tiempo que dure tu sitio, verifica la configuración de HTTPS a través de la
[práctica herramienta SSL Server Test de Qualys](https://www.ssllabs.com/ssltest/){: .external }. Tu sitio
debe obtener una puntuación de A o A+. Considera como error todo aquello que genere una calificación inferior.
(Una A hoy equivaldrá a una B en el futuro, ya que los ataques contra los algoritmos y los protocolos
siempre evolucionan).

## Haz las URL dentro del sitio relativas

Ahora que tu sitio se ofrece tanto en HTTP como en HTTPS, debe funcionar de la forma más
eficaz posible, independientemente del protocolo. Un factor importante es usar
URL relativas para vínculos dentro del sitio.

Verifica que las URL dentro del sitio y las URL externas sean independientes del protocolo; es decir, asegúrate de usar rutas de acceso relativas u omite el protocolo, como en `//example.com/something.js`.

Surge un problema cuando sirves una página vía HTTPS que incluye recursos
HTTP, conocidos como [contenido mixto](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content). Los navegadores les advierten a los usuarios que se ha perdido la fuerza total de HTTPS. De hecho, en el caso del contenido mixto activo (secuencias de comandos, complementos, CSS o iframes), a menudo, los navegadores simplemente no cargarán ni ejecutarán el contenido, lo cual ocasionará desperfectos en la página.

Note: Es totalmente correcto incluir recursos de HTTPS en una página HTTP.

Además, si incluyes vínculos con otras páginas en tu sitio, los usuarios podrían
sufrir una degradación de HTTPS a HTTP.

Estos problemas se presentan cuando en tus páginas se incluyen URL totalmente
calificadas dentro del sitio en las que se use el esquema *http://*. 

<p><span class="compare-worse">No recomendado</span>: no recomendamos que uses URL totalmente calificadas dentro del sitio.</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

En otras palabras, asegúrate de que las URL dentro del sitio sean lo más relativas posibles, ya sean relativas de protocolo (no poseen un protocolo, comienzan con `//example.com`) o relativas de host (comienzan solo con la ruta de acceso, como `/jquery.js`).

<p><span class="compare-better">Recomendado</span>: recomendamos el uso de URL relativas de protocolo dentro del sitio.</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">Recomendado</span>: recomendamos el uso de URL relativas dentro del sitio.</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Usa una secuencia de comandos para hacer esto; no lo hagas de forma manual. Si el contenido de tu sitio se encuentra en una base de datos,
prueba tu secuencia de comandos en una copia de desarrollo de tu base de datos. Si el contenido de
tu sitio consiste en archivos simples, prueba tu secuencia de comandos en una copia de desarrollo de los archivos. Aplica los cambios a producción únicamente luego de que estos aprueben el control de calidad, como siempre. Puedes usar la [secuencia de comandos de Bram van Damme](https://github.com/bramus/mixed-content-scan) o algo similar para detectar contenido mixto en tu sitio.

Cuando realices vinculaciones a otros sitios (que es diferente de incluir recursos de otros sitios),
no cambies el protocolo, ya que no puedes controlar el modo en el que operan esos
sitios.

Success: Recomendamos usar URL relativas de protocolo para que la migración de sitios grandes se realice sin problemas. Si todavía no estás seguro de si ya puedes implementar HTTPS por completo, forzar a tu sitio para que utilice HTTPS para todos los subrecursos podría tener consecuencias negativas. Es posible que durante algún tiempo HTTPS resulte nuevo y extraño. De todos modos, el sitio HTTP debe funcionar tan bien como siempre. Con el tiempo, completarás la migración y podrás utilizar HTTPS definitivamente (consulta las dos secciones siguientes).

Si tu sitio depende de una secuencia de comandos, una imagen u otros recursos ofrecidos por un
tercero, como CDN o jquery.com, tienes dos opciones:

* Usar URL relativas de protocolo para estos recursos. Si el tercero no
ofrece HTTPS, pídele que lo haga. La mayoría de ellos ya lo hacen, incluido jquery.com. 
* Ofrecer los recursos desde un servidor que controles y en que ofrezca tanto HTTP
como HTTPS. De todos modos, esta suele ser una buena idea, ya que luego puedes tener mejor
control sobre la apariencia, el rendimiento y la seguridad de tu sitio. Además,
no tienes que confiar en un tercero, lo cual siempre es positivo.

Note: Ten en cuenta que también debes cambiar las URL dentro del sitio en tus hojas de estilos, JavaScript, reglas de redirección, etiquetas `<link>` y declaraciones del CSP, no solo en las páginas HTML.

## Redirecciona de HTTP a HTTPS

Debes colocar un [vínculo canónico](https://support.google.com/webmasters/answer/139066) en el encabezado de tu página para comunicar a los motores de búsqueda que HTTPS es la mejor forma de acceder a tu sitio.

Coloca etiquetas `<link rel="canonical" href="https://…"/>` en tus páginas. Esto
permite que los motores de búsqueda puedan determinar la mejor forma de acceder a tu sitio.

## Activa la seguridad de transporte estricta y cookies de seguridad

En este punto, ya está preparado para utilizar el protocolo HTTPS de forma segura. 

* Usa la seguridad de transporte estricta de HTTP (HSTS) para evitar el costo del redireccionamiento mediante el código 301.
* Configura siempre el marcador Secure para las cookies.

En primer lugar, usa la [seguridad de transporte estricta](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
para indicar a los clientes que siempre deben conectarse a tu servidor a través de HTTPS, incluso
si siguen una referencia `http://`. Esto elimina los ataques, como los de
[SSL Stripping](http://www.thoughtcrime.org/software/sslstrip/){: .external }, y también
se evita el costo de ida y vuelta del `301 redirect` que habilitamos en la sección
[Redirecciona de HTTP a HTTPS](#redirect-http-to-https).

Note: Es probable que los clientes que consideran a tu sitio un host de HSTS reconocido <a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>no quieran volver a usarlo</i> si tu sitio alguna vez tiene un error en su configuración de la TLS</a> (por ejemplo, un certificado vencido). La HSTS se diseñó explícitamente de esta forma para asegurarse de que los atacantes a la red no puedan engañar a los clientes para que accedan al sitio sin HTTPS. No habilites HSTS hasta asegurarte de que el funcionamiento de tu sitio es lo suficientemente sólido como para evitar que se implemente HTTPS con errores de validación de certificados.

Activa la Seguridad de transporte estricta de HTTP (HSTS) estableciendo el encabezado `Strict-Transport-Security`. [La página sobre HSTS de OWASP tiene vínculos a las instrucciones](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) para diferentes opciones de software del servidor.

La mayoría de los servidores web ofrecen una capacidad similar para agregar encabezados personalizados.

Note: `max-age` se mide en segundos. Puedes comenzar con valores bajos y aumentar gradualmente el valor de `max-age` a medida que te sientas más cómodo con el uso de un sitio que sea solamente HTTPS.

También es importante asegurarse de que los clientes nunca envíen cookies (por ejemplo, para
realizar autenticaciones o debido a las preferencias del sitio) a través de HTTP. Por ejemplo, si la cookie de autenticación
de un usuario se expusiera en texto sin formato, se destruiría la garantía de seguridad
de toda la sesión, ¡incluso si hiciste
bien todo lo demás!

Por lo tanto, cambia tu app web para que siempre se establezca el marcador Secure en las cookies
que se ejecutan. [Esta página de ONWASP explica cómo configurar el marcador Secure](https://www.owasp.org/index.php/SecureFlag) en diferentes frameworks de apps. El marcador se configura de manera diferente según el framework de cada app.

La mayoría de los servidores web ofrecen una función simple de redireccionamiento. Usa `301 (Moved Permanently)` para
indicar a los motores de búsqueda y a los navegadores que la versión de HTTPS es canónica y para redireccionar a tus usuarios de la versión HTTP a la versión HTTPS de tu sitio.

## Inquietudes sobre la migración

Muchos programadores tienen dudas válidas sobre la migración de HTTP a HTTPS.
El equipo de Google Webmasters tiene algunas [pautas excelentes](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J) disponibles.

### Ranking de búsqueda

Google usa [HTTPS como indicador de buena calidad de búsqueda](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google también publica una guía sobre
[cómo transferir, mover o migrar tu sitio](https://support.google.com/webmasters/topic/6029673)
y seguir manteniendo su posición en el ranking de búsqueda. Bing también publica
[pautas para webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Rendimiento

Si las capas de contenido y apps están bien configuradas (consulta
[los libros de Steve Souders](https://stevesouders.com/){: .external } para obtener muy buenos consejos), las inquietudes
restantes sobre el rendimiento de la TLS son generalmente pequeñas en relación con el
costo total de la app. Además, puedes reducir y amortizar
esos costos. (Para obtener muy buenos consejos sobre la optimización de la TLS y en general, consulta
[High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545) de Ilya Grigorik). Consulta también [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/) y [Bulletproof SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/) de Ivan Ristic.

En algunos casos, la TLS puede mejorar el rendimiento, principalmente porque permite que
HTTP/2 sea posible. Chris Palmer dio una charla sobre [el rendimiento de HTTPS y HTTP/2 en la Cumbre de Desarrolladores de Chrome del 2014](/web/shows/cds/2014/tls-all-the-things).

### Encabezados de referencia

Cuando los usuarios siguen los vínculos desde tu sitio HTTPS a otros sitios HTTP, los agentes de usuario no envían el encabezado de referencia. Si esto representa un problema, se puede solucionar de varias
maneras:

* Se deben migrar los otros sitios a HTTPS. Si los sitios de referencia pueden completar la sección [Habilitación de HTTPS en tus servidores](#enable-https-on-your-servers) de esta guía, puedes cambiar los vínculos de tu sitio por los de ellos, de `http://` a `https://`, o puedes usar vínculos relativos de protocolo.
* Usa el nuevo [Estándar de la política de referencias](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta) para solucionar provisoriamente diferentes problemas con los encabezados de referencia.

Ya que los motores de búsqueda están migrando a HTTPS, en el futuro, es probable que veas _más_ encabezados de referencia cuando migres a HTTPS.

Warning: Según la [RFC de HTTP](https://tools.ietf.org/html/rfc2616#section-15.1.3), los clientes **NO DEBEN** incluir un campo de encabezado de referencia en una solicitud de HTTP (no segura) si la página de referencia se transfiere con un protocolo seguro.

### Ingresos por anuncios

A los operadores de sitio que monetizan su sitio mediante anuncios les conviene asegurarse de que la
migración a HTTPS no reduzca las impresiones de los anuncios. Sin embargo, debido a las inquietudes de seguridad
por el contenido mixto, un `<iframe>` HTTP no funciona en una página HTTPS. Aquí se presenta un
problema delicado que afecta a todos: hasta que los anunciantes no publiquen en HTTPS,
los operadores de sitios no podrán realizar migraciones a HTTPS sin perder ingresos por anuncio; sin embargo, hasta que los
operadores de sitios no migren a HTTPS, los anunciantes no tendrán necesidad de publicar en HTTPS.

Los anunciantes deben, al menos, ofrecer servicios de anuncios a través de HTTPS (por ejemplo, completando
la sección "Habilitación de HTTPS en tus servidores" de esta página). Muchos ya lo están haciendo. Deberías
solicitar a los anunciantes que no ofrecen HTTPS para nada, que por lo menos comiencen a hacerlo.
Tal vez quieras posponer la sección [Haz las URL dentro del sitio relativas](#make-intrasite-urls-relative) hasta que una cantidad suficiente de anunciantes interoperen adecuadamente.


{# wf_devsite_translation #}
