project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Three.js の WebGL シーンを使用して WebVR 機能を追加する方法を学びます。

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR のスタートガイド {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

警告:WebVR はまだ試験運用版であり、仕様変更の可能性があります。

このガイドでは WebVR API について詳しく説明するとともに、このAPI を使用して、[Three.js](https://threejs.org/) で作成されたシンプルな WebGL シーンを改良します。制作作業においては、[WebVR ボイラプレート](https://github.com/borismus/webvr-boilerplate)のような既存のソリューションをベースにしてもよいでしょう。Three.js を初めて使用する方は、こちらの[便利なスタートガイド](https://aerotwist.com/tutorials/getting-started-with-three-js/)をご覧ください。このコミュニティではサポート体制が整っているため、お困りのことがありましたら、ぜひご相談ください。

では、最初に[ワイヤーフレーム空間にボックスがあるシーン](https://googlechrome.github.io/samples/web-vr/hello-world/) から見ていきましょう。このコードは [Google Chrome のサンプル リポジトリ](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world) で入手できます。

![Chrome Desktop で実行される WebGL シーン](./img/desktop.jpg)

###  サポートに関する注記

WebVR はランタイムフラグ制の Chrome 56 以降で利用できます。フラグを有効にする（`chrome://flags` で「WebVR」を検索）ことによって、作成した VR をローカルでビルドしてテストできます。訪問者が WebVR を利用できるようにするには、[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md) にオプトインして、オリジンに対して WebVR を有効にします。

[Web VR polyfill](https://github.com/googlevr/webvr-polyfill) を使用することも可能ですが、使用した場合はパフォーマンスが著しく低下することに注意してください。対象デバイスでのテストを必ず実施して、端末のリフレッシュ レートに追いつかないものをリリースしないようにしてください。フレームレートが低い、または不安定であると、ユーザー エクスペリエンスが大きく損なわれる可能性があります。

詳細については、[WebVR のステータス](../status/)のページをご覧ください。

##  VR ディスプレイにアクセスする

WebVR を使用して WebGL シーンを機能させるためには、どのような作業が必要でしょうか。まずは、navigator.getVRDisplays() を使用して、利用可能な VR ディスプレイがあるか確認するようブラウザに問い合わせる必要があります。

    navigator.getVRDisplays().then(displays => {
      // Filter down to devices that can present.
      displays = displays.filter(display => display.capabilities.canPresent);

      // If there are no devices available, quit out.
      if (displays.length === 0) {
        console.warn('No devices available able to present.');
        return;
      }

      // Store the first display we find. A more production-ready version should
      // allow the user to choose from their available displays.
      this._vr.display = displays[0];
      this._vr.display.depthNear = DemoVR.CAMERA_SETTINGS.near;
      this._vr.display.depthFar = DemoVR.CAMERA_SETTINGS.far;
    });

このコードには注目すべきポイントがいくつかあります。

1. **すべてのデバイスがヘッドマウント ディスプレイに使用できるわけではありません。** たとえば加速度計の用途や疑似 VR 体験に対応していても、HMD は使用しないデバイスがあります。そのような端末の canPresent ブール値は false になる点に注意してください。

2. **利用可能な VR デバイスがない可能性もあります。** 非 VR 設定で適切に動作するエクスペリエンスの構築を目標にした上で、VR についてはプログレッシブ エンハンスメントとして取り扱う必要があります。

3. **利用可能な VR デバイスが複数存在する可能性があります。**複数の VR デバイスが利用できる可能性も十分あるため、できるだけそれらの中から最適なデバイスを選択できるようにする必要があります。

##  WebVR をエミュレーションする Chrome DevTools 拡張機能をインストールする

テストを実行したくても、VR に対応したデバイスを持っていないこともあるかもしれません。そのような場合は、Jaume Elias が開発した [VR デバイスをエミュレーションする Chrome DevTools 拡張機能](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil)をご利用ください。

![Jaume Elias の Chrome 拡張機能で WebVR をエミュレーションする](./img/webvr-emulation.jpg)

常に実機でテストできるに越したことはありませんが（特にパフォーマンスのテストに関しては）、開発中に素早くデバッグをするにはこの拡張機能が役立ちます。

##  デバイスから表示をリクエストする

「VR モード」での表示を開始するには、デバイスからリクエストをする必要があります。

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent` には、[Web VR 仕様](https://w3c.github.io/webvr/#vrlayer) で 「VRLayers」と呼ばれる配列を指定します。この配列は、実質的には VR デバイスに渡す Canvas 要素のラッパーです。上記のコードスニペットでは、Three.jp から提供された Canvas 要素（`WebGLRenderer.domElement`）を取得して、単一の VRLayer のソースプロパティとして渡しています。戻り値として `requestPresent` から [Promise](/web/fundamentals/getting-started/primers/promises) が返され、リクエストに成功すれば解決し、そうでなければ拒否されます。

##  VR シーンを描く

ついに、ユーザーに VR シーンを表示します。ワクワクしますね。

![Pixel で実行中の WebVR シーン](../img/getting-started-with-webvr.jpg)

まず、必要な処理を確認しましょう。

* デバイスの `requestAnimationFrame` コールバックを確実に使用します。
* VR デバイスに、現在のポーズ、方向、目の情報をリクエストします。
* WebGL コンテキストを右目用と左目用に二分割して、それぞれを描画します。

ウィンドウ オブジェクトと一緒に提供されたものとは別の `requestAnimationFrame` を使用する必要があるのはなぜでしょうか？理由は、使用するディスプレイのリフレッシュ レートが、ホストマシーンのレートとは異なる可能性があるためです。ホストマシーンで 60 Hz で画面を更新していても、ヘッドセットのリフレッシュ レートが 120 Hz の場合は、それに合わせて 120 Hz でフレームを生成する必要があります。これに対応するため、WebVR API では別の `requestAnimationFrame` API を呼び出せるようにしています。モバイル端末の場合、一般的にはディスプレイが 1 つしかありませんが（さらに現在の Android のリフレッシュ レートは 60Hz）、それでも適切な API を使用して、できるだけ将来的にも有効で広い互換性のあるコードを作成する必要があります。

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

続いて `getFrameData()` を使用して、ユーザーの頭の位置、回転状況、さらに正確に描画するために必要なその他の情報すべてをリクエストする必要があります。

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()` には、必要な情報を格納するためのオブジェクトを指定します。このオブジェクトは、`new VRFrameData()` で作成した `VRFrameData` オブジェクトである必要があります。

    this._vr.frameData = new VRFrameData();

このフレームデータには興味深い情報がたくさんあるので、少し見てみましょう。

* **timestamp**。デバイスの更新のタイムスタンプ。これは、VR ディスプレイで getFrameData が初めて呼び出されたときを 0 としてカウントされた値です。

* **leftProjectionMatrix** と **rightProjectionMatrix**。シーンにおけるカメラの視野を表すマトリックスです。これについては、少し後で詳しく説明します。

* **leftViewMatrix** と **rightViewMatrix**これらは、シーンにおけるそれぞれの目の位置を示す行列です。

3D に馴染みのない方にとって、射影行列やモデルビュー行列はとっつきにくいかもしれません。これらの処理には多少数学的な要素が含まれていますが、その技術的な仕組みや処理内容を正確に知る必要はありません。

* **射影行列。** シーン内で、遠近法のような効果を生み出すために使用されます。一般的には、目からの距離が遠くなるにつれて、シーン内のオブジェクトのスケールをゆがめることによって、この効果を実現します。

* **モデルビュー行列。** 3D 空間にオブジェクトを配置するために使用されます。行列の仕組み上、対象となるオブジェクトの最終的なモデルビュー行列を取得するには、シーングラフを作成して、そのグラフを上から走査し、各ノード行列を乗算します。

ウェブ上には、射影行列やモデルビュー行列ついて詳しく学べる優れたガイドがたくさんあります。背景情報を詳しく知りたい方は、インターネットで検索してください。

##  シーンのレンダリングを制御する

必要な行列がそろったので、左目用のビューを描画しましょう。まず、レンダラを呼び出すたびに WebGL コンテキストをクリアしないよう Three.js に伝える必要があります。これは、左右で 2 回描写する必要がありますが、右目用に描画しているときに左目用のイメージが消えないようにするためです。

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

続いて、左半分のみを描画するようにレンダラを設定します。

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

このコードは GL コンテキストがフルスクリーンであることを想定しています（`window.inner*`）。VR では、ほとんどの場合がフルスクリーンです。これで、左目用の 2 つの行列を取り込むことができます。

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

実装の詳細について、大事なことが 2 点あります。

* **動かすのは世界であって、カメラではありません。**初めての方には奇妙に聞こえるかもしれませんが、カメラは原点（0, 0, 0）に固定して世界を動かすというのは、グラフィック作業においてはよくあることです。哲学的に考える必要はありませんが、10 m 前に進むというのは、私が 10 m 前方へ進んだのか、それとも世界が 10 m 後方へ移動したのでしょうか？これは視点の問題であり、数学的な観点ではどちらを行っても変わりはありません。WebVR API では「目のモデル行列の*逆行列*」が返されるため、これをカメラ自体ではなく、世界（コード上では `this._scene`）に対して適用する必要があります。

* **行列の値を変更した後は、手動で更新する必要があります。**Three.js では値を頻繁にキャッシュします（パフォーマンスにおいては素晴らしいことです）。そのため、変更された内容を表示するには、変更があったことを伝える*必要があります*。そのためには `updateMatrixWorld()` メソッドを使用し、引数にブール値を指定して、計算内容がシーングラフまで確実に反映されるようにします。

あともう少しです。最終ステップでは、右目用に同じプロセスを繰り返します。ここでは、左目用のビューを描画したあとにレンダラの深度の計算をクリアして、右目のビューのレンダリングに影響を及ぼさないようにします。その後、右側に合わせてビューポートを更新して、シーンを再描画します。

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

これで、右目用の 2 つの行列を取り込むことができます。

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

これで完成かと思いきや、実はまだでした。

##  デバイスに更新するよう伝える

この状態で実行しても、ディスプレイは更新されないはずです。これは、WebGL コンテキストに対して多くのレンダリングを実施できるものの、HMD 側では実際にディスプレイを更新するタイミングがわからないためです。たとえば、片目のイメージがそれぞれレンダリングされた後で更新しても、効果的とはいえません。そこで、submitFrame を呼び出して描画処理をコントロールします。

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

このコードをもって、今度こそ*本当に*完成です。最終版が必要な場合は、[Google Chrome のサンプル リポジトリ](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)からチェックアウトできます。

##  まとめと参考資料

WebVR は、臨場感あふれるコンテンツを作成するための優れた方法です。Three.js などのライブラリを使用すれば、WebGL での作業もずっと簡単になります。ただし、以下の重要な点に留意してください。

* **初期段階から、プログレッシブ エンハンスメントの概念に基づいて開発します。**このガイドでも何度か言及しましたが、基盤となるエクスペリエンスを構築した上で、WebVR を追加でサポートすることが重要です。多くのエクスペリエンスはマウスやタップの制御で実装可能です。それをベースに、加速度計の制御、さらには本格的な VR エクスペリエンスへとアップグレードしていきます。より多くのユーザーを対象にすることは、いかなる場合でもメリットがあります。

* **シーンを 2 回レンダリングすることを忘れないでください。**シーンを 2 回レンダリングする際に、CPU や GPU の演算処理の負荷を確実に下げるために、詳細レベル（LOD）やその他テクニックについて検討する必要があります。そして、なによりも安定したフレームレートを維持する必要があります。乗り物酔いのような極度の不快感を与えてしまっては、どんなに魅力的な VR 体験も台無しです。

* **実機でテストを実施します。**これは前述のポイントに関連します。特にモバイル端末を対象にしている場合は、実機を用意して、実際の環境で開発段階のアプリを動かしてみる必要があります。[「ノートパソコンで確認したときと全然違う」](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405)という声はよく聞かれます。

WebVR コンテンツの作成に関しては、開発を始める際に役立つリソースがたくさんあります。

* **[VRView](https://github.com/googlevr/vrview)**: このライブラリは、360 度パノラマの写真や動画を埋め込むのに役立ちます。

* **[WebVR ボイラープレート](https://github.com/borismus/webvr-boilerplate)**: WebVR と Three.js を簡単に使い始めることができます。

* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)**: WebVR API の代用として必要です。[Web VR polyfill] を使用するとパフォーマンスが低下することに注意してください。これにより機能性は提供されますが、ユーザーにとっては非 VR エクスペリエンスの方が好ましい可能性もあります。

* **[Ray-Input](https://github.com/borismus/ray-input)**: マウス、タップ、VR ゲームパッド コントローラーなど、VR および 非 VR デバイスの様々な入力タイプに対応するためのライブラリです。

さあ、魅力的な VR を開発しましょう。


{# wf_devsite_translation #}
