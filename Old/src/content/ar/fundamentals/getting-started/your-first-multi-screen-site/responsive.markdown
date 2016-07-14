---
title: "تصميم موقع ويب سريع الاستجابة"
description: "أصبح بإمكان عدد هائل من الأجهزة الوصول إلى شبكة الإنترنت بدءًا من الهواتف ذات الشاشة الصغيرة وانتهاءً بأجهزة التلفزيون ذات الشاشة الكبيرة. ويمكنك التعرف على كيفية تصميم موقع ويب يعمل جيدًا على جميع هذه الأجهزة."
key-takeaways:
  make-responsive:
    - استخدم إطار عرض دائمًا.
    - استخدم إطار عرض ضيقًا في البداية ثم اهتم بضبط الحجم بعد ذلك.
    - ضع نقاط فصل عند الحاجة إلى تكييف المحتوى.
    - ضع رؤية عالية المستوى للتنسيق على مستوى نقاط الفصل الأساسية.
translators:
related-guides:
  responsive:
    -
      title: تعيين نطاق العرض
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "تصميم الويب سريع الاستجابة"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: ضبط حجم المحتوى بالنسبة إلى إطار العرض
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "تصميم الويب سريع الاستجابة"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: استخدام طلبات بحث الوسائط
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "تصميم الويب سريع الاستجابة"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: أنماط التنسيق
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "أنماط التنسيق"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: المحتوى الذي يغلب عليه عدم الثبات
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "تصميم الويب سريع الاستجابة"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "تحسين imgs باستخدام srcset للعمل على الأجهزة مرتفعة نسبة DPI"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "الصور"
        href: media/images/
    -
      title: "استخدام طلبات بحث الوسائط لتوفير صور عالية الدقة أو إخراج فني"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "الصور"
        href: media/images/

notes:
  styling:
    - "افترضنا مجموعة من الأنماط التي تتضمن لونًا ومساحة متروكة ونمطًا للخط يتطابق مع إرشادات العلامة التجارية المتبعة لدينا."
  not-all-at-once:
    - "لن تضطر إلى نقل جميع العناصر مرة واحدة، ويمكنك إجراء تعديلات صغيرة عند اللزوم."
updated_on: 2014-04-23
---

<p class="intro">
  أصبح بإمكان عدد هائل من الأجهزة الوصول إلى شبكة الإنترنت بدءًا من الهواتف ذات الشاشة الصغيرة وانتهاءً بأجهزة التلفزيون ذات الشاشة الكبيرة. ويتضمن كل جهاز ميزاته وعيوبه الخاصة. وبصفتك أحد مطوِّري الويب، يجب أن تهتم بتصميم موقع يتوافق مع جميع أشكال الأجهزة.
</p>

{% include shared/toc.liquid %}

نحن بصدد تصميم موقع ويب يمكن استعراضه على أحجام شاشات مختلفة وأنواع أجهزة متنوعة. وفي  [المقالة السابقة]({{page.previousPage.relative_url}})، تمكنا من إعداد البنية المعلوماتية للصفحة وأنشأنا هيكلاً أساسيًا.
وفي هذا الدليل سنتناول الهيكل الأساسي مع المحتوى ونحوله إلى صفحة رائعة تكون سريعة  الاستجابة على عدد كبير من أحجام الشاشات.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="المحتوى">
    <figcaption>{% link_sample _code/content-without-styles.html %} المحتوى والهيكل {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} موقع الويب النهائي {% endlink_sample %} </figcaption>
  </figure>
</div>

وفقًا لمبادئ `تصميم ويب الجوّال لأول مرة`، سنبدأ باستخدام إطار العرض الضيق &mdash; كما هو الحال في الهاتف الجوّال &mdash; والتصميم لهذه التجربة أولاً.
بعد ذلك سنضبط الحجم بحيث يتناسب مع فئات الأجهزة الأكبر.
ويمكننا تنفيذ ذلك من خلال جعل إطار العرض أوسع واتخاذ قرار بشأن مدى ظهور التصميم والتنسيق على نحو سليم من عدمه.

سبق أن أنشأنا مجموعة مختلفة من تصميمات المستوى العالي لطريقة ظهور المحتوى. والآن يلزمنا ضبط الصفحة بحيث تتناسب مع هذه التنسيقات المختلفة.
وسنتمكن من تنفيذ ذلك من خلال اتخاذ قرار بشأن مكان نقاط الفصل &mdash; نقاط تغير التنسيق والأنماط &mdash; بناءً على مدى تناسب المحتوى مع حجم الشاشة.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## إضافة منفذ العرض

حتى مع الصفحة الأساسية، **يجب** دائمًا تضمين علامة إطار عرض وصفية.
ويعد إطار العرض المحتوى الأهم الذي يلزمك لتصميم تجارب تتناسب مع عدة أجهزة.
وبدون إطار العرض، لن يعمل موقعك على نحو جيد في جهاز الجوّال.

يشير إطار العرض إلى المتصفح الذي تحتاج إليه الصفحة ليتم ضبط حجمها بحيث تتناسب مع الشاشة.  وهناك العديد من التهيئات المختلفة التي يمكنك استخدامها في إطار العرض لضبط طريقة ظهور الصفحة.  إلا أننا نوصي باستخدام الإعدادات الافتراضية التالية:

{% include_code src=_code/viewport.html snippet=viewport %}

يظهر إطار العرض في رأس المستند ولن نحتاج إلى الإعلان عنه سوى مرة واحدة فقط.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## تطبيق التصميم البسيط

تتبع شركتنا في المنتج إرشادات علامة تجارية وخط محددة وموضحة في دليل الأسلوب.

### دليل الأسلوب

ويعد دليل الأسلوب أداة مفيدة تقدم شرحًا وافيًا لمظهر الصفحة، كما يساعدك في ضمان الحصول على أسلوب ثابت على مستوى التصميم.

#### الألوان

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### إضافة الصور الأسلوبية

أضفنا في الدليل السابق صورًا تُعرف باسم `صور المحتوى`.  وتتمثل أهمية هذه الصور في سردها لقصة المنتج.  ولا تكمن أهمية الصور الأسلوبية في أنها تمثل جزءًا من المحتوى الأساسي بل لأنها توفر عنصرًا مرئيًا أو دليلاً لتوجيه انتباه المستخدم إلى محتوى بعينه.

وهناك مثال معبر عن ذلك وهو صورة العنوان لمحتوى `الجزء المرئي من الصفحة`. هذا المحتوى يُستخدم غالبًا لإثارة المستخدم وتشجيعه على الاطلاع على مزيد من المعلومات حول المنتج.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="موقع الويب المصمم">
</div>

يمكن تضمينه ببساطة شديدة. وفي حالتنا هذه، سنستخدمه خلفية للعنوان ونضعه من خلال محتوى CSS بسيط.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

لقد اخترنا صورة خلفية بسيطة تم تعتيمها حتى لا تؤثر في المحتوى وتم تعيينها بحيث `تغطي` العنصر تمامًا؛ وبذلك سيتم تمديدها دائمًا مع الحفاظ على نسبة العرض إلى الارتفاع المناسبة.

<br style="clear: both;">

## تحديد نقطة الأولى

يبدأ التصميم في التأثر بشكل سلبي عند استخدام العرض 600 بكسل.  وفي حالتنا هذه، يتجاوز طول السطر 10 كلمات (الطول المثالي للقراءة) وهذا هو المكان الذي نريد تغييره.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>عذرًا، فمتصفحك لا يتوافق مع الفيديو.
     <a href="videos/firstbreakpoint.mov">تنزيل الفيديو</a>.
  </p>
</video>

يبدو أن القيمة 600 بكسل جيدة لإنشاء أول نقطة فصل لأنها ستمنحنا هدفًا لعناصر تغيير الموضع للوصول إلى وضع يتناسب مع الشاشة بشكل أفضل.  ويمكننا تنفيذ ذلك باستخدام تقنية تُعرف باسم [طلبات بحث الوسائط]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

توجد مساحة أكبر على الشاشة الكبيرة ولذلك فإنها توفر مرونة في كيفية ظهور المحتوى.

{% include shared/remember.liquid title="ملاحظة" list=page.notes.not-all-at-once %}

في سياق صفحة المنتج، سيبدو أننا سنحتاج إلى ما يلي:

*  تقييد الحد الأقصى لعرض التصميم.
*  تغيير ترك المساحة للعناصر وتقليل حجم النص.
*  نقل النموذج لتعويمه بحيث يحاذي محتوى العنوان.
*  تعويم الفيديو حول المحتوى.
*  تقليل حجم الصور وإظهارها في شبكة لطيفة.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## تقييد الحد الأقصى لعرض التصميم

لقد اخترنا أن يكون لدينا تنسيقان أساسيان هما: إطار العرض الضيق وإطار العرض الواسع، حتى نسهل عملية التصميم إلى حد كبير.

كما قررنا إنشاء أقسام بهوامش كاملة في إطار العرض الضيق لتظل بهوامش كاملة في إطار العرض الواسع.  وهذا يعني أنه يتعين علينا تقييد الحد الأقصى لعرض الشاشة حتى لا يتم توسيع النص والفقرات إلى سطر واحد طويل على الشاشات شديدة الاتساع.  لقد اخترنا أن تكون هذه النقطة 800 بكسل تقريبًا.

ولتحقيق ذلك، يلزمنا تقييد عرض العناصر ومركزها.  ويجب إنشاء حاوية حول كل قسم كبير وتطبيق `هامش:
تلقائي`. وسيتيح هذا نمو الشاشة، ولكن سيظل المحتوى متركزًا وبحد أقصى للحجم لا يتجاوز 800 بكسل.

وستكون الحاوية عنصر `div` بسيطًا في النموذج التالي:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## تغيير المساحة المتروكة وتقليل حجم النص

في إطار العرض الضيق، لا تتوفر لدينا مساحة كبيرة لعرض المحتوى، ولذلك يكون حجم الطباعة ووزنها في الغالب قد تم خفضه بنسبة كبيرة ليناسب الشاشة.

أما في إطار العرض الكبير، فيجب أن نضع في الاعتبار احتمال استخدام المستخدم لشاشة كبيرة ولكن بنسبة أعلى.  ولزيادة إمكانية قراءة المحتوى، يمكننا تكبير حجم الطباعة ووزنها، كما يمكننا تغيير المساحة المتروكة لتمييز مناطق محددة على نحو أكبر.

في صفحة المنتج، سنزيد المساحة المتروكة لعناصر القسم من خلال تعيينها لتبقى عند القيمة 5% من العرض.  كما سنزيد حجم رؤوس الصفحة لكل قسم من الأقسام.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## ضبط العناصر على إطار العرض الواسع

كان إطار العرض الضيق الذي استخدمناه شاشة خطية مكدسة.  وقد تم عرض كل قسم ومحتوى رئيسي داخله بترتيب من أعلى لأسفل.

ويوفر لنا إطار العرض الواسع مساحة أكبر يمكن استخدامها لعرض المحتوى بالطريقة المثلى بالنسبة إلى الشاشة.  وبالنسبة إلى صفحة المنتج، يعني هذا أنه وفقًا للبنية المعلوماتية يمكننا تنفيذ ما يلي:

*  نقل النموذج حول معلومات رأس الصفحة.
*  وضع الفيديو يمين النقاط الرئيسية.
*  ترتيب الصور.
*  توسيع الجدول.

### تعويم عنصر النموذج

يشير إطار العرض الضيق إلى أن لدينا المساحة الأفقية المتوفرة لدينا أقل لوضع العناصر على الشاشة بطريقة مريحة.

وللوصول إلى طريقة استخدام أكثر كفاءة لمساحة الشاشة الأفقية، يلزمنا تقسيم التدفق الخطي لرأس الصفحة ونقل النموذج والقائمة بحيث يصير كل منهما بجانب الآخر.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>عذرًا، فمتصفحك لا يتوافق مع الفيديو.
     <a href="videos/floatingform.mov">تنزيل الفيديو</a>.
  </p>
</video>

### تعويم عنصر الفيديو

تم تصميم الفيديو في إطار العرض الضيق ليصبح العرض الكامل للشاشة ولوضعه بعد قائمة الميزات الرئيسية. على إطار العرض الواسع، سيتم ضبط حجم الفيديو ليصبح كبيرًا جدًا وليظهر على نحو غير سليم عند وضعه بجوار قائمة الميزات.

يجب نقل عنصر الفيديو خارج التدفق العمودي لإطار العرض الضيق ويجب عرضه جنبًا إلى جنب مع القائمة النقطية للمحتوى على إطار عرض واسع.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### ترتيب الصور

يتم تعيين الصور في واجهة إطار العرض الضيق (أجهزة الجوال غالبًا) لتظهر بالعرض الكامل للشاشة وبشكل عمودي مكدس.  ولن يتم ضبط حجم ذلك جيدًا على إطار العرض الواسع.

وحتى تظهر الصور على نحو سليم في إطار العرض الواسع، يتم تعيين حجمها على 30% من عرض الحاوية ويتم وضعها أفقيًا (وليس عموديًا في إطار العرض الضيق). سنضيف كذلك نصف قطر للحد وظلاً مربعًا لجعل الصور تبدو أكثر جاذبية.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### جعل الصور أكثر سرعة في الاستجابة لمستوى عدد النقاط في البوصة

عند استخدام الصور، يجب وضع حجم إطار العرض وكثافة العرض في الاعتبار.

وقد تم تصميم شبكة الويب ليتم عرضها على الشاشات التي يبلغ مستوى عدد النقاط في البوصة بها 96 نقطة في البوصة.  وبعد ظهور أجهزة الجوّال، شاهدنا زيادة كبيرة في كثافة البكسل على الشاشات، بغض النظر عن الشاشات من الفئة Retina على أجهزة الكمبيوتر المحمول.  ولذلك تظهر الصور التي يتم ترميزها باستخدام 96 نقطة في البوصة على نحو غير مريح في الأجهزة مرتفعة نسبة DPI.

وقد توصلنا إلى حل لم يتم تطبيقه على نطاق واسع بعد.
بالنسبة إلى المتصفحات التي تتوافق مع ذلك، يمكنك عرض الصور ذات الكثافة العالية على شاشة ذات كثافة عالية.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### الجداول

من الصعوبة إلى حد كبير ظهور الجداول على نحو جيد على الأجهزة التي تتضمن إطار عرض ضيقًا ويجب الاهتمام بها اهتمامًا خاصًا.

ونوصي عند استخدام إطار عرض ضيق أن يكون الجدول في شكل صفين، مع عرض العنوان والخلايا في صف للحصول على الشكل العمودي.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>عذرًا، فمتصفحك لا يتوافق مع الفيديو.
     <a href="videos/responsivetable.mov">تنزيل الفيديو</a>.
  </p>
</video>

في موقعنا، كان يتعين علينا إنشاء نقطة فصل إضافية لمحتوى الجدول فقط.
وعند التصميم لجهاز جوّال أولاً، يكون من الصعب التراجع عن الأنماط المستخدمة، ولذلك يجب تقسيم جدول إطار العرض الضيق CSS  من إطار العرض الواسع css.
وبذلك نحصل على فصل واضح وثابت.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## الملخص

**تهانينا.** إذا وصلت إلى هذه الأسطر، فهذا يعني أنك أنشأت أول صفحة مقصودة بسيطة للمنتج يمكن عرضها على عدد كبير من الأجهزة، وكذلك عناصر النموذج وأحجام الشاشات.

وعند اتباع الإرشادات التالية، سيكون بإمكانك وضع قدميك على بداية موفقة:

1.  إنشاء بنية معلوماتية أساسية واستيعاب المحتوى قبل الترميز.
2.  تعيين إطار عرض دائمًا.
3.  إنشاء التجربة الأساسية حول مبدأ `الجوّال أولاً`.
4.  بعد أن تكون لديك تجربة الجوّال، يمكنك زيادة عرض الشاشة حتى لا تظهر على نحو سليم، ومن ثم يمكنك تعيين نقطة فصل.
5.  واصل التجربة والتعديل.
