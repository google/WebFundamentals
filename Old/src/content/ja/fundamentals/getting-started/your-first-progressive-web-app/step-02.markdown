---
title: "App Shell を実装する"
description: "プログレッシブ ウェブアプリ内でApp Shellをどのように使うか？"
updated_on: 2016-04-16
translators:
  - yoichiro
notes:
  learn-about-wsk: "<a href='https://developers.google.com/web/tools/starter-kit/'>Web Starter Kit</a> の詳細をご覧ください。"
  image-sprite: "個別に各アイコンを指定すると、画像のスプライトを使用する場合と比較して効率が悪く見えるかもしれませんが、アプリのシェルの一部として後でそれらをキャッシュし、ネットワーク要求をする必要なく常に利用可能であることを保証します。"
  give-you: "時間短縮のため、また確実な材料を使って作業を始められるように、マークアップとスタイルをご用意しました。次のセクションでは自分でコードを書く機会もあります。"
---

<p class="intro">
どのようなプロジェクトでも開始にはいくつかの方法がありますが、通常は
Web Starter Kit の利用をおすすめしています。ただし今回は、プロジェクトをできるだけ
簡単なものにしてプログレッシブ ウェブアプリに集中できるように、必要なリソースを
すべてご用意しました。
</p>

{% include shared/toc.liquid %}

## コードのダウンロード

簡単に使えるように、[このプログレッシブ ウェブアプリガイドのすべてのコードをZIP
ファイルとしてダウンロード](pwa-weather.zip)することができます。各ステップで必要となるすべての
リソースがZIPファイル内から利用可能です。

## App Shell の HTML を作成する

可能な限りクリーンな状態で始めることを確認するために、ブランドの新しい`index.html`
ファイルから始めて、[App Shell を構築する](step-01)で取り上げた中心的な構成要素を
追加しましょう。

今回の構成要素をもう一度挙げます。

* タイトル ヘッダー、追加  / 更新ボタン
* 予報カードのコンテナ
* 予報カードのテンプレート
* 都市の追加用ダイアログ ボックス
* 読み込みインジケータ

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <!-- Insert link to styles.css here -->
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather App</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main" hidden>
    <!-- Insert forecast-card.html here -->
  </main>

  <div class="dialog-container">
    <!-- Insert add-new-city-dialog.html here -->
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
{% endhighlight %}

`main`コンテンツが`hidden`であり、ローダーがデフォルトで表示されることに注目
してください。ページが読み込まれるとすぐにローダーがユーザーの目に入り、これから
コンテンツが読み込まれることがはっきりわかるようになっています。

次に、予報カードを追加し、そして New City ダイアログを追加しましょう。時間を節約
するために、それらは`resources`ディレクトリの中で提供されていますので、対応する場所
にそれらを簡単にコピーアンドペーストすることができます。

## 主要な UI コンポーネントにスタイルを追加する

ここで、コアスタイルを追加します。ビルドやデプロイプロセスの一環として、ドキュメント
ボディにそれらのコアスタイルをインラインで記述したいところですが、今回は分離された
CSSファイルにそれらを置きましょう。

`index.html`ファイル内で、`<!-- Insert link to styles here -->`を以下に
置き換えます。

{% highlight html %}
<link rel="stylesheet" type="text/css" href="styles/inline.css">
{% endhighlight %}

時間を節約するために、あなたが使える[stylesheet](https://weather-pwa-sample.firebaseapp.com/styles/inline.css)
をすでに作成してあります。それをレビューし、そしてあなた自身でそれをカスタマイズする
ために数分使ってください。

{% include shared/note.liquid list=page.notes.image-sprite %}

## 実行と調整

今が実行する絶好の時です。これらがどのような見た目になるかを見て、そしてあなたが
行いたい調整をしてください。`main`コンテナから`hidden`属性を削除し、そしてカードに
幾つかの架空のデータを追加することによって、予報カードの描画をテストしてください。

{% include shared/remember.liquid list=page.notes.give-you %}

このアプリは現状ほぼレスポンシブですが、完全ではありません。レスポンシブ性を改善し、
異なるデバイスを横断して本当に光り輝かせるために、追加のスタイルを加えてみてください。
また、あなた自身でできることを考えてみてください。

## 主要な JavaScript ブートコードを追加する

ここまでで、ユーザー インターフェースの大半が揃いました。次はすべてが動作するように
コードを組み合わせます。App Shell の他の部分と同様に、中心的なエクスペリエンスを
実現するのに重要なコードがどれで、後で読み込むことのできるコードがどれかを意識して
作業してください。

今回のブートコードには次の要素が含まれています。

* アプリに必要な基本情報を含んでいる`app`オブジェクト。
* すべてのボタンのイベント リスナー。ヘッダーのボタン（`add`/`refresh`）と、
都市の追加ダイアログのボタン（`add`/`cancel`）があります。
* 予報カードを追加または更新するためののメソッド（`app.updateForecastCard`）。
* Firebase Public Weather API から最新の天気予報データを取得するためのメソッド
（`app.getForecast`）。
* 表示のテスト用の架空データ（`fakeForecast`）。

JavaScript コードを追加してください。

1. `resources`ディレクトリからあなたの`scripts`フォルダへ`step3-app.js`ファイルを
コピーして、それを`app.js`に名前変更してください。
1. `index.html`ファイル内で、新しく作られた`app.js`へのリンクを追加してください。<br/>
`<script src="/scripts/app.js"></script>`

## テスト

基本の HTML、スタイル、JavaScript が揃ったので、アプリをテストしましょう。
この時点で行われる動作は限定的ですが、コンソールにエラーが書き込まれないことを確認
してください。

架空の天気データがどのように表示されるかを確認するには、`app.js`ファイルの末尾に
次の行を追加してください。

`app.updateForecastCard(fakeForecast);`

<a href="https://weather-pwa-sample.firebaseapp.com/step-03/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">試す</a>
