project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "La página incluye cierto contenido cuando sus secuencias de comandos no están disponibles".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# La página incluye cierto contenido cuando sus secuencias de comandos no están disponibles  {: .page-title }

## Por qué es importante la auditoría {: #why }

La [mejora progresiva](https://en.wikipedia.org/wiki/Progressive_enhancement)
es una estrategia de desarrollo web que garantiza que tu sitio esté disponible
para la mayor cantidad de público posible. La definición más común de la mejora
progresiva es la siguiente:

El contenido y la funcionalidad básicos de la página deben basarse
solamente en las tecnologías web más fundamentales para garantizar que la página se pueda usar
en todas las condiciones de navegación. Las experiencias mejoradas, como estilos
sofisticados con CSS o interactividad con JavaScript, pueden ocupar el nivel superior en
los navegadores que admiten esas tecnologías. Pero el contenido y la funcionalidad básicos
de la página no deben depender de CSS o JavaScript.

## Cómo aprobar la auditoría {: #how }

La mejora progresiva es un tema amplio y polémico. Un grupo dice que,
para adherir a la estrategia de mejora progresiva, las capas de las páginas se deben
disponer de manera tal que el contenido y la funcionalidad básicos de la página solo necesiten HTML. Consulta
[Mejora progresiva: qué es y cómo usarla](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
para ver un ejemplo de este enfoque.

Otro grupo cree que este enfoque estricto no es viable o es innecesario
para muchas apps web modernas y de gran escala. Por esto, sugiere
usar CSS de ruta de acceso crítica integrada en la propiedad `<head>` del documento para los estilos de páginas completamente esenciales.
Consulta [Ruta de acceso de representación crítica](/web/fundamentals/performance/critical-rendering-path/) para obtener más información sobre este enfoque.

Dadas estas consideraciones, esta auditoría de Lighthouse realiza un control simple que
asegura que tu página no esté en blanco cuando JavaScript está inhabilitado. Cuán rigurosamente tu
app debe adherir a la mejora progresiva es un tema de debate, pero existe
un acuerdo generalizado de que todas las páginas deben mostrar, al menos, *cierta* información
cuando JavaScript está inhabilitado, incluso si el contenido es tan solo una alerta que informa al usuario
que se requiere JavaScript para usar la página.

Para las páginas que sí o sí deben basarse en JavaScript, un enfoque consiste en usar un elemento
[`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
para informar al usuario que se requiere JavaScript para usar la página. Esto es
mejor que una página en blanco, porque la página en blanco no resuelve la incertidumbre del usuario
sobre si el problema se relaciona con la página, el navegador o su
computadora.

Para ver la apariencia de tu sitio y su rendimiento cuando JavaScript está inhabilitado, usa la función para
[inhabilitar
JavaScript](/web/tools/chrome-devtools/settings#disable-js) de Chrome DevTools.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse inhabilita JavaScript en la página y luego inspecciona el código HTML de la página. Si
el código HTML está vacío, no se aprueba la auditoría. Si el código HTML no está vacío, se aprueba la
auditoría.


{# wf_devsite_translation #}
