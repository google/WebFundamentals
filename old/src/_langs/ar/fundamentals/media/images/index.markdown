---
layout: section
title: "الصور"
description: "يمكن للصورة أن تنوب عن 1000 كلمة، ولذلك تلعب الصور دورًا كبيرًا في أية صفحة. إلا أن وضع الصور يعني إضافة لعدد وحدات بايت التي يتم تنزيلها.  في تصميم الويب سريع الاستجابة، لا يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل الصور أيضًا."
introduction: "يمكن للصورة أن تنوب عن 1000 كلمة، ولذلك تلعب الصور دورًا كبيرًا في أية صفحة. إلا أن وضع الصور يعني إضافة لعدد وحدات بايت التي يتم تنزيلها.  في تصميم الويب سريع الاستجابة، لا يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل الصور أيضًا."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
id: images
key-takeaways:
  use-right-image:
    - استخدم أفضل صورة مع ميزات العرض، وفكر في حجم الشاشة ودقة الجهاز وتنسيق الصفحة.
    - غير العنصر <code>background-image</code> في CSS للحصول على عرض مرتفع نسبة DPI باستخدام استعلامات الوسائط مع <code>min-resolution</code> و<code>-webkit-min-device-pixel-ratio</code>.
    - استخدم  srcset لتوفير صور عالية الدقة بالإضافة إلى صورة 1x في الترميز.
    - فكر جيدًا في تكاليف الأداء عند استخدام تقنيات لاستبدال صورة جافا سكريبت أو عند عرض صور عالية الدقة مضغوطة إلى حد كبير على الأجهزة ذات الدقة الأقل.
  avoid-images:
    - تجنب الصور قدر الإمكان، وجرب بدلاً من ذلك استغلال إمكانيات المتصفح من خلال استخدام أحرف ترميز موحد مكان الصور واستبدل الرموز المعقدة بخطوط رموز.
  optimize-images:
    - احذر الاختيار العشوائي لتنسيق الصورة، واستوعب جيدًا التنسيقات المختلفة المتاحة واستخدم أفضل تنسيق مناسب.
    - ضمِّن أدوات تحسين الصور وضغطها في خطوات العمل لتقليل حجم الملفات.
    - قلل عدد طلبات http من خلال وضع الصور شائعة الاستخدام في نقوش متحركة.
    - جرب تحميل الصور بعد تمريرها في العرض فقط لتحسين وقت التحميل الأول للصور وخفض الوزن الأول للصفحة.
remember:
  compressive:
    - توخ الحذر بشأن الأسلوب المضغوط نظرًا للتكاليف الزائدة التي يتسبب فيها بسبب الذاكرة وإلغاء الترميز.  يعد تغيير حجم الصور الكبيرة لتناسب الشاشات الصغيرة أمرًا مكلفًا وقد يتسبب في إزعاج خاصة على الأجهزة محدودة التكلفة حيث يكون كل من الذاكرة والمعالج محدودين.
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
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

{% comment %}
<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>
{% endcomment %}

### الصور سريعة الاستجابة

لا يعني تصميم الويب سريع الاستجابة أنه يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل للمحتوى أيضًا.  على سبيل المثال، في الشاشات التي تتمتع بدقة عالية (2x)، يلزم توفر رسومات بدقة عالية أيضًا لضمان مستوى الحدة.  قد تعمل الصورة التي قيمة عرضها تساوي 50% على نحو جيد فقط عندما يكون عرض المتصفح 800 بكسل، إلا أنه سيكون لها تركة كبيرة على الهاتف الضيق، وستظل مشكلة استهلاك معدل كبير لنقل البيانات قائمة عندما يتم تقليل الحجم ليناسب الشاشات الصغيرة.

### الإخراج الفني

<img class="center" src="img/art-direction.png" alt="مثال على الإخراج الفني"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

المرات الأخرى التي قد تحتاج الصورة فيها إلى تغيير جذري: تغيير النسب والاقتصاص واستبدال الصورة بالكامل.  وفي هذه الحالة، يُشار إلى تغيير الصورة عادة باسم الإخراج الفني.  يمكنك الاطلاع على  [responsiveimages.org/demos/](http://responsiveimages.org/demos/) للحصول على مزيد من الأمثلة.

{% include modules/udacity.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}

{% include modules/nextarticle.liquid %}

{% endwrap %}

