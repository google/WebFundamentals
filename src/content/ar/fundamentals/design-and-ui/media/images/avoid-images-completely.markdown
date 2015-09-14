---
title: "تجنب الصور تمامًا"
description: "أحيانًا تكون أفضل صورة ليست صورة إطلاقًا. ومتى أمكن، استخدم الميزات الأصلية للمتصفح لتوفير الوظائف نفسها أو أخرى شبيهة."
updated_on: 2014-06-10
key-takeaways:
  تجنب-images:
    - تجنب الصور قدر الإمكان، وجرب بدلاً من ذلك استغلال إمكانيات المتصفح للحصول على الظلال والتدرجات والجوانب المستديرة وغير ذلك الكثير.
---

<p class="intro">
  أحيانًا تكون أفضل صورة ليست صورة إطلاقًا. ومتى أمكن، استخدم الميزات الأصلية للمتصفح لتوفير الوظائف نفسها أو أخرى شبيهة.  تنشئ المتصفحات مواد مصورة كان يلزمها في السابق توفير صور.   وهذا يعني أن المتصفحات لم تعد بحاجة إلى تنزيل ملفات صور منفصلة وأنها تحجب الصور المعدلة من حيث الحجم تعديلاً غير ملائم.  يمكن عرض الرموز باستخدام ترميز موحد أو خطوط رموز خاصة.
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## وضع النصوص في ترميز، وليست مضمنة في صور

متى أمكن، يجب أن يكون النص نصًا وليس مضمَّنًا داخل صور، كاستخدام الصور في العناوين، أو وضع معلومات الاتصال مثل أرقام الهاتف أو العناوين في الصور مباشرة.  وبذلك لن يتمكن المستخدمون من نسخ المعلومات أو لصقها، وتصبح المعلومات غير متاحة لأجهزة قراءة الشاشة ولن تكون سريعة الاستجابة.  بدلاً من ذلك، ضع النصوص في الترميز واستخدم خطوط الويب عند اللزوم لأرشفة النمط اللازم.

## استخدام  CSS لاستبدال الصور

يمكن للمتصفحات الحديثة استخدام ميزات CSS لإنشاء أنماط كانت من قبل تتطلب صورًا.  على سبيل المثال، يمكن إنشاء التدرجات المعقدة باستخدام العنصر <code>background</code>، كما يمكن إنشاء الظلال باستخدام <code>box-shadow</code>، ويمكن إضافة الجوانب المستديرة باستخدام العنصر<code>border-radius</code>.


<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

ضع في اعتبارك أن استخدام هذه التقنيات لا يتطلب عرض الدوائر، الأمر الذي يظهر جليًا في الجوّال.  وعند المبالغة في استخدام هذه التقنيات، ستفقد أية ميزة قد تكون حصلت عليها وقد يؤدي ذلك إلى إعاقة الأداء.



