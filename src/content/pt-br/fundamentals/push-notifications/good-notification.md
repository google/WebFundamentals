project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Há maneiras certas e maneiras melhores de usar notificação. Saiba o que torna uma notificação boa. Não mostraremos apenas o que fazer. Mostraremos como fazê-lo.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# O que torna uma notificação boa? {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="Pertinente, precisa e relevante">
  <figcaption>Pertinente, precisa e relevante</figcaption>
</figure>

Não irrites os usuários ou vos perderás para sempre. Precisamos
dizer mais? Sim, porque falar é fácil, difícil é fazer. 

Notificações por push são um dos recursos mais importantes dos aplicativos nativos, 
e agora está disponível na web. Para serem aproveitadas ao máximo,
as notificações precisam ser pertinentes, relevantes e precisas.

**Oportuna** — uma notificação oportuna é aquela que aparece quando o usuário quer vê-la e no
momento em que é importante para ele.

**Precisa** — uma notificação precisa é aquela que contém informações específicas que podem fazer o
usuário agir imediatamente.

**Relevante** — uma mensagem relevante é aquela sobre pessoas ou assuntos com que o usuário
se importa.

<div style="clear:both;"></div>


## Pertinente {: #timely }

Uma notificação pertinente é uma que é exibida quando os usuários querem e no momento
em que ela é importante para eles. Pertinente significa pertinente ao usuário, não necessariamente
para você.

### Torne-a disponível independentemente da conectividade {: #make-it-available }

A maioria das notificações devem ser mostradas imediatamente. Há motivos para reter
uma notificação antes de mostrá-la, por exemplo, as cargas úteis de push podem não
ter suporte em todas as plataformas, então pode ser necessário recuperar as informações essenciais
antes de exibi-las.

Até pouco tempo atrás, apenas aplicativos para dispositivos móveis podiam fazer isso. Com os service workers, você pode
armazenar uma notificação até que um usuário a queira. Quando o usuário clicar nela, o status
da rede será irrelevante.


    self.addEventListener('push', event => {
      var dataPromise;
      if (data in event) {
        dataPromise = Promise.resolve(event.data.json());
      } else {
        dataPromise = fetch('notification/end/point/data.json')
          .then(response => {
            return response.json();
          });
      }
    
      event.waitUntil(
        dataPromise
        .then(msgData => {
          // Now tell the user.
          return self.registration.showNotification(data.title, {
            // Whether you show data and how much you show depends on
            // content of the data itself.
            body: event.data.body,
            icon: 'images/icon.png'
          });
        })
      );
    }); 
    

### Use a vibração de forma criteriosa {: #vibrate-judiciously }

A vibração pode parecer algo estranho para estar na categoria de pertinência. Na verdade, esses dois elementos
são relacionados e há diversas questões a serem abordadas.

Em primeiro lugar, a vibração pode parecer a maneira ideal de informar os usuários sobre novas
notificações. No entanto, nem todos os usuários ativam a vibração e alguns dispositivos
não disponibilizam esse recurso. Por consequência, qualquer urgência que você queira comunicar com
a vibração pode ser perdida.

Em segundo lugar, fazer com que todas as notificações vibrem pode criar uma falsa sensação de urgência.
Se os usuários forem incomodados por notificações que não são tão importantes quanto
parecem, poderão desativar as notificações por completo.

Em poucas palavras: deixe que o usuário decida como usar as vibrações. Permita que ele escolha
quais notificações usam a vibração ou se esse recurso deve ou não ser usado. Se você
tiver diferentes categorias de notificações, você pode até mesmo deixar que o usuário selecione
diferentes padrões de vibração.

Por fim, não se esqueça de que, para vibrar, um dispositivo móvel tem que operar um motor, e motores
consomem mais energia do que notificações na tela.

## Precisa {: #precise }

Uma notificação precisa é uma que contém informações específicas que podem gerar
ações imediatamente. Considere novamente a imagem da lição de anatomia.

![Uma notificação precisa contém informações específicas.](images/flight-delayed-good.png){:width="316px"}

Ela informa tudo de que você precisa saber de uma vez só:

* Quem enviou a mensagem — a companhia aérea.
* O que aconteceu — seu novo voo atrasou.
* Outras informações — o novo horário do seu voo.


### Ofereça informações suficientes para que o usuário não precise visitar seu site {: #offer-enough }

Isso pode não ser adequado em todos os casos, mas, se as informações forem simples o
bastante para serem transmitidas em um espaço pequeno, não force os usuários a abrir seu site para
lê-las. Por exemplo, se quiser notificar um usuário sobre a confirmação de outro usuário,
não mostre uma mensagem dizendo "Nova notificação". Mostre uma que diga:
"Pete disse 'não'".

<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>O que fazer:</b> Ofereça informações suficientes
    para que os usuários não precisem acessar seu site.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>O que não fazer:</b> Não crie mensagens
    vagas ou incompreensíveis.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Isso é especialmente importante quando as informações são essenciais.

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>O que fazer:</b> Ofereça informações suficientes
    para que os usuários não precisem acessar seu site.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>O que não fazer:</b> Não crie mensagens
    vagas ou incompreensíveis.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Coloque ações diretamente na notificação {: #offer-actions }

Já vimos isso algumas vezes e na lição de anatomia até mostrou como
adicionar ações em uma notificação. O service worker precisa processar essas ações.
Faça isso no evento `notificationclick`.


    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

### Crie títulos e conteúdos específicos {: #specific-title }

O título deve ser relevante ao contexto da mensagem e incluir algo
específico da mensagem. Conteúdo que o destinatário já conhece, como o nome
do aplicativo, não é útil. Tampouco são úteis informações que o destinatário não entenderia,
como a tecnologia usada para enviar a mensagem.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>O que fazer:</b> Crie um título que inclua
    algo específico da mensagem.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>O que não fazer:</b> Não inclua
    informações que os usuários já conheçam ou que não entenderiam.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Expresse informações importantes diretamente

Isso significa colocar as informações que importam ao usuário na parte da
notificação que recebe mais atenção. Por exemplo, em línguas ocidentais,
o texto é lido da esquerda para a direita e de cima para baixo, portanto um aplicativo de mensagens colocaria o nome do remetente na parte superior esquerda.


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>O que fazer:</b> Coloque o nome do remetente no 
    canto superior esquerdo.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>O que não fazer:</b> Não coloque informações
    redundantes no canto superior esquerdo.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Mantenha a mensagem breve {: #keep-it-short }

Notificações não são e-mails. A intenção das notificações é incentivar os usuários a
abrir seu aplicativo. O objeto `PushMessageData` permite que você envie dados ao
usuário imediatamente, mas pode ser pertinente não mostrar todos esses dados ao usuário,
especialmente se dados adicionais puderem ser acumulados no servidor após
o envio da notificação.

## Relevante {: #relevant }

Uma mensagem relevante é sobre pessoas ou assuntos com os quais o usuário se importe.

### Dê preferência a usuários que fizeram login {: #prefer-logged }

Só envie notificações de permissão para usuários que fizeram login.
Se você não sabe quem são seus usuários, é difícil enviar notificações relevantes
a eles. E, se as notificações não forem relevantes, os usuários podem considerá-las como
spam.

### Não repita informações {: #dont-repeat }

Você tem pouco espaço para transmitir muitas informações. Não o desperdice duplicando
informações em diferentes partes da notificação. As informações duplicadas podem ser
relevantes, mas sua remoção proporciona espaço adicional para outras
informações. Por exemplo, se o título contiver o dia da semana,
não o repita no corpo da mensagem.

<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>O que fazer:</b> As informações do título
    devem ser únicas.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>O que não fazer:</b> O conteúdo da mensagem não deve conter informações expressas no título.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

Além disso, se o aplicativo estiver aberto, é possível que a nova informação já esteja na
tela. Em vez de uma notificação, use a interface do aplicativo para avisar o usuário.

### Não anuncie seu aplicativo nativo {: #dont-advertise-native }

O objetivo dos service workers, a tecnologia por trás das notificações push, é
evitar o tempo e os gastos de programar um aplicativo separado do seu
site. Um usuário que tem seu service worker e seu aplicativo nativo pode receber
notificações duplicadas a não ser que você programe um código no lado do servidor para evitar que isso aconteça. Você pode 
evitar o problema por completo; não incentive os usuários a executar os dois recursos ao mesmo tempo.

### Não anuncie {: #dont-advertise }

Você terá oportunidades de monetizar a experiência do usuário quando ele estiver usando seu
aplicativo. Não desperdice essa chance enviando spam ao usuário quando ele não estiver. Se você sobrecarregar os
usuários com notificações, poderá perdê-los.

### Não inclua o nome ou o domínio do seu site {: #no-website }

As notificações já contêm o nome do seu domínio e há pouco espaço disponível.

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Nome de domínio em uma notificação do Chrome.">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Nome de domínio em uma notificação do Firefox.">
  </figure>
</div>
<div style="clear:both;"></div>

### Torne o ícone contextual {: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>O que não fazer:</b> Usar um ícone genérico.
   </figcaption>
</figure>

Os ícones devem expressar algo sobre a mensagem que eles acompanham. Considere este
exemplo.

Ele diz exatamente quem enviou a mensagem. Mas o ícone, que em muitas
notificações é o logotipo do site ou aplicativo, não diz nada.

<div style="clear:both;"></div>

Em vez disso, vamos usar a imagem de perfil do remetente.

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>O que fazer:</b> Use um ícone que ofereça
    informações contextuais sobre a mensagem.</figcaption>
</figure>




Mantenha o ícone simples. Detalhes demais podem passar despercebidos pelo usuário.


{# wf_devsite_translation #}
