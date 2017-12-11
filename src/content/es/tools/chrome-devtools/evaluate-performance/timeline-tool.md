project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa el panel Timeline de Chrome DevTools para registrar y analizar toda la actividad de tu app mientras se ejecuta. Es el mejor punto de partida para investigar los problemas percibidos sobre el rendimiento de tu app.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-06-08 #}

# Cómo usar la herramienta Timeline {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa el panel <em>Timeline</em> de Chrome DevTools para registrar y 
analizar toda la actividad de tu aplicación mientras se ejecuta. Es el mejor 
punto de partida para investigar los problemas percibidos sobre el rendimiento de tu
app.

![Herramienta Timeline](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- Realiza una grabación en Timeline para analizar cada evento que suceda después de cargar una página o de una interacción del usuario.
- Visualiza solicitudes de FPS, de CPU y de red en el subpanel Overview.
- Haz clic en un evento en Flame Chart para ver información detallada.
- Acerca una sección de una grabación para facilitar el análisis.


## Descripción general del panel Timeline {:#timeline-overview}

El panel Timeline consta de cuatro subpaneles:

1. **Controls**: te permitirá iniciar y detener una grabación, además de 
   configurar la información que debe recopilarse durante esta.
2. **Overview**: presenta resumen general del rendimiento de la página. Se ofrece más información sobre esto 
   a continuación.
3. **Flame Chart**: muestra una visualización del seguimiento de pila de la CPU. 

   Es probable que veas de una a tres líneas de punto verticales en **Flame Chart**. La 
   azul representa el evento `DOMContentLoaded`. La verde representa 
   el tiempo en el que se produjo el primer evento de pintura. La roja representa el evento `load`.

4. **Details**: cuando se selecciona un evento, en este subpanel se muestra más información 
   sobre él. Cuando ningún evento está seleccionado, el subpanel muestra información 
   sobre el marco temporal seleccionado. 

![Panel Timeline con anotaciones](imgs/timeline-annotated.png)

### Subpanel Overview

El subpanel **Overview** consta de tres gráficos:

1. **FPS**. fotogramas por segundo. Cuanto más alta sea la barra verde, mayor será el valor de 
   FPS. Los bloques rojos sobre el gráfico de FPS indican fotogramas largos, que son 
   muy propensos a generar [bloqueos][jank].
2. **CPU**: recursos de CPU. En este [gráfico de área][ac], se indican los tipos de eventos que 
   consumieron recursos de CPU.
3. **NET**: cada barra de color representa un recurso. Cuanto más larga sea la barra, más
   tiempo se necesitará para recuperar el recurso. La parte más clara de cada barra 
   representa el tiempo de espera (el tiempo que transcurre entre la solicitud del recurso
   y la descarga del primer byte). La parte más oscura
   representa el tiempo de transferencia (el tiempo que transcurre entre la descarga del
   primer y último byte).

   Las barras tienen el siguiente código de color:
   <!-- source: https://goo.gl/eANVFf -->
   
   * Los archivos HTML son **<span style="color:hsl(214, 67%, 66%)">azules</span>**.
   * Las secuencias de comandos son **<span style="color:hsl(43, 83%, 64%)">amarillas</span>**.
   * Las hojas de estilo son **<span style="color:hsl(256, 67%, 70%)">púrpuras</span>**.
   * Los archivos de medios son **<span style="color:hsl(109, 33%, 55%)">verdes</span>**.
   * Otros recursos son 
     **<span style="color:hsl(0, 0%, 70%)">grises</span>**.

![Subpanel Overview con anotaciones](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## Realizar una grabación

Para grabar la *carga de una página*, abre el panel **Timeline** y la 
página que deseas grabar, y vuelve a cargar la página. El panel **Timeline** 
graba automáticamente la página que se volvió a cargar.

Para realizar una grabación de una *interacción con una página*, abre el panel **Timeline**. Luego,
inicia la grabación presionando el botón **Record** 
(![botón Record](imgs/record-off.png){:.inline}), o la combinación 
de teclas <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) o <kbd>Ctrl</kbd>+<kbd>E</kbd> 
(Windows/Linux). El botón **Record** adquirirá color rojo durante una grabación. Realiza 
las interacciones con la página, y luego presiona nuevamente el botón **Record** o la 
combinación de teclas para detener la grabación.

Cuando termine la grabación, DevTools evaluará la parte de la grabación que sea más importante
para ti y la mostrará automáticamente.

### Sugerencias de grabación

* **Haz que las grabaciones sean lo más cortas posible**. Las grabaciones más cortas generalmente son más 
  fáciles de analizar.
* **Evita acciones innecesarias**. Evita acciones (clics del mouse, cargas de red, 
  etc.) ajenas a la actividad que desees grabar y analizar.
  Por ejemplo, si deseas grabar eventos que tengan lugar después de hacer clic en el botón 
  Login, no desplaces la página, cargues imágenes ni realices otras actividades.
* **Inhabilita la caché del navegador**. Cuando grabes operaciones de la red, te convendrá 
  inhabilitar la caché del navegador desde el panel Settings de DevTools o
  el panel lateral [**Network conditions**][nc].
* **Inhabilita las extensiones**. Las extensiones de Chrome pueden agregar interferencia no relacionada a las 
  grabaciones de tu aplicación en Timeline. Abre una ventana de Chrome en el 
  [modo de navegación de incógnito][incognito] o crea un nuevo 
  [perfil de usuario de Chrome][new chrome profile] para garantizar que tu entorno
  no tenga extensiones.

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## Ver información de una grabación

Cuando seleccionas un evento en **Flame Chart**, se mostrará 
información adicional sobre el evento en el subpanel **Details**.

![Subpanel Details](imgs/details-pane.png)

Algunas pestañas, como **Summary**, están presentes en todos los tipos de eventos. Otras
solo están disponibles para determinados tipos de eventos. Consulta [Referencia de eventos 
de Timeline][event reference] para obtener información sobre cada tipo de grabación.

[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## Obtener capturas de pantalla durante la grabación {:#filmstrip}

El panel **Timeline** puede tomar capturas de pantalla durante la carga de una página. Esta característica
se denomina **tira de imágenes**.

Para realizar capturas de pantalla de la grabación, habilita la casilla de verificación **Screenshots** en el subpanel **Controls** antes de
realizar una grabación. Las capturas de pantalla se muestran
debajo del subpanel **Overview**.

![Grabación de Timeline con tira de imágenes](imgs/timeline-filmstrip.png)

Desplaza el cursor sobre el subpanel **Screenshots** u **Overview** para ver una 
captura de pantalla ampliada de ese punto de la grabación. Mueve el mouse hacia la izquierda y la
derecha para simular una animación de la grabación.

<video src="animations/hover.mp4" autoplay muted loop controls></video>

## Perfil de JavaScript {:#profile-js}

Habilita la casilla de verificación **JS Profile** antes de realizar una grabación para capturar 
las pilas de JavaScript en la grabación de la línea del tiempo. Cuando el generador de perfiles JS está 
habilitado, en Flame Chart se muestran todas las funciones JavaScript que se llamaron. 

![flame chart con perfil JS habilitado](imgs/js-profile.png)

## Pintura de perfil {:#profile-painting}

Habilita la casilla de verificación **Paint** antes de realizar una grabación para obtener más información
sobre los eventos **Paint**. Cuando la pintura de perfiles está habilitada y haces clic
en un evento **Paint**, se mostrará una nueva pestaña **Paint Profiler** en el subpanel 
**Details**, en la que se presentará información mucho más granular sobre el evento.

![paint profiler](imgs/paint-profiler.png)

### Configuración de la representación {:#rendering-settings}

Abre el menú principal de DevTools y selecciona **More tools** > **Rendering settings**
para acceder a valores de configuración de representación que pueden ser útiles al depurar problemas relacionados con la pintura.
La configuración de la representación se abre como una pestaña junto al panel lateral **Console** (presiona
<kbd>Esc</kbd> para mostrar el panel lateral si está oculto).

![configuraciones de la representación](imgs/rendering-settings.png)

## Buscar registros

Mientras analizas eventos, probablemente te convenga centrarte en un tipo de eventos. Por
ejemplo, tal vez debas ver información detallada sobre cada evento `Parse HTML`. 

Para abrir una barra de herramientas de búsqueda, presiona <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) o <kbd>Ctrl</kbd>+<kbd>F</kbd> 
(Windows/Linux) mientras **Timeline** esté seleccionado.
Escribe el nombre del tipo de evento que desees inspeccionar; por ejemplo, `Event`.

La barra de herramientas solo servirá para el período seleccionado actualmente. Los eventos 
fuera del período seleccionado no se incluyen en los resultados. 

Las flechas hacia arriba y abajo te permiten recorrer cronológicamente los resultados. De esta manera, el
primer resultado representa el primer evento del período seleccionado y
el último resultado representa el último evento. Cada vez que presionas la flecha
hacia arriba o abajo se selecciona un evento nuevo y puedes ver los detalles en el subpanel
**Details**. Presionar las flechas hacia arriba y abajo equivale a hacer clic 
en un evento en **Flame Chart**.

![barra de herramientas de búsqueda](imgs/find-toolbar.png)

## Acerca una sección de Timeline {:#zoom}

Puedes acercar una sección de una grabación para facilitar el análisis. Para acercar
una sección de una grabación se usa el subpanel **Overview**. Después del acercamiento,
**Flame Chart** se acerca automáticamente para coincidir con la misma sección.

![acercar una sección de la grabación de Timeline](imgs/zoom.png)

Para acercar una sección de Timeline, realiza lo siguiente:

* En el subpanel **Overview**, arrastra hacia afuera una selección de la línea de tiempo con el mouse.
* Ajusta los controles deslizantes grises del área de la regla.

Cuando la sección esté seleccionada, podrás usar las teclas <kbd>W</kbd>,<kbd>A</kbd>,
<kbd>S</kbd> y <kbd>D</kbd> para ajustar tu selección. Las teclas <kbd>W</kbd> 
y <kbd>S</kbd> permiten el acercamiento y el alejamiento, respectivamente. <kbd>A</kbd> y 
<kbd>D</kbd> permiten el movimiento hacia la izquierda y la derecha, respectivamente.

## Guardar y cargar grabaciones

Para guardar y abrir grabaciones, haz clic con el botón secundario dentro de los subpaneles 
**Overview** o **Flame Chart**, y selecciona la opción correspondiente.

![guardar y abrir grabaciones](imgs/save-open.png)


{# wf_devsite_translation #}
