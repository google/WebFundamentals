project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio abre anclajes externos mediante rel="noopener"".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# El sitio abre anclajes externos mediante rel="noopener"  {: .page-title }

## Por qué es importante la auditoría {: #why }

Cuando tu página tiene un vínculo a otra página mediante `target="_blank"`, la página nueva
se ejecuta en el mismo proceso que tu página. Si la página nueva ejecuta
JavaScript pesado, el rendimiento de tu página también puede verse afectado.

Además, `target="_blank"` también es una vulnerabilidad de la seguridad. La página nueva
tiene acceso a tu objeto window por medio de `window.opener` y puede trasladar la página
a otra URL usando `window.opener.location = newURL`.

Consulta [Beneficios de rendimiento de rel=noopener][jake] para obtener más información.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## Cómo aprobar la auditoría {: #how }

Agrega `rel="noopener"` a cada uno de los vínculos que Lighthouse identificó en tu
informe. Como regla general, siempre agrega `rel="noopener"` cuando abras un vínculo externo
en una ventana o pestaña nuevas.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse usa el siguiente algoritmo para marcar los vínculos como candidatos para `rel="noopener"`:


1. Junta todos los nodos `<a>` que contienen el atributo `target="_blank"`, pero que no
   contienen el atributo `rel="noopener"`.
1. Filtra los vínculos del mismo host.

Como Lighthouse filtra los vínculos del mismo host, existe un caso límite
que tendrías que conocer si estás trabajando en un sitio grande. Si tu página abre
un vínculo a otra sección de tu sitio sin usar `rel="noopener"`, también se aplican las
implicancias de rendimiento de esta auditoría. Sin embargo, no verás estos
vínculos en los resultados de Lighthouse.


{# wf_devsite_translation #}
