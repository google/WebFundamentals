---
title: "Migration Concerns"
updated_on: 2015-03-27
---

Esta seção discute preocupações que os operadores podem ter sobre a migração para HTTPS.

{% include shared/toc.liquid %}

## Classificação de Busca

[O Google está usando HTTPS como um indicador positivo de qualidade de 
pesquisa](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
O Google também publica um guia sobre [como transferir, mover ou migrar seu
site](https://support.google.com/webmasters/topic/6029673) enquanto mantém sua
classificação de pesquisa. O Bing também publica [orientações para
webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

## Desempenho

Quando as camadas de conteúdo e aplicativo estão bem ajustadas (consulte os [livros de
Steve Souders](https://stevesouders.com/) para obter ótimas dicas), as demais preocupações de desempenho do
TLS são geralmente pequenas em relação ao custo geral do
aplicativo. Além disso, você pode reduzir e amortizar os custos. (Para receber boas
dicas sobre a otimização e generalização do TLS, consulte _[Rede
do Navegador de Alto Desempenho](http://chimera.labs.oreilly.com/books/1230000000545)_[ por Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).) Veja também o
_[OpenSSL
Cookbook] de Ivan Ristic(https://www.feistyduck.com/books/openssl-cookbook/)_ e _[Bulletproof
SSL e TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_.

Em alguns casos, o TLS pode _melhorar_ o desempenho, principalmente como resultado da criação do
HTTP/2 possível. Chris Palmer deu [uma palestra sobre o desempenho do HTTPS e HTTP/2 no Chrome Dev
Summit 2014]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things).

## Cabeçalhos de Referência

Os agentes do usuário não enviarão o cabeçalho de Referência quando os usuários seguem links do seu
site HTTPS para outros sites HTTP. Se isso for um problema, há várias formas de
resolver:

* Os outros sites devem migrar para HTTPS. Esse guia pode ser bastante
 útil! :) Se os sites de referência podem concluir a seção “Habilitar HTTPS em seus servidores" deste guia, você pode alterar
 links no seu site de http:// para https://, ou pode usar
 links relacionados ao protocolo.
* Você pode usar o novo [padrão da
 Política de Referência](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
 para resolver uma série de problemas com cabeçalhos de Referência.

Como os mecanismos de pesquisa estão migrando para HTTPS, você provavelmente verá _mais_ cabeçalhos
de referência ao migrar para HTTPS do que vê agora.

<blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Os clientes NÃO DEVEM incluir um campo do cabeçalho de referência em uma solicitação HTTP (não segura) se a página de referência foi transferida com um protocolo seguro.<p><a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">De acordo com o RFC HTTP</a></p></blockquote>

## Receita com Anúncios

Os operadores de site que lucram com seu site mostrando anúncios querem garantir que
migrar para HTTPS não irá reduzir as impressões dos anúncios. Mas, devido a preocupações de segurança
de conteúdo misto, um iframe HTTP não funcionará em uma página HTTPS. Há um
problema de ação coletiva difícil aqui: até que os anunciantes publiquem por HTTPS,
os operadores do site não podem migrar para HTTPS sem perder receita com anúncios; mas até que os operadores do
site migrem para HTTPS, os anunciantes não terão muita motivação para publicar HTTPS.

Os anunciantes devem pelo menos oferecer o serviço de anúncio via HTTPS (como por exemplo, concluindo o
“Habilitar HTTPS em seus servidores”, incluso neste guia). Muitos já fazem isso. Você deve pedir aos anunciantes que não
disponibilizam HTTPS, que ao menos começem. Talvez seja uma boa ideia adiar a conclusão de “Relacionar URLs entre sites” apresentada neste
guia até que um número suficiente de anunciantes comecem a operem corretamente.

