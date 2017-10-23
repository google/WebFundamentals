project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 알맞은 스타일 지정으로 접근성 개선

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# 액세스 가능한 스타일 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

접근성의 중요한 개념 중 두 가지인 포커스와 의미 체계에 대해 살펴보았습니다.
이제 세 번째 개념인 스타일 지정에 대해 자세히 알아봅시다. 스타일 지정은 광범위한 주제라, 다음과 같이 세 부분으로 나누어
설명하겠습니다.

- 포커스와 다양한 ARIA 상태에 대한 스타일을 추가하여접근성을 높이기 위해 요소의 스타일을 지정하는 방법
- 작은 글씨를 읽는 데 어려움이 있는 사용자를 위해확대하거나 배율을 조절할 수 있도록 UI의 스타일을 유연하게 지정하는 방법
- 색상만으로 정보를 전달하지 않기 위해 적합한 색상과 대비를 선택하는방법

## 포커스 스타일 지정

일반적으로 요소를 포커스할 때마다 기본 제공 브라우저 포커스
링(CSS `outline` 속성)을 통해 요소의 스타일을 지정합니다. 포커스 링을 사용하지 않으면
키보드 사용자가 어떤 요소에 포커스에 있는지 알 수 없으므로
포커스 링은 무척 편리한 수단인 셈입니다. [WebAIM
검사 목록](http://webaim.org/standards/wcag/checklist){: .external }에서는
이 점을 지적하면서 '어떤 페이지 요소에 현재 키보드 포커스가 있는지 시각적으로 분명할 것(예:
페이지를 탭하며 이동할 때 자신의 위치를 볼 수 있음)'을
요구합니다.

![form elements with a focus
ring](../../../en/fundamentals/accessibility/imgs/focus-ring.png)

하지만 때로는 포커스 링이 왜곡되어 보이거나 페이지 디자인에
맞지 않을 수도 있습니다. 요소의
`outline`을 `0`이나 `none`으로 설정하여 이 스타일을 완전히 제거하는 개발자도 있습니다. 하지만 포커스 표시기가 없다면
키보드 사용자가 어떤 항목과 상호 작용 중인지 어찌 알 수 있겠습니까?

Warning: 포커스를 대체할 수단을 제공하지 않은 상태에서는 outline을 0이나 none을 설정하면 안 됩니다!

CSS
`:hover` *의사 클래스*를 사용하여 컨트롤에 마우스 오버 상태를 추가하는 데 익숙하실지 모르겠습니다. 예를 들어, 링크 요소에
`:hover`를 사용하여
마우스를 링크 요소 위로 가져갈 때 색상이나 배경을 변경할 수 있습니다. `:hover`와
유사하게, `:focus` 의사 클래스를 사용하여 포커스가 있는 요소를 대상으로 삼을 수
있습니다.

```
/* At a minimum you can add a focus style that matches your hover style */
:hover, :focus {
  background: #c0ffee;
}
```

포커스 링을 제거하는 문제에 대한 다른 해결책으로, 요소에 동일한 마우스 오버 및 포커스 스타일을 지정하여
키보드 사용자가 포커스가 어디에 있는지
알 수 없는 문제를 해결할 수 있는 방법도 있습니다. 늘 그렇듯이, 접근성 환경을 개선하면
모든 사용자의 사용 환경 역시 더 나아집니다.

### 입력 모달리티

![포커스 링이 있는 네이티브 HTML
버튼](../../../en/fundamentals/accessibility/imgs/sign-up.png){: .attempt-right }

`button` 같은 네이티브 요소의 경우, 브라우저는 사용자 상호 작용이
마우스나 키보드를 눌러 발생한 것인지 여부를 감지할 수 있으며, 보통은 키보드 상호 작용에 대해서만 포커스 링을
표시합니다. 예를 들어, 마우스로 네이티브
`button`을 클릭하면 포커스 링이 없지만 키보드로 탭하면
포커스 링이 나타납니다.

이는 마우스 사용자는 스스로 어떤 요소를 클릭했는지 알고 있으므로
포커스 링이 필요하지 않을 것이라는 논리에 따른 것입니다. 하지만 이와 동일한 동작을 구현하는
단 하나의 브라우저 간 솔루션은 아직 없습니다. 따라서
어떤 요소에 `:focus` 스타일을 지정할 경우
사용자가 그 요소를 클릭하거나 키보드로 포커스할 때 스타일이 표시됩니다. 다음
모조 버튼을 클릭하여 `:focus` 스타일이 항상 적용되는지 살펴보세요.

```
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
```

{% framebox height="80px" %}


<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>


<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

이는 약간 성가신 일이 될 수 있는데, 개발자는 종종 사용자설정 컨트롤이 있는
자바스크립트를 사용하여 마우스 포커스와 키보드 포커스를 구분하곤
합니다.

Firefox에서는 `:-moz-focusring` CSS 의사 클래스를 사용하여 키보드를 통해 요소를 포커스할 경우에만 적용되는 포커스
스타일을
작성할 수 있는데, 꽤 편리한
기능입니다. 지금은 이런 의사 클래스가 Firefox에서만 지원되지만,
[현재 이를 표준화하는 작업이
진행 중입니다](https://github.com/wicg/modality){: .external }.

[Alice Boxhall과 Brian
Kardell이 쓴 문서](https://www.oreilly.com/ideas/proposing-css-input-modality){:
.external }도 읽어보시기 바랍니다.
모달리티를 주제로 자세하게 설명되어 있고 마우스 입력과 키보드 입력을
구분하는 프로토타입 코드도 들어 있습니다. 지금 바로 이 솔루션을
사용할 수 있으며, 이후 더욱 폭넓게 지원되는 시점이 오면 포커스 링 의사 클래스를
포함하면 될 것입니다.

## ARIA를 이용한 상태 스타일 지정

구성 요소를 빌드할 때는 보통 자바스크립트로 제어하는 CSS 클래스를 사용하여 구성 요소의 상태를 반영하여
그 모양도 자연스럽게 반영합니다.

예를 들어, 클릭하면 '눌러진' 모습의 시각적 상태로 변하고
다시 클릭할 때까지는 그 상태 그대로 유지하는 전환 버튼을 생각해 보세요. 상태의
스타일을 지정하기 위해 자바스크립트가 버튼에 `pressed` 클래스를 추가할 수도 있습니다. 또한, 모든
컨트롤에서 정상적인 의미 체계를 구현해야 할 것이므로 버튼에 대한
`aria-pressed` 상태를 `true`로 설정합니다.

여기서 채택하는 유용한 방법은 바로 클래스를 완전히 제거하고
ARIA 속성만 사용하여 요소의 스타일을 지정하는 것입니다. 그러면 버튼을 누른 상태에 대한 CSS
선택기를 아래에서

```
.toggle.pressed { ... }
```

아래와 같이 업데이트할 수 있습니다.

```
.toggle[aria-pressed="true"] { ... }
```

그러면 ARIA 상태와
요소의 모양 사이에 논리적이고 의미 있는 관계가 생성되고 불필요한 여분의 코드도 없앨 수 있습니다.

## 다중 기기 반응형 디자인

최상의 다중 기기 사용 환경을 제공하려면
반응적으로 디자인하는 것이 좋다는 점은 익히 알고 계시겠지만, 이런 디자인은
접근성 향상에 기여하는 바도 큽니다.

[Udacity.com](https://www.udacity.com/courses/all)과 같은 사이트를 생각해 보세요.

![Udacity.com at 100%
magnification](../../../en/fundamentals/accessibility/imgs/udacity.jpg)

작은 인쇄물을 읽는 데 어려움을 겪는 저시력 사용자는 예컨대
화면 배율을 400%로 높여서 볼 수 있을 것입니다. 반응적으로 디자인한 이 사이트에서는 UI가 '더 작은 뷰포트'(실제로는 큰 페이지에서 더
작은 뷰포트)에 맞춰 저절로 재조정되는데,
화면 배율을 조정해야 하는 데스크톱 사용자와
모바일 스크린 리더 사용자에게도
훌륭한 기능입니다. 그야말로 윈-윈 상황인 셈입니다. 다음은 같은 페이지를
400%의 배율로 조정한 화면입니다.

![Udacity.com at 400%
magnification](../../../en/fundamentals/accessibility/imgs/udacity-zoomed.jpg)

사실, 반응적으로 디자인하는 것만으로도 페이지가 '...텍스트 크기를 2배로 확대할 때 올바로 작동하고 읽을 수 있어야 한다'는 [WebAIM
검사 목록의 규칙 1.4.4](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external
}를
준수할 수
있습니다.

이 가이드에서 반응형 디자인의 모든 사항을 다루려는 것은 아니지만,
반응적 사용 환경에
유리하게 작용하고 사용자가 콘텐츠를 더욱 원활하게 사용할 수 있게 해줄 몇 가지 중요한 사항이 있습니다.

- 첫째, 항상 알맞은 `viewport` 메타 태그를 사용하세요.<br>`<meta name="viewport"
content="width=device-width, initial-scale=1.0">`<br>`width=device-width`로
설정하면기기 독립적 픽셀이 화면의 너비와 일치하고`initial-scale=1`로 설정하면 CSS 픽셀과 기기 독립적 픽셀 간에 1:1
관계로설정됩니다. 이렇게 설정하면 브라우저에서콘텐츠 크기가 화면 크기에 맞춰 조정되므로, 사용자에게 텍스트가 보기 불편하게 변형되는 것을막을 수
있습니다.

![a phone display without and with the viewport meta
tag](../../../en/fundamentals/accessibility/imgs/scrunched-up.jpg)

Warning: 뷰포트 메타 태그를 사용할 때는
maximum-scale=1이나 user-scaleable=no로 설정하지 않도록 주의하세요. 즉, 화면/축소할 필요가 있다면 사용자가 스스로
하도록 두세요!

- 유념해야 할 또 다른 기법은 반응적 그리드를 이용한 디자인입니다. Udacity
    사이트에서 살펴본 바와 같이, 그리드를 이용한 디자인이란 페이지의 크기가 바뀔 때
    콘텐츠가 리플로우하게 된다는 의미입니다. 하드 코딩한 픽셀 값 대신 퍼센트, em 또는 rem과 같은
    상대 단위를 사용할 때 이런 레이아웃이 흔히
    생성됩니다. 이런 식으로 처리할 때의 이점은 텍스트와 콘텐츠를 확대하고
    페이지의 다른 항목은 축소할 수 있다는 점입니다. 따라서 배율 조정으로 레이아웃이 바뀌더라도
    DOM 순서와 읽기 순서가 그대로 유지됩니다.

- 텍스트 크기와 같은 것에 대해서도 픽셀 값 대신 `em` 또는 `rem`과 같은
    상대 단위를 사용해 보세요. 일부 브라우저는 사용자 기본 설정에서만
    텍스트 크기 조정 기능을 지원하며, 텍스트에 픽셀 값을 사용할 경우에는 이 설정이
    복사본에 영향을 주지 않습니다. 하지만 상대 단위를 전면적으로 사용한 경우에는
    사이트 복사본이 업데이트되면서 사용자의 기본 설정을 반영하게 됩니다.

- 마지막으로, 휴대기기에 디자인이 표시될 때는 버튼이나 링크와
    같은 대화형 요소가 충분히 크고 그 주변에 충분한 공간이 있는지
    확인하여 실수로 다른 요소 위에 중첩되지 않고 쉽게 누를 수
    있도록 해야 합니다. 이는 모든 사용자에게 이로운 점이겠지만, 특히
    운동장애가 있는 사람에게 도움이 됩니다.

최소 권장 터치 대상 크기는 모바일 뷰포트이 올바로 설정된 사이트에서
기기 독립적 픽셀 기준으로 약 48입니다. 예를 들어, 어떤 아이콘의
너비와 높이가 24px에 불과할 수 있지만 안쪽 여백을 추가로 사용해
탭 대상 크기를 48px까지 확대할 수 있습니다. 48x48픽셀의 면적은 약 9mmx9mm에 해당하며,
사람의 손가락 끝이 화면에 닿는 면적과 비슷합니다.

![a diagram showing a couple of 48 pixel touch
targets](../../../en/fundamentals/accessibility/imgs/touch-target.jpg)

또한, 터치 대상은 서로 가로 및 세로 방향으로 약 32픽셀 이상의 간격으로 떨어져 있어야 합니다.
그래야 사용자가 손가락으로 한 탭 대상을
누를 때 본의 아니게 다른 탭 대상을 누르게 되는 상황을 피할 수 있습니다.

![a diagram showing 32 pixels of space around a touch
target](../../../en/fundamentals/accessibility/imgs/touch-target2.jpg)

## 색상과 대비

시력이 좋은 사람은 다른 사람도 전부 자기처럼 색을 잘 구분하고
글자를 쉽게 읽을 수 있을 것이라 생각하기 십상이지만, 물론 그건 사실이 아니죠.
모든 이가 쉽게 접근할 수 있고 즐거움을 느끼는 디자인을 만들기 위해
어떻게 색상과 대비를 효과적으로 사용할 수 있을지 살펴봅시다.

어렵지 않게 생각해 볼 수 있겠지만, 어떤 이에겐 쉽게 구분되는 색 조합이
다른 누군가에겐 어렵거나 아예 불가능한 일일 수도 있습니다. 이는 보통 전경색과 배경색의 *광도* 간 관계인
*색상과 대비*의 문제로
귀결됩니다. 색상이 서로 유사하면 명암비가 낮고 색상 차이가 크게 날수록
명암비가 높아집니다.

[WebAIM 가이드라인](http://webaim.org/standards/wcag/){: .external }에서는
모든 텍스트에 대해 AA(최소) 명암비인 4.5:1을 권장합니다. 한 가지 예외는
매우 큰 텍스트(기본 본문 텍스트보다 120~150% 이상 큰 텍스트)의 경우
명암비를 3:1까지 낮출 수 있다는 점입니다. 아래에 표시된 명암비에 차이에
따른 시각적 효과를 살펴보세요.

![comparison of various contrast
ratios](../../../en/fundamentals/accessibility/imgs/contrast-ratios.jpg)

레벨 AA에 대해 4.5:1의 명암비를 선택했습니다. 이 비율은
시력이 약 20/40 정도인 사용자가 흔히 겪는 대비 민감도 상실을 보상해주기
때문입니다. 20/40은 약 80세 연령의 사람들에게서
보편적으로 측정되는 시력으로 알려져 있습니다. 시력이 나쁘거나 색각 이상이 있는 사용자를 위해
본문 텍스트의 명암비를 7:1까지 높일 수 있습니다.

Chrome용 [Accessibility DevTools
확장
프로그램](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){:
.external }을
사용하여 명암비를 식별할 수 있습니다. 이 Chrome Devtools를
사용하는 한 가지 이점은 현재 색상에 대해 AA 및 AAA(강화) 레벨의 대안을 제안해 준다는 점으로,
제안되는 값을 클릭하면 앱에서 어떻게 나타날지 미리 볼 수 있습니다.

색상/대비 감사 기능을 실행하려면 다음의 기본 절차를 따르세요.

1. 확장 프로그램 설치 후, `Audits`를 클릭합니다.
2. `Accessibility`를 제외한 모든 항목을 선택 취소합니다.
3. `Audit Present State`를 클릭합니다.
4. 대비 관련 경고가 있는지 확인합니다.

![the devtools contrast audit
dialog](../../../en/fundamentals/accessibility/imgs/contrast-audit.png)

WebAIM 자체에서 편리한 [색상 대비
검사기](http://webaim.org/resources/contrastchecker/){: .external }를 제공하므로, 이 도구를
사용해 색상 쌍의 대비를
검사할 수 있습니다.

### 색상만으로 정보를 전달하지는 마세요

색각 이상을 가진 사용자 수가 약 3억 2천만 명이나 됩니다. 대략 남성 12명 중 1명,
여성 200명 중 1명꼴로 어떤 형태로든 '색맹'을 겪고 있습니다. 즉,
사용자 중 1/20(5%)이 개발자가 의도한 대로 사이트를 이용하지 못할 것이라는 뜻입니다.
따라서 색상에 의존해 정보를 전달한다면 그 많은 수의 사용자에겐 제대로 정보가 전달되지 않게
됩니다.

참고: '색맹'이라는 말은 색 구분에 문제가 있는 사람의 시력 조건을 묘사하기 위해 흔히 사용되는 용어지만,
사실은 정말로 색맹인 사람은
극소수입니다. 색각 이상이 있는 사람들은 대부분 일부 색상이나 대부분의 색상을 보고
구분할 수 있지만, 빨간색과 녹색(가장 흔함), 갈색과 주황색,
파란색과 자주색과 같은 특정 색상을 구분하는 데 어려움을 겪습니다.

예를 들어, 입력 양식에서 전화번호가 잘못되었음을 표시하기 위해
전화번호에 빨간색 밑줄이 표시될 수 있을 겁니다. 하지만 색각 이상이 있는 사용자나 스크린 리더 사용자에게는
설령 그 정보가 전달된다고 해도 제대로 전달되지 않습니다. 따라서 항상
중요한 정보에는 사용자가 여러 경로를 통해 접근할 수 있도록 해야 합니다.

![an input form with an error underlined in
red](../../../en/fundamentals/accessibility/imgs/input-form1.png)

[WebAIM 검사 목록의
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external }에
'콘텐츠를 전달하거나 시각적 요소를 구분할 유일한 방법으로
색상을 사용하면 안 된다'고 규정되어 있습니다. 또한, 특정한 대비 요건을 충족하지 않는 한 '색상만으로 링크를 주변 텍스트와 구분하면 안
된다'고도
규정되어
있습니다. 검사 목록에서는 그 대신
(CSS `text-decoration` 속성을 사용하여)
밑줄과 같은 다른 표시기를 추가해 링크가 활성 상태일 때 이를 나타낼 것을 권장합니다.

이전의 예시를 쉽게 수정할 수 있는 한 가지 방법은 전화번호가 잘못되었으며 그 이유는 무엇인지 알려주는 추가 메시지를
입력란에 추가하는 것입니다.

![an input form with an added error message for
clarity](../../../en/fundamentals/accessibility/imgs/input-form2.png)

앱을 빌드할 때 이런 사항을 염두에 두고 중요한 정보를 전달하는 데
색상에 지나치게 의존하는 부분이 생기지 않도록
주의하세요.

다양한 사람들에게 사이트가 어떤 모습으로 보일지 궁금하거나
UI에 색상을 많이 사용할 경우 [NoCoffee Chrome
확장
프로그램](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){:
.external }을
사용해 다양한 유형의 색맹을 비롯한 다양한 형태의 시각장애를
시뮬레이션 해볼 수 있습니다.

### 고대비 모드

사용자가 고대비 모드를 사용하여 전경색과 배경색을 반전시킬 수 있는데,
이를 통해 텍스트를 더 돋보이게 하는 데 도움이 될 때가 많습니다. 시력이 나쁜
사용자는 고대비 모드를 통해 페이지의 콘텐츠를 훨씬 더 쉽게
탐색할 수 있습니다. 시스템에서 고대비 설정을 수행할 수 있는 몇 가지 방법이 있습니다.

Mac OSX 및 Windows와 같은 운영체제에서는 시스템 레벨에 있는 모든 것에
사용할 수 있는 고대비 모드를 제공합니다. 또는 사용자가
[Chrome High Contrast
확장
프로그램](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){:
.external }과
같은 확장 프로그램을 설치하여 특정 앱에서만 고대비 모드를 사용하도록 할 수 있습니다.

고대비 설정을 활성화하고 애플리케이션에서 모든 UI가
표시되고 사용 가능한 상태인지 확인하는 실습을 해보면 유용할 것입니다.

예를 들어, 탐색 메뉴에서는 희미한 배경색을 사용하여 현재 어떤 페이지가 선택되어 있는지 표시할 수
있을 것입니다. 고대비 확장 프로그램에서 이런 페이지를 보면
희미한 배경색이 완전히 사라지고 그러면서
사용자는 어떤 페이지가 활성 상태인지 알 수 있습니다.

![a navigation bar in high contrast
mode](../../../en/fundamentals/accessibility/imgs/tab-contrast.png)

이와 유사하게, 이전 과정의 예를 생각해 보면 잘못된 전화번호 입력란의
빨간색 밑줄이 구분하기 힘든 파란색-녹색 조합으로 표시될 수도
있습니다.

![a form with an error field in high contrast
mode](../../../en/fundamentals/accessibility/imgs/high-contrast.jpg)

이전 과정에서 설명한 명암비 요건을 충족할 경우
고대비 모드 지원에는 아무런 문제가 없을 것입니다. 하지만
Chrome High Contrast 확장 프로그램을 설치하고
페이지를 빠르게 훑어보면서 모든 것이 예상한 대로 올바로 작동하고 정상적인 모습인지만
확인해 봐도 더욱 안심될 겁니다.
