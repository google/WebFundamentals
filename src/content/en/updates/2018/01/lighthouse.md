project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New SEO audits and manual accessibility audits, and updates to the WebP audit.

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-05 #}
{# wf_tags: lighthouse,accessibility,images #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New SEO audits and manual accessibility audits, and updates to the WebP audit. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lighthouse 2.7 Updates {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Lighthouse 2.7 is out! Highlights include:

* [New SEO audits](#seo).
* [New, manual accessibility audits](#a11y).
* [Updates to the WebP audit](#webp).

See the [2.7 release notes][RN] for the full list of new features, changes,
and bug fixes.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## How to update to 2.7 {: #update }

* NPM. Run `npm update lighthouse`, or `npm update lighthouse -g` flag if you installed
  Lighthouse globally.
* Chrome Extension. The extension should automatically update, but you can manually update it
  via `chrome://extensions`.
* DevTools. Lighthouse 2.7 is shipping in Chrome 65. You can check what version
  of Chrome you're running via `chrome://version`. Chrome updates to a new version about every
  6 weeks. You can run the latest Chrome code by downloading [Chrome Canary][Canary].

[Canary]: https://www.google.com/chrome/browser/canary.html

## New SEO audits {: #seo }

The new SEO category provides audits that help improve your page's ranking in search engine
results.

Note: Many factors affect a page's search engine ranking. Lighthouse does not test all of these
factors. A perfect 100 score in Lighthouse does not guarantee a top ranking spot on any search
engine!

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

## New, manual accessibility audits {: #a11y }

The new, manual accessibility audits inform you of things you can do to improve the accessibility
of your page. "Manual" here means that Lighthouse can't automate these audits, so you need to
manually test them yourself.

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

## Updates to the WebP audit {: #webp }

Thanks to some [community feedback][feedback], the [WebP audit][webp] is now more inclusive
of other next-generation, high-performance image formats, like JPEG 2000 and JPEG XR.

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
