project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:このインタラクティブなガイドに従って、レイアウトの強制同期の診断に DevTools を使う方法を習得します。

{# wf_updated_on: 2016-03-31 #}
{# wf_published_on: 2015-04-13 #}

# レイアウトの強制同期の診断 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

レイアウトの強制同期の診断に DevTools を使う方法について説明します。


このガイドでは、ライブデモを使って問題を特定して解決することで、[レイアウトの強制同期][fsl]をデバッグする方法を学びます。
このデモでは、[`requestAnimationFrame()`][raf] を使って、イメージをアニメーションにします。アニメーションにする場合は、フレームベースのアニメーションのアプローチが推奨されます。
ただし、このアニメーションにはかなりの量の問題点が含まれます。
目標は、デモが 60 FPS でスムーズに実行されるように、問題点の原因を見極め、解決することです。
 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


##  データの収集

まず、ページの実行中に行われている処理を正確に把握できるように、データを取得します。
 

1. [デモ](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html)を開きます。
1. DevTools の [**Timeline**] パネルを開きます。
1. [**JS Profile**] オプションを有効にします。後でフレーム チャートを分析する際に、このオプションによって呼び出された関数が正確に表示されるようになります。
1. ページの [**Start**] をクリックして、アニメーションを開始します。
1. [Timeline] パネルの**記録**ボタンをクリックして、Timeline の記録を開始します。
1. 2 秒間待機します。
1. もう一度**記録**ボタンをクリックして、記録を停止します。 

記録が完了すると、[Timeline] パネルに以下のように表示されます。
 

![問題のあるデモの Timeline 記録](imgs/demo-recording.png)

##  問題点の特定

データを収集したら、そのデータを解釈します。 

Timeline 記録の [**Summary**] ペインを見ると、ブラウザは大半の時間をレンダリングに費やしているのがわかります。
一般的には、[ページのレイアウト操作を最適化][layout]できると、レンダリング時間が短くなる可能性があります。

 

![Timeline の [Summary]](imgs/summary.png)

ここで、**概要**ペインの直下にあるピンクのバーに注目します。
これらのバーはフレームを表します。バーにカーソルを合わせると、そのフレームに関する詳細情報が表示されます。


![実行時間が長いフレーム](imgs/long-frame.png)

このフレームは完了までに時間がかかっています。スムーズなアニメーションにするために、60 FPS を目標にします。
 

ここからは、問題点を正確に診断していきます。マウスを使用して、コールスタックを[拡大][zoom]します。
 

![拡大した Timeline 記録](imgs/zoom.png)

スタックの一番上に `Animation Frame Fired` イベントがあります。このイベントが発生すると、必ず `requestAnimationFrame()` に渡した関数が呼び出されています。`Animation Frame Fired` の下には `Function Call` が、その下には `update` があります。
`update()` というメソッドが `requestAnimationFrame()` のコールバックだと推測できます。
 

注: ここで、以前有効にした [**JS Profile**] オプションが役に立ちます。
このオプションを無効にしていると、`Function Call` の下にすべてのイベントが小さく紫色（後述）で表示されます。呼び出された関数を正確に示す詳細情報は表示されません。



次に、`update` イベントの下にある、小さく紫色で表示されたイベントに注目します。
これらのイベントのうち、上部にある多くのイベントは赤で表示されています。これは警告を表します。
このようなイベントにカーソルを合わせると、ページが強制リフローの影響を受けている可能性を示す DevTools からの警告が表示されます。
強制リフローとは、レイアウトの強制同期の別称です。
 

![レイアウト イベントにカーソルを合わせる](imgs/layout-hover.png)

ここからは、すべてのレイアウトの強制同期の原因となっている関数を見ていきます。
レイアウト イベントの 1 つをクリックして選択します。[Summary] ペインに、このイベントに関する詳細が表示されるようになります。
[**Layout Forced**]（`update @ forcedsync.html:457`）の下にあるリンクをクリックして、関数の定義に移動します。



![関数定義への移動](imgs/jump.png)

[**Sources**] パネルに関数の定義が表示されます。 

![[Sources] パネルの関数定義](imgs/definition.png)

`update()` 関数は `requestAnimationCallback()` のコールバック ハンドラです。
ハンドラは、イメージの `offsetTop` 値に基づいて各イメージの `left` プロパティを計算します。
この計算により、ブラウザは新しいレイアウトの即時実行を強制され、正確な値になるようにします。
アニメーションのフレームで毎回レイアウトの適用が強制されると、ページのアニメーションが不自然になる原因になります。
 

問題を特定したら、DevTools で直接解決します。


[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

##  DevTools 内での解決

このスクリプトは HTML に埋め込まれているため、[**Sources**] パネルからは編集できません（ただし、`*.js` のスクリプトは [Sources] パネルで編集できます）。
 

ただし、変更点をテストするために、コンソールで関数を再定義できます。HTML ファイルから DevTools コンソールに関数の定義をコピーして貼り付けます。
`offsetTop` を使用しているステートメントを削除し、その下のステートメントのコメントを解除します。
完了したら、`Enter` キーを押します。 

![問題のある関数の再定義](imgs/redefinition.png)

アニメーションを再開します。以前よりもはるかにスムーズに動くことを確認できます。 

##  再記録による確認

新たに記録を取って、実際にアニメーションが以前よりも高速かつ高パフォーマンスになっていることを確認します。
 

![最適化後の Timeline 記録](imgs/after.png)

パフォーマンスが大幅に改善されています。


{# wf_devsite_translation #}
