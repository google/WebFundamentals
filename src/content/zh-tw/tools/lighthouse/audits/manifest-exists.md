project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單是否存在”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2016-09-20 #}

# 清單是否存在 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

網絡應用清單是一項網絡技術，允許您將網絡應用添加到用戶的主屏幕。
此功能通常稱爲“添加到主屏幕 (A2HS)”。


## 如何通過此審查{: #how }

有關在現有應用中添加 A2HS 支持的實用分步指南，請查看以下代碼實驗室：[將網絡應用添加到用戶的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。



如需結構較爲鬆散、深入探討網絡應用清單的指南，請參閱[通過網絡應用清單改進用戶體驗](/web/fundamentals/web-app-manifest)。



運用您在這些指南中學到的知識，在您自己的網絡應用中添加 A2HS 支持。


您可以在 Chrome DevTools 中模擬和測試 A2HS 事件。有關更多幫助，請參閱下文：[網絡應用清單](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清單並驗證它是否具有數據。Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。




{# wf_devsite_translation #}
