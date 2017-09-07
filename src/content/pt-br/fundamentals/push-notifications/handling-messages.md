project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Você já sabe o que é uma boa notificação. Agora vamos ver como implementá-las.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# Gerenciar mensagens {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="O exemplo de notificação.">
</figure>

Bem lá no [início deste artigo](#anatomy), mostramos
uma notificação que parece a imagem e o código que a acompanham.

Embora tenhamos mostrado um pouco sobre como ela é codificada, não demos
informações suficientes para que isso fosse útil. Faremos isso nesta seção.

<div style="clear:both;"></div>

## Service workers, de novo

Vamos falar de novo sobre os service workers. O gerenciamento de mensagens envolve código que
reside exclusivamente em um service worker. Se precisar saber um pouco mais sobre o assunto antes de continuar, leia a
[introdução](/web/fundamentals/getting-started/primers/service-workers)
de novo. Temos também algumas instruções muito práticas para
[depurar service workers](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)
usando o DevTools.

## Mais informações sobre a anatomia da notificação {: #more-anatomy }

Quando uma notificação é recebida do servidor, ela é interceptada por um service
worker usando o evento de push. Sua estrutura básica é a seguinte:


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


Dentro de `waitUntil()`, chamaremos `showNotification()` no objeto de registro
de um service worker.


    self.registration.showNotification(title, {
        body: 'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


Tecnicamente, o único parâmetro obrigatório para `showNotification()` é o título.
Em termos práticos, você deve incluir pelo menos um corpo e um ícone. Como você pode
ver, as notificações tem bem poucas opções. Você pode encontrar uma
[lista completa delas no MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification).

Por fim, processaremos a resposta do usuário usando os métodos `notificationclick` e
`notificationclose`.


    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


Qualquer outro procedimento é apenas uma elaboração dessas ideias básicas.

## Como escolher não mostrar uma notificação {: #choosing-not-to-show }

Tem vezes em que não é necessário mostrar uma notificação quando uma mensagem
push é recebida. Por exemplo, se o aplicativo já estiver aberto e o conteúdo
do push já estiver visível para o usuário.

Por sorte, os service workers conseguem verificar se o aplicativo está aberto.
Os service workers oferecem suporte a uma interface chamada
[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients), que é uma lista
de todos os clientes ativos controlados pelo service worker em questão. Para descobrir
se há clientes ativos, chame `clients.length`. Se essa propriedade retornar `0`,
mostre a notificação. Se não, faça qualquer coisa, menos mostrá-la.

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

## Preparando o conteúdo da mensagem {: #preparing-messages }

Como já dissemos, seu servidor envia dois tipos de mensagem:

* Mensagens com uma carga útil de dados.
* Mensagens sem uma carga útil de dados, frequentemente chamadas de convite.

Seu gerenciador de push precisa considerar esses dois tipos. Para mensagens sem carga útil,
é melhor oferecer uma boa experiência do usuário coletando os dados antes de dizer ao
usuário que eles estão disponíveis.

Vamos começar com um gerenciador de eventos de push básico com uma chamada para
`event.waitUntil()`.  Esse método só pode aceitar uma "promise" ou algo
que se converta em uma "promise". Esse método estende o tempo de vida do evento `push`
até que certas tarefas sejam concluídas. Como você verá logo mais, manteremos
o evento `push` ativo até exibirmos uma notificação.

    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

Em seguida, se você encontrar dados no objeto do evento, obtenha-os.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


Se o objeto não tiver dados, chame `fetch()` para obtê-los junto ao servidor.
Se ele tiver dados, basta retorná-los.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

Em ambos os casos, nós ficamos com um objeto JSON. Agora, é hora de mostrar uma
notificação ao usuário.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

## Combine notificações semelhantes {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="Combine mensagens do mesmo remetente.">
</figure>

Às vezes, é útil combinar várias notificações em uma. Por
exemplo, um aplicativo de rede social pode querer evitar enviar mensagens aos usuários sempre
que uma determinada pessoa postar algo. Em vez disso, essas notificações são combinadas.

Combinar notificações parecidas é bem complexo. Mas, gosto de ver isso
como uma preparação para as próximas etapas.

1. Uma mensagem chega no gerenciador de eventos `push`.
2. Você chama `self.registration.getNotifications()` para ver se há
   notificações que vale a pena combinar. Isso normalmente se faz verificando a tag
   da notificação.
3. Para finalizar, você mostra a nova notificação chamando `self.registration.showNotification()`,
   não esquecendo de definir o parâmetro "renotify" como "true" nas opções (veja um
   exemplo abaixo).

Dê uma olhada nisso enquanto explicamos outro exemplo. Vamos presumir
que você já tenha recebido ou recuperado dados de mensagem como falado na última
seção. Agora vamos ver o que podemos fazer com eles.

Comecemos com um gerenciador de eventos de push básico. O método `waitUntil()` retorna uma
Promise que se converte nos dados da notificação.


    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


Assim que tivermos os dados da mensagem, chame `getNotifications()` usando `data.tag`.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

Nos outros exemplos, instanciamos nosso objeto `options` na chamada de
`showNotification()`. Nesse cenário, o objeto `options` precisa mudar
de acordo com os resultados de `getNotifications()`, por isso, instanciamos um objeto
`options` da notificação.

Observe que também incluímos os dados da notificação nas opções
da notificação. Estamos fazendo isso para garantir que os dados estejam disponíveis para `notificationclick`,
que será examinado em uma seção posterior. Para informar o navegador de que estamos combinando
notificações, precisamos reutilizar a `tag` e definir `renotify` como `true`. Veja ambos destacados abaixo.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

Quando preenchermos as outras propriedades das novas notificações, também
adicionaremos dois botões de ação à notificação: um
abre o aplicativo, o outro descarta a notificação sem
gerar nenhuma ação. Nenhuma dessas ações é gerenciado pelo evento "push". Observaremos isso
na próxima seção. Por fim, mostraremos a notificação (linha 26).

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

## Coloque ações na notificação {: #notification-actions }

Já vimos exemplos de notificações com ações incorporadas. Vamos
ver como elas são implementadas e como responder a elas.

Lembre-se de que `showNotification()` assume um argumento de "options" com uma ou mais
ações opcionais.


    ServiceWorkerRegistration.showNotification(title, {  
      body: data.body,  
      icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
      vibrate: [200, 100, 200, 100, 200, 100, 400],  
      tag: data.tag,  
      actions: [  
        {action: 'change', title: 'Ask for reschedule'},  
        {action: 'confirm', title: 'Confirm'}  
      ],  
      data: data  
    })

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="Uma notificação com ações.">
</figure>

A notificação indica que Stacy
confirmou um compromisso para as 15h00. O destinatário pode responder com
sua própria conformação ou solicitar que o compromisso seja reagendado. Quanto
ao primeiro, enviamos uma mensagem diretamente para o servidor. Já com o último, abrimos
o aplicativo em uma interface adequada.

<div style="clear:both;"></div>

Primeiro, vamos adicionar um gerenciador de eventos `notificationclick` ao service worker. Além disso,
fechamos a notificação.


    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


Em seguida, precisaremos de certa lógica para descobrir onde a notificação foi clicada. O
usuário clicou em Confirm, Ask for Reschedule ou em nenhuma dessas opções?

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

Se o usuário clicou em Confirm, podemos enviar essa informação diretamente ao servidor
sem abrir o aplicativo (linhas 3 a 13). Observe que estamos
retornando do evento `notificationclick` imediatamente após enviarmos a
confirmação ao servidor. Isso evita que o aplicativo seja aberto.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

Se o destinatário clicou em "Ask for Reschedule", devemos abrir uma página de notificação. Se o usuário clicar em uma área que não tenha um botão de ação, devemos abrir o aplicativo.
Em ambos os casos, criamos um URL apropriado.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

Observação: A partir de agora, os exemplos de códigos ficam um pouco grandes. Vamos reduzi-los para poupar espaço. Mas não se preocupe. Você poderá vê-los completos no final.

Independentemente do URL, chamaremos `clients.matchAll()` para obtermos uma janela de cliente com a qual
possamos navegar.


    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


Por fim, precisaremos utilizar caminhos de navegação diferentes dependendo de
um cliente estar aberto.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


Veja o gerenciador `notificationclick` integralmente.


    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if (event.action === 'confirm') {
        var fetchOptions = {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: event.notification.data.confirmation_id
        };
        var confirmation = new Request('/back/end/system/confirm');
        event.waitUntil(fetch(confirmation, fetchOptions));
        return; // So we don't open the page when we don't need to.
      } else if (event.action === 'change') {
        var appUrl = '?confirmation_id=' +
          event.notification.data.confirmation_id + '#reschedule';
      } else {
        var appUrl = '/';
      }

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        }).then( activeClients => {
          if (activeClients.length > 0) {
            activeClients[0].navigate(appUrl);
            activeClients[0].focus();
          } else {
            clients.openWindow(appUrl);
          }
        })
      );
    });


{# wf_devsite_translation #}
