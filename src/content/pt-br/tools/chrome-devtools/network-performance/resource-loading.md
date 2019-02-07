project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Meça o desempenho da rede do seu aplicativo da Web usando o painel “Network” do Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Medir tempos de carregamento de recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}


Warning: esta página está obsoleta. Sobre cada sessão, há
um link para uma página atualizada onde você pode encontrar informações parecidas.

Meça o desempenho da rede do seu site com o painel
<strong>Network</strong>.


O painel **Network** registra informações sobre cada operação de rede em
uma página, incluindo dados de sincronização detalhados, cabeçalhos de solicitação e
resposta HTTP, cookies e muito mais.


### TL;DR {: .hide-from-toc }
- Use o painel “Network” para registrar e analisar a atividade de rede.
- Visualize informações de carregamento de recursos em conjunto ou individualmente.
- Filtre e classifique o modo de exibição dos recursos.
- Salve, copie e apague registros de rede.
- Personalize o painel “Network” de acordo com suas necessidades.

## Visão geral do painel “Network”

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte as seções a seguir para encontrar informações
 atualizadas:
  <ul>
    <li><a href="reference#controls">Painel “Controls”</a></li>
    <li><a href="reference#filters">Painel “Filters”</a></li>
    <li><a href="reference#overview">Painel “Overview”</a></li>
    <li><a href="reference#requests">Painel “Requests”</a></li>
    <li><a href="reference#summary">Painel “Summary”</a></li>
  </ul>
</aside>

O painel “Network” é composto de cinco seções:

1. **Controls**. Use estas opções para controlar as opções de exibição
   e funcionamento do painel **Network**.
2. **Filters**. Use estas opções para controlar quais recursos são exibidos na
   **Requests Table**. Dica: mantenha pressionado <kbd>Cmd</kbd> (Mac) ou <kbd>Ctrl</kbd>
   (Windows/Linux) e clique em uma opção para selecionar diversos filtros ao
   mesmo tempo.
3. **Overview**. Este gráfico mostra uma linha do tempo que indica quando os recursos foram recuperados.
   Se você vir diversas barras empilhadas no sentido vertical, significa que esses recursos
   foram recuperados simultaneamente.
4. **Requests Table**. Esta tabela lista todos os recursos que foram recuperados.
   Por padrão, esta tabela é ordenada de forma cronológica, começando com os recursos
 mais antigos.
   Clique no nome de um recurso para ver mais informações sobre ele.
   Dica: clique com o botão direito em qualquer título da tabela, exceto **Timeline**, para
   adicionar ou remover colunas de informação.
5. **Summary**. Instantaneamente, esta seção mostrará o total de solicitações,
   a quantidade de dados transferida e os tempos de carregamento.

![seções do painel “Network”](imgs/panes.png)

Por padrão, a **Requests table** exibe as seguintes colunas: Você pode
[adicionar e remover colunas](#add-and-remove-table-columns).

* **Name**. É o nome do recurso.
* **Status**. É o código de status HTTP.
* **Type**. É o tipo MIME do recurso solicitado.
* **Initiator**. É o objeto ou processo que iniciou a solicitação. Ele pode
 ter um dos seguintes valores:
  * **Parser**. É o analisador de HTML do Chrome que iniciou a solicitação.
  * **Redirect**. É um redirecionamento de HTTP que iniciou a solicitação.
  * **Script**. É um script que iniciou a solicitação.
  * **Other**. É algum outro processo ou ação que iniciou a solicitação,
    como o usuário acessando uma página por um link ou inserindo um
    URL na barra de endereço.
* **Size**. É o tamanho combinado dos cabeçalhos da resposta (normalmente com
 algumas centenas de bytes), além do corpo da resposta, conforme fornecido pelo servidor.
* **Time**. É a duração total, desde o início da solicitação até o
 recebimento do byte final na resposta.
* **Timeline**. A coluna Timeline exibe a hierarquia visual de todas
 as solicitações de rede. Clique no título desta coluna para ver um menu de
 campos de classificação adicionais.

## Registrar atividade de rede

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#record">Iniciar ou finalizar gravação</a>
  para encontrar informações atualizadas.
</aside>

Quando o painel **Network** é aberto, o DevTools registra todas as atividades de rede
por padrão. Para fazer esses registros, basta atualizar uma página com o painel aberto ou esperar
a atividade de rede na página carregada no momento.

Saiba se o DevTools está fazendo a gravação usando o botão
**record**. Se estiver vermelho
(![botão record ligado](imgs/record-on.png){:.inline}), indica que o DevTools está gravando.
Quando estiver cinza (![botão record desligado](imgs/record-off.png){:.inline}), significa que o DevTools
não está gravando. Clique nesse botão para iniciar ou parar a gravação ou pressione
o atalho do teclado <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Capturar imagens da tela durante a gravação {:#filmstrip}

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#screenshots">Capturar imagens da tela durante a gravação</a>
  para encontrar informações atualizadas.
</aside>

O painel **Network** pode capturar imagens da tela durante um carregamento de página. Este recurso
é conhecido como **Filmstrip**.

Clique no ícone de **câmera** para ativar o Filmstrip. Quando o ícone estiver cinza,
indica que o Filmstrip está desativado (![filmstrip
desativado](imgs/filmstrip-disabled.png){:.inline}). O ícone azul significa que ele está
ativo (![filmstrip ativo](imgs/filmstrip-enabled.png){:.inline}).

Atualize a página para capturar as imagens da tela. As capturas de tela são exibidas
acima de **Overview**.

![gravação com filmstrip](imgs/filmstrip.png)

Ao passar o cursor em uma captura de tela, a **Timeline** exibe uma linha vertical
amarela para indicar quando o frame foi capturado.

![sobreposição do filmstrip na linha do tempo](imgs/filmstrip-timeline-overlay.png)

Clique duas vezes em uma captura de tela para visualizar uma versão dela com zoom. Enquanto
a captura de tela estiver com zoom, use as setas para esquerda e direita do teclado
para navegar entre elas.

![captura de tela do filmstrip com zoom](imgs/filmstrip-zoom.png)

## Ver DOMContentLoaded e carregar informações do evento

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#load">Visualizar eventos de carregamento</a>
  para encontrar informações atualizadas.
</aside>

O painel **Network** destaca dois eventos:
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) e
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` é acionado quando a marcação inicial de uma página é
analisada. Ele é exibido em dois locais no painel **Network**:

1. A barra vertical azul no painel **Overview** simboliza o evento.
2. No painel **Summary**, você pode ver o horário exato do evento.

![Evento DOMContentLoaded no painel de rede](imgs/domcontentloaded.png)

`load` é acionado quando uma página é totalmente carregada. Ele é exibido em três locais:

1. A barra vertical vermelha no painel **Overview** simboliza o evento.
2. A barra vertical vermelha em **Requests Table** também simboliza o evento.
3. No painel **Summary**, você pode ver o horário exato do evento.

![evento de carregamento no painel network](imgs/load.png)

## Visualizar detalhes de um único recurso

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#details">Visualizar detalhes</a>
  para encontrar informações atualizadas.
</aside>

Clique no nome de um recurso (na coluna **Name** da **Requests Table**)
para obter mais informações sobre ele.

As guias disponíveis variam dependendo do tipo de recurso que você selecionar,
mas as quatro indicadas abaixo são as mais comuns:

* **Headers**. São os cabeçalhos HTTP associados ao recurso.
* **Preview**. É uma visualização de recursos JSON, de imagem e texto.
* **Response**. São dados da resposta HTTP (se houver).
* **Timing**. É um detalhamento granular do ciclo de vida da solicitação do
 recurso.

![visualizar detalhes de um único recurso](imgs/network-headers.png)

### Visualizar sincronização da rede

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#timing">guia “Timing”</a>
  para encontrar informações atualizadas.
</aside>

Clique na guia **Timing** para ver um detalhamento granular do ciclo de vida da
solicitação de um único recurso.

O ciclo de vida mostra quanto tempo foi gasto nas seguintes categorias:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled
* Se aplicável: Busca de DNS, conexão inicial, SSL handshake
* Solicitação enviada
* Espera (Tempo para o primeiro byte (TTFB))
* Download de conteúdo

![guia timing](imgs/timing-tab.png)

Você ainda pode ver estas mesmas informações passando o cursor sobre um
recurso dentro do gráfico **Timeline**.

![dados de sincronização de um recurso na linha do tempo](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Guias relacionadas:

* [Como entender Resource Timing](understanding-resource-timing)

### Visualizar cabeçalhos HTTP

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#headers">guia “Headers”</a>
  para encontrar informações atualizadas.
</aside>

Clique em **Headers** para ver os cabeçalhos desse recurso.

A guia **Headers** exibe o URL da solicitação, o método HTTP e
o código de status da resposta do recurso. Além disso, ela uma lista os cabeçalhos de solicitação e resposta HTTP
e os valores correspondentes, além de todos os parâmetros string query.

![Cabeçalhos HTTP de um único recurso](imgs/network-headers.png)

Você pode ver cabeçalhos de resposta, de solicitação ou parâmetros string query
na fonte ou no formato analisado clicando no link `view source` ou `view parsed`
ao lado de cada seção.

![visualizar código do cabeçalho](imgs/view-header-source.png)

Também é possível visualizar parâmetros da string query no URL criptografado ou no formato decodificado
clicando no link `view URL encoded` ou `view decoded` ao lado de cada seção.

![visualizar URL criptografado](imgs/view-url-encoded.png)

### Visualizar um recurso

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#preview">guia “Preview”</a>
  para encontrar informações atualizadas.
</aside>

Clique na guia **Preview** para acessar a visualização de um recurso. A guia **Preview**
pode ou não exibir informações úteis, dependendo do tipo de
recurso selecionado.

![visualizar recurso de imagem](imgs/preview-png.png)

### Ver conteúdo da resposta HTTP

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#response">guia “Response”</a>
  para encontrar informações atualizadas.
</aside>

Clique na guia **Response** para visualizar o conteúdo da resposta HTTP não formatada do
recurso. A guia **Response** pode ou não conter informações úteis,
dependendo do tipo de recurso selecionado.

![Dados de resposta do recurso JSON](imgs/response-json.png)

### Ver cookies

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#cookies">guia “Cookies”</a>
  para encontrar informações atualizadas.
</aside>

Clique na guia **Cookies** para ver uma tabela de cookies transmitidos nos
cabeçalhos de resposta e solicitação HTTP do recurso. Esta guia só é disponibilizada
quando cookies são transmitidos.

Abaixo há uma descrição de cada uma das colunas da tabela:

* **Name**. É o nome do cookie.
* **Value**. É o valor do cookie.
* **Domain**. É o domínio a que o cookie pertence.
* **Path**. É o caminho do URL de onde veio o cookie.
* **Expires / Max-Age**. É o valor das propriedades expires ou max-age do
 cookie.
* **Size**. É o tamanho do cookie em bytes.
* **HTTP**. Indica que o cookie não deve ser definido pelo navegador na
 solicitação HTTP e não pode ser acessado com JavaScript.
* **Secure**. A presença deste atributo indica que o cookie só
 deve ser transmitido por uma conexão segura.

![cookies de recursos](imgs/cookies.png)

### Ver frames do WebSocket

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte a
 <a href="reference#frames">guia “Frames”</a>
  para encontrar informações atualizadas.
</aside>

Clique na guia **Frames** para ver
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
informações de conexão. Esta guia só ficará visível quando o recurso selecionado
iniciar uma conexão `WebSocket`.

![guia de frames do Websocket](imgs/websocket-frames.png)

A tabela abaixo descreve cada uma das colunas da tabela da guia **Frames**
:

* **Data**. É o payload da mensagem. Se a mensagem for de texto simples, será
 exibida aqui. Para códigos de operação binária, este campo exibe o nome e o código
 do código de operação. Os seguintes códigos de operação são aceitos:
  * Continuation Frame
  * Binary Frame
  * Connection Close Frame
  * Ping Frame
  * Pong Frame
* **Length**. É o comprimento do payload da mensagem em bytes.
* **Time**. Indica a data e a hora em que a mensagem foi criada.

As mensagens são codificadas por cor de acordo com o tipo:

* As mensagens de texto de saída têm cor verde claro.
* As mensagens de texto recebidas têm cor branca.
* Os códigos de operação WebSocket têm cor amarelo-claro.
* Os erros têm cor vermelho-claro.

**Observações sobre a atual implementação:**

* Para atualizar a tabela **Frames** depois que uma nova mensagem chegar, clique no
 nome do recurso à esquerda.
* Somente as 100 mensagens `WebSocket` mais recentes são mantidas pela tabela **Frames**.

## Visualizar iniciadores e dependências dos recursos {:#initiators-dependencies}

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#initiators-dependencies">Visualizar iniciadores e
 dependências</a> para encontrar informações atualizadas.
</aside>

Mantenha a tecla <kbd>Shift</kbd> pressionada e passe o cursor sobre um recurso para visualizar os iniciadores
e as dependências correspondentes. Esta seção tratará esse recurso
como o **alvo**.

O primeiro recurso acima do alvo que tiver cor verde é o iniciador
do alvo. Se houver um segundo recurso acima dele também de cor
verde também, isso indica que ele é o iniciador do iniciador. Todos os recursos abaixo do alvo
com cor vermelha são dependências do alvo.

Na imagem abaixo, o alvo é `dn/`. O iniciador do alvo é
o script que começa com `rs=AA2Y`. O iniciador do iniciador
(`rs=AA2Y`) é `google.com`. Por fim, `dn.js` é uma dependência do
alvo (`dn/`).

![visualizar iniciadores e dependências dos
recursos](imgs/initiators-dependencies.png)

Nas páginas com muitos recursos, talvez
você não consiga ver todos os iniciadores nem todas as dependências.

## Classificar solicitações

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#sort-by-activity">Ordenar por fase de atividade</a>
  para encontrar informações atualizadas.
</aside>

Por padrão, os recursos na **Requests Table** são classificados pelo horário
de início de cada solicitação, exibindo as solicitações mais antigas na parte superior.

Clique no título de uma coluna para classificar a tabela de acordo com o valor de cada recurso
correspondente. Clique no mesmo título novamente para alterar a classificação para
ascendente ou descendente.

A coluna **Timeline** é diferente das outras. Quando clicada, ela exibe
um menu de campos de classificação:

* **Timeline**. Classifica pelo tempo de início de cada solicitação de rede. Esta é
 a classificação padrão, funciona como classificar usando a opção **Start Time**.
* **Start Time**. Classifica pelo horário de início de cada solicitação de rede (equivalente
 a classificar usando a opção **Timeline**).
* **Response Time**. Classifica pelo tempo de resposta das solicitações.
* **End Time**. Classifica pelo tempo em que as solicitações foram concluídas.
* **Duration**. Classifica pelo tempo total das solicitações. Selecione este
 filtro para determinar que recurso leva mais tempo para carregar.
* **Latency**. Classifica pelo tempo entre o início da solicitação e o
 começo da resposta. Selecione este filtro para determinar que recurso
 leva mais tempo para o primeiro byte (TTFB).

![Campos de classificação da Timeline](imgs/timeline-sort-fields.png)

## Filtrar solicitações

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte o
 <a href="reference#filters">painel “Filters”</a>
  para encontrar informações atualizadas.
</aside>

O painel **Network** oferece diversas maneiras de filtrar os recursos que serão
exibidos. Clique no botão **filters**
(![botão filters](imgs/filters.png){:.inline})
para ocultar ou exibir o painel **Filters**.

Use os botões específicos para exibir somente recursos do tipo de conteúdo
selecionado.

Note: mantenha as teclas <kbd>Cmd</kbd> (Mac) ou <kbd>Ctrl</kbd> (Windows/Linux) pressionadas e, em seguida, clique para ativar diversos filtros simultaneamente.

![diversos filtros de tipo de conteúdo selecionados
simultaneamente](imgs/multiple-content-type-filters.png)

O campo de texto **filter** é enganosamente poderoso. Se você inserir uma
string arbitrária nele, o painel **Network** só exibirá os recursos com
nomes de arquivo que correspondem a essa string específica.

![filtragem por nome do recurso](imgs/resource-name-filtering.png)

O campo de texto **filter** também é compatível com diversas palavras-chave que permitem
classificar os recursos por diversas propriedades, como o tamanho do arquivo usando a
palavra-chave `larger-than`.

A lista abaixo descreve todas as palavras-chave.

* `domain`. Só exibe recursos do domínio especificado. Você pode usar um
 caractere curinga (`*`) para incluir diversos domínios. Por exemplo, `*.com`
 exibe recursos de todos os nomes de domínio que acabam com `.com`. O DevTools
 preenche o menu suspenso de preenchimento automático com todos os domínios
 que encontrar.
* `has-response-header`. Exibe os recursos que contêm o cabeçalho de resposta
 HTTP especificado. O DevTools preenche o menu suspenso de preenchimento automático com
 todos os cabeçalhos de resposta que encontrar.
* `is`. Use `is:running` para encontrar recursos `WebSocket`.
* `larger-than`. Exibe recursos maiores do que o tamanho especificado,
 em bytes. Definir um valor de `1000` é equivalente a aplicar o valor `1k`.
* `method`. Exibe recursos que foram recuperados por um tipo de método HTTP
 especificado. O DevTools preenche o menu suspenso com todos os métodos HTTP que
 encontrar.
* `mime-type`. Exibe recursos de um tipo MIME específico. O DevTools preenche o
 menu suspenso com todos os tipos MIME que encontrar.
* `mixed-content`. Mostra todos os recursos de conteúdo misto (`mixed-content:all`) ou
 somente os que estão em exibição no momento (`mixed-content:displayed`).
* `scheme`. Exibe recursos recuperados por HTTP desprotegido (`scheme:http`)
 ou HTTPS protegido (`scheme:https`).
* `set-cookie-domain`. Exibe os recursos que têm um cabeçalho `Set-Cookie`
 com um atributo `Domain` correspondente ao valor especificado. O DevTools
 preenche automaticamente com todos os domínios de cookies que
 encontrar.
* `set-cookie-name`. Exibe os recursos que têm um cabeçalho `Set-Cookie`
 com um nome correspondente ao valor especificado. O DevTools
 preenche automaticamente com todos os nomes de cookie que encontrar.
* `set-cookie-value`. Exibe os recursos que têm um cabeçalho `Set-Cookie`
 com um valor correspondente ao especificado. O DevTools
preenche automaticamente com todos os valores de cookie que encontrar.
* `status-code`. Exibe somente recursos com códigos de status HTTP que correspondem ao
 código especificado. O DevTools preenche o menu suspenso de preenchimento automático com todos
 os códigos de status que encontrar.

![filtragem por tamanho do arquivo](imgs/larger-than.png)

Algumas das palavras-chave acima mencionam um menu suspenso de preenchimento automático. Para acionar
o menu de preenchimento automático, digite a palavra-chave seguida de dois pontos (":"). Por exemplo,
na captura de tela abaixo, a inclusão de `domain:` acionou o menu suspenso de preenchimento automático.

![filtrar preenchimento automático de campo de texto](imgs/filter-autocomplete.png)

## Copiar, salvar e apagar informações de rede

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte as seções a seguir para encontrar informações
 atualizadas:
  <ul>
    <li><a href="reference#copy">Copiar uma ou todas as solicitações</a></li>
    <li><a href="reference#save-as-har">Salvar como HAR com conteúdo</a></li>
    <li><a href="reference#clear-cache">Limpar cache do navegador</a></li>
    <li><a href="reference#clear-cookies">Limpar cookies do navegador</a></li>
  </ul>
</aside>

Clique com o botão direito na **Requests Table** para copiar, salvar ou
excluir informações de rede. Algumas das opções são contextuais. Por isso,
se você quiser operar em um único recurso, clique com o botão direito na
linha correspondente. A lista abaixo descreve as opções.

* **Copy Response**. Copia a resposta HTTP do recurso selecionado para
 a área de transferência do sistema.
* **Copy as cURL**. Copia a solicitação de rede do recurso selecionado como uma
 string de comando [cURL](http://curl.haxx.se/){: .external } para a área de transferência do sistema.
  Consulte [Como copiar solicitações como comandos cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**. Copia para a área de transferência do sistema todos os recursos como dados
 [HAR](https://en.wikipedia.org/wiki/.har){: .external } para a área de transferência do sistema.
  Um arquivo HAR contém uma estrutura de dados JSON que descreve a “hierarquia"
 da rede. Diversas [ferramentas](https://ericduran.github.io/chromeHAR/){: .external }
  [de terceiros](https://code.google.com/p/harviewer/){: .external } podem reconstruir a hierarquia
 da rede a partir dos dados do arquivo HAR. Consulte a
 [Ferramenta de poder de desempenho da Web: arquivo HTTP
 (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
 para mais informações.
* **Save as HAR with Content**. Salva todos os dados de rede em um
 arquivo HAR junto com cada recurso da página. Recursos binários, incluindo imagens,
 são codificados como texto com codificação Base64.
* **Clear Browser Cache**. Limpa o cache do navegador.
  **Dica**: você também pode ativar ou desativar o cache do navegador na gaveta
 [**Network Conditions**][nc].
* **Clear Browser Cookies**. Apaga os cookies do navegador.
* **Open in Sources Panel**. Abre o recurso selecionado no painel **Sources**
.
* **Open Link in New Tab**. Abre o recurso selecionado em uma nova aba. Você também pode
 clicar duas vezes no nome do recurso na tabela Network.
* **Copy Link Address**. Copia o URL do recurso para a área de transferência do sistema.
* **Save**. Salva o recurso de texto selecionado. Exibido somente em recursos
 de texto.
* **Replay XHR**. Reenvia o `XMLHTTPRequest` selecionado. Exibido somente em recursos
 XHR.

![copiar e salvar menu de contexto](imgs/copy-save-menu.png)

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Copiar uma ou todas as solicitações como comandos cURL {: #curl }

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#copy">Copiar uma ou todas as solicitações</a>
  para encontrar informações atualizadas.
</aside>

[cURL](http://curl.haxx.se/){: .external } é uma ferramenta de linha de comando usada para realizar transações
HTTP.

Clique com o botão direito em um recurso na Requests Table, passe
o cursor sobre **Copy** e selecione **Copy as cURL** para copiar uma string de solicitações cURL a todos os
recursos que foram detectados pelo painel “Network”.

![Copiar solicitação única como comando cURL](imgs/copy-as-curl.png)

Selecione **Copy All as cURL** para copiar uma string de solicitações cURL para
todos os recursos que foram detectados pelo painel “Network”.

Ao copiar tudo, a filtragem é ignorada. Por exemplo, se você filtrar o painel “Network”
para exibir somente recursos de CSS e pressionar **Copy All as cURL**, terá acesso a
todos os recursos detectados, e somente aos de CSS.

## Personalizar o painel “Network”

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#request-rows">Usar linhas de solicitações grandes ou pequenas</a>
  para encontrar informações atualizadas.
</aside>

Por padrão, a **Requests Table** exibe recursos com linhas pequenas. Clique
no botão **Use large resource rows**
(![botão de linhas de recurso grandes](imgs/large-resource-rows-button.png){:.inline})
para aumentar o tamanho de cada linha.

Linhas maiores permitem que algumas colunas exibam dois campos de texto: um primário
e um secundário. O título da coluna indica o significado do
campo secundário.

![linhas de recurso grandes](imgs/large-resource-rows.png)

### Adicionar e remover colunas da tabela

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte as seções a seguir para encontrar informações
 atualizadas:
  <ul>
    <li><a href="reference#columns">Exibir ou ocultar colunas</a></li>
    <li><a href="reference#custom-columns">Adicionar colunas personalizadas</a></li>
  </ul>
</aside>

Clique com o botão direito em qualquer um dos títulos da **Requests Table** para adicionar ou remover
colunas.

![Adicionar ou remover colunas](imgs/add-remove-columns.png)

### Armazenar o registro de rede após navegação

<aside class="warning">
  <b>Warning:</b> esta página está obsoleta. Consulte
 <a href="reference#preserve-log">Preservar registro</a>
  para encontrar informações atualizadas.
</aside>

Por padrão, a gravação das atividades de rede é descartada sempre que a
a página atual ou uma página diferente é atualizada.
Marque a caixa de seleção **Preserve log** para salvar o registro de rede em todas essas
situações. Novos registros são anexados na parte inferior da **Requests Table**.

## Recursos adicionais

Para saber mais sobre como otimizar o desempenho de rede do seu aplicativo, consulte os seguintes recursos:

* Use [Informações
 sobre PageSpeed](/speed/pagespeed/insights) para identificar
 práticas recomendadas de desempenho aplicáveis ao seu site e
 [Ferramentas de otimização
 de PageSpeed](/speed/pagespeed/optimization) para
 automatizar o processo de aplicação dessas práticas recomendadas.
* [Rede de alto desempenho no Google
 Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)
 aborda elementos internos da rede do Chrome e como é possível aproveitá-los ao máximo
 para tornar seu site mais rápido.
* [Como a compressão gzip
 funciona](/speed/articles/gzip) fornece uma
 visão geral de alto nível da compressão gzip e mostra por que ela é eficiente.
* [Práticas recomendadas de desempenho
 na Web](/speed/docs/best-practices/rules_intro)
 oferece mais dicas para otimizar o desempenho de rede da sua página da Web
 ou aplicativo.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
