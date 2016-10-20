project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A veces, la parte más difícil de un proyecto nuevo es comenzar. Web Starter Kit le proporciona una base sólida con una serie de herramientas que le resultarán útiles a lo largo del proceso de desarrollo.


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-07-16 #}

# Inicio del sitio con Web Starter Kit {: .page-title }

Caution: This article has not been updated in a while and may not reflect reality. Be sure to check the Web Starter Kit [documentation](https://github.com/google/web-starter-kit/) for the latest details.

{% include "web/_shared/contributors/mattgaunt.html" %}

En esta guía, le explicaremos el proceso de crear un sitio nuevo con Web Starter Kit y le brindaremos información para que aproveche al máximo las herramientas que posee esta aplicación.

<img src="images/wsk-on-pixel-n5.png">



## Fases de desarrollo 




Durante el desarrollo, utilizará regularmente 3 comandos particulares: gulp serve, gulp y gulp serve:dist. Analicemos cómo cada tarea lo ayuda a desarrollar su sitio.



### Inicio de un servidor local

La primera tarea que analizaremos es la siguiente: `$ gulp serve`.

A simple vista, mediante esta tarea se activa un servidor HTTP local que le permite ver su sitio
en un navegador, pero si lo analizamos en profundidad, también se utilizan algunas herramientas adicionales.

#### LiveReload

A través de la función LiveReload, se elimina el proceso de actualización tradicional de hacer cambios en el
editor, ingresar en el navegador, usar las teclas CTRL-R y luego esperar que la página
se vuelva a cargar.

Con LiveReload, puede introducir cambios en el editor y ver cómo se aplican
inmediatamente en cualquier navegador con su sitio abierto.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### Pruebas en diferentes dispositivos

La función BrowserSync le permite probar su sitio en diferentes dispositivos. Todos los desplazamientos y
las teclas que se presionen se compartirán en todos los navegadores conectados.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Esto solo funciona si ejecuta su sitio con `gulp serve`. Para probarlo, ejecute
`gulp serve`, abra la URL en dos ventanas del navegador, una al lado de la otra, y recorra
una de las páginas.

#### Prefijación automática

Cuando desee orientar a diferentes navegadores, deberá utilizar prefijos de proveedores para
asegurarse de poder utilizar las funciones en cada uno de ellos. Web Starter Kit automatizará todos los
prefijos por usted.

En nuestro ejemplo de CSS (hojas de estilo en cascada), que se muestra a continuación, no se incluyen los prefijos de ningún proveedor:

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

Durante el proceso de compilación, se ejecuta la CSS a través del Autoprefixer, y de allí surge el
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

#### Revisión de su Javascript

JSHint es una herramienta que examina su código de JavaScript para verificar si hay posibles problemas
con su lógica de JavaScript y [ejecuta las mejores prácticas de codificación](http://www.jshint.com/docs/).

La herramienta se ejecuta cada vez que compila el proyecto o, si está ejecutando el servidor gulp,
cada vez que realiza un cambio en un archivo de JavaScript.

#### Compilación de su Sass

Si ejecuta el comando del servidor, los cambios que introduzca en cualquiera de los archivos
Sass de su proyecto se compilarán en una CSS y se les agregará un prefijo. Después de esto, su
página se volverá a cargar mediante LiveReload.

Para aquellas personas que nunca han utilizado Sass, el proyecto se describe a sí mismo como un "lenguaje de
extensión de CSS". Básicamente, es una CSS con algunas funciones adicionales. Por ejemplo,
se agrega compatibilidad con variables y funciones, lo que le permite estructurar su CSS
en módulos y de una forma reutilizable.

### Compilación de una versión de su sitio para la producción

Puede compilar una versión de su sitio lista para la producción con el sencillo 
comando`gulp`. A través de este comando se ejecutan algunas de las tareas que ya mencionamos y otras tareas adicionales
que tienen como objetivo hacer que su sitio se cargue de una forma más rápida y eficiente.

Las principales tareas que se llevan a cabo mediante la compilación para la producción son las siguientes:

#### Estilos de compilación

Primero, se compilará el Saas en su proyecto mediante la compilación. Luego de que se haya compilado el Sass
, la herramienta Autoprefixer ejecutará todas las CSS.

#### Revisión de su JavaScript para detectar problemas

En el segundo paso del proceso de compilación, se ejecuta JSHint sobre su JavaScript.

#### Compilación de las páginas HTML

En el próximo paso, se examinan sus archivos HTML en busca de bloques de compilación para concatenar
y minificar JavaScript. Luego de que se verifica JavaScript, a través del proceso de compilación,
se minifica la página HTML.

Gracias a la minificación, se puede reducir la cantidad de caracteres en el archivo final de JavaScript, ya que se eliminan
los comentarios o los caracteres de espacios que no son realmente necesarios, además de
otras técnicas que se implementan. De este modo, se reduce el tamaño del archivo final y se acelera el tiempo de carga de su
sitio.

El término concatenación hace referencia al hecho de pegar el contenido de varios archivos en uno solo. Esto
se hace para que el navegador solo tenga que enviar una solicitud al servidor,
y no varias solicitudes, lo que es más rápido para los usuarios.

El bloque de compilación posee todo lo necesario para administrar los archivos de JavaScript que minificamos
y concatenamos. Analicemos un ejemplo de bloque de compilación:

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

Un bloque de compilación es, simplemente, un comentario con un formato especial.
Todos sus archivos de Javascript incluidos en el bloque de compilación se unirán
(concatenarán) y minificarán en un archivo con el nombre main.min.js, y
la compilación final reemplazará estas secuencias de comandos por la etiqueta script:

    <script src="scripts/main.min.js"></script>

#### Optimización de los activos de imagen

En el caso de los archivos JPEG y PNG, los metadatos de la imagen se seccionan; por lo que no es necesario
procesar la imagen. Entre los metadatos se incluye información como la cámara utilizada
para tomar la fotografía.

En cuanto a los archivos SVG, se eliminan los atributos que no son necesarios o se eliminan todos los espacios en blanco
y comentarios.

#### Copia de fuentes

Mediante esta tarea sencilla, se copian nuestras fuentes desde la aplicación hacia el directorio final de compilación.

#### Copia de cualquier archivo desde el directorio raíz

Si durante el proceso de compilación se encuentra algún archivo en el directorio raíz del proyecto, este se copiará
también en el directorio final de compilación.

### Prueba de la compilación para la producción

Antes de colocar elementos para utilizarlos para la producción, debe asegurarse de que todo funcione
de la forma esperada. Mediante el comando `gulp serve:dist`, se compila una versión de la producción de su sitio,
se inicia un servidor y se abre un navegador. Aquí ** no se cuenta con las herramientas LiveReload o
BrowserSync**, pero esta es una forma confiable de probar su sitio antes de implementarlo.




## Configuración de Web Starter Kit 




En Web Starter Kit se utilizan las herramientas NodeJS, NPM y Sass. Una vez que las haya instalado en su máquina, ya tendrá todo lo que necesita para comenzar a utilizar Web Starter Kit en sus proyectos.


### Instale estas dependencias únicas

Existen dos conjuntos de herramientas que debe instalar en su máquina antes de crear
sitios con Web Starter Kit: NodeJS, NPM y Sass.

#### NodeJS y NPM

En las herramientas de compilación de Web Starter Kit se deben utilizar Node y NPM. Node se utiliza para ejecutar Gulp, el ejecutor
de tareas. NPM se utiliza para descargar los módulos necesarios para realizar ciertas tareas
en Gulp.

Si no está seguro de si posee NodeJS y NPM, abra un símbolo del sistema y
ejecute `node -v` para verificarlo. Si Node se abre, verifique que la versión coincida con la versión actualizada 
que aparece en NodeJS.org.

Si no obtiene una respuesta o posee una versión anterior, acceda a NodeJS.org y
y haga clic en el botón verde grande Install. NPM se instalará junto con NodeJS
de forma automática.

### Configuración de su proyecto de Web Starter Kit

El primer paso es acceder a [https://developers.google.com/web/starter-kit/](/web/starter-kit/)
, descargar el zip y descomprimirlo. Esta será la base de su proyecto, por lo que debe cambiarle el nombre a la carpeta y colocarla en alguna parte relevante de su máquina. A lo largo de esta guía, llamaremos `my-project` a esa carpeta.

A continuación, deberá instalar las dependencias locales correspondientes a Web Starter Kit. Abra un
símbolo del sistema, cambie el directorio que se encuentra dentro de la carpeta de su proyecto y ejecute los siguientes scripts de instalación de 
npm.

    cd my-project
    npm install
    npm install gulp -g

¡Listo! Ahora, ya tiene todo lo necesario para utilizar las herramientas de Gulp en el Web Starter
Kit.

Note: Si el sistema le arroja errores de permiso o acceso, como <code>EPERM</code> o <code>EACCESS</code>, no utilice <code>sudo</code> a modo de solución temporal. Consulte <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>esta página</a> para obtener una solución más eficiente.

En la siguiente sección de esta guía, hablaremos sobre cómo utilizar Gulp, pero si desea
ver cómo funciona esta herramienta, escriba `gulp serve` para ejecutar el servidor local.

<img src="images/wsk-on-pixel-n5.png">


