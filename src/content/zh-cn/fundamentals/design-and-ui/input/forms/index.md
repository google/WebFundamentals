project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 在移动设备上填写表单很困难。 输入操作最少的表单就是最好的表单。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-30 #}

# 创建出色的表单 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



在移动设备上填写表单很困难。 输入操作最少的表单就是最好的表单。 好的表单提供有语义的输入类型。 按键应变为与用户的输入类型匹配；用户在日历中选取日期。 让用户了解情况。 验证工具应告诉用户，在提交表单之前他们需要做什么。

如需这些创建出色表单的指南的概述，请观看下面的视频。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>



## 设计高效的表单 




通过避免重复操作、只请求必要的信息来设计高效的表单，并通过向用户显示他们在多部分表单中的操作进度来指引用户。


### TL;DR {: .hide-from-toc }
- 使用现有数据来预填充各字段，并且一定要启用自动填充。
- 使用清楚标示的进度条来帮助用户填写多部分的表单。
- 提供可视日历，使用户无需离开您的网站去查看智能手机上的日历应用。


### 最大程度减少重复的操作和字段

确保表单没有重复操作，只设置必要的字段
数量，并利用
[自动填充](/web/fundamentals/input/form/#use_metadata_to_enable_auto-complete)，
使用户能借助预填充的数据轻松填写表单。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表单中显示进度">
  <figcaption>
    在 Progressive.com 网站上，首先要求用户输入邮编，然后邮编被预填充到表单的下一部分。
  </figcaption>
</figure>

寻找机会预先填充您已知道
或可以预判的信息，使用户无需手动输入。  例如，
给收货地址预先填充用户上次提供的收货
地址。

### 向用户显示他们的操作进度

进度条和菜单应准确表示
多步骤表单和过程的总体进度。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表单中显示进度">
  <figcaption>
    使用清楚标示的进度条来帮助用户完成多部分的表单。
  </figcaption>
</figure>

如果在早期步骤中设置了异常复杂的表单，用户
更可能放弃您的网站，而不会完成整个流程。 


### 在选择日期时提供可视化日历

用户在安排约会和旅行日期时往往需要更多情景，
如要使操作更容易，并防止他们离开您的网站去查看其
日历应用，就应提供一个可视化日历，设置清楚的标签以便选择
开始和结束日期。 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="带易用日历的酒店网站">
  <figcaption>
    酒店预订网站，有易用的日历小工具供选择日期。
  </figcaption>
</figure>




## 选择最佳输入类型 



使用正确的输入类型来简化信息输入操作。 用户喜欢在输入电话号码时网站会自动显示数字键盘，或随着输入信息而自动跳换字段。 寻找机会消除表单中的多余点击。


### TL;DR {: .hide-from-toc }
- 选择最适合数据的输入类型，以简化输入操作。
- 通过<code>datalist</code> 元素在用户输入时提供建议值。


#### HTML5 输入类型

HTML5 引入了大量新的输入类型。 这些新输入类型可以提示
浏览器，屏幕键盘应显示什么类型的
键盘布局。  用户无需切换键盘，就能更轻松地输入
所需的信息，并且只看到该输入类型
的相应按键。

<table>
  <thead>
    <tr>
      <th data-th="Input type">输入 <code>type</code></th>
      <th data-th="Typical keyboard">典型键盘</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> 用于输入 URL。 其开头必须是有效的 URI 格式，
例如 <code>http://</code>、<code>ftp://</code> 或 <code>mailto:</code>。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>用于输入电话号码。 它<b>不</b>
执行特定的验证语法，因此，如果要确保
特定的格式，可以使用模式属性。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>用于输入电子邮件地址，并提示
键盘上应默认显示 @。 如果需要用户提供多个电子邮件地址，
则可以添加 multiple 属性。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>一个文本输入字段，其样式与
平台的搜索字段一致。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>用于数字输入，可以是任意合理的
整数或浮点值。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>用于数字输入，但与 number 输入
类型不同，其值没那么重要。 它作为滑块控件
显示给用户。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>用于输入日期和时间值，
提供的时区为本地时区。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>用于只输入日期，不提供
时区。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>用于只输入时间，不提供
时区。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>用于只输入星期，不提供
时区。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>用于只输入月份，不提供
时区。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>用于选取颜色。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

#### 使用 datalist 在输入时提供建议值

`datalist` 元素不是输入类型，而是与一个表单字段关联的
建议输入值的列表。 它允许浏览器在用户输入时
建议自动完成选项。 `datalist` 元素与 select 元素不同，它无需用户浏览长列表来
找出所需的值，也不限制用户只能选择
这些选项，此元素在用户输入时提供提示。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

Note: <code>datalist</code> 值是提供的建议值，并不意味着用户 只能选择所提供的建议值。


在移动设备上填写表单很困难。 输入操作最少的表单就是最好的表单。 好的表单提供有语义的输入类型。 按键应变为与用户的输入类型匹配；用户在日历中选取日期。 让用户了解情况。 验证工具应告诉用户，在提交表单之前他们需要做什么。


#### 标签的重要性

`label` 元素为用户提供指导，告诉他们表单元素中需要
什么信息。  将输入元素放在 `label` 元素内，或通过使用 "`for`"
属性，可使每个 `label` 与一个
输入元素关联。  为表单元素设置标签还能帮助增大触摸
目标的大小：用户可以触摸标签或输入框，以将焦点置于
输入元素中。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

#### 标签大小和放置

标签和输入框应足够大，以便点击。  在纵向
视图中，字段标签应在输入元素上方，在横向视图
中则在输入元素旁边。  确保字段标签和对应的输入框
同时可见。  要注意自定义的滚动处理程序，可能会把输入
元素滚动到页面顶端而隐藏了标签，或者放在输入元素下方的
标签可能会被虚拟键盘所遮挡。

#### 使用占位符

占位符属性可提示用户应在输入框中输入什么内容
，通常以浅色文字显示其值，直到用户
开始在元素中输入。

<input type="text" placeholder="MM-YYYY">

    <input type="text" placeholder="MM-YYYY" ...>


当焦点处于元素中时，占位符立即消失，因此 它们不能代替标签。  应使用占位符 作为辅助，引导用户注意所需的格式和内容。

#### 使用元数据来实现自动完成

当网站自动填写一些常见字段（如姓名、电子邮件地址和其他常用字段）
为用户节省时间时，用户会很喜欢，并且还能
帮助减少潜在的输入错误，尤其是在使用虚拟键盘和
很小的设备时。

浏览器使用许多启发方法，[根据
用户之前指定的数据](https://support.google.com/chrome/answer/142893)
来确定可以
[自动填充](https://support.google.com/chrome/answer/142893)哪些字段，并且您可以为每个
输入元素提供 name 属性和 autocomplete
属性来提示浏览器。

例如，要提示浏览器应给表单自动填写
用户名、电子邮件地址和电话号码，应当使用：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>


#### 建议的输入 `name` 和 `autocomplete` 属性值


`autocomplete` 属性值是当前[WHATWG HTML 标准](https://html.spec.whatwg.org/multipage/forms.html#autofill)的一部分。 下面显示了最常用的 `autocomplete` 属性。

`autocomplete` 属性可以附带分区名称，例如 **`shipping `**`given-name` 或 **`billing `**`street-address`。 浏览器将单独自动完成不同的分区，而不是将其作为一个连续表单。

<table>
    <thead>
    <tr>
      <th data-th="Content type">内容类型</th>
      <th data-th="name attribute"><code>name</code> 属性</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> 属性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">名称</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code>（全名）</li>
          <li><code>given-name</code>（名字）</li>
          <li><code>additional-name</code>（中间名）</li>
          <li><code>family-name</code>（姓氏）</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">电子邮件</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">地址</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>用于单个地址输入框：
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>用于两个地址输入框：
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code>（州或省）</li>
          <li><code>address-level2</code>（城市）</li>
          <li><code>postal-code</code>（邮编）</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">电话</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">信用卡</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


#### `autofocus` 属性

在某些表单上，例如 Google 首页，需要用户做
的唯一操作是填写一个特定字段，就可以加上 `autofocus`
属性。  在设置了此属性时，桌面浏览器会立即将焦点移到输入
字段，使用户可以轻松快速地开始填写表单。  移动
浏览器会忽略 `autofocus` 属性，以防止键盘随机
显示。

要小心使用 autofocus 属性，因为它将侵占键盘焦点，
并且可能阻止使用退格符
来进行导航。

    <input type="text" autofocus ...>



实时数据验证不仅有助于保持数据清洁，还能改善用户体验。现代浏览器有多种内置工具可提供实时验证，并且能防止用户提交无效的表单。 应使用可视化线索来指示表单是否已正确填写。



#### 使用以下属性来验证输入值

##### `pattern` 属性

`pattern` 属性指定一个[正则
表达式](http://en.wikipedia.org/wiki/Regular_expression)来验证
输入字段。 例如，要验证美国邮编（5 位数，有时
后面有一个破折号和另外 4 位数），我们将 `pattern` 设置为如下
：

    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>

###### 常用的正则表达式模式

<table>
  <thead>
    <tr>
      <th data-th="Description">描述</th>
      <th data-th="Regular expression">正则表达式</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">邮寄地址</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">邮编（美国）</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 地址 (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 地址 (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 地址（两种）</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
    <tr>
      <td data-th="Description">信用卡号</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">社会保险号</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">北美电话号码</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

##### `required` 属性

如果提供 `required` 属性，则此字段必须包含值，才能
提交表单。 例如，要使邮编为必填值，
只需加上 required 属性：

<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>

##### `min`、`max` 和 `step` 属性

对于数字输入类型，如 number 或 range 以及 date/time 输入，
可以指定最小值和最大值，以及在通过滑块
或增减控件进行调整时的每个增量/减量。  例如，
鞋码输入将设置最小码 1 和最大码 13，递增或递减单位
为 0.5

<input type="number" min="1" max="13" step="0.5" ...>

##### `maxlength` 属性

`maxlength` 属性可用于指定输入值或
文本框的最大长度，当您要限制用户所提供信息的长度时，此属性
很有用。 例如，如果要将文件名限制为 12 个字符，
可以使用以下方法。

    <input type="text" id="83filename" maxlength="12" ...>

##### `minlength` 属性

`minlength` 属性可用于指定输入值或
文本框的最小长度，当您要指定用户必须提供的最小长度时，此属性
很有用。 例如，如果要指定文件名需要至少
8 个字符，可以使用以下方法。

    <input type="text" id="83filename" minlength="8" ...>

##### `novalidate` 属性

在某些情况下，即使表单包含无效的输入，您也可能想允许
用户提交表单。 为此，可给表单元素或单独的输入字段加上 `novalidate` 
属性。 在这种情况下，所有伪类和 
JavaScript API 仍将允许您检查表单是否通过验证。

    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>

#### 使用 JavaScript 实现更复杂的实时验证

当内置验证加上正则表达式还不够时，可以使用
[约束验证 API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)，
这是一个用于处理自定义验证的强大工具。  此 API 使您能够进行各种验证，
例如设置自定义错误，检查一个元素是否有效，并确定
元素无效的原因：

<table>
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">设置自定义验证消息，并将 <code>ValidityState</code> 对象的 <code>customError</code> 属性设置为 <code>true</code>。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">返回一个字符串，说明输入值未通过验证测试的原因。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">如果所有元素满足其所有约束条件，则返回 <code>true</code>，否则返回<code>false</code>。 由开发者决定在检查返回 <code>false</code> 时页面如何响应。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">如果所有元素满足其所有约束条件，则返回 <code>true</code>，否则返回<code>false</code>。 当页面响应 <code>false</code> 时，向用户报告约束问题。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">返回一个表示元素有效状态的 <code>ValidityState</code> 对象。</td>
    </tr>
  </tbody>
</table>

##### 设置自定义验证消息

如果字段未通过验证，可使用 `setCustomValidity()` 来将字段标记为无效
并解释字段未通过验证的原因。  例如，注册表单可能
要求用户通过输入两次来确认其电子邮件地址。  对第二个输入使用 blur
事件，以验证两个输入值，并设置相应的
响应。  例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

##### 阻止提交无效的表单

由于并非所有浏览器都在表单存在无效数据时阻止用户提交，
因此您应当捕获提交事件，并对表单元素使用 `checkValidity()`
以确定表单是否有效。  例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

#### 实时显示反馈

在用户提交表单之前，就在每个字段提供可视指示，提示
用户是否已正确填写表单，这样做很有帮助。
HTML5 也引入了很多新的伪类，可以用于根据输入值或属性来设置
输入的样式。

<table>
  <thead>
    <tr>
      <th data-th="Pseudo-class">伪类</th>
      <th data-th="Use">用途</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">明确地设置当输入值符合所有验证要求时，要使用的输入值样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">明确地设置在输入值不符合所有验证要求时，要使用的输入值样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">明确地设置已设定 required 属性的输入元素的样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">明确地设置未设定 required 属性的输入元素的样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">明确地设置在输入值处于范围内时 number 输入元素的样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">明确地设置在输入值超出范围时 number 输入元素的样式。</td>
    </tr>
  </tbody>
</table>

验证是立即进行的，意味着当页面加载时，即使用户
尚未填写各字段，就可以将字段标记为
无效。  它还意味着，用户正在输入时就可能看到
提示样式无效。 为防止此问题，可以将 CSS 与
JavaScript 结合，只在用户已访问此字段时才显示无效的样式。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>


## 使用 requestAutocomplete API 来简化结账 



尽管 <code>requestAutocomplete</code> 旨在帮助用户填写任意表单，但目前它最常用于电子商务网站，在此领域中移动 Web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>的购物车放弃率可能高达 97%</a>。 想像一下，超市中 97% 的人，推着满满一购物车他们想买的东西，突然把它们掀翻，然后走出超市。


### TL;DR {: .hide-from-toc }
- <code>requestAutocomplete</code> 可以显著简化结账流程，并 改善用户体验。
- 如果有 <code>requestAutocomplete</code>，则隐藏结账表单，并将用户 直接引导到确认页面。
- 确保输入字段包括相应的 autocomplete 属性。


不像一些网站依赖特定的支付提供商，
`requestAutocomplete` 可向浏览器请求付款信息（例如姓名、地址、
信用卡信息），这些信息都被浏览器选择性保存下来，与
其他自动完成字段很相似。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ljYeHwGgzQk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### `requestAutocomplete` 流程

理想的体验是显示`requestAutocomplete` 对话框，而不是加载显示结账表单
的页面。 如果一切顺利，则用户应完全看不到
表单。  无需更改任何字段名称，即可给现有表单
轻松加上 `requestAutocomplete`。  只需给每个表单元素加上 `autocomplete`
属性和相应的值，并且对表单元素加上
`requestAutocomplete()` 函数。 浏览器将处理
其余事项。

<img src="imgs/rac_flow.png" class="center" alt="请求自动完成流程">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="rac"   adjust_indentation="auto" %}
</pre>

`form` 元素上的 `requestAutocomplete` 函数向浏览器表明
，浏览器应填充表单。  作为安全功能，此函数
必须通过用户手势调用，例如触摸或点击鼠标。 然后显示一个
对话框，询问用户是否允许填充字段，以及他们要填充
哪些详细信息。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="handlerac"   adjust_indentation="auto" %}
</pre>

在完成 `requestAutocomplete` 时，如果此函数成功完成，则会触发
`autocomplete` 事件，如果无法填写表单，则触发 `autocompleteerror`
事件。  如果它成功完成并且表单通过验证符合要求，
则可以提交表单并进入最终
确认。

Note: 如果要求输入任何类型的个人信息或信用卡 数据，请确保通过 SSL 提供页面。  否则对话框将 警告用户，他们的信息可能不安全。


