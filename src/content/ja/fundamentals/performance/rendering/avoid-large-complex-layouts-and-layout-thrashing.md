project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レイアウトは、要素の幾何学的情報、要素のサイズ、ページ上での位置をブラウザで管理する場所です。個々の要素は、使用された CSS、要素の内容、親要素に基づいて、明示的または暗黙的なサイジング情報を持ちます。このプロセスは、Chrome ではレイアウトと呼ばれます。

#  大きく複雑なレイアウトとレイアウト スラッシングの回避 {: .page-title }

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

レイアウトは、要素の幾何学的情報、要素のサイズ、ページ上での位置をブラウザで管理する場所です。
個々の要素は、使用された CSS、要素の内容、親要素に基づく明示的または暗黙的なサイジング情報を持ちます。
このプロセスは、Chrome、Opera、Safari、および Internet Explorer では、レイアウトと呼ばれます。
Firefox ではリフローと呼ばれますが、実質上は同じプロセスです。


スタイルの計算と同様に、レイアウトのコストについて次の点を直接考慮する必要があります。

1. レイアウトを必要とする要素の数。
2. それらのレイアウトの複雑性。

### TL;DR {: .hide-from-toc }

* 通常、レイアウトはドキュメント全体に適用されます。
* DOM 要素の数はパフォーマンスに影響を与えます。可能な限り、レイアウトのトリガーを避けてください。
* レイアウト モデルのパフォーマンスを評価します。通常、新しい Flexbox は、古い Flexbox またはフロートベースのレイアウト モデルよりも高速です。
* 強制同期レイアウトとレイアウトのスラッシングを回避します。スタイル値を読み取ってから、スタイルを変更します。

## 可能な限りレイアウトを回避

ユーザーがスタイルを変更すると、ブラウザは、いずれかの変更によってレイアウトの計算が必要になるかどうか、そのためにレンダリング ツリーの更新が必要になるかどうかを確認します。幅、高さ、左、上部など、「幾何学的プロパティ」に対する変更はすべてレイアウトを必要とします。


    .box {
      width: 20px;
      height: 20px;
    }

    /**
     * 幅と高さの変更
     * triggers layout.
     */
    .box--expanded {
      width: 200px;
      height: 350px;
    }


**レイアウトはほぼ常にドキュメント全体に適用されます。** 数多くの要素がある場合、それらすべての要素の位置と次元を決定するには長い時間がかかります。

レイアウトを避けることができない場合は、再び Chrome DevTools を使用して必要な時間を確認し、レイアウトが問題の原因であるかどうかを判定することが重要になります。最初に、Chrome DevTools を開き、[Timeline] タブに移動し、記録を開始してサイトを操作します。記録を停止すると、サイトのパフォーマンスの詳細が表示されます。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" alt="長時間のレイアウト処理を表示する DevTools" />

上記の例でフレームを詳しく分析すると、レイアウト内部で 20 ミリ秒超の時間が費やされていることがわかります。アニメーションでフレームを画面に表示する時間が 16 ミリ秒であるのと比べて、これは長すぎます。また、DevTools では、ツリーのサイズ（この例では 1,618 要素）と、レイアウトで必要とされたノードの数もわかります。

注: どの CSS プロパティによってレイアウト、ペイント、コンポジットがトリガーされるのかを明示するリストが必要な場合は[CSS トリガー](https://csstriggers.com)を参照してください。

## 古いレイアウト モデルの代わりに Flexbox を使用

ウェブには複数のレイアウト モデルがあり、一部のモデルは他のモデルよりも広くサポートされます。最も古い CSS レイアウト モデルでは、相対的、絶対的、または要素をフロートすることで、要素を画面上に配置できました。

下記の画面ショットは、1,300 個のボックスでフロートを使用するときのレイアウト コストを示しています。大部分のアプリケーションではさまざまな手法を使用して要素を配置するため、これは明らかに不自然な例です。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" alt="フロートをレイアウトとして使用" />

ウェブ プラットフォームに最近追加された Flexbox を使用するように例を変更すると、状況は変わってきます。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" alt="Flexbox をレイアウトとして使用" />

同じ数の要素と同じ外観に対して、レイアウトで費やされる時間はずっと短くなります（この例では 3.5 ミリ秒対 14 ミリ秒）。Flexbox は[フロートよりもサポート範囲が狭いため](http://caniuse.com/#search=flexbox)、一部のコンテキストでは Flexbox を選択できないことに注意するのが重要です。ただし、可能な場合は、少なくともパフォーマンスに対するレイアウト モデルの影響を検証して、パフォーマンス コストを最小限に抑える手法を採用する必要があります。

Flexbox を選択する場合でも選択しない場合でも、アプリケーションの負荷の高いポイントでは**レイアウトのトリガーを可能な限り避けるようにする**必要があります。

## 強制同期レイアウトの回避

フレームを画面に配置する順序は次のとおりです。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" alt="Flexbox をレイアウトとして使用" />

最初に JavaScript を実行し、次にスタイル計算、その次にレイアウトを実行します。ただし、JavaScript を使用して先にレイアウトを実行するようにブラウザに強制することもできます。これは**強制同期レイアウト**と呼ばれます。

留意するべき最初の事項は、JavaScript を実行すると、以前のフレームからの古いレイアウト値が既知となり、問い合わせ可能になることです。したがって、たとえば、フレームの最初に要素（例: ボックス）の高さを書き出す場合は、次のようなコードを作成できます。


    // Schedule our function to run at the start of the frame.
    requestAnimationFrame(logBoxHeight);

    function logBoxHeight() {
      // Gets the height of the box in pixels and logs it out.
      console.log(box.offsetHeight);
    }


ボックスの高さを問い合わせる前に、ボックスのスタイルを変更すると、問題が生じます。


    function logBoxHeight() {

      box.classList.add('super-big');

      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);
    }


その場合、高さの質問に答えるために、ブラウザは最初にスタイルの変更を適用した後（`super-big` クラスを追加するため）、レイアウトを実行する必要があります。こうして初めて、正しい高さを返すことが可能になります。これは不必要な作業であり、コストが高くなる可能性があります。

そのため、スタイルの読み取りを常にバッチ化して最初に実行した後（ブラウザが以前のフレームのレイアウト値を使用できる場合）、書き込みを行う必要があります。

上記の機能を正しく実行した場合の効果:


    function logBoxHeight() {
      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);

      box.classList.add('super-big');
    }


ほとんどの場合、値を問い合わせる前に、スタイルを適用する必要はありません。最新フレームの値を使用するだけで十分です。スタイル計算とレイアウトをブラウザより早く同期的に実行することはボトルネックになる可能性があり、通常は実行するべき処理ではありません。

## レイアウト転回の回避
多数の強制同期レイアウトを連続的に実行すると、より問題が大きくなります。次のコードを見てください。


    function resizeAllParagraphsToMatchBlockWidth() {

      // Puts the browser into a read-write-read-write cycle.
      for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
      }
    }


このコードはパラグラフのグループをループ処理し、「box」と呼ばれる要素の幅に一致するように各パラグラフの幅を設定します。これは無害に思われますが、問題点はループの各反復でスタイル値（`box.offsetWidth`）を読み取った直後に、その値を使用してパラグラフの幅を更新していることです（`paragraphs[i].style.width`）。ループの次の反復では、（前回の反復で）`offsetWidth` が最後に要求された以降にスタイルが変更されたという事実をブラウザで考慮する必要があります。そのため、スタイル変更を適用してから、レイアウトを実行しなければなりません。これはループのすべての反復で発生します。

このサンプルを修正するには、やはり値を読み取った後で値を書き込むようにします。


    // Read.
    var width = box.offsetWidth;

    function resizeAllParagraphsToMatchBlockWidth() {
      for (var i = 0; i < paragraphs.length; i++) {
        // Now write.
        paragraphs[i].style.width = width + 'px';
      }
    }


安全性を保証する場合は、[FastDOM](https://github.com/wilsonpage/fastdom) を確認する必要があります。これは読み取りと書き込みを自動的にバッチ化するため、強制同期レイアウトとレイアウト転回の発生を防ぐことになります。


{# wf_devsite_translation #}
