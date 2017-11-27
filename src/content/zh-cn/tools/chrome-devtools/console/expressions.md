project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:从 DevTools 控制台查看页面上任意项目的状态。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 评估表达式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
从 DevTools 控制台使用它的某个评估功能查看页面上任意项目的状态。

DevTools 控制台让您可通过特定方式了解您页面中的项目状态。通过使用支持 JavaScript 的多个功能，再结合运用您的 JavaScript 知识，评估您可以输入的任何表达式。





### TL;DR {: .hide-from-toc }
- 只需键入表达式即可对其进行评估。
- 使用一个快捷键选择元素。
- 使用  <code>inspect()</code> 检查 DOM 元素和 JavaScript 堆对象。
- 使用 $0 - 4 访问最近选择的元素和对象。


## 查看表达式

按下 <kbd class="kbd">Enter</kbd> 键后，此控制台可评估您提供的任何 JavaScript 表达式。输入表达式后，系统将显示属性名称建议；控制台还会提供自动填充和 Tab 自动补全功能。





如果有多个匹配项，<kbd class="kbd">↑</kbd> 和 <kbd class="kbd">↓</kbd> 在它们之间循环切换。
按 <kbd class="kbd">→</kbd> 键可选择当前建议。如果有一个建议，按 <kbd class="kbd">Tab</kbd> 键选中它。



![控制台中的简单表达式。](images/evaluate-expressions.png)

## 选择元素

使用下列快捷键选择元素：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">快捷键及说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">返回与指定 CSS 选择器匹配的第一个元素。 <code>document.querySelector()</code> 的快捷键。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">返回一个与指定 CSS 选择器匹配的所有元素数组。等同于 <code>document.querySelectorAll()</code>。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">返回一个与指定 XPath 匹配的元素数组。</td>
    </tr>
  </tbody>
</table>

目标选择的示例：

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## 检查 DOM 元素和 JavaScript 堆对象

`inspect()` 函数选取一个 DOM 元素或 JavaScript 引用作为一个参数。如果您提供一个 DOM 元素，则 DevTools 进入“Elements”面板并显示该元素。如果您提供一个 JavaScript 引用，则它进入“Profile”面板。






当此代码在该页面上的控制台中执行时，它会抓取此图并在“Elements”面板上显示它。这会利用到 `$_` 属性以获取最后一个评估的表达式的输出。




    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## 访问最近选择的元素和对象

控制台在变量中存储最后使用的五个元素和对象，以方便访问。使用 $0 - 4 从控制台访问这些元素。请记住，计算机从 0 开始计算，这意味着最新的项目是 $0，最早的项目是 $4。







{# wf_devsite_translation #}
