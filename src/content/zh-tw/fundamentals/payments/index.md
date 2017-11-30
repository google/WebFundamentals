project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Payment Request API 用於在網上實現快速簡便的支付。

{# wf_published_on:2016-07-25 #}
{# wf_updated_on:2016-12-06 #}

# Payment Request API：集成指南 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Dogfood：`PaymentRequest` 仍處於開發階段。雖然我們認爲其穩定性足以滿足實現的要求，但可能仍需作出改動。
我們會持續更新本頁，以時刻反映 API 的最新狀況（[M56 變更](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)）。在此期間，爲讓您免於受到可能不具有向後兼容性的 API 變更的影響，我們提供了可嵌入網站的 [shim](https://storage.googleapis.com/prshim/v1/payment-shim.js)。這個 shim 可平息兩個主流 Chrome 版本的任何 API 差異。



在線購物非常方便，但通常存在令人沮喪的體驗，在移動設備上購物尤其如此。雖然移動流量在不斷增長，但移動購物轉化率僅佔所有已完成購物活動的三分之一。換言之，移動設備用戶的購物放棄率是桌面設備用戶的兩倍。爲何？

![](images/1_why_users_abandon.png)

*用戶放棄移動設備購物單的原因*

在線購物單需要大量用戶操作、難以使用，加載和刷新緩慢，並且需要多個步驟才能完成。這是因爲在線支付的兩大要素（即安全和便利）之間通常互爲矛盾，左支右絀。

導致用戶放棄交易的大部分問題都均與購物單有着直接關係。每個應用或網站均有自己的數據輸入和驗證流程，用戶通常發現，在每個應用的購物點他們都需要輸入相同的信息。此外，應用開發者力求創建支持多種獨特支付方式的購物流程；即使是支付方式要求的細小差異也可能導致表單填寫和提交過程變得相當複雜。

任何能或多或少改進這些問題的系統都值得提倡。我們已經嘗試藉助[自動填充](/web/updates/2015/06/checkout-faster-with-autofill)功能來幫助解決問題，但我們現在有了更全面的解決方案。

## Payment Request API 簡介 {: #introducing }

Payment Request API 是一個旨在*消滅結賬表單*的系統。它顯著改進了購物流程期間的用戶工作流，爲用戶提供更一致的體驗，並讓電商公司能夠輕鬆地利用各種完全不同的支付方式。Payment Request API 不是一種新的支付方式，也不與支付處理機構直接整合；它是一種旨在實現以下目標的處理層：

* 讓瀏覽器充當商家、用戶和支付處理機構的中介
* 儘可能標準化支付通信流程
* 爲不同的安全支付方式提供無縫支持
* 適用於任何移動或非移動瀏覽器、設備或平臺

Payment Request API 是一種開放式的跨瀏覽器標準，可以取代傳統的結賬流程，讓商家能夠在單個 API 調用中請求和接受任何付款。Payment Request API 允許網頁在用戶提供輸入時與 User Agent 交換信息，然後覈准或拒絕支付請求。

最重要的是，瀏覽器起到中介作用，爲實現快速結賬所需的全部信息均能儲存在瀏覽器中，因此用戶只需點擊一次便可確認支付。

### 支付交易流程 {: #transaction-process }
利用 Payment Request API，可同時爲用戶和商家打造儘可能無縫的交易流程。

![](images/4_the_payment_transaction_process.png)

*支付交易流程*

流程一開始，商家網站首先創建新的 `PaymentRequest`，並將購買所需的全部信息傳遞給瀏覽器：應支付的金額、期望使用的貨幣，以及網站接受的支付方式。瀏覽器確定網站所接受的支付方式和用戶在目標設備上安裝的支付方式之間的兼容性。

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>


然後，瀏覽器向用戶顯示支付 UI，用戶選擇支付方式並授權執行交易。支付方式可以簡單直接，比如使用瀏覽器已存儲的信用卡，也可能冷僻難解，比如使用專門針對網站支付開發的第三方應用（此功能即將實現）。用戶授權執行交易後，所有必要的支付詳細信息都將直接發回網站。例如，對於信用卡支付，網站將返回卡號、持卡人姓名、有效期和銀行卡驗證碼 (CVC)。

Payment Request 也可以擴展爲返回額外信息，例如收貨地址和選項、付款人電子郵件和電話等。這樣，無需要向用戶顯示結賬表單，您即可獲得完成支付所需的全部信息。


新流程有三重好處：從用戶角度看，請求、授權、支付和結果等以往所有冗長的交互現在可一步完成；從網站角度看，只需調用一次 JavaScript API；從支付方式角度看，流程沒有發生任何變化。

<div style="clear:both;"></div>

## 使用 Payment Request API{: #using }

### 加載 Payment Request API shim

爲減輕追趕這一現行標準 API 的壓力，我們強烈建議在代碼的 `<head>` 部分添加此 shim。
此 shim 將隨 API 的變化而更新，並會盡力讓代碼能夠至少在 Chrome 的 2 個主要版本上正常運行。




    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### 創建 PaymentRequest {: #create-paymentrequest }

創建 PaymentRequest 的第一步是通過調用 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-function Object() { [native code] }) 構造函數創建一個 [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) 對象。此步驟通常（並非總是）與用戶發起的、表示其想要執行購買的操作相關。對象使用包含所需數據的參數構造。

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*PaymentRequest 構造函數*

#### methodData 參數 {: #methoddata-parameter }

`methodData` 參數包含支持的支付方式列表，以及有關支付方式的額外信息（如相關）。此序列含有 `PaymentMethodData` 字典，其中包括與應用預期接受的支付方式相關的標準標識符，以及任何支付方式的特定數據。如需瞭解更多詳情，請參見 [Payment Request API 架構](https://w3c.github.io/browser-payment-api/specs/architecture.html)。

目前，`PaymentRequest` 在 Chrome 中僅支持以下標準信用卡：“`amex`”、“`diners`”、“`discover`”、“`jcb`”、“`maestro`”、“`mastercard`”、“`unionpay`”和“`visa`”。


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*支付方式和數據*

#### details 參數 {: #details-parameter }

`details` 參數包含有關交易的信息。有兩個主要元素：total，反映要支付的總額和要使用的貨幣；可選的 `displayItems` 集，顯示最終金額包含哪些分項。此參數並非用作明細項目列表，而是訂單主要組成部分的摘要：總價、折扣、稅、運費等。

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

需要注意的是，Payment Request API 不執行計算。也就是說，它不會也不能確保顯示的分項總和等於應付總金額。這些計算由開發者負責。因此，您應始終確保分項之和與總金額一致。此外，`PaymentRequest` 不支持退款，因此金額應始終爲正（但單獨的分項可以爲負，比如折扣）。

瀏覽器將根據您的定義渲染標籤，並根據用戶的語言區域自動應用正確的貨幣格式。請注意，應使用與內容相同的語言渲染標籤。

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


*交易詳情*

`pending` 常用於顯示運費或稅額等取決於收貨地址或收貨選項的項目。Chrome 會在 UI 中指示支付請求的待定字段。

`details` 中所使用的重複值或計算值可指定爲字符串字面量或各字符串變量。


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*PaymentRequest 變量*

### 顯示 PaymentRequest {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

通過調用 [`show()`](https://www.w3.org/TR/payment-request/#show) 方法激活 `PaymentRequest` 界面。此方法會調用一個原生 UI，讓用戶檢查購物詳情、添加或更改信息並最終進行支付。用戶接受或拒絕支付請求時，將返回可解析 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)（帶有其 `then()` 方法和回調函數）。

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*PaymentRequest show 方法*

### 取消 PaymentRequest {: #abort-paymentrequest }
您可以通過調用 [`abort()`](https://www.w3.org/TR/payment-request/#abort) 方法主動取消 `PaymentRequest`。這在購物會話超時或交易期間購物車中的商品售罄時特別有用。

如果應用需要在調用 `show()` 方法之後、promise 尚未解析之前（例如，如果商品已下架，或者用戶沒有在指定時間內確認訂單）取消支付請求，則可使用此方法。

如果您取消請求，將需要創建一個新的 `PaymentRequest` 實例，才能再次調用 `show()`。


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*PaymentRequest abort 方法*

### 處理 PaymentResponse {: # process-paymentresponse}
用戶批准庫款請求後，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 會立即解析，生成 `PaymentResponse` 對象。

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> 具有下列字段：</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>表示所選支付方式的字符串（例如 visa）</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td>含有  <code>methodName</code> 信息的字典</td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>用戶的收貨地址（如有請求）</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>所選發貨選項的 ID（如有請求）</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>付款人的電子郵件地址（如有請求）</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>付款人的電話號碼（如有請求）</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>付款人的姓名（如有請求）</td>
</tr>
</table>


對於信用卡付款，響應爲標準格式。對於非信用卡付款（例如 Android Pay），響應將由支付服務商提供文檔說明。信用卡響應包含下列字典：

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

接收支付信息後，應用需將支付信息提交給支付處理機構進行處理。發生請求時，UI 會顯示一個轉環。收到響應後，應用需調用 `complete()` 來關閉 UI。


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
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

[`complete()`](https://www.w3.org/TR/payment-request/#complete) 方法告知 User Agent 用戶交互已結束，並允許應用將結果通知用戶以及處理剩餘的 UI 元素。

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*PaymentRequest complete 方法*

## 收集收貨地址 {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

如果您是出售實體物品的商家，則可能需要通過 Payment Request API 收集用戶的收貨地址。這通過將 `requestShipping: true` 添加到 `options` 參數來實現。設置此參數後，“Shipping”將添加到 UI，用戶可從已保存的地址列表中選擇收貨地址，也可以添加新的收貨地址。

您也可以通過指定 `shippingType` 在 UI 中使用“Delivery”或“Pickup”替代“Shipping”。這僅作顯示用途。

<div style="clear:both;"></div>

注： <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> 在初始化時必須爲  <code>undefined</code> 或空數組才能接收  <code>shippingaddresschange</code> 事件。否則事件將無法觸發。


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*交易選項*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

用戶選擇或添加新的收貨地址時，系統會動態計算髮貨選項。您可以添加 `shippingaddresschange` 事件的偵聽器，它在用戶選擇收貨地址時觸發。然後，可以驗證是否能夠發貨到該地址，計算髮貨選項並以新的發貨選項和計價信息更新 [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions`。您可以通過將某一選項的 `selected` 設爲 `true` 來提供默認發貨選項。

如果要出於地區不受支持等原因而拒絕使用某一地址，可以向 `details.shippingOptions` 傳遞空數組。UI 會通知用戶，所選地址無法用於收貨。

<div style="clear:both;"></div>

注：解析  <code>shippingaddresschange</code> 事件並保留 <code>details.shippingOptions</code> 的空數組狀態也會導致地址遭拒（換言之，您無法發貨到該地址）。請確保發貨選項保持更新，並能匹配用戶提供的地址。


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
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

用戶確認支付請求後，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。應用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 對象的 `.shippingAddress` 屬性，將收貨地址和其他屬性告知支付處理機構。

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



## 添加發貨選項 {: #shipping-options}
如果您的服務允許用戶選擇“free”、“standard”或“express”等發貨選項，可以通過 Payment Request UI 來實現。要提供此類選項，請添加 [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) 屬性及其選項至 `details` 對象。將一個選項設爲 `selected: true` 後，UI 將其渲染爲預設選項（這意味着您的總金額應反映該發貨選項對應的價格）。


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


注：如前所述， <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> 在初始化時必須爲  <code>undefined</code> 或空數組才能接收  <code>shippingaddresschange</code> 事件。僅在發貨選項不會隨地址而變化的情況下（例如全球免費發貨），才能在初始化時設置此值。

更改發貨選項會導致價格變動。要添加運費並更改總價，可以爲 `shippingoptionchange` 事件添加事件偵聽器（用戶選擇發貨選項時會觸發該偵聽器），這樣您即可對選項數據執行程序化檢查。您也可以根據收貨地址更改運費。


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
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

用戶確認支付請求後，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。應用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 對象的 `.shippingOption` 屬性，將發貨選項和其他屬性告知支付處理機構。

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



## 添加可選聯繫信息 {: #contact-information}
您還可以通過配置 `options` 對象，收集用戶的電子郵件地址、電話號碼或姓名。


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>支付請求界面</figcaption>
  </figure>
</div>

用戶確認支付請求後，[`show()`](https://www.w3.org/TR/payment-request/#show) 方法的 promise 得到解析。應用可使用 [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) 對象的 `.payerPhone`、`.payerEmail` 和/或 `.payerName` 屬性，將用戶的選擇和其他屬性告知支付處理機構。

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



## 讓 PaymentRequest 獲得漸進式增強 {: #request-progressive}
由於 Payment Request API 是一項新興功能，許多瀏覽器尚未對其提供支持。要確定該功能是否可用，請查詢 `window.PaymentRequest`。


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

注：最好使用普通的常規結賬流程鏈接。然後使用 JavaScript 在支持 PaymentRequest 的情況下阻止導航。

## 彙總{: #putting-them-together}


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
