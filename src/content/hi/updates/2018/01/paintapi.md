project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# सीएसएस पेंट एपीआई {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## क्रोम 65 सीएसएस पेंट एपीआई (&quot;सीएसएस कस्टम पेंट&quot; या &quot;हौडिनी के पेंट वर्कलेट&quot; के रूप में भी जाना जाता है) में नई संभावनाएं क्रोम स्थिर में डिफ़ॉल्ट रूप से सक्षम होने वाली हैं। यह क्या है? तुम्हारे द्वारा इससे क्या किया जा सकता है? और यह कैसे काम करता है? खैर, पढ़ो, क्या होगा ...


सीएसएस पेंट एपीआई आपको जब भी एक सीएसएस संपत्ति किसी छवि की अपेक्षा करता है तो प्रोग्रामेटिक रूप से एक छवि उत्पन्न करने की अनुमति देता है। `background-image` या `border-image` जैसी `border-image` को आमतौर पर `url()` साथ एक छवि फ़ाइल लोड करने के लिए या `linear-gradient()` जैसे सीएसएस अंतर्निहित कार्यों के साथ `linear-gradient()` । उन लोगों का उपयोग करने के बजाय, अब आप `paint(myPainter)` को संदर्भित करने के लिए `paint(myPainter)` का उपयोग कर सकते हैं।

### एक पेंट वर्कलेट लिख रहा है

एक पेंट worklet बुलाया परिभाषित करने के लिए `myPainter` , हम एक सीएसएस रंग worklet का उपयोग कर फ़ाइल को लोड करने की आवश्यकता है `CSS.paintWorklet.addModule('my-paint-worklet.js')` । उस फ़ाइल में हम एक पेंट वर्कलेट क्लास पंजीकृत करने के लिए `registerPaint` फ़ंक्शन का उपयोग कर सकते हैं:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

`paint()` कॉलबैक के अंदर, हम `ctx` का उसी तरह उपयोग कर सकते हैं जैसे हम `CanvasRenderingContext2D` करेंगे क्योंकि हम इसे `<canvas>` से `<canvas>` । यदि आप जानते हैं कि `<canvas>` में कैसे आकर्षित किया `<canvas>` , तो आप एक पेंट वर्कलेट में आकर्षित कर सकते हैं! `geometry` हमें हमारे निपटारे में कैनवास की चौड़ाई और ऊंचाई बताता है। `properties` मैं इस लेख में बाद में `properties` ।

Note: एक रंग worklet के संदर्भ में 100% एक के समान नहीं है `<canvas>` संदर्भ। अभी तक, पाठ प्रतिपादन विधियां गायब हैं और सुरक्षा कारणों से आप कैनवास से पिक्सेल वापस नहीं पढ़ सकते हैं।

एक प्रारंभिक उदाहरण के रूप में, चलिए एक चेकरबोर्ड पेंट वर्कलेट लिखते हैं और इसे `<textarea>` की पृष्ठभूमि छवि के रूप में उपयोग करते हैं। (मैं एक textarea का उपयोग कर रहा हूँ क्योंकि यह डिफ़ॉल्ट रूप से आकार बदल सकता है।):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

यदि आपने अतीत में `<canvas>` का उपयोग किया है, तो यह कोड परिचित दिखना चाहिए। यहां लाइव [demo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) देखें।

Note: लगभग सभी नए एपीआई के साथ, सीएसएस पेंट एपीआई केवल HTTPS (या `localhost` ) पर उपलब्ध है।

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="
  Textarea with a checkerboard pattern as a background image.">

यहां एक सामान्य पृष्ठभूमि छवि का उपयोग करने से अंतर यह है कि जब भी उपयोगकर्ता टेक्स्टरेरा का आकार बदलता है तो पैटर्न मांग पर फिर से खींचा जाएगा। इसका मतलब है कि बैकग्राउंड छवि हमेशा उतनी ही बड़ी होती है जितनी बड़ी होनी चाहिए, जिसमें उच्च-घनत्व वाले डिस्प्ले के लिए मुआवजे शामिल हैं।

यह बहुत अच्छा है, लेकिन यह भी काफी स्थिर है। क्या हम हर बार एक ही पैटर्न चाहते थे, लेकिन हम अलग-अलग आकार के वर्गों के साथ एक नया वर्कलेट लिखना चाहते हैं? जवाब न है!

### आपके ### पैरामीटरेट करना

सौभाग्य से, पेंट वर्कलेट अन्य सीएसएस गुणों तक पहुंच सकता है, जहां अतिरिक्त पैरामीटर `properties` खेल में आता है। कक्षा को एक स्थिर `inputProperties` विशेषता `inputProperties` , आप कस्टम गुणों सहित किसी भी सीएसएस संपत्ति में परिवर्तनों की सदस्यता ले सकते हैं। मूल्य आपको `properties` पैरामीटर के माध्यम से दिए `properties` ।

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

अब हम सभी अलग-अलग प्रकार के चेकरबोर्ड के लिए एक ही कोड का उपयोग कर सकते हैं। लेकिन इससे भी बेहतर, अब हम DevTools और [fiddle with the values](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) में जा सकते हैं जब तक कि हमें सही नज़र न मिले।

<div style="display: flex; justify-content: center">
  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: रंगों को पैरामीटर करना भी बहुत अच्छा होगा, है ना? `paint()` फ़ंक्शन के लिए तर्कों की एक सूची लेने की अनुमति देता है। यह सुविधा अभी तक क्रोम में लागू नहीं की गई है, क्योंकि यह भारी रूप से हुडिनी के गुणों और मूल्यों एपीआई पर निर्भर करती है, जिसे जहाज के पहले कुछ काम करने की आवश्यकता है।

## ब्राउज़र जो पेंट वर्कलेट का समर्थन नहीं करते हैं लेखन के समय, केवल क्रोम में पेंट वर्कलेट लागू होता है। हालांकि अन्य सभी ब्राउज़र विक्रेताओं से सकारात्मक संकेत हैं, वहां बहुत प्रगति नहीं है। अद्यतित रहने के लिए, नियमित रूप से [Is Houdini Ready Yet?](https://ishoudinireadyyet.com) जांचें। इस बीच, पेंट वर्कलेट के लिए कोई समर्थन नहीं होने पर भी अपना कोड चालू रखने के लिए प्रगतिशील वृद्धि का उपयोग करना सुनिश्चित करें। यह सुनिश्चित करने के लिए कि चीजें अपेक्षित काम करती हैं, आपको अपने कोड को दो स्थानों पर समायोजित करना होगा: सीएसएस और जेएस।

जेएस में पेंट वर्कलेट के लिए समर्थन का पता लगाना `CSS` ऑब्जेक्ट की जांच करके किया जा सकता है:

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

सीएसएस पक्ष के लिए, आपके पास दो विकल्प हैं। आप `@supports` उपयोग कर सकते हैं:

    @supports (background: paint(id)) {
      /* ... */
    }

एक और कॉम्पैक्ट चाल इस तथ्य का उपयोग करना है कि सीएसएस अमान्य हो जाता है और बाद में अगर कोई अज्ञात कार्य होता है तो पूरी संपत्ति घोषणा को अनदेखा कर देता है। यदि आप दो बार संपत्ति निर्दिष्ट करते हैं - पहले पेंट वर्कलेट के बिना, और फिर पेंट वर्कलेट के साथ - आपको प्रगतिशील वृद्धि मिलती है:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

ब्राउज़रों _with_ रंग worklet के लिए समर्थन में, की दूसरी घोषणा `background-image` पहले एक ऊपर लिख देगा। पेंट वर्कलेट के लिए ब्राउज़र _without_ समर्थन में, दूसरी घोषणा अमान्य है और इसे पहले घोषणापत्र को प्रभावी रूप से छोड़कर त्याग दिया जाएगा।

### सीएसएस पेंट ###

कई प्रयोगों के लिए, [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) का उपयोग करना भी संभव है, जो सीएसएस कस्टम पेंट और पेंट वर्कलेट्स को आधुनिक ब्राउज़र में समर्थन देता है।

## मामलों का उपयोग करें पेंट वर्कलेट्स के लिए कई उपयोग मामले हैं, उनमें से कुछ दूसरों की तुलना में अधिक स्पष्ट हैं। आपके डीओएम के आकार को कम करने के लिए अधिक स्पष्ट लोगों में से एक पेंट वर्कलेट का उपयोग कर रहा है। अक्सर, तत्वों को सीएसएस का उपयोग करके सजावट बनाने के लिए पूरी तरह से जोड़ा जाता है। उदाहरण के लिए, [Material Design Lite](https://getmdl.io) में [Material Design Lite](https://getmdl.io) प्रभाव वाले बटन में लहर को लागू करने के लिए 2 अतिरिक्त `<span>` तत्व होते हैं। यदि आपके पास बहुत सारे बटन हैं, तो यह कई डीओएम तत्वों को जोड़ सकता है और मोबाइल पर खराब प्रदर्शन कर सकता है। यदि आप [implement the ripple effect using paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) बजाय [implement the ripple effect using paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) करते हैं, तो आप 0 अतिरिक्त तत्वों और केवल एक पेंट वर्कलेट के साथ समाप्त होते हैं। इसके अतिरिक्त, आपके पास कुछ ऐसा है जो अनुकूलित और पैरामीटर करने के लिए बहुत आसान है।

पेंट वर्कलेट का उपयोग करने का एक और उछाल यह है कि - अधिकांश परिदृश्यों में - पेंट वर्कलेट का उपयोग करके एक समाधान बाइट्स के मामले में छोटा होता है। बेशक, एक व्यापार बंद है: जब भी कैनवास का आकार या कोई भी पैरामीटर बदल जाता है तो आपका पेंट कोड चलाएगा। तो यदि आपका कोड जटिल है और इसमें लंबा समय लगता है तो यह जंक पेश कर सकता है। क्रोम मुख्य थ्रेड से पेंट वर्कलेट्स को ले जाने पर काम कर रहा है ताकि यहां तक ​​कि लंबे समय से चलने वाले पेंट वर्कलेट मुख्य थ्रेड की प्रतिक्रिया को प्रभावित न करें।

मेरे लिए, सबसे रोमांचक संभावना यह है कि पेंट वर्कलेट सीएसएस सुविधाओं की कुशल पॉलीफिलिंग की अनुमति देता है जो ब्राउज़र अभी तक नहीं है। एक उदाहरण [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) जब तक कि वे क्रोम में मूल रूप से [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) । एक और उदाहरण: एक सीएसएस बैठक में यह निर्णय लिया गया था कि अब आपके पास कई सीमा रंग हो सकते हैं। हालांकि यह बैठक अभी भी पेंट वर्कलेट का उपयोग करके इस नए सीएसएस व्यवहार के लिए मेरे सहयोगी इयान किलपैट्रिक [wrote a polyfill](https://twitter.com/malyw/status/934737334494429184) पर चल रही थी।

## &quot;बॉक्स&quot; के बाहर सोचते समय अधिकांश लोग पृष्ठभूमि छवियों और सीमा छवियों के बारे में सोचने लगते हैं जब वे पेंट वर्कलेट के बारे में सीखते हैं। पेंट वर्कलेट के लिए एक कम अंतर्ज्ञानी उपयोग केस `mask-image` है जो डोम तत्वों को मनमाने ढंग से आकार देता है। उदाहरण के लिए एक [diamond](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/) :

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="
  A DOM element in the shape of a diamond.">

`mask-image` एक छवि लेता है जो तत्व का आकार है। क्षेत्र जहां मुखौटा छवि पारदर्शी है, तत्व पारदर्शी है। क्षेत्र जहां मास्क छवि अपारदर्शी है, तत्व अपारदर्शी है।

क्रोम में अब ##

कुछ समय के लिए पेंट वर्कलेट क्रोम कैनरी में रहा है। क्रोम 65 के साथ, यह डिफ़ॉल्ट रूप से सक्षम है। आगे बढ़ें और नई संभावनाओं को आज़माएं जो पेंटलेट को पेंट करते हैं और हमें दिखाते हैं कि आपने क्या बनाया है! अधिक प्रेरणा के लिए, [Vincent De Oliveira’s collection](https://lab.iamvdo.me/houdini/) पर एक नज़र [Vincent De Oliveira’s collection](https://lab.iamvdo.me/houdini/) ।

Note: ब्रेकपॉइंट्स वर्तमान में सीएसएस पेंट एपीआई में समर्थित नहीं हैं, लेकिन बाद में क्रोम के रिलीज में सक्षम हो जाएंगे।

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}