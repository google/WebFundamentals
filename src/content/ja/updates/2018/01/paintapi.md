project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSSペイントAPI {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Chromeの新しい可能性65 CSS Paint API（「CSSカスタムペイント」または「Houdiniのペイントワークレット」とも呼ばれます）は、Chrome Stableではデフォルトで有効になります。それは何ですか？あなたはそれで何ができますか？そしてそれはどのように機能するのですか？まあ、読んで、あとで...


CSSペイントAPIを使用すると、CSSプロパティでイメージが必要なときにプログラムでイメージを生成できます。 `background-image` や`border-image` のようなプロパティは通常、画像ファイルをロードするために`url()` と共に使用されるか、`linear-gradient()` のようなCSS組み込み関数とともに使用されます。これらを使用する代わりに、`paint(myPainter)` を使用して_paintワークレットを参照できるようになりました。

### ペイントワークレットを書く

`myPainter` というペイントワークレットを定義するには、`CSS.paintWorklet.addModule('my-paint-worklet.js')` を使用してCSSペイントワークレットファイルをロードする必要があります。このファイルでは、`registerPaint` 関数を使用してペイントワークレットクラスを登録できます。

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

`paint()` コールバックの内部では、`ctx` を`CanvasRenderingContext2D` と同じように使用できます。 `<canvas>` を描画する方法がわかっている場合は、ペイントワークレットを描画できます。 `<canvas>` は、私たちが自由に使えるキャンバスの幅と高さを教えてくれます。 `geometry` 私はこの記事の後半で説明します。

Note: ペイントワークレットのコンテキストは、`<canvas>` コンテキストと100％同じではありません。現時点では、テキストのレンダリング方法が欠落しています。セキュリティ上の理由から、キャンバスからピクセルを読み取ることはできません。

導入例として、チェッカーボードペイントワークレットを作成し、それを`<textarea>` の背景イメージとして使用しましょう。 （デフォルトではサイズ変更が可能なため、テキストエリアを使用しています）:

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

過去に`<canvas>` を使用したことがある場合、このコードはよく知られています。ここのライブ[デモ](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/)をご覧ください。

Note: ほぼすべての新しいAPIと同様に、CSSペイントAPIはHTTPS（または`localhost` ）でのみ使用できます。

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="背景画像としてチェッカーボードパターンのTextarea。">

ここで一般的な背景画像を使用するのと異なるのは、ユーザーがテキストエリアのサイズを変更するたびに、パターンが必要に応じて再描画されることです。これは、高密度ディスプレイのための補償を含む、バックグラウンドイメージが常に必要な大きさであることを意味します。

それはかなり涼しいですが、それはまた非常に静的です。私たちが同じパターンを望んでいるのに毎回新しいワークレットを書こうと思っていますか？答えはノーだ！

### ワークレットのパラメータ化

幸いなことに、ペイントワークレットは追加のパラメータ`properties` が作用する他のCSSプロパティにアクセスできます。クラスに静的な`inputProperties` 属性を与えることで、カスタムプロパティを含むCSSプロパティの変更をサブスクライブすることができます。値は、`properties` パラメーターを介してユーザーに与えられます。

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

今では、すべての異なる種類のチェッカーボードに同じコードを使用できます。しかし、さらにうまくいくと、正しい外観が見つかるまでDevToolsと[値を使って](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/)に行くことができます。

<div style="display: flex; justify-content: center">  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: 色をパラメータ化するのもいいですね。この仕様では、`paint()` 関数が引数のリストを取ることができます。この機能はChromeでまだ実装されていません.Houdiniのプロパティと値APIに大きく依存しているため、出荷する前にまだいくつかの作業が必要です。

## ペイントワークレットをサポートしていないブラウザ執筆時点では、クロムだけがペイントワークレットを実装しています。他のすべてのブラウザベンダーからの肯定的なシグナルがありますが、それほど進歩はありません。最新の状態に保つには、[Houdini Ready Yet？](https://ishoudinireadyyet.com)を定期的にチェックしてください。その間は、ペイントワークレットのサポートがなくてもコードを実行し続けるためにプログレッシブエンハンスメントを使用してください。正常に動作することを確認するには、CSSとJSの2つの場所でコードを調整する必要があります。

JSのペイントワークレットのサポートを検出するには、`CSS` オブジェクトをチェックします。

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

CSS側には2つのオプションがあります。 `@supports` を使用することができます:

    @supports (background: paint(id)) {
      /* ... */
    }

よりコンパクトなトリックは、CSSが不明な機能がある場合は、プロパティ宣言全体を無効にし、後でそれを無視するという事実を使用することです。プロパティを二度指定した場合（最初にペイントワークレットなし、次にペイントワークレット）、プログレッシブエンハンスメントが得られます。

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

ペイントワークレットをサポートしているブラウザーでは、`background-image` の2番目の宣言が最初のものを上書きします。ペイントワークレットをサポートしていないブラウザでは、2番目の宣言は無効であり、最初の宣言が有効なままで破棄されます。

### CSSペイントポリフィル

多くの用途で、CSSカスタムペイントとペイントワークレットのサポートを最新のブラウザに追加する[CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill)を使用することもできます。

## ユースケースペイントワークレットには多くのユースケースがあり、その中のいくつかは他よりも明白です。より明白なものの1つは、ペイントワークレットを使用してDOMのサイズを減らすことです。多くの場合、エレメントは純粋に追加され、CSSを使用して装飾を作成します。例えば[Material Design Lite](https://getmdl.io)では、リップルエフェクトのあるボタンには、リップル自体を実装するための2つの追加の`<span>` 要素が含まれています。たくさんのボタンがあると、DOM要素が非常に多くなり、モバイルでのパフォーマンスが低下する可能性があります。代わりに[塗料ワークレットを使用して波紋効果を実装する](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/)を使用すると、0個の追加要素と1つの塗装ワークレットで終わります。さらに、カスタマイズやパラメータ化がはるかに簡単なものがあります。

ほとんどの場合、ペイントワークレットを使用するソリューションのもう1つの利点は、ペイントワークレットを使用するソリューションがバイト単位では小さいことです。もちろん、トレードオフがあります:キャンバスのサイズやパラメータのいずれかが変更されると、ペイントコードが実行されます。したがって、コードが複雑で時間がかかる場合は、ジャンクを導入する可能性があります。 Chromeはペイントワークレットをメインスレッドから動かすように働いているため、長時間実行しているペイントワークレットであってもメインスレッドの応答性には影響しません。

私にとって、最も興味深いのは、ペイントワークレットが、ブラウザがまだ持っていないCSS機能を効率的にポリフィルすることができるということです。 1つの例は、ポリフィル[円錐勾配](https://lab.iamvdo.me/houdini/conic-gradient)で、ネイティブにクロムに着陸するまでです。もう1つの例:CSSミーティングでは、複数の境界線の色を設定できるようになりました。この会議はまだ進行中ですが、私の同僚のIan Kilpatrickは、ペイントワークレットを使ってこの新しいCSSの動作についてpolyfill（1）を書いています。

## "ボックスの外で考える"ほとんどの人は、ペイントワークレットについて学ぶとき、背景イメージと境界イメージについて考えるようになります。ペイントワークレットの直感的ではない使い方の1つは、DOM要素を任意の形にするための`mask-image` です。たとえば、[ダイヤモンド](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="ダイヤモンドの形をしたDOM要素。">

`mask-image` は、要素のサイズであるイメージを取ります。マスク画像が透明である領域は、透明である。マスク画像が不透明な領域、要素は不透明です。

## 今Chromeで

ペイントワークレットはしばらくChrome Canaryに入っています。 Chrome 65では、デフォルトで有効になっています。先に進んで、ペイントワークレットが開き、あなたが作ったものを私たちに見せてくれる新しい可能性を試してみてください！もっとインスピレーションを得るには、[Vincent De Oliveiraのコレクション](https://lab.iamvdo.me/houdini/)をご覧ください。

Note: CSS Paint APIではブレークポイントは現在サポートされていませんが、Chromeの後のリリースでは有効になります。

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}