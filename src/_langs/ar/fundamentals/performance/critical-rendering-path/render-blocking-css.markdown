---
layout: article
title: "CSS الذي يحظر العرض"
description: "يتم افتراضيًا التعامل مع CSS باعتباره موردًا لحظر العرض، أي أن المتصفح سيمنع عرض أي محتوى تمت معالجته حتى يتم إنشاء CSSOM. تأكد من أن CSS ليِّن، واعرضه في أسرع وقت ممكن، واستخدم أنواع الوسائط والاستعلامات لإلغاء حظر العرض."
introduction: "يتم افتراضيًا التعامل مع CSS باعتباره موردًا لحظر العرض، أي أن المتصفح سيمنع عرض أي محتوى تمت معالجته حتى يتم إنشاء CSSOM. تأكد من أن CSS ليِّن، واعرضه في أسرع وقت ممكن، واستخدم أنواع الوسائط والاستعلامات لإلغاء حظر العرض."
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  order: 3
collection: critical-rendering-path
authors:
  - ilyagrigorik
related-guides:
  media-queries:
    -
      title: استخدام استعلامات وسائط CSS للحصول على سرعة استجابة
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "تصميم الويب سريع الاستجابة"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - افتراضيًا، يتم التعامل مع CSS باعتباره موردًا لحظر العرض.
    - تتيح لنا أنواع الوسائط واستعلامات الوسائط وصف بعض موارد CSS باعتبارها لا تحظر العرض.
    - يتولى المتصفح تنزيل جميع موارد CSS، سواء أكانت تتبع سلوك الحظر أو عدم الحظر.
---
{% wrap content%}

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


في القسم السابق، رأينا أن مسار العرض الحرج يتطلب وجود كل من DOM وCSSOM لإنشاء شجرة العرض، وبذلك يحدث تأثير مهم في الأداء: **يعد كل من HTML وCSS موارد لحظر العرض.** يتميز HTML بالوضوح نظرًا لأنه بدون DOM لن نحصل على أي شيء لعرضه، ولكن قد يكون مطلب CSS أقل وضوحًا. ماذا يحدث إذا حاولنا عرض صفحة عادية بدون حظر العرض على CSS؟

{% include modules/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="clear">
  <div class="g--half">
    <b>NYTimes باستخدام CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes باستخدام CSS">

  </div>

  <div class="g--half g--last">
    <b>NYTimes بدون استخدام CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes بدون استخدام CSS">

  </div>
</div>

{% comment %}
<table>
<tr>
<td>NYTimes باستخدام CSS</td>
<td>NYTimes بدون استخدام CSS (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes باستخدام CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes بدون استخدام CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

يوضح المثال الوارد أعلاه موقع NYTimes باستخدام CSS وبدون استخدامه، وسبب حظر العرض حتى يصبح CSS متاحًا - ذلك أنه بدون CSS تكون الصفحة غير فعالة من حيث الاستخدام. وفي الحقيقة، تتم الإشارة إلى التجربة الموضحة جهة اليمين غالبًا باعتبارها `ظهورًا لمحتوى غير منسق` أو ما يُعرف اختصارًا باسم FOUC. ونتيجة لذلك، سيحظر المتصفح العرض حتى يتوفر كل من DOM وCSSOM.

> **_يعد CSS موردًا لحظر العرض، ويمكنك إسقاطه للبرنامج في أقرب وقت ممكن لتحسين وقت العرض الأول!_**

ولكن ماذا لو كانت لدينا بعض أنماط CSS مستخدمة بشروط معينة، على سبيل المثال عند طباعة الصفحة، أو عند عرضها على شاشة كبيرة؟ من الأفضل ألا نضطر إلى حظر العرض على هذه الموارد.

ويتيح لنا كل من `أنواع الوسائط` و`استعلامات الوسائط` في CSS التعامل مع حالات الاستخدام التالية:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

يتألف [استعلام الوسائط]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) من نوع وسائط وصفر أو أكثر من التعبيرات التي تتحقق من وجود شروط لميزات وسائط معينة. على سبيل المثال، لا يقدم إعلان ورقة الأنماط الأول أي نوع وسائط أو استعلام وسائط، ولذلك سيتم تطبيق جميع الحالات؛ بمعنى أنه سيتم حظر العرض دائمًا. وفي المقابل، لن تطبق ورقة الأنماط الثانية إلا عندما تتم طباعة المحتوى - وقد تحتاج إلى إعادة ترتيب التنسيق أو تغيير الخطوط أو غير ذلك - ولذلك لا تحتاج ورقة الأنماط هذه إلى حظر عرض الصفحة عند تحميلها لأول مرة. وفي النهاية، يقدم إعلان ورقة الأنماط الأخير `استعلام وسائط` يتم تنفيذه بواسطة المتصفح: إذا كانت الشروط متطابقة، فسيحظر المتصفح العرض حتى يتم تنزيل ومعالجة ورقة الأنماط.

باستخدام استعلامات الوسائط، يمكن تخصيص العرض التقديمي مع حالات استخدام معينة مثل العرض مقابل الطباعة، وكذلك مع شروط ديناميكية مثل التغييرات في اتجاه الشاشة وتغيير حجم الأحداث وغير ذلك الكثير. **عند الإعلان عن أصول ورقة الأنماط، اهتم جيدًا بنوع واستعلامات الوسائط، نظرًا لأن ذلك سيتضمن تأثيرًا كبيرًا على الأداء في مسار العرض الحرج.**

{% include modules/related_guides.liquid inline=true list=page.related-guides.media-queries %}

لنتناول بعض الأمثلة العملية:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="screen">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* يعد الإعلان الأول وسيلة لحظر العرض ويتطابق مع جميع الشروط.
* يعد الإعلان الثاني أيضًا وسيلة لحظر العرض: . يعد النوع الافتراضي هو `screen`، وإذا لم يتم تحديد أي نوع، فسيتم التعيين على `screen` بشكل واضح. ولذلك يتساوى كل من الإعلان الأول والثاني.
* يتضمن الإعلان الثالث استعلام وسائط ديناميكيًا سيتم تقييمه عندما يتم تحميل الصفحة. وبناءً على اتجاه الجهاز عند تحميل الصفحة، قد لا يكون portrait.css وسيلة لحظر العرض.
* لا يتم تطبيق الإعلان الأخير إلا عندما تتم طباعة الصفحة، ولذلك لا يكون وسيلة لحظر العرض عند تحميل الصفحة لأول مرة في المتصفح.

في النهاية، لاحظ أن `حظر العرض` لا يشير إلا إلى ما إذا كان المتصفح سيوقف العرض الأولي للصفحة على هذا المورد أم لا. وفي كلتا الحالتين، لن يتوقف تنزيل المتصفح لأصل CSS، على الرغم من الأولوية الدنيا للموارد التي لا تسبب الحظر.

{% include modules/nextarticle.liquid %}

{% endwrap%}

