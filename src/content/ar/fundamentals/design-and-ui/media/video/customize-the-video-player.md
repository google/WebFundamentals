project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. ويجب أن تهتم حلول الجوّال باتجاه الجهاز. استخدم واجهة برمجة تطبيقات Fullscreen للتحكم في عرض ملء الشاشة لمحتوى الفيديو.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# تخصيص مشغِّل الفيديو {: .page-title }

{% include "_shared/contributors/TODO.html" %}



تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. ويجب أن تهتم حلول الجوّال باتجاه الجهاز. استخدم واجهة برمجة تطبيقات Fullscreen للتحكم في عرض ملء الشاشة لمحتوى الفيديو.



تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. ويجب أن تهتم حلول الجوّال باتجاه الجهاز. استخدم واجهة برمجة تطبيقات Fullscreen للتحكم في عرض ملء الشاشة لمحتوى الفيديو.

## كيفية عمل اتجاه الجهاز على الأجهزة المختلفة

لا يمثل اتجاه الجهاز مشكلة لشاشات سطح المكتب أو أجهزة الكمبيوتر المحمول، إلا أنه يمثل أهمية كبيرة عند التفكير في تصميم لصفحة ويب على الجوّال والأجهزة اللوحية.

يؤدي متصفح Safari على iPhone مهمة رائعة من خلال التبديل بين الاتجاه العمودي والأفقي:

<div class="mdl-grid">
    <img class="mdl-cell mdl-cell--6--col" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPhone في الاتجاه العمودي" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPhone في الاتجاه الأفقي" src="images/iPhone-video-playing-landscape.png">
</div>

قد يتسبب اتجاه الجهاز على جهاز iPad وعلى Chrome لجهاز Android في حدوث مشكلات.
على سبيل المثال، بدون أي تخصيص، قد يظهر الفيديو الذي يتم تشغيله على جهاز iPad في الاتجاه الأفقي على النحو التالي:

<img class="center" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPad Retina في الاتجاه الأفقي"
src="images/iPad-Retina-landscape-video-playing.png">

يمكن أن يؤدي إعداد الفيديو `width: 100%` أو `max-width: 100%` مع CSS إلى حل العديد من مشكلات تنسيق اتجاه الجهاز. قد تحتاج أيضًا إلى التفكير في بدائل ملء الشاشة.

## العرض المضمَّن أو بملء الشاشة

تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. يعرض متصفح Safari على iPhone عنصر الفيديو مضمَّنًا على صفحة الويب، ولكن يشغِّل الفيديو في وضع ملء الشاشة:

<img class="center" alt="لقطة شاشة لعنصر الفيديو على iPhone في الاتجاه العمودي" src="images/iPhone-video-with-poster.png">

على Android، يمكن للمستخدمين طلب وضع ملء الشاشة من خلال النقر على رمز ملء الشاشة. ولكن الإعداد الافتراضي هو تشغيل الفيديو مضمَّنًا:

<img class="center" alt="لقطة شاشة لمقطع فيديو يعمل على متصفح Chrome لجهاز Android في الاتجاه العمودي" src="images/Chrome-Android-video-playing-portrait-3x5.png">

يشغِّل متصفح Safari على iPad الفيديو مضمَّنًا:

<img class="center" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPad Retina في الاتجاه الأفقي" src="images/iPad-Retina-landscape-video-playing.png">

## التحكم في ملء الشاشة بالمحتوى

بالنسبة إلى أنظمة التشغيل التي لا تفرض تشغيل الفيديو بملء الشاشة، تكون واجهة برمجة تطبيقات Fullscreen [متوافقة على نطاق واسع](//caniuse.com/fullscreen). يمكنك استخدام واجهة برمجة التطبيقات هذه للتحكم في ملء الشاشة بالمحتوى، أو الصفحة.

لملء الشاشة بعنصر ما، مثل video:

    elem.requestFullScreen();
    

لملء الشاشة بالمستند بالكامل:

    document.body.requestFullScreen();
    

يمكنك أيضًا الاستماع إلى تغييرات حالة ملء الشاشة:

    video.addEventListener("fullscreenchange", handler);
    

كما يمكنك الاطلاع لمعرفة ما إذا كان العنصر في وضع ملء الشاشة حاليًا أم لا:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

يمكنك أيضًا استخدام الفئة الصورية `:fullscreen` في CSS لتغيير طريقة عرض العناصر في وضع ملء الشاشة.

على الأجهزة التي تتوافق مع واجهة برمجة تطبيقات Fullscreen، فكر في استخدام الصور المصغَّرة بمثابة عناصر نائبة للفيديو:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>

للاطلاع على ذلك عمليًا، راجع <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demo</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



