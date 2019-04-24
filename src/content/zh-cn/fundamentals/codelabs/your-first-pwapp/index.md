project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# 您的第一个 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## 简介

### 什么是网络应用程序，一个渐进式网络应用程序？

渐进式Web应用程序在桌面和移动设备上提供可安装的，类似应用程序的体验，可通过Web直接构建和交付。它们是快速可靠的网络应用程序。最重要的是，它们是适用于任何浏览器的网络应用程序。如果您今天正在构建一个Web应用程序，那么您已经开始构建一个渐进式Web应用程序。

#### 快速可靠

每个Web体验都必须快速，对于Progressive Web Apps尤其如此。快速是指在屏幕上获取有意义内容所需的时间，并在不到5秒的时间内提供交互式体验。

并且，它必须快___。很难强调性能更好的可靠性。可以这样想:本机应用程序的第一次加载令人沮丧。它是由一个应用程序商店和一个巨大的下载门控，但一旦你到达安装该应用程序的点，该前期成本将在所有应用程序启动时分摊，并且这些启动都没有可变延迟。每个应用程序的启动速度与最后一个一样快，没有任何差异。渐进式Web应用程序必须提供用户可以从任何已安装的体验中获得的可靠性能。

#### 安装

渐进式Web应用程序可以在浏览器选项卡中运行，但也可以安装。为网站添加书签只是添加了一个快捷方式，但已安装的Progressive Web App的外观和行为与所有其他已安装的应用程序类似。它与其他应用程序启动时的位置相同。您可以控制启动体验，包括自定义启动画面，图标等。它在应用程序窗口中作为应用程序运行，没有地址栏或其他浏览器UI。与所有其他已安装的应用程序一样，它是任务切换器中的顶级应用程序。

请记住，可安装的PWA快速可靠至关重要。安装PWA的用户希望他们的应用程序正常运行，无论他们使用何种网络连接。这是每个已安装应用必须满足的基线预期。

#### 手机和桌面

使用响应式设计技术，Progressive Web Apps可在移动__and__桌面上工作，使用平台之间的单一代码库。如果您正在考虑编写本机应用程序，请查看PWA提供的好处。

### 你将建立什么

在此代码框中，您将使用渐进式Web应用程序技术构建天气Web应用程序。您的应用将:

* 使用响应式设计，因此可在桌面或移动设备上使用。
* 快速，使用服务工作者来预先运行运行所需的应用程序资源（HTML，CSS，JavaScript，图像），并在运行时缓存天气数据以提高性能。
* 可安装，使用Web应用程序清单和`beforeinstallprompt`事件通知用户它是可安装的。

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: 为了简化此代码框，并解释提供离线体验的基础知识，我们使用的是vanilla JavaScript。在生产应用程序中，我们强烈建议使用[Workbox](/web/tools/workbox/)工具来构建服务工作者。它可以消除许多可能遇到的尖锐边缘和暗角。

### 你将学到什么

* 如何创建和添加Web应用程序清单
* 如何提供简单的离线体验
* 如何提供完整的离线体验
* 如何使您的应用程序可安装

此codelab专注于Progressive Web Apps。屏蔽了不相关的概念和代码块，并为您提供简单的复制和粘贴。

### 你需要什么

* 最近版本的Chrome（74或更高版本）PWA只是网络应用，适用于所有浏览器，但我们将使用Chrome DevTools的一些功能来更好地了解浏览器级别的情况，并将其用于测试安装体验。
* 了解HTML，CSS，JavaScript和[Chrome DevTools](https://developer.chrome.com/devtools) 。

## 设置好

### 获取Dark Sky API的密钥

我们的天气数据来自[Dark Sky API](https://darksky.net/dev) 。要使用它，您需要申请API密钥。它易于使用，并且可以免费用于非商业项目。

[Register for API Key](https://darksky.net/dev/register)

Note: 您仍然可以在没有Dark Sky API密钥的情况下完成此codelab。如果我们的服务器无法从Dark Sky API获取真实数据，它将返回虚假数据。

#### 验证您的API密钥是否正常工作

要测试您的API密钥是否正常工作，请向DarkSky API发出HTTP请求。更新以下网址，将`DARKSKY_API_KEY`替换为您的API密钥。如果一切正常，您应该看到纽约市的最新天气预报。

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### 获取代码

我们已将此项目所需的一切都放入Git仓库中。首先，您需要获取代码并在您喜欢的开发环境中打开它。对于此代码库，我们建议使用Glitch。

#### 强烈推荐:使用Glitch导入回购

使用Glitch是推荐使用此代码库的方法。

1. 打开一个新的浏览器选项卡，然后转到[https://glitch.com](https://glitch.com) 。
2. 如果您没有帐户，则需要注册。
3. 单击__New Project__，然后单击Git Repo中的__Clone .__
4. 克隆__https://github.com/googlecodelabs/your-first-pwapp.git__并单击确定。
5. 加载repo后，编辑`.env`文件，并使用DarkSky API密钥更新它。
6. 单击__Show Live__按钮以查看PWA的运行情况。

#### 替代方案:下载代码并在本地工作

如果您想下载代码并在本地工作，您需要拥有最新版本的Node和代码编辑器设置并准备就绪。

Caution: 如果您在本地工作，某些Lighthouse审核将无法通过，并且安装可能无法使用，因为本地服务器不通过安全上下文提供内容。

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. 解压缩下载的zip文件。
2. 运行`npm install`以安装运行服务器所需的依赖项。
3. 编辑`server.js`并设置DarkSky API密钥。
4. 运行`node server.js`以在端口8000上启动服务器.
5. 打开浏览器选项卡到[http://localhost:8000](http://localhost:8000)

## 建立基线

### 我们的出发点是什么？

我们的出发点是为此codelab设计的基本天气应用程序。代码已经过度简化，以显示此代码库中的概念，并且它几乎没有错误处理。如果您选择在生产应用程序中重用任何此代码，请确保处理任何错误并完全测试所有代码。

有些事要尝试......

1. 在右下角添加一个带有蓝色加号按钮的新城市。
2. 使用右上角的刷新按钮刷新数据。
3. 使用每张城市卡右上角的x删除城市。
4. 了解它在桌面和移动设备上的工作原理。
5. 看看你离线时会发生什么。
6. 使用Chrome的“网络”面板，查看当网络受限制为慢速3G时会发生什么。
7. 通过更改`FORECAST_DELAY`中的`server.js`向预测服务器添加延迟

### 审计与灯塔

[Lighthouse](/web/tools/lighthouse/#devtools)是一款易于使用的工具，可帮助您提高网站和网页的质量。它具有性能，可访问性，渐进式Web应用程序等审计。每个审核都有一个参考文档，解释了审核为何重要，以及如何解决。

![b112675caafccef0.png](img/b112675caafccef0.png)

我们将使用Lighthouse来审核我们的天气应用程序，并验证我们所做的更改。

Note: 您可以在Chrome DevTools中，从命令行或作为节点模块运行Lighthouse。将[adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot)您的构建过程，以确保您的Web应用程序不会退化。

### 让我们运行灯塔

1. 在新选项卡中打开项目。
2. 打开Chrome DevTools并切换到__Audits__选项卡，DevTools显示审核类别列表，将它们全部启用。
3. 单击__Run audits__，60-90秒后，Lighthouse会在页面上显示报告。

### 渐进式Web App审计

我们将重点关注Progressive Web App审核的结果。

![af1a64a13725428e.png](img/af1a64a13725428e.png)

并且有很多红色要关注:

* __❗失败:__ 离线时当前页面不响应200。
* __❗失败:__ `start_url`在离线时不响应200。
* __❗失败:__ 不注册控制页面和`start_url.`的服务工作者
* __❗失败:__ Web应用程序清单不符合可安装性要求。
* __❗失败:__ 未配置自定义初始屏幕。
* __❗失败:__ 不设置地址栏主题颜色。

让我们进入并开始修复其中的一些问题！

## 添加Web应用程序清单

到本节结束时，我们的天气应用程序将通过以下审核:

* Web应用程序清单不符合可安装性要求。
* 未配置自定义初始屏幕。
* 不设置地址栏主题颜色。

### 创建Web应用程序清单

[web app manifest](/web/fundamentals/web-app-manifest)是一个简单的JSON文件，它使开发人员能够控制应用程序对用户的显示方式。

使用Web应用程序清单，您的Web应用程序可以:

* 告诉浏览器您希望应用程序在独立窗口中打开（ `display` ）。
* 定义首次启动应用程序时打开的页面（ `start_url` ）。
* 定义应用程序在Dock或app启动器（ `short_name` ， `icons` ）上应该是什么样子。
* 创建一个闪屏（ `name` ， `icons` ， `colors` ）。
* 告诉浏览器以横向或纵向模式（ `orientation` ）打开窗口。
* 和[plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) 。

在项目中创建名为`public/manifest.json`的文件，并复制/粘贴以下内容:

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

清单支持一组图标，用于不同的屏幕尺寸。对于此代码实验室，我们已经包含了其他一些代码实验室，因为我们需要它们用于iOS集成。

Note: 要安装，Chrome要求您提供至少192x192px图标和512x512px图标。但是你也可以提供其他尺码。 Chrome使用最接近48dp的图标，例如，2x设备上的96px或3x设备的144px。

### 添加指向Web应用程序清单的链接

接下来，我们需要通过向应用程序中的每个页面添加`<link rel="manifest"...`来告诉浏览器我们的清单。 `<head>`添加到`index.html`文件中的`<head>`元素。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools Detour

DevTools提供了一种快速简便的方法来检查您的`manifest.json`文件。打开__Application__面板上的__Manifest__窗格。如果您已正确添加清单信息，您将能够在此窗格中看到它以人性化格式进行解析和显示。

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### 添加iOS元标记和图标

iOS上的Safari不支持Web应用程序清单（ [yet](https://webkit.org/status/#specification-web-app-manifest) ），因此您需要将[traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)添加到`index.html`文件的`<head>`中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### 奖励:简易灯塔修复

我们的灯塔审核还提出了一些其他很容易解决的问题，所以当我们在这里时，让我们来处理这些问题。

#### 设置元描述

根据SEO审计，Lighthouse注意到我们的“ [Document does not have a meta description.](/web/tools/lighthouse/audits/description) ”描述可以显示在Google的搜索结果中。高质量，独特的描述可以使您的搜索结果与搜索用户更相关，并可以增加搜索流量。

要添加说明，请将以下`meta`标记添加到文档的`<head>`中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### 设置地址栏主题颜色

在PWA审计中，Lighthouse注意到我们的应用程序“ [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) ”。将浏览器的地址栏设置为与您品牌的颜色相匹配，可以提供更加身临其境的用户体验。

要在移动设备上设置主题颜色，请将以下`meta`标记添加到文档的`<head>` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### 验证灯塔的变化

再次运行Lighthouse（通过单击“审核”窗格左上角的+号）并验证您的更改。

__SEO审计___

*__✅好:__ Document有元描述。

__Progressive Web App Audit__

* __❗失败:__ 离线时当前页面不响应200。
* __❗失败:__ `start_url`在离线时不响应200。
* __❗失败:__ 不注册控制页面和`start_url.`的服务工作者
*__✅好:__ Web应用程序清单符合可安装性要求。
*__✅好:__ 已配置为自定义初始屏幕。
*__✅好:__ 设置地址栏主题颜色。

## 提供基本的离线体验

用户期望安装的应用程序在离线时始终具有基线体验。这就是为什么对于可安装的网络应用程序来说，永远不会显示Chrome的离线恐龙至关重要。离线体验的范围从简单的离线页面到具有先前缓存数据的只读体验，一直到完全功能的脱机体验，在网络连接恢复时自动同步。

在本节中，我们将向天气应用添加一个简单的离线页面。如果用户在离线时尝试加载应用，则会显示我们的自定义页面，而不是浏览器显示的典型离线页面。到本节结束时，我们的天气应用程序将通过以下审核:

* 离线时当前页面不响应200。
* 离线时， `start_url`不响应200。
* 不注册控制页面和`start_url.`的服务工作者

在下一部分中，我们将使用完整的离线体验替换我们的自定义离线页面。这将改善离线体验，但更重要的是，它将显着提高我们的性能，因为我们的大多数资产（HTML，CSS和JavaScript）将在本地存储和提供，从而消除了网络作为潜在的瓶颈。

### 服务人员进行救援

如果您对服务工作者不熟悉，可以通过阅读[Introduction To Service Workers](/web/fundamentals/primers/service-worker/)了解他们可以做什么，他们的生命周期如何工作等等，从而获得基本的理解。完成此代码实验室后，请务必查看[Debugging Service Workers code lab](http://goo.gl/jhXCBy)以便更深入地了解如何与服务人员合作。

通过服务工作人员提供的功能应被视为渐进增强功能，并且仅在浏览器支持时才添加。例如，对于服务工作者，您可以为应用程序缓存[app shell](/web/fundamentals/architecture/app-shell)和数据，以便即使网络不可用也可以使用它。如果不支持服务工作者，则不会调用脱机代码，并且用户将获得基本体验。使用特征检测提供渐进增强功能的开销很小，并且在不支持该功能的旧浏览器中不会中断。

Warning:服务工作者功能仅在通过HTTPS访问的页面上可用（http://localhost 和等效项也可用于促进测试）。

### 注册服务人员

第一步是注册服务工作者。将以下代码添加到`index.html`文件中:

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

此代码检查服务工作者API是否可用，如果是，则在页面为[loaded](/web/fundamentals/primers/service-workers/registration) ， `/service-worker.js`的服务工作者将注册。

注意，服务工作者是从根目录提供的，而不是从`/scripts/`目录提供的。这是设置服务工作者的__ `scope` __的最简单方法。服务工作者的`scope`确定服务工作者控制哪些文件，换句话说，服务工作者将`scope`条路径拦截请求。默认的`scope`是服务工作者文件的位置，并扩展到下面的所有目录。因此，如果`service-worker.js`位于根目录中，则服务工作者将控制来自此域的所有网页的请求。

### Precache离线页面

首先，我们需要告诉服务工作者缓存什么。我们已经创建了一个简单的[offline page](https://your-first-pwa.glitch.me/offline.html) （ `public/offline.html` ），只要没有网络连接，我们就会显示它。

在`service-worker.js` ，将`'/offline.html',`添加到`FILES_TO_CACHE`数组中，最终结果应如下所示:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

接下来，我们需要更新`install`事件以告知服务工作者预先缓存脱机页面:

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

Note: 服务工作者事件和生命周期将在下一节中介绍。

我们的`install`事件现在使用`caches.open()`打开缓存并提供缓存名称。提供缓存名称允许我们对缓存资源进行版本控制或分离数据，以便我们可以轻松更新一个但不影响另一个。

一旦缓存打开，我们就可以调用`cache.addAll()` ，它获取一个URL列表，从服务器获取它们并将响应添加到缓存中。请注意，如果任何单个请求失败， `cache.addAll()`将拒绝。这意味着您可以保证，如果安装步骤成功，您的缓存将处于一致状态。但是，如果由于某种原因失败，它将在下次服务工作者启动时自动重试。

#### DevTools Detour

让我们来看看如何使用DevTools来理解和调试服务工作者。在重新加载页面之前，打开DevTools，转到__Application__面板上的__Service Workers__窗格。它应该如下所示:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

当您看到这样的空白页面时，表示当前打开的页面没有任何已注册的服务工作者。

现在，重新加载您的页面。 “服务工作者”窗格现在应如下所示:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

当您看到这样的信息时，表示该页面正在运行服务工作者。

状态标签旁边有一个数字（在这种情况下为* 34251 *），在您与服务工作人员合作时，请密切注意该数字。这是一种简单的方法来判断您的服务工作者是否已更新。

### 清理旧的离线页面

我们将使用`activate`事件来清理缓存中的任何旧数据。此代码可确保您的服务工作程序在任何应用程序shell文件发生更改时更新其缓存。为了使其工作，您需要在服务工作文件的顶部增加`CACHE_NAME`变量。

将以下代码添加到`activate`事件:

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

打开“服务工作者”窗格，刷新页面，您将看到安装了新的服务工作者，并且状态编号会增加。

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

更新后的服务工作者立即获得控制权，因为我们的`install`事件以`self.skipWaiting()`结束， `activate`事件以`self.clients.claim()`结束。没有这些，只要有一个打开页面的选项卡，旧的服务工作者就会继续控制页面。

### 处理失败的网络请求

最后，我们需要处理`fetch`事件。我们将使用[network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) 。服务工作者将首先尝试从网络获取资源，如果失败，它将从缓存中返回脱机页面。

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

`fetch`处理程序只需要处理页面导航，因此其他请求可以从处理程序`fetch`出，并且将由浏览器正常处理。但是，如果请求`.mode`是`navigate` ，请使用`fetch`尝试从网络获取项目。如果失败，则`catch`处理程序打开缓存， `caches.open(CACHE_NAME)`并使用`cache.match('offline.html')`获得预缓存的离线页面。然后使用`evt.respondWith()`将结果传回浏览器。

Key Point:中包装`fetch`呼叫[`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)防止浏览器默认提取处理，并告诉我们要处理的响应自己的浏览器。如果你没有在`fetch`处理程序中调用`evt.respondWith()` ，你将只获得默认的网络行为。

#### DevTools Detour

让我们检查一下，确保一切正常。打开“服务工作者”窗格，刷新页面，您将看到安装了新的服务工作者，并且状态编号会增加。

我们还可以查看已缓存的内容。转到DevTools的__Application__面板上的__Cache Storage__窗格。右键单击__Cache Storage __，选择__Refresh Caches__，展开该部分，您应该会在左侧看到静态缓存的名称。单击缓存名称将显示缓存的所有文件。

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

现在，让我们测试离线模式。返回DevTools的__Service Workers__窗格并检查__Offline__复选框。检查后，您应该会在__Network__面板选项卡旁边看到一个黄色警告图标。这表示您处于离线状态。

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

重新加载您的页面......它的工作原理！我们得到__our__离线熊猫，而不是Chrome的离线恐龙！

### 测试服务人员的技巧

调试服务工作者可能是一个挑战，当它涉及缓存时，如果缓存未按预期更新，事情可能变得更加噩梦。在典型的服务工作者生命周期和代码中的错误之间，您可能会很快感到沮丧。 __But不要.__

#### 使用DevTools

在“应用程序”面板的“服务工作者”窗格中，有一些复选框可以使您的生活更轻松。

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - 选中时会模拟离线体验并阻止任何请求进入网络。
* __Update on reload__ - 选中后将获得最新的服务工作者，安装它，并立即激活它。
* __Bypass for network__ - 当检查请求绕过服务工作者并直接发送到网络时。

#### 开始新鲜

在某些情况下，您可能会发现自己正在加载缓存数据或者没有按预期更新内容。要清除所有已保存的数据（localStorage，indexedDB数据，缓存文件）并删除任何服务工作者，请使用“应用程序”选项卡中的“清除存储”窗格。或者，您也可以在隐身窗口中工作。

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

其他提示:

* 一旦服务工作者未注册，它可能会一直列出，直到其包含的浏览器窗口关闭。
* 如果您的应用程序的多个窗口打开，则在将所有窗口重新加载并更新到最新的服务工作者之后，新的服务工作程序将不会生效。
* 取消注册服务工作者不会清除缓存！
* 如果存在服务工作者并且注册了新的服务工作者，则除非您使用[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) ，否则在重新加载页面之前，新服务工作者将不会获得控制[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 。

### 验证灯塔的变化

再次运行Lighthouse并验证您的更改。在验证更改之前，请不要忘记取消选中“脱机”复选框！

__SEO审计___

*__✅好:__ Document有元描述。

__Progressive Web App Audit__

* __✅好:__ 当前页面在离线时以200响应。
* __✅好:__ `start_url`在离线时以200响应。
* __✅好:__ 注册一个控制页面和`start_url.`的服务工作者
* __✅好:__ Web应用程序清单符合可安装性要求。
* __✅好:__ 已配置为自定义初始屏幕。
* __✅好:__ 设置地址栏主题颜色。

## 提供完整的离线体验

花点时间将手机置于飞行模式，然后尝试运行一些您喜欢的应用程序。几乎在所有情况下，它们都提供了相当强大的离线体验。用户希望他们的应用程序具有强大的体验网络应该没有什么不同。渐进式Web应用程序应设计为脱机作为核心方案。

Key Point:设计离线优先可以通过减少应用程序发出的网络请求数量来大幅提高Web应用程序的性能，而不是预先缓存资源并直接从本地缓存提供资源。即使使用最快的网络连接，从本地缓存提供的服务也会更快！

### 服务工作者生命周期

服务人员的生命周期是最复杂的部分。如果你不知道它想要做什么以及有什么好处，它可能会觉得它在和你作斗争。但是一旦你知道它是如何工作的，你就可以为用户提供无缝，不显眼的更新，混合最好的网络和本机模式。

Key Point:此代码框仅涵盖服务工作者生命周期的基础知识。要深入了解，请参阅有关WebFundamentals的[The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)文章。

#### `install`事件

服务工作者获得的第一个事件是`install` 。它会在工作程序执行时立即触发，并且每个服务工作程序只调用一次。 __如果您更改了服务工作者脚本，浏览器会将其视为不同的服务工作者___，并且它将获得自己的`install`事件。

![72ed77b1720512da.png](img/72ed77b1720512da.png)

通常， `install`事件用于缓存应用程序运行所需的所有内容。

#### `activate`事件

服务工作者每次启动时都会收到`activate`事件。 `activate`事件的主要目的是配置服务工作者的行为，清除以前运行中遗留的任何资源（例如旧缓存），并让服务工作者准备好处理网络请求（例如下面描述的`fetch`事件）。

#### `fetch`事件

fetch事件允许服务工作者拦截任何网络请求并处理请求。它可以进入网络获取资源，它可以从自己的缓存中提取资源，生成自定义响应或任意数量的不同选项。查看[Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)了解您可以使用的不同策略。

#### 更新服务工作者

浏览器会检查每个页面加载时是否有新版本的服务工作者。如果找到新版本，则会下载新版本并在后台安装，但不会激活。它处于等待状态，直到不再打开任何使用旧服务工作者的页面。一旦关闭了使用旧服务工作者的所有窗口，新的服务工作者就会被激活并可以控制。有关更多详细信息，请参阅Service Worker Lifecycle doc的[Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates)部分。

### 选择正确的缓存策略

选择正确的[caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/)取决于您尝试缓存的资源类型以及以后可能需要的资源。对于我们的天气应用程序，我们将需要缓存的资源分为两类:我们想要预先缓存的资源以及我们将在运行时缓存的数据。

#### 缓存静态资源

预先缓存资源与用户安装桌面或移动应用程序时的情况类似。应用程序运行所需的关键资源已安装或缓存在设备上，以便以后可以加载它们是否存在网络连接。

对于我们的应用程序，我们将在安装服务工作者时预先缓存所有静态资源，以便我们运行应用程序所需的一切都存储在用户的设备上。为了确保我们的应用程序快速加载，我们将使用[cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)策略;而不是去网络获取资源，而是从本地缓存中取出;只有当它不可用时，我们才会尝试从网络中获取它。

![44860840e2090bd8.png](img/44860840e2090bd8.png)

从本地缓存中拉出可消除任何网络可变性。无论用户使用何种网络（WiFi，5G，3G甚至2G），我们需要运行的关键资源几乎可以立即使用。

Caution: 在此示例中，使用[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)策略提供静态资源，这会导致在不咨询网络的情况下返回任何缓存内容的副本。虽然`cache-first`策略易于实施，但它可能会在未来带来挑战。

#### 缓存应用数据

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)是理想的某些类型的数据，适用于我们的应用程序。它尽可能快地在屏幕上获取数据，然后在网络返回最新数据后进行更新。 Stale-while-revalidate意味着我们需要启动两个异步请求，一个到缓存，一个到网络。

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

在正常情况下，缓存数据几乎会立即返回，为应用程序提供可以使用的最新数据。然后，当网络请求返回时，将使用来自网络的最新数据更新应用程序。

对于我们的应用程序，这提供了比网络更好的体验，回退到缓存策略，因为用户不必等到网络请求超时才能在屏幕上看到某些内容。他们最初可能会看到较旧的数据，但一旦网络请求返回，应用程序将使用最新数据进行更新。

### 更新应用程序逻辑

如前所述，应用程序需要启动两个异步请求，一个到缓存，一个到网络。该应用程序使用`caches`可用对象`window`访问缓存和检索最新数据。这是渐进增强的一个很好的例子，因为`caches`对象可能并非在所有浏览器中都可用，如果不是，网络请求仍然可以工作。

更新`getForecastFromCache()`函数，检查`caches`对象是否在全局`window`对象中可用，如果是，请从缓存中请求数据。

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

然后，我们需要修改[`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196)以便它进行两次调用，一次调用`getForecastFromNetwork()`以从网络获取预测，另一次`getForecastFromCache()`以获取最新的缓存预测:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

我们的天气应用程序现在发出两个异步数据请求，一个来自缓存，另一个来自`fetch` 。如果缓存中有数据，它将被非常快速地返回和渲染（几十毫秒）。然后，当`fetch`响应时，将使用直接来自天气API的最新数据更新卡。

请注意缓存请求和`fetch`请求如何以更新预测卡的调用结束。应用程序如何知道它是否显示最新数据？这在`renderForecast()`的以下代码中处理:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

每次更新卡时，应用程序都会将数据的时间戳存储在卡上的隐藏属性中。如果卡上已存在的时间戳比传递给函数的数据更新，则应用程序就会失效。

### 预先缓存我们的应用资源

在服务工作者中，让我们添加一个`DATA_CACHE_NAME`以便我们可以将应用程序数据与app shell分开。更新应用程序外壳并清除旧缓存后，我们的数据将保持不变，为超快速加载做好准备。请记住，如果您的数据格式将来发生变化，您需要一种方法来处理这种情况，并确保应用程序外壳和内容保持同步。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

别忘了也更新`CACHE_NAME` ;我们也将改变我们所有的静态资源。

为了使我们的应用程序脱机工作，我们需要预先缓存它所需的所有资源。这也有助于我们的表现。该应用程序无需从网络获取所有资源，而是可以从本地缓存加载所有资源，从而消除任何网络不稳定性。

使用文件列表更新`FILES_TO_CACHE`数组:

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

由于我们手动生成要缓存的文件列表，因此每次更新文件时__必须更新`CACHE_NAME` __。我们能够从缓存文件列表中删除`offline.html` ，因为我们的应用程序现在具有离线工作所需的所有必要资源，并且不会再次显示脱机页面。

Caution:在此示例中，我们手动推出了自己的服务工作者。每次我们更新任何静态资源时，我们都需要重新刷新服务工作者并更新缓存，否则将提供旧内容。此外，当一个文件更改时，整个缓存无效并需要重新下载。这意味着修复一个简单的单字符拼写错误将使缓存无效并要求再次下载所有内容 - 效率不高。 [Workbox](/web/tools/workbox/)优雅地处理它，通过将其集成到您的构建过程中，只更新已更改的文件，为用户节省带宽并为您更轻松地进行维护！

#### 更新activate事件处理程序

为了确保我们`activate`事件不小心删除我们的数据，在`activate`事件`service-worker.js` ，更换`if (key !== CACHE_NAME) {`有:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### 更新fetch事件处理程序

我们需要修改服务工作者以拦截对weather API的请求并将其响应存储在缓存中，以便我们以后可以轻松访问它们。在陈旧的重新验证策略中，我们期望网络响应成为“事实来源”，始终向我们提供最新信息。如果不能，则可以失败，因为我们已经在应用程序中检索了最新的缓存数据。

更新`fetch`事件处理程序以独立于其他请求处理对数据API的请求。

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

该代码拦截请求并检查它是否用于天气预报。如果是，请使用`fetch`发出请求。返回响应后，打开缓存，克隆响应，将其存储在缓存中，然后将响应返回给原始请求者。

我们需要删除`evt.request.mode !== 'navigate'`检查，因为我们希望我们的服务工作者处理所有请求（包括图像，脚本，CSS文件等），而不仅仅是导航。如果我们离开该签入，则只从服务工作者缓存中提供HTML，其他所有内容都将从网络请求。

### 试一试

该应用程序现在应该完全脱机功能。刷新页面以确保您已安装最新的服务工作者，然后保存几个城市并按应用程序上的刷新按钮以获取新的天气数据。

然后转到DevTools的__Application__面板上的__Cache Storage__窗格。展开该部分，您应该会在左侧看到静态缓存和数据缓存的名称。打开数据缓存应显示为每个城市存储的数据。

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

然后，打开DevTools并切换到Service Workers窗格，选中Offline复选框，然后尝试重新加载页面，然后离线并重新加载页面。

如果你是一个快速的网络上，并希望看到天气预报数据是如何更新连接速度慢，设置`FORECAST_DELAY`物业`server.js`到`5000` 。对预测API的所有请求都将延迟5000毫秒。

### 验证灯塔的变化

再次运行Lighthouse也是一个好主意。

__SEO审计___

*__✅好:__ Document有元描述。

__Progressive Web App Audit__

* __✅好:__ 当前页面在离线时以200响应。
* __✅好:__ `start_url`在离线时以200响应。
* __✅好:__ 注册一个控制页面和`start_url.`的服务工作者
* __✅好:__ Web应用程序清单符合可安装性要求。
* __✅好:__ 已配置为自定义初始屏幕。
* __✅好:__ 设置地址栏主题颜色。

## 添加安装经验

安装Progressive Web App后，其外观和行为与所有其他已安装的应用程序类似。它与其他应用程序启动时的位置相同。它在没有地址栏或其他浏览器UI的应用程序中运行。与所有其他已安装的应用程序一样，它是任务切换器中的顶级应用程序。

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

在Chrome中，可以通过三点上下文菜单安装渐进式Web应用程序，也可以向用户提供按钮或其他UI组件，以提示他们安装您的应用程序。

Success: 由于Chrome的三点上下文菜单中的安装体验有点埋没，我们建议您在应用程序中提供一些指示以通知用户您的应用程序可以安装，并使用安装按钮完成安装过程。

### 审计与灯塔

为了使用户能够安装Progressive Web App，它需要满足[certain criteria](/web/fundamentals/app-install-banners/#criteria) 。最简单的方法是使用Lighthouse并确保它符合可安装的标准。

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

如果您使用此代码库，您的PWA应该已经符合这些标准。

Key Point: 对于本节，在DevTools的** Application **面板的** Service Workers **窗格中启用** Bypass for network **复选框。选中后，请求将绕过服务工作者并直接发送到网络。这简化了我们的开发过程，因为我们在完成本节时不必更新我们的服务工作者。

### 将install.js添加到index.html

首先，让我们将`install.js`添加到`index.html`文件中。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### 收听`beforeinstallprompt`活动

如果符合添加到主屏幕[criteria](/web/fundamentals/app-install-banners/#criteria) ，Chrome将触发`beforeinstallprompt`事件，您可以使用该事件指示您的应用可以“安装”，然后提示用户安装它。添加以下代码以收听`beforeinstallprompt`事件:

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### 保存事件并显示安装按钮

在我们的`saveBeforeInstallPromptEvent`函数中，我们将保存对`beforeinstallprompt`事件的引用，以便我们稍后可以在其上调用`prompt()` ，并更新我们的UI以显示安装按钮。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### 显示提示/隐藏按钮

当用户单击安装按钮时，我们需要在保存的`beforeinstallprompt`事件上调用`.prompt()` 。我们还需要隐藏安装按钮，因为`.prompt()`只能在每个保存的事件上调用一次。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

调用`.prompt()`将向用户显示模式对话框，要求他们将您的应用添加到主屏幕。

### 记录结果

您可以通过侦听已保存的`beforeinstallprompt`事件的`userChoice`属性返回的保证来检查用户如何响应安装对话框。在提示显示并且用户已对其作出响应后，promise将返回具有`outcome`属性的对象。

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

关于`userChoice`一个评论， [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) ，不是你所期望的功能。

#### 记录所有安装事件

除了您添加的用于安装应用的任何UI之外，用户还可以通过其他方法安装PWA，例如Chrome的三点式菜单。要跟踪这些事件，请侦听appinstalled事件。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

然后，我们需要更新`logAppInstalled`函数，对于这个代码库，我们只使用`console.log` ，但在生产应用程序中，您可能希望将其作为事件记录在您的分析软件中。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### 更新服务工作者

不要忘记更新`CACHE_NAME`在`service-worker.js`文件，因为你所做的已缓存文件的更改。在DevTools的“应用程序”面板的“服务工作者”窗格中启用__Bypass for network__复选框将在开发中工作，但在现实世界中无济于事。

### 试一试

让我们看看我们的安装步骤是如何进行的。为了安全起见，使用DevTools应用程序面板中的__Clear站点数据__按钮清除所有内容并确保我们重新开始。如果您之前安装了该应用程序，请务必将其卸载，否则安装图标将不会再次显示。

#### 确认安装按钮可见

首先，让我们验证我们的安装图标是否正确显示，请务必在桌面和移动设备上试用。

1. 在新的Chrome标签页中打开网址。
2. 打开Chrome的三点菜单（地址栏旁边）。
▢确认您在菜单中看到“*安装天气...... *”。
3. 使用右上角的刷新按钮刷新天气数据，以确保我们符合[user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) 。
▢确认应用程序标题中显示安装图标。

#### 验证安装按钮是否有效

接下来，让我们确保一切安装正确，并正确触发我们的事件。您可以在桌面设备或移动设备上执行此操作。如果您想在移动设备上进行测试，请确保使用远程调试，以便查看登录到控制台的内容。

1. 打开Chrome，然后在新的浏览器标签中，导航到您的Weather PWA。
2. 打开DevTools并切换到“控制台”窗格。
3. 单击右上角的安装按钮。 ▢确认安装按钮消失▢确认显示安装模式对话框。
4. 单击“取消”。
▢验证“*用户解除了A2HS提示*”显示在控制台输出中。
▢确认重新出现安装按钮。
5. 再次单击安装按钮，然后单击模式对话框中的安装按钮。
▢验证“*用户接受A2HS提示*”显示在控制台输出中。
▢确认“*已安装天气应用程序*”显示在控制台输出中。
▢确认天气应用已添加到您通常会找到应用的位置。
6. 启动Weather PWA。 ▢验证应用程序是作为独立应用程序打开的，可以在桌面上的应用程序窗口中，也可以在移动设备上全屏显示。

请注意，如果您从localhost在桌面上运行，则您安装的PWA可能会显示地址标题，因为localhost不被视为安全主机。

#### 验证iOS安装是否正常

我们还要检查iOS上的行为。如果您有iOS设备，可以使用它，或者如果您使用的是Mac，请尝试使用Xcode提供的iOS模拟器。

1. 打开Safari，在新的浏览器选项卡中，导航到Weather PWA。
2. 单击*共享*![8ac92dd483c689d3.png](img/8ac92dd483c689d3.png)按钮。
3. 向右滚动并单击*添加到主屏幕*按钮。
▢验证标题，URL和图标是否正确。
4. 单击*添加。
▢确认应用程序图标已添加到主屏幕。
5. 从主屏幕启动Weather PWA。
▢确认应用程序全屏启动。

### 奖励:检测您的应用是否从主屏幕启动

`display-mode`媒体查询可以根据应用程序的启动方式应用样式，或者确定如何使用JavaScript启动样式。

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

您还可以检查`display-mode`在媒体查询[JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) 。

### 奖励:卸载您的PWA

请记住，如果已经安装了应用程序，则`beforeinstallevent`不会触发，因此在开发期间，您可能需要多次安装和卸载应用程序，以确保一切正常运行。

#### Android

在Android上，卸载PWA的方式与卸载其他已安装的应用程序的方式相同。

* 打开应用程序抽屉。
* 向下滚动以查找天气图标。
* 将应用程序图标拖到屏幕顶部。
* 选择*卸载。

#### ChromeOS

在ChromeOS上，可以从启动器搜索框轻松卸载PWA。

* 打开发射器。
* 在搜索框中输入“* Weather *”，您的Weather PWA应出现在搜索结果中。
* 右键单击（按住alt键单击）Weather PWA。
* 点击 *从Chrome中删除...*

#### macOS和Windows

在Mac和Windows上，必须通过Chrome卸载PWA。

* 在新的浏览器标签中，打开chrome:// apps。
* 右键单击（按住alt键单击）Weather PWA。
* 点击*从Chrome中删除...*

## 恭喜

恭喜，您已经成功构建了第一个Progressive Web App！

您添加了一个Web应用程序清单以使其能够安装，并且您添加了一个服务工作者以确保您的PWA始终快速且可靠。您学习了如何使用DevTools审核应用程序以及它如何帮助您改善用户体验。

您现在知道将任何Web应用程序转换为Progressive Web App所需的关键步骤。

### 进一步阅读

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### 参考文档

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## 发现了问题，或者有反馈？ {: .hide-from-toc }

今天提交[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)帮助我们改进代码实验室。谢谢！

{% include "web/_shared/translation-end.html" %}
