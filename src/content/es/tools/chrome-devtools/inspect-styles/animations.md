project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecciona y modifica las animaciones con Animation Inspector de Chrome DevTools.

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# Inspeccionar animaciones {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecciona y modifica animaciones con Animation Inspector
de Chrome DevTools.

![inspector de animaciones](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- Captura animaciones abriendo Animation Inspector. Detecta automáticamente animaciones y las organiza en grupos.
- Inspecciona las animaciones reduciendo su velocidad, reproduciéndolas nuevamente o viendo su código fuente.
- Modifica las animaciones cambiando su sincronización, retraso y duración o los desplazamientos de sus fotogramas claves.


## Información general {:#overview}

Animation Inspector de Chrome DevTools tiene dos objetivos principales. 

* Inspeccionar animaciones: si deseas someter a reducción de velocidad, volver a reproducir o inspeccionar el 
  código fuente de un grupo de animaciones. 
* Modificar animaciones: si deseas modificar la sincronización, el retraso, la duración o los desplazamientos de 
    los fotogramas claves de una animación. La edición de curvas Bézier y de fotogramas claves 
  no son compatibles por el momento. 

Animation Inspector es compatible con animaciones de CSS,
transiciones de CSS y animaciones web. Las animaciones `requestAnimationFrame` 
no son compatibles por el momento.

### ¿Qué es un grupo de animación?

Un grupo de animación es un grupo de animaciones que 
*parecen* estar relacionadas entre sí. Actualmente, en la Web no existe un concepto real
de un grupo de animaciones, por lo cual los diseñadores de movimiento y los desarrolladores deben componer 
y sincronizar animaciones individuales para que transmitan el aspecto de un efecto visual 
coherente. Animation Inspector predice qué animaciones están relacionadas según la 
hora de inicio (sin tener en cuenta los retrasos, etc.) y las agrupa una al lado de la otra.
En otras palabras, se agrupa un conjunto de animaciones que se desencadenan en el mismo bloque de secuencia de 
comandos. Sin embargo, si son asincrónicas 
se agrupan por separado. 

## Primeros pasos

Existen dos maneras para abrir Animation Inspector:

* Dirígete al subpanel **Styles** (en el panel **Elements**) y presiona el botón 
  **Animations** (![botón 
  animations](imgs/animations-button.png){:.inline}). 
* Abre el menú de comandos y escribe `Drawer: Show Animations`. 

Animation Inspector se abrirá como una pestaña junto al panel lateral Console. Debido a que
es una pestaña de un panel lateral, puedes usarla desde cualquier panel de DevTools. 

![Animation Inspector vacío](imgs/empty-ai.png)

Animation Inspector se divide en cuatro secciones principales (o paneles). En esta guía,
nos referimos a cada panel de la siguiente manera:

1. **Controls**. Aquí puedes borrar todos los grupos de animaciones capturadas 
   en el momento o cambiar la velocidad del grupo de animaciones seleccionado.
2. **Overview**: en él podrás seleccionar un grupo de animaciones para inspeccionarlo 
   y modificarlo en el subpanel **Details**.
3. **Timeline**. aquí podrás pausar e iniciar una animación o pasar a un punto específico 
   de la animación.
4. **Details**: podrás inspeccionar y modificar el grupo de animación
   seleccionado en el momento. 

![Animation Inspector con anotación](imgs/annotated-animation-inspector.png)

Para capturar una animación, simplemente efectúa la interacción que la desencadena
mientras Animation Inspector está abierto. Si se activa una animación al cargarse 
la página, puedes ayudar a Animation Inspector a detectar la animación 
volviendo a cargarla. 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## Inspeccionar animaciones {:#inspect}

Una vez que capturas una animación, habrá algunas maneras de reproducirla:

* Desplázate sobre la miniatura de esta en el subpanel **Overview** para obtener una vista previa.
* Selecciona un grupo de animaciones en el subpanel **Overview** (para que se vea en el subpanel
  **Details**) y presiona el botón **replay**
  (![botón replay](imgs/replay-button.png){:.inline}). La animación se vuelve a reproducir
  en la ventana de visualización.
  Haz clic en los botones de **velocidad de la animación** (![botones de velocidad 
  de la animación](imgs/animation-speed-buttons.png){:.inline}) para cambiar la velocidad de la 
  vista previa del grupo de animaciones seleccionado en el momento. Puedes usar la barra vertical 
  roja para cambiar tu posición actual. 
* Haz clic en la barra vertical roja y arrástrala para mover el cabezal de reproducción de la animación en la ventana de visualización. 

### Ver detalles de la animación

Cuando hayas capturado un grupo de animaciones, haz clic en él desde el panel **Overview** 
para ver los detalles. En el panel **Details**, cada animación individual tiene
su propia fila. 

![detalles de un grupo de animaciones](imgs/animation-group-details.png)

Desplázate sobre una animación para destacarla en la ventana de visualización. Haz clic en la animación
para seleccionarla en el panel **Elements**. 

![desplázate sobre una animación para destacarla en 
la ventana de visualización](imgs/highlight-animation.png)

La sección más oscura de una animación y que está más a la izquierda es su definición. La sección
a la derecha y más difusa representa las iteraciones. Por ejemplo, en la 
captura de pantalla a continuación, las secciones dos y tres representan iteraciones de la sección uno. 

![diagrama de iteraciones de una animación](imgs/animation-iterations.png)

Si se aplicó la misma animación a dos elementos, Animation 
Inspector les asigna el mismo color. El color es aleatorio y 
no tiene importancia.
Por ejemplo, en la captura de pantalla siguiente, a los dos elementos `div.eye.left::after` 
y `div.eye.right::after` se les aplicó la misma animación (`eyes`), 
al igual que a los elementos `div.feet::before` y `div.feet::after`. 

![animaciones con código de color](imgs/color-coded-animations.png)

## Modificar animaciones {:#modify}

Existen tres maneras de modificar una animación con Animation Inspector:

* duración de la animación;
* sincronizaciones de los fotogramas clave;
* retraso de la hora de inicio.

Para esta sección, imagina que la captura de pantalla a continuación representa la animación
original:

![animación original antes de la modificación](imgs/modify-original.png)

Para cambiar la duración de una animación, haz clic en el primer o último círculo 
y arrástralo.

![duración modificada](imgs/modify-duration.png)

Si la animación define reglas de fotogramas claves, estas se representan como
círculos internos blancos. Haz clic en uno de estos y arrástralo para cambiar la sincronización del 
fotograma clave.

![fotograma clave modificado](imgs/modify-keyframe.png)

Para agregar un retraso a una animación, haz clic en ella y arrástrala a cualquier lugar, a excepción de los 
círculos. 

![retraso modificado](imgs/modify-delay.png)


{# wf_devsite_translation #}
