---
layout: article
title: "إنشاء المحتوى والهيكل"
description: "يعد المحتوى أهم عناصر أي موقع على الويب. وسنستعرض في هذا الدليل كيفية التخطيط لتصميم موقعك على الويب بحيث يتوافق لأول مرة مع عدة أجهزة."
introduction: " يعد المحتوى أهم عناصر أي موقع على الويب. لذا يجب الاهتمام بالتصميم لصالح المحتوى وعدم الامتثال لإملاءات التصميم على المحتوى. نتناول خلال هذا الدليل المحتوى المطلوب وكيفية إنشاء هيكل للصفحة يتناسب مع المحتوى، كما نعرض الصفحة بتنسيق خطي بسيط يتناسب مع إطارات العرض الواسعة والضيقة."
notes:
  styling:
    - سيأتي التصميم في وقت لاحق
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
id: multi-screen-content
collection: multi-screen
authors:
  - paulkinlan
translators:
related-guides:
  create-amazing-forms:
    -
      title: إنشاء نماذج رائعة
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "النماذج"
        href: fundamentals/input/form/
    -
      title: إدخال التصنيف والاسم على نحو سليم
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "النماذج"
        href: fundamentals/input/form/
    -
      title: اختيار نوع الإدخال الأفضل
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "النماذج"
        href: fundamentals/input/form/
  video:
    -
      title: الاستخدام الفعال للفيديو
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "الفيديو"
        href: fundamentals/media/
    -
      title: تغيير موضع البدء
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "الفيديو"
        href: fundamentals/media/
    -
      title: تضمين صورة ملصق
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "الفيديو"
        href: fundamentals/media/
  images:
    -
      title: الاستخدام الفعال للصور
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "الصور"
        href: fundamentals/media/
    -
      title:  الاستخدام الصحيح للصور في الترميز
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "الصور"
        href: fundamentals/media/
    -
      title: تحسين الصور
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "الصور"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - حدد المحتوى المطلوب أولاً.
    - صمم البنية المعلوماتية (IA) لإطارات العرض الواسعة والضيقة.
    - أنشئ عرضًا هيكليًا للصفحة مع المحتوى ولكن بدون تنسيق.
---

{% wrap content %}

{% include modules/toc.liquid %}

## إنشاء هيكل الصفحة

في ما يلي الأشياء التي نحتاج إليها:

1.  مساحة تصف المنتج الذي نقدمه وهو دورة `CS256: تصميم الويب للجوّال` على مستوى عالٍ
2.  نموذج لجمع المعلومات من المستخدمين المهتمين بالمنتج
3.  وصف ومقطع فيديو تفصيلي
4.  صور المنتج في الواقع
5.  جدول بيانات يتضمن معلومات تؤيد ما نقوله

{% include modules/takeaway.liquid list=page.key-takeaways.content-critical %}

كما توصلنا إلى بنية معلوماتية تقريبية وتنسيق لإطارات العرض الواسعة والضيقة على حد سواء.

<div class="demo clear" style="background-color: white;">
  <img class="g-wide--1 g-medium--half" src="images/narrowviewport.png" alt="البنية المعلوماتية لإطار العرض الضيق">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/wideviewport.png" alt="البنية المعلوماتية لإطار العرض الواسع">
</div>

يمكن تحويل ذلك بسهولة إلى أقسام تقريبية لصفحة الهيكل التي سنستخدمها في الجزء المتبقي من المشروع.

{% include_code _code/addstructure.html structure %}

## إضافة محتوى إلى الصفحة

اكتمل الهيكل الأساسي للموقع. ونحن نعرف الأقسام التي نحتاج إليها والمحتوى المطلوب عرضه في هذه الأقسام والمكان الذي يمكن وضعه فيه ضمن البنية العامة للمعلومات. والآن يمكننا بدء تصميم موقع الويب.

{% include modules/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### إنشاء العنوان والنموذج

يعد كل من العنوان ونموذج إشعار الطلب المكوِّن الأهم للصفحة. ويجب أن يتمكن المستخدم من الاطلاع عليهما في الحال.

في العنوان، يمكنك إضافة نموذج نص يصف الدورة:

{% include_code _code/addheadline.html headline %}

كما نحتاج إلى ملء النموذج.
سيكون نموذجًا بسيطًا يجمع أسماء المستخدمين وأرقام هواتفهم والوقت المناسب لإعادة الاتصال بهم.

يجب أن تتضمن جميع النماذج عناوين وعلامات موضعية تسهل على المستخدمين التركيز على العناصر واستيعاب ما يجب أن تتضمنه ولمساعدة أدوات سهولة الوصول أيضًا في استيعاب بنية النموذج.  لا تتوقف أهمية سمة الاسم على إرسال قيمة النموذج إلى الخادم، بل يمكن استخدامها أيضًا في توفير تلميحات مهمة للمتصفح حول كيفية ملء النموذج للمستخدم تلقائيًا.

سنضيف أنواعًا دلالية لنسهل على المستخدمين الوصول إلى المحتوى على أجهزة الجوّال بسرعة.  على سبيل المثال، عند إدخال رقم هاتف، يجب ألا يظهر للمستخدم سوى لوحة اتصال فقط.

{% include_code _code/addform.html form %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### إنشاء قسم الفيديو والمعلومات

سيتضمن قسم الفيديو والمعلومات في المحتوى مزيدًا من التعمق.
سيتضمن قائمة نقطية بميزات المنتجات، كما يتضمن علامة موضعية للفيديو تعرض المنتج أثناء عمله للمستخدم.

{% include_code _code/addcontent.html section1 %}

يتم كثيرًا الاستعانة بمقاطع الفيديو لوصف المحتوى بطريقة أكثر تفاعلاً، كما يتم استخدامها كثيرًا لتقديم عرض توضيحي للمنتج أو الفكرة.

ويضمن لك اتباع أفضل الممارسات سهولة دمج الفيديو في موقعك على الويب:

*  إضافة سمة `علامات التحكم` لتسهيل مشاهدة الفيديو على المستخدمين.
*  إضافة صورة `الملصق` لتوفير معاينة المحتوى للمستخدمين.
*  إضافة عدة عناصر `<source>` بناءً على تنسيقات الفيديو المتوفرة.
*  إضافة نص تراجع يسمح للمستخدمين بتنزيل الفيديو إذا لم يكن بإمكانهم تشغيله في النافذة.

{% include_code _code/addvideo.html video html %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.video %}

### إنشاء قسم الصور

قد تبدو المواقع التي لا تتضمن صورًا مملة بعض الشيء. وهناك نوعان من الصور:

*  صور المحتوى &mdash; هي صور تتناسب مع المستند ويتم استخدامها في توفير مزيد من المعلومات حول المحتوى.
*  الصور الأسلوبية &mdash; هي صور يتم استخدامها لإضفاء طابع أفضل على الصور، وغالبًا ما تكون صور خلفية وأنماطًا وتدرجات.  سنتناول ذلك في [المقالة التالية]({{site.baseurl}}{{page.article.next.url}}).

يتضمن قسم الصور في صفحتنا مجموعة من صور المحتوى.

وتكمن أهمية صور المحتوى في إمكانية استخدامها لتوضيح المقصود من الصفحة. ويمكنك النظر إلى هذه الصور باعتبارها مقالات صحفية. وتعد الصور التي نستخدمها صور دروس المدرسين المشاركين في المشروع: كريس ويلسون وبيتر لوبيرز وسيان بينيت.

{% include_code _code/addimages.html images html %}

وقد تم تعيين الصور بحيث تظهر بعرض 100% من الشاشة. ويتناسب هذا مع الأجهزة ذات إطار العرض الضيق، بينما يكون أقل جودة مع إطار العرض الواسع (مثل جهاز سطح المكتب).  وسنتناول ذلك في قسم التصميم سريع الاستجابة.

{% include modules/related_guides.liquid inline=true list=page.related-guides.images %}

لا تتوفر لدى العديد من المستخدمين إمكانية الاطلاع على الصور وغالبًا ما يستخدمون تكنولوجيا مساعدة مثل قارئ الشاشة لتحليل البيانات التي تظهر على الصفحة وينقلون ذلك إلى المستخدم شفهيًا.  ولذلك يجب التأكد من أن جميع صور المحتوى تتضمن علامة `alt` الوصفية التي يمكن لقارئ الشاشة قراءتها للمستخدم.

وعند إضافة العلامات `alt`، يجب التأكد من أن جميع نصوص alt مختصرة قدر الإمكان لوصف الصورة وصفًا شاملاً.  على سبيل المثال، نستخدم التنسيق البسيط `الاسم: الدور` مع السمة في العرض التوضيحي لنوفر للمستخدم معلومات كافية يعرف من خلالها أن هذا القسم يتناول المؤلفين ومهامهم.

### إضافة قسم البيانات المجدولة

يتناول القسم الأخير جدولاً بسيطًا يُستخدم في عرض إحصاءات معينة حول المنتج.

ويجب عدم استخدام الجداول إلا مع البيانات المجدولة، مثل قوالب المعلومات.

{% include_code _code/addcontent.html section3 %}

### إضافة تذييل صفحة

تحتاج معظم مواقع الويب إلى تذييل صفحة لعرض محتوى مثل `البنود والشروط` و`إخلاء المسؤولية` وغير ذلك من المحتوى الذي لا يكون مستهدفًا وضعه في قائمة التنقل الرئيسية أو في منطقة المحتوى الرئيسي للصفحة.

وفي موقعنا على الويب، سنكتفي بوضع رابط إلى البنود والشروط وصفحة الاتصال وملفاتنا الشخصية على الشبكات الاجتماعية.

{% include_code _code/addcontent.html footer %}

## ملخص

لقد أنشأنا مخططًا لموقع الويب وحددنا جميع العناصر الرئيسية لهيكل الموقع.  كما تأكدنا من أن جميع المحتوى وثيق الصلة قد أصبح جاهزًا لتلبية احتياجات نشاطنا التجاري.

<div class="clear">
  <img class="g-wide--2 g-medium--half" src="images/content.png" alt="محتوى" style="max-width: 100%;">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/narrowsite.png" alt="" style="max-width: 100%;">
</div>

ستلاحظ أن الصفحة لا تبدو مطمئنة في الوقت الحالي؛ ولكن هناك غرض من ذلك. 
يعد المحتوى أهم عنصر من عناصر موقع الويب، ويجب أن نتأكد من أن بنية المعلومات المقدمة والكثافة تتميز بالثبات. حصلنا من خلال هذا الدليل على أساس ممتاز يمكن الاعتماد عليه. وسنهتم في الدليل التالي بوضع تنسيق المحتوى.

{% include modules/nextarticle.liquid %}

{% endwrap %}

