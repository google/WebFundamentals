project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 사용자설정 요소를 사용하면 웹 개발자가 새로운 HTML 태그를 정의하고, 기존 태그를 확장하며 재사용 가능한 웹 구성 요소를 생성할 수 있습니다.

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-06-28 #}

# 사용자설정 요소 v1: 재사용 가능한 웹 구성 요소 {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

[사용자설정 요소][spec]를 사용하면 웹 개발자가 **새로운 HTML 태그**를 생성하거나,
기존 HTML 태그를 보강하거나, 다른 개발자가 작성한 구성 요소를 확장할 수 있습니다.
이 API는 [웹 구성 요소](http://webcomponents.org/){: .external }의 기반입니다. 이 API는
단순하게 vanilla JS/HTML/CSS를 사용하여 재사용 가능한 구성 요소를 생성할 수 있는 웹 표준 기반 방법을
제공합니다. 그 결과, 앱에서 사용되는 코드 수가 줄어들고, 모듈식 코드 사용이 가능하며, 코드 재사용 가능성이 늘어납니다.

## 소개 {: #intro}

참고: 이 문서에서는 새로운 <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">사용자설정 요소 v1 사양</a>에 대해 설명합니다. 사용자설정 요소를 사용하고 있었다면 <a href="https://www.chromestatus.com/features/4642138092470272">Chrome 33에서 제공되는 v0 버전</a>에 익숙할 것입니다. 개념은 동일하지만, v1 사양에는 API와 관련하여 중요한 차이가 있습니다. 자세한 내용을 보려면 문서를 계속해서 읽어 새로운 기능을 확인하거나 <a href="#historysupport">기록 및 브라우저 지원</a>에 대한 섹션을 확인하세요.

브라우저는 웹 애플리케이션을 구조화하는 데 탁월한 도구를 제공합니다.
이를 HTML이라고 합니다.  이에 대해 들어봤을 것입니다. 이는 선언 및 이식이 가능하며, 완벽히 지원되고, 사용이 쉽습니다. HTML은 나름 훌륭하지만, 해당 어휘와 확장성은 한정되어 있습니다. [HTML Living Standard](https://html.spec.whatwg.org/multipage/){: .external }에는 아직까지는 작성한 마크업을 JS 동작에 자동으로 연결할 수 있는 방법이 없습니다.

사용자설정 요소가 HTML을 현대화하고, 없는 부분을 채우고,
구조와 동작을 함께 묶을 수 있는 해답입니다. HTML이 문제에 대한 해결책을 제시하지 못할 경우
문제를 해결해 줄 사용자설정 요소를 생성할 수 있습니다. **사용자설정 요소는 HTML의 이점을 유지하는 동시에 새로운 방법을 브라우저에 알려줍니다**.

## 새로운 요소 정의 {: #define}

새로운 HTML 요소를 정의하려면 자바스크립트를 활용해야 합니다.

사용자설정 요소를 정의하고
브라우저에 새로운 태그에 대해 알리는 데에는 전역적 `customElements`가 사용됩니다. 생성하려는
태그 이름과 기본 `HTMLElement`를 확장하는 자바스크립트 `class`를 사용하여 `customElements.define()`을 호출합니다.

**예** - 모바일 창 패널 `<app-drawer>` 정의:


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

사용 예:


    <app-drawer></app-drawer>
    

사용자설정 요소를 사용하는 것은 `<div>` 또는 기타 요소를 사용하는 것과 별반 다를 게 없다는 점을 명심해야 합니다. 인스턴스를 페이지에서 선언하고, 자바스크립트에서 동적으로 생성할 수 있으며, 이벤트 리스너를 추가할 수도 있습니다. 추가 예제를 보려면 다음 내용을 계속 읽어보세요.

### 요소의 JavaScript API 정의 {: #jsapi}

사용자설정 요소의 기능은 `HTMLElement`를 확장하는 ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)를 사용하여 정의됩니다.
`HTMLElement`를 확장하면 사용자설정 요소가 전체 DOM API를 상속하도록 보장되고,
이 클래스에 추가하는 모든 속성/메서드가 요소의 DOM 인터페이스에 포함되게 됩니다.
기본적으로, 이 클래스를 사용하여 태그에 대한 **공용 JavaScript API**를 생성해야 합니다.

**예** - `<app-drawer>`의 DOM 인터페이스 정의:


    class AppDrawer extends HTMLElement {
    
      // A getter/setter for an open property.
      get open() {
        return this.hasAttribute('open');
      }
    
      set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
        this.toggleDrawer();
      }
    
      // A getter/setter for a disabled property.
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Can define constructor arguments if you wish.
      constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
    
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          // Don't toggle the drawer if it's disabled.
          if (this.disabled) {
            return;
          }
          this.toggleDrawer();
        });
      }
    
      toggleDrawer() {
        ...
      }
    }
    
    customElements.define('app-drawer', AppDrawer);
    

이 예에서는 `open` 속성, `disabled` 속성
및 `toggleDrawer()` 메서드가 있는 창을 생성합니다. 이는 또한 [속성을 HTML 특성으로 나타냅니다](#reflectattr).

사용자설정 요소의 특징은 **클래스 정의 내 `this`가
DOM 요소 자체(예: 클래스의 인스턴스)를 나타낸다**는 것입니다. 이 예에서는 `this`가 `<app-drawer>`를 나타냅니다. 이것(😉)이 바로 요소가 `click` 리스너를 자기 자신에 추가할 수 있는 방법입니다. 이벤트 리스너로만 국한되지 않습니다. 전체 DOM API를 요소 코드 내에서 사용할 수 있습니다. 요소의 속성에 액세스하고, 해당 하위 항목(`this.children`)을 검사하고, 노드를 쿼리하는(`this.querySelectorAll('.items')`) 등의 작업을 수행하려면 `this`를 사용하세요.

**사용자설정 요소 생성 관련 규칙**

1. 사용자설정 요소의 이름에는 **대시(-)가 포함되어야 합니다**. 이에 따라 `<x-tags>`, `<my-element>` 및 `<my-awesome-app>`은 모두 유효한 이름이지만, `<tabs>` 및 `<foo_bar>`는 그렇지 않습니다. 이러한 요구사항은 HTML 파서가 일반 요소와 사용자설정 요소를 구별할 수 있도록 합니다. 또한 새로운 태그가 HTML에 추가될 때 다음 버전과의 호환성도 보장되도록 합니다.
2. 동일한 태그를 두 번 이상 등록할 수 없습니다. 그렇게 하려고 하면 `DOMException`이 발생합니다. 새로운 태그에 대해 브라우저에 알리고 나면 그걸로 끝입니다. 취소할 수 없습니다.
3. HTML은 [몇 가지 요소](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)만 스스로 닫도록 허용하므로 사용자설정 요소는 스스로 닫을 수 없습니다. 따라서 항상 닫는 태그를 작성해야 합니다(<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>).

## 요소 확장 {: #extend}

Custom Elements API는 새로운 HTML 요소를 생성하는 데 유용하지만,
다른 사용자설정 요소를 확장하거나 브라우저에서 기본 제공되는 HTML을 확장하는 데도 유용합니다.

### 사용자설정 요소 확장 {: #extendcustomeel}

다른 사용자설정 요소 확장은 해당 클래스 정의를 확장함으로써 수행할 수 있습니다.

**예** - `<app-drawer>`를 확장하는 `<fancy-app-drawer>` 생성:


    class FancyDrawer extends AppDrawer {
      constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
        ...
      }
    
      toggleDrawer() {
        // Possibly different toggle implementation?
        // Use ES2015 if you need to call the parent method.
        // super.toggleDrawer()
      }
    
      anotherMethod() {
        ...
      }
    }
    
    customElements.define('fancy-app-drawer', FancyDrawer);
    

### 기본 HTML 요소 확장 {: #extendhtml}

이를 테면 여러분은 더 화려한 `<button>`을 생성하기를 원했다고 가정해 봅시다. 더 나은 옵션은 `<button>`의 동작 및
기능을 복제하는 대신 사용자설정 요소를 사용하여 기존 요소를 점진적으로 개선하는 것입니다.

**사용자설정 기본 제공 요소**는 브라우저의
기본 제공 HTML 태그 중 하나를 확장하는 사용자설정 요소입니다. 기존 요소 확장의 주요 이점은
해당 기능(DOM 속성, 메서드, 접근성)을 모두 얻을 수 있다는 점입니다. **기존 HTML 요소를 점진적으로 개선**하는 데 있어 [Progressive Web App](/web/progressive-web-apps/)을 작성하는 것보다 더 좋은 방법은 없습니다.

요소를 확장하려면 올바른 DOM 인터페이스에서
상속하는 클래스 정의를 생성해야 합니다. 예를 들어, `<button>`을 확장하는 사용자설정 요소는
`HTMLElement`가 아니라 `HTMLButtonElement`에서 상속해야 합니다. 마찬가지로,
`<img>`를 확장하는 요소는 `HTMLImageElement`를 확장해야 합니다.

**예** - `<button>` 확장:


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
      }
    
      // Material design ripple animation.
      drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
      }
    }
    
    customElements.define('fancy-button', FancyButton, {extends: 'button'});
    

`define()`에 대한 호출이 기본 요소를 확장할 때 약간 변경된다는 점에 유의하세요. 세 번째로 필요한 매개변수는 확장하는 태그가 무엇인지를 브라우저에 알립니다. 이는 많은 HTML 태그가 동일한 DOM 인터페이스를 공유하기 때문에 필수입니다. 그중에 `<section>`, `<address>` 및 `<em>`은 모두 `HTMLElement`를 공유하며, `<q>` 및 `<blockquote>`는 `HTMLQuoteElement`를 공유하는 식입니다. `{extends: 'blockquote'}`를 지정하면 `<q>` 대신 성능이 향상된 `<blockquote>`를 생성한다는 것을 브라우저에 알립니다. HTML DOM 인터페이스의 전체 목록은
[HTML 사양](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)을 참조하세요.

참고: `HTMLButtonElement`를 확장하면 화려한 버튼에 `<button>`의 모든 DOM속성/메서드가 부여됩니다. 이는 `disabled` 속성, `click()` 메서드, `keydown` 리스너, `tabindex` 관리 등 우리가 직접 구현할 필요가 없는 것들을 제외시켜 줍니다. 그 대신, 사용자설정 기능, 즉 `drawRipple()` 메서드를 사용하여 `<button>`을 점진적으로 개선하는 데 집중할 수 있습니다. 코드가 줄어들고 재사용이 늘어나게 되죠!

사용자설정된 기본 제공 요소를 소비하는 사용자는 여러 가지 방법으로 이 요소를 사용할 수 있습니다.
사용자는 기본 태그에 `is=""` 속성을 추가하여 이 요소를 선언하거나


    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Fancy button!</button>
    

자바스크립트로 인스턴스를 생성하거나


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

`new` 연산자를 사용할 수 있습니다.


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

다음은 `<img>`를 확장하는 또 다른 예입니다.

**예** - `<img>` 확장:


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

사용자는 이 구성 요소를 다음과 같이 선언하거나


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

자바스크립트로 인스턴스를 생성합니다.


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

참고: 일부 브라우저는  <code>is=""</code> 구문 구현을 지원하지 않습니다. 이는 접근성 및 점진적인 개선에 있어서는 불행한 일입니다. 기본 HTML 요소를 확장하는 것이 유용하다고 생각되면 여러분의 생각을 <a href='https://github.com/w3c/webcomponents/issues/509'>Github</a>에 올려 주세요.

## 사용자설정 요소 반응 {: #reactions}

사용자설정 요소는
존재하는 동안 실행되는 코드에 대한 특수한 수명 주기 후크를 정의할 수 있습니다. 이를 **사용자설정 요소 반응**이라고 합니다.

<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>호출 시기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>요소의 인스턴스가 생성되거나 <a href="#upgrades">업그레이드</a>된 경우. 초기화 단계, 이벤트 리스너 설정 또는 <a href="#shadowdom">Shadow DOM 생성</a>에 유용합니다.  <code>constructor</code>에서 할 수 있는 작업에 대한 제한 사항은 <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">사양</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>요소가 DOM에 삽입될 때마다 호출됩니다. 리소스 가져오기나 렌더링과 같이 설정 코드 실행에 유용합니다. 일반적으로, 이 시간까지는 작업을 지연시켜야 합니다.</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>요소가 DOM에서 제거될 때마다 호출됩니다. 정리 코드(이벤트 리스너 제거 등) 실행에 유용합니다.</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>속성이 추가, 제거, 업데이트 또는 대체된 경우. 또한, 요소가 파서에 의해 생성되거나 <a href="#upgrades">업그레이드</a>된 경우에도 초기 값에 대해 호출됩니다. <b>참고:</b>  <code>observedAttributes</code> 속성에 나열된 특성만 이 콜백을 수신합니다.</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>사용자설정 요소가 새  <code>document</code>(예:  <code>document.adoptNode(el)</code>라고도 함)로 이동된 경우</td>
    </tr>
  </tbody>
</table>

브라우저는 `observedAttributes` 배열의
허용 목록에 추가된 모든 속성에 대해 `attributeChangedCallback()`을 호출합니다([속성에 대한 변경 내용 확인](#attrchanges) 참조).
근본적으로, 이는 성능 최적화 작업입니다. 사용자가 `style` 또는 `class`와 같은 일반적인
속성을 변경할 때 개발자는 쓸데없이 수많은 콜백을 받는 것을 원치 않습니다.

**반응 콜백은 동기식입니다**. 누군가가 개발자 요소에 대해 `el.setAttribute(...)`를
호출하면 브라우저가 즉시 `attributeChangedCallback()`을 호출합니다. 마찬가지로,
개발자 요소가 DOM에서
제거(예: 사용자가 `el.remove()`를 호출함)되고 나면 즉시 `disconnectedCallback()`이 수신됩니다.

**예:** `<app-drawer>`에 대한 사용자설정 요소 반응 추가:


    class AppDrawer extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
        ...
      }
      connectedCallback() {
        ...
      }
      disconnectedCallback() {
        ...
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        ...
      }
    }
    

합당한 경우 반응을 정의합니다. 요소가 충분히 복잡하고 `connectedCallback()`에서 IndexedDB에 대한 연결을 열 경우 `disconnectedCallback()`에서 필요한 정리 작업을 수행해야 합니다. 하지만, 주의를 기울여야 합니다. 모든 경우에 DOM에서 요소를 제거하는 것은 좋지 않습니다. 예를 들어, 사용자가 탭을 닫는 경우에는 `disconnectedCallback()`이 절대로 호출되지 않습니다.

**예:** 사용자설정 요소를 다른 문서로 이동 및 해당 `adoptedCallback()` 관찰:


    function createWindow(srcdoc) {
      let p = new Promise(resolve => {
        let f = document.createElement('iframe');
        f.srcdoc = srcdoc || '';
        f.onload = e => {
          resolve(f.contentWindow);
        };
        document.body.appendChild(f);
      });
      return p;
    }
    
    // 1. Create two iframes, w1 and w2.
    Promise.all([createWindow(), createWindow()])
      .then(([w1, w2]) => {
        // 2. Define a custom element in w1.
        w1.customElements.define('x-adopt', class extends w1.HTMLElement {
          adoptedCallback() {
            console.log('Adopted!');
          }
        });
        let a = w1.document.createElement('x-adopt');
    
        // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
        w2.document.body.appendChild(a);
      });
    

## 속성 및 특성

### 속성을 특성에 반영 {: #reflectattr}

HTML 속성이 해당 값을 HTML 특성으로 다시 DOM에 반영하는 것은 흔한 일입니다.
예를 들어, `hidden` 또는 `id`의 값이 JS에서 변경된 경우:


    div.id = 'my-id';
    div.hidden = true;
    

값이 속성으로 라이브 DOM에 적용됩니다.


    <div id="my-id" hidden>
    

이를 '[속성을 특성에 반영한다](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)'고 합니다. HTML의 거의 모든 속성이 이를 수행합니다. 그 이유는 무엇일까요? 속성은 요소를
선언적으로 구성하는 데 유용하며 접근성 및 CSS 선택기와 같은 특정 API는 작업하는 데 속성을 사용합니다.

속성을 반영하는 것은 **요소의 DOM
표현이 해당 자바스크립트 상태와 동기화된 상태를 유지**하도록 하려는 모든 경우에 유용합니다. 속성을 반영해야 할 수 있는
한 가지 이유는 JS 상태가 변경될 때 사용자 정의 스타일 지정이 적용되기 때문입니다.

앞서 설명한 `<app-drawer>`를 떠올려 보세요. 이 구성 요소의 소비자는 이 구성 요소를 서서히 사라지게 하거나
이 구성 요소가 비활성화되었을 때 사용자 상호작용을 방지하기를 원할 것입니다.


    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

`disabled` 속성이 JS에서 변경될 때에는 사용자 선택기가 일치하도록 해당 특성이
DOM에 추가되기를 원합니다. 이 요소는 값을 동일한 이름의 속성에 반영하여
이 동작을 제공할 수 있습니다.


    ...
    
    get disabled() {
      return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
      // Reflect the value of `disabled` as an attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.toggleDrawer();
    }
    

### 속성에 대한 변경 내용 확인 {: #attrchanges}

HTML 속성은 사용자가 초기 상태를 선언할 수 있는 간편한 방법입니다.


    <app-drawer open disabled></app-drawer>
    

요소는 `attributeChangedCallback`을 정의함으로써 속성 변경에 반응할 수 있습니다.
브라우저는 `observedAttributes` 배열에 나열된 속성이 변경될 때마다 이 메서드를 호출합니다.


    class AppDrawer extends HTMLElement {
      ...
    
      static get observedAttributes() {
        return ['disabled', 'open'];
      }
    
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
      }
    }
    

이 예에서는 `disabled` 속성이 변경될 때
`<app-drawer>`에 대한 추가 속성을 설정합니다. 여기서 이 작업을 수행하지 않더라도
**`attributeChangedCallback`을 사용하여 JS 속성이 해당 특성과 동기화된 상태를 유지**하도록 할 수 있습니다.

## 요소 업그레이드 {: #upgrades}

### 점진적으로 개선되는 HTML

앞서 `customElements.define()`을 호출하여 사용자설정 요소가 정의되는 것을 살펴보았습니다.
하지만 이것이 사용자설정 요소를 한 번에 정의하고 등록해야 한다는 것을 의미하지는 않습니다.

**사용자설정 요소는 해당 정의가 등록되기 _전에_ 사용할 수 있습니다**.

점진적인 개선은 사용자설정 요소의 한 기능입니다. 다시 말해서, 페이지에 여러 `<app-drawer>` 요소를 선언해 두고 한참이 지날 때까지 `customElements.define('app-drawer', ...)`를 호출하지 않아도 됩니다. 이는 브라우저가 [알 수 없는 태그](#unknown) 덕분에 잠재적인 사용자설정 요소를 각각 다르게 처리하기 때문입니다. `define()`을 호출하고 기존 요소에 클래스 정의를 부여하는 프로세스를 '요소 업그레이드'라고 합니다.

태그 이름이 언제 정의되었는지를 확인하려면 `window.customElements.whenDefined()`를 사용하면 됩니다.
이는 요소가 정의된 시간을 확인하는 프라미스를 반환합니다.


    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**예** - 하위 요소 집합이 업그레이드될 때까지 작업 지연


    <share-buttons>
      <social-button type="twitter"><a href="...">Twitter</a></social-button>
      <social-button type="fb"><a href="...">Facebook</a></social-button>
      <social-button type="plus"><a href="...">G+</a></social-button>
    </share-buttons>
    


    // Fetch all the children of <share-buttons> that are not defined yet.
    let undefinedButtons = buttons.querySelectorAll(':not(:defined)');
    
    let promises = [...undefinedButtons].map(socialButton => {
      return customElements.whenDefined(socialButton.localName);
    ));
    
    // Wait for all the social-buttons to be upgraded.
    Promise.all(promises).then(() => {
      // All social-button children are ready.
    });
    

참고: 사용자설정 요소는 정의되기 전에는 불확실한 상태라고 생각합니다. [사양](https://dom.spec.whatwg.org/#concept-element-custom-element-state)에서 요소의 상태를 'undefined', 'uncustomized' 또는 'custom'으로 정의합니다. `<div>`와 같은 기본 제공 요소는 항상 'defined'입니다.

## 요소로 정의되는 콘텐츠 {: #addingmarkup}

사용자설정 요소는 요소 코드 안에 DOM API를 사용하여 자체 콘텐츠를 관리할 수 있습니다. [반응](#reactions)이 이에 유용합니다.

**예** - 일부 기본 HTML을 사용하여 요소 생성:

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
이 태그를 선언하면 다음이 생성됩니다.

    <x-foo-with-markup>
     <b>I'm an x-foo-with-markup!</b>
    </x-foo-with-markup>

{% framebox height="70px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}
.demoarea::before {
  display: block;
  content: 'DEMO';
}
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-with-markup', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

참고: 요소의 하위 항목을 새 콘텐츠로 덮어쓰는 것은 예상되지 않는 동작이므로 일반적으로 그리 좋은 방법이 아닙니다. 사용자는 자신의 마크업을 버려야 한다는 것에 놀랄 것입니다. 요소로 정의되는 콘텐츠를 추가하는 더 좋은 방법은 Shadow DOM을 사용하는 것입니다. 이에 대해서는 다음에 설명하겠습니다.

### Shadow DOM을 사용하는 요소 생성 {: #shadowdom}

참고: 이 문서에서는 [Shadow DOM][sd_spec]의 기능에 대해 다루지 않지만,
이는 사용자설정 요소와 함께 사용할 수 있는 강력한 API입니다. Shadow DOM은 그 자체만으로
컴퍼지션 도구입니다. 사용자설정 요소와 함께 사용하면 마법같은 일이 벌어집니다.


Shadow DOM은 요소가 페이지의 나머지 요소와 별개인
DOM 집합을 소유하고, 렌더링하고, 이에 대한 스타일을 지정할 수 있는 방법을 제공합니다. 단일 태그 안에서
전체 앱을 숨겨버릴 수도 있습니다.


    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

사용자설정 요소에서 Shadow DOM을 사용하려면 `constructor` 안에서 `this.attachShadow`를 호출하세요.

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>:host { ... }</style> <!-- look ma, scoped styles -->
          <b>I'm in shadow dom!</b>
          <slot></slot>
        `;
      }
      ...
    });

사용 예:

    <x-foo-shadowdom>
      <p><b>User's</b> custom text</p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>I'm in shadow dom!</b>
      <slot></slot>
    </x-foo-shadowdom>

{% framebox height="130px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-shadowdom', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <b>I'm in shadow dom!</b>
        <slot></slot>
      `;
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### `<template>` {: #fromtemplate}에서 요소 생성

이러한 개념에 익숙치 않은 경우 [`<template>` 요소](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)를 사용하면 파싱된 후 페이지 로드 시 비활성화 상태였다가 나중에 런타임에 활성화될 수 있는 DOM 프래그먼트를 선언할 수 있습니다. 웹 구성 요소 모음에 또 다른 원시 API가 있습니다. **템플릿은 사용자설정 요소의 구조를 선언하는 데 사용할 수 있는 이상적인 자리표시자입니다**.

**예:** `<template>`를 통해 생성된 Shadow DOM 콘텐츠를 포함하는 요소 등록:

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
    </template>
    
    <script>
      customElements.define('x-foo-from-template', class extends HTMLElement {
        constructor() {
          super(); // always call super() first in the ctor.
          let shadowRoot = this.attachShadow({mode: 'open'});
          const t = document.querySelector('#x-foo-from-template');
          const instance = t.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
        ...
      });
    </script>
    

이 몇 줄의 코드는 강력한 효과를 제공합니다. 핵심 사항에 대해 살펴보도록 하겠습니다.

1. HTML에 새로운 요소 `<x-foo-from-template>`를 정의합니다.
2. 이 요소의 Shadow DOM이 `<template>`에서 생성됩니다.
3. Shadow DOM 덕분에 이 요소의 DOM은 이 요소에 로컬입니다.
4. Shadow DOM 덕분에 이 요소의 내부 CSS의 범위는 이 요소로 지정됩니다.

{% framebox height="100px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: orange; }</style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      shadowRoot.appendChild(t.content.cloneNode(true));
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

## 사용자설정 요소 스타일 지정 {: #styling}

개발자 요소가 Shadow DOM을 사용하여 자체 스타일을 정의하더라도 사용자가
자신의 페이지에서 이러한 사용자설정 요소의 스타일을 지정할 수 있습니다. 이를 '사용자 정의 스타일'이라고 합니다.


    <!-- user-defined styling -->
    <style>
      app-drawer {
        display: flex;
      }
      panel-item {
        transition: opacity 400ms ease-in-out;
        opacity: 0.3;
        flex: 1;
        text-align: center;
        border-radius: 50%;
      }
      panel-item:hover {
        opacity: 1.0;
        background: rgb(255, 0, 255);
        color: white;
      }
      app-panel > panel-item {
        padding: 5px;
        list-style: none;
        margin: 0 7px;
      }
    </style>
    
    <app-drawer>
      <panel-item>Do</panel-item>
      <panel-item>Re</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

여러분은 요소의 스타일이
Shadow DOM 내에 정의된 경우 CSS 특정성이 어떤 식으로 실현되는지 자문할 수 있습니다. 특정성 측면에서는 사용자 스타일이 더 뛰어납니다.
사용자 스타일은 항상 요소에서 정의되는 스타일보다 우선합니다. [Shadow DOM을 사용하는 요소 생성](#shadowdom) 관련 섹션을 참조하세요.

### 등록되지 않은 요소의 스타일 사전 지정 {: #prestyle}

요소가 [업그레이드](#upgrades)되기 전에 `:defined` 의사 클래스를 사용하여 CSS에서 요소를 대상으로 지정할 수 있습니다.
이는 구성 요소의 스타일을 사전 지정하는 데 유용합니다. 예를 들어, 정의되지 않은 구성 요소를 숨겼다가
정의되었을 때 페이드 인하는 방식으로 레이아웃이나 기타 시각적 FOUC를
차단하고자 할 수 있습니다.

**예** - 정의되기 전에 `<app-drawer>` 숨기기:


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

`<app-drawer>`가 정의되면 선택기(`app-drawer:not(:defined)`)가
더 이상 일치하지 않습니다.

## 기타 세부정보 {: #details}

### 알 수 없는 요소 및 정의되지 않은 사용자설정 요소 비교 {: #unknown}

HTML은 사용하기가 까다롭지 않고 유연합니다. 예를 들어, 페이지에 `<randomtagthatdoesntexist>`를 선언하면 브라우저가 이를 완전히 수락합니다. 비표준 태그가 왜 작동할까요? 그 해답은 [HTML 사양](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)이 이를 허용하기 때문입니다. 사양에 정의되지 않은 요소는 `HTMLUnknownElement`로 파싱됩니다.

이는 사용자설정 요소에는 적용되지 않습니다. 잠재적인 사용자설정 요소는 유효한 이름('-' 포함)으로 생성된 경우
`HTMLElement`로 파싱됩니다. 이에 대해서는 사용자설정 요소를 지원하는 브라우저에서 확인할 수 있습니다. 콘솔을 실행합니다. (<span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span>, 또는 Mac의 경우 <span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span>를 누릅니다.) 그런 후 다음 코드 줄을 붙여넣습니다.


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## API 참조

전역적 `customElements`는 사용자설정 요소를 사용하기 위한 유용한 메서드를 정의합니다.

**`define(tagName, constructor, options)`**

브라우저에서 새로운 사용자설정 요소를 정의합니다.

예


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

유효한 사용자설정 요소의 태그 이름이 지정된 경우, 요소의 생성자를 반환합니다. 요소 정의가 등록되지 않은 경우
`undefined`를 반환합니다.

예


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

사용자설정 요소가 정의된 경우 이를 확인하는 프라미스를 반환합니다. 요소가
이미 정의된 경우 즉시 확인합니다. 태그 이름이 유효한
사용자설정 요소 이름이 아닌 경우 거부합니다.

예


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## 지금까지의 발자취 및 브라우저 지원 {: #historysupport}

지난 몇 년 동안 웹 구성 요소의 발자취를 따라가 보면
Chrome 36+에서 `customElements.define()` 대신 `document.registerElement()`를
사용하는 Custom Elements API 버전을 구현했음을 알 수 있을 것입니다. 이 버전은 현재 v0라고 하는 더 이상 사용되지 않는 표준
버전으로 간주됩니다. `customElements.define()`은 브라우저
공급업체가 이제 막 구현하기 시작한 따끈따끈한 최신 기능입니다. 이를 사용자설정 요소 v1이라고 합니다.

구식 v0 사양에 관심이 있는 경우 [html5rocks 문서](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }를 확인하세요.

### 브라우저 지원

Chrome 54([상태](https://www.chromestatus.com/features/4696261944934400))에는 사용자설정 요소 v1이 있습니다. Safari는 [프로토타입 제작을 시작](https://bugs.webkit.org/show_bug.cgi?id=150225)했으며 WebKit nightly에서 API를 테스트할 수 있습니다. Edge는 [프로토타입 제작을 시작](https://twitter.com/AaronGustafson/status/717028669948977153)했습니다. Mozilla는 구현 관련 [해결되지 않은 버그](https://bugzilla.mozilla.org/show_bug.cgi?id=889230) 문제가 있습니다.

사용자설정 요소를 검색하려면 `window.customElements`가 있는지 확인합니다.


    const supportsCustomElementsV1 = 'customElements' in window;
    

#### 폴리필(Polyfill) {: #polyfill}

브라우저 지원이 광범위하게 제공될 때까지 [폴리필](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js)을 사용할 수 있습니다. 

**참고**: `:defined` CSS 의사 클래스를 폴리필할 수는 없습니다.

설치:

    bower install --save webcomponents/custom-elements

사용:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }
    
    // Lazy load the polyfill if necessary.
    if (!supportsCustomElementsV1) {
      loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
      });
    } else {
      // Native support. Good to go.
    }
    

## 결론

사용자설정 요소는 브라우저에서 새로운 HTML 태그를 정의하고 재사용 가능한
구성 요소를 생성하는 데 사용할 수 있는 새로운 도구입니다. 사용자설정 요소를 다른 신규 플랫폼 원시 기능(예: Shadow DOM) 및 `<template>`과 함께 사용하면 다음과 같이 웹 구성 요소의 장대한 그림을 볼 수 있습니다.

- 재사용 가능한 구성 요소를 생성하고 확장하기 위한 다중 브라우저 지원(웹 표준)
- 시작하는 데 라이브러리나 프레임워크가 필요하지 않음. Vanilla JS/HTML FTW!
- 익숙한 프로그래밍 모델 제공. 이를 테면 DOM/CSS/HTML
- 다른 신규 플랫폼 기능(Shadow DOM, `<template>`, CSS 사용자설정 속성 등)과 호환
- 브라우저의 DevTools와 완벽하게 통합됨
- 기존 접근성 기능 활용

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
