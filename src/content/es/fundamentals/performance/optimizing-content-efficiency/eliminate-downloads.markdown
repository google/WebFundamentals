---
title: "Eliminar las descargas innecesarias"
description: "El recurso más rápido y optimizado es el que no se envía. ¿Has supervisado el rendimiento de tus recursos recientemente? Deberías hacerlo cada cierto tiempo para garantizar que cada recurso contribuya a ofrecer la mejor experiencia posible al usuario."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Hacer un inventario con todos los elementos propios y de terceros en tus páginas"
    - "Medir el rendimiento de cada elemento: su valor y rendimiento técnico"
    - "Determinar si los recursos ofrecen suficiente valor"
---

<p class="intro">
  El recurso más rápido y optimizado es que no se envía. ¿Has supervisado el rendimiento de tus recursos recientemente? Deberías hacerlo cada cierto tiempo para garantizar que cada recurso contribuya a ofrecer la mejor experiencia posible al usuario.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

El recurso más rápido y optimizado es el que no se envía. Esto puede parecer obvio, pero suele pasarse por alto con demasiada frecuencia: como ingeniero de rendimiento, debes observar con ojo crítico cualquier oportunidad de eliminar recursos innecesarios de tu aplicación. Es buena idea cuestionar con tu equipo las suposiciones implícitas y explícitas cada cierto tiempo. Ejemplos:

* Siempre hemos incluido el recurso X en las páginas, pero ¿merece la pena el coste de descargarlo y mostrarlo en comparación con el valor ofrecido al usuario? ¿Podemos medir y demostrar su valor?
* ¿Tiene un rendimiento adecuado y constante el recurso (especialmente si es de un tercero)? ¿Se incluye el recurso en la ruta importante o debería incluirse? Si el recurso se encuentra en la ruta importante, ¿podría fallar en el sitio? Por ejemplo, si el recurso no está disponible, ¿afectará negativamente al rendimiento y al usuario?
* ¿Necesita el recurso un acuerdo de nivel de servicio?, ¿o ya tiene uno? Sigue este recurso prácticas recomendadas de rendimiento para la compresión, el almacenamiento en caché, etc.?

Nuestras páginas muchas veces suelen contener recursos innecesarios, o lo que es peor: disminuyen el rendimiento de la página sin ofrecer valor al visitante o al sitio en el que se encuentran alojadas. Esto sucede con recursos y widgets propios y de terceros:

* El sitio A decide mostrar un carrusel de fotos en su página principal para ofrecer al visitante una vista previa de las fotos con un solo clic. Todas las fotos estarán cargadas cuando la página se haya cargado, y el avance del carrusel lo controla el usuario.
    * **Pregunta:** ¿has medido cuántos usuarios ven varias fotos en el carrusel? Podrías estar descargando más recursos de los necesarios, ya que es posible que los visitantes no los vean.
* El sitio B decide instalar un widget de terceros para mostrar contenido relacionado, mejorar la interacción con los medios sociales u ofrecer algún otro servicio.
    * **Pregunta:** ¿has medido cuántos visitantes usan el widget o hacen clic en su contenido? ¿Logra el widget implicar al usuario lo suficiente como para justificar el consumo de recursos?

Como puedes ver, parece obvio que debamos eliminar descargas innecesarias, pero en la práctica no lo es, ya que hay que pensar y medir bien antes de tomar la decisión. De hecho, para obtener mejores resultados, deberías hacer un inventario cada cierto tiempo y volver a hacerte estas preguntas con cada elemento de tus páginas.



