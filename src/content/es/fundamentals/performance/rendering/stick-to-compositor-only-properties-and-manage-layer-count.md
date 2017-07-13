project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Composición hace referencia al proceso en el que las partes pintadas de la página se unen para mostrarlas en la pantalla.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Limítate solo a las propiedades del compositor y administra el recuento de capas {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Composición hace referencia al proceso en el que las partes pintadas de la página se unen para 
mostrarlas en la pantalla.

En esta área, hay dos factores claves que afectan el rendimiento de la página: la cantidad de capas del compositor que deben administrarse y las propiedades que usas para las animaciones.

### TL;DR {: .hide-from-toc }

* Limítate a los cambios de transform y opacity para tus animaciones.
* Promueve elementos en movimiento con `will-change` o `translateZ`.
* Evita usar en exceso las reglas de promoción; las capas requieren memoria y administración.

## Usa los cambios de transform y opacity para las animaciones

En la versión con mejor rendimiento de la canalización de píxeles se evitan tanto el diseño como la pintura, y solo se necesitan cambios en la composición:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"  alt="Canalización de píxeles sin diseño ni pintura.">

Para lograrlo, debes limitarte a las propiedades de cambio que pueden controlarse únicamente mediante el compositor. En la actualidad, esto se aplica solo a dos propiedades: **`transforms`** y **`opacity`**:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"  alt="Propiedades que puedes animar sin activar diseño ni pintura.">

La advertencia respecto del uso de `transform`s y `opacity` es que el elemento en el cual cambiarás estas propiedades debe encontrarse en _su propia capa del compositor_. Para poder crear una capa, debes promover el elemento. Hablaremos de esto a continuación.

Note: Si te preocupa no poder limitar las animaciones a estas propiedades, consulta el [principio FLIP](https://aerotwist.com/blog/flip-your-animations), que puede ayudarte a reasignar las animaciones a los cambios de las propiedades transforms y opacity desde propiedades más costosas.

## Promueve los elementos que desees animar

Como se mencionó en la sección “[Simplifica la complejidad de la pintura y reduce las áreas de pintura](simplify-paint-complexity-and-reduce-paint-areas)”, debes promover los elementos que desees animar (dentro de lo razonable, evitando los excesos) a su propia capa:


    .moving-element {
      will-change: transform;
    }


Como alternativa, en el caso de los navegadores anteriores o aquellos que no sean compatibles con will-change:


    .moving-element {
      transform: translateZ(0);
    }


De este modo, se notifica de antemano al navegador sobre la introducción de cambios y, según lo que desees modificar, es posible que este aplique medidas; por ejemplo, la creación de capas del compositor.

## Administra las capas y evita las explosiones de capas

Puede resultar tentador, al saber que las capas suelen contribuir al rendimiento, promover todos los elementos de tu página con algo como lo siguiente:


    * {
      will-change: transform;
      transform: translateZ(0);
    }


Esta es una forma indirecta de indicar que desearías promover cada elemento de la página. El problema es que cada capa que crees requerirá memoria y administración, y eso tiene consecuencias. De hecho, en los dispositivos con memoria limitada, el impacto en el rendimiento puede suponer un desequilibrio negativo contra cualquier beneficio que suponga la creación de una capa. Todas las texturas de las capas se deben cargar en la GPU, por lo que hay aún más restricciones con respecto al ancho de banda entre la CPU y la GPU, y a la memoria disponible para texturas en la GPU.

Warning: No promuevas elementos innecesariamente.

## Usa Chrome DevTools para comprender las capas de tu app

<div class="attempt-right">
  <figure>
    <img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" alt="Activación y desactivación de la generación de perfiles de pintura en Chrome DevTools.">
  </figure>
</div>

Para poder comprender las capas de tu aplicación y la razón por la cual un elemento posee una capa, debes habilitar el generador de perfiles Paint Profiler en Timeline de Chrome DevTools:

<div style="clear:both;"></div>

Cuando se active esta herramienta, debes iniciar una grabación. Cuando la grabación haya finalizado, podrás hacer clic en cada uno de los marcos, que se encuentran entre las barras de marcos por segundos y los detalles:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"  alt="Un fotograma para el cual el desarrollador desea generar un perfil.">

Si haces clic aquí, aparecerá una nueva opción en los detalles: la pestaña Layer.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"  alt="Botón de la pestaña Layer en Chrome DevTools.">

A través de esta opción, se generará una nueva vista que te permitirá hacer una panorámica, analizar y acercar todas las capas durante ese fotograma, y se mostrarán los motivos por los cuales se creó cada una.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"  alt="Vista de capa en Chrome DevTools.">

Si usas esta vista, podrás realizar un seguimiento de la cantidad de capas que tienes. Si demoras mucho tiempo en la composición durante acciones críticas para el rendimiento, como el desplazamiento o las transiciones (debes intentar hacerlo en un plazo aproximado de **4 a 5 ms**), puedes usar esta información para saber cuántas capas tienes y por qué se crearon, y, a partir de allí, administrar el recuento de capas en tu app.


{# wf_devsite_translation #}
