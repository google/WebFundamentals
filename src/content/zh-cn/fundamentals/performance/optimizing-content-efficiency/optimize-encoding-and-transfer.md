project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:除了避免不必要的资源下载，在提高网页加载速度上我们可以采取的最有效措施就是，通过优化和压缩其余资源来最大限度减小总下载大小。

{# wf_updated_on:2016-08-26 #}
{# wf_published_on:2014-03-31 #}

# 优化基于文本的资产的编码和传送大小 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

除了避免不必要的资源下载，在提高网页加载速度上您可以采取的最有效措施就是，通过优化和压缩其余资源来最大限度减小总下载大小。


## 数据压缩基础知识

在您消除了任何不必要的资源之后，下一步就是对浏览器需要下载的其余资源进行压缩。根据资源类型（文本、图像、字体等），有若干不同的技术可供您驱使：可在服务器上启用的通用工具、适用于特定内容类型的预处理优化以及需要开发者输入的资源特定优化。

实现最佳性能需要组合使用上述所有技术。

### TL;DR {: .hide-from-toc }
* 压缩就是使用更少的位对信息进行编码的过程。
* 消除不必要的数据总是会产生最好的结果。
* 有许多种不同的压缩技术和算法。
* 您需要利用各种技术来实现最佳压缩。


减小数据大小的过程称为*数据压缩*。许多人终其一生致力于算法、技术和优化研究，以期提高各种压缩程序的压缩比率、速度和内存要求。对数据压缩进行详细讨论超出了本主题的范围。但是，概要了解压缩的工作原理以及在减小网页所需各类资产大小方面可供我们利用的技术，仍具有重要意义。

为说明这些技术的核心原理，我们看看如何优化一种简单的短信格式（不过是我们专为此示例编造的格式）：

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date:08/25/16
    AAAZZBBBBEEEMMM EEETTTAAA

1. 短信可能包含任意注释，通过“#”前缀表示。注释不影响短信的含义或任何其他行为。
2. 短信可能包含键-值对形式并显示在短信开头的“标头”（以“:”分隔）。
3. 短信带有文本负载。

您有什么办法可以减小上面这条 200 个字符长短信的大小呢？

1. 注释是很有意思，但它实际上并不影响短信的含义，因此您可以在传送短信时将它去掉。
2. 或许您可以利用某些智能技术对标头进行高效编码。例如，如果您知道所有短信都包含“format”和“date”，您就可以将它们转换成短整型 ID 并只发送这些 ID。不过，情况可能不是这样，因此您可以暂且不去管它。
3. 负载是纯文本，尽管我们不知道其实际内容（显然，它使用的是一种“secret-message”），但只需看一看文本内容，就会发现其中存在大量多余内容。或许，您可以不发送重复的字母，而是直接对重复的字母计数，再对它们进行更高效的编码。例如，将“AAA”编码成“3A”，表示三个 A 的序列。


组合使用这些技术可以实现下面的结果：

    format: secret-cipher
    date: 08/25/16
    3A2Z4B3E3M 3E3T3A

新短信的长度为 56 个字符，这意味着您已将原有短信压缩了 72%，令人吃惊。

好是好，但这对优化网页有什么帮助吗？我们不会尝试发明自己的压缩算法，但正如您将会看到的那样，我们在优化网页上的各种资源时，将会采用完全相同的技术和思维方式：预处理、环境特定优化以及为不同的内容采用不同的算法。


## 源码压缩：预处理和环境特定优化

### TL;DR {: .hide-from-toc }
- 内容特定优化可显著减小所提供资源的大小。
- 内容特定优化在内部版本/发行版本周期内应用的效果最好。


压缩冗余或不必要数据的最佳方法是将其全部消除。我们不能只是删除任意数据，但在某些环境中，我们可能对数据格式及其属性有内容特定了解，往往可以在不影响其实际含义的情况下显著减小负载的大小。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

以上面这个简单 HTML 网页及其包含的三个不同内容类型为例：HTML 标记、CSS 样式和 JavaScript。其中的每一个内容类型针对构成有效内容的元素都具有不同的规则，在注释指示等方面也具有不同的规则。我们如何才能减小这个网页的大小呢？

* 代码注释是开发者最好的朋友，但浏览器不需要看到它们！直接删除 CSS (`/* … */`)、HTML (`<!-- … -->`) 和 JavaScript (`// …`) 注释可显著减小网页的总大小。
* “智能”CSS 压缩程序会注意到采用低效率的方式为“.awesome-container”定义规则，它会将两个声明折叠为一个而不影响任何其他样式，从而节省更多字节。
* 空白（空格和制表符）能够在 HTML、CSS 和 JavaScript 中给开发者提供方便。可以增加一个压缩程序来去掉所有制表符和空格。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

执行以上步骤后，可将网页字符数从 406 缩减到 150，缩减率高达 63%。不得不承认，其可读性不太好，但其实也不必具有多好的可读性：您可以保留原始网页作为“开发版本”，然后在您准备好在网站上发布网页时再执行以上步骤。

退一步讲，上例说明了一个要点：通用压缩程序（例如设计用于压缩任意文本的压缩程序）在压缩以上网页时可能同样可以取得相当不错的效果，但永远别指望它能去除注释、折叠 CSS 规则或者进行大量的其他内容特定优化。正因如此，预处理/源码压缩/环境感知优化才会成为功能如此强大的工具。

注：举个有说服力的例子，JQuery 内容库未压缩开发版本的大小现已接近大约 300KB。而压缩（移除注解等内容）后同一内容库的大小仅为原来的大约 1/3：大约 100KB。

同理，可以将以上技术运用到基于文本的资产以外的其他领域。图像、视频以及其他内容类型都包含其自己的元数据形式和各种负载。例如，每当您使用相机拍摄照片时，照片通常也会嵌入大量额外的信息：相机设置、位置等等。视具体应用而定，这些数据可能很关键（例如照片分享网站），也可能毫无用处，因此您应该考虑将其删除是否值得。事实上，每一幅图像的这些元数据加起来可能多达数万字节。

简言之，作为优化资产效率的第一步，您需要建立一个不同内容类型的清单，并考虑可以进行哪些类型的内容特定优化来减小其大小。然后，在您确定具体的优化后，通过将其加入内部版本和发行版本流程来自动执行这些优化，以便确保优化一直有效。

## 通过 GZIP 压缩文本

### TL;DR {: .hide-from-toc }
- GZIP 对基于文本的资产的压缩效果最好：CSS、JavaScript 和 HTML。
- 所有现代浏览器都支持 GZIP 压缩，并且会自动请求该压缩。
- 您的服务器必须配置为启用 GZIP 压缩。
- 某些 CDN 需要特别注意以确保 GZIP 已启用。


[GZIP](https://en.wikipedia.org/wiki/Gzip) 是一种可以作用于任何字节流的通用压缩程序。它会在后台记忆一些之前看到的内容，并尝试以高效方式查找并替换重复的数据片段。（欲知详情，请参阅[浅显易懂的 GZIP 低阶说明](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s)。）但实际上，GZIP 对基于文本的内容的压缩效果最好，在压缩较大文件时往往可实现高达 70-90% 的压缩率，而如果对已经通过替代算法压缩过的资产（例如，大多数图片格式）运行 GZIP，则效果甚微，甚至毫无效果。

所有现代浏览器都支持并自动协商将 GZIP 压缩用于所有 HTTP 请求。您必须确保服务器得到正确配置，能够在客户端请求时提供压缩过的资源。


<table>
<thead>
  <tr>
    <th>内容库</th>
    <th>大小</th>
    <th>压缩后大小</th>
    <th>压缩比率</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

上表显示了 GZIP 压缩对几种最流行的 JavaScript 内容库和 CSS 框架可实现的压缩率。压缩率范围为 60% 至 88%，将文件压缩源码后（产生文件名中包含“.min”的文件），再使用 GZIP 进行压缩，可进一步提高压缩率。

1. **先应用内容特定优化：CSS、JS 和 HTML 压缩源码程序。**
1. **采用 GZIP 对压缩源码后的输出进行压缩。**

启用 GZIP 是实现起来最简单并且回报最高的优化之一，遗憾的是，仍有许多人不去实现它。大多数网络服务器都会代您完成压缩内容的工作，您只需要确认服务器进行了正确配置，能够对所有可受益于 GZIP 压缩的内容进行压缩。

HTML5 Boilerplate 项目包含所有最流行服务器的[配置文件样例](https://github.com/h5bp/server-configs)，其中为每个配置标志和设置都提供了详细的注解。要为您的服务器确定最佳配置，请执行以下操作： 
* 在列表中找到您喜爱的服务器。
* 查找 GZIP 部分。
* 确认您的服务器配置了推荐的设置。

<img src="images/transfer-vs-actual-size.png"  alt="DevTools 实际大小与传送大小演示">

可通过以下这种快速而又简单的方法了解 GZIP 的实用效果：打开 Chrome DevTools，然后检查“Network”面板中的“Size / Content”列：“Size”表示资产的传送大小，“Content”表示资产的未压缩大小。对于上例中的 HTML 资产，GZIP 在传送时节省了 98.8KB。

注：GZIP 有时会增加资产的大小。当资产非常小且 GZIP 字典的开销大于压缩缩减的大小时，或者资源已经得到充分压缩时，通常会发生这种情况。为了避免此问题，某些服务器允许您指定最小文件大小阈值。

最后，尽管大多数服务器会在向用户提供这些资产时自动对其进行压缩，但某些 CDN 需要特别注意和手动操作，以确保 GZIP 资产得到提供。务请审核您的网站并确保资产确实[得到压缩](http://www.whatsmyip.org/http-compression-test/)。


{# wf_devsite_translation #}
