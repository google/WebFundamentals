project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站在其自身的脚本中不使用 Date.now()”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 网站在其自身的脚本中不使用 Date.now() {: .page-title }

## 为什么说此审查非常重要{: #why }

如果您使用 `Date.now()` 测量时间，请考虑改用 `performance.now()`。`performance.now()` 可提供较高的时间戳分辨率，并始终以恒定的速率增加，它不受系统时钟（可以调整或手动倾斜）的影响。




## 如何通过此审查{: #how }

在您的报告中，Lighthouse 列出了其在 **URLs** 下找到的 `Date.now()` 的每个实例。
将每个调用替换为 `performance.now()`。

如需了解此 API 的详细信息，请参阅 [`performance.now()`][MDN]。

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 报告它从与页面位于同一主机的脚本中发现的 `Date.now()` 的每个实例。
来自其他主机的脚本被排除在外，因为 Lighthouse 假定您不能控制这些脚本。因此，您的页面上可能有使用 `Date.now()` 的其他脚本，但这些脚本不会显示在您的 Lighthouse 报告中。



{# wf_devsite_translation #}
