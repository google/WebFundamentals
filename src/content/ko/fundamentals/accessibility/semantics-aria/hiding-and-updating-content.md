project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 보조 기술에서 콘텐츠 숨기기

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 콘텐츠 숨기기 및 업데이트 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

보조 기술 사용자를 위한 사용 환경의 미세 조정에서 중요한 또 다른 기술은
페이지에서 관련 부분만 보조 기술에 노출시키는
것입니다. DOM의 한 부분이 접근성 API에 노출되지 않도록
하는 방법은 여러 가지가 있습니다.

먼저 DOM에서 명시적으로 숨겨진 콘텐츠는 접근성 트리에도
포함되지 않습니다. 따라서 `visibility: hidden` 또는 `display: none`의 CSS 스타일이 있거나 HTML5
`hidden` 속성을 사용하는 콘텐츠 역시
숨겨져 보조 기술 사용자가 인식할 수 없게 됩니다.

하지만 시각적으로 렌더링되지 않지만 명시적으로 숨겨지지는 않는 요소는
여전히 접근성 트리에 포함됩니다. 한 가지 일반적인 기법은 절대 위치상 화면 밖에 있는 요소에
'스크린 리더 전용 텍스트'를 포함하는 것입니다.

```
.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

또한, 앞서 살펴본 바와 같이 다른 상황이었다면 숨겨지는 요소를
참조하는 `aria-label`, `aria-labelledby` 또는 `aria-describedby` 속성을 통해 스크린 리더 전용 텍스트를
제공할 수
있습니다.

'스크린 리더 전용' 텍스트 생성에 대한 자세한 내용은 [텍스트 숨기기
기법](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external
}에
대한 WebAIM 문서를 참조하세요.

마지막으로, ARIA는
`aria-hidden` 속성을 사용하여 시각적으로 숨겨지지 않는 콘텐츠를 보조 기술에서 제외하기 위한 메커니즘을 제공합니다.
요소에 이 속성을 적용하면 사실상 요소와 *모든 하위
항목*이 접근성 트리에서 제거됩니다. `aria-labelledby` 또는 `aria-describedby` 속성이
참조하는 요소가 유일한 예외입니다.

```
<div class="deck">
  <div class="slide" aria-hidden="true">
    Sales Targets
  </div>
  <div class="slide">
    Quarterly Sales
  </div>
  <div class="slide" aria-hidden="true">
    Action Items
  </div>
</div>
```

예를 들어, 기본 페이지에 대한 액세스를 차단하는 모달 UI를 생성하려는 경우 `aria-hidden`을
사용할 수 있을 것입니다. 이 경우 시력이 정상인 사용자에게는
페이지 대부분을 현재 사용할 수 없음을 나타내는 반투명 오버레이가 표시될 수 있겠지만,
스크린 리더 사용자는 페이지의 다른 부분을
계속 탐색할 수 있습니다. 이 경우에는 [앞서
설명한](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps)
키보드 트랩뿐 아니라,
페이지 중에서 현재 범위 밖에 있는 부분도
`aria-hidden` 상태인지 확인할 필요가 있습니다.

단일 요소의 의미 체계를 변경하는 방법뿐 아니라 ARIA의 기초, ARIA가 네이티브 HTML
의미 체계와 상호 작용하는 방식, 접근성
트리에서 상당히 중대한 외형적 변화를 줄 때 ARIA를 사용할 수 있는 방법까지도
이해하게 되었으니, 이제 ARIA를 사용해 시간에 민감한 정보를 전달하는 방법을 살펴봅시다.

## aria-live

개발자는 `aria-live`를 사용해 페이지 중 어떤 부분을 '라이브'로 표시할 수 있습니다. 즉, 사용자가 페이지를 탐색하다가 그저 우연히
그런 '라이브' 부분을
발견하는 것이 아니라, 페이지의 어느 위치에 있든 상관없이
새롭게 업데이트된 정보를 사용자에게 즉시 알릴 수 있습니다. `aria-live` 속성을
가진 요소가 있는 경우 페이지에서 이런 요소와 그 하위 항목을 포함한 부분을
*라이브 영역*이라고 합니다.

![ARIA live establishes a live
region](../../../../en/fundamentals/accessibility/semantics-aria/imgs/aria-live.jpg)

예를 들어, 라이브 영역은 사용자 작업의 결과로서 나타나는
상태 메시지일 수 있습니다. 시력이 정상인 사용자의
시선을 끌어야 할 중요한 메시지인 경우
`aria-live` 속성을 설정하여 보조 기술 사용자의 관심 역시 충분히 끄는 것이 중요합니다. 아래의 일반적인 `div`를

```
<div class="status">Your message has been sent.</div>
```

아래의 '라이브' div와 비교해 보세요.

```
<div class="status" aria-live="polite">Your message has been sent.</div>
```

`aria-live`에는 `polite`, `assertive`, `off`의 세 가지 값이 허용됩니다.

- `aria-live="polite"`는 보조 기술이 현재 어떤 작업을 하고 있든 그 작업을 마치면 보조 기술 사용자에게이런 변경 사항을
알리도록 하는 역할을 합니다. 중요하지만 긴급하지는 않은변경 사항일 경우에 적합하며 `aria-live`는 대부분의이런 용도로 사용됩니다.
- `aria-live="assertive"`는 보조 기술이 수행 중인 작업이 무엇이든 중단하고사용자에게 이런 변경 사항을 즉시 알리도록 하는
역할을 합니다. '서버 오류가 발생하여변경 내용이 저장되지 않습니다. 페이지를 새로 고치세요' 같은상태 메시지나 스테퍼 위젯에 있는 버튼처럼
사용자 작업의 직접적 결과로서입력란이 업데이트되는 경우와 같이 중요하고도 긴급한 업데이트에만이 값을 사용하세요.
- `aria-live="off"`는 보조 기술이 `aria-live` 인터럽트를 일시적으로 중단하도록 하는역할을 합니다.

라이브 영역이 올바로 작동하도록 하기 위한 방법이 몇 가지 있습니다.

첫째, 처음에 페이지를 로드할 때 `aria-live` 영역을 설정해야 할 것입니다.
엄격히 지켜야 할 규칙은 아니지만 `aria-live` 영역에
난점이 있을 경우 문제가 될지 모릅니다.

둘째, 각 스크린 리더는 다양한 유형의 변화에 각기 다르게
반응합니다. 예를 들어, 하위 요소의 `hidden` 스타일을 true에서 false로
전환해 스크린 리더에서 경고를 발생시킬 수 있습니다.

`aria-live`와 함께 사용하는 다른 속성들은 라이브 영역이 바뀔 때 사용자에게
전달할 내용을 미세하게 조정하는 데 도움이 됩니다.

`aria-atomic`은 업데이트를 전달할 때 영역 전체를 하나의 전체로서 간주해야 할지
여부를 나타냅니다. 예를 들어 일, 월, 년으로 구성된
날짜 위젯에 `aria-live=true`와 `aria-atomic=true`가 있고 사용자가
스테퍼 컨트롤을 사용해 월의 값만 변경할 경우
날짜 위젯의 전체 콘텐츠가 다시 읽히게 됩니다. `aria-atomic`의 값은 `true`
또는 `false`(기본값)일 수 있습니다.

`aria-relevant`는 사용자에게 표시해야 할 변경 사항의 유형을 나타냅니다.
별도로 사용하거나 토큰 목록으로 사용할 수 있는 다음과 같은 옵션이 있습니다.

- *additions*: 라이브 영역에 추가하는 요소가 중요하다는뜻입니다. 예를 들어, 상태 메시지의 기존 로그에 범위를 추가할 경우이는
사용자에게 그 범위를 알려줄 것이라는의미입니다(`aria-atomic`이 `false`라고 가정).
- *text*: 하위 노드에 추가하는 텍스트 콘텐츠가 관련성이 있다는뜻입니다. 예를 들어, 사용자설정 텍스트 필드의 `textContent`
속성을 수정하면수정한 텍스트를 사용자에게 읽어주게 됩니다.
- *removals*: 텍스트나 하위 노드 제거를 사용자에게 전달해야 한다는뜻입니다.
- *all*: 모든 변경 사항이 관련성이 있다는 뜻입니다. 하지만 `aria-relevant`의 기본값은`additions text`인데,
이는 곧 `aria-relevant`를 지정하지 않으면요소에 추가되는 항목에 대해 사용자에게 표시되는 내용을 업데이트할 것이라는 의미이며,이는
아마도 개발자 역시 원하는 바일 것입니다.

마지막으로, `aria-busy`를 사용하면 보조 기술이 요소에 대한 변경 사항을
일시적으로 무시해야 한다고 알려줄 수 있습니다(예: 뭔가를 로드할 때). 모든
절차를 올바로 끝낸 후 리더의 작동을 정상화하려면 `aria-busy`를 false로
설정해야 합니다.
