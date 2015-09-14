---
title: "Generación de claves y solicitudes de firma de certificados"
description: "En esta sección, se utiliza el programa de línea de comandos OpenSSL, que se ofrece con la mayoría de los sistemas de Linux, BSD y Mac OS X, para generar claves privadas o públicas, y una CSR (solicitud de firma de certificados)"
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Debe crear un par de claves públicas y privadas RSA (Rivest, Shamir y Adleman) de 2.048&nbsp;bits."
  - "Genere una solicitud de firma de certificados (CSR) que incluya su clave pública."
  - "Comparta su CSR con su CA (autoridad de certificación) para recibir un certificado final o una cadena de certificados."
  - "Instale el certificado final en un lugar al que no se pueda acceder a través de la web, como /etc/ssl (Linux y Unix), o en cualquier lugar donde lo requiera IIS (Windows)."
---

<p class="intro">
  En esta sección, se utiliza el programa de línea de comandos OpenSSL, que se ofrece con la mayoría de los sistemas de Linux, BSD y Mac OS X, para generar claves privadas o públicas, y una CSR (solicitud de firma de certificados).
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## Generación de un par de claves públicas o privadas

En este ejemplo, generaremos un par de claves RSA de 2.048&nbsp;bits. (Las claves más pequeñas, como las de
1.024&nbsp;bits, no son lo suficientemente resistentes a los ataques externos por fuerza bruta. Las
claves más grandes, como las de 4.096&nbsp;bits, son exageradas. Con el paso del tiempo, el tamaño de las claves aumenta a medida que
el procesamiento por computadora es más económico. Actualmente, el punto óptimo es 2.048.)

El comando para generar el par de claves RSA es el siguiente:

    openssl genrsa -out www.example.com.key 2048

De este modo, obtendrá el siguiente resultado:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## Generación de una CSR

En esta instancia, incrusta su clave pública e información sobre su organización
y su sitio web en una solicitud de firma de certificado. En *openssl*, se le solicitarán sus metadatos
de forma interactiva.

Si ejecuta el siguiente comando:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Obtendrá el siguiente resultado:

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

Ahora, asegúrese de que la CSR esté bien. Para hacerlo, use el siguiente comando:

    openssl req -text -in www.example.com.csr -noout

Y la respuesta debe verse de esta manera:

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

## Envío de la CSR a una CA

Según la CA que desee utilizar, podrá enviar 
su CSR de diferentes maneras: mediante un formulario en el sitio web, por correo electrónico o por algún otro
medio. Algunas CA (o sus revendedores) pueden incluso automatizar una parte o todo el proceso
(que incluye, en algunos casos, la generación de los pares de claves y de la CSR).

Envíe la CSR a la CA y siga las instrucciones que le den para recibir el
certificado final o la cadena de certificados.

Las CA cobran diferentes montos de dinero por el servicio de comprobación
de claves públicas.

También se ofrece la opción de asignar su clave a más de 1 nombre de DNS, incluidos
varios nombres diferentes (p.&nbsp;ej., todas las instancias de example.com, www.example.com, example.net
y www.example.net) o nombres &quot;comodín&quot;, como \*.example.com.

Por ejemplo, actualmente, una CA ofrece estos precios:

* Estándar: $16/año, válido para example.com y www.example.com
* Comodín: $150/año, válido para example.com y \*.example.com

Teniendo en cuenta estos precios, los certificados comodín son económicos si posee más de 9
subdominios; de lo contrario, solo puede comprar 1 o más certificados para un solo nombre. (Si
posee más de, supongamos, cinco subdominios, tal vez un certificado comodín
le resulte más conveniente cuando decida habilitar HTTPS en sus servidores).

**NOTA:** Tenga en cuenta que, en los certificados comodín, el comodín se aplica
solo a 1 etiqueta de DNS. Un certificado que sea conveniente para \*.example.com será útil para
foo.example.com y bar.example.com, pero no para foo.bar.example.com.

Copie los certificados de todos sus servidores front-end en un
lugar al que no se pueda acceder a través de la web, como /etc/ssl (Linux y Unix), o en cualquier lugar donde lo requiera IIS (Windows).

