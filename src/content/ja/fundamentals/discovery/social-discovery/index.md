project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: サイトの各ページにコードを数行追加すると、ソーシャル メディアでサイトを共有する際の表示内容を変更できます。この処理を行うことで、リッチな情報が追加でプレビュー表示され、より多くの人にサイトを閲覧してもらうことができます。

{# wf_updated_on:2014-11-08 #}
{# wf_published_on:2014-10-07 #}

# ソーシャル ディスカバリー {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

サイトの各ページにコードを数行追加すると、ソーシャル メディアでサイトを共有する際の表示内容を変更できます。
この処理を行うことで、リッチな情報が追加でプレビュー表示され、より多くの人にサイトを閲覧してもらうことができます。




### TL;DR {: .hide-from-toc }
- schema.org microdata を使用して、ページのタイトル、説明、Google+ 用の画像を提供します。
- Open Graph Protocol（OGP）を使用して、ページのタイトル、説明、Facebook 用の画像を提供します。
- Twitter カードを使用して、ページのタイトル、説明、画像、Twitter の Twitter ID を提供します。

サイトの各ページにコードを数行追加すると、ソーシャル メディアでサイトを共有する際の表示内容を変更できます。
リッチな情報を追加でプレビュー表示すると、エンゲージメントを高めることができます。この対応を行わないと、ソーシャル サイトの基本情報しか表示されず、画像やその他の有用な情報が提供されません。


 

ユーザーは以下のどちらのページをクリックする可能性が高いと思いますか。ユーザーは画像に引かれるため、先にプレビューが目に入ると、そのサイトにさらに興味を持つようになります。



<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      適切なマークアップが設定されている場合: 正しいタイトル、短い説明、画像が含まれています。
これらのアイテムを追加すると、エンゲージメントを高めることができます。</figcaption>


  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      適切なマークアップが設定されていない場合: ページ タイトルのみが表示されています。</figcaption>


  </figure>
</div>

<div style="clear:both;"></div>

ユーザーがソーシャル ネットワークで任意のウェブサイトを友人と共有する場合、そのユーザーはウェブサイトの魅力を伝えるコメントを追加したうえで、友人に紹介するでしょう。しかし、一般的にウェブサイトの説明は面倒であり、説明の内容が本来のページの趣旨からずれてしまうこともあります。また、サービスによっては、コメントとして入力できる文字数に制限があります。


適切なメタデータをページに追加すると、タイトルや説明、魅力的な画像が表示されるため、ユーザーの共有プロセスを簡素化することができます。つまり、ユーザーは貴重な時間（または文字）を使って、リンク先のサイトの説明をせずに済みます。


##  schema.org と microdata を使用して Google+ にリッチ スニペットを表示する

クローラはさまざまな方法でページを解析し、そのコンテンツを把握しています。[microdata](http://www.w3.org/TR/microdata/){: .external } と [schema.org](https://schema.org/){: .external } のボキャブラリを使用すると、ソーシャル サイトと検索エンジンによってページのコンテンツがより適切に把握されるようになります。




次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

ほとんどのメタデータはウェブページのヘッダー部分に埋め込みますが、microdata はコンテキストがある場所に挿入します。


###  `itemscope` を追加して microdata のスコープを定義する
`itemscope` を追加すると、タグを特定のアイテムに関するコンテンツのブロックとして指定できます。


###  `itemtype` を追加してウェブサイトのタイプを定義する
`itemscope` と一緒に `itemtype` 属性を使用すると、アイテムのタイプを指定できます。
`itemtype` の値は、ウェブページのコンテンツ タイプに応じて決まります。
[このページ](https://schema.org/docs/full.html)で関連する値を見つけることができます。


###  `itemprop` を追加して schema.org ボキャブラリで各アイテムを記述する
`itemprop` は、スコープ内の `itemtype` のプロパティを定義します。メタデータをソーシャル サイトに提供する場合、一般的に使用する `itemprop` の値は `name`、`description`、および `image` です。



###  詳細
このような microdata によって、主に [Google+](https://plus.google.com/){: .external } や Google 検索用の意味情報がクローラに提供されます。
Google+ のスニペットやレンダリングの詳細については、次のドキュメントをご覧ください。


* [Article Rendering - Google+ Platform](/+/web/snippet/article-rendering)
* [Snippet - Google+ Platform](/+/web/snippet/)

###  リッチ スニペットを検証する
Google+ のリッチ スニペットを検証する場合、次のようなツールを使用できます。

* [構造化データ テストツール](https://www.google.com/webmasters/tools/richsnippets) - ウェブマスター ツール  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

##  Open Graph Protocol（OGP）を使用して Facebook でリッチ スニペットを表示する

[Open Graph Protocol（OGP）](http://ogp.me/){: .external }は、Facebook にメタデータを提供します。このメタデータは、ウェブページに他の Facebook オブジェクトと同じ機能を提供するために必要です。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

このメタデータをページのヘッダー部分に含めると、ページが共有されたときに、リッチ スニペットの情報が表示されます。


### `og:` 名前空間付きの `meta` タグを使用してメタデータを記述する
`meta` タグは、`property` 属性と `content` 属性で構成されます。使用できるプロパティの値と内容は以下のとおりです。


<table>
  <thead>
    <tr>
      <th data-th="Property">プロパティ</th>
      <th data-th="Content">内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">ウェブページのタイトル。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">ウェブページの説明。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">ウェブページの正規 URL。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">共有する投稿に添付する画像の URL。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">ウェブページのタイプを示す文字列。<a href="https://developers.facebook.com/docs/reference/opengraph/">ここで</a>ウェブページに適した文字列を見つけることができます。</td>
    </tr>
  </tbody>
</table>

これらのメタタグによって、主に [Google+](https://plus.google.com/){: .external } や [Facebook](https://www.facebook.com/){: .external } などのソーシャル サイトのクローラに意味情報が提供されます。



###  詳細
Facebook の投稿に表示できる画像やデータの詳細については、Open Graph Protocol の公式サイトをご覧ください。


* [ogp.me](http://ogp.me/){: .external }

###  リッチ スニペットを検証する
Facebook のマークアップを検証する場合、次のようなツールを使用できます。

* [Debugger](https://developers.facebook.com/tools/debug/){: .external }

##  Twitter カードを使用して Twitter にリッチ スニペットを表示する
[Twitter カード](https://dev.twitter.com/docs/cards)は、[Twitter に適用できる Open Graph Protocol](https://twitter.com/){: .external } の拡張機能です。
Twitter カードを使用すると、ウェブページへのリンクを含むツイートに、画像や動画などのメディアを添付できます。適切なメタデータを追加することで、ウェブページへのリンクが記載されたツイートに、詳細なリッチメディアを追加したカードが表示されるようになります。


###  `twitter:` 名前空間付きメタタグを使用してメタデータを記述する
Twitter カードを適切に表示するには、[ドメインが承認されている](https://cards-dev.twitter.com/validator)ことに加えて、`property` 属性ではなく、`name` 属性を使用して `twitter:card` を含むメタタグを指定する必要があります。簡単な例を次に示します



  


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Twitter ID の値を twitter:site に指定すると、この情報が共有される投稿に埋め込まれます。これにより、閲覧者がページの所有者と簡単に交流できるようになります。



<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

###  詳細
Twitter カードの詳細については、次のサイトをご覧ください。

* [Twitter のデベロッパー サイト](https://dev.twitter.com/docs/cards)

###  リッチ スニペットを検証する
マークアップの検証のために、Twitter では次のツールが用意されています。

* [Card Validator](https://cards-dev.twitter.com/validator)

##  ベスト プラクティス
ベスト プラクティスは、ウェブページに対して上記の 3 つの対策をすべて実施することです。
次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

microdata と OGP が同じマークアップを共有していることに注目してください。

* `itemscope` は、`head` タグにあります。
* `title` と `description` は、microdata と OGP で共有されています。
* `itemprop="image"` は、`property="og:image"` を指定した `meta` タグを再利用する代わりに、`href` 属性を指定した `link` タグを使用しています。

最後に、ウェブページを公開する前に、各ソーシャル サイトにウェブページが想定どおりに表示されることを確認してください。
  





{# wf_devsite_translation #}
