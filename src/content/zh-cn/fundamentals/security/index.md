project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:安全性是一个重要话题，详细了解 HTTPS，为什么说 HTTPS 很重要以及如何将其部署到服务器。

{# wf_updated_on:2016-09-09 #}
{# wf_published_on:2015-09-08 #}

# 安全性和身份 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="pgBQn_z3zRE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

安全性是一个重要话题，您可以从以下几点入手。 

<div class="clearfix"></div>


## 对传输中的数据进行加密

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

[安全的 HTTP，也称为 HTTPS](encrypt-in-transit/why-https)，是最关键的安全功能之一，许多现代 API 和 [Progressive Web App](/web/progressive-web-apps/) 都需要使用它。人们对 HTTPS 有一个普遍的错误认识，认为只有处理敏感通信的网站才需要 HTTPS。隐私和安全性并不是使用 HTTPS 保护用户的充分理由，服务工作线程、Payment Request API 等许多新的浏览器功能也需要 HTTPS。

[在服务器上启用 HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>内容安全政策</h2>
  <p>
    内容安全政策或 CSP 提供一个丰富的指令集，让您可以对允许页面加载的资源和资源加载位置进行精细控制。<br>


    <a href="csp/">了解详情</a>
  </p>
</div>
<div class="attempt-right">
  <h2>防止混合内容</h2>
  <p>
    实现 HTTPS 时比较耗时的一项任务是查找和修复具有 HTTPS 和 HTTP 的混合内容。
幸运的是，有一些工具可帮助您处理此任务。
<br>
    <a href="prevent-mixed-content/what-is-mixed-content">使用入门 </a>
  </p>
</div>

<div style="clear:both"></div>

## 相关资源

### Chrome DevTools

* [了解安全问题](/web/tools/chrome-devtools/security)





{# wf_devsite_translation #}
