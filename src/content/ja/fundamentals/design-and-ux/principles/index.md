project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google と AnswerLab は、多様なモバイルサイトにおけるユーザーのインタラクションについて、調査を実施しました。この調査の目的は、「優れたモバイルサイトの条件とは何か」という疑問に答えることです。

{# wf_published_on:2014-08-08 #}
{# wf_updated_on:2015-09-17 #}

# 優れたモバイル サイトの条件とは {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google と AnswerLab は、この疑問の答えを出すために[調査](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals)を実施しました。 

> モバイル ユーザーは目的指向が非常に高く、自分独自の条件に合わせて、必要なものをすぐに入手できることを期待しています。
 

この調査は、参加者との対面のユーザビリティ セッションという形で、119 時間にわたって米国で実施されました。参加者は、さまざまなモバイルサイトで主なタスクを実行することを求められました。iOS と Android のユーザーが含まれており、参加者自身のスマートフォンでサイトをテストしました。参加者はサイトごとに購入や予約などコンバージョンに特化したタスクを実行し、そのときの感想を求められました。



この調査では、モバイルサイトのデザインに関する 25 の原則を明らかにして、5 つのカテゴリに分類しました。


##  ホームページとサイトのナビゲーション

ポイント:モバイル版のホームページはユーザーの求めるコンテンツとユーザーをつなぐことに重点を置く必要があります。

###  CTA（コールトゥアクション）を前面および中央に配置する

二次的なタスクは、[メニュー](/web/fundamentals/design-and-ux/responsive/)またはスクロールしなければ見えない位置に配置します。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>推奨</b>:ユーザーが最もよく実行するすべてのタスクをすぐに利用できるようにする。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>:スクロールせずに見える貴重なスペースを、「詳細」などのあいまいな CTA（コールトゥアクション）で浪費している。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

###  メニューは短くわかりやすく

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>推奨</b>:メニューは短くわかりやすくする。
     </figcaption>
  </figure>
</div>

モバイル ユーザーは、目的のものが見つかるまで長いオプション リストをスクロールするほど忍耐強くはありません。
メニューの項目はできるだけ絞り込み、ユーザービリティを損なわないようにしてください。


<div style="clear:both;"></div>

###  ホームページに簡単に戻れるようにする

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>推奨</b>:ホームページに簡単に戻れるようにする。
     </figcaption>
  </figure>
</div>

ユーザーはモバイルページの左上にあるロゴをタップするとホームページに戻ることを期待しており、それが利用できない、または機能しないときはストレスを感じます。


<div style="clear:both;"></div>

###  一番目立つ場所に広告を表示しない

アプリのインストールを促す大きなインタースティシャル（例: コンテンツを覆い隠すようにページの全面に表示される、アプリのインストールを促す広告）はユーザーにとって邪魔になり、タスクの実行を妨げます。アプリのインストールのインタースティシャルを使用しているサイトは、ユーザーに不快感を与えるだけでなく、[Google のモバイル フレンドリー テスト](https://search.google.com/test/mobile-friendly)で不合格になり、検索ランキングが下がる可能性があります。




<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>推奨</b>:広告は簡単に消すことができ、エクスペリエンスを損なわないようにする必要がある。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>:インタースティシャル（別名ドアスラム）は、しばしばユーザーに不快感を与え、サイトが使いづらくなる原因になる。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

##  サイト内検索

ポイント:モバイル ユーザーが探している情報を迅速に見つけられるようサポートする必要があります。

###  サイト内検索ボックスを表示する

通常、情報を求めるユーザーは検索しようとするため、ページ上ですぐに検索フィールドが目に入るようにしておく必要があります。
メニューの中に検索ボックスを隠すことはおすすめしません。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>推奨</b>:検索ボックスが目立つ位置にある。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>非推奨</b>:検索ボックスがオーバーフローメニュー内に隠れている。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

###  サイト内検索で有用な情報を提供する

情報を探しているユーザーは、複数ページにわたる検索結果をすべて調べるようなことはしません。
クエリのオートコンプリート、打ち間違いの修正、クエリに関連する候補の表示によって、ユーザーの負担を軽減してください。
一から自身で開発せずに、[Google カスタム検索](https://cse.google.com/cse/){: .external }などの堅牢なサービスの利用を検討してください。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>推奨</b>:Macy's ではキッズ関連項目のみが表示される。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>:「kid」が含まれる単語をすべて表示している。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


###  結果を絞り込むフィルタを実装する

調査の参加者は、目的の情報を見つける際に[フィルタ](/custom-search/docs/structured_search)に依存しており、効果的なフィルタがないサイトからは離脱してしまいます。検索結果の上にフィルタを用意して、特定のフィルタを適用した場合の結果の件数を表示すると使いやすくなります。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>推奨</b>:フィルタを簡単に適用できるようにする。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>非推奨</b>:フィルタ機能が隠れている。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

###  より適切なサイト内検索の結果を表示する

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="Zappos では目的の商品をたずねてユーザーを誘導しています。">
    <figcaption class="success">
      <b>推奨</b>:ユーザーを適切な方向に導いて目的のものが見つかるようにサポートする。
     </figcaption>
  </figure>
</div>

サイトの顧客セグメントが多岐にわたる場合、検索ボックスを表示する前にユーザーにいくつか質問をして、その回答を検索クエリのフィルタとして活用すると、ユーザーにとって最も有用なセグメントから結果を返すことができます。



<div style="clear:both;"></div>

##  コマースとコンバージョン

ポイント: カスタマー ジャーニーについて理解し、ユーザーの好みに応じたコンバージョンを実現してください。 

###  登録しなくても閲覧できるようにする

調査の参加者は、サイトを利用しようとしたときに事前に登録を求められるとストレスを感じ、特に、あまり知らないブランドでその傾向が見られました。
ビジネスで顧客情報が不要であるにもかかわらず、あまりにも早い段階で登録を要求すると登録してもらえない可能性が高まります。



<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>推奨</b>:ユーザーがサインインしなくてもサイトを閲覧できるようにする。
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>:かなり早い段階でサイトのログインまたは登録を要求する。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


###  ゲストとして購入できるようにする

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>推奨</b>:ゲスト アカウントを使って購入できるようにする。
     </figcaption>
  </figure>
</div>

ある調査では、ゲストとして精算できると「便利」「シンプル」「簡単」「迅速」と評価されました。
ユーザーは、購入にあたってアカウントの登録を強制するサイトに対してストレスに感じており、アカウントのメリットが不明な場合は特にその傾向が見られます。



<div style="clear:both;"></div>

###  既存の情報を使って利便性を最大限に高める

登録ユーザーの情報を呼び出し、[プリファレンスをあらかじめ入力](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)します。新規のユーザーには、使い慣れたサードパーティの購入手続きサービスを提供します。

###  複雑なタスクには Click-to-Call ボタンを使用する

電話機能を搭載した端末では [Click-to-Call リンク](/web/fundamentals/native-hardware/click-to-call/)を使用して、ユーザーがリンクをクリックするだけで電話をかけられるようにすることができます。ほとんどのモバイル端末では、電話番号に発信する前に確認を求められるか、電話番号をどう処理するかをたずねるメニューが表示されます。



###  別の端末でも容易に処理を完了できるようにする

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>推奨</b>:ユーザーが別の端末で簡単に閲覧や購入を継続できる方法を提供する。
     </figcaption>
  </figure>
</div>

別の端末でタスクを完了したいことがよくあります。たとえば、大画面で商品を見たい場合や、
時間がないので後回しにしたい場合があります。
このようなカスタマー ジャーニーに対応するには、[ソーシャル ネットワークでアイテムを共有](/web/fundamentals/discovery-and-monetization/social-discovery/)できるようにしたり、サイト内から直接、自分宛てにメールでリンクを送信できるようにします。



<div style="clear:both;"></div>

##  フォームの入力

ポイント: 使いやすいフォームによってシームレスでスムーズなコンバージョン エクスペリエンスを実現できます。


###  情報の入力を簡素化する

ユーザーが Enter を押すと自動的に次のフィールドに進むようにします。一般的に、必要なタップ数は少ないに越したことはありません。


###  最もシンプルな入力タイプを選ぶ

状況に応じて、[最適な入力タイプ](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)を選びます。
[`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) などの要素を使用して、フィールドの入力候補を表示します。



###  日付を選択するときは視覚的なカレンダーを提供する

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>推奨</b>: できるだけカレンダーのウィジェットを使用する。
     </figcaption>
  </figure>
</div>

開始日と終了日が明確になるようにラベルを付けます。ユーザーが予定を入れるためだけにサイトから離れてカレンダー アプリを確認しなくてもよいようにしてください。


<div style="clear:both;"></div>

###  ラベルとリアルタイム検証によってフォームのエラーを最小限に留める

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>推奨</b>:可能な項目は事前に入力しておく。
     </figcaption>
  </figure>
</div>

入力箇所に適切なラベルを付けて、リアルタイムで入力内容を検証します。

<div style="clear:both;"></div>

###  効率的なフォームを設計する

[自動入力](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)を活用し、事前に入力されたデータによって簡単にフォームに入力できるようにします。
また、既に把握している情報をあらかじめフィールドに入力します。
たとえば、出荷先および請求先住所を取得するときは、[`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)
の使用を試みるか、出荷先住所と請求先住所を相互にコピーできるようにします。

 

##  ユーザビリティとフォーム ファクタ

ポイント: 操作感を改善するわずかな変更によって、モバイル ユーザーを喜ばせることができます。

###  サイト全体をモバイル向けに最適化する

ユーザーの端末のサイズと機能に応じて変化する[レスポンシブ レイアウト](/web/fundamentals/design-and-ux/responsive/)を使用します。
調査の参加者によると、PC 版およびモバイル版として最適化されたページが混在しているサイトは、PC 版のみのサイトよりも使いづらいことがわかりました。



###  ピンチ操作を不要にする

ユーザーは垂直方向のスクロールには慣れていますが、水平方向のスクロールには慣れていません。
幅を固定した大きな要素は使用しないでください。[CSS メディアクエリ](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)を使用して、さまざまな画面ごとに異なるスタイルを適用します。特定の[ビューポートの幅](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)のみで適切に表示されるようなコンテンツは、作成しないでください。ユーザーに水平方向のスクロールを強制するサイトは [Google モバイル フレンドリー テスト](https://search.google.com/test/mobile-friendly)で不合格となり、検索ランキングが下がる可能性があります。






###  商品の画像を拡大できるようにする

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>推奨</b>:商品の画像を拡大して詳細を容易に確認できるようにする。
     </figcaption>
  </figure>
</div>

小売店の顧客は商品を[高解像度の拡大画像で見る](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)ことをサイトに期待します。調査の参加者は、購入したい商品を見ることができない場合にストレスを感じました。


<div style="clear:both;"></div>

###  最適な向きをユーザーに知らせる

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>推奨</b>:最適な向きをユーザーに知らせる。
     </figcaption>
  </figure>
</div>

調査の参加者は、画面の向きを変えるよう促されるまで同じ向きで見続ける傾向がありました。
横向きと縦向きの両方をデザインするか、最適な向きに切り替えるようユーザーに促してください。
ユーザーが向きの切り替えの提案を無視しても、重要な CTA（コールトゥアクション）を完了できるようにする必要があります。



<div style="clear:both;"></div>

###  1 つのブラウザ ウィンドウに留まらせる

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>推奨</b>:Macy's はサイトでクーポンを提供しているため、ユーザーをサイトに留まらせることができる。
     </figcaption>
  </figure>
</div>

複数のウィンドウを切り替えることが難しく、サイトに戻る方法がわからなくなる場合があります。CTA（コールトゥアクション）によって新しいウィンドウを起動することは避けてください。ユーザーがサイトから離れる操作を特定し、サイトに留まる機能を提供してください。たとえばクーポンを受け付ける場合は、利用したいユーザーがその他のサイトを探さなくても済むように、サイトで直接クーポンを提供します。



<div style="clear:both;"></div>

###  「フルサイト」というラベルは使わない

調査の参加者は「フルサイト」（例: PC 版サイト）と「モバイル版サイト」というオプションを目にすると、モバイル版サイトはコンテンツが不足していると判断し、「フルサイト」を選択して PC 版サイトに移動しました。




###  ユーザーの位置情報が必要である理由を明確にする

ユーザーは常に、[位置情報](/web/fundamentals/native-hardware/user-location/)を求められる理由を知る必要があります。調査の参加者が市外にあるホテルを予約しようとしたところ、旅行サイトが位置を検出し、現在地の都市のホテルを提案したため混乱を招きました。デフォルトでは位置情報のフィールドは空白にして、「現在地の近くで検索」などの CTA を通してユーザーが入力を選択できるようにします。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>推奨</b>:ユーザーの操作時に限って位置情報へのアクセスをリクエストします。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>非推奨</b>:サイトが読み込まれた直後にホームページで位置情報を求めると、ユーザーにあまり良くない印象を与えてしまいます。
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
