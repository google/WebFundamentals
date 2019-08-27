project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Badging API es una nueva plataforma web API que permite que las aplicaciones
  web instaladas establezcan una insignia para toda la aplicación, que se muestra
  en un lugar específico del sistema operativo asociado con la aplicación, como el
  estante o la pantalla de inicio.

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {#
wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags:
capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials
#} {# wf_featured_snippet: The Badging API is a new web platform API that allows
installed web apps to set an application-wide badge, shown in an
operating-system-specific place associated with the application, such as the
shelf or home screen. Badging makes it easy to subtly notify the user that there
is some new activity that might require their attention, or it can be used to
indicate a small amount of information, such as an unread count. #} {#
wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Insignias para iconos de aplicaciones {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">Actualmente estamos trabajando en esta API como parte del
nuevo <a href="/web/updates/capabilities">proyecto de capacidades</a> y, a
partir de Chrome 73, está disponible como <a href="#ot"><b>prueba de
origen</b></a> . Esta publicación se actualizará a medida que evolucione la API
Badging. <br> <b>Última actualización:</b> 21 de agosto de 2019</aside>

## ¿Qué es la API de Badging? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>Ejemplo de Twitter con 8 notificaciones y otra aplicación que
muestra una insignia de tipo bandera.</figcaption>
</figure>

Badging API es una nueva API de plataforma web que permite que las aplicaciones
web instaladas establezcan una insignia para toda la aplicación, que se muestra
en un lugar específico del sistema operativo asociado con la aplicación (como el
estante o la pantalla de inicio).

Las credenciales facilitan notificar sutilmente al usuario que hay alguna
actividad nueva que podría requerir su atención, o puede usarse para indicar una
pequeña cantidad de información, como un recuento no leído.

Las insignias tienden a ser más fáciles de usar que las notificaciones y pueden
actualizarse con una frecuencia mucho mayor, ya que no interrumpen al usuario.
Y, debido a que no interrumpen al usuario, no se necesita un permiso especial
para usarlos.

[Leer explicador](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### Casos de uso sugeridos para la API Badging {: #use-cases }

Los ejemplos de sitios que pueden usar esta API incluyen:

- Chat, correo electrónico y aplicaciones sociales para indicar que han llegado
nuevos mensajes o mostrar la cantidad de elementos no leídos.
- Aplicaciones de productividad, para indicar que se ha completado una tarea en
segundo plano de larga duración (como la representación de una imagen o video).
- Juegos, para indicar que se requiere una acción del jugador (por ejemplo, en
Ajedrez, cuando es el turno del jugador).

## Estado actual {: #status }

Paso | Estado
--- | ---
1. Crear explicador | [Completar](https://github.com/WICG/badging/blob/master/explainer.md)
2. Crear borrador inicial de especificación | [Completar](https://wicg.github.io/badging/)
**3. Recopilar comentarios e iterar sobre el diseño** | [**En progreso**](#feedback)
**4. Prueba de origen** | [**En progreso**](#ot)
5. Lanzamiento | No empezado

### Véalo en acción

1. Con Chrome 73 o posterior en Windows o Mac, abra la [demostración de API
Badging](https://badging-api.glitch.me/) .
2. Cuando se le solicite, haga clic en **Instalar** para instalar la aplicación,
o use el menú de Chrome para instalarlo, luego ábralo como un PWA instalado.
Tenga en cuenta que debe ejecutarse como una PWA instalada (en su barra de
tareas o base).
3. Haga clic en el botón **Establecer** o **Borrar** para establecer o borrar la
insignia del icono de la aplicación. También puede proporcionar un número para
el *valor de* la *insignia* .

Nota: Si bien la API de Badging *en Chrome* requiere una aplicación instalada
con un icono que en realidad se pueda identificar, no recomendamos realizar
llamadas a la API de Badging dependiendo del estado de instalación. La API de
identificación puede aplicarse en *cualquier lugar donde* un navegador desee
mostrar una insignia, por lo que los desarrolladores no deben hacer suposiciones
sobre en qué situaciones el navegador hará que las insignias funcionen.
Simplemente llame a la API cuando exista. Si funciona, funciona. Si no,
simplemente no lo hace.

## Cómo usar la API Badging {: #use }

A partir de Chrome 73, la API Badging está disponible como versión de prueba de
origen para Windows (7+) y macOS. [Las pruebas de Origin
le](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
permiten probar nuevas funciones y darnos su opinión sobre la usabilidad, la
practicidad y la eficacia para nosotros y la comunidad de estándares web. Para
obtener más información, consulte la [Guía de ensayos de Origin para
desarrolladores
web](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### Soporte para credenciales entre plataformas

La API Badging es compatible (en una prueba de origen) en Windows y macOS.
Android no es compatible porque requiere que muestres una notificación, aunque
esto puede cambiar en el futuro. El soporte de Chrome OS está pendiente de la
implementación de la identificación en la plataforma.

### Regístrese para la prueba de origen {: #ot }

1. [Solicite un
token](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
para su origen.
2. Agregue el token a sus páginas, hay dos formas de proporcionar este token en
cualquier página de su origen:
-  Agregue una etiqueta `<meta>` `origin-trial` al encabezado de cualquier
página. Por ejemplo, esto puede ser algo así como: `<meta
http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
-  Si puede configurar su servidor, también puede proporcionar el token en
las páginas utilizando un encabezado HTTP `Origin-Trial` . El encabezado de
respuesta resultante debería ser similar a: `Origin-Trial: TOKEN_GOES_HERE`

### Alternativas al ensayo de origen.

Si desea experimentar con la API Badging localmente, sin una prueba de origen,
habilite el indicador `#enable-experimental-web-platform-features` en
`chrome://flags` .

### Usando la API Badging durante la prueba de origen

Dogfood: durante la prueba de origen, la API estará disponible a través de
`window.ExperimentalBadge` . El siguiente código se basa en el diseño actual y
cambiará antes de que aparezca en el navegador como una API estandarizada.

Para usar la API Badging, su aplicación web debe cumplir con [los criterios de
instalación de Chrome](/web/fundamentals/app-install-banners/#criteria) , y un
usuario debe agregarla a su pantalla de inicio.

La interfaz `ExperimentalBadge` es un objeto miembro en la `window` . Contiene
dos métodos:

- `set([number])` : establece la insignia de la aplicación. Si se proporciona un
valor, establezca la insignia en el valor proporcionado; de lo contrario,
muestre un punto blanco liso (u otro indicador según corresponda a la
plataforma).
- `clear()` : elimina la insignia de la aplicación.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` puede llamar a `ExperimentalBadge.set()` y
`ExperimentalBadge.clear()` desde una página en primer plano, o potencialmente
en el futuro, un trabajador de servicio. En cualquier caso, afecta a toda la
aplicación, no solo a la página actual.

En algunos casos, el sistema operativo puede no permitir la representación
exacta de la insignia, en este caso, el navegador intentará proporcionar la
mejor representación para ese dispositivo. Por ejemplo, aunque la API Badging no
es compatible con Android, Android solo muestra un punto en lugar de un valor
numérico.

Nota: No asuma nada acerca de cómo el agente de usuario desea mostrar la
insignia. Esperamos que algunos agentes de usuarios tomen un número como "4000"
y lo reescriban como "99+". Si lo satura usted mismo (por ejemplo, "99"), no
aparecerá el signo "+". No importa el número real, simplemente configure
`Badge.set(unreadCount)` y deje que el agente de usuario se
`Badge.set(unreadCount)` mostrarlo en consecuencia.

## Comentarios {: #feedback }

Necesitamos su ayuda para garantizar que la API Badging funcione de una manera
que satisfaga sus necesidades y que no nos falten escenarios clave.

<aside class="key-point"><b>¡Necesitamos tu ayuda!</b> - ¿El diseño actual (que
permite un valor entero o de bandera) satisfará sus necesidades? Si no es así,
presente un problema en el <a
href="https://github.com/WICG/badging/issues">repositorio WICG / badging</a> y
proporcione tantos detalles como sea posible. Además, hay una serie de <a
href="https://github.com/WICG/badging/blob/master/choices.md">preguntas
abiertas</a> que aún se están discutiendo, y nos interesaría escuchar sus
comentarios.</aside>

También nos interesa saber cómo planea utilizar la API Badging:

- ¿Tiene una idea para un caso de uso o una idea de dónde lo usaría?
- ¿Planeas usar esto?
- ¿Te gusta y quieres mostrar tu apoyo?

Comparta sus pensamientos sobre la discusión del [Discurso WICG de Badging
API](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
.

{% include "web/_shared/helpful.html" %}

## Enlaces útiles {: #helpful }

- [Explicador público](https://github.com/WICG/badging/blob/master/explainer.md)
- [Badging API Demo](https://badging-api.glitch.me/) | [Fuente de demostración
de API de identificación](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [Error de
seguimiento](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [Entrada de
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- Solicitar un [token de prueba de
origen](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [Cómo usar un token de prueba de
origen](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- Componente de parpadeo: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
