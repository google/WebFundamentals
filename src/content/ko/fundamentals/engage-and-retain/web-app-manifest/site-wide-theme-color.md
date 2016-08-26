project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 테마색은 주소바와 같은 UI 요소에 어떤 색을 넣을지 브라우저에게 힌트를 주는 역할을 합니다.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2000-01-01 #}

# 사이트 너비의 테마색 제공하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



크롬은 2014년에 사이트 테마색의 개념을 소개하였습니다.
테마색은 [주소바와 같은 UI 요소](/web/fundamentals/design-and-ui/browser-customization/)에 어떤 색을 넣을지 브라우저에게 힌트를 주는 역할을 합니다.


<figure>
  <img src="images/theme-color.png" alt="backgroud color">
  <figcaption>Theme color</figcaption>
</figure>

매니페스트 파일이 없으면 모든 페이지에 사이트 테마색을 넣어야 합니다. 그리고 만약 사이트가 거대하거나 오래된 사이트인 경우, 여러 페이지의 변화는 실현하기 어렵습니다.

매니페스트 파일에 `theme_color` 속성을 추가하면, 홈 화면으로 사이트를 실행할 때, 해당 도메인의 모든 페이지에 자동으로 테마색이 적용됩니다.


    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="backgroud color">
  <figcaption>Sitewide theme color</figcaption>
</figure>
