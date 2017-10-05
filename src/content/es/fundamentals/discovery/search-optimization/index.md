project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los sitios web no solo reciben visitas de humanos, sino también de rastreadores web de motores de búsqueda. Obtén información sobre cómo mejorar la precisión de las búsquedas y la clasificación de tu sitio web.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-30 #}

# Optimización de las búsquedas {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Los sitios web no solo reciben visitas de humanos, sino también de rastreadores web de motores de búsqueda. Obtén información sobre cómo mejorar la precisión de las búsquedas y la clasificación de tu sitio web.

### TL;DR {: .hide-from-toc }
- Determina la estructura de la URL de tu página web.
- Se recomienda especialmente usar un diseño adaptable.
- Usa <code>rel='canonical'</code> + <code>rel='alternate'</code> para separar sitios de escritorio y móviles.
- Usa el encabezado <code>Vary HTTP</code> para que una misma URL muestre dinámicamente HTML para escritorio o móviles en forma separada.
- Usa <code>noindex</code> para páginas en las que quieres limitar el acceso a las personas que conozcan la URL.
- Usa un mecanismo de autenticación aplicable para páginas que quieres mantener en privado.

## Proporciona la estructura de tu sitio a los motores de búsqueda

Cómo aparece tu sitio web en los resultados de búsqueda es importante para un diseño de sitio para múltiples dispositivos. Esta guía te ayudará a optimizar tu sitio web para motores de búsqueda en base a su estructura URL.

¿Planeas crear una página web receptiva? ¿Hay una versión específica para móviles
con una URL separada? ¿Estás enviando la versión para escritorio y la
versión para móviles desde la misma URL? Independientemente de eso, siempre puedes mejorar la
optimización de tu sitio web para los motores de búsqueda.

### Dale a tu sitio una estructura URL

Existen varias maneras de enviar contenido a diferentes dispositivos. A continuación mencionamos los tres
métodos más comunes:

**Diseño web adaptable:** envía el mismo HTML de una URL y utiliza consultas de medios
CSS para determinar cómo se entrega el contenido del lado del cliente.
Por ejemplo, Escritorio y Móviles: http://www.example.com/

**Sitio móvil separado:** redirige a los usuarios a diferentes URL, según el
usuario-agente. Por ejemplo, Escritorio: http://www.example.com/
Móviles: http://m.example.com/

**Envío dinámico:** envía diferentes HTML desde una URL, según el usuario-
agente. Por ejemplo, Escritorio y Móviles: http://www.example.com/

El mejor enfoque es utilizar un **diseño web adaptable**, aunque muchos sitios web usan otros métodos.
 
Determina qué estructura URL se adapta mejor a tu página web. Luego, intenta las respectivas mejores
prácticas para optimizarla para los motores de búsqueda.

### Recomendamos un diseño web adaptable

Beneficios de un sitio web adaptable:

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* Más simple para que los usuarios lo compartan.
* Carga de página más rápida sin redireccionamientos.
* URL única para los resultados de búsqueda.

<div style="clear:both;"></div>
  
Aprende a compilar sitios web con diseño web adaptable en [Aspectos básicos del diseño web adaptable](/web/fundamentals/design-and-ux/responsive/).

### Usa `link[rel=canonical]` y `link[rel=alternate]` al enviar URL separadas

Enviar contenidos similares en una versión de escritorio y una versión móvil en diferentes
URL puede crear confusión para los usuarios y también para los motores de búsqueda, ya que no es
obvio para los visitantes que intentan ser idénticos. Debes indicar lo siguiente:

* Que el contenido de las dos URL es idéntico.
* Cuál es la versión móvil.
* Cuál es la versión de escritorio (canónica).

Esta información ayuda a los motores de búsqueda a indexar mejor el contenido y asegura que
los usuarios encuentren lo que están buscando en un formato correcto para su dispositivo.

#### Usa una versión alternativa para escritorio

Al mostrar la versión de escritorio, indica que hay una versión móvil en
otra URL; para ello, agrega una etiqueta `link` con un atributo `rel="alternate" que apunte
a la versión móvil en el atributo `href`.

[http://www.example.com/](http://www.example.com/){: .external } HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### Usa la versión canónica para móviles

Al mostrar la versión móvil, indica que hay una versión para escritorio (canónica)
en otra URL; para ello, agrega una etiqueta `link` con un atributo `rel="canonical"`
que apunte a la versión de escritorio en el atributo `href`. Ayuda a los motores de búsqueda a
comprender que la versión móvil es específicamente para pantallas pequeñas; para ello, agrega un atributo `media` con un valor de `"only screen and (max-width: 640px)"`.

[http://m.example.com/](http://m.example.com/){: .external } HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Usa el encabezado para variar el HTTP

Enviar diferentes HTML según el tipo de dispositivo reduce los redireccionamientos innecesarios,
muestra HTML optimizado y ofrece una única URL para los motores de búsqueda. También tiene
varias desventajas:

* Puede haber proxies intermedios entre los navegadores de un usuario y el servidor.
A menos que el proxy sepa que el contenido varía según el usuario-agente, es posible que muestre
resultados inesperados.
* Puede que los contenidos cambiantes según los riesgos de usuario-agente 
se consideren [ocultamiento](https://support.google.com/webmasters/answer/66355), que es una
violación de las Pautas para webmasters de Google.

Al permitir que los motores de búsqueda sepan que el contenido varía según el usuario-agente,
pueden optimizar los resultados de la búsqueda para el usuario-agente que está enviando las consultas.

Para indicar que le URL envíe diferente HTML según el usuario-agente, suministra un b
`Vary: User-Agent` en el encabezado HTTP. Esto permite indexar las búsquedas para tratar las versiones
de escritorio y móvil en forma separada, y que los proxies intermedios almacenen en caché esos
contenidos correctamente.

[http://www.example.com/](http://www.example.com/){: .external } Encabezado HTTP


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

Para obtener más información sobre cómo crear una estructura URL en escritorios y móviles, consulta [creación de sitios optimizados para smartphones](/webmasters/smartphone-sites/).


## Controla el rastreo y la indexación desde los motores de búsqueda

Figurar en las listas de los motores de búsqueda correctamente es crítico para enviar tu sitio web
al mundo, pero una mala configuración puede causar que se incluya contenido inesperado
en los resultados. Esta sección te ayudará a evitar este tipo de problemas, ya que explica cómo
funcionan los rastreadores y cómo indexan sitios web.

Compartir información no tiene mejor lugar que la web. Cuando publicas un
documento, este está inmediatamente disponible para el mundo entero. La página será
visible para cualquiera que conozca la URL. Allí es donde participan los motores de búsqueda. Necesitan poder encontrar tu sitio web.

Sin embargo, hay algunos casos en los que no querrás que la gente encuentre
esos documentos, aunque los hayas puesto en la Web. Por ejemplo, la página de administración de un blog
es algo a lo que solo ciertas personas tienen acceso. No hay
ningún beneficio en dejar que la gente encuentre esas páginas a través de los motores de búsqueda.

Esta sección también explica cómo restringir ciertas páginas para que no aparezcan en los resultados de búsqueda.


### La diferencia entre "rastrear" e "indexar"

Antes de aprender a controlas los resultados de búsqueda, debes comprender cómo interactúan los motores de búsqueda con tu página web. Desde el punto de vista de tu sitio, en general hay dos cosas que los motores de búsqueda hacen con tu sitio: rastrear e indexar.  

**Rastrear** es el proceso por el cual un motor de búsqueda obtiene tu página web para analizar su contenido. El contenido se almacena en la base de datos del motor de búsqueda y se puede usar para completar los detalles de los resultados de las búsquedas, clasificar páginas y descubrir nuevas páginas mediante el seguimiento de enlaces.  

**Indexar** es el proceso por el cual un motor de búsqueda almacena la URL de un sitio web y cualquier información asociada en su base de datos, para que esté lista para enviarse como resultado de búsqueda. 

Note: Muchas personas confunden rastrear con indexar. Prohibir el rastreo no significa que la página no se mostrará en los resultados de búsqueda. Por ejemplo, si un sitio web externo contiene un enlace a una de tus páginas web, esta todavía puede indexarse, aunque el rastreo esté bloqueado. En este caso, al resultado de la búsqueda le falta una descripción detallada.

### Controla el rastreo con robots.txt

Puedes usar un archivo de texto denominado `robots.txt` para controlar la manera en que los rastreadores eficientes acceden a tu página web. `Robots.txt` es un archivo de texto simple que describe cómo quieres que
los bots de búsqueda rastreen tu sitio. (No todos los rastreadores necesariamente respetan
`robots.txt`. Imagina que cualquiera puede crear sus propios rastreadores sueltos).

Coloca `robots.txt` en el directorio raíz del host de tu sitio web. Por ejemplo,
si el host de tu sitio es `http://pages.example.com/`, el archivo `robots.txt`
 se debe colocar en `http://pages.example.com/robots.txt`. Si el dominio tiene
un esquema, subdominios o puertos diferentes, se consideran
diferentes hosts y deben tener `robots.txt` para cada uno de sus directorios
raíz.

A continuación, verás un ejemplo rápido:  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

Lo anterior indica que quieres impedir que ningún bot rastree tu sitio web
entero.

A continuación verás otro ejemplo:

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

Puedes indicar un nombre de usuario-agente para especificar el comportamiento por bot
(usuario-agente). En el caso anterior, estás inhabilitando el usuario-agente denominado `Googlebot`
 para que no rastree `/nogooglebot/` y todos los contenidos debajo de este directorio.  

Obtén más información sobre los bots de cada motor de búsqueda en sus páginas de ayuda:

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


Note: solo se requiere `robots.txt` **si** quieres controlar el modo en que se rastrea tu sitio. No devolver el código de respuesta de retorno 500 para la url: `/robots.txt` Lo anterior termina todos los rastreos subsiguientes del host entero, lo que provoca que los detalles de los resultados de búsqueda estén vacíos.

#### Comprobar robots.txt

Según los rastreadores a los que apunta tu robots.txt, los proveedores de
motores de búsqueda pueden suministrar una herramienta para comprobar `robots.txt`. Por ejemplo, para Google 
hay un validador en
[Herramientas para webmasters](https://www.google.com/webmasters/tools/robots-testing-tool)
que puedes usar para comprobar tu robots.txt.

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex ofrece [una herramienta similar](https://webmaster.yandex.com/tools/robotstxt/).  

### Controla la indexación de búsquedas con metaetiquetas

Si no quieres que tu página web aparezca en los resultados de búsqueda, robots.txt no es
la solución. Debes permitir que estas páginas se rastreen, y específicamente debes
indicar que no quieres que se indexen. Existen dos soluciones:

Para indicar que no quieres que se indexe una página HTML, usa un tipo específico de `<meta>` etiqueta, una con los atributos establecidos como `name="robots"` y `content="noindex"`.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

Al cambiar un valor del atributo `name` a un nombre de usuario-agente específico, puedes reducir el alcance. Por ejemplo, `name="googlebot"` (no distingue mayúsculas) indica que no quieres que el robot de Google indexe la página.  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

Otras opciones para la metaetiqueta de robots:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

#### X-Robots-Tag

Para indicar que no quieres que se indexen recursos como imágenes, hojas de estilo o archivos de
secuencia de comandos, agrega `X-Robots-Tag: noindex` en un encabezado HTTP.


    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

Si deseas reducir el alcance a un usuario-agente específico, inserta el nombre del usuario-agente antes de `noindex`.  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

Para obtener más información sobre X-Robots-Tag:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

Note: Si inhabilitas los rastreadores a través de `robots.txt`, los bots de búsqueda igualmente pueden indexar esas páginas sin saber que no quieres que se indexen. Esto puede ocurrir porque:<ul><li>los bots de búsqueda pueden encontrar tus páginas web siguiendo enlaces de otros sitios web.</li><li>Los motores de búsqueda que no pueden rastrear no pueden detectar <code>noindex</code>.</li></ul>

No esperes que `robots.txt` controle las indexaciones de búsqueda.

### Ejemplos por tipo de contenido

¿Cuáles son las mejores soluciones para controlar el rastreo y la indexación? A continuación verás algunos ejemplos de soluciones para diferentes tipos de páginas.

#### Cualquier persona puede acceder y buscar la página completamente

La mayoría de las páginas de la Web son de este tipo.  

* No se requiere `robots.txt`.
* No se requieren metaetiquetas de robots.

#### Acceso limitado por las personas que conocen la URL

Entre los ejemplos se incluye:  

* Página de acceso para una consola de administración de un blog.
* Contenido privado compartido mediante el traspaso de una URL para usuarios nuevos de Internet.

En este caso, no quieres que los motores de búsqueda indexen esas páginas.  

* No se requiere `robots.txt`.
* Usa `noindex` metaetiquetas para páginas HTML.
* Usa `X-Robots-Tag: noindex` para recursos no HTML (imágenes, pdf, etc).

Note: ¿Te preguntas si debes prohibir el rastreo de archivos JavaScript y de Hojas de estilo? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google hace su mejor esfuerzo por entenderlas</a> de manera de poder encontrar contenidos disponibles a través de tecnologías modernas como AJAX. Definitivamente debes permitir que los rastreadores rastren JavaScript.

#### Acceso restringido de personas autorizadas

En este casi, aun si alguien encuentra la URL, el servidor se niega a presentar el resultado sin una credencial adecuada. Por ejemplo:  

* Contenido compartido en forma privada en una red social.
* Sistema de gastos empresariales.

Los motores de búsqueda nunca deben rastrear ni indexar este tipo de página.  

* Código de respuesta de retorno 401 "No autorizado" para un acceso sin las credenciales
adecuadas (o se redirige al usuario a una página de acceso).
* No use `robots.txt` para inhabilitar el rastreo de estas páginas. De lo contrario, no se puede detectar la respuesta 401.

Aquí, el mecanismo de restricción puede ser una dirección IP, una cookie, autenticación básica,
OAuth, etc. Cómo implementar esta autenticación/autorización depende de tu
infraestructura y excede el alcance de este artículo.

### Solicita la eliminación de una página de un motor de búsqueda

En los siguiente casos, es posible que quieras quitar un resultado de búsqueda:  

* La página ya no existe.
* Se indexó accidentalmente una página que incluye información confidencial.


Los motores de búsqueda más importantes ofrecen una forma de enviar una solicitud para quitar estas páginas. Para hacerlo, generalmente es necesario lo siguiente:  

1. Asegúrate de que la página que quieres quitar:
    * Ya está borrada de tu servidor y devuelve 404
    * Está configurada para no ser indexada (por ejemplo: noindex)

1. Dirígete a la página de solicitud en cada motor de búsqueda. (Google y Bing requieren que te registres y valides la titularidad de tu sitio web).
1. Envía una solicitud.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Consulta los pasos concretos en las respectivas páginas de ayuda del motor de búsqueda:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### Apéndice: Lista de usuarios-agentes de rastreador

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
