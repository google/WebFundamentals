project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 向shadow-piercing CSS選擇器說再見。

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-10-24 #}
{# wf_tags: webcomponents,shadowdom,style,css,deprecations,removals #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: 向shadow-piercing CSS選擇器說再見。 #}
{# wf_blink_components: Blink>DOM #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Chrome 63將刪除::shadow 和 /deep/ {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}

在Chrome63之後，你將無法使用shadow-piercing 選擇器， `::shadow` 和 `/deep/` 來設計(style) shadow root裡面的內容。

- `/deep/` 组合者(combinator)將會成為後代選擇器。 `x-foo /deep/ div` 將會當成 `x-foo div`.
- `::shadow` 偽元素(pseudo-element)將不會匹配任何元素。

注：如果你的網頁使用Polymer, Polymer團隊已發布了一個[如何讓你遷移](https://www.polymer-project.org/blog/2017-10-18-upcoming-changes.html) `::shadow` 和 `/deep/`的文章。

## 決定刪除::shadow 和 /deep/ 的原因

`::shadow` 和 `/deep/` 已經在Chrome 45被棄用了。這是在[2015年4月由Web組件聚會](https://www.w3.org/wiki/Webapps/WebComponentsApril2015Meeting)中的全部的出席者決定的。

目前，shadow-piercing選擇器的問題是它違反了封裝(encapsulation)以及在某些時候組件無法更改組件的內部實施。

Note: 目前JavaScript API如`querySelector()` 和 `querySelectorAll()`會繼續支持`::shadow` 和 `/deep/`。目前這API的支持[正在在GitHub上討論](https://github.com/w3c/webcomponents/issues/78)。

[CSS Shadow Parts](https://tabatkins.github.io/specs/css-shadow-parts/)的規範正在被推進為shadow piercing選擇器的替代。Shadow Parts 將會允許組件的開發者公開指定的元素。這將會保留封裝(encapsulation) 並允許網頁的開發者可以一次過設計(style)多個屬性。

## 如果我的網頁使用了::shadow and /deep/我應該要怎樣呢?

`::shadow` 和 `/deep/` 選擇器只會影響舊版的Shadow DOM v0組件。如果您已使用Shadow DOM v1，您不必為您的網頁更改任何東西。

您可以使用[Chrome Canary](https://www.google.com/chrome/browser/canary.html)來確認您的網站不會因這更新而導致故障。如果你發現了問題，您可以嘗試刪除代碼中所有的`::shadow` 和 `/deep/`。如果刪除這些選擇器對您來說太複雜，您可以嘗試考慮用shady DOM polyfill來代替native shadow DOM。如果你的網頁正在使用native shadow DOM v0，你才要需要做這個改變。

## 更多信息

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/HX5Y8Ykr5Ns/discussion) |
[Chromestatus Tracker](https://www.chromestatus.com/feature/6750456638341120) |
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=489954)

{% include "comment-widget.html" %}
