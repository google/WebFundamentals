project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Hay dos servidores involucrados en el envío de un mensaje: tu servidor y un servidor de mensajería de terceros. Tú llevas registro de los destinatarios de tus mensajes. El servidor de terceros controla las rutas.


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Enviar mensajes {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Realmente hay dos servidores involucrados en el envío de un mensaje: tu servidor
y un servidor de mensajería de terceros. Tú llevas registro de dos cosas:
destinatarios y puntos finales específicos del destinatario en el servidor de mensajería. El
servidor de mensajería controla las rutas.

## El contexto más amplio {: #the-broader-context }

Hemos visto cómo suscribirte a los mensajes de notificaciones push dentro de una app web. Ese proceso
incluyó pasar una clave pública, llamada la `applicationServerKey`, a la
API de suscripción.

En el siguiente diagrama, se muestra el orden de las operaciones.

![Enviando un mensaje](images/push-flow.gif)

1. Un dispositivo descarga tu app web que contiene una publicKey ya creada,
   a la cual se hace referencia en secuencias de comandos como la `applicationServerKey`. Tu app web instala
   un proceso de trabajo.
1. Durante el flujo de suscripción, el navegador contacta el servidor de mensajería para
   crear una suscripción nueva y devolvérsela a la app.

    <aside class="note"><b>Nota:</b> No tienes que conocer la URL del servidor de mensajería. Cada proveedor de navegador administra su propio servidor de mensajería para su navegador.</aside>

1. Después del flujo de suscripción, tu app vuelve a pasar un objeto de suscripción al
   servidor de tu app.
1. Posteriormente, el servidor de tu app envía un mensaje al servidor
   de mensajería, que lo reenvía al destinatario.

## Generar la applicationServerKey {: #generating-the-key }

Hay muchas cosas que tienes que conocer sobre la `applicationServerKey`:

* Es la parte de la clave pública de un par de claves públicas o privadas generado en el servidor
  de tu app.
* EL par de claves se tienen que poder usar con una firma digital de curva elíptica
  (ECDSA) en la curva P-256.
* Tu app tiene que pasar la clave pública al servidor de mensajería como un conjunto de
  de valores enteros de ocho bits sin firmar.
* Se define en una especificación llamada Voluntary Application Server Identification
  for Web Push (VAPID), la cual discutiremos en la sección [enviar mensajes](sending-messages).

Puedes encontrar un ejemplo para generar esto en la
[biblioteca de nodo web-push](https://github.com/web-push-libs/web-push/). Puede
lucir así:


    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


## Anatomía de un objeto de suscripción {: #subscription-anatomy }

Anteriormente, dijimos que un objeto de suscripción se tiene convertir en string y pasar al
servidor, pero no te dijimos que había en el objeto de suscripción. Eso es
porque el cliente no hace nada con esto. El servidor sí.  

El objeto de suscripción tiene la siguiente apariencia:  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


¿Cuál es el contenido?  

**endpoint**: contiene dos partes, la URL del servicio de mensajería que usa el
navegador que suscribe seguido del identificador único para el usuario.

**keys**: las claves de encriptación que se usan para encriptar datos se pasan a los mensajes del proceso
de trabajo. Contiene lo siguiente:

* **auth**: un secreto de autenticación de 16 bytes generado por el navegador.
* **p256dh**: 65 bytes contienen una clave pública del navegador que los
  desarrolladores tienen que usar cuando se encriptan mensajes que quieren enviar a ese
  servicio push.

Note: En muchos de los bytes de especificaciones relevantes se llaman octetos. El término se usa debido a lo heredado y a los sistemas de comunicación en que los bytes no siempre tienen 8 bits.

## Crear el mensaje {: #creating-the-message }

Aquí es donde las cosas comienzan a volverse disparatadas. En esta sección, ya no estamos
en tu app cliente. Estamos en el servidor de la app donde vamos a crear
y a enviar un mensaje al cliente. Hay muchas cosas para controlar.

Antes de continuar, revisemos qué tenemos y de dónde proviene.

* **Objeto de subscripción**: esto proviene del cliente. Contiene el punto final
  del servidor de mensajería, una copia de la clave pública y un secreto de autenticación
  generado por el cliente. De aquí en más, dejaremos de hablar
  sobre el objeto de subscripción y solo haremos referencia al **elemento final**, la **clave
  pública** y el **secreto de autenticación**.
* **clave privada**: la clave privada VAPID corresponde a la clave privada VAPID.
  Esta es una clave privada para tu servidor de la app.

Vamos a mirar la creación de un mensaje en tres partes. Primero crearemos algunos encabezados
HTTP, luego crearemos una carga para el mensaje y finalmente los combinaremos
y los enviaremos al servidor de mensajería.

### Una nota sobre ejemplos de códigos {: #a-note-about-samples }

Los ejemplos de códigos que se proporcionan en esta sección, se toman de la [biblioteca de
nodo web-push](https://github.com/web-push-libs/web-push).

### El producto {: #the-product }

Miremos con qué vamos a terminar, luego hablaremos de cómo
crearlo.

<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization: WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

Ten en cuenta que esta solicitud se envía al punto final contenido en el objeto
de suscripción. Los encabezados de Authorization, Crypto-Key y TTL requieren de alguna
de explicación. Comencemos con lo más simple.

## Encabezados HTTP {: #http-headers }

### TTL {: #ttl }

Puede llevar un poco de tiempo hasta que el servidor de mensaje pueda entregar un mensaje enviado por tu
servidor de la app. Los servicios de mensajes no están obligados a mantener un mensaje por siempre.
Francamente, para ser oportunos, un servidor de la app nunca tiene que enviar un mensaje que pueda permanecer
por siempre. Es por ello que se solicita incluir un encabezado llamado TTL, literalmente
“tiempo de permanencia”.

EL encabezado TTL es un valor en segundos proporcionado como una sugerencia al servidor
de mensajes sobre cuánto tiempo el servidor tiene que mantener el mensaje e intentar
entregarlo. Si elige, el servidor de mensaje puede acortar el tiempo que desea mantener
el mensaje. Si lo hace, debe mostrar que se acortó el tiempo en un encabezado TTL a través de una
respuesta a la solicitud de mensaje. Si el TTL tiene un valor de 0, el servidor de mensaje
tiene que entregarlo de inmediato si el usuario-agente está disponible. Si el usuario-agente
no está disponible, el mensaje caduca de inmediato y nunca se entrega.

### Encabezado de la Crypto-Key {: #crypto-key-header }

Para validar un mensaje enviado por el servidor de tu app, el servidor de mensaje necesita la
clave pública. Envías la clave pública en el encabezado de la Crypto-Key. El encabezado de la Crypto-Key
tiene varias partes.  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

Por ejemplo:  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

La primera parte (`dh=publicKey`) es la clave pública, la que creamos
en Solicitar permiso y suscribir usuarios. La segunda parte
(`p256ecdsa=applicationServerKey`) es la clave pública creada por el servidor de tu app.
Ambas se deben codificar como dirección url base64. Observa la coma que separa las dos partes de la Crypto-Key.

Note: Un error en Chrome 52 requiere que se use un punto y coma para separar las partes de la Crypto-Key, en lugar de una coma.

### Encabezado de Authorization {: #authorization-header }

Para enviar mensajes, necesitas un encabezado de Authorization. Contiene cuatro partes:  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

La palabra WebPush es un literal que debe estar seguido de un espacio. Las partes
restantes, que son encriptadas y concatenadas mediante un punto, forman un JSON
web token (JWT) firmado. Un JWT es un modo de compartir un objeto JSON con una segunda parte de
modo que la parte emisora pueda firmarlo y la parte receptora puede verificar
que la firma sea del emisor esperado.   

Veamos cada parte del token en detalle.

#### Encabezado JWT {: #jwt-header }

El encabezado JWT contiene dos extractos estándar de información: una propiedad `typ` para
indicar el tipo de mensaje, en este caso, un mensaje JWT y una propiedad `alg`
para indicar el algoritmo usado para firmar el mensaje.
Estos detalles se deben codificar como dirección url base64.


    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


#### Carga de JWT {: #jwt-payload }

El JWT llama a esta sección la carga. Aquí no se almacena la carga
del mensaje. Llegaremos a eso en breve. La carga es otro objeto JSON con los
siguientes miembros:    
**aud**  
Esto contiene el origen del punto final del servicio push, que tienes que extraer
desde el objeto de suscripción. Este no es el origen de tu sitio.    
**exp**  
Especifica el momento en que la solicitud JWT vence en milisegundos (no el vencimiento
del mensaje en sí). Debe estar dentro de las veinticuatro horas. Esto se puede
calcular convirtiendo la fecha actual en milisegundos y agregando la duración.
Por ejemplo, en Node.js puedes hacer esto:


    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
Especifica un sujeto, que la especificación VAPID define como un modo para el servicio push
para contactar a un emisor de mensaje. Esto puede ser una URL o una dirección mailto (consulta el siguiente
ejemplo).  

Una carga completa de JWT tiene la siguiente apariencia:


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


#### Firma {: #signature }

La firma es la última sección del JWT.

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Crear la firma primero concatenando el encabezado JWT y la carga con
un punto. Por ejemplo:

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>

Encripta esto usando la clave privada que creaste en
[Generar la applicationServerKey](#generating-the-key).

Ahora tenemos las tres piezas que forman el JWT que unes
con un punto.

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Te mostraremos cómo hacer la encriptación de la firma, pero hay
un número de bibliotecas disponibles. Un buen lugar para mirar es la sección de bibliotecas de
[jwt.io](https://jwt.io/){: .external }.

Finalmente, antepone la palabra 'WebPush' seguida de un espacio. El resultado
se verán más o menos de la siguiente manera:

<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

### Carga de mensaje {: #message-payload }

Cuando se implementa código del servidor, existen dos métodos para enviar mensajes que deben
considerarse:

* mensajes con carga de datos;
* mensajes sin carga de datos, a menudo citados como “señales”.

En el caso de la señal, el service worker usa el mensaje como una señal para
obtener datos desde un terminal. La sección Administrar mensajes contiene un ejemplo de código
para mostrar cómo lo hace un proceso de trabajo.

¿Qué motivos te impulsarían a enviar un mensaje sin carga? Existen dos:

* Si debes enviar algo cuyo tamaño supera el límite de carga de 4 k establecido por la especificación
* Si los clientes necesitan datos más actualizados que los que se ofrecerían en el mensaje de aplicación.

Técnicamente, la otra razón es que las capacidades del navegador pueden variar
por un tiempo, pero probablemente las dos razones principales se aplicarán siempre. Si el
navegador no es compatible con las cargas, el objeto de suscripción no contendrá claves.

La carga, sin importar cómo se la diste al cliente, tiene que ser encriptada.
La encriptación es una especialidad que resulta tan suficiente, incluso dentro de un desarrollo de software, que
no te recomendamos escribir tu propio sistema de encriptación. Afortunadamente, hay
varias bibliotecas push disponibles.

Para cargas que se envían a través del servidor de mensaje, tienes que encriptarlas usando la
publicKey y el secreto de autenticación. También se debe usar sal con 16 bytes aleatorios
que son únicos para el mensaje. Finalmente, se agrega al cuerpo de la
solicitud enviada al servidor de mensaje.

### Envío en camino {: #sending-it-on-its-way }

En la biblioteca de nodo web-push, esto se logra con una instancia del objeto
de solicitud desde la biblioteca https incorporada.


    const https = require('https');


En algún punto, se envía la solicitud al servidor de mensaje. La biblioteca de nodo web-push
encapsula este código dentro de una promesa (con llamadas apropiadas para resolver y
rechazar) de modo que pueda suceder de manera asincrónica. El siguiente ejemplo de código, tomado de
la [biblioteca de nodo web-push](https://github.com/web-push-libs/web-push)
ilustra esto.

Ten en cuenta que el servidor de mensaje responde a la solicitud de la red de inmediato,
lo cual significa que es asincrónico con el envío del mensaje a la app del cliente.


    const pushRequest = https.request(options, function(pushResponse) {  
      let body = '';    
      // Allow the payload to be sent out in chunks.  
      pushResponse.on('data', function(chunk) {  
        body += chunk;  
      });    
      // Check to see if the push is successful.  
      pushResponse.on('end', function() {  
        if (pushResponse.statusCode !== 201) {  
          reject(new WebPushError('Received unexpected response code',  
            pushResponse.statusCode, pushResponse.headers, body));  
        } else {  
          // Do something with the response body.  
        }  
     });  
    });  

    if (requestPayload) {  
      pushRequest.write(requestPayload);  
    }  

    pushRequest.end();  

    pushRequest.on('error', function(e) {  
      console.error(e);  
    });


{# wf_devsite_translation #}
