project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在移动设备上填写表单很困难。输入操作最少的表单就是最好的表单。

{# wf_updated_on:2014-10-21 #}
{# wf_published_on:2014-04-30 #}

# 创建出色的表单 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

在移动设备上填写表单很困难。输入操作最少的表单就是最好的表单。出色的表单提供有语义的输入类型。按键应变为与用户的输入类型匹配；用户在日历中选取日期。让用户了解最新信息。验证工具应告诉用户，在提交表单之前他们需要做什么。


## 设计高效的表单


通过避免重复操作、只请求必要的信息来设计高效的表单，并通过向用户显示他们在多部分表单中的操作进度来指引用户。


### TL;DR {: .hide-from-toc }
- 使用现有数据来预填充各字段，并且一定要启用自动填充。
- 使用清楚标示的进度条来帮助用户完成多部分的表单。
- 提供可视化日历，让用户不必离开您的网站，并跳转到其智能手机上的日历应用。


### 最大程度减少重复的操作和字段

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表单中显示进度">
  <figcaption>
    在 Progressive.com 网站上，首先要求用户输入邮编，然后邮编会被预填充到表单的下一部分。
</figcaption>
</figure>

确保表单没有重复操作，只设置必要的字段数量，并利用[自动填充](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete)，使用户能借助预填充的数据轻松填写表单。




寻找机会预先填充您已知道或可以预判的信息，使用户无需手动输入。
例如，给收货地址预先填充用户上次提供的收货地址。



<div style="clear:both;"></div>

### 向用户显示他们的操作进度

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表单中显示进度">
  <figcaption>
    使用清楚标示的进度条来帮助用户完成多部分的表单。
</figcaption>
</figure>

进度条和菜单应准确传达多步骤表单和流程的总体进度。


如果在早期步骤中设置了异常复杂的表单，用户更可能放弃您的网站，而不会完成整个流程。
 

<div style="clear:both;"></div>

### 在选择日期时提供可视化日历

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="带易用日历的酒店网站">
  <figcaption>
    酒店预订网站，有易用的日历小工具供选择日期。
</figcaption>
</figure>

用户在安排约会和旅行日期时往往需要更多上下文，如要使操作更容易，并防止他们离开您的网站去查看其日历应用，就应提供一个可视化日历，设置清楚的标签以便选择开始和结束日期。


 

<div style="clear:both;"></div>

## 选择最佳输入类型

使用正确的输入类型来简化信息输入操作。用户喜欢在输入电话号码时网站自动显示数字键盘，或随着输入信息自动跳换字段。寻找机会消除表单中的多余点击。



### TL;DR {: .hide-from-toc }
- 选择最适合数据的输入类型，以简化输入操作。
- 通过  <code>datalist</code> 元素在用户输入时提供建议值。


### HTML5 输入类型

HTML5 引入了大量新的输入类型。这些新输入类型可以提示浏览器，屏幕键盘应显示什么类型的键盘布局。用户无需切换键盘，就能更轻松地输入所需信息，并且只看到该输入类型的相应按键

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">输入 <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> 用于输入网址。其开头必须是有效的 URI 架构，例如  <code>http://</code>、 <code>ftp://</code> 或  <code>mailto:</code>。</td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>用于输入电话号码。它<b>不</b>
        执行特定的验证语法，因此，如果要确保特定的格式，可以使用模式属性。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>用于输入电子邮件地址，并提示键盘上应默认显示 @。
如果需要用户提供多个电子邮件地址，则可以添加 multiple 属性。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>一个文本输入字段，其样式与平台的搜索字段一致。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>用于数字输入，可以是任意合理的整数或浮点值。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>用于数字输入，但与 number 输入类型不同，其值没那么重要。
它以滑块控件的形式显示给用户。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>用于输入日期和时间值，提供的时区为本地时区。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>用于只输入日期，不提供时区。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>用于只输入时间，不提供时区。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>用于只输入星期，不提供时区。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>用于只输入月份，不提供时区。
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

注意：请谨记在选择输入类型时要牢记本地化，有些语言区域使用点 (.)，而不使用逗号 (,) 来作为分隔符。


### 使用 datalist 在输入时提供建议值

`datalist` 元素不是输入类型，而是与一个表单字段关联的建议输入值的列表。
它允许浏览器在用户输入时建议自动填充选项。
`datalist` 元素与 select 元素不同，它无需用户浏览长列表来找出所需的值，也不限制用户只能选择这些选项，此元素在用户输入时提供提示。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

注： <code>datalist</code> 值是提供的建议值，并不意味着用户只能选择所提供的建议值。

## 正确地为输入设置标签和命名

在移动设备上填写表单很困难。输入操作最少的表单就是最好的表单。出色的表单提供有语义的输入类型。按键应变为与用户的输入类型匹配；用户在日历中选取日期。让用户了解最新信息。验证工具应告诉用户，在提交表单之前他们需要做什么。


### TL;DR {: .hide-from-toc }
- 务必对表单输入使用  <code>label</code>，并确保字段处于焦点时标签可见。
- 使用  <code>placeholder</code> 来提供有关预期输入内容的指导。
- 为帮助浏览器自动填充表单，为各元素使用既定的  <code>name</code> 并包括  <code>autocomplete</code> 属性。


### 标签的重要性

`label` 元素为用户提供指引，告诉他们表单元素中需要什么信息。
将输入元素放在 `label` 元素内，或通过使用“`for`”属性，可使每个 `label` 与一个输入元素关联。为表单元素设置标签还能帮助增大触摸目标的大小：用户可以触摸标签或输入框，以将焦点置于输入元素中。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 标签大小和放置

标签和输入框应足够大，以便点击。在纵向视口中，字段标签应在输入元素上方，在横向视口中则在输入元素旁边。确保字段标签和对应的输入框同时可见。要注意自定义的滚动处理程序，可能会把输入元素滚动到页面顶端而隐藏了标签，或者放在输入元素下方的标签可能会被虚拟键盘所遮挡。



### 使用占位符

占位符属性可提示用户应在输入框中输入什么内容，通常以浅色文本显示其值，直到用户开始在元素中输入。



<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


注意：当用户开始输入元素时，占位符立即消失，因此它们不能代替标签。应使用占位符作为辅助，引导用户注意所需的格式和内容。

### 使用元数据来实现自动填充

当网站自动填写一些常见字段（如姓名、电子邮件地址和其他常用字段）为用户节省时间时，用户会很喜欢，并且这样还能帮助减少潜在的输入错误，尤其是在使用虚拟键盘和很小的设备时。




浏览器使用许多启发方法，[根据用户之前指定的数据](https://support.google.com/chrome/answer/142893)来确定可以[自动填充](https://support.google.com/chrome/answer/142893)哪些字段，并且您可以为每个输入元素提供 `name` 属性和 `autocomplete` 属性来提示浏览器。





注：Chrome 需要将 `input` 元素包含在 `<form>` 标记中才能启用自动完成。
如果它们不包含在 `form` 标签中，Chrome 将提供建议值，但是**不会**完成表单。


例如，要提示浏览器应给表单自动填写用户名、电子邮件地址和电话号码，应当使用：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### 建议的输入 `name` 和 `autocomplete` 属性值

`autocomplete` 属性值是当前 [WHATWG HTML 标准](https://html.spec.whatwg.org/multipage/forms.html#autofill)的一部分。下面显示了最常用的 `autocomplete` 属性。

`autocomplete` 属性可以附带分区名称，例如 **`shipping `**`given-name` 或 **`billing `**`street-address`。浏览器将单独自动填充不同的分区，而不是将其作为一个连续表单。

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
    <tr>
      <td data-th="Content type">用户名</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">密码</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code>（用于登录表单）</li>
          <li><code>new-password</code>（用于注册和更改密码表单）</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


注：仅在您的地址格式需要时，才需要使用  <code>street-address</code> 或者  <code>address-line1</code> 和  <code>address-line2</code>  <code>address-level1</code> 和  <code>address-level2</code>。


###  `autofocus` 属性

在某些表单上，例如 Google 首页，需要用户做的唯一操作是填写一个特定字段，则可以加上 `autofocus` 属性。在设置了此属性时，桌面浏览器会立即将焦点移到输入字段，使用户可以轻松快速地开始填写表单。
移动浏览器会忽略 `autofocus` 属性，以防止键盘随机显示。



要小心使用 autofocus 属性，因为它将侵占键盘焦点，并且可能阻止使用退格符来进行导航。




    <input type="text" autofocus ...>
    


## 提供实时验证

实时数据验证不仅有助于保持数据清洁，还能改善用户体验。现代浏览器有多种内置工具可提供实时验证，并且能防止用户提交无效的表单。应使用可视化线索来指示表单是否已正确填写。


### TL;DR {: .hide-from-toc }
- 利用浏览器的内置验证属性，例如  <code>pattern</code>、 <code>required</code>、 <code>min</code>、 <code>max</code> 等。
- 使用 JavaScript 和 Constraints Validation API 来满足更复杂的验证要求。
- 实时显示验证错误，如果用户尝试提交无效的表单，则显示他们需要修正的所有字段。


### 使用以下属性来验证输入值

####  `pattern` 属性

`pattern` 属性指定一个用于验证输入字段的[正则表达式](https://en.wikipedia.org/wiki/Regular_expression)。 
例如，要验证美国邮编（5 位数，有时后面有一个破折号和另外 4 位数），我们将 `pattern` 设置如下：




    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### 常用的正则表达式模式

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">正则表达式</th>
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
      <td data-th="Description">社会保障号</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">北美电话号码</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

####  `required` 属性

如果提供 `required` 属性，则此字段必须包含值，才能提交表单。
例如，要使邮编为必填值，只需加上 required 属性：



    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

####  `min`、`max` 和 `step` 属性

对于数字输入类型，如数字或范围以及日期/时间输入，可以指定最小值和最大值，以及在通过滑块或微调框进行调整时的每个增量/减量。例如，鞋码输入将设置最小码 1 和最大码 13，递增或递减单位为 0.5




    <input type="number" min="1" max="13" step="0.5" ...>
    

####  `maxlength` 属性

`maxlength` 属性可用于指定输入值或文本框的最大长度，当您要限制用户可提供信息的长度时，此属性很有用。例如，如果要将文件名限制为 12 个字符，可以使用以下方法。



    <input type="text" id="83filename" maxlength="12" ...>
    

####  `minlength` 属性

`minlength` 属性可用于指定输入值或文本框的最小长度，当您要指定用户必须提供的最小长度时，此属性很有用。例如，如果要指定文件名需要至少 8 个字符，可以使用以下方法。



    <input type="text" id="83filename" minlength="8" ...>
    

####  `novalidate` 属性

在某些情况下，即使表单包含无效的输入，您也可能想允许用户提交表单。
为此，可给表单元素或单独的输入字段加上 `novalidate` 属性。
在这种情况下，所有伪类和 JavaScript API 仍将允许您检查表单是否通过验证。



    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


成功：即使客户端有输入验证，也务必在服务器上验证数据，以确保数据的一致性和安全性。

###  使用 JavaScript 实现更复杂的实时验证

当内置验证加上正则表达式还不够时，可以使用 [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)，这是一个用于处理自定义验证的强大工具。此 API 使您能够进行各种验证，例如设置自定义错误，检查一个元素是否有效，并确定元素无效的原因：



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Constraint Validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">设置自定义验证消息，并将  <code>ValidityState</code> 对象的  <code>customError</code> 属性设置为  <code>true</code>。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">返回一个字符串，说明输入值未通过验证测试的原因。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">如果元素满足其所有约束条件，则返回  <code>true</code>，否则返回  <code>false</code>。由开发者决定在检查返回  <code>false</code> 时页面如何响应。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">如果元素满足其所有约束条件，则返回  <code>true</code>，否则返回  <code>false</code>。当页面响应  <code>false</code> 时，向用户报告约束问题。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">返回一个表示元素有效状态的  <code>ValidityState</code> 对象。</td>
    </tr>
  </tbody>
</table>



### 设置自定义验证消息

如果字段未通过验证，可使用 `setCustomValidity()` 来将字段标记为无效并解释字段未通过验证的原因。
例如，注册表单可能要求用户通过输入两次来确认其电子邮件地址。
对第二个输入使用 blur 事件，以验证两个输入值，并设置相应的响应。例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 阻止提交无效的表单

由于并非所有浏览器都会在表单存在无效数据时阻止用户提交，因此您应当捕获提交事件，并对表单元素使用 `checkValidity()` 以确定表单是否有效。

例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 实时显示反馈

在用户提交表单之前，就在每个字段提供可视指示，提示用户是否已正确填写表单，这样做很有帮助。HTML5 也引入了很多新的伪类，可以用于根据输入值或属性来设置输入的样式。




<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">实时反馈</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">明确地设置当输入值符合所有验证要求时，要使用的输入值样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">明确地设置当输入值不符合所有验证要求时，要使用的输入值样式。</td>
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
      <td data-th="Use">明确地设置在输入值处于范围内时数字输入元素的样式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">明确地设置在输入值超出范围时数字输入元素的样式。</td>
    </tr>
  </tbody>
</table>

验证是立即进行的，意味着当页面加载时，即使用户尚无机会填写各字段，字段就可能被标记为无效。它还意味着，用户正在输入时就可能看到提示样式无效。
为防止此问题，可以将 CSS 与 JavaScript 结合，只在用户已访问此字段时才显示无效的样式。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


成功：应一次性向用户显示表单上的所有问题，而不是一次显示一个问题。




{# wf_devsite_translation #}
