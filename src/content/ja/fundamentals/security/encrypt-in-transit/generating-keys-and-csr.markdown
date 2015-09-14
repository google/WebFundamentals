---
title: "キーと証明書の署名要求の作成"
description: "このセクションでは、Linux、BSD、および Mac OS X システムに含まれる openssl コマンドライン プログラムを使用して、秘密鍵/公開鍵と CSR を生成する方法を説明します。"
updated_on: 2015-03-27
key-takeaways:
  - 2048 ビットの RSA 公開鍵と秘密鍵のペアを作成する必要があります。
  - 公開鍵を埋め込む証明書署名要求 (CSR) を生成します。
  - CSR を認証局 (CA) と共有して、最終的な証明書または証明書チェーンを受け取ります。
  - /etc/ssl (Linux および Unix) などウェブ アクセスが不可能な場所や、IIS が必要とする場所 (Windows) に、最終的な証明書をインストールします。
---

<p class="intro">
  このセクションでは、Linux、BSD、および Mac OS X システムに含まれる openssl コマンドライン プログラムを使用して、秘密鍵/公開鍵と CSR を生成する方法を説明します。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## 公開鍵/秘密鍵のペアを生成します

この例では、2,048 ビットの RSA 鍵ペアを生成します。(1,024 ビットなど
の小さい鍵は、ブルートフォース推測攻撃に対して耐性が不十分です。4,096 ビットなどの
大きい鍵は過剰攻撃となります。時の経過とともにコンピュータ処理が安価になるにつれて、
鍵のサイズが増大します。2,048 ビットが現在最適な値です。

RSA 鍵ペアを生成するためのコマンドは次のとおりです。

    openssl genrsa -out www.example.com.key 2048

次の結果が出力されます。

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## Generate A CSR

このステップでは、公開鍵および所属する組織とウェブ サイトに
関する情報を証明書署名要求に埋め込みます。*openssl* は対話的に
メタデータについて問い合わせます。

次のコマンドを実行:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

出力結果:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

このコマンドで出力した CSR が正しいことを確認してください。

    openssl req -text -in www.example.com.csr -noout

応答は次のようになります。

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

## Submit Your CSR To A CA

使用する CA の内容に応じて、
CSR を送信するさまざまな方法があります。ウェブ サイト上のフォームを使用したり、電子メールで送信する
などです。CA (またはその販売者) が、プロセスの一部またはすべてを自動化できる場合もあります
 (たとえば、鍵ペアおよび CSR の生成など)。

CSR を CA に送信し、その指示に従って、最終的な
証明書または証明書チェーンを受け取ってください。

公開鍵の証票のサービスにかかる費用は、
CA によって異なります。

1 つ以上の DNS 名にキーをマッピングするためのオプションもあります。
複数の別名 (example.com、www.example.com、example.net、
www.example.net など)、または \*.example.com などの「ワイルドカード」の名前が利用可能です。

たとえば、1 つの CA が現在次のような価格で提供しています。

* 標準: $16/年、example.com および www.example.com で有効。
* 標準: $150/年、example.com および \*.example.com で有効。

9 つ以上のサブドメインがある場合、これらの価格設定では、ワイルドカード証明書がお得です。
また、1 つまたは複数の単一名の証明書を購入することもできます。(たとえば 
5 つのサブドメインがある場合、サーバー上で TTPS を有効にするときには、
ワイルドカード証明書が便利なことがあります。)

**注:** ワイルドカード証明書では、ワイルドカードは 1 つの DNS ラベルだけに
適用されることに注意してください。\*.example.com に有効な証明書は、
foo.example.com および bar.example.com に適用されますが、foo.bar.example.com には適用されません。

/etc/ssl (Linux および Unix) などウェブ アクセスが不可能な場所や、
IIS が必要とする場所 (Windows) で、すべてのフロント エンド サーバーに証明書をコピーします。

