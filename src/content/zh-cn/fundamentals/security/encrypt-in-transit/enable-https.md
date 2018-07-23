project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在服务器上启用 HTTPS 对于确保网页安全非常重要。

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2015-03-27 #}

# 在服务器上启用 HTTPS {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* 创建一个 2048 位 RSA 公钥/私钥对。
* 生成一个嵌入您的公钥的证书签名请求 (CSR)
* 将 CSR 与证书颁发机构 (CA) 共享以接收最终证书或证书链。
* 将最终证书安装在非网络可访问的位置，例如 `/etc/ssl`（Linux 和 Unix）或 IIS 需要它的位置 (Windows)。

## 生成密钥和证书签名请求

此部分使用 openssl 命令行程序（大部分 Linux、BSD 和 Mac OS X 系统均附带此程序）来生成私钥/公钥和 CSR。



### 生成一个公钥/私钥对

我们首先生成一个 2048 位 RSA 密钥对。较短的密钥，如 1024 位，不足以抵御暴力猜测攻击。
较长的密钥，如 4096 位，则有点过度。
长远来看，随着计算机处理开销降低，密钥长度会增加。
目前 2048 是最佳长度。

用于生成 RSA 密钥对的命令为：

    openssl genrsa -out www.example.com.key 2048

这将生成以下输出：

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### 生成证书签名请求

在此步骤中，您将公钥和有关贵组织及网站的信息嵌入到证书签名请求（或 CSR）中。
*openssl* 命令以交互方式要求您提供所需的元数据。


运行以下命令：

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

系统将输出以下内容：

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

为确保 CSR 的有效性，请运行以下命令：

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

### 将 CSR 提交给证书颁发机构

对于不同的证书颁发机构 (CA)，需要使用不同的方法将 CSR 发送给他们。
这些方法可能包括在其网站上使用表单、以电子邮件或其他方式发送 CSR。
一些 CA（或其经销商）甚至可能将其中部分或全部流程自动化（在某些情况下，包括密钥对和 CSR 的生成）。



将 CSR 发送给 CA 并按照他们的说明接收最终证书或证书链。


对于为您的公钥进行证实的服务，不同 CA 的收费将有所不同。


还可以选择将密钥映射到多个 DNS 名称，包括多个独立名称（例如 example.com、www.example.com、example.net 和 www.example.net 的全部）或“通配符”名称（例如 \*.example.com）。



例如，某个 CA 目前提供以下价格：

* 标准：16 美元/年，适用于 example.com 和 www.example.com。
* 通配符：150 美元/年，适用于 example.com 和 \*.example.com。

按这些价格，当您有 9 个以上子域名时，通配符证书比较划算；您也可以只购买一个或多个单名称证书。
（例如，如果您有五个以上子域名，在服务器上启用 HTTPS 时，您可能发现通配符证书更方便。）



Note: 记住，在通配符证书中，通配符只适用于一个 DNS 标签。对 \*.example.com 有效的证书将对 foo.example.com 和 bar.example.com 有效，但对于 foo.bar.example.com 无效。

将证书复制到所有前端服务器的非网络可访问位置，例如 `/etc/ssl`（Linux 和 Unix）或 IIS 需要它们的位置 (Windows)。


## 在服务器上启用 HTTPS

在服务器上启用 HTTPS 是确保网页安全的关键一步。

* 使用 Mozilla 的服务器配置工具来设置服务器以支持 HTTPS。
* 定期使用 Qualys 便捷的 SSL 服务器测试来测试网站，并确保得分至少为 A 或 A+。

此时，您必须做出关键的操作决定。选择下列其中一项：

* 给为网络服务器提供内容的每个主机名指定一个独立的 IP 地址。
* 使用基于名称的虚拟托管。

如果您一直针对每个主机名使用独立的 IP 地址，则可以轻松地让所有客户端支持 HTTP 和 HTTPS。


但是，大多数网站运营商使用基于名称的虚拟托管以节约 IP 地址，另一个原因是这样通常更方便。
Windows XP 上的 IE 和 2.3 版以前的 Android 的问题是，它们不理解[服务器名称指示](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external} (SNI)，而这对 HTTPS 基于名称的虚拟托管非常重要。




将来有一天（希望很快），不支持 SNI 的客户端将被现代软件代替。
监控请求日志中的 User Agent 字符串，以了解何时已有足够的用户迁移到现代软件。
（您可以决定您的阈值；可能是 &lt; 5%，或 &lt; 1%。）


如果您的服务器上还没有 HTTPS 服务，请立即启用（无需将 HTTP 重定向到 HTTPS；参见下文）。
配置网络服务器以使用您购买并安装的证书。
您可能发现 [Mozilla 便捷的配置生成器](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}很有用。




如果您有许多主机名/子域名，它们每个都需要使用正确的证书。


Caution: 如果您已完成上述步骤，但您使用 HTTPS 仅仅是为了将客户端重定向回 HTTP，那么，请马上停止这么做。参考下一部分以确保 HTTPS 和 HTTP 顺畅工作。

Note: 最终，您应将 HTTP 请求重定向到 HTTPS 并使用 HTTP 严格传输安全 (HSTS)。不过，现在不是向这种做法进行迁移的合适阶段；请参考“将 HTTP 重定向到 HTTPS”和“打开严格传输安全和安全 Cookie”。

现在，以及您网站的整个生命周期中，使用 [Qualys 便捷的 SSL 服务器测试](https://www.ssllabs.com/ssltest/){: .external }来检查您的 HTTPS 配置。
您的网站得分应为 A 或 A+；将导致等级较低的任何因素均视为错误。（今天的 A 在明天会变成 B，因为针对算法和协议的攻击始终在改进！）




## 使站内网址变成相对网址

由于您的网站同时运行 HTTP 和 HTTPS，不管哪种协议，都应当尽可能顺畅运行。
一个重要的因素是对站内链接使用相对网址。


确保站内网址和外部网址与协议无关；即确保使用相对路径或省去协议，例如 `//example.com/something.js`。

当您通过 HTTPS 提供一个包括 HTTP 资源的页面（称为[混合内容](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content)）时会出现问题。
浏览器将警告用户，已失去 HTTPS 的全部能力。事实上，如果是主动混合内容（脚本、插件、CSS、iframe），则浏览器通常根本不会加载或执行此内容，从而导致页面残缺。

Note: 在 HTTP 页面中包括 HTTPS 资源完全没问题。

此外，当您链接到您网站中的其他页面时，用户可能从 HTTPS 降级为 HTTP。


当您的页面包括了使用 *http://* 架构的完全限定站内网址时，会出现这些问题。


<p><span class="compare-worse">不建议的做法</span> — 我们不建议使用完全限定站内网址。</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

换句话说，使站内网址尽可能是相对地址：协议相对（省去协议，以 `//example.com` 开头）或主机相对（以相对路径开头，例如 `/jquery.js`）。

<p><span class="compare-better">建议做法</span> — 我们建议您使用协议相对站内网址。</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">建议做法</span> — 我们建议您使用相对站内网址。</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

通过脚本实现，而不是手动操作。如果网站内容在数据库中，则在数据库的开发副本中测试您的脚本。
如果网站内容由简单文件组成，则要在文件的开发副本中测试您的脚本。
像平常一样，只有在更改通过 QA 后，才会将更改推送到生产平台中。可以使用 [Bram van Damme 的脚本](https://github.com/bramus/mixed-content-scan)或类似脚本来检测网站中的混合内容。

在链接到其他网站（而不是包括其他网站的资源）时，请勿更改协议，因为您不能控制这些网站的运行方式。



Success: 为确保大型网站的迁移更顺利，我们建议采用协议相对网址。如果您还不确定是否能够完全部署 HTTPS，则强制网站的所有子资源使用 HTTPS 可能会弄巧成拙。可能会有一段时间，您对 HTTPS 觉得新奇，并且 HTTP 网站仍必须像往常一样运行。但从长远看，您将完成迁移并锁定 HTTPS（请参考接下来两个部分）。

如果网站依赖第三方（例如 CDN、jquery.com）提供的脚本、图像或其他资源，则有两个选择：


* 对这些资源使用协议相对网址。如果该第三方不提供 HTTPS，请求他们提供。
大多数已经提供，包括 jquery.com。
* 从您控制的并且同时提供 HTTP 和 HTTPS 的服务器上提供资源。
这通常是个好点子，因为您可以更好地控制网站的外观、性能和安全。
此外，您不必信任第三方，尽管他们总是很不错。


Note: 请记住，您还需要更改样式表、JavaScript、重定向规则、`<link>` 标记和 CSP 声明中的站内网址，而不仅是 HTML 页面。

## 将 HTTP 重定向到 HTTPS

您需要在页面的最前面放一个[规范链接](https://support.google.com/webmasters/answer/139066)，以告诉搜索引擎 HTTPS 是访问您网站的最佳方法。

在页面中设置 `<link rel="canonical" href="https://…"/>` 标记。这样可帮助搜索引擎确定访问您网站的最佳方法。


## 打开严格传输安全和安全 Cookie

此时，您已准备好“锁定”使用 HTTPS。

* 使用 HTTP 严格传输安全 (HSTS) 来避免 301 重定向产生的开销。
* 始终在 Cookie 上设置安全标记。

首先，使用[严格传输安全](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)来告诉客户端，它们始终应通过 HTTPS 来连接您的服务器，即使在访问 `http://` 引用时也是如此。

这样可挫败 [SSL 剥离](http://www.thoughtcrime.org/software/sslstrip/){: .external } 之类的攻击，还能避免我们在[将 HTTP 重定向到 HTTPS](#redirect-http-to-https)时启用的 `301 redirect` 产生的往返开销。




Note: 如果您的网站在其传输层安全协议 (TLS) 配置中出现过错误（例如过期证书），则已将您的网站注明为已知 HSTS 主机的客户端可能出现<a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>硬故障</i></a>。通过此方式显式设计 HSTS 可确保网络攻击者无法欺骗客户端访问没有 HTTPS 的网站。在确认您的网站运营足够可靠之前，不要启用 HSTS，以避免部署 HTTPS 时总是出现证书验证错误。

通过设置 `Strict-Transport-Security` 标头来打开 HTTP 严格传输安全 (HSTS)。[OWASP 的 HSTS 页面有说明链接](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)，提供了针对各种服务器软件的说明。

大多数网络服务器提供相似的功能来添加自定义标头。

Note: `max-age` 的计算单位为秒。您可以从较小的值开始，并随着您越来越熟练自如地运营纯 HTTPS 网站而逐步增加 `max-age`。

还要务必确保客户端从不通过 HTTP 发送 Cookie（例如用于身份验证或网站偏好）。
例如，如果用户的身份验证 Cookie 将在明文中暴露，则其整个会话的安全保障将被破坏 — 即使其他的一切都正确无误！




因此，更改您的网络应用，以便始终在其设置的 Cookie 上设置安全标记。[此 OWASP 网页解释了如何在多个应用框架中设置安全标记](https://www.owasp.org/index.php/SecureFlag)。
每个应用框架都采用一种方法来设置此标记。

大多数网络服务器都提供一种简单的重定向功能。使用 `301 (Moved Permanently)` 来告诉搜索引擎和浏览器，此 HTTPS 版本是规范的，并将用户从 HTTP 重定向到网站的 HTTPS 版本。


## 迁移问题

对于从 HTTP 迁移到 HTTPS，许多开发者有着合情合理的顾虑。Google 网站站长团队提供了一些[非常好的指导](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J)。


### 搜索排名

Google 使用 [HTTPS 用作肯定性的搜索质量指标](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html)。Google 还发布一个指南，说明在维护其搜索排名时[如何传输、移动或迁移您的网站](https://support.google.com/webmasters/topic/6029673)。


Bing 也发布了[网站站长指南](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)。


### 性能

当内容和应用层优化得当时（请参考 [Steve Souders 的论著](https://stevesouders.com/){: .external }以获取很好的建议），相对于应用的总体开销而言，其余的传输层安全协议 (TLS) 性能问题一般都是小问题。此外，您可以减少和分摊那些开销。
（如需 TLS 优化建议和一般建议，请参考 IlyaGrigorik 撰写的[高性能浏览器网络](https://hpbn.co/)。）
另请参考 Ivan Ristic 的 [OpenSSL 手册](https://www.feistyduck.com/books/openssl-cookbook/)和 [SSL 和 TLS 的防弹衣](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)。

在某些情况下，TLS 可以提高性能，主要是可以采用 HTTP/2 所带来的结果。
Chris Palmer [在 Chrome 开发峰会 2014 上做过一个演讲，讨论 HTTPS 和 HTTP/2 的性能](/web/shows/cds/2014/tls-all-the-things)。

### 引用站点标头

当用户从您的 HTTPS 网站链接到其他 HTTP 网站时，User Agent 不会发送引用站点标头。如果这是个问题，有多种方法可解决：


* 其他网站应迁移到 HTTPS。如果被引用网站可以完成本指南中的[在服务器上启用 HTTPS](#enable-https-on-your-servers) 部分，则可以将您网站中指向他们网站的链接从 `http://` 更改为 `https://`，或可以使用协议相对链接。
* 为解决引用站点标头的各种问题，可使用新的[引用站点政策标准](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)。

由于各搜索引擎正在迁移到 HTTPS，将来，当您迁移到 HTTPS 时，可能会看到更多的引用站点标头。

Caution: 根据 [HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3)，如果引用页面是通过安全协议传输的，则客户端**不能**在（非安全）HTTP 请求中包括引用站点标头字段。

### 广告收入

通过展示广告来赚钱的网站运营商希望确保迁移到 HTTPS 不会降低广告曝光量。
但是，由于混合内容的安全问题，HTTP `<iframe>` 在 HTTPS 页面中不起作用。
这里就存在一个棘手的集体行动问题：在广告商通过 HTTPS 发布广告之前，网站运营商无法在不损失广告收入的情况下迁移到 HTTPS；但是在网站运营商迁移到 HTTPS 之前，广告商没有动力来通过 HTTPS 发布广告。




广告商至少应通过 HTTPS 提供广告服务（例如完成本页面中的“在服务器上启用 HTTPS”部分）。
许多广告商已经这样做了。您应当请求完全不提供 HTTPS 的广告商至少开始提供 HTTPS。

您可能希望推迟完成[使站内网址变成相对网址](#make-intrasite-urls-relative)，直到有足够数量的广告商能正常地互操作。


{# wf_devsite_translation #}
