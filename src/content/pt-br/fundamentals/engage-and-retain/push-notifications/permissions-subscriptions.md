project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Solicitar a permissão e inscrever um usuário para receber notificações exige uma ação tão sutil quanto mostrar a ele notificações.

{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# Solicitar permissões e inscrever usuários {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Solicitar a permissão e inscrever um usuário para receber notificações exige uma ação tão sutil quanto mostrar a ele notificações.

Nesta seção e nas seções restantes, mostrarei o próprio código.
É importante ser claro sobre onde esses bits de código são implementados. É
nesse momento que entender os service workers se torna importante. O código para
solicitar permissão e inscrever usuários é feito no código do aplicativo, ao contrário
do código do service worker. O service worker será usado mais à frente, quando
processarmos mensagens por push e formos exibi-las ao usuário.

## Verifique permissões {: #check-permissions }

Sempre verifique se existe uma permissão quando a página for carregada. Se a permissão
já tiver sido concedida, você poderá começar a enviar notificações
imediatamente. Em todo caso, use estas informações para definir o estado das configurações
de permissão. Um exemplo disso é mostrado abaixo. Esclarecendo, ainda não estamos
solicitando nada.

Observação: com o único intuito de esclarecer, este exemplo exclui algumas verificações de recursos
que devem ser sempre realizadas. Você pode ver o código original completo
no nosso <a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>
repositório de exemplos do GitHub</a>.


    function initialiseState() {
      if (Notification.permission !== 'granted') {
        console.log('The user has not granted the notification permission.');
        return;
      } else if (Notification.permission === “blocked”) {
       /* the user has previously denied push. Can't reprompt. */
      } else {
        /* show a prompt to the user */
      }

      // Use serviceWorker.ready so this is only invoked
      // when the service worker is available.
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            if (!subscription) {
              // Set appropriate app states.
              return;
            }
          })
          .catch(function(err) {
            console.log('Error during getSubscription()', err);
          });
      });
    }


## Evite solicitações de assinatura ao carregar a página {: #avoid-page-load-requests }

Observe que o exemplo anterior _não_ chama
`pushManager.subscribe()`, embora essa seja a resposta lógica a
descobrir que não existe nenhuma inscrição no momento. Essas solicitações podem parecer pertinentes. No entanto, como você ainda não sabe nada sobre seus usuários e, possivelmente, eles não sabem
nada sobre você, fica difícil enviar mensagens
precisas ou relevantes.

## Solicitando permissões {: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="Pergunte antes de enviar notificações e explique o porquê.">
</figure>

Solicitar permissão, independentemente do momento, é um processo de duas etapas.
Primeiro, pergunte ao usuário se o aplicativo pode enviar solicitações com uma mensagem que
explique exatamente por que você deseja enviar notificações a ele.

Se o usuário aprovar, podemos obter uma assinatura do gerenciador
de push. Para fazer isso, chame `PushManager.subscribe()` (enfatizado no exemplo
abaixo). Neste exemplo, estamos passando um objeto com `userVisibleOnly` definido
como `true` para informar o navegador de que sempre exibiremos uma notificação ao
usuário. Além disso, estamos incluindo uma `applicationServerKey`.


<div style="clear:both;"></div>

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    <strong>return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });</strong>
  })
  .then(subscription => {
    // Do something with the subscription.
  })
  .catch(error => {
    // Do something with the error.
  });
}
</pre>

Esse é o resultado no Chrome.

![Chrome solicitando permissão.](images/news-permissions.png){:width="296px"}

### O que é a applicationServerKey? {: #applicationserverkey }

O valor de `applicationServerKey` deve ser gerado pelo servidor. Estávamos guardando
toda a parte do servidor para a próxima seção. Por agora, há uma coisa de que você precisa
saber sobre a `applicationServerKey`: ao passar a chave em uma chamada de
`subscribe()`, verifique se ela é uma
[Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
(uma matriz de números inteiros não assinada de oito bits).

## Acione com uma ação específica {: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="Solicitação com uma ação específica.">
</figure>

Solicite permissão para enviar notificações em resposta a uma
ação do usuário específica e contextual. Isso permite que você conecte suas notificações
a um objetivo do usuário e deixa claro para o usuário por que você deseja enviar
notificações.

Por exemplo, se um site de uma linha aérea quiser notificar os usuários sobre atrasos nos voos,
ele exibiria uma caixa de seleção de aceitação de forma proeminente e só solicitaria
permissões de notificação depois que o usuário aceitasse.

<div style="clear:both;"></div>

## Forneça um local para gerenciar as notificações {: #manage-notifications }

Permita que os usuários alterem ou até desativem as notificações do seu site com facilidade.
Isso impede que os usuários desativem as notificações no nível do navegador ou do dispositivo.

Adicione um botão de notificação em um local com alta visibilidade. Além disso, rotule-o
para mostrar aos usuários o que você deseja enviar, não como as notificações são implementadas. Os usuários
sabem o que é uma "notificação por push" tanto quanto você sabe como ajustar a
órbita de uma cápsula Soyuz (para quem não sabe, é uma nave espacial).

<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>O que fazer:</b> Um botão de notificações que mostra o conteúdo das notificações.
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>O que não fazer:</b> Um botão de notificações que mostra como as notificações são implementadas.
    </figcaption>
  </figure>
</div>
<div style="clear:both;"></div>


## Passando uma assinatura para o servidor {: #passing-subscription }

Após obter a permissão de um usuário para enviar notificações e definir o estado dos
controles relacionados, você deve enviar as informações de assinatura (chamadas de 
"recurso push" nas especificações) ao servidor push. Isso envolve criar um
objeto de solicitação adequado que contém os dados de assinatura e passá-lo
ao servidor.

Ao criar a solicitação (destacada no exemplo abaixo), use o verbo `POST`
e um cabeçalho `Content-Type` de `application/json`. Para o corpo, você deve
converter o objeto "signature" em uma string. Examinaremos o que esse objeto
contém na próxima seção, [Enviando mensagens](sending-messages). Use `fetch()`
para enviar a solicitação de assinatura ao servidor.

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });
  })
  <strong>.then(subscription => {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(subscription)
    };
    return fetch('/your-web-server/api', fetchOptions);
  })</strong>
  .catch(error => {
    // Do something with the error.
  });
}
</pre>


{# wf_devsite_translation #}
