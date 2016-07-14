---
title: "Turn On Strict Transport Security And Secure Cookies"
updated_on: 2015-03-27
key-takeaways:
  - Você precisa usar HSTS (HTTP Strict Transport Security) para evitar o custo do redirecionamento 301.
  - Verifique se você sempre define o sinalizador Seguro nos cookies.
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

Neste ponto, você está pronto para “bloquear" o uso do HTTPS. Primeiro, use [Strict
Transport
Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) para avisar os
clientes de que eles devem sempre se conectar ao seu servidor via HTTPS, mesmo ao
seguir uma referência http://. Isso evita ataques como [Retirada
SSL](http://www.thoughtcrime.org/software/sslstrip/) e também evita o
custo da viagem de ida e volta do redirecionamento 301 que habilitamos em “Redirecionar HTTP para HTTPS".

**OBSERVAÇÃO:** os clientes que tiverem marcado seu site como um Host HSTS conhecido provavelmente terão uma
_[falha grave](https://tools.ietf.org/html/rfc6797#section-12.1)_[ se o seu
](https://tools.ietf.org/html/rfc6797#section-12.1)[site tiver um erro em
sua configuração TLS](https://tools.ietf.org/html/rfc6797#section-12.1) (como
um certificado expirado). Essa é uma escolha de projeto expecífica do HSTS; ajuda
a garantir que os invasores de rede não possam enganar os clientes para acessar o
site sem HTTPS. Não habilite o HSTS até que você tenha certeza de que a operação do seu site
esteja forte o suficiente para evitar a implantação do HTTPS com erros
de validação do certificado.

Ative o HSTS (HTTP Strict Transport Security) definindo o cabeçalho
Strict-Transport-Security. [A página HSTS do OWASP tem links para
instruções](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
para vários softwares de servidor.

A maioria dos servidores da Web oferecem uma capacidade semelhante para adicionar cabeçalhos personalizados.

**OBSERVAÇÃO:** a idade máxima é medida em segundos. Você pode começar com valores baixos e
aumentar gradualmente a idade máxima conforme se familiariza com a operação de um
site somente em HTTPS.

Também é importante garantir que os clientes nunca enviem cookies (para
autenticação ou preferências do site) por HTTP. Por exemplo, se um cookie
de autenticação do usuário for ser exposto em texto não encriptado, a garantia de segurança de
toda sessão seria destruída — mesmo se você tiver feito todo o resto
corretamente!

Portanto, altere seu aplicativo da Web para sempre definir o sinalizador Seguro nos cookies
que ele define. [Esta página OWASP explica como definir o sinalizador
Seguro](https://www.owasp.org/index.php/SecureFlag) em várias estruturas de
aplicativo. Cada estrutura de aplicativo tem uma forma de definir o sinalizador.

