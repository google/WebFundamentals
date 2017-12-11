project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 最新のブラウザでは、アイコン、アドレスバーの色、さらにカスタムタイルの追加など、特定のコンポーネントを容易にカスタマイズできます。このようなシンプルな調整によって、サイトの使用頻度やリピート率が高まります。


{# wf_updated_on: 2015-09-21 #}
{# wf_published_on: 2015-09-21 #}

#  アイコンとブラウザの色 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

最新のブラウザでは、アイコン、アドレスバーの色、さらにカスタムタイルの追加など、特定のコンポーネントを容易にカスタマイズできます。このようなシンプルな調整によって、サイトの使用頻度やリピート率が高まります。


##  美しいアイコンとタイルを表示する 

ユーザーがウェブページにアクセスすると、ブラウザは HTML からアイコンを取得しようとします。ブラウザのタブ、最近使ったアプリの切り替え機能、新しい（または最近アクセスした）タブページなど、アイコンは多くの場所に表示されます。

高品質の画像を提供するとサイトを認識しやすくなるため、ユーザーが容易にサイトを見つけることができます。
 

すべてのブラウザに完全に対応するには、いくつかのタグを各ページの `<head>` 要素に追加する必要があります。



    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

###  Chrome と Opera

Chrome と Opera では `icon.png` を使用しており、端末ごとに必要なサイズに変更されます。
`sizes` 属性を指定して追加のサイズを設定すると、サイズが自動的に変更されることはありません。



注: アイコンのサイズは 48px が基準になります（48px、96px、144px、192px など）。

###  Safari

Safari でも `rel` 属性 `apple-touch-icon` を持つ `<link>` タグを使用します。

個々のアイコンの個別のリンクタグを提供することによって、[明確なサイズ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)を指定することができ、OS によってアイコンのサイズが変更されることを防止します。




    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

###  Internet Explorer と Windows Phone

Windows 8 の新しいホームスクリーンでは、固定サイトの 4 種類のレイアウトをサポートするために、4 つのアイコンが必要です。
特定のサイズをサポートしない場合は、関連するメタタグを省くことができます。



    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

###  Internet Explorer のタイル

Microsoft の「固定サイト」および回転する「ライブタイル」は、他の実装よりもはるかに高度であり、このガイドの範囲を超えています。
詳細については、MSDN の[ライブタイルの作成方法](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx) をご覧ください。




##  ブラウザ要素の色

さまざまな `meta` 要素を使用して、ブラウザだけでなくプラットフォームの要素もカスタマイズできます。
一部のカスタマイズは特定のプラットフォームまたはブラウザにしか反映されませんが、それでもエクスペリエンスを大幅に向上させることができます。
 

Chrome、Firefox OS、Safari、Internet Explorer、Opera Coast では、メタタグを使用して、ブラウザに加えてプラットフォームのエレメントの色を設定できます。


###  Chrome と Opera 用の meta タグによるテーマ カラー

Android 版の Chrome にテーマ カラーを指定するには、meta タグを使用します。

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Chrome のアドレスバーのスタイルを設定するテーマ カラー">

###  Safari 固有のスタイル設定

Safari ではステータスバーのスタイルを指定し、起動画像を設定することができます。

####  起動画像を設定

デフォルトでは、Safari は読み込み中に空白の画面を表示し、複数の読み込み後に、アプリの前の状態のスクリーンショットを表示します。
これを防ぐには、Safari が明示された起動画像を表示するように、`rel=apple-touch-startup-image` でリンクタグを追加します。

次に例を示します。


    <link rel="apple-touch-startup-image" href="icon.png">
    

画像は、対象端末画面に固有のサイズにするか、そうでなければ使用しないでください。
[Safari Web Content Guidelines](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) で詳細をご確認ください。



Apple のドキュメントではこのトピックはほとんど取り上げられませんが、開発者コミュニティでは、高度なメディア クエリを使用して、すべての端末を対象にする方法を考案しました。これによって適切なデバイスを選択し、正しいイメージを指定することができます。

[tfausak's gist](//gist.github.com/tfausak/2222823) の厚意により、ここに具体的な解決策を示します。


####  ステータスバーの外観を変更する

`black` または `black-translucent` で、デフォルトのステータスバーの外観を変更することができます。
`black-translucent` では、ステータスバーは全画面コンテンツの上にフローティング表示され、下に移動することはありません。
その結果、レイアウトの縦幅は長くなりますが、上部が詰まって見えます。
必要なコードは以下のとおりです。


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption> <code>black-translucent</code> を使用したスクリーンショット</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption> <code>black</code> を使用したスクリーンショット</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
