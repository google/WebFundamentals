project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Mostly fluid {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



El patrón Mostly fluid consiste, principalmente, en una cuadrícula fluida.  Por lo general, en las pantallas grandes o medianas, se mantiene el mismo tamaño; simplemente se ajustan los márgenes en las pantallas más anchas.

En las pantallas más pequeñas, mediante la cuadrícula fluida, el contenido principal se redistribuye,
mientras que las columnas se apilan verticalmente.  Una de las mayores ventajas de este patrón es
que, en general, solo se necesita un punto de interrupción entre las pantallas grandes y las
pequeñas.

{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  Probar
{% endlink_sample %}

En la vista más pequeña, cada `div` de contenido se apila verticalmente.  Una vez que el ancho de la pantalla
alcanza los 600 píxeles, el `div` de contenido principal permanece en `width: 100%`, mientras que el
 `div` de contenido secundario se muestra como dos columnas debajo del `div` principal.  Si se superan los
800 píxeles, el `div` del contenedor se convierte en un ancho fijo y se centra en la pantalla.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/mostly-fluid.html" region_tag="mfluid" lang=css %}
</pre>


