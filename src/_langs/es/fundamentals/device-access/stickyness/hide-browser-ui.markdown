---
layout: article
title: "Ocultar la IU del navegador"
description: "Los usuarios pueden agregar su sitio a la pantalla de inicio sin ningún código especial, pero le recomendamos que en la pantalla de su aplicación web no aparezca la IU del navegador cuando se abra desde la pantalla de inicio (que, de hecho, se muestra en pantalla completa."
introduction: "Los usuarios pueden agregar su sitio a la pantalla de inicio sin ningún código especial, pero le recomendamos que en la pantalla de su aplicación web no aparezca la IU del navegador cuando se abra desde la pantalla de inicio (que, de hecho, se muestra en pantalla completa."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

Agregue el siguiente código al `<head>` de su página:

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


De este modo, se le indicará a Mobile Safari que está ejecutando 
una aplicación web.

En Internet Explorer, no se necesitan instrucciones para llevar esto a cabo, ya que los 
sitios ejecutarán la pantalla completa de forma predeterminada.

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>Lanzamiento de un sitio con la etiqueta META compatible con aplicaciones web</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
