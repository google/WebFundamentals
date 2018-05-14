project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:从 Application 面板检查和删除 Cookie。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 检查和删除 Cookie {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

从 <strong>Application</strong> 面板检查和删除 Cookie。


![Cookies 窗格](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- 查看与 Cookie 有关的详细信息，例如名称、值、网域和大小，等等。
- 删除单个 Cookie、选定网域的 Cookie 或所有网域的全部 Cookie。


## 概览 {:#cookies}

使用 **Cookies** 窗格可以查看和删除 Cookie。您无法修改 Cookie 值。


![Cookies 窗格][cookies]

Cookie 按网域列示。其中包括主文档和所有嵌套的框架。
选择一个“框架组”将显示该组中所有资源、所有框架的所有 Cookie。
请注意，这种分组方式有两个结果：


* 来自不同网域的 Cookie 可能显示在相同的框架组中。
* 相同 Cookie 可能出现在多个框架组中。

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## 字段 {:#fields}

为每个 Cookie 提供了以下字段：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Cookie 字段和说明</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">Cookie 的名称。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">Cookie 的值。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">Cookie 的网域。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">Cookie 的路径。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">Cookie 的过期时间或最长寿命。对于会话 Cookie，此字段始终为“Session”。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">Cookie 的大小（以字节为单位）。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">如果存在，指示应仅在 HTTP 上使用 Cookie，并且不允许 JavaScript 修改。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">如果存在，指示此 Cookie 的通信必须通过加密传输进行。</td>
    </tr>
  </tbody>
</table>

## 删除 Cookie {:#delete}

可以通过多种方式删除 Cookie：

* 选择 Cookie 并按 **Delete** 按钮
(![Delete 按钮][delete]{:.inline}) 可以删除相应 Cookie。
* 按 **Clear** 按钮 (![Clear 按钮][cos]{:.inline}) 可以删除指定框架组的所有 Cookie。

* 右键点击 Cookie 的**Domain**值，然后选择 **Clear all from "..."**（其中 **"..."** 是网域的名称）可以删除来自该网域的所有 Cookie。



[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
