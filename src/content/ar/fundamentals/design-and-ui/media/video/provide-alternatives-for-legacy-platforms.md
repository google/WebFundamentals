project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: لا تتوافق جميع تنسيقات الفيديو على جميع أنظمة التشغيل. ويمكنك الاطلاع على التنسيقات المتوافقة على أنظمة التشغيل الأساسية والتأكد من توافق الفيديو مع كل منها.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# توفير خيارات بديلة لأنظمة التشغيل القديمة {: .page-title }

{% include "_shared/contributors/TODO.html" %}



لا تتوافق جميع تنسيقات الفيديو على جميع أنظمة التشغيل. ويمكنك الاطلاع على التنسقات المتوافقة على أنظمة التشغيل الأساسية والتأكد من توافق الفيديو مع كل منها.



## الاطلاع على التنسيقات المتوافقة

يمكنك استخدام `canPlayType()` للبحث عن تنسيقات الفيديو المتوافقة. وتحتاج هذه الطريقة إلى وسيط سطر ثابت من `mime-type` وبرامج ترميز اختيارية للخروج بإحدى القيم التالية:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>القيمة المعروضة</th>
      <th>الوصف</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="القيمة الناتجة">(سطر فارغ)</td>
      <td data-th="الوصف">الحاوية و/أو برنامج الترميز غير متوافق.</td>
    </tr>
    <tr>
      <td data-th="القيمة الناتجة"><code>maybe</code></td>
      <td data-th="الوصف">
        قد تكون الحاوية أو برامج الترميز متوافقة، ولكن يحتاج المتصفح
        إلى تنزيل فيديو ما للفحص.
      </td>
    </tr>
    <tr>
      <td data-th="القيمة الناتجة"><code>probably</code></td>
      <td data-th="الوصف">يبدو أن التنسيق متوافق.
      </td>
    </tr>
  </tbody>
</table>

في ما يلي بعض الأمثلة على وسيطات `canPlayType()` والقيم الناتجة عند التشغيل في Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>النوع</th>
      <th>الاستجابة</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="النوع"><code>video/xyz</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="الاستجابة">(سطر فارغ)</td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="الاستجابة"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/webm</code></td>
      <td data-th="الاستجابة"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="النوع"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="الاستجابة"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## إنتاج الفيديو بعدة تنسيقات

هناك الكثير من الأدوات التي تساعد في حفظ فيديو واحد بعدة تنسيقات مختلفة:

* أدوات سطح المكتب: [FFmpeg](//ffmpeg.org/)
* تطبيقات واجهة المستخدم التصويرية: [Miro](//www.mirovideoconverter.com/) و[HandBrake](//handbrake.fr/) و[VLC](//www.videolan.org/)
* خدمات الترميز/تحويل الترميز على الإنترنت: [Zencoder](//en.wikipedia.org/wiki/Zencoder) و[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## التحقق من التنسيق المستخدم

هل تريد معرفة التنسيق الذي اختاره المتصفح بالفعل؟

في جافا سكريبت، يمكنك استخدام الخاصية `currentSrc` في الفيديو لعرض المصدر المستخدم.

للاطلاع على ذلك عمليًا، يمكنك الرجوع إلى <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">هذا العرض التجريبي</a>: يختار كل من Chrome وFirefox ما يلي `chrome.webm` (نظرًا لأنه الخيار الأول في قائمة المصادر الممكنة التي يتوافق معها هذان المتصفحان) بينما يختار Safari ما يلي `chrome.mp4`.



