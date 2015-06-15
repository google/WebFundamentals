---
layout: article
title: "Hide the Browser UI"
description: "Seus usuários podem adicionar seu site à tela inicial sem qualquer código especial, mas recomendamos que você crie sua tela de aplicativo da Web sem a interface do usuário do navegador quando acessado pela tela inicial (ficando efetivamente em tela cheia)."
introduction: "Seus usuários podem adicionar seu site à tela inicial sem qualquer código especial, mas recomendamos que você crie sua tela de aplicativo da Web sem a interface do usuário do navegador quando acessado pela tela inicial (ficando efetivamente em tela cheia)."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

Adicione o código a seguir ao `<head>` de sua página:

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


Isso diz ao Mobile Safari que ele está lidando 
com um aplicativo da Web.

O Internet Explorer não exige instruções para isso, pois os 
sites acessam a tela inicial por padrão

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>Iniciando um site com uma meta tag habilitada para aplicativo da Web</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
