project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Crea tu sitio para varios dispositivos desde cero. Obtén información sobre cómo acelerar el desarrollo y crear un sitio de carga rápida con un conjunto de herramientas de proceso de compilación.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-24 #}

# Configura tus herramientas de compilación {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
Crea tu sitio para varios dispositivos desde cero. Obtén información sobre cómo acelerar el desarrollo y crear un sitio de carga rápida con un conjunto de herramientas de proceso de compilación. Cada sitio debe tener una versión de desarrollo y una versión de producción.<br /><br />La versión de desarrollo contiene todos los archivos HTML, CSS, JS y de imagen que componen tu sitio en un formato limpio sobre los que te gusta trabajar.<br /><br />Una versión de producción tomará estos archivos, los reducirá, concatenará o fusionará y luego los optimizará como imágenes.

Los programadores web deben pensar en un millón de cosas a la vez, y la etapa de compilación
es una de las más importantes y complicadas para comenzar.  Debes
descubrir todas las tareas que necesitas automatizar, por ejemplo: Compresión
de imágenes, reducción de CSS, concatenación de JavaScript, pruebas adaptables,
prueba de unidades, etc.

Sigue esta guía para obtener información sobre la mejor manera de estructurar tu flujo de trabajo de manera que
los sitios que crees ya sigan las mejores práctica desde
el minuto en que comienzas.


### TL;DR {: .hide-from-toc }
- Tus herramientas de proceso de compilación deben optimizar el rendimiento, y reducir y concatenar automáticamente JavaScript, CSS, HTML e imágenes.
- Usa herramientas como LiveReload para que tu proceso de desarrollo sea más fluido.


Antes de comenzar a codificar, debes considerar cómo optimizar y compilar la
versión de producción de tu sitio. Configurar este flujo de trabajo desde el comienzo
evita sorpresas desagradable al final del proyecto. Además, puedes agregar herramientas
a tu flujo de trabajo que aceleren tu desarrollo y hagan las tareas monótonas
por ti.

## ¿Qué es un proceso de compilación?

Un proceso de compilación es un conjunto de tareas que se ejecutan sobre tus archivos de proyecto. Este proceso compila
y comprueba el código durante el desarrollo y se usa para crear la versión de desarrollo
de tu sitio.  Tu proceso de compilación no debe ser un conjunto de tareas que ejecutas al final de
tu flujo de trabajo de desarrollo.

Las herramientas más populares para implementar un proceso de compilación son
[Gulp](http://gulpjs.com/){: .external } y [Grunt](http://gruntjs.com/), ambas herramientas
de línea de comandos. Si no tienes experiencia con ninguna de ellas, te recomendamos usar Gulp, la herramienta que usamos para el
[Web Starter Kit](/web/tools/starter-kit/).


Existen herramientas que incluyen GUI y que pueden ser más fáciles de manejar, pero que son
menos flexibles.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Plataformas admitidas y nombre de la herramienta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## ¿Qué tareas debe incluir un proceso de compilación?

En las siguientes secciones, veremos las tareas más comunes que
debes incluir en tu proceso de compilación y las tareas recomendadas para Grunt y Gulp.

Para configurar cada parte como lo deseas, serán necesarios varios procesos de ensayo y error,
lo cual puede ser desalentador si eres nuevo en los procesos de compilación.

Para ver un buen ejemplo de un proceso de compilación, consulta la [guía de introducción para Web Starter
Kit](/web/fundamentals/getting-started/web-starter-kit/),
que describe cómo usar Web Starter Kit y explica qué hace cada comando
del archivo Gulp. Esta guía se puede usar para implementar una configuración rápida, y luego
puedes hacer los cambios necesarios.

Si buscas crear tu propio proceso de compilación y eres nuevo con Gulp
o Grunt, las guías de inicio rápido serán el mejor lugar para aprender a instalar
y ejecutar tu primer proceso de compilación:

* [Primeros pasos en Grunt](http://gruntjs.com/getting-started)
* [Primeros pasos
  en Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

### Usa la concatenación y la reducción para lograr un sitio más rápido

Para aquellos que no están familiarizados con los términos concatenación y reducción,
concatenación significa simplemente fusionar varios archivos en uno, es decir, copiar y
pegar distintos archivos en uno. El motivo para hacerlo es que es más
efectivo que un navegador busque un solo archivo que varios archivos pequeños.

La reducción es el proceso de tomar un archivo y reducir la cantidad general de
caracteres, sin cambiar el modo en que funciona el código. Un buen ejemplo es
eliminar comentarios, o tomar un nombre largo de variable y hacerlo más pequeño. De esta manera,
se reduce el tamaño del archivo y se aceleran las descargas.

Para hacer una reducción, usa lo siguiente:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipo de archivo</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

Para hacer una concatenación, usa lo siguiente:

<table>
  <thead>
    <tr>
      <th data-th="Type of File">Tipo de archivo</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> o <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> o <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> o <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**Nota**: Puedes usar Sass y aprovechar la función "import" ([Consulta Web Starter
Kit para ver un ejemplo](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)).

### Optimiza tus imágenes

La optimización de imágenes es un paso importante para acelerar tu sitio. Te sorprenderás
al ver cuánto puedes reducir una imagen sin que pierda calidad. Los meta
datos se eliminan de la imagen, ya que el navegador no los necesita para mostrarla,
por ejemplo, la información sobre la cámara usada para tomar la foto.

Para optimizar imágenes, puedes usar estos módulos.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp y Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### No te compliques con los prefijos de los proveedores

A menudo puede ser un poco tedioso incluir todos los prefijos de los proveedores para la CSS
que usas. Usa un asignador de prefijos automático para agregar los prefijos que necesitas
incluir automáticamente:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp versus Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**Nota**  
Si lo prefieres, puedes agregar un [Paquete de Sublime para que incluya los prefijos automáticamente](/web/tools/setup/setup-editor#autoprefixer) por
ti.

### Nunca dejes tu editor de texto con recarga en vivo

La recarga en vivo actualiza tu sitio en tu navegador cada vez que haces un cambio.
Una vez que lo hayas usado, no podrás vivir sin él.

Web Starter Kit usa la sincronización del navegador para admitir Live Reload.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp versus Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> y <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

Note: Si te gusta la idea de hacer Live Reload, pero no quieres tener un proceso de compilación, el [artículo de Addy Osmani sobre HTML5Rocks](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/) presenta una serie de alternativas (algunas gratuitas y otras comerciales).


{# wf_devsite_translation #}
