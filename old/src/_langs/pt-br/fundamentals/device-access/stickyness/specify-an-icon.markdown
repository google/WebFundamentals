---
layout: article
title: "Specify an Icon"
description: "Para que seu site se destaque, certifique-se de fornecer um ícone grande e bonito. Caso contrário, o favicon ou uma captura de tela de baixa qualidade pode ser usada."
introduction: "Para que seu site se destaque, certifique-se de fornecer um ícone grande e bonito. Caso contrário, o favicon ou uma captura de tela de baixa qualidade pode ser usada."
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
  <img src="images/icons.png" alt="Personalizando ícones por plataforma" />
  <figcaption>Adicionar ícones personalizados é uma forma de se destacar.</figcaption>
</figure>


Adicione o seguinte código ao seu `<head>` para adicionar um ícone personalizado ao Safari, 
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

Neste exemplo, o Opera usa o icon.png, que é 
dimensionado para o tamanho necessário pelo dispositivo. O Safari usa a 
tag `<link>` com o atributo `rel`: `apple-touch-icon`.

A nova experiência de tela inicial do Windows 8 suporta quatro layouts diferentes para 
sites fixos e requer quatro ícones. Você pode deixar as meta 
tags relevantes de fora se não desejar o suporte a um tamanho específico.

Você pode especificar [tamanhos exatos](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) fornecendo uma tag de link separada 
para cada ícone, evitando que o OS redimensione o ícone:

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
