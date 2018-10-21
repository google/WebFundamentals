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

# Phare 2.7 Mises à jour {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Phare 2.7 est sorti! Les points forts incluent:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

Voir [2.7 release notes][RN] pour la liste complète des nouvelles fonctionnalités, modifications et corrections de bugs.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Mise à jour vers 2.7 {: #update }

* NPM. Exécutez `npm update lighthouse` ou l&#39;indicateur `npm update lighthouse -g` si vous avez installé Lighthouse globalement.
* Extension Chrome. L&#39;extension doit être mise à jour automatiquement, mais vous pouvez la mettre à jour manuellement via `chrome://extensions` .
* DevTools. Lighthouse 2.7 est livré dans Chrome 65. Vous pouvez vérifier quelle version de Chrome vous utilisez via `chrome://version` . Chrome met à jour une nouvelle version toutes les 6 semaines environ. Vous pouvez exécuter le dernier code Chrome en téléchargeant [Chrome Canary][Canary] .

[Canary]: https://www.google.com/chrome/browser/canary.html

## Nouveaux audits de référencement {: #seo }

La nouvelle catégorie SEO propose des audits qui aident à améliorer le classement de votre page dans les résultats des moteurs de recherche.

Note: nombreux facteurs affectent le classement du moteur de recherche d&#39;une page. Phare ne teste pas tous ces facteurs. Un score parfait de 100 dans Lighthouse ne garantit pas une place de premier rang sur les moteurs de recherche!

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

## Nouveaux audits d’accessibilité manuels {: #a11y }

Les nouvelles vérifications manuelles de l&#39;accessibilité vous informent des choses que vous pouvez faire pour améliorer l&#39;accessibilité de votre page. &quot;Manuel&quot; signifie ici que Lighthouse ne peut pas automatiser ces audits. Vous devez donc les tester manuellement.

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

## Mises à jour de l&#39;audit WebP {: #webp }

Grâce à certains [community feedback][feedback] , le [WebP audit][webp] désormais d’autres formats d’image hautes performances de nouvelle génération, tels que JPEG 2000 et JPEG XR.

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