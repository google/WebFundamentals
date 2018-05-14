project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:服务工作线程生命周期的深度教程。

{# wf_updated_on:2016-09-29 #}
{# wf_published_on:2016-09-29 #}

# 服务工作线程生命周期 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

服务工作线程的生命周期是非常复杂的一部分。如果您不了解它要做什么以及它有哪些优势，那么您会感觉它让您败下阵来。然而，一旦您明白它的工作原理，您就可以向用户提供几乎无法察觉的无缝更新，从而使网络和原生模式的优势为您所用。


这是一个深度教程，但每个章节开头的项目列表包含了您需要了解的大部分内容。


## 目的

服务工作线程生命周期的目的：

* 实现离线优先。
* 允许新服务工作线程自行做好运行准备，无需中断当前的服务工作线程。

* 确保整个过程中作用域页面由同一个服务工作线程（或者没有服务工作线程）控制。

* 确保每次只运行网站的一个版本。

最后一点非常重要。如果没有服务工作线程，用户可以将一个标签加载到您的网站，稍后打开另一个标签。
这会导致同时运行网站的两个版本。
有时候这样做没什么问题，但如果您正在处理存储，那么，出现两个标签很容易会让您的操作中断，因为它们的共享的存储空间管理机制大相径庭。这可能会导致错误，更糟糕的情况是导致数据丢失。


注意：用户非常讨厌数据丢失。这会让他们非常沮丧。

## 第一个服务工作线程

简介：

* `install` 事件是服务工作线程获取的第一个事件，并且它仅发生一次。

* 传递到 `installEvent.waitUntil()` 的一个 promise 可表明安装的持续时间以及安装是否成功。

* 在成功完成安装并处于“活动状态”之前，服务工作线程不会收到 `fetch` 和 `push` 等事件。

* 默认情况下，不会通过服务工作线程获取页面，除非页面请求本身需要执行服务工作线程。
因此，您需要刷新页面以查看服务工作线程的影响。

* `clients.claim()` 可替换此默认值，并控制未控制的页面。


<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Installing</text><text y="6.7" x="81.1" class="label">Active</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

选取以下 HTML：

    <!DOCTYPE html>
    An image will appear here in 3 seconds:
    <script>
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.log('Boo!', err));

      setTimeout(() => {
        const img = new Image();
        img.src = '/dog.svg';
        document.body.appendChild(img);
      }, 3000);
    </script>

它注册一个服务工作线程，并在 3 秒后添加一个小狗的图像。

下面是它的服务工作线程，`sw.js`：

    self.addEventListener('install', event => {
      console.log('V1 installing…');

      // cache a cat SVG
      event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
      );
    });

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the cat SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
      }
    });

它缓存一个小猫的图像，并在请求 `/dog.svg` 时提供该图像。
不过，如果您[运行上述示例](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}，首次加载页面时您看到的是一条小狗。
按 refresh，您将看到小猫。


注：猫比狗好。确实*如此*。

### 作用域和控制

服务工作线程注册的默认作用域是与脚本网址相对的 `./`。
这意味着如果您在 `//example.com/foo/bar.js` 注册一个服务工作线程，则它的默认作用域为 `//example.com/foo/`。


我们调用页面、工作线程和共享的工作线程 `clients`。您的服务工作线程只能控制位于作用域内的客户端。
在客户端“受控制”后，它在获取数据时将执行作用域内的服务工作线程。
您可以通过 `navigator.serviceWorker.controller`（其将为 null 或一个服务工作线程实例）检测客户端是否受控制。



### 下载、解析和执行

在调用 `.register()` 时，您的第一个服务工作线程将进行下载。如果您的脚本在初始执行中未能进行下载、解析，或引发错误，则注册器 promise 将拒绝，并舍弃此服务工作线程。



Chrome 的 DevTools 在控制台和应用标签的服务工作线程部分中显示此错误：


<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="服务工作线程 DevTools 标签中显示的错误">
</figure>

### Install

服务工作线程获取的第一个事件为 `install`。该事件在工作线程执行时立即触发，并且它只能被每个服务工作线程调用一次。
如果您更改您的服务工作线程脚本，则浏览器将其视为一个不同的服务工作线程，并且它将获得自己的 `install` 事件。我将[在后面对更新进行详细介绍](#updates)。


在能够控制客户端之前，`install` 事件让您有机会缓存您需要的所有内容。
您传递到 `event.waitUntil()` 的 promise 让浏览器了解安装在何时完成，以及安装是否成功。


如果您的 promise 拒绝，则表明安装失败，浏览器将丢弃服务工作线程。
它将无法控制客户端。这意味着我们可以依靠 `fetch` 事件的缓存中存在的“cat.svg”。
它是一个依赖项。

### Activate

在您的服务工作线程准备控制客户端并处理 `push` 和 `sync` 等功能事件时，您将获得一个 `activate` 事件。
但这不意味着调用 `.register()` 的页面将受控制。


首次加载[此演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}时，即使在服务工作线程激活很长时间后请求 `dog.svg`，它也不会处理此请求，您仍会看到小狗的图像。默认值为 *consistency*，如果在页面加载时不使用服务工作线程，那么也不会使用它的子资源。
如果您第二次加载[此演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}（换言之，刷新页面），该页面将受控制。页面和图像都将执行 `fetch` 事件，您将看到一只猫。




### clients.claim

激活服务工作线程后，您可以通过在其中调用 `clients.claim()` 控制未受控制的客户端。


下面是[上面的演示的变化](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external}，其在 `activate` 事件中调用 `clients.claim()`。
首先您*应该*看到一只猫。
我说“应该”是因为这受时间约束。如果在图像尝试加载之前服务工作线程激活且 `clients.claim()` 生效，那么，您将只看到一只猫。



如果您使用服务工作线程加载页面的方式与通过网络加载页面的方式不同，`clients.claim()` 会有些棘手，因为您的服务工作线程最终会控制一些未使用它加载的客户端。



注：我看到很多人添加 `clients.claim()` 作为样板文件，但我自己很少这么做。
该事件只是在首次加载时非常重要，由于渐进式增强，即使没有服务工作线程，页面也能顺利运行。



## 更新服务工作线程{: #updates}

简介：

* 会触发更新的情况：
    * 导航到一个作用域内的页面。
    * 更新 `push` 和 `sync` 等功能事件，除非在前 24 小时内进行了更新检查。

    * 调用 `.register()`，*仅在*服务工作线程网址已发生变化时。
* 在获取更新时遵循（长达 24 小时）服务工作线程脚本上的缓存标头。
我们将创建此选择加入行为，因为它可以发现问题。
在您的服务工作线程脚本上，您可能需要 `max-age` 为 0。

* 如果服务工作线程的字节与浏览器已有的字节不同，则考虑更新服务工作线程。
（我们正在扩展此内容，以便将导入的脚本/模块也包含在内。）

* 更新的服务工作线程与现有服务工作线程一起启动，并获取自己的 `install` 事件。

* 如果新工作线程出现不正常状态代码（例如，404）、解析失败，在执行中引发错误或在安装期间被拒，则系统将舍弃新工作线程，但当前工作线程仍处于活动状态。


* 安装成功后，更新的工作线程将 `wait`，直到现有工作线程控制零个客户端。
（注意，在刷新期间客户端会重叠。）

* `self.skipWaiting()` 可防止出现等待情况，这意味着服务工作线程在安装完后立即激活。


<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Installing</text><text y="6.7" x="81.1" class="label">Active</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">Waiting</text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

假设我们已更改服务工作线程脚本，在响应时使用马的图片而不是猫的图片。


    const expectedCaches = ['static-v2'];

    self.addEventListener('install', event => {
      console.log('V2 installing…');

      // cache a horse SVG into a new cache, static-v2
      event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.svg'))
      );
    });

    self.addEventListener('activate', event => {
      // delete any caches that aren't in expectedCaches
      // which will get rid of static-v1
      event.waitUntil(
        caches.keys().then(keys => Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )).then(() => {
          console.log('V2 now ready to handle fetches!');
        })
      );
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the horse SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
      }
    });

注：我对马没有什么强烈的看法。

[查看上面的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}。
您应还会看到一个猫的图像。原因是…

### Install

请注意，我已将缓存名称从 `static-v1` 更改为 `static-v2`。这意味着我可以设置新的缓存，而无需覆盖旧服务工作线程仍在使用的当前缓存中的内容。



就像本机应用会为其可执行文件绑定资源那样，此模式会创建特定于版本的缓存。
您可能还有不属于版本特定的缓存，如 `avatars`。


### Waiting

成功安装服务工作线程后，更新的服务工作线程将延迟激活，直到现有服务工作线程不再控制任何客户端。
此状态称为“waiting”，这是浏览器确保每次只运行一个服务工作线程版本的方式。



如果您运行[更新的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}，您应仍会看到一个猫的图片，因为 V2 工作线程尚未激活。在 DevTools 的“Application”标签中，您会看到等待的新服务工作线程：


<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools 显示等待的新服务工作线程">
</figure>

即使在演示中您仅打开一个标签，刷新页面时也不会显示新版本。
这是浏览器导航的工作原理导致的。当您导航时，在收到响应标头前，当前页面不会消失，即使此响应具有一个 `Content-Disposition` 标头，当前页面也不会消失。由于存在这种重叠情况，在刷新时当前服务工作线程始终会控制一个客户端。


要获取更新，需要关闭或退出使用当前服务工作线程的所有标签。
然后，当您[再次浏览演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}时，您看到的应该是一匹马。


此模式与 Chrome 更新的方式相似。Chrome 的更新在后台下载，但只有在 Chrome 重启后才能生效。
在此期间，您可以继续使用当前版本而不会受干扰。
不过，这在开发期间却是个难题，但 DevTools 为我们提供了可简化它的方法，[本文后面会进行介绍](#devtools)。



### Activate

旧服务工作线程退出时将触发 Activate，新服务工作线程将能够控制客户端。
此时，您可以执行在仍使用旧工作线程时无法执行的操作，如迁移数据库和清除缓存。



在上面的演示中，我维护了一个期望保存的缓存列表，并且在 `activate` 事件中，我删除了所有其他缓存，从而也移除了旧的 `static-v1` 缓存。



注意：不要更新以前的版本。它可能是许多旧版本的服务工作线程。

如果您将一个 promise 传递到 `event.waitUntil()`，它将缓冲功能事件（`fetch`、`push`、`sync` 等），直到 promise 进行解析。
因此，当您的 `fetch` 事件触发时，激活已全部完成。


注意：Cache storage API 属于“源存储”（如 localStorage 和 IndexedDB）。
如果您在同源上运行许多网站（例如，`yourname.github.io/myapp`），请注意，不要删除其他网站的缓存。为避免此问题，可以为您的缓存名称提供一个在当前网站上具有唯一性的前缀（例如，`myapp-static-v1`），并且不要删除缓存，除非它们以 `myapp-` 开头。


### 跳过等待阶段

等待阶段表示您每次只能运行一个网站版本，但如果您不需要该功能，您可以通过调用 `self.skipWaiting()` 尽快将新工作线程激活。



这会导致您的服务工作线程将当前活动的工作线程逐出，并在进入等待阶段时尽快激活自己（或立即激活，前提是已经处于等待阶段）。这*不能*让您的工作线程跳过安装，只是跳过等待阶段。

`skipWaiting()` 在等待期间调用还是在之前调用并没有什么不同。
一般情况下是在 `install` 事件中调用它：

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

但是，您可能想在对服务工作线程发出 `postMessage()` 时调用它。
例如，在用户交互后您想要 `skipWaiting()`。

[下面是一个使用 `skipWaiting()` 的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}。
无需离开您就应能看到一头牛的图片。与 `clients.claim()` 一样，它是一个竞态，因此，如果新服务工作线程在页面尝试加载图像前获取数据、安装并进行激活，那么，您将只会看到牛。



注意：`skipWaiting()` 意味着新服务工作线程可能会控制使用较旧工作线程加载的页面。
这意味着页面获取的部分数据将由旧服务工作线程处理，而新服务工作线程处理后来获取的数据。如果这会导致问题，则不要使用 `skipWaiting()`


### 手动更新

如前所述，在执行导航和功能事件后，浏览器将自动检查更新，但是您也可以手动触发更新。


    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

如果您期望用户可以长时间使用您的网站而不必重新加载，您需要按一定间隔（如每小时）调用 `update()`。


### 避免更改服务工作线程脚本的网址

如果您读过[我的一篇有关缓存最佳做法的博文](https://jakearchibald.com/2016/caching-best-practices/){: .external}，您可能会考虑为每个服务工作线程提供一个唯一网址。**请一定不要这么做！** 对于服务工作线程，这通常是一个糟糕的做法，只会在其当前位置更新脚本。


它将给您带来如下问题：

1. `index.html` 将 `sw-v1.js` 注册为一个服务工作线程。
1. `sw-v1.js` 缓存并提供 `index.html`，因此它可以实现离线优先。
1. 您更新 `index.html`，以便注册全新的 `sw-v2.js`。

如果您执行上述操作，用户将永远无法获取 `sw-v2.js`，因为 `sw-v1.js` 将从其缓存中提供旧版本的 `index.html`。
因此，您将自己置于这样的境地：您需要更新服务工作线程才能更新服务工作线程。这真得很让人讨厌。

不过，对于[上面的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}，我*已*更改服务工作线程的网址。
这样做是为了进行演示，让您可以在版本间进行切换。
在生产环境中我不会这么做。


## 让开发更简单{: #devtools}

服务工作线程生命周期是专为用户构建的，这就给开发工作带来一定的困难。
幸运的是，我们可通过以下几个工具解决这个问题：

### Update on reload

这是我最喜欢的工具。

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools 显示“update on reload”">
</figure>

这可使生命周期变得对开发者友好。每次浏览时都将：

1. 重新获取服务工作线程。
1. 将其作为新版本安装，即使它的字节完全相同，这表示运行 `install` 事件并更新缓存。
1. 跳过等待阶段，因此新服务工作线程将激活。
1. 浏览页面。


这意味着每次浏览时（包括刷新）都将进行更新，无需重新加载两次或关闭标签。


### Skip waiting

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools 显示“'skip waiting”">
</figure>

如果您有一个工作线程在等待，您可以按 DevTools 中的“skip waiting”以立即将其提升到“active”。


### Shift-reload

如果您强制重新加载页面 (shift-reload)，则将完全绕过服务工作线程。
页面将变得不受控制。此功能已列入规范，因此，它在其他支持服务工作线程的浏览器中也适用。


## 处理更新

服务工作线程是作为[可扩展网页](https://extensiblewebmanifesto.org/){: .external }的一部分进行设计的。
我们的想法是，作为浏览器开发者，必须承认网页开发者比我们更了解网页开发。因此，我们不应提供狭隘的高级 API 使用*我们*喜欢的模式解决特定问题，而是应该为您提供访问浏览器核心内容的权限，让您可以根据自己的需求以对*您的*用户最有效的方式来解决问题。




因此，为支持尽可能多的模式，整个更新周期都是可观察的：

    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.installing; // the installing worker, or undefined
      reg.waiting; // the waiting worker, or undefined
      reg.active; // the active worker, or undefined

      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has as skipped waiting and become
      // the new active worker. 
    });

## 您成功了！

真是太棒了！这里介绍了许多技术理论。未来数周，我们将深入介绍上面的一些实用的应用，敬请关注！



{# wf_devsite_translation #}
