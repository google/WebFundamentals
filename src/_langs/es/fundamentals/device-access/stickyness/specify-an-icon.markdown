---
layout: article
title: "Especificación de un icono"
description: "Para que su sitio se destaque, asegúrese de proporcionar un icono vistoso y de tamaño completo; de lo contrario, se utilizará el icono de favoritos o una captura de pantalla de baja calidad."
introduction: "Para que su sitio se destaque, asegúrese de proporcionar un icono vistoso y de tamaño completo; de lo contrario, se utilizará el icono de favoritos o una captura de pantalla de baja calidad."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 3
id: specify-an-icon
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

<figure>
  <img src="images/icons.png" alt="Personalización de iconos según la plataforma" />
  <figcaption>Agregar iconos personalizados es una forma simple de destacarse.</figcaption>
</figure>


Agregue el siguiente código a su `<head>` para añadir un icono personalizado en Safari, 
Opera e Internet Explorer:

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="228x228" href="icon.png">
<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="ios-icon.png">
<!-- multiple icons for IE -->
<meta name="msapplication-square70x70logo" content="icon\_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon\_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon\_widetile.png">
<meta name="msapplication-square310x310logo" content="icon\_largetile.png">
{% endhighlight %}

En este ejemplo, Opera utiliza el archivo icon.png, cuyo tamaño 
fue ajustado por el dispositivo. En Safari, se utiliza la etiqueta 
`<link>` con el atributo`rel`: `apple-touch-icon`.

En la nueva experiencia de pantalla de inicio de Windows 8, se presentan cuatro diseños diferentes para los 
sitios anclados y se deben utilizar cuatro iconos. Si no desea admitir un tamaño específico, puede omitir las etiquetas META 
relevantes.

Para especificar [tamaños explícitos](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27), proporcione una etiqueta de vínculo por separado 
para cada icono. De este modo, el SO no tendrá que cambiar el tamaño del icono:

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
