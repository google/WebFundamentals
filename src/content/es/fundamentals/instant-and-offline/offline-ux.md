project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Guía para diseñar experiencias web para redes lentas y sin conexión.

{# wf_updated_on: 2016-11-10 #}
{# wf_published_on: 2016-11-10 #}

# Consideraciones sobre la experiencia de usuario sin conexión {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

En este artículo, se analizarán diversas consideraciones de diseño necesarias para crear
una gran experiencia en redes lentas y sin conexión.

La calidad de una conexión de red puede verse afectada por varios factores,
como estos:

* Cobertura deficiente de un proveedor. 
* Condiciones ambientales extremas.
* Cortes de energía.
* Usuarios que atraviesan “zonas muertas”, como edificios que bloquean
 las conexiones de red. 
* Viajar en tren y pasar por un túnel.
* Un tercero administra la conexión a Internet y le asigna tiempo para
 estar activa o inactiva, como en un aeropuerto u hotel.
* Prácticas culturales que requieren poco o ningún acceso a Internet en momentos o
 días específicos.

Tu objetivo es proporcionar una buena experiencia que disminuya el impacto de los cambios
en la conectividad. 

## ¿Qué debes mostrar a los usuarios cuando tienen una conexión de red deficiente?

La primera pregunta que se debe hacer es: ¿cómo se ven el éxito y la falla en
una conexión de red? Una conexión exitosa ofrece la experiencia en
línea usual de la app. La falla de la conexión, sin embargo, puede referirse tanto el estado sin conexión
de la app como el comportamiento de la app cuando la red está retardada.

Cuando pienses en el éxito o la falla de una conexión de red, debes hacerte
estas importantes preguntas sobre la experiencia de usuario:

* ¿Cuánto esperas para determinar el éxito o la falla de una conexión? 
* ¿Qué puedes hacer mientras se determina el éxito o la falla? 
* ¿Qué debes hacer ante una falla?
* ¿Cómo informas al usuario sobre todo lo anterior?

### Informar a los usuarios sobre su estado actual y el cambio de estado

Informa al usuario sobre las acciones que todavía pueden realizar cuando se produce una
falla en la red y el estado actual de la app. Por ejemplo, una notificación
podría decir esto:

> “Parece que tienes una conexión de red deficiente. [¡No te preocupes!]. Los mensajes se
enviarán cuando la red se restaure”.

<figure class="attempt-left">
  <img src="images/emojoy-toast-message.png" alt="Emojoy, la app de mensajería con emojis, informa al usuario cuando se produce un cambio en el estado.">
  <figcaption>
    Informa claramente al usuario cuando se produce un cambio en el estado lo antes posible.
  </figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/io-toast-message.png" alt="La app I/O 2016 informa al usuario cuando se produce un cambio en el estado.">
  <figcaption>
    La app Google I/O usó una notificación del sistema de diseño material para informar al usuario que estaba sin conexión.
  </figcaption>
</figure>

<div class="clearfix"></div>

### La conexión de red mejora o se restaura

<figure class="attempt-right">
  <img src="images/weather-app.png" alt="Un ejemplo de una app de estado del tiempo.">
  <figcaption>
    Algunas apps, como esta app de estado del tiempo, deben actualizarse automáticamente porque los datos viejos no son útiles para el usuario.
  </figcaption>
</figure>

Cómo informes al usuario cuando la conexión de red ha mejorado
dependerá en gran medida de tu app. Para las apps que requieren como prioridad que se muestre
información actualizada, por ejemplo, una app del mercado bursátil, la actualización automática
y la notificación del usuario lo antes posible son esenciales.

<div class="clearfix"></div>

También puedes mostrar la última vez que la app se actualizó en todo momento en un espacio
prominente. Esto también sería importante para una app de conversión de monedas, por ejemplo.

<figure>
  <img class="attempt-left" src="images/material-money-rates-out-of-date.png" alt="App Moterial Money desactualizada">
  <img class="attempt-right" src="images/material-money-rates-updated.png" alt="App Moterial Money actualizada">
  <figcaption class="clearfix">
    Material Money muestra el último valor de las monedas siempre que es posible y notifica al
    usuario cuando la app no ha sido actualizada.
  </figcaption>
</figure>

Otras apps, como las apps de noticias, podrían mostrar una notificación simple en la que se informe
al usuario que hay contenido más nuevo, con una función de presionar para actualizar. El motivo
para hacerlo es que, si un usuario está leyendo un artículo, una actualización automática
actualizaría la página y el usuario perdería el artículo.


<figure>
  <img class="attempt-left" src="images/tailpiece-normal.png" alt="App de noticias de ejemplo, Tailpiece, en estado normal">
  <img class="attempt-right" src="images/tailpiece-tap-to-update.png" alt="App de noticias de ejemplo, Tailpiece, lista para actualizarse">
  <figcaption class="clearfix">
    Tailpiece, un periódico en línea, descargará automáticamente las últimas noticias, pero
    permitirá que los usuarios la actualicen manualmente para que no pierdan el artículo que están leyendo.
  </figcaption>
</figure>

### Estados contextuales y modo de exploración

Cada parte de la IU puede tener su propio contexto y funcionalidad que cambiarán
según si requiere o no una conexión exitosa. Un ejemplo sería un sitio de
comercio electrónico que se puede explorar sin conexión, pero que tiene el botón Comprar y los precios
inhabilitados hasta el restablecimiento de la conexión.

Otras formas de estados contextuales podrían incluir los datos. Por ejemplo, la app
financiera Robinhood permite a los usuarios comprar acciones, y usa colores y gráficos para
informarles cuando el mercado está abierto. Toda la interfaz se pone blanca y
cambia a gris cuando el mercado cierra. Cuando el valor de las acciones aumenta o
disminuye, cada widget de acciones individual se torna verde o rojo según su
estado.

### Enseñar al usuario para que comprenda cuál es el modelo de uso sin conexión

El uso sin conexión es un modelo mental nuevo para todos. Tienes que enseñar a los usuarios
qué cambios se producirán cuando no tengan conexión. Infórmales dónde
se guardan los datos grandes y ofréceles opciones de configuración para cambiar el comportamiento predeterminado. Asegúrate
de usar diversos componentes de diseño de IU, como lenguaje informativo, íconos,
notificaciones, color e imágenes, para transmitir estas ideas juntas, en lugar de
basarte en un solo dispositivo de diseño, como un ícono, para contar toda la
historia.

## Proporcionar una experiencia de uso sin conexión de manera predeterminada 

Si tu app no requiere muchos datos, almacénelos en caché de manera predeterminada. Los usuarios
pueden frustrarse cada vez más si solo pueden acceder a los datos con una
conexión de red. Intenta que la experiencia sea tan estable como sea posible. Una
conexión inestable hará que el usuario sienta que tu app no es de confianza; mientras que, si la app
disminuye el impacto de una falla de la red, el usuario la considerará mágica.

Los sitios nuevos podrían beneficiarse de la descarga automática y el almacenamiento de las últimas noticias
del día de manera que el usuario pueda leer las noticias de hoy sin conexión,
tal vez, descargando el texto sin las imágenes. También podrían adaptarse al
comportamiento del usuario. Por lo que, si el usuario suele leer la sección de deportes, podrían
hacer que estos fueran los datos prioritarios para descargar.

<figure>
  <img class="attempt-left" src="images/tailpiece-offline.png" alt="Tailpiece informa al usuario que no tiene conexión con diversos widgets de diseño.">
  <img class="attempt-right" src="images/tailpiece-offline-sidebar.png" alt="Tailpiece tiene un menú de navegación que muestra qué secciones están listas para el uso sin conexión.">
  <figcaption class="clearfix">
    Si el dispositivo no tiene conexión, Tailpiece notificará al usuario con un mensaje
    de estado, en el que le informará que puede seguir usando la app.
  </figcaption>
</figure>

## Informar al usuario cuando la app está lista para uso sin conexión 

Cuando una app web se carga por primera vez, debes indicar al usuario si está
lista para usarla sin conexión. Haz esto con un
[widget que proporcione comentarios breves](https://material.google.com/components/snackbars-toasts.html "widget that provides brief feedback")
sobre una operación mediante un mensaje en la parte inferior de la pantalla, 
por ejemplo, cuando se sincronizó una sección o se descargó un archivo de datos.

Reitero, presta atención al lenguaje que usas a fin de asegurarte de que sea adecuado
para tu público. Asegúrate de que el mensaje sea el mismo en todas las instancias en las que se
use. El término “sin conexión” suele comprenderse incorrectamente en los públicos sin conocimiento técnico,
así que usa lenguaje basado en la acción que sea comprensible para tu público.


<figure>
  <img class="attempt-left" src="images/io-offline-ready.png" alt="App I/O sin conexión.">
  <img class="attempt-right" src="images/chome-offline.png" alt="El sitio Chrome Status no tiene conexión.">
  <figcaption class="clearfix">
    Tanto la app Google I/O 2016 como el sitio Chrome Status notifican al usuario cuando
    la app está lista para usarla sin conexión.
  </figcaption>
</figure>

### Convertir “guardar para uso sin conexión” en una parte obvia de la interfaz para apps que consumen muchos datos

Si una app consume grandes cantidades de datos, asegúrate de que haya un interruptor o
una fijación para agregar una opción para uso sin conexión, en lugar de descarga automática, a menos que un
usuario haya solicitado específicamente este comportamiento mediante el menú de configuración. Asegúrate
de que la fijación o la IU de descarga no queden ocultas por otros elementos de la IU y de que la
función sea obvia para el usuario.


Un ejemplo sería un reproductor de música que requiere archivos de datos grandes. El usuario
conoce el costo de datos asociado, pero también sabe que puede querer usar
el reproductor sin conexión. La descarga de música para escucharla más adelante requiere
planificación por parte del usuario, por lo que es posible que sea necesario enseñarle sobre esto durante su
incorporación.

### Aclarar a qué se puede acceder sin conexión 

Sé claro sobre la opción que proporcionas. Tal vez, tengas que mostrar una pestaña o una
configuración que tenga una “biblioteca de uso sin conexión” para que el usuario pueda ver fácilmente qué
tiene almacenado en el teléfono y qué tiene que guardar. Asegúrate de que la configuración
sea concisa y clara sobre dónde se guardarán los datos y quién tendrá acceso a ellos.

### Mostrar el costo real de una acción

Muchos usuarios equiparan el funcionamiento sin conexión con “descarga”. Los usuarios en países
donde las conexiones de red fallan regularmente o no están disponibles, a menudo comparten contenido
con otros usuarios o guardan contenido para uso sin conexión cuando tienen conectividad.

Los usuarios con planes de datos pueden evitar la descarga de archivos más grandes por temor a los costos.
Por esto, podrías mostrar el costo asociado para que los usuarios puedan realizar una comparación
activa para un archivo o tarea específicos.  Un ejemplo sería, tomando la app de música que mencionamos antes,
que esta pudiera detectar si el usuario tiene un plan de datos y mostrara el tamaño del archivo para que el usuario
pudiera ver el costo real de un archivo.

### Ayuda para prevenir las experiencias modificadas 

Con frecuencia, los usuarios modifican una experiencia sin darse cuenta. Por ejemplo,
antes de la aparición de las apps para compartir en la nube, como Google Drive, era común que los usuarios guardaran archivos
grandes y los adjuntaran a correos electrónicos para poder seguir con la edición en otro
dispositivo. Es importante no centrarse en su experiencia modificada, sino
más bien en descubrir qué intentan lograr. En otras palabras, en lugar de pensar en
qué puedes hacer para que adjuntar un archivo grande sea más fácil, resuelve el
problema de compartir archivos grandes entre diferentes dispositivos.

## Experiencia transferible de un dispositivo a otro

Cuando crees una experiencia para una conexión de red débil, busca que se sincronice
correctamente cuando la conexión mejore para que la experiencia sea transferible.
Por ejemplo, imagina una app de viajes que pierde la conexión de red a mitad de una
reservación. Cuando la conexión se restablece, la app se sincroniza con la cuenta
del usuario, quien puede seguir con la reservación en el dispositivo de escritorio. No
poder transferir experiencias es increíblemente molesto para los usuarios.

Informa al usuario sobre el estado actual de los datos, por ejemplo, si la app pudo
sincronizarse o no. Enséñales cuando sea posible, pero trata de no abrumarlos
con los mensajes.

## Creación de experiencias de diseño inclusivas 

Cuando diseñes, ten como objetivo ser inclusivo y proporciona dispositivos de diseño significativos,
lenguaje simple, iconografía estándar e imágenes pertinentes que guiarán al
usuario para completar la acción o la tarea, en lugar de obstaculizar su progreso.

### Dejar que un lenguaje simple y conciso sean la guía

Una experiencia del usuario buena no solo se refiere a una interfaz bien diseñada. Incluye el flujo que el usuario
sigue y el lenguaje que se usa en la app. Evita usar la jerga técnica cuando
expliques el estado de la app o de los componentes individuales de la IU. Ten en cuenta que
la frase “app sin conexión” podría no indicar nada al usuario sobre el estado actual de la app.

<div class="attempt-left">
  <figure>
    <img src="images/download.png" alt="El ícono de descarga es un buen ejemplo.">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Usar lenguaje e imágenes que describan la acción.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/service-worker-ready.png" alt="El ícono del service worker es un mal ejemplo.">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: Usar términos abstractos que pueden no ser accesibles. 
     </figcaption>
  </figure>
</div>
<div class="clearfix"></div>


### Usar múltiples dispositivos de diseño para crear experiencias de usuario accesibles

Usa lenguaje, color y componentes visuales para demostrar un cambio en el estado o
el estado actual. Es posible que el usuario no note los cambios si solamente se
usa color para demostrar el estado, lo que, por otro lado, puede no servir para los usuarios que tienen discapacidades visuales.
Además, el instinto de los diseñadores es atenuar la IU para representar el estado sin conexión,
pero esto puede tener diferentes significados en la Web. La IU atenuada también se usa para indicar
que un elemento está inhabilitado, como elementos de entrada en un formulario. Esto puede generar
confusión si ÚNICAMENTE usas color para indicar el estado.

Para evitar las confusiones, muestra al usuario los diferentes estados de maneras
diversas, por ejemplo, con color, etiquetas y componentes de la IU.

<div class="attempt-left">
  <figure>
    <img src="images/accessibility_color7_do.png" alt="Un buen ejemplo en el que se usan color y texto para mostrar un error.">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Usar una combinación de elementos de diseño para transmitir el mensaje.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/accessibility_color8_dont.png" alt="Un mal ejemplo en el que solo se usa color.">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: Usar solamente color para describir qué está sucediendo.
     </figcaption>
  </figure>
</div>

<div class="clearfix"></div>

### Usar íconos que transmitan significado 

Asegúrate de que la información se transmita correctamente con etiquetas de texto significativo, al igual que
íconos. Usar solo íconos puede ser un problema, ya que el concepto del uso sin conexión
en la Web es relativamente nuevo. Los usuarios pueden interpretar incorrectamente los íconos que se usan solos. Por
ejemplo, usar un disquete para “guardar datos” tiene sentido para una generación mayor, pero
los usuarios jóvenes que nunca vieron un disquete pueden confundirse con la metáfora.
Asimismo, el ícono de menú de “hamburguesa” ha confundido a algunos usuarios cuando se lo ha presentado
sin una etiqueta.


Cuando introduzcas un ícono de “sin conexión”, intenta seguir la presentación
visual estándar del sector (si existe una) y de incluir etiquetas de texto y una
descripción. Por ejemplo, para “guardar para uso sin conexión”, podría usarse un ícono típico de descarga o
, tal vez, si la acción incluye sincronización, podría usarse un ícono de sincronización. Algunas acciones
pueden interpretarse como “guardar para uso sin conexión”, en lugar de demostrar el estado de la
red. Piensa en la acción que intentas transmitir, en vez de presentar al
usuario un concepto abstracto. Por ejemplo, guardar o descargar datos estarían basados en una
acción.

<img src="images/download-icons-exampels.png" alt="Varios ejemplos de íconos que indican el estado sin conexión.">

“Sin conexión” puede significar varias cosas según el contexto, como descarga, 
exportación, fijación, etc. Para obtener más ideas, consulta el
[conjunto de íconos de diseño material](https://material.io/icons/ "material design icon set").

### Usar diseños de esquema con otro mecanismo de comentarios 

Un diseño de esquema es esencialmente una versión de malla de tu app que se muestra
mientras se carga contenido. Esto ayuda a demostrar al usuario que el contenido
está por cargarse. Considera usar también una IU de precargador, con una etiqueta
de texto en la que se informe al usuario que la app está realizando una carga. Un ejemplo sería
hacer que el contenido de malla lata y dé la sensación de que la app está viva y
cargando. Esto asegura al usuario que algo está pasando y ayuda a prevenir
los reenvíos o las actualizaciones de la app.

<figure>
  <img class="attempt-left" src="images/tailpiece-skel-article.png" alt="Ejemplo de diseño de esquema">
  <img class="attempt-right" src="images/tailpiece-normal.png" alt="Ejemplo de artículo cargado">
  <figcaption class="clearfix">
    Antes y después de un diseño de esquema
  </figcaption>
</figure>

### No bloquear contenido

En algunas apps, un usuario podría desencadenar una acción, como crear un documento
nuevo. Algunas apps intentarán conectarse a un servidor a fin de sincronizar el documento
nuevo y, para demostrarlo, presentarán un diálogo modal de carga intrusivo
que ocupa toda la pantalla. Esto puede funcionar bien si el usuario tiene una conexión
de red estable, pero, si esta es inestable, no podrán salir de esta acción
y la IU les impedirá hacer algo más.
Es un requisitos de la red que el contenido bloqueado se evite. Permite que el usuario
siga explorando tu app, pon en cola las tareas que se llevarán a cabo y realiza la sincronización
cuando la conexión mejore.

Demuestra el estado de una acción proporcionando a los usuarios comentarios. Por
ejemplo, si un usuario está editando un documento, piensa en cambiar el diseño de los comentarios para que sea
visiblemente diferente de cuando está en línea, pero que indique que el archivo se
“guardó” y se sincronizará cuando haya una conexión de red. Esto le enseñará
al usuario los estados diferentes disponibles y le asegurará que su tarea
o acción fue guardada. Esto aporta el beneficio adicional de que el usuario adquiere más confianza
en el uso de tu app.

## Diseño para los siguientes mil millones

En muchas regiones, los dispositivos de gama baja son comunes, la conectividad no es confiable
y muchos usuarios no pueden afrontar el pago de datos. Deberás ganarte la confianza de los usuarios
siendo claro y ahorrativo con los datos. Piensa en maneras de ayudar a los usuarios con conexiones
deficientes y simplifica la interfaz para facilitar la aceleración de las tareas. Siempre trata de preguntar
a los usuarios antes de descargar contenido que consume muchos datos.

Ofrece opciones de ancho de banda bajo para los usuarios con conexiones débiles. Por lo tanto, si la conexión
de red es lenta, proporciona activos pequeños. Ofrece una opción para elegir entre activos de calidad
alta o baja.

## Conclusión

La enseñanza es la clave aquí, ya que los usuarios no están familiarizados con estos conceptos. Intenta crear
asociaciones con cosas que sean familiares, por ejemplo, “descargar para usar más tarde” es lo
mismo que “datos para uso sin conexión”.


Cuando diseñes para conexiones de red inestables, ten en cuenta lo siguiente: 

* Piensa en cómo diseñas para el funcionamiento correcto, con falla o inestable de una
  conexión de red.
* Los datos pueden ser costosos, así que sé considerado con el usuario.
* Para la mayoría de los usuarios del mundo, el entorno tecnológico es casi exclusivamente móvil.
* Los dispositivos de gama baja son comunes y tienen almacenamiento, memoria y potencia 
  de procesamiento limitados, pantallas pequeñas y pantallas táctiles de baja calidad. Asegúrate de que el rendimiento 
  sea una parte de tu proceso de diseño. 
* Permite que los usuarios exploren tu app cuando estén sin conexión.
* Informa a los usuarios sobre el estado actual y de los cambios en el estado.
* Intenta brindar la opción de uso sin conexión de manera predeterminada si tu app no requiere muchos datos.
* Si tu app consume muchos datos, enseña al usuario cómo puede realizar descargas para
  el uso sin conexión.
* Haz que las experiencias sean transferibles entre dispositivos.
* Utiliza conjuntamente lenguaje, íconos, imágenes, tipografía y color para transmitir ideas al 
  usuario.
* Proporciona seguridad y comentarios para ayudar al usuario.


{# wf_devsite_translation #}
