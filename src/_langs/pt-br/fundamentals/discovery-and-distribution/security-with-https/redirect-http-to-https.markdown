---
layout: article
title: "Redirect HTTP to HTTPS"
description: ""
introduction: ""
id: redirect-http-to-https
collection: security-with-tls
authors:
  - chrispalmer
article:
  written_on: 2015-03-27
  updated_on: 2015-03-27
  order: 5
priority: 0
key-takeaways:
  - Você precisa colocar um link canônico no cabeçalho da sua página para dizer aos mecanismos de pesquisa qual https é a melhor forma de chegar ao seu site.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

Defina tags &lt;link rel="canonical" href="https://…"/&gt; em suas páginas. [Isso
ajuda os mecanismos de pesquisa](https://support.google.com/webmasters/answer/139066?hl=en)
a conhecer a melhor forma de chegar ao seu site.

A maioria dos servidores da Web oferecem um recurso de redirecionamento simples. Use 301 (Movido Permanentemente) para
indicar aos mecanismos de pesquisa e navegadores que a versão HTTPS é canônica e redirecione seus usuários para a versão HTTPS do seu site de HTTP.

{% endwrap %}
