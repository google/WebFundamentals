project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 接続状態が悪く不安定なときのアプリまたはサイトの操作性を把握して、それに応じてアプリやサイトを構築することが重要です。これに役立つさまざまなツールがあります。

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2016-05-09 #}

# 低帯域幅と高レイテンシの理解 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

接続状態が悪く不安定なときのアプリまたはサイトの操作性を把握して、それに応じてアプリやサイトを構築することが重要です。これに役立つさまざまなツールがあります。

## 低帯域幅と高レイテンシでのテスト {: #testing }

モバイル端末でウェブを利用する人の割合は<a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">ますます増えています</a>。自宅でも、<a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">多くの人が固定ブロードバンドからモバイルに移行しています</a>。

これに関連して、接続が不安定な場合のアプリまたはサイトの操作性を理解しておくことが重要です。低帯域幅と高[レイテンシ](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)を[エミュレートおよびシミュレート](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference)するためのさまざまなソフトウェア ツールが用意されています。

### ネットワーク スロットリングのエミュレート

サイトを構築またはアップデートするときには、さまざまな接続条件で十分なパフォーマンスが得られることを確認する必要があります。これに役立つツールがいくつかあります。

#### ブラウザツール

[Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions) では、Chrome DevTools の [Network] パネルのプリセットまたはカスタム設定を使用して、さまざまなアップロード/ダウンロード速度と[ラウンドトリップ時間](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)でサイトをテストできます。

![Chrome DevTools スロットリング](images/chrome-devtools-throttling.png)

#### システムツール

Network Link Conditioner は、Xcode 用の [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) をインストールしている場合に、Mac で利用できるプリファレンス パネルです。

![Mac の [Network Link Conditioner] コントロール パネル](images/network-link-conditioner-control-panel.png)

![Mac の [Network Link Conditioner] 設定](images/network-link-conditioner-settings.png)

![Mac の [Network Link Conditioner] カスタム設定](images/network-link-conditioner-custom.png)

#### 端末のエミュレーション

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) を使用すると、Android でアプリ（ウェブブラウザとハイブリッド ウェブアプリを含む）を実行中に、さまざまなネットワーク条件をシミュレートできます。

![Android Emulator](images/android-emulator.png)

![Android Emulator の設定](images/android-emulator-settings.png)

iPhone の場合は、Network Link Conditioner を使用して問題のあるネットワーク条件をシミュレートできます（上記を参照）。

### さまざまな場所とネットワークからのテスト

接続パフォーマンスは、サーバーの場所とネットワークのタイプによって異なります。

[WebPagetest](https://webpagetest.org) は、さまざまなネットワークとホストの場所を使用して、サイトのパフォーマンス テストを実行することができるオンライン サービスです。たとえば、インドにあるサーバーから 2G ネットワークでサイトを実行してみたり、米国内の都市からケーブル経由で実行してみたりすることができます。

![WebPagetest の設定](images/webpagetest.png)

場所を選択し、拡張設定から接続タイプを選択します。[スクリプト](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)（たとえば、サイトへのログイン用の）を使用したり、[RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) を使用したりして、テストを自動化することもできます。これにより、ビルドプロセスやパフォーマンスのログ記録に接続テストを組み込むことができます。

[Fiddler](http://www.telerik.com/fiddler) は、[GeoEdge](http://www.geoedge.com/faq) を介したグローバル プロキシをサポートしており、そのカスタムルールを使用してモデム速度をシミュレートできます。

![Fiddler プロキシ](images/fiddler.png)

### 問題のあるネットワークでのテスト

ソフトウェアおよびハードウェア プロキシを使用すると、帯域幅スロットル、パケット遅延、ランダム パケットロスといった、問題のあるモバイル ネットワークの状態をエミュレートできます。共有プロキシまたは問題のあるネットワークにより、デベロッパー チームは、ワークフローに現実のネットワーク状態のテストを組み込むことができます。

Facebook の [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) （ATC）は、トラフィックを形成し、問題のあるネットワークの状態をエミュレートするために使用できる、BSD ライセンスが付与された一連のアプリケーションです。

![Facebook の Augmented Traffic Control](images/augmented-traffic-control.png)

> Facebook は [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) を設けて、2G を利用するユーザーが自社製品を使用する方法を理解できるようにもしています。毎週火曜日に、従業員にポップアップが表示され、2G 接続をシミュレートするためのオプションが示されます。

[Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS プロキシを使用すると、[帯域幅とレイテンシを調整](http://www.charlesproxy.com/documentation/proxying/throttling/)できます。Charles は商用ソフトウェアですが、無料トライアルを利用できます。

![Charles プロキシの帯域幅とレイテンシの設定](images/charles.png)

Charles の詳細については、[codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/) を参照してください。

## 不安定な接続や "lie-fi" への対応 {: #lie-fi }

### lie-fi とは

<a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> という用語は、少なくとも 2008 年（電話が<a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">このような</a>形だった頃です）から使用されており、見た目の振る舞いと実状が異なる接続を指します。ブラウザは、なんらかの理由で実際には接続されていないのに、接続されているかのように振る舞います。

接続されていると間違って解釈すると、ブラウザ（または JavaScript）はリソースを取得しようとし続け、諦めて現実的な代替手段を選ぶことがないため、エクスペリエンスが低下します。実際、lie-fi はオフラインより問題である場合があります。少なくとも端末が完全にオフラインであれば、JavaScript は適切な回避策をとることができます。

モバイルに移行し、固定ブロードバンドから離れる人が増えるのに伴い、lie-fi はより大きな問題となる可能性があります。最近の[米国での調査データ](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use)は、[固定ブロードバンドからの移行](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/)を示しています。次のグラフは、2015 年と 2013 年における自宅でのモバイル インターネットの使用を示しています。

<img src="images/home-broadband.png" class="center" alt="固定ブロードバンドからモバイルへの移行（特に低所得層で顕著）を示す米国での調査データのグラフ">

### タイムアウトを使用した断続的な接続の処理

過去には、断続的な接続のテストに [XHR を使用したお粗末な方法](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline) が使用されていましたが、Service Worker を使用すれば、より信頼性の高い方法でネットワーク タイムアウトを設定できます。Jeff Posnick が、[sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) のタイムアウトを使用してこれを実現する方法について、プレゼンテーション [Instant Loading with Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s) で説明しています。

```
toolbox.router.get(
  '/path/to/image',
  toolbox.networkFirst,
  {networkTimeoutSeconds: 3}
);
```

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) でも、[タイムアウト オプション](https://github.com/whatwg/fetch/issues/20) が計画されています。また、[Streams API](https://www.w3.org/TR/streams-api/) は、コンテンツ配信を最適化して、モノリシック リクエストを回避するのに役立ちます。[Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s) で、Jake Archibald が lie-fi の追跡方法について詳しく説明しています。
