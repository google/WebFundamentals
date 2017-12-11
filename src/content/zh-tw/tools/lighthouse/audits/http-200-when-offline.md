project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“處於離線狀態時訪問網址返回 200”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# 處於離線狀態時訪問網址返回 200 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

Progressive Web App 可在離線狀態下運行。如果在離線狀態下訪問頁面時 Lighthouse 沒有收到 HTTP 200 響應，則此頁面在離線狀態下無法訪問。



## 如何通過此審查 {: #how }

1. 向您的應用添加一個服務工作線程。
2. 使用此服務器工作線程在本地緩存文件。
3. 處於離線狀態時，使用服務工作線程作爲網絡代理以返回本地緩存的文件版本。


要了解如何將服務工作線程添加到現有應用，請參閱[將服務工作線程和離線支持添加到您的網絡應用](https://codelabs.developers.google.com/codelabs/offline)。運用您在這個實用的分步操作的代碼實驗室中學到的知識，瞭解如何將服務工作線程添加到您自己的應用中。這包括上述第 1 步和第 3 步。

上面的代碼實驗室向您展示了有關如何使用 Chrome DevTools 調試工作線程的一些基本知識。
如需更具體的幫助，請參閱本主題專用的代碼實驗室[調試服務工作線程](https://codelabs.developers.google.com/codelabs/debugging-service-workers)。



使用[離線手冊](https://jakearchibald.com/2014/offline-cookbook/)確定哪個緩存策略最適合您的應用。
這包括上述第 2 步。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用 Chrome Debugging Protocol 模擬一個離線連接，然後嘗試通過 `XMLHttpRequest` 檢索此頁面。



{# wf_devsite_translation #}
