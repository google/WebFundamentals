project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mejora de la accesibilidad a páginas web


{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2016-06-26 #}

# Accesibilidad {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}
{% include "web/_shared/contributors/robdodson.html" %}


Este juego de documentos es una versión basada en texto de parte del contenido cubierto en el
[Curso de Udacity sobre
Accesibilidad](https://www.udacity.com/course/web-accessibility--ud891){: .external }.
En lugar de ser una transcripción directa del curso den video, sirve como un tratamientos
más conciso de los principios y prácticas de accesibilidad, usando el contenido original
del curso como base.

### TL;DR {: .hide-from-toc }
- Aprende qué significa la accesibilidad y cómo se aplica al desarrollo web.
- Aprende cómo hacer que los sitios web sean accesibles y fáciles de usar para todos.
- Aprende a incluir accesibilidad básica con mínimo impacto de desarrollo.
- Aprende qué funciones de HTML están disponibles y cómo usarlas para mejorar
  la accesibilidad.
- Aprende técnicas avanzadas de accesibilidad para crear experiencias
  de accesibilidad pulidas.


Comprender la accesibilidad, su alcance y su impacto pueden hacer de ti un mejor programador
web. La intención de esta guía es ayudarte a comprender cómo puedes hacer que tus
sitios web sean accesibles y fáciles de usar para todos.

"Accesibilidad" puede ser difícil de deletrear, pero no tiene que ser difícil
de lograr. En esta guía, verás cómo alcanzar sencillos logros para ayudar a
mejorar la accesibilidad con mínimo esfuerzo, cómo puedes usar lo que está incorporado en
HTML para crear interfaces más accesibles y sólidas, y cómo aprovechar algunas
técnicas avanzadas para crear experiencias accesibles pulidas.

También descubrirás que muchas de estas técnicas te ayudarán a crear interfaces
más agradables y fáciles de usar para *todos* los usuarios, no solos aquellos con
discapacidades.

Por supuesto, muchos programadores tienen apenas un conocimiento vago de qué significa
accesibilidad (algo relacionado con contratos gubernamentales, listas de comprobación y lectores
de pantalla, ¿cierto?) y existen muchos conceptos errados dando vueltas.
Por ejemplo, muchos programadores sienten que ocuparse de la accesibilidad los obligará
a escoger entre crear una experiencia agradable y atractiva, y una
tosca y fea, pero accesible.

Eso, por supuesto, no es cierto en todos los casos, así que aclaremos eso antes de avanzar
a otras cosas. ¿Qué queremos decir con "accesibilidad" y qué aprenderemos
aquí?

## ¿Qué es accesibilidad?
A grandes rasgos, cuando decimos que un sitio es accesible, queremos decir que el contenido
del sitio está disponible y, literalmente,
*cualquiera* puede manejar su funcionalidad. Como programadores, es sencillo asumir que todos los usuarios pueden ver y usar un
teclado, mouse o pantalla táctil, y pueden interactuar con el contenido de tu página de la
misma forma que tú. Esto puede llevar a una experiencia que funciona bien para algunas personas,
pero genera problemas que varían desde simples molestias hasta impedimentos para
otras personas.

La accesibilidad, entonces, se refiere a la experiencia de los usuarios que pueden estar fuera del
corto alcance de usuario "típico", que puede acceder o interactuar con cosas
de una manera distinta a la que esperas. Específicamente, involucra a los usuarios que
experimentan algún tipo de discapacidad, teniendo en cuenta que
esta puede ser no física ni temporal.

Por ejemplo, a pesar de que tendemos a concentrar nuestra discusión de accesibilidad en los usuarios
con discapacidades físicas, todos podemos relacionarnos con la experiencia del uso de una
interfaz que no es accesible para nosotros por otros motivos. ¿Alguna vez tuviste un
problema para usar un sitio de escritorio en un teléfono móvil, viste el mensaje "This
content is not available in your area" o no pudiste encontrar un menú conocido
en una tablet? Esos son problemas de accesibilidad.

A medida que aprendas más, descubrirás que la resolución de problemas de accesibilidad en este
sentido más amplio y general mejora la experiencia de usuario para
todos. Veamos un ejemplo:

![un formulario con mala accesibilidad](imgs/pooraccess.jpg)

Este formulario tiene varios problemas de accesibilidad.

 - El texto tiene poco contraste, lo cual dificulta la lectura para usuarios con baja visión.
 - Tener etiquetas a la izquierda y campos a la derecha hace que sea difícil para muchas
   personas asociarlos, y casi imposible para alguien que necesita acercar
   para usar la página; imagina cómo sería mirar esto en un teléfono y tener que
   desplazarte para descubrir qué corresponde a qué.
 - La etiqueta "Remember details?" no está asociada con la casilla de verificación, así que tienes
   que presionar o hacer clic solo en el pequeño cuadrado en lugar de hacer clic en la etiqueta;
   además, alguien que usa lector de pantalla tendría dificultades para descubrir la
   asociación.

Ahora activemos nuestra varita de accesibilidad y veamos el formulario con esos problemas solucionados.
Oscureceremos el texto, modificaremos el diseño para que las etiquetas estén
cerca de lo que etiquetan, y arreglaremos la etiqueta para que esté asociada a
la casilla de verificación, para que puedas activarla o desactivarla haciendo clic en la etiquetas también.

![un formulario con accesibilidad mejorada](imgs/betteraccess.jpg)

¿Cuál preferirías usar? Si respondiste "la versión accesible", estás
encaminado para comprender una premisa principal de esta guía. A menudo, algo que es un
bloqueo total para pocos usuarios también es molesto para muchos otros, por esto,
solucionando el problema de accesibilidad, mejoras la experiencia para todos.

## Pautas de accesibilidad a contenido web

En esta guía, haremos referencia a las [Pautas de accesibilidad a contenido web
(WCAG) 2.0](https://www.w3.org/TR/WCAG20/){: .external }, un conjunto de pautas
y buenas prácticas reunidas por expertos en accesibilidad para tratar qué
significa "accesibilidad" de manera metódica. Varios países indican
el uso de estas pautas en sus requisitos legales de accesibilidad web.

Las WCAG se organizan sobre la base de cuatro principios a menudo llamados con la palabra *POUR*:

 - **Perceptible**: ¿pueden los usuarios percibir el contenido? Esto nos ayuda a tener en cuenta
   que solo porque algo sea perceptible con un sentido, como la vista,
   no significa que todos los usuarios puedan percibirlo.

 - **Manejable**: ¿pueden los usuarios componentes de IU y navegar por el contenido? Por
   ejemplo, alguien que no puede usar mouse o pantalla táctil
   no puede manejar algo que demanda interacción de desplazamiento.

 - **Comprensible**: ¿pueden los usuarios comprender el contenido? ¿Pueden los usuarios comprender
   la interfaz y es esta lo suficientemente consistente como para evitar confusiones?

 - **Sólido**: ¿puede una amplia variedad de usuarios-agentes
   (navegadores) consumir el contenido? ¿Funciona con tecnología asistencial?

A pesar de que las WCAG brindan información general completa de qué significa que el contenido sea
accesible, también pueden resultar abrumadoras. Para ayudar a aliviar esto, el grupo de
[WebAIM](http://webaim.org/){: .external } (Accesibilidad web en mente) ha
condensado las pautas WCAG en una lista de comprobación fácil de seguir, dirigida
específicamente a contenido web.

La [lista de comprobación de WebAIM](http://webaim.org/standards/wcag/checklist){: .external }
puede brindarte un breve resumen de alto nivel de lo que necesitas implementar, mientras
también se vincula a la especificación subyacente de las WCAG si necesitas una definición
ampliada.

Con esta herramienta a mano, puedes trazar una dirección para tu trabajo de accesibilidad
y tener confianza de que, mientras tu proyecto cumpla los criterios detallados, tus
usuarios tienen una experiencia positiva de acceso a tu contenido.

## Comprensión de la diversidad de usuarios

Cuando aprendes sobre accesibilidad, es útil comprender los
diversos rangos de usuarios del mundo y los tipos de temas de accesibilidad que
los afectan. Para explicar mejor, esta es una sesión de pregunta/respuesta informativa
con Victor Tsaran, un director técnico de programas de Google, que es completamente ciego.

<figure class="attempt-right">
  <img src="imgs/victor_tsaran.jpg" alt="Victor Tsaran">	
  <figcaption>Victor Tsaran</figcaption>
</figure>

<hr>

> *¿En qué trabajas en Google?*

Aquí en Google, mi trabajo es ayudar a garantizar que nuestros productos funcionen para todos nuestros
diversos usuarios, sin importar las discapacidades.

> *¿Qué tipos de discapacidades tienen los usuarios?*

Cuando pensamos en los tipos de discapacidades que dificultarían que
alguien acceda a nuestro contenido, muchas personas automáticamente se imaginan a un usuario ciego,
como yo. Es cierto, esta discapacidad puede hacer que sea frustrante o hasta
imposible usar muchos sitios web.

Muchas técnicas web modernas tienen el lamentable efecto secundario de crear
sitios que no funcionan bien con las herramientas que usan los usuarios ciegos para acceder a la
Web. Sin embargo, existe más accesibilidad que esa. Creemos que es
útil pensar en las discapacidades divididas en cuatro grupos: visual, motriz,
auditiva y cognitiva.

> *Analicemos una por una. ¿Puedes presentar ejemplos de discapacidad
 visual?*

La discapacidad visual se puede dividir en algunas categorías: Los usuarios sin visión,
como yo, pueden usar un lector de pantalla, braille o una combinación de ambos.

<figure class="attempt-right">
  <img src="imgs/braille-reader.png" alt="Lector braille">	
  <figcaption>Lector braille</figcaption>
</figure>

No es muy común no tener nada de visión, pero, de todas formas,
es posible que conozcas o hayas conocido a al menos una persona que no pueda ver
nada. Sin embargo, hay muchos más de los llamados usuarios
de baja visión.

Es una gran variedad, desde alguien como mi esposa, que no tiene córneas
 (entonces, a pesar de poder ver cosas, le cuesta leer lo impreso
y se la considera legalmente ciega) hasta alguien que puede tener baja
visión y usa anteojos recetados con mucho aumento.

Existe una enorme variedad y, naturalmente, existe una gran variedad de adaptaciones
que usan las personas de esta categoría: algunos usan lector de pantalla o pantalla
braille (incluso supe de una mujer que lee braille en la pantalla
porque es más fácil de ver que el texto impreso) o pueden usar tecnología
de texto a oralidad sin la funcionalidad total de lector de pantalla, o pueden usar una
lupa de pantalla que hace acercamiento a parte de la pantalla, o pueden usar
el zoom de su navegador para agrandar las letras. También pueden usar
opciones de alto contraste, como modo de alto contraste del sistema operativo, una
extensión de navegador de alto contraste o un tema de alto contraste para un sitio web.

<figure class="attempt-right">
  <img src="imgs/high-contrast.png" alt="Modo de alto contraste">	
  <figcaption>Modo de alto contraste</figcaption>
</figure>

Muchos usuarios incluso usan una combinación, como mi amiga Laura que usa una
combinación de modo de alto contraste, zoom de navegador y tecnología de texto a oralidad.

La baja visión es algo con lo que mucha gente se puede identificar. Para empezar, todos
experimentamos un deterioro de la visión a medida que envejecemos, así que, incluso si no lo has vivido,
hay posibilidad de que hayas escuchado a tus padres quejarse de eso. Pero muchas
personas viven la frustración de sacar la laptop junto a una ventana soleada
para descubrir que, de repente, no ven nada. O alguien que se haya sometido a cirugía
láser o que solo tenga que leer algo desde el otro extremo de la sala puede haber usado
alguna de esas adaptaciones mencionadas. Así que, creo que es bastante sencillo para
los programadores tener empatía por los usuarios de baja visión.

Y no tengo que dejar de mencionar a las personas que tienen baja visión de colores,
¡alrededor del 9% de los hombres tiene alguna forma de deficiencia de visión del color! Además de alrededor del 1% de las
mujeres. Les puede costar distinguir el rojo del verde o el amarillo del azul.
Piensa en eso la próxima vez que diseñes una validación de formulario.

> *¿Qué sucede con las discapacidades motrices?*

Sí, las discapacidades físicas o de funciones motrices. Este grupo va
desde quienes prefieren no usar mouse, porque tal vez sufrieron
LER (lesiones por esfuerzo repetitivo) u otra cosa y les resulta doloroso, hasta alguien que puede tener parálisis física
y tiene rango de movimiento limitado en ciertas partes del cuerpo.

<figure class="attempt-right">
  <img src="imgs/eye-tracking.png" alt="Una persona que usa un dispositivo de rastreo ocular">	
  <figcaption>Un dispositivo de rastreo ocular</figcaption>
</figure>

Los usuarios con discapacidad motriz usan teclado, dispositivo de interrupción, control de voz o hasta
un dispositivo de rastreo ocular para interactuar con su computadora.

Similar a lo que sucede con las discapacidades visuales, las de movilidad también pueden ser un problema
temporal o circunstancial: Tal vez se te lesionó la muñeca de la mano del mouse. Tal vez el panel tácil de tu laptop se
rompió o está inestable. Puede haber
muchas situaciones en las que la movilidad de un usuario se ve dificultada y, asegurándonos de
atenderlo, mejoramos la experiencia general, para todas las personas que tengan una
discapacidad permanente y para quienes descubren que, temporalmente, no pueden
usar una IU basada en cursor.

> *Bien, hablemos de discapacidades auditivas*.

Este grupo puede variar entre las personas totalmente sordas y aquellas con dificultades auditivas. Y,
así como la vista, la audición suele degradarse con la edad. Muchos usamos dispositivos
comunes como audífonos que nos ayudan.

<figure class="attempt-right">
  <img src="imgs/screen-captions.png" alt="Una televisión con subtítulos en la parte inferior">	
  <figcaption>Subtítulos</figcaption>
</figure>

Para usuarios con discapacidad auditiva, tenemos que asegurarnos de no descansar en el
sonido, por eso tenemos que usar subtítulos estilo de video y transcripciones, y
brindar algún tipo de alternativa si el sonido forma parte de la interfaz.

Y, como vimos con las discapacidades visual y motriz, es fácil imaginar
una situación en la que alguien cuyos oídos funcionan bien se beneficiaría de estas
adaptaciones también. Muchos de mis amigos dicen que les encanta que los videos tengan
subtítulos y transcripciones porque eso significa que si están en una oficina abierta
y no tienen sus auriculares, ¡de todas formas pueden ver el video!

> *Bien, ¿puedes hablarnos de discapacidades cognitivas?*

Existe una variedad de afecciones cognitivas como trastorno de déficit de atención y autismo,
que pueden significar que las personas que las padecen quieren o necesitan acceder a las cosas de otra forma. Las
adaptaciones para estos grupos, naturalmente, son muy distintas, pero
definitivamente encontramos que se superponen con otras áreas, como el uso de funcionalidad de zoom para
hacer que la lectura y la concentración sean más sencillas. Además, estos usuarios pueden pensar que los diseños verdaderamente
mínimos funcionan mejor porque minimizan las distracciones y la carga cognitiva.

Creo que todas las personas se pueden relacionar con el estrés de la sobrecarga cognitiva, por eso es
obvio que si creamos algo que funcione bien para una persona con discapacidad
cognitiva, estaremos creando algo que será una experiencia
agradable para todos.

> *Entonces, ¿cómo resumirías lo que piensas de la accesibilidad?*

Cuando observas la amplia variedad de capacidades y discapacidades que las personas
pueden tener, puedes ver que el diseño y la compilación de productos solo para personas que
tienen visión, audición, movimiento y cognición perfectos resultan muy acotados.
Es casi contraproducente, porque estamos creando una experiencia
menos utilizable y más estresante para todos, y para algunos usuarios estamos creando una experiencia que
los excluye por completo.

<hr>

En esta entrevista, Victor identificó una variedad de discapacidades y las ubicó
en cuatro amplias categorías: *visual*, *motriz*, *auditiva* y *cognitiva*. También
señaló que cada tipo de discapacidad puede ser *circunstancial*,
*temporal* o *permanente*.

Veamos algunos ejemplos reales de discapacidades de acceso y veamos
en cuál de esas categorías entran. Observa que algunas discapacidades
pueden entrar en más de una categoría.

<table>
  <tr>
    <th></th>
    <th>Circunstancial</th>
    <th>Temporal</th>
    <th>Permanente</th>
  </tr>
  <tr>
    <th>Visual</th>
    <td></td>
    <td>traumatismo de cráneo</td>
    <td>ceguera</td>
  </tr>
  <tr>
    <th>Motriz</th>
    <td>carga un bebé</td>
    <td>brazo lesionado, LER*</td>
    <td>LER*</td>
  </tr>
  <tr>
    <th>Auditiva</th>
    <td>oficina ruidosa</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <th>Cognitiva</th>
    <td></td>
    <td>traumatismo de cráneo</td>
    <td></td>
  </tr>
</table>

*Lesiones por esfuerzo repetitivo: p. ej., síndrome de túnel carpiano, codo de tenista, dedo
martillo

## Próximos pasos

¡Ya hemos cubierto bastante terreno! Has leído

 - qué es la accesibilidad y por qué es importante para todos;
 - las WCAG y la lista de comprobación de accesibilidad de la WebAIM;
 - distintos tipos de discapacidades que deberías tener en cuenta.

En el resto de la guía, nos sumergiremos en los aspectos prácticos de la creación de
sitios web accesibles. Organizaremos este esfuerzo alrededor de tres áreas
temáticas principales:

 - [**Foco**](/web/fundamentals/accessibility/focus): veremos cómo
   crear cosas que se puedan manejar con teclado en lugar de mouse. Esto es
   importante para los usuarios con discapacidades motrices, por supuesto, pero también garantiza
   que tu IU estará en buena forma para todos los usuarios.

 - [**Semántica**](/web/fundamentals/accessibility/semantics-builtin): Nos
   aseguraremos de expresar nuestra interfaz de usuario de una forma sólida que funcione con
   una variedad de tecnologías asistenciales.

 - [**Estilos**](/web/fundamentals/accessibility/accessible-styles): Analizaremos el diseño
   visual y evaluaremos algunas técnicas para hacer que los elementos visuales de la
   interfaz sean lo más flexibles y utilizables posible.

Cada uno de esos temas podría ocupar un curso entero, así que, no cubriremos todos los aspectos
de la creación de sitios web accesibles. Sin embargo, te brindaremos información suficiente para
comenzar y te dirigiremos a algunos buenos lugares donde puedes aprender más sobre
cada tema.



{# wf_devsite_translation #}
