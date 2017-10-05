project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Google 和 AnswerLab 进行的一项研究对用户与各类移动网站的交互方式做了调查。其目标是回答一个问题，‘怎样才算出色的移动网站？’

{# wf_published_on:2014-08-08 #}
{# wf_updated_on:2015-09-17 #}

# 怎样才算出色的移动网站？ {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google 和 AnswerLab 执行了一项[调查研究](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals)来回答这一问题。 

> 移动用户具有很强的目标导向。他们期望能够根据自身情况立即获得所需内容。
 

这项研究是通过与美国参与者进行长达 119 小时的亲自易用性实验来完成的。
研究要求参与者在各类移动网站上执行关键任务。iOS 和 Android 用户都包括在内，用户在其自己的手机上测试网站。对于每个网站，研究都要求参与者在完成侧重于转化的任务（如购物或预订）时明确表达自己的想法。



这项研究发现了 25 个移动网站设计原则，并将它们分成五个类别。


## 首页和网站导航

成功：让您的移动首页侧重于将用户与他们要寻找的内容联系起来。

### 让吸引注意力的元素前置居中

通过[菜单](/web/fundamentals/design-and-ux/responsive/)或“首屏线以下空间”（网页中不向下滚动便无法看到的部分）提供二级任务。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>宜</b>：将用户所有最常见的任务安排在便于访问的位置。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>忌</b>：使用“了解详情”之类含糊的吸引注意力的元素浪费宝贵的首屏空间。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 让菜单保持简短和亲切

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>宜</b>：让菜单保持简短和亲切。</figcaption>

  </figure>
</div>

移动用户没有耐心通过浏览冗长的选项列表查找自己需要的内容。
请重新组织您的菜单，在不牺牲易用性的情况下尽可能减少菜单项。


<div style="clear:both;"></div>

### 简化返回首页的操作

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>宜</b>：简化返回首页的操作。</figcaption>

  </figure>
</div>

用户期望在其点按移动页面左上角的徽标时能够返回首页，如果未提供该徽标或者徽标不起作用，会令他们感到失望。


<div style="clear:both;"></div>

### 别让推广信息喧宾夺主

大型应用安装插页广告（例如，隐藏内容并提示用户安装应用的整页推广信息）令用户反感，让他们难以执行任务。除了让用户反感外，使用应用安装插页广告的网站还无法通过 [Google 移动易用性测试](https://search.google.com/test/mobile-friendly)，这可能对其搜索排名产生不良影响。




<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>宜</b>：推广信息应能轻松关闭，并且不应让用户在使用网站时分心。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>忌</b>：插页广告（有时称作关门广告）常常令用户反感，让用户在使用网站时平添烦恼。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

## 网站搜索

成功：帮助移动用户找到其正在急切寻找的内容。

### 让网站搜索可见

寻找信息的用户通常求助于搜索，因此搜索字段应是他们在您的页面上率先看到的内容。
不要将搜索框隐藏在菜单中。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>宜</b>：让搜索可见</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>忌</b>：将搜索隐藏在溢出菜单中</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 确保网站搜索结果相关

别让用户为了查找要寻找的内容而浏览多个页面的结果。
通过自动完成查询、更正错误拼写和提供相关查询建议简化用户的搜索操作。
为免于重复劳动，可以考虑使用 [Google 自定义搜索](https://cse.google.com/cse/){: .external }之类的稳健产品。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>宜</b>：Macy's 只返回儿童商品。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>忌</b>：返回任何包含儿童一词的商品的搜索结果。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


### 实现过滤条件来缩小结果范围

研究参与者依靠[过滤条件](/custom-search/docs/structured_search)查找他们要寻找的内容，他们会放弃不提供有效过滤条件的网站。对搜索结果应用过滤条件，通过显示应用特定过滤条件时将会返回多少结果来帮助用户。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>宜</b>：为过滤提供便利。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>忌</b>：隐藏过滤功能。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 引导用户获得更相关的网站搜索结果

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="Zappos 通过询问用户的寻找内容来对其进行引导。">
    <figcaption class="success">
      <b>宜</b>：通过沿正确方向引导用户来帮助他们查找其要寻找的内容。</figcaption>

  </figure>
</div>

对于具有多样化客户群的网站，请先提出几个问题，然后再呈现搜索框，并利用客户的回答作为搜索查询过滤条件来确保用户获得来自最相关客户群的结果。



<div style="clear:both;"></div>

## 商务和转化

成功：了解客户之旅，让用户根据自身情况进行转化。 

### 让用户先探索、后表态

研究参与者对那些要求先行注册才能查看内容的网站感到失望，尤其是在他们不熟悉网站品牌的情况下。
尽管对您的业务而言客户信息不可或缺，但过早索要可能导致注册量减少。



<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>宜</b>：允许用户在不登录的情况下浏览网站。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>忌</b>：在网站上过早提出登录或注册要求。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


### 让用户以访客身份购买

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>宜</b>：允许用户使用访客帐号购物。</figcaption>

  </figure>
</div>

研究参与者对访客结账的看法是“方便”、“简单”、“轻松”和“快速”。
用户对购物时强制他们注册帐号的网站感到恼火，尤其是在注册帐号的好处并不明确的情况下。



<div style="clear:both;"></div>

### 利用现有信息最大限度提高便利性

为注册用户记忆并[预填首选项](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)。为新用户提供熟悉的第三方结账服务。

### 为复杂任务使用点击呼叫按钮

在具备呼叫能力的设备上，[点击呼叫链接](/web/fundamentals/native-hardware/click-to-call/)可让用户通过简单地触按链接来拨打电话。在大多数移动设备上，用户会在拨号前收到确认，或者为用户提供一个菜单，询问用户应如何处理号码。



### 为在其他设备上完成任务提供便利

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>宜</b>：让用户能够方便地继续在其他设备上浏览或购物。</figcaption>

  </figure>
</div>

用户经常想在其他设备上完成任务。例如，他们可能想在更大的屏幕上查看某个项目。
或者他们可能工作繁忙，需要稍后完成任务。
通过让用户能够[在社交网络上分享项目](/web/fundamentals/discovery-and-monetization/social-discovery/)，或允许用户直接在网站内通过电子邮件向自己发送链接，为这些客户之旅提供支持。



<div style="clear:both;"></div>

## 表单输入

成功：通过易用型表单提供顺畅的无缝式转化体验。


### 精简信息输入

用户按回车键时自动前进到下一字段。一般而言，用户必须执行的触按越少，体验越佳。


### 选择最简单的输入

为每个情境使用最[合适的输入类型](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)。
使用 [`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) 之类的元素为字段提供建议值。



### 为日期选择提供可视化日历

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>宜</b>：尽可能使用日历小部件。</figcaption>

  </figure>
</div>

明确标示开始日期和结束日期。用户应不必单纯为了安排日期而离开网站去查看日历应用。


<div style="clear:both;"></div>

### 通过标示和实时验证最大限度减少表单错误

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>宜</b>：尽可能预填充内容。</figcaption>

  </figure>
</div>

正确标示输入并实时验证输入。

<div style="clear:both;"></div>

### 设计高效的表单

充分利用[自动填充](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)，让用户能借助预填充的数据轻松填写表单。
使用已知信息预先填充字段。
例如，在检索收货和账单地址时，尝试使用 [`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)，或让用户能够将其收货地址复制到其账单地址（反之亦然）。


 

## 易用性和机型

成功：通过可增强移动用户使用体验的微小改进来取悦他们。

### 对您的整个网站进行移动优化

使用可随用户设备的尺寸和能力而变化的[自适应布局](/web/fundamentals/design-and-ux/responsive/)。
研究参与者发现混合使用桌面和移动优化页面的网站甚至比单纯使用桌面页面的网站还要难以使用。



### 别让用户进行捏拉缩放

用户对垂直滚动网站感到顺手，水平滚动则不然。
避免使用大型、固定宽度的元素。利用 [CSS 媒体查询](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)为不同屏幕应用不同的样式。

不要创建只能在特定[视口宽度](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)下正常显示的内容。强制用户水平滚动的网站无法通过 [Google 移动易用性测试](https://search.google.com/test/mobile-friendly)，可能对其搜索排名产生不良影响。






### 让产品图像可扩展

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>宜</b>：让产品图像可扩展并便于查看细节。</figcaption>

  </figure>
</div>

零售客户期望网站允许其[查看产品的高分辨率特写](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)。研究参与者对无法查看所购买的产品感到失望。


<div style="clear:both;"></div>

### 告诉用户哪个方向效果最好

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>宜</b>：告诉用户哪个方向效果最好。</figcaption>

  </figure>
</div>

研究参与者往往一直使用同一屏幕方向，直至系统提示其进行切换。
同时采用横向和纵向设计，或鼓励用户切换至最佳方向。
确保即使用户忽略切换方向的建议，仍可完成您的重要行为召唤。



<div style="clear:both;"></div>

### 将您的用户留在单一浏览器窗口内

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>宜</b>：Macy's 通过在网站上提供优惠券将用户留在其网站上。</figcaption>

  </figure>
</div>

用户可能难以在窗口之间切换，并且可能找不到返回网站的路径。
避免启动新窗口的行为召唤。识别任何可能导致用户离开您的网站的流程，并提供相应功能将他们留在您的网站上。例如，如果您接受优惠券，请直接在网站上提供，而不要让用户被迫前往其他网站寻找优惠。



<div style="clear:both;"></div>

### 避免使用“完整网站”标示

当研究参与者看到用于切换“完整网站”（即桌面网站）和“移动网站”的选项时，会认为移动网站缺少内容而改为选择“完整”网站，这会将他们导向桌面网站。




### 明确您为何需要用户的位置

用户应始终明了您为何索要其[位置](/web/fundamentals/native-hardware/user-location/)。
研究参与者试图预订其他城市的酒店，而旅行网站却在检测到其位置后改为提供其所在城市的酒店，这令他们感到困惑。默认情况下将位置字段留空，让用户通过“Find Near Me”之类的明确行为召唤选择填充这些字段。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>宜</b>：始终在手势操作时请求获取用户的位置。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>忌</b>：在网站加载首页时立即请求提供位置会导致不好的用户体验。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
