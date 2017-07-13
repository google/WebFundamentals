project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introducción a ARIA y semantics de HTML no nativos


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# Introducción a ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Hasta ahora, hemos alentado el uso de elementos HTML nativos porque te brindan foco,
soporte de teclado y semantics incorporados, pero hay momentos en que un sencillo
diseño y HTML nativo no bastan. Por ejemplo, actualmente no hay
elemento HTML estandarizado para una creación muy común de IU, el menú emergente. Tampoco
hay un elemento HTML que brinde una característica de semantic como "el
usuario necesita conocer esto lo antes posible".

En esta lección, entonces, exploraremos cómo expresar los semantics que el HTML no puede
expresar por su cuenta.

Las [especificaciones de apps de Internet de buen acceso de la iniciativa de
accesibilidad a la Web](https://www.w3.org/TR/wai-aria/){: .external } (WAI-ARIA o
ARIA) es buena para unir áreas con problemas de accesibilidad que no se pueden controlar
con HTML nativo. Trabaja permitiéndote especificar atributos que modifican la
forma en que un elemento se traduce al árbol de accesibilidad. Veamos un
ejemplo.

En el siguiente fragmento, usamos un artículo de lista como tipo de casilla de verificación personalizada. La
clase "casilla de verificación" de CSS le brinda al elemento las características visuales solicitadas.


    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>
    

A pesar de que esto funciona bien para usuarios con visión, un lector de pantalla no brinda indicaciones
de que el elemento sirve como casilla de verificación, así que, los usuarios de baja visión pueden perderse el
elemento por completo.

Sin embargo, mediante el uso de atributos de ARIA podemos brindarle al elemento la información que falta
para que el lector de pantalla pueda interpretarla correctamente. Aquí, hemos agregado los atributos `role` y
`aria-checked` para identificar explícitamente el elemento como casilla de verificación y
para especificar que está marcada de manera predeterminada. Este artículo de lista ahora se agregará al
árbol de accesibilidad y un lector de pantalla los informará correctamente como casilla de verificación.


    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>
    

Note: Hablaremos de la lista de atributos de ARIA y de cuándo usarlos [después](#what-can-aria-do).

ARIA funciona cambiando y mejorando el árbol de accesibilidad del DOM estándar.

![el árbol de accesibilidad del DOM estándar](imgs/acctree1.jpg){: .attempt-right }

![el árbol de accesibilidad de ARIA mejorado](imgs/acctree2.jpg){: .attempt-right }

A pesar de que ARIA nos permite modificar sutilmente (o radicalmente) el árbol
de accesibilidad de cualquier elemento de la página, es lo único que eso cambia. **ARIA
no mejora nada del comportamiento inherente del elemento**. No hará que el
elemento pueda tener el foco ni le brindará gestores de eventos de teclado. Esa sigue siendo parte de nuestra
tarea de desarrollo.

Es importante comprender que no es necesario definir semantics
predeterminados. Sin importar su uso, un elemento `<input type="checkbox">`
HTML estándar no necesita un atributo de ARIA `role="checkbox"` adicional para
anunciarse correctamente.

También vale la pena mencionar que ciertos elementos HTML tienen restricciones sobre los roles y atributos
de ARIA que se pueden usar en ellos. Por ejemplo, a un elemento `<input
type="text">` estándar no se le puede aplicar un rol/atributo adicional.

>Consulta [especificaciones de ARIA en HTML](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }
para obtener más información.

Veamos qué otras capacidades puede ofrecer ARIA.

## ¿Qué puede hacer ARIA?

Como viste con el ejemplo de la casilla de verificación, ARIA puede modificar semantics de un elemento existente
o puede agregar semantics a elementos en los que no existan semantics nativos. También puede
expresar patrones semánticos que no existen en HTML, como un menú o un panel
de pestañas. A menudo, ARIA nos permite crear elementos estilo widget que no serían posibles
con HTML básico.

 - Por ejemplo, ARIA puede agregar texto de descripción y etiqueta adicional que solo se
   expone a APIs de tecnología asistencial.<br>

<div class="clearfix"></div>
      
    <button aria-label="screen reader only label"></button>


 - ARIA puede expresar relaciones de semantic entre elementos que extienden la
   conexión principal/secundario estándar, como un barra de desplazamiento personalizada que controla una
   región específica.

<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>

    

 - Y ARIA puede hacer que ciertas partes de la página estén "vivas", entonces inmediatamente le informan
   a la tecnología asistencial cuando cambian.

<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>

    
Uno de los aspectos centrales del sistema ARIA es su colección de *roles*. Un rol
en términos de accesibilidad se refiere a un indicador de atajo de un patrón específico
de IU. ARIA brinda un vocabulario de patrones que podemos usar a través del atributo `role`
en cualquier elemento HTML.

Cuando aplicamos la `role="checkbox"` en el ejemplo anterior, le estábamos diciendo
a la tecnología asistencial que el elemento debía seguir el patrón de "casilla de verificación". Es
decir, garantizamos que tenga estado de verificación (esté marcado o no
marcado), y que el estado se pueda activar o desactivar usando el mouse o la barra espaciadora,
como un elemento de casilla de verificación de HTML estándar.

De hecho, debido a que las interacciones de teclado aparecen en forma tan prominente en el uso de
lector de pantalla, es muy importante asegurarse de que, a la hora de crear un widget personalizado, el atributo
`role` siempre se aplique en el mismo lugar que el atributo `tabindex`
. Esto garantiza que los eventos de teclado vayan al lugar indicado y que cuando
un elemento tenga el foco su rol se logra en forma precisa.

Las [especificaciones de ARIA](https://www.w3.org/TR/wai-aria/){: .external } describen una
taxonomía de posibles valores del atributo `role` y los atributos de ARIA
asociados que se puedan usar en conjunto con esos roles. Esta es la mejor
fuente de información definitiva sobre cómo los atributos y roles de ARIA trabajan
juntos y cómo se pueden usar en una manera compatible con los navegadores y
tecnologías asistenciales.

![una lista de todos los roles de ARIA disponibles](imgs/aria-roles.jpg)

Sin embargo, las especificaciones son densas. Un lugar mas accesible para comenzar es el [documento Práctica para autores
de ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }
, que explora las mejores prácticas para el uso de las propiedades y roles disponibles
de ARIA.

ARIA también ofrece roles de punto de referencia que extienden las opciones disponibles en HTML5. Consulta
las especificaciones [Patrones de diseño de roles de
punto de referencia](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }
para obtener más información.



{# wf_devsite_translation #}
