---
layout: article
title: "צור את התוכן והמבנה"
description: "תוכן הוא ההיבט החשוב ביותר של כל אתר. במדריך זה, נבחן כיצד אתה יכול לתכנן ביעילות כדי לבנות את האתר הרב מכשירי הראשון שלך."
introduction: "תוכן הוא ההיבט החשוב ביותר של כל אתר. אז רצוי לעצב עבור התוכן ולא לתת לעיצוב להכתיב את התוכן. במדריך זה, אנו מזהים את התוכן שאנחנו צריכים בעדיפות ראשונה, ליצור מבנה דף המבוסס עליו ולאחר מכן, תציג את הדף בפריסה ליניארית שעובדת היטב על viewports הצר ורחב."
notes:
  styling:
    - הסטייל יגיע מאוחר יותר.
article:
  written_on: 2014-04-17
  updated_on: 2014-09-15
  order: 1
id: multi-screen-content
collection: multi-screen
authors:
  - paulkinlan
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

ערקי הדברים שחשוב לזכור:
  קריטי לתוכן:
    - אפיין את התוכן לו אתה זקוק בתחילה
    - לשרטט את ארכיטקטורת מידע (IA) לviewports הצר ורחב.
    - יצירת תצוגת שלד של הדף עם תוכן אבל בלי סגנון.
---

{% wrap content %}

{% include modules/toc.liquid %}

## צור את מבנה הדף

אנו זיהינו שאנחנו צריכים:

1. קטע שיתאר במבט על את המוצר שלנו: "CS256: Mobile web development"
2. טופס לאיסוף מידע ממשתמשים שמעוניינים במוצר שלנו
3. תיאור מעמיק של הוידאו
4. תמונות שמראות את המוצר בפעולה
5. טבלת הנתונים עם מידע כדי לגבות את הטענות

{% include modules/takeaway.liquid list=page.key-takeaways.content-critical %}

אנחנו גם צריכים לבוא עם ארכיטקטורת מידע ופריסה עבור שני viewports הצר ורחב.

<div class="demo clear" style="background-color: white;">
  <img class="g-wide--1 g-medium--half" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

זה ניתן להמיר בקלות לחלקים של דף שלד שאנו נשתמש לשאר הפרויקט הזה.

{% include_code _code/addstructure.html structure %}

## הוסף תוכן לדף

המבנה הבסיסי של האתר הושלם. אנחנו יודעים את הסעיפים שאנחנו צריכים, תוכן שניתן להציג בסעיפים אלו, והיכן למקם אותו בכללי ארכיטקטורת מידע. כעת אנו יכולים להתחיל לבנות את האתר.

{% include modules/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### צור את הכותרת והטופס

הכותרת וטופס הבקשה הם הרכיבים הקריטיים של בדף שלנו. אלה חייבים להיות מוצגים למשתמש באופן מיידי.

בכותרת, הוסף טקסט פשוט כדי לתאר את המהלך:

{% include_code _code/addheadline.html headline %}

אנחנו צריכים גם למלא את הטופס. זה יהיה טופס פשוט שאוסף שמות של המשתמשים, מספרי הטלפון שלהם, וזמן נוח להם להתקשרות.

כל הטפסים צריכים תוויות ומצייני מיקום כדי להקל על משתמשים להתמקד באלמנטים, להבין מה הוא אמור ללכת בהם, וגם כדי לעזור לכלי נגישות להבין את המבנה של הטופס. שם התכונה (name attribute) לא רק שולח את ערך הטופס לשרת, הוא משמש גם כדי לתת לי רמז חשוב לדפדפן כיצד למלא באופן אוטומטי את הטופס עבור המשתמש.

אנחנו נוסיף סוגים סמנטיים כדי לעשות את זה מהיר ופשוט למשתמשים להיות מסוגלים להזין תוכן במכשיר נייד. לדוגמא, בעת הזנת טלפון מספר, המשתמש צריך רק לראות לוח מקשי חיוג.

{% include_code _code/addform.html form %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### צור את חלק הוידאו והמידע

החלק בדף של הוידאו והמידע יכיל יותר עומק. תהיה לה רשימה של התכונות של המוצרים שלנו והחלק הזה, גם יכיל מציין מיקום לוידאו שמראה את המוצר שלנו עובד עבור המשתמש.

{% include_code _code/addcontent.html section1 %}

סרטי וידאו משמשים לעתים קרובות כדי לתאר את התוכן באופן אינטראקטיבי, והם משמשים לעתים קרובות כדי להראות הדגמה של מוצר או רעיון.

על ידי ביצוע שיטות העבודה מומלצת הללו, אתה יכול בקלות לשלב וידאו לתוך האתר שלך:

* להוסיף `תכונת controls` כדי להקל על אנשים את ההפעלה של הווידאו. 
* הוסף תמונת poster` `לתת לאנשי תצוגה מקדימה של התוכן. 
* הוספה מספר <מקור> `` אלמנטים המבוססים על פורמטי וידאו נתמכים. 
* הוספת טקסט התאמה לאחור כדי לאפשר לאנשים להוריד את הווידאו, אם הם לא יכולים לראות אותו.

{% include_code _code/addvideo.html video html %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.video %}

### צור את חלק התמונות

이미지들이 없는 사이트는 조금 짜증스러울 수 있습니다. 여기 다음과 같은 두가지 형태의 이미지가 있습니다.

*  콘텐츠 이미지들(Content Images) &mdash; 문서 내에 나열되고 콘텐츠에 대한 추가적인 정보를 전달하기 위해 사용되는 이미지들
*  스타일 이미지들(Stylistic Image) &mdash; 사이트를 더 멋지게 보이도록 만들기 위해 사용하는 이미지들로써 대개 배경 이미지들, 패턴 및 그레이디언트들입니다. 우리는 이를 [다음 글]({{site.baseurl}}{{page.article.next.url}})에서 이를 다룰 것입니다.


우리의 페이지에서 이미지 섹션은 콘텐츠 이미지들의 집합입니다.

콘텐츠 이미지들은 페이지의 의미를 전달하기 위해 중요합니다. 이들을 신문 기사에서 사용되는 이미지로써 생각해봅시다. 프로젝트에서 사용되는 이미지들은 Chris Wilson, Peter Lubbers 그리고 Sean Benner과 같은 강사들의 사진입니다.

{% include_code _code/addimages.html images html %}

이미지들은 화면 폭의 100%로 스케일이 설정될 것입니다. 이는 좁은 뷰포트를 가진 디바이스에서 잘 동작하지만 (데스크탑과 같은) 넓은 뷰포트를 가진 디바이스에서는 그리 잘 동작하지는 않습니다. 이는 반응형 디자인에서 다시 다룰 것입니다.

{% include modules/related_guides.liquid inline=true list=page.related-guides.images %}

많은 사람들이 이미지를 보거나 스크린 리더와 같이 페이지의 데이터를 파싱해서 축약해서 사용자에게 제공하는 보조 기술들을 사용하는데 익숙하지는 않습니다. 스크린 리더가 사용자에게 설명할 수 있도록 콘텐츠의 모든 이미지들이 서술적인 `alt` 태그를 가지도록 해야 합니다.

`alt` 태그들을 추가할 때 이미지를 충분히 설명할 수 있을 만큼만 간결한 대체 텍스트를 유지하도록 해야 합니다. 예를 들어 데모에서 우리는 단순하게 "이름: 역할"로 속성을 구성하였으며 이는 사용자에게 이 세션을 이해하기 위한 충분한 정보인 저자와 그들의 분야가 무엇인지를 표현합니다.

### 표 데이터 섹션 추가하기

마지막 섹션은 상품의 명확한 통계를 보여주기 위해 사용될 간단한 테이블입니다.

Tables should only be used for tabular data, i.e, matrices of information.
테이블은 표 데이터를 위해서만 사용되어야 합니다. (예를 들자면 정보의 행렬)

{% include_code _code/addcontent.html section3 %}

### 꼬리말(Footer) 추가하기

대부분의 사이트들은 사용 조건, 면책 조항 그리고 페이지의 주요 메뉴나 주요 영역이 될 수 없는 다른 콘텐츠들과 같은 내용들을 보여주기 위해 꼬리말(Footer)를 필요로 합니다.

우리 사이트에서는 사용 조건, 연락처 페이지 그리고 소셜 미디어 프로필 정도를 링크할 것입니다.

{% include_code _code/addcontent.html footer %}

## 요약

우리는 사이트의 윤곽을 생성하고 주요한 모든 구조적인 요소들을 확인하였습니다. 또한 사업적 요구사항들을 만족하는데 필요한 모든 연관된 콘텐츠들을 보유하고 있는지를 확인하였습니다.

<div class="clear">
  <img class="g-wide--2 g-medium--half" src="images/content.png" alt="Content" style="max-width: 100%;">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/narrowsite.png" alt="" style="max-width: 100%;">
</div>

여러분은 이제 페이지가 어설프게 보인다는 점이 신경쓰일 것입니다만 이는 의도된 것입니다.
콘텐츠는 모든 사이트에서 가장 중요한 부분이며 훌륭한 정보구조와 충실한 정보를 가지고 있는지 확실히 하는 것이 필요합니다. 이 가이드는 구축을 위한 탁월한 기반을 제공할 것입니다. 다음 가이드에서는 이 콘텐츠들를 꾸며보도록 하겠습니다.

{% include modules/nextarticle.liquid %}

{% endwrap %}
