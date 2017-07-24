project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: コンテンツ セキュリティ ポリシーにより、最新のブラウザでのクロスサイト スクリプティング攻撃のリスクと影響を大幅に軽減できます。

{# wf_published_on:2012-06-15 #}
{# wf_updated_on: 2017-07-17 #}

# コンテンツ セキュリティ ポリシー {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

ウェブのセキュリティ モデルは、[同一生成元ポリシー](//en.wikipedia.org/wiki/Same-origin_policy){: .external}という考えに基づいています。
`https://mybank.com` からのコードは `https://mybank.com` のデータにのみアクセスでき、`https://evil.example.com` にはアクセスできないようにする必要があります。各生成元はウェブの残りの部分から隔離されるので、デベロッパーがコードをビルドして実行できる安全なサンドボックスが提供されます。
理論上これは非常に優れたモデルです。しかし実際には、攻撃者は巧妙な方法を見つけてシステムを妨害します。


たとえば、[クロスサイト スクリプティング（XSS）](//en.wikipedia.org/wiki/Cross-site_scripting){: .external}攻撃は、意図するコンテンツとともに悪質なコードを提供するようにサイトを仕向けることによって、同一生成元ポリシーを回避します。
これは大きな問題です。ブラウザは、ページに表示されるすべてのコードを、そのページのセキュリティ オリジンに正当に含まれているものとして信頼するからです。
古いですが代表的な手法の例として、[XSS チートシート](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external}があります。これは、攻撃者が悪質なコードを注入することでこの信頼を侵害するために使用する手法です。
攻撃者がなんらかのコードの注入に成功すると、それでほぼゲームオーバーです。ユーザー セッション データが侵害され、知らないうちに機密情報が悪意を持つ人に渡されてしまいます。
明らかにこれは可能な限り回避する必要があることです。


この概要では、最新のブラウザで XSS 攻撃のリスクと影響を大幅に低減するための防御策である、
コンテンツ セキュリティ ポリシー（CSP）を取り上げます。

### TL;DR {: .hide-from-toc }
* ホワイトリストを使用して、許可または不許可の対象をクライアントに指示します。
* 使用できるディレクティブについて説明します。
* ディレクティブに指定できるキーワードについて説明します。
* インラインコードと `eval()` は有害と見なされます。
* ポリシーを適用する前に、ポリシー違反をサーバーに報告します。


##  取得元のホワイトリスト 


XSS 攻撃によって引き起こされる問題は、ブラウザが、アプリケーションに含まれるスクリプトと、悪意のある第三者が注入したスクリプトを区別できなくなることです。
たとえば、このページの下部にある Google +1 ボタンは、オリジンが `https://apis.google.com/js/plusone.js` という条件で、このぺージから取得したコードを読み込み、実行します。
私たちはこのコードを信頼していますが、ブラウザに対して、`apis.google.com` から取得したコードはすばらしいが `apis.evil.example.com` から取得したコードは問題がある、と見分けることは期待できません。
このブラウザは参照元にかかわらず、ただ素直にページが要求するコードをダウンロードして実行します。


サーバーが配信するすべてを盲目的に信頼するのではなく、CSP が定義している `Content-Security-Policy` HTTP ヘッダーを使用すれば、信頼できるコンテンツ参照元のホワイトリストを作成して、その参照元のリソースだけを実行およびレンダリングするようブラウザに指示できます。
攻撃者がスクリプトを注入するセキュリティ ホールを見つけたとしても、ホワイトリストに一致しなければそのスクリプトは実行されません。



私たちは、`apis.google.com` は有効なコードを配信すると信頼しています。また、自身のドメインも同様に信頼できるので、この 2 つのリソースのうちどちらかを取得した場合にのみスクリプトを実行できるポリシーを定義してみましょう。



    Content-Security-Policy: script-src 'self' https://apis.google.com

簡単ですね。お気づきのとおり、`script-src` は、特定のページでスクリプト関連の権限を制御するディレクティブです。
スクリプトの有効な参照元として `'self'` ともう 1 つ、`https://apis.google.com` を指定しました。
ブラウザは HTTPS を介して、オリジンが現在のページおよび `apis.google.com` の JavaScript を従順にダウンロードし、実行します。


<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="コンソール エラー:コンテンツ セキュリティ ポリシー ディレクティブ: script-src 'self' https://apis.google.com に違反しているため、スクリプト 'http://evil.example.com/evil.js' の読み込みが拒否されました。">
  </figure>
</div>

このポリシーを定義すれば、ブラウザはそれ以外の参照元からのスクリプトは読み込まず、単純にエラーをスローします。
巧妙な攻撃者がどうにかしてサイトにコードを注入しようとしても、期待どおりに成功せず、逆にエラーメッセージに遭遇します。



###  幅広いリソースに適用するポリシー

スクリプト リソースは、最も明確なセキュリティ リスクですが、CSP では、ページで読み込みが許可されるリソースをさらに細かく制御できるポリシー ディレクティブの豊富なセットを提供しています。
`script-src` についてはすでに説明したので、そのコンセプトはもうおわかりでしょう。
続いて、その他のリソース ディレクティブについて簡単に説明します。

* **`base-uri`** は、ページの `<base>` 要素に表示できる URL を制限します。
* **`child-src`** は、ワーカーと組み込みのフレーム コンテンツの URL を列挙します。たとえば、`child-src https://youtube.com` は、YouTube の動画を埋め込むことができますが、他のオリジンの動画は埋め込むことができません。廃止された **`frame-src`** ディレクティブの代わりに、このディレクティブを使用してください。
* **`connect-src`** は、（XHR、WebSockets、EventSource を経由して）接続できるオリジンを制限します。
* **`font-src`** は、ウェブフォントを配信できるオリジンを指定します。Google のウェブフォントは `font-src https://themes.googleusercontent.com` で有効化できます。
* **`form-action`** は、`<form>` タグからの送信の有効なエンドポイントを列挙します。
* **`frame-ancestors`** は、現在のページに組み込める参照元を指定します。このディレクティブは、`<frame>`、`<iframe>`、`<embed>`、`<applet>` タグに適用されます。`<meta>` タグには使用できず、非 HTML リソースのみに適用されます。
* **`frame-src`** は廃止されました。代わりに **`child-src`** を使用してください。
* **`img-src`** は、画像を読み込み可能なオリジンを定義します。
* **`media-src`** は、動画と音声を配信できるオリジンを制限します。
* **`object-src`** は、Flash などのプラグインを制御できます。
* **`plugin-types`** は、ページで起動できるプラグインの種類を制限します。
* **`report-uri`** は、コンテンツ セキュリティ ポリシーが違反されたときにレポートを送信する URL を指定します。
このディレクティブは、`<meta>` タグで使用できません。
* **`style-src`** は、スタイルシートの `script-src` に相当します。
* **`upgrade-insecure-requests`** は、ユーザー エージェントに指示して URL スキーマを書き直し、HTTP を HTTPS に変更します。
このディレクティブは、書き直しが必要な古い URL が多数存在するウェブサイトに使用します。


デフォルトでは、ディレクティブに制限はありません。ディレクティブに特定のポリシーを設定しない場合、たとえば `font-src` は、有効な参照元として `*` を指定しても、そのディレクティブがデフォルトで動作します（たとえば、制限なしでどこからでもフォントを読み込むことができます）。




このデフォルトの動作は、**`default-src`** ディレクティブを指定することで上書きできます。
このディレクティブは、未指定のディレクティブの大半に対してデフォルトを定義します。
一般に、これは末尾が `-src` のディレクティブに適用されます。
`default-src` に `https://example.com` を設定し、`font-src` ディレクティブを指定しなかった場合、`https://example.com` からフォントを読み込むことはできますが、それ以外からは読み込めません。
前の例では `script-src` のみを指定しました。この場合、画像、フォントなどはどのオリジンからでも読み込むことができます。



次のディレクティブは、フォールバックとして `default-src` を使用しません。すでにご説明したように、設定しない場合はすべて許可したのと同じです。


* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

これらのディレクティブは、アプリケーションに合わせて目的の数だけ使用でき、HTTP ヘッダーにそれぞれ記述します。各ディレクティブはセミコロンで区切ります。
1 つのディレクティブで、必須のリソースタイプをすべて記述していることを確認してください。
`script-src https://host1.com; script-src https://host2.com` のように記述すると、2 番目のディレクティブは無視されます。
両方のオリジンの指定を有効にする正しい記述は次のとおりです。


    script-src https://host1.com https://host2.com

たとえば、コンテンツ配信ネットワーク（`https://cdn.example.net` など）からすべてのリソースを読み込むアプリケーションの場合、フレーム付きコンテンツまたはプラグインが不要だとわかっていれば、ポリシーは次のようになります。




    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

###  実装の詳細

ウェブの各種チュートリアルで、`X-WebKit-CSP` および `X-Content-Security-Policy` ヘッダーを目にすることがあるでしょう。
将来的には、これらの接頭辞付きヘッダーは無視する必要があります。
最新のブラウザ（IE を除く）は、接頭辞のない `Content-Security-Policy` ヘッダーをサポートしています。
こちらのヘッダーを使用してください。

使用するヘッダーによらず、ポリシーはページごとに定義されます。保護する必要があるレスポンスには毎回、この HTTP ヘッダーを付けて送信する必要があります。
これにより、各ニーズに応じて特定のページのポリシーを微調整できるため、柔軟性が向上します。
サイトに +1 ボタンが存在するページもあれば、ないページもあります。その場合、必要なときにだけボタンのコードの読み込みを許可できます。



各ディレクティブの参照元リストは柔軟に指定できます。(`data:`, `https:`) のスキームで参照元を指定したり、選択的にホスト名のみを指定したり（`example.com`: スキームやポートを問わず、このホストのオリジンすべてに一致）、完全修飾 URI（`https://example.com:443`: HTTPS のみ、`example.com` のみ、ポート 443 のみと一致）など、幅広く指定できます。
ワイルドカードも使用できますが、スキーム、ポート、またはホスト名の一番左端のみに限定されます。`*://*.example.com:*` は、`example.com` のすべてのサブドメインに一致し、スキームとポートはどれでも使用できます（ただし、`example.com` 自体を除く）。




参照元リストには、次の 4 つのキーワードも使用できます。

* **`'none'`**: おそらく皆さん予想されているとおり、何も一致しません。
* **`'self'`**: 現在のオリジンと一致します。ただしサブドメインは除外されます。
* **`'unsafe-inline'`**: インライン JavaScript および CSS を許可します（このキーワードについては、後でもう少し詳しく説明する予定です）。
* **`'unsafe-eval'`**: `eval` などの text-to-JavaScript の仕組みを許可します（このキーワードについても後述します）
。

これらのキーワードには一重引用符が必要です。たとえば、`script-src 'self'`（引用符付き）は、現在のホストからの JavaScript の実行を許可します。`script-src self`（引用符なし）は、（現在のホストからではなく）"`self`" という名前のサーバーからの JavaScript を許可します。これはおそらく意図と異なるでしょう。




###  サンドボックス

もう 1 つ説明すべきディレクティブがあります。`sandbox` です。これまで説明してきたディレクティブとは若干異なり、ページが読み込めるリソースにではなく、ページで実行できるアクションに制限を加えます。
`sandbox` ディレクティブが存在すると、ページは `sandbox` 属性を指定した `<iframe>` 内に読み込まれるように処理されます。
このディレクティブは、ページを一意のオリジンに限定したり、フォームの送信を禁止したり、ページに幅広い効果をもたらします。
この記事の範囲からややはずれますが、有効なサンドボックス属性の完全な詳細については、[HTML5 仕様の「Sandboxing」セクション](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}をご覧ください{: .external}。



###  meta タグ

CSP で優先される配信のしくみは HTTP ヘッダーです。しかしこれは、ページのマークアップに直接ポリシーを設定する場合に便利です。
その場合、`<meta>` タグと `http-equiv` 属性を使用します。



    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


これは、frame-ancestors、report-uri、sandbox には使用できません。

##  インラインコードは有害と見なす

CSP は明確に、ホワイトリストに登録されたオリジンに基づいています。こうすれば、特定のリソースだけを受け入れてそれ以外を拒否するという、あいまいさを排除した処理をブラウザに指示できるからです。
しかしオリジンベースのホワイトリストは、XSS 攻撃による最大の脅威である、スクリプト注入に対処できません。攻撃者が悪意のあるペイロードを直接含む script タグを注入すると（`<script>sendMyDataToEvilDotCom();</script>`+）、ブラウザには正当なインライン スクリプト タグを区別するしくみがありません。
CSP でこの問題を解決するには、インライン スクリプトを完全に禁止します。これが唯一確実な方法です。



この禁止には、`script` タグに直接組み込まれたスクリプトに限らず、インライン イベント ハンドラと `javascript:` URL も含まれます。
`script` タグのコンテンツを外部ファイルに移動し、`javascript:` URL および `<a ...
onclick="[JAVASCRIPT]">` を適切な `addEventListener()` 呼び出しに置き換える必要があります。
たとえば、次のコードを書き換えるとします。



    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


次のように変更します。

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


書き換えられたコードには、CSP とうまく連動する以上のメリットがあります。CSP を使用するかにかかわらず、これはベスト プラクティスです。
インライン JavaScript は、望ましくない形で構造と動作を組み合わせています。外部リソースはブラウザでキャッシュしやすく、デベロッパーにとってわかりやすく、編集と圧縮のメリットがあります。
外部リソースにコードを移動すれば、より適切なコードを書くことができます。


インライン スタイルも同様に処理します。`style` 属性と `style` タグは、外部スタイルシートに統合し、CSS で可能な各種の[驚くほど巧妙な](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external}データ抽出方法に対して保護する必要があります。




どうしてもインライン スクリプトやインライン スタイルが必要な場合は、`script-src` または `style-
src` ディレクティブで許可される参照元として `'unsafe-inline'` を追加することで有効化できます。
ナンスやハッシュ（以下を参照）を使用することもできますが、使用すべきではありません。インライン スクリプトの禁止は、CSP で可能な最大のセキュリティ保護ですが、インライン スタイルの禁止も同様に、アプリケーションをさらに強化できます。
すべてのコードを外部に移動した後は、正しく動作するかの事前確認が多少は必要になりますが、その手間をかけるだけの価値はあります。



###  やむを得ずインライン スクリプトを使用しなければならない場合

CSP Level 2 では、暗号化されたナンス（1 回だけ使用する数値）またはハッシュのいずれかを使用し、インライン スクリプトをホワイトリストに登録できるようにして、インライン スクリプトの後方互換を提供しています。
これは扱いにくいかもしれませんが、いざというときに役立ちます。


ナンスを使用するには、script タグに nonce 属性を指定します。この値は、信頼できる参照元リストに含まれる値と一致する必要があります。
次に例を示します。


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


続いて、`nonce-` キーワードに付加したナンスを、`script-src` ディレクティブに追加します。

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

すでに説明したように、ナンスはページ リクエストのたびに再度生成する必要があり、推測できない値にする必要がある点に注意してください。


ハッシュもほぼ同じように機能します。script タグにコードを追加する代わりに、スクリプト自体の SHA ハッシュを作成して `script-src` ディレクティブに追加します。たとえば、ページで次のように設定されているとします。




    <script>alert('Hello, world.');</script>


ポリシーは次のようになります。

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

いくつか注意点があります。`sha*-` 接頭辞は、ハッシュを生成するアルゴリズムを示します。
上記の例では、sha256- が使用されています。CSP は sha384- および sha512- もサポートしています。
ハッシュを生成する際は、`<script>` タグを含めないでください。
また、先頭や末尾のスペースなど、大文字やスペースも影響します。


SHA ハッシュの生成については、Google 検索を使えばあらゆる言語でソリューションにたどり着くでしょう。
Chrome 40 以降を使用して、DevTools を開き、ページを再読み込みします。
[Console] タブには、インライン スクリプトごとに、エラー メッセージと正しい sha256 ハッシュが含まれています。


##  eval にも注意

攻撃者がスクリプトを直接注入できなくても、アプリケーションをあざむいて、攻撃者の代わりに不活性テキストを実行可能な JavaScript に変換して実行させるおそれがあります。 `eval()`、`new
Function()`、 `setTimeout([string], ...)`、`setInterval([string], ...)` はすべて媒介となって、注入されたテキストを使って予想外の悪意のある処理を実行される可能性があります。
CSP のこのリスクに対する基本的な回答は、このような媒介となる関数をすべて完全にブロックすることです。



これは、アプリケーションの構築方法に少なからず影響を及ぼします。

*   `eval` に頼らず、組み込みの `JSON.parse` を介して JSON を解析する必要があります。
ネイティブの JSON 演算は、[IE8 以降のすべてのブラウザ](http://caniuse.com/#feat=json){: .external}で利用でき、高い安全性が確保されています。
*   現在実行している `setTimeout` または `setInterval` 呼び出しを、文字列ではなくインライン関数を使用するように書き直してください。
次に例を示します。

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


次のように改善します。


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   実行時のインライン テンプレート生成は避けてください。多くのテンプレート ライブラリは `new
    Function()` を大量に使用し、実行時のテンプレート生成を高速化しています。これは動的プログラミングのすばらしい応用例ですが、悪意のあるテキストを評価するリスクにさらされます。

一部のフレームワークでは、はじめから CSP をサポートしており、`eval` が存在しない場合は堅牢なパーサーにフォールバックします。[AngularJS の ng-csp ディレクティブ](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external}がその好例です。



さらにもっといい選択は（たとえば [Handlebars](http://handlebarsjs.com/precompilation.html){: .external} のように）、プリコンパイルを実行できるテンプレート言語です。
テンプレートのプリコンパイルによって、最速のランタイム実装よりもユーザー エクスペリエンスがさらに高速化され、安全性も高まります。
eval および同様の text-to-JavaScript 関数がアプリケーションに欠かせない場合は、許可される参照元として `'unsafe-eval'` を `script-src` ディレクティブに追加することで有効化できますが、この方法を使用しないことを強く推奨します。


文字列の実行を禁止すれば、攻撃者にとって、不正なコードをサイトで実行することが非常に難しくなります。



##  レポート 


信頼できないリソースをクライアント側でブロックする CSP の機能は、ユーザーに多大なメリットをもたらします。さらに、なんらかの通知をサーバーに返送し、悪意のある注入を許すバグを最初の段階で特定して防ぐために非常に役立ちます。
これを実現するために、 `report-uri` ディレクティブで指定した場所に JSON 形式の違反レポートを  `POST` するようにブラウザに指示できます。




    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

レポートは次のような形式になります。


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



これには、特定の違反の原因を追跡するために役立つ情報の大部分、たとえば、違反が発生したページ（`document-uri`）、ページのリファラー（HTTP ヘッダー フィールドと異なるため、キーの綴りは誤りではありません）、ページのポリシーに違反したリソース（`blocked-uri`）、違反した特定のディレクティブ（`violated-directive`）、ページの完全なポリシー（`original-policy`）が含まれています。






###  Report-Only

CSP の使用を開始したばかりであれば、アプリケーションの現状を評価してから、ユーザー向けの厳格なポリシーを展開するのが合理的です。完全なデプロイに向けた一歩として、ポリシーを監視して違反は報告し、制限は適用しないようにブラウザに要求できます。
`Content-Security-Policy` ヘッダーを送信する代わりに、`Content-Security-Policy-Report-Only` ヘッダーを送信します。



    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

report-only モードで指定されたポリシーは、制限対象リソースをブロックせず、違反レポートを指定した場所に送信します。
両方のヘッダーを送信して、1 つのポリシーを適用し、もう 1 つのポリシーを監視することもできます。
これは、アプリケーションの CSP を変更した場合の影響を評価する方法として非常におすすめです。新しいポリシーのレポートを有効にして、違反レポートを監視し、見つかったバグを修正します。その効果に満足できたら、新しいポリシーの適用を開始します。






##  実際の使い方 

CSP 1 は、Chrome、Safari、Firefox でその大部分を使用できますが、IE 10 でのサポートはかなり制限されています。
<a href="http://caniuse.com/#feat=contentsecuritypolicy">
詳細については、canisue.com をご覧ください</a>。CSP Level 2 は、バージョン 40 以降の Chrome で使用できます。
Twitter や Facebook のような大規模なサイトは、このヘッダーをデプロイしています（<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">Twitter のケーススタディ</a>は一読の価値があります）。この標準を使用して、すぐにでも自分のサイトでデプロイを開始できます。




アプリケーションのポリシーを作成するための最初のステップは、実際に読み込んでいるリソースを評価することです。
リソースを自分のアプリにどうまとめればよいかを把握できたら、その要件に基づきポリシーを設定します。
一般的なユースケースをあげながら、CSP の保護の範囲内で対応できる最善策を見ていきましょう。


###  ユースケース 1: ソーシャル メディア ウィジェット

* Google の [+1 ボタン](/+/web/+1button/){: .external} には `https://apis.google.com` から読み込むスクリプトが含まれており、`https://plusone.google.com` から読み込む `<iframe>` を埋め込んでいます。ボタンを埋め込むには、この両方のオリジンを含むポリシーが必要です。最小限のポリシーは次のとおりです。`script-src
https://apis.google.com; child-src https://plusone.google.com`.また、Google が提供する JavaScript のスニペットを外部 JavaScript ファイルに取り出す必要があります。
`child-src` を使用する既存のポリシーが存在する場合、`child-src` に変更できます。
* Facebook の[いいねボタン](//developers.facebook.com/docs/plugins/like-button){: .external }

には、多数の実装オプションがあります。サイトの他の部分から安全に切り離せるため、`<iframe>` バージョンだけを使用することをお勧めします。
その場合、`child-src https://facebook.com` ディレクティブを適切に機能させる必要があります。
デフォルトでは、Facebook が提供する `<iframe>` コードは相対 URL である `//facebook.com` を読み込みます。
これを `https://facebook.com` に変更し、明示的に HTTPS を指定してください。
あえて HTTP を使用する理由はありません。

* Twitter の[ツイート ボタン](https://publish.twitter.com/#) は、スクリプトとフレームへのアクセスに依存しており、どちらも `https://platform.twitter.com` でホスティングされています（Twitter も同様に、デフォルトで相対 URL を指定しています。ローカルにコピー＆ペーストして、コードを編集し、HTTPS を指定してください）。Twitter が提供する JavaScript スニペットを外部 JavaScript ファイルに移動すれば、`script-src https://platform.twitter.com; child-src
https://platform.twitter.com` ですべて設定できます。




* その他のプラットフォームにも類似の要件があり、同じように対処できます。
`default-src` を `'none'` に設定し、コンソールを監視して、ウィジェットを機能させるために有効にする必要があるリソースを特定することをお勧めします。


複数のウィジェットを含めるのは簡単で、ポリシーのディレクティブを統合するだけです。先ほど説明したとおり、同じタイプのリソースはすべて 1 つのディレクティブにまとめる必要があります。
3 つのソーシャル メディア ウィジェットがすべて必要な場合は、ポリシーは次のようになります。


    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

###  ユースケース 2: ロックダウン

あなたは銀行のサイトを運営しており、自分で記述したリソースだけを読み込めるようにする必要があるとします。
このシナリオでは、すべてを完全にブロックするデフォルトのポリシーから開始して（`default-src
'none'`）、そこから作り上げていきます。


この銀行ではすべての画像、スタイル、スクリプトを `https://cdn.mybank.net` にある CDN から読み込むとします。また、XHR 経由で `https://api.mybank.com/` に接続し、各種のデータを取得します。
フレームが使用されていますが、サイトのローカル ページのみです（サードパーティのオリジンはありません）。
サイトに Flash、フォントなどはありません。
このようなケースで送信する、制限が最も厳しい CSP ヘッダーは次のとおりです。

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

###  ユースケース 3: SSL のみ

結婚指輪のディスカッション フォーラムの管理者が、すべてのリソースを安全なチャンネルからのみ読み込めるようにしたいと考えていますが、あまり多くのコードを記述したくありません。インライン スクリプトとインライン スタイルが多数使われているサードパーティ フォーラム ソフトウェアの大量のコードを書き直すことは、管理者の能力を超えています。
効果的なポリシーは次のとおりです。


    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

`default-src` で `https:` が指定されていますが、スクリプトとスタイルのディレクティブは、その参照元を自動的に継承することはありません。
各ディレクティブは、特定のタイプのリソースでデフォルト値を完全に上書きします。


##  今後について


Content Security Policy Level 2 は<a href="http://www.w3.org/TR/CSP2/">
勧告候補</a>です。W3C の Web Application Security Working Group はすでに、次の規格である [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/){: .external } のイテレーションに着手しています。

 


今後の機能に関する議論に興味をお持ちの方は、[public-webappsec@ メーリング リストのアーカイブ](http://lists.w3.org/Archives/Public/public-webappsec/)を一読するか、このメーリング リストにご参加ください。




{# wf_devsite_translation #}
