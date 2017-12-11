project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在针对各类用户和设备进行构建时，要考虑内容以及布局和图形设计。

{# wf_updated_on: 2016-05-10 #}
{# wf_published_on: 2016-05-10 #}

# 多设备内容 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## 人们在网络上如何阅读

[美国政府写作指南](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html)总结了人们对网页写作的需求：

> 进行网页写作时，使用通俗易懂的语言有利于用户找到他们需要的内容、理解他们找到的内容，然后利用这些内容来满足自己的需求。>> 网页写作应可操作、可查找并且可分享。



研究显示，[人们不会阅读网页，他们只是浏览一下](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)。一般来说，[人们只阅读网页内容的 20–28%](https://www.nngroup.com/articles/how-little-do-users-read/)。从屏幕上阅读的速度比从纸上阅读的速度要慢。除非信息易于获取和理解，否则人们会放弃阅读并退出您的网站。

## 如何为移动设备撰写内容

关注手头的主题，表述应简明扼要。为撰写可在各种设备和视口上运行的内容，一开始就必须阐明重点：通常，理想的情况是[前四段大约 70 个字](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610)。

问问您自己人们想从您的网站获得什么。他们是否在尝试找到一些信息？如果人们访问您的网站是为了查找信息，请确保您的所有文本都旨在帮助他们实现其目标。写作时使用[主动语态](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice)，提供操作和解决方案。

只发布访问者需要的内容，仅此而已。

[英国政府调查](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)还表明：

> 80% 的人偏好使用浅显英语书写的句子，并且问题越复杂，这种偏好就越明显（例如，97% 的人在“among > other things”与拉丁文“inter alia”之间更偏好前者）。>> 人们的受教育程度越高，他们的知识就越专业，也 > 越倾向于使用简明的英文。






换句话说：应使用通俗易懂的语言、较短的词语和简单的句子结构，即使是针对有文化懂技术的受众。始终使用交谈式语气，除非有非常好的理由不这么做。新闻业的一个老规则是以像是在与一个聪明的 11 岁孩子交流的方式进行写作。

## 下一批十亿用户

这种最简明的写作方法对移动设备上的读者尤为重要，在针对具有小视口的低成本手机（需要更多滚动、显示屏质量较差且屏幕响应不太灵敏）创建内容时，采用这种方法尤为重要。

在将使用网络的下一批十亿用户中，大多数用户会使用廉价的设备。他们不想将自己的数据预算花在导航冗长的并且可能无法以其第一语言阅读的内容上。调整您的文本：使用较短的句子、最大程度减少标点的使用、每段不超过五行，且具有单行标题。考虑自适应文本（例如，针对较小的视口使用较短的标题）但也要[注意这样做的弊端](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/)。

使用极简的文字也让您的内容更易于本地化和国际化，并且您的内容被社交媒体用户引用的可能性更大。

最低要求：

* 保持内容简单
* 减少杂乱无章
* 直接切入重点


## 消除不必要的内容

就字节大小而言，网页[很大并且越来越大](http://httparchive.org/trends.php#bytesTotal&reqTotal)。

利用[自适应设计技巧](/web/fundamentals/design-and-ux/responsive/)，可以为多个较小视口提供不同的内容，但先精简文本、图像和其他内容始终是明智之举。

> 网络用户通常以行动为导向，在寻找他们当前问题的答案时“身体向前倾”而不是向后倾，以消化一本好书。>> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)



问问您自己：用户在访问我的网站时尝试获得什么？

每个页面组件是否可帮助用户实现他们的目标？

### 移除多余的页面元素

根据 [HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml)，对于普通的网页，HTML 文件构成近 70k 大小和九次以上的请求。

许多受欢迎的网站每个页面使用几千个 HTML 元素和几千行代码，即使在移动设备上也是如此。HTML 文件过大[可能不会减慢页面加载速度](http://jsbin.com/zofavunapo/1/edit?html,js,output)，但 HTML 负载沉重可能表示内容臃肿：.html 文件越大，意味着元素越多和/或文本内容越多。

降低 HTML 复杂性也将减少页面重量，帮助实现本地化和国际化，并使响应式设计更容易计划和调试。有关编写更多有效 HTML 的信息，请参阅[高性能 HTML](https://samdutton.wordpress.com/2015/04/02/high-performance-html/)。

> 在用户通过您的应用获得价值之前，让用户执行的每一个步骤都会让您失去 20% 的用户 >>— [Gabor Cselle，来自 Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)



这同样适用于内容：尽快帮助用户获得他们需要的内容。

不要只是向移动用户隐藏内容。以[内容对等](http://bradfrost.com/blog/mobile/content-parity/)为目标，因为对某人来说，猜测移动用户不会错过哪些功能注定会失败。如果您有资源，可针对不同的视口大小创建相同内容的备用版本，即使是仅针对高优先级页面元素。

考虑内容管理和工作流：旧版系统是否会导致内容老旧？

### 精简文本

随着网络走向移动化，您需要改变您撰写内容的方式。保持内容简单，减少杂乱无章并直接切入重点。

### 移除冗余图像

<div class="attempt-right">
<figure>
    <img src="imgs/http-archive-images.png" alt="HTTP Archive 数据显示图像传输大小和图像请求" />
    <figcaption>根据 <a href="http://httparchive.org/trends.php#bytesImg&reqImg">HTTP Archive 数据</a>，网页平均发送 54 次图像请求。</figcaption>
</figure>
</div>

图像很美观、有趣并且可以提供丰富的信息，但是它们也在使用页面空间，增加页面重量，并增加文件请求的数量。[当连接性变得糟糕时，延迟也变得更严重](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)，这意味着随着网络走向移动化，过多的图片文件请求成为日益严重的问题。


<div style="clear:both;"></div>

<div class="attempt-right">
<figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="HTTP Archive 饼图按内容类型显示平均每页面字节数，其中图像大约占 60%。">
    <figcaption>图像构成页面重量的 60% 以上。</figcaption>
</figure>
</div>

图像也会耗电。继屏幕之后，无线电成为第二大耗电项目。图像请求越多，无线电使用就越多，需要的电量也就越多。即使只呈现图像也会耗电，且与大小和数量成比例。请参阅 Stanford 报告[谁谋杀了我的电池？(Who Killed My Battery?)](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)

如果可以，请去除图像！

下面是一些建议：

* 考虑避免带图像的设计，或谨慎使用图像。[仅文本也可以很美观](https://onepagelove.com/tag/text-only)！问问您自己，“访问我的网站的用户尝试获得什么？图像对此过程有帮助吗？"
* 在过去，将标题和其他文本另存为图形的做法很普遍。该方法不能很好地响应视口大小变化，并且会增加页面重量和延迟时间。以图形方式使用文本还意味着文本不能被搜索引擎找到，且无法通过屏幕阅读器和其他辅助性技术访问。尽可能使用“真实”文本，网络字体和 CSS 可实现美观的字体。
* 使用 CSS 而非图像来设置渐变色、阴影、圆角和[背景纹理](http://lea.verou.me/css3patterns/){: .external }，[所有现代浏览器均支持](http://caniuse.com/#search=shadows)这些功能。但是，请谨记，CSS 可能是比图像更好，但仍存在[处理和渲染不利因素](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/)，特别是在移动设备上。
* 背景图片很少能够在移动设备上流畅运行。您可以[使用媒体查询](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/)来避免在小视口上使用背景图片。
* 避免启动画面图像。
* [使用 CSS 设置 UI 动画](/web/fundamentals/design-and-ux/animations/)。
* 了解您的字形；使用 [Unicode 符号和图标](https://en.wikipedia.org/wiki/List_of_Unicode_characters)替代图像，如有需要，可使用网络字体。
* 考虑[图标字体](http://weloveiconfonts.com/#zocial)；它们是可以无限缩放的矢量图形，可将整个图像集以一种字体进行下载。（但请注意[这些问题](https://sarasoueidan.com/blog/icon-fonts-to-svg/)。）
* 在 JavaScript 中，可使用 `<canvas>` 元素通过行、曲线、文本和其他图像来构建图像。
* [内联 SVG 或数据 URI 图像](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/)不会减少页面重量，但它们可以通过减少资源请求的数量缩短延迟时间。内联 SVG [在移动设备和桌面设备浏览器上能够得到很好的支持](http://caniuse.com/#feat=svg-html5)，[优化工具](http://petercollingridge.appspot.com/svg-optimiser)可以大大减少 SVG 尺寸。同样，数据 URI [也得到了很好的支持](http://caniuse.com/datauri)。这两者都可以内联到 CSS 中。
* 考虑使用 `<video>` 代替 GIF 动画。[移动设备上的所有浏览器均支持 video 元素](http://caniuse.com/video)（除 Opera Mini 以外）。

如需了解详细信息，请参阅[图像优化](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)和[消除并替换图像](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images)。


## 可以在不同视口尺寸上良好显示的设计内容{: #viewport }

>“创造适用于小屏幕的产品，而不是针对小屏幕重新设想一个。出色的移动 > 产品是创造出来的，而绝不是移植出来的。

>>— <a href="https://goo.gl/KBAXj0">移动设计与开发</a>，Brian Fling



"伟大的设计者不会“专门为移动设备进行优化”，而是考虑以自适应方式构建可在各种设备上使用的网站。文本结构和其他页面内容对于成功构建跨设备网站非常重要。

在将使用网络的下一批十亿用户中，有许多用户使用具有小视口的低成本设备。在低分辨率的 3.5 英寸或 4 英寸屏幕上阅读可能很困难。

下面是两个屏幕截图放在一起的照片：

![在高端智能手机和低成本智能手机上展示博文的比较图](imgs/devices-photo.jpg)

在较大的屏幕上，文本小但可以阅读。

在较小的屏幕上，浏览器可以正确渲染布局，但是文本难以阅读，即使放大后也很难阅读。显示屏很模糊，并且存在“色偏”，同时白色也不是很白，使得内容难以辨认。

### 为移动设备设计内容

在针对各种视口进行构建时，要考虑内容以及布局和图形设计，[使用真实文本和图像进行设计，而不是使用虚拟内容](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website)。


>“内容比设计重要。缺乏内容的设计不能叫设计，只能叫装饰。”
>>— Jeffrey Zeldman


* 将最重要的内容置于顶部，因为[用户往往以 F 形模式阅读网页](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)。
* 用户访问您的网站以实现一个目标。问问您自己，为实现该目标他们需要什么，并去除其他内容。果断去除视觉和文本装饰、老旧的内容、过多的链接和其他杂乱无章的内容。
* 慎用社交分享图标；它们会让布局变得杂乱，其代码会拖慢页面加载速度。
* 针对内容（而不是固定设备尺寸）设计[自适应布局](/web/fundamentals/design-and-ux/responsive/)。

### 测试内容

成功：不管做什么，**一定要测试**！

* 使用 Chrome DevTools 和其他[模拟工具](/web/fundamentals/performance/poor-connectivity/)检查较小视口的可读性。
* [在低带宽和长延迟时间下测试您的内容](/web/fundamentals/performance/poor-connectivity/)；在各种连接场景中试用内容。
* 尝试在低成本手机上阅读内容并与内容进行交互。
* 请朋友和同事试用您的应用或网站。
* 构建简单的设备测试实验室。面向 Google 迷你移动设备实验室的 [GitHub 存储区](https://github.com/GoogleChrome/MiniMobileDeviceLab)提供了有关如何构建您自己的实验室的说明。[OpenSTF](https://github.com/openstf/stf) 是一个用于在多个 Android 设备上测试网站的简单网络应用。

下面是 OpenSTF 实例：

[![OpenSTF 界面](imgs/stf.png)](https://github.com/openstf/stf)

人们越来越多地使用移动设备吸收内容和获取信息，移动设备不再只是用于通讯、游戏和媒体的设备。

这使得在考虑跨设备布局、界面和交互设计时，计划可在各种视口上顺畅运行的内容并确定内容的优先级变得越来越重要。


## 了解数据成本

网页变得越来越大。<br><br>根据 <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a>，<a href="http://httparchive.org/about.php#listofurls">前一百万网站</a>的平均页面重量现已超过 2MB。


用户会避免访问他们认为较慢或非常消耗流量的网站或应用，因此，了解加载页面和应用组件的成本至关重要。

减少页面重量还可以提高盈利。[来自 YouTube 的 Chris Zacharias](http://blog.chriszacharias.com/page-weight-matters) 发现，当他们将观看页面大小从 1.2MB 减少到 250KB 时可以提高盈利：

> 以前无法使用 YouTube 的大量用户突然能够使用了。

换句话说，减少页面重量**可以开辟全新的市场**。

### 计算页面重量{: #weight }

计算页面重量的工具有很多。Chrome DevTools Network 面板显示所有资源的总字节大小，可用于确定具体资产类型的重量。您还可以从浏览器缓存查看已检索到哪些项目。

![显示资源大小的 Chrome DevTools Network 面板](imgs/chrome-dev-tools.png)

Firefox 和其他浏览器提供相似的工具。

[WebPagetest](http://webpagetest.org) 可用于测试第一个页面加载和后续页面加载。您可以使用[脚本](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)（例如，登录到某个网站）或通过使用其 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) 实现自动化测试。以下示例（加载 [developers.google.com/web](/web/)）显示缓存已成功，后续页面加载不需要额外的资源。

![显示第一次页面访问和重复页面访问总字节数的 WebPagetest 结果](imgs/webpagetest-first-and-repeat.png)

WebPagetest 还可以按 MIME 类型提供大小和请求的详细分析。

![显示按 MIME 类型列出的请求数和字节数的 WebPagetest 饼图](imgs/webpagetest-requests-and-bytes-pie-charts.png)

### 计算页面成本

对许多用户而言，数据不只消耗字节和性能，还很费钱。

网站 [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } 让您可以预估加载您的网站的实际财务成本。下面的直方图展示加载 [amazon.com] 所需的成本（使用预付数据计划）(https://www.amazon.com/)。

![在 12 个国家/地区加载 amazon.com 首页的估计数据成本](imgs/what-does-my-site-cost.png)

请记住，这没有考虑相对于收入的支付能力。来自 [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) 的数据展示了数据的成本。

<table>
<tr>
    <td></td>
    <td><strong>500MB 数据计划<br>成本（美元）</strong></td>
    <td><strong>每小时最低<br>工资（美元）</strong></td>
    <td><strong>为支付 <br>500MB 数据计划需要工作的小时数</strong></td>
</tr>
<tr>
    <td>印度</td>
    <td>3.38 美元</td>
    <td>0.20 美元</td>
    <td>17 小时</td>
</tr>
<tr>
    <td>印度尼西亚</td>
    <td>2.39 美元</td>
    <td>0.43 美元</td>
    <td>6 小时</td>
</tr>
<tr>
    <td>巴西</td>
    <td>13.77 美元</td>
    <td>1.04 美元</td>
    <td>13 小时</td>
</tr>
</table>


页面重量不只是新兴市场的问题。在许多国家/地区，人们使用数据有限的移动计划，如果他们认为您的网站或应用很重并且非常耗费流量，则会避免使用它们。即使“无限”蜂窝网络和 WiFi 数据计划也通常会有数据限制，超出这个限制就会被阻止或被节流。

根本问题：页面重量会影响性能并且费钱。[优化内容效率](/web/fundamentals/performance/optimizing-content-efficiency/)介绍了如何降低该成本。


{# wf_devsite_translation #}
