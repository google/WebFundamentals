project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:網站的訪問者不只有人類，還有搜索引擎網絡抓取工具。瞭解如何改善您的網站的搜索精度和排名。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2014-08-30 #}

# 搜索優化 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

網站的訪問者不只有人類，還有搜索引擎網絡抓取工具。瞭解如何改善您的網站的搜索精度和排名。

### TL;DR {: .hide-from-toc }
- 確定網頁的網址結構。
- 自適應設計是最受推崇的設計方法。
- 爲獨立的桌面版本/移動版本網站使用  <code>rel='canonical'</code> + <code>rel='alternate'</code>。
- 爲動態提供獨立桌面版本/移動版本 HTML 的單個網址使用 <code>Vary HTTP</code> 標頭。
- 爲您想僅限知曉網址的人訪問的頁面使用 <code>noindex</code>。
- 爲您想保持私有狀態的頁面使用相關身份驗證機制。

## 向搜索引擎提供您的網站結構

您的網站如何出現在搜索結果中對多設備網站設計具有重要意義。本指南會幫助您根據網站的網址結構對其進行搜索引擎優化。

您是否計劃構建自適應網頁？是否提供採用獨立網址的移動設備專用版本？
您是否從同一網址同時提供桌面版本和移動版本？
無論是哪一種情況，您始終都能對網站做進一步的搜索引擎優化。


### 指定網站的網址結構

可以通過幾種方式向不同設備提供內容。以下是三種最常見的方法：


**自適應網頁設計**：從一個網址提供相同的 HTML，並使用 CSS 媒體查詢來確定內容在客戶端的渲染方式。例如，桌面和移動版本網址：http://www.example.com/



**獨立移動版本網站**：根據 User Agent 將用戶重定向至不同的網址。
例如，桌面版本網址：http://www.example.com/ 移動版本網址：http://m.example.com/


**動態提供**：根據 User Agent 從一個網址提供不同的 HTML。
例如，桌面和移動版本網址：http://www.example.com/

儘管許多網站採用了其他方法，但最佳方法是使用**自適應網頁設計**。
 
確定哪一種網址結構適合您的網頁。然後，試着按照相應的最佳做法對其進行搜索引擎優化。


### 我們建議採用自適應網頁設計

讓您的網站採用自適應設計的優點如下：

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* 更便於用戶分享。
* 網頁加載更迅速，無需重定向。
* 單一搜索結果網址。

<div style="clear:both;"></div>
  
可通過[自適應網頁設計基礎知識](/web/fundamentals/design-and-ux/responsive/)瞭解如何構建採用自適應網頁設計的網站。

### 提供獨立網址時使用 `link[rel=canonical]` 和 `link[rel=alternate]`

如果使用不同網址在桌面版本和移動版本上提供類似內容，可能同時給用戶和搜索引擎帶來困惑，因爲查看者並不能輕易發現它們旨在具有完全相同的內容。您應該指示：

* 這兩個網址的內容完全相同。
* 哪一個是移動版本。
* 哪一個是桌面（規範）版本。

這些信息有助於搜索引擎優化索引內容，以及確保用戶找到的目標內容採用的格式適合其所用設備。


#### 爲桌面版本使用 alternate

提供桌面版本時，可通過添加帶 `rel="alternate" 屬性的 `link` 標記指示還有采用其他網址的移動版本，該標記指向 `href` 屬性中的移動版本。



[http://www.example.com/](http://www.example.com/){: .external } HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### 爲移動版本使用 canonical

提供移動版本時，可通過添加帶 `rel="canonical"` 屬性的 `link` 標記指示還有采用其他網址的桌面（規範）版本，該標記指向 `href` 屬性中的桌面版本。通過添加值爲 `"only screen and (max-width: 640px)"` 的 `media` 屬性幫助搜索引擎瞭解，移動版本明確適用於較小屏幕。


[http://m.example.com/](http://m.example.com/){: .external } HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### 使用 Vary HTTP 標頭

根據設備類型提供不同的 HTML 可減少不必要的重定向、提供經過優化的 HTML 以及爲搜索引擎提供單一網址。
但它也有幾個缺點：


* 用戶瀏覽器與服務器之間可能存在中間代理。除非代理知曉內容隨 User Agent 而變化，否則其提供的結果可能出乎意料。
* 根據 User Agent 更改內容存在被視爲“[掩蔽](https://support.google.com/webmasters/answer/66355)”的風險，這是違反 Google 網站站長指南的行爲。



通過讓搜索引擎知曉內容隨 User Agent 而變化，它們就能針對發送查詢的 User Agent 對搜索結果進行優化。


要指示網址根據 User Agent 提供不同的 HTML，請在 HTTP 標頭中提供一個 `Vary: User-Agent`。
這樣一來，搜索索引便可對桌面和移動版本進行區別對待，中間代理也可以妥善緩存這些內容。



[http://www.example.com/](http://www.example.com/){: .external } HTTP Header


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

如需瞭解有關構建跨桌面和移動版本的網址結構的更多信息，請閱讀[有關構建智能手機優化網站的內容](/webmasters/smartphone-sites/)。


## 控制來自搜索引擎的抓取和索引操作

將網站妥善列入搜索引擎對將其推廣至全球至關重要，但不良配置可能導致結果中包含意料之外的內容。此部分通過說明抓取工具的工作和網站索引編制原理來幫助您避免此類問題。


沒有比網絡更好的信息共享場所。當您發佈一份文檔時，全世界可立即獲得。
任何知曉網址的人都能看到網頁。
搜索引擎的作用就在於此。它們必須能夠找到您的網站。

不過，在某些情況下，儘管您希望人們訪問您的網站，卻不想讓他們找到這些文檔。
例如，博客的管理員頁面只有特定人員纔有權訪問。
讓人們通過搜索引擎找到這些頁面沒什麼好處。


此部分還說明如何禁止某些頁面出現在搜索結果中。


### “抓取”與“索引”之間的區別

在瞭解如何控制搜索結果之前，您需要先了解搜索引擎如何與您的網頁進行交互。從網站的視角來看，搜索引擎對網站執行的操作主要有兩項：抓取和索引。  

**抓取**是指搜索引擎自動程序獲取網頁以分析其內容。內容存儲在搜索引擎的數據庫中，可用於填充搜索結果詳情、爲網頁排名以及通過逐層深入鏈接發現新的網頁。  

**索引**是指搜索引擎將網站的網址以及任何關聯信息存儲在其數據庫內，以便隨時充當搜索結果。 

注：許多人混淆了抓取和索引。禁止抓取並不意味着網頁不會出現在搜索結果中。例如，如果某個第三方網站具有您的某個網頁的鏈接，即使禁止了抓取，也仍可對其進行索引。在此情況下，搜索結果將缺少詳細說明。

### 使用 robots.txt 控制抓取

您可以利用名爲 `robots.txt` 的文本文件控制良性抓取工具獲取網頁的方式。`Robots.txt` 是一個簡單的文本文件，用於說明您希望搜索自動程序如何抓取您的網站。
（並非所有抓取工具都一定會遵守 `robots.txt`。
料想一定有人會自行創建不正當的抓取工具。）

將 `robots.txt` 置於網站主機的根目錄。例如，如果網站的主機是 `http://pages.example.com/`，則 `robots.txt` 文件應位於 `http://pages.example.com/robots.txt`。如果該域名有不同的架構、子域名或其他端口，則將其視爲不同的主機，應在每個主機的根目錄中放置 `robots.txt`。




以下是一個簡短的示例：  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

這表示您想禁止所有自動程序抓取您的整個網站。


下面是另一個示例：

**http://pages.example.com/robots.txt**

    User-agent:Googlebot
    Disallow: /nogooglebot/
    

您可以通過指示 User Agent 名稱來指定每個自動程序 (User Agent) 的行爲。
在上例中，您禁止名爲 `Googlebot` 的 User Agent 抓取 `/nogooglebot/` 以及該目錄下的所有內容。
  

可通過各搜索引擎自動程序的幫助頁面瞭解更多相關信息：

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


注：**僅當**您想控制網站的抓取方式時，才需要使用 `robots.txt`。請勿爲網址 `/robots.txt` 返回響應代碼 500。這會終止對整個主機的所有後續抓取，導致搜索結果詳情不包含任何內容。

#### 測試 robots.txt

根據 robots.txt 所針對的抓取工具，搜索引擎提供商可能會提供相應工具來測試 `robots.txt`。
例如，對於 Google，其[網站站長工具](https://www.google.com/webmasters/tools/robots-testing-tool)中有一個驗證器可用來測試 robots.txt。




<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex 也提供了[類似的工具](https://webmaster.yandex.com/tools/robotstxt/)。  

### 使用元標記控制搜索索引

如果您不希望網頁出現在搜索結果中，則 robots.txt 並非解決方案。
您需要允許抓取這些網頁，並明確指示您不希望對它們進行索引。
有以下兩個解決方案：

要表示您不希望索引某個 HTML 網頁，請使用特定類型的 `<meta>` 標記，並將其屬性設置爲 `name="robots"` 和 `content="noindex"`。  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

您可以通過將 `name` 屬性的值更改爲特定 User Agent 名稱來縮小範圍。例如，`name="googlebot"`（不區分大小寫）表示您不希望 Googlebot 索引該網頁。  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

robots 元標記的其他選項包括：  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

#### X-Robots-Tag

要表示您不希望索引圖像、樣式表或腳本文件等資源，請在 HTTP 標頭中添加 `X-Robots-Tag: noindex`。



    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

如果您想把範圍縮小到特定 User Agent，請在 `noindex` 前插入 User Agent 名稱。  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

如需瞭解有關 X-Robots-Tag 的更多信息：  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

注：如果您利用 `robots.txt` 禁止抓取，由於並不知曉您不希望索引這些網頁，搜索自動程序可能仍會對它們進行索引。之所以可能發生這種情況，是因爲：<ul><li>搜索自動程序可能是循着其他網站上的鏈接找到您的網頁。</li><li>無法抓取的搜索引擎檢測不到  <code>noindex</code>。</li></ul>

別指望 `robots.txt` 能夠控制搜索索引。

### 不同內容類型的示例

什麼是控制抓取和索引的最佳解決方案？以下是一些針對不同網頁類型的示例解決方案。

#### 可供任何人全面訪問和搜索的網頁

網絡上的大多數網頁均屬這一類型。  

* 無需使用 `robots.txt`。
* 無需使用 robots 元標記。

#### 僅限知曉網址的人員訪問

示例包括：  

* 博客管理員控制檯的登錄頁面。
* 通過傳遞面向初級互聯網用戶的網址分享的私有內容。

在此情況下，您不希望搜索引擎索引這些網頁。  

* 無需使用 `robots.txt`。
* 爲 HTML 網頁使用 `noindex` 元標記。
* 爲非 HTML 資源（圖像、PDF 等）使用 `X-Robots-Tag: noindex`。

注：想知道您是否應禁止抓取 JavaScript 和樣式表文件？<a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google 會盡最大努力理解它們</a>，以便能找到通過 AJAX 等現代化技術提供的內容。您當然應該允許抓取工具抓取 JavaScript。

#### 僅限獲得授權的人員訪問

在此情況下，即使有人找到了網址，如果沒有有效憑據，服務器也會拒絕提供結果。例如：  

* 社交網絡上私人分享的內容。
* 企業支出系統。

對於這些類型的網頁，搜索引擎應該既不抓取也不索引它們。  

* 爲憑據無效的訪問返回響應代碼 401“未經授權”（或將用戶重定向至登錄頁面）。
* 請勿使用 `robots.txt` 禁止抓取這些網頁。否則將檢測不到 401。

此處的限制機制可能是 IP 地址、Cookie、初級身份驗證、OAuth 等。
如何實現此類身份驗證/授權取決於您的基礎架構，這些內容超出了本文的範圍。


### 請求從搜索引擎中移除網頁

在下列情況下，您可能希望移除某個搜索結果：  

* 頁面不再存在。
* 某個被意外索引的網頁包含機密信息。


主流搜索引擎均提供了通過發送請求來移除此類網頁的途徑。移除過程通常包含下列步驟：  

1. 確保您想移除的網頁：
    * 已從服務器刪除，並返回 404
    * 配置爲不進行索引（例如：noindex）

1. 轉到各搜索引擎上的請求頁面。（Google 和 Bing 要求您註冊並驗證對網站的所有權。）
1. 發送一個請求。

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

可在各搜索引擎的幫助頁面查看具體步驟：  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### 附錄：抓取工具 User Agent 列表

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
