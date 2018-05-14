project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uso de etiquetas ARIA para crear descripciones de elementos accesibles


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Etiquetas y relaciones de ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## Etiquetas

ARIA brinda varios mecanismos para agregarles etiquetas y descripciones a elementos.
De hecho, ARIA es la única forma de agregar ayuda accesible o texto descriptivo. Ahora
veamos las propiedades que usa ARIA para crear etiquetas accesibles.

### aria-label

`aria-label` nos permite especificar una string para usar como etiqueta accesible.
Esto anula cualquier otro mecanismo de etiquetado nativo, como un elemento `label`
&mdash; por ejemplo, si un `button` tiene contenido de texto y una `aria-label`,
solo se usará el valor de la `aria-label`.

Puedes usar un atributo de `aria-label` cuando tienes algún tipo de indicación
visual del objetivo de un elemento, como un botón que use un gráfico en lugar
de texto, pero igualmente necesitas aclarar el objetivo para quien no pueda acceder a la
indicación visual, como un botón que use solo una imagen para indicar su
propósito.

![uso de aria-label para identificar un botón solo de imagen](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby` permite especificar la ID de otro elemento del DOM como
etiqueta de un elemento.

![uso de aria-labelledby para identificar un grupo de radio](imgs/aria-labelledby.jpg)

Es parecido a un elemento `label`, con algunas diferencias claves.

 1. `aria-labelledby` se puede usar en cualquier elemento, no solo en elementos etiquetables.
 1. A pesar de que un elemento `label` se refiere a aquello que etiqueta, la relación se
    invierte en el caso de `aria-labelledby` &mdash; lo que se
    etiqueta se refiere a aquello que lo etiqueta.
 1. Solo se puede asociar un elemento de etiqueta a un elemento etiquetable, pero
    `aria-labelledby` puede tomar una lista de IDREFs para componer una etiqueta de varios
    elementos. La etiqueta se concatenará en el orden que se les
    da a los IDREFs.
 1. Puedes usar `aria-labelledby` para referirte a elementos ocultos que
    de otra forma no estarían en el árbol de accesibilidad. Por ejemplo, podrías agregar un
    oculto `span` junto a un elemento que desees etiquetar, y referirte a eso con
    `aria-labelledby`.
 1. Sin embargo, ya que ARIA solo afecta al árbol de accesibilidad, `aria-labelledby`
    no te brinda el conocido comportamiento de hacer clic en la etiqueta que recibes usando un elemento
    `label`.

Es importante que `aria-labelledby` anula **todas** las otras fuentes de nombre de un
elemento. Entonces, por ejemplo, si un elemento tiene tanto `aria-labelledby` como
`aria-label`, o una `aria-labelledby` y una `label` nativa de HTML, la etiqueta
`aria-labelledby` siempre tiene prioridad.

## Relaciones

`aria-labelledby` es un ejemplo de un "atributo de relación". Un atributo
de relación crea una relación semántica entre los elementos de la página
sin importar su relación con el DOM. En el caso de la `aria-labelledby`, esa
relación es "este elemento etiquetado por ese elemento".

Las especificaciones de ARIA enumeran [ocho atributos
de relación](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }.
Seis de estos, `aria-activedescendant`, `aria-controls`, `aria-describedby`,
`aria-labelledby` y `aria-owns`, hacen referencia a uno o más elementos para
crear un nuevo vínculo entre elementos de la página. La diferencia en cada caso es
lo que significa ese vínculo y como se les presenta a los usuarios.

### aria-owns

`aria-owns` es una de las relaciones de ARIA más usadas. Este atributo
nos permite decirle a la tecnología asistencial que un elemento separado del
DOM se debería tratar como un elemento secundario del actual, o que se reorganicen
los elementos secundarios existentes en otro orden. Por ejemplo, si un submenú
en ventana emergente está visualmente ubicado cerca de su menú principal, pero no puede ser un DOM secundario
de su principal porque afectaría a la presentación visual, puedes usar
`aria-owns` para presentar el submenú como secundario del menú principal para un lector de
pantalla.

![uso de aria-owns para establecer una relación entre un menú y un submenú](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant` tiene una función relacionada. Así como el elemento activo de una
página es el que tiene el foco, la configuración de un descendiente activo
nos permite decirle a la tecnología asistencial que debería presentarse al
usuario un elemento como elemento en foco cuando el elemento principal es el que tiene el foco. Por
ejemplo, en un cuadro de lista, tal vez desees dejar el foco de página en el contendor
de cuadro de lista y mantener su atributo `aria-activedescendant` actualizado al
elemento de lista actualmente seleccionado. Esto hace que el artículo actualmente seleccionado le aparezca a la
tecnología asistencial como si tuviese el foco.

![uso de aria-activedescendant para establecer una relación en un cuadro de lista](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby` brinda una descripción accesible de la misma manera en que
`aria-labelledby` brinda una etiqueta. Como `aria-labelledby`, `aria-describedby`
puede hacer referencia a elementos que de otra forma no son visibles, ya sea que están ocultos del
DOM u ocultos de los usuarios de tecnología asistencial. Esta es una técnica útil cuando
hay texto explicativo adicional que un usuario puede necesitar, ya sea si se aplica
solo a usuarios de tecnología asistencial o a todos los usuarios.

Un ejemplo común es un campo de entrada de contraseña acompañado de
texto descriptivo que explica los requisitos mínimos de contraseña. A diferencia de una etiqueta,
esta descripción puede o no presentarse al usuario. Este puede tener la
opción de acceder o no a ella, o la descripción puede aparecer después de toda la otra información,
o puede estar anticipada por otra cosa. Por ejemplo, si el usuario está ingresando
información, se reproducirá su entrada y puede interrumpir la descripción
del elemento. Sin embargo, una descripción es una excelente manera de comunicar información complementaria,
pero no fundamental. No se interpondrá en el camino de la información
más crítica, como el rol del elemento.

![uso de aria-describedby par establecer una relación con un campo de contraseña](imgs/aria-describedby.jpg)

### aria-posinset y aria-setsize

Los atributos de relación restantes son algo diferentes y trabajan en conjunto.
`aria-posinset` ("posición en set") y `aria-setsize` ("tamaño de set") se tratan de
definir una relación entre elementos relacionados en un set, como una lista.

Cuando el tamaño de un set no se puede determinar sobre la base de los elementos presentes en el DOM
&mdash; como cuando se usa la representación vaga para evitar una gran lista
del DOM a la vez &mdash; `aria-setsize` puede especificar el tamaño real del set y
`aria-posinset` puede especificar la posición del elemento en el set. Por ejemplo, en un
set que puede contener 1000 elementos, se podría decir que un elemento en especial
tiene un `aria-posinset` de 857, a pesar de que aparezca primero en el DOM, y se pueden
usar técnicas de HTML dinámicas para garantizar que el usuario pueda explorar la lista completa a
voluntad.

![uso de aria-posinset y aria-setsize para establecer una relación en una lista](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
