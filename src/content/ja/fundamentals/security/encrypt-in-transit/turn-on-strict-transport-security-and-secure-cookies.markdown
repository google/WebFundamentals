---
title: "Turn On Strict Transport Security And Secure Cookies"
description: ""
updated_on: 2015-03-27
key-takeaways:
  - HTTP ストリクト トランスポート セキュリティ (HSTS) を使用して、301 リダイレクトのコストを回避します。
  - Cookie に 常に secure フラグを設定します。
---

<p class="intro">
  
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

この時点で、HTTPS の使用を「ロックイン」する準備が整いました。 最初に [Strict
Transport
Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) を使用して、http:// の手順に従う場合にも、
常に HTTPS 経由でサーバーに
接続する必要があることをクライアントに伝達します。 これによりり、[SSL
Stripping](http://www.thoughtcrime.org/software/sslstrip/) などの攻撃から守られ、「HTTPS に HTTP をリダイレクトする」で有効化された 301 リダイレクトの
ラウンドトリップ コストを回避します。

**注:** サイトを HSTS ホストとして認識しているクライアントは、
_[hard-fail] の傾向があります(https://tools.ietf.org/html/rfc6797#section-12.1)_[ お使いの
](https://tools.ietf.org/html/rfc6797#section-12.1)[サイトが
TLS 構成でエラーになった場合](https://tools.ietf.org/html/rfc6797#section-12.1) (
期限切れの証明書など)。 これは HSTS の明示的な設計上の選択です。
ネットワーク攻撃者が、HTTPS なしでサイトに
アクセスしてクライアントを騙すことができないようにします。 証明書の検証エラーのまま HTTPS を展開する
ことがないよう、サイトの運営が十分に堅牢であることを確認するまで、HSTS を
有効にしないでください。

ストリクト トランスポート·セキュリティ ヘッダーを設定して、HTTP ストリクト 
トランスポート·セキュリティ (HSTS) をオンにします。 さまざまなサーバー ソフトウェアについては、[OWASP's HSTS page has links to
instructions](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
を参照してください。

ほとんどのウェブ サーバーは、カスタム ヘッダーを追加するための同様の機能を提供しています。

**注:** max-age は瞬時に計測されます。 低い値から開始し、HTTPS のみのサイトの
操作がより快適になるよう、
徐々に max-age を増加させます。

クライアントが HTTP でクッキー (
認証や好みのサイト) を送信しないことを確認するのも重要です。 たとえば、ユーザーの
認証クッキーがプレーンテキストで露出されると、
他のすべてのことを正しく行っている場合でも、
セッション全体のセキュリティ保障が破壊されます。

したがって、ウェブ アプリケーションを変更して、
クッキーの Secure フラグを常に設定します。 [This OWASP page explains how to set the Secure
flag](https://www.owasp.org/index.php/SecureFlag) 複数のアプリケーション 
フレームワークで。 すべてのアプリケーション·フレームワークには、フラグを設定するためのいくつかの方法があります。

