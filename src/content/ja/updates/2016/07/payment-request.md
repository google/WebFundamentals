project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Payment Request は決済フローを簡単・高速で一貫性のあるものにする、オープン Web 向けの新しい API です。

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-07-30 #}

# Payment Request API で簡単・高速な決済を実現する {: .page-title }


{% include "web/_shared/contributors/agektmr.html" %}



ご存知の通り、最近のオンラインショッピングの大半はモバイルデバイス上で行われています。
しかし、モバイルデバイス上での購入の 66% はアプリではなく Web サイト上で発生していることを知っていたでしょうか。
ところが残念なことに、モバイル Web サイトでのコンバージョン率は、デスクトップのコンバージョン率のたった 33% しかなく、これはなんとかしなければなりません。

Android 向け Chrome 53 は [Payment Request API](https://www.w3.org/TR/payment-request/) に対応しました。 ( デスクトップ版は将来サポートされる予定です。 )
この新しい API を使うと、開発者は決済フォームをなくして、ユーザの決済に関わるエクスペリエンス全体を改善することができます。

## Payment Request API のご紹介
Payment Request API は、ショッピングサイト上で簡単・高速で一貫性のある決済フローを実現するオープン Web 向けの新しい API です。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="hmqZxP6iTpo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* 支払い方法・配送先住所・配送方法を、簡単・高速かつ一貫した方法でユーザが選択・追加できる、ネイティブユーザインタフェースを提供します。
* 開発者がユーザの決済設定を一貫性のあるフォーマットで取得できる、標準化された命令型の API を提供します。

<div class="clearfix"></div>


## Payment Request API の動作
Payment Request API がどのように動作するのか、コードを追いながら簡単に見てみましょう。
下記はユーザのクレジットカード情報を取得してサーバに送信するための最低限のサンプルコードです。


    function onBuyClicked() {
      if (!window.PaymentRequest) {
        // PaymentRequest API is not available. Forwarding to
        // legacy form based experience.
        location.href = '/checkout';
        return;
      }

      // Supported payment methods
      var supportedInstruments = [{
        supportedMethods: [
          'visa', 'mastercard', 'amex', 'discover',
          'diners', 'jcb', 'unionpay'
        ]
      }];

      // Checkout details
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

      // 1. Create a `PaymentRequest` instance
      // 1. `PaymentRequest` インスタンスを生成する
      var request = new PaymentRequest(supportedInstruments, details);

      // 2. Show the native UI with `.show()`
      // 2. `.show()` を呼び出して、ネイティブ UI を表示する
      request.show()
      // 3. Process the payment
      // 3. 決済処理をおこなう
      .then(result => {
        // POST the payment information to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          // Examine server response
          if (response.status === 200) {
            // Payment successful
            return result.complete('success');
          } else {
            // Payment failure
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });
    }

    document.querySelector('#start').addEventListener('click', onBuyClicked);


![](/web/updates/images/2016/07/payment-request/1.png)

### 1. PaymentRequest インスタンスを生成する
ユーザが「注文」をタップしたとき、 `PaymentRequest` をインスタンス化して決済処理を開始します。


    var request = new PaymentRequest(supportedInstruments, details);


### 2. .show() を呼び出して、ネイティブ UI を表示する
`show()` でネイティブの決済 UI を表示します。
この UI では、ユーザはすでにブラウザに保存されている支払い方法から選択するか、新しい支払い方法追加することができます。


      request.show()
      .then(payment => {
        // pressed "Pay"
      });


 <img src="/web/updates/images/2016/07/payment-request/2.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/3.png" style="max-width:340px">

### 3. 決済処理をおこなう
ユーザが「支払う」ボタンをタップすると、 promise が resolve され、 resolve 関数に決済情報が渡されます。
この情報を自社のサーバか Stripe のようなサードパーティに送信して、決済処理をおこなうことができます。


      request.show()
      .then(result => {
        // POST the payment information to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          // Examine server response
          if (response.status === 200) {
            // Payment successful
            return result.complete('success');
          } else {
            // Payment failure
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });


 <img src="/web/updates/images/2016/07/payment-request/4.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/5.png" style="max-width:340px">

### 4. 決済結果を表示する
決済の確認が成功したら、 `.complete('success')` を呼び出して購入を完了します。もし失敗した場合は、 `.complete('fail')` を呼び出します。
決済の成功 / 失敗は、ネイティブ UI を使って表示されます。
`.complete()` が resolve したら、次のステップに進むことができます。

## 他に Payment Request API でできること

### 商品配送の指定
実物の商品を販売しているのであれば、おそらくユーザの配送先住所と、送料無料や速達配送などの配送方法の指定を取得する必要があるでしょう。
Payment Request API はもちろんこのようなケースをサポートしています。
詳細は [integration guide](/web/fundamentals/primers/payment-request/) を確認してください。

### 決済ソリューションの追加
Payment Request API がサポートする支払い手段はクレジットカードだけではありません。
世の中には他にも多くの決済サービスやソリューションがあり、 Payment Request API はこれらのできる限り多くをサポートできるように設計されています。
Google では、 [Chrome で Android Pay](/web/fundamentals/discovery-and-monetization/payment-request/android-pay) を利用できるようにしようとしています。
他のサードパーティソリューションも近い将来サポートされる予定ですので、アップデートをお待ち下さい。

## FAQ

### この API を利用する上での制限・制約は何かありますか ?

Android 向け Chrome のバージョン 53 以上を使う必要があります。
また、セキュアなオリジン ( HTTPS, localhost または file:/// ) である必要があります。

### 利用できる支払い方法を調べることはできますか ?
現在はサポートされていませんが、プライバシーに配慮しながら API でこのような情報を公開する方法を検討しています。
Payment Request API はできるだけ幅広い種類の決済手段をサポートできるように設計されています。
各決済手段は [payment method identifier](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method-identifier) という識別子が付与されています。
Payment Method Identifier は分散型拡張性をサポートしています。つまり、決済手段を見つけたり登録するための機械判読可能な中央型レジストリを必要としません ( [payment methods](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method) 参照 )。

### クーポンコードをサポートする予定はありますか ?
クーポンコードをサポートする最良の方法を検討しています。今のところは、 Payment Request API を呼び出したあとに、ユーザにクーポンコードの入力を求めるコードを独自で追加すれば実現できます。

### この API は、 iframe でも使えますか ?
現在のところ iframe での Payment Request API の使用は許可されていませんが、将来できるようになる予定です。

### Payment Request API に対応していないブラウザ向けの polyfill はありますか ?
現在のところ、ありません。

### 現在の API は最終版と考えてよいでしょうか ?
変更される可能性があります。
もし API が変更されて後方互換性がなくなっても大丈夫にするための [shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) を提供しています。
この shim を Web サイトに埋め込んでおけば、直近 2 つの Chrome のメジャーバージョンで発生した API の差異を shim がカバーしてくれます。

## リソース
Payment Request API についてさらに知るために、いくつかのドキュメントとリソースが利用できます。

* [Official specification](https://www.w3.org/TR/payment-request/)
* [Payment Request API integration guide](/web/fundamentals/primers/payment-request/)
* [Demo](https://emerald-eon.appspot.com/)
* [Simple demos and sample code](https://googlechrome.github.io/samples/paymentrequest/)


Translated By:
{% include "web/_shared/contributors/kazukikanamori.html" %}
