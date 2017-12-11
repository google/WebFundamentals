project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: サーバーでの HTTPS の有効化は、ウェブページのセキュリティを保護するために不可欠です。 

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-27 #}

# サーバーでの HTTPS の有効化 {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* 2,048 ビット RSA 公開鍵 / 秘密鍵のペアを作成する。
* 公開鍵を埋め込む証明書署名要求（CSR）を生成する。
* CSR を認証局（CA）と共有して、最終的な証明書または証明書チェーンを受け取る。
* `/etc/ssl`（Linux および Unix）などのウェブアクセスが不可能な場所や、IIS が必要とする場所（Windows）に、最終的な証明書をインストールする。

##  鍵と証明書署名要求の生成

このセクションでは、ほとんどの Linux、BSD、および Mac OS X システムに含まれる openssl コマンドライン プログラムを使用して、秘密鍵 / 公開鍵と CSR を生成する方法を説明します。



###  公開鍵 / 秘密鍵のペアの生成

まずは、2,048 ビット RSA 鍵のペアを生成します（1,024 ビットなどの小さい鍵は、ブルートフォース推測攻撃に対して耐性が不十分です。
4,096 ビットなどの大きい鍵は過剰です。
時間が経つにつれ、コンピュータ処理のコストが低下するのに伴い、鍵のサイズは大きくなっていきます。
現在最適なのは 2,048 ビットです）。

RSA 鍵のペアを生成するコマンドは次のとおりです。

    openssl genrsa -out www.example.com.key 2048

このコマンドによる出力は次のとおりです。

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

###  証明書署名要求の生成

このステップでは、公開鍵と、組織およびウェブサイトに関する情報を証明書署名要求（CSR）に埋め込みます。
*openssl*
 コマンドを実行すると、必要なメタデータの入力をインタラクティブに求められます。

次のコマンドを実行します。

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

このコマンドによる出力は次のとおりです。

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

CSR の有効性を確認するため、次のコマンドを実行します。

    openssl req -text -in www.example.com.csr -noout

応答は次のようになります。

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

###  認証局への CSR の送信

CSR を送信する方法は、認証局（CA）によって異なります。
ウェブサイトのフォームを使用する方法、メールで CSR を送信する方法などがあります。
CA（またはその販売者）が、プロセスの一部またはすべてを自動化できる場合もあります（たとえば、鍵ペアおよび CSR の生成など）。



CSR を CA に送信し、その指示に従って、最終的な証明書または証明書チェーンを受け取ってください。


公開鍵の証票のサービスにかかる費用は、CA によって異なります。


複数の DNS 名に鍵をマッピングするためのオプションもあります。複数の別名（example.com、www.example.com、example.net、www.example.net など）、または \*.example.com などの「ワイルドカード」の名前が利用可能です。



たとえば、ある CA では現在次のような価格で提供しています。

* 標準: $16 / 年、example.com および www.example.com で有効。
* ワイルドカード: $150 / 年、example.com および \*.example.com で有効。

10 個以上のサブドメインがある場合、これらの価格設定では、ワイルドカード証明書がお得です。そうでない場合は、1 つ以上の単一名の証明書を購入できます
（たとえば 5 つより多くのサブドメインがある場合に、サーバー上で HTTPS を有効にするときには、ワイルドカード証明書の方が便利なこともあります）。



注: ワイルドカード証明書では、ワイルドカードは 1 つの DNS ラベルだけに適用されることに注意してください。\*.example.com に有効な証明書は、foo.example.com および bar.example.com では有効ですが、foo.bar.example.com では有効ではありません。

`/etc/ssl`（Linux および Unix）などのウェブアクセスが不可能な場所や、IIS が必要とする場所（Windows）で、すべてのフロントエンド サーバーに証明書をコピーします。


##  サーバーでの HTTPS の有効化

サーバーでの HTTPS の有効化は、ウェブページのセキュリティを確保するための重要なステップです。

* Mozilla のサーバー設定ツールを使用し、サーバーで HTTPS サポートを設定します。
* Qualys の便利な SSL Server Test で定期的にサイトをテストし、少なくとも A または A+ を得られるようにします。

この時点で、運用について重要な意思決定を行う必要があります。次のいずれかを選択します。

* ご使用のウェブサーバーのコンテンツ提供元である各ホスト名に、個別の IP アドレスを付与します。

* 名前ベースの仮想ホストを使用します。

ホスト名ごとに個別の IP アドレスを使用している場合は、すべてのクライアントに対して容易に HTTP と HTTPS の両方をサポートできます。


しかし、ほとんどのサイト運営者は、名前ベースの仮想ホストを使って IP アドレスを節約します。また一般に、その方が便利だからでもあります。
Windows XP および Android 2.3 以前の IE の問題は、[Server Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external}（SNI）を理解できないことです。これは HTTPS の名前ベースの仮想ホストでは重大事項です。




いつか（希望としてはすぐにですが）、SNI をサポートしないすべてのクライアントが、最新のソフトウェアに置き換えられるでしょう。
リクエストログのユーザー エージェント文字列を監視すれば、十分な数のユーザーが最新のソフトウェアに移行した場合に、それを知ることができます
（しきい値を &lt; 5%、&lt; 1%、などで設定できます）。


ご使用のサーバーで HTTPS サービスが利用可能になっていない場合は、すぐに利用可能にしてください（HTTP から HTTPS にリダイレクトせずに。以下を参照）。
購入してインストールした証明書を使用するように、ウェブサーバーを設定します。
設定には、[Mozilla の便利な設定ジェネレーター](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}が役立ちます。




ホスト名やサブドメインが多数ある場合は、それぞれが正しい証明書を使用する必要があります。


警告:すでにここまでのステップを完了しているものの、クライアントを HTTP にリダイレクトするためだけに HTTPS を使用している場合、そのような運用はすぐに停止してください。HTTPS と HTTP をスムーズに活用するために、次のセクションを参照してください。

注: 最終的には、HTTP リクエストを HTTPS にリダイレクトし、HTTP ストリクト トランスポート セキュリティ（HSTS）を使用してください。ただし今は、これを行うための移行プロセスの適切な段階ではありません。「HTTP から HTTPS へのリダイレクト」および「ストリクト トランスポート セキュリティとセキュア Cookie の有効化」を参照してください。

今すぐに、また、サイトのライフタイムにわたって、[Qualy の便利な SSL Server Test](https://www.ssllabs.com/ssltest/){: .external } を使用して HTTPS の設定を確認してください。
サイトは A または A+ のスコアを取る必要があります。それより低いスコアの場合、原因となるものをバグとして処理してください（アルゴリズムとプロトコルに対する攻撃は常に進化しているため、今日 A を取れても、明日には B になります）。




##  イントラサイトに相対 URL を使用する

これで、HTTP と HTTPS の両方でサイトにコンテンツを提供できるようになりましたが、プロトコルにかかわらず、できるだけスムーズに動作させる必要があります。
このために重要なのは、イントラサイト リンクに相対 URL を使用することです。


イントラサイト URL と外部 URL がプロトコルに依存しないようにします。つまり、相対パスを使用するか、`//example.com/something.js` のようなプロトコルを除外します。

HTTPS 経由で HTTP リソースを含むページを配信すると、[混合コンテンツ](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content)の問題が生じます。
ブラウザは、HTTPS の機能が完全ではなくなったことをユーザーに警告します。実際、アクティブな混合コンテンツの場合（スクリプト、プラグイン、CSS、iframe）、ブラウザの多くはコンテンツをまったく読み込まないか、実行せず、壊れたページを表示します。

注: HTTP ページに HTTPS リソースを含めることはまったく問題ありません。

さらに、サイト内の他のページにリンクすると、ユーザーは HTTPS から HTTP にダウングレードされることがあります。


*http://* スキームを使用する完全修飾のイントラサイト URL がページに含まれている場合、これらの問題が発生します。
 

<p><span class="compare-worse">非推奨</span>: 完全修飾のイントラサイト URL の使用はお勧めしません。</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

つまり、イントラサイト URL をできるだけ相対的にします。プロトコル相対（`//example.com` で始まるプロトコルのないもの）、またはホスト相対（`/jquery.js` のようなパスのみで始まるもの）のいずれかを使用します。

<p><span class="compare-better">推奨</span>: プロトコル相対のイントラサイト URL の使用をお勧めします。</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">推奨</span>: 相対的なイントラサイト URL の使用をお勧めします。</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

手動ではなく、スクリプトを使用してこれを行ってください。サイトのコンテンツがデータベースにある場合、データベースの開発コピーでスクリプトをテストします。
サイトのコンテンツが単純なファイルで構成されている場合は、ファイルの開発コピーでスクリプトをテストしてください。
通常どおり、変更は QA に合格した場合にのみ、実稼働環境にプッシュしてください。[Bram van Damme のスクリプト](https://github.com/bramus/mixed-content-scan)または類似のものを使用して、サイト内の混合コンテンツを検出できます。

（他のサイトからのリソースを含めるのではなく）他のサイトにリンクする場合、プロトコルを変更しないでください。他のサイトの動作方法は制御できません。



ポイント: 大規模なサイトをスムーズに移行するには、プロトコル相対 URL を推奨します。HTTPS を完全に展開できるかどうかわからない場合、サイトですべてのサブリソースに HTTPS を使用させると、裏目に出る可能性があります。通常、HTTPS に慣れず、違和感を覚える期間があります。また、HTTP サイトもこれまでと同様に動作しているはずです。やがて移行を完了したら、HTTPS のみを使用できるようになります（次の 2 つのセクションを参照）。

サイトが CDN、jquery.com など、サードパーティから提供されたスクリプト、画像、その他のリソースに依存している場合、次の 2 つのオプションがあります。


* これらのリソースにはプロトコル相対 URL を使用します。サードパーティが HTTPS サービスを提供していない場合は、各社にお尋ねください。
jquery.com など、ほとんどの会社はこのサービスを提供しています。 
* 自分で制御しており、HTTP と HTTPS の両方を提供するサーバーからリソースを提供します。
これにより、サイトの外観、パフォーマンス、セキュリティをより適切に制御できるので、多くの場合は得策となります。
また、サードパーティに頼る必要はありません。これは常によいことです。


注: HTML ページだけでなく、スタイルシート、JavaScript、リダイレクト ルーツ、`<link>` タグ、CSP 宣言のイントラサイト URL も変更する必要がある点に注意してください。

##  HTTP から HTTPS へのリダイレクト

自分のサイトにアクセスするための最良の方法が HTTPS であることを検索エンジンに伝えるには、ページの先頭に [canonical リンク](https://support.google.com/webmasters/answer/139066)を置く必要があります。

ページに `<link rel="canonical" href="https://…"/>` タグを設定します。これにより、検索エンジンがサイトを取得するための最良の方法を判断できます。


##  ストリクト トランスポート セキュリティとセキュア Cookie の有効化

この時点で、HTTPS の使用を「ロックイン」する準備が整いました。 

* HTTP ストリクト トランスポート セキュリティ（HSTS）を使用して、301 リダイレクトのコストを回避する必要があります。
* Cookie には常に secure フラグを設定します。

最初に [StrictTransportSecurity](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) を使用して、`http://` の手順に従う場合にも、常に HTTPS 経由でサーバーに接続する必要があることをクライアントに伝達します。
これにより、[SSL ストリッピング](http://www.thoughtcrime.org/software/sslstrip/){: .external } などの攻撃から守られ、[HTTPS に HTTP をリダイレクトする](#redirect-http-to-https)で有効化された
`301 redirect`
のラウンドトリップ コストを回避します。


注: サイトを既知の HSTS ホストとして認識しているクライアントは、多くの場合、<a href="https://tools.ietf.org/html/rfc6797#section-12.1">サイトに期限切れの証明書などの TLS 設定のエラーが一度でもあるとハードフェイルします</a>。<i></i>HSTS の明示的な設計上、ネットワーク攻撃者が、HTTPS なしでサイトにアクセスするようクライアントを仕向けることができないようにします。証明書の検証エラーのまま HTTPS を展開することがないよう、サイトの運営が十分に堅牢であることを確認するまで、HSTS を有効にしないでください。

`Strict-Transport-Security` ヘッダーを設定して、HTTP ストリクト トランスポート セキュリティ（HSTS）を有効にします。[OWASP の HSTS ページ](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)に、さまざまなサーバー ソフトウェアでの有効化手順へのリンクが示されています。

ほとんどのウェブサーバーは、カスタム ヘッダーを追加するための同様の機能を提供しています。

注: `max-age` は秒数で測定されます。低い値から始めて、HTTPS のみのサイトの操作がより快適になるにつれて徐々に`max-age` を増加させます。

クライアントが HTTP 経由で（認証用やサイト設定用などの）Cookie を送信しないようにすることも重要です。
たとえば、ユーザーの認証 Cookie がプレーン テキストで公開されると、他のすべてのことを正しく行っていても、セッション全体のセキュリティが保証されなくなります。

そのため、ウェブ アプリケーションで設定される Cookie には常に secure フラグを設定するようにアプリケーションを変更してください。[この OWASP ページ](https://www.owasp.org/index.php/SecureFlag)で、複数のアプリケーション フレームワークにおける secure フラグの設定方法を説明しています。
すべてのアプリケーション フレームワークに、フラグを設定するための方法が用意されています。

ほとんどのウェブサーバーは、単純なリダイレクト機能を提供しています。`301 (Moved Permanently)` を使用して、HTTPS バージョンが標準であり、ユーザーを HTTP からサイトの HTTPS バージョンにリダイレクトすることを、検索エンジンやブラウザに示します。


##  移行に関する懸念事項

多くのデベロッパーが HTTP から HTTPS への移行に懸念を抱くのはもっともです。そこで、Google Webmasters チームは[すばらしいガイダンス](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J)を用意しています。


###  検索ランキング

[Google では、HTTPS を優れた検索品質のインジケーターとして使用しています](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html)。また、Google は、検索ランクを維持したまま[サイトを転送、移動、または移行する方法](https://support.google.com/webmasters/topic/6029673)に関するガイドも発行しています。
Bing も[ウェブマスター向けガイドライン](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)を発行しています。


### パフォーマンス

コンテンツとアプリケーション層がよく調整されている場合（[Steve Souders の著作](https://stevesouders.com/){: .external }の素晴らしいアドバイスを参照）、残りの TLS のパフォーマンス問題は、一般的に、全体的なアプリケーションのコストを基準に考えると小さなものです。
さらに、これらのコストを削減し、償却することができます
（TLS の最適化に関する素晴らしいアドバイスと一般事項については、Ilya Grigorik による [High Performance BrowserNetworking](http://chimera.labs.oreilly.com/books/1230000000545) を参照してください）。
Ivan Ristic の[『OpenSSL Cookbook』](https://www.feistyduck.com/books/openssl-cookbook/)および[『Bulletproof SSL And TLS』](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)も参照してください。

場合によっては、主に HTTP/2 を可能にした結果として、TLS のパフォーマンスを向上できることがあります。
Chris Palmer は、[Chrome Dev Summit 2014 で HTTPS と HTTP/2 のパフォーマンスに関するプレゼンテーション](/web/shows/cds/2014/tls-all-the-things)を行いました。

###  リファラー ヘッダー

ユーザーが自分の HTTPS サイトから他の HTTP サイトへのリンクをたどる場合、ユーザー エージェントは、リファラー ヘッダーを送信しません。これが問題となる場合は、解決方法がいくつかあります。


* 他のサイトを HTTPS に移行する必要があります。参照先のサイトでこのガイドの[サーバーでの HTTPS の有効化](#enable-https-on-your-servers)セクションの手順を完了したら、自分のサイトで、それらのサイトへのリンクを `http://` から `https://` に変更するか、プロトコル相対リンクを使用できるようになります。
* 新しい[リファラー ポリシー標準](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)を使用して、リファラー ヘッダーに関するさまざまな問題を回避することができます。

検索エンジンは HTTPS に移行しているため、HTTPS に移行すると、今より多くのリファラー ヘッダーを目にすることになるでしょう。

Warning: [HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3) によると、参照ページがセキュアなプロトコルで転送される場合、クライアントは、（非セキュアな）HTTP リクエストにリファラー ヘッダー項目を含めることは**できません**。

###  広告収入

広告を表示することによって自分のサイトの収益化を図る運営者は、HTTPS に移行することで広告の表示回数が減少しないことを確認したいと考えます。
しかし、混合コンテンツのセキュリティの問題により、HTTP `<iframe>` は HTTPS ページでは動作しません。
厄介な集団行動の問題がここにあります。広告主が HTTPS で公開するまで、サイト運営者は広告収入を損失することなく HTTPS に移行することはできません。しかし、サイト運営者が HTTPS に移行するまで、広告主は HTTPS を公開する動機があまりありません。




広告主は（このページの「サーバーでの HTTPS の有効化」セクションの説明に従うなどして）、少なくとも HTTPS を介して広告サービスを提供する必要があります。
ほとんどの場合これは既に実施されています。HTTPS のサービス提供を行っていない広告主には、少なくとも提供を開始するように依頼する必要があります。
十分な数の広告主と適切に相互運用できるようになるまで、このガイドの[イントラサイト URL を相対 URL にする](#make-intrasite-urls-relative)の実施は遅らせることをおすすめします。


{# wf_devsite_translation #}
