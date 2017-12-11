project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:内容安全政策可显著降低现代浏览器中跨网站脚本攻击的风险和影响。

{# wf_published_on:2012-06-15 #}
{# wf_updated_on:2016-02-19 #}

# 内容安全政策 {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

网站的安全模式源于[同源政策](//en.wikipedia.org/wiki/Same-origin_policy){: .external}。
来自 `https://mybank.com` 的代码应仅能访问 `https://mybank.com` 的数据，而绝不被允许访问 `https://evil.example.com`。每个源均与其余网络保持隔离，从而为开发者提供一个可进行构建和操作的安全沙盒。在理论上，这非常棒。而在实践中，攻击者已找到聪明的方式来破坏系统。


例如，[跨网站脚本 (XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external}攻击可通过欺骗网站提供恶意代码和计划好的内容来绕过同源政策。这是个大问题，因为浏览器将网页上显示的所有代码视为该网页安全源的合法部分。[XSS 备忘单](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external}是一种旧的但具有代表性的跨会话方法，攻击者可通过该方法注入恶意代码来违背信任。
如果攻击者成功地注入任意代码，则系统很可能受到了攻击：用户会话数据泄露，应保密的信息被透露给坏人。很显然，可能的话，我们想阻止这种情况发生。


本概览重点介绍一个可显著降低现代浏览器中 XSS 攻击的风险和影响的防护功能：
内容安全性政策 (CSP)。

### TL;DR {: .hide-from-toc }
* 使用白名单告诉客户端允许加载和不允许加载的内容。
* 了解可使用哪些指令。
* 了解这些指令接受哪些关键字。
* 内联代码和 `eval()` 被视为是有害的。
* 向服务器举报政策违规行为，以免执行这些行为。


## 来源白名单 


浏览器无法区分哪些脚本是应用的一部分，哪些是第三方恶意注入的，因此，XSS 攻击会利用这个漏洞。例如，在本页面来源的上下文中，页面底部的 Google +1 按钮会加载和执行来自 `https://apis.google.com/js/plusone.js` 的代码。我们信任该代码，但我们不能期望浏览器本身可以明白来自 `apis.google.com` 的代码是好的，而来自 `apis.evil.example.com` 的代码很可能不好。浏览器欣然地下载并执行页面请求的任意代码，而不会考虑其来源。


CSP 定义 `Content-Security-Policy` HTTP 标头，其允许您创建信任的内容的来源白名单，并指示浏览器仅执行或渲染来自这些来源的资源，而不要盲目地信任服务器提供的所有内容。即使攻击者能够发现可从中注入脚本的漏洞，由于此脚本也不符合此白名单，因此，也不会执行该脚本。



由于我们信任 `apis.google.com` 传输有效代码，并且我们信任我们自己也能做到，因此，我们可以定义一个政策，该政策仅允许执行来自以下两个来源之一的脚本：



    Content-Security-Policy: script-src 'self' https://apis.google.com

很简单，对不对？您可能已猜到，`script-src` 是一条指令，其用于控制脚本对于某个特定页面所享有的一组权限。
我们已指定 `'self'` 作为一个有效的脚本来源，指定 `https://apis.google.com` 作为另一个有效的脚本来源。浏览器通过 HTTPS 以及当前页面的来源从 `apis.google.com` 尽职地下载和执行 JavaScript。


<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="控制台错误：拒绝加载脚本“http://evil.example.com/evil.js”，因为它违反了以下内容安全政策指令：script-src 'self' https://apis.google.com">
  </figure>
</div>

定义此政策后，浏览器只会引发一个错误，而不会加载来自任何其他来源的脚本。
当狡猾的攻击者设法将代码注入您的网站时，他们只会看到一条错误消息，而不是他们期待的成功。



### 政策适用于各种各样的资源

尽管脚本资源是最显而易见的安全风险，但 CSP 提供了一个丰富的政策指令集，让您可以对允许页面加载的资源进行相当精细的控制。您已了解 `script-src`，因此，这个概念应该很清晰了。
我们快速地看一下其余资源指令：

* **`base-uri`** 用于限制可在页面的 `<base>` 元素中显示的网址。
* **`child-src`** 用于列出适用于工作线程和嵌入的帧内容的网址。例如：`child-src https://youtube.com` 将启用来自 YouTube（而非其他来源）的嵌入视频。
使用此指令替代已弃用的 **`frame-src`** 指令。
* **`connect-src`** 用于限制可（通过 XHR、WebSockets 和 EventSource）连接的来源。
* **`font-src`** 用于指定可提供网页字体的来源。Google 的网页字体可通过 `font-src https://themes.googleusercontent.com` 启用。
* **`form-action`** 用于列出可从 `<form>` 标记提交的有效端点。
* **`frame-ancestors`** 用于指定可嵌入当前页面的来源。此指令适用于 `<frame>`、`<iframe>`、`<embed>` 和 `<applet>` 标记。此指令不能在 `<meta>` 标记中使用，并仅适用于非 HTML 资源。
* **`frame-src`** 已弃用。请改用 **`child-src`**。
* **`img-src`** 用于定义可从中加载图像的来源。
* **`media-src`** 用于限制允许传输视频和音频的来源。
* **`object-src`** 可对 Flash 和其他插件进行控制。
* **`plugin-types`** 用于限制页面可以调用的插件种类。
* **`report-uri`** 用于指定在违反内容安全政策时浏览器向其发送报告的网址。此指令不能用于 `<meta>` 标记。
* **`style-src`** 是 `script-src` 版的样式表。
* **`upgrade-insecure-requests`** 指示 User Agent 将 HTTP 更改为 HTTPS，重写网址架构。
该指令适用于具有大量旧网址（需要重写）的网站。


默认情况下，这些指令的适用范围很广。如果您不为某条指令（例如，`font-src`）设置具体的政策，则默认情况下，该指令在运行时假定您指定 `*` 作为有效来源（例如，您可以从任意位置加载字体，没有任何限制）。




您可以通过指定一个 **`default-src`** 指令替换此默认行为。
此指令用于定义您未指定的大多数指令的默认值。
一般情况下，这适用于以 `-src` 结尾的任意指令。
如果将 `default-src` 设为 `https://example.com`，并且您未能指定一个 `font-src` 指令，那么，您可以从 `https://example.com` 加载字体，而不能从任何其他地方加载。在我们前面的示例中，我们仅指定了 `script-src`，其表示可以从任意来源加载图像、字体等。



以下指令不使用 `default-src` 作为回退指令。请记住，如果不对其进行设置，则等同于允许加载任何内容。


* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

您可以针对您的特定应用使用任意数量的上述指令，只需在 HTTP 标头中列出每条指令，并使用分号将它们隔开。

请确保在一条指令中列出所需的特定类型的全部资源。
如果您编写类似 `script-src https://host1.com; script-src https://host2.com` 的指令，则第二条指令将被忽略。如下指令可正确地将这两个来源指定为有效来源：


    script-src https://host1.com https://host2.com

例如，如果您有一个从内容交付网络（例如，`https://cdn.example.net`）加载所有资源的应用，并清楚您不需要任何帧内容或插件，则您的政策可能类似如下：




    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### 实现详情

在网络上的各种教程中您会看到 `X-WebKit-CSP` 和 `X-Content-Security-Policy` 标头。
今后，您应忽略这些带前缀的标头。
现代浏览器（IE 除外）均支持不带前缀的 `Content-Security-Policy` 标头。
您应该使用此类标头。

无论您使用何种标头，都要逐页定义政策：在发送 HTTP 标头的同时您还需要连带发送您希望确保予以保护的每个响应。这样非常灵活，因为您可以根据特定页面的需求调整针对该页面的政策。
也许您的网站中的某一组页面具有 +1 按钮，而其他页面则没有：您可以仅在必要时允许加载此按钮代码。



每条指令中的来源列表都是灵活的。您可以按架构（`data:`、`https:`）指定来源，也可按各种具体条件指定来源范围，这些条件从仅限定主机名（`example.com`，即匹配该主机上的任意来源：任意架构、任意端口）到完全限定 URI（`https://example.com:443`，仅匹配 HTTPS、仅匹配 `example.com` 和仅匹配端口 443），不一而足。接受使用通配符，但通配符仅可用作架构、端口，或者仅可位于主机名的最左侧：`*://*.example.com:*` 将与 `example.com` 使用任何架构、位于任何端口上的所有子域名（但 `example.com` 本身除外）匹配。




此来源列表还接受四个关键字：

* 如您所料，**`'none'`** 不执行任何匹配。
* **`'self'`** 与当前来源（而不是其子域）匹配。
* **`'unsafe-inline'`** 允许使用内联 JavaScript 和 CSS。（我们稍后将对此进行详细介绍。）
* **`'unsafe-eval'`** 允许使用类似 `eval` 的 text-to-JavaScript 机制。（我们也会介绍这个关键字。）


上述关键字需要使用单引号。例如，`script-src 'self'`（带引号）可授权执行来自当前主机的 JavaScript；`script-src self`（无引号）可启用来自名为“`self`”的服务器（而不是来自当前主机）的 JavaScript，而这可能并非您的本意。




### 沙盒

还有一条指令值得探讨：`sandbox`。该指令与我们看到的其他指令有些不同，因为它限制的是页面可进行的操作，而不是页面可加载的资源。如果 `sandbox` 指令存在，则将此页面视为使用 `sandbox` 属性在 `<iframe>` 的内部加载的。这可能会对该页面产生广泛的影响：强制该页面进入一个唯一的来源，同时阻止表单提交等其他操作。上述内容有点超出本文的范畴，但您可以在 [HTML5 规范中的“沙盒”部分](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.{: .external} 中找到关于有效的沙盒属性的完整详细信息。



### 元标记

CSP 首选的传输机制是一个 HTTP 标头。不过，在标记中直接设置一个页面政策会非常有用。
使用一个 `http-equiv` 属性通过 `<meta>` 标记进行此设置：



    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


该政策不能用于 frame-ancestors、report-uri 或 sandbox。

## 内联代码被视为是有害的。

很明显，CSP 基于白名单来源，因为此方法可明确指示浏览器将特定的资源集视为可接受的资源，并拒绝其余资源。不过，基于来源的白名单无法解决 XSS 攻击带来的最大威胁：内联脚本注入。如果攻击者可以注入一个 script 标记，在标记中直接包含一些恶意的负载 (<code>&lt;script&gt;sendMyDataToEvilDotCom();&lt;/script&gt;</code>)，则浏览器将无法将它与合法内联脚本标记区分开来。CSP 可通过完全禁止内联脚本来解决此问题：这是唯一确定有效的方式。



此禁止规则不仅包括在 `script` 标记中直接嵌入的脚本，也包括内联事件处理程序和 `javascript:` 网址。
您需要将 `script` 标记的内容移入外部文件，并使用相应的 `addEventListener()` 调用替换 `javascript:` 网址和 `<a ...
onclick="[JAVASCRIPT]">`。
例如，您可以将以下内容



    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


重写为下面这样：

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


除了能够更好地配合 CSP 外，重写的代码还具有许多优势；无论您是否使用 CSP，这都是最佳做法。
内联 JavaScript 混合结构和行为的方式正是您不应采用的方式。使用外部资源，浏览器更容易缓存，开发者也更容易理解，并有助于编译和压缩。如果您将代码移入外部资源，那么您可以编写更好的代码。


以相同方式处理内联样式：`style` 属性和 `style` 标记都应合并到外部样式表，以防范可通过 CSS 实现的各种[极其狡猾的](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external} 数据渗漏方法。




如果您必须具有内联脚本和样式，您可以启用它，只需在 `script-src` 或 `style-
src` 指令中添加一个 `'unsafe-inline'` 作为允许的来源。
您也可以使用一个随机数或哈希值（见下文），但您真不应这么做。禁止内联脚本是 CSP 提供的最大安全性优势，禁止内联样式同样可以提高应用的安全性。
要确保在移除所有不符规范的代码之后能够正常运行，需要预先做一些工作，但这是值得采取的折衷做法。



### 如果您一定要使用它 ...

CSP Level 2 可为内联脚本提供向后兼容性，即允许您使用一个加密随机数（数字仅使用一次）或一个哈希值将特定内联脚本列入白名单。尽管这可能很麻烦，但它在紧急情况下很有用。


要使用随机数，请为您的 script 标记提供一个随机数属性。该值必须与信任的来源列表中的某个值匹配。
例如：


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


现在，将随机数添加到已追加到 `nonce-` 关键字的 `script-src` 指令。

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

请记住，必须为每个页面请求重新生成随机数，并且随机数必须是不可猜测的。


哈希值的工作方式与此大致相同。创建脚本自身的 SHA 哈希值并将其添加到 `script-src` 指令，而不是为 script 标记添加代码。例如，假设您的页面包含以下内容：




    <script>alert('Hello, world.');</script>


您的政策将包含以下内容：

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

以下是几点注意事项。`sha*-` 前缀指定生成此哈希值的算法。
上面的示例中便运用了 sha256-。CSP 同样支持 sha384- 和 sha512-。
生成此哈希值时不包含 `<script>` 标记。
大写字母和空格也同样重要，包括前导空格或结尾空格。


使用 Google 搜索如何生成 SHA 哈希值，将会返回任何语言的解决方法。
使用 Chrome 40 或更高版本，您可以打开 DevTools，然后重新加载您的页面。
Console 标签将包含错误消息，提供每个内联脚本的正确的 sha256 哈希值。


## Eval 同样有害

即使攻击者无法直接注入脚本，他们也会欺骗您的应用将不活动文本转换为可执行的 JavaScript，并代表他们执行它。 <code>eval()</code>、<code>new
Function()</code>、 <code>setTimeout([string], ...)</code> 和 <code>setInterval([string], ...)</code> 都是矢量，通过它们注入文本最终会导致执行一些意外的恶意行为。CSP 对于此风险的默认响应是完全阻止所有这些矢量。



这对您构建应用的方式有不小的影响。

*   您必须通过内置 `JSON.parse` 解析 JSON，而不是依靠 `eval` 来解析。
原生 JSON 操作在 [IE8 及以上版本的每个浏览器](http://caniuse.com/#feat=json){: .external} 中均可用，并且十分安全。
*   使用内联函数（而不是字符串）重写您当前正在进行的任何 `setTimeout` 或 `setInterval` 调用。
例如：

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


最好重写为


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   在运行时避免使用内联模板：为在运行时加快模板生成的速度，许多模板库大量使用 `new
    Function()`。这是一个高效的动态编程应用，但在评估恶意文本时存在风险。某些框架可立即支持 CSP，在缺少 `eval` 时回退到可靠的解析器。[AngularJS 的 ng-csp 指令](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external} 就是一个很好的例子。



不过，最好选择可提供预编译（例如，[Handlebars 就可以](http://handlebarsjs.com/precompilation.html){: .external}）的模板语言。预编译您的模板能够让用户体验到甚至比最快的运行时实现还要快的速度，并且也更加安全。
如果 eval 及其 text-to-JavaScript 兄弟指令对您的应用非常重要，您可以通过在 `script-src` 指令中添加一个 `'unsafe-eval'` 作为允许的来源来启用它们，但我们很不赞成这么做。禁止执行字符串让攻击者更难以在您的网站上执行未授权的代码。



## 报告 


CSP 能够阻止不受信任的资源客户端，这对于您的用户来说是一个巨大的优势，而若能够向服务器返回某种通知以便您可以在第一时间发现和制止允许恶意注入的错误，更是很有帮助。因此，您可以指示浏览器将 JSON 格式的违规行为报告  <code>POST</code> 到在  <code>report-uri</code> 指令中指定的位置。




    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

这些报告将类似如下：


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



此报告包含很多信息，可帮助您跟踪违规行为的具体原因，包括发生违规行为的页面 (`document-uri`)、该页面的引用站点（注意，与 HTTP 标头字段不同，此键值不存在拼写错误）、违反页面政策 (`blocked-uri`) 的资源、其违反的具体指令 (`violated-directive`) 以及页面的完整政策 (`original-policy`)。






### 仅报告

如果您是刚刚开始使用 CSP，那么，在向您的用户部署严格的政策前，先评估您的应用的当前状态很重要。作为完整部署的敲门砖，您可以要求浏览器监控某个政策，报告违规行为，但不强制执行限制。发送 `Content-Security-Policy-Report-Only` 标头，而不是 `Content-Security-Policy` 标头。



    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

在仅报告模式中指定的政策不会阻止限制的资源，但会向您指定的位置发送违规行为报告。
您甚至可以发送两个标头，在强制执行一个政策的同时监控另一个政策。
此方式可有效评估更改应用的 CSP 产生的影响：针对新政策启用报告，监控违规行为报告，并修复出现的所有错误；如果您对其效果满意，可开始强制执行新政策。






## 真实用例 

CSP 1 在 Chrome、Safari 和 Firefox 中非常实用，但在 IE 10 中仅得到非常有限的支持。
您可以<a href="http://caniuse.com/#feat=contentsecuritypolicy">
在 canisue.com 上查看具体信息</a>。CSP Level 2 在 Chrome 40 及更高版本中可用。
Twitter 和 Facebook 等大量网站已部署此标头（<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">Twitter 的案例研究</a>值得一读），并为您开始在自己的网站上进行部署制定了相应标准。




为您的应用制定政策的第一步是评估您实际加载的资源。
一旦您已了解在您的应用中整合内容的方式，则可以基于这些要求设置一个政策。我们来看几个常见用例，并确定我们如何在 CSP 的保护范围内为它们提供最好的支持。


### 用例 #1：社交媒体小部件

* Google 的 [+1 按钮](/+/web/+1button/){: .external} 包括一个来自 `https://apis.google.com` 的脚本，并从 `https://plusone.google.com` 嵌入一个 `<iframe>`。为嵌入此按钮，您需要一个同时包含这两个来源的政策。
一个最低限度的政策应该是`script-src
https://apis.google.com; child-src https://plusone.google.com`。您也需要确保将 Google 提供的 JavaScript 代码段提取到一个外部 JavaScript 文件中。如果您有一个使用 `child-src` 的现有政策，您需要将其更改为 `child-src`。
* Facebook 的 [Like 按钮](//developers.facebook.com/docs/plugins/like-button){: .external }

具有许多实现选项。我们建议坚持使用 `<iframe>` 版本，因为它已安全地放入沙盒，与网站的其余部分隔离开来。
为了正常运行，它需要一个 `child-src https://facebook.com` 指令。
请注意，默认情况下，Facebook 提供的 `<iframe>` 代码加载一个相对网址 `//facebook.com`。对该网址进行更改以明确指定 HTTPS：`https://facebook.com`。
除非迫不得已，否则没有理由使用 HTTP。

* Twitter 的 [Tweet 按钮](https://publish.twitter.com/#)信任对脚本和帧的访问，这两者均在 `https://platform.twitter.com` 上进行托管。（默认情况下，Twitter 同样提供一个相对网址；在本地复制/粘贴此代码时，编辑该代码以指定 HTTPS。）您可通过 `script-src https://platform.twitter.com; child-src
https://platform.twitter.com` 搞定，只要您将 Twitter 提供的 JavaScript 代码段移入外部 JavaScript 文件。
* 其他平台具有相似需求，可通过类似的方式解决。
我们建议只设置一个值为 `'none'` 的 `default-src` ，并观察您的控制台以确定您需要哪些资源才能使小部件正常运行。


添加多个小部件非常简单：只需将政策指令合并，请记得将同一类型的所有资源合并到一条指令中。如果所有三个社交媒体小部件您都需要，则此政策应类似如下：


    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### 用例 #2：锁定

让我们假设一下，您在运行一个银行网站，并希望确保只能加载您自己写入的资源。
在此情形下，首先设置一个阻止所有内容的默认政策 (`default-src
'none'`)，然后在此基础上逐步构建。


假设此银行网站在 `https://cdn.mybank.net` 上加载所有来自 CDN 的图像、样式和脚本，并通过 XHR 连接到 `https://api.mybank.com/` 以抽取各种数据。可使用帧，但仅用于网站的本地页面（无第三方来源）。
网站上没有 Flash，也没有字体和 Extra。
我们能够发送的最严格的 CSP 标头为：

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### 用例 #3：仅 SSL

一个婚戒论坛管理员想要确保所有资源仅通过安全渠道加载，但不会真正编写很多代码；他没有能力仅仅依靠内联脚本和样式来重写第三方论坛软件的大量代码。以下政策将非常有效：


    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

即使在 `default-src` 中指定了 `https:`，此脚本和样式指令不会自动继承该来源。
每条指令均会完全覆盖该特定资源类型的默认值。


## 展望未来


内容安全政策级别 2 是一个<a href="http://www.w3.org/TR/CSP2/">
候选建议</a>。W3C 的 Web 应用安全工作组已开始着手此规范的下次更新，[内容安全政策级别 3](https://www.w3.org/TR/CSP3/){: .external }。

 


如果您对这些即将发布的功能介绍感兴趣，[请查看 public-webappsec@ 邮件列表存档](http://lists.w3.org/Archives/Public/public-webappsec/)，或亲自加入探讨。




{# wf_devsite_translation #}
