project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 没有 HTTPS，您将无法构建 PWA。通过 HTTPS 提供您的网站是确保安全的基础，许多 API 都无法在非 HTTPS 状态下运行。如果您需要证明实现成本，不妨了解 HTTPS 为何重要。

{# wf_updated_on: 2018-08-16 #} {# wf_published_on: 2018-08-16 #} {# wf_blink_components: N/A #}

# 检查站点的安全 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

没有使用 HTTPS，您将无法构建 PWA（渐进式网络应用程序）。

通过 HTTPS 为您的站点提供服务是安全的基础，如果没有它，许多 API 将无法运行。如果您需要证明实施成本，请了解[ HTTPS 的重要性](/web/fundamentals/security/encrypt-in-transit/why-https)。

如果站点对任何资产使用了 HTTP，则会在 URL 栏中警告用户。 Chrome 会显示如下警告。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/audit/images/not-secure.png?raw=true" alt="Chrome 'not secure' warning">
  <figcaption><em>在 Chrome 68 中，如果并非所有资产都使用 HTTPS，则地址栏会发出警告</em></figcaption>
</figure>

HTTPS 应该在任何地方使用 - 不仅仅是在登录页面或结帐页面上。任何不安全的页面或资产都可能成为攻击的载体，让您的网站为您的用户和业务负责。

使用[ Chrome DevTools Security ](/web/tools/chrome-devtools/security)面板可以轻松查看网站安全性。记录任何问题。

以下示例中的站点不安全，因为某些资源是通过 HTTP 提供的。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/audit/images/devtools-security-1000.png?raw=true" srcset="images/devtools-security-500.png
  500w, images/devtools-security-1000.png 1000w" alt="Chrome DevTools Security panel">
<figcaption><em>Chrome DevTools 安全面板</em></figcaption> </figure> <br>
