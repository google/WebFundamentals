---
title: "Redireccionamiento de HTTP a HTTPS"
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Debe colocar un vínculo canónico en el encabezado de su página para indicarles a los motores de búsqueda que https es la mejor forma de acceder al sitio."
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

Configure las etiquetas &lt;link rel="canonical" href="https://…"/&gt; en sus páginas. [Esto
les permite a los motores de búsqueda](https://support.google.com/webmasters/answer/139066?hl=en)
saber cuál es la mejor forma de acceder a su sitio.

La mayoría de los servidores web ofrece una función simple de redireccionamiento. Utilice el código 301 (Movido de forma permanente) para
indicarles a los motores de búsqueda y a los navegadores que la versión HTTPS es canónica y que sus usuarios deben ser redirigidos desde la versión HTTP hacia la versión HTTPS de su sitio.

