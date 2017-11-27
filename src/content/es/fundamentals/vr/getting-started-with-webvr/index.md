project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a tomar una escena de WebGL en Three.js y agregarle capacidades de WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Primeros pasos con WebVR {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

Warning: WebVR todavía es experimental y se encuentra sujeta a modificaciones.

En esta guía exploraremos las WebVR API, y las usaremos para mejorar una escena simple de WebGL compilada con [Three.js](https://threejs.org/). Sin embargo, para el trabajo de producción, tal vez sea conveniente que comiences con soluciones ya creadas, como [WebVR Boilerplate](https://github.com/borismus/webvr-boilerplate). Si es tu primera vez con Three.js, puedes usar esta [útil guía de inicio](https://aerotwist.com/tutorials/getting-started-with-three-js/). La comunidad también brinda mucho apoyo, así que si no puedes avanzar, definitivamente puedes acudir a ellos.

Comencemos con [una escena compuesta por una caja dentro de una habitación de malla](https://googlechrome.github.io/samples/web-vr/hello-world/), cuyo código se encuentra en el [repositorio de ejemplos de Google Chrome](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world).

![Escena de WebGL que se ejecuta en Chrome para escritorio](./img/desktop.jpg)

### Una pequeña aclaración sobre la compatibilidad

WebVR se encuentra disponible en Chrome 56 y versiones posteriores detrás de un indicador de tiempo de ejecución. Habilitar el indicador (dirígete a `chrome://flags` y busca "WebVR") te permitirá compilar y probar tu trabajo de RV localmente. Si quieres admitir WebVR para tus visitantes, puedes participar en un [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md), que te permitirá habilitar WebVR para tu origen.

También puedes usar el [polyfill de WebVR](https://github.com/googlevr/webvr-polyfill), pero ten en cuenta que existen muchas penalidades de rendimiento al usar polyfills. Definitivamente deberías realizar pruebas en tus dispositivos de destino, y nunca enviar algo que no pueda mantener la misma frecuencia de actualización del dispositivo. Un índice de fotogramas variable puede resultar bastante incómodo para la persona que usa tu experiencia.

Para obtener más información, consulta la página sobre el [estado de WebVR](../status/).

## Obtén acceso a pantallas de RV

Entonces, si tenemos una escena con WebGL, ¿qué necesitamos hacer para que funcione con WebVR? Bueno, en primer lugar, necesitamos enviar una solicitud al navegador para que descubra si existen pantallas de RV disponibles. Esto puede hacerse a través de navigator.getVRDisplays().

    navigator.getVRDisplays().then(displays => {
      // Filter down to devices that can present.
      displays = displays.filter(display => display.capabilities.canPresent);

      // If there are no devices available, quit out.
      if (displays.length === 0) {
        console.warn('No devices available able to present.');
        return;
      }

      // Store the first display we find. A more production-ready version should
      // allow the user to choose from their available displays.
      this._vr.display = displays[0];
      this._vr.display.depthNear = DemoVR.CAMERA_SETTINGS.near;
      this._vr.display.depthFar = DemoVR.CAMERA_SETTINGS.far;
    });

Este código contiene algunos aspectos para analizar.

1. **No todos los dispositivos pueden enviar la "presentación" a unas gafas de realidad virtual.** Algunos dispositivos permiten, por ejemplo, el uso de acelerómetro o una experiencia que emula la RV, pero no hacen uso de unas HMD. Para esos dispositivos, el booleano canPresent será falso, y es algo que se debe controlar.

2. **Puede que no exista ningún dispositivo de RV disponible.** Deberíamos tener como objetivo crear experiencias que funcionen correctamente con una configuración fuera de la RV, y tratar la disponibilidad de la RV como una mejora progresiva.

3. **Puede que existan varios dispositivos de RV disponibles. **De la misma manera, es absolutamente posible que alguien tenga varios dispositivos de RV disponibles. Deberíamos permitir eso, si fuese posible, permitiéndoles que elijan el más adecuado.

## Instala una extensión de emulación de WebVR para Chrome DevTools

Tal vez te encuentres sin un dispositivo con capacidades de RV con el cual realizar pruebas. Si ese es el caso, ¡cuentas con ayuda! Jaume Elias creó una [extensión para Chrome DevTools que emula un dispositivo de RV](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil).

![Emulación de WebVR con la extensión de Jaume Elias para Chrome](./img/webvr-emulation.jpg)

Aunque siempre es preferible realizar pruebas en dispositivos reales (¡sobre todo para las pruebas de rendimiento!), contar con esta extensión puede ayudarte a depurar rápidamente durante tus compilaciones.

## Solicita la presentación desde el dispositivo

Para comenzar la presentación en "modo de RV", debemos solicitarla desde el dispositivo:

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent` toma un conjunto de lo que en las [especificaciones de Web VR](https://w3c.github.io/webvr/#vrlayer) se llama "VRLayers", que es básicamente un contenedor alrededor del elemento del lienzo que se le da al dispositivo de RV. En el fragmento de código anterior, tomamos el elemento del lienzo, `WebGLRenderer.domElement`, proporcionado por Three.js y lo pasamos como la propiedad de origen de una sola VRLayer. Como respuesta, `requestPresent` te entrega una [promesa](/web/fundamentals/getting-started/primers/promises) que se resuelve si la solicitud es exitosa y se rechaza en caso contrario.

## Dibuja tu escena de RV

Finalmente, estamos listos para mostrarle una escena de RV al usuario; ¡eso sí es emocionante!

![La escena de WebVR ejecutándose en un Pixel](../img/getting-started-with-webvr.jpg)

En primer lugar, hablemos sobre lo que tenemos que hacer.

* Asegurarnos de usar el callback `requestAnimationFrame` del dispositivo.
* Solicitar la información actual de pose, orientación y ojos desde el dispositivo de RV.
* Dividir nuestro contexto de WebVR en dos mitades, una para cada ojo, y dibujar cada una.

¿Por qué necesitamos usar un `requestAnimationFrame` diferente al que se proporciona con el objeto de la ventana? ¡Porque estamos trabajando con una pantalla con una frecuencia de actualización que puede ser diferente de la máquina host! Si las gafas tienen una frecuencia de actualización de 120 Hz, necesitamos generar los fotogramas correspondientes a esa frecuencia, incluso si la máquina host actualiza su pantalla a 60 Hz. La WebVR API responde a eso dándonos una `requestAnimationFrame` API diferente para llamar. En el caso de un dispositivo móvil, normalmente existe una sola pantalla (y actualmente, la frecuencia de actualización en Android es de 60 Hz), pero aun así deberíamos usar la API correcta para que nuestro código esté preparado para el futuro y sea tan compatible como sea posible.

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

Luego, necesitamos solicitar la información sobre dónde se encuentra la cabeza de la persona, su rotación y cualquier otro tipo de información que necesitemos para poder dibujar la escena correctamente, lo que hacemos con `getFrameData()`.

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()` tomará un objeto en el cual pueda colocar la información que necesitamos. Es necesario que sea un objeto`VRFrameData`, que podemos crear con `new VRFrameData()`.

    this._vr.frameData = new VRFrameData();

La información del fotograma contiene muchos datos interesantes, así que veámoslos rápidamente.

* **timestamp**. Es la marca de tiempo correspondiente a la actualización del dispositivo. Este valor comienza en 0 la primera vez que se invoca a getFrameData en la pantalla de RV.

* **leftProjectionMatrix** y **rightProjectionMatrix**. Estas son las matrices para la cámara que determinan la perspectiva de los ojos en la escena. Hablaremos más sobre estas más adelante.

* **leftViewMatrix** y **rightViewMatrix**. Estas son dos matrices más que proveen datos sobre la ubicación de cada ojo en la escena.

Si no tienes experiencia trabajando con 3D, las matrices de proyección y de vista-modelo pueden parecer abrumadoras. Aunque tienen una explicación matemática detrás de sus funciones, no necesitamos conocer exactamente cómo trabajan, sino qué es lo que hacen.

* **Matrices de proyección.** Se usan para crear una impresión de perspectiva dentro de una escena. Normalmente hacen esto distorsionando la escala de los objetos en la escena mientras más se alejan del ojo.

* **Matrices de modelo-vista.** Se usan para posicionar un objeto en el espacio 3D. Debido a la forma en la que trabajan las matrices, puedes crear los gráficos de la escena y desde allí continuar por el gráfico, multiplicando la matriz de cada nodo, hasta llegar a la última matriz de modelo-vista para el objeto en cuestión.

Puedes encontrar muchas guías buenas en la web que explican las matrices de proyección y de modelo-vista con mayor profundidad. Haz una búsqueda con Google si quieres obtener información mas detallada.

## Toma el control de la representación de la escena

Ya que tenemos las matrices que necesitamos, dibujemos la vista para el ojo izquierdo. Para comenzar, necesitaremos decirle a Three.js que no limpie el contexto de WebGL cada vez que llamamos a la representación, ya que necesitamos dibujar dos veces y no queremos perder la imagen para el ojo izquierdo cuando la dibujemos para el derecho.

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

Luego, configuremos el representador para que solo dibuje la mitad izquierda:

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

Este código da por supuesto que el contexto de GL es de pantalla completa (`window.inner*`), lo cual es muy probable con RV. Ahora podemos conectar las dos matrices para el ojo izquierdo.

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

Existen algunos detalles de la implementación que son importantes.

* **Movemos el mundo, no la cámara.** Puede parecer un poco extraño si no lo has visto antes, pero es común cuando se trabaja con gráficos dejar la cámara en el origen (0, 0, 0) y mover el mundo. Sin ponernos demasiado filosóficos, si me muevo 10 metros hacia adelante, ¿me moví 10 metros hacia adelante o se movió el mundo 10 metros hacia atrás? Es relativo a tu punto de vista y, desde una perspectiva matemática, no importa cuál de las dos sea. Ya que la WebVR API muestra lo "*inverso* a la matriz de modelo del ojo", se supone que lo apliquemos al mundo (`this._scene` en nuestro código) y no a la cámara en sí.

* **Debemos actualizar la matriz manualmente luego de que cambiemos sus valores.** Three.js almacena muchos valores en caché (¡lo cual es genial para el rendimiento!), pero eso significa que *debes* decirle que algo cambió para poder ver los cambios. Esto se hace con el método `updateMatrixWorld()`, que toma un booleano para asegurarse de que los cálculos se propaguen hacia el gráfico de la escena.

¡Ya casi terminamos! El paso final es repetir el proceso para el ojo derecho. Aquí limpiaremos los cálculos de profundidad del presentador luego de dibujar la vista para el ojo izquierdo, ya que no queremos que afecte a la presentación de la vista del ojo derecho. Luego, actualizamos la ventana de visualización para que se encuentre del lado derecho, y dibujamos nuevamente la escena.

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

Ahora podemos conectar las dos matrices para el ojo derecho.

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

¡Eso es todo! En realidad, no del todo...

## Dile al dispositivo que actualice

Si ejecutas las cosas como se encuentran actualmente, verás que la pantalla nunca se actualiza. Esto se debe a que podemos hacer varias presentaciones del contexto de WebGL, y las HMD no saben realmente cuándo actualizar su propia pantalla. Actualizar luego de, digamos, cada vez que se representa la imagen de cada ojo individualmente resulta ineficiente. Por lo tanto, tomamos el control de eso nosotros y llamamos a submitFrame.

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

Con ese código, esta vez *sí* terminamos. Si quieres la versión final, recuerda que puedes visitar el [repositorio de ejemplos de Google Chrome](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world).

## Consideraciones finales y recursos

WebVR proporciona una forma excelente de hacer que tu contenido sea más envolvente; y usar bibliotecas como Three.js hace que comenzar a usar WebGL sea mucho más fácil. Sin embargo, debes recordar algunos aspectos importantes.

* **Trabaja con mejora progresiva desde el comienzo.** Como comentamos varias veces en esta guía, es importante crear una experiencia con un buen nivel de base, sobre el cual puedas agregar capas de WebVR. Muchas experiencias pueden implementarse con controles táctiles o mouse, y pueden actualizarse a través de controles de acelerómetro para lograr experiencias de RV completas. Siempre vale la pena maximizar tu audiencia.

* **Recuerda que representarás tu escena dos veces.** Tal vez necesites considerar Level of Detail (LOD) y otras técnicas para asegurarte de que cuando representes la escena dos veces, se reduzca el tamaño de la carga de trabajo de cálculo para la CPU y la GPU. Por encima de todo, ¡debes mantener un índice de fotogramas constante! Por más espectacular que algo sea, ¡no compensará el terrible malestar que causa el mareo por movimiento!

* **Realiza pruebas en un dispositivo real.** Este punto se relaciona con el anterior. Deberías intentar adquirir dispositivos reales en los cuales puedas probar lo que desarrollas, especialmente si apuntas a dispositivos móviles. Como se suele decir, ["tu laptop miente descaradamente"](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405).

Ya que estamos con esto, puedes encontrar muchos recursos por ahí que te ofrecen un buen punto de partida en lo que respecta a crear contenido para WebVR:

* **[VRView](https://github.com/googlevr/vrview)**. Esta biblioteca te ayuda a incorporar videos y fotos panorámicas de 360 grados.

* **[WebVR Boilerplate](https://github.com/borismus/webvr-boilerplate)**. Para comenzar con WebVR y Three.js

* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)**. Para reemplazar las API que se requieren para WebVR. Por favor, recuerda que existen penalidades de rendimiento al usar polyfills. Por lo tanto, aunque ofrecen funcionalidades, tus usuarios podrían preferir tu experiencia sin RV.

* **[Ray-Input](https://github.com/borismus/ray-input)**. Una biblioteca para ayudarte a controlar los distintos tipos de entrada para dispositivos de RV y otros dispositivos, como mouse, táctiles y controladores de RV para juegos.

¡Ya puedes crear algo genial para RV!


{# wf_devsite_translation #}
