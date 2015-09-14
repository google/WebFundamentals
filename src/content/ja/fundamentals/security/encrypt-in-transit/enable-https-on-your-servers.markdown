---
title: "Enable HTTPS On Your Servers"
description: "サーバーで HTTPS を有効にするすべての重要な手順の準備ができました。"
updated_on: 2015-03-27
key-takeaways:
  - Mozilla のサーバー設定ツールを使用して、TTPS をサポートのためにサーバーを設定します。
  - Qualys の便利な SSL Server Test で定期的にサイトをテストし、少なくとも A または A+ を得られるようにします。
---

<p class="intro">
  サーバーで HTTPS を有効にするすべての重要な手順の準備ができました。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

このステップでは、重要な業務の意思決定を行う必要があります。

* それぞれのホスト名、ウェブサーバー、サービス、コンテンツに、個別の IP アドレスを付与します。
  あるいは、
* 名前ベースのバーチャルホストを使います。

ホスト名ごとに異なる IP アドレスを使用している場合は問題ありません!すべてのクライアント
の HTTP および HTTPS を容易にサポートできます。

しかし、ほとんどのサイト運営には、名前ベースのバーチャル ホストを使って IP
アドレスを節約します。そのほうが便利だからです。 Windows XP 
および Android 2.3 以前の IE の問題は、[Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI) を理解できないことです。
これは HTTPS の名前ベースのバーチャル ホストでは重大事項です。

いつか (多分すぐに) SNI をサポートしないクライアントは、すべての近代的なソフトウェアに
取って代わるでしょう。 リクエスト ログのユーザー エージェント文字列を監視し、十分な数のユーザーが
いつ近代的なソフトウェアに移行したかを把握します。 (しきい値を
 &lt; 5%、&lt; 1%、などで設定できます。)

サーバー上で利用可能な HTTPS サービスを保有していない場合は、すぐに利用可能にしてください
(HTTP を HTTPS にリダイレクトする必要がなくなります)。 購入してインストールした証明書を使用して、
ウェブ サーバーを構成します。 [Mozilla's handy
configuration
generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
が便利であることがお分かりいただけるでしょう。

多くのホスト名やサブドメインを持っている場合、それぞれで
証明書を使用する必要があります。

**注:** 多くのサイト運営者はすでに、これまで説明してきた手順を完了していますが、
クライアントを HTTP にリダイレクトして戻すことだけを目的に HTTPS を使用しています。 そうされている
場合は、すぐに止めてください。 HTTPS と HTTP をスムーズ活用するために、次のセクションを
参照してください。

**注:** 最終的には、HTTP のリクエストを HTTPS にリダイレクトし、HTTP ストリクト 
トランスポート セキュリティ (HSTS) を使用してください。 これを行うには、移行プロセスの正しい段階ではありません。
「Redirect HTTP To HTTPS (HTTP から HTTPS へのリダイレクト)」、および「Turn On Strict Transport Security And Secure Cookies (ストリクト トランスポート·セキュリティおよびセキュアなクッキーをオンにする)」を参照してください。

今すぐに、また、サイトのライフタイムにわたって、HTTPSの設定を確認してください。
[Qualys' handy SSL Server Test](https://www.ssllabs.com/ssltest/). サイトは A または A+ の
スコアを取得する必要があります。それ以下のスコアの場合、原因となるものをバグとして扱ってください。
(アルゴリズムとプロトコルに対する攻撃は常に巧妙になっているので、
今日の A は明日の B となります!)

