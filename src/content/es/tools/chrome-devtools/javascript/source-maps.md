project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Haz que tu código del lado del cliente sea legible y depurable aún después de combinarlo, comprimirlo y compilarlo.

{# wf_updated_on: 2015-04-21 #}
{# wf_published_on: 2015-04-13 #}

# Asigna código previamente procesado al código fuente {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Haz que tu código del lado del cliente sea legible y depurable aún después de combinarlo, comprimirlo y compilarlo. Usa mapas de origen para asignar tu código fuente al código compilado.


### TL;DR {: .hide-from-toc }
- Usa mapas de origen para asignar código comprimido al código fuente. Luego, podrás leer y depurar código compilado en su origen.
- Usa únicamente <a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>preprocesadores capaces de producir mapas de origen</a>.
- Verifica que tu servidor web pueda funcionar con mapas de origen.


## Primeros pasos con los preprocesadores

En este artículo, se explica la manera de interactuar con los mapas de origen de JavaScript en el panel Sources de DevTools. Para obtener información general sobre los preprocesadores, la manera en que pueden servir y el funcionamiento de los mapas de origen, visita la sección sobre [Cómo configurar los preprocesadores de CSS y JS](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content).

## Usa un preprocesador compatible

Debes usar un compresor capaz de crear mapas de origen. Para conocer las opciones más aplicadas, consulta nuestra sección sobre [preprocesadores compatibles](/web/tools/setup/setup-preprocessors?#supported-preprocessors). Para obtener información más detallada, consulta la página de Wiki [Source maps: languages, tools and other info](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) (mapas de origen: lenguajes, herramientas y otros datos).

Los siguientes tipos de preprocesadores se usan frecuentemente con mapas de origen:

* Transpiladores ([Babel](https://babeljs.io/){: .external } y [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started))
* Compiladores ([Closure Compiler](https://github.com/google/closure-compiler), [TypeScript](http://www.typescriptlang.org/){: .external }, [CoffeeScript](http://coffeescript.org) y [Dart](https://www.dartlang.org))
* Minificadores ([UglifyJS](https://github.com/mishoo/UglifyJS))

## Mapas de origen del panel Sources de DevTools

Los mapas de origen de los preprocesadores hacen que DevTools cargue los archivos originales además de los minificados. En consecuencia, puedes usar los originales para establecer puntos de interrupción y recorrer el código. Mientras tanto, Chrome ejecutará tu código comprimido. De esta forma, te dará la impresión de ejecutar un sitio de desarrollo en producción.

Cuando ejecutes los mapas de origen en DevTools, observarás que JavaScript no está compilado y podrás ver todos los archivos JavaScript individuales a los que hace referencia. Si bien se usan los mapas de origen, lo que se ejecuta en realidad es el código compilado. Cualquier error, registro y punto de interrupción se asignará al código de desarrollo, lo cual proporcionará una depuración fabulosa. Por lo tanto, te dará la impresión de estar ejecutando un sitio de desarrollo en producción.

### Habilita los mapas de origen en la configuración

De forma predeterminada, los mapas de origen ya están habilitados (a partir de Chrome 39). Pero si deseas comprobar que estén habilitados o habilitarlos, abre DevTools y haz clic en el engranaje de configuración ![engranaje](imgs/gear.png){:.inline}. En **Sources**, marca la casilla **Enable JavaScript Source Maps**. También puedes marcar la casilla **Enable CSS Source Maps**.

![Habilita los mapas de origen](imgs/source-maps.jpg)

### Realiza depuraciones con mapas de origen

Cuando [depures tu código](/web/tools/chrome-devtools/debug/breakpoints/step-code) y los mapas de origen estén habilitados, estos mapas se mostrarán en dos lugares:

1. En la consola (el vínculo al origen debe ser el archivo original y no el generado).
2. Cuando recorras el código (los vínculos en la pila de llamadas deben abrir el archivo de origen).

## @sourceURL y displayName

Si bien no forma parte de las especificaciones de los mapas de origen, `@sourceURL` facilita mucho el desarrollo cuando se trabaja con evaluaciones. Este elemento auxiliar se parece mucho a la propiedad `//# sourceMappingURL` y se menciona en las especificaciones de Source Map V3.

Si incluyes el siguiente comentario especial en tu código, que se evaluará, puedes nombrar evaluaciones, y estilos y secuencias de comando integrados para que aparezcan con nombres más lógicos en DevTools.

`//# sourceURL=source.coffee`

Visita esta
**[demostración](http://www.thecssninja.com/demo/source_mapping/compile.html)** y, a continuación, haz lo siguiente:

* Abre DevTools y dirígete al panel **Sources**.
* Ingresa un nombre de archivo en el campo de entrada _Name your code:_.
* Haz clic en el botón **Compile**.
* Aparecerá una alerta con la suma evaluada de CoffeeScript.

Si expandes el subpanel _Sources_, verás un archivo nuevo con el nombre de archivo personalizado que ingresaste antes. Si haces doble clic para ver este archivo, verás que contiene el lenguaje JavaScript compilado de nuestra fuente original. Sin embargo, en la última línea aparecerá un comentario `// @sourceURL` en el cual se indicará el archivo original. Esto puede contribuir en gran medida a la depuración al trabajar con abstracciones del lenguaje.

![Trabajar con sourceURL](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
