project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conceitos e terminologia são dois obstáculos enfrentados pelos desenvolvedores na migração para o HTTPS. Este guia oferece uma breve descrição desses obstáculos.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-03-27 #}

# Terminologia de segurança importante {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
  
### Resumo {: .hide-from-toc }

* Chaves públicas/privadas são usadas para assinar e descriptografar mensagens entre o navegador e o servidor.
* Uma autoridade de certificação (CA) é uma organização que confirma o mapeamento entre as chaves públicas e os nomes de DNS públicos (como "www.foobar.com").
* Uma solicitação de assinatura de certificado (CSR) é um formato de dados que junta uma chave pública com alguns metadados sobre a entidade proprietária da chave.

## O que são os pares de chaves pública e privada?

Um **par de chaves pública/privada** é um par de números muito grandes que são usados
como chaves de criptografia e descriptografia e que compartilham uma relação matemática
especial. Um sistema comum para pares de chave é o **[sistema criptográfico
RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){: .external}**. A **chave
pública** é usada para criptografar mensagens. A descriptografia dessas mensagens somente é
viável com a **chave privada** correspondente. O seu servidor web divulga
a chave pública para todo o mundo e os clientes (como navegadores web) usam isso para
criar um canal seguro para o servidor.

## O que é uma autoridade de certificação?

Uma **autoridade de certificação (CA)** é uma organização que confirma o
mapeamento entre chaves públicas e nomes de DNS públicos (como "www.foobar.com").
Por exemplo, como um cliente pode saber se uma determinada chave pública é realmente
a chave pública de www.foobar.com? A princípio, não há forma de saber. Uma CA confirma
uma determinada chave como sendo verdadeira para determinado site usando sua
própria chave privada para **[assinar
criptograficamente](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Signing_messages){: .external}** a
chave pública do site. Em termos de recursos computacionais, é inviável falsificar essa assinatura.
Os navegadores (e outros clientes) mantêm **repositórios de ancoragem confiáveis** contendo as
chaves públicas pertencentes às CAs conhecidas e usam essas chaves públicas para
**confirmar criptograficamente** as assinaturas das CAs.

Um **certificado X.509** é um formato de dados que agrupa uma chave pública
com alguns metadados sobre a entidade proprietária da chave. No caso da Web,
o proprietário da chave é o operador do site e os metadados importantes são o nome DNS
do servidor da Web. Quando um cliente se conecta por meio de HTTPS a um servidor da Web, este
apresenta seu certificado para verificação pelo cliente. O cliente verifica
se o certificado não expirou, se o nome DNS corresponde ao nome do
servidor a que o cliente está tentando se conectar e se uma CA âncora confiável
assinou o certificado. Na maioria dos casos, as CAs não assinam os certificados do servidor
web diretamente. Normalmente, há uma **cadeia de certificados** que vincula uma âncora
confiável a um ou mais assinantes intermediários e, por fim, ao próprio certificado do
servidor web (a **entidade final**).

## O que é uma solicitação de assinatura de certificado?

Uma **solicitação de assinatura de certificado (CSR)** é um formato de dados que, como um
certificado, agrupa uma chave pública e alguns metadados sobre a entidade
proprietária da chave. No entanto, os clientes não interpretam CSRs. Essa função cabe às CAs. Quando você precisa que
uma CA confirme sua chave pública do servidor da Web, envia uma CSR para a CA. A
CA valida as informações da CSR e as usa para gerar um certificado.
Em seguida, ela envia o certificado, você instala esse certificado (ou, mais provavelmente,
uma cadeia de certificados) e a sua chave privada no servidor web.


{# wf_devsite_translation #}
