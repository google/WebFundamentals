---
title: "Animaciones"
description: "Obtenga más información sobre las animaciones y su uso en las aplicaciones y los sitios modernos."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Utilice las animaciones como una forma de darle vida a sus proyectos."
    - "Las animaciones deben ser coherentes con la interacción del usuario."
    - "Tenga precaución con las propiedades que anima: algunas son más costosas que otras."
---
<p class="intro">
  Las animaciones son una parte muy importante para lograr que las aplicaciones y los sitios web sean cautivadores. Los usuarios desean utilizar interfaces de usuario altamente receptivas e interactivas. Sin embargo, animar su interfaz no es necesariamente una tarea fácil. ¿Qué se debe animar? ¿Cuándo se debe hacer? ¿Qué tipo de apariencia debe tener la animación?
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

## Elección de los objetos adecuados para animar

Las buenas animaciones le agregan un toque de diversión y compromiso a los proyectos que les presenta a los usuarios. Puede animar prácticamente todo lo que desee, ya sean anchos, alturas, posiciones, colores o fondos, pero deberá tener en cuenta los posibles cuellos de botella en el rendimiento y la forma en que las animaciones afectarán la personalidad de su aplicación. Las animaciones entrecortadas o mal elegidas pueden afectar negativamente la experiencia del usuario, por eso deben tener un buen rendimiento y deben ser adecuadas.

## Uso de animaciones para respaldar las interacciones

No realice animaciones solamente porque puede hacerlo; esto resulta fastidioso para los usuarios y se puede percibir como algo entorpecedor. En su lugar, utilice animaciones colocadas estratégicamente para _reforzar_ las interacciones del usuario. Si los usuarios pulsan en el icono del menú, este podrá aparecer desde el costado de la página, o si pulsan un botón, tal vez podrá utilizar un brillo o rebote suave para mostrar la interacción. Evite las animaciones que interrumpan o enorpezcan la actividad del usuario innecesariamente.

## Evite animar propiedades costosas

Si hay algo peor que las animaciones colocadas en el lugar incorrecto, de seguro son las aplicaciones que hacen que la página se entrecorte. Esto hará que los usuarios se sientan frustrados y molestos, y es probable que sientan que usted no se debería haber molestado en colocar animaciones.

Algunas propiedades son más costosas para cambiar que otras, y es por eso que algunas pueden verse entrecortadas. Entonces, por ejemplo, si cambia la propiedad `box-shadow` de un elemento, deberá realizar una operación de pintura mucho más costosa que si solo cambia el color del texto. Es probable que cambiar la propiedad `width` de un elemento sea más costoso que cambiar su `transform`.

Podrá obtener más información sobre las consideraciones de rendimiento de las animaciones en la guía [Animaciones y rendimiento](animations-and-performance.html), pero si desea que la propiedad TL;DR se adhiera a la propiedad transforms y que la propiedad opacity cambie, utilice `will-change`. Si desea saber exactamente cuál es el trabajo que se desencadena al animar una determinada propiedad, consulte [Desencadenadores de CSS](http://csstriggers.com).



