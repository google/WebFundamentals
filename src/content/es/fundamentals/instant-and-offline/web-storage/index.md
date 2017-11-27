project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# Descripción general del almacenamiento web {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

Es importante elegir los adecuados mecanismos de almacenamiento, tanto para el almacenamiento local de
dispositivos como para el almacenamiento de servidor basado en la nube.  Un buen motor de almacenamiento se asegura de que
tu información se guarde con seguridad, disminuye el ancho de banda y mejora
la capacidad de respuesta. La correcta estrategia de almacenamiento en caché es un componente elemental
para ofrecer experiencias de web móvil sin conexión. 

En este artículo, se proporcionan breves aspectos básicos para evaluar distintas API y servicios de
almacenamiento. A seguir, mostraremos una tabla de comparación y algunas
pautas generales. En un futuro cercano, planeamos agregar recursos para explicar
determinados temas de almacenamiento en mayor profundidad.

## Taxonomía del almacenamiento

Empezaremos por explicar algunas de las dimensiones que sirven para analizar el almacenamiento
de datos en apps web. Más adelante, usaremos este marco para enumerar y evaluar
las distintas opciones de almacenamiento disponibles para los programadores web.

### Modelo de datos

El modelo para almacenar unidades de datos determina cómo se organizan los datos internamente,
lo cual afecta a la facilidad de uso, al costo, y al rendimiento de las solicitudes de almacenamiento y
recuperación de datos. 

* **Estructurado: **Los datos almacenados en tablas con campos predefinidos, como es común
en sistemas de administración de base de datos basadas en SQL,
permiten realizar consultas flexibles
y dinámicas cuando el rango completo de los tipos de consulta puede ser desconocido a priori. Un ejemplo destacado de un almacenamiento de datos estructurado es IndexedDB en el
navegador.

* **Clave/valor:** El almacenamiento clave/valor, y las bases de datos NoSQL relacionadas, permite
almacenar y recuperar datos estructurados que se indexaron con una clave única.
Este almacenamiento es parecido a una tabla hash: permite acceder constantemente
a datos indexados y opacos. Como ejemplos destacados del almacenamiento de datos clave/valor, podemos mencionar a
la Cache API en navegadores y a Apache Cassandra en servidores.

* **Flujo de bytes:** Este modelo simple almacena datos como una cadena de bytes opaca y de longitud
variable. La capa
de la app se encarga de la organización interna. Este modelo es especial para sistemas de archivos y otros conjuntos de datos
organizados de forma jerárquica. Entre los ejemplos destacados de este almacenamiento, se incluyen los
sistemas de archivo y los servicios de almacenamiento en la nube.

### Persistencia

Los métodos de almacenamiento de las apps web se pueden analizar de acuerdo con el ámbito de datos
persistentes.

* **Persistencia de sesión: **Los datos de esta categoría se conservan siempre y cuando
haya una sesión web o pestaña del navegador activa. Un ejemplo de un mecanismo
de almacenamiento con persistencia de sesión es la Session Storage API.

* **Persistencia de dispositivo:** Los datos de esta categoría se conservan entre sesiones y
pestañas/ventanas del navegador dentro de un dispositivo. Un ejemplo de un mecanismo
de almacenamiento con persistencia de dispositivo es la Cache API.

* **Persistencia global:** Los datos de esta categoría se conservan entre sesiones y
dispositivos. Así, se convierte en la forma más robusta de persistencia de datos. Un ejemplo de un mecanismo
de almacenamiento con persistencia global es Google Cloud Storage.

### Compatibilidad con navegadores

Los programadores deben elegir la API que mejor se adapte a sus necesidades; sin embargo,
también deben tener en cuenta que es mejor elegir las API que estén estandarizadas
y bien establecidas en lugar de interfaces personalizadas o privadas porque
tienden a durar más tiempo y cuentan con mayor compatibilidad. Además, es probable que
cuenten con una mayor base de conocimientos y un ecosistema de programador más completo.

### Transacciones

A menudo, es importante que una colección de operaciones de almacenamiento relacionadas
se realice correctamente o falle con atomicidad. Desde hace tiempo, los sistemas de administración de bases de datos
admiten esta funcionalidad a través del modelo de transacción, donde las actualizaciones relacionadas se pueden
agrupar en unidades arbitrarias. Aunque no siempre necesaria, es una funcionalidad conveniente y, a veces, esencial para
solucionar problemas específicos.

### Sincrónico o asincrónico

Algunas API de almacenamiento son sincrónicas: las solicitudes de almacenamiento o
recuperación de datos bloquean el proceso actualmente activo hasta que se hayan completado. Esto
es particularmente molesto en los navegadores web, en donde la solicitud de almacenamiento
comparte el proceso principal con la IU. Por razones de eficiencia y rendimiento,
se prefieren las API de almacenamiento asincrónicas.

## Comparación

En esta sección, analizaremos las API actualmente disponibles para programadores web
y las compararemos en las dimensiones descritas anteriormente.

<table>
  <thead>
    <th>API</th>
    <th>Modelo de 
datos</th>
    <th>Persistencia</th>
    <th>Compatibilidad con
navegadores</th>
    <th>Transacciones</th>
    <th>Sincrónico o asincrónico</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>Flujo de bytes</td>
      <td>Dispositivo</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>No</td>
      <td>Asincrónico</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>Clave/valor</td>
      <td>Dispositivo</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>No</td>
      <td>Sincrónico</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>Clave/valor</td>
      <td>Sesión</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>No</td>
      <td>Sincrónico</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>Estructurado</td>
      <td>Dispositivo</td>
      <td>100%</td>
      <td>No</td>
      <td>Sincrónico</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>Estructurado</td>
      <td>Dispositivo</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>Sí</td>
      <td>Asincrónico</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>Clave/valor</td>
      <td>Dispositivo</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>No</td>
      <td>Asincrónico</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>Híbrido</td>
      <td>Dispositivo</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>Sí</td>
      <td>Asincrónico</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">Cloud Storage</a></td>
      <td>Flujo de bytes</td>
      <td>Global</td>
      <td>100%</td>
      <td>No</td>
      <td>Ambos</td>
    </tr>
  <tbody>
</table>

Como mencionamos antes, recomendamos elegir las API que cuenten con compatibilidad con
la mayor cantidad de navegadores posibles y que ofrezcan modelos de llamadas asíncronas para maximizar
la interoperabilidad con la IU. Naturalmente, estos criterios conducen a las siguientes opciones
tecnológicas:

* Para almacenamientos locales clave/valor de dispositivo, usa Cache API.

* Para almacenamientos locales estructurados de dispositivo, usa IndexedDB.

* Para almacenamientos globales de flujos de bytes, usa el servicio Cloud Storage.

Esta combinación satisface las necesidades de almacenamiento básico en muchas apps web.
Próximamente, publicaremos un artículo sobre cómo trabajar detalladamente con patrones convencionales
de almacenamiento e incluirá ejemplos de código.

## Depuración de almacenamiento en Chrome DevTools {: #devtools }

Consulta los siguientes documentos y obtén más información sobre el uso de Chrome DevTools para
inspeccionar y depurar la API de almacenamiento web que hayas elegido. Si no se menciona una API,
significa que DevTools no la admite o no es aplicable.

* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

Si usas varias API de almacenamiento, consulta la funcionalidad Clear Storage de
DevTools. Te permite borrar varios almacenamientos con solo
un clic. Para obtener más información, consulta [Borrar service workers, almacenamientos, bases de datos y
cachés](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage).


## Pasos siguientes

Ahora que ya analizamos varias formas relevantes de pensar en mecanismos de
almacenamiento, y comparamos las API y los servicios más utilizados en la actualidad,
agregaremos más contenido próximamente para ahondar en uno o más temas
de interés:

* [Recomendaciones de almacenamiento sin conexión para Progressive Web Apps](offline-for-pwa)

* Patrones convencionales de almacenamiento (próximamente)

* Métodos recomendados para almacenamiento de base de datos (próximamente)

* Análisis detallado: IndexedDB (próximamente)

* Análisis detallado: Cache API (próximamente)

* Análisis de marcos de almacenamiento muy utilizados (próximamente)


{# wf_devsite_translation #}
