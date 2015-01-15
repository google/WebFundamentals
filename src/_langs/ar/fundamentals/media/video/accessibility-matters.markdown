---
layout: article
title: "المسائل المتعلقة بإمكانية الوصول"
description: "لا تعد إمكانية الوصول ميزة."
introduction: "لا تعد إمكانية الوصول ميزة. ذلك أن المستخدمين الذين لا يمكنهم السمع أو الرؤية لن يكون بإمكانهم تجربة الفيديو إطلاقًا بدون تسميات توضيحية أو أوصاف. ولا تستغرق إضافة هذه الميزات إلى الفيديو وقتًا أطول من الانطباع السيئ الذي سيشعر به المستخدمون. ولذلك يجب ترك انطباع أساسي على الأقل لدى جميع المستخدمين."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 4
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - استخدم عنصر الفيديو لتحميل الفيديو على موقعك وفك ترميزه وتشغيله.
    - اهتم بإنتاج الفيديو بعدة تنسيقات لتغطية نطاق واسع من أنظمة تشغيل الجوّال.
    - عيِّن حجمًا مناسبًا للفيديو، وتأكد من عدم تجاوزه للحاويات.
    - نظرًا لأهمية إمكانية الوصول، أضف عنصر المقطع الصوتي كفرع لعنصر الفيديو.
remember:
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

{% wrap content%}

{% include modules/toc.liquid %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>


## تضمين التسميات التوضيحية لتحسين إمكانية الوصول

حتى تصبح الوسائط أسهل في الوصول على الجوَّال، يمكنك تضمين التسميات التوضيحية أو الأوصاف باستخدام عنصر المسار الصوتي.

{% include modules/remember.liquid title="تذكير" list=page.remember.accessibility-matters %}

باستخدام عنصر المسار الصوتي، تظهر التسميات التوضيحية على النحو التالي:

 <img class="center" alt="لقطة شاشة تعرض تسميات توضيحية تظهر باستخدام عنصر المسار الصوتي في Chrome على Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## إضافة عنصر مسار صوتي

من السهل جدًا إضافة تسميات توضيحية إلى الفيديو؛ وذلك من خلال إضافة عنصر مسار صوتي كفرع لعنصر الفيديو:

{% include_code _code/track.html track html %}

توفر سمة عنصر المسار الصوتي `src` موقع ملف المسار الصوتي.

## تحديد التسميات التوضيحية في ملف المسار الصوتي

يتضمن ملف المسار الصوتي `تلميحات` بالوقت بتنسيق WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    رجل يجلس على فرع شجرة ويستخدم جهاز كمبيوتر محمولاً.

    00:05.000 --> 00:08.000
    انكسر الفرع وبدأ الرجل في السقوط.

    ...

{% include modules/nextarticle.liquid %}

{% endwrap %}

