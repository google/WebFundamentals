---
title: "Rendimiento de la representación"
description: "Los usuarios notan si los sitios y las aplicaciones no funcionan correctamente, por eso es fundamental optimizar el rendimiento de la representación."
updated_on: 2015-03-20
translation_priority: 0
notes:
  csstriggers:
    "Si desea saber cuál de las tres versiones anteriores que cambia cualquier propiedad determinada de las CSS (Hoja de estilos en cascada) se desencadenará, visite<a href='http://csstriggers.com'>Desencadenadores de CSS</a>. Y si desea aprender rápidamente a realizar animaciones de alto rendimiento, lea la sección sobre<a href='stick-to-compositor-only-properties-and-manage-layer-count'>cómo cambiar las propiedades exclusivas del compositor</a>."
  rasterize:
    "En algunos casos, tal vez escuche el término \"rasterizar\", que se utiliza junto con el término pintura. Esto se debe a que el proceso de pintura está formado por dos tareas: 1) creación de una lista de llamadas de dibujo y 2) relleno de los píxeles.

    La última tarea se denomina \"rasterización\", por lo que, cada vez que vea registros de pintura en DevTools, debe tener en cuenta que incluyen rasterización. (En algunas arquitecturas, la creación de la lista de llamadas de dibujo y la rasterización se llevan a cabo en diferentes cadenas, pero el desarrollador no tiene control sobre esto)."
udacity:
  id: ud860
  title: Optimización de la representación del navegador
  description: "¿Le interesa profundizar sus conocimientos sobre el rendimiento de la representación? Consulte el curso complementario y conozca cómo el navegador convierte HTML, CSS y JavaScript en píxeles en la pantalla, cómo utilizar DevTools para medir el rendimiento y cómo optimizar la representación de sus páginas."
  image: images/rp-udacity.jpg
---
<p class="intro">
  Los usuarios que utilizan la web actual <a href="http://paul.kinlan.me/what-news-readers-want/">esperan que las páginas que visitan sean interactivas y funcionen correctamente</a>, y es justo allí donde debe concentrar más su tiempo y esfuerzo. Las páginas no solo deben cargarse rápidamente, sino que también deben funcionar bien; el desplazamiento debe ser tan rápido como el movimiento de los dedos, y las animaciones y las interacciones deben ejecutarse suavemente.
</p>

<img src="images/intro/response.jpg" class="center" alt="User interacting with a website.">

Para escribir sitios y aplicaciones de alto rendimiento, debe comprender de qué modo el navegador utiliza HTML, JavaScript y CSS, y asegurarse de que el código que escriba (y el otro código de terceros que incluya) se ejecute lo más eficientemente posible.

## 60 fotograma/s y frecuencia de actualización de los dispositivos

En la actualidad, la mayoría de los dispositivos actualizan sus pantallas **60 veces por segundo**. Si se está ejecutando una animación o una transición, o si el usuario está desplazando las páginas, el navegador debe cronometrar la frecuencia de actualización del dispositivo y colocar una nueva imagen o marco para cada una de estas actualizaciones de pantalla.

Cada uno de estos marcos cuenta con un plazo de un poco más de 16 ms (1 segundo/60 = 16,66 ms). Sin embargo, en realidad, el navegador debe realizar la verificación, por lo que todo el trabajo se debe completar en **10 ms**. Si no cumple con este plazo, la frecuencia del marco disminuye, y el contenido se sacude en la pantalla. Esto generalmente se conoce como **bloqueo** y tiene un impacto negativo en la experiencia del usuario.

## Canalización de píxeles
Existen cinco áreas principales que debe conocer y tener en cuenta cuando trabaja. Estas son áreas sobre las que tiene un gran nivel de control, y los puntos clave de la canalización de píxeles hacia la pantalla:

<img src="images/intro/frame-full.jpg" class="center" alt="The full pixel pipeline">

* **JavaScript**. Comúnmente, JavaScript se utiliza para realizar el trabajo que genera cambios visuales, ya sea una función `animate` de jQuery, la clasificación de un conjunto de datos o la adición de elementos del DOM (Modelo de objetos de documento) en la página. Sin embargo, no solo se utiliza JavaScript para desencadenar un cambio visual: las animaciones de las CSS, las transiciones y las API de Web Animations también se utilizan a menudo.
* **Cálculos de estilo**. Este proceso consiste en descifrar cómo se aplican las reglas de las CSS a determinados elementos según los selectores de coincidencias; p. ej., `.headline` o `.nav > .nav__item`. A partir de allí, una vez que se conocen las reglas, estas se aplican y se calculan los estilos finales para cada elemento.
* **Diseño**. Una vez que el navegador conoce las reglas que se aplican a un elemento, puede comenzar a calcular la cantidad de espacio que se necesita y dónde se debe colocar en la pantalla. El modelo del diseño de la web implica que un elemento puede afectar a los demás; p. ej., el ancho del elemento `<body>` generalmente afecta el ancho de sus elementos secundarios, y así sucesivamente todo el trayecto hacia arriba y hacia abajo del árbol, por lo que el proceso puede involucrar bastante al navegador.
* **Pintura**. La pintura es el proceso de rellenar los píxeles. Esto implica dibujar texto, colores, imágenes, bordes y sombras; básicamente todas las partes visuales de los elementos. Por lo general, el dibujo se realiza en múltiples superficies, que se conocen como capas.
* **Composición**. Como las partes de la página se dibujan posiblemente en múltiples capas, se deben dibujar en la pantalla en el orden correcto para que la página las represente correctamente. Esto es especialmente importante para los elementos que se superponen, ya que un error podría hacer que un elemento apareciera sobre otro de forma incorrecta.

Cada una de estas partes del proceso representa una oportunidad para introducir un bloqueo, por eso es importante comprender exactamente cuáles son las partes del proceso que su código desencadena.

{% include shared/remember.liquid title="Note" list=page.notes.rasterize %}

No necesariamente tocará todas las partes del proceso en todos los marcos. De hecho, en el proceso _normalmente_ se ejecuta un determinado marco de tres maneras diferentes cuando se realiza un cambio visual, ya sea mediante JavaScript, CSS o Web Animations:

1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg" class="center" alt="The full pixel pipeline">

Si modifica una propiedad de “diseño”, dicha propiedad modifica la geometría de un elemento (como su ancho, su altura o su posición a la izquierda o en la parte superior), y el navegador deberá verificar todos los otros elementos y “redistribuir” la página. Las áreas afectadas se deberán volver a pintar, y los elementos pintados finales se deberán volver a componer en conjunto.

2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" class="center" alt="The  pixel pipeline without layout.">

Si modifica una propiedad de “pintura solamente” (como una imagen de fondo, el color del texto o las sombras, p. ej., una que no afecta el diseño de la página), el navegador omite el diseño, pero realiza la pintura de todos modos.

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" class="center" alt="The pixel pipeline without layout or paint.">

Si modifica una propiedad en la que no se requiere diseño ni pintura, el navegador la omite y continúa con la composición.

Esta versión final es la más económica y la ideal para los puntos de presión alta del ciclo de vida de la aplicación, como las animaciones o el desplazamiento.

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

El rendimiento es el arte de evitar trabajo y de realizar el trabajo lo más eficientemente posible. En muchos casos, se trata de trabajar junto con el navegador, no en su contra. Es importante tener en cuenta que el trabajo que se menciona anteriormente en el proceso difiere en cuanto al costo de cálculos. Algunas tareas son más costosas que otras.

Analicemos las diferentes partes del proceso. Hablaremos sobre los problemas comunes, y cómo diagnosticarlos y solucionarlos.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}

