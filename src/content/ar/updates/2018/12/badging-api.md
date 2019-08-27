project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: واجهة برمجة تطبيقات Badging هي واجهة برمجة تطبيقات جديدة على شبكة الإنترنت
  تتيح لتطبيقات الويب المثبتة تعيين شارة على مستوى التطبيق ، تظهر في مكان محدد لنظام
  التشغيل مرتبط بالتطبيق ، مثل الرف أو الشاشة الرئيسية.

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {#
wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags:
capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials
#} {# wf_featured_snippet: The Badging API is a new web platform API that allows
installed web apps to set an application-wide badge, shown in an
operating-system-specific place associated with the application, such as the
shelf or home screen. Badging makes it easy to subtly notify the user that there
is some new activity that might require their attention, or it can be used to
indicate a small amount of information, such as an unread count. #} {#
wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# بادئة لأيقونات التطبيق {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">نحن نعمل حاليًا على واجهة برمجة التطبيقات هذه كجزء من <a
href="/web/updates/capabilities">مشروع القدرات</a> الجديدة ، وبدءًا من Chrome 73
، يتوفر هذا الإصدار كتجربة <a href="#ot"><b>أصل</b></a> . سيتم تحديث هذه
المشاركة مع تطور واجهة برمجة تطبيقات Badging. <br> <b>آخر تحديث:</b> 21 أغسطس ،
2019</aside>

## ما هي واجهة برمجة التطبيقات للشارات؟ {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>مثال على Twitter مع 8 إعلامات وتطبيق آخر يعرض شارة من نوع
العلم.</figcaption>
</figure>

واجهة برمجة تطبيقات Badging هي واجهة برمجة تطبيقات جديدة على الويب تتيح لتطبيقات
الويب المثبتة تعيين شارة على مستوى التطبيق ، تظهر في مكان محدد لنظام التشغيل
مرتبط بالتطبيق (مثل الرف أو الشاشة الرئيسية).

تسهِّل عملية الإشارات إخطار المستخدم بمهارة بوجود بعض الأنشطة الجديدة التي قد
تتطلب انتباهه ، أو يمكن استخدامها للإشارة إلى كمية صغيرة من المعلومات ، مثل عدد
غير مقروء.

تميل الشارات إلى أن تكون سهلة الاستخدام أكثر من الإشعارات ، ويمكن تحديثها بتردد
أعلى بكثير ، لأنها لا تقاطع المستخدم. ولأنهم لا يقاطعون المستخدم ، فليس هناك إذن
خاص لاستخدامه.

[قراءة الشرح](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### حالات الاستخدام المقترحة لـ Badging API {: #use-cases }

تتضمن أمثلة المواقع التي قد تستخدم واجهة برمجة التطبيقات هذه:

- قم بالدردشة والبريد الإلكتروني والتطبيقات الاجتماعية للإشارة إلى وصول رسائل
جديدة أو إظهار عدد العناصر غير المقروءة.
- تطبيقات الإنتاجية ، للإشارة إلى إكمال مهمة خلفية طويلة الأمد (مثل تقديم صورة
أو فيديو).
- الألعاب ، للإشارة إلى أن إجراء اللاعب مطلوب (على سبيل المثال ، في Chess ،
عندما يكون دور اللاعب).

## الوضع الحالي {: #status }

خطوة | الحالة
--- | ---
1. إنشاء الشرح | [اكتمال](https://github.com/WICG/badging/blob/master/explainer.md)
2. إنشاء المسودة الأولية للمواصفات | [اكتمال](https://wicg.github.io/badging/)
**3. جمع ردود الفعل وتكرار على التصميم** | [**في تقدم**](#feedback)
**4. أصل المحاكمة** | [**في تقدم**](#ot)
5. إطلاق | لم يبدأ

### نرى ذلك في العمل

1. باستخدام Chrome 73 أو إصدار أحدث على Windows أو Mac ، افتح [العرض التوضيحي لـ
Badging API](https://badging-api.glitch.me/) .
2. عندما يُطلب منك ذلك ، انقر فوق " **تثبيت"** لتثبيت التطبيق ، أو استخدم قائمة
Chrome لتثبيته ، ثم افتحه كـ PWA مثبت. ملاحظة ، يجب أن يتم تشغيله كـ PWA مثبت
(في شريط المهام أو في رصيف).
3. انقر فوق الزر " **تعيين"** أو " **مسح"** لتعيين أو إزالة الشارة من رمز
التطبيق. يمكنك أيضًا توفير رقم *لقيمة شارة* .

ملاحظة: على الرغم من أن واجهة برمجة تطبيقات Badging *في Chrome* تتطلب تطبيقًا تم
تثبيته برمزًا يمكن تزييفه بالفعل ، فإننا ننصح بعدم إجراء مكالمات إلى واجهة برمجة
تطبيقات Badging اعتمادًا على حالة التثبيت. يمكن أن تنطبق واجهة برمجة تطبيقات
Badging على *أي مكان* قد يرغب فيه المستعرض في إظهار شارة ، لذلك لا ينبغي
للمطورين وضع أي افتراضات حول المواقف التي سيعمل فيها المتصفح على تشغيل الشارات.
فقط اتصل بـ API عندما يكون موجودًا. إذا كان يعمل ، فإنه يعمل. إذا لم يكن كذلك ،
فهو ببساطة لا.

## كيفية استخدام API Badging {: #use }

بدءًا من Chrome 73 ، تتوفر واجهة برمجة تطبيقات Badging للتجربة الأصلية لنظام
التشغيل Windows (7+) ونظام التشغيل MacOS. تتيح لك [تجارب Origin
تجربة](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
الميزات الجديدة وإبداء الرأي حول قابلية الاستخدام والعملية والفعالية لنا ومجتمع
معايير الويب. لمزيد من المعلومات ، راجع [دليل Origin Trials Guide لمطوري
الويب](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### دعم الشارات عبر المنصات

يتم دعم API Badging (في نسخة تجريبية الأصل) على Windows و macOS. لا يتم دعم
Android لأنه يتطلب منك عرض إشعار ، على الرغم من أن هذا قد يتغير في المستقبل. دعم
نظام التشغيل Chrome في انتظار تنفيذ وضع العلامات على النظام الأساسي.

### سجل للإصدار التجريبي {: #ot }

1. [طلب رمز
مميز](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
لأصلك.
2. إضافة الرمز المميز إلى صفحاتك ، هناك طريقتان لتوفير هذا الرمز المميز على أي
صفحات في الأصل:
-  أضف نسخة `origin-trial` `<meta>` `origin-trial` إلى رأس أي صفحة. على سبيل
المثال ، قد يبدو هذا مثل: `<meta http-equiv="origin-trial"
content="TOKEN_GOES_HERE">`
-  إذا كان يمكنك تكوين الخادم الخاص بك ، فيمكنك أيضًا توفير الرمز المميز على
الصفحات باستخدام رأس HTTP `Origin-Trial` . يجب أن يبدو رأس الاستجابة الناتج كما
يلي: `Origin-Trial: TOKEN_GOES_HERE`

### بدائل للمحاكمة الأصل

إذا كنت ترغب في تجربة استخدام واجهة برمجة تطبيقات Badging محليًا ، دون تجربة
النسخة الأصلية ، فقم بتمكين علامة `#enable-experimental-web-platform-features`
في `chrome://flags` .

### استخدام واجهة برمجة تطبيقات Badging أثناء النسخة التجريبية الأصلية

Dogfood: أثناء النسخة التجريبية الأصلية ، ستكون واجهة برمجة التطبيقات متوفرة عبر
`window.ExperimentalBadge` . يعتمد الرمز أدناه على التصميم الحالي ، وسوف يتغير
قبل أن يهبط في المتصفح كواجهة برمجة تطبيقات قياسية.

لاستخدام Badging API ، يحتاج تطبيق الويب الخاص بك إلى تلبية [معايير قابلية تثبيت
Chrome](/web/fundamentals/app-install-banners/#criteria) ، ويجب على المستخدم
إضافته إلى شاشته الرئيسية.

واجهة `ExperimentalBadge` هي كائن عضو في `window` . يحتوي على طريقتين:

- `set([number])` : ضبط شارة التطبيق. إذا تم توفير قيمة ، فقم بتعيين الشارة على
القيمة المقدمة بخلاف ذلك ، فقم بعرض نقطة بيضاء واضحة (أو علامة أخرى مناسبة
للمنصة).
- `clear()` : يزيل شارة التطبيق.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

يمكن استدعاء `ExperimentalBadge.set()` و `ExperimentalBadge.clear()` من صفحة
مقدمة ، أو ربما في المستقبل ، عامل خدمة. في كلتا الحالتين ، فإنه يؤثر على
التطبيق بأكمله ، وليس فقط على الصفحة الحالية.

في بعض الحالات ، قد لا يسمح نظام التشغيل بالتمثيل الدقيق للشارة ، في هذه الحالة
، سيحاول المتصفح تقديم أفضل تمثيل لهذا الجهاز. على سبيل المثال ، في حين أن واجهة
برمجة تطبيقات Badging غير مدعومة على نظام Android ، إلا أن Android يعرض نقطة فقط
بدلاً من القيمة الرقمية.

ملاحظة: لا تفترض أي شيء حول كيفية رغبة وكيل المستخدم في عرض الشارة. نتوقع أن
يأخذ بعض وكلاء المستخدم رقمًا مثل "4000" ثم يعيدون كتابته كـ "99+". إذا كنت
تشبعها بنفسك (على سبيل المثال إلى "99") فلن تظهر علامة "+". بغض النظر عن الرقم
الفعلي ، فقط قم بتعيين `Badge.set(unreadCount)` ودع وكيل المستخدم يتعامل مع عرضه
وفقًا لذلك.

## تعليقات {: #feedback }

نحتاج إلى مساعدتك لضمان عمل واجهة برمجة تطبيقات Badging بطريقة تلبي احتياجاتك
ولا نفتقد أي سيناريوهات أساسية.

<aside class="key-point"><b>نحن نحتاج مساعدتك!</b> - هل التصميم الحالي (السماح
إما عدد صحيح أو قيمة العلم) تلبية احتياجاتك؟ إذا لم يحدث ذلك ، فيرجى تقديم مشكلة
في <a href="https://github.com/WICG/badging/issues">الريبو WICG / badging</a>
وتقديم أكبر قدر ممكن من التفاصيل. بالإضافة إلى ذلك ، هناك عدد من <a
href="https://github.com/WICG/badging/blob/master/choices.md">الأسئلة
المفتوحة</a> التي لا تزال قيد المناقشة ، وسنكون مهتمين بسماع ملاحظاتك.</aside>

نحن مهتمون أيضًا بمعرفة كيف تخطط لاستخدام واجهة برمجة التطبيقات للشارات:

- هل لديك فكرة عن حالة استخدام أو فكرة عن المكان الذي ستستخدمه فيه؟
- هل تخطط لاستخدام هذا؟
- هل ترغب في ذلك ، وتريد أن تظهر دعمكم؟

شارك أفكارك حول مناقشة [Badging API WICG
Discourse](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
.

{% include "web/_shared/helpful.html" %}

## روابط مفيدة {: #helpful }

- [الشرح العام](https://github.com/WICG/badging/blob/master/explainer.md)
- [شارة API التجريبي](https://badging-api.glitch.me/) | [بادينج مصدر تجريبي
API](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [تتبع الأخطاء](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [دخول
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- طلب [الرمز المميز للمحاكمة
الأصلية](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [كيفية استخدام الرمز المميز للمحاكمة
الأصلية](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- Blink Component: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
