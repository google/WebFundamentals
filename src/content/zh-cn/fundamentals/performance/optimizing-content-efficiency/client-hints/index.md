project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 客户端提示是一组 HTTP 请求标头，我们可以使用客户端提示根据用户的设备和网络连接更改提供页面资源的方式。在本文中，您将了解客户端提示的概念、它们的工作原理，以及有关如何使用它们来向用户更快显示站点的几点意见。

{# wf_updated_on: 2018-11-27 #} {# wf_published_on: 2018-11-22 #} {# wf_blink_components: UI>Browser>Mobile>Settings>DataSaver,Blink>Fonts,Blink>CSS,Blink>JavaScript #}

# 使用客户端提示以适应用户 {: .page-title}

{% include "web/_shared/contributors/jeremywagner.html" %}

开发任何情况下都很快速的站点可能是一个棘手的问题。过多的设备功能 - 以及它们连接到的网络的质量 - 可以使这看起来像是一项不可逾越的任务。虽然我们可以利用浏览器功能来提高加载性能，但我们如何知道用户设备的能力或网络连接的质量是否可以支持？答案就是[客户端提示](https://tools.ietf.org/html/draft-ietf-httpbis-client-hints-06) ！

客户端提示是一组选择加入的HTTP请求标头，可让我们深入了解关于用户设备以及它们所连接的网络的情况。通过在服务器端挖掘这些信息，我们可以根据设备和/或网络条件的不同改变我们*提供内容的方式*。这可以帮助我们创建更具包容性的用户体验。

## 关于内容协商

客户端提示是*内容协商的*另一种方法，这意味着根据浏览器请求标头更改内容响应。

这个内容协商的示例涉及[`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)请求标头。它描述了浏览器理解的*内容*类型，服务器可以使用它来*协商*响应。对于图片请求，Chrome的`Accept`标头的内容为：

```http
Accept: image/webp,image/apng,image/*,*/*;q=0.8
```

虽然所有浏览器都支持JPEG，PNG和GIF等图像格式，但在这种情况下，Accept会告诉浏览器*还*支持[WebP](/speed/webp/)和[APNG](https://en.wikipedia.org/wiki/APNG) 。使用此信息，我们可以为每个浏览器协商到最佳图像类型：

```php
<?php
//检查“Accept”是否包含“image/webp”子字符串。
$webp = stristr($_SERVER ["HTTP_ACCEPT"], "image/webp") !== false ? true : false;
//根据浏览器的WebP支持情况设置图像URL。
$imageFile = $webp ? "whats-up.webp" : "whats-up.jpg";
?>
<img src ="<?php echo($imageFile); ?>" alt="我是一个图像!">
```

与`Accept`一样，客户端提示是在设备功能和网络条件的背景下协商内容的另一种方式。通过客户端提示，我们可以根据用户的个人体验做出服务器端性能策略，例如决定是否应该向网络条件较差的用户提供非关键资源。在本指南中，我们将描述所有可用的提示以及一些使用它们的方法，以使提供的内容更容易适应用户。

## 选择性使用

与`Accept`标头不同，客户端提示不仅仅是神奇地出现（ `Save-Data`除外，我们将在后面讨论）。为了将请求标头保持在最低限度，您需要在用户请求资源时通过发送`Accept-CH`标头来选择您希望接收哪些客户端提示：

```http
Accept-CH: Viewport-Width, Downlink
```

`Accept-CH`的值是以逗号分隔的请求提示列表，站点将在确定后续资源请求的结果时使用这些提示。当客户端读取此标题时，会被告知“此站点需要`Viewport-Width`和`Downlink`客户端提示。”不要担心这些提示本身的细节。我们稍后会讲到。

还有一个可选的`Accept-CH-Lifetime`标头，它指定浏览器应记住您为`Accept-CH`设置的值的时间长度（以秒为单位）。

Note: 客户首次访问您的网站时，客户提示不会出现在导航请求中。但是，如果您使用`Accept-CH-Lifetime`保留提示，则此信息将在导航请求中提供。

您可以使用任何后端语言选择设置这些选择性标头。例如，可以使用[PHP的`header`函数](http://php.net/manual/en/function.header.php) 。您甚至可以在`<meta>`标签上使用[`http-equiv`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)设置这些选择性标头：

```html
<meta http-equiv="Accept-CH" content="Viewport-Width, Downlink">
<meta http-equiv="Accept-CH-Lifetime" content="86400">
```

Note: 要使客户端提示完全正常工作，您的网站必须通过HTTPS提供服务！

## 所有的客户端提示！

客户端提示提供了两件信息：您的用户*使用*的网络和他们用来访问您的网站的设备。让我们简要介绍一下可用的所有提示。

### 设备提示

一些客户端提示描述了用户设备的特征，通常是屏幕特征。其中一些可以帮助您为给定用户的屏幕选择最佳媒体资源，但并非所有这些都必须以媒体为中心。

在我们开始介绍设备提示之前，学习一些用于描述屏幕和媒体解析的关键术语可能会对您有所帮助：

**物理尺寸：**媒体资源的实际尺寸。例如，如果在Photoshop中打开图像，则图像大小对话框中显示的尺寸将描述其*物理尺寸* 。

**像素密度校正尺寸：**校正像素密度后的媒体资源的**尺寸** 。它是图像的*物理尺寸*除以[设备像素比](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) 。例如，让我们采用这个标记：

```html
<img src="whats-up-1x.png"
     srcset="whats-up-2x.png 2x, whats-up-1x.png 1x"
     alt="I'm that image you wanted.">
```

比方说，`1x`这种情况下，图像的物理尺寸为320x240，而`2x`情况下图像的物理尺寸为640x480。如果安装在屏幕设备像素比为2的设备上的客户端（例如，Retina屏幕）解析该标记，则请求`2x`图像。 `2x`图像的*像素密度校正尺寸*是320x240，因为640x480除以2是320x240。

**逻辑尺寸：** 当CSS以及其他布局因子（例如`width`和`height`属性）应用于其之后的媒体资源的尺寸。假设您有一个`<img>`元素，它加载的图像的像素密度校正尺寸为320x240，但它也有CSS `width`和`height`属性，其值分别为`256px`和`192px` 。在此示例中， `<img>`元素的*逻辑尺寸*变为256x192。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-1.svg?raw=true" alt='An illustration of intrinsic size versus
extrinsic size. A box sized 320x240 pixels is shown with a label of "INTRINSIC
SIZE". Within it is a smaller box sized at 256x192 pixels, which represents an
HTML <img> element with CSS applied to it. This box is labeled "EXTRINSIC
SIZE". To the right is a box containing CSS applied to the element which
modifies the <img> element' s layout so that its extrinsic size differs from intrinsic size.>
  <figcaption><em><strong>图1</strong> 。物理尺寸和逻辑尺寸的例子。在将布局因子应用于图像之后，图像得到逻辑尺寸。在这种情况下，应用CSS规则<code>width: 256px;</code>和<code>height: 192px;</code>后将320x240物理尺寸的图像转换为256x192逻辑尺寸的图像。</em></figcaption>
</figure>

有了这些术语知识后，让我们进入介绍可使用的客户端提示中设备提示的相关信息。

#### Viewport-Width

`Viewport-Width`是CSS像素中用户视口的宽度：

```http
Viewport-Width: 320
```

该提示可以与其他屏幕特定提示一起使用以提供对于不同特定屏幕尺寸（例如， [art direction](https://www.smashingmagazine.com/2016/02/automatically-art-directed-responsive-images-go/) ）图像的不同处理（例如，产出），或者省略对于当前屏幕宽度不必要的资源。

#### DPR

`DPR`是device pixel ratio的缩写，表示用户屏幕的物理像素与CSS像素的比率：

```http
DPR: 2
```

选择与屏幕像素密度相对应的图像资源时，此提示很有用（如[`srcset`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)中的`x`描述符）。

#### Width

`Width`提示出现在使用[`sizes`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)由`<img>`或`<source>`标记触发的图像资源请求上。 `sizes`告诉浏览器资源的逻辑尺寸是多少; `Width`使用该逻辑尺寸来请求对当前布局效果最佳的物理尺寸的图像。

例如，假设用户请求具有320 CSS像素宽屏幕且DPR为2的页面。设备加载的文档包含使用`sizes`属性值`85vw`的`<img>`元素（即，整个视口宽度的85％）。如果已选择`Width`提示，则客户端将使用`<img>`的`src`请求将此`Width`提示发送到服务器：

```http
Width: 544
```

在个例子中，客户端向服务器请求中提示图像的最佳固有宽度将是视口宽度的85％（272像素）乘以屏幕的DPR（2），即等于544像素。

这个提示特别有用，因为它不仅考虑了屏幕的像素密度校正宽度，而且还将这一关键信息与布局中图像的逻辑尺寸进行了协调。这使服务器有机会选择对屏幕*和*布局都表现最佳的图像响应。

#### Content-DPR

虽然您已经知道*屏幕*具有设备像素比率，但资源也有自己的像素比率。在最简单的资源选择实例中，设备和资源之间的像素比率可以相同。但是！在`DPR`和`Width`标头都适用的情况下，资源的逻辑尺寸会出现两种不同的情况。这就是`Content-DPR`提示发挥作用的地方。

与其他客户端提示不同， `Content-DPR`不是提供给服务器使用的*请求*标头，而是每当使用`DPR`和`Width`提示选择资源时，服务器*必须*发送的*响应*标头。 `Content-DPR`的值应该由如下等式计算得到：

`Content-DPR` = [选择图片的资源尺寸] / ([`Width`] / [`DPR`])

当收到`Content-DPR`请求标头时，浏览器将知道如何缩放给定图像以适应当前屏幕的设备像素比和布局。没有它，图像可能无法正确缩放。

#### Device-Memory

[设备内存API](https://www.w3.org/TR/device-memory-1/)技术的一部分， `Device-Memory`显示当前设备以GB为单位的[大致内存量](https://www.w3.org/TR/device-memory-1/#sec-device-memory-client-hint-header),：

```http
Device-Memory: 2
```

Note: 由于此信息[可用于用户设备指纹识别](https://blog.mozilla.org/internetcitizen/2018/07/26/this-is-your-digital-fingerprint/) ，因此`Device-Memory`值有意粗略表示。有效值是`0.25` ， `0.5` ， `1` ， `2` ， `4` ，和`8` 。

此提示的一个可能的例子是减少发送到内存有限的设备上的浏览器的JavaScript数量， [因为JavaScript通常是浏览器加载的资源最密集的内容类型](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) 。或者您可以发送较低的DPR图像，因为它们使用较少的内存进行解码。

### 网络提示

[Network Information API](https://wicg.github.io/netinfo/)提供了另一类客户端提示，用于描述用户网络连接的性能。在我看来，这些是最有用的提示。有了它们，我们就能够通过改变我们在缓慢连接上向客户提供资源的方式来为用户定制体验。

Note: 网络提示值是基于过去延迟和带宽读数的预测。因此，它们不是100％准确的，但足够为客户端提示提供参考。

#### RTT

`RTT`提示提供应用层上的近似*往返时间* （以毫秒为单位）。与传输层RTT不同， `RTT`提示包括服务器处理时间。

```http
RTT: 125
```

Note: `RTT`的值会四舍五入到最接近的25毫秒的倍数，以防止指纹识别。

此提示对于提供延迟在加载性能中的表现很有用。使用`RTT`提示，我们可以根据网络响应速度做出决策，这有助于加快整体的交付体验（例如，通过省略某些请求）。

#### Downlink

虽然延迟在加载性能方面很重要，但带宽也很有影响。 `Downlink`提示以兆比特每秒（Mbps）表示，显示了用户连接的*近似*下行速度：

```http
Downlink: 2.5
```

Note: `Downlink`的值四舍五入到最接近的25千比特/秒的倍数。原因还是，指纹识别。

结合`RTT` ， `Downlink`可用于根据网络连接的质量更改内容的交付方式。

#### ECT

`ECT`提示代表*Effective Connection Type* 。它的值是[根据`RTT`和`Downlink`值指定范围内的连接类型](https://wicg.github.io/netinfo/#effective-connection-types)之一 。

此标头不代表*实际*连接类型是什么 - 例如，它不报告您的连接是手机信号塔还是WiFi接入点。相反，它分析当前连接的延迟和带宽，并确定它最相似的网络配置。例如，如果您通过wifi连接到慢速网络， `ECT`可能会显示`2g`的值，这是最接近的*有效*连接类型的近似值：

```http
ECT: 2g
```

`ECT`有效值为`4g` ， `3g` ， `2g`和`slow-2g` 。此提示可用作评估连接质量的起点，然后使用`RTT`和`Downlink`提示进行细化。

#### Save-Data

`Save-Data`并不是一个描述网络条件的提示，而是用户首选项表明页面应该发送更少的数据。

Note: 在所有客户端提示中， `Save-Data`是唯一一个*无法*使用`Accept-CH`选择发送的标头 。只有用户通过在Android设备上选择Chrome的[节省流量程序](https://support.google.com/chrome/answer/2392284)来控制是否发送此提示。

我更倾向于将`Save-Data`归类为网络提示，因为您使用它做的许多事情与其他网络提示类似。用户也可能在高延迟/低带宽环境中启用它。这个提示如果存在，会是这样：

```http
Save-Data: on
```

在Google， [我们已经讨论了使用`Save-Data`可以做些什么](/web/fundamentals/performance/optimizing-content-efficiency/save-data/) 。它可能对性能产生的影响可能是巨大的。这是用户实际上要求您发送更少东西的一个信号！如果您遵循并按照该信号采取行动，用户将会非常感激。

## 把它们结合起来

您*对*客户提示的处理取决于您。因为它们提供了如此多的信息，所以您有很多选择。为了获得一些想法，让我们看看客户端提示可以为[Sconnie Timber](https://github.com/malchata/client-hints-example)做些什么， [Sconnie Timber](https://github.com/malchata/client-hints-example)是一家位于Upper Midwest乡村的虚构木材公司。 [与偏远地区的情况一样](https://www.technologyreview.com/s/603083/the-unacceptable-persistence-of-the-digital-divide/) ，那里的网络连接可能很脆弱。这就是像客户端提示这样的技术可以真正为用户带来改变的地方。

### 响应式图像

除了最简单的响应式图像之外的情况都会变得复杂。如果您针对不同的屏幕尺寸*和*不同的格式对同一图像进行多种处理*和*变换，该怎么办？这些标记[很快会变得*非常*复杂](https://dev.opera.com/articles/responsive-images/#changing-image-sizes-high-dpi-images-different-image-types--art-direction-use-case) 。这很容易弄错，容易忘记或误解重要概念（如`sizes` ）。

虽然`<picture>`和`srcset`是*非常棒的*工具没错，但对于复杂的情况来说，开发和维护它们可能会非常耗时。虽然我们可以自动生成标记，但这样做也很困难，因为`<picture>`和`srcset`提供的功能非常复杂，我们需要以保持其提供的灵活性的前提下完成自动化。

客户端提示可以简化这一点。使用客户端提示协商图像响应可能如下所示：

1. 如果合乎您的工作流程，请首先通过检测`Viewport-Width`提示选择合适的图像处理（即艺术导向的图像）。
2. 通过检测到的`Width`提示和`DPR`提示选择图像分辨率，并选择适合图像布局大小和屏幕像素密度的资源（类似于`x`和`w`描述符在`srcset`中的工作方式）。
3. 选择浏览器支持的最佳文件格式（ 在大多数浏览器中`Accept`可以帮助我们执行此操作）。

考虑到我的虚拟木材公司客户的情况，我在PHP中开发了一个使用客户端提示的响应图像选择的简单示例。这并不意味着将此标记发送给所有用户：

```html
<picture>
  <source srcset="company-photo-256w.webp 256w,
                  company-photo-512w.webp 512w,
                  company-photo-768w.webp 768w,
                  company-photo-1024w.webp 1024w,
                  company-photo-1280w.webp 1280w"
          type="image/webp">
  <img srcset="company-photo-256w.jpg 256w,
               company-photo-512w.jpg 512w,
               company-photo-768w.jpg 768w,
               company-photo-1024w.jpg 1024w,
               company-photo-1280w.jpg 1280w"
       src="company-photo-256w.jpg"
       sizes="(min-width: 560px) 251px, 88.43vw"
       alt="The Sconnie Timber Staff!">
</picture>
```

我能够根据个人浏览器支持将其减少到以下内容：

```html
<img src="/image/sizes:true/company-photo.jpg"
     sizes="(min-width: 560px) 251px, 88.43vw"
     alt="SAY CHEESY PICKLES.">
```

在此示例中， `/image` URL是一个PHP脚本，后跟[mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)重写的参数。它需要一个图像文件名和附加参数来帮助后端脚本在给定条件下选择最佳图像。

您可能会首先问*“但这不就是重新实现`<picture>`和`srcset`吗？”*。

在某种程度上，是-但有一个重要的区别：当应用程序使用客户端提示来制作媒体响应时，大多数（如果不是全部）工作更容易自动化，其中可以使用服务（如CDN）为您这样做。对于HTML解决方案，需要为每个用例编写新的标记。当然，您*可以*自动生成标记。但是，如果您的设计或要求发生变化，很可能需要在将来重新审视您的自动化策略。

客户端提示可以从无损的高分辨率首选图像开始，然后可以动态调整大小以适应*任何*屏幕和布局组合。与要求您列举可供选择的候选图像的固定列表供浏览器选择的`srcset`不同的是，这种方法可以更灵活。`srcset`迫使你提供浏览器的变体，比如`256w` ， `512w` ， `768w`和`1024w`，而基于客户端提示的方案可以在没有一大堆标记的情况下解决所有的宽度。

当然，你*不必*自己编写图像的选择逻辑。 [Cloudinary通过`w_auto`参数使用客户端提示来处理图像响应](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints) ，并观察到当使用支持客户端提示的浏览器时，中位数用户下载的字节数减少了42％。

但要小心！ [桌面版Chrome 67的更改已取消对跨域客户端提示的支持](https://cloudinary.com/blog/client_hints_and_responsive_images_what_changed_in_chrome_67) 。幸运的是，这些限制不会影响Chrome的移动版本，并且在完成[功能策略](https://wicg.github.io/feature-policy/)的制定工作时，它们将会在所有平台全部取消。

### 在慢速网络下帮助用户

*自适应性能*是指我们可以根据客户提示向我们提供的信息来调整我们提供资源的方式;特别是考虑到用户网络连接当前状态的信息。

在Sconnie Timber的网站示例中，我们在后端代码中通过检查`Save-Data` ， `ECT` ， `RTT`和`Downlink`标头等在低俗网络下减轻负载。然后，我们会生成一个网络质量得分，我们可以用它来确定是否应该进行干预以获得更好的用户体验。此网络分数介于`0`和`1`之间，其中`0`表示网络质量最差， `1`表示最佳。

最初，我们检查是否存在`Save-Data` 。如果是，则将分数设置为`0` ，因为我们假设用户希望我们做任何必要的操作以使体验更轻松，更快。

但是，如果没有`Save-Data` ，我们继续并权衡`ECT` ， `RTT`和`Downlink`提示的值，以计算描述网络连接质量的分数。 [网络分数生成源代码](https://github.com/malchata/client-hints-example/blob/master/includes/functions.php#L8)可在Github上获得。另外，如果我们以*某种*方式使用与网络相关的提示，我们就可以为那些使用慢速网络的人提供更好的体验。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-2-1x.png?raw=true" srcset="images/figure-2-2x.png 2x,
images/figure-2-1x.png 1x" alt="A comparison of a site that doesn" t use client hints to adapt a slow network connection and the same site that does>
  <figcaption><em><strong>图2</strong> 。当地的一个商户网站的“关于我们”页面。基于体验的内容包括Web字体，用于控制幻灯片的JavaScript和手风琴效果，以及内容图像等。当网络条件太慢而无法快速加载时，我们可以省略这些内容。</em></figcaption>
</figure>

当网站收到客户端提供的提示信息时，我们不必采用“全有或全无”的方法。我们可以智能地决定发送哪些资源。我们可以修改响应式图像选择逻辑，为给定的显示器发送质量较低的图像，以便在网络质量较差时加快加载性能。

在此示例中，我们可以看到客户端提示在提高较慢网络上的站点性能时所具有的影响。下面是慢速网络网站在不使用客户端提示情况下的WebPagetest瀑布图：

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-3.png?raw=true" alt="A WebPagetest waterfall of the Sconnie
Timber site loading all resources on a slow network connection.">
  <figcaption><em><strong>图3</strong> 。资源繁重的站点在慢速连接上加载图像，脚本和字体。</em></figcaption>
</figure>

现在，在同样慢速连接上同一站点的瀑布图，这次，该站点使用客户端提示来消除非关键页面资源：

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/client-hints/images/figure-4.png?raw=true" alt="A WebPagetest waterfall of the Sconnie
Timber site using client hints to decide not to load non-critical resources on a
slow network connection.">
  <figcaption><em><strong>图4</strong> 。在同一连接上的同一站点，仅排除“有会更好”的资源，以支持更快的加载。</em></figcaption>
</figure>

客户端提示将页面加载时间从45秒*减少*到*不到十分之一* 。当客户端提示在这种情况下得到足够的重视，对于通过慢速网络寻求关键信息的用户来说可能是一个巨大的好处。

此外，可以在使用客户端提示情况下而不会破坏不支持它们的浏览器的体验。例如，如果我们希望通过`ECT`提供值调整资源交付，同时仍然为不支持的浏览器提供完整体验，我们可以设置回退到默认值，如下所示：

```php
// Set the ECT value to "4g" by default.
$ect = isset($_SERVER["HTTP_ECT"]) ? $_SERVER["HTTP_ECT"] : "4g";
```

这里， `"4g"`表示`ECT`标题描述的最高质量的网络连接。如果我们将`$ect`初始化为`"4g"` ，那么不支持客户端提示的浏览器将不会受到影响。简直棒极了！

## 注意那些缓存！

每当您根据HTTP标头更改响应时，您都需要注意缓存在未来发起请求时如何处理该资源的。 [`Vary`标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary)在这里是必不可少的，因为它将缓存提供给它的请求头的键名。简单地说，如果您根据给定的HTTP请求标头修改任何响应，您应该几乎总是在请求中包含`Vary`标头，如下所示：

```http
Vary: DPR, Width
```

然而有一个*重要的*提醒：您可能永远不需要在`Vary`上设置经常变化的报头（如缓存响应`Cookie` ），因为这些资源实际上会变为不可缓存。因此，您可能想避免为`Vary`设置比如`RTT`或`Downlink`这些标头 ，因为这些和网络连接状况相关，可能经常发生变化。如果您必须要根据这些标头作出响应，请考虑仅使用`ECT`标头，这将最大限度地减少缓存失效的情况。

当然，这仅适用于您首先缓存响应的情况。例如，如果HTML资源的内容是动态的，则不会对其进行缓存，因为这可能会破坏重复访问时的用户体验。在这样的情况下，随意修改任何基础，你觉得是必要的这种反应，而不是与担心自己`Vary` 。

## 服务工作线程中的客户端提示

内容协商不仅仅适用于服务器！由于服务工作线程充当客户端和服务器之间的代理，因此您可以通过它控制JavaScript传递资源的方式。这包括客户端提示。在service worker `fetch`事件中，您可以使用`event`对象的[`request.headers.get`](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers)方法来读取资源的请求标头，如下所示：

```javascript
self.addEventListener("fetch", event => {
  let dpr = event.request.headers.get("DPR");
  let viewportWidth = event.request.headers.get("Viewport-Width");
  let width = event.request.headers.get("Width");

  event.respondWith(async function() {
    // Do what you will with these hints!
  }());
});
```

Warning: 因为并非所有浏览器都支持客户端提示，所以您需要检查`event.request.headers.get`返回的值。一种可能的替代方法是将JS等效值（例如[`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)或[`window.innerWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth)记录到[`IndexedDB`](/web/ilt/pwa/working-with-indexeddb) 中，IndexDB可以在服务工作线程作用域中访问。

您选择使用的任何客户端提示标头都可以使用这种方式获取。虽然这不是获取这些信息的唯一方法。可以在JavaScript的`navigator`对象中获取这些与特定于网络的提示等效的属性：

客户端提示 | JS 等效值
--- | ---
`ECT` | `navigator.connection.effectiveType`
`RTT` | `navigator.connection.rtt`
`Save-Data` | `navigator.connection.saveData`
`Downlink` | `navigator.connection.downlink`
`Device-Memory` | `navigator.deviceMemory`

由于这些API并不是任何浏览器都支持，因此需要使用[`in`运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)进行功能检查：

```javascript
if ("connection" in navigator) {
  // Work with netinfo API properties in JavaScript!
}
```

在服务工作线程中，除了您*不需要*使用服务器与客户端提示协商内容之外，您还可以使用类似于在服务器上使用的一些逻辑。由于服务工作线程具备在用户离线时提供内容的能力，因此他们能够更快地提高加载体验并提高网络适应性。

## 总结

通过客户提示，我们有能力以完全渐进的方式为用户提供更快的体验。我们可以根据用户的设备功能提供媒体服务，使得提供响应式图像比依赖`<picture>`和`srcset`更容易，特别是对于复杂的情况。这使我们不仅可以减少开发方面的时间和精力，还可以优化资源 - 特别是图像 - 以一种比使用<picture data-md-type="raw_html">`<picture>`和`srcset`更好的方式。 </picture>

也许更重要的是，我们可以通过嗅探糟糕的网络连接来修改我们发送的内容以及发送方式并缩小用户等待时间。这可以让使用脆弱网络的用户在访问网站时*更容易*。结合服务工作线程，我们还可以创建即使在网络离线情况依然加载极快的站点。

虽然客户端提示仅适用于Chrome和基于Chromium的浏览器，但它们可以以不妨碍不支持它们的浏览器的方式使用它们。考虑使用客户端根据每个用户的设备功能以及他们连接到的网络来创建真正具有包容性和适应性的体验。希望其他浏览器供应商能够看到它们的价值并实施对它们的支持。

### 参考资源

- [Automatic Responsive Images with Client Hints](https://cloudinary.com/blog/automatic_responsive_images_with_client_hints)
- [Client Hints and Responsive Images—What Changed in Chrome 67](https://cloudinary.com/blog/client_hints_and_responsive_images_what_changed_in_chrome_67)
- [Take a (Client) Hint!](https://www.youtube.com/watch?v=md7Ua82fPe4) ([Slides](https://jlwagner.net/talks/take-a-client-hint))
- [Delivering Fast and Light Applications with `Save-Data`](/web/fundamentals/performance/optimizing-content-efficiency/save-data/)

*感谢[Ilya Grigorik](https://twitter.com/igrigorik) ， [Eric Portis](https://twitter.com/etportis) ， [Jeff Posnick](https://twitter.com/jeffposnick) ， [Yoav Weiss](https://twitter.com/yoavweiss)和[Estelle Weyl](https://twitter.com/estellevw)对本文提供宝贵的反馈和编辑。*

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
