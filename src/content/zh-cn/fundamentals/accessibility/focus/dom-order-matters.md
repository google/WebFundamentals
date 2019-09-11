project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:默认 DOM 顺序的重要性


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# DOM 顺序至关重要 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



使用原生元素对了解焦点行为极有帮助，因为是根据这些元素在 DOM 中的位置自动将它们插入跳格顺序的。



例如，您可能有三个 button 元素，在 DOM 中依次排列。
按 `Tab` 时焦点会按顺序跳至每个按钮。试着点击下面的代码块以移动焦点导航的起点，然后按 `Tab` 在按钮之间循环移动焦点。



    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

不过，必须注意的是，如果使用 CSS，可能会出现 DOM 中存在的顺序与屏幕上出现的顺序不同的情况。
例如，如果使用 `float` 之类的 CSS 属性将一个按钮右移，按钮却是以不同顺序出现在屏幕上。但由于它们在 DOM 中的顺序保持不变，因此跳格顺序同样保持不变。
当用户在页面中循环跳格时，按钮并不是按直观顺序获得焦点。
试着点击下面的代码块以移动焦点导航的起点，然后按 `Tab` 在按钮之间循环移动焦点。



    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

利用 CSS 更改元素在屏幕上的视觉位置时要小心。这可能使跳格顺序看似随机般地四处乱跳，令依赖键盘的用户感到困惑。因此，Web AIM 检查清单[在第 1.3.2 节](http://webaim.org/standards/wcag/checklist#sc1.3.2){: .external }规定，由代码顺序决定的读取和导航顺序应直观并合乎逻辑。




一般来说，应时常试着在页面中循环跳格，这完全是为了确保您没有无意中弄乱了跳格顺序。
这是个值得养成的好习惯，并且也不会增加多少工作量。


## 屏幕外内容
如果有当前并未显示但仍需包含在 DOM 中的内容（例如自适应侧边导航），该怎么办？
如果您有这种位于屏幕之外时获得焦点的元素，当用户在页面中循环跳格时，看起来就好像焦点消失后又再次出现，这显然不是您想要的效果。理想情况下，我们应该防止面板在位于屏幕之外时获得焦点，只允许它在用户可以与其进行交互时获得焦点。



![一个可能会偷走焦点的屏幕外滑入式面板](imgs/slide-in-panel.png)

有时，您需要做点侦探工作才能搞清楚焦点的下落。
可以利用控制台中的 `document.activeElement` 来了解当前获得焦点的元素。


知道哪一个屏幕外元素获得了焦点后，就可以将其设置为 `display: none` 或 `visibility: hidden`，然后恢复其原来的设置 `display: block` 或 `visibility: visible`，最后再显示给用户。



![设置为不显示任何内容的滑入式面板](imgs/slide-in-panel2.png)

![设置为显示区块的滑入式面板](imgs/slide-in-panel3.png)

一般而言，我们鼓励开发者在每次发布前在网站上循环跳格，确保跳格顺序不会消失或不按逻辑顺序地乱跳。如果存在问题，则应确保使用 `display: none` 或 `visibility: hidden` 正确隐藏了屏幕外内容，或者重新安排元素在 DOM 中的物理位置，使它们按逻辑顺序排列。





{# wf_devsite_translation #}
