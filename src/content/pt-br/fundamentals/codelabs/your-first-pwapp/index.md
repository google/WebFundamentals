project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Neste codelab, você vai criar um Progressive Web App, que é carregado com rapidez, mesmo em redes instáveis, tem um ícone na tela inicial e é carregado como uma experiência de tela inteira de alto nível.

{# wf_updated_on: 2017-01-05T16:32:36Z #}
{# wf_published_on: 2016-01-01 #}


# Seu primeiro Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



##  Introdução




[Progressive Web Apps](/web/progressive-web-apps) são experiências que combinam o melhor da Web e o melhor dos aplicativos. Eles são úteis para os usuários desde a primeira visita em uma guia de navegador sem exigir instalações. Conforme o usuário desenvolve uma relação com o aplicativo ao longo do tempo, ele se torna cada vez mais eficaz. Ele é carregado com rapidez, mesmo em redes instáveis, envia notificações push relevantes, tem um ícone na tela inicial e é carregado como uma experiência de tela inteira de alto nível.

### O que é um Progressive Web App?

Um Progressive Web App é:

* __Progressivo__ - Funciona para qualquer usuário, independentemente do navegador escolhido, pois é criado com aprimoramento progressivo como princípio fundamental.
* __Responsivo__ - Se adequa a qualquer formato: desktop, celular, tablet ou o que for inventado a seguir.
* __Independente de conectividade__ - Aprimorado com service workers para trabalhar off-line ou em redes de baixa qualidade.
* __Semelhante a aplicativos__ - Parece com aplicativos para os usuários, com interações e navegação de estilo de aplicativos, pois é compilado no modelo de shell de aplicativo.
* __Atual__ - Sempre atualizado graças ao processo de atualização do service worker.
* __Seguro__ - Fornecido via HTTPS para evitar invasões e garantir que o conteúdo não seja adulterado.
* __Descobrível__ - Pode ser identificado como "aplicativo" graças aos manifestos W3C e ao escopo de registro do service worker, que permitem que os mecanismos de pesquisa os encontrem.
* __Reenvolvente__ - Facilita o reengajamento com recursos como notificações push.
* __Instalável__ - Permite que os usuários "guardem" os aplicativos mais úteis em suas telas iniciais sem precisar acessar uma loja de aplicativos.
* __Linkável__ - Compartilhe facilmente por URL, não requer instalação complexa.

Este codelab orientará você a criar seu próprio Progressive Web App, incluindo considerações de design, além de detalhes de implementação para garantir que seu aplicativo atenda aos principais princípios de um Progressive Web App.

### O que vamos criar?

Neste codelab, você criará um app da Web de previsão do tempo usando técnicas de
Progressive Web App. Vamos considerar as propriedades de um Progressive Web App:

* **Progressivo** - usaremos o aprimoramento progressivo em todo o aplicativo.
* **Responsivo** - garantiremos que ele se encaixe em qualquer formato.
* **Independente de conectividade** - armazenaremos o shell do aplicativo em cache com service workers.
* **Similar a aplicativos** - usaremos interações de estilo de aplicativo para adicionar cidades e atualizar os dados.
* **Recente** - armazenaremos em cache os últimos dados com os service workers.
* **Seguro** - implantaremos o aplicativo em um host compatível com HTTPS.
* **Descobrível e instalável** - incluiremos um manifesto para facilitar que ele seja encontrado por mecanismos de pesquisa.
* **Vinculável** - é a Web!

### O que você aprenderá

* Como projetar e criar um aplicativo usando o método de "shell de aplicativo"
* Como fazer com que seu aplicativo funcione off-line
* Como armazenar dados para uso off-line posterior

### O que será necessário

* Chrome 52 ou superior
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), seu servidor de Web preferido
* O exemplo de código
* Um editor de texto
* Conhecimento básico de HTML, CSS, JavaScript e Chrome DevTools

Este codelab é focado em Progressive Web Apps. Conceitos não-relevantes e blocos de código são apenas pincelados e são fornecidos para que você simplesmente os copie e cole.


## Configuração




### Faça o download do código

Clique no botão abaixo para baixar todo o código para este codelab:

[Link](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

Descompacte o arquivo zip baixado. Isso irá descompactar uma pasta raiz (`your-first-pwapp-master`), que contém uma pasta para cada etapa deste codelab, juntamente com todos os recursos que você vai precisar.

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

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Em seguida, interrompa e reinicie o servidor, deslizando o botão de alternância marcado como "Web Server: STARTED" para a esquerda e de volta para a direita.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Agora, acesse seu site de trabalho no navegador da Web (clicando no URL Web Server em destaque) e você deve ver uma página com a seguinte aparência:

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

Obviamente, este aplicativo ainda não está fazendo nada interessante - até agora, é apenas um esqueleto mínimo com um controle giratório que estamos usando para verificar a funcionalidade do seu servidor de Web. Adicionaremos funcionalidade e recursos de IU em etapas posteriores. 


## Faça sua arquitetura de shell do aplicativo




### O que é o shell do aplicativo?

O shell do aplicativo é o HTML, CSS e JavaScript mínimos necessários para capacitar a interface do usuário de um Progressive Web App e é um dos componentes que garante um desempenho confiavelmente bom. Seu primeiro carregamento deve ser extremamente rápido e armazenado em cache imediatamente. "Armazenado em cm cache" significa que os arquivos do shell são carregados uma vez pela rede e salvos no dispositivo local. Toda vez que o usuário abre o aplicativo posteriormente, os arquivos do shell são carregados a partir do cache do dispositivo local, o que resulta em tempos de inicialização extremamente rápidos. 

A arquitetura de shell do aplicativo separa a infraestrutura principal do aplicativo e a IU dos dados. Toda a IU e a infraestrutura são armazenadas em cache localmente usando um service worker para que, em carregamentos subsequentes, o Progressive Web App só precise recuperar os dados necessários em vez de precisar carregar tudo.

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

Em outras palavras, o shell do aplicativo é semelhante a um pacote de código que você publicaria em uma loja de aplicativos ao compilar um aplicativo nativo. Ele consiste nos elementos principais necessários para criar seu aplicativo, mas é improvável que ele contenha os dados.

### Por que usar a arquitetura de shell de aplicativo?

O uso da arquitetura de shell de aplicativo permite que você se concentre na velocidade, fornecendo ao seu Progressive Web App propriedades semelhantes às dos aplicativos nativos: carregamento instantâneo e atualizações regulares sem a necessidade de uma loja de aplicativos.

### Projete o shell do aplicativo 

A primeira etapa é dividir o design em seus componentes principais.

Considere:

* O que precisa estar na tela imediatamente?
* Que outros componentes da IU são essenciais para seu aplicativo?
* Que recursos de suporte são necessários para o shell do aplicativo? Por exemplo, imagens, JavaScript, estilos etc.

Vamos criar um aplicativo de previsão do tempo como nosso primeiro Progressive Web App. Os componentes principais consistirão em:

* Cabeçalho com um título e botões de adição/atualização
* Contêiner para os cartões de previsão
* Um modelo de cartão de previsão
* Uma caixa de diálogo para adicionar novas cidades
* Um indicador de carregamento

Ao projetar um aplicativo mais completo, o conteúdo que não é necessário para o carregamento inicial pode ser solicitado posteriormente e armazenado em cache para uso futuro. Por exemplo, podemos adiar o carregamento da caixa de diálogo New City até após a renderização da primeira experiência de execução e a disponibilização de alguns ciclos de ociosidade.


## Implemente seu shell do aplicativo




Existem diversas maneiras de começar qualquer projeto e, geralmente, nós recomendamos o uso do Web Starter Kit. Mas, neste caso, para que nosso projeto seja o mais simples possível e para que nos concentremos nos Progressive Web Apps, nós fornecemos todos os recursos de que você precisará.

### Crie o HTML do shell do aplicativo

Agora adicionaremos os componentes essenciais discutidos em  [Arquitete o shell do aplicativo](/web/fundamentals/getting-started/your-first-progressive-web-app/step-01).

Lembre-se de que os componentes principais consistirão em:

* Cabeçalho com um título e botões de adição/atualização
* Contêiner para os cartões de previsão
* Um modelo de cartão de previsão
* Uma caixa de diálogo para adicionar novas cidades
* Um indicador de carregamento

O arquivo `index.html` que já está em seu diretório `work` deve ser algo parecido com isso (este é um subconjunto do conteúdo efetivo, não copie este código em seu arquivo):

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather PWA</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main">
    <div class="card cardTemplate weather-forecast" hidden>
    . . .
    </div>
  </main>

  <div class="dialog-container">
  . . .
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
```

Perceba que o carregador é visível por padrão. Isso garante que o usuário veja o carregador imediatamente conforme a página é carregada, o que oferece uma indicação clara de que o conteúdo está sendo carregado.

Para poupar tempo, já criamos a folha de estilo para seu uso.

### Verifique o código chave do aplicativo JavaScript

Agora que grande parte da IU está pronta, é hora de começar a conectar o código para fazer tudo funcionar. Como o restante do shell do aplicativo, tenha consciência dos códigos que são necessários como parte da experiência principal e o que pode ser carregado posteriormente.

Seu diretório de trabalho também já inclui o código do aplicativo (`scripts/app.js`). Nele, você encontrará:

* Um objeto `app` que contém algumas informações essenciais necessárias para o aplicativo.
* Os ouvintes de eventos para todos os botões no cabeçalho (`add/refresh`) e na caixa de diálogo de adição de cidade (`add/cancel`).
* Um método para adicionar ou atualizar os cartões de previsão (`app.updateForecastCard`).
* Um método para obter a previsão do tempo mais recente da Firebase Public  Weather API (`app.getForecast`).
* Um método para iterar os cartões atuais e chamar `app.getForecast` para obter  os últimos dados de previsão (`app.updateForecasts`).
* Alguns dados fictícios (`initialWeatherForecast`) que podem ser usados para testar rapidamente a renderização dos elementos.

### Faça testes

Agora que você tem o HTML, os estilos e o JavaScript principais, chegou a hora de testar o aplicativo.

Para ver como os dados falsos de meteorologia são processados, retire o comentário da seguinte linha na parte inferior do seu arquivo `index.html`:

    <!--<script src="scripts/app.js" async></script>-->

Em seguida, remova o comentário da seguinte linha na parte inferior do seu arquivo `app.js`:

    // app.updateForecastCard(initialWeatherForecast);

Atualize seu aplicativo. O resultado deve ser um cartão de previsão bem formatado (embora falso, como pode ser percebido pela data) cartão de previsão com o controle giratório desativado, como este:

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[Link](https://weather-pwa-sample.firebaseapp.com/step-04/)

Depois de experimentar e verificar que ele funciona como esperado, você pode remover a chamada para `app.updateForecastCard` com os dados falsos. Ela foi necessária apenas para garantir que tudo funcionava como esperado.


## Comece com um primeiro carregamento rápido




Progressive Web Apps devem ser iniciados rapidamente e disponibilizados para uso imediatamente. No seu estado atual, nosso aplicativo de previsão do tempo é iniciado rapidamente, mas não pode ser usado. Não há dados. Nós poderíamos fazer uma solicitação AJAX para obter os dados, mas isso resultaria em uma solicitação adicional e faria o carregamento inicial demorar mais. Em vez disso, forneça dados reais no primeiro carregamento.

### Injete os dados de previsão do tempo

Neste codelab, simularemos o servidor injetando a previsão do tempo diretamente no JavaScript, mas em um aplicativo de produção, os dados de previsão do tempo mais recentes seriam injetados pelo servidor com base na geolocalização do endereço IP do usuário.

O código já contém os dados que injetaremos. É a `initialWeatherForecast` que usamos no passo anterior.

### Diferenciando a primeira execução

Então, como podemos saber quando exibir essas informações, que podem não ser relevantes em carregamentos futuros, quando o aplicativo de previsão for coletado do cache? Quando o usuário carregar o aplicativo em visitas subsequentes, ele poderá estar em uma cidade diferente, então será preciso carregar as informações dessa cidade, não necessariamente da primeira cidade que foi procurada.

As preferências do usuário, como a lista de cidades nas quais um usuário está inscrito, devem ser armazenadas localmente usando o IndexedDB ou outro mecanismo de armazenamento rápido. Para simplificar este codelab o máximo possível, usamos [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), que não é ideal para aplicativos de produção por ser um mecanismo de armazenamento sincrônico com bloqueio que pode ser muito lento em alguns dispositivos.

Primeiro, vamos adicionar o código necessário para salvar as preferências do usuário. Localize o seguinte comentário TODO em seu código.

```
  // TODO add saveSelectedCities function here
```

E adicione o código a seguir abaixo do comentário.

```
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };
```

Em seguida, adicionamos o código de inicialização para verificar se o usuário salvou alguma cidade e renderizar esses dados, ou usar os dados injetados. Localize o seguinte comentário:

```
  // TODO add startup code here
```

E adicione o código a seguir abaixo desse comentário:

```
/************************************************************************
   *
   * Code required to start the app
   *
   * OBSERVAÇÃO: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }
```

O código de inicialização verifica se existem cidades salvas no armazenamento local. Se houver, ele analisa os dados de armazenamento local e exibe um cartão de previsão para cada uma das cidades salvas. Caso contrário, o código de inicialização usa apenas os dados falsos de previsão e salva isso como a cidade padrão.

### Salvar as cidades selecionadas

Finalmente, você precisa modificar o gerenciador do botão "add city" para salvar a cidade escolhida no armazenamento local.

Atualize seu gerenciador de clique `butAddCity` para que ele corresponda ao seguinte código:

```
document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {
      app.selectedCities = [];
    }
    app.getForecast(key, label);
    app.selectedCities.push({key: key, label: label});
    app.saveSelectedCities();
    app.toggleAddDialog(false);
  });
```

As novas adições são a inicialização de `app.selectedCities` se ele não existir, e as chamadas para `app.selectedCities.push()` e `app.saveSelectedCities()`.

### Faça testes

* Na primeira execução, seu aplicativo deve imediatamente mostrar ao usuário a previsão de `initialWeatherForecast`.
* Adicione uma nova cidade (clicando no ícone + no canto superior direito) e verifique se dois cartões são exibidos.
* Atualize o navegador e verifique se o aplicativo carrega ambas as previsões do tempo e mostra  as informações mais recentes.

[Link](https://weather-pwa-sample.firebaseapp.com/step-05/)


## Use service workers para pré-armazenar em cache no shell do aplicativo




Progressive Web Apps precisam ser rápidos e instaláveis, o que significa que eles devem funcionar on-line, off-line ou em condições intermitentes e lentas. Para conseguir isso, precisamos armazenar em cache nosso shell de aplicativo usando service worker para que ele seja sempre disponibilizado de forma rápida e confiável. 

Se não tiver experiência com service workers, você pode obter uma noção básica lendo [Introdução aos service workers](/web/fundamentals/primers/service-worker/) sobre o que eles podem fazer, como seu ciclo de vida funciona e muito mais. Após concluir este codelab, certifique-se de verificar o [codelab Depurar Service Workers](https://goo.gl/jhXCBy) para ter uma visão mais detalhada de como trabalhar com service workers.

Recursos fornecidos por service workers devem ser considerados aprimoramentos progressivos e adicionados apenas se o navegador for compatível. Por exemplo, com service workers, você pode armazenar em cache o shell de aplicativo e os dados do seu aplicativo para que eles estejam disponíveis mesmo quando a rede não estiver. Quando service workers não forem compatíveis, o código off-line não será chamado e o usuário terá uma experiência básica. O uso da detecção de recursos para fornecer aprimoramentos progressivos incorre em poucos custos adicionais e não falhará em navegadores mais antigos incompatíveis com o recurso.

### Registre o service worker se ele estiver disponível

A primeira etapa necessária para fazer com que o aplicativo funcione off-line é registrar um service worker, um script que oferece a funcionalidade off-line sem precisar de uma página da Web aberta ou de interação do usuário.

Bastam duas etapas simples:

1. Instrua o navegador a registrar o arquivo JavaScript como o service worker.
2. Crie um arquivo JavaScript que contendo o service worker.

Primeiro, precisamos verificar se o navegador oferece suporte a service workers e, em caso positivo, registrar o service worker. Adicionar o seguinte código ao `app.js` (após o comentário `// TODO add service worker code here`):

```
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

### Armazene em cache os ativos do site

Quando o service worker é registrado, um evento de instalação é acionado na primeira vez que o usuário visitar a página. Nesse gerenciador de eventos, nós armazenaremos em cache todos os ativos dos quais o aplicativo precisa.

Quando o service worker é acionado, ele deve abrir o objeto  [caches](https://developer.mozilla.org/en-US/docs/Web/API/Cache) e preenchê-lo com os ativos necessários para carregar o shell do aplicativo. Crie um arquivo chamado `service-worker.js` na pasta raiz do seu aplicativo (que deve ser o diretório `your-first-pwapp-master/work`). Esse arquivo  deve estar ativo na raiz do aplicativo, poiso escopo dos service workers é definido pelo diretório onde o arquivo se encontra. Adicione este código ao seu novo arquivo `service-worker.js`:

```
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

Primeiro, precisamos abrir o cache com `caches.open()` e fornecer um nome de cache. Fornecer um nome de cache nos permite distinguir as versões dos arquivos, ou separar os dados do shell do aplicativo para atualizarmos um sem afetar o outro com facilidade.

Quando cache estiver aberto, podemos chamar `cache.addAll()`, que aceita uma lista de URLs e os recupera do servidor e os adiciona à resposta ao cache. Infelizmente, `cache.addAll()` é atômico e, se qualquer arquivo falhar, toda a etapa do cache também falha.

Muito bem, vamos começar nos familiarizar com a forma como você pode usar DevTools para entender e debug service workers. Antes de recarregar sua página, abra DevTools, vá ao painel __Service Worker__ no painel __Application__. Ele deve ter a aparência a seguir.

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

Quando se vê uma página em branco como esta, isso significa que a página atualmente aberta não possui service workers registrados.

Agora, atualize sua página. O painel Service Worker deve ter a aparência a seguir.

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

Quando você vê informações como estas, isso significa que a página tem um service worker em execução.

OK, agora faremos um breve desvio para demonstrar um problema que você pode encontrar ao desenvolver service workers. Para demonstrar, vamos adicionar um ouvinte de evento `activate` abaixo do ouvinte de evento `install`  em seu arquivo `service-worker.js`. 

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

O evento `activate` é acionado quando o service worker inicia.

Abra o Console do DevTools e recarregue a página, alterne para o painel Service Worker no painel Application e clique em inspecionar no service worker ativado. Você espera ver a mensagem `[ServiceWorker] Activate` registrada para o console, mas isso não aconteceu. Confira seu painel Service Worker e você pode ver que o novo service worker (que inclui ativar o ouvinte de evento) parece estar em um estado de "espera".

![1f454b6807700695.png](img/1f454b6807700695.png)

Basicamente, o antigo service worker continua a controlar a página enquanto houver uma guia aberta para página. Então, você *poderia* fechar e reabrir a página ou pressionar o botão __skipWaiting__, mas uma solução de longo prazo é simplesmente ativar a caixa de seleção __Update on Reload__ no painel Service Worker do DevTools. Quando esta caixa de seleção está ativada, o service worker é forçosamente atualizado toda vez que a página recarrega.

Ative a caixa de seleção __atualizar ao recarregar__ e recarregue a página para confirmar que o novo service worker é ativado.

__Observação:__ Você pode ver um erro no painel Service Worker do painel Application semelhante ao mostrado abaixo, é __seguro__  ignorar este erro.

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

Por enquanto é só sobre a inspeção e depuração de service workers no DevTools. Mostraremos  mais alguns truques depois. Vamos voltar para a construção do seu aplicativo.

Vamos expandir sobre o ouvinte de evento `activate` para incluir alguma lógica para atualizar o cache. Atualize seu código para coincidir com o código abaixo.

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
```

Este código garante que o service worker atualiza seu cache sempre que qualquer um dos arquivos do shell do aplicativo mudar. Para que isso funcione, você precisa incrementar a variável `cacheName` na parte superior do seu arquivo do service worker.

A última declaração corrige um corner case sobre o qual você pode ler na caixa de informações (opcional) abaixo.

Por fim, vamos atualizar a lista de arquivos necessários para o shell do aplicativo. Na matriz, precisamos incluir todos os arquivos dos quais o aplicativo precisa, incluindo imagens, JavaScript, folhas de estilo etc. Perto do topo do seu arquivo `service-worker.js`, substitua `var filesToCache = [];` pelo o código abaixo:

```
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
```

Nosso aplicativo ainda não funciona off-line. Nós armazenamos em cache os componentes do shell do aplicativo, mas ainda precisamos carregá-los do cache local.

### Forneça a estrutura do aplicativo do cache

Service workers fornecem a capacidade de interceptar solicitações feitas do nosso Progressive Web App e gerenciá-las no service worker. Isso significa que podemos determinar como queremos gerenciar a solicitação e potencialmente fornecer nossa própria resposta de cache.

Por exemplo:

```
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

Agora vamos fornecer a estrutura do aplicativo do cache. Adicione o seguinte código na parte inferior do seu arquivo `service-worker.js`:

```
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

De dentro para fora, o `caches.match()` avalia a solicitação da Web que acionou o evento de [busca](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) e verifica se ele está disponível no cache. Em seguida, ele responde com a versão do cache ou usa `fetch` para obter uma cópia da rede. A `response` é passada à página da Web com `e.respondWith()`.

### Faça testes

Agora seu aplicativo tem funcionalidade off-line. Vamos experimentar.

Atualize sua página e, em seguida, vá para o painel __Cache Storage__ no painel __Application__ do DevTools. Expanda a seção e você deve ver o nome do cache do seu shell do aplicativo listado do lado esquerdo. Ao clicar no cache do seu shell do aplicativo, você pode ver todos os recursos que estão armazenados em cache atualmente.

![ab9c361527825fac.png](img/ab9c361527825fac.png)

Agora, vamos testar o modo off-line. Volte para o painel __Service Worker__ do DevTools e ative a caixa de seleção __Offline__. Após ativá-la, você deve ver um ícone de aviso amarelo pequeno ao lado da guia do painel __Network__. Isto indica que você está off-line.

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

Atualize sua página e... ela funciona! Quer dizer, mais ou menos. Observe como ela carrega os dados meteorológicos iniciais (falsos).

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

Confira a cláusula `else` em `app.getForecast()` para entender por que o aplicativo consegue carregar os dados falsos.

O próximo passo é modificar a lógica do aplicativo e do service worker para poder armazenar dados meteorológicos em cache e retornar os dados mais recentes do cache quando o aplicativo estiver off-line.

__Dica:__ Para começar do zero, limpar todos os dados salvos (localStoarge, dados de indexedDB, arquivos armazenados em cache) e remover quaisquer service workers, use o painel Clear storage na guia Application.

[Link](https://weather-pwa-sample.firebaseapp.com/step-06/)

### Tenha cuidado com os casos de borda

Como já mencionamos, esse código __não deve ser usado em produção__ devido aos muitos casos de borda não gerenciados.

#### O cache depende da atualização de cada chave de cache para cada alteração

Por exemplo, esse método de armazenamento em cache exige que você atualize a chave de cache sempre que o conteúdo for alterado, caso contrário, o cache não será atualizado e o conteúdo antigo será fornecido. Portanto, não deixe de alterar a chave de cache após cada alteração enquanto trabalha no seu projeto.

#### Exige que tudo seja baixado novamente para cada alteração

Outra desvantagem é que todo o cache é invalidado e precisa ser baixado novamente sempre que um arquivo é alterado. Isso significa que a correção de um simples erro de ortografia invalidará o cache e exigirá que tudo seja baixado novamente. Isso não é muito eficiente.

#### O cache do navegador pode impedir que o service worker seja atualizado

Existe outra ressalva. É essencial que a solicitação HTTPS realizada durante o gerenciador de instalação vá diretamente para a rede e não retorne uma resposta do cache do navegador. Caso contrário, o navegador poderá retornar a versão de cache antiga, resultando em um service worker que nunca é atualizado realmente.

#### Tenha cuidado com estratégias que priorizam o cache em produção

Nosso aplicativo usa uma estratégia que prioriza o cache, o que resulta em uma cópia de qualquer conteúdo no cache sendo retornada sem consultar a rede. Embora esse tipo de estratégia seja fácil de implementar, ela pode causar problemas no futuro. Depois que a cópia da página do host e do registro do service worker é armazenada em cache, pode ser extremamente difícil alterar a configuração do service worker (pois a configuração depende de onde ele foi definido) e você pode acabar implantando sites muito difíceis de atualizar.

#### Como posso evitar esses casos de borda?

Então, como evitar esses casos de borda? Use uma biblioteca como [sw-precache](https://github.com/GoogleChrome/sw-precache), que oferece um controle preciso do que é expirado, garante que as solicitações vão diretamente para a rede e faz todo o trabalho pesado para você.

### Dicas para testar service workers ao vivo

A depuração de service workers pode ser um desafio e, quando ela envolve o cache, o problema pode ser ainda maior se o cache não for atualizado quando você espera. Entre o ciclo de vida de um service worker e os erros típicos no seu código, você pode se frustrar rapidamente. Mas não desanime. Existem algumas ferramentas que podem facilitar sua vida.

#### Começar do zero

Em alguns casos, você pode perceber que está carregando dados armazenados em cache ou que as coisas não são atualizadas conforme o esperado. Para limpar todos os dados salvos (localStoarge, dados de indexedDB, arquivos armazenados em cache) e remover quaisquer service workers, use o painel Clear storage na guia Application.

Algumas outras dicas:

* Depois que o registro de um service worker é cancelado, ele pode permanecer listado até que  a janela de navegador que o contém seja fechada.
* Se várias janelas do seu aplicativo estiverem abertas, o novo service worker não  entrará em vigor até que todas tenham sido recarregadas e atualizadas para o  service worker mais recente.
* Cancelar o registro de um service worker não limpa o cache, então pode ser que você continue  a receber dados antigos se o nome do cache não tiver sido alterado.
* Se um service worker existir e um novo for registrado, o novo  service worker não assumirá o controle até que a página seja recarregada, a não ser que você assuma [controle  imediato](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control).


## Use service workers para armazenar em cache os dados de previsão




Escolher a estratégia de [armazenamento em cache](https://jakearchibald.com/2014/offline-cookbook/) certa é essencial e depende do tipo de dados apresentado por seu aplicativo. Por exemplo, dados que dependem do momento, como dados meteorológicos ou a cotação da bolsa, devem ser o mais atualizados possível, enquanto imagens de avatar ou o conteúdo de artigos podem ser atualizados com menos frequência. 

A estratégia [cache-primeiro-depois-rede](https://jakearchibald.com/2014/offline-cookbook/#cache-network-race) é ideal para o nosso aplicativo. Ele apresenta dados na tela com a máxima rapidez possível e atualiza esses dados quando a rede retornar as informações mais recentes. Em comparação com a estratégia que prioriza a rede e depois o cache, o usuário não precisa aguardar até que o evento [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) atinja o tempo limite para obter os dados do cache.

Priorizar o cache em vez da rede significa que precisamos acionar duas solicitações assíncronas, uma para o cache e outra para a rede. Nossa solicitação de rede com o aplicativo não precisa mudar muito, mas devemos modificar o service worker para armazenar a resposta em cache antes de retorná-la.

Em circunstâncias normais, dos dados do cache serão retornados quase imediatamente, fornecendo ao aplicativo dados recentes que podem ser usados. Em seguida, quando a solicitação de rede retornar, o aplicativo será atualizado usando os dados mais recentes da rede.

### Intercepte a solicitação de rede e armazene a resposta em cache

Nós precisamos modificar o service worker para interceptar solicitações para a Weather API e armazenar suas respostas no cache para que possamos acessá-las com facilidade posteriormente. Na estratégia que prioriza o cache em vez da rede, esperamos que a resposta da rede seja a "fonte da verdade", sempre nos fornecendo as informações mais recentes. Se isso não for possível, não há problema, pois já recuperamos os dados de cache mais recentes no nosso aplicativo.

No service worker, vamos adicionar um `dataCacheName` para que possamos separar os dados do aplicativo do shell do aplicativo. Quando o shell do aplicativo for atualizado e os caches mais antigos forem limpos, nossos dados estarão intocados, prontos para um carregamento rápido. Lembre-se de que, se o formato dos seus dados for alterado no futuro, você precisará de uma maneira para gerenciar isso e garantir que o shell do aplicativo e o conteúdo permaneçam sincronizados.

Adicione a seguinte linha à parte superior do seu arquivo `service-worker.js`:

```
var dataCacheName = 'weatherData-v1';
```

Em seguida, atualize o gerenciador de eventos `activate` para não excluir o cache de dados ao limpar o cache do shell do aplicativo.

```
if (key !== cacheName && key !== dataCacheName) {
```

Finalmente, atualize o gerenciador de eventos `fetch` para gerenciar solicitações para a API de dados separadamente de outras solicitações.

```
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

O código intercepta a solicitação e verifica se o URL é iniciado pelo endereço da Weather API. Em caso positivo, usaremos   [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) para realizar a solicitação. Quando a resposta for retornada, nosso código abrirá o cache, clonará a resposta, a armazenará no cache e, por fim, a retornará para o solicitador original.

Nosso aplicativo ainda não funciona off-line. Já implementamos o armazenamento em cache e a recuperação para o shell do aplicativo, mas mesmo armazenando dados em cache, o aplicativo ainda não verifica o cache para ver se há algum dado meteorológico. 

### Realizando as solicitações

Como já mencionamos, o aplicativo precisa acionar duas solicitações assíncronas, uma para o cache e outra para a rede. O aplicativo usa o objeto `caches` disponível em `window` para acessar o cache e recuperar os dados mais recentes. Esse é um exemplo excelente de aprimoramento progressivo, pois o objeto `caches` pode não estar disponível em todos os navegadores e, se não houver uma solicitação de rede, ele ainda funcionará.

Para isso, é preciso:

1. Verificar se o objeto `caches` está disponível no objeto global `window`.
2. Solicitar dados do cache. 

* Se a solicitação do servidor ainda estiver pendente, atualizar o aplicativo com os dados em cache.

3. Solicitar dados do servidor.

* Salvar os dados para acesso rápido posteriormente.
* Atualizar o aplicativo com os dados mais recentes do servidor.

#### Obter dados do cache

Em seguida, precisamos verificar se o objeto `caches` existe e solicitar os dados mais recentes dele. Localize o comentário `TODO add cache logic here` em `app.getForecast()`, e depois adicione o código abaixo do comentário.

```
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            app.updateForecastCard(results);
          });
        }
      });
    }
```

Nosso aplicativo de previsão do tempo agora realiza duas solicitações de dados assíncronas, uma para o `cache`e a outra via XHR. Se houver dados no cache, eles serão retornados e renderizados com extrema rapidez (dezenas de milissegundos) e atualizarão o cartão somente se o XHR ainda estiver pendente. Em seguida, quando o XHR responder, o cartão será atualizado com os dados mais recentes diretamente da weather API.

Repare como a solicitação de cache e a solicitação XHR terminam com uma chamada para atualizar o cartão de previsão. Como o app sabe se ele está exibindo os dados mais recentes? Isso é gerenciado no seguinte código de `app.updateForecastCard`:

```
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
```

Toda vez que um cartão é atualizado, o aplicativo armazena o timestamp dos dados em um atributo oculto no cartão. O aplicativo só resgata se o timestamp que já existe no cartão for mais recente que os dados que foram passados para a função.

### Faça testes

Agora aplicativo deve ser completamente funcional off-line. Salve algumas cidades e pressione o botão de atualização no aplicativo para obter dados meteorológicos atuais, e depois fique off-line e recarregue a página. 

Em seguida, vá para o painel __Cache Storage__ no painel __Application__ do DevTools. Expanda a seção e você deve ver o nome do cache do seu shell do aplicativo e cache de dados listado do lado esquerdo. Abrir o cache de dados deve mostrar os dados armazenados para cada cidade.

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[Link](https://weather-pwa-sample.firebaseapp.com/step-07/)


## Ofereça suporte à integração nativa




Ninguém gosta de digitar URLs longos em um dispositivo móvel se não for absolutamente necessário. Com o recurso de adicionar à tela inicial, seus usuários podem optar por adicionar um link de atalho ao seu dispositivo nativo da mesma forma que instalariam um aplicativo nativo de uma loja de app, mas com menos atrito.

### Banners de instalação de aplicativos da Web e recurso de adicionar à tela inicial para o Chrome no Android

Os banners de instalação de aplicativos web permitem que seus usuários adicionem seu aplicativo web forma rápida e tranquila à tela inicial do seu dispositivo, o que facilita a inicialização e o retorno ao aplicativo. É muito fácil adicionar banners de instalação de aplicativo e o Chrome realiza a maior parte do trabalho para você. Basta incluir um arquivo de manifesto de app da Web com detalhes sobre o aplicativo.

Em seguida, o Chrome usa um conjunto de critérios, incluindo o uso de um service worker, status de SSL e dados heurísticos de frequência de visitas para determinar quando mostrar o banner. Além disso, um usuário pode adicionar o aplicativo manualmente pelo botão de menu "Add to Home Screen" no Chrome.

#### Declare um manifesto de aplicativo com um arquivo `manifest.json`

O manifesto do app da Web é um arquivo JSON simples que proporciona a você, desenvolvedor, a capacidade de controlar a aparência do seu aplicativo para o usuário nas áreas onde ele pode ver aplicativos (por exemplo, na tela inicial do celular), direcionar o que o usuário pode acessar e, o mais importante, como pode acessar.

Usando o manifesto do app da Web, seu aplicativo pode:

* Ter uma presença avançada na tela inicial do Android do usuário
* Ser iniciado no modo de tela inteira no Android sem uma barra de URL
* Controlar a orientação da tela para proporcionar uma visualização ideal
* Definir uma experiência de inicialização com "tela de apresentação" e uma cor de tem para o site
* Acompanhar se o aplicativo foi iniciado da tela inicial ou da barra de URL

Crie um arquivo com o nome `manifest.json` em sua pasta `work` e copie/cole os conteúdos a seguir:

```
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

O manifesto uma variedade de ícones, destinados a diferentes tamanhos de tela. No momento da redação deste artigo, Chrome e Opera Mobile, os únicos navegadores que suportam manifestos de apps da Web, não usam nada menor que 192px.

Uma maneira fácil de controlar como o aplicativo é inicializado é adicionar uma string de consulta ao parâmetro `start_url` e depois usar um pacote de análise para rastrear a string de consulta Se usar esse método, lembre-se de atualizar a lista de arquivos em cache pelo App Shell para garantir que o arquivo com a string de consulta está armazenado no cache.

#### Envie informações sobre seu arquivo de manifesto ao navegador

Agora, adicione a linha a seguir na parte inferior do elemento `<head>` no seu arquivo `index.html`: 

```
<link rel="manifest" href="/manifest.json">
```

#### Práticas recomendadas

* Coloque o link do manifesto em todas as páginas do seu site para que ele seja recuperado pelo Chrome logo na primeira visita do usuário, independentemente de qual seja a página de destino.
* O `short_name` é preferencial no Chrome e será usado se ele estiver presente em vez do campo nome.
* Defina conjuntos de ícones para telas de diferentes densidades. O Chrome tentará usar o ícone mais próximo a 48 dp, por exemplo, 96 pixels em um dispositivo de 2x ou 144 pixels em um dispositivo de 3x.
* Lembre-se de incluir um ícone com um tamanho adequado para uma tela de apresentação e não se esqueça de definir o elemento `background_color`.

Leitura adicional:

[Como usar banners de instalação de aplicativo](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### Elementos de adição à tela inicial para Safari no iOS

No seu `index.html`, adicione o seguinte à parte inferior do elemento `<head>`:

```
  <!-- Add to home screen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

### Ícone de bloco para janelas

No seu `index.html`, adicione o seguinte à parte inferior do elemento `<head>`:

```
  <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#2F3BA2">
```

### Faça testes

Nesta seção, mostraremos algumas maneiras de testar o manifesto do seu app da Web.

A primeira maneira é DevTools. Abra o painel __Manifest__ no painel __Application__. Se adicionou as informações do manifesto corretamente, você poderá vê-las analisadas e exibidas em um formato de fácil leitura para seres humanos neste painel.

Também é possível testar o recurso de adicionar à tela principal característica a partir deste painel. Clique no botão __Add to homescreen__. Você deve ver uma mensagem "adicionar este site à sua estante" abaixo da sua barra de URL, como na imagem abaixo.

![cbfdd0302b611ab0.png](img/cbfdd0302b611ab0.png)

Este é o equivalente para desktop do recurso adicionar à tela principal de dispositivos móveis. Se conseguir acionar esta solicitação com sucesso em desktop, você pode ter certeza de que usuários de dispositivos móveis conseguem adicionar seu aplicativo a seus aparelhos.

A segunda maneira de testar é via Web Server for Chrome. Com esta abordagem, você expõe seu servidor de desenvolvimento local (no seu desktop ou laptop) a outros computadores, e depois basta acessar seu Progressive Web App de um dispositivo móvel real.

Na caixa de diálogo do Web Server for Chrome, selecione a opção `Accessible on local network`:

![81347b12f83e4291.png](img/81347b12f83e4291.png)

Alterne o Web Server para `STOPPED` e de volta para `STARTED`. Você verá um novo URL que pode ser usado para acessar o aplicativo remotamente.

Agora, acesse seu site a partir de um dispositivo móvel, usando o novo URL.

Você verá erros do service worker no console ao testar desta forma, porque o Service Worker não está sendo servido por HTTPS.

Usando o Chrome a partir de um dispositivo Android, tente adicionar o aplicativo à tela inicial e verificar que a tela de inicialização aparece corretamente e os ícones corretos são utilizados.

No Safari e no Internet Explorer, você também pode adicionar o aplicativo à sua tela inicial manualmente.

[Link](https://weather-pwa-sample.firebaseapp.com/step-08/)


## Implante em um host seguro e comemore!




A etapa final é implantar nosso aplicativo de previsão do tempo em um servidor que ofereça suporte a HTTPS. Se ainda não tiver um, a abordagem mais fácil (e gratuita) é usar o conteúdo estático hospedado no Firebase. Ele é muito fácil de usar, fornece conteúdo por HTTPS e tem o apoio de uma CDN global.

### Crédito extra: CSS minificado e em linha

Mais de uma consideração deve feita ao minificar os estilos principais e adicioná-los em linha diretamente no `index.html`. O [Page Speed Insights](/speed) recomenda fornecer o conteúdo acima da dobra dos primeiros 15 mil bytes da solicitação.

Veja até onde você pode reduzir a solicitação inicial com todos os elementos em linha.

Leitura adicional: [Regras do Page Speed Insight](/speed/docs/insights/rules)

### Implemente no Firebase

Se nunca tiver usado o Firebase, você deverá criar uma conta e instalar algumas ferramentas primeiro.

1. Crie uma conta do Firebase em  [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Instale as ferramentas do Firebase via npm: `npm install -g firebase-tools`

Após criar a conta e fazer login, você estará pronto para implantar!

1. Crie um novo aplicativo em  [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Se não tiver feito login nas ferramentas do Firebase recentemente, atualize suas credenciais: `firebase login`
3. Inicialize seu aplicativo e forneça o diretório (provavelmente `work`) onde se encontra o aplicativo concluído: `firebase init`
4. Por fim, implemente seu aplicativo no Firebase: `firebase deploy`
5. Comemore. Pronto! Seu aplicativo será implantado no domínio:    `https://YOUR-FIREBASE-APP.firebaseapp.com`

Leitura adicional: [Guia de hospedagem do Firebase](https://www.firebase.com/docs/hosting/guide/)

### Faça testes

* Tente adicionar o aplicativo à sua tela inicial e desconecte a rede para verificar se o aplicativo funciona off-line conforme o esperado.

[Link](https://weather-pwa-sample.firebaseapp.com/final/)





## Encontrou um problema ou tem feedback? {: .hide-from-toc }
Ajude-nos a melhorar nossos codelabs reportando um 
[problema](https://github.com/googlecodelabs/your-first-pwapp/issues) hoje. E obrigado!


{# wf_devsite_translation #}
