---
title: "保持內部網站的 URL 相對性"
description: "既然您已同時以 HTTP 和 HTTPS 提供網站服務，網站也應該能無視通訊協定，儘可能順暢運作。"
updated_on: 2015-03-27
key-takeaways:
  - 確定內部網站 URL 與外部 URL 無視通訊協定，也就是 請確保您使用相對路徑，或不使用像 //example.com/something.js 這樣的通訊協定
---

<p class="intro">
  既然您已同時以 HTTP 和 HTTPS 提供網站服務，網站也必需能無視通訊協定，儘可能順暢運作。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

但當您透過包含 HTTP 資源：
[混合
內容](http://www.w3.org/TR/mixed-content/)的 HTTPS 供應頁面時，會出現一個問題，  瀏覽器的會警告使用者，HTTPS 的完整優點已經喪失。


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


**注意：** 請以指令碼為之，而非手動。 如果您的網站內容是在資料庫中，
您應該將指令碼在資料庫的開發副本上測試。
 如果您的網站內容是在簡單的純檔案中，
在這些檔案的開發副本上測試您的指令碼。 像平常一樣，只有在變更通過 QA 時，
才將變更推送至生產線。 您可以使用 [Bram van Damme 
的指令碼](https://github.com/bramus/mixed-content-scan) 或類似的東西，以偵測您網站中的混合內容。


**注意：** 當連結至其他網站時 (而非包含其資源)，請不要改變通訊協定，
因為您無法控制這些網站的運作方式。


**注意：** 我推薦使用通訊協定相對的 URL，
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


