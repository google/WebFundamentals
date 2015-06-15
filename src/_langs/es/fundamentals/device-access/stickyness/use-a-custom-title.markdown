---
layout: article
title: "Uso de un título personalizado"
description: "En Internet Explorer y Safari, puede especificar un titulo personalizado, que se utilizará como nombre de la aplicación junto al icono o sobre él."
introduction: "En Internet Explorer y Safari, puede especificar un titulo personalizado, que se utilizará como nombre de la aplicación junto al icono o sobre él."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 4
id: use-a-custom-title
authors:
  - pbakaus
collection: stickyness
notes:
  undocumented:
    - Esta etiqueta no está documentada en Mobile Safari, y se puede cambiar y eliminar en cualquier momento.
---

{% wrap content %}

Agregue este código en su encabezado `<head>`:

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

Los tres navegadores utilizan el atributo `<title>` de forma predeterminada si no hay 
etiquetas adicionales.

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
