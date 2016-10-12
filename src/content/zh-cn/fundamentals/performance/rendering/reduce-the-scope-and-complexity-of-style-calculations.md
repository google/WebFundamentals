project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 添加或移除一个DOM元素、修改元素属性和样式类、应用动画效果等操作，都会引起DOM结构的改变，从而导致浏览器需要重新计算每个元素的样式、对页面或其一部分重新布局（多数情况下）。这就是所谓的样式计算。

{# wf_updated_on: 2015-03-19 #}
{# wf_published_on: 2000-01-01 #}

# 降低样式计算的范围和复杂度 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


Translated By: 

{% include "web/_shared/contributors/samchen.html" %}


添加或移除一个DOM元素、修改元素属性和样式类、应用动画效果等操作，都会引起DOM结构的改变，从而导致浏览器需要重新计算每个元素的样式、对页面或其一部分重新布局（多数情况下）。这就是所谓的样式计算。

### TL;DR {: .hide-from-toc }
- 降低样式选择器的复杂度；使用基于class的方式，比如BEM。
- 减少需要执行样式计算的元素的个数。


计算样式的第一步是创建一套匹配的样式选择器，浏览器就是靠它们来对一个元素应用样式的。

第二步是根据匹配的样式选择器来获取对应的具体样式规则，计算出最终具体有哪些样式是要应用在DOM元素上的。在Blink（Chrome和Opera的渲染引擎）中，至少从现在来看，以上两步在时间消耗上是差不多的。

<div class="quote" style="margin-top: 30px;">
  <div class="container">
    <blockquote>Roughly 50% of the time used to calculate the computed style for an element is used to match selectors, and the other half of the time is used for constructing the RenderStyle (computed style representation) from the matched rules.
    <p>Rune Lillesveen, Opera / <a href="https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit">Style Invalidation in Blink</a></p>
    </blockquote>
  </div>
</div>


## 降低样式选择器的复杂度

最简单的情况是，你在CSS中仅使用一个class就能对一个DOM元素指定具体样式规则：


    .title {
      /* styles */
    }
    

但是，随着项目的发展，很可能会有越来越复杂的CSS，最终你可能写出这样的样式选择器：


    .box:nth-last-child(-n+1) .title {
      /* styles */
    }
    

对于这种样式选择器，为了弄清楚究竟要不要对一个DOM元素使用这个样式，浏览器必须要确认“这个元素是不是有一个值为title的class属性？同时该元素还有一个父元素，这个父元素正好是一个值为box属性的元素的倒数第（-n+1）个子元素？”。这个确认过程看上去就觉得麻烦，真正计算起来也非常耗时间。换个方式，我们可以这样定义这个样式选择器，达到的效果一样，但效率更高：


    .final-box-title {
      /* styles */
    }
    

你可以用个更好的class名字，但不管怎么说，这样做之后能大大减轻浏览器的负担。在之前的版本中，浏览器为了确认该元素是某个元素的倒数某位的子元素，需要先检查那个元素的所有子元素，然后再检查次序。这比直接匹配class名要复杂得多。

## 减少需要执行样式计算的元素的个数
另一个性能问题，也是_更重要的因素_，就是元素样式发生改变时的样式计算量。

一般来说在最坏的情况下，样式计算量 = 元素个数 x 样式选择器个数。因为对每个元素最少需要检查一次所有的样式，以确认是否匹配。

Note: 在过去，如果你修改了body元素的class属性，那么页面里所有元素都要重新计算样式。幸运的是，在某些现代的浏览器中不再这样做了。他们会对每个DOM元素维护一个独有的样式规则小集合，如果这个集合发生改变，才重新计算该元素的样式。也就是说，某个元素样式的改变不一定会导致对其他所有元素重新计算样式，得看这个元素在DOM树中的位置、具体是什么样式发生改变。

样式计算一般是直接对那些目标元素执行，而不是对整个页面执行。在现代浏览器中，样式计算进一步被优化，因为浏览器不会检查所有受到样式变化影响的元素。而以前的浏览器对于这种情况的处理没有进行这种优化。因此，你最好尽可能**减少需要执行样式计算的元素的个数**。

Note: 如果你对Web Components很感兴趣，那这篇文章对你就没什么意义了。因为Web Components中的样式计算不会跨越Shadow DOM范围，仅在单个的Web Component中进行，而不是在整个页面的DOM树上进行。但从整体上看，本质是一样的：对于样式计算来说，范围越小、规则越简单的话，处理效率越高。

## 评估样式计算的成本
最简单最好的评估样式计算成本的方式就是使用Chrome DevTools的Timeline功能。打开DevTools，选择Timeline标签，点击左上角红色record按钮，然后在页面上做一些互动操作。再点击一次那个红色按钮结束记录，你就会看到类似下图的画面：

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg"  alt="DevTools showing long-running style calculations.">

顶部的横线表示该页面每秒渲染的帧数，如果你看到有柱状条超过了下面的那条横线，也就是表示60fps的那条线，那就说明你的页面里有运行时间过长的帧。

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg"  alt="Zooming in on a trouble area in Chrome DevTools.">

如果页面在与用户交互的过程（比如页面滚动）中有运行时间过长的帧，那么我们就得对这些帧好好分析一下了。

如果你看到了很高的紫色柱状条，就像下图所示。那么点击那个紫色条，你会看到更多细节信息。

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg"  alt="Getting the details of long-running style calculations.">

在细节信息中，我们可以看到一个耗时很长的样式计算事件，该事件的执行耗时超过了18毫秒。不巧的是，它正好是在页面滚动过程中发生的，因此给用户带来了一个很明显的卡顿效果。

再点击一下JavaScript事件，你就会看到一个JavaScript事件调用栈。在这个栈中你能准确找到是哪个JavaScript事件触发了样式改动。另外，你还能看到这个样式改动影响到的元素个数（在本示例中这个数字超过400）、样式计算耗时多久。这些信息有助于你寻找改进代码的方法。

## 使用块、元素、修饰语
以[BEM (Block, Element, Modifier)](https://bem.info/){: .external }的方式编写CSS代码，能达到最好的样式计算的性能，因为这种方式建议对每个DOM元素都只使用一个样式class。对于需要层级结构的情况，只需要把层级信息合并到class名里面：


    .list { }
    .list__list-item { }
    

如果你需要用修饰语，比如前面那个需要获取最后一个子元素的例子，你可以这样处理：


    .list__list-item--last-child {}
    

如果你正在寻找一种更好的组织CSS代码的方式，BEM是一个很好的选择，不管是在代码结构、还是样式查找速度方面，它的表现都是很棒的。

如果你不喜欢用BEM，当然还有其他编写CSS的方式可用，不过在使用它之前，你得好好评估一下它在性能方面的表现。

## 参考链接

* [Style invalidation in Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (Block, Element, Modifier)](https://bem.info/){: .external }


