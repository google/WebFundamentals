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

# 2.7 Обновления {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Маяк 2.7 отсутствует! Основные моменты:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

См. [2.7 release notes][RN] для получения полного списка новых функций, изменений и исправлений ошибок.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Как обновить до 2.7 {: #update }

* NPM. Запустите `npm update lighthouse` или `npm update lighthouse -g` если вы установили Lighthouse глобально.
* Расширение Chrome. Расширение должно автоматически обновляться, но вы можете вручную обновить его через `chrome://extensions` .
* DevTools. Lighthouse 2.7 поставляется в Chrome 65. Вы можете проверить, какую версию Chrome вы используете через `chrome://version` . Обновление Chrome до новой версии происходит каждые 6 недель. Вы можете запустить последний код Chrome, загрузив [Chrome Canary][Canary] .

[Canary]: https://www.google.com/chrome/browser/canary.html

## Новые аудит SEO {: #seo }

Новая категория SEO предоставляет аудиты, которые помогают улучшить рейтинг вашей страницы в результатах поисковой системы.

Note: Многие факторы влияют на ранжирование поисковой системы страницы. Маяк не проверяет все эти факторы. Совершенный 100 очков в Маяке не гарантирует место в рейтинге в любой поисковой системе!

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

## Новые, ручные проверки доступности {: #a11y }

Новые проверочные проверки доступности вручную информируют вас о том, что вы можете сделать, чтобы улучшить доступность вашей страницы. «Руководство» означает, что «Маяк» не может автоматизировать эти проверки, поэтому вам нужно вручную их протестировать самостоятельно.

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

## Обновления для аудита WebP. {: #webp }

Благодаря некоторому [community feedback][feedback] , [WebP audit][webp] теперь больше включает в себя другие форматы изображений нового поколения следующего поколения, такие как JPEG 2000 и JPEG XR.

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