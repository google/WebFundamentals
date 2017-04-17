project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 通知には適切な使い方があり、効果的に活用する方法があります。適切な通知のポイントについて説明します。ここでは何をすべきかだけではなく、具体的な手順を説明します。

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# 適切に通知する方法 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="タイムリー、的確、有用">
  <figcaption>タイムリー、的確、有用</figcaption>
</figure>

ユーザーへのアクセス手段を確保しておくためにも、わずらわしい通知を表示しないようにしてください。ほかにも付け加えることがあるでしょうか。
あります。口で言うのは簡単ですが、実行するのは難しいものです。 

ネイティブ アプリで最も貴重な機能であるプッシュ通知が、ウェブでも利用できるようになりました。
最大限に活用するには、通知がタイムリー、的確、有用である必要があります。


**タイムリー**: タイムリーな通知とは、ユーザーにとって必要なときや、重要な場面で表示される通知です。


**的確**: 的確な通知とは、すぐに実行できる具体的な情報が含まれている通知です。


**有用**: 有用な通知とは、ユーザーの関心が高い人物やトピックに関する通知です。


<div style="clear:both;"></div>


##  タイムリーな通知 {: #timely }

タイムリーな通知とは、ユーザーにとって必要なとき、重要なときに表示される通知です。
あくまでユーザーにとってタイムリーであり、必ずしもあなたにとってタイムリーということではありません。


###  接続状況に関わらず利用できるようにする {: #make-it-available }

ほとんどの通知はすぐに表示する必要がありますが、通知を保留したほうがよい場合もあります。少なくとも、プッシュ ペイロードはすべてのプラットフォームでサポートされているわけではないため、表示する前に重要な情報を取得する必要がある場合があります。




最近まで、この機能に対応しているのはモバイルアプリだけでした。Service Worker を使用すると、ユーザーが必要とするタイミングまで通知を保存しておくことができます。
ユーザーが通知をクリックしたときのネットワークの状態は影響しません。



    self.addEventListener('push', event => {
      var dataPromise;
      if (data in event) {
        dataPromise = Promise.resolve(event.data.json());
      } else {
        dataPromise = fetch('notification/end/point/data.json')
          .then(response => {
            return response.json();
          });
      }
    
      event.waitUntil(
        dataPromise
        .then(msgData => {
          // Now tell the user.
          return self.registration.showNotification(data.title, {
            // Whether you show data and how much you show depends on
            // content of the data itself.
            body: event.data.body,
            icon: 'images/icon.png'
          });
        })
      );
    }); 
    

###  振動は慎重に使用する {: #vibrate-judiciously }

タイムリーな通知の説明で、振動の話が出てくるのは意外かもしれませんが、実際のところ、振動は通知と密接に関わっており、注意すべき点もいくつかあります。


まず、振動は新しい通知を知らせる方法として理想的だと思うかもしれませんが、
すべてのユーザーが振動を有効にしているとは限らず、また振動に対応していない端末もあります。
そのため、振動で知らせたい緊急性の高い情報が見過ごされるおそれがあります。


また、すべての通知で振動を使うと緊急性が伝わらなくなります。重要ではない通知がわずらわしくなって、ユーザーが通知を完全にオフにする可能性があります。



したがって、振動を使うかどうかの判断はユーザーに委ねるようにしてください。振動を使う通知を選べるようにするか、振動自体を使うかどうかを選択できるようにします。
通知のカテゴリが複数存在する場合、異なる振動パターンを選択できるようにするのもよいでしょう。



最後に、モバイル端末を振動させるとモーターが駆動するため、画面に通知を表示するよりも電池を消耗する点に注意してください。


##  的確な通知 {: #precise }

的確な通知とは、すぐに実行できる具体的な情報が含まれている通知です。
通知の仕組みの説明で紹介した以下の画像について、もう一度考えてみましょう。

![的確な通知には具体的な情報が含まれている](images/flight-delayed-good.png){:width="316px"}

この画像を一目見れば、以下の必要な情報がすべて伝わります。

* メッセージの送信元 - 航空会社。
* 内容 - 次のフライトが遅延している。
* その他 - 新しい出発時刻。


###  サイトにアクセスしなくてもよいように十分な情報を提供する {: #offer-enough }

すべてのケースに当てはまるとは限りませんが、情報がシンプルで、小さなスペースでも十分に内容が伝われば、ユーザーはウェブサイトを開いて通知内容を確認する必要がありません。たとえば、あるユーザーに別のユーザーからの応答内容を通知したい場合、「新しい通知」などのメッセージを表示することは望ましくありません。
代わりに「Pete さんより "いいえ" の返信がありました。」などのメッセージを表示します。


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>推奨: </b> ユーザーがサイトにアクセスしなくてもいいように十分な情報を提供する。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>非推奨:</b> 曖昧でわかりにくいメッセージは避ける。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

ユーザーに重要な情報を伝えるときには、これは特に重要です。

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>推奨: </b> ユーザーがサイトにアクセスしなくてもいいように十分な情報を提供する。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>非推奨:</b> 曖昧でわかりにくいメッセージは避ける。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

###  通知からすぐに操作できるようにする {: #offer-actions }

この例は既に何度かご覧になったと思います。通知の仕組みの説明で、通知にアクションを追加する方法もご紹介しました。
Service Worker はこれらの操作を処理する必要があります。その際は `notificationclick` イベントで処理します。



    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

###  タイトルと内容は具体的にする {: #specific-title }

メッセージのコンテキストに関連したタイトルを付けて、メッセージの具体的な内容を含めます。
受信者が既に知っていること、たとえばアプリ名などは役に立ちません。
また、メッセージの送信に使用されているテクノロジーなど、受信者が知らない情報も有用ではありません。


<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>推奨: </b> メッセージの具体的な内容を含むタイトルを付ける。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>非推奨:</b> ユーザーが既に知っていることや理解できない情報は含めない。</figcaption>

  </figure>
</div>
<div style="clear:both;"></div>

###  重要な情報を前面に出す

これはつまり、ユーザーにとって重要な情報を、通知の中で最も注意を引く場所に配置するということです。
たとえば、西洋言語のテキストは左から右、上から下に読まれるため、メッセージング アプリでは送信者の名前は左上に表示されます。



<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>推奨: </b> 送信者名が左上に配置されている。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>非推奨:</b> 左上に表示された情報が冗長。</figcaption>

  </figure>
</div>
<div style="clear:both;"></div>

###  メッセージは短くする {: #keep-it-short }

通知はメールではありません。通知の目的は、ユーザーにアプリを開くように促すことです。
`PushMessageData` オブジェクトを使用すると、すぐにデータをユーザーに送信できます。ただし、そのデータをすべてユーザーに見せる必要がない場合もあります。特に、通知の送信後、サーバーに追加のデータが蓄積されている場合などが該当します。




##  有用な通知 {: #relevant }

有用な通知とは、ユーザーの関心が高い人物やトピックに関する通知です。

###  ログイン済みのユーザーを対象にする {: #prefer-logged }

ログイン済みのユーザーにのみ通知の許可を求めます。ユーザーが不明な場合、有用な通知を送信するのは困難です。ユーザーは有用ではない通知をスパムと見なすおそれがあります。


###  同じ情報を繰り返さない {: #dont-repeat }

情報を伝えることのできるスペースは限られています。通知の複数の箇所に重複した情報を表示してスペースを浪費するのは避けてください。重複した情報が有用であっても、その重複を避ければその他の情報を伝える余地が生まれます。たとえば、タイトルに曜日が含まれている場合は本文に曜日を記載する必要はありません。


<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>推奨: </b> タイトルにある情報が繰り返されていない。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>非推奨:</b> メッセージ内でタイトルと同じ情報が繰り返されている。</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

また、アプリが起動している場合、新しい情報が既に画面上に表示されている可能性があります。
その場合は通知ではなく、アプリの UI を使用して通知してください。

###  ネイティブ アプリの宣伝はしない {: #dont-advertise-native }

プッシュ通知を支えるテクノロジーである Service Worker のポイントは、ウェブサイトとは別にアプリケーションを記述する時間とコストを節約できることです。Service Worker とネイティブ アプリの両方を使用しているユーザーには、通知が重複して表示される可能性があります。これを避けるには、サーバー側で重複を防止するためのコードを記述します。この問題を完全に避けるには、ユーザーに、この両方を実行することを推奨しないようにします。


###  宣伝しない {: #dont-advertise }

ユーザーがアプリを使い始めれば、ユーザー エクスペリエンスを提供することで収益を得るチャンスがあります。
ユーザーがアプリを使用していないときに大量の通知を送信して、そのチャンスを逃さないようにしてください。大量の通知を送信するとユーザーを失うおそれがあります。


###  ウエブサイト名やドメイン名を含めない {: #no-website }

通知には既にドメイン名が含まれており、スペースは非常に限られています。

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Chrome 通知内のドメイン名">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Firefox 通知内のドメイン名">
  </figure>
</div>
<div style="clear:both;"></div>

###  場面に合ったアイコンを使う {: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>非推奨:</b> 一般的なアイコンを使用する。
  </figcaption>
</figure>

アイコンでメッセージについて何らかの情報を伝える必要があります。以下の例で考えてみましょう。


この通知ではメッセージの送信者は正確に伝わります。しかし多くの通知では、サイトやアプリのロゴをアイコンとして使っているため、何も伝わりません。


<div style="clear:both;"></div>

代わりに、送信者のプロフィールの画像を使用しましょう。

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>推奨: </b> メッセージの内容を伝えるアイコンが使用されている。</figcaption>

</figure>




ただし、アイコンはシンプルなものに留めてください。複雑すぎるニュアンスはユーザーには伝わらない場合があります。


{# wf_devsite_translation #}
