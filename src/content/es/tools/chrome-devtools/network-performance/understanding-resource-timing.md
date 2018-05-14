project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Es fundamental comprender las etapas en las que se recolectan los recursos en la red. Esta es la base para solucionar los problemas de carga."

{# wf_published_on: 2016-02-03 #}
{# wf_updated_on: 2017-07-12 #}

# Comprende Resource Timing {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Es fundamental comprender las etapas en las que se recolectan los recursos en la red. Esta es la base para solucionar los problemas de carga.


### TL;DR {: .hide-from-toc }
- Comprende las fases de la sincronización de recursos.
- Conoce lo que cada etapa proporciona a la Resource Timing API.
- Identifica distintos indicadores de problemas de rendimiento en el gráfico de la línea del tiempo, por ejemplo, series de barras transparentes o fragmentos verdes grandes.


Todas las solicitudes de la red se consideran recursos.
Cuando se recuperan a través de la red, los recursos tienen ciclos de vida distintivos que se expresan en términos de sincronización de recursos.
El panel Network usa la misma [Resource Timing API](http://www.w3.org/TR/resource-timing) que está disponible para los desarrolladores de apps.

Note: cuando usas la Resource Timing API con recursos de distintos orígenes, asegúrate
de que todos los recursos tengan encabezados CORS.

La Resource Timing API ofrece información detallada sobre el tiempo de recepción de cada recurso.
Las fases primarias del ciclo de vida de la solicitud son las siguientes:

* Redireccionamiento:
  * Inicia `startTime` de inmediato.
  * Si se produce un redireccionamiento, `redirectStart` también se inicia.
  * Si se produce un redireccionamiento al final de esta etapa, se tomará `redirectEnd`.
* Caché de la app
  * Si la caché de la aplicación completa la solicitud, se tomará `fetchStart`.
* DNS
  * Se toma el tiempo de `domainLookupStart` al principio de la solicitud de DNS.
  * Se toma el tiempo `domainLookupEnd` al final de la solicitud de DNS.
* TCP
  * Se toma `connectStart` cuando se realiza la conexión inicial con el servidor.
  * Si se usa TLS o SSL, `secureConnectionStart` se iniciará cuando el protocolo de enlace comience para proteger la conexión.
  * Se toma `connectEnd` cuando se completa la conexión con el servidor.
* Solicitud
  * Se toma `requestStart` una vez enviada al servidor la solicitud de un recurso.
* Respuesta
  * `responseStart` es el momento en el cual un servidor responde inicialmente a la solicitud.
  * `responseEnd` es el tiempo en que finaliza la solicitud y se recuperan los datos.

![Diagrama de la Resource Timing API](imgs/resource-timing-api.png)

## Visualización en DevTools

Para ver toda la información de sincronización para una entrada específica del Panel Network, tienes tres opciones.

1. Desplazarte sobre el gráfico de sincronización que se encuentra debajo de la columna de línea de tiempo. Se abrirá una ventana emergente con todos los datos de la sincronización.
2. Hacer clic en cualquier entrada y abre la pestaña Timing de la entrada.
3. Usar la Resource Timing API para recuperar los datos sin procesar de JavaScript.

![Información de Resource Timing](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  Este código se puede ejecutar en la consola de DevTools.
  Usará la API de sincronización de red para recuperar todos los recursos
  y luego filtrará las entradas en busca de una que contenga “style.css”.
  Las entradas encontradas se mostrarán en pantalla.
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
</code>
</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Entrada de Resource Timing">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>Queuing</strong></dt>
  <dd>
    Una solicitud en cola indica que:
      <ul>
        <li>
        El motor de renderizado pospuso la solicitud porque se considera que su prioridad es menor en comparación con los recursos críticos (como secuencia de comandos/estilos).
        Este suele ser el caso de las imágenes.
        </li>
        <li>
        Se puso en suspensión la solicitud a la espera de que se libere un socket TCP ocupado.
        </li>
        <li>
                        Se puso la solicitud en suspensión porque el navegador solo permite <a href="https://crbug.com/12066">seis conexiones TCP</a> por origen en HTTP 1.
        </li>
        <li>
        Tiempo dedicado a crear las entradas en la caché del disco (normalmente, es muy reducido).
        </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> Stalled/Blocking</strong></dt>
  <dd>
    El tiempo transcurrido hasta el envío de la solicitud.
    La espera se puede deber a cualquiera de los motivos descritos en el caso de Queuing.
    Además, este tiempo incluye todo el tiempo dedicado a la negociación de proxy.
  </dd>

  <dt class="proxy-negotiation"><strong> Proxy Negotiation</strong></dt>
  <dd>Tiempo dedicado a la negociación con una conexión de servidor proxy.</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> Lookup</strong></dt>
  <dd>
    Tiempo dedicado a realizar la búsqueda de DNS.
    Cada dominio nuevo de una página requiere un recorrido de ida y vuelta completo para realizar la búsqueda del DNS.
  </dd>

  <dt class="initial-connection"><strong> Initial Connection / Connecting</strong></dt>
  <dd>Tiempo necesario para establecer la conexión, incluidos los acuerdos <abbr title="Transmission Control Protocol">TCP</abbr>, los reintentos y la negociación de una <abbr title="Secure Sockets Layer">SSL</abbr>.</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>Tiempo dedicado a completar un acuerdo SSL.</dd>

  <dt class="request-sent"><strong> Request Sent / Sending</strong></dt>
  <dd>
    Tiempo dedicado a generar la solicitud de la red.
    Por lo general, esto demora un milisegundo.
  </dd>

  <dt class="ttfb"><strong> Waiting (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    Tiempo dedicado a esperar la respuesta inicial, también conocido como "tiempo hasta el primer byte".
    Este tiempo captura la latencia de un recorrido de ida y vuelta al servidor, además del tiempo dedicado a esperar que el servidor entregue la respuesta.
  </dd>

  <dt class="content-download"><strong> Content Download / Downloading</strong></dt>
  <dd>Tiempo dedicado a la recepción de datos de respuesta.</dd>
</dl>


## Diagnóstico de problemas de red

Existen numerosos problemas posibles que se pueden descubrir por medio del Network Panel.
Poder encontrarlos requiere comprender bien cómo se comunican clientes y servidores, así como las limitaciones impuestas por los protocolos.

### Series en cola o detenidas

El problema más común observado es una serie de elementos en cola o detenidos,
lo cual indica que hay muchos recursos recuperados desde un único dominio.
En las conexiones HTTP 1.0/1.1, Chrome implementa un máximo de seis conexiones TCP por host.
Si estás solicitando doce elementos de una vez, los primeros seis se iniciarán y la última mitad se agregará a la cola.
Cuando uno de los elementos de la primera mitad finaliza, el primer elemento de la cola comenzará su proceso de solicitud.

![Serie de solicitudes detenidas](imgs/stalled-request-series.png)

Para solucionar este problema para el tráfico HTTP 1 tradicional, debes implementar el [particionamiento de dominios](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/),
el cual consiste en crear múltiples subdominios de tu app desde los cuales brindar recursos.
Luego, los recursos brindados se dividen en forma equitativa entre los subdominios.

La corrección de la conexión HTTP 1 **no** aplica a las conexiones HTTP 2.
De hecho, las daña. Si implementaste HTTP 2, no apliques particionamiento de dominio a tus recursos, ya que va contra el diseño del funcionamiento de HTTP 2.
HTTP 2 tiene una única conexión TCP con el servidor que funciona como una conexión multiplexada.
Esto elimina el límite de seis conexiones de HTTP 1 y varios recursos se pueden transferir a través de una sola conexión simultáneamente.

### Tiempo hasta el primer byte lento

<small>También denominado "alta presencia de color verde"</small>

![Indicador de TTFB alto](imgs/indicator-of-high-ttfb.png)

Un tiempo hasta el primer byte (TTFB) alto se reconoce a través de un tiempo de espera prolongado.
Se recomienda fijarlo en un valor [inferior a los 200 ms](/speed/docs/insights/Server).
Un TTFB alto revela uno de dos problemas principales: Tienes una de las siguientes opciones:

1. condiciones de red deficientes entre el cliente y el servidor; o
2. Respuesta lenta por parte de una app de servidor.

Para solucionar un problema de TTFB alto, primero recorta la red tanto como sea posible.
Lo ideal sería que alojaras la app localmente y verificaras si sigue generándose un TTFB alto.
En caso de que así sea, la app se debe optimizar para mejorar la velocidad de respuesta.
Esto podría implicar la optimización de las consultas a las bases de datos, la implementación de un caché para determinadas partes del contenido o la modificación de la configuración del servidor web.
Un backend puede ser lento por muchos motivos.
Deberás investigar tu software para determinar los elementos que no se adaptan a la capacidad de rendimiento.

Si el TTFB es lento localmente, el problema radica en las conexiones entre el cliente y el servidor.
El cruce de la red podría resultar afectado por diversos factores.
Existen muchos puntos entre los clientes y los servidores, y cada uno tiene sus propias limitaciones y podría causar un problema.
La manera más sencilla de probar la reducción de este problema consiste en situar tu app en otro host y verificar si el TTFB mejora.

### Alcanzar la capacidad de procesamiento

<small>También denominado: alta presencia de color azul</small>

![Indicador de la capacidad de procesamiento](imgs/indicator-of-large-content.png)

Si notas que se dedica mucho tiempo a las etapas de descarga de contenido, mejorar la respuesta del servidor o aplicar concatenación no servirá.
La solución principal estriba en enviar menos bytes.


{# wf_devsite_translation #}
