project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# क्रोम उपयोगकर्ता अनुभव रिपोर्ट: नया देश आयाम {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) असली उपयोगकर्ता प्रदर्शन डेटा का एक सार्वजनिक डेटासेट है। चूंकि हम रिपोर्ट [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) करते हैं, इसलिए सबसे अधिक अनुरोध किए गए परिवर्धनों में से एक स्थान पर उपयोगकर्ता अनुभव में अंतर को बेहतर ढंग से समझने की क्षमता रहा है। इस प्रतिक्रिया के आधार पर, हम मौजूदा क्रूक्स डेटासेट का विस्तार कर रहे हैं - जो सभी भौगोलिक क्षेत्रों में वैश्विक दृष्टिकोण प्रदान करता है - इसमें अलग-अलग देश-विशिष्ट डेटासेट का संग्रह भी शामिल है!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

उदाहरण के लिए, ऊपर स्क्रीनशॉट में हम एक क्वेरी देखते हैं जो कुछ देशों में 4 जी और 3 जी प्रभावी कनेक्शन प्रकारों के लिए कुल घनत्व की तुलना करता है। दिलचस्प बात यह है कि जापान में 4 जी की गति कितनी प्रचलित है, जबकि भारत में 3 जी गति अभी भी बहुत आम है। इन तरह की अंतर्दृष्टि नए देश आयाम के लिए संभव हो गई है।

प्रारंभ करने के लिए, BigQuery पर [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) पर जाएं और आपको [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) द्वारा `country_ae` (संयुक्त अरब अमीरात) से `country_za` (दक्षिण अफ्रीका) में आयोजित डेटासेट की एक सूची दिखाई देगी। परिचित `all` डेटासेट अभी भी वैश्विक समग्र प्रदर्शन डेटा को कैप्चर करने के लिए है। प्रत्येक डेटासेट में सबसे हालिया रिपोर्ट, `201712` शुरू होने वाली मासिक `201712` । कैसे शुरू किया जाए, इस बारे में एक विस्तृत walkthrough के लिए, कृपया हमारे अद्यतन [CrUX documentation](/web/tools/chrome-user-experience-report/) देखें।

हम इस नए डेटा को आपके साथ साझा करने के लिए उत्साहित हैं और आशा करते हैं कि आप वेब पर उपयोगकर्ता अनुभव को बेहतर बनाने के तरीकों से इसका उपयोग करें। सहायता प्राप्त करने के लिए, प्रश्न पूछें, फीडबैक दें, या अपने विश्लेषण से निष्कर्ष साझा करें, [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) पर चर्चा में शामिल [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) । और यदि BigQuery पर नि: शुल्क स्तर आपके पूछताछ उत्साह को शामिल करने के लिए पर्याप्त नहीं है, तो हम अभी भी आपको [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) देने के लिए प्रचार चला रहे हैं, इसलिए आपूर्ति के दौरान अपने क्रेडिट प्राप्त करें!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}