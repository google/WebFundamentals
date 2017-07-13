project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A veces, la parte más difícil de un proyecto nuevo es comenzar. Web Starter Kit te proporciona una base sólida con una serie de herramientas que le resultarán útiles a lo largo del proceso de desarrollo.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-07-16 #}

# Inicia tu sitio con Web Starter Kit {: .page-title }

Warning: Este artículo no se ha actualizado durante un largo tiempo y puede ser que no refleje la realidad. Asegúrate de revisar la [documentación de Web Starter Kit](https://github.com/google/web-starter-kit/) para conocer los últimos detalles.

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

En esta guía, te explicaremos el proceso de compilación de un sitio nuevo con
Web Starter Kit y te brindaremos información para que aproveches al máximo las herramientas que ofrece.

<div style="clear:both;"></div>

## Fases de desarrollo

Durante el desarrollo, hay tres comandos que usarás con frecuencia: `gulp serve`, `gulp` y `gulp serve:dist`. Observemos cómo cada uno contribuye al proceso de desarrollo.


### Inicia un servidor local

La primera tarea que analizaremos es la siguiente: `$ gulp serve`.

A simple vista, mediante esta tarea se activa un servidor HTTP local que te permite ver tu sitio
en un navegador, pero si lo analizamos en profundidad también se usan algunas herramientas adicionales.

#### Live Reload

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

A través de la función LiveReload, se elimina el proceso de actualización tradicional que consiste en hacer cambios en el
editor, ingresar en el navegador, presionar CTRL-R y luego esperar que la página
se vuelva a cargar.

Con Live Reload, puedes realizar cambios en tu editor y ver cómo se aplican
inmediatamente en cualquier navegador con tu sitio abierto.


#### Pruebas en diferentes dispositivos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

La función Browser Sync te permite probar tu sitio en diferentes dispositivos. Todos los desplazamientos, los toques en pantalla o
las teclas que se presionen se compartirán en todos los navegadores conectados.

Esto solo funciona si ejecutas tu sitio con `gulp serve`. Para probarlo, ejecuta
`gulp serve`, abre la URL en dos ventanas del navegador, una al lado de la otra, y recorre
una de las páginas.

<div style="clear:both;"></div>

#### Automatiza los prefijos

Cuando quieras apuntar a diferentes navegadores, deberás usar prefijos de proveedores para
asegurarte de poder usar las funciones de cada uno de ellos. Web Starter Kit se encargará de automatizar todos los
prefijos.

En nuestro ejemplo de CSS (hojas de estilo en cascada), que se muestra a continuación, no se incluyen los prefijos de ningún proveedor:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

Durante el proceso de compilación, se ejecuta la CSS a través de la herramienta Autoprefixer, y de allí surge el
siguiente resultado final:

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

#### Revisa tu JavaScript

JSHint es una herramienta que examina tu código de JavaScript para verificar si hay posibles problemas
con tu lógica de JavaScript y [ejecuta las mejores prácticas de codificación](//www.jshint.com/docs/){: .external }.

La herramienta se ejecuta cada vez que compilas el proyecto o, si ejecutas el servidor gulp,
cada vez que realizas un cambio en un archivo de JavaScript.

#### Compila tu Sass

Si ejecutas el comando serve, los cambios que realices en los archivos
Sass de tu proyecto se compilarán en una CSS y se les agregará un prefijo. Después de esto, tu
página se volverá a cargar con Live Reload.

Para quienes nunca hayan usado Sass, el proyecto se describe a sí mismo como un “lenguaje de
extensión de CSS”. Básicamente, es una CSS con algunas funciones adicionales. Por ejemplo,
se agrega compatibilidad con variables y funciones, que te permiten estructurar tu CSS
en módulos y con capacidad de reutilización.

### Compila una versión de producción de tu sitio

Puedes compilar una versión de tu sitio lista para la producción con el
comando simple `gulp`. A través de este comando, se ejecutan algunas de las tareas que ya mencionamos y otras tareas adicionales
cuyo objetivo es hacer que tu sitio se cargue de forma más rápida y eficaz.

Las principales tareas que se llevan a cabo mediante la compilación para la producción son las siguientes:

#### Estilos de compilación

Primero, se compilará el Sass en tu proyecto. Luego de que se haya compilado el Sass
, la herramienta Autoprefixer ejecutará todas las CSS.

#### Revisa JavaScript para detectar problemas

En el segundo paso del proceso de compilación se ejecuta JSHint en tu JavaScript.

#### Compila las páginas HTML

En el paso que sigue, se examinan tus archivos HTML en busca de bloques de compilación para concatenar
y minificar JavaScript. Luego de que se verifica JavaScript, el proceso de compilación
minifica la página HTML.

Gracias a la minificación, se puede reducir la cantidad de caracteres en el archivo final de JavaScript eliminando
los comentarios o los caracteres de espacios que no son realmente necesarios, y
a través del uso de algunas otras técnicas. De este modo, se reduce el tamaño del archivo final y se acelera el tiempo de carga de tu
sitio.

El término “concatenación” hace referencia implica pegar el contenido de varios archivos en uno solo. Esto
se hace para que el navegador solo tenga que enviar una solicitud a un servidor,
en lugar de varias solicitudes, lo cual es más rápido para los usuarios.

El bloque de compilación tiene todo lo necesario para administrar los archivos de JavaScript que minificamos
y concatenamos. Analicemos un ejemplo de bloque de compilación:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

Un bloque de compilación es, simplemente, un comentario con un formato especial.
Todos tus archivos de JavaScript incluidos en el bloque de compilación se unirán
(concatenarán) y se minificarán en un archivo con el nombre main.min.js, y
la compilación final reemplazará estas secuencias de comandos por la etiqueta de secuencia de comandos:

    <script src="scripts/main.min.js"></script>

#### Optimización de los activos de imagen

En el caso de los archivos JPEG y PNG, los metadatos de la imagen se seccionan, por lo que no es necesario
representar la imagen. Los metadatos incluyen información; por ejemplo, la cámara empleada
para tomar la foto.

En cuanto a los archivos SVG, se eliminan los atributos que no son necesarios o se eliminan todos los espacios en blanco
y comentarios.

#### Copia de fuentes

Mediante esta tarea sencilla, se copian nuestras fuentes desde la aplicación en el directorio final de compilación.

#### Copia de cualquier archivo desde el directorio raíz

Si durante el proceso de compilación se encuentra algún archivo en el directorio raíz del proyecto, este se copiará
también en la compilación final.

### Prueba tu compilación para la producción

Antes de introducir elementos para la producción, debes asegurarte de que todo funcione
como esperas. Mediante el comando `gulp serve:dist` se compila una versión de la producción de tu sitio,
se inicia un servidor y se abre un navegador. **No se cuenta con las herramientas Live Reload o
Browser Sync**, pero es un método confiable para probar tu sitio antes de implementarlo.


## Configuración de Web Starter Kit


El funcionamiento de Web Starter Kit se basa en NodeJS, NPM y Sass. Una vez que estén instalados, tendrás todo lo que necesitas para comenzar a usar Web Starter Kit en tus proyectos.


### Instala estas dependencias únicas

Existen dos conjuntos de herramientas que debes instalar en tu equipo antes de compilar
sitios con Web Starter Kit: NodeJS y NPM, y Sass.

#### NodeJS y NPM

Las herramientas de compilación de Web Starter Kit requieren Node y NPM. Node se usa para ejecutar Gulp, el ejecutor
de tareas. NPM se aplica en la descarga de los módulos necesarios para realizar ciertas tareas
en Gulp.

Si no estás seguro de contar con NodeJS y NPM, abre un símbolo del sistema y
ejecuta `node -v` para verificarlo. Si se abre Node, verifica que la versión coincida con la versión actual
en NodeJS.org.

Si no obtienes una respuesta o tienes una versión anterior, accede a NodeJS.org y
haz clic en el botón verde grande Install. NPM se instalará junto con NodeJS
de forma automática.

### Configura tu proyecto de Web Starter Kit

El primer paso es acceder a [/web/tools/starter-kit/](/web/tools/starter-kit/)
y descargar el zip y descomprimirlo. Esta será la base de tu proyecto, por lo que debes cambiarle el nombre a la carpeta y colocarla en alguna parte adecuada de tu equipo. De aquí al final de esta guía, llamaremos a esa carpeta `my-project.`.

A continuación, debes instalar las dependencias locales para Web Starter Kit. Abre un
símbolo del sistema, cambia el directorio que se encuentra en la carpeta de tu proyecto y ejecuta las siguientes secuencias de comandos para la instalación de
npm.

    cd my-project
    npm install
    npm install gulp -g

¡Listo! Ya tienes todo lo necesario para usar las herramientas de Gulp en Web Starter
Kit.


Note: Si ves errores de permiso o acceso como <code>EPERM</code> o  <code>EACCESS</code>, no uses <code>sudo</code> a modo de solución temporal. Consulte <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>esta página</a> para obtener una solución más eficiente.

<!--
The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">


{# wf_devsite_translation #}
