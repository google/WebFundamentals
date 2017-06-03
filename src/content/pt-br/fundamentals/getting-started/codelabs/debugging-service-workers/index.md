project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Neste codelab, você aprenderá como depurar um service worker usando o novo painel DevTools Application. Você também aprenderá como simular uma notificação push para verificar se sua inscrição está configurada corretamente.

{# wf_updated_on: 2016-10-19T18:28:32Z #}
{# wf_published_on: 2016-01-01 #}


# Depurar Service Workers {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



##  Introdução




Service workers dão aos desenvolvedores a incrível capacidade de lidar com redes instáveis e criar apps da Web que verdadeiramente priorizam o modo off-line. Porém, ser uma tecnologia nova significa que às vezes pode ser difícil de depurar, especialmente enquanto esperamos que as nossas ferramentas se tornem compatíveis.

Este codelab orientará você na criação de um Service Worker básico e demonstrar como usar o novo painel Application no Chrome DevTools para depurar e inspecionar seu worker.

### O que vamos criar?

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

Neste codelab você vai trabalhar com um Progressive Web App extremamente simples e aprender técnicas que pode empregar em seus próprios aplicativos quando encontrar problemas.

Como este codelab é focado em ensinar ferramentas, fique à vontade para interromper em vários pontos experimentar. Brinque com o código, atualize a página, abra novas guias etc. A melhor maneira de aprender ferramentas de depuração é simplesmente quebrar as coisas e sujar as mãos corrigindo-as.

### O que você aprenderá

* Como inspecionar um Service Worker com o painel Application
* Como explorar o Cache e IndexedDB
* Como simular diferentes condições de rede
* Como usar declarações do depurador e pontos de interrupção para depurar um Service Worker
* Como simular eventos Push

### O que será necessário

* Chrome 52 ou superior
* Instale [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), ou use seu servidor de Web preferido.
* O exemplo de código
* Um editor de texto
* Conhecimentos básicos sobre HTML, CSS e JavaScript

Este codelab se concentra na depuração de Service Workers e assume alguns conhecimentos prévio de trabalho com Service Workers. Alguns conceitos são apenas pincelados ou blocos de código (como estilos ou JavaScript não relevante) são fornecidos para que você os copie e cole. Se você é novo em Service Workers, certifique-se de [ler o API Primer](/web/fundamentals/primers/service-worker/) antes de continuar.


## Configuração




### Faça o download do código

Você pode baixar todo o código para este codelab, clicando no botão a seguir:

[Link](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

Descompacte o arquivo zip baixado. Isso irá descompactar uma pasta raiz (`debugging-service-workers-master`), que contém uma pasta para cada etapa deste codelab, juntamente com todos os recursos que você vai precisar.

As pastas `step-NN` contêm o estado final desejado de cada etapa deste codelab. Elas servem como referência. Faremos todo nosso trabalho de codificação em um diretório chamado `work`.

### Instale e verifique o servidor de Web

Embora você seja livre para usar seu próprio servidor de Web, este codelab é projetado para funcionar bem com o Chrome Web Server. Se ainda não tem esse aplicativo instalado, você pode instalá-lo pela Chrome Web Store.

[Link](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Após instalar o aplicativo Web Server for Chrome, clique no atalho Apps na barra de favoritos: 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

Na janela seguinte, clique no ícone do Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Você verá esta caixa de diálogo, que lhe permite configurar seu servidor de Web local:

![433870360ad308d4.png](img/433870360ad308d4.png)

Clique no botão __choose folder__ e selecione a pasta `work`. Isto permitirá servir o seu trabalho em andamento pelo URL em destaque na caixa de diálogo do servidor de Web (na seção __Web Server URL(s)__).

Em Options, marque a caixa ao lado de "Automatically show index.html", como mostrado abaixo:

![8937a38abc57e3.png](img/8937a38abc57e3.png)

Em seguida, interrompa e reinicie o servidor, deslizando o botão de alternância marcado como "Web Server: STARTED" para a esquerda e de volta para a direita.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Agora, acesse seu site de trabalho no navegador da Web (clicando no URL Web Server em destaque) e você deve ver uma página com a seguinte aparência:

![693305d127d9fe80.png](img/693305d127d9fe80.png)

Obviamente, este aplicativo ainda não está fazendo nada interessante. Adicionaremos funcionalidade e recursos de IU em etapas posteriores. 


## Introdução à guia Application




### Inspecione o Manifesto

Construir um Progressive Web App requer juntar várias tecnologias essenciais diferentes, inclusive Service Workers e Manifestos de Aplicativos Web, bem como as tecnologias facilitadoras úteis, como a API de Armazenamento de Cache, IndexedDB e Notificações Push. Para facilitar que os desenvolvedores obtenham uma visão coordenada de cada uma dessas tecnologias o Chrome DevTools incorporou inspetores para cada um no novo painel Application.

* Abra o Chrome DevTools e clique na aba que diz __Application__.

![b380532368b4f56c.png](img/b380532368b4f56c.png)

Olhe na barra lateral e observe que __Manifest__ está destacado no momento. Esta visualização mostra informações importantes relacionadas com o arquivo `manifest.json`, como o nome do aplicativo, URL de início, ícones etc.

Embora este codelab não trate disso, observe que há um botão __Add to homescreen__ que pode ser usado para simular a experiência de adicionar o aplicativo à tela inicial do usuário.

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### Inspecione os Service Workers

No passado, inspecionar um Service Worker exigia bisbilhotar o Chrome internamente e definitivamente não era a melhor experiência de usuário. Tudo isso muda com a nova guia __Application__.

* Clique no item de menu __Service Workers__ abaixo do item __Manifest__ selecionado no momento

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

A visualização __Service Workers__ fornece informações sobre Service Workers que estão ativos na origem atual. Ao longo da linha superior, há uma série de caixas de seleção.

* __Offline__- Simula ser desconectado da rede. Isso pode ser útil para verificar rapidamente que os gerenciadores de busca do seu Service Worker estão funcionando corretamente.
* __Update on reload__ - Força o Service Worker atual a ser substituído por um novo Service Worker (se o desenvolvedor tiver feito alterações em seu `service-worker.js`). Normalmente, o navegador esperar até que um usuário feche todas as guias que contêm o site atual antes de atualizar para um novo Service Worker.
* __Bypass for network__ - Força o navegador a ignorar qualquer Service Worker ativo e buscar recursos da rede. Isso é extremamente útil para situações em que você deseja trabalhar em CSS ou JavaScript e não precisa se preocupar que Service Worker armazene em cache acidentalmente e retorne arquivos antigos.
* __Show all__ - Mostra uma lista de todos os Service Workers ativos, independentemente da origem.

Abaixo disso você verá informações relacionadas com o Service Worker ativo atual (se houver). Um dos campos mais úteis é o campo __Status__, que mostra o estado atual do Service Worker. Como esta é a primeira vez que o aplicativo é iniciado, o Service Worker atual foi instalado com êxito e ativado, portanto ele exibe um círculo verde para indicar que tudo está bem.

Observe o número de código ao lado do indicador de status verde. Esse é o código para o Service Worker ativo no momento. Lembre-se dele ou anote-o, pois o usaremos para uma comparação em um momento.

* Em seu editor de texto, abra o arquivo `service-worker.js`

O código para o Service Worker atual é bastante simples, apenas alguns de registros do console.

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

Se voltar para DevTools e olhar no Console, você pode ver que ambos os registros saíram com êxito.

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

Vamos atualizar o código para o `service-worker.js`, para vê-lo passar por uma mudança de ciclo de vida.

* Atualize os comentários em `service-worker.js` para que eles contenham novas mensagens

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* Atualize a página e abra o console em DevTools

O console registra `A *new* Service Worker is installing.`, mas não mostra a 2ª mensagem sobre o novo Service Worker estar ativo.

* Alterne para a guia Application no DevTools

Na guia Application, agora há dois indicadores de status, cada um representando o estado de nossos dois Service Workers.

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

Observe o código do primeiro Service Worker. Ele deve corresponder o código do Service Worker original. Quando você instala um novo Service Worker, o worker anterior permanece ativo até a próxima vez que o usuário visitar a página.

O segundo indicador de status mostra o novo Service Worker que acabamos de editar. Agora ele está em um estado de espera.

Uma maneira fácil de forçar o novo Service Worker a se ativar é com o botão __skipWaiting__.

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* Clique no botão skipWaiting e depois alterne para o Console

Observe que o console agora registra a mensagem do gerenciador de eventos `activate`

`Finally active. Ready to start serving content!`


## Explore o cache




Gerir o seu próprio cache de arquivos off-line com um Service Worker é um superpoder incrível. O novo painel __Application__ tem uma série de ferramentas úteis para explorar e modificar seus recursos armazenados, o que pode ser muito útil durante o desenvolvimento.

### Adicionar armazenamento em cache ao seu Service Worker

Antes de poder inspecionar o cache, você precisa escrever um pouco de código para armazenar alguns arquivos. Pré-armazenar arquivos em cache durante a fase de instalação do Service Worker é uma técnica útil para garantir que recursos cruciais estejam disponíveis para o usuário, se ele ficar off-line. Vamos começar por aí.

* Antes de atualizar o `service-worker.js`, abra o painel __Application__ no DevTools, navegue até o menu __Service Workers__, e marque a caixa que diz __Update on Reload__

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

Este truque útil forçará a página a usar o Service Worker que for o mais recente, então você não tem que clicar na opção __skipWaiting__ toda vez que quiser fazer alterações em seu Service Worker.

* Em seguida, atualize o código em `service-worker.js` para que fique assim

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
```

* Atualize a página

No painel de Application, você pode perceber que um Erro aparece. Parece assustador, mas clicar no botão __details__ revela que é apenas o painel __Application__ informando que seu Service Worker antigo foi atualizado forçosamente. Como essa era a intenção, isso é totalmente OK, mas pode servir como um alerta útil para que você não esqueça de desmarcar a caixa de seleção ao terminar de editar o arquivo `service-worker.js`.

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### Inspecione o armazenamento em cache

Observe que o item de menu __Cache Storage__ no painel __Application__ agora tem um cursor, indicando que ele pode ser expandido.

* Clique para expandir o menu __Cache Storage__, em seguida, clique em `my-site-cache-v1`

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

Aqui você pode ver todos os arquivos armazenados em cache pelo Service Worker. Se precisar remover um arquivo do cache, você pode clicar com o botão direito sobre ele e selecionar a opção __delete__ no menu de contexto. Da mesma forma, você pode apagar todo o cache clicando com o botão direito em `my-site-cache-v1` e escolhendo excluir.

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### Limpe o slate

Como você pode ter notado, juntamente com __Cache Storage__, há uma série de outros itens de menu relacionados com os recursos armazenados, incluindo: Armazenamento Local, Armazenamento de Sessão, IndexedDB, Web SQL, Cookies, e Cache do Aplicativo ("AppCache"). Ter controle granular de cada um desses recursos em um único painel é extremamente útil. Mas você estivesse em um cenário em deseja excluir todos os recursos armazenados, seria muito tedioso ter que visitar cada item do menu e apagar seu conteúdo. Em vez disso, você pode usar a opção __Clear storage__ para limpar o slate de uma só vez (observe que isso também cancelará o registro de quaisquer Service Workers).

* Selecione a opção de menu __Clear storage__
* Clique no botão __Clear site data__ para excluir todos os recursos armazenados

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

Se voltar e clicar em `my-site-cache-v1`, você verá que agora todos os arquivos armazenados foram excluídos.

![317d24238f05e69c.png](img/317d24238f05e69c.png)

__E a engrenagem?__

Como o Service Worker pode fazer suas próprias solicitações de rede, ele pode ser útil para identificar o tráfego de rede que se originou a partir do próprio worker.

* Enquanto `my-site-cache-v1` ainda está vazio, alterne para o painel Network
* Atualize a página

No painel Network, você deve ver um conjunto inicial de solicitação de arquivos como `main.css`, seguida de uma segunda rodada de solicitações, com o prefixo de um ícone de engrenagem, que parecem buscar os mesmos ativos.

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

O ícone de engrenagem significa que estas solicitações vieram do próprio Service Worker. Especificamente, estas são as solicitações que estão sendo feitas pelo gerenciador `install` do Service Worker para preencher o cache off-line.


## Como simular diferentes condições de rede




Um dos recursos arrasadores dos Service Workers é a sua capacidade de servir conteúdo armazenado em cache aos usuários, mesmo quando estão off-line. Para verificar se tudo funciona como planejado, vamos testar algumas das ferramentas de limitação de rede fornecida pelo Chrome.

### Fornecendo solicitações enquanto está off-line

Para servir de conteúdo off-line, você precisa adicionar um gerenciador `fetch` ao seu `service-worker.js`

* Adicione o código a seguir ao `service-worker.js` logo após o `activate` gerenciador

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

* Alterne para o painel __Application__ e verifique se __Update on Reload__ ainda está marcada
* Atualize a página para instalar o novo Service Worker
* Desmarque __Update on reload__
* Marque __Offline__

Seu painel __Application__ deve ter a seguinte aparência agora:

![873b58278064b627.png](img/873b58278064b627.png)

Observe que o painel __Network__ agora tem um sinal de aviso amarelo para indicar que você está off-line (e para lembrá-lo de desmarcar essa caixa de seleção se desejar continuar a desenvolver com a rede).

Com seu gerenciador `fetch`, e seu aplicativo  definido para __Offline__, agora é a hora da verdade. Atualize a página e, se tudo correr bem, você deve continuar a ver o conteúdo do site, mesmo que nada venha da rede. Você pode alternar para o painel __Network__ para verificar se todos os recursos estão sendo servidos a partir de armazenamento de cache. Observe que, na coluna __Size__ é dito que esses recursos estão vindo do `(from Service Worker)`. Este é o sinal que nos diz que o Service Worker interceptou a solicitação, e serviu uma resposta do cache em vez de acessar a rede.

![a6f485875ca088db.png](img/a6f485875ca088db.png)

Você perceberá que há solicitações que falharam (como por um novo Service Worker ou `manifest.json`). Isso é totalmente bom e esperado.

### Testando redes lentas ou instáveis

Como usamos nossos dispositivos móveis em uma infinidade de contextos diferentes, estamos em constante movimento entre vários estados de conectividade. Não apenas isso, mas há muitas partes do mundo onde as velocidades 3G e 2G são a norma. Para verificar se nosso aplicativo funciona bem para esses consumidores, devemos testar que ele é funcional mesmo em uma conexão mais lenta.

Para começar, vamos simular como o aplicativo funciona em uma rede lenta quando o Service Worker não está em jogo.

* No painel __Application__, desmarque __Offline__
* Marque __Bypass for network__

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

A opção __Bypass for network__ informará ao navegador para ignorar nosso service worker quando precisar fazer uma solicitação de rede. Isso significa que nada poderá vir do armazenamento em cache, será como se não houvesse um Service Worker instalado.

* Em seguida, alterne para o painel __Network__
* Use a lista suspensa __Network Throttle__ para definir a velocidade de rede para `Regular 2G`

A lista suspensa __Network Throttle__ está localizada no canto superior direito do painel __Network__, junto à caixa de seleção __Offline__ do próprio painel __Network__. Por padrão, ela é definida como `No throttling`.

![c59b54a853215598.png](img/c59b54a853215598.png)

* Com a velocidade defina como `Regular 2G`, atualize a página

Observe que os tempos de resposta aumentam muito! Agora cada ativo leva várias centenas de milissegundos para ser baixado.

![70e461338a0bb051.png](img/70e461338a0bb051.png)

Vejamos como isso fica diferente com nosso Service Worker de volta ao jogo.

* Com a rede ainda definida para `Regular 2G`, volte para a guia __Application__
* Desmarque a caixa de seleção __Bypass for network__
* Volte ao painel __Network__
* Atualize a página

Agora nossos tempos de resposta caem para rápidos poucos milissegundos por recurso. Para usuários em redes mais lentas, esta é uma diferença da noite para o dia!

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## Lembre-se, é apenas JavaScript




Service Workers podem parecer mágica, mas na verdade eles são apenas arquivos JavaScript regulares. Isso significa que você pode usar as ferramentas existentes, como declarações `debugger` e pontos de interrupção para depurá-los.

### Trabalhe com o depurador

Muitos desenvolvedores contam com o bom e velho `console.log()` quando têm um problema em seu aplicativo. Mas há uma ferramenta muito mais poderosa disponível na caixa de ferramentas: `debugger`.

Adicionar esta linha ao seu código interromperá a execução e abrirá o painel __Sources__ do DevTools. A partir daí você pode percorrer as funções, inspecionar objetos, e até mesmo usar o console para executar comandos contra o escopo atual. Isso pode ser especialmente útil para depurar um Service Worker instável.

Para testar, vamos depurar nosso gerenciador `install`.

* Adicione uma declaração `debugger` ao início do seu gerenciador `install` em `service-worker.js`

```
self.addEventListener('install', function(event) {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});
```

* No painel __Application__, atualize a página
* Clique em __skipWaiting__ para ativar o novo Service Worker
* Atualize a página novamente para permitir que o gerenciador `fetch` seja executado

O aplicativo fará uma pausa na execução e alternará para o painel __Sources__ onde a instrução `debugger` agora está em destaque no `service-worker.js`.

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

Há uma infinidade de ferramentas úteis disponíveis nesta visualização. Uma dessas ferramentas é o inspetor __Scope__, que nos permite ver o estado atual de objetos no escopo da função atual.

* Clique na lista suspensa `event: ExtendableEvent`

![5116146f838a566.png](img/5116146f838a566.png)

Daí você pode descobrir todos os tipos de informações úteis sobre os atuais objetos no escopo. Por exemplo, olhando o campo `type`, é possível verificar se o objeto de evento atual é para o evento `install`.

### Como usar pontos de interrupção alternativamente

Se já está inspecionando seu código no painel __Sources__, você pode achar mais fácil configurar um ponto de interrupção, em vez de adicionar declarações `debugger` aos seus arquivos reais. Um ponto de interrupção serve a um propósito semelhante (congela a execução e permite que você inspecione o app), mas pode ser definido de dentro do próprio DevTools.

Para definir um ponto de interrupção, você precisa clicar no número da linha onde deseja que a solicitação para interrompa a execução.

* No painel __Sources__, desça para a linha 25 do `service-worker.js` e clique no número da linha

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

Isso definirá um ponto de interrupção no início do gerenciador `fetch` para que você possa fiscalizar seu objeto de evento.

* Atualize a página

Observe que, de modo semelhante a quando você usou a declaração `debugger`, a execução agora parou na linha com o ponto de interrupção. Isto significa que agora você pode inspecionar os objetos `FetchEvent` que passam por seu aplicativo e determinar quais recursos eles estavam solicitando.

* No inspetor __Scope__, expanda o objeto expanda o objeto `event`
* Expanda o objeto `request`
* Observe a propriedade `url`

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

Você pode ver que este `FetchEvent` estava solicitando o recurso em `http://127.0.0.1:8887/`, que é nosso `index.html`. Como o aplicativo irá lidar com muitas solicitações `fetch`, você pode deixar o ponto de interrupção no lugar e continuar a execução. Isso permitirá que você inspecione cada `FetchEvent` conforme ele passa pelo aplicativo. Uma técnica muito útil para obter uma visão exata de todas as solicitações em seu aplicativo.

* Pressione o botão __Resume__ para permitir que a execução de scripts continue

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

Após um momento, a execução será interrompida no mesmo ponto de interrupção. Verifique a propriedade `event.request.url` e observe que ela agora exibe `http://127.0.0.1:8887/styles/main.css`. Você pode continuar desta maneira para vê-la solicitar `smiley.svg`, `main.js` e finalmente o `manifest.json`.


## Testando notificações push




Notificações push são uma parte importante de criar uma experiência envolvente. Como as notificações requerem coordenação entre um servidor de aplicativos, um serviço de mensagens (como o Google Cloud Messaging) e seu Service Worker, pode ser útil testar o Service Worker isoladamente primeiro para verificar se ele está configurado corretamente.

### Adicionar suporte a Push

Você pode ter notado um botão no centro da aplicativo pedindo ao usuário para __Subscribe for Push Notifications__. Este botão já está preparado para solicitar a permissão de Notificação push do usuário quando clicado.

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

O único passo restante é adicionar suporte para o evento `push`  no `service-worker.js`.

* Abra `service-worker.js` e adicione as linhas a seguir após o gerenciador `fetch`

```
self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
```

Com o gerenciador configurado, é fácil simular um evento Push.

* Abra o painel de __Application__
* Atualize a página, ao ver o novo Service Worker entrar na fase `waiting`, clique no botão __skipWaiting__
* Clique no botão __Subscribe to Push Notifications__
* Aceite a solicitação de permissão

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* Finalmente, clique no botão __Push__, ao lado de __Update__ e __Unregister__

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

Agora você deve ver uma notificação push aparecer no canto superior direito da tela, confirmando que o Service Worker está lidando com eventos `push` como esperado.

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

Bom trabalho!

Agora que tem algumas ferramentas de depuração em sua caixa de ferramentas, você deve estar bem equipado para resolver quaisquer problemas que surjam em seu projeto. A única coisa que falta é você se aventurar e construir o próximo incrível Progressive Web App!





## Encontrou um problema ou tem feedback? {: .hide-from-toc }
Ajude-nos a melhorar nossos codelabs reportando um 
[problema](https://github.com/googlecodelabs/debugging-service-workers/issues) hoje. E obrigado!

{# wf_devsite_translation #}
