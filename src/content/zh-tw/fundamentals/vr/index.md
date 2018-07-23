project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:WebVR

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-12-12 #}

# WebVR {: .page-title }

Warning: WebVR 仍處於實驗階段，並且隨時可能更改。

WebVR 是一個 JavaScript API，其利用用戶擁有的任意 VR 耳機和 VR 設備（如 [Daydream 耳機](https://vr.google.com/daydream/)和 Pixel 手機）在瀏覽器中營造身臨其境的 3D 體驗。

<img src="img/getting-started-with-webvr.jpg" alt="WebVR 使用入門" />

## 支持與可用性

目前，WebVR API 可用於以下瀏覽器：

* Chrome Beta (M56+)，通過一個[來源試用版](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)實現。
* Firefox Nightly。
* Samsung Internet Browser for Gear VR。（請Note: 此瀏覽器目前支持一個較早版本的 WebVR 規範）。

對於不支持 WebVR 或可能具有較舊版本的 API 的瀏覽器，您可以回退到 [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)。不過，請謹記，VR *對性能極其敏感*，並且 polyfill 的性能成本通常相對較高，因此，對於無法爲 WebVR 提供原生支持的用戶，您需要斟酌是否使用 polyfill。

如果您不確定，則避免提供糟糕的性能體驗，從而造成用戶出現暈動症。

[獲取有關 WebVR 的最新狀態。](./status/)

## 創建 WebVR 內容

要創建 WebVR 內容，您需要利用一些全新的 API，以及 [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) 和[網絡音頻](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)等現有技術，同時考慮不同的輸入類型和耳機。

<div class="attempt-left">
  <h3>WebVR 使用入門</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="WebVR 使用入門" />
  </a>
  <p>
    選取一個 WebGL 場景並添加 VR API 就可以順利使用 WebVR。<br>
    <a href="./getting-started-with-webvr/">瞭解詳情</a>
  </p>
</div>
<div class="attempt-right">
  <h3>向 WebVR 場景添加輸入</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="向 WebVR 場景添加輸入" />
  </a>
  <p>
    交互是提供具有吸引力的沉浸式體驗的關鍵環節。<br>
    <a href="./adding-input-to-a-webvr-scene/">使用入門 </a>
  </p>
</div>

<div class="clearfix"></div>

### 更多資源

以下是目前針對網頁提供的一些非常好的 WebVR 資源。

* [瞭解 WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [查看 WebVR 示例](https://webvr.info/samples/)
* [專爲 Google Cardboard 設計](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## 記錄您的性能

<img src="img/oce.png" class="attempt-right" alt="WebVR 性能" />

爲了最大程度降低使用 WebVR 體驗的用戶的不適，用戶必須保持穩定的（和非常高的）幀速率。不然，會造成用戶出現暈動症！

在移動設備上，更新頻率通常爲 60Hz，這意味着目標頻率爲 60fps（或每幀 16 毫秒，*包括*每幀瀏覽器的開銷）。在桌面設備上，目標頻率通常爲 90Hz（11 毫秒，包括開銷）。

爲滿足上述目標，您需要[定期在您的目標設備上進行測試](/web/tools/chrome-devtools/remote-debugging/)，並且應[使用 Chrome DevTools 的 Timeline 測量每一幀的開銷](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)。

## 包含漸進式增強

<img src="img/touch-input.png" class="attempt-right" alt="使用漸進式增強以實現覆蓋範圍最大化" />

如果您的用戶沒有頭盔式顯示器 (‘HMD’) 或 VR 設備，您該怎麼辦？最佳答案是使用漸進式增強功能。

1. 假設用戶當前在使用傳統輸入設備，如鍵盤、鼠標或觸摸屏，沒有安裝 VR 耳機。
2. 適應輸入設備的變化，並在運行時使用耳機。

幸運的是，[WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) 讓我們可以檢測 VR 環境中的變化，以發現和適應輸入的變化，並查看用戶設備中的選項。

通過首先假定一個非 VR 環境，可將您體驗的覆蓋範圍最大化，並確保無論用戶的設置如何，都可以提供最佳體驗。

如需更多詳細信息，請查看[向 WebVR 場景添加輸入](./adding-input-to-a-webvr-scene/)指南。


{# wf_devsite_translation #}
