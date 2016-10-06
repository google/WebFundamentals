project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 您可以通过 CSS 或 JavaScript 编写动画。 应使用哪种方式，为什么？

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# CSS 对比 JavaScript 动画 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}


有两种主要方法在网页上创建动画：使用 CSS 和使用 JavaScript。 您选择哪种方法实际上取决于项目的其他依赖关系，以及您尝试实现什么类型的效果。

### TL;DR {: .hide-from-toc }
- 使用 CSS 动画来实现较简单的“一次性”转换，例如切换 UI 元素状态。
- 当您想要高级效果时，例如弹跳、停止、暂停、倒退或减速，则使用 JavaScript 动画。
- 如果选择使用 JavaScript 来编写动画，可选用 TweenMax，或者如果想要更轻量的解决方案，则使用 TweenLite。


大多数基本动画可以使用 CSS 或 JavaScript 来创建，但工作量和时间将有所不同 (另请参考[CSS 对比 JavaScript 性能](/web/fundamentals/design-and-ui/animations/animations-and-performance#css-vs-javascript-performance))。 每种方法都各有利弊，但是以下是很好的经验法则：

* **当您为 UI 元素采用较小的独立状态时，使用 CSS。** CSS 转换和动画非常适合于从侧面引入导航菜单，或显示工具提示。 最终，可以使用 JavaScript 来控制状态，但动画本身是采用 CSS。
* **在需要对动画进行大量控制时，使用 JavaScript。** 动态跟踪触摸位置的动画，或需要停止、暂停、减速或倒退的动画一般需要使用 JavaScript。

如果您已使用包括了动画功能的 jQuery 或 JavaScript 框架，则可能发现继续使用该方法来做动画在总体上更方便，而不是切换到 CSS。

### 使用 CSS 编写动画

使用 CSS 编写动画无疑是使事物在屏幕上移动的最简单方式。

以下是一些 CSS 代码，让一个元素同时在 X 轴和 Y 轴上移动 100px。 其实现方法是使用 CSS 转换，用时设置为 500 毫秒。 当添加了`move`类时，`transform`值被改变并且转换开始。


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
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-simple.html">查看示例</a>

除了转换的持续时间之外，还有针对缓动的选项，缓动基本上是动画表现的方式。 您可以在[“缓动的基础知识”](the-basics-of-easing.html)指南上了解更多信息。

如果在上述代码段中，创建单独的 CSS 类来管理动画，则可以使用 JavaScript 来打开和关闭每个动画：


    box.classList.add('move');
    

这样将为应用实现很好的平衡。 您可以侧重于使用 JavaScript 来管理状态，只需在目标元素上设置相应的类，让浏览器去处理动画。 如果您按照这种方法，则可以侦听元素的`transitionend`事件，但前提是您能够放弃对 Internet Explorer 较旧版本的支持；IE 10 是支持这些事件的首个版本。 所有其他浏览器均已支持此事件有一段时间了。

侦听转换结束所需的 JavaScript 如下：


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

除了使用 CSS 转换之外，还可以使用 CSS 动画，这允许您对单个动画关键帧、持续时间和迭代进行更多控制。

Note: 如果您是动画初学者，那么说明一下，关键帧是来自手绘动画的老术语。 动画设计者为一个片段创建多个特定帧，称为关键帧，关键帧将提供某个动作的起止状态，然后它们开始绘出关键帧之间的所有单个帧。 现在我们使用 CSS 动画也有相似的过程，我们指示浏览器，CSS 属性在指定时点需要什么值，然后浏览器填充其中的间隔。

例如，可以使用与转换相同的方式为方框设置动画，但是设置动画时没有任何用户交互（例如点击），而是采用无限重复。 还可以同时更改多个属性：


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need) things get far
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
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-keyframes.html">查看示例</a>

借助 CSS 动画，可独立于目标元素来定义动画本身，并且使用 animation-name 属性来选择所需的动画。

CSS 动画大部分仍采用供应商前缀，Chrome、Safari、Opera、Safari Mobile 和安卓浏览器中使用`-webkit-`。 Internet Explorer 和 Firefox 均不采用前缀。 许多工具可帮助您创建所需的 CSS 前缀版本，使您能够在源文件中编写无前缀的版本。

### 使用 JavaScript 编写动画

比较而言，使用 JavaScript 创建动画比编写 CSS 转换或动画更复杂，但它一般可为开发者提供更多功能。 一般方法是使用`requestAnimationFrame`，在动画的每个帧上，手动确定正在设置动画的元素的每个属性值。

Note: 您可能看到网页上很多使用 setInterval 或 setTimeout 来实现动画的代码。 这是个馊主意，因为动画不会与屏幕的刷新率同步，并且很可能出现抖动和跳帧。 务必要避免使用此类代码，而是使用可以正确同步的 requestAnimationFrame。

以下是在重新创建我们之前所讨论的 CSS 转换时需要编写的 JavaScript。


    function Box () {
    
      var animationStartTime = 0;
      var animationDuration = 500;
      var target = document.querySelector('.box');
    
      this.startAnimation = function() {
        animationStartTime = Date.now();
        requestAnimationFrame(update);
      };
    
      function update() {
        var currentTime = Date.now();
        var positionInAnimation = (currentTime - animationStartTime) / animationDuration;
    
        var xPosition = positionInAnimation * 100;
        var yPosition = positionInAnimation * 100;
    
        target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';
    
        if (positionInAnimation <= 1)
          requestAnimationFrame(update);
      }
    }
    
    var box = new Box();
    box.startAnimation();
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-js.html">查看示例</a>

当您尝试进行扩展以包括更多用例时，此代码开始变得很复杂并且难以管理，因此，一般来说，从许多可用于动画的 JavaScript 库中选择一个会比较好。 如果您已在项目中使用 jQuery，继续使用它并使用[`.animate()`](http://api.jquery.com/animate/){: .external }函数也比较好。 另一方面，如果您需要专门的库，则可以看看[Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)，这个库非常强大。 它有一个轻量化版本，称为 TweenLite，从文件大小角度来看更加友好。

由于使用 JavaScript 动画您可以完全控制元素在每个步骤的样式，因此在您认为合适时可以减慢动画、暂停、停止、倒退以及操纵它。


