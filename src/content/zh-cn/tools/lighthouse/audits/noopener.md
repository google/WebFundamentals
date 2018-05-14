project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站使用 rel="noopener" 打开外部锚”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

# 网站使用 rel="noopener" 打开外部锚 {: .page-title }

## 为什么说此审查非常重要{: #why }

当您的页面链接至使用 `target="_blank"` 的另一个页面时，新页面将与您的页面在同一个进程上运行。
如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。


此外，`target="_blank"` 也是一个安全漏洞。新的页面可以通过 `window.opener` 访问您的窗口对象，并且它可以使用 `window.opener.location = newURL` 将您的页面导航至不同的网址。



如需了解详细信息，请参阅 [rel=noopener 的性能优势][jake]。

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## 如何通过此审查{: #how }

将 `rel="noopener"` 添加至 Lighthouse 在您的报告中识别的每个链接。
一般情况下，当您在新窗口或标签中打开一个外部链接时，始终添加 `rel="noopener"`。


    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用以下算法将链接标记为 `rel="noopener"` 候选项：


1. 收集所有包含属性 `target="_blank"`、但不包含属性 `rel="noopener"` 的 `<a>` 节点。
1. 过滤任何主机相同的链接。


由于 Lighthouse 会过滤主机相同的链接，因此，如果您处理大型网站，则会出现您可能需要注意的边缘情况。
如果您的页面在未使用 `rel="noopener"` 的情况下打开一个指向网站另一个区域的链接，则此审查的性能影响仍然适用。不过，在您的 Lighthouse 结果中您不会看到这些链接。



{# wf_devsite_translation #}
