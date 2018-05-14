project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站在其自身的脚本中不使用 console.time()”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 网站在其自身的脚本中不使用 console.time() {: .page-title }

## 为什么说此审查非常重要{: #why }

如果您使用 `console.time()` 测量页面的性能，请考虑改用 User Timing API。
其优势包括：

* 高分辨率时间戳。
* 可导出的计时数据。
* 与 Chrome DevTools Timeline 相集成。在 Timeline 录制期间调用 User Timing 函数 `performance.measure()` 时，DevTools 自动将此测量结果添加到 Timeline 的结果中，如以下屏幕截图中的 `my custom measurement` 标签中所示。




![Chrome DevTools Timeline 中的 User Timing 测量结果][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## 如何通过此审查{: #how }

在您的报告中，Lighthouse 列出了其在 **URLs** 下找到的 `console.time()` 的每个实例。
将每个调用替换为 `performance.mark()`。如果您要测量在两个标记之间经过的时间，则使用 `performance.measure()`。



请参阅 [User Timing API：了解您的网络应用][html5rocks]以了解如何使用此 API。


[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 报告它从与页面位于同一主机的脚本中发现的 `console.time()` 的每个实例。
来自其他主机的脚本被排除在外，因为 Lighthouse 假定您不能控制这些脚本。因此，您的页面上可能有使用 `console.time()` 的其他脚本，但这些脚本不会显示在您的 Lighthouse 报告中。



{# wf_devsite_translation #}
