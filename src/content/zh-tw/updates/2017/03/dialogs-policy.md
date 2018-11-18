project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 阻斷式的 JavaScript 彈窗經常（並且不幸地）被用來傷害用戶。鑑於此，Chromium 團隊強烈建議你別再使用了。

{# wf_updated_on: 2017-03-24 #}
{# wf_published_on: 2017-03-24 #}
{# wf_tags: policy,dialog,javascript #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: 阻斷式的 JavaScript 彈窗經常（並且不幸地）被用來傷害用戶。鑑於此，Chromium 團隊強烈建議你別再使用了。 #}

# Chromium 的彈窗機制 {: .page-title }

## JavaScript 彈窗的歷史

JavaScript 誕生於1995年，在最初的版本里便包含了三個掛載到 window 對象上的彈窗方法 
[`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)，
[`confirm()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)，
和 [`prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)。

這種阻斷式的彈窗 API 在當時是沒有問題的，但在異步操作流行的今天便不合時宜了。因爲
JavaScript 引擎需要中斷執行來等待用戶的反饋，關鍵這個彈窗是原生的還不是網頁裏的。
正因爲是原生的彈窗，所以經常被利用來
[傷害](https://twitter.com/fugueish/status/702684718303588352)
[我們的](https://blog.malwarebytes.org/fraud-scam/2016/02/tech-support-scammers-use-new-browser-trick-to-defeat-blocking/)
[用戶](https://blog.malwarebytes.com/cybercrime/2013/12/android-pop-ups-warn-of-infection/)。

鑑於此，Chromium 團隊強烈建議你不要使用這類彈窗。

## 替代方案

對於彈窗需求其實我們有很多其他的選擇。

對於 `alert()/confirm()/prompt()` 我們有很多替代的選擇。 譬如需要彈個通知消息時（日曆應用）可以用
[Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)。
獲取用戶輸入可以用
[HTML 中的 &lt;dialog&gt; 元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
。 對於 XSS proofs-of-concept 則可用 `console.log(document.origin)`。

至於 `onbeforeunload` 這個事件，它*已經*變得不可靠了。正如 Ilya Grigorik 
[所指出的那樣](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/)，
“在移動端平臺上，你*不能指望* `pagehide`，`beforeunload` 和 `unload` 這些事件會被觸發。”
如果想在此類情況下保存一些數據，可以用
[Page Visibility API](https://w3c.github.io/page-visibility/#introduction)。

## 變更

[Chrome 51](https://www.chromestatus.com/feature/5349061406228480)
中移除了對  `onbeforeunload` 的支持。（Safari 9.1 and in Firefox 4 中也移除了的。）

對 `alert()/confirm()/prompt()` 的表現進行了改變。不再作爲頂級的原生彈窗而存在，[當彈窗所在的瀏覽器標籤被切走後，
他們會自動消失](https://crbug.com/629964)。
(Safari 9.1 已經這樣做了。) 這個變更在 canary 和 dev 版本中全部開啓，
而在 beta 和穩定版中則是部分開啓，但在之後肯定是會全部開啓的。

對於 `beforeunload` 彈窗，目前的計劃是必需有用戶有相應的交互才讓它顯示。（但 `beforeunload` 事件的廣播不會受影響。）
這使得 Chromium 在表現上和 Firefox 統一了，後者在 [Firefox 44](https://bugzilla.mozilla.org/show_bug.cgi?id=636905) 
中做了此項修改。

由於以上這些變更，如果你的站點中使用了彈窗，我們強烈建議你使用上文中提到的備選方案，以免功能受到影響。

{% include "comment-widget.html" %}