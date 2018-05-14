project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹 개발자는 Shadow DOM을 사용하여 웹 구성 요소에 대한 구획화된 DOM 및 CSS를 만들 수 있습니다.

{# wf_updated_on: 2016-10-13 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: 자체 포함 웹 구성 요소 {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

Shadow DOM은 웹 앱 빌드의 취약성을 제거합니다. 이 취약성은
HTML, CSS 및 JS의 전반적인 특성 때문입니다. 지난 수년 동안 이
문제를 피하기 위해 [수](http://getbem.com/introduction/)
[많은](https://github.com/css-modules/css-modules)
[도구](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)를
발명했습니다. 예를 들어, 새 HTML ID/클래스를 사용하는 경우
해당 페이지에서 사용하는 기존 이름과 충동할지 여부를 알려주지 않습니다.
[미세한 버그](http://www.2ality.com/2012/08/ids-are-global.html)가 발생하고
CSS 특정성은 큰 문제(`!important` 모든 것!)가 되고 스타일
선택기는 제어할 수 없게 되고
[성능이 저하](/web/updates/2016/06/css-containment)될 수 있는 등 다양한
문제가 있습니다.

**Shadow DOM은 CSS 및 DOM을 수정합니다**. 웹
플랫폼에 **범위가 지정된 스타일**을 소개합니다. 도구 또는 명명 규칙 없이
vanilla 자바스크립트에서 **CSS를 마크업과 번들로 묶고** 구현 세부정보를 숨기고 **자체 포함
구성 요소를 작성**할 수 있습니다.

## 소개 {: #intro}

참고: **이미 Shadow DOM에 대해 잘 알고 있습니까?** 이 글은 새
<a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">
Shadow DOM v1 사양</a>에 대해 설명합니다. Shadow DOM을 사용해왔다면
<a href="https://www.chromestatus.com/features/4507242028072960">Chrome 35에 제공된 v0 버전</a>
및 webcomponents.js 폴리필에 익숙할 것입니다.
개념은 동일하지만, v1 사양에는 API와 관련하여 중요한 차이가 있습니다. 또한
Safari Tech Preview 및 Chrome Canary에 이미 구현되어 있는 등
모든 주요 브라우저가 구현에 동의한 버전입니다. 자세한 내용을
보려면 문서를 계속해서 읽어 새로운 기능을 확인하거나 <a href="#historysupport">
기록 및 브라우저 지원</a>에 대한 섹션을 확인하세요.

Shadow DOM은
[HTML 템플릿](https://www.html5rocks.com/en/tutorials/webcomponents/template/),
[Shadow DOM][sd_spec_whatwg],
[사용자설정 요소](/web/fundamentals/getting-started/primers/customelements) 및
[HTML 가져오기](https://www.html5rocks.com/en/tutorials/webcomponents/imports/) 등 4개의 웹 구성 요소 표준 중 하나입니다.

Shadow DOM을 사용하는 웹 구성 요소를 작성할 필요가 없습니다. 그러나 작성한다면
그 장점(CSS 범위 지정, DOM 캡슐화, 컴퍼지션)을 이용하여 복원성이 있고
구성 가능성이 높고 재사용 가능성이 매우 높은 
[사용자설정 요소](/web/fundamentals/getting-started/primers/customelements)를
빌드할 수 있습니다. 사용자설정
요소는 새 HTML(JS API 사용)을 만드는 방법이고 Shadow DOM은 HTML 및
CSS를 제공하는 방법입니다. 두 API를 결합하여 자체 포함
HTML, CSS 및 자바스크립트를 통해 구성 요소를 만듭니다.

Shadow DOM은 구성 요소 기반 앱을 빌드하는 도구로 고안되었습니다. 따라서
웹 개발의 공통 문제에 대한 솔루션을 제공합니다.

- **격리된 DOM**: 구성 요소의 DOM은 자체 포함됩니다(예: 
  `document.querySelector()`는 구성 요소의 Shadow DOM에 노드를 반환하지 않음).
- **범위가 지정된 CSS**: Shadow DOM 내부에 정의한 CSS는 범위가 Shadow DOM으로 지정되어 있습니다. 스타일 규칙은 
  누출되지 않으며 페이지 스타일은 스며들지 않습니다.
- **컴퍼지션**: 구성 요소에 대한 선언적 마크업 기반 API를 디자인합니다.
- **CSS 단순화**: 범위가 지정된 DOM이란 간단한 CSS 선택기와 훨씬 일반적인 
  ID/클래스 이름을 사용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없음을 의미합니다.
- **생산성**: 큰(전역) 단일 페이지보다 DOM 청크에서 
  앱을 고려합니다.

참고: Shadow DOM API 및 그것의 웹 구성 요소 외부 장점을 사용할 수 있지만
여기서는 사용자설정 요소를 토대로 하는 예에 중점을 두겠습니다.
모든 예는 사용자설정 요소 v1 API를 사용합니다.


#### `fancy-tabs` 데모 {: #demo}

이 글에서 데모 구성 요소(`<fancy-tabs>`)와
 참조 코드 스니펫에 대해 언급할 것입니다. 브라우저가 API를 지원하는 경우
아래 라이브 데모를 보세요. 또는 
<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
Github에서 전체 소스</a>를 확인하세요.

<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
      Github에서 소스 보기
    </a>
  </figcaption>
</figure>

## Shadow DOM이란 무엇입니까? {: #what}

#### DOM의 배경 지식 {: #sdbackground}

HTML은 함께 작업하기 쉬우므로 웹의 기능을 강화합니다. 몇몇 태그를 선언하여
프레젠테이션과 구조를 갖춘 페이지를 몇 초 만에 작성할 수 있습니다. 그러나
HTML 그 자체는 그다지 유용하지 않습니다. 사람은 텍스트 기반
언어를 쉽게 이해하지만, 기계는 더 많은 것을 필요로 합니다. DOM(Document Object
Model)을 입력하세요.

브라우저는 웹페이지를 로드할 때 일련의 흥미로운 작업을 수행합니다. 작성자의
HTML을 라이브 문서로 변형하는 작업도 그 중에 하나입니다.
기본적으로 페이지의 구조를 이해하기 위해 브라우저가 HTML(정적 텍스트 문자열)을
데이터 모델(객체/노드)로 파싱합니다. 브라우저는 해당 노드(DOM)의
트리를 만들어 HTML 계층을 보존합니다. DOM은
페이지를 라이브로 표시한다는 장점이 있습니다. 우리가 작성하는 정적
HTML과는 달리 브라우저가 생성한 노드는 속성과 메서드를 포함하며 프로그램으로
조작할 수 있다는 특별한 장점이 있습니다. 따라서 자바스크립트를 사용하여 DOM
요소를 직접 만들 수 있습니다.


    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

위 코드는 다음과 같은 HTML 마크업을 생성합니다.


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

모두 잘 작동하고 좋습니다. 그런데
[_Shadow DOM_ 이란 무엇입니까](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)?

#### 섀도우에 추가한...DOM{: #sddom}

Shadow DOM은 1) 생성/사용 방법 및
2) 페이지의 나머지와 관련한 작동 방식 등 두 가지 측면에서 일반 DOM과 차이점이 있습니다. 일반적으로 DOM
노드를 만들어 다른 요소의 자식으로 추가합니다. Shadow DOM의 경우 요소에
연결하지만 실제 자식과는 독립된 범위가 지정된 DOM 트리를
만듭니다. 이와 같은 범위가 지정된 하위 트리를 **섀도우 트리(shadow tree)** 라고 합니다. 연결된
요소는 **섀도우 호스트(shadow host)**입니다. `<style>`을 비롯한 섀도우에 추가한 모든 것은
호스팅 요소에 로컬이 됩니다. 이것이 Shadow DOM이
CSS 스타일 범위 지정을 수행하는 방법입니다.

## Shadow DOM 만들기 {: #create}

**섀도우 루트(shadow root)**는 '호스트' 요소에 연결된 문서 조각입니다.
섀도우 루트를 연결하는 작업은 요소가 Shadow DOM을 획득하는 방법입니다. 요소에
대한 Shadow DOM을 만들려면 `element.attachShadow()`를 호출합니다.


    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

위와 같이 `.innerHTML`을 사용하여 섀도우 루트를 채워도 되지만 다른 DOM
API를 사용할 수도 있습니다. 이처럼 웹에서는 선택할 수 있습니다.

사양은 섀도우 트리를 호스팅할 수 없는
[요소 목록을 정의](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)합니다. 다음과 같은 몇몇 이유로 요소가 목록에
있을 수 있습니다.

- 브라우저가 이미 요소(`<textarea>`, `<input>`)에 대한 자신의 내부 Shadow DOM을 
  호스팅합니다.
- 요소가 Shadow DOM(`<img>`)을 호스트하는 것은 이치에 맞지 않습니다.

예를 들어, 다음 코드는 작동하지 않습니다.


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

### 사용자설정 요소에 대한 Shadow DOM 만들기 {: #elements}

Shadow DOM은
[사용자설정 요소](/web/fundamentals/getting-started/primers/customelements)를 만들 때 특히 유용합니다.
Shadow DOM을 사용하여 요소의 HTML, CSS 및 JS를 구획화하여 '웹 구성 요소'를
생성합니다.

**예**: 사용자설정 요소는 **Shadow DOM을 그 자체에 연결하고**
DOM/CSS를 캡슐화합니다.

    // Use custom elements API v1 to register a new HTML tag and define its JS behavior
    // using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

여기에 흥미로운 것이 몇 가지 있습니다. 첫째, `<fancy-tabs>`
인스턴스를 만들 때 사용자설정 요소가 **자신의 Shadow DOM**을
만듭니다. `constructor()`에서 그렇게 합니다. 둘째, 섀도우 루트를 만들고 있기 때문에
`<style>` 내부 CSS 규칙의 범위가 `<fancy-tabs>`로 지정됩니다.

참고: 이 예를 실행하려고 시도하면 어떤 것도 렌더링되지 않음을 알게 될
것입니다. 겉보기에는 사용자의 마크업이 사라집니다! 이는 **요소의
Shadow DOM이 자식 노드에서 렌더링되기** 때문입니다. 자식을 표시하려면
Shadow DOM에
[`<slot>` 요소](#slots)를 배치하여 브라우저에게 렌더링 위치를 알려줘야 합니다. 이에 대한 자세한 내용은
[나중에](#composition_slot) 설명하겠습니다.


## 컴퍼지션 및 슬롯 {: #composition_slot}

컴퍼지션은 잘 알려지지 않은 Shadow DOM 기능이지만
가장 중요합니다.

웹 개발의 세계에서 컴퍼지션은 선언적으로 HTML에서 앱을
구성하는 방법입니다. 서로 다른 빌딩 블록(`<div>`, `<header>`,
`<form>`, `<input>`)이 함께 모여 앱을 만듭니다. 이러한 태그 중 일부는
서로 상호작용합니다. 컴퍼지션은 `<select>`,
`<details>`, `<form>` 및 `<video>`와 같은 기본 요소가 융통성이 크기 때문에 가능합니다. 해당 각 태그는
특정 HTML을 자식으로 수용하여 특별한 작업을 수행합니다. 예를 들어,
`<select>`는 `<option>` 및 `<optgroup>`을 드롭다운 및 다중 선택 위젯으로
렌더링하는 방법을 알고 있습니다. `<details>` 요소는 `<summary>`를
확장 가능한 화살로 렌더링합니다. `<video>`도 특정 자식을 처리하는 방법을 알고 있습니다.
`<source>` 요소는 렌더링되지 않지만 비디오의 동작에 영향을 미칩니다.
멋진 마술과 같습니다!

### 용어: Light DOM과 Shadow DOM {: #lightdom}

Shadow DOM 컴퍼지션은 일련의 새로운 웹 개발 기본 항목을
소개합니다. 세부적으로 들어가기 전에 동일한 용어를 사용하도록
일부 용어를 표준화합시다.

**Light DOM**

구성 요소 사용자가 작성하는 마크업입니다. Light DOM은 구성 요소의
Shadow DOM 외부에서 사용됩니다. Light DOM은 해당 요소의 실제 자식입니다.


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

구성 요소 작성자가 쓰는 DOM입니다. Shadow DOM은 구성 요소에 로컬이며 내부 구조,
범위가 지정된 CSS를 정의하며 구현 세부정보를
캡슐화합니다. 또한 Shadow DOM은 구성 요소 소비자가 작성한 마크업을
렌더링하는 방법을 정의합니다.


    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**평면화된 DOM 트리**

브라우저가 사용자의 Light DOM을 Shadow
DOM으로 배포한 결과이며 최종 제품을 렌더링합니다. 평면화된 트리는 DevTools에서 궁극적으로 보고
페이지에 렌더링되는 항목입니다.


    <button is="better-button">
      #shadow-root
        <style>...</style>
        <slot name="icon">
          <img src="gear.svg" slot="icon">
        </slot>
        <slot>
          <span>Settings</span>
        </slot>
    </button>
    

### &lt;slot&gt; 요소 {: #slots}

Shadow DOM은 `<slot>` 요소를 사용하여 여러 DOM 트리를 함께 구성합니다.
**슬롯은 사용자가 자신의 마크업을 사용하여 채울 _수 있는_ 구성 요소 내부의
자리표시자입니다**. 슬롯을 한 개 이상 정의하여 외부 마크업을 초대하여 구성 요소의
Shadow DOM에 렌더링합니다. 기본적으로 _'사용자의 마크업을
여기에 렌더링한다'_ 고 말하는 것과 같습니다.

참고: 슬롯은 웹 구성 요소에 대한 '선언적 API'를 만드는 방법입니다. 슬롯은
사용자의 DOM을 혼합하여 전체 구성 요소를 렌더링하는 데 도움을 주므로 **여러
DOM 트리를 함께 구성합니다**.


`<slot>`이 요소를 초대할 때 요소를 사용하여
Shadow DOM 경계를 '교차'할 수 있습니다. 이와 같은 요소를 **분산 노드**라고 합니다. 개념상 분산 노드는
다소 기이하게 보일 수 있습니다. 슬롯은 DOM을 물리적으로 이동하지 않고
Shadow DOM 내부의 다른 위치에서 렌더링합니다.

구성 요소는 Shadow DOM에서 슬롯을 0개 이상 정의할 수 있습니다. 슬롯은 비어 있거나
대체 콘텐츠를 제공할 수 있습니다. 사용자가 [Light DOM](#lightdom)
콘텐츠를 제공하지 않는 경우 슬롯은 대체 콘텐츠를 렌더링합니다.


    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

또한 **명명된 슬롯**을 만들 수도 있습니다. 명명된 슬롯은 Shadow DOM에서
사용자가 이름으로 참조하는 특정 구멍입니다.

**예**: `<fancy-tabs>`의 Shadow DOM에서 명명된 슬롯


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

구성 요소 사용자는 다음과 같이 `<fancy-tabs>`를 선언합니다.


    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <h2>'s and changing the ordering would also work! -->
    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    

그리고 평면화된 트리의 모습은 다음과 같습니다.


    <fancy-tabs>
      #shadow-root
        <div id="tabs">
          <slot id="tabsSlot" name="title">
            <button slot="title">Title</button>
            <button slot="title" selected>Title 2</button>
            <button slot="title">Title 3</button>
          </slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot">
            <section>content panel 1</section>
            <section>content panel 2</section>
            <section>content panel 3</section>
          </slot>
        </div>
    </fancy-tabs>
    

구성 요소가 여러 구성을 처리할 수 있지만 평면화된 DOM 트리는
동일한 상태를 유지합니다. 또한 `<button>`에서
`<h2>`로 전환할 수도 있습니다. 이 구성 요소는 `<select>`와 마찬가지로
여러 유형의 자식을 처리하기 위해 작성되었습니다.

## 스타일 지정  {: #styling}

웹 구성 요소의 스타일을 지정하는 다양한 옵션이 있습니다. Shadow DOM을 사용하는 구성 요소는 기본 페이지가 스타일을 지정할 수 있으며
그 자신의 스타일을 정의하거나,
사용자가 기본값을 재정의하는 후크를 ([CSS 사용자설정 속성][css_props] 형식으로) 제공할 수 있습니다.

### 구성 요소 정의 스타일 {: #host}

Shadow DOM의 가장 유용한 기능은 **범위가 지정된 CSS**라는 것은 명백합니다.

- 외부 페이지의 CSS 선택기는 구성 요소 내부에 적용되지 않습니다.
- 내부에 정의된 스타일은 스며 나오지 않습니다. 그 범위는 호스트 요소로 지정됩니다.

**Shadow DOM 내부에 사용된 CSS 선택기는 구성 요소에 로컬로 적용됩니다.**  실제로
이는 페이지의 다른 곳에서 충돌을 걱정하지 않고 공통 ID/클래스 이름을
다시 사용할 수 있음을 의미합니다. 훨씬 간단한 CSS 선택기는
Shadow DOM 내부에서 최상의 방법이며 성능도 탁월합니다.

**예**: 섀도우 루트에 정의된 스타일은 로컬입니다.


    #shadow-root
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          ...
        }
        #tabs {
          display: inline-flex;
          ...
        }
      </style>
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

스타일시트의 범위도 섀도우 트리로 지정됩니다.


    #shadow-root
      <!-- Available in Chrome 54+ -->
      <!-- WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=160683 -->
      <link rel="stylesheet" href="styles.css">
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

`multiple` 속성을 추가할 때 `<select>` 요소가 다중 선택 위젯을 (드롭다운
대신) 렌더링하는 방법이 궁금하십니까?

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>`는 선언된 속성에 기반하여 _그 자체_ 의 스타일을
달리 지정할 수 있습니다. 웹 구성 요소도 `:host`
선택기를 사용하여 그 자체의 스타일을 지정할 수 있습니다.

**예**: 구성 요소 자체 스타일 지정


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

`:host`는 부모 페이지의 규칙이 요소에 정의된 `:host` 규칙보다
훨씬 높은 특정성을 지닌다는 문제가 있습니다. 즉, 외부 스타일이 적용됩니다. 이로써
사용자는 외부에서 상단 레벨 스타일 지정을 재정의할 수 있습니다. 또한 `:host`는
섀도우 루트 컨텍스트에서만 작동하므로
Shadow DOM 외부에서 사용할 수 없습니다.

`:host(<selector>)`의 기능적 형태가 `<selector>`와 일치하는 경우
해당 형태를 사용하여 대상 호스트를 지정할 수 있습니다. 이 방법은 구성 요소가 사용자 상호작용
또는 상태에 응답하거나 호스트 기반 내부 노드의 스타일을 지정하는 동작을 캡슐화하는 데
유용합니다.


    <style>
    :host {
      opacity: 0.4;
      will-change: opacity;
      transition: opacity 300ms ease-in-out;
    }
    :host(:hover) {
      opacity: 1;
    }
    :host([disabled]) { /* style when host has disabled attribute. */
      background: grey;
      pointer-events: none;
      opacity: 0.4;
    }
    :host(.blue) {
      color: blue; /* color host when it has class="blue" */
    }
    :host(.pink) > #tabs {
      color: pink; /* color internal #tabs node when host has class="pink". */
    }
    </style>
    

### 컨텍스트 기반 스타일 지정 {: #contextstyling}

`:host-context(<selector>)`는 그 자신 및 상위 항목이
`<selector>`와 일치하는 경우 해당 구성 요소와 일치합니다. 이에 대한 일반적인 용도는 구성 요소의 주변에 기반한
테마 설정입니다. 예를 들어, 대부분의 사람들은 클래스를
`<html>` 또는 `<body>`에 적용하여 테마를 설정합니다.


    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)`은 `.darktheme`의 하위 항목일 때 `<fancy-tabs>`의
스타일을 지정합니다.


    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()`는 테마 설정에 유용할 수 있지만
[CSS 사용자설정 속성을 사용하여 후크를 만드는 방법](#stylehooks)이 훨씬 더 나을 수 있습니다.

### 분산 노드 스타일 지정 {: #stylinglightdom}

`::slotted(<compound-selector>)`는
`<slot>`으로 분산된 노드와 일치합니다.

이름 배지 구성 요소를 만들었다고 가정합시다.


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

해당 구성 요소의 Shadow DOM은 사용자의 `<h2>` 및 `.title` 스타일을 지정할 수 있습니다.


    <style>
    ::slotted(h2) {
      margin: 0;
      font-weight: 300;
      color: red;
    }
    ::slotted(.title) {
       color: orange;
    }
    /* DOESN'T WORK (can only select top-level nodes).
    ::slotted(.company),
    ::slotted(.title .company) {
      text-transform: uppercase;
    }
    */
    </style>
    <slot></slot>
    

위에서 언급했듯이 `<slot>`은 사용자의 Light DOM을 이동하지 않습니다. 노드가
`<slot>`에 분산되면 `<slot>`은 DOM을 렌더링하지만
노드는 물리적으로 그대로 있습니다. **분산 전에 적용된 스타일은
분산 후에도 계속 적용됩니다**. 그러나 Light DOM은 분산될 때
추가 스타일(Shadow DOM이 정의한 스타일)을 사용할 _수_ 있습니다.

`<fancy-tabs>`의 또 다른 상세한 예:


    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabsSlot::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          ...
        }
        #tabsSlot::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted([aria-hidden="true"]) {
          display: none;
        }
      </style>
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
    

이 예에는 탭 제목에 대해 명명된 슬롯과 탭 콘텐츠에 대해
명명된 슬롯 등 두 개의 슬롯이 있습니다. 사용자가 탭을 선택하면 선택 항목이 굵게 표시되고
해당 패널이 표시됩니다. 이는
`selected` 속성을 가진 분산 노드를 선택하면 수행됩니다. 사용자설정 요소의 JS(여기에서는 다루지 않음)는
해당 속성을 올바른 시간에 추가합니다.

### 외부에서 구성 요소 스타일 지정 {: #stylefromoutside}

외부에서 구성 요소의 스타일을 지정하는 몇몇 방법이 있습니다. 가장 쉬운 방법은
태그 이름을 선택기로 사용하는 것입니다.


    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**외부 스타일은 Shadow DOM에 정의한 스타일보다 우선합니다**. 예를 들어,
사용자가 선택기 `fancy-tabs { width: 500px; }`를 작성하는 경우
해당 규칙이 구성 요소의 규칙 `:host { width: 650px;}`보다 우선합니다.

지금까지 구성 요소 자체 스타일 지정에 대해서만 알아봤습니다. 그러나 구성 요소 내부의
스타일을 지정하려면 어떻게 해야 할까요? 이를 위해서는 CSS 사용자설정 속성이
필요합니다.

#### SS 사용자설정 속성을 사용하여 후크 만들기 {: #stylehooks}

사용자는 구성 요소 작성자가 [CSS 사용자설정 속성][css_props]을 사용하여
후크 스타일을 지정하는 경우 내부 스타일을 조정할 수 있습니다. 개념상 이 아이디어는
`<slot>`과 유사합니다. 사용자가 다시 정의하는 '스타일 자리표시자'를 만듭니다.

**예**: `<fancy-tabs>`를 사용하여 사용자가 배경색을 다시 정의할 수 있습니다.


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

Shadow DOM 내부:


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

이 예에서는 구성 요소는 사용자가 제공한 대로 `black`을
배경 값으로 사용합니다. 그렇지 않으면 `#9E9E9E`를 기본값으로 설정합니다.

참고: 구성 요소 작성자는 개발자에게 그들이 사용할 수 있는
CSS 사용자설정 속성을 알려줘야 합니다. 해당 속성을 구성 요소의
공용 인터페이스의 일부라고 생각하면 됩니다. 스타일 지정 후크를 문서화하세요!


## 고급 정보 {: #advanced}

### 폐쇄형 섀도우 루트 만들기(금지) {: #closed}

'폐쇄형' 모드라고 하는 Shadow DOM의 또 다른 특성이 있습니다. 폐쇄형 섀도우 트리를 만들면
외부 자바스크립트는 구성 요소의 내부 DOM에 액세스할 수
없습니다. 이는 `<video>`와 같은 기본 요소가 작동하는 방식과 유사합니다.
브라우저가 폐쇄형 모드 섀도우 루트를 사용하여 구현되기 때문에 자바스크립트는 `<video>`의
Shadow DOM에 액세스할 수 없습니다.

**예: ** 폐쇄형 섀도우 트리 만들기


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

폐쇄형 모드는 다음과 같이 다른 API에도 영향을 미칩니다.

- `Element.assignedSlot` / `TextNode.assignedSlot`은 `null`을 반환합니다.
- Shadow DOM 내부의 요소와 연결된 이벤트에 대한 `Event.composedPath()`는
  []를 반환합니다.

참고: 폐쇄형 섀도우 루트는 그다지 유용하지 않습니다. 일부 개발자는 폐쇄형 모드를
인공 보안 기능으로 간주합니다. 그러나 그것은 보안 기능이
**아닙니다**. 폐쇄형 모드는 단지 외부 JS가 요소의 내부 DOM에
침입하지 못하도록 방지합니다.


`{mode: 'closed'}`를
사용하여 웹 구성 요소를 만들어서는 안 되는 이유는 다음과 같습니다.

1. 인공 보안: 공격자가 `Element.prototype.attachShadow`를
   납치하는 것을 막지 못합니다.

2. 폐쇄형 모드는 **사용자설정 요소 코드가 그 자신의 Shadow DOM에
   액세스하지 못하도록 차단합니다.** 완전히 실패작입니다. 그 대신, `querySelector()`와 같은 것을
   사용하길 원하는 경우 나중을 위한 참고로 보관해 두는 것이 좋습니다. 이는 폐쇄형 모드의 
   원래 목적을 완전히 무효화합니다.

        customElements.define('x-element', class extends HTMLElement {
          constructor() {
            super(); // always call super() first in the ctor.
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
          }
          connectedCallback() {
            // When creating closed shadow trees, you'll need to stash the shadow root
            // for later if you want to use it again. Kinda pointless.
            const wrapper = this._shadowRoot.querySelector('.wrapper');
          }
          ...
        });

3. **폐쇄형 모드는 최종 사용자를 위한 구성 요소의 융통성을 저하시킵니다**. 웹 구성
   요소를 
   만들 때 구성 옵션이나 사용자가 원하는 용례 등의 기능을 추가하는 것을 잊을 때가 있습니다. 내부 노드에 대한 
   알맞은 스타일 지정 후크를 포함하는 것을 잊는 경우가 일반적인 예입니다.
   폐쇄형 모드에서는 사용자가 기본값을 다시 정의하고 스타일을
   조정할 방법이 없습니다. 구성 요소의 내부에 액세스할 수 있는 것은 큰 도움이 됩니다.
   궁극적으로 사용자는 구성 요소가 원하는 기능을 제공하지 않는 경우
   구성 요소를 분기하거나 다른 구성 요소를 찾거나 자신의 구성 요소를 만듭니다. :(

### JS에서 슬롯 사용하기{: #workwithslots}

Shadow DOM API는 슬롯 및 분산 노드를 사용하기 위한 유틸리티를
제공합니다. 이들은 사용자설정 요소를 작성할 때 여러모로 편리합니다.

#### slotchange 이벤트 {: #slotchange}

`slotchange` 이벤트는 슬롯의 분산 노드가 변경될 때 발생합니다. 사용자가
Light DOM에서 자식을 추가/제거하는 경우를 그 예로 들 수 있습니다.


    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
참고: `slotchange`는 구성 요소 인스턴스가 처음으로 초기화된 경우에는
발생하지 않습니다.

Light DOM에 대한 다른 유형의 변경 사항을 모니터링하려면 요소의 생성자에
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)를
설정하면 됩니다.

#### 슬롯에서 어떤 요소가 렌더링 중입니까? {: #slotnodes}

어떤 요소가 슬롯에 연결되어 있는지 알면 유용할 수 있습니다. `slot.assignedNodes()`를
호출하여 슬롯이 렌더링 중인 요소를 찾습니다. `{flatten: true}`
옵션도 슬롯의 대체 콘텐츠를 반환합니다(분산 중인
노드가 없는 경우).

일례로 Shadow DOM의 모양이 아래와 같다고 가정합시다.

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>사용법</th><th>호출</th><th>결과</th></tr></thead>
  <tr>
    <td>&lt;button is="better-button"&gt;My button&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[text]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button">&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button"&gt;&lt;/button&gt;</td>
    <td><code>slot.assignedNodes({flatten: true});</code></td>
    <td><code>[&lt;b&gt;fallback content&lt;/b&gt;]</code></td>
  </tr>
</table>

#### 요소가 어떤 슬롯에 할당되었습니까? {: #assignedslot}

반대 질문에 대답하는 것도 가능합니다. `element.assignedSlot`은 요소가
할당된 구성 요소 슬롯을 알려줍니다.

### Shadow DOM 이벤트 모델 {: #events}

이벤트가 Shadow DOM에서 발생하면 그 대상을 조정하여
Shadow DOM이 제공하는 캡슐화를 유지합니다. 즉, 이벤트가 Shadow DOM 내에서
내부 요소보다 구성 요소에서 온 것처럼 보이도록 이벤트의 대상을
다시 지정합니다. 일부 이벤트는 심지어 Shadow DOM에서 전파되지도 않습니다.

섀도우 경계를 **교차하는** 이벤트는 다음과 같습니다.

- 포커스 이벤트: `blur`, `focus`, `focusin`, `focusout`
- 마우스 이벤트: `click`, `dblclick`, `mousedown`, `mouseenter`, `mousemove` 등
- 휠 이벤트: `wheel`
- 입력 이벤트: `beforeinput`, `input`
- 키보드 이벤트: `keydown`, `keyup`
- 컴퍼지션 이벤트: `compositionstart`, `compositionupdate`, `compositionend`
- 끌기 이벤트: `dragstart`, `drag`, `dragend`, `drop` 등

**팁**

섀도우 트리가 열린 상태에서 `event.composedPath()`를 반환하면 이벤트가
이동한 노드 배열이 반환됩니다.

#### 사용자설정 이벤트 사용 {: #customevents}

섀도우 트리의 내부 노드에서 발생하는 사용자설정 DOM 이벤트는
`composed: true` 플래그를 사용하여 생성되지 않는 한
섀도우 경계를 넘지 않습니다.


    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

`composed: false`(기본값)인 경우 소비자는 섀도우 루트 외부에서
이벤트를 수신할 수 없습니다.


    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

### 포커스 처리 {: #focus}

[Shadow DOM의 이벤트 모델](#events)에서 불러올 때
Shadow DOM 내부에서 발생하는 이벤트는 호스팅 요소에서 발생하는 것처럼 보이도록 조정됩니다.
예를 들어, 섀도우 루트 내에 있는 `<input>`을 클릭한다고 해봅시다.


    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

`focus` 이벤트는 `<input>`이 아니라 `<x-focus>`에서 발생한 것처럼 보일 것입니다. 
마찬가지로 `document.activeElement`는 `<x-focus>`가 될 것입니다. `mode:'open'`으로 섀도우 루트를
생성한 경우([폐쇄형 모드](#closed) 참조), 포커스를 받은 내부 노드에
액세스할 수도 있습니다.

    document.activeElement.shadowRoot.activeElement // only works with open mode.

여러 가지 레벨의 Shadow DOM이 사용되는 경우(한 사용자설정 요소가 다른 사용자설정 요소 내에 있다고 가정)
, 다음과 같이 섀도우 루트를 재귀적으로 분석하여
`activeElement`를 찾아야 합니다.


    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

포커스를 위한 또 다른 옵션은 `delegatesFocus: true` 옵션으로, 섀도우 트리 내에 있는 요소의 포커스 동작을
확장해 줍니다.

- Shadow DOM 내부의 노드를 클릭했는데 그 노드가 포커스 불가능한 영역인 경우
  포커스 가능한 첫 번째 영역이 포커스됩니다.
- Shadow DOM 내부의 노드가 포커스를 받으면 `:focus`가 포커스를 받는 요소 외에 호스트에도
  적용됩니다.

**예시** - `delegatesFocus: true`가 포커스 동작을 변경하는 방식


    <style>
      :focus {
        outline: 2px solid red;
      }
    </style>
    
    <x-focus></x-focus>
    
    <script>
    customElements.define('x-focus', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
    
        const root = this.attachShadow({mode: 'open', delegatesFocus: true});
        root.innerHTML = `
          <style>
            :host {
              display: flex;
              border: 1px dotted black;
              padding: 16px;
            }
            :focus {
              outline: 2px solid blue;
            }
          </style>
          <div>Clickable Shadow DOM text</div>
          <input type="text" placeholder="Input inside shadow dom">`;
    
        // Know the focused element inside shadow DOM:
        this.addEventListener('focus', function(e) {
          console.log('Active element (inside shadow dom):',
                      this.shadowRoot.activeElement);
        });
      }
    });
    </script>
    

**결과**

<img src="imgs/delegateFocusTrue.png" title="delegatesFocus: true behavior">

위 내용은 `<x-focus>`가 포커스를 받거나(사용자가 클릭하거나 탭하거나
`focus()`할 때 등), 'Clickable Shadow DOM text'를 클릭하거나, 내부
`<input>`이 포커스를 받을 때(`autofocus` 포함)의 결과입니다.

`delegatesFocus: false`를 설정하면 다음과 같은 결과를 대신에 얻게 됩니다.

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> 및 내부  <code>&lt;input></code>이 포커스를 받습니다.
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> 및 <code>&lt;x-focus></code>가
    포커스를 받습니다(예:  <code>tabindex="0"</code>이 있을 경우).
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> 및 'Clickable Shadow DOM text'가
    클릭됩니다(또는 요소의 Shadow DOM 내의 다른 빈 영역이 클릭됨).
  </figcaption>
</figure>

## 팁 및 도움말 {: #tricks}

지난 수년 동안 웹 구성 요소를 작성하는 방법을 조금 배웠습니다. 제가
소개하는 팁이 구성 요소를 작성하고 Shadow DOM을 디버그하는 데
유용할 것입니다.

### CSS 포함 사용 {: #containment}

일반적으로 웹 구성 요소의 레이아웃/스타일/그리기는 완전히 자체 포함됩니다. 완벽하게
우선 적용하려면 `:host`에 [CSS 포함](/web/updates/2016/06/css-containment)을
사용합니다.


    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### 상속 가능한 스타일 재설정 {: #reset}

상속 가능한 스타일(`background`, `color`, `font`, `line-height` 등)은 Shadow DOM에서
계속 상속됩니다. 즉, 상속 가능한 스타일은 기본적으로 Shadow DOM
경계를 관통합니다. 새 슬레이트를 사용하여 시작하려면 섀도우 경계를 교차할 때 `all: initial;`을
사용하여 상속 가능한 스타일을 초기 값으로 재설정합니다.


    <style>
      div {
        padding: 10px;
        background: red;
        font-size: 25px;
        text-transform: uppercase;
        color: white;
      }
    </style>
    
    <div>
      <p>I'm outside the element (big/white)</p>
      <my-element>Light DOM content is also affected.</my-element>
      <p>I'm outside the element (big/white)</p>
    </div>
    
    <script>
    const el = document.querySelector('my-element');
    el.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          all: initial; /* 1st rule so subsequent properties are reset. */
          display: block;
          background: white;
        }
      </style>
      <p>my-element: all CSS properties are reset to their
         initial value using <code>all: initial</code>.</p>
      <slot></slot>
    `;
    </script>

{% framebox height="195px" %}
<div class="demoarea">
  <style>
    #initialdemo {
      padding: 10px;
      background: red;
      font-size: 25px;
      text-transform: uppercase;
      color: white;
    }
  </style>

  <div id="initialdemo">
    <p>I'm outside the element (big/white)</p>
    <my-element>Light DOM content is also affected.</my-element>
    <p>I'm outside the element (big/white)</p>
  </div>
</div>

<script>
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

if (supportsShadowDOM()) {
  const el = document.querySelector('#initialdemo my-element');
  el.attachShadow({mode: 'open'}).innerHTML = `
    <style>
      :host {
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block;
        background: white;
      }
    </style>
    <p>my-element: all CSS properties are reset to their
       initial value using <code>all: initial</code>.</p>
    <slot></slot>
  `;
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### 페이지에서 사용한 모든 사용자설정 요소 찾기 {: #findall}

페이지에서 사용한 사용자설정 요소를 찾는 것은 유용할 수 있습니다. 그렇게 하려면 페이지에
사용된 모든 요소의 Shadow DOM을 재귀적으로 트래버스해야 합니다.


    const allCustomElements = [];
    
    function isCustomElement(el) {
      const isAttr = el.getAttribute('is');
      // Check for <super-button> and <button is="super-button">.
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    }
    
    function findAllCustomElements(nodes) {
      for (let i = 0, el; el = nodes[i]; ++i) {
        if (isCustomElement(el)) {
          allCustomElements.push(el);
        }
        // If the element has shadow DOM, dig deeper.
        if (el.shadowRoot) {
          findAllCustomElements(el.shadowRoot.querySelectorAll('*'));
        }
      }
    }
    
    findAllCustomElements(document.querySelectorAll('*'));
    

{% comment %}
Some browsers also support using shadow DOM v0's `/deep/` combinator in `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

For now, `/deep/` [continues to work in `querySelectorAll()` calls](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
{% endcomment %}

### &lt;template>에서 요소 만들기 {: #fromtemplate}

`.innerHTML`을 사용하여 섀도우 루트를 채우는 대신에 선언적
`<template>`을 사용할 수 있습니다. 템플릿은 웹 구성 요소의 구조를 선언하는
이상적인 자리표시자입니다.

이에 대한 예는 
['사용자설정 요소: 재사용 가능 웹 구성 요소 빌드하기'](/web/fundamentals/getting-started/primers/customelements)를 참조하세요.

## 기록 및 브라우저 지원 {: #historysupport}

지난 몇 년 간 웹 구성 요소에 관심을 가졌다면
Chrome 35+/Opera가 한동안 Shadow DOM의 구식 버전을 제공해오고 있다는 것을 알고 있을
것입니다. Blink는 한동안 두 버전을 모두 계속
지원할 것입니다. V0 사양은 섀도우 루트를 만드는 다른
버전(v1의 `element.attachShadow` 대신`element.createShadowRoot`)을 제공했습니다. 구식 메서드 호출은
v0 의미 체계를 사용하여 섀도우 루트를 계속 만들므로 기존 v0 코드는
중단되지 않습니다.

구식 v0 사양에 관심이 있는 경우
html5rocks 관련
글([1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/),
[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/),
[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/))을 참조하세요.
또한
[Shadow DOM v0과 v1 사이의 차이점][differences]도 참조하세요.

### 브라우저 지원 {: #support}

Chrome 53([상태](https://www.chromestatus.com/features/4667415417847808)), 
Opera 40 및 Safari 10은 Shadow DOM v1을 제공합니다. Edge는
[우선적으로](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/) 고려 중입니다.
Mozilla는 구현 관련 [해결되지 않은 버그](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)
문제가 있습니다.

Shadow DOM의 기능을 검색하려면 `attachShadow`의 존재를 확인합니다.


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
#### 폴리필(Polyfill) {: #polyfill}

브라우저 지원이 광범위하게 제공될 때까지 
[shadydom](https://github.com/webcomponents/shadydom) 및 
[shadycss](https://github.com/webcomponents/shadycss) 폴리필이 v1 
기능을 제공합니다. Shady DOM은 Shadow DOM의 DOM 범위 지정을 가장하고 shadycss는
기본 API가 제공하는 스타일 범위 지정과 CSS 사용자설정 속성을 폴리필합니다.

다음과 같이 폴리필을 설치하세요.

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

폴리필 사용 방법은 다음과 같습니다.


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.async = true;
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }

    // Lazy load the polyfill if necessary.
    if (!supportsShadowDOMV1) {
      loadScript('/bower_components/shadydom/shadydom.min.js')
        .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
        .then(e => {
          // Polyfills loaded.
        });
    } else {
      // Native shadow dom v1 support. Go to go!
    }


스타일의 심/범위 지정 방법은 [https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)를
참조하세요.


## 결론

적당한 CSS 범위 지정, DOM 범위 지정을 수행하고 진정한 컴퍼지션을 가진
API 원본을 이번에 처음으로 보유하게 되었습니다. Shadow DOM은 사용자설정 요소와 같은
다른 웹 구성 요소 API와 결합하여 해킹하지 않고 또는 `<iframe>`과 같은 구식 배지를 사용하지 않고
적절하게 캡슐화된 구성 요소를 작성하는 방법을 제공합니다.

오해하지 마세요. Shadow DOM은 확실히 복잡한 짐승입니다! 그러나 배울 가치가
있는 짐승입니다. 시간을 투자하여 이에 대해 알아보고 궁금한 점은 문의하세요.

#### 추가 자료

- [Shadow DOM v1과 v0 사이의 차이점][differences]
- ['Introducing Slot-Based Shadow DOM API'](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
  (WebKit Blog의 게시글)
- [Web Components and the future of Modular CSS](https://philipwalton.github.io/talks/2015-10-26/)
(저자: [Philip Walton](https://twitter.com/@philwalton))
- ['사용자설정 요소: 재사용 가능 웹 구성 요소 빌드하기'](/web/fundamentals/getting-started/primers/customelements)
 (출처: Google의 웹 기본 개념)
- [Shadow DOM v1 사양][sd_spec_whatwg]
- [사용자설정 요소 v1 사양][ce_spec]

## FAQ(질문과 대답)

**현재 Shadow DOM v1을 사용할 수 있나요?**

폴리필을 사용하는 경우 가능합니다. [브라우저 지원](#support)을 참조하세요.

**Shadow DOM은 어떤 보안 기능을 제공하나요?**

Shadow DOM은 보안 기능이 아닙니다. 구성 요소에서 CSS
범위 지정 및 DOM 트리를 숨기는 가벼운 도구입니다. 진짜 보안 경계를 원하는 경우
`<iframe>`을 사용하세요.

**웹 구성 요소는 Shadow DOM을 사용해야 하나요?**

아니요. Shadow DOM을 사용하는 웹 구성 요소를 작성할 필요가 없습니다. 그러나
[Shadow DOM을 사용하는 사용자설정 요소](#elements)를 작성하면 CSS 범위 지정,
DOM 캡슐화 및 컴퍼지션과 같은 기능을 활용할 수 있습니다.

**개방형 섀도우 루트와 폐쇄형 섀도우 루트의 차이점은 무엇인가요?**

[폐쇄형 섀도우 루트](#closed)를 참조하세요.

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
