project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ao migrar para HTTPS, um dos obstáculos que os operadores de site enfrentam é conceitual: O que está acontecendo exatamente? O que toda terminologia de criptografia significa? Nesta seção, daremos uma breve visão geral.

{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2015-03-27 #}

# Intro to Security Terminology {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}



Ao migrar para HTTPS, um dos obstáculos que os operadores de site enfrentam é conceitual: O que está acontecendo exatamente? O que toda terminologia de criptografia significa? Nesta seção, daremos uma breve visão geral.

### TL;DR {: .hide-from-toc }
- Chaves públicas/privadas são usadas para assinar e criptografar mensagens entre o navegador e o servidor
- Uma autoridade de certificado (CA) é uma organização que confirma o mapeamento entre as chaves públicas e os nomes DNS públicos (como 'www.foobar.com')
- Uma solicitação de assinatura de certificado (CSR) é um formato de dados que agrupa uma chave pública com alguns metadados sobre a entidade que possui a chave



## Quais são os pares de chaves pública e privada?

Um **par de chaves pública/privada** é um par de números muito grandes que pode ser usado
como chaves de criptografia e que compartilham uma relação matemática
especial. Um sistema comum para pares de chave é o **[sistema criptográfico
RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))**. A **chave
pública** é usada para criptografar mensagens e as mensagens podem apenas ser criptografadas
adequadamente com a **chave privada** correspondente. Seu servidor da Web divulgará
sua chave pública e os clientes (como navegadores da Web) usarão isso para
inicializar um canal seguro para o seu servidor.

## O que é uma Autoridade de Certificado?

Uma **autoridade de certificação (CA)** é uma organização que confirma o
mapeamento entre chaves públicas e nomes DNS públicos (como "www.foobar.com").
Por exemplo, como um cliente sabe se uma determinada chave pública é a chave pública _verdadeira_
para www.foobar.com? A priori, não há forma de saber. Uma CA confirma
 uma chave particular como sendo verdadeira para um determinado site usando sua
própria chave privada para **[assinar
criptograficamente](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Assinando_mensagens)** a
chave pública do site da Web. Essa assinatura é praticamente impossível de falsificar.
Os navegadores (e outros clientes) mantêm **repositórios de ancoragem confiáveis** contendo as
chaves públicas pertencentes às CAs conhecidas e usam essas chaves públicas para
**verificar criptograficamente** as assinaturas das CA.

Um **certificado X.509** é um formato de dados que agrupa uma chave pública
com alguns metadados sobre a entidade que possui a chave. No caso da Web,
o proprietário da chave é o operador do site e o metadado importante é o nome DNS
do servidor da Web. Quando um cliente se conecta a um servidor da Web HTTPS, o servidor da
Web representa seu certificado para o cliente verificar. O cliente verifica
se o certificado não expirou, se o nome DNS corresponde ao nome do
servidor no qual o cliente está tentando se conectar e se uma CA âncora confiável
assinou o certificado. Na maioria dos casos, as CAs não assinam diretamente certificados do servidor da
Web; geralmente, há uma **cadeia de certificados** vinculando uma âncora
confiável a um assinante ou assinantes intermediários e, por fim, para o próprio certificado do
servidor da Web (a **entidade final**).

## O que é uma Solicitação de Assinatura de Certificado?

Uma **solicitação de assinatura de certificado (CSR)** é um formato de dados que, como um
certificado, agrupa uma chave pública com alguns metadados sobre a entidade
que possui a chave. No entanto, os clientes não interpretam CSRs. As CAs os interpretam. Quando você precisa que
uma CA confirme sua chave pública do servidor da Web, é possível enviar um CSR para a CA. A
CA valida a informação no CSR e a usa para gerar um certificado.
Elas enviam o certificado final a você para que o instale (ou,
provavelmente, uma cadeia de certificados) e instale sua chave privada no seu servidor da Web.

