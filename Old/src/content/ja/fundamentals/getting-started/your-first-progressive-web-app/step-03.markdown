---
title: "最初の読み込みを高速に行えるようにする"
description: "プログレッシブ ウェブアプリとApp Shellモデルを使った高速な最初の読み込み。"
updated_on: 2016-04-23
translators:
  - yoichiro
notes:
  extra-credit: "補習: <code>localstorage</code> の実装を <a href='https://www.npmjs.com/package/idb'>idb</a> に置き替えてみましょう。"
---

<p class="intro">
プログレッシブ ウェブアプリは、高速に起動してすぐに使えるものでなければなりません。現在の状態では、お天気アプリは高速に起動しますが、データがないため使えるものになっていません。AJAX リクエストを使ってデータを取得することもできますが、それではリクエストを余分に行うことになり、最初の読み込みに時間がかかってしまいます。そこで、最初の読み込みでは実際のデータを指定します。
</p>

{% include shared/toc.liquid %}

## 天気予報データを挿入する

このコードラボでは天気予報の静的データをあらかじめ指定します。ただし本番のアプリでは、
ユーザーの IP アドレスから判定できる地域情報に基づいて、最新の天気予報データを
サーバーから挿入することになります。

即時呼び出しの関数式の内部に以下のコードを追加します。

{% highlight javascript %}
var initialWeatherForecast = {
  key: 'newyork',
  label: 'New York, NY',
  currently: {
    time: 1453489481,
    summary: 'Clear',
    icon: 'partly-cloudy-day',
    temperature: 52.74,
    apparentTemperature: 74.34,
    precipProbability: 0.20,
    humidity: 0.77,
    windBearing: 125,
    windSpeed: 1.52
  },
  daily: {
    data: [
      {icon: 'clear-day', temperatureMax: 55, temperatureMin: 34},
      {icon: 'rain', temperatureMax: 55, temperatureMin: 34},
      {icon: 'snow', temperatureMax: 55, temperatureMin: 34},
      {icon: 'sleet', temperatureMax: 55, temperatureMin: 34},
      {icon: 'fog', temperatureMax: 55, temperatureMin: 34},
      {icon: 'wind', temperatureMax: 55, temperatureMin: 34},
      {icon: 'partly-cloudy-day', temperatureMax: 55, temperatureMin: 34}
    ]
  }
};
{% endhighlight %}

次に、前にテストのために作成した`fakeForecast`データはもう使うことはないので、削除します。

## 初回実行時と区別する

さて、前述の情報を表示するタイミングはどのように判断するのでしょうか。今後お天気
アプリがキャッシュから取得されて読み込まれるとき、この情報の関連性は失われている
かもしれません。ユーザーが次にアプリを読み込むときには都市が変わっている可能性も
あります。そのため、これまでに確認された都市に限らず、該当する都市の情報を読み込む
必要があります。

ユーザーが登録した都市のリストのようなユーザー設定は、IndexedDB などの高速な
ストレージ システムを利用してローカルに保存しておく必要があります。今回はできるだけ
簡単な例にするために <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</a>
を使用しましたが、これは本番のアプリには適していません。`localStorage` では
ブロッキングな同期の仕組みが使われており、端末によっては著しくスピードが低下する
可能性があるためです。

{% include shared/note.liquid list=page.notes.extra-credit %}

まず、`app.js`  内の即時呼び出しの関数式の最後に、ユーザー設定の保存に必要な
コードを追加します。

{% highlight javascript %}
// Save list of cities to localStorage, see note below about localStorage.
app.saveSelectedCities = function() {
  var selectedCities = JSON.stringify(app.selectedCities);
  // IMPORTANT: See notes about use of localStorage.
  localStorage.selectedCities = selectedCities;
};
{% endhighlight %}

次に、スタートアップ コードを追加します。このコードでは、ユーザーが登録している
都市があるか確認してその都市を読み込むか、サーバーからのデータを使用します。
`app.js` ファイル内の、先程追加したコードの後に次のコードを追加しましょう。

{% highlight javascript %}
/****************************************************************************
 *
 * Code required to start the app
 *
 * NOTE: To simplify this getting started guide, we've used localStorage.
 *   localStorage is a synchronous API and has serious performance
 *   implications. It should not be used in production applications!
 *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
 *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
 *
 ****************************************************************************/

app.selectedCities = localStorage.selectedCities;
if (app.selectedCities) {
  app.selectedCities = JSON.parse(app.selectedCities);
  app.selectedCities.forEach(function(city) {
    app.getForecast(city.key, city.label);
  });
} else {
  app.updateForecastCard(initialWeatherForecast);
  app.selectedCities = [
    {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
  ];
  app.saveSelectedCities();
}
{% endhighlight %}

最後に、ユーザーが新しい都市を追加したときには必ず都市のリストを保存することを
忘れないでください。それには、`butAddCity` ボタンのイベント ハンドラに
`app.saveSelectedCities();` を追加します。

## テスト

* 初回実行時には、`initialWeatherForecast` からの予報が即座に表示される必要があります。
* 右上の + アイコンをクリックして都市を追加し、2 つのカードが表示されることを確認します。
* ブラウザを更新して、アプリに両方の予報が読み込まれ最新情報が表示されることを確認します。

<a href="https://weather-pwa-sample.firebaseapp.com/step-04/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">試す</a>
