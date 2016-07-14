---
title: "Diseño de formularios eficientes"
description: "Para diseñar formularios eficientes, evite las acciones repetidas, solicite solo la información necesaria y oriente a los usuarios al mostrarles en qué instancia se encuentran en los formularios que tienen muchas partes."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  tldr:
    - "Utilice los datos existentes para completar previamente los campos, y asegúrese de habilitar la compleción automática."
    - "Utilice barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes."
    - "Proporcione un calendario visual para que los usuarios no tengan que abandonar su sitio para visitar la aplicación de calendario en sus teléfonos inteligentes."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  Para diseñar formularios eficientes, evite las acciones repetidas, solicite solo la información necesaria y oriente a los usuarios al mostrarles en qué instancia se encuentran en los formularios que tienen muchas partes.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Minimice las acciones y los campos repetidos

Asegúrese de que sus formularios no contengan acciones repetidas; solo incluya tantos campos como sea
necesario y aproveche la función 
[compleción automática](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete),
de modo que los usuarios puedan completar fácilmente los formularios con los datos completados previamente.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    En el sitio web Progressive.com, a los usuarios se les solicita primero su código postal, el cual se completa automáticamente en la próxima parte del formulario.
  </figcaption>
</figure>

Siempre que pueda, complete previamente la información que ya sabe o que se puede 
anticipar para que el usuario no tenga que ingresarla.  Por ejemplo, 
complete previamente la dirección de envío con la última dirección de envío proporcionada por el 
usuario.

## Muestre a los usuarios la instancia en la que se encuentran

En las barras de progreso y los menús, se debe indicar precisamente el progreso general de 
los formularios y procesos de varios pasos.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    Utilice barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes.
  </figcaption>
</figure>

Si coloca un formulario desproporcionadamente complejo en uno de los primeros pasos, aumentan las probabilidades de 
que los usuarios abandonen el sitio antes de completar todo el proceso. 


## Ofrezca calendarios visuales para seleccionar fechas

A menudo, los usuarios necesitan más contexto cuando deben programar citas y fechas de viajes. 
Para facilitar esta tarea y evitar que abandonen el sitio para consultar la 
aplicación del calendario, muéstreles un calendario visual con etiquetas claras para que puedan seleccionar las fechas de 
inicio y finalización. 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Hotel website with easy to use calendar">
  <figcaption>
    Sitio web de reserva de un hotel con un widget de calendario fácil de utilizar para seleccionar las fechas.
  </figcaption>
</figure>


