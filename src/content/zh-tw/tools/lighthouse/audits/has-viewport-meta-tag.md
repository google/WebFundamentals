project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“HTML 具有視口元標記”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# HTML 具有視口元標記 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

如果沒有視口元標記，移動設備將以典型的桌面設備屏幕寬度渲染頁面，然後對頁面進行縮放以適合移動設備屏幕。
通過設置視口，您可以控制視口的寬度和縮放比例。查看以下鏈接可瞭解詳情：



* [配置視口](/speed/docs/insights/ConfigureViewport)。
* [設置視口](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)。

## 如何通過此審查 {: #how }

在 HTML 的 `<head>` 中添加一個視口 `<meta>` 標記。

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

`width=device-width` 鍵值對將視口寬度設置爲設備寬度。
在訪問頁面時，`initial-scale=1` 鍵值對設置初始縮放級別。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 檢查文檔的 `<head>` 中是否有 `<meta name="viewport">` 標記。
它也會檢查此節點是否包含 `content` 屬性，且該屬性值是否包含文本 `width=`。
不過，它不會檢查 `width` 是否等於 `device-width`。
Lighthouse 也不會檢查 `initial-scale` 鍵值對。



{# wf_devsite_translation #}
