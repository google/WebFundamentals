project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您只需为每个页面添加几行代码，就可以影响通过社交媒体分享时网站的呈现方式。这可能有助于吸引更多的人访问您的网站，因为提供的预览所包含的信息要比以其他方式提供的信息更加丰富。

{# wf_updated_on:2014-11-08 #}
{# wf_published_on:2014-10-07 #}

# 社交发现 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

您只需为每个页面添加几行代码，就可以影响通过社交媒体分享时网站的呈现方式。
这可能有助于吸引更多的人访问您的网站，因为提供的预览所包含的信息要比以其他方式提供的信息更加丰富。




### TL;DR {: .hide-from-toc }
- 使用 schema.org microdata 来提供 Google+ 的页面标题、说明和图片。
- 使用开放图表协议 (OGP) 来提供 Facebook 的页面标题、说明和图片。
- 使用 Twitter Card 来提供 Twitter 的页面标题、说明、图片以及 Twitter ID。

您只需为每个页面添加几行代码，就可以影响通过社交媒体分享时网站的呈现方式。
这可能有助于提高吸引力，因为提供的预览所包含的信息要比以其他方式提供的信息更加丰富。如果没有它，社交网站只能提供不含图片或其他有帮助信息的基本信息。


 

您认为下面哪一个被点击的可能性更大？用户容易被图片吸引，如果能提前预览，就会更坚信他们会喜欢自己找到的内容。



<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      使用了适当的标记：包含正确的标题、简短说明和图片。
添加这些项目可能有助于提高吸引力。</figcaption>


  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      未使用适当的标记，只包含页面标题。</figcaption>


  </figure>
</div>

<div style="clear:both;"></div>

当社交网络上的某个人想把您的网站分享给自己的朋友时，他们多半会添加一些注释来说明它有多棒，然后再进行分享。但描述网站往往是件麻烦事，并且从网页所有者的观点来看，描述的内容可能抓不住要点。某些服务会对用户可以在注释中输入的字符数作出限制。


您可以通过向页面添加适当的元数据来提供标题、说明和吸引人的图片，从而简化用户的分享过程。这意味着他们不必将宝贵的时间（或字符）浪费在描述链接上。


## 使用 schema.org + microdata 在 Google+ 上提供丰富的摘要

抓取工具使用许多方法来解析页面和识别其内容。通过使用 [microdata](http://www.w3.org/TR/microdata/){: .external }和 [schema.org](https://schema.org/){: .external } 词汇，您可以帮助社交网站和搜索引擎更有效地识别页面的内容。




下面是一个示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

尽管大多数元数据嵌入在网页的 head 部分，但 microdata 则是位于存在上下文的位置。


### 添加 `itemscope` 来定义 microdata 作用域
通过添加 `itemscope`，您可以将标记指定为一个有关特定项的内容块。


### 添加 `itemtype` 来定义网站类型
您可以将 `itemtype` 属性与 `itemscope` 联用来指定项目的类型。
`itemtype` 的值可根据网页上的内容类型确定。
您应该可以在[此页面](https://schema.org/docs/full.html)中找到一个相关值。


### 添加 `itemprop` 来使用 schema.org 词汇描述每个项目
`itemprop` 定义作用域中 `itemtype` 的属性。对于向社交网站提供元数据，典型的 `itemprop` 值为 `name`、`description` 和 `image`。



### 了解详情
这些 microdata 向抓取工具（通常是 [Google+](https://plus.google.com/){: .external } 和 Google 搜索）提供语义信息。
如需了解有关 Google+ 上摘要和渲染的更多信息，请阅读下列文档：


* [文章渲染 - Google+ 平台](/+/web/snippet/article-rendering)
* [摘要 - Google+ 平台](/+/web/snippet/)

### 验证丰富摘要
要验证 Google+ 上的丰富摘要，您可以使用下面这样的工具：

* [结构化数据测试工具](https://www.google.com/webmasters/tools/richsnippets) - 网站站长工具  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## 使用开放图表协议 (OGP) 在 Facebook 上提供丰富摘要

[开放图表协议 (OGP)](http://ogp.me/){: .external } 为 Facebook 提供了必要的元数据，让网页能够具有与其他 Facebook 对象相同的功能。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

加入网页的 head 部分时，这些元数据可以在分享网页时提供丰富的摘要信息。


### 使用 `og:` 带命名空间的 `meta` 标记来描述元数据
一个 `meta` 标记包括一个 `property` 属性和一个 `content` 属性。属性和内容可取下列值：


<table>
  <thead>
    <tr>
      <th data-th="Property">属性</th>
      <th data-th="Content">内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">网页的标题。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">网页的说明。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">网页的规范网址。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">分享的帖子随附图片的网址。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">表示网页类型的字符串。您可以在<a href="https://developers.facebook.com/docs/reference/opengraph/">此处</a>找到适合网页的字符串。</td>
    </tr>
  </tbody>
</table>

这些元标记向社交网站（通常是 [Google+](https://plus.google.com/){: .external } 和 [Facebook](https://www.facebook.com/){: .external }）的抓取工具提供语义信息。



### 了解详情
如需了解有关可以为 Facebook 帖子附加的内容的更多信息，请访问  Open Graph Protocol 官方网站。


* [ogp.me](http://ogp.me/){: .external }

### 验证丰富摘要
要验证 Facebook 上的标记，您可以使用下面这样的工具：

* [调试程序](https://developers.facebook.com/tools/debug/){: .external }

## 使用 Twitter Card 在 Twitter 上提供丰富摘要
[Twitter Card](https://dev.twitter.com/docs/cards) 是 [适用于 Twitter 的开放图表协议](https://twitter.com/){: .external }的一个扩展程序。
它们允许您向包含网页链接的 Tweets 添加图片和视频之类的媒体附件。通过添加相应的元数据，可以为包含网页链接的 Tweets 添加一张卡片，其中包含您添加的丰富细节。


### 使用 `twitter:` 带命名空间的元标记来描述元数据
为了让 Twitter Card 发挥作用，[您的网域必须获得批准](https://cards-dev.twitter.com/validator)并必须包含以 `twitter:card` 作为 `name` 属性而非 `property` 属性的元标记。


下面是一个快速示例：



  


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

通过将 Twitter ID 指定为 twitter:site 的值，Twitter 可以将这些信息嵌入到分享的帖子中，这样用户就能轻松地与页面所有者进行互动。



<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### 了解详情
如需了解有关 Twitter Card 的更多信息，请访问：

* [Twitter 的开发者网站](https://dev.twitter.com/docs/cards)

### 验证丰富摘要
为验证标记，Twitter 提供了以下工具：

* [Card Validator](https://cards-dev.twitter.com/validator)

## 最佳做法
考虑到所有三个选择，最佳做法是将它们都加入到网页中。
下面是一个示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

请注意，microdata 和 OGP 共享某些标记：

* `itemscope` 位于 `head` 标记处
* `title` 和 `description` 在 microdata 与 OGP 之间共享
* `itemprop="image"` 使用带 `href` 属性的 `link` 标记，而不是重复使用带 `property="og:image"` 的 `meta` 标记
最后，务必验证网页在各社交网站上的呈现方式合乎预期，然后再进行发布。
  





{# wf_devsite_translation #}
