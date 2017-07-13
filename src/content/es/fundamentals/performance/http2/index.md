project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: HTTP/2 (o h2) es un protocolo binario que ofrece transmisiones de multiplexación insertadas y control de tramas a la Web.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# Introducción a HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}
{% include "web/_shared/contributors/surma.html" %}

Note: El siguiente contenido es un extracto de [High Performance Browser
Networking (Redes de navegadores de alto rendimiento)](http://shop.oreilly.com/product/0636920028048.do) (O'Reilly, Ilya
Grigorik). Para conocer la versión completa y el contenido relacionado, consulta
[hpbn.co](https://hpbn.co/){: .external }.

HTTP/2 hará que nuestras apps sean más veloces, más simples y más sólidas —una combinación
extraña— al permitirnos deshacernos de los numerosos métodos alternativos de HTTP/1.1 aplicados anteriormente
dentro de nuestras apps y abordar estas inquietudes dentro de la capa
de transporte. Mejor aún, también abre un abanico de oportunidades
totalmente nuevas para optimizar nuestras apps y mejorar el rendimiento.

Los objetivos principales de HTTP/2 son reducir la latencia al permitir una multiplexación completa de solicitudes y
respuestas, minimizar la sobrecarga de protocolo mediante una compresión eficiente de
campos de encabezados de HTTP y agregar soporte para priorización de solicitudes y servidor push.
Con el fin de implementar estos requisitos, existe una vasta serie de otras
mejoras de protocolo tales como nuevos mecanismos de control de flujo, manejo de errores y actualizaciones
, pero estas son las funciones más importantes que todo programador web
debe entender y aprovechar en sus apps.

HTTP/2 de ningún modo modifica la semántica de app de HTTP. Todos los
conceptos centrales, como los métodos de HTTP, códigos de estado, URIs y campos de encabezados,
permanecen vigentes. Por otra parte, HTTP/2 modifica el modo en que los datos se formatean (entraman) y
se transportan entre el cliente y el servidor (ambos administran el proceso
completo) y oculta toda complejidad de nuestras apps dentro de la nueva
capa de entramado. En consecuencia, todas las apps existentes pueden proporcionarse sin
ninguna modificación.

*¿Por qué no HTTP/1.2?*

A fin de lograr las metas de rendimiento fijadas por el Grupo de Trabajo de HTTP, HTTP/2
introduce una nueva capa de entramado binario que no es compatible con
servidores y clientes de HTTP/1.x anteriores, por ende, la versión de protocolo principal se incrementa
hasta HTTP/2.

Dicho esto, a menos que implementes un servidor web (o un cliente personalizado) mediante
sockets de TCP sin procesar, no verás ninguna diferencia: todo el nuevo 
entramado de bajo nivel es realizado por el cliente y el servidor en tu nombre. Las únicas
diferencias observables serán un rendimiento mejorado y la disponibilidad de 
capacidades nuevas como priorización de solicitudes, control de flujo y servidor push.

## Breve historia de SPDY y HTTP/2

SPDY era un protocolo experimental desarrollado en Google y anunciado a
mediados de 2009, cuya meta principal consistía en tratar de reducir la latencia de carga de las páginas web
al abordar algunas de las limitaciones de rendimiento conocidas de HTTP/1.1.
Específicamente, las metas trazadas para el proyecto se fijaron de la siguiente manera:

* Apuntar a una reducción del 50% en el tiempo de carga de la página (PLT).
* Evitar la necesidad de que los autores del sitio web efectúen cambios en el contenido.
* Minimizar la complejidad de implementación y evitar cambios en la infraestructura de red.
* Desarrollar este protocolo nuevo en colaboración con la comunidad de código abierto.
* Reunir datos de rendimiento reales para (in)validar el protocolo experimental.

Note: A fin de lograr una mejora de tiempo de carga de la página en un 50%, SPDY aspiró a realizar un uso más eficiente
de la conexión de TCP subyacente al introducir una nueva capa de entramado binario para
habilitar la multiplexación de solicitudes y respuestas, la priorización y la compresión
de encabezados; consulta
[Latency as a Performance Bottleneck (La latencia como cuello de botella)](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck){: .external}.

Poco tiempo después del anuncio inicial, Mike Belshe y Roberto Peon,
ingenieros civiles de Google, compartieron sus primeros resultados, la documentación y
el código fuente para la implementación experimental del nuevo protocolo SPDY:

> Hasta ahora, solo hicimos pruebas en laboratorio de SPDY. Los resultados iniciales son
> muy alentadores: cuando descargamos los 25 sitios web principales mediante conexiones de red hogareñas
> simuladas, vemos una mejora significativa en el rendimiento: las páginas
> se cargaron hasta un 55% más rápido. 
> [*(Blog de Chromium)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Haciendo un salto hasta 2012, el nuevo protocolo experimental era compatible con Chrome,
Firefox y Opera. Además, una cantidad cada vez mayor de sitios, tanto grandes (por ejemplo,
Google, Twitter, Facebook) como pequeños, implementaban SPDY dentro de su
infraestructura. De hecho, SPDY estaba encaminado para convertirse en un estándar de facto
mediante la creciente adopción por parte de la industria.

Al observar esta tendencia, el Grupo de Trabajo de HTTP (HTTP-WG) lanzó un nuevo
esfuerzo para considerar lo aprendido con SPDY, aprovecharlo y mejorar en base a ello, y
ofrecer un estándar "HTTP/2" oficial. Se redactó el borrador de una nueva carta, se realizó una convocatoria abierta
para propuestas de HTTP/2 y, luego de un extenso debate dentro del grupo
de trabajo, la especificación de SPDY se adoptó como punto de partida para el nuevo protocolo
HTTP/2.

En los años siguientes SPDY y HTTP/2 continuaron evolucionando en paralelo:
SPDY actuaba como una parte experimental que se usaba para probar funciones 
y propuestas nuevas para el estándar HTTP/2. Lo que parece bien en la teoría puede que no funcione
en la práctica y viceversa, y SPDY ofreció una vía para probar y evaluar cada
propuesta antes de su inclusión en el estándar HTTP/2. Finalmente, este proceso
duró tres años y dio como resultado más de una docena de borradores intermedios:

* Marzo de 2012: Convocatoria de propuestas para HTTP/2
* Noviembre de 2012: Primer borrador de HTTP/2 (basado en SPDY)
* Agosto de 2014: Se publicaron el borrador 17 de HTTP/2 y borrador 12 de HPACK
* Agosto de 2014: Última llamada del Grupo de Trabajo para HTTP/2
* Febrero de 2015: IESG aprobó los borradores de HTTP/2 y HPACK
* Mayo de 2015: Se publicaron RFC 7540 (HTTP/2) y RFC 7541 (HPACK)

A principios de 2015, IESG revisó y aprobó el nuevo estándar HTTP/2 para su
publicación. Poco tiempo después, el equipo de Google Chrome anunció su plan
de dejar a SPDY y la extensión NPN para TLS en desuso:

> Los principales cambios de HTTP/2 en comparación con HTTP/1.1 se centran en un rendimiento mejorado. Algunas funciones
> clave como multiplexación, compresión de encabezados, priorización y negociación de
> protocolo evolucionaron a partir del trabajo realizado en un anterior protocolo de código abierto pero no estándar
> llamado SPDY. Chrome ha sido compatible con SPDY a partir de Chrome 6 pero, dado que la mayoría
> de los beneficios están presentes en HTTP/2, ya es hora de despedirse. Tenemos planeado
> quitar la compatibilidad con SPDY a principios de 2016 y también quitar la compatibilidad con la extensión
> TLS llamada NPN a favor de ALPN en Chrome al mismo tiempo. Se recomienda con vehemencia a los programadores de
> servidores que pasen a HTTP/2 y ALPN.
>
> Nos complace haber contribuido al proceso de estándares abiertos que dio como resultado
> HTTP/2 y esperamos ver una adopción masiva dada la amplia atracción de la industria por
> la estandarización y la implementación. [*(Blog de
> Chromium)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

La evolución conjunta de SPDY y HTTP/2 habilitó que los programadores de servidores, navegadores y sitios
adquieran experiencia en el mundo real con el nuevo protocolo a medida que se desarrollaba.
En consecuencia, el estándar HTTP/2 es uno de los mejores estándares y de los más probados
desde el principio. En el momento en que IESG aprobó HTTP/2,
existían docenas de implementaciones para clientes y servidores completamente probadas y listas para
producción. De hecho, unas pocas semanas después de que se aprobara el protocolo final, muchos
usuarios ya gozaban de los beneficios dado que varios navegadores populares (y muchos
sitios) implementaron una compatibilidad total con HTTP/2.

## Metas técnicas y de diseño

Las versiones anteriores del protocolo HTTP se diseñaron de manera intencional a fin de lograr la simplicidad
de implementación: HTTP/0.9 era un protocolo de una línea para arrancar la World Wide
Web; HTTP/1.0 documentó las populares extensiones a HTTP/0.9 en un estándar
informativo; HTTP/1.1 introdujo un estándar IETF oficial; consulta
[Brief History of HTTP (Breve historia de HTTP)](https://hpbn.co/brief-history-of-http/){: .external}.
Como tal, HTTP/0.9-1.x ofreció exactamente lo que se proponía: HTTP es uno de
los protocolos de app más masivamente adoptados en Internet.

Desafortunadamente, la simplicidad de implementación también perjudicó el rendimiento de la
app: los clientes de HTTP/1.x necesitan conexiones múltiples para lograr
concurrencia y reducir la latencia; HTTP/1.x no comprime los encabezados de solicitudes y
respuestas, lo que provoca un tráfico de red innecesario; HTTP/1.x no permite una priorización de recursos
efectiva, lo que produce el uso deficiente de la conexión de TCP subyacente;
etc.

Estas limitaciones no eran graves pero, dado que las apps web continuaban aumentando
su alcance, complejidad e importancia en nuestras vidas diarias, imponían una
carga cada vez mayor tanto a los programadores como a los usuarios de la Web, precisamente para abordar esa brecha es que
se creó a HTTP/2:

> HTTP/2 habilita un uso más eficiente de los recursos de red y una reducida
> percepción de la latencia al introducir la compresión de campos de encabezados y permitir
> múltiples intercambios concurrentes en la misma conexión. Específicamente, permite
> que los mensajes de solicitudes y respuestas se intercalen en la misma conexión y utiliza una
> codificación eficiente para los campos de encabezados de HTTP. Asimismo, permite la priorización de
> solicitudes, lo que hace que las solicitudes más importantes se completen con mayor rapidez, además de 
> mejorar el rendimiento.
>
> El protocolo resultante es más amigable para la red, ya que se pueden utilizar menos conexiones de TCP
> en comparación con HTTP/1.x. Esto significa menos competencia
> con otros flujos y conexiones con mayor duración que, a su vez, resulta en una mejor
> utilización de la capacidad de red disponible. Por último, HTTP/2 también habilita un procesamiento de mensajes más
> eficiente a través del entramado de mensajes binario.
> [*(versión 2 del Protocolo de transferencia de hipertexto, borrador
> 17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)


Es importante observar que HTTP/2 extiende y no reemplaza a los estándares
HTTP anteriores. La semántica de app de HTTP es la misma y no se realizó ningún cambio
en la funcionalidad ofrecida ni en los conceptos centrales tales como métodos de HTTP,
códigos de estado, URIs y campos de encabezados. Estos cambios estaban explícitamente fuera del alcance
del esfuerzo HTTP/2. Dicho esto, mientras la API de alto nivel sigue siendo la misma,
es importante entender cómo los cambios de bajo nivel abordan las limitaciones
de rendimiento de los protocolos anteriores. Hagamos un breve recorrido por la capa
de entramado binario y sus funciones.

## Capa de entramado binario

En el centro de todas las mejoras de rendimiento de HTTP/2 se encuentra la nueva capa de entramado
binario, que impone la forma en que los mensajes de HTTP se encapsulan y se transfieren
entre el cliente y el servidor.

![Capa de entramado binario de HTTP/2](images/binary_framing_layer01.svg)

La "capa" se refiere a una elección de diseño para introducir un nuevo mecanismo de codificación optimizado
entre la interfaz del socket y la API de HTTP superior expuesta a nuestras
apps: la semántica de HTTP, como verbos, métodos y encabezados, no se ven
afectados, lo que difiere es la forma en que se codifican mientras están en tránsito.
A diferencia del protocolo HTTP/1.x de texto plano delimitado por línea nueva, toda la comunicación de HTTP/2
se divide en mensajes y tramas más pequeños, cada uno de los cuales está
codificado en formato binario.

En consecuencia, tanto el cliente como el servidor deben usar el nuevo mecanismo de codificación binaria
para entenderse entre sí: un cliente de HTTP/1.x no entenderá un servidor únicamente compatible con HTTP/2
y viceversa. Afortunadamente, nuestras apps desconocen
todos estos cambios, ya que el cliente y el servidor realizan todo el trabajo de entramado necesario
en nuestro nombre.

## Transmisiones, mensajes y tramas

La introducción del nuevo mecanismo de entramado binario cambia la forma en que los datos se
intercambian entre el cliente y el servidor. Para describir este proceso, familiaricémonos
con la terminología de HTTP/2:

* *Transmisión*: un flujo bidireccional de bytes dentro de una conexión establecida,
  que puede llevar uno o más mensajes.
* *Mensaje*: una secuencia completa de tramas que se asignan a un mensaje lógico de solicitud o respuesta.
* *Trama*: La unidad de comunicación más pequeña en HTTP/2, cada una contiene un encabezado de trama que,
  como mínimo, identifica a la transmisión a la cual pertenece la trama.

La relación de estos términos puede resumirse de la siguiente manera:

* Toda la comunicación se efectúa mediante una única conexión de TCP que puede llevar cualquier cantidad de 
  transmisiones bidireccionales.
* Cada transmisión cuenta con un identificador único e información prioritaria opcional que se usa para llevar
  mensajes bidireccionales.
* Cada mensaje es un mensaje de HTTP lógico, como una solicitud o respuesta, que consiste en  
  una o más tramas.
* La trama es la unidad de comunicación más pequeña que lleva un tipo de datos específico; p. ej.:
  encabezados de HTTP, carga de mensajes, etc. Las tramas de diferentes transmisiones pueden intercalarse
  y con posterioridad pueden reensamblarse mediante el identificador de transmisión incorporado en el encabezado de cada trama.

![Transmisiones, mensajes y tramas de HTTP/2](images/streams_messages_frames01.svg)

En resumen, HTTP/2 desglosa la comunicación del protocolo HTTP en un intercambio de
tramas con codificación binaria, que luego se asignan a los mensajes que pertenecen a una
transmisión específica, todo está multiplexado dentro de una única conexión
de TCP. Esta es la base que habilita al resto de las funciones y
las optimizaciones de rendimiento ofrecidas por el protocolo HTTP/2.

## Multiplexación de solicitudes y respuestas

Con HTTP/1.x, si el cliente desea realizar múltiples solicitudes paralelas para mejorar
el rendimiento, se deben usar múltiples conexiones de TCP (consulta
[Using Multiple TCP Connections (Uso de múltiples conexiones de TCP)](https://hpbn.co/http1x/#using-multiple-tcp-connections)
). Este comportamiento es una consecuencia directa del modelo de entrega de HTTP/1.x, que
asegura que solo una respuesta pueda entregarse por vez (cola de respuestas) por
conexión. Peor aún, esto también desencadena el bloqueo de cabeza de línea y el uso
ineficiente de la conexión de TCP subyacente.

La nueva capa de entramado binario de HTTP/2 elimina estas limitaciones y habilita
una multiplexación total de solicitudes y respuestas, al permitir que el cliente y el servidor
desglosen un mensaje de HTTP en tramas diferentes, intercalarlas y luego
reensamblarlas en el otro extremo.

![Multiplexación de solicitudes y respuestas de HTTP/2 dentro de una conexión compartida](images/multiplexing01.svg)

La imagen captura múltiples transmisiones en vuelo dentro de la misma conexión. El
cliente transmite una trama DATA (stream 5) al servidor, mientras este último
transmite una secuencia intercalada de tramas al cliente para las transmisiones 1
y 3. En consecuencia, hay tres transmisiones paralelas en vuelo.

La capacidad de desglosar un mensaje de HTTP en tramas independientes, intercalarlas
y luego reensamblarlas en el otro extremo es la única mejora
más importante de HTTP/2. De hecho, produce un efecto dominó con numerosos
beneficios de rendimiento en toda la pila de tecnologías web, lo que nos
permite:

* Intercalar múltiples solicitudes en paralelo sin bloquear ninguna.
* Intercalar múltiples respuestas en paralelo sin bloquear ninguna.
* Usar una única conexión para entregar múltiples solicitudes y respuestas en paralelo.
* Eliminar métodos alternativos de HTTP/1.x innecesarios (consulta
  [Optimizing for HTTP/1.x (Optimización de HTTP/1.x)](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
  como archivos concatenados, sprites de imágenes y fragmentos de dominio.
* Proporcionar tiempos de carga de páginas inferiores al eliminar la latencia innecesaria y mejorar
  la utilización de capacidad de red disponible.
* *Y mucho más…*

La nueva capa de enmarcado binario en HTTP/2 resuelve el problema del bloqueo de encabezado de línea
que se encuentra en HTTP/1.x y elimina la necesidad de conexiones múltiples para
habilitar el procesamiento y entrega paralelos de solicitudes y respuestas. En consecuencia,
esto hace que la implementación de nuestras apps sea más rápida, más simple y más barata.

## Priorización de transmisión

Una vez que un mensaje de HTTP puede dividirse en muchas tramas individuales y permitimos que
las tramas de múltiples transmisiones estén multiplexadas, el orden en el cual el cliente y el servidor
intercalan y entregan las tramas se convierte en una consideración
del rendimiento crítica. Para facilitarlo, el estándar HTTP/2 permite que cada
transmisión tenga un peso y dependencia asociados:

* A cada transmisión se le puede asignar un peso entero de entre 1 y 256.
* Cada transmisión puede recibir una dependencia explícita de otra transmisión.

La combinación de dependencias de transmisión y pesos permite que el cliente
construya y comunique un "árbol de priorización" que exprese cómo
preferiría recibir las respuestas. A su vez, el servidor puede usar esta información para
priorizar el procesamiento de transmisión al controlar la asignación de CPU, memoria y
otros recursos y, una vez que los datos de la respuesta están disponibles, la asignación de
ancho de banda para asegurar la entrega óptima de respuestas de prioridad alta al cliente.

![Dependencias y pesos de transmisión de HTTP/2](images/stream_prioritization01.svg)

Una dependencia de transmisión dentro de HTTP/2 se declara al hacer referencia al único
identificador de otra transmisión como su primaria; si se omite el identificador,
se dice que la transmisión depende de la "transmisión raíz". Declarar una dependencia de
transmisión indica que, de ser posible, a la transmisión primaria se le deben asignar
recursos antes que a sus dependencias. En otras palabras, "Por favor, procesa y entrega la
respuesta D antes que la respuesta C".

A las transmisiones que comparten la misma transmisión primaria (en otras palabras, transmisiones del mismo nivel) se les deben asignar
recursos proporcionales a su peso. Por ejemplo, si la transmisión A tiene un peso
de 12 y la transmisión B de su mismo nivel tiene un peso de 4, se debe hacer lo siguiente para determinar la proporción
de los recursos que cada una de estas transmisiones debe recibir:

1. Suma todos los pesos: `4 + 12 = 16`
2. Divide el peso de cada transmisión por el peso total: `A = 12/16, B = 4/16`

Por lo tanto, la transmisión A debe recibir tres cuartos y la transmisión B debe recibir un
cuarto de los recursos disponibles; la transmisión B debe recibir un tercio de los
recursos asignados a la transmisión A. Veamos algunos ejemplos prácticos
en la imagen anterior. De izquierda a derecha:

1. Ni la transmisión A ni la B especifican una dependencia primaria y se dice que dependen
   de la "transmisión raíz" implícita: A tiene un peso de 12 y B tiene un peso de 4. 
   Por lo tanto, en base a los pesos proporcionales: la transmisión B debe recibir un tercio de los 
   recursos asignados a la transmisión A.
2. La transmisión D depende de la transmisión raíz; C depende de D. Por lo tanto, D debe
   recibir una asignación total de recursos antes que C. Los pesos son intrascendentes
   ya que la dependencia de C comunica una preferencia más fuerte.
3. La transmisión D debe recibir una asignación total de los recursos antes que C; C debe recibir
   una asignación total de recursos antes que A y B; la transmisión B debe recibir un tercio de 
   los recursos asignados a la transmisión A.
4. La transmisión D debe recibir una asignación total de recursos antes que E y C; E y C
   deben recibir asignaciones iguales antes que A y B; A y B deben recibir una asignación 
   proporcional basada en sus pesos.

Tal como lo ilustran los ejemplos anteriores, la combinación de dependencias y pesos
de transmisión aporta un lenguaje expresivo para la priorización de recursos, lo cual es una
función crítica para mejorar el rendimiento de la navegación cuando contamos con muchos tipos de
recursos con dependencias y pesos diferentes. Algo aún mejor, el protocolo HTTP/2
también permite al cliente actualizar estas preferencias en cualquier momento, lo cual habilita
más optimizaciones en el navegador. En otras palabras, podemos cambiar dependencias
y reasignar pesos en respuesta a la interacción del usuario y otras señales.

Note: Las dependencias y pesos de transmisión expresan una preferencia de transporte, no un
requisito, y como tales, no garantizan un proceso ni una
orden de transmisión específicos. Es decir, el cliente no puede forzar al servidor a que procese la
transmisión en un orden específico mediante la priorización de transmisión. Si bien esto parece ser
contraintuitivo, de hecho es el comportamiento deseado. No deseamos bloquear
al servidor en su progreso hacia un recurso de prioridad más baja si se bloquea un
recurso de prioridad más alta.

## Una conexión por origen

Con el nuevo mecanismo de entramado binario en funcionamiento, HTTP/2 no necesita más de múltiples
conexiones de TCP para multiplexar transmisiones en paralelo: cada transmisión se divide en muchas
tramas, que pueden intercalarse y priorizarse. Como resultado, todas las conexiones de HTTP/2
son persistentes y solo se requiere una conexión por origen,
lo cual ofrece numerosos beneficios de rendimiento.

> Tanto para SPDY como para HTTP/2, la función exitosa es la multiplexación arbitraria en un
> único canal con buen control de congestión. Me sorprende cuán importante es
> y lo bien que funciona. Una gran métrica que disfruto es la
> fracción de conexiones creada que lleva solo una única transacción de HTTP (y
> , por ende, hace que la transacción cargue con toda la sobrecarga). Respecto de HTTP/1, el 74% de nuestras
> conexiones activas llevan solo una única transacción; las conexiones persistentes
> no son tan útiles como deseamos. Sin embargo, en HTTP/2 esta cifra se desploma hasta el 25%.
> Es una gran victoria para la reducción de sobrecarga. [*(HTTP/2 is Live in Firefox, Patrick
> McManus) (HTTP/2 está vivo en Firefox, Patrick McManus)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

La mayoría de las transferencias de HTTP son breves e intermitentes, mientras que TCP está optimizado para tener
transferencias de datos masivas de larga vida. Al reutilizar la misma conexión, HTTP/2 es capaz de
hacer un uso más eficiente de cada conexión de TCP y también reducir
de manera significativa la sobrecarga de protocolo total. Además, el uso de menos conexiones
reduce la superficie de memoria y procesamiento en toda la memoria en toda la ruta de conexión
(en otras palabras, cliente, intermediarios y servidores de origen). Esto reduce los costos
operativos totales y mejora la utilización y capacidad de la red. Como resultado,
el traspaso a HTTP/2 no solo debería reducir la latencia de red, sino también ayudar a
mejorar el procesamiento y reducir los costos operativos.

Note: la menor cantidad de conexiones es una función especialmente importante para
mejorar el rendimiento de implementaciones de HTTPS, lo cual se traduce en menos acuerdos TLS
costosos, mejor reutilización de sesión y una reducción total en
recursos de cliente y servidor requeridos.

## Control de flujo

El control de flujo es un mecanismo para evitar que el emisor abrume al receptor
con datos que tal vez no desee o no pueda procesar: el receptor puede estar ocupado, puede estar soportando una
carga pesada o tal vez solo desea asignar una cantidad determinada de recursos a una
transmisión específica. Por ejemplo, el cliente podría haber solicitado una gran transmisión de 
video con prioridad alta, pero el usuario ha pausado el video y el cliente ahora
desea pausar o regular su entrega desde el servidor para evitar obtener datos innecesarios y
almacenarlos en búfer. Como alternativa, un servidor proxy puede tener conexiones
descendentes rápidas y conexiones ascendentes lentas y, del mismo modo, desea regular la velocidad de entrega de datos
de la conexión descendente para alcanzar la velocidad de la conexión ascendente a fin de controlar
el uso de sus recursos, etc.

¿Los requisitos anteriores te recuerdan el control de flujo de TCP? Deberían hacerlo, ya que
el problema es efectivamente idéntico (consulta 
[Flow Control (Control de flujo)](https://hpbn.co/building-blocks-of-tcp/#flow-control)). Sin embargo,
dado que las transmisiones de HTTP/2 se multiplexan dentro de una única conexión de TCP, el control de flujo de TCP
no es lo suficientemente detallado y no proporciona las APIs a nivel de app
necesarias para regular la entrega de transmisiones individuales. Para
abordar esto, HTTP/2 proporciona un conjunto de bloques de construcción simples que permiten que el
cliente y el servidor implementen su propio control de flujo a nivel de transmisión y
conexión:

* El control de flujo es direccional. Cada receptor puede optar por configurar cualquier tamaño de ventana 
  que desee para cada transmisión y toda la conexión.
* El control de flujo se basa en el crédito. Cada receptor indica su conexión inicial
  y la ventana de control de flujo de transmisión (en bytes), que se reduce cuando el 
  emisor emite una trama de `DATA` y se incrementa a través de una trama de  `WINDOW_UPDATE` 
  enviada por el receptor.
* El control de flujo no se puede inhabilitar. Cuando se establece la conexión de HTTP/2, el 
  cliente y el servidor intercambian tramas de `SETTINGS` , que configuran los tamaños de la ventana de control de flujo 
  en ambas direcciones. El valor predeterminado de la ventana de control de flujo se configura  
  en 65 535 bytes, pero el receptor puede configurar un mayor tamaño de ventana máximo 
  (`2^31-1` bytes) y mantenerlo mediante el envío de una trama de `WINDOW_UPDATE` cada vez que  
  se reciben datos.
* El control de flujo es de salto a salto, no de extremo a extremo. Es decir, un intermediario puede usarlo 
  para controlar el uso de recursos e implementar mecanismos de asignación de recursos basados en 
  criterios y heurística propios.

HTTP/2 no especifica ningún algoritmo en especial para implementar el control de flujo;
sino que proporciona los bloques de construcción simples y concede la implementación al
cliente y el servidor, que lo pueden usar para implementar estrategias personalizadas a fin de
regular el uso y la asignación de recursos, así como también implementar nuevas capacidades de entrega
que pueden ayudar a mejorar tanto el rendimiento real como el percibido (consulta
[Speed, Performance, and Human Perception (Velocidad, rendimiento y percepción humana)](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception))
de nuestras apps web.

Por ejemplo, el control de flujo de capa de app permite que el navegador obtenga solo una
parte de un recurso específico, coloque el fetch en espera mediante la reducción a cero de la ventana de control del
flujo de transmisión y luego reanudarlo. En otras palabras, permite que
el navegador obtenga una vista previa o un primer escaneo de una imagen, la muestre y permita
que otros fetch de prioridad alta continúen, y reanudar el fetch una vez que más recursos 
críticos se hayan terminado de cargar.

## Servidor push

Otra nueva función poderosa de HTTP/2 es la capacidad del servidor de enviar
respuestas múltiples para una única solicitud del cliente. Es decir, además de
la respuesta a la solicitud original, el servidor puede insertar recursos adicionales al
cliente (Figura 12-5), sin necesidad de que este solicite los solicite
de manera explícita.

![Servidor inicia transmisiones (promises) nuevas para recursos push
](images/push01.svg)

Note: HTTP/2 se separa de la semántica estricta de solicitud y respuesta y habilita
uno a varios flujos de trabajo push iniciados en el servidor que abren un abanico de nuevas
posibilidades de interacción dentro y fuera del navegador. Se trata de una
función habilitante que tendrá importantes consecuencias a largo plazo tanto para la forma en que
consideramos al protocolo como para el lugar y la forma en que se usa.

¿Por que necesitaríamos dicho mecanismo en un navegador? Una app web típica
consiste en docenas de recursos, todos ellos son descubiertos por el cliente cuando
examina el documento proporcionado por el servidor. En consecuencia, ¿por qué no se elimina
la latencia adicional y se facilita al servidor push los recursos asociados 
con anticipación? El servidor ya sabe qué recursos requerirá el cliente: de eso se trata el
servidor push.

De hecho, si alguna vez has incorporado un recurso de CSS, JavaScript o cualquier otro a través de un
URI de datos (consulta [Resource Inlining (Incorporación de recursos)](https://hpbn.co/http1x/#resource-inlining)),
entonces ya tienes experiencia práctica con el servidor push. En efecto, al incorporar manualmente el recurso
en el documento, estamos insertando dicho recurso al
cliente, sin esperar a que este lo solicite. Con HTTP/2 podemos lograr
los mismos resultados pero con beneficios de rendimiento adicionales. Los recursos push pueden ser:

* Almacenados en caché por el cliente
* Reutilizados en páginas diferentes
* Multiplexados junto con otros recursos
* Priorizados por el servidor
* Rechazados por el cliente

### PUSH_PROMISE 101

Todas las transmisiones del servidor push se inician a través de tramas PUSH_PROMISE, que indican la
intención del servidor de insertar los recursos descritos al cliente y necesitan ser
entregados antes que los datos de respuesta que solicitan los recursos insertados. Este
orden de entrega es crítico: el cliente necesita saber qué recursos son los que el servidor
intenta insertar a fin de evitar duplicar solicitudes para estos
recursos. La estrategia más simple para cumplir este requisito es enviar todas las
tramas PUSH_PROMISE, que contienen precisamente los encabezados de HTTP del recurso
promise, antes que la respuesta de las primarias (en otras palabras, las tramas DATA).

Una vez que el cliente recibe una trama PUSH_PROMISE, tiene la opción de rechazar la
transmisión (a través de una trama RST_STREAM), si así lo desea. (Esto podría ocurrir, por ejemplo,
debido a que el recurso ya está en la caché). Esta es una importante mejora en comparación con
HTTP/1.x. Por el contrario, el uso de incorporación de recursos, que es una "optimización"
popular de HTTP/1.x, equivale a una "inserción forzada": el cliente no puede
desactivar el recurso incorporado, ni cancelarlo o procesarlo de manera individual.

Con HTTP/2, el cliente mantiene el control total de la forma en que se utiliza el servidor push. El
cliente puede limitar la cantidad de transmisiones insertadas de manera concurrente; ajustar la ventana de control de flujo
inicial para controlar cuántos datos se insertan cuando se abre la transmisión
por primera vez o inhabilitar el servidor push en su totalidad. Estas preferencias se comunican a través de
las tramas SETTINGS al comienzo de la conexión de HTTP/2 y pueden actualizarse
en cualquier momento.

Cada recurso insertado es una transmisión que, a diferencia de un recurso incorporado, le permite
ser multiplexado, priorizado y procesado de manera individual por el cliente. La única
restricción de seguridad impuesta por el navegador consiste en que los recursos insertados deben
obedecer la política del mismo origen: el servidor debe estar autorizado para entregar el contenido
proporcionado.

## Compresión de encabezado

Cada transferencia de HTTP lleva un conjunto de encabezados que describen al recurso
transferido y sus propiedades. En HTTP/1.x, estos metadatos siempre se envían como texto
sin formato y agregan entre 500 y 800 bytes de sobrecarga por transferencia, y
a veces más kilobytes si se usan cookies de HTTP. (Consulta 
[Measuring and Controlling Protocol Overhead (Medición y control de sobrecarga de protocolo)](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
.) Para reducir esta sobrecarga y mejorar el rendimiento, HTTP/2 comprime los metadatos
del encabezado de solicitud y respuesta mediante el formato de compresión HPACK que usa dos
técnicas simples pero poderosas:

1. Permite que los campos del encabezado transmitido se codifiquen a través de un código Huffman 
   estático, que reduce su tamaño de transferencia individual.
2. Requiere que tanto el cliente como el servidor mantengan y actualicen una lista 
   indexada de campos de encabezado previamente vistos (en otras palabras, establece un contexto
   de compresión compartido), que luego se usa como referencia para codificar de manera eficiente a los valores
   transmitidos previamente.

La codificación Huffman permite que los valores individuales se compriman cuando se transfieren
y la lista indexada de los valores transferidos anteriormente nos permite codificar
valores duplicados al transferir valores indexados que pueden usarse para buscar
y reconstruir todas las claves y valores del encabezado de manera eficiente.

![HPACK: Compresión de encabezado para HTTP/2](images/header_compression01.svg)

Como una optimización adicional, el contexto de la compresión de HPACK consiste en una tabla estática
y una tabla dinámica: la tabla estática está definida en la especificación y
proporciona una lista de campos de encabezados de HTTP comunes que todas las conexiones tienen más posibilidades de
usar (p. ej., nombres de encabezado válidos); la tabla dinámica inicialmente está vacía y se
actualiza en base a los valores intercambiados dentro de una conexión específica. Como resultado,
el tamaño de cada solicitud se reduce al usar codificación Huffman estática para los valores
nunca antes vistos y una sustitución de índices por valores que ya
están presentes en las tablas estáticas o dinámicas a cada lado.

Note: Las definiciones de los campos de encabezados de solicitud y respuesta en HTTP/2 se mantienen
sin cambios, salvo por muy pocas excepciones: todos los nombres del campo de encabezado están en minúscula
y la línea de solicitud ahora se divide en campos individuales de seudoencabezados :method, :scheme, :authority
y :path.

### Seguridad y rendimiento de HPACK

Las versiones anteriores de HTTP/2 y SPDY usaban zlib, con un diccionario personalizado, para
comprimir todos los encabezados de HTTP. Esto proporcionaba una reducción de entre el 85% y 88% en el tamaño
de los datos de encabezado transferidos y una mejora significativa en la latencia del tiempo de carga
de la página:

> En el vínculo DSL de ancho de banda bajo, en el cual el vínculo de carga solo es de 375 Kbps,
> la compresión de encabezado de solicitud específicamente dio como resultado mejoras significativas en el tiempo de carga de la página
> para determinados sitios (en otras palabras, aquellos que emitían grandes cantidades de 
> solicitudes de recursos). Descubrimos una reducción de entre 45 y 1142 ms en el tiempo de carga de la página
> debido simplemente a la compresión de encabezados. [*(Documento técnico de SPDY,
> chromium.org)*](https://www.chromium.org/spdy/spdy-whitepaper)

Sin embargo, en el verano de 2012, se publicó un ataque a la seguridad "CRIME" en contra de
los algoritmos de compresión TLS y SPDY, que podía dar como resultado el secuestro de la sesión. En
consecuencia, el algoritmo de compresión zlib fue reemplazado por HPACK, que se
diseñó especialmente para: abordar los problemas de seguridad descubiertos, ser eficiente
y simple a fin de implementarse de manera correcta y, por supuesto, habilitar una buena compresión de
metadatos de encabezado de HTTP.

Para obtener información completa sobre el algoritmo de compresión HPACK, consulta
<https://tools.ietf.org/html/draft-ietf-httpbis-header-compression>.

## Lecturas adicionales:

* [“HTTP/2”](https://hpbn.co/http2/){: .external } 
    – El artículo completo de Ilya Grigorik
* [“Setting up HTTP/2” (Configuración de HTTP/2)](https://surma.link/things/h2setup/){: .external } 
    – Cómo configurar HTTP/2 en backends diferentes de Surma
* [“HTTP/2 is here, let’s optimize!” (HTTP/2 está aquí, ¡a optimizar!)](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19) 
    – Presentación de Ilya Grigorik de Velocity 2015
* [“Rules of Thumb for HTTP/2 Push” (Reglas generales para HTTP/2 Push)](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit) 
    – Un análisis de Tom Bergan, Simon Pelchat y Michael Buettner sobre cuándo y cómo usar push.


{# wf_devsite_translation #}
