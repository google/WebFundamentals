project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome과 DevTools를 사용하여 페이지 성능에 영향을 미치는 메모리 문제를 찾아내는 방법을 알아봅니다. 메모리 누수, 메모리 팽창 및 잦은 가비지 수집 등이 대표적입니다.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-04-13 #}

# 메모리 문제 해결 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome과 DevTools를 사용하여 페이지 성능에 영향을 미치는 메모리 문제를 찾아내는 방법을 알아봅니다.
메모리 누수, 메모리 팽창 및 잦은 가비지 수집 등이 대표적입니다.



### TL;DR {: .hide-from-toc }
- 페이지가 현재 얼마나 많은 양의 메모리를 사용하고 있는지 Chrome 작업 관리자를 사용하여 알아볼 수 있습니다.
- 시간의 흐름에 따른 메모리 사용량을 타임라인 기록으로 시각화합니다.
- 분리된 DOM 트리(일반적인 메모리 누수 원인)를 힙 스냅샷으로 식별할 수 있습니다.
- JS 힙에 새 메모리가 할당될 때 할당 타임라인 기록을 사용해 알아낼 수 있습니다.


## 개요

[RAIL][RAIL] 성능 모델의 원칙에 따르면 성능 개선을 위해 노력할 때에는
항상 사용자에게 주안점을 두어야 합니다.

메모리 문제는 사용자가 인지할 수 있는 경우가 많기 때문에
중요합니다. 사용자가 메모리 문제를 인지할 수 있는 방법은 
다음과 같습니다.

* **페이지 성능이 시간이 지나면서 점점 더 악화됩니다.** 이것은 아마도
 메모리 누수의 징후일 가능성이 큽니다. 메모리 누수란 페이지 내에서 버그로 인해 
해당 페이지가 시간이 지날수록 점점 더 많은 메모리를 사용하게 되는 것을 말합니다. 
* **페이지 성능이 일관적으로 불량합니다.** 이것은 아마도 
메모리 팽창의 징후일 가능성이 큽니다. 메모리 팽창이란 페이지가 최적의 페이지 속도를 위해 필요한 것보다 
많은 양의 메모리를 사용하는 것을 말합니다.
* **페이지 성능이 지연되거나 자주 일시적으로 중단되는 것처럼 보입니다.** 이것은 
아마도 잦은 가비지 수집의 징후일 가능성이 큽니다. 가비지 수집이란 
브라우저가 메모리를 회수하는 것을 말합니다. 이 작업이 언제 발생할지는 브라우저가 결정합니다.
  수집 중에는 모든 스크립트 실행이 일시 중지됩니다. 따라서 브라우저가 
가비지 수집을 많이 할수록 스크립트 실행이 일시 중지되는 경우도 많아집니다.

### 메모리 팽창: 얼마나 많아야 '너무 많은' 것일까요?

메모리 누수는 쉽게 정의할 수 있습니다. 사이트가 점점 더 많은 메모리를 사용한다면 
누수가 발생한 것입니다. 하지만 메모리 팽창은 
그렇게 꼭 집어 말하기 조금 어렵습니다. '메모리를 너무 많이 사용한다'고 말하려면 어떤 조건을 충족해야 하는 것일까요?

이런 경우 숫자가 따로 정해져 있는 것도 아닙니다. 
기기와 브라우저에 따라 각기 용량이 다른 경우가 많이 때문입니다. 고급 스마트폰에서는
원활하게 실행되는 페이지가 저사양
스마트폰에서는 다운될 수도 있습니다.

여기에서 중요한 것은 RAIL 모델을 사용하여 사용자에게 주안점을 두는 것입니다. 사용자에게 
인기있는 기기가 무엇인지 파악한 다음, 그러한 
기기에서 페이지를 테스트해 보세요. 페이지 환경이 일관적으로 불량하다면, 해당 페이지는 
그러한 기기의 메모리 용량을 초과하는 것일 수 있습니다.

[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## Chrome 작업 관리자로 메모리 사용량을 실시간 모니터링

Chrome 작업 관리자를 메모리 문제 조사의
출발점으로 삼으세요. 작업 관리자는 페이지가 현재 얼마나 많은 메모리를
사용하고 있는지 알려주는 실시간 모니터입니다.

1. <kbd>Shift</kbd>+<kbd>Esc</kbd>를 누르거나
Chrome 기본 메뉴로 이동한 후 **More tools** > **Task manager**를 선택하여
작업 관리자를 엽니다.

   ![작업
관리자 열기](imgs/task-manager.png)

1. 작업 관리자의 테이블 헤더를 마우스 오른쪽 버튼으로 클릭하고 **JavaScript
memory**를 활성화합니다.

   ![javascript
메모리 활성화](imgs/js-memory.png)

이 두 개의 열을 보면 페이지의 메모리 사용 방식에 대한 여러 가지 사실을 알 수 있습니다.

* **Memory** 열은 네이티브 메모리를 나타냅니다. DOM 노드는 
네이티브 메모리에 저장됩니다. 이 값이 늘어나는 경우 DOM 노드가 생성되고 있는 것입니다.
* **JavaScript Memory** 열은 JS 힙을 나타냅니다. 이 열에는 
두 개의 값이 들어있습니다. 여기서 관심을 가져야 할 값은 바로 활성
 숫자(괄호 안에 있는 숫자)입니다. 활성 숫자는 페이지의 
연결 가능한 객체들이 사용하고 있는 메모리의 양을 나타냅니다. 이 
숫자가 늘어나고 있다면, 새 객체가 생성되고 있는 것이거나 기존 
객체가 성장하고 있는 것입니다.

<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## 타임라인 기록으로 메모리 누수 시각화

Timeline 패널을 조사의 또 다른 출발점으로 사용할 수도 
있습니다. Timeline 패널을 사용하면 시간의 흐름에 따를 페이지의 메모리 사용량을
시각화하는 데 도움이 됩니다.

1. DevTools에서 **Timeline** 패널을 엽니다.
1. **Memory** 확인란을 활성화합니다.
1. [기록을 만듭니다][recording].

팁: 강제 가비지 수집으로 기록을 시작하고 끝내는 것이 
좋습니다. **collect garbage** 버튼
(![강제 가비지 수집 버튼][cg]{:.inline})
을 누른 상태로 강제 가비지 수집을 기록합니다.

타임라인 메모리 기록을 시연해 보려면 아래 코드를 사용하는 방안을 고려해보세요.

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

이 코드에서 참조된 버튼을 누를 때마다
일만 개의 `div` 노드가 문서
본문에 추가되고 백만 개의 `x` 글자로 이루어진 문자열이
`x` 배열로 푸시됩니다. 이 코드를 실행하면 아래의 스크린샷과 같은 타임라인
기록이 생성됩니다.

![단순한 성장의 예시][sg]

우선, 사용자 인터페이스의 설명입니다.
**Overview** 창의 **HEAP** 그래프(**NET** 아래)는 JS
힙을 나타냅니다. **Overview** 창 아래에 **Counter** 창이 있습니다. 여기에서
메모리 사용량을 JS 힙(
**Overview** 창의 **HEAP** 그래프와 동일), 문서, DOM 노드, 리스너 및 GPU 메모리 등의 항목별로 분석한 내용을 확인할 수 있습니다.
확인란을 비활성화하면 해당 내용이 그래프에서 숨겨집니다.

이제 코드를 스크린샷과 비교하여 분석해봅시다.
노드 카운터(녹색 그래프)를 보면 이것이 노드와
깔끔하게 일치한다는 사실을 확인할 수 있습니다. 노드 카운트는 불연속적인 단계에서 
증가합니다. 각 노드 카운트 증가를 
`grow()` 호출로 간주할 수 있습니다. JS 힙 그래프(파란색 그래프)는 이처럼 간단하지 않습니다. 
모범 사례를 따르면, 첫 번째 하강 부분은 사실 **collect garbage**
버튼을 누르면 실행되는 강제 가비지 수집입니다. 
기록이 진행될수록 JS 힙 크기가 갑자기 치솟는 것을 확인할 수 있습니다. 이는 
당연하고 예상할 수 있는 현상입니다. 자바스크립트가 버튼을 누를 때마다 DOM 노드를 
생성하고 수 백만 개의 문자로 구성된 문자열을 생성할 때 대량의 작업을 수행하기 
때문입니다. 여기서 중요한 것은 JS 힙이 처음에 시작했을 때보다 높은 곳에서 
끝난다는 사실입니다(여기서 '시작'은 강제 
가비지 수집 이후 시점). 실제로는 JS 힙 크기 또는 노드 크기가 이렇게 증가하는 패턴이
나타나면 메모리 누수를 의미할 가능성이 있습니다.

[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## 힙 스냅샷으로 분리된 DOM 트리 메모리 누수 발견

DOM 노드를 가비지 수집할 수 있는 경우는 페이지의 DOM 트리 또는 자바스크립트 코드 중 어느쪽에서도 이에 대한
참조가 없을 때뿐입니다. 노드를 
'분리되었다'고 말하는 것은 노드가 DOM 트리에서 제거되었지만 몇몇 자바스크립트에서 여전히 
해당 노드를 참조하는 경우를 의미합니다. 분리된 DOM 노드는 메모리 누수를 초래하는 일반적인 원인입니다. 이
섹션에서는 DevTools의 힙 프로파일러를 사용하여 분리된 
노드를 파악하는 방법을 알려드립니다.

다음은 분리된 DOM 노드를 간단한 예시로 나타낸 것입니다. 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

코드에서 참조된 버튼을 클릭하면 10개의 `li`
자식 노드가 있는 `ul` 노드가 생성됩니다. 이들 노드는 코드에서는 참조되지만 DOM 트리에는 존재하지 않으므로
분리되었다고 할 수 있습니다.

힙 스냅샷은 분리된 노드를 식별하는 한 가지 방법입니다. 힙 스냅샷은
이름에서 알 수 있듯이, 스냅샷 시점에 페이지의 JS 객체와
DOM 노드에서 메모리가 어떻게 분포되어 있는지 보여줍니다.

스냅샷을 만들려면 DevTools를 열어 **Profiles** 패널로 이동한 다음
**Take Heap Snapshot** 라디오 버튼을 선택하고, **Take
Snapshot** 버튼을 누릅니다. 

![힙 스냅샷 촬영][ths]

스냅샷을 처리하고 로드하려면 약간의 시간이 걸릴 수 있습니다. 작업이 완료되면 
왼쪽의 패널(일명 **HEAP SNAPSHOTS**)에서 이를 선택합니다. 

**Class filter** 텍스트 상자에 `Detached` 라고 입력하여 분리된 DOM 트리를
검색합니다.

![분리된 노드 필터링][df]

캐럿을 확장하여 분리된 트리를 조사합니다.

![분리된 트리 조사][ed]

노란색으로 강조표시된 노드는 자바스크립트 코드에서 직접 참조하는
노드입니다. 빨간색으로 강조표시된 노드는 직접 참조가 없습니다. 이들이 활성 상태인 
유일한 이유는 노란색 노드의 트리에 속하기 때문입니다. 일반적으로 노란색 노드에만 
주안점을 두면 됩니다. 코드를 수정하여 노란색 노드가 필요한 시간 이상으로 
활성화되지 않도록 한 다음 노란색 노드 트리에 속한 
빨간색 노드도 없앱니다.

노란색 노드를 클릭하면 더욱 심층적으로 조사할 수 있습니다. **Objects** 창에서
이를 참조하는 코드에 대한 자세한 내용을 볼 수 있습니다. 예를 들어 
아래의 스크린샷에서는 `detachedTree` 변수가 
해당 노드를 참조하고 있음을 알 수 있습니다. 이 메모리 누수를 해결하려면
`detachedTree`를 사용하는 코드를 조사하여 더 이상 필요 없는 노드에 대한 참조를 제거하도록
해야 합니다.

![노란색 노드 조사][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## Allocation Timeline으로 JS 힙 메모리 누수 파악

Allocation Timeline은 JS 힙에서의 메모리 누수를
추적하는 데 유용한 또 다른 도구입니다. 

Allocation Timeline을 시연하려면 다음 코드를 고려하세요.

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

이 코드에서 참조한 버튼을 누를 때마다 일백만 개의 문자로 구성된 
문자열이 `x` 배열에 추가됩니다.

Allocation Timeline을 기록하려면 DevTools를 열고 **Profiles** 패널로 이동한 다음, 
**Record Allocation Timeline** 라디오 버튼을 선택하고 **Start**
 버튼을 누른 다음 메모리 누수를 초래하는 것으로 의심되는 작업을 수행합니다. 작업을 마치면 
**기록 중지** 버튼
(![기록 중지 버튼][sr]{:.inline})을
누릅니다. 

기록 중에 Allocation Timeline에 아래 스크린샷과 같이 
파란 막대가 나타나는지 살펴봅니다. 

![새 할당][na]

이 파란색 막대는 새 메모리 할당을 나타냅니다. 이러한 새 메모리 할당은 
메모리 누수의 후보입니다. 막대를 확대하여
**Constructor** 창을 필터링하면 지정된 시간대 중에 할당된
객체만 표시할 수 있습니다. 

![확대된 Allocation Timeline][zat]

객체를 확장한 다음 그 값을 클릭하면
**Object** 창에서 이에 대한 자세한 내용을 볼 수 있습니다. 예를 들어 아래 스크린샷에서
새로 할당된 객체의 세부정보를 보면
이 객체가 `Window` 범위 내의 `x` 변수로 할당된 것을 알 수 있습니다.

![객체 세부정보][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## 함수별 메모리 할당 검사 {: #allocation-profile }

**Record Allocation Profiler** 유형을 사용하여
자바스크립트 기능별 메모리 할당을 확인합니다.

![Record Allocation 프로파일러](imgs/record-allocation-profile.png)

1. **Record Allocation Profiler** 라디오 버튼을 선택합니다. 페이지에
워커가 있다면
**Start** 버튼 옆의 드롭다운 메뉴를 사용하여 프로파일링 대상으로 선택할 수 있습니다.
1. **Start** 버튼을 누릅니다
1. 검사할 페이지에서 작업을 수행합니다.
1. 모든 작업을 완료하면 **Stop** 버튼을 누릅니다.

DevTools는 함수별 메모리 할당 내역을 보여줍니다. 기본 뷰는
**Heavy (Bottom Up)** 으로, 가장 많은 메모리가 할당된 함수를
가장 위에 표시합니다.

![할당 프로파일러](imgs/allocation-profile.png)

## 잦은 가비지 수집 관측

페이지가 일시 중지하는 상황이 자주 발생하면 가비지 수집 문제일 수
있습니다. 

잦은 가비지 수집을 관측하려면 Chrome 작업 관리자 또는 타임라인 메모리 기록을 
사용하면 됩니다. 작업 관리자의 경우, 
**Memory** 또는 **JavaScript Memory** 값이 너무 자주 오르내리는 경우 가비지 수집이 잦다는 
의미입니다. 타임라인 기록에서 JS 힙
또는 노드 카운트 그래프가 자주 오르내리는 경우, 가비지 수집이 잦다는 의미입니다.

문제가 무엇인지 파악했으면 할당 타임라인 
기록을 사용하여 메모리가 어디에 할당되는지, 어느 함수가 할당을 초래하는지 
알아낼 수 있습니다. 


{# wf_devsite_translation #}
