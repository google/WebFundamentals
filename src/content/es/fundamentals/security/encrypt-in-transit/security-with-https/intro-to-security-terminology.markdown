---
title: "Introducción a la terminología de seguridad"
description: "Cuando se realiza una migración hacia HTTPS, uno de los obstáculos a los que se enfrentan los operadores de sitios es conceptual: ¿Qué está sucediendo exactamente? ¿Qué significa toda la terminología criptográfica? En esta sección, incluimos una descripción general muy breve."
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Las claves públicas y privadas se utilizan para firmar y descifrar mensajes entre el navegador y el servidor."
  - "Una CA (Autoridad de certificación) es una organización que avala las asignaciones entre las claves públicas y los nombres de DNS (Sistemas de nombres de dominio) públicos (tales como 'www.foobar.com')."
  - "Una CSR (solicitud de firma de certificados) es un formato de datos que une una clave pública con algunos metadatos sobre la entidad que es propietaria de la clave."
---

<p class="intro">
  Cuando se realiza una migración hacia HTTPS, uno de los obstáculos a los que se enfrentan los operadores de sitios es conceptual: ¿Qué está sucediendo exactamente? ¿Qué significa toda la terminología criptográfica? En esta sección, incluimos una descripción general muy breve.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

## ¿Qué son los pares de claves públicas y privadas?

Un **par de claves públicas y privadas** es un par de números muy grandes que se pueden utilizar
como claves de cifrado y de descifrado, y que poseen una relación
matemática especial. Un sistema común para los pares de claves es el **[sistema de cifrado RSA
(Rivest, Shamir y Adleman)](https://en.wikipedia.org/wiki/RSA_(cryptosystem))**. La **clave
pública** se utiliza para cifrar mensajes, y los mensajes se pueden
descifrar únicamente con la **clave privada** correspondiente. En su servidor web, la clave pública
se anuncia abiertamente y sin restricciones, y los clientes (como los navegadores web) la utilizarán para
establecer un canal seguro hacia su servidor.

## ¿Qué es una autoridad de certificación?

Una **CA (autoridad de certificación)** es una organización que avala las
 asignaciones entre las claves públicas y los nombres de DNS públicos (tales como "www.foobar.com").
Por ejemplo, ¿cómo hace un cliente para saber si una determinada clave pública es la clave pública _real_
de www.foobar.com? Esto no se puede saber de antemano. La CA comfirma que
una clave determinada es la verdadera para un sitio en particular mediante el uso de
su propia clave privada para **[firmar
criptográficamente](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages)** la
clave pública del sitio web. Esta firma es imposible de falsificar de forma computacional.
Los navegadores (y otros clientes) mantienen las **tiendas de anclaje de veracidad** que contienen las
claves públicas que son propiedad de las reconocidas CA, y utilizan dichas claves públicas para
**verificar criptográficamente** las firmas de las CA.

El **certificado X.509** es un formato de datos que une una clave pública
con algunos metadatos sobre la entidad que es propietaria de la clave. En el caso de la web,
el propietario de la clave es el operador del sitio, y el metadato importante es el nombre del DNS
del servidor web. Cuando un cliente se conecta a un servidor web HTTPS, dicho
servidor muestra su certificado para que el cliente lo verifique. El cliente verifica
que el certificado no haya caducado, que el nombre del DNS coincida con el nombre del
servidor al que se estaba intentando conectar y que una CA de anclaje de veracidad reconocida haya
firmado el certificado. En la mayoría de los casos, las CA no firman directamente los certificados de los servidores web
. Por lo general, se crea una **cadena de certificados** que vincula un sistema de anclaje de veracidad
 con uno o varios firmantes intermedios y, finalmente, con el certificado
del servidor web (la **entidad final**).

## ¿Qué es una solicitud de firma de certificados?

La **CSR (solicitud de firma de certificados)** es un formato de datos que, al igual que un
certificado, une una clave pública con algunos metadatos sobre la entidad
que es propietaria de la clave. Sin embargo, los clientes no interpretan las CSR; pero sí lo hacen las CA. Si desea
que una CA avale la clave pública de su servidor web, debe enviar una CSR a la CA. La
CA valida la información en la CSR y la utiliza para generar un certificado.
Luego, le envían el certificado final, y usted debe instalar dicho certificado (o,
lo que es más probable, una cadena de certificados) y su clave privada en su servidor web.

