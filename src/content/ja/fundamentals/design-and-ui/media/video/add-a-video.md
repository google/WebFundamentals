project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 動画を追加する {: .page-title }

{% include "_shared/contributors/TODO.html" %}



動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。



## TL;DR {: .hide-from-toc }
- 動画要素を使用して、サイトで動画の読み込み、デコード、再生を行う。
- 多様なモバイル プラットフォームに対応できるように複数の形式で動画を生成する。
- 動画がコンテナからはみ出さないように動画のサイズを正しく設定する。
- 動画要素の子としてトラック要素を追加し、利用しやすさの問題に対応する。


## 動画要素を追加する

サイトで動画の読み込み、デコード、再生を行うための動画要素を追加します。

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>お使いのブラウザは、動画要素をサポートしていません。</p>
    </video>
    

## 複数のファイル形式を指定する

すべてのブラウザが同じ動画形式をサポートしているとは限りません。
<source> 要素では、ユーザーのブラウザがいずれかの形式をサポートしていない場合の代替として、複数の形式を指定することができます。
次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

ブラウザは <source> タグを解析する際に、オプションの type 属性を使用して、どのファイルをダウンロードして再生するかを判断します。ブラウザが WebM をサポートしている場合は chrome.webm を再生し、サポートしていない場合は MPEG-4 動画を再生できます。
ウェブで動画と音声を使用する方法については、<a href='//www.xiph.org/video/vid1.shtml' title=デジタル動画に関する、楽しくてためになる解説動画'>A Digital Media Primer for Geeks</a>（英語）をご覧ください。

このアプローチは、特に携帯端末でさまざまな HTML やサーバー側スクリプトを配信する場合に、次のようなメリットがあります。

* デベロッパーが優先順位に基づいて形式を指定できます。
* ネイティブ クライアント側で切り替えることで、コンテンツを取得する際にリクエストが 1 つだけ生成されるため待ち時間が短縮されます。
* サーバー側でユーザー エージェントの検出機能とサポート データベースを使用するよりも、ブラウザで形式を選択する方がより簡単かつ迅速で、信頼性が高くなる場合があります。
* ファイルごとにソースのタイプを指定するとネットワークのパフォーマンスが向上します。ブラウザが動画の一部をダウンロードして形式を識別しなくても、動画のソースを選択できるためです。

ここに挙げたポイントはすべて、帯域幅と待ち時間が重視され、ユーザーの忍耐に限界があるモバイル コンテキストでは特に重要です。
type 属性を指定しないと、複数のソースの中にサポートされていないタイプが存在する場合に、パフォーマンスに影響する可能性があります。

モバイル ブラウザ デベロッパー ツールを使用して、<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">type 属性がある場合</a>と <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">type 属性がない場合</a>でネットワークのアクティビティを比較してください。
また、ブラウザ デベロッパー ツールでレスポンス ハンドラを確認し、[サーバーが適切な MIME タイプを報告することを確認してください](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)。そうしないと、動画のソースタイプのチェックが機能しません。

## 開始時刻と終了時刻を指定する

帯域幅を節約し、レスポンシブなサイトを構築しましょう。それには、Media Fragments API を使用して、動画要素に開始時間と終了時間を追加します。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

メディア フラグメントを追加するには、メディアの URL に #t=[start_time][,end_time] を追加するだけです。たとえば、5～10 秒の間だけ動画を再生するには、次のように指定します。


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

また、Media Fragments API を使用すると、DVD のキューポイントのように同じ動画の複数のビューを配信することができ、複数のファイルをエンコードして配信する必要はありません。

<!-- TODO: Verify note type! -->
Note: - Media Fragments API は、ほとんどのプラットフォームでサポートされていますが、iOS ではサポートされていません。
- お使いのサーバーで Range リクエストがサポートされていることを確認してください。ほとんどのサーバーで Range リクエストはデフォルトで有効になっていますが、一部のホスティング サーバーでは無効になっている場合があります。


ブラウザ デベロッパー ツールを使用して、レスポンス ヘッダーの Accept-Ranges: bytes を確認します。

<img class="center" alt="Chrome デベロッパー ツールのスクリーンショット: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## ポスター画像を含める

動画要素に poster 属性を追加しておくと、要素が読み込まれたときにユーザーがその内容をすぐに把握できるため、動画をダウンロードして再生する必要がなくなります。


    <video poster="poster.jpg" ...>
      ...
    </video>
    

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



