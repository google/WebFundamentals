---
title: "Redirect HTTP to HTTPS"
updated_on: 2015-03-27
key-takeaways:
  - ページの先頭に標準リンクを置いて、検索エンジンに、https がサイトを取得するための最良の方法であることを伝えます。
---

<p class="intro">
  
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

ページに &lt;link rel="canonical" href="https://…"/&gt; タグを設定します。 [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
サイトを取得するための最良の方法を知っています。

ほとんどのウェブ サーバーは、単純なリダイレクト機能を提供しています。 301 (完全に移動) を使用して、
HTTPS のバージョンが標準であり、ユーザーを HTTP からサイトの HTTPS バージョンにリダイレクトすることを、検索エンジンやブラウに示します。

