---
title: "Generating Keys and Certificate Signing Requests"
description: "Esta seção usa o programa da linha de comando openssl, que é fornecido com a maioria dos sistemas Linux, BSD e Mac OS X, para gerar chaves públicas/privadas e um CSR."
updated_on: 2015-03-27
key-takeaways:
  - Você precisa criar um par de chaves pública e privada do RSA de 2048 bits.
  - Gere uma solicitação de assinatura de certificado (CSR) que integra sua chave pública.
  - Compartilhe sua CSR com sua Autoridade de Certificado (CA) para receber um certificado final ou uma cadeia de certificados.
  - Instale seu certificado final em um local não acessível na Web como /etc/ssl (Linux e Unix) ou no local onde o IIS desejar (Windows).
---

<p class="intro">
  Esta seção usa o programa da linha de comando openssl, que é fornecido com a maioria dos sistemas Linux, BSD e Mac OS X, para gerar chaves públicas/privadas e um CSR.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## Gere um Par de Chaves Pública/Privada

Neste exemplo, iremos gerar um par de chaves RSA de 2048 bits. (Uma chave menor, como
1024 bits, não tem resistência suficiente contra ataques de força bruta. Uma
chave maior, como a de 4096 bits, é um exagero. Com o tempo, o tamanho da chave aumenta conforme
o processamento do computador fica mais barato. Atualmente, o mais adequado é de 2048.)

O comando para gerar o par de chaves RSA é:

    openssl genrsa -out www.example.com.key 2048

Isso fornecerá a seguinte saída:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## Gere uma CSR

Nesta etapa, você integra sua chave pública e informações sobre sua organização
e seu site da Web em uma solicitação de assinatura de certificado. *openssl* solicitará interativamente
 esses metadados.

Executar o seguinte comando:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Resultará no seguinte:

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

Agora, certifique-se de que a CSR está correta. Você pode criar esse comando:

    openssl req -text -in www.example.com.csr -noout

E a resposta deverá ser a seguinte:

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

## Envie sua CSR para uma CA

Dependendo de qual CA você deseja usar, haverá diferentes formas de enviar
sua CSR: usando um formulário no site da Web, enviando por email ou alguma
outra forma. Algumas CAs (ou seu revendedores) podem até mesmo automatizar alguns ou todos os processos
(em alguns casos incluindo o par de chaves e a geração da CSR).

Envie sua CSR para a CA e siga as instruções para receber seu certificado
final ou cadeia de certificados.

Diferentes CAs cobrarão valores diferentes pelo serviço de confirmação
de sua chave pública.

Também há opções para mapear sua chave para mais de 1 nome DNS, incluindo
vários nomes distintos (por exemplo, todos de exemplo.com, www.exemplo.com, exemplo.net,
e www.example.net) ou nomes “curinga&quot; como \*.exemplo.com.

Por exemplo, 1 CA atualmente custa:

* Padrão: $16/ano, válido para exemplo.com e www.exemplo.com.
* Curinga: $150/ano, válido para exemplo.com e \*.exemplo.com.

Com esses preços, os certificados curinga são econômicos quando você tem mais de 9
subdomínios; caso contrário, você pode comprar apenas 1 ou mais certificados de nome único. (Se
você tem mais do que 5 subdomínios, por exemplo, você pode encontrar um certificado curinga
mais conveniente quando você habilitar HTTPS em seus servidores.)

**OBSERVAÇÃO:** lembre-se de que nos certificados curinga, o curinga é aplicado a
apenas 1 etiqueta DNS. Um bom certificado para \*.exemplo.com funciona para
foo.exemplo.com e bar.exemplo.com, mas _não_ para foo.bar.exemplo.com.

Copie os certificados para todos os seus servidores de front-end em um local não acessível pela Web
como /etc/ssl (Linux e Unix) ou no local onde o IIS desejar (Windows).

