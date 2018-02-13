project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 安全性是網頁保護使用者的重要一部分，而移轉為 TLS 支援將是未來使用令人興奮的新 API 之必要條件。

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2000-01-01 #}

# 以 HTTPS 提供安全性 {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}


{% comment %}
指南清單內容將根據與 page.id 相符的文章集合，由登陸的版面配置輸出
{% endcomment %}


## 產生金鑰和憑證簽署要求




本章節使用大多數 Linux、BSD 和 Mac OS X 系統都會隨附的 openssl 命令列程式，以產生私密/公開金鑰和一個 CSR。

### TL;DR {: .hide-from-toc }
- 您需要建立一個 2048 位元 RSA 公開/私密金鑰組。
- 產生內嵌您公開金鑰的憑證簽署要求 (CSR)。
- 分享您的 CSR 給您的憑證授權單位 (CA) ，以取得最終憑證或憑證鏈結。
- 安裝您的最終憑證於如 /etc/ssl (Linux and Unix) 等非網頁可存取之處，或是安裝在 ISS 需要的地方 (Windows)。



### 產生公開金鑰/私密金鑰金鑰組

在此範例中，我們將會產生一個 2048 位元的 RSA 金鑰組。(如 1024 位元的較小金鑰
無法抵抗暴力猜測攻擊。如 4,096 位元的較大金鑰
則是殺雞用牛刀。隨著時間推移，電腦處理成本變得更低之後，
金鑰大小也必須增加。2,048 是目前的最佳取捨。)

產生 RSA 金鑰組的命令為：

    openssl genrsa -out www.example.com.key 2048

這會給您以下的輸出結果：

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### 產生一個 CSR

在此步驟中，您要內嵌有關您組織與網站的公開金鑰與資訊於一個憑證簽署要求中。
*openssl* 會以互動方式要求您提供該中繼資料。


執行以下命令：

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

將輸出以下內容：

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

現在，請確定該 CSR 並未納入這個命令所無法理解的部分：

    openssl req -text -in www.example.com.csr -noout

回應應該如下所示：

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### 提交您的 CSR 給 CA

視您想要使用的 CA 類型，傳送 CSR 給它們會有不同方法：
使用網站上的表單、傳送電子郵件或其他方式。
一些 CA (或其轉售商) 可能甚至自動化處理部分或全部程序 (在某些案例中，
也包括金鑰組與產生 CSR)。

傳送 CA 給您的 CSR，
並按照它們的指示以接收您的最終憑證或憑證鏈結。

不同的 CA 將針對擔保您的公開金鑰，
而收取不同金額。

也有一些選項，可將您的金鑰對應至 1 個以上的 DNS 名稱，
包括數個獨特名稱 (例如，www.example、www.example.com、example.net 與 www.example.net 等所有網站)
或「萬用字元」名稱，如 \*.example.com。

舉例來說，一家 CA 目前提供以下價格：

* 標準收費：16 美元/年，適用於 example.com 和 www.example.com。
* 萬用字元：150 美元/年，適用於 example.com 和 \*.example.com。

以這些價格，當您擁有超過 9 個子網域時，萬用字元憑證較為經濟；
否則，您可以只購買 1 個或更多單名稱憑證。(如果您有比方說 5 個以上子網域，
可能會發現要在您伺服器上啟用 HTTPS 時，萬用字元憑證較為方便。)


Note: 請記住，在萬用字元憑證中，
萬用字元僅適用於 1 個 DNS 標籤 (label)。適用於 \*.example.com 範圍內的憑證，
將適用於 forfoo.example.com 和 bar.example.com，但_不_適用於 foo.bar.example.com。

複製憑證至於您所有前端伺服器中如 /etc/ssl (Linux and Unix) 等非網頁可存取之處，
或是安裝在 ISS 需要的地方 (Windows)。



## 在您伺服器上啟用 HTTPS




您已準備好在您的伺服器上啟用 HTTPS 的所有重要步驟。

### TL;DR {: .hide-from-toc }
- 使用 Mozilla 的 Server Configuration 工具，以針對 HTTPS 設定您的伺服器。
- 定期以 Qualys 方便的 SSL Server Test 測試您的網站，確保您至少獲得 A 或 A+。



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

Note: 許多網站營運者已經完成了我們討論過的步驟，
但使用 HTTPS 時只是為了是將用戶端重新導向回 HTTP 的唯一目的。 如果這是您的情況，
請停止這麼做。 請見下一章節，
以確保 HTTPS 和 HTTP 能順利運作。

Note: 您最終應該將 HTTP 要求重新導向至 HTTPS，
並使用 HTTP Strict Transport Security (HSTS)。 這麼做並不是遷移程序中的正確階段；
請見「重新導向 HTTP 至 HTTPS」及「開啟 Strict Transport Security 與 Secure Cookies」。

現在，以及在您網站的整個生命周期中，
請以 [Qualys 方便的 SSL Server Test](https://www.ssllabs.com/ssltest/){: .external }檢查您的 HTTPS 設定。 您的網站應該獲得 A 或 A+ 的分數；
請視更低的分數為設計錯誤。
(今天的 A 等於是明天的 B 水準，
因為對演算法和通訊協定的攻擊只會更強！)



## 保持內部網站的 URL 相對性




既然您已同時以 HTTP 和 HTTPS 提供網站服務，網站也必需能無視通訊協定，儘可能順暢運作。

### TL;DR {: .hide-from-toc }
- 確定內部網站 URL 與外部 URL 無視通訊協定，也就是 請確保您使用相對路徑，或不使用像 //example.com/something.js 這樣的通訊協定



但當您透過包含 HTTP 資源：
[混合
內容](http://www.w3.org/TR/mixed-content/){: .external}的 HTTPS 供應頁面時，會出現一個問題，  瀏覽器的會警告使用者，HTTPS 的完整優點已經喪失。


事實上，就主動混合內容的情況 (指令碼、外掛程式、CSS、iframe)，
瀏覽器通常完全不會載入或執行內容 -- 導致斷裂頁面。


**注意：** 在 HTTP 頁中包含 HTTPS 資源，則完全無問題。

此外，當在您網站中連結到其他頁面時，
使用者可能會從 HTTPS 降級為 HTTP。

當您的頁面包含
使用 *http://* 配置、完全合格的內部網站 URL 時，會發生這些問題。 您應該變更以下的內容：

		<h1>歡迎來到 Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>閱讀有關貓兒的這則新增好<a href="http://example.com/2014/12/24/">
		貼文！</a></p>
		<p>查看<a href="http://foo.com/">另一個酷網站。
		</a></p>

修改成這樣：

		<h1>歡迎來到 Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>閱讀有關貓兒的這則新增好<a href="//example.com/2014/12/24/">
		貼文！</a></p>
		<p>查看<a href="http://foo.com/">另一個酷網站。
		</a></p>

或這樣：

		<h1>歡迎來到 Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>閱讀有關貓兒的這則新增好<a href="/2014/12/24/">
		貼文！</a></p>
		<p>查看<a href="http://foo.com/">另一個酷網站。
		</a></p>

也就是要讓內部網站 URL 儘可能具相對性：
協定相對 (缺少通訊協定，以 //example.com 開頭) 或主機相對 (/jquery.js 一樣僅以路徑起頭)。


Note: 請以指令碼為之，而非手動。 如果您的網站內容是在資料庫中，
您應該將指令碼在資料庫的開發副本上測試。
 如果您的網站內容是在簡單的純檔案中，
在這些檔案的開發副本上測試您的指令碼。 像平常一樣，只有在變更通過 QA 時，
才將變更推送至生產線。 您可以使用 [Bram van Damme
的指令碼](https://github.com/bramus/mixed-content-scan){: .external} 或類似的東西，以偵測您網站中的混合內容。


Note: 當連結至其他網站時 (而非包含其資源)，請不要改變通訊協定，
因為您無法控制這些網站的運作方式。


Note: 我推薦使用通訊協定相對的 URL，
使大型網站的移轉更順暢。 如果您不確定您能夠完全部署 HTTPS，
若強迫您網站針對所有子資源使用 HTTPS，可能會適得其反。 可能會有一段時間，HTTPS 對你而言是個新奇古怪的技術，
但 HTTP 網站仍必須維持運作。
 隨著時間過去，您會完成移轉，
並固定使用 HTTPS (請見以下兩節)。

如果您的網站依賴來自第三方供應的指令碼、影像與其他資源，
例如 CDN、jquery.com 之類的，您則有 2 個選項：

* 也針對這些資源，使用通訊協定相對的 URL。 如果第三方不供應 HTTPS 服務，
則要求他們為之。 包括 jquery.com 在內的網站已支援。
* 從您控制的伺服器供應資源服務，
而且此伺服器必須同時提供 HTTP 和 HTTPS 服務。 無論如何，這往往是個好作法，因為您會因此更好控制您網站的外觀、效能和安全性
 -- 您不需要信任第三方，這總是好事。


此外也請牢記，您將需要變更您的樣式表、JavaScript、重新導向規則
、&lt;連結...&gt;標籤和 CSP 宣告中的內部網址 URL -- 而不只是 HTML 頁面！




## Redirect HTTP to HTTPS





### TL;DR {: .hide-from-toc }
- 您需要在頁面的頁首 (head) 放置一標準連結，以告之搜尋引擎 https 是到達您網站的最佳方法。


在您頁面中設定 `<link rel="canonical" href="https://…"/>` 標籤。 [這有助於搜尋引擎]
(https://support.google.com/webmasters/answer/139066){: .external}知道前往您網站的最佳方法。


大多數網頁伺服器提供了一個簡單的重新導向功能。 使用 301 (永久移動) 是向搜尋引擎和瀏覽器表示，HTTPS 版本為標準，並將您的使用者從 HTTP 重新導向至您的 HTTPS 版本。




## 開啟 Strict Transport Security 和安全 cookie




### TL;DR {: .hide-from-toc }
- 你需要使用 HTTP Strict Transport Security (HSTS)，以避免 301 重新導向的成本。
- 確保您一律在 cookie 上設定 Secure 旗標。



此時，您就可以「鎖定」使用 HTTPS。 首先，使用
[Strict Transport Security]
(https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)，
以告知客戶應該一律透過 HTTPS 連線您的伺服器，
即使參照為 http:// 開頭。 這可以打擊如
(http://www.thoughtcrime.org/software/sslstrip/){: .external } [SSL Stripping] 的攻擊，
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



## 移轉考量





本節討論營運者在移轉為 HTTPS 時的考慮。


### 搜尋排名

[Google 視 HTTPS 為正面的搜尋品質指標]
(https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html)。
Google 也發行一份指南，教導
 [如何傳輸、移動或移轉你的網站]，(https://support.google.com/webmasters/topic/6029673)同時維持其搜尋排名。
 Bing 也有發行
 [網站管理員方針](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)。

### 效能

當內容和應用程式層時經過良好調校
 (參見 [Steve Souders 的書藉](https://stevesouders.com/){: .external }，以取得很好的建議)，
相較於應用程式的整體成本，剩下的 TLS 效能考量一般而言並不大。
 此外，您還可以降低和攤還這些成本。 (要取得 TLS 最佳化和一般性的良好建議
，請見 _[高效能瀏覽器網路化]
(https://hpbn.co/)_[作者為 IlyaGrigorik]
(https://hpbn.co/)。)另請參閱 Ivan Ristic
 的 _[OpenSSL 食譜]
(https://www.feistyduck.com/books/openssl-cookbook/)_ 和 _[防彈 SSL 和 TLS]
(https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_。

在某些情況下，TLS 可以 _改善_ 效能，
這主要來自於它能實現 HTTP/2。 Chris Palmer [曾於 Chrome 開發者峰會 2014 討論了 HTTPS 和 HTTP/2 的效能]
(/web/shows/cds/2014/tls-all-the-things)。

### 參照者標頭

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

Caution: 如果參照頁面是以安全通訊協定傳輸，用戶端**不應該**在 (非安全) HTTP 要求中包含一參照者標頭欄位。[根據 HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3)

### 廣告營收

透過展示廣告賺錢的網站營運者，
會想要確保移轉為 HTTPS 時不會降低廣告閱聽數。 但由於混合內容的安全性考量，
HTTP iframe 在 HTTPS 頁面中不會運作。 這是個棘手的集體行動問題：
除非廣告主透過 HTTPs 發行，網站營運者無法不損失廣告營收而移轉為 HTTPS；
但在網站營運者移轉為 HTTPS 之前，廣告主沒有什麼動力去發行 HTTPS。


廣告主至少應該透過 HTTPS 提供廣告服務
 (例如完成此指南中的「在您伺服器上啟用 HTTPS」)。 很多廣告主已經做了。 您應該要求完全不提供 HTTPS 服務的廣告主，
至少要起個頭。 在足夠的廣告主正確互通之前，
您可能會想延緩完成此指南的「讓內部網站 URL 具相對性」部分。

