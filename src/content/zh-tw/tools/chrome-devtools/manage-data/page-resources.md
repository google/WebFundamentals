project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:按框架、網域、類型或其他條件組織資源。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 檢查資源 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

按框架、網域、類型或其他條件組織資源。



### TL;DR {: .hide-from-toc }
- 使用 <strong>Application</strong> 面板的 <strong>Frames</strong> 窗格可以按框架組織資源。
- 您也可以在 <strong>Sources</strong> 面板中停用 <strong>Group by folder</strong> 選項，按框架查看資源。
- 要按網域和文件夾查看資源，請使用 <strong>Sources</strong> 面板。
- 在 <strong>Network</strong> 面板中按名稱或其他條件過濾資源。


## 按框架組織資源 {:#frames}

使用 **Application** 面板的 **Frames** 窗格可以按框架組織頁面的資源。


![框架詳情][frames]

* 頂層（上面屏幕截圖中的 `top`）是主文檔。
* 在這下方（例如上面屏幕截圖中的 `widget2`）是主文檔的子框架。
展開一個子框架可以查看源自該框架的資源。

* 子框架下方是圖像、腳本，以及主文檔的其他資源。

* 最後是主文檔本身。

點擊資源可以查看其預覽。

右鍵點擊資源可以在 **Network** 面板中查看、將其在新標籤中打開、複製其網址或將其保存。


![查看資源][resource]

通過在 **Sources** 面板中點擊導航器中的溢出菜單並停用 **Group by folder** 選項以停止按文件夾分組資源，您也可以按框架查看資源。



![Group by folder 分組](imgs/group-by-folder.png)

資源將僅按框架列示。

![無文件夾](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## 按網域和文件夾組織資源 {:#sources}

要查看按網域和目錄組織的資源，請使用 **Sources** 面板。


![Sources 面板](imgs/sources.png)

## 按名稱、類型或其他條件過濾資源 {:#filter}

使用 **Network** 面板可以按名稱、類型和一系列其他條件過濾資源。
參閱下面的指南瞭解詳情。

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
