project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mayoría de los navegadores podrán tener acceso al micrófono del usuario.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# Grabación de audio del usuario {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Ahora muchos navegadores tienen la habilidad de acceder a la entrada de audio y video desde el 
usuario. Sin embargo, según el navegador puede ser una experiencia en 
línea y totalmente dinámica o puede ser delegada a otra app en el dispositivo del usuario.

## Comenzar de modo simple y progresivo

Lo más sencillo es simplemente pedirle al usuario un archivo
registrado anteriormente. Puedes hacerlo creando un elemento simple de entrada de archivo y agregando 
un filtro `accept` que indica que solo podemos aceptar archivos de audios e idealmente 
los obtendremos directamente desde el micrófono.

    <input type="file" accept="audio/*" capture="microphone">

Este método funciona en todas las plataformas. En el escritorio se le solicita al usuario 
cargar un archivo desde el sistema de archivos (ignorando `capture="microphone"`). En Safari
para iOS, este método abre la app del micrófono, lo cual te permite grabar un audio 
y luego enviarlo devuelta a la página web; en Android este método le permite al usuario 
elegir qué app quiere usar para grabar el audio antes de enviarlo devuelta a la
página web.

Una vez que el usuario haya terminado la grabación y esté de vuelta en el sitio web, tienes 
que adquirir los datos del archivo de algún modo. Puedes obtener un acceso rápido 
adjuntando un evento `onchange` al elemento de entrada y luego leyendo 
la propiedad `files` de objetos de eventos.

    <input type="file" accept="audio/*" capture="microphone" id="recorder">
    <audio id="player" controls></audio>
    <script>
      var recorder = document.getElementById('recorder');
      var player = document.getElementById('player')'

      recorder.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the audio file.
        player.src =  URL.createObjectURL(file);
      });
    </script>

Una vez que obtienes acceso al archivo, puedes hacer lo que quieras con él. Por 
ejemplo, puedes:

* Adjuntarlo directamente a un elemento `<audio>` para que puedas reproducirlo
* Descárgalo al dispositivo del usuario
* Cargarlo a un servidor adjuntándolo a una `XMLHttpRequest`
* Pásalo a través de la Web Audio API y aplícale filtros  

Si bien el uso del método de elemento de entrada para la obtención de acceso a los datos de audio es 
ubicuo, es la opción menos atractiva. Realmente queremos obtener acceso al
micrófono y proporcionar una linda experiencia directamente en la página.

## Acceder al micrófono de manera interactiva

Los navegadores modernos pueden obtener acceso directo al micrófono, lo cual nos permite compilar
experiencias que estén totalmente integradas con la página web, de modo que el usuario nunca tenga que
abandonar el navegador.

### Adquirir acceso al micrófono

Podemos acceder de modo directo a un micrófono usando una API en la especificación WebRTC 
llamada `getUserMedia()`. `getUserMedia()` le solicita al usuario 
acceder a sus micrófonos y cámaras conectados.

Si tiene éxito, la API muestra un `Stream` que contiene datos de
la cámara o el micrófono y luego podemos o bien adjuntarlo a 
un elemento `<audio>` a un Web Audio `AudioContext` o guardarlo usando 
la API `MediaRecorder`.

Para obtener datos desde el micrófono, simplemente fijamos `audio: true` en el objeto 
de restricciones que se pasa a la API `getUserMedia()`.


    <audio id="player" controls></audio>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        if (window.URL) {
          player.src = window.URL.createObjectURL(stream);
        } else {
          player.src = stream;
        }
      };

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(handleSuccess)
    </script>

Por sí mismo, no es tan útil. Todo lo que podemos hacer es tomar los datos del audio y
reproducirlo.

### Acceder a los datos sin procesar desde el micrófono

Para acceder a los datos sin procesar desde el micrófono, tenemos que tomar la transmisión creada por
`getUserMedia()` y luego usar la Web Audio API para procesar los datos. La
Web Audio API es una API simple que toma orígenes de entrada y los conecta 
con nodos que pueden procesar los datos del audio (ajustar Gain etc) y 
, en última instancia, con un usuario para que este pueda oírlo.

Uno de los nodos que puedes conectar es un `ScriptProcessorNode`. Este nodo
emitirá un evento `onaudioprocess` cada vez que se complete el búfer de audio y tienes que 
procesarlo. En este punto, puedes guardar los datos en tu propio búfer
para usarlos más tarde.

<pre class="prettyprint">
&lt;script>  
  var handleSuccess = function(stream) {
    <strong>var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024,1,1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e){
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer);
    };</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
&lt;/script>
</pre>

Los datos que se mantienen en los búferes son datos sin procesar del micrófono y 
tienes un número de opciones de lo que puedes hacer con ellos:

* Cargarlos directamente en el servidor
* Almacenarlos localmente
* Conviértelos en un formato de archivo dedicado, como WAV y luego guárdalos en tus 
  servidores o localmente

### Guardar los datos del micrófono

El modo más sencillo de guardar los datos del micrófono es usar la API
`MediaRecorder`.

La API `MediaRecorder` tomará la transmisión creada por `getUserMedia` y luego, 
de modo progresivo, guardará los datos que están en la transmisión en tu destino
preferido.

<pre class="prettyprint">
&lt;a id="download">Download</a>
&lt;button id="stop">Stop</button>
&lt;script> 
  let shouldStop = false;
  let stopped = false;
  const downloadLink = document.getElementById('download');
  const stopButton = document.getElementById('stop');

  stopButton.addEventListener('click', function() {
    shouldStop = true;
  })

  var handleSuccess = function(stream) {  
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    <strong>const mediaRecorder = new MediaRecorder(stream, options);  

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

&lt;/script>
</pre>

En nuestro caso, estamos guardando los datos directamente en un conjunto que luego podemos convertir
en un `Blob` y que podemos usar para guardar en nuestro servidor web o directamente en
el almacenamiento del dispositivo del usuario. 

## Pedir permiso para usar el micrófono de modo responsable

Si el usuario no le ha otorgado a tu sitio acceso al micrófono anteriormente entonces
en el momento que llames a `getUserMedia` el navegador le solicitará al usuario que le
de permiso a tu sitio para acceder al micrófono. 

A los usuarios no les gusta que se les solicite acceso a los dispositivos poderosos en su equipo
y con frecuencia bloquean esta solicitud o la ignoran si no 
comprenden el contexto por el cual se ha creado la solicitud. Es mejor
solo pedir acceso al micrófono la primera vez que se necesita. Una vez que el usuario ha
otorgado el acceso, no le volverán a preguntar, sin embargo, si lo rechazan, 
no puedes obtener acceso otra vez para pedirle permiso al usuario.

Warning: Pedir el acceso al micrófono cuando se carga la página genera que la mayoría de tus usuarios rechacen el acceso a la misma.

### Usa la API de permisos para comprobar si ya tienes acceso

La API `getUserMedia` no te permite saber si ya tienes
acceso al micrófono. Esto te presenta un problema, para proporcionar una buena IU
para hacer que el usuario te otorgue acceso al micrófono, tienes que pedir
acceso al micrófono.

Esto se puede resolver en algunos navegadores usando la Permission API. La API
`navigator.permission` te permite consultar el estado de la capacidad de
acceder a API específicas sin tener que volver a solicitar.

Para consultar si tienes acceso al micrófono del usuario, puedes pasar
`{name: 'microphone'}` al método de consultas y mostrará:

*  `granted`: el usuario te ha otorgado acceso previamente al micrófono; 
*  `prompt`: el usuario no te ha otorgado acceso y se lo solicitarán cuando 
    llames a `getUserMedia`; 
*  `denied`: el sistema o el usuario ha bloqueado explícitamente el acceso al
    micrófono y no podrás obtener acceso al mismo.

Ahora puedes comprobar rápidamente si necesitas modificar tu interfaz de
usuario para acomodar las acciones que el usuario necesita tomar.

    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
