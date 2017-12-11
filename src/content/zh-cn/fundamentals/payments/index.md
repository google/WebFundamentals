project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Payment Request API 用于在网上实现快速简便的支付。

{# wf_published_on:2016-07-25 #}
{# wf_updated_on:2016-12-06 #}

# Payment Request API：集成指南 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Dogfood：`PaymentRequest` 仍处于开发阶段。虽然我们认为其稳定性足以满足实现的要求，但可能仍需作出改动。
我们会持续更新本页，以时刻反映 API 的最新状况（[M56 变更](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)）。在此期间，为让您免于受到可能不具有向后兼容性的 API 变更的影响，我们提供了可嵌入网站的 [shim](https://storage.googleapis.com/prshim/v1/payment-shim.js)。这个 shim 可平息两个主流 Chrome 版本的任何 API 差异。



在线购物非常方便，但通常存在令人沮丧的体验，在移动设备上购物尤其如此。虽然移动流量在不断增长，但移动购物转化率仅占所有已完成购物活动的三分之一。换言之，移动设备用户的购物放弃率是桌面设备用户的两倍。为何？

![](images/1_why_users_abandon.png)

*用户放弃移动设备购物单的原因*

在线购物单需要大量用户操作、难以使用，加载和刷新缓慢，并且需要多个步骤才能完成。这是因为在线支付的两大要素（即安全和便利）之间通常互为矛盾，左支右绌。

导致用户放弃交易的大部分问题都均与购物单有着直接关系。每个应用或网站均有自己的数据输入和验证流程，用户通常发现，在每个应用的购物点他们都需要输入相同的信息。此外，应用开发者力求创建支持多种独特支付方式的购物流程；即使是支付方式要求的细小差异也可能导致表单填写和提交过程变得相当复杂。

任何能或多或少改进这些问题的系统都值得提倡。我们已经尝试借助[自动填充](/web/updates/2015/06/checkout-faster-with-autofill)功能来帮助解决问题，但我们现在有了更全面的解决方案。

## Payment Request API 简介 {: #introducing }

Payment Request API 是一个旨在*消灭结账表单*的系统。它显著改进了购物流程期间的用户工作流，为用户提供更一致的体验，并让电商公司能够轻松地利用各种完全不同的支付方式。Payment Request API 不是一种新的支付方式，也不与支付处理机构直接整合；它是一种旨在实现以下目标的处理层：

* 让浏览器充当商家、用户和支付处理机构的中介
* 尽可能标准化支付通信流程
* 为不同的安全支付方式提供无缝支持
* 适用于任何移动或非移动浏览器、设备或平台

Payment Request API 是一种开放式的跨浏览器标准，可以取代传统的结账流程，让商家能够在单个 API 调用中请求和接受任何付款。Payment Request API 允许网页在用户提供输入时与 User Agent 交换信息，然后核准或拒绝支付请求。

最重要的是，浏览器起到中介作用，为实现快速结账所需的全部信息均能储存在浏览器中，因此用户只需点击一次便可确认支付。

### 支付交易流程 {: #transaction-process }
利用 Payment Request API，可同时为用户和商家打造尽可能无缝的交易流程。

![](images/4_the_payment_transaction_process.png)

*支付交易流程*

流程一开始，商家网站首先创建新的 `PaymentRequest`，并将购买所需的全部信息传递给浏览器：应支付的金额、期望使用的货币，以及网站接受的支付方式。浏览器确定网站所接受的支付方式和用户在目标设备上安装的支付方式之间的兼容性。

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>


然后，浏览器向用户显示支付 UI，用户选择支付方式并授权执行交易。支付方式可以简单直接，比如使用浏览器已存储的信用卡，也可能冷僻难解，比如使用专门针对网站支付开发的第三方应用（此功能即将实现）。用户授权执行交易后，所有必要的支付详细信息都将直接发回网站。例如，对于信用卡支付，网站将返回卡号、持卡人姓名、有效期和银行卡验证码 (CVC)。

Payment Request 也可以扩展为返回额外信息，例如收货地址和选项、付款人电子邮件和电话等。这样，无需要向用户显示结账表单，您即可获得完成支付所需的全部信息。


新流程有三重好处：从用户角度看，请求、授权、支付和结果等以往所有冗长的交互现在可一步完成；从网站角度看，只需调用一次 JavaScript API；从支付方式角度看，流程没有发生任何变化。

<div style="clear:both;"></div>

## 使用 Payment Request API{: #using }

### 加载 Payment Request API shim

为减轻追赶这一现行标准 API 的压力，我们强烈建议在代码的 `<head>` 部分添加此 shim。
此 shim 将随 API 的变化而更新，并会尽力让代码能够至少在 Chrome 的 2 个主要版本上正常运行。




    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### 创建 PaymentRequest {: #create-paymentrequest }

创建 PaymentRequest 的第一步是通过调用 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor) 构造函数创建一个 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) 对象。此步骤通常（并非总是）与用户发起的、表示其想要执行购买的操作相关。对象使用包含所需数据的参数构造。

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*PaymentRequest 构造函数*

#### methodData 参数 {: #methoddata-parameter }

`methodData` 参数包含支持的支付方式列表，以及有关支付方式的额外信息（如相关）。此序列含有 `PaymentMethodData` 字典，其中包括与应用预期接受的支付方式相关的标准标识符，以及任何支付方式的特定数据。如需了解更多详情，请参见 [Payment Request API 架构](https://w3c.github.io/browser-payment-api/specs/architecture.html)。

目前，`PaymentRequest` 在 Chrome 中仅支持以下标准信用卡：“`amex`”、“`diners`”、“`discover`”、“`jcb`”、“`maestro`”、“`mastercard`”、“`unionpay`”和“`visa`”。


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*支付方式和数据*

#### details 参数 {: #details-parameter }

`details` 参数包含有关交易的信息。有两个主要元素：total，反映要支付的总额和要使用的货币；可选的 `displayItems` 集，显示最终金额包含哪些分项。此参数并非用作明细项目列表，而是订单主要组成部分的摘要：总价、折扣、税、运费等。

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

需要注意的是，Payment Request API 不执行计算。也就是说，它不会也不能确保显示的分项总和等于应付总金额。这些计算由开发者负责。因此，您应始终确保分项之和与总金额一致。此外，`PaymentRequest` 不支持退款，因此金额应始终为正（但单独的分项可以为负，比如折扣）。

浏览器将根据您的定义渲染标签，并根据用户的语言区域自动应用正确的货币格式。请注意，应使用与内容相同的语言渲染标签。

<div style="clear:both;"></div>

    var details = {
      displayItems: [
        {
          label: "Original donation amount",
          amount: { currency: "USD", value : "65.00" }, // US$65.00
        },
        {
          label: "Friends and family discount",
          amount: { currency: "USD", value : "-10.00" }, // -US$10.00
          pending: true // The price is not determined yet
        }
      ],
      total:  {
        label: "Total",
        amount: { currency: "USD", value : "55.00" }, // US$55.00
      }
    }


*交易详情*

`pending` 常用于显示运费或税额等取决于收货地址或收货选项的项目。Chrome 会在 UI 中指示支付请求的待定字段。

`details` 中所使用的重复值或计算值可指定为字符串字面量或各字符串变量。


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*PaymentRequest 变量*

### 显示 PaymentRequest {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

通过调用 [`show()`](https://www.w3.org/TR/payment-request/#show) 方法激活 `PaymentRequest` 界面。此方法会调用一个原生 UI，让用户检查购物详情、添加或更改信息并最终进行支付。用户接受或拒绝支付请求时，将返回可解析 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)（带有其 `then()` 方法和回调函数）。

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*PaymentRequest show 方法*

### 取消 PaymentRequest {: #abort-paymentrequest }
您可以通过调用 [`abort()`](https://www.w3.org/TR/payment-request/#abort) 方法主动取消 `PaymentRequest`。这在购物会话超时或交易期间购物车中的商品售罄时特别有用。

如果应用需要在调用 `show()` 方法之后、promise 尚未解析之前（例如，如果商品已下架，或者用户没有在指定时间内确认订单）取消支付请求，则可使用此方法。

如果您取消请求，将需要创建一个新的 `PaymentRequest` 实例，才能再次调用 `show()`。


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*PaymentRequest abort 方法*

### 处理 PaymentResponse {: # process-paymentresponse}
用户批准库款请求后，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 会立即解析，生成 `PaymentResponse` 对象。

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> 具有下列字段：</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>表示所选支付方式的字符串（例如 visa）</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td>含有  <code>methodName</code> 信息的字典</td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>用户的收货地址（如有请求）</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>所选发货选项的 ID（如有请求）</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>付款人的电子邮件地址（如有请求）</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>付款人的电话号码（如有请求）</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>付款人的姓名（如有请求）</td>
</tr>
</table>


对于信用卡付款，响应为标准格式。对于非信用卡付款（例如 Android Pay），响应将由支付服务商提供文档说明。信用卡响应包含下列字典：

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

接收支付信息后，应用需将支付信息提交给支付处理机构进行处理。发生请求时，UI 会显示一个转环。收到响应后，应用需调用 `complete()` 来关闭 UI。


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string, e.g. “visa”
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details
      };
      return fetch('/pay', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw 'Payment Error';
        }
      }).then(res => {
        paymentResponse.complete("success");
      }, err => {
        paymentResponse.complete("fail");
      });
    }).catch(err => {
      console.error("Uh oh, something bad happened", err.message);
    });


<div class="attempt-left">
  <figure>
    <img src="images/8_card_verified.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

[`complete()`](https://www.w3.org/TR/payment-request/#complete) 方法告知 User Agent 用户交互已结束，并允许应用将结果通知用户以及处理剩余的 UI 元素。

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*PaymentRequest complete 方法*

## 收集收货地址 {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

如果您是出售实体物品的商家，则可能需要通过 Payment Request API 收集用户的收货地址。这通过将 `requestShipping: true` 添加到 `options` 参数来实现。设置此参数后，“Shipping”将添加到 UI，用户可从已保存的地址列表中选择收货地址，也可以添加新的收货地址。

您也可以通过指定 `shippingType` 在 UI 中使用“Delivery”或“Pickup”替代“Shipping”。这仅作显示用途。

<div style="clear:both;"></div>

注： <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> 在初始化时必须为  <code>undefined</code> 或空数组才能接收  <code>shippingaddresschange</code> 事件。否则事件将无法触发。


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*交易选项*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

用户选择或添加新的收货地址时，系统会动态计算发货选项。您可以添加 `shippingaddresschange` 事件的侦听器，它在用户选择收货地址时触发。然后，可以验证是否能够发货到该地址，计算发货选项并以新的发货选项和计价信息更新 [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions`。您可以通过将某一选项的 `selected` 设为 `true` 来提供默认发货选项。

如果要出于地区不受支持等原因而拒绝使用某一地址，可以向 `details.shippingOptions` 传递空数组。UI 会通知用户，所选地址无法用于收货。

<div style="clear:both;"></div>

注：解析  <code>shippingaddresschange</code> 事件并保留 <code>details.shippingOptions</code> 的空数组状态也会导致地址遭拒（换言之，您无法发货到该地址）。请确保发货选项保持更新，并能匹配用户提供的地址。


    request.addEventListener('shippingaddresschange', e => {
      e.updateWith(((details, addr) => {
        if (addr.country === 'US') {
          var shippingOption = {
            id: '',
            label: '',
            amount: {currency: 'USD', value: '0.00'},
            selected: true
          };
          if (addr.region === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          } else {
            shippingOption.id = 'others';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          }
          if (details.displayItems.length === 2) {
            details.displayItems.splice(1, 0, shippingOption);
          } else {
            details.displayItems.splice(1, 1, shippingOption);
          }
          details.shippingOptions = [shippingOption];
        } else {
          details.shippingOptions = [];
        }
        return Promise.resolve(details);
      })(details, request.shippingAddress));
    });



<div class="attempt-right">
  <figure>
    <img src="images/10_shipping_address.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

用户确认支付请求后，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。应用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 对象的 `.shippingAddress` 属性，将收货地址和其他属性告知支付处理机构。

<div style="clear:both;"></div>


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON()
      };
      // Send information to the server
    });



## 添加发货选项 {: #shipping-options}
如果您的服务允许用户选择“free”、“standard”或“express”等发货选项，可以通过 Payment Request UI 来实现。要提供此类选项，请添加 [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) 属性及其选项至 `details` 对象。将一个选项设为 `selected: true` 后，UI 将其渲染为预设选项（这意味着您的总金额应反映该发货选项对应的价格）。


    var details = {
      total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
      displayItems: [
        {
          label: 'Original donation amount',
          amount: {currency: 'USD', value: '65.00'}
        },
        {
          label: 'Friends and family discount',
          amount: {currency: 'USD', value: '-10.00'}
        }
      ],
      shippingOptions: [
        {
          id: 'standard',
          label: 'Standard shipping',
          amount: {currency: 'USD', value: '0.00'},
          selected: true
        },
        {
          id: 'express',
          label: 'Express shipping',
          amount: {currency: 'USD', value: '12.00'}
        }
      ]
    };
    var request = new PaymentRequest(methodData, details, options);


注：如前所述， <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> 在初始化时必须为  <code>undefined</code> 或空数组才能接收  <code>shippingaddresschange</code> 事件。仅在发货选项不会随地址而变化的情况下（例如全球免费发货），才能在初始化时设置此值。

更改发货选项会导致价格变动。要添加运费并更改总价，可以为 `shippingoptionchange` 事件添加事件侦听器（用户选择发货选项时会触发该侦听器），这样您即可对选项数据执行程序化检查。您也可以根据收货地址更改运费。


    request.addEventListener('shippingoptionchange', e => {
      e.updateWith(((details, shippingOption) => {
        var selectedShippingOption;
        var otherShippingOption;
        if (shippingOption === 'standard') {
          selectedShippingOption = details.shippingOptions[0];
          otherShippingOption = details.shippingOptions[1];
          details.total.amount.value = '55.00';
        } else {
          selectedShippingOption = details.shippingOptions[1];
          otherShippingOption = details.shippingOptions[0];
          details.total.amount.value = '67.00';
        }
        if (details.displayItems.length === 2) {
          details.displayItems.splice(1, 0, selectedShippingOption);
        } else {
          details.displayItems.splice(1, 1, selectedShippingOption);
        }
        selectedShippingOption.selected = true;
        otherShippingOption.selected = false;
        return Promise.resolve(details);
      })(details, request.shippingOption));
    });


<div class="attempt-right">
  <figure>
    <img src="images/11_shipping_options.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

用户确认支付请求后，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。应用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 对象的 `.shippingOption` 属性，将发货选项和其他属性告知支付处理机构。

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option
        shippingOption: paymentResponse.shippingOption
      };
      // Send information to the server
    });



## 添加可选联系信息 {: #contact-information}
您还可以通过配置 `options` 对象，收集用户的电子邮件地址、电话号码或姓名。


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>支付请求界面</figcaption>
  </figure>
</div>

用户确认支付请求后，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。应用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 对象的 `.payerPhone`、`.payerEmail` 和/或 `.payerName` 属性，将用户的选择和其他属性告知支付处理机构。

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option string
        shippingOption: paymentResponse.shippingOption,
        // payer's phone number string
        phone: paymentResponse.payerPhone,
        // payer's email address string
        email: paymentResponse.payerEmail,
        // payer's name string
        name: paymentResponse.payerName
      };
      // Send information to the server
    });



## 让 PaymentRequest 获得渐进式增强 {: #request-progressive}
由于 Payment Request API 是一项新兴功能，许多浏览器尚未对其提供支持。要确定该功能是否可用，请查询 `window.PaymentRequest`。


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

注：最好使用普通的常规结账流程链接。然后使用 JavaScript 在支持 PaymentRequest 的情况下阻止导航。

## 汇总{: #putting-them-together}


    function onBuyClicked(event) {
      if (!window.PaymentRequest) {
        return;
      }
      // Payment Request API is available.
      // Stop the default anchor redirect.
      event.preventDefault();

      var supportedInstruments = [{
        supportedMethods: [
          'visa', 'mastercard', 'amex', 'discover', 'maestro',
          'diners', 'jcb', 'unionpay', 'bitcoin'
        ]
      }];

      var details = {
        displayItems: [{
          label: 'Original donation amount',
          amount: { currency: 'USD', value: '65.00' }
        }, {
          label: 'Friends and family discount',
          amount: { currency: 'USD', value: '-10.00' }
        }],
        total: {
          label: 'Total due',
          amount: { currency: 'USD', value : '55.00' }
        }
      };

      var options = {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true
      };

      // Initialization
      var request = new PaymentRequest(supportedInstruments, details, options);

      // When user selects a shipping address
      request.addEventListener('shippingaddresschange', e => {
        e.updateWith(((details, addr) => {
          var shippingOption = {
            id: '',
            label: '',
            amount: { currency: 'USD', value: '0.00' },
            selected: true
          };
          // Shipping to US is supported
          if (addr.country === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          // Shipping to JP is supported
          } else if (addr.country === 'JP') {
            shippingOption.id = 'jp';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          // Shipping to elsewhere is unsupported
          } else {
            // Empty array indicates rejection of the address
            details.shippingOptions = [];
            return Promise.resolve(details);
          }
          // Hardcode for simplicity
          if (details.displayItems.length === 2) {
            details.displayItems[2] = shippingOption;
          } else {
            details.displayItems.push(shippingOption);
          }
          details.shippingOptions = [shippingOption];

          return Promise.resolve(details);
        })(details, request.shippingAddress));
      });

      // When user selects a shipping option
      request.addEventListener('shippingoptionchange', e => {
        e.updateWith(((details) => {
          // There should be only one option. Do nothing.
          return Promise.resolve(details);
        })(details));
      });

      // Show UI then continue with user payment info
      request.show().then(result => {
        // POST the result to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(res => {
          // Only if successful
          if (res.status === 200) {
            return res.json();
          } else {
            throw 'Failure';
          }
        }).then(response => {
          // You should have received a JSON object
          if (response.success == true) {
            return result.complete('success');
          } else {
            return result.complete('fail');
          }
        }).then(() => {
          console.log('Thank you!',
              result.shippingAddress.toJSON(),
              result.methodName,
              result.details.toJSON());
        }).catch(() => {
          return result.complete('fail');
        });
      }).catch(function(err) {
        console.error('Uh oh, something bad happened: ' + err.message);
      });
    }

    // Assuming an anchor is the target for the event listener.
    document.querySelector('#start').addEventListener('click', onBuyClicked);



{# wf_devsite_translation #}
