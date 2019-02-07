project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 如果您的网站上有大量图像和视频，但却不想删减任何内容，则可通过延迟加载方法缩短初始页面加载时间，并减少每页负载。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# 延迟加载图像和视频 {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

在网站典型负载中，[图像](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)和[视频](http://beta.httparchive.org/reports/page-weight#bytesVideo)是非常重要的一部分内容。
 不过遗憾的是，项目干系人并不愿意从其现有应用中删除任何媒体资源。
 这种僵局不免令人沮丧，尤其是当所有相关方都希望改善网站性能，但却无法就具体方法达成一致时。
幸运的是，延迟加载解决方案可以减少初始页面负载_和_加载时间，但不会删减任何内容。


## 什么是延迟加载？

延迟加载是一种在加载页面时，延迟加载非关键资源的方法，
 而这些非关键资源则在需要时才进行加载。
 就图像而言，“非关键”通常是指“屏幕外”。
 如果您曾使用过 Lighthouse 并检验过其提供的改进机会，就有可能从
[屏幕外图像审核](/web/tools/lighthouse/audits/offscreen-images)中看到一些这方面的指导：



<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Lighthouse
屏幕外图像审核的屏幕截图。">
  <figcaption><b>图 1</b>. Lighthouse
性能审核的其中一个方面是识别屏幕外图像，而这些图像可用于延迟加载。</figcaption>
</figure>

您可能已经见过延迟加载的实际应用，其过程大致如下：


- 您访问一个页面，并开始滚动阅读内容。
- 在某个时刻，您将占位符图像滚动到视口中。
- 该占位符图像瞬间替换为最终图像。

您可以在热门发布平台
[Medium](https://medium.com/)
上找到图像延迟加载的示例。该平台在加载页面时会先加载轻量级的占位符图像，并在其滚动到视口时，将之替换为延迟加载的图像。


<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="浏览中的 Medium
网站屏幕截图，演示延迟加载的实际应用。 左侧是模糊的占位符，右侧是加载的资源。">

  <figcaption><b>图 2</b>. 图像延迟加载实际应用示例。 占位符图像在页面加载时加载（左侧），当滚动到视口时，最终图像随即加载（即在需要时加载）。</figcaption>


</figure>

如果您不熟悉延迟加载，您可能想知道该方法有何作用和益处。
 请继续阅读，找出答案！

## 为何要延迟加载图像或视频，而不是直接_加载_？

因为直接加载可能会加载用户永远不会查看的内容， 进而导致一些问题：


- 浪费数据流量。 如果使用无限流量网络，这可能还不是最坏的情况（不过，这些宝贵的带宽原本可以用来下载用户确实会查看的其他资源）。
 但如果流量有限，加载用户永远不会查看的内容实际上是在浪费用户的金钱。
- 浪费处理时间、电池电量和其他系统资源。 下载媒体资源后，浏览器必须将其解码，并在视口中渲染其内容。

延迟加载图像和视频时，可以减少初始页面加载时间、初始页面负载以及系统资源使用量，所有这一切都会对性能产生积极影响。
 在本指南中，我们将针对延迟加载图像和视频提供一些技巧及指导，并列举[几个常用的库](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries)。



## 延迟加载图像

从理论上来看，图像延迟加载机制十分简单，但实际上却有很多需要注意的细节。
 此外，有多个不同的用例均受益于延迟加载。
 首先，我们来了解一下在
HTML 中延迟加载内联图像。

### 内联图像

`<img>` 元素中使用的图像是最常见的延迟加载对象。
延迟加载 `<img>` 元素时，我们使用 JavaScript
来检查其是否在视口中。 如果元素在视口中，则其 `src`（有时是 `srcset`）属性中就会填充所需图像内容的网址。


#### 使用 Intersection Observer

如果您曾经编写过延迟加载代码，您可能是使用 `scroll` 或 `resize` 等事件处理程序来完成任务。
 虽然这种方法在各浏览器之间的兼容性最好，但是现代浏览器支持通过
[Intersection Observer API](/web/updates/2016/04/intersectionobserver) 来检查元素的可见性，这种方式的性能和效率更好。



注：并非所有浏览器都支持 Intersection Observer。 如果浏览器之间的兼容性至关重要，请务必阅读[下一节](#using_event_handlers_the_most_compatible_way)，其中会说明如何使用性能稍差（但兼容性更好！）的 scroll 和 resize 事件处理程序来延迟加载图像。





与依赖于各种事件处理程序的代码相比，Intersection Observer 更容易使用和阅读。这是因为开发者只需要注册一个
Observer
即可监视元素，而无需编写冗长的元素可见性检测代码。 然后，开发者只需要决定元素可见时需要做什么即可。
 假设我们的延迟加载 `<img>`
元素采用以下基本标记模式：

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="I'm an image!">
```

在此标记中，我们应关注三个相关部分：

1. `class` 属性，这是我们在
JavaScript 中选择元素时要使用的类选择器。
2. `src` 属性，引用页面最初加载时显示的占位符图像。
3. `data-src` 和 `data-srcset` 属性，属于占位符属性，其中包含元素进入视口后要加载的图像的网址。


现在，我们来看看如何在 JavaScript 中使用
Intersection Observer，并通过以下标记模式延迟加载图像：

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

在文档的 `DOMContentLoaded` 事件中，此脚本会查询 DOM，以获取类属性为 `lazy` 的所有
`<img>` 元素。 如果
Intersection Observer
可用，我们会创建一个新的 Observer，以在 `img.lazy` 元素进入视口时运行回调。 请参阅[此 CodePen
示例](https://codepen.io/malchata/pen/YeMyrQ)，查看代码的实际运行情况。

注：此代码使用名为
`isIntersecting` 的 Intersection Observer 方法，该方法在 Edge 15 的 Intersection Observer
实现中不可用。 因此，以上延迟加载代码（以及其他类似的代码片段）将会失败。
 请查阅[此 GitHub
问题](https://github.com/w3c/IntersectionObserver/issues/211)，以获取有关更完整的功能检测条件的指导。


不过，Intersection Observer
的缺点是虽然[在浏览器之间获得良好的支持](https://caniuse.com/#feat=intersectionobserver)，但并非所有浏览器皆提供支持。
 对于不支持
Intersection Observer
的浏览器，[您可以使用
polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)，或者如以上代码所述，检测 Intersection Observer 是否可用，并在其不可用时回退到兼容性更好的旧方法。

#### 使用事件处理程序（兼容性最好的方法）

虽然您_应该_使用 Intersection Observer
来执行延迟加载，但您的应用可能对浏览器的兼容性要求比较严格。 [您_可以_使用
polyfil 为不支持
Intersection Observer
的浏览器提供支持](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)（这种方法最简单），但也可以回退到使用
[`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll) 和
[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize)的代码，甚至回退到与
[`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
配合使用的
[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)
事件处理程序，以确定元素是否在视口中。


假定使用与上文相同的标记模式，以下 JavaScript
可提供延迟加载功能：

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

此代码在 `scroll` 事件处理程序中使用 `getBoundingClientRect` 来检查是否有任何 `img.lazy` 元素处于视口中。
 使用 `setTimeout` 调用来延迟处理，`active` 变量则包含处理状态，用于限制函数调用。
 延迟加载图像时，这些元素随即从元素数组中移除。
 当元素数组的 `length` 达到 `0` 时，滚动事件处理程序代码随即移除。
 您可在[此 CodePen
示例](https://codepen.io/malchata/pen/mXoZGx)中，查看代码的实际运行情况。

虽然此代码几乎可在任何浏览器中正常运行，但却存在潜在的性能问题，即重复的 `setTimeout` 调用可能纯属浪费，即使其中的代码受限制，它们仍会运行。
 在此示例中，当文档滚动或窗口调整大小时，不管视口中是否有图像，每
200
毫秒都会运行一次检查。 此外，跟踪尚未延迟加载的元素数量，以及取消绑定滚动事件处理程序的繁琐工作将由开发者来完成。



简而言之：请尽可能使用 Intersection Observer，如果应用有严格的兼容性要求，则回退到事件处理程序。



### CSS 中的图像

虽然 `<img>` 标记是在网页上使用图像的最常见方式，但也可以通过 CSS
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
属性（以及其他属性）来调用图像。
 与加载时不考虑可见性的 `<img>` 元素不同，CSS 中的图像加载行为是建立在更多的推测之上。
 构建[文档和 CSS
对象模型](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)以及[渲染
树](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)后，浏览器会先检查 CSS 以何种方式应用于文档，再请求外部资源。
 如果浏览器确定涉及某外部资源的 CSS 规则不适用于当前构建中的文档，则浏览器不会请求该资源。



这种推测性行为可用来延迟 CSS
中图像的加载，方法是使用
JavaScript
来确定元素在视口内，然后将一个类应用于该元素，以应用调用背景图像的样式。 如此即可在需要时而非初始加载时下载图像。
 例如，假定一个元素中包含大型主角背景图片：


```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

`div.lazy-background` 元素通常包含由某些 CSS 调用的大型主角背景图片。
 但是，在此延迟加载示例中，我们可以通过
`visible`
类来隔离 `div.lazy-background` 元素的 `background-image` 属性，而且我们会在元素进入视口时对其添加这个类：

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

我们将从这里使用 JavaScript 来检查该元素是否在视口内（通过
Intersection Observer 进行检查！），如果在视口内，则对
`div.lazy-background` 元素添加 `visible` 类以加载该图像：

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

如上文所述，由于并非所有浏览器都支持 Intersection Observer，因此您需要确保提供回退方案或 polyfill。
请参阅[此 CodePen 演示](https://codepen.io/malchata/pen/wyLMpR)，查看代码的实际运行情况。


## 延迟加载视频

与图像元素一样，视频也可以延迟加载。 在正常情况下加载视频时，我们使用的是 `<video>` 元素（尽管也可以[改为使用 `<img>`](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)，不过实现方式受限）。
 但是，延迟加载 `<video>` 的_方式_取决于用例。
 下文探讨的几种情况所需的解决方案均不相同。


### 视频不自动播放

对于需要由用户启动播放的视频（即_不_自动播放的视频），最好指定 `<video>` 元素的 [`preload`
属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)：



```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

这里，我们使用值为 `none` 的 `preload` 属性来阻止浏览器预加载_任何_视频数据。
 为占用空间，我们使用 `poster`
属性为 `<video>` 元素提供占位符。 这是因为默认的视频加载行为可能会因浏览器不同而有所不同：


- 在 Chrome 中，之前的 `preload` 默认值为 `auto`，但从 Chrome 64 开始，默认值变为 `metadata`。
 虽然如此，在 Chrome 桌面版中，可能会使用 `Content-Range` 标头预加载视频的部分内容。
 Firefox、Edge 和 Internet Explorer 11 的行为与此相似。
- 与 Chrome 桌面版相同，Safari 11.0 桌面版会预加载视频的部分内容，
 而 11.2 版（目前为 Safari 的 Tech Preview 版）仅预加载视频元数据。
 [iOS 版 Safari 不会
预加载视频](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9)。
- 启用[流量节省程序模式](https://support.google.com/chrome/answer/2392284)后，`preload` 默认为 `none`。


由于浏览器在 `preload` 方面的默认行为并非一成不变，因此您最好明确指定该行为。
 在由用户启动播放的情况下，使用 `preload="none"` 是在所有平台上延迟加载视频的最简单方法。
 但 `preload` 属性并非延迟加载视频内容的唯一方法。
 [_利用视频
预加载快速播放_](/web/fundamentals/media/fast-playback-with-video-preload)或许能提供一些想法和见解，助您了解如何通过 JavaScript 播放视频。

但遗憾的是，当我们想使用视频代替动画
GIF 时，事实证明以上方法无效。我们将在下文介绍相关内容。

### 用视频代替动画 GIF

虽然动画 GIF 应用广泛，但其在很多方面的表现均不如视频，尤其是在输出文件大小方面。
 动画
GIF 的数据大小可达数兆字节， 而视觉效果相当的视频往往小得多。


使用 `<video>` 元素代替动画 GIF 并不像使用 `<img>` 元素那么简单。
 动画 GIF
具有以下三种固有行为：

1. 加载时自动播放。
2. 连续循环播放（[但并非始终如此](https://davidwalsh.name/prevent-gif-loop))。
3. 没有音轨。

使用 `<video>` 元素进行替代类似于：

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

`autoplay`、`muted` 和 `loop` 属性的含义不言而喻，而
[`playsinline` 是在 iOS 中进行自动播放所必需](https://webkit.org/blog/6784/new-video-policies-for-ios/)。
 现在，我们有了可以跨平台使用的“视频即 GIF”替代方式。
 但是，如何进行延迟加载？[Chrome 会自动延迟加载视频](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg)，但并不是所有浏览器都会提供这种优化行为。
根据您的受众和应用要求，您可能需要自己手动完成这项操作。
 首先，请相应地修改 `<video>` 标记：

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

您会发现添加了 [`poster`
属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster)，您可以使用该属性指定占位符以占用 `<video>` 元素的空间，直到延迟加载视频为止。
 与上文中的 `<img>` 延迟加载示例一样，我们将视频网址存放在每个 `<source>` 元素的 `data-src` 属性中。
 然后，我们将使用与上文基于 Intersection Observer 的图像延迟加载示例类似的 JavaScript：


```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

延迟加载 `<video>` 元素时，我们需要对所有的 `<source>` 子元素进行迭代，并将其 `data-src` 属性更改为 `src` 属性。
 完成该操作后，必须通过调用该元素的 `load` 方法触发视频加载，然后该媒体就会根据 `autoplay` 属性开始自动播放。




利用这种方法，我们即可提供模拟动画 GIF 行为的视频解决方案。这种方案的流量消耗量低于动画 GIF，而且能延迟加载内容。



## 延迟加载库

如果您并不关心延迟加载的_实现_细节，只想直接选择使用现有的库（无需感到羞愧！），您有很多选项可以选择。
 许多库使用与本指南所示标记模式相似的标记模式。
 以下提供一些实用的延迟加载库：


- [lazysizes](https://github.com/aFarkas/lazysizes) 是功能全面的延迟加载库，可以延迟加载图像和
iframe。 其使用的模式与本文所示的代码示例非常相似，会自动与 `<img>` 元素上的 `lazyload` 类绑定，并要求您在 `data-src` 和/或 `data-srcset` 属性中指定图像网址，这两个属性的内容将分别交换到 `src` 和/或 `srcset` 属性中。
 该库使用 Intersection
Observer（您可以使用 polyfill），并可以通过[许多插件](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo)进行扩展，以执行延迟加载视频等操作。
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) 是超轻量级且只使用 Intersection
Observer 的库。 因此，它的性能极佳，但如果要在旧浏览器上使用，则需要 polyfill。
- [blazy](https://github.com/dinbror/blazy) 是另一个轻量级的延迟加载器（大小为
1.4 KB）。 与 lazysizes 相同，blazy 不需要任何第三方实用程序即可进行加载，并且适用于 IE7+。
但其缺点是不使用 Intersection Observer。
- [yall.js](https://github.com/malchata/yall.js) 是我编写的库，该库使用 Intersection Observer，可回退到事件处理程序，
 而且与 IE11
和主流浏览器兼容。
- 如果您正在寻找 React 特定的延迟加载库，您可考虑使用
[react-lazyload](https://github.com/jasonslyvia/react-lazyload)。 虽然该库不使用
Intersection Observer，但_的确_为习惯于使用 React 开发应用的开发者提供熟悉的图像延迟加载方法。


上述每个延迟加载库都有完备的资料，并提供丰富的标记模式，适用于各种延迟加载工作。
 这些库可以直接使用，无需进行任何修改。
 使用库可以最大限度减轻您的工作量。

## 可能出错的地方

虽然延迟加载图像和视频会对性能产生重要的积极影响，但这项任务并不轻松。
 如果出错，可能会产生意想不到的后果。
 因此，务必要牢记以下几点：


### 注意首屏

使用 JavaScript 对页面上的所有媒体资源进行延迟加载很诱人，但您必须抵挡住这种诱惑。
 首屏上的任何内容皆不可进行延迟加载，
 而应将此类资源视为关键资产，进行正常加载。


以正常而非延迟加载方式加载关键媒体资源的主要理据是，延迟加载会将这些资源的加载延迟到 DOM 可交互之后，在脚本完成加载并开始执行时进行。
 对于首屏线以下的图像，可以采用延迟加载，但对于首屏上的关键资源，使用标准的 `<img>` 元素来加载速度会快得多。


当然，如今用来查看网站的屏幕多种多样，且大小各有不同，因此首屏线的具体位置并不明确。
 笔记本电脑上位于首屏的内容在移动设备上可能位于首屏线_以下_。
 目前并没有完全可靠的建议，无法在每种情况下完美解决这个问题。
 您需要清点页面的关键资产，并以典型方式加载这些图像。



此外，您可能也不想严格限定首屏线作为触发延迟加载的阈值。
 对您来说，更理想的做法是在首屏线以下的某个位置建立缓冲区，以便在用户将图像滚动到视口之前，即开始加载图像。
 例如，Intersection Observer API
允许您在创建新的 `IntersectionObserver` 实例时，在 options 对象中指定 `rootMargin` 属性。
 如此即可为元素提供缓冲区，以便在元素进入视口之前触发延迟加载行为：



```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin:"0px 0px 256px 0px"
});
```

如果 `rootMargin` 的值与您为 CSS
`margin` 属性指定的值相似，这是因为该值就是如此！在本例中，我们将观察元素（默认情况下为浏览器视口，但可以使用 `root` 属性更改为特定的元素）的下边距加宽
256
个像素。
 这意味着，当图像元素距离视口不超过
256
个像素时，回调函数将会执行，即图像会在用户实际看到它之前开始加载。

要使用滚动事件处理代码实现这种效果，只需调整
`getBoundingClientRect` 检查以包括缓冲区，如此一来，您即可在不支持 Intersection Observer 的浏览器上获得相同效果。


### 布局移位与占位符

若不使用占位符，延迟加载媒体可能会导致布局移位。
这种变化不仅会让用户产生疑惑，还会触发成本高昂的 DOM 布局操作，进而耗用系统资源，造成卡顿。
 您至少应考虑使用纯色占位符来占用尺寸与目标图像相同的空间，或者采用
[LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) 或
[SQIP](https://github.com/technopagan/sqip) 等方法，在媒体项目加载前提供有关其内容的提示。




对于 `<img>` 标记，`src` 最初应指向一个占位符，直到该属性更新为最终图像的网址为止。
 请使用 `<video>` 元素中的 `poster` 属性来指向占位符图像。
 此外，请在 `<img>` 和 `<video>` 标记上使用 `width` 和
`height` 属性。 如此可以确保从占位符转换为最终图像时，不会在媒体加载期间改变该元素的渲染大小。



### 图像解码延迟

在 JavaScript 中加载大型图像并将其放入
DOM
可能会占用主线程，进而导致解码期间用户界面出现短时间无响应的情况。 您可以先[使用 `decode`
方法异步解码图像](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)，再将其插入到 DOM 中，以减少此类卡顿现象，但请注意：
这种方法尚不能通用，而且会增加延迟加载逻辑的复杂性。
 如果要采用这种方法，请务必进行检查。 以下示例显示如何通过回退来使用 `Image.decode()`：


```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

请参阅[此 CodePen 链接](https://codepen.io/malchata/pen/WzeZGW)，查看与此示例相似的代码的实际运行情况。
 如果您大部分的图像都相当小，则这种方法的帮助不大，但肯定有助于减少延迟加载大型图像并将其插入 DOM 时的卡顿现象。



### 内容不加载

有时，媒体资源会因为某种原因而加载失败，进而导致发生错误。
 何时会发生这种情况？何时发生视情况而定，以下是一种假设情况：
您有一个短时间（例如，5
分钟）的 HTML 缓存策略，而用户访问网站，_或_保持打开旧选项卡并长时间离开（例如，数个小时），然后返回继续阅读内容。
在此过程中的某个时刻，发生重新部署。 在此部署期间，图像资源的名称因为基于哈希的版本控制而更改，或者完全移除。
 当用户延迟加载图像时，该资源已不可用，因此导致加载失败。


虽然出现这种情况的机会比较小，但您也有必要制定后备计划，以防延迟加载失败。
 对于图像，可采取如下解决方案：


```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

发生错误时采取何种措施取决于应用。 例如，可以将图像占位符区域替换为按钮，以允许用户尝试重新加载该图像，或者直接在图像占位符区域显示错误消息。




此外，也可能会发生其他情况。 无论采取何种方法，在发生错误时通知用户，并提供可能的解决方案总不是坏事。



### JavaScript 可用性

不应假定 JavaScript 始终可用。 如果要延迟加载图像，请考虑提供 `<noscript>` 标记，以便在 JavaScript 不可用时显示图像。
 例如，最简单的回退方法是使用 `<noscript>` 元素在 JavaScript 处于关闭状态时提供图像：


```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="I'm an image!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="I'm an image!">
</noscript>
```

如果 JavaScript 已关闭，用户会_同时_看到占位符图像以及 `<noscript>` 元素中包含的图像。
 要解决此问题，我们可以在 `<html>` 标记上放置 `no-js` 类，如下所示：


```html
<html class="no-js">
```

然后，在通过 `<link>` 标记请求任何样式表之前，于 `<head>` 中放置一行内联脚本，用于在 JavaScript 处于打开状态时从 `<html>` 元素中移除 `no-js` 类：



```html
<script>document.documentElement.classList.remove("no-js");</script>
```

最后，我们可以使用一些 CSS，在 JavaScript 不可用时隐藏类为 lazy 的元素，如下所示：


```css
.no-js .lazy {
  display: none;
}
```

这并不会阻止占位符图像加载，但是结果却更令人满意。
 关闭 JavaScript 的用户不只是能看到占位符图像，这要比只能看到占位符和没有意义的图像内容更好。



## 结论

务必谨慎使用延迟加载图像和视频方法，该方法可以显著减少网站上的初始加载时间和页面负载。
 用户不查看的媒体资源不会为其带来不必要的网络活动和处理成本，但用户可以根据需要查看这些资源。



就性能改进方法而言，延迟加载无可争议。
 如果您的网站上存在大量内联图像，这是减少非必要下载的好方法。
 您的网站用户和项目干系人都会因该方法而受益匪浅！


_特别感谢 [François
Beaufort](/web/resources/contributors/beaufortfrancois)、Dean Hume、[Ilya
Grigork](/web/resources/contributors/ilyagrigorik)、[Paul
Irish](/web/resources/contributors/paulirish)、[Addy
Osmani](/web/resources/contributors/addyosmani)、[Jeff
Posnick](/web/resources/contributors/jeffposnick) 和 Martin Schierle 提供宝贵的反馈意见，帮助显著提高本文的质量。_

