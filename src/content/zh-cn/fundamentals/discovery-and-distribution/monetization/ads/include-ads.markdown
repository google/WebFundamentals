---
title: "在您的网站中添加 AdSense 广告"
description: "按照本指南中的步骤，了解如何在您的网站中添加广告。创建 AdSense 帐户、创建广告单元、将广告单元放入您的网站，然后配置付款设置并获得收益。"
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - 要创建 AdSense 帐户，您必须年满 18 周岁，具有 Google 帐户和地址。
    - 提交某个应用之前，您的网站必须已上线，而且网站内容必须符合 AdSense 政策。
    - 创建自适应广告单元，以确保您的广告适合用户查看广告所用的任何设备。
    - 验证付款设置后，就可以坐等收钱了。
notes:
  crawler:
    - 确保您没有阻止 AdSense 抓取工具访问自己的网站（请参阅<a href="https://support.google.com/adsense/answer/10532">此帮助主题</a>）。
  body:
    - 将所有广告代码粘贴到正文标记内；否则广告将无法运行。
  smarttag:
    - 您生成的每个广告都将具有唯一的 <code>data-ad-client</code> 和 <code>data-ad-slot</code>。
    - 所生成的广告代码中的 <code>data-ad-format=auto</code> 代码可为自适应广告单元启用智能确定尺寸行为。
---

<p class="intro">
  按照本指南中的步骤，了解如何在您的网站中添加广告。创建 AdSense 帐户、创建广告单元、将广告单元放入您的网站，然后配置付款设置并获得收益。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 构建包含广告的示例网页

根据本指南，您将使用 Google AdSense 和网站制作起始套件构建包含自适应广告的简单网页：

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="同时在桌面设备和移动设备上投放广告的示例网站">

如果您不熟悉网站制作起始套件，请参阅[设置网站制作起始套件]({{site.fundamentals}}/tools/setup/setup_kit.html)文档。

为了将广告添加到您的网站并获取收益，您需要按照下面的几个简单步骤进行操作：

1. 创建 AdSense 帐户。
2. 创建广告单元。
3. 将广告单元放入网页。
4. 配置付款设置。

## 创建 AdSense 帐户
为了在您的网站上投放广告，您需要一个有效的 AdSense 帐户。如果您还没有此类帐户，则需要[创建一个](https://www.google.com/adsense/)，并接受 AdSense 服务条款。创建帐户时，您需要验证以下事项：

* 您已年满 18 周岁，且拥有经过验证的 Google 帐户。
* 您拥有符合 
[Google AdSense 合作规范](https://support.google.com/adsense/answer/48182)的在线网站或其他在线内容，且广告托管在此网站上。
* 您拥有与银行帐户相关联的邮政地址和邮寄地址，以便能够接收款项。

## 创建广告单元

广告单元是由于您为网页添加 JavaScript 而显示在网页上的一组广告。您可以使用以下三个选项调整广告单元尺寸：

* **[自适应（推荐）](https://support.google.com/adsense/answer/3213689)**。
* [预定义](https://support.google.com/adsense/answer/6002621)。
* [自定义尺寸](https://support.google.com/adsense/answer/3289364)。

您正在创建自适应网站；使用自适应广告单元。
自适应广告会根据设备大小和父容器的宽度自动调整大小。
自适应广告适合自适应版式，从而确保您的网站在所有设备上均具有良好的呈现效果。

如果您不使用自适应广告单元，那么，您必须编写更多代码来控制广告在用户设备上的显示方式。即使您必须指定广告单元的确切尺寸，也可可以在[高级模式]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough)下使用自适应广告单元。

为了简化您的代码，并节省时间和减少工作，自适应广告代码会自动调整广告单元尺寸，使其适合您的网页版式。
代码会根据广告单元父容器的宽度动态计算所需的尺寸，然后选择最适合此容器的广告尺寸。
例如，宽度为 360 像素且针对移动设备优化过的网站可能会展示 320x50 的广告单元。

跟踪 Google AdSense [广告尺寸指南](https://support.google.com/adsense/answer/6002621#top)中当前[效果最好的广告尺寸](https://support.google.com/adsense/answer/6002621#top)。

### 要创建自适应广告单元，请执行以下操作：

1. 访问['我的广告'标签](https://www.google.com/adsense/app#myads-springboard)。
2. 点击 <strong>+新建广告单元</strong>。
3. 为您的广告单元输入唯一名称。该名称会显示在粘贴到网站内的广告代码中，因此应使用描述性名称。
4. 从'广告尺寸'下拉菜单中选择<strong>自适应</strong>。
5. 从'广告类型'下拉菜单中选择<strong>文字和展示广告</strong>。
6. 点击<strong>保存并获取代码</strong>。
7. 在显示的<strong>广告代码</strong>框中，从'模式'下拉菜单中选择<strong>智能确定尺寸（推荐）</strong>选项。
这是推荐的模式且不需要您对广告代码做出任何更改。

创建广告单元后，AdSense 会提供要纳入您的网站的一段代码，这段代码与下面的代码类似：

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## 在您的网站中添加广告单元

要在网页中添加广告，我们需要将系统提供的 AdSense 代码段粘贴到标记中。如果您想添加多个广告，则可以重复使用同一广告单元，或创建多个广告单元。

1. 打开 app 文件夹中的 index.html。
2. 将提供的代码段粘贴到 main 标记中。
3. 保存该文件并尝试在浏览器中进行查看，然后尝试通过移动设备或 Chrome 模拟器打开该文件。

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="同时在桌面设备和移动设备上投放广告的示例网站">
    <br>
    试用
  </a>
</div>

## 配置付款设置

想知道您的 AdSense 付款何时到帐？ 想弄明白您会在本月还是下个月收到款项？ 确保您已完成以下所有步骤：

1. 在[收款人资料](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE)中验证您已提供了必需的所有纳税信息。
2. 确认您的收款人姓名和地址是否正确。
3. 在['付款设置'页面](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS)中选择您的付款方式。
4. 输入您的[个人身份号码（PIN 码）](https://support.google.com/adsense/answer/157667)。该 PIN 码会验证您帐户信息的准确性。
5. 检查您的余额是否达到了[付款阈值](https://support.google.com/adsense/answer/1709871)。

如有其他问题，请参阅 [AdSense 付款简介](https://support.google.com/adsense/answer/1709858)。


