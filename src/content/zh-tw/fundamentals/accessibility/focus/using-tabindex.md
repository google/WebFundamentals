project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 使用 tabindex 修改 DOM 順序


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 使用 tabindex {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



原生元素 DOM 位置提供的默認 Tab 鍵順序雖然方便，但有時您需要修改 Tab 鍵順序，而在 HTML 中對元素進行物理移動並不總是最優解決方案，甚至缺乏可行性。在此類情況下，您可以利用 `tabindex` HTML 屬性來顯式設置元素的 Tab 鍵位置。


`tabindex` 可應用於任何元素並接受某一範圍的整型值，但不一定在每個元素上都有用。
您可以利用 `tabindex` 爲可聚焦頁面元素指定顯式順序、在 Tab 鍵順序中插入原本不可聚焦的元素以及從 Tab 鍵順序中移除元素。


例如：`tabindex="0"`：在自然 Tab 鍵順序中插入一個元素。可通過按 `Tab` 鍵聚焦該元素，也可通過調用其 `focus()` 方法聚焦該元素



    <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>

{% framebox height="60px" %}
<style>
  custom-button {
    margin: 10px;
  }
</style>
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`：從自然 Tab 鍵順序中移除某個元素，但仍可通過調用其 `focus()` 方法聚焦該元素


    <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
    <button onclick="foo.focus();">Focus my sibling</button>

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`：只要 tabindex 大於 0，就會將該元素跳至自然 Tab 鍵順序的最前面。
如果有多個元素的 tabindex 均大於 0，Tab 鍵順序將以大於 0 的最小值爲起點，從小到大排序。使用大於 0 的 tabindex 被視爲**反面模式**。


    <button>I should be first</button>
    <button>And I should be second</button>
    <button tabindex="5">But I jumped to the front!</button>

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

這在標頭、圖像或文章標題之類的非輸入元素上體現得尤爲明顯。
爲上述類型的元素添加 `tabindex` 會適得其反。如有可能，最好適當安排源代碼，讓 DOM 序列具有符合邏輯的 Tab 鍵順序。如果您一定要使用 `tabindex`，請將其使用範圍限定在按鈕、標籤、下拉列表和文本字段之類的自定義交互式控件；也就是說，用戶可能需要提供輸入的元素。



不必擔心屏幕閱讀器用戶會錯過重要內容，因爲它沒有 `tabindex`。
即使內容非常重要（例如圖像），如果並非用戶可以交互的對象，也沒有理由將其設置爲可聚焦。只要您提供充分的 `alt` 屬性支持（我們不久將會介紹），屏幕閱讀器用戶仍可理解圖像的內容。


## 管理頁面一級的焦點

在下面這種情境中，`tabindex` 不僅有用，還必不可少。您可能正在構建一個強健的單一頁面，其中包含不同的內容區域，這些區域並非全都同時可見。在這種頁面中，點擊某個導航鏈接時，即使不刷新頁面也會更改可見內容。


發生這種情況時，您可能需要找到選定的內容區域，將其 `tabindex` 指定爲 -1，使其不出現在自然 Tab 鍵順序中，並調用其 `focus` 方法。這種稱作*管理焦點*的方法可讓用戶的感知上下文與網站的視覺內容保持同步。


## 管理組件中的焦點

更改頁面內容時的焦點管理很重要，但有時需要管理控件一級的焦點（例如，當您構建自定義組件時）。以原生 `select` 元素爲例。它可以獲得基本焦點，但獲得焦點後，即可使用箭頭鍵來顯露其他功能（可選擇的選項）。

如果您構建的是自定義 `select` 元素，一定想顯露同樣類型的行爲，這樣一來，主要依賴鍵盤的用戶就仍可與您的控件進行交互。



    <!-- Focus the element using Tab and use the up/down arrow keys to navigate -->
    <select>
      <option>Aisle seat</option>
      <option>Window seat</option>
      <option>No preference</option>
    </select>

<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>

瞭解需要實現哪些鍵盤行爲可能很困難，但可通過參閱一份文檔獲得幫助。
[無障礙豐富互聯網應用 (ARIA) 製作實踐](https://www.w3.org/TR/wai-aria-practices/){: .external }指南列出了組件類型及其支持的鍵盤操作。我們稍後將對 ARIA 做更詳細的介紹，但目前姑且利用這個指南來幫助我們向新組件添加鍵盤支持。





或許您正在開發一些[自定義元素](/web/fundamentals/getting-started/primers/customelements)，這些元素類似於一組單選按鈕，但採用了您特有的外觀和行爲。




    <radio-group>
      <radio-button>Water</radio-button>
      <radio-button>Coffee</radio-button>
      <radio-button>Tea</radio-button>
      <radio-button>Cola</radio-button>
      <radio-button>Ginger Ale</radio-button>
    </radio-group>

要確定它們需要的鍵盤支持類型，您需要查閱 [ARIA 製作實踐指南](https://www.w3.org/TR/wai-aria-practices/){: .external }。第 2 章包含一個設計模式列表，該列表中有一個[單選按鈕組特性表](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external }，其中包含與新元素匹配度最高的現有元素。



正如您在該表中所見，應該支持的其中一個常見鍵盤行爲是向上/向下/向左/向右箭頭鍵。
要向新組件添加此行爲，我們將採用一種叫做*流動 tabindex* 的方法。


![W3C 規範中有關單選按鈕內容的摘錄](imgs/radio-button.png)

流動 tabindex 通過將除當前活動子項之外所有其他子項的 `tabindex` 設置爲 -1 來發揮作用。


    <radio-group>
      <radio-button tabindex="0">Water</radio-button>
      <radio-button tabindex="-1">Coffee</radio-button>
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

然後，組件使用鍵盤事件偵聽器來確定用戶按下的按鍵；發生按鍵操作時，它將之前聚焦的子項的 `tabindex` 設置爲 -1，將待聚焦子項的 `tabindex` 設置爲 0，並對其調用 focus 方法。




    <radio-group>
      // Assuming the user pressed the down arrow, we'll focus the next available child
      <radio-button tabindex="-1">Water</radio-button>
      <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

當用戶到達最後一個（或第一個，取決於其移動焦點的方向）子項時，將重新循環，再次聚焦第一個（或最後一個）子項。



您可以用下面的已完成示例試一試。在 DevTools 中檢查該元素，觀察 tabindex 從一個單選按鈕到下一單選按鈕的流動情況。


{% framebox height="130px" %}
<style>
  .demo {
    margin-left: 80px;
  }
  radio-button {
    position: relative;
    display: block;
    font-size: 18px;
  }
  radio-button:focus {
    outline: none;
  }
  radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
  radio-button:focus::before {
    box-shadow: 0 0 3px 3px #83BEFF;
  }
  radio-button[aria-checked="true"]::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: red;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
</style>

<div class="demo">
  <radio-group>
    <radio-button>Water</radio-button>
    <radio-button>Coffee</radio-button>
    <radio-button>Tea</radio-button>
    <radio-button>Cola</radio-button>
    <radio-button>Ginger Ale</radio-button>
  </radio-group>
</div>

<script src="https://www.gstatic.com/devrel-devsite/v9dcc115658e2b070ea1ae9baed63d566/developers/js/custom-elements.min.js"></script>

<script>
  class RadioButton extends HTMLElement {
    function Object() { [native code] }() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-checked', false);
    }
  }

  window.customElements.define('radio-button', RadioButton);

  // Define values for keycodes
  const VK_LEFT       = 37;
  const VK_UP         = 38;
  const VK_RIGHT      = 39;
  const VK_DOWN       = 40;

  class RadioGroup extends HTMLElement {
    function Object() { [native code] }() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-button'));

      // Setup initial state
      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeyDown(e) {
      switch(e.keyCode) {

        case VK_UP:
        case VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;

        }

        case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }

      }
    }

    handleClick(e) {
      const idx = this.radios.indexOf(e.target);
      if (idx === -1) {
        return;
      }
      this.selected = idx;
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        // Set the old button to tabindex -1
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', false);
      }

      // Set the new button to tabindex 0 and focus it
      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-group', RadioGroup);
</script>
{% endframebox %}

您可以在 GitHub 上查看[該元素的完整源代碼](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }。



## 模態窗口和鍵盤陷阱

當您管理焦點時，有時會發生進入某種情境後無法退出的情況。
試想有這樣一個自動填充小部件，它試圖管理焦點和捕獲 Tab 鍵行爲，但在它完成操作前會阻止用戶離開。這種情況稱作*鍵盤陷阱*，可能令用戶感到非常懊惱。
Web AIM 檢查清單第 2.1.2 節闡述了這個問題，指出[在任何情況下都不應將鍵盤焦點鎖定或困閉在一個特定頁面元素處](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }。用戶應該只使用鍵盤就能在所有頁面元素中雙向導航。






奇怪的是，有時這一行爲實際上合乎需要，比如在模態窗口中。
正常情況下，顯示模態窗口時，您不希望用戶訪問其後的內容。
您可以添加一個疊層，從視覺上遮蓋頁面，但並不能阻止鍵盤焦點意外地跳轉到模態窗口之外。


![一個請用戶保存其工作的模態窗口](imgs/modal-example.png)

在類似上面這樣的情況下，您可以實現一個暫時鍵盤陷阱，以確保只在顯示模態窗口時困閉焦點，之後在模態窗口關閉時，將焦點恢復到之前聚焦的項目。



>出現過一些有關爲開發者簡化這項工作的提議（包括 `<dialog>` 元素），但它們尚未獲得廣泛的瀏覽器支持。> >請參閱這篇 [MDN 文章](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }中有關 `<dialog>` 的詳細信息，以及這個[模態窗口示例](https://github.com/gdkraus/accessible-modal-dialog){: .external }中有關模態窗口的詳細信息。







假定有這樣一個模態對話框，由一個包含幾個元素的 `div` 和另一個表示背景疊層的 `div` 表示。
讓我們預演一下在此情況下實現暫時鍵盤陷阱所需的基本步驟。


 1. 使用 `document.querySelector` 選擇模態窗口和疊層 div 並存儲其引用。
 1. 在模態窗口打開時，存儲對當模態窗口打開時所聚焦元素的引用，以便將焦點返回至該元素。
 1. 使用*鍵按下偵聽器*捕獲模態窗口打開時的按鍵動作。
您還可以偵聽背景疊層上的點擊動作，在用戶點擊它時關閉模態窗口。
 1. 接下來，獲取模態窗口內可聚焦元素的集合。第一個和最後一個可聚焦元素將充當“哨兵”，讓您瞭解何時正向或反向循環流動焦點，以使焦點始終留在模態窗口內。
 1. 顯示模態窗口並聚焦第一個可聚焦元素。
 1. 在用戶按 `Tab` 或 `Shift+Tab` 時，正向或反向移動焦點，視情況在最後一個或第一個元素處開始循環。
 1. 如果用戶按 `Esc`，關閉模態窗口。這很有幫助，因爲用戶不必查找特定關閉按鈕便可關閉模態窗口，甚至連使用鼠標的用戶都能從中受益。
 1. 當模態窗口關閉時，將它和背景疊層隱藏起來，並將焦點恢復到早前保存的之前聚焦的元素。


執行以上程序可以得到一個不會令人懊惱的易用模態窗口，可供所有人有效使用。


欲知更多詳情，您可以查看此[示例代碼](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external }，以及查看一個[已完成頁面](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }的生動實例。





{# wf_devsite_translation #}
