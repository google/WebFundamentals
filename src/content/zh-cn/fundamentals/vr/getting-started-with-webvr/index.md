project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何在 Three.js 中选取 WebGL 场景并添加 WebVR 功能。

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR 入门指南 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

Warning: WebVR 仍处于实验阶段，并且随时可能更改。

在本指南中，我们将探讨 WebVR API，并利用它们增强一个使用 [Three.js](https://threejs.org/) 构建的简单 WebGL 场景。不过，在执行过程中，您可能需要从现有的解决方案（如 [WebVR 样板文件](https://github.com/borismus/webvr-boilerplate)）着手。如果您是初次使用 Three.js，那么，您可以使用这个[便捷的入门指南](https://aerotwist.com/tutorials/getting-started-with-three-js/)。这是一个非常乐于提供支持的社区，因此，如果您遇到问题，可以向他们寻求帮助。

首先看一个[将一个盒子放入一个立体空间的场景](https://googlechrome.github.io/samples/web-vr/hello-world/)，其代码可在 [Google Chrome 示例存储区](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)找到。

![在 Chrome 桌面上运行的 WebGL 场景](./img/desktop.jpg)

### 有关支持的一个小提示

WebVR 可以在 Chrome 56+ 中使用（通过启用一个运行时标志）。启用此标志（请访问 `chrome://flags` 并搜索“WebVR”）将允许您在本地构建和测试您的 VR 作品。如果您要为访问者提供 WebVR 支持，您可以选择加入[来源试用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)，其允许您为您的源启用 WebVR。

您还可以使用 [Web VR polyfill](https://github.com/googlevr/webvr-polyfill)，但请注意，使用 polyfill 会性能大受影响。您一定要在目标设备上进行测试，并避免发布无法跟上设备的更新频率的任何内容。帧率不佳或总是发生变化会导致使用您的体验的用户感觉非常不舒适！

如需了解详细信息，请查看 [WebVR 状态](../status/)页面。

## 获取 VR 显示器

在有了一个 WebGL 场景后，为了使其通过 WebVR 运行我们需要做些什么？首先，我们需要查询浏览器以发现是否有任何可用的 VR 显示器，我们可以通过 navigator.getVRDisplays() 执行此操作。

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

以下是此代码中的几点注意事项。

1. **并非每个设备都可以将内容“显示”到一个头戴式显示器。** 例如，有些设备允许使用加速度计或伪 VR 体验，但是不能使用 HMD。对于 canPresent 布尔值将变成 false 的设备，需要注意这一点。

2. **可能没有可用的 VR 设备。** 我们的目标应该是打造适用于非 VR 设置的体验，并将 VR 的可用性视为渐进式增强。

3. **可能有多个可用的 VR 设备。**同样，某人完全可能有多个可用的 VR 设备，如果可以的话，我们应允许这种情况，从而让用户可以选择最适合的设备。

## 安装 WebVR Emulation Chrome DevTools 扩展程序

您可能发现自己没有 VR 设备进行测试。如果出现此情况，可随时寻求帮助！Jaume Elias 创建了一个 [Chrome DevTools 扩展程序，其可模拟一台 VR 设备](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil)。

![使用 Jaume Elias 的 Chrome 扩展程序模拟 WebVR](./img/webvr-emulation.jpg)

虽然最好是在真实设备上进行测试（特别是性能测试！），但提供此扩展程序有助于您在开发期间快速进行调试。

## 从设备请求显示

要开始在“VR 模式”下进行显示，我们必须从设备进行请求：

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent` 接受一个 [Web VR 规范](https://w3c.github.io/webvr/#vrlayer)称之为“VRLayers”的数组，其本质上是针对 VR 设备的 Canvas 元素的包装器。在上面的代码段中，我们将选取 Canvas 元素 — `WebGLRenderer.domElement`（由 Three.js 提供），并将其作为一个 VRLayer 的源属性进行传递。反过来，`requestPresent` 将为您提供一个 [Promise](/web/fundamentals/getting-started/primers/promises)，其在请求成功时进行解析，否则将被拒绝。

## 绘制 VR 场景

最后，我们准备向用户显示一个 VR 场景，这真令人兴奋！

![Pixel 上运行的 WebVR 场景](../img/getting-started-with-webvr.jpg)

首先，介绍一下我们需要做的工作。

* 确保使用设备的 `requestAnimationFrame` 回调。
* 从 VR 设备请求当前的姿势、屏幕方向和眼睛信息。
* 将 WebGL 上下文分成两半，每一半对应一只眼睛，并单独绘制。

为什么我们使用的 `requestAnimationFrame` 需要与 window 对象提供的不同？原因是我们所使用的显示器的刷新频率可能与主机不同！如果耳机的刷新频率为 120Hz，那么，我们需要根据该频率生成帧，即使主机以 60Hz 的频率刷新屏幕。WebVR API 考虑到了这一点，因此，为我们提供了一个不同的 `requestAnimationFrame` API 进行调用。如果使用的是移动设备，那么通常只有一个显示器（Android 目前的刷新频率为 60Hz），但即使如此，我们也应使用正确的 API 以使我们的代码能适应未来需求，并尽可能提供更广泛的兼容性。

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

接下来，我们需要请求与用户的头部位置、方向有关的信息，以及正确进行绘制所需的任何其他信息（我们可以使用 `getFrameData()` 进行请求）。

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()` 将选取一个对象，它将我们需要的信息放置在该对象上。这必须是一个 `VRFrameData` 对象，我们可以通过 `new VRFrameData()` 创建它。

    this._vr.frameData = new VRFrameData();

帧数据中有许多有趣的信息，我们快速地看一下。

* **timestamp**。来自设备的更新时间戳。在 VR 显示器上首次调用 getFrameData 时，此值为 0。

* **leftProjectionMatrix** 和 **rightProjectionMatrix**。这些矩阵适用于考虑场景中眼睛角度的摄像头。稍后我们将进行详细介绍。

* **leftViewMatrix** 和 **rightViewMatrix**。这些指的是两个以上的矩阵，其提供场景中每只眼睛的位置。

如果您刚刚接触 3D 作品投影矩阵和 Model-View 矩阵，您可能会感到很难。尽管这些矩阵背后含有一些数学知识，但理论上，我们不需要确切了解其工作原理，以及它们还能做些什么。

* **投影矩阵。** 这些矩阵用于创建场景中角度的展示。其做法通常是在场景中的物体进一步远离视线时将物体的比例进行扭曲变形。

* **Model-View 矩阵。** 这些矩阵用于确定 3D 空间中物体的位置。矩阵的工作原理让您可以创建场景图表，并根据需要处理此图表，将每个节点的矩阵相乘，从而达到讨论中的物体的最终 model-view 矩阵。

网上有很多深入探讨投影矩阵和 Model-View 矩阵的相关优秀指南，如果您要获取更多背景信息，可以在 Google 上搜索这些指南。

## 控制场景渲染

有了需要的矩阵，我们可以绘制呈现给左眼的视图。首先，我们需要指示 Three.js 在我们每次调用渲染时不要清除 WebGL 上下文，因为我们需要绘制两次，我们不想在为右眼绘制图像时丢失左眼的图像。

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

接下来，我们设置渲染器以便仅绘制左半部分：

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

此代码假设 GL 上下文占满全屏 (`window.inner*`)，这对于 VR 来说是一个非常好的选择。现在，我们可以针对左眼插入两个矩阵。

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

以下是几个重要的实现细节。

* **我们移动世界坐标，而不是摄像头。** 如果您以前没遇到过这种情况，这可能看上去有些奇怪，但在图形作品中将摄像头置于起点 (0, 0, 0) 并移动世界坐标很常见。不太哲学性地解释一下，如果我向前移动 10 米，那么我是向前移动了 10 米还是世界坐标向后移动了 10 米？这与您的视角有关，从数学角度看哪种移动都并无关紧要。由于 WebVR API 返回“眼睛模型矩阵的*反向*”，因此，我们期望将其应用于世界坐标（我们的代码中的 `this._scene`），而不是摄像头本身。

* **在更改矩阵值后，我们必须手动更新矩阵。** Three.js 缓存值非常大（这非常有利于性能），但这意味着您*必须*先通知缓存已发生变化，然后才能查看更改。这可通过 `updateMatrixWorld()` 方法完成，该方法选取一个布尔值以确保计算传入场景图形。

很快就要完成了！最后一步是针对右眼重复此流程。下面，在针对左眼绘制视图后，我们将清除渲染器的深度计算，因为我们不想让它影响右眼视图的渲染。然后，我们更新右侧的视口，并再次绘制场景。

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

现在，我们可以针对右眼插入两个矩阵。

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

终于完成了！实际上，还差一点...

## 指示设备进行更新

如果您从设备的角度看，您会注意到显示从未更新。这是因为我们可以对 WebGL 上下文进行很多渲染，并且 HMD 不知道何时真正更新自己的显示。例如，在渲染每单只眼睛的图像后进行更新没有任何效果。因此，我们通过调用 submitFrame 来控制更新。

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

此时，借助该代码，我们算是真正*完成了*。如果您需要最终版本，别忘了您可以查看 [Google Chrome 示例存储区](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)。

## 结论和相关资源

对于向内容添加身临其境的体验，WebVR 真的是一个非常棒的方法，而且使用 Three.js 等内容库可以让处理 WebGL 变得更简单。但是，需要注意一些重要事项：

* **从一开始就构建渐进式增强。** 正如我们在本指南中多次提到的，构建良好的基础级别体验非常重要，您可以基于该体验对 WebVR 进行分层。许多体验都可使用鼠标/触摸控件实现，并且可以通过加速度计控件升级，从而形成完全合格的 VR 体验。将您的目标设备最大化总是值得一试。

* **请记住，您要对场景渲染两次。** 您可能需要考虑大量详细信息 (LOD) 和其他技巧，以确保您在对场景进行两次渲染时，它可以针对 CPU 和 GPU 按比例减少计算工作负载。首先，您必须保持稳定的帧率！如果人们因为眩晕而感到非常不适，那么再多娱乐内容也没有用！

* **在实体设备上进行测试。** 这与以前的提到的要点有关。您应尽量使用实体设备，在上面测试您正在构建的内容，特别是您针对移动设备构建的内容。俗话说的好，[“笔记本电脑是卑劣的骗子”](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405)。

目前，用于创建 WebVR 内容的资源非常充足，可为您提供一臂之力：

* **[VRView](https://github.com/googlevr/vrview)**。此内容库可帮助您嵌入 360 度全景照片和视频。

* **[WebVR 样板文件](https://github.com/borismus/webvr-boilerplate)**.WebVR 和 Three.js 入门工具

* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)**.回填 WebVR 所需的 API。请记住，虽然它确实能为您的用户提供改善您的非 VR 体验的功能，但使用 polyfill 会使性能下降。

* **[Ray-Input](https://github.com/borismus/ray-input)**。一个内容库，可帮助您处理 VR 设备和非 VR 设备的各种类型的输入，如鼠标、触摸和 VR 游戏手柄控制器。

立即行动吧！打造一些令人惊叹的 VR 体验！


{# wf_devsite_translation #}
