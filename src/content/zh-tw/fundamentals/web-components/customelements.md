project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:自定義元素允許網絡開發者定義新的 HTML 標記、擴展現有標記並創建可重用的網絡組件。

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-06-28 #}

# 自定義元素 v1：可重用網絡組件 {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

藉助[自定義元素][spec]，網絡開發者可以**創建新的 HTML 標記**、擴展現有 HTML 標記，或者擴展其他開發者編寫的組件。API 是[網絡組件](http://webcomponents.org/){: .external }的基礎。它提供了基於網絡標準來使用原生 JS/HTML/CSS 創建可重用組件的方法。其結果是代碼更精簡且模塊化，並且在我們的應用中的可重用性更好。

## 簡介{: #intro}

Note: 本文說明新的<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">自定義元素 v1 規範</a>。如果您有自定義元素的使用經驗，則應該瞭解<a href="https://www.chromestatus.com/features/4642138092470272">隨 Chrome 33 提供的 v0 版</a>。這些概念是相同的，只不過 v1 規範的 API 存在一些重要差異。請繼續閱讀，瞭解新的內容。或者參閱<a href="#historysupport">歷史記錄和瀏覽器支持</a>，瞭解詳細信息。

瀏覽器提供了一個用於實現結構化網絡應用的良好工具。該工具稱爲 HTML。
您可能已經對它有所瞭解！它是一種聲明式、可移植、受廣泛支持且易於使用的工具。HTML 雖然很偉大，但其詞彙和可擴展性卻相當有限。[HTML 現行標準](https://html.spec.whatwg.org/multipage/){: .external }缺乏自動關聯 JS 行爲和標記的方法，直到今天，情況纔有所改觀。

自定義元素使 HTML 變得現代化；補充了缺少的部件，並將結構與行爲相結合。
如果 HTML 無法爲問題提供解決方案，我們可以創建自定義元素來解決。
**自定義元素在保留 HTML 優點的同時爲瀏覽器帶來新功能**。

## 定義新元素{: #define}

要定義新的 HTML 元素，我們需要 JavaScript 的幫助！

`customElements` 全局性用於定義自定義元素，並讓瀏覽器學習新的標記。
以需要創建的標記名稱調用 `customElements.define()`，並使用 JavaScript`class` 擴展基礎 `HTMLElement`。


**示例** - 定義一個移動抽屜面板 `<app-drawer>`：


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);

    // Or use an anonymous class if you don't want a named function Object() { [native code] } in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});


示例用法：


    <app-drawer></app-drawer>


需要記住的是，自定義元素與 `<div>` 或任何其他元素的使用沒有區別。可以在頁面上聲明 JavaScript 動態創建的實例，可添加事件偵聽器，諸如此類。繼續閱讀，查看更多示例。

### 定義元素的 JavaScript API{: #jsapi}

自定義元素的功能使用 ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 來定義，它擴展了 `HTMLElement`。擴展`HTMLElement` 可確保自定義元素繼承完整的 DOM API，並且添加到類的任何屬性/方法都將成爲元素 DOM 接口的一部分。實際上，可使用類來爲標記創建**公共 JavaScript API**。




**示例：** - 定義 DOM 的 `<app-drawer>` 接口：


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

      // Can define function Object() { [native code] } arguments if you wish.
      function Object() { [native code] }() {
        // If you define a constructor, always call super() first!
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


在本例中，我們創建了一個具有`open` 屬性、`disabled` 屬性和`toggleDrawer()` 方法的抽屜式導航欄。
它還[以 HTML 屬性來反映屬性](#reflectattr)。

自定義元素有一個超讚功能，即：類定義中的**`this` 引用 DOM 元素自身**，亦即類的實例。
在本例中，`this` 是指 `<app-drawer>`。這 (😉) 就是元素向自身添加 `click` 偵聽器的方式！您不限於事件偵聽器。完整的 DOM API 在元素代碼內提供。使用 `this` 來訪問元素屬性、檢驗子項 (`this.children`) 和查詢節點 (`this.querySelectorAll('.items')`) 等。

**有關創建自定義元素的規則**

1. 自定義元素的名稱**必須包含短橫線 (-)**。因此，`<x-tags>`、`<my-element>` 和 `<my-awesome-app>` 等均爲有效名稱，而 `<tabs>` 和 `<foo_bar>` 則爲無效名稱。這一要求使得 HTML 解析器能夠區分自定義元素和常規元素。它還可確保向 HTML 添加新標記時的向前兼容性。
2. 您不能多次註冊同一標記。否則，將產生 `DOMException`。讓瀏覽器瞭解新標記後，它就這樣定了下來。您不能撤回。
3. 自定義元素不能自我封閉，因爲 HTML 僅允許[少數元素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)自我封閉。必須編寫封閉標記 (<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>)。

## 擴展元素{: #extend}

Custom Elements API 對創建新的 HTML 元素很有用，但它也可用於擴展其他自定義元素，甚至是瀏覽器的內置 HTML。


### 擴展自定義元素{: #extendcustomeel}

擴展其他自定義元素可通過擴展其類定義來實現。

**示例** - 創建擴展 `<app-drawer>` 的 `<fancy-app-drawer>`：


    class FancyDrawer extends AppDrawer {
      function Object() { [native code] }() {
        super(); // always call super() first in the constructor. This also calls the extended class' constructor.
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


### 擴展原生 HTML 元素{: #extendhtml}

假定您希望創建一個漂亮的 `<button>`。除了複製 `<button>` 的行爲和功能，更好的選擇是使用自定義元素逐漸增補現有元素。


**自定義內置元素**是用於擴展某個瀏覽器內置 HTML 標記的自定義元素。
擴展現有元素的主要好處是能獲得其所有功能（DOM 屬性、方法、無障礙功能）。
編寫 [Progressive Web App](/web/progressive-web-apps/) 的最佳方法**是逐漸增補現有 HTML 元素**。

要擴展元素，您需要創建繼承自正確 DOM 接口的類定義。
例如，擴展 `<button>` 的自定義元素需要從 `HTMLButtonElement` 而不是 `HTMLElement` 繼承。
同樣，擴展 `<img>` 的元素需要擴展 `HTMLImageElement`。


**示例** - 擴展 `<button>`：


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      function Object() { [native code] }() {
        super(); // always call super() first in the constructor.
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


擴展原生元素時，對 `define()` 的調用會稍有不同。所需的第三個參數告知瀏覽器要擴展的標記。這很有必要，因爲許多 HTML 標記均使用同一 DOM 接口。例如，`<section>`、`<address>` 和 `<em>`（以及其他）都使用 `HTMLElement`；`<q>` 和 `<blockquote>` 則使用 `HTMLQuoteElement`；等等。指定 `{extends: 'blockquote'}` 可讓瀏覽器知道您創建的是增強的 `<blockquote>` 而不是 `<q>`。有關 HTML DOM 接口的完整列表，請參閱 [HTML 規範](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)。


Note: 擴展 `HTMLButtonElement` 可讓我們的花式按鈕獲得 `<button>` 的所有 DOM 屬性/方法。這樣，我們無需自己實現即可獲得諸多功能：`disabled` 屬性、`click()` 方法、`keydown` 偵聽器、`tabindex` 管理等。但是，我們可以使用自定義功能（即 `drawRipple()` 方法）來逐漸增補 `<button>`。代碼更少，可重用性更高！

自定義內置元素的用戶有多種方法來使用該元素。他們可以通過在原生標記上添加 `is=""` 屬性來聲明：



    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Fancy button!</button>


在 JavaScript 中創建實例：


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);


或者使用 `new` 運算符：


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;


此處爲擴展 `<img>` 的另一個例子。

**示例** - 擴展 `<img>`：


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      function Object() { [native code] }(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});


用戶聲明此組件爲：


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">


或者在 JavaScript 中創建實例：


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass constructor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);


Note: 某些瀏覽器不推薦使用  <code>is=""</code> 語法。這對可訪問性和漸進式增強都不是好消息。如果您認爲擴展原生 HTML 元素很有用，請<a href='https://github.com/w3c/webcomponents/issues/509'>在 Github 上</a>發表您的觀點。

## 自定義元素響應{: #reactions}

自定義元素可以定義特殊生命週期鉤子，以便在其存續的特定時間內運行代碼。
這稱爲**自定義元素響應**。

<table>
  <thead>
    <tr>
      <th>名稱</th>
      <th>調用時機</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>function Object() { [native code] }</code></td>
      <td>創建或<a href="#upgrades">升級</a>元素的一個實例。用於初始化狀態、設置事件偵聽器或<a href="#shadowdom">創建 Shadow DOM</a>。參見<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">規範</a>，瞭解可在  <code>function Object() { [native code] }</code> 中完成的操作的相關限制。</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>元素每次插入到 DOM 時都會調用。用於運行安裝代碼，例如獲取資源或渲染。一般來說，您應將工作延遲至合適時機執行。</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>元素每次從 DOM 中移除時都會調用。用於運行清理代碼（例如移除事件偵聽器等）。</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>屬性添加、移除、更新或替換。解析器創建元素時，或者<a href="#upgrades">升級</a>時，也會調用它來獲取初始值。<b>Note: </b>僅  <code>observedAttributes</code> 屬性中列出的特性纔會收到此回調。</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>自定義元素被移入新的  <code>document</code>（例如，有人調用了  <code>document.adoptNode(el)</code>）。</td>
    </tr>
  </tbody>
</table>

瀏覽器對在 `attributeChangedCallback()` 數組中添加到白名單的任何屬性調用 `observedAttributes`（請參閱[保留對屬性的更改](#attrchanges)）。實際上，這是一項性能優化。當用戶更改一個通用屬性（如 `style` 或 `class`）時，您不希望出現大量的回調。


**響應回調是同步的**。如果有人對您的元素調用 `el.setAttribute(...)`，瀏覽器將立即調用 `attributeChangedCallback()`。
同理，從 DOM 中移除元素（例如用戶調用 `el.remove()`）後，您會立即收到 `disconnectedCallback()`。



**示例：**向 `<app-drawer>` 中添加自定義元素響應：


    class AppDrawer extends HTMLElement {
      function Object() { [native code] }() {
        super(); // always call super() first in the constructor.
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


必要時應定義響應。如果您的元素足夠複雜，並在 `connectedCallback()` 中打開 IndexedDB 的連接，請在 `disconnectedCallback()` 中執行所需清理工作。但必須小心！您不能認爲您的元素任何時候都能從 DOM 中正常移除。例如，如果用戶關閉了標籤，`disconnectedCallback()` 將無法調用。

**示例：**將自定義元素移動到另一文檔，觀察其 `adoptedCallback()`：


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


##  屬性和特性

### 將屬性 (property) 映射爲特性 (attribute) {: #reflectattr}

HTML 屬性通常會將其值以 HTML 特性的形式映射回 DOM。例如，如果 `hidden` 或 `id` 的值在 JS 中發生變更：



    div.id = 'my-id';
    div.hidden = true;


值將以特性的形式應用於活動 DOM：


    <div id="my-id" hidden>


這稱爲“[將屬性映射爲特性](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)”。幾乎所有的 HTML 屬性都會如此。爲何？特性也可用於以聲明方式配置元素，且無障礙功能和 CSS 選擇器等某些 API 依賴於特性工作。


如果您想要**讓元素的 DOM 狀態與其 JavaScript 狀態保持同步**，映射屬性非常有用。
您可能想要映射屬性的另一個原因是，用戶定義的樣式在 JS 狀態變更時應用。


回到我們的 `<app-drawer>` 例子。此組件的用戶可能會希望其灰色顯示和/或停用，以避免用戶交互：



    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }


`disabled` 屬性在 JS 中發生變更時，我們希望該特性能添加到 DOM，以便用戶選擇器能匹配。
元素可通過將值映射到具有同一名稱的特性上來提供該行爲：



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


### 保留對屬性的更改 {: #attrchanges}

HTML 屬性可方便地讓用戶聲明初始狀態：


    <app-drawer open disabled></app-drawer>


元素可通過定義 `attributeChangedCallback` 來對屬性的更改作出響應。對於 `observedAttributes` 數組中列出的每一屬性更改，瀏覽器都將調用此方法。



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


在示例中，我們在 `<app-drawer>` 屬性發生變化時對 `disabled` 設置額外的屬性。
雖然我們這裏沒有這樣做，您也可以**使用 `attributeChangedCallback` 來讓 JS 屬性與其屬性同步**。


## 元素升級 {: #upgrades}

### 漸進式增強 HTML

我們已經瞭解到，自定義元素通過調用 `customElements.define()` 進行定義。但這不意味着您需要一次性定義並註冊自定義元素。


**自定義元素可以在定義註冊之前使用**。

漸進式增強是自定義元素的一項特點。換句話說，您可以在頁面聲明多個 `<app-drawer>` 元素，並在等待較長的時間之後才調用 `customElements.define('app-drawer', ...)`。之所以會這樣，原因是瀏覽器會因爲存在[未知標記](#unknown)而採用不同方式處理潛在自定義元素。調用 `define()` 並將類定義賦予現有元素的過程稱爲“元素升級”。

要了解標記名稱何時獲得定義，可以使用 `window.customElements.whenDefined()`。它提供可在元素獲得定義時進行解析的 Promise。



    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });


**示例** - 推遲生效時間，直至一組子元素升級


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


Note: 我將未定義的自定義元素視爲處於中間過渡狀態。[規範](https://dom.spec.whatwg.org/#concept-element-custom-element-state)將元素的狀態劃分爲“未定義”、“未自定義”或“自定義”。類似於 `<div>` 的內置元素的狀態始終爲“已定義”。

##  元素定義的內容{: #addingmarkup}

自定義元素通過在元素代碼內部使用 DOM API 來管理其自身內容。[響應](#reactions)在這方面可起到作用。

**示例** - 使用一些默認 HTML 來創建元素：

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });

Declaring this tag will produce:

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

Note: 以新內容覆蓋元素的子項並非一種好的做法，因爲這樣做會不符合設想。用戶會因爲標記被捨棄而感到意外。添加元素定義內容的更好做法是使用 shadow DOM，我們接下來將討論這一主題。

### 創建使用 Shadow DOM 的元素{: #shadowdom}

Note: 我不會在本文中說明 [Shadow DOM][sd_spec] 的具體功能，但它的確是一種強大的 API，可與自定義元素結合使用。
Shadow DOM 本身是一種組合工具。
它在與自定義元素結合使用時，可產生神奇的效果。


Shadow DOM 提供了一種方法，可讓元素以獨立於頁面其餘部分的方式擁有和渲染 DOM 並設置其樣式。
您甚至可以使用一個標記來隱藏整個應用：



    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>


要在自定義元素中使用 Shadow DOM，可在 `function Object() { [native code] }` 內調用 `this.attachShadow`。

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      function Object() { [native code] }() {
        super(); // always call super() first in the constructor.

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

示例用法：

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
    function Object() { [native code] }() {
      super(); // always call super() first in the constructor.
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

### 通過 `<template>` 創建元素 {: #fromtemplate}

對於不熟悉的開發者而言，[`<template>` 元素](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)讓您能聲明 DOM 的片段，該片段在頁面加載時解析並駐留，且於後續運行時激活。它是網頁組件家族中的另一 API 原語。**模板是聲明自定義元素結構的理想之選**。

**示例：**註冊帶有使用 `<template>` 創建的 Shadow DOM 內容的元素：

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
    </template>

    <script>
      customElements.define('x-foo-from-template', class extends HTMLElement {
        function Object() { [native code] }() {
          super(); // always call super() first in the constructor.
          let shadowRoot = this.attachShadow({mode: 'open'});
          const t = document.querySelector('#x-foo-from-template');
          const instance = t.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
        ...
      });
    </script>


這幾行代碼實現了豐富的功能。讓我們瞭解一些主要方面：

1. 我們在 HTML 中定義新的元素：`<x-foo-from-template>`
2. 元素的 Shadow DOM 使用 `<template>` 創建
3. 由於是 Shadow DOM，元素的 DOM 侷限於元素本地
4. 由於是 Shadow DOM，元素的內部 CSS 作用域限於元素內

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
  <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    function Object() { [native code] }() {
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

##  設置自定義元素樣式{: #styling}

即使您的元素使用 Shadow DOM 定義了自身的樣式，用戶仍可通過其自己的頁面來設置自定義元素的樣式。
它們稱爲“用戶定義樣式”。


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


您可能會問自己，如果元素在 Shadow DOM 中定義了樣式，CSS 特異性如何起作用。
在特異性方面，用戶樣式優先。它們始終優先於元素定義的樣式。
請參見[創建使用 Shadow DOM 的元素](#shadowdom)。

### 預設置未註冊元素的樣式{: #prestyle}

在[升級](#upgrades)元素之前，您可以在 CSS 中使用 `:defined` 僞類來將其定義爲目標。這對於預設置元素樣式而言很有用。
例如，您可能希望通過隱藏未定義組件並讓其消失，避免它們在獲得定義時產生布局或其他視覺 FOUC。



**示例** - 在定義前隱藏 `<app-drawer>`：


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }


在 `<app-drawer>` 獲得定義後，選擇器 (`app-drawer:not(:defined)`) 不再匹配。


## 其他詳情 {: #details}

### 未知元素與未定義的自定義元素{: #unknown}

HTML 使用起來非常寬鬆和靈活。例如，在頁面上聲明 `<randomtagthatdoesntexist>`，瀏覽器將非常樂意接受它。爲什麼非標準標記可以生效？答案在於 [HTML 規範](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)允許這樣。規範沒有定義的元素作爲 `HTMLUnknownElement` 進行解析。

自定義元素則並非如此。如果在創建時使用有效的名稱（包含“-”），則潛在的自定義元素將解析爲 `HTMLElement`。
您可以在支持自定義元素的瀏覽器中核實這一點。打開控制檯：<span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span>（或者在 Mac 上，<span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span>）並粘貼下列代碼行：


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true

    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true


## API 參考

全局性 `customElements` 定義了處理自定義元素的有用方法。

**`define(tagName, function Object() { [native code] }, options)`**

在瀏覽器中定義新的自定義元素。

示例


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});


**`get(tagName)`**

在給定有效自定義元素標記名稱的情況下，返回元素的構造函數。如果沒有註冊元素定義，則返回 `undefined`。


示例


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();


**`whenDefined(tagName)`**

如果定義了自定義元素，則返回可解析的 Promise。如果元素已定義，則立即得到解析。
如果標記名稱並非有效自定義元素名稱，則拒絕


示例


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });


## 歷史記錄和瀏覽器支持 {: #historysupport}

如果您最近幾年持續關注網絡組件，您應知道 Chrome 36+ 實施的自定義元素 API 版本使用了 `document.registerElement()` 而不是 `customElements.define()`。但前者是標準的棄用版本，稱爲 v0。`customElements.define()` 成爲現行標準並逐步獲得各大瀏覽器廠商的支持。這稱爲自定義元素 v1。

如果您恰好對舊版 v0 規範感興趣，可以看看 [html5rocks 文章](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }。

### 瀏覽器支持

Chrome 54（[狀態](https://www.chromestatus.com/features/4696261944934400)）包含自定義元素 v1。Safari 已[開始提供原型](https://bugs.webkit.org/show_bug.cgi?id=150225)，可以在 WebKit 中對該 API 進行夜間測試。Edge 已[開始提供原型](https://twitter.com/AaronGustafson/status/717028669948977153)。Mozilla 需要處理一個[未解決的錯誤](https://bugzilla.mozilla.org/show_bug.cgi?id=889230)。

要檢測自定義元素功能，檢測是否存在 `window.customElements`：


    const supportsCustomElementsV1 = 'customElements' in window;


#### Polyfill {: #polyfill}

在瀏覽器提供廣泛支持前，可以暫時使用 [polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js)。

**注**：無法對 `:defined` CSS 僞類執行 polyfill。

安裝方法：

    bower install --save webcomponents/custom-elements

用法：


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
      // Native support.Good to go.
    }


##  結論

自定義元素提供了一種新工具，可讓我們在瀏覽器中定義新 HTML 標記並創建可重用的組件。
將它們與 Shadow DOM 和 `<template>` 等新平臺原語結合使用，我們可開始實現網絡組件的宏大圖景：

- 創建和擴展可重複使用組件的跨瀏覽器（網絡標準）。
- 無需庫或框架即可使用。原生 JS/HTML 威武！
- 提供熟悉的編程模型。僅需使用 DOM/CSS/HTML。
- 與其他網絡平臺功能良好匹配（Shadow DOM、`<template>`、CSS 自定義屬性等）
- 與瀏覽器的 DevTools 緊密集成。
- 利用現有的無障礙功能。

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
