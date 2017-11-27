project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Buscar y solucionar problemas de contenido mixto es una tarea importante, pero puede tomar mucho tiempo. En esta guía, se analizan algunas herramientas disponibles para facilitar el proceso.

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2017-07-12 #}

# Prevención del contenido mixto {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

Success: Admitir HTTPS en tu sitio web es un paso importante para proteger a tu sitio y a los usuarios contra ataques. Sin embargo, el contenido mixto puede inutilizar esta protección. Para brindar protección a tu sitio y a los usuarios, es muy importante que encuentres y soluciones los problemas de contenido mixto.

Buscar y solucionar problemas de contenido mixto es una tarea importante, pero puede tomar mucho tiempo. En esta guía, se analizan algunas herramientas y técnicas disponibles para facilitar el proceso. Para obtener más información sobre el contenido mixto en sí, consulta [Qué es el contenido mixto](./what-is-mixed-content).

### TL;DR {: .hide-from-toc }

* Siempre usa URL del tipo https:// cuando cargues recursos en tu página.
* Usa el encabezado `Content-Security-Policy-Report-Only` para supervisar los errores de contenido mixto en tu sitio.
* Usa la directiva de CSP `upgrade-insecure-requests` para proteger a los visitantes contra el contenido inseguro.

## Buscar y solucionar problemas de contenido mixto 

Buscar manualmente el contenido mixto puede tomar tiempo, según la cantidad de problemas que haya. El proceso descrito en este documento usa el navegador Chrome. Sin embargo, la mayoría de los navegadores modernos brindan herramientas similares para ayudar durante este proceso.

### Visitar tu sitio para encontrar el contenido mixto

Cuando visitas una página HTTPS en Google Chrome, el navegador te alerta sobre contenido 
mixto con errores y advertencias en la Consola de JavaScript.

Para ver estas alertas, visita nuestra página de muestra de contenido mixto pasivo o contenido mixto activo, y abre la consola de JavaScript de Chrome. Puedes abrir la consola desde el menú View: _View_ -&gt; _Developer_ -&gt; _JavaScript Console_ o haciendo clic con el botón secundario en la página y luego seleccionando _Inspect Element_ y _Console_.

El [ejemplo de contenido mixto pasivo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external} de la página [Qué es el contenido mixto](what-is-mixed-content#passive-mixed-content){: .external} hace que aparezcan advertencias de contenido mixto, como las siguientes:

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure video. This content should also be served over HTTPS.">
</figure>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

A su vez, el ejemplo de contenido mixto activo hace que se muestren los siguientes errores de contenido 
mixto:

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure resource. This request has been blocked; the content must be served over HTTPS.">
</figure>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


Tienes que corregir las URL del tipo http:// que se muestran en estos errores y advertencias, en la fuente de tu sitio. Es útil hacer una lista de estas URL junto con la página en la que las encontraste para usar cuando las corrijas. 

Note: Solo se muestran los errores y las advertencias de contenido mixto de la página que estés viendo, y la consola de JavaScript se borra cada vez que te diriges a otra página. Esto significa que deberás ver cada una de las páginas de tu sitio para encontrar estos errores. Algunos errores solo aparecerán cuando interactúes con parte de la página, consulta el ejemplo de contenido mixto en la galería de imágenes de la guía anterior.

### Encontrar contenido mixto en tu código fuente

Puedes encontrar contenido mixto directamente en tu código fuente. Busca 
`http://` en tu código y encuentra etiquetas en las que se incluyan atributos de URL HTTP.
Busca específicamente las etiquetas que aparecen en la sección [tipos de contenido mixto y amenazas de seguridad asociadas](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external} de nuestra guía anterior.
Ten en cuenta que si aparece `http://` en el atributo href de las etiquetas delimitadoras (`<a>`),
no significa, en general, que haya un problema de contenido mixto. Existen excepciones específicas que analizaremos posteriormente. 

Si tienes una lista de URL HTTP producto de errores y advertencias de contenido mixto en Chrome, 
también puedes buscar estas URL completas en tu código para saber dónde 
se incluyen en tu sitio. 

### Solucionar problemas de contenido mixto

Cuando sepas dónde se incluye el contenido mixto en el código de tu sitio, 
sigue los próximos pasos para solucionarlo.

Uso del siguiente error de contenido mixto en Chrome como ejemplo:

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure image. This content should also be served over HTTPS.">
</figure>

Que encontraste en la fuente aquí:
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### Paso 1

Verifica que la URL esté disponible a través del protocolo HTTPS abriendo una nueva pestaña en 
tu navegador, ingresando la URL en la barra de direcciones y cambiando `http://` por `https://`.

Si el recurso que se muestra es el mismo en **HTTP** y **HTTPS**, significa que todo funciona bien.
Continúa con el [paso 2](#step-2).

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      En HTTP, la imagen se carga sin errores.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      En HTTPS, la imagen se carga sin errores y es igual a la imagen en HTTP. Sigue con el <a href="#step-2">paso 2</a>.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Si ves una advertencia de certificado, o el contenido no se puede mostrar en
**HTTPS**, significa que el recurso no está disponible de forma segura.

<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      El recurso no está disponible a través del protocolo HTTPS
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      Aparece una advertencia de certificado cuando se intenta ver el recurso a través del protocolo HTTPS.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

En este caso, considera alguna de las siguientes opciones:

* Incluye el recurso desde un host distinto si es posible.
* Descarga y aloja el contenido directamente en tu sitio si puedes hacerlo legalmente.
* Quita el recurso de tu sitio.

#### Paso 2

Cambia la URL `http://` por `https://`, guarda el archivo de origen y vuelve a implementar el archivo actualizado si es necesario.

#### Paso 3

Visita la página en la cual encontraste el error y verifica que este haya desaparecido.

### Ten cuidado con el uso no convencional de las etiquetas

Ten cuidado con el uso no convencional de las etiquetas en tu sitio. Por ejemplo, las URL con etiquetas delimitadoras (`<a>`)
no generan contenido mixto por sí solas, ya que se encargan de que el navegador 
visite una página nueva. Por lo general, esto significa que no hace falta corregirlas. Sin embargo, 
algunas secuencias de comandos de la galería de imágenes anulan la funcionalidad de las etiquetas `<a>` y 
cargan el recurso HTTP especificado por el atributo `href` en una ventana lightbox 
en la página, lo cual ocasiona un problema de contenido mixto. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

En el código anterior, dejar el href de las etiquetas `<a>` en `http://` puede parecer una alternativa segura. 
Sin embargo, si visualizas el ejemplo y haces clic en la imagen, verás que a través de él se carga y se muestra en la página 
un recurso de contenido mixto. 

## Trabajar con contenido mixto a escala

Los pasos manuales descritos anteriormente funcionan bien en sitios web pequeños. No obstante, en sitios web más grandes 
o sitios con varios equipos de desarrollo independientes, puede resultar difícil llevar el control 
del contenido que se carga. Para facilitar esta tarea, puedes usar la política de seguridad de 
contenido a fin de indicarle al navegador que te notifique cuando aparezcan contenidos mixtos y 
asegurarte de que tus páginas nunca carguen recursos inseguros de manera inesperada.

### Política de seguridad de contenido

[**La política de seguridad de contenido**](/web/fundamentals/security/csp/) (CSP) es una
función multipropósito del navegador que puedes usar para administrar el contenido mixto a 
escala. El mecanismo de informes de la CSP se puede usar para realizar el seguimiento del contenido mixto de
tu sitio. La política de cumplimiento se puede usar para proteger a los usuarios mediante la actualización o
el bloqueo de contenido mixto. 

Puedes habilitar estas funciones en una página incluyendo el encabezado 
`Content-Security-Policy` o `Content-Security-Policy-Report-Only` en la 
respuesta que envíe tu servidor. Además, puedes establecer la `Content-Security-Policy` (pero 
**no** `Content-Security-Policy-Report-Only`) usando una etiqueta `<meta>` 
en la sección `<head>` de tu página. Consulta los ejemplos de las siguientes 
secciones.

La CSP es útil para muchas cosas fuera de sus usos de contenido mixto. La información sobre otras directivas de la CSP está disponible en los siguientes recursos:

* [Introducción a CSP de Mozilla](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [Introducción a CSP de HTML5 Rocks](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP playground](http://www.cspplayground.com/){: .external }
* [Especificación de la CSP](//www.w3.org/TR/CSP/){: .external }

Note: Los navegadores implementan <b>todas</b> las políticas de seguridad de contenido.
Los diferentes valores del encabezado de CSP que el navegador recibe en el encabezado de respuesta o en los elementos
<code>&lt;meta&gt;</code> se combinan e implementan como una única política.
Asimismo, se combinan las políticas de informes. Para combinar las políticas, se toman las
intersecciones de ellas; es decir, después de la primera, cada política solo
puede restringir más el contenido permitido, no puede ampliarlo.

### Cómo encontrar contenido mixto con la política de seguridad de contenido 

Puedes usar la política de seguridad de contenido para recopilar informes de contenido mixto en tu 
sitio. Para habilitar esta función, agrega y establece la directiva `Content-Security-Policy-Report-Only` como un 
encabezado de respuesta para tu sitio. 

Encabezado de respuesta:  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


Cuando un usuario visita una página de tu sitio, su navegador envía a //example.com/reportingEndpoint` informes en 
formato JSON sobre cualquier elemento que no respete 
`https://example.com/reportingEndpoint`. En este caso, se envía un informe cada vez que se 
carga un subrecurso a través de HTTP. En estos informes se incluye la 
URL de la página donde se produjo el incumplimiento de política y la URL del subrecurso que 
no cumplió con la política. Si configuras el terminal encargado de los informes para que registre estos 
informes, puedes realizar un seguimiento del contenido mixto de tu sitio sin tener que visitar cada 
una de las páginas. 

Para poder hacer esto, se debe tener en cuenta lo siguiente:

* Los usuarios deben visitar tu página con un navegador que interprete el encabezado de CSP.
  La mayoría de los navegadores actuales pueden hacerlo.
* Solo obtendrás informes de las páginas que visiten los usuarios. Por lo tanto, si algunas páginas 
 no reciben mucho tráfico, es posible que no obtengas informes de todo tu sitio por 
 un tiempo.

Para obtener más información sobre el formato del encabezado de CSP, consulta las [especificaciones de la política de seguridad de contenido](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}. 

Si no deseas configurar tú mismo un terminal que se encargue de los informes, 
[https://report-uri.io/](https://report-uri.io/){: .external} es una alternativa 
aceptable.

### Cómo actualizar solicitudes inseguras

Una de las herramientas más nuevas y de mejor calidad que permiten arreglar el contenido mixto automáticamente es la directiva 
[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external} 
de CSP. Esta directiva indica al navegador que actualice las URL inseguras 
antes de realizar solicitudes de red.

A modo de ejemplo, si una página contiene una etiqueta de imagen con una URL HTTP, como la siguiente:

 
    <img src="http://example.com/image.jpg"> 


Como alternativa, el navegador realiza una solicitud segura de 
<code><b>https:</b>//example.com/image.jpg</code>. De esta forma, el usuario evita el contenido 
mixto.

Puedes habilitar este comportamiento enviando un encabezado `Content-Security-Policy` 
con esta directiva:


    Content-Security-Policy: upgrade-insecure-requests  


También puedes hacerlo incorporando esa misma directiva integrada en la sección `<head>` 
del documento con un elemento `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


Vale la pena aclarar que si el recurso no está disponible a través de HTTPS, la 
solicitud actualizada fallará y el recurso no se cargará. Esto permite preservar 
la seguridad de tu página. 

La directiva `upgrade-insecure-requests` se carga en cascada en documentos `<iframe>`, lo cual 
garantiza la protección de toda la página.

### Cómo bloquear todo el contenido mixto

No todos los navegadores admiten la directiva upgrade-insecure-requests. Una 
alternativa para proteger a los usuarios es la directiva 
[**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external}
de CSP. Esta directiva indica al navegador que nunca cargue contenido mixto. 
Se bloquean todas las solicitudes de recursos de contenido mixto, incluidos el contenido mixto activo y 
pasivo. Esta opción también se carga en cascada en documentos `<iframe>`, lo cual 
garantiza que toda la página esté libre de contenido mixto.

Puedes incorporar este comportamiento en una página enviando un encabezado 
`Content-Security-Policy` con esta directiva:

  
    Content-Security-Policy: block-all-mixed-content  


También puedes hacerlo incorporando esa misma directiva integrada en la sección `<head>` 
del documento con un elemento `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


La desventaja más obvia de usar `block-all-mixed-content` es que se bloquea 
todo el contenido. Se trata de una mejora en la seguridad, pero significa que estos 
recursos ya no estarán disponibles en la página. Esto puede dañar funciones y 
contenidos que los usuarios esperan hallar. 

### Alternativas a las CSP

Si una plataforma como Blogger es el host de tu sitio, puede ser que no tengas 
acceso para modificar encabezados y agregar una CSP.
En cambio, una alternativa viable podría ser el uso de un rastreador de sitios web para encontrar los problemas 
en tu sitio, como 
[HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 
o 
[Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external }


{# wf_devsite_translation #}
