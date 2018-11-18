project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:在開發計算機網絡服務器上託管網站，然後從 Android 設備訪問內容。

{# wf_updated_on:2016-04-07 #}
{# wf_published_on:2015-04-13 #}

# 訪問本地服務器 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

在開發計算機網絡服務器上託管網站，然後從 Android 設備訪問內容。


使用 USB 電纜和 Chrome DevTools，您可以從開發計算機運行網站，然後在 Android 設備上查看網站。
 


### TL;DR {: .hide-from-toc }
- 利用端口轉發，您可以在 Android 設備上查看開發計算機網絡服務器中的內容。
- 如果您的網絡服務器正在使用自定義域名，您可以將 Android 設備設置爲訪問位於具有自定義域名映射的網域中的內容。


## 設置端口轉發 {:#port-forwarding}

端口轉發使您的 Android 設備可以訪問在開發計算機網絡服務器上託管的內容。
端口轉發通過在映射到開發計算機上 TCP 端口的 Android 設備上創建偵聽 TCP 端口的方式工作。端口之間的流量通過 Android 設備與開發計算機之間的 USB 連接傳輸，所以連接並不取決於您的網絡配置。



要啓用端口轉發，請執行以下操作：

1. 在您的開發計算機與 Android 設備之間設置[遠程調試](.)。
完成後，您應在 **Inspect Devices** 對話框的左側菜單中看到 Android 設備，還應看到 **Connected** 狀態指示器。


1. 在 DevTools 的 **Inspect Devices** 對話框中，啓用 **Port forwarding**。
1. 點擊 **Add rule**。

   ![添加端口轉發規則](imgs/add-rule.png)
1. 在左側的 **Device port** 文本字段中，輸入 Android 設備上您想要從其訪問網站的 `localhost` 端口號。例如，如果您想要從 `localhost:5000` 訪問網站，則應輸入 `5000`。
1. 在右側的 **Local address** 文本字段中，輸入開發計算機網絡服務器上運行的您的網站的 IP 地址或主機名，後面緊跟端口號。例如，如果您的網站在 `localhost:7331` 上運行，則應輸入 `localhost:7331`。

1. 點擊 **Add**。

端口轉發已設置完畢。您可以在該設備位於 **Inspect Devices** 對話框內的標籤上看到端口轉發的狀態指示器。


![端口轉發狀態](imgs/port-forwarding-status.png)

要查看內容，請在您的 Android 設備上打開 Chrome，然後轉至您在 **Device port** 中指定的 `localhost` 端口。
例如，如果您在字段中輸入了 `5000`，則應轉至 `localhost:5000`。

 

## 映射到自定義本地域名 {:#custom-domains}

利用自定義域名映射，您可以在 Android 設備上查看當前使用自定義域名的開發計算機上網絡服務器中的內容。


例如，假設您的網站使用僅在白名單網域 `chrome.devtools` 上運行的第三方 JavaScript 庫。
因此，您可以在開發計算機上的 `hosts` 文件中創建條目，將此網域映射到 `localhost`（如 `127.0.0.1 chrome.devtools`）。設置自定義域名映射和端口轉發後，您將能夠在 Android 設備上查看網站，網址爲 `chrome.devtools`。

 

### 爲代理服務器設置端口轉發

要映射自定義域名，您必須在開發計算機上運行代理服務器。
代理服務器示例包括 [Charles][charles]、[Squid][squid] 和 [Fiddler][fiddler]。


要爲代理設置端口轉發，請執行以下操作：

1. 運行代理服務器並記下其正在使用的端口。**注**：代理服務器和您的網絡服務器必須在不同的端口上運行。
1. 爲您的 Android 設備設置[端口轉發](#port-forwarding)。在 **local address** 字段中，輸入 `localhost:`，後面緊跟運行代理服務器的端口。例如，如果代理服務器在端口 `8000` 上運行，您應輸入 `localhost:8000`。
在 **device port** 字段中，輸入您想要使 Android 設備在其上面偵聽的端口號，如 `3333`。


[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### 在您的設備上配置代理設置

接下來，您需要配置 Android 設備，以便與代理服務器進行通信。
 

1. 在您的 Android 設備上，轉至 **Settings** > **Wi-Fi**。
1. 長按您當前連接到的網絡的名稱。
   **注**：代理設置的適用範圍爲單個網絡。
3. 點按 **Modify network**。
4. 點按 **Advanced options**。將會顯示代理設置。
5. 點按 **Proxy** 菜單，然後選擇 **Manual**。
6. 在 **Proxy hostname** 字段中，輸入 `localhost`。
7. 在 **Proxy port** 字段中，輸入您在前一部分中爲 **device port** 輸入的端口號。
8. 點按 **Save**。

進行這些設置後，您的設備會將所有請求轉發給開發計算機上的代理。
代理會代表您的設備發出請求，這樣就可以正確解析對自定義本地域名的請求。


現在，您可以在 Android 設備上訪問自定義域名，就像您在開發計算機上訪問一樣。
 

如果您的網絡服務器正在非標準端口上運行，從 Android 設備請求內容時請務必指定端口。例如，如果網絡服務器正在端口 `7331` 上使用自定義域名 `chrome.devtools`，您從 Android 設備上查看網站時應使用網址 `chrome.devtools:7331`。

 

**提示**：要恢復正常瀏覽，與開發計算機斷開連接後請務必在您的 Android 設備上還原代理設置。



{# wf_devsite_translation #}
