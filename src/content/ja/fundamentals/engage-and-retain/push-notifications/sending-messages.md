project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: メッセージの送信には、ご利用のサーバーとサードパーティのメッセージング サーバーの 2 つのサーバーが必要です。あなたはメッセージの送信先を管理し、サードパーティのサーバーがルーティングを処理します。


{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

#  メッセージの送信 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

実際には、メッセージの送信には、ご利用のサーバーとサードパーティのメッセージング サーバーの 2 つのサーバーが必要です。
デベロッパー側で、受信者と、メッセージング サーバー上にある受信者固有のエンドポイントの 2 つを管理します。
そしてメッセージング サーバーがルーティングを処理します。


##  幅広いコンテキスト {: #the-broader-context }

ここまでは、ウェブ アプリケーション内でプッシュ メッセージを登録する方法について説明してきました。このプロセスには、`applicationServerKey` という公開鍵のサブスクリプション API への受け渡しが含まれていました。



次の図は、操作の順序を示しています。

![メッセージの送信](images/push-flow.gif)

1. 端末は、すでに作成済みの公開鍵が含まれているウェブアプリをダウンロードします。この公開鍵は、`applicationServerKey` としてスクリプトで参照されます。
ウェブアプリは Service Worker をインストールします。
1. 登録フローで、ブラウザはメッセージング サーバーに新しいサブスクリプションを作成するよう通知し、それをアプリに返します。



    <aside class="note"><b>注: </b> メッセージング サーバーの URL を把握しておく必要はありません。各ブラウザ ベンダーは、ブラウザ独自のメッセージ サーバーを管理しています。</aside>

1. 登録フローが完了すると、アプリは subscription オブジェクトをアプリサーバーに渡します。
1. その後、アプリサーバーはメッセージをメッセージング サーバーに送信し、それが受信者に転送されます。



##  applicationServerKey の生成{: #generating-the-key }

`applicationServerKey` について、以下のことを認識しておく必要があります。

* 公開 / 秘密鍵ペアのうち公開鍵は、アプリケーション サーバーで生成されます。
* このキーペアは、P-256 曲線を使った楕円曲線デジタル署名（ECDSA）で使用できます。
* アプリでは、8 ビット符号なし整数の配列として、公開鍵をメッセージング サーバーに渡す必要があります。
* これは、Voluntary Application Server Identification for Web Push（VAPID）という仕様で定義されています。この内容については、[メッセージの送信](sending-messages)セクションで説明します。


[ウェブ プッシュ ノード ライブラリ](https://github.com/web-push-libs/web-push/)で、この公開鍵を生成する例が紹介されています。
以下に、公開鍵の例を示します。



    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


##  subscription オブジェクトの仕組み {: #subscription-anatomy }

先ほど subscription オブジェクトは文字列にしてサーバーに渡す必要があることを説明しましたが、subscription オブジェクトの内容については触れませんでした。
クライアント側では、オブジェクトの内容について何も処理しないためです。
オブジェクトはサーバーで処理します。  

以下に、subscription オブジェクトの例を示します。  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


この内容について説明します。  

**endpoint**: 2 つのパートがあり、サブスクリプション ブラウザで使用するメッセージング サービスの URL に続いて、ユーザーの一意の ID を設定します。


**keys**: Service Worker のメッセージに渡されるデータの暗号化に使用する暗号鍵です。
これには次のコードが含まれています。

* **auth**: ブラウザによって生成される 16 バイトの認証秘密。
* **p256dh**: 65 バイト。ブラウザから取得した公開鍵が含まれており、デベロッパーがプッシュ サービスに送信するメッセージを暗号化するときに使用します。



注: 関連する仕様では、バイトのことをオクテットと呼びます。この用語は、旧式のシステムや通信システムでは、1 バイトが必ずしも 8 ビットではなかったことに由来します。

##  メッセージの作成{: #creating-the-message }

ここから、内容がやや複雑になります。このセクションでは、クライアント アプリから離れて、
クライアントへのメッセージを作成および送信するアプリサーバーについて説明します。
追跡する対象が数多く存在するため、

先に進む前に、現在取得している情報と取得元を確認しておきましょう。

* **subscription オブジェクト**: クライアントから取得します。メッセージング サーバーのエンドポイント、公開鍵のコピー、クライアントが生成した認証秘密が含まれます。ここからは、subscription オブジェクトから離れて、**エンドポイント**、**公開鍵**、**認証秘密**について説明します。
* **秘密鍵**: VAPID 公開鍵に対応する VAPID 秘密鍵。
  これは、アプリケーション サーバーの秘密鍵です。

メッセージの作成について 3 段階に分けて見ていきましょう。まず、HTTP ヘッダーを作成し、次にメッセージのペイロードを作成します。最後に、それらを統合してメッセージング サーバーに送信します。



###  コードサンプルについての注記{: #a-note-about-samples }

このセクションに掲載されたコード サンプルは、[ウェブ プッシュ ノード ライブラリ](https://github.com/web-push-libs/web-push)から転載しています。


###  製品について{: #the-product }

まず最終的な形を確認してから、その作成方法について説明します。


<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization:WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

このリクエストは、subscription オブジェクトに含まれているエンドポイントに送信される点に注意してください。
Authorization、Crypto-Key、TTL ヘッダーについても少し取り上げます。
まずは、できるだけ単純化して説明します。

##  HTTP ヘッダー{: #http-headers }

###  TTL {: #ttl }

メッセージ サーバーがアプリサーバーから送信されたメッセージを配信するまでに、多少時間がかかる場合があります。メッセージ サービスはメッセージを永続的に保持するわけではありません。端的に説明すると、タイムリーに処理できるようにするため、アプリサーバーは永続的に存在可能なメッセージを送信できないようになっています。この理由により、TTL（有効期限）ヘッダーを含める必要があります。


TTL ヘッダーは、メッセージ サーバーがメッセージを保持して配信を試みる必要がある期間を秒単位で指定します。必要に応じて、メッセージ サーバーはメッセージの保持期間を短縮できます。その場合はメッセージ リクエストへのレスポンスとして、TTL ヘッダーに短縮した時間を設定し、返す必要があります。TTL に 値 0 を指定すると、メッセージ サーバーは瞬時にメッセージを配信する必要があります（ユーザー エージェントが使用可能な場合）。ユーザー エージェントを使用できない場合、メッセージはすぐに期限切れになり配信されません。


###  Crypto-Key ヘッダー{: #crypto-key-header }

アプリサーバーによって送信されたメッセージを検証するため、メッセージ サーバーには公開鍵が必要です。
Crypto-Key ヘッダーで公開鍵を送信します。Crypto-Key ヘッダーは複数のパートに分かれています。
  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

次に例を示します。  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

最初のパート（`dh=publicKey`）は公開鍵です。以前に、パーミッションのリクエストとユーザーのサブスクライブ セクションで作成しました。2 番目のパート（`p256ecdsa=applicationServerKey`）は、アプリサーバーで作成された公開鍵です。どちらも base64 URL エンコードが必要です。Crypto-Key の 2 つのパートがカンマで区切られている点に注意してください。

注: Chrome 52 ではバグのため、Cyrpto-Key の区切り記号としてカンマではなくセミコロンを使用する必要があります。

###  認証ヘッダー {: #authorization-header }

メッセージを送信するには、認証ヘッダーが必要です。以下の 4 つのパートが含まれています。  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

単語の WebPush はリテラルで、この後にスペースが必要です。暗号化してピリオドで連結された残りの部分は、署名付きの JSON ウェブトークン（JWT）を形成します。JWT は、想定した送信者からの署名であることを受信者が検証できるように、送信者が署名して、JSON オブジェクトを受信者と共有する方法です。

   

トークンの各パートを詳しく見てみましょう。

####  JWT ヘッダー {: #jwt-header }

JWT ヘッダーには、標準的な情報が 2 つ含まれています。`typ` プロパティはメッセージ（この例では JWT メッセージ）のタイプを示します。`alg` プロパティはメッセージの署名に使用されるアルゴリズムを示します。この詳細情報は、base64 URL エンコードが必要です。





    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


####  JWT ペイロード{: #jwt-payload }

JWT ではこのセクションをペイロードと呼びます。メッセージのペイロードを保存する場所ではありません。
これから簡単に説明します。このペイロードとは、次のメンバーを含む別の JSON オブジェクトです。    
**aud**  
プッシュ サービス エンドポイントのオリジンが含まれ、これは subscription オブジェクトから取得する必要があります。自分のサイトのオリジンではありません。    
**exp**  
JWT リクエストの有効期限をミリ秒単位で指定します（メッセージ自体の有効期限ではありません）。
24 時間以内で指定する必要があります。指定する値は、現在の日付をミリ秒に変換し、有効期間を追加して計算します。たとえば、Node.js では次のように計算できます。




    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
subject を指定します。これは VAPID 仕様で、プッシュ サービスがメッセージ送信者にアクセスする手段として定義されています。
URL または mailto アドレスを指定します（以下の例をご覧ください）。
  

JWT ペイロード全体は次のようになります。


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


####  Signature {: #signature }

署名は、JWT の最後のセクションです。

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

まず JWT ヘッダーとペイロードをドットで連結して、署名を作成します。
次に例を示します。

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>

[applicationServerKey の生成](#generating-the-key)で作成した秘密鍵を使用してこれを暗号化します。


これで、ドットで連結して JWT を作成するための 3 つの要素がすべて揃いました。


<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

署名の暗号化方法についてはここでは説明しませんが、暗号化に使用できるライブラリは多数存在します。
[jwt.io](https://jwt.io/){: .external } のライブラリ セクションを参照することをお勧めします。


最後に、「WebPush」という単語とスペースを先頭に付加します。結果は、次のようになります。


<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

###  メッセージ ペイロード {: #message-payload }

サーバーのコードを実装するとき、検討すべきメッセージの送信方法が 2 つあります。


* データ ペイロードを含むメッセージ。
* データ ペイロードを含まないメッセージ。多くの場合、通知と呼ばれます。

通知の場合は Service Worker がシグナルとしてメッセージを使用し、エンドポイントからデータを取得します。
メッセージの処理セクションで、この Service Worker の仕組みを示すサンプル コードを紹介しています。


ペイロードを含まないメッセージを送信するのはなぜでしょうか。理由は 2 つあります。

* 仕様上定められている 4k のペイロード制限を超えるデータを送信する必要がある。
* 保存されているプッシュ データよりも新しいデータをクライアントが必要としている。

厳密に言えば、まだ当面はブラウザの機能がそれぞれ異なるという理由もあります。ただ、必ずあてはまるのは上述の主な 2 つの理由です。
ブラウザがペイロードをサポートしていない場合、subscription オブジェクトに鍵を格納できません。


ペイロードは、クライアントへの到達方法にかかわらず、暗号化が必要です。暗号化はソフトウェア開発の中でもかなり特殊な技術であるため、独自の暗号化システムを作成することはおすすめしません。幸い、幅広いプッシュ ライブラリを使用できます。


メッセージ サーバーを通じて送信されるペイロードは、公開鍵と認証秘密を使用して暗号化する必要があります。
また、メッセージに固有の 16 バイトの乱数も加える必要があります。
最後に、メッセージ サーバーに送信するリクエストの本文に追加します。


###  途中での送信 {: #sending-it-on-its-way }

ウェブプッシュ ノード ライブラリでは、組み込みの https ライブラリにあるリクエスト オブジェクトのインスタンスを使用してこれを実現できます。



    const https = require('https');


どこかの時点で、リクエストがメッセージ サーバーに送信されます。ウェブプッシュ ノード ライブラリでは、これを非同期で実行できるように、プロミス内にこのノードをラップします（適切な呼び出しによって、解決または拒否します）。以下に、[ウェブプッシュ ノード ライブラリ](https://github.com/web-push-libs/web-push)から取得した、この処理を実行するコードの例を示します。



メッセージ サーバーは即座にネットワーク リクエストに応答する点に注目してください。つまり、メッセージをクライアント アプリに非同期で送信します。



    const pushRequest = https.request(options, function(pushResponse) {  
      let body = '';    
      // Allow the payload to be sent out in chunks.  
      pushResponse.on('data', function(chunk) {  
        body += chunk;  
      });    
      // Check to see if the push is successful.  
      pushResponse.on('end', function() {  
        if (pushResponse.statusCode !== 201) {  
          reject(new WebPushError('Received unexpected response code',  
            pushResponse.statusCode, pushResponse.headers, body));  
        } else {  
          // Do something with the response body.  
        }  
     });  
    });  

    if (requestPayload) {  
      pushRequest.write(requestPayload);  
    }  

    pushRequest.end();  

    pushRequest.on('error', function(e) {  
      console.error(e);  
    });


{# wf_devsite_translation #}
