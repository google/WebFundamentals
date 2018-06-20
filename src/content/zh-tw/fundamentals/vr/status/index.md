project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:獲取有關 WebVR 狀態的最新信息，以及在構建 WebVR 體驗時需要注意的事項。

{# wf_updated_on: 2018-06-15 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR狀態{：.page-title}

## WebVR 實現狀態

### WebXR設備API {：#xrdevice}

- Using the WebXR device API requires a[compatible device](/ar/discover/supported-devices)running Android O or later.
- 該WebXR設備API在與其他瀏覽器[填充工具](https://github.com/immersive-web/webxr-polyfill) 。
- 文檔可從[Immersive Web Early Adopters指南獲得](https://immersive-web.github.io/webxr-reference/) 。

今天，API可用於：

Feature | Chrome version | Details
--- | --- | ---
AR擊中測試支持 | Chrome Canary for the immediate future. | Enable the #webxr and #webxr-hit-test flags under chrome://flags
VR使用案例 | Chrome 66及更高版本 | Enable the chrome://flags/#webxr flag. (The URL must be entered manually.)
VR使用案例 | Chrome 67原始試用版 | Enable the chrome://flags/#webxr flag *and* sign up for the origin trial ([explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md), [sign-up form](http://bit.ly/OriginTrialSignup)).

Learn more about the immersive web at the [Immersive Web Community Group](https://github.com/immersive-web).

### Version 1.1 {:#version_1_1}

注意：此API已棄用，其原始試用計劃於7月結束。

今天，WebVR 1.1 API可用於：

- Firefox Nightly.
- Samsung Internet for Android and for Gear VR.
- A Chrome [Origin
    Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)that ran from version 56 beta to June of 2017.

It's supported on:

- Daydream View since M56
- Google Cardboard since M57

它也可以通過[WebXR Polyfill獲得](https://github.com/immersive-web/webxr-polyfill) 。

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

在[chromestatus.com](https://www.chromestatus.com/features/4532810371039232)上查找有關瀏覽器實施狀態的更多信息。

## 注意事項

以下是今天構建WebVR體驗時要記住的事情。

- **您必須通過HTTPS提供您的WebVR內容。**如果您的用戶不會從瀏覽器收到警告。有關更多指導，請參閱[在服務器上啟用HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 。
- **[WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill)可能並不總是與本規範本地實現的1：1匹配。**如果您打算使用Polyfill，請務必檢查支持VR的設備和非VR設備。
- **對於某些類型的會話，用戶必須在AR或VR可用於代碼之前單擊按鈕** 。有關更多信息，請參閱[Immersive Web Early Adopters指南](https://immersive-web.github.io/webxr-reference/) 。
