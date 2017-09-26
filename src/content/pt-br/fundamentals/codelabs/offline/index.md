project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como integrar um service worker a um aplicativo existente para que o aplicativo funcione off-line.

{# wf_auto_generated #}
{# wf_updated_on: 2016-11-09T18:31:19Z #}
{# wf_published_on: 2016-01-01 #}


# Adicionar um Service Worker e Off-line ao seu App da Web {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



Visão geral do ## 



![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

Neste codelab, você aprenderá a integrar um service worker a um aplicativo existente para que o aplicativo funcione off-line. O aplicativo se chama  [Air Horner](https://airhorner.com). Clique na buzina e ela faz um som.

#### O que você aprenderá

* Como adicionar um service worker básico a um projeto existente
* Como simular o modo off-line e inspecionar e depurar um service worker com Chrome DevTools.
* Uma estratégia simples para o armazenamento em cache off-line.

#### O que será necessário

* Chrome 52 ou superior.
* Conhecimentos básicos sobre [Promises](/web/fundamentals/getting-started/primers/promises), Git e Chrome DevTools.
* O exemplo de código.
* Um editor de texto.
* Um servidor da Web local. Se deseja usar o servidor de Web descrito neste codelab, você precisa do Python instalado em sua linha de comando.


## Obtenha o exemplo de código



Clone o repositório do GitHub pela linha de comando sobre SSH:

    $ git clone git@github.com:GoogleChrome/airhorn.git

Ou HTTPS:

    $ git clone https://github.com/GoogleChrome/airhorn.git


## Execute o exemplo de aplicativo



Primeiro, vejamos qual a aparência do aplicativo de exemplo acabado (dica: é incrível). 

Certifique-se de que você esteja na ramificação correta (final), verificando a ramificação `master`.

    $ git checkout master

Execute o site a partir de um servidor de Web local.  Você pode usar qualquer servidor de Web, mas pelo resto deste codelab vamos supor que esteja usando `SimpleHTTPServer` do Python na porta 3000, portanto o aplicativo estará disponível em `localhost:3000`.

    $ cd app
    $ python -m SimpleHTTPServer 3000

Abra o site no Chrome. Você deve ver: ![9246b0abd8d860da.png](img/9246b0abd8d860da.png)


## Teste o aplicativo



Clique na buzina. Ela deve fazer um som.

Agora, você vai simular ficar off-line usando Chrome DevTools.

Abra o DevTools, vá ao painel __Application__, e ative a caixa de seleção __Offline__. Na imagem abaixo, o cursor está parado sobre a caixa de seleção. 

![479219dc5f6ea4eb.png](img/479219dc5f6ea4eb.png)

Após clicar na caixa de seleção, observe o ícone de aviso (triângulo amarelo com ponto de exclamação) ao lado da guia __Network__ do painel. Isto indica que você está off-line. 

Para provar que você está off-line, vá para [https://google.com](https://google.com). Você deve ver a mensagem de erro "não há conexão com a Internet" do Chrome. 

Agora, volte para o seu aplicativo. Embora esteja off-line, a página ainda deve atualizar totalmente. Você ainda deve conseguir usar a buzina.

O motivo para ele funcionar off-line é a base deste codelab: suporte off-line com o service worker.


## Compile o aplicativo inicial



Agora você vai remover todo o suporte off-line do aplicativo e vai aprender como usar um service worker para adicionar o suporte off-line de volta ao aplicativo

Confira a versão "quebrada" do aplicativo que não tem o service worker implementado.

    $ git checkout code-lab

Volte ao painel __Application__ do DevTools e desative a caixa de seleção __Offline__, para voltar a ficar online.

Execute a página. O aplicativo deve funcionar da forma esperada.

Agora, use DevTools para simular o modo off-line novamente (ativando a caixa de seleção  __Offline__ no painel __Application__). __Atenção!__ Se não sabe muito sobre service workers, você está prestes a ver um comportamento inesperado.

O que você espera ver? Bem, como está off-line e esta versão do aplicativo não tem service worker, seria de esperar ver a mensagem de erro "não há conexão com a Internet" típica do Chrome.

Mas o que você realmente vê é ... um aplicativo off-line totalmente funcional!

![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

O que aconteceu? Bem, lembre-se de que ao começar este codelab, você experimentou a versão concluída do aplicativo. Quando aquela versão foi executada, o aplicativo realmente instalou um service worker. Esse service worker agora está sendo executado automaticamente toda vez que você executa o aplicativo. Uma vez que um service worker é instalado para um escopo, como `localhost:3000` (você vai aprender mais sobre escopo na próxima seção), esse service worker é iniciado automaticamente toda vez que se acessa o escopo, a menos que você o exclua programática ou manualmente. 

Para corrigir isso, vá para o painel __Application__ do DevTools, clique na guia __Service Workers__ e, em seguida, clique no botão __Unregister__. Na imagem abaixo, o cursor está parado sobre o botão. 

![837b46360756810a.png](img/837b46360756810a.png)

Agora, antes de atualizar o site, certifique-se de que você ainda está usando DevTools para simular o modo off-line. Atualize a página, e ela deve exibir a mensagem de erro "não há conexão com a Internet", como esperado.

![da11a350ed38ad2e.png](img/da11a350ed38ad2e.png)


## Registre um service worker no site



Agora é hora de adicionar suporte off-line de volta ao aplicativo. Isso consiste em dois passos:

1. Crie um arquivo JavaScript que será o service worker.
2. Instrua o navegador a registrar o arquivo JavaScript como o "service worker".

Primeiro, crie um arquivo vazio chamado `sw.js` e coloque-o na pasta `/app`. 

Agora, abra `index.html` e adicione o código a seguir na parte inferior de `<body>`.

```
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

O script verifica se o navegador suporta service workers. Se suportar, ele registra o nosso arquivo `sw.js` atualmente em branco como o service worker, e, em seguida, registra para o console.

Antes de executar seu site novamente, volte para DevTools e olhe a guia __Service Workers__ do painel __Application__. Ela deve ser atualmente vazia, o que significa que o site não tem service workers instalados. 

![37d374c4b51d273.png](img/37d374c4b51d273.png)

Certifique-se de que a caixa de seleção __Offline__ no DevTools esteja desativada. Atualize sua página novamente. Como a página é carregada, você pode ver que um service worker está registrado.

![b9af9805d4535bd3.png](img/b9af9805d4535bd3.png)

Ao lado do rótulo __Source__, você pode ver um link para o código-fonte do service worker registrado. 

![3519a5068bc773ea.png](img/3519a5068bc773ea.png)

Se quiser inspecionar o service worker atualmente instalado para uma página, clique no link. Isso vai exibir o código-fonte do service worker no painel __Sources__ do DevTools. Por exemplo, clique no link agora, e você deve ver um arquivo vazio. 

![dbc14cbb8ca35312.png](img/dbc14cbb8ca35312.png)


## Instale os ativos do site



Com o service worker registrado, na primeira vez que um usuário acessar a página, um evento `install` é acionado. Este evento é o local onde você deseja armazenar em cache os ativos da sua página.

Adicione o código a seguir ao sw.js.

```
importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
```

A primeira linha adiciona o Cache polyfill. Este polyfill já está incluído no repositório. Precisamos usar o polyfill porque a API Cache ainda não é totalmente suportada em todos os navegadores. Em seguida, vem o ouvinte de evento `install`. O ouvinte de evento `install` abre o objeto `caches` e, em seguida, o preenche com a lista de recursos que queremos armazenar em cache. Uma coisa importante sobre a operação `addAll` é que ela é tudo ou nada. Se um dos arquivos não estiver presente ou não for buscado, toda a operação `addAll` falha. Um bom aplicativo cuidará desse cenário.

O próximo passo é programar nosso service worker para retornar a interceptação das solicitações de qualquer um desses recursos e usar o objeto `caches` para retornar a versão armazenada localmente de cada recurso.


## Intercepte as solicitações da página da Web



Um recurso poderoso dos service workers é que, uma vez que um service worker controla uma página, ele pode interceptar todas as solicitações que a página faz e decidir o que fazer com a solicitação. Nesta seção você vai programar o service worker para interceptar solicitações e retornar as versões em cache de ativos, em vez de ir para a rede para recuperá-los.

A primeira etapa é anexar um gerenciador de eventos ao evento `fetch`. Esse evento é acionado para todas as solicitações realizadas.

Adicione o código a seguir ao à parte inferior do seu `sw.js` para registrar as solicitações feitas a partir da página principal.

Vamos testar isso. __Atenção!__ Você está prestes a ver mais algum comportamento inesperado do service worker. 

Abra DevTools e vá para o painel __Application__. A caixa de seleção __Offline__ deve estar desativada. Pressione a tecla `Esc` para abrir a gaveta __Console__ na parte inferior da sua janela DevTools. Sua janela DevTools deve ser semelhante à imagem a seguir:

![c96de824be6852d7.png](img/c96de824be6852d7.png)

Atualize sua página agora e veja a janela de DevTools novamente. Para começar, esperamos ver várias solicitações registradas no Console, mas isso não está acontecendo. Em segundo lugar, no painel __Service Worker__ podemos ver que o __Status__ mudou:

![c7cfb6099e79d5aa.png](img/c7cfb6099e79d5aa.png)

No __Status__ há um novo service worker esperando para ativar. Este deve ser o novo service worker que inclui as alterações que acabamos de fazer. Então, por algum motivo, o antigo service worker que instalamos (que era apenas um arquivo em branco) ainda está controlando a página. Se clicar no link `sw.js` ao lado de __Source__ você pode verificar que o antigo service worker ainda está em execução. 

Para corrigir esse inconveniente, ative a caixa de seleção __Update on reload__.

![26f2ae9a805bc69b.png](img/26f2ae9a805bc69b.png)

Quando esta caixa de seleção está ativada, DevTools sempre atualiza o service worker a cada atualização da página. Isso é muito útil ao se desenvolver um service worker ativamente.

Atualize a página agora e você pode ver que um novo service worker está instalado e que os URLs de solicitação estão sendo registrados no Console, como esperado.

![53c23650b131143a.png](img/53c23650b131143a.png)

Agora você precisa decidir o que fazer com todas essas solicitações. Por padrão, se você não fizer nada, a solicitação é transmitida para a rede e a resposta é retornada para a página da Web.

Para que seu aplicativo funcione off-line, você precisa coletar a solicitação do cache se ela estiver disponível.

Atualize seu ouvinte de evento de busca para coincidir com o código abaixo.

O método `event.respondWith()` informa ao navegador para avaliar o resultado do evento no futuro. `caches.match(event.request)` leva a atual solicitação da web que ativou o evento de busca e procura no cache por um recurso que corresponda. A correspondência é realizada verificando a string do URL. O método `match` retorna uma promessa que resolve, mesmo se o arquivo não for encontrado no cache. Isso significa que você tem uma escolha sobre o que fazer. Em nosso caso simples, quando o arquivo não é encontrado, você deve `fetch` o mesmo da rede e retorná-lo ao navegador.

Este é o caso mais simples; existem muitos outros cenários de armazenamento em cache. Por exemplo, é possível armazenar em cache de forma incremental todas as respostas de solicitações que anteriormente não estavam armazenadas para que, no futuro, todas sejam retornadas do cache. 


## Parabéns!



Agora você tem suporte off-line. Atualize a página enquanto ainda está online para atualizar o service worker para a última versão, e depois use DevTools para entrar em modo off-line. Atualizar a página novamente, e você deve ter uma buzina de ar off-line totalmente funcional!

#### Tópicos abordados

* Como adicionar um service worker básico a um projeto existente
* Como usar Chrome DevTools para simular o modo off-line e para inspecionar e depurar service workers.
* Uma estratégia simples para o armazenamento em cache off-line.

#### Próximas etapas

* Saiba como adicionar facilmente  [suporte off-line com elementos Polymer off-line](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0) robusto
* Explore mais [técnicas avançadas de armazenamento em cache](https://jakearchibald.com/2014/offline-cookbook/)

#### Saiba mais

*  [Introdução ao service worker](/web/fundamentals/primers/service-worker/?hl=en)





## Encontrou um problema ou tem feedback? {: .hide-from-toc }
Ajude-nos a melhorar nossos codelabs reportando um 
[problema](https://github.com/googlesamples/io2015-codelabs/issues) hoje. E obrigado!

{# wf_devsite_translation #}
