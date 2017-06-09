project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: このコードラボでは、ウェブアプリのパフォーマンスのボトルネックを特定して解決する方法を学びます。

{# wf_auto_generated #}
{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# ウェブアプリのパフォーマンスの問題を特定して修正する {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




##  はじめに




このコードラボは、アプリとウェブのパフォーマンスに関する Udacity コース（[ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)）で扱われている内容の一部をテキストベースで説明するものです。このコードラボは、ビデオコースを文字に起こしたものではなく、コースの元のハンズオン形式の最終プロジェクトを使用して、ジャンクの特定および修正方法に的を絞って簡潔に説明することを目的としています。


##  概要




アニメーション、スクロール、またはその他のユーザー操作中に表示が途切れがちになるアプリがあります。このように表示が途切れるのは一般的に「ジャンク」または「震動」と呼ばれるパフォーマンスの問題で、ユーザーの注意の妨げとなります。アプリの使用中にユーザーの思考の流れを中断させ、アプリが不完全でプロの仕事ではないような印象を与えます。

ブラウザでフレームの作成と表示に長時間かかる場合、そのフレームはスキップされ、まったく表示されません。それどころか次のフレーム（またはその次のフレーム）が表示され、オブジェクトはそのフレームを飛ばして表示されるため、フレーム間の遷移がなめらかになりません。

ジャンク現象を回避するには、アプリが確実に毎秒 60 フレーム（60 fps）で実行されるようにします。多くの要素がアプリのフレームレートに影響を及ぼしており、ジャンクを低減または排除し、目的のレートを実現するための JavaScript や CSS のコーディング方法にはさまざまなものがあります。

このコードラボでは、アプリのパフォーマンスの問題に対する取り組み方を変えることを目的とし、ジャンクの原因になっているフレーム表示のボトルネックを見つけて解決できる方法を説明します。

### 前提条件

*  クリティカル レンダリング パス: レンダリング パイプラインと、JavaScript および CSS がそれにどのように影響を与えるかを理解している必要があります。詳細については、[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) および Udacity コース [Website Performance Optimization:The Critical Rendering Path](https://www.udacity.com/course/website-performance-optimization--ud884) を参照してください。
*  フレームとフレームレート: ブラウザによるフレームの作成方法と、60 fps レートがなめらかな表示にとって重要である理由を理解している必要があります。詳細については、[https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) および Udacity コース [Browser Rendering Optimization: Building 60 FPS Web Apps](https://www.udacity.com/course/browser-rendering-optimization--ud860) を参照してください。
*  アプリケーション ライフサイクル: 実行中のアプリのレスポンス、アニメーション、アイドル、読み込みの各部分を理解しており、それぞれの部分がもたらす機会に気付く必要があります。詳細については、[RAIL パフォーマンス モデル](/web/fundamentals/performance/rail)を参照してください。
*  Chrome DevTools: DevTools の基本およびこのツール（特に Timeline ツール）を使用してウェブアプリを分析する方法を理解している必要があります。詳細については、[ランタイム パフォーマンスの分析](/web/tools/chrome-devtools/rendering-tools/)を参照してください。

### このコードラボでの学習内容

* 表示パフォーマンスのボトルネックの原因になっているアプリケーション コードを特定する方法
* コードを分析し、ボトルネックを低減または排除するために修正する方法

### 開発ワークスペースに必要なもの

* Google Chrome ブラウザ、DevTools
* 実践的なプロジェクトのサンプルコード（以下を参照）

### ジャンクと震動

Jake Archibald 作成のゲーム「Jank Invaders」をプレイして、ジャンクがどういうものかを確認しましょう。このゲームは、フレームレートとパフォーマンスの問題のデモンストレーションのために作成されています。スクリーン ショットを次に示します。

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

このゲームでは、画面を宇宙船が横断していきます。味方はなめらかに動きますが、敵（スパイ船）はガクガクと震えながら動きます。あなたのジョブは、なめらかに動く味方の宇宙船の中から、ガクガクと震えながら動く 10 隻のスパイ船を見つけ、即座にそのスパイ船をクリックして撃ち落とすことです。[このリンクからゲームにアクセスできます](http://jakearchibald.github.io/jank-invaders/)。ゲームをプレイしてみてください。ゲームを終えたらここに戻ってきてください。

ユーザーは、明らかにジャンクに気付きます。したがって、動きがなめらかなアプリを選ぶことはほぼ確実です。ウェブの場合も同様で、良いサイトであってもパフォーマンスが低いと台無しです。このコードラボでは、自分のプロジェクトのパフォーマンスを理解し、一般的な問題を特定して修正する方法を学ぶことができます。スクロールがひっかかる、更新がちらちらする、アニメーションがガクガク震える原因を突き止めて、なめらかで途切れることのない 60 fps のフレームレートを実現します。


##  プロジェクト アプリ




まず、このコードラボでデバッグするアプリを見てみましょう。次のようなアプリです。

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

このサイトでは、__Hacker News API__ を使用して、最新記事とそのスコアを表示します。現在、このアプリは、特にモバイル上で非常に低いパフォーマンスとなっていますが、60 fps を実現できないわけではありません。このコードラボを終えると、このジャンクの多いアプリを魅力的で効率的な 60 fps のエクスペリエンスに変えるために必要なスキル、技術、そして最も重要な要素である、考え方を身に付けることができます。

### プロジェクト コードの入手

まず、「修正前」と「修正後」の両方のバージョンのアプリケーション コードを入手する必要があります。これは、レポジトリからコピーするか、単に zip ファイルをダウンロードすることで入手できます。

* パフォーマンスにボトルネックのある元のアプリを [GitHub レポジトリ](http://github.com/udacity/news-aggregator)から入手します。また、実際のアプリを[ライブサイト](http://udacity.github.io/news-aggregator/)で確認することもできます。これが、これから作業するバージョンです。
* パフォーマンスにボトルネックのない、完成したアプリを [GitHub レポジトリ](https://github.com/udacity/news-aggregator/tree/solution)から入手します。この修正後のバージョンは、参照用に使用できます。

### 元のアプリの実行

まず、ジャンクのある元のバージョンのアプリを実行します。Chrome で、最上位フォルダ（例: news-aggregator-master）にある __index.html__ を開きます。アプリを少し操作してみると、メイン画面内でのスクロールと記事のスライドインやスライドアウトという、2 つの主要なユーザー操作に高度なパフォーマンスの問題がいくつかあることにすぐ気付きます。これらの主な問題に注目して、ジャンクのあるこのアプリのパフォーマンスを改善する方法を説明します。


##  レッスン 1: リストのスクロール




メイン画面でスクロールしていると、記事のリストが震えることに気付くでしょう。また、個々の記事ポイント インジケータ（丸で囲まれた数字）の値だけでなく、色も変わることに気付くでしょう。このレッスンでは、これらの問題を特定し、その問題の解決方法を決定します。

Timeline を使用し、メイン画面をスクロールしたときに具体的に何が起こっているのかを見てみましょう。記録を開始する前に、[__JS Profile__] チェックボックスが有効になっていることを確認してください。新しい記録を開始し、リストを下に少しスクロールして、記録を停止します。 

記録の上部に緑色の FPS インジケーターが表示されています。以下のスクリーンショットのように、緑色のバーに不定期なスパイクがあることがわかります。緑色のバーはとても低く、画面が 60 FPS に到達していなかったことを示しています。

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

記録にズームインして、スクロール イベントの後が関数呼び出しであり、その後に多数の個別のレイアウト イベントがあることを確認します。各レイアウト イベントには、赤い三角形の警告が含まれます。レイアウト イベントは、以下のスクリーンショットのフレーム チャートの下部にある非常に小さい紫色のイベントです。これは、確実に「強制同期レイアウト」が発生していることを示しています。

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

カーソルを合わせてレイアウト イベントを特定し、クリックしてその詳細を表示します。 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

レイアウト イベントの詳細を確認すると、強制同期レイアウトの警告が app.js の `colorizeAndScaleStories` 関数によって生成されていることがわかります。

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

この関数を詳しく見てみましょう。

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

`height`、`width`、`line-height` がアクセスされていることに注目してください。これらはレイアウトの実行を引き起こします。不透明度も設定されています。不透明度が変更されてもレイアウトはトリガーされませんが、コードのこの行が新しいスタイルに適用されると、再計算とレイアウトがトリガーされます。これらの 2 つの手法は、関数のメインループで使用され、強制同期レイアウトの問題を引き起こします。 

次に、記事ポイント インジケータに対する視覚効果を見てみます。この効果には、情報的な価値はありません。JavaScript ではなく CSS プロパティを使用してこの効果を実現できますが、この効果を完全になくしたほうが、パフォーマンスが向上することがあります。ここで覚えておくべき点は、場合によってはコードを削除することが最適なコード修正方法であるということです。

`colorizeAndScaleStories` 関数の呼び出しを削除してみましょう。app.js の行 88、89、305 と、関数自体（行 255 から 286）をコメントアウトします。このコードラボで後で参照する行番号がアプリと一致しなくなるため、行は削除しないでください。記事ポイントが常に同じ表示になりました。

アプリを再度実行し、スクロール アクティビティの Timeline 記録を何回か行って、スクロール イベントにズームインします。今回は、スクロール後にスタイルの再計算が 1 回のみ行われ、FPS バーはかなり上にあることがわかります。 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

余分なレイアウトおよび強制同期レイアウトの警告が消え、フレームレートが良好になりました。ジャンクの問題が 1 つ解決しました。


##  レッスン 2: 記事の連結




アプリのなめらかさに影響する別の問題に、記事がリストに追加されるときの不自然なスクロールが挙げられます。`scroll` イベント リスナー コードの `loadStoryBatch` の呼び出しに注目してください。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

この関数は、新しい記事が読み込まれるとページに挿入して、ページの見た目を変更します。具体的には、`appendChild` を使用して DOM ノードを追加します。関数にも、関数を使用する設計手法にも根本的な間違いはありませんが、呼び出す方法を考慮してください。

`loadStoryBatch` 関数は計画性がありません。これは `loadThreshold` テストに基づいて必要なときはいつでも実行します。ページで他に何が実行されているかや、ブラウザがフレーム構築プロセスのどの段階にあるかを考慮しません。これは、JavaScript エンジンは、スクリプトを実行するときにレンダリング パイプラインをまったく考慮しないからです。その即時性によりパフォーマンスの問題が発生し、特に多数の記事がリストに追加されます。この問題は、「requestAnimationFrame」を使用して対処できます。

理想的には、ページの見た目を変更するものは requestAnimationFrame 呼び出し内に出現する必要があります。その変更を `scroll` イベント リスナー コードに追加してみましょう。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

この簡単な変更により、アニメーション関連のスクリプトがパイプライン プロセスの前半に実行され、小さなことですが大幅にパフォーマンスが向上します。


##  レッスン 3: 記事のスライドインとスライドアウト（パート 1）




このニュース集約アプリのもう 1 つの問題領域は、記事のスライドインとスライドアウトの基本動作です。スクロールを除けば、これがアプリで最もよく使用されるユーザー操作機能です。

これまでと同様に、記事のスライドインとスライドアウトの Timeline 記録を行い、フレームレートを調べることから始めます。実際には、スライドインとスライドアウトは、少しジャンクが含まれる程度から、各種デバイスで根本的に使いものにならない程度まで幅がある可能性があります。[ライブサイト](http://udacity.github.io/news-aggregator/)は、必ずモバイル端末で表示してください。ただし、これはすべてのプラットフォームで発生する問題です。

![59865afca1e508ef.png](img/59865afca1e508ef.png)

一般的に、赤い三角形が表示された紫色のイベントが表示されたときは、その上にカーソルを合わせてクリックし、その詳細を表示すると調査できます。現在タイマーが起動された後に発生した強制同期レイアウトに注目しています。 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

スライドインとスライドアウトのアニメーションはタイマーを起動していて、強制同期レイアウトが発生しています。詳細には、app.js ファイルの行 180 と示されています。これは `animate` という関数です。この関数を詳しく見てみましょう。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

最初に気付くのは、`animate` への次の呼び出しを設定する `setTimeout` です。前のレッスンで学んだように、ページに対して行われる表示処理は通常、`requestAnimationFrame` 呼び出し内に設定する必要があります。しかし、この `setTimeout` 自体が問題です。

この場合、明白かつ簡単な修正方法は、`animate` に対する各呼び出しを `requestAnimationFrame` 内に配置して、フレーム シーケンスの最初に呼び出されるように強制的にスケジュールすることです。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

もう一度 Timeline 記録を行うと、端末によっては、パフォーマンスに中程度から大幅な向上が見られます。

ボーナス質問: 記事のスライドインとスライドアウトで何が行われているかを考えます。ページ上で記事を表示したり、非表示にしたりして、コンテンツが表示されたり隠れたりするようにしているだけです。これは、単純な遷移プロセスに見えます。この処理のために JavaScript が必要でしょうか。CSS のみで処理できるでしょうか。このシナリオについては、レッスン 5 で再度考えます。


##  レッスン 4: メモリの浪費




ジャンクのあるアニメーションは、ウェブアプリとページのパフォーマンスを低下させる唯一の原因ではありません。別の主な原因に、非効率的なメモリの使用があります。ご推察のとおり、このニュース集約アプリでも、この問題が発生しています。

メインリストで記事の見出しをクリックすると、アプリによって記事のコンテンツが作成されてページに追加され、スライドインして表示されます。これが、調査が必要な「ページへの追加」の部分です。便利なことに、記事のクリックを処理する関数は `onStoryClick` という名前です。これを見てみましょう。

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

最初の変数宣言のグループの後にある、要素のタイプ、属性、コンテンツを設定する変数 `storyDetails` を構成する 4 行に注目してください。その直後で、`appendChild` メソッドを使用して、`storyDetails` が DOM に新しいノードとして追加されることに注意してください。

最初は、これは必ずしも問題ではありませんが、アプリが使用されるにつれ、非効率性が増します。もちろん、ユーザーは一度に 1 つの記事しか表示しませんが、表示された記事ごとに作成される新しいノードが破棄されることはありません。数回のクリックで、DOM はメモリを消費してアプリの速度を低下させる破棄されたノードで煩雑な状態になります。アプリの使用時間が長くなるほど、パフォーマンスが低下します。

この機能を実現するより優れた方法は、スクリプトの前半で、現在の記事を格納する永続的な `storyDetails` ノードを 1 つのみ作成し、新しいノードを作成する代わりに、信頼できる `innerHTML` プロパティを使用してノードのコンテンツを毎回リセットすることです。つまり、このコードを単純にします。 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

次のようにします。

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

この変更によって、長期的なパフォーマンスは間違いなく向上しますが、短期的な効果は何もありません。 

まだ、記事のスライドインとスライドアウトの問題に対応する必要があります。


##  レッスン 5: 記事のスライドインとスライドアウト（パート 2）




ここまでで、アプリの全体的なパフォーマンスを確実に向上させただけでなく、リストのスクロールといった特定のパフォーマンスの問題にも対処しました。しかし、改善されたアプリを実行してみると、記事のスライドインとスライドアウトという、別の主なユーザー操作にまだジャンクがあることがわかります。

このプロセスを調べてみましょう。Timeline で、JavaScript プロファイラを有効にし、記事の見出しをクリックして記事をスライドインさせ、記事の [X] ボタンをクリックしてスライドアウトさせている間、Timeline 記録を行います。レッスン 3 で見たように、`onStoryClick` 関数は（まだ）強制同期レイアウトを引き起こしています。

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

レッスン 3 では、`animate` 関数呼び出しを `requestAnimationFrame` 内に配置しました。これは確実に効果はありましたが、問題を完全に取り除くことはできませんでした。 

特定のプロパティを使用すると、レンダリング パイプラインの特定の部分が実行されるという、前の説明（および [CSS トリガー](http://csstriggers.com/)で調べたこと）を思い出してください。`animate` を改めて見てみましょう。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

関数の終わり付近で、`left` プロパティが設定され、これによってブラウザでレイアウトが実行されています。その少し後に、`style` プロパティが設定され、これによってブラウザでスタイルの再計算が実行されています。ご存じのとおり、これが 1 つのフレーム内で複数回行われると、強制同期レイアウトが発生します。そして、これはこの関数内で複数回行われています。 

`animate` 関数は `showStory` 関数とその姉妹関数である `hideStory` 内に含まれています。いずれの関数も同じプロパティを更新し、強制同期レイアウトの問題を引き起こします。

このコードラボで既に学習したとおり、場合によっては、最適なコードの修正方法はコードを削除することです。`showStory` および `hideStory` 関数は確かに役目を果たしていますが、単純な効果を得るためには複雑すぎます。そこで、これらの関数はしばらく置いておき、代わりに CSS を使用して目的を達成できるかを見てみましょう。次の CSS コードを見てください。

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

`.story-details` クラスで最初に気付くことは、画面の幅にかかわらず、`left` プロパティを 100% に設定していることです。これにより、記事要素全体が右に寄せられ、ページの表示部分から完全に外れて、実質上非表示になります。 

次に、`.story-details.visible` および `.story-details.hidden` クラスのそれぞれに `transform` を設定し、X（水平）の位置をそれぞれ -100 vw（「ビューポート幅」）と 0 に強制的に設定します。適用すると、これらのクラスは記事のコンテンツをビュー内に再配置するか、元の画面外の位置に戻します。

次に、記事が実際にアニメーションのように表示され、パッと現れたり消えたりするだけではないことを確認するために、`transform` で `transition` を設定して、遷移の実行時間を 0.3 秒（33 ミリ秒）にします。これにより、なめらかなスライドインとスライドアウトの視覚効果を実現できます。

最後に、`will-change` プロパティを使用して、行われる予定の `transform` の変更をブラウザに通知します。

`showStory` および `hideStory` 関数に戻ります。これで、新しい `visible` および `hidden` クラスを単に追加または削除するように、これらの関数を大幅に簡素化して、複雑なスクリプトを作成することなく、必要な視覚的変更を実現することができました。

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

以上のすべてが、アプリの記事のスライドインとスライドアウトのパフォーマンスを大幅に向上させているはずですが、もちろん、これを確かめる唯一の方法はテストすることです。記事のスライドインとスライドアウトの Timeline 記録をもう一度行って、結果を見てみましょう。

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

アプリのパフォーマンスは大幅に向上しているはずです。すべてのフレームは 60 fps の線よりはるかに下にあり、強制同期レイアウトの警告が消えています。何よりも、スライドインとスライドアウトのアニメーションを実行するために JavaScript を使用する必要がなくなりました。 

これで、基本的なパフォーマンス向上作業は終了です。


## これで完了です。




説明に従って、推奨される変更を元のプロジェクト コードに加えれば、アニメーションにジャンクのない、60 fps でなめらかに実行されるアプリが完成するはずです。

### 取り上げた内容

このコードラボでは、次の内容を取り上げました。

* 前提となる知識: クリティカル レンダリング パス、フレームとフレームレート、アプリケーション ライフサイクル、Chrome DevTools
* ジャンクの概要: ジャンクの説明、発生原因、視覚的に特定する方法
* プロジェクト アプリ: 本来の動作、なめらかなアニメーションにならない理由、問題の特定および解決方法

### 学習内容

このコードラボで学習した主な内容は、次のとおりです。

* 画面のアニメーションにジャンクがある場合、設計とコードの両方に問題がある可能性があります。
* ジャンクを認識できること、またはジャンクが存在しないことが、アプリを使用するかどうかをユーザーが決定するうえでの重要な要素です。
* 些細な速度の調整でさえも、長期間でのアプリの全体的なパフォーマンスを大幅に向上させることができます。

### 次のステップ

[GitHub レポジトリ](https://github.com/udacity/news-aggregator/tree/solution)にある完全なプロジェクト コードを詳細に確認することをお勧めします。ここで見つけられるコードには、このコードラボの時間内で行った以上の改良が加えられています。「修正前」と「修正後」のアプリを比較して、コードの違いを調べ、アプリのパフォーマンスを向上させるために作成者が他にどのような変更を行ったかを確認してください。

### ありがとうございました

このコードラボに参加いただきありがとうございました。私たちは常に改善に努めています。問題のバグを見つけた場合、提案や問題、コメントがある場合は、以下のフィードバック リンクからご連絡ください。それでは、コーディングを楽しんでください。




{# wf_devsite_translation #}
