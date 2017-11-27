project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Prácticas recomendadas para saber cuándo registrar un service worker.

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2016-11-28 #}

# Registro de los service workers {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Los [service
workers](/web/fundamentals/getting-started/primers/service-workers)
pueden acelerar considerablemente las visitas repetidas a tu app web, pero debes seguir ciertos
pasos para que la instalación inicial del service worker no degrade la experiencia de la primera
visita del usuario.

Por lo general, esperar hasta que se cargue la página inicial para
[registrar](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)
el service worker brindará la mejor experiencia de usuario, sobre todo de
aquellos usuarios que utilicen dispositivos móviles con conexiones de red más lentas.

## Modelo convencional de registros

Si ya estás familiarizado con los service workers, es probable que ya conozcas
texto similar a este:

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

Es probable que esté acompañado de algunas instrucciones de `console.log()` o de
[código](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)
que detecta la actualización de un registro de service worker anterior, para que los
usuarios sepan que hay que actualizar la página. Pero son solo pequeñas variaciones de las pocas líneas del
código modelo.

¿Existen entonces variaciones de `navigator.serviceWorker.register`? ¿Existen prácticas
recomendadas que haya que seguir? No debería sorprender (dado que el artículo no termina
aquí) que la respuesta es "¡sí!"

## La primera visita del usuario

Pensemos en la primera visita del usuario a la app web. Todavía no hay ningún service worker
y el navegador no tiene forma de saber si se instalará
uno.

Como programador, tu prioridad debe ser que el navegador obtenga
rápidamente el mínimo conjunto de recursos críticos que sean necesarios para mostrar una página
interactiva. El elemento que demore este proceso es el enemigo de cualquier
experiencia fluida e interactiva.

Ahora supongamos que durante la descarga de JavaScript o de las imágenes que
tu página necesita representar, el navegador decide iniciar un proceso o subproceso en
segundo plano (para no explayarnos tanto, supongamos que es un subproceso). Supongamos que
tu máquina no es muy potente; es el tipo de teléfono móvil
con poca potencia que la mayoría de las personas usan como dispositivo principal. La ejecución
de este subproceso adicional agrega cargas al tiempo de CPU y a la memoria, recursos que tu
navegador usaría para representar la página web.

Es probable que los subprocesos en segundo plano que estén inactivos no marquen mucha diferencia. ¿Pero qué
ocurre si el proceso no está inactivo y, en su lugar, decide que también comenzará
a descargar recursos de la red? Cualquier preocupación sobre cargas en el CPU o la
memoria será secundaria en comparación con los problemas de ancho de banda limitado
que tienen muchos dispositivos móviles. El ancho de banda es un bien preciado, así que no descargues recursos secundarios al mismo tiempo porque debilitarás
los recursos críticos.

Lo que quiero decir es que si ejecutas un nuevo proceso de service worker para descargar
y almacenar en caché recursos en segundo plano, es posible que vaya en contra de tu objetivo: proporcionar
la experiencia más rápida e interactiva durante la primera visita del usuario
a tu sitio.

## Mejorar el modelo

La solución es controlar el inicio del service worker. Para eso, se debe elegir cuándo llamar a
`navigator.serviceWorker.register()`. Una regla simple es demorar
el registro hasta después de que se ejecute el <code>[load
event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>
en <code>window</code>:

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

Pero el momento adecuado de iniciar el registro del service worker también puede depender
de lo que haga tu app web inmediatamente después de que se carga. Por ejemplo, la [app web de Google
I/O 2016](https://events.google.com/io2016/) muestra una pequeña animación
antes de pasar a la pantalla principal. Nuestro equipo
[descubrió](/web/showcase/2016/iowa2016) que si se ejecuta
el registro del service worker durante la animación, los dispositivos móviles de gama baja pueden
tener problemas. En lugar de brindar una mala experiencia a los usuarios,
[demoramos](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)
el registro del service worker hasta después de la animación, cuando
es más probable que el navegador tenga unos segundos libres.

Asimismo, si tu app web usa un framework que realiza configuraciones adicionales
después de cargar la página, busca un evento específico del framework que indique cuándo termina
la tarea.

## Visitas posteriores

Hasta ahora, hablamos de la experiencia durante la primera visita. ¿Pero cómo afecta
la demora del registro del service worker a visitas posteriores de tu sitio?
Aunque sorprenda a más de uno, no debería afectarlas de ningún modo.

Cuando se registra un service worker, pasa por los [eventos
de ciclo de vida](/web/fundamentals/instant-and-offline/service-worker/lifecycle) `install` y
`activate`.
Cuando el service worker se activa, puede gestionar los eventos `fetch` en cualquier
visita posterior a tu app web. El service worker se inicia *antes* de que se realice
la solicitud a cualquier página de su ámbito; si lo piensas, tiene
mucho sentido. Si el service worker existente no estuviese funcionando antes de
visitar la página, no podría realizar los eventos `fetch` para las solicitudes de
navegación.

Por lo tanto, si hay un service worker activo, no importa cuándo llamas a
`navigator.serviceWorker.register()` o, de hecho, no importa *si lo llamas o no*.
A menos que cambies la URL de la secuencia de comandos del service worker,
`navigator.serviceWorker.register()` será un elemento
[no-op](https://en.wikipedia.org/wiki/NOP) en las visitas posteriores. El momento de
la llamada es irrelevante.

## Razones para realizar el registro más temprano

¿En qué escenarios tiene sentido
registrar el service worker apenas sea posible? Uno que se me viene a la mente es cuando tu service worker usa
<code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>
para controlar la página durante la primera visita y el service worker
realiza un [almacenamiento en cache
en tiempo de ejecución](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)
de forma agresiva dentro de su controlador de  <code>fetch</code>. En este caso, hay
una ventaja de activar el service worker lo antes posible: para
llenar su caché en tiempo de ejecución con recursos que podrían ser útiles más adelante. Si
tu app web hace uso de este mecanismo, vale la pena tomarse un tiempo para
asegurarse de que el controlador de <code>install</code> del service worker no solicite
recursos que compitan por ancho de banda con las solicitudes de la página principal.

## Realizar pruebas

Una buena forma de simular una primera visita es abrir la app web en una [ventana de
incógnito de
Chrome](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)
y analizar el tráfico de red en [DevTools de
Chrome](/web/tools/chrome-devtools/). Como programador
web, probablemente vuelves a cargar una instancia local de tu app web decenas y decenas de veces
al día. Pero si visitas nuevamente tu sitio cuando ya hay un
service worker y los cachés están completos, no obtienes la misma experiencia
que un usuario nuevo y es fácil pasar por alto cualquier problema potencial.

Aquí se describe un ejemplo con la diferencia que puede
marcar el momento del registro: Ambas capturas de pantalla se toman cuando se visita una [app de
ejemplo](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)
en modo incógnito con limitación de red para simular una conexión lenta.

![Tráfico de red con registro temprano.](../images/early-registration.png
"Network traffic with early registration.")

La imagen anterior muestra el tráfico de red cuando se modificó la muestra
para realizar el registro del service worker lo antes posible. Puedes ver
las solicitudes de almacenamiento previo en caché (las entradas con [ícono
de engranaje](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)
que provienen del controlador de `install` del service worker)
mezcladas con las solicitudes de otros recursos necesarios para mostrar la página.

![Tráfico de red con registro tardío.](../images/late-registration.png
"Network traffic with late registration.")


En la captura de pantalla anterior, se demoró el registro del service worker hasta después de cargar
la página. Puedes ver que las solicitudes de almacenamiento previo en caché no comienzan hasta
que se obtienen todos los recursos de la red; de esta forma, se elimina cualquier problema de
ancho de banda. Además, dado que algunos de los elementos que almacenamos previamente en caché ya se encuentran
en la caché HTTP del navegador (los elementos con `(from disk cache)` en la columna
Size), podemos llenar la caché del service worker sin recurrir nuevamente a la
red.

Te ganas puntos extras si realizas este tipo de prueba en un dispositivo móvil de gama baja y una
red móvil real. Puedes aprovechar las [capacidades de
depuración remota](/web/tools/chrome-devtools/remote-debugging/)
que ofrece Chrome para conectar un teléfono Android a tu máquina de escritorio vía USB y asegurarte de que las
pruebas que realizas realmente reflejan la experiencia verdadera de muchos de tus
usuarios.

## Conclusión

En resumen, asegurarte de que los usuarios tengan la mejor experiencia durante la primera visita
debe ser una prioridad. Si demoras el registro del service worker hasta que
se cargue la página durante la primera visita, es posible que te sea más fácil cumplir con esta prioridad. Seguirás
aprovechando todos los beneficios de tener un service worker para las visitas posteriores.

A continuación, se muestra una forma simple y directa que puedes usar para asegurarte de que el registro inicial del service worker
se realice después de la carga de la primera página.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
