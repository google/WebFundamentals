project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: El rol de semantics en la navegación de página


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# Semantics y navegación por el contenido {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Has aprendido sobre affordances, semantics y cómo las tecnologías asistenciales usan
el árbol de accesibilidad para crear una experiencia de usuario alternativa para sus usuarios.
Puedes ver que escribir HTML de semantic expresivo te brinda mucha
accesibilidad con poco esfuerzo, ya que muchos elementos estándar tienen los
semantics y comportamiento de soporte incorporados.

En esta lección, cubriremos semantics menos obvios que son muy importantes
para los usuarios de lector de pantalla, principalmente en cuanto a navegación. En una simple página con
muchos controles, pero sin mucho contenido, es sencillo explorar la página para encontrar lo que
necesitas. Pero en una página con mucho contenido como Wikipedia o un agregador
de noticias, no resulta práctico leer todo de punta a punta, necesitas
una forma para navegar eficientemente por el contenido.

Los programadores a menudo tienen el concepto errado de que los lectores de pantalla son tediosos y lentos
de usar, o de que se tiene que poder hacer foco en todo lo que aparece en la pantalla para que el lector
de pantalla lo encuentre. A menudo, eso no es así.

Los usuarios de lector de pantalla a menudo dependen de una lista de encabezados para ubicar la información. La mayoría de los
lectores de pantalla tienen formas sencillas para aislar y escanear una lista de encabezados de página, una
importante función llamada *rotor*. Veamos cómo podemos usar encabezados de HTML
en forma efectiva para soportar esta función.

## Uso de encabezados en forma efectiva

En primer lugar, reiteremos un punto previo: [*asuntos de
orden del DOM*](/web/fundamentals/accessibility/focus/dom-order-matters), no solo para
orden del foco, sino para orden del lector de pantalla. A medida que experimentes con lectores de pantalla
como VoiceOver, NVDA, JAWS y ChromeVox, verás que la lista de encabezados sigue
el orden del DOM en lugar del orden vidual.

Esto sucede con los lectores de pantalla en general. Debido a que los lectores de pantalla interactúan con
el árbol de accesibilidad, y el árbol de accesibilidad se basa en el árbol del DOM, el
orden en que un lector de pantalla percibe se basa directamente en el orden del DOM. Esto
significa que una estructura de encabezado apropiada es más importante que nunca.

En la mayoría de las páginas bien estructuradas, los niveles de encabezado se anidan para indicar
relaciones de principal-secundario entre los bloques de contenido. La [lista de comprobación
WebAIM](http://webaim.org/standards/wcag/checklist) reiteradamente hace referencia a esta
técnica.

 - [1.3.1](http://webaim.org/standards/wcag/checklist#sc1.3.1){: .external }
   menciona que el "lenguaje de marcado de semantic se usa para designar encabezados"
 - [2.4.1](http://webaim.org/standards/wcag/checklist#sc2.4.1){: .external }
   menciona la estructura de encabezados como una técnica para evitar bloques de
   contenido
 - [2.4.6](http://webaim.org/standards/wcag/checklist#sc2.4.6){: .external }
   discute algunos detalles para escribir encabezados útiles
 - [2.4.10](http://webaim.org/standards/wcag/checklist#sc2.4.10){: .external }
   afirma que "las secciones individuales de contenido se designan usando encabezados,
   cuando corresponde"

No todos los encabezados tienen que ser visibles en la pantalla.
[Wikipedia](https://www.wikipedia.org/), por ejemplo, usa una técnica que
coloca deliberadamente algunos encabezados fuera de la pantalla para hacerlos específicamente
accesibles *solo* para lectores de pantalla y otras tecnologías asistenciales.

    <style>
      .sr-only {
        position:absolute;
        left:-10000px;
        top:auto;
        width:1px;
        height:1px;
        overflow:hidden;
      }
    </style>

    <h2 class="sr-only">This heading is offscreen.</h2>

Note: El sitio de WebAIM discute esta técnica en profundidad en [este
artículo sobre contenido fuera de la pantalla](http://webaim.org/techniques/css/invisiblecontent/).

Para apps complejas, esta puede ser una buena forma de acomodar los encabezados cuando
el diseño visual no requiere o no tiene espacio para un encabezado visible.

Warning: Es importante no sobrepasarse con esta técnica. Recuerda que es posible que
los usuarios de tecnología asistencial también puedan ver la pantalla por sí mismo, así que
ir demasiado lejos con la creación de contenido "solo para lector de pantalla" puede
en definitiva degradar la experiencia de usuario para algunos usuarios. También te puede generar un
dolor de cabeza de mantenimiento más adelante.

## Otras opciones de navegación

A pesar de que las páginas con buenos encabezados ayudan a los usuarios de lector de pantalla a navegar, existen
otros elementos que pueden usar para moverse por una página, incluidos los *vínculos*, *controles
de forma* y *puntos de referencia*.

Los lectores pueden usar la función rotor del lector de pantalla (una forma fácil de aislar y
escanear una lista de encabezados de página) para acceder a una *lista de vínculos* en la página.
A veces, como en Wikipedia, hay muchos vínculos, entonces el lector puede buscar un
término entre los vínculos. Esto limita las entradas a vínculos que contienen el
término, en lugar de todas las apariciones del término en la página.

Esta función es útil solo si el lector de pantalla puede encontrar los vínculos y el texto
del vínculo es significativo. Por ejemplo, estos son algunos patrones comunes que hacen que los vínculos
sean difíciles de encontrar.

 - Etiquetas delimitadoras sin atributos `href`. Estos objetivos de vínculo se suelen usar en apps
   de una sola página y causan problemas para lectores de pantalla. Puedes
   obtener más información en [este artículo sobre apps de una sola página](http://neugierig.org/software/blog/2014/02/single-page-app-links.html).
 - Botones que se implementan con vínculos. Estos hacen que el lector de pantalla
   interprete el contenido como un vínculo y se pierde la funcionalidad del botón. En
   estos casos, reemplaza la etiqueta delimitadora con un botón real y dale el estilo
   apropiado.
 - Imágenes usadas como contenido de vínculo. Las imágenes de vínculos, que a veces son necesarias pueden resultar
   imposibles de usar para los lectores de pantalla. Para garantizar que el vínculo esté correctamente expuesto a la
   tecnología asistencial, asegúrate de que la imagen tenga texto de atributo `alt`.

Un mal texto de vínculo es otro problema. El texto al que se le puede hacer clic, como "más información" o "haz clic
aquí" no brinda información de semantic sobre adónde lleva el vínculo. En cambio, usa
texto descriptivo como "más información sobre el diseño adaptable" o "consulta este instructivo
de lienzo" para ayudar a los lectores de pantalla a brindar contexto significativo de los vínculos.

El rotor también puede mostrar una *lista de control de formulario*. Mediante el uso de esta lista, los lectores pueden
buscar artículos específicos y acceder directamente a ellos.

Un error común de los lectores de pantalla es la pronunciación. Por ejemplo, un lector
de pantalla puede pronunciar "udacity" como "oo-da-ci-ti", o puede leer un número de teléfono como un
número largo, o puede leer el texto en mayúsculas como si fuese un acrónimo.
Es interesante que los usuarios de lector de pantalla están bastante acostumbrados a esta interpretación y la tienen
en cuenta.

Algunos programadores intentan aliviar esta situación brindando texto
solo para lector de pantalla, que se deletrea fonéticamente. Esta es una regla sencilla del deletreo fonético:
**no lo hagas**, ¡solo empeora el problema! Si, por ejemplo, un usuario está usando
una pantalla braille, la palabra se deletreará en forma incorrecta, llevando a más
confusión. Los lectores de pantalla permiten que las palabras se deletreen en voz alta, así que deja que el
lector controle su experiencia y decida cuándo considera esto necesario.

Los lectores pueden usar el rotor para ver una *lista de puntos de referencia*. La lista les ayuda a los lectores
a encontrar el contenido principal y un conjunto de puntos de referencia de navegación brindados por elementos de puntos de referencia
de HTML.

HTML5 introdujo algunos nuevos elementos que ayudan a definir la estructura de semantic de
la página, incluidos `header`, `footer`, `nav`, `article`, `section`, `main` y
`aside`. Estos elementos, específicamente brindan pistas estructurales en la página
sin forzar un estilo incorporado (cosa que, de todas formas, deberías hacer con CSS).

Los elementos estructurales de semantic reemplazan los múltiples bloques `div` repetitivos, y
brindan una forma más limpia y descriptiva para expresar intuitivamente la estructura de página
de los autores y los lectores.




{# wf_devsite_translation #}
