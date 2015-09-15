---
title: "打开严格传输安全和安全 Cookie"
updated_on: 2015-03-27
key-takeaways:
  - 您需要使用 HTTP 严格传输安全 (HSTS) 来避免 301 重定向产生的费用。
  - 确保始终在 Cookie 上设置安全标记。
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

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

