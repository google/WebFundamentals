project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: ממשק ה- API של התיוג הוא ממשק API חדש לפלטפורמת האינטרנט המאפשר ליישומי
  אינטרנט מותקנים להגדיר תג רחב של יישומים, המוצג במקום ספציפי למערכת הפעלה המשויך
  ליישום, כמו המדף או מסך הבית.

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

# תיוג עבור סמלי אפליקציות {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">אנו עובדים כרגע על ממשק API זה כחלק <a
href="/web/updates/capabilities">מפרויקט היכולות</a> החדש, החל מ- Chrome 73 הוא
זמין <a href="#ot"><b>כניסוי מקור</b></a> . פוסט זה יעודכן עם התפתחות ממשק ה-
API של התג. <br> <b>עודכן לאחרונה:</b> 21 באוגוסט, 2019</aside>

## מהו ממשק ה- API של התגית? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>דוגמה לטוויטר עם 8 התראות ואפליקציה אחרת המציגה תג מסוג
דגל.</figcaption>
</figure>

ממשק ה- API של התיוג הוא ממשק API חדש לפלטפורמת האינטרנט המאפשר ליישומי אינטרנט
מותקנים להגדיר תג רחב של יישומים, המוצג במקום ספציפי למערכת הפעלה המשויך ליישום
(כמו המדף או מסך הבית).

התגית מקלה להודיע למשתמש בצורה עדינה שיש פעילות חדשה שעשויה לדרוש את תשומת ליבם,
או שניתן להשתמש בה כדי להצביע על כמות קטנה של מידע, כגון ספירה שלא נקראה.

התגים נוטים להיות ידידותיים למשתמש יותר מהודעות, וניתן לעדכן אותם בתדירות גבוהה
בהרבה מכיוון שהם אינם מפריעים למשתמש. מכיוון שהם אינם מפריעים למשתמש, אין צורך
בהרשאה מיוחדת להשתמש בהם.

[קרא מסביר](https://github.com/WICG/badging/blob/master/explainer.md) {: .button
.button-primary }

<div class="clearfix"></div>

### מקרי שימוש מוצעים עבור ממשק ה- API של התגית {: #use-cases }

דוגמאות לאתרים שעשויים להשתמש בממשק API זה כוללים:

- צ'אט, דואר אלקטרוני ואפליקציות חברתיות, כדי לאותת על כך שהודעות חדשות הגיעו,
או להציג את מספר הפריטים שלא נקראו.
- אפליקציות פרודוקטיביות, כדי לאותת שמשימת רקע שיצאה לאורך זמן (כגון הצגת תמונה
או וידאו) הושלמה.
- משחקים, כדי לאותת שנדרשת פעולת שחקן (למשל, בשחמט, כאשר הגיע תורו של השחקן).

## סטטוס נוכחי {: #status }

שלב | סטטוס
--- | ---
1. צור מסביר | [שלם](https://github.com/WICG/badging/blob/master/explainer.md)
2. צור טיוטת מפרט ראשונית | [שלם](https://wicg.github.io/badging/)
**3. אסוף משוב וחזר על עיצוב** | [**בתהליך**](#feedback)
**4. משפט מוצא** | [**בתהליך**](#ot)
5. השקה | לא התחיל

### ראה את זה בפעולה

1. באמצעות Chrome 73 ומעלה ב- Windows או Mac, פתח את [הדגמת ה- API של
Badging](https://badging-api.glitch.me/) .
2. כשתתבקש, לחץ על **התקן** כדי להתקין את האפליקציה, או השתמש בתפריט Chrome כדי
להתקין אותה, ואז פתח אותה כ PWA המותקן. שים לב, עליו להיות פועל כ- PWA מותקן
(בסרגל המשימות או במעגן שלך).
3. לחץ על כפתור **הגדר** או **נקה** כדי להגדיר או לנקות את התג מסמל האפליקציה.
אתה יכול גם לספק מספר *לערך התג* .

הערה: בעוד שממשק ה- API של התגית *בכרום* דורש אפליקציה מותקנת עם אייקון שלמעשה
ניתן לתייג, אנו ממליצים שלא לבצע שיחות לממשק ה- API של התגית תלויות במצב ההתקנה.
ממשק ה- API של התגית יכול לחול *בכל מקום* בו הדפדפן ירצה להציג תג, לכן המפתחים
לא צריכים להניח הנחות באילו מצבים הדפדפן יגרום לתגיות לעבוד. פשוט התקשר לממשק ה-
API כאשר הוא קיים. אם זה עובד, זה עובד. אם לא, זה פשוט לא.

## כיצד להשתמש בממשק ה- API של התגית {: #use }

החל מ- Chrome 73, ממשק ה- API של התגית זמין כניסוי מקור עבור Windows (7+) ו-
macOS. [ניסויי
מקור](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
מאפשרים לך לנסות תכונות חדשות ולתת משוב על השימושיות, המעשיות והיעילות לנו
ולקהילה הסטנדרטית ברשת. לקבלת מידע נוסף, עיין [במדריך לניסיונות מקור למפתחי
אתרים](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### תמיכה בתגיות על פני פלטפורמות

ממשק API לתגיות נתמך (בניסוי מקור) ב- Windows ו- macOS. אנדרואיד אינה נתמכת
מכיוון שהיא מחייבת להציג הודעה, אם כי הדבר עשוי להשתנות בעתיד. התמיכה במערכת
ההפעלה של Chrome ממתינה ליישום תגים בפלטפורמה.

### הירשם למשפט המקור {: #ot }

1. [בקש
אסימון](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
למוצא שלך.
2. הוסף את האסימון לדפים שלך, יש שתי דרכים לספק אסימון זה בכל דפים במקורך: 
-  הוסף תג `<meta>` `origin-trial` לראש כל עמוד. לדוגמה, זה עשוי להיראות
כמו: `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
-  אם אתה יכול להגדיר את השרת שלך, אתה יכול גם לספק את האסימון בדפים באמצעות
כותרת HTTP של `Origin-Trial` . כותרת התגובה שהתקבלה צריכה להיראות כמו:
`Origin-Trial: TOKEN_GOES_HERE`

### אלטרנטיבות למשפט המקור

אם ברצונך להתנסות בממשק ה- API של התגיות באופן מקומי, ללא ניסיון מקור, הפעל את
`#enable-experimental-web-platform-features` דגל ב- `chrome://flags` .

### שימוש בממשק ה- API של התגית במהלך משפט המקור

מזון לכלבים: במהלך ניסוי המקור, ה- API יהיה זמין דרך `window.ExperimentalBadge`
. `window.ExperimentalBadge` . הקוד שלהלן מבוסס על העיצוב הנוכחי, וישתנה לפני
שהוא נוחת בדפדפן כממשק API סטנדרטי.

כדי להשתמש בממשק ה- API של התיוג, אפליקציית האינטרנט שלך צריכה לעמוד
[בקריטריונים להתקנות של Chrome](/web/fundamentals/app-install-banners/#criteria)
, ועל המשתמש להוסיף אותה למסך הבית שלהם.

ממשק `ExperimentalBadge` הוא אובייקט חבר `window` . הוא מכיל שתי שיטות:

- `set([number])` : מגדיר את התג של האפליקציה. אם קיים ערך, קבע את התג לערך
שסופק אחרת, הציג נקודה לבנה רגילה (או דגל אחר בהתאם לפלטפורמה).
- `clear()` : מסיר את התג של האפליקציה.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

ניתן לקרוא `ExperimentalBadge.set()` ו- `ExperimentalBadge.clear()` מדף חזית, או
פוטנציאל בעתיד, עובד שירות. בשני המקרים זה משפיע על האפליקציה כולה, ולא רק על
הדף הנוכחי.

במקרים מסוימים, מערכת ההפעלה עשויה שלא לאפשר ייצוג מדויק של התג, במקרה זה הדפדפן
ינסה לספק את הייצוג הטוב ביותר עבור אותו מכשיר. לדוגמה, בעוד שממשק ה- API של
התגית אינו נתמך באנדרואיד, אנדרואיד מציגה רק נקודה במקום ערך מספרי.

הערה: אל תניח שום דבר לגבי האופן בו סוכן המשתמש רוצה להציג את התג. אנו מצפים
שסוכני משתמש יקחו מספר כמו "4000" וישכתב אותו כ- "99+". אם אתה רווי את זה בעצמך
(למשל ל" 99 ") אז" + "לא יופיע. לא משנה את המספר בפועל, פשוט הגדר את
`Badge.set(unreadCount)` ותן לסוכן המשתמש להתמודד עם `Badge.set(unreadCount)`
בהתאם.

## משוב {: #feedback }

אנו זקוקים לעזרתכם בכדי להבטיח שממשק ה- API של התגית יפעל בצורה העונה על הצרכים
שלכם ושאנחנו לא מפספסים תרחישים מרכזיים.

<aside class="key-point"><b>אנחנו צריכים את עזרתך!</b> - האם העיצוב הנוכחי
(המאפשר מספר שלם או ערך דגל) יענה לצרכים שלך? אם לא, אנא הגש בעיה במתחם ה- <a
href="https://github.com/WICG/badging/issues">WICG / התג וספק</a> פרטים רבים ככל
שתוכל. בנוסף, יש מספר <a
href="https://github.com/WICG/badging/blob/master/choices.md">שאלות פתוחות</a>
שעדיין נדונות בהן, ואנחנו מעוניינים לשמוע את המשוב שלך.</aside>

אנו מעוניינים לשמוע כיצד אתה מתכנן להשתמש בממשק ה- API של התגית:

- יש לך רעיון למקרה שימוש או רעיון שבו היית משתמש בו?
- האם אתה מתכנן להשתמש בזה?
- אוהב את זה, ואתה רוצה להראות את התמיכה שלך?

שתף את מחשבותיך בדיון [השיח של ה- WICG API של
Badging](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
.

{% include "web/_shared/helpful.html" %}

## קישורים מועילים {: #helpful }

- [מסביר ציבורי](https://github.com/WICG/badging/blob/master/explainer.md)
- [הדגמת API של תגים](https://badging-api.glitch.me/) | [מקור הדגמת API של
התג](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [מעקב באג](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [כניסה של
ChromeStatus.com](https://www.chromestatus.com/features/6068482055602176)
- בקש [אסימון לניסיון
מקור](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [כיצד להשתמש באסימת ניסוי
מקור](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- רכיב מהבהב: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
