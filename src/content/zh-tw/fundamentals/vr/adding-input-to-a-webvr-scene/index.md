project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:探索如何使用 Ray Input 內容庫向 WebVR 場景添加輸入。

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# 向 WebVR 場景添加輸入 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

警告：WebVR 仍處於實驗階段，並且隨時可能更改。

在 [WebVR 使用入門部分](../getting-started-with-webvr/)中，我們介紹瞭如何選取 WebGL 場景並向其添加 WebVR 功能。執行上述操作後，您可以環顧 VR 中的場景，如果您能夠與場景中的實體進行交互，將體驗到非常多的樂趣。

![WebVR 場景中顯示輸入的射線束](./img/ray-input.jpg)

對於 WebVR（以及常見的 3D），其輸入類型多種多樣，理想情況下，我們不僅要考慮所有輸入類型，還需要能夠根據用戶上下文的變化在各種輸入間進行切換。

目前可用的輸入類型一覽：

<img class="attempt-right" src="../img/touch-input.png" alt="觸摸輸入圖標">

* **鼠標。**
* **觸摸。**
* **加速度計和陀螺儀。**
* **沒有自由度的控制器**（如 Cardboard）。這些控制器與視口完全關聯，一般情況下，假定交互是在視口的中心發起的。
* **具有 3 種自由度的控制器**（如 Daydream 控制器）。具有 3 種自由度的控制器提供的是屏幕方向信息，而不是位置信息。通常，假定這些控制器握在用戶的左手或右手上，並預估它們在 3D 空間中的位置。
* **具有 6 個自由度的控制器**（如 Oculus Rift 或 Vive）。任何具有 6 個自由度的控制器都將提供屏幕方向和位置信息。這些通常位於功能範圍的上端，並且具有最佳的準確度。

將來，隨着 WebVR 變得成熟，我們甚至會看到新的輸入類型，這意味着我們的代碼必須儘可能適應將來的需求。不過，通過編寫代碼來處理所有輸入排列方式會使代碼變得複雜和笨重。Boris Smus 創建的 [Ray Input](https://github.com/borismus/ray-input) 內容庫提供了一個良好的開端，支持目前可用的大多數輸入類型，因此，我們從 Ray Inpu 開始介紹。

從之前的場景開始，我們[通過 Ray Input 添加輸入處理程序](https://googlechrome.github.io/samples/web-vr/basic-input/)。如果您要查看最終代碼，您應查看 [Google Chrome 示例存儲區](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/)。

## 將 Ray Input 內容庫添加到頁面

爲簡單起見，我們可以使用一個腳本標記直接添加 Ray Input：

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

如果您目前使用 Ray Input 作爲大型構建系統的一部分，您也可以通過該方式導入它。[Ray Input README 提供了更多信息](https://github.com/borismus/ray-input/blob/master/README.md)，您應該查閱一下。

## 獲取輸入權限

在獲取任意 VR 顯示器訪問權限後，我們可以請求訪問可用的任意輸入設備的權限。從此處，我們可以添加事件偵聽器，並且更新場景以將複選框的狀態默認設置爲“deselected”。

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

讓我們看一下 `_getInput` 和 `_addInputEventListeners` 函數內的情況。

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

創建一個 Ray Input 包括從場景向其傳遞 Three.js 攝像頭，以及一個可以與鼠標、觸摸以及 Ray Input 需要的任何其他事件偵聽器進行綁定的元素。如果您不傳遞一個元素作爲第二個參數，Ray Input 將默認綁定到 `window`，這可能會阻止您的部分界面 (UI) 接收輸入事件！

您需要做的其他工作是告訴 Ray Input 它需要處理的區域有多大，在大多數情況下該區域是 WebGL 畫布元素的區域。

## 實現場景實體的交互性

接下來，我們需要指示 Ray Input 跟蹤哪些內容，以及我們想要接收哪些事件。

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

在與場景交互時（無論通過鼠標、觸摸或其他控制器），這些事件都將觸發。我們可以根據用戶是否指向盒子來讓盒子的不透明度發生變化。

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

要使該操作有效，我們需要確保告訴 Three.js 此盒子的材料應支持透明性。

    this._box.material.transparent = true;

現在，交互應包含鼠標交互和觸摸交互。我們看一下添加一個具有 3 個自由度的控制器（如 Daydream 控制器）需要做些什麼。

## 啓用 Gamepad API 擴展程序

瞭解目前如何在 WebVR 中使用 Gamepad API 需要注意兩個重要事項：

* 在 Chrome 56 中，您需要啓用 `chrome://flags` 中的 Gamepad Extensions 標誌。如果您使用的是[來源試用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)，則 Gamepad Extensions 已經與 WebVR API　一起啓用。**對於本地開發，您需要啓用此標記**。

* 遊戲手柄的姿勢信息（即如何使用這 3 個自由度的信息）**僅在用戶按下 VR 控制器上的按鈕時才啓用**。

由於用戶必須先交互然後我們才能在場景中向他們顯示指針，因此，我們需要要求用戶在其控制器上按一個按鈕。最好是在我們開始向頭戴式顯示器 (HMD) 顯示內容後按按鈕。

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

通常，您可能期望使用 HTML 元素向用戶顯示這些信息，但 HMD 正在顯示 WebGL 上下文（且沒有任何其他內容），因此，我們必須在此處繪製消息。Three.js 具有一個 [Sprite 原語](https://threejs.org/docs/#Reference/Objects/Sprite)，其始終面向攝像頭（通常稱爲“佈告板”），我們可以在上面繪製圖像。

![向用戶顯示一條“Press Button”消息](./img/press-a-button.jpg)

執行此操作的代碼類似如下。

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

最後，在 `_render` 函數中，我們可以觀察交互情況，並使用該函數隱藏模態。我們還需要指示 Ray Input 在何時更新，這與我們根據 HMD 調用 `submitFrame()` 以向其刷入畫布的方法相似。

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

## 向場景添加指針網格

在允許交互的同時，我們很可能需要向用戶顯示一些內容，以表明用戶的指針正在指向哪裏。Ray Input 提供了一個網格，您可以將其添加到您的場景中以實現此目的。

    this._scene.add(this._rayInput.getMesh());

藉此，對於在控制器中沒有移動自由的 HMD（例如 Cardboard），我們會獲取一個標線，而對於可以自由移動的 HMD，則獲取一個像光束一樣的射線。對於鼠標和觸摸，不會顯示標線。

![WebVR 場景中顯示輸入的射線束](./img/ray-input.jpg)

## 結論

在向您的體驗添加輸入時需要注意以下事項。

* **您應採用漸進式增強。** 由於用戶可能會使用您使用列表中的任意特定輸入排列方式構建的內容，因此，您應設法規劃您的 UI，以便它可以正確適應每個輸入類型。在可能的情況下，測試一系列的設備和輸入以使適用範圍最大化。

* **輸入可能不是完全準確。** 特別是 Daydream 控制器，它具有 3 個自由度，但是在一個具有 6 個自由度的空間中運行。這意味着儘管其屏幕方向正確，但必須假設其在 3D 空間中的位置。考慮到這一點，您可能希望將輸入目標設置的更大，並確保正確分隔以避免混淆。

向您的空間添加輸入對於營造沉浸式體驗非常重要，使用 [Ray Input](https://github.com/borismus/ray-input) 可以簡化這一過程。

請通知我們您的進展！



{# wf_devsite_translation #}
