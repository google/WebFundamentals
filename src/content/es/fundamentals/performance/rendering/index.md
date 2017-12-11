project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los usuarios notan si los sitios y las apps no se ejecutan correctamente, por eso es fundamental optimizar el rendimiento de la representación.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Rendimiento de la representación {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Los usuarios que utilizan la web actual
[esperan que las páginas que visitan sean interactivas y funcionen correctamente](https://paul.kinlan.me/what-news-readers-want/)
, y es justo allí donde debe concentrar más su tiempo y esfuerzo. Las páginas
no solo deben cargarse rápidamente, sino que también deben funcionar bien; el desplazamiento debe ser
tan rápido como el movimiento de los dedos, y las animaciones y las interacciones deben ejecutarse suavemente.

Para escribir sitios y aplicaciones de alto rendimiento, debe comprender de qué modo el navegador utiliza HTML, JavaScript y CSS, y asegurarse de que el código que escriba (y el otro código de terceros que incluya) se ejecute lo más eficientemente posible.

## 60 fps y frecuencias de actualización de los dispositivos

<div class="attempt-right">
  <figure>
    <img src="images/intro/response.jpg" alt="Interacción del usuario con un sitio web.">
  </figure>
</div>

En la actualidad, la mayoría de los dispositivos actualizan sus pantallas **60 veces por segundo**. Si se está
ejecutando una animación o una transición, o si el usuario está desplazando las páginas, el
navegador debe cronometrar la frecuencia de actualización del dispositivo y colocar una nueva imagen o
marco para cada una de estas actualizaciones de pantalla.


Cada uno de estos marcos cuenta con un plazo de un poco más de 16 ms (1 segundo/60 = 16,66 ms (1 segundo/60 = 16,66 ms).
En realidad, sin embargo, el navegador debe realizar trabajo de verificación, así que debes completar todo tu
trabajo dentro de **10 ms**. Si no cumples con este
plazo, la frecuencia del marco disminuye, y el contenido se sacude en la pantalla. Esto generalmente se
conoce como **bloqueo** y tiene un impacto negativo en la experiencia del usuario.

## Canalización de píxeles

Existen cinco áreas principales que debes conocer y tener en cuenta cuando
trabajas. Estas son áreas sobre las que tienes un gran nivel de control, y los puntos clave de la
canalización de píxeles hacia la pantalla:

<img src="images/intro/frame-full.jpg"  alt="Canalización de píxeles completa">

* **JavaScript**: comúnmente, JavaScript se usa para realizar el trabajo que genera cambios visuales, ya sea una función `animate` de jQuery, la clasificación de un conjunto de datos o la adición de elementos del DOM a la página. Sin embargo, no solo JavaScript puede desencadenar un cambio visual: las animaciones de las CSS, las transiciones y la Web Animations API también se usan con frecuencia.
* **Cálculos de estilo**: Este proceso consiste en descifrar cómo se aplican las reglas de las CSS a determinados elementos según los selectores de coincidencias, por ejemplo, `.headline` o `.nav > .nav__item`. A partir de allí, una vez que se conocen las reglas, se aplican y se calculan los estilos finales para cada elemento.
* **Diseño**. Una vez que el navegador conoce las reglas que debe aplicar a un elemento, puede comenzar a calcular el espacio necesario y dónde se encuentra ese espacio en la pantalla. El modelo de diseño de la Web implica que un elemento puede afectar a otros, por ejemplo, el ancho del elemento `<body>` normalmente afecta el ancho de sus campos secundarios, y así sucesivamente, hacia arriba y hacia abajo en el árbol, así que el proceso puede estar muy involucrado con el navegador.
* **Pintura**. La pintura es el proceso de rellenar los píxeles. Esto implica dibujar texto, colores, imágenes, bordes y sombras; básicamente todas las partes visuales de los elementos. Por lo general, el dibujo se realiza en múltiples superficies, que se conocen como capas.
* **Composición**. debido a que las partes de la página se dibujan posiblemente en varias capas, se deben dibujar en la pantalla en el orden correcto para que la página las represente correctamente. Esto tiene particular importancia para los elementos que se superponen, ya que un error podría hacer que un elemento aparezca sobre otro de forma incorrecta.

Cada una de estas partes del proceso representa una oportunidad para introducir un bloqueo; por ello, es importante conocer exactamente las partes de la canalización que tu código activa.

En algunos casos, tal vez escuches el término "rasterizar", que se utiliza junto con el término pintura.
Eso sucede porque la pintura se trata de dos tareas: 1) la creación de una lista de
llamadas de dibujo y 2) el relleno de los píxeles.

La última tarea se llama “rasterización”; por ello, cada vez que veas registros de pintura en
DevTools, debes tener en cuenta que incluyen rasterización. (En algunas
arquitecturas, la creación de la lista de llamadas de dibujo y la rasterización se llevan a cabo en
diferentes cadenas, pero el programador no tiene control sobre esto).

No necesariamente tocará todas las partes de la canalización en todos los marcos.
De hecho, en el proceso _normalmente_ se ejecuta un determinado marco de tres maneras
diferentes cuando se realiza un cambio visual, ya sea mediante JavaScript, CSS o Web
Animations:

### 1. JS/CSS > Estilo > Diseño > Pintura > Composición

<img src="images/intro/frame-full.jpg"  alt="Canalización de píxeles completa">

Si modificas una propiedad de “diseño”, dicha propiedad modifica la geometría
de un elemento (como su ancho, su altura o su posición a la izquierda o en la parte superior), y el navegador
deberá verificar todos los otros elementos y “redistribuir” la página. Las áreas
afectadas se deberán volver a pintar, y los elementos pintados finales se deberán volver a
componer en conjunto.

### 2. JS/CSS > Estilo > Pintura > Composición

<img src="images/intro/frame-no-layout.jpg" alt="Canalización de píxeles sin diseño.">

Si cambiaste una propiedad de "solo pintura", como una imagen de fondo, color de texto o
sombras (es decir, una que no afecta el diseño de la página) el navegador
omite el diseño, pero realiza la pintura de todos modos.

### 3. JS/CSS > Estilo > Composición

<img src="images/intro/frame-no-layout-paint.jpg" alt="Canalización de píxeles sin diseño ni pintura.">

Si modificas una propiedad en la que no se requiere diseño ni pintura, el
navegador la omite y continúa con la composición.

Esta versión final es la más económica y la ideal para los puntos de presión alta
del ciclo de vida de la app, como las animaciones o el desplazamiento.

Note: Si deseas saber cuál de las tres versiones anteriores que cambia cualquier propiedad determinada de las CSS se desencadenará, visita [Desencadenadores de CSS](https://csstriggers.com). Y si deseas aprender rápidamente a realizar animaciones de alto rendimiento, lee la sección sobre [cómo cambiar las propiedades exclusivas del compositor](stick-to-compositor-only-properties-and-manage-layer-count).

El rendimiento es el arte de evitar trabajo y de realizar el trabajo lo más
eficientemente posible. En muchos casos, se trata de trabajar junto con el navegador y no
contra él. Es importante tener en cuenta que el trabajo que se menciona anteriormente en la
canalización es diferente en cuanto a la exigencia de cálculo. Algunas tareas son más pesadas
que otras.

Analicemos las diferentes partes de la canalización. Hablaremos sobre
los problemas comunes, su diagnóstico y su solución.

{% include "web/_shared/udacity/ud860.html" %}


{# wf_devsite_translation #}
