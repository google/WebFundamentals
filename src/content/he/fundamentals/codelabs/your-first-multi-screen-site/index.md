project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: האינטרנט נגיש במגוון עצום של מכשירים. מטלפונים עם מסך קטן ועד לטלביזיות ענק. למד כיצד לבנות אתר שעובד היטב על פני כל המכשירים הללו.

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# האתר הראשון שלך שמותאם למגוון מכשירים {: .page-title }

Caution: This article has not been updated in a while and may not reflect reality. Instead, check out the free [Responsive Web Design](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893){: .external } course on Udacity.

{% include "web/_shared/contributors/paulkinlan.html" %}

בניית חוויה ״רב מכשירית״ היא לא קשה כמו שזה נשמע. על ידי מעבר על מדריך זה, נוכל לבנות דף נחיתה למוצר <a href='https://www.udacity.com/course/mobile-web-development--cs256'>CS256 קורס לפיתוח לאתרים ניידים</a><br>שיעבוד היטב על פני מגוון רחב של מכשירים

<img src="images/finaloutput-2x.jpg" alt="many devices showing the final project">

בנייה עבור מספר מכשירים עם יכולות שונות, דרכי אינטראקציה שונות וכמובן, גדלי מסך שונים יכולה להיראות מרתיעה, אם לא בלתי אפשרית.

זה לא קשה לבנות אתרים מגיבים באופן מלא כמו שנראה לך. כדי לשכנע, מדריך זה לוקח אותך דרך השלבים צעד אחר צעד. אתה מוזמן להשתמש בו כדי להתחיל.<br> חלקנו את הדרך לשתי צעדים פשוטים:

1.  הגדר את (Information Architecture, IA) ובנה את השלד של העמוד.
2.  הוסף את האלמנטים של העיצוב כדי להפוך את העמוד למותאם ודאג שהוא יראה טוב על מגוון מכשירים וגדלי מסך שונים.



## צור את התוכן והמבנה 


תוכן הוא ההיבט החשוב ביותר של כל אתר. אז רצוי לעצב עבור התוכן ולא לתת לעיצוב להכתיב את התוכן. במדריך זה, אנו מזהים את התוכן שאנחנו צריכים בעדיפות ראשונה, ליצור מבנה דף המבוסס עליו ולאחר מכן, תציג את הדף בפריסה ליניארית שעובדת היטב על viewports הצר ורחב.


### צור את מבנה הדף

אנו זיהינו שאנחנו צריכים:

1. קטע שיתאר במבט על את המוצר שלנו: "CS256: Mobile web development"
2. טופס לאיסוף מידע ממשתמשים שמעוניינים במוצר שלנו
3. תיאור מעמיק של הוידאו
4. תמונות שמראות את המוצר בפעולה
5. טבלת הנתונים עם מידע כדי לגבות את הטענות



אנחנו גם צריכים לבוא עם ארכיטקטורת מידע ופריסה עבור שני viewports הצר ורחב.

<img class="attempt-left" src="images/narrowviewport.png" alt="Narrow Viewport IA">
<img  class="attempt-right" src="images/wideviewport.png" alt="Wide Viewport IA">
<div class="clearfix"></div>


זה ניתן להמיר בקלות לחלקים של דף שלד שאנו נשתמש לשאר הפרויקט הזה.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### הוסף תוכן לדף

המבנה הבסיסי של האתר הושלם. אנחנו יודעים את הסעיפים שאנחנו צריכים, תוכן שניתן להציג בסעיפים אלו, והיכן למקם אותו בכללי ארכיטקטורת מידע. כעת אנו יכולים להתחיל לבנות את האתר.

Note: הסטייל יגיע מאוחר יותר.

#### צור את הכותרת והטופס

הכותרת וטופס הבקשה הם הרכיבים הקריטיים של בדף שלנו. אלה חייבים להיות מוצגים למשתמש באופן מיידי.

בכותרת, הוסף טקסט פשוט כדי לתאר את המהלך:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

אנחנו צריכים גם למלא את הטופס. זה יהיה טופס פשוט שאוסף שמות של המשתמשים, מספרי הטלפון שלהם, וזמן נוח להם להתקשרות.

כל הטפסים צריכים תוויות ומצייני מיקום כדי להקל על משתמשים להתמקד באלמנטים, להבין מה הוא אמור ללכת בהם, וגם כדי לעזור לכלי נגישות להבין את המבנה של הטופס. שם התכונה (name attribute) לא רק שולח את ערך הטופס לשרת, הוא משמש גם כדי לתת לי רמז חשוב לדפדפן כיצד למלא באופן אוטומטי את הטופס עבור המשתמש.

אנחנו נוסיף סוגים סמנטיים כדי לעשות את זה מהיר ופשוט למשתמשים להיות מסוגלים להזין תוכן במכשיר נייד. לדוגמא, בעת הזנת טלפון מספר, המשתמש צריך רק לראות לוח מקשי חיוג.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### צור את חלק הוידאו והמידע

החלק בדף של הוידאו והמידע יכיל יותר עומק. תהיה לה רשימה של התכונות של המוצרים שלנו והחלק הזה, גם יכיל מציין מיקום לוידאו שמראה את המוצר שלנו עובד עבור המשתמש.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

סרטי וידאו משמשים לעתים קרובות כדי לתאר את התוכן באופן אינטראקטיבי, והם משמשים לעתים קרובות כדי להראות הדגמה של מוצר או רעיון.

על ידי ביצוע שיטות העבודה מומלצת הללו, אתה יכול בקלות לשלב וידאו לתוך האתר שלך:

*  להוסיף `תכונת controls` כדי להקל על אנשים את ההפעלה של הווידאו. 
*  הוסף תמונת `poster` לתת לאנשי תצוגה מקדימה של התוכן. 
*  הוספה מספר `<source>` אלמנטים המבוססים על פורמטי וידאו נתמכים. 
*  הוספת טקסט התאמה לאחור כדי לאפשר לאנשים להוריד את הווידאו, אם הם לא יכולים לראות אותו. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### צור את חלק התמונות

אתרים ללא תמונות יכולים להיות קצת משעממים. ישנם שני סוגים של תמונות:

*  הפוך תמונות תוכן (Content Images) &mdash; תמונות שמוטמעות במסמך משמשות להעברת מידע נוסף על הוכן.
*  תמונות לסטייל (Stylistic Image) &mdash; תמונות שמשמשות להעניק לאתר מראה משופר. בדרך כלל, אילו הם תמונות רקע או תמונות תבנית. אנו נעבור על זה בחלק הבא [מאמר הבא](#).

קטע התמונות בדף שלנו הוא אוסף של תמונות תוכן.

תמונות תוכן הן קריטיות להעברת המשמעות של הדף. תחשוב עליהם כמו על התמונות אשר נמצאות בשימוש במאמרי עיתונות. התמונות שאנו משתמשים הן תמונות של המורים על הפרויקט: כריס ווילסון, פיטר לוברס ושון בנט.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

התמונות מוגדרות בקנה מידה לרוחב של המסך 100%. זה עובד גם על מכשירים עם viewport צר, אבל פחות טוב באלה עם viewport רחב (כמו שולחן עבודה). אנחנו ננהל את זה בסעיף responsive design.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

ישנם אנשים רבים אשר לא יכולים לראות את התמונות ומשתמשים לעתים קרובות בעזר כגון קורא מסך כדי לנתח את הנתונים בדף וטכנולוגיה להעביר את זה למשתמש באופן מילולי. אתה צריך לוודא שכל התוכן של התמונות יכלול את התג התיאורי `alt` שהקורא המסך יכול לדבר אל המשתמש.

בעת הוספה 'תגי alt` יש לוודא שאתה שומר את טקסט alt תמציתי כמו אפשר לתאר את התמונה באופן מלא. לדוגמא בדמו שלנו אנחנו מאתחלים את התכונה להיות "שם: תפקיד", זה מציג מספיק מידע למשתמש להבין כי סעיף זה הוא על המחברים ועל מה העבודה שלהם היא.

#### הוסף רשימה של מידע

החלק האחרון הוא טבלה פשוטה המשמשת כדי להראות מספר סטטיסטיקות מוצר ספציפיות.

יש להשתמש בטבלאות רק לנתונים טבלאיים, כלומר, מטריצות של מידע.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### הוסף את החלק התחתון (Footer)

רוב האתרים צריכים כותרת תחתונה כדי להציג תוכן כגון תנאים והגבלות, כתבי ויתור, ותכנים אחרים שאינם אמורים להיות בניווט הראשי או באזור התוכן העיקרי של העמוד.

באתר שלנו, אנו רק מקשרים לתנאי שימוש, דף יצירת קשר, ופרופילי המדיה החברתית שלנו.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### סיכום

אנחנו יצרנו את קווי המתאר של האתר וזיהינו את כל האלמנטים מבניים הראשיים. בנוסף, גם דאגנו לכך שיש לנו את כל התוכן העיקרי מוכן ובמקום כדי לספק את הצרכים העסקיים שלנו.

<img class="attempt-left" src="images/content.png" alt="Content">
<img  class="attempt-right" src="images/narrowsite.png" alt="">
<div class="clearfix"></div>


תוכל להבחין כי העמוד נראה נורא עכשיו; זה הוא מכוון. תוכן הוא ההיבט החשוב ביותר של כל אתר ואנחנו צריכים לוודא שיש לנו את האדריכלות הטובה ביותר להצפת המידע. מדריך זה נתן לנו בסיס מצוין לבנות עליו. אנו נשפר את הסטייל של התוכן שלנו במדריך הבא.


## הפוך את זה למגיב 



האינטרנט נגיש במגוון עצום של מכשירים, מטלפונים קטנים ועד מסכי טלביזיות ענקים. למד כיצד לבנות אתר שעובד היטב בכל המכשירים הללו. כל מכשיר מציג יתרונות ייחודיים משלו וגם אילוצים. כמפתח, אתה אמור לתמוך בכל שלל המכשירים הללו באופן מיטבי.


אנחנו בונים אתר שפועל על פני מסך בגדלים שונים ובמגוון מכשירים. [בארכיטקטורת](#)  המידע של הדף ויצרה מבנה בסיסי. במדריך זה, אנחנו ניקח את המבנה הבסיסי שלנו עם תוכן ולהפוך אותו לדף יפה שמגיב למספר רב של גדלי מסך.

<figure class="attempt-left">
  <img  src="images/content.png" alt="Content">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Content and structure </a> </figcaption>
</figure>
<figure class="attempt-right">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Final site </a> </figcaption>
</figure>
<div class="clearfix"></div>


בעקבות העקרונות של פיתוח רשת עם מחשבה על ניידים בתחילה, אנחנו מתחילים עם viewport צר &mdash; בדומה לטלפון נייד &mdash; אנו בונים עבור חווית משתמש כזו בתחילה.
לאחר מכן, אנו עולים למכשירים גדולים יותר.
אנחנו יכולים לעשות את זה על ידי התאמת ה viewport שלנו למסך רחב יותר וביצוע שיפוטי בשאלה האם העיצוב והפריסה נראים טוב.

מוקדם יותר יצרנו כמה עיצובים ברמת מקרו לאיך התוכן שלנו צריך להיות מוצג. עכשיו אנחנו צריכים להפוך את הדף שלנו לדינמי כך שהוא יוכל להסתגל לפריסות שונות אלה. אנו עושים זאת על ידי קבלת החלטה על היכן למקם את נקודות העצירה שלנו. &mdash; נקודה אשר בה העיצוב משתנה על הדף &mdash; בהתאם לתוכן כך שהוא יותאם לגודל המסך.

### TL;DR {: .hide-from-toc }
- השתמש תמיד בviewport
- תמיד להתחיל עם viewport צר בהתחלה ורק אז לצאת לממשקים רחבים יותר
- לבסס את נקודות העצירה שלך כבויות כאשר אתה צריך להתאים את התוכן.
- ליצור הפשטה ברמה גבוהה של הפריסה שלך על פני נקודות עצירה עקריות.


### הוסף viewport

אפילו לדף בסיסי, אתה **חייב** תמיד להוסיף את תג meta viewport. Viewport הוא המרכיב הקריטי ביותר שאתה צריך לבניית חוויות רב מכשיר. בלי זה, האתר שלך לא יעבוד היטב במכשירים ניידים.

Viewport מציין לדפדפן שהדף צריך להיות בקנה מידה מסויים כדי להתאים המסך. ישנן תצורות רבות ושונות שניתן לציין ל viewport שלך כדי לשלוט בתצוגה של הדף. בתור ברירת מחדל, אנו ממליצים:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

Viewport מתגורר בראש המסמך, ורק צריך להיות מוכלל פעם אחת.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### קבע סגנון פשוט

לחברה ולמוצר שלנו כבר יש (ברוב המקרים) מדריך מיתוג וגופן ספציפיים. הם מסופקים במדריך הסגנון.

#### מדריך הסגנון

מדריך סגנון הוא דרך יעילה לקבלת הבנה ברמת על של הייצוג החזותי של הדף וזה עוזר לך לוודא שאתה עקבי בכל העיצוב.

##### צבעים

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### הוספת תמונות בסטייל

במדריך הקודם, הוספנו תמונות בשם "תמונות תוכן". אלה היו תמונות שהיו חשובות לנרטיב של המוצר שלנו. תמונות סגנונית הן תמונות שאינם נחוצות כחלק מתכני הליבה אבל מוסיפות לעיצוב ותורמות להנחות את תשומת לבו של המשתמש לפיסת התוכן ספציפי.

דוגמא טובה לכך היא תמונת כותרת לתוכן "מעל לקפל" (אותו קו שהמשתמש רואה תמיד). הוא משמש לעתים קרובות כדי לפתות את המשתמשים לגלול ולקרוא עוד על המוצר..


<img  src="images/narrowsite.png" alt="Designed site">


הם יכולים להיות פשוטים מאוד להכללה על הדף. במקרה שלנו, זה יהיה הרקע לכותרת ואנו נחיל אותו באמצעות כמה חוקי CSS פשוטים.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

בחרנו תמונת רקע פשוטה שמטושטשת, כך שהיא לא לוקחת מהתוכן ויש לנו להגדיר אותה כ 'cover` על כל האלמנט; באופן שתמיד מותח אוה תוך שמירה על יחס ממדים נכון.

<div class="clearfix"></div>


### קבע את נקודת השבירה הראשונה 

העיצוב מתחיל להיראות רע ברוחב של 600px. במקרה שלנו, את אורכו של הקו הולך מעל 10 מילים (אורך הקריאה האופטימלי), ואותו אנו רוצים לשנות.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>סליחה אבל הדפדפן שלך לא תומך בהצגת וידאו
     <a href="videos/firstbreakpoint.mov">הורד את הוידאו</a>.
  </p>
</video>

600px נראה מקום טוב כדי לקבוע נקודת העצירה הראשונה שלנו מפני שהוא ייתן לנו מרווח כדי לשנות את מיקום אלמנטים כדי להפוך אותם מותאמים טוב יותר למסך. אנחנו יכולים לעשות את זה באמצעות טכנולוגיה המכונות [שאילתות מדיה(Media Queries)](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)


    @media (min-width: 600px) {
    
    }
    

יש יותר מקום על מסך גדול יותר כך יש יותר גמישות עם איך ניתן להציג תוכן.

Note: אתה לא צריך להעביר את כל האלמנטים בבת אחת, אתה יכול לבצע התאמות קטנות יותר במידת צורך..

בהקשר של דף המוצר שלנו, נראה שאנחנו זקוקים למספר דברים:

* הגבל את הרוחב המרבי של העיצוב. 
* שנה את הריפוד של אלמנטים בכדי להקטין את גודל הטקסט. 
* העבר את הטופס לצוף בקנה אחד עם תוכן הכותרת. 
* הפוך את הווידאו לצף סביב התוכן. 
* הקטן את הגודל של התמונות וישר אותם לפי הרשת.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### הגבל את הרוחב המירבי של העיצוב

אנחנו בחרנו רק שתי פריסות עיקריות: תצוגה צרה ותצוגה רחבה, אשר מאוד מפשטות את תהליך הבנייה שלנו.

החלטתנו גם ליצור מקטעים על viewport הצר שישאר מלא גם על ה viewport הרחב. זה אומר שאנחנו צריכים להגביל את רוחב מרבי של המסך, כך שהטקסט ופסקאות לא התארכו לשורה ארוכה על מסכים רחבים במיוחד. בחרנו נקודה זו להיות על 800px.

כדי להשיג זאת, עלינו להגביל את הרוחב ולמרכז את האלמנטים. אנחנו צריך ליצור מיכל סביב כל סעיף עיקרי ולהחיל `margin: auto`. זה יאפשר המסך לגדול אבל התוכן יישאר מרוכז ובגודל מרבי של 800px.

המיכל יהיה 'div' פשוט בצורה הבאה:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### התאמת הריפוד ולהקטין את גודל טקסט

בחלון התצוגה הצר, אין לנו הרבה מקום להצגת תוכן. בשל כך יש להקטין באופן משמעותי את גודל ומשקל הכתב כדי שיתאימו מסך באופן טוב יותר.

עם viewport גדול יותר, אנחנו צריכים לקחת בחשבון שהמשתמש עובד עם מסך גדול יותר אבל גם נמצא רחוק יותר. כדי להגדיל את מידת הקריאות של תוכן, אנו יכולים להגדיל את הגודל ומשקל של הטיפוגרפיה. כמו כן, רצוי לשנות את הריפוד כדי להפוך את האזורים השונים לבולטים יותר.

בדף המוצר שלנו, נוכל להגדיל את הריפוד של אלמנטי הsection על ידי הגדרה שישאר ב5% מהרוחב. אנו גם נגדיל את גודל הכותרות לכל אחד מהסעיפים.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### לשנות את הריפוד ולהקטין את גודל טקסט

Viewport הצר שלנו היה תצוגה ליניארי שנערם. כל קטע עיקרי והתוכן בתוכם הוצג לפי סדר מלמעלה למטה.

Viewport רחב נותן לנו שטח נוסף לשימוש כדי להציג את התוכן בצורה אופטימלית למסך. לדף המוצר שלנו, על פי IA שאנחנו יכולים:

*  הזז את הטופס סביב פרטי הכותרת.
*  מקם את הווידאו בצד הימין של נקודות מפתח.
*  קבע את התמונות בפסיפס שיותאם למסך
*  הגדל את הטבלה

#### הצף את (Form) 

המשמעות של Viewport צר היא כי יש לנו הרבה פחות שטח אופקי עבור האלמנטים על המסך.

כדי לעשות שימוש יעיל יותר של שטח המסך האופקי, אנחנו צריכים לפרוץ של הזרימה ליניארי של הכותרת ולהעביר את הטופס ורשימה להיות זה ליד זה.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>סליחה אבל הדפדפן שלך אינו תומך בוידאו
     <a href="videos/floatingform.mov">הורד את הוידאו</a>.
  </p>
</video>

#### הצף את אלמנט הוידאו

הווידאו בממשק viewport צר נועד להיות ברוחב מלא של המסך ואת מיקומו נקבע לאחר הרשימה של התכונות העיקריות. על viewport רחב, הוידאו יהיה בהיקף גדול מדי ונראה שגוי כאשר נמקם אותו ליד רשימת תכונות.

אלמנט הווידאו צריך להיות מועבר אל מחוץ לזרימה האנכית של ה viewport הצר ואמור להיות מוצג ליד הרשימה עם תבליטים של תוכן.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### סדר את התמונות

התמונות בחלון התצוגה הצרה (מכשירים ניידים בעיקר) מוגדרות להיות ברוחב המלא של המסך ולהערם בצורה אנכית. זה לא מתכוונן היטב לחלון תצוגה רחבה.

כדי להפוך את התמונות כדי שיראו טוב בחלון תצוגה רחבה, אנו נמתח אותן ל30% מרוחב המכל כאשר הוא אופקי (ולא אנכי במבט הצר על המכשיר). אנו גם להוסיף קצת רדיוס גבול ותיבת צל כדי להפוך את התמונות נראות מושכות יותר.


<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### ליצור תמונות מגיבות ל DPI

בעת שימוש בתמונות, יש לקחת את הגודל של נקודת מבט ואת הצפיפות של התצוגה בחשבון.

האינטרנט נבנה למסכי 96 dpi. עם כניסתם של מכשירים ניידים, ראינו גידול ניכר בצפיפות פיקסלים של המסכים הללו. יתרה מכך, במחשבים ניידים יש גם retina . משום כך, תמונות שמקודדות ל96 dpi לעתים קרובות נראה נורא על מכשיר היי dpi.

יש לנו פתרון שלא אומץ באופן נרחב עדיין. עבור דפדפנים שתומכים בה, אתה יכול להציג תמונה בצפיפות גבוהה על תצוגת צפיפות גבוהה.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### אבלאות

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### לסיכום

** מזל טוב. ** אם אתה קורא את זה, אתה כבר בנית את העמוד מוצר הראשון שלך שעובד על פני מגוון גדול של מכשירים, גדלי טופס, וגדלי מסכים.


אם תפעל לפי ההנחיות הבאות, אתה תהיה על המסלול להתחלה טובה:

1.  צור IA בסיסי ולמד את מבנה התוכן שלך לפני שאתה מקודד.
2.  תמיד הגדר viewport.
3.  צור את החוויה הבסיסית סביב הגישה של mobile-first
4.  ברגע שיש לך החוויה הניידת, תוכל להגדיל את הרוחב של התצוגה עד שזה לא נראה טוב ולהגדיר נקודת העצירה שם.
5.  המשך לנסות ולהתאים


Translated By: 
{% include "web/_shared/contributors/greenido.html" %}

