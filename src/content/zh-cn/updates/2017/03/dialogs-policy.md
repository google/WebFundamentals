project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 阻断式的 JavaScript 弹窗经常（并且不幸地）被用来伤害用户。鉴于此，Chromium 团队强烈建议你别再使用了。

{# wf_updated_on: 2017-03-24 #}
{# wf_published_on: 2017-03-24 #}
{# wf_tags: policy,dialog,javascript #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: 阻断式的 JavaScript 弹窗经常（并且不幸地）被用来伤害用户。鉴于此，Chromium 团队强烈建议你别再使用了。 #}

# Chromium 的弹窗机制 {: .page-title }

## JavaScript 弹窗的历史

JavaScript 诞生于1995年，在最初的版本里便包含了三个挂载到 window 对象上的弹窗方法 
[`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)，
[`confirm()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)，
和 [`prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)。

这种阻断式的弹窗 API 在当时是没有问题的，但在异步操作流行的今天便不合时宜了。因为
JavaScript 引擎需要中断执行来等待用户的反馈，关键这个弹窗是原生的还不是网页里的。
正因为是原生的弹窗，所以经常被利用来
[伤害](https://twitter.com/fugueish/status/702684718303588352)
[我们的](https://blog.malwarebytes.org/fraud-scam/2016/02/tech-support-scammers-use-new-browser-trick-to-defeat-blocking/)
[用户](https://blog.malwarebytes.com/cybercrime/2013/12/android-pop-ups-warn-of-infection/)。

鉴于此，Chromium 团队强烈建议你不要使用这类弹窗。

## 替代方案

对于弹窗需求其实我们有很多其他的选择。

对于 `alert()/confirm()/prompt()` 我们有很多替代的选择。 譬如需要弹个通知消息时（日历应用）可以用
[Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)。
获取用户输入可以用
[HTML 中的 &lt;dialog&gt; 元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
。 对于 XSS proofs-of-concept 则可用 `console.log(document.origin)`。

至于 `onbeforeunload` 这个事件，它*已经*变得不可靠了。正如 Ilya Grigorik 
[所指出的那样](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/)，
“在移动端平台上，你*不能指望* `pagehide`，`beforeunload` 和 `unload` 这些事件会被触发。”
如果想在此类情况下保存一些数据，可以用
[Page Visibility API](https://w3c.github.io/page-visibility/#introduction)。

## 变更

[Chrome 51](https://www.chromestatus.com/feature/5349061406228480)
中移除了对  `onbeforeunload` 的支持。（Safari 9.1 and in Firefox 4 中也移除了的。）

对 `alert()/confirm()/prompt()` 的表现进行了改变。不再作为顶级的原生弹窗而存在，[当弹窗所在的浏览器标签被切走后，
他们会自动消失](https://crbug.com/629964)。
(Safari 9.1 已经这样做了。) 这个变更在 canary 和 dev 版本中全部开启，
而在 beta 和稳定版中则是部分开启，但在之后肯定是会全部开启的。

对于 `beforeunload` 弹窗，目前的计划是必需有用户有相应的交互才让它显示。（但 `beforeunload` 事件的广播不会受影响。）
这使得 Chromium 在表现上和 Firefox 统一了，后者在 [Firefox 44](https://bugzilla.mozilla.org/show_bug.cgi?id=636905) 
中做了此项修改。

由于以上这些变更，如果你的站点中使用了弹窗，我们强烈建议你使用上文中提到的备选方案，以免功能受到影响。

{% include "comment-widget.html" %}