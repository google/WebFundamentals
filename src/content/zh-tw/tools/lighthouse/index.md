project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解如何設置 Lighthouse 以審查網絡應用。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-09-27 #}

# 使用 Lighthouse 審查網絡應用 {: .page-title }

[Lighthouse](https://github.com/GoogleChrome/lighthouse) 是一個開源的自動化工具，用於改進網絡應用的質量。
您可以將其作爲一個 Chrome 擴展程序運行，或從命令行運行。
您爲 Lighthouse 提供一個您要審查的網址，它將針對此頁面運行一連串的測試，然後生成一個有關頁面性能的報告。

從此處，您可以失敗的測試爲指示器，看看可以採取哪些措施來改進您的應用。


Note: Lighthouse 目前非常關注 Progressive Web App 功能，如“添加到主屏幕”和離線支持。不過，此項目的首要目標是針對網絡應用質量的各個方面提供端到端審查。

## 使用入門

運行 Lighthouse 的方式有兩種：作爲 Chrome 擴展程序運行，或作爲命令行工具運行。
Chrome 擴展程序提供了一個對用戶更友好的界面，方便讀取報告。
命令行工具允許您將 Lighthouse 集成到持續集成系統。


###  Chrome 擴展程序

下載 Google Chrome 52 或更高版本。

安裝 [Lighthouse Chrome 擴展程序](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)。

轉到您要進行審查的頁面。

點擊位於 Chrome 工具欄上的 Lighthouse 圖標 (![Lighthouse 圖標](images/lighthouse-icon-16.png))。


![Chrome 工具欄上的 Lighthouse 圖標](images/icon-on-toolbar.png)

如果您在工具欄上沒有看到此圖標，它可能隱藏在 Chrome 的主菜單中。


![Chrome 的菜單中的 Lighthouse 圖標](images/icon-in-menu.png)

點擊此圖標後，您應看到一個菜單。

![Lighthouse 菜單](images/menu.png)

如果您想僅運行審查的子集，則點擊 **Options** 按鈕並停用您不關注的審查。
向下滾動並按 **OK** 以確認您的更改。


![Lighthouse 選項菜單](images/options.png)

點擊 **Generate report** 按鈕以針對當前打開的頁面運行 Lighthouse 測試。


在完成審查後，Lighthouse 將打開一個新標籤，並在頁面的結果上顯示一個報告。


![Lighthouse 報告](images/report.png)

### 命令行工具

安裝 [Node](https://nodejs.org)，需要版本 5 或更高版本。

安裝 Lighthouse 作爲一個全局節點模塊。

    npm install -g lighthouse

針對一個頁面運行 Lighthouse 審查。

    lighthouse https://airhorner.com/

傳遞 `--help` 標誌以查看可用的輸入和輸出選項。

    lighthouse --help

## 貢獻

Lighthouse 是一個開放源代碼項目，歡迎大家積極做貢獻。請查看存儲區的[問題跟蹤器](https://github.com/GoogleChrome/lighthouse/issues)查找您可以修復的錯誤，以及您可以創建或改進的審查。此問題跟蹤器也非常適合討論審查指標、新的審查想法或與 Lighthouse 有關的任何其他內容。






{# wf_devsite_translation #}
