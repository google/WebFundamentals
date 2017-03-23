project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: このガイドでは、コンテキストに応じた PageSpeed Insights ルールについて、つまりクリティカル レンダリング パスを最適化する際の注意点と注意すべき理由を説明します。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2014-03-31 #}

#  PageSpeed ルールおよび推奨事項 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

このガイドでは、コンテキストに応じた PageSpeed Insights ルールについて、つまりクリティカル レンダリング パスを最適化する際の注意点と注意すべき理由を説明します。


##  レンダリング ブロック JavaScript および CSS の除去

最初のレンダリングまでの時間をできるだけ短縮するには、ページ上のクリティカル リソース数の最小化（可能な場合はリソースの除去）、ダウンロードするクリティカル バイト数の最小化、クリティカル パス長の最適化を行います。

##  JavaScript の使用法を最適化する

JavaScript リソースは、`async` としてマーキングするか、特別な JavaScript スニペットを介して追加していない場合、デフォルトでパーサー ブロックです。パーサー ブロック JavaScript があると、ブラウザは、CSSOM を待ち、DOM の構築を一時中断する必要があります。これにより、最初のレンダリングまでの時間に大幅な遅延が生じることがあります。

###  非同期 JavaScript リソースを優先する

非同期リソースの場合、ドキュメント パーサーはブロックされず、ブラウザでは、スクリプトを実行する前の CSSOM ブロックを回避できます。多くの場合、スクリプトが `async` 属性を使用できるということは、最初のレンダリングに必須ではないことも意味します。最初のレンダリング後に非同期でスクリプトを読み込むことを検討してください。

###  同期サーバー呼び出しを避ける

`navigator.sendBeacon()` メソッドを使用して `unload` ハンドラで XMLHttpRequests によって送信されるデータを制限してください。
多くのブラウザではこのようなリクエストは同期している必要があるため、ページの遷移が遅れることがあり、ときには目立つほどの遅延が生じます。
次のコードは、`navigator.sendBeacon()` を使用して、`unload` ハンドラではなく `pagehide` ハンドラでサーバーにデータを送信する方法を示しています。




    <script>
      function() {
        window.addEventListener('pagehide', logData, false);
        function logData() {
          navigator.sendBeacon(
            'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
            'Sent by a beacon!');
        }
      }();
    </script>
    

新しい `fetch()` メソッドを使用すると、データ リクエストの非同期化が容易になります。ただし、これを使用できる環境はまだ限られているため、機能検出を使用して存在していることを確認してから使用する必要があります。このメソッドでは、複数イベント ハンドラではなく、Promises を使用してレスポンスを処理します。XMLHttpRequest に対するレスポンスとは違い、fetch レスポンスは Chrome 43 以降で提供されているストリーム オブジェクトです。つまり、`json()` を呼び出すと Promise も返ります。 


    <script>
    fetch('./api/some.json')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  response.status);  
            return;  
          }
          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log(data);  
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
    </script>
    

`fetch()` メソッドでは、 POST リクエストも処理できます。


    <script>
    fetch(url, {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'foo=bar&lorem=ipsum'  
    }).then(function() { // Aditional code });
    </script>
    

###  JavaScript の解析を延期する

ブラウザがページのレンダリングのために実行する作業量を最小化するには、最初のレンダリングで表示コンテンツを構築するために必須ではないスクリプトは処理を延期して、ページをレンダリングするためにブラウザで実行しなければならない作業量を最小化する必要があります。

###  長時間実行される JavaScript を避ける

長時間実行される JavaScript があると、ブラウザによる DOM の構築、CSSOM の構築、ページ レンダリングがブロックされます。そのため、最初のレンダリングで必須ではない初期化ロジックや機能は、レンダリング後まで処理を延期する必要があります。長時間に及ぶ初期化シーケンスを実行する必要がある場合は、複数のステージに分割して、その間にブラウザが他のイベントを処理できるようにすることを検討してください。

##  CSS の使用法を最適化する

CSS は、レンダリング ツリーの構築に必要であり、通常 JavaScript は、最初にページを構築する際に CSS でブロックをします。重要でない CSS（print その他のメディアクエリなど）はすべて非クリティカルとして指定し、クリティカル CSS の量とその配信時間をできる限り削減する必要があります。

###  CSS をドキュメントの head に配置する

すべての CSS リソースを HTML ドキュメント内でできるだけ早く指定すると、ブラウザで `<link>` タグを検出して CSS のリクエストをディスパッチするまでの時間を短縮することができます。

###  CSS のインポートインポートを避ける

CSS のインポート（`@import`）ディレクティブを使用すると、あるスタイルシート ファイルから別のスタイルシートにルールをインポートできます。ただし、このディレクティブにより、クリティカル パスのラウンドトリップが増えるため、使用は避けてください。インポートされる CSS リソースは、`@import` ルールのある CSS スタイルシート自体の取得と解析が完了するまで検出されません。

###  インライン レンダリング ブロック CSS

最大のパフォーマンスを得るには、クリティカル CSS を、HTML ドキュメントに直接インライン化することをおすすめします。これにより、クリティカル パスから余計なラウンドトリップを排除できます。また、適切に実施すれば、HTML 以外のブロック リソースがない「1 ラウンドトリップ」のクリティカル パス長を実現できます。



{# wf_devsite_translation #}
