project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在有电话功能的设备上，使用户只需点击电话号码，即可直接联系您，通常称为一键通话。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2014-06-17 #}

# 一键通话 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

在有电话功能的设备上，使用户只需点击电话号码，即可直接联系您，通常称为一键通话。


### TL;DR {: .hide-from-toc }

* 通过  <code>tel:</code> 架构将所有电话号码包含在超链接中。
* 始终使用国际拨号格式。


## 链接电话号码实现一键通话

尽管许多现代移动浏览器将自动检测电话号码并将其转换为链接，但直接在您的代码中做链接仍是个好方法。通过手动标记每个电话号码，您可以确保电话号码始终启用一键通话，并且它们的样式与您的网站相匹配。




要将电话号码标记为链接，可使用 `tel:` 架构。语法很简单：



    NIST Telephone Time-of-Day Service 
    <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

此语法在浏览器中是这样呈现的：

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<div class="attempt-right">
  <figure>
    <img src="images/click-to-call_framed.jpg" >
    <figcaption>一键通话示例</figcaption>
  </figure>
</div>

在大多数有电话功能的设备上，在拨打号码之前，用户都会收到确认信息，以确保用户不会被骗拨打昂贵的长途或收费电话号码。当设备不支持电话呼叫时，可以为用户提供一个菜单，允许他们选择浏览器应如何处理该号码。


不支持语音通话的桌面浏览器将打开计算机上的默认电话应用，例如 Google 语音或 Microsoft Communicator。



## 使用国际拨号格式

始终按国际拨号格式提供电话号码：加号 (`+`)、国家/地区代码、区号和号码。
尽管不是绝对必要，但用连字符 (`-`) 分隔号码的每个分段仍是好方法，可实现更轻松的读取和更好的自动检测。



使用连字符分隔的国际拨号格式可确保无论用户从哪里呼叫，相距几百米还是几千公里，都将连接他们的呼叫。



## 必要时停用自动检测

现代移动浏览器会自动检测电话号码并启用一键通话。
Mobile Safari 自动将电话号码转换为带相关超链接样式的链接。
Chrome（Android 版）会自动检测电话号码，并允许用户一键通话，但是不会将电话号码包装在超链接中，也不会应用任何特殊样式。



为防止 Mobile Safari 自动检测电话号码，可将以下元标记添加到页面顶部：



    <meta name="format-detection" content="telephone=no">


## 其他一键通话功能

除了 `tel:` 架构之外，一些现代浏览器还支持 `sms:` 和 `mms:` 架构，但支持程度不一致，并且一些功能（如设置消息正文）不一定有用。

 


{# wf_devsite_translation #}
