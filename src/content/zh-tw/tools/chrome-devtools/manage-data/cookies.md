project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:從 Application 面板檢查和刪除 Cookie。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 檢查和刪除 Cookie {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

從 <strong>Application</strong> 面板檢查和刪除 Cookie。


![Cookies 窗格](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- 查看與 Cookie 有關的詳細信息，例如名稱、值、網域和大小，等等。
- 刪除單個 Cookie、選定網域的 Cookie 或所有網域的全部 Cookie。


## 概覽 {: #cookies}

使用 **Cookies** 窗格可以查看和刪除 Cookie。您無法修改 Cookie 值。


![Cookies 窗格][cookies]

Cookie 按網域列示。其中包括主文檔和所有嵌套的框架。
選擇一個“框架組”將顯示該組中所有資源、所有框架的所有 Cookie。
請注意，這種分組方式有兩個結果：


* 來自不同網域的 Cookie 可能顯示在相同的框架組中。
* 相同 Cookie 可能出現在多個框架組中。

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## 字段 {:#fields}

爲每個 Cookie 提供了以下字段：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Cookie 字段和說明</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">Cookie 的名稱。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">Cookie 的值。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">Cookie 的網域。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">Cookie 的路徑。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">Cookie 的過期時間或最長壽命。對於會話 Cookie，此字段始終爲“Session”。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">Cookie 的大小（以字節爲單位）。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">如果存在，指示應僅在 HTTP 上使用 Cookie，並且不允許 JavaScript 修改。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">如果存在，指示此 Cookie 的通信必須通過加密傳輸進行。</td>
    </tr>
  </tbody>
</table>

## 刪除 Cookie {: #delete}

可以通過多種方式刪除 Cookie：

* 選擇 Cookie 並按 **Delete** 按鈕
(![Delete 按鈕][delete]{:.inline}) 可以刪除相應 Cookie。
* 按 **Clear** 按鈕 (![Clear 按鈕][cos]{:.inline}) 可以刪除指定框架組的所有 Cookie。

* 右鍵點擊 Cookie 的**Domain**值，然後選擇 **Clear all from "..."**（其中 **"..."** 是網域的名稱）可以刪除來自該網域的所有 Cookie。



[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
