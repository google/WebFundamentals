---
title: "CSS que bloquea la renderización del contenido"
description: "De forma predeterminada, el código CSS se considera un recurso que puede retrasar la visualización del sitio. Esto quiere decir que el navegador solo mostrará el contenido cuando se haya construido el CSSOM. Asegúrate de reducir al mínimo los estilos CSS, de activarlos lo antes posible y de usar tipos y consultas de medios para acelerar la renderización del contenido."
updated_on: 2014-09-18
related-guides:
  media-queries:
    -
      title: Usar consultas de medios en CSS para una mayor adaptabilidad
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Diseño web adaptable"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - "De forma predeterminada, los estilos CSS se consideran un recurso que puede retrasar la renderización del sitio."
    - "Los tipos y las consultas de medios permiten indicar que algunos recursos CSS no bloquean la renderización del contenido."
    - "Todos los recursos CSS, independientemente de que retrasen la visualización del contenido o no, los descarga el navegador."
---
<p class="intro">
  De forma predeterminada, el código CSS se considera un recurso que puede retrasar la visualización del sitio. Esto quiere decir que el navegador solo mostrará el contenido cuando se haya construido el CSSOM. Asegúrate de reducir al mínimo los estilos CSS, de activarlos lo antes posible y de usar tipos y consultas de medios para acelerar la renderización del contenido.
</p>



En la sección anterior, vimos que la ruta de renderización importante exige que el DOM y el CSSOM construyan el árbol de visualización, lo cual implica algo que puede afectar negativamente al rendimiento: **los recursos HTML y CSS pueden retrasar la renderización del contenido ** Ya sabíamos esto del HTML, porque sin el DOM no podría mostrarse nada, pero que los estilos CSS se comportan también de esta manera es menos obvio. ¿Qué pasaría si intentamos mostrar una página cualquiera sin que el CSS retrasara su visualización?

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>NYTimes con CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes con CSS">

  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>NYTimes sin CSS (durante un instante se muestra contenido sin estilos)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes sin CSS">

  </div>
</div>

{% comment %}
<table class="mdl-data-table mdl-js-data-table">
<tr>
<td>NYTimes con CSS</td>
<td>NYTimes sin CSS (durante un instante se muestra contenido sin estilos)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes con CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes sin CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

En el ejemplo anterior, donde mostramos el sitio web del NYTimes con y sin estilos CSS, se demuestra por qué se bloquea la visualización de la página hasta que el CSS está disponible: sin los estilos CSS, la página quedaría inutilizable. De hecho, en la imagen de la derecha vemos que, durante un instante, se muestra contenido sin estilos. Como resultado, el navegador bloqueará la visualización hasta crear el DOM y el CSSOM.

> ** Los estilos CSS pueden retrasar la visualización de la página. Esto es algo que debes explicar al cliente lo antes posible para optimizar el sitio y acelerar todo lo posible la primera visualización de la página._**

Sin embargo, ¿qué pasaría si tenemos estilos CSS que solo se usan en determinadas condiciones, por ejemplo, cuando la página se imprima o se muestre en un monitor grande? Sería ideal no bloquear la visualización del sitio en este caso.

Los tipos y las consultas de medios nos permiten gestionar estos casos:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

Una [consulta de medios]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) consiste en un tipo de medio y cero o más impresiones que comprueban las condiciones de características particulares de los medios. Por ejemplo, nuestra primera declaración en la hoja de estilos no proporciona ningún tipo ni consulta de medios, por lo que se aplicará en todos los casos. Es decir, siempre retrasará la visualización de la página. Por otra parte, la segunda hoja de estilos solo se aplicará cuando se imprima el contenido (quizás quieras reorganizar el diseño, cambiar las fuentes, etc.), por lo que no es necesario bloquear la visualización de la página cuando cargue por primera vez. Por último, la última declaración en la hoja de estilos proporciona una consulta de medios que la ejecuta el navegador: si se cumplen las condiciones, el navegador bloqueará la visualización hasta que la hoja de estilos se descargue y se procese.

Al usar consultas de medios, nuestra presentación puede adaptarse a casos específicos, como visualizar e imprimir, y también para condiciones dinámicas como cambios en la orientación de la pantalla, cambios de tamaño de los eventos, etc. **Al declarar los elementos de la hoja de estilos, presta atención a los tipos y a las consultas de medios, ya que tendrán un impacto importante en el rendimiento durante la ruta de renderización importante.**

{% include shared/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Veamos algunos ejemplos prácticos:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* La primera declaración puede bloquear la visualización del contenido y se da en todas las condiciones.
* La segunda declaración también puede bloquear la visualización del contenido: `all` es el tipo predeterminado y, si no especificas ningún tipo, se aplicará `all` de forma predeterminada. Por lo tanto, la primera y la segunda declaración son en realidad equivalentes.
* La tercera declaración tiene una consulta de medios dinámica que se evaluará al cargar la página. En función de la orientación del dispositivo al cargar la página, portrait.css podría o no bloquear la visualización de la página.
* La última declaración solo se aplica cuando la página se imprime, por lo que no impide la visualización del contenido por primera vez en el navegador.

Por último, ten en cuenta que el bloqueo de la visualización solo implica que el navegador tenga que retrasar la primera visualización de la página en el recurso en cuestión. En cualquier caso, el navegador descarga el elemento CSS, aunque dando una prioridad menor a los recursos que no retrasen la visualización de la página.



