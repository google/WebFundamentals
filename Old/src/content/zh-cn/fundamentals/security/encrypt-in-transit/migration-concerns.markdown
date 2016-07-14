---
title: "迁移问题"
description: ""
updated_on: 2015-03-27
---

此部分讨论运营商在迁移到 HTTPS 时可能遇到的问题。

{% include shared/toc.liquid %}

## 搜索排名

[Google 正在将 HTTPS 用作肯定性的搜索质量
指标](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google 还发布一个指南，说明在维护其搜索排名时 [如何传输、移动或迁移您的
网站](https://support.google.com/webmasters/topic/6029673)
。 Bing 也发布了 [站长
指南](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)。

## 性能

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
]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things)。

## 引用站点标头

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

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">如果引用页面是通过安全协议传输的，则客户端不能在（非安全）HTTP 请求中包括引用站点标头字段。<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">根据 HTTP RFC 所写</a></p></blockquote>

## 广告收入

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

