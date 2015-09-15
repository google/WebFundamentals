---
title: "设计高效的表单"
description: "通过避免重复操作、只请求必要的信息来设计高效的表单，并通过向用户显示他们在多部分表单中的操作进度来指引用户。"
updated_on: 2014-10-21
key-takeaways:
  tldr:
    - 使用现有数据来预填充各字段，并且一定要启用自动填充。
    - 使用清楚标示的进度条来帮助用户填写多部分的表单。
    - 提供可视日历，使用户无需离开您的网站去查看智能手机上的日历应用。
comments:
  # 注：如果分区标题或 URL 有更改，则必须更新以下短链接
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  通过避免重复操作、只请求必要的信息来设计高效的表单，并通过向用户显示他们在多部分表单中的操作进度来指引用户。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 最大程度减少重复的操作和字段

确保表单没有重复操作，只设置必要的字段
数量，并利用
[自动填充](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete)，
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

## 向用户显示他们的操作进度

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


## 在选择日期时提供可视化日历

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


