project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 자바스크립트를 사용하면 콘텐츠, 스타일 지정, 사용자 상호작용에 대한 응답 등 페이지의 거의 모든 측면을 수정할 수 있습니다. 하지만, 자바스크립트는 DOM 생성을 차단하고 페이지가 렌더링될 때 지연시킬 수도 있습니다. 최적의 성능을 제공하려면 자바스크립트를 비동기로 설정하고 주요 렌더링 경로에서 불필요한 자바스크립트를 제거하세요.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# 자바스크립트로 상호작용 추가 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

자바스크립트를 사용하면 콘텐츠, 스타일 지정, 사용자 상호작용에 대한 응답 등
페이지의 거의 모든 측면을 수정할 수 있습니다. 하지만, 자바스크립트는
DOM 생성을 차단하고 페이지가 렌더링될 때 지연시킬 수도 있습니다. 최적의 성능을 제공하려면
자바스크립트를 비동기로 설정하고 주요 렌더링 경로에서
불필요한 자바스크립트를 제거하세요.

### TL;DR {: .hide-from-toc }
- 자바스크립트는 DOM 및 CSSOM을 쿼리하고 수정할 수 있습니다.
- 자바스크립트 실행은 CSSOM을 차단합니다.
- 자바스크립트는 명시적으로 비동기로 선언되지 않은 경우 DOM 생성을 차단합니다.


자바스크립트는 브라우저에서 실행되고 페이지 동작 방식에 대한 거의 모든 측면을 변경할 수 있게 하는 동적 언어입니다. DOM 트리에서 요소를 추가하고 제거하여 콘텐츠를 수정하거나, 각 요소의 CSSOM 속성을 수정하거나, 사용자 입력을 처리하는 등의 많은 작업을 수행할 수 있습니다. 이 과정을 보여주기 위해 간단한 인라인 스크립트를 사용하여 이전의 'Hello World' 예시를 확장시켜 보겠습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* 자바스크립트를 사용하면 DOM에 접근하고 숨겨진 span 노드에 대한 참조를 가져올 수 있습니다. 이러한 숨겨진 노드는 렌더링 트리에 표시되지 않지만, DOM에는 여전히 존재합니다. 그런 다음 참조를 가져오면 (.textContent를 통해) 해당 텍스트를 변경할 수 있으며, 계산된 디스플레이 스타일 속성을 'none'에서 'inline'으로 재정의할 수도 있습니다. 이제 페이지에 '**Hello interactive students!**'가 표시됩니다.

* 자바스크립트를 사용하면 DOM에서 새로운 요소를 생성, 추가, 제거하고 이 요소의 스타일을 지정할 수 있습니다. 기술적으로 볼 때, 전체 페이지는 요소를 하나씩 생성하고 이 요소의 스타일을 지정하는 하나의 커다란 자바스크립트 파일일 수 있습니다. 이 파일도 작동하기는 하지만 실제로는 HTML 및 CSS를 이용하는 것이 휠씬 더 쉽습니다. 자바스크립트 함수의 두 번째 부분에서 새로운 div 요소를 생성하고, 해당 텍스트 콘텐츠를 설정하고, 스타일을 지정하고, 본문에 추가합니다.

<img src="images/device-js-small.png"  alt="페이지 미리보기">

이와 함께 기존 DOM 노드의 콘텐츠와 CSS 스타일을 수정하고 완전히 새로운 노드를 문서에 추가했습니다. 이 페이지는 어떠한 디자인 상도 수상하지는 않겠지만 자바스크립트가 제공하는 강력한 기능과 유연성을 보여줍니다.

그러나 자바스크립트는 성능이 뛰어난 반면, 페이지의 렌더링 방식과 시기에 있어 많은 제한이 있습니다.

먼저, 위의 예시에서 인라인 스크립트가 페이지의 맨 아래 부근에 있는 것을 확인할 수 있습니다. 그 이유는 무엇일까요? 여러분 스스로 해보는 것이 좋겠지만, 만약 _span_ 요소 위로 스크립트를 이동하면 스크립트가 실패하고 문서에서 _span_ 요소에 대한 참조를 찾을 수 없다고 불평할 것입니다. 예를 들어 _getElementsByTagName(‘span')_ 은 _null_ 을 반환합니다. 이는 스크립트가 문서에 삽입된 정확한 지점에서 실행된다는 중요한 속성을 보여줍니다. HTML 파서는 스크립트 태그를 만나면 DOM 생성 프로세스를 중지하고 자바스크립트 엔진에 제어 권한을 넘깁니다. 자바스크립트 엔진의 실행이 완료될 후 브라우저가 중지했던 시점부터 DOM 생성을 재개합니다.

다시 말해서, 요소가 아직 처리되지 않았기 때문에 스크립트 블록이 페이지의 뒷부분에서 어떠한 요소도 찾을 수 없습니다. 즉, **인라인 스크립트를 실행하면 DOM 생성이 차단되고, 이로 인해 초기 렌더링도 지연되게 됩니다.**

예시 페이지를 통해 스크립트에 대해 소개할 또 다른 미묘한 속성은 스크립트가 DOM뿐만 아니라 CSSOM 속성도 읽고 수정할 수 있다는 점입니다. 실제로, 이는 예시에서 span 요소의 표시 속성을 none에서 inline으로 변경할 때 우리가 수행한 작업입니다. 최종 결과는 어떻게 될까요? 이제 경합 조건이 생성되었습니다.

스크립트를 실행하려는 경우 브라우저가 CSSOM을 다운로드하고 빌드하는 작업을 완료하지 않았으면 어떻게 될까요? 답은 간단하지만 성능에는 그다지 좋지 않습니다. **브라우저가 CSSOM을 다운로드하고 생성하는 작업을 완료할 때까지 스크립트 실행 및 DOM 생성을 지연시킵니다.**

간단히 말해서, 자바스크립트에서는 DOM, CSSOM 및 자바스크립트 실행 간에 여러 가지 새로운 종속성을 도입합니다. 이 때문에 브라우저가 화면에서 페이지를 처리하고 렌더링할 때 상당한 지연이 발생할 수 있습니다.

* 문서에서 스크립트의 위치는 중요합니다.
* 브라우저가 스크립트 태그를 만나면 이 스크립트가 실행 종료될 때까지 DOM 생성이 일시 중지됩니다.
* 자바스크립트는 DOM 및 CSSOM을 쿼리하고 수정할 수 있습니다.
* 자바스크립트 실행은 CSSOM이 준비될 때까지 일시 중지됩니다.

일반적으로 '주요 렌더링 경로 최적화'란 HTML, CSS 및 자바스크립트 간의 종속성 그래프를 이해하고 최적화하는 것을 말합니다.

## 파서 차단 대 비동기 자바스크립트

기본적으로, 자바스크립트 실행은 '파서를 차단'합니다. 브라우저가 문서 내에서 스크립트를 만나면 DOM 생성을 중지시키고, 자바스크립트 런타임에 제어 권한을 넘겨 스크립트가 실행되도록 한 후 DOM 생성을 계속합니다. 우리는 앞의 예시를 통해 인라인 스크립트에서 이러한 동작이 수행되는 것을 확인했습니다. 실제로, 실행을 지연시킬 추가적인 코드를 작성하지 않는 한 인라인 스크립트는 항상 파서를 차단합니다.

스크립트 태그를 통해 포함된 스크립트는 어떨까요? 이전 예시의 코드를 별도의 파일로 추출해 보도록 하겠습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

저희가 &lt;script&gt; 태그를 사용하든 인라인 자바스크립트 스니펫을 사용하든 간에
여러분은 이 둘이 동일한 방식으로 동작할 것으로 기대합니다. 두 경우 모두 브라우저가
일시 중지하고 스크립트를 실행해야만 문서의 나머지 부분을 처리할 수 있습니다.
하지만, **외부 자바스크립트 파일의 경우 브라우저가 일시 중지하고
디스크, 캐시 또는 원격 서버에서 스크립트를 가져올 때까지 기다려야 합니다.
이로 인해 주요 렌더링 경로에 수십~수천 밀리초의 지연이
추가로 발생할 수 있습니다.**

기본적으로 모든 자바스크립트는 파서를 차단합니다. 브라우저는 스크립트가 페이지에서 무엇을 수행할지 모르기 때문에, 브라우저는 최악의 시나리오를 가정하고 파서를 차단합니다. 스크립트가 참조되는 바로 그 지점에서 이 스크립트를 실행할 필요가 없음을 브라우저에 신호로 알려준다면, 브라우저가 계속해서 DOM을 구성할 수 있고 준비가 끝난 후에 스크립트를 실행할 수 있습니다(예: 파일을 캐시나 원격 서버에서 가져온 후에 스크립트를 실행).  

이를 위해 저희는 이 스트립트를 _async_ 로 표시합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

async 키워드를 스크립트 태그에 추가하면, 스크립트가 사용 가능해질 때까지 기다리는 동안 DOM 생성을 차단하지 말라고 브라우저에 지시하는 것입니다. 이 경우 성능이 크게 향상됩니다.

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>다음 차례: 주요 렌더링 경로 측정</button>
</a>


{# wf_devsite_translation #}
