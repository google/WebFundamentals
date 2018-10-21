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

# Lighthouse 2.7 Pemutakhiran {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Lighthouse 2.7 keluar! Sorotan meliputi:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

Lihat [2.7 release notes][RN] untuk daftar lengkap fitur baru, perubahan, dan perbaikan bug.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Cara memperbarui ke 2.7 {: #update }

* NPM. Jalankan `npm update lighthouse` , atau bendera `npm update lighthouse -g` jika Anda menginstal Lighthouse secara global.
* Ekstensi Chrome. Ekstensi harus diperbarui secara otomatis, tetapi Anda dapat memperbaruinya secara manual melalui `chrome://extensions` .
* DevTools. Lighthouse 2.7 adalah pengiriman di Chrome 65. Anda dapat memeriksa versi Chrome apa yang Anda jalankan melalui `chrome://version` . Pembaruan Chrome ke versi baru setiap 6 minggu. Anda dapat menjalankan kode Chrome terbaru dengan mengunduh [Chrome Canary][Canary] .

[Canary]: https://www.google.com/chrome/browser/canary.html

## Audit SEO baru {: #seo }

Kategori SEO baru menyediakan audit yang membantu meningkatkan peringkat halaman Anda dalam hasil mesin pencari.

Note: Banyak faktor memengaruhi peringkat mesin telusur laman. Mercusuar tidak menguji semua faktor ini. Skor sempurna 100 di Lighthouse tidak menjamin peringkat teratas di mesin pencari apa pun!

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

## Baru, audit aksesibilitas manual {: #a11y }

Audit aksesibilitas baru dan manual menginformasikan hal-hal yang dapat Anda lakukan untuk meningkatkan aksesibilitas halaman Anda. &quot;Manual&quot; di sini berarti bahwa Lighthouse tidak dapat mengotomatisasi audit ini, jadi Anda harus menguji sendiri secara manual.

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

## Pembaruan ke audit WebP {: #webp }

Berkat beberapa [community feedback][feedback] , [WebP audit][webp] sekarang lebih inklusif untuk format gambar berkinerja tinggi generasi berikutnya, seperti JPEG 2000 dan JPEG XR.

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