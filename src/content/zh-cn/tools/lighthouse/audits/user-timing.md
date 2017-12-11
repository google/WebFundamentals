project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“User Timing 标记和测量结果”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-10-06 #}
{# wf_published_on:2016-10-06 #}

# User Timing 标记和测量结果 {: .page-title }

## 为什么说此审查非常重要{: #why }

您可以通过 User Timing API 测量您的应用的 JavaScript 性能。基本思路是您决定您要优化的脚本部分，然后使用 User Timing API 测量脚本的这些部分。从此处，您可以使用此 API 访问来自 JavaScript 的结果，或在您的 [Chrome DevTools Timeline 录制](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)上查看它们。



## 如何通过此审查{: #how }

此审查不采用“通过”或“未通过”测试这种结构。它只是让您有机会发现可帮助您测量应用性能的实用性 API。Lighthouse 针对此审查报告的分数与它在您的应用中发现的 User Timing 标记和测量结果的数量相对应。


如果您的应用包含 User Timing 标记和测量结果，您将在您的 Lighthouse 报告中看到这些标记和测量结果。


有关使用 User Timing API 测量应用的 JavaScript 性能的简介，请查看 [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 从 Chrome 的 Trace Event Profiling Tool 中提取 User Timing 数据。


{# wf_devsite_translation #}
