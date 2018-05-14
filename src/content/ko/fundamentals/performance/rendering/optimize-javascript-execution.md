project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 자바스크립트는 종종 시각적 변화를 유발합니다. 어떤 경우에는 스타일 조작을 통해 직접 구현되거나, 어떤 경우에는 데이터 검색 또는 정렬과 같은 시각적 변화를 일으키는 계산을 통해 구현됩니다. 타이밍이 나쁘거나 실행 시간이 긴 자바스크립트는 성능 문제의 일반적인 원인입니다. 가급적 이러한 영향을 최소화할 수 있는 방법을 찾아야 합니다.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# 자바스크립트 실행 최적화 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

자바스크립트는 종종 시각적 변화를 유발합니다. 어떤 경우에는
스타일 조작을 통해 직접 구현되거나, 어떤 경우에는 데이터 검색 또는 정렬과 같은
시각적 변화를 일으키는 계산을 통해 구현됩니다. 타이밍이 나쁘거나 실행 시간이 긴
자바스크립트는 성능 문제의 일반적인 원인입니다.
가급적 이러한 영향을 최소화할 수 있는 방법을 찾아야 합니다.

작성하는 자바스크립트가 실제로 실행되는 코드가 아닐 수도 있기 때문에 자바스크립트 성능 프로파일링은 약간 복잡할 수 있습니다. 최신 브라우저는 가급적 가장 빠른 실행 성능을 제공하기 위해 JIT 컴파일러 및 모든 최적화 방법과 기술을 사용하며, 이로 인해 코드의 동적인 기능이 변경됩니다.

참고: 실행 중인 JIT를 보려면 Vyacheslav Egorov가 만든 <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup></a>를 참조하세요. 이는 Chrome의 자바스크립트 엔진 V8이 자바스크립트 코드를 최적화 중일 때 코드의 중간 상태를 보여줍니다.

하지만 이와 더불어 앱이 자바스크립트를 제대로 실행하도록 명확히 수행할 수 있는 일부 기능들이 있습니다.

### TL;DR {: .hide-from-toc }

* 시각적 업데이트에 setTimeout 또는 setInterval을 피하고 대신 항상 requestAnimationFrame을 사용합니다.
* 메인 스레드를 벗어나 오래 실행되는 자바스크립트를 Web Workers로 이전합니다.
* 마이크로 작업을 사용하여 여러 프레임에서 DOM을 변경합니다.
* Chrome DevTools의 Timeline 및 자바스크립트 프로파일러를 사용하여 자바스크립트의 영향을 평가합니다.

## 시각적 변화에 `requestAnimationFrame` 사용

화면에서 시각적 변화가 발생하고 있을 때 개발자는 브라우저에서 정확한 시간(프레임 시작 시)에 작업을 수행하길 원합니다. 자바스크립트가 프레임 시작 시 실행되도록 보장하는 유일한 방법은 `requestAnimationFrame`을 사용하는 것입니다.


    /**
     * If run as a requestAnimationFrame callback, this
     * will be run at the start of the frame.
     */
    function updateScreen(time) {
      // Make visual updates here.
    }

    requestAnimationFrame(updateScreen);


프레임워크 또는 샘플에서 `setTimeout` 또는 `setInterval`을 사용하여 애니메이션과 같은 시각적 변화를 수행할 수도 있지만, 이 경우 문제는 콜백이 프레임에서 _특정 시점_(종료 시)에 실행되고, 종종 프레임이 누락되어 버벅거림 현상이 발생할 수 있다는 점입니다.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="브라우저에서 프레임 누락을 일으키는 setTimeout">

실제로 jQuery의 기본 `animate` 동작은 현재 `setTimeout`을 사용하는 것입니다! [이를 패치하여 `requestAnimationFrame`을 사용](https://github.com/gnarf/jquery-requestAnimationFrame)할 수 있는데, 이 방법을 강력히 권장합니다.

## 복잡성 감소 또는 Web Workers 사용

자바스크립트는 브라우저의 메인 스레드에서 스타일 계산, 레이아웃 및 페인트(대부분의 경우에 실행됨)와 함께 실행됩니다. 자바스크립트가 장시간 실행되면 다른 작업을 차단하여 프레임이 누락될 가능성이 있습니다.

자바스크립트를 언제 얼마나 오래 실행할지 전략을 수립해야 합니다. 예를 들어, 스크롤과 같은 애니메이션의 경우, 이상적으로 **3-4ms**의 영역에서 자바스크립트를 유지해야 합니다. 이보다 길면 너무 많은 시간이 걸릴 위험이 있습니다. 유휴 상태에서는 소요 시간에 대한 걱정을 덜 수 있습니다.

예를 들어 DOM 액세스가 필요하지 않은 경우 등 많은 경우에 순수한 계산 작업을 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage)로 이전할 수 있습니다. 정렬 또는 검색과 같은 데이터 조작 또는 순회(traversal)는 대개 이 모델에 적합하며 로드 및 모델 생성도 마찬가지입니다.


    var dataSortWorker = new Worker("sort-worker.js");
    dataSortWorker.postMesssage(dataToSort);

    // The main thread is now free to continue working on other things...

    dataSortWorker.addEventListener('message', function(evt) {
       var sortedData = evt.data;
       // Update data on screen...
    });



일부 작업은 이 모델에 적합하지 않을 수 있습니다. Web Workers는 DOM 액세스 권한이 없습니다. 작업이 메인 스레드에 있어야 하는 경우, 큰 작업을 각각 몇 밀리초 이하의 마이크로 작업으로 세분화하고, 각 프레임에서 `requestAnimationFrame` 핸들러 내부에서 실행하는 일괄 처리 방식을 고려해 보세요.


    var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
    requestAnimationFrame(processTaskList);

    function processTaskList(taskStartTime) {
      var taskFinishTime;

      do {
        // Assume the next task is pushed onto a stack.
        var nextTask = taskList.pop();

        // Process nextTask.
        processTask(nextTask);

        // Go again if there’s enough time to do the next task.
        taskFinishTime = window.performance.now();
      } while (taskFinishTime - taskStartTime < 3);

      if (taskList.length > 0)
        requestAnimationFrame(processTaskList);

    }


이 접근방식은 UX 및 UI가 중요하며, [진행률 또는 작업 표시기를 사용](https://www.google.com/design/spec/components/progress-activity.html)하여 작업이 처리 중임을 사용자가 알 수 있도록 해야 합니다. 어떤 경우이든 이 접근방식은 앱의 메인 스레드를 사용 가능한 상태로 유지하여 사용자 상호작용에 계속 반응할 수 있도록 합니다.

## 자바스크립트의 '프레임 비용' 살펴보기

프레임워크, 라이브러리 또는 고유 코드 평가 시 프레임별 자바스크립트 코드의 실행 비용을 평가하는 것이 중요합니다. 이는 전환 또는 스크롤처럼 성능이 중요한 애니메이션 작업 수행 시 특히 중요합니다.

자바스크립트의 비용 및 성능 프로필을 측정하는 가장 좋은 방법은 Chrome DevTools를 사용하는 것입니다. 일반적으로 다음과 같은 낮은 수준의 세부정보 레코드를 얻을 수 있습니다.

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="낮은 수준의 JS 실행 세부정보를 제공하는 Chrome DevTools의 Timeline">

오래 실행되는 자바스크립트를 발견하면 DevTools 사용자 인터페이스의 상단에 있는 자바스크립트 프로파일러를 활성화할 수 있습니다.

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="DevTools에서 JS 프로파일러 활성화">

이 방법으로 자바스크립트를 프로파일링하는 데 따르는 오버헤드가 있으므로 자바스크립트 런타임 특성을 더 세부적으로 파악하려는 경우에만 활성화하세요. 이제 확인란이 활성화된 상태에서 동일한 작업을 수행하고 자바스크립트에서 호출된 함수에 대해 휠씬 더 많은 정보를 얻을 수 있습니다.

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="높은 수준의 JS 실행 세부정보를 제공하는 Chrome DevTools의 Timeline">

이 정보를 사용하여 자바스크립트가 애플리케이션에 미치는 성능 영향을 평가하고, 함수 실행에 너무 오랜 시간이 걸리는 핫스팟을 찾아 수정하기 시작할 수 있습니다. 이전에 언급한 것처럼 오래 실행되는 자바스크립트를 찾아 제거하거나, Web Workers로 이전하여(자바스크립트를 제거할 수 없는 경우) 메인 스레드의 여유 공간을 확보하여 다른 작업을 계속 수행할 수 있도록 해야 합니다.

## 자바스크립트 미세 최적화 피하기

요청과 요소의 `offsetTop`이 `getBoundingClientRect()` 계산보다 빠른 것처럼 브라우저가 하나를 다른 것보다 100배 빨리 실행할 수 있지만 실제로 함수 호출 시 프레임당 시간은 거의 항상 짧기 때문에 자바스크립트의 성능 측면에 중점을 두는 것은 일반적으로 노력의 낭비입니다. 일반적으로 절약되는 시간은 밀리초의 일부에 불과합니다.

게임이나 컴퓨팅 비용이 비싼 애플리케이션을 만드는 경우는 예외입니다. 일반적으로 많은 계산이 단일 프레임에 적용되고 이 경우 모든 것이 도움이 되기 때문입니다.

간단히 말해서, 미세 최적화(micro-optimization)는 일반적으로 빌드 중인 애플리케이션 유형에 매핑되지 않기 때문에 매우 신중해야 합니다.


{# wf_devsite_translation #}
