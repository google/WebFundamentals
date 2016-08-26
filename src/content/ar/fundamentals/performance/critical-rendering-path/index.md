project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: تحسين مسار العرض الحرج من خلال وضع عرض المحتوى المتعلق بالإجراء الأساسي الذي يريد المستخدم وضعه على الصفحة في الأولوية.

{# wf_review_required #}
{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# مسار العرض الحرج {: .page-title }

{% include "_shared/contributors/ilyagrigorik.html" %}


يعد تحسين مسار العرض الحرج أمرًا ضروريًا لتحسين أداء الصفحات: والهدف هو وضع عرض المحتوى المتعلق بالإجراء الأساسي الذي يريد المستخدم وضعه على الصفحة في الأولوية.

يتطلب تقديم انطباع بالسرعة على الويب الكثير من العمل في المتصفح. وبصفتنا مطوِّري ويب، لا يظهر لنا معظم هذا العمل: ذلك أننا نكتب الترميز، ثم تظهر صفحة رائعة على الشاشة. ولكن كيف يتمكن المتصفح بشكل محدد من الانتقال من استخدام HTML وCSS وجافا سكريبت إلى وحدات بكسل المعروضة على الشاشة؟

يتعلق تحسين الأداء بشكل عام باستيعاب ما يحدث في هذه الخطوات الوسيطة بين تلقي وحدات بايت في HTML وCSS وجافا سكريبت والمعالجة المطلوبة لتحويلها إلى وحدات بكسل معروضة - وهي **مسار العرض الحرج**.

<img src="images/progressive-rendering.png" class="center" alt="عرض الصفحة التقدمي">

من خلال تحسين مسار العرض الحرج، يمكننا تحسين وقت العرض الأول على الصفحات إلى حد كبير. علاوة على ذلك يساعد استيعاب مسار العرض الحرج أيضًا في توفير أساس لتصميم تطبيقات تفاعلية بأداء جيد. وقد اتضح لنا أن عملية معالجة التحديثات التفاعلية تتم على نحو مماثل، وأنها تتم في حلقة متواصلة وبشكل مثالي على 60 إطارًا في الثانية. ولكن يجب ألا نستبق الأحداث. أولاً، دعونا نلق نظرة سريعة وعامة على كيفية عرض المتصفح لصفحة بسيطة.


## Website Performance Optimization
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="images/crp-udacity.png">
  </figure>
</div>

Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages.

[View Course](https://udacity.com/ud884){: .external }




