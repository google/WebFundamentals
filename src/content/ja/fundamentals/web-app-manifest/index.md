project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ウェブアプリ マニフェストは、ユーザーが想定するネイティブ アプリの場所（端末のホーム画面など）にウェブアプリやサイトを表示する方法を制御したり、ユーザーが起動できる対象や起動時の外観を指定したりするための JSON ファイルです。

{# wf_updated_on:2016-08-19 #}
{# wf_published_on:2016-02-11 #}

#  ウェブアプリ マニフェスト {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

[ウェブアプリ マニフェスト](https://developer.mozilla.org/en-US/docs/Web/Manifest)はシンプルな JSON 形式のファイルです。デベロッパーはこのファイルを使用することで、ユーザーが想定するネイティブ アプリの場所（モバイル端末のホーム画面など）にウェブアプリやサイトを表示する方法を制御し、ユーザーが起動できる対象や起動時の外観を指定することができます。

ウェブアプリ マニフェストによって、サイトのブックマークを端末のホーム画面に保存することができます。この操作は、サイトが次のように起動された場合に可能です。 

* 固有のアイコンと名前があり、その他のサイトと区別できる。
* リソースのダウンロード中、またはキャッシュからの復元中に、ユーザーに表示するコンテンツがある。
* サイトのリソースが利用可能になったときに唐突に画面遷移することのないように、ブラウザに既定の表示特性を指定している。 

このすべてを、テキスト ファイルのメタデータによるシンプルな仕組みによって実現するのが、ウェブアプリ マニフェストです。

注: どのサイトでもウェブアプリ マニフェストを使用できますが、[Progressive Web App](/web/progressive-web-apps/) には必須です。

### TL;DR {: .hide-from-toc }
- マニフェストを作成し、ページをマニフェストにリンクさせるのは簡単なプロセスです。
- ホーム画面から起動したとき、ユーザーに表示する内容を制御します。
- これには、スプラッシュ画面、テーマ色、開くURL などが含まれます。 

##  マニフェストを作成する

ウェブアプリ マニフェストについて詳しく説明する前に、基本的なマニフェストを作成し、ウェブページをそのマニフェストにリンクしてみましょう。


マニフェストには任意の名前を付けることができます。一般には `manifest.json` という名前が使用されます。次に例を示します。


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

必ず次の要素を含める必要があります。 

* `short_name`: ユーザーのホーム画面でテキストとして使用します。  
* `name`: ウェブアプリのインストール バナーに使用します。  
  

##  マニフェストについてブラウザに伝える

マニフェストを作成してサイトに配置したら、ウェブアプリを含むすべてのページに、次のような `link` タグを追加します。



    <link rel="manifest" href="/manifest.json">
  
##  起動時の URL を設定する

`start_url` を指定しないと現在のページが使用されますが、これはおそらくユーザーが望んでいることではありません。
また、URL を設定する理由は他にもあります。
現在は、アプリの起動方法を定義して、起動方法を示すクエリ文字列パラメータを `start_url` に追加できるようになっています。
 

    "start_url": "/?utm_source=homescreen"

この機能が必要になることもあるでしょう。ここで使用している値は、Google Analytics において意味があるというメリットがあります。
 

##  アイコンをカスタマイズする

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="ホーム画面のアイコンに追加する">
  <figcaption>ホーム画面のアイコンに追加する</figcaption>
</figure>

 ホーム画面にサイトを追加する際にブラウザが使用するアイコンのセットを定義することができます。次のように、タイプとサイズを定義できます。

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

注: アイコンをホーム画面に保存するとき、Chrome は最初にディスプレイの密度と一致するアイコンを探し、48dp 画面密度にサイズを変更します。目的のアイコンが見つからなかった場合は、端末特性に最も近いアイコンを探します。理由によらず、特定のピクセル密度のアイコンを対象とするように具体的に指定したい場合は、引数として数値を取るオプションの  <code>density</code> メンバーを使用できます。密度を宣言しない場合は、既定値の 1.0 が使用されます。この場合、「このアイコンは画面密度 1.0 以上で使用する」という意味になり、一般的に期待動作になります。

##  スプラッシュ画面を追加する

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="背景の色">
  <figcaption>起動画面の背景の色</figcaption>
</figure>

ホーム画面からウェブアプリを起動すると、その裏側で多数の処理が実行されます。


1. Chrome が起動します。
2. ページを表示するレンダラが起動されます。
3. サイトがネットワークから（Service Worker がある場合はキャッシュから）読み込まれます。

この間、画面が白く表示されて処理が滞っているように見えます。この現象は、ホームページのコンテンツをページ上に表示するまでに 1～2 秒かかる状況で、ネットワークからウェブページを読み込んでいる場合に特に目立ちます。



ユーザー エクスペリエンスを向上するために、白い画面の代わりに、タイトルや色、画像のある画面を使用することができます。 

###  画像とタイトルを設定する

最初のセクションから順に学習している場合は、すでに画像とタイトルを設定しているはずです。Chrome は、マニフェストの特定のメンバーから画像とタイトルを推測します。ここで重要なことは、詳細を把握しておくことです。 

スプラッシュ画面の画像は、`icons` 配列から描画されます。Chrome は、端末の 128dp に最も近い画像を選択します。タイトルは単に `name` メンバーから取得されます。

###  背景の色を設定する 

わかりやすい名前の `background_color` プロパティを使用して、背景の色を指定します。
Chrome では、ウェブアプリを起動した瞬間にこの色が使用され、ウェブアプリの初回レンダリングまで画面上に表示されたままになります。


背景色を設定するには、マニフェストで次のように設定します。


    "background_color": "#2196F3",
    

これで、ホーム画面からサイトを開いたときに白い画面は表示されなくなります。

このプロパティの推奨値は、読み込むページの背景色です。読み込むページと同じ色を使用することで、スプラッシュ画面からホームページにスムーズに遷移しているように見えます。


###  テーマカラーを設定する

`theme_color` プロパティを使用して、テーマカラーを指定します。このプロパティは、ツールバーの色を設定します。
ここでも既存の色を複製することをおすすめします。厳密には `theme-color` `<meta>` を設定します。



##  起動時のスタイルを設定する

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="ウェブアプリ対応">
  <figcaption>マニフェストの表示オプション</figcaption>
</figure>

ウェブアプリ マニフェストを使用して、表示タイプとページの向きを制御します。

###  表示タイプをカスタマイズする

`display` タイプを `standalone` に設定すると、ウェブアプリでブラウザの UI を非表示にすることができます。


    "display": "standalone"
    

ブラウザで通常のサイトのようにページを表示したい場合も、問題ありません。`display` タイプを `browser` に設定できます。


    "display": "browser"
    
<div style="clear:both;"></div>

###  ページの最初の向きを指定する

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="ウェブアプリ マニフェストの画面の向きのオプション">
  <figcaption>ウェブアプリ マニフェストの画面の向きのオプション</figcaption>
</figure>

画面の向きを特定の方向に強制することができます。これは横表示のみで使用するゲームのようなアプリでは非常に便利です。
必要に応じて使用してください。
向きを選択できるほうがユーザーには好まれます。


    "orientation": "landscape"

<div style="clear:both;"></div>
    

##  サイト全体のテーマカラーを指定する

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="背景の色">
  <figcaption>テーマカラー</figcaption>
</figure>

Chrome は、サイトのテーマカラーのコンセプトを 2014 年に導入しました。"テーマカラーは、ウェブページがブラウザに、[アドレスバーなどの UI 要素](/web/fundamentals/design-and-ux/browser-customization/)をどの色にするかを指定するためのヒントになります。"

  

マニフェストがないと、各ページのテーマカラーを指定しなければなりません。大規模なサイトや旧式のサイトでは、サイト全体にわたって多くの変更を加えるのは不可能です。


<div style="clear:both;"></div>

マニフェストに `theme_color` 属性を追加すれば、サイトがホーム画面から起動されたときに、ドメイン内のすべてのページに自動的にテーマカラーが設定されます。




    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="背景の色">
  <figcaption>サイト全体のテーマカラー</figcaption>
</figure>

##  マニフェストをテストする {: #test }

ウェブアプリ マニフェストが正しく設定されていることを手動で確認する場合は、Chrome DevTools の [**Application**] パネルにある [**Manifest**] タブを使用します。


![Chrome DevTools の [Manifest] タブ](images/devtools-manifest.png)

このタブには、人が読み取れるバージョンのマニフェストのプロパティが数多く表示されます。
このタブの詳細については、Chrome DevTools ドキュメントの[ウェブアプリ マニフェスト](/web/tools/chrome-devtools/progressive-web-apps#manifest)をご覧ください。

このタブでは、[Add to Homescreen] イベントのシミュレーションも可能です。
このトピックの詳細については、[アプリのインストール バナーのテスト](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)をご覧ください。



ウェブアプリ マニフェストの検証を自動化したい場合は、[Lighthouse](/web/tools/lighthouse/) のページをご覧ください。
Lighthouse はウェブアプリの監査ツールで、Chrome 拡張機能または NPM モジュールとして動作します。
Lighthouse に URL を指定すると、そのページに対する一連の監査が実行され、レポートに結果が表示されます。

Lighthouse では関連するウェブアプリ マニフェストを監査します。チェック内容は次のとおりです。


* アプリをホーム画面に追加できる。
* 追加すると、アプリはカスタムのスプラッシュ画面を使用して起動する。
* ブラウザのアドレスバーの色が、カスタマイズされている。
* アプリは HTTPS で実行される（ホーム画面への追加の前提条件）。

##  詳細

ここまで、ウェブアプリ マニフェストについて簡単に説明してきましたが、理解すべきことはまだたくさんあります。


* ウェブアプリ マニフェストを使用する場合は、たいてい[アプリのインストール バナー](/web/fundamentals/engage-and-retain/app-install-banners/)のセットアップも必要になります。
 

* ウェブアプリ マニフェストについての[包括的なリファレンス](https://developer.mozilla.org/en-US/docs/Web/Manifest)は、Mozilla Developer Network で利用できます。


* ウェブアプリ マニフェストを作成したエンジニアによる機能説明については、[実際の W3C の仕様](http://www.w3.org/TR/appmanifest/){: .external }をご覧ください。


注: 今後 `manifest.json` ファイルを更新した場合、変更は自動的には反映されません。反映するには、ユーザーがアプリをホーム画面に再度追加する必要があります。







{# wf_devsite_translation #}
