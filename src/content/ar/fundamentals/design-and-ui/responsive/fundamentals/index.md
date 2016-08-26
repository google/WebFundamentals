project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: لم تتم تهيئة معظم محتوى الويب للعمل على هذه التجارب متعددة الأجهزة. إلا أنه يمكنك التعرف على أساسيات تصميم موقع ويب يمكنه العمل على أجهزة الجوّال وسطح المكتب وأي جهاز آخر يتضمن شاشة.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# أساسيات تصميم شبكة ويب سريعة الاستجابة {: .page-title }

{% include "_shared/contributors/TODO.html" %}


تتزايد نسبة استخدام أجهزة الجوّال في تصفح الويب بقدر هائل، ولكن للأسف لم يتم تحسين قدر كبير من محتوى الويب بحيث يعمل على أجهزة الجوّال. وتواجه أجهزة الجوّال في بعض الأحيان قيودًا بسبب حجم الشاشة وتتطلب منهجًا مختلفًا لكيفية ظهور المحتوى على الشاشة.


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }



هناك عدد كبير من أحجام الشاشات المختلفة على الهواتف، وما بات يُعرف مؤخرًا باسم `فابلت` والأجهزة اللوحية وأجهزة سطح المكتب ووحدات التحكم في الألعاب وأجهزة التلفزيون والأجهزة القابلة للارتداء.  ستظل أحجام الشاشات في تغير دائم، ولذلك من الضروري أن يكون بإمكان موقعك التوافق مع أي حجم شاشة، اليوم وفي المستقبل.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

وقد ظهر تصميم الويب سريع الاستجابة، الذي وضع تعريفه الأصلي[إيثان ماركوت في مقالة A List Apart](http://alistapart.com/article/responsive-web-design/) ، ليلبي احتياجات المستخدمين والأجهزة التي يستخدمونها.  ويتغير التنسيق بتغير حجم الجهاز وإمكانياته.  على سبيل المثال، يظهر للمستخدمين على الهاتف المحتوى في طريقة عرض عمود واحد، وقد يعرض الجهاز اللوحي المحتوى نفسه في عمودين.
