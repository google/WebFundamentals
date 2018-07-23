project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:很重要的一点是，您需要了解应用或网站在连接不佳或不可靠时的使用情况，并相应地进行构建。有一些工具可以帮助您。

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-05-09 #}

# 了解低带宽和高延迟 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

很重要的一点是，您需要了解应用或网站在连接不佳或不可靠时的使用情况，并相应地进行构建。有一些工具可以帮助您。

## 在低带宽和高延迟环境中测试{: #testing }

<a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">越来越多</a>的人通过移动设备来体验网站。即使是在家里，<a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">有许多用户也都舍弃固定宽带而使用移动网络</a>。

在这样的趋势中，您需要理解您的应用或网站在连接不佳或不可靠的状况下表现如何。有很多软件工具可以帮助您[模拟或仿真](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference)低带宽和高[延迟](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)。

###  模拟网络限速

在建立或更新网站时，您必须确保在不同连接条件下提供足够性能。多种工具可以帮助您。

####  浏览器工具

[Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions) 让您能使用 Chrome DevTools Network 面板的预设或自定义设置，以多种上传/下载速度和[往返时间](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)测试网站：

![Chrome DevTools 节流](images/chrome-devtools-throttling.png)

####  系统工具

如果您安装了适用于 Xcode 的[硬件 IO 工具](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools)，Mac 上即会提供一个名为 Network Link Conditioner 首选面板。

![Mac Network Link Conditioner 控制面板](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner 设置](images/network-link-conditioner-settings.png)

![Mac Network Link Conditioner 自定义设置](images/network-link-conditioner-custom.png)

####  设备模拟

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) 允许您模拟在 Android 设备上运行应用（包括网络浏览器和混合式网络应用）时可能遇到的各种网络状况：

![Android Emulator](images/android-emulator.png)

![Android Emulator 设置](images/android-emulator-settings.png)

对于 iPhone，Network Link Conditioner 可用于模拟欠佳的网络状况（参见上文）。

###  使用不同位置和网络测试

连接性能依服务器位置和网络类型而定。

[WebPagetest](https://webpagetest.org) 是一种在线服务，让您的网站能以各种网络和主机位置运行性能测试。例如，您可以通过 2G 网络从位于印度的服务器或通过网络电缆从位于美国的服务器测试您的网站。

![WebPagetest 设置](images/webpagetest.png)

选择一个位置，然后从高级设置中选择连接类型。您甚至可以使用[脚本](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)（例如，登录到某个网站）或通过使用其 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis)实现自动化测试。这可以帮助您在构建流程中纳入连接测试或性能记录。

[Fiddler](http://www.telerik.com/fiddler) 支持通过 [GeoEdge](http://www.geoedge.com/faq) 进行全局代理，并且可以使用其自定义规则来模拟调制解调器的速度。

![Fiddler 代理](images/fiddler.png)

###  在连接不佳的网络状态下测试

利用软件和硬件代理，您可以模拟有问题的移动网络状况，例如带宽限制、封包延迟和随机丢包。利用共享代理或欠佳网络，开发团队可以将网络实战测试纳入工作流程。

Facebook 的 [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) 是以 BSD 许可证发布的一套应用，可用于控制流量和模拟连接不良的网络状况：

![Facebook 的 Augmented Traffic Control](images/augmented-traffic-control.png)

> Facebook 甚至推出 [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) 项目来帮助了解 2G 网络用户的产品体验。在周二，员工会收到一个弹出提示，让他们选择模拟 2G 连接。

[Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS 代理可用来[调节带宽和延迟](http://www.charlesproxy.com/documentation/proxying/throttling/)。Charles 是商业软件，但提供有免费试用版。

![Charles 代理带宽和延迟设置](images/charles.png)

有关 Charles 的更多信息，请参见 [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/)。

## 处理不可靠的连接和“lie-fi”{: #lie-fi }

###  什么是 lie-fi？

<a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> 一词至少可追溯到 2008 年（那时候手机看起来像<a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">这样</a>），是指看似连接而实际未连接的情况。浏览器看似已连接上网络，但由于某种原因，实际并未连接。

像这种虚假连接会导致糟糕的体验，因为浏览器（或 JavaScript）会持续不断地尝试检索资源，而不是放弃并选择有效的备用连接。实际上，Lie-fi 比离线更糟，因为如果确实离线的话，至少 JavaScript 可以采取相应的规避措施。

现在，越来越多的人舍弃固定宽带而转为使用移动网络，因此，Lie-fi 问题也越来越严峻。最新的[美国人口普查数据](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use)显示，越来越多的人[舍弃固定宽带而转为使用移动网络](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/)。下图是 2015 年和 2013 年在家使用移动互联网的数据比较：

<img src="images/home-broadband.png" class="center" alt="显示舍弃固定宽带而转为使用移动网络（尤其是低收入家庭）的美国人口普查数据图">

###  使用超时来处理时断时续的连接

过去，[使用 XHR 的笨方法](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline)用于测试时断时续的网络连接，但是服务工作线程采用更可靠的方法来设置网络超时。Jeff Posnick 在其[通过服务工作线程实现瞬时加载](https://youtu.be/jCKZDTtUA2A?t=19m58s)演讲中，解释了如何使用 [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) 超时来实现这一Objective:


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );


此外，[超时选项](https://github.com/whatwg/fetch/issues/20)也即将在 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) 中实现 - 而且 [Streams API](https://www.w3.org/TR/streams-api/) 会通过优化内容交付和避免庞大的请求来提供帮助。Jake Archibald 在[超负荷页面加载](https://youtu.be/d5_6yHixpsQ?t=6m42s)中给出了有关如何解决 lie-fi 的更多详情。


{# wf_devsite_translation #}
