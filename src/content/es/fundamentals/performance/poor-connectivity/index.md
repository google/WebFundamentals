project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Es importante comprender cómo es usar tu app o tu sitio cuando la conectividad es deficiente o poco confiable, y cómo desarrollar en consecuencia. Varias herramientas pueden ayudarte.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2016-05-09 #}

# Comprensión de las implicaciones del ancho de banda bajo y de la latencia {: .page-title } alta

{% include "web/_shared/contributors/samdutton.html" %}

Es importante comprender cómo es usar tu app o tu sitio cuando la conectividad es deficiente o poco confiable, y cómo desarrollar en consecuencia. Varias herramientas pueden ayudarte.

## Haz pruebas con ancho de banda bajo y una latencia alta {: #testing }

<a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">Cada vez más</a> personas experimentan la Web desde dispositivos móviles. Incluso en el hogar, <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">muchas personas están abandonando la banda ancha fija y adoptando la red móvil</a>.

En este contexto, es importante comprender cómo es el uso de tu app o tu sitio cuando la conectividad es deficiente o poco confiable. Existen diferentes herramientas de software que pueden ayudarte a [emular y simular](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference) condiciones de ancho de banda reducido y [latencia] alta(https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/).

### Emula restricciones de la red

Cuando compiles o actualices un sitio, debes garantizar un rendimiento adecuado bajo muchas condiciones de conectividad. Varias herramientas pueden ayudar

#### Herramientas del navegador

[Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions) te permite probar tu sitio con diferentes velocidades de carga y descarga y [tiempos de ida y vuelta](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/) usando configuraciones predeterminadas o personalizadas del panel Network de Chrome DevTools:

![Restricciones de Chrome DevTools](images/chrome-devtools-throttling.png)

#### Herramientas del sistema

Network Link Conditioner es un panel de preferencias disponible en Mac si instalas [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) para Xcode:

![Panel de control de Network Link Conditioner de Mac](images/network-link-conditioner-control-panel.png)

![Configuración de Network Link Conditioner de Mac](images/network-link-conditioner-settings.png)

![Configuración personalizada de Network Link Conditioner de Mac](images/network-link-conditioner-custom.png)

#### Emulación de dispositivos

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) te permite simular varias condiciones de red mientras ejecutas apps (incluidos navegadores web y apps web híbridas) en Android:

![Android Emulator](images/android-emulator.png)

![Configuración de Android Emulator](images/android-emulator-settings.png)

En iPhone, Network Link Conditioner se puede usar para simular condiciones de red deterioradas (ver más arriba).

### Probar desde diferentes ubicaciones y redes

El rendimiento de la conectividad depende de la ubicación del servidor y del tipo de red.

[WebPagetest](https://webpagetest.org) es un servicio en línea que ofrece un conjunto de pruebas de rendimiento que puedes ejecutar para tu sitio usando diferentes redes y ubicaciones de host. Por ejemplo, puedes probar tu sitio desde un servidor de la India en una red 2G o por cable desde una ciudad de los EE. UU.

![Configuración de WebPagetest](images/webpagetest.png)

Selecciona una ubicación y, en la configuración avanzada, un tipo de conexión. También puedes automatizar la prueba usando [secuencias de comandos](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (por ejemplo, para acceder a un sitio) o sus [API RESTful](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). Esto te ayudará a incluir pruebas de conectividad en los procesos de compilación o el registro de rendimiento.

[Fiddler](http://www.telerik.com/fiddler) admite la creación de conexiones proxy globales a través de [GeoEdge](http://www.geoedge.com/faq) y sus reglas personalizadas se pueden usar para simular velocidades de módem:

![Proxy Fiddler](images/fiddler.png)

### Realiza una prueba en una red deteriorada

Los proxies de software y hardware te permiten emular condiciones de red móvil problemáticas, como limitación de ancho de banda, demora de paquete y pérdida de paquete aleatoria. Un proxy compartido o una red deteriorada pueden permitir a un equipo de desarrolladores incorporar pruebas de red reales a su flujo de trabajo.

[Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) de Facebook es un conjunto de aplicaciones con licencia BSD que se pueden usar para modelar el tráfico y emular malas condiciones de red:

![Augmented Traffic Control de Facebook](images/augmented-traffic-control.png)

> Facebook, incluso, implementó [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) para ayudar a comprender la manera en que usan su producto quienes disponen de conexiones 2G. Los días martes, los empleados reciben un aviso emergente que les da la opción de simular una conexión 2G.

El proxy HTTP/HTTPS [Charles](https://www.charlesproxy.com/){: .external } se puede usar para [ajustar ancho de banda y latencia](http://www.charlesproxy.com/documentation/proxying/throttling/). Charles es un software comercial, pero hay una versión de prueba disponible.

![Configuración de ancho de banda y latencia del proxy Charles](images/charles.png)

Puedes encontrar más información acerca de Charles en [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/).

## Controla las conexiones poco confiables y el “lie-Fi" {: #lie-fi }

### ¿Qué es el “Lie-Fi”?

El término <a href="http://www.urbandictionary.com/define.php?term=lie-fi">Lie-Fi</a> data de al menos 2008 (cuando los teléfonos tenían este aspecto<a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008"></a>) y hace referencia a conectividad que no funciona como parece. Tu navegador se comporta como si tuviera conectividad cuando, por el motivo que fuere, no la tiene.

Cuando se malinterpreta, la conectividad puede generar una experiencia deficiente debido a que el navegador (o JavaScript) intenta repetidamente recuperar recursos en lugar de desistir y seleccionar un recurso de reserva sensible. El Lie-Fi puede ser incluso peor que la ausencia de conexión; por lo menos, cuando un dispositivo está completamente sin conexión, tu JavaScript puede tomar una medida evasiva adecuada.

El Lie-Fi probablemente se convierta en un problema más grande a medida que más gente adopte los dispositivos móviles y deje de usarse la banda ancha fija. [Datos recientes de un censo de EE. UU.](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use) muestran señales de [abandono de la banda ancha fija](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/). La siguiente tabla muestra el uso de Internet móvil en casa en 2015 en comparación con 2013:

<img src="images/home-broadband.png" class="center" alt="Tabla de datos de censo de EE UU. que muestra el paso de banda ancha fija a móvil, particularmente en hogares de ingresos bajos">

### Usa tiempos de espera para controlar la conectividad intermitente

En el pasado, se han usado [métodos modificados usando XHR](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline) para probar las conectividades intermitentes, pero el service worker permite métodos más confiables para establecer tiempos de espera de red. Jeff Posnick explica la manera de lograr esto con tiempos de espera de [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) en su charla [Instant Loading with Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s) (carga inmediata con procesos de trabajo):


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );
    

También se planea una [opción de tiempo de espera](https://github.com/whatwg/fetch/issues/20) para la [API de extracción](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch), y la [Streams API](https://www.w3.org/TR/streams-api/) debería ayudar optimizando la entrega de contenido y evitando solicitudes monolíticas. Jake Archibald proporciona información más detallada sobre la manera de abordar el Lie-Fi en [Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s) (sobrecarga de la carga de la página).


{# wf_devsite_translation #}
