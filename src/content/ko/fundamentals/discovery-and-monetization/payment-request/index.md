project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Payment Request API는 웹 환경에서 빠르고 쉬운 결제를 위한 것입니다.

{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2016-12-06 #}

# Payment Request API: 통합 가이드 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Dogfood: `PaymentRequest`는 여전히 개발 중에 있습니다. 이 API가 구현하기에 충분히
안정적이라고 생각하지만, 계속 변경될 가능성이 있습니다. 이 API의 현재 상태를 항상 반영하도록 이 페이지를
지속적으로 업데이트할 것입니다([M56 변경 사항](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)).
한편, 이전 버전과 호환되지 않을 수도 있는 API 변경 사항으로부터 스스로를 보호할 수 있도록
사이트에 삽입할 수 있는 [심](https://storage.googleapis.com/prshim/v1/payment-shim.js)을
제공하고 있습니다. 심은 두 가지 주요 Chrome 버전에 대한 모든 API
차이점을 숨겨줍니다.


상품을 온라인으로 구입하는 것은 편리하지만, 종종 짜증스러운 경험이기도 합니다. 특히, 휴대기기인 경우 그렇습니다. 모바일 트래픽이 계속해서 증가하기는 하지만 모바일 전환은 전체 완료된 구매의 1/3 정도만 처리합니다. 다시 말해, 사용자는 데스크톱 구매 시보다 모바일 구매 시 구매 포기율이 2배 더 높습니다. 그 이유는 무엇일까요?

![](images/1_why_users_abandon.png)

*사용자가 모바일 구매 양식을 포기하는 이유*

온라인 구매 양식은 사용자 작업이 많고, 사용이 어려우며, 로드 및 새로고침이 느리고, 여러 단계를 완료해야 합니다. 그 이유는 두 가지 주요 온라인 결제 구성 요소인 보안 및 편의성이 종종 서로 어긋나서 작동하기 때문입니다. 즉, 하나가 더 좋으면 다른 하나는 상대적으로 나쁘기 때문입니다.

포기를 초래하는 대부분의 문제는 구매 양식과 직접적으로 관련이 있을 수 있습니다. 각각의 앱이나 사이트는 고유한 데이터 입력 및 검증 프로세스를 가지며, 사용자는 흔히 각 앱의 구매 지점에서 동일한 정보를 입력해야 한다는 것을 알게 됩니다. 또한, 애플리케이션 개발자는 여러 고유한 결제 방법을 지원하는 구매 흐름을 생성하는 데 어려움을 겪고 있습니다. 결제 방법 요구사항에 사소한 차이가 있다 하더라도 이러한 차이는 양식 작성 및 제출 프로세스를 복잡하게 만들 수 있습니다.

이러한 문제의 하나 이상을 개선하거나 해결하는 시스템이 있다면 무엇이든 정말 반가운 변화입니다. [자동완성](/web/updates/2015/06/checkout-faster-with-autofill) 기능으로 이미 문제 해결을 시작하기는 했지만, 이제 더욱 종합적인 해결책에 대해 알아보도록 하겠습니다.

## Payment Request API 소개 {: #introducing }

Payment Request API는 *체크아웃 양식을 없애는 데* 도움이 되는 시스템입니다. 이 API는 더욱 일관된 사용자 환경을 제공하고 웹 판매자가 이질적인 결제 방법을 손쉽게 활용할 수 있도록 지원함으로써 구매 프로세스 도중 사용자 워크플로를 상당히 향상시킵니다. Payment Request API는 새로운 결제 방법이 아니며, 결제 프로세서와 직접 통합되지도 않으며, 목표가 다음과 같은 프로세스 계층입니다.

* 브라우저가 판매자, 사용자 및 결제 방법 사이에서 중재자 역할을 하도록 지원
* 결제 커뮤니케이션 흐름을 최대한 표준화
* 다양한 보안 결제 방법을 원활하게 지원
* 모든 브라우저, 기기 또는 플랫폼(모바일 또는 기타)에서 작동

Payment Request API는 판매자가 단일 API 호출에서 결제를 요청하고 승인할 수 있도록 허용함으로써 기존의 체크아웃 흐름을 대체하는 다중 브라우저(cross-browser) 지원 오픈 표준입니다. Payment Request API를 사용하면 사용자가 결제 요청을 승인하거나 거부하기 전에 입력을 제공하는 동시에 웹페이지에서 사용자 에이전트와 정보를 교환할 수 있습니다.

무엇보다도, 중개자 역할을 하는 브라우저에서는 빠른 체크아웃에 필요한 모든 정보를 브라우저에 저장할 수 있으므로 사용자는 한 번의 클릭만으로 확인 및 결제 작업을 수행할 수 있습니다.

### 결제 트랜잭션 프로세스 {: #transaction-process }
Payment Request API를 사용하면 트랜잭션 프로세스가 사용자와 판매자 모두에게 최대한 원활하게 수행됩니다.

![](images/4_the_payment_transaction_process.png)

*결제 트랜잭션 프로세스*

판매자 사이트가 새 `PaymentRequest`를 생성하고 브라우저에 구매하는 데 필요한 모든 정보(결제 금액, 결제에 사용해야 할 통화 및 사이트에서 허용되는 결제 방법)를 전달하면 이 프로세스가 시작됩니다. 브라우저가 사이트에 대해 수락된 결제 방법과 사용자가 대상 기기에 설치한 방법 사이의 호환성을 확인합니다.

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>


그런 다음, 사용자에게 결제 UI를 제공합니다. 이 사용자가 결제 방법을 선택하고 트랜잭션을 승인하게 됩니다. 결제 방법은 브라우저에 이미 저장된 신용카드와 같이 간단하거나 사이트에 결제 정보를 제공(이 기능은 곧 제공될 예정임)하도록 특별히 작성된 타사 애플리케이션처럼 난해할 수도 있습니다. 사용자가 트랜잭션을 승인하고 나면 모든 필요한 결제 정보가 사이트에 바로 다시 전송됩니다. 예를 들어, 신용카드 결제의 경우 사이트에 카드 번호, 카드 소지자 이름, 만료일 및 CVC가 다시 전송됩니다.

Payment Request는 추가 정보(예: 배송 주소 및 옵션, 결제자 이메일 및 결제자 전화번호)를 반환하도록 확장될 수도 있습니다. 이를 통해 사용자에게 체크아웃 양식을 보여주지 않고도 결제를 마무리하는 데 필요한 모든 정보를 얻을 수 있습니다.


새 프로세스의 장점은 세 가지입니다. 사용자 관점에서는, 지긋지긋한 이전 상호작용(요청, 승인, 결제 및 결과) 일체를 이제 하나의 단계로 수행하고, 웹사이트 관점에서는 단일 JavaScript API 호출만 필요하고, 결제 방법의 관점에서는 프로세스 변화가 없다는 점입니다.

<div style="clear:both;"></div>

## Payment Request API 사용 {: #using }

### Payment Request API 심 로드

현재 적용되는 이 표준 API를 따라잡기 위한 수고를 덜기 위해 코드의
`<head>` 섹션에 이 심을 반드시 추가하는 것이 좋습니다. 이 심은
API 변경 사항으로 업데이트되고 코드가 최소한 2가지 이상의 Chrome 주요 릴리스에서
계속 작동하도록 해줄 것입니다.


    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### PaymentRequest 생성 {: #create-paymentrequest }

첫 번째 단계는 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor) 생성자를 호출하여 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) 객체를 생성하는 것입니다. 이 단계는 일반적으로(그러나 항상은 아님) 구매 의향을 나타내는 사용자 시작 작업과 관련됩니다. 이 객체는 필요한 데이터를 포함하는 매개변수를 사용하여 생성됩니다.

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*PaymentRequest 생성자*

#### methodData 매개변수 {: #methoddata-parameter }

`methodData` 매개변수는 지원되는 결제 방법 목록과 관련된 경우 결제 방법에 대한 추가 정보를 포함합니다. 이 시퀀스는 `PaymentMethodData` 사전을 포함합니다. 이 사전에는 앱이 승인할 결제 방법과 관련된 표준 식별자와 모든 결제 방법 관련 데이터가 포함됩니다. 자세한 내용은 [Payment Request API Architecture](https://w3c.github.io/browser-payment-api/specs/architecture.html)를 참조하세요.

지금 현재 Chrome에서 `PaymentRequest`는 표준 신용카드인 '`amex`', '`diners`', '`discover`', '`jcb`', '`maestro`', '`mastercard`', '`unionpay`' 및 '`visa`'만 지원합니다.


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*결제 방법과 데이터*

#### details 매개변수 {: #details-parameter }

`details` 매개 변수는 트랜잭션에 대한 정보를 포함합니다. 두 가지 주요 구성 요소가 있습니다. 하나는 total로, 부과되는 총 금액과 통화를 나타내고, 다른 하나는 선택 항목인 `displayItems` 집합으로, 최종 금액이 어떻게 계산되는지를 나타냅니다. 이 매개변수는 품목 목록을 나타내지 않지만, 주문의 주요 구성 요소인 소계, 할인, 세금, 배송비 등에 대한 요약을 나타냅니다.

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

Payment Request API가 산술 연산을 수행하지 않는다는 점도 유의하세요. 즉, 이 API에서 디스플레이 구성 요소가 총 결제액을 올바르게 계산하는지 확인하지 않으며 그렇게 할 수도 없습니다. 이러한 계산은 개발자 책임입니다. 따라서 항상 품목이 동일한 총 금액으로 계산되는지 직접 확인해야 합니다. 또한, `PaymentRequest`는 환불을 지원하지 않으므로 금액이 항상 양수여야 합니다(단, 할인 품목과 같은 개별 품목은 음수일 수 있음).

개발자가 레이블을 정의하고 사용자 언어를 기준으로 올바른 통화 형식을 자동으로 렌더링하면 브라우저가 이 레이블을 렌더링합니다. 참고로, 레이블은 개발자 콘텐츠와 동일한 언어로 렌더링되어야 합니다.

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


*트랜잭션 세부정보*

`pending`은 배송 주소나 배소 옵션의 선택에 따라 배송 또는 과세 금액과 같은 항목을 표시하기 위해 흔히 사용됩니다. Chrome은 UI에서 결제 요청을 위해 보류 중인 필드를 표시합니다.

`details`에 사용되는 반복되거나 계산된 값은 문자열 리터럴 또는 개별 문자열 변수로 지정될 수 있습니다.


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*PaymentRequest 변수*

### PaymentRequest 표시 {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

해당 [`show()`](https://www.w3.org/TR/payment-request/#show) 메서드를 호출하여 `PaymentRequest` 인터페이스를 활성화합니다. 이 방법은 사용자가 구매 정보를 검토하고, 정보를 추가 또는 변경하고, 최종적으로 결제할 수 있도록 지원하는 기본 UI를 호출합니다. 사용자가 결제 요청을 수락하거나 거절하면 이를 확인하는 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)(해당 `then()` 메서드 및 콜백 함수로 지정됨)가 반환됩니다.

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*PaymentRequest의 show 메서드*

### Payment Request 중단 {: #abort-paymentrequest }
해당 [`abort()`](https://www.w3.org/TR/payment-request/#abort) 메서드를 호출하여 `PaymentRequest`를 의도적으로 중단할 수 있습니다. 쇼핑 세션의 시간이 초과되거나 장바구니에 담은 품목이 트랜잭션 중에 매진 상태일 때 특히 유용합니다.

예를 들어, 품목을 더 이상 구매할 수 없거나 사용자가 할당된 시간 안에 구매를 확정하지 못한 경우와 같이 `show()` 메서드가 호출되었지만 프라미스에서 확인하기 전에 앱이 결제 요청을 취소해야 할 경우 이 메서드를 사용합니다.

요청을 중단하면 `PaymentRequest`의 새 인스턴스를 생성해야만 `show()`를 다시 호출할 수 있습니다.


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*PaymentRequest의 abort 메서드*

### PaymentResponse 처리 {: # process-paymentresponse}
사용자가 결제 요청을 승인하면 [`show()`](https://www.w3.org/TR/payment-request/#show) 메서드의 프라미스가 이를 확인하고 `PaymentResponse` 객체가 반환됩니다.

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code>에는 다음과 같은 필드가 있습니다.</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>선택한 결제 방법이 무엇인지를 나타내는 문자열(예: visa)</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td> <code>methodName</code> 의 정보를 포함하는 사전</td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>사용자의 배송 주소(요청된 경우)</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>선택한 배송 옵션의 ID(요청된 경우)</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>결제자의 이메일 주소(요청된 경우)</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>결제자의 전화번호(요청된 경우)</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>결제자의 이름(요청된 경우)</td>
</tr>
</table>


신용카드 결제의 경우, 응답은 표준화되어 있습니다. 비신용카드 결제의 경우(예: Android Pay), 응답은 제공업체가 지정합니다. 신용카드 응답에는 다음 사전이 포함됩니다.

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

결제 정보를 수령하면 앱이 처리를 위해 결제 정보를 결제 프로세서에 제출해야 합니다. UI에서는 요청이 처리되는 동안 스피너를 표시합니다. 응답이 돌아오면 앱이 `complete()`를 호출하여 UI를 닫아야 합니다.


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
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

[`complete()`](https://www.w3.org/TR/payment-request/#complete) 메서드는 사용자 상호작용이 끝났다는 것을 User Agent에 알리고 앱이 사용자에게 결과를 통보하고 나머지 UI 요소 처분을 처리할 수 있도록 허용합니다.

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*PaymentRequest의 complete 메서드*

## 배송 주소 수집 {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

여러분이 실제 상품을 판매하는 판매자라면 Payment Request API를 사용하여 사용자의 배송 주소를 수집하기를 원할 것입니다. 이 작업은 `requestShipping: true`를 `options` 매개변수에 추가하여 수행할 수 있습니다. 이 매개변수가 설정된 상태에서는 'Shipping'이 UI에 추가되고, 사용자가 저장된 주소 목록에서 선택하거나 새 배송 주소를 추가할 수 있습니다.

또는 `shippingType`을 지정하여 UI에 'Shipping' 대신 'Delivery' 또는 'Pickup'을 사용할 수 있습니다. 이는 표시 전용입니다.

<div style="clear:both;"></div>

참고:  <code>shippingaddresschange</code> 이벤트를 수신하기 위해서는 초기화 시  <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code>가  <code>undefined</code>이거나 빈 배열이어야 합니다. 그렇지 않으면 이벤트가 발생하지 않습니다.


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*트랜잭션 옵션*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

배송 옵션은 사용자가 새 배송 주소를 선택하거나 추가할 때마다 동적으로 계산될 수 있습니다. 사용자가 배송 주소를 선택하면 발생하는 `shippingaddresschange` 이벤트에 대한 이벤트 리스너를 추가할 수 있습니다. 그런 다음, 해당 주소로 배송할 수 있는지를 검증하고, 배송 옵션을 계산하고, [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions`를 새 배송 옵션 및 가격 정보로 업데이트할 수 있습니다. 옵션에서 `selected`를 `true`로 설정하여 기본 배송 옵션을 제공할 수 있습니다.

지원되지 않는 지역과 같은 이유로 주소를 거부하려면 `details.shippingOptions`를 빈 배열로 전달해야 합니다. 그러면 UI가 사용자에게 선택한 주소로 배송할 수 없음을 알립니다.

<div style="clear:both;"></div>

참고:  <code>shippingaddresschange</code> 이벤트를 해결하고  <code>details.shippingOptions</code>를 빈 배열로 유지하는 것은 주소 거부(즉, 해당 위치로 배송할 수 없음)를 의미하기도 합니다. 항상 배송 옵션이 최신이고 사용자가 제공한 주소와 일치하도록 확인해야 합니다.


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
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

사용자가 결제 요청을 승인하면 [`show()`](https://www.w3.org/TR/payment-request/#show) 메서드의 프라미스가 이를 확인합니다. 앱은 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 객체의 `.shippingAddress` 속성을 사용하여 다른 속성과 함께 배송 주소를 결제 프로세서에 알릴 수 있습니다.

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



## 배송 옵션 추가 {: #shipping-options}
제공하는 서비스에서 사용자가 배송 옵션(예: '무료', '표준' 또는 '특급')을 선택할 수 있도록 허용할 경우 결제 요청 UI를 통해 이를 수행할 수도 있습니다. 이러한 선택 옵션을 제공하려면 [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) 속성 및 해당 옵션을 `details` 객체에 추가합니다. 하나의 선택 옵션을 `selected: true`로 설정하면 UI가 이를 사전 선택된 것으로 렌더링합니다(즉, 총 금액이 배송 옵션 비용을 반영해야 함).


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


참고: 앞에서 설명한 것처럼  <code>shippingaddresschange</code> 이벤트를 수신하기 위해서는 초기화 시  <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code>가  <code>undefined</code>이거나 빈 배열이어야 합니다. 주소에 맞게 배송 옵션이 변경되지 않을 경우에만(예: 해외 무료 배송) 초기화 시 이 값을 설정해야 합니다.

배송 옵션을 변경하면 가격이 달라질 수 있습니다. 배송비를 더하여 총 가격을 변경하려면 사용자가 배송 옵션을 선택하면 발생하는 `shippingoptionchange` 이벤트에 대한 이벤트 리스너를 추가하면 됩니다. 그러면 옵션 데이터에 대한 프로그래밍 방식의 검토를 실행할 수 있습니다. 배송 주소에 따라서도 배송비를 변경할 수 있습니다.


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
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

사용자가 결제 요청을 승인하면 [`show()`](https://www.w3.org/TR/payment-request/#show) 메서드의 프라미스가 이를 확인합니다. 앱은 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 객체의 `.shippingOption` 속성을 사용하여 다른 속성과 함께 배송 주소를 결제 프로세서에 알릴 수 있습니다.

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



## 선택적 연락처 정보 추가 {: #contact-information}
`options` 객체를 구성하여 사용자의 이메일 주소, 전화번호 또는 이름을 수집할 수도 있습니다.


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>결제 요청 인터페이스</figcaption>
  </figure>
</div>

사용자가 결제 요청을 승인하면 [`show()`](https://www.w3.org/TR/payment-request/#show) 메서드의 프라미스가 이를 확인합니다. 앱은 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 객체의 `.payerPhone`, `.payerEmail` 및/또는 `.payerName` 속성을 사용하여 다른 속성과 함께 사용자가 선택한 항목을 결제 프로세서에 알릴 수 있습니다.

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



## PaymentRequest를 점진적으로 개선되도록 만들기 {: #request-progressive}
Payment Request API는 최근에 만들어진 기능이므로 많은 브라우저가 이 API를 아직 지원하지 않고 있습니다. 기능을 사용할 수 있는지 여부를 확인하려면 `window.PaymentRequest`를 쿼리하세요.


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

참고: 정식 체크아웃 프로세스에는 일반적인 링크를 연결하는 것이 최선입니다. 그런 다음, PaymentRequest가 지원되는 경우 자바스크립트를 사용하여 탐색하지 못하게 하세요.

## 이 모든 것을 함께 구현 {: #putting-them-together}


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
