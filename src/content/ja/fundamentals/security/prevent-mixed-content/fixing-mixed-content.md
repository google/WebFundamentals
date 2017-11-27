project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 混合コンテンツを見つけて修正するのは、重要なタスクですが、時間がかかることがあります。このガイドでは、このプロセスに役立つツールについて説明します。

{# wf_published_on:2015-09-28 #}
{# wf_updated_on:2016-08-24 #}

#  混合コンテンツの防止 {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

ポイント: ウェブサイトで HTTPS をサポートすることは、サイトとユーザーを攻撃から保護するための重要なステップですが、混合コンテンツによってこの保護が無意味になる可能性があります。サイトとユーザーを保護するためには、混合コンテンツの問題を見つけて修正することが非常に重要です。

混合コンテンツを見つけて修正するのは、重要なタスクですが、時間がかかることがあります。このガイドでは、このプロセスに役立つツールとテクニックについて説明します。混合コンテンツの詳細については、[混合コンテンツとは](./what-is-mixed-content)をご覧ください。

### TL;DR {: .hide-from-toc }

* ページでリソースを読み込むときには、必ず https:// URL を使用します。
* `Content-Security-Policy-Report-Only` ヘッダーを使用して、サイトの混合コンテンツのエラーを監視します。
* `upgrade-insecure-requests` CSP ディレクティブを使用して、安全でないコンテンツからサイト訪問者を保護します。

## 混合コンテンツの特定と修正 

発生している問題の数によっては、混合コンテンツを手動で見つけるには長時間かかる可能性があります。このドキュメントで説明するプロセスでは、Chrome ブラウザを使用します。ただし、ほとんどの最新ブラウザでは、このプロセスに活用できる同様のツールが提供されています。

### サイトにアクセスして混合コンテンツを見つける

Google Chrome で HTTPS ページにアクセスすると、ブラウザの JavaScript コンソールに混合コンテンツがエラーと警告として示されます。


これらの警告を表示するには、パッシブな混合コンテンツまたはアクティブな混合コンテンツのサンプルページに移動し、Chrome JavaScript コンソールを開きます。コンソールは [View] メニューから開くことができます。[View] -&gt; [Developer] -&gt; [JavaScript Console] の順に選択するか、ページを右クリックして [Inspect Element] を選択し、次に [Console] を選択します。

[混合コンテンツとは](what-is-mixed-content#passive-mixed-content){: .external}ページの[パッシブな混合コンテンツの例](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external}では、以下のような混合コンテンツの警告が表示されます。

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない動画がリクエストされました。このコンテンツも HTTPS 経由で提供する必要があります。">
</figure>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

一方、アクティブな混合コンテンツの例では、混合コンテンツのエラーが表示されます。


<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でないリソースがリクエストされました。このリクエストはブロックされました。コンテンツは HTTPS 経由で提供する必要があります。">
</figure>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


これらのエラーと警告に表示された、サイトのソースに含まれる http:// URL を修正する必要があります。エラーや警告が見つかったページと URL のリストを作っておくと、修正するときに便利です。 

注: 混合コンテンツのエラーと警告は、現在表示されているページについてのみ表示され、新しいページに移動するたびに JavaScript コンソールがクリアされます。したがって、これらのエラーを見つけるために、サイトの各ページを個別に表示することが必要になります。エラーの中には、ページのある部分を操作した後にのみ発生するものもあります。前のガイドの画像ギャラリーの混合コンテンツの例を参照してください。

### ソースコードで混合コンテンツを見つける

ソースコードで直接混合コンテンツを検索できます。ソースで `http://` を検索し、HTTP URL 属性を含むタグを探します。
具体的には、前のガイドの[混合コンテンツの種類と関連するセキュリティ上の脅威](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external}セクションで示されたタグを探します。
アンカータグ（`<a>`）の href 属性に `http://` が含まれていることは、通常は混合コンテンツの問題ではありませんが、注意が必要な例外があります。この例外については後述します。
 

Chrome の混合コンテンツのエラーと警告から HTTP URL のリストを作成したら、ソースでこれらの完全な URL を検索して、サイトのどこに含まれているのかを確認することもできます。

 

### 混合コンテンツの修正

サイトのソースのどこに混合コンテンツが含まれているかがわかったら、次のステップに従って修正します。


例として、Chrome での次の混合コンテンツのエラーを使用します。

<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない画像がリクエストされました。このコンテンツも HTTPS 経由で提供する必要があります。">
</figure>

これは、ソースの次の部分にあります。
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### ステップ 1

ブラウザで新しいタブを開き、HTTPS 経由でこの URL を使用できることを確認します。アドレスバーに URL を入力して、`http://` を `https://` に変更します。


表示されたリソースが **HTTP** 経由の場合と **HTTPS** 経由の場合で同じであれば、問題はありません。
[ステップ 2](#step-2) に進んでください。

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      HTTP の画像がエラーなしで読み込まれます。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      HTTPS の画像がエラーなしで読み込まれ、画像は HTTP の場合と同じです。<a href="#step-2">ステップ 2</a> に進んでください。
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

証明書の警告が表示された場合、または **HTTPS** 経由でコンテンツを表示できなかった場合は、そのリソースを安全に使用することはできないことを意味します。


<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      HTTPS 経由でリソースを使用できません。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      HTTPS 経由でリソースを表示しようとしたときの証明書の警告。
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

この場合、次のいずれかのオプションを検討する必要があります。

* 別のホストからのリソースが使用可能であれば、そのリソースを含めます。
* 自分のサイトにコンテンツをダウンロードして、サイトで直接ホストします（合法的に許可されている場合）。
* サイトからそのリソースを完全に除外します。

#### ステップ 2

URL を `http://` から `https://` に変更し、ソースファイルを保存し、必要に応じてアップデートされたファイルを再デプロイします。

#### ステップ 3

最初にエラーが検出されたページを表示し、そのエラーが表示されなくなっていることを確認します。

### 非標準タグの使用上の注意

サイトで非標準のタグを使用する際には注意してください。たとえば、アンカー（`<a>`）タグの URL は、ブラウザを新しいページに移動させるため、これ自体が混合コンテンツを発生させることはありません。
つまり、これは通常修正する必要はありません。ただし、画像ギャラリーのスクリプトの中には、`<a>` タグの機能をオーバーライドして、`href` 属性で指定されている HTTP リソースをページのライトボックス表示に読み込み、混合コンテンツの問題を発生させるものがあります。


 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

上記のコードでは、`<a>` タグの href を `http://` のままにしても安全なように見えますが、サンプルを表示して、画像をクリックすると、混合コンテンツ リソースが読み込まれて、ページに表示されることがわかります。

 

## 大規模な混合コンテンツの処理

上記の手動ステップは小さなウェブサイトには適していますが、大規模なウェブサイトや、多数の異なる開発チームが関与しているサイトでは、読み込まれるすべてのコンテンツを把握するのが困難になる可能性があります。
このタスクを支援するために、コンテンツ セキュリティ ポリシーを使用して、混合コンテンツについて通知するようにブラウザに指示し、ページが安全でないリソースを予期せず読み込まないようにすることができます。



### コンテンツ セキュリティ ポリシー

[**コンテンツ セキュリティ ポリシー**](/web/fundamentals/security/csp/)（CSP）は、大規模な混合コンテンツを管理するために使用できる、多目的のブラウザ機能です。
CSP のレポート メカニズムを使用して、サイトの混合コンテンツを追跡できます。また、強制ポリシーを使用して混合コンテンツをアップグレードまたはブロックすることで、ユーザーを保護できます。

 

サーバーから送信されるレスポンスに `Content-Security-Policy` または `Content-Security-Policy-Report-Only` ヘッダーを含めることで、ページでこれらの機能を有効にすることができます。
さらに、ページの `<head>` セクションで `<meta>` タグを使用して（`Content-Security-Policy-Report-Only`
**ではなく**）、`Content-Security-Policy` を設定できます。
次のセクションの例を参照してください。


CSP は、混合コンテンツに使用する以外にも、多数のことに役立ちます。その他の CSP ディレクティブの詳細については、以下のリソースを参照してください。

* [Mozilla による CSP の概要](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [HTML5 Rock による CSP の概要](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP Playground](http://www.cspplayground.com/){: .external }
* [CSP の仕様](//www.w3.org/TR/CSP/){: .external }

注: ブラウザは、受信するコンテンツ セキュリティ ポリシーを<b>すべて</b>適用します。レスポンス ヘッダーまたは
<code>&lt;meta&gt;</code> 要素でブラウザが受け取った複数の CSP ヘッダー値は結合され、1 つのポリシーとして適用されます。レポート ポリシーも同様に結合されます。
ポリシーは、ポリシーの共通部分を取得することで結合されます。つまり、最初のポリシーの後の各ポリシーは、前のポリシーで許可されているコンテンツの制限のみが可能で、許可範囲を広げることはできません。



### コンテンツ セキュリティ ポリシーを使用して混合コンテンツを見つける 

コンテンツ セキュリティ ポリシーを使用して、サイトの混合コンテンツのレポートを収集できます。
この機能を有効にするには、サイトのレスポンス ヘッダーとして `Content-Security-Policy-Report-Only` ディレクティブを追加し、これを設定します。
 

レスポンス ヘッダー:  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


ユーザーがサイトのページにアクセスするたびに、ユーザーのブラウザは、コンテンツ セキュリティ ポリシーに違反するあらゆる事柄に関する JSON 形式のレポートを `https://example.com/reportingEndpoint` に送信します。
この場合は、サブリソースが HTTP 経由で読み込まれるたびに、レポートが送信されます。
これらのレポートには、ポリシー違反が発生したページの URL と、ポリシーに違反したサブリソースの URL が含まれます。
これらのレポートをログに記録するようにレポート エンドポイントを設定している場合は、各ページに自分でアクセスすることなく、サイトの混合コンテンツを追跡できます。

 

これには、次の 2 つの注意点があります。

* ユーザーは、CSP ヘッダーを解釈するブラウザでページにアクセスする必要があります。
  最新のほとんどのブラウザにはこの機能があります。
* ユーザーがアクセスしたページのレポートのみを取得できます。したがって、あまりアクセスされないページがある場合は、サイト全体のレポートを取得するまでに時間がかかる可能性があります。



CSP ヘッダー形式の詳細については、[コンテンツ セキュリティ ポリシーの仕様](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}を参照してください。 

自分でレポート エンドポイントを設定したくない場合は、代わりに [https://report-uri.io/](https://report-uri.io/){: .external} を使用できます。



### 安全でないリクエストのアップグレード

混合コンテンツを自動的に修正するための最新かつ最良のツールの 1 つは、[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external} CSP ディレクティブです。
このディレクティブは、ネットワーク リクエストを実行する前に、安全でない URL をアップグレードするようにブラウザに指示します。


たとえば、ページに HTTP URL を含むイメージ タグがあるとします。

 
    <img src="http://example.com/image.jpg"> 


ブラウザは代わりに <code><b>https:</b>//example.com/image.jpg</code> に対して安全なリクエストを行い、ユーザーを混合コンテンツから守ります。



この動作を有効にするには、このディレクティブを指定して `Content-Security-Policy` ヘッダーを送信します。



    Content-Security-Policy: upgrade-insecure-requests  


または、`<meta>` 要素を使用して、ドキュメントの `<head>` セクションにこの同じディレクティブをインラインで埋め込みます。


  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


リソースを HTTPS 経由で使用できない場合は、アップグレードされたリクエストは失敗し、リソースは読み込まれないことに注意してください。
これにより、ページのセキュリティが維持されます。
 

`upgrade-insecure-requests` ディレクティブは `<iframe>` ドキュメント内にも適用されるため、ページ全体が保護されます。


### すべての混合コンテンツのブロック

すべてのブラウザで upgrade-insecure-requests ディレクティブがサポートされているわけではないため、ユーザーを保護するための代わりの方法として [**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external} CSP ディレクティブがあります。このディレクティブは、混合コンテンツを一切読み込まないようにブラウザに指示します。アクティブおよびパッシブ両方の混合コンテンツを含む、すべての混合コンテンツ リソースのリクエストがブロックされます。

このオプションも `<iframe>` ドキュメント内に適用されるため、ページ全体で混合コンテンツが存在しないことが保証されます。


ページでこの動作が行われるように設定するには、このディレクティブを指定して `Content-Security-Policy` ヘッダーを送信します。


  
    Content-Security-Policy: block-all-mixed-content  


または、`<meta>` 要素を使用して、ドキュメントの `<head>` セクションにこの同じディレクティブをインラインで埋め込みます。


  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


`block-all-mixed-content` を使用することの欠点は、明らかでしょうが、すべてのコンテンツがブロックされることです。
セキュリティは高まりますが、これらのリソースを今後ページで使用できなくなります。
これにより、ユーザーが期待する機能やコンテンツが損なわれる可能性があります。
 

###  CSP の代替手段

Blogger などのプラットフォームでサイトをホスティングしている場合、ヘッダーを変更して CSP を追加するためのアクセス権がない場合があります。代わりに有効な代替手段として、[HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } や [Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external } など、ウェブサイト クローラを使用してサイトの問題を見つける方法があります。








{# wf_devsite_translation #}
