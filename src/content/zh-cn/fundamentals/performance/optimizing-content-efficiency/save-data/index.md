project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Chrome、Opera 和 Yandex 浏览器中的 Save-Data 客户端提示请求标头让开发者可以向已在浏览器中选择启用“流量节省”模式的用户提供快速和轻便的应用。

{# wf_updated_on: 2018-04-19 #} {# wf_published_on: 2016-02-18 #} {# wf_tags: savedata,clienthints,chrome49 #} {# wf_blink_components: Blink>Fonts,Blink>CSS,Blink>JavaScript #} {# wf_featured_image: /web/updates/images/2016/02/save-data/data-saver-chrome.png #}

# 使用Save-Data提供快速和轻便的应用程序 {: .page-title}

{% include "web/_shared/contributors/ilyagrigorik.html" %} {% include "web/_shared/contributors/dgash.html" %} {% include "web/_shared/contributors/jeremywagner.html" %}

**Chrome，Opera和Yandex浏览器中提供的[`Save-Data`客户端提示请求标头](https://httpwg.github.io/http-extensions/client-hints.html#the-save-data-hint)允许开发人员为选择在浏览器中启用流量节省程序的用户提供更轻，更快的应用程序。**

## 轻量级页面的需求

![Weblight stats](https://github.com/google/WebFundamentals/blob/master/web/updates/images/2016/02/save-data/google-weblight.png?raw=true)

我们都认为更快更轻的网页可以提供更令人满意的用户体验，内容更容易理解并被记忆下来，从而提供更高的转化率和收入。 [谷歌研究](https://support.google.com/webmasters/answer/6211428)表明，“...优化页面字节数减少80％，加载速度比原始页面快4倍。由于这些页面的加载速度要快得多，我们还看到这些页面的流量增加了50％。”

而且，虽然2G连接的数量[最终在下降](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf) ，但它 [仍然是](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf) 2015年[的主导网络技术](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf) .3G和4G网络的渗透率和可用性正在快速增长，但对于数以亿计的用户来说，相关的拥有成本和网络限制仍然是一个重要因素。

这就是页面需要优化的强有力依据。

在没有直接开发人员参与的情况下，还有其他方法可以提高站点速度，例如代理浏览器和转码服务。虽然这些服务非常受欢迎，但它们具有很大的缺点 - 过于简单（有时是不可接受的）的图像和文本压缩，无法处理安全（HTTPS）页面，只优化通过搜索结果访问的页面等等。这些服务的普及本身就表明Web开发人员无法正确满足用户对快速和轻量级应用程序和页面的高需求。但实现这一目标是一条复杂而有时很艰难的道路。

## `Save-Data`请求标头

一种相当简单的技术是使用`Save-Data`请求标头让浏览器提供帮助。通过识别此标头，网页可以为成本和性能受限的用户提供定制并优化的交付以提高用户体验。

支持的浏览器（如下所示）允许用户启用*流量节省模式，该模式允许浏览器应用一系列优化措施以减少呈现页面所需的数据量。当此功能时默认启用或被打开时，浏览器可以请求较低分辨率的图像，推迟加载某些资源，或通过应用其他特定内容优化（例如图像和文本资源压缩）的服务来发起请求。

## 浏览器支持

- 当用户在移动设备上[启用](https://support.google.com/chrome/answer/2392284) “流量节省模式”选项或桌面浏览器上的“流量节省模式”扩展程序时，**Chrome 49+**会应用`Save-Data` 。
- 当用户在桌面上启用“ [Opera Turbo](http://www.opera.com/computer/features/fast-browser) ”模式或在Android浏览器上启用“ [流量节省](http://www.opera.com/help/mobile/android#turbo) ”选项时， **Opera 35+会**应用`Save-Data` 。
- 在桌面或[移动浏览器](https://yandex.com/support/browser-mobile-android-phone/navigation/turbo-mode.xml)上启用[Turbo模式](https://yandex.com/support/newbrowser/search-and-browse/turbo.xml)时， **Yandex 16.2+会**应用`Save-Data` 。

## 检测`Save-Data`设置

要确定何时向用户提供“轻量级”体验，您的应用程序可以检查`Save-Data`客户端提示请求标头。此请求标头指示客户端由于高传输成本，低连接速度或其他原因而减少数据使用的偏好设置。

当用户在其浏览器中启用流量节省模式时，浏览器会将`Save-Data`请求标头附加到所有传出请求（HTTP和HTTPS）。在撰写本文时，浏览器仅在标头中传递一个**on*-标示（ `Save-Data: on` ），但这可能会在将来扩展以指示其他用户首选项。

此外，还可以在JavaScript中检测是否已启用`Save-Data` ：

```javascript
if ("connection" in navigator) {
    if (navigator.connection.saveData === true) {
        // Implement data saving operations here.
    }
}
```

检查`navigator`对象中是否存在`connection`对象至关重要，因为它代表的是Network Information API，它仅在Chrome，Chrome安卓版和Samsung浏览器中实现。从这些浏览器中，您只需要检查`navigator.connection.saveData`是否等于`true` ，并且可以在该条件下实现任何用于节省流量的操作。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/web/updates/images/2016/02/save-data/data-saver-chrome.png?raw=true" alt="The
Save-Data header revealed in Chrome's Developer Tools pictured along with the
Data Saver extension.">
  <figcaption>在Chrome桌面浏览器中启用Data Saver扩展程序。</figcaption>
</figure>

如果您的应用程序[使用服务工作线程](/web/fundamentals/getting-started/push-notifications/step-03) ，它可以检查请求标头并应用相关逻辑来优化体验。或者，服务器可以通过`Save-Data`请求标头中检测是否启用，并返回备选响应 - 不同的标记，较小的图像和视频，等等。

> *提示: 如果您使用[PageSpeed for Apache or Nginx](/speed/pagespeed/module/)来优化您的网页，请参阅[此评论](https://github.com/pagespeed/mod_pagespeed/issues/1258)以了解如何为您的用户启用`Save-Data`节流。*

## 实施技巧和最佳实践

1. 使用`Save-Data` ，请提供一些支持它的UI设备，并允许用户轻松切换体验。例如：
    - 通知用户当前浏览器支持`Save-Data`并鼓励他们使用它。
    - 允许用户识别并选择具有适当提示和较直观的开/关按钮或复选框的模式。
    - 选择流量节省模式后，请通知用户并提供一种简单明了的方法来禁用它，并在需要时恢复到完整体验。
2. 请记住轻量级应用程序不是较差的应用程序。它们不会忽略重要的功能或数据，它们只是更加权衡所涉及的成本和用户体验。例如：
    - 照片库应用程序可能会提供较低分辨率的预览，或使用较少代码替代较重的轮播机制。
    - 搜索应用程序一次可能返回较少的结果，限制较多媒体结果的数量，或减少呈现页面所需的依赖数量。
    - 面向新闻的网站可能会显示较少的叙述，省略不太受欢迎的类型，或提供较小的媒体预览。
3. 提供服务器逻辑以检查`Save-Data`请求标头，并考虑在启用时提供备用，更轻的页面响应 - 例如，减少所需资源和依赖项的数量，应用更强的资源压缩等。
    - 如果您正在根据`Save-Data`标头提供备用响应，请记住将其添加到Vary标头 - `Vary: Save-Data` - 告诉上行缓存他们应该仅在请求表头包含`Save-Data`时提供此版本的缓存。有关更多详细信息，请参阅[与缓存交互](https://httpwg.github.io/http-extensions/client-hints.html#interaction-with-caches)的最佳实践。
4. 如果使用服务工作线程，则应用程序可以通过检查是否存在`Save-Data`请求标头，或通过检查`navigator.connection.saveData`属性的值来检测是否启用流量节省选项。如果启用，请考虑是否可以重写请求以减少请求的字节数，或使用已获取的响应。
5. 考虑使用其他信息对`Save-Data`进行补充 ，例如有关用户连接类型和设备的信息（请参阅[NetInfo API](http://w3c.github.io/netinfo/#examples-of-usage) ）。例如，即使未启用`Save-Data` ，您也可能希望为2G连接上的任何用户提供轻量级体验。相反，仅仅因为用户处于“快速”4G连接并不意味着他们对流量节省不感兴趣 - 例如，使用漫游业务时。此外，您可以使用`Device-Memory`客户端提示配合`Save-Data`，以进一步适应内存有限的设备上的用户。用户设备内存也可以在`navigator.deviceMemory`客户端提示中获取。

## 案例

您可以通过`Save-Data`实现的目标仅限于您可以提供的内容。为了让您了解可能的思想，让我们来看看几个例子。当您阅读本文时，您可能会想到适合自己的其他例子，请随意尝试并发现更适合您的方案！

### 在服务器端代码中检测`Save-Data`

虽然您*可以在JavaScript中*通过`navigator.connection.saveData`属性检测到`Save-Data`的状态，但在服务器端检测它有时更可取。在某些情况下，JavaScript *可能*无法执行。此外，服务器端检测是在将标记发送到客户端*之前*修改标记的唯一方法，这涉及一些`Save-Data`最有用的用例。

在服务器端代码中检测`Save-Data`标头的具体语法取决于所使用的语言，但对于任何后端应用程序，基本思想应该相同。例如，在PHP中，请求标头存储在[`$_SERVER`超级全局变量数组](http://php.net/manual/en/reserved.variables.server.php)中以`HTTP_`开头的索引处。这意味着您可以通过检查`$_SERVER["HTTP_SAVE_DATA"]`变量的存在和值来检测`Save-Data`标头，如下所示：

```php
// false by default.
$saveData = false;

// Check if the `Save-Data` header exists and is set to a value of "on".
if (isset($_SERVER["HTTP_SAVE_DATA"]) && strtolower($_SERVER["HTTP_SAVE_DATA"]) === "on") {
  // `Save-Data` detected!
  $saveData = true;
}
```

如果在将任何标记发送到客户端之前进行此检查， `$saveData`变量将包含`Save-Data`状态，并且可以在页面上的任何地方使用。通过这种机制，让我们看几个例子，说明我们如何使用它来限制我们发送给用户的数据量。

### 为高分辨率屏幕提供低分辨率图像

Web上图像的常见模式包括以两个为一组提供图像：一个用于“标准”屏幕(1x)的图像，另一个用于高分辨率屏幕(例如， [Retina显示](https://en.wikipedia.org/wiki/Retina_Display) )的两倍大(2x)的图像。这类高分辨率屏幕不一定限于高端设备，并且变得越来越普遍。如果首选较轻的应用程序体验，可能需要优先将较低分辨率(1x)图像发送到这些屏幕而不是较大(2x)图像。要使用`Save-Data`标头实现此目的，我们只需修改发送给客户端的标记：

```php
if ($saveData === true) {
  // Send a low-resolution version of the image for clients specifying `Save-Data`.
  ?><img src="butterfly-1x.jpg" alt="A butterfly perched on a flower."><?php
}
else {
  // Send the usual assets for everyone else.
  ?><img src="butterfly-1x.jpg" srcset="butterfly-2x.jpg 2x, butterfly-1x.jpg 1x" alt="A butterfly perched on a flower."><?php
}
```

这个用例是一个很好的例子，说明如何轻松地关照那些特别要求您向他们发送较少数据的人。如果你不喜欢在后端修改标记，你也可以通过使用URL重写模块（如[Apache的`mod_rewrite`](http://httpd.apache.org/docs/current/mod/mod_rewrite.html)来实现相同的结果。这里有一些如何使用相对较少的配置[实现此目的的示例](https://css-tricks.com/help-users-save-data/#article-header-id-0) 。

您还可以通过向`<html>`元素添加class来将这种思想扩展到CSS `background-image`属性：

```php
<html class="<?php if ($saveData === true): ?>save-data<?php endif; ?>">
```

这样，您可以在CSS中的定位`<html>`元素上`save-data`类，以更改图像的传递方式。您可以将低分辨率背景图像发送到高分辨率屏幕，如上面的HTML示例所示，或者完全省略某些资源。

### 省略不必要的图像

网络上的一些图像内容并不是必需的。虽然这样的图像可以为内容提供额外良好的说明，但是那些试图从流量计划中挤出一些内容的人可能并不希望看到这些图像。在`Save-Data`的最简单用例中，我们可以使用之前的PHP检测代码，并完全省略非必要的图像标记：

```php
<p>This paragraph is essential content. The image below may be humorous, but it's not critical to the content.</p>
<?php
if ($saveData === false) {
  // Only send this image if `Save-Data` hasn't been detected.
  ?><img src="meme.jpg" alt="One does not simply consume data."><?php
}
```

这种技术无疑可以产生明显的效果，如下图所示：

<figure>
  <img srcset="images/omitted-images-2x.png 2x, images/omitted-images-1x.png 1x" src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/save-data/images/omitted-images-1x.png?raw=true" alt="A comparison of non-critical imagery
being loaded when Save-Data is absent, versus that same imagery being omitted
when Save-Data is present.">
  <figcaption>Save-Data不存在加载非关键图像与存在Save-Data时相同图像被省略的对比。</figcaption>
</figure>

当然，省略图像不是唯一可能的选择。您还可以对`Save-Data`采取其他措施，放弃发送其他非关键资源，例如某些字体。

### 省略不必要的网络字体

虽然网络字体通常不像图像常常出现在页面中，但它们仍然非常受欢迎。 [它们也不会消耗大量的数据](https://httparchive.org/reports/page-weight#bytesFont) 。此外，浏览器获取和渲染字体的方式比您想象的要复杂得多，使用[FOIT](https://www.zachleat.com/web/webfont-glossary/#foit) ， [FOUT](https://www.zachleat.com/web/webfont-glossary/#fout)和浏览器启发式等概念会使渲染方式略有不同。

因此，您可能希望为更想要简洁体验的用户省略非必要的Web字体。 使用`Save-Data`可以轻松实现这件事。

例如，假设您在自己的网站上添加了来自[Google字体的](https://fonts.google.com) [Fira Sans](https://fonts.google.com/specimen/Fira+Sans) 。 Fira Sans是一种出色的正文复制字体，但对于试图节省流量的用户而言，它可能并不是那么重要。通过在存在`Save-Data`头时向`<html>`元素添加一个类`save-data` ，我们可以首先编写调用非必要字体的样式，然后在save-data类存在时不去调用非必要字体：

```css
/* Opt into web fonts by default. */
p,
li {
  font-family: "Fira Sans", "Arial", sans-serif;
}

/* Opt out of web fonts if the `save-Data` class is present. */
.save-data p,
.save-data li {
  font-family: "Arial", sans-serif;
}
```

使用这种方法，您可以保留Google字体中的`<link>`片段，因为浏览器通过首先将样式应用于DOM，然后检查是否有HTML元素使用样式表中的资源来推测需要加载哪些CSS资源(包括Web字体)。如果`Save-Data`被设置为on，Fira Sans将永远不会加载，因为应用样式的DOM永远不会使用它。相反，Arial将会被使用。虽然它不如Fira Sans那么漂亮，但对那些试图节省流量的用户来说可能更好。

### 禁用服务器推送

[HTTP/2服务器推送](https://tools.ietf.org/html/rfc7540#section-8.2)通常是HTTP/2最受欢迎的功能。 [虽然它可以提高性能](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/#measuring-server-push-performance) ，但由于[缓存“陷阱”](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/) ，使它可能会成为问题。

如果您习惯使用服务器推送并了解其与浏览器缓存交互的古怪方式，那么很棒。但是，如果存在`Save-Data`标头，您可能需要考虑完全禁用它。

当设置了调用[`rel=preload`](https://www.w3.org/TR/preload/)的`Link`响应头时，许多HTTP/2启用了对资源的服务器推送。这会导致一些关于`rel=preload`和server push是否相同的困惑，但它们是两个截然不同的东西。 `rel=preload`是资源提示，服务器推送是HTTP/2的一部分。事实上， `Link`标头在许多HTTP/2中启动了服务器推送。

`rel=preload`的规范通过提供在`Link` HTTP响应头中使用的`nopush`关键字来[解决这个潜在的痛点](https://www.w3.org/TR/preload/#server-push-http-2) 。使用前面讲到过的后端检测逻辑，如果存在`Save-Data`则可以添加`nopush` ：

```php
// `preload` like usual...
$preload = "</css/styles.css>; rel=preload; as=style";

if($saveData === true) {
  // ...but don't push anything if `Save-Data` is detected!
  $preload .= "; nopush";
}

header("Link: " . $preload);
```

[还有其他方法可以实现这一点](https://www.ctrl.blog/entry/http2-save-data-push) ，有些方法比其他方法更精细，但思想是相同的：当`Save-Data`存在时，禁用HTTP/2服务器推送。

如您所见，使用`Save-Data`可以实现很多功能。这些只是几个简单的使用案例，所以请尽情尝试，看你是否可以找到更新奇的例子！

## 总结

`Save-Data`标头并没有太多其他意义;不管是否启用，应用程序都有责任去为用户提供合适的体验，无论原因是什么。

例如，某些用户可能会因为怀疑应用程序内容或功能会丢失而不会允许启用流量节省模式，即使在连接不良的情况下也是如此。相反，即使在良好的连接情况下，一些用户也可以启用它以尽可能地使页面保持简洁。最好让您的应用程序假设用户需要完整且无限制的体验，除非您的用户明确的操作去启用流量节省模式。

作为网站所有者和网站开发人员，让我们承担管理内容的责任，以改善数据和成本受限用户的体验。

有关`Save-Data`和优秀实际示例的更多详细信息，请参阅[ Help Your Users `Save Data`](https://css-tricks.com/help-users-save-data/) 。
