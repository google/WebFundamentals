project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecciona y administra almacenamiento, bases de datos y memorias caché desde el panel Application.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecciona y administra almacenamiento, bases de datos y memorias caché {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
Inspecciona y administra almacenamiento, bases de datos y memorias caché desde el panel
<strong>Application</strong>.


### TL;DR {: .hide-from-toc }
- Mira y edita almacenamiento local y de sesión.
- Inspecciona y modifica bases de datos IndexedDB.
- Ejecuta sentencias en una base de datos Web SQL.
- Visualiza cachés de apps y service workers.
- Borra por completo el almacenamiento, las bases de datos, los cachés y los service workers con un solo clic.


## Almacenamiento local{:#local-storage}

Si usas [almacenamiento local][ls] para guardar pares clave-valor (KVP), puedes
inspeccionar, modificar y borrar estos KVP desde el subpanel **Local Storage**.

![subpanel local storage][ls-pane]

* Haz doble clic en una clave o un valor para editar ese valor.
* Haz doble clic en una celda vacía para agregar un KVP nuevo.
* Haz clic en un KVP y luego presiona el botón **delete**
  (![botón delete][delete]{:.inline}) para borrar ese KVP. Puedes
  borrar todos los datos del almacenamiento local con un solo clic en un botón desde el
  [subpanel **Clear storage**](#clear-storage).
* Si al interactuar con una página se crean, borran o modifican
  KVP, no verás esos cambios actualizados en tiempo real. Haz clic en el botón
  **refresh** (![botón refresh][refresh]{:.inline}) para ver los cambios.

[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[subpanel ls]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Almacenamiento de sesión{:#session-storage}

El subpanel **Session Storage** funciona igual que el subpanel **Local Storage**.
 Consulta la sección [Almacenamiento local](#local-storage) anterior para aprender la manera de
ver y editar el [almacenamiento de sesión][ss].

[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

Usa el subpanel **IndexedDB** para inspeccionar, modificar y borrar datos de IndexedDB.

Cuando expandes el subpanel **IndexedDB**, el primer nivel debajo de este son las
bases de datos. Si hay varias bases de datos activas, verás diferentes
entradas. En la captura de pantalla siguiente, solo hay una base de datos activa.

![pestaña indexeddb][idb-tab]

Haz clic en el nombre de una base de datos para ver el origen de la seguridad, el nombre y la versión
de dicha base de datos.

![base de datos de indexeddb][idb-db]

Expande una base de datos para visualizar sus pares clave-valor (KVP).

![pares clave-valor de indexeddb][idb-kvps]

Usa los botones de desplazamiento junto al campo de texto **Start from key** para moverte por las
páginas de KVP.

Expande un valor y haz doble clic para editarlo.
Cuando agregas, modificas o borras valores, esos cambios no se actualizan en
tiempo real. Haz clic en el botón **refresh** para actualizar una base de datos.
![edición de un kvp de indexeddb][idb-edit]

Ingresa una clave en el campo de texto **Start from key** para filtrar todas las claves con
un valor inferior al proporcionado.

![kvp filtrados][idb-filter]

Cuando agregas, modificas o borras valores, esos cambios no se actualizan en
tiempo real. Haz clic en el botón **refresh** (![botón refresh][refresh]{:.inline})
para actualizar la base de datos.

Haz clic en el botón **clear object store** (![clear object store][cos]{:.inline})
para borrar todos los datos de la base de datos. Además de esto,
también puedes anular el registro de service workers, y borrar otro almacenamiento y otros cachés con
un solo clic desde el [subpanel **Clear storage**](#clear-storage).

[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

Usa el subpanel **Web SQL** para consultar y modificar bases de datos Web SQL.

Haz clic en el nombre de una base de datos si deseas abrir una consulta para esa base de datos. Desde aquí,
puedes ejecutar sentencias en la base de datos.

![consola de web sql][wsc]

Haz clic en la tabla de una base de datos para ver los datos de la tabla.

![tabla de web sql][wst]

* No puedes actualizar valores desde aquí, pero puedes hacerlo mediante la consola
  de la base de datos (consulta arriba).
* Haz clic en el título de una columna para ordenar la tabla conforme a esa columna.
* Los cambios que realices en la tabla no se actualizarán en tiempo real. Haz clic en el botón
  **refresh** (![botón refresh][refresh]{:.inline}) para ver las
  actualizaciones.
* Ingresa una lista separada por espacios o comas con nombres de columnas en el campo de texto
  **Visible columns** para ver solamente esas columnas.

[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## Application Cache {:#application-cache}

Usa el subpanel **Application Cache** para inspeccionar recursos y reglas que se
crearon mediante la [Application Cache API][appcache-api].

![subpanel application cache][appcache]

Cada fila representa un recurso.

La columna **Type** tendrá uno de los siguientes valores:

* **Master**: el atributo `manifest` del recurso indicó que este es un
  caché maestro.
* **Explicit**: este recurso se incluyó explícitamente en el manifiesto.
* **Network**: en el manifiesto, se especificó que este recurso debe provenir de la
  red.
* **Fallback**: la URL de la columna **Resource** se mencionó como respaldo
  de otra URL (no se muestra en DevTools).

En la parte inferior de la tabla, se encuentran íconos de estado que indican la conexión de la
red y el estado de la caché de la app. La caché de la aplicación
puede tener los siguientes estados:

* **IDLE**: no hay cambios nuevos en la caché.
* **CHECKING**: se encuentra en curso el proceso de obtención del manifiesto y búsqueda de actualizaciones en él.
* **DOWNLOADING**: se encuentra en curso el proceso de adición al caché.
* **UPDATEREADY**: se encuentra disponible una versión nueva del caché.
* **OBSOLETE**: se encuentra en curso el proceso de borrado de la caché.

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## Cachés de service worker {:#service-worker-caches}

El subpanel **Cache Storage** en el panel **Application** te permite inspeccionar,
modificar y depurar los cachés creados con la API de caché (proceso de trabajo). Consulta
la guía que figura a continuación para obtener más ayuda.

{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## Borra service workers, almacenamiento, bases de datos y cachés {:#clear-storage}

Algunas veces, simplemente necesitas borrar todos los datos provenientes de un origen determinado. El subpanel **Clear
Storage** en el panel **Application** te permite anular selectivamente el registro de
service workers, almacenamiento y cachés. Para borrar los datos, simplemente habilita las casillas de verificación
que están junto a los componentes que deseas borrar y luego haz clic en **Clear site
data**. La acción borra todos los datos del origen indicado en la etiqueta
**Clear storage**.

![clear storage][clear]

[borrar]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
