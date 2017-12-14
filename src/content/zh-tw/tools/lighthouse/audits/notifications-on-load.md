project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“頁面在加載時不會自動請求通知權限”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

# 頁面在加載時不會自動請求通知權限 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

如[怎樣纔算好的通知][good]中所述，好的通知需要做到及時、相關且精確。
如果您的頁面在加載時要求權限以發送通知，則這些通知可能與您的用戶無關或者不是他們的精準需求。爲提高用戶體驗，
最好是向用戶發送特定類型的通知，並在他們選擇加入後顯示權限請求。



[good]: /web/fundamentals/push-notifications/

## 如何通過此審查 {: #how }

在 **URLs** 下，Lighthouse 報告您的代碼在其中請求權限以發送通知的行號和列號。
移除這些調用，將此請求與用戶手勢進行關聯。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果在 Lighthouse 審查前，已向頁面授予或拒絕授予通知權限，則 Lighthouse 無法確定此頁面在加載時是否請求通知
權限。重置權限並再次運行 Lighthouse。
請參閱[更改網站權限][help]以獲取更多幫助。

Lighthouse 收集在頁面加載時執行的 JavaScript。如果此代碼包含對 `notification.requestPermission()` 
的調用，且尚未授予通知權限，則會請求通知權限。



[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
