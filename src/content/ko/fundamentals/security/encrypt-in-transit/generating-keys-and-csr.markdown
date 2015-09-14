---
title: "키 및 CSR(인증서 서명 요청) 생성하기"
description: "이 절에서는 대부분의 Linux, BSD 및 Mac OS X 시스템과 함께 제공되는 openssl 명령줄 프로그램을 사용하여 개인/공개 키 및 CSR를 생성합니다."
updated_on: 2015-03-27
key-takeaways:
  - "개발자는 2,048비트 RSA 공개 키와 개인 키 쌍을 생성해야 합니다."
  - "공개 키를 포함하는 CSR(인증서 서명 요청)를 생성합니다."
  - "생성한 CSR를 CA(인증 기관)와 공유하여 최종 인증서 또는 인증서 체인을 받습니다."
  - "<code>/etc/ssl</code> 등 웹 액세스가 불가능한 곳(Linux 및 Unix)이나 IIS가 인증서를 필요로 하는 곳(Windows)에 최종 인증서를 설치합니다."
---

<p class="intro">
  이 절에서는 대부분의 Linux, BSD 및 Mac OS X 시스템과 함께 제공되는 openssl 명령줄 프로그램을 사용하여 개인/공개 키 및 CSR를 생성합니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## 공개 키/개인 키 쌍 생성

다음 예에서는 2,048비트 RSA 키 쌍을 생성합니다. (1,024비트와 같은
작은 키는 무차별 암호 대입 공격(brute-force guessing attack)에 대응하는 데 충분하지 않습니다. 4,096비트와
같은 큰 키는 대응이 과합니다. 시간이 지나면서 컴퓨터 처리 비용이
저렴해질수록 키 크기는 증가합니다. 현재는 2,048비트가 이상적입니다.)

RSA 키 쌍을 생성하는 명령은 다음과 같습니다.

    openssl genrsa -out www.example.com.key 2048

그러면 다음 출력이 생성됩니다.

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## CSR 생성

이 단계에서는 공개 키와 소속 조직 및 웹 사이트 관련 정보를 인증서
서명 요청에 포함합니다. *openssl*이 대화형 방식으로 해당 메타데이터를
요청합니다.

다음 명령을 실행하면

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

다음이 출력됩니다.

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

CSR가 올바르게 표시되는지 확인합니다. 이 작업은 다음 명령을 사용하여 수행할 수 있습니다.

    openssl req -text -in www.example.com.csr -noout

응답은 다음과 같아야 합니다.

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

## CSR를 CA에 제출

이용하려는 CA에 따라 웹 사이트의 양식 사용, 이메일을 통한 전송 등
CA에 CSR를 보내는 방법은
다양합니다. 몇몇 CA(또는 해당 재판매업체)는 이 프로세스의 일부 또는 전체(경우에
따라 키 쌍 및 CSR 생성 포함)를 자동화할 수도 있습니다.

CA에 CSR를 보내고 지시에 따라 최종 인증서 또는 인증서 체인을
받습니다.

공개 키 보증 서비스 수수료는 CA마다 다를
수 있습니다.

복수의 고유한 DNS 이름(예: example.com, www.example.com,
example.net 및 www.example.net 모두)에 매핑하거나 \*.example.com과 같은 '와일드카드' 이름 등 둘 이상의
DNS 이름에 키를 매핑하는 옵션도 있습니다.

예를 들어, 한 CA가 현재 다음 가격을 제공하고 있다고 가정합니다.

* 표준: $16/년, example.com 및 www.example.com에 유효.
* 와일드카드: $150/년, example.com 및 \*.example.com에 유효.

이 가격을 기준으로 계산하면 하위 도메인이 10개 이상인 경우에는 와일드카드 인증서가
경제적이고, 9개 이하인 경우에는 1개 이상의 단일 이름 인증서를 구입하는 것이 좋습니다. (하위
도메인이 6개 이상인 경우 서버에 HTTPS를 사용하도록 설정할 때
와일드카드 인증서가 더 편리할 것입니다.)

**참고:** 와일드카드 인증서에서 와일드카드는 단일
DNS 레이블에만 적용됩니다. \*.example.com에 유효한 인증서는 
foo.example.com 및 bar.example.com에는 적용되지만 foo.bar.example.com에는 적용되지 _않습니다_.

/etc/ssl 등 웹 액세스가 불가능한 곳(Linux 및 Unix)이나 IIS가 인증서를
필요로 하는 곳(Windows)의 모든 프런트 엔드 서버에 인증서를 복사합니다.

