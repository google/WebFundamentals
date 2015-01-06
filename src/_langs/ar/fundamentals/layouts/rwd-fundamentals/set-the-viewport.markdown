---
layout: article
title: "تعيين إطار العرض"
description: "لم تتم تهيئة معظم محتوى الويب للعمل على هذه التجارب متعددة الأجهزة. إلا أنه يمكنك التعرف على أساسيات تصميم موقع ويب يمكنه العمل على أجهزة الجوّال وسطح المكتب وأي جهاز آخر يتضمن شاشة."
introduction: "يجب أن تتضمن الصفحات المحسنة للعمل على مجموعة متنوعة من الأجهزة عنصر meta viewport في رأس المستند.  وتوفر علامة meta viewport إرشادات المتصفح حول كيفية التحكم في أبعاد الصفحة وحجمها."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 1
authors:
  - petelepage
collection: rwd-fundamentals
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


{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.set-viewport %}

لمحاولة توفير أفضل انطباع، تعرض متصفحات الجوّال الصفحة بعرض شاشة سطح المكتب (عادة بحجم 980 بكسل، على الرغم من اختلاف ذلك باختلاف الأجهزة)، ثم تحاول عرض المحتوى بطريقة أفضل من خلال زيادة أحجام الخطوط وضبط حجم المحتوى ليتناسب مع الشاشة.  بالنسبة إلى المستخدمين، يعني هذا أن أحجام الخط قد تظهر بشكل ثابت وأنه يتعين النقر نقرًا مزدوجًا أو ضم الإصبعين والتفريج بينهما للتكبير ليتمكن المستخدم من الاطلاع على المحتوى والتفاعل معه.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


يؤدي استخدام قيمة meta viewport `width=device-width` إلى توجيه الصفحة لمطابقة عرض الشاشة مع وحدات بكسل المستقلة للجهاز. يتيح هذا للصفحة إعادة تدفيق المحتوى ليتطابق مع أحجام الشاشات المختلفة، سواء تم العرض على هاتف جوّال صغير أم شاشة جهاز سطح مكتب كبيرة.

<div class="clear">
  <div class="g--half">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="الصفحة التي لم يتم تعيين إطار عرض لها">
      انظر المثال
    {% endlink_sample %}
  </div>

  <div class="g--half g--last">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="الصفحة التي تم تعيين إطار عرض لها">
      انظر المثال
    {% endlink_sample %}
  </div>
</div>

تحافظ بعض المتصفحات على أن يكون عرض الصفحة ثابتًا عند التدوير إلى الوضع الأفقي، والتكبير/التصغير بدلاً من إعادة التدفق لملء الشاشة. تؤدي إضافة السمة `initial-scale=1` إلى توجيه المتصفحات لإنشاء علاقة من طرف إلى طرف بين وحدات بكسل في CSS ووحدات بكسل المستقلة للجهاز بغض النظر عن توجه الجهاز، كما يتيح ذلك للصفحة الاستفادة من العرض الأفقي الكامل.

{% include modules/remember.liquid inline="True" list=page.remember.use-commas %}

## ضمان إمكانية الدخول إلى إطار العرض

بالإضافة إلى تعيين `initial-scale`، يمكنك أيضًا تعيين السمات التالية على إطار العرض:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

عند تعيين ذلك، قد لا يتمكن المستخدم من تكبير/تصغير إطار العرض، وهو ما قد يؤدي إلى مشكلات في إمكانية الدخول.

{% include modules/nextarticle.liquid %}

{% endwrap %}

