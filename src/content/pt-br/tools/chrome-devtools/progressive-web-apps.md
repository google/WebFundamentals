project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use o painel Application para inspecionar, modificar e depurar manifestos, service workers e caches de service worker de aplicativos da Web.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Depurar Progressive Web Apps {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use o painel <strong>Application</strong> para inspecionar, modificar
e depurar manifestos, service workers e caches de service worker de aplicativos da Web.

Guias relacionados: 

* [Progressive Web Apps](/web/progressive-web-apps)

Este guia discute apenas os recursos de Progressive Web App do painel
**Application**. Se você está buscando ajuda sobre outros painéis, consulte
a última seção deste guia, [Outros guias do painel
Application](#other).


### TL;DR {: .hide-from-toc }
- "Use o painel <strong>App Manifest</strong> para inspecionar o manifesto do seu aplicativo da Web e ativar eventos de adição à tela inicial.
- Use o painel <strong>Service Worker</strong> para obter uma série de tarefas relacionadas a service worker, como descadastrar ou atualizar um serviço, emular eventos de push, ficar off-line ou interromper um service worker.
- Visualize o cache do seu service worker no painel <strong>Cache Storage</strong>.
- Cancele o registro de um service worker e apague todo o armazenamento e os caches com um único clique no painel <strong>Clear Storage</strong>.


## O manifesto do aplicativo da Web {:#manifest}

Se quiser que seus usuários possam adicionar seu aplicativo às telas inicias de seus dispositivos móveis,
você precisa de um manifesto de aplicativo da Web. Esse manifesto define como o aplicativo é exibido na
tela inicial, para onde direcionar o usuário quando ele é iniciado da tela inicial e qual é a aparência
do aplicativo quando ele é iniciado.

Guias relacionados:

* [Melhore a experiência do usuário com um manifesto de
 aplicativo da Web](/web/fundamentals/engage-and-retain/web-app-manifest)
* [Como usar banners de
  instalação de aplicativo](/web/fundamentals/engage-and-retain/app-install-banners)

Quando seu manifesto estiver configurado, você pode usar o painel **Manifest** do painel
**Application** para inspecioná-lo.

![manifest pane][manifest]

* Para ver o código do manifesto, clique no link abaixo do rótulo **App Manifest**
  (`https://airhorner.com/manifest.json` na imagem acima).
* Pressione o botão **Add to homescreen** para simular um evento de adição
  à tela inicial. Confira a próxima seção para saber mais.
* As seções **Identidade** e **Apresentação** apenas exibem campos do
  código do manifesto em uma vista mais simplista.
* A seção **Icons** exibe todos os ícones especificados.

[manifest]: images/manifest.png

### Simule eventos de adição à tela inicial {:#add-to-homescreen}

Um aplicativo da Web só pode ser adicionado a uma tela inicial quando o site é acessado pelo
menos duas vezes, com no mínimo 5 minutos separando os acessos. Durante o desenvolvimento ou
a depuração do fluxo de adição à tela inicial, este critério pode ser inconveniente.
O botão **Add to homescreen** no painel **App Manifest** permite
simular eventos de adição à tela inicial sempre que você quiser.

É possível testar este recurso com o [Progressive Web App da Google I/O
2016](https://events.google.com/io2016/){: .external }, que oferece suporte adequado para adição à
tela inicial. Clicar em **Add to Homescreen** com o aplicativo aberto induz
o Chrome a exibir o banner "add this site to your shelf", que é o
equivalente dos dispositivos móveis para o banner "add to homescreen" dos computadores.

![add to desktop shelf][shelf]

**Dica**: Mantenha a gaveta **Console** aberta ao simular eventos de Adição
à tela inicial. O Console informa se o manifesto tem problemas e registra outras
informações sobre o ciclo de vida da adição à tela inicial.

O recurso **Add to Homescreen** ainda não pode simular o fluxo de trabalho para dispositivos
móveis. Observe como a mensagem "adicionar à prateleira" foi acionada na
imagem acima, mesmo com o DevTools no Device Mode. Entretanto, se conseguir adicionar
seu aplicativo à prateleira do computador, ele também funcionará
para dispositivos móveis.

Se quiser testar nossa experiência móvel genuína, você pode
conectar um dispositivo móvel real ao DevTools por [depuração remota][remote
debugging] e, em seguida, clicar no botão **Add to Homescreen** (no DevTools)
para acionar a mensagem "adicionar à tela inicial" no dispositivo móvel conectado.

[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## Service workers {:#service-workers}

Os service workers são uma tecnologia fundamental para o futuro da plataforma Web. Eles
são scripts que o navegador executa em segundo plano, separado de uma página da Web.
Esses scripts permitem acessar recursos que não precisam de uma página da Web nem de interação
do usuário, como notificações por push, sincronização em segundo plano e experiências off-line.

Guias relacionados:

* [Introdução aos service workers](/web/fundamentals/primers/service-worker)
* [Notificações push: Pertinentes, relevantes e
  precisas](/web/fundamentals/engage-and-retain/push-notifications)

O painel **Service Workers** na seção **Application** é o lugar no
DevTools para inspecionar e depurar service workers.

![painel service worker][sw]

* Se um service worker estiver instalado na página aberta no momento, você o verá
   listado neste painel. Por exemplo, na imagem acima, há um service
  worker instalado para o escopo de `https://events.google.com/io2016/`.
* A caixa de seleção **Offline** coloca o DevTools em modo off-line. Isto
  é equivalente ao modo off-line disponível no painel **Network** ou
  à opção `Go offline` do [Menu de comando][cm].
* A caixa de seleção **Update on reload** força o service worker a
  atualizar a cada carregamento da página.
* A caixa de seleção **Bypass for network** ignora o service worker e força o
  navegador a acessar a rede para obter os recursos solicitados.
* O botão **Update** realize uma atualização pontual do service worker
  especificado.
* O botão **Push** emula uma notificação por push sem conteúdo (também conhecido
  como um [interruptor][tickle]).
* O botão **Sync** emula um evento de sincronização em segundo plano.
* O botão **Unregister** cancelar o registro do service worker especificado. Confira
  [Apagar armazenamento](#clear-storage) para saber como cancelar o registro de um service worker e
  apagar o armazenamento e os caches com um único clique.
* A linha **Source** informa quando o service worker em execução no momento foi
  instalado. O link é o nome do arquivo de origem do service worker. Clicar
  no link envia você ao código do service worker.
* A linha **Status** informa o status do service worker. O número nesta
  linha (`#1` na imagem acima) indica quantas vezes o service
  worker foi atualizado. Se você marcar a caixa de seleção **update on reload**,
  perceberá que o número aumenta a cada carregamento da página. Perto do
  status, você verá um botão de **iniciar** (se o service worker for interrompido) ou um
  botão de **parar** (se o service worker estiver em execução). Os service workers são
  projetados para serem interrompidos e iniciados pelo navegador a qualquer momento. Interromper
  explicitamente seu service worker usando o botão **stop** pode simular esse comportamento.
  Interromper seu service worker é uma ótima maneira de testar como o
  código se comporta quando o service worker é reiniciado. Com frequência,
  essa estratégia revela bugs causados por conceitos incorretos sobre o estado de persistência global.
* A linha **Clients** diz a origem a que o service worker está
  direcionado. O botão **focus**, na maioria das vezes, é útil quando se marca a
  caixa de seleção **show all**. Quando essa caixa está marcada, todos os service
  workers registrados são listados. Se você clicar no botão **focus** ao lado de um service
  worker que está sendo executado em outra guia, o Chrome muda o foco para essa guia.

Se o service worker causar erros, um novo rótulo chamado **Errors** será
exibido.

![service worker com erros][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages#ways-to-send
[errors]: images/sw-error.png

## Caches do service worker {:#caches}

O painel **Cache Storage** fornece uma lista somente leitura dos recursos que foram
armazenados em cache usando a [Cache API][sw-cache] (do service worker).

![painel de cache do service worker][sw-cache-pane]

Observe que, quando abrir um cache pela primeira vez e adicionar um recurso a ele, o DevTools
poderá não detectar a alteração. Recarregue a página para visualizar o cache.

Se tiver dois ou mais caches abertos, você os verá listados abaixo da lista suspensa
**Cache Storage**.

![vários caches de service worker][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## Apagar armazenamento {:#clear-storage}

O painel **Clear Storage** é um recurso muito útil ao
desenvolver Progressive Web Apps. Este painel permite cancelar o registro de service workers
e apagar todos os caches e todo o armazenamento clicando em um único botão. Confira a
seção abaixo para saber mais.

Guias relacionados:

* [Apagar
  armazenamento](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)

## Outros guias do painel Application {:#other}

Confira os guias abaixo para receber mais ajuda sobre outras seções do
painel **Application**.

Guias relacionados:

* [Inspecionar recursos da página](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [Inspecionar e
  gerenciar armazenamento local e caches](/web/tools/chrome-devtools/iterate/manage-data/local-storage)


{# wf_devsite_translation #}
