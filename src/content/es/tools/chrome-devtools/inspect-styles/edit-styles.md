project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa el panel Styles en Chrome DevTools para inspeccionar y modificar los estilos de CSS asociados a un elemento.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Editar estilos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Usa el panel <strong>Styles</strong> para modificar los estilos de CSS
asociados a un elemento.

![panel Styles](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- El panel Styles te permite cambiar tu CSS localmente en todas las maneras posibles: editar estilos actuales, agregar estilos nuevos, agregar reglas para los estilos.
- Si deseas que los estilos se conserven (de manera tal que no se eliminen cuando se vuelve a cargar la página), necesitas conservarlos en tu espacio de trabajo de desarrollo.


## Inspeccionar estilos aplicados a un elemento

[Selecciona un elemento](edit-dom#inspect-an-element) para inspeccionar sus estilos.
El subpanel **Styles** muestra las reglas de CSS que se aplican al elemento seleccionado, 
de la prioridad más alta a la más baja:

* En la parte superior, se encuentra `element.style`. Estos estilos se aplican directamente al 
  elemento con la propiedad de estilo (por ejemplo, 
  `<p style="color:green">`) y otros se aplican en DevTools.

* Debajo de eso, se encuentran todas las reglas de CSS que coinciden con el elemento. Por ejemplo, en
  la captura de pantalla que se muestra a continuación, el elemento seleccionado recibe `line-height:24px` de
  una regla definida en `tools.css`.

* Debajo de eso, se encuentran los estilos heredados, los cuales incluyen todas las reglas de estilo
  heredables que coinciden con los antecesores del elemento seleccionado. Por ejemplo, en la captura de pantalla que se muestra
  a continuación, el elemento seleccionado hereda `display:list-item` de
  `user agent stylesheet`.

Las etiquetas en la imagen que se muestra a continuación corresponden a los elementos numerados debajo de ella.

![panel Annotated Styles](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. Estilos asociados con un selector que coincide con el elemento.
2. [Hojas de estilo usuario-agente](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)
   se etiquetan de manera clara y suelen ser reemplazadas por CSS en tu página web.
3. Las reglas que han sido reemplazadas por las **reglas en cascada** se muestran con
   texto tachado.
4. Los estilos **heredados** se muestran como un grupo bajo el encabezado "Inherited
   from `<NODE>`" . Haz clic en el nodo del DOM en el título para navegar hasta
   su posición en la vista de árbol del DOM. (La [tabla de propiedades de CSS 2.1](http://www.w3.org/TR/CSS21/propidx.html) muestra las propiedades
   que son heredables.)
5. Las entradas de color gris son reglas que no están definidas sino que
   **se computan en tiempo de ejecución**.

Es esencial entender cómo funcionan la cascada y la herencia para
depurar tus estilos. La cascada se relaciona con la manera en que se asigna importancia a las declaraciones de CSS
para determinar las reglas que tienen precedencia cuando se superponen con otra regla. La herencia se relaciona con la manera en que los elementos HTML heredan propiedades de la
CSS de los elementos que los contienen (antecesores). Para obtener más información,
consulta [Documentación W3C sobre cascadas](http://www.w3.org/TR/CSS2/cascade.html).

## Inspeccionar elementos afectados por un selector

Desplaza tu mouse sobre un selector de CSS en el panel **Styles** para ver todos los
elementos afectados por el selector. Por ejemplo, en la captura de pantalla a 
continuación, el mouse se desplaza sobre el selector 
`.wf-tools-guide__section-link a`. En la página en vivo puedes ver todos los 
`<a>` elementos afectados por el selector. 

![ver elementos afectados por el selector](imgs/selector-hover.png)

**Nota**: esta función solo destaca elementos en la ventana de visualización; es posible 
que otros elementos fuera de la ventana de visualización también estén afectados por el selector. 

## Agregar, habilitar e inhabilitar clases de CSS {:#classes}

Haz clic en el botón **.cls** para ver todas las clases de CSS asociadas con el
elemento seleccionado actualmente. Desde allí, puedes hacer lo siguiente:

* habilitar o inhabilitar las clases asociadas actualmente al elemento;
* agregar nuevas clases al elemento. 

![panel classes](imgs/classes.png)

## Editar un nombre o valor de propiedad existente

Haz clic en el nombre o valor de una propiedad de CSS para editarlo. Mientras el nombre o el valor estén 
destacados, presiona <kbd>Tab</kbd> para pasar a la propiedad, al nombre
o al selector siguiente. Mantén presionada la tecla <kbd>Shift</kbd> y presiona <kbd>Tab</kbd> para moverte hacia atrás.

Cuando editas el valor numérico de una propiedad de CSS, auméntalo o disminúyelo con las 
siguientes combinaciones de teclas:

* <kbd>Arriba</kbd> y <kbd>Abajo</kbd> para aplicar un aumento o una disminución de 1
  o de .1, si el valor actual oscila entre  -1 y 1.
* <kbd>Alt</kbd>+<kbd>Arriba</kbd> y <kbd>Alt</kbd>+<kbd>Abajo</kbd> para 
  aplicar un aumento o una disminución de 0,1 al valor.
* <kbd>Mayús</kbd>+<kbd>Arriba</kbd> para aplicar un aumento de 10 al valor y 
  <kbd>Mayús</kbd> +<kbd>Abajo</kbd> para aplicar una disminución de 10 al valor.
* <kbd>Mayús</kbd> + <kbd>Repág</kbd> (Windows, Linux) o 
  <kbd>Mayús</kbd>+ <kbd>Función</kbd> + <kbd>Arriba</kbd> (Mac) para aplicar un aumento de 
  100 al valor. <kbd>Mayús</kbd> + <kbd>Avpág</kbd> (Windows, Linux) o 
  <kbd>Mayús</kbd>+ <kbd>Función</kbd>+<kbd>Abajo</kbd> (Mac) para aplicar una disminución 
  de 100 al valor. 

## Agregar una nueva declaración de propiedad

Haz clic en un espacio vacío dentro de una regla de CSS editable para crear una declaración nueva.
Escríbela o pega la CSS en el subpanel **Styles**. Las propiedades y sus 
valores se analizan e ingresan en los campos correctos.

Note: para habilitar o inhabilitar una declaración de estilo, selecciona o desmarca la casilla de verificación al lado de ella.

## Agregar una regla de estilo

Haz clic en el botón **New Style Rule** 
(![botón new style rule](imgs/new-style-rule.png){:.inline}) para agregar una 
nueva regla de CSS. 

Mantén presionado el botón para elegir la hoja de estilo que se agregará. 

## Agregar o eliminar estilos dinámicos (seudoclases) {:#pseudo-classes}

Puedes establecer selectores de seudoclases dinámicos (tales como`:active`, 
`:focus`, `:hover` y `:visited`) en los elementos. 

Existen tres maneras de establecer estos estados dinámicos en un elemento:

* Haz clic con el botón secundario en un elemento dentro del panel **Elements** y selecciona
  la seudoclase de destino del menú para habilitarla o deshabilitarla.
  
  ![hacer clic con el botón secundario en un elemento 
  para habilitar el selector de seudoclase](imgs/pseudoclass-rightclick.png)

* Selecciona un elemento en el panel **Elements** , haz clic en el botón **:hov** 
  en el panel **Styles** y usa las casillas de verificación para habilitar o inhabilitar los 
  selectores  para el elemento seleccionado actualmente.

  ![panel :hov](imgs/hov.png)

## Agregar color de fondo o color a una regla de estilo

El panel **Styles** proporciona una combinación de teclas para agregar declaraciones de `color` y
`background-color` a una regla de estilo.

En la parte inferior derecha de la regla de estilo aparece el ícono de tres puntos. Necesitas 
desplazarte sobre la regla de estilo para verla.

![ícono de tres puntos en la regla establecida](imgs/rule-set-three-dots-icon.png)

Desplázate sobre este ícono a fin de revelar botones para agregar una declaración de `color` 
(![agregar declaración de color](imgs/add-color.png){:.inline})
o una declaración de `background-color` (![agregar declaración de color 
de fondo](imgs/add-background-color.png){:.inline}). Haz clic en uno de estos botones
para agregar la declaración a la regla de estilos. 

## Modificar colores con el Selector de colores {:#color-picker}

Para abrir el **Selector de colores**, encuentra una declaración de CSS en el panel **Styles**  
que defina un color (como `color: blue`). A la derecha del valor de la 
declaración se encuentra un cuadrado pequeño de color. El color del cuadrado coincide con el 
valor de la declaración. Haz clic en este pequeño cuadrado para abrir el **Selector de colores**.

![abrir el selector de colores](imgs/open-color-picker.jpg)

Puedes interactuar con el **Selector de colores** de diferentes maneras:

1. **Cuentagotas**: consulta la sección [Cuentagotas](#eyedropper) para obtener más información.
2. **Color actual**: una representación visual del **valor actual**.
3. **Valor actual**: la representación hexadecimal, RGBA o HSL del 
   **color actual**.
4. **Paleta de colores**: para más información, consulta [Paleta de colores](#color-palettes).

5. **Selector de tonos y sombras**.
6. **Selector de matices**.
7. **Selector de opacidad**.
8. **Selector del valor del color**: haz clic para activar o desactivar RGBA, HSL y
   hexadecimal.
9. **Selector de la paleta de colores**: haz clic para seleccionar plantillas diferentes.

![selector de colores anotado](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### Cuentagotas {:#eyedropper}

Haz clic en el botón **eyedropper** para habilitarlo
(![cuentagotas habilitado](imgs/eyedropper-enabled.png){:.inline}), desplázate sobre un
color en la página en vivo y luego haz clic para establecer el valor de la declaración
seleccionada actualmente en el color por el que te desplazas.

![el cuentagotas en acción](imgs/eyedropper.jpg)

### Paletas de colores {:#color-palettes}

El **Selector de colores** proporciona las siguientes paletas de colores:

* **Page Colors**: conjunto de colores generado automáticamente a partir de la 
  CSS de la página.
* **Material Design**: colección de colores que coincide con las 
  [especificaciones de Material Design][md]. 
* **Custom**: conjunto de colores que eliges. DevTools guarda la paleta 
  personalizada, incluso entre páginas, hasta que la borres. 

#### Modificar una paleta de colores personalizada {:#custom-color-palette}

Presiona el botón **plus sign** para agregar el color actual a la paleta.
Mantén presionado un color para arrastrarlo a otra posición o arrástralo 
al ícono de la **papelera** para borrarlo. Haz clic con el botón secundario en un color y selecciona
**Remove color** para borrarlo. Selecciona **Remove all to the right** para borrar
todos los colores a la derecha del color seleccionado actualmente. Haz clic con el botón secundario
en cualquier lugar dentro de la región de la paleta de colores y selecciona **Clear template** para 
borrar todos los colores de la plantilla.

## Ver y editar propiedades personalizadas de CSS (variables de CSS) {:#custom-properties}

Puedes ver y editar declaraciones que definen o usan [propiedades 
personalizadas de CSS][intro] (conocidas informalmente como variables de CSS) al igual que cualquier otra 
declaración. 

Las propiedades personalizadas suelen [definirse][def] en el selector `:root`.
 Para ver una propiedad personalizada definida en `:root`, inspecciona el elemento `html`.


![propiedad personalizada definida en :root](imgs/css-var-defined-on-root.png)

Las propiedades personalizadas no necesariamente deben definirse en el selector `:root`; sin embargo,
si la definiste en cualquier otro lugar, inspecciona el elemento en el que se definió
para ver la definición.

Puedes ver y editar los valores de la declaración que usan propiedades personalizadas al igual
que cualquier otro valor de una declaración. 

Si ves un valor de una declaración como `var(--main-color)`, como en la captura de pantalla
a continuación, significa que en la declaración se usan propiedades personalizadas. Estos
valores se pueden editar como cualquier otro valor de una declaración. En la actualidad no existe
manera de pasar a la definición de propiedad personalizada.

![usar una propiedad personalizada](imgs/css-var-in-use.png)

[intro]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## Editar Sass, Less o Stylus

Si usas Sass, Less, Stylus o cualquier otro preprocesador de CSS, editar los archivos de salida de CSS generados en el editor Styles no te servirá ya que no se asignan a tu fuente original.

Con los mapas de origen de CSS, DevTools puede asignar automáticamente los archivos generados a los archivos de origen originales, que te permite editarlos en vivo en el panel Sources y ver los resultados sin tener que abandonar DevTools ni actualizar la página. 

### El flujo de trabajo del preprocesador

Cuando inspeccionas un elemento cuyos estilos son proporcionados por un archivo CSS generado, el panel Elements muestra un vínculo con el archivo de origen original, no el archivo CSS generado.

![panel Elements que muestra la hoja de estilo .scss](imgs/sass-debugging.png)

Para pasar al archivo de origen:

1. Haz clic en el vínculo para abrir el archivo de origen (editable) en el panel Sources.
2. <kbd class="kbd">Ctrl</kbd> + **Clic** (o <kbd class="kbd">Cmd</kbd> + **clic**) en cualquier nombre o valor de propiedad de CSS para abrir el archivo de origen y pasar a la línea apropiada.

![panel Sources que muestra el archivo .scss](imgs/sass-sources.png)

Cuando guardas los cambios en un archivo del preprocesador de CSS en DevTools, el preprocesador de CSS debe regenerar los archivos de CSS. Luego, DevTools vuelve a cargar el archivo CSS recientemente generado.

### Habilitar/Inhabilitar mapas de origen y recarga automática de CSS

**Los mapas de origen de CSS están habilitados de manera predeterminada**. Puedes optar por habilitar la recarga automática de los archivos CSS generados. Para habilitar los mapas de origen de CSS y la recarga de CSS:

1. Abre DevTools Settings y haz clic en **General**.
2. Activa **Enable CSS source maps** y **Auto-reload generated CSS**.

### Requisitos y trampas

- DevTools recién detecta **los cambios realizados en un editor externo** cuando la pestaña Sources que contiene el archivo de origen asociado vuelve a estar a la vista.
- **La edición manual de un archivo CSS** generado por Sass, Less u otro compilador romperá la asociación del mapa de origen hasta que se vuelva a cargar la página.
- **¿Usas <a href="/web/tools/setup/setup-workflow">espacios de trabajo</a>?** Asegúrate de que el archivo CSS también esté asignado en el espacio de trabajo. Puedes verificarlo en el árbol de la derecha del panel Sources. Allí puedes ver si el archivo CSS proviene de tu carpeta local.
- **Para que DevTools vuelva a cargar automáticamente los estilos** cuando cambies el archivo de origen, debes configurar el preprocesador para que regenere los archivos CSS cuando un archivo de origen cambia. De lo contrario, debes regenerar los archivos CSS manualmente y volver a cargar la página para ver los cambios.
- **Debes acceder al sitio o a la app desde un servidor web** (en lugar de un **archivo://** URL) y el servidor debe proporcionar los archivos CSS, al igual que los mapas de origen (.css.map) y los archivos de origen (.scss, etc.).
- Si _no_ usas la función Workspaces, el servidor web también debe proporcionar el encabezado `Last-Modified`.

Aprende cómo configurar mapas de origen en [Configurar preprocesadores de CSS y JS](/web/tools/setup/setup-preprocessors).




{# wf_devsite_translation #}
