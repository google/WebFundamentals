project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:获取有关 WebVR 状态的最新信息，以及在构建 WebVR 体验时需要注意的事项。

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# WebVR 状态和注意事项 {: .page-title }

Warning: WebVR 仍处于实验阶段，并且随时可能更改。

## WebVR 实现状态

目前，WebVR API 可用于以下浏览器：

* Chrome Beta (M56+)，通过一个[来源试用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)实现。
* Firefox Nightly。
* Samsung Internet Browser for Gear VR。（请注意：此浏览器目前支持一个较早版本的 WebVR 规范）。

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

如需了解有关浏览器实现状态的更多信息，请访问 [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed)。

## 注意事项

以下是目前构建 WebVR 体验时需要注意的事项。

* **您必须通过 HTTPS 提供您的 WebVR 内容。** 如果不这么做，您的用户将收到来自浏览器的警告。
    * 请参阅[在服务器上启用 HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)，寻求更多指导。
* **Chrome 目前仅在 Android 上支持原生 WebVR。** 您必须使用一个 Daydream 耳机和一部 Pixel 手机。
* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) 可能不会始终与规范的原生实现一一对应。** 如果您计划使用 Polyfill，请务必在 VR 设备和非 VR 设备上都进行检查。
* **在您的代码提供 VR 功能前，用户必须先点击一个 VR 控制器按钮**。在代码中必须考虑到这一点，一般情况下，通过向用户显示一条消息，请求他们在开始虚拟实境体验时按一个控制器按钮。
* **在本地运行时，您必须在 Chrome 56 中启用 Gamepad pose information**。在本地主机上运行时，游戏手柄信息不包含姿势（或位置）信息，除非您在 Chrome 56 中启用 Gamepad Extensions runtime flag。如果您当前在运行来源测试版，则通过 WebVR API 启用 Gamepad Extensions。


{# wf_devsite_translation #}
