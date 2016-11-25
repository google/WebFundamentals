project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 为项目选择合适的缓动，无论是缓入、缓出还是缓入缓出。 甚至可能进行弹跳，实现额外的把戏！

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# 选择合适的缓动 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


前面已经讨论了可在动画中实现缓动的各种选项，您应当在项目中使用哪种？您的动画应采用哪种持续时间？

### TL;DR {: .hide-from-toc }
- 为 UI 元素使用缓出动画；Quintic 缓出是一个非常好（虽然比较活泼）的缓动。
- 一定要使用动画持续时间；缓出和缓入应为 200 毫秒 - 500 毫秒，而弹跳和弹性缓动应为更长的持续时间，800 毫秒 - 1200 毫秒。


一般来说，**缓出**将是正确选择，并且必定是很好的默认选择。 它开头较快，使动画有反应快速的感觉，这是受欢迎的，但在结尾有一个不错的减速。

除了在 CSS 中通过`ease-out`关键字指定的公式之外，还有一组知名的缓出公式，它们按其“攻击性”排列。 如需超活泼的缓出效果，可考虑[Quintic 缓出](http://easings.net/#easeOutQuint)。

<img src="images/quintic-ease-out-markers.png" alt="Quintic 缓出动画的曲线。" style="max-width: 300px"/>

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-quintic-ease-out.html">查看 Quintic 缓出动画。</a>

其他缓动公式应谨慎使用，特别是弹跳或弹性缓动，并且仅在适合于项目时才使用。 很少有东西会像不协调的动画那样让用户体验很差。 如果项目不是欢乐有趣的类型，则不要让 UI 元素到处蹦！反过来，如果是制作一个理应欢乐有趣的网站，则想尽办法让它蹦蹦跳！

试试各种缓动，看看哪些与项目的个性匹配，然后以此为起点。 [easings.net](http://easings.net)上可找到完整的缓动类型列表以及演示。

## 选择合适的动画持续时间

给项目添加的任何动画必须有正确的持续时间。 若太短，动画让人感觉有攻击性和突然；若太长，则让人觉得梗阻和讨厌。

* **缓出：约 200 毫秒 - 500 毫秒**。 这让眼睛有机会看到动画，但不会觉得梗阻。
* **缓入：约 200 毫秒 - 500 毫秒**。 记住，它在结尾将晃动，没有时间量变化将缓和这种感觉。
* **弹跳或弹性效果：约 800 毫秒 - 1200 毫秒**。 您需要留出时间让弹性或弹跳效果“停下”。 若没有这点额外时间，动画的弹性跳动部分将让眼睛觉得有攻击性和不愉快。

当然这些只是指南。 用您自己的缓动做试验，然后选择觉得适合于项目的缓动。


