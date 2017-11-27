project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introducción al árbol de accesibilidad


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# El árbol de accesibilidad {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Imagina que estás compilando una interfaz de usuario *solo para usuarios de lector de pantalla*.
Aquí, no necesitas crear una IU visual, solo tienes que brindar suficiente
información para que use el lector de pantalla.

Lo que crearías es una especie de API que describe la estructura de la página, similar
a la API del DOM, pero puedes terminar con menos información y menos nodos,
porque mucha de esa información solo es útil para la presentación visual. Puede
lucir así.

![maqueta de la API del DOM de lector de pantalla](imgs/treestructure.jpg)

Esto es básicamente lo que el navegador le presenta el lector de pantalla. El
navegador toma el árbol del DOM y lo modifica para generar un formulario útil para
la tecnología asistencial. A este árbol modificado lo llamamos *Árbol
de accesibilidad*.

Puedes visualizar el árbol de accesibilidad como semejante a una vieja página web
de la década del 90: pocas imágenes, muchos vínculos, tal vez un campo y un botón.

![una página web estilo 1990](imgs/google1998.png)

El escaneo visual de una página como esta te brinda una experiencia similar a
la que tendría el usuario de lector de pantalla. La interfaz está allí, pero es simple
y directa, como una interfaz de árbol de accesibilidad.

El árbol de accesibilidad es con lo que la mayoría de las tecnologías asistenciales interactúan. El
flujo es parecido a esto.

 1. Una app (el navegador u otra app) expone una versión de semantic de su
    IU para tecnología asistencial vía una API.
 1. La tecnología asistencial puede usar la información que lee vía la API para
    crear una presentación de interfaz de usuario alternativa para el usuario. Por ejemplo,
    un lector de pantalla crea una interfaz en la que el usuario escucha una representación
    hablada de la app.
 1. La tecnología asistencial también puede permitirle al usuario interactuar con la app de
    otra manera. Por ejemplo, la mayoría de los lectores de pantalla brindan vínculos que le permiten al
    usuario simular fácilmente un clic de mouse o el presionar con el dedo.
 1. La tecnología asistencial transmite la intención del usuario (como "clic") a
    la app a través de la API de accesibilidad. La app tiene la responsabilidad de
    interpretar la acción en forma correcta en el contexto de la IU original.

Para los navegadores web, existe un paso adicional en cada dirección, porque el navegador
es una plataforma de apps web que se ejecuten en él. Por eso, el navegador necesita
traducir la app web en un árbol de accesibilidad, y tiene que asegurarse de que se activen los
eventos apropiados en JavaScript según las acciones del usuario que vienen
de la tecnología asistencial.

Pero eso es responsabilidad del navegador. Nuestra tarea como programadores web es
estar al tanto de que esto sucede y desarrollar páginas web que aprovechen
este proceso para crear una experiencia accesible para nuestros usuarios.

Hacemos esto asegurándonos de expresar los semantics de nuestras páginas correctamente:
asegurándonos de que los elementos importantes de la página tengan los estados, propiedades y roles
accesibles correctos, y que especifiquen nombres y
descripciones accesibles. El navegador puede permitirle a la tecnología asistencial acceder a esa
información para crear una experiencia personalizada.

## Semantics en HTML nativo

Un navegador puede transformar el árbol del DOM en un árbol de accesibilidad porque gran parte
del DOM tiene significado de semantic *implícito*. Es decir, el DOM usa elementos de
HTML nativos reconocidos por los navegadores y que trabajan en forma predictiva en varias
plataformas. La accesibilidad para elementos de HTML nativos como vínculos o botones se
controla automáticamente. Podemos aprovechar esa accesibilidad incorporada
escribiendo HTML que expresen los semantics de los elementos de nuestra página.

Sin embargo, a veces usamos elementos que parecen elementos nativos, pero no lo son.
Por ejemplo, este "botón" no es un botón.

{% framebox height="60px" %}
<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>
<div class="fancy-btn">Give me tacos</div>
{% endframebox %}

Se puede construir en HTML de varias formas, una de ellas es la siguiente.


    <div class="button-ish">Give me tacos</div>
    

Cuando no usamos un elemento botón real, el lector de pantalla no tiene forma de saber
sobre qué ha aterrizado. Además, tendríamos que hacer el trabajo adicional [de agregar
tabindex](/web/fundamentals/accessibility/focus/using-tabindex) para que sea
utilizable para usuarios solo de teclado porque, como se codifica ahora, solo se puede usar
con mouse.

Podemos solucionar esto fácilmente usando un elemento `button` común en lugar de un `div`.
El uso de un elemento nativo también tiene le beneficio de ocuparse de las interacciones
de teclado por nosotros. Y recuerda que no tienes que perder tus elegantes efectos
visuales solo porque uses un elemento nativo. Puedes darles estilo a los elementos nativos para
que luzcan como quieres y mantener los semantics y
el comportamiento implícitos.

Antes observamos que los lectores de pantalla anunciarán el rol, nombre,
estado y valor de un elemento. Al usar el elemento de semantic correcto, el rol, estado y valor
están cubiertos, pero también tenemos que asegurarnos que hacer que el nombre de un elemento
sea detectable.

A grandes rasgos, existen dos tipos de nombres:

 - las *etiquetas visibles*, que todos los usuarios usan para asociar el significado a un
   elemento, y
 - las *alternativas de texto*, que solo se usan cuando no hay necesidad de etiqueta
   visual.

Para los elementos de nivel de texto, no tenemos que hacer nada, porque, por definición,
tendrán contenido de texto. Sin embargo, para los elementos de control o entrada, y el contenido
visual como imágenes, tenemos que asegurarnos de especificar un nombre. De hecho,
brindar alternativas de texto para cualquier contenido que no sea texto es [el primer
artículo de la lista de comprobación de WebAIM](http://webaim.org/standards/wcag/checklist#g1.1).

Una forma de hacerlo es seguir su recomendación de que "Las entradas de formulario tienen
etiquetas de texto asociadas". Existen dos formas de asociar una etiqueta a un elemento
de formulario, como una casilla de verificación. Cualquiera de los métodos hace que el texto de la etiqueta también
se convierta en un objetivo de clic para la casilla de verificación, lo cual también es útil para usuarios de mouse o
pantalla táctil. Para asociar una etiqueta a un elemento,

 - Coloca el elemento de entrada dentro de un elemento de etiqueta

<div class="clearfix"></div>

    <label>
      <input type="checkbox">Receive promotional offers?</input>
    </label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receive promotional offers?</input>
    </label>
</div>
{% endframebox %}


o

 - Usa el atributo `for` de la etiqueta y haz referencia al `id` del elemento

<div class="clearfix"></div>

    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>
</div>
{% endframebox %}
    

Cuando se etiqueta correctamente la casilla de verificación, el lector de pantalla puede informar que
el elemento tiene un rol de casilla de verificación y se llama "Receive
promotional offers?".

![salida de texto en pantalla de VoiceOver que muestra la etiqueta en oralidad de una casilla de verificación](imgs/promo-offers.png)

Success: Puedes usar el lector de pantalla para encontrar etiquetas
asociadas en forma incorrecta tocando la pantalla y verificando los roles, estados y
nombres en la oralidad.




{# wf_devsite_translation #}
