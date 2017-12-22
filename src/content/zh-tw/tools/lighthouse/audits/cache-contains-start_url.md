project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“緩存包含來自清單的 start_url”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# 緩存包含來自清單的 start_url {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

可確保在離線狀態下從移動設備主屏幕正確啓動 Progressive Web App。


## 如何通過此審查 {: #how }

1. 在您的 `manifest.json` 文件中定義一個 `start_url` 屬性。
2. 確保您的服務工作線程正確緩存與 `start_url` 的值匹配的資源。


如需瞭解將應用添加到主屏幕的基礎知識，請參閱[將網絡應用添加到用戶的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。這是一個實用的分步操作的代碼實驗室，在其中可將“添加到主屏幕”功能添加到現有應用中。運用您在此代碼實驗室中學到的知識將“添加到主屏幕”功能集成到您自己的應用中。


如需有關如何使用服務工作線程緩存文件以供離線使用的更多幫助，請參閱以下 Lighthouse 文檔：[處於離線狀態時訪問網址返回 200](http-200-when-offline#how) 中的“如何通過此審查”部分



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

從移動設備的主屏幕啓動一個 Progressive Web App 時，此應用將在特定網址上打開。
該網址在應用的 `manifest.json` 文件中被定義爲 `start_url` 屬性。


此審查解析來自 `manifest.json` 的 `start_url` 的值，然後確保將匹配的資源緩存在服務工作線程的緩存中。


**如果您的服務工作線程重定向** `start_url` **請求，則此審查可能會生成不準確的結果**。


此審查的一個缺點是它直接檢查緩存內容，而不是要求服務工作線程解析 `start_url` 請求。如果您的緩存缺少與 `start_url` 的精確值匹配的資源，這會生成一個假陰性結果，即使在實際場景中由於服務工作線程將請求重定向到緩存中的另一個資源從而能夠成功解析請求。反過來，如果您的緩存包含一個與 `start_url` 匹配的資源，則此審查會生成一個假陽性結果，但是您的服務工作線程將請求重定向到一個不存在的資源。





{# wf_devsite_translation #}
