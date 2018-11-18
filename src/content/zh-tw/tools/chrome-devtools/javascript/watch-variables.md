project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools，您可以輕鬆地查看整個應用中的多個變量。

{# wf_published_on:2016-02-11 #}
{# wf_updated_on:2016-02-11 #}

# 在 Sources 中觀察變量 {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

利用 Chrome DevTools，您可以輕鬆地查看整個應用中的多個變量。在 Sources 中觀察變量讓您可以不必使用控制檯，並將精力放在改進代碼上。


Sources 面板讓您可以觀察應用中的變量。此功能位於調試程序邊欄的 Watch 部分。利用此功能，您無需將對象重複記錄到控制檯中。



![調試程序的 Watch 部分](imgs/sources-watch-variables-location.png)

## 添加變量

要將變量添加至觀察列表，請使用此部分標題右側的 Add 圖標。這將打開內嵌輸入窗口，您在這裏提供要觀察的變量名稱。填好後，按 <kbd>Enter</kbd> 鍵將其添加到列表中。



![添加到觀察列表按鈕](imgs/add-variable-to-watch.png)

觀察窗口將顯示變量在添加時的當前值。如果變量未設置或無法找到，值將顯示爲 <samp>&lt;Not Available&gt;</samp>。


![觀察列表中的未定義變量](imgs/undefined-variable-in-watch.png)

## 更新變量

應用繼續操作時，變量值會更改。觀察列表不是變量的實時視圖，除非您正在單步執行。當您使用[斷點](add-breakpoints)單步執行時，觀察值會自動更新。要手動重新檢查列表中的值，請按這一部分標題右側的 Refresh 按鈕。




![刷新觀察變量按鈕](imgs/refresh-variables-being-watched.png)

請求刷新時，將重新檢查當前應用狀態。每個觀察項目都會更新爲當前值。


![所觀察的已更新變量](imgs/updated-variable-being-watched.png)

## 移除變量

爲了確保您觀察的內容儘可能少以加快工作速度，您需要從觀察列表中移除變量。可以將鼠標懸停在變量上，然後點擊右側的移除圖標。


![將鼠標懸停在變量上以從觀察列表中移除](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
