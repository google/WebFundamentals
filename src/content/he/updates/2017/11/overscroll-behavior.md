project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: מבוא למאפיין התנהגות יתר של CSS.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# השתלט על המגילה שלך: התאמה אישית של אפקטים של משיכה לרענון והצפת יתר {: .page-title }

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

### TL; DR {: #tldr .hide-from-toc}

המאפיין [`overscroll-behavior` CSS](https://wicg.github.io/overscroll-behavior/)
מאפשר למפתחים לבטל את התנהגות הגלילה של ברירת המחדל של דפדפן כאשר הם מגיעים לראש
/ התחתון של התוכן. מקרי שימוש כוללים השבתת תכונת המשיכה לרענון בנייד, הסרת אפקט
זוהר של גלילה יתר והגומייה ומניעת גלילת תוכן העמוד כשהוא נמצא תחת שכבה / כיסוי.

`overscroll-behavior` מחייבת Chrome 63+. זה נמצא בפיתוח או נחשב על ידי דפדפנים
אחרים. ראה
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) למידע
נוסף. {: .caution }

## רקע כללי

### גלול גבולות ושרשור גלילה {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>שרשור גלילה באנדרואיד Chrome.</figcaption>
</figure>

גלילה היא אחת הדרכים הבסיסיות ביותר לקיים אינטראקציה עם דף, אך דפוסי UX מסוימים
יכולים להיות מסובכים להתמודד איתם בגלל התנהגויות ברירת המחדל המוזרות של הדפדפן.
כדוגמה, קח מגירת אפליקציה עם מספר גדול של פריטים שאולי המשתמש יצטרך לגלול בהם.
כאשר הם מגיעים לתחתית, מיכל הצפת מפסיק לגלול מכיוון שאין עוד תוכן לצרוך. במילים
אחרות, המשתמש מגיע ל"גבול גלילה ". אך שימו לב מה קורה אם המשתמש ימשיך לגלול.
**התוכן *שמאחורי* המגירה מתחיל לגלול** ! הגלילה משתלטת על ידי מיכל האב; הדף
הראשי עצמו בדוגמה.

מתברר שהתנהגות זו נקראת **שרשור גלילה** ; התנהגות ברירת המחדל של הדפדפן בעת
גלילת תוכן. לעיתים ברירת המחדל היא די נחמדה, אבל לפעמים היא לא רצויה ואפילו לא
צפויה. יישומים מסוימים עשויים לרצות לספק חווית משתמש שונה כאשר המשתמש פוגע בגבול
הגלילה.

### האפקט למשוך לרענון {: #p2r }

משיכה לרענון היא מחווה אינטואיטיבית הפופולרית על ידי אפליקציות סלולריות כמו
פייסבוק וטוויטר. הוצאת העדכון החברתי ושחרורו יוצרת מרחב חדש לטעינת הפוסטים
האחרונים. למעשה, ה- UX הספציפי הזה הפך להיות *כל כך פופולרי* עד שדפדפני הנייד
כמו כרום באנדרואיד אימצו את אותו האפקט. החלקה כלפי מטה בראש הדף מרעננת את כל
הדף:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>משיכה לרענון המותאמת אישית של טוויטר <br> כאשר מרעננים עדכון ב-
PWA שלהם.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>הפעולה המקורית של Chrome ל- Android לרענון <br> מרענן את הדף
כולו.</figcaption>
  </figure>
</div>

במצבים כמו ה- [PWA של](/web/progressive-web-apps/) טוויטר, ייתכן שיהיה הגיוני
להשבית את פעולת ה- pull-to-refresh. למה? באפליקציה זו אתם בטח לא רוצים שהמשתמש
ירענן בטעות את הדף. יש גם פוטנציאל לראות אנימציה רעננה כפולה! לחלופין, ייתכן
שיהיה נחמד יותר להתאים את פעולת הדפדפן ולהתאים אותה יותר למיתוג האתר. החלק המצער
הוא שסוג זה של התאמה אישית היה קשה להסתלק. מפתחים בסופו של דבר כותבים JavaScript
מיותר, מוסיפים מאזיני מגע [לא
פסיביים](/web/tools/lighthouse/audits/passive-event-listeners) (החוסמים גלילה)
או מדביקים את הדף כולו ב- 100vw / vh `<div>` (בכדי למנוע את הדף לעלות על
גדותיו). לעקיפת הבעיה יש השפעות שליליות [מתועדות
היטב](https://wicg.github.io/overscroll-behavior/#intro) על ביצועי הגלילה.

אנחנו יכולים לעשות טוב יותר!

## הצגת `overscroll-behavior` {: #intro }

[המאפיין](https://wicg.github.io/overscroll-behavior/) `overscroll-behavior` הוא
תכונה חדשה של CSS ששולטת בהתנהגות של מה שקורה כשגלילה יתר על המכולה (כולל הדף
עצמו). אתה יכול להשתמש בו כדי לבטל שרשור גלילה, השבתה / התאמה אישית של פעולת
המשיכה לרענון, השבתת אפקטים של גומייה ב- iOS (כאשר ספארי מיישמת
`overscroll-behavior` ) ועוד. החלק הטוב ביותר הוא <strong
data-md-type="double_emphasis">ששימוש `overscroll-behavior` לא משפיע לרעה על
ביצועי הדפים</strong> כמו פריצות המוזכרות במבוא!

הנכס לוקח שלושה ערכים אפשריים:

1. **אוטומטי** - ברירת מחדל. מגילות שמקורן באלמנט עשויות להתפשט לאלמני אבות.

- **להכיל** - מונע שרשור גלילה. מגילות אינן מתפשטות לאבות אבות, אך מוצגות השפעות
מקומיות בצומת. לדוגמה, אפקט הזוהר של גלילה יתר על אנדרואיד או אפקט הגומייה ב-
iOS שמודיע למשתמש כאשר הוא פגע בגבול הגלילה. **הערה:** באמצעות
`overscroll-behavior: contain` על `html` האלמנט מונעת פעולות ניווט גלילת יתר.
- **אין** - זהה `contain` אך הוא גם מונע אפקטים של גלילות יתר בתוך הצומת עצמו
(למשל זוהר של אנדרואיד יתר של אנדרואיד או גומייה של iOS).

הערה: `overscroll-behavior` תומכת גם `overscroll-behavior` עבור
`overscroll-behavior-x` `overscroll-behavior-y` `overscroll-behavior-x`
`overscroll-behavior-y` אם אתה רק רוצה להגדיר התנהגויות עבור ציר מסוים.

בואו נצלול לכמה דוגמאות כדי לראות כיצד להשתמש `overscroll-behavior` .

## מנע מגלישות לברוח מרכיב מיקום קבוע {: #fixedpos }

### תרחיש תיבת הצ'אט {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>תוכן מתחת לחלון הצ'אט גלול מדי :(</figcaption>
</figure>

שקול תיבת צ'אט עם מיקום קבוע שיושבת בתחתית הדף. הכוונה היא שתיבת הצ'אט היא רכיב
עצמאי וכי היא גוללת בנפרד מהתכנים שמאחוריה. עם זאת, בגלל שרשור הגלילה, המסמך
מתחיל לגלול ברגע שהמשתמש פוגע בהודעה האחרונה בהיסטוריית הצ'אט.

עבור אפליקציה זו, מתאים יותר שגלילות שמקורן בתיבת הצ'אט יישארו בצ'אט. אנו יכולים
לגרום לזה לקרות על ידי הוספת `overscroll-behavior: contain` אלמנט המחזיק את
הודעות הצ'אט:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

בעיקרו של דבר, אנו יוצרים הפרדה הגיונית בין הקשר הגלילה של תיבת הצ'אט לדף הראשי.
התוצאה הסופית היא שהדף הראשי נשאר במצב כשהמשתמש מגיע לראש / התחתון של היסטוריית
הצ'אט. מגילות המתחילות בתיבת הצ'אט אינן מתפשטות.

### תרחיש שכבת העל של הדף {: #overlay }

וריאציה נוספת לתרחיש "קו תחתון" היא כאשר אתה רואה גלילה של תוכן מאחורי **שכבת
מיקום קבועה** . `overscroll-behavior` מתה מתה היא בסדר! הדפדפן מנסה להועיל, אך
בסופו של דבר האתר יראה באגי.

**דוגמה** - מודאלית עם או בלי `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>לפני</b> : תוכן העמוד גלול מתחת לכיסוי.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>אחרי</b> : תוכן העמוד אינו גלול מתחת לשכבת העל.</figcaption>
  </div>
</figure>

## השבתת משיכה לרענון {: #disablp2r }

**כיבוי הפעולה למשוך לרענון הוא שורה אחת של CSS** . פשוט למנוע שרשור גלילה על כל
האלמנט המגדיר את התצוגה. ברוב המקרים זהו `<html>` או `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

עם התוספת הפשוטה הזו, אנו מתקנים את ההנפשות הכפולות למשיכה-לרענון
[בהדגמת](https://ebidel.github.io/demos/chatbox.html) תיבת
[הצ'ט](https://ebidel.github.io/demos/chatbox.html) ויכולים במקום זאת ליישם אפקט
מותאם אישית המשתמש בהנפשת טעינה נאה יותר. כל תיבת הדואר הנכנס מיטשטשת ככל שתיבת
הדואר הנכנס מתרעננת:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>לפני</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>לאחר</figcaption>
  </div>
</figure>

להלן קטע [הקוד המלא](https://github.com/ebidel/demos/blob/master/chatbox.html) :

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

## השבתת אפקטים של זוהר וגלישת סרט גומי {{}

כדי להשבית את אפקט הניתור בעת פגיעה בגבול גלילה, השתמש `overscroll-behavior-y:
none` :

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
    <figcaption><b>לפני</b> : פגיעה בגבול הגלילה מראה זוהר.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>אחרי</b> : זוהר מושבת.</figcaption>
  </div>
</figure>

הערה: זה עדיין ישמור על ניווט החלקה שמאלה / ימינה. כדי למנוע ניווט, באפשרותך
להשתמש `overscroll-behavior-x: none` . עם זאת, זה [עדיין
מיושם](https://crbug.com/762023) ב- Chrome.

## הדגמה מלאה {: #demo }

[הדגמת](https://ebidel.github.io/demos/chatbox.html) `overscroll-behavior`
[הצ'אט](https://ebidel.github.io/demos/chatbox.html) המלאה
[מחברת](https://ebidel.github.io/demos/chatbox.html) את הכל ביחד, משתמשת
`overscroll-behavior` כדי ליצור אנימציה מותאמת אישית לרענון ולהשבית מגילות מבלי
להימלט מהווידג'ט של תיבת הצ'אט. זה מספק חוויית משתמש אופטימלית שהיה קשה להשיג
ללא `overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">צפה בהדגמה</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">מקור</a></figcaption>
</figure>

<br>
