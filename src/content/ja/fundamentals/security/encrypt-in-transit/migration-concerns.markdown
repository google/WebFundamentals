---
title: "Migration Concerns"
updated_on: 2015-03-27
---

<p class="intro">
  
</p>

このセクションでは、運営者が HTTPS へ移行する際に懸念することについて説明します。

{% include shared/toc.liquid %}

## 検索ランキング

[Google では、HTTPS を検索品質の正の
インジケーターとして使用しています](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google は [how to transfer, move, or migrate your
site] のためのガイドを発行するとともに(https://support.google.com/webmasters/topic/6029673)、検索ランク
も維持します。 Bing は [guidelines for
webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a) も発行します。

## パフォーマンス

コンテンツとアプリケーション層がよく調整されている場合 ([Steve Souders'
books](https://stevesouders.com/) の素晴らしいアドバイスを参照)、残りの TLS 
のパフォーマンス問題は、一般的に、全体的な
アプリケーションのコストを基準に考えると小さなものです。 さらに、これらのコストを削減し、償却することができます。 (TLS の最適化に関する
素晴らしいアドバイスと一般事項については、次を参照してください。_[High Performance Browser
Networking](http://chimera.labs.oreilly.com/books/1230000000545)_[ by Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).)Ivan
Ristic の_[OpenSSL
Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)_ および _[Bulletproof
SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_も参照してください。

TLS は主に HTTP/2 を可能にした結果、性能を
向上できることがあります。 Chris Palmer は以下のプレセンテーションを行いました。[a talk on HTTPS and HTTP/2 performance at Chrome Dev
Summit 2014]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things).

## リファラー ヘッダー

ユーザーが HTTPS サイトから他の HTTP サイトへのリンクをたどる場合、
ユーザー エージェントは、リファラー ヘッダを送信しません。 これが問題となる場合は、
解決方法がいくつかあります。

* 他のサイトは HTTPS に移行する必要があります。 彼らにとってこれは便利なガイド
になるかもしれません! :)レフェリー サイトがこのガイドの「Enable HTTPS On Your Servers」セクションを完了できる場合は
、http:// から https://へサイト内でリンクを変更するか、
プロトコル相対リンクを使用できます。
* 新しい [Referrer Policy
  standard](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
  を使用して、リファラー ヘッダーでさまざまな問題を回避することができます。

検索エンジンは HTTPS に移行しているため、HTTPS に更に移行するときには、
より多くのリファラー ヘッダーを目にするでしょう。

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">参照ページがセキュアなプロトコルで転送される場合、クライアントは、(非セキュア) HTTP リクエストにリファラー ヘッダー フィールドを含めてはいけません。<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">HTTP RFC による</a></p></blockquote>

## 広告収入

広告を表示することによって自分のサイトの収益化を図る運営者は、HTTPS に移行する場合に広告の表示回数を
減少させないことを確認します。 しかし、混合コンテンツのセキュリティ問題により、
HTTP iframe HTTPS ページでは動作しません。 厄介な
集団行動の問題がここにあります。広告主が HTTPS で公開するまで、
サイト運営者は広告収入を損失することなく HTTPS に移行することはできません。しかし、サイト運営者が HTTPS に移行するまで、広告主は
 HTTPS を公開する動機があまりありません。

広告主は、少なくとも HTTPS を介して広告サービスを提供する必要があります
 (このガイドの「Enable HTTPS On Your Servers」の説明に従うなど)。 ほとんどの場合これはすでに実施されています。 HTTPS のサービス提供を行っていない広告主には、少なくとも
最初に依頼する必要があります。 このガイドの「Make Intra-Site URLs Relative」について、十分な広告主が適切に
相互運用するまで、完了の延期を希望されることもあるでしょう。

