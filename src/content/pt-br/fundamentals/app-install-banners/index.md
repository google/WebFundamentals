project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Existem dois tipos de banners de instalação de aplicativo: os web e os nativos. Eles dão a você a possibilidade de permitir que os usuários adicionem seu aplicativo web ou nativo às telas iniciais de forma rápida e fácil, sem sair do navegador.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Banners de instalação de aplicativo web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="Banner de instalação de app da Web">
  </figure>
</div>

Há dois tipos de banner de instalação de aplicativo: os **web** e
os [**nativos**](native-app-install). Eles permitem que os usuários adicionem seu aplicativo web ou nativo às telas iniciais de forma rápida e fácil sem sair do navegador.

É muito fácil adicionar banners de instalação de aplicativo: o Chrome faz todo o trabalho duro 
para você. Você precisa incluir o arquivo de manifesto do aplicativo web no site
com detalhes sobre o aplicativo.

Em seguida, o Chrome usa um conjunto de critérios e dados heurísticos de frequência de acesso para
determinar quando exibir o banner. Continue lendo para saber mais.

Observação: "Adicionar à tela inicial" (às vezes abreviado como A2HS) é outro nome dos Banners de instalação de aplicativo web. Os dois termos são equivalentes.

### Quais são os critérios?

O Chrome exibe o banner automaticamente quando o aplicativo atende aos seguintes
critérios:

* Ter um arquivo de [manifesto de app da Web](../web-app-manifest/) com:
    - um `short_name` (usado na tela inicial)
    - um `name` (usado no banner)
    - um ícone PNG de 144x144 (as declarações do ícone devem incluir um tipo MIME de `image/png`)
    - um `start_url` que é carregado
* Ter um [service worker](/web/fundamentals/getting-started/primers/service-workers)
  registrado no seu site.
* Ser exibido por [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)
  (um requisito para o uso de Service Workers).
* Ser visitado pelo menos duas vezes, com pelo menos cinco minutos entre as visitas.

Observação: os banners de instalação de aplicativo web são uma tecnologia em ascensão. Os critérios para exibi-los podem mudar no futuro. Acesse [O que exatamente torna algo um Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/) para ver uma referência canônica (que será atualizada com o tempo) sobre os últimos critérios para os banners de instalação de aplicativo web.

### Testando o banner de instalação de aplicativo {: #test }

Depois de configurar o manifesto do aplicativo web, o ideal é confirmar
que ele foi definido corretamente. Há duas abordagens à sua disposição. Uma
é manual, e a outra é automatizada.

Para acionar manualmente o banner de instalação de aplicativo:

1. Abra o Chrome DevTools.
2. Acesse o painel **Application**.
3. Siga para a guia **Manifest**.
4. Clique em **Add to homescreen**, destacado em vermelho na imagem de tela abaixo.

![Botão "Add to homescreen" no DevTools](images/devtools-a2hs.png)

Acesse [Simular eventos de
adicionar à tela inicial](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)
para saber mais.

Para fazer testes automatizados com o banner de instalação de aplicativo, use o Lighthouse. O Lighthouse
é uma ferramenta de auditoria de aplicativos web. Você pode executá-lo como uma extensão do Chrome ou um
módulo do NPM. Para testar o aplicativo, você deve fornece o Lighthouse a uma página específica
para auditar. O Lighthouse realiza um conjunto de auditorias na página e
insere os resultados em um relatório.

Os dois conjuntos de auditorias do Lighthouse na captura de tela abaixo representam todos
os testes de que sua página precisa para passar a exibir um banner de instalação de aplicativo.

![Auditorias de instalação de aplicativo do Lighthouse](images/lighthouse-a2hs.png)

Acesse [Auditar apps da web com o Lighthouse](/web/tools/lighthouse/) para começar
a usá-lo.

## Eventos do banner de instalação de aplicativo

O Chrome oferece um mecanismo fácil para determinar como o usuário respondeu ao
banner de instalação de aplicativo e até mesmo cancelá-lo ou deferi-lo para um momento mais conveniente.

### Um usuário instalou o aplicativo?

O evento `beforeinstallprompt` retorna uma promessa chamada `userChoice` 
que resolve quando o usuário executa uma ação em relação à solicitação.  A promessa 
retorna um objeto com um valor de `dismissed` no atributo `outcome`
ou `accepted` se o usuário adicionou a página à tela inicial.

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

Essa é uma boa ferramenta para entender como seus usuários interagem com a solicitação 
de instalação de aplicativo.


### Retardando ou cancelando a solicitação

O Chrome gerencia quando acionar a solicitação, mas, para alguns sites, isso pode não 
ser o ideal. Você pode deferir a solicitação para um momento posterior no uso do aplicativo ou 
mesmo cancelá-la. 

Quando o Chrome decide solicitar o usuário a instalar o aplicativo, você 
pode evitar a ação padrão e armazenar o evento para um momento posterior. Então, quando 
o usuário tiver uma interação positiva com seu site, você poderá acionar novamente 
a solicitação chamando `prompt()` no evento armazenado. 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.
    
    var deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
    
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
      
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }
          
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

Como alternativa, você pode cancelar a solicitação ao impedir a ação padrão.

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Banner de instalação de aplicativo nativo

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="Banner de instalação de aplicativo nativo" style="max-height: 500px">
  </figure>
</div>

Os banners de instalação de aplicativo nativo são parecidos com os [banners de instalação de aplicativo web](.) mas,
em vez de adicionarem à tela inicial, eles permitem que o usuário instalem seu
aplicativo nativo sem sair do site.

### Critérios para exibir o banner

Os critérios também são parecidos com os do banner de instalação de aplicativo web, exceto pela necessidade de
ter um service worker. O seu site deve:

* Ter um arquivo de [manifesto do aplicativo web](../web-app-manifest/) com:
  - um `short_name`
  - um `name` (usado na solicitação do banner)
  - um ícone em PNG de 144 x 144 (a declaração do ícone deve conter um tipo MIME de `image/png`
  - um objeto `related_applications` com informações sobre o aplicativo
* Ser fornecido por [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)
* Ser acessado pelo usuário duas vezes em dois dias separados em um período
  de duas semanas.

### Requisitos do manifesto

Para integrar a qualquer manifesto, adicione uma matriz `related_applications` com as
plataformas de `play` (do Google Play) e o ID do aplicativo.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

Se só quiser oferecer ao usuário a possibilidade de instalar o seu
aplicativo Android e não exibir o banner de instalação de aplicativo web, adicione
`"prefer_related_applications": true`. Por exemplo:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
