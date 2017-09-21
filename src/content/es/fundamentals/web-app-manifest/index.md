project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: El manifiesto de las apps web es un archivo JSON que te permite controlar cómo tu sitio o app web se muestra al usuario en áreas donde normalmente ven apps nativas (por ejemplo, la pantalla de inicio de un dispositivo), además de dirigir lo que el usuario puede iniciar y definir su apariencia al iniciarse.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-02-11 #}

# El manifiesto de las apps web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

El [manifiesto de las apps web](https://developer.mozilla.org/en-US/docs/Web/Manifest) es un archivo JSON simple que permite que tú, el desarrollador, puedas controlar cómo se muestra tu app al usuario en áreas donde normalmente ven apps nativas (por ejemplo, la pantalla de inicio de un dispositivo móvil), además de indicar lo que el usuario puede iniciar y definir su apariencia al iniciarse.

Los manifiestos de las apps web permiten guardar un marcador de sitio en la pantalla de inicio de un dispositivo. Cuando un sitio se inicia de esta manera: 

* Tiene un ícono y un nombre únicos para que los usuarios puedan diferenciarlo de otros sitios.
* Muestra algo al usuario mientras se descargan los recursos o se restauran a partir del caché.
* Proporciona características predeterminadas de visualización al navegador para evitar una transición demasiado brusca cuando los recursos del sitio se encuentren disponibles. 

Hace todo esto a través del simple mecanismo de metadatos en un archivo de texto. Eso representa el manifiesto de aplicación web.

Note: Aunque los manifiestos de apps web pueden usarse en cualquier sitio, son necesarios para las [apps web progresivas](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }
- Crear un manifiesto y vincularlo a tu página son procesos muy sencillos.
- Controla lo que el usuario ve cuando se inicia desde la pantalla de inicio.
- Esto incluye elementos como una pantalla de presentación, colores del tema e incluso la URL que se abre. 

## Crea el manifiesto

Antes de adentrarnos en detalles sobre el manifiesto de la app web, creemos un manifiesto
básico y vinculemos una página web al mismo.

Puedes dar al manifiesto el nombre que desees. La mayoría de la gente usa `manifest.json`. A continuación, te mostramos un ejemplo:


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

Asegúrate de incluir lo siguiente: 

* Un `short_name` para usar como el texto de la pantalla de inicio de los usuarios.  
* Un `name` para usar en el banner de instalación de apps web.  
  

## Informa al navegador acerca del manifiesto

Una vez que el manifiesto de tu app esté creado y se encuentre en tu sitio, agrega
una etiqueta `link` a todas las páginas que compongan tu app web, como se muestra a continuación:


    <link rel="manifest" href="/manifest.json">
  
## Configura una URL de inicio

Si no proporcionas una `start_url`, se usa la página actual, y
es muy poco probable que esto sea lo que los usuarios quieran. Pero esa no es la razón para
incluirla. Ya que ahora puedes definir la forma en la que se iniciará tu app, agrega un parámetro de cadena
de consulta a la `start_url` para indicar cómo se inició. 

    "start_url": "/?utm_source=homescreen"

Puedes elegir lo que quieras; el valor que usamos tiene la ventaja de ser relevante para Google Analytics.
 

## Personaliza los íconos

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="Ícono de adición a la pantalla principal">
  <figcaption>Ícono de adición a la pantalla principal</figcaption>
</figure>

 Puedes definir el conjunto de íconos que usará el navegador cuando un usuario agregue tu sitio a su pantalla de inicio. Puedes definirlos con un tipo y tamaño, de la siguiente manera:

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

Note: Cuando guardas un ícono en la pantalla de inicio, Chrome busca primero los íconos que concuerden con la densidad de la pantalla y que tengan el tamaño para una densidad de pantalla de 48 dp. Si no encuentra ninguno, busca el ícono que más cerca esté de concordar con las características del dispositivo. Si, por alguna razón, quieres que se encuentre específicamente un ícono en una densidad de píxeles en particular, puedes usar el miembro <code>density</code> opcional, que indica un número. Cuando no declaras la densidad, el valor predeterminado es 1.0. Esto significa: "usa este ícono para densidades de pantalla de 1.0 y superiores", que es lo que normalmente quieres.

## Agrega una pantalla de presentación

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="color de fondo">
  <figcaption>Color de fondo para la pantalla de presentación</figcaption>
</figure>

Cuando inicias tu app web desde la pantalla de inicio suceden varias cosas bajo la
superficie:

1. Chrome se inicia.
2. Se ejecuta el representador que muestra la página.
3. Tu sitio se carga desde la red (o desde la caché si tiene un service worker).

Mientras esto sucede, la pantalla se pone en blanco y parece detenida.
Esto se nota sobre todo si cargas tu página web desde la red, ya que así las páginas
tardan más de uno o dos segundos en visualizarse en la página principal.

Para ofrecer una experiencia de usuario mejor, puedes reemplazar la pantalla blanca con un título, color e imágenes. 

### Configura una imagen y un título

Si sigues los pasos desde el principio, ya tienes una imagen y un título. Chrome infiere la imagen y el título a partir miembros específicos del manifiesto. Lo que importa aquí es conocer las características específicas. 

Se toma una imagen a partir de la matriz de `icons` para la pantalla de presentación. Chrome elige la imagen de densidad más cercana a 128 dp para el dispositivo. El título se obtiene simplemente a partir del miembro `name`.

### Configura un color de fondo 

Especifica el color de fondo usando la propiedad con el nombre apropiado `background_color`
. Chrome usa este color desde el momento en que la app web se inicia,
y el color permanece en la pantalla hasta la primera aparición de la app web.

Para configurar el color de fondo, indica lo siguiente en tu manifiesto:


    "background_color": "#2196F3",
    

Ahora no se muestra una pantalla blanca cuando se inicia tu sitio desde la pantalla de inicio.

Un buen valor que se sugiere para esta propiedad es el color de fondo de la página de carga.  Usar los mismos colores que la página de carga permite una transición más suave desde la
pantalla de presentación a la página principal.

### Configura un color de tema

Especifica un color de tema por medio de la propiedad `theme_color`. Esta propiedad
fija el color de la barra de herramientas. Para llevar esto a cabo sugerimos duplicar un color existente,
 específicamente el `theme-color` `<meta>`.


## Configura el estilo para iniciar

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Opciones de visualización del manifiesto</figcaption>
</figure>

Usa el manifiesto de aplicación web para controlar el tipo de pantalla y la orientación de página.

### Personaliza el tipo de pantalla

Puedes hacer que tu app web oculte la IU del navegador si configuras el tipo de `display` en `standalone`:


    "display": "standalone"
    

Si consideras que los usuarios preferirían ver tu página como un sitio normal en un navegador, puedes configurar el tipo de `display` en `browser`:


    "display": "browser"
    
<div style="clear:both;"></div>

### Especifica la orientación inicial de la página

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="Opciones de orientación del manifiesto de aplicación web">
  <figcaption>Opciones de orientación del manifiesto de aplicación web</figcaption>
</figure>

Puedes imponer una orientación específica, lo cual beneficia a las apps
que solo funcionan en una orientación; por ejemplo, juegos Usa esto 
de manera selectiva. Los usuarios prefieren seleccionar la orientación.


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## Proporciona un color de tema para todo el sitio

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="color de fondo">
  <figcaption>Color de tema</figcaption>
</figure>

Chrome introdujo el concepto de un color de tema para tu sitio en 2014. El color de tema
es una sugerencia de tu página web que indica al navegador el color con que deben matizarse los
[elementos de IU como la barra de direcciones](/web/fundamentals/design-and-ux/browser-customization/).  

Sin un manifiesto, debes definir el color de tema en cada páginas, y si 
tu sitio es grande o heredado, no será posible realizar muchos cambios en él.

<div style="clear:both;"></div>

Agrega un atributo `theme_color` a tu manifiesto. Cuando se inicie el sitio
desde la pantalla de inicio, cada página del dominio recibirá el color de tema de modo automático.



    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="color de fondo">
  <figcaption>Color de tema para todo el sitio</figcaption>
</figure>

## Prueba tu manifiesto {: #test }

Si quieres verificar de forma manual que el manifiesto de tu app web esté configurado correctamente,
usa la pestaña **Manifest** en el panel **Application** de Chrome DevTools.

![La pestaña Manifest de Chrome DevTools](images/devtools-manifest.png)

Esta pestaña proporciona una versión en lenguaje natural de muchas de las propiedades
de tu manifiesto. Consulta [Manifiesto
de app web](/web/tools/chrome-devtools/progressive-web-apps#manifest) en
la documentación de Chrome DevTools para obtener más información sobre esta pestaña. También
puedes simular los eventos Add to Homescreen (agregar a la pantalla de inicio) desde aquí. Consulta [Prueba del banner de instalación
de apps](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)
para obtener más información sobre este tema.

Si prefieres un enfoque automático para validar el manifiesto de tu app web,
visita [Lighthouse](/web/tools/lighthouse/). Lighthouse es una herramienta
de auditoría de apps web que ejecutas como una extensión de Chrome o como un módulo NPM. Le proporcionas una URL a
Lighthouse, este ejecuta un conjunto de auditorías en la página y luego
muestra los resultados en un informe. Las auditorías de Lighthouse en relación con los manifiestos de apps web
incluyen controlar lo siguiente:

* Que la app pueda agregarse a la pantalla de inicio.
* Que luego de agregarse, la app se inicie con una pantalla de presentación personalizada.
* Que la barra de direcciones del navegador tenga un color personalizado.
* Que la app esté en HTTPS (un requisito previo para Add to Homescreen).

## Más información

Este artículo te ha brindado una introducción rápida a los manifiestos de apps web, pero
hay más por aprender.

* Si usas un manifiesto de apps web, probablemente será conveniente que también configures un
[banner de instalación de apps](/web/fundamentals/engage-and-retain/app-install-banners/). 

* En Mozilla Developer Network puedes encontrar una [guía completa](https://developer.mozilla.org/en-US/docs/Web/Manifest)
sobre el manifiesto de apps web.

* Si quieres descripciones destacadas de los ingenieros que crearon los manifiestos
de apps web, puedes leer la [propia especificación del W3C](http://www.w3.org/TR/appmanifest/){: .external }.

Note: Si actualizas tu archivo `manifest.json` en el futuro, el usuario no
verá automáticamente esos cambios, a menos que vuelva a agregar tu app a sus
pantallas de inicio.





{# wf_devsite_translation #}
