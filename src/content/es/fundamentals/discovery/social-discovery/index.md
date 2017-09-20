project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Puedes influenciar el modo en que aparece tu sitio cuando se comparte por redes sociales; para ello, debes agregar alguna líneas de código a cada página. De esta manera puedes atraer a más personas a tu sitio, ya que proporcionas vistas previas con más información de lo que estaría disponible de otra forma.

{# wf_updated_on: 2014-11-08 #}
{# wf_published_on: 2014-10-07 #}

# Detección social {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Puedes influenciar el modo en que aparece tu sitio cuando se comparte por redes sociales; para ello,
debes agregar algunas líneas de código a cada página. De esta manera puedes atraer a más personas a
tu sitio, ya que proporcionas vistas previas con más información de lo que estaría
disponible de otra forma.


### TL;DR {: .hide-from-toc }
- Usa microdatos de schema.org para suministrar el título, la descripción y una imagen de la página para Google+.
- Usa Open Graph Protocol (OGP) para suministrar el título, la descripción y una imagen de la página para Facebook.
- Usa Twitter Cards para suministrar el título, la descripción, una imagen y la id de Twitter para Twitter.

Puedes influenciar el modo en que aparece tu sitio cuando se comparte por redes sociales; para ello,
debes agregar algunas líneas de código a cada página. Lo anterior puede ayudar a incrementar la interacción de los usuarios gracias al
suministro de vistas previas con más información de lo que estaría disponible de otra forma.
Sin estas vistas previas, los sitios sociales solo brindarán información básica, sin imágenes o
información útil de otro tipo. 

¿Sobre cuál crees que es más probable que se haga clic? Las personas se sienten más atraídas por las imágenes
y están más seguras de que les gustará lo que encontrarán cuando tienen una vista previa
anterior.

<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      Con el marcado adecuado: se incluye el título correcto, una breve
descripción y una imagen. Agregar estos elementos puede ayudar a
incrementar la interacción de los usuarios.
 </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      Sin el marcado adecuado, solo se incluye el título de la
página.
 </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Cuando alguien que está en una red social quiere compartir tu sitio web con sus amigos,
probablemente agregarán notas para explicar lo grandioso que es y lo compartirán.
Sin embargo, describir un sitio web tiende a ser engorroso y puede hacer que se pierda lo central del
punto de vista del propietario de la página. Algunos servicios restringen la cantidad de caracteres que los usuarios pueden
ingresar en sus notas.

Al agregar los metadatos correctos en tu página, puedes simplificar el proceso de
compartir para los usuarios, ya que suministrar el título, una descripción y una imagen
atractiva. De esta manera, no tienen que perder tiempo valioso (o caracteres valiosos)
describiendo el enlace.

## Usa schema.org + microdatos para ofrecer fragmentos enriquecidos en Google+

Los rastreadores usan diversos métodos para analizar una página y comprender su contenido. Al usar
[microdatos](http://www.w3.org/TR/microdata/){: .external }, y vocabulario
[schema.org](https://schema.org/){: .external }, ayudas a los sitios sociales y a los motores
de búsqueda a comprender mejor los contenidos de la página.

A continuación, te mostramos un ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

Mientras la mayoría de los metadatos están incorporados en la sección de encabezado de una página web, los microdatos
viven donde existe el contexto.

### Agrega `itemscope` para definir el alcance de los microdatos
Al agregar `itemscope`, puedes especificar la etiqueta como un bloque de contenidos sobre un
elemento en particular.

### Agrega `itemtype` para definir el tipo de tu sitio web
Puedes especificar el tipo de elemento utilizando el atributo `itemtype` con el
`itemscope`. El valor de un `itemtype` se puede determinar según el tipo
de contenido de tu página web. Debes poder encontrar uno que sea relevante
en [esta página](https://schema.org/docs/full.html).

### Agregar `itemprop` para describir cada elemento utilizando vocabulario schema.org
`itemprop` define las propiedades para `itemtype` en el alcance. Para suministrar
metadatos a sitios sociales, los valores `itemprop` típicos son `name`, `description`,
 y por último `image`.

### Obtén más información
Estos microdatos proveen información semántica a los rastreadores, generalmente para
[Google+](https://plus.google.com/){: .external } y Búsqueda de Google. Para obtener más información sobre
fragmentos y representación en Google+, lee los siguientes documentos:

* [Representación de artículos - Plataforma Google+](/+/web/snippet/article-rendering)
* [Fragmento - Plataforma Google+](/+/web/snippet/)

### Valida fragmentos enriquecidos
Para validar fragmentos enriquecidos en Google+, puedes usar las siguientes herramientas:

* [Herramienta de prueba de datos estructurados](https://www.google.com/webmasters/tools/richsnippets) - Herramientas para webmasters de Google  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## Usa Open Graph Protocol (OGP) para suministrar fragmentos enriquecidos en Facebook

[Open Graph Protocol (OGP)](http://ogp.me/){: .external } suministra a Facebook los
metadatos necesarios para permitir que las páginas web tengan la misma funcionalidad que otros
objetos de Facebook.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

Cuando se incluyen en la sección de encabezado de tu página, estos metadatos proveen información enriquecida de
fragmentos cuando se comparte la página.

### Usa etiquetas `meta` `og:` con espacio de nombres para describir los metadatos
Una etiqueta `meta` incluye un atributo de `property` y un atributo `content`.
Las propiedades y los contenidos pueden tomar los siguientes valores:

<table>
  <thead>
    <tr>
      <th data-th="Property">Propiedad</th>
      <th data-th="Content">Contenido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">El título de la página web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">La descripción de la página web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">La url canónica de la página web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">URL a una imagen adjuntada a la publicación compartida.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">Una cadena que indica el tipo de la página web. Puedes encontrar la adecuada para tu página web <a href="https://developers.facebook.com/docs/reference/opengraph/">aquí</a>.</td>
    </tr>
  </tbody>
</table>

Estas metaetiquetas proporcionan información semántica a los rastreadores desde los sitios sociales,
generalmente desde [Google+](https://plus.google.com/){: .external } y
[Facebook](https://www.facebook.com/){: .external }.

### Obtén más información
Para obtener más información sobre los elementos que puedes adjuntar a la publicación de Facebook, visita el sitio oficial de
Open Graph Protocol.

* [ogp.me](http://ogp.me/){: .external }

### Valida los fragmentos enriquecidos
Para validar tu marcado en Facebook, puedes usar las siguientes herramientas:

* [Depurador](https://developers.facebook.com/tools/debug/){: .external }

## Usa Twitter Cards para suministrar fragmentos enriquecidos en Twitter
[Twitter Cards](https://dev.twitter.com/docs/cards) son una extensión al
Open [Graph Protocol aplicable para Twitter](https://twitter.com/){: .external }. Te permiten
agregar elementos adjuntos multimedia como imágenes y video a los Tweets con un enlace a
tu página web. Al agregar los metadatos adecuados, los Tweets con enlaces a tu
página tendrán una tarjeta agregada que incluye los detalles enriquecidos que agregaste.

### Usa metaetiquetas `twitter:` con espacio de nombres para describir los metadatos
Para que una Twitter Card funcione, [tu dominio debe ser
aprobado](https://cards-dev.twitter.com/validator) y debe
contener una metaetiqueta que contiene `twitter:card` como el atributo `name` en lugar del atributo
`property`.
  
Aquí puedes ver un ejemplo rápido:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Al asignar la id de Twitter al valor de twitter:site, Twitter incorpora esta
información en la publicación compartida, de manera que las personas puedan interactuar fácilmente con el propietario
de la página.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### Obtén más información
Para obtener más información sobre Twitter Cards, visita:

* [Sitio del programador de Twitter](https://dev.twitter.com/docs/cards)

### Valida fragmentos enriquecidos
Para validar tu marcado, Twitter proporciona lo siguiente:

* [Validador de Cards](https://cards-dev.twitter.com/validator)

## La mejor práctica
Dadas las tres opciones, lo mejor que puedes hacer es incluirlas todas en tu
página web. A continuación, te mostramos un ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

Nota que los microdatos y el OGP comparten cierto marcado:

* `itemscope` se ubica en la etiqueta `head`
* `title` y `description` se comparten entre microdatos y OGP
* `itemprop="image"` está utilizando la etiqueta `link` con el atributo `href` en lugar de
reutilizar la etiqueta `meta` con `property="og:image"`
  
Por último, asegúrate de validar que tu página web aparezca como lo esperas en cada
sitio social antes de publicarla.



{# wf_devsite_translation #}
