project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:探索如何使用 Ray Input 内容库向 WebVR 场景添加输入。

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# 向 WebVR 场景添加输入 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

警告：WebVR 仍处于实验阶段，并且随时可能更改。

在 [WebVR 使用入门部分](../getting-started-with-webvr/)中，我们介绍了如何选取 WebGL 场景并向其添加 WebVR 功能。执行上述操作后，您可以环顾 VR 中的场景，如果您能够与场景中的实体进行交互，将体验到非常多的乐趣。

![WebVR 场景中显示输入的射线束](./img/ray-input.jpg)

对于 WebVR（以及常见的 3D），其输入类型多种多样，理想情况下，我们不仅要考虑所有输入类型，还需要能够根据用户上下文的变化在各种输入间进行切换。

目前可用的输入类型一览：

<img class="attempt-right" src="../img/touch-input.png" alt="触摸输入图标">

* **鼠标。**
* **触摸。**
* **加速度计和陀螺仪。**
* **没有自由度的控制器**（如 Cardboard）。这些控制器与视口完全关联，一般情况下，假定交互是在视口的中心发起的。
* **具有 3 种自由度的控制器**（如 Daydream 控制器）。具有 3 种自由度的控制器提供的是屏幕方向信息，而不是位置信息。通常，假定这些控制器握在用户的左手或右手上，并预估它们在 3D 空间中的位置。
* **具有 6 个自由度的控制器**（如 Oculus Rift 或 Vive）。任何具有 6 个自由度的控制器都将提供屏幕方向和位置信息。这些通常位于功能范围的上端，并且具有最佳的准确度。

将来，随着 WebVR 变得成熟，我们甚至会看到新的输入类型，这意味着我们的代码必须尽可能适应将来的需求。不过，通过编写代码来处理所有输入排列方式会使代码变得复杂和笨重。Boris Smus 创建的 [Ray Input](https://github.com/borismus/ray-input) 内容库提供了一个良好的开端，支持目前可用的大多数输入类型，因此，我们从 Ray Inpu 开始介绍。

从之前的场景开始，我们[通过 Ray Input 添加输入处理程序](https://googlechrome.github.io/samples/web-vr/basic-input/)。如果您要查看最终代码，您应查看 [Google Chrome 示例存储区](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/)。

## 将 Ray Input 内容库添加到页面

为简单起见，我们可以使用一个脚本标记直接添加 Ray Input：

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

如果您目前使用 Ray Input 作为大型构建系统的一部分，您也可以通过该方式导入它。[Ray Input README 提供了更多信息](https://github.com/borismus/ray-input/blob/master/README.md)，您应该查阅一下。

## 获取输入权限

在获取任意 VR 显示器访问权限后，我们可以请求访问可用的任意输入设备的权限。从此处，我们可以添加事件侦听器，并且更新场景以将复选框的状态默认设置为“deselected”。

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

让我们看一下 `_getInput` 和 `_addInputEventListeners` 函数内的情况。

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

创建一个 Ray Input 包括从场景向其传递 Three.js 摄像头，以及一个可以与鼠标、触摸以及 Ray Input 需要的任何其他事件侦听器进行绑定的元素。如果您不传递一个元素作为第二个参数，Ray Input 将默认绑定到 `window`，这可能会阻止您的部分界面 (UI) 接收输入事件！

您需要做的其他工作是告诉 Ray Input 它需要处理的区域有多大，在大多数情况下该区域是 WebGL 画布元素的区域。

## 实现场景实体的交互性

接下来，我们需要指示 Ray Input 跟踪哪些内容，以及我们想要接收哪些事件。

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

在与场景交互时（无论通过鼠标、触摸或其他控制器），这些事件都将触发。我们可以根据用户是否指向盒子来让盒子的不透明度发生变化。

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

要使该操作有效，我们需要确保告诉 Three.js 此盒子的材料应支持透明性。

    this._box.material.transparent = true;

现在，交互应包含鼠标交互和触摸交互。我们看一下添加一个具有 3 个自由度的控制器（如 Daydream 控制器）需要做些什么。

## 启用 Gamepad API 扩展程序

了解目前如何在 WebVR 中使用 Gamepad API 需要注意两个重要事项：

* 在 Chrome 56 中，您需要启用 `chrome://flags` 中的 Gamepad Extensions 标志。如果您使用的是[来源试用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)，则 Gamepad Extensions 已经与 WebVR API　一起启用。**对于本地开发，您需要启用此标记**。

* 游戏手柄的姿势信息（即如何使用这 3 个自由度的信息）**仅在用户按下 VR 控制器上的按钮时才启用**。

由于用户必须先交互然后我们才能在场景中向他们显示指针，因此，我们需要要求用户在其控制器上按一个按钮。最好是在我们开始向头戴式显示器 (HMD) 显示内容后按按钮。

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

通常，您可能期望使用 HTML 元素向用户显示这些信息，但 HMD 正在显示 WebGL 上下文（且没有任何其他内容），因此，我们必须在此处绘制消息。Three.js 具有一个 [Sprite 原语](https://threejs.org/docs/#Reference/Objects/Sprite)，其始终面向摄像头（通常称为“布告板”），我们可以在上面绘制图像。

![向用户显示一条“Press Button”消息](./img/press-a-button.jpg)

执行此操作的代码类似如下。

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

最后，在 `_render` 函数中，我们可以观察交互情况，并使用该函数隐藏模态。我们还需要指示 Ray Input 在何时更新，这与我们根据 HMD 调用 `submitFrame()` 以向其刷入画布的方法相似。

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

## 向场景添加指针网格

在允许交互的同时，我们很可能需要向用户显示一些内容，以表明用户的指针正在指向哪里。Ray Input 提供了一个网格，您可以将其添加到您的场景中以实现此目的。

    this._scene.add(this._rayInput.getMesh());

借此，对于在控制器中没有移动自由的 HMD（例如 Cardboard），我们会获取一个标线，而对于可以自由移动的 HMD，则获取一个像光束一样的射线。对于鼠标和触摸，不会显示标线。

![WebVR 场景中显示输入的射线束](./img/ray-input.jpg)

## 结论

在向您的体验添加输入时需要注意以下事项。

* **您应采用渐进式增强。** 由于用户可能会使用您使用列表中的任意特定输入排列方式构建的内容，因此，您应设法规划您的 UI，以便它可以正确适应每个输入类型。在可能的情况下，测试一系列的设备和输入以使适用范围最大化。

* **输入可能不是完全准确。** 特别是 Daydream 控制器，它具有 3 个自由度，但是在一个具有 6 个自由度的空间中运行。这意味着尽管其屏幕方向正确，但必须假设其在 3D 空间中的位置。考虑到这一点，您可能希望将输入目标设置的更大，并确保正确分隔以避免混淆。

向您的空间添加输入对于营造沉浸式体验非常重要，使用 [Ray Input](https://github.com/borismus/ray-input) 可以简化这一过程。

请通知我们您的进展！



{# wf_devsite_translation #}
