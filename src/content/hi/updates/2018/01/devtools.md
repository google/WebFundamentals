project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools में नया क्या है (क्रोम 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome 65 में DevTools में आने वाली नई विशेषताएं शामिल हैं:

* [** स्थानीय ओवरराइड **](#overrides)
* [नई पहुंच क्षमता उपकरण](#a11y)
* [** परिवर्तन ** टैब](#changes)
* [नया एसईओ और प्रदर्शन लेखा परीक्षा](#audits)
* [** प्रदर्शन ** पैनल में एकाधिक रिकॉर्डिंग](#recordings)
* [श्रमिकों और एसिंक्रोनस कोड के साथ विश्वसनीय कोड कदम](#stepping)

नीचे, इन रिलीज नोट्स के वीडियो संस्करण को पढ़ें या देखें।

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</Div>

एसपीसीएलसीएलएलटीएस 0 एसपीसीएलडब्लूडीडी 0 पर क्रोम का कौन सा संस्करण चल रहा है, इसकी जांच करें। यदि आप पहले के संस्करण को चला रहे हैं, तो ये सुविधाएं मौजूद नहीं होंगी। यदि आप बाद के संस्करण चला रहे हैं, तो ये सुविधाएं बदल सकती हैं। क्रोम प्रत्येक 6 सप्ताह के बारे में एक नए प्रमुख संस्करण के लिए स्वतः अद्यतन करता है।

## स्थानीय ओवरराइड {: #overrides }

** स्थानीय ओवरराइड ** आपको DevTools में परिवर्तन करने दें, और उन परिवर्तनों को पेज लोड में रखें। पहले, जब आप पृष्ठ को पुनः लोड करते हैं तो DevTools में किए गए कोई भी परिवर्तन खो जाएंगे।
** स्थानीय ओवरराइड ** कुछ अपवादों के साथ, अधिकांश फ़ाइल प्रकारों के लिए काम करते हैं। देखें [सीमाएं](#overrides-limitations)।

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</आंकड़ा>

यह काम किस प्रकार करता है:

* आप एक निर्देशिका निर्दिष्ट करते हैं जहां DevTools को परिवर्तनों को सहेजना चाहिए।
* जब आप DevTools में परिवर्तन करते हैं, तो DevTools संशोधित फ़ाइल की एक प्रति आपकी निर्देशिका में सहेजता है।
* जब आप पृष्ठ को फिर से लोड करते हैं, तो DevTools नेटवर्क संसाधन की बजाय स्थानीय, संशोधित फ़ाइल परोसता है।

** स्थानीय ओवरराइड ** सेट अप करने के लिए:

1. ** स्रोत ** पैनल खोलें। 1. ** ओवरराइड ** टैब खोलें।

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. ** सेटअप ओवरराइड ** पर क्लिक करें। 1. चुनें कि आप किस निर्देशिका में अपने परिवर्तनों को सहेजना चाहते हैं। 1. अपने व्यूपोर्ट के शीर्ष पर, ** ** DevTools को पढ़ने और निर्देशिका तक पहुंच लिखने के लिए ** अनुमति दें पर क्लिक करें। 1. अपने बदलाव करें।

### सीमाएं {: #overrides-limitations }

* DevTools ** तत्व ** पैनल के ** DOM Tree ** में किए गए परिवर्तनों को सहेजता नहीं है। इसके बजाय ** स्रोत ** पैनल में HTML संपादित करें।
* यदि आप ** स्टाइल ** फलक में सीएसएस संपादित करते हैं, और उस सीएसएस का स्रोत एक HTML फ़ाइल है, तो DevTools परिवर्तन को सहेज नहीं पाएगा। इसके बजाय ** स्रोत ** पैनल में HTML फ़ाइल संपादित करें।

### संबंधित विशेषताएं {: #overrides-related }

* [कार्यक्षेत्र][WS]। DevTools स्वचालित रूप से स्थानीय संसाधनों में नेटवर्क संसाधनों को मानचित्र करता है। जब भी आप DevTools में कोई परिवर्तन करते हैं, तो वह परिवर्तन आपके स्थानीय भंडार में भी सहेजा जाता है।

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## चेंज टैब {: #changes }

नए ** परिवर्तन ** टैब के माध्यम से DevTools में स्थानीय रूप से स्थानीय रूप से किए गए परिवर्तनों को ट्रैक करें।

<figure>  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</आंकड़ा>

## नई पहुंच क्षमता उपकरण {: #a11y }

किसी तत्व के अभिगम्यता गुणों का निरीक्षण करने के लिए नई ** पहुंच-योग्यता ** फलक का उपयोग करें, और ** रंग पिकर ** में टेक्स्ट तत्वों के विपरीत अनुपात का निरीक्षण करें ताकि यह सुनिश्चित किया जा सके कि वे कम दृष्टि वाली हानियों या रंग वाले उपयोगकर्ताओं के लिए पहुंच योग्य हैं -विजन की कमी।

### अभिगम्यता फलक {: #a11y-pane }

वर्तमान में चयनित तत्व की पहुंच-योग्यता गुणों की जांच के लिए ** तत्व ** पैनल पर ** एक्सेसिबिलिटी ** फलक का उपयोग करें।

<figure>  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</आंकड़ा>

** एक्सेसिबिलिटी ** फलक में ** फलक देखने के लिए नीचे लेबलिंग पर रोब डोडसन का ए 11ycast देखें।

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</Div>

### कलर पिकर {: #contrast } में कंट्रास्ट अनुपात

[रंग पिकर][CP] अब आपको पाठ तत्वों का विपरीत अनुपात दिखाता है। पाठ तत्वों के विपरीत अनुपात में वृद्धि से आपकी साइट कम दृष्टि वाली हानियों या रंग-दृष्टि की कमी वाले उपयोगकर्ताओं के लिए अधिक सुलभ हो जाती है। कंट्रास्ट अनुपात कैसे पहुंच को प्रभावित करता है इस बारे में अधिक जानने के लिए [रंग और विपरीत][contrast] देखें।

अपने टेक्स्ट तत्वों के रंग विपरीत में सुधार करने से आपकी साइट <i>सभी</i> उपयोगकर्ताओं के लिए अधिक उपयोगी हो जाती है। दूसरे शब्दों में, यदि आपका टेक्स्ट एक सफेद पृष्ठभूमि के साथ भूरा है, तो किसी के भी पढ़ने के लिए मुश्किल है।

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</आंकड़ा>

** चित्रा 5 ** में, ** 4.61 ** के बगल में दो चेकमार्क का अर्थ है कि यह तत्व [बढ़ाया अनुशंसित विपरीत अनुपात (एएए)][enhanced]{:.external} से मिलता है। अगर इसमें केवल एक चेकमार्क था, तो इसका मतलब यह होगा कि [न्यूनतम अनुशंसित विपरीत अनुपात (एए)][minimum] पीआरजीएमएस 1।

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

** अधिक दिखाएँ ** क्लिक करें ![अधिक दिखाएं][SM]] {:.cdt-inl} ** कंट्रास्ट अनुपात ** अनुभाग का विस्तार करने के लिए। ** रंग स्पेक्ट्रम ** बॉक्स में सफेद रेखा अनुशंसित विपरीत अनुपात को पूरा करने वाले रंगों के बीच की सीमा का प्रतिनिधित्व करती है, और जो नहीं करते हैं। उदाहरण के लिए, ग्रे रंग के बाद से
** चित्रा 6 ** सिफारिशों को पूरा करता है, इसका मतलब है कि सफेद रेखा के नीचे के सभी रंग भी सिफारिशों को पूरा करते हैं।

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</आंकड़ा>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### संबंधित विशेषताएं {: #contrast-related }

** लेखा परीक्षा ** पैनल में यह सुनिश्चित करने के लिए एक स्वचालित पहुंच योग्यता लेखा परीक्षा है
* किसी पृष्ठ पर प्रत्येक * टेक्स्ट तत्व का पर्याप्त विपरीत अनुपात होता है।

एक्सेसिबिलिटी का परीक्षण करने के लिए ** ऑडिट ** पैनल का उपयोग कैसे करें, सीखने के लिए [क्रोम DevTools में लाइटहाउस चलाएं][audit] देखें, या नीचे A11ycast देखें।

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</Div>

[audit]: /web/tools/lighthouse/#devtools

## नए लेखापरीक्षा {: #audits }

क्रोम 65 एसईओ लेखापरीक्षा की एक पूरी नई श्रेणी के साथ जहाज, और कई नए प्रदर्शन लेखा परीक्षा।

एसपीसीएलसीएलएलटीएस 0 ** लेखा परीक्षा ** पैनल [लाइटहाउस][LH] द्वारा संचालित है। क्रोम 64 लाइटहाउस संस्करण 2.5 चलाता है। क्रोम 65 लाइटहाउस संस्करण 2.8 चलाता है। तो यह खंड 2.6, 2.7, और 2.8 से लाइटहाउस अपडेट का सारांश है।

### नई एसईओ लेखा परीक्षा {: #seo }

यह सुनिश्चित करना कि आपके पृष्ठ नए ** एसईओ ** श्रेणी में प्रत्येक लेखापरीक्षा पास करते हैं, आपकी खोज इंजन रैंकिंग में सुधार करने में मदद कर सकते हैं।

<figure>  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</आंकड़ा>

### नई प्रदर्शन लेखा परीक्षा {: #performance }

क्रोम 65 कई नए प्रदर्शन लेखा परीक्षा के साथ भी जहाज:

* जावास्क्रिप्ट बूट-अप समय उच्च है
* स्थैतिक संपत्तियों पर अक्षम कैश नीति का उपयोग करता है
* पृष्ठ रीडायरेक्ट से बचें
* दस्तावेज़ प्लगइन्स का उपयोग करता है
* सीएसएस को छोटा करें
* जावास्क्रिप्ट को छोटा करें

<aside class="key-point"> <b>पेर्फ मायने रखता है!</b> माइनेट ने 4x तक अपने पृष्ठ लोड की गति में सुधार के बाद, उपयोगकर्ताओं ने साइट पर 43% अधिक समय बिताया, 34% अधिक पृष्ठों को देखा, बाउंस दर 24% गिर गई, और राजस्व प्रति लेख पृष्ठदृश्य में 25% की वृद्धि हुई। <a href="/web/showcase/2017/mynet">और जानें</a> । </aside>

<aside class="success"> <b>टिप!</b> यदि आप अपने पृष्ठों के लोड प्रदर्शन में सुधार करना चाहते हैं, लेकिन यह नहीं पता कि कहां से शुरू करना है, तो <b>ऑडिट</b> पैनल आज़माएं। आप इसे एक यूआरएल देते हैं, और यह आपको उस पृष्ठ को बेहतर बनाने के कई अलग-अलग तरीकों से एक विस्तृत रिपोर्ट देता है। <a href="/web/tools/lighthouse/#devtools">शुरू करें</a> </aside>

### अन्य अपडेट {: #audits-other }

* [नया, मैन्युअल अभिगम्यता लेखा परीक्षा](/web/updates/2018/01/lighthouse#a11y)
* [वेबप ऑडिट के अपडेट][webp] इसे अन्य अगली पीढ़ी के छवि प्रारूपों में शामिल करने के लिए
* [अभिगम्यता स्कोर का एक रिहाल][a11yscore]
* यदि किसी पृष्ठ के लिए एक एक्सेसिबिलिटी ऑडिट लागू नहीं है, तो ऑडिट अब एक्सेसिबिलिटी स्कोर की ओर गिना जाता है
* प्रदर्शन अब रिपोर्ट में शीर्ष खंड है

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## श्रमिकों और एसिंक्रोनस कोड {: #stepping } के साथ विश्वसनीय कोड कदम

क्रोम 65 ** ** ** चरण में अपडेट लाता है ![चरण][into]] {:.cdt-inl} बटन जब कोड में कदम उठाता है जो धागे और एसिंक्रोनस कोड के बीच संदेश पास करता है। यदि आप पिछले चरणबद्ध व्यवहार चाहते हैं, तो आप नए ** चरण ** का उपयोग कर सकते हैं ![चरण][step]] इसके बजाय {:.cdt-inl} बटन।

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### कोड में कदम उठाना जो थ्रेड्स {: #workers } के बीच संदेश पास करता है

जब आप कोड में कदम रखते हैं जो धागे के बीच संदेश पास करता है, तो देवटूल अब आपको दिखाता है कि प्रत्येक थ्रेड में क्या होता है।

उदाहरण के लिए, ** चित्रा 8 ** में ऐप मुख्य धागे और कार्यकर्ता थ्रेड के बीच एक संदेश पास करता है। मुख्य धागे पर एसपीसीएलडब्ल्यूआरडी 0 कॉल में कदम उठाने के बाद, देवटूल कार्यकर्ता धागे में एसपीसीएलडब्ल्यूआरडी 1 हैंडलर में रुक जाता है। एसपीसीएलडब्ल्यूआरडी 2 हैंडलर स्वयं मुख्य धागे पर एक संदेश पोस्ट करता है। * उस * कॉल में कदम उठाने से मुख्य धागे में DevTools को रोक दिया जाता है।

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</आंकड़ा>

जब आप Chrome के पुराने संस्करणों में इस तरह कोड में कदम रखते थे, तो क्रोम ने आपको केवल कोड का मुख्य-थ्रेड-साइड दिखाया, जैसा कि आप ** चित्र 9 ** में देख सकते हैं।

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</आंकड़ा>

### एसिंक्रोनस कोड {: #async } में कदम

एसिंक्रोनस कोड में कदम उठाने पर, देवटूल अब मानते हैं कि आप असीमित कोड में रोकना चाहते हैं जो अंततः चलता है।

उदाहरण के लिए, ** चित्रा 10 ** में `setTimeout()` में कदम उठाने के बाद, DevTools दृश्यों के पीछे उस बिंदु तक पहुंचने वाले सभी कोड चलाता है, और उसके बाद एसपीसीएलडब्लूआरडी 1 को पारित किए गए फ़ंक्शन में रुक जाता है।

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</आंकड़ा>

जब आप क्रोम 63 में इस तरह के कोड में कदम उठाते हैं, तो DevTools कोड में रुक गया क्योंकि यह कालक्रम से चल रहा था, जैसा कि आप ** चित्रा 11 ** में देख सकते हैं।

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</आंकड़ा>

## प्रदर्शन पैनल {: #recordings } में एकाधिक रिकॉर्डिंग

** प्रदर्शन ** पैनल अब आपको अस्थायी रूप से 5 रिकॉर्डिंग तक सहेजने देता है। जब आप अपनी DevTools विंडो बंद करते हैं तो रिकॉर्डिंग हटा दी जाती है। ** प्रदर्शन ** पैनल के साथ सहज महसूस करने के लिए [रनटाइम प्रदर्शन का विश्लेषण करने के साथ प्रारंभ करें][runtime] देखें।

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</आंकड़ा>

## बोनस: Puppeteer 1.0 {: #puppeteer } के साथ स्वचालित DevTools क्रियाएं

एसपीसीएलसीएलएलटीएस 0 यह खंड क्रोम 65 से संबंधित नहीं है।

Puppeteer का संस्करण 1.0, क्रोम DevTools टीम द्वारा बनाए गए एक ब्राउज़र स्वचालन उपकरण, अब बाहर है। आप Puppeteer का उपयोग कई कार्यों को स्वचालित करने के लिए कर सकते हैं जो पहले केवल DevTools के माध्यम से उपलब्ध थे, जैसे स्क्रीनशॉट कैप्चर करना:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

इसमें पीडीएफ उत्पन्न करने जैसे कई सामान्य रूप से उपयोगी स्वचालन कार्यों के लिए एपीआई भी हैं:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

अधिक जानने के लिए [त्वरित प्रारंभ][quickstart] देखें।

[quickstart]: /web/tools/puppeteer/get-started

आप DevTools को स्पष्ट रूप से खोलने के बिना ब्राउज़ करते समय DevTools सुविधाओं का पर्दाफाश करने के लिए Puppeteer का भी उपयोग कर सकते हैं। उदाहरण के लिए [DevTools खोलने के बिना DevTools सुविधाओं का उपयोग] देखें [0]।

[without]: /web/updates/2018/01/devtools-without-devtools

## देवतुल्स टीम से एक अनुरोध: कैनरी पीआरजीएमएस 0 पर विचार करें

यदि आप मैक या विंडोज पर हैं, तो कृपया अपने डिफ़ॉल्ट विकास ब्राउज़र के रूप में [क्रोम कैनरी][canary] का उपयोग करने पर विचार करें। यदि आप एक बग या एक परिवर्तन की रिपोर्ट करते हैं जिसे आप कैनरी में अभी भी पसंद नहीं करते हैं, तो देवटूल टीम आपकी प्रतिक्रिया को काफी तेज़ी से संबोधित कर सकती है।

एसपीसीएलसीएलएलटीएस 0 कैनरी क्रोम का खून बह रहा है। यह परीक्षण के बिना, इसे निर्मित के रूप में जल्द ही जारी किया गया है। इसका मतलब है कि कैनरी समय-समय पर लगभग एक महीने में टूट जाती है, और यह आमतौर पर एक दिन के भीतर तय होती है। कैनरी ब्रेक होने पर आप क्रोम स्टेबल का उपयोग करने के लिए वापस जा सकते हैं।

[canary]: https://www.google.com/chrome/browser/canary.html

## फीडबैक {: #feedback }

आप यहां देखे गए किसी भी विशेषताओं या परिवर्तनों पर चर्चा करने के लिए सबसे अच्छी जगह [google-chrome-developer-tools@googlegroups.com मेलिंग सूची][ML] है। यदि आप समय पर कम हैं तो आप [@ChromeDevTools](https://twitter.com/chromedevtools) पर भी हमें ट्वीट कर सकते हैं। यदि आप सुनिश्चित हैं कि आपको DevTools में एक बग का सामना करना पड़ा है, तो कृपया [एक समस्या खोलें](https://crbug.com/new)।

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## पिछली रिलीज नोट्स {: #links }

सभी पिछले DevTools रिलीज नोट्स के लिंक के लिए [devtools-whatsnew][tag] टैग देखें।

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}