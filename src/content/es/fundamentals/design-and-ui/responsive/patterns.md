project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles.


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-10-20 #}

# Patrones De Diseños Web Receptivos {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles.

La mayoría de los diseños que se utilizan en las páginas web receptivas se
pueden categorizar dentro de uno de cinco patrones: Mostly fluid, Column drop,
Layout shifter, Tiny tweaks y Off canvas. En algunos casos, en una página, se
puede utilizar una combinación de patrones; por ejemplo, Column drop
y Off canvas.  Estos patrones, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), son un punto de partida sólido
para cualquier página receptiva.

### Los patrones

Para crear muestras simples y fáciles de comprender, cada una de las muestras
que se presentan a continuación se crearon con marcas reales a través de 
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
generalmente con tres `div` de contenido dentro de un `div` de contenedor principal.
 Cada muestra se escribió primero a partir de la vista más pequeña y, luego,
se agregaron puntos de interrupción donde era necesario.  El [modo de diseño Flexbox es muy
compatible](http://caniuse.com/#search=flexbox) con los navegadores modernos; sin embargo, es posible que el
proveedor deba realizar ajustes previos para lograr una compatibilidad óptima.

## Mostly fluid

El patrón Mostly fluid consiste, principalmente, en una cuadrícula fluida.  Por lo general, en las pantallas grandes o medianas, se mantiene el mismo tamaño; simplemente se ajustan los márgenes en las pantallas más anchas.

En las pantallas más pequeñas, mediante la cuadrícula fluida, el contenido principal se redistribuye,
mientras que las columnas se apilan verticalmente.  Una de las mayores ventajas de este patrón es
que, en general, solo se necesita un punto de interrupción entre las pantallas grandes y las
pequeñas.


<img src="imgs/mostly-fluid.svg">


En la vista más pequeña, cada `div` de contenido se apila verticalmente.  Una
vez que el ancho de la pantalla alcanza los 600 píxeles, el `div` de contenido
principal permanece en `width: 100%`, mientras que el  `div` de contenido
secundario se muestra como dos columnas debajo del `div` principal.  Si se
superan los 800 píxeles, el `div` del contenedor se convierte en un ancho fijo
y se centra en la pantalla.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>


## Colocación de columnas


En el caso de los diseños con varias columnas de ancho completo, durante el proceso de colocación de columnas, éstas únicamente se colocan de forma vertical, debido a que el ancho de la ventana es demasiado estrecho para el contenido.

Finalmente
, el resultado es que todas las columnas se apilan verticalmente.  La selección
de puntos de interrupción para este patrón de diseño depende del contenido y cambiará
para cada diseño.


<img src="imgs/column-drop.svg">


Como sucede con las muestras que son principalmente fluidas, el contenido se coloca verticalmente en la
vista más pequeña, pero a medida que se expande la pantalla a más de 600 píxeles, el parámetro
`div` del contenido principal y secundario ocupa todo el ancho de la pantalla.  El orden de `div` se configura mediante la propiedad
CSS de orden.  A los 800 píxeles, se muestra el `div` de los tres contenidos en todo el
ancho de la pantalla.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>


## Layout shifter


El patrón Layout shifter es el más receptivo, ya que posee varios puntos de interrupción en diferentes anchos de pantalla.

La clave de este diseño es el modo en que el contenido se mueve, en lugar de redistribuirse y
colocarse debajo de otras columnas.  Debido a las diferencias significativas entre cada
punto de interrupción principal, es más complejo de mantener, y es posible que se deban realizar cambios
dentro de los elementos, no solo en el diseño de contenido general.

<img src="imgs/layout-shifter.svg">

En este ejemplo simplificado, se muestra el patrón Layout shifter. En las pantallas más pequeñas, el contenido se
apila verticalmente, pero cambia significativamente a medida que se
agranda la pantalla, con un `div` a la izquierda y dos `div` apilados a la derecha.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>


## Tiny tweaks


El patrón Tiny tweaks permite realizar pequeños cambios en el diseño, como ajustar el tamaño de la fuente, cambiar el tamaño de las imágenes o desplazar el contenido de diferentes maneras.

Funciona correctamente en diseños con una sola columna, como los sitios web lineales de una sola página
y los artículos con mucho texto.


<img src="imgs/tiny-tweaks.svg">

Como lo indica el nombre, en esta muestra se realizan cambios pequeños cuando se cambia el tamaño de la pantalla.
A medida que aumenta el ancho de la pantalla, también cambian el tamaño de la fuente y el relleno.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto"%}
</pre>


## Off canvas


En lugar de apilar contenido verticalmente, en el patrón Off canvas, el contenido  menos usado (tal vez los menús de navegación o de las aplicaciones) se coloca fuera de la pantalla y solo se muestra cuando el tamaño de la pantalla es lo suficientemente grande; en las pantallas más pequeñas, el contenido está solo a un clic de distancia.

<img src="imgs/off-canvas.svg">

En lugar de apilar contenido verticalmente, en esta muestra se ocultan dos de los atributos
`div` del contenido fuera de la pantalla mediante la propiedad `transform: translate(-250px, 0)`.  JavaScript se utiliza
para mostrar los atributos divs al agregar una clase abierta al elemento para que hacerlo visible.  A medida que se
ensancha la pantalla, el posicionamiento fuera de la pantalla se elimina de los elementos y
estos se muestran dentro de la ventanilla visible.

Como verá en este ejemplo, Safari para iOS 6 y el navegador de Android no son compatibles con la función
`flex-flow: row nowrap` de `flexbox`, por lo que se debió recurrir nuevamente al
posicionamiento absoluto.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Artículos de HTML5Rocks](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Sitios para celulares de Facebook](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>

