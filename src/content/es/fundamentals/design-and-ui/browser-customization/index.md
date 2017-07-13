project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los navegadores modernos facilitan la personalización de ciertos componentes, como los íconos y el color de la barra de direcciones, e incluso la adición de elementos como mosaicos personalizados. Estos simples ajustes pueden aumentar la captación y lograr que los usuarios vuelvan a usar tu sitio.


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-09-21 #}

# Colores de navegador e íconos {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Los navegadores modernos facilitan la personalización de ciertos componentes, como los íconos y el color de la barra de direcciones, e incluso la adición de elementos como mosaicos personalizados. Estos simples ajustes pueden aumentar la captación y lograr que los usuarios vuelvan a usar tu sitio.


## Proporciona íconos y títulos llamativos 

Cuando un usuario visita tu página web, el navegador intenta obtener un ícono a partir del lenguaje HTML. El ícono puede aparecer en varios puntos, como la etiqueta del navegador, el cambio reciente de app, la página de pestaña nueva (o visitada más recientemente), entre otros.

Proporcionar una imagen de alta calidad hará que tu sitio sea más reconocible y facilitará
la búsqueda de tu sitio para los usuarios. 

Para ser totalmente compatibles con todos los navegadores, necesitarás agregar algunas etiquetas al elemento `<head>`
de cada página.


    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome y Opera

Chrome y Opera usan `icon.png`, que se adapta al tamaño necesario a través 
del dispositivo. Para prevenir el ajuste de escala automático, también puedes proporcionar 
tamaños adicionales especificando el atributo `sizes`.


Note: El tamaño de los íconos debe basarse en 48 px; por ejemplo, 48 px, 96 px, 144 px, y 192 px.

### Safari

En Safari, también se usa la etiqueta `<link>` con el atributo `rel`: `apple-touch-icon`.

Puedes especificar [tamaños explícitos](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) 
proporcionando una etiqueta de vínculo por separado para cada ícono. De este modo, el SO 
no tendrá que cambiar el tamaño del icono:


    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer y Windows Phone

En la nueva experiencia de pantalla de inicio de Windows 8, se presentan cuatro diseños diferentes para los 
sitios anclados y se deben usar cuatro íconos. Si no deseas admitir un tamaño específico, puedes omitir las etiquetas metaetiquetas 
correspondientes.


    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Mosaicos en Internet Explorer

Los “sitios anclados” y los “íconos dinámicos” rotativos de Microsoft trascienden ampliamente otras
implementaciones y se encuentran más allá del alcance de esta guía. Puedes obtener más información
en la sección
sobre [cómo crear iconos dinámicos](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx) de MSDN (Microsoft Developer Network).


## Elementos de color del navegador

Mediante diferentes elementos `meta`, puedes personalizar el navegador e 
incluso los elementos de la plataforma. Ten en cuenta que algunos solo pueden funcionar en ciertas
plataformas o navegadores, pero pueden mejorar notablemente la experiencia. 

Chrome, Firefox OS, Safari, Internet Explorer y Opera Coast te permiten definir 
los colores para los elementos del navegador e incluso la plataforma a través de metaetiquetas.

### Metaetiqueta theme color para Chrome y Opera

Usa la metaetiqueta theme color para especificar el color de tema para Chrome en Android.

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Colores de tema que aplican ajustes de estilo a la barra de direcciones en Chrome">

### Ajustes de estilo específicos de Safari

Safari te permite definir el estilo de la barra de estado y especificar una imagen de inicio.

#### Cómo especificar una imagen de inicio

De forma predeterminada, en Safari se muestra una pantalla en blanco durante el tiempo de carga y, después de varias
cargas, una captura de pantalla del estado anterior de la app. Para evitar esto, puedes
indicar a Safari que muestre una imagen de inicio en particular. Para ello, agrega una etiqueta de vínculo con
`rel=apple-touch-startup-image`. Por ejemplo:


    <link rel="apple-touch-startup-image" href="icon.png">
    

La imagen debe tener el tamaño específico de la pantalla del dispositivo de destino; de lo contrario,
no se usará. Consulta
[Pautas sobre el contenido web de Safari](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
para obtener más información.

Aunque la documentación de Apple no es precisa con respecto a este tema, la comunidad de desarrolladores
ha descubierto una forma de incluir a todos los dispositivos usando consultas avanzadas de medios para
seleccionar el dispositivo adecuado y luego especificar la imagen correcta. A continuación, presentamos una
solución útil, cortesía del [gist de tfausak](//gist.github.com/tfausak/2222823):

#### Cambia la apariencia de la barra de estado

Puedes cambiar la apariencia de la barra de estado predeterminada a `black` o
`black-translucent`. Con `black-translucent`, la barra de estado flota sobre
el contenido de la pantalla completa en lugar de desplazarlo hacia abajo. Esto aporta más altura al
diseño, pero obstruye la parte superior de la página.  A continuación, se especifica el código requerido:


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Captura de pantalla con <code>black-translucent</code></figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Captura de pantalla con <code>black</code></figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
