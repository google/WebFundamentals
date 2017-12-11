project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2014-12-09 #}

# 离线指南 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

使用 AppCache 可为我们提供支持内容离线工作的几种模式。
如果这些正是您需要的模式，那么恭喜您，您赢了 AppCache 彩票大奖（头奖依然无人认领），剩下的人仍蜷缩在一个角落里[来回摇晃](http://alistapart.com/article/application-cache-is-a-douchebag)。




对于 [ServiceWorker][sw_primer]，我们放弃了尝试解决离线问题，并为开发者提供了灵活组件让他们自行解决此问题。
您可以通过 ServiceWorker 控制缓存和处理请求的方式。
这意味着您可以创建自己的模式。
我们看一下隔离环境中的几个可行模式，但在实践中，您可能会根据网址和上下文以串联方式使用其中的多个模式。



除非另有说明，目前，所有代码示例都可以在 Chrome 和 Firefox 中运行。如需有关服务工作线程支持的完整详情，请参阅[“服务工作线程是否已就绪”?][is_sw_ready]。


对于其中部分模式的运行演示，请查看 [Trained-to-thrill][ttt]，以及展示性能影响的[视频](https://www.youtube.com/watch?v=px-J9Ghvcx4)。



## 缓存计算机 - 何时存储资源

您可以通过 [ServiceWorker][sw_primer] 独立地从缓存处理请求，我们来单独看一下它们。
首先，应在什么时候进行缓存？


### 安装时 - 以依赖项形式 {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker 为您提供一个 `install` 事件。您可以使用该事件做好准备，即处理其他事件之前必须完成的操作。
在进行这些操作时，任何以前版本的 ServiceWorker 仍在运行和提供页面，因此您在此处进行的操作一定不能干扰它们。



**适合于：** CSS、图像、字体、JS、模板等，基本上囊括了您视为网站“版本”的静态内容的任何对象。


如果未能提取上述对象，将使您的网站完全无法运行，对应的本机应用会将这些对象包含在初始下载中。



    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil` 选取一个 promise 以定义安装时长和安装是否成功。
如果 promise 拒绝，则安装被视为失败，并舍弃这个 ServiceWorker （如果一个较旧的版本正在运行，它将保持不变）。`caches.open` 和 `cache.addAll` 将返回 promise。如果其中有任一资源获取失败，则 `cache.addAll` 调用将拒绝。


在 [trained-to-thrill][ttt] 上，我使用此方法[缓存静态资源](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3)。



### 安装时 - 不是以依赖项的形式{: #on-install-not }

<img src="images/cm-on-install-not.png">

与上述相似，但如果缓存失败，既不会延迟安装也不会导致安装失败。


**适合于：** 不是即刻需要的大型资源，如用于游戏较高级别的资源。


    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

我们不会将级别 11-20 的 `cache.addAll` promise 传递回 `event.waitUntil`，因此，即使它失败，游戏在离线状态下仍然可用。当然，您必须考虑到可能缺少这些级别的情况，并且如果缺少，则重新尝试缓存它们。


当级别 11-20 进行下载时，ServiceWorker 可能会终止，因为它已完成处理事件，意味着它们将不会被缓存。
将来，我们计划添加一个后台下载 API 以处理此类情况和较大文件下载，如电影。



### 激活时 {: #on-activate }

<img src="images/cm-on-activate.png">

**适合于：** 清理和迁移。

在新的 ServiceWorker 已安装并且未使用以前版本的情况下，新 ServiceWorker 将激活，并且您将获得一个 `activate` 事件。
由于旧版本退出，此时非常适合处理 IndexedDB 中的架构迁移和删除未使用的缓存。



    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

在激活期间，`fetch` 等其他事件会放置在一个队列中，因此长时间激活可能会阻止页面加载。
尽可能让您的激活简洁，仅针对旧版本处于活动状态时无法执行的操作使用它。



在 [trained-to-thrill][ttt] 上，我使用此方法[移除旧缓存](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17)。


### 用户交互时{: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**适合于：** 如果整个网站无法离线工作，您可以允许用户选择他们需要离线可用的内容。
例如，YouTube 上的某个视频、维基百科上的某篇文章、Flickr 上的某个特定图库。


为用户提供一个“Read later”或“Save for offline”按钮。在点击该按钮后，从网络获取您需要的内容并将其置于缓存中。


    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

[caches API][caches_api] 可通过页面以及服务工作线程获取，这意味着您不需要通过服务工作线程向缓存添加内容。




### 网络响应时 {: #on-network-response }

<img src="images/cm-on-network-response.png">

**适合于：** 频繁更新诸如用户收件箱或文章内容等资源。
同时适用于不重要的资源，如头像，但需要谨慎处理。


如果请求的资源与缓存中的任何资源均不匹配，则从网络中获取，将其发送到页面同时添加到缓存中。


如果您针对一系列网址执行此操作，如头像，那么您需要谨慎，不要使源的存储变得臃肿，如果用户需要回收磁盘空间，您不会想成为主要候选对象。请确保将缓存中不再需要的项目删除。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

为留出充足的内存使用空间，每次您只能读取一个响应/请求的正文。
在上面的代码中，[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) 用于创建可单独读取的额外副本。



在 [trained-to-thrill][ttt] 上，我使用此方法[缓存 Flickr 图像](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109)。


### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**适合于：** 频繁更新最新版本并非必需的资源。
头像属于此类别。

如果有可用的缓存版本，则使用该版本，但下次会获取更新。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

这与 HTTP 的 [stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) 非常相似。


### 推送消息时 {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications) 是基于 ServiceWorker 构建的另一个功能。
该 API 允许唤醒 ServiceWorker 以响应来自操作系统消息传递服务的消息。即使用户没有为您的网站打开标签，也会如此，仅唤醒 ServiceWorker。
您从页面请求执行此操作的权限，用户将收到提示。


**适合于：** 与通知相关的内容，如聊天消息、突发新闻或电子邮件。
同时可用于频繁更改受益于立即同步的内容，如待办事项更新或日历更改。
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

常见的最终结果是出现一个通知，在点按该通知时，打开/聚焦一个相关页面，但在进行此操作前一定要先更新缓存。

很明显，用户在收到推送通知是处于在线状态，但是，当他们最终与通知交互时可能已经离线，因此，因此，允许离线访问此内容非常重要。Twitter 本机应用在大多数情况下都是非常好的离线优先例子，但在这点上却有点问题。



如果没有网络连接，Twitter 无法提供与推送消息相关的内容。
不过，点按通知会移除通知，从而使用户获取的信息将比点按通知前少。
不要这样做！

<div style="clear:both;"></div>

在显示通知之前，以下代码将更新缓存：

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### 后台同步时 {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

Dogfood：后台同步在 Chrome stable 中尚不稳定。

[后台同步](/web/updates/2015/12/background-sync)是基于 ServiceWorker 构建的另一个功能。它允许您一次性或按（非常具有启发性的）间隔请求后台数据同步。
即使用户没有为您的网站打开标签，也会如此，仅唤醒 ServiceWorker。您从页面请求执行此操作的权限，用户将收到提示。


**适合于：** 非紧急更新，特别那些定期进行的更新，每次更新都发送一个推送通知会显得太频繁，如社交时间表或新闻文章。



    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## 缓存持久化 {: #cache-persistence }

为您的源提供特定量的可用空间以执行它需要的操作。该可用空间可在所有源存储之间共享。
LocalStorage、IndexedDB、Filesystem，当然还有 Caches。


您获取的空间容量未指定，其因设备和存储条件而异。
您可以通过以下代码了解您已获得多少空间容量：

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

不过，与所有浏览器存储一样，如果设备出现存储压力，浏览器将随时舍弃这些空间。
遗憾的是，浏览器无法区分您想要不惜任何代价保留的电影和您不太关心的游戏之间有什么不同。



为解决此问题，建议使用 API [`requestPersistent`](https://storage.spec.whatwg.org/){: .external }：


    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

当然，用户必须授予权限。让用户参与此流程非常重要，因为现在我们可以预期用户会控制删除。如果用户的设备出现存储压力，而且清除不重要的数据没能解决问题，那么用户需要凭判断力决定保留哪些项目以及移除哪些项目。





为实现此目的，需要操作系统将“持久化”源等同于其存储使用空间细分中的本机应用，而不是作为单个项目报告给浏览器。




## 提供建议 - 响应请求 {: #serving-suggestions }

无论您缓存多少内容 ServiceWorker 都不会使用缓存，除非您指示它在何时使用缓存以及如何使用。
以下是用于处理请求的几个模式：


### 仅缓存 {: #cache-only }

<img src="images/ss-cache-only.png">

**适合于：** 您认为属于该“版本”网站静态内容的任何资源。您应在安装事件中缓存这些资源，以便您可以依靠它们。



    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

…尽管通常您不需要以特殊方式处理此情况，但[缓存、回退到网络](#cache-falling-back-to-network)涵盖了此内容。


### 仅网络 {: #network-only }

<img src="images/ss-network-only.png">

**适合于：** 没有相应离线资源的对象，如 analytics pings、non-GET 请求。


    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

…尽管通常您不需要以特殊方式处理此情况例，但[缓存、回退到网络](#cache-falling-back-to-network)涵盖了此内容。


### 缓存、回退到网络 {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**适合于：** 如果您以离线优先的方式进行构建，这将是您处理大多数请求的方式。
根据传入请求而定，其他模式会有例外。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

其针对缓存中的资源为您提供“仅缓存”行为，而对于未缓存的资源则提供“仅网络”行为（其包含所有 non-GET 请求，因为它们无法缓存）。



### 缓存和网络竞态 {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**适合于：** 小型资源，可用于改善磁盘访问缓慢的设备的性能。


在硬盘较旧、具有病毒扫描程序且互联网连接很快这几种情形相结合的情况下，从网络获取资源比访问磁盘更快。不过，如果在用户设备上具有相关内容时访问网络会浪费流量，请记住这一点。


    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling.Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### 网络回退到缓存 {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**适合于：** 快速修复（在该“版本”的网站外部）频繁更新的资源。
例如，文章、头像、社交媒体时间表、游戏排行榜。


这意味着您为在线用户提供最新内容，但离线用户会获得较旧的缓存版本。
如果网络请求成功，您可能需要[更新缓存条目](#on-network-response)。


不过，此方法存在缺陷。如果用户的网络时断时续或很慢，他们只有在网络出现故障后才能获得已存在于设备上的完全可接受的内容。这需要花很长的时间，并且会导致令人失望的用户体验。
请查看下一个模式，[缓存然后访问网络](#cache-then-network)，以获得更好的解决方案。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### 缓存然后访问网络{: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**适合于：** 频繁更新的内容。例如，文章、社交媒体时间表、游戏排行榜。


这需要页面进行两次请求，一次是请求缓存，另一次是请求访问网络。
该想法是首先显示缓存的数据，然后在网络数据到达时更新页面。


有时候，当新数据（例如，游戏排行榜）到达时，您可以只替换当前数据，但是具有较大的内容时将导致数据中断。从根本上讲，不要使用户正在读取或交互的内容“消失”。


Twitter 在旧内容上添加新内容，并调整滚动位置，以便用户不会感觉到间断。
这是可能的，因为 Twitter 通常会保持使内容最具线性特性的顺序。
我为 [trained-to-thrill][ttt] 复制了此模式，以尽快获取屏幕上的内容，但当它出现时仍会显示最新内容。



**页面中的代码：**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**ServiceWorker 中的代码：**

我们始终访问网络并随时更新缓存。

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });

注：上述代码在 Chrome 中还不可用，我们还没有向页面公开 `fetch` 和 `caches`（[ticket #1](https://code.google.com/p/chromium/issues/detail?id=436770)、[ticket #2](https://code.google.com/p/chromium/issues/detail?id=439389)）。

在 [trained-to-thrill][ttt] 中，我解决了此问题，方法是使用 [XHR 而不是获取](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3)，滥用 Accept 标头以通知 ServiceWorker 在哪里获取来自（[页面代码](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70)、[ServiceWorker 代码](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)）的结果。





### 常规回退{: #generic-fallback }

<img src="images/ss-generic-fallback.png">

如果您未能从缓存和/或网络提供一些资源，您可能需要提供一个常规回退。


**适合于：** 次要图像，如头像、失败的 POST 请求、“Unavailable while offline”页面。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

您回退到的项目可能是一个[安装依赖项](#on-install-as-dependency)。

如果您的页面正在发布电子邮件，您的 ServiceWorker 可能回退以在 IDB 的发件箱中存储电子邮件并进行响应，让用户知道发送失败，但数据已成功保存。



### ServiceWorker-side templating {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**适合于：** 无法缓存其服务器响应的页面。

[在服务器上渲染页面可提高速度](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)，但这意味着会包括在缓存中没有意义的状态数据，例如，“Logged in as…”。如果您的页面由 ServiceWorker 控制，您可能会转而选择请求 JSON 数据和一个模板，并进行渲染。



    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## 总结

您不必选择上述的某一个方法，您可能会根据请求网址使用其中的多个方法。
例如，[trained-to-thrill][ttt] 使用：


* [在安装时缓存](#on-install-as-dependency)，适用于静态 UI 和行为
* [在网络进行响应时缓存](#on-network-response)，适用于 Flickr 图像和数据
* [从缓存获取、回退到网络](#cache-falling-back-to-network)，适用于大多数请求
* [从缓存获取，然后访问网络](#cache-then-network)，适用于 Flickr 搜索结果

看看请求，决定要采取的措施：

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

…您将获得图片。


### 参考 {: hide-from-toc }
…可爱的图标：

* [代码](http://thenounproject.com/term/code/17547/){: .external }，由 buzzyrobot 提供
* [日历](http://thenounproject.com/term/calendar/4672/){: .external }，由 Scott Lewis 提供
* [网络](http://thenounproject.com/term/network/12676/){: .external }，由 Ben Rizzo 提供
* [SD](http://thenounproject.com/term/sd-card/6185/)，由 Thomas Le Bas 提供
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external }，由 iconsmind.com 提供
* [垃圾桶](http://thenounproject.com/term/trash/20538/){: .external }，由 trasnik 提供
* [通知](http://thenounproject.com/term/notification/32514/){: .external }，由 @daosme 提供
* [布局](http://thenounproject.com/term/layout/36872/){: .external }，由 Mister Pixel 提供
* [云](http://thenounproject.com/term/cloud/2788/){: .external }，由 P.J. Onori 提供

同时感谢 [Jeff Posnick](https://twitter.com/jeffposnick) 在我点击“publish”之前找出了许多明显的错误。


###  深入阅读
* [ServiceWorker - 简介][sw_primer]
* [ServiceWorker 是否已就绪？][is_sw_ready] - 跟踪主要浏览器的实现状态
* [JavaScript Promises - 简介](/web/fundamentals/getting-started/primers/promises) -promise 指南


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
