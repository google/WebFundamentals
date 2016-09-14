project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprenda a colocar animaciones entre dos vistas en sus aplicaciones.

{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# Animaciones entre vistas {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


Muchas veces querrá llevar a los usuarios de una vista a la otra dentro de su aplicación, ya sea de una vista de lista a una vista de detalles, o mostrar una barra lateral de navegación. Las animaciones entre estas vistas resultan eficientes para mantener la atención del usuario y agregarle incluso más vida a sus proyectos.

## TL;DR {: .hide-from-toc }
- Utilice transiciones para desplazarse entre las vistas; evite utilizar `left`, `top` u otras propiedades que desencadenen diseños.
- Asegúrese de que las animaciones que utilice sean ingeniosas y breves.
- Tenga en cuenta que las animaciones y los diseños pueden cambiar a medida que aumentan los tamaños de las pantallas; lo que funciona correctamente en una pantalla más chica puede verse extraño en un contexto de escritorio.


El aspecto y el comportamiento de las transiciones de esta vista dependerán, en mayor medida, del tipo de vistas con las que está trabajando; por ejemplo, animar una superposición modal sobre una vista debe ser una experiencia diferente de la de realizar una transición entre una vista de lista y una vista de detalles.

Note: El objetivo debe ser mantener 60 fotograma/s para todas las animaciones. De ese modo, sus usuarios no experimentarán animaciones entrecortadas que los saquen de la experiencia. Mucho antes de que se inicie la animación, asegúrese de que will-change esté establecido en todos los elementos de las animaciones para todo lo que desea modificar. Para las transiciones de vistas, es muy probable que desee utilizar `will-change: transform`.

## Use traslaciones para desplazarse entre vistas

Para hacerlo simple, supongamos que hay dos vistas: una vista de lista y una vista de detalles. Cuando el usuario presione un elemento de la lista que se encuentra dentro de la vista de lista, aparecerá la vista de detalles y desaparecerá la vista de lista.

<img src="images/view-translate.gif" alt="Translating between two views" />

Para lograr este efecto, necesitará un contenedor para ambas vistas con el parámetro `overflow: hidden` configurado. De este modo, las dos vistas pueden estar dentro del contenedor una al lado de la otra, sin mostrar barras de desplazamiento horizontal, y cada vista se puede deslizar de lado a lado dentro del contenedor según sea necesario.

<img src="images/container-two-views.svg" alt="View hierarchy." />

La CSS para el contenedor es la siguiente:


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

La posición del contenedor se establece como `relative`. Esto significa que cada vista que se coloque dentro del contenedor se puede posicionar completamente en la esquina superior izquierda y, luego, mover de un lado a otro mediante el parámetro transforms. Este enfoque es mejor para el rendimiento que si se utiliza la propiedad `left` (ya que esta propiedad desencadena diseños y pinturas), y generalmente es más fácil de racionalizar.


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
    

Si se agrega una `transition` en la propiedad `transform`, se logra un buen efecto de desplazamiento. Para lograr una linda apariencia, se recomienda utilizar una curva `cubic-bezier` personalizada, la cual mencionamos en la [guía de Aceleración personalizada](custom-easing.html).


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

La vista que no se muestra en la pantalla se debe desplazar hacia la derecha, por lo que, en este caso, es necesario mover la vista de detalles:


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

Ahora, se necesita una pequeña cantidad de JavaScript para manipular las clases. Esto hará que se alternen las clases apropiadas en las vistas.


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
    
    // When you click on a list item bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click on the back button
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
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/inter-view-animation.html">Ver el ejemplo</a>

Podría expandir esto para que abarcara múltiples vistas, y el concepto básico seguiría siendo el mismo: cada vista no visible debe estar fuera de la pantalla y debe aparecer cuando sea necesario, y la pantalla que se muestra actualmente debe dejar de mostrarse.

Note: El uso de este tipo de jerarquía entre exploradores puede ser todo un desafío. Por ejemplo, en iOS se requiere una propiedad adicional de CSS: <code>-webkit-overflow-scrolling: touch</code> para ‘volver a habilitar’ el desplazamiento, pero esto no permite tener control sobre el eje en el que se aplica, tal como se puede hacer con la propiedad estándar de desbordamiento. Asegúrese de probar la implementación en diferentes dispositivos.

Además de realizar transiciones entre las vistas, esta técnica también se puede aplicar a otros elementos de deslizamiento, como los elementos de navegación de la barra lateral. La única diferencia real es que no sería necesario desplazar las otras vistas.

## Asegúrese de que la animación funcione bien en pantallas más grandes

En el caso de las pantallas más grandes, debe mantener la vista de lista a mano todo el tiempo en lugar de retirarla, y deslizar la vista de detalles hacia adentro desde la derecha. Es más o menos lo mismo que utilizar una vista de navegación.

<img src="images/container-two-views-ls.svg" alt="View hierarchy on a large screen." />


