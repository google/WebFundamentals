---
layout: article
title: "Use a Custom Title"
description: "Internet Explorer e Safari permitem que você especifique um título personalizado que é utilizado como o nome do aplicativo próximo ou acima do seu ícone."
introduction: "Internet Explorer e Safari permitem que você especifique um título personalizado que é utilizado como o nome do aplicativo próximo ou acima do seu ícone."
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
    - Esta tag não está documentada no Mobile Safari e pode ser alterada e removida a qualquer momento.
---

{% wrap content %}

Adicione este código ao seu cabeçalho `<head>`:

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

Todos os três navegadores usam o atributo `<title>` padrão se as tags adicionais 
não forem encontradas.

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
