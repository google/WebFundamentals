---
title: "不添加任何图片"
description: "有时，最好的图片并不真是图片。如果可以，请使用浏览器的原生功能实现相同或类似的效果。"
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - 如果可以，请避免使用图片，而改为利用浏览器自身的功能呈现阴影、渐变、圆角及其他效果。
---

<p class="intro">
  有时，最好的图片并不真是图片。如果可以，请使用浏览器的原生功能实现相同或类似的效果。浏览器可以生成之前需要图片才能生成的视觉效果。这意味着，浏览器不再需要下载单独的图片文件了，而且还能避开图片缩放的糟糕问题。图标可以使用 unicode 或特殊的图标字体来呈现。
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## 将文字放在标记内，而不要嵌入图片内

如果可以，文字要单独放置，而不要嵌入图片内（例如将图片用作标题，或直接在图片中放入电话号码或地址等联系信息），否则用户将无法复制并粘贴相应信息，屏幕阅读器也无法识别这些信息，而且这些内容无法自动调整。请改为将文字放在标记中，并在必要时使用网络字体以获得所需的样式。

## 使用 CSS 替换图片

现代浏览器可以使用 CSS 功能创建之前需要图片才能实现的样式。例如，复杂的渐变可以使用 <code>background</code> 属性创建，阴影可以使用 <code>box-shadow</code> 创建，而圆角可以使用 <code>border-radius</code> 属性添加。

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

请注意，使用这些方法需要渲染时间，这一点在移动设备上非常重要。如果过度使用，您会失去您可能已经获得的好处，而且可能会降低页面性能。



