---
title: "Monitor the user's location"
description: "Geolocation API では、ユーザーの場所を確認でき、移動するにつれてタブを保持できますが、これらは常にユーザーの同意を得て行います。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - API を使用する前に互換性を確認します。
    - バッテリーを節約するために、ユーザーの位置確認の使用を最小限に抑えます。
    - 常にエラーを処理。
---

<p class="intro">
  Geolocation API では、ユーザーの場所を確認でき、移動するにつれてタブを保持できますが、これらは常にユーザーの同意を得て行います。
</p>

{% include shared/toc.liquid %}

API は端末に依存しません。クライアントが標準の方法
で場所データを要求および受信する限り、ブラウザが場所を特定する
方法も考慮しません。 基礎となるメカニズムは、GPS、Wi-Fi を媒介する可能性があります。 これらの検索の
いずれかに時間がかかるため、API は非同期になっています。
場所をリクエストするたびにコールバック メソッドを渡します。

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## ユーザーの位置を確認するために Geolocation を使用する場合

*  ユーザーの位置のより正確なロックを取得します。
*  アプリケーションは、新しい位置情報に基づいてユーザー インターフェースをアップデートする
必要があります。
*  アプリケーションは、ユーザーが特定の定義されたゾーンに入ったときに、
ビジネス ロジックをアップデートする必要があります。

## ユーザーの位置の監視

Geolocation API を使用すると、`getCurrentPosition()` に一度コールするためで、ユーザーの位置を取得することができます (ユーザーの
同意が必要)。  

継続的にユーザーの位置を監視する場合、Geolocation API 
の `watchPosition()` と呼ばれるメソッドを使用します。 これは、
`getCurrentPosition()` と同様に動作しますが、位置決定ソフトウェアとして
複数回起動します。

1.  利用者のより正確なロックを取得します。
2.  ユーザーの位置が変わります。
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## 常にクリアーしてバッテリーを節約する

GeoLocation での変更の監視は、無料の操作ではありません。  オペレーティング 
システムがプラットフォーム機能を導入して、
アプリケーションが地理サブシステムにフックできるようにしながら、
ウェブ開発者は、ユーザーの位置を監視するためのユーザー端末のサポートが分からないことがあります。
また、位置を監視している間、端末で多くの処理が生じています。

ユーザーの位置を追跡する必要がなくなったら、`clearWatch` をコールして、
GeoLocation システムをオフにしてください。

##  常にエラーを処理

残念ながら、検索が正常に行われていない場所があります。 GPS で位置を確認できなかったか、
あるいはユーザーが場所の検索を突然無効にした可能性があります。 2 つめの
任意の getCurrentPosition() の引数は、エラー発生時に呼び出され、
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
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


