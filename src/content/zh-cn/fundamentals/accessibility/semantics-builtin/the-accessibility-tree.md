project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:无障碍树简介


{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-10-04 #}

# 无障碍树 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



试想您要构建一个*屏幕阅读器用户专用*的界面。在这种情况下，您根本不需要创建任何视觉 UI，只需提供足够屏幕阅读器使用的信息。



您将要创建的是一种说明页面结构的 API，与 DOM API 类似，但好在信息和节点数量较少，因为其中有许多信息只对视觉呈现有用。其结构可能与下图类似。


![屏幕阅读器 DOM API 模型](imgs/treestructure.jpg)

这基本上就是浏览器实际呈现给屏幕阅读器的内容。浏览器获取 DOM 树，并将其修改成适用于辅助技术的形式。我们将这个修改后的树称为*无障碍树*。


您可以将无障碍树想像成有点类似于 20 世纪 90 年代的旧式网页：几张图片、大量链接，或许还有一个字段和一个按钮。


![一个 20 世纪 90 年代风格的网页](imgs/google1998.png)

目视向下浏览上例这样的网页得到的体验与屏幕阅读器用户获得的体验类似。
界面就在那里，但简单而又直接，与无障碍树界面很像。


无障碍树就是大多数辅助技术的交互对象。交互流程与以下所述类似：


 1. 一个应用（浏览器或其他应用）通过某个 API 将其 UI 的一个语义版本向辅助技术公开。

 1. 辅助技术可以利用其通过 API 读取的信息为用户创建一个替代性界面呈现。
例如，屏幕阅读器可以创建一个能让用户听到应用语音表示的界面。


 1. 辅助技术还可以允许用户以不同方式与应用进行交互。
例如，大多数屏幕阅读器都提供了钩子，让用户能够轻松地模拟鼠标点击或手指点按。

 1. 辅助技术通过无障碍 API 将用户意图（例如“点击”）传送回应用。
应用随即负责在原始 UI 上下文中对操作进行相应解读。


对于网络浏览器，在每个方向都要额外执行一个步骤，因为浏览器实际上是在其内运行的网络应用的平台。
因此，浏览器需要将网络应用转换成无障碍树，并且必须确保根据来自辅助技术的用户操作在 JavaScript 中触发相应事件。




但那全都是浏览器的责任。作为网络开发者，我们所要做的不过是明了这一进行中的情况，以及让所开发的网页能够充分利用此过程来为用户打造无障碍体验。



我们通过确保正确表达页面语义，亦即确保页面中的重要元素具有正确的无障碍角色、状态和属性并确保指定无障碍名称和说明，来实现这一目的。然后，浏览器便可让辅助技术获取该信息以打造自定义体验。


## 原生 HTML 中的语义

浏览器可以将 DOM 树转变成无障碍树，因为 DOM 的大部分内容具有*隐式*语义含义。
也就是说，DOM 采用的原生 HTML 元素能够被浏览器识别，并且可以预测其在各类平台上的工作方式。因此，链接或按钮等原生 HTML 元素的无障碍功能可自动得到处理。
我们可以通过编写表达页面元素语义的 HTML 来充分利用这一内置无障碍功能。


但有时我们采用的元素虽然看上去像原生元素，实际却并非如此。例如，以下这个“按钮”就根本不是按钮。


{% framebox height="60px" %}
<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>
<div class="fancy-btn">Give me tacos</div>
{% endframebox %}

可在 HTML 中通过许多方式构建该按钮；以下所示为其中一种方式。


    <div class="button-ish">Give me tacos</div>


当我们不使用实际按钮元素时，屏幕阅读器无从知晓其读取的内容。
此外，我们还需要额外完成[添加 tabindex](/web/fundamentals/accessibility/focus/using-tabindex) 的工作，以便只使用键盘的用户能够使用它，因为按照现有编码，它只能使用鼠标操作。




使用普通 `button` 元素替代 `div` 便可轻松地解决这个问题。使用原生元素的另一个好处是，它能为我们处理键盘交互。而且别忘了，并不是说您使用原生元素就得放弃漂亮的视觉效果；您可以通过为原生元素设置样式来让它们具有您想要的外观，同时仍保留隐式语义和行为。




之前我们曾指出，屏幕阅读器将述说元素的角色、名称、状态和值。
通过使用合适的语义元素，可以覆盖角色、状态和值，但我们还必须确保让元素的名称可检测到。



一般来说，名称分为两种类型：

 - *可见标签*：所有用户都使用它们将含义与元素关联起来；

 - *文本替代项*：仅在不需要视觉标签时使用。


对于文本级元素，我们什么都不用做，因为按照定义它们将包含一些文本内容。
不过，对于输入或控件元素以及图像之类的视觉内容，我们需要确保为其指定名称。
事实上，为任何非文本内容提供文本替代项是 [WebAIM 检查清单上的第一项](http://webaim.org/standards/wcag/checklist#g1.1)。



实现该目的的一种方法是遵循他们的建议“表单输入有关联的文本标签”。
将标签与表单元素（例如复选框）关联有两种方法。
无论采用哪一种方法，都会使标签文本同时成为复选框的点击目标，这对鼠标或触摸屏用户同样有帮助。要将标签与元素关联，请执行下列任一操作：

 - 将 input 元素置于 label 元素内

<div class="clearfix"></div>

    <label>
      <input type="checkbox">Receive promotional offers?</input>
    </label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receive promotional offers?</input>
    </label>
</div>
{% endframebox %}


或

 - 使用 label 的 `for` 属性并引用元素的 `id`

<div class="clearfix"></div>

    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>
</div>
{% endframebox %}


正确标示复选框后，屏幕阅读器便可报告元素角色为 checkbox，处于 checked 状态，名称为“Receive promotional offers?”。



![VoiceOver 产生的显示复选框朗读标签的屏幕文本输出](imgs/promo-offers.png)

Success: 您实际上可以使用屏幕阅读器，通过按 Tab 键在页面上循环跳转并验证朗读的角色、状态和名称来找到关联不正确的标签。






{# wf_devsite_translation #}
