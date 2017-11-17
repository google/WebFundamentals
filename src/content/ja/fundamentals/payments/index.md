project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Payment Request API は、ウェブでの迅速で簡単な支払を実現するためのものです。

{# wf_published_on:2016-07-25 #}
{# wf_updated_on:2016-12-06 #}

#  Payment Request API: 統合ガイド {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

試験運用: `PaymentRequest` はまだ開発段階です。十分に安定しており、実装できる状態になっていると考えられますが、今後もまだ変更される可能性があります。
このページは、この API の最新ステータス（[M56 での変更点](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)）を反映するために引き続き更新されます。あわせて Google では、API の変更に伴う後方互換性の問題を軽減するために、サイトに埋め込み可能な [shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) を提供しています。shim は、Chrome の 2 つのメジャー バージョン間の API の差異を埋めるためのものです。



オンラインでの商品購入は便利ですが、特にモバイル端末ではストレスを感じることがよくあります。モバイル トラフィックは増え続けているのに、モバイル コンバージョンは全購入件数の 3 分の 1 程度にすぎません。言い換えると、ユーザーはパソコンで購入する場合より 2 倍も多く、モバイルでの購入を取りやめています。なぜでしょうか。

![](images/1_why_users_abandon.png)

*ユーザーがモバイルの購入フォームの利用を取りやめる理由*

オンライン購入フォームは、ユーザーによる処理が多く、使いづらく、読み込みと更新に時間がかかり、完了までに複数のステップが必要です。その理由として、オンライン決済の 2 つの主要素であるセキュリティと利便性が一般的に両立しないことが挙げられます。通常、一方を優先すれば、もう一方が手薄になります。

ユーザーが購入を取りやめることになる原因を突き止めると、ほとんどが購入フォームに行き着きます。アプリやサイトは、データ入力と検証にそれぞれ独自のプロセスを使用しています。ユーザーの多くが、すべてのアプリの購入ポイントで同じ情報を入力しなければならないと感じています。また、アプリケーション デベロッパーは、複数の異なる支払方法に対応する購入フローの作成に苦心しています。支払方法の要件がわずかに異なるだけでも、フォームの入力と送信プロセスが複雑になります。

このような問題を 1 つ以上改善または解決できるシステムは、すべて歓迎すべき変更です。既に[自動入力](/web/updates/2015/06/checkout-faster-with-autofill)を使用した問題解決に着手しましたが、ここではより包括的な解決策を取り上げます。

##  Payment Request API の導入 {: #introducing }

Payment Request API は、*支払フォームをなくす*ことを目的としたシステムです。購入プロセスにおけるユーザー ワークフローを大幅に改善することで、ユーザー エクスペリエンスをより一貫性のあるものにし、ウェブ販売者が複数の異なる支払方法を簡単に利用できるようにします。Payment Request API は新しい支払方法でもなければ、決済サービスと直接統合されるものでもありません。これは、次のことを目的としたプロセス レイヤーです。

* ブラウザが販売者、ユーザー、支払方法の仲介として機能できるようにする
* 支払通信フローをできる限り標準化する
* セキュリティで保護された各種支払方法をシームレスにサポートする
* モバイルかどうかを問わず、あらゆるブラウザ、端末、プラットフォームで動作する

Payment Request API は、従来の支払フローに代わる、オープンなクロスブラウザ標準で、販売者があらゆる支払を単一の API 呼び出しでリクエストおよび許可できるようにするものです。Payment Request API を使用すると、ウェブページは、支払リクエストを承認または拒否する前に、ユーザーの入力中にユーザー エージェントと情報を交換することができます。

何よりも優れているのは、ブラウザが仲介として機能するため、迅速な支払に必要なすべての情報をブラウザに保存できることです。そのためユーザーは確認して支払うだけでよく、すべてをシングル クリックで行うことができます。

### 支払取引プロセス {: #transaction-process }
Payment Request API を使用することで、ユーザーと販売者の両方にとって取引プロセスを最大限にシームレスにすることができます。

![](images/4_the_payment_transaction_process.png)

*支払取引プロセス*

プロセスは、販売者のサイトが新しい `PaymentRequest` を作成し、購入に必要なすべての情報（請求額、支払に使われる通貨、サイトで受け入れられる支払方法）をブラウザに渡したときに開始されます。ブラウザは、サイトで受け入れられる支払方法と、ユーザーがターゲット端末にインストールしている方法との互換性を判別します。

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>


次にブラウザはユーザーに支払 UI を表示します。ユーザーは、支払方法を選択して、取引を承認します。支払方法は、ブラウザに既に保存されているクレジット カードなどの単純なものもあれば、そのサイトへの支払を行うために特別に作成されたサードパーティ アプリケーションなどの複雑なものであることもあります（この機能は近日導入予定です）。ユーザーが取引を承認すると、必要なすべての支払詳細情報がサイトに直接送信されます。たとえば、クレジット カードでの支払の場合は、サイトはカード番号、カード所有者の名前、有効期限、CVC コードを取得します。

支払リクエストは、配送先住所とオプション、支払者のメールアドレス、支払者の電話番号といった追加情報を返すように拡張することもできます。これにより、ユーザーに支払フォームを一度も表示せず、支払を確定するために必要なすべての情報を取得できます。


新しいプロセスの利点は 3 つあります。ユーザーの観点からは、リクエスト、承認、支払、結果、というこれまで面倒だった操作がすべて 1 つのステップで実行できるようになったことです。ウェブサイトにおいては必要な JavaScript API 呼び出しが 1 つのみになり、支払方法においてはプロセスがまったく変わらないという利点があります。

<div style="clear:both;"></div>

## Payment Request API の使用 {: #using }

###  Payment Request API shim の読み込み

この開発中の標準 API に随時対応する手間を省くために、この shim をコードの `<head>` セクションに追加することを強くお勧めします。
この shim は API が変更されるとアップデートされ、Chrome
の 少なくとも 2 つのメジャー リリース版においてコードが機能するように最善の処理を行います。



    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


###  PaymentRequest の作成{: #create-paymentrequest }

最初に、[`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor) コンストラクタを呼び出して、[`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) オブジェクトを作成します。このステップは通常（ただし、必ずではありません）、ユーザーの購入意思を示すユーザー始動操作に関連付けられています。オブジェクトは必要なデータを含むパラメータを使用して作成されます。

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*PaymentRequest コンストラクタ*

####  methodData パラメータ{: #methoddata-parameter }

`methodData` パラメータには、サポートされる支払方法のリストと、該当する場合は支払方法に関する追加情報が含まれています。このシーケンスには、アプリが受け入れる支払方法に関連付けられている標準識別子と、任意の支払方法固有のデータを含む `PaymentMethodData` ディクショナリが含まれています。詳細については、[Payment Request API Architecture](https://w3c.github.io/browser-payment-api/specs/architecture.html) を参照してください。

現時点では、Chrome の `PaymentRequest` は標準クレジット カードの「`amex`」、「`diners`」、「`discover`」、「`jcb`」、「`maestro`」、「`mastercard`」、「`unionpay`」、および「`visa`」のみをサポートしています。


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*支払方法とデータ*

####  details パラメータ{: #details-parameter }

`details` パラメータには、取引に関する情報が含まれます。これには 2 つの主なコンポーネントがあります。total は、請求される合計額と通貨を表します。オプションの `displayItems` は、最終金額の計算方法を示します。このパラメータは、明細項目のリストではなく、小計、割引額、税、送料といった注文の主なコンポーネントの概要を示すことを目的としています。

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

注意が必要なのは、Payment Request API では算術計算は行われないことです。つまり、表示コンポーネントの合計が合計請求額に正しく一致することは保証されません。この計算は、デベロッパーが行う必要があります。そのため、明細項目の合計が合計額と同じになることを必ず確認する必要があります。また、`PaymentRequest` では返金はサポートされないため、金額は常に正数になる必要があります（ただし、割引など、個別の明細項目は負数にすることができます）。

ブラウザは、定義されたラベルを表示し、ユーザーのロケールに基づいて正しい通貨形式を自動的に表示します。ラベルは、コンテンツと同じ言語で表示される必要があることに注意してください。

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


*取引の詳細*

通常、`pending` は、配送先住所や発送オプションの選択に応じた配送料や課税額などの項目を表示するために使用されます。Chrome では、支払リクエストの UI に pending フィールドが表示されます。

`details` で繰り返し使用される値または計算値は、文字列リテラルまたは個別の文字列変数として指定できます。


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*PaymentRequest 変数*

### PaymentRequest の表示 {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

[`show()`](https://www.w3.org/TR/payment-request/#show) メソッドを呼び出して、`PaymentRequest` インターフェースをアクティブにします。このメソッドは、ユーザーが購入の詳細を確認し、情報を追加または変更して、最後に支払を行うことができるネイティブ UI を呼び出します。解決される [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) （`then()` メソッドとコールバック関数によって示されます）は、ユーザーが支払リクエストを承認または拒否したときに返されます。

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*PaymentRequest show メソッド*

###  支払リクエストの中止 {: #abort-paymentrequest }
[`abort()`](https://www.w3.org/TR/payment-request/#abort) メソッドを呼び出して、`PaymentRequest` を意図的に中止できます。このメソッドは、購入セッションがタイムアウトした場合や取引プロセス中にカート内のアイテムが売り切れになった場合に特に便利です。

このメソッドは、`show()` メソッドが呼び出された後、Promise が解決される前に、アプリで支払リクエストをキャンセルする必要がある場合に使用します。たとえば、商品の在庫がなくなった場合や、ユーザーが指定時間内に購入を確定しなかった場合などです。

リクエストを中止した場合は、`show()` を再度呼び出す前に、`PaymentRequest` のインスタンスを作成する必要があります。


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*PaymentRequest abort メソッド*

###  PaymentResponse の処理 {: # process-paymentresponse}
ユーザーが支払リクエストを承認し、[`show()`](https://www.w3.org/TR/payment-request/#show) メソッドの Promise が解決されると、`PaymentResponse` オブジェクトが生成されます。

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> には次のフィールドがあります。</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>選択された支払方法を示す文字列（例: visa）</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td> <code>methodName</code> の情報を含むディクショナリ</td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>ユーザーの配送先住所（必要な場合）</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>選択された発送オプションの ID（必要な場合）</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>支払者のメールアドレス（必要な場合）</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>支払者の電話番号（必要な場合）</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>支払者の名前（必要な名前）</td>
</tr>
</table>


クレジット カードによる支払の場合、レスポンスは標準化されています。クレジット カード以外の支払（例: Android Pay）の場合、レスポンスはプロバイダによって記述されます。クレジット カードのレスポンスには、次のディクショナリが含まれます。

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

支払情報を受け取ったら、アプリは支払情報を処理するために決済サービスに送信する必要があります。リクエストが実行されている間、UI にはスピナーが表示されます。レスポンスが返ってきたら、アプリは `complete()` を呼び出して UI を閉じる必要があります。


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
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

[`complete()`](https://www.w3.org/TR/payment-request/#complete) メソッドは、ユーザー操作が終了したことをユーザー エージェントに通知し、アプリがユーザーに結果を通知して、残っているすべての UI 要素を破棄できるようにします。

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*PaymentRequest complete メソッド*

##  配送先住所の収集{: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

物理的な商品を販売している販売者は、Payment Request API を使用してユーザーの配送先住所を収集しておくと便利です。これは `requestShipping: true` を `options` パラメータに追加することで実現できます。このパラメータが設定されると、UI に [Shipping] が追加され、ユーザーは保存されている住所のリストから選択するか、新しい配送先住所を追加できるようになります。

`shippingType` を指定して、[Shipping] の代わりに、UI に [Delivery] または [Pickup] を使用することもできます。これは、表示のためだけに使用されます。

<div style="clear:both;"></div>

注:  <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> は  <code>shippingaddresschange</code> イベントを受け取るために、初期化時に  <code>undefined</code> または空の配列である必要があります。そうでない場合、イベントが呼び出されません。


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*取引オプション*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

発送オプションは、ユーザーが配送先住所を選択するか、新しい配送先住所を追加するたびに動的に計算できます。ユーザーが配送先住所を選択すると呼び出される、`shippingaddresschange` イベントにイベント リスナーを追加できます。続けて、その住所に発送可能かどうかを検証し、発送オプションを計算して、新しい発送オプションと価格情報で [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions` を更新できます。オプションで `selected` を `true` に設定すると、既定の発送オプションを提供できます。

対象外の地域であるなどの理由で住所を拒否するには、`details.shippingOptions` に空の配列を渡します。UI により、選択された住所には発送できないことがユーザーに通知されます。

<div style="clear:both;"></div>

注:  <code>shippingaddresschange</code> イベントを解決して  <code>details.shippingOptions</code> を空の配列のままにしても、住所を拒否したことになります（つまり、その場所には発送できません）。常に、発送オプションが最新の状態であり、ユーザーが指定した住所と一致していることを確認してください。


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
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

ユーザーが支払リクエストを承認すると、[`show()`](https://www.w3.org/TR/payment-request/#show) メソッドの Promise が解決されます。アプリは [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) オブジェクトの `.shippingAddress` プロパティを使用して、決済サービスに配送先住所やその他のプロパティを通知できます。

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



## 発送オプションの追加 {: #shipping-options}
提供しているサービスでユーザーが発送オプション（「無料」、「標準」、「速達」など）を選択できるようにしている場合は、Payment Request UI を使用してこのオプションを提供することもできます。そのためには、[`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) プロパティとそのオプションを `details` オブジェクトに追加します。選択項目の 1 つを `selected: true` に設定すると、UI ではこれを事前選択された状態で表示します（つまり、合計金額は、その発送オプションの送料が反映されたものになる必要があります）。


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


注: 前述したとおり、 <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> は <code>shippingaddresschange</code> を受け取るために、初期化時に <code>undefined</code> または空の配列である必要があります。この値を初期化時に設定するのは、発送オプションが住所によって変わらない場合（たとえば、全品送料無料の場合）のみにしてください。

発送オプションを変更すると、価格が変更されることがあります。送料を追加して合計金額を変更するには、ユーザーが発送オプションを選択すると呼び出される、`shippingoptionchange` イベントのイベント リスナーを追加します。これにより、オプション データをプログラムで調べることができるようになります。配送先住所によって送料を変更することもできます。


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
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

ユーザーが支払リクエストを承認すると、[`show()`](https://www.w3.org/TR/payment-request/#show) メソッドの Promise が解決されます。アプリは [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) オブジェクトの `.shippingOption` プロパティを使用して、決済サービスに発送オプションやその他のプロパティを通知できます。

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



##  オプションの連絡先情報の追加 {: #contact-information}
`options` オブジェクトを設定して、ユーザーのメールアドレス、電話番号、または名前を収集することもできます。


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>支払リクエスト インターフェース</figcaption>
  </figure>
</div>

ユーザーが支払リクエストを承認すると、[`show()`](https://www.w3.org/TR/payment-request/#show) メソッドの Promise が解決されます。アプリは [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) オブジェクトの `.payerPhone`、`.payerEmail`、または `.payerName` プロパティ（あるいはこれらすべてのプロパティ）を使用して、決済サービスにユーザーの選択内容やその他のプロパティを通知できます。

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



##  PaymentRequest の段階的な機能改善 {: #request-progressive}
Payment Request API は新しい機能であるため、多くのブラウザではまだサポートされていません。この機能が使用可能かどうかを調べるには、`window.PaymentRequest` をクエリします。


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

注: 定期的な支払プロセスには通常のリンクを設定することをお勧めします。その後、PaymentRequest がサポートされている場合は、JavaScript を使用してそのナビゲーションを停止します。

## まとめ {: #putting-them-together}


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
