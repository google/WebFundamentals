project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:查找和修正混合内容是一项重要任务，但可能非常耗时。本指南将介绍可为此过程提供帮助的一些工具。

{# wf_published_on:2015-09-28 #}
{# wf_updated_on:2016-08-24 #}

# 防止混合内容 {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

成功：让您的网站支持 HTTPS 是保护您的网站和用户免受攻击的重要一步，但混合内容会使这种保护失效。为保护您的网站和用户，查找和修正混合内容非常重要。

查找和修正混合内容是一项重要任务，但可能非常耗时。本指南将介绍可为此过程提供帮助的一些工具和技术。如需了解混合内容本身的更多信息，请参阅[什么是混合内容](./what-is-mixed-content)。

### TL;DR {: .hide-from-toc }

* 在您的页面上加载资源时，请始终使用 https:// 网址。
* 使用 `Content-Security-Policy-Report-Only` 标头监控网站上的混合内容错误。
* 使用 `upgrade-insecure-requests` CSP 指令防止访问者访问不安全的内容。

## 查找和修正混合内容 

手动查找混合内容可能很耗时，具体取决于存在的问题数量。本文档中介绍的流程使用 Chrome 浏览器；但是大多数现代浏览器都提供相似的工具来帮助您处理此过程。

### 通过访问网站查找混合内容

在 Google Chrome 中访问 HTTPS 网页时，浏览器会在 JavaScript 控制台中以错误和警告的形式提醒您存在混合内容。


如需查看这些提醒，请转到我们的被动混合内容或主动混合内容示例页面，并打开 Chrome JavaScript 控制台。您可以从“View”菜单（View -&gt; Developer -&gt; JavaScript Console）打开此控制台或通过右键点击此页面，选择“Inspect Element”，然后选择“Console”打开。

[什么是混合内容](what-is-mixed-content#passive-mixed-content){: .external}页面中的[被动混合内容示例](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external}将导致系统显示混合内容警告，如下所示：

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="混合内容：页面已通过 HTTPS 加载，但请求了不安全的视频。此内容也应通过 HTTPS 提供。">
</figure>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

主动混合内容示例将导致系统显示混合内容错误：


<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="混合内容：页面已通过 HTTPS 加载，但请求了不安全的资源。此请求已被阻止，内容必须通过 HTTPS 提供。">
</figure>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


您需要在网站的源代码中修正这些错误和警告中列出的 http:// 网址。列出这些网址及其所在页面有助于您稍后修正它们。 

注：系统仅针对您当前正在查看的页面显示混合内容错误和警告，在每次您导航到一个新页面时将清理 JavaScript 控制台。这意味着您必须单独查看网站的每一个页面来查找这些错误。有些错误可能仅在您与页面的一部分进行交互后才出现，请参考我们之前的指南中提供的图像库混合内容示例。

### 在源代码中查找混合内容

您可以在源代码中直接搜索混合内容。在源代码中搜索 `http://` 并查找包含 HTTP 网址属性的标记。

具体而言，您要查找之前指南中的[混合内容类型与相关安全威胁](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external}部分列出的标记。
请注意，在定位标记 (`<a>`) 的 href 属性中有 `http://` 通常不属于混合内容问题，后面会介绍一些值得注意的例外情况。
 

如果您有一个来自 Chrome 混合内容错误和警告的 HTTP 网址列表，您也可以在源代码中搜索这些完整的网址，以找出它们在网站中的位置。

 

### 修正混合内容

在找出混合内容在网站源代码中的位置后，按照下面的步骤进行修正。


将 Chrome 中的以下混合内容错误用作示例：

<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合内容：页面已通过 HTTPS 加载，但请求了不安全的图像。此内容也应通过 HTTPS 提供。">
</figure>

下面是您在源代码中找到的内容：
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### 第 1 步

通过在您的浏览器中打开一个新标签，在地址栏中输入网址，然后将 `http://` 更改为 `https://`，检查该网址是否可通过 HTTPS 提供。


如果通过 **HTTP** 和 **HTTPS** 显示的资源相同，则一切正常。
继续执行[第 2 步](#step-2)。

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      HTTP 图像加载没有任何错误。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      HTTPS 图像加载没有任何错误，且图像与 HTTP 加载的相同。转到<a href="#step-2">第 2 步</a>！
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

如果您看到证书警告，或内容无法通过 **HTTPS** 显示，则意味着无法安全地获取资源。


<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      资源无法通过 HTTPS 获取。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      尝试通过 HTTPS 查看资源时系统发出的证书警告。
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

在此情况下，您应考虑以下某个方案：

* 从一个不同的主机添加资源（如可用）。
* 如果法律允许，请在您的网站上直接下载和托管内容。
* 将此资源从您的网站完全排除。

#### 第 2 步

将网址从 `http://` 更改为 `https://`，保存源文件，并在必要时重新部署更新文件。

#### 第 3 步

查看您最初发现错误的页面，验证并确保该错误不再出现。

### 请注意非标准标记的使用

请注意您网站上非标准标记的使用。例如，定位 (`<a>`) 标记网址自身不会产生混合内容，因为它们使浏览器导航到新页面。
这意味着它们通常不需要修正。然而，有些图像库脚本替换了 `<a>` 标记的功能，并将 `href` 属性指定的 HTTP 资源加载到页面上的灯箱展示，从而引发混合内容问题。


 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

在上面的代码中，将 `<a>` 标记 href 保留为 `http://` 可能看上去是安全的；但是，如果您查看示例并点击图像，您会发现其加载一个混合内容资源并在页面上显示它。

 

## 处理大批量的混合内容

上面的手动步骤在较小网站上的效果很好，但对于大网站，或具有许多独立开发团队的网站而言，它很难跟踪记录所有加载的内容。为帮助处理此任务，您可以使用内容安全政策指示浏览器就混合内容通知您，并确保您的页面绝不会意外加载不安全的资源。



### 内容安全政策

[**内容安全政策**](/web/fundamentals/security/csp/) (CSP) 是一个多用途浏览器功能，您可以用它管理大批量的混合内容。CSP 报告机制可用于跟踪网站上的混合内容；强制政策可通过升级或阻止混合内容保护用户。



您可以通过在服务器发送的响应中添加 `Content-Security-Policy` 或 `Content-Security-Policy-Report-Only` 标头为页面启用这些功能。此外，在页面的 `<head>` 部分中，可以使用一个 `<meta>` 标记设置 `Content-Security-Policy`（**而非** `Content-Security-Policy-Report-Only`）。请参阅下文中的示例。

除了用于混合内容外，CSP 还有许多其他用途。可在以下资源中找到有关其他 CSP 指令的信息：

* [Mozilla 的 CSP 简介](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [HTML5 Rock 的 CSP 简介](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP playground](http://www.cspplayground.com/){: .external }
* [CSP 规范](//www.w3.org/TR/CSP/){: .external }

注：浏览器强制执行它们收到的<b>所有</b>内容安全政策。浏览器在响应标头或 <code>&lt;meta&gt;</code> 元素中收到的多个 CSP 标头值被合并，强制作为一个政策；报告政策也以同样的方式进行合并。通过采用政策的交集合并政策；也就是说，第一个政策之后的每个政策都只能进一步限制允许的内容，而不是扩宽它。



### 使用内容安全政策查找混合内容 

您可以使用内容安全政策收集网站上的混合内容报告。
如需启用此功能，请设置 `Content-Security-Policy-Report-Only` 指令，方法是将其添加为网站的响应标头。
 

响应标头：  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


无论用户在何时访问网站上的页面，他们的浏览器都会向 `https://example.com/reportingEndpoint` 发送有关任何违背内容安全政策的内容的 JSON 格式报告。

在此情况下，任何时候通过 HTTP 加载子资源，浏览器都会发送报告。
这些报告包括发生政策违规行为的页面网址和违背该政策的子资源网址。如果您配置报告端点以记录这些报告，您可以跟踪您网站上的混合内容，无需亲自访问每个页面。

 

对此，需要注意两个方面：

* 用户必须在可识别 CSP 标头的浏览器中访问您的页面。
  这对于大多数现代浏览器都适用。
* 您只能获得用户已访问的页面的报告。因此，如果您有流量不太大的页面，则这些页面的报告可在您获得整个网站的报告之前获得。



如需了解 CSP 标头格式的详细信息，请参阅[内容安全政策规范](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}。 

如果您不想亲自配置报告端点，[https://report-uri.io/](https://report-uri.io/){: .external} 是一个合理的替代做法。



### 升级不安全的请求

对于自动修正混合内容，其中一个最新最好的工具是 [**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external} CSP 指令。该指令指示浏览器在进行网络请求之前升级不安全的网址。


例如，如果某个页面包含一个带有 HTTP 网址的图像标记：

 
    <img src="http://example.com/image.jpg"> 


此浏览器改而对 <code><b>https:</b>//example.com/image.jpg</code> 进行安全请求，从而使用户不会看到混合内容。



您可以通过发送一个带此指令的 `Content-Security-Policy` 标头启用此功能：



    Content-Security-Policy: upgrade-insecure-requests  


或使用一个 `<meta>` 元素在文档的 `<head>` 部分中嵌入相同的指令内联：


  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


值得注意的是，如果资源不能通过 HTTPS 获得，则升级的请求失败，并且无法加载该资源。
这可保证您的页面的安全性。
 

`upgrade-insecure-requests` 指令级联到 `<iframe>` 文档中，从而确保整个页面受到保护。


### 阻止所有混合内容

并非所有浏览器均支持 upgrade-insecure-requests 指令，因此，可使用替代指令 [**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external} CSP 指令来保护用户。此指令指示浏览器从不加载混合内容；所有混合内容资源请求均被阻止，包括主动混合内容和被动混合内容。此选项还级联到 `<iframe>` 文档中，确保整个页面没有混合内容。


页面可以选择执行此行为，方法是发送一个带有该指令的 `Content-Security-Policy` 标头：


  
    Content-Security-Policy: block-all-mixed-content  


或使用一个 `<meta>` 元素在文档的 `<head>` 部分中嵌入相同的指令内联：


  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


使用 `block-all-mixed-content` 的弊端可能很明显，即所有混合内容均被阻止。
这可提升安全性，但它意味着页面上不再提供这些资源。
这可能会中断用户期望获得的功能和内容。
 

### CSP 替代方案

如果您的网站由某个平台（如 Blogger）代为托管，那么，您可能没有相应权限来修改标头和添加 CSP。一个可行的替代方案是使用 [HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 或[混合内容扫描](https://github.com/bramus/mixed-content-scan){: .external } 等网站抓取工具代您查找您的网站中的问题。








{# wf_devsite_translation #}
