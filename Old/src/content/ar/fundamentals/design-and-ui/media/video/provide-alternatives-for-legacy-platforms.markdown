---
title: "توفير خيارات بديلة لأنظمة التشغيل القديمة"
description: "لا تتوافق جميع تنسيقات الفيديو على جميع أنظمة التشغيل. ويمكنك الاطلاع على التنسيقات المتوافقة على أنظمة التشغيل الأساسية والتأكد من توافق الفيديو مع كل منها."
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
  لا تتوافق جميع تنسيقات الفيديو على جميع أنظمة التشغيل. ويمكنك الاطلاع على التنسقات المتوافقة على أنظمة التشغيل الأساسية والتأكد من توافق الفيديو مع كل منها.
</p>

{% include shared/toc.liquid %}


## الاطلاع على التنسيقات المتوافقة

يمكنك استخدام `canPlayType()` للبحث عن تنسيقات الفيديو المتوافقة. وتحتاج هذه الطريقة إلى وسيط سطر ثابت من `mime-type` وبرامج ترميز اختيارية للخروج بإحدى القيم التالية:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>القيمة المعروضة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="القيمة الناتجة">(سطر فارغ)</td>
      <td data-th="الوصف">الحاوية و/أو برنامج الترميز غير متوافق.</td>
    </tr>
    <tr>
      <td data-th="القيمة الناتجة"><code>maybe</code></td>
      <td data-th="الوصف">
        قد تكون الحاوية أو برامج الترميز متوافقة، ولكن يحتاج المتصفح
        إلى تنزيل فيديو ما للفحص.
      </td>
    </tr>
    <tr>
      <td data-th="القيمة الناتجة"><code>probably</code></td>
      <td data-th="الوصف">يبدو أن التنسيق متوافق.
      </td>
    </tr>
  </tbody>
</table>

في ما يلي بعض الأمثلة على وسيطات `canPlayType()` والقيم الناتجة عند التشغيل في Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>النوع</th>
      <th>الاستجابة</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="النوع"><code>video/xyz</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="الاستجابة"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/webm</code></td>
      <td data-th="الاستجابة"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="الاستجابة"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## إنتاج الفيديو بعدة تنسيقات

هناك الكثير من الأدوات التي تساعد في حفظ فيديو واحد بعدة تنسيقات مختلفة:

* أدوات سطح المكتب: [FFmpeg](//ffmpeg.org/)
* تطبيقات واجهة المستخدم التصويرية: [Miro](//www.mirovideoconverter.com/) و[HandBrake](//handbrake.fr/) و[VLC](//www.videolan.org/)
* خدمات الترميز/تحويل الترميز على الإنترنت: [Zencoder](//en.wikipedia.org/wiki/Zencoder) و[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## التحقق من التنسيق المستخدم

هل تريد معرفة التنسيق الذي اختاره المتصفح بالفعل؟

في جافا سكريبت، يمكنك استخدام الخاصية `currentSrc` في الفيديو لعرض المصدر المستخدم.

للاطلاع على ذلك عمليًا، يمكنك الرجوع إلى {% link_sample _code/video-main.html %}هذا العرض التجريبي{% endlink_sample %}: يختار كل من Chrome وFirefox ما يلي `chrome.webm` (نظرًا لأنه الخيار الأول في قائمة المصادر الممكنة التي يتوافق معها هذان المتصفحان) بينما يختار Safari ما يلي `chrome.mp4`.



