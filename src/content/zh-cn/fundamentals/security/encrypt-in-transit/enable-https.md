project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 安全是 Web 保护用户的重要部分，并且需要完善 TLS 支持以便在将来使用更出色的新 API。

{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# HTTPS 安全 {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}


{% comment %}
指南列表内容将根据与 page.id 匹配的文章集按登陆布局输出
{% endcomment %}


## 生成密钥和证书签名请求 




此部分使用 openssl 命令行程序（大部分 Linux、BSD 和 Mac OS X 系统均附带此程序）来生成私钥/公钥和 CSR。

### TL;DR {: .hide-from-toc }
- 您需要创建一个 2,048 位 RSA 公钥和私钥对。
- 生成一个嵌入您的公钥的证书签名请求 (CSR)。
- 将 CSR 与证书颁发机构 (CA) 共享以接收最终证书或证书链。
- 将最终证书安装在非 Web 可访问的位置，例如 /etc/ssl (Linux 和 Unix) 或 IIS 需要它们的位置 (Windows)。



### 生成一个公钥/私钥对

在本例中，我们将生成一个 2,048 位 RSA 密钥对。(较短的密钥不足以抵御暴力猜测攻击，如
1,024 位。
更长的密钥则有点过度，例如 4,096 位。长远来看，随着计算机处理
成本变得更便宜，密钥长度会增加。目前 2,048 是最佳长度。)

用于生成 RSA 密钥对的命令为：

    openssl genrsa -out www.example.com.key 2048

这将为您提供以下输出：

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### 生成 CSR

在此步骤中，您将公钥和有关贵组织及网站的信息
嵌入到证书签名请求。*openssl* 以交互方式
让您输入该元数据。

运行以下命令：

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

将输出以下：

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

现在，您可以使用以下命令来确保 CSR 的形式正确：

    openssl req -text -in www.example.com.csr -noout

响应结果应如下所示：

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### 将 CSR 提交给 CA

根据要使用的 CA，将有不同方式来向他们发送
 CSR：使用其网站上的表单，通过电子邮件发送，
或其他方式。一些 CA（或其经销商）甚至可能将其中一些或全部流程自动化
（在某些情况下，包括密钥对和 CSR 的生成）。

将 CSR 发送给 CA 并按照他们的说明接收最终
证书或证书链。

对于为您的公钥进行证实的服务，不同 CA 的收费将
有所不同。

还可以选择将密钥映射到多个 DNS 名称，包括
多个独立名称（例如 example.com、www.example.com、example.net 
和 www.example.net 的全部）或“通配符”名称（例如 \*.example.com）。

例如，1 个 CA 目前提供以下价格：

* 标准：$16/年，适用于 example.com 和 www.example.com。
* 通配符：$150/年，适用于 example.com 和 \*.example.com。

按这些价格，当您有 9
个以上子域时，通配符证书比较划算，您可以只购买 1 个或多个单名称证书。（例如，如果
您有 5 个以上子域，在服务器上启用 HTTPS 时，
您可能发现通配符证书更方便。）

**注：** 记住，在通配符证书中，通配符只适用于
1 个 DNS 标签。对 \*.example.com 有效的证书将对
foo.example.com 和 bar.example.com 有效，但对于 foo.bar.example.com 无效。

将证书复制到所有前端服务器的非 Web 可访问
位置，例如 /etc/ssl (Linux 和 Unix) 或 IIS 需要它们的位置 (Windows)。



## 在服务器上启用 HTTPS 




您已为在服务器上启用 HTTPS 的所有重要步骤做好准备。

### TL;DR {: .hide-from-toc }
- 使用 Mozilla 的服务器配置工具来设置服务器以支持 HTTPS。
- 使用 Qualys 方便的 SSL 服务器测试来测试网站，并确保得分至少为 A 或 A+。



在此步骤中，您必须做出关键的操作决定：

* 给为 Web 服务器提供内容的每个主机名指定一个独立的 IP 地址
；或
* 使用基于名称的虚拟托管。

如果您一直针对每个主机名使用独立的 IP 地址，很好！您可以
轻松让所有客户端支持 HTTP 和 HTTPS。

但是，大多数网站运营商使用基于名称的虚拟托管，以节约 IP
地址，因为这样通常更方便。 Windows XP
上的 IE 和 2.3 版以前的 Android 的问题是，它们不理解 [服务器
名称指示](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI)，
而这对 HTTPS 基于名称的虚拟托管非常重要。

将来有一天（希望很快），不支持 SNI 的客户端都将被
现代软件代替。 监控请求日志中的用户代理字符串，以了解
何时已有足够的用户迁移到现代浏览器。 (您可以
决定您的阈值；可能是 &lt; 5%，或 &lt; 1%，或其他值。)

如果您的服务器上还没有 HTTPS 服务，请现在启用
（无需将 HTTP 重定向到 HTTPS；参考下文）。 配置 Web 服务器以使用
您购买并安装的证书。 您可能发现 [Mozilla 方便的
配置
生成器](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
很有用。

如果您有许多主机名/子域，它们每个都需要使用正确的
证书。

**注：** 许多网站运营商已完成我们介绍的这些步骤，但
它们使用 HTTPS 仅仅是为了将客户端重定向到 HTTP。 如果您
就是这样做的，请马上停止。 参考下一部分以确保 HTTPS 和 HTTP
顺畅工作。

**注：** 最终，您应将 HTTP 请求重定向到 HTTPS 并使用 HTTP 严格
传输安全 (HSTS)。 现在不是向这种做法进行迁移
的合适阶段；请参考“将 HTTP 重定向到 HTTPS”和“打开严格传输安全和安全 Cookie”。

现在，以及您的网站整个生存期中，使用
[Qualys 方便的 SSL 服务器测试](https://www.ssllabs.com/ssltest/)来检查您的 HTTPS 配置。 您的网站
得分应为 A 或 A+；将导致降级的任何因素视为 Bug。
(今天的 A 在明天会变成 B，因为针对算法和协议的攻击
始终在改进！)



## 使站内 URL 变为相对地址 




由于您的网站同时运行 HTTP 和 HTTPS，不管哪种协议，都应当尽可能顺畅运行。

### TL;DR {: .hide-from-toc }
- 确保站内 URL 和外部 URL 与协议无关，即 确保使用相对路径或省去协议，例如 //example.com/something.js



但是，当您通过 HTTPS
提供一个包括 HTTP 资源的页面: [混合
内容](http://www.w3.org/TR/mixed-content/) 时会出现问题，浏览器将警告用户，已失去
HTTPS 的全部能力。

事实上，在活动混合内容（脚本、插件、CSS、内嵌框架）的情况下，
浏览器经常完全不会加载或执行内容 — 导致
残缺页面。

**注：** 在 HTTP 页面中包括 HTTPS 资源完全没问题。

此外，当您链接到您网站中的其他页面时，用户可能
从 HTTPS 降级为 HTTP。

当您的页面包括了使用
 *http://* 架构的全限定站内 URL 时，会出现这些问题。 应当将以下内容：

		<h1>Welcome To Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Read this nice <a href="http://example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

更改为这样：

		<h1>Welcome To Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="//example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

或者这样：

		<h1>Welcome To Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

也就是说，使站内 URL 尽可能是相对地址：协议相对
（省去协议，以 //example.com 开头）或主机相对（以
相对路径开头，例如 /jquery.js）。

**注：** 通过脚本实现，而不是手动操作。 如果网站内容在
数据库中，要在
数据库的开发副本中测试您的脚本。 如果网站内容是简单文件，则要在文件的开发副本中
测试您的脚本。 像平常一样，只有在更改通过 QA 后，
才会将更改推送到生产平台中。 可以使用 [Bram van Damme 的
脚本](https://github.com/bramus/mixed-content-scan) 或类似脚本来
检测网站中的混合内容。

**注：** 在链接到其他网站（而不是包括其他网站
的资源）时，请勿更改协议，因为您不能控制
这些网站是如何运行的。

**注：** 我建议采用协议相对 URL，以确保大型网站
的迁移更顺利。 如果您还不确定是否能够完全部署 HTTPS，强制
网站的所有子资源使用 HTTPS 可能弄巧成拙。 可能会有
一段时间，您对 HTTPS 觉得新奇，并且 HTTP 网站
仍必须像往常一样运行。 长期而言，您将完成迁移并且可以
锁定 HTTPS（请参考接下来两个部分）。

如果网站依赖第三方提供的脚本、图像或其他资源
，例如 CDN、jquery.com 或类似资源，则有 2 个选项：

* 对这些资源也使用协议相对 URL。 如果该第三方
不提供 HTTPS，请求他们提供。 大多数已经提供，包括 jquery.com。
* 从您控制的并且同时提供 HTTP 和
 HTTPS 的服务器上提供资源。 这通常是个好点子，因为您可以更好地控制
网站的外观、性能和安全 — 不必
信任第三方，尽管他们总是很不错。

还要记住，您将需要更改
样式表、JavaScript、重定向规则、&lt;link …&gt; 标签和 CSP
声明中的站内链接 — 而不仅是 HTML 页面！



## 将 HTTP 重定向到 HTTPS 



>

### TL;DR {: .hide-from-toc }
- 您需要在网页的头部放一个规范链接，以告诉搜索引擎 https 是访问您网站的最佳方法。


在网页中设置 &lt;link rel="canonical" href="https://…"/&gt; 标签。 [这样
可帮助搜索引擎](https://support.google.com/webmasters/answer/139066)
了解访问您网站的最佳方法。

大多数 Web 服务器都提供一种简单的重定向功能。 使用 301（永久移动）
来告诉搜索引擎和浏览器，此 HTTPS 版本是标准的，并将用户从 HTTP 重定向到网站的 HTTPS 版本。



## 打开严格传输安全和安全 Cookie 




### TL;DR {: .hide-from-toc }
- 您需要使用 HTTP 严格传输安全 (HSTS) 来避免 301 重定向产生的费用。
- 确保始终在 Cookie 上设置安全标记。



此时，您已准备好“锁定”使用 HTTPS。 首先，使用[严格
传输
安全](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)来告诉
客户端，它们始终应通过 HTTPS 来连接您的服务器，即使在
访问 http:// 引用时也是如此。 这样可挫败 [SSL
剥离](http://www.thoughtcrime.org/software/sslstrip/) 之类的攻击，还能避免
我们在“将 HTTP 重定向到 HTTPS”时启用的 301 重定向产生的来回费用。

**注：** [如果您的
](https://tools.ietf.org/html/rfc6797#section-12.1)[网站在其 TLS 配置
出现过错误](https://tools.ietf.org/html/rfc6797#section-12.1)（例如
过期证书），则已将您的网站注明为已知 HSTS 主机的客户端可能出现
_[硬故障](https://tools.ietf.org/html/rfc6797#section-12.1)_。 这是 HSTS 的显式设计选择；它
有助于确保网络攻击者无法欺骗客户端访问
没有 HTTPS 的网站。 在确认您的网站运营足够可靠之前，
不要启用 HSTS，以避免部署 HTTPS 时总是出现证书
验证错误。

通过设置安全 Strict-Transport-Security
标头来打开 HTTP 严格传输安全 (HSTS)。 [OWASP 的 HSTS 页面有
介绍链接](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
，提供了针对各种服务器软件的说明。

大多数 Web 服务器提供相似的功能来添加自定义标头。

**注：** max-age 的计算单位为秒。 您可以从较小的值开始，并
随着您越来越熟练自如地运营
纯 HTTPS 网站而逐步增加 max-age。

还要务必确保客户端从不通过 HTTP 发送 Cookie（例如用于
身份验证或网站偏好）。 例如，如果用户的
身份验证 Cookie 将在明文中暴露，则其整个会话的安全保障
将被破坏 — 即使其他的一切都
正确无误！

因此，更改您的 Web 应用程序，以便始终在其设置的 Cookie 上设置安全
标记。 [此 OWASP 网页解释了如何在多个应用程序框架中设置安全
标记](https://www.owasp.org/index.php/SecureFlag)
。 每个应用程序框架都有某种方法来设置此标记。



## 迁移问题 




此部分讨论运营商在迁移到 HTTPS 时可能遇到的问题。


### 搜索排名

[Google 正在将 HTTPS 用作肯定性的搜索质量
指标](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google 还发布一个指南，说明在维护其搜索排名时 [如何传输、移动或迁移您的
网站](https://support.google.com/webmasters/topic/6029673)
。 Bing 也发布了 [站长
指南](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)。

### 性能

当内容和应用程序层优化得当时（请参考 [Steve Souders 的
书](https://stevesouders.com/)以获取很好的建议），相对于应用程序的总体成本而言，其余的 TLS
性能问题一般
都是小问题。 此外，您可以减少和分摊那些费用。 （如需
TLS 优化建议和一般建议，请参考 _[高性能浏览器
网络](http://chimera.labs.oreilly.com/books/1230000000545)_[ 作者 Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545)。）另请参考 Ivan
Ristic 的 _[OpenSSL
手册](https://www.feistyduck.com/books/openssl-cookbook/)_ 和 _[防弹
SSL 和 TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_。

在某些情况下，TLS 可以_提高_性能，主要是可以采用
HTTP/2 所带来的结果。 Chris Palmer [在 Chrome 开发峰会 2014 上做过一个演讲，讨论 HTTPS 和 HTTP/2 的性能
](/web/shows/cds/2014/tls-all-the-things)。

### 引用站点标头

当用户从您的
HTTPS 网站链接到其他 HTTP 网站时，用户代理不会发送引用站点标头。 如果这是个问题，有多种方法
可解决：

* 其他网站应迁移到 HTTPS。 可能他们会发现本指南
很有用！:)如果被引用网站可以完成本指南中的“在服务器上启用 HTTPS”，则可以将
您网站中指向他们网站的链接从 http:// 更改为 https://，或可以使用
协议相对链接。
* 您可以使用 [引用站点策略
标准](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
 来解决引用站点标头的各种问题。

由于各搜索引擎正在迁移到 HTTPS，当您迁移到 HTTPS 时，可能会看到比现在_更多的_ 引用站点
标头。

<blockquote>如果引用页面是通过安全协议传输的，则客户端不能在（非安全）HTTP 请求中包括引用站点标头字段。<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">根据 HTTP RFC 所写</a></p></blockquote>

### 广告收入

通过展示广告来赚钱的网站运营商希望确保
迁移到 HTTPS 不会降低广告曝光量。 但是，由于混合内容的
安全问题，HTTP 内嵌框架在 HTTPS 页面中将不起作用。 这里就存在
一个棘手的集体行动问题：在广告商通过 HTTPS 发布广告之前，
网站运营商无法在不损失广告收入的情况下迁移到 HTTPS；但是在网站
运营商迁移到 HTTPS 之前，广告商没有动力来通过 HTTPS 发布广告。

广告商至少应通过 HTTPS 提供广告服务（例如完成本指南中的
“在服务器上启用 HTTPS”）。 许多广告商已经这样做了。 您应当请求完全不提供
HTTPS 的广告商至少开始提供HTTPS。 您可能希望推迟完成本指南中的“使站内 URL 变成相对地址”，
直到有足够数量的广告商能正常地互操作。

