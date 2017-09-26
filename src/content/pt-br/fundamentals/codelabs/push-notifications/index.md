project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Neste codelab você aprenderá como adicionar notificações push ao seu app da Web.

{# wf_updated_on: 2016-11-21T15:42:20Z #}
{# wf_published_on: 2016-01-01 #}


# Adicionar Notificações Push a um app da Web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



Visão geral do ## 




Mensagens push fornecem uma maneira simples e eficaz para voltar a interagir com seus usuários e neste codelab você vai aprender como adicionar notificações push ao seu app da Web.

### O que você aprenderá

* Como se inscrever e cancelar a inscrição de um usuário para mensagens push
* Como lidar com a entrada de mensagens push
* Como exibir uma notificação
* Como responder a cliques de notificação

### O que será necessário

* Chrome 52 ou superior
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), seu servidor de Web preferido
* Um editor de texto
* Conhecimento básico de HTML, CSS, JavaScript e Chrome DevTools
* O exemplo de código, consulte Obter Configuração


## Obter Configuração




### Faça download do exemplo de código

Você  pode obter o exemplo de código para este código fazendo download do zip aqui:

[Link](https://github.com/googlechrome/push-notifications/archive/master.zip)

ou clonando este repositório git:

    git clone https://github.com/GoogleChrome/push-notifications.git

Se você baixou a fonte como um zip, descompactá-lo deve fornecer uma pasta raiz `push-notifications-master`.

### Instale e verifique o servidor de Web

Embora você seja livre para usar seu próprio servidor de Web, este codelab é projetado para funcionar bem com o Chrome Web Server. Se ainda não tem esse aplicativo instalado, você pode instalá-lo pela Chrome Web Store.

[Link](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Após instalar o aplicativo Web Server for Chrome, clique no atalho Apps na barra de favoritos: 

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

Na janela seguinte, clique no ícone do Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

Você verá esta caixa de diálogo, que lhe permite configurar seu servidor de Web local:

![433870360ad308d4.png](img/433870360ad308d4.png)

Clique no botão __choose folder__, e selecione a pasta do app. Isto permitirá servir o seu trabalho em andamento pelo URL em destaque na caixa de diálogo do servidor de Web (na seção __Web Server URL(s)__).

Em Options, marque a caixa ao lado de "Automatically show index.html", como mostrado abaixo:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Em seguida, interrompa e reinicie o servidor, deslizando o botão de alternância marcado como "Web Server: STARTED" para a esquerda e de volta para a direita.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Agora, visite seu site no seu navegador da Web (clicando no URL Web Server em destaque) e você deve ver uma página com a seguinte aparência:

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### Atualize sempre o service worker

Durante o desenvolvimento é útil garantir que seu service worker esteja sempre atualizado e tenha as últimas alterações.

Para configurar isso no Chrome, abra DevTools (clique com o botão direito do mouse > Inspect) e vá para o painel __Application__, clique na guia __Service Workers__ e marque a caixa de seleção __Update on Reload__. Quando esta caixa de seleção está ativada, o service worker é forçosamente atualizado toda vez que a página recarrega.

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## Registrar um Service Worker




No seu diretório `app`, perceba que você tem um arquivo vazio chamado `sw.js`. Este arquivo será o seu service worker. Por enquanto ele pode ficar vazio, adicionaremos código a ele mais tarde.

Primeiro, precisamos registrar este arquivo como nosso Service Worker.

Nossa página `app/index.html` carrega `scripts/main.js`, e é neste arquivo de JavaScript que registraremos nosso service worker.

Adicione o código a seguir ao `scripts/main.js`:

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

Esse código verifica se service workers e mensagens push são suportados pelo navegador atual e, caso sejam, ele registra nosso arquivo `sw.js`.

#### Experimente

Verifique suas alterações, abrindo o URL __127.0.0.1:8887__ no navegador.

Abra Chrome DevTools para verificar o console quanto a `Service Worker is registered`, assim:

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### Obtenha as Chaves do Servidor do Aplicativo

Para trabalhar com este codelab, você precisa gerar algumas chaves de servidor de aplicativo, o que podemos fazer com este site associado: [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)

Aqui você pode gerar um par de chaves pública e privada.

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

Copie a chave pública para `scripts/main.js` substituindo o valor `<Your Public Key>`:

```
const applicationServerPublicKey = '<Your Public Key>';
```

Observação: Nunca se deve colocar sua chave privada no aplicativo da Web!


## Inicializar Estado




No momento, o botão do aplicativo da Web está desativado e não pode ser clicado. Isso ocorre porque é uma boa prática desativar o botão de push por padrão e ativá-lo quando se sabe que push é suportado e pode-se saber se o usuário está inscrito ou não.

Vamos criar duas funções em `scripts/main.js`, uma chamada `initialiseUI`, que vai verificar se o usuário está inscrito, e uma chamada `updateBtn`, que habilitará nosso botão e mudará o texto dependendo se do status de inscrição do usuário.

Nossa função `initialiseUI` deve ter a seguinte aparência:

```
function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Nosso novo método usa o `swRegistration` da etapa anterior e chama `getSubscription()` em seu `pushManager`. `getSubscription()` é um método que retorna uma promessa que se resolve com a inscrição atual, se houver; caso contrário, ele retorna `null`. Com isso, podemos verificar se o usuário já está inscrito ou não, definir um estado e depois chamar `updateBtn()`, para que o botão possa ser ativado com algum texto útil.

Adicione o código a seguir para implementar a função `updateBtn()`.

```
function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Esta função simplesmente muda o texto, dependendo do status de inscrição do usuário e, em seguida, ativa o botão.

A última coisa a fazer é chamar `initialiseUI()` quando nosso service worker está registrado.

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### Experimente

Abra seu app da Web, você deve ver que o botão 'Enable Push Messaging' agora está ativado (é possível clicar nele) e deve ver ‘User NOT subscribed.' no console. 

![15f6375617c11974.png](img/15f6375617c11974.png)

Com o progresso ao longo do codelab, você deve ver o texto do botão mudar quando o usuário está inscrito/não inscrito.


## Inscreva o usuário




No momento, nosso botão 'Enable Push Messaging' não faz quase nada, então vamos consertar isso. 

Adicione um ouvinte de clique ao nosso botão na função `initialiseUI()`, assim:

```
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Quando o usuário clica no botão de push, primeiro desativamos o botão, apenas para certificar que o usuário não possa clicar nele uma segunda vez enquanto o estamos inscrevendo para push, pois isso pode levar algum tempo.

Em seguida, chamamos `subscribeUser()` quando sabemos que o usuário não está inscrito atualmente, portanto, copie e cole o código a seguir no `scripts/main.js`.

```
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

Vamos analisar o que este código está fazendo e como está inscrevendo o usuário para mensagens push.

Primeiro, tomamos a chave pública do servidor do aplicativo, que é codificada com base em URL 64 seguro, e a convertemos em um `UInt8Array`, pois esta é a interação esperada da chamada de inscrição. Já lhe demos a função `urlB64ToUint8Array` no topo de `scripts/main.js`.

Depois de converter o valor, chamamos o método `subscribe()` no `pushManager` do nosso service worker, passando a chave pública do nosso servidor de aplicativo e o valor `userVisibleOnly: true`.

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

O parâmetro `userVisibleOnly` é, basicamente, uma admissão de que você vai mostrar uma notificação cada vez que um push for enviado. No momento desta redação, este valor é obrigatório e deve ser verdadeiro.

Chamar `subscribe()`  retorna uma promessa que se resolverá após as seguintes etapas:

1. O usuário concedeu permissão para exibir notificações.
2. O navegador enviou uma solicitação de rede a um serviço de push para obter os detalhes para gerar um PushSubscription.

A promessa `subscribe()` se resolve com um `PushSubscription` se essas etapas tiverem sido bem sucedidas. Se o usuário não conceder permissão, ou se houver qualquer problema para inscrever o usuário, a promessa será rejeitada com um erro. Isso nos dá a seguinte cadeia de promessa em nosso codelab:

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
```

Com isso, obtemos uma assinatura e tratamos o usuário como inscrito, ou pegamos o erro e o imprimimos para o console. Em ambos os cenários, chamamos `updateBtn()` para garantir que o botão seja reativado e tenha o texto apropriado.

O método `updateSubscriptionOnServer` é um método onde, em um aplicativo real enviaríamos nossa inscrição para um back-end; porém, para o nosso codelab, vamos imprimir a inscrição em nossa IU, que nos será útil mais tarde. Adicione este método a `scripts/main.js`:

```
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

#### Experimente

Se voltar ao seu app da Web e tentar clicar no botão, você deve ver uma solicitação de permissão como esta:

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

Se conceder a permissão, você deve ver o console imprimir `User is subscribed:` com o `PushSubscription`, o texto do botão mudará para 'Disable Push Messaging' e poderá ver a inscrição como JSON na parte inferior da página.

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## Permissão de Gerenciamento Negada




Uma coisa que ainda não tratamos é o que acontece se o usuário bloquear a solicitação de permissão. Isso precisa de uma consideração exclusiva, porque se o usuário bloquear a permissão, nosso app da Web não será capaz de voltar a mostrar a solicitação de permissão e não poderá inscrever o usuário, portanto, precisamos desativar pelo menos um botão push para que o usuário sabe que ele não pode ser usado.

O lugar óbvio para gerenciarmos este cenário é na função `updateBtn()`. Tudo que precisamos fazer é verificar o valor `Notification.permission`, assim:

```
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Sabemos que, se a permissão for `denied`, o usuário não pode ser inscrito e não há nada mais que possamos fazer, de modo que desabilitar o botão definitivamente é a melhor abordagem.

#### Experimente

Como já concedemos permissão para nosso app da Web na etapa anterior, precisamos clicar no __i__ em um círculo na barra de URL e alterar a permissão de notificações para *Use global default (Ask)*.

![8775071d7fd66432.png](img/8775071d7fd66432.png)

Após alterar essa configuração, atualize a página e clique no botão *Enable Push Messaging* e, desta vez, selecione *Block* na caixa de diálogo de permissão. O texto do botão agora será *Push Messaging Blocked* e estará desativado.

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

Com esta alteração, agora podemos inscrever o usuário e estamos cuidando dos possíveis cenários de permissão.


## Gerenciar um Evento Push




Antes de falar sobre como enviar uma mensagem push do seu back-end, precisamos considerar o que realmente acontecerá quando um usuário inscrito receber uma mensagem push.

Quando disparamos uma mensagem push, o navegador recebe a mensagem push, descobre para qual service worker o push se destina antes de ativar esse service worker e despachar um evento push. Precisamos ouvir esse evento e mostrar uma notificação, como resultado.

Adicione o seguinte código ao seu arquivo `sw.js`:

```
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

Vamos passar por este código. Estamos ouvindo por eventos push em nosso service worker, adicionando um ouvinte de eventos ao nosso service worker, que é este pedaço de código:

```
self.addEventListener('push', ...... );
```

A menos que você já tenha usado Web Workers antes, `self` é provavelmente novo. `self` está fazendo referência ao service worker em si, por isso estamos adicionando um ouvinte de eventos ao nosso service worker.

Quando uma mensagem push é recebida, nosso ouvinte de eventos será acionado, e criamos uma notificação chamando `showNotification()` em nosso registro. `showNotification()` espera um `title` e podemos receber um objeto `options`. Aqui, definiremos um corpo, ícone e indicador para a mensagem nas opções (o indicador é usado somente em Android no momento desta redação).

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

A última coisa a tratar no nosso evento push é `event.waitUntil()`. Este método requer uma promessa e o navegador manterá seu service worker funcionando até que a promessa passado tenha se resolvido.

Para tornar o código acima de um pouco mais fácil de entender, podemos reescrevê-lo assim:

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

Agora que já analisamos o evento push, vamos testar um evento push.

#### Experimente

Com nosso evento push no service worker, podemos testar o que acontece quando uma mensagem é recebida desencadeando um evento push falso com o uso de DevTools.

Em seu app da Web, inscreva-se para mensagens push, certificando-se de que você tenha *User IS subscribed* em seu console; em seguida, vá para o painel *Application* do DevTools e, na guia *Service Workers*, clique no link *Push* sob seu service worker.

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

Depois de clicar nele, você deve ver uma notificação como esta:

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

Observação: Se este passo não funcionar, tente cancelar o registro do seu service worker, através do link *Unregister* no painel DevTools Application, aguarde o service worker ser parado e, em seguida, atualize a página.


## Clique em notificação




Se clicar em uma dessas notificações, você perceberá que nada acontece. Podemos gerenciar cliques em notificação ouvindo por eventos `notificationclick` no seu service worker.

Comece adicionando um ouvinte `notificationclick` em `sw.js` assim:

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

Quando o usuário clica na notificação, o ouvinte de evento `notificationclick` será chamado.

Neste codelab, primeiro fechamos a notificação que foi clicada com:

```
event.notification.close();
```

Em seguida, abrimos uma nova janela/guia carregando o url [developers.google.com/web/](/web/), fique à vontade para alterá-lo :)

```
clients.openWindow('https://developers.google.com/web/')
```

Estamos chamando `event.waitUntil()` novamente para garantir que o navegador não encerre nosso service worker antes que nossa nova janela tenha sido exibida.

#### Experimente

Tente acionar uma mensagem automática no DevTools e clicar novamente na notificação. Agora você verá a notificação fechar e abrir uma nova guia.


## Envio de mensagens push




Vimos que nosso app da Web é capaz de mostrar uma notificação usando DevTools e aprendemos como fechar a notificação de um clique, o próximo passo é enviar uma mensagem push real.

Normalmente, o processo para isso seria o envio de uma inscrição a partir de uma página da Web para um back-end e o back-end acionaria uma mensagem push, fazendo uma chamada de API para o ponto final na inscrição.

Isso está fora do escopo deste codelab, mas você pode usar o site associado ([https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)) neste codelab para acionar uma mensagem push real. Copie e cole a inscrição na parte inferior da sua página:

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

Em seguida, cole-a na área de texto *Subscription to Send To* do site do associado:

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

Em seguida, sob *Text to Send* você pode adicionar qualquer string que deseja enviar com a mensagem push e, finalmente, clicar no botão *Send Push Message*.

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

Em seguida, você deve receber uma mensagem push e o texto que incluiu será impresso para o console.

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

Isso deve te dar uma chance para testar o envio e recebimento de dados e a manipulação de notificações resultante.

O aplicativo associado é, na verdade, apenas um servidor de nó que está usando a [biblioteca web-push](https://github.com/web-push-libs/web-push) para enviar mensagens. Vale a pena conferir as [bibl-web-push org no GitHub](https://github.com/web-push-libs/) para ver quais bibliotecas estão disponíveis para enviar mensagens push para você (isso gerencia diversos pequenos pormenores para acionar mensagens push).


## Cancelar a inscrição do usuário




A única coisa que está faltando é a capacidade de cancelar a inscrição para push do usuário. Para fazer isso, precisamos chamar `unsubscribe()` em uma `PushSubscription`.

De volta ao nosso arquivo `scripts/main.js`, altere o ouvinte de clique `pushButton` em `initialiseUI()` para o seguinte:

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});
```

Observe que agora vamos chamar uma nova função `unsubscribeUser()`. Neste método, obteremos a inscrição atual e chamamos cancelar inscrição nela. Adicione o código a seguir ao `scripts/main.js`:

```
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}
```

Vamos analisar esta função.

Primeiro obtemos a inscrição atual, chamando `getSubscription()`:

```
swRegistration.pushManager.getSubscription()
```

Isso retorna uma promessa que resolve com uma `PushSubscription`, se existir, caso contrário, retorna `null`. Se houver uma inscrição, chamamos `unsubscribe()` o que invalida a `PushSubscription`.

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
```

Chamar `unsubscribe()` retorna uma promessa, pois isso pode levar algum tempo para ser concluído, então retornamos a promessa para que o próximo `then()` na cadeia aguarde a finalização de `unsubscribe()`. Também adicionamos um gerenciador de captura para o caso da chamada `unsubscribe()` resultar em um erro. Depois disso, podemos atualizar nossa IU.

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### Experimente

Você deve conseguir pressionar o botão *Enable Push Messaging*  /  *Disable Push Messaging* em seu app da Web e os registros mostrarão o usuário sendo inscrito e tendo sua inscrição cancelada.

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## Concluído




Parabéns pela conclusão deste codelab!

Este codelab mostrou como começar a usar a adição push ao seu app da Web. Se deseja saber mais sobre o que notificações de web podem fazer, [confira estes docs](/web/fundamentals/engage-and-retain/push-notifications/). 

Se procura implantar push em seu site, você pode estar interessado em adicionar suporte para navegadores compatíveis mais antigos/não-padrão que utilizam GCM, [saiba mais aqui](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/).

### Leitura adicional

*  [Notificação push na Web](/web/fundamentals/engage-and-retain/push-notifications/) documentação sobre __Fundamentos__ da Web
*  [Bibliotecas push na Web](https://github.com/web-push-libs/) - Bibliotecas Push na Web, incluindo Node.js, PHP, Java e Python.

#### Postagens do blog relevantes

*  [Criptografia de carga útil de push na Web](/web/updates/2016/03/web-push-encryption)
*  [Chaves de Servidor de Aplicativo e push na Web](/web/updates/2016/07/web-push-interop-wins)
*  [Ações de notificação](/web/updates/2016/01/notification-actions)
*  [Ícones, eventos fechados, preferências de renotificação e timestamps](/web/updates/2016/03/notifications)





## Encontrou um problema ou tem feedback? {: .hide-from-toc }
Ajude-nos a melhorar nossos codelabs reportando um 
[problema](https://github.com/googlechrome/push-notifications/issues) hoje. E obrigado!

{# wf_devsite_translation #}
