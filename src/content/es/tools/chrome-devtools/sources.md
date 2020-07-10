project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Visualización y edición de archivos, creación de fragmentos, depuración de JavaScript y configuración de lugares de trabajo en el panel Sources de Chrome DevTools.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Descripción general del panel Sources {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa el panel **Sources** de Chrome DevTools para hacer lo siguiente:

* [Ver archivos](#files).
* [Editar CSS y JavaScript](#edit).
* [Crear y guardar **fragmentos** de JavaScript](#snippets) que se puedan ejecutar en cualquier página.
  Los **fragmentos** son similares a los bookmarklets.
* [Depurar JavaScript](#debug).
* [Configurar un lugar de trabajo](#workspace) para que los cambios que hagas en DevTools se guardan en el código, en
  tu sistema de archivos.

## Ver archivos {: #files }

Usa el panel **Network** para ver todos los recursos que tiene cargados la página.

<figure>
  <img src="images/sources-network-pane.png"
       alt="Panel Network"/>
  <figcaption>
    <b>Figura 1</b>. Panel <b>Network</b>
  </figcaption>
</figure>

Organización del panel **Network**:

* El nivel superior, como `top` en la <b>Figura 1</b>, representa un [marco HTML][frame].
  Encontrarás `top` en cada página que visites. `top` representa el marco del documento
  principal.
* El segundo nivel, como `developers.google.com` en la <b>Figura 1</b>, representa un
  [origen][origin].
* El tercer nivel, el cuarto nivel, etc., representan directorios y recursos que
  se cargaron desde ese origen. Por ejemplo, en la <b>Figura 1</b>, la ruta de acceso completa al
  recurso `devsite-googler-button` es
  `developers.google.com/_static/f6e16de9fa/css/devsite-googler-button`

[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

Haz clic en un archivo en el panel **Network** para ver su contenido en el panel **Editor**. Puedes
ver cualquier tipo de archivo. En el caso de las imágenes, puedes obtener una vista previa.

<figure>
  <img src="images/sources-editor-pane.png"
       alt="Visualización de un archivo en el panel Editor"/>
  <figcaption>
    <b>Figura 2</b>. Visualización del contenido de <code>jquery-bundle.js</code> en el panel <b>Editor</b>
    .
  </figcaption>
</figure>

## Cómo editar CSS y JavaScript {: #edit }

Usa el panel **Editor** para editar CSS y JavaScript.  DevTools actualiza la
página para ejecutar tu nuevo código. Por ejemplo, si editas el `background-color` de un elemento, ese
cambio se realiza de inmediato.

<figure>
  <img src="images/edit-css.gif"
       alt="Edición de CSS en el panel Editor"/>
  <figcaption>
    <b>Figura 3</b>. Edición de CSS en el panel <b>Editor</b> para cambiar el color de fondo de un
    elemento de azul a rojo
  </figcaption>
</figure>

Los cambios de CSS se realizan de inmediato y no es necesario guardarlos. Para que se apliquen los cambios de JavaScript, presiona
<kbd>Command</kbd>+<kbd>S</kbd> (Mac) o <kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows, Linux).
DevTools no vuelve a ejecutar una secuencia de comandos, de modo que los únicos cambios de JavaScript que se aplican son los
que haces dentro de funciones. Por ejemplo, en la <b>Figura 4</b>, observa cómo `console.log('A')` no se
ejecuta, mientras que `console.log('B')` sí lo hace. Si DevTools volviera a ejecutar toda la secuencia de comandos después de hacer el
cambio, el texto `A` se registraría en la **consola**.

<figure>
  <img src="images/edit-js.gif"
       alt="Edición de JavaScript en el panel Editor"/>
  <figcaption>
    <b>Figura 5</b>. Edición de JavaScript en el panel <b>Editor</b>
  </figcaption>
</figure>

DevTools borra los cambios de CSS y JavaScript cuando vuelves a cargar la página. Consulta
[cómo configurar un lugar de trabajo](#workspace) para obtener información acerca de cómo guardar los cambios en tu sistema de
archivos.

## Cómo crear, guardar y ejecutar fragmentos {: #snippets }

Los fragmentos son secuencias de comandos que se pueden ejecutar en cualquier página. Imagina que escribes el siguiente
código repetidamente en la **consola** para insertar la biblioteca de jQuery en una página, de modo que
puedas ejecutar comandos de jQuery desde la **consola**:

    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

En cambio, puedes guardar este código en un **fragmento** y ejecutarlo con un par de clics
cada vez que necesites. DevTools guarda el **fragmento** en tu sistema de archivos.

<figure>
  <img src="images/snippet.png"
       alt="Fragmento que inserta la biblioteca de jQuery en una página."/>
  <figcaption>
    <b>Figura 6</b>. <b>Fragmento</b> que inserta la biblioteca de jQuery en una página
  </figcaption>
</figure>

Para ejecutar un **fragmento**, haz lo siguiente:

* Abre el archivo mediante el panel **Snippets** y haz clic en **Run** ![botón Run][run]{:.cdt-inl}.
* Abre el [**menú Command**][CM], borra el carácter `>`, escribe `!`, escribe el nombre de tu
  **fragmento** y presiona <kbd>Intro</kbd>.

[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

Consulta [cómo ejecutar fragmentos de código desde cualquier página][snip] para obtener más información.

[snip]: /web/tools/chrome-devtools/snippets

## Cómo depurar JavaScript {: #debug }

En lugar de usar `console.log()` para inferir dónde hay algún problema en JavaScript, considera usar
las herramientas de depuración de Chrome DevTools. La idea general es definir un punto de interrupción, que
es un lugar donde se detiene intencionalmente el código, y después avanzar paso a paso en la ejecución del código,
una línea a la vez. Cuando avanzas paso a paso por el código, puedes ver y cambiar los valores de todas las
propiedades y variables actualmente definidas, ejecutar JavaScript en la **consola** y mucho más.

Consulta [cómo comenzar con la depuración de JavaScript](/web/tools/chrome-devtools/javascript/) para obtener información
acerca de los conceptos básicos de depuración en DevTools.

<figure>
  <img src="images/debugging.png"
       alt="Depuración de JavaScript"/>
  <figcaption>
    <b>Figura 7</b>. Depuración de JavaScript
  </figcaption>
</figure>

## Cómo configurar un lugar de trabajo {: #workspace }

De manera predeterminada, cuando editas un archivo en el panel **Sources**, esos cambios se pierden cuando
vuelves a cargar la página. Los **lugares de trabajo** te permiten guardar en
tu sistema de archivos los cambios que haces en DevTools. Esencialmente, esto te permite usar DevTools como editor de código.

Para comenzar, consulta [cómo configurar la persistencia con los lugares de trabajo de DevTools][WS].

[WS]: /web/tools/chrome-devtools/workspaces/

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
