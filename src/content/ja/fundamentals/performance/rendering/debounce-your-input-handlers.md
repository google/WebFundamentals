project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 入力ハンドラは、アプリ内のパフォーマンスの問題の潜在的な原因となります。これらはフレームを完了ブロックする可能性があり、追加の (不要な) レイアウト作業の原因になります。

{# wf_updated_on: 2015-03-19 #}
{# wf_published_on: 2000-01-01 #}

# Debounce your input handlers {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


入力ハンドラは、アプリ内のパフォーマンスの問題の潜在的な原因となります。これらはフレームを完了ブロックする可能性があり、追加の (不要な) レイアウト作業の原因になります。

### TL;DR {: .hide-from-toc }
- 長時間実行されている入力ハンドラを避けます。スクロールをブロックすることがあるためです。
- 入力ハンドラでスタイルを変更しないでください。
- ハンドラをデバウンスします。イベント値を格納し、次の requestAnimationFrame コールバックでのスタイルの変化に対応します。


## 長時間実行されている入力ハンドラを避けます。

最速のケースでは、ユーザーがページと対話するときに、ページのコンポジスレッドは、ユーザーのタッチ入力を感知し、周りにコンテンツを移動することができます。 ここでは、メイン スレッドによる一切の作業を必要とせず、JavaScript、レイアウト、スタイル、ペイントが行われます。

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="軽量スクロール; コンポジタのみ。">

ただし、`touchstart`、`touchmove`、`touchend`などの入力ハンドラをアタッチする場合は、ハンドラの実行の完了をコンポジタ スレッドが待機しなければなりません。l `preventDefault()` を呼び出すか、タッチ スクロールを停止します。 `preventDefault()` を呼び出さない場合でも、ユーザーのスクロールがブロックされているときなど、コンポジタは待機しなければなりません。これはぎこちない動きやフレームの欠損につながります。

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="ヘビースクロール; コンポジタは JavaScript でブロックされています。">

つまり、すべての入力ハンドラがすぐに実行され、コンポジタがジョブを実行できることを確認する必要があります。

## 入力ハンドラでスタイルを変更を避ける

力ハンドラは、スクロールやタッチのように、`requestAnimationFrame` コールバックの前に実行するようにスケジュールされています。

それらのハンドラの 1 つの内部に視覚的変化を加えた場合、`requestAnimationFrame` の開始時に、スタイルの変更が保留されます。 “[Avoid large, complex layouts and layout thrashing](avoid-large-complex-layouts-and-layout-thrashing)” に記載されているとおり、RequestAnimationFrame コールバックの開始時にビジュアル プロパティを読み込むと、強制同期レイアウトがトリガーされます。

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="ヘビースクロール; コンポジタは JavaScript でブロックされています。">

## スクロール ハンドラのデバウンス

上記の両方の問題の解決方法は同じです。常に次の `requestAnimationFrame` コールバックに視覚的変化をデバウンスする必要があります。


    function onScroll (evt) {
    
      // Store the scroll value for laterz.
      lastScrollY = window.scrollY;
    
      // Prevent multiple rAF callbacks.
      if (scheduledAnimationFrame)
        return;
    
      scheduledAnimationFrame = true;
      requestAnimationFrame(readAndUpdatePage);
    }
    
    window.addEventListener('scroll', onScroll);
    

このようにすると、ハンドラの利点を最大限に活かせます。スクロールやタッチなど、計算コストが高いコードをブロックしないからです!


