---
title: "提供实时验证"
description: "实时数据验证不仅有助于保持数据清洁，还能改善用户体验。现代浏览器有多种内置工具可提供实时验证，并且能防止用户提交无效的表单。 应使用可视化线索来指示表单是否已正确填写。"
updated_on: 2014-10-21
key-takeaways:
  provide-real-time-validation:
    - 利用浏览器的内置验证属性，例如 <code>pattern</code>、<code>required</code>、<code>min</code>、<code>max</code>等。
    - 使用 JavaScript 和约束验证 API 来满足更复杂的 验证要求。
    - 实时显示验证错误，如果用户尝试提交 无效的表单，则显示他们需要修正的所有字段。
notes:
  use-placeholders:
    - 当焦点处于元素中时，占位符立即消失，因此 它们不能代替标签。  应使用占位符 作为辅助，引导用户注意所需的格式和内容。
  recommend-input:
    - 自动完成仅在表单方法为 post 时才起作用。
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
  - g.co/mobilesiteprinciple17b
---
<p class="intro">
  实时数据验证不仅有助于保持数据清洁，还能改善用户体验。现代浏览器有多种内置工具可提供实时验证，并且能防止用户提交无效的表单。 应使用可视化线索来指示表单是否已正确填写。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### 使用以下属性来验证输入值

#### `pattern` 属性

`pattern` 属性指定一个[正则
表达式](http://en.wikipedia.org/wiki/Regular_expression)来验证
输入字段。 例如，要验证美国邮编（5 位数，有时
后面有一个破折号和另外 4 位数），我们将 `pattern` 设置为如下
：

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### 常用的正则表达式模式

<table class="mdl-data-table mdl-js-data-table">
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

#### `required` 属性

如果提供 `required` 属性，则此字段必须包含值，才能
提交表单。 例如，要使邮编为必填值，
只需加上 required 属性：

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### `min`、`max` 和 `step` 属性

对于数字输入类型，如 number 或 range 以及 date/time 输入，
可以指定最小值和最大值，以及在通过滑块
或增减控件进行调整时的每个增量/减量。  例如，
鞋码输入将设置最小码 1 和最大码 13，递增或递减单位
为 0.5

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### `maxlength` 属性

`maxlength` 属性可用于指定输入值或
文本框的最大长度，当您要限制用户所提供信息的长度时，此属性
很有用。 例如，如果要将文件名限制为 12 个字符，
可以使用以下方法。

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### `minlength` 属性

`minlength` 属性可用于指定输入值或
文本框的最小长度，当您要指定用户必须提供的最小长度时，此属性
很有用。 例如，如果要指定文件名需要至少
8 个字符，可以使用以下方法。

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### `novalidate` 属性

在某些情况下，即使表单包含无效的输入，您也可能想允许
用户提交表单。 为此，可给表单元素或单独的输入字段加上 `novalidate` 
属性。 在这种情况下，所有伪类和 
JavaScript API 仍将允许您检查表单是否通过验证。

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

### 使用 JavaScript 实现更复杂的实时验证

当内置验证加上正则表达式还不够时，可以使用
[约束验证 API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)，
这是一个用于处理自定义验证的强大工具。  此 API 使您能够进行各种验证，
例如设置自定义错误，检查一个元素是否有效，并确定
元素无效的原因：

<table class="mdl-data-table mdl-js-data-table">
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

#### 设置自定义验证消息

如果字段未通过验证，可使用 `setCustomValidity()` 来将字段标记为无效
并解释字段未通过验证的原因。  例如，注册表单可能
要求用户通过输入两次来确认其电子邮件地址。  对第二个输入使用 blur
事件，以验证两个输入值，并设置相应的
响应。  例如：

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### 阻止提交无效的表单

由于并非所有浏览器都在表单存在无效数据时阻止用户提交，
因此您应当捕获提交事件，并对表单元素使用 `checkValidity()`
以确定表单是否有效。  例如：

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### 实时显示反馈

在用户提交表单之前，就在每个字段提供可视指示，提示
用户是否已正确填写表单，这样做很有帮助。
HTML5 也引入了很多新的伪类，可以用于根据输入值或属性来设置
输入的样式。

<table class="mdl-data-table mdl-js-data-table">
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

{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.remember.show-all-errors %}


