---
title: "Animaciones entre vistas"
description: "Aprenda a colocar animaciones entre dos vistas en sus aplicaciones."
updated_on: 2014-10-22
translation_priority: 0
key-takeaways:
  code:
    - "Utilice transiciones para desplazarse entre las vistas; evite utilizar`left`, `top` u otras propiedades que desencadenen diseños."
    - "Asegúrese de que las animaciones que utilice sean ingeniosas y breves."
    - "Tenga en cuenta que las animaciones y los diseños pueden cambiar a medida que aumentan los tamaños de las pantallas; lo que funciona correctamente en una pantalla más chica puede verse extraño en un contexto de escritorio."
notes:
  sixtyfps:
    - "El objetivo debe ser mantener 60 fotograma/s para todas las animaciones. De ese modo, sus usuarios no experimentarán animaciones entrecortadas que los saquen de la experiencia. Mucho antes de que se inicie la animación, asegúrese de que will-change esté establecido en todos los elementos de las animaciones para todo lo que desea modificar. Para las transiciones de vistas, es muy probable que desee utilizar <code>will-change: transform</code>."
  flinging:
    - "El uso de este tipo de jerarquía entre exploradores puede ser todo un desafío. Por ejemplo, en iOS se requiere una propiedad adicional de CSS: <code>-webkit-overflow-scrolling: touch</code> para ‘volver a habilitar’ el desplazamiento, pero esto no permite tener control sobre el eje en el que se aplica, tal como se puede hacer con la propiedad estándar de desbordamiento. Asegúrese de probar la implementación en diferentes dispositivos."

---

<p class="intro">
  Muchas veces querrá llevar a los usuarios de una vista a la otra dentro de su aplicación, ya sea de una vista de lista a una vista de detalles, o mostrar una barra lateral de navegación. Las animaciones entre estas vistas resultan eficientes para mantener la atención del usuario y agregarle incluso más vida a sus proyectos.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

El aspecto y el comportamiento de las transiciones de esta vista dependerán, en mayor medida, del tipo de vistas con las que está trabajando; por ejemplo, animar una superposición modal sobre una vista debe ser una experiencia diferente de la de realizar una transición entre una vista de lista y una vista de detalles.

{% include shared/remember.liquid title="Note" list=page.notes.sixtyfps %}

## Use traslaciones para desplazarse entre vistas

Para hacerlo simple, supongamos que hay dos vistas: una vista de lista y una vista de detalles. Cuando el usuario presione un elemento de la lista que se encuentra dentro de la vista de lista, aparecerá la vista de detalles y desaparecerá la vista de lista.

<img src="imgs/gifs/view-translate.gif" alt="Translating between two views" />

Para lograr este efecto, necesitará un contenedor para ambas vistas con el parámetro `overflow: hidden` configurado. De este modo, las dos vistas pueden estar dentro del contenedor una al lado de la otra, sin mostrar barras de desplazamiento horizontal, y cada vista se puede deslizar de lado a lado dentro del contenedor según sea necesario.

<img src="imgs/container-two-views.svg" alt="View hierarchy." />

La CSS para el contenedor es la siguiente:

{% highlight css %}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
{% endhighlight %}

La posición del contenedor se establece como `relative`. Esto significa que cada vista que se coloque dentro del contenedor se puede posicionar completamente en la esquina superior izquierda y, luego, mover de un lado a otro mediante el parámetro transforms. Este enfoque es mejor para el rendimiento que si se utiliza la propiedad `left` (ya que esta propiedad desencadena diseños y pinturas), y generalmente es más fácil de racionalizar.

{% highlight css %}
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
{% endhighlight %}

Si se agrega una `transition` en la propiedad `transform`, se logra un buen efecto de desplazamiento. Para lograr una linda apariencia, se recomienda utilizar una curva `cubic-bezier` personalizada, la cual mencionamos en la [guía de Aceleración personalizada](custom-easing.html).

{% highlight css %}
.view {
  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
{% endhighlight %}

La vista que no se muestra en la pantalla se debe desplazar hacia la derecha, por lo que, en este caso, es necesario mover la vista de detalles:

{% highlight css %}
.details-view {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
{% endhighlight %}

Ahora, se necesita una pequeña cantidad de JavaScript para manipular las clases. Esto hará que se alternen las clases apropiadas en las vistas.

{% highlight javascript %}
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
{% endhighlight %}

Finalmente, agregamos las declaraciones de CSS para esas clases.

{% highlight css %}
.view-change .list-view {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.view-change .details-view {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
{% endhighlight %}

{% link_sample _code/inter-view-animation.html %}Ver el ejemplo{% endlink_sample %}

Podría expandir esto para que abarcara múltiples vistas, y el concepto básico seguiría siendo el mismo: cada vista no visible debe estar fuera de la pantalla y debe aparecer cuando sea necesario, y la pantalla que se muestra actualmente debe dejar de mostrarse.

{% include shared/remember.liquid title="Note" list=page.notes.flinging %}

Además de realizar transiciones entre las vistas, esta técnica también se puede aplicar a otros elementos de deslizamiento, como los elementos de navegación de la barra lateral. La única diferencia real es que no sería necesario desplazar las otras vistas.

## Asegúrese de que la animación funcione bien en pantallas más grandes

En el caso de las pantallas más grandes, debe mantener la vista de lista a mano todo el tiempo en lugar de retirarla, y deslizar la vista de detalles hacia adentro desde la derecha. Es más o menos lo mismo que utilizar una vista de navegación.

<img src="imgs/container-two-views-ls.svg" alt="View hierarchy on a large screen." />


