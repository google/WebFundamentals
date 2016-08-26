project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: لا تعد إمكانية الوصول ميزة.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# المسائل المتعلقة بإمكانية الوصول {: .page-title }

{% include "_shared/contributors/TODO.html" %}



لا تعد إمكانية الوصول ميزة. ذلك أن المستخدمين الذين لا يمكنهم السمع أو الرؤية لن يكون بإمكانهم تجربة الفيديو إطلاقًا بدون تسميات توضيحية أو أوصاف. ولا تستغرق إضافة هذه الميزات إلى الفيديو وقتًا أطول من الانطباع السيئ الذي سيشعر به المستخدمون. ولذلك يجب ترك انطباع أساسي على الأقل لدى جميع المستخدمين.


## تضمين التسميات التوضيحية لتحسين إمكانية الوصول

حتى تصبح الوسائط أسهل في الوصول على الجوَّال، يمكنك تضمين التسميات التوضيحية أو الأوصاف باستخدام عنصر المسار الصوتي.

<!-- TODO: Verify note type! -->
Note: يتوافق عنصر المسار الصوتي على Chrome لنظام Android وiOS Safari وجميع المتصفحات الحالية على سطح المكتب باستثناء Firefox (راجع <a href="http://caniuse.com/track" title="حالة التوافق مع عنصر المسار الصوتي">caniuse.com/track</a>). هناك عدة ترميزات بوليفيل متاحة كذلك. نوصي باستخدام <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> أو <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

باستخدام عنصر المسار الصوتي، تظهر التسميات التوضيحية على النحو التالي:

 <img class="center" alt="لقطة شاشة تعرض تسميات توضيحية تظهر باستخدام عنصر المسار الصوتي في Chrome على Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## إضافة عنصر مسار صوتي

من السهل جدًا إضافة تسميات توضيحية إلى الفيديو؛ وذلك من خلال إضافة عنصر مسار صوتي كفرع لعنصر الفيديو:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

توفر سمة عنصر المسار الصوتي `src` موقع ملف المسار الصوتي.

## تحديد التسميات التوضيحية في ملف المسار الصوتي

يتضمن ملف المسار الصوتي `تلميحات` بالوقت بتنسيق WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    رجل يجلس على فرع شجرة ويستخدم جهاز كمبيوتر محمولاً.

    00:05.000 --> 00:08.000
    انكسر الفرع وبدأ الرجل في السقوط.

    ...



