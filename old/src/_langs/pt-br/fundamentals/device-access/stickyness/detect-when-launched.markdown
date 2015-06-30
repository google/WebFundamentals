---
layout: article
title: "Detect When Launched From The Home Screen"
description: "Algumas vezes é útil saber se o aplicativo é lançado a partir da tela inicial ou do navegador da Web."
introduction: "Algumas vezes é útil saber se o aplicativo é lançado a partir da tela inicial ou do navegador da Web."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

Algumas vezes é útil saber se o aplicativo é lançado a partir da tela inicial
ou do navegador da Web. Para demonstrar um caso de uso, talvez você deseje mostrar um 
banner sugerindo a instalação do aplicativo na tela inicial do usuário quando ele vier
do navegador, mas ocultá-lo depois de instalado.

No Mobile Safari, consultar o `window.navigator.standalone` dirá se o
seu aplicativo está sendo executado como ícone da tela inicial ou apenas no navegador. No Internet
Explorer, você pode obter o mesmo consultando
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx). Esta é uma verificação combinada:

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

Infelizmente, não é possível detectar o mesmo no Chrome para Android.

{% include modules/nextarticle.liquid %}

{% endwrap %}
