project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte de la Web no está optimizada para varios dispositivos. Adquiere los conocimientos básicos para que tu sitio funcione en móviles, en ordenadores o en cualquier dispositivo con pantalla.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Usar consultas de medios en CSS para una mayor adaptabilidad {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Las consultas de medios son simples filtros que pueden aplicarse a los estilos CSS.  Facilitan el cambio de estilos según las características del dispositivo, como el tipo de pantalla, el ancho, el alto, la orientación e incluso la resolución.




## TL;DR {: .hide-from-toc }
- Las consultas de medios pueden usarse para aplicar estilos según las características del dispositivo.
- Usa <code>min-width</code> en vez de <code>min-device-width</code> para obtener una mayor compatibilidad.
- Usa tamaños relativos en los elementos para no romper el diseño.



Por ejemplo, puedes insertar todos los estilos necesarios para impresión dentro de una consulta de medios de impresión:


    <link rel="stylesheet" href="print.css" media="print">
    

Además de usar el atributo `media` en el enlace de la hoja de estilos, hay dos modos de aplicar consultas de medios que puedan insertarse en un archivo CSS: `@media` e `@import`.  Por motivos de rendimiento, es preferible usar cualquiera de los dos primeros métodos que usar la sintaxis `@import` (consulta [Evitar importaciones en CSS]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

La lógica que afecta a las consultas de medios no es mutuamente exclusiva, y se aplicará cualquier filtro que cumpla los criterios del bloque CSS resultante usando las reglas de prioridad estándar en CSS.

## Aplicar consultas de medios basadas en el tamaño de la ventana gráfica

Las consultas de medios nos permiten crear una experiencia para varios dispositivos, con estilos específicos para pantallas pequeñas, grandes y de cualquier tamaño intermedio.  La sintaxis de la consulta de medios permite la creación de reglas que pueden aplicarse según las características del dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Si bien hay varios elementos que podemos usar para estas consultas, los más usados para el diseño web adaptable son `min-width`, `max-width`, `min-height` y `max-height`.


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="attribute">atributo</th>
      <th data-th="Result">Resultado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier ancho de ventana de navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier ancho de ventana de navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier alto de ventana de navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier alto de ventana de navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier navegador cuyo alto de ventana sea superior o igual al ancho.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier navegador cuyo ancho sea superior al alto.</td>
    </tr>
  </tbody>
</table>

Veamos el siguiente ejemplo:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Vista previa de una página que usa consultas de medios para cambiar las propiedades a medida que cambia de tamaño.">
  {% endlink_sample %}
</figure>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* Cuando la ventana del navegador tenga un tamaño de entre <b>0 px</b> y <b>640 px</b> de ancho, se aplicará·`max-640px.css`.
* Cuando la ventana del navegador tenga un tamaño de entre <b>500 px</b> y <b>600 px</b> de ancho, se aplicarán los estilos de·`@media`.
* Cuando la ventana del navegador tenga <b>640 px de ancho o más</b>, se aplicará `min-640px.css`.
* Cuando la ventana del navegador tenga un <b>ancho superior al alto</b>, se aplicará `landscape.css`.
* Cuando la ventana del navegador tenga un <b>alto superior al ancho</b>, se aplicará `portrait.css`.


## Nota sobre `min-device-width`

También es posible crear consultas basadas en `*-device-width`, aunque **no se recomienda** hacerlo.

La diferencia es sutil, aunque muy importante: `min-width` depende del tamaño de la ventana del navegador, mientras que `min-device-width` depende del tamaño de la pantalla.  Lamentablemente, algunos navegadores, incluido el navegador anterior de Android, no interpretarán correctamente el ancho del dispositivo y, en su lugar, interpretarán el tamaño de pantalla en píxeles de dispositivo en vez de tener en cuenta el ancho de la ventana gráfica, que sería lo esperado.

Además, el uso de `*-device-width` puede evitar que el contenido se adapte en ordenadores y en otros dispositivos que permitan que las ventanas cambien de tamaño. Esto se debe a que la consulta se basa en el tamaño normal del dispositivo, y no en el tamaño de la ventana del navegador.

## Usar unidades relativas

Un concepto clave detrás del diseño adaptable es la fluidez y la proporcionalidad, en contraposición a los diseños con ancho fijo.  Al usar unidades relativas en las medidas, el diseño se simplifica y se evita la creación accidental de componentes que sean demasiado grandes para la ventana gráfica.

Por ejemplo, al establecer `width: 100%` en un elemento `div` de nivel superior, nos aseguramos de que ocupe el ancho de la ventana gráfica y de que nunca sea demasiado grande o pequeño para esta.  El elemento `div` encajará correctamente en un iPhone de 320 píxeles, en un Blackberry Z10 de 342 píxeles o en un Nexus 5 de 360 píxeles de ancho.

Además, al usar unidades relativas, los navegadores pueden procesar el contenido según sea el nivel de zoom que apliquen los usuarios, sin necesidad de añadir barras de desplazamiento horizontal a la página.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



