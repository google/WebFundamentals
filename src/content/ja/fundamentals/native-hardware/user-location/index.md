project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのブラウザおよび端末は、ユーザーの地理的位置を検知することができます。ここでは、自身のサイトやアプリ内でユーザーの位置情報を扱う方法を学習します。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2014-01-01 #}

# ユーザーの現在地 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Geolocation API では、ユーザーの同意を得たうえでユーザーの現在地を確認できます。この機能を使用すると、ユーザーを目的地に案内したり、ユーザーが作成したコンテンツにジオタグを付けたり（写真を撮った場所に印を付けるなど）できます。

Geolocation API では、ユーザーの同意を得ていれば（ページが開いている間のみ）ユーザーの位置を確認でき、移動中もどこにいるのかをトラックできます。
これにより、さまざまな興味深いユースケースが実現できるようになります。たとえば、バックエンド システムと統合することで、ユーザーが近くにいる場合に、注文した品を受け取れるように準備することができます。

Geolocation API を使用する際は、さまざまな点に注意する必要があります。このガイドでは一般的なユースケースとソリューションについて順を追って説明します。

注: Chrome 50 の時点では、[Geolocation API はセキュアなコンテキスト（HTTPS）でのみ機能します](/web/updates/2016/04/geolocation-on-secure-contexts-only)。セキュアでない仕組み（`HTTP` など）でホストされているサイトの場合、ユーザーの場所を取得するリクエストは**機能しなくなります**。

### TL;DR {: .hide-from-toc }

- ユーザーにメリットがあるときに位置情報を使用します。
- ユーザー操作に対する明確なレスポンスとしてパーミッションを要求します。
- ユーザーのブラウザが位置情報をサポートしていない場合に備えて、機能検出を使用します。
- 位置情報を実装する方法だけでなく、位置情報を最大限活用する方法を学びます。
- サイトで位置情報をテストします。

## 位置情報の用途

- 特定の物理的な位置に最も近いユーザーの現在地を検索し、ユーザー エクスペリエンスを調整します。
- ユーザーのいる場所に応じた情報（ニュースなど）を表示します。
- ユーザーの位置を地図上に表示します。
- タグデータは、アプリケーション内にユーザーの位置情報と共に作成されます（写真のジオタグなど）。

## 責任を持ってパーミッションを求める

最近のユーザー調査では、ユーザーは、ページ読み込み後に単純に位置情報を要求するサイトを信用しないという結果が[示されています](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)。では、ベスト プラクティスは何でしょうか?

### ユーザーは自分の場所を知らせようとしないと想定する

多くのユーザーは自分の場所を知らせたくないと考えるため、受け身の開発スタイルを採用する必要があります。

1. Geolocation API からのすべてのエラーを処理して、サイトをこの条件に適応させるようにします。
2. 位置情報の必要性を明確かつ明示的にします。
3. 必要に応じて代替ソリューションを使用します。

### Geolocation で必要な場合は、代替ソリューションを使用する

サイトやアプリケーションで、ユーザーの現在位置へのアクセスを要求しないようにすることをお勧めしますが、
現在位置を取得する必要がある場合は、サードパーティのソリューションによってユーザーの現在位置を適切に推測することができます。

そういったソリューションの多くは、ユーザーの IP アドレスを取得して、それを RIPE データベースに登録された物理的な位置にマッピングすることによって機能します。多くの場合、これらの位置情報はあまり正確ではなく、通常、ユーザーに最も近い無線通信ハブや電波搭の位置が提供されます。多くのケースでは、特にユーザーが VPN または他のプロキシ サービスを使用していると、さらに精度が落ちる場合もあります。

### ユーザーの操作時に限って位置情報へのアクセスをリクエストする

位置情報が必要な理由と位置情報を提供した場合の利点を、ユーザーが理解できるようにします。
サイトが読み込まれた直後にホームページで位置情報を求めると、ユーザーにあまり良くない印象を与えてしまいます。

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>推奨</b>: ユーザーの操作時に限って位置情報へのアクセスをリクエストします。</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>: サイトの読み込み時にホームページで位置情報を求めると、ユーザーにあまり良くない印象を与えてしまいます。</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

代わりに、ユーザーに対して明確なアクションを求めるか、ユーザーのアクションには位置情報へのアクセスが必要であることを示します。
この対応により、ユーザーは、自分が今行ったアクションによって、アクセスを要求するシステム プロンプトが表示されていることを理解しやすくなります。

### ユーザーのアクションに位置情報が必要であることを明確に示す

[Google Ads チームのある調査](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)では、ユーザーに対して、特定のホテルの会場で開催されるコンファレンスのためにボストンのホテルを予約するように求めました。ユーザーがホームページ上で [検索と予約] という行動喚起用のボタンをタップすると、直後に GPS の位置情報を共有するよう要求されます。

中には、ボストンのホテルの部屋を予約したいときに、サンフランシスコのホテルが表示される理由が分からず、ストレスを感じたユーザーもいました。

ユーザー エクスペリエンスを改善するには、位置情報を要求している理由をユーザーが理解できるようにする必要があります。
レンジ ファインダーのような端末によらない共通のマークを追加するか、[この近くを検索] などの明示的な行動喚起を行うことを検討します。

<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      レンジ ファインダーの使用</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      付近を検索するための具体的な行動喚起</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 位置情報へのアクセス許可が得られるようにユーザーを丁寧に誘導する

あらゆるユーザー操作にアクセスできるわけではありません。ユーザーが位置情報へのアクセスを拒否するシーンは自明でも、アクセスを許可するシーンは特定できないため、結果が表示されるまではアクセスが許可されたことを知ることができません。

ユーザーにアクションを完了してほしい場合は、アクションを行うようにユーザーを「誘導する」ことが重要です。

推奨事項:

1. 短い時間が経過した後にトリガーするタイマーを設定します（推奨値は 5 秒）。
2. エラー メッセージが出る場合は、そのメッセージをユーザーに表示します。
3. 期待する応答が得られたら、タイマーを無効にして結果を処理します。
4. タイムアウトしても期待する応答が得られない場合は、ユーザーに通知を表示します。
5. 応答が遅れて得られ、通知がまだ表示されている場合は、その通知を画面から削除します。

<div style="clear:both;"></div>

```
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
```

## ブラウザ対応

Geolocation API は現在、大部分のブラウザでサポートされていますが、処理を実行する前には必ずサポート状況を確認することをお勧めします。

Geolocation オブジェクトの有無を調べることで、簡単に互換性を確認することができます。

```
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS.');
}
```

## ユーザーの現在位置を測定する

Geolocation API の `getCurrentPosition()` を利用すると、一度の操作で簡単にユーザーの位置情報を取得できます。
このメソッドを呼び出すと、非同期的にユーザーの現在位置が報告されます。

```
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
```

そのドメイン上のアプリケーションが初めてアクセス許可をリクエストした場合、ブラウザは通常、ユーザーに位置情報の利用を許可するか確認します。ブラウザによっては、常に許可または拒否の設定がある場合があります。許可したうえで検索を行うと、以降は確認プロセスがスキップされます。

ブラウザで使用している位置情報デバイスによっては、緯度と経度に加えて、さらに多くの情報（高度や方向など）が位置オブジェクトに含まれている場合があります。ただし、実際にデータが返されるまで、その位置検出システムで使用する追加情報はわかりません。

## ユーザーの位置を監視する

Geolocation API を使用すると、一回 `getCurrentPosition()` を呼び出すことで、ユーザーの位置を取得することができます（ユーザーの同意が必要）。

ユーザーの現在位置を継続的に監視する必要がある場合は、Geolocation API メソッド `watchPosition()` を使用します。
動作は `getCurrentPosition()` と同様ですが、このメソッドは以下のような場合に、位置情報を得るために繰り返し処理を実行します。

1. より正確なユーザーの現在位置をトラックする。

2. ユーザーの位置が変化していることを特定する。

    var watchId = navigator.geolocation.watchPosition(function(position) {
    document.getElementById('currentLat').innerHTML = position.coords.latitude;
    document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### ユーザーの位置を確認するために位置情報を使用する場合

- より正確なユーザーの現在位置をトラックしたい。
- 新しい位置情報に基づいて、アプリケーションでユーザー インターフェースをアップデートする必要がある。
- ユーザーが特別に定義されたゾーンに入ったときに、アプリケーションでビジネス ロジックをアップデートする必要がある。

## 位置情報を使用するときのベスト プラクティス

### 不要な追跡は必ず停止してバッテリーを節約する

GeoLocation で位置情報の変化を監視するには、リソースが必要になります。オペレーティング システムでプラットフォーム機能を導入し、アプリケーションから地理サブシステムに接続できるようになっても、ウェブ開発者側は、ユーザーの端末でどの位置監視機能がサポートされているかを知ることができません。また、位置を監視している間は、端末上で追加の処理が多く発生します。

ユーザーの位置を追跡する必要がなくなったら、`clearWatch` を呼び出して、位置情報システムをオフにしてください。

### エラーを正しく処理する

残念ながら、検索が正常に行われない場合もあります。たとえば GPS で位置を確認できない場合や、ユーザーが場所の検索を突然無効にした場合などです。
エラーが発生した場合、任意で `getCurrentPosition()` の第 2 引数に指定したコールバック関数が呼び出されるため、その中でユーザーにエラーを通知することができます。

```
window.onload = function() {
  var startPos;
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
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
```

### 位置情報ハードウェアを極力起動しないようにする

多くのユースケースでは、ユーザーの最新の位置情報は必要なく、大まかな位置がわかれば十分です。

`maximumAge` オプション プロパティを使用して、最近得られた位置情報の結果を使用するようにブラウザに指示します。
これにより、ユーザーが以前にデータをリクエストしていた場合に、より迅速にデータが返されるようになるだけでなく、ブラウザによって WiFi の三角測量や GPS などの位置情報ハードウェア インターフェースが起動されなくなります。

```
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
```

### ユーザー待たせず、タイムアウトを設定する

タイムアウトを設定しないと、現在位置のリクエストに対するレスポンスがずっと返ってこない場合があります。

```
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
```

### 高精度の位置情報よりも低精度の位置情報を優先する

ユーザーに最も近い店舗を検索する際に、誤差が 1 メートル程度の高精度な情報が必要になることはほぼありません。
API は、可能な限り迅速に結果を返すために、低精度の位置情報を返すように設計されています。

高精度の位置情報が必要な場合は、`enableHighAccuracy` オプションでデフォルトの設定をオーバーライドすることができます。
ただし、高精度の測位には時間がかかり、バッテリーの消費量も多いため、この設定は慎重に行ってください。

```
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
```

## Chrome DevTools で位置情報をエミュレートする{: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

位置情報をセットアップしたら、次の操作を行う必要があります。

- さまざまな位置情報に対してアプリがどのように機能するかをテストする。
- 位置情報が利用できないときに、アプリの機能が適切に制限されることを確認する。

Chrome DevTools では、この両方の確認が可能です。

[Chrome DevTools を開いて](/web/tools/chrome-devtools/#open)、[Console Drawer を表示します](/web/tools/chrome-devtools/console/#open_as_drawer)。

[Console Drawer のメニューを開き](/web/tools/chrome-devtools/settings#drawer-tabs)、[**Sensors**] オプションをクリックして、Sensors Drawer を表示します。

ここで、位置をプリセットされた主要都市でオーバーライドしたり、カスタムの位置情報を入力したり、オーバーライドを **Location unavailable** に設定して位置情報を無効にしたりできます。
