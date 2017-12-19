project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Security 面板確保您的網站上的所有資源均通過 HTTPS 進行保護。

{# wf_updated_on:2016-03-09 #}
{# wf_published_on:2015-12-21 #}

# 瞭解安全問題 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

HTTPS 爲您的網站和將個人信息委託給您的網站的人提供了[重要的安全性和數據完整性][why-https]。在 Chrome DevTools 中使用 Security 面板調試安全問題，確保您已在自己的網站上恰當地實現 HTTPS。




### TL;DR {: .hide-from-toc }
- 使用 Security Overview 可以立即查看當前頁面是否安全。
- 檢查各個源以查看連接和證書詳情（安全源）或找出具體哪些請求未受保護（非安全源）。


## Security Overview

要查看頁面的整體安全性，請打開 DevTools，然後轉至 Security 面板。
 

您首先會看到 Security Overview。Security Overview 會一目瞭然地告訴您頁面是否安全。
安全頁面會通過消息 `This page is secure (valid HTTPS).` 指示


![Security Overview，安全頁面](images/overview-secure.png)

點擊 **View certificate** 查看[主源][same-origin-policy]的服務器證書。
 

![查看證書](images/view-certificate.png)

非安全頁面會通過消息 `This page is not secure.` 指示

Security 面板可以區分兩種非安全頁面。
如果請求的頁面通過 HTTP 提供，則主源會被標記爲不安全。
 

![Security Overview，非安全主源](images/overview-non-secure.png)

如果請求的頁面通過 HTTPS 檢索，但頁面會繼續使用 HTTP 檢索其他源的內容，然後頁面仍然會被標記爲不安全。這稱爲[混合內容][mixed-content]頁面。
混合內容頁面僅受部分保護，因爲 HTTP 內容可以被嗅探器獲取到且易受到中間人攻擊。
 

![Security Overview，混合內容](images/overview-mixed.png)

點擊 **View request in Network Panel** 打開 Network 面板的過濾視圖，然後查看具體是哪些請求通過 HTTP 提供。
這將顯示來自所有源的所有未受保護的請求。
 

![Network 面板，非安全資源，所有源](images/network-all.png)

## 檢查源

使用左側面板可以檢查各個安全或非安全源。 

點擊安全源查看該源的連接和證書詳情。


![源詳情，安全](images/origin-detail-secure.png)

如果您點擊非安全源，Security 面板會提供 Network 面板過濾視圖的鏈接。 

![源詳情，非安全](images/origin-detail-non-secure.png)

點擊鏈接可以查看具體是源的哪些請求通過 HTTP 提供。
 

![Network 面板，非安全資源，一個源](images/network-one.png)





[mixed-content]: /web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: /web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
