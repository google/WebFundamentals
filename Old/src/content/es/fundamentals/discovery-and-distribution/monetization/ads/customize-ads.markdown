---
title: "Personalizar los anuncios"
description: "Los mejores anuncios pueden mejorar la experiencia del usuario. Aunque realmente el contenido del anuncio depende de los anunciantes, puedes controlar el tipo de contenido, el color, el tamaño y la posición de estos anuncios."
updated_on: 2014-08-12
key-takeaways:
  tldr:
    - "Nunca coloques anuncios donde puedan interferir con la experiencia que deseas para el usuario en tu sitio. Procura que los anuncios de la mitad superior de la página no dejen el contenido importante debajo."
    - "Usa siempre bloques de anuncios adaptables. Si la función de tamaño óptimo no es suficiente, cambia al modo avanzado."
    - "Busca oportunidades para integrar anuncios en el contenido y, así, evitar que estos pasen desapercibidos."
    - "Elige estilos de texto que encajen y hagan contraste con el sitio, y que además lo complementen."
notes:
  targeting:
    - "Los anuncios se segmentan en función del contenido general del sitio, no de las palabras clave ni de las categorías. Si quieres mostrar anuncios relacionados con determinados temas, incluye oraciones y párrafos completos sobre estos temas."
  testing:
    - "Prueba siempre tus anuncios en diferentes dispositivos y pantallas para asegurarte de que el diseño adaptable funcione correctamente."
  images:
    - "Los anunciantes tienen control total sobre el aspecto de los anuncios de display. Puedes influir en el tipo de anuncios de display que aparecen en el sitio mediante las opciones de ubicación y de tamaño, pero tienes ningún control sobre el contenido de la imagen."
---

<p class="intro">
  Los mejores anuncios pueden mejorar la experiencia del usuario. Aunque realmente el contenido del anuncio depende de los anunciantes, puedes controlar el tipo de contenido, el color, el tamaño y la posición de estos anuncios.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Colocar anuncios en los lugares más convenientes para el usuario

Cuando se trata de decidir dónde colocar los anuncios en tu sitio
y cúantos colocarás, piensa siempre en el usuario.

* Usa anuncios que complementen el contenido del sitio; y no hagas lo contrario.
* Las páginas con demasiados anuncios, con anuncios que dejan contenido importante en la mitad inferior, con anuncios muy juntos que ocupan el espacio visible o con anuncios sin etiquetas claras son menos satisfactorias para los usuarios y van en contra de las políticas de AdSense.
* Procura que los anuncios ofrezcan valor a los usuarios. Si tienes bloques de anuncios que generen significativamente menos ingresos, o menos clics o visitas, es probable que no ofrezcan valor a los usuarios.

Ejemplo de opciones de ubicación para anuncios para móviles:

<img src="images/mobile_ads_placement.png" class="center" alt="Ejemplo de anuncio de imagen estático para móviles">

Para obtener más información, consulta las
[prácticas recomendadas para la ubicación de anuncios] (https://support.google.com/adsense/answer/1282097) de AdSense.


## ¿Qué sucede cuando un tamaño adaptable no es suficiente?
En algunos casos, es posible que necesites un mayor control sobre la visualización de los anuncios y que no baste con usar anuncios adaptables.  En este caso, puedes cambiar al modo avanzado y sobrescribir el tamaño óptimo en el código de tus bloques de anuncios adaptables.
Por ejemplo, puedes controlar el tamaño exacto de los anuncios usando [consultas de medios]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html):

1. Sigue las instrucciones para [crear un bloque de anuncios adaptable]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. En el cuadro del código del anuncio, selecciona <strong>Avanzado (se debe modificar el código)</strong> en el menú desplegable "Modo".
3. Modifica el código del anuncio para configurar los tamaños exactos de los anuncios en función del dispositivo del usuario:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Pruébalo
{% endlink_sample %}

Consulta las [funciones avanzadas](https://support.google.com/adsense/answer/3543893) en el Centro de ayuda de AdSense para obtener más información.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Elegir estilos que complementen el sitio

Los [anuncios más eficaces](https://support.google.com/adsense/answer/17957) encajan o hacen contraste con los estilos del sitio. Google AdSense proporciona un conjunto de [estilos de anuncio predefinidos](https://support.google.com/adsense/answer/6002585); elige el estilo que mejor se adapte a tu sitio o crea tu propio estilo.

### Elementos personalizables

Puede personalizar cualquiera de los siguientes estilos en los anuncios de texto:

* Color del borde
* Color del fondo
* Familia de la fuente de texto y tamaño de la fuente
* Color predeterminado del texto
* Color del texto del título del anuncio
* Color del texto de las URL

### Cómo aplicar estilos

Cuando crees un bloque de anuncios, puedes aplicar un estilo distinto a los anuncios de texto expandiendo la propiedad de <strong>estilo del anuncio de texto</strong>:

<img src="images/customize.png" class="center" alt="Estilos de los anuncios de texto">

Todos los anuncios de texto usan el estilo <strong>predeterminado</strong> de Google AdSense.  Puedes usar cualquiera de los estilos predefinidos tal cual, modificarlos ligeramente o crear tu propio estilo personalizado.

Una vez guardado el nuevo estilo, puedes aplicarlo a cualquiera de los bloques de anuncios existentes
o nuevos:

1. Dirígete a [Estilos de anuncio](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Selecciona el estilo de anuncio que quieras modificar en la lista de <strong>estilos de anuncio disponibles para todos los productos activos</strong>.
3. Realiza los cambios correspondientes y <strong>guarda el estilo del anuncio</strong>.

Cuando cambias un estilo de anuncio existente, cualquier bloque de anuncios activo que use ese estilo se actualiza automáticamente.

{% include shared/remember.liquid title="Note" list=page.notes.images %}
