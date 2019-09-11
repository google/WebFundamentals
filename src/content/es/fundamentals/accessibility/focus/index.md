project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Información general sobre el foco de la pantalla en accesibilidad


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Introducción al foco {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



En esta lección, hablaremos sobre el *foco* y cómo puedes controlarlo en tu
app. El foco se refiere a qué control en la pantalla (un elemento de entrada, como
un campo, una casilla de verificación, botón o un vínculo) recibe actualmente la entrada desde el teclado,
y desde el portapapeles si pegas contenido.

Este es un excelente punto de partida para aprender sobre la accesibilidad, porque todos sabemos
cómo usar un teclado, es fácil sentirse identificado y probarlo, y beneficia
prácticamente a todos los usuarios.

Es posible que los usuarios con discapacidades motrices, que pueden variar desde una parálisis permanente
hasta un esguince de muñeca, dependan de un teclado o dispositivo con interruptor para navegar por
tu sitio. Por lo tanto, es crucial contar con una buena estrategia de foco para brindarles una experiencia positiva.


Además, para los usuarios avanzados que conocen todas las combinaciones de teclas de sus máquinas, y pueden
navegar rápidamente por tu sitio únicamente con el teclado, esto mejorará
su productividad.

Por lo tanto, una estrategia de foco bien implementada te asegura que todos los que usen tu
app tengan una mejor experiencia. En lecciones siguientes, veremos que el
esfuerzo que pones en el foco es una base importante para ayudar a los usuarios que utilizan tecnología
de asistencia y, de hecho, a todos los usuarios.

## ¿Qué es el foco?

El foco determina en qué parte de la página tienen lugar los eventos del teclado en un momento determinado. Por
ejemplo, si pones el foco en un campo de entrada de texto y comienzas a escribir, el campo de entrada
recibe los eventos del teclado y muestra los caracteres que escribes. Mientras tenga
el foco, también recibirá entradas pegadas desde el portapapeles.

![foco del teclado en un campo de texto](imgs/keyboard-focus.png)

En general, el elemento que tiene actualmente el foco se indica con un *anillo de foco*, cuyo estilo
depende del navegador y de cualquier ajuste de estilo que el autor de la página
aplique. Chrome, por ejemplo, destaca los elementos que tienen el foco con un borde
azul, mientras que Firefox usa un borde con línea punteada.

![botón para registrarse](imgs/sign-up.png)

Algunos usuarios manejan su computadora casi por completo con el teclado o algún otro dispositivo
de entrada. Para esos usuarios, el foco es crucial porque es el recurso principal para
acceder a todo lo que se encuentra en pantalla. Es por esto que la lista de comprobación de la Web AIM indica
en la sección 2.1.1 que [se debe permitir el acceso a todas las funcionalidades de la página por medio de
un teclado](http://webaim.org/standards/wcag/checklist#sc2.1.1){: .external },
a menos que sea algo que no se pueda hacer con un teclado, como dibujar a mano.

Cómo usuario, puedes controlar qué elemento tiene actualmente el foco usando `Tab`,
`Shift+Tab`, o las teclas de dirección. En Mac OSX, esto funciona de manera diferente:
mientras que Chrome siempre te permite la navegación con `Tab`, necesitas presionar `Option+Tab`
para cambiar el foco en otros navegadores como Safari. (Puedes cambiar esta configuración en
la sección Keyboard dentro de System Preferences).

![diálogo de ajustes de teclado](imgs/system-prefs2.png)

El orden en el cual el foco avanza o retrocede entre los elementos
interactivos al presionar `Tab` se llama, como podía esperarse, *orden de tabulación*. Debes asegurarte
de que el diseño de tu página siga un orden de tabulación lógico. Este es un paso importante del que
hablaremos más adelante.

## ¿Qué significa que puede enfocarse?

Los elementos HTML interactivos e incorporados, como campos de textos, botones y listas de selección
*pueden enfocarse de manera implícita*, lo que significa que se insertan automáticamente en el orden
de tabulación y tienen manejo de eventos de teclado incorporado sin la intervención del programador.

![campos que pueden enfocarse de manera implícita](imgs/implicitly-focused.png)

Sin embargo, no todos los elementos pueden enfocarse; los párrafos, divs y otros elementos
de páginas no pueden tener el foco cuando navegas con tabulación por la página, y así está diseñado.
En general, no hay necesidad de enfocar algo con lo que el usuario no puede interactuar.

![no todos los elementos pueden enfocarse](imgs/not-all-elements.png)

## Experiencias con el foco

Probemos algunas de las técnicas de foco de las que hablamos anteriormente. En Chrome, dirígete a
este [sitio
maqueta de una aerolínea](http://udacity.github.io/ud891/lesson2-focus/01-basic-form/){: .external }
y busca un pasaje en particular **usando únicamente el teclado como método de entrada**. La página no
acepta la entrada del mouse, por lo que no puedes hacer trampas (no es que no confiemos en ti
;-).

![sitio maqueta de una aerolínea](imgs/airlinesite2.png)

Debes especificar los siguientes parámetros para el pasaje:

 - solo ida (one way)
 - a Melbourne
 - con salida el 12 de octubre de 2017 (10/12/2017)
 - con regreso el 23 de octubre de 2017 (10/23/2017)
 - asiento de ventana (window seat)
 - no quiero recibir ofertas (Receive promotional offers?)

Cuando completes el formulario correctamente sin errores de entrada y puedas accionar el
botón Search para buscar, el formulario simplemente se borrará y volverá al estado inicial. Ve a completar el
formulario y luego regresa.

Examinemos cómo el formulario usa la entrada de tu teclado. Las primeras veces que
presionas `Tab`, el navegador destaca los elementos de navegación para Flights,
Hotels, y Rental Cars. Cuando sigues presionando `Tab`, pasas al
grupo de botones de radio donde puedes elegir entre Round Trip, One Way, o Multi City
usando las teclas de dirección.

Avanza a los campos de nombre y dirección (Full Name y Enter your address) y llena los datos
necesarios. Cuando llegues a la sección para seleccionar destino (Departure y Arrival), puedes usar las
teclas de dirección para elegir una ciudad, o puedes comenzar a escribir para que el campo se autocomplete.
Del mismo modo, en los campos para la fecha (Depart Date y Return Date), puedes usar las teclas de dirección o simplemente escribir una fecha.

Para la elección del asiento (Preferred seat type) también se necesitan las teclas de dirección, o puedes escribir "w", "a"
o "n" para ir a cada opción. Luego puedes desmarcar la casilla predeterminada para recibir ofertas
presionando la barra espaciadora cuando la casilla de verificación tiene el foco. Por último, coloca el foco en
el botón Search y presiona `Enter` para enviar el formulario.

Resulta muy práctico interactuar con un formulario usando únicamente el teclado, sin la necesidad
de cambiar constantemente al mouse para completar una tarea. Ya que todos los elementos
que se usan en el formulario con etiquetas HTML nativas con foco implícito, el formulario funciona correctamente
con el teclado, y no tienes que escribir ningún código para agregar o controlar el comportamiento
del foco.



{# wf_devsite_translation #}
