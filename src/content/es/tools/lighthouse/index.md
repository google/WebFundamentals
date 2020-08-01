project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprendé a configurar Lighthouse para que audite tus web apps.

{# wf_updated_on: 2020-07-31 #}
{# wf_published_on: 2016-09-27 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lighthouse {: .page-title }

<img src="/web/tools/lighthouse/images/lighthouse-logo.svg"
      class="lighthouse-logo attempt-right" alt="Lighthouse Logo">

<style>
figure {
  text-align: center;
}
.lighthouse-logo {
  height: 150px;
  width: auto;
}
.lighthouse-call-to-action-container .button-primary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: #2979ff;
}
.button-primary.lighthouse-primary-call-to-action {
  background: url('/web/tools/lighthouse/images/lighthouse-icon-128.png') no-repeat 0 50%;
  background-size: 63px;
  background-color: #304ffe;
  padding: 32px 16px 32px 64px;
}
.lighthouse-call-to-action-container .material-icons {
  margin-right: 4px;
  vertical-align: middle;
}
.lighthouse-call-to-action-container {
  text-align: center;
  margin: 32px;
}
.lighthouse-inline {
  max-height: 1.5em;
  vertical-align: middle;
}
</style>

Lighthouse es una herramienta automatizada [open-source](https://github.com/GoogleChrome/lighthouse),
que busca mejorar la calidad de las páginas web. Podes correrla contra cualquier 
página web, sea pública o requiera autenticación. Cuenta con auditorías de performance,
accesibilidad, progressive web apps, SEO y más. 

Podes ejecutar Lighthouse en Chrome Devtools, desde la línea de comandos, o como un
módulo de Node. Simplemente le das a Lighthouse una URL a auditar, correrá una serie de auditorías
contra la página y luego generará un reporte sobre cuan buena fue la página.
Desde allí, usa las auditorías que han fallado como indicadores sobre cómo improvisar la página.
Cada auditoría tiene un doc de referencia explicando por qué la auditoría es importante,
así como cómo arreglarla.

También puedes usar [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) para prevenir regresiones en tu sitio.

<p class="lighthouse-call-to-action-container">
  <a class="button button-primary lighthouse-primary-call-to-action gc-analytics-event"
     data-category="Lighthouse" data-action="click"
     data-label="Home / Run Lighthouse In DevTools"
     href="#devtools"
     title="Corre Lighthouse en Chrome DevTools">
    Corre Lighthouse en Chrome DevTools
  </a>
  <a class="button button-primary gc-analytics-event"
     data-category="Lighthouse" data-action="click"
     data-label="Home / File Bug"
     href="https://github.com/GoogleChrome/lighthouse/issues/new/choose"
     title="Carga un issue o feature request" target="_blank">
    <span class="material-icons">bug_report</span>
    Cargá un issue
  </a>
</p>

Mirá el video a continuación de Google I/O 2019 para aprender más sobre cómo utilizar
y contribuir a Lighthouse

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="mLjxXPHuIJo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Primeros Pasos {: #primeros-pasos }

Elegí el flujo de Lighthouse que más te sirva:

* [En Chrome DevTools](#devtools). Fácilmente auditá páginas que requieran autenticación,
  y lee tus reportes en un formato amigable al usuario.
* [Desde la línea de comandos](#cli). Automatizá tus corridas de Lighthouse a través de shell scripts.
* [Como un módulo de node](#programmatic). Integrá Lighthouse dentro de tus sistemas de integración continua.
* [Desde una web UI](#psi). Ejecutá Lighthouse y vinculá reportes sin necesidad de instalar nada.

Note: El CLI y flujos de Node requieren que tengas una instancia de Google Chrome 
instalada en tu máquina.

### Ejecutá Lighthouse en Chrome DevTools {: #devtools }

Lighthouse potencia el panel **Audits** de Chrome Devtools. Para correr un reporte:

1. Descargá [Google Chrome para Desktop][desktop].
1. En Google Chrome, ve a la URL que quieres auditar. Puedes auditar cualquier URL de la web.
1. [Abrí Chrome DevTools](/web/tools/chrome-devtools/#open).
1. Haz click en la pestaña **Audits**.

     <figure>
       <img src="images/audits.png" alt="El panel Audits de Chrome DevTools">
       <figcaption>
         <b>Figura 1</b>. A la izquierda se encuentra el viewport de la página que será
         auditada. A la derecha se encuentra el panel <b>Audits</b> de Chrome Devtools,
         el cual ahora se encuentra impulsado por Lighthouse
       </figcaption>
     </figure>

1. Haz click en **Perform an audit**. Devtools mostrará una lista de categorias de auditorías.
   Dejalas todas habilitadas.
1. Haz click en **Run audit**. Luego de unos 30 a 60 segundos, Lighthouse te dará un reporte
   sobre la página.

     <figure>
       <img src="images/cdt-report.png" alt="Un reporte de Lighthouse en Chrome DevTools">
       <figcaption>
         <b>Figura 2</b>. Un reporte de Lighthouse en Chrome DevTools
       </figcaption>
     </figure>

### Instalá y ejecutá la herramienta de línea de comando de Node {: #cli }

Para instalar el módulo de Node:

1. Descargá [Google Chrome para Desktop][desktop].
1. Instalá la versión [Long-Term Support](https://github.com/nodejs/LTS)
   actual de [Node](https://nodejs.org).
1. Instalá Lighthouse. El flag `-g` lo instalará como un módulo global:

        npm install -g lighthouse

Para correr una auditoría:

    lighthouse <url>

Para conocer todas las opciones:

    lighthouse --help

#### Ejecutando el módulo de Node programáticamente {: #programmatic }

Lee [Using programmatically][programmatic] para un ejemplo de Lighthouse
corriendo programaticamente, como un módulo de Node.

[programmatic]: https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically

### Ejecutá Lighthouse como una Extensión de Chrome {: #extension }

Note: Salvo que tengas una razón específica, deberías utilizar el flujo de Chrome Devtools en lugar
de este flujo de Extensión de Chrome. El flujo de Devtools te permite probar sitios locales y páginas autenticadas mientras que con la extensión no podrás hacerlo.

Para instalar la extensión:

1. Descarga [Google Chrome para Desktop][desktop].

1. Instala la <a class="gc-analytics-event" data-category="Lighthouse"
   data-label="Home / Install Extension (Secondary CTA)"
   href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk"
   title="Install Lighthouse Chrome Extension" target="_blank">Lighthouse
   Chrome Extension</a> desde el Chrome Webstore.

[desktop]: https://www.google.com/chrome/browser/desktop/

Para correr una auditoría:

1. En Chrome, dirígete a la página que deseas auditar.

1. Hacé click en **Lighthouse** ![Lighthouse][icon]{:.lighthouse-inline}. Deberías verlo 
   al lado de la barra de direcciones de Chrome. Sino, abrí el menu principal de Chrome
   y accedelo desde arriba del menú. Luego de hacer click, el menu de Lighthouse se desplegará

     <figure>
       <img src="images/extension.png" alt="La extension de Lighthouse">
       <figcaption>
         <b>Figura 3</b>. El menú de Lighthouse
       </figcaption>
     </figure>

[icon]: images/lh_favicon_32px.png

1. Hacé click en **Generar reporte**. Lighthouse corre su auditoría contra la
   página actualmente activa, luego abrirá una una nueva pestaña con un reporte
   de los resultados.

     <figure>
       <img src="images/report.png" alt="El reporte de Lighthouse">
       <figcaption>
         <b>Figura 4</b>. Un reporte de Lighthouse
       </figcaption>
     </figure>

### Ejecutá PageSpeed Insights {: #psi }

Para ejecutar Lighthouse en PageSpeed Insights:

1. Navegá a [PageSpeed Insights](/speed/pagespeed/insights/).
1. Ingresá la URL de una página web.
1. Hacé click en **Analyze**.

     <figure>
       <img src="images/lighthouse-psi.png" alt="La UI de PageSpeed Insights.">
       <figcaption>
         <b>Figura 5</b>. La UI de PageSpeed Insights
       </figcaption>
     </figure>


## Compartí y mirá reportes online {: #report-viewer }

Usá [Lighthouse Viewer][viewer] para ver y compartir reportes online.

<figure>
  <img src="images/viewer.png" alt="El Lighthouse Viewer.">
  <figcaption>
    <b>Figura 6</b>. El Lighthouse Viewer
  </figcaption>
</figure>

[viewer]: https://googlechrome.github.io/lighthouse/viewer/

### Compartí reportes como JSON {: #json }

Lighthouse Viewer necesita la salida en formato JSON de un reporte de Lighthouse. 
La siguiente lista explica cómo obtener la salida en formato JSON dependiendo de
qué flujo de Lighthouse estés usando:

* **Chrome DevTools**. Haz click en **Download Report** ![Download
  Report](images/download-report.png){:.cdt-inl}.
* **Línea de comandos**. Ejecutá:

    `lighthouse --output json --output-path <path/for/output.json>`

* **Lighthouse Viewer**. Haz click en **Export** > **Guardar como JSON**.

Para ver los datos del reporte:

1. Abrí [Lighthouse Viewer][viewer] en Google Chrome.
1. Arrastrá el archivo JSON hasta el [Viewer][viewer], o haz click en cualquier lugar del [Viewer][viewer] para
   abrir tu navegador de archivos y selecciona el archivo.

### Compartí reportes como GitHub Gists {: #gists }

Si no querés estar pasando manualmente los archivos JSON, podes compartir tus
reportes como [Secret GitHub Gists](https://docs.github.com/en/enterprise/2.13/user/articles/about-gists#secret-gists). Un beneficio de utilizar Gists es que tendrás control de versión.

Para exportar un reporte como un Gist, desde el reporte:

1. (Si ya te encuentras en [Viewer][viewer] saltea este paso) Haz click en **Export** > **Open In Viewer**. El reporte
   se abrirá en [Viewer][viewer], ubicado en `https://googlechrome.github.io/lighthouse/viewer/`.
1. En [Viewer][viewer], haz click en **Share** ![Share][share]{: .lighthouse-inline}. La
   primera vez que hagas esto, un popup pedirá permiso a tu información básica de
   GitHub, asó como permisos de lectura y escritura en tus Gists.

Para exportar un reporte como un Gist, desde la versión CLI de Lighthouse,
simplemente crea manualmente un Gist y copy-pastea el reporte en formato JSON a tu Gist.
El nombre del Gist debe terminar con `.lighthouse.report.json`.
Lee [Share reports as JSON](#json) para un ejemplo sobre cómo generar una salida JSON desde
la línea de comandos.

Para ver un reporte que fue guardado como un Gist:

* Agregá `?gist=<ID>` a la URL de Viewer, donde `<ID>` es el ID del Gist.

    `https://googlechrome.github.io/lighthouse/viewer/?gist=<ID>`

* Abrí el [Viewer][viewer], y pegá allí la URL del gist.

[share]: images/share.png

## Extensibilidad de Lighthouse {: #extensibility }

Lighthouse apunta a proveer una guía que sea relevante y accionable para todos los desarrolladores web. Con este objetivo, hay dos funcionalidades actualmente disponibles que te permiten ajustar Lighthouse a tus necesidades específicas.

* **Stack Packs**. 
Hoy en día muchos desarrolladores utilizan distintas tecnologías (backend/CMS/JavaScript frameworks) para construir sus páginas web.
En vez de tan solo mostrar recomendaciones generales, Lighthouse ahora puede proveerte consejos más relevantes y accionables dependiendo de la tecnología usada.

Stack Packs le permite a Lighthouse detectar sobre qué tecnología se encuentra construido tu sitio y mostrar recomendaciones específicas basadas en tu stack/tecnología. Estas recomendaciones son definidas y curadas por expertos de la comunidad.

Para contribuir a Stack Pack, revisá el archivo de [Contributing Guidelines](https://github.com/GoogleChrome/lighthouse-stack-packs/blob/master/CONTRIBUTING.md).

* **Lighthouse Plugins**. 
Los Plugins de Lighthouse permiten a los expertos de dominios de la comunidad, extender la funcionalidad de Lighthouse para sus necesidades específicas. Ahora podes potenciar los datos que Lighthouse recolecta para crear nuevas auditorías. En su núcleo, un plugin de Lighthouse es un módulo de Node que implementa una serie de comprobaciones que serán corridas por Lighthouse y sumadas al reporte como una nueva categoría.

Para más información sobre cómo crear tu propio plugin, lee el [Plugin Handbook](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md) en el repositorio GitHub de Lighthouse. 


## Contribuir

Lighthouse es de código abierto y [las contribuciones son bienvenidas](https://github.com/GoogleChrome/lighthouse/blob/master/CONTRIBUTING.md). Consulta el [rastreador de problemas](https://github.com/GoogleChrome/lighthouse/issues) del
repositorio
para buscar los errores que puedes corregir, o las auditorías que puedes crear o mejorar.
El rastreador de problemas también es un buen lugar para debatir la métrica de auditoría, ideas para
nuevas auditorías, o cualquier cosa relacionada con Lighthouse.

[example]: https://github.com/justinribeiro/lighthouse-mocha-example/blob/master/test/lighthouse-tests.js

{# wf_devsite_translation #}
