project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 向shadow-piercing CSS选择器说再见。

{# wf_updated_on: 2017-10-24 #}
{# wf_published_on: 2017-10-24 #}
{# wf_tags: webcomponents,shadowdom,style,css,deprecations,removals #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: 向shadow-piercing CSS选择器说再见。 #}
{# wf_blink_components: Blink>DOM #}

# Chrome 63将删除::shadow 和 /deep/ {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}


在Chrome63之后，你将无法使用shadow-piercing 选择器， `::shadow` 和 `/deep/` 来设计(style) shadow root里面的内容。

- `/deep/` 组合者(combinator)将会成为后代选择器。 `x-foo /deep/ div` 将会当成 `x-foo div`.
- `::shadow` 伪元素(pseudo-element)将不会匹配任何元素。

Note: 如果你的網頁使用Polymer, Polymer團隊已發布了一個[如何讓你迁移](https://www.polymer-project.org/blog/2017-10-18-upcoming-changes.html) `::shadow` 和 `/deep/`的文章。

## 决定删除::shadow 和 /deep/ 的原因

`::shadow` 和 `/deep/` 已经在Chrome 45被弃用了。这是在[2015年4月由Web组件聚会](https://www.w3.org/wiki/Webapps/WebComponentsApril2015Meeting)中的全部的出席者决定的。

目前，shadow-piercing选择器的问题是它违反了封装(encapsulation)以及在某些时候组件无法更改组件的内部实施。

Note: 目前JavaScript API如`querySelector()` 和`querySelectorAll()`会继续支持`::shadow` 和`/deep/`。目前这API的支持[正在在GitHub上讨论](https://github.com/w3c/webcomponents/issues/78)。


[CSS Shadow Parts](https://tabatkins.github.io/specs/css-shadow-parts/)的规范正在被推进为shadow piercing选择器的替代。 Shadow Parts 将会允许组件的开发者公开指定的元素。这将会保留封装(encapsulation) 并允许网页的开发者可以一次过设计(style)多个属性。

## 如果我的网页使用了::shadow and /deep/我应该要怎样呢?

`::shadow` 和 `/deep/` 选择器只会影响旧版的Shadow DOM v0组件。如果您已使用Shadow DOM v1，您不必为您的网页更改任何东西。

您可以使用[Chrome Canary](https://www.google.com/chrome/browser/canary.html)来确认您的网站不会因这更新而导致故障。如果你发现了问题，您可以尝试删除代码中所有的`::shadow` 和 `/deep/`。如果删除这些选择器对您来说太复杂，您可以尝试考虑用shady DOM polyfill来代替native shadow DOM。如果你的网页正在使用native shadow DOM v0，你才要需要做这个改变。

Translated by
{% include "web/_shared/contributors/henrylim.html" %}

{% include "comment-widget.html" %}
