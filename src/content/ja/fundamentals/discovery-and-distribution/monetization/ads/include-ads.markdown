---
title: "AdSense 広告をサイトに組み込む"
description: "このガイドの手順に沿って、広告をサイトに組み込む方法を身に付けましょう。AdSense アカウントを作成し、広告ユニットを作成し、サイトにユニットを配置し、支払い設定を指定し、支払いを受け取ります。"
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - AdSense 広告を作成するには、18 歳以上であること、Google アカウントを所有していること、アドレスを所有していることが必要です。
    - 申し込みを送信する前にウェブサイトが配信状態であること、ウェブサイト コンテンツが AdSense ポリシーに準拠していることが必要です。
    - レスポンシブ広告ユニットを作成し、ユーザーがどのようなデバイスを使用していても広告が適切に表示されるようにします。
    - 支払い設定を確認して、収益が増えていくのを待ちます。
notes:
  crawler:
    - AdSense クローラーがサイトにアクセスするのをブロックしないようにします（詳細については、<a href="https://support.google.com/adsense/answer/10532">こちらのヘルプトピック</a>をご覧ください）。
  body:
    - すべての広告コードを body タグ内に貼り付けます。そうでなければ、広告は機能しません。
  smarttag:
    - <code>data-ad-client</code> と <code>data-ad-slot</code> は、生成した各広告ごとに固有のものになります。
    - 生成された広告コードの <code>data-ad-format=auto</code> タグは、レスポンシブ広告ユニット向けのスマートなサイズ設定動作を実現します。
---

<p class="intro">
  このガイドの手順に沿って、広告をサイトに組み込む方法を身に付けましょう。AdSense アカウントを作成し、広告ユニットを作成し、サイトにユニットを配置し、支払い設定を指定し、支払いを受け取ります。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 広告を組み込んだサンプルページを作成する

このチュートリアルでは、Google AdSense と Web Starter Kit を使用して、レスポンシブ広告を組み込んだサンプルページを作成します。

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="デスクトップと携帯端末での広告付きウェブサイトのサンプル">

ウェブ スターター キットに詳しくない場合、[Web Starter Kit をセットアップする]({{site.fundamentals}}/tools/setup/setup_kit.html)をご覧ください。

広告をサイトに組み込んで支払いを受け取るには、次のシンプルな手順に沿う必要があります。

1. AdSense アカウントを作成します。
2. 広告ユニットを作成します。
3. 広告ユニットをページに配置します。
4. 支払い設定を指定します。

## AdSense アカウントを作成する
サイトで広告を配信するには、有効な AdSense アカウントが必要です。まだ所有していない場合、[アカウントを作成](https://www.google.com/adsense/)し、AdSense 利用規約に同意する必要があります。アカウントを作成する際は、次の点を確認する必要があります。

* 自分の年齢が 18 歳以上で、検証済みの Google アカウントを持っていること。
* 配信状態のウェブサイトやオンライン コンテンツを所有しており、
それが [Google AdSense プログラム ポリシー](https://support.google.com/adsense/answer/48182)に準拠していること。広告はこのサイトにホストされます。
* 住所が定まっており、支払いを受け取る銀行口座に関連付けられていること。

## 広告ユニットを作成する

広告ユニットは、ページに表示される広告のセットで、JavaScript をページに追加することで表示されるようになります。広告ユニットのサイズ設定には、3 つの方法があります。

* **[レスポンシブ（推奨）](https://support.google.com/adsense/answer/3213689)**
* [事前定義](https://support.google.com/adsense/answer/6002621)
* [カスタムサイズ](https://support.google.com/adsense/answer/3289364)

レスポンシブ サイトを作成している場合、レスポンシブ広告ユニットを使用します。
レスポンシブ広告は、デバイスのサイズや親コンテナの幅に応じて自動的にサイズが調整されます。
レスポンシブ広告は、レスポンシブ レイアウトと連動し、どのデバイスでもサイトが適切に表示されるようにします。

レスポンシブ広告ユニットを利用しない場合、ユーザーのデバイスに応じて広告がどのように表示されるか調整するために、コードを大量に記述する必要が生じます。広告ユニットの正確なサイズを指定する必要がある場合でも、[詳細モード]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough)のレスポンシブ広告ユニットを使用します。

コードをシンプルにし、時間と労力を節約できるよう、レスポンシブ広告コードは、ページ レイアウトに応じて広告ユニットのサイズを自動的に調整します。
コードは、広告ユニットの親コンテナの幅に応じて必要なサイズを動的に計算し、コンテナに適合する最適な広告サイズを選び出します。
たとえば、モバイル向けに最適化されたサイトで幅が 360 ピクセルの場合、320x50 の広告ユニットが表示されます。

現在の[最適な広告サイズ](https://support.google.com/adsense/answer/6002621#top)については、Google AdSense の[広告サイズ ガイド](https://support.google.com/adsense/answer/6002621#top)をご覧ください。

### レスポンシブ広告ユニットを作成するには

1. [[広告の設定] タブ](https://www.google.com/adsense/app#myads-springboard)に移動します。
2. [<strong>+新しい広告ユニット</strong>] をクリックします。
3. 広告ユニットに固有の名前をつけます。この名前は、サイトに貼り付ける広告コードに表示されます。わかりやすい名前にしてください。
4. [広告サイズ] プルダウンから [<strong>レスポンシブ</strong>] を選択します。
5. [広告タイプ] プルダウンから [<strong>テキスト広告とディスプレイ広告</strong>] を選択します。
6. [<strong>保存してコードを取得</strong>] をクリックします。
7. 表示される [<strong>広告コード</strong>] ボックスで、[モード] プルダウンから [<strong>スマートサイズ（推奨）</strong>] を選択します。
このモードであれば広告コードに変更を加える必要がないため、このモードをおすすめします。

広告ユニットを作成すると、サイトに組み込むためのコードが AdSense によって生成されます。次のようなコードになります。

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## 広告ユニットをサイトに組み込む

広告をページに組み込むには、生成された AdSense コードをマークアップ内に貼り付ける必要があります。複数の広告を組み込む場合、同一の広告ユニットを再利用することも、複数の広告ユニットを作成することもできます。

1. app フォルダの index.html を開きます。
2. 生成されたコードを main タグに貼り付けます。
3. ファイルを保存し、ブラウザで表示して確認します。携帯端末や Chrome エミュレーターでも開いてみてください。

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="デスクトップと携帯端末での広告付きウェブサイトのサンプル">
    <br>
試す
          </a>
</div>

## 支払い設定を指定する

AdSense の支払いをいつ受け取ることができるのか確認する場合や、今月や来月に支払いを受け取ることができるか知りたい場合、次の手順に沿って設定します。

1. 必要な税務情報を[お支払い受取人情報](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE)に入力しているか確認します。
2. お支払い受取人名と住所が正しいか確認します。
3. [[お支払い設定] ページ](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS)で、支払い方法を選択します。
4. [個人識別番号（PIN）](https://support.google.com/adsense/answer/157667)を入力します。この PIN は、アカウント情報が正しいか確認する際に使用されます。
5. 収益が[お支払い基準額](https://support.google.com/adsense/answer/1709871)に達しているか確認します。

詳細については、[AdSense のお支払いについて](https://support.google.com/adsense/answer/1709858)をご覧ください。


