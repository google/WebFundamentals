project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Notificações por push são um dos recursos mais importantes dos aplicativos nativos, e agora está disponível na web. Para serem aproveitadas ao máximo, elas precisam ser pertinentes, relevantes e precisas.

{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# Notificações por push na web: pertinentes, relevantes e precisas {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="Exemplo de notificação" class="attempt-right">

Se você pedir a opinião dos desenvolvedores sobre que recursos importantes os dispositivos móveis têm a mais que
a web, as notificações por push estão sempre no topo da lista.

As notificações por push na web permitem que os usuários aceitem atualizações pertinentes dos sites
que adoram e possibilitam que você envolva-os novamente com eficiência usando conteúdo personalizado
e relevante. 

A Push API e a Notification API abrem um novo mundo de possibilidades para
você envolver os usuários novamente.

## Service workers estão envolvidos? {: #service-worker-involved }

Sim. O push se baseia em service workers porque eles operam em
segundo plano. Isso significa que a única vez que se executa código para uma notificação por push (em
outras palavras, a única vez em que a bateria é usada) é quando o usuário interage com
uma notificação clicando nela ou fechando-a.   Se você ainda não os conhece bem,
dê uma olhada na [introdução aos service workers][service-worker-primer]. Usaremos o
código dos service workers nas próximas seções, em que mostraremos como implementar pushes
e notificações.

## Duas tecnologias {: #two-technologies }

Push e notificação usam APIs diferentes, mas complementares:
o [**push**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) é
invocado quando um servidor fornece informações a um service worker, já uma
[**notificação**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
é a ação de um service worker ou script de página web de exibir
informações a um usuário.

## Um pouco sobre a anatomia de uma notificação {: #anatomy }

Na próxima seção, mostraremos algumas imagens, mas nós
prometemos código. Aqui está ele. Com o registro de um service worker, você chama
`showNotification` em um objeto de registro.


    serviceWorkerRegistration.showNotification(title, options);
    

O argumento `title` é exibido como um cabeçalho na notificação. O argumento `options`
é um objeto literal que define as demais propriedades de uma notificação.
Um objeto de opções típico tem uma aparência semelhante a esta:


    {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Example Notification" class="attempt-right">

Esse código produz uma notificação como a da imagem. Geralmente, ela
tem as mesmas funcionalidades que um aplicativo nativo. Antes de ir mais a fundo
sobre a implementação dessas funcionalidades, vou mostrar como usá-las
da melhor forma.   Vamos descrever a mecânica da
implementação de notificações por push, incluindo como lidar com permissões e
assinaturas, enviar mensagens e responder a elas.

## Como faço para experimentar?

Há diversas formas de experimentar os recursos antes de você entender totalmente como funcionam ou de ter que implementá-los. Primeiro, dê uma olhada [no nosso próprio exemplo](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications). Confira também o [Gerador de notificações](https://tests.peter.sh/notification-generator/) de Peter Beverloo e a [demonstração da Push API](https://github.com/chrisdavidmills/push-api-demo) de Chris Mills.

Observação: a menos que você use localhost, a Push API exige HTTPS.

<<../../../_common-links.md>>


{# wf_devsite_translation #}
