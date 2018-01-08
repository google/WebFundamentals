project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Las animaciones deben funcionar correctamente; de lo contrario, tendrán un impacto negativo en la experiencia del usuario.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animaciones y rendimiento {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Cada vez que se hace una animación, se deben mantener 60 fps, ya que un número menor daría como resultado parpadeos o bloqueos que los usuarios podrían notar, y esto tendría un impacto negativo en sus experiencias.

### TL;DR {: .hide-from-toc }
* Debes procurar que tus animaciones no causen problemas de rendimiento. Asegúrate de conocer el impacto que tiene animar una determinada propiedad de CSS.
* La animación de propiedades que modifican las características geométricas de la página (diseño) o generan efectos de pintura implican un consumo de recursos particularmente alto.
* Siempre que puedas, limítate a realizar cambios en las transformaciones y opacidad.
* Usa <code>will-change</code> para asegurarte de que el navegador reconozca lo que deseas animar.


La animación de propiedades tiene consecuencias, y para algunas propiedades supone un menor consumo de recursos que para otras. Por ejemplo, si se animan las propiedades `width` y `height` de un elemento, se modifica su geometría y esto podría hacer que otros elementos de la página se desplacen o cambien de tamaño. Este proceso se denomina *diseño* (o *reprocesamiento* en los navegadores basados en Gecko, como Firefox) y puede consumir muchos recursos si tu página contiene muchos elementos. Cada vez que se genere un diseño, normalmente se deberá pintar la página o parte de ella, lo cual suele requerir aún más recursos que la operación de diseño.

Siempre que sea posible, debes evitar animar propiedades que activen diseño o pintura. En el caso de los navegadores más modernos, esto significa limitar las animaciones a `opacity` o `transform`, ya que el navegador puede optimizar ambas propiedades en gran medida, independientemente de que la animación se administre con JavaScript o CSS.

Para encontrar una lista completa de los trabajos generados mediante propiedades individuales de CSS, consulta [Desencadenadores CSS](http://csstriggers.com). Puedes encontrar una guía completa sobre cómo crear [Animaciones de alto rendimiento en HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

### Uso de la propiedad will-change

Usa [`will-change`](https://dev.w3.org/csswg/css-will-change/) para asegurarte de que el navegador reconozca que deseas modificar la propiedad de un elemento. De este modo, el navegador puede aplicar las optimizaciones más adecuadas antes de que realices el cambio. Sin embargo, no uses `will-change` demasiado porque puede causar que el navegador desperdicie recursos, y esto también causa más problemas de rendimiento.

La regla de oro es que, si la animación podría desencadenarse en los próximos 200 ms, ya sea mediante la interacción de un usuario o debido al estado de tu app, se recomienda aplicar la propiedad `will-change` en los elementos animados. En la mayoría de los casos, entonces, cualquier elemento de la vista actual de tu aplicación que desees animar debe tener la propiedad `will-change` habilitada para las propiedades que vayas a modificar. En el caso del ejemplo del cuadro que usamos en las guías anteriores, la adición de `will-change` para los atributos transforms y opacity se vería de la siguiente manera:


    .box {
      will-change: transform, opacity;
    }
    

Ahora los navegadores compatibles con esto, [actualmente Chrome, Firefox y Opera](http://caniuse.com/#feat=will-change), realizarán las optimizaciones adecuadas de manera subyacente para admitir los cambios o las animaciones en dichas propiedades.

## Rendimiento de CSS en comparación con JavaScript

Existe una gran cantidad de páginas y comentarios en la web en los cuales se tratan las ventajas relativas de las animaciones de CSS y JavaScript desde la perspectiva del rendimiento. A continuación se muestran algunos puntos que debes tener en cuenta:

* Las animaciones basadas en CSS, y las animaciones web cuando exista compatibilidad nativa, generalmente se manejan con un subproceso conocido como “subproceso compositor”. Es diferente al “subproceso principal” del navegador, donde se ejecutan el estilo, el diseño, la pintura y JavaScript. Esto significa que, si el navegador tiene en ejecución algunas tareas con alta demanda de recursos en el subproceso principal, es muy probable que las animaciones se sigan ejecutando sin interrupciones.

* En muchos casos, el subproceso compositor también puede administrar otras modificaciones de las propiedades transforms y opacity.

* Si alguna animación activa elementos de pintura, diseño o de ambas clases, el “subproceso principal” deberá hacer el trabajo. Esto se aplica a las animaciones basadas en CSS y JavaScript, y es probable que la sobrecarga de diseño o pintura reduzca la cantidad de trabajo asociado con la ejecución de CSS o JavaScript, por lo cual el asunto sería irrelevante.

Para obtener más información sobre qué trabajo se desencadena al animar una propiedad determinada, consulta [Desencadenadores de CSS](http://csstriggers.com).




{# wf_devsite_translation #}
