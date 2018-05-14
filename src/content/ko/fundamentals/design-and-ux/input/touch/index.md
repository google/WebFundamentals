project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 전화기에서 데스크톱 화면에 이르기까지 점점 더 많은 기기에서 터치스크린을 사용할 수 있습니다. 앱은 직관적이고 멋진 방식으로 터치스크린의 터치에 반응해야 합니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# 사이트에 터치 추가 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

전화기에서 데스크톱 화면에 이르기까지 점점 더 많은 기기에서
 터치스크린을 사용할 수 있습니다. 사용자가 UI와의 상호작용을 선택하면 앱이
직관적인 방식으로 터치스크린의 터치에 반응해야 합니다.

<div class="clearfix"></div>

## 요소 상태에 반응

웹페이지에서 어떤 요소를 터치하거나 클릭했는데
 사이트가 이 터치나 클릭을 실제로 감지했는지 궁금했던 적이 있으세요?

사용자가 UI 부분을 터치하거나 상호작용할 때
 해당 요소의 색상이 바뀐다면, 이 사이트가 작동 중인지를 쉽게 확인할 수 있을 것입니다. 그러면 좌절감이 줄어들 뿐만 아니라
 사이트가 빠르고 반응성이 뛰어나다는 느낌을 줍니다.

DOM 요소는 default, focus, hover, active의 네 가지 상태를
 임의로 상속할 수 있습니다. 이들 각 상태에 대해 UI를 변경하기 위해 우리는 아래 나타난 것처럼
 의사 클래스 `:hover`, `:focus` 및 `:active`에 스타일을 적용해야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![버튼 상태에 따라 다른 색상을 보여주는
이미지](images/button-states.png)

대부분의 모바일 브라우저에서는 어떤 요소를 누른 후
 이 요소에 *hover* 및/또는 *focus* 상태가 적용됩니다.

어떤 스타일을 설정할지 그리고 사용자가 이 스타일을 터치했을 때
 어떻게 보일지를 신중하게 고려하세요.

참고: 앵커 태그 및 버튼은 다른 브라우저에서
 다르게 동작할 수도 있으므로, 어떤 경우에는 **hover**가
유지되고 다른 경우에는 **focus**가 유지된다고 가정하세요.

### 기본 브라우저 스타일 억제

다른 상태에 대한 스타일을 추가한 경우,
 대부분의 브라우저는 사용자 터치에 반응하여 자체 스타일을 구현하게 됩니다. 그 주된 이유는,
 휴대기기가 처음 시작될 때 다수의 사이트는 `:active` 상태에 대한
 스타일이 없기 때문입니다. 따라서 사용자 피드백을 제공하기 위해
 많은 브라우저들이 추가적인 하이라이트 색상이나 스타일을 추가했습니다.

대부분의 브라우저는 어떤 요소가 포커스를 받을 때
 요소 주변에 포커스 링을 표시하기 위해 `outline` CSS 속성을 사용합니다. 이 속성을 억제하기 위해 다음을 사용합니다.

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari 및 Chrome에서는
`-webkit-tap-highlight-color` CSS 속성으로 방지가 가능한 탭 하이라이트 색상을 추가합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Windows Phone에 설치된 Internet Explorer도 동작은 유사하지만
다음 메타 태그를 통해 억제됩니다.

    <meta name="msapplication-tap-highlight" content="no">

Firefox에는 처리할 두 가지 부작용이 있습니다.

`-moz-focus-inner` 의사 클래스는
터치 가능 요소에 윤곽선을 추가하는데, `border: 0`을 설정하여 이 의사 클래스를 제거할 수 있습니다.

Firefox에서 `<button>` 요소를 사용 중인 경우 그라데이션을 적용하게 되는데
, `background-image: none`을 설정하여 이 그라데이션을 제거할 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Caution: `:hover`, `:active` 및 `:focus`에 대한 의사 클래스가 있는 경우에는
 위에 언급된 기본 스타일만을 억제할 수 있습니다!

### user-select 비활성화

UI를 만들 때 사용자가 요소와 상호작용하기를
원하거나, 텍스트를 길게 눌러 선택하거나 마우스를 UI 위로 드래그하는 기본 동작을
억제해야 하는 경우가 있습니다.

이를 위해 `user-select` CSS 속성을 사용할 수 있지만 주의할 점은,
사용자가 요소의 텍스트를 선택하기를 *원하는데*
콘텐츠에서 이 작업을 수행할 경우 사용자의 **엄청난** 분노를 유발할 수 있습니다.
따라서 주의해서 사용하고 가급적 사용하지 마세요.

    user-select: none;

## 사용자설정 동작 구현

사용자설정 상호작용과 동작을 사이트에 구현할 경우
 다음의 두 가지 사항을 명심해야 합니다.

1. 모든 브라우저를 지원하는 방법.
1. 프레임 속도를 높게 유지하는 방법.

이 문서에서는 모든 브라우저를 지원하는 데 필요한
API에 대해 살펴보고 또한 이들 이벤트를 효율적으로 사용하는
방법에 대해 살펴보겠습니다.

여러분의 제스처가 어떤 동작을 수행하는지에 따라,
 사용자가 한번에 하나의 요소와 상호작용을 수행하거나 아니면 동시에
 여러 요소와 상호작용을 수행할 수 있습니다.

Caution: 일부 사용자는 키보드 입력을 원하는데, 터치스크린 기기에서
 보조 기술을 실행 중인 사용자가 동작을 수행하지 못할 수도 있습니다.
 왜냐하면 이 보조 기술이 동작을 가로채거나 사용하기
 때문입니다.

이 문서의 두 가지 예시인 모든 브라우저를 지원하는 방법과
 프레임 속도를 높게 유지하는 방법에 대해 살펴보겠습니다.

![문서 터치에 대한 예시 GIF](images/touch-document-level.gif){: .attempt-right }

첫 번째 예시는 사용자가 하나의 요소와 상호작용하도록 허용합니다. 이 경우
동작이 요소에서 처음 시작되었다면, 모든 터치 이벤트를 이 요소에
지정할 수 있습니다. 예를 들어, 스와이프 가능 요소에서
 손가락을 떼더라도 여전히 이 요소를 제어할 수 있습니다.

이 기능은 뛰어난 유연성을 사용자에게 제공하지만
 사용자가 UI와 상호작용할 수 있는 방식이 제한됩니다.

<div class="clearfix"></div>

![요소 터치에 대한 예시 GIF](images/touch-element-level.gif){: .attempt-right }

그러나 사용자가 멀티터치를 사용하여 동시에
여러 요소와 상호작용할 것으로 예상된다면, 터치 동작을 특정 요소로
제한해야 합니다.

이 기능은 사용자에게 더 많은 유연성을 제공하지만,
 UI 조작을 위한 로직이 복잡하며 사용자 오류에 대한 복원성이 떨어집니다.

<div class="clearfix"></div>

### 이벤트 리스너 추가

`PointerEvents`는 Chrome(버전 55 이상), Internet Explorer 및 Edge에서
사용자설정 동작을 구현하기 위해 권장되는 방법입니다.

다른 브라우저에서는 `TouchEvents` 및 `MouseEvents`가 올바른 방법입니다.

`PointerEvents`는 여러 유형의 입력(예: 마우스, 터치, 펜 이벤트)을
하나의 콜백 세트에 병합해주는
멋진 기능입니다. 수신할 이벤트는 `pointerdown`, `pointermove`,
`pointerup` 및 `pointercancel`입니다.

다른 브라우저에서 이에 상응하는 이벤트는`touchstart`, `touchmove`,
`touchend` 및 `touchcancel`이며(터치 이벤트의 경우),
 마우스 입력 시에 동일한 동작을 구현하려면 `mousedown`,
`mousemove` 및 `mouseup`을 구현해야 합니다.

어떤 이벤트를 사용할지 궁금하면 
[터치, 마우스 및 포인터 이벤트](#touch-mouse-and-pointer-events) 표를 확인하세요.

이들 이벤트를 사용하려면 DOM
요소에서 `addEventListener()` 메서드를 호출해야 하며 이벤트 이름, 콜백 함수 및 부울 값이 필요합니다.
부울 값은 다른 요소들이 이벤트를 포착하고 해석하기 전에
이벤트를 포착할지 아니면 후에 포착할지를 결정합니다.
(`true`는 다른 요소들 전에 이벤트를 원한다는 의미입니다.)

다음은 상호작용의 시작을 수신 대기하는 예시입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

참고: API 디자인 덕분에 PointerEvents는 마우스 및 터치 이벤트를 처리하기 위해 단일
`pointerdown` 이벤트만 필요합니다.

#### 단일 요소 상호작용 처리

위의 간단한 코드 스니펫에는 마우스 이벤트의 시작 이벤트 리스너만
 추가되었습니다. 그 이유는, 이벤트 리스너가 추가된 요소 *위를* 커서로 가리킬 때만
 마우스 이벤트가 트리거되기 때문입니다.

TouchEvents는 터치가 발생한 위치에 상관없이 동작이 시작된 후
동작을 추적하며, PointerEvents는 터치가 발생한 위치에 상관없이
이벤트를 추적합니다. 우리는 DOM 요소에서 `setPointerCapture`를 호출합니다.

마우스 이동 및 종료 이벤트의 경우, 동작 시작 메서드 *안에* 
이벤트 리스너를 추가하고 이 리스너를 문서에 추가합니다.
즉, 동작이 완료될 때까지 커서를 추적할 수 있습니다.

구현 단계는 다음과 같습니다.

1. 모든 TouchEvent 및 PointerEvent 리스너를 추가합니다. MouseEvents의 경우
 시작 이벤트**만** 추가합니다.
1. 시작 동작 콜백 내에서, 마우스 이동 및 종료 이벤트를
문서에 바인딩합니다. 이런 방식으로, 원래 요소에서 이벤트 발생 여부에 상관없이
 모든 마우스 이벤트가 수신됩니다. PointerEvents의 경우
 추가적인 모든 이벤트를 수신하려면 원래 요소에서 `setPointerCapture()`를
 호출해야 합니다. 그런 다음, 동작 시작을 처리합니다.
1. 이동 이벤트를 처리합니다.
1. 종료 이벤트에서 마우스 이동 및 종료 리스너를 문서로부터 제거하고
동작을 종료합니다.

다음은 이동 및 종료 이벤트를 문서에 추가하는
 `handleGestureStart()` 메서드의 스니펫입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

우리가 추가하는 종료 콜백은 `handleGestureEnd()`이며,
이 콜백은 이동 및 종료 이벤트 리스너를 문서로부터 제거하고,
동작이 완료되면 포인터 캡처를 해제합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">
  <p>이 패턴에 따라 이동 이벤트를 문서에 추가하게 되면
 사용자가 요소와의 상호작용을 시작하고 동작을 요소 밖으로 이동할 때,
 페이지 위치에 상관없이 계속해서 마우스 이동을 포착할 수 있습니다.
 그 이유는 이벤트가 문서로부터 수신 중이기 때문입니다.</p>

  <p>이 다이어그램은 동작이 시작된 후에
 이동 및 종료 이벤트를 문서에 추가할 때 터치 이벤트가 무엇을 수행 중인지 보여줍니다.</p>
</div>

![`touchstart`로 터치 이벤트를 문서에 바인딩하는
 그림](images/scroll-bottleneck.gif)

<div class="clearfix"></div>

### 효율적으로 터치에 반응

이제 우리는 시작 및 종료 이벤트를 처리했으므로
 실제로 터치 이벤트에 반응할 수 있습니다.

모든 시작 및 이동 이벤트에 대해 여러분은 `x` 및 `y`를
이벤트로부터 쉽게 추출할 수 있습니다.

다음 예시에서는 이벤트가 `TouchEvent`로부터 오는지 여부를
 확인하기 위해 `targetTouches`의 존재 여부를 확인합니다. 존재하는 경우에는 최초 터치로부터
`clientX` 및 `clientY`를 추출합니다.
이벤트가 `PointerEvent` 또는 `MouseEvent`인 경우에는 `clientX` 및
`clientY`를 이벤트 자체로부터 직접 추출합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

`TouchEvent`에는 터치 데이터가 포함된 세 개의 목록이 있습니다.

* `touches`: 화면의 모든 현재 터치 목록(터치가 어떤
DOM 요소에 있는지는 상관없음).
* `targetTouches`: 이벤트가 바인딩된 DOM 요소에
있는 현재 터치 목록.
* `changedTouches`: 변경될 경우 이벤트를 발생시키는
 터치 목록.

대부분의 경우 `targetTouches`만 필요합니다. (이들 목록에
 대한 자세한 내용은 [터치 목록](#touch-lists)을 참조하세요).

#### requestAnimationFrame 사용

이벤트 콜백은 메인 스레드에서 발생하므로
우리는 이벤트 콜백에서 코드를 최대한 적게 사용하려고 합니다.
그래야만 프레임 속도를 높게 유지하고 버벅거림 현상을 없앨 수 있습니다.

`requestAnimationFrame()`을 사용하면 브라우저가 프레임을
 그리기 직전에 UI를 업데이트할 수 있는 기회가 있으며,
 수행할 이벤트 콜백의 작업을 줄일 수 있습니다.

`requestAnimationFrame()`에 친숙하지 않은 분은
 [여기에서 자세한 내용을 알아보세요](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes).

일반적인 구현에서는
시작 및 이동 이벤트로부터 `x` 및 `y` 좌표를 저장하고
 이동 이벤트 콜백 내에서 애니메이션 프레임을 요청합니다.

우리의 데모에서는 초기 터치 위치를 `handleGestureStart()`에 저장합니다(`initialTouchPos` 검색).

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

`handleGestureMove()` 메서드는
애니메이션 프레임을 요청하기 전에 이벤트의 위치를 저장하고,
`onAnimFrame()` 함수를 콜백으로 전달합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

`onAnimFrame` 값은 호출 시 UI를 이동하도록 변경하는
 함수입니다. 이 함수를 `requestAnimationFrame()`에 전달하면,
페이지를 업데이트하기 직전에(즉, 페이지의 변경사항을 그리기 직전에)
이 함수를 호출하도록 브라우저에 알립니다.

`handleGestureMove()` 콜백에서 먼저 `rafPending`이 false인지
확인합니다. 이는 마지막 이동 이벤트 이후에 `onAnimFrame()`이 `requestAnimationFrame()`에 의해
호출되었음을 나타냅니다. 즉, 실행을 기다리는 `requestAnimationFrame()`은
어느 시점에서든 하나밖에 없습니다.

`onAnimFrame()` 콜백이 실행될 때, `rafPending`을 `false`로 업데이트하기에 앞서
이동하려는 모든 요소에 대해 변환을 설정합니다. 이렇게 하면 그 다음 터치 이벤트가
새 애니메이션 프레임을 요청할 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### 터치 액션을 사용하여 동작 제어

CSS 속성 `touch-action`을 사용하여 요소의 기본 터치 동작을
 제어할 수 있습니다. 이 예시에서는 사용자 터치 시에
브라우저가 아무것도 수행하지 못하도록 `touch-action: none`을 사용합니다.
이렇게 하면 모든 터치 이벤트를 가로챌 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

`touch-action: none`은 모든 기본 브라우저 동작을 차단하므로
다소 위험한 옵션입니다. 상당수 경우 아래 옵션 중 하나가
 더 나은 해결책입니다.

`touch-action`을 사용하면 브라우저에 의해 구현된 동작을 비활성화할 수 있습니다.
예를 들어, IE10 이상에서는 동작 확대/축소를 위해 두 번 탭을 지원합니다. `manipulation`의 touch-action을
 설정하여 기본 두 번 탭
동작을 차단할 수 있으며,

여러분이 두 번 탭 동작을 직접 구현할 수 있습니다.

다음은 흔히 사용되는 touch-action 값의 목록입니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">터치 동작 매개변수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">터치 상호작용이 브라우저에 의해
  처리되지 않습니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">`touch-action: none`과 같은
  모든 브라우저 상호작용을 비활성화합니다. `pinch-zoom`은 여전히
  브라우저에 의해 처리됩니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">세로 스크롤이나 핀치 줌을 비활성화하지 않고도
  가로 스크롤을 자바스크립트에서 처리합니다(예: 이미지 캐러셀).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">두 번 탭 동작을 비활성화합니다.
  이 경우 브라우저에 의한 클릭 지연이 방지됩니다. 스크롤과 핀치 줌을
  브라우저에게 맡깁니다.</td>
    </tr>
  </tbody>
</table>

## 이전 버전의 IE 지원

IE10을 지원하려면 공급업체 접두사가 붙은 `PointerEvents` 버전을
 처리해야 합니다.


`PointerEvents` 지원 여부를 확인하려면 일반적으로
`window.PointerEvent`를 찾지만 IE10에서는
`window.navigator.msPointerEnabled`를 찾아야 합니다.

공급업체 접두사가 붙은 이벤트 이름은 'MSPointerDown', 'MSPointerUp' 및
'MSPointerMove'입니다.

아래 예시에서는 지원 여부를 확인하고 이벤트 이름을
 전환하는 방법을 보여줍니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

자세한 내용은 [Microsoft의
 업데이트 문서](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx)를 확인하세요.

## 참조

### 터치 상태를 나타내는 의사 클래스

<table>
  <thead>
    <tr>
      <th>클래스</th>
      <th>예시</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="누른 상태의 버튼" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        커서로 요소를 가리킬 때 이 상태로 진입합니다.
        마우스로 가리킬 때 UI가 변경된다면
      사용자가 요소와 상호작용하는 데 도움이 됩니다.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="포커스 상태의 버튼" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        사용자가 페이지의 요소를 탭할 때 이 상태로 진입합니다. 포커스 상태에서는
      사용자가 현재 상호작용 중인 요소를 알 수 있으며,
      또한 사용자가 키보드를 사용하여 쉽게 UI를 탐색할 수 있습니다.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="누른 상태의 버튼" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        요소가 선택 중일 때 이 상태로 진입합니다(예:
         사용자가 요소를 클릭하거나 터치하는 경우).
      </td>
    </tr>
  </tbody>
</table>


터치 이벤트에 대한 자세한 내용은
[w3 터치 이벤트](http://www.w3.org/TR/touch-events/)를 참조하세요.

### 터치, 마우스 및 포인터 이벤트

이들 이벤트는 새 동작을 애플리케이션에 추가하기 위한
 기본 요소입니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">터치, 마우스, 포인터 이벤트</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        이 이벤트는 손가락으로 요소를 처음 터치하거나 사용자가 마우스를
        클릭했을 때 호출됩니다.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        이 이벤트는 사용자가 화면에서 손가락을 움직이거나
        마우스로 드래그할 때 호출됩니다.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
       이 이벤트는 사용자가 화면에서 손가락을 떼거나
        마우스를 놓을 때 호출됩니다.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
         이 이벤트는 브라우저가 터치 동작을 취소할 때 호출됩니다. 예를 들어,
        사용자가 웹 앱을 터치하고 탭을 변경합니다.
      </td>
    </tr>
  </tbody>
</table>

### 터치 목록

각 터치 이벤트에는 세 개의 목록 속성이 포함됩니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">터치 이벤트 속성</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        화면의 모든 현재 터치 목록(어떤 요소가 터치 중인지는
        상관없음).
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        현재 이벤트의 대상인 요소에서
        시작된 터치 목록. 예를 들어,  <code>&lt;button&gt;</code>에 바인딩한 경우에는
        버튼에 있는 현재 터치만 나타납니다. 문서에 바인딩한 경우에는
        문서의 모든 현재 터치가 나타납니다.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        변경될 경우 이벤트를 발생시키는 터치 목록:
        <ul>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>
            이벤트의 경우 -- 현재 이벤트에서 활성화된 터치 지점의
            목록.
          </li>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>
            이벤트의 경우 -- 마지막 이벤트 이후로 이동된 터치 지점의
            목록.
          </li>
          <li>
            <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            및 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
            이벤트의 경우 -- 표면에서 제거된 터치 지점의
            목록.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### iOS에서 활성 상태 지원 활성화

불행히도, iOS의 Safari에서는 `touchstart` 이벤트 리스너를
*문서 본문*이나 각 요소에 추가하는 데 필요한 *활성* 상태를
기본적으로 적용하지 않습니다.

iOS 기기에서만 실행되도록 하기 위해서는 이 작업을 사용자 에이전트 테스트 후에 수행해야 합니다.

touchstart를 본문에 추가하면 DOM의 모든 요소에 적용되는 이점이
 있습니다. 그러나 이 경우 페이지를 스크롤할 때 성능 문제가 발생할 수도 있습니다.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


그 대안은, 페이지에서 상호작용이 가능한 모든 요소에
 touchstart 리스너를 추가하는 것입니다. 그러면 성능 문제가 다소 완화됩니다.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
