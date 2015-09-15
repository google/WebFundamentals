---
title: "開啟 Strict Transport Security 和安全 cookie"
updated_on: 2015-03-27
key-takeaways:
  - 你需要使用 HTTP Strict Transport Security (HSTS)，以避免 301 重新導向的成本。
  - 確保您一律在 cookie 上設定 Secure 旗標。
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

此時，您就可以「鎖定」使用 HTTPS。 首先，使用 
[Strict Transport Security]
(https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)，
以告知客戶應該一律透過 HTTPS 連線您的伺服器，
即使參照為 http:// 開頭。 這可以打擊如
(http://www.thoughtcrime.org/software/sslstrip/) [SSL Stripping] 的攻擊，
也避免我們在「重新導向 HTTP 至 HTTPS」時啟用的 301 重新導向之來回成本。

**注意：**
 [如果您的](https://tools.ietf.org/html/rfc6797#section-12.1)[網站的 TLS 組態曾有過錯誤]
(https://tools.ietf.org/html/rfc6797#section-12.1) (如過期的憑證)，將您網站標記為已知 HSTS 主機的用戶端，
有可能會 _[硬失敗](https://tools.ietf.org/html/rfc6797#section-12.1)_。
 這是 HSTS 的明確設計；
它有助於確保若無 HTTPS，
網路攻擊者無法哄騙用戶端存取該網站。 除非您能確定您的網站營運足夠強固，
可以避免以憑證驗證錯誤部署 HTTPS，否則請不要啟用 HSTS。


設定 Strict-Transport-Security 標頭，
以開啟 HTTP Strict Transport Security (HSTS)。 針對各種伺服器軟體
，[OWASP 的 HSTS 網頁提供說明的連結](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
。

大多數網頁伺服器提供了類似能力，以新增自訂標頭。

**注意：** max-age 是以秒為單位來度量。 您可以從較低值開始，
當您可以更輕鬆營運純 HTTPS 網站時，再逐步增加 max-age。


同樣重要的是，
確保用戶端永遠不會透過 HTTP 傳送 cookie (例如針對驗證或網站喜好設定)。 例如，
如果使用者的驗證 cookie 若要以純文字公開，
其整個工作階段的安全性保證會被破壞 -- 即使其他一切您都已經做對！


因此請變更您的網頁應用程式，
針對其設定的 cookie，一律設定 Secure 旗標。 針對數種應用程式架構
，[OWASP 網頁有解釋如何設定 Secure 旗標](https://www.owasp.org/index.php/SecureFlag)
 每個應用程式架構都有辦法設定這個旗標。

