---
title: "在服务器上启用 HTTPS"
description: "您已为在服务器上启用 HTTPS 的所有重要步骤做好准备。"
updated_on: 2015-03-27
key-takeaways:
  - 使用 Mozilla 的服务器配置工具来设置服务器以支持 HTTPS。
  - 使用 Qualys 方便的 SSL 服务器测试来测试网站，并确保得分至少为 A 或 A+。
---

<p class="intro">
  您已为在服务器上启用 HTTPS 的所有重要步骤做好准备。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

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

