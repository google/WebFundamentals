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

# Lighthouse 2.7 {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Leuchtturm 2.7 ist out! Höhepunkte umfassen:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

[2.7 release notes][RN] vollständige Liste der neuen Funktionen, Änderungen und Fehlerbehebungen finden Sie in WORDS0.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Wie man auf 2.7 {: #update }

* NPM. Führen Sie `npm update lighthouse` oder `npm update lighthouse -g` wenn Sie Lighthouse global installiert haben.
* Chrome-Erweiterung. Die Erweiterung sollte automatisch aktualisiert werden, Sie können sie jedoch manuell über `chrome://extensions` .
* DevTools. Lighthouse 2.7 wird in Chrome 65 ausgeliefert. Sie können überprüfen, welche Version von Chrome Sie über `chrome://version` . Chrome aktualisiert alle sechs Wochen eine neue Version. Sie können den neuesten Chrome-Code ausführen, indem Sie [Chrome Canary][Canary] herunterladen.

[Canary]: https://www.google.com/chrome/browser/canary.html

## Neue SEO Audits {: #seo }

Die neue SEO-Kategorie bietet Audits, die dazu beitragen, das Ranking Ihrer Seite in Suchmaschinenergebnissen zu verbessern.

Note: Viele Faktoren beeinflussen das Suchmaschinen-Ranking einer Seite. Lighthouse testet nicht alle diese Faktoren. Ein perfektes Ergebnis von 100 Punkten in Lighthouse garantiert keinen Top-Platz in irgendeiner Suchmaschine!

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

## Neue, manuelle Zugänglichkeitsüberprüfungen {: #a11y }

Die neuen manuellen Barrierefreiheitsprüfungen informieren Sie darüber, was Sie tun können, um die Barrierefreiheit Ihrer Seite zu verbessern. &quot;Manuell&quot; bedeutet hier, dass Lighthouse diese Audits nicht automatisieren kann. Sie müssen sie daher manuell testen.

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

## Updates für das WebP-Audit {: #webp }

Dank einiger [community feedback][feedback] ist die [WebP audit][webp] jetzt stärker auf andere Hochleistungsbildformate der nächsten Generation wie JPEG 2000 und JPEG XR abgestimmt.

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