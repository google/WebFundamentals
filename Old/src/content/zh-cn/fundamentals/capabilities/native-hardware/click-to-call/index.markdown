---
title: "一键通话"
description: "在有电话功能的设备上，使用户只需点击 电话号码，即可直接联系您，通常称为一键通话。"
updated_on: 2014-10-21
key-takeaways:
  c2c: 
    -  通过 <code>tel:</code> 架构将所有电话号码包含在超链接中。
    -  始终使用国际拨号格式。
comments:
  # 注：如果分区标题或 URL 有更改，则必须更新以下短链接
  - g.co/mobilesiteprinciple12
---

<p class="intro">
  在有电话功能的设备上，使用户只需点击 电话号码，即可直接联系您，通常称为一键通话。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.c2c %}

## 链接电话号码实现一键通话

尽管许多现代移动浏览器将自动检测电话号码
并将其转换为链接，但直接在您的代码中做链接仍是个好方法。
通过手动标记每个电话号码，您可以确保电话号码始终
启用一键通话，并且它们的样式与您的网站相匹配。

要将电话号码标记为链接，可使用 `tel:` 架构。  语法
很简单：

{% highlight html %}
NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>
{% endhighlight %}

产生：

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<img src="images/click-to-call_framed.jpg" class="center" alt="一键通话示例。">

在大多数有电话功能的设备上，在拨打号码之前，用户将收到
确认信息，以确保用户不会
被骗拨打昂贵的长途或收费电话号码。 
当设备不支持电话呼叫时，可以为用户提供一个
菜单，允许他们选择浏览器应如何处理该号码。

不支持语音通话的桌面浏览器将打开计算机上
的默认电话应用，例如 Google Voice 或 Microsoft
Communicator。

## 使用国际拨号格式

始终按国际拨号格式提供电话号码： 
加号 (+)，国家代码，区号和号码。  尽管不是绝对
必要，但用
连字符 (-) 分隔号码的每个分段仍是好方法，可实现更轻松的读取和更好的自动检测。

使用连字符分隔的国际拨号格式可确保无论
用户从哪里呼叫，相距几百米还是几千
公里，都将连接他们的呼叫。

## 必要时禁用自动检测

现代移动浏览器将自动检测电话号码
并启用一键通话。  Mobile Safari 自动将电话号码转换为
带相关超链接样式的链接。  安卓版 Chrome 将自动
检测电话号码，并允许用户点击通话，但是不将其
包装在超链接中，也不应用任何特殊样式。

为防止 Mobile Safari 自动检测电话号码，可将
以下 meta 标记添加到页面顶部：

{% highlight html %}
<meta name="format-detection" content="telephone=no">
{% endhighlight %}

## 其他一键通话功能

除了 `tel:` 架构之外，一些现代浏览器还支持 `sms:`
和 `mms:` 架构，但支持程度不一致，并且一些
功能（如设置消息正文）不一定有用。  

