---
title: "在您伺服器上啟用 HTTPS"
description: "您已準備好在您的伺服器上啟用 HTTPS 的所有重要步驟。"
updated_on: 2015-03-27
key-takeaways:
  - 使用 Mozilla 的 Server Configuration 工具，以針對 HTTPS 設定您的伺服器。
  - 定期以 Qualys 方便的 SSL Server Test 測試您的網站，確保您至少獲得 A 或 A+。
---

<p class="intro">
  您已準備好在您的伺服器上啟用 HTTPS 的所有重要步驟。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

在此步驟中，您必須做出重大營運決策：

* 指定一個獨特的 IP 位址給您網頁伺服器藉以供應內容的來源主機名稱；
或* 使用基於名稱 (name-based) 的虛擬主機裝載 (hosting) 方式。


如果您一向是使用獨特的 IP 位址給每個主機名稱使用，那很好！您可以針對所有用戶端，
輕易同時支援 HTTP 和 HTTPS。

但是，大多數網站營運者是使用基於名稱的虛擬主機裝載，以節省 IP 位址，
同時也因為通常這樣更為方便。 Windows XP 上的 IE 和 Android 2.3 之前版本的問題
在於它們無法理解 [伺服器名稱指示]
 (https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI)，而 SNI 卻是 HTTPS 基於名稱之虛擬主機裝載的重要關鍵。


總有一天 -- 希望很快 -- 
不支援 SNI 的用戶端將會被最新軟體取代。 監控您的要求日誌中的使用者代理程式字串，
以了解有多少使用者人口已遷移到最新軟體。 (您可以決定你的臨界值；或許是
 &lt;5%、&lt;1% 或諸如此類的數字。)

如果您伺服器上尚未有 HTTPS 服務可供使用，請立即啟用它
 (不必將 HTTP 重新導向至 HTTPS；見下文)。 設定您的網頁伺服器，
以使用您購買並安裝的憑證。 您可能會覺得 [Mozilla 方便的 
Configuration
 Generator] (https://mozilla.github.io/server-side-tls/ssl-config-generator/)
很實用。

如果您有很多的主機名稱/子網域，
它們每一個都會需要使用正確的憑證。

**注意：** 許多網站營運者已經完成了我們討論過的步驟，
但使用 HTTPS 時只是為了是將用戶端重新導向回 HTTP 的唯一目的。 如果這是您的情況，
請停止這麼做。 請見下一章節，
以確保 HTTPS 和 HTTP 能順利運作。

**注意：** 您最終應該將 HTTP 要求重新導向至 HTTPS，
並使用 HTTP Strict Transport Security (HSTS)。 這麼做並不是遷移程序中的正確階段；
請見「重新導向 HTTP 至 HTTPS」及「開啟 Strict Transport Security 與 Secure Cookies」。

現在，以及在您網站的整個生命周期中，
請以 [Qualys 方便的 SSL Server Test](https://www.ssllabs.com/ssltest/)檢查您的 HTTPS 設定。 您的網站應該獲得 A 或 A+ 的分數；
請視更低的分數為設計錯誤。
(今天的 A 等於是明天的 B 水準，
因為對演算法和通訊協定的攻擊只會更強！)

