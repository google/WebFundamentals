project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのブラウザおよび端末は、ユーザーの地理的位置を検知することができます。 お使いのサイトやアプリ内でユーザーの場所を使って作業する方法を学習します。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# User Location {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Geolocation API では、ユーザーの場所を確認できますが、これは常にユーザーの 同意を得て行います。」 この機能は、ユーザーのクエリの一部として使用することができます。たとえば、 目的地点に人を案内するなどです。 また、「ジオ タグ」ユーザーが作成したいくつかのコンテンツに使用することができます。たとえば、 写真を撮った場所に印を付ける などです。

また、Geolocation API では、ユーザーの場所を確認でき、
移動するにつれてタブを保持できますが、これらは常にユーザーの同意を得て行います (ページが開いている間のみ)。これには興味深い多くのユースケースがあります。たとえば、ユーザーが近くにいる場合に、バックエンド·システムと統合して、集荷の注文の準備ができます。

Geolocation API を使用する際には多くの注意が必要ですが、このガイドで一般的なユースケースと解決策を説明します。



## ユーザーから位置情報提供の同意を得る 




ウェブ開発者として、ユーザーの位置情報にアクセスすることにより、高度なフィルタリング、地図上のユーザー位置のピンポイントでの特定、ユーザーの現在位置に基づいてユーザーが出来ることをプロアクティブに提案する、といった非常に多くの機会を得ることができます。

ユーザーとしては、物理的な場所は
秘密情報であり、信用できる人のみにその情報を提供します。  これが、サイトがユーザーの場所を尋ねる場合に、ブラウザでプロンプトを
表示する理由です。


最近のユーザー研究によると、
ユーザーは、ページ読み込み後にユーザーの
場所を単純に尋ねるサイトを信用しないということが<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">示されて</a>います。 では、ベスト プラクティスは何でしょうか?

### TL;DR {: .hide-from-toc }
- ユーザーは自分の場所を知らせようとしない、ということを前提にします。
- ユーザーの位置情報へのアクセスを必要とする理由を明確にします。
- ページが読み込まれた時点で直ちにはプロンプトを表示しないようにします。


### ユーザーは自分の場所を知らせようとしない、ということを前提にします。

これは難しいかも知れませんが、多くのユーザーは自分の
場所を知らせたくないと考えるため、防御的な開発スタイルを変える必要があります。

1.  Geolocation API からのすべてのエラーを処理して、
    サイトをこの条件に適応させるようにします。
2.  位置情報の必要性を明確かつ明示的にします。
3.  必要な場合は、代替ソリューションを使用します。

### Geolocation が必要な場合は、代替ソリューションを使用します。

サイトやアプリケーションを、ユーザーの現在位置への
アクセスを必要しないようにすることを推奨しますが、アプリケーションやサイトが
それをどうしても必要とする場合は、ユーザーの現在位置の
最良の推測を可能にするサードパーティのソリューションがあります。

そういったアプリケーションの多くは、ユーザーの IP アドレスを取得して、これを RIPE データベースに登録された
物理的な位置にマッピングすることによって機能します。  その位置情報は、
あまり正確でないことが多く、ユーザーに最も近い
無線通信ハブや電波搭の位置を提供します。  多くの
ケースでは、特にユーザーが VPN 
または他のプロキシ サービスを使用していると、さらに不正確になることもあります。

### 常に、ユーザーの操作時に位置情報へのアクセスをリクエストします。

ユーザーが、なぜ位置情報を求められているのか、提供するとどのような
利点があるかを、ユーザーが理解できるようにします。  
サイトが読み込まれると同時に、ホームページで位置情報を求めることは、あまり良くないユーザー エクスペリエンスを与える結果になります。

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>サイトが読み込まれると同時に、ホームページで位置情報を求めることは、あまり良くないユーザー エクスペリエンスを与える結果になります。</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption> 常に、ユーザーの操作時に位置情報へのアクセスをリクエストします。</figcaption>
      </figure>
  </div>
</div>

代わりに、ユーザーに対して明確なアクションを要求する、または
ユーザーの操作が位置情報へのアクセスを必要としていることを示します。  すると、ユーザーは、
より容易に、アクセスのシステム プロンプトと、
今開始したばかりのアクションを関連付けることができます。

### ユーザーのアクションが位置情報を必要とすることを明確に示します。

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">Google Ad チームの研究では</a>、ユーザーが、特定のホテルのサイトで開催が予定されているコンファレンスのためにボストンのホテルを予約するように求められると、ホームページの「検索と予約」のアクション呼び出しをタップすると直後に GPS の位置情報の共有が求められます。

いくつかのケースでは、
ボストンのホテルの部屋を予約したいときに、なぜ
サンフランシスコのホテルが表示されるのか、理解に苦しんでフラストレーションを感じることがあります。

より良いエクスペリエンスは、
その場所を求める理由をユーザーが理解できるようにすることです。 距離計のような、
デバイスによらず一般的な記号表現を追加します。

<img src="images/indication.png">

または、「この近くを検索」のような非常に明示的なアクションの呼び出しを考慮します。

<img src="images/nearme.png">

### 位置情報へのアクセス許可が得られるように、丁寧に誘導します。

ユーザーの動作の各ステップにまではアクセスできません。  
どのような場合にユーザーが位置情報へのアクセスを拒否するかは正確に理解できてても、
どのような場合にアクセスに同意するかは不明で、結果が表示されたときにのみアクセスが得られたことがわかります。

ユーザーのアクションの完了を必要とする場合は、アクションを起こすようにユーザーの「注意を引く」ことが重要です。

推奨事項: 

1.  短い時間経過後にトリガーするタイマーを設定します - 5 秒が適切な値です。
2.  エラー メッセージが出る場合は、そのメッセージをユーザーにも表示します。
3.  望ましい応答が得られたら、タイマーを無効にして結果を処理します。
4.  タイマーがタイムアウトしても望む応答が得られない場合は、ユーザーに通知を表示します。
5.  応答が遅れて得られ、通知がまだ表示されている場合は、その通知を画面から消去します。


    button.onclick = function() {
      var startPos;
      var element = document.getElementById("nudge");
    
      var showNudgeBanner = function() {
        nudge.style.display = "block";
      };
    
      var hideNudgeBanner = function() {
        nudge.style.display = "none";
      };
    
      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
    
      var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId); 
    
        // Do magic with location
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
    



## Obtain the user's current location 




Geolocation API では、ユーザーの場所を確認できますが、これは常にユーザーの同意を得て行います。 この機能は、ユーザーのクエリの一部として使用することができます。たとえば、目的地点に人を案内するなどです。 また、ユーザーが作成したいくつかのコンテンツの「ジオタグ」に使用することができます。たとえば、写真を撮った場所に印を付けるなどです。


### TL;DR {: .hide-from-toc }
- API を使用する前に互換性を確認します。
- 高精度位置よりも低精度位置が適しています。
- 常にエラーを処理。
- ユーザーのバッテリーを節約するために、頻繁にデータをポーリングしないでください。


API は端末に依存しません。クライアントが標準の方法
で場所データを要求および受信する限り、ブラウザが場所を特定する
方法も考慮しません。 基礎となるメカニズムは、GPS、Wi-Fi を媒介する可能性があります。
あるいは、ユーザーに手動で場所の入力を求めます。 これらの検索のいずれかに時間がかかるため、
API は非同期になっています。
場所をリクエストするたびにコールバック メソッドを渡します。

### Geolocation を使用する場合

*  ご自身の物理的な場所に最も近いユーザーの場所を検索し、
ユーザー·エクスペリエンスを調整します。
*  ユーザーの場所へ送る情報 (ニュースなど) を調整します。
*  ユーザの位置を地図上に表示します。
*  タグ データは、アプリケーション内にユーザーの位置と共に作成されます
 (写真のジオタグなど)。


### 互換性の確認

Geolocation API は現在、大部分のブラウザーでサポートされていますが、
何かを実行する前に必ずサポートについて確認することをお勧めします。

Geolocation オブジェクトの存在をテストすることによって、互換性を
確認することができます。


    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    

### ユーザーザの現在位置を決定する

Geolocation API は、ユーザーの位置を取得するために、
単純な「ワンショット」法を提供しています`getCurrentPosition()`。  このメソッドの呼び出しは、
非同期的にユーザーの現在の場所を報告します。


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
    

このドメイン上のアプリケーションがアクセス許可を要求したのが今回が初めての場合、
ブラウザは通常、ユーザーの同についてチェックします。 ブラウザによって
、常に許可または非許可の設定を行う場合があります。
許可の検索を行う場合は、確認プロセスがバイパスされます。

ブラウザが使用している場所の端末によっては、位置オブジェクトが、
実際には単に緯度と経度よりも多くを含んでいる場合があります。たとえば、高度や方向などです。  実際にデータが返されるまで、その場システムが使用する追加情報がどのようなものかは分かりません。

### Geolocation のサイトでのテスト

アプリケーションで HTML5 の Geolocation を使って作業する場合には、
経度と緯度に異なる値を使用したときには、
受信した出力をデバッグするために役立ちます。

DevTools は、navigator.geolocation の更新位置の値と、
更新メニューで提供されていない模擬ジオロケーションの両方をサポートしています。

<img src="images/emulategeolocation.png">

1. DevTools で更新メニューを開きます。
2. “Override Geolocation” をクリックして、Lat = 41.4949819 and Lon = -0.1461206 を入力します。
3. ページを更新すると、Geolocation の位置が更新されます。

###  常にエラーを処理

残念ながら、検索が正常に行われていない場所があります。 GPS で位置を確認できなかったか、
あるいはユーザーが場所の検索を突然無効にした可能性があります。 2 つめの
任意の `getCurrentPosition()` の引数は、エラー発生時に呼び出され、
コールバックの内部をユーザーに通知することができます。


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
    

### 地理的位置のハードウェアの起動の必要性を低減

多くのユースケースでは、ユーザーの最新の場所の情報は必要ありません。
大まかな目安だけが必要です。

`maximumAge` のオプションのプロパティを使用して、最近得られた地理的位置の結果を使用するようにブラウザに
指示します。  ユーザーが前のデータをリクエストした場合、より迅速に返されるだけでなく、
Wifi の三角測量や GPS などのジオロケーション 
ハードウェア·インタフェースをブラウザが起動しないようにします。


    window.onload = function() {
      var startPos;
      var geoOptions = {
      	maximumAge: 5 * 60 * 1000,
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    

### ユーザー待たせず、タイムアウトを設定する

タイムアウトを設定しない限り、現在の位置のリクエストが戻らない可能性があります。


    window.onload = function() {
      var startPos;
      var geoOptions = {
         timeout: 10 * 1000
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    

### 高精度位置よりも低精度位置が適しています。

ユーザーに最も近い店舗を検索する場合、
1 メートルの精度を必要とすることはほとんどありません。  API は、可能な限り迅速に返すために、
低精度位置を提示するように設計されています。

高精度が必要な場合には、`enableHighAccuracy` オプションで
デフォルト設定を上書きすることが可能です。  これは慎重に使用してください。解像が遅くなり、
多くのバッテリーを消費します。


    window.onload = function() {
      var startPos;
      var geoOptions = {
        enableHighAccuracy: true
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    




## Monitor the user's location 




Geolocation API では、ユーザーの場所を確認でき、移動するにつれてタブを保持できますが、これらは常にユーザーの同意を得て行います。


API は端末に依存しません。クライアントが標準の方法
で場所データを要求および受信する限り、ブラウザが場所を特定する
方法も考慮しません。 基礎となるメカニズムは、GPS、Wi-Fi を媒介する可能性があります。 これらの検索の
いずれかに時間がかかるため、API は非同期になっています。
場所をリクエストするたびにコールバック メソッドを渡します。

### TL;DR {: .hide-from-toc }
- API を使用する前に互換性を確認します。
- バッテリーを節約するために、ユーザーの位置確認の使用を最小限に抑えます。
- 常にエラーを処理。


### ユーザーの位置を確認するために Geolocation を使用する場合

*  ユーザーの位置のより正確なロックを取得します。
*  アプリケーションは、新しい位置情報に基づいてユーザー インターフェースをアップデートする
必要があります。
*  アプリケーションは、ユーザーが特定の定義されたゾーンに入ったときに、
ビジネス ロジックをアップデートする必要があります。

### ユーザーの位置の監視

Geolocation API を使用すると、`getCurrentPosition()` に一度コールするためで、ユーザーの位置を取得することができます (ユーザーの
同意が必要)。  

継続的にユーザーの位置を監視する場合、Geolocation API 
の `watchPosition()` と呼ばれるメソッドを使用します。 これは、
`getCurrentPosition()` と同様に動作しますが、位置決定ソフトウェアとして
複数回起動します。

1.  利用者のより正確なロックを取得します。
2.  ユーザーの位置が変わります。
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });
    

### 常にクリアーしてバッテリーを節約する

GeoLocation での変更の監視は、無料の操作ではありません。  オペレーティング 
システムがプラットフォーム機能を導入して、
アプリケーションが地理サブシステムにフックできるようにしながら、
ウェブ開発者は、ユーザーの位置を監視するためのユーザー端末のサポートが分からないことがあります。
また、位置を監視している間、端末で多くの処理が生じています。

ユーザーの位置を追跡する必要がなくなったら、`clearWatch` をコールして、
GeoLocation システムをオフにしてください。

###  常にエラーを処理

残念ながら、検索が正常に行われていない場所があります。 GPS で位置を確認できなかったか、
あるいはユーザーが場所の検索を突然無効にした可能性があります。 2 つめの
任意の getCurrentPosition() の引数は、エラー発生時に呼び出され、
コールバックの内部をユーザーに通知することができます。


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.watchPosition(geoSuccess, geoError);
    };
    


