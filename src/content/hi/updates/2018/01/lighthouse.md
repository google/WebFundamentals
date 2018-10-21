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

# लाइटहाउस 2.7 अपडेट {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

लाइटहाउस 2.7 बाहर है! हाइलाइट्स में शामिल हैं:

* [New SEO audits](#seo) ।
* [New, manual accessibility audits](#a11y) ।
* [Updates to the WebP audit](#webp) ।

नई सुविधाओं, परिवर्तनों और बग फिक्स की पूरी सूची के लिए [2.7 release notes][RN] देखें।

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## 2.7 {: #update } को कैसे अपडेट करें

* एनपीएम। यदि आपने वैश्विक स्तर पर लाइटहाउस स्थापित किया है तो `npm update lighthouse` , या `npm update lighthouse -g` ध्वज चलाएं।
* क्रोम एक्सटेंशन। एक्सटेंशन स्वचालित रूप से अपडेट होना चाहिए, लेकिन आप इसे `chrome://extensions` माध्यम से मैन्युअल रूप से अपडेट कर सकते हैं।
* DevTools। लाइटहाउस 2.7 क्रोम 65 में शिपिंग कर रहा है। आप `chrome://version` माध्यम से क्रोम का कौन सा संस्करण चला रहे हैं, इसकी जांच कर सकते हैं। क्रोम प्रत्येक 6 सप्ताह के बारे में एक नए संस्करण के लिए अद्यतन करता है। आप [Chrome Canary][Canary] डाउनलोड करके नवीनतम क्रोम कोड चला सकते हैं।

[Canary]: https://www.google.com/chrome/browser/canary.html

## नया एसईओ ऑडिट {: #seo }

नई एसईओ श्रेणी लेखा परीक्षा प्रदान करती है जो खोज इंजन परिणामों में आपके पृष्ठ की रैंकिंग में सुधार करने में मदद करती है।

Note: कई कारक किसी पृष्ठ की खोज इंजन रैंकिंग को प्रभावित करते हैं। लाइटहाउस इन सभी कारकों का परीक्षण नहीं करता है। लाइटहाउस में एकदम सही 100 स्कोर किसी भी खोज इंजन पर शीर्ष रैंकिंग स्पॉट की गारंटी नहीं देता है!

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

## नया, मैन्युअल अभिगम्यता ऑडिट {: #a11y }

नया, मैन्युअल एक्सेसिबिलिटी ऑडिट आपको उन चीज़ों के बारे में सूचित करता है जो आप अपने पृष्ठ की पहुंच में सुधार के लिए कर सकते हैं। यहां &quot;मैनुअल&quot; का अर्थ है कि लाइटहाउस इन ऑडिट को स्वचालित नहीं कर सकता है, इसलिए आपको स्वयं को मैन्युअल रूप से जांचना होगा।

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

## ऑडिट {: #webp } लिए अपडेट

कुछ [community feedback][feedback] के लिए धन्यवाद, [WebP audit][webp] अब जेपीईजी 2000 और जेपीईजी एक्सआर जैसे अन्य अगली पीढ़ी, उच्च-प्रदर्शन छवि प्रारूपों सहित अधिक शामिल है।

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