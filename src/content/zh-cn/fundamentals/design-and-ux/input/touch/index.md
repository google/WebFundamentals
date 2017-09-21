project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:从手机到桌面设备的屏幕，使用触摸屏的设备越来越多。应用应该以直观而又优雅的方式响应触摸动作。

{# wf_updated_on: 2014-01-06 #}
{# wf_published_on: 2014-01-01 #}

# 为网站添加触摸功能 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

从手机到桌面设备的屏幕，使用触摸屏的设备越来越多。
当用户选择与应用的 UI 进行交互时，应用应该以直观的方式响应其触摸动作。


<div class="clearfix"></div>

## 响应元素状态

您是否有过这样的经历：触摸或点按网页上的某个元素时怀疑网站是否真的检测到了您的触摸动作？


只需在用户触摸 UI 元素或与其进行交互时改变元素的颜色，用户就能基本确认网站处于工作状态。
这样做不仅能减轻用户的失望感，还能让其觉得网站敏捷并且响应迅速。


DOM 元素可继承下列任何状态：default、focus、hover 和 active。
要在上述每一种状态下改变 UI，我们需要对下列伪类 `:hover`、`:focus` 和 `:active` 应用样式，如下所示：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![说明以不同颜色代表不同按钮状态的图像](images/button-states.png)

在大多数移动浏览器上，系统会在用户点按某个元素后对其应用 *hover* 和/或 *focus* 状态。


请认真考虑所设置的样式以及用户完成触摸后会看到的外观。


注：定位标记和按钮在不同浏览器中可能有不同的行为，因此可以假定在某些情况下保持 **hover** 状态，在其他情况下保持 **focus** 状态。



### 禁止默认浏览器样式

为不同状态添加样式后，您会注意到大多数浏览器在响应用户触摸时实现的是其自己的样式。
这主要是因为当移动设备首次发布时，许多网站还没有适用于 `:active` 状态的样式设置。因此，许多浏览器添加了额外的突出显示颜色或样式来向用户提供反馈。


大多数浏览器使用 `outline` CSS 属性在某个元素获得焦点时在其周围显示一个圆环。
可以使用以下代码禁止该样式：

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari 和 Chrome 添加的点按突出显示颜色可使用 `-webkit-tap-highlight-color` CSS 属性阻止：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Windows Phone 上的 Internet Explorer 也有类似行为，但可通过元标记禁止：


    <meta name="msapplication-tap-highlight" content="no">

Firefox 有两个副作用需要处理。

`-moz-focus-inner` 伪类，它会在可触摸元素上添加一个轮廓，可通过设置 `border: 0` 将轮廓移除。


在 Firefox 上使用 `<button>` 元素时，系统会对该元素应用渐变，可通过设置 `background-image: none` 移除该效果。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

注意：请仅在有对应 `:hover`、`:active` 和 `:focus` 的伪类时禁止上面提到的默认样式！


### 停用用户选择

当您创建 UI 时，在某些情况下您可能希望用户在与 UI 元素进行交互时禁止长按 UI 或将鼠标拖动到 UI 上时选择文本的默认行为。



可以通过 `user-select` CSS 属性实现此目的，但要注意的是，如果用户*需要*选择元素中的文本，在内容上施加这种限制会令其**极其**恼怒。因此务必要小心谨慎地使用。




    user-select: none;

## 实现自定义手势

如果您想到了一个网站自定义交互和手势创意，需要牢记两个主题：


1. 如何支持所有浏览器。
1. 如何保持较高的帧率。


在本文中，我们关注的正是这些主题，它们先是介绍成功登陆所有浏览器所需支持的 API，然后介绍如何高效地使用这些事件。



根据您希望手势具有的功能，您可能希望用户一次只与一个元素进行交互，*也*可能希望他们能同时与多个元素进行交互。



注意：别忘了，一些用户需要键盘输入，并且在触摸屏设备上运行辅助技术的用户可能因手势被辅助技术拦截/使用而无法执行手势。




在本文中，我们将研究两个示例，它们都展示了如何支持所有浏览器，以及如何保持较高的帧率。


![文档触摸 GIF 演示](images/touch-document-level.gif){: .attempt-right }

第一个示例允许用户与一个元素进行交互。在此情况下，您可能希望所有触摸事件都提供给这一个元素，只要手势最初始于元素本身。例如，将手指移动到可滑动元素之外仍可控制元素。


这很有用处，因为它给用户带来了极大的灵活性，但会给用户与 UI 的交互方式施加限制。


<div class="clearfix"></div>

![元素触摸 GIF 演示](images/touch-element-level.gif){: .attempt-right }

不过，如果您希望用户能够同时与多个元素进行交互（利用多点触控），则应仅限触摸特定元素。



这对用户而言更为灵活，但会让操纵 UI 的逻辑复杂化，应对用户错误的弹性下降。


<div class="clearfix"></div>

### 添加事件侦听器

在 Chrome（版本 55 及更高版本）、Internet Explorer 和 Edge 中，`PointerEvents` 是建议的自定义手势实现方法。


在其他浏览器中，`TouchEvents` 和 `MouseEvents` 是正确的方法。

`PointerEvents` 的一大特色是，它将包括鼠标、触摸和触控笔事件在内的多种输入类型合并成一个回调集。需要侦听的事件是 `pointerdown`、`pointermove`、`pointerup` 和 `pointercancel`。


其他浏览器中的对应项是 `touchstart`、`touchmove`、`touchend` 和 `touchcancel` 触摸事件，如果想为鼠标输入实现相同的手势，则需实现 `mousedown`、`mousemove` 和 `mouseup`。




如果对需要使用的事件有疑问，可以看一看这个[触摸、鼠标和指针事件](#touch-mouse-and-pointer-events)表。


使用这些事件需要对 DOM 元素调用 `addEventListener()` 方法，使用的参数为事件名称、回调函数和一个布尔值。布尔值决定是否应在其他元素有机会捕获并解释事件之前或之后捕获事件。（`true` 表示想要先于其他元素捕获事件。）





下面这个示例侦听的是交互的开始。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

注：由于 API 采用了特殊设计，PointerEvents 只需单个 `pointerdown` 事件便可同时处理鼠标和触摸事件。


#### 处理单元素交互

在上面这段简短的代码中，我们只添加了鼠标事件的开始事件侦听器。
其原因是，只有当光标悬停在添加了事件侦听器的元素*之上*时，才会触发鼠标事件。


当我们对 DOM 元素调用 `setPointerCapture` 时，TouchEvents 将在手势开始后对其进行追踪，无论触摸发生在什么位置；PointerEvents 将追踪事件，无论触摸发生在什么位置。



对于鼠标移动和结束事件，我们在手势开始方法*中*添加了事件侦听器，并向文档添加了侦听器，这意味着它可以追踪光标，直至手势完成。



实现以上操作的步骤如下：

1. 添加所有 TouchEvent 和 PointerEvent 侦听器。对于 MouseEvents，**只**添加开始事件。
1. 在开始手势回调内，将鼠标移动和结束事件绑定到文档。这样便可接收所有鼠标事件，无论事件是否发生在原始元素上。
对于 PointerEvents，我们需要对原始元素调用 `setPointerCapture()` 来接收所有进一步的事件。然后处理手势开始。
1. 处理移动事件。
1. 发生结束事件时，从文档中移除鼠标移动和结束侦听器并结束手势。


以下代码段中的 `handleGestureStart()` 方法向文档添加了移动和结束事件：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

我们添加的结束回调是 `handleGestureEnd()`，当手势完成时，这个回调会从文档中移除移动和结束事件侦听器并释放指针捕获，如下所示：



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">  <p>通过按照这种模式向文档添加移动事件，当用户开始与某个元素进行交互并将手势移动到该元素之外时，无论鼠标移动到页面上的什么位置，我们仍可收到鼠标移动事件，因为收到的事件来自文档。</p>





  <p>此图显示了手势开始后我们向文档添加移动和结束事件时触摸事件的行为。</p></div>



![在 `touchstart` 中将触摸事件绑定到文档的插图](images/scroll-bottleneck.gif)


<div class="clearfix"></div>

### 高效响应触摸动作

既然已经完成了对开始和结束事件的处理，我们可以实际响应触摸事件了。


对于任何开始和移动事件，均可轻松地从事件中提取 `x` 和 `y`。


下例通过检查 `targetTouches` 是否存在来检查事件是否来自 `TouchEvent`。
如果存在，则从第一次触摸提取 `clientX` 和 `clientY`。如果事件是 `PointerEvent` 或 `MouseEvent`，则直接从事件本身提取 `clientX` 和 `clientY`。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

`TouchEvent` 有三个包含触摸数据的列表：

* `touches`：屏幕上所有当前触摸的列表，无论它们在什么 DOM 元素之中。
* `targetTouches`：当前事件所绑定的 DOM 元素触摸列表。
* `changedTouches`：因发生变化而导致事件触发的触摸列表。


在大多数情况下，`targetTouches` 便可满足您的所有需求。（如需了解有关这些列表的详细信息，请参阅[触摸列表](#touch-lists)）。


#### 使用 requestAnimationFrame

由于事件回调是在主线程上触发，因此我们需要在事件回调中运行尽可能少的代码，从而保持较高的帧率和防止出现卡顿。



使用 `requestAnimationFrame()` 可以让我们有机会在浏览器正想要绘制帧之前更新 UI，并且有助于减轻事件回调的工作负荷。



如果您不熟悉 `requestAnimationFrame()`，可以[在此处了解详情](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes)。


一种典型的实现是，保存来自开始和移动事件的 `x` 和 `y` 坐标，然后在移动事件回调内请求动画帧。



在演示中，我们将初始触摸位置存储在 `handleGestureStart()` 中（查找 `initialTouchPos`）：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

`handleGestureMove()` 方法先存储其事件的位置，然后在必要时请求动画帧，并以回调形式传入 `onAnimFrame()` 函数：



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

`onAnimFrame` 值是一个函数，被调用时会改变我们的 UI，使其四处移动。
将此函数传入 `requestAnimationFrame()` 的目的是指示浏览器在其即将更新页面（即对页面绘制任何更改）时调用该函数。



在 `handleGestureMove()` 回调中，我们首先检查 `rafPending` 是否为 false，这表示最后一个移动事件后 `requestAnimationFrame()` 是否调用过 `onAnimFrame()`。这意味着，在同一时间等待运行的 `requestAnimationFrame()` 只有一个。


执行 `onAnimFrame()` 回调时，我们在想要移动的任何元素上设置变换，然后将 `rafPending` 更新为 `false`，从而让下一个触摸事件能够请求新的动画帧。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### 利用触摸操作控制手势

CSS 属性 `touch-action` 用于控制元素的默认触摸行为。
我们的示例使用 `touch-action: none` 来防止浏览器在用户触摸时执行任何操作，从而拦截所有触摸事件。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

使用 `touch-action: none` 的影响颇为巨大，因为它会阻止所有默认的浏览器行为。
在许多情况下，采用下面其中一个解决方案是更好的选择。


`touch-action` 可停用浏览器实现的手势。例如，IE10 以上版本支持点按两次执行缩放手势。
将 touch-action 设置为 `manipulation` 可以阻止点按两次的默认行为。



这样您就可以自行实现点按两次手势。

下面列出了常用的 touch-action 值：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">触摸操作参数</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">浏览器将不处理触摸交互。
</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">像  `touch-action: none` 一样停用所有浏览器交互（
 `pinch-zoom` 除外，该交互仍由浏览器处理。
 </td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">处理 JavaScript 中的水平滚动，而
不停用垂直滚动或双指张合缩放（例如图像轮播）。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">停用点按两次手势，可避免浏览器的任何点按延迟。
将滚动和双指张合缩放交由浏览器处理。</td>
    </tr>
  </tbody>
</table>


## 支持较旧版本 IE

如果想支持 IE10，需要处理加有供应商前缀的 `PointerEvents` 版本。



要检查对 `PointerEvents` 的支持情况，一般需要查找 `window.PointerEvent`，但在 IE10 中，则要查找 `window.navigator.msPointerEnabled`。



带供应商前缀的事件名称如下：'MSPointerDown'、'MSPointerUp' 和 'MSPointerMove'。


下例展示的是如何检查支持情况和切换事件名称。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

如需了解详细信息，可以看看这篇[来自 Microsoft 的更新文章](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx)。


##  引用

### 对应不同触摸状态的伪类

<table>
  <thead>
    <tr>
      <th>类</th>
      <th>示例</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="处于按下状态的按钮" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        当光标放置于某个元素上面时进入该状态。
        悬停时的 UI 变化有助于鼓励用户与元素进行交互。
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="处于焦点状态的按钮
" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        当用户按 Tab 在页面上的各个元素间导航时进入该状态。focus 状态可让用户了解当前正在与其进行交互的是哪一个元素；还可让用户轻松地利用键盘浏览 UI。
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="处于按下状态的按钮" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        当选定某个元素时（例如，当用户正点击或触摸某个元素时）进入该状态。
      </td>
    </tr>
  </tbody>
</table>



可以在这里找到权威的触摸事件参考资料：[w3 Touch Events](http://www.w3.org/TR/touch-events/)。


### 触摸、鼠标和指针事件

这些事件是为应用新增手势的构建基块：


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">触摸、鼠标和指针事件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        这是在手指第一次触摸某个元素或用户按住鼠标时调用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        这是用户在屏幕上移动手指或使用鼠标拖动时调用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
       这是用户将手指从屏幕上抬起或松开鼠标时调用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        这是浏览器取消触摸手势时调用的事件。例如，
        用户触摸某个网络应用后切换标签。
      </td>
    </tr>
  </tbody>
</table>

### 触摸列表

每个触摸事件都包括三个列表属性：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">触摸事件属性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        屏幕上的所有当前触摸列表，无论正在触摸的是哪些元素。
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        在作为当前事件目标的元素上开始的触摸列表。
        例如，如果您绑定到 <code>&lt;button&gt;</code>，
       您将只获取该按钮上的当前触摸。如果绑定到文档，则可获得文档上的所有当前触摸。
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        因发生更改而导致事件触发的触摸列表：
        <ul>
          <li>
            对于 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>
            事件 -- 随当前事件刚刚激活的触摸点列表。
          </li>
          <li>
            对于 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>
            事件 -- 最后一个事件后发生过移动的触摸点列表。
          </li>
          <li>
            对于 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            和 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
            事件 -- 刚从表面上移除的触摸点列表。
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### 在 iOS 上启用 active 状态支持

遗憾的是，iOS 上的 Safari 默认情况下不应用 *active* 状态，要将它启用，您需要向 *document body* 或每个元素添加一个 `touchstart` 事件侦听器。



此操作应在 User Agent 测试之后进行，这样它就只能运行在 iOS 设备上。

向 body 添加触摸开始的优点是可以应用于 DOM 中的所有元素，但这可能会在滚动页面时带来性能问题。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


替代方案是向页面中的所有可交互元素添加触摸开始侦听器，从而缓解部分性能问题。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
