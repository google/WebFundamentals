project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:WebVR

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# WebVR {: .page-title }

Warning: WebVR 仍处于实验阶段，并且随时可能更改。

WebVR 是一个 JavaScript API，其利用用户拥有的任意 VR 耳机和 VR 设备（如 [Daydream 耳机](https://vr.google.com/daydream/)和 Pixel 手机）在浏览器中营造身临其境的 3D 体验。

<img src="img/getting-started-with-webvr.jpg" alt="WebVR 使用入门" />

## 支持与可用性

目前，WebVR API 可用于以下浏览器：

* Chrome Beta (M56+)，通过一个[来源试用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)实现。
* Firefox Nightly。
* Samsung Internet Browser for Gear VR。（请Note: 此浏览器目前支持一个较早版本的 WebVR 规范）。

对于不支持 WebVR 或可能具有较旧版本的 API 的浏览器，您可以回退到 [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)。不过，请谨记，VR *对性能极其敏感*，并且 polyfill 的性能成本通常相对较高，因此，对于无法为 WebVR 提供原生支持的用户，您需要斟酌是否使用 polyfill。

如果您不确定，则避免提供糟糕的性能体验，从而造成用户出现晕动症。

[获取有关 WebVR 的最新状态。](./status/)

## 创建 WebVR 内容

要创建 WebVR 内容，您需要利用一些全新的 API，以及 [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) 和[网络音频](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)等现有技术，同时考虑不同的输入类型和耳机。

<div class="attempt-left">
  <h3>WebVR 使用入门</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="WebVR 使用入门" />
  </a>
  <p>
    选取一个 WebGL 场景并添加 VR API 就可以顺利使用 WebVR。<br>
    <a href="./getting-started-with-webvr/">了解详情</a>
  </p>
</div>
<div class="attempt-right">
  <h3>向 WebVR 场景添加输入</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="向 WebVR 场景添加输入" />
  </a>
  <p>
    交互是提供具有吸引力的沉浸式体验的关键环节。<br>
    <a href="./adding-input-to-a-webvr-scene/">使用入门 </a>
  </p>
</div>

<div class="clearfix"></div>

### 更多资源

以下是目前针对网页提供的一些非常好的 WebVR 资源。

* [了解 WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [查看 WebVR 示例](https://webvr.info/samples/)
* [专为 Google Cardboard 设计](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## 记录您的性能

<img src="img/oce.png" class="attempt-right" alt="WebVR 性能" />

为了最大程度降低使用 WebVR 体验的用户的不适，用户必须保持稳定的（和非常高的）帧速率。不然，会造成用户出现晕动症！

在移动设备上，更新频率通常为 60Hz，这意味着目标频率为 60fps（或每帧 16 毫秒，*包括*每帧浏览器的开销）。在桌面设备上，目标频率通常为 90Hz（11 毫秒，包括开销）。

为满足上述目标，您需要[定期在您的目标设备上进行测试](/web/tools/chrome-devtools/remote-debugging/)，并且应[使用 Chrome DevTools 的 Timeline 测量每一帧的开销](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)。

## 包含渐进式增强

<img src="img/touch-input.png" class="attempt-right" alt="使用渐进式增强以实现覆盖范围最大化" />

如果您的用户没有头盔式显示器 (‘HMD’) 或 VR 设备，您该怎么办？最佳答案是使用渐进式增强功能。

1. 假设用户当前在使用传统输入设备，如键盘、鼠标或触摸屏，没有安装 VR 耳机。
2. 适应输入设备的变化，并在运行时使用耳机。

幸运的是，[WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) 让我们可以检测 VR 环境中的变化，以发现和适应输入的变化，并查看用户设备中的选项。

通过首先假定一个非 VR 环境，可将您体验的覆盖范围最大化，并确保无论用户的设置如何，都可以提供最佳体验。

如需更多详细信息，请查看[向 WebVR 场景添加输入](./adding-input-to-a-webvr-scene/)指南。


{# wf_devsite_translation #}
