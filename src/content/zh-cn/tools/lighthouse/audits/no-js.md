project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“页面在其脚本不可用时包含一些内容”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-20 #}
{# wf_published_on:2016-09-20 #}

# 页面在其脚本不可用时包含一些内容 {: .page-title }

## 为什么说此审查非常重要{: #why }

[渐进式增强](https://en.wikipedia.org/wiki/Progressive_enhancement)是一个网络开发策略，其确保让尽可能多的目标设备能够访问您的网站。最常见的渐进式增强的定义如下：


基本内容和页面功能应仅依赖最基础的网络技术，以确保页面在所有浏览条件下可用。增强的体验，如使用 CSS 的精细样式设计，或使用 JavaScript 的交互性，可在支持这些技术的浏览器的顶部进行分层。但是基本内容和页面功能不应依赖于 CSS 或 JavaScript。


## 如何通过此审查{: #how }

渐进式增强是一个很大的话题，而且颇具争议性。其中一派认为，为遵循渐进式增强的策略，应对页面进行分层，这样基本内容和功能就只需要 HTML。有关此方法的示例，请参阅[渐进式增强：
概念及使用方式](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)。


另一派则认为，对于许多现代的大型网络应用，这个严格的方法不可行或者说没有必要，并建议在文档 `<head>` 中使用内联关键路径 CSS 以支持特别重要的页面样式。有关此方法的详细信息，请参阅[关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)。




基于上述因素，此 Lighthouse 审查执行一个简单的检查，以确保在停用 JavaScript 时您的页面不会处于空白状态。
您的应用遵循渐进式增强的严格程度是一个争议话题，但人们普遍认为当停用 JavaScript 时，所有页面都应至少显示*一些*信息，即使显示的内容只是提醒用户使用此页面需要 JavaScript。





对于必须绝对依赖 JavaScript 的页面，一种方法是使用一个 [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) 元素，以提醒用户此页面需要 JavaScript。这样好过显示空白页面，因为空白页面会使用户不确定是页面有问题，还是他们的浏览器或计算机出现了问题。




要查看停用 JavaScript 时您的网站的外观和性能，请使用 Chrome DevTools 的[停用 JavaScript](/web/tools/chrome-devtools/settings#disable-js) 功能。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 在页面上停用 JavaScript，然后检查页面的 HTML。如果 HTML 为空，则表示审查失败。
如果 HTML 不为空，则表示通过了审查。



{# wf_devsite_translation #}
