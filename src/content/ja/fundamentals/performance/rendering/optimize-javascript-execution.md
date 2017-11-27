project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript は多くの場合、視覚変化をトリガーします。視覚変化はスタイル操作を通じて直接行われることもあれば、データの検索やソートのように、計算が最終的に視覚変化につながることもあります。タイミングの悪い JavaScript や長時間実行される JavaScript はパフォーマンス低下の原因になることが多いため、可能な限り JavaScript の影響を最小限に抑える必要があります。

{# wf_updated_on:2015-03-20 #}
{# wf_published_on:2015-03-20 #}

#  JavaScript 実行の最適化 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript は多くの場合、視覚変化をトリガーします。視覚変化はスタイル操作を通じて直接行われることもあれば、データの検索やソートのように、計算が最終的に視覚変化につながることもあります。
タイミングの悪い JavaScript や長時間実行される JavaScript はパフォーマンス低下の原因になることが多いため、可能な限り JavaScript の影響を最小限に抑える必要があります。



ユーザーが書く JavaScript は実際に実行されるコードとは異なるため、JavaScript パフォーマンス プロファイリングはちょっとした便利な技術と言えます。最近のブラウザは JIT コンパイラおよび多様な最適化とトリックを使用して、可能な限り高速の実行を実現しようとします。これによって、コードの動態が大きく変わります。

注: JIT の動作を確認したい場合は、<a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> by Vyacheslav Egorov</a> を参照してください。Chrome の JavaScript エンジン V8 による最適化のときの、JavaScript コードの中間状態が示されています。

ただし、そうは言っても、アプリで JavaScript を的確に実行するための工夫がいくつかあります。

### TL;DR {: .hide-from-toc }

* 視覚的な更新のために setTimeout または setInterval を使用するのを避けて、常に requestAnimationFrame を使用するようにします。
* 長時間実行される JavaScript をメインスレッドから Web Worker に移動します。
* マイクロタスクを使用して、複数のフレームにわたって DOM 変更を行います。
* Chrome DevTools の Timeline と JavaScript プロファイラを使用して、JavaScript の影響を評価します。

## 視覚変化に対する `requestAnimationFrame` の使用

画面上で視覚変化が発生しているとき、ブラウザにとって的確なタイミングで（つまり、フレームの開始時に）処理を実行する必要があります。フレームの開始時に JavaScript が実行されることを保証する唯一の方法は、`requestAnimationFrame` を使用することです。


    /**
     * If run as a requestAnimationFrame callback, this
     * will be run at the start of the frame.
     */
    function updateScreen(time) {
      // Make visual updates here.
    }

    requestAnimationFrame(updateScreen);


フレームワークまたはサンプルでは、アニメーションのような視覚変化を実現するために `setTimeout` または `setInterval` を使用する場合がありますが、これの問題はコールバックがフレームの任意の位置で（おそらくフレームの最後で）実行されることです。そのため、1 つのフレームが見落とされ、ジャンクを発生させることが頻繁にあります。

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="ブラウザでフレームの見落としを発生させる setTimeout">

実際、jQuery のデフォルト `animate` 動作では `setTimeout` が使用されます。[`requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame) を使用するように、この動作を修正できます（この修正を強く推奨します）。

## 複雑性の軽減または Web Worker の使用

JavaScript は、スタイル計算、レイアウト、そして多くの場合はペイントとともに、ブラウザのメインスレッドで実行されます。JavaScript が長時間実行される場合は、これらの他のタスクがブロックされ、フレームが見落とされることになる可能性があります。

JavaScript を実行するタイミングと実行時間は十分に考慮する必要があります。たとえば、スクロール操作のようなアニメーションでは、JavaScript の実行時間を **3～4 ミリ秒**に抑えることが理想的です。そうしないと、実行時間が長くなりすぎる危険があります。アイドル期間であれば、実行時間をあまり気にする必要はありません。

多くの場合、たとえば、DOM アクセスが必要でない場合は、純粋な計算処理を [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage) に移動することができます。ロード処理やモデル生成と同様に、検索やソートなどのデータ操作またはトラバーサルは、通常、この手法に適しています。


    var dataSortWorker = new Worker("sort-worker.js");
    dataSortWorker.postMesssage(dataToSort);

    // The main thread is now free to continue working on other things...

    dataSortWorker.addEventListener('message', function(evt) {
       var sortedData = evt.data;
       // Update data on screen...
    });



すべての処理がこの手法に適しているとは限りません。Web Worker は DOM アクセスを行いません。メインスレッドで処理を実行する必要がある場合は、バッチ手法を検討してください。この手法では、大きいタスクを複数のマイクロタスクに分割します。各マイクロタスクの実行時間は数ミリ秒以内であり、各フレームにわたり `requestAnimationFrame` ハンドラの内部で実行されます。


    var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
    requestAnimationFrame(processTaskList);

    function processTaskList(taskStartTime) {
      var taskFinishTime;

      do {
        // Assume the next task is pushed onto a stack.
        var nextTask = taskList.pop();

        // Process nextTask.
        processTask(nextTask);

        // Go again if there’s enough time to do the next task.
        taskFinishTime = window.performance.now();
      } while (taskFinishTime - taskStartTime < 3);

      if (taskList.length > 0)
        requestAnimationFrame(processTaskList);

    }


この手法により UX と UI に影響があります。[進捗インジケータまたはアクティビティ インジケータ](https://www.google.com/design/spec/components/progress-activity.html) を使用して、タスクが処理されていることをユーザーに知らせる必要があります。どのような場合も、この手法ではアプリのメインスレッドが空けられるため、ユーザーの操作に迅速に応答することができます。

## JavaScript の「フレームコスト」の認識

フレームワーク、ライブラリ、または独自のコードを評価するときは、JavaScript コードをフレーム単位で実行するコストを評価することが重要です。遷移やスクロールのようなパフォーマンス重視型アニメーション処理を実行するとき、これは特に重要です。

JavaScript のコストとパフォーマンス プロファイルを計測する最適な方法は、Chrome DevTools を使用することです。通常、次のような概略情報のみが表示されます。

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="JavaScript 実行の概略情報を示す Chrome DevTools の Timeline">

長時間実行されている JavaScript を見つけた場合は、DevTools のユーザー インターフェースの最上部で JavaScript プロファイラを有効化することができます。

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="DevTools での JavaScript プロファイラの有効化">

この方法で JavaScript をプロファイリングするには負荷がかかるため、JavaScript の実行時特性を詳細に分析する場合に限り、プロファイラを有効化してください。チェックボックスをオンにしても、同じ機能を実行でき、JavaScript で呼び出された関数に関する極めて詳細な情報を参照できます。

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="JavaScript 実行の詳細情報を示す Chrome DevTools の Timeline">

この情報を活用して、アプリケーションに対する JavaScript のパフォーマンス影響を評価し、関数の実行に時間がかかりすぎているホットスポットの検出と修正を開始することができます。前述のとおり、長時間実行される JavaScript は削除するか、それが不可能な場合は、他のタスクを続行するために JavaScript を Web Worker に移動してメインスレッドを解放する必要があります。

## JavaScript の細かい最適化の回避

ブラウザが特定の処理を他の処理よりも 100 倍速く実行できることは注目に値します。同様に、要素の `offsetTop` の要求は `getBoundingClientRect()` の計算よりも高速です。ただし、通常、これらの関数は 1 フレームあたり数回しか呼び出されないため、JavaScript のパフォーマンスのこの側面に注力することは一般的に無駄な努力になります。通常、短縮できる時間はわずかミリ秒未満です。

ゲームや計算負荷の高いアプリケーションを開発している場合は、通常、大量の計算を単一のフレームに埋め込みます。その場合はあらゆることが役立つため、このアドバイスは当てはまりません。

簡単に言えば、通常、細かい最適化は作成中のアプリケーションに適しないため、細かい最適化には非常に慎重になる必要があります。


{# wf_devsite_translation #}
