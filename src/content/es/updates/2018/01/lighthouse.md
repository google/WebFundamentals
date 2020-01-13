project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New SEO audits and manual accessibility audits, and updates to the WebP audit.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-05 #}
{# wf_tags: lighthouse,accessibility,images #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New SEO audits and manual accessibility audits, and updates to the WebP audit. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lighthouse 2.7 Actualiza {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

¡El faro 2.7 está fuera! Destacados incluyen:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

Consulte [2.7 release notes][RN] para obtener la lista completa de nuevas funciones, cambios y correcciones de errores.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Cómo actualizar a 2.7 {: #update }

* NPM. Ejecute el `npm update lighthouse` o `npm update lighthouse -g` si instaló Lighthouse globalmente.
* Extensión de Chrome. La extensión debería actualizarse automáticamente, pero puede actualizarla manualmente a través de `chrome://extensions` .
* DevTools. Lighthouse 2.7 se está enviando en Chrome 65. Puedes verificar qué versión de Chrome estás `chrome://version` través de `chrome://version` . Chrome se actualiza a una nueva versión cada 6 semanas aproximadamente. Puedes ejecutar el último código de Chrome descargando [Chrome Canary][Canary] .

[Canary]: https://www.google.com/chrome/browser/canary.html

## Nuevas auditorías de SEO {: #seo }

La nueva categoría SEO proporciona auditorías que ayudan a mejorar la clasificación de su página en los resultados de los motores de búsqueda.

Note: muchos factores afectan el ranking del motor de búsqueda de una página. El faro no prueba todos estos factores. ¡Una puntuación perfecta de 100 en Lighthouse no garantiza un puesto de primer nivel en ningún motor de búsqueda!

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category. New audits include: Document uses legible font sizes,
            Has a meta viewport tag with width or initial-scale attribute,
            Document has a title element, Document has a meta description, Page has
            successful HTTP code, Links have descriptive text, Page isn't blocked from indexing,
            and Document has a valid hreflang."/>
  <figcaption>
    <b>Figure 1</b>. The new <b>SEO</b> category
  </figcaption>
</figure>

## Nuevo, auditorías de accesibilidad manual {: #a11y }

Las nuevas auditorías de accesibilidad manual le informan sobre lo que puede hacer para mejorar la accesibilidad de su página. &quot;Manual&quot; aquí significa que Lighthouse no puede automatizar estas auditorías, por lo que debe probarlas manualmente.

<figure>
  <img src="/web/updates/images/2018/01/a11y.png"
       alt="The new, manual accessibility audits, which includes: The page has a logical tab order,
            Interactive controls are keyboard focusable, The user's focus is directed to new
            content added to the page, User focus is not accidentally trapped in a region,
            Custom controls have associated labels, Custom controls have ARIA roles, Visual order
            on the page follows DOM order, Offscreen content is hidden from assistive technology,
            Headings don't skip levels, and HTML5 landmark elements are used to improve
            navigation."/>
  <figcaption>
    <b>Figure 2</b>. The new, manual <b>Accessibility</b> audits
  </figcaption>
</figure>

## Actualizaciones a la auditoría WebP {: #webp }

Gracias a algunos [community feedback][feedback] , [WebP audit][webp] ahora incluye más formatos de imagen de última generación y alto rendimiento, como JPEG 2000 y JPEG XR.

[feedback]: https://www.reddit.com/r/webdev/comments/75w7t0/so_exactly_what_do_i_do_google_put_my_css_in_js/doatllq/
[webp]: /web/tools/lighthouse/audits/webp

<figure>
  <img src="/web/updates/images/2018/01/webp.png"
       alt="The new WebP audit."/>
  <figcaption>
    <b>Figure 3</b>. The new WebP audit
  </figcaption>
</figure>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}