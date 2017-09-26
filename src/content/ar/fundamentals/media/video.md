project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: تعرف على أسهل طرق إضافة الفيديو إلى موقعك وتأكد من ترك أفضل انطباع لدى المستخدمين على أي جهاز.


{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# الفيديو {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

يفضل المستخدمون مشاهدة مقاطع الفيديو نظرًا لأنها تمثل عنصر تسلية وإفادة. على أجهزة الجوّال، يمكن أن تكون مقاطع الجوّال الوسيلة الأسهل للاستفادة من المعلومات. إلا أن مقاطع الفيديو تستهلك معدل نقل بيانات، كما أنها لا تعمل بطريقة واحدة على جميع أنظمة التشغيل. لا يفضل المستخدمون الانتظار حتى تحميل مقاطع الفيديو، أو عند الضغط على التشغيل وعدم تلقي أي شيء. يمكنك الاطلاع على مزيد من المعلومات لمعرفة أسهل طرق إضافة فيديو إلى موقعك على الويب والتأكد من ترك أفضل انطباع لدى المستخدمين على أي جهاز.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## إضافة مقطع فيديو 




تعرف على أسهل طرق إضافة الفيديو إلى موقعك وتأكد من ترك أفضل انطباع لدى المستخدمين على أي جهاز.



### TL;DR {: .hide-from-toc }
- استخدم عنصر الفيديو لتحميل الفيديو على موقعك وفك ترميزه وتشغيله.
- اهتم بإنتاج الفيديو بعدة تنسيقات لتغطية نطاق واسع من أنظمة تشغيل الجوّال.
- عيِّن حجمًا مناسبًا للفيديو، وتأكد من عدم تجاوزه للحاويات.
- نظرًا لأهمية إمكانية الوصول، أضف عنصر المقطع الصوتي كفرع لعنصر الفيديو.


### إضافة عنصر الفيديو

أضف عنصر الفيديو لتحميل الفيديو على موقعك وفك ترميزه وتشغيله:

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>متصفحك ليس متوافقًا مع عنصر الفيديو.</p>
    </video>
    

### تحديد عدة تنسيقات ملفات

لا تعد جميع المتصفحات متوافقة مع تنسيقات الفيديو نفسها.
ويتيح العنصر `<source>` لك تحديد عدة تنسيقات في شكل نقاط رجوع في حالة عدم توافق متصفح المستخدم مع أحدها.
على سبيل المثال:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

عندما يحلل المتصفح علامات `<source>`، فإنه يستخدم السمة الاختيارية `type` للمساعدة في تحديد الملف المطلوب تنزيله وتشغيله. إذا كان المتصفح يتوافق مع WebM، فسيتم تشغيل chrome.webm، وإلا، فسيتم التحقق مما إذا كان يمكن تشغيل مقاطع فيديو MPEG-4.
يمكنك الاطلاع على <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a> لاستكشاف المزيد حول آلية عمل الفيديو والصوت على الويب.

يتميز هذا الأسلوب بالعديد من الميزات عن عرض نصوص برمجية مختلفة على HTML أو من جهة الخادم، خاصة على الجوّال:

* يمكن لمطوِّري البرامج إدراج التنسيقات بترتيب الأفضلية.
* يؤدي التبديل من جهة العميل الأصلي إلى خفض وقت الاستجابة؛ بحيث لا يتم إلا تقديم طلب واحد للحصول على المحتوى.
* يعد السماح للمتصفح باختيار تنسيق أمرًا أسهل وأسرع ويمكن الاعتماد عليه أكثر من استخدام قاعدة بيانات الدعم من جهة الخادم مع اكتشاف وكيل المستخدم.
* يساعد تحديد نوع مصدر كل ملف في تحسين أداء الشبكة؛ ويمكن للمتصفح اختيار مصدر الفيديو بدون الاضطرار إلى تنزيل جزء من الفيديو لإجراء `فحص` للتنسيق.

تعد جميع هذه النقاط ذات أهمية خاصة في سياقات الجوّال؛ حيث يعد معدل نقل البيانات ووقت الاستجابة العنصر الأهم، وغالبًا ما تكون قدرة المستخدم على الانتظار محدودة. 
ويمكن أن يؤدي عدم تضمين سمة النوع إلى التأثير في مستوى الأداء عندما تكون هناك عدة مصادر بأنواع غير متوافقة.

باستخدام أدوات مطوِّري متصفح الجوّال، يمكنك مقارنة نشاط الشبكة <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">مع سمات النوع</a> و<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">without type attributes</a>.
راجع كذلك رؤوس الاستجابة في أدوات مطوِّري المتصفح [للتأكد من أن الخادم يعرض نوع MIME المناسب](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)، وإلا فلن تعمل فحوصات نوع مصدر الفيديو.

### تحديد وقت بدء ووقت انتهاء

اهتم بتوفير معدل نقل البيانات وجعل الموقع يبدو أكثر سرعة في الاستجابة من خلال استخدام واجهة برمجة تطبيقات Media Fragments لإضافة وقت بدء ووقت انتهاء إلى عنصر الفيديو.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>

لإضافة قطاع وسائط، يمكنك إضافة `#t=[start_time][,end_time]` إلى عنوان URL للوسائط. على سبيل المثال، لتشغيل الفيديو من الثانية 5 إلى الثانية 10، يمكنك تحديد:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

يمكنك أيضًا استخدام واجهة برمجة تطبيقات Media Fragments لتقديم عدة عروض على مقطع الفيديو نفسه - مثل نقاط التلميح في DVD - بدون الاضطرار إلى ترميز عدة ملفات وعرضها.

Note: - تتوافق واجهة برمجة تطبيقات Media Fragments مع معظم أنظمة التشغيل، وليس iOS.
- تأكد من أن طلبات النطاق متوافقة مع خادمك. يتم تمكين طلبات النطاق افتراضيًا على معظم الخوادم، إلا أن بعض خدمات الاستضافة قد تعطلها.


باستخدام أدوات مطوِّري برامج المتصفح، راجع `Accept-Ranges: bytes` في رؤوس الاستجابة:

<img class="center" alt="Chrome Dev Tools screenshot: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### تضمين صورة ملصق

أضف سمة ملصق إلى عنصر الفيديو حتى تكون لدى المستخدمين فكرة عن المحتوى بمجرد تحميل العنصر، بدون الحاجة إلى تنزيل فيديو أو بدء التشغيل.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

كما يمكن أن يكون الملصق نقطة رجوع إذا تم خرق `src` في الفيديو أو لم يكن أي من تنسيقات الفيديو المقدمة متوافقة. التأثير السلبي الوحيد لصور الملصق هو وجود طلب ملف إضافي يستهلك جزءًا من معدل نقل البيانات ويتطلب العرض. للاطلاع على مزيد من المعلومات، راجع [Image optimization](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

وفي ما يلي مقارنة لمقطعي فيديو جنبًا إلى جنب أحدهما بدون صورة ملصق والآخر مزود بصورة ملصق، وقد وضعنا صورة الملصق على تدرج رمادي للإشارة إلى أنه لا يمثل الفيديو:

<img class="center" alt="Android Chrome screenshot, portrait: no poster" src="images/Chrome-Android-video-no-poster.png" class="attempt-left">
<img class="center" alt="Android Chrome screenshot, portrait: with poster" src="images/Chrome-Android-video-poster.png" class="attempt-right">
<div class="clearfix"></div>


## توفير خيارات بديلة لأنظمة التشغيل القديمة 




لا تتوافق جميع تنسيقات الفيديو على جميع أنظمة التشغيل. ويمكنك الاطلاع على التنسقات المتوافقة على أنظمة التشغيل الأساسية والتأكد من توافق الفيديو مع كل منها.



### الاطلاع على التنسيقات المتوافقة

يمكنك استخدام `canPlayType()` للبحث عن تنسيقات الفيديو المتوافقة. وتحتاج هذه الطريقة إلى وسيط سطر ثابت من `mime-type` وبرامج ترميز اختيارية للخروج بإحدى القيم التالية:

<table>
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


<table>
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


### إنتاج الفيديو بعدة تنسيقات

هناك الكثير من الأدوات التي تساعد في حفظ فيديو واحد بعدة تنسيقات مختلفة:

* أدوات سطح المكتب: [FFmpeg](//ffmpeg.org/)
* تطبيقات واجهة المستخدم التصويرية: [Miro](//www.mirovideoconverter.com/) و[HandBrake](//handbrake.fr/) و[VLC](//www.videolan.org/)
* خدمات الترميز/تحويل الترميز على الإنترنت: [Zencoder](//en.wikipedia.org/wiki/Zencoder) و[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### التحقق من التنسيق المستخدم

هل تريد معرفة التنسيق الذي اختاره المتصفح بالفعل؟

في جافا سكريبت، يمكنك استخدام الخاصية `currentSrc` في الفيديو لعرض المصدر المستخدم.

للاطلاع على ذلك عمليًا، يمكنك الرجوع إلى <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">هذا العرض التجريبي</a>: يختار كل من Chrome وFirefox ما يلي `chrome.webm` (نظرًا لأنه الخيار الأول في قائمة المصادر الممكنة التي يتوافق معها هذان المتصفحان) بينما يختار Safari ما يلي `chrome.mp4`.


## استخدام حجم الفيديو المناسب 




إذا كان الأمر يتعلق بترك انطباع جيد لدى المستخدمين، فيجب الاهتمام بحجم الفيديو.


### TL;DR {: .hide-from-toc }
- لا تعرض مقاطع فيديو حجم إطارها كبير أو أعلى جودة من الجودة التي يمكن لنظام التشغيل التعامل معها.
- احرص على ألا يكون مقطع الفيديو أطول من اللازم أبدًا.
- مقاطع الفيديو الطويلة قد تتسبب في حدوث حالات فواق للتنزيل والبحث؛ وقد يتعين على بعض المتصفحات الانتظار حتى يتم تنزيل الفيديو قبل بدء التشغيل.



### التحقق من حجم الفيديو

قد يختلف الحجم الفعلي لإطار الفيديو عن أبعاد عنصر الفيديو (كما هو الحال عندما لا تظهر الصورة باستخدام أبعادها الحقيقية).

وللتحقق من حجم ترميز الفيديو، يمكنك استخدام عنصر الفيديو `videoWidth` وخصائص `videoHeight`. يعرض كل من `width` و`height` أبعاد عنصر الفيديو التي ربما يكون تم تحديد حجمها باستخدام CSS أو سمات العرض والطول المضمَّنة.

### التأكد من عدم تجاوز مقاطع الفيديو لحدود الحاويات

عندما تكون عناصر الفيديو كبيرة جدًا مقارنة بإطار العرض، فقد يتم تجاوز حدود الحاوية، مما يجعل من المستحيل على المستخدم مشاهدة المحتوى أو استخدام
عناصر التحكم.

<img class="attempt-left" alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
<div style="clear:both;"></div>

يمكنك التحكم في أبعاد الفيديو باستخدام جافا سكريبت أو CSS. تتيح مكتبات جافا سكريبت والمكوِّنات الإضافية أيضًا مثل [FitVids](//fitvidsjs.com/) إمكانية الحفاظ على الحجم ونسبة العرض إلى الارتفاع المناسبة، حتى بالنسبة إلى مقاطع فيديو Flash من YouTube والصادر الأخرى.

يمكنك استخدام [استعلامات وسائط CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) لتحديد حجم العناصر بناءً على أبعاد إطار العرض؛ ويعتبر `max-width: 100%` الخيار الصديق.

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

بالنسبة إلى محتوى الوسائط في إطارات iframes (مثل مقاطع فيديو YouTube)، جرب طريقة الاستجابة السريعة (على غرار ما يقترحه جون سورداكوسكي](//avexdesigns.com/responsive-youtube-embed/)).

Note: لا تفرض حجمًا للعنصر قد يؤدي إلى نسبة عرض إلى ارتفاع مختلفة عن الفيديو الأصلي. ذلك أن التكديس أو التمديد قد يبدو أمرًا سيئًا.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

قارن <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">النموذج سريع الاستجابة</a> بـ <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">النسخة بطيئة الاستجابة</a>.


## تخصيص مشغِّل الفيديو 




تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. ويجب أن تهتم حلول الجوّال باتجاه الجهاز. استخدم واجهة برمجة تطبيقات Fullscreen للتحكم في عرض ملء الشاشة لمحتوى الفيديو.



تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. ويجب أن تهتم حلول الجوّال باتجاه الجهاز. استخدم واجهة برمجة تطبيقات Fullscreen للتحكم في عرض ملء الشاشة لمحتوى الفيديو.

### كيفية عمل اتجاه الجهاز على الأجهزة المختلفة

لا يمثل اتجاه الجهاز مشكلة لشاشات سطح المكتب أو أجهزة الكمبيوتر المحمول، إلا أنه يمثل أهمية كبيرة عند التفكير في تصميم لصفحة ويب على الجوّال والأجهزة اللوحية.

يؤدي متصفح Safari على iPhone مهمة رائعة من خلال التبديل بين الاتجاه العمودي والأفقي:

<img class="attempt-left" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPhone في الاتجاه العمودي" src="images/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPhone في الاتجاه الأفقي" src="images/iPhone-video-playing-landscape.png">
<div style="clear:both;"></div>

قد يتسبب اتجاه الجهاز على جهاز iPad وعلى Chrome لجهاز Android في حدوث مشكلات.
على سبيل المثال، بدون أي تخصيص، قد يظهر الفيديو الذي يتم تشغيله على جهاز iPad في الاتجاه الأفقي على النحو التالي:

<img class="center" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPad Retina في الاتجاه الأفقي"
src="images/iPad-Retina-landscape-video-playing.png">

يمكن أن يؤدي إعداد الفيديو `width: 100%` أو `max-width: 100%` مع CSS إلى حل العديد من مشكلات تنسيق اتجاه الجهاز. قد تحتاج أيضًا إلى التفكير في بدائل ملء الشاشة.

### العرض المضمَّن أو بملء الشاشة

تعرض أنظمة التشغيل المختلفة مقطع الفيديو على نحو مختلف. يعرض متصفح Safari على iPhone عنصر الفيديو مضمَّنًا على صفحة الويب، ولكن يشغِّل الفيديو في وضع ملء الشاشة:

<img class="center" alt="لقطة شاشة لعنصر الفيديو على iPhone في الاتجاه العمودي" src="images/iPhone-video-with-poster.png">

على Android، يمكن للمستخدمين طلب وضع ملء الشاشة من خلال النقر على رمز ملء الشاشة. ولكن الإعداد الافتراضي هو تشغيل الفيديو مضمَّنًا:

<img class="center" alt="لقطة شاشة لمقطع فيديو يعمل على متصفح Chrome لجهاز Android في الاتجاه العمودي" src="images/Chrome-Android-video-playing-portrait-3x5.png">

يشغِّل متصفح Safari على iPad الفيديو مضمَّنًا:

<img class="center" alt="لقطة شاشة لفيديو يعمل على متصفح Safari لجهاز iPad Retina في الاتجاه الأفقي" src="images/iPad-Retina-landscape-video-playing.png">

### التحكم في ملء الشاشة بالمحتوى

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
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>هذا المتصفح ليس متوافقًا مع عنصر الفيديو.</p>
</video>

للاطلاع على ذلك عمليًا، راجع <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">demo</a>.

Note: `requestFullScreen()` is currently vendor prefixed and may require extra code for full cross browser compatibility.


## المسائل المتعلقة بإمكانية الوصول 




لا تعد إمكانية الوصول ميزة. ذلك أن المستخدمين الذين لا يمكنهم السمع أو الرؤية لن يكون بإمكانهم تجربة الفيديو إطلاقًا بدون تسميات توضيحية أو أوصاف. ولا تستغرق إضافة هذه الميزات إلى الفيديو وقتًا أطول من الانطباع السيئ الذي سيشعر به المستخدمون. ولذلك يجب ترك انطباع أساسي على الأقل لدى جميع المستخدمين.


### تضمين التسميات التوضيحية لتحسين إمكانية الوصول

حتى تصبح الوسائط أسهل في الوصول على الجوَّال، يمكنك تضمين التسميات التوضيحية أو الأوصاف باستخدام عنصر المسار الصوتي.

Note: يتوافق عنصر المسار الصوتي على Chrome لنظام Android وiOS Safari وجميع المتصفحات الحالية على سطح المكتب باستثناء Firefox (راجع <a href="http://caniuse.com/track" title="حالة التوافق مع عنصر المسار الصوتي">caniuse.com/track</a>). هناك عدة ترميزات بوليفيل متاحة كذلك. نوصي باستخدام <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> أو <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

باستخدام عنصر المسار الصوتي، تظهر التسميات التوضيحية على النحو التالي:

<img class="center" alt="لقطة شاشة تعرض تسميات توضيحية تظهر باستخدام عنصر المسار الصوتي في Chrome على Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

### إضافة عنصر مسار صوتي

من السهل جدًا إضافة تسميات توضيحية إلى الفيديو؛ وذلك من خلال إضافة عنصر مسار صوتي كفرع لعنصر الفيديو:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

توفر سمة عنصر المسار الصوتي `src` موقع ملف المسار الصوتي.

### تحديد التسميات التوضيحية في ملف المسار الصوتي

يتضمن ملف المسار الصوتي `تلميحات` بالوقت بتنسيق WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    رجل يجلس على فرع شجرة ويستخدم جهاز كمبيوتر محمولاً.

    00:05.000 --> 00:08.000
    انكسر الفرع وبدأ الرجل في السقوط.

    ...


## مرجع سريع 




نظرة عامة سريعة حول الخواص على عنصر الفيديو.



### سمات عنصر الفيديو

للحصول على القائمة الكاملة بسمات عنصر الفيديو وتعريفاتها، يمكنك الاطلاع على [مواصفات عنصر الفيديو](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
      <th>السمة</th>
      <th>مدى التوفر</th>
      <th>الوصف</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="السمة"><code>src</code></td>
      <td data-th="مدى التوفر">جميع المتصفحات</td>
      <td data-th="الوصف">عنوان URL للفيديو.</td>
    </tr>
    <tr>
      <td data-th="السمة"><code>poster</code></td>
      <td data-th="مدى التوفر">جميع المتصفحات</td>
      <td data-th="الوصف">عنوان URL لملف الصورة التي يمكن للمتصفح عرضها بمجرد عرض عنصر الفيديو، بدون تنزيل محتوى الفيديو.</td>
    </tr>
    <tr>
      <td data-th="السمة"><code>preload</code></td>
      <td data-th="مدى التوفر">جميع متصفحات الجوّال تتجاهل التحميل المسبق (preload).</td>
      <td data-th="الوصف">تلميحات للمتصفح تشير إلى أهمية تحميل البيانات الوصفية (أو فيديو ما) مسبقًا للتشغيل. الخيارات المتوفرة `لا شيء` و`البيانات الوصفية` و`تلقائي` (راجع قسم التحميل المسبق للحصول على تفاصيل). </td>
    </tr>
    <tr>
      <td data-th="السمة"><code>autoplay</code></td>
      <td data-th="مدى التوفر">غير متوافقة على iPhone وAndroid وتتوافق مع جميع متصفحات أجهزة سطح المكتب وiPad وFirefox وOpera لنظام التشغيل Android.</td>
      <td data-th="Description">بدء التنزيل والتشغيل في أقرب وقت ممكن (راجع قسم التشغيل التلقائي). </td>
    </tr>
    <tr>
      <td data-th="السمة"><code>loop</code></td>
      <td data-th="مدى التوفر">جميع المتصفحات</td>
      <td data-th="الوصف">استدارة الفيديو.</td>
    </tr>
    <tr>
      <td data-th="السمة"><code>controls</code></td>
      <td data-th="مدى التوفر">جميع المتصفحات</td>
      <td data-th="الوصف">عرض عناصر التحكم الافتراضية في الفيديو (التشغيل والإيقاف مؤقتًا وما إلى ذلك).</td>
    </tr>
  </tbody>
</table>

#### التشغيل التلقائي

في أجهزة سطح المكتب، يطلب `autoplay` من المتصفح بدء تنزيل الفيديو وتشغيله في الحال وفي أقرب وقت ممكن. في أجهزة iOS وChrome لنظام Android، لا يعمل `autoplay`؛ ويتعين على المستخدمين النقر على الشاشة لتشغيل الفيديو.

حتى على أنظمة التشغيل التي يتم تمكين التشغيل التلقائي فيها، يجب التفكير جيدًا في جدوى تمكينه:

* قد يكون استخدام البيانات مكلفًا.
* يمكن أن يؤدي تنزيل الوسائط وبدء التشغيل بدون المطالبة إلى حدوث إسراف في معدل نقل البيانات واستهلاك وحدة المعالجة المركزية، ومن ثم قد يتأخر عرض الصفحة.
* قد يكون المستخدم في سياق يعتبر تشغيل الفيديو أو الصوت فيه أمرًا تطفليًا.

يمكن ضبط سلوك التشغيل التلقائي في Android WebView عبر [واجهة برمجة تطبيقات WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
يتم اختيار الإعداد الافتراضي على صواب ولكن يمكن لتطبيق WebView اختيار تعطيله.

#### التحميل المسبق

توفر السمة `preload` تلميحًا يعرف من خلاله المتصفح مقدار البيانات أو المحتوى الذي يجب تحميله مسبقًا.

<table>
  <thead>
    <tr>
      <th>القيمة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="القيمة"><code>none</code></td>
      <td data-th="الوصف">قد لا يشاهد المستخدم مقطع الفيديو &ndash; عدم تحميل أي شيء مسبقًا</td>
    </tr>
    <tr>
      <td data-th="القيمة"><code>metadata</code></td>
      <td data-th="الوصف">يجب تحميل البيانات الوصفية (المدة والأبعاد ومسارات النص) مسبقًا، ولكن بأصغر فيديو.</td>
    </tr>
    <tr>
      <td data-th="القيمة"><code>auto</code></td>
      <td data-th="الوصف">يُعتبر تنزيل الفيديو الكامل مباشرة أمرًا مفضلاً.</td>
    </tr>
  </tbody>
</table>

تتضمن السمة `preload` تأثيرات مختلفة على أنظمة التشغيل المختلفة.
على سبيل المثال، يخزن Chrome مقدار 25 ثانية من الفيديو على سطح المكتب، بينما لا يتم تخزين أي شيء على iOS وAndroid. وهذا يعني أنه على الجوّال، قد يتأخر البدء في التشغيل على العكس من أجهزة سطح المكتب. يمكنك الاطلاع على [صفحة اختبار Steve Souders](//stevesouders.com/tests/mediaevents.php) للحصول على التفاصيل الكاملة.

### جافا سكريبت

تقدم [مقالة The HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) ملخصًا رائعًا لخصائص جافا سكريبت والطرق والأحداث التي يمكن استخدامها في التحكم في تشغيل الفيديو. وقد ضمَّنا هذا المحتوى هنا، مع تحديثه بالمخاوف المتعلقة بالجوّال عند اللزوم.

#### الخصائص

<table>
  <thead>
    <th>الخاصية</th>
      <th>الوصف</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="الخاصية"><code>currentTime</code></td>
      <td data-th="الوصف">الحصول على موضع التشغيل بالثواني أو تعيينه.</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>volume</code></td>
      <td data-th="الوصف">الحصول على مستوى الصوت الحالي للفيديو أو تعيينه.</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>muted</code></td>
      <td data-th="الوصف">الحصول على كتم الصوت أو تعيينه.</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>playbackRate</code></td>
      <td data-th="الوصف">الحصول على معدل التشغيل، السرعة العادية هي 1 للأمام.</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>buffered</code></td>
      <td data-th="الوصف">معلومات حول مقدار الفيديو الذي يتم تخزينه وتجهيزه للتشغيل (راجع <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">العرض التجريبي</a>).</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>currentSrc</code></td>
      <td data-th="الوصف">عنوان الفيديو المطلوب تشغيله.</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>videoWidth</code></td>
      <td data-th="الوصف">عرض الفيديو بالبكسل (قد يكون مختلفًا عن عرض عنصر الفيديو).</td>
    </tr>
    <tr>
      <td data-th="الخاصية"><code>videoHeight</code></td>
      <td data-th="الوصف">طول الفيديو بالبكسل (قد يكون مختلفًا عن طول عنصر الفيديو).</td>
    </tr>
  </tbody>
</table>

لا يتوافق كل من playbackRate (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">راجع العرض التجريبي</a>) ومستوى الصوت على الجوّال.

#### الطرق

<table>
  <thead>
    <th>الطريقة</th>
    <th>الوصف</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="الطريقة"><code>load()</code></td>
      <td data-th="الوصف">حمِل مصدر الفيديو أو أعد تحميله بدون بدء التشغيل: على سبيل المثال، عندما يتم تغيير السمة src للفيديو باستخدام جافا سكريبت.</td>
    </tr>
    <tr>
      <td data-th="الطريقة"><code>play()</code></td>
      <td data-th="الوصف">تشغيل الفيديو من موقعه الحالي.</td>
    </tr>
    <tr>
      <td data-th="الطريقة"><code>pause()</code></td>
      <td data-th="الوصف">وقف الفيديو مؤقتًا في موقعه الحالي.</td>
    </tr>
    <tr>
      <td data-th="الطريقة"><code>canPlayType('format')</code></td>
      <td data-th="الوصف">التعرف على التنسيقات المتوافقة (راجع `التعرف على التنسيقات المتوافقة`).</td>
    </tr>
  </tbody>
</table>

على الجوّال (باستثناء Opera وAndroid) لا يعمل كل من play() وpause() ما لم
يتم طلب استجابة لإجراء المستخدم، مثل النقر على زر ما: راجع: see the <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">العرض التجريبي</a>. (وهكذا، لا يمكن بدء التشغيل للمحتوى مثل مقاطع فيديو YouTube المضمَّنة).

#### الأحداث

هناك مجموعة فرعية فقط من أحداث الوسائط التي يمكن تشغيلها. راجع صفحة [أحداث الوسائط](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) على شبكة مطوِّري برامج Mozilla للحصول على قائمة كاملة.

<table>
  <thead>
    <th>الحدث</th>
      <th>الوصف</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="الحدث"><code>canplaythrough</code></td>
      <td data-th="الوصف">يتم التشغيل عندما تتوفر بيانات كافية تفيد بأن المتصفح يعتقد أنه يمكن تشغيل الفيديو بالكامل بدون أعطال.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>ended</code></td>
      <td data-th="الوصف">يتم التشغيل عندما ينتهي تشغيل الفيديو.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>error</code></td>
      <td data-th="الوصف">يتم التشغيل عندما يظهر خطأ.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>playing</code></td>
      <td data-th="الوصف">يتم التشغيل عندما يبدأ تشغيل الفيديو لأول مرة بعد الإيقاف المؤقت أو عند إعادة التشغيل.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>progress</code></td>
      <td data-th="الوصف">يتم التشغيل من آن لآخر للإشارة إلى أن التنزيل قيد التقدم.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>waiting</code></td>
      <td data-th="الوصف">يتم التشغيل عندما يتأخر الإجراء في انتظار اكتمال إجراء آخر.</td>
    </tr>
    <tr>
      <td data-th="الحدث"><code>loadedmetadata</code></td>
      <td data-th="الوصف">يتم التشغيل عندما ينتهي المتصفح من تحميل البيانات الوصفية للفيديو: المدة والأبعاد والمسارات النصية.</td>
    </tr>
  </tbody>
</table>



