project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Android Pay 支持簡單而又安全的網上購物，讓用戶不必記憶和手動輸入其支付信息。集成 Android Pay 可接觸數以百萬計的 Android 用戶、推動轉化率的提升以及爲用戶提供真正的一鍵式結賬體驗。

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# 將 Android Pay 集成到支付請求中 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay 支持簡單而又安全的網上購物，讓用戶不必記憶和手動輸入其支付信息。集成 Android Pay 可接觸數以百萬計的 Android 用戶、推動轉化率的提升以及爲用戶提供真正的一鍵式結賬體驗。




**簡單：** 接受 Android Pay 很簡便，不需要對支付處理做任何更改。
領先的[支付網關](/android-pay/)和處理平臺同樣在添加相關支持，爲開發者實現 Android Pay 提供更大的便利。




**安全：** Android Pay 通過以安全方式存儲對應用戶支付賬戶的虛擬賬號來完成支付。
這樣一來，用戶網上購物時就不必發送其實際的信用卡或借記卡號。
Android Pay 對每一筆支付交易加密，因此可確保用戶數據的安全。


**支持：** 越來越多的國家/地區以及大多數主要信用卡網絡和銀行都支持 Android Pay，並且所有 KitKat 及更高版本的 Android 手機均提供該功能。請參閱此[幫助中心頁面](https://support.google.com/androidpay/answer/6314169)，查看有關該功能在不同國家/地區和銀行卡類型上提供情況的完整文檔。



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
    <figcaption>2. 彈出支付請求 UI。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. 選擇支付方式等，然後按“Pay”。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. 彈出 Android Pay 應用時，點按以繼續（系統可能提示用戶解鎖手機/使用指紋驗證身份）</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. 結賬完畢。</figcaption>
  </figure>
</div>

## 做好準備

### 必備知識

* 由於 Chrome 中的 Android Pay 使用 PaymentRequest API，因此必須先熟悉[集成指南](.)，然後再繼續下一步。
* 即使您並非 Android 開發者，熟悉 [Android Pay 應用內 API](/android-pay/android/tutorial) 仍有幫助。因爲 Android Pay 在 Android 和 Chrome 上返回的響應相同，所以有關響應處理的信息會有幫助。
* 查看 Android Pay 詳細的[內容政策](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)，確保其支持您的特定商品或服務。

### 設置環境

* 確保設備上已安裝 Android Pay 應用。您所在的國家/地區必須是其中一個受支持國家/地區，才能安裝該應用。查看 [android.com/pay](https://www.android.com/pay/){: .external }，確認支持您所在的國家/地區。
* 如需測試，您需要向設備上的 Android Pay [添加一張信用卡](https://support.google.com/androidpay/answer/6289372)。
* 註冊 Android Pay
    * 使用[此表單](https://androidpay.developers.google.com/signup)添加您的公司、網站來源以及公司電子郵件，等等。
* 確保[您的支付網關/處理機構支持 Android Pay 令牌](/android-pay/#processors)。
* 如果使用的是[網絡令牌方法](#integration-using-network-token)，獲取用於對來自 Android Pay 的響應加密的密鑰對。
    * Google 建議與支付處理機構合作來獲取一個公鑰。這可以簡化流程，因爲處理機構將能處理 Android Pay 有效負荷的解密。詳情請參閱支付處理機構文檔。
    * 如果想自行處理加密，請參閱[支付令牌加密技術](/android-pay/integration/payment-token-cryptography)，瞭解如何生成 base64 編碼橢圓曲線集成加密密鑰。

## 將 Android Pay 集成到支付請求中
藉助 Android Pay for Payment Request API，可以請求網關或網絡這兩種支付令牌類型中的其中一種類型。如果使用 Braintree、Stripe 或 Vantiv 作爲支付網關，則可從 Android Pay 請求網關令牌。否則，可以請求加密網絡令牌包。可以自行處理網絡令牌，也可與處理機構合作，共同處理令牌包的解密。

### 網關令牌方法
Android Pay 並不處理支付。商家仍需調用網關 API，才能對從 Android Pay 返回的網關令牌進行收費/處理。

讓 Android Pay API 返回網關令牌。以下是使用 Braintree、Stripe 或 Vantiv 時的建議流程。

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### 網絡令牌方法
讓 Android Pay API 返回加密網絡令牌包。然後您可以自行解密令牌，或利用處理機構 API 來處理解密和對令牌收費。

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## 使用網關令牌集成
下例概述瞭如何直接從支付網關請求令牌。在本例中，我們概述如何請求 Stripe 令牌。如果使用的是 Braintree 或 Vantiv 等其他支付網關，請聯繫處理機構，瞭解不同支付網關的參數。

請求網關令牌時，Android Pay 會代表您調用處理機構，並返回可收費的網關令牌。

#### 參數


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


要想按照網關令牌方法使用 Android Pay，請按上例添加一個包含下列參數的 JSON 對象。

* `supportedMethods: [ 'https://android.com/pay' ]`：表示這是一種使用 Android Pay 的支付方式。
* `data`：這些是尚未標準化的 Android Pay 專屬值。
    * `merchantId`：通過[註冊 Android Pay](https://androidpay.developers.google.com/signup) 獲得的 Android Pay 商家 ID。
    * `environment:'TEST'`：使用 Android Pay 進行測試時添加此參數。生成的網關令牌將是無效令牌。
    * `allowedCardNetworks`：提供一個數組，其中包含的信用卡網絡構成一個有效的 Android Pay 響應。它接受“AMEX”、“DISCOVER”、“MASTERCARD”和“VISA”。
    * `paymentMethodTokenizationParameters`：
        * `tokenizationType`：'GATEWAY_TOKEN'：表示採用的是網關令牌方法。
        * `parameters`：支付網關專屬參數。請參閱特定支付網關的文檔。

#### 處理 Android Pay 響應
添加 Android Pay 對象後，Chrome 可以請求可收費網關令牌。

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


來自 PaymentRequest 的響應將包含 [PaymentRequest 集成指南](.)中所述示例內的配送和聯繫信息，但現在還會包括來自 Android Pay 的響應，其中包含

* 收費地址信息
* 聯繫信息
* 有關支付工具的信息
* 有關支付令牌的詳情

對提交的網關令牌的處理方式取決於支付網關。請參閱特定網關的文檔，瞭解更多詳情。

#### 規則彙總


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


### 使用網絡令牌集成
請求網絡令牌需要在 PaymentRequest 中包括兩段信息。

1. `merchantId`：在註冊時獲得
1. `publicKey`：作爲 `paymentMethodTokenizationParameters` 的一部分傳遞

#### 參數


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


要想按照網絡令牌方法使用 Android Pay，請按上例添加一個包含下列參數的 JSON 對象。

* `supportedMethods: [ 'https://android.com/pay' ]`：表示這是一種使用 Android Pay 的支付方式。
* `data`：
    * `merchantId`：通過[註冊 Android Pay](https://androidpay.developers.google.com/signup) 獲得的 Android Pay 商家 ID。
    * `environment:'TEST'`：使用 Android Pay 進行測試時添加此參數。生成的令牌將是無效令牌。在生產環境下，請移除這行代碼。
    * `allowedCardNetworks`：提供一個數組，其中包含的信用卡網絡構成一個有效的 Android Pay 響應。
    * `paymentMethodTokenizationParameters`：
        * `tokenizationType: 'NETWORK_TOKEN'`：表示採用的是網絡令牌方法。
        * `parameters`：接收網絡令牌所需的公鑰。（請參閱[如何生成加密密鑰](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)。）

#### 處理 Android Pay 響應
添加 Android Pay 對象後，Chrome 可以請求可收費網絡令牌。


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


來自 PaymentRequest 的加密響應將包含 [PaymentRequest 集成指南](.)中所述示例內的配送和聯繫信息，但現在還會包括來自 Android Pay 的響應，其中包含

* 令牌化信用卡信息
* 收費地址信息
* 有關支付工具的信息
* 有關支付令牌的詳情

爲簡化網絡令牌的集成，我們建議直接將加密有效負荷傳遞給支付網關，讓它們處理解密。自行解密有效負荷更爲複雜，涉及私鑰的管理。請聯繫您的支付網關，確認是否提供該功能。

對提交的網絡令牌的處理方式取決於支付網關。請參閱特定網關的文檔，瞭解更多詳情。

此處省略了一個代碼示例，因爲與網關令牌方法的差異只體現在 PaymentRequest 對象的構建上。


{# wf_devsite_translation #}
