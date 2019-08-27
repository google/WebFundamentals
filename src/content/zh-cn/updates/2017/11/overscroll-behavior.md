project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: CSS overscroll-behavior属性简介。

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS #} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png #} {# wf_featured_snippet: The CSS overscroll-behavior property allows developers to override the browser's overflow scroll effects when reaching the top/bottom of content. It can be used to customize or prevent the mobile pull-to-refresh action. #}

# 控制滚动:自定义拉到刷新和溢出效果{: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include "web/_shared/contributors/majidvp.html" %} {% include "web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

[CSS `overscroll-behavior`](https://wicg.github.io/overscroll-behavior/)属性允许开发人员在到达内容的顶部/底部时覆盖浏览器的默认溢出滚动行为。用例包括禁用移动设备上的“拉出 - 刷新”功能，删除过度滚动发光和橡皮带效果，以及防止页面内容在模态/叠加层下方滚动。

`overscroll-behavior`需要Chrome 63+.它正在开发中或被其他浏览器考虑.有关更多信息,请参阅[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) . {: .caution }

## 背景

### 滚动边界和滚动链接{: #scrollchaining }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>滚动链接Chrome Android。</figcaption>
</figure>

滚动是与页面交互的最基本方式之一，但由于浏览器的古怪默认行为，某些UX模式可能很难处理。例如，使用具有大量项目的app抽屉，用户可能需要滚动浏览。当它们到达底部时，溢出容器停止滚动，因为没有更多的内容要消耗。换句话说，用户到达“滚动边界”。但请注意，如果用户继续滚动会发生什么。 **抽屉*后面*的内容开始滚动** ！滚动由父容器接管;示例中的主页面本身。

原来这种行为称为**滚动链接** ;滚动内容时浏览器的默认行为。通常情况下，默认值非常好，但有时候这是不可取的甚至是意外的。某些应用可能希望在用户点击滚动边界时提供不同的用户体验。

### 拉动刷新效果{: #p2r }

Pull-to-refresh是一种直观的手势，由Facebook和Twitter等移动应用推广。下拉社交订阅源并发布会为最近加载的帖子创建新空间。事实上，这个特定的用户体验已经变得*如此受欢迎* ，以至于Android上的Chrome等移动浏览器采用了同样的效果。向下滑动页面顶部会刷新整个页面：

<div class="clearfix centered">
  <figure class="attempt-left">
    <a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4" target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4" autoplay muted loop height="350" class="border"></video>
    </a>
    <figcaption>Twitter的定制拉动刷新<br>在他们的PWA中刷新饲料时。</figcaption>
  </figure>
  <figure class="attempt-right">
    <a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay muted loop height="350" class="border"></video>
    </a>
    <figcaption>Chrome Android的原生拉动式动作<br>刷新整个页面。</figcaption>
  </figure>
</div>

对于像Twitter [PWA](/web/progressive-web-apps/)这样的情况，禁用本机pull-to-refresh操作可能是有意义的。为什么？在此应用程序中，您可能不希望用户意外刷新页面。还有可能看到双重刷新动画！或者，定制浏览器的操作可能更好，使其与网站的品牌更紧密地对齐。不幸的是，这种类型的定制很难实现。开发人员最终编写不必要的JavaScript，添加[非被动](/web/tools/lighthouse/audits/passive-event-listeners)触摸侦听器（阻止滚动），或将整个页面粘贴在100vw / vh `<div>` （以防止页面溢出）。这些变通方法对滚动性能有[很好的](https://wicg.github.io/overscroll-behavior/#intro)负面影响。

我们可以做得更好！

## 引入`overscroll-behavior` {: #intro }

`overscroll-behavior` [属性](https://wicg.github.io/overscroll-behavior/)是一个新的CSS功能，它控制当您过度滚动容器（包括页面本身）时发生的行为。您可以使用它来取消滚动链接，禁用/自定义拉动刷新操作，禁用iOS上的橡皮筋效果（当Safari实现`overscroll-behavior` ）等等。最好的部分是<strong data-md-type="double_emphasis">使用`overscroll-behavior`不会</strong>像介绍中提到的黑客那样**对页面性能产生负面影响** ！

该属性有三个可能的值：

1. **自动** - 默认。源自元素的滚动可以传播到祖先元素。

- **包含** - 防止滚动链接。滚动不会传播到祖先，但会显示节点内的局部效果。例如，Android上的过度滚动发光效果或iOS上的橡皮筋效果会在用户达到滚动边界时通知用户。 **注意** ：使用`overscroll-behavior: contain`在`html`元素上可以防止过度滚动导航操作。
- **无** -一样`contain` ，但它也可以防止节点本身内反弹时的效果（例如Android的反弹时发光或iOS橡皮）。

注意：如果您只想定义某个轴的行为，则`overscroll-behavior`还支持`overscroll-behavior-x`和`overscroll-behavior-y` 。

让我们深入研究一些例子，看看如何使用`overscroll-behavior` 。

## 防止滚动转义固定位置元素{: #fixedpos }

### 聊天框场景{: #chat }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4" autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>聊天窗口下方的内容也会滚动:(</figcaption>
</figure>

考虑位于页面底部的固定定位聊天框。目的是聊天框是一个独立的组件，它与其背后的内容分开滚动。但是，由于滚动链接，一旦用户点击聊天历史记录中的最后一条消息，文档就会开始滚动。

对于这个应用程序，使聊天框内的滚动保持在聊天内更合适。我们可以通过添加`overscroll-behavior: contain`到包含聊天消息的元素：

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

基本上，我们在聊天框的滚动上下文和主页面之间创建了逻辑分隔。最终结果是当用户到达聊天记录的顶部/底部时，主页面保持不变。从聊天框开始的滚动不会传播出去。

### 页面叠加方案{: #overlay }

“下划线”场景的另一种变体是当您看到内容在**固定位置叠加层**后面滚动时。一个死的赠品`overscroll-behavior`是有序的！浏览器试图提供帮助，但它最终会让网站看起来很麻烦。

**示例** - 包含和不`overscroll-behavior: contain` ：

<figure class="clearfix centered">
  <div class="attempt-left">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4" target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4" autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>之前</b> ：页面内容在叠加下滚动。</figcaption>
  </div>
  <div class="attempt-right">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4" target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4" autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>之后</b> ：页面内容不会在叠加下滚动。</figcaption>
  </div>
</figure>

## 禁用pull-to-refresh {: #disablp2r }

**关闭pull-to-refresh动作只需一行CSS** 。只是阻止整个视口定义元素上的滚动链接。在大多数情况下，那是`<html>`或`<body>` ：

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

通过这个简单的添加，我们修复了[聊天室演示中](https://ebidel.github.io/demos/chatbox.html)的双拉动态刷新动画，并且可以实现使用更整洁的加载动画的自定义效果。收件箱刷新后整个收件箱也会模糊：

<figure class="clearfix centered">
  <div class="attempt-left">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4" autoplay muted loop height="225"></video>
    <figcaption>之前</figcaption>
  </div>
  <div class="attempt-right">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4" autoplay muted loop height="225"></video>
    <figcaption>后</figcaption>
  </div>
</figure>

这是[完整代码](https://github.com/ebidel/demos/blob/master/chatbox.html)的片段：

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## 禁用过卷发光和橡皮筋效果{: #disableglow }

要在按下滚动边界时禁用反弹效果，请使用`overscroll-behavior-y: none` ：

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4" autoplay muted loop height="300" class="border"></video>
    <figcaption><b>之前</b> ：击中滚动边界显示发光。</figcaption>
  </div>
  <div class="attempt-right">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay muted loop height="300" class="border"></video>
    <figcaption><b>之后</b> ：发光禁用。</figcaption>
  </div>
</figure>

注意：这仍将保留左/右滑动导航。要阻止导航，可以使用`overscroll-behavior-x: none` 。但是，这[仍然](https://crbug.com/762023)在Chrome [中实现](https://crbug.com/762023) 。

## 完整演示{: #demo }

综合起来，完整的`overscroll-behavior` [演示](https://ebidel.github.io/demos/chatbox.html)使用`overscroll-behavior`来创建自定义的拉动 - 刷新动画，并禁止滚动转出`overscroll-behavior`小部件。这提供了最佳的用户体验，如果没有CSS `overscroll-behavior` ，这将是很难实现的。

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay muted loop alt="Chatbox demo" height="600"></video>
  </a>
  <figcaption><a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">查看演示</a> | <a href="https://github.com/ebidel/demos/blob/master/chatbox.html" target="_blank">资源</a></figcaption>
</figure>

<br>
