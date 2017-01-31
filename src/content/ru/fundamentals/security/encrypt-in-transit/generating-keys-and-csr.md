project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: В данном разделе для генерации открытых/закрытых ключей и запросов на получение сертификата CSR используется консольная программа openssl, стандартная для большинства операционных систем Linux, BSD и Mac OS X.

{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Генерация ключей и запросы на получение сертификата {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}



В данном разделе для генерации открытых/закрытых ключей и запросов на получение сертификата CSR используется консольная программа openssl, стандартная для большинства операционных систем Linux, BSD и Mac OS X.

### TL;DR {: .hide-from-toc }
- Для этого вам понадобится создать пару из открытого и закрытого 2048-разрядных ключей с использованием криптосистемы RSA.
- Сформируйте запрос на получение сертификата (CSR), в который встраивается ваш открытый ключ.
- Передайте ваш CSR в сертифицирующий орган для получения окончательного сертификата или цепочки сертификатов.
- Поместите окончательный сертификат в хранилище, куда невозможно попасть через Интернет, например в /etc/ssl (для Linux и Unix) или в другое место, рекомендуемое IIS (для Windows).



## Создание пары открытого/закрытого ключей

В данном примере мы создадим пару 2048-разрядных ключей с использованием криптосистемы RSA. (Более короткие ключи, например
1024-разрядные ключи, могут быть подобраны с использованием метода полного перебора возможных комбинаций. Более длинные ключи
, например 4096-разрядные,&nbsp;использовать нецелесообразно. С течением времени длина ключей растет, поскольку
вычислительные мощности дешевеют. Идеальным вариантом на сегодняшний день являются 2048-разрядные ключи.

Ниже приведена команда для генерации пары ключей с использованием криптосистемы RSA:

    openssl genrsa -out www.example.com.key 2048

Она возвращает следующее:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## Генерация запроса на получение сертификата CSR

На этом этапе вы размещаете свой открытый ключ и информацию о своей организации
и вашем веб-сайте в запросе на получение сертификата, и эти данные
запросит у вас *openssl*.

Выполнение этой команды:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Вернет следующее:

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

Теперь необходимо убедиться в корректности CSR; это можно сделать с помощью следующей команды:

    openssl req -text -in www.example.com.csr -noout

Ответ программы должен выглядеть следующим образом:

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

## Предоставление CSR сертифицирующему органу

В зависимости от сертифицирующего органа возможно использование различных способов подачи
запроса на получение сертификата: через форму на веб-сайте органа, по электронной почте или иным
способом. Некоторые сертифицирующие органы (либо их торговые посредники) могут автоматически выполнять некоторые или все из вышеуказанных шагов
(которые порой могут включать в себя генерацию пары ключей и CSR).

Отправьте сертифицирующему органу свой CSR и следуйте предоставляемым инструкциям для получения окончательного
сертификата или цепочки сертификатов.

Различные сертифицирующие органы взимают различную плату за услуги сертификации
вашего открытого ключа.

Также существует возможность назначить ваш ключ нескольким доменным именам, включая
несколько конкретных имен (например, example.com, www.example.com, example.net,
и www.example.net), а также группе имен с подстановочными символами, например, \*.example.com.

Например, один из сертифицирующих органов предлагает следующие расценки:

* Стандартный пакет: $16/год для доменных имен example.com и www.example.com.
* Групповой пакет: $150/год для доменных имен example.com и \*.example.com.

По этим расценкам получение сертификатов для группы доменных имен становится выгодным, если у вас в наличии более 9
дочерних доменов; в остальных случаях вы можете приобрести сертификаты на каждое имя по отдельности. Если
, например, у вас более 5 дочерних доменов, получение сертификатов для группы имен может оказаться для вас
более удобным, если вам понадобится использовать протокол HTTPS на своих серверах).

**ПРИМЕЧАНИЕ.** Помните, что групповой пакет сертификатов предполагает подстановку символов только в
первой части доменного имени. Сертификат для \*.example.com подойдет для
foo.example.com и bar.example.com, но не для foo.bar.example.com.

Поместите сертификат в хранилища на внешних серверах, куда невозможно попасть через Интернет
, например в /etc/ssl (для Linux и Unix), или в другое место, рекомендуемое IIS (для Windows).

