project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站在 HTTPS 上”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# 網站在 HTTPS 上 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

所有網站均應使用 HTTPS 進行保護，即使是不處理敏感數據的網站也應如此。
HTTPS 可防止入侵者篡改或被動地偵聽您的網站和您的用戶之間的通信。


HTTPS 也是許多強大的新網絡平臺功能（如拍照或錄製音頻）的前提條件。


根據定義，一個應用如果不在 HTTPS 上運行，那麼它就不符合成爲 Progressive Web App 的條件。
這是因爲許多核心的 Progressive Web App 技術（如服務工作線程）都需要使用 HTTPS。


有關爲什麼所有網站都應使用 HTTPS 進行保護的詳細信息，請參閱[爲什麼應始終使用 HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)。


## 如何通過此審查{: #how }

將您的網站遷移到 HTTPS。

默認情況下，[Firebase](https://firebase.google.com/docs/hosting/){: .external } 或 [GitHub Pages](https://pages.github.com/){: .external } 等許多託管平臺都是安全的。



如果您運行自己的服務器並且需要一個成本低廉且簡單的方式來生成證書，請訪問 [Let's Encrypt](https://letsencrypt.org/){: .external }。
有關在您的服務器上啓用 HTTPS 的更多幫助，請參閱以下文檔集：[對傳輸中的數據進行加密](/web/fundamentals/security/encrypt-in-transit/enable-https)。



如果您的頁面已經在 HTTPS 上運行，但您沒有通過此審查，那麼，您可能存在混合內容問題。
當安全的網站請求不受保護的 (HTTP) 資源時將出現混合內容。
請在 Chrome DevTools Security 面板上查閱以下文檔以瞭解如何處理這些情況：[瞭解安全問題](/web/tools/chrome-devtools/debug/security)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 等待來自 Chrome Debugger Protocol 的一個事件，其可表明頁面正在安全的連接上運行。
如果在 10 秒內未偵聽到此事件，則表示審查失敗。



{# wf_devsite_translation #}
