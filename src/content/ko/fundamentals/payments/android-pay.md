project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay를 사용하면 온라인을 통해 간편하고 안전하게 상품을 구입할 수 있고 사용자가 결제 정보를 기억하고 있다가 수동으로 입력할 필요가 없습니다. Android Pay를 통합하여 수백만의 Android 사용자에게 접근하고 전환 비율을 더욱 높이고 사용자에게 진정한 원터치 체크아웃 환경을 제공해 보세요.

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# Android Pay를 결제 요청에 통합 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay를 사용하면 온라인을 통해 간편하고 안전하게
상품을 구입할 수 있고 사용자가 결제 정보를 기억하고 있다가 수동으로 입력할 필요가 없습니다.
Android Pay를 통합하여 수백만의 Android 사용자에게 접근하고 전환 비율을 더욱 높이고
사용자에게 진정한 원터치 체크아웃 환경을 제공해 보세요.

**간편:** Android Pay는 받아들이기 쉽고 결제 처리 방식을 따로 변경할
필요가 없습니다. 선도적인
[결제 게이트웨이](/android-pay/)와
처리 플랫폼 역시 개발자가 Android Pay를 훨씬 더 쉽게 사용할 수 있게 해주는
지원 기능이 추가되었습니다.

**안전:** Android Pay는 사용자의 결제 계정과 매핑되는 가상 계좌번호를
안전하게 저장해 줍니다.  따라서 사용자가 실제 신용카드 또는 직불카드 번호를 보낼 필요 없이
온라인으로 상품을 구입할 수 있습니다.  Android Pay는
모든 결제 트랜잭션를 암호화하여 사용자의 데이터를 안전하게 보호합니다.

**지원:** 점점 더 많은 국가와 대다수 주요 신용카드 회사와 은행에서 Android Pay를 지원하고
KitKat 이상 버전의 모든 Android 휴대폰에서
사용할 수 있습니다. 국가 및 카드 종류별 사용 가능 여부를 표시한 전체 문서는
[도움말 센터 페이지](https://support.google.com/androidpay/answer/6314169)를
참조하세요.

## 작동 방식

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
    <figcaption>1. 'Checkout'을 누릅니다.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. Payment Request UI가 나타납니다.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. 결제 방법 등을 선택하고 'Pay'를 누릅니다.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. Android Pay 앱이 나타나면 클릭하여 계속 진행합니다. 이때 휴대폰 잠금을 해제하거나 지문 인식으로 인증하라는 메시지가 표시될 수 있습니다.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. 체크아웃이 완료됩니다.</figcaption>
  </figure>
</div>

## 준비 절차

### 필요한 지식

* Chrome에서 Android Pay는 PaymentRequest API를 사용하므로, [통합 가이드](.)의 내용을 숙지한 후 계속 진행해야 합니다.
* Android 개발자가 아닌 사람이라도 [Android Pay 인앱 API](/android-pay/android/tutorial)를 익혀두면 유용할 것입니다. Android Pay에서 반환되는 응답은 Android와 Chrome에서 동일하므로 응답 처리에 대한 정보가 유용합니다.
* Android Pay의 자세한 [콘텐츠 정책](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)을 검토하여 특정 상품이나 서비스가 지원되는지 확인하세요.

### 환경 설정

* 기기에 Android Pay 앱이 설치되어 있는지 확인하세요. 일부 국가에서는 Android Play 앱 설치가 지원되지 않습니다. [android.com/pay](https://www.android.com/pay/){: .external }에서 앱 설치가 지원되는 국가를 확인할 수 있습니다.
* 테스트를 위해서는 기기에 설치된 Android Pay에 [신용카드를 추가](https://support.google.com/androidpay/answer/6289372)해야 합니다.
* Android Pay 가입
    * [이 양식](https://androidpay.developers.google.com/signup)을 사용하여 회사, 사이트 출처, 회사 이메일 주소 등을 추가합니다.
* [결제 게이트웨이/결제 대행사가 Android Pay 토큰을 지원](/android-pay/#processors)하는지 확인하세요.
* [네트워크 토큰 접근방식](#integration-using-network-token)을 사용하는 경우 Android Pay의 응답을 암호화하는 데 사용되는 키 쌍을 가져옵니다.
    * Google에서는 결제 대행사와 업무 관계를 맺어 공개 키를 확보할 것을 권장합니다. 공개 키가 있으면 결제 대행사가 Android Pay Payload 복호화를 처리할 수 있으므로 절차가 간단해집니다. 결제 대행사 문서에서 더 자세한 내용을 확인해 보세요.
    * 암호화를 스스로 처리하고 싶다면, base64 인코딩된 Elliptic Curve Integrated Encryption 키를 생성하는 방법을 설명한 [결제 토큰 암호화](/android-pay/integration/payment-token-cryptography)를 참조하세요.

## Android Pay를 결제 요청으로 통합
Android Pay for Payment Request API를 사용하면 게이트웨이 또는 네트워크의 두 가지 결제 토큰 유형 중 하나를 요청할 수 있습니다. Braintree, Stripe 또는 Vantiv를 결제 게이트웨이로 사용 중인 경우에는 Android Pay로부터 게이트웨이 토큰을 요청할 수 있습니다. 그렇지 않으면 암호화된 네트워크 토큰 번들을 요청할 수도 있습니다. 네트워크 토큰을 스스로 처리하거나 대행사와 협조하여 토큰 번들 복호화를 처리할 수 있습니다.

### 게이트웨이 토큰 접근방식
Android Pay가 결제를 처리하는 것은 아닙니다. 판매자는 Android Pay에서 반환되는 게이트웨이 토큰에 대한 대금을 청구/처리하려면 여전히 게이트웨이 API를 호출해야 할 것입니다.

Android Pay API가 게이트웨이 토큰을 반환하도록 합니다. 이는 Braintree, Stripe 또는 Vantiv를 사용 중인 경우 권장되는 흐름입니다.

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### 네트워크 토큰 접근방식
Android Pay API가 암호화된 네트워크 토큰 번들을 반환하도록 합니다. 그러면 스스로 토큰을 복호화하거나 대행사 API를 활용하여 복호화를 처리하고 토큰을 청구할 수 있습니다.

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## 게이트웨이 토큰을 사용한 통합
다음은 결제 게이트웨이에서 직접 토큰을 요청하는 방법을 개략적으로 보여주는 예시입니다. 이 예시에서는 Stripe 토큰 요청 방법을 보여줍니다. Braintree 또는 Vantiv와 같은 다른 결제 게이트웨이를 사용하는 경우 대행사에 결제 게이트웨이에 관련된 특정 매개변수가 있는지 문의하세요.

게이트웨이 토큰 요청 시, Android Pay가 결제 대행사로 대신 연락하여 청구 가능한 게이트웨이 토큰을 반환해 줍니다.

#### 매개변수


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


게이트웨이 토큰 접근방식으로 Android Pay를 사용하려면 위 예시에 따라 다음 매개변수가 있는 JSON 객체를 추가하세요.

* `supportedMethods: [ 'https://android.com/pay' ]`: Android Pay를 사용하는 결제 방법임을 나타냅니다.
* `data`: 아직 표준화되지 않은 Android Pay 관련 값입니다.
    * `merchantId`: [Android Pay에 등록](https://androidpay.developers.google.com/signup)하여 얻은 Android Pay Merchant ID입니다.
    * `environment:'TEST'`: Android Pay로 테스트 중인 경우 이 매개변수를 추가하세요. 이때 생성되는 게이트웨이 토큰은 무효 토큰입니다.
    * `allowedCardNetworks`: 유효한 Android Pay 응답을 구성하는 일련의 신용카드 네트워크를 제공합니다. 'AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'를 허용합니다.
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType`: 'GATEWAY_TOKEN': 게이트웨이 토큰 접근방식을 따르고 있음을 나타냅니다.
        * `parameters`: 결제 게이트웨이 관련 매개변수입니다. 관련 결제 게이트웨이 문서를 참조하세요.

#### Android Pay 응답 처리
Android Pay 객체를 추가하면 Chrome이 청구 가능한 게이트웨이 토큰을 요청할 수 있습니다.

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


[PaymentRequest 통합 가이드](.)에 나와 있는 예시에서처럼 PaymentRequest에서 받은 응답에는 배송 및 연락처 정보가 포함되겠지만, 지금은 다음 정보를 포함한 Android Pay의 추가 응답이 포함되어 있습니다.

* 청구 주소 정보
* 연락처 정보
* 결제 수단에 대한 정보
* 결제 토큰에 대한 세부 정보

제출된 게이트웨이 토큰의 처리 방법은 결제 게이트웨이에 따라 다릅니다. 자세한 내용은 특정 게이트웨이의 문서를 참조하세요.

#### 종합적으로 살펴보기


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


### 네트워크 토큰을 사용한 통합
네트워크 토큰을 요청하려면 PaymentRequest에 다음 두 가지 정보를 포함시켜야 합니다.

1. 등록 시 얻은 `merchantId`
1. `paymentMethodTokenizationParameters`의 일부로 전달되는 `publicKey`

#### 매개변수


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


네트워크 토큰 접근방식으로 Android Pay를 사용하려면 위 예시에 따라 다음 매개변수가 있는 JSON 객체를 추가하세요.

* `supportedMethods: [ 'https://android.com/pay' ]`: Android Pay를 사용하는 결제 방법임을 나타냅니다.
* `data`:
    * `merchantId`: [Android Pay에 등록](https://androidpay.developers.google.com/signup)하여 얻은 Android Pay Merchant ID입니다.
    * `environment:'TEST'`: Android Pay로 테스트 중인 경우 이 매개변수를 추가하세요. 이때 생성되는 토큰은 무효 토큰입니다.  프로덕션 환경에서 사용하려면 이 줄을 삭제하세요.
    * `allowedCardNetworks`: 유효한 Android Pay 응답을 구성하는 일련의 신용카드 네트워크를 제공합니다.
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType: 'NETWORK_TOKEN'`: 네트워크 토큰 접근방식을 따르고 있음을 나타냅니다.
        * `parameters`: 네트워크 토큰 수신에 필요한 공개 키입니다. ([암호화 키 생성 방법](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)을 참조하세요.)

#### Android Pay 응답 처리
Android Pay 객체를 추가하면 Chrome이 청구 가능한 네트워크 토큰을 요청할 수 있습니다.


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


[PaymentRequest 통합 가이드](.)에 나와 있는 예시에서처럼 PaymentRequest에서 받은 암호화된 응답에는 배송 및 연락처 정보가 포함되겠지만, 지금은 다음 정보를 포함한 Android Pay의 추가 응답이 포함되어 있습니다.

* 토큰화된 신용카드 정보
* 청구 주소 정보
* 결제 수단에 대한 정보
* 결제 토큰에 대한 세부 정보

네트워크 토큰을 더욱 간단히 통합하기 위해, 결제 게이트웨이로 암호화된 페이로드를 직접 전달하여 복호화를 처리할 수 있도록 하는 것이 좋습니다.  페이로드를 직접 복호화하는 작업은 복잡하고 비공개 키를 관리해야 하는 문제도 있습니다.  따라서 결제 게이트웨이 회사에 연락해 이 기능을 지원하는지 확인해 보세요.

제출된 네트워크 토큰의 처리 방법은 결제 게이트웨이에 따라 다릅니다. 자세한 내용은 특정 게이트웨이의 문서를 참조하세요.

PaymentRequest 객체 생성을 제외하면 게이트웨이 토큰 접근방식과 차이가 없으므로 여기서는 코드 예시를 생략합니다.


{# wf_devsite_translation #}
