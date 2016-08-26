project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: إذا كان الأمر يتعلق بترك انطباع جيد لدى المستخدمين، فيجب الاهتمام بحجم الفيديو.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# استخدام حجم الفيديو المناسب {: .page-title }

{% include "_shared/contributors/TODO.html" %}



إذا كان الأمر يتعلق بترك انطباع جيد لدى المستخدمين، فيجب الاهتمام بحجم الفيديو.


## TL;DR {: .hide-from-toc }
- لا تعرض مقاطع فيديو حجم إطارها كبير أو أعلى جودة من الجودة التي يمكن لنظام التشغيل التعامل معها.
- احرص على ألا يكون مقطع الفيديو أطول من اللازم أبدًا.
- مقاطع الفيديو الطويلة قد تتسبب في حدوث حالات فواق للتنزيل والبحث؛ وقد يتعين على بعض المتصفحات الانتظار حتى يتم تنزيل الفيديو قبل بدء التشغيل.



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

<!-- TODO: Verify note type! -->
Note: لا تفرض حجمًا للعنصر قد يؤدي إلى نسبة عرض إلى ارتفاع مختلفة عن الفيديو الأصلي. ذلك أن التكديس أو التمديد قد يبدو أمرًا سيئًا.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

قارن <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">النموذج سريع الاستجابة</a> بـ <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">النسخة بطيئة الاستجابة</a>.




