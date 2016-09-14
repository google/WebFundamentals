project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los patrones de diseño web receptivos evolucionan rápidamente, pero existe una serie de patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Off canvas {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



En lugar de apilar contenido verticalmente, en el patrón Off canvas, el contenido  menos usado (tal vez los menús de navegación o de las aplicaciones) se coloca fuera de la pantalla y solo se muestra cuando el tamaño de la pantalla es lo suficientemente grande; en las pantallas más pequeñas, el contenido está solo a un clic de distancia.

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  Probar
{% endlink_sample %}

En lugar de apilar contenido verticalmente, en esta muestra se ocultan dos de los atributos
`div` del contenido fuera de la pantalla mediante la propiedad `transform: translate(-250px, 0)`.  JavaScript se utiliza
para mostrar los atributos divs al agregar una clase abierta al elemento para que hacerlo visible.  A medida que se
ensancha la pantalla, el posicionamiento fuera de la pantalla se elimina de los elementos y
estos se muestran dentro de la ventanilla visible.

Como verá en este ejemplo, Safari para iOS 6 y el navegador de Android no son compatibles con la función
`flex-flow: row nowrap` de `flexbox`, por lo que se debió recurrir nuevamente al
posicionamiento absoluto.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Artículos de HTML5Rocks
](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Sitios para celulares de Facebook](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/off-canvas.html" region_tag="ocanvas" lang=css %}
</pre>


