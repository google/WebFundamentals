project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a almacenar datos de forma local para mejorar los tiempos de respuesta y la compatibilidad sin conexión.

{# wf_updated_on: 2016-09-29 #}
{# wf_published_on: 2016-09-29 #}

# Almacenamiento sin conexión para Progressive Web Apps {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="PWA en DevTools">
  <figcaption>
    La Progressive Web App de <a href="https://pokedex.org" class="external">Pokedex</a>
    utiliza IndexedDB para el estado de la app y el conjunto de datos de los
    pokemon, mientras que la Cache API se usa para recursos localizables mediante URL.
  </figcaption>
</figure>

Cuando te trasladas de un lugar a otro, las conexiones de Internet pueden ser débiles o inexistentes. Por eso, ofrecer
compatibilidad y un rendimiento confiable sin conexión es una característica común de las [apps web
progresivas](/web/progressive-web-apps/). Incluso en entornos
con perfectas conexiones inalámbricas, el uso sensato de almacenamiento en caché y de otras técnicas
de almacenamiento puede mejorar considerablemente la experiencia del usuario. En esta publicación, resumiremos
algunas ideas sobre el almacenamiento de datos sin conexión de las PWA (piensa en las cargas
JSON, las imágenes y los datos estáticos generales necesarios para brindar una *valiosa*
experiencia sin conexión).

<div class="clearfix"></div>

## Recomendación

Vayamos directamente al grano con una recomendación global para almacenar datos
sin conexión:

* Para los recursos localizables mediante URL, usa la [**Cache API**](https://davidwalsh.name/cache)
  (parte de [los Service Workers](/web/fundamentals/primers/service-worker/)).
* Para el resto de los datos, usa [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  (con un contenedor de [promesas](/web/fundamentals/getting-started/primers/promises)).

Este es el fundamento:

Ambas API son asíncronas (IndexedDB está basada en eventos y Cache API, en
promesas). También funcionan con [Web Workers, y Window y Service
Workers](https://nolanlawson.github.io/html5workertest/). IndexedDB se encuentra disponible
en [todos lados](http://caniuse.com/#feat=indexeddb). Los Service
Workers (y la Cache API) [ahora
se encuentran disponibles](https://jakearchibald.github.io/isserviceworkerready/) en Chrome,
Firefox y Opera, y están en desarrollo para Edge. Los contenedores de promesas de
IndexedDB ocultan algunos de los mecanismos potentes, pero complejos
(p. ej., transacciones y versiones de esquemas), que se incluyen en la biblioteca de
IndexedDB. IndexedDB admitirá
[observadores](https://github.com/WICG/indexed-db-observers), que posibilitan una sincronización simple
entre pestañas.

Safari 10
[corrigió varios errores antiguos de IndexedDB](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)
en sus últimas Technology Preview. NOTA:  Algunas personas tuvieron problemas
de estabilidad con IndexedDB y PouchDB en Safari 10, y lo consideran un
poco lento. Hasta que se investigue más sobre el tema, tu recorrido puede variar.
Prueba los errores del navegador y repórtalos para que la gente de @webkit y otros autores de bibliotecas de
OSS puedan examinarlos. De forma predeterminada, LocalForage, PouchDB, YDN y Lovefield
usan WebSQL en Safari (debido a que no hay una forma eficaz de
probar características defectuosas en IndexedDB). Esto significa que estas bibliotecas funcionarán en
Safari 10 sin esfuerzo adicional (solo que sin usar IndexedDB directamente).

Para las PWA, puedes almacenar en caché los recursos estáticos, usando Cache API para componer la shell de tu app
(archivos JS/CSS/HTML), y completar los datos de la página sin conexión desde
IndexedDB. Ahora se puede depurar IndexedDB en
[Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)
(pestaña Application),
Opera, [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)
(Storage Inspector) y Safari (consulta la pestaña Storage).

## ¿Qué ocurre con otros mecanismos de almacenamiento?

El almacenamiento web (p. ej., LocalStorage y SessionStorage) es sincrónico, no admite Web
Workers, y tiene límites de tamaño y tipo (solo strings). Las cookies [son útiles para algunas
cosas](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), pero son
sincrónicas, no admiten Web Workers y también tienen límites de tamaño.
WebSQL no es compatible con varios navegadores y no se recomienda usarlo.
La File System API no es compatible con ningún navegador, excepto Chrome. La
[File API](https://developer.mozilla.org/en-US/docs/Web/API/File) se
está mejorando en la
[File and Directory Entries API](https://wicg.github.io/entries-api/)
y en las especificaciones de [File API](https://w3c.github.io/FileAPI/), pero ninguna es lo
suficientemente madura o está estandarizada para incentivar una adopción a gran escala.

## ¿Cuánto puedo almacenar?

<table>
  <thead>
    <th>Navegador</th>
    <th>Límite</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>&lt;6% del espacio libre</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>&lt;10% del espacio libre</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>&lt;50 MB</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>&lt;250 MB</td>
    </tr>
  <tbody>
</table>

En Chrome y Opera, el almacenamiento es por origen (y no por API). Ambos
mecanismos de almacenamiento permitirán almacenar datos hasta alcanzar la
[cuota](http://www.html5rocks.com/en/tutorials/offline/quota-research/) del
navegador. Las apps pueden controlar la cuota que utilizan con la [Quota Management
API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota). En Chrome,
las apps pueden usar hasta un 6% del espacio
libre en el disco. En Firefox, las apps pueden usar hasta un 10% del espacio libre en el disco, pero le
avisará al usuario cuando se solicite almacenamiento después de haber almacenado 50 MB de datos. En Safari
para dispositivos móviles, las apps pueden usar un máximo de 50 MB, mientras que en la versión de escritorio, el almacenamiento es
ilimitado (con advertencias después de los 5 MB). El máximo de IE10 es 250 MB y le advierte al usuario después de
10 MB. PouchDB [realiza un seguimiento](https://pouchdb.com/faq.html#data_limits) del comportamiento
del almacenamiento de IDB.

## ¿Cómo puedo averiguar la cantidad de espacio de almacenamiento que utiliza mi app?

En Chrome, la [Quota Management API](https://www.w3.org/TR/quota-api/) te permite
consultar la cantidad de espacio de almacenamiento actualmente en uso y cuánto
tiene disponible la app. Una [Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736) más nueva usa promesas para que sea aún más
fácil averiguar la cuota que utiliza
el origen.

## ¿Cómo funciona el descarte de caché?

<table>
  <thead>
    <th>Navegador</th>
    <th>Política de descarte</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>LRU cuando Chrome se queda sin espacio</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>LRU cuando el disco está lleno</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>Sin descarte</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>Sin descarte</td>
    </tr>
  <tbody>
</table>

A los orígenes, se les atribuye una cantidad de espacio para que utilicen como deseen. Todos los mecanismos de
almacenamiento de origen (IndexedDB, Cache API,
localStorage, etc.) comparten este espacio libre. No se especifica la cantidad asignada, y variará según condiciones
del dispositivo y condiciones de almacenamiento.

Cuando queda poco almacenamiento web, un usuario-agente libera espacio de almacenamiento. Esto
puede tener un impacto en las respuestas sin conexión. En consecuencia, la recientemente actualizada especificación de
[Storage](https://storage.spec.whatwg.org/) define estrategias “persistentes” y
de “mejor esfuerzo” (esta última es la estrategia predeterminada). “Mejor esfuerzo”
significa que el almacenamiento se puede liberar sin interrumpir al usuario, pero es menos
duradera para datos a largo plazo o críticos. Actualmente, tanto IndexedDB como la Cache API
se encuentran en la categoría de “mejor esfuerzo”.

El almacenamiento “persistente” no se libera automáticamente cuando hay poco espacio. El
usuario debe liberar manualmente este almacenamiento (a través de configuraciones del navegador). Chrome ha
estado experimentando con la compatibilidad con [almacenamiento
persistente](/web/updates/2016/06/persistent-storage)
en una prueba de origen y las últimas novedades sugieren que se incluirá en
[Chrome
55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ).

## Recursos actuales y futuros del almacenamiento sin conexión

Si te interesa el almacenamiento sin conexión, te recomendamos los siguientes
recursos.

* [Almacenamiento duradero](https://storage.spec.whatwg.org/): protege el almacenamiento de las
políticas de eliminación de datos del usuario-agente.

* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): gestión
avanzada de datos clave-valor.

* [IndexedDB
con promesas](https://github.com/inexorabletash/indexeddb-promises): compatibilidad
nativa con una versión de IndexedDB apta para promesas.

* [Observadores de IndexedDB](https://github.com/WICG/indexed-db-observers): observación de
IndexedDB nativa sin necesidad de contenedores en la base de datos.

* [Async Cookies API](https://github.com/bsittler/async-cookies-api): API de cookies de JavaScript
asíncrona para documentos y workers.

* [Quota Management API](https://www.w3.org/TR/quota-api/): permite conocer la cantidad
de cuota que una app o un origen está utilizando.

* [writable-files](https://github.com/WICG/writable-files): permite que los sitios
interactúen con los archivos locales de forma más dinámica.

* [Descargas de directorios](https://github.com/drufball/directory-download): permite que los sitios
descarguen directorios sin archivos .zip.

* [File and Directory Entries API](https://wicg.github.io/entries-api/):
permite cargar archivos y directorios mediante la función de arrastrar y colocar.

* Se está esbozando una [Async Cookies
API](https://github.com/WICG/async-cookies-api) con
polyfill en desarrollo.

* Actualmente, Edge no admite la depuración de IndexedDB (sin embargo, es posible
depurar el JetDB subyacente). Puedes votar
[aquí](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)
para solicitar que se incorpore la compatibilidad.

* Aunque ya se han debatido [ideas](https://github.com/slightlyoff/async-local-storage) sobre
LocalStorage asíncrono, la atención se centra, actualmente, en mejorar el estado de
[IndexedDB 2.0](https://w3c.github.io/IndexedDB/).

* Es posible que, en un futuro, la propuesta de [writable-files](https://github.com/WICG/writable-files) nos
brinde una solución en vía de estandarización que nos permita interactuar
con archivos locales sin problema.

* Para las apps que requieran almacenamiento más persistente, consulta el desarrollo actual del
[almacenamiento duradero](https://storage.spec.whatwg.org/).

El almacenamiento sin conexión no es algo mágico; si conoces las API subyacentes, te será
más fácil aprovechar al máximo los recursos disponibles actualmente.
Tanto si prefieres usar directamente estas API o trabajar con una biblioteca
de abstracción, es conveniente que te tomes un tiempo para familiarizarte con las opciones.

¡Esperamos que esta guía te ayude a desarrollar una experiencia sin conexión que haga brillar a tu
PWA! ✨

### Lectura adicional

* [El estado de las API
de almacenamiento sin conexión](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
de Joshua Bell

* [Comparación de
las bases de datos de los navegadores](http://nolanlawson.github.io/database-comparison/) de Nolan Lawson

* [IndexedDB, WebSQL y LocalStorage : ¿qué bloquea al
DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)

* [Cómo pensar en las bases de datos (búsqueda en
Pokedex)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)

* [¿Cuáles son las API compatibles en Web Workers y Service
Workers?](https://nolanlawson.github.io/html5workertest/)

### Recursos útiles

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) (almacenamiento en caché sin conexión
para solicitudes dinámicas/en tiempo de ejecución)

* [sw-precache](https://github.com/GoogleChrome/sw-precache) (almacenamiento previo en caché
sin conexión para shells de recursos estáticos/aplicaciones)

* Posibilidad de los usuarios de webpack de usar los elementos anteriores u
[offline-plugin](https://github.com/NekR/offline-plugin)

### Bibliotecas de IndexedDB que vale la pena investigar

* [localForage](https://github.com/localForage/localForage)(~8 KB, promesas y buena
compatibilidad con navegadores heredados)

* [Dexie](http://dexie.org/) (~16 KB, promesas, consultas complejas e índices
secundarios)

* [PouchDB](https://pouchdb.com/) (~45 KB, admite [compilaciones
personalizadas](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)) y
sincronización)

* [Lovefield](https://github.com/google/lovefield) (relacional)

* [LokiJS](http://lokijs.org/#/) (en memoria)

* [ydn-db](https://github.com/yathit/ydn-db) (similar a Dexie y funciona con WebSQL)

**Gracias a Nolan Lawson, Joshua Bell (su trabajo sobre almacenamiento libre en la web y su
[presentación en BlinkOn](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
inspiraron mucho este artículo), Jake Archibald, Dru Knox y otros por su
labor anterior sobre espacio de almacenamiento en la web.**



{# wf_devsite_translation #}
