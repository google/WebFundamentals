project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprende a configurar preprocesadores de CSS y JS para escribir código con mayor eficiencia.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-08-03 #}

# Configurar preprocesadores de CSS y JS {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Los preprocesadores de CSS (como Sass), los preprocesadores y los transpiladores de JS pueden acelerar enormemente la programación cuando se usan de manera correcta. Aprende a configurarlos.


### TL;DR {: .hide-from-toc }
- Los preprocesadores te permiten usar funcionalidades en CSS y JavaScript que tu navegador no admite de forma nativa; por ejemplo, variables de CSS.
- Si usas preprocesadores, utiliza los mapas de origen para asignar tus archivos de origen iniciales a la salida representada.
- Asegúrate de que tu servidor web pueda funcionar con mapas de origen.
- Usa un preprocesador compatible para generar mapas de origen automáticamente.


## ¿Qué es un preprocesador?

Un preprocesador toma un archivo de origen arbitrario y lo convierte en algo que el navegador comprende. 

Con una CSS como salida, el preprocesador está acostumbrado a agregar características que de otro modo no existirían (aún): variables de CSS, anidación, y mucho más. Algunos ejemplos destacados de esta categoría son [Sass](http://sass-lang.com/), [Less](http://lesscss.org/){: .external } y [Stylus](https://learnboost.github.io/stylus/).

Con JavaScript como salida, realizan conversiones (compilaciones) desde un lenguaje completamente diferente o convierten (transpilan) un superconjunto o un estándar de un lenguaje nuevo al estándar actual. Algunos ejemplos destacados de esta categoría son [CoffeeScript](http://coffeescript.org/){: .external } y ES6 (a través de [Babel](https://babeljs.io/)).

## Depuración y edición de contenido preprocesado

Cuando abres el navegador y usas DevTools para [editar tu CSS](/web/tools/chrome-devtools/inspect-styles/edit-styles) o depurar el código JavaScript, un inconveniente se vuelve notorio: lo que ves no refleja el origen y no ayuda realmente a solucionar el problema.

Para corregir esto, la mayoría de los preprocesadores modernos admiten una característica denominada <b>mapas de origen</b>.

### ¿Qué son los mapas de origen?

Un mapa de origen es un formato de asignación basado en JSON que crea una relación entre un archivo minificado y sus orígenes. Al realizar compilaciones para producción, además de minificar y combinar los archivos JavaScript se genera un mapa de origen que tiene información sobre los archivos originales.

### ¿Cómo funcionan los mapas de origen?

Por cada archivo CSS que produce, un preprocesador de CSS genera un archivo de mapa de origen (.map), además de la CSS compilada. El archivo de mapa de origen es un archivo JSON que define una asignación entre cada declaración de CSS y la línea correspondiente del archivo de origen.

Cada archivo CSS contiene una anotación que especifica la URL del archivo de mapa de origen, incorporado en un comentario especial en la última línea del archivo:

    /*# sourceMappingURL=<url> */

Por ejemplo, en un archivo de origen Sass denominado **styles.scss**:

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass genera un archivo CSS, **styles.css**, con la anotación sourceMappingURL:

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

A continuación, se ofrece un ejemplo de un archivo de mapa de origen:

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## Verificar que tu servidor web pueda funcionar con mapas de origen

Algunos servidores web, como Google App Engine, requieren una configuración explícita para cada tipo de archivo proporcionado. En este caso, los mapas de origen deben proporcionarse con un tipo MIME de `application/json`, pero Chrome, en realidad, [aceptará cualquier tipo de contenido](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files), por ejemplo `application/octet-stream`.

### Extra: Uso de mapas de origen mediante un encabezado personalizado 

Si no deseas agregar un comentario adicional al archivo, usa un campo de encabezado HTTP en el archivo JavaScript minificado para indicar a DevTools dónde encontrar el mapa de origen. Para esto se debe configurar o personalizar del servidor web, y el tema no se abarca en este documento.

    X-SourceMap: /path/to/file.js.map

Al igual que el comentario, esto indica a DevTools y otras herramientas dónde buscar el mapa de origen asociado con un archivo JavaScript. Este encabezado también soluciona el problema de hacer referencia a mapas de origen en lenguajes que no admiten comentarios en una sola línea.

## Preprocesadores compatibles

En la actualidad, prácticamente cualquier compilación al lenguaje JavaScript tiene una opción para generar mapas de origen, como Coffeescript, TypeScript, JSX, etc. Además, puedes usar mapas de origen en el lado del servidor dentro del nodo, en nuestra CSS mediante Sass, Less y otras opciones, con browserify, que brinda capacidades de estilo de nodo, y mediante herramientas de minificación, como uglify-js, que también agrega la estupenda capacidad de generar mapas de origen con varios niveles.

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compilador</th>
      <th width="40%" data-th="Command">Comando</th>
      <th data-th="Instructions">Instrucciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">La marca -m (--map) es lo único que necesita el compilador para generar un mapa de origen; también administra la adición de la directiva pragma del comentario sourceMapURL al archivo de salida.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">La marca -sourcemap generará el mapa y agregará la directiva pragma de comentario.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">Con <code>--source-maps=file</code>, cada archivo de salida que termine en <code>.js</code> tendrá un archivo de mapa de origen que termine en <code>.map</code>; con <code>source-maps='inline'</code>, cada archivo de salida que termine en <code>.js</code> tendrá al final un comentario que contendrá el mapa de origen codificado en una <code>data:</code> URL.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">Usa --source-maps o -s para generar mapas de origen. Usa <code>--source-maps inline</code> para los mapas de origen insertados.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">Este es el comando más básico que se necesita para generar un mapa de origen para “file.js”. Esto agregará la directiva pragma de comentario al archivo de salida.</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compilador</th>
      <th width="40%" data-th="Command">Comando</th>
      <th data-th="Instructions">Instrucciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Sass admite los mapas de origen desde la versión 3.3.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">Se implementa en la versión 1.5.0. Consulta el <a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">problema n.º 1050</a> para conocer los detalles y los patrones de uso.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">Esto incorporará el mapa de origen como una string base64 codificada directamente en el archivo de salida.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">También puedes agregar `sourcemap: true` a tu archivo config.rb.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">Sigue el vínculo para aprender a usarlo e integrar un mapa de origen de entrada.</td>
    </tr>
  </tbody>
</table>

## Mapas de origen y DevTools

Ahora que tienes los mapas de origen configurados correctamente, probablemente te resulte muy positivo saber que DevTools tiene compatibilidad integrada para mapas de origen basados en CSS y JS.

### Edición de CSS preprocesadas

Consulta [Editar en Sass, Less o Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles) para obtener más información sobre cómo editar y actualizar estilos vinculados con un mapa de origen directamente desde DevTools.

### Edición y depuración de JavaScript preprocesado

Obtén más información sobre cómo depurar JavaScript minificado, compilado o transpilado en el panel Sources en [Asigna código previamente procesado al código fuente](/web/tools/chrome-devtools/debug/readability/source-maps).


{# wf_devsite_translation #}
