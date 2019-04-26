project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Um guia abrangente sobre os recursos do painel "Network" do Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# Referência de análise do Network {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Conheça novas maneiras de analisar como sua página é carregada neste guia
abrangente sobre os recursos de análise de rede do Chrome DevTools.

Note: este guia é baseado no Chrome 58. Se você usar outra versão
do Chrome, a IU e os recursos do DevTools poderão ser diferentes. Confira
`chrome://help` para ver qual é a versão do Chrome que você está usando.

## Registrar as solicitações de rede {: #record }

Por padrão, o DevTools registra todas as solicitações de rede no painel "Network",
desde que o DevTools esteja aberto.

<figure>
  <img src="imgs/network.png" alt="O painel "Network".">
  <figcaption>
    <b>Imagem 1</b>. O painel "Network"
  </figcaption>
</figure>

### Suspender o registro das solicitações de rede {: #stop-recording }

Para interromper o registro de solicitações:

* Clique em **Stop recording network log** ![Stop recording network
 log](imgs/record-on.png){: .devtools-inline } no painel "Network". Ele
 fica cinza para indicar que o DevTools não está mais registrando as solicitações.
* Pressione <kbd>Command</kbd>+<kbd>E</kbd> (Mac) ou
 <kbd>Control</kbd>+<kbd>E</kbd> (Windows, Linux) enquanto o painel Network
 estiver em foco.

### Apagar as solicitações {: #clear }

Clique em **Clear** ![Clear][clear]{:.devtools-inline} no painel "Network"
para apagar todas as solicitações na tabela Requests.

<figure>
  <img src="imgs/clear.svg" alt="O botão "Clear".">
  <figcaption>
    <b>Imagem 2</b>. Botão "Clear" destacado em azul
 </figcaption>
</figure>

[clear]: imgs/clear-requests.png

### Salvar as solicitações nos carregamentos de páginas {: #preserve-log }

Para salvar solicitações nos carregamentos de página, marque a caixa de seleção **Preserve log**
no painel "Network". O DevTools salva todas as solicitações até você desativar o
**Preserve log**.

<figure>
  <img src="imgs/preserve-log.svg" alt="A caixa de seleção "Preserve Log".">
  <figcaption>
    <b>Imagem 3</b>. A caixa de seleção "Preserve Log” destacada em azul
 </figcaption>
</figure>

### Fazer capturas de tela durante o carregamento da página {: #screenshots }

Faça capturas de tela para analisar o que os usuários visualizam enquanto esperam o carregamento da
página.

Para ativar as capturas de tela, clique em **Capture screenshots** ![Capture
screenshots][capture]{: .devtools-inline } no painel "Network". Ele fica
azul quando ativado.

Atualize a página enquanto o painel "Network" está em foco para fazer as capturas de tela.

Após as imagens serem capturadas, você pode interagir com elas das seguintes formas:

* Passe o cursor sobre a captura de tela para visualizar o ponto em que a imagem foi
 capturada. Uma linha amarela aparece no painel "Overview".
* Clique na miniatura de uma captura de tela para filtrar qualquer solicitação que tenha sido feita
 depois que a imagem foi capturada.
* Clique duas vezes em uma miniatura para aumentar o zoom.

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="Passando o cursor sobre uma captura de tela.">
  <figcaption>
    <b>Imagem 4</b>. Passando o cursor sobre uma captura de tela. A linha vertical amarela
    no painel "Overview" e a cascata representam o momento em que a
    captura de tela foi feita.
  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### Repetir a reprodução de uma solicitação XHR {: #replay-xhr }

Para reproduzir novamente uma solicitação XHR, clique com o botão direito na solicitação na tabela "Requests"
e selecione **Replay XHR**.

<figure>
  <img src="imgs/replay-xhr.png" alt="Seleção de "Replay XHR".">
  <figcaption>
    <b>Imagem 5</b>. Seleção de "Replay XHR"
 </figcaption>
</figure>

## Alterar o comportamento de carregamento

### Emular um visitante novo ao desabilitar o cache do navegador {: #disable-cache}

Para emular a experiência de um usuário que visita seu site pela primeira vez, marque a caixa de seleção **Disable
cache**. O DevTools desativa o cache do navegador. Isso faz com que a
emulação dessa experiência seja mais precisa porque as solicitações são disponibilizadas por meio do
cache do navegador em visitadas repetidas.

<figure>
  <img src="imgs/disable-cache.svg" alt="A caixa de seleção "Disable Cache".">
  <figcaption>
    <b>Imagem 6</b>. A caixa de seleção "Disable Cache" destacada em azul
 </figcaption>
</figure>

#### Desativar o cache do navegador na gaveta "Network Conditions" {: #disable-cache-network-conditions }

Se você quiser desativar o cache enquanto trabalha em outros painéis do DevTools, use
a gaveta "Network Conditions".

1. Abra a [gaveta Network Conditions](#network-conditions).
1. Marque ou desmarque a caixa de seleção **Disable Cache**.

### Apagar manualmente o cache do navegador {: #clear-cache}

Para apagar manualmente o cache do navegador a qualquer momento, clique com o botão direito em qualquer lugar
na tabela "Requests" e selecione **Clear Navegador Cache**.

<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="Seleção de "Clear Browser Cache".">
  <figcaption>
    <b>Imagem 7</b>. Seleção de "Clear Browser Cache"
 </figcaption>
</figure>

### Emular off-line {: #offline }

Existe uma nova classe de aplicativos da Web, chamados [Progressive Web Apps][pwa], que podem
funcionar off-line com a ajuda de [service workers][sw]. Ao criar
esse tipo de aplicativo, é útil poder simular rapidamente um dispositivo que
não tem conexão de dados.

Marque a caixa de seleção **Offline** para simular uma experiência de rede completamente
off-line.

<figure>
  <img src="imgs/offline.svg"
       alt="A caixa de seleção "Offline"">
  <figcaption>
    <b>Imagem 8</b>. A caixa de seleção "Offline" destacada em azul
 </figcaption>
</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### Emular conexões de rede lentas {: #throttling }

Emule 2G, 3G e outras velocidades de conexão no
menu **Network Throttling**.

<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="O menu "Network Throttling".">
  <figcaption>
    <b>Imagem 9</b>. O menu "Network Throttling" destacado em azul
 </figcaption>
</figure>

Você pode selecionar entre uma variedade de predefinições, como "Regular" ou "Good 2G". Você
também pode adicionar sua própria predefinição personalizada. Abra o menu "Network Throttling"
e selecione **Custom** > **Add**.

O DevTools mostra um ícone de aviso próximo à guia **Network** para
lembrar você que a limitação está ativa.

#### Emular conexões de rede lentas na gaveta "Network Conditions" {: #throttling-network-conditions }

Se você quiser limitar a conexão de rede enquanto trabalha em outros painéis do
DevTools, use a gaveta "Network Conditions".

1. Abra a [gaveta Network Conditions](#network-conditions).
1. Selecione a velocidade de conexão desejada no menu **Network Throttling**.

### Apagar manualmente os cookies do navegador {: #clear-cookies }

Para apagar manualmente os cookies do navegador a qualquer momento, clique com o botão direito em qualquer lugar da
tabela "Requests" e selecione **Clear Browser Cookies**.

<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="Seleção de "Clear Browser Cookies".">
  <figcaption>
    <b>Imagem 10</b>. Seleção de "Clear Browser Cookies"
 </figcaption>
</figure>

### Modificar o user agent {: #user-agent }

Para modificar manualmente o user agent:

1. Abra a [gaveta Network Conditions](#network-conditions).
1. Desmarque **Select automatically**.
1. Selecione uma opção de user agent no menu ou insira uma opção personalizada na
   caixa de texto.

## Filtrar solicitações {: #filter }

### Filtrar solicitações por property {: #filter-by-property }

Usar a caixa de texto **Filter** para filtrar as solicitações por property, como
domínio ou tamanho da solicitação.

Se a caixa de texto não for exibida, é provável que o painel "Filters" esteja oculto.
Veja [Ocultar o painel "Filters"](#hide-filters).

<figure>
  <img src="imgs/filter-text-box.svg" alt="A caixa de texto "Filters".">
  <figcaption>
    <b>Imagem 11</b>. A caixa de texto "Filters" destacada em azul
 </figcaption>
</figure>

Você pode usar várias properties ao mesmo tempo separando cada uma delas
com um espaço. Por exemplo, `mime-type:image/gif larger-than:1K` exibe
todos os GIFs com mais de um kilobyte. Esses filtros de várias properties
são equivalentes a operações AND. Atualmente, não há suporte para as operações OR
.

Veja abaixo uma lista completa das properties compatíveis.

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

### Filtrar solicitações por tipo {: #filter-by-type }

Para filtrar solicitações por tipo, clique nos botões **XHR**, **JS**, **CSS**,
**Img**, **Media**, **Font**, **Doc**, **WS** (WebSocket), **Manifest** ou
**Other** (qualquer outro tipo não listado aqui) no painel "Network".

Se esses botões não forem exibidos, é provável que o painel "Filters" esteja oculto.
Veja [Ocultar o painel "Filters"](#hide-filters).

Para ativar vários tipos de filtro ao mesmo tempo, mantenha pressionado <kbd>Command</kbd>
(Mac) ou <kbd>Control</kbd> (Windows, Linux) e então clique.

<figure>
  <img src="imgs/multi-type-filter.png"
       alt="Usando os filtros de tipo para exibir os recursos JS, CSS e
            Doc[ument].">
  <figcaption>
    <b>Imagem 12</b>. Usando os filtros de tipo para exibir os recursos JS, CSS e
    Doc[ument].
  </figcaption>
</figure>

### Filtrar solicitações por tempo {: #filter-by-time }

Clique e arraste para a esquerda ou para a direita a fim de exibir somente solicitações
que estavam ativas durante aquele período de tempo. O filtro é inclusivo. Qualquer solicitação
que estava ativa durante o tempo destacado é exibida.

<figure>
  <img src="imgs/overview-filter.png"
       alt="Filtrando qualquer solicitação que não estava ativa por volta dos 2500 ms.">
  <figcaption>
    <b>Imagem 13</b>. Filtrando qualquer solicitação que não estava ativa por volta
    dos 2.500 ms
 </figcaption>
</figure>

### Ocultar URLs de dados

[URLs de dados][data-uris] são pequenos arquivos incorporados em outros documentos. Qualquer
solicitação que você veja na tabela "Requests" e comece com
`data:` é um URL de dados.

Marque a caixa de seleção **Hide data URLs** para ocultar essas solicitações.

<figure>
  <img src="imgs/hide-data-urls.svg" alt="A caixa de seleção "Hide Data URLs".">
  <figcaption>
    <b>Imagem 14</b>. A caixa de seleção "Hide Data URLs"
 </figcaption>
</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## Classificar solicitações

Por padrão, as solicitações na tabela "Requests" são classificadas por
tempo de iniciação, mas você pode classificá-las usando outros critérios.

### Classificar por coluna {: #sort-by-column }

Clique no cabeçalho de qualquer coluna nas solicitações para classificá-las por essa
coluna.

### Classificar por fase de atividade {: #sort-by-activity }

Para alterar como a cascata classifica as solicitações, clique com o botão direito no cabeçalho da
tabela "Requests", passe o cursor sobre **Waterfall** e selecione uma das seguintes
opções:

* **Start Time**. A primeira solicitação que foi iniciada fica no topo.
* **Response Time**. A primeira solicitação que teve o download iniciado fica no topo.
* **End Time**. A primeira solicitação a ser finalizada fica no topo.
* **Total Duration**. A solicitação com menor configuração de conexão e
   solicitação/resposta fica no topo.
* **Latency**. A solicitação que esperou o menor tempo por uma resposta fica
 no topo.

Essas descrições presumem que cada opção está classificada da menor
para a maior. Ao clicar no cabeçalho da coluna **Waterfall**, a ordem é revertida.

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="Classificação de "Waterfall" pela duração total.">
  <figcaption>
    <b>Imagem 15</b>. Classificação de "Waterfall" pela duração total. A parte mais clara
    de cada barra representa o tempo de espera. A parte mais escura
    representa o download de bytes.
  </figcaption>
</figure>

## Analisar solicitações {: #analyze }

Se o DevTools estiver aberto, ele registrará todas as solicitações no painel "Network".
Use o painel "Network" para analisar as solicitações.

### Visualizar um registro de solicitações {: #requests }

Use a tabela "Requests" para visualizar o registro de todas as solicitações feitas enquanto o DevTools
estava aberto. Ao clicar ou passar o cursor sobre as solicitações, mais informações
sobre elas são reveladas.

<figure>
  <img src="imgs/requests-table.svg"
       alt="A tabela "Requests".">
  <figcaption>
    <b>Imagem 16</b>. A tabela "Requests" destacada em azul
 </figcaption>
</figure>

Por padrão, a tabela "Requests" exibe as seguintes colunas:

* **Name**. É o nome de arquivo ou o identificador do recurso.
* **Status**. É o código de status HTTP.
* **Type**. É o tipo MIME do recurso solicitado.
* **Initiator**. Os seguintes objetos ou processos podem iniciar solicitações:
    * **Parser**. O analisador HTML do Chrome.
    * **Redirect**. Um redirecionamento HTTP.
    * **Script**. Uma função JavaScript.
    * **Other**. Algum outro processo ou ação, como navegar até uma página
      por meio de um link ou digitar um URL na barra de endereço.
* **Size**. O tamanho combinado dos cabeçalhos de resposta
  mais o corpo da resposta, conforme fornecido pelo servidor.
* **Time**. É a duração total, desde o início da solicitação até o
 recebimento do byte final na resposta.
* [**Waterfall**](#waterfall). Um detalhamento visual de cada atividade da solicitação.

#### Adicionar ou remover colunas {: #columns }

Clique com o botão direito no cabeçalho da tabela "Requests" e selecione uma opção
para ocultar ou exibir. Atualmente, as opções exibidas têm marcas de seleção ao lado.

<figure>
  <img src="imgs/add-column.png"
       alt="Adição de uma coluna à tabela "Requests".">
  <figcaption>
    <b>Imagem 17</b>. Adição de uma coluna à tabela "Requests".
  </figcaption>
</figure>

#### Adicionar colunas personalizadas {: #custom-columns }

Para adicionar uma coluna personalizada à tabela "Requests", clique com o botão direito no cabeçalho da
tabela e selecione **Response Headers** > **Manage Header Columns**.

<figure>
  <img src="imgs/custom-column.png"
       alt="Adição de uma coluna personalizada à tabela "Requests".">
  <figcaption>
    <b>Imagem 18</b>. Adição de uma coluna personalizada à tabela "Requests".
  </figcaption>
</figure>

### Visualizar o tempo das solicitações em relação às outras {: #waterfall }

Use "Waterfall" para visualizar o tempo de uma solicitação em relação a outra.
Por padrão, a organização de "Waterfall" é feita pelo horário de início das solicitações.
Assim, as solicitações mais à esquerda começaram antes daquelas
que estão mais à direita.

Veja [Classificar por fase de atividade](#sort-by-activity) para ver as diferentes formas
de classificação de "Waterfall".

<figure>
  <img src="imgs/waterfall.png"
       alt="A coluna "Waterfall" do painel "Requests".">
  <figcaption>
    <b>Imagem 19</b>. A coluna "Waterfall" do painel "Requests".
  </figcaption>
</figure>

### Analisar os frames de uma conexão WebSocket {: #frames }

Para visualizar os frames de uma conexão WebSocket:

1. Clique no URL da conexão WebSocket, abaixo da coluna**Name**
   da tabela "Requests".
1. Clique na guia **Frames**. A tabela exibe os últimos 100 frames.

Para atualizar a tabela, clique novamente no nome da conexão WebSocket abaixo da coluna
**Name** na tabela "Requests".

<figure>
  <img src="imgs/frames.svg"
       alt="A guia "Frames".">
  <figcaption>
    <b>Imagem 20</b>. A guia "Frames" destacada em azul
 </figcaption>
</figure>

A tabela tem três colunas:

* **Data**. É o payload da mensagem. Se a mensagem for de texto simples, será
 exibida aqui. Para códigos de operação binária, este campo exibe o nome e o código
 da operação. Os seguintes códigos de operação são aceitos: Continuation Frame,
 Binary Frame, Connection Close Frame, Ping Frame e Pong Frame.
* **Length**. A duração do payload da mensagem, em bytes.
* **Time**. O horário em que a mensagem foi recebida ou enviada.

As mensagens são codificadas por cor de acordo com o tipo:

* As mensagens de texto enviadas têm cor verde-claro.
* As mensagens de texto recebidas têm cor branca.
* Os códigos de operação WebSocket têm cor amarelo-claro.
* Os erros têm cor vermelho-claro.

### Visualizar uma prévia de um corpo de resposta {: #preview }

Para visualizar uma prévia de um corpo de resposta:

1. Clique no URL da solicitação, abaixo da coluna **Name** da tabela
   "Requests".
1. Clique na guia **Preview**.

Essa guia é mais útil para visualizar imagens.

<figure>
  <img src="imgs/preview.svg"
       alt="A guia "Preview".">
  <figcaption>
    <b>Imagem 21</b>. A guia "Preview" destacada em azul
 </figcaption>
</figure>

### Visualizar um corpo de resposta {: #response }

Para visualizar o corpo de resposta de uma solicitação:

1. Clique no URL da solicitação, abaixo da coluna **Name** da tabela
   "Requests".
1. Clique na guia **Response**.

<figure>
  <img src="imgs/response.svg"
       alt="A guia "Response".">
  <figcaption>
    <b>Imagem 22</b>. A guia "Response" destacada em azul
 </figcaption>
</figure>

### Visualizar cabeçalhos HTTP {: #headers }

Para visualizar dados de cabeçalho HTTP sobre uma solicitação:

1. Clique no URL da solicitação, abaixo da coluna **Name** da tabela
   "Requests".
1. Clique na guia **Headers**.

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="A guia "Headers".">
  <figcaption>
    <b>Imagem 23</b>. A guia "Headers" destacada em azul
 </figcaption>
</figure>

#### Visualizar a origem do cabeçalho HTTP {: #header-source }

Por padrão, a guia "Headers" exibe os nomes dos cabeçalhos em ordem alfabética. Para visualizar os
nomes dos cabeçalhos HTTP na ordem em que foram recebidos:

1. Abra a guia **Headers** para a solicitação de seu interesse. Veja
   [Visualizar cabeçalhos HTTP](#headers).
1. Clique em **view source**, ao lado da seção **Request Header** ou **Response
   Header**.

### Visualizar parâmetros da string de consulta {: #query-string }

Para visualizar os parâmetros da string de consulta de um URL em um formato legível:

1. Abra a guia **Headers** para a solicitação de seu interesse. Veja
   [Visualizar cabeçalhos HTTP](#headers).
1. Acesse a seção **Query String Parameters**.

<figure>
  <img src="imgs/query-string.svg" alt="A seção "Query String Parameters".">
  <figcaption>
    <b>Imagem 24</b>. A seção "Query String Parameters" destacada em azul
 </figcaption>
</figure>

#### Visualizar a origem dos parâmetros da string de consulta {: #query-string-source }

Para visualizar a origem dos parâmetros da string de consulta de uma solicitação:

1. Acesse a seção "Query String Parameters". Veja [Visualizar parâmetros da string
   de consulta](#query-string).
1. Clique em **view source**.

#### Visualizar parâmetros da string de consulta codificada em URL {: #query-string-encodings }

Para visualizar os parâmetros da string de consulta em formato legível, porém
preservando as codificações:

1. Acesse a seção "Query String Parameters". Veja [Visualizar parâmetros da string
   de consulta](#query-string).
1. Clique em **view URL encoded**.

### Ver cookies {: #cookies }

Para visualizar os cookies enviados no cabeçalho HTTP de uma solicitação:

1. Clique no URL da solicitação, abaixo da coluna **Name** da
    tabela "Requests".
1. Clique na guia**Cookies**.

Consulte [Campos](/web/tools/chrome-devtools/manage-data/cookies#fields) para ver uma
descrição de cada uma das colunas.

<figure>
  <img src="imgs/cookies.svg"
       alt="A guia "Cookies".">
  <figcaption>
    <b>Imagem 25</b>. A guia "Cookies" destacada em azul
 </figcaption>
</figure>

### Visualizar o detalhamento de tempo de uma solicitação {: #timing }

Para visualizar o detalhamento de tempo de uma solicitação:

1. Clique no URL da solicitação, abaixo da coluna **Name** da tabela
   "Requests".
1. Clique na guia **Timing**.

Consulte [Visualizar detalhamento de tempo](#timing-preview) para ver um modo mais rápido de
acessar esses dados.

Consulte [Explicação das fases do detalhamento de tempo](#timing-explanation) para saber mais
informações sobre cada uma das fases que você pode ver na guia "Timing".

<figure>
  <img src="imgs/timing.svg" alt="A guia "Timing".">
  <figcaption>
    <b>Imagem 26</b>. A guia "Timing" destacada em azul
 </figcaption>
</figure>

Veja mais informações sobre cada uma das fases.

Consulte [Visualizar detalhamento de tempo](#timing-breakdown) para ver outras maneiras de acessar
essa visualização.

#### Ver uma prévia do detalhamento de tempo {: #timing-preview }

Para ver uma prévia do detalhamento de tempo de uma solicitação, passe o cursor sobre
a entrada da solicitação na coluna **Waterfall** da tabela "Requests".

Consulte [Visualizar o detalhamento de tempo de uma solicitação](#timing) para ver uma forma de acessar
esses dados sem ter que passar o cursor.

<figure>
  <img src="imgs/waterfall-hover.png"
       alt="Visualização prévia do detalhamento de tempo de uma solicitação.">
  <figcaption>
    <b>Imagem 27</b>. Visualização prévia do detalhamento de tempo de uma solicitação
 </figcaption>
</figure>

#### Explicação das fases de detalhamento de tempo {: #timing-explanation }

Veja mais informações sobre cada uma das fases que podem aparecer na guia "Timing"
:

* **Queueing**. O navegador enfileira solicitações quando:
    * existem solicitações de prioridade mais alta;
    * já existem seis conexões TCP abertas para essa origem. Esse é
      o limite. Aplica-se somente a HTTP/1.0 e HTTP/1.1;
    * o navegador aloca brevemente espaço no cache do disco
* **Stalled**. A solicitação pode ficar parada por qualquer um dos motivos descritos
 em **Queueing**.
* **DNS Lookup**. O navegador está resolvendo o endereço IP da solicitação.
* **Proxy negotiation**. O navegador está negociando a solicitação com um [servidor
 proxy](https://en.wikipedia.org/wiki/Proxy_server).
* **Request sent**. A solicitação está sendo enviada.
* **ServiceWorker Preparation**. O navegador está iniciando o service worker.
* **Request to ServiceWorker**. A solicitação está sendo enviada ao service
 worker.
* **Waiting (TTFB)**. O navegador está esperando pelo primeiro byte de uma resposta.
  TTFB significa tempo até o primeiro byte (Time To First Byte). Esse tempo inclui uma viagem de ida e volta de latência
 e o tempo que o servidor demorou para preparar a resposta.
* **Content Download**. O navegador está recebendo a resposta.
* **Receiving Push**. O navegador está recebendo os dados para essa resposta por meio do envio push do
 servidor HTTP/2.
* **Reading Push**. O navegador está lendo os dados locais recebidos anteriormente.

### Visualizar iniciadores e dependências {: #initiators-dependencies }

Para visualizar os iniciadores e as dependências de uma solicitação, mantenha pressionado <kbd>Shift</kbd>
e passe o cursor sobre a solicitação na tabela "Requests". O DevTools colore os iniciadores
de verde e as dependências, de vermelho.

<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="Visualização de iniciadores e dependências de uma solicitação.">
  <figcaption>
    <b>Imagem 28</b>. Visualização de iniciadores e dependências de uma solicitação
 </figcaption>
</figure>

Quando a tabela "Requests" é ordenada cronologicamente, a primeira
solicitação em verde, acima da que você está passando o cursor, é o iniciador
da dependência. Se houver outra solicitação em verde sobre essa, a maior
é o iniciador do iniciador. E assim por diante.

### Visualizar eventos de carregamento {: #load }

O DevTools exibe o tempo dos eventos `DOMContentLoaded` e `load` em
vários locais, no painel "Network". O evento `DOMContentLoaded` tem a cor
azul, e o `load` tem a cor vermelha.

<figure>
  <img src="imgs/load-events.svg"
       alt="As localizações dos eventos DOMContentLoaded e load no painel "Network".">
  <figcaption>
    <b>Imagem 29</b>. As localizações dos eventos <code>DOMContentLoaded</code> e
    <code>load</code> no painel "Network"
 </figcaption>
</figure>

### Visualizar o número total de solicitações {: #total-number }

O número total de solicitações é listado no painel "Summary", na parte inferior do
painel "Network".

Atenção: esse número só rastreia as solicitações que foram registradas desde que o DevTools
foi aberto. Outras solicitações que ocorreram antes de o DevTools ser aberto
não serão contabilizadas.

<figure>
  <img src="imgs/total-requests.svg"
       alt="O número total de solicitações desde que o DevTools foi aberto">
  <figcaption>
    <b>Imagem 30</b>. O número total de solicitações desde que o DevTools foi aberto
 </figcaption>
</figure>

### Visualizar o tamanho total do download {: #total-size }

O tamanho total do download das solicitações é listado no painel "Summary", na parte
inferior do painel "Network".

Atenção: esse número só rastreia as solicitações que foram registradas desde que o DevTools
foi aberto. Outras solicitações que ocorreram antes de o DevTools ser aberto
não serão contabilizadas.

<figure>
  <img src="imgs/total-size.svg"
       alt="O tamanho total do download das solicitações">
  <figcaption>
    <b>Imagem 31</b>. O tamanho total do download das solicitações
 </figcaption>
</figure>

Consulte [Visualizar o tamanho não compactado de um recurso](#uncompressed) para ver qual é o tamanho dos recursos
após o navegador realizar a descompactação deles.

### Visualizar o rastreamento de pilha que gerou uma solicitação {: #initiator-stack-trace }

Quando uma instrução JavaScript fizer com que um recurso seja solicitado, passe o cursor sobre a coluna **Initiator**
para visualizar o rastreamento de pilha que leva à solicitação.

<figure>
  <img src="imgs/initiator-stack.png"
       alt="O rastreamento de pilha que leva à solicitação do recurso">
  <figcaption>
    <b>Imagem 32</b>. O rastreamento de pilha que leva à solicitação do recurso
 </figcaption>
</figure>

### Visualizar o tamanho não compactado de um recurso {: #uncompressed }

Clique em **Use Large Request Rows** ![Use Large Request
Rows](imgs/large-resource-rows-button.png){:.inline-icon} e olhe o
valor na parte inferior da coluna **Size**.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Exemplo de recursos não compactados.">
  <figcaption>
    <b>Imagem 33</b>. O tamanho compactado do arquivo <code>jquery-bundle.js</code>
    enviado pela rede era de <code>30.9 KB</code>, enquanto o arquivo não compactado tinha um tamanho de
    <code>86.3 KB</code>
  </figcaption>
</figure>

## Exportar dados de solicitações {: #export }

### Salvar todas as solicitações de rede em um arquivo HAR {: #save-as-har }

Para salvar todas as solicitações de rede em um arquivo HAR:

1. Clique com o botão direito em qualquer solicitação da tabela "Requests".
1. Selecione **Save as HAR with Content**. O DevTools salva todas as solicitações que ocorreram desde que foi aberto
   em um arquivo HAR. Não há como filtrar solicitações nem salvar apenas uma
   solicitação.

Assim que tiver um arquivo HAR, você poderá importá-lo de volta para o DevTools e analisá-lo. Basta
arrastar e soltar o arquivo HAR na tabela "Requests". Veja também [Analisador HAR][HAR Analyzer]{: .external }.

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="Seleção de "Save as HAR with Content”.">
  <figcaption>
    <b>Imagem 34</b>. Seleção de <b>Save as HAR with Content</b>
  </figcaption>
</figure>

### Copiar uma ou mais solicitações na área de transferência {: #copy }

Abaixo da coluna **Name** da tabela "Requests", clique com o botão direito em uma solicitação,
passe o cursor sobre **Copy** e selecione uma das seguintes opções:

* **Copy Link Address**. Copia o URL da solicitação para a área de transferência.
* **Copy Response**. Copia o corpo da resposta para a área de transferência.
* **Copy as cURL**. Copia a solicitação como um comando cURL.
* **Copy All as cURL**. Copia todas as solicitações como uma cadeia de comandos cURL.
* **Copy All as HAR**. Copia todas as solicitações como dados HAR.

<figure>
  <img src="imgs/copy.png" alt="Seleção de "Copy Response".">
  <figcaption>
    <b>Imagem 35</b>. Seleção de "Copy Response"
 </figcaption>
</figure>

## Alterar o layout do painel "Network"

Você pode expandir ou recolher seções da IU do painel "Network" para se concentrar no que
considera importante.

### Ocultar o painel "Filters" {: #hide-filters }

Por padrão, o DevTools exibe o [painel Filters](#filters).
Clique em **Filter** ![Filter][filter]{: .devtools-inline } para ocultá-lo.

<figure>
  <img src="imgs/hide-filters.svg" alt="O botão "Hide Filters"">
  <figcaption>
    <b>Imagem 36</b>. "Hide Filters" destacado em azul
 </figcaption>
</figure>

[filter]: imgs/filters.png

### Usar linhas de solicitação grandes {: #request-rows }

Use linhas grandes quando você quiser mais espaço em branco na sua tabela de solicitações
de rede. Algumas colunas também apresentam algumas informações a mais
quando linhas grandes são utilizadas. Por exemplo, o valor na parte inferior da coluna **Size**
é o tamanho não compactado de uma solicitação.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Exemplo de linhas de solicitação grandes no painel "Requests".">
  <figcaption>
    <b>Imagem 37</b>. Exemplo de linhas de solicitação grandes no painel "Requests"
  </figcaption>
</figure>

Clique em **Use large request rows** ![Use large request
rows][large]{:.devtools-inline} para ativar linhas grandes.

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="O botão "Large Request Rows"">
  <figcaption>
    <b>Imagem 38</b>. "Large Request Rows" destacado em azul
  </figcaption>
</figure>

### Ocultar o painel "Overview" {: #hide-overview }

Por padrão, o DevTools exibe o [painel Overview](#overview).
Clique em **Hide overview** ![Hide overview][hide]{:.devtools-inline} para ocultá-lo.

<figure>
  <img src="imgs/hide-overview.svg" alt="O botão "Hide Overview"">
  <figcaption>
    <b>Imagem 39</b>. "Hide Overview" destacado em azul
 </figcaption>
</figure>

[hide]: imgs/hide-overview.png

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
