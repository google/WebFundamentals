project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: All of the ways that you can open Chrome DevTools.

{# wf_updated_on: 2018-12-14 #} {# wf_published_on: 2018-12-14 #} {#
wf_blink_components: Platform>DevTools #}

# Abrir Chrome DevTools {: .page-title}

{% include "web / _shared / contributors / kaycebasques.html"%}

Hay muchas maneras de abrir las herramientas de desarrollo de Chrome, ya que
diferentes tipos de usuarios desean un acceso rápido a diferentes partes de la
interfaz de usuario de herramientas de desarrollo (DevTools).

## Abra el panel Elementos para inspeccionar el DOM o CSS {: #elements}

Cuando desee inspeccionar los estilos o atributos de un nodo DOM, haga clic con
el botón derecho del raton en el elemento y seleccione **Inspeccionar**.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/inspect.png?raw=true"
alt="The Inspect option">
  <figcaption>
    <b>Figure 1</b>. The <b>Inspect</b> option
  </figcaption>
</figure>

O presione <kbd>Comando</kbd> + <kbd>Opción</kbd> + <kbd>C</kbd> (Mac) o
<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> (Windows, Linux, Chrome
OS).

Consulte [Comenzar a ver y cambiar CSS](/web/tools/chrome-devtools/css/).

## Abrir el panel de la Consola para ver los mensajes de debugeo o ejecute JavaScript {: #console}

Presione <kbd>Comando</kbd> + <kbd>Opción</kbd> + <kbd>J</kbd> (Mac) o
<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> (Windows, Linux, Chrome OS)
para saltar directamente al panel de la **consola** .

Consulte [Empezando a trabajar con la
Consola](/web/tools/chrome-devtools/console/get-started).

## Reabrir el último panel abierto {: #last}

Presione <kbd>Comando</kbd> + <kbd>Opción</kbd> + <kbd>I</kbd> (Mac) o
<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>I.</kbd>

## Abrir DevTools desde el menú principal de Chrome {: #chrome}

Haga clic en **Personalizar y controlar Google Chrome** ![Personaliza y controla
Google
Chrome](https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/shared/main-menu.png?raw=true)
{: .inline-icon} y luego seleccione **Más herramientas** > **Herramientas del
desarrollador** .

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/open-from-main.png?raw=true"
alt="Opening DevTools from Chrome's main menu.">
  <figcaption>
    <b>Figure 2</b>. Opening DevTools from Chrome's main menu
  </figcaption>
</figure>

## Abrir DevTools automáticamente en cada nueva pestaña {: #auto}

Abra Chrome desde la línea de comandos y pase el `--auto-open-devtools-for-tabs`
.

Mac:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs
```

## Comentarios {: #feedback .hide-from-toc}

{% include "web / _shared / helpful.html"%}
