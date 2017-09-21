project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:为项目选择合适的缓动，无论是缓入、缓出还是缓入缓出。或许还可使用弹跳方式获取更多乐趣！

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 选择合适的缓动 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

前面已经讨论了可在动画中实现缓动的各种选项，您应当在项目中使用哪种？您的动画应采用哪种持续时间？

### TL;DR {: .hide-from-toc }
* 为 UI 元素使用缓出动画；Quintic 缓出是一个非常好（虽然比较快速）的缓动。
* 一定要使用动画持续时间；缓出和缓入应为 200 毫秒 - 500 毫秒，而弹跳和弹性缓动的持续时间应更长，为 800 毫秒 - 1200 毫秒。


<img src="images/quintic-ease-out-markers.png" alt="Quintic 缓出动画的曲线。" style="max-width: 300px" class="attempt-right"/>

一般来说，**缓出**将是正确的选择，当然也是很好的默认选择。它开头较快，使动画有反应快速的感觉，这一点很受欢迎，但在结尾有一个不错的减速。

除了在 CSS 中通过 `ease-out` 关键字指定的公式之外，还有一组知名的缓出公式，它们按其“攻击性”排列。想要快速的缓出效果，请考虑 [Quintic 缓出](http://easings.net/#easeOutQuint)。


[查看 Quintic 缓出动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

其他缓动公式应谨慎使用，特别是弹跳或弹性缓动，并且仅在适合于项目时才使用。很少有东西会像不协调的动画那样让用户体验很差。如果您的项目不是为了追求乐趣，那么就无需使元素在 UI 周围进行弹跳。相反，如果您将要创建一个轻松欢乐的网站，那么请务必使用弹跳！

试试各种缓动，看看哪些与项目的个性匹配，然后以此为起点。关于缓动类型的完整列表及其演示，请参阅 [easings.net](http://easings.net)。

## 选择合适的动画持续时间

给项目添加的任何动画均须有正确的持续时间。若太短，动画让人感觉有攻击性和突然；若太长，则让人觉得很卡和讨厌。

* **缓出：约 200 毫秒 - 500 毫秒**。这让眼睛有机会看到动画，但不会觉得卡顿。
* **缓入：约 200 毫秒 - 500 毫秒**。请记住，它在结尾将晃动，没有时间量变化将缓和这种影响。
* **弹跳或弹性效果：约 800 毫秒 - 1200 毫秒**。您需要留出时间让弹性或弹跳效果“停下”。若没有这点额外时间，动画的弹性跳动部分看上去比较有攻击性，让人感觉不舒服。

当然，这些只是指导原则。用您自己的缓动做试验，然后选择觉得适合于项目的缓动。




{# wf_devsite_translation #}
