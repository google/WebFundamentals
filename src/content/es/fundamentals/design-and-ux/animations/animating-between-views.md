project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a animar la transición entre dos vistas en tus apps.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# Animaciones entre vistas {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

En muchos casos, quieres llevar a los usuarios de una vista a la otra dentro de tu app, ya sea desde una vista de lista a una de detalles, o bien para mostrar una barra lateral de navegación. Las animaciones entre estas vistas mantienen la atención del usuario y agregan incluso más vida a tus proyectos.

### TL;DR {: .hide-from-toc }
* Usa transiciones para desplazarte entre las vistas. Evita usar `left`, `top` u otras propiedades que desencadenen diseños.
* Asegúrate de que las animaciones que uses sean rápidas y de corta duración.
* Ten en cuenta cómo pueden cambiar las animaciones y los diseños a medida que aumenten los tamaños de las pantallas. Lo que funciona correctamente en una pantalla más chica puede verse extraño en un contexto de escritorio.

La forma en la que estas vistas se ven y se comportan depende del tipo de vistas con el que trabajes. Por ejemplo, animar una superposición modal sobre una vista debería ser una experiencia diferente a la transición entre una vista de lista y una de detalles.

Success: Intenta mantener 60 fps para todas tus animaciones. De ese modo, tus usuarios no verán animaciones entrecortadas que interfieran con su experiencia. Asegúrate de que todos los elementos de las animaciones estén configurados con `will-change` para todo lo que desees modificar mucho antes de que se inicie la animación. Para las transiciones de vistas, es muy probable que desees usar `will-change: transform`.

## Usa traslaciones para desplazarte entre vistas

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="Traducción entre dos vistas" />
  </figure>
</div>

Para hacerlo más simple, piensa que existen dos vistas: una vista de lista y una de detalles. Cuando el usuario presione un elemento de la lista que se encuentre dentro de la vista de lista, aparecerá la vista de detalles y desaparecerá la vista de lista.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="Jerarquía de vistas." />
  </figure>
</div>

A fin de lograr este efecto, necesitas un contenedor para ambas vistas con el parámetro `overflow: hidden` configurado. De este modo, las dos vistas pueden estar dentro del contenedor una al lado de la otra, sin mostrar barras de desplazamiento horizontal, y cada vista se puede deslizar de lado a lado dentro del contenedor según sea necesario.

<div style="clear:both;"></div>

La CSS para el contenedor es la siguiente:


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

La posición del contenedor se establece como `relative`. Esto significa que cada vista que se encuentre dentro de él puede posicionarse de manera absoluta en la esquina superior izquierda y, luego, moverse de un lado a otro mediante transformaciones. Este enfoque es mejor para el rendimiento que el uso de la propiedad `left` (ya que esta propiedad desencadena diseños y pinturas) y generalmente es más fácil de racionalizar.


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

Si se agrega un elemento `transition` en la propiedad `transform`, se logra un efecto de desplazamiento atractivo. Para darle una sensación agradable, se usa una curva `cubic-bezier` personalizada, que mencionamos en la [guía de aceleración personalizada](custom-easing).


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

La vista que no se muestra en la pantalla se debe desplazar hacia la derecha, por lo cual en este caso es necesario mover la vista de detalles:


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

Ahora se necesita poco lenguaje JavaScript para manipular las clases. Esto hará que se alternen las clases apropiadas en las vistas.


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

Finalmente, agregamos las declaraciones de CSS para esas clases.


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

Puedes expandir esto para que abarque varias vistas y el concepto básico seguirá siendo el mismo; cada vista no visible debe estar fuera de la pantalla y aparecer cuando sea necesario, y la pantalla que se muestra actualmente debe dejar de visualizarse.

Warning: Establecer este tipo de jerarquía entre navegadores puede ser todo un desafío. Por ejemplo, en iOS se requiere una propiedad adicional de CSS: <code>-webkit-overflow-scrolling: touch</code>, para ‘volver a habilitar’ el desplazamiento, pero esto no permite tener control sobre el eje en el que se aplica, tal como se puede hacer con la propiedad estándar de desbordamiento. ¡Asegúrate de probar la implementación en diferentes dispositivos!

Además de usarse para transiciones entre vistas, esta técnica también se puede aplicar a otros elementos de deslizamiento, como los elementos de navegación de la barra lateral. La única diferencia real es que no será necesario desplazar las otras vistas.

## Asegúrate de que tu animación funcione bien en pantallas más grandes

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="Jerarquía de vistas en una pantalla grande." />
  </figure>
</div>

En el caso de las pantallas más grandes, deberías mantener cerca la vista de lista todo el tiempo (en lugar de retirarla) y deslizar la vista de detalles hacia adentro desde la derecha. Es prácticamente lo mismo que usar una vista de navegación.






{# wf_devsite_translation #}
