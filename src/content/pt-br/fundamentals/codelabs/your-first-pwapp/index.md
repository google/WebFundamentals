project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# Seu primeiro Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## Introdução

### O que faz um aplicativo da Web, um aplicativo da Web progressivo?

Os Progressive Web Apps fornecem uma experiência instalável, semelhante a um aplicativo, em computadores e dispositivos móveis que são criados e entregues diretamente pela Web. Eles são aplicativos da web que são rápidos e confiáveis. E o mais importante, são aplicativos da web que funcionam em qualquer navegador. Se você está construindo um aplicativo da Web hoje, já está no caminho da criação de um aplicativo da Web progressivo.

#### Rápido e Confiável

Toda experiência na web deve ser rápida, e isso é especialmente verdadeiro para aplicativos da Web progressivos. Rápido refere-se ao tempo necessário para obter conteúdo significativo na tela e fornecer uma experiência interativa em menos de 5 segundos.

E deve ser __relativamente rápido__. É difícil enfatizar o suficiente quanto melhor é o desempenho confiável. Pense desta maneira: a primeira carga de um aplicativo nativo é frustrante. Ele é cercado por uma loja de aplicativos e um download enorme, mas quando você chega a um ponto em que o aplicativo é instalado, esse custo inicial é amortizado em todas as inicializações do aplicativo, e nenhuma dessas partidas tem um atraso variável. Cada início de aplicativo é tão rápido quanto o último, sem variação. Um aplicativo da Web progressivo deve fornecer esse desempenho confiável que os usuários esperam de qualquer experiência instalada.

#### Instalável

Aplicativos da Web progressivos podem ser executados em uma guia do navegador, mas também podem ser instalados. Marcar um site apenas adiciona um atalho, mas um Progressive Web App instalado se parece e se comporta como todos os outros aplicativos instalados. Ele é iniciado no mesmo local que outros aplicativos são iniciados. Você pode controlar a experiência de lançamento, incluindo uma tela inicial personalizada, ícones e muito mais. Ele é executado como um aplicativo, em uma janela de aplicativo sem uma barra de endereços ou outra interface do usuário do navegador. E como todos os outros aplicativos instalados, é um aplicativo de nível superior no alternador de tarefas.

Lembre-se, é fundamental que um PWA instalável seja rápido e confiável. Os usuários que instalam um PWA esperam que seus aplicativos funcionem, independentemente do tipo de conexão de rede em que estejam. É uma expectativa básica que deve ser satisfeita por todos os aplicativos instalados.

#### Mobile &amp; Desktop

Usando técnicas de design responsivo, os Progressive Web Apps funcionam tanto na área de trabalho móvel quanto na área de trabalho móvel, usando uma única base de código entre as plataformas. Se você está pensando em escrever um aplicativo nativo, dê uma olhada nos benefícios que um PWA oferece.

### O que você vai construir

Neste codelab, você construirá um aplicativo da Web do clima usando as técnicas do Progressive Web App. Seu aplicativo irá:

* Use o design responsivo, para que ele funcione em computadores ou dispositivos móveis.
* Seja rápido, usando um service worker para pré-armazenar os recursos do aplicativo (HTML, CSS, JavaScript, imagens) necessários para executar e armazenar em cache os dados do tempo em tempo de execução para melhorar o desempenho.
* Ser instalável, usando um manifesto de aplicativo da web e o evento `beforeinstallprompt` para notificar o usuário de que é instalável.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: para simplificar este codelab e explicar os fundamentos do fornecimento de uma experiência off-line, estamos usando JavaScript vanilla. Em um aplicativo de produção, recomendamos o uso de ferramentas como [Workbox](/web/tools/workbox/) para criar seu service worker. Ele remove muitas das arestas vivas e cantos escuros que você pode encontrar.

### O que você vai aprender

* Como criar e adicionar um manifesto de aplicativo da web
* Como fornecer uma experiência offline simples
* Como fornecer uma experiência offline completa
* Como tornar seu aplicativo instalável

Este codelab é focado em aplicativos da Web progressivos. Conceitos não relevantes e blocos de códigos são encobertos e são fornecidos para você simplesmente copiar e colar.

### O que você precisa

* Uma versão recente do Chrome (74 ou posterior) PWAs são apenas aplicativos da web e funcionam em todos os navegadores, mas usaremos alguns recursos do Chrome DevTools para entender melhor o que está acontecendo no nível do navegador e usá-lo para testar a experiência de instalação.
* Conhecimento de HTML, CSS, JavaScript e [Chrome DevTools](https://developer.chrome.com/devtools) .

## Configurando

### Obtenha uma chave para a API Dark Sky

Nossos dados meteorológicos vêm do [Dark Sky API](https://darksky.net/dev) . Para usá-lo, você precisará solicitar uma chave de API. É fácil de usar e gratuito para projetos não comerciais.

[Register for API Key](https://darksky.net/dev/register)

Note: Você ainda pode completar este codelab sem uma chave de API do Dark Sky. Se o nosso servidor não conseguir obter dados reais da API Dark Sky, ele retornará dados falsos.

#### Verifique se sua chave de API está funcionando corretamente

Para testar se sua chave de API está funcionando corretamente, faça uma solicitação HTTP para a API DarkSky. Atualize o URL abaixo para substituir `DARKSKY_API_KEY` pela sua chave de API. Se tudo funcionar, você deve ver a última previsão do tempo para a cidade de Nova York.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### Obter o código

Colocamos tudo o que você precisa para este projeto em um repositório do Git. Para começar, você precisará pegar o código e abri-lo no seu ambiente de desenvolvimento favorito. Para este codelab, recomendamos o uso do Glitch.

#### fortemente recomendado: Use Glitch para importar o repo

Usar o Glitch é o método recomendado para trabalhar com este codelab.

1. Abra uma nova guia do navegador e vá para [https://glitch.com](https://glitch.com) .
2. Se você não tiver uma conta, precisará se inscrever.
3. Clique em __Novo projeto__ e depois em __Clone em Git Repo .__
4. Clone __https://github.com/googlecodelabs/your-first-pwapp.git__ e clique em OK.
5. Depois que o repositório for carregado, edite o arquivo `.env` e atualize-o com sua chave da API do DarkSky.
6. Clique no botão __Show Live__ para ver o PWA em ação.

#### Alternativa: Faça o download do código e trabalhe localmente

Se você quiser baixar o código e trabalhar localmente, você precisará ter uma versão recente do Node, e a configuração do editor de código está pronta para ser usada.

Caution: Se você trabalhar localmente, algumas das auditorias do Lighthouse não serão aprovadas e a instalação poderá não estar disponível porque o servidor local não veicula o conteúdo em um contexto seguro.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. Descompacte o arquivo zip baixado.
2. Execute o `npm install` para instalar as dependências necessárias para executar o servidor.
3. Edite `server.js` e defina sua chave da API DarkSky.
4. Execute o `node server.js` para iniciar o servidor na porta 8000.
5. Abra uma guia do navegador para [http://localhost:8000](http://localhost:8000)

## Estabelecer uma linha de base

### Qual é o nosso ponto de partida?

Nosso ponto de partida é um aplicativo meteorológico básico projetado para este codelab. O código foi excessivamente simplificado para mostrar os conceitos neste codelab, e tem pouca manipulação de erros. Se você optar por reutilizar qualquer um desses códigos em um aplicativo de produção, lide com todos os erros e teste completamente todo o código.

Algumas coisas para tentar ...

1. Adicione uma nova cidade com o botão azul mais no canto inferior direito.
2. Atualize os dados com o botão de atualização no canto superior direito.
3. Apague uma cidade usando o x no canto superior direito de cada cartão da cidade.
4. Veja como funciona no desktop e no celular.
5. Veja o que acontece quando você fica offline.
6. Usando o painel Rede do Chrome, veja o que acontece quando a rede é acelerada para o Slow 3G.
7. Adicione um atraso ao servidor de previsão alterando `FORECAST_DELAY` em `server.js`

### Auditoria com Farol

[Lighthouse](/web/tools/lighthouse/#devtools) é uma ferramenta fácil de usar para ajudar a melhorar a qualidade de seus sites e páginas. Tem auditorias de desempenho, acessibilidade, aplicativos da web progressivos e muito mais. Cada auditoria tem um documento de referência explicando por que a auditoria é importante e como corrigi-la.

![b112675caafccef0.png](img/b112675caafccef0.png)

Usaremos o Lighthouse para auditar nosso aplicativo Weather e verificar as alterações que fizemos.

Note: você pode executar o Lighthouse no Chrome DevTools, a partir da linha de comando, ou como um módulo do Node. Considere o [adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) no seu processo de criação para garantir que o seu aplicativo da Web não regride.

### Vamos correr o Farol

1. Abra seu projeto em uma nova aba.
2. Abra o DevTools do Chrome e mude para a guia __Audits__, o DevTools mostra uma lista de categorias de auditoria, deixe-as todas ativadas.
3. Clique em __Run audits__, após 60 a 90 segundos, o Lighthouse fornecerá um relatório na página.

### A Auditoria Progressiva de Web App

Vamos nos concentrar nos resultados da auditoria do Progressive Web App.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

E há muito vermelho para se concentrar:

* __❗FALHOU:__ A página atual não responde com um 200 quando está offline.
* __❗FALHOU:__ `start_url` não responde com um 200 quando está offline.
* __❗FALHOU:__ Não registra um service worker que controla a página e `start_url.`
* __❗FALHOU:__ O manifesto do aplicativo da Web não atende aos requisitos de instalabilidade.
* __❗FALHOU:__ Não está configurado para uma tela inicial personalizada.
* __❗FALHOU:__ Não define uma cor de tema da barra de endereços.

Vamos pular e começar a corrigir alguns desses problemas!

## Adicionar um manifesto do aplicativo da web

Ao final desta seção, nosso aplicativo climático passará pelas seguintes auditorias:

* O manifesto do aplicativo da Web não atende aos requisitos de instalabilidade.
* Não está configurado para uma tela inicial personalizada.
* Não define uma cor de tema da barra de endereços.

### Cria o manifesto do aplicativo da web

O [web app manifest](/web/fundamentals/web-app-manifest) é um arquivo JSON simples que oferece a você, desenvolvedor, a capacidade de controlar a aparência do seu aplicativo para o usuário.

Usando o manifesto do aplicativo da web, seu aplicativo da web pode:

* Diga ao navegador que você deseja que seu aplicativo seja aberto em uma janela autônoma ( `display` ).
* Defina qual página é aberta quando o aplicativo é iniciado pela primeira vez ( `start_url` ).
* Defina como o aplicativo deve ficar no dock ou no inicializador de aplicativos ( `short_name` , `icons` ).
* Crie uma tela inicial ( `name` , `icons` , `colors` ).
* Diga ao navegador para abrir a janela no modo paisagem ou retrato ( `orientation` ).
* E [plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

Crie um arquivo chamado `public/manifest.json` em seu projeto e copie / cole o seguinte conteúdo:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

O manifesto suporta uma matriz de ícones, destinados a diferentes tamanhos de tela. Para este laboratório de código, incluímos alguns outros desde que precisávamos deles para a nossa integração com o iOS.

Note: para ser instalável, o Chrome exige que você forneça pelo menos um ícone de 192x192px e um ícone de 512x512px. Mas você também pode fornecer outros tamanhos. O Chrome usa o ícone mais próximo de 48dp, por exemplo, 96px em um dispositivo de 2x ou 144px em um dispositivo de 3x.

### Adicione um link para o manifesto do aplicativo da web

Em seguida, precisamos informar ao navegador sobre nosso manifesto, adicionando uma `<link rel="manifest"...` a cada página em nosso aplicativo. Adicione a seguinte linha ao elemento `<head>` no seu arquivo `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### das #### DevTools

O DevTools fornece uma maneira rápida e fácil de verificar o seu arquivo `manifest.json` . Abra o painel __Manifest__ no painel __Application__. Se você adicionou as informações do manifesto corretamente, poderá vê-las analisadas e exibidas em um formato amigável a pessoas neste painel.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### Adicionar metatags e ícones do iOS

O Safari no iOS não suporta o manifesto do aplicativo da web ( [yet](https://webkit.org/status/#specification-web-app-manifest) ), então você precisará adicionar o [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) ao `<head>` do seu arquivo `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### Bônus: Correções fáceis do farol

Nossa auditoria do Lighthouse chamou algumas outras coisas que são bem fáceis de consertar, então vamos cuidar delas enquanto estivermos aqui.

#### Defina a meta descrição

Sob a auditoria de SEO, a Lighthouse observou que nossas [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; podem ser exibidas nos resultados de pesquisa do Google. Descrições exclusivas e de alta qualidade podem tornar seus resultados mais relevantes para os usuários de pesquisa e podem aumentar seu tráfego de pesquisa.

Para adicionar uma descrição, adicione a seguinte tag `meta` ao `<head>` do seu documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### Defina a cor do tema da barra de endereços

Na auditoria da PWA, a Lighthouse observou nosso aplicativo &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) &quot;. Ter uma barra de endereços do navegador para combinar com as cores da sua marca proporciona uma experiência de usuário mais imersiva.

Para definir a cor do tema no celular, adicione a seguinte tag `meta` ao `<head>` do seu documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Verificar alterações com o Farol

Execute o Lighthouse novamente (clicando no sinal de + no canto superior esquerdo do painel de Auditorias) e verifique suas alterações.

__SEO Audit__

* __✅ PASSADO:__ O documento tem uma meta descrição.

__Progressive Web App Audit__

* __❗FALHOU:__ A página atual não responde com um 200 quando está offline.
* __❗FALHOU:__ `start_url` não responde com um 200 quando está offline.
* __❗FALHOU:__ Não registra um service worker que controla a página e `start_url.`
* __✅ PASSADO:__ O manifesto do aplicativo da Web atende aos requisitos de instalabilidade.
* __✅ PASSADO:__ Configurado para uma tela inicial personalizada.
* __✅ PASSADO:__ Define uma cor de tema da barra de endereços.

## Fornece uma experiência offline básica

Existe uma expectativa de que os usuários que instalaram aplicativos sempre terão uma experiência de linha de base se estiverem off-line. É por isso que é fundamental que os aplicativos da Web instaláveis nunca mostrem o dinossauro off-line do Chrome. A experiência off-line pode variar de uma simples página off-line a uma experiência somente leitura com dados armazenados em cache anteriormente, até uma experiência off-line totalmente funcional que é sincronizada automaticamente quando a conexão de rede é restaurada.

Nesta seção, adicionaremos uma página off-line simples ao nosso aplicativo de clima. Se o usuário tentar carregar o aplicativo enquanto estiver off-line, ele mostrará nossa página personalizada, em vez da típica página off-line exibida pelo navegador. Ao final desta seção, nosso aplicativo climático passará pelas seguintes auditorias:

* A página atual não responde com um 200 quando está offline.
* `start_url` não responde com um 200 quando está offline.
* Não registra um service worker que controla a página e `start_url.`

Na próxima seção, substituiremos nossa página off-line personalizada por uma experiência off-line completa. Isso melhorará a experiência off-line, mas, o que é mais importante, melhorará significativamente nosso desempenho, pois a maioria de nossos recursos (HTML, CSS e JavaScript) será armazenada e veiculada localmente, eliminando a rede como um gargalo potencial.

### Trabalhadores de serviço para o resgate

Se você não estiver familiarizado com os trabalhadores de serviços, poderá obter uma compreensão básica lendo [Introduction To Service Workers](/web/fundamentals/primers/service-worker/) sobre o que eles podem fazer, como funciona seu ciclo de vida e muito mais. Depois de concluir este laboratório de códigos, verifique o [Debugging Service Workers code lab](http://goo.gl/jhXCBy) para obter uma [Debugging Service Workers code lab](http://goo.gl/jhXCBy) mais aprofundada sobre como trabalhar com trabalhadores de serviços.

Os recursos fornecidos pelos funcionários do serviço devem ser considerados um aprimoramento progressivo e adicionados somente se suportados pelo navegador. Por exemplo, com os trabalhadores de serviços, você pode armazenar em cache o [app shell](/web/fundamentals/architecture/app-shell) e os dados do seu aplicativo, para que estejam disponíveis mesmo quando a rede não estiver. Quando os trabalhadores de serviços não são suportados, o código offline não é chamado e o usuário obtém uma experiência básica. Usar a detecção de recursos para fornecer aprimoramento progressivo tem pouca sobrecarga e não será quebrado em navegadores mais antigos que não suportam esse recurso.

Warning: funcionalidade do Service Worker está disponível apenas nas páginas acessadas via HTTPS (http://localhost e equivalentes também funcionarão para facilitar o teste).

### Registrar o trabalhador de serviço

O primeiro passo é registrar o trabalhador de serviço. Adicione o seguinte código ao seu arquivo `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

Esse código verifica se a API de service worker está disponível e, se estiver, o service worker em `/service-worker.js` é registrado quando a página é [loaded](/web/fundamentals/primers/service-workers/registration) .

Observe que o service worker é servido a partir do diretório raiz, não de um diretório `/scripts/` . Essa é a maneira mais fácil de definir __ `scope` __ de seu service worker. O `scope` do service worker determina quais arquivos o service worker controla, em outras palavras, de qual caminho o service worker interceptará os pedidos. O padrão `scope` é o local do arquivo do service worker e se estende a todos os diretórios abaixo. Portanto, se o `service-worker.js` estiver localizado no diretório raiz, o service worker controlará as solicitações de todas as páginas da Web nesse domínio.

### offline do ### WORDS0

Primeiro, precisamos informar ao service worker o que armazenar em cache. Nós já criamos um [offline page](https://your-first-pwa.glitch.me/offline.html) simples ( `public/offline.html` ) que será exibido sempre que não houver conexão de rede.

Em seu `service-worker.js` , adicione `'/offline.html',` à matriz `FILES_TO_CACHE` , o resultado final deve ser assim:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

Em seguida, precisamos atualizar o evento `install` para dizer ao funcionário do serviço para pré-armazenar em cache a página offline:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: Os eventos e o ciclo de vida do Service Worker são abordados na próxima seção.

Nosso evento `install` agora abre o cache com `caches.open()` e fornece um nome de cache. Fornecer um nome de cache nos permite criar arquivos de versão ou separar os dados dos recursos armazenados em cache para que possamos atualizar facilmente um, mas não afetar o outro.

Quando o cache estiver aberto, podemos chamar o `cache.addAll()` , que pega uma lista de URLs, busca-os no servidor e adiciona a resposta ao cache. Observe que `cache.addAll()` rejeitará se qualquer um dos pedidos individuais falhar. Isso significa que você tem a garantia de que, se a etapa de instalação for bem-sucedida, seu cache estará em um estado consistente. Mas, se falhar por algum motivo, ele tentará automaticamente novamente na próxima vez em que o service worker for iniciado.

#### das DevTools

Vamos dar uma olhada em como você pode usar o DevTools para entender e depurar os trabalhadores do serviço. Antes de recarregar sua página, abra o DevTools, vá até o painel __Service Workers__ no painel __Application__. Deve ficar assim:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

Quando você vê uma página em branco como essa, isso significa que a página aberta atualmente não possui nenhum funcionário de serviço registrado.

Agora, recarregue sua página. Agora, o painel Service Worker deve ter esta aparência:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

Quando você vê informações como essa, isso significa que a página tem um trabalhador de serviço em execução.

Ao lado do rótulo de status, há um número (*34251* neste caso), fique de olho nesse número enquanto trabalha com trabalhadores de serviços. É uma maneira fácil de saber se o seu service worker foi atualizado.

### Limpar páginas antigas offline

Usaremos o evento `activate` para limpar quaisquer dados antigos em nosso cache. Esse código garante que o funcionário do serviço atualize seu cache sempre que qualquer um dos arquivos do shell do aplicativo for alterado. Para que isso funcione, você precisará incrementar a variável `CACHE_NAME` na parte superior do arquivo do service worker.

Adicione o seguinte código ao seu evento `activate` :

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### das DevTools

Com o painel Service Workers aberto, atualize a página, você verá o novo service worker instalado e o incremento do número de status.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

O service worker atualizado assume o controle imediatamente porque nosso evento `install` termina com `self.skipWaiting()` e o evento `activate` termina com `self.clients.claim()` . Sem esses, o trabalhador do serviço antigo continuaria a controlar a página, desde que houvesse uma guia aberta na página.

### Lidar com solicitações de rede com falha

E finalmente, precisamos lidar `fetch` eventos `fetch` . Nós vamos usar um [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) . O service worker tentará primeiro buscar o recurso da rede, se isso falhar, ele retornará a página off-line do cache.

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

O manipulador `fetch` só precisa manipular as navegações da página, portanto, outras solicitações podem ser descartadas do manipulador e serão tratadas normalmente pelo navegador. Mas, se a solicitação `.mode` for `navigate` , use `fetch` para tentar obter o item da rede. Se falhar, o manipulador `catch` abre o cache com `caches.open(CACHE_NAME)` e usa `cache.match('offline.html')` para obter a página offline pré-armazenada. O resultado é então passado de volta para o navegador usando o `evt.respondWith()` .

Key Point: Envolver a chamada `fetch` em [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) impede a manipulação de busca padrão dos navegadores e informa ao navegador que queremos lidar com a resposta. Se você não chamar o `evt.respondWith()` dentro de um manipulador `fetch` , apenas obterá o comportamento de rede padrão.

#### das #### DevTools

Vamos verificar se tudo funciona como esperamos. Com o painel Service Workers aberto, atualize a página, você verá o novo service worker instalado e o incremento do número de status.

Também podemos verificar para ver o que foi armazenado em cache. Vá para o painel __Cache Storage__ no painel __Application__ do DevTools. Clique com o botão direito em __Cache Storage__, escolha __Refresh Caches__, expanda a seção e você verá o nome do seu cache estático listado no lado esquerdo. Clicar no nome do cache mostra todos os arquivos armazenados em cache.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

Agora, vamos testar o modo offline. Volte para o painel __Service Workers__ do DevTools e marque a caixa de seleção __Offline__. Depois de verificar, você verá um pequeno ícone de aviso amarelo ao lado da guia do painel __Network__. Isso indica que você está off-line.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

Recarregue sua página e ... funciona! Recebemos __our__ panda offline, em vez do dinossauro offline do Chrome!

### Dicas para testar trabalhadores de serviços

A depuração de funcionários do serviço pode ser um desafio e, quando envolve o armazenamento em cache, as coisas podem se tornar ainda mais um pesadelo se o cache não for atualizado quando você o espera. Entre o ciclo de vida típico do trabalhador de serviço e um bug no seu código, você pode ficar rapidamente frustrado. __Mas não .__

#### Use DevTools

No painel Service Worker do painel Application, há algumas caixas de seleção que facilitarão muito a sua vida.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - Quando marcado, simula uma experiência off-line e impede que qualquer requisição vá para a rede.
* __Update on reload__ - Quando marcado, irá obter o service worker mais recente, instalá-lo e ativá-lo imediatamente.
* __Bypass for network__ - Quando as solicitações verificadas ignoram o service worker e são enviadas diretamente para a rede.

#### Start Fresh

Em alguns casos, você pode estar carregando dados armazenados em cache ou que as coisas não estão atualizadas conforme o esperado. Para limpar todos os dados salvos (localStorage, dados indexados do banco de dados, arquivos em cache) e remover quaisquer trabalhadores do serviço, use o painel Limpar armazenamento na guia Aplicativo. Como alternativa, você também pode trabalhar em uma janela anônima.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

Dicas adicionais:

* Uma vez que um funcionário do serviço não tenha sido registrado, ele poderá permanecer listado até que a janela do navegador que o contém esteja fechada.
* Se várias janelas do seu aplicativo estiverem abertas, um novo funcionário do serviço não entrará em vigor até que todas as janelas tenham sido recarregadas e atualizadas para o trabalhador de serviço mais recente.
* O cancelamento do registro de um trabalhador do serviço não limpa o cache!
* Se existir um funcionário do serviço e um novo funcionário do serviço estiver registrado, o novo funcionário do serviço não assumirá o controle até que a página seja recarregada, a menos que você [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) .

### Verificar alterações com o Farol

Execute o Lighthouse novamente e verifique suas alterações. Não se esqueça de desmarcar a caixa de seleção Off-line antes de verificar suas alterações.

__SEO Audit__

* __✅ PASSADO:__ O documento tem uma meta descrição.

__Progressive Web App Audit__

* __✅ PASSADO:__ A página atual responde com um 200 quando off-line.
* __✅ PASSADO:__ `start_url` responde com um 200 quando está offline.
* __✅ PASSADO:__ Registra um service worker que controla a página e `start_url.`
* __✅ PASSADO:__ O manifesto do aplicativo da Web atende aos requisitos de instalabilidade.
* __✅ PASSADO:__ Configurado para uma tela inicial personalizada.
* __✅ PASSADO:__ Define uma cor de tema da barra de endereços.

## Fornecer uma experiência off-line completa

Reserve um momento, coloque seu telefone no modo avião e tente executar alguns de seus aplicativos favoritos. Em quase todos os casos, eles fornecem uma experiência offline bastante robusta. Os usuários esperam essa experiência robusta de seus aplicativos. E a web não deveria ser diferente. Os aplicativos da Web progressivos devem ser projetados com off-line como um cenário principal.

Key Point: projetar para o primeiro off-line pode melhorar drasticamente o desempenho do seu aplicativo da Web, reduzindo o número de solicitações de rede feitas pelo seu aplicativo. Em vez disso, os recursos podem ser pré-armazenados e servidos diretamente do cache local. Mesmo com a conexão de rede mais rápida, a veiculação do cache local será mais rápida!

### Ciclo de vida do trabalhador de serviço

O ciclo de vida do trabalhador de serviço é a parte mais complicada. Se você não sabe o que está tentando fazer e quais são os benefícios, pode parecer que está lutando contra você. Mas, uma vez que você saiba como funciona, você pode fornecer atualizações ininterruptas aos usuários, misturando o melhor da Web e padrões nativos.

Key Point: Este codelab abrange apenas os conceitos básicos do ciclo de vida do trabalhador de serviços. Para mergulhar mais fundo, consulte [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) artigo sobre WebFundamentals.

#### `install`

O primeiro evento que um trabalhador de serviço recebe é `install` . É acionado assim que o trabalhador é executado e só é chamado uma vez por trabalhador de serviço. __Se você alterar seu script de service worker, o navegador o considerará como um worker__ de serviço diferente e obterá seu próprio evento `install` .

![72ed77b1720512da.png](img/72ed77b1720512da.png)

Normalmente, o evento `install` é usado para armazenar em cache tudo o que você precisa para que seu aplicativo seja executado.

#### `activate`

O service worker receberá um evento `activate` sempre que for iniciado. O principal objetivo do evento `activate` é configurar o comportamento do trabalhador de serviço, limpar os recursos deixados para trás das execuções anteriores (por exemplo, caches antigos) e preparar o Service `fetch` para lidar com solicitações de rede (por exemplo, o evento `fetch` descrito abaixo).

#### `fetch`

O evento de busca permite que o service worker intercepte quaisquer solicitações de rede e manipule solicitações. Ele pode ir para a rede para obter o recurso, pode puxá-lo de seu próprio cache, gerar uma resposta personalizada ou qualquer número de opções diferentes. Confira o [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) para diferentes estratégias que você pode usar.

#### Atualizando um service worker

O navegador verifica se há uma nova versão do seu service worker em cada carregamento de página. Se encontrar uma nova versão, a nova versão será baixada e instalada em segundo plano, mas não será ativada. Ele fica em um estado de espera, até que não haja mais páginas abertas que usem o trabalhador de serviço antigo. Depois que todas as janelas que usam o trabalhador de serviço antigo estiverem fechadas, o novo funcionário de serviço será ativado e poderá assumir o controle. Consulte a seção [Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) do documento Ciclo de vida do trabalhador de serviço para obter mais detalhes.

### Escolhendo a estratégia certa de cache

A escolha correta do [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) depende do tipo de recurso que você está tentando armazenar em cache e de como você pode precisar dele mais tarde. Para nosso aplicativo de clima, vamos dividir os recursos que precisamos para armazenar em cache em duas categorias: recursos que queremos precache e os dados que armazenaremos em cache no tempo de execução.

#### Cache de recursos estáticos

Pré-empacotar seus recursos é um conceito semelhante ao que acontece quando um usuário instala um aplicativo para desktop ou móvel. Os principais recursos necessários para a execução do aplicativo são instalados ou armazenados em cache no dispositivo, para que possam ser carregados posteriormente, independentemente de haver uma conexão de rede ou não.

Para nosso aplicativo, armazenaremos todos os nossos recursos estáticos quando o nosso service worker estiver instalado, para que tudo que precisamos para executar nosso aplicativo seja armazenado no dispositivo do usuário. Para garantir que nosso aplicativo seja carregado rapidamente, usaremos a estratégia [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) ; em vez de ir para a rede para obter os recursos, eles são retirados do cache local; somente se não estiver disponível, tentaremos obtê-lo da rede.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

Puxar do cache local elimina qualquer variabilidade de rede. Não importa em que tipo de rede o usuário esteja (Wi-Fi, 5G, 3G ou até mesmo 2G), os principais recursos que precisamos executar estão disponíveis quase que imediatamente.

Caution: Neste exemplo, os recursos estáticos são exibidos usando uma estratégia [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) , que resulta em uma cópia de qualquer conteúdo em cache sendo retornado sem consultar a rede. Enquanto uma estratégia `cache-first` é fácil de implementar, pode causar desafios no futuro.

#### cache os dados do aplicativo

O [stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) é ideal para determinados tipos de dados e funciona bem para o nosso aplicativo. Ele obtém dados na tela o mais rápido possível e atualiza quando a rede retorna os dados mais recentes. Stale-while-revalidate significa que precisamos iniciar duas solicitações assíncronas, uma para o cache e outra para a rede.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

Em circunstâncias normais, os dados armazenados em cache serão retornados quase que imediatamente, fornecendo ao aplicativo dados recentes que podem ser usados. Em seguida, quando a solicitação de rede retornar, o aplicativo será atualizado usando os dados mais recentes da rede.

Para o nosso aplicativo, isso oferece uma experiência melhor do que a rede, voltando à estratégia de cache porque o usuário não precisa esperar até que a solicitação de rede atinja o tempo limite para ver algo na tela. Inicialmente, eles podem ver dados mais antigos, mas, assim que a solicitação de rede retornar, o aplicativo será atualizado com os dados mais recentes.

### Atualizar lógica do aplicativo

Como mencionado anteriormente, o aplicativo precisa iniciar duas solicitações assíncronas, uma para o cache e outra para a rede. O aplicativo usa o objeto `caches` disponível em `window` para acessar o cache e recuperar os dados mais recentes. Esse é um excelente exemplo de aprimoramento progressivo, pois o objeto `caches` pode não estar disponível em todos os navegadores e, se não for a solicitação de rede, ainda deve funcionar.

Atualize a função `getForecastFromCache()` , para verificar se o objeto `caches` está disponível no objeto global `window` e, se estiver, solicite os dados do cache.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

Então, precisamos modificar [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) para que faça duas chamadas, uma para `getForecastFromNetwork()` para obter a previsão da rede e uma para `getForecastFromCache()` para obter a última previsão em cache:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

Nosso aplicativo de clima agora faz duas solicitações assíncronas de dados, uma do cache e outra por meio de `fetch` . Se houver dados no cache, eles serão retornados e renderizados com extrema rapidez (dezenas de milissegundos). Então, quando o `fetch` responder, o cartão será atualizado com os dados mais recentes diretamente da API do clima.

Observe como a solicitação de cache e a solicitação `fetch` terminam com uma chamada para atualizar o cartão de previsão. Como o aplicativo sabe se está exibindo os dados mais recentes? Isso é tratado no código a seguir de `renderForecast()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

Toda vez que um cartão é atualizado, o aplicativo armazena o registro de data e hora dos dados em um atributo oculto no cartão. O aplicativo só funciona se o registro de data e hora que já existe no cartão for mais recente que os dados que foram transmitidos para a função.

### Pré-cache nossos recursos de aplicativo

No service worker, vamos adicionar um `DATA_CACHE_NAME` para separar os dados de nossos aplicativos do shell do aplicativo. Quando o shell do aplicativo é atualizado e os caches mais antigos são limpos, nossos dados permanecem inalterados, prontos para uma carga super rápida. Lembre-se de que, caso seu formato de dados mude no futuro, você precisará de uma maneira de lidar com isso e garantir que o shell e o conteúdo do aplicativo permaneçam sincronizados.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

Não se esqueça de atualizar também o `CACHE_NAME` ; Também estaremos mudando todos os nossos recursos estáticos.

Para que nosso aplicativo funcione off-line, precisamos precache todos os recursos necessários. Isso também ajudará nosso desempenho. Em vez de ter que obter todos os recursos da rede, o aplicativo poderá carregar todos eles do cache local, eliminando qualquer instabilidade da rede.

Atualize o array `FILES_TO_CACHE` com a lista de arquivos:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

Como estamos gerando manualmente a lista de arquivos para cache, toda vez que atualizamos um arquivo, nós devemos atualizar o `CACHE_NAME`. Conseguimos remover `offline.html` da nossa lista de arquivos armazenados em cache porque nosso aplicativo agora tem todos os recursos necessários para trabalhar off-line e nunca exibirá a página off-line novamente.

Caution: Neste exemplo, nós enrolamos a mão nosso próprio trabalhador de serviço. Sempre que atualizamos qualquer um dos recursos estáticos, precisamos reinscrever o service worker e atualizar o cache, caso contrário, o conteúdo antigo será exibido. Além disso, quando um arquivo é alterado, todo o cache é invalidado e precisa ser baixado novamente. Isso significa que corrigir um erro simples de ortografia de um caractere invalidará o cache e exigirá que tudo seja baixado novamente - e não exatamente eficiente. [Workbox](/web/tools/workbox/) lida com isso graciosamente, integrando-o ao seu processo de criação, somente os arquivos alterados serão atualizados, economizando largura de banda para os usuários e manutenção mais fácil para você!

#### Atualiza o manipulador de eventos de ativação

Para garantir a nossa `activate` evento não apagar acidentalmente os nossos dados, na `activate` caso de `service-worker.js` , substitua `if (key !== CACHE_NAME) {` com:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### Atualiza o manipulador de eventos de busca

Precisamos modificar o service worker para interceptar solicitações à API do clima e armazenar suas respostas no cache, para que possamos acessá-las facilmente mais tarde. Na estratégia stale-while-revalidate, esperamos que a resposta da rede seja a &#39;fonte da verdade&#39;, sempre nos fornecendo as informações mais recentes. Se não puder, não há problema em falhar porque já recuperamos os dados armazenados em cache mais recentes em nosso aplicativo.

Atualize o manipulador de eventos `fetch` para manipular solicitações para a API de dados separadamente de outras solicitações.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

O código intercepta a solicitação e verifica se é uma previsão do tempo. Se estiver, use `fetch` para fazer a solicitação. Quando a resposta for retornada, abra o cache, clone a resposta, armazene-a no cache e retorne a resposta ao solicitante original.

Precisamos remover a verificação `evt.request.mode !== 'navigate'` porque queremos que o nosso service worker manipule todas as solicitações (incluindo imagens, scripts, arquivos CSS, etc), não apenas as navegações. Se deixássemos o check-in, somente o HTML seria servido no cache do service worker, todo o restante seria solicitado pela rede.

### Experimente

O aplicativo deve estar completamente offline-funcional agora. Atualize a página para garantir que você tenha o service worker mais recente instalado, salve algumas cidades e pressione o botão Atualizar no aplicativo para obter dados sobre climas novos.

Em seguida, vá para o painel __Cache Storage__ no painel __Application__ do DevTools. Expanda a seção e você verá o nome do cache estático e do cache de dados listados no lado esquerdo. Abrindo o cache de dados deve mostrar os dados armazenados para cada cidade.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

Em seguida, abra o DevTools e mude para o painel Service Worker, marque a caixa de seleção Offline, tente recarregar a página e, em seguida, fique offline e recarregue a página.

Se você estiver em uma rede rápida e quero ver como os dados previsão do tempo é atualizado em uma conexão lenta, defina o `FORECAST_DELAY` propriedade em `server.js` para `5000` . Todas as solicitações para a API de previsão serão atrasadas por 5000 ms.

### Verificar alterações com o Farol

Também é uma boa idéia rodar o Lighthouse novamente.

__SEO Audit__

* __✅ PASSADO:__ O documento tem uma meta descrição.

__Progressive Web App Audit__

* __✅ PASSADO:__ A página atual responde com um 200 quando off-line.
* __✅ PASSADO:__ `start_url` responde com um 200 quando está offline.
* __✅ PASSADO:__ Registra um service worker que controla a página e `start_url.`
* __✅ PASSADO:__ O manifesto do aplicativo da Web atende aos requisitos de instalabilidade.
* __✅ PASSADO:__ Configurado para uma tela inicial personalizada.
* __✅ PASSADO:__ Define uma cor de tema da barra de endereços.

## Adicionar experiência de instalação

Quando um aplicativo da Web progressivo é instalado, ele se parece e se comporta como todos os outros aplicativos instalados. Ele é iniciado no mesmo local que outros aplicativos são iniciados. Ele é executado em um aplicativo sem uma barra de endereços ou outra interface do usuário do navegador. E como todos os outros aplicativos instalados, é um aplicativo de nível superior no alternador de tarefas.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

No Chrome, um Progressive Web App pode ser instalado através do menu de contexto de três pontos, ou você pode fornecer um botão ou outro componente de interface do usuário para o usuário, que solicitará a instalação do aplicativo.

Success: como a experiência de instalação no menu de contexto de três pontos do Chrome está um pouco prejudicada, recomendamos que você forneça alguma indicação em seu aplicativo para notificar o usuário que seu aplicativo pode ser instalado e um botão de instalação para concluir o processo de instalação.

### Auditoria com Farol

Para que um usuário possa instalar seu Progressive Web App, ele precisa atender a [certain criteria](/web/fundamentals/app-install-banners/#criteria) . A maneira mais fácil de verificar é usar o Lighthouse e garantir que ele atenda aos critérios instaláveis.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

Se você trabalhou com este codelab, seu PWA já deve atender a esses critérios.

Key Point: para esta seção, ative a caixa de seleção **Ignorar para rede** no painel **Service Workers** do painel **Application** no DevTools. Quando marcada, as solicitações ignoram o responsável pelo serviço e são enviadas diretamente para a rede. Isso simplifica nosso processo de desenvolvimento, já que não precisamos atualizar nosso service worker enquanto trabalhamos nesta seção.

### Adicione install.js ao index.html

Primeiro, vamos adicionar o `install.js` ao nosso arquivo `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### Ouça o evento `beforeinstallprompt`

Se a tela adicionar à tela inicial [criteria](/web/fundamentals/app-install-banners/#criteria) for atendida, o Chrome `beforeinstallprompt` um evento `beforeinstallprompt` , que você poderá usar para indicar que seu aplicativo pode ser &#39;instalado&#39; e, em seguida, solicitará que o usuário o instale. Adicione o código abaixo para ouvir o evento `beforeinstallprompt` :

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### Salvar evento e mostrar botão de instalação

Em nossa função `saveBeforeInstallPromptEvent` , salvaremos uma referência ao evento `beforeinstallprompt` para que possamos chamar `prompt()` posteriormente e atualizar nossa interface para mostrar o botão de instalação.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### Mostrar o prompt / ocultar o botão

Quando o usuário clica no botão de instalação, precisamos chamar `.prompt()` no evento `beforeinstallprompt` salvo. Também precisamos ocultar o botão de instalação, porque o `.prompt()` só pode ser chamado uma vez em cada evento salvo.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

Chamar `.prompt()` mostrará um diálogo modal para o usuário, pedindo que ele adicione seu aplicativo à tela inicial.

### os resultados

Você pode verificar para ver como o usuário respondeu ao diálogo Instalar ouvindo a promessa retornado pelo `userChoice` propriedade dos salvos `beforeinstallprompt` evento. A promessa retorna um objeto com uma propriedade `outcome` depois que o prompt é mostrado e o usuário responde a ele.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

Um comentário sobre `userChoice` , o [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) , não é uma função como você poderia esperar.

#### Registrar todos os eventos de instalação

Além de qualquer interface do usuário que você adicionar para instalar seu aplicativo, os usuários também podem instalar seu PWA por meio de outros métodos, por exemplo, o menu de três pontos do Chrome. Para rastrear esses eventos, ouça o evento appinstalled.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

Então, precisaremos atualizar a função `logAppInstalled` , para este codelab, usaremos `console.log` , mas em um aplicativo de produção, você provavelmente desejará registrar isso como um evento com seu software de análise.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### Atualize o service worker

Não se esqueça de atualizar o `CACHE_NAME` em seu arquivo `service-worker.js` desde que você tenha feito alterações nos arquivos já armazenados em cache. A ativação da caixa de seleção __Bypass for network__ no painel Service Worker do painel Application no DevTools funcionará no desenvolvimento, mas não ajudará no mundo real.

### Experimente

Vamos ver como foi o passo da instalação. Por segurança, use o botão __Limpar dados do site__ no painel de Aplicativos do DevTools para limpar tudo e garantir que estamos começando de novo. Se você instalou o aplicativo anteriormente, desinstale-o, caso contrário, o ícone de instalação não será exibido novamente.

#### Verifique se o botão de instalação está visível

Primeiro, vamos verificar se nosso ícone de instalação é exibido corretamente, não deixe de experimentar isso em computadores e dispositivos móveis.

1. Abra o URL em uma nova guia do Chrome.
2. Abra o menu de três pontos do Chrome (ao lado da barra de endereço).
▢ Verifique se você vê &quot;* Install Weather ... *&quot; no menu.
3. Atualize os dados meteorológicos usando o botão de atualização no canto superior direito para garantir que [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) o [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) .
▢ Verifique se o ícone de instalação está visível no cabeçalho do aplicativo.

#### Verifique se o botão de instalação funciona

Em seguida, vamos garantir que tudo seja instalado corretamente e nossos eventos sejam disparados corretamente. Você pode fazer isso no desktop ou no celular. Se você quiser testar isso no celular, verifique se está usando a depuração remota para ver o que está registrado no console.

1. Open Chrome, and in a new browser tab, navigate to your Weather PWA.
2. Open DevTools and switch to the Console pane.
3. Click the install button in the upper right corner.
▢ Verify the install button disappears
▢ Verify the install modal dialog is shown.
4. Click Cancel.
▢ Verify "*User dismissed the A2HS prompt*" is shown in the console output.
▢ Verify the install button reappears.
5. Click the install button again, then click the install button in the modal dialog.
▢ Verify "*User accepted the A2HS prompt*" is shown in the console output.
▢ Verify "*Weather App was installed*" is shown in the console output.
▢ Verify the Weather app is added to the place where you'd typically find apps.
6. Launch the Weather PWA.
▢ Verify the app opens as a standalone app, either in an app window on desktop, or full screen on mobile.

Observe que, se você estiver executando na área de trabalho a partir do host local, o PWA instalado poderá mostrar um banner de endereço, pois o host local não é considerado um host seguro.

#### Verificar se a instalação do iOS funciona corretamente

Vamos também verificar o comportamento no iOS. Se você tiver um dispositivo iOS, poderá usá-lo ou, se estiver usando um Mac, tente o simulador do iOS disponível com o Xcode.

1. Abra o Safari e, em uma nova guia do navegador, navegue até o seu PWA Meteorológico.
2. Clique no *Share*! Botão [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) .
3. Role para a direita e clique no botão *Adicionar à tela inicial*.
▢ Verifique se o título, o URL e o ícone estão corretos.
4. Clique em *Adicionar.* ▢ Verifique se o ícone do aplicativo foi adicionado à tela inicial.
5. Inicie o Weather PWA na tela inicial.
▢ Verifique se o aplicativo inicia em tela cheia.

### Bonus: Detectando se seu aplicativo é iniciado na tela inicial

A consulta de mídia `display-mode` possibilita a aplicação de estilos, dependendo de como o aplicativo foi iniciado, ou determina como ele foi iniciado com JavaScript.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

Você também pode verificar a `display-mode` consulta de mídia em [JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) .

### Bonus: Desinstalando seu PWA

Lembre-se, o `beforeinstallevent` não dispara se o aplicativo já estiver instalado, portanto, durante o desenvolvimento, você provavelmente desejará instalar e desinstalar seu aplicativo várias vezes para garantir que tudo esteja funcionando conforme o esperado.

#### Android

No Android, os PWAs são desinstalados da mesma forma que outros aplicativos instalados são desinstalados.

* Abra a gaveta do aplicativo.
* Role para baixo para encontrar o ícone do tempo.
* Arraste o ícone do aplicativo para o topo da tela.
* Escolha *Desinstalar.*

#### ChromeOS

No ChromeOS, os PWAs são facilmente desinstalados da caixa de pesquisa do iniciador.

* Abra o lançador.
* Digite &quot;* Tempo *&quot; na caixa de pesquisa, o seu PWA Meteorológico deve aparecer nos resultados.
* Clique com o botão direito (alt-click) no Weather PWA.
* Clique em *Remover do Chrome ...*

#### macOS e Windows

No Mac e no Windows, os PWAs devem ser desinstalados por meio do Chrome.

* Em uma nova guia do navegador, abra o chrome: // apps.
* Clique com o botão direito (alt-click) no Weather PWA.
* Clique em *Remover do Chrome ...*

## Parabéns

Parabéns, você construiu com sucesso seu primeiro Progressive Web App!

Você adicionou um manifesto de aplicativo da Web para permitir a instalação e adicionou um trabalhador de serviço para garantir que o seu PWA seja sempre rápido e confiável. Você aprendeu a usar o DevTools para auditar um aplicativo e como ele pode ajudá-lo a melhorar sua experiência do usuário.

Agora você conhece as principais etapas necessárias para transformar qualquer aplicativo da Web em um aplicativo da Web progressivo.

### Leitura adicional

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### docs de referência

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## Encontrou um problema ou tem um feedback? {: .hide-from-toc }

Ajude-nos a melhorar nossos laboratórios de código enviando uma [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) hoje. E obrigado!

{% include "web/_shared/translation-end.html" %}
