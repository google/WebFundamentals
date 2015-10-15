---
title: "הפוך את זה למגיב"
description: "האינטרנט נגיש במגוון עצום של מכשירים, מטלפונים קטנים ועד מסכי טלביזיות ענקים. למד כיצד לבנות אתר שעובד היטב בכל המכשירים הללו."
key-takeaways:
  make-responsive:
    - השתמש תמיד בviewport
    - תמיד להתחיל עם viewport צר בהתחלה ורק אז לצאת לממשקים רחבים יותר
    - לבסס את נקודות העצירה שלך כבויות כאשר אתה צריך להתאים את התוכן.
    - ליצור הפשטה ברמה גבוהה של הפריסה שלך על פני נקודות עצירה עקריות.
translators:
  - greenido
related-guides:
  responsive:
    -
      title: Setting the viewport
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Size content to the viewport
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Using Media Queries
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Layout patterns
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Layout Patterns"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Mostly Fluid layout
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Enhance imgs with srcset for high DPI devices"
      href: media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Images"
        href: media/images/
    - 
      title: "Use media queries to provide high res images or art direction"
      href: media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Images"
        href: media/images/
notes:
  styling:
    - אנו מניחים סדרה של סגנונות הכוללים צבע, ריפוד ועיצוב גופן התואמים את הנחיות המותג שלנו.
  not-all-at-once:
    - אתה לא צריך להעביר את כל האלמנטים בבת אחת, אתה יכול לבצע התאמות קטנות יותר במידת צורך..
updated_on: 2014-09-11
---

<p class="intro">
  האינטרנט נגיש במגוון עצום של מכשירים, מטלפונים קטנים ועד מסכי טלביזיות ענקים. למד כיצד לבנות אתר שעובד היטב בכל המכשירים הללו. כל מכשיר מציג יתרונות ייחודיים משלו וגם אילוצים. כמפתח, אתה אמור לתמוך בכל שלל המכשירים הללו באופן מיטבי.
</p>

{% include shared/toc.liquid %}

אנחנו בונים אתר שפועל על פני מסך בגדלים שונים ובמגוון מכשירים. [בארכיטקטורת]({{page.previousPage.relative_url}})  המידע של הדף ויצרה מבנה בסיסי. במדריך זה, אנחנו ניקח את המבנה הבסיסי שלנו עם תוכן ולהפוך אותו לדף יפה שמגיב למספר רב של גדלי מסך.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Content">
    <figcaption>{% link_sample _code/content-without-styles.html %} Content and structure {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Final site {% endlink_sample %} </figcaption>
  </figure>
</div>

בעקבות העקרונות של פיתוח רשת עם מחשבה על ניידים בתחילה, אנחנו מתחילים עם viewport צר &mdash; בדומה לטלפון נייד &mdash; אנו בונים עבור חווית משתמש כזו בתחילה.
לאחר מכן, אנו עולים למכשירים גדולים יותר.
אנחנו יכולים לעשות את זה על ידי התאמת ה viewport שלנו למסך רחב יותר וביצוע שיפוטי בשאלה האם העיצוב והפריסה נראים טוב.

מוקדם יותר יצרנו כמה עיצובים ברמת מקרו לאיך התוכן שלנו צריך להיות מוצג. עכשיו אנחנו צריכים להפוך את הדף שלנו לדינמי כך שהוא יוכל להסתגל לפריסות שונות אלה. אנו עושים זאת על ידי קבלת החלטה על היכן למקם את נקודות העצירה שלנו. &mdash; נקודה אשר בה העיצוב משתנה על הדף &mdash; בהתאם לתוכן כך שהוא יותאם לגודל המסך.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## הוסף viewport

אפילו לדף בסיסי, אתה **חייב** תמיד להוסיף את תג meta viewport. Viewport הוא המרכיב הקריטי ביותר שאתה צריך לבניית חוויות רב מכשיר. בלי זה, האתר שלך לא יעבוד היטב במכשירים ניידים.

Viewport מציין לדפדפן שהדף צריך להיות בקנה מידה מסויים כדי להתאים המסך. ישנן תצורות רבות ושונות שניתן לציין ל viewport שלך כדי לשלוט בתצוגה של הדף. בתור ברירת מחדל, אנו ממליצים:

{% include_code src=_code/viewport.html snippet=viewport %}

Viewport מתגורר בראש המסמך, ורק צריך להיות מוכלל פעם אחת.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## קבע סגנון פשוט

לחברה ולמוצר שלנו כבר יש (ברוב המקרים) מדריך מיתוג וגופן ספציפיים. הם מסופקים במדריך הסגנון.

### מדריך הסגנון

מדריך סגנון הוא דרך יעילה לקבלת הבנה ברמת על של הייצוג החזותי של הדף וזה עוזר לך לוודא שאתה עקבי בכל העיצוב.

#### צבעים

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### הוספת תמונות בסטייל

במדריך הקודם, הוספנו תמונות בשם "תמונות תוכן". אלה היו תמונות שהיו חשובות לנרטיב של המוצר שלנו. תמונות סגנונית הן תמונות שאינם נחוצות כחלק מתכני הליבה אבל מוסיפות לעיצוב ותורמות להנחות את תשומת לבו של המשתמש לפיסת התוכן ספציפי.

דוגמא טובה לכך היא תמונת כותרת לתוכן "מעל לקפל" (אותו קו שהמשתמש רואה תמיד). הוא משמש לעתים קרובות כדי לפתות את המשתמשים לגלול ולקרוא עוד על המוצר..

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Designed site">
</div>

הם יכולים להיות פשוטים מאוד להכללה על הדף. במקרה שלנו, זה יהיה הרקע לכותרת ואנו נחיל אותו באמצעות כמה חוקי CSS פשוטים.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

בחרנו תמונת רקע פשוטה שמטושטשת, כך שהיא לא לוקחת מהתוכן ויש לנו להגדיר אותה כ 'cover` על כל האלמנט; באופן שתמיד מותח אוה תוך שמירה על יחס ממדים נכון.


<br style="clear: both;">

## קבע את נקודת השבירה הראשונה 

העיצוב מתחיל להיראות רע ברוחב של 600px. במקרה שלנו, את אורכו של הקו הולך מעל 10 מילים (אורך הקריאה האופטימלי), ואותו אנו רוצים לשנות.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>סליחה אבל הדפדפן שלך לא תומך בהצגת וידאו
     <a href="videos/firstbreakpoint.mov">הורד את הוידאו</a>.
  </p>
</video>

600px נראה מקום טוב כדי לקבוע נקודת העצירה הראשונה שלנו מפני שהוא ייתן לנו מרווח כדי לשנות את מיקום אלמנטים כדי להפוך אותם מותאמים טוב יותר למסך. אנחנו יכולים לעשות את זה באמצעות טכנולוגיה המכונות [שאילתות מדיה(Media Queries)]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)



{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

יש יותר מקום על מסך גדול יותר כך יש יותר גמישות עם איך ניתן להציג תוכן.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

בהקשר של דף המוצר שלנו, נראה שאנחנו זקוקים למספר דברים:

* הגבל את הרוחב המרבי של העיצוב. 
* שנה את הריפוד של אלמנטים בכדי להקטין את גודל הטקסט. 
* העבר את הטופס לצוף בקנה אחד עם תוכן הכותרת. 
* הפוך את הווידאו לצף סביב התוכן. 
* הקטן את הגודל של התמונות וישר אותם לפי הרשת.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## הגבל את הרוחב המירבי של העיצוב

אנחנו בחרנו רק שתי פריסות עיקריות: תצוגה צרה ותצוגה רחבה, אשר מאוד מפשטות את תהליך הבנייה שלנו.

החלטתנו גם ליצור מקטעים על viewport הצר שישאר מלא גם על ה viewport הרחב. זה אומר שאנחנו צריכים להגביל את רוחב מרבי של המסך, כך שהטקסט ופסקאות לא התארכו לשורה ארוכה על מסכים רחבים במיוחד. בחרנו נקודה זו להיות על 800px.

כדי להשיג זאת, עלינו להגביל את הרוחב ולמרכז את האלמנטים. אנחנו צריך ליצור מיכל סביב כל סעיף עיקרי ולהחיל `margin: auto`. זה יאפשר המסך לגדול אבל התוכן יישאר מרוכז ובגודל מרבי של 800px.

המיכל יהיה 'div' פשוט בצורה הבאה:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## התאמת הריפוד ולהקטין את גודל טקסט

בחלון התצוגה הצר, אין לנו הרבה מקום להצגת תוכן. בשל כך יש להקטין באופן משמעותי את גודל ומשקל הכתב כדי שיתאימו מסך באופן טוב יותר.

עם viewport גדול יותר, אנחנו צריכים לקחת בחשבון שהמשתמש עובד עם מסך גדול יותר אבל גם נמצא רחוק יותר. כדי להגדיל את מידת הקריאות של תוכן, אנו יכולים להגדיל את הגודל ומשקל של הטיפוגרפיה. כמו כן, רצוי לשנות את הריפוד כדי להפוך את האזורים השונים לבולטים יותר.

בדף המוצר שלנו, נוכל להגדיל את הריפוד של אלמנטי הsection על ידי הגדרה שישאר ב5% מהרוחב. אנו גם נגדיל את גודל הכותרות לכל אחד מהסעיפים.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## לשנות את הריפוד ולהקטין את גודל טקסט

Viewport הצר שלנו היה תצוגה ליניארי שנערם. כל קטע עיקרי והתוכן בתוכם הוצג לפי סדר מלמעלה למטה.

Viewport רחב נותן לנו שטח נוסף לשימוש כדי להציג את התוכן בצורה אופטימלית למסך. לדף המוצר שלנו, על פי IA שאנחנו יכולים:

*  הזז את הטופס סביב פרטי הכותרת.
*  מקם את הווידאו בצד הימין של נקודות מפתח.
*  קבע את התמונות בפסיפס שיותאם למסך
*  הגדל את הטבלה

### הצף את (Form) 

המשמעות של Viewport צר היא כי יש לנו הרבה פחות שטח אופקי עבור האלמנטים על המסך.

כדי לעשות שימוש יעיל יותר של שטח המסך האופקי, אנחנו צריכים לפרוץ של הזרימה ליניארי של הכותרת ולהעביר את הטופס ורשימה להיות זה ליד זה.


{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>סליחה אבל הדפדפן שלך אינו תומך בוידאו
     <a href="videos/floatingform.mov">הורד את הוידאו</a>.
  </p>
</video>

### הצף את אלמנט הוידאו

הווידאו בממשק viewport צר נועד להיות ברוחב מלא של המסך ואת מיקומו נקבע לאחר הרשימה של התכונות העיקריות. על viewport רחב, הוידאו יהיה בהיקף גדול מדי ונראה שגוי כאשר נמקם אותו ליד רשימת תכונות.

אלמנט הווידאו צריך להיות מועבר אל מחוץ לזרימה האנכית של ה viewport הצר ואמור להיות מוצג ליד הרשימה עם תבליטים של תוכן.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### סדר את התמונות

התמונות בחלון התצוגה הצרה (מכשירים ניידים בעיקר) מוגדרות להיות ברוחב המלא של המסך ולהערם בצורה אנכית. זה לא מתכוונן היטב לחלון תצוגה רחבה.

כדי להפוך את התמונות כדי שיראו טוב בחלון תצוגה רחבה, אנו נמתח אותן ל30% מרוחב המכל כאשר הוא אופקי (ולא אנכי במבט הצר על המכשיר). אנו גם להוסיף קצת רדיוס גבול ותיבת צל כדי להפוך את התמונות נראות מושכות יותר.


<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### ליצור תמונות מגיבות ל DPI

בעת שימוש בתמונות, יש לקחת את הגודל של נקודת מבט ואת הצפיפות של התצוגה בחשבון.

האינטרנט נבנה למסכי 96 dpi. עם כניסתם של מכשירים ניידים, ראינו גידול ניכר בצפיפות פיקסלים של המסכים הללו. יתרה מכך, במחשבים ניידים יש גם retina . משום כך, תמונות שמקודדות ל96 dpi לעתים קרובות נראה נורא על מכשיר היי dpi.

יש לנו פתרון שלא אומץ באופן נרחב עדיין. עבור דפדפנים שתומכים בה, אתה יכול להציג תמונה בצפיפות גבוהה על תצוגת צפיפות גבוהה.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### אבלאות

טבלאות הן אלמנט קשה כדי להתאימן על מכשירים שיש להם חלון תצוגה צרה וצריכים התייחסות מיוחדת.


אנו ממליצים על viewport צר שאתה בונה את הטבלה שלך לשתי שורות, ולהחליף את הכותרת ותאים בשורה כדי להפוך אותם לעמודה.


<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/responsivetable.mov">비디오 다운로드하기</a>.
  </p>
</video>

באתר שלנו, היינו צריכים ליצור נקודת עצירה נוספת רק לתוכן הטבלה. כאשר אתה בונה למכשיר נייד בתחילה, קשה יותר לבטל סגנונות שימושיים. לכן אנחנו חייבים להחליף את ה CSS של ה viewport הצר מה viewport הרחב. זה נותן לנו הפסקה ברורה ועקבית.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## לסיכום

** מזל טוב. ** אם אתה קורא את זה, אתה כבר בנית את העמוד מוצר הראשון שלך שעובד על פני מגוון גדול של מכשירים, גדלי טופס, וגדלי מסכים.


אם תפעל לפי ההנחיות הבאות, אתה תהיה על המסלול להתחלה טובה:

1.  צור IA בסיסי ולמד את מבנה התוכן שלך לפני שאתה מקודד.
2.  תמיד הגדר viewport.
3.  צור את החוויה הבסיסית סביב הגישה של mobile-first
4.  ברגע שיש לך החוויה הניידת, תוכל להגדיל את הרוחב של התצוגה עד שזה לא נראה טוב ולהגדיר נקודת העצירה שם.
5.  המשך לנסות ולהתאים


