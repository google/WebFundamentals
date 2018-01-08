project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:使用合适的样式化提升可访问性


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 可访问的样式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



我们已经了解了可访问性的两个关键方面（焦点和语义）。接下来，我们来看一下第三个方面，即样式化。
样式化主题广，我们将分三部分介绍。


 - 为焦点和各种 ARIA 状态添加样式，确保对元素进行样式化以支持我们的可访问性工作。
 - 赋予 UI 灵活的样式，以便对它们进行放大来满足无法看清小号文字的用户的需求。
 - 选择合适的颜色和对比度，避免仅通过颜色传达信息。


## 对焦点进行样式化

一般情况下，每次聚焦到一个元素时，我们都依靠浏览器内置的焦点环（CSS `outline` 属性）对元素进行样式化。
焦点环非常方便，没有它，键盘用户就无法分辨哪个元素具有焦点。
[WebAIM 检查单](http://webaim.org/standards/wcag/checklist){: .external }提到了这一点，其中的表述为“很容易就能看到哪个页面元素具有当前键盘焦点（即，浏览页面时，您可以看到自己所处的位置）。”





![带焦点环的表单元素](imgs/focus-ring.png)

不过，焦点环有时看起来是歪曲的，或者不适合您的页面设计。
一些开发者通过将元素的 `outline` 设为 `0` 或 `none` 的方式完全移除此样式。
但是，没有了焦点指示器，键盘用户怎样才能知道他们正与哪个项目交互呢？


Warning: 切忌在不提供焦点替代项的情况下将 outline 设为 0 或 none！

您可能对使用 CSS `:hover` *伪类*向控件添加悬停状态比较熟悉。
例如，您可以对某个链接元素使用 `:hover`，在鼠标悬停到该元素上时更改其颜色或背景。
与 `:hover` 类似，您可以使用 `:focus` 伪类在某个元素具有焦点时将其锁定。



    /* At a minimum you can add a focus style that matches your hover style */
    :hover, :focus {
      background: #c0ffee;
    }

解决移除焦点环后问题的一种替代方法是为您的元素设置相同的悬停和焦点样式，这样可以解决键盘用户“焦点在哪”的问题。照例，提升可访问性体验将提升每个人的体验。


### 输入形式

![带焦点环的原生 HTML 按钮](imgs/sign-up.png){: .attempt-right }

对于像 `button` 一样的原生元素，浏览器可以检测用户交互是来自鼠标还是键盘按动，并且一般仅为键盘交互显示焦点环。例如，当您通过鼠标点击原生 `button` 时，不会有焦点环，但是当您通过键盘跳转到该元素时，将显示焦点环。



其中的逻辑是，鼠标用户需要焦点环的可能性较低，因为他们知道自己点击了哪个元素。
遗憾的是，目前还没有一种跨浏览器解决方案可以产生相同的行为。
因此，如果您为任何元素设置 `:focus` 样式，那么当用户点击元素或者通过键盘使其具有焦点时，该样式都会显示。试着点击下面这个假按钮，您会注意到 `:focus` 样式始终都会应用。


    <style>
      fake-button {
        display: inline-block;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        user-select: none;
      }

      fake-button:focus {
        outline: none;
        background: pink;
      }
    </style>
    <fake-button tabindex="0">Click Me!</fake-button>

{% framebox height="80px" %}
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
{% endframebox %}

这有点让人觉得讨厌，开发者因此经常使用 JavaScript 编写自定义控件来帮助区分鼠标焦点和键盘焦点。



在 Firefox 中，您可以利用 `:-moz-focusring` CSS 伪类编写一个仅在通过键盘操作使元素具有焦点时应用的焦点样式，这一功能非常方便。尽管此伪类目前仅存在于 Firefox 中，[大家正在致力于使其成为一项标准](https://github.com/wicg/modality){: .external }。



[Alice Boxhall 和 Brian Kardell 合作撰写的这篇很棒的文章](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external }也提到了输入形式这一主题，并提供了用于区分鼠标输入与键盘输入的原型代码。您可以立即使用他们的解决方法，然后在焦点环伪类获得更广泛支持后再行添加这一功能。



## 使用 ARIA 对状态进行样式化

构建组件时，常见的做法是使用由 JavaScript 控制的 CSS 类反映组件的状态，进而反映其外观。


例如，假设一个切换按钮在用户点击后会进入“按下”视觉状态，并一直保持该状态，直至用户再次点击。
要对该状态进行样式化，您的 JavaScript 可以向按钮添加一个 `pressed` 类。
另外，由于希望所有控件均具有良好的语义，您还需要将按钮的 `aria-pressed` 状态设为 `true`。



在这里可以使用的一种有用技巧是，完全移除该类，然后仅使用 ARIA 属性对元素进行样式化。
现在，您可以为按钮的按下状态更新 CSS 选择器，从



    .toggle.pressed { ... }
    

更新为


    .toggle[aria-pressed="true"] { ... }
    

这样将在 ARIA 状态与元素外观之间同时创建逻辑关系和语义关系，同时还能缩减额外的代码。


## 多设备自适应设计

我们知道自适应设计是一种不错的方法，可以提供最佳的多设备体验，而且自适应设计也可以提升可访问性。



假设存在一个像 [Udacity.com](https://www.udacity.com/courses/all) 一样的网站：

![100% 放大下的 Udacity.com](imgs/udacity.jpg)

对于阅读小号印刷字体存在困难的视力较弱的用户来说，他们可能会放大页面，最高可能会放大到 400%。
由于网站采用自适应设计，UI 将针对“较小视口”（实际上是较大页面）自动重排，这一特性非常适合需要放大屏幕的桌面用户和移动设备屏幕阅读器用户。这是一种双赢的方式。下面是相同页面放大到 400% 的效果：


![400% 放大下的 Udacity.com](imgs/udacity-zoomed.jpg)

事实上，仅仅通过自适应设计，我们就可以满足 [WebAIM 检查单第 1.4.4 条规则](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external }的要求，其表述为页面“...应在文本大小加倍的情况下便于阅读和正常发挥作用。”




详细介绍自适应设计不在本指南的范围之内，以下几条建议有助于您实现自适应设计并让用户更方便地访问您的内容。



 - 首先，确保始终使用正确的 `viewport` 元标记。<br>
   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   <br>设置 `width=device-width` 将匹配屏幕宽度（以设备无关像素为单位），设置 `initial-scale=1` 将在 CSS 像素与设备无关像素之间建立 1:1 的关系。这样，浏览器会将您的内容调整为适合屏幕尺寸，用户看到的不会是一堆揉在一起的文本。



![带和不带视口元标记的电话显示](imgs/scrunched-up.jpg)

Warning: 使用视口元标记时，切忌设置 maximum-scale=1 或设置 user-scaleable=no。让用户根据他们自己的需求缩放。


 - 另一个需要记住的技巧是使用自适应网格进行设计。正如您在 Udacity 网站的示例中看到的，使用网格进行设计意味着您的内容会在页面更改大小时自动重排。这种布局一般使用百分比、em 或 rem 之类的相对单位生成，而非使用硬编码像素值。使用相对单位的优势是文本和内容可以放大，并将其他项目挤到页面下方。因此，DOM 顺序和阅读顺序保持不变，即使布局因为放大而发生变化亦是如此。


 - 另外，请考虑为文本大小之类的项目使用诸如 `em` 或 `rem` 的相对单位，而非像素值。一些浏览器支持仅根据用户偏好调整文本大小，如果您为文本使用像素值，此设置不会影响您的副本。不过，如果您完全使用相对单位，网站副本将更新以反映用户偏好。


 - 最后，如果您的设计在移动设备上显示，您还应确保按钮或链接之类的交互式元素足够大，并在其周围留出足够的空间，使其便于按下，而不会意外重叠到其他元素上。这不仅会让所有用户受益，更会为行动不便的人带来极大帮助。


对于正确设置移动视口的网站，建议的最小触摸目标大小约为 48 个设备无关像素。
例如，尽管一个图标的宽度和高度仅为 24px，您仍然可以使用额外边距将点按目标大小增加到 48px。48x48 像素的面积约为 9mm 见方，与一个人手指垫的面积大小相当。


![显示一对 48 像素触摸目标的图片](imgs/touch-target.jpg)

不同触摸目标之间在水平和垂直方向上还应留出大约 32 像素的间隔，以便用户手指按下一个点按目标不会意外触摸另一个点按目标。



![显示触摸对象周围存在 32 像素空间的图片](imgs/touch-target2.jpg)

## 颜色和对比度

如果您的视力很好，您会很自然地假设每个人都能辨识颜色，在文本易读性方面也是如此 &mdash; 但事实不是这样。我们来看一下如何有效使用颜色和对比度创建便于每个人访问的舒适设计。




正如您想象的一样，一些便于某些人阅读的颜色组合可能会让其他人阅读起来非常困难或者令其根本无法阅读。
这通常归结为*颜色对比度*，即前景色与背景色*亮度*之间的关系。如果颜色类似，对比度比率低；如果颜色不同，对比度比率高。


[WebAIM 指导原则](http://webaim.org/standards/wcag/){: .external } 建议为所有文本使用 4.5:1 的 AA（最低）对比度比率。
非常大的文本（比默认正文文本大 120-150%）是一个例外，此类文本的对比度比例可以降低至 3:1。请注意下面所示对比度比率的不同。




![各种对比度比率的比较](imgs/contrast-ratios.jpg)

之所以为级别 AA 选择 4.5:1 的对比度比率是因为，此比率可以补偿视力降低至大约 20/40 水平的用户在一般情况下的对比度灵敏度损失。20/40 是 80 岁左右老年人的典型视敏度。
对于存在视力障碍或色觉缺陷的用户，我们可以将正文文本的对比度增大至 7:1。


您可以使用适合 Chrome 的 [Accessibility DevTools 扩展程序](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){: .external }确定对比度比率。使用 Chrome DevTools 的一个优势是它们可以为您当前的颜色建议 AA 和 AAA（增强）替代值，您可以点击值来预览它们在应用中的显示效果。



要审核颜色/对比度，请按下面这些基本步骤操作。

 1. 安装扩展程序后，点击 `Audits`
 1. 取消选中除 `Accessibility` 之外的任何选项
 1. 点击 `Audit Present State`
 1. 记住任何对比度警告

![devtools 对比度审核对话框](imgs/contrast-audit.png)

WebAIM 也提供了一个方便的[颜色对比度检查器](http://webaim.org/resources/contrastchecker/){: .external }，您可以用它来查看任何颜色对的对比度。



### 不要仅通过颜色传达信息

大约 3.2 亿位用户存在色觉障碍。大约十二分之一的男性和二百分之一的女性患有某种形式的“色盲”；也就是说，大约二十分之一（或 5%）的用户在访问您的网站时无法获得您预想的体验。如果我们依赖颜色传达信息，我们会将这一数字推高至无法接受的水平。





注：术语“色盲”经常用于描述一种视觉条件，在此条件下，患者在区分颜色方面存在困难。事实上，很多人都是色盲。存在色觉障碍的大多数人都能看到一些或大多数颜色，但是无法准确区分具体颜色，例如红色和绿色（最常见）、棕色和橙色，以及蓝色和紫色。



例如，在输入表单中，电话号码可能带有红色下划线，表示无效。
但是对于色觉异常人士或屏幕阅读器用户来说，该信息即使可以传达，也谈不上准确。
因此，您应始终为用户提供多种途径来获取关键信息。


![使用红色下划线指示错误的输入表单](imgs/input-form1.png)

[WebAIM 检查单第 1.4.1 部分的表述](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } 为“不应将颜色作为传达内容或区分可视元素的唯一方法。”该部分还提到“不应仅使用颜色区分文本周围的链接”，除非链接满足特定的对比度要求。检查单建议（使用 CSS `text-decoration` 属性）添加一个额外的指示器（例如下划线）来指示链接何时处于活动状态。



一种可以修复上个示例所遇问题的简单方式是，向字段添加一条额外的消息，指示电话号码无效并说明原因。


![使用错误消息阐释原因的输入表单](imgs/input-form2.png)

构建应用时，请谨记这些事项并留意那些您过于依赖颜色来传达重要信息的区域。



如果您对网站向不同用户显示的外观比较好奇，或者在 UI 中严重依赖颜色的使用，您可以使用 [NoCoffee Chrome 扩展程序](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){: .external } 来模拟各种视觉障碍，包括不同类型的色盲。





### 高对比度模式

高对比度模式让用户可以颠倒前景色和背景色，这样做经常有助于突出显示文本。
对于视力较弱的人，高对比度模式可以让在页面上浏览内容变得更加简单。可以通过多种方式在您的机器上设置高对比度。

对于像 Mac OSX 和 Windows 一样的操作系统，可以在系统级别为任何操作启用其提供的高对比度模式。
此外，用户也可以安装扩展程序（例如 [Chrome High Contrast 扩展程序](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){: .external }，仅在特定应用中启用高对比度。




一种比较好的做法是开启高对比度设置，并验证应用中的所有 UI 是否仍然可见和可以使用。


例如，导航栏可以使用细微的背景色来指示哪个页面当前处于选中状态。
如果您在高对比度扩展程序中查看，该细微差异完全消失，随之而来的是用户也无法了解哪个页面处于活动状态。



![处于高对比度模式下的导航栏](imgs/tab-contrast.png)

类似地，对于上一部分中的示例，无效电话号码字段上的红色下划线可能以不容易区分的蓝-绿颜色显示。



![带错误字段并处于高对比度模式下的表单](imgs/high-contrast.jpg)

如果您满足上面几部分介绍的对比度比率要求，那么在对高对比度模式的支持方面，效果也应不错。
但是为了更加保险，不妨安装 Chrome High Contrast 扩展程序并大致检查一下您的页面，了解一切是否按预期工作和显示。





{# wf_devsite_translation #}
