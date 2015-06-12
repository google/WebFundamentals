---
layout: article
title: "ブラウザ UI を表示しない"
description: "ユーザーは特別なコードを使用せずにホーム画面にサイトを追加することができますが、ホーム画面から起動したときにブラウザの UI のないウェブ アプリの表示を行うことをお勧めします (効果的に全画面表示に移動します)。"
introduction: "ユーザーは特別なコードを使用せずにホーム画面にサイトを追加することができますが、ホーム画面から起動したときにブラウザの UI のないウェブ アプリの表示を行うことをお勧めします (効果的に全画面表示に移動します)。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

次のコードをページの `<head>` に追加します。

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


これによって、Mobile Safari にウェブ アプリを取り扱っている
ことを通知します。

Internet Explorer ではこの指示は不要です。
サイトはデフォルトで全画面が起動するためです。

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>ウェブ アプリ対応のメタタグによるサイトの起動</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
