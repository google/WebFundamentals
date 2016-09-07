project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Enabling HTTPS on your servers is critical to securing your webpages. 

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-03-27 #}

# Enabling HTTPS on Your Server {: .page-title }

{% include "_shared/contributors/TODO.html" %}

## Generación de claves y solicitudes de firma de certificados 




En esta sección, se utiliza el programa de línea de comandos OpenSSL, que se ofrece con la mayoría de los sistemas de Linux, BSD y Mac OS X, para generar claves privadas o públicas, y una CSR (solicitud de firma de certificados).

### TL;DR {: .hide-from-toc }
- 'Debe crear un par de claves públicas y privadas RSA (Rivest, Shamir y Adleman) de 2.048&nbsp;bits.'
- Genere una solicitud de firma de certificados (CSR) que incluya su clave pública.
- Comparta su CSR con su CA (autoridad de certificación) para recibir un certificado final o una cadena de certificados.
- 'Instale el certificado final en un lugar al que no se pueda acceder a través de la web, como /etc/ssl (Linux y Unix), o en cualquier lugar donde lo requiera IIS (Windows).'



### Generación de un par de claves públicas o privadas

En este ejemplo, generaremos un par de claves RSA de 2.048&nbsp;bits. (Las claves más pequeñas, como las de
1.024&nbsp;bits, no son lo suficientemente resistentes a los ataques externos por fuerza bruta. Las
claves más grandes, como las de 4.096&nbsp;bits, son exageradas. Con el paso del tiempo, el tamaño de las claves aumenta a medida que
el procesamiento por computadora es más económico. Actualmente, el punto óptimo es 2.048.)

El comando para generar el par de claves RSA es el siguiente:

    openssl genrsa -out www.example.com.key 2048

De este modo, obtendrá el siguiente resultado:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Generación de una CSR

En esta instancia, incrusta su clave pública e información sobre su organización
y su sitio web en una solicitud de firma de certificado. En *openssl*, se le solicitarán sus metadatos
de forma interactiva.

Si ejecuta el siguiente comando:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Obtendrá el siguiente resultado:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Ahora, asegúrese de que la CSR esté bien. Para hacerlo, use el siguiente comando:

    openssl req -text -in www.example.com.csr -noout

Y la respuesta debe verse de esta manera:

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

### Envío de la CSR a una CA

Según la CA que desee utilizar, podrá enviar 
su CSR de diferentes maneras: mediante un formulario en el sitio web, por correo electrónico o por algún otro
medio. Algunas CA (o sus revendedores) pueden incluso automatizar una parte o todo el proceso
(que incluye, en algunos casos, la generación de los pares de claves y de la CSR).

Envíe la CSR a la CA y siga las instrucciones que le den para recibir el
certificado final o la cadena de certificados.

Las CA cobran diferentes montos de dinero por el servicio de comprobación
de claves públicas.

También se ofrece la opción de asignar su clave a más de 1 nombre de DNS, incluidos
varios nombres diferentes (p.&nbsp;ej., todas las instancias de example.com, www.example.com, example.net
y www.example.net) o nombres &quot;comodín&quot;, como \*.example.com.

Por ejemplo, actualmente, una CA ofrece estos precios:

* Estándar: $16/año, válido para example.com y www.example.com
* Comodín: $150/año, válido para example.com y \*.example.com

Teniendo en cuenta estos precios, los certificados comodín son económicos si posee más de 9
subdominios; de lo contrario, solo puede comprar 1 o más certificados para un solo nombre. (Si
posee más de, supongamos, cinco subdominios, tal vez un certificado comodín
le resulte más conveniente cuando decida habilitar HTTPS en sus servidores).

**NOTA:** Tenga en cuenta que, en los certificados comodín, el comodín se aplica
solo a 1 etiqueta de DNS. Un certificado que sea conveniente para \*.example.com será útil para
foo.example.com y bar.example.com, pero no para foo.bar.example.com.

Copie los certificados de todos sus servidores front-end en un
lugar al que no se pueda acceder a través de la web, como /etc/ssl (Linux y Unix), o en cualquier lugar donde lo requiera IIS (Windows).



## Habilitación de HTTPS en sus servidores 




Ya se encuentra preparado para el paso importantísimo de habilitar HTTPS en sus servidores.

### TL;DR {: .hide-from-toc }
- Utilice la herramienta Configuración del servidor de Mozilla para configurar su servidor para que sea compatible con HTTPS.
- Pruebe regularmente su sitio con la práctica herramienta SSL Server Test de Qualys y asegúrese de obtener el puntaje A o A+ como mínimo.



En este punto, debe tomar una decisión crucial sobre las operaciones:

* dedicar una dirección IP diferente para cada nombre de host del que obtenga contenido su servidor
 web, o
* utilizar el alojamiento virtual basado en nombres.

Si ha estado utilizando una dirección IP diferente para cada nombre de host, ¡fantástico! Esto le permitirá
brindar compatibilidad fácilmente con HTTP y HTTPS para todos los clientes.

Sin embargo, la mayoría de los operadores utilizan alojamiento virtual basado en nombres para conservar las direcciones 
IP y porque, en general, resulta más conveniente. El problema con IE en
Windows XP y las versiones de Android anteriores a 2.3 es que este navegador no comprende la SNI [Indicación
de nombre de servidor](https://en.wikipedia.org/wiki/Server_Name_Indication),
que es fundamental para los alojamientos virtuales HTTPS basados en nombres.

En el futuro, y esperamos que sea un futuro cercano, los clientes que no posean compatibilidad con la SNI serán reemplazados
por el software moderno. Controle la cadena de agente de usuario en sus registros de solicitudes para saber
cuándo una cantidad suficiente de la población de usuarios migró hacia un software moderno. (Usted puede
decidir cuál es su límite; tal vez el &lt; 5 % o el &lt; 1 %, o el valor que prefiera).

Si el servicio HTTPS aún no está disponible en sus servidores, habilítelo ahora mismo
(sin redireccionar HTTP a HTTPS; consulte la información a continuación). Configure su servidor web para utilizar
los certificados que compró e instaló. La herramienta [práctico generador de 
configuraciones
de Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
puede resultarle útil.

Si posee muchos nombres de host o subdominios, en cada uno deberá utilizar el 
certificado adecuado.

**NOTA:** Muchos operadores de sitios ya realizaron los pasos que mencionamos, pero están
utilizando HTTPS con el único fin de redirigir a los clientes nuevamente a HTTP. Si
está haciendo esto, deje de hacerlo ahora mismo. Consulte la próxima sección para asegurarse de que HTTPS y HTTP
funcionan correctamente.

**NOTA:** En última instancia, debe redirigir las solicitudes de HTTP a HTTPS y utilizar la HSTS (seguridad de
 transporte HTTP estricta). Esta no es la etapa adecuada del proceso de migración para hacerlo
. Consulte "Redireccionamiento de HTTP a HTTPS" y "Activación de la seguridad de transporte estricta y cookies de seguridad".

Ahora mismo, y durante el tiempo que dure su sitio, verifique la configuración de HTTPS a través de la
[práctica herramienta SSL Server Test de Qualys](https://www.ssllabs.com/ssltest/). Su sitio
debe obtener una puntuación de A o A+. Considere como error todo lo que haga bajar este puntaje.
(Una A hoy equivale a una B en el futuro, ya que los ataques en contra de los algoritmos y los protocolos
son cada vez más eficientes).



## Conversión de las URL dentro del sitio en relativas 




Ahora que su sitio se ofrece tanto en HTTP como en HTTPS, debe funcionar de la forma más eficiente posible, independientemente del protocolo.

### TL;DR {: .hide-from-toc }
- 'Asegúrese de que las URL dentro del sitio y las URL externas sean independientes del protocolo; es decir, asegúrese de utilizar rutas relativas o de omitir el protocolo como //example.com/something.js'



Sin embargo, el problema surge cuando muestra una página 
que incluye recursos de HTTP a través de HTTPS: [contenido
mixto](http://www.w3.org/TR/mixed-content/), en cuyo caso los navegadores le advertirán al usuario que se perdió la fuerza total de
HTTPS.

De hecho, en el caso del contenido mixto activo (scripts, complementos, CSS [Hojas de estilo en cascada], IFrame),
a menudo, los navegadores simplemente no cargan ni ejecutan el contenido, lo que da como resultado una
página rota.

**NOTE:** Es perfectamente correcto incluir recursos de HTTPS en una página HTTP.

Lo que es más, cuando incluye vínculos a otras páginas en su sitio, los usuarios podrían
sufrir una degradación de HTTPS a HTTP.

Estos problemas se presentan cuando en sus páginas se incluyen URL dentro del sitio totalmente calificadas
, en las que se usa el esquema *http://*. El contenido como el que se muestra a continuación:

		<h1>Bienvenido a Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Lea esta agradable <a href="http://example.com/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

Se debe cambiar por lo siguiente:

		<h1>Bienvenido a Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Lea esta agradable <a href="//example.com/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

O bien, por lo siguiente:

		<h1>Bienvenido a Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Lea esta agradable<a href="/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

Es decir, lograr que las URL dentro del sitio sean lo más relativas posibles, ya sean relativas de protocolo
(no poseen un protocolo, sino que comienzan con //example.com) o relativas de host (comienzan
solo con la ruta, como /jquery.js).

**NOTA:** Use un script para hacer esto; no lo haga de forma manual. Si el contenido de su sitio se encuentra en una
base de datos, deberá probar su script en una copia de desarrollo de su
base de datos. Si el contenido se encuentra en archivos simples, pruebe su script en una
copia de desarrollo de los archivos. Solo aplique los cambios a producción luego de que 
estos aprueben el QA (control de calidad), como siempre. Puede utilizar el [script de Bram van Damme
](https://github.com/bramus/mixed-content-scan), o algo similar, para
detectar contenido mixto en su sitio.

**NOTA:** Cuando realice vinculaciones a otros sitios (que es diferente de incluir recursos de
otros sitios), no cambie el protocolo, ya que no puede controlar el modo en el que operan esos
sitios.

**NOTA:** Le recomiendo utilizar URL relativas de protocolo para que la migración de sitios grandes se realice
sin problemas. Si no está seguro de si ya puede implementar HTTPS totalmente, el hecho de forzar
a su sitio para que utilice HTTPS para todos los subrecursos podría tener consecuencias negativas. Es posible que
durante algún tiempo el sitio HTTPS le resulte nuevo y raro, y el sitio HTTP, de todos modos,
debe funcionar tan bien como siempre. Con el paso del tiempo, completará la migración y podrá
utilizar HTTPS definitivamente (consulte las dos secciones siguientes).

Si su sitio depende de un script, una imagen u otros recursos ofrecidos por un tercero
, tales como CDN, jquery.com o algo similar, tiene dos opciones:

* Utilizar URL relativas de protocolo también para estos recursos. Si el tercero no
 ofrece HTTPS, pídale que lo haga. La mayoría ya lo ofrecen, incluido jquery.com.
* Ofrecer los recursos desde un servidor que pueda controlar y en el que se ofrezca tanto HTTP como
 HTTPS. De todos modos, esta sigue siendo una buena idea, ya que luego puede tener mejor control
 sobre la apariencia, el rendimiento y la seguridad de su sitio, y no tiene que
 confiar en un tercero (algo que siempre es mejor).

Tenga en cuenta también que deberá cambiar las URL dentro del sitio en sus
hojas de estilo, JavaScript, reglas de redirección, &lt;vínculos,&gt;  etiquetas y en las declaraciones del CSP (Proveedor de servicios de cifrado)
, no solo en las páginas HTML.



## Redireccionamiento de HTTP a HTTPS 




### TL;DR {: .hide-from-toc }
- Debe colocar un vínculo canónico en el encabezado de su página para indicarles a los motores de búsqueda que https es la mejor forma de acceder al sitio.


Configure las etiquetas &lt;link rel="canonical" href="https://…"/&gt; en sus páginas. [Esto
les permite a los motores de búsqueda](https://support.google.com/webmasters/answer/139066?hl=en)
saber cuál es la mejor forma de acceder a su sitio.

La mayoría de los servidores web ofrece una función simple de redireccionamiento. Utilice el código 301 (Movido de forma permanente) para
indicarles a los motores de búsqueda y a los navegadores que la versión HTTPS es canónica y que sus usuarios deben ser redirigidos desde la versión HTTP hacia la versión HTTPS de su sitio.



## Activación de la seguridad de transporte estricta y cookies de seguridad 




### TL;DR {: .hide-from-toc }
- Debe utilizar la seguridad de transporte estricta de HTTP (HSTS) para evitar el costo del redireccionamiento mediante el código 301.
- Asegúrese de configurar siempre el marcador Secure en las cookies.



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



## Inquietudes sobre la migración 




En esta sección, trataremos las inquietudes que se les podrían plantear a los operadores sobre la migración a HTTPS.


### Clasificación de la búsqueda

[Google utiliza el protocolo HTTPS como indicador de buena calidad
de búsqueda](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google también publica una guía sobre [cómo transferir, mover o migrar su
sitio](https://support.google.com/webmasters/topic/6029673) y seguir manteniendo su
clasificación de la búsqueda. En Bing, también se publican las [pautas para
administradores web](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Rendimiento

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
, en 2014](/web/shows/cds/2014/tls-all-the-things).

### Encabezados de referencia

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

### Ingresos por anuncios

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

