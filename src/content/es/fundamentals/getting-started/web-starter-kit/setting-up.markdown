---
title: "Configuración de Web Starter Kit"
description: "Si es la primera vez que utiliza Web Starter Kit, entonces esta guía es ideal para usted. Aquí se explica cómo iniciar y ejecutar el Web Starter Kit lo más rápido posible."
notes:
  nosudo: "Si el sistema le arroja errores de permiso o acceso, como <code>EPERM</code> o <code>EACCESS</code>, no utilice <code>sudo</code> a modo de solución temporal. Consulte <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>esta página</a> para obtener una solución más eficiente."
updated_on: 2015-04-01
translation_priority: 1
---

<p class="intro">
  En Web Starter Kit se utilizan las herramientas NodeJS, NPM y Sass. Una vez que las haya instalado en su máquina, ya tendrá todo lo que necesita para comenzar a utilizar Web Starter Kit en sus proyectos.
</p>

{% include shared/toc.liquid %}

## Instale estas dependencias únicas

Existen dos conjuntos de herramientas que debe instalar en su máquina antes de crear
sitios con Web Starter Kit: NodeJS, NPM y Sass.

### NodeJS y NPM

En las herramientas de compilación de Web Starter Kit se deben utilizar Node y NPM. Node se utiliza para ejecutar Gulp, el ejecutor
de tareas. NPM se utiliza para descargar los módulos necesarios para realizar ciertas tareas
en Gulp.

Si no está seguro de si posee NodeJS y NPM, abra un símbolo del sistema y
ejecute `node -v` para verificarlo. Si Node se abre, verifique que la versión coincida con la versión actualizada 
que aparece en NodeJS.org.

Si no obtiene una respuesta o posee una versión anterior, acceda a NodeJS.org y
y haga clic en el botón verde grande Install. NPM se instalará junto con NodeJS
de forma automática.

## Configuración de su proyecto de Web Starter Kit

El primer paso es acceder a [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
, descargar el zip y descomprimirlo. Esta será la base de su proyecto, por lo que debe cambiarle el nombre a la carpeta y colocarla en alguna parte relevante de su máquina. A lo largo de esta guía, llamaremos `my-project` a esa carpeta.

A continuación, deberá instalar las dependencias locales correspondientes a Web Starter Kit. Abra un
símbolo del sistema, cambie el directorio que se encuentra dentro de la carpeta de su proyecto y ejecute los siguientes scripts de instalación de 
npm.

    cd my-project
    npm install
    npm install gulp -g

¡Listo! Ahora, ya tiene todo lo necesario para utilizar las herramientas de Gulp en el Web Starter
Kit.

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

En la siguiente sección de esta guía, hablaremos sobre cómo utilizar Gulp, pero si desea
ver cómo funciona esta herramienta, escriba `gulp serve` para ejecutar el servidor local.

<img src="images/wsk-on-pixel-n5.png">


