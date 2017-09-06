project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Obtén información sobre cómo configurar Lighthouse para que audite tus apps web.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-27 #}

# Auditar apps web con Lighthouse {: .page-title }

[Lighthouse](https://github.com/GoogleChrome/lighthouse) es una herramienta automatizada
de código abierto diseñada para mejorar la calidad de tus apps web. Puedes ejecutarla como una
extensión de Chrome o desde la línea de comandos. Le proporcionas a Lighthouse una URL
que quieres auditar, Lighthouse ejecuta una serie de pruebas contra la página, y luego
genera un informe sobre el rendimiento de la página. A partir de aquí, puedes usar
las pruebas desaprobadas como indicadores de lo que puedes hacer para mejorar tu app.

Note: Lighthouse actualmente tiene un gran enfoque sobre las funciones de las Progressive Web Apps, como Add to homescreen y soporte sin conexión. Sin embargo, el objetivo general del proyecto es ofrecer una auditoría de extremo a extremo de todos los aspectos de la calidad de la app web.

## Primeros pasos

Existen dos modos de ejecutar Lighthouse, como una extensión de Chrome, o como una herramienta de la línea
de comando. La extensión de Chrome ofrece una interfaz más descriptiva para
leer los informes. La herramienta de la línea de comandos permite integrar Lighthouse en
sistemas de integración continua.

### Extensiones de Chrome

Descargar Google Chrome 52 o posterior.

Instalar la [extensión de Chrome de Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk).

Ve a la página que quieres auditar.

Haz clic en el ícono de Lighthouse (![Lighthouse 
icon](images/lighthouse-icon-16.png)) que se encuentra en la barra de herramientas de Chrome.

![Ícono de Lighthouse en la barra de herramientas de Chrome](images/icon-on-toolbar.png)

Si no ves el ícono en tu barra de herramientas, es posible que esté oculto en el menú principal
de Chrome.

![Ícono de Lighthouse en el menú de Chrome](images/icon-in-menu.png)

Después de hacer clic en el ícono, debes ver un menú.

![Menú de Lighthouse](images/menu.png)

Si solo quieres ejecutar un subconjunto de auditorías, haz clic en el botón **Options** 
 y deshabilita las auditorías que no quieres ejecutar. Desplázate hacia abajo y presiona **OK**
para confirmar los cambios.

![Menú de opciones de Lighthouse](images/options.png)

Haz clic en el botón **Generate report** para ejecutar las pruebas de Lighthouse contra la página
actualmente abierta.

Cuando terminan las auditorías, Lighthouse abre una nueva pestaña y muestra un
informe en los resultados de la página.

![Informe de Lighthouse](images/report.png)

### Herramienta línea de comandos

Instalar [Node](https://nodejs.org), versión 5 o posterior.

Instalar Lighthouse como un módulo de Node global.

    npm install -g lighthouse

Ejecuta una auditoría de Lighthouse contra una página.

    lighthouse https://airhorner.com/

Pasa el marcador `--help` para ver las opciones de entrada y salida disponibles.

    lighthouse --help

## Contribuir

Lighthouse es de código abierto y se aceptan contribuciones. Consulta el [rastreador de problemas](https://github.com/GoogleChrome/lighthouse/issues) del
repositorio
para buscar los errores que puedes corregir, o las auditorías que puedes crear o mejorar.
El rastreador de problemas también es un buen lugar para debatir la métrica de auditoría, ideas para
nuevas auditorías, o cualquier cosa relacionada con Lighthouse.


{# wf_devsite_translation #}
