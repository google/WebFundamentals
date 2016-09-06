---
layout: updates/post
title: "Bringing easy and fast checkout with Payment Request API"
title: "Payment Request API で簡単・高速な決済を実現する"
description: "Payment Request is a new API for the open web that makes checkout flows easier, faster and consistent."
description: "Payment Request は決済フローを簡単・高速で一貫性のあるものにする、オープン Web 向けの新しい API です。"
published_on: 2016-07-31
updated_on: 2016-08-17
authors:
  - agektmr
tags:
  - javascript
  - payment
featured_image: /web/updates/images/2016/07/payment-request/0.png
translators:
  - kazukikanamori
---

It's no surprise that the majority of online shopping is happening on mobile devices these days. But did you know that 66% of mobile purchases are made through websites rather than apps?  Unfortunately though, conversion rate on mobile websites is only 33% of that on desktop. We need to fix this.

ご存知の通り、最近のオンラインショッピングの大半はモバイルデバイス上で行われています。
しかし、モバイルデバイス上での購入の 66% はアプリではなく Web サイト上で発生していることを知っていたでしょうか。
ところが残念なことに、モバイル Web サイトでのコンバージョン率は、デスクトップのコンバージョン率のたった 33% しかなく、これはなんとかしなければなりません。

Chrome 53 for Android (desktop to be supported in the future) introduces a new API called [Payment Request](https://www.w3.org/TR/payment-request/) - a new approach for developers to eliminate checkout forms and improve user's payment experience from the ground up.

Android 向け Chrome 53 は [Payment Request API](https://www.w3.org/TR/payment-request/) に対応しました。 ( デスクトップ版は将来サポートされる予定です。 )
この新しい API を使うと、開発者は決済フォームをなくして、ユーザの決済に関わるエクスペリエンス全体を改善することができます。

## Introducing Payment Request API

## Payment Request API のご紹介

Payment Request is a new API for the open web that makes checkout flows easier, faster and consistent on shopping sites.

Payment Request API は、ショッピングサイト上で簡単・高速で一貫性のある決済フローを実現するオープン Web 向けの新しい API です。

{% ytvideo hmqZxP6iTpo %}

* Provides a native user interface for users to select or add a payment method, a shipping address and a shipping option in an easy, fast and consistent way.

* 支払い方法・配送先住所・配送方法を、簡単・高速かつ一貫した方法でユーザが選択・追加できる、ネイティブユーザインタフェースを提供します。

* Provides standardized imperative APIs for developers to obtain user's payment preferences in a consistent format.

* 開発者がユーザの決済設定を一貫性のあるフォーマットで取得できる、標準化された命令型の API を提供します。


## How Payment Request API works

## Payment Request API の動作

Let's peek at how Payment Request API works in some code. Here's a minimal example that collects a user's credit card information and submits it to a server.

Payment Request API がどのように動作するのか、コードを追いながら簡単に見てみましょう。
下記はユーザのクレジットカード情報を取得してサーバに送信するための最低限のサンプルコードです。

{% highlight js %}
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
    var data = {};
    data.methodName = result.methodName;
    data.details    = result.details;

    // POST the payment information to the server
    return fetch('/pay', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
{% endhighlight %}

![](/web/updates/images/2016/07/payment-request/1.png)

### 1. Create a PaymentRequest instance

### 1. PaymentRequest インスタンスを生成する

When a  user taps on "Checkout", start a payment procedure by instantiating `PaymentRequest`.

ユーザが「注文」をタップしたとき、 `PaymentRequest` をインスタンス化して決済処理を開始します。

{% highlight js %}
var request = new PaymentRequest(supportedInstruments, details);
{% endhighlight %}

### 2. Show the native UI with .show()

### 2. .show() を呼び出して、ネイティブ UI を表示する

Show the native payment UI with `show()`. Within this UI, a user can determine a payment method already stored in the browser or add a new one.

`show()` でネイティブの決済 UI を表示します。
この UI では、ユーザはすでにブラウザに保存されている支払い方法から選択するか、新しい支払い方法追加することができます。

{% highlight js %}
  request.show()
  .then(payment => {
    // pressed "Pay"
  });
{% endhighlight %}

 <img src="/web/updates/images/2016/07/payment-request/2.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/3.png" style="max-width:340px">

### 3. Process the payment

### 3. 決済処理をおこなう

Upon user tapping on "PAY" button, a promise will be resolved and payment information will be passed to the resolving function. You can send the information either to your own server, or send it through a third party like Stripe for processing.

ユーザが「支払う」ボタンをタップすると、 promise が resolve され、 resolve 関数に決済情報が渡されます。
この情報を自社のサーバか Stripe のようなサードパーティに送信して、決済処理をおこなうことができます。

{% highlight js %}
  request.show()
  .then(result => {
    var data = {};
    data.methodName = result.methodName;
    data.details    = result.details;

    // POST the payment information to the server
    return fetch('/pay', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
{% endhighlight %}

 <img src="/web/updates/images/2016/07/payment-request/4.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/5.png" style="max-width:340px">

### 4. Display payment result

### 4. 決済結果を表示する

If the payment verification was successful, call `.complete('success')` to complete the purchase, otherwise `.complete('fail')`. Success / failure status will be displayed using a native UI. Upon resolving the `.complete()`, you can proceed to the next step.

決済の確認が成功したら、 `.complete('success')` を呼び出して購入を完了します。もし失敗した場合は、 `.complete('fail')` を呼び出します。
決済の成功 / 失敗は、ネイティブ UI を使って表示されます。
`.complete()` が resolve したら、次のステップに進むことができます。

## Payment Request API can do more

## 他に Payment Request API でできること

### Shipping items

### 商品配送の指定

If you are selling physical goods, you'll probably need to collect the user's shipping address and a shipping preference such as "Free shipping" or "Express shipping". Payment Request API certainly supports those use cases. See [the integration guide](https://developers.google.com/web/fundamentals/primers/payment-request/) to learn more.

実物の商品を販売しているのであれば、おそらくユーザの配送先住所と、送料無料や速達配送などの配送方法の指定を取得する必要があるでしょう。
Payment Request API はもちろんこのようなケースをサポートしています。
詳細は [integration guide](https://developers.google.com/web/fundamentals/primers/payment-request/) を確認してください。

### Adding more payment solutions

### 決済ソリューションの追加

Credit card is not the only supported payment solution for Payment Request. There are a number of other payment services and solutions in the wild and the Payment Request API is designed to support as many of those as possible. Google is working to bring Android Pay to Chrome. Other third party solutions will be supported in the near future as well. Stay tuned for updates.

Payment Request API がサポートする支払い手段はクレジットカードだけではありません。
世の中には他にも多くの決済サービスやソリューションがあり、 Payment Request API はこれらのできる限り多くをサポートできるように設計されています。
Google では、 Chrome で Android Pay を利用できるようにしようとしています。
他のサードパーティソリューションも近い将来サポートされる予定ですので、アップデートをお待ち下さい。

## FAQ

### Any restrictions to use the API?

### この API を利用する上での制限・制約は何かありますか ?

Use Chrome for Android with version 53 or later. Requires secure origin - HTTPS, localhost or file:///.

Android 向け Chrome のバージョン 53 以上を使う必要があります。
また、セキュアなオリジン ( HTTP, localhost または file:/// ) である必要があります。

### Is it possible to query the available payment methods?

### 利用できる支払い方法を調べることはできますか ?

Currently not supported, but we're investigating ways of exposing this API in a privacy-sensitive way.  
Payment Request API is designed to support the broadest possible array of payment methods. Each payment method is identified by a [payment method identifier](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method-identifier).  
Payment Method Identifiers will support distributed extensibility, meaning that there does not need to be a central machine-readable registry to discover or register [payment methods](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method).

現在はサポートされていませんが、プライバシーに配慮しながら API でこのような情報を公開する方法を検討しています。
Payment Request API はできるだけ幅広い種類の決済手段をサポートできるように設計されています。
各決済手段は [payment method identifier](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method-identifier) という識別子が付与されています。
Payment Method Identifier は分散型拡張性をサポートしています。つまり、決済手段を見つけたり登録するための機械判読可能な中央型レジストリを必要としません ( [payment methods](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method) 参照 )。

### Do you plan on offering a coupon code?

### クーポンコードをサポートする予定はありますか ?

We  are investigating how to best do this. For now, you can manually ask for coupon code before or after calling the API.

クーポンコードをサポートする最良の方法を検討しています。今のところは、 Payment Request API を呼び出したあとに、ユーザにクーポンコードの入力を求めるコードを独自で追加すれば実現できます。

### Does this work with iframes?

### この API は、 iframe でも使えますか ?

Currently not allowed. But planned to be allowed in the future.

現在のところ iframe での Payment Request API の使用は許可されていませんが、将来できるようになる予定です。

### Are there any polyfills available to support incompatible browsers for this API?

### Payment Request API に対応していないブラウザ向けの polyfill はありますか ?

Not currently.

現在のところ、ありません。

### Can I assume current API is final?

### 現在の API は最終版と考えてよいでしょうか ?

It could change. We provide [a shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) that protects you from API changes that may be backwards incompatible. By embedding the shim in your website, it will paper over any API differences for two major Chrome versions.

変更される可能性があります。
もし API が変更されて後方互換性がなくなっても大丈夫にするための [shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) を提供しています。
この shim を Web サイトに埋め込んでおけば、直近 2 つの Chrome のメジャーバージョンで発生した API の差異を shim がカバーしてくれます。

## Resources

## リソース

To learn more about Payment Request API, a few documents and resources are available:

Payment Request API についてさらに知るために、いくつかのドキュメントとリソースが利用できます。

* [Official specification](https://www.w3.org/TR/payment-request/)
* [Payment Request API integration guide](https://developers.google.com/web/fundamentals/primers/payment-request/)
* [Demo](https://emerald-eon.appspot.com/)
* [Simple demos and sample code](https://googlechrome.github.io/samples/paymentrequest/)
