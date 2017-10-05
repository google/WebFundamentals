project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您可以通过 CSS 或 JavaScript 编写动画。应使用哪种方式，为什么？

{# wf_updated_on: 2016-08-25 #}
{# wf_published_on: 2014-08-08 #}

# CSS 对比 JavaScript 动画 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

在网页上创建动画有两种主要方法：使用 CSS 和使用 JavaScript。您选择哪种方法实际上取决于项目的其他依赖关系，以及您尝试实现什么类型的效果。

### TL;DR {: .hide-from-toc }
* 使用 CSS 动画来实现较简单的“一次性”转换，例如切换 UI 元素状态。
* 当您需要高级效果（例如弹跳、停止、暂停、倒退或减速）时，请使用 JavaScript 动画。
* 如果选择使用 JavaScript 来编写动画，可选用 Web Animations API 或用起来顺手的现代框架。


大多数基本动画可以使用 CSS 或 JavaScript 来创建，但工作量和时间将有所不同（另请参考 [CSS 对比 JavaScript 的性能](animations-and-performance#css-vs-javascript-performance)）。每一种方法都有其优点和缺点，但以下内容是很好的指导原则：

* **当您为 UI 元素采用较小的独立状态时，使用 CSS。** CSS 变换和动画非常适合于从侧面引入导航菜单，或显示工具提示。最后，可以使用 JavaScript 来控制状态，但动画本身是采用 CSS。
* **在需要对动画进行大量控制时，使用 JavaScript。** Web Animations API 是一个基于标准的方法，现已在 Chrome 和 Opera 中提供。该方法可提供实际对象，非常适合复杂的对象导向型应用。在需要停止、暂停、减速或倒退时，JavaScript 也非常有用。
* **如果您需要手动协调整个场景，可直接使用 `requestAnimationFrame`。**这属于高级 JavaScript 方法，但如果您构建游戏或绘制到 HTML 画布，则该方法非常有用。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

或者，如果您已使用包括动画功能的 JavaScript 框架，比如通过 jQuery 的 [`.animate()`](https://api.jquery.com/animate/){: .external } 方法或 [GreenSock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)，则可能发现继续使用该方法实现动画在总体上更方便。

<div class="clearfix"></div>

## 使用 CSS 编写动画

使用 CSS 编写动画是使内容在屏幕上移动的最简单方式。此方法被称为*声明式*，因为您可以指定您想要的结果。

以下是一些 CSS 代码，让一个元素同时在 X 轴和 Y 轴上移动 100px。其实现方法是使用 CSS 变换，用时设置为 500 毫秒。当添加了 `move` 类时，`transform` 值被改变并且变换开始。


    .box {
      -webkit-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 500ms;
    
      transform: translate(0, 0);
      transition: transform 500ms;
    }
    
    .box.move {
      -webkit-transform: translate(100px, 100px);
      transform: translate(100px, 100px);
    }
    
[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

除了变换的持续时间之外，还有针对*缓动*的选项，缓动基本上是动画表现的方式。如需详细了解关于缓动的信息，请参阅[缓动基础知识](the-basics-of-easing)指南。

如果在上述代码段中，您创建单独的 CSS 类来管理动画，则可以使用 JavaScript 来打开和关闭每个动画：


    box.classList.add('move')；
    

此操作将给您的应用带来良好的平衡。您可以侧重于使用 JavaScript 来管理状态，只需在目标元素上设置相应的类，让浏览器去处理动画。如果您按照这种方法，则可以侦听元素的 `transitionend` 事件，但前提是您能够放弃对 Internet Explorer 较旧版本的支持；IE 10 是支持这些事件的首个版本。所有其他浏览器均已支持此事件有一段时间了。

侦听变换结束所需的 JavaScript 如下所示：


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

除了使用 CSS 变换之外，还可以使用 CSS 动画，这允许您对单个动画关键帧、持续时间和迭代进行更多控制。

注：如果您是动画初学者，那么说明一下，关键帧是来自手绘动画的老术语。动画设计者为一个片段创建多个特定帧，称为关键帧，关键帧将提供某个动作的起止状态，然后它们开始绘出关键帧之间的所有单个帧。现在我们使用 CSS 动画也有相似的过程，我们指示浏览器，CSS 属性在指定时点需要什么值，然后浏览器填充其中的间隔。

例如，可以使用与变换相同的方式为方框设置动画，但是设置动画时没有任何用户交互（例如点击），而是采用无限重复。还可以同时更改多个属性：


    /**
     * This is a simplified version without
     * vendor prefixes.With them included
     * (which you will need), things get far
     * more verbose!
     */
    .box {
      /* Choose the animation */
      animation-name: movingBox;
    
      /* The animation’s duration */
      animation-duration: 1300ms;
    
      /* The number of times we want
          the animation to run */
      animation-iteration-count: infinite;
    
      /* Causes the animation to reverse
          on every odd iteration */
      animation-direction: alternate;
    }
    
    @keyframes movingBox {
      0% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
    
      25% {
        opacity: 0.9;
      }
    
      50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
      }
    
      100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
      }
    }
    

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

借助 CSS 动画，可独立于目标元素来定义动画本身，并且使用 animation-name 属性来选择所需的动画。

CSS 动画在某种程度上仍采用供应商前缀，在 Safari、Safari Mobile 和 Android 浏览器中使用`-webkit-`。Chrome、Opera、Internet Explorer 和 Firefox 均不采用前缀。许多工具可帮助您创建所需的 CSS 前缀版本，使您能够在源文件中编写无前缀的版本。

## 使用 JavaScript 和 Web Animations API 编写动画

比较而言，使用 JavaScript 创建动画比编写 CSS 变换或动画更复杂，但它一般可为开发者提供更多功能。您可以使用 [Web Animations API](https://w3c.github.io/web-animations/) 给特定的 CSS 属性设置动画，或构建可组合的效果对象。

JavaScript 动画是*命令式*，因为您将它们作为代码的一部分嵌入代码中。您还可以将它们封装在其他对象内。以下是在重新创建我们之前所讨论的 CSS 变换时需要编写的 JavaScript：


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

默认情况下，Web Animations 仅修改元素的呈现形式。如果您想让您的对象保持在它已移动到的位置，则应在动画完成时，按照我们的示例修改其底层样式。

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

Web Animations API 是来自 W3C 的新标准，在 Chrome 和 Opera 中受原生支持，且[正在进行针对 Firefox 的开发](https://birtles.github.io/areweanimatedyet/){: .external }。对于其他的现代浏览器，[提供 polyfill](https://github.com/web-animations/web-animations-js)。

使用 JavaScript 动画，您可以完全控制元素在每个步骤的样式。这意味着您可以在您认为合适时减慢动画、暂停动画、停止动画、倒退动画和操纵元素。如果您正在构建复杂的对象导向型应用，则此方法特别有用，因为您可以正确封装您的行为。


{# wf_devsite_translation #}
