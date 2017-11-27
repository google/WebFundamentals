project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Una guía paso a paso sobre los aspectos básicos del diseño de la experiencia del usuario.

{# wf_updated_on: 2016-10-01 #}
{# wf_published_on: 2016-10-01 #}

# Aspectos básicos de la experiencia del usuario {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

En este artículo, se presenta un flujo de trabajo que permite que los equipos, los creadores de productos, las startups y
las empresas creen un proceso sólido y significativo para desarrollar una mejor experiencia del
usuario para los clientes. Puedes usar las diferentes partes del proceso
por separado, pero idealmente funcionan mejor como una serie de pasos.

El contenido de esta guía se basa en gran medida en la metodología de sprint de diseño que utilizan diferentes
equipos de Google para solucionar y resolver desafíos, como por ejemplo, el
[vehículo automático](https://www.google.com/selfdrivingcar/ "Self Driving Car"){:target="_blank" .external}
y el [Proyecto Loon](https://www.solveforx.com/loon/ "Project Loon"){:target="_blank" .external}.

### Diamante doble

Este flujo de trabajo se basa en lo que, en los círculos de experiencia del usuario, denominamos diamante doble, concepto que popularizó
el [Consejo de Diseño Británico](https://www.designcouncil.org.uk/ "British Design Council"){:target="_blank" .external}.
Según este concepto, el equipo diverge para comprender una idea por medio de la investigación y, luego,
converge para definir el desafío y diverge para bosquejarlo de manera individual. Luego, comparte las
ideas, decide cuál es la mejor manera de avanzar y realiza pruebas y validaciones.

<figure>
  <img src="images/double-diamond.png" alt="Entre las fases de un proyecto, se encuentran las siguientes: comprender, definir, divergir, decidir, crear un prototipo y validar.">
  <figcaption>En el modelo de proceso de diseño de “diamante doble” presentado por el Consejo de Diseño Británico, los pasos incluyen estas fases de un proyecto: <em>comprender</em>, <em>definir</em>, <em>divergir</em>, <em>decidir</em>, <em>crear un prototipo</em> y <em>validar</em>.</figcaption>
</figure>

## Preparar el camino

En primer lugar, se debe comenzar con el desafío subyacente en cuestión y redactarlo a modo de
propuesta. Debes preguntarte: “¿Cuál es el problema que estoy intentando
resolver?”.  La declaración del desafío es el resumen del proyecto
e incluye el objetivo.

Este desafío puede estar relacionado con una función de un producto existente que necesita mejorarse
o con un producto completamente nuevo. Cualquiera sea tu tarea, simplemente ajusta
el léxico para que coincida con el objetivo que intentas alcanzar. La declaración debe estar
relacionada con los objetivos de tu equipo, concentrarse en el público y ser inspiradora y concisa.

A continuación, se presentan algunos ejemplos de productos de la vida real con los que he trabajado
antes:

* diseñar un sistema para administrar el tratamiento y la atención de seguimiento de pacientes con
  pie equinovaro;

* crear una app que simplifique los sistemas financieros complejos y reduzca su complejidad
  a los aspectos imprescindibles;

* diseñar una app para dispositivos móviles coherente que funcione en distintas plataformas sin sacrificar
  la marca.

### Actualización de la declaración del desafío

Una vez que hayas redactado varias opciones del objetivo, preséntalo ante tu equipo para
alcanzar un consenso. Puedes incluir una fecha límite para que el equipo
se concentre en el problema. Con los conceptos agregados, la lista anterior podría
mejorarse de la siguiente manera:

* diseñar un sistema para administrar el tratamiento y la atención de seguimiento de niños
  menores de 2 años con pie equinovaro para su lanzamiento en el primer trimestre de este año;
* crear una app financiera simple que te permita comprar y vender acciones con solo tocar
  un botón sin conocimiento previo del mundo financiero, para su lanzamiento inicial en
  julio de 2017;
* producir una guía de diseño que sea flexible para diferentes plataformas y posicione
  la marca de la empresa de manera eficaz en cada plataforma hacia finales del año.

Cuando la declaración del desafío esté lista, colócala en un lugar prominente
de manera que puedas verla mientras trabajas. Deberás consultarla
constantemente y, tal vez, incluso actualizarla o modificarla durante el proyecto.

## Validación del problema

El próximo paso es investigar el desafío y aprender sobre el problema. Debes
descubrir si la comprensión del problema por parte de tu equipo es válida.
Muy a menudo, analizamos los problemas desde nuestro propio punto de vista, lo cual es peligroso,
ya que la mayoría de nosotros somos en realidad usuarios avanzados de tecnología y, de hecho, representamos una minoría de
usuarios. Somos una voz minoritaria y podemos pensar que algo
es un problema cuando, en realidad, no lo es.

Existen varios métodos para recopilar datos a fin de validar el desafío. Cada uno
depende de tu equipo y de si cuentas con acceso a los usuarios. El objetivo es
comprender mejor el problema en cuestión.

### Entrevistas internas con las partes interesadas

<figure>
  <img src="images/stakeholder-interviews.jpg" class="attempt-right" alt="Las entrevistas con las partes interesadas pueden tener un carácter informativo a fin de descubrir las percepciones dentro de una empresa o un equipo.">
  <figcaption>Las entrevistas con las partes interesadas pueden tener un carácter informativo a fin de descubrir las percepciones dentro de una empresa o un equipo.</figcaption>
</figure>

El proceso de entrevistas incluye entrevistar a cada miembro del equipo y parte interesada
de la empresa, desde el área de marketing hasta el área de cuentas. De esta forma, podrás conocer la opinión de estas personas
acerca de cuáles son los desafíos reales y cuáles podrían ser las posibles soluciones.
Cuando hablo de soluciones, no me refiero a soluciones técnicas, sino a
cuál sería el escenario de mejor caso y el objetivo final para la empresa o el producto.
Por ejemplo, teniendo en cuenta los desafíos anteriores, “tener un software para administración de casos de pie equinovaro en el 80% de las
instalaciones médicas hacia finales del año” sería un excelente objetivo para cumplir.

Hay una advertencia. Este método de validación es el menos favorecido ya que
impide el análisis y la colaboración entre los miembros del equipo, lo que posiblemente cree una atmósfera
aislada en una organización. Sin embargo, puede proporcionar cierta información valiosa
sobre los clientes y el desafío de diseño que, de otra manera, podrías no conocer.

### Charlas breves

<figure>
  <img src="images/lightning-talks.jpg" alt="Se trata de una presentación muy breve que dura solo unos pocos minutos.">
  <figcaption>Se trata de una presentación muy breve que dura solo unos pocos minutos.</figcaption>
</figure>

Esto es similar a las entrevistas internas, pero en este caso reúnes a todas las
partes interesadas en una misma habitación. Luego, eliges a cinco o seis de esas partes interesadas
(marketing, ventas, diseño, cuentas, investigación, etc.) para que den una charla. Cada presentación
se debe centrar en el desafío desde la perspectiva de dichas personas durante un período máximo de 10 minutos.
Los temas que deben analizar en las presentaciones son los siguientes:

* objetivos de la empresa;
* desafíos del proyecto desde su punto de vista (pueden ser aspectos técnicos,
  investigación, creación de diseños, etc.);
* investigación sobre el usuario que estés realizando actualmente.

Deja 5 minutos al final para preguntas y selecciona a una persona para que tome notas
durante esta etapa. Una vez que hayas terminado, deberías actualizar el desafío para reflejar los
nuevos aprendizajes. El objetivo es recolectar una lista de acciones que puedan impulsar una
función o un flujo que te ayude a lograr tu objetivo con respecto a los productos.

### Entrevistas con los usuarios
<figure>
  <img src="images/user-interviews.jpg" class="attempt-right" alt="Las entrevistas con los usuarios representan una excelente forma de conocer los puntos débiles de una persona en una tarea determinada.">
  <figcaption>Las entrevistas con los usuarios representan una excelente forma de conocer los puntos débiles de una persona en una tarea determinada.</figcaption>
</figure>

Tal vez sea la mejor forma de conocer acerca del camino, los puntos débiles
y el flujo del usuario. Programa al menos cinco entrevistas de este tipo; puedes llevar a cabo más
entrevistas si tienes la posibilidad. Entre los tipos de preguntas que debes hacerles, se incluyen las siguientes:

- ¿Cómo realizan una tarea existente? Por ejemplo, supongamos que debes resolver el
  desafío de la app financiera anterior. En ese caso, podrías preguntarles: “¿Cómo compras acciones
  en la actualidad?”.
- ¿Qué aspectos de este flujo les gustan?
- ¿Qué aspectos de este flujo no les gustan?
- ¿Qué productos similares usa actualmente el usuario?
    *  ¿Qué les gusta?
    *  ¿Qué no les gusta?
- Si tuvieran una varita mágica y pudieran cambiar un aspecto de este proceso, ¿cuál
  sería?

La idea de la entrevista es que el usuario hable acerca de los desafíos que
enfrenta. No se trata de un momento de análisis en el que puedas participar; por lo tanto, debes hablar
lo menos posible. Esto sucede incluso cuando un usuario deja de hablar. Siempre espera un
momento, ya que podría estar recogiendo ideas. Te sorprenderías al ver cuánto
habla una persona luego de haber detenido el discurso durante algunos segundos.

Toma notas durante la entrevista y, si es posible, graba la conversación para poder
capturar cualquier información que no hayas retenido. El objetivo es comparar el desafío con
las ideas que recopiles en la entrevista con el usuario. ¿Se alinean? ¿Obtuviste algún dato que
te permita actualizar la declaración de tu desafío?

### Investigación etnográfica de campo

<figure>
  <img src="images/field-interviews.jpg" class="attempt-right" alt="Ver a los usuarios en su entorno natural es una excelente forma de comprender cómo resuelven sus propios desafíos.">
  <figcaption>Ver a los usuarios en su entorno natural es una excelente forma de comprender cómo resuelven sus propios desafíos.</figcaption>
</figure>

Se trata de observar al usuario en el campo, en un contexto, mientras realiza
alguna tarea, como hacer las compras, ir a trabajar,
enviar mensajes de SMS, etc. El motivo es que, en algunos casos, las personas te dirán
lo que creen que deseas escuchar. Pero, si observas a los usuarios mientras realizan acciones y
tareas por sí solos, puedes obtener datos reveladores. Básicamente, se trata de observar sin
interferir, tomando nota de aquellos aspectos que les resultan simples o difíciles y de aquellos
aspectos que no tuvieron en cuenta. El objetivo es sumergirte en el entorno del usuario para
comprender mejor los puntos débiles que enfrenta.

Por lo general, esta técnica incluye llevar a cabo determinadas tareas durante un período más prolongado y
exige la participación de un investigador para que guíe esta parte del proyecto. Sin embargo, es quizás la técnica
más relevadora, ya que te permite estudiar a un grupo de personas en
su entorno natural.

### Recopilación de información

Una vez que hayas completado la fase de aprendizaje de tu proyecto, debes analizar
tu desafío una última vez. ¿Estás bien encaminado? ¿Hay algo que
debas ajustar? Anota toda la información que hayas obtenido y agrúpala en
categorías. Estos datos podrían convertirse en la base de una función o un flujo, según
el problema que estés solucionando. Además, podrían utilizarse para actualizar y revisar el
desafío.

Una vez que tengas suficientes comentarios e ideas, es hora de aplicar dicho conocimiento para
crear un mapa del proyecto.

## Mapa del proyecto

El problema que estás intentando solucionar, por lo general, está compuesto por diferentes tipos de
personas (o participantes), cada uno con una participación distinta en el flujo del proyecto. Según la información
obtenida, debes crear una lista de los posibles participantes. Puede ser un tipo de usuario o
persona interesada; por ejemplo, “un médico que ofrece tratamiento para el pie equinovaro”, “un paciente que tiene
pie equinovaro”, “una persona que cuida a un paciente”, etc. Escribe el nombre de cada participante
en el margen izquierdo de una hoja de papel o en una
pizarra (si tienes acceso a una). En el margen derecho, escribe los objetivos de cada participante.

Finalmente, para cada participante, escribe la cantidad de pasos necesarios para que
puedan alcanzar el objetivo. Por ejemplo, en el caso de un “médico que ofrece tratamiento para el pie equinovaro”, el objetivo sería
“curar a un paciente con dicha afección”; por lo tanto, los pasos serían “registrar al paciente
en el sistema”, “crear un plan médico para el paciente”, “crear un ciclo de revisión de la
afección médica” y “realizar procedimientos médicos”.

<figure>
  <img src="images/project-map.jpg" alt="Los mapas de proyecto permiten trazar los pasos principales para cada usuario o participante de un flujo.">
  <figcaption>Los mapas de proyecto permiten trazar los pasos principales para cada usuario o participante de un flujo.</figcaption>
</figure>

El resultado es un mapa de proyecto con los principales pasos del proceso. Considéralo como
una descripción general del proyecto sin demasiados detalles. Además, les permite a los miembros del equipo
determinar si el mapa coincide con la declaración del desafío. Más adelante, cuando desgloses
cada paso, conocerás más detalles. Sin embargo, por ahora, un mapa de proyecto te ofrece un
análisis de alto nivel de los pasos que un usuario deberá realizar para alcanzar el objetivo final.

## Contorno reticular y guion gráfico

### Método Crazy 8s

Para esto, recomiendo un método denominado Crazy 8s que incluye doblar una hoja de
papel dos veces de manera que se obtengan ocho paneles. Luego, en cada panel, dibujas
una idea conforme a toda la información que obtuviste hasta el momento. Tendrás diez minutos para
elaborar ideas a fin de llenar los ocho paneles. Si se asignan más de 20
minutos para esto, es posible que comiences a posponer la tarea, te sirvas un café, revises los correos electrónicos,
charles con tu equipo de manera general y, fundamentalmente, evites realizar el trabajo. Debes
crear una sensación de urgencia en este paso, ya que te impulsa a trabajar rápidamente
y de forma más eficiente.

Si estás trabajando en equipo, pídele a cada participante que use su propio papel con ocho paneles. En este
proceso, tu cerebro comenzará a funcionar y reflexionarás acerca del desafío.
Por lo general, el esbozo será un contorno reticular de diseño de interfaz.

Luego, tú y los miembros de tu equipo deberán presentar las ideas ante el grupo.
Todos deberán explicar cada una de las ocho ideas en detalle y por qué eligieron un
camino específico. Recuérdale a cada miembro del equipo que debe usar la información obtenida para
justificar las ideas. Una vez que todos hayan presentado sus ideas, es momento de votar
cuál es la mejor. Cada persona recibe dos puntos adhesivos y puede votar por cualquier idea. Pueden
darle ambos votos a la misma idea si realmente les gusta.


<!-- <figure>
  <img src="images/voting-ideas.jpg"   alt="Puedes utilizar notas adhesivas para plasmar ideas y votar por conceptos o esbozos en sí.">
  <figcaption>Puedes utilizar notas adhesivas para plasmar ideas y votar por conceptos o esbozos en sí.</figcaption>
</figure> -->


<figure  class="attempt-left">
  <img src="images/crazy-8s.jpg" alt="El método Crazy 8s es una excelente forma de plasmar todas tus ideas en una misma hoja de papel".>
  <figcaption>El método Crazy 8s es una excelente forma de plasmar todas tus ideas en una misma hoja de papel.</figcaption>
</figure>

<figure class="attempt-right">
  <img src="images/detailed-wireframe.jpg"   alt="Ahora debes crear un diseño detallado según las ideas que hayas obtenido.">
  <figcaption>Ahora debes crear un diseño detallado según las ideas que hayas obtenido.</figcaption>
</figure>

<div class="clearfix"></div>

### Mejorar tu diseño

Luego de la votación, toma la idea que haya recibido la mayor cantidad de votos y esboza una idea final.
Puedes hacer uso de las demás ideas que presentaron tus colegas también.
Tienes otros diez minutos para completar esta tarea. Una vez que hayas finalizado,
presenta nuevamente las ideas a tu equipo y realicen una votación como la anterior.

### Guion gráfico de la idea


<figure>
  <img src="images/storyboard.jpg" class="attempt-right" alt="El guion gráfico incluye la combinación de los esbozos y las ideas en un flujo integral.">
  <figcaption>El guion gráfico incluye la combinación de los esbozos y las ideas en un flujo integral.</figcaption>
</figure>

Con tu diseño a mano, es momento de crear un guion gráfico de la interacción con el usuario.
Para este momento, ya deberías haber pensado en los diferentes pasos que realiza un
usuario. Es bastante común incorporar los diseños de uno de tus colegas en el flujo
también. Debes contar con un proceso paso a paso claro con algunos puntos
donde el usuario podría divergir. Consulta nuevamente el mapa del proyecto para validar
tu diseño con respecto al objetivo.

<div class="clearfix"></div>

## Creación de un prototipo

La creación de un prototipo no es la fabricación del código perfecto, sino la creación de
un producto que sea creíble cuando alguien lo use. Las herramientas utilizadas para crear un
prototipo varían según la persona. Algunos prefieren Keynote o PowerPoint, ya que dichos programas
te hacen pensar en el flujo y no en detalles de diseño. Puedes invertir
tiempo en aprender a usar herramientas como Balsamiq, Marvel o Framer que pueden darte más controles
conductuales. Cualquiera sea la herramienta que uses, asegúrate de que te permita
concentrarte en el flujo y parezca real. Debes probar el prototipo en personas reales;
por lo tanto, debe ser lo más creíble posible, pero, al mismo tiempo, no deberías
invertir semanas de trabajo en su creación.

<figure>
  <img src="images/prototyping.jpg"  alt="Los prototipos deben ser lo suficientemente reales para ser creíbles.">
  <figcaption>Los prototipos deben ser lo suficientemente reales para ser creíbles.</figcaption>
</figure>

La creación de un prototipo es un equilibrio entre tiempo y realidad. Por lo tanto, ten cuidado de no
acercarte demasiado a los extremos. De cualquier forma, podrías desperdiciar tiempo.

## Pruebas de usabilidad en tus diseños

Sería ideal contar con un laboratorio de prueba. Pero, si no lo tienes, crear uno no es difícil
siempre y cuando seas consciente de crear un entorno cómodo para
tus usuarios que no presente distracciones. Por lo general, las pruebas incluyen la participación del usuario y de dos personas de
tu equipo: uno toma notas y el otro hace preguntas. Un buen método es
usar una app como Hangouts y registrar sus acciones. Esto también es práctico si
deseas que el resto del equipo realice observaciones desde una habitación distinta. Esto puede ser bastante
escalofriante para nosotros como creadores de apps ya que probamos nuestros diseños en un entorno real.
Puede ser una experiencia agradable y aleccionadora a la vez.

<figure>
  <img src="images/usability-testing.jpg"  alt="El guion gráfico incluye poner todos los esbozos y las ideas en un flujo integral.">
  <figcaption>El guion gráfico incluye poner todos los esbozos y las ideas en un flujo integral.</figcaption>
</figure>

### Preguntas para hacer

Cuando pruebes tu diseño, pídele al usuario que realice tareas en tu app y
hable en voz alta y verbalice las acciones y el motivo. Suena raro pedirle esto, pero
te permite conocer qué piensa el usuario. Trata de no interrumpir al usuario y evita
decirle cómo debe proceder cuando se queda atascado. Simplemente pregúntale por qué eligió un
flujo en particular cuando haya finalizado (o NO haya finalizado).

Necesitas saber lo siguiente:

- ¿Qué aspectos del prototipo le gustan?
- ¿Qué aspectos del prototipo no le gustan?
- ¿Cuáles son los puntos débiles?
      * ¿Por qué funcionó un flujo?
      * ¿Por qué no funcionó un flujo?
- ¿Qué aspectos desearía mejorar?
- ¿Satisfice las necesidades el flujo/diseño general?

## Revisión de los diseños y nueva ronda de pruebas

Cuentas con un prototipo en ejecución y comentarios al respecto. Ahora es momento de revisar los
diseños y analizar qué funcionó y qué no. No tengas miedo de crear un
guion gráfico de contorno reticular completamente nuevo y hacer un prototipo nuevo. Comenzar de nuevo puede
servir para mejorar el flujo, en lugar de intentar mover elementos en tu prototipo anterior. Intenta
no sentir demasiado apego por él ya que es solo un prototipo.

Una vez que estés satisfecho con tus diseños, puedes probarlo nuevamente y mejorarlo un poco
más. En los casos en los que el prototipo no cumplió con el objetivo de ninguna manera, podrías
pensar que el proyecto fue un fracaso. En la práctica, no fue así. Es probable que hayas destinado
menos tiempo de desarrollo que el que hubieras necesitado si, en realidad, hubieras creado el diseño. Además, tienes más información acerca
de los aspectos que le gustan realmente al usuario. En el área de los sprints de diseño, seguimos la filosofía
de que ganas o aprendes. Por lo tanto, no te sientes culpable si la idea
no funcionó según lo planificado.

## ¡Hazlo!

Has probado tus ideas. Al usuario le gustan. Las partes interesadas pusieron mucho de sí
porque participaron desde el comienzo. Llegó el momento de crear el
producto. En este momento, deberías tener una idea clara de lo que se debe hacer y cuáles son las
prioridades de la experiencia. En cada paso del proyecto, puedes
introducir pruebas de usabilidad para validar tu trabajo y mantenerte en el
camino correcto.

Es imposible enfatizar cuán importante es obtener la mayor cantidad de información posible antes de
destinar mucho trabajo, tiempo y energía a una idea que podría no ser
la solución correcta.

Este artículo debería ofrecerte nociones básicas sobre el concepto de experiencia del usuario y su importancia. La
experiencia del usuario no debe considerarse como un concepto exclusivo del rol de diseñador o
investigador. En realidad, es responsabilidad de todos los involucrados en un proyecto,
por lo que recomendaría participar activamente en cada oportunidad.


{# wf_devsite_translation #}
