project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: クリティカル レンダリング パスの最適化は、現在のユーザー操作に関連するコンテンツ表示の優先順位付けを意味します。

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

#  クリティカル レンダリング パス {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


クリティカル レンダリング パスの最適化は、現在のユーザー操作に関連するコンテンツ表示の優先順位付けを意味します。

高速なウェブ エクスペリエンスを実現するためには、ブラウザで大量の処理を行う必要があります。この処理の大部分は、ウェブ デベロッパーからは見えません。ウェブ デベロッパーがマークアップを記述すると、美しいページが画面に表示されます。
では、ブラウザはどのようにして HTML、CSS、JavaScript を取り込み、画面上にピクセルをレンダリングしているのでしょうか。


パフォーマンスの最適化とは、HTML、CSS、JavaScript のバイトの受信から、これらをピクセルとしてレンダリングするために必要な処理までの中間段階で行われている内容を理解することです。これが**クリティカル レンダリング パス**です。




<img src="images/progressive-rendering.png"  alt="プログレッシブ ページ レンダリング">

クリティカル レンダリング パスを最適化することで、ページが初めてレンダリングされるまでの時間を大幅に改善できます。
さらに、クリティカル レンダリング パスについて理解することは、高性能でインタラクティブなアプリケーションを構築するための基盤にもなります。
インタラクティブな更新プロセスも同様に、連続的なループの中で処理を行います。1 秒あたりのフレーム数は 60 fps が理想的です。まずは、ブラウザでシンプルなページを表示する方法の概要を説明します。

<a href="constructing-the-object-model" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Constructing the Object Model">
  <button>次のトピック: オブジェクト モデルの構築</button>
</a>

{% include "web/_shared/udacity/ud884.html" %}


{# wf_devsite_translation #}
