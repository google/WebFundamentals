---
layout: section
title: "أساسيات تصميم شبكة ويب سريعة الاستجابة"
description: "لم تتم تهيئة معظم محتوى الويب للعمل على هذه التجارب متعددة الأجهزة. إلا أنه يمكنك التعرف على أساسيات تصميم موقع ويب يمكنه العمل على أجهزة الجوّال وسطح المكتب وأي جهاز آخر يتضمن شاشة."
introduction: "تتزايد نسبة استخدام أجهزة الجوّال في تصفح الويب بقدر هائل، ولكن للأسف لم يتم تحسين قدر كبير من محتوى الويب بحيث يعمل على أجهزة الجوّال. وتواجه أجهزة الجوّال في بعض الأحيان قيودًا بسبب حجم الشاشة وتتطلب منهجًا مختلفًا لكيفية ظهور المحتوى على الشاشة."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
authors:
  - petelepage
id: rwd-fundamentals
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - يمكنك استخدام علامة meta viewport للتحكم في العرض وضبط إطار عرض المتصفحات.
    - ضمِّن <code>width=device-width</code> لمطابقة عرض الشاشة بوحدات بكسل المستقلة للجهاز.
    - ضمِّن <code>initial-scale=1</code> لإنشاء علاقة من طرف لطرف بين وحدات بكسل CSS ووحدات بكسل المستقلة للجهاز.
    - تأكد من أنه يمكن الوصول إلى الصفحة من خلال عدم تعطيل ضبط المستخدم.
  size-content-to-vp:
    - لا تستخدم عناصر عرض ثابتة وكبيرة.
    - يجب ألا يعتمد المحتوى على عرض معين لإطار العرض حتى يتم عرضه جيدًا.
    - استخدم طلبات بحث وسائط CSS لتطبيق تنسيقات مختلفة للشاشات الصغيرة والكبيرة.
  media-queries:
    - يمكن استخدام طلبات بحث الوسائط لتطبيق الأنماط بناءً على سمات الجهاز.
    - استخدم <code>min-width</code> على <code>min-device-width</code> للتأكد من تجربة البحث.
    - استخدم الأحجام النسبية للعناصر لتجنب حدوث أعطال في التنسيق.
  choose-breakpoints:
    - أنشئ نقاط الفصل بناءً على المحتوى، وليس بناءً على أجهزة أو منتجات أو علامات تجارية محددة.
    - ابدأ التصميم لأجهزة الجوّال الأصغر أولاً، ثم حسِّن التجربة شيئًا فشيئًا عند توفر مزيد من الشاشات.
    - حافظ على عدم تجاوز أسطر النصوص 70 أو 80 حرفًا كحد أقصى.
remember:
  use-commas:
    - استخدم فاصلة لفصل السمات لضمان تمكن المتصفحات القديمة من تحليل السمات تحليلاً سليمًا.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/oK09n_PGhTo?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

هناك عدد كبير من أحجام الشاشات المختلفة على الهواتف، وما بات يُعرف مؤخرًا باسم `فابلت` والأجهزة اللوحية وأجهزة سطح المكتب ووحدات التحكم في الألعاب وأجهزة التلفزيون والأجهزة القابلة للارتداء.  ستظل أحجام الشاشات في تغير دائم، ولذلك من الضروري أن يكون بإمكان موقعك التوافق مع أي حجم شاشة، اليوم وفي المستقبل.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

وقد ظهر تصميم الويب سريع الاستجابة، الذي وضع تعريفه الأصلي[إيثان ماركوت في مقالة A List Apart](http://alistapart.com/article/responsive-web-design/) ، ليلبي احتياجات المستخدمين والأجهزة التي يستخدمونها.  ويتغير التنسيق بتغير حجم الجهاز وإمكانياته.  على سبيل المثال، يظهر للمستخدمين على الهاتف المحتوى في طريقة عرض عمود واحد، وقد يعرض الجهاز اللوحي المحتوى نفسه في عمودين.

{% include modules/nextarticle.liquid %}

{% endwrap %}

