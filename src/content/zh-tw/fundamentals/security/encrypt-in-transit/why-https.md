project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您應始終使用 HTTPS 保護您的所有網站，即使這些網站並不處理敏感的通信。HTTPS 爲您的網站以及信任您的網站可保管其個人信息的用戶提供至關重要的安全性和數據完整性。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2015-11-23 #}

# 爲什麼說 HTTPS 很重要 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

您應始終使用 HTTPS 保護您的所有網站，即使這些網站並不處理敏感的通信。
除了爲網站和用戶的個人信息提供關鍵的安全性和數據完整性外，許多新的瀏覽器功能，特別是 [Progressive Web App](/web/progressive-web-apps/) 所需的那些功能也要求使用 HTTPS。




### TL;DR {: .hide-from-toc }

* 善意的或惡意的入侵者會利用您的網站和用戶之間傳輸的每個未受保護的資源。
* 許多入侵者都會查看彙總的行爲以識別您的用戶。 
* HTTPS 不僅可阻止您的網站被濫用，也是許多先進功能不可或缺的一部分，可作爲類似應用功能（如服務工作線程）的實現技術。 

## HTTPS 可保護您的網站的完整性。 

HTTPS 有助於防止入侵者篡改您的網站和用戶瀏覽器之間的通信。
入侵者包括故意進行惡意攻擊的攻擊者，以及合法但具有侵犯性的公司，如將廣告注入網頁的 ISP 或酒店。



入侵者會利用未受保護的通信欺騙您的用戶提供敏感信息或安裝惡意軟件，或將他們自己的廣告插入您的資源中。例如，有些第三方向網站注入可能會損害用戶體驗和產生安全漏洞的廣告。



入侵者會利用您的網站和用戶之間傳輸的每個未受保護的資源。
圖像、Cookie、腳本、HTML 等都會被利用。
入侵在網絡中隨時都會發生，包括入侵用戶的電腦、Wi-Fi 熱點或已泄露的 ISP 等。
 

## HTTPS 可保護您的用戶的隱私和安全

HTTPS 可防止入侵者能夠被動地偵聽您的網站和您的用戶之間的通信。


人們對 HTTPS 有一個普遍的錯誤認識，認爲只有處理敏感通信的網站才需要 HTTPS。
每個未受保護的 HTTP 請求都可能暴露與您的用戶行爲和身份有關的信息。儘管訪問一次未受保護的網站可能看上去無害，但一些入侵者會查看彙總的用戶瀏覽活動，以推斷他們的行爲和意圖，從而進行[去匿名化](https://en.wikipedia.org/wiki/De-anonymization){: .external}攻擊，查出匿名用戶的身份。例如，員工可能在閱讀未受保護的醫療文章時不經意地向其僱主泄露敏感的健康信息。



## HTTPS 是網絡的未來發展方向

強大的全新網絡平臺功能，如拍照或使用 `getUserMedia()` 錄製音頻，或通過服務工作線程啓用離線應用體驗，或構建 Progressive Web App，在執行前均需要用戶的明確許可。還將更新許多較舊的 API，以要求執行權限，如 [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external} API。HTTPS 是這些新功能和更新的 API 的權限工作流的一個關鍵組件。









{# wf_devsite_translation #}
