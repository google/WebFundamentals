project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ARIA 및 비 네이티브 HTML 의미 체계 소개

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# ARIA 소개 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

네이티브 HTML 요소가 포커스,
키보드 지원, 기본 제공 의미 체계를 제공하기 때문에 지금까지는 네이티브 HTML 요소 사용을 권장해왔습니다. 하지만 단순한
레이아웃과 네이티브 HTML로는 작업을 수행하지 못할 때가 있습니다. 예를 들어, 현재는 매우 일반적인 UI 구조인 팝업 메뉴에 대해
표준화된 HTML 요소가 없습니다. '사용자가
가급적 빨리 이 점에 대해 알아야 함'과 같은 의미 체계상
특성을 제공하는 HTML 요소 역시 없습니다.

이 세션에서는 HTML이 단독으로 표현할 수 없는 의미 체계를 표현하는 방법에 대해
알아보겠습니다.

[Web Accessibility Initiative의 Accessible Rich Internet Applications
사양](https://www.w3.org/TR/wai-aria/){: .external }(WAI-ARIA 또는 줄여서
ARIA)은 네이티브 HTML로 관리할 수 없는 접근성 문제가 있는 영역을 연결하기에
적합합니다. ARIA는 요소가 접근성 트리로 변환되는 방식을 수정하는 속성을
지정할 수 있도록 허용하는 방식으로 작동합니다. 예시를 통해
살펴봅시다.

다음 스니펫에서는 목록 항목을 일종의 사용자설정 확인란으로 사용합니다. CSS
'확인란' 클래스는 필수적인 시각적 특성을 요소에 부여합니다.

```
<li tabindex="0" class="checkbox" checked>
  Receive promotional offers
</li>
```

이렇게 하면 시력이 정상인 사용자에게는 알맞지만, 스크린 리더는
이 요소가 확인란이라는 점을 알려주지 못하므로 시력이 나쁜 사용자가 이 요소를
완전히 놓칠 수도 있습니다.

하지만 ARIA 속성을 사용하면 요소에 누락된 정보를 부여할 수 있으므로
스크린 리더가 올바로 해석할 수 있습니다. 여기서는 요소를 확인란으로 명시적으로 식별하고 확인란이 기본적으로 선택되어 있음을 나타내기 위해
`role` 및
`aria-checked` 속성을
추가했습니다. 그러면 접근성 트리에 목록 항목이 추가되고
스크린 리더가 확인란이라고 올바르게 알려줍니다.

```
<li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
  Receive promotional offers
</li>
```

참고: ARIA 속성 목록과 속성을 사용할 시점에 대해서는 [이후에](#what-can-aria-do) 자세히 알아보겠습니다.

ARIA는 표준 DOM 접근성 트리를 변경하고 증가시키는 방식으로 작동합니다.

![표준 DOM 접근성
트리](../../../../en/fundamentals/accessibility/semantics-aria/imgs/acctree1.jpg){:
.attempt-right }

![ARIA의 증가된 접근성
트리](../../../../en/fundamentals/accessibility/semantics-aria/imgs/acctree2.jpg){:
.attempt-right }

ARIA를 사용하면 페이지에서 임의의 요소에 대한 접근성 트리를
미세하게 수정하거나 아예 근본적으로 수정할 수 있지만, 그게 바로 ARIA가 변경하는 유일한 것이기도 합니다. **ARIA는
요소의 고유 동작을 증가시키지는 않습니다.** 즉,
요소를 포커스 가능하게 한다거나 요소에 키보드 이벤트 리스너를 제공하지는 않는다는 뜻입니다. 그 부분은 여전히 개발
중에 있습니다.

기본 의미 체계를 재정의할 필요가 없다는 점을
제대로 이해하시기 바랍니다. 표준 HTML `<input type="checkbox">`
요소의 사용 여부와는 상관없이, 이 요소를 올바로 알리기 위해 추가적인 `role="checkbox"` ARIA 속성은
필요 없습니다.

또한, 사용할 수 있는 ARIA 역할과 속성에 제한을 두는
HTML 요소가 있다는 점도 잘 알아두세요. 예를 들어, 표준 `<input type="text">` 요소에는 어떤 역할이나 속성도 추가로
적용되지 않을 수 있습니다.

> 추가 정보는 [HTML 사양의
ARIA](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external
}를
> 참조하세요.

ARIA가 제공하는 다른 기능으로는 어떤 것이 있는지 살펴봅시다.

## ARIA의 기능

확인란의 예에서 살펴본 바와 같이, ARIA는 기존의 요소 의미 체계를 수정하거나
네이티브 의미 체계가 없는 요소에 의미 체계를 추가할 수 있습니다. 메뉴나 탭 패널처럼
HTML에는 전혀 존재하지 않는 의미 체계 패턴을 표현할 수도
있습니다. ARIA를 사용하면 일반 HTML로는 불가능한 위젯 형식의 요소를 만들 수 있을
때가 많습니다.

- 예를 들어, ARIA는 보조 기술 API에만 노출되는 여분의 레이블 및 설명텍스트를 추가할 수 있습니다.<br>


<div class="clearfix"></div>


```
<button aria-label="screen reader only label"></button>
```

- ARIA는 특정 영역을 제어하는 사용자설정 스크롤 바와 같은 표준 상위/하위 연결을확장하는 요소 간의 의미 체계 관계를 표현할 수있습니다.


<div class="clearfix"></div>


```
<div role="scrollbar" aria-controls="main"></div>
<div id="main">
. . .
</div>
```

- ARIA는 페이지 중 일부를 '라이브' 상태로 만들어 이런 부분이 바뀔 때 즉시보조 기술에 그 사실을 알릴 수 있습니다.


<div class="clearfix"></div>


```
<div aria-live="true">
  <span>GOOG: $400</span>
</div>
```

ARIA 시스템의 핵심적인 특징 중 하나는 *역할* 모음입니다. 접근성 관련
용어에서 역할이란 특정 UI 패턴을 축약해서 표시하는
말입니다. ARIA는 HTML 요소에서 `role`
속성을 통해 사용할 수 있는 패턴의 어휘를 제공합니다.

앞서 든 예에서 `role="checkbox"`를 적용했는데, 그 의미는 보조 기술에
해당 요소가 '확인란' 패턴을 따라야 함을 알려준 것이었습니다. 즉,
요소가 확인 상태(확인 또는 확인 안 됨)를 가질 것이라는 점과
표준 HTML 확인란 요소와 마찬가지로 마우스나 스페이스바를 사용해
상태를 전환할 수 있다는 점을 보장한다는 의미가 있습니다.

사실, 스크린 리더에서는 주로 키보드를 사용하기 때문에
사용자설정 위젯을 생성할 때
`role` 속성이 항상 `tabindex`
속성과 같은 자리에서 적용되도록 하는 것이 매우 중요합니다. 이를 통해 키보드 이벤트가 알맞은 자리로 이동하고
포커스가 자신의 역할이 정확하게 전달되는 요소에 안착하게 되는 것입니다.

[ARIA 사양](https://www.w3.org/TR/wai-aria/){: .external }에는 이런 역할과 함께 사용할 수 있는
`role` 속성과 관련 ARIA
속성에 가능한 값의 분류에 대해 설명되어 있습니다. 이 사양은
ARIA 역할과 속성이 함께 작동하는 방식과 브라우저와
보조 기술을 통해 지원하는 방식으로 사양을 사용할 수 있는 방법에 대해
가장 정확하고 명확한 정보를 담고 있습니다.

![a list of all the available ARIA
roles](../../../../en/fundamentals/accessibility/semantics-aria/imgs/aria-roles.jpg)

하지만 사양은 너무 상세하므로 처음 시작하기에 좀 더 쉽게 접근할 수 있는 수단은 [ARIA
Authoring Practices 문서](https://www.w3.org/TR/wai-aria-practices-1.1/){:
.external }
입니다. 이 문서에는 사용 가능한 ARIA 역할과 속성을 사용하는 모범 사례가 설명되어
있습니다.

또한, ARIA는 HTML5에서 사용할 수 있는 옵션을 확장하는 이정표 역할도 제공합니다. 자세한 내용은
[Landmark Roles Design
Patterns](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){:
.external }
사양을 참조하세요.
