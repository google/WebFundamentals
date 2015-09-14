---
title: "مرجع سريع"
description: "نظرة عامة سريعة حول الخواص على عنصر الفيديو."
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
---

<p class="intro">
  نظرة عامة سريعة حول الخواص على عنصر الفيديو.
</p>

{% include shared/toc.liquid %}


## سمات عنصر الفيديو

للحصول على القائمة الكاملة بسمات عنصر الفيديو وتعريفاتها، يمكنك الاطلاع على [مواصفات عنصر الفيديو](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
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

### التشغيل التلقائي

في أجهزة سطح المكتب، يطلب `autoplay` من المتصفح بدء تنزيل الفيديو وتشغيله في الحال وفي أقرب وقت ممكن. في أجهزة iOS وChrome لنظام Android، لا يعمل `autoplay`؛ ويتعين على المستخدمين النقر على الشاشة لتشغيل الفيديو.

حتى على أنظمة التشغيل التي يتم تمكين التشغيل التلقائي فيها، يجب التفكير جيدًا في جدوى تمكينه:

* قد يكون استخدام البيانات مكلفًا.
* يمكن أن يؤدي تنزيل الوسائط وبدء التشغيل بدون المطالبة إلى حدوث إسراف في معدل نقل البيانات واستهلاك وحدة المعالجة المركزية، ومن ثم قد يتأخر عرض الصفحة.
* قد يكون المستخدم في سياق يعتبر تشغيل الفيديو أو الصوت فيه أمرًا تطفليًا.

يمكن ضبط سلوك التشغيل التلقائي في Android WebView عبر [واجهة برمجة تطبيقات WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
يتم اختيار الإعداد الافتراضي على صواب ولكن يمكن لتطبيق WebView اختيار تعطيله.

### التحميل المسبق

توفر السمة `preload` تلميحًا يعرف من خلاله المتصفح مقدار البيانات أو المحتوى الذي يجب تحميله مسبقًا.

<table class="mdl-data-table mdl-js-data-table">
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

## جافا سكريبت

تقدم [مقالة The HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) ملخصًا رائعًا لخصائص جافا سكريبت والطرق والأحداث التي يمكن استخدامها في التحكم في تشغيل الفيديو. وقد ضمَّنا هذا المحتوى هنا، مع تحديثه بالمخاوف المتعلقة بالجوّال عند اللزوم.

### الخصائص

<table class="mdl-data-table mdl-js-data-table">
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

لا يتوافق كل من playbackRate ({% link_sample _code/scripted.html %}راجع العرض التجريبي{% endlink_sample %}) ومستوى الصوت على الجوّال.

### الطرق

<table class="mdl-data-table mdl-js-data-table">
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
يتم طلب استجابة لإجراء المستخدم، مثل النقر على زر ما: راجع: see the {% link_sample _code/scripted.html %}العرض التجريبي{% endlink_sample %}. (وهكذا، لا يمكن بدء التشغيل للمحتوى مثل مقاطع فيديو YouTube المضمَّنة).

### الأحداث

هناك مجموعة فرعية فقط من أحداث الوسائط التي يمكن تشغيلها. راجع صفحة [أحداث الوسائط](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) على شبكة مطوِّري برامج Mozilla للحصول على قائمة كاملة.

<table class="mdl-data-table mdl-js-data-table">
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



