---
title: "使用 requestAutocomplete API 来简化结账"
description: "尽管 <code>requestAutocomplete</code> 旨在帮助用户填写任意表单，但目前它最常用于电子商务网站，在此领域中移动 Web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>的购物车放弃率可能高达 97%</a>。"
updated_on: 2014-10-21
key-takeaways:
  use-request-auto-complete:
    - <code>requestAutocomplete</code> 可以显著简化结账流程，并 改善用户体验。
    - 如果有 <code>requestAutocomplete</code>，则隐藏结账表单，并将用户 直接引导到确认页面。
    - 确保输入字段包括相应的 autocomplete 属性。
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
---
<p class="intro">
  尽管 <code>requestAutocomplete</code> 旨在帮助用户填写任意表单，但目前它最常用于电子商务网站，在此领域中移动 Web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>的购物车放弃率可能高达 97%</a>。 想像一下，超市中 97% 的人，推着满满一购物车他们想买的东西，突然把它们掀翻，然后走出超市。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

不像一些网站依赖特定的支付提供商，
`requestAutocomplete` 可向浏览器请求付款信息（例如姓名、地址、
信用卡信息），这些信息都被浏览器选择性保存下来，与
其他自动完成字段很相似。

{% ytvideo ljYeHwGgzQk %}

### `requestAutocomplete` 流程

理想的体验是显示`requestAutocomplete` 对话框，而不是加载显示结账表单
的页面。 如果一切顺利，则用户应完全看不到
表单。  无需更改任何字段名称，即可给现有表单
轻松加上 `requestAutocomplete`。  只需给每个表单元素加上 `autocomplete`
属性和相应的值，并且对表单元素加上
`requestAutocomplete()` 函数。 浏览器将处理
其余事项。

<img src="imgs/rac_flow.png" class="center" alt="请求自动完成流程">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

`form` 元素上的 `requestAutocomplete` 函数向浏览器表明
，浏览器应填充表单。  作为安全功能，此函数
必须通过用户手势调用，例如触摸或点击鼠标。 然后显示一个
对话框，询问用户是否允许填充字段，以及他们要填充
哪些详细信息。

{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

在完成 `requestAutocomplete` 时，如果此函数成功完成，则会触发
`autocomplete` 事件，如果无法填写表单，则触发 `autocompleteerror`
事件。  如果它成功完成并且表单通过验证符合要求，
则可以提交表单并进入最终
确认。

{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}


