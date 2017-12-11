project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecciona y edita el código HTML y la CSS de las páginas.

{# wf_updated_on: 2016-01-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecciona y edita páginas y estilos {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecciona y edita en tiempo real el código HTML y la CSS de una página con 
el panel Elements de Chrome DevTools.

![panel Elements de Chrome DevTools](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- Inspecciona y edita sobre la marcha cualquier elemento del árbol del DOM en el panel Elements.
- Visualiza y cambia las reglas de CSS que se aplican a cualquier elemento seleccionado en el subpanel Styles.
- Visualiza y edita el modelo de cuadro de un elemento seleccionado en el subpanel Computed.
- Visualiza los cambios realizados en tu página localmente en el panel Sources.


## Edita en tiempo real un nodo del DOM

Para editar en tiempo real un nodo del DOM, simplemente haz doble clic en el 
[elemento seleccionado](#inspect-an-element) y realiza los cambios:

<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

En la vista del árbol del DOM, se muestra el estado actual del árbol; es posible que, por diferentes motivos, no coincida con el 
código HTML que se cargó originalmente. Por ejemplo, 
puedes modificar el árbol del DOM con JavaScript; el motor del navegador puede intentar 
corregir un lenguaje de marcado de un autor no válido y generar un DOM inesperado.

## Edita un estilo en tiempo real

Puedes editar en tiempo real nombres y valores de propiedades en el subpanel **Styles**. Todos
los estilos se pueden editar, a excepción de los que están atenuados (como sucede
con las hojas de estilo del usuario-agente).

Para editar un nombre o un valor, haz clic, realiza los cambios y presiona
<kbd class="kbd">Tab</kbd> o <kbd class="kbd">Entrar</kbd> para guardar el cambio.

![editar nombre de la propiedad](imgs/edit-property-name.png)

De manera predeterminada, las modificaciones en la CSS no son permanentes y los cambios se pierden 
cuando vuelves a cargar la página. Configura la [autoría 
persistente](/web/tools/setup/setup-workflow) si deseas que los cambios persistan cada vez que 
se cargue la página. 

## Examina y edita parámetros de modelos de cuadros

Examina y edita los parámetros del modelo de cuadro del elemento actual con el 
**subpanel Computed**. Todos los valores del modelo de cuadro se pueden editar; simplemente debes hacer clic 
en ellos.

![subpanel Computed](imgs/computed-pane.png)

Los rectángulos concéntricos contienen los valores **top**, **bottom**, **left**y **right**
para las propiedades **padding**, **border** y **margin**
del elemento actual. 

Para los elementos con una posición no estática, también se muestra un rectángulo de **posición**, 
que contiene los valores de las propiedades **top**, 
**right**, **bottom** y **left**.

![elemento computarizado no estático](imgs/computed-non-static.png)

En los elementos `position: fixed` y `position: absolute`, el campo 
central contiene las dimensiones de los píxeles reales **offsetWidth × offsetHeight** 
del elemento seleccionado. Todos los valores se pueden modificar haciendo doble clic en 
ellos, como los valores de las propiedades en el subpanel Styles. No se garantiza, sin embargo, que los 
cambios tengan efecto, ya que esto depende de las características específicas 
de posicionamiento del elemento concreto.

![elemento computarizado fijo](imgs/computed-fixed.png)

## Visualiza cambios locales

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

Para ver el historial de las ediciones en tiempo real efectuadas en la página, realiza lo siguiente:

1. En el subpanel **Styles**, haz clic en el archivo que modificaste. DevTools
   te dirige al panel **Sources**.
1. Haz clic con el botón secundario en el archivo.
1. Selecciona **Local modifications**.

Para explorar los cambios realizados, sigue estos pasos:

* Expande los nombres de los archivos de nivel superior para ver la hora 
  ![hora de la modificación](imgs/image_25.png){:.inline} 
  en que se realizó una modificación.
* Expande los elementos de segundo nivel para ver una 
  [diferencia](https://en.wikipedia.org/wiki/Diff) (antes y después) 
  que corresponda a la modificación. Una línea con fondo rosa indica 
  una eliminación, mientras que una con fondo verde indica una adición.

## Deshaz los cambios

Si no [configuraste la autoría persistente](/web/tools/setup/setup-workflow), 
cada vez que vuelves a cargar una página, todos los cambios en tiempo real se pierden.

Suponiendo que configuraste la autoría persistente, esto es lo que debes hacer para deshacer los cambios:

* Usa <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) o 
  <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) para deshacer 
  rápidamente los cambios menores del DOM o los estilos mediante el panel Elements.

* Para deshacer todas las modificaciones realizadas en un archivo, abre el panel **Sources** 
  y selecciona **revert** junto al nombre del archivo.

[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
