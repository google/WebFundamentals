project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:獲取有關 WebVR 狀態的最新信息，以及在構建 WebVR 體驗時需要注意的事項。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-12-12 #}

# WebVR 狀態和注意事項 {: .page-title }

Warning: WebVR 仍處於實驗階段，並且隨時可能更改。

## WebVR 實現狀態

目前，WebVR API 可用於以下瀏覽器：

* Chrome Beta (M56+)，通過一個[來源試用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)實現。
* Firefox Nightly。
* Samsung Internet Browser for Gear VR。（請Note: 此瀏覽器目前支持一個較早版本的 WebVR 規範）。

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

如需瞭解有關瀏覽器實現狀態的更多信息，請訪問 [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed)。

## 注意事項

以下是目前構建 WebVR 體驗時需要注意的事項。

* **您必須通過 HTTPS 提供您的 WebVR 內容。** 如果不這麼做，您的用戶將收到來自瀏覽器的警告。
    * 請參閱[在服務器上啓用 HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)，尋求更多指導。
* **Chrome 目前僅在 Android 上支持原生 WebVR。** 您必須使用一個 Daydream 耳機和一部 Pixel 手機。
* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) 可能不會始終與規範的原生實現一一對應。** 如果您計劃使用 Polyfill，請務必在 VR 設備和非 VR 設備上都進行檢查。
* **在您的代碼提供 VR 功能前，用戶必須先點擊一個 VR 控制器按鈕**。在代碼中必須考慮到這一點，一般情況下，通過向用戶顯示一條消息，請求他們在開始虛擬實境體驗時按一個控制器按鈕。
* **在本地運行時，您必須在 Chrome 56 中啓用 Gamepad pose information**。在本地主機上運行時，遊戲手柄信息不包含姿勢（或位置）信息，除非您在 Chrome 56 中啓用 Gamepad Extensions runtime flag。如果您當前在運行來源測試版，則通過 WebVR API 啓用 Gamepad Extensions。


{# wf_devsite_translation #}
