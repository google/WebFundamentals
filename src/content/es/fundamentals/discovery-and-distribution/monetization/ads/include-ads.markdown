---
title: "Incluir anuncios de AdSense en el sitio"
description: "Sigue los pasos de esta guía para saber cómo incluir anuncios en tu sitio. Crea una cuenta de AdSense, crea bloques de anuncios, coloca los bloques en tu sitio, establece las preferencias de pago y empieza a recibir ingresos."
updated_on: 2014-07-31
key-takeaways:
  tldr:
    - "Para crear una cuenta de AdSense, debes ser mayor de 18 años y disponer de una cuenta de Google y una dirección postal."
    - "Tu sitio web debe estar activo cuando recibamos la solicitud, y el contenido debe cumplir con las políticas de AdSense."
    - "Crea bloques de anuncios adaptables para garantizar que los anuncios encajen, independientemente del dispositivo en el que se vean."
    - "Verifica las preferencias de pago y espera a que el dinero empiece a llegar."
notes:
  crawler:
    - "Asegúrate de no impedir el acceso a tu sitio al rastreador de AdSense (consulta <a href='https://support.google.com/adsense/answer/10532'>este artículo de ayuda</a>)."
  body:
    - "Pega todo el código de anuncio en la etiqueta <code>body</code>; de lo contrario, los anuncios no funcionarán."
  smarttag:
    - "Las etiquetas <code>data-ad-client</code> y <code>data-ad-slot</code> serán únicas para cada anuncio que generes."
    - "La etiqueta <code>data-ad-format=auto</code> del código de anuncio generado permite habilitar la función de tamaño óptimo para el bloque de anuncios adaptable."
---

<p class="intro">
  Sigue los pasos de esta guía para saber cómo incluir anuncios en tu sitio. Crea una cuenta de AdSense, crea bloques de anuncios, coloca los bloques en tu sitio, establece las preferencias de pago y empieza a recibir ingresos.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Crear una página de ejemplo con anuncios

En esta guía, crearás una página sencilla que incluya anuncios adaptables usando Google AdSense y Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw"
  srcset="images/ad-ss-1200.png 1200w,
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w,
          images/ad-ss-300.png 300w"
  alt="Sitio web de ejemplo con anuncios en ordenador y en móvil">

Si no estás familiarizado con Web Starter Kit, consulta la documentación sobre [cómo configurar Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html).

Para incluir anuncios en tu sitio y recibir pagos, debes seguir estos sencillos pasos:

1. Crea una cuenta de AdSense.
2. Crea bloques de anuncios.
3. Coloca bloques de anuncios en una página.
4. Establece las preferencias de pago.

## Crear una cuenta de AdSense
Para publicar anuncios en tu sitio, necesitas una cuenta de AdSense activa. Si aún no tienes una, debes [crearla](https://www.google.com/adsense/) y aceptar las condiciones de servicio de AdSense.  Cuando crees la cuenta, asegúrate de cumplir los siguientes requisitos:

* Tener al menos 18 años y disponer de una cuenta de Google verificada
* Disponer de un sitio web activo u otro contenido online que cumpla las
[políticas del programa de Google AdSense](https://support.google.com/adsense/answer/48182). Los anuncios se alojarán en este sitio
* Disponer de una dirección postal y de entrega asociadas con tu cuenta bancaria para recibir pagos

## Crea bloques de anuncios

Un bloque de anuncios es un conjunto de anuncios que se muestran en tu página mediante el código JavaScript añadido en esta.  Tienes tres opciones para asignar un tamaño a los bloques de anuncios:

* **[Anuncios adaptables (recomendado)](https://support.google.com/adsense/answer/3213689)**
* [Anuncios predefinidos](https://support.google.com/adsense/answer/6002621)
* [Anuncios con tamaño personalizado](https://support.google.com/adsense/answer/3289364)

Como estás creando un sitio adaptable, lo ideal es usar bloques de anuncios adaptables.
Los anuncios adaptables cambian de tamaño automáticamente en función del tamaño del dispositivo y del ancho del contenedor principal.
Los anuncios adaptables pueden mostrarse junto al contenido en un diseño adaptable, por lo que tu sitio siempre quedará genial en cualquier dispositivo.

Si no usas bloques de anuncios adaptables, tendrás que escribir bastante más código para controlar el aspecto de los anuncios según el dispositivo del usuario. Aunque no especifiques el tamaño exacto de los bloques de anuncios, usa bloques de anuncios adaptables en el [modo avanzado]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Para que tu código sea más sencillo y ahorres tiempo y esfuerzo, el código de anuncio adaptable ajusta automáticamente el tamaño del bloque de anuncios al diseño de tu página.
El código calcula el tamaño requerido de forma dinámica, en función del ancho del contenedor principal del bloque de anuncios. A continuación, elige el tamaño de anuncio que mejor encaje en el contenedor.
Por ejemplo, un sitio optimizado para móviles con un ancho de 360 píxeles podría mostrar un bloque de anuncios de 320 x 50 píxeles.

Supervisa los [tamaños de anuncio más eficaces](https://support.google.com/adsense/answer/6002621#top) en la [Guía de los tamaños de anuncio](https://support.google.com/adsense/answer/6002621#top) de AdSense.

### Para crear un bloque de anuncios adaptable

1. Visita la [pestaña `Mis anuncios`](https://www.google.com/adsense/app#myads-springboard).
2. Haz clic en <strong>+ Nuevo bloque de anuncios</strong>.
3. Asígnale a tu bloque de anuncios un nombre exclusivo. Este nombre aparece en el código del anuncio que se pega en tu sitio, por lo que debería ser descriptivo.
4. Selecciona <strong>Adaptable</strong> en el menú desplegable de tamaños de anuncio.
5. Selecciona <strong>Anuncios de texto y display</strong> en el menú desplegable de tipo de anuncio.
6. Haz clic en <strong>Guardar y obtener el código</strong>.
7. En el cuadro <strong>Código de anuncio</strong> que aparece, selecciona <strong>Tamaño óptimo (recomendado)</strong> en el menú desplegable `Modo`.
Este es el modo recomendado y no requiere realizar ningún cambio en el código del anuncio.

Una vez creado el bloque de anuncios, AdSense facilita un fragmento de código para incluirlo en el sitio, similar al código siguiente:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Incluir bloques de anuncios en tu sitio

Para incluir el anuncio en la página, debes pegar el fragmento de AdSense proporcionado en nuestro lenguaje de marcado.  Si quieres incluir varios anuncios, puedes reutilizar el mismo bloque de anuncios o crear varios bloques de anuncios.

1. Abre `index.html` en la carpeta `app`.
2. Pega el fragmento proporcionado en la etiqueta `main`.
3. Guarda el archivo e intenta visualizarlo en tu navegador. Después, intenta abrirlo en un dispositivo móvil o a través del emulador de Chrome.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw"
      srcset="images/ad-ss-1200.png 1200w,
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w,
              images/ad-ss-300.png 300w"
      alt="Sitio web de ejemplo con anuncios en ordenador y en móvil">
    <br>
    Pruébalo
  </a>
</div>

## Establecer las preferencias de pago

¿Te preguntas cuándo llegarán tus pagos de AdSense? ¿Quieres saber si los recibirás este mes o el siguiente? Asegúrate de seguir los pasos que se indican a continuación:

1. Verifica que hayas facilitado la información fiscal correspondiente en el [perfil de beneficiario](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE).
2. Confirma que tu nombre de beneficiario y tu dirección sean correctos.
3. Selecciona tu forma de pago en la página [Configuración de los pagos](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Introduce tu [número de identificación personal (PIN)](https://support.google.com/adsense/answer/157667). Este PIN verifica la exactitud de la información de tu cuenta.
5. Comprueba si el saldo llega al [límite de pago](https://support.google.com/adsense/answer/1709871).

Consulta [Introducción a los pagos de AdSense](https://support.google.com/adsense/answer/1709858) si tienes alguna duda.
