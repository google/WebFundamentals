project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 入力ハンドラは、アプリ内のパフォーマンスの問題の潜在的な原因となります。これらはフレームの完了を妨げ、追加の不要なレイアウト作業の原因になります。

{# wf_updated_on: 2015-10-06 #}
{# wf_published_on: 2015-03-20 #}

# 入力ハンドラのデバウンス {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

入力ハンドラは、アプリ内のパフォーマンスの問題の潜在的な原因となります。これらはフレームの完了を妨げ、追加で不要なレイアウト処理を発生させます。



### TL;DR {: .hide-from-toc }

* 長時間実行される入力ハンドラを避けて、スクロールがブロックされないようにします。
* 入力ハンドラでのスタイル変更を避けます。
* ハンドラをデバウンスします。イベント値を格納し、次の requestAnimationFrame コールバックでスタイル変更を処理します。

## 長時間実行される入力ハンドラの回避

最速のケースでは、ユーザーがページと対話するときに、ページのコンポジタ スレッドが、ユーザーのタッチ入力を感知し、単純にコンテンツを移動させることができます。これには、メインスレッドによる処理（JavaScript、レイアウト、スタイル、ペイントの実行）は必要ありません。

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" alt="軽量スクロール、コンポジタのみ。">

ただし、`touchstart`、`touchmove`、`touchend` などの入力ハンドラをアタッチする場合は、これらのハンドラの実行の完了をコンポジタ スレッドが待機しなければなりません。これは、`preventDefault()` が呼び出され、タッチ スクロールの実行が停止される場合があるためです。`preventDefault()` が呼び出されない場合でも、コンポジタは待機する必要があり、これによりユーザーのスクロールがブロックされ、ぎこちない動きやフレームの欠損につながります。

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="スクロールが重い。コンポジタは JavaScript でブロックされています。">

つまり、実行するすべての入力ハンドラがすぐに実行され、コンポジタがジョブを実行できるようにする必要があります。

## 入力ハンドラでスタイルの変更を避ける

入力ハンドラは、スクロールやタッチのように、すべての `requestAnimationFrame` コールバックの直前に実行するようにスケジュールされています。

どれか 1 つのハンドラ内で視覚的変化を加えた場合、`requestAnimationFrame` の開始時に、スタイルの変更が保留されます。続けて、requestAnimationFrame コールバックの開始時に視覚的なプロパティを読み取ると、[大規模で複雑なレイアウトとレイアウト転回の回避](avoid-large-complex-layouts-and-layout-thrashing) で説明しているとおり、強制同期レイアウトがトリガーされます。

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="スクロールが重い。コンポジタは JavaScript でブロックされています。">

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


このようにすると、入力ハンドラを軽量に保つこともできるため、計算コストが高いコードでスクロールやタッチなどの操作がブロックされなくなるという、追加の利点があります。


{# wf_devsite_translation #}
