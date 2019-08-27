project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Badging API เป็น API แพลตฟอร์มเว็บใหม่ที่อนุญาตให้แอปพลิเคชันเว็บที่ติดตั้งตั้งตราสัญลักษณ์ทั้งแอปพลิเคชันแสดงในสถานที่เฉพาะระบบปฏิบัติการที่เกี่ยวข้องกับแอปพลิเคชันเช่นหน้าจอหลักหรือหน้าจอหลัก

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

# การ Badging สำหรับไอคอนแอป {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">ขณะนี้เรากำลังทำงานกับ API นี้เป็นส่วนหนึ่งของ <a
href="/web/updates/capabilities">โครงการความสามารถ</a> ใหม่และเริ่มต้นใน Chrome
73 โดยมีให้ <a href="#ot"><b>ทดลองใช้งาน</b></a> ได้
โพสต์นี้จะได้รับการอัปเดตเมื่อ Badging API วิวัฒนาการ <br>
<b>อัปเดตครั้งล่าสุด:</b> 21 สิงหาคม 2019</aside>

## API การ Badging คืออะไร {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>ตัวอย่าง Twitter ที่มีการแจ้งเตือน 8
รายการและแอปอื่นแสดงป้ายสถานะประเภทธง</figcaption>
</figure>

Badging API เป็น API
แพลตฟอร์มเว็บใหม่ที่อนุญาตให้แอปพลิเคชันเว็บที่ติดตั้งตั้งตราสัญลักษณ์ทั้งแอปพลิเคชันแสดงในสถานที่เฉพาะระบบปฏิบัติการที่เกี่ยวข้องกับแอปพลิเคชัน
(เช่นชั้นวางหรือหน้าจอหลัก)

การ Badging
ทำให้ง่ายต่อการแจ้งเตือนผู้ใช้อย่างละเอียดว่ามีกิจกรรมใหม่บางอย่างที่อาจต้องได้รับความสนใจหรือสามารถใช้เพื่อระบุข้อมูลจำนวนเล็กน้อยเช่นจำนวนที่ยังไม่ได้อ่าน

ป้ายมีแนวโน้มที่จะใช้งานง่ายกว่าการแจ้งเตือนและสามารถอัปเดตด้วยความถี่ที่สูงกว่ามากเนื่องจากไม่ได้ขัดขวางผู้ใช้
และเนื่องจากพวกเขาไม่ได้ขัดขวางผู้ใช้จึงไม่จำเป็นต้องได้รับอนุญาตพิเศษในการใช้งาน

[อ่านคำอธิบาย](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### กรณีการใช้งานที่แนะนำสำหรับ Badging API {: #use-cases }

ตัวอย่างของไซต์ที่อาจใช้ API นี้ ได้แก่ :

-
แอพแชทอีเมลและโซเชียลเพื่อส่งสัญญาณว่ามีข้อความใหม่เข้ามาหรือแสดงจำนวนรายการที่ยังไม่ได้อ่าน
- แอพเพิ่มผลผลิตเพื่อส่งสัญญาณว่างานพื้นหลังที่ใช้เวลานาน
(เช่นการแสดงผลภาพหรือวิดีโอ) เสร็จสมบูรณ์
- เกมเพื่อส่งสัญญาณว่าจำเป็นต้องมีการกระทำของผู้เล่น
(เช่นในหมากรุกเมื่อถึงคราวของผู้เล่น)

## สถานะปัจจุบัน {: #status }

ขั้นตอน | สถานะ
--- | ---
1. สร้างตัวอธิบาย | [สมบูรณ์](https://github.com/WICG/badging/blob/master/explainer.md)
2. สร้างร่างเริ่มต้นของข้อกำหนด | [สมบูรณ์](https://wicg.github.io/badging/)
**3. รวบรวมข้อเสนอแนะและทำซ้ำในการออกแบบ** | [**กำลังดำเนินการ**](#feedback)
**4. แหล่งกำเนิดการทดลอง** | [**กำลังดำเนินการ**](#ot)
5. เปิดตัว | ยังไม่เริ่ม

### เห็นมันในการกระทำ

1. ใช้ Chrome 73 หรือใหม่กว่าบน Windows หรือ Mac เปิดการ [สาธิต Badging
API](https://badging-api.glitch.me/)
2. เมื่อได้รับแจ้งให้คลิก **ติดตั้ง** เพื่อติดตั้งแอพหรือใช้เมนู Chrome
เพื่อติดตั้งจากนั้นเปิดเป็น PWA ที่ติดตั้ง หมายเหตุมันจะต้องทำงานเป็น PWA
ที่ติดตั้ง (ในทาสก์บาร์หรือท่าเรือของคุณ)
3. คลิกปุ่ม **ตั้งค่า** หรือ **ล้าง**
เพื่อตั้งค่าหรือล้างตราสัญลักษณ์จากไอคอนแอป คุณยังสามารถระบุหมายเลขสำหรับ
*ค่าตรา*

หมายเหตุ: แม้ว่า Badging API *ใน Chrome*
ต้องการแอปที่ติดตั้งซึ่งมีไอคอนที่สามารถทำการติดป้ายได้
แต่เราแนะนำให้ทำการโทรไปยัง Badging API ขึ้นอยู่กับสถานะการติดตั้ง API การ
Badging สามารถใช้ได้กับ *ทุกที่ที่*
เบราว์เซอร์อาจต้องการแสดงตราดังนั้นผู้พัฒนาไม่ควรตั้งสมมติฐานใด ๆ
เกี่ยวกับสถานการณ์ที่เบราว์เซอร์จะใช้งานป้าย เพียงเรียก API เมื่อมีอยู่
ถ้ามันใช้งานได้ผล ถ้าไม่มันก็ไม่ได้

## วิธีใช้ Badging API {: #use }

เริ่มต้นใน Chrome 73, Badging API มีให้บริการในรุ่นทดลองสำหรับ Windows (7+) และ
macOS [การทดลองใช้
Origin](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
ให้คุณลองใช้คุณสมบัติใหม่และให้ข้อเสนอแนะเกี่ยวกับการใช้งานการใช้งานได้จริงและประสิทธิภาพสำหรับเราและชุมชนมาตรฐานเว็บ
สำหรับข้อมูลเพิ่มเติมโปรดดู
[คู่มือการทดลองกำเนิดสำหรับนักพัฒนาเว็บ](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)

### รองรับการติดตราข้ามแพลตฟอร์ม

รองรับ Badging API (ในรุ่นทดลอง) บน Windows และ macOS ไม่รองรับ Android
เนื่องจากต้องการให้คุณแสดงการแจ้งเตือนถึงแม้ว่าสิ่งนี้อาจมีการเปลี่ยนแปลงในอนาคต
การสนับสนุน Chrome OS กำลังรอการติดตั้งเครื่องหมายบนแพลตฟอร์ม

### ลงทะเบียนเพื่อทดลองใช้งานดั้งเดิม {: #ot }

1.
[ขอโทเค็น](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
สำหรับที่มาของคุณ
2. เพิ่มโทเค็นลงในหน้าของคุณมีสองวิธีในการระบุโทเค็นนี้ในหน้าใด ๆ
ที่เป็นต้นกำเนิดของคุณ:
-  เพิ่ม `<meta>` แท็ก `origin-trial` ไว้ที่ส่วนหัวของหน้าใดก็ได้
ตัวอย่างเช่นสิ่งนี้อาจมีลักษณะดังนี้: `<meta http-equiv="origin-trial"
content="TOKEN_GOES_HERE">`
- 
หากคุณสามารถกำหนดค่าเซิร์ฟเวอร์ของคุณคุณยังสามารถระบุโทเค็นในหน้าต่างๆโดยใช้ส่วนหัว
HTTP `Origin-Trial` ส่วนหัวการตอบสนองที่ได้ควรมีลักษณะดังนี้: `Origin-Trial:
TOKEN_GOES_HERE`

### ทางเลือกในการทดลองกำเนิด

หากคุณต้องการทดสอบด้วย Badging API
ในเครื่องโดยไม่ต้องมีการทดลองเริ่มต้นให้เปิดใช้งานการตั้งค่าสถานะ
`#enable-experimental-web-platform-features` ใน `chrome://flags`

### การใช้ Badging API ระหว่างการทดลองเริ่มต้น

ทดลองใช้: ในระหว่างการทดลองให้กำเนิด API จะพร้อมใช้งานผ่าน
`window.ExperimentalBadge`
รหัสด้านล่างขึ้นอยู่กับการออกแบบในปัจจุบันและจะเปลี่ยนแปลงก่อนที่มันจะตกลงในเบราว์เซอร์เป็น
API มาตรฐาน

ในการใช้ Badging API แอปพลิเคชันเว็บของคุณต้องเป็นไปตาม
[เกณฑ์](/web/fundamentals/app-install-banners/#criteria) ความสามารถ
[ในการติดตั้งของ Chrome](/web/fundamentals/app-install-banners/#criteria)
และผู้ใช้จะต้องเพิ่มลงในหน้าจอหลักของพวกเขา

ส่วนต่อประสาน `ExperimentalBadge` เป็นวัตถุสมาชิกบน `window` มันมีสองวิธี:

- `set([number])` : ตั้งตราของแอพ
หากมีการระบุค่าให้ตั้งป้ายเป็นค่าที่ระบุเป็นอย่างอื่นให้แสดงจุดสีขาวล้วน
(หรือค่าสถานะอื่นตามความเหมาะสมกับแพลตฟอร์ม)
- `clear()` : ลบตราของแอพ

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` และ `ExperimentalBadge.clear()`
สามารถเรียกได้จากหน้าเบื้องหน้าหรืออาจเป็นไปได้ในอนาคตพนักงานบริการ
ไม่ว่าในกรณีใดมันจะมีผลกับแอปทั้งหมดไม่ใช่เฉพาะหน้าปัจจุบัน

ในบางกรณีระบบปฏิบัติการอาจไม่อนุญาตให้มีการแสดงตราแน่นอนในกรณีนี้เบราว์เซอร์จะพยายามให้การแสดงที่ดีที่สุดสำหรับอุปกรณ์นั้น
ตัวอย่างเช่นในขณะที่ API Badging API ไม่ได้รับการสนับสนุนบน Android แต่ Android
จะแสดงจุดแทนค่าตัวเลขเท่านั้น

หมายเหตุ: อย่าคิดอะไรเกี่ยวกับวิธีที่ตัวแทนผู้ใช้ต้องการแสดงตรา
เราคาดว่าตัวแทนผู้ใช้บางรายจะใช้หมายเลขเช่น "4000" และเขียนใหม่เป็น "99+"
หากคุณอิ่มตัวด้วยตัวเอง (เช่น "99") ตัว "+" จะไม่ปรากฏขึ้น
ไม่ว่าจะเป็นจำนวนจริงเพียงแค่ตั้ง `Badge.set(unreadCount)`
และให้ตัวแทนผู้ใช้จัดการกับการแสดงตามนั้น

## ข้อเสนอแนะ {: #feedback }

เราต้องการความช่วยเหลือของคุณเพื่อให้แน่ใจว่า Badging API
ทำงานในลักษณะที่ตรงกับความต้องการของคุณและเราจะไม่พลาดสถานการณ์สำคัญ ๆ

<aside class="key-point"><b>เราต้องการความช่วยเหลือของคุณ!</b> -
การออกแบบปัจจุบัน (อนุญาตให้เป็นจำนวนเต็มหรือค่าสถานะ)
จะตอบสนองความต้องการของคุณ? หากไม่เป็นเช่นนั้นโปรดยื่นปัญหาใน <a
href="https://github.com/WICG/badging/issues">WICG / badging repo</a>
และให้รายละเอียดมากที่สุด นอกจากนี้ยังมี <a
href="https://github.com/WICG/badging/blob/master/choices.md">คำถามเปิด</a>
จำนวนหนึ่งที่ยังคงมีการพูดคุยกันอยู่และเราต้องการที่จะรับฟังความคิดเห็นของคุณ</aside>

เราสนใจที่จะรับฟังว่าคุณวางแผนที่จะใช้ Badging API:

- มีความคิดสำหรับกรณีการใช้งานหรือความคิดที่คุณจะใช้หรือไม่?
- คุณวางแผนที่จะใช้สิ่งนี้หรือไม่?
- ชอบและต้องการแสดงการสนับสนุนของคุณ?

แบ่งปันความคิดเห็นของคุณเกี่ยวกับการ [อภิปราย Badging API WICG
Discourse](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)

{% include "web/_shared/helpful.html" %}

## ลิงก์ที่มีประโยชน์ {: #helpful }

- [นักสำรวจสาธารณะ](https://github.com/WICG/badging/blob/master/explainer.md)
- [Badging API Demo](https://badging-api.glitch.me/) | [การคัดลอกซอร์ส API
การสาธิต](https://glitch.com/edit/#!/badging-api?path=demo.js)
-
[ข้อผิดพลาดในการติดตาม](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [รายการ
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- ขอ
[โทเค็นรุ่นทดลอง](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
-
[วิธีการใช้โทเค็นรุ่นทดลอง](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- ส่วนประกอบ Blink: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
