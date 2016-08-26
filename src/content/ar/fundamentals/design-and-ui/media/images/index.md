project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: يمكن للصورة أن تنوب عن 1000 كلمة، ولذلك تلعب الصور دورًا كبيرًا في أية صفحة. إلا أن وضع الصور يعني إضافة لعدد وحدات بايت التي يتم تنزيلها.  في تصميم الويب سريع الاستجابة، لا يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل الصور أيضًا.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# الصور {: .page-title }

{% include "_shared/contributors/TODO.html" %}



يمكن للصورة أن تنوب عن 1000 كلمة، ولذلك تلعب الصور دورًا كبيرًا في أية صفحة. إلا أن وضع الصور يعني إضافة لعدد وحدات بايت التي يتم تنزيلها.  في تصميم الويب سريع الاستجابة، لا يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل الصور أيضًا.


### الصور سريعة الاستجابة

لا يعني تصميم الويب سريع الاستجابة أنه يمكن للتنسيقات فقط التغير بناءً على سمات الجهاز، بل للمحتوى أيضًا.  على سبيل المثال، في الشاشات التي تتمتع بدقة عالية (2x)، يلزم توفر رسومات بدقة عالية أيضًا لضمان مستوى الحدة.  قد تعمل الصورة التي قيمة عرضها تساوي 50% على نحو جيد فقط عندما يكون عرض المتصفح 800 بكسل، إلا أنه سيكون لها تركة كبيرة على الهاتف الضيق، وستظل مشكلة استهلاك معدل كبير لنقل البيانات قائمة عندما يتم تقليل الحجم ليناسب الشاشات الصغيرة.

### الإخراج الفني

<img class="center" src="img/art-direction.png" alt="مثال على الإخراج الفني"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

المرات الأخرى التي قد تحتاج الصورة فيها إلى تغيير جذري: تغيير النسب والاقتصاص واستبدال الصورة بالكامل.  وفي هذه الحالة، يُشار إلى تغيير الصورة عادة باسم الإخراج الفني.  يمكنك الاطلاع على  [responsiveimages.org/demos/](http://responsiveimages.org/demos/) للحصول على مزيد من الأمثلة.


## Responsive Images
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="img/udacity-ri.jpg">
  </figure>
</div>

Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow.

[View Course](https://udacity.com/ud882){: .external }





