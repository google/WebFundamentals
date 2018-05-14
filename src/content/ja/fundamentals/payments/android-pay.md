project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay を使用すると、オンラインで商品やサービスを簡単かつ安全に購入でき、ユーザーは支払い情報を覚えたり手動で入力したりする必要がなくなります。Android Pay をアプリに組み込み、何百万人もの Android ユーザーにサービスを提供して、コンバージョンを高めるとともに、真のワンタッチ精算操作を実現してください。

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

#  Android Pay を支払いリクエストに統合する {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay を使用すると、オンラインで商品やサービスを簡単かつ安全に購入でき、ユーザーは支払い情報を覚えたり手動で入力したりする必要がなくなります。Android Pay をアプリに組み込み、何百万人もの Android ユーザーにサービスを提供して、コンバージョンを高めるとともに、真のワンタッチ精算操作を実現してください。




**シンプル: **Android Pay は簡単に導入でき、支払いプロセスを変更する必要はありません。
また、デベロッパーは先進的な[支払いゲートウェイ](/android-pay/)と処理プラットフォームを活用することにより、Android Pay を簡単に有効化することができます。




**安全: **Android Pay では、ユーザーの支払い口座に紐付けられる仮想の口座番号を安全に保存できます。
この機能により、ユーザーは実際のクレジット カードやデビットカードの番号を送信することなく、オンラインで購入ができます。
また、Android Pay では、すべての支払いトランザクションが暗号化されるため、ユーザーデータの安全性が確保されます。


**サポート: **Android Pay
を導入する国は増えており、大多数の主要なクレジット カード ネットワークおよび銀行が本サービスをサポートしています。対応端末は、KitKat 以上のバージョンを搭載するすべての Android スマートフォンです。
Android Pay
が利用できる国とカードの種類に関する総合的な情報については、[ヘルプセンターのページ](https://support.google.com/androidpay/answer/6314169)をご覧ください。


##  動作

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
    <figcaption>1. [Checkout] を押します。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. 支払いリクエスト UI がポップアップ表示されます。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. 支払い方法などを選択して、[Pay] を押します。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. Android Pay アプリがポップアップ表示されたら、クリックして続行します（ユーザーは、スマートフォンのロック解除または指紋による認証を求められる場合があります）。</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. 精算が完了しました。</figcaption>
  </figure>
</div>

##  準備

###  必要な知識

* Chrome で実行される Android Pay は PaymentRequest API を使用するため、最初に[統合ガイド](.)の内容を十分に確認しておいてください。
* Android デベロッパーではなくても、[Android Pay のアプリ内 API](/android-pay/android/tutorial) に関する知識を深めておくことをお勧めします。Android Pay で返されるレスポンスは Android と Chrome で共通であるため、レスポンス処理の知識があると役に立ちます。
* また、Android Pay の詳細な[コンテンツ ポリシー](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1)を確認して、自身の商品やサービスがサポート対象であることを確かめてください。

###  環境設定

* 端末に Android Pay アプリがインストールされていることを確認します。Android Pay をインストールするには、お住まいの国がサポート対象である必要があります。[android.com/pay](https://www.android.com/pay/){: .external } にアクセスして、お住まいの国がサポート対象であることを確認してください。
* 端末で、テスト用の[クレジット カード情報](https://support.google.com/androidpay/answer/6289372)を Android Pay に追加する必要があります。
* Android Pay にサインアップする
    * [このフォーム](https://androidpay.developers.google.com/signup)で、会社名、サイトのオリジン、会社のメールアドレスなどを入力します。
* [支払いゲートウェイや決済サービスが Android Pay トークンをサポートしている](/android-pay/#processors)ことを確認します。
* [ネットワーク トークンを使用](#integration-using-network-token)している場合は、Android Pay からのレスポンスの暗号化に使用するキーペアを取得します。
    * 決済サービスを使用してパブリック キーを取得することをお勧めします。これにより、決済サービスで Android Pay ペイロードの復号化を処理できるようになるため、プロセスが簡素化されます。詳細については、決済サービスのドキュメントをご覧ください。
    * 自身で暗号化の処理をする場合は、[支払いトークンの暗号化](/android-pay/integration/payment-token-cryptography)を参照して、Base64 エンコードした Elliptic Curve Integrated Encryption キーを生成してください。

##  Android Pay を支払いリクエストに統合する
Android Pay for Payment Request API を使用すると、ゲートウェイとネットワークの 2 種類の支払いトークンのいずれかをリクエストできます。Braintree、Stripe、または Vantiv を支払いゲートウェイとして使用している場合は、Android Pay にゲートウェイ トークンをリクエストできます。その他の場合は、暗号化されたネットワーク トークン バンドルをリクエストします。ネットワーク トークンを自身で処理するか、決済サービスを使用してトークン バンドルの復号化を処理できます。

###  ゲートウェイ トークンを使用する方法
Android Pay では支払いを処理しません。販売者はゲートウェイ API を呼び出して、Android Pay から返されたゲートウェイ トークンの課金および処理を行う必要があります。

ゲートウェイ トークンは Android Pay API から返すようにします。次の図は、Braintree、Stripe、または Vantiv を使用している場合の推奨フローを示しています。

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

###  ネットワーク トークンを使用する方法
Android Pay API から、暗号化されたネットワーク トークン バンドルを返します。その後、トークンを自身で復号化するか、決済サービス API を使用してトークンの復号化と課金を処理します。

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

##  ゲートウェイ トークンを使用して統合する
以下の例は、支払いゲートウェイからトークンを直接リクエストする方法の概要を示しています。この例では、Stripe トークンをリクエストしています。Braintree や Vantiv など、その他の支払いゲートウェイを使用する場合は、決済サービス事業者に支払いゲートウェイ固有のパラメータをお問い合わせください。

ゲートウェイ トークンをリクエストするときは、Android Pay 側で決済サービスへの呼び出しを実行して、課金可能なゲートウェイ トークンを返します。

####  パラメータ


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


ゲートウェイ トークンの方式で Android Pay を使用するには、上記の例のように、以下のパラメータが含まれる JSON オブジェクトを追加します。

* `supportedMethods: [ 'https://android.com/pay' ]`: Android Pay を使用した支払い方法であることを示します。
* `data`: まだ標準化されていない Android Pay 固有の値です。
    * `merchantId`: [Android Pay にサインアップ](https://androidpay.developers.google.com/signup)したときに取得した Android Pay 販売者 ID です。
    * `environment:'TEST'`: Android Pay をテストする場合に追加します。生成されたゲートウェイ トークンは無効になります。
    * `allowedCardNetworks`: 有効な Android Pay レスポンスに必要なクレジット カード ネットワークの配列を指定します。"AMEX"、"DISCOVER"、"MASTERCARD"、および "VISA" を指定できます。
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType`: 'GATEWAY_TOKEN': ゲートウェイ トークンの方式を採用していることを示します。
        * `parameters`: 支払いゲートウェイ固有のパラメータです。詳細については、特定の支払いゲートウェイのドキュメントをご覧ください。

####  Android Pay レスポンスを処理する
Android Pay オブジェクトを追加した後、Chrome で課金可能なゲートウェイ トークンをリクエストできます。

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


PaymentRequest のレスポンスには、[PaymentRequest 統合ガイド](.)の例のように、発送情報と連絡先情報が含まれますが、ここでは以下の情報を含む Android Pay からの追加レスポンスも含まれます。

* 請求先住所の情報
* 連絡先情報
* 決済手段に関する情報
* 支払いトークンの詳細

送信されたゲートウェイ トークンの処理方法は、支払いゲートウェイによって異なります。詳細については、特定のゲートウェイのドキュメントをご覧ください。

####  すべてを統合する


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


###  ネットワーク トークンを使用して統合する
ネットワーク トークンをリクエストするには、PaymentRequest に次の 2 つの情報を含める必要があります。

1. 登録時に取得した `merchantId`
1. `paymentMethodTokenizationParameters` の一部として渡す `publicKey` 

####  パラメータ


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


ネットワーク トークンの方式で Android Pay を使用するには、上記の例のように、以下のパラメータが含まれる JSON オブジェクトを追加します。

* `supportedMethods: [ 'https://android.com/pay' ]`: Android Pay を使用した支払い方法であることを示します。
* `data`: 
    * `merchantId`: [Android Pay にサインアップ](https://androidpay.developers.google.com/signup)したときに取得した Android Pay 販売者 ID です。
    * `environment:'TEST'`: Android Pay をテストする場合に追加します。生成されたトークンは無効になります。本番環境では、この行を削除します。
    * `allowedCardNetworks`: 有効な Android Pay レスポンスに必要なクレジット カード ネットワークの配列を指定します。
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType: 'NETWORK_TOKEN'`: ネットワーク トークンの方式を採用していることを示します。
        * `parameters`: ネットワーク トークンを受け取るために必要なパブリック キーです（詳細については、[暗号化キーを生成する方法](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)をご覧ください）。

####  Android Pay レスポンスを処理する
Android Pay オブジェクトを追加した後、Chrome で課金可能なネットワーク トークンをリクエストできます。


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


暗号化された PaymentRequest のレスポンスには、[PaymentRequest 統合ガイド](.)の例のように、発送情報と連絡先情報が含まれますが、ここでは以下の情報を含む Android Pay からの追加レスポンスも含まれます。

* トークン化されたクレジット カードの情報
* 請求先住所の情報
* 決済手段に関する情報
* 支払いトークンの詳細

ネットワーク トークンの統合を簡単にするために、暗号化されたペイロードを支払いゲートウェイに直接渡して、支払いゲートウェイで復号化の処理ができるようにすることをお勧めします。ペイロードを自身で復号化する場合は、処理が複雑になり、プライベート キーを管理する必要があります。この機能の利用可否については、支払いゲートウェイのプロバイダにお問い合わせください。

送信されたネットワーク トークンの処理方法は、支払いゲートウェイによって異なります。詳細については、特定のゲートウェイのドキュメントをご覧ください。

ネットワーク トークンの方式は、PaymentRequest オブジェクトを作成することを除いては、ゲートウェイ トークンのアプローチと同じなので、コードサンプルは省略しています。


{# wf_devsite_translation #}
