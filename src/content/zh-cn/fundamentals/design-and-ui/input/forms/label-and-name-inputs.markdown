---
title: "正确地为输入设置标签和命名"
description: "在移动设备上填写表单很困难。 输入操作最少的表单就是最好的表单。"
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - 务必对表单输入使用 <code>label</code>，并确保字段处于焦点时 标签可见。
    - 使用 <code>placeholder</code> 来提供有关预期输入内容的指导。
    - 为帮助浏览器自动完成表单，为各元素提供既定的 <code>name</code> 并包括 <code>autocomplete</code> 属性。
notes:
  use-placeholders:
    - 当用户开始输入元素时，占位符立即消失，因此 它们不能代替标签。  应使用占位符 作为辅助，引导用户注意所需的格式和内容。
  recommend-input:
    - 只使用 <code>street-address</code> 或同时使用 <code>address-line1</code> 和 <code>address-line2</code>
    - 仅在您的地址格式需要时，才需要使用 <code>address-level1</code> 和 <code>address-level2</code> 。
  use-datalist:
    - <code>datalist</code> 值是提供的建议值，并不意味着用户 只能选择所提供的建议值。
  provide-real-time-validation:
    - 即使客户端有输入验证，也务必 在服务器上验证数据，以确保数据的一致性和安全。
  show-all-errors:
    - 应一次性向用户显示表单上的所有问题，而不是一次显示一个问题。
  request-auto-complete-flow:
    - 如果要求输入任何类型的个人信息或信用卡 数据，请确保通过 SSL 提供页面。  否则对话框将 警告用户，他们的信息可能不安全。
comments:
  # 注：如果分区标题或 URL 有更改，则必须更新以下短链接
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  在移动设备上填写表单很困难。 输入操作最少的表单就是最好的表单。 好的表单提供有语义的输入类型。 按键应变为与用户的输入类型匹配；用户在日历中选取日期。 让用户了解情况。 验证工具应告诉用户，在提交表单之前他们需要做什么。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### 标签的重要性

`label` 元素为用户提供指导，告诉他们表单元素中需要
什么信息。  将输入元素放在 `label` 元素内，或通过使用 "`for`"
属性，可使每个 `label` 与一个
输入元素关联。  为表单元素设置标签还能帮助增大触摸
目标的大小：用户可以触摸标签或输入框，以将焦点置于
输入元素中。

{% include_code src=_code/order.html snippet=labels %}

### 标签大小和放置

标签和输入框应足够大，以便点击。  在纵向
视图中，字段标签应在输入元素上方，在横向视图
中则在输入元素旁边。  确保字段标签和对应的输入框
同时可见。  要注意自定义的滚动处理程序，可能会把输入
元素滚动到页面顶端而隐藏了标签，或者放在输入元素下方的
标签可能会被虚拟键盘所遮挡。

### 使用占位符

占位符属性可提示用户应在输入框中输入什么内容
，通常以浅色文字显示其值，直到用户
开始在元素中输入。

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### 使用元数据来实现自动完成

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

{% include_code src=_code/order.html snippet=autocomplete %}


### 建议的输入 `name` 和 `autocomplete` 属性值


`autocomplete` 属性值是当前[WHATWG HTML 标准](https://html.spec.whatwg.org/multipage/forms.html#autofill)的一部分。 下面显示了最常用的 `autocomplete` 属性。

`autocomplete` 属性可以附带分区名称，例如 **`shipping `**`given-name` 或 **`billing `**`street-address`。 浏览器将单独自动完成不同的分区，而不是将其作为一个连续表单。

<table class="mdl-data-table mdl-js-data-table">
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

{% include shared/remember.liquid title="Remember" list=page.remember.recommend-input %}

### `autofocus` 属性

在某些表单上，例如 Google 首页，需要用户做
的唯一操作是填写一个特定字段，就可以加上 `autofocus`
属性。  在设置了此属性时，桌面浏览器会立即将焦点移到输入
字段，使用户可以轻松快速地开始填写表单。  移动
浏览器会忽略 `autofocus` 属性，以防止键盘随机
显示。

要小心使用 autofocus 属性，因为它将侵占键盘焦点，
并且可能阻止使用退格符
来进行导航。

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


