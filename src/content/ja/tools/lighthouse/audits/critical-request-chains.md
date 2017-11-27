project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「クリティカル リクエスト チェーン」のリファレンス ドキュメント。

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

#  クリティカル リクエスト チェーン {: .page-title }

##  監査が重要である理由 {: #why }

クリティカル リクエスト チェーンは、クリティカル レンダリング パス（CRP）の最適化技術のコンセプトの 1 つです。
CRP
を考慮してリソースに優先度を設定し、読み込む順序を指定すると、ブラウザでより早くページが読み込まれるようになります。


詳細は、[クリティカル レンダリング パス](/web/fundamentals/performance/critical-rendering-path/)のドキュメントをご覧ください。



##  監査に合格する方法 {: #how }

現在、この監査は「合格」や「不合格」を判定する形式にはなっていません。この監査で提供された情報は、アプリのページ読み込み時のパフォーマンスを向上させるために利用してください。



Lighthouse の Chrome 拡張機能版では、レポートに以下のような図が表示されます。


<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---制作者/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

この図は、ページのクリティカル リクエスト チェーンを示しています。`lighthouse/`
から `/css` へのパスが 1 つのチェーンです。`lighthouse/` から
`css/devsite-googler-buttons.css` へのパスは、別のチェーンになります。その下も同じです。このチェーンの数が、この監査項目の一番上に表示されるスコアになります。
たとえば、上の図の「スコア」は 7 になります。


この図には、リソースごとのダウンロード時間と要したバイト数の内訳も表示されます。


以下のように、この図を参考にして CRP を改善できます。

* クリティカルなリソースの数を最小にする: リソースを削除する、ダウンロードを遅延させる、非同期にするなどの対策をとる。
* クリティカル バイト数を最適化して、ダウンロード時間（ラウンドトリップ数）を短縮する。
* 残りのクリティカル リソースの読み込み順を最適化する:
クリティカルパス長を短縮して、すべてのクリティカル アセットができる限り早くダウンロードされるようにする。


上記の要素を最適化することで、ページの読み込み速度を上げることができます。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、ネットワークの優先度により、レンダリングをブロックするクリティカル リソースが識別されます。
Chrome
でのネットワーク優先度の定義については、[Chrome のリソース優先度とスケジューリング](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)をご覧ください。


クリティカル リクエスト チェーン上のデータ、リソースサイズ、リソースのダウンロード時間は、Chrome Debugger Protocol から抽出されます。



{# wf_devsite_translation #}
