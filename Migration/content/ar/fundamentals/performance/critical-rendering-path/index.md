---
title: "مسار العرض الحرج"
description: "تحسين مسار العرض الحرج من خلال وضع عرض المحتوى المتعلق بالإجراء الأساسي الذي يريد المستخدم وضعه على الصفحة في الأولوية."
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  يعد تحسين مسار العرض الحرج أمرًا ضروريًا لتحسين أداء الصفحات: والهدف هو وضع عرض المحتوى المتعلق بالإجراء الأساسي الذي يريد المستخدم وضعه على الصفحة في الأولوية.
</p>

يتطلب تقديم انطباع بالسرعة على الويب الكثير من العمل في المتصفح. وبصفتنا مطوِّري ويب، لا يظهر لنا معظم هذا العمل: ذلك أننا نكتب الترميز، ثم تظهر صفحة رائعة على الشاشة. ولكن كيف يتمكن المتصفح بشكل محدد من الانتقال من استخدام HTML وCSS وجافا سكريبت إلى وحدات بكسل المعروضة على الشاشة؟

يتعلق تحسين الأداء بشكل عام باستيعاب ما يحدث في هذه الخطوات الوسيطة بين تلقي وحدات بايت في HTML وCSS وجافا سكريبت والمعالجة المطلوبة لتحويلها إلى وحدات بكسل معروضة - وهي **مسار العرض الحرج**.

<img src="images/progressive-rendering.png" class="center" alt="عرض الصفحة التقدمي">

من خلال تحسين مسار العرض الحرج، يمكننا تحسين وقت العرض الأول على الصفحات إلى حد كبير. علاوة على ذلك يساعد استيعاب مسار العرض الحرج أيضًا في توفير أساس لتصميم تطبيقات تفاعلية بأداء جيد. وقد اتضح لنا أن عملية معالجة التحديثات التفاعلية تتم على نحو مماثل، وأنها تتم في حلقة متواصلة وبشكل مثالي على 60 إطارًا في الثانية. ولكن يجب ألا نستبق الأحداث. أولاً، دعونا نلق نظرة سريعة وعامة على كيفية عرض المتصفح لصفحة بسيطة.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


