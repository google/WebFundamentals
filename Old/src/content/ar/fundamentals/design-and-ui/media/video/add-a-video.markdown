---
title: "إضافة مقطع فيديو"
description: "تعرف على أسهل طرق إضافة الفيديو إلى موقعك وتأكد من ترك أفضل انطباع لدى المستخدمين على أي جهاز."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - استخدم عنصر الفيديو لتحميل الفيديو على موقعك وفك ترميزه وتشغيله.
    - اهتم بإنتاج الفيديو بعدة تنسيقات لتغطية نطاق واسع من أنظمة تشغيل الجوّال.
    - عيِّن حجمًا مناسبًا للفيديو، وتأكد من عدم تجاوزه للحاويات.
    - نظرًا لأهمية إمكانية الوصول، أضف عنصر المقطع الصوتي كفرع لعنصر الفيديو.
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
---

<p class="intro">
  تعرف على أسهل طرق إضافة الفيديو إلى موقعك وتأكد من ترك أفضل انطباع لدى المستخدمين على أي جهاز.
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## إضافة عنصر الفيديو

أضف عنصر الفيديو لتحميل الفيديو على موقعك وفك ترميزه وتشغيله:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>متصفحك ليس متوافقًا مع عنصر الفيديو.</p>
</video>
{% endhighlight %}

## تحديد عدة تنسيقات ملفات

لا تعد جميع المتصفحات متوافقة مع تنسيقات الفيديو نفسها.
ويتيح العنصر `<source>` لك تحديد عدة تنسيقات في شكل نقاط رجوع في حالة عدم توافق متصفح المستخدم مع أحدها.
على سبيل المثال:

{% include_code src=_code/video-main.html snippet=sourcetypes %}

عندما يحلل المتصفح علامات `<source>`، فإنه يستخدم السمة الاختيارية `type` للمساعدة في تحديد الملف المطلوب تنزيله وتشغيله. إذا كان المتصفح يتوافق مع WebM، فسيتم تشغيل chrome.webm، وإلا، فسيتم التحقق مما إذا كان يمكن تشغيل مقاطع فيديو MPEG-4.
يمكنك الاطلاع على <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a> لاستكشاف المزيد حول آلية عمل الفيديو والصوت على الويب.

يتميز هذا الأسلوب بالعديد من الميزات عن عرض نصوص برمجية مختلفة على HTML أو من جهة الخادم، خاصة على الجوّال:

* يمكن لمطوِّري البرامج إدراج التنسيقات بترتيب الأفضلية.
* يؤدي التبديل من جهة العميل الأصلي إلى خفض وقت الاستجابة؛ بحيث لا يتم إلا تقديم طلب واحد للحصول على المحتوى.
* يعد السماح للمتصفح باختيار تنسيق أمرًا أسهل وأسرع ويمكن الاعتماد عليه أكثر من استخدام قاعدة بيانات الدعم من جهة الخادم مع اكتشاف وكيل المستخدم.
* يساعد تحديد نوع مصدر كل ملف في تحسين أداء الشبكة؛ ويمكن للمتصفح اختيار مصدر الفيديو بدون الاضطرار إلى تنزيل جزء من الفيديو لإجراء `فحص` للتنسيق.

تعد جميع هذه النقاط ذات أهمية خاصة في سياقات الجوّال؛ حيث يعد معدل نقل البيانات ووقت الاستجابة العنصر الأهم، وغالبًا ما تكون قدرة المستخدم على الانتظار محدودة. 
ويمكن أن يؤدي عدم تضمين سمة النوع إلى التأثير في مستوى الأداء عندما تكون هناك عدة مصادر بأنواع غير متوافقة.

باستخدام أدوات مطوِّري متصفح الجوّال، يمكنك مقارنة نشاط الشبكة {% link_sample _code/video-main.html %}مع سمات النوع{% endlink_sample %} و{% link_sample _code/notype.html %}without type attributes{% endlink_sample %}.
راجع كذلك رؤوس الاستجابة في أدوات مطوِّري المتصفح [للتأكد من أن الخادم يعرض نوع MIME المناسب](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)، وإلا فلن تعمل فحوصات نوع مصدر الفيديو.

## تحديد وقت بدء ووقت انتهاء

اهتم بتوفير معدل نقل البيانات وجعل الموقع يبدو أكثر سرعة في الاستجابة من خلال استخدام واجهة برمجة تطبيقات Media Fragments لإضافة وقت بدء ووقت انتهاء إلى عنصر الفيديو.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>

لإضافة قطاع وسائط، يمكنك إضافة `#t=[start_time][,end_time]` إلى عنوان URL للوسائط. على سبيل المثال، لتشغيل الفيديو من الثانية 5 إلى الثانية 10، يمكنك تحديد:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

يمكنك أيضًا استخدام واجهة برمجة تطبيقات Media Fragments لتقديم عدة عروض على مقطع الفيديو نفسه - مثل نقاط التلميح في DVD - بدون الاضطرار إلى ترميز عدة ملفات وعرضها.

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

باستخدام أدوات مطوِّري برامج المتصفح، راجع `Accept-Ranges: bytes` في رؤوس الاستجابة:

<img class="center" alt="Chrome Dev Tools screenshot: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## تضمين صورة ملصق

أضف سمة ملصق إلى عنصر الفيديو حتى تكون لدى المستخدمين فكرة عن المحتوى بمجرد تحميل العنصر، بدون الحاجة إلى تنزيل فيديو أو بدء التشغيل.

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

كما يمكن أن يكون الملصق نقطة رجوع إذا تم خرق `src` في الفيديو أو لم يكن أي من تنسيقات الفيديو المقدمة متوافقة. التأثير السلبي الوحيد لصور الملصق هو وجود طلب ملف إضافي يستهلك جزءًا من معدل نقل البيانات ويتطلب العرض. للاطلاع على مزيد من المعلومات، راجع [Image optimization](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

وفي ما يلي مقارنة لمقطعي فيديو جنبًا إلى جنب أحدهما بدون صورة ملصق والآخر مزود بصورة ملصق، وقد وضعنا صورة الملصق على تدرج رمادي للإشارة إلى أنه لا يمثل الفيديو:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome screenshot, portrait: no poster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome screenshot, portrait: with poster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



