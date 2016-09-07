project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: セキュリティは、ユーザーを保護するための、ウェブの重要な部分であり、新しく刺激的な API を使用するために、前進する TLS サポートが必要です。

{# wf_review_required #}
{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# HTTPS によるセキュリティ {: .page-title }

{% include "_shared/contributors/TODO.html" %}



{% comment %}
ガイド リスト コンテンツは、記事収集マッチング page.id に基づいて、リンク先のレイアウトで出力されます。
{% endcomment %}


## キーと証明書の署名要求の作成 




このセクションでは、Linux、BSD、および Mac OS X システムに含まれる openssl コマンドライン プログラムを使用して、秘密鍵/公開鍵と CSR を生成する方法を説明します。

### TL;DR {: .hide-from-toc }
- 2048 ビットの RSA 公開鍵と秘密鍵のペアを作成する必要があります。
- 公開鍵を埋め込む証明書署名要求 (CSR) を生成します。
- CSR を認証局 (CA) と共有して、最終的な証明書または証明書チェーンを受け取ります。
- /etc/ssl (Linux および Unix) などウェブ アクセスが不可能な場所や、IIS が必要とする場所 (Windows) に、最終的な証明書をインストールします。



### 公開鍵/秘密鍵のペアを生成します

この例では、2,048 ビットの RSA 鍵ペアを生成します。(1,024 ビットなど
の小さい鍵は、ブルートフォース推測攻撃に対して耐性が不十分です。4,096 ビットなどの
大きい鍵は過剰攻撃となります。時の経過とともにコンピュータ処理が安価になるにつれて、
鍵のサイズが増大します。2,048 ビットが現在最適な値です。

RSA 鍵ペアを生成するためのコマンドは次のとおりです。

    openssl genrsa -out www.example.com.key 2048

次の結果が出力されます。

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Generate A CSR

このステップでは、公開鍵および所属する組織とウェブ サイトに
関する情報を証明書署名要求に埋め込みます。*openssl* は対話的に
メタデータについて問い合わせます。

次のコマンドを実行:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

出力結果:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

このコマンドで出力した CSR が正しいことを確認してください。

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

### Submit Your CSR To A CA

使用する CA の内容に応じて、
CSR を送信するさまざまな方法があります。ウェブ サイト上のフォームを使用したり、電子メールで送信する
などです。CA (またはその販売者) が、プロセスの一部またはすべてを自動化できる場合もあります
 (たとえば、鍵ペアおよび CSR の生成など)。

CSR を CA に送信し、その指示に従って、最終的な
証明書または証明書チェーンを受け取ってください。

公開鍵の証票のサービスにかかる費用は、
CA によって異なります。

1 つ以上の DNS 名にキーをマッピングするためのオプションもあります。
複数の別名 (example.com、www.example.com、example.net、
www.example.net など)、または \*.example.com などの「ワイルドカード」の名前が利用可能です。

たとえば、1 つの CA が現在次のような価格で提供しています。

* 標準: $16/年、example.com および www.example.com で有効。
* 標準: $150/年、example.com および \*.example.com で有効。

9 つ以上のサブドメインがある場合、これらの価格設定では、ワイルドカード証明書がお得です。
また、1 つまたは複数の単一名の証明書を購入することもできます。(たとえば 
5 つのサブドメインがある場合、サーバー上で TTPS を有効にするときには、
ワイルドカード証明書が便利なことがあります。)

**注:** ワイルドカード証明書では、ワイルドカードは 1 つの DNS ラベルだけに
適用されることに注意してください。\*.example.com に有効な証明書は、
foo.example.com および bar.example.com に適用されますが、foo.bar.example.com には適用されません。

/etc/ssl (Linux および Unix) などウェブ アクセスが不可能な場所や、
IIS が必要とする場所 (Windows) で、すべてのフロント エンド サーバーに証明書をコピーします。



## Enable HTTPS On Your Servers 




サーバーで HTTPS を有効にするすべての重要な手順の準備ができました。

### TL;DR {: .hide-from-toc }
- Mozilla のサーバー設定ツールを使用して、TTPS をサポートのためにサーバーを設定します。
- Qualys の便利な SSL Server Test で定期的にサイトをテストし、少なくとも A または A+ を得られるようにします。



このステップでは、重要な業務の意思決定を行う必要があります。

* それぞれのホスト名、ウェブサーバー、サービス、コンテンツに、個別の IP アドレスを付与します。
  あるいは、
* 名前ベースのバーチャルホストを使います。

ホスト名ごとに異なる IP アドレスを使用している場合は問題ありません!すべてのクライアント
の HTTP および HTTPS を容易にサポートできます。

しかし、ほとんどのサイト運営には、名前ベースのバーチャル ホストを使って IP
アドレスを節約します。そのほうが便利だからです。 Windows XP 
および Android 2.3 以前の IE の問題は、[Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI) を理解できないことです。
これは HTTPS の名前ベースのバーチャル ホストでは重大事項です。

いつか (多分すぐに) SNI をサポートしないクライアントは、すべての近代的なソフトウェアに
取って代わるでしょう。 リクエスト ログのユーザー エージェント文字列を監視し、十分な数のユーザーが
いつ近代的なソフトウェアに移行したかを把握します。 (しきい値を
 &lt; 5%、&lt; 1%、などで設定できます。)

サーバー上で利用可能な HTTPS サービスを保有していない場合は、すぐに利用可能にしてください
(HTTP を HTTPS にリダイレクトする必要がなくなります)。 購入してインストールした証明書を使用して、
ウェブ サーバーを構成します。 [Mozilla's handy
configuration
generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
が便利であることがお分かりいただけるでしょう。

多くのホスト名やサブドメインを持っている場合、それぞれで
証明書を使用する必要があります。

**注:** 多くのサイト運営者はすでに、これまで説明してきた手順を完了していますが、
クライアントを HTTP にリダイレクトして戻すことだけを目的に HTTPS を使用しています。 そうされている
場合は、すぐに止めてください。 HTTPS と HTTP をスムーズ活用するために、次のセクションを
参照してください。

**注:** 最終的には、HTTP のリクエストを HTTPS にリダイレクトし、HTTP ストリクト 
トランスポート セキュリティ (HSTS) を使用してください。 これを行うには、移行プロセスの正しい段階ではありません。
「Redirect HTTP To HTTPS (HTTP から HTTPS へのリダイレクト)」、および「Turn On Strict Transport Security And Secure Cookies (ストリクト トランスポート·セキュリティおよびセキュアなクッキーをオンにする)」を参照してください。

今すぐに、また、サイトのライフタイムにわたって、HTTPSの設定を確認してください。
[Qualys' handy SSL Server Test](https://www.ssllabs.com/ssltest/). サイトは A または A+ の
スコアを取得する必要があります。それ以下のスコアの場合、原因となるものをバグとして扱ってください。
(アルゴリズムとプロトコルに対する攻撃は常に巧妙になっているので、
今日の A は明日の B となります!)



## Make Intra-Site URLs Relative 




HTTP と HTTPS の両方でサイトにサービスを提供している場合、プロトコルに係わらず、できるだけスムーズに動作させる必要があります。

### TL;DR {: .hide-from-toc }
- イントラサイト URL と外部 URL はプロトコルに依存しないようにします。 相対パスを使用するか、あるいは//example.com/something.js のようなプロトコルを除外します



しかし、HTTP リソースを含む
 HTTPS 経由でページを提供するときに、問題が発生します [mixed
content](http://www.w3.org/TR/mixed-content/)。ブラウザは、HTTPS の完全な利点が失われたことを
ユーザーに警告します。

実際、アクティブな混合コンテンツの場合 (スクリプト、プラグイン、CSS、iframe）、
ブラウザはコンテンツを全く読み込まないか、実行もせず、
壊れたページを表示します。

**注:** HTTP ページに HTTPS リソースを含めることは全く問題ありません。

さらに、サイト内の他のページにリンクすると、ユーザーは
 HTTPS から HTTP にダウングレードされます。

*http://* スキームを使用する完全修飾のイントラサイト URL 
がページに含まれている場合、これらの問題が発生します。 このようなコンテンツは変更する必要があります。

		<h1>Example.com へようこそ</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>この素敵な <a href="http://example.com/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

to something like this:

		<h1>Example.com へようこそ</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>この素敵な <a href="//example.com/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

or this:

		<h1>Example.com へようこそ</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>この素敵な <a href="/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

つまり、イントラサイト URL をできるだけ相対的にします。プロトコル相対
 （//example.com で始まるプロトコルのないもの）、
またはホスト相対 (/jquery.js のようなパスのみで始まるもの) のいずれかを使用します。

**注:** 手動ではなく、スクリプトを使用してこれを行ってください。 サイトのコンテンツがデータベースにある場合、
データベースの開発コピーで
スクリプトをテストすることがあります。 サイトのコンテンツが単純なファイルである場合、ファイルの開発コピーで
スクリプトをテストしてください。 通常通り、変更は QA に合格した場合にのみ、
実稼働環境にプッシュしてください。 [Bram van Damme's
script](https://github.com/bramus/mixed-content-scan) または類似のものを使用して、サイト内の
混合コンテンツを検出します。

**注:** 他のサイトにリンクする場合 (それらの
リソースを含む場合とは対照的に)、プロトコルを変更しないでください。
他のサイトの動作方法は制御できません。

**注:** 大規模なサイトの移行をスムーズにするためには、
プロトコル相対 URL を推奨します。 HTTPS を完全に展開できるかどうか分からない場合、サイトで
すべてのサブリソースに HTTPS を使用させると、裏目に出る可能性があります。 HTTPS は新しく違和感を覚えることがありますが、
HTTP サイトもこれまでと
同様に利用価値が高いものです。 やがて移行を完了すると、HTTPS で
ロックインすることができます (次の 2 つのセクションを参照)。

サイトが CDN、jquery.com など、サードパーティから
提供されたスクリプト、画像、その他のリソースに依存している場合、次の 2 つのオプションがります。

* これらのリソースのためのプロトコル相対 URL を使用します。 サードパーティが HTTPS サービスを提供して
いない場合は、各社にお尋ねください。 Jquery.com など、ほとんどの会社はこのサービスを提供しています。
* 制御するサーバーから、HTTP と HTTPS の両方に
リソースを提供します。 これにより、サイトの外観、パフォーマンス、
セキュリティをより適切に制御できるので、多くの場合は得策となります。
サードパーティに頼る必要はありません。

HTML ページだでなく、スタイルシート、JavaScript、リダイレクト
のルール、&lt;link …&gt; タグ、および CSP 宣言でも、イントラサイト URL を
変更する必要があることを覚えておいてください。



## Redirect HTTP to HTTPS 






### TL;DR {: .hide-from-toc }
- ページの先頭に標準リンクを置いて、検索エンジンに、https がサイトを取得するための最良の方法であることを伝えます。


ページに &lt;link rel="canonical" href="https://…"/&gt; タグを設定します。 [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
サイトを取得するための最良の方法を知っています。

ほとんどのウェブ サーバーは、単純なリダイレクト機能を提供しています。 301 (完全に移動) を使用して、
HTTPS のバージョンが標準であり、ユーザーを HTTP からサイトの HTTPS バージョンにリダイレクトすることを、検索エンジンやブラウに示します。



## Turn On Strict Transport Security And Secure Cookies 






### TL;DR {: .hide-from-toc }
- HTTP ストリクト トランスポート セキュリティ (HSTS) を使用して、301 リダイレクトのコストを回避します。
- Cookie に 常に secure フラグを設定します。



この時点で、HTTPS の使用を「ロックイン」する準備が整いました。 最初に [Strict
Transport
Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) を使用して、http:// の手順に従う場合にも、
常に HTTPS 経由でサーバーに
接続する必要があることをクライアントに伝達します。 これによりり、[SSL
Stripping](http://www.thoughtcrime.org/software/sslstrip/) などの攻撃から守られ、「HTTPS に HTTP をリダイレクトする」で有効化された 301 リダイレクトの
ラウンドトリップ コストを回避します。

**注:** サイトを HSTS ホストとして認識しているクライアントは、
_[hard-fail] の傾向があります(https://tools.ietf.org/html/rfc6797#section-12.1)_[ お使いの
](https://tools.ietf.org/html/rfc6797#section-12.1)[サイトが
TLS 構成でエラーになった場合](https://tools.ietf.org/html/rfc6797#section-12.1) (
期限切れの証明書など)。 これは HSTS の明示的な設計上の選択です。
ネットワーク攻撃者が、HTTPS なしでサイトに
アクセスしてクライアントを騙すことができないようにします。 証明書の検証エラーのまま HTTPS を展開する
ことがないよう、サイトの運営が十分に堅牢であることを確認するまで、HSTS を
有効にしないでください。

ストリクト トランスポート·セキュリティ ヘッダーを設定して、HTTP ストリクト 
トランスポート·セキュリティ (HSTS) をオンにします。 さまざまなサーバー ソフトウェアについては、[OWASP's HSTS page has links to
instructions](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
を参照してください。

ほとんどのウェブ サーバーは、カスタム ヘッダーを追加するための同様の機能を提供しています。

**注:** max-age は瞬時に計測されます。 低い値から開始し、HTTPS のみのサイトの
操作がより快適になるよう、
徐々に max-age を増加させます。

クライアントが HTTP でクッキー (
認証や好みのサイト) を送信しないことを確認するのも重要です。 たとえば、ユーザーの
認証クッキーがプレーンテキストで露出されると、
他のすべてのことを正しく行っている場合でも、
セッション全体のセキュリティ保障が破壊されます。

したがって、ウェブ アプリケーションを変更して、
クッキーの Secure フラグを常に設定します。 [This OWASP page explains how to set the Secure
flag](https://www.owasp.org/index.php/SecureFlag) 複数のアプリケーション 
フレームワークで。 すべてのアプリケーション·フレームワークには、フラグを設定するためのいくつかの方法があります。



## Migration Concerns 






このセクションでは、運営者が HTTPS へ移行する際に懸念することについて説明します。


### 検索ランキング

[Google では、HTTPS を検索品質の正の
インジケーターとして使用しています](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google は [how to transfer, move, or migrate your
site] のためのガイドを発行するとともに(https://support.google.com/webmasters/topic/6029673)、検索ランク
も維持します。 Bing は [guidelines for
webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a) も発行します。

### パフォーマンス

コンテンツとアプリケーション層がよく調整されている場合 ([Steve Souders'
books](https://stevesouders.com/) の素晴らしいアドバイスを参照)、残りの TLS 
のパフォーマンス問題は、一般的に、全体的な
アプリケーションのコストを基準に考えると小さなものです。 さらに、これらのコストを削減し、償却することができます。 (TLS の最適化に関する
素晴らしいアドバイスと一般事項については、次を参照してください。_[High Performance Browser
Networking](http://chimera.labs.oreilly.com/books/1230000000545)_[ by Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).)Ivan
Ristic の_[OpenSSL
Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)_ および _[Bulletproof
SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_も参照してください。

TLS は主に HTTP/2 を可能にした結果、性能を
向上できることがあります。 Chris Palmer は以下のプレセンテーションを行いました。[a talk on HTTPS and HTTP/2 performance at Chrome Dev
Summit 2014](/web/shows/cds/2014/tls-all-the-things).

### リファラー ヘッダー

ユーザーが HTTPS サイトから他の HTTP サイトへのリンクをたどる場合、
ユーザー エージェントは、リファラー ヘッダを送信しません。 これが問題となる場合は、
解決方法がいくつかあります。

* 他のサイトは HTTPS に移行する必要があります。 彼らにとってこれは便利なガイド
になるかもしれません! :)レフェリー サイトがこのガイドの「Enable HTTPS On Your Servers」セクションを完了できる場合は
、http:// から https://へサイト内でリンクを変更するか、
プロトコル相対リンクを使用できます。
* 新しい [Referrer Policy
  standard](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
  を使用して、リファラー ヘッダーでさまざまな問題を回避することができます。

検索エンジンは HTTPS に移行しているため、HTTPS に更に移行するときには、
より多くのリファラー ヘッダーを目にするでしょう。

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">参照ページがセキュアなプロトコルで転送される場合、クライアントは、(非セキュア) HTTP リクエストにリファラー ヘッダー フィールドを含めてはいけません。<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">HTTP RFC による</a></p></blockquote>

### 広告収入

広告を表示することによって自分のサイトの収益化を図る運営者は、HTTPS に移行する場合に広告の表示回数を
減少させないことを確認します。 しかし、混合コンテンツのセキュリティ問題により、
HTTP iframe HTTPS ページでは動作しません。 厄介な
集団行動の問題がここにあります。広告主が HTTPS で公開するまで、
サイト運営者は広告収入を損失することなく HTTPS に移行することはできません。しかし、サイト運営者が HTTPS に移行するまで、広告主は
 HTTPS を公開する動機があまりありません。

広告主は、少なくとも HTTPS を介して広告サービスを提供する必要があります
 (このガイドの「Enable HTTPS On Your Servers」の説明に従うなど)。 ほとんどの場合これはすでに実施されています。 HTTPS のサービス提供を行っていない広告主には、少なくとも
最初に依頼する必要があります。 このガイドの「Make Intra-Site URLs Relative」について、十分な広告主が適切に
相互運用するまで、完了の延期を希望されることもあるでしょう。

