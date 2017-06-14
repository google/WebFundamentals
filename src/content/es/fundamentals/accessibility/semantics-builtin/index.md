project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introducción a Semantics y la tecnología asistencial


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Introducción a Semantics {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Ya sabes cómo hacer que el sitio sea accesible para los usuarios que no pueden usar mouse o
dispositivo apuntador (debido a una discapacidad física, un problema de tecnología
o preferencia personal) generando uso solo de teclado. A pesar de que se
requiere cuidado y atención, no es una cantidad enorme de trabajo si lo planeas
desde el principio. Una vez que está hecho ese trabajo básico, ya estás adelantado en la
ruta de acceso a un sitio totalmente accesible y más pulido.

En esta lección, nos basaremos en ese trabajo y te haremos pensar en otros
factores de accesibilidad, como en cómo crear sitios web compatibles con [usuarios como
Victor Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity),
que no ve la pantalla.

En primer lugar, recibiremos información básica sobre la *tecnología asistencial*, el término general para
herramientas como lectores de pantalla que les ayudan a los usuarios con discapacidades que pueden evitar que
accedan a información.

A continuación, observaremos algunos conceptos de experiencia del usuario y nos basaremos en ellos para
adentrarnos más en la experiencia de los usuarios de tecnología asistencial.

Finalmente, veremos cómo usar HTML de forma efectiva para crear una buena experiencia para
estos usuarios, y cómo se superpone un poco con la forma en que tratamos el foco
anteriormente.

## Tecnología asistencial

La *tecnología asistencial* es un término amplio para dispositivos, software y herramientas que
ayudan a cualquier persona con discapacidad a completar una tarea. En el sentido más amplio, esto
podría ser algo poco tecnológico, como una muleta para caminar o una lupa para
leer, o algo tecnológico, como un brazo robótico o software de reconocimiento de imagen
en un smartphone.

![ejemplos de tecnología asistencial que incluyen muleta, lupa y prótesis
robóticas](imgs/assistive-tech1.png)

La tecnología asistencial puede incluir algo general como el zoom del navegador, o algo
específico como un controlador de juego diseñado a medida. Puede ser un dispositivo físico
separado como una pantalla braille o se puede implementar en software como el
control de voz. Puede estar incorporado en el sistema operativo como algunos lectores
de pantalla o puede ser un complemento como una extensión de Chrome.

![más ejemplos de tecnología asistencial que incluyen zoom de navegador, pantalla braille y
control de voz](imgs/assistive-tech2.png)

La diferencia entre la tecnología asistencial y la tecnología en general no está bien definida. Después
de todo, toda la tecnología sirve para ayudar a la gente con alguna tarea. Y
las tecnologías a menudo pueden entrar y salir de la categoría "asistenciales".

Por ejemplo, uno de los primeros productos de síntesis de discurso comerciales fue una calculadora
parlante para los ciegos. Ahora, la síntesis de discurso está en todas partes,
desde indicaciones de manejo hasta asistentes virtuales. Por el contrario, la tecnología que era
originalmente para fines generales a menudo encuentra un uso asistencial. Por ejemplo, las personas
con baja visión pueden usar el zoom de la cámara de su smartphone para ver mejor
algo que es pequeño en el mundo real.

En el contexto del desarrollo web, tenemos que tener en cuenta una variedad diversa de
tecnologías. Las personas pueden interactuar con tu sitio web usando un lector de pantalla o
pantalla braille, con una lupa de pantalla, a través de control de voz, usando un dispositivo
de interrupción o con otra forma de tecnología asistencial que se adapte a la interfaz predeterminada
de la página para crear una interfaz más específica que puedan usar.

Muchas de estas tecnologías asistenciales confían en que *la semántica expresada
programáticamente* creará una experiencia del usuario accesible, y de eso se trata la mayor parte de esta
lección. Pero, antes de poder explicar programáticamente la semántica expresada,
tenemos que hablar un poco de *dispositivos*.

## Affordances

Cuando usamos una herramienta o dispositivo fabricados por el hombre, solemos mirar su forma y diseño
para tener una idea de qué hace y cómo funciona. Un dispositivo *affordance* es cualquier
objeto que le ofrezca a su usuario la posibilidad de realizar una acción.
Mientras mejor esté diseñado el affordance, más obvio o intuitivo será su uso.

Un ejemplo clásico es una pava o una tetera. Puedes darte cuenta fácilmente de que
tienes que tomarla de la asa, no del pico, incluso si nunca antes has visto una
tetera.

![una tetera con asa y pico](imgs/teapot.png)

Eso es porque el affordance es similar a los que has visto en muchos otros
objetos: regaderas, jarras, taza de café y más. Probablemente
*podrías* tomar el recipiente del pico, pero tu experiencia con affordances
similares te indica que la asa es la mejor opción.

En interfaces gráficas de usuario, los affordances representan acciones que podemos realizar, pero
pueden ser ambiguos porque no hay objeto físico con el que interactuar. Los affordances
GUI están diseñados específicamente para ser ambiguos: los botones, casillas
de verificación y barras de desplazamiento sirven para transmitir su uso con el menor entrenamiento
posible.

Por ejemplo, puedes parafrasear el uso de algunos elementos de forma común
(affordances) así:

 - Botones de selección: "Puedo elegir una de estas opciones".
 - Casilla de verificación: "Puede elegir “sí” o “no” para esta opción".
 - Campo de texto: "Puedo escribir algo en esta área".
 - Menú desplegable: "Puedo abrir este elemento para ver mis opciones".

Puedes sacar conclusiones acerca de estos elementos *solo porque puedes
verlos*. Naturalmente, alguien que no ve las pistas visuales que brinda un elemento
no puede comprender su significado ni captar en forma intuitiva el valor del affordance.
Así que tenemos que asegurarnos de que la información se exprese en forma lo suficientemente flexible como para que pueda acceder
a ella la tecnología asistencial que pueda construir una interfaz alternativa que
se adapte a las necesidades de su usuario.

Esta exposición no visual del uso de un affordance se llama *semantics*.

## Lectores de pantalla

Un popular tipo de tecnología asistencial es el *lector de pantalla*, un programa que
les permite a las personas con discapacidad visual usar computadoras leyendo el texto de la pantalla en voz alta
con una voz generada. El usuario puede controlar lo que está listo moviendo el cursor a
un área relevante con el teclado.

Le pedimos a [Victor
Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity)
que explique por qué, en su condición de persona ciega, accede a la Web por medio del lector de pantalla
incorporado de OS X, llamado VoiceOver. Mira [este
video](https://www.youtube.com/watch?v=QW_dUs9D1oQ) de Victor usando VoiceOver.

Ahora, te toca intentar usar un lector de pantalla. Esta es una página con *ChromeVox
Lite*, un lector de pantalla mínimo pero que funciona, escrito en JavaScript. La pantalla
se ve borrosa a propósito, para simular una experiencia de baja visión y obligar al usuario
a completar la tarea con un lector de pantalla. Por supuesto, tendrás que usar el
navegador Chrome para este ejercicio.

[Página de demostración de ChromeVox lite](http://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/)

Puedes usar el panel de control que se encuentra en la parte inferior de la página para controlar el lector
de pantalla. Este lector de pantalla tiene funcionalidad mínima, pero puedes explorar
el contenido usando los botones `Previous` y `Next`, y puedes hacer clic en las cosas
usando el botón `Click`.

Intenta usar esta página con ChromeVox lite habilitado para conocer el uso del
lector de pantalla. Piensa en que un lector de pantalla (u otras tecnología asistencial)
realmente crea una experiencia del usuario alternativa completa para el usuario sobre la base de
semantics expresado programáticamente. En lugar de una interfaz visual, el lector
de pantalla brinda una interfaz sonora.

Observa cómo el lector de pantalla te brinda un poco de información sobre cada elemento
de la interfaz. Un lector bien diseñado debería decirte toda o al menos
la mayor parte de la siguiente información sobre los elementos que encuentra.

 - El *rol* o tipo de elemento, si se especifica (debería).
 - El *nombre* del elemento, si lo tiene (debería).
 - El *valor* del elemento, si lo tiene (puede o no tenerlo).
 - El *estado* del elemento, p. ej., si está habilitado o inhabilitado (si
   corresponde).

El lector de pantalla puede construir esta IU alternativa porque los elementos
nativos contienen metadatos de accesibilidad incorporados. Así como el motor de representación
usa el código nativo para construir una interfaz visual, el lector de pantalla usa los
metadatos de los nodos del DOM para construir una versión accesible, algo
así.

![un lector de pantalla usa el DOM para crear nodos
accesibles](imgs/nativecodetoacc.png)


{# wf_devsite_translation #}
