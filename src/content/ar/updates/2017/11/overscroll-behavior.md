project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: مقدمة في خاصية CSS overcroll.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# تحكم في التمرير الخاص بك: تخصيص تأثيرات السحب للتحديث والفيضان {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL ؛ DR {: #tldr .hide-from-toc}

تسمح خاصية [CSS
`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/) للمطورين
بتجاوز سلوك التمرير تجاوز السعة الافتراضي للمتصفح عند الوصول إلى أعلى / أسفل
المحتوى. تشمل حالات الاستخدام تعطيل ميزة السحب للتحديث على الهاتف المحمول ،
وإزالة آثار التوهج الزائد ونطاق الشريط المطاطي ، ومنع محتوى الصفحة من التمرير
عندما يكون تحت الوسائط / التراكب.

يتطلب `overscroll-behavior` الزائد على Chrome 63+. إنه قيد التطوير أو قيد
الدراسة بواسطة متصفحات أخرى. انظر
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) لمزيد
من المعلومات. {: .caution }

## خلفية

### حدود التمرير وسلسلة التمرير {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>التمرير تسلسل على Chrome Android.</figcaption>
</figure>

التمرير هو واحد من أكثر الطرق الأساسية للتفاعل مع الصفحة ، ولكن قد تكون بعض
أنماط UX خادعة للتعامل معها بسبب السلوكيات الافتراضية الغريبة للمتصفح. على سبيل
المثال ، خذ درج التطبيق مع عدد كبير من العناصر التي قد يضطر المستخدم إلى التنقل
خلالها. عندما يصلون إلى القاع ، تتوقف الحاوية الفائضة عن التمرير لأنه لا يوجد
المزيد من المحتوى للاستهلاك. بمعنى آخر ، يصل المستخدم إلى "حد التمرير". لكن لاحظ
ما يحدث إذا استمر المستخدم في التمرير. **المحتوى *وراء* الدرج يبدأ في التمرير**
! يتم التمرير بواسطة الحاوية الأصل ؛ الصفحة الرئيسية نفسها في المثال.

يتحول هذا السلوك يسمى **سلسلة التمرير** ؛ السلوك الافتراضي للمتصفح عند تمرير
المحتوى. في كثير من الأحيان يكون الإعداد الافتراضي جميلًا ، لكن في بعض الأحيان
لا يكون ذلك مرغوبًا فيه أو غير متوقع. قد ترغب بعض التطبيقات في توفير تجربة
مستخدم مختلفة عندما يصل المستخدم إلى حد التمرير.

### تأثير السحب للتحديث {: #p2r }

ميزة "السحب إلى التحديث" هي لفتة سهلة الاستخدام شائعة الاستخدام من خلال تطبيقات
الأجهزة المحمولة مثل Facebook و Twitter. إن السحب على موجز ويب اجتماعي وإطلاق
سراحه يخلق مساحة جديدة لتحميل المشاركات الأحدث. في الواقع ، أصبحت UX *هذه شائعة
جدًا لدرجة* أن متصفحات الجوال مثل Chrome على Android قد تبنت نفس التأثير. الضرب
لأسفل في الجزء العلوي من الصفحة يقوم بتحديث الصفحة بأكملها:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>صفحة Twitter المخصصة للتحديث <br> عند تحديث تغذية في PWA
بهم.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>إجراء السحب والتحديث الأصلي في Chrome Android <br> تحديث الصفحة
بأكملها.</figcaption>
  </figure>
</div>

بالنسبة إلى مواقف مثل Twitter [PWA](/web/progressive-web-apps/) ، قد يكون من
المنطقي تعطيل إجراء السحب للتحديث الأصلي. لماذا ا؟ في هذا التطبيق ، ربما لا تريد
أن يقوم المستخدم بتحديث الصفحة بطريق الخطأ. هناك أيضا إمكانية لرؤية الرسوم
المتحركة تحديث مزدوج! بدلاً من ذلك ، قد يكون من الأفضل تخصيص عمل المتصفح ،
ومواءمته بشكل أوثق مع العلامة التجارية للموقع. الجزء المؤسف هو أن هذا النوع من
التخصيص كان صعبًا للانسحاب. ينتهي الأمر بالمطورين إلى كتابة JavaScript غير ضروري
، أو إضافة مستمعين باللمس [غير
السلبي](/web/tools/lighthouse/audits/passive-event-listeners) (الذي يحظر
التمرير) ، أو قم بلصق الصفحة بأكملها في 100vw / vh `<div>` (لمنع الصفحة من
التفيض). يكون لهذه الحلول آثار سلبية [موثقة
جيدًا](https://wicg.github.io/overscroll-behavior/#intro) على أداء التمرير.

يمكننا أن نفعل أفضل!

## تقديم `overscroll-behavior` {: #intro }

و `overscroll-behavior` [الملكية](https://wicg.github.io/overscroll-behavior/)
هي ميزة CSS الجديدة التي تسيطر على سلوك ما يحدث عند overscroll حاوية (بما في ذلك
الصفحة نفسها). يمكنك استخدامه لإلغاء تسلسل التمرير ، وتعطيل / تخصيص إجراء السحب
للتحديث ، وتعطيل تأثيرات `overscroll-behavior` على نظام iOS (عندما يقوم Safari
بتنفيذ `overscroll-behavior` ) ، وأكثر من ذلك. أفضل جزء هو أن <strong
data-md-type="double_emphasis">استخدام `overscroll-behavior` لا يؤثر سلبًا على
أداء الصفحة</strong> مثل الاختراقات المذكورة في المقدمة!

تأخذ الخاصية ثلاث قيم ممكنة:

1. **تلقائي** - افتراضي. قد تنتشر التمريرات التي تنشأ على العنصر إلى عناصر
الأسلاف.

- **يحتوي على** - يمنع تسلسل التمرير. لا تنتشر لفائف التمرير إلى أسلاف ولكن يتم
عرض التأثيرات المحلية داخل العقدة. على سبيل المثال ، تأثير التوهج الزائد على
نظام Android أو تأثير الشريط المطاطي على نظام التشغيل iOS الذي يخطر المستخدم عند
وصوله إلى حدود التمرير. **ملاحظة** : استخدام `overscroll-behavior: contain` على
عنصر `html` يمنع إجراءات التصفح overcroll.
- **لا شيء** - مثل `contain` ولكنه يمنع أيضًا تأثيرات تجاوز السرعة داخل العقدة
نفسها (على سبيل المثال ، توهج overcroll Android أو iOS المطاطي).

ملاحظة: `overscroll-behavior` أيضًا الاختصارات لـ `overscroll-behavior-x` و
`overscroll-behavior-y` إذا كنت تريد فقط تحديد السلوكيات لمحور معين.

دعنا `overscroll-behavior` في بعض الأمثلة لنرى كيفية استخدام
`overscroll-behavior` .

## منع التمرير من الهروب من عنصر موضع ثابت {: #fixedpos }

### سيناريو صندوق الدردشة

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>ينتقل المحتوى الموجود أسفل نافذة الدردشة أيضًا :(</figcaption>
</figure>

ضع في اعتبارك مربع دردشة ثابتًا يتوضع في أسفل الصفحة. والقصد من ذلك هو أن مربع
الدردشة هو عنصر قائم بذاته وأنه ينتقل بشكل منفصل عن المحتوى الذي يقف وراءه. ومع
ذلك ، بسبب تسلسل التمرير ، يبدأ المستند في التمرير بمجرد أن يضرب المستخدم آخر
رسالة في سجل الدردشة.

بالنسبة لهذا التطبيق ، يكون من الأنسب أن تكون هناك مخطوطات تنشأ داخل مربع
الدردشة في الدردشة. يمكننا تحقيق ذلك عن طريق إضافة `overscroll-behavior:
contain` على العنصر الذي يحمل رسائل الدردشة:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

في الأساس ، نقوم بإنشاء فصل منطقي بين سياق التمرير في مربع الدردشة والصفحة
الرئيسية. والنتيجة النهائية هي أن الصفحة الرئيسية تبقى عند وصول المستخدم إلى
أعلى / أسفل سجل الدردشة. لا تنتشر التمريرات التي تبدأ في مربع الدردشة.

### سيناريو تراكب الصفحة {: #overlay }

هناك تباين آخر في سيناريو "underscroll" وهو عندما ترى المحتوى ينتقل خلف **تراكب
الموضع الثابت** . الهبات الميت هو `overscroll-behavior` في النظام! يحاول
المستعرض أن يكون مفيدًا ، لكن ينتهي به الأمر إلى جعل الموقع يبدو عربات التي
تجرها الدواب.

**مثال** - مشروط مع وبدون `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>قبل</b> : يتم تمرير محتوى الصفحة أسفل التراكب.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>بعد</b> : لا يتم تمرير محتوى الصفحة أسفل
التراكب.</figcaption>
  </div>
</figure>

## تعطيل السحب للتحديث {: #disablp2r }

**إيقاف تشغيل إجراء السحب للتحديث هو سطر واحد من CSS** . ما عليك سوى منع تسلسل
التمرير على عنصر تحديد إطار العرض بالكامل. في معظم الحالات ، يكون هذا `<html>`
أو `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

من خلال هذه الإضافة البسيطة ، نقوم بإصلاح الرسوم المتحركة المزدوجة القابلة
للتحديث في [العرض التوضيحي لـ
chatbox](https://ebidel.github.io/demos/chatbox.html) ويمكننا بدلاً من ذلك تنفيذ
تأثير مخصص يستخدم رسومًا متحركة أكثر تحميلًا. صندوق الوارد بأكمله يطمس أيضًا عند
تحديث صندوق الوارد:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>قبل</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>بعد</figcaption>
  </div>
</figure>

إليك مقتطف [الشفرة
الكاملة](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## تعطيل تأثيرات التوهج الزائد وامتداد الشريط المطاطي {: #disableglow }

لتعطيل تأثير الارتداد عند ضرب حد التمرير ، استخدم `overscroll-behavior-y: none`
:

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
    <figcaption><b>قبل</b> : ضرب حدود التمرير يظهر توهج.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>بعد</b> : توهج المعوقين.</figcaption>
  </div>
</figure>

ملاحظة: سيظل هذا يحافظ على التنقل السريع بين اليسار / اليمين. لمنع التنقل ،
يمكنك استخدام `overscroll-behavior-x: none` . ومع ذلك ، [لا
يزال](https://crbug.com/762023) هذا [قيد التنفيذ](https://crbug.com/762023) في
Chrome.

## عرض توضيحي كامل {: #demo }

`overscroll-behavior` معًا ، يستخدم [العرض
التوضيحي](https://ebidel.github.io/demos/chatbox.html) كاملاً
`overscroll-behavior` [الدردشة](https://ebidel.github.io/demos/chatbox.html)
`overscroll-behavior` لإنشاء رسم متحرك مخصص للتحديث وتعطيل التمريرات من الهروب
من عنصر واجهة مستخدم chatbox. يوفر هذا تجربة مستخدم مثالية كان من الصعب تحقيقها
دون `overscroll-behavior` CSS `overscroll-behavior` .

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">عرض التجريبي</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">مصدر</a></figcaption>
</figure>

<br>
