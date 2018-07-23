project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:服務工作線程生命週期的深度教程。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-09-29 #}

# 服務工作線程生命週期 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

服務工作線程的生命週期是非常複雜的一部分。如果您不瞭解它要做什麼以及它有哪些優勢，那麼您會感覺它讓您敗下陣來。然而，一旦您明白它的工作原理，您就可以向用戶提供幾乎無法察覺的無縫更新，從而使網絡和原生模式的優勢爲您所用。


這是一個深度教程，但每個章節開頭的項目列表包含了您需要了解的大部分內容。


## 目的

服務工作線程生命週期的Objective:

* 實現離線優先。
* 允許新服務工作線程自行做好運行準備，無需中斷當前的服務工作線程。

* 確保整個過程中作用域頁面由同一個服務工作線程（或者沒有服務工作線程）控制。

* 確保每次只運行網站的一個版本。

最後一點非常重要。如果沒有服務工作線程，用戶可以將一個標籤加載到您的網站，稍後打開另一個標籤。
這會導致同時運行網站的兩個版本。
有時候這樣做沒什麼問題，但如果您正在處理存儲，那麼，出現兩個標籤很容易會讓您的操作中斷，因爲它們的共享的存儲空間管理機制大相徑庭。這可能會導致錯誤，更糟糕的情況是導致數據丟失。


Note: 用戶非常討厭數據丟失。這會讓他們非常沮喪。

## 第一個服務工作線程

簡介：

* `install` 事件是服務工作線程獲取的第一個事件，並且它僅發生一次。

* 傳遞到 `installEvent.waitUntil()` 的一個 promise 可表明安裝的持續時間以及安裝是否成功。

* 在成功完成安裝並處於“活動狀態”之前，服務工作線程不會收到 `fetch` 和 `push` 等事件。

* 默認情況下，不會通過服務工作線程獲取頁面，除非頁面請求本身需要執行服務工作線程。
因此，您需要刷新頁面以查看服務工作線程的影響。

* `clients.claim()` 可替換此默認值，並控制未控制的頁面。


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

選取以下 HTML：

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

它註冊一個服務工作線程，並在 3 秒後添加一個小狗的圖像。

下面是它的服務工作線程，`sw.js`：

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

它緩存一個小貓的圖像，並在請求 `/dog.svg` 時提供該圖像。
不過，如果您[運行上述示例](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}，首次加載頁面時您看到的是一條小狗。
按 refresh，您將看到小貓。


Note: 貓比狗好。確實*如此*。

### 作用域和控制

服務工作線程註冊的默認作用域是與腳本網址相對的 `./`。
這意味着如果您在 `//example.com/foo/bar.js` 註冊一個服務工作線程，則它的默認作用域爲 `//example.com/foo/`。


我們調用頁面、工作線程和共享的工作線程 `clients`。您的服務工作線程只能控制位於作用域內的客戶端。
在客戶端“受控制”後，它在獲取數據時將執行作用域內的服務工作線程。
您可以通過 `navigator.serviceWorker.controller`（其將爲 null 或一個服務工作線程實例）檢測客戶端是否受控制。



### 下載、解析和執行

在調用 `.register()` 時，您的第一個服務工作線程將進行下載。如果您的腳本在初始執行中未能進行下載、解析，或引發錯誤，則註冊器 promise 將拒絕，並捨棄此服務工作線程。



Chrome 的 DevTools 在控制檯和應用標籤的服務工作線程部分中顯示此錯誤：


<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="服務工作線程 DevTools 標籤中顯示的錯誤">
</figure>

### Install

服務工作線程獲取的第一個事件爲 `install`。該事件在工作線程執行時立即觸發，並且它只能被每個服務工作線程調用一次。
如果您更改您的服務工作線程腳本，則瀏覽器將其視爲一個不同的服務工作線程，並且它將獲得自己的 `install` 事件。我將[在後面對更新進行詳細介紹](#updates)。


在能夠控制客戶端之前，`install` 事件讓您有機會緩存您需要的所有內容。
您傳遞到 `event.waitUntil()` 的 promise 讓瀏覽器瞭解安裝在何時完成，以及安裝是否成功。


如果您的 promise 拒絕，則表明安裝失敗，瀏覽器將丟棄服務工作線程。
它將無法控制客戶端。這意味着我們可以依靠 `fetch` 事件的緩存中存在的“cat.svg”。
它是一個依賴項。

### Activate

在您的服務工作線程準備控制客戶端並處理 `push` 和 `sync` 等功能事件時，您將獲得一個 `activate` 事件。
但這不意味着調用 `.register()` 的頁面將受控制。


首次加載[此演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}時，即使在服務工作線程激活很長時間後請求 `dog.svg`，它也不會處理此請求，您仍會看到小狗的圖像。默認值爲 *consistency*，如果在頁面加載時不使用服務工作線程，那麼也不會使用它的子資源。
如果您第二次加載[此演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}（換言之，刷新頁面），該頁面將受控制。頁面和圖像都將執行 `fetch` 事件，您將看到一隻貓。




### clients.claim

激活服務工作線程後，您可以通過在其中調用 `clients.claim()` 控制未受控制的客戶端。


下面是[上面的演示的變化](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external}，其在 `activate` 事件中調用 `clients.claim()`。
首先您*應該*看到一隻貓。
我說“應該”是因爲這受時間約束。如果在圖像嘗試加載之前服務工作線程激活且 `clients.claim()` 生效，那麼，您將只看到一隻貓。



如果您使用服務工作線程加載頁面的方式與通過網絡加載頁面的方式不同，`clients.claim()` 會有些棘手，因爲您的服務工作線程最終會控制一些未使用它加載的客戶端。



Note: 我看到很多人添加 `clients.claim()` 作爲樣板文件，但我自己很少這麼做。
該事件只是在首次加載時非常重要，由於漸進式增強，即使沒有服務工作線程，頁面也能順利運行。



## 更新服務工作線程{: #updates}

簡介：

* 會觸發更新的情況：
    * 導航到一個作用域內的頁面。
    * 更新 `push` 和 `sync` 等功能事件，除非在前 24 小時內進行了更新檢查。

    * 調用 `.register()`，*僅在*服務工作線程網址已發生變化時。
* 在獲取更新時遵循（長達 24 小時）服務工作線程腳本上的緩存標頭。
我們將創建此選擇加入行爲，因爲它可以發現問題。
在您的服務工作線程腳本上，您可能需要 `max-age` 爲 0。

* 如果服務工作線程的字節與瀏覽器已有的字節不同，則考慮更新服務工作線程。
（我們正在擴展此內容，以便將導入的腳本/模塊也包含在內。）

* 更新的服務工作線程與現有服務工作線程一起啓動，並獲取自己的 `install` 事件。

* 如果新工作線程出現不正常狀態代碼（例如，404）、解析失敗，在執行中引發錯誤或在安裝期間被拒，則系統將捨棄新工作線程，但當前工作線程仍處於活動狀態。


* 安裝成功後，更新的工作線程將 `wait`，直到現有工作線程控制零個客戶端。
（注意，在刷新期間客戶端會重疊。）

* `self.skipWaiting()` 可防止出現等待情況，這意味着服務工作線程在安裝完後立即激活。


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

假設我們已更改服務工作線程腳本，在響應時使用馬的圖片而不是貓的圖片。


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

Note: 我對馬沒有什麼強烈的看法。

[查看上面的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}。
您應還會看到一個貓的圖像。原因是…

### Install

請注意，我已將緩存名稱從 `static-v1` 更改爲 `static-v2`。這意味着我可以設置新的緩存，而無需覆蓋舊服務工作線程仍在使用的當前緩存中的內容。



就像本機應用會爲其可執行文件綁定資源那樣，此模式會創建特定於版本的緩存。
您可能還有不屬於版本特定的緩存，如 `avatars`。


### Waiting

成功安裝服務工作線程後，更新的服務工作線程將延遲激活，直到現有服務工作線程不再控制任何客戶端。
此狀態稱爲“waiting”，這是瀏覽器確保每次只運行一個服務工作線程版本的方式。



如果您運行[更新的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}，您應仍會看到一個貓的圖片，因爲 V2 工作線程尚未激活。在 DevTools 的“Application”標籤中，您會看到等待的新服務工作線程：


<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools 顯示等待的新服務工作線程">
</figure>

即使在演示中您僅打開一個標籤，刷新頁面時也不會顯示新版本。
這是瀏覽器導航的工作原理導致的。當您導航時，在收到響應標頭前，當前頁面不會消失，即使此響應具有一個 `Content-Disposition` 標頭，當前頁面也不會消失。由於存在這種重疊情況，在刷新時當前服務工作線程始終會控制一個客戶端。


要獲取更新，需要關閉或退出使用當前服務工作線程的所有標籤。
然後，當您[再次瀏覽演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}時，您看到的應該是一匹馬。


此模式與 Chrome 更新的方式相似。Chrome 的更新在後臺下載，但只有在 Chrome 重啓後才能生效。
在此期間，您可以繼續使用當前版本而不會受干擾。
不過，這在開發期間卻是個難題，但 DevTools 爲我們提供了可簡化它的方法，[本文後面會進行介紹](#devtools)。



### Activate

舊服務工作線程退出時將觸發 Activate，新服務工作線程將能夠控制客戶端。
此時，您可以執行在仍使用舊工作線程時無法執行的操作，如遷移數據庫和清除緩存。



在上面的演示中，我維護了一個期望保存的緩存列表，並且在 `activate` 事件中，我刪除了所有其他緩存，從而也移除了舊的 `static-v1` 緩存。



Note: 不要更新以前的版本。它可能是許多舊版本的服務工作線程。

如果您將一個 promise 傳遞到 `event.waitUntil()`，它將緩衝功能事件（`fetch`、`push`、`sync` 等），直到 promise 進行解析。
因此，當您的 `fetch` 事件觸發時，激活已全部完成。


Note: Cache storage API 屬於“源存儲”（如 localStorage 和 IndexedDB）。
如果您在同源上運行許多網站（例如，`yourname.github.io/myapp`），請注意，不要刪除其他網站的緩存。爲避免此問題，可以爲您的緩存名稱提供一個在當前網站上具有唯一性的前綴（例如，`myapp-static-v1`），並且不要刪除緩存，除非它們以 `myapp-` 開頭。


### 跳過等待階段

等待階段表示您每次只能運行一個網站版本，但如果您不需要該功能，您可以通過調用 `self.skipWaiting()` 儘快將新工作線程激活。



這會導致您的服務工作線程將當前活動的工作線程逐出，並在進入等待階段時儘快激活自己（或立即激活，前提是已經處於等待階段）。這*不能*讓您的工作線程跳過安裝，只是跳過等待階段。

`skipWaiting()` 在等待期間調用還是在之前調用並沒有什麼不同。
一般情況下是在 `install` 事件中調用它：

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

但是，您可能想在對服務工作線程發出 `postMessage()` 時調用它。
例如，在用戶交互後您想要 `skipWaiting()`。

[下面是一個使用 `skipWaiting()` 的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}。
無需離開您就應能看到一頭牛的圖片。與 `clients.claim()` 一樣，它是一個競態，因此，如果新服務工作線程在頁面嘗試加載圖像前獲取數據、安裝並進行激活，那麼，您將只會看到牛。



Note: `skipWaiting()` 意味着新服務工作線程可能會控制使用較舊工作線程加載的頁面。
這意味着頁面獲取的部分數據將由舊服務工作線程處理，而新服務工作線程處理後來獲取的數據。如果這會導致問題，則不要使用 `skipWaiting()`


### 手動更新

如前所述，在執行導航和功能事件後，瀏覽器將自動檢查更新，但是您也可以手動觸發更新。


    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

如果您期望用戶可以長時間使用您的網站而不必重新加載，您需要按一定間隔（如每小時）調用 `update()`。


### 避免更改服務工作線程腳本的網址

如果您讀過[我的一篇有關緩存最佳做法的博文](https://jakearchibald.com/2016/caching-best-practices/){: .external}，您可能會考慮爲每個服務工作線程提供一個唯一網址。**請一定不要這麼做！** 對於服務工作線程，這通常是一個糟糕的做法，只會在其當前位置更新腳本。


它將給您帶來如下問題：

1. `index.html` 將 `sw-v1.js` 註冊爲一個服務工作線程。
1. `sw-v1.js` 緩存並提供 `index.html`，因此它可以實現離線優先。
1. 您更新 `index.html`，以便註冊全新的 `sw-v2.js`。

如果您執行上述操作，用戶將永遠無法獲取 `sw-v2.js`，因爲 `sw-v1.js` 將從其緩存中提供舊版本的 `index.html`。
因此，您將自己置於這樣的境地：您需要更新服務工作線程才能更新服務工作線程。這真得很讓人討厭。

不過，對於[上面的演示](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}，我*已*更改服務工作線程的網址。
這樣做是爲了進行演示，讓您可以在版本間進行切換。
在生產環境中我不會這麼做。


## 讓開發更簡單{: #devtools}

服務工作線程生命週期是專爲用戶構建的，這就給開發工作帶來一定的困難。
幸運的是，我們可通過以下幾個工具解決這個問題：

### Update on reload

這是我最喜歡的工具。

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="DevTools 顯示“update on reload”">
</figure>

這可使生命週期變得對開發者友好。每次瀏覽時都將：

1. 重新獲取服務工作線程。
1. 將其作爲新版本安裝，即使它的字節完全相同，這表示運行 `install` 事件並更新緩存。
1. 跳過等待階段，因此新服務工作線程將激活。
1. 瀏覽頁面。


這意味着每次瀏覽時（包括刷新）都將進行更新，無需重新加載兩次或關閉標籤。


### Skip waiting

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="DevTools 顯示“'skip waiting”">
</figure>

如果您有一個工作線程在等待，您可以按 DevTools 中的“skip waiting”以立即將其提升到“active”。


### Shift-reload

如果您強制重新加載頁面 (shift-reload)，則將完全繞過服務工作線程。
頁面將變得不受控制。此功能已列入規範，因此，它在其他支持服務工作線程的瀏覽器中也適用。


## 處理更新

服務工作線程是作爲[可擴展網頁](https://extensiblewebmanifesto.org/){: .external }的一部分進行設計的。
我們的想法是，作爲瀏覽器開發者，必須承認網頁開發者比我們更瞭解網頁開發。因此，我們不應提供狹隘的高級 API 使用*我們*喜歡的模式解決特定問題，而是應該爲您提供訪問瀏覽器核心內容的權限，讓您可以根據自己的需求以對*您的*用戶最有效的方式來解決問題。




因此，爲支持儘可能多的模式，整個更新週期都是可觀察的：

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

真是太棒了！這裏介紹了許多技術理論。未來數週，我們將深入介紹上面的一些實用的應用，敬請關注！



{# wf_devsite_translation #}
