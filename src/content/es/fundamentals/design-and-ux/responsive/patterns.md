project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los patrones de diseño web adaptables evolucionan rápidamente, pero existen varios patrones establecidos que funcionan bien en los diferentes equipos de escritorio y dispositivos móviles.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-29 #}

# Patrones de diseño web adaptables {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Los patrones de diseño web adaptables evolucionan rápidamente, pero existen varios patrones establecidos que funcionan bien en los diferentes equipos de escritorio y dispositivos móviles.

La mayoría de los diseños que se usan en las páginas web receptivas se pueden categorizar dentro de cinco clases de
patrones: mostly fluid, column drop, layout shifter, tiny tweaks y off canvas.
En algunos casos, en una página se puede usar una combinación de patrones; por ejemplo, column drop
y off canvas.  Estos patrones, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), son un punto de partida sólido
para cualquier página receptiva.

### Los patrones

Con el propósito de lograr una comprensión simple y fácil, cada uno de los que se presentan a continuación se crearon con lenguaje de marcado real a través de
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
generalmente con tres `div`de contenido dentro de un contenedor principal de `div`.
 Cada muestra se escribió primero a partir de la vista más pequeña y
se agregaron puntos de interrupción cuando fue necesario.  El [modo de diseño Flexbox es muy
compatible](http://caniuse.com/#search=flexbox) con los navegadores modernos; sin embargo, es posible que el
proveedor deba realizar ajustes previos para lograr una compatibilidad óptima.

## Mostly Fluid

El patrón Mostly fluid consiste, principalmente, en una cuadrícula fluida.  Por lo general, en las pantallas grandes o
medianas se mantiene el mismo tamaño y simplemente se ajustan los márgenes en las
más anchas.

En las pantallas más pequeñas, la cuadrícula fluida genera el reprocesamiento del contenido principal,
mientras que las columnas se apilan verticalmente.  Una de las mayores ventajas de este patrón es
que, en general, solo se necesita un punto de interrupción entre las pantallas grandes y las
pequeñas.

<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">Probar</a>

En la vista más pequeña, cada `div` de contenido se apila verticalmente.  Una vez que el ancho de la pantalla
alcanza los 600 píxeles, el `div` de contenido principal permanece en `width: 100%`, mientras que el
`div` de contenido secundario se muestra como dos columnas debajo del `div` principal.  Al superarse los
800 píxeles, el `div` del contenedor adopta ancho fijo y se centra en la pantalla.

Entre los sitios en los que se usa este patrón se incluyen los siguientes:

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Colocación de columnas 

En el caso de los diseños con varias columnas de ancho completo, durante el proceso de colocación de columnas éstas únicamente se colocan
de forma vertical debido a que el ancho de la ventana es demasiado reducido para el contenido.

En un momento dado, todas las columnas se apilan verticalmente.  La selección
de puntos de interrupción para este patrón de diseño depende del contenido y cambia
para cada diseño.

<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">Probar</a>

Como sucede con los ejemplos que son principalmente fluidos, el contenido se coloca verticalmente en la
vista más pequeña, pero a medida que se expande la pantalla a más de 600 píxeles, los
`div`de contenido principal y secundario ocupan todo el ancho de la pantalla.  El orden de los `div`se configura con la propiedad
CSS de orden.  Con 800 píxeles, se muestran los tres `div`de contenido en todo el
ancho de la pantalla.

Entre los sitios en los que se usa este patrón se incluyen los siguientes:

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

El patrón Layout shifter es el más adaptable, ya que posee varios
puntos de interrupción en diferentes anchos de pantalla.

La clave para este diseño es el desplazamiento del contenido, en lugar de su reprocesamiento y
colocación debajo de otras columnas.  Debido a las diferencias significativas entre cada
punto de interrupción principal, es más complejo de mantener, y es posible que se deban realizar cambios
dentro de los elementos, no solo en el diseño de contenido general.

<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">Probar</a>

En este ejemplo simplificado, se muestra el patrón Layout shifter. En las pantallas más pequeñas, el contenido se
apila verticalmente, pero cambia considerablemente a medida que se
agranda la pantalla, con un `div`a la izquierda y dos `div` apilados a la derecha.

Entre los sitios en los que se usa este patrón se incluyen los siguientes:

 * [Food Sense](http://foodsense.is/){: .external }
 * [Ejemplo de
  Seminal Responsive Design](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

El patrón Tiny tweaks permite realizar pequeños cambios en el diseño, como ajustar el
tamaño de la fuente, cambiar el tamaño de las imágenes o desplazar el contenido de maneras muy poco significativas.

Funciona correctamente en diseños con una sola columna, como los sitios web lineales de una sola página y los artículos con mucho texto.

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">Probar</a>

Como lo indica el nombre, en este ejemplo se producen pocos cambios pequeños cuando cambia el tamaño de la pantalla.
A medida que aumenta el ancho de la pantalla, también cambian el tamaño de la fuente y el relleno.

Entre los sitios en los que se usa este patrón se incluyen los siguientes:

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## Off canvas

En lugar de apilar contenido verticalmente, el patrón Off canvas coloca contenido
menos usado (tal vez menús de navegación o de apps) fuera de la pantalla y solo lo
muestra cuando el tamaño de la pantalla es suficientemente grande. En las pantallas más pequeñas, el acceso al
contenido es posible con solo a un clic.

<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">Probar</a>

En esta muestra, en lugar de apilarse el contenido verticalmente, se usa una declaración `transform: translate(-250px, 0)` para ocultar dos de los `div` de contenido fuera de la pantalla mediante la propiedad.  Se usa JavaScript
para mostrar los divs agregando una clase abierta al elemento para hacerlo visible.  A medida que se
ensancha la pantalla, el posicionamiento fuera de esta se elimina de los elementos y
estos se muestran dentro de la ventana de visualización visible.

Ten en cuenta que en este ejemplo Safari para iOS 6 y el navegador de Android no son compatibles con la función
`flex-flow: row nowrap` de `flexbox`, por lo cual se debió recurrir nuevamente al
posicionamiento absoluto.

Entre los sitios en los que se usa este patrón se incluyen los siguientes:

 * [HTML5Rocks Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Sitios para celulares de Facebook](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
