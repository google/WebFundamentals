project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ray Input ライブラリを使用して、WebVR シーンに入力を追加する方法について説明します。

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# WebVR シーンに入力を追加する {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

警告:WebVR はまだ試験運用版であり、仕様変更の可能性があります。

[WebVR のスタートガイドのセクション](../getting-started-with-webvr/)では、WebGL シーンを使用して WebVR 機能を追加する方法について説明しました。動作している VR シーンを見ながら、シーン内のエンティティを操作できれば、楽しみはさらに増大します。

![WebVR シーン内の入力を示すビーム](./img/ray-input.jpg)

WebVR（一般的には 3D）は、さまざまな入力を受け付けることができます。理想的には、すべての入力に対応するだけでなく、ユーザーの状況変化に応じて入力を切り替える必要があります。

現在、次のような入力タイプが利用可能です。

<img class="attempt-right" src="../img/touch-input.png" alt="タップ入力アイコン">

* **マウス。**
* **タップ。**
* **加速度計とジャイロスコープ。**
* **自由度のないコントローラ**（Cardboard など）。ビューポートに完全に固定されたコントローラであり、通常、操作はビューポートの中心で開始されると想定されます。
* **3 自由度のコントローラ**（Daydream コントローラなど）。3 自由度のコントローラは向きの情報を提供しますが、位置の情報は提供しません。通常、ユーザーはこのようなコントローラを左手または右手に持つという想定のもと、3D 空間内のコントローラの位置が推定されます。
* **6 自由度のコントローラ**（Oculus Rift や Vive など）。6 自由度のコントローラは向きと位置の情報を提供します。通常、このようなコントローラは最高レベルの機能と精度を提供します。

今後、WebVR 機能の進化に伴い、新しい入力タイプが出てくる可能性があります。そのため、できるだけコードを将来にわたって使えるようにする必要があります。しかし、すべての入力配列を処理するコードを記述するのは複雑であり、実用的ではありません。Boris Smus が開発した [Ray Input](https://github.com/borismus/ray-input) ライブラリは既に活用されており、大半の入力タイプをサポートしているため、ここでは Ray Input の説明から始めます。

前に作成したシーンをベースにして、[Ray Input を使って入力ハンドラを追加します](https://googlechrome.github.io/samples/web-vr/basic-input/)。最終的なコードを確認するには、[Google Chrome のサンプル リポジトリ](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/)をチェックアウトしてください。

##  Ray Input ライブラリをページに追加する

簡素化するために、スクリプトタグで Ray Input を直接追加します。

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

Ray Input を大きなビルドシステムの一部として使用している場合は、上記の方法でインポートできます。詳細については、[Ray Input の README](https://github.com/borismus/ray-input/blob/master/README.md) をご覧ください。

##  入力にアクセスする

VR ディスプレイにアクセスしたあと、利用可能な入力へのアクセスをリクエストすることができます。その後、イベントリスナを追加して、シーンをデフォルトのボックスの状態 "deselected" に更新します。

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

Let’s take a look inside both the `_getInput` and `_addInputEventListeners` functions.

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

Ray Input を作成するには、シーンの Three.js カメラに加えて、マウス、タップ、およびその他の必要なイベントリスナをバインドできる要素を Ray Input に渡す必要があります。要素を第 2 パラメータとして渡さないと、デフォルトで `window` にバインドされ、ユーザー インターフェース（UI）のパーツが入力イベントを受け取れなくなる場合があります。

また、動作する領域のサイズを指定する必要があります。多くの場合、WebGL canvas 要素の領域を指定します。

##  シーンのエンティティを操作できるようにする

次に、何をトラックして、どのイベントを受け取るかを Ray Input に指示する必要があります。

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

As you interact with the scene, whether by mouse, touch, or other controllers, these events will fire. In the scene we can make our box’s opacity change based on whether the user is pointing at it.

    _onSelected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 1;
    }

    _onDeselected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 0.5;
    }

このコードを機能させるには、ボックスのマテリアルが透明度をサポートすることを Three.js に通知する必要があります。

    this._box.material.transparent = true;

これにより、マウスとタップの操作がサポートされます。次は、Daydream コントローラなどの 3 自由度のコントローラに追加した場合の処理を確認しましょう。

##  Gamepad API 拡張機能を有効にする

現在の WebVR で Gamepad API を使用する場合は、次の 2 つの重要なポイントを理解する必要があります。

* Chrome 56 では、`chrome://flags` で Gamepad 拡張機能フラグを有効にする必要があります。[オリジン トライアル](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)がある場合は、WebVR API とともに Gamepad 拡張機能は既に有効なっています。**ローカルで開発するには、フラグを有効にする必要があります**。

* **ユーザーが VR コントローラでボタンを押した場合にのみ**、Gamepad の姿勢情報（3 自由度のコントローラにアクセスする方法）が有効化されます。

ユーザーはシーンにポインタが表示される前に操作する必要があるため、コントローラ上のボタンを押すようにユーザーに求める必要があります。ボタンを押すように求める最適なタイミングは、ヘッドマウント ディスプレイ（HMD）への表示を開始した後です。

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

通常は HTML 要素を使用してこのような情報をユーザーに表示しますが、HMD は WebGL コンテキスト（のみ）を表示するため、メッセージをそのコンテキストに描画する必要があります。Three.js には、常にカメラの方を向いた[スプライト プリミティブ](https://threejs.org/docs/#Reference/Objects/Sprite)（通称「ビルボーディング」）がありり、そこに画像を描画することができます。

![ユーザーに表示する [Press Button] メッセージ](./img/press-a-button.jpg)

実行するコードは以下のようになります。

    _showPressButtonModal () {
      // Get the message texture, but disable mipmapping so it doesn't look blurry.
      const map = new THREE.TextureLoader().load('./images/press-button.jpg');
      map.generateMipmaps = false;
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;

      // Create the sprite and place it into the scene.
      const material = new THREE.SpriteMaterial({
        map, color: 0xFFFFFF
      });

      this._modal = new THREE.Sprite(material);
      this._modal.position.z = -4;
      this._modal.scale.x = 2;
      this._modal.scale.y = 2;
      this._scene.add(this._modal);

      // Finally set a flag so we can pick this up in the _render function.
      this._isShowingPressButtonModal = true;
    }

最後に、`_render` 関数で操作を監視し、この関数を使用してモーダルを非表示にします。また、HMD に対して `submitFrame()` を呼び出して canvas をフラッシュする場合と同じように、アップデートのタイミングを Ray Input に指示する必要があります。

    _render () {
      if (this._rayInput) {
        if (this._isShowingPressButtonModal &&
            this._rayInput.controller.wasGamepadPressed) {
          this._hidePressButtonModal();
        }

        this._rayInput.update();

      }
      …
    }

##  ポインタ メッシュをシーンに追加する

操作を可能にすることに加えて、ユーザーが指している場所を表示したい場合が多くあります。Ray Input では、シーンに追加してユーザーのポイント先を示すことができるメッシュが提供されています。

    this._scene.add(this._rayInput.getMesh());

このメッシュを使用すると、コントローラで動かすことのできない HMD（Cardboard など）に十字線を表示したり、自由に動かせる HMD にビームのような光線を表示したりできます。マウスとタッチの場合、十字線は表示されません。

![WebVR シーン内の入力を示すビーム](./img/ray-input.jpg)

##  まとめ

エクスペリエンスに入力を追加するときは、次のことに留意する必要があります。

* **プログレッシブ エンハンスメントの原則を順守する必要があります。**ユーザーは、リストにある任意の入力配列を使用して作成されたシーンを見る可能性があるため、入力タイプに適切に対応できる UI を用意する必要があります。対象範囲を拡大するために、さまざまなデバイスと入力に対してテストを実施するようにしてください。

* **入力が厳密に正確ではない場合があります。**特に Daydream コントローラは 3 自由度ですが、6 自由度をサポートする空間で動作します。つまり、向きは正確ですが、3D スペースでの位置は推定する必要があります。これを考慮して、入力対象を拡大し、適切なスペースを確保して混乱を回避します。

シーンに入力を追加することは、没入的なエクスペリエンスを構築するうえで不可欠であり、[Ray Input](https://github.com/borismus/ray-input) を使用すると作業がずっと簡単になります。

順調に進んでいるかお知らせください。



{# wf_devsite_translation #}
