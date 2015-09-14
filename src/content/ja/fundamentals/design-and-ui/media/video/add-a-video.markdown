---
title: "動画を追加する"
description: "動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。"
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "動画要素を使用して、サイトで動画の読み込み、デコード、再生を行う。"
    - "多様なモバイル プラットフォームに対応できるように複数の形式で動画を生成する。"
    - "動画がコンテナからはみ出さないように動画のサイズを正しく設定する。"
    - "動画要素の子としてトラック要素を追加し、利用しやすさの問題に対応する。"
notes:
  media-fragments:
    - "Media Fragments API は、ほとんどのプラットフォームでサポートされていますが、iOS ではサポートされていません。"
    - "お使いのサーバーで Range リクエストがサポートされていることを確認してください。ほとんどのサーバーで Range リクエストはデフォルトで有効になっていますが、一部のホスティング サーバーでは無効になっている場合があります。"
  dont-overflow:
    - "要素のサイズ設定で、元の動画と異なるアスペクト比を使用しないでください。画面を縮めたり引き延ばしたりすると、動画の表示が崩れます。"
  accessibility-matters:
    - "トラック要素は、Firefox を除き、Chrome for Android、iOS Safari、および現在デスクトップで使用されているすべてのブラウザでサポートされています（<a href='http://caniuse.com/track' title='トラック要素のサポート状況'>caniuse.com/track</a> をご覧ください）。polyfill も使用できます。Google では、<a href='//www.delphiki.com/html5/playr/' title='Playr トラック要素の polyfill'>Playr</a> または <a href='//captionatorjs.com/' title='Captionator トラック'>Captionator</a> をおすすめします。"
  construct-video-streams:
    - "MSE は、Chrome の Android と Opera、デスクトップの Internet Explorer 11 と Chrome でサポートされており、また <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions の実装予定'>Firefox</a> でもサポートされる予定です。"
  optimize:
    - "<a href='../images/'>画像</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>コンテンツの効率の最適化</a>"
---

<p class="intro">
  動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## 動画要素を追加する

サイトで動画の読み込み、デコード、再生を行うための動画要素を追加します。

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>お使いのブラウザは、動画要素をサポートしていません。</p>
</video>
{% endhighlight %}

## 複数のファイル形式を指定する

すべてのブラウザが同じ動画形式をサポートしているとは限りません。
<source> 要素では、ユーザーのブラウザがいずれかの形式をサポートしていない場合の代替として、複数の形式を指定することができます。
次に例を示します。

{% include_code src=_code/video-main.html snippet=sourcetypes %}

ブラウザは <source> タグを解析する際に、オプションの type 属性を使用して、どのファイルをダウンロードして再生するかを判断します。ブラウザが WebM をサポートしている場合は chrome.webm を再生し、サポートしていない場合は MPEG-4 動画を再生できます。
ウェブで動画と音声を使用する方法については、<a href='//www.xiph.org/video/vid1.shtml' title=デジタル動画に関する、楽しくてためになる解説動画'>A Digital Media Primer for Geeks</a>（英語）をご覧ください。

このアプローチは、特に携帯端末でさまざまな HTML やサーバー側スクリプトを配信する場合に、次のようなメリットがあります。

* デベロッパーが優先順位に基づいて形式を指定できます。
* ネイティブ クライアント側で切り替えることで、コンテンツを取得する際にリクエストが 1 つだけ生成されるため待ち時間が短縮されます。
* サーバー側でユーザー エージェントの検出機能とサポート データベースを使用するよりも、ブラウザで形式を選択する方がより簡単かつ迅速で、信頼性が高くなる場合があります。
* ファイルごとにソースのタイプを指定するとネットワークのパフォーマンスが向上します。ブラウザが動画の一部をダウンロードして形式を識別しなくても、動画のソースを選択できるためです。

ここに挙げたポイントはすべて、帯域幅と待ち時間が重視され、ユーザーの忍耐に限界があるモバイル コンテキストでは特に重要です。
type 属性を指定しないと、複数のソースの中にサポートされていないタイプが存在する場合に、パフォーマンスに影響する可能性があります。

モバイル ブラウザ デベロッパー ツールを使用して、{% link_sample _code/video-main.html %}type 属性がある場合{% endlink_sample %}と {% link_sample _code/notype.html %}type 属性がない場合{% endlink_sample %}でネットワークのアクティビティを比較してください。
また、ブラウザ デベロッパー ツールでレスポンス ハンドラを確認し、[サーバーが適切な MIME タイプを報告することを確認してください](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)。そうしないと、動画のソースタイプのチェックが機能しません。

## 開始時刻と終了時刻を指定する

帯域幅を節約し、レスポンシブなサイトを構築しましょう。それには、Media Fragments API を使用して、動画要素に開始時間と終了時間を追加します。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

メディア フラグメントを追加するには、メディアの URL に #t=[start_time][,end_time] を追加するだけです。たとえば、5～10 秒の間だけ動画を再生するには、次のように指定します。

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

また、Media Fragments API を使用すると、DVD のキューポイントのように同じ動画の複数のビューを配信することができ、複数のファイルをエンコードして配信する必要はありません。

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

ブラウザ デベロッパー ツールを使用して、レスポンス ヘッダーの Accept-Ranges: bytes を確認します。

<img class="center" alt="Chrome デベロッパー ツールのスクリーンショット: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## ポスター画像を含める

動画要素に poster 属性を追加しておくと、要素が読み込まれたときにユーザーがその内容をすぐに把握できるため、動画をダウンロードして再生する必要がなくなります。

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

ポスターは、動画の src が破損していたり、指定した動画形式がすべてサポートされていない場合の代替手段にもなります。ポスター画像の唯一のデメリットは、追加のファイル リクエストによって帯域幅を消費し、レンダリングが必要になることです。詳しくは、[画像の最適化](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization)をご覧ください。

次に、ポスター画像がある場合とない場合を並べて比較してみましょう。動画ではないことを証明するため、グレースケールのポスター画像を使用しています。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="縦向きの Android Chrome のスクリーンショット、ポスターなし" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="縦向きの Android Chrome のスクリーンショット、ポスターあり" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



