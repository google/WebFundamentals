---
layout: article
title: "Adición de un manifiesto para aplicación web"
description: "El manifiesto para las aplicaciones web es un archivo JSON simple que le proporciona a usted, el desarrollador, la capacidad de controlar cómo se le muestra su aplicación al usuario en las áreas en las que espera ver aplicaciones (por ejemplo, la pantalla de inicio de los celulares), dirigir lo que el usuario puede ejecutar y, lo que es más importante, cómo puede hacerlo. En el futuro, el manifiesto le permitirá tener incluso más control sobre su aplicación, pero ahora solo nos centramos en cómo se puede ejecutar su aplicación."
introduction: "El manifiesto para las aplicaciones web es un archivo JSON simple que le proporciona a usted, el desarrollador, la capacidad de controlar cómo se le muestra su aplicación al usuario en las áreas en las que espera ver aplicaciones (por ejemplo, la pantalla de inicio de los celulares), dirigir lo que el usuario puede ejecutar y, lo que es más importante, cómo puede hacerlo. En el futuro, el manifiesto le permitirá tener incluso más control sobre su aplicación, pero ahora solo nos centramos en cómo se puede ejecutar su aplicación."
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - Defina un rango de iconos, de modo que se puedan utilizar en todos los factores de forma del dispositivo.
    - Elija un buen `short_name`, ya que esto es lo que verán los usuarios.
    - Agregue una URL de ejecución y un parámetro Querystring, para que pueda realizar un seguimiento de la cantidad de usuarios que ejecutan su aplicación.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

Agregar un manifiesto para aplicación web es realmente simple. Primero, crea un archivo manifest.json
que contenga las configuraciones y los recursos de su aplicación web
y, luego, agrega un *vínculo* que lleve a ella desde sus páginas html.

## Creación del manifiesto

Puede denominar al manifiesto como prefiera. La mayoría de las personas, probablemente, utilizan simplemente manifest.json. A continuación, se muestra un ejemplo.

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

Debe incluir un *short_name* (nombre corto), ya que este se utilizará en el texto de ejecución.

Si no proporciona una *start_url* (URL de lanzamiento), se utilizará la página actual, y es muy poco probable que esto sea lo que desean los usuarios.

## Información al navegador acerca del manifiesto

Una vez que haya creado el manifiesto y lo haya implementado en su sitio, deberá agregar una etiqueta de vínculo en todas las páginas en las que se muestra su aplicación web, tal como se explica a continuación.

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## Cree iconos de aplicaciones llamativos para el dispositivo

Usted puede definir el conjunto de iconos que utilizará el navegador para mostrar su aplicación cuando un usuario agrega su sitio a la pantalla de inicio.

Los iconos para su aplicación web se pueden definir, como se indicó anteriormente, con un tipo, tamaño y densidad, pero no es necesario que defina todos estos parámetros, puede definir simplemente los tamaños y el atributo src de la imagen.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="Add to Homescreen Icon">

        <figcaption>Adición del icono en la pantalla de inicio</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Configure de qué modo se ejecuta su sitio

Puede hacer que en su aplicación web se oculte la UI de los navegadores al definir el tipo de *visualización* en *independiente*.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

No se preocupe, si considera que los usuarios preferirían ver su página como un sitio normal en un navegador, puede utilizar el tipo de visualización del navegador.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>Opciones de visualización del manifiesto</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Defina la orientación inicial de la página

Puede definir una orientación específica, lo que es realmente útil para algunos casos de uso, como los juegos, que solo se pueden utilizar con la orientación horizontal. Sin embargo, esta función se debe utilizar con precaución. Los usuarios prefieren ver las aplicaciones en ambas orientaciones.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="WebApp Manifest Orientation Options">

        <figcaption>Opciones de orientación del manifiesto de las aplicaciones web</figcaption>
    </figure>
</div>

<div class="clear"></div>

## ¿Es seguro utilizarlo hoy en día? Compatibilidad de los navegadores con A.K.A

Sí.  Esta es una función progresiva con la cual, si usted ofrece compatiblidad, los usuarios de los navegadores que la utilicen
podrán disfrutar de una mejor experiencia.  Si el navegador no es compatible con el manifiesto, los usuarios podrán utilizar el
sitio de todos modos.

A partir de noviembre de 2014, se implementó el manifiesto en Chrome. En Mozilla, se está implementando y en [IE se está analizando la idea](https://status.modern.ie/webapplicationmanifest?term=manifest).

{% include modules/nextarticle.liquid %}

{% endwrap %}
