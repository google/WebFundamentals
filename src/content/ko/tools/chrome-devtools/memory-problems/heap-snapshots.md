project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools 힙 프로파일러로 힙 스냅샷을 기록하여 메모리 누수를 찾아내는 방법을 알아봅니다.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-06-08 #}

# 힙 스냅샷을 기록하는 방법 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools 힙 프로파일러로 힙 스냅샷을 기록하여 메모리 누수를 찾아내는 방법을 알아봅니다.

Chrome DevTools 힙 프로파일러는 페이지의 자바스크립트 객체와 관련 DOM 노드를 기준으로
메모리 분포도를 표시합니다
([객체 보존 트리](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree) 참조).
이것을 사용하면 JS 힙 스냅샷을 촬영하고, 메모리 그래프를 분석하고,
여러 스냅샷을 서로 비교하고 메모리 누수를 찾아낼 수 있습니다.


## 스냅샷 촬영

Profiles 패널에서 **Take Heap Snapshot**을 선택한 다음 **Start**를 클릭하거나 <span class="kbd">Cmd</span> + <span class="kbd">E</span> 또는 <span class="kbd">Ctrl</span> + <span class="kbd">E</span>를 누릅니다.

![프로파일링 유형 선택](imgs/profiling-type.png)

**스냅샷**은 처음에는 렌더러 프로세스 메모리에 저장됩니다.
그런 다음 사용자가 스냅샷 아이콘을 보려고 클릭하면 필요 시 DevTools로 전송됩니다.

스냅샷이 DevTools에 로드되어 파싱되고 나면,
스냅샷 제목 아래에 숫자가 나타나고
[연결 가능한 자바스크립트 객체](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)의 총 크기를 표시합니다.

![연결 가능한 객체의 총 크기](imgs/total-size.png)

참고: 스냅샷에는 연결 가능한 객체만 포함되어 있습니다. 또한, 스냅샷 촬영은 항상 가비지 수집부터 시작합니다.

## 스냅샷 지우기

스냅샷을 (DevTools와 렌더러 메모리 양쪽에서) 삭제하려면 Clear all profiles 아이콘을 누릅니다.

![스냅샷 삭제](imgs/remove-snapshots.png)

DevTools 창을 닫아도 프로필이 렌더러 메모리에서 삭제되지는 않습니다. DevTools를 다시 열면 이전에 촬영한 스냅샷이 모두 스냅샷 목록에 다시 표시됩니다.

<p class="note"><strong>예:</strong> 다음의 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">분산된 객체</a> 예시를 힙 프로파일러로 프로파일링해보세요. 여러 개의 (객체) 항목 할당이 표시되어야 정상입니다.</p>

## 스냅샷 보기

여러 가지 작업에 대해 서로 다른 관점으로 스냅샷을 봅니다.

**Summary view**는 생성자 이름을 기준으로 그룹화된 객체를 보여줍니다. 이 옵션을 사용하면 생성자 이름을 기준으로 그룹화된 유형(과 각각의 메모리 사용량)에 따라 객체를 추적할 수 있습니다. 이 옵션은 특히
[DOM 누수 추적](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks)에 유용합니다.

**Comparison 뷰**는 두 스냅샷 간의 차이점을 표시합니다. 이 옵션을 사용하면 두 개 (또는 그 이상의) 메모리 스냅샷을 작업 이전과 이후로 비교하여 볼 수 있습니다. 비워진 메모리의 델타와 참조 카운트를 검사하면 메모리 누수의 존재 여부와 원인을 확인할 수 있습니다.

**Containment 뷰**를 사용하면 힙 콘텐츠를 탐색할 수 있습니다. 이 옵션은 객체 구조를 좀 더 잘 볼 수 있게 해주므로 전역 네임스페이스(창)에서 참조된 객체를 분석하여 이를 유지하는 것이 무엇인지 알아낼 수 있습니다. 이 옵션을 사용하면 클로저를 분석하고 객체를 낮은 단계부터 심층적으로 접근할 수 있습니다.

**Dominators 뷰**는
[도미네이터 트리](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)
를 표시하며 누적 지점을 찾는 데 유용할 수 있습니다.
이 뷰를 사용하면 여전히 실행되고 있는 예상치 않은 객체에 대한 참조가 없는지, 삭제/가비지 수집이 실제로 잘 작동하고 있는지 확인할 수 있습니다.

여러 뷰 사이를 전환하려면, 뷰 하단의 선택기를 사용하면 됩니다.

![뷰 전환 선택기](imgs/switch-views.png)

참고: 속성 중에는 자바스크립트 힙에 저장되지 않는 것도 있습니다. 네이티브 코드를 실행하는 getter를 사용하여 구현된 속성은 캡처되지 않습니다. 또한, 문자열이 아닌 값(예: 숫자)도 캡처되지 않습니다.

### Summary 뷰

스냅샷은 처음에는 Summary 뷰에서 열리고 총 객체 수를 표시합니다. 이 뷰를 확장하여 인스턴스를 표시할 수 있습니다.

![Summary 뷰](imgs/summary-view.png)

최상위 항목은 '총' 줄 수입니다. 여기에 표시되는 내용은 다음과 같습니다.

* **Constructor**는 이 생성자를 사용하여 생성된 모든 객체를 나타냅니다.
* **Number of object instances**는 # 열에 표시됩니다.
* **Shallow Size** 열에는 특정 생성자 함수로 생성된 모든 객체의 Shallow Size 총합이 표시됩니다. Shallow Size란 객체 자체가 보유한 메모리 크기를 말합니다. (일반적으로 배열과 문자열은 더 큰 Shallow Size를 가집니다.) [객체 크기](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)를 참조하세요.
* **Retained size** 열에는 동일한 객체 집합 중에서 최대 보존 크기가 표시됩니다. 객체가 삭제되고 (해당 객체의 종속 항목에 더 이상 연결할 수 없게 되면) 비워질 수 있는 메모리의 크기를 보존 크기라고 합니다. [객체 크기](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)를 참조하세요.
* **Distance**는 최단 거리의 단순한 노드 경로를 사용하여 루트까지의 거리를 표시합니다.

상단 뷰에서 total 줄을 확장하면 해당 인스턴스가 모두 표시됩니다. 각각의 경우, 해당 열에 Shallow Size 및 보존 크기가 표시됩니다. @ 문자 뒤의 숫자는 해당 객체의 고유 ID로, 각 객체별로 힙 스냅샷을 비교할 수 있습니다.

노란색 객체에는 자바스크립트 참조가 있고 빨간색 객체는 노란색 배경의 객체에서 참조되는 분리된 노드라는 점에 유의하세요.

**힙 프로파일러의 다양한 생성자 (그룹) 항목은 각각 무엇에 해당할까요?**

![생성자 그룹](imgs/constructor-groups.jpg)

* **(global property)** - 전역 객체(예: 'window')와 이 객체가 참조하는 객체 사이의 중간 객체입니다. Person 생성자를 사용하여 생성되고 전역 객체가 보유하고 있는 객체가 있는 경우, 보존 경로는 [global] > (global property) > Person과 같은 형태가 될 것입니다. 이것은 객체가 서로 직접 참조하는 일반적인 경우와는 대조됩니다. 중간 객체는 성능상의 이유로 존재합니다. Global(전역) 객체는 정기적으로 수정되며 속성 액세스를 최적화하면 전역 객체에 적용되지 않는 비전역 객체에 좋은 효과를 발휘합니다.

* **(roots)** - 보존 트리 뷰의 루트 항목은 선택한 객체에 대한 참조가 있는 엔터티입니다. 이들은 자체적인 목적을 위해 엔진이 생성한 참조일 수도 있습니다. 엔진은 객체를 참조하는 캐시를 갖고 있지만, 이러한 참조는 모두 약하고 진정으로 강력한 참조가 없기 때문에 객체가 수집되는 것을 차단하지 못합니다.

* **(closure)** - 함수 클로저를 통한 일군의 객체에 대한 참조 카운트입니다.

* **(array, string, number, regexp)** - 배열, 문자열, 숫자 또는 정규식을 참조하는 속성을 포함한 객체 유형의 목록입니다.

* **(compiled code)** - 간단히 말해, 컴파일된 코드와 관련된 모든 것입니다. 스크립트는 함수와 유사하지만 &lt;script&gt; 본문에 해당합니다. SharedFunctionInfo(SFI)는 함수와 컴파일된 코드 사이에 존재하는 객체입니다. 함수에는 대개 맥락이 있지만, SFI에는 없습니다.

* **HTMLDivElement**, **HTMLAnchorElement**, **DocumentFragment** 등 - 사용자의 코드가 참조한 특정 유형의 요소 또는 문서 객체에 대한 참조입니다.


<p class="note"><strong>예:</strong> Summary 뷰를 사용하는 방법을 이해하려면 이 <a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">데모 페이지</a>를 살펴보세요.</p>

### Comparison 뷰

여러 개의 스냅샷을 서로 비교하여 누수된 객체를 찾아냅니다. 특정 애플리케이션 작업이 누수를 발생시키지 않는지 확인하려면(예를 들어 문서를 열었다가 닫는 것처럼 직접 및 역방향 작업이 쌍을 이루는 경우 가비지를 남기지 않아야 함), 아래의 시나리오를 따르세요.

1. 작업을 수행하기 전에 힙 스냅샷을 촬영합니다. 
2. 작업을 수행합니다(누수를 초래한다고 생각되는 방식으로 페이지와 상호작용). 
3. 역방향 작업을 수행합니다(반대의 상호작용을 수행하고 몇 번 반복함). 
4. 두 번째 힙 스냅샷을 촬영한 다음 이 스냅샷의 뷰를 Comparison 뷰로 변경하여 스냅샷 1과 비교합니다.

Comparison 뷰에 두 스냅샷의 차이점이 표시됩니다. total 항목을 확장하면 추가되고 삭제된 객체 인스턴스가 표시됩니다.

![Comparison 뷰](imgs/comparison-view.png)

<p class="note"><strong>예:</strong> 스냅샷 비교를 사용하여 누수를 감지하는 방법에 대해 감을 잡으려면 이 <a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">데모 페이지</a>를 살펴보세요.</p>

### Containment 뷰

Containment 뷰는 기본적으로 애플리케이션의 객체 구조를 '조감도' 형태로 보여줍니다. 이 뷰를 사용하면 함수 클로저 안쪽을 들여다볼 수 있고, 자바스크립트 객체를 구성하는 VM 내부 객체를 관찰할 수도 있으며, 애플리케이션이 얼마나 많은 메모리를 사용하는지 아주 낮은 수준에서 파악할 수 있습니다.

이 뷰는 여러 진입점을 제공합니다.

* **DOMWindow objects**는 자바스크립트 코드에 대해 '전역' 객체로 간주되는 객체입니다.
* **GC roots**는 VM의 가비지가 사용하는 실제 GC 루트입니다. GC 루트는 기본 제공 객체 맵, 기호 테이블, VM 스레드 스택, 컴파일 캐시, 핸들 범위, 전역 핸들 등으로 구성될 수 있습니다.
* **Native objects**는 자동화할 수 있도록 자바스크립트 가상 머신 내부로 '푸시'되는 브라우저 객체입니다(DOM 노드, CSS 규칙 등).

![Containment 뷰](imgs/containment-view.png)

<p class="note">
  <strong>예:</strong> 이 뷰를 사용하여 클로저와 이벤트 핸들러를 탐색하는 방법을 알아보려면 이 <a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">데모 페이지</a>를 살펴보세요.


<strong>클로저에 대한 팁</strong>

함수의 이름을 지정하면 스냅샷에서 각 클로저를 쉽게 구별할 수 있으므로 많은 도움이 됩니다. 예를 들어, 이 예시에서는 이름이 지정된 함수를 사용하지 않습니다.


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

하지만 다음 예시에서는 사용합니다.


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![함수에 이름을 지정하여 각 클로저 구별](imgs/domleaks.png)

<p class="note">
    <strong>예:</strong>
    <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">why eval is evil</a>라는 이 예시를 살펴보면 클로저가 메모리에 미치는 영향을 분석할 수 있습니다. 이어서 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">힙 할당</a> 기록 과정을 단계별로 안내하는 이 예시도 흥미로울 수 있습니다.
</p>

### Dominators 뷰

[Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) 뷰는 힙 그래프의 도미네이터 트리를 보여줍니다.
이 뷰는 Containment 뷰와 유사하지만 속성 이름이 없습니다.
그 이유는 객체의 도미네이터에는 이에 대한 직접 참조가 없을 수도 있기 때문입니다.
도미네이터 트리는 그래프의 스패닝 트리가 아닙니다.
하지만 메모리 누적 지점을 신속하게 파악할 수 있기 때문에
더 유용한 경우도 있습니다.

<p class="note"><strong>참고:</strong> Chrome Canary에서 Dominators 뷰를 활성화하려면 Settings > Show advanced heap snapshot properties로 이동하여 DevTools를 다시 시작하면 됩니다.</p>

![Dominators 뷰](imgs/dominators-view.png)

<p class="note">
    <strong>예:</strong>
    누적 지점을 찾아내는 방법을 연습하려면 이 <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">데모</a>를 살펴보세요. 이어서 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">보존 경로 및 도미네이터</a>의 예시도 둘러보세요.
</p>

## 색 구분 검색

객체의 속성과 속성 값은 각기 유형이 다르며 
그에 따라 색이 지정됩니다. 각 속성은 다음 네 가지 중 한 가지 유형을 지닙니다.

* **a: property** - 이름이 있는 일반 속성으로, .(점) 연산자 또는 [ ](괄호) 표기법(예: ["foo bar"])을 통해 액세스됩니다.
* **0: element** - 숫자 색인이 있는 일반 속성으로, [ ](괄호) 표기법을 통해 액세스됩니다.
* **a: context var** - 함수 컨텍스트의 변수로, 함수 클로저 내에서 이름으로 액세스 가능합니다.
* **a: system prop** - 자바스크립트 VM이 추가하는 속성으로, 자바스크립트 코드에서는 액세스할 수 없습니다.

`System `으로 지정된 객체는 상응하는 자바스크립트 유형이 없습니다. 이들은 자바스크립트 VM의 객체 시스템 구현의 일부분입니다. V8은 대부분의 내부 객체를 사용자의 JS 객체와 같은 힙에 할당합니다. 따라서 이들은 그저 v8 내부 객체일 뿐입니다.

## 특정 객체 찾기

수집된 힙에서 객체를 찾으려면 <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd>를 사용하고 객체 ID를 제공하여 검색하면 됩니다.

## DOM 누수 찾기

힙 프로파일러에는 브라우저 네이티브 객체(DOM 노드, CSS 규칙)와 자바스크립트 객체 사이의
양방향 종속성을 반영하는 기능이 있습니다.
이 기능은 분리된 DOM 하위 트리가 잊힌 채로 부유하는 현상으로 인해
다른 방식으로는 보이지 않는 누수 발생을 발견하는 데 도움이 됩니다.

DOM 누수는 생각보다 규모가 클 수 있습니다.
다음 예시를 살펴보세요. #tree GC는 언제일까요?


      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf`는 자신의 부모 노드(parentNode)에 대한 참조를 유지하며
`#tree`까지 재귀적으로 순환하므로, leafRef가 무효화되었을 때에만
`#tree` 아래의 트리 전체가 GC 후보가 됩니다.

![DOM 하위 트리](imgs/treegc.png)

<p class="note">
    <strong>예:</strong>
    DOM 노드가 누수되는 지점과 그러한 현상을 감지하는 법을 이해하려면 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">누수 DOM 노드</a> 예시를 살펴보세요. 이어서 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">DOM 누수가 예상보다 큰 경우</a>라는 예시도 살펴보세요.
</p>

DOM 누수와 메모리 분석 기본 사항에 대해 더 자세한 내용을 읽어보려면 Gonzlao Ruiz de Villa가 작성한 
[Chrome DevTools로 메모리 누수 찾기 및 디버깅](http://slid.es/gruizdevilla/memory) 문서를 참조하세요.

<p class="note">
    <strong>예:</strong>
    이 <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">데모</a>를 통해 분리된 DOM 트리를 다루는 법을 알아보세요.
</p>




{# wf_devsite_translation #}
