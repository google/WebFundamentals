project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 使用 tabindex 修改 DOM 顺序


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 使用 tabindex {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



原生元素 DOM 位置提供的默认 Tab 键顺序虽然方便，但有时您需要修改 Tab 键顺序，而在 HTML 中对元素进行物理移动并不总是最优解决方案，甚至缺乏可行性。在此类情况下，您可以利用 `tabindex` HTML 属性来显式设置元素的 Tab 键位置。


`tabindex` 可应用于任何元素并接受某一范围的整型值，但不一定在每个元素上都有用。
您可以利用 `tabindex` 为可聚焦页面元素指定显式顺序、在 Tab 键顺序中插入原本不可聚焦的元素以及从 Tab 键顺序中移除元素。


例如：`tabindex="0"`：在自然 Tab 键顺序中插入一个元素。可通过按 `Tab` 键聚焦该元素，也可通过调用其 `focus()` 方法聚焦该元素



    <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>

{% framebox height="60px" %}
<style>
  custom-button {
    margin: 10px;
  }
</style>
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`：从自然 Tab 键顺序中移除某个元素，但仍可通过调用其 `focus()` 方法聚焦该元素


    <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
    <button onclick="foo.focus();">Focus my sibling</button>

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`：只要 tabindex 大于 0，就会将该元素跳至自然 Tab 键顺序的最前面。
如果有多个元素的 tabindex 均大于 0，Tab 键顺序将以大于 0 的最小值为起点，从小到大排序。使用大于 0 的 tabindex 被视为**反面模式**。


    <button>I should be first</button>
    <button>And I should be second</button>
    <button tabindex="5">But I jumped to the front!</button>

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

这在标头、图像或文章标题之类的非输入元素上体现得尤为明显。
为上述类型的元素添加 `tabindex` 会适得其反。如有可能，最好适当安排源代码，让 DOM 序列具有符合逻辑的 Tab 键顺序。如果您一定要使用 `tabindex`，请将其使用范围限定在按钮、标签、下拉列表和文本字段之类的自定义交互式控件；也就是说，用户可能需要提供输入的元素。



不必担心屏幕阅读器用户会错过重要内容，因为它没有 `tabindex`。
即使内容非常重要（例如图像），如果并非用户可以交互的对象，也没有理由将其设置为可聚焦。只要您提供充分的 `alt` 属性支持（我们不久将会介绍），屏幕阅读器用户仍可理解图像的内容。


## 管理页面一级的焦点

在下面这种情境中，`tabindex` 不仅有用，还必不可少。您可能正在构建一个强健的单一页面，其中包含不同的内容区域，这些区域并非全都同时可见。在这种页面中，点击某个导航链接时，即使不刷新页面也会更改可见内容。


发生这种情况时，您可能需要找到选定的内容区域，将其 `tabindex` 指定为 -1，使其不出现在自然 Tab 键顺序中，并调用其 `focus` 方法。这种称作*管理焦点*的方法可让用户的感知上下文与网站的视觉内容保持同步。


## 管理组件中的焦点

更改页面内容时的焦点管理很重要，但有时需要管理控件一级的焦点（例如，当您构建自定义组件时）。以原生 `select` 元素为例。它可以获得基本焦点，但获得焦点后，即可使用箭头键来显露其他功能（可选择的选项）。

如果您构建的是自定义 `select` 元素，一定想显露同样类型的行为，这样一来，主要依赖键盘的用户就仍可与您的控件进行交互。



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

了解需要实现哪些键盘行为可能很困难，但可通过参阅一份文档获得帮助。
[无障碍丰富互联网应用 (ARIA) 制作实践](https://www.w3.org/TR/wai-aria-practices/){: .external }指南列出了组件类型及其支持的键盘操作。我们稍后将对 ARIA 做更详细的介绍，但目前姑且利用这个指南来帮助我们向新组件添加键盘支持。





或许您正在开发一些[自定义元素](/web/fundamentals/getting-started/primers/customelements)，这些元素类似于一组单选按钮，但采用了您特有的外观和行为。




    <radio-group>
      <radio-button>Water</radio-button>
      <radio-button>Coffee</radio-button>
      <radio-button>Tea</radio-button>
      <radio-button>Cola</radio-button>
      <radio-button>Ginger Ale</radio-button>
    </radio-group>

要确定它们需要的键盘支持类型，您需要查阅 [ARIA 制作实践指南](https://www.w3.org/TR/wai-aria-practices/){: .external }。第 2 章包含一个设计模式列表，该列表中有一个[单选按钮组特性表](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external }，其中包含与新元素匹配度最高的现有元素。



正如您在该表中所见，应该支持的其中一个常见键盘行为是向上/向下/向左/向右箭头键。
要向新组件添加此行为，我们将采用一种叫做*流动 tabindex* 的方法。


![W3C 规范中有关单选按钮内容的摘录](imgs/radio-button.png)

流动 tabindex 通过将除当前活动子项之外所有其他子项的 `tabindex` 设置为 -1 来发挥作用。


    <radio-group>
      <radio-button tabindex="0">Water</radio-button>
      <radio-button tabindex="-1">Coffee</radio-button>
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

然后，组件使用键盘事件侦听器来确定用户按下的按键；发生按键操作时，它将之前聚焦的子项的 `tabindex` 设置为 -1，将待聚焦子项的 `tabindex` 设置为 0，并对其调用 focus 方法。




    <radio-group>
      // Assuming the user pressed the down arrow, we'll focus the next available child
      <radio-button tabindex="-1">Water</radio-button>
      <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

当用户到达最后一个（或第一个，取决于其移动焦点的方向）子项时，将重新循环，再次聚焦第一个（或最后一个）子项。



您可以用下面的已完成示例试一试。在 DevTools 中检查该元素，观察 tabindex 从一个单选按钮到下一单选按钮的流动情况。


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

<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>

<script>
  class RadioButton extends HTMLElement {
    constructor() {
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
    constructor() {
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

您可以在 GitHub 上查看[该元素的完整源代码](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }。



## 模态窗口和键盘陷阱

当您管理焦点时，有时会发生进入某种情境后无法退出的情况。
试想有这样一个自动填充小部件，它试图管理焦点和捕获 Tab 键行为，但在它完成操作前会阻止用户离开。这种情况称作*键盘陷阱*，可能令用户感到非常懊恼。
Web AIM 检查清单第 2.1.2 节阐述了这个问题，指出[在任何情况下都不应将键盘焦点锁定或困闭在一个特定页面元素处](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }。用户应该只使用键盘就能在所有页面元素中双向导航。






奇怪的是，有时这一行为实际上合乎需要，比如在模态窗口中。
正常情况下，显示模态窗口时，您不希望用户访问其后的内容。
您可以添加一个叠层，从视觉上遮盖页面，但并不能阻止键盘焦点意外地跳转到模态窗口之外。


![一个请用户保存其工作的模态窗口](imgs/modal-example.png)

在类似上面这样的情况下，您可以实现一个暂时键盘陷阱，以确保只在显示模态窗口时困闭焦点，之后在模态窗口关闭时，将焦点恢复到之前聚焦的项目。



>出现过一些有关为开发者简化这项工作的提议（包括 `<dialog>` 元素），但它们尚未获得广泛的浏览器支持。> >请参阅这篇 [MDN 文章](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }中有关 `<dialog>` 的详细信息，以及这个[模态窗口示例](https://github.com/gdkraus/accessible-modal-dialog){: .external }中有关模态窗口的详细信息。







假定有这样一个模态对话框，由一个包含几个元素的 `div` 和另一个表示背景叠层的 `div` 表示。
让我们预演一下在此情况下实现暂时键盘陷阱所需的基本步骤。


 1. 使用 `document.querySelector` 选择模态窗口和叠层 div 并存储其引用。
 1. 在模态窗口打开时，存储对当模态窗口打开时所聚焦元素的引用，以便将焦点返回至该元素。
 1. 使用*键按下侦听器*捕获模态窗口打开时的按键动作。
您还可以侦听背景叠层上的点击动作，在用户点击它时关闭模态窗口。
 1. 接下来，获取模态窗口内可聚焦元素的集合。第一个和最后一个可聚焦元素将充当“哨兵”，让您了解何时正向或反向循环流动焦点，以使焦点始终留在模态窗口内。
 1. 显示模态窗口并聚焦第一个可聚焦元素。
 1. 在用户按 `Tab` 或 `Shift+Tab` 时，正向或反向移动焦点，视情况在最后一个或第一个元素处开始循环。
 1. 如果用户按 `Esc`，关闭模态窗口。这很有帮助，因为用户不必查找特定关闭按钮便可关闭模态窗口，甚至连使用鼠标的用户都能从中受益。
 1. 当模态窗口关闭时，将它和背景叠层隐藏起来，并将焦点恢复到早前保存的之前聚焦的元素。


执行以上程序可以得到一个不会令人懊恼的易用模态窗口，可供所有人有效使用。


欲知更多详情，您可以查看此[示例代码](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external }，以及查看一个[已完成页面](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }的生动实例。





{# wf_devsite_translation #}
