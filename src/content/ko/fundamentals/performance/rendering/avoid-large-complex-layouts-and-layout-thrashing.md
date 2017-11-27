project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 레이아웃은 브라우저가 요소의 기하학적 정보(페이지에서 차지하는 크기 및 위치)를 파악하는 장소입니다. 각 요소는 사용한 CSS, 요소의 콘텐츠 또는 상위 요소에 따라 명시적 또는 암시적 크기 지정 정보를 갖게 됩니다. 이 프로세스는 Chrome에서 레이아웃이라고 합니다.

# 크고 복잡한 레이아웃 및 레이아웃 스래싱 피하기 {: .page-title }

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

레이아웃은 브라우저가 요소의 기하학적 정보(페이지에서 차지하는 
크기 및 위치)를 파악하는 장소입니다. 각 요소는 사용한 CSS, 요소의
콘텐츠 또는 상위 요소에 따라
명시적 또는 암시적 크기 지정 정보를 갖게 됩니다. 이 프로세스는 
Chrome, Opera, Safari 및 Internet Explorer에서 레이아웃이라고 합니다. Firefox에서는
리플로우(reflow)라고 하지만 실제로는 동일한 프로세스입니다.

스타일 계산과 마찬가지로 다음 레이아웃 비용을 고려하세요.

1. 레이아웃이 필요한 요소 수.
2. 해당 레이아웃의 복잡성.

### TL;DR {: .hide-from-toc }

* 레이아웃의 범위는 일반적으로 전체 문서로 지정됩니다.
* DOM 요소 수는 성능에 영향을 주므로 가급적 레이아웃 트리거를 피해야 합니다.
* 레이아웃 모델 성능을 평가합니다. 새 Flexbox는 일반적으로 이전 Flexbox 또는 부동 요소 기반 레이아웃 모델보다 빠릅니다.
* 강제 동기식 레이아웃 및 레이아웃 스래싱(thrashing)을 피하세요. 스타일 값을 읽은 다음 스타일을 변경하세요.

## 가급적 레이아웃 피하기

스타일을 변경하면 브라우저가 변경 시 레이아웃 계산이 필요한지, 해당 렌더링 트리를 업데이트해야 하는지 확인합니다. 너비, 높이, 왼쪽 또는 상단 등과 같은 '기하학적 속성'의 변경은 모두 레이아웃이 필요합니다.


    .box {
      width: 20px;
      height: 20px;
    }

    /**
     * Changing width and height
     * triggers layout.
     */
    .box--expanded {
      width: 200px;
      height: 350px;
    }


**레이아웃의 범위는 거의 항상 전체 문서로 지정됩니다.** 많은 요소가 있는 경우, 모든 요소의 위치와 크기를 파악하는 데 오랜 시간이 걸립니다.

레이아웃을 피할 수 없는 경우 Chrome DevTools를 다시 사용하여 시간이 얼마나 걸리는지 확인하고 레이아웃이 병목 현상의 원인인지 여부를 파악하는 것이 중요합니다. 먼저 DevTools를 열고 Timeline 탭으로 가서 레코드를 누르고 사이트와 상호작용합니다. 레코딩을 중단하면 사이트에서 수행된 분석 정보가 표시됩니다.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" alt="DevTools에서 장시간 레이아웃 표시" />

위 예의 프레임을 분석하면 레이아웃 내부에서 20ms 이상 소요된 것을 확인할 수 있습니다. 이는 애니메이션의 화면에서 프레임에 16ms가 필요한 경우 이에 비해 훨씬 높은 값입니다. 또한 DevTools에서 트리 크기(이 예에서는 1,618 요소) 및 레이아웃에 필요한 노드 수도 확인할 수 있습니다.

참고: 레이아웃, 페인트 또는 합성을 트리거하는 명확한 CSS 속성 목록이 필요한 경우 [CSS 트리거](https://csstriggers.com)를 참조하세요.

## 이전 레이아웃 모델 대신 Flexbox 사용

웹에는 레이아웃 모델의 범위가 있고 일부 모델은 다른 모델보다 널리 지원됩니다. 가장 오래된 CSS 레이아웃 모델은 요소를 상대적으로, 절대적으로 및 부동 요소별로 화면에 배치할 수 있습니다.

아래의 스크린샷은 1,300개의 상자에서 부동 요소를 사용할 경우 레이아웃 비용을 보여줍니다. 대부분의 애플리케이션은 다양한 방법을 사용하여 요소를 배치하기 때문에 이 예는 부자연스러운 점이 있습니다.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" alt="부동 요소를 레이아웃으로 사용" />

더 최근에 웹 플랫폼에 추가된 Flexbox를 사용하도록 샘플을 업데이트하면 다른 결과를 얻게 됩니다.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" alt="Flexbox를 레이아웃으로 사용" />

이제 _동일한 수의 요소_ 에 대해 레이아웃 시간을 훨씬 덜 소모하고(이 경우 14ms에서 3.5ms로 단축) 동일한 시각적 모양을 나타낼 수 있습니다. 일부 경우에 [부동 요소보다 덜 지원](http://caniuse.com/#search=flexbox)되기 때문에 Flexbox를 선택할 수 없지만, 최소한 레이아웃 모델의 성능에 미치는 영향을 조사하고 수행 비용을 최소화할 수 있는 레이아웃 모델을 사용해야 합니다.

어떤 경우이든 Flexbox 선택 여부에 상관없이 애플리케이션에 많은 부담을 주는 경우 **레이아웃 트리거를 완전히 피하려고 노력**해야 합니다!

## 강제 동기식 레이아웃 피하기

화면에 프레임을 추가하는 순서는 다음과 같습니다.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" alt="Flexbox를 레이아웃으로 사용" />

자바스크립트를 실행한 _후_ 스타일 계산을 수행한 _후_ 에 레이아웃을 실행합니다. 하지만 자바스크립트를 사용하여 브라우저가 레이아웃을 더 일찍 수행하도록 하는 것도 가능합니다. 이를 **강제 동기식 레이아웃**이라고 합니다.

자바스크립트가 실행할 때 이전 프레임의 모든 이전 레이아웃 값은 알려져 있고 쿼리에 사용할 수 있습니다. 따라서 예를 들어, 프레임 시작 시 요소('상자'라고 합시다)의 높이를 기록하려면 다음과 같은 코드를 작성할 수 있습니다.


    // Schedule our function to run at the start of the frame.
    requestAnimationFrame(logBoxHeight);

    function logBoxHeight() {
      // Gets the height of the box in pixels and logs it out.
      console.log(box.offsetHeight);
    }


높이를 요청하기 _전에_ 상자의 스타일을 변경한 경우 문제가 발생할 수 있습니다.


    function logBoxHeight() {

      box.classList.add('super-big');

      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);
    }


이제 높이 질문에 답변하기 위해 브라우저는 _먼저_ 스타일 변경을 적용한 _후에_(`super-big` 클래스를 추가했기 때문에), 레이아웃을 실행해야 합니다. 그래야만 정확한 높이를 반환할 수 있습니다. 이는 불필요하고 잠재적으로 비용이 많이 드는 작업입니다.

이 때문에 항상 스타일 읽기를 일괄 처리하고 먼저 수행한 다음(이때 브라우저가 이전 프레임의 레이아웃 값을 사용할 수 있음) 쓰기를 수행해야 합니다.

위의 기능을 정확히 수행하면 다음과 같이 됩니다.


    function logBoxHeight() {
      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);

      box.classList.add('super-big');
    }


대부분의 경우 스타일을 적용한 다음 값을 쿼리할 필요가 없습니다. 마지막 프레임의 값을 사용하면 충분합니다. 브라우저가 원하는 시간보다 일찍 스타일 계산과 레이아웃을 동시에 실행하면 잠재적 병목 현상이 발생할 수 있으므로 일반적으로 바람직하지 않습니다.

## 레이아웃 스래싱 피하기
_많은 레이아웃을 연속적으로 빠르게 실행_ 하면 강제 동기식 레이아웃이 더 악화됩니다. 다음 코드를 살펴봅시다.


    function resizeAllParagraphsToMatchBlockWidth() {

      // Puts the browser into a read-write-read-write cycle.
      for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
      }
    }


이 코드는 단락 그룹을 반복 실행하고 각 단락의 너비를 “box” 요소의 너비와 일치하도록 설정합니다. 무해한 것처럼 보이지만 각 루프 반복이 스타일 값(`box.offsetWidth`)을 읽은 다음 즉시 이 값을 사용하여 단락의 너비(`paragraphs[i].style.width`)를 업데이트하는 문제가 있습니다. 다음 루프 반복에서 브라우저는 (이전 반복에서) `offsetWidth`가 마지막으로 요청된 이후 스타일이 변경되었고 따라서 스타일 변경을 적용하고 레이아웃을 실행해야 한다는 사실을 고려해야 합니다. 이는 _모든 단일 반복_에서 발생합니다!

이 샘플을 수정하려면 값을 다시 _읽은_ 다음 _써야_ 합니다.


    // Read.
    var width = box.offsetWidth;

    function resizeAllParagraphsToMatchBlockWidth() {
      for (var i = 0; i < paragraphs.length; i++) {
        // Now write.
        paragraphs[i].style.width = width + 'px';
      }
    }


안전을 보장하려면 읽기 및 쓰기를 자동으로 일괄 처리하는 [FastDOM](https://github.com/wilsonpage/fastdom)을 확인하고, 실수로 강제 동기식 레이아웃 또는 레이아웃 스래싱을 트리거하지 않도록 해야 합니다.


{# wf_devsite_translation #}
