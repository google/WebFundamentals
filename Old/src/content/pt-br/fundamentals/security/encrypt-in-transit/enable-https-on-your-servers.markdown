---
title: "Enable HTTPS On Your Servers"
description: "Você está pronto para todas as etapas importantes da habilitação do HTTPS em seus servidores."
updated_on: 2015-03-27
key-takeaways:
  - Use a ferramenta Configuração de Servidor do Mozilla para definir seu servidor para suporte HTTPS.
  - Teste seu site regularmente com o prático Teste do Servidor SSL da Qualys e garanta pelo menos um A ou A+.
---

<p class="intro">
  Você está pronto para todas as etapas importantes da habilitação do HTTPS em seus servidores.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

Nesta etapa, você deve tomar uma decisão de operação fundamental:

* dedicar um endereço IP exclusivo para cada hostname que seu servidor da Web fornece conteúdo
; ou
* usar uma hospedagem virtual baseada em nome.

Se você estiver usando endereços IP diferentes para cada hostname, ótimo! Você 
suporta facilmente HTTP e HTTPS para todos os clientes.

No entanto, a maioria dos operadores de site usam hospedagem virtual baseada em nome para conservar endereços
IP porque é geralmente mais conveniente. O problema com o IE no
Windows XP e Android anterior ao 2.3 é que eles não compreendem a [Indicação
de Nome de Servidor](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI),
que é fundamental para a hospedagem virtual baseada em nome HTTPS.

Algum dia — esperamos que em breve — todos os clientes que não suportam SNI serão substituídos
por um software moderno. Monitore a cadeia de caracteres do agente do usuário nos seus logs de solicitação para saber
quando um número suficiente da população de usuários migrou para o software moderno. (Você pode
decidir qual é seu limite; talvez &lt; 5%, &lt; 1% ou algo parecido.)

Se você ainda não tem o serviço HTTPS disponível em seus servidores, habilite-o agora
(sem redirecionar HTTP para HTTPS; veja abaixo). Configure seu servidor da Web para usar
os certificados comprados e instalados. Você pode achar o [prático gerador de
configurações
do Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
útil.

Se você tem muitos hostnames/subdomínios, cada um deles precisará usar o certificado
correto.

**OBSERVAÇÃO:** muitos operadores de site já concluíram as etapas que abordamos, mas estão
usando HTTPS apenas para fins de redirecionamento de clientes de volta para HTTP. Se você
estiver fazendo isso, pare agora mesmo. Veja a próxima seção para garantir que HTTPS e HTTP
funcionem corretamente.

**OBSERVAÇÃO:** por fim, você deve redirecionar solicitações HTTP para HTTPS e usar HSTS (Segurança de
Transporte Restrita HTTP). Esta não é a etapa correta no processo de migração para fazer
isso; veja “Redirecionar HTTP para HTTPS" e “Ativar a Segurança de Transporte Restrita e Cookies Seguros".

Agora, e durante o tempo de duração do seu site, verifique sua configuração HTTPS com o
[prático Teste do Servidor SSL da Qualys](https://www.ssllabs.com/ssltest/). Seu site
deve obter A ou A+; trate tudo que causa notas menores como erro.
(O A de hoje é o B de amanhã, porque os ataques contra algoritmos e protocolos
sempre melhoram!)

