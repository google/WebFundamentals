---
layout: shared/narrow
title: "Generating keys and certificate signing requests"
description: "This section uses the openssl command-line program, which comes with most Linux, BSD, and Mac OS X systems, to generate private / public keys and a CSR."
authors:
  - chrispalmer
  - mattgaunt
published_on: 2015-03-27
updated_on: 2015-03-27
order: 2
translation_priority: 0
key-takeaways:
  - "You need to create a 2048-bit RSA public and private key pair."
  - "Generate a certificate signing request (CSR) which embeds your public key."
  - "Share your CSR with your Cerfticate Authority (CA) to receive a final certificate or certificate chain."
  - "Install your final certificate in a non-web-accessible place such as /etc/ssl (Linux and Unix) or wherever IIS wants them (Windows)."
---

<p class="intro">
  This section uses the openssl command-line program, which comes with most Linux, BSD, and Mac OS X systems, to generate private / public keys and a CSR.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## Generate A Public/Private Key Pair

In this example, we'll generate a 2,048-bit RSA key pair. (A smaller key, such
as 1,024 bits, is insufficiently resistant to brute-force guessing attacks. A
larger key, such as 4,096 bits, is overkill. Over time, key sizes increase as
computer processing gets cheaper. 2,048 is currently the sweet spot.)

The command to generate the RSA keypair is:

    openssl genrsa -out www.example.com.key 2048

This will give you the following output:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

## Generate A CSR

In this step, you embed your public key and information about your organization
and your web site into a certificate signing request. *openssl* will interactively
ask you for that metadata.

Running the following command:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Will output the following:

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

Now, make sure the CSR looks right which you can do with this command:

    openssl req -text -in www.example.com.csr -noout

And the response should look like the following:

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

Depending on what CA you want to use, there will be different ways to send them
your CSR: using a form on their web site, sending it by email, or something
else. Some CAs (or their resellers) may even automate some or all of the process
(including, in some cases, key pair and CSR generation).

Send the CA your CSR, and follow their instructions to receive your final
certificate or certificate chain.

Different CAs will charge different amounts of money for the service of vouching
for your public key.

There are also options for mapping your key to more than 1 DNS name, including
several distinct names (e.g. all of example.com, www.example.com, example.net,
and www.example.net) or "wildcard" names such as \*.example.com.

For example, 1 CA currently offers these prices:

* Standard: $16/year, valid for example.com and www.example.com.
* Wildcard: $150/year, valid for example.com and \*.example.com.

At these prices, wildcard certificates are economical when you have more than 9
subdomains; otherwise, you can just buy 1 or more single-name certificates. (If
you have more than, say, 5 subdomains, you might find a wildcard certificate
more convenient when you come to enable HTTPS on your servers.)

**NOTE:** Keep in mind that in wildcard certificates the wildcard applies to
only 1 DNS label. A certificate good for \*.example.com will work for
foo.example.com and bar.example.com, but _not_ for foo.bar.example.com.

Copy the certificates to all your front-end servers in a non-web-accessible
place such as /etc/ssl (Linux and Unix) or wherever IIS wants them (Windows).

