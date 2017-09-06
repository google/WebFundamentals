project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アプリのインストール バナーには、ウェブアプリのインストール バナーとネイティブ アプリのインストール バナーの 2 種類があります。バナーを使えば、ブラウザから離れることなく、素早くシームレスにウェブアプリやネイティブアプリをホーム画面に追加することができます。

{# wf_updated_on:2016-02-11 #}
{# wf_published_on:2014-12-16 #}

# ウェブアプリのインストール バナー {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="ウェブアプリのインストール バナー">
  </figure>
</div>

アプリのインストール バナーには、**ウェブ**アプリのインストール バナーと[**ネイティブ**](native-app-install) アプリのインストール バナーの 2 種類があります。
バナーを使えば、ブラウザから離れることなく、素早くシームレスにウェブアプリやネイティブアプリをホーム画面に追加できます。

アプリのインストール バナーの追加は簡単で、煩雑な作業はほとんど Chrome が処理してくれます。
アプリの詳細を記述したウェブアプリのマニフェスト ファイルをサイトに追加するだけです。


そうすれば Chrome が一連の条件とアクセス頻度のヒューリスティックに基づいて、バナー表示のタイミングを自動的に判定します。
以降のトピックで、さらに詳しく説明します。

注: ホーム画面への追加（Add to Homescreen、A2HS）は、ウェブアプリのインストール バナーの別名です。この 2 つの用語は同じです。

###  条件について

Chrome は、アプリが次の条件を満たすと、自動的にバナーを表示します。


* 次の情報が記述された[ウェブアプリ マニフェスト](../web-app-manifest/) ファイルが存在する。
    - `short_name`（ホーム画面で使用）
    - `name`（バナーで使用）
    - 144x144 の png アイコン（アイコンの宣言には MIME タイプ `image/png` の指定が必要）
    - 読み込み先の `start_url`
* サイトに [Service Worker](/web/fundamentals/getting-started/primers/service-workers) が登録されている。
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https) 経由で配信されている（Service Worker を使用するための要件）。
* 2 回以上のアクセスがあり、そのアクセスに 5 分以上の間隔がある。

注: ウェブアプリのインストール バナーは、最先端のテクノロジーなので、アプリのインストール バナーを表示するための条件は、今後変更される可能性があります。ウェブアプリ インストール バナーの最新の条件については、[What, Exactly, Makes Something a Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/) をご覧ください。

###  アプリのインストール バナーのテスト{: #test }

ウェブアプリ マニフェストをセットアップしたら、正しく定義されているかを検証してください。
必要に応じて 2 つの方法から選択できます。1 つは手動、もう 1 つは自動です。


手動でアプリのインストール バナーをトリガーする方法は次のとおりです。

1. Chrome DevTools を開きます。
2. [**Application**] パネルに移動します。
3. [**Manifest**] タブに移動します。
4. 以下のスクリーンショットで赤色にハイライト表示された [**Add to homescreen**] をクリックします。

![DevTools の Add to homescreen ボタン](images/devtools-a2hs.png)

詳細については、[ホーム画面への追加イベントのシミュレート](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)をご覧ください。



アプリのインストール バナーの自動テストでは、Lighthouse を使用します。Lighthouse はウェブアプリの監査ツールで、
Chrome 拡張機能または NPM モジュールとして実行できます。
アプリをテストするには、監査する特定のページを Lighthouse に指定します。
Lighthouse はそのページに対して一連の監査を実行し、ページの結果についてレポートを作成します。


以下のスクリーンショットに示す 2 組の Lighthouse 監査では、アプリのインストール バナーを表示するためにページが合格しなければならないすべてのテストを表しています。


![Lighthouse によるアプリのインストールの監査](images/lighthouse-a2hs.png)

Lighthouse の使用を開始するには、[Lighthouse によるウェブアプリの監査](/web/tools/lighthouse/)をご覧ください。


##  アプリのインストール バナー イベント

Chrome はユーザーがアプリのインストール バナーにどう反応したのか、キャンセルまたは都合のいいタイミングまで先送りしたかまで特定できる、簡単な仕組みを提供しています。


###  ユーザーがアプリをインストールしたのかを確認する

`beforeinstallprompt` イベントは、ユーザーがプロンプトに応答したときに解決する `userChoice` という Promise を返します。
この Promise は、`outcome` 属性に値 `dismissed` を設定したオブジェクトか、またはウェブページがホーム画面に追加された場合は `accepted` を設定したオブジェクトを返します。



    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

この方法は、ユーザーがアプリのインストールを促すプロンプトにどう対応したのかを把握するのに便利です。



###  プロンプトの先送りまたはキャンセル

Chrome はプロンプトをトリガーするタイミングを管理しますが、一部のサイトではこのタイミングが最適ではない場合があります。
このプロンプトを後でアプリを使用するときまで先送りするか、キャンセルすることができます。
 

Chrome がユーザーにアプリのインストールを促したときに、デフォルトの操作を阻止して、後でイベントを実行するように保存しておくことができます。
その後、ユーザーがサイトを好意的に操作しているタイミングで、保存したイベントの `prompt()` をもう一度トリガーすることができます。

 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.
    
    var deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
    
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
      
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }
          
          // We no longer need the prompt.Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

または、デフォルトの操作を阻止して、プロンプトをキャンセルすることもできます。

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Native app install banners

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="ネイティブ アプリのインストール バナー" style="max-height: 500px">
  </figure>
</div>

ネイティブ アプリのインストール バナーは、[ウェブアプリのインストール バナー](.)と同様ですが、ホーム画面に追加するのではなく、サイトから移動せずにネイティブ アプリをインストールできます。



###  バナーの表示条件

表示条件はウェブアプリのインストール バナーと同様です。ただし、Service Worker が必要になる点が異なります。
サイトの条件:

* 次の情報が記述された[ウェブアプリ マニフェスト](../web-app-manifest/) ファイルが存在する。
  - `short_name`
  - `name`（バナーのプロンプトで使用）
  - 144x144 png アイコン。アイコンの宣言に MIME タイプ `image/png` を含める必要があります。
  - アプリの情報を設定した `related_applications` オブジェクト
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 経由で配信されている。
* 2 週間のうち異なる 2 日間で、ユーザーが 2 回アクセスしている。


###  マニフェストの要件

任意のマニフェストに統合するには、`play`（Google Play 用） のプラットフォームと App ID を指定した `related_applications` 配列を追加します。



    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

Android アプリのインストール機能のみをユーザーに提供し、ウェブアプリのインストール バナーを表示する必要がない場合は、`"prefer_related_applications": true` を追加します。

次に例を示します。


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
