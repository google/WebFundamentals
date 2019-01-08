project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-10-30 #}

{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# क्रोम 64 में नया {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* [`ResizeObservers`](#resizeobserver) लिए समर्थन, आपको सूचित करेगा जब किसी तत्व की सामग्री आयताकार ने अपना आकार बदल दिया है।
* मॉड्यूल अब [import.meta](#import-meta) साथ होस्ट विशिष्ट मेटाडेटा तक पहुंच सकते हैं।
* [pop-up blocker](#popup-blocker) मजबूत हो जाता है।
* [`window.alert()`](#window-alert) अब फोकस नहीं बदलता है।

और [plenty more](#more) !

मैं पीट लीपेज हूं। आइए देखें और क्रोम 64 में डेवलपर्स के लिए नया क्या है!

<div class="clearfix"></div>

Note: परिवर्तनों की पूरी सूची चाहते हैं? [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) ।

## `ResizeObserver` {: #resizeobserver }

किसी तत्व के आकार में परिवर्तन होने पर ट्रैकिंग दर्द का थोड़ा सा हो सकता है। सबसे अधिक संभावना है कि आप दस्तावेज़ के `resize` ईवेंट में श्रोता संलग्न करेंगे, फिर `getBoundingClientRect` या `getComputedStyle` कॉल करें। लेकिन, दोनों लेआउट थ्रैशिंग का कारण बन सकते हैं।

और क्या होगा यदि ब्राउज़र विंडो आकार बदल नहीं पाई, लेकिन दस्तावेज़ में एक नया तत्व जोड़ा गया था? या आपने किसी तत्व को `display: none` जोड़ा है? वे दोनों पृष्ठ के भीतर अन्य तत्वों के आकार को बदल सकते हैं।

जब भी कोई तत्व का आकार बदलता है तो `ResizeObserver` आपको सूचित करता है, और तत्व की नई ऊंचाई और चौड़ाई प्रदान करता है, जिससे लेआउट थ्रैशिंग का खतरा कम हो जाता है।

अन्य पर्यवेक्षकों की तरह, इसका उपयोग करना बहुत आसान है, `ResizeObserver` ऑब्जेक्ट बनाएं और कन्स्ट्रक्टर को कॉलबैक पास करें। कॉलबैक को `ResizeOberverEntries` की एक सरणी दी `ResizeOberverEntries` - प्रति `ResizeOberverEntries` तत्व में एक प्रविष्टि - जिसमें तत्व के लिए नए आयाम होते हैं।

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

अधिक जानकारी और असली दुनिया के उदाहरणों के लिए [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver) देखें।


## बेहतर पॉप-अप अवरोधक {: #popup-blocker }

मुझे टैब-अंडर से नफरत है। आप उन्हें जानते हैं, यह तब होता है जब कोई पृष्ठ किसी गंतव्य पर पॉप-अप खुलता है और पृष्ठ पर नेविगेट करता है। आमतौर पर उनमें से एक विज्ञापन या ऐसा कुछ है जिसे आप नहीं चाहते थे।

क्रोम 64 में शुरू होने से, इन प्रकार के नेविगेशन अवरुद्ध हो जाएंगे, और क्रोम उपयोगकर्ता को कुछ मूल यूआई दिखाएगा - अगर वे चाहते हैं तो उन्हें रीडायरेक्ट का पालन करने की अनुमति दें।


## `import.meta` {: #import-meta }

जावास्क्रिप्ट मॉड्यूल लिखते समय, आप अक्सर मौजूदा मॉड्यूल के बारे में होस्ट-विशिष्ट मेटाडेटा तक पहुंच चाहते हैं। क्रोम 64 अब मॉड्यूल के भीतर `import.meta` प्रॉपर्टी का समर्थन करता है और मॉड्यूल के लिए URL को `import.meta.url` रूप में उजागर करता है।

यह वास्तव में सहायक है जब आप मौजूदा HTML दस्तावेज़ के विपरीत मॉड्यूल फ़ाइल से संबंधित संसाधनों को हल करना चाहते हैं।


## और अधिक! {: #more }

डेवलपर्स के लिए क्रोम 64 में ये कुछ बदलाव हैं, बेशक, बहुत कुछ है।

* क्रोम अब नियमित अभिव्यक्तियों में [named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures) और [Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) का समर्थन करता है।
* `<audio>` और `<video>` तत्वों के लिए डिफ़ॉल्ट `preload` मान अब `metadata` । यह क्रोम को अन्य ब्राउज़रों के साथ लाता है और केवल मेटाडेटा लोड करके बैंडविड्थ और संसाधन उपयोग को कम करने में मदद करता है, न कि मीडिया स्वयं।
* अब आप उपयोग कर सकते हैं `Request.prototype.cache` एक का कैश मोड देखने पर `Request` और निर्धारित करेंगे कि एक अनुरोध एक रीलोड अनुरोध है।
* फोकस प्रबंधन API का उपयोग करके, अब आप `preventScroll` विशेषता के साथ स्क्रॉल किए बिना तत्व को फ़ोकस कर सकते हैं।

## `window.alert()` {: #window-alert }

ओह, और एक और! हालांकि यह वास्तव में &#39;डेवलपर सुविधा&#39; नहीं है, यह मुझे खुश बनाता है। `window.alert()` अब अग्रभूमि में पृष्ठभूमि टैब नहीं लाता है! इसके बजाए, जब उपयोगकर्ता उस टैब पर वापस स्विच करता है तो अलर्ट दिखाया जाएगा।

कोई और यादृच्छिक टैब स्विचिंग नहीं है क्योंकि कुछ ने मुझे `window.alert` निकाल दिया है। मैं आपको पुराना Google कैलेंडर देख रहा हूं।


हमारे [YouTube channel](https://www.youtube.com/user/ChromeDevelopers/) पर [subscribe](https://goo.gl/6FP1a5) सुनिश्चित करें, और जब भी हम कोई नया वीडियो लॉन्च करते हैं, या हमारे फ़ीड रीडर में हमारे [RSS feed](/web/shows/rss.xml) को जोड़ते हैं तो आपको एक ईमेल अधिसूचना मिल जाएगी।


मैं पीट लीपेज हूं, और जैसे ही क्रोम 65 जारी किया गया है, मैं आपको बताने के लिए यहां सही हूं - क्रोम में नया क्या है!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
