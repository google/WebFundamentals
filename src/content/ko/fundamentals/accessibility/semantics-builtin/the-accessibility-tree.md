project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 접근성 트리 소개

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# 접근성 트리 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

*스크린 리더 사용자 전용* 사용자 인터페이스를 만든다고 생각해 봅시다.
시각적 UI를 만들 필요는 전혀 없겠지만, 스크린 리더가 사용할 정보는 충분히
제공해야 할 것입니다.

개발자가 만드는 것은 DOM API와 유사한 페이지 구조를 설명하는 일종의 API이지만,
더 적은 정보와 노드만으로도 만들 수 있습니다.
시각적 표시에만 유용한 정보가 많고 이런 정보는 제외할 것이기 때문입니다. 아마
다음과 같은 모습이 될지 모르겠습니다.

![screen reader DOM API
mockup](../../../../en/fundamentals/accessibility/semantics-builtin/imgs/treestructure.jpg)

이것이 기본적으로 브라우저가 스크린 리더에 실제로 제공하는 내용입니다. 브라우저는
DOM 트리를 가져와 보조 기술에
유용한 양식으로 수정합니다. 이렇게 수정된 트리를 *접근성
트리*라고 합니다.

접근성 트리를 마치 90년대에나 볼 수 있었던 웹페이지 스타일로 시각화할 수도 있습니다.
즉, 이미지 수가 적고 링크는 많으며 입력란과 버튼이 있는 올드한 형태 말입니다.

![a 1990s style web
page](../../../../en/fundamentals/accessibility/semantics-builtin/imgs/google1998.png)

이와 같은 페이지를 잘 살펴보면
스크린 리더 사용자가 직면하는 것과 비슷한 경험을 하게 됩니다. 즉, 인터페이스는 있지만 접근성 트리 인터페이스처럼
간단하고 직접적입니다.

대부분의 보조 기술은 바로 이 접근성 트리와 상호 작용합니다. 다음과
같은 흐름으로 진행됩니다.

1. 애플리케이션(브라우저나 기타 앱)이 API를 통해 의미 체계 기반의 UI 버전을보조 기술에 노출합니다.
2. 보조 기술은 API를 통해 읽는 정보를 사용하여사용자를 위한 대체 사용자 인터페이스 제공 방식을 만들 수 있습니다. 예를 들어,스크린
리더는 사용자가 앱에서 말해주는 내용을 듣는 인터페이스를생성합니다.
3. 사용자는 보조 기술을 이용해 앱과 다른 방식으로 상호 작용할 수도있습니다. 예를 들어, 대부분의 스크린 리더는 사용자가 마우스 클릭이나
손가락으로 탭하는 동작을쉽게 시뮬레이션할 수 있는 후크를 제공합니다.
4. 보조 기술은 접근성 API를 통해 사용자 인텐트(예: '클릭')를앱으로 다시 전달합니다. 그러면 앱이 원래 UI의 컨텍스트에 맞춰
적절히작업의 내용을 해석합니다.

웹브라우저의 경우 브라우저가 사실은 내부에서 작동하는 웹 앱의 플랫폼이기 때문에
각 방향으로 추가 단계가 있습니다. 이에 따라 브라우저는
웹 앱을 접근성 트리로 변환할 필요가 있고, 보조 기술에서 사용자가
수행하는 작업을 바탕으로 자바스크립트에서 적당한 이벤트가 실행되도록
해야 합니다.

하지만 그것은 모두 브라우저가 할 일입니다. 웹 개발자로서 할 일은
단지 이런 작업이 이루어진다는 점을 이해하고 이 프로세스를 이용해
사용자가 액세스할 수 있는 환경을 만들어주는 웹페이지를 개발하는 것입니다.

개발자는 페이지의 의미 체계를 올바르게 표현하는 데 주의를 기울여야 합니다.
즉, 페이지의 중요한 요소가 액세스 가능한 올바른 역할, 상태,
속성을 가지도록 하고 액세스 가능한 이름과 설명을 지정해야
합니다. 그러면 브라우저에서 보조 기술이 관련 정보에 액세스하여
맞춤설정된 환경을 만들도록 할 수 있습니다.

## 네이티브 HTML로 구현되는 의미 체계

DOM에는 대부분 *암시적* 의미 체계에 따른 의미가 있으므로
브라우저가 DOM 트리를 접근성 트리로 변환할 수 있습니다. 즉, DOM은 브라우저가 인식하고 다양한 플랫폼에서 예측 가능한 방식으로
작동하는 네이티브 HTML 요소를
사용합니다. 따라서 링크나 버튼 같은 네이티브 HTML 요소에 대한 접근성은
자동으로 처리됩니다. 페이지 요소의 의미 체계를 표현하는 HTML을 작성하여
기본 제공 접근성을 이용할 수 있습니다.

하지만 때로는 네이티브 요소와 비슷한 모습이긴 하지만 똑같지는 않은 요소를 사용합니다.
예를 들어, 이 '버튼'은 실은 버튼이 아닙니다.

{% framebox height="60px" %}


<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>



<div class="fancy-btn">Give me tacos</div>
{% endframebox %}


여러 가지 방법으로 HTML을 통해 이런 요소를 생성할 수 있지만 아래에 한 가지 방법을 소개합니다.

```
<div class="button-ish">Give me tacos</div>
```

실제 버튼 요소를 사용하지 않으면 스크린 리더가 그 위치에 무엇이 있는지 알 길이
없습니다. 또한, 지금 코딩하는 바와 같이 마우스로만 이 요소를 사용할 수 있기 때문에 키보드만 사용하는 사용자가 이 요소를 사용할 수 있도록
하기 위해 [tabindex 추가](/web/fundamentals/accessibility/focus/using-tabindex) 작업을
별도로 수행해야
할 것입니다.

`div` 대신 일반적인 `button` 요소를 사용하여 이 문제를 쉽게 해결할 수 있습니다.
네이티브 요소를 사용하면 키보드 상호 작용을
자동으로 처리할 수 있는 이점도 있습니다. 네이티브 요소를 사용한다는 이유만으로 멋있는 시각
효과를 포기할 필요는 없습니다.
네이티브 요소가 원하는 방식으로 나타나면서도 암시적 의미 체계와 동작을 그대로 유지하도록 네이티브 요소의 스타일을
지정할 수 있습니다.

앞서 설명한 대로, 스크린 리더는 요소의 역할, 이름, 상태 및 값을
공개적으로 알려줍니다. 적합한 의미 체계를 사용하면 요소, 역할, 상태 및 값을 포괄할 수 있지만,
요소의 이름을 검색 가능하도록 해야 하기도
합니다.

넓은 의미에서 다음과 같은 두 가지 유형의 이름이 있습니다.

- *표시 가능한 레이블*: 의미를 요소와 연관시키기 위해 모든 사용자가사용하는 이름
- *대체 텍스트*: 시각적 레이블이 필요하지 않을 때만 사용하는이름

텍스트 수준 요소의 경우 당연히 텍스트 콘텐츠가
있을 것이므로 따로 수행해야 할 작업은 없습니다. 하지만 입력 또는 제어 요소와 이미지 같은 시각적 콘텐츠의 경우
이름을 지정해야 합니다. 사실,
텍스트가 아닌 콘텐츠에 대해 대체 텍스트를 제공하는 것이
[WebAIM 검사 목록의 맨 앞에 있는 항목](http://webaim.org/standards/wcag/checklist#g1.1)입니다.

이런 텍스트를 제공하는 한 가지 방법은 '양식 입력에는 연관된 텍스트 레이블이 있다'는
권장 사항을 따르는 방법입니다. 레이블을 체크박스와 같은 양식 요소와 연결하는 방법은
두 가지가 있습니다. 두 가지 방법 중 어느 하나를 사용하면 레이블 텍스트 역시 체크박스에 대한 클릭 대상이 되는데,
이는 마우스 또는 터치스크린 사용자에게도
유용합니다. 레이블을 요소와 연결하려면 다음 중 하나를 수행하세요.

- 레이블 요소 내부에 입력 요소 배치


<div class="clearfix"></div>


```
<label>
  <input type="checkbox">Receive promotional offers?</input>
</label>
```

{% framebox height="60px" %}


<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receive promotional offers?
    </label>
</div>
{% endframebox %}


또는

- 레이블의 `for` 속성을 사용하고 요소의 `id` 참조


<div class="clearfix"></div>


```
<input id="promo" type="checkbox"></input>
<label for="promo">Receive promotional offers?</label>
```

{% framebox height="60px" %}


<div style="margin: 10px;">
    <input id="promo" type="checkbox">
    <label for="promo">Receive promotional offers?</label>
</div>
{% endframebox %}


체크박스에 레이블이 올바로 지정되면 스크린 리더에서
해당 요소는 체크박스 역할이고 확인 표시를 한 상태이며 'Receive
promotional offers?'로 명명되어 있다고 알려줄 수 있습니다.

![on-screen text output from VoiceOver showing the spoken label for a
checkbox](../../../../en/fundamentals/accessibility/semantics-builtin/imgs/promo-offers.png)

Success: 이제는 실제로 스크린 리더를 사용하여 페이지를 탭으로 이동하고 음성으로 안내되는 역할, 상태, 이름을 확인하면서 잘못 연결된
레이블을
찾을 수
있습니다.
