---
layout: article
title: "הפוך את זה למגיב"
description: "האינטרנט נגיש במגוון עצום של מכשירים, מטלפונים קטנים ועד מסכי טלביזיות ענקים. למד כיצד לבנות אתר שעובד היטב בכל המכשירים הללו."
introduction: "האינטרנט נגיש במגוון עצום של מכשירים, מטלפונים קטנים ועד מסכי טלביזיות ענקים. למד כיצד לבנות אתר שעובד היטב בכל המכשירים הללו. כל מכשיר מציג יתרונות ייחודיים משלו וגם אילוצים. כמפתח, אתה אמור לתמוך בכל שלל המכשירים הללו באופן מיטבי."
key-takeaways:
  make-responsive:
    - השתמש תמיד בviewport
    - תמיד להתחיל עם viewport צר בהתחלה ורק אז לצאת לממשקים רחבים יותר
    - לבסס את נקודות העצירה שלך כבויות כאשר אתה צריך להתאים את התוכן.
    - ליצור הפשטה ברמה גבוהה של הפריסה שלך על פני נקודות עצירה עקריות.
authors:
  - paulkinlan
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
article:
  written_on: 2014-04-17
  updated_on: 2014-09-11
  order: 2
collection: multi-screen
id: multi-screen-responsive
---

{% wrap content %}

{% include modules/toc.liquid %}

אנחנו בונים אתר שפועל על פני מסך בגדלים שונים ובמגוון מכשירים. [ב]({{site.baseurl}}{{page.article.previous.url}}) ארכיטקטורת מידע של הדף ויצרה מבנה בסיסי. במדריך זה, אנחנו ניקח את המבנה הבסיסי שלנו עם תוכן ולהפוך אותו ל דף יפה כי היא מגיבה למספר רב של גדלי מסך.

<div class="clear">
  <figure class="g-wide--2 g-medium--half">
    <img  src="images/content.png" alt="Content" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-without-styles.html %} Content and structure {% endlink_sample %} </figcaption>
  </figure>
  <figure class="g-wide--2 g-wide--last g-medium--half g--last">
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-with-styles.html %} Final site {% endlink_sample %} </figcaption>
  </figure>
</div>

בעקבות העקרונות של פיתוח רשת עם מחשבה על ניידים בתחילה, אנחנו מתחילים עם viewport צר &mdash; בדומה לטלפון נייד &mdash; אנו בונים עבור חווית משתמש כזו בתחילה.
לאחר מכן, אנו עולים למכשירים גדולים יותר.
אנחנו יכולים לעשות את זה על ידי התאמת ה viewport שלנו למסך רחב יותר וביצוע שיפוטי בשאלה האם העיצוב והפריסה נראים טוב.

מוקדם יותר יצרנו כמה עיצובים ברמת מקרו לאיך התוכן שלנו צריך להיות מוצג. עכשיו אנחנו צריכים להפוך את הדף שלנו לדינמי כך שהוא יוכל להסתגל לפריסות שונות אלה. אנו עושים זאת על ידי קבלת החלטה על היכן למקם את נקודות העצירה שלנו. &mdash; נקודה אשר בה העיצוב משתנה על הדף &mdash; בהתאם לתוכן כך שהוא יותאם לגודל המסך.

{% include modules/takeaway.liquid list=page.key-takeaways.make-responsive %}

## הוסף viewport

אפילו לדף בסיסי, אתה **חייב** תמיד להוסיף את תג meta viewport. Viewport הוא המרכיב הקריטי ביותר שאתה צריך לבניית חוויות רב מכשיר. בלי זה, האתר שלך לא יעבוד היטב במכשירים ניידים.

Viewport מציין לדפדפן שהדף צריך להיות בקנה מידה מסויים כדי להתאים המסך. ישנן תצורות רבות ושונות שניתן לציין ל viewport שלך כדי לשלוט בתצוגה של הדף. בתור ברירת מחדל, אנו ממליצים:

{% include_code _code/viewport.html viewport %}

Viewport מתגורר בראש המסמך, ורק צריך להיות מוכלל פעם אחת.

{% include modules/related_guides.liquid inline=true list=page.related-guides.responsive %}

## 간단한 스타일 적용하기

우리의 제품과 회사는 이미 스타일 가이드 내에 매우 명확한 브랜딩과 폰트 가이드라인을 가지고 있습니다.

### 스타일 가이드

스타일 가이드는 페이지의 시각적 표현에 대한 높은 수준의 이해를 할 수 있는 유용한 방법을 제공하며, 이는 디자인 전체에 대해 밀접하게 작업할 수 있도록 만들어 줍니다.

#### 색상들

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### 스타일 이미지 추가하기

이전 가이드에서 우리는 "콘텐츠 이미지"라고 불리는 이미지를 추가했습니다. 이는 상품의 서술에 중요한 이미지들입니다. 스타일 이미지(Stylistic Image)는 핵심 콘텐츠의 일부로써 필요한 것은 아니지만 시각적인 효과를 추가하거나 콘텐츠의 특정 부분에 사용자의 주의를 환기시키는데 도움을 줍니다.

이에 대한 좋은 예는 '상단노출면'의 헤드라인 이미지입니다. 이는 사용자가 상품에 대해 더 많은 내용을 읽도록 이끄는데 종종 사용됩니다.

<div class="g-wide--2 g-wide--last g-medium--half g--last">
  <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
</div>

이들은 매우 쉽게 포함될 수 있습니다. 우리의 경우에는 헤더의 배경이 될 것이고 몇가지 간단한 CSS를 통해 이를 적용할 것입니다.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

콘텐츠로부터 벗어나지 않도록 흐림 효과가 적용된 단순한 배경 이미지를 선택했으며 언제나 정확한 비율을 유지하여 늘어나도록 하는 방법으로 전체 엘리먼트가 `커버`되도록 설정했습니다.


<br style="clear: both;">

## 첫 분할지점 설정하기

디자인은 600px 정도로 넓어지면 좋지않게 보이기 시작합니다. 이 경우, 한 라인의 길이는 10 단어(읽기에 최적화된 길이) 이상으로 변경되며 이것이 변경하려고 했던 방식입니다.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/firstbreakpoint.mov">비디오 다운로드하기</a>.
  </p>
</video>

600px은 화면에 더 잘 맞도록 엘리먼트들의 위치를 변경하기 위한 기회를 줄 것이므로 첫번째 분할지점(Breakpoint)를 설정하기에 좋은 위치로 보입니다. 이는 [미디어 쿼리(Media Queries)]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)로 불리는 기술을 사용하여 처리할 수 있습니다.



{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

더 큰 화면에는 더 많은 여백이 존재하므로 어떻게 콘텐츠가 보여질 것인지에 대해 더욱 유연합니다.

{% include modules/remember.liquid title="Note" list=page.notes.not-all-at-once %}

상품 페이지의 흐름 상 다음과 같은 것들이 필요할 것으로 보입니다.

*  디자인의 최대 폭 제한하기
*  엘리먼트의 패딩(Padding) 바꾸기와 텍스트 크기 줄이기
*  폼을 헤딩 콘텐츠와 한 줄(In-line)로 만들기
*  비디오를 콘텐츠 주변에 배치하도록 만들기
*  이미지의 사이즈를 줄이기와 보다 나은 그리드 내에 나타나도록 만들기

{% include modules/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## 디자인의 최대 폭 제한하기

우리는 구축 과정을 크게 단순하게 만들어줄 좁은 뷰포트와 넓은 뷰포트 이 두가지의 주요 레이아웃만을 가지기로 하였습니다. 

또한 좁은 뷰포트에서뿐만이 아니라 넓은 뷰포트에서도 완전히 날 것이나 다름없는 섹션들을 생성하기로 결정하였습니다. 이는 엄청나게 넓은 화면들에서 텍스트와 문단들이 길고 단일한 하나로 확장되지 않도록 화면의 최대폭을 제한해야한다는 것을 의미합니다. 이 지점을 약 800px로 선택하도록 하겠습니다.


이를 위해 엘리먼트들의 폭과 중점을 제한할 필요가 있습니다. 우리는 각 주요 세션들 주위에 컨테이너를 생성하고 `margin: auto`를 적용하여야 할 것입니다. 이는 화면이 커지더라도 콘텐츠는 800px의 최대 폭에서 중앙에 위치한 채로 남아있도록 할 것입니다.

컨테이너는 다음과 같이 간단한 `div`가 될 것입니다.

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code _code/fixingfirstbreakpoint.html containerhtml html %}

{% include_code _code/fixingfirstbreakpoint.html container css %}

## 패딩 바꾸기와 텍스트 크기 줄이기

좁은 뷰포트는 콘텐츠를 보여주기 위한 많은 공간이 없으므로 종종 이를 화면에 맞추기 위해 활자의 크기와 가중치(Weight)를 과감히 줄일 수 있습니다.

더 큰 뷰포트에 대해 사용자가 좀더 큰 화면을 사용할 것이라는 고려를 할 필요가 있지만 이는 지나칠 수도 있습니다. 콘텐츠의 가독성을 증가시키기 위해 활자의 크기와 가중치를 증가할 수 있으며 또한 구분된 영역이 더욱 두드러지게 하기 위해 패딩(Padding)을 바꿀 수도 있습니다.

상품 페이지에서 폭(Width)의 5%를 유지하기 위해 섹션 엘리먼트들의 패딩 설정을 통해 이를 늘릴 것입니다. 또한 각 섹션에 대한 헤더 크기를 증가시킬 것입니다.

{% include_code _code/fixingfirstbreakpoint.html padding css %}

## 넓은 뷰포트에 대한 엘리먼트 적용하기

우리의 좁은 뷰포트는 선형의 디스플레이가 쌓인 형태입니다. 각 주요 섹션들과 섹션들 내의 콘텐츠는 위에서 아래까지 순서대로 보여질 것입니다.

넓은 뷰포트는 콘텐츠를 화면에 대해 최적화된 방식으로 보여주기 위해 사용할 수 있는 추가적인 여백을 제공합니다. 상품 페이지에서 이는 우리의 정보구조(IA)에 따라 다음과 같은 일들을 할 수 있다는 것을 의미합니다.

*  헤더 정보 주변으로 폼 이동하기
*  비디오를 알맞은 요점 부분에 위치시키기
*  이미지를 이용한 타일 구성하기
*  테이블의 확장하기

### 폼(Form) 엘리먼트 다루기

좁은 뷰포트는 화면 상에 엘리먼트들을 편안하게 배치할 수 있는 것이 가능한 수평 공간이 별로 없음을 의미합니다.

수평 화면 공간의 보다 효율적인 사용을 위해 헤더가 선형으로 구성되는 것을 부셔야할 필요가 있으며 폼과 리스트를 나란하도록 옮길 필요가 있습니다.


{% include_code _code/fixingfirstbreakpoint.html formfloat css %}

{% include_code _code/fixingfirstbreakpoint.html padding css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/floatingform.mov">비디오 다운로드하기</a>.
  </p>
</video>

### 비디오 엘리먼트 다루기

좁은 뷰포트 내의 비디오 인터페이스는 화면의 전체 너비가 되며 주요 기능들의 리스트 다음에 위치하도록 디자인되었습니다. 넓은 뷰포트에서 너무 크게 확대되고 기능 리스트 다음에 위치할 때 이상하게 보일 수 있을 것입니다.


The video element needs to be moved out of the vertical flow of the narrow
viewport and should be displayed side-by-side with the bulleted list of content.
비디오 엘리먼트는 좁은 뷰포트에서는 수직 형태의 흐름으로 구성될 필요가 있으며 넓은 뷰포트에서는 콘텐츠의 항목 리스트와 나란히 보여져야 할 것입니다.

{% include_code _code/fixingfirstbreakpoint.html floatvideo css %}

### 이미지를 이용한 타일 구성하기

(대부분의 모바일 디바이스들과 같은) 좁은 뷰포트에서 이미지 인터페이스는 화면의 전체 너비로 설정되어야 하며 수직 형태로 쌓여집니다. 이는 더 넓은 뷰포트에서는 잘 확대되지 않습니다.

이미지를 넓은 뷰포트에서 제대로 보여지도록 하기 위해서는 이는 컨테이너 너비의 30%로 조절하고 (좁은 뷰포트에서처럼 수직으로 펼쳐지는 것 대신) 수평으로 펼쳐집니다. 또한 이미지가 보다 매력적으로 보이도록 하기 위해 약간의 둥근 테두리와 box-shadow를 추가할 것입니다.


<img src="images/imageswide.png" style="width:100%">

{% include_code _code/fixingfirstbreakpoint.html tileimages css %}

### 이미지를 DPI에 반응형으로 만들기

이미지를 사용할 때,
뷰포트의 사이즈와 화면의 밀도(Density)를 고려해야 합니다.

The web was built for 96dpi screens.  With the introduction of mobile devices,
we have seen a huge increase in the pixel density of screens not to mention
Retina class displays on laptops.  As such, images that are encoded to 96dpi
often look terrible on a hi-dpi device.
웹은 96dpi 화면을 위해 구축되었습니다. 랩탑의 레티나급 디스플레이에 대해 언급할 필요없이 우리는 화면의 픽셀 밀집도가 모바일 디바이스들의 도입과 함께 비약적으로 증가하는 것을 봐왔습니다. 일반적으로 96dpi로 인코딩된 이미지는 높은 DPI 디바이스에서 몹시 이상하게 보이기도 합니다.

이에 대해 폭넓게 적용할 수 있는 해결방법은 아직 없습니다.
지원하는 브라우저에 한해 여러분은 고밀도 디스플레이에서 고밀도 이미지를 보여줄 수는 있습니다.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.images %}

### 테이블

테이블은 작은 뷰포트를 가진 디바이스에서 제대로 처리하기 매우 힘들고 특별한 고려 사항을 필요로 합니다.


작은 뷰포트에서 우리는 2개의 행을 가진 테이블을 만들고 세로로 구분되도록 하기 위해 헤딩과 하나의 행 내의 셀들을 바꾸는 것을 추천합니다.



<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/responsivetable.mov">비디오 다운로드하기</a>.
  </p>
</video>

우리의 사이트에서,
우리는 테이블 콘텐츠만을 위한 추가적인 분할지점을 생성해야 했습니다.
여러분이 모바일 우선으로 사이트를 구축할 때, 적용된 스타일들을 원래대로 되돌리는 것은 매우 힘들기 때문에 반드시 작은 뷰포트의 테이블에 대한 CSS를 넓은 뷰포트용 CSS에서 잘라내어야 합니다.
이는 깔끔하고 일관적인 분할을 할 수 있도록 해줍니다.

{% include_code _code/content-with-styles.html table-css css %}

## 정리

**축하합니다.** 이 가이드를 읽는 동안, 여러분은 광범위한 디바이스과 형식인자(Form-factor)들, 화면 사이즈를 가지는 디바이스에서 동작하는 단순한 상품 방문 페이지의 첫걸음을 내딛었습니다.


If you follow these guidelines, you will be off to a good start:
이 가이드라인을 따랐다면, 여러분은 다음과 같은 사항에 대해 순조로운 출발을 할 수 있을 것입니다.

1.  기초적인 정보구조(IA) 생성하기와 코딩 이전의 콘텐츠에 대해 이해하기.
2.  항시 뷰포트 설정하기.
3.  모바일 우선(Mobile First)에 대한 기반 사례 구축하기.
4.  먼저 모바일 사례를 구축한 뒤, 제대로 보이지 않을 때까지 디스플레이 너비를 증가하고 그 부분에 분할지점 설정하기.
5.  반복적으로 수행하기

{% include modules/nextarticle.liquid %}

{% endwrap %}
