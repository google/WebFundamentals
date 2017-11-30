project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“頁面在加載時不會自動請求地理定位”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# 頁面在加載時不會自動請求地理定位 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

頁面在加載時自動請求用戶位置會使用戶不信任頁面或感到困惑。
應將此請求與用戶的手勢（如點按一個“Find Stores Near Me”按鈕）進行關聯，而不是在頁面加載時自動請求用戶的位置。

確保手勢清楚明確地表達了對用戶位置的需求。


## 如何通過此審查{: #how }

在 **URLs** 下，Lighthouse 報告您的代碼在其中請求用戶位置的行號和列號。
刪除這些調用，將此請求與用戶手勢進行關聯。
 

有關請求用戶位置時的最佳做法列表，請參閱[以負責任的方式請求權限][ask]。


[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果在 Lighthouse 審查前已向頁面授予地理定位權限，則 Lighthouse 無法確定此頁面在加載時是否請求用戶的位置。重置權限並再次運行 Lighthouse。請參閱[更改網站權限][help]以獲取更多幫助。


Lighthouse 收集在頁面加載時執行的 JavaScript。如果此代碼包含對 `geolocation.getCurrentPosition()` 或 `geolocation.watchPosition()` 的調用，且未授予地理定位權限，則會請求用戶的位置。




[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
