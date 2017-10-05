project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa el panel Application para inspeccionar, modificar y depurar manifiestos de apps web, service worker y cachés de service worker.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Depurar Progressive Web App {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa el panel <strong>Application</strong> para inspeccionar, modificar
y depurar manifiestos de apps web, service worker y cachés de procesos de trabajo.

Guías relacionadas: 

* [Progressive Web App](/web/progressive-web-apps)

En esta guía, se analizan las características de Progressive Web App en el panel
**Application**. Si buscas ayuda con los otros subpaneles, consulta
la última sección de esta guía, [Otras guías del panel
Application](#other).


### TL;DR {: .hide-from-toc }
- Usa el subpanel <strong>App Manifest</strong> para inspeccionar el manifiesto de la app web y activar los eventos Add to Homescreen.
- Usa el subpanel <strong>Service Workers</strong> para realizar una amplia variedad de tareas relacionadas con los service worker, como anular el registro de un servicio o actualizar un servicio, emular eventos de app, trabajar sin conexión o detener un service worker.
- Consulta la caché del service worker desde el subpanel <strong>Cache Storage</strong>.
- Anula el registro de un service worker y borra todo el almacenamiento y los cachés con un solo botón desde el subpanel <strong>Clear Storage</strong>.


## Manifiesto de las apps web {:#manifest}

Si deseas que los usuarios puedan agregar tu app a la pantalla de inicio de sus dispositivos móviles,
necesitas un manifiesto de apps web. El manifiesto define la manera en que se muestra la app en la
pantalla de inicio, hacia dónde dirigir al usuario cuando se ejecute la app desde la pantalla de inicio y el
aspecto de la app durante el inicio.

Guías relacionadas:

* [Mejora la experiencia del usuario con el manifiesto de apps
  web](/web/fundamentals/engage-and-retain/web-app-manifest)
* [Uso de banners de instalación
  de app](/web/fundamentals/engage-and-retain/app-install-banners)

Cuando hayas configurado el manifiesto, podrás usar el subpanel **Manifest** del panel
**Application** para inspeccionarlo.

![panel manifest][manifest]

* Para ver el código del manifiesto, haz clic en el vínculo debajo de la etiqueta **App Manifest**
 (`https://airhorner.com/manifest.json` en la captura de pantalla anterior).
* Presiona el botón **Add to homescreen** para simular un evento Add to
  Homescreen. Consulta la siguiente sección para obtener más información.
* En las secciones **Identity** y **Presentation**, solo se muestran campos pertenecientes al
  código del manifiesto de forma más descriptiva.
* En la sección **Icons**, se muestran todos los íconos que has especificado.

[manifest]: images/manifest.png

### Simular eventos Add to Homescreen {:#add-to-homescreen}

Solo se podrá agregar una app web a la pantalla de inicio si se visita el sitio dos veces
como mínimo, con un intervalo de, por lo menos, cinco minutos entre las visitas. Durante el desarrollo o
la depuración del flujo de trabajo de Add to Homescreen, estos criterios pueden resultar inconvenientes.
El botón **Add to Homescreen** del subpanel **App Manifest** te permite
simular eventos Add to Homescreen en cualquier momento.

Puedes probar esta función con [Progressive Web App de Google I/O
2016](https://events.google.com/io2016/){: .external }, que admite Add to Homescreen sin
problemas. Si haces clic en **Add to Homescreen** mientras la app está abierta, en Chrome
se mostrará un banner con la leyenda “add this site to your shelf”, que es la versión de
escritorio equivalente del banner “add to Homescreen” de los dispositivos móviles.

![add to desktop shelf][shelf]

**Sugerencia**: Deja abierto el panel lateral de **Console** mientras simulas los eventos
Add to Homescreen. La consola te informa si tu manifiesto tiene problemas y registra más
información sobre el ciclo de vida de Add to Homescreen.

La función **Add to Homescreen** aún no permite simular el flujo de trabajo de dispositivos
móviles. Observa cómo se activó la solicitud “add to shelf” en la
captura de pantalla anterior, aun cuando DevTools se encuentra en Device Mode. Sin embargo, si puedes agregar
correctamente tu app a tu biblioteca de escritorio, también funcionará en dispositivos
móviles.

Si deseas probar la experiencia real en dispositivos móviles, puedes
conectar un dispositivo móvil real a DevTools a través de [la depuración remota][remote
debugging] y hacer clic en el botón **Add to Homescreen** (en DevTools)
para que aparezca la solicitud “Add to Homescreen” en el dispositivo móvil conectado.

[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## Service worker {:#service-workers}

Los service worker son una tecnología fundamental para el futuro de la plataforma web. Son
secuencias de comandos que el navegador ejecuta en segundo plano, independientemente de la página web.
Estas secuencias de comandos te permiten acceder a funciones que no requieren páginas web ni interacción
del usuario, como notificaciones push, sincronización en segundo plano y experiencias sin conexión.

Guías relacionadas:

* [Introducción a Service Workers](/web/fundamentals/primers/service-worker)
* [Notificaciones push: oportunas, relevantes y
  precisas](/web/fundamentals/engage-and-retain/push-notifications)

El subpanel **Service Workers** del panel **Application** es el punto central de
DevTools donde se inspeccionan y depuran los service worker.

![panel service worker][sw]

* Si el service worker está instalado en la página actualmente abierta, lo verás
  en la lista de este subpanel. Por ejemplo, en la captura de pantalla anterior, hay un proceso
  de trabajo de servicio instalado para el ámbito de `https://events.google.com/io2016/`.
* Con la casilla de verificación **Offline**, puedes activar el modo sin conexión de DevTools. Es equivalente
 al modo sin conexión disponible en el panel **Network** o
  a la opción `Go offline` del [menú de comandos][cm].
* Con la casilla de verificación **Update on reload**, puedes hacer que el service worker se
  actualice cada vez que se cargue la página.
* Con la casilla de verificación **Bypass for network**, puedes evitar el service worker y obligar al
  navegador a ir a la red para obtener los recursos solicitados.
* Con el botón **Update**, puedes realizar una única actualización del proceso
  de trabajo de servicio especificado.
* Con el botón **Push**, puedes emular una notificación de aplicación sin carga (también conocida
  como [señal][tickle]).
* Con el botón **Sync**, puedes emular un evento de sincronización en segundo plano.
* Con el botón **Unregister**, puedes anular el registro del service worker especificado. Consulta
  [Borrar el almacenamiento](#clear-storage) para conocer la manera de anular el registro de un service worker, y
  borrar el almacenamiento y los cachés con solo un botón.
* En la línea **Source** aparece información sobre el momento en que se instaló el service worker en
 ejecución. El vínculo es el nombre del archivo de origen perteneciente al service worker. Si haces clic
  en el vínculo, accederás al código del service worker.
* En la línea **Status**, aparece el estado del service worker. El número de
  esta línea (`#1` en la captura de pantalla anterior) indica la cantidad de veces que se actualizó el proceso
  de trabajo de servicio. Si habilitas la casilla de verificación **Update on reload**,
  notarás que el número aumentará cada vez que se cargue la página. Junto al
 estado, aparecerá un botón **start** (si el service worker está detenido) o un
  botón **stop** (si está en ejecución). Los service worker están
  diseñados para que el navegador los detenga e inicie en cualquier momento. Detener
  explícitamente el service worker con el botón **Stop** puede simular eso.
  Detener el service worker es una manera muy útil de probar cómo se comporta
  el código cuando el service worker se reinicia. Con frecuencia,
  revela errores debidos a suposiciones incorrectas sobre el estado global persistente.
* En la línea **Clients** se indica el ámbito de origen del proceso de trabajo de
  servicio. El botón **focus** es generalmente sirve cuando habilitas la casilla de
  verificación **Show all**. Cuando esta casilla de verificación está habilitada, todos los procesos
  de trabajo de servicio se incorporan a la lista. Si haces clic en el botón **focus** junto a un proceso
  de trabajo de servicio que se ejecuta en otra pestaña, Chrome se centra en esa pestaña.

Si el service worker causa algún error, aparece una etiqueta llamada **Errors**.


![service worker con errores][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages#ways-to-send
[errors]: images/sw-error.png

## Cachés de service worker {:#caches}

En el subpanel **Cache Storage**, se proporciona una lista de solo lectura de los recursos que se almacenaron
en caché usando la [API de caché][sw-cache] (del service worker).

![panel de caché del service worker][sw-cache-pane]

Ten en cuenta que la primera vez que abras un caché y agregues un recurso, es posible que DevTools
no detecte el cambio. Vuelve a cargar la página para ver la caché.

Si tienes uno o más cachés abiertos, los verás enumerados debajo del menú desplegable
**Cache Storage**.

![caché de varios service worker][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## Clear storage {:#clear-storage}

El subpanel **Clear Storage** es una función muy útil cuando
se desarrollan apps web progresivas. En este subpanel, puedes anular el registro de service workers,
además de borrar todos los cachés y el almacenamiento con solo presionar un botón. Consulta la siguiente sección
para obtener más información.

Guías relacionadas:

* [Clear
  Storage](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)

## Otras guías del panel Application {:#other}

Consulta las siguientes guías para obtener más información sobre otros subpaneles del panel
**Application**.

Guías relacionadas:

* [Inspeccionar recursos de la página](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [Inspeccionar y administrar el almacenamiento y los cachés
  locales](/web/tools/chrome-devtools/iterate/manage-data/local-storage)


{# wf_devsite_translation #}
