project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools では、アプリケーション全体での複数の変数を簡単に確認できます。

{# wf_published_on:2016-02-11 #}
{# wf_updated_on:2016-02-11 #}

# [Sources] での変数の監視 {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Chrome DevTools では、アプリケーション全体での複数の変数を簡単に確認できます。[Sources] 内で変数を監視することにより、コンソールにアクセスすることなくコードの改善に集中できます。


[Sources] パネルでは、アプリケーション内の変数を監視できます。この機能は、デバッガー サイドバーの [Watch] セクションにあります。この機能を利用することにより、オブジェクトをコンソールに繰り返し出力する必要がなくなります。



![デバッガーの [Watch] セクション](imgs/sources-watch-variables-location.png)

##  変数の追加

変数をウォッチリストに追加するには、セクション見出しの右側にある追加アイコンを使用します。インライン入力が開き、監視する変数名を入力します。入力したら、<kbd>Enter</kbd> キーを押してリストに追加します。



![ウォッチリストへの追加ボタン](imgs/add-variable-to-watch.png)

監視機能により、追加された時点の変数の値が表示されます。変数が設定されていないか、見つからない場合は、その値に対して <samp>&lt;Not Available&gt;</samp> が表示されます。


![ウォッチリスト内の未定義変数](imgs/undefined-variable-in-watch.png)

##  変数のアップデート

アプリケーションが動作を続けるうちに、変数値が変わる可能性があります。ステップ実行を行わない限り、ウォッチリストは変数のライブビューではありません。[ブレークポイント](add-breakpoints)を使用してステップ実行すると、監視対象の値は自動的にアップデートされます。リスト内の変数を手動で再確認するには、セクション見出しの右側にある更新ボタンをクリックします。




![監視対象変数の更新ボタン](imgs/refresh-variables-being-watched.png)

更新をリクエストすると、現在のアプリケーション状態が再確認されます。どの監視対象アイテムも現在の値でアップデートされます。


![アップデートされた変数を監視中](imgs/updated-variable-being-watched.png)

##  変数の削除

作業スピードを上げるために監視対象を最小限に抑えるには、ウォッチリストから変数を削除することが必要になる場合があります。このためには、変数にカーソルを合わせて、右側に表示される削除アイコンをクリックします。


![ウォッチリストから削除する変数にカーソルを合わせる](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
