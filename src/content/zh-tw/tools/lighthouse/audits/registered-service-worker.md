project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“具有已註冊的服務工作線程”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-07-25 #}
{# wf_published_on:2016-07-25 #}

# 具有已註冊的服務工作線程 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

註冊服務工作線程是啓用以下 Progressive Web App 功能的第一步：


* 離線
* 推送通知
* 添加到主屏幕

## 如何通過此審查{: #how }

註冊服務工作線程僅涉及幾行代碼，但您使用服務工作線程的唯一原因是實現上面列出的某一個 Progressive Web App 功能。實現上述功能需要執行更多工作。


有關緩存文件以供離線使用的更多幫助，請參閱以下 Lighthouse 文檔的“如何通過此審查”部分：[處於離線狀態時訪問網址返回 200](http-200-when-offline#how)。



對於啓用推送通知或“添加到主屏幕”，請完成以下分步教程，然後運用您學到的知識在您自己的應用中實現這些功能：



* [爲網絡應用啓用推送通知](https://codelabs.developers.google.com/codelabs/push-notifications)。
* [將網絡應用添加到用戶的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

檢查 Chrome Debugger 是否返回一個服務工作線程版本。


{# wf_devsite_translation #}
