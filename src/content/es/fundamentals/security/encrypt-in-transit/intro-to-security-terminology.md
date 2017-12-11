project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dos de los obstáculos a los que se enfrentan los desarrolladores cuando realizan migraciones a HTTPS son los conceptos y la terminología. En esta guía se proporciona información general breve sobre ambos.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-03-27 #}

# Terminología importante de seguridad {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
  
### TL;DR {: .hide-from-toc }

* Las claves públicas y privadas se usan para firmar y desencriptar mensajes entre el navegador y el servidor.
* Una autoridad de certificación (CA, certificate authority) es una organización que avala las asignaciones entre las claves públicas y los nombres de DNS públicos (tales como “www.foobar.com”).
* Una solicitud de firma de certificados (CSR, certificate signing request) es un formato de datos que une una clave pública con algunos metadatos sobre la entidad propietaria de la clave.

## ¿Qué son los pares de claves públicas y privadas?

Un **par de claves públicas y privadas** es un par de números muy grandes que se pueden usar
como claves de encriptación y desencriptación, y que poseen una relación
matemática especial. Un sistema común para los pares de claves es el **[criptosistema
RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){: .external}**. La **clave
pública** se usa para encriptar mensajes; los mensajes se pueden desencriptrar
únicamente con la **clave privada** correspondiente. En tu servidor web, la clave pública
se anuncia abiertamente y sin restricciones, y los clientes (como los navegadores web) la emplean para
establecer un canal seguro hacia tu servidor.

## ¿Qué es una autoridad de certificación?

Una **autoridad de certificación (CA, certification authority)** es una organización que avala las asignaciones
entre las claves públicas y los nombres de DNS públicos (tales como “www.foobar.com”).
Por ejemplo, ¿cómo hace un cliente para saber si una determinada clave pública es la clave _pública_
verdadera de www.foobar.com? Esto no se puede saber de antemano. La CA confirma que
una clave determinada es la real para un sitio en particular usando
su propia clave privada para **[firmar
criptográficamente](https://en.wikipedia.org/wiki/RSA_(cryptosystem)Signing_messages){: .external}** la
clave pública del sitio web. Esta firma es imposible de falsificar a nivel computacional.
Los navegadores (y otros clientes) mantienen** las tiendas de anclaje de veracidad** que contienen las
claves públicas que son propiedad de las CA reconocidas, y usan dichas claves públicas para
**verificar criptográficamente** las firmas de las CA.

Un **certificado X.509** es un formato de datos que une una clave pública
con algunos metadatos sobre la entidad que es propietaria de la clave. En el caso de la web,
el propietario de la clave es el operador del sitio y los metadatos importantes corresponden al nombre del DNS
del servidor web. Cuando un cliente se conecta a un servidor web HTTPS, este
servidor presenta su certificado para que el cliente lo verifique. El cliente verifica
que el certificado no haya caducado, que el nombre del DNS coincida con el nombre del
servidor al cual el cliente intentó conectarse y que una CA de anclaje de veracidad reconocida haya
firmado el certificado. En la mayoría de los casos, las CA no firman directamente los certificados de los servidores
web. Por lo general, se crea una **cadena de certificados** que vincula un sistema de anclaje
de veracidad con uno o varios firmantes intermedios y, finalmente, con el certificado
del servidor web (la **entidad final**).

## ¿Qué es una solicitud de firma de certificados?

La **solicitud de firma de certificados (CSR, certificate signing request)** es un formato de datos que, al igual que un
certificado, une una clave pública con algunos metadatos sobre la entidad
que es propietaria de la clave. Sin embargo, los clientes no interpretan las CSR. Sí lo hacen las CA. Si deseas
que una CA avale la clave pública de tu servidor web, debes enviar una CSR a la CA. La
CA valida la información en la CSR y la usa para generar un certificado.
Luego envía el certificado final. A continuación, debes instalar dicho certificado (o,
lo que es más probable, una cadena de certificados) y tu clave privada en el servidor web.


{# wf_devsite_translation #}
