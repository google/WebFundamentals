project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您应始终使用 HTTPS 保护您的所有网站，即使这些网站并不处理敏感的通信。HTTPS 为您的网站以及信任您的网站可保管其个人信息的用户提供至关重要的安全性和数据完整性。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2015-11-23 #}

# 为什么说 HTTPS 很重要 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

您应始终使用 HTTPS 保护您的所有网站，即使这些网站并不处理敏感的通信。
除了为网站和用户的个人信息提供关键的安全性和数据完整性外，许多新的浏览器功能，特别是 [Progressive Web App](/web/progressive-web-apps/) 所需的那些功能也要求使用 HTTPS。




### TL;DR {: .hide-from-toc }

* 善意的或恶意的入侵者会利用您的网站和用户之间传输的每个未受保护的资源。
* 许多入侵者都会查看汇总的行为以识别您的用户。 
* HTTPS 不仅可阻止您的网站被滥用，也是许多先进功能不可或缺的一部分，可作为类似应用功能（如服务工作线程）的实现技术。 

## HTTPS 可保护您的网站的完整性。 

HTTPS 有助于防止入侵者篡改您的网站和用户浏览器之间的通信。
入侵者包括故意进行恶意攻击的攻击者，以及合法但具有侵犯性的公司，如将广告注入网页的 ISP 或酒店。



入侵者会利用未受保护的通信欺骗您的用户提供敏感信息或安装恶意软件，或将他们自己的广告插入您的资源中。例如，有些第三方向网站注入可能会损害用户体验和产生安全漏洞的广告。



入侵者会利用您的网站和用户之间传输的每个未受保护的资源。
图像、Cookie、脚本、HTML 等都会被利用。
入侵在网络中随时都会发生，包括入侵用户的电脑、Wi-Fi 热点或已泄露的 ISP 等。
 

## HTTPS 可保护您的用户的隐私和安全

HTTPS 可防止入侵者能够被动地侦听您的网站和您的用户之间的通信。


人们对 HTTPS 有一个普遍的错误认识，认为只有处理敏感通信的网站才需要 HTTPS。
每个未受保护的 HTTP 请求都可能暴露与您的用户行为和身份有关的信息。尽管访问一次未受保护的网站可能看上去无害，但一些入侵者会查看汇总的用户浏览活动，以推断他们的行为和意图，从而进行[去匿名化](https://en.wikipedia.org/wiki/De-anonymization){: .external}攻击，查出匿名用户的身份。例如，员工可能在阅读未受保护的医疗文章时不经意地向其雇主泄露敏感的健康信息。



## HTTPS 是网络的未来发展方向

强大的全新网络平台功能，如拍照或使用 `getUserMedia()` 录制音频，或通过服务工作线程启用离线应用体验，或构建 Progressive Web App，在执行前均需要用户的明确许可。还将更新许多较旧的 API，以要求执行权限，如 [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external} API。HTTPS 是这些新功能和更新的 API 的权限工作流的一个关键组件。









{# wf_devsite_translation #}
