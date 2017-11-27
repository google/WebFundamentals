project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: El contenido mixto ocurre cuando un HTML inicial se carga en una conexión HTTPS segura, pero otros recursos se cargan en una conexión HTTP insegura.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-09-25 #}

# ¿Qué es el contenido mixto? {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

**El contenido mixto** ocurre cuando un HTML inicial se carga en una conexión
HTTPS segura, pero otros recursos (como imágenes, videos, hojas de estilo y secuencias de comandos)
se cargan en una conexión HTTP insegura. Esto se denomina contenido mixto
porque los contenidos HTTP y HTTPS se cargan para mostrar la misma página
y la solicitud inicial estaba segura en HTTPS. Los navegadores modernos muestran advertencias
sobre este tipo de contenido para indicarle al usuario que esta página contiene
recursos inseguros.

### TL;DR {: .hide-from-toc }

* HTTPS es importante para proteger tu sitio y tus usuarios de un ataque.
* El contenido mixto degrada la seguridad de tu sitio y la experiencia del usuario de tu sitio HTTPS.

## Solicitudes de recursos y navegadores web

Cuando un navegador _visita_ una página del sitio web, está solicitando un recurso HTML. Luego el servidor web muestra el contenido HTML, que el navegador analiza y le muestra a sus usuarios. A menudo, un único archivo HTML no es suficiente para mostrar una página completa, entonces el archivo HTML incluye referencias a otros recursos que el navegador necesita solicitar. Estos recursos secundarios pueden ser imágenes, videos, HTML extra, CSS o JavaScript, los cuales se obtienen mediante el uso de solicitudes separadas. 

## Beneficios de HTTPS

Cuando un navegador solicita recursos en HTTPS; que significa HTTP seguro, usa 
una conexión encriptada para comunicarte con el servidor web.

El uso de HTTPS tiene tres beneficios principales:

* Autenticación
* Integridad de los datos
* Confidencialidad

### Autenticación

_¿La identidad del sitio web con el que me comunico es la que el sitio afirma tener?_ 

HTTPS permite que el navegador compruebe la apertura del sitio web correcto y que no se 
ha redireccionado a un sitio malicioso. Cuando visitas el sitio web de tu banco, 
tu navegador _autentica_ el sitio web, y evita que un atacante 
se haga pasar por la entidad y robe tus credenciales de acceso. 

### Integridad de los datos

_¿Alguien ha manipulado el contenido que estoy enviando o recibiendo?_ 

HTTPS permite al navegador detectar si un atacante ha cambiado algún dato 
recibido. Cuando transfieres dinero usando el sitio web de tu banco, HTTPS evita que un atacante 
cambie el número de cuenta de destino mientras la solicitud está en 
tránsito. 

### Confidencialidad

_¿Pueden otras personas ver el contenido que envío o recibo?_

HTTPS evita que un atacante espíe las solicitudes del navegador, 
realice un seguimiento de los sitios web visitados o robe la información enviada o recibida. 

### HTTPS, TLS y SSL

HTTPS significa “HTTP seguro” (protocolo seguro de transferencia de hipertexto). La parte 
**segura** se debe a la encriptación agregada a las solicitudes que el navegador 
envía y recibe. Actualmente, la mayoría de los navegadores usan el protocolo TLS para 
proporcionar encriptación; **TLS** a veces se denomina SSL. 

Los detalles de HTTPS, TLS y SSL están fuera del alcance de este artículo, pero si 
quieres obtener más información, los siguientes recursos son un buen lugar para comenzar:

* [HTTPS según Wikipedia](https://en.wikipedia.org/wiki/HTTPS){: .external}
* [TLS según Wikipedia](https://en.wikipedia.org/wiki/Transport_Layer_Security){: .external}
* [Curso de criptografía de Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography){: .external}
* [Capítulo sobre TLS](http://chimera.labs.oreilly.com/books/1230000000545/ch04.html){: .external} en [High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545){: .external}, por Ilya Grigorik. 

## El contenido mixto debilita el protocolo HTTPS

Si se realizan solicitudes de subrecursos usando el protocolo HTTP inseguro, la seguridad de toda la página se 
verá comprometida porque estas solicitudes serán vulnerables a **ataques de 
intermediarios**, en los cuales un atacante espía una conexión de red y es capaz de ver o 
modificar la comunicación entre dos partes. Mediante estos recursos, un 
atacante a menudo puede tomar todo el control de una página, no solo del recurso 
comprometido. 

Si bien muchos navegadores muestran advertencias al usuario cuando aparece contenido mixto, para el momento en que 
estas lleguen será demasiado tarde: se habrán concretado las solicitudes inseguras 
y la seguridad de la página estará comprometida. Desafortunadamente, esto 
es bastante común en la web. Por eso, los navegadores no pueden simplemente bloquear todas las solicitudes 
mixtas sin que con ello restrinjan la funcionalidad de muchos sitios.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó una imagen insegura. Este contenido también debería ofrecerse en HTTPS.">
  <figcaption>
    Depende de ti, el desarrollador, solucionar los problemas de contenido mixto de tu app.
  </figcaption>
</figure>

### Un ejemplo simple

Carga de una secuencia de comandos insegura en una página HTTPS.

Si visitas esta página de ejemplo a través de **HTTPS** ([**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external}), verás que hay una etiqueta de secuencia de comandos **HTTP** que intentará cargar contenido mixto. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

En este ejemplo, la secuencia de comandos `simple-example.js` se carga con una URL **HTTP**. Este es el ejemplo más simple de contenido mixto. Cuando el navegador solicita el archivo `simple-example.js`, un atacante puede insertar código en el contenido enviado y 
tomar el control de toda la página. 

Afortunadamente, la mayoría de los navegadores actuales bloquean este tipo de contenido peligroso de 
forma predeterminada. Consulta la sección [Comportamiento de los navegadores con contenido mixto](#browser-behavior-with-mixed-content){: .external}.

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó una secuencia de comandos insegura. Esta solicitud se bloqueó; el contenido se debe ofrecer en HTTPS.">
  <figcaption>Chrome bloquea la secuencia de comandos insegura.</figcaption>
</figure>

### Un ejemplo de XMLHttpRequest

Carga de datos inseguros con XMLHttpRequest.

En la visualización de esta página de ejemplo a través de **HTTPS** ([**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external}) se incluirá una `XMLHttpRequest` a través de **HTTP** para capturar datos `JSON` con contenido mixto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

En este caso, la URL **HTTP** se construye dinámicamente en JavaScript y, en un momento 
dado, `XMLHttpRequest` la usa para cargar un recurso inseguro. Como en el ejemplo simple 
anterior, cuando el navegador solicita el archivo `xmlhttprequest-data.js`, un 
atacante puede insertar código en el contenido enviado y tomar el control de 
toda la página.

La mayoría de los navegadores actuales también bloquean estas solicitudes peligrosas.

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó un punto final XMLHttpRequest inseguro. Esta solicitud se bloqueó; el contenido se debe ofrecer en HTTPS.">
  <figcaption>Chrome bloquea la XMLHttpRequest insegura.</figcaption>
</figure>

### Un ejemplo de una galería de imágenes

Carga de imágenes inseguras con un lightbox jQuery.

Si visitas esta página de ejemplo a través de **HTTPS** ([**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external}), verás que no se muestra ningún problema de contenido mixto al principio. Sin embargo, cuando hagas clic en una imagen en miniatura, se cargará una imagen de tamaño completo y contenido mixto a través de **HTTP**. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

A menudo, las galerías de imágenes dependen del atributo `src` de las etiquetas `<img>` para mostrar las 
imágenes en miniatura en la página. Después, se usa el atributo `href` de las etiquetas delimitadoras (`<a>`) para 
cargar la imagen de tamaño completo de la superposición de la galería. Por lo general, las etiquetas 
`<a>` no generan contenido mixto. Sin embargo, en este caso, el código jQuery 
anula el comportamiento predeterminado del vínculo (navegar a una página nueva) y, en su lugar, 
carga la imagen **HTTP** en esta página. 

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó una imagen insegura. Este contenido también debería ofrecerse en HTTPS.">
</figure>

Las imágenes inseguras degradan la seguridad de tu sitio, pero no son tan peligrosas 
como otros tipos de contenido mixto. Los navegadores actuales cargan imágenes de 
contenido mixto, pero también muestran advertencias a los usuarios. 

## Tipos de contenido mixto y amenazas de seguridad relacionadas

Los dos tipos de contenido mixto son el activo y el pasivo. 

El **contenido mixto pasivo** es el contenido que no interactúa con el resto 
de la página. Por lo tanto, los ataques de un intermediario están limitados a lo que el intermediario puede 
hacer si intercepta o cambia dicho contenido. En este contenido se incluyen 
imágenes, videos y material de audio, además de otros recursos que no pueden interactuar 
con el resto de la página.  

El **contenido mixto activo** interactúa con toda la página y permite a los 
atacantes hacer casi cualquier cosa en ella. En este contenido se incluyen 
secuencias de comandos, hojas de estilo, iframes, recursos flash y otros códigos que el navegador puede  
descargar y ejecutar.

### Contenido mixto pasivo

El contenido mixto pasivo puede, no obstante, representar una amenaza de seguridad para tu sitio y los usuarios.
Un atacante puede, por ejemplo, interceptar solicitudes HTTP de imágenes en tu sitio y 
reemplazar o cambiar estas imágenes. También puede cambiar las imágenes de los 
botones _guardar_ y _borrar_, y hacer que los usuarios borren contenido sin desearlo. 
Además, puede reemplazar los diagramas de tus productos por contenido lascivo o pornográfico y dañar la apariencia de tu 
sitio. Por último, también puede reemplazar las fotos de tus productos con avisos de otros sitios o productos. 

Aun cuando el atacante no altere el contenido de tu sitio, seguirás teniendo un 
grave problema de privacidad, ya que podrá realizar un seguimiento de los usuarios que usen solicitudes de contenido 
mixto. El atacante puede conocer las páginas que visita un usuario y los productos 
que ve a partir de imágenes y otros recursos cargados por el navegador.

A continuación, se muestra un ejemplo de contenido mixto pasivo: 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

La mayoría de los navegadores muestran este tipo de contenido mixto a los usuarios. Sin embargo, también 
muestran una advertencia, ya que este contenido representa un riesgo para la seguridad y privacidad de tu sitio y 
tus usuarios. 

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó un video inseguro. Este contenido también debería ofrecerse en HTTPS.">
  <figcaption>Advertencias de contenido mixto en la consola JavaScript de Chrome.</figcaption>
</figure>

### Contenido mixto activo

El contenido mixto activo es una mayor amenaza que el pasivo. Un atacante puede 
interceptar y reescribir contenido activo. De esta forma, puede tomar todo el control de tu página o, incluso, de 
todo tu sitio web. Esto le permite cambiar cualquier elemento de la 
página; esto incluye mostrar contenido completamente diferente, robar contraseñas 
u otras credenciales de acceso de los usuarios, robar cookies de sesión de los usuarios o redireccionarlos 
a un sitio totalmente diferente. 

Debido a la gravedad de esta amenaza, muchos navegadores bloquean este tipo de contenido de forma 
predeterminada para proteger a los usuarios, pero la funcionalidad varía según el proveedor y la versión 
del navegador.

A continuación, se muestran algunos ejemplos de contenido mixto activo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Contenido mixto: La página se cargó en HTTPS, pero solicitó un recurso inseguro. Esta solicitud se bloqueó; el contenido se debe ofrecer en HTTPS.">
  <figcaption>Errores de contenido mixto en la consola de JavaScript de Chrome.</figcaption>
</figure>

## Comportamiento de los navegadores con contenido mixto

Debido a las amenazas descritas anteriormente, sería ideal que los navegadores bloquearan todo 
el contenido mixto. Sin embargo, esto dañaría una gran cantidad de sitios web que millones de 
usuarios usan a diario. La medida adoptada actualmente consiste en bloquear los tipos de contenido mixto más 
peligrosos y permitir que se continúen solicitando los tipos de contenido que presenten menos 
peligro. 

Los navegadores actuales cumplen con la [especificación de contenido mixto](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }, en la cual se definen las categorías de [**contenido que se puede bloquear**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external} y [**contenido que se debe bloquear**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external}. 

Según esta especificación, un recurso se asocia al contenido que se puede bloquear “cuando el riesgo 
permitir su uso como contenido mixto se inferior al de ocasionar perjuicios a 
sectores importantes de la Web”. Se trata de un subconjunto de la categoría de [contenido mixto 
pasivo](#passive-mixed-content) descrita anteriormente. Al momento de la redacción de este documento, las imágenes, 
los videos y los recursos de audio, además de los vínculos capturados previamente, son los únicos tipos 
de recursos que forman parte del contenido que se puede bloquear. Es probable que esta categoría 
se reduzca a medida que pase el tiempo.

Todo contenido que no sea **contenido que se pueda bloquear** se considerará como **contenido que se debe bloquear** y 
el navegador lo bloqueará. 

### Versiones del navegador

Es importante recordar que no todos los visitantes de tu sitio web usan 
los navegadores más actualizados. Las diferentes versiones de los distintos proveedores de navegadores 
se comportan de manera diferente respecto del contenido mixto. En el peor de los casos, en algunos navegadores y algunas versiones 
no se bloquea ningún tipo de contenido mixto, lo cual representa un grave peligro para el usuario. 

No incluimos información específica sobre cada navegador, ya que el comportamiento exacto de estos cambia 
constantemente. Si te interesa conocer el comportamiento de un navegador en particular, busca información 
que el proveedor haya publicado directamente. 

Note: Los usuarios esperan que los protejas cuando visitan tu sitio web. Es importante que soluciones los problemas de contenido mixto para proteger a <b>todos</b> los visitantes, incluso aquellos que usen navegadores anteriores.




{# wf_devsite_translation #}
