project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:瞭解如何在 Three.js 中選取 WebGL 場景並添加 WebVR 功能。

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR 入門指南 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

Warning: WebVR 仍處於實驗階段，並且隨時可能更改。

在本指南中，我們將探討 WebVR API，並利用它們增強一個使用 [Three.js](https://threejs.org/) 構建的簡單 WebGL 場景。不過，在執行過程中，您可能需要從現有的解決方案（如 [WebVR 樣板文件](https://github.com/borismus/webvr-boilerplate)）着手。如果您是初次使用 Three.js，那麼，您可以使用這個[便捷的入門指南](https://aerotwist.com/tutorials/getting-started-with-three-js/)。這是一個非常樂於提供支持的社區，因此，如果您遇到問題，可以向他們尋求幫助。

首先看一個[將一個盒子放入一個立體空間的場景](https://googlechrome.github.io/samples/web-vr/hello-world/)，其代碼可在 [Google Chrome 示例存儲區](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)找到。

![在 Chrome 桌面上運行的 WebGL 場景](./img/desktop.jpg)

### 有關支持的一個小提示

WebVR 可以在 Chrome 56+ 中使用（通過啓用一個運行時標誌）。啓用此標誌（請訪問 `chrome://flags` 並搜索“WebVR”）將允許您在本地構建和測試您的 VR 作品。如果您要爲訪問者提供 WebVR 支持，您可以選擇加入[來源試用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)，其允許您爲您的源啓用 WebVR。

您還可以使用 [Web VR polyfill](https://github.com/googlevr/webvr-polyfill)，但請注意，使用 polyfill 會性能大受影響。您一定要在目標設備上進行測試，並避免發佈無法跟上設備的更新頻率的任何內容。幀率不佳或總是發生變化會導致使用您的體驗的用戶感覺非常不舒適！

如需瞭解詳細信息，請查看 [WebVR 狀態](../status/)頁面。

## 獲取 VR 顯示器

在有了一個 WebGL 場景後，爲了使其通過 WebVR 運行我們需要做些什麼？首先，我們需要查詢瀏覽器以發現是否有任何可用的 VR 顯示器，我們可以通過 navigator.getVRDisplays() 執行此操作。

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

以下是此代碼中的幾點注意事項。

1. **並非每個設備都可以將內容“顯示”到一個頭戴式顯示器。** 例如，有些設備允許使用加速度計或僞 VR 體驗，但是不能使用 HMD。對於 canPresent 布爾值將變成 false 的設備，需要注意這一點。

2. **可能沒有可用的 VR 設備。** 我們的目標應該是打造適用於非 VR 設置的體驗，並將 VR 的可用性視爲漸進式增強。

3. **可能有多個可用的 VR 設備。**同樣，某人完全可能有多個可用的 VR 設備，如果可以的話，我們應允許這種情況，從而讓用戶可以選擇最適合的設備。

## 安裝 WebVR Emulation Chrome DevTools 擴展程序

您可能發現自己沒有 VR 設備進行測試。如果出現此情況，可隨時尋求幫助！Jaume Elias 創建了一個 [Chrome DevTools 擴展程序，其可模擬一臺 VR 設備](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil)。

![使用 Jaume Elias 的 Chrome 擴展程序模擬 WebVR](./img/webvr-emulation.jpg)

雖然最好是在真實設備上進行測試（特別是性能測試！），但提供此擴展程序有助於您在開發期間快速進行調試。

## 從設備請求顯示

要開始在“VR 模式”下進行顯示，我們必須從設備進行請求：

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent` 接受一個 [Web VR 規範](https://w3c.github.io/webvr/#vrlayer)稱之爲“VRLayers”的數組，其本質上是針對 VR 設備的 Canvas 元素的包裝器。在上面的代碼段中，我們將選取 Canvas 元素 — `WebGLRenderer.domElement`（由 Three.js 提供），並將其作爲一個 VRLayer 的源屬性進行傳遞。反過來，`requestPresent` 將爲您提供一個 [Promise](/web/fundamentals/getting-started/primers/promises)，其在請求成功時進行解析，否則將被拒絕。

## 繪製 VR 場景

最後，我們準備向用戶顯示一個 VR 場景，這真令人興奮！

![Pixel 上運行的 WebVR 場景](../img/getting-started-with-webvr.jpg)

首先，介紹一下我們需要做的工作。

* 確保使用設備的 `requestAnimationFrame` 回調。
* 從 VR 設備請求當前的姿勢、屏幕方向和眼睛信息。
* 將 WebGL 上下文分成兩半，每一半對應一隻眼睛，並單獨繪製。

爲什麼我們使用的 `requestAnimationFrame` 需要與 window 對象提供的不同？原因是我們所使用的顯示器的刷新頻率可能與主機不同！如果耳機的刷新頻率爲 120Hz，那麼，我們需要根據該頻率生成幀，即使主機以 60Hz 的頻率刷新屏幕。WebVR API 考慮到了這一點，因此，爲我們提供了一個不同的 `requestAnimationFrame` API 進行調用。如果使用的是移動設備，那麼通常只有一個顯示器（Android 目前的刷新頻率爲 60Hz），但即使如此，我們也應使用正確的 API 以使我們的代碼能適應未來需求，並儘可能提供更廣泛的兼容性。

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

接下來，我們需要請求與用戶的頭部位置、方向有關的信息，以及正確進行繪製所需的任何其他信息（我們可以使用 `getFrameData()` 進行請求）。

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()` 將選取一個對象，它將我們需要的信息放置在該對象上。這必須是一個 `VRFrameData` 對象，我們可以通過 `new VRFrameData()` 創建它。

    this._vr.frameData = new VRFrameData();

幀數據中有許多有趣的信息，我們快速地看一下。

* **timestamp**。來自設備的更新時間戳。在 VR 顯示器上首次調用 getFrameData 時，此值爲 0。

* **leftProjectionMatrix** 和 **rightProjectionMatrix**。這些矩陣適用於考慮場景中眼睛角度的攝像頭。稍後我們將進行詳細介紹。

* **leftViewMatrix** 和 **rightViewMatrix**。這些指的是兩個以上的矩陣，其提供場景中每隻眼睛的位置。

如果您剛剛接觸 3D 作品投影矩陣和 Model-View 矩陣，您可能會感到很難。儘管這些矩陣背後含有一些數學知識，但理論上，我們不需要確切瞭解其工作原理，以及它們還能做些什麼。

* **投影矩陣。** 這些矩陣用於創建場景中角度的展示。其做法通常是在場景中的物體進一步遠離視線時將物體的比例進行扭曲變形。

* **Model-View 矩陣。** 這些矩陣用於確定 3D 空間中物體的位置。矩陣的工作原理讓您可以創建場景圖表，並根據需要處理此圖表，將每個節點的矩陣相乘，從而達到討論中的物體的最終 model-view 矩陣。

網上有很多深入探討投影矩陣和 Model-View 矩陣的相關優秀指南，如果您要獲取更多背景信息，可以在 Google 上搜索這些指南。

## 控制場景渲染

有了需要的矩陣，我們可以繪製呈現給左眼的視圖。首先，我們需要指示 Three.js 在我們每次調用渲染時不要清除 WebGL 上下文，因爲我們需要繪製兩次，我們不想在爲右眼繪製圖像時丟失左眼的圖像。

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

接下來，我們設置渲染器以便僅繪製左半部分：

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

此代碼假設 GL 上下文佔滿全屏 (`window.inner*`)，這對於 VR 來說是一個非常好的選擇。現在，我們可以針對左眼插入兩個矩陣。

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

以下是幾個重要的實現細節。

* **我們移動世界座標，而不是攝像頭。** 如果您以前沒遇到過這種情況，這可能看上去有些奇怪，但在圖形作品中將攝像頭置於起點 (0, 0, 0) 並移動世界座標很常見。不太哲學性地解釋一下，如果我向前移動 10 米，那麼我是向前移動了 10 米還是世界座標向後移動了 10 米？這與您的視角有關，從數學角度看哪種移動都並無關緊要。由於 WebVR API 返回“眼睛模型矩陣的*反向*”，因此，我們期望將其應用於世界座標（我們的代碼中的 `this._scene`），而不是攝像頭本身。

* **在更改矩陣值後，我們必須手動更新矩陣。** Three.js 緩存值非常大（這非常有利於性能），但這意味着您*必須*先通知緩存已發生變化，然後才能查看更改。這可通過 `updateMatrixWorld()` 方法完成，該方法選取一個布爾值以確保計算傳入場景圖形。

很快就要完成了！最後一步是針對右眼重複此流程。下面，在針對左眼繪製視圖後，我們將清除渲染器的深度計算，因爲我們不想讓它影響右眼視圖的渲染。然後，我們更新右側的視口，並再次繪製場景。

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

現在，我們可以針對右眼插入兩個矩陣。

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

終於完成了！實際上，還差一點...

## 指示設備進行更新

如果您從設備的角度看，您會注意到顯示從未更新。這是因爲我們可以對 WebGL 上下文進行很多渲染，並且 HMD 不知道何時真正更新自己的顯示。例如，在渲染每單隻眼睛的圖像後進行更新沒有任何效果。因此，我們通過調用 submitFrame 來控制更新。

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

此時，藉助該代碼，我們算是真正*完成了*。如果您需要最終版本，別忘了您可以查看 [Google Chrome 示例存儲區](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)。

## 結論和相關資源

對於向內容添加身臨其境的體驗，WebVR 真的是一個非常棒的方法，而且使用 Three.js 等內容庫可以讓處理 WebGL 變得更簡單。但是，需要注意一些重要事項：

* **從一開始就構建漸進式增強。** 正如我們在本指南中多次提到的，構建良好的基礎級別體驗非常重要，您可以基於該體驗對 WebVR 進行分層。許多體驗都可使用鼠標/觸摸控件實現，並且可以通過加速度計控件升級，從而形成完全合格的 VR 體驗。將您的目標設備最大化總是值得一試。

* **請記住，您要對場景渲染兩次。** 您可能需要考慮大量詳細信息 (LOD) 和其他技巧，以確保您在對場景進行兩次渲染時，它可以針對 CPU 和 GPU 按比例減少計算工作負載。首先，您必須保持穩定的幀率！如果人們因爲眩暈而感到非常不適，那麼再多娛樂內容也沒有用！

* **在實體設備上進行測試。** 這與以前的提到的要點有關。您應儘量使用實體設備，在上面測試您正在構建的內容，特別是您針對移動設備構建的內容。俗話說的好，[“筆記本電腦是卑劣的騙子”](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405)。

目前，用於創建 WebVR 內容的資源非常充足，可爲您提供一臂之力：

* **[VRView](https://github.com/googlevr/vrview)**。此內容庫可幫助您嵌入 360 度全景照片和視頻。

* **[WebVR 樣板文件](https://github.com/borismus/webvr-boilerplate)**.WebVR 和 Three.js 入門工具

* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)**.回填 WebVR 所需的 API。請記住，雖然它確實能爲您的用戶提供改善您的非 VR 體驗的功能，但使用 polyfill 會使性能下降。

* **[Ray-Input](https://github.com/borismus/ray-input)**。一個內容庫，可幫助您處理 VR 設備和非 VR 設備的各種類型的輸入，如鼠標、觸摸和 VR 遊戲手柄控制器。

立即行動吧！打造一些令人驚歎的 VR 體驗！


{# wf_devsite_translation #}
