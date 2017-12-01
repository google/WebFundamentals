project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您只需爲每個頁面添加幾行代碼，就可以影響通過社交媒體分享時網站的呈現方式。這可能有助於吸引更多的人訪問您的網站，因爲提供的預覽所包含的信息要比以其他方式提供的信息更加豐富。

{# wf_updated_on:2014-11-08 #}
{# wf_published_on:2014-10-07 #}

# 社交發現 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

您只需爲每個頁面添加幾行代碼，就可以影響通過社交媒體分享時網站的呈現方式。
這可能有助於吸引更多的人訪問您的網站，因爲提供的預覽所包含的信息要比以其他方式提供的信息更加豐富。




### TL;DR {: .hide-from-toc }
- 使用 schema.org microdata 來提供 Google+ 的頁面標題、說明和圖片。
- 使用開放圖表協議 (OGP) 來提供 Facebook 的頁面標題、說明和圖片。
- 使用 Twitter Card 來提供 Twitter 的頁面標題、說明、圖片以及 Twitter ID。

您只需爲每個頁面添加幾行代碼，就可以影響通過社交媒體分享時網站的呈現方式。
這可能有助於提高吸引力，因爲提供的預覽所包含的信息要比以其他方式提供的信息更加豐富。如果沒有它，社交網站只能提供不含圖片或其他有幫助信息的基本信息。


 

您認爲下面哪一個被點擊的可能性更大？用戶容易被圖片吸引，如果能提前預覽，就會更堅信他們會喜歡自己找到的內容。



<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      使用了適當的標記：包含正確的標題、簡短說明和圖片。
添加這些項目可能有助於提高吸引力。</figcaption>


  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      未使用適當的標記，只包含頁面標題。</figcaption>


  </figure>
</div>

<div style="clear:both;"></div>

當社交網絡上的某個人想把您的網站分享給自己的朋友時，他們多半會添加一些註釋來說明它有多棒，然後再進行分享。但描述網站往往是件麻煩事，並且從網頁所有者的觀點來看，描述的內容可能抓不住要點。某些服務會對用戶可以在註釋中輸入的字符數作出限制。


您可以通過向頁面添加適當的元數據來提供標題、說明和吸引人的圖片，從而簡化用戶的分享過程。這意味着他們不必將寶貴的時間（或字符）浪費在描述鏈接上。


## 使用 schema.org + microdata 在 Google+ 上提供豐富的摘要

抓取工具使用許多方法來解析頁面和識別其內容。通過使用 [microdata](http://www.w3.org/TR/microdata/){: .external }和 [schema.org](https://schema.org/){: .external } 詞彙，您可以幫助社交網站和搜索引擎更有效地識別頁面的內容。




下面是一個示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

儘管大多數元數據嵌入在網頁的 head 部分，但 microdata 則是位於存在上下文的位置。


### 添加 `itemscope` 來定義 microdata 作用域
通過添加 `itemscope`，您可以將標記指定爲一個有關特定項的內容塊。


### 添加 `itemtype` 來定義網站類型
您可以將 `itemtype` 屬性與 `itemscope` 聯用來指定項目的類型。
`itemtype` 的值可根據網頁上的內容類型確定。
您應該可以在[此頁面](https://schema.org/docs/full.html)中找到一個相關值。


### 添加 `itemprop` 來使用 schema.org 詞彙描述每個項目
`itemprop` 定義作用域中 `itemtype` 的屬性。對於向社交網站提供元數據，典型的 `itemprop` 值爲 `name`、`description` 和 `image`。



### 瞭解詳情
這些 microdata 向抓取工具（通常是 [Google+](https://plus.google.com/){: .external } 和 Google 搜索）提供語義信息。
如需瞭解有關 Google+ 上摘要和渲染的更多信息，請閱讀下列文檔：


* [文章渲染 - Google+ 平臺](/+/web/snippet/article-rendering)
* [摘要 - Google+ 平臺](/+/web/snippet/)

### 驗證豐富摘要
要驗證 Google+ 上的豐富摘要，您可以使用下面這樣的工具：

* [結構化數據測試工具](https://www.google.com/webmasters/tools/richsnippets) - 網站站長工具  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## 使用開放圖表協議 (OGP) 在 Facebook 上提供豐富摘要

[開放圖表協議 (OGP)](http://ogp.me/){: .external } 爲 Facebook 提供了必要的元數據，讓網頁能夠具有與其他 Facebook 對象相同的功能。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

加入網頁的 head 部分時，這些元數據可以在分享網頁時提供豐富的摘要信息。


### 使用 `og:` 帶命名空間的 `meta` 標記來描述元數據
一個 `meta` 標記包括一個 `property` 屬性和一個 `content` 屬性。屬性和內容可取下列值：


<table>
  <thead>
    <tr>
      <th data-th="Property">屬性</th>
      <th data-th="Content">內容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">網頁的標題。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">網頁的說明。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">網頁的規範網址。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">分享的帖子隨附圖片的網址。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">表示網頁類型的字符串。您可以在<a href="https://developers.facebook.com/docs/reference/opengraph/">此處</a>找到適合網頁的字符串。</td>
    </tr>
  </tbody>
</table>

這些元標記向社交網站（通常是 [Google+](https://plus.google.com/){: .external } 和 [Facebook](https://www.facebook.com/){: .external }）的抓取工具提供語義信息。



### 瞭解詳情
如需瞭解有關可以爲 Facebook 帖子附加的內容的更多信息，請訪問  Open Graph Protocol 官方網站。


* [ogp.me](http://ogp.me/){: .external }

### 驗證豐富摘要
要驗證 Facebook 上的標記，您可以使用下面這樣的工具：

* [調試程序](https://developers.facebook.com/tools/debug/){: .external }

## 使用 Twitter Card 在 Twitter 上提供豐富摘要
[Twitter Card](https://dev.twitter.com/docs/cards) 是 [適用於 Twitter 的開放圖表協議](https://twitter.com/){: .external }的一個擴展程序。
它們允許您向包含網頁鏈接的 Tweets 添加圖片和視頻之類的媒體附件。通過添加相應的元數據，可以爲包含網頁鏈接的 Tweets 添加一張卡片，其中包含您添加的豐富細節。


### 使用 `twitter:` 帶命名空間的元標記來描述元數據
爲了讓 Twitter Card 發揮作用，[您的網域必須獲得批准](https://cards-dev.twitter.com/validator)並必須包含以 `twitter:card` 作爲 `name` 屬性而非 `property` 屬性的元標記。


下面是一個快速示例：



  


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

通過將 Twitter ID 指定爲 twitter:site 的值，Twitter 可以將這些信息嵌入到分享的帖子中，這樣用戶就能輕鬆地與頁面所有者進行互動。



<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### 瞭解詳情
如需瞭解有關 Twitter Card 的更多信息，請訪問：

* [Twitter 的開發者網站](https://dev.twitter.com/docs/cards)

### 驗證豐富摘要
爲驗證標記，Twitter 提供了以下工具：

* [Card Validator](https://cards-dev.twitter.com/validator)

## 最佳做法
考慮到所有三個選擇，最佳做法是將它們都加入到網頁中。
下面是一個示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

請注意，microdata 和 OGP 共享某些標記：

* `itemscope` 位於 `head` 標記處
* `title` 和 `description` 在 microdata 與 OGP 之間共享
* `itemprop="image"` 使用帶 `href` 屬性的 `link` 標記，而不是重複使用帶 `property="og:image"` 的 `meta` 標記
最後，務必驗證網頁在各社交網站上的呈現方式合乎預期，然後再進行發佈。
  





{# wf_devsite_translation #}
