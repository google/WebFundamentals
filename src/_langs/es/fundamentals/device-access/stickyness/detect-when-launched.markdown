---
layout: article
title: "Detección de ejecución desde la pantalla de inicio"
description: "A veces, es útil saber si la aplicación se inicia desde la pantalla de inicio o desde el navegador web."
introduction: "A veces, es útil saber si la aplicación se inicia desde la pantalla de inicio o desde el navegador web."
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

A veces, es útil saber si la aplicación se inicia desde la pantalla de inicio
o desde el navegador web. Para demostrar un caso de uso, tal vez deba mostrar un 
estandarte en el que se sugiera que la aplicación se instale en la pantalla de inicio del usuario cuando llegue desde el
navegador, pero que se oculte cuando finalice la instalación.

En Mobile Safari, si realiza una consulta por medio de `window.navigator.standalone`, podrá saber si
su aplicación se está ejecutando como un icono de la pantalla de inicio o simplemente en el navegador. En Internet
Explorer, podrá averiguar lo mismo si realiza una consulta mediante
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx). A continuación, se muestra una comprobación combinada:

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

Desafortunadamente, no es posible detectar lo mismo en Chrome para Android.

{% include modules/nextarticle.liquid %}

{% endwrap %}