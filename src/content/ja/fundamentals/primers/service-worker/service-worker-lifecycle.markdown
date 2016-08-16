---
layout: shared/narrow
title: "Service Worker のライフサイクル"
description: "Service Worker は Web ページとはまったく異なるライフサイクルで動作します。"
translators:
  - myakura
---

<p class="intro">Service Worker は Web ページとはまったく異なるライフサイクルで動作します。</p>

Service Worker を Web ページにインストールするには、ページの JavaScript から登録しなければいけません。Service Worker の登録をすると、ブラウザは Service Worker のインストール処理をバックグラウンドで実行します。

インストールは、静的なアセットをキャッシュするために使われることが多いでしょう。すべてのファイルがキャッシュされたら、Service Worker のインストールは完了です。もしファイルがひとつでもダウンロード失敗、もしくはキャッシュに失敗した場合、インストールステップは失敗し Service Worker はアクティベートされません（つまりインストールされません）。ただ、失敗しても心配しないでください。またトライしますから。どういうことかというと、Service Worker がインストールされたなら、静的なアセットが確実にキャッシュされているということなのです。

インストールが完了したら、アクティベーション処理が続きます。ここでは古いキャッシュの処理などに最適です。これは [Service Worker の更新](update-a-service-worker/)を説明する時に紹介しますね。

アクティベーションステップが終了したら、Service Worker はそのスコープ内のすべてのページをコントロールします。しかし、Service Worker を登録したページについては登録時点ではコントロールされず、次に読み込まれた際にコントロールされます。Service Worker が管理中、その状態は2つしかありません。メモリ節約のため Service Worker が終了されているか、ページで起こったネットワークリクエストまたはメッセージに対して `fetch` イベントもしくは `message` イベントの処理を行おうとしているかのどちらかです。

次の図は最初のインストール後の Service Worker のライフサイクルをおおまかに図示したものです。

![service worker lifecydle](images/sw-lifecycle.png)
