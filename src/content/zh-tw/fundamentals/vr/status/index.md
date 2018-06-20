project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get the latest info on WebVR and AR's status, as well as things to keep in mind when building WebVR experiences.

{# wf_updated_on: 2018-06-15 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR狀態{：.page-title}

## WebVR 實現狀態

### WebXR設備API {：#xrdevice}

- 使用WebXR設備API需要Android O或更高版本的[兼容設備](/ar/discover/supported-devices) 。
- 該WebXR設備API在與其他瀏覽器[填充工具](https://github.com/immersive-web/webxr-polyfill) 。
- 文檔可從[Immersive Web Early Adopters指南獲得](https://immersive-web.github.io/webxr-reference/) 。

今天，API可用於：

Feature | Chrome version | Details
--- | --- | ---
AR擊中測試支持 | Chrome Canary 不久的將來。 | 在chrome://flags 下啟用#webxr 和 #webxr-hit-test 標誌
VR使用案例 | Chrome 66及更高版本 | 啟用chrome://flags/#webxr 標誌{em0}並{/em0}註冊原始試用版（ {a1}解釋器{/a1} ， {a2}註冊表單{/a2} ）。
VR使用案例 | Chrome 67原始試用版 | 啟用chrome://flags/#webxr 標誌*並*註冊原始試用版（ [解釋器](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) ， [註冊表單](http://bit.ly/OriginTrialSignup) ）。

在[Immersive Web Community Group中](https://github.com/immersive-web)了解更多關於immersive web。

### Version 1.1 {:#version_1_1}

注意：此API已棄用，其原始試用計劃於7月結束。

今天，WebVR 1.1 API可用於：

- Firefox Nightly.
- Samsung Internet for Android and for Gear VR.
- Chrome [原始版試用](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)版從第56版測試版到2017年6月。

支持：

- Daydream View 自M56
- Google Cardboard 自 M57

它也可以通過[WebXR Polyfill獲得](https://github.com/immersive-web/webxr-polyfill) 。

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

在[chromestatus.com](https://www.chromestatus.com/features/4532810371039232)上查找有關瀏覽器實施狀態的更多信息。

## 注意事項

以下是今天構建WebVR體驗時要記住的事情。

- **您必須通過HTTPS提供您的WebVR內容。**如果您的用戶不會從瀏覽器收到警告。有關更多指導，請參閱[在服務器上啟用HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 。
- **[WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill)可能並不總是與本規範本地實現的1：1匹配。**如果您打算使用Polyfill，請務必檢查支持VR的設備和非VR設備。
- **對於某些類型的會話，用戶必須在AR或VR可用於代碼之前單擊按鈕** 。有關更多信息，請參閱[Immersive Web Early Adopters指南](https://immersive-web.github.io/webxr-reference/) 。
