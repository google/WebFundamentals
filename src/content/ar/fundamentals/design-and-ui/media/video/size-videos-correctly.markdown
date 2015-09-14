---
title: "استخدام حجم الفيديو المناسب"
description: "إذا كان الأمر يتعلق بترك انطباع جيد لدى المستخدمين، فيجب الاهتمام بحجم الفيديو."
updated_on: 2014-09-19
key-takeaways:
  size-matters:
    - لا تعرض مقاطع فيديو حجم إطارها كبير أو أعلى جودة من الجودة التي يمكن لنظام التشغيل التعامل معها.
    - احرص على ألا يكون مقطع الفيديو أطول من اللازم أبدًا.
    - مقاطع الفيديو الطويلة قد تتسبب في حدوث حالات فواق للتنزيل والبحث؛ وقد يتعين على بعض المتصفحات الانتظار حتى يتم تنزيل الفيديو قبل بدء التشغيل.
notes:
  media-fragments:
    - تتوافق واجهة برمجة تطبيقات Media Fragments مع معظم أنظمة التشغيل، وليس iOS.
    - تأكد من أن طلبات النطاق متوافقة مع خادمك. يتم تمكين طلبات النطاق افتراضيًا على معظم الخوادم، إلا أن بعض خدمات الاستضافة قد تعطلها.
  dont-overflow:
    - لا تفرض حجمًا للعنصر قد يؤدي إلى نسبة عرض إلى ارتفاع مختلفة عن الفيديو الأصلي. ذلك أن التكديس أو التمديد قد يبدو أمرًا سيئًا.
  accessibility-matters:
    - يتوافق عنصر المسار الصوتي على Chrome لنظام Android وiOS Safari وجميع المتصفحات الحالية على سطح المكتب باستثناء Firefox (راجع <a href="http://caniuse.com/track" title="حالة التوافق مع عنصر المسار الصوتي">caniuse.com/track</a>). هناك عدة ترميزات بوليفيل متاحة كذلك. نوصي باستخدام <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> أو <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - يتوافق MSE  <a مع Chrome وOpera على Android وفي Internet Explorer 11 وChrome لجهاز سطح المكتب، مع تخطيط الدعم لـ href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>.
  optimize:
    - <a href="../images/">الصور</a>
    - <a href="../../performance/optimizing-content-efficiency/">تحسين كفاءة المحتوى</a>
related-guides:
  media:
  -
      title: "استخدام استعلامات وسائط CSS للحصول على سرعة استجابة"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "أساسيات تصميم شبكة ويب سريعة الاستجابة"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  إذا كان الأمر يتعلق بترك انطباع جيد لدى المستخدمين، فيجب الاهتمام بحجم الفيديو.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## التحقق من حجم الفيديو

قد يختلف الحجم الفعلي لإطار الفيديو عن أبعاد عنصر الفيديو (كما هو الحال عندما لا تظهر الصورة باستخدام أبعادها الحقيقية).

وللتحقق من حجم ترميز الفيديو، يمكنك استخدام عنصر الفيديو `videoWidth` وخصائص `videoHeight`. يعرض كل من `width` و`height` أبعاد عنصر الفيديو التي ربما يكون تم تحديد حجمها باستخدام CSS أو سمات العرض والطول المضمَّنة.

## التأكد من عدم تجاوز مقاطع الفيديو لحدود الحاويات

عندما تكون عناصر الفيديو كبيرة جدًا مقارنة بإطار العرض، فقد يتم تجاوز حدود الحاوية، مما يجعل من المستحيل على المستخدم مشاهدة المحتوى أو استخدام
عناصر التحكم.

<div class="mdl-grid">
    <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

يمكنك التحكم في أبعاد الفيديو باستخدام جافا سكريبت أو CSS. تتيح مكتبات جافا سكريبت والمكوِّنات الإضافية أيضًا مثل [FitVids](//fitvidsjs.com/) إمكانية الحفاظ على الحجم ونسبة العرض إلى الارتفاع المناسبة، حتى بالنسبة إلى مقاطع فيديو Flash من YouTube والصادر الأخرى.

يمكنك استخدام [استعلامات وسائط CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) لتحديد حجم العناصر بناءً على أبعاد إطار العرض؛ ويعتبر `max-width: 100%` الخيار الصديق.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

بالنسبة إلى محتوى الوسائط في إطارات iframes (مثل مقاطع فيديو YouTube)، جرب طريقة الاستجابة السريعة (على غرار ما يقترحه جون سورداكوسكي](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="تذكير" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

قارن {% link_sample _code/responsive_embed.html %}النموذج سريع الاستجابة{% endlink_sample %} بـ {% link_sample _code/unyt.html %}النسخة بطيئة الاستجابة{% endlink_sample %}.




