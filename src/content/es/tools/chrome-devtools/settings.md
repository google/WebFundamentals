project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Cambia la apariencia de DevTools y accede a funciones ocultas.

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# Configura y personaliza DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Cambia la apariencia de DevTools y accede a funciones 
ocultas.


### TL;DR {: .hide-from-toc }
- Abre el menú principal y el menú Settings.
- Personaliza la apariencia de DevTools.
- Accede a funciones ocultas.


## Abre el menú principal {:#main-menu}

El **menú principal** de DevTools es un menú desplegable que permite configurar la apariencia de
DevTools, acceder a herramientas adicionales y abrir el menú Settings, entre otras opciones.

Para abrir el menú principal, haz clic en el botón **Main Menu** en la parte superior derecha
de la ventana de DevTools.

![menú principal](images/main-menu.png)

## Abre las configuraciones {:#settings}

Para abrir el menú Settings de DevTools, presiona <kbd>F1</kbd> mientras DevTools esté en foco
o [abre el menú principal](#main-menu) y selecciona **Settings**.

## Abre el menú Command {:#command-menu}

Presiona <kbd>Cmd</kbd> + <kbd>Mayúscula</kbd> + <kbd>P</kbd> (Mac) o
<kbd>Ctrl</kbd>+<kbd>Mayúscula</kbd>+<kbd>P</kbd> (Windows y Linux) para abrir el menú
Command.

![menú Command](images/command-menu.png)

## Cambia el orden de las pestañas de los paneles {:#panel-tabs}

Haz clic en una pestaña del panel, mantén presionado el botón y arrástrala para cambiar su ubicación. El orden personalizado de las pestañas
se mantiene entre una sesión de DevTools y otra.

Por ejemplo, de manera predeterminada, la pestaña **Network** es, por lo general, la cuarta desde la izquierda.

![antes de cambiar el orden](images/before-reorder.png)

Puedes arrastrarla a cualquier ubicación; por ejemplo, la primera de la izquierda.

![después de cambiar el orden](images/after-reorder.png)

## Personaliza la ubicación de DevTools {:#placement}

Puedes acoplar DevTools al final o a la derecha de la página, 
o bien abrirlo en una ventana nueva. 

Para cambiar la ubicación de DevTools, [abre el menú principal](#main-menu) y selecciona el botón de 
**desacoplamiento hacia una ventana separada** 
(![botón de desacoplamiento](images/undock.png){:.inline}),
**Acoplamiento en la parte inferior** 
(![botón de acoplamiento en la parte inferior](images/dock-bottom.png){:.inline})
o 
**Acoplamiento a la derecha** 
(![botón de acoplamiento a la derecha](images/dock-right.png){:.inline}).
 

## Usar el tema oscuro {:#dark-theme}

Para usar el tema oscuro de DevTools, [abre Settings de DevTools](#settings),
ve a la página **Preferences**, busca la sección **Appearance** y, a continuación,
selecciona **Dark** en el menú desplegable **Theme**.

![tema oscuro](images/dark-theme.png)

## Abre y cierra pestañas de panel lateral {:#drawer-tabs}

Presiona <kbd>Esc</kbd> para cerrar y abrir el **panel lateral** de DevTools. En la captura de
pantalla siguiente, se muestra un ejemplo del panel **Elements** mientras el panel lateral de **Console**
está abierto en la parte inferior.

![panel Elements y panel lateral](images/drawer.png)

Desde el panel lateral, puedes ejecutar comandos en Console, ver Animation 
Inspector, establecer las condiciones de la red y la configuración de representación, buscar 
strings y archivos, y emular sensores móviles.

Con el panel lateral abierto, haz clic en el ícono de tres puntos
(![ícono de tres puntos](images/three-dot.png){:.inline}) a la izquierda de la pestaña 
**Console** y selecciona una de las opciones del menú desplegable para abrir las
otras pestañas.

![menú de pestañas del panel lateral](images/drawer-tabs.png)

## Habilita Experiments {:#experiments}

Cuando se habilita Experiments en DevTools, aparece una página nueva denominada **Experiments**
en Settings de DevTools. Desde esta página, puedes habilitar e inhabilitar
características de experimentación.

Para habilitar Experiments, ve a `chrome://flags/#enable-devtools-experiments`
y haz clic en **Enable**. Haz clic en el botón **Relaunch Now**, que se encuentra al final de la
página. 

Verás una página nueva llamada **Experiments** cuando abras Settings de
DevTools.

![Experiments de DevTools](images/experiments.png)

## Emula medios de impresión {:#emulate-print-media}

Para ver una página en el modo de vista previa de impresión, [abre el menú principal de 
DevTools](#main-menu), selecciona **More Tools** > **Rendering Settings** y, a continuación, 
habilita la casilla de verificación **emulate media** con el menú desplegable establecido en **print**.

![habilitación del modo de vista previa de impresión](images/emulate-print-media.png)

## Muestra comentarios HTML {: #show-html-comments }

Para mostrar u ocultar comentarios HTML en el panel **Elements**, [abre
**Settings**](#settings), ve al panel **Preferences**, busca la sección
**Elements**, y activa o desactiva a casilla de verificación **Show HTML comments**.


{# wf_devsite_translation #}
