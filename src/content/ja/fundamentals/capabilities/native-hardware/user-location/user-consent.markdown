---
title: "ユーザーから位置情報提供の同意を得る"
description: ""
updated_on: 2014-10-21
key-takeaways:
  geo: 
    -  ユーザーは自分の場所を知らせようとしない、ということを前提にします。
    -  ユーザーの位置情報へのアクセスを必要とする理由を明確にします。
    -  ページが読み込まれた時点で直ちにはプロンプトを表示しないようにします。
comments:
  # 注:セクション タイトルまたは URL を変更した場合、以下のショートリンクを更新する必要があります
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  ウェブ開発者として、ユーザーの位置情報にアクセスすることにより、高度なフィルタリング、地図上のユーザー位置のピンポイントでの特定、ユーザーの現在位置に基づいてユーザーが出来ることをプロアクティブに提案する、といった非常に多くの機会を得ることができます。
</p>

ユーザーとしては、物理的な場所は
秘密情報であり、信用できる人のみにその情報を提供します。  これが、サイトがユーザーの場所を尋ねる場合に、ブラウザでプロンプトを
表示する理由です。

{% include shared/toc.liquid %}

最近のユーザー研究によると、
ユーザーは、ページ読み込み後にユーザーの
場所を単純に尋ねるサイトを信用しないということが<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">示されて</a>います。 では、ベスト プラクティスは何でしょうか?

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## ユーザーは自分の場所を知らせようとしない、ということを前提にします。

これは難しいかも知れませんが、多くのユーザーは自分の
場所を知らせたくないと考えるため、防御的な開発スタイルを変える必要があります。

1.  Geolocation API からのすべてのエラーを処理して、
    サイトをこの条件に適応させるようにします。
2.  位置情報の必要性を明確かつ明示的にします。
3.  必要な場合は、代替ソリューションを使用します。

## Geolocation が必要な場合は、代替ソリューションを使用します。

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

## 常に、ユーザーの操作時に位置情報へのアクセスをリクエストします。

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

## ユーザーのアクションが位置情報を必要とすることを明確に示します。

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

## 位置情報へのアクセス許可が得られるように、丁寧に誘導します。

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

{% highlight javascript %}
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
{% endhighlight %}

