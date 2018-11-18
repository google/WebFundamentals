project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Polymer Starter Kit。

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

# Polymer Starter Kit {: .page-title }

[下載 Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## 什麼是 Polymer Starter Kit？

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external } 是使用抽屜式導航欄佈局進行構建應用的開始點。
佈局由 `app-layout` 元素提供。


此模板，以及 `polymer-cli` 工具鏈，也說明了“PRPL 模式”的使用。此模式允許快先交付和與用戶請求的初始路由中的內容進行交互，還有快速後續的通過預先緩存此應用所需的剩餘組件的導航，並當用戶在應用中導航時，按需逐步地加載它們。





PRPL 模式概括：

* **推送**初始路由需要的組件
* 儘快**呈現**初始路由
* 爲其餘路由**預緩存**組件
* **延遲加載**並逐步按需升級下一批路由

### 從 Polymer Starter Kit v1 遷移？

[請查看我們關於 PSK2 中的更改以及如何遷移的博文！](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

## 設置

### 先決條件

安裝 [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### 在模板中初始化項目

    mkdir my-app
    cd my-app
    polymer init starter-kit

### 啓動開發服務器

此命令在 `http://localhost:8080` 中服務於此應用，併爲此應用提供基本的網址路由：


    polymer serve --open


### 版本號

此命令在應用依賴關係中執行 HTML、CSS 和 JS 縮減，並在 `polymer.json` 中指定的進入點和片段的基礎上生成一個帶有預緩存依賴關係代碼的 service-worker.js 文件。縮減的文件將輸出到 `build/unbundled` 文件夾，且適用於從 HTTP/2+Push 兼容性服務器中提供服務。





此外，此命令還創建了一個後備 `build/bundled` 文件夾，使用片段捆綁生成，適用於從非 H2/push 兼容性服務器提供服務或適用於不支持 H2/Push 的客戶端。



    polymer build

### 預覽此版本

此命令在 `http://localhost:8080` 中提供了此應用未捆綁狀態的縮減版本，因爲其由兼容的 push 服務器提供服務：


    polymer serve build/unbundled

此命令在 `http://localhost:8080` 中提供了此應用縮減版本，使用片段捆綁生成：


    polymer serve build/bundled

### 運行測試

此命令將針對機器上當前安裝的瀏覽器運行[網絡組件測試程序](https://github.com/Polymer/web-component-tester){: .external }。



    polymer test

### 添加新視圖

您可以通過添加更多按需加載的視圖來擴展應用，例如，以路由爲基礎，或逐步呈現此應用程序的非關鍵部分。每一個新的按需加載的片段都應添加到所包含 `polymer.json` 文件中的 `fragments` 列表。
這將確保那些組件及其依賴關係會被添加到預緩存的組件列表內（也將會在後備 `bundled` 版本中創建捆綁）。



## 後續步驟

查看[入門指南](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }

## 瞭解詳情

如需瞭解詳細信息、查看代碼，提交問題或參與其中，請查看我們在 [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external } 上提供的 Git 存儲區



{# wf_devsite_translation #}
