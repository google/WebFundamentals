project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Workbox的例子。

{# wf_published_on: 2017-10-04 #}
{# wf_updated_on: 2017-11-10 #}
{# wf_blink_components: Blink>ServiceWorker #}

# 概述 {: .page-title }

Workbox是个是一个能让您的网页资源储存在用户的设备的JavaScript库和构建工具。您可以考虑使用Workbox如果你需要：

- 让您的网页能在离线中正常运作。
- 让网页在重复访问中提高加载性能。您可以使用Workbox，来缓存资源，然后在不需要网络的情况下，直接从缓存中提供资源。

## Workbox背后的科技

现代离线web应用进程能被实现是因为[**服务工作者(service workers)**](/web/fundamentals/getting-started/primers/service-workers)。Service workers是个JavaScript的背景工作者。Service workers可以将您需要的资源储存，以在离线中使用。

您可以将service worker想像成一个在用户的设备中背景运行的[代理服务器 ](https://en.wikipedia.org/wiki/Proxy_server)。当您的网页在请求资源时，service worker就会拦截那个请求，并决定是否将那资源储存起来，或者直接从网路上下载最新版本的资源。

Workbox将会把资源储存在**缓存 (Cache)**。Workbox是使用[缓存API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)来**缓存**资源，这是与[HTTP缓存](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)完全不一样。Workbox使用缓存API的最大原因是缓存API可以在*还没*被请求的情况下被缓存。HTTP缓存是做不到的，因为HTTP缓存只能缓存已经被请求的资源。预先储存资源是叫做**预缓存 (Precache)**。 预缓存 HTML文档是Workbox主要可以提高您的网页的加载性能。因此Workbox可以在不使用网路的情况下，直接从缓存中提供网页资源。

用来决定某资源是否要从缓存获取还是从网路下载新的资源的策略是叫做**缓存策略**。不一样的资源设置不一样的缓存策略是很正常的。例如：

- 对于不经常更改的照片或其他的资源，您可以从缓存中获取。
- 如果是用户社交媒体资料的JSON文档，您或许要在获取最新的JSON文档时显示已缓存的内容。

## Workbox解决了什幺问题

简单来说，Workbox能让您再不费工夫的情况下创建一个以优化的service worker代码。

手动设置缓存是个无聊又复杂的工作。Workbox能让您简单地创建一个能够正确地缓存您的网页的资源的service worker代码。

如果您需要对不一样的资源设置不一样的缓存策略，Workbox也能简化这个过程。多数的策略可以使用构建时的配置。而其他的您可以从您的自定的service worker代码中使用`workbox-sw`的核心runtime库。

Workbox也会智能地管理及更新已被缓存的资源。换句话说，当资源有更动或被更新是，Workshop将会下载被更新的资源；而那些其他没有被更新的资源，将会被原封不动地不会被下载及更新。 这是非常的妙也对优化非常重要。而另一个方法是当一个资源被更新，无效整个缓存，这将会导致service worker将全部的资源重新下载。

## 如何使用Workbox

将Workbox集成到您的项目中的一般工作流程是：

1. 创建一个配置文档并告诉Workbox那个资源需要被缓存。
2. 在每个部署之前，在您的项目目录中运行Workbox工具。Workbox将会自动的生成service worker的代码，这将会用来缓存及更新网页的资源。

有几个Workbox工具，每个工具为不同的工作流程而构建：

- `workbox-webpack-plugin`是为 webpack。
- `workbox-build` 是个基于Node的工具，例如Gulp和Grunt。
- `workbox-cli` 是为npm脚本或命令行。

如果您的网页是比较简单的，让Workbox自动产生的service worker是已经足够了。您可以参考[`generateSW()`](reference-docs/latest/module-workbox-build.html#.generateSW)。

但是如果您的网页是比较复杂的，您可能需要自己设置一些自定的路由逻辑。在这种情况下，您可以自己编写您自己的service worker，并将Workbox代码注入到您的service worker。您的代码可能将会像是这样的：

```javascript
importScripts('/path/to/workbox-sw.js'); // 这不是真正的文档名字
const workbox = new WorkboxSW();

// 您自订的service worker逻辑

workbox.precache([]);
```

通过Workbox运行的代码后，最终生成的代码如下所示：

```javascript
importScripts('/path/to/workbox-sw.js'); // 这不是真正的文档名字
const workbox = new WorkboxSW();

// 您自订的service worker逻辑

workbox.precache([
  {
    "url": "/index.html",
    "revision": "b3e78d93b20c49d0c927050682c99df3"
  },
  {
    "url": "/images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },
]);
```

您可以参考[`injectManifest()`](reference-docs/latest/module-workbox-build.html#.injectManifest)。

## 意见

还是不明白什幺是Workbox? 我们希望能听到您的意见。请在[此文档的repo开启新的issue](https://github.com/GoogleChrome/workbox-microsite/issues/new?title=%5BOverview%5D)并告诉我们您的意见。

Translated by {% include "web/_shared/contributors/henrylim.html" %}
