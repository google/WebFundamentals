---
title: "產生金鑰和憑證簽署要求"
description: "本章節使用大多數 Linux、BSD 和 Mac OS X 系統都會隨附的 openssl 命令列程式，以產生私密/公開金鑰和一個 CSR。"
updated_on: 2015-03-27
key-takeaways:
  - 您需要建立一個 2048 位元 RSA 公開/私密金鑰組。
  - 產生內嵌您公開金鑰的憑證簽署要求 (CSR)。
  - 分享您的 CSR 給您的憑證授權單位 (CA) ，以取得最終憑證或憑證鏈結。
  - 安裝您的最終憑證於如 /etc/ssl (Linux and Unix) 等非網頁可存取之處，或是安裝在 ISS 需要的地方 (Windows)。
---

<p class="intro">
  本章節使用大多數 Linux、BSD 和 Mac OS X 系統都會隨附的 openssl 命令列程式，以產生私密/公開金鑰和一個 CSR。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## 產生公開金鑰/私密金鑰金鑰組

在此範例中，我們將會產生一個 2048 位元的 RSA 金鑰組。(如 1024 位元的較小金鑰
無法抵抗暴力猜測攻擊。如 4,096 位元的較大金鑰
則是殺雞用牛刀。隨著時間推移，電腦處理成本變得更低之後，
金鑰大小也必須增加。2,048 是目前的最佳取捨。)

產生 RSA 金鑰組的命令為：

    openssl genrsa -out www.example.com.key 2048

這會給您以下的輸出結果：

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## 產生一個 CSR

在此步驟中，您要內嵌有關您組織與網站的公開金鑰與資訊於一個憑證簽署要求中。
*openssl* 會以互動方式要求您提供該中繼資料。


執行以下命令：

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

將輸出以下內容：

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

現在，請確定該 CSR 並未納入這個命令所無法理解的部分：

    openssl req -text -in www.example.com.csr -noout

回應應該如下所示：

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

## 提交您的 CSR 給 CA

視您想要使用的 CA 類型，傳送 CSR 給它們會有不同方法： 
使用網站上的表單、傳送電子郵件或其他方式。
一些 CA (或其轉售商) 可能甚至自動化處理部分或全部程序 (在某些案例中，
也包括金鑰組與產生 CSR)。

傳送 CA 給您的 CSR，
並按照它們的指示以接收您的最終憑證或憑證鏈結。

不同的 CA 將針對擔保您的公開金鑰，
而收取不同金額。

也有一些選項，可將您的金鑰對應至 1 個以上的 DNS 名稱，
包括數個獨特名稱 (例如，www.example、www.example.com、example.net 與 www.example.net 等所有網站) 
或「萬用字元」名稱，如 \*.example.com。

舉例來說，一家 CA 目前提供以下價格：

* 標準收費：16 美元/年，適用於 example.com 和 www.example.com。
* 萬用字元：150 美元/年，適用於 example.com 和 \*.example.com。

以這些價格，當您擁有超過 9 個子網域時，萬用字元憑證較為經濟；
否則，您可以只購買 1 個或更多單名稱憑證。(如果您有比方說 5 個以上子網域，
可能會發現要在您伺服器上啟用 HTTPS 時，萬用字元憑證較為方便。)


**注意：** 請記住，在萬用字元憑證中，
萬用字元僅適用於 1 個 DNS 標籤 (label)。適用於 \*.example.com 範圍內的憑證，
將適用於 forfoo.example.com 和 bar.example.com，但_不_適用於 foo.bar.example.com。

複製憑證至於您所有前端伺服器中如 /etc/ssl (Linux and Unix) 等非網頁可存取之處，
或是安裝在 ISS 需要的地方 (Windows)。

