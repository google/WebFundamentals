project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Web Starter Kit es una plantilla que proporciona herramientas para el desarrollo de varios dispositivos

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Web Starter Kit {: .page-title }

[Descargar Web Starter Kit (beta)](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## ¿Qué es Web Starter Kit?

[Web Starter Kit](https://github.com/google/web-starter-kit) es una plantilla estable para el desarrollo web. Herramientas para crear una gran experiencia en varios dispositivos y [orientadas al rendimiento](#web-performance). Te ayuda a mantenerte productivo mientras sigues las mejores prácticas descriptas en [Aspectos básicos de la web](/web/fundamentals/) de Google. Un sólido punto de partida para profesionales y novatos en la industria

### Funciones

| Función                                | Resumen                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Plantilla adaptable | Una plantilla adaptable optimizada para web multipantalla. Con la tecnología de [Material Design Lite](http://getmdl.io).  Puedes usar esta plantilla o comenzar desde cero por medio de [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html).                          |
| Soporte de Sass                           | Compila [Sass](http://sass-lang.com/) en CSS fácilmente, y obtén soporte para variables, mixins y más. (Ejecuta `gulp serve` o `gulp` para producción)                                                                                                      |
| Optimización de rendimiento               | Reduce y concatena JavaScript, CSS, HTML e imágenes para ayudar a mantener la eficiencia de tus páginas. (Ejecuta `gulp` para crear una versión optimizada de tu proyecto en `/dist`)                                                                                                |
| Code Linting               | El linting de código JavaScript se realiza por medio de [ESLint](http://eslint.org) - una herramienta "linter" enchufable para identificar e informar patrones en JavaScript. Web Starter Kit usa ESLint con [eslint-config-google](https://github.com/google/eslint-config-google), que intenta seguir la guía de estilo de JavaScript de Google.                                                                                                |
| ES2015 vía Babel 6.0                   | Soporte de opcional ES2015 por medio de [Babel](https://babeljs.io/){: .external }. Para que ES2015 puede quitar la línea `"only": "gulpfile.babel.js",` del archivo [.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc). El código fuente de ES2015 se transpilará automáticamente a ES5 para un soporte mayor de navegadores.  |
| Servidor HTTP integrado                   | Un servidor integrado para obtener una vista previa de tu sitio a nivel local mientras desarrollas e iteras                                                                                                                                                                             |
| Recarga de navegador en vivo                 | Vuelve a cargar el navegador en tiempo real cada vez que se hace una modificación, sin necesidad de utilizar una extensión. (Ejecuta `gulp serve` y modifica tus archivos)                                                                                                                           |
| Sincronización entre dispositivos           | Sincroniza los clics, los desplazamientos, los formularios y la recarga en vivo en múltiples dispositivos a medida que modificas tu proyecto. Con la tecnología de [BrowserSync](http://browsersync.io). (Ejecuta `gulp serve` y abre la IP suministrada en otros dispositivos de tu red)                       |
| Soporte sin conexión                     | Gracias a nuestro trabajo en [Service Worker](/web/fundamentals/getting-started/primers/service-workers) [almacenamiento previo en caché](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226), los sitios que implementan `dist` en un dominio HTTPS tendrán soporte sin conexión. Este soporte se hace posible gracias a [sw-precache](https://github.com/GoogleChrome/sw-precache/).                                                                                                                                              |
| PageSpeed Insights                     | Métricas de rendimiento web que muestran qué tan bien se desempeña tu sitio en la versión móvil y la versión de escritorio (Ejecuta `gulp pagespeed`)                                                                                                                                                    |

## Guía de inicio rápido

[Descarga](https://github.com/google/web-starter-kit/releases/latest) el kit
o clona [el](https://github.com/google/web-starter-kit) repositorio y compila
sobre lo que se incluye en el directorio`app`.

Existen dos puntos de inicio HTML entre los que puedes elegir:

- `index.html`: el punto de inicio predeterminado, que contiene el diseño de Material Design.
- `basic.html`: no incluye diseño, pero sí incluye nuestras mejores prácticas móviles mínimas.

Asegúrate de consultar los [documentos de instalación](https://github.com/google/web-starter-kit/blob/master/docs/install.md) para verificar que tu entorno esté preparado para ejecutar WSK.
Una vez que hayas verificado que tu sistema puede ejecutar WSK, comprueba los [comandos](https://github.com/google/web-starter-kit/blob/master/docs/commands.md) disponibles para comenzar.

## Rendimiento web

Web Starter Kit se esfuerza para ofrecer un punto de inicio de alto rendimiento e innovador. Nuestra prueba media para páginas web [puntajes](http://www.webpagetest.org/result/151201_VW_XYC/){: .external } para la plantilla predeterminada incluye un  [Índice de velocidad](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) de ~1100  (1000 es lo ideal) y un Índice de velocidad de visitas repetidas de ~550 gracias al almacenamiento previo en caché de Service Worker. 

## Compatibilidad con navegadores

En la actualidad, oficialmente apuntamos a admitir las últimas dos versiones de los siguientes navegadores:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

Si embargo, Web Starter Kit puede usarse en navegadores anteriores, pero nos concentraremos en asegurar que nuestros diseños funcionen de manera óptima en los navegadores mencionados.

## Solución de problemas

Si tienes problemas durante la instalación o ejecución de herramientas, consulta nuestra guía de [Solución de problemas](https://github.com/google/web-starter-kit/wiki/Troubleshooting) y luego abre un [problema](https://github.com/google/web-starter-kit/issues). Nos complacerá ayudarte a resolverlo.

## Una opción solo de plantilla

Si prefieres no usar ninguna de nuestras herramientas, borra estos archivos de tu proyecto: `package.json`, `gulpfile.babel.js`, `.jshintrc` y `.travis.yml`. Ahora puedes usar la plantilla de manera segura con un sistema de compilación alternativo o sin ningún sistema de compilación, si así lo prefieres.

## Documentos y recetas

* [Apéndice de archivos](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - ¿Qué hacen los diferentes archivos aquí incluidos?
* [Uso de Sass de Material Design Lite](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - cómo hacer que Sass de MDL funcione con WSK
* [Guías de implementación](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - disponibles para Firebase, Google App Engine y otros servicios.
* [Recetas de Gulp](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - el directorio oficial de recetas de Gulp incluye una lista completa de guías para diferentes flujos de trabajo que puedes agregar a tu proyecto.

## Inspiración

Web Starter Kit está inspirado en [Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/){: .external } y en [generator-gulp-webapp](https://github.com/yeoman/generator-webapp) de Yeoman, y durante su desarrollo se consideraron aportes de colaboradores de ambos proyectos. Nuestras [Preguntas frecuentes](https://github.com/google/web-starter-kit/wiki/FAQ) tienen como objetivo responder preguntas frecuentes sobre el proyecto.


## Más información

Para obtener más información, consulta el código, o para participar, consulta
nuestro informe Git en [https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit)


{# wf_devsite_translation #}
