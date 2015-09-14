---
title: "Obtain the user's current location"
description: "Geolocation API では、ユーザーの場所を確認できますが、これは常にユーザーの同意を得て行います。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    -  API を使用する前に互換性を確認します。
    -  高精度位置よりも低精度位置が適しています。
    -  常にエラーを処理。
    -  ユーザーのバッテリーを節約するために、頻繁にデータをポーリングしないでください。

---

<p class="intro">
  Geolocation API では、ユーザーの場所を確認できますが、これは常にユーザーの同意を得て行います。 この機能は、ユーザーのクエリの一部として使用することができます。たとえば、目的地点に人を案内するなどです。 また、ユーザーが作成したいくつかのコンテンツの「ジオタグ」に使用することができます。たとえば、写真を撮った場所に印を付けるなどです。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

API は端末に依存しません。クライアントが標準の方法
で場所データを要求および受信する限り、ブラウザが場所を特定する
方法も考慮しません。 基礎となるメカニズムは、GPS、Wi-Fi を媒介する可能性があります。
あるいは、ユーザーに手動で場所の入力を求めます。 これらの検索のいずれかに時間がかかるため、
API は非同期になっています。
場所をリクエストするたびにコールバック メソッドを渡します。

## Geolocation を使用する場合

*  ご自身の物理的な場所に最も近いユーザーの場所を検索し、
ユーザー·エクスペリエンスを調整します。
*  ユーザーの場所へ送る情報 (ニュースなど) を調整します。
*  ユーザの位置を地図上に表示します。
*  タグ データは、アプリケーション内にユーザーの位置と共に作成されます
 (写真のジオタグなど)。


## 互換性の確認

Geolocation API は現在、大部分のブラウザーでサポートされていますが、
何かを実行する前に必ずサポートについて確認することをお勧めします。

Geolocation オブジェクトの存在をテストすることによって、互換性を
確認することができます。

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## ユーザーザの現在位置を決定する

Geolocation API は、ユーザーの位置を取得するために、
単純な「ワンショット」法を提供しています`getCurrentPosition()`。  このメソッドの呼び出しは、
非同期的にユーザーの現在の場所を報告します。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

このドメイン上のアプリケーションがアクセス許可を要求したのが今回が初めての場合、
ブラウザは通常、ユーザーの同についてチェックします。 ブラウザによって
、常に許可または非許可の設定を行う場合があります。
許可の検索を行う場合は、確認プロセスがバイパスされます。

ブラウザが使用している場所の端末によっては、位置オブジェクトが、
実際には単に緯度と経度よりも多くを含んでいる場合があります。たとえば、高度や方向などです。  実際にデータが返されるまで、その場システムが使用する追加情報がどのようなものかは分かりません。

## Geolocation のサイトでのテスト

アプリケーションで HTML5 の Geolocation を使って作業する場合には、
経度と緯度に異なる値を使用したときには、
受信した出力をデバッグするために役立ちます。

DevTools は、navigator.geolocation の更新位置の値と、
更新メニューで提供されていない模擬ジオロケーションの両方をサポートしています。

<img src="images/emulategeolocation.png">

1. DevTools で更新メニューを開きます。
2. “Override Geolocation” をクリックして、Lat = 41.4949819 and Lon = -0.1461206 を入力します。
3. ページを更新すると、Geolocation の位置が更新されます。

##  常にエラーを処理

残念ながら、検索が正常に行われていない場所があります。 GPS で位置を確認できなかったか、
あるいはユーザーが場所の検索を突然無効にした可能性があります。 2 つめの
任意の `getCurrentPosition()` の引数は、エラー発生時に呼び出され、
コールバックの内部をユーザーに通知することができます。

{% highlight javascript %}
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
{% endhighlight %}

## 地理的位置のハードウェアの起動の必要性を低減

多くのユースケースでは、ユーザーの最新の場所の情報は必要ありません。
大まかな目安だけが必要です。

`maximumAge` のオプションのプロパティを使用して、最近得られた地理的位置の結果を使用するようにブラウザに
指示します。  ユーザーが前のデータをリクエストした場合、より迅速に返されるだけでなく、
Wifi の三角測量や GPS などのジオロケーション 
ハードウェア·インタフェースをブラウザが起動しないようにします。

{% highlight javascript %}
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
{% endhighlight %}

## ユーザー待たせず、タイムアウトを設定する

タイムアウトを設定しない限り、現在の位置のリクエストが戻らない可能性があります。

{% highlight javascript %}
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
{% endhighlight %}

## 高精度位置よりも低精度位置が適しています。

ユーザーに最も近い店舗を検索する場合、
1 メートルの精度を必要とすることはほとんどありません。  API は、可能な限り迅速に返すために、
低精度位置を提示するように設計されています。

高精度が必要な場合には、`enableHighAccuracy` オプションで
デフォルト設定を上書きすることが可能です。  これは慎重に使用してください。解像が遅くなり、
多くのバッテリーを消費します。

{% highlight javascript %}
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
{% endhighlight %}


