project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 微小調整 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



微小調整只是對版面配置做出小小變更，例如調整字型大小 、調整影像大小，或小幅移動內容。  

它適用於單欄版面配置，例如單網頁線性網站、大量文字
的文章。

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  嘗試一下
{% endlink_sample %}

顧名思義，螢幕大小變更時，此範例也沒什麼變化。
螢幕寬度越大，字型和邊框間距也是如此。

使用這種模式的網站包括：

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/tiny-tweaks.html" region_tag="ttweaks" lang=css %}
</pre>


