---
title: "Almacenar HTTP en caché"
description: "La tarea de obtener un elemento de la red es lenta y cara: las respuestas de gran tamaño suponen muchos recorridos de ida y vuelta entre el cliente y el servidor, y el proceso se dilata cuando están disponibles y el navegador puede procesarlas. Además, suponen costes de datos para el visitante. Por lo tanto, la capacidad de almacenar en memoria caché y reutilizar recursos obtenidos anteriormente es un aspecto esencial para optimizar el rendimiento."
updated_on: 2014-01-05
key-takeaways:
  validate-etags:
    - "El servidor informa del token de validación mediante el encabezado HTTP `ETag`."
    - "El token de validación posibilita las comprobaciones de actualizaciones eficientes: si el recurso no ha cambiado, no se transfieren datos."
  cache-control:
    - "Cada recurso puede definir su política de almacenamiento en memoria caché mediante el encabezado HTTP `Cache-Control`."
    - "Las directivas de `Cache-Control` controlan quién puede almacenar la respuesta en memoria caché, en qué condiciones y durante cuánto tiempo."
  invalidate-cache:
    - "Las repuestas almacenadas en la memoria caché del dispositivo se utilizan hasta que el recurso `caduca`."
    - "La capacidad de insertar una huella de contenido de archivo en la URL nos permite obligar al cliente a actualizar a una versión nueva de la respuesta."
    - "Cada aplicación tiene que definir su propia jerarquía de memoria caché a fin de optimizar el rendimiento."
notes:
  webview-cache:
    - "Si utilizas una vista web para obtener y mostrar contenido web en la aplicación, puede que tengas que proporcionar marcas de configuración adicionales para garantizar que la memoria caché HTTP esté habilitada, que su tamaño se haya establecido en un valor razonable para tu caso de uso y que la memoria caché se almacene. Consulta la documentación de la plataforma y verifica tu configuración."
  boilerplate-configs:
    - "Consejo: El proyecto HTML5 Boilerplate contiene <a href='https://github.com/h5bp/server-configs'>archivos de configuración de muestra</a> para todos los servidores más utilizados con comentarios detallados para cada marca y parámetro de configuración. Localiza tu servidor preferido en la lista, busca la configuración adecuada y cópiala o verifica que el servidor esté configurado con los parámetros recomendados."
  cache-control:
    - "El encabezado `Cache-Control` se ha definido como parte de la especificación HTTP/1.1 y sustituye los encabezados anteriores (por ejemplo, `Expires`) que se utilizaban para definir las políticas de almacenamiento de respuestas en memoria caché. Todos los navegadores modernos son compatibles con `Cache-Control`, así que eso es todo lo que necesitamos."
---

<p class="intro">
  La tarea de obtener un elemento de la red es lenta y cara: las respuestas de gran tamaño suponen muchos recorridos de ida y vuelta entre el cliente y el servidor, y el proceso se dilata cuando están disponibles y el navegador puede procesarlas. Además, suponen costes de datos para el visitante. Por lo tanto, la capacidad de almacenar en memoria caché y reutilizar recursos obtenidos anteriormente es un aspecto esencial para optimizar el rendimiento.
</p>


{% include shared/toc.liquid %}

Te alegrará saber que todos los navegadores se suministran con una implementación de una memoria caché HTTP. Lo único que tenemos que hacer es asegurarnos de que todas las respuestas del servidor proporcionen directivas correctas de encabezado HTTP que indiquen al navegador cuándo y durante cuánto tiempo puede almacenar la respuesta en memoria caché.

{% include shared/remember.liquid character="{" position="left" title="" list=page.notes.webview-cache %}

<img src="images/http-request.png" class="center" alt="Solicitud HTTP">

Cuando el servidor ofrece una respuesta, también emite una colección de encabezados HTTP que describen su tipo de contenido, la longitud, las directivas de almacenamiento en memoria caché, el token de validación, etc. Por ejemplo, en el intercambio anterior, el servidor ofrece una respuesta de 1.024 bytes, indica al cliente que la almacene en memoria caché durante un máximo de 120 segundos y proporciona un token de validación (`x234dff`) que se puede utilizar después de que la respuesta haya caducado para comprobar si el recurso se ha modificado.


## Validar respuestas almacenadas en memoria caché con `ETags`

{% include shared/takeaway.liquid list=page.key-takeaways.validate-etags %}

Supongamos que han pasado 120 segundos desde nuestra tarea de obtención inicial y que el navegador ha iniciado una solicitud nueva para el mismo recurso. En primer lugar, el navegador comprueba la memoria caché local y detecta la respuesta anterior. Por desgracia, no puede utilizarla porque ha `caducado`. Llegado este momento, podría emitir una solicitud nueva y obtener la nueva respuesta completa, pero sería de dudosa eficiencia hacerlo porque, si el recurso no ha cambiado, no hay motivo para descargar los mismos bytes que ya se encuentran en la memoria caché.

Ese es el problema que ha servido como base para el diseño de los tokens de validación, tal como se especifica en el encabezado `ETag`: el servidor genera y devuelve un token arbitrario, que suele ser una almohadilla u otro tipo de huella del contenido del archivo. El cliente no necesita saber cómo se genera la huella, sino que solo la tiene que enviar al servidor en la siguiente solicitud. Entonces, si la huella sigue siendo la misma, el recurso no ha cambiado y podemos evitarnos la descarga.

<img src="images/http-cache-control.png" class="center" alt="Ejemplo de "Cache-Control" HTTP">

En el ejemplo anterior, el cliente proporciona automáticamente el token de `ETag` dentro del encabezado de solicitud HTTP `If-None-Match`; el servidor compara el token con el recurso actual; y, si no ha cambiado, devuelve una respuesta `304 No modificado` que indica al navegador que la respuesta que tiene en la memoria caché no ha cambiado y se puede renovar durante 120 segundos más. Observa que no tenemos que volver a descargar la respuesta, de modo que supone un ahorro de tiempo y de ancho de banda.

Como desarrollador web, ¿cómo sacas aprovecho de una revalidación eficiente? El navegador hace todo el trabajo por ti: detecta automáticamente si se ha especificado un token de validación anteriormente, lo añade a una solicitud saliente y actualiza las marcas de tiempo de la memoria caché según sea necesario en función de la respuesta recibida del servidor. **Lo único que nos queda por hacer es asegurarnos de que el servidor proporcione los tokens de `ETag` necesarios. Para ello, revisa la documentación del servidor sobre marcas de configuración necesarias.**

{% include shared/remember.liquid list=page.notes.boilerplate-configs %}


## `Cache-Control`

{% include shared/takeaway.liquid list=page.key-takeaways.cache-control %}

La mejor solicitud es aquella no que no necesita comunicarse con el servidor. Una copia local de la respuesta nos permite eliminar toda la latencia de red y evitar costes de datos para la transferencia de datos. Para lograrlo, la especificación HTTP permite que el servidor ofrezca una [serie de diferentes directivas de `Cache-Control`](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) que controlan cómo y durante cuánto tiempo el navegador y otras memorias caché intermedias pueden almacenar la respuesta concreta en memoria caché.

{% include shared/remember.liquid list=page.notes.cache-control %}

<img src="images/http-cache-control-highlight.png" class="center" alt="Ejemplo de `Cache-Control` HTTP">

### Elementos `no-cache` y `no-store`

El elemento `no-cache` indica que la respuesta devuelta no se puede utilizar para satisfacer una solicitud posterior enviada a la misma URL sin antes consultar en el servidor si la respuesta ha cambiado. Por eso, si está presente un token de validación (ETag) adecuado, `no-cache` utilizará un recorrido de ida y vuelta para validar la respuesta almacenada en memoria caché, pero puede eliminar la necesidad de descarga si el recurso no ha cambiado.

Por el contrario, el elemento `no-store` es mucho más sencillo, ya que tan solo prohíbe que el navegador y todas las memorias caché intermedias almacenen una versión de la respuesta devuelta; por ejemplo, una que contenga datos personales o bancarios. Cada vez que el usuario solicita este elemento, se envía una solicitud al servidor y se descarga una respuesta.

###Elementos `public` y `private`

Si la respuesta está marcada como `public`, se puede almacenar en memoria caché aunque tenga autenticación HTTP asociada y aunque el código de estado de la respuesta normalmente no se pueda almacenar en la memoria caché. En la mayoría de los casos, el elemento `public` no es necesario porque el almacenamiento explícito de información en memoria caché (por ejemplo, `max-age`) indica
que la respuesta se puede almacenar en la memoria caché.

Por el contrario, el navegador puede almacenar las respuestas marcadas como `private` en la memoria caché, pero normalmente están destinadas para un solo usuario, por lo que no se permite que una memoria caché intermedia las almacene. Por ejemplo, el navegador de un usuario puede almacenar una página HTML con información privada del usuario en la memoria caché, pero una CDN no puede.

### Elemento `max-age`

Esta directiva especifica en segundos el tiempo máximo durante el que se puede reutilizar la respuesta obtenida desde el momento de la solicitud. Por ejemplo, `max-age=60` indica que la respuesta se puede almacenar en memoria caché y reutilizar durante los 60 segundos posteriores.

## Definir una política óptima de `Cache-Control`

<img src="images/http-cache-decision-tree.png" class="center" alt="Árbol de decisiones de la memoria caché">

Sigue el árbol de decisiones anterior para determinar la política de almacenamiento en memoria caché que resulte óptima para un recurso concreto o para un conjunto de recursos que tu aplicación utilice. Lo ideal es que te marques como objetivo almacenar en memoria caché tantas respuestas como sea posible en el cliente durante el periodo más largo posible, y que proporciones tokens de validación para cada respuesta a fin de poder ofrecer una revalidación eficiente.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th width="30%">Directivas de `Cache-Control`</th>
    <th>Explicación</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explicación">El navegador y todas las memorias caché intermedias pueden almacenar la respuesta en memoria caché (es decir, es `public`) durante un máximo de un día (60 segundos x 60 minutos x 24 horas).</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explicación">Solo el navegador del cliente puede almacenar la respuesta en memoria caché durante un máximo de diez minutos (60 segundos x 10 minutos).</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explicación">No se permite almacenar la respuesta en memoria caché y se tiene que recuperar entera con cada solicitud.</td>
</tr>
</table>

Según el archivo HTTP, entre los 300.000 sitios más importantes (según la clasificación Alexa), el navegador [puede almacenar en memoria caché casi la mitad de todas las respuestas bajadas] (http://httparchive.org/trends.php#maxage0), lo que supone un gran ahorro para las visualizaciones y las visitas de páginas que se repiten. Por supuesto, esto no quiere decir que el 50% de los recursos de tu aplicación en concreto se podrá almacenar en memoria caché. De hecho, algunos sitios pueden almacenar más del 90% de sus recursos, mientras que otros tienen muchos datos privados o de tiempo limitado que no se pueden almacenar en memoria caché.

**Revisa tus páginas para identificar los recursos que se pueden almacenar en memoria caché y asegúrate de que devuelvan encabezados `Cache-Control` y `ETag` adecuados.**


## Invalidar y actualizar las respuestas almacenadas en memoria caché

{% include shared/takeaway.liquid list=page.key-takeaways.invalidate-cache %}

Todas las solicitudes HTTP que el navegador realiza se enrutan primero a la memoria caché del navegador para comprobar si hay una respuesta almacenada en memoria caché que se pueda utilizar para satisfacer la solicitud. Si alguna coincide, la respuesta se lee en la memoria caché y eliminamos tanto la latencia de red como los costes de datos que supone la transferencia. **Sin embargo, ¿qué sucede si queremos actualizar o invalidar una respuesta almacenada en memoria caché?

Por ejemplo, supongamos que hemos indicados a nuestros visitantes que almacenen en memoria caché una hoja de estilo CSS durante un máximo de 24 horas (max-age=86400), pero nuestro diseñador acaba de aplicar una actualización que queremos que esté disponible para todos los usuarios. ¿Cómo notificamos a todos los visitantes que tienen una copia anticuada de nuestro CSS almacenada en memoria caché que actualicen sus memorias caché? Es una pregunta complicada, porque no podemos si no cambiamos la URL del recurso.

Una vez el navegador almacena la respuesta en memoria caché, la versión almacenada se utiliza hasta que ya no está al día, según lo determina el elemento `max-age`, porque caduca o hasta que se expulsa de la memoria caché por otro motivo (por ejemplo, el usuario borra los datos de la memoria caché del navegador). A resultas de esta situación, es posible que diferentes usuarios acaben utilizando diferentes versiones del archivo cuando se cree la página. Los usuarios que acaben de obtener el recurso verán la versión nueva, mientras que los usuarios que hayan almacenado en memoria caché una copia anterior (pero aún válida) utilizarán una versión anterior de la respuesta.

**Por lo tanto, ¿cómo conseguimos lo mejor de ambas situaciones, almacenamiento en memoria caché por parte del cliente y actualizaciones rápidas?** Es muy sencillo: podemos cambiar la URL del recurso y obligar a los usuarios a descargar la respuesta nueva siempre que el contenido cambie. Normalmente, para conseguirlo se inserta una huella del archivo o un número de versión al nombre de archivo (por ejemplo, style.**x234dff**.css).

<img src="images/http-cache-hierarchy.png" class="center" alt="Jerarquía de la memoria caché">

La capacidad de definir políticas de almacenamiento en memoria caché por recurso nos permite definir `jerarquías de la memoria caché` que, a su vez, nos permiten no solo controlar durante cuánto tiempo se almacena en memoria caché, sino también con qué rapidez un visitante ve versiones nuevas. Como muestra analizaremos el ejemplo anterior:

*El HTML está marcado con el elemento `no-cache`, que quiere decir que el navegador siempre revalidará el documento con cada solicitud y, si el contenido cambia, obtendrá la versión más reciente. Además, dentro del marcado HTML insertamos huellas en las URL para los elementos CSS y JavaScript. Si el contenido de esos archivos cambia, el HTML de la página también cambiará y se descargará una nueva copia de la respuesta HTML.
*Los navegadores y las memorias caché intermedias (por ejemplo, una CDN) tienen permiso para almacenar el CSS en memoria caché, y está definido que caduque pasado un año. Ten en cuenta que podemos usar sin problemas fechas de caducidad mucho superiores a un año porque insertamos el nombre de archivo a la huella de archivo, de modo que, si el CSS se actualiza, la URL también cambiará.
*El JavaScript también está definido para que caduque en un año, pero está marcado como privado, quizá porque contiene datos de usuario privados que la CDN no debería almacenar en memoria caché.
*La imagen está almacenada en memoria caché sin una versión ni una huella única y se ha definido para que caduque pasado un año.

La combinación de `ETag`, `Cache-Control` y URLs únicas nos permite ofrecer lo mejor de todas las situaciones: tiempos de caducidad con mucho margen, control sobre dónde se puede almacenar la respuesta en memoria caché y actualizaciones bajo demanda.

## Almacenar listas de comprobación en memoria caché

No hay políticas de memoria caché que sean mejor que el resto. En función de los patrones de tráfico que tengas, el tipo de datos mostrados y los requisitos específicos de cada aplicación en cuanto a la actualidad de los datos, tendrás que definir y establecer la configuración adecuada para cada recurso, así como la `jerarquía de almacenamiento en memoria caché` general.

A continuación indicamos algunos consejos y técnicas que debes tener en cuenta cuando elabores la estrategia de almacenamiento en memoria caché:

1. **Utiliza URLs coherentes**: si muestras el mismo contenido en diferentes URL, ese contenido se obtiene y se almacena varias veces. Consejo: ten en cuenta que las [URL distinguen entre mayúsculas y minúsculas](http://www.w3.org/TR/WD-html40-970708/htmlweb.html).
2. **Asegúrate de que el servidor proporcione un token de validación (ETag)**: los tokens de validación eliminan la necesidad de transferir los mismos bytes cuando un recurso del servidor no ha cambiado.
3. **Identifica los recursos que los intermediarios pueden almacenar en memoria caché**: los que tengan respuestas idénticas para todos los usuarios son muy buenos candidatos para que una CDN y otros intermediarios los almacenen en memoria caché.
4. **Determina la duración óptima de la memoria caché para cada recurso**: puede que diferentes recursos tengan requisitos de actualidad diferentes. Revisa y determina el elemento `max-age` adecuado para cada uno.
5. **Determina la mejor jerarquía de memoria caché para tu sitio**: la combinación de URLs de recursos con huellas de contenido y duraciones cortas o `no-cache` para documentos HTML te permite controlar la rapidez con la que el cliente aplica actualizaciones.
6. **Agitación mínima**: algunos recursos se actualizan más a menudo que otros. Si hay una parte concreta de un recurso (por ejemplo, una función JavaScript o un conjunto de estilos CSS) que se actualiza a menudo, plantéate la posibilidad de enviar ese código como un archivo independiente. De esa forma el resto del contenido (por ejemplo, el código de biblioteca que no cambia a menudo) se puede obtener de la memoria caché y se minimiza la cantidad de contenido descargado siempre que se obtiene una actualización.




