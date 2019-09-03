project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# 你的第一个渐进式 Web 应用（Progressive Web App - PWA） {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## 简介

### 什么是 Web 应用，一个渐进式 Web 应用？

渐进式 Web 应用会在桌面和移动设备上提供可安装的、仿应用的体验，可直接通过 Web 进行构建和交付。它们是快速、可靠的 Web 应用。最重要的是，它们是适用于任何浏览器的 Web 应用。如果你在构建一个 Web 应用，其实已经开始构建渐进式 Web 应用了。

#### 快速 & 可靠

每个 Web 体验都必须快速，对于渐进式 Web 应用更是如此。快速是指在屏幕上获取有意义内容所需的时间，要在不到 5 秒的时间内提供交互式体验。

并且，它必须**真的很快**。很难形容可靠的高性能有多重要。可以这样想: 本机应用的首次加载令人沮丧。应用商店和漫长的下载都是门槛，不过，该前期成本包含了今后该应用的每次启动时间，一旦你安装好该应用，这些启动过程就不会再有额外的延迟。每个应用的启动速度都与上一次一样快，没有任何差异。已安装的渐进式 Web 应用必须能让用户获得可靠的性能。

#### 安装

渐进式 Web 应用可以在浏览器选项卡中运行，但也可以安装。为网站添加书签只是添加了一个快捷方式，但已安装的渐进式 Web 应用的外观和行为会与任何已安装的应用类似。它与其它应用的启动位置是一样的。你可以控制启动体验，包括自定义启动画面、图标等。它在应用窗口中作为应用运行，没有地址栏或其它浏览器 UI。与其它已安装的应用一样，它是任务管理器中的顶级应用。

请记住，让可安装的 PWA 保持快速可靠是至关重要的。安装 PWA 的用户希望他们的应用正常运行，无论他们使用何种网络连接。这是每个已安装应用必须满足的基线预期。

#### 手机 & 桌面

使用响应式设计技术，渐进式 Web 应用可在移动**和**桌面上工作，使用跨平台的单一代码库。如果你正在考虑是否编写本机应用，请看看 PWA 提供的好处。

### 你将构建什么

在此 codelab 中，你将使用渐进式 Web 应用技术构建天气 Web 应用。你的应用将:

* 使用响应式设计，因此它可用在桌面或移动设备上。
* 快速，使用 Service Worker 来预缓存运行时所需的应用资源（HTML，CSS，JavaScript，图像），并在运行时缓存天气数据以提高性能。
* 可安装，使用 Web 应用清单（manifest）和 `beforeinstallprompt` 事件告诉用户它是可安装的。

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning:为了简化此 codelab ，并解释提供离线体验的基础知识，我们使用的是原生 JavaScript。在生产应用中，我们强烈建议使用 [Workbox](/web/tools/workbox/) 工具来构建 Service Worker 。它可以帮你消除许多可能遇到的坑和死角。

### 你将学到什么

* 如何创建和添加 Web 应用清单
* 如何提供简单的离线体验
* 如何提供完整的离线体验
* 如何使你的应用可安装

此 codelab 专注于渐进式 Web 应用。屏蔽了不相关的概念和代码块，并为你提供简单的复制和粘贴。

### 你需要什么

* 最近版本的 Chrome（74 或更高版本）

  PWA 只是个 Web 应用，因此适用于所有浏览器，但我们将使用 Chrome DevTools 的一些功能来更好地了解浏览器层面的情况，并用它来测试安装体验。

* 了解 HTML，CSS，JavaScript 和[Chrome DevTools](https://developer.chrome.com/devtools) 。

## 环境准备

### 获取 Dark Sky API 的密钥

我们的天气数据来自 [Dark Sky API](https://darksky.net/dev)。要使用它，你需要申请 API 密钥。它很容易使用，并且可以免费用于非商业项目。

[注册一个 API Key](https://darksky.net/dev/register)

Note: 你还可以在没有 Dark Sky API 密钥的情况下完成此 codelab。如果我们的服务器无法从 Dark Sky API 获取真实数据，它将返回假数据。

#### 验证你的 API 密钥是否正常工作

要测试你的 API 密钥是否正常工作，请向 DarkSky API 发出 HTTP 请求。修改以下网址，将 `DARKSKY_API_KEY` 替换为你的 API 密钥。如果一切正常，你应该看到纽约市的最新天气预报。

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### 获取代码

我们已将此项目所需的一切都放入 Git 仓库中。首先，你需要获取代码并在你喜欢的开发环境中打开它。对于此代码库，我们建议使用 Glitch。

#### 强烈推荐: 使用 Glitch 导入仓库

推荐用 Glitch 来使用此代码库。

1. 打开一个新的浏览器选项卡，然后转到 [https://glitch.com](https://glitch.com) 。
2. 如果你没有帐户，则需要注册。
3. 单击 __New Project__，然后单击 __Clone from Git Repo.__
4. 克隆 __https://github.com/googlecodelabs/your-first-pwapp.git__ 并单击确定。
5. 获取完 repo 后，编辑 `.env` 文件，并使用 DarkSky API 密钥来更新它。
6. 单击 __Show Live__ 按钮以查看此 PWA 的运行情况。

#### 替代方案: 下载代码并在本地工作

如果你想下载代码并在本地工作，你需要安装好最新版本的 Node 和代码编辑器。

Caution: 如果你在本地工作，某些 Lighthouse 审计可能无法通过，甚至可能无法安装，因为本地服务器并没有在安全环境下运行。

[下载源码](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. 解压缩下载的 zip 文件。
2. 运行 `npm install` 以安装运行服务器所需的依赖项。
3. 编辑 `server.js` 并设置 DarkSky API 密钥。
4. 运行 `node server.js` 以在端口 8000 上启动服务器.
5. 打开浏览器选项卡并转到 [http://localhost:8000](http://localhost:8000)

## 建立基线

### 我们的起点是什么？

我们的起点是为此 codelab 设计的基本天气应用。代码已经大幅简化，以突显此代码库中的概念，并且它几乎没有做错误处理。如果你选择在生产应用中复用此代码，请确保处理各种错误并完全测试所有代码。

我们将试着......

1. 使用右下角的蓝色加号按钮来添加新城市。
2. 使用右上角的刷新按钮来刷新数据。
3. 使用每张城市卡片右上角的 x 来删除城市。
4. 了解它在桌面和移动设备上的工作原理。
5. 看看当离线时会发生什么。
6. 使用 Chrome 的“网络”面板，查看当网络受限制为慢速3G 时会发生什么。
7. 通过更改 `server.js` 中的 `FORECAST_DELAY` 为天气预报服务器添加延迟

### 用 Lighthouse 进行审计

[Lighthouse](/web/tools/lighthouse/#devtools)是一款易于使用的工具，可帮助你提高网站和网页的质量。它可用来对性能，可访问性，渐进式 Web 应用等进行审计。每种审计及都有一个参考文档，解释了该审计为何重要，以及如何解决所发现的问题。

![b112675caafccef0.png](img/b112675caafccef0.png)

我们将使用 Lighthouse 来审计我们的天气应用，并验证我们所做的更改。

Note: 你可以在 Chrome DevTools 中，以命令行或 Node 模块的方式运行 Lighthouse。考虑将[Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) 添加到你的构建流程中，以确保你的 Web 应用不会出现回归问题。

### 让我们运行 Lighthouse

1. 在新选项卡中打开项目。
2. 打开 Chrome DevTools 并切换到 **Audits** 选项卡，DevTools 会显示审计类别列表，全部启用它们。
3. 单击 __Run audits__，60-90 秒后，Lighthouse 会在页面上显示报告。

### 审计渐进式 Web 应用

我们将重点关注渐进式 Web 应用的审计结果。

![af1a64a13725428e.png](img/af1a64a13725428e.png)

这里有很多红色信息需要关注:

* __❗失败:__ 在离线时当前页面未给出 200 响应。
* __❗失败:__ 在离线时 `start_url` 未给出 200 响应。
* __❗失败:__ 未注册用来控制页面和 `start_url` 的 Service Worker。
* __❗失败:__ Web 应用清单 (manifest) 不符合可安装性要求。
* __❗失败:__ 未配置自定义闪屏。
* __❗失败:__ 未设置地址栏的主题颜色。

让我们进入并开始修复其中的一些问题！

## 添加 Web 应用清单

到本节结束时，我们的天气应用将通过以下审计:

* Web 应用清单 (manifest) 不符合可安装性要求。
* 未配置自定义的初始屏幕。
* 未设置地址栏的主题颜色。

### 创建 Web 应用清单

[Web 应用清单](/web/fundamentals/web-app-manifest)是一个简单的 JSON 文件，它使开发人员能够控制本应用对用户的显示方式。

使用 Web 应用清单，你的 Web 应用可以:

* 告诉浏览器你希望本应用在独立窗口中打开（ `display` ）。
* 定义首次启动本应用时要打开哪个页面（ `start_url` ）。
* 定义应用在 Dock 或应用启动器上应该是什么样子（ `short_name` ，`icons` ）。
* 创建一个闪屏（ `name` ， `icons` ， `colors` ）。
* 告诉浏览器以横向或纵向模式打开窗口（ `orientation` ）。
* 以及[很多其它配置](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) 。

在项目中创建名为 `public/manifest.json` 的文件，并复制/粘贴以下内容:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

本清单可支持一组用于不同屏幕尺寸的图标。对于此 codelab ，我们还包含了一些其它的，因为我们需要把它们集成进 iOS。

Note: 如果想安装它，Chrome 会要求你至少提供 192x192px 图标和 512x512px 图标。但是你也可以提供其它尺寸。 Chrome 会使用最接近 48dp 的图标，例如，2x 设备上的 96px 或 3x 设备的 144px。

### 添加指向 Web 应用清单的链接

接下来，我们需要通过向应用中的每个页面添加 `<link rel="manifest"...` 来把此清单告知浏览器。把下列代码行添加到 `index.html` 文件中的 `<head>` 元素下。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools Detour

DevTools 提供了一种快速简便的方法来检查你的 `manifest.json` 文件。打开 __Application__ 面板上的 __Manifest__ 窗格。如果你已正确添加清单信息，你将能够在此窗格中看到它以对人类友好的格式进行解析和显示。

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### 添加 iOS 元标记和图标

iOS 上的 Safari 不支持 Web 应用清单（ [至少目前为止](https://webkit.org/status/#specification-web-app-manifest) ），因此你需要将[传统的 `meta` 标签](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)添加到 `index.html` 文件的 `<head>` 中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### 额外工作: 简易 Lighthouse 修复

我们的 Lighthouse 审计还提出了一些其它很容易解决的问题，所以让我们先来处理下这些问题。

#### 设置元描述

根据 SEO 审计，Lighthouse 提出我们的 “ [Document does not have a meta description.](/web/tools/lighthouse/audits/description) ”。描述可以显示在 Google 的搜索结果中。高质量，独特的描述可以使你的搜索结果与搜索用户更相关，并可以增加搜索流量。

要添加描述，请将以下 `meta` 标记添加到文档的 `<head>` 中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### 设置地址栏的主题颜色

在 PWA 审计中，Lighthouse 提出我们的应用“ [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) ”。将浏览器的地址栏设置为与你的品牌色相匹配，可以提供更加沉浸式的用户体验。

要在移动设备上设置主题颜色，请将以下 `meta` 标记添加到文档的 `<head>` 中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### 用 Lighthouse 验证更改

再次运行 Lighthouse（通过单击“审计”窗格左上角的+号）并验证你的更改。

__SEO 审计__

*__✅通过:__ 文档已有元描述。

__渐进式应用审计__

* __❗失败:__ 在离线时当前页面未给出 200 响应。
* __❗失败:__ 在离线时 `start_url` 未给出 200 响应。
* __❗失败:__ 未注册用来控制页面和 `start_url` 的 Service Worker。
*__✅通过:__ Web 应用清单符合可安装性要求。
*__✅通过:__ 已配置自定义闪屏。
*__✅通过:__ 已设置地址栏的主题颜色。

## 提供基本的离线体验

用户会期待所安装的应用在离线时始终具有基线体验。因此对于可安装的 Web 应用来说，永远不会显示 Chrome 的离线恐龙图是至关重要的。离线体验的范围包括简单的离线页面、具有先前缓存数据的只读体验，甚至具有完全功能的离线体验（在网络连接恢复时自动同步）。

在本节中，我们将向天气应用添加一个简单的离线页面。如果用户在离线时尝试加载应用，则会显示我们的自定义页面，而不是浏览器显示的典型离线页面。到本节结束时，我们的天气应用将通过以下审计:

* 在离线时当前页面未给出 200 响应。
* 在离线时 `start_url` 未给出 200 响应。
* 未注册用来控制页面和 `start_url` 的 Service Worker。

在下一部分中，我们将使用完整的离线体验替换我们的自定义离线页面。这将改善离线体验，但更重要的是，它将显著提高我们的性能，因为我们的大多数资产（HTML，CSS 和 JavaScript）都将在本地存储和提供，从而消除了网络方面的潜在瓶颈。

### 向 Service worker 求援

如果你对 Service Worker 不熟悉，可以通过阅读 [Service Workers 简介](/web/fundamentals/primers/service-worker/)来了解它们可以做什么，它们的生命周期如何工作等等，从而获得初步的理解。完成此 codelab 后，请务必查看 [Debugging Service Workers code lab](http://goo.gl/jhXCBy)以便更深入地了解如何与 Service Worker 合作。

通过 Service Worker 提供的功能应被视为渐进增强功能，并且仅在浏览器支持时才添加。例如，对于 Service Worker ，你可以为应用缓存[应用外壳](/web/fundamentals/architecture/app-shell)和数据，以便在网络不可用时也能使用它。如果不支持 Service Worker ，则不会调用离线代码，而用户将获得基本体验。使用特性检测来提供渐进增强功能的开销很小，并且在不支持该功能的旧浏览器中不会出错。

Warning: Service Worker 功能仅在通过 HTTPS 访问的页面上可用（http://localhost 及其等价物也可用来协助我们进行测试）。

### 注册 Service Worker

第一步是注册 Service Worker 。将以下代码添加到 `index.html` 文件中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

此代码检查 Service Worker  API 是否可用，如果是，则在页面[加载完毕时](/web/fundamentals/primers/service-workers/registration)注册 `/service-worker.js` 的 Service Worker。

注意， Service Worker 是从根目录提供的，而不是从 `/scripts/` 目录。这是设置 Service Worker 的 **`scope`** 的最简单方法。Service Worker 的 `scope` 会决定 Service Worker 能控制哪些文件，换句话说， Service Worker 将拦截哪个路径下的请求。默认的 `scope` 是 Service Worker 文件所在的位置并及其各级目录。因此，如果 `service-worker.js` 位于根目录中，则 Service Worker 将控制对该域中所有网页的请求。

### Precache 离线页面

首先，我们需要告诉 Service Worker 缓存什么。我们已经创建了一个简单的[离线页面](https://your-first-pwa.glitch.me/offline.html) （ `public/offline.html` ），只要没有网络连接，我们就会显示它。

在 `service-worker.js` 中，将 `'/offline.html',` 添加到 `FILES_TO_CACHE` 数组中，最终结果应如下所示:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

接下来，我们需要修改 `install` 事件以告知 Service Worker 预先缓存离线页面:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note:  Service Worker 的事件和生命周期将在下一节中介绍。

我们的 `install` 事件现在使用 `caches.open()` 打开缓存并传入缓存名称。提供缓存名称能让我们对缓存资源进行版本控制或移除，这样我们我们就能轻松的修改一个而不影响另一个。

一旦缓存打开，我们就可以调用 `cache.addAll()` 了，它接受一个 URL 列表，从服务器获取这些 URL 并将其响应添加到缓存中。请注意，如果任何单个请求失败，`cache.addAll()` 就不会生效。这意味着你可以确保，如果安装步骤成功了，你的缓存必然处于一致的状态。但是，如果由于某种原因而失败了，它将在下次 Service Worker 启动时自动重试。

#### DevTools Detour

让我们来看看如何使用 DevTools 来理解和调试 Service Worker 。在重新加载页面之前，打开 DevTools，转到 __Application__ 面板上的 __Service Workers__ 窗格。它应该如下所示:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

当你看到这样的空白页面时，表示当前打开的页面中没有任何已注册的 Service Worker 。

现在，重新加载页面，“Service Worker” 窗格应如下所示:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

当你看到这样的信息时，表示该页面正在运行 Service Worker 。

状态标签旁边有一个数字（这里是*34251*），在你使用 Service Worker 时，请密切注意该数字。这是一种判断你的 Service Worker 是否已更新的简单方式。

### 清理旧的离线页面

我们将使用 `activate` 事件来清理缓存中的任何旧数据。此代码可确保你的 Service Worker 在任何应用外壳文件发生更改时更新其缓存。为了使其工作，你需要在 Service Worker 文件的顶部增加 `CACHE_NAME` 变量。

将以下代码添加到 `activate` 事件中:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevTools Detour

打开 “Service Worker” 窗格，刷新页面，你将看到安装了新的 Service Worker ，并且状态编号会递增。

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

更新后的 Service Worker 立即获得控制权，因为我们的 `install` 事件以 `self.skipWaiting()` 结束， `activate` 事件以 `self.clients.claim()` 结束。如果没有这些，只要有一个打开着此页面的选项卡，旧的 Service Worker 就会继续控制此页面。

### 处理失败的网络请求

最后，我们需要处理 `fetch` 事件。我们将使用 ["网络优先，回退到缓存" 的策略](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) 。 Service Worker 将首先尝试从网络获取资源，如果失败，它将从缓存中返回离线页面。

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

`fetch` 处理程序只需要处理页面导航，其它请求会被该处理程序忽略，交由浏览器进行常规处理。但是，如果该请求的 `.mode` 是 `navigate` ，就会尝试用 `fetch` 从网络获取项目。如果失败，则 `catch` 处理程序就会用 `caches.open(CACHE_NAME)` 打开缓存，并使用 `cache.match('offline.html')` 来获得预缓存的离线页面。然后使用 `evt.respondWith()` 将结果传回浏览器。

Key Point: 把 `fetch` 调用包装在 [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) 中会阻止浏览器的默认处理，并告诉浏览器我们要自己处理该响应。如果你没有在 `fetch` 处理程序中调用 `evt.respondWith()` ，你只会获得默认的网络行为。

#### DevTools Detour

让我们检查一下，确保一切正常。打开 “Service Worker” 窗格，刷新页面，你将看到安装了新的 Service Worker ，并且状态编号会增加。

我们还可以查看已缓存的内容。转到 DevTools 的 __Application__ 面板上的 __Cache Storage__ 窗格。右键单击 __Cache Storage__，选择 __Refresh Caches__，展开该部分，你应该会在左侧看到静态缓存的名称。单击缓存名称将显示缓存的所有文件。

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

现在，我们来测试下离线模式。返回 DevTools 的 __Service Workers__ 窗格并检查 __Offline__ 复选框。检查后，你应该会在 __Network__ 面板选项卡旁边看到一个黄色警告图标。这表示你处于离线状态。

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

重新加载你的页面......可以了！我们得到**我们的**离线熊猫图，而不是 Chrome 的离线恐龙图！

### 测试 Service Worker 的小技巧

当涉及缓存时，调试 Service Worker 可能是一个挑战，如果缓存未按预期更新，事情可能变成噩梦。在典型的 Service Worker 生命周期和代码中的错误中，你可能会很快感到沮丧。__但是，不必如此。__

#### 使用 DevTools

在 “Application” 面板的“ Service Worker ”窗格中，有一些复选框可以让你更轻松。

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - 选中后会模拟离线体验并阻止任何请求进入网络。
* __Update on reload__ - 选中后将获得最新的 Service Worker ，安装它，并立即激活它。
* __Bypass for network__ - 当检查请求时，绕过 Service Worker 并直接发送到网络。

#### 来点新鲜的

在某些情况下，你可能会发现自己正在加载已缓存的数据或者没能按预期更新内容。要清除所有已保存的数据（localStorage，indexedDB 数据，缓存文件）并删除任何 Service Worker ，请使用  “Application” 选项卡中的 “Clear storage” 窗格。或者，你也可以使用隐身窗口。

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

其它提示:

* 当 Service Worker 取消注册之后，它可能仍然会列在这里，直到包含它的浏览器窗口关闭。
* 如果你的应用打开了多个窗口，则直到将所有窗口都重新加载并更新到最新的 Service Worker 之前，新的 Service Worker 不会生效。
* 取消注册 Service Worker 不会清除缓存！
* 如果存在 Service Worker 并且注册了新的 Service Worker ，则除非你[立即获得控制权](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) ，否则在重新加载页面之前，新的 Service Worker 将不会获得控制权。

### 使用 Lighthouse 验证这些更改

再次运行 Lighthouse 并验证你的更改。在验证更改之前，请不要忘记取消 “Offline” 复选框！

__SEO 审计__

*__✅通过:__ 文档已有元描述。

__渐进式应用审计__

*__✅通过:__ 在离线时当前页面未给出 200 响应。
*__✅通过:__ 在离线时 `start_url` 未给出 200 响应。
*__✅通过:__ 未注册用来控制页面和 `start_url` 的 Service Worker。
*__✅通过:__ Web 应用清单符合可安装性要求。
*__✅通过:__ 已配置自定义闪屏。
*__✅通过:__ 已设置地址栏的主题颜色。

## 提供完整的离线体验

将手机开启飞行模式，然后尝试运行一些你喜欢的应用。几乎在所有情况下，它们都提供了相当强大的离线体验。用户希望他们的应用具有稳健的体验，Web 应用也不例外。渐进式 Web 应用在设计时应该把离线作为核心场景。

Key Point:离线优先的设计可以通过减少应用发出的网络请求数量并改用预先缓存资源并直接从本地缓存提供资源来大幅提高Web 应用的性能。即使用最快的网络连接，从本地缓存提供的服务也仍然会更快！

### Service Worker 生命周期

Service Worker 的生命周期是最复杂的部分。如果你不知道它想要做什么以及有什么好处，你可能会觉得它处处和你作对。但是一旦你知道它是如何工作的，你就可以为用户提供无缝、免打扰的更新，将网络应用和本机应用中最好的一面结合起来。

Key Point:此 codelab 仅涵盖 Service Worker 生命周期的基础知识。要深入了解，请参阅有关 WebFundamentals 的 [Service Worker 生命周期](/web/fundamentals/primers/service-workers/lifecycle) 文档。

#### `install` 事件

 Service Worker 获得的第一个事件是 `install` 。它会在 Service Worker 执行时立即触发，并且每个 Service Worker 只会调用一次。**如果你更改了 Service Worker 脚本，浏览器就会将其视为另一个 Service Worker**，并且它将获得自己的 `install` 事件。

![72ed77b1720512da.png](img/72ed77b1720512da.png)

通常， `install` 事件用于缓存应用运行时所需的全部内容。

#### `activate` 事件

Service Worker 每次启动时都会收到 `activate` 事件。 `activate` 事件的主要目的是配置 Service Worker 的行为，清除以前运行中遗留的任何资源（例如旧缓存），并让 Service Worker 准备好处理网络请求（例如下面要讲的 `fetch` 事件）。

#### `fetch` 事件

fetch 事件允许 Service Worker 拦截并处理任何网络请求。它可以通过网络获取资源、可以从自己的缓存中提取资源、生成自定义响应，以及很多种不同的选择。查看[离线宝典](/web/fundamentals/instant-and-offline/offline-cookbook/)了解你可以使用的不同策略。

#### 更新 Service Worker

浏览器会检查每个页面加载时是否有新版本的 Service Worker 。如果找到新版本，则会下载这个新版本并在后台安装，但不会激活它。它会处于等待状态，直到不再打开任何使用旧 Service Worker 的页面。一旦关闭了使用旧 Service Worker 的所有窗口，新的 Service Worker 就会被激活并获得控制权。更多详细信息，请参阅 Service Worker 生命周期文档中的[更新 Service Worker](/web/fundamentals/primers/service-workers/lifecycle#updates)部分。

### 选择正确的缓存策略

选择正确的[缓存策略](/web/fundamentals/instant-and-offline/offline-cookbook/)取决于你尝试缓存的资源类型以及以后可能需要的资源。对于这个天气应用，需要缓存的资源可以分为两类: 需要预先缓存的资源以及将在运行时缓存的数据。

#### 缓存静态资源

预先缓存资源与用户安装桌面或移动应用时的情况类似。应用运行所需的关键资源已安装或缓存在设备上，以后无论是否有网络连接都可以加载它们。

对于这个应用，我们将在安装 Service Worker 时预先缓存所有静态资源，以便把我们运行应用所需的一切都存储在用户的设备上。为了确保我们的应用快速加载，我们将使用[缓存优先](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)策略：不去网络获取资源，而是从本地缓存中取出；只有当缓存不可用时，我们才会尝试从网络中获取它。

![44860840e2090bd8.png](img/44860840e2090bd8.png)

从本地缓存中取可消除任何网络方面的变数。无论用户使用何种网络（WiFi，5G，3G 甚至 2G），我们需要运行的关键资源都几乎可以立即使用。

Caution: 在此示例中，使用 [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) 策略提供静态资源，这会导致在不询问网络的情况下返回任何缓存内容的副本。虽然 `cache-first` 策略易于实施，但它可能会在将来的演化中带来挑战。

#### 缓存应用数据

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) 对某些类型的数据是理想的，比如本应用。它会尽可能快地获取屏幕上要显示的数据，然后在网络返回最新数据后进行更新。 Stale-while-revalidate 意味着我们需要发起两个异步请求，一个到缓存，一个到网络。

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

在正常情况下，缓存数据几乎会立即返回，为应用提供可以使用的最新数据。然后，当网络请求返回时，将使用来自网络的最新数据更新应用。

对于我们的应用，这提供了比 "网络优先，回退到缓存" 策略更好的体验，因为用户不必等到网络请求超时后才在屏幕上看到某些内容。他们最初可能会看到较旧的数据，但一旦网络请求返回，应用就将使用最新数据进行更新。

### 更新应用逻辑

如前所述，应用需要启动两个异步请求，一个到缓存，一个到网络。该应用使用 `window` 上的 `caches` 对象来访问缓存并获取最新数据。这是渐进增强的一个很好的例子，因为 `caches` 对象可能并非在所有浏览器中都可用，如果不可用，网络请求仍然可以工作。

更新 `getForecastFromCache()` 函数，检查 `caches` 对象是否在全局 `window` 对象中可用，如果是，请从缓存中请求数据。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

然后，我们需要修改 [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196)以便它进行两次调用，一次调用 `getForecastFromNetwork()` 以从网络获取天气预报，并发起另一次 `getForecastFromCache()` 以获取缓存的最新天气预报:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

我们的天气应用现在发出两个异步数据请求，一个来自缓存，另一个来自 `fetch` 。如果缓存中有数据，它将被非常快速地返回和渲染（几十毫秒）。然后，当 `fetch` 响应时，将使用直接来自天气 API 的最新数据更新卡片。

请注意缓存请求和 `fetch` 请求如何结束于更新天气预报卡片的调用。应用要如何知道它是否显示了最新的数据？这在 `renderForecast()` 的如下代码中处理:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

每次更新卡片时，应用都会将数据的时间戳存储在卡片上的隐藏属性中。如果卡片上已存在的时间戳比传递给函数的数据新，应用就什么也不做。

### 预先缓存我们的应用资源

在 Service Worker 中，让我们添加一个 `DATA_CACHE_NAME` 以便我们可以将应用数据与应用外壳分开。更新应用外壳并清除旧缓存后，我们的数据将保持不变，仍用于超快速加载。请记住，如果你的数据格式将来发生了变化，你就需要一种方法来处理这种情况，并确保应用外壳和内容保持同步。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

别忘了也要同时更新 `CACHE_NAME`，我们还将更改所有的静态资源。

为了让本应用离线工作，我们需要预先缓存它所需的所有资源。这也有助于提升性能。该应用无需从网络获取所有资源，而是可以从本地缓存加载所有资源，从而消除任何网络不稳定性。

把 `FILES_TO_CACHE` 数组改为如下文件列表:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

由于我们在手动生成要缓存的文件列表，因此每当更新文件时也**必须更新 `CACHE_NAME`**。我们可以从缓存文件列表中删除 `offline.html`，因为本应用现在具有离线工作所需的所有必要资源，不会再显示离线页面。

Caution:在此示例中，我们手动控制着自己的 Service Worker。每次我们更新任何静态资源时，我们都需要重新刷新 Service Worker 并更新缓存，否则将提供旧内容。此外，当一个文件更改时，整个缓存都会无效并需要重新下载。这意味着即使修复一个简单的单字符拼写错误也将使缓存无效并要求再次下载所有内容 - 效率不够高。 [Workbox](/web/tools/workbox/) 能优雅地处理它，通过将其集成到你的构建过程中，只有已更改的文件才需要更新，为用户节省了带宽并让你更轻松地进行维护！

#### 更新 activate 事件处理程序

为了防止我们 `activate` 事件不小心删除数据，在 `service-worker.js` 的 `activate` 事件，把 `if (key !== CACHE_NAME) {` 改为:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### 更新 fetch 事件处理程序

我们需要修改 Service Worker 以拦截对 weather API 的请求并将其响应存储在缓存中，以便我们以后可以轻松地访问它们。在 stale-while-revalidate 策略中，我们希望把网络响应作为“真相之源”，始终由它向我们提供最新信息。如果不能，也可以失败，因为我们已经在应用中检索到了最新的缓存数据。

更新 `fetch` 事件处理程序以便和其它对数据 API 的请求分开。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

该代码拦截请求并检查它是否用于天气预报。如果是，请使用 `fetch` 发出请求。一旦返回了响应，就打开缓存，克隆响应，将其存储在缓存中，然后将响应返回给原始请求者。

我们需要删除 `evt.request.mode !== 'navigate'` 检查，因为我们希望这个 Service Worker 处理所有请求（包括图像，脚本，CSS 文件等），而不仅仅是导航。如果我们留着这个检查，则只会从 Service Worker 缓存中提供 HTML，其它所有内容都将从网络请求。

### 试一试

该应用现在应该能完全离线工作。刷新页面以确保你已安装最新的 Service Worker ，然后保存几个城市并按应用上的刷新按钮以获取新的天气数据。

然后转到 DevTools 的 __Application__ 面板上的 __Cache Storage__ 窗格。展开该部分，你应该会在左侧看到静态缓存和数据缓存的名称。打开数据缓存会显示为每个城市存储的数据。

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

然后，打开 DevTools 并切换到 Service Workers 窗格，选中 Offline 复选框，然后尝试重新加载页面，然后离线并重新加载页面。

如果你是一个快速的网络上，并希望看看天气预报数据会如何在慢速连接上更新，请在 `server.js` 中把 `FORECAST_DELAY` 设置为 `5000` 。这样对天气预报 API 的所有请求都将延迟 5000 毫秒。

### 用 Lighthouse 验证更改

再次运行 Lighthouse 是个好主意。

__SEO 审计__

*__✅通过:__ 文档已有元描述。

__渐进式应用审计__

*__✅通过:__ 在离线时当前页面未给出 200 响应。
*__✅通过:__ 在离线时 `start_url` 未给出 200 响应。
*__✅通过:__ 未注册用来控制页面和 `start_url` 的 Service Worker。
*__✅通过:__ Web 应用清单符合可安装性要求。
*__✅通过:__ 已配置自定义闪屏。
*__✅通过:__ 已设置地址栏的主题颜色。

## 添加安装体验

安装渐进式 Web 应用后，其外观和行为会与所有其它已安装的应用类似。它与其它应用启动时的位置相同。它在没有地址栏或其它浏览器 UI 的应用中运行。与所有其它已安装的应用一样，它是任务切换器中的顶级应用。

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

在 Chrome 中，可以通过其 "三点菜单" 来安装渐进式 Web 应用，也可以向用户提供按钮或其它 UI 组件，以提示他们安装你的应用。

Success: 由于 Chrome 的 "三点菜单" 的安装体验不够显眼，我们建议你在应用中提供一些指示以通知用户你的应用可以安装，并使用安装按钮来完成安装过程。

### 用 Lighthouse 进行审计

为了使用户能够安装渐进式 Web 应用，它需要满足[一些条件](/web/fundamentals/app-install-banners/#criteria) 。最简单的方法是使用 Lighthouse 来确保它符合可安装的标准。

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

如果你使用此 codelab，你的 PWA 就已经符合这些标准了。

Key Point:对于本节，在 DevTools 的 **Application** 面板的 **Service Workers** 窗格中启用 **Bypass for network** 复选框。选中后，请求将绕过 Service Worker 并直接发送到网络。这简化了我们的开发过程，因为我们在完成本节中的任务时不必更新我们的 Service Worker 。

### 将 install.js 添加到 index.html

首先，让我们将 `install.js` 添加到 `index.html` 文件中。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### 监听 `beforeinstallprompt` 事件

如果符合添加到主屏幕[条件](/web/fundamentals/app-install-banners/#criteria) ，Chrome 将触发 `beforeinstallprompt` 事件，你可以使用该事件指示你的应用可以“安装”，然后提示用户安装它。添加如下代码以监听 `beforeinstallprompt` 事件:

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### 保存事件并显示安装按钮

在我们的 `saveBeforeInstallPromptEvent` 函数中，我们将保存对 `beforeinstallprompt` 事件的引用，以便我们稍后可以调用它的 `prompt()` ，并修改我们的 UI 以显示安装按钮。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### 显示 "提示/隐藏" 按钮

当用户单击安装按钮时，我们需要调用保存的 `beforeinstallprompt` 事件的 `.prompt()` 函数。我们还需要隐藏安装按钮，因为 `.prompt()` 只能在每个保存的事件上调用一次。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

调用 `.prompt()` 将向用户显示模态对话框，请他们将你的应用添加到主屏幕。

### 记录结果

你可以通过监听所保存的 `beforeinstallprompt` 事件的 `userChoice` 属性返回的 Promise 来检查用户是如何响应的安装对话框。在显示出提示并且用户已对其作出响应后，Promise 将返回一个具有 `outcome` 属性的对象。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

对 `userChoice` 的一个说明， [规范中把它定义成了属性](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) ，而不是你所期望的函数。

#### 记录所有安装事件

除了你所添加的用于安装应用的任何 UI 之外，用户还可以通过其它方法安装 PWA，例如 Chrome 的 "三点菜单"。要跟踪这些事件，请监听 appinstalled 事件。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

然后，我们需要修改 `logAppInstalled` 函数，对于这个 codelab，我们只用了 `console.log` ，但在生产应用中，你可能希望将其作为事件记录在你的分析软件中。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### 更新 Service Worker

不要忘记修改 `service-worker.js` 文件中的 `CACHE_NAME`，因为你对已缓存的文件做了些更改。在 DevTools 的 “Application” 面板上的 “Service Worker” 窗格中启用 **Bypass for network** 复选框只在开发中有用，在现实世界中是无济于事的。

### 试一试

让我们看看我们的安装步骤是如何进行的。为了安全起见，使用 DevTools 应用面板中的 __Clear site storage__ 按钮清除所有内容以确保我们从头开始。如果你之前安装过该应用，请务必将其卸载，否则安装图标将不会再次显示。

#### 验证安装按钮是否可见

首先，验证我们的安装图标是否正确显示了，请务必同时在桌面和移动设备上试用。

1. 在新的 Chrome 标签页中打开网址。
2. 打开 Chrome 的 "三点菜单"（地址栏旁边）。
▢验证你在菜单中是否看到了 “*Install Weather...*”。
3. 使用右上角的刷新按钮刷新天气数据，以确保我们符合[user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) 。
▢确认应用标题中显示了安装图标。

#### 验证安装按钮是否有效

接下来，让我们确保一切都安装正确，并正确触发了我们的事件。你可以在桌面设备或移动设备上执行此操作。如果你想在移动设备上进行测试，请确保使用远程调试，以便查看控制台中的日志。

1. 打开 Chrome，然后在新的浏览器标签中，导航到你的 Weather PWA。
2. 打开 DevTools 并切换到 “Console” 窗格。
3. 单击右上角的安装按钮。
▢确认安装按钮消失了
▢确认显示了安装模态对话框。
4. 单击 “Cancel”。
▢确认 “*User dismissed the A2HS prompt*” 显示在控制台输出中。
▢确认重新出现了安装按钮。
5. 再次单击安装按钮，然后单击模态对话框中的安装按钮。
▢确认 “*User accepted the A2HS prompt*” 显示在了控制台输出中。
▢确认 “*Weather App was installed*” 显示在了控制台输出中。
▢确认天气应用已添加到你查找应用的典型位置。
6. 启动 Weather PWA。
▢确认应用是作为独立应用打开的，可以在桌面上的应用窗口中，也可以在移动设备上全屏显示。

请注意，如果你从 localhost 在桌面上运行，则你安装的 PWA 可能会显示地址标题，因为 localhost 不认为是安全主机。

#### 验证 iOS 安装是否正常

我们还要检查它在 iOS 上的行为。如果你有 iOS 设备，可以直接使用它；或者如果你使用的是 Mac，可以尝试使用 Xcode 提供的 iOS 模拟器。

1. 打开 Safari，在新的浏览器选项卡中，导航到 Weather PWA。
2. 单击 *Share* ![8ac92dd483c689d3.png](img/8ac92dd483c689d3.png)按钮。
3. 向右滚动并单击 *Add to Home Screen* 按钮。
▢验证标题、URL 和图标是否正确。
4. 单击 *Add*。
▢确认应用图标已添加到了主屏幕。
5. 从主屏幕启动 Weather PWA。
▢确认应用全屏启动。

### 额外工作: 检测你的应用是否从主屏幕启动了

媒体查询 `display-mode` 可以根据应用的启动方式来应用样式，或者使用 JavaScript 来判定它是如何启动的。

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

你还可以在 [JavaScript 中检测它是否运行在独立模式下](/web/fundamentals/app-install-banners/#detect-mode)来检查这个 `display-mode` 媒体查询 。

### 额外工作: 卸载你的 PWA

请记住，如果已经安装了应用，则 `beforeinstallevent` 不会触发，因此在开发期间，你可能需要多次安装和卸载应用，以确保一切正常运行。

#### Android

在 Android 上，卸载 PWA 的方式与卸载其它已安装的应用的方式相同。

* 打开应用抽屉。
* 向下滚动以查找天气图标。
* 将应用图标拖到屏幕顶部。
* 选择*卸载*。

#### ChromeOS

在 ChromeOS 上，可以从启动器搜索框轻松卸载 PWA。

* 打开启动器。
* 在搜索框中输入“*Weather*”，你的 Weather PWA 应该出现在搜索结果中。
* 右键单击（按住 alt 键单击）Weather PWA。
* 点击 *从 Chrome 中删除...*

#### macOS 和 Windows

在 Mac 和 Windows 上，必须通过 Chrome 卸载 PWA。

* 在新的浏览器标签中，打开 chrome://apps。
* 右键单击（按住 alt 键单击）Weather PWA。
* 点击*从 Chrome 中删除...*

## 恭喜

恭喜，你已经成功构建了第一个渐进式 Web 应用！

你添加了一个 Web 应用清单以使其能够安装，并添加了一个 Service Worker 以确保你的 PWA 始终快速而且可靠。你学习了如何使用 DevTools 审计应用以及如何用它帮你改善用户体验。

你现在知道了将任何 Web 应用转换为渐进式 Web 应用所需的关键步骤。

### 进一步阅读

* [高性能 Service Worker 加载](/web/fundamentals/primers/service-workers/high-performance-loading)
* [基于请求类型的 Service Worker 缓存策略](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### 参考文档

* [Web App Manifest 文档](/web/fundamentals/web-app-manifest)
* [Web App Manifest 属性 (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [安装并添加到主屏](/web/fundamentals/app-install-banners/)
* [Service Worker 概览](/web/fundamentals/primers/service-workers/)
* [Service Worker 生命周期](/web/fundamentals/primers/service-workers/lifecycle)
* [高性能 Service Worker 加载](/web/fundamentals/primers/service-workers/high-performance-loading)
* [离线宝典](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## 发现了问题，或有反馈？ {: .hide-from-toc }

马上提交[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)来帮助我们改进 codelab 。谢谢！
