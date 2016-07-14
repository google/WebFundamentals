---
title: "生成密钥和证书签名请求"
description: "此部分使用 openssl 命令行程序（大部分 Linux、BSD 和 Mac OS X 系统均附带此程序）来生成私钥/公钥和 CSR。"
updated_on: 2015-03-27
key-takeaways:
  - "您需要创建一个 2,048 位 RSA 公钥和私钥对。"
  - 生成一个嵌入您的公钥的证书签名请求 (CSR)。
  - 将 CSR 与证书颁发机构 (CA) 共享以接收最终证书或证书链。
  - 将最终证书安装在非 Web 可访问的位置，例如 /etc/ssl (Linux 和 Unix) 或 IIS 需要它们的位置 (Windows)。
---

<p class="intro">
  此部分使用 openssl 命令行程序（大部分 Linux、BSD 和 Mac OS X 系统均附带此程序）来生成私钥/公钥和 CSR。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## 生成一个公钥/私钥对

在本例中，我们将生成一个 2,048 位 RSA 密钥对。(较短的密钥不足以抵御暴力猜测攻击，如
1,024 位。
更长的密钥则有点过度，例如 4,096 位。长远来看，随着计算机处理
成本变得更便宜，密钥长度会增加。目前 2,048 是最佳长度。)

用于生成 RSA 密钥对的命令为：

    openssl genrsa -out www.example.com.key 2048

这将为您提供以下输出：

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## 生成 CSR

在此步骤中，您将公钥和有关贵组织及网站的信息
嵌入到证书签名请求。*openssl* 以交互方式
让您输入该元数据。

运行以下命令：

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

将输出以下：

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

现在，您可以使用以下命令来确保 CSR 的形式正确：

    openssl req -text -in www.example.com.csr -noout

响应结果应如下所示：

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

## 将 CSR 提交给 CA

根据要使用的 CA，将有不同方式来向他们发送
 CSR：使用其网站上的表单，通过电子邮件发送，
或其他方式。一些 CA（或其经销商）甚至可能将其中一些或全部流程自动化
（在某些情况下，包括密钥对和 CSR 的生成）。

将 CSR 发送给 CA 并按照他们的说明接收最终
证书或证书链。

对于为您的公钥进行证实的服务，不同 CA 的收费将
有所不同。

还可以选择将密钥映射到多个 DNS 名称，包括
多个独立名称（例如 example.com、www.example.com、example.net 
和 www.example.net 的全部）或“通配符”名称（例如 \*.example.com）。

例如，1 个 CA 目前提供以下价格：

* 标准：$16/年，适用于 example.com 和 www.example.com。
* 通配符：$150/年，适用于 example.com 和 \*.example.com。

按这些价格，当您有 9
个以上子域时，通配符证书比较划算，您可以只购买 1 个或多个单名称证书。（例如，如果
您有 5 个以上子域，在服务器上启用 HTTPS 时，
您可能发现通配符证书更方便。）

**注：** 记住，在通配符证书中，通配符只适用于
1 个 DNS 标签。对 \*.example.com 有效的证书将对
foo.example.com 和 bar.example.com 有效，但对于 foo.bar.example.com 无效。

将证书复制到所有前端服务器的非 Web 可访问
位置，例如 /etc/ssl (Linux 和 Unix) 或 IIS 需要它们的位置 (Windows)。

