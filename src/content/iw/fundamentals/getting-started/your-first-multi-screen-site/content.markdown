---
title: "צור את התוכן והמבנה"
description: "תוכן הוא ההיבט החשוב ביותר של כל אתר. במדריך זה, נבחן כיצד אתה יכול לתכנן ביעילות כדי לבנות את האתר הרב מכשירי הראשון שלך."
notes:
  styling:
    - הסטייל יגיע מאוחר יותר.
updated_on: 2014-10-07
translators:
  - greenido
related-guides:
  create-amazing-forms:
    -
      title: Create amazing forms
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Label and name inputs correctly
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Choose the best input type
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: Forms
        href: fundamentals/input/form/
  video:
    -
      title: Using video effectively
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Change the starting position
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Include a poster image
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
  images:
    -
      title: Using images effectively
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title:  Correct use of images in markup
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title: Image optimization
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/

key-takeaways:
  critical-content:
    - אפיין את התוכן לו אתה זקוק בתחילה
    - לשרטט את ארכיטקטורת מידע (IA) לviewports הצר ורחב.
    - יצירת תצוגת שלד של הדף עם תוכן אבל בלי סגנון.
---

<p class="intro">
  תוכן הוא ההיבט החשוב ביותר של כל אתר. אז רצוי לעצב עבור התוכן ולא לתת לעיצוב להכתיב את התוכן. במדריך זה, אנו מזהים את התוכן שאנחנו צריכים בעדיפות ראשונה, ליצור מבנה דף המבוסס עליו ולאחר מכן, תציג את הדף בפריסה ליניארית שעובדת היטב על viewports הצר ורחב.
</p>

{% include shared/toc.liquid %}

## צור את מבנה הדף

אנו זיהינו שאנחנו צריכים:

1. קטע שיתאר במבט על את המוצר שלנו: "CS256: Mobile web development"
2. טופס לאיסוף מידע ממשתמשים שמעוניינים במוצר שלנו
3. תיאור מעמיק של הוידאו
4. תמונות שמראות את המוצר בפעולה
5. טבלת הנתונים עם מידע כדי לגבות את הטענות

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

אנחנו גם צריכים לבוא עם ארכיטקטורת מידע ופריסה עבור שני viewports הצר ורחב.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

זה ניתן להמיר בקלות לחלקים של דף שלד שאנו נשתמש לשאר הפרויקט הזה.

{% include_code src=_code/addstructure.html snippet=structure %}

## הוסף תוכן לדף

המבנה הבסיסי של האתר הושלם. אנחנו יודעים את הסעיפים שאנחנו צריכים, תוכן שניתן להציג בסעיפים אלו, והיכן למקם אותו בכללי ארכיטקטורת מידע. כעת אנו יכולים להתחיל לבנות את האתר.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### צור את הכותרת והטופס

הכותרת וטופס הבקשה הם הרכיבים הקריטיים של בדף שלנו. אלה חייבים להיות מוצגים למשתמש באופן מיידי.

בכותרת, הוסף טקסט פשוט כדי לתאר את המהלך:

{% include_code src=_code/addheadline.html snippet=headline %}

אנחנו צריכים גם למלא את הטופס. זה יהיה טופס פשוט שאוסף שמות של המשתמשים, מספרי הטלפון שלהם, וזמן נוח להם להתקשרות.

כל הטפסים צריכים תוויות ומצייני מיקום כדי להקל על משתמשים להתמקד באלמנטים, להבין מה הוא אמור ללכת בהם, וגם כדי לעזור לכלי נגישות להבין את המבנה של הטופס. שם התכונה (name attribute) לא רק שולח את ערך הטופס לשרת, הוא משמש גם כדי לתת לי רמז חשוב לדפדפן כיצד למלא באופן אוטומטי את הטופס עבור המשתמש.

אנחנו נוסיף סוגים סמנטיים כדי לעשות את זה מהיר ופשוט למשתמשים להיות מסוגלים להזין תוכן במכשיר נייד. לדוגמא, בעת הזנת טלפון מספר, המשתמש צריך רק לראות לוח מקשי חיוג.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### צור את חלק הוידאו והמידע

החלק בדף של הוידאו והמידע יכיל יותר עומק. תהיה לה רשימה של התכונות של המוצרים שלנו והחלק הזה, גם יכיל מציין מיקום לוידאו שמראה את המוצר שלנו עובד עבור המשתמש.

{% include_code src=_code/addcontent.html snippet=section1 %}

סרטי וידאו משמשים לעתים קרובות כדי לתאר את התוכן באופן אינטראקטיבי, והם משמשים לעתים קרובות כדי להראות הדגמה של מוצר או רעיון.

על ידי ביצוע שיטות העבודה מומלצת הללו, אתה יכול בקלות לשלב וידאו לתוך האתר שלך:

*  להוסיף `תכונת controls` כדי להקל על אנשים את ההפעלה של הווידאו. 
*  הוסף תמונת `poster` לתת לאנשי תצוגה מקדימה של התוכן. 
*  הוספה מספר `<source>` אלמנטים המבוססים על פורמטי וידאו נתמכים. 
*  הוספת טקסט התאמה לאחור כדי לאפשר לאנשים להוריד את הווידאו, אם הם לא יכולים לראות אותו. 

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### צור את חלק התמונות

אתרים ללא תמונות יכולים להיות קצת משעממים. ישנם שני סוגים של תמונות:

*  הפוך תמונות תוכן (Content Images) &mdash; תמונות שמוטמעות במסמך משמשות להעברת מידע נוסף על הוכן.
*  תמונות לסטייל (Stylistic Image) &mdash; תמונות שמשמשות להעניק לאתר מראה משופר. בדרך כלל, אילו הם תמונות רקע או תמונות תבנית. אנו נעבור על זה בחלק הבא [מאמר הבא]({{page.nextPage.relative_url}}).

קטע התמונות בדף שלנו הוא אוסף של תמונות תוכן.

תמונות תוכן הן קריטיות להעברת המשמעות של הדף. תחשוב עליהם כמו על התמונות אשר נמצאות בשימוש במאמרי עיתונות. התמונות שאנו משתמשים הן תמונות של המורים על הפרויקט: כריס ווילסון, פיטר לוברס ושון בנט.

{% include_code src=_code/addimages.html snippet=images lang=html %}

התמונות מוגדרות בקנה מידה לרוחב של המסך 100%. זה עובד גם על מכשירים עם viewport צר, אבל פחות טוב באלה עם viewport רחב (כמו שולחן עבודה). אנחנו ננהל את זה בסעיף responsive design.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

ישנם אנשים רבים אשר לא יכולים לראות את התמונות ומשתמשים לעתים קרובות בעזר כגון קורא מסך כדי לנתח את הנתונים בדף וטכנולוגיה להעביר את זה למשתמש באופן מילולי. אתה צריך לוודא שכל התוכן של התמונות יכלול את התג התיאורי `alt` שהקורא המסך יכול לדבר אל המשתמש.

בעת הוספה 'תגי alt` יש לוודא שאתה שומר את טקסט alt תמציתי כמו אפשר לתאר את התמונה באופן מלא. לדוגמא בדמו שלנו אנחנו מאתחלים את התכונה להיות "שם: תפקיד", זה מציג מספיק מידע למשתמש להבין כי סעיף זה הוא על המחברים ועל מה העבודה שלהם היא.

### הוסף רשימה של מידע

החלק האחרון הוא טבלה פשוטה המשמשת כדי להראות מספר סטטיסטיקות מוצר ספציפיות.

יש להשתמש בטבלאות רק לנתונים טבלאיים, כלומר, מטריצות של מידע.

{% include_code src=_code/addcontent.html snippet=section3 %}

### הוסף את החלק התחתון (Footer)

רוב האתרים צריכים כותרת תחתונה כדי להציג תוכן כגון תנאים והגבלות, כתבי ויתור, ותכנים אחרים שאינם אמורים להיות בניווט הראשי או באזור התוכן העיקרי של העמוד.

באתר שלנו, אנו רק מקשרים לתנאי שימוש, דף יצירת קשר, ופרופילי המדיה החברתית שלנו.

{% include_code src=_code/addcontent.html snippet=footer %}

## סיכום

אנחנו יצרנו את קווי המתאר של האתר וזיהינו את כל האלמנטים מבניים הראשיים. בנוסף, גם דאגנו לכך שיש לנו את כל התוכן העיקרי מוכן ובמקום כדי לספק את הצרכים העסקיים שלנו.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

תוכל להבחין כי העמוד נראה נורא עכשיו; זה הוא מכוון. תוכן הוא ההיבט החשוב ביותר של כל אתר ואנחנו צריכים לוודא שיש לנו את האדריכלות הטובה ביותר להצפת המידע. מדריך זה נתן לנו בסיס מצוין לבנות עליו. אנו נשפר את הסטייל של התוכן שלנו במדריך הבא.


