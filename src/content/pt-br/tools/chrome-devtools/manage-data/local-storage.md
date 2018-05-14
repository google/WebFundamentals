project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecione e gerencie armazenamento, bancos de dados e caches pelo painel Application.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecionar e gerenciar armazenamento, bancos de dados e caches {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
Inspecione e gerencie armazenamento, bancos de dados e caches no
painel <strong>Application</strong>.


### TL;DR {: .hide-from-toc }
- Visualize e edite armazenamento local e da sessão.
- Inspecione e modifique bancos de dados IndexedDB.
- Execute instruções em um banco de dados Web SQL.
- Visualize caches do aplicativo e do service worker.
- Apague todo o armazenamento, os bancos de dados, os caches e os service workers com apenas um clique.


## Armazenamento local {:#local-storage}

Se estiver usando [armazenamento local][ls] para guardar pares chave-valor (KVPs), você poderá
inspecionar, modificar e excluir esses KVPs do painel **Local Storage**.

![painel local storage][ls-pane]

* Clique duas vezes em uma chave ou valor para editá-lo.
* Clique duas vezes em uma célula vazia para adicionar um novo KVP.
* Clique em um KVP e pressione o botão **delete**
(![botão delete][delete]{:.inline}) para excluir esse KVP. Você pode
  apagar todos os dados do armazenamento local com um único clique em um botão do
  [painel **Clear storage**](#clear-storage).
* Se estiver interagindo com uma página de modo que cria, exclui ou modifica
  KVPs, você não poderá ver essas mudanças sendo atualizadas em tempo real. Clique no botão
  **refresh** (![botão refresh][refresh]{:.inline}) para ver as alterações.

[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Armazenamento de sessão {:#session-storage}

O painel **Session Storage** funciona da mesma forma que o painel **Local Storage**.
 Consulte a seção [Armazenamento local](#local-storage) acima para saber como
visualizar e editar o [armazenamento de sessão][ss].

[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

Use o painel **IndexedDB** para inspecionar, modificar e excluir dados do IndexedDB.

Quando você expande o painel **IndexedDB**, o primeiro nível abaixo dele contém
bancos de dados. Se houver diversos bancos de dados ativos, você verá diversas
 entradas. Na captura de tela abaixo, há apenas um banco de dados ativo na página.

![guia indexeddb][idb-tab]

Clique no nome de um banco de dados para visualizar a origem de segurança, o nome e a versão
desse banco de dados.

![banco de dados indexeddb][idb-db]

Expanda um banco de dados para visualizar seus pares chave-valor (KVPs).

![pares chave-valor do indexeddb][idb-kvps]

Use os botões de seta ao lado do campo de texto **Start from key** para mudar entre
páginas de KVPs.

Expanda um valor e clique duas vezes para editá-lo
Quando você adiciona, modifica ou excluir valores, essas alterações não são atualizadas em
tempo real. Clique no botão **refresh** para atualizar um banco de dados.
![editar um kvp do indexeddb][idb-edit]

Insira uma chave no campo de texto **Start from key** para filtrar todas as chaves com
um valor inferior a essa chave.

![kvps filtrados][idb-filter]

Quando você adiciona, modifica ou exclui valores, essas alterações não são atualizadas em
tempo real. Clique no botão **refresh** (![botão refresh][refresh]{:.inline})
para atualizar um banco de dados.

Clique no botão **clear object store** (![clear object store][cos]{:.inline})
para excluir todos os dados do banco de dados. Isso também pode ser feito
cancelando o registro dos service workers e removendo outros armazenamentos e caches com
um único clique no [painel **Clear storage**](#clear-storage).

[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

Use o painel **Web SQL** para consultar e modificar bancos de dados Web SQL.

Clique em um nome de banco de dados para abrir um console para esse banco de dados. Nesse console, você
poderá executar instruções no banco de dados.

![console do web sql][wsc]

Clique em uma tabela de banco de dados para visualizar os dados dessa tabela.

![tabela do web sql][wst]

* Não é possível atualizar os valores aqui, somente pelo console
  do banco de dados (veja acima).
* Clique no cabeçalho de uma coluna para ordenar a tabela de acordo com ela.
* As mudanças promovidas a uma tabela não são atualizadas em tempo real. Clique no
  botão **refresh** (![botão refresh][refresh]{:.inline}) para visualizar as
  atualizações.
* Insira uma lista separada por espaços ou vírgulas com os nomes de colunas no campo de texto
  **Visibile columns** para exibir essas colunas.

[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## Application Cache {:#application-cache}

Use o painel **Application Cache** para inspecionar os recursos e regras que foram
criados por meio da [Application Cache API][appcache-api].

![painel application cache][appcache]

Cada linha representa um recurso.

A coluna **Type** terá um dos seguintes valores:

* **Master**. O atributo `manifest` no recurso indicou que este
  cache é seu mestre.
* **Explicit**. Este recurso foi listado explicitamente no manifesto.
* **Network**. O manifesto especificou que este recurso pode vir da
  rede.
* **Fallback**. O URL na coluna **Resource** foi listado como fallback
  para outro URL (não mostrado no DevTools).

Na parte inferior da tabela, há ícones de status que indicam a conexão
de rede e o status do cache de aplicativos. O cache do aplicativo
pode ter os seguintes status:

* **IDLE**. O cache não tem novas mudanças.
* **CHECKING**. O manifesto foi buscado e verificado para receber atualizações.
* **DOWNLOADING**. Os recursos estão sendo adicionados ao cache.
* **UPDATEREADY**. Uma nova versão do cache está disponível.
* **OBSOLETE**. O cache está sendo excluído.

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## Caches do service worker {:#service-worker-caches}

A seção **Cache Storage** no painel **Application** permite inspecionar,
modificar, e depurar caches criados com a Cache API (service worker). Consulte
o guia abaixo para obter mais ajuda.

{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## Apagar service workers, armazenamento, bancos de dados e caches {:#clear-storage}

Algumas vezes, você precisa simplesmente apagar todos os dados de uma determinada origem. A seção **Clear
Storage** no painel **Application** permite cancelar o registro
de service workers, armazenamento e caches seletivamente. Para apagar os dados, basta marcar as caixas de seleção
perto dos componentes que deseja excluir e clicar em **Clear site
data**. A ação apaga todos os dados da origem listada no rótulo
**Clear storage**.

![apagar armazenamento][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
