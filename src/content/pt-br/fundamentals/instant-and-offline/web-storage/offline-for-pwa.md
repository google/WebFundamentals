project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como armazenar dados localmente para obter melhor tempo de resposta e compatibilidade com o modo off-line.

{# wf_updated_on: 2016-09-29 #}
{# wf_published_on: 2016-09-29 #}

# Armazenamento off-line para Progressive Web Apps {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="PWA no DevTools">
  <figcaption>
    O Progressive Web App <a href="https://pokedex.org" class="external">Pokedex</a>
    usa o IndexedDB para o estado do aplicativo e o conjunto de dados
    Pokemon. A Cache API é usada para recursos endereçáveis por URL.
  </figcaption>
</figure>

As conexões com a Internet podem ser instáveis ou inexistentes durante o deslocamento do usuário. É por isso que
o suporte ao modo off-line e o desempenho confiável são recursos comuns em [Progressive
Web Apps](/web/progressive-web-apps/). Mesmo em
ambientes sem fio perfeitos, o uso criterioso de armazenamento em cache e outras técnicas
de armazenamento pode aprimorar substancialmente a experiência do usuário. Nesta publicação,
resumiremos algumas ideias sobre armazenamento de dados off-line para PWAs. Pense em cargas úteis
JSON, imagens e dados estáticos em geral necessário para oferecer uma
experiência off-line *significativa*.

<div class="clearfix"></div>

## Recomendação

Vamos direto ao assunto com uma recomendação geral para o armazenamento de dados
off-line:

* Para recursos endereçáveis por URL, use a [**Cache API**](https://davidwalsh.name/cache)
  (parte dos [service workers](/web/fundamentals/primers/service-worker/)).
* Para todos os outros dados, use [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  (com um agrupador de [promessas](/web/fundamentals/getting-started/primers/promises)).

A argumentação é a seguinte:

As duas APIs são assíncronas (o IndexedDB é baseado em eventos e a Cache API é
baseada em promessas). Elas também funcionam com [web workers, window workers e service
workers](https://nolanlawson.github.io/html5workertest/). O IndexedDB está
disponível [por toda parte](http://caniuse.com/#feat=indexeddb). Os Service
Workers (e a Cache API)
[já estão disponíveis](https://jakearchibald.github.io/isserviceworkerready/) no Chrome,
no Firefox e no Opera, e estão em desenvolvimento para o Edge. Os agrupadores de promessas para o
IndexedDB ocultam alguns recursos poderosos, mas também complexos
(por exemplo, transações, controle de versões de schemas) fornecidos com a biblioteca do
IndexedDB. O IndexedDB será compatível com
[observadores](https://github.com/WICG/indexed-db-observers), que permitem uma fácil
sincronização entre guias.

O Safari 10
[corrigiu muitos bugs antigos do IndexedDB](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)
nas últimas visualizações técnicas. OBSERVAÇÃO:  algumas pessoas encontraram problemas
de estabilidade com o IndexedDB and PouchDB do Safari 10 e constataram que eles são um
pouco lentos. Enquanto pesquisas adicionais não forem realizadas sobre esse problema, sua experiência pode variar.
Faça testes e registre bugs do navegador para que @webkit e os autores da
biblioteca relacionada de OSS possam examiná-los. Por padrão, LocalForage, PouchDB, YDN e Lovefield
usam WebSQL no Safari (devido à falta de uma forma eficiente de testar recursos para
IndexedDB com problemas). Isso significa que essas bibliotecas funcionarão
no Safari 10 com pouco esforço adicional (apenas não usando diretamente o IndexedDB).

Para PWAs, você pode armazenar em cache recursos estáticos, compondo o shell do aplicativo
(arquivos JS/CSS/HTML) usando a Cache API e preenchendo os dados da página off-line usando o
IndexedDB. A compatibilidade com a depuração do IndexedDB já está disponível no
[Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)
(guia Application),
Opera, [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)
(Storage Inspector) e Safari (veja a guia Storage).

## E os outros mecanismos de armazenamento?

O armazenamento Web (por exemplo, LocalStorage e SessionStorage) é síncrono, não é compatível com web
workers e tem limitações de tamanho e tipo (somente strings). Os cookies [podem ser
úteis](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), mas são
síncronos, não são compatíveis com web workers e também têm limitações de tamanho.
O WebSQL não tem uma ampla compatibilidade com navegadores e não recomendamos sua utilização.
A File System API não é compatível com nenhum navegador que não seja o Chrome. A
[File API](https://developer.mozilla.org/en-US/docs/Web/API/File) está
sendo aprimorada nas especificações da
[File and Directory Entries API](https://wicg.github.io/entries-api/)
e da [File API](https://w3c.github.io/FileAPI/), mas nenhuma delas já é
suficientemente madura ou padronizada para permitir sua adoção generalizada.

## Quantos dados posso armazenar?

<table>
  <thead>
    <th>Navegador</th>
    <th>Limite</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>&lt;6% do espaço livre</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>&lt;10% do espaço livre</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>&lt;50 MB</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>&lt;250 MB</td>
    </tr>
  <tbody>
</table>

No Chrome e no Opera, o armazenamento é por origem (em vez de por API). Os dois
mecanismos armazenarão dados até que a
[cota](http://www.html5rocks.com/en/tutorials/offline/quota-research/) do navegador seja
alcançada. Os aplicativos podem verificar quanta cota já usaram com a [Quota Management
API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota). No Chrome,
os aplicativos podem usar até 6% do espaço
livre em disco. No Firefox, os aplicativos podem usar até 10% do espaço livre em disco, mas
solicitarão a aprovação do usuário se for preciso armazenar mais que 50 MB de dados. No
Safari para dispositivo móveis, os aplicativos podem usar no máximo 50 MB. O Safari para desktops permite armazenamento ilimitado
(e notifica após 5 MB). O IE10 ou posterior permite no máximo 250 MB e notifica o usuário após
10 MB. O PouchDB [acompanha](https://pouchdb.com/faq.html#data_limits) o comportamento de armazenamento
do IDB.

## Como posso saber quanto espaço de armazenamento meu aplicativo está usando?

No Chrome, a [Quota Management API](https://www.w3.org/TR/quota-api/) permite
que você consulte o tamanho do espaço de armazenamento usado e o espaço
disponível para o aplicativo. Uma [Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736) mais recente tenta facilitar
ainda mais a consulta da cota usada por uma origem e é compatível com
promessas.

## Como funciona o despejo de cache?

<table>
  <thead>
    <th>Navegador</th>
    <th>Política de despejo</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>LRU quando o Chrome esgotar o espaço</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>LRU quando esgotar o espaço em disco</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>Sem despejo</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>Sem despejo</td>
    </tr>
  <tbody>
</table>

Uma origem recebe uma quantidade de espaço para usar como quiser. Esse espaço livre
é compartilhado entre todas as formas de armazenamento de origem (IndexedDB, Cache API,
localStorage, etc). A quantidade fornecida não é especificada e varia em função das
condições do dispositivo e do armazenamento.

Quando a capacidade de armazenamento Web ficar reduzida, o UA apagará armazenamento para liberar espaço. Isso
pode prejudicar a capacidade de resposta off-line. Portanto, a especificação
[Storage](https://storage.spec.whatwg.org/), recentemente atualizada, define as estratégias "persistente" e
"melhor esforço", sendo esta última o padrão. "Melhor esforço"
significa que o armazenamento pode ser apagado sem interromper o usuário, mas é menos
durável para dados de longo prazo e/ou essenciais. Hoje, o IndexedDB e a Cache API
são classificados na categoria "melhor esforço".

O armazenamento "persistente" não é apagado automaticamente quando a capacidade de armazenamento fica reduzida. O
usuário precisa apagar manualmente esse armazenamento (por meio das configurações do navegador). O Chrome está
experimentando com a compatibilidade com [armazenamento
persistente](/web/updates/2016/06/persistent-storage)
em uma avaliação de origem e as informações mais recentes sugerem que isso será disponibilizado no
[Chrome
55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ).

## Trabalho de armazenamento off-line atual e futuro

Se você se interessa por armazenamento off-line, vale a pena acompanhar as iniciativas a
seguir.

* [Durable Storage](https://storage.spec.whatwg.org/): proteja o armazenamento contra as
políticas de apagamento do user-agent.

* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): gerenciamento
avançado de dados chave-valor.

* [Promisified
IndexedDB](https://github.com/inexorabletash/indexeddb-promises): suporte
nativo a uma versão do IndexedDB compatível com promessas.

* [IndexedDB Observers](https://github.com/WICG/indexed-db-observers): observação
nativa do IndexedDB sem necessidade de um agrupador para o banco de dados.

* [Async Cookies API](https://github.com/bsittler/async-cookies-api): API assíncrona
de cookies JavaScript para documentos e workers.

* [Quota Management API](https://www.w3.org/TR/quota-api/): verifique a cota usada
por um aplicativo/origem.

* [writable-files](https://github.com/WICG/writable-files): permita que os sites
interajam com arquivos locais de forma mais integrada.

* [Directory download](https://github.com/drufball/directory-download): permita
que os sites baixem diretórios sem arquivos .zip.

* [File and Directory Entries API](https://wicg.github.io/entries-api/):
compatibilidade com upload de arquivos e diretórios com uma interface de arrastar e soltar.

* A compatibilidade com uma [Async Cookies
API](https://github.com/WICG/async-cookies-api) está sendo definida neste momento,
considerando também o polyfill.

* No momento, o Edge não permite depurar o IndexedDB (no entanto, é possível
depurar o JetDB subjacente) — vote
[aqui](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)
pela compatibilidade integrada.

* Embora [ideias](https://github.com/slightlyoff/async-local-storage) sobre
LocalStorage assíncrono tenham sido discutidas no passado, o foco atual é aprimorar o estado do
[IndexedDB 2.0](https://w3c.github.io/IndexedDB/).

* Com o tempo, a proposta [writable-files](https://github.com/WICG/writable-files) poderá
nos fornecer uma solução melhor e padronizada para interação integrada
com arquivos locais.

* Para aplicativos que exigem armazenamento mais persistente, consulte o trabalho contínuo sobre
[Durable Storage](https://storage.spec.whatwg.org/).

Na verdade, o armazenamento off-line não faz mágicas. A compreensão das APIs subjacente
ajudará bastante a aproveitar ao máximo o que já está disponível.
Você pode usar essas APIs diretamente ou trabalhar com uma biblioteca de
abstração. Nos dois casos, reserve um tempo para se familiarizar com as opções.

Espero que esta orientação ajude você a criar uma experiência off-line que faça seu
PWA brilhar!

### Leitura complementar

* [O estado das APIs do armazenamento
off-line](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
por Joshua Bell

* [Comparação de bancos de dados
de navegadores](http://nolanlawson.github.io/database-comparison/) por Nolan Lawson

* [IndexedDB, WebSQL, LocalStorage — o que bloqueia o
DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)

* [Como pensar sobre bancos de dados (pesquisa da
Pokedex)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)

* [Quais APIs são compatíveis com web workers e service
workers?](https://nolanlawson.github.io/html5workertest/)

### Recursos úteis

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) (armazenamento em cache off-line
para solicitações dinâmicas/em tempo de execução)

* [sw-precache](https://github.com/GoogleChrome/sw-precache) (armazenamento
prévio em cache off-line para ativos estáticos/shells de aplicativos)

* Usuários do Webpack podem usar diretamente os recursos acima ou o
[offline-plugin](https://github.com/NekR/offline-plugin)

### Bibliotecas do IndexedDB que merecem atenção

* [localForage](https://github.com/localForage/localForage)(cerca de 8 KB, promessas, boa
compatibilidade com navegadores legados)

* [Dexie](http://dexie.org/) (cerca de 16 KB, promessas, consultas complexas, índices
secundários)

* [PouchDB](https://pouchdb.com/) (cerca de 45 KB (compatível com [compilações
personalizadas](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)),
sincronização)

* [Lovefield](https://github.com/google/lovefield) (relacional)

* [LokiJS](http://lokijs.org/#/) (na memória)

* [ydn-db](https://github.com/yathit/ydn-db) (semelhante ao dexie, funciona com WebSQL)

**Agradecimentos a Nolan Lawson, Joshua Bell (seu trabalho sobre Open Web Storage e o
[BlinkOn talk](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
inspiraram substancialmente este artigo), Jake Archibald, Dru Knox e outros pelos
trabalhos anteriores sobre armazenamento Web.**



{# wf_devsite_translation #}
