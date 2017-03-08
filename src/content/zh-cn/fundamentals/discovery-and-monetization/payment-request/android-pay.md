project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Android Pay 支持简单而又安全的网上购物，让用户不必记忆和手动输入其支付信息。集成 Android Pay 可接触数以百万计的 Android 用户、推动转化率的提升以及为用户提供真正的一键式结账体验。

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# 将 Android Pay 集成到支付请求中 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay 支持简单而又安全的网上购物，让用户不必记忆和手动输入其支付信息。集成 Android Pay 可接触数以百万计的 Android 用户、推动转化率的提升以及为用户提供真正的一键式结账体验。




**简单：** 接受 Android Pay 很简便，不需要对支付处理做任何更改。
领先的[支付网关](/android-pay/)和处理平台同样在添加相关支持，为开发者实现 Android Pay 提供更大的便利。




**安全：** Android Pay 通过以安全方式存储对应用户支付账户的虚拟账号来完成支付。
这样一来，用户网上购物时就不必发送其实际的信用卡或借记卡号。
Android Pay 对每一笔支付交易加密，因此可确保用户数据的安全。


**支持：** 越来越多的国家/地区以及大多数主要信用卡网络和银行都支持 Android Pay，并且所有 KitKat 及更高版本的 Android 手机均提供该功能。请参阅此[帮助中心页面](https://support.google.com/androidpay/answer/6314169)，查看有关该功能在不同国家/地区和银行卡类型上提供情况的完整文档。



## 工作方式

<style>
.figures {
  display: flex;
  flex-wrap: wrap;
}
figure {
  flex-basis: 240px;
  margin: 10px 5px;
  text-align: center;
  float: left;
}
</style>

<div class="figures">
  <figure>
    <img src="images/how_it_works_1.png">
    <figcaption>1. 按“Checkout”。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. 弹出支付请求 UI。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. 选择支付方式等，然后按“Pay”。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. 弹出 Android Pay 应用时，点按以继续（系统可能提示用户解锁手机/使用指纹验证身份）</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. 结账完毕。</figcaption>
  </figure>
</div>

## 做好准备

### 必备知识

* 由于 Chrome 中的 Android Pay 使用 PaymentRequest API，因此必须先熟悉[集成指南](.)，然后再继续下一步。
* 即使您并非 Android 开发者，熟悉 [Android Pay 应用内 API](/android-pay/android/tutorial) 仍有帮助。因为 Android Pay 在 Android 和 Chrome 上返回的响应相同，所以有关响应处理的信息会有帮助。
* 查看 Android Pay 详细的[内容政策](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)，确保其支持您的特定商品或服务。

### 设置环境

* 确保设备上已安装 Android Pay 应用。您所在的国家/地区必须是其中一个受支持国家/地区，才能安装该应用。查看 [android.com/pay](https://www.android.com/pay/){: .external }，确认支持您所在的国家/地区。
* 如需测试，您需要向设备上的 Android Pay [添加一张信用卡](https://support.google.com/androidpay/answer/6289372)。
* 注册 Android Pay
    * 使用[此表单](https://androidpay.developers.google.com/signup)添加您的公司、网站来源以及公司电子邮件，等等。
* 确保[您的支付网关/处理机构支持 Android Pay 令牌](/android-pay/#processors)。
* 如果使用的是[网络令牌方法](#integration-using-network-token)，获取用于对来自 Android Pay 的响应加密的密钥对。
    * Google 建议与支付处理机构合作来获取一个公钥。这可以简化流程，因为处理机构将能处理 Android Pay 有效负荷的解密。详情请参阅支付处理机构文档。
    * 如果想自行处理加密，请参阅[支付令牌加密技术](/android-pay/integration/payment-token-cryptography)，了解如何生成 base64 编码椭圆曲线集成加密密钥。

## 将 Android Pay 集成到支付请求中
借助 Android Pay for Payment Request API，可以请求网关或网络这两种支付令牌类型中的其中一种类型。如果使用 Braintree、Stripe 或 Vantiv 作为支付网关，则可从 Android Pay 请求网关令牌。否则，可以请求加密网络令牌包。可以自行处理网络令牌，也可与处理机构合作，共同处理令牌包的解密。

### 网关令牌方法
Android Pay 并不处理支付。商家仍需调用网关 API，才能对从 Android Pay 返回的网关令牌进行收费/处理。

让 Android Pay API 返回网关令牌。以下是使用 Braintree、Stripe 或 Vantiv 时的建议流程。

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### 网络令牌方法
让 Android Pay API 返回加密网络令牌包。然后您可以自行解密令牌，或利用处理机构 API 来处理解密和对令牌收费。

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## 使用网关令牌集成
下例概述了如何直接从支付网关请求令牌。在本例中，我们概述如何请求 Stripe 令牌。如果使用的是 Braintree 或 Vantiv 等其他支付网关，请联系处理机构，了解不同支付网关的参数。

请求网关令牌时，Android Pay 会代表您调用处理机构，并返回可收费的网关令牌。

#### 参数


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          // Credit Cards allowed via Android Pay
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'GATEWAY_TOKEN',
            parameters: {
              'gateway': 'stripe',
              // Place your own Stripe publishable key here.
              'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
              'stripe:version': '2016-07-06'
            }
          }
        }
      }
    ];


要想按照网关令牌方法使用 Android Pay，请按上例添加一个包含下列参数的 JSON 对象。

* `supportedMethods: [ 'https://android.com/pay' ]`：表示这是一种使用 Android Pay 的支付方式。
* `data`：这些是尚未标准化的 Android Pay 专属值。
    * `merchantId`：通过[注册 Android Pay](https://androidpay.developers.google.com/signup) 获得的 Android Pay 商家 ID。
    * `environment:'TEST'`：使用 Android Pay 进行测试时添加此参数。生成的网关令牌将是无效令牌。
    * `allowedCardNetworks`：提供一个数组，其中包含的信用卡网络构成一个有效的 Android Pay 响应。它接受“AMEX”、“DISCOVER”、“MASTERCARD”和“VISA”。
    * `paymentMethodTokenizationParameters`：
        * `tokenizationType`：'GATEWAY_TOKEN'：表示采用的是网关令牌方法。
        * `parameters`：支付网关专属参数。请参阅特定支付网关的文档。

#### 处理 Android Pay 响应
添加 Android Pay 对象后，Chrome 可以请求可收费网关令牌。

    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


来自 PaymentRequest 的响应将包含 [PaymentRequest 集成指南](.)中所述示例内的配送和联系信息，但现在还会包括来自 Android Pay 的响应，其中包含

* 收费地址信息
* 联系信息
* 有关支付工具的信息
* 有关支付令牌的详情

对提交的网关令牌的处理方式取决于支付网关。请参阅特定网关的文档，了解更多详情。

#### 规则汇总


    function onBuyClicked() {
      const ANDROID_PAY = 'https://android.com/pay';

      if (!window.PaymentRequest) {
        // PaymentRequest API is not available. Forwarding to
        // legacy form based experience.
        location.href = '/checkout';
        return;
      }

      var supportedInstruments = [
        {
          supportedMethods: [
            'visa', 'mastercard', 'amex', 'discover', 'maestro',
            'diners', 'jcb', 'unionpay', 'bitcoin'
          ]
        },
        {
          supportedMethods: [ ANDROID_PAY ],
          data: {
            merchantId: '02510116604241796260',
            environment: 'TEST',
            allowedCardNetwork: [ 'AMEX', 'MASTERCARD', 'VISA', 'DISCOVER' ],
            paymentMethodTokenizationParameters: {
              tokenizationType: 'GATEWAY_TOKEN',
              parameters: {
                'gateway': 'stripe',
                'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
                'stripe:version': '2016-07-06'
              }
            }
          }
        }
      ];

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

    document.querySelector('#start').addEventListener('click', onBuyClicked);


### 使用网络令牌集成
请求网络令牌需要在 PaymentRequest 中包括两段信息。

1. `merchantId`：在注册时获得
1. `publicKey`：作为 `paymentMethodTokenizationParameters` 的一部分传递

#### 参数


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'NETWORK_TOKEN',
            parameters: {
              //public key to encrypt response from Android Pay
              'publicKey': 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
            }
          }
        }
      }
    ];


要想按照网络令牌方法使用 Android Pay，请按上例添加一个包含下列参数的 JSON 对象。

* `supportedMethods: [ 'https://android.com/pay' ]`：表示这是一种使用 Android Pay 的支付方式。
* `data`：
    * `merchantId`：通过[注册 Android Pay](https://androidpay.developers.google.com/signup) 获得的 Android Pay 商家 ID。
    * `environment:'TEST'`：使用 Android Pay 进行测试时添加此参数。生成的令牌将是无效令牌。在生产环境下，请移除这行代码。
    * `allowedCardNetworks`：提供一个数组，其中包含的信用卡网络构成一个有效的 Android Pay 响应。
    * `paymentMethodTokenizationParameters`：
        * `tokenizationType: 'NETWORK_TOKEN'`：表示采用的是网络令牌方法。
        * `parameters`：接收网络令牌所需的公钥。（请参阅[如何生成加密密钥](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)。）

#### 处理 Android Pay 响应
添加 Android Pay 对象后，Chrome 可以请求可收费网络令牌。


    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


来自 PaymentRequest 的加密响应将包含 [PaymentRequest 集成指南](.)中所述示例内的配送和联系信息，但现在还会包括来自 Android Pay 的响应，其中包含

* 令牌化信用卡信息
* 收费地址信息
* 有关支付工具的信息
* 有关支付令牌的详情

为简化网络令牌的集成，我们建议直接将加密有效负荷传递给支付网关，让它们处理解密。自行解密有效负荷更为复杂，涉及私钥的管理。请联系您的支付网关，确认是否提供该功能。

对提交的网络令牌的处理方式取决于支付网关。请参阅特定网关的文档，了解更多详情。

此处省略了一个代码示例，因为与网关令牌方法的差异只体现在 PaymentRequest 对象的构建上。


{# wf_devsite_translation #}
