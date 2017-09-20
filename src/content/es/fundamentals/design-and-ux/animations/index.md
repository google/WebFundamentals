project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obtén más información sobre las animaciones y su uso en apps y sitios modernos.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animaciones {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Las animaciones ocupan un lugar muy importante a la hora de lograr que las aplicaciones y los sitios web resulten atractivos. Los usuarios desean usar interfaces de usuario altamente receptivas e interactivas. Sin embargo, animar tu interfaz no es necesariamente una tarea simple. ¿Qué se debe animar? ¿En qué momento? ¿Qué tipo de apariencia debe tener la animación?


### TL;DR {: .hide-from-toc }
* Usa las animaciones como una forma de dar vida a tus proyectos.
* Las animaciones deben ser coherentes con la interacción del usuario.
* Ten cuidado con las propiedades que animas: algunas consumen más recursos que otras.


## Elección de los objetos adecuados que se animarán

Las buenas animaciones agregan un toque de diversión y atractivo a los proyectos que presentes a tus usuarios. Puedes animar prácticamente todo lo que desees, ya sean anchos, alturas, posiciones, colores o fondos; pero deberás tener en cuenta los posibles cuellos de botella en el rendimiento y la forma en que las animaciones afectarán la personalidad de tu app. Las animaciones entrecortadas o mal elegidas pueden afectar negativamente la experiencia del usuario, por eso deben tener un buen rendimiento y deben ser adecuadas.

## Uso de animaciones para respaldar las interacciones

No realices animaciones solamente porque puedes hacerlo; esto resulta fastidioso para los usuarios y se puede percibir como algo entorpecedor. En su lugar, usa animaciones colocadas estratégicamente para _reforzar_ las interacciones del usuario. Si pulsan el ícono del menú, deslizan para que aparezca un panel lateral de navegación, o si pulsan un botón, tal vez puedas usar un brillo o rebote sutiles para mostrar la interacción. Evita las animaciones que interrumpan o entorpezcan la actividad del usuario sin necesidad.

## Evita animar propiedades que consuman muchos recursos

Si hay algo peor que las animaciones mal colocadas, esas son las animaciones con las cuales la página se entrecorta. Este tipo de animación hace que los usuarios se sientan frustrados y molestos, y probablemente preferirían que no incluyeras animaciones.

Es más difícil cambiar algunas propiedades que otras, y es por eso que algunas pueden verse entrecortadas. Entonces, por ejemplo, cambiar la propiedad `box-shadow` de un elemento requiere una operación de pintura que consume mucho más recursos que cambiar, por ejemplo, el color de su texto. Del mismo modo, es probable que cambiar la propiedad `width` de un elemento implique más recursos que cambiar su propiedad `transform`.

Puedes obtener más información sobre las consideraciones de rendimiento de las animaciones en la guía [Animaciones y rendimiento](animations-and-performance), pero si quieres el TL;DR, solo modifica transforms y opacity, y usa `will-change`. Si deseas saber exactamente el trabajo que se desencadena al animar una propiedad determinada, consulta [Desencadenadores de CSS](http://csstriggers.com).


{# wf_devsite_translation #}
