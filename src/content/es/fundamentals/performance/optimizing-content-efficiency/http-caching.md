project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Almacenar en caché y reutilizar recursos obtenidos previamente es un aspecto crítico de la optimización para lograr un buen rendimiento.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Almacenamiento en caché de HTTP {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

El proceso de obtención a través de la red es lento y costoso: las respuestas de gran volumen requieren muchos recorridos entre el cliente y el servidor, de lo cual surgen demoras cuando están disponibles y pueden ser procesadas por el navegador, y también genera costos por consumo de datos para el visitante. Como consecuencia, la capacidad de almacenamiento en caché y reutilización de recursos obtenidos previamente es un aspecto crítico de la optimización para lograr un buen rendimiento.


Buenas noticias, en todos los navegadores se incluye una implementación de un caché HTTP. Lo único que debes hacer es asegurarte de que cada respuesta del servidor proporcione las directivas de encabezado HTTP correctas para indicar al navegador cuándo y durante cuánto tiempo puede almacenar la respuesta en caché.

Note: Si usas una WebView para obtener y mostrar contenido web en tu app, es posible que necesites proporcionar marcadores de configuración adicionales para garantizar que la caché HTTP esté habilitado, que su tamaño se fije en un número razonable para tu caso de uso y que la caché se mantenga. Lee la documentación de la plataforma y confirma tu configuración.

<img src="images/http-request.png"  alt="Solicitud HTTP">

Cuando el servidor muestra una respuesta, también emite un conjunto de encabezados HTTP que describen el tipo de contenido, la extensión, las directivas de almacenamiento en caché y el token de validación, entre otros aspectos. Por ejemplo, en el intercambio anterior, en el servidor se muestra una respuesta de 1024 bytes, se indica al cliente que la almacene en caché durante un plazo de hasta 120 segundos y se proporciona el token de validación (“x234dff”) que se puede usar después de que la respuesta caduca para verificar si se modificó el recurso.


## Validación de respuestas almacenadas en caché con ETags

### TL;DR {: .hide-from-toc }
* El servidor usa el encabezado ETag de HTTP para comunicar un token de validación.
* El token de validación permite comprobar actualizaciones de los recursos de manera eficaz, sin transferencia de datos si el recurso no se ha modificado.


Supongamos que ya pasaron 120 segundos desde la obtención inicial y el navegador inició una nueva solicitud para el mismo recurso. Primero, el navegador revisa la caché local y encuentra la respuesta anterior. Desafortunadamente, no puede usarla porque la respuesta caducó. En este momento, el navegador podría simplemente enviar una solicitud nueva y obtener la nueva respuesta completa. Pero eso no resulta eficiente, ya que si el recurso no se modificó, no hay motivo para descargar exactamente los mismos bytes que ya están en la caché.

Ese es el problema que pueden resolver los tokens de validación, tal como se especifica en el encabezado ETag: el servidor genera y muestra un token arbitrario que normalmente es un hash o alguna otra huella digital del contenido del archivo. No es necesario que el cliente conozca la forma en que se genera la huella digital; solo debe enviársela al servidor en la próxima solicitud. Si la huella digital aún es la misma, el recurso no se habrá modificado y puede omitir la descarga.

<img src="images/http-cache-control.png"  alt="Ejemplo de Cache-Control HTTP">

En el ejemplo anterior, el cliente proporciona automáticamente el token ETag en el encabezado de la solicitud HTTP “If-None-Match”, el servidor compara el token con el recurso actual. Si el token no ha cambiado, muestra una respuesta “304 Not Modified” en la cual se indica al navegador que la respuesta que tiene en la caché no cambió y puede renovarse durante otros 120 segundos. Ten en cuenta que no es necesario volver a descargar la respuesta; esto nos ahorra tiempo y ancho de banda.

Como desarrollador web, ¿cómo aprovechas una revalidación eficaz? El navegador hace todo el trabajo por nosotros. El navegador detecta de manera automática si se especificó un token de validación previamente, lo anexará a la solicitud en curso y actualizará las marcas de tiempo de la caché según sea necesario en función de la respuesta recibida desde el servidor. **Lo único que queda por hacer es asegurarse de que el servidor proporcione los tokens ETag necesarios: consulta la documentación de tu servidor para obtener los marcadores de configuración necesarios.**

Note: Sugerencia: El proyecto HTML5 Boilerplate contiene <a href='https://github.com/h5bp/server-configs'>ejemplos de archivos de configuración</a> para los servidores más populares con comentarios detallados para cada marcador de configuración y cada ajuste: encuentra tu servidor favorito en la lista, busca los ajustes correspondientes, copia tu servidor y confirma que esté configurado con los ajustes recomendados.

## Cache-Control

### TL;DR {: .hide-from-toc }
* Cada recurso puede definir su política de almacenamiento en caché mediante el encabezado HTTP Cache-Control.
* Las directivas Cache-Control determinan quiénes pueden almacenar en caché la respuesta, en qué circunstancias y durante cuánto tiempo.


Desde el punto de vista de la optimización del rendimiento, la mejor solicitud es aquella que no necesita comunicarse con el servidor: una copia local de la respuesta te permite eliminar toda la latencia de la red y evitar cargos por datos para la transferencia de datos. Para lograr esto, la especificación HTTP permite que el servidor muestre [directivas Cache-Control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) que controlan la manera en que el navegador y otros cachés intermedios pueden almacenar la respuesta individual en la caché y el tiempo durante el cual pueden hacerlo.

Note: El encabezado Cache-Control se definió como parte de la especificación HTTP/1.1 y reemplaza encabezados anteriores (por ejemplo, Expires) empleados para definir políticas de almacenamiento de respuestas en caché. Todos los navegadores modernos son compatibles con Cache-Control, así que es todo lo que necesitas.

<img src="images/http-cache-control-highlight.png"  alt="Ejemplo de Cache-Control HTTP">

### "no-cache" y "no-store"

“no-cache” indica que la respuesta obtenida no se puede usar para satisfacer una solicitud posterior a la misma URL sin antes consultar con el servidor si la respuesta se ha modificado. En consecuencia, si hay un token de validación (ETag) adecuado presente, “no-cache” genera un recorrido para validar la respuesta almacenada en caché, pero puede eliminar la descarga si el recurso no ha cambiado.

Por el contrario, "no-store" es mucho más simple, ya que no permite al navegador, ni a ninguno de los cachés intermedios, almacenar ninguna versión de la respuesta que se muestra; por ejemplo, una que contenga datos personales o bancarios. Cada vez que el usuario solicita este recurso, se envía una solicitud al servidor y se descarga una respuesta completa.

### "public" frente a "private"

Si la respuesta está marcada como “public”, se puede almacenar en caché aunque tenga autenticación HTTP asociada a ella, y aunque el código de estado de la respuesta normalmente no se pueda almacenar de esta manera. La mayor parte del tiempo, “public” no es necesario porque la información explícita del almacenamiento en caché (como "max-age") indica que la respuesta puede almacenarse en caché de todas maneras.

Por el contrario, el navegador puede almacenar en caché las respuestas “private”, pero generalmente están destinadas a un solo usuario y, por lo tanto, no pueden almacenarse en caché a través de ningún caché intermedio; p. ej., una página HTML con información de usuario privada puede almacenarse en caché a través del navegador de ese usuario, pero no de una CDN.

### "max-age"

Esta directiva especifica el tiempo máximo en segundos durante el cual la respuesta obtenida se puede volver a usar desde el momento de envío de la solicitud;  p. ej., “max-age=60” indica que la respuesta puede almacenarse en caché y volver a usarse durante los próximos 60 segundos.

## Definición de la política óptima de Cache-Control

<img src="images/http-cache-decision-tree.png"  alt="Árbol de decisión del caché">

Usa el árbol de decisión anterior a fin de determinar la política óptima de almacenamiento en caché para un recurso específico o un conjunto de recursos utilizado por tu app. Idealmente, debes intentar almacenar en caché en el cliente la mayor cantidad de respuestas posible durante el período más extenso posible, y proporcionar tokens de validación para cada respuesta a fin de permitir una revalidación eficaz.

<table class="responsive">
<thead>
  <tr>
    <th colspan="2">Directivas de Cache-Control y explicación</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explanation">El navegador y cualquier caché intermedio pueden almacenar la respuesta en caché (es decir, es "public") durante hasta 1 día (60 segundos x 60 minutos x 24 horas).</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explanation">El navegador del cliente puede almacenar la respuesta en caché durante solo 10 minutos (60 segundos x 10 minutos).</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explanation">No es posible almacenar la respuesta en caché y se debe obtener una respuesta completa en cada solicitud.</td>
</tr>
</table>

Según HTTP Archive, entre los 300 000 sitios principales (conforme a la clasificación de Alexa), el navegador puede almacenar en caché [aproximadamente la mitad de todas las respuestas descargadas](http://httparchive.org/trends.php#maxage0), lo cual implica un enorme ahorro para visitas y páginas vistas repetidas. Por supuesto, esto no significa que tu app específica tendrá un 50% de recursos que pueden almacenarse en caché. Algunos sitios pueden almacenar en caché más del 90% de sus recursos, mientras que otros pueden contener una gran cantidad de datos privados o sujetos a limitaciones temporales que no pueden almacenarse en caché bajo ninguna circunstancia.

**Audita tus páginas para identificar los recursos que pueden almacenarse en caché y garantizar que muestren los encabezados Cache-Control y ETag correspondientes.**

## Invalidación y actualización de respuestas almacenadas en caché

### TL;DR {: .hide-from-toc }
* Las respuestas almacenadas en caché localmente se usan hasta que el recurso "caduca".
* La incorporación de la huella digital del contenido de un archivo en la URL permite hacer que el cliente deba realizar una actualización a una nueva versión de la respuesta.
* Cada app debe definir su propia jerarquía de caché para alcanzar un rendimiento óptimo.


Todas las solicitudes HTTP que realiza el navegador primero se direccionan al caché del navegador para comprobar si hay una respuesta válida almacenada en caché que pueda usarse para responder a la solicitud. Si hay una coincidencia, se lee la respuesta desde la caché y, de esta manera, se eliminan la latencia de la red y los costos por datos de la transferencia. 

**No obstante, ¿qué ocurre si deseamos actualizar o invalidar una respuesta almacenada en caché?** Por ejemplo, supongamos que pediste a tus visitantes almacenar en caché una hoja de estilo CSS durante hasta 24 horas (max-age=86400), pero tu diseñador acaba de agregar una actualización que deseas poner a disposición de todos los usuarios ¿Cómo indicas a todos los visitantes, a través de lo que ahora es una copia “caduca” almacenada en caché de tu CSS, que actualicen sus cachés? No puedes, al menos si no cambias la URL del recurso.

Una vez que el navegador almacene la respuesta en caché, se usará la versión almacenada hasta que ya no esté actualizada, según lo determine el tiempo máximo o de caducidad, o hasta que se elimine de la caché por algún otro motivo; p. ej., al limpiar el usuario la caché de su navegador. Como consecuencia, diferentes usuarios podrían terminar usando diferentes versiones del archivo durante la construcción de la página; los usuarios que acaban de obtener el recurso usan la versión nueva y los que almacenaron en caché una copia anterior (pero aún válida) usan una versión anterior de la respuesta.

**¿Cómo obtienes lo mejor de ambos mundos (almacenamiento en caché en el cliente y actualizaciones rápidas)?** Es simple. Puedes cambiar la URL del recurso y hacer que el usuario deba descargar la nueva respuesta cada vez que cambie su contenido. Generalmente, esto se logra incorporando una huella digital del archivo, o un número de versión, en su nombre de archivo; por ejemplo, style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png"  alt="Jerarquía del caché">

La capacidad de definir políticas de almacenamiento en caché para cada recurso te permite definir “jerarquías de la caché” con las cuales puedes controlar no solo la duración del almacenamiento en caché, sino también la rapidez con la que los visitantes ven las nuevas versiones. Para ilustrar esto, analiza el ejemplo anterior:

* El HTML está marcado con “no-cache”, lo cual significa que el navegador siempre revalida el documento en cada solicitud y obtiene la última versión si el contenido cambia. Asimismo, en el lenguaje de marcado HTML incorporas huellas digitales en las URL para los recursos CSS y JavaScript. Si cambia el contenido de esos archivos, el lenguaje de marcado HTML de la página también cambia y se descarga una nueva copia de la respuesta HTML.
* La CSS puede almacenarse en caché a través de navegadores y cachés intermedios (por ejemplo, una CDN), y está configurada para caducar en 1 año. Ten en cuenta que puedes usar la “caducidad lejana” de un año de forma segura, ya que incorporas la huella digital del archivo al nombre de archivo: si se actualiza la CSS, la URL también se modifica.
* JavaScript también está configurado para caducar en 1 año, pero está marcado como “private”, quizá porque contiene algunos datos privados del usuario que la CDN no podría almacenar en caché.
* La imagen se almacena en caché sin una versión ni huella digital única, y está configurada para caducar en 1 día.

La combinación de ETag, Cache-Control y URL únicas te permite proporcionar lo mejor de ambos mundos: tiempos de caducidad prolongados, control sobre el lugar en el cual se puede almacenar la respuesta en caché y actualizaciones a pedido.

## Lista de comprobación de almacenamiento en caché

No hay una política de almacenamiento en caché que sea superior a otra. Según los patrones de tráfico, el tipo de datos proporcionados y los requisitos específicos de la app para la actualización de datos, debes definir y configurar los ajustes adecuados para cada recurso y la “jerarquía de almacenamiento en caché” general.

Te damos algunas sugerencias y técnicas para que recuerdes mientras trabajas en tu estrategia de almacenamiento en caché:

* **Usa URLs consistentes:** si proporcionas el mismo contenido en diferentes URL, ese contenido se obtendrá y se almacenará varias veces. Sugerencia: ten en cuenta que en las [URLs se distinguen mayúsculas y minúsculas](http://www.w3.org/TR/WD-html40-970708/htmlweb.html).
* **Asegúrate de que el servidor proporcione un token de validación (ETag):** los tokens de validación eliminan la necesidad de transferir los mismos bytes cuando un recurso no sufre cambios en el servidor.
* **Identifica los recursos que pueden almacenarse en caché a través de intermediarios:** aquellos cuyas respuestas son idénticas para todos los usuarios son excelentes candidatos para almacenarse en caché a través de una CDN y otros intermediarios.
* **Determina la vida útil óptima en caché para cada recurso:** diferentes recursos pueden tener diferentes requisitos de actualización. Audita y determina la vida útil máxima para cada uno.
* **Determina la mejor jerarquía de caché para tu sitio:** la combinación de URLs de recursos con huellas digitales de contenido y las vidas útiles breves o sin almacenamiento en caché (no-cache) para documentos HTML te permiten controlar la rapidez con la cual el cliente recibe las actualizaciones.
* **Minimiza la migración de clientes:** algunos recursos se actualizan con más frecuencia que otros. Si una parte específica del recurso (por ejemplo, una función JavaScript o un conjunto de estilos CSS) se actualiza con frecuencia, considera proporcionar ese código como un archivo independiente. Esto permitirá que el resto del contenido (por ejemplo, códigos de biblioteca que no cambien con mucha frecuencia) se obtenga de la caché y minimiza la cantidad de contenido descargado cada vez que se obtiene una actualización.



{# wf_devsite_translation #}
