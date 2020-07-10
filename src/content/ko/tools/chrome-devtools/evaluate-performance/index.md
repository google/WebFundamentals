project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Chrome 개발자 도구에서 런타임 성능을 평가하는 방법

{# wf_updated_on: 2020-07-10 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# 시작해요, 런타임 성능 분석 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

**참고**: 페이지를 빨리 로드하는 방법을 알고 싶으면 [ 웹사이트 속도 최적화](/web/tools/chrome-devtools/speed/get-started)를 보세요.

런타임 성능은 로드할 때와 달리 페이지가 실행될 때의 성능을 말합니다. 이 튜토리얼에서는 어떻게 Chrome 개발자 도구의 Performance 패널을 사용해서 런타임 성능을 분석할 수 있는지 알려줍니다. [RAIL](/web/fundamentals/performance/rail) 모델의 관점에서, 이 튜토리얼에서 여러분이 배울 기술은 페이지의 응답(Response), 애니메이션(Animation) 및 유휴(Idle) 단계를 분석하는데 유용합니다.

주의: 이 튜토리얼은 Chrome 59를 기반으로 합니다. 다른 버전의 Chrome을 사용하는 경우 개발자 도구의 UI와 기능이 다를 수 있습니다. 실행중인 Chrome 버전을 확인하려면 `chrome://help` 를 확인하세요.

{% framebox width="auto" height="auto" enable_widgets="true" %}

<script>
var response1 = "That's OK! This tutorial covers how the Performance panel works in depth. You " +
    "should have no problem following along.";
var response2 = "The Performance panel is pretty complicated. You may still learn some new stuff!";
var feedback = {
  "category": "DevTools",
  "question": "Let's get started! How much do you use the Performance panel?",
  "choices": [
    {
      "button": {
        "text": "Never used it"
      },
      "response": response1,
      "analytics": {
        "label": "Runtime Tutorial / Experience / None"
      }
    },
    {
      "button": {
        "text": "Sometimes"
      },
      "response": response1,
      "analytics": {
        "label": "Runtime Tutorial / Experience / Some"
      }
    },
    {
      "button": {
        "text": "All the time"
      },
      "response": response2,
      "analytics": {
        "label": "Runtime Tutorial / Experience / A Lot"
      }
    }
  ]
};
</script>

{% include "web/_shared/multichoice.html" %} {% endframebox %}

## 시작하기 {: #open }

이 튜토리얼에서 여러분은 라이브 페이지에서 개발자 도구를 열고 페이지의 성능 병목 현상을 찾기 위해서 Performance 패널을 사용합니다.

1. Google Chrome을 [시크릿 모드](https://support.google.com/chrome/answer/95464)로 실행합니다. 시크릿 모드는 Chrome이 깨끗한 상태에서 실행됨을 보장합니다. 만약 여러 익스텐션이 설치되어 있다면 이런 것들은 성능 측정에 영향을 줄 수도 있습니다.

1. 주소창에 다음 주소를 입력하세요. 이번에 사용할 데모 페이지입니다. 작은 파란 사각형이 위아래로 움직이고 있습니다.

    `https://googlechrome.github.io/devtools-samples/jank/`

2. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) 또는 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) 를 눌러서 개발자 도구를 열어봅시다.

      <figure>
        <img src="imgs/get-started.png" alt="The demo on the left, and DevTools on the right">
        <figcaption>       <b>Figure 1</b>. 왼쪽은 데모, 오른쪽은 개발자 도구 화면입니다.</figcaption>
      </figure>


      <aside class="note">     **참고**: 스크린샷 개발자 도구는 [별도의 창에 분리 표시]되어(/web/tools/chrome-devtools/ui#placement) 콘텐츠를 명확하게 확인할 수 있습니다.</aside>
    

### 모바일 CPU 시뮬레이션하기

모바일 기기는 데스크탑이나 랩탑보다 성능이 나쁜 경우가 많습니다. CPU 조절(Throttling)을 사용하면 모바일 기기의 성능을 시뮬레이션 해볼 수 있습니다.

1. 개발자 도구에서 **Performance** 탭을 클릭합니다.

2. **Screenshots** 체크박스가 선택되도록 합니다.

3. **Capture Settings** ![Capture Settings](imgs/capture-settings.png){:.devtools-inline} 를 클릭합니다. 개발자 도구에서 성능 지표 관련된 설정이 나타납니다.

1. **CPU**에서 **2x slowdown**을 선택합니다. 평소보다 두 배 느리게 샐행되도록 CPU 성능이 저하됩니다.

      <figure>
        <img src="imgs/throttling.svg" alt="CPU throttling">
        <figcaption>       <b>Figure 2</b>. CPU 스로틀 (파란색 테두리 표시)</figcaption>
      </figure>


      <aside class="note">     **참고**: 다른 페이지를 테스트하기 위해 사양이 낮은 모바일 기기에서 테스트하는 경우 CPU 스로틀을 **20x slowdown**으로 설정합니다. 이 데모는 20x slowdown에서 정상적으로 작동하지 않으며, 학습 목적으로 2x slowdown에서 확인할 수 있습니다.</aside>
    

### 데모 설정하기

이 웹 사이트의 모든 독자에게 일관되게 작동하는 런타임 성능 데모를 만드는 것은 어렵습니다. 이 섹션에서는 데모를 사용자 정의하여 특정 설정에 관계 없이 튜토리얼에서 볼 수 있는 스크린샷과 설명이 사용자 경험과 상대적으로 일치하도록 합니다.

1. 파란 사각형들이 눈에 띄게 느려질 때까지 **Add 10** 을 클릭해주세요. 고사양 기기에서는 20번 정도 클릭하면 됩니다.

2. **Optimize**를 누르면 파란 사각형들은 더 빠르고 부드럽게 움직이게 됩니다.

      <aside class="note">     **참고**: 최적화 및 비 최적화 버전에서 시각적인 차이가 없는 경우 **Subtract 10**를 몇 회 클릭하여 다시 시도합니다. 파란 사각형을 너무 많이 추가하는 경우 CPU를 최대로 사용하여 2개의 버전에서 중요한 차이점을 확인할 수 없을 것입니다.</aside>
    

3. **Optimize**를 누르면 파란 사각형들은 더 빠르고 부드럽게 움직이게 됩니다.

### 런타임 성능 기록하기 {: #record }

최적화된 버전으로 페이지를 실행시키면, 파란 사각형들은 더 빨리 움직입니다. 왜 그럴까요?  두 버전 모두 같은 시간에 같은 거리를 이동해야 합니다. Performance 패널의 기록하기를 통해서 최적화되지 않은 버전의 성능 병목을 일으키는 부분을 찾아봅시다.

1. 개발자 도구에서 **Record** ![Record](imgs/record.png){:.devtools-inline}. 를 클릭합니다. 개발자 도구는 페이지가 실행될 때 성능지표를 수집합니다.

      <figure>
        <img src="imgs/profiling.png" alt="Profiling the page">
        <figcaption>       **Figure 3**: 페이지 프로파일링</figcaption>
      </figure>
    

2. 2초간 기다립니다.

3. **Stop**을 클릭합니다. 개발자 도구는 기록을 멈추고 수집된 데이타를 처리해서 그 결과를 Performance 패널에 보여줍니다.

      <figure>
        <img src="imgs/results.png" alt="The results of the profile">
        <figcaption>       **Figure 4**: 프로파일 결과</figcaption>
      </figure>
    

와! 엄청난 양의 데이터입니다. 걱정하지 마세요. 곧 그 의미를 알게 될 거에요.

## 결과 분석하기 {: #analyze }

페이지 성능을 기록한 후에는 페이지 성능이 얼마나 떨어지는지 측정 하고 원인을 찾을 수 있습니다.

### 초당 프레임 수 분석하기

애니메이션 성능 분석의 기본 지표는 초당 프레임수(FPS)입니다. 사용자들은 애니메이션이 60 FPS로 동작할 때 만족합니다.

1. **FPS** 차트를 봅시다. **FPS** 위 빨간 막대가 보인다면, 프레임 레이트가 너무 낮아서 사용자 경험을 해치고 있음을 알 수 있습니다. 보통 아래의 녹색 막대가 높을 수록 높은 FPS를 의미합니다.

      <figure>
        <img src="imgs/fps-chart.svg" alt="The FPS chart">
        <figcaption>       **Figure 5**: FPS 차트(파란색 테두리 표시)</figcaption>
      </figure>
    

2.  **FPS** 차트 아래 **CPU** 차트가 있습니다. **CPU**차트 안의 색상들은 Performance 패널 아래 **Summary** 탭 안의 색상들에 대응됩니다. **CPU** 차트가 색상으로 가득하다는 것은 기록하는 동안에 CPU를 최대로 사용했다는 것입니다. 오랜 기간 CPU가 최대로 사용되고 있는 것이 보인다면, 더 적게 CPU를 사용할 방법을 찾아야 한다는 신호입니다.

      <figure>
        <img src="imgs/cpu-summary.svg" alt="The CPU chart and Summary tab">
        <figcaption>       **Figure 6**: CPU 차트 및 Summary 탭(파란색 테두리 표시)</figcaption>
      </figure>
    

3. **FPS**, **CPU**, 또는 **NET** 차트 위에 마우스 커서를 올려보세요. 개발자 도구는 그 시점에서의 화면 스크린샷을 보여 줍니다. 마우스 커서를 좌우로 옮기면서 기록한 내용을 확인할 수 있습니다. 이것을 scrubbing(문지르기)라고 하며 수동으로 애니메이션의 진행을 확인하는데 유용합니다.

      <figure>
        <img src="imgs/screenshot.png" alt="Viewing a screenshot">
        <figcaption>       **Figure 7**: 2000ms 표시 근처에서 기록된 스크린샷</figcaption>
      </figure>
    

4. **Frames** 섹션에서, 녹색 사각형 위로 마우스 커서를 올려보세요. 개발자 도구는 특정 프레임에서 FPS를 보여줍니다. 각 프레임은 아마 목표치인 60FPS보다 낮을 겁니다.

      <figure>
        <img src="imgs/frame.png" alt="Hovering over a frame">
        <figcaption>       **Figure 8**: 마우스를 프레임 위로 이동</figcaption>
      </figure>
    

물론, 이 데모를 보면 잘 작동하지 않고 있다는 것은 확실합니다. 하지만 실제의 경우, 명확하지 않아서 이 도구들을 모두 사용해서 측정하는 것이 편리합니다.

#### 보너스 : FPS Meter를 열어보세요.

또 다른 편리한 툴은 페이지 실행될 때 FPS에 대한 실시간 예측을 제공하는 FPS Meter입니다.

1. <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) 또는 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux) 를 눌러서 Command Menu를 여세요.

2. Command Menu 에 `Rendering`이라고 입력한 후 **Show Rendering**을 선택하세요.

3. **Rendering** 탭에서 **FPS Meter**를 활성화 하세요. 새로운 오버레이가 뷰포트 우상단에 보입니다.

      <figure>
        <img src="imgs/fps-meter.png" alt="The FPS meter">
        <figcaption>       **Figure 9**: FPS Meter</figcaption>
      </figure>
    

4. **FPS Meter**를 비활성화한 후 <kbd>Esc</kbd> 키를 눌러 **Rendering** 탭을 닫으세요. 이 튜토리얼에선 사용되지 않습니다.

### 병목 지점 찾기

이제 애니메이션이 잘 작동하지 않다는 것이 측정을 통해 입증되었습니다. 다음 답해야 할 질문은 왜 그렇지? 입니다.

1.  **Summary** 탭을 참고하세요. 이벤트가 선택되지 않은 상태에서, 이 탭은 활동의 분류를 보여줍니다. 데모 페이지는 대부분의 시간을 렌더링에 사용했습니다. 성능이란 적게 일하는 것의 예술이기에, 여러분은 렌더링에 사용되는 일을 줄이는 것을 목표로 해야 합니다.

      <figure>
        <img src="imgs/summary.svg" alt="The Summary tab">
        <figcaption>       **Figure 10**: Summary 탭(파란색 테두리 표시)</figcaption>
      </figure>
    

2. **Main** 섹션을 확장해 봅시다. 개발자 도구는 시간에 따른 메인 쓰레드에서의 활동에 대한 flame(불꽃)차트를 보여줍니다. x축은 시간에 따른 기록입니다. 각각의 막대는 이벤트를 나타냅니다. 폭이 넓을 수록 오래 걸린 이벤트입니다. y축은 콜 스택을 의미합니다. 차곡차곡 위에서 부터 쌓인 이벤트가 쌓여 있다는 것으 위쪽의 이벤트가 아래쪽의 이벤트를 발생시켰다는 의미입니다.

      <figure>
        <img src="imgs/main.svg" alt="The Main section">
        <figcaption>       **Figure 11**: Main 섹션(파란색 테두리 표시)</figcaption>
      </figure>
    

3. 기록된 데이타가 많이 있습니다. **FPS**, **CPU**, 그리고 **NET** 차트를 포함하고 있는 섹션인 **Overview** 위에서 마우스를 클릭하고 누른 상태로 드래그하여 **Animation Frame Fired** 이벤트로 확대 해보세요. **Main** 섹션과 **Summary** 탭은 선택된 부분에 대한 정보만 보여주게 됩니다.

      <figure>
        <img src="imgs/zoomed.png" alt="Zoomed in on a single Animation Frame Fired event">
        <figcaption>       **Figure 12**: 단일 Animation Frame Fired 이벤트 확대 표시</figcaption>
      </figure>


      <aside class="note">     **참고**: 확대 표시를 위한 다른 방법은 백그라운드를 클릭하거나 이벤트를 선택하여 **Main** 섹션에 초점을 맞춘 후, <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> 키를 누릅니다.</aside>
    

4. **Animation Frame Fired** 이벤트 오른쪽 위의 빨간 삼각형에 주의하세요. 빨간 삼각형이 있다는 것은 이 이벤트와 관련해서 문제가 있다는 경고입니다

      <aside class="note">     **Note**: [`requestAnimationFrame()`][raf] 콜백이 실행되면 **Animation Frame Fired** 이벤트가 발생합니다.</aside>
    

1. **Animation Frame Fired** 이벤트를 클릭하세요. **Summary** 탭은 이벤트와 관련된 정보를 보여줍니다. **reveal** 링크를 봐 주세요. 링크를 클릭하면 개발자 도구는 **Animation Frame Fired** 이벤트를 발생시킨 이벤트를 하이라이트합니다. 또 **app.js:94** 링크도 봐 주세요. 이 링크를 클릭하면 소스 코드에서 관련된 라인으로 이동하게 됩니다.

      <figure>
        <img src="imgs/animation-frame-fired.png" alt="More information about the Animation Frame Fired event">
        <figcaption>       **Figure 13**: Animation Frame Fired 이벤트에 대한 상세 정보</figcaption>
      </figure>


      <aside class="note">     **참고**: 이벤트를 선택한 후, 화살표 키를 사용하여 옆에 있는 이벤트를 선택합니다.</aside>
    

2. **app.update** 이벤트 아래에 여러개의 보라색 이벤트가 있습니다. 만약 폭을 넓혀보면, 각각 빨간 삼각형을 가지고 있다는 것을 알 수 있습니다. 보라색 **Layout** 이벤트 중 하나를 클릭하세요. 개발자 도구는 **Summary** 탭에서 추가 정보를 보여줍니다. 실제로 강제 리플로우(forced reflows)(다른 말로 하면 레이아웃) 관련된 경고가 있습니다.

3. **Summary** 탭에서 **Layout Forced** 아래 **app.js:70** 링크를 클릭하세요. 개발자 도구에서 강제 레이아웃을 발생시키는 코드로 이동시킵니다.

      <figure>
        <img src="imgs/forced-layout-src.png" alt="The line of code that caused the forced layout">
        <figcaption>       **Figure 13**: Forced layout을 실행하는 코드</figcaption>
      </figure>


      <aside class="note">     **참고**: 이 코드의 문제점은 각 animation 프,레임에서 사각형의 스타일을 변경하고 페이지의 사각형의 위치를 쿼리합니다. 스타일이 변경되면 브라우저에서 사각형 위치의 변경을 인지하지 못하며, 각 사각형의 위치를 계산하기 위해 강제로 layout을 재조정합니다. 자세한 내용은 [Avoid forced     synchronous layouts][avoid]를 참조해 주십시오.</aside>
    

해야 할 것이 많았습니다. 하지만 이제 런타임 성능 분석을 위한 기본 작업흐름의 기초를 단단히 쌓게 됐습니다. 수고 많았어요.

### 보너스 : 최적화된 버전 분석하기

지금 배운 작업 흐름과 도구를 활용해서 **Optimize** 버튼을 눌러 최적화된 코드를 활성화시키고 성능을 기록해 보세요. 향상된 프레임 속도부터 **Main** 섹션의 이벤트 감소까지 최적화된 버전이 적게 일하고 더 나은 성능을 보여주는 것을 확인할 수 있습니다.

**참고**: 최적화 버전조차 그리 훌륭하진 않습니다. 왜냐하면 여전히 각 사각형의 `top` 속성을 조작하기 때문이죠. 좀 더 나은 시도는 오직 compositing(합성)에만 영향을 주는 속성을 쓰는 것이죠. [애니메이션의 변형 및 불투명도 변경 사용](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count#use_transform_and_opacity_changes_for_animations)을 참고하세요.

## 다음 단계

성능의 이해의 기본은 RAIL 모델입니다. 이 모델은 사용자에게 가장 중요한 성능 지표에 대해 알려줍니다. [RAIL 모델로 성능 측정](/web/fundamentals/performance/rail)을 참고하세요.

Performance 패널에 조금 더 익숙해지려면 연습이 필수입니다. 여러분이 페이지를 프로파일링해보고 결과를 분석해 보세요. 만약 결과에 대해 궁금한 부분이 있으면 [Stack Overflow에서 `google-chrome-devtools`로 태깅된 질문](http://stackoverflow.com/questions/ask?tags=google-chrome-devtools)들을 찾아보세요. 가능하면 스크린샷이나 재현 가능한 링크들을 포함해서 질문을 작성해주세요.

정말로 런타임 성능을 마스터하려면, 브라우저가 어떻게 HTML, CSS, 그리고 JS를 화면의 픽셀로 옮기는지 알아야 합니다. 가장 좋은 시작점은 [렌더링 성능](/web/fundamentals/performance/rendering/)입니다. [프레임의 해부학](https://aerotwist.com/blog/the-anatomy-of-a-frame/)은 훨씬 더 자세하게 설명해 줍니다.

마지막으로 런타임 성능을 향상시키는 방법은 많습니다. 이 튜토리얼은 특정한 애니메이션 병목 현상에 대해 Performance 패널을 통해 알아보는데 중점을 두고 있습니다. 하지만 이것은 접할 수 있는많은 병목 현상 중 하나입니다. 나머지 Rendering Performance 시리즈들에서 다양한 측면에서 런타임 성능을 향상 시킬 수 있는 방법을 제공합니다. 다음과 같습니다.

- [자바스크립트 실행 최적화](/web/fundamentals/performance/rendering/optimize-javascript-execution)
- [스타일 계산의 범위와 복잡성 줄이기](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)
- [크고 복잡한 레이아웃 및 레이아웃 스래싱(thrashing) 피하기](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
- [페인트 복잡성 단순화 및 페인트 영역 줄이기](/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)
- [컴포지터(compositor) 전용 속성 고수 및 레이어 수 관리](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)
- [입력 핸들러 디바운스](/web/fundamentals/performance/rendering/debounce-your-input-handlers)

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
