project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mayoría de los navegadores podrán tener acceso a la cámara del usuario.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# Capturar una imagen desde el usuario {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Ahora muchos navegadores tienen la habilidad de acceder a la entrada de audio y video desde el 
usuario. Sin embargo, según el navegador puede ser una experiencia en 
línea y totalmente dinámica o puede ser delegada a otra app en el dispositivo del usuario.

## Comenzar de modo simple y progresivo

Lo más sencillo es simplemente pedirle al usuario un archivo
registrado anteriormente. Puedes hacerlo creando un elemento simple de entrada de archivo y agregando 
un filtro `accept` que indica que solo podemos aceptar archivos de imágenes e idealmente 
los obtendremos directamente desde la cámara.

    <input type="file" accept="image/*" capture>

Este método funciona en todas las plataformas. En el escritorio se le solicita al usuario 
cargar un archivo de imagen desde el sistema de archivos. En Safari
para iOS, este método abre la app de la cámara, lo cual te permite capturar una imagen 
y luego enviarla devuelta a la página web; en Android este método le permite al usuario 
elegir qué app quiere usar para capturar la imagen antes de enviarla devuelta a la
página web.

Los datos se adjuntan a un `<form>` o se manipulan con JavaScript 
detectando a un evento `onchange` en el elemento de entrada y luego leyendo 
la propiedad `files` del evento `target`.

### Capturar en un solo fotograma

La obtención de acceso al archivo de imagen es sencilla.

    <input type="file" accept="image/*" capture="camera" id="camera">
    <img id="frame">
    <script>
      var camera = document.getElementById('camera');
      var frame = document.getElementById('frame');

      camera.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the image file.
        frame.src = URL.createObjectURL(file);
      });
    </script>

Una vez que obtienes acceso al archivo, puedes hacer lo que quieras con él. Por 
ejemplo, puedes:

* Adjuntarlo directamente a un elemento `<canvas>` para que puedas manipularlo
* Descárgalo al dispositivo del usuario
* Cargarlo a un servidor adjuntándolo a una `XMLHttpRequest` 

Si bien el uso del método de elemento de entrada para la obtención de acceso a las imágenes es 
ubicuo, es la opción menos atractiva porque no está integrada 
directamente a la página web y no se puede acceder a la cámara web del usuario en el escritorio.

## Acceder a la cámara de manera interactiva

Los navegadores modernos pueden obtener acceso directo a las cámaras, lo cual nos permite compilar
experiencias que estén totalmente integradas con la página web, de modo que el usuario nunca tenga que
abandonar el navegador.

Warning: El acceso directo a la cámara es una poderosa función que solicita el consentimiento del 
usuario y tu sitio tiene que estar en un origen seguro (HTTPS).

### Adquirir acceso a la cámara

Podemos acceder de modo directo a una cámara y a un micrófono usando una API en la especificación WebRTC 
llamada `getUserMedia()`. Con esto se le solicita al usuario 
acceder a sus micrófonos y cámaras conectados.

Si tiene éxito, la API muestra un `MediaStream` que contiene datos de
la cámara y luego podemos o bien adjuntarlo a un elemento `<video>` y ejecutarlo
para mostrar una vista previa en tiempo real o podemos adjuntarlo a un `<canvas>` para obtener un
resumen.

Para obtener datos desde la cámara, simplemente fijamos `video: true` en el objeto 
de restricciones que se pasa a la API `getUserMedia()`.

    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Por sí mismo, no es tan útil. Todo lo que podemos hacer es tomar los datos del video y
reproducirlo.

### Obtener un resumen desde la cámara

Para acceder a los datos sin procesar desde la cámara, tenemos que tomar la transmisión creada por
`getUserMedia()` y procesar los datos. A diferencia de `Web Audio`, no hay una 
API de procesamiento de transmisión exclusiva para videos en la web, de modo que tenemos que recurrir a 
un poco de piratería informática para capturar un resumen desde la cámara del usuario.

El proceso es de la siguiente manera:

1. Crea un objeto lienzo que contenga el marco desde la cámara
2. Obtén acceso a la transmisión de la cámara
3. Adjúntalo a un elemento de video
4. Cuando quieres capturar un marco preciso, agrega los datos desde el elemento de video 
   hasta un objeto de lienzo usando `drawImage()`.

Listo.

    <video id="player" controls autoplay></video>
    <button id="capture">Capturar</button>
    <canvas id="snapshot" width=320 height=240></canvas>
    <script>
      var player = document.getElementById('player'); 
      var snapshotCanvas = document.getElementById('snapshot');
      var captureButton = document.getElementById('capture');

      var handleSuccess = function(stream) {
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
      };

      captureButton.addEventListener('click', function() {
        var context = snapshot.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, snapshotCanvas.width, 
            snapshotCanvas.height);
      });

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Una vez que tienes datos de la cámara almacenados en los lienzos puedes hacer muchas cosas
con estos. Puedes: 

* Cargarlos directamente en el servidor
* Almacenarlos localmente
* Aplicar efectos extravagantes a la imagen

### Detener la transmisión desde la cámara cuando no sea necesaria

Es una buena práctica detener el uso de la cámara cuando ya no la necesitas.
Esto no solo ahorra batería y potencia de procesamiento, sino que también le brinda 
confianza en tu app a los usuarios.

Para detener el acceso a la cámara puedes simplemente llamar a `stop()` en cada pista de video 
para la transmisión que devuelve `getUserMedia()`.

<pre class="prettyprint">
&lt;video id="player" controls autoplay>&lt;/video>
&lt;button id="capture">Capture&lt;/button>
&lt;canvas id="snapshot" width=320 height=240>&lt;/canvas>
&lt;script>
  var player = document.getElementById('player'); 
  var snapshotCanvas = document.getElementById('snapshot');
  var captureButton = document.getElementById('capture');
  <strong>var videoTracks;</strong>

  var handleSuccess = function(stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    <strong>videoTracks = stream.getVideoTracks();</strong>
  };

  captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    <strong>// Stop all video streams.
    videoTracks.forEach(function(track) {track.stop()});</strong>
  });

  navigator.mediaDevices.getUserMedia({video: true})
      .then(handleSuccess);
&lt;/script>
</pre>

## Pedir permiso para usar la cámara de modo responsable

Si el usuario no le ha otorgado a tu sitio acceso a la cámara anteriormente entonces
en el momento que llames a `getUserMedia` el navegador le solicitará al usuario que le
de permiso a tu sitio para acceder a la cámara. 

A los usuarios no les gusta que se les solicite acceso a los dispositivos poderosos en su equipo 
y con frecuencia bloquean esta solicitud o la ignoran si no 
comprenden el contexto por el cual se ha creado la solicitud. Es mejor 
solo pedir acceso a la cámara la primera vez que se necesita. Una vez que el usuario ha
otorgado el acceso, no le volverán a preguntar. Sin embargo, si el usuario rechaza el acceso, 
no puedes obtener acceso otra vez, a menos que cambien de modo manual las configuraciones de permiso 
de la cámara.

Warning: Pedir el acceso a la cámara cuando se carga la página genera que la mayoría de 
tus usuarios rechacen el acceso a la misma.

## Compatibilidad

Más información acerca de la implementación de dispositivos móviles y navegadores de escritorio:
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

También recomendamos usar la corrección [adapter.js](https://github.com/webrtc/adapter) para proteger las apps de los cambios de especificación WebRTC y las diferencias de prefijos.


{# wf_devsite_translation #}
