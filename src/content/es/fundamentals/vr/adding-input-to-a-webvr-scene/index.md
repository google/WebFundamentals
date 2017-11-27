project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a usar la biblioteca Ray Input para agregar entrada a tu escena de WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Agregar entrada a una escena de WebVR {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Warning: WebVR todavía es experimental y se encuentra sujeta a modificaciones.

En la sección [Primeros pasos con WebVR](../getting-started-with-webvr/) analizamos cómo tomar una escena WebGL y agregarle la funcionalidad de WebVR. Aunque eso funciona, y puedes mirar dentro de la escena en RV, puede resultar mucho más divertido cuando puedes interactuar con entidades en la escena.

![Un haz de rayo que muestra la entrada en una escena de WebVR](./img/ray-input.jpg)

En WebVR (y 3D en general) puede haber varios tipos de entradas, y lo ideal sería no solo representarlas a todas, sino también poder cambiar entre ellas según cambie el contexto del usuario.

Un sondeo rápido de los tipos de entradas que existen hoy incluye:

<img class="attempt-right" src="../img/touch-input.png" alt="Ícono de entrada táctil">

* **Mouse.**
* **Entrada táctil.**
* **Acelerómetro y giroscopio.**
* **Controladores sin grado de libertad** (como Cardboard). Estos son controladores que se encuentran completamente vinculados con la ventana de visualización, y con los cuales se supone que la interacción normalmente tiene origen en el centro de la ventana de visualización.
* **Controladores con 3 grados de libertad** (como el controlador Daydream). Un controlador con 3 grados ofrece información de orientación, pero no de ubicación. Normalmente, se supone que la persona sostiene este tipo de controladores en la mano izquierda o derecha, y su posición en espacios 3D es estimada.
* **Controladores con 6 grados de libertad** (como Oculus Rift o Vive). Todos los controladores con 6 grados de libertad ofrecerán tanto información de orientación como de ubicación. Normalmente, estos son los que tienen las mejores capacidades y precisión.

En el futuro, con la maduración de WebVR, incluso podremos ver nuevos tipos de entrada, lo que significa que nuestro código necesita estar tan preparado para el futuro como sea posible. Sin embargo, escribir el código para poder adaptarse a todas las nuevas versiones de entradas puede resultar complicado y difícil de manejar. La biblioteca [Ray Input](https://github.com/borismus/ray-input) de Boris Smus ya ofrece un buen punto de partida. Admite la mayoría de tipos de entradas que se encuentran disponibles hoy, así que comenzaremos por ahí.

Comencemos desde nuestra escena anterior y [agreguemos controladores de entrada con Ray Input](https://googlechrome.github.io/samples/web-vr/basic-input/). Si quieres ver el código final, deberías consultar el [repositorio de ejemplos de Google Chrome](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/).

## Agrega la biblioteca Ray Input a la página

Para mayor simplicidad, podemos agregar Ray Input directamente con una etiqueta de secuencia de comandos:

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

Si usas Ray Input como parte de un sistema de compilación mayor, también puedes importarla de esa forma. El [archivo README de Ray Input contiene más información](https://github.com/borismus/ray-input/blob/master/README.md), así que deberías consultarlo.

## Obtén acceso a las entradas

Luego de obtener acceso a cualquier pantalla de RV, podemos solicitar acceso a todas las entradas disponibles. A partir de allí, podemos agregar receptores de eventos, y actualizaremos la escena para dejar al estado predeterminado de nuestra caja como "deselected".

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

Let’s take a look inside both the `_getInput` and `_addInputEventListeners` functions.

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

La creación de una biblioteca Ray Input supone pasarle la cámara de Three.js desde la escena y un elemento al cual pueda unir mouse, entrada táctil y cualquier otro receptor de eventos que necesite. Si no pasas un elemento como el segundo parámetro, de manera predeterminada se unirá a `window`, lo que puede impedir que partes de tu interfaz de usuario (IU) reciban eventos de entrada.

Otra acción necesaria es decirle qué tan grande debe ser el área con la que debe trabajar, lo que en la mayoría de los casos es el área del elemento de lienzo de WebGL.

## Habilita la interactividad para entidades de escena

A continuación, debemos decirle a Ray Input qué rastrear y qué eventos nos interesa recibir.

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

As you interact with the scene, whether by mouse, touch, or other controllers, these events will fire. In the scene we can make our box’s opacity change based on whether the user is pointing at it.

    _onSelected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 1;
    }

    _onDeselected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 0.5;
    }

Para que esto funcione, debemos asegurarnos de decirle a Three.js que el material de la caja debería admitir la transparencia.

    this._box.material.transparent = true;

Eso debería cubrir las interacciones con mouse y táctiles. Veamos qué implica agregar un controlador con 3 grados de libertad, como el controlador Daydream.

## Habilita las extensiones de Gamepad API

Existen dos consideraciones importantes para entender cómo usar la Gamepad API en WebVR hoy:

* En Chrome 56 necesitarás habilitar el indicador Gamepad Extensions en `chrome://flags`. Si tienes un [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md), Gamepad Extensions ya estará habilitado junto con las WebVR API. **Necesitarás el que el indicador esté habilitado para el desarrollo local**.

* La información de la pose para el controlador para juegos (que es como obtienes acceso a esos 3 grados de libertad) **solo se habilita luego de que el usuario presione un botón en su controlador de RV**.

Ya que el usuario necesita interactuar antes de que podamos mostrarle un puntero en la escena, será necesario pedirle que presione un botón de su controlador. El mejor momento para hacer eso es luego de que comencemos a enviar la presentación a las gafas de realidad virtual (HMD).

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

Normalmente, pensarías usar elementos HTML para mostrar este tipo de información a los usuarios, pero las HDM muestran un contexto de WebGL (y nada más), por lo que debemos colocar el mensaje allí. Three.js tiene una [Sprite primitive](https://threejs.org/docs/#Reference/Objects/Sprite) que siempre mirará hacia la cámara (lo que comúnmente se llama "Billboarding"), y en la cual podemos dibujar una imagen.

![Mensaje para presionar un botón que se muestra a los usuarios](./img/press-a-button.jpg)

El código para hacer eso se ve similar al siguiente.

    _showPressButtonModal () {
      // Get the message texture, but disable mipmapping so it doesn't look blurry.
      const map = new THREE.TextureLoader().load('./images/press-button.jpg');
      map.generateMipmaps = false;
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;

      // Create the sprite and place it into the scene.
      const material = new THREE.SpriteMaterial({
        map, color: 0xFFFFFF
      });

      this._modal = new THREE.Sprite(material);
      this._modal.position.z = -4;
      this._modal.scale.x = 2;
      this._modal.scale.y = 2;
      this._scene.add(this._modal);

      // Finally set a flag so we can pick this up in the _render function.
      this._isShowingPressButtonModal = true;
    }

Finalmente, en la función `_render` podemos ver interacciones y usar eso para esconder el modal. También necesitamos decirle a Ray Input cuándo actualizar, del mismo modo en que llamamos a `submitFrame()` en las HMD para que vacíe el lienzo.

    _render () {
      if (this._rayInput) {
        if (this._isShowingPressButtonModal &&
            this._rayInput.controller.wasGamepadPressed) {
          this._hidePressButtonModal();
        }

        this._rayInput.update();

      }
      …
    }

## Agrega la malla del puntero a la escena

Además de permitir interacciones, es muy probable que queramos mostrar algo al usuario que indique hacia dónde apunta. Ray Input proporciona una malla que puedes agregar a tu escena para lograr justamente eso.

    this._scene.add(this._rayInput.getMesh());

Con esto, obtenemos una retícula para las HMD sin libertad de movimiento en sus controladores (como Cardboard) y un rayo tipo haz para las que sí cuentan con libertad de movimiento. Para mouse y entrada táctil no se muestran retículas.

![Un haz de rayo que muestra la entrada en una escena de WebVR](./img/ray-input.jpg)

## Consideraciones finales

Debes tener en cuenta algunos aspectos cuando agregas entradas a tus experiencias.

* **Deberías adoptar las mejoras progresivas.** Ya que una persona podría pretender usar lo que creaste con cualquiera de las nuevas versiones de entradas de la lista, deberías esforzarte para planear tu IU de forma que pueda adaptarse correctamente entre distintos tipos. Donde sea posible, prueba varios dispositivos y entradas para maximizar lo que puedes abarcar.

* **Las entradas pueden no ser perfectamente precisas.** El controlador Daydream, en particular, tiene 3 niveles de libertad, pero opera en un espacio que admite 6. Eso significa que aunque su orientación es correcta, su posición en un espacio 3D debe suponerse. Para compensar esto, tal vez sea conveniente que agrandes los objetivos de la entrada y te asegures de tener los espacios adecuados para evitar confusiones.

Es vital agregar una entrada a tu escena para lograr una experiencia envolvente, y con [Ray Input](https://github.com/borismus/ray-input) es mucho más fácil comenzar.

¡Cuéntanos cómo lo haces!



{# wf_devsite_translation #}
