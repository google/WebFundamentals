---
title: "Crear el contenido y la estructura"
description: "El contenido es lo más importante de cualquier sitio. En esta guía, te indicaremos cómo planear rápidamente la creación de un sitio multidispositivo."
notes:
  styling:
    - Estilo vendrá después
updated_on: 2014-04-23
translators:
related-guides:
  create-amazing-forms:
    -
      title: Crear formularios eficaces
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Formularios"
        href: fundamentals/input/form/
    -
      title: Etiquetar y asignar nombres a las entradas de datos correctamente
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Formularios"
        href: fundamentals/input/form/
    -
      title: Elegir el mejor tipo de entrada de datos
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Formularios"
        href: fundamentals/input/form/
  video:
    -
      title: Usar vídeos de forma eficaz
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
    -
      title: Cambiar la posición de inicio
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
    -
      title: Incluir un póster
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
  images:
    -
      title: Usar imágenes de forma eficaz
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Imágenes"
        href: fundamentals/media/
    -
      title:  Uso correcto de imágenes en el lenguaje de marcado
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Imágenes"
        href: fundamentals/media/
    -
      title: Optimización de imágenes
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Imágenes"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - Piensa primero en el contenido que necesitas.
    - Esboza la arquitectura de información (AI) para ventanas gráficas estrechas y anchas.
    - Crea una versión básica de la página sin aplicar estilos al contenido.
---

<p class="intro">
  El contenido es lo más importante de cualquier sitio. Por eso, vamos a diseñar pensando en el contenido sin dejar que este dependa del diseño. En esta guía decidiremos en primer lugar el contenido que necesitamos, crearemos una estructura de página basada en este contenido y, a continuación, presentaremos la página en un diseño simple y lineal que funcione bien en ventanas gráficas estrechas y anchas.
</p>

{% include shared/toc.liquid %}

## Crear la estructura de la página

Ya sabemos lo que necesitamos:

1.  Una sección que describa de forma general nuestro producto, el curso `CS256: Desarrollo web para móviles`
2.  Un formulario para recopilar información de los usuarios interesados en nuestro producto
3.  Una descripción y un vídeo en los que se explique el producto detalladamente
4.  Imágenes del producto en acción
5.  Una tabla de datos con información que refleje lo que ofrece el producto

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Además, ya hemos pensando en una arquitectura de información y en un diseño generales tanto para las ventanas gráficas estrechas como para las anchas.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="AI para ventanas gráficas estrechas">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="AI para ventanas gráficas anchas">
</div>

Esta podría ser perfectamente la estructura básica de la página que usaremos durante el proyecto.

{% include_code src=_code/addstructure.html snippet=structure %}

## Añadir contenido a la página

Ya hemos acabado con la estructura básica del sitio. Ya sabemos qué secciones necesitamos, qué contenido se mostrará en estas secciones y en qué lugar de la arquitectura de información general colocarlo. Ha llegado el momento de crear el sitio.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Crear el título y el formulario

El título y el formulario de notificación de solicitudes son componentes esenciales de nuestra página. El usuario debería verlos de forma inmediata.

En el título, basta con añadir un texto que describa el curso:

{% include_code src=_code/addheadline.html snippet=headline %}

También debemos rellenar el formulario.
Se trata de un formulario simple que recopila los nombres de los usuarios, sus números de teléfono y la hora ideal para llamarlos.

Todos los formularios deberían contener etiquetas y marcadores de posición para facilitar que los usuarios se centren en determinados elementos, para que sepan lo que deben escribir en ellos y para que las herramientas de accesibilidad interpreten la estructura del formulario.  El atributo de nombre no solo envía el valor del formulario al servidor, sino que también se usa para dar indicaciones importantes al navegador sobre cómo rellenar automáticamente el formulario para el usuario.

Añadiremos tipos semánticos para que los usuarios puedan introducir contenido en un dispositivo móvil de forma rápida y sencilla.  Por ejemplo, al introducir un número de teléfono, el usuario debería ver un panel con números.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Crear una sección con vídeos e información

La sección de contenido con vídeos e información debe contener más detalles.
Tendrá una lista de viñetas con las características de nuestros productos, además de un marcador de posición en formato de vídeo que muestre cómo se usa nuestro producto.

{% include_code src=_code/addcontent.html snippet=section1 %}

Los vídeos suelen usarse para describir contenido de manera más interactiva y presentar un producto o un concepto.

Es posible integrar vídeo en tu sitio siguiendo las recomendaciones siguientes:

*  Añade un atributo `controls` para facilitar a los usuarios la reproducción del vídeo.
*  Añade una imagen `poster` para ofrecer una vista previa del contenido.
*  Añade varios elementos <source> basados en formatos de vídeo compatibles.
*  Añade texto de respaldo para que los usuarios puedan descargar el vídeo si no pudieran reproducirlo en la ventana.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Crear la sección de imágenes

Los sitios sin imágenes pueden resultar aburridos. Hay dos tipos de imágenes:

*  Imágenes de contenido: imágenes que se muestran junto al contenido del documento para presentar información adicional relacionada con el contenido.
*  Imágenes con fines estéticos: imágenes que se usan para mejorar el aspecto del sitio; suelen ser imágenes de fondo, patrones y gradientes.  Trataremos este tema en el [artículo siguiente]({{page.nextPage.relative_url}}).

La sección de imágenes de nuestra página es una colección de imágenes de contenido.

Estas imágenes son importantes para darle significado a la página; son como las imágenes de los artículos de un periódico. Las imágenes que usamos son imágenes de los tutores del proyecto: Chris Wilson, Peter Lubbers y Sean Bennet.

{% include_code src=_code/addimages.html snippet=images lang=html %}

Las imágenes están configuradas para ajustar su tamaño al 100% del ancho de la pantalla. Esto es ideal en dispositivos con una ventana gráfica estrecha, y no tanto en aquellos con ventana gráfica ancha (como un ordenador).  Veremos este tema en la sección de diseño adaptable.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Hay muchos usuarios que no pueden ver imágenes y usan tecnologías de apoyo como lectores de pantalla que procesan los datos de la página y leérselos al usuario.  Deberías asegurarte de que todas las imágenes de contenido tengan una etiqueta `alt` descriptiva para que el lector de pantalla pueda leer el texto de la etiqueta al usuario.

Cuando añadas etiquetas `alt`, procura que el texto describa la imagen de la forma más concisa y completa posible.  Por ejemplo, en nuestra demostración, solo damos el siguiente formato al atributo: `Nombre: Rol`. De este modo, incluimos suficiente información para dejar claro que esta sección incluye información sobre los autores y su trabajo.

### Añadir la sección de datos tabulados

La última sección no es más que una tabla que refleja estadísticas específicas del producto.

Las tablas solo deben usarse para incluir datos tabulados, como matrices de información.

{% include_code src=_code/addcontent.html snippet=section3 %}

### Añadir un pie de página

En la mayoría de los sitios es necesario un pie de página para incluir los términos y condiciones del servicio, texto legal y otro contenido que no deba estar en el área de navegación principal ni en el área de contenido principal de la página.

En nuestro sitio, solo enlazaremos a los términos y condiciones, a una página de contacto y a nuestros perfiles en los medios sociales.

{% include_code src=_code/addcontent.html snippet=footer %}

## Resumen

Hemos creado un borrador del sitio y hemos identificado los elementos principales de su estructura.  Además, nos hemos asegurado de redactar todo el contenido relevante y de colocarlo en el lugar que más se adecúe a nuestros objetivos comerciales.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Contenido">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Verás que la página ahora mismo tiene un aspecto horrible. Lo hemos hecho a propósito. 
El contenido es el aspecto más importante de cualquier sitio, y debíamos asegurarnos de contar con una arquitectura de información completa y abundante. Esta guía nos ha proporcionado los cimientos necesarios para crear nuestro sitio. Aplicaremos estilos a nuestro contenido en la siguiente guía.



