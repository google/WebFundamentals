---
title: "移轉考量"
updated_on: 2015-03-27
---


本節討論營運者在移轉為 HTTPS 時的考慮。

{% include shared/toc.liquid %}

## 搜尋排名

[Google 視 HTTPS 為正面的搜尋品質指標]
(https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html)。
Google 也發行一份指南，教導
 [如何傳輸、移動或移轉你的網站]，(https://support.google.com/webmasters/topic/6029673)同時維持其搜尋排名。
 Bing 也有發行
 [網站管理員方針](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)。

## 效能

當內容和應用程式層時經過良好調校
 (參見 [Steve Souders 的書藉](https://stevesouders.com/)，以取得很好的建議)，
相較於應用程式的整體成本，剩下的 TLS 效能考量一般而言並不大。
 此外，您還可以降低和攤還這些成本。 (要取得 TLS 最佳化和一般性的良好建議
，請見 _[高效能瀏覽器網路化]
(http://chimera.labs.oreilly.com/books/1230000000545)_[作者為 IlyaGrigorik]
(http://chimera.labs.oreilly.com/books/1230000000545)。)另請參閱 Ivan Ristic
 的 _[OpenSSL 食譜]
(https://www.feistyduck.com/books/openssl-cookbook/)_ 和 _[防彈 SSL 和 TLS]
(https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_。

在某些情況下，TLS 可以 _改善_ 效能，
這主要來自於它能實現 HTTP/2。 Chris Palmer [曾於 Chrome 開發者峰會 2014 討論了 HTTPS 和 HTTP/2 的效能] 
({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things)。

## 參照者標頭

當使用者追隨您 HTTPS 網站上的連結至其他 HTTP 網站，
使用者代理程式將不會傳送參照者標頭。 如果這會形成問題，
有幾個方法可以解決：

* 其他網站應移轉為 HTTPS。 也許，他們會覺得
本指南很實用！ :)如果被參照者網站可以完成本指南的「在您伺服器上啟用 HTTPS」一節，
您可以變更您網站的連結，從 http:// 變更為 https://，或使用通訊協定相對的連結。

* 您可以使用新的 [參照者政策標準] 
(http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)，
以參照者標頭，權宜解決形形色色的問題。

因為各大搜尋引擎正在移轉至 HTTPS，當您移轉到 HTTPS 時，
有可能會看到比現在 _更多的_ 參照者標頭。

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">如果參照頁面是以安全通訊協定傳輸，用戶端不應該在 (非安全) HTTP 要求中包含一參照者標頭欄位。<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">根據 HTTP RFC</a></p></blockquote>

## 廣告營收

透過展示廣告賺錢的網站營運者，
會想要確保移轉為 HTTPS 時不會降低廣告閱聽數。 但由於混合內容的安全性考量，
HTTP iframe 在 HTTPS 頁面中不會運作。 這是個棘手的集體行動問題：
除非廣告主透過 HTTPs 發行，網站營運者無法不損失廣告營收而移轉為 HTTPS；
但在網站營運者移轉為 HTTPS 之前，廣告主沒有什麼動力去發行 HTTPS。


廣告主至少應該透過 HTTPS 提供廣告服務
 (例如完成此指南中的「在您伺服器上啟用 HTTPS」)。 很多廣告主已經做了。 您應該要求完全不提供 HTTPS 服務的廣告主，
至少要起個頭。 在足夠的廣告主正確互通之前，
您可能會想延緩完成此指南的「讓內部網站 URL 具相對性」部分。

