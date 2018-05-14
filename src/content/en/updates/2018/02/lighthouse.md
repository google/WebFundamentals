project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New perf and SEO audits, perf as the first section in reports, and more.

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-02-09 #}
{# wf_tags: lighthouse #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New perf and SEO audits, perf as the first section in reports, and more. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lighthouse 2.8 Updates {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/paulirish.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[Lighthouse](/web/tools/lighthouse) 2.8 is out! Highlights include:

* [New Performance and SEO audits](#audits)
* [Performance as the first section of Lighthouse report](#report)
* [Updated Accessibility scoring](#a11y)
* [New loading message and fast facts](#message)
* [New Lighthouse release guide](#release)

See the [2.8 release notes][RN]{:.external} for the full list of new features, changes, and bug
fixes.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.8.0

## How to update to 2.8 {: #update }

* NPM. Run `npm update lighthouse`, or `npm update lighthouse -g` flag if you installed
  Lighthouse globally.
* Chrome Extension. The extension should automatically update, but you can manually update it
  via `chrome://extensions`.
* DevTools. The Audits panel will be shipping with 2.8 in Chrome 65. You can check what version
  of Chrome you're running via `chrome://version`. Chrome updates to a new version about every
  6 weeks. You can run the latest Chrome code by downloading [Chrome Canary][Canary].

[Canary]: https://www.google.com/chrome/browser/canary.html

## New Performance and SEO audits {: #audits }

The **Avoid Plugins** audit lists plugins that you should remove, since plugins prevent the
page from being mobile-friendly. Most mobile devices don't support plugins.

<figure>
  <img src="/web/updates/images/2018/02/plugins.png"
       alt="The Avoid Plugins audit."/>
  <figcaption>
    <b>Figure 1</b>. The <b>Avoid Plugins</b audit
  </figcaption>
</figure>

The **Document Has A Valid rel=canonical** audit in the SEO category checks for a
`rel=canonical` URL to make sure that a crawler knows which URL to show in search results.

<figure>
  <img src="/web/updates/images/2018/02/canonical.png"
       alt="The Document Has A Valid rel=canonical audit."/>
  <figcaption>
    <b>Figure 2</b>. The <b>Document Has A Valid</b> <code>rel=canonical</code> audit
  </figcaption>
</figure>

The **Page Is Mobile-Friendly** and **Structured Data Is Valid** manual audits can help further
improve your SEO. "Manual" in this case means that Lighthouse can't automate these audits, so
you need to test them yourself.

<figure>
  <img src="/web/updates/images/2018/02/manual.png"
       alt="The manual SEO audits."/>
  <figcaption>
    <b>Figure 3</b>. The manual SEO audits
  </figcaption>
</figure>

The **Minify CSS** and **Minify JavaScript** audits in the Performance category check for any
CSS or Javascript that can be minified to reduce payload size and parse time.

<figure>
  <img src="/web/updates/images/2018/02/minify.png"
       alt="The Minify CSS and Minify JavaScript audits."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Minify CSS</b> and <b>Minify JavaScript</b> audits
  </figcaption>
</figure>

## Performance as the first category in Lighthouse reports {: #report }

Performance is now the first category you see in Lighthouse reports. Some users thought that
Lighthouse was only for Progressive Web Apps, since that was the first category in reports. In
reality, Lighthouse can help you understand how to improve any web page, whether or not it's
a [Progressive Web App][PWA].

[PWA]: /web/progressive-web-apps/

## Updated Accessibility scoring {: #a11y }

If an accessibility audit is not applicable for a given page, that audit no longer counts
towards the **Accessibility** score.

## New loading message and fast facts {: #message }

Note: This update is only visible when you run Lighthouse from the **Audits** panel of Chrome
DevTools.

<figure>
  <img src="/web/updates/images/2018/02/LOAD.gif"
       alt="The loading message and fast facts in Chrome DevTools."/>
  <figcaption>
    <b>Figure 5</b>. The loading message and fast facts in Chrome DevTools
  </figcaption>
</figure>

## New Lighthouse release guide {: #release }

Check out the [Release Guide For Maintainers][release]{:.external} for information on
release timing, masters, naming conventions, and more.

[release]: https://github.com/GoogleChrome/lighthouse/blob/master/docs/releasing.md

{% include "web/_shared/rss-widget-updates.html" %}
