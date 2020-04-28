project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: All of the ways that you can open Chrome DevTools.

{# wf_updated_on: 2018-12-14 #}
{# wf_published_on: 2018-12-14 #}
{# wf_blink_components: Platform>DevTools #}

# Abrir Chrome DevTools {: .page-title}

{% include "web / _shared / contributors / kaycebasques.html"%}

There are many ways to open Chrome DevTools, because different users want fast
access to different
parts of the DevTools UI.

## Open the Elements panel to inspect the DOM or CSS {: #elements }

When you want to inspect a DOM node's styles or attributes, right-click the
element
and select **Inspect**.

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

See [Get Started With Viewing And Changing
CSS](/web/tools/chrome-devtools/css/).

## Open the Console panel to view logged messages or run JavaScript {: #console }

Presione <kbd>Comando</kbd> + <kbd>Opción</kbd> + <kbd>J</kbd> (Mac) o
<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> (Windows, Linux, Chrome OS)
para saltar directamente al panel de la **consola** .

See [Get Started With The
Console](/web/tools/chrome-devtools/console/get-started).

## Open the last panel you had open {: #last }

Presione <kbd>Comando</kbd> + <kbd>Opción</kbd> + <kbd>I</kbd> (Mac) o
<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>I.</kbd>

## Open DevTools from Chrome's main menu {: #chrome }

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

## Auto-open DevTools on every new tab {: #auto }

Abra Chrome desde la línea de comandos y pase el `--auto-open-devtools-for-tabs`
.

Mac:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs
```

## Comentarios {: #feedback .hide-from-toc}

{% include "web / _shared / helpful.html"%}
