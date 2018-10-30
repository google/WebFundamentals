project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New SEO audits and manual accessibility audits, and updates to the WebP audit.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-10-30 #}
{# wf_published_on: 2018-01-05 #}
{# wf_tags: lighthouse,accessibility,images #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New SEO audits and manual accessibility audits, and updates to the WebP audit. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# ライトハウス2.7更新 {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Lighthouse 2.7が出ました！ハイライトは次のとおりです:

* [New SEO audits](#seo) 。
* [New, manual accessibility audits](#a11y) 。
* [Updates to the WebP audit](#webp) 。

新機能、変更、およびバグ修正の完全なリストについては、 [2.7 release notes][RN]を参照してください。

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## 2.7 {: #update }に更新する方法

* NPM。ファイル名を指定して実行`npm update lighthouse` 、または`npm update lighthouse -g`あなたが世界的に灯台を設置した場合のフラグ。
* Chrome拡張機能。拡張機能は自動的に更新されますが、 `chrome://extensions`経由で手動で更新することができます。
* DevTools。 Lighthouse 2.7はChrome 65に`chrome://version`ます`chrome://version`を使用して実行しているChromeのバージョンを確認できます。 Chromeは6週間ごとに新しいバージョンに更新されます。 [Chrome Canary][Canary]をダウンロードすると、最新のChromeコードを実行できます。

[Canary]: https://www.google.com/chrome/browser/canary.html

## 新しいSEO監査{: #seo }

新しいSEOカテゴリでは、検索エンジンの検索結果でページのランキングを向上させるための監査が提供されます。

Note:多くの要因がページの検索エンジンランキングに影響します。灯台はこれらの要因のすべてをテストしません。 Lighthouseで完璧な100点を獲得しても、どの検索エンジンでも一流のスポットが保証されるわけではありません！

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

## 新しい手動によるアクセシビリティ監査{: #a11y }

新しい手動アクセシビリティ監査では、ページのアクセシビリティを向上させるためにできることを通知します。 「手動」とは、Lighthouseがこれらの監査を自動化できないことを意味します。手動で手動でテストする必要があります。

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

## WEBP監査への更新{: #webp }

いくつかの[community feedback][feedback]おかげで、 [WebP audit][webp]は、JPEG2000やJPEG XRのような次世代の高性能画像フォーマットをより包括しています。

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
