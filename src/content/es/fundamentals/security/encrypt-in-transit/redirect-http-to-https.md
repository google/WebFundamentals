project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_review_required #}
{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Redireccionamiento de HTTP a HTTPS {: .page-title }

{% include "_shared/contributors/TODO.html" %}



## TL;DR {: .hide-from-toc }
- Debe colocar un vínculo canónico en el encabezado de su página para indicarles a los motores de búsqueda que https es la mejor forma de acceder al sitio.


Configure las etiquetas &lt;link rel="canonical" href="https://…"/&gt; en sus páginas. [Esto
les permite a los motores de búsqueda](https://support.google.com/webmasters/answer/139066?hl=en)
saber cuál es la mejor forma de acceder a su sitio.

La mayoría de los servidores web ofrece una función simple de redireccionamiento. Utilice el código 301 (Movido de forma permanente) para
indicarles a los motores de búsqueda y a los navegadores que la versión HTTPS es canónica y que sus usuarios deben ser redirigidos desde la versión HTTP hacia la versión HTTPS de su sitio.

