project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Há dois servidores envolvidos no envio de uma mensagem: o seu e o servidor de mensagens de um terceiro. Você controla a quem envia as mensagens. O servidor do terceiro lida com o roteamento.


{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# Enviando mensagens {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Na prática, dois servidores estão envolvidos no envio de uma mensagem: o seu
e o servidor de mensagens de um terceiro. Você controla duas coisas:
os destinatários e os pontos de extremidade específicos dos destinatários no servidor de mensagens. O
servidor de mensagens gerencia o roteamento.

## O panorama geral {: #the-broader-context }

Vimos como se inscrever em push dentro de um aplicativo web. Esse processo
incluía passar uma chave pública, chamada `applicationServerKey`, à
API de inscrição.

O diagrama abaixo mostra a ordem das operações.

![Como enviar uma mensagem](images/push-flow.gif)

1. Um dispositivo baixa o seu aplicativo web que contém uma publicKey já criada,
   cuja referência está nos scripts como `applicationServerKey`. O aplicativo web instala
   um service worker.
1. Durante o fluxo de inscrição, o navegador contata o servidor de mensagens para
   criar uma nova inscrição e retorna-a para o aplicativo.

    <aside class="note"><b>Observação:</b> você não precisa saber o URL do servidor de mensagens. Cada fornecedor de navegador gerencia um servidor de mensagens próprio para o seu navegador.</aside>

1. Depois do fluxo de inscrição, o aplicativo passa um objeto "subscription" de volta
   ao servidor do aplicativo.
1. Em algum momento depois disso, o servidor do aplicativo envia uma mensagem ao servidor
   de mensagens, que a encaminha ao destinatário.

## Como gerar a applicationServerKey {: #generating-the-key }

Há diversas coisas que você precisa saber sobre a `applicationServerKey`:

* É a parte da chave pública de um par de chaves pública/privada gerado no
  servidor do seu aplicativo.
* O par de chaves deve ser utilizado com uma assinatura digital em curvas elípticas
  (ECDSA, na sigla em inglês) com base na curva P-256.
* Seu aplicativo deve passar a chave pública para o servidor de mensagens como uma matriz de
  números inteiros não assinados de oito bits.
* Ela está definida em uma especificação chamada Identificação Voluntária de Servidor de Aplicativo
  para Push na Web (VAPID, na sigla em inglês), que abordaremos na seção [Enviando mensagens](sending-messages).

Veja um exemplo de como gerar essa chave na
[biblioteca de nós de push web](https://github.com/web-push-libs/web-push/). O código
fica mais ou menos assim:


    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


## Anatomia de um objeto de assinatura {: #subscription-anatomy }

Antes, dissemos que um objeto de inscrição deve ser destrinchado em string e passado ao
servidor, mas não mostramos o que estava dentro do objeto de inscrição. Isso
porque o cliente não faz nada com ele. Só o servidor que faz.  

O objeto de inscrição é mais ou menos assim:  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


O que tem nisso?  

**endpoint** — contém duas partes: o URL do serviço de envio de mensagens usado pelo
navegador inscrito seguido de um identificador exclusivo do usuário.

**keys** — chaves de criptografia usadas para criptografar dados passados às mensagens
do service worker. O conteúdo é o seguinte:

* **auth** — um segredo de autenticação de 16 bytes gerado pelo navegador.
* **p256dh** — 65 bytes que contêm uma chave pública do navegador
  que os desenvolvedores precisam usar para criptografar mensagens que querem enviar a esse
  serviço de push.

Observação: em muitas das especificações relevantes, os bytes são chamados de octetos. O termo é usado por causa dos sistemas herdados e dos sistemas de comunicação, em que os bytes podem não ter 8 bits de tamanho.

## Como criar a mensagem {: #creating-the-message }

É nesse ponto que as coisas começam a ficar um pouco loucas. Nesta seção, não estamos
mais no seu aplicativo-cliente. Estamos no servidor do aplicativo, onde vamos criar
e enviar uma mensagem ao cliente. Tem muita coisa para controlar aqui.

Antes de continuarmos, vamos rever o que temos e a origem do que temos.

* **Objeto de inscrição** — veio do cliente. Ele contém o ponto de extremidade
  do servidor de mensagens, uma cópia da chave pública e um segredo
  de autenticação gerado pelo cliente. Daqui em diante, vamos parar de falar sobre
  o objeto de inscrição e só nos referir a **ponto de extremidade**, **chave
  pública** e **segredo de autenticação**.
* **Chave privada** — a chave privada VAPID correspondente à chave pública VAPID.
  Essa é uma chave privada do servidor do seu aplicativo.

Vamos dividir a análise da criação da mensagem em três partes. Primeiro, criaremos alguns
cabeçalhos HTTP, criaremos uma carga útil para a mensagem e, por fim,
combinaremos ambos e os enviaremos ao servidor de mensagens.

### Uma observação sobre os exemplos de código {: #a-note-about-samples }

Os exemplos de código desta seção, que foram extraídos da [biblioteca de nós
do push web](https://github.com/web-push-libs/web-push).

### O produto {: #the-product }

Vamos dar uma olhada no resultado final do que estamos fazendo e, depois, vamos mostrar como
chegar até ele.

<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization: WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

Observe que essa solicitação é enviada ao ponto d extremidade que está dentro do objeto
de inscrição. Os cabeçalhos "Authorization", "Crypto-Key" e "TTL" merecem uma breve
explicação. Vamos começar pelo mais simples

## Cabeçalhos HTTP {: #http-headers }

### TTL {: #ttl }

Pode haver algum hiato de tempo antes de o servidor de mensagens conseguir entregar uma mensagem enviada pelo
servidor do aplicativo. Os serviços de mensagem não são obrigados a armazenar uma mensagem para sempre.
Francamente, para ser preciso em termos de tempo, um servidor de aplicativo nunca deve enviar uma mensagem que possa
ficar lá para sempre. É por isso que é necessário incluir um cabeçalho chamado TLL, que significa
"time to live" (tempo para existir).

O cabeçalho TTL é um valor em segundos dado como sugestão ao servidor
de mensagens que representa quanto tempo o servidor deve manter a mensagem armazenada e tentar
entregá-la. Se quiser, o servidor de mensagens pode encurtar o tempo pelo qual está disposto a manter
a mensagem. E, se fizer isso, ele deve retornar esse tempo encurtado de um cabeçalho TTL em
uma resposta à solicitação de mensagem. Se o TTL tiver o valor de 0, o servidor de mensagens
deve entregar a mensagem imediatamente se o user-agent estiver disponível. Se o user-agent
não estiver disponível, a mensagem expirará imediatamente e nunca será entregue.

### Cabeçalho "Crypto-Key" {: #crypto-key-header }

Para validar uma mensagem enviada pelo servidor do seu aplicativo, o servidor de mensagens precisa de uma
chave pública. É no cabeçalho "Crypto-Key" que se envia a chave pública. Esse cabeçalho
tem diversas partes.  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

Por exemplo:  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

A primeira (`dh=publicKey`) é a chave pública, aquela que criamos em
"Solicitando permissões e inscrevendo usuários". A segunda parte
(`p256ecdsa=applicationServerKey`) é a chave pública criada pelo servidor do seu aplicativo.
Ambas devem ter URL codificado em base64. Observe a  vírgula que separa as duas partes do Crypto-Key.

Observação: um bug no Chrome 52 exige que se use um sinal de ponto e vírgula para separar as partes do Crypto-Key, e não vírgula.

### Cabeçalho "Authorization" {: #authorization-header }

Para enviar mensagens, você precisa de um cabeçalho "Authorization". Ele contém quatro partes:  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

A palavra WebPush é um valor literal que deve ser seguido de um espaço. As demais
partes, que são criptografadas e concatenadas por meio de um ponto para formar um token web
JSON assinado (JWT). Um JWT é uma forma de compartilhar um objeto JSON com um intermediário,
de forma que a parte remetente possa assiná-lo e o destinatário possa verificar
se a assinatura é do remetente esperado.   

Vamos ver em detalhe cada parte do token.

#### Cabeçalho "JWT" {: #jwt-header }

O Cabeçalho "JWT" contém duas informações padrão: uma propriedade `typ` para
indicar o tipo de mensagem, nesse caso, uma mensagem JWT, e uma propriedade `alg`
para indicar o algoritmo usado para assinar a mensagem.
Esses detalhes devem ter URL codificado em base64.


    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


#### Carga útil do JWT {: #jwt-payload }

O JWT chama esta seção de carga útil. E não é aqui que a carga útil da mensagem
é armazenada. Vamos chegar nesse ponto em breve. A carga útil é outro objeto JSON com os seguintes
membros:    
**aud**  
Contém a origem do ponto de extremidade do serviço de push, que você deve extrair
do objeto de inscrição. Essa não é a origem do seu site.    
**exp**  
Especifica o tempo de expiração da solicitação de JWT em milissegundos (não a expiração
da mensagem). Ele deve estar dentro de 24 horas. Esse valor pode ser
calculado pela conversão da data atual em milissegundos e a adição da duração.
Por exemplo, no Node.js, você poderia fazer o seguinte:


    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
Especifica um assunto, que a especificação VAPID define como uma forma de o serviço de push
contatar o remetente de uma mensagem. Esse valor pode ser um URL ou um endereço de e-mail de destino (veja o exemplo
abaixo).  

Uma carga útil de JWT completa fica mais ou menos assim:


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


#### Assinatura {: #signature }

A assinatura é a última parte do JWT.

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Crie a assinatura concatenando o cabeçalho JWT e a carga útil com
um ponto. Por exemplo:

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>

Criptografe essa concatenação usando a chave privada que criou em
[Como gerar a applicationServerKey](#generating-the-key).

Agora você tem três partes que formam o JWT, e você junta tudo isso
com um ponto.

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

Não vamos mostrar como fazer a criptografia da assinatura, mas existem
várias bibliotecas disponíveis. É uma boa ideia dar uma olhada na seção de bibliotecas em
[jwt.io](https://jwt.io/){: .external }.

Por fim, coloque a palavra "WebPush" no início seguida de um espaço. O resultado é
algo parecido com o seguinte:

<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

### Carga útil da mensagem {: #message-payload }

Ao implementar o código do servidor, existem dois métodos de envio de mensagens a serem
considerados.

* Mensagens com uma carga útil de dados.
* Mensagens sem uma carga útil de dados, frequentemente chamadas de convite.

No caso do convite, o service worker usa a mensagem como um sinal para
recuperar dados de um ponto de extremidade. A seção "Gerenciar mensagens" contém exemplos de código
que mostram como um service worker faz isso.

Por que enviar uma mensagem sem uma carga útil? Há dois motivos.

* Você precisa enviar algo com uma carga útil maior do que o limite de 4.000 definido pelas especificações.
* Os clientes precisam de dados mais atualizados do que os disponibilizados no push.

Tecnicamente, existe outro motivo: os recursos dos navegadores podem variar
por algum tempo. No entanto, os dois motivos principais provavelmente sempre serão aplicáveis. Se o
navegador não oferecer suporte a cargas úteis, o objeto de assinatura não conterá chaves.

A carga útil, independentemente da forma com que você a leva ao cliente, deve ser criptografada.
A criptografia não é uma especialidade, mesmo dentro do desenvolvimento de softwares, em que
não recomendamos escrever seu próprio sistema de criptografia. Felizmente, existem
diversas bibliotecas de push disponíveis.

Para cargas úteis enviadas pelo servidor de mensagem, você deve criptografar usando a
publicKey e o segredo de autenticação. Não se esqueça de usar também 16
bytes aleatórios que sejam exclusivos da mensagem. E, para finalizar, adicione-a ao corpo da
solicitação enviada ao servidor de mensagens.

### Colocando a mensagem para seguir o seu caminho {: #sending-it-on-its-way }

Na biblioteca de nós de web push, isso pode ser feito com uma instância do
objeto de solicitação da biblioteca https integrada.


    const https = require('https');


Em algum ponto, a solicitação é enviada ao servidor de mensagens. A biblioteca de nós
de web push encapsula esse código em uma promessa (com chamadas apropriadas para cumprir
e rejeitar) para que isso possa acontecer de forma assíncrona. O exemplo de código abaixo, extraído da
[biblioteca de nós de push web](https://github.com/web-push-libs/web-push)
demonstra isso.

Observe que o servidor de mensagens responde à solicitação da rede imediatamente,
o que significa que enviar a mensagem ao aplicativo-cliente é um processo assíncrono.


    const pushRequest = https.request(options, function(pushResponse) {  
      let body = '';    
      // Allow the payload to be sent out in chunks.  
      pushResponse.on('data', function(chunk) {  
        body += chunk;  
      });    
      // Check to see if the push is successful.  
      pushResponse.on('end', function() {  
        if (pushResponse.statusCode !== 201) {  
          reject(new WebPushError('Received unexpected response code',  
            pushResponse.statusCode, pushResponse.headers, body));  
        } else {  
          // Do something with the response body.  
        }  
     });  
    });  

    if (requestPayload) {  
      pushRequest.write(requestPayload);  
    }  

    pushRequest.end();  

    pushRequest.on('error', function(e) {  
      console.error(e);  
    });


{# wf_devsite_translation #}
