project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站使用被动事件侦听器以提升滚动性能”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

# 网站使用被动事件侦听器以提升滚动性能 {: .page-title }

## 为什么说此审查非常重要{: #why }

在您的触摸和滚轮事件侦听器上设置 `passive` 选项可提升滚动性能。


有关概述，请参阅[通过被动事件侦听器提升滚动性能][blog]。


有关技术详细信息，请参阅被动事件侦听器规范中的[说明][explainer]。


[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## 如何通过此审查{: #how }

将 `passive` 标志添加到 Lighthouse 已识别的所有事件侦听器。
一般情况下，将 `passive` 标志添加到每个没有调用 `preventDefault()` 的 `wheel`、`mousewheel`、`touchstart` 和 `touchmove` 事件侦听器。



在支持被动事件侦听器的浏览器中，将侦听器标记为 `passive` 与设置标志一样简单：


    document.addEventListener('touchstart', onTouchStart, {passive: true});

不过，在不支持被动事件侦听器的浏览器中，第三个参数是一个布尔值，以表明此事件是应触发还是采集。因此，使用上面的语法可能会导致意外后果。



如需了解如何安全地实现被动事件侦听器，请参阅[功能检测][polyfill]中的 polyfill。


[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用以下算法标记潜在的被动事件侦听器候选项：


1. 收集页面上的所有事件侦听器。
1. 过滤非触摸和非滚轮侦听器。
1. 过滤调用 `preventDefault()` 的侦听器。
1. 过滤与页面不在同一个主机上的侦听器。


Lighthouse 过滤来自不同主机的侦听器，因为您可能无法控制这些脚本。
因此，请注意，Lighthouse 的审查并不代表您的页面的完整滚动性能。
可能存在损害页面的滚动性能的第三方脚本，但这些不会在您的 Lighthouse 报告中列出。




{# wf_devsite_translation #}
