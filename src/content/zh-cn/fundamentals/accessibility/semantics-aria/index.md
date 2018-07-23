project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:ARIA 和非原生 HTML 语义简介


{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-10-04 #}

# ARIA 简介 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



迄今为止，我们一直在鼓励使用原生 HTML 元素，因为它们可为您提供焦点、键盘支持和内置语义，但有时简单布局和原生 HTML 达不到目的。例如，弹出式菜单这个很常见的 UI 构件目前尚无相应的标准化 HTML 元素。
也没有提供“用户需要尽快了解与此有关的信息”之类语义特性的 HTML 元素。



因此，在本节课中，我们将探究如何表达 HTML 无法自行表达的语义。


[无障碍网络倡议的无障碍丰富互联网应用规范](https://www.w3.org/TR/wai-aria/){: .external }（WAI-ARIA，简称 ARIA）适用于跨越某些领域的障碍，这些领域存在的无障碍问题无法通过原生 HTML 进行管理。它通过允许您指定某些属性来发挥作用，这些属性可以修改元素转换成无障碍树的方式。
下面我们来看一个示例。


在以下代码段中，我们使用列表项作为一种自定义复选框。CSS "checkbox" 类为元素提供了所需的视觉特性。



    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>


尽管这适合视力正常的用户，屏幕阅读器却不会给予任何指示来说明该元素旨在作为复选框使用，因此弱视用户可能会完全错过该元素。



如果使用 ARIA 属性，我们就可以为元素提供缺少的信息，以便屏幕阅读器能正确解读它。
我们在以上代码中添加了 `role` 和 `aria-checked` 属性，将该元素显式标识为一个复选框，并指定它在默认情况下处于选中状态。该列表项现在将添加到无障碍树中，屏幕阅读器将把它正确地报告为一个复选框。



    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>


Note: 我们将[稍后](#what-can-aria-do)介绍 ARIA 属性列表以及它们的使用时机。

ARIA 通过更改和补充标准 DOM 无障碍树来发挥作用。

![标准 DOM 无障碍树](imgs/acctree1.jpg){: .attempt-right }

![ARIA 补充后的无障碍树](imgs/acctree2.jpg){: .attempt-right }

尽管 ARIA 允许我们为任何页面元素对无障碍树进行细微（乃至彻底的）修改，但那却是其唯一更改之处。**ARIA 不会补充元素的任何固有行为**；它不会使元素可获焦点，也不会为其提供键盘事件侦听器。那仍旧是我们开发任务的组成部分。


必须要了解的是，不需要重新定义默认语义。
无论如何使用，标准 HTML `<input type="checkbox">` 元素都不需要额外的 `role="checkbox"` ARIA 属性就能正确声明。



同样值得注意的是，某些 HTML 元素上可以使用的 ARIA 角色和属性会受到限制。
例如，不得对标准 `<input type="text">` 元素应用任何额外角色/属性。


>请参阅 [ARIA in HTML 规范](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }，了解详细信息。


让我们看一看 ARIA 还能提供哪些其他功能。

## ARIA 可以做什么？

正如您在复选框示例中所见，ARIA 可以修改现有元素语义，也可以向不存在原生语义的元素添加语义。
它还可以表达 HTML 中根本不存在的语义模式，例如菜单或标签面板。

ARIA 允许我们创建的小部件型元素通常无法通过普通 HTML 实现。


 - 例如，ARIA 可以添加只向辅助技术 API 公开的附加标签和说明文本。<br>


<div class="clearfix"></div>

    <button aria-label="screen reader only label"></button>


 - ARIA 表达的元素间语义关系能够扩展标准父项/子项联系，例如控制特定区域的自定义滚动条。



<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>



 - 并且 ARIA 可以使页面的某些部分具有“实时性”，让它们在发生变化时立即通知辅助技术。


<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>


ARIA 系统的其中一个核心层面是其*角色*集。在无障碍术语中，角色是指特定 UI 模式的简略指示器。我们可以通过任意 HTML 元素上的 `role` 属性使用 ARIA 提供的模式词汇表。


我们在上例中应用 `role="checkbox"` 时，是指示辅助技术，元素应遵循 "checkbox" 模式。
也就是说，我们可以保证它具有选中状态（选中或未选中），并且这一状态可使用鼠标或空格键进行切换，就像切换标准 HTML 复选框元素那样。




事实上，由于键盘交互在屏幕阅读器使用中的作用极其重要，因此必须确保在创建自定义小部件时，始终在同一位置应用 `role` 属性和 `tabindex` 属性；这可以确保键盘事件发生在正确的位置，并且当某个元素获得焦点时，其角色能得到准确传递。





[ARIA 规范](https://www.w3.org/TR/wai-aria/){: .external } 分类介绍了 `role` 属性以及可与这些角色联用的关联 ARIA 属性的可接受值。这是最佳的权威信息来源，其中包含 ARIA 角色和属性如何协作，以及如何以浏览器和辅助技术支持的方式使用它们。




![所有可用 ARIA 角色的列表](imgs/aria-roles.jpg)

不过，该规范非常深奥；一个更为浅显的入门读物是 [ARIA 制作实践文档](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }，该文档探究了使用可用 ARIA 角色和属性的最佳做法。




ARIA 还提供了可对 HTML5 中提供的选项进行扩展的地标角色。请参阅[地标角色设计模式](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }规范，了解详细信息。






{# wf_devsite_translation #}
