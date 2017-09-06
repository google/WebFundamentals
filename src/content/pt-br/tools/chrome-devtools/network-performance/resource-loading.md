project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Meça o desempenho da rede do seu aplicativo da Web usando o painel Network do Chrome DevTools.

{# wf_updated_on: 2016-02-21 #}
{# wf_published_on: 2015-04-13 #}

# Medir tempos de carregamento de recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Meça o desempenho da rede do seu site usando o painel 
<strong>Network</strong>.

![o painel network do chrome devtools](imgs/network-panel.png)

O painel **Network** registra informações sobre cada operação de rede em
uma página, incluindo dados de sincronização detalhados, cabeçalhos de solicitação e 
resposta HTTP, cookies e muito mais.


### TL;DR {: .hide-from-toc }
- Use o painel Network para registrar e analisar atividade de rede.
- Visualize informações de carregamento de recursos em conjunto ou individualmente.
- Filtre e classifique o modo de exibição dos recursos.
- Salve, copie e apague registros de rede.
- Personalize o painel Network de acordo com as suas necessidades.


## Visão geral do painel Network

O painel Network é composto de cinco seções:

1. **Controls**. Use estas opções para controlar como o painel **Network** é exibido 
   e funciona.
2. **Filters**. Use estas opções para controlar quais recursos são exibidos na 
  **Requests Table**. Dica: mantenha pressionado <kbd>Cmd</kbd> (Mac) ou <kbd>Ctrl</kbd>
   (Windows/Linux) e clique em um filtro para selecionar diversos filtros ao
   mesmo tempo.
3. **Overview**. Este gráfico mostra uma linha do tempo de quando os recursos foram recuperados.
   Se você vir diversas barras empilhadas no sentido vertical, significa que esses recursos 
   foram recuperados simultaneamente.
4. **Requests Table**. Esta tabela lista todos os recursos que foram recuperados.
   Por padrão, esta tabela é ordenada de forma cronológica, com os recursos 
  mais antigos no início.
   Clicar no nome de um recurso exibe mais informações sobre ele.
   Dica: clique com o botão direito em qualquer título da tabela, exceto **Timeline**, para 
   adicionar ou remover colunas de informação.
5. **Summary**. Instantaneamente, esta seção mostra o total de solicitações,
   a quantidade de dados transferida e os tempos de carregamento.

![seções do painel network](imgs/panes.png)

A **Requests Table** exibe as colunas a seguir por padrão. Você pode
[adicionar e remover colunas](#add-and-remove-table-columns).

* **Name**. O nome do recurso.
* **Status**. O código do status HTTP.
* **Type**. O tipo MIME do recurso solicitado.
* **Initiator**. O objeto ou processo que iniciou a solicitação. Ele pode 
  ter um dos seguintes valores:
  * **Parser**. O analisador de HTML do Chrome iniciou a solicitação.
  * **Redirect**. Um redirecionamento de HTTP iniciou a solicitação.
  * **Script**. Um script iniciou a solicitação.
  * **Other**. Algum outro processo ou ação iniciou a solicitação, 
    como o usuário navegando a uma página por um link ou inserindo um 
    URL na barra de endereço.
* **Size**. O tamanho combinado dos cabeçalhos da resposta (normalmente com 
  algumas centenas de bytes), além do corpo da resposta, conforme fornecido pelo servidor. 
* **Time**. A duração total, do início da solicitação ao 
  recebimento do byte final na resposta. 
* **Timeline**. A coluna Timeline exibe uma cascata visual de todas 
  as solicitações de rede. Clicar no título desta coluna revela um menu de 
  campos de classificação adicionais.

## Registrar atividade de rede

Quando o painel **Network** é aberto, o DevTools registra todas as atividades de rede
por padrão. Para registrar, basta recarregar uma página com o painel aberto ou esperar 
a atividade de rede na página carregada no momento.

Você pode saber se o DevTools está gravando pelo botão 
**record**. Quando está vermelho 
![botão record ligado](imgs/record-on.png){:.inline}), o DevTools está gravando.
Quando está cinza (![botão record desligado](imgs/record-off.png){:.inline}), o DevTools 
não está gravando. Clique nesse botão para iniciar ou parar a gravação ou pressione 
o atalho de teclado <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Capturar imagens da tela durante a gravação {:#filmstrip}

O painel **Network** pode capturar imagens da tela durante um carregamento de página. Este recurso
é conhecido como **Filmstrip**. 

Clique no ícone de **câmera** para ativar o Filmstrip. Quando o ícone está cinza, 
o Filmstrip está desativado  (![filmstrip 
desativado](imgs/filmstrip-disabled.png){:.inline}). Quando o ícone está azul, ele está
ativo (![filmstrip ativo](imgs/filmstrip-enabled.png){:.inline}).

Recarregue a página para capturar as imagens da tela. As capturas de tela são exibidas
acima de **Overview**. 

![recording with filmstrip](imgs/filmstrip.png)

Ao passar o cursor em uma captura de tela, a **Timeline** exibe uma linha vertical
amarela para indicar quando o quadro foi capturado.

![sobreposição do filmstrip na linha do tempo](imgs/filmstrip-timeline-overlay.png)

Clique duas vezes em uma captura de tela para visualizar uma versão com zoom da tela. Enquanto
a captura de tela estiver com zoom, use as setas para esquerda e direita do teclado
para acessar outras capturas de tela.

![captura de tela do filmstrip com zoom](imgs/filmstrip-zoom.png)

## Ver DOMContentLoaded e carregar informações do evento

O painel **Network** destaca dois eventos: 
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) e 
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` é acionado quando a margem inicial de uma página é 
analisada. Ele é exibido em dois locais no painel **Network**:

1. A barra vertical azul na seção **Overview** representa o evento.
2. Na seção **Summary**, você pode ver o tempo exato do evento.

![Evento DOMContentLoaded no painel de rede](imgs/domcontentloaded.png)

`load` é acionado quando uma página é totalmente carregada. Ele é exibido em três locais:

1. A barra vertical vermelha na seção **Overview** representa o evento.
2. A barra vertical vermelha da **Requests Table** também representa o evento.
3. Na seção **Summary**, você pode ver o tempo exato do evento.

![evento de carregamento no painel network](imgs/load.png)

## Visualizar detalhes de um único recurso

Clique no nome de um recurso (na coluna **Name** da **Requests Table**)
para obter mais informações sobre ele.

As guias disponíveis variam dependendo do tipo de recurso que você selecionar,
mas as quatro guias abaixo são as mais comuns:

* **Headers**. Cabeçalhos HTTP associados ao recurso.
* **Preview**. Prévia de recursos JSON, de imagem e texto.
* **Response**. Dados da resposta HTTP (se houver).
* **Timing**. Um detalhamento granular do ciclo de vida da solicitação do 
  recurso.

![visualizar detalhes de um único recurso](imgs/network-headers.png)

### Visualizar sincronização da rede

Clique na guia **Timing** para ver um detalhamento granular do ciclo de vida da 
solicitação de um único recurso. 

O ciclo de vida mostra quanto tempo foi gasto nas seguintes categorias:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Enfileiramento
* Paralisado
* Se aplicável: Análise de DNS, conexão inicial, handshake de SSL
* Solicitação enviada
* Espera (tempo do primeiro byte (TTFB))
* Download de conteúdo

![guia timing](imgs/timing-tab.png)

Você ainda pode ver estas mesmas informações passando o cursor sobre um 
recurso dentro do gráfico **Timeline**. 

![dados de sincronização de um recurso na linha do tempo](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Guias relacionados:

* [Como entender Resource Timing](understanding-resource-timing)

### Ver cabeçalhos HTTP

Clicar em **Headers** exibe os cabeçalhos desse recurso.

A guia **Headers** exibe o URL da solicitação, o método HTTP e 
o código de status da resposta do recurso. Além disso, ela lista os cabeçalhos de solicitação e resposta HTTP 
e seus valores, além de todos os parâmetros string query. 

![Cabeçalhos HTTP de um único recurso](imgs/network-headers.png)

Você pode ver cabeçalhos de resposta, de solicitação ou parâmetros string query
na fonte ou no formato analisado clicando no link `view source` ou `view parsed` 
ao lado de cada seção.

![visualizar código do cabeçalho](imgs/view-header-source.png)

Também é possível visualizar parâmetros da string query no URL criptografado ou no formato decodificado
clicando no link `view URL encoded` ou `view decoded` ao lado de cada seção.

![visualizar URL criptografado](imgs/view-url-encoded.png)

### Pré-visualizar um recurso

Clique na guia **Preview** para visualizar uma prévia do recurso. A guia **Preview**
pode ou não exibir informações úteis, dependendo do tipo de 
recurso selecionado.

![prévia de recurso de imagem](imgs/preview-png.png)

### Ver conteúdo da resposta HTTP

Clique na guia **Response** para visualizar o conteúdo da resposta HTTP não formatada do 
recurso. A guia **Response** pode ou não conter informações úteis, 
dependendo do tipo de recurso selecionado.

![Dados de resposta do recurso JSON](imgs/response-json.png)

### Ver cookies

Clique na guia **Cookies** para ver uma tabela de cookies transmitidos nos 
cabeçalhos de resposta e solicitação HTTP do recurso. Esta guia só é disponibilizada
quando cookies são transmitidos.

Abaixo há uma descrição de cada uma das colunas da tabela:

* **Name**. O nome do cookie.
* **Value**. O valor do cookie.
* **Domain**. O domínio a que o cookie pertence.
* **Path**. O caminho do URL de que o cookie veio.
* **Expires / Max-Age**. O valor das propriedades expires ou max-age do 
  cookie.
* **Size**. O tamanho do cookie em bytes.
* **HTTP**. Indica que o cookie não deve ser definido pelo navegador na 
  solicitação HTTP e não pode ser acessado com JavaScript.
* **Secure**. A presença deste atributo indica que o cookie só 
  deve ser transmitido por uma conexão segura.

![cookies de recursos](imgs/cookies.png)

### Ver estruturas WebSocket

Clique na guia **Frames** para ver 
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
informações de conexão. Esta guia só é visível quando o recurso selecionado 
inicia uma conexão `WebSocket`.

![guia de estruturas websocket](imgs/websocket-frames.png)

A tabela abaixo descreve cada uma das colunas da tabela da guia **Frames**
:

* **Data**. A carga útil da mensagem. Se a mensagem for de texto simples, será 
  exibida aqui. Para códigos de operação binária, este campo exibe o nome e o código 
  do código de operação. Os seguintes códigos de operação são compatíveis:
  * Estrutura de continuação
  * Estrutura binária
  * Estrutura de fechamento de conexão
  * Estrutura de ping
  * Estrutura de pong
* **Length**. O comprimento da carga útil da mensagem em bytes.
* **Time**. A data e a hora em que a mensagem foi criada.

As mensagens são codificadas por cor de acordo com o tipo: 

* As mensagens de texto de saída têm cor verde claro.
* As mensagens de texto de entrada são brancas. 
* Os códigos de operação têm cor amarelo claro.
* Os erros têm cor vermelho claro.

**Observações sobre a atual implementação:**

* Para atualizar a tabela **Frames** depois que uma nova mensagem chegar, clique no 
  nome do recurso à esquerda.
* Somente as 100 mensagens `WebSocket` mais recentes são mantidas pela tabela **Frames**.

## Visualizar iniciadores e dependências dos recursos {:#initiators-dependencies}

Com <kbd>Shift</kbd> pressionado, passe o cursor sobre um recurso para visualizar seus iniciadores
e dependências. Esta seção trata o recurso em que você passou o 
cursor como o **alvo**. 

O primeiro recurso acima do alvo que tiver cor verde é o iniciador
do alvo. Se houver um segundo recurso acima desse também com cor
verde, trata-se do iniciador do iniciador. Todos os recursos abaixo do alvo
com cor vermelha são dependências do alvo.

Na imagem abaixo, o alvo é `dn/`. O iniciador do alvo é
o script que começa com `rs=AA2Y`. O iniciador do iniciador 
(`rs=AA2Y`) é `google.com`. Por fim, `dn.js` é uma dependência do 
alvo (`dn/`).

![visualizar iniciadores e dependências dos 
recursos](imgs/initiators-dependencies.png)

Lembre-se de que, para páginas com muitos recursos, é possível que 
você não consiga ver todos os iniciadores nem todas as dependências. 

## Ordenar solicitações

Por padrão, os recursos na **Requests Table** são ordenados por tempo
de início de cada solicitação, com as solicitações mais antigas no topo.

Clique no título de uma coluna para ordenar a tabela de acordo com o valor de cada recurso
desse título. Clique no mesmo título novamente para alterar a ordenação para 
ascendente ou descendente.

A coluna **Timeline** é diferente das outras. Quando clicada, ela exibe
um menu de campos de ordenação:

* **Timeline**. Ordena pelo tempo de início de cada solicitação de rede. Esta é 
  a ordenação padrão, e é igual a ordenar pela opção **Start Time**.
* **Start Time**. Ordena pelo tempo de início de cada solicitação de rede (equivalente 
  a ordenar pela opção **Timeline**).
* **Response Time**. Ordena pelo tempo de resposta das solicitações.
* **End Time**. Ordena pelo tempo em que as solicitações foram concluídas.
* **Duration**. Ordena pelo tempo total das solicitações. Selecione este 
  filtro para determinar que recurso leva mais tempo para carregar.
* **Latency**. Ordena pelo tempo entre o início da solicitação e o 
  começo da resposta. Selecione este filtro para determinar que recurso 
  leva mais tempo para o primeiro byte (TTFB).

![Campos de ordenação da Timeline](imgs/timeline-sort-fields.png)

## Filtrar solicitações 

O painel **Network** oferece diversas maneiras de filtrar os recursos que serão 
exibidos. Clique no botão **filters**
(![botão filters](imgs/filters.png){:.inline})
para ocultar ou exibir a seção **Filters**.

Use os botões de tipo de conteúdo para exibir apenas recursos do tipo de conteúdo 
selecionado. 

Observação: Mantenha <kbd>Cmd</kbd> (Mac) ou <kbd>Ctrl</kbd> (Windows/Linux) pressionado e, em seguida, clique para ativar diversos filtros simultaneamente.

![diversos filtros de tipo de conteúdo selecionados 
simultaneamente](imgs/multiple-content-type-filters.png)

O campo de texto **filter** é enganosamente poderoso. Se você inserir uma
string arbitrária nele, o painel **Network** só exibirá os recursos cujos
nomes de arquivo correspondam à dada string.

![filtragem por nome do recurso](imgs/resource-name-filtering.png)

O campo de texto **filter** também é compatível com diversas palavras-chave que permitem 
ordenar os recursos por diversas propriedades, como o tamanho do arquivo usando a 
palavra-chave `larger-than`.

A lista abaixo descreve todas as palavras-chave. 

* `domain`. Só exibe recursos do domínio especificado. Você pode usar um 
  caractere especial (`*`) para incluir diversos domínios. Por exemplo, `*.com` 
  exibe recursos de todos os nomes de domínio que acabam com `.com`. O DevTools 
  preenche o menu suspenso de preenchimento automático com todos os domínios
  que encontrar.
* `has-response-header`. Mostra os recursos que contêm o cabeçalho de resposta 
  HTTP especificado. O DevTools preenche o menu suspenso de preenchimento automático com 
  todos os cabeçalhos de resposta que encontrar.
* `is`. Use `is:running` para encontrar recursos `WebSocket`.
* `larger-than`. Exibe recursos maiores do que o tamanho especificado, 
  em bytes. Definir um valor de `1000` é equivalente a definir um valor de `1k`.
* `method`. Exibe recursos que foram recuperados por um tipo de método HTTP 
  especificado. O DevTools preenche o menu suspenso com todos os métodos HTTP que 
  encontrar.
* `mime-type`. Exibe recursos de um tipo MIME específico. O DevTools preenche o
  menu suspenso com todos os tipos MIME que encontrar.
* `mixed-content`. Exibe todos os recursos de conteúdo misto (`mixed-content:all`) ou
  apenas os que estão em exibição no momento (`mixed-content:displayed`).
* `scheme`. Exibe recursos recuperados por HTTP desprotegido (`scheme:http`) 
  ou HTTPS protegido (`scheme:https`).
* `set-cookie-domain`. Exibe os recursos que têm um cabeçalho `Set-Cookie` 
  com um atributo `Domain` correspondente ao valor especificado. O DevTools 
  realiza o preenchimento automático com todos os domínios de cookies que 
  encontrar.
* `set-cookie-name`. Exibe os recursos que têm um cabeçalho `Set-Cookie` 
  com um nome correspondente ao valor especificado. O DevTools realiza o 
  preenchimento automático com todos os nomes de cookie que encontrar.
* `set-cookie-value`. Exibe os recursos que têm um cabeçalho `Set-Cookie`
  com um valor correspondente ao valor especificado. O DevTools realiza o 
  preenchimento automático com todos os valores de cookie que encontrar.
* `status-code`. Exibe apenas recursos cujo código de status de HTTP corresponda ao 
  código especificado. O DevTools preenche o menu suspenso de preenchimento automático com todos 
  os códigos de status que encontrar.

![filtrar por tamanho do arquivo](imgs/larger-than.png)

Algumas das palavras-chave acima mencionam um menu suspenso de preenchimento automático. Para acionar
o menu de preenchimento automático, digite a palavra-chave seguida de dois pontos (":"). Por exemplo,
na captura de tela abaixo, digitar `domain:` acionou o menu suspenso de preenchimento automático.

![filtrar preenchimento automático de campo de texto](imgs/filter-autocomplete.png)

## Copiar, salvar e apagar informações de rede

Clique com o botão direito dentro da **Requests Table** para copiar, salvar ou
excluir informações de rede. Algumas das opções são contextuais, então, 
se você quiser operar em um único recurso, precisa clicar com o botão direito na
linha desse recurso. A lista abaixo descreve as opções.

* **Copy Response**. Copia a resposta HTTP do recurso selecionado para 
  a área de transferência do sistema.
* **Copy as cURL**. Copia a solicitação de rede do recurso selecionado como uma
  string de comando [cURL](http://curl.haxx.se/){: .external } para a área de transferência do sistema.
  Consulte [Como copiar solicitações como comandos cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**. Copia todos os recursos como dados
 [HAR](https://en.wikipedia.org/wiki/.har){: .external } para a área de transferência do sistema.
  Um arquivo HAR contém uma estrutura de dados JSON que descreve a "cascata" 
   da rede. Diversas [ferramentas](https://code.google.com/p/harviewer/){: .external } 
  de [terceiros](https://ericduran.github.io/chromeHAR/){: .external } podem reconstruir a cascata 
  da rede a partir dos dados do arquivo HAR. Consulte
  [Ferramenta de poder de desempenho web: arquivo HTTP 
  (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
  para obter mais informações.
* **Save as HAR with Content**. Salva todos os dados de rede em um
  arquivo HAR junto com cada recurso da página. Recursos binários, incluindo imagens, 
  são codificados como texto com codificação Base64.
* **Clear Browser Cache**. Limpa o cache do navegador.
  **Dica**: Você também pode ativar ou desativar o cache do navegador na gaveta 
  [**Network Conditions**][nc].
* **Clear Browser Cookies**. Apaga os cookies do navegador.
* **Open in Sources Panel**. Abre o recurso selecionado no painel **Sources**
.
* **Open Link in New Tab**. Abre o recurso selecionado em uma nova aba. É possível 
  também clicar duas vezes no nome do recurso na tabela Network.
* **Copy Link Address**. Copia o URL do recurso para a área de transferência do sistema.
* **Save**. Salva o recurso de texto selecionado. Exibido somente em recursos 
  de texto.
* **Replay XHR**. Reenvia o `XMLHTTPRequest` selecionado. Somente exibido em recursos
  XHR.

![copiar e salvar menu de contexto](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Copiar solicitações como comandos cURL {: #curl }

[cURL](http://curl.haxx.se/){: .external } é uma ferramenta de linha de comando para realizar transações 
HTTP. 

Clique com o botão direito em um recurso dentro da Requests Table, passe o cursor sobre 
**Copy** e selecione **Copy as cURL** para copiar uma string de solicitações 
cURL para todos os recursos que foram detectados pelo painel Network.

![Copiar solicitação única como comando cURL](imgs/copy-as-curl.png)

Selecione **Copy as cURL** para copiar uma string de solicitações cURL para
todos os recursos que foram detectados pelo painel Network.

Ao copiar tudo, a filtragem é ignorada (por exemplo, se filtrar o painel Network
para exibir apenas recursos de CSS e pressionar **Copy All as cURL**, você receberá
todos os recursos detectados, e não apenas os de CSS).

## Personalizar o painel Network

Por padrão, a **Requests Table** exibe recursos com linhas pequenas. Clique
no botão **Use large resource rows**
(![botão large resource rows](imgs/large-resource-rows-button.png){:.inline})
para aumentar o tamanho das linhas. 

Linhas maiores permitem que algumas colunas exibam dois campos de texto: um primário
 e um secundário. O título da coluna indica o significado do 
campo secundário. 

![linhas de recurso grandes](imgs/large-resource-rows.png)

### Adicionar e remover colunas da tabela

Clique com o botão direito em qualquer um dos títulos da **Requests Table** para adicionar ou remover
colunas.

![Adicionar ou remover colunas](imgs/add-remove-columns.png)

### Armazenar o registro de rede após navegação

Por padrão, a gravação das atividades de rede é descartada sempre que se 
recarrega a página atual ou se carrega uma página diferente. 
Marque a caixa de seleção **Preserve log** para salvar o registro de rede em todos esses
cenários. Novos registros são anexados ao fim da **Requests Table**.

## Recursos adicionais

Para saber mais sobre otimizar o desempenho de rede do seu aplicativo, consulte os seguintes recursos:

* Use [Informações 
  sobre PageSpeed](/speed/pagespeed/insights) para identificar 
  práticas recomendadas de desempenho aplicáveis a seu site e 
  [Ferramentas de otimização 
  de PageSpeed](/speed/pagespeed/optimization) para 
  automatizar o processo de aplicação dessas práticas.
* [Rede de alto desempenho no Google
  Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/) 
  aborda elementos internos da rede do Chrome e como é possível tirar vantagem deles 
  para tornar seu site mais rápido.
* [Como a compressão gzip 
  funciona](/speed/articles/gzip) fornece uma 
 visão geral de alto nível da compressão gzip e por que ela é uma boa ideia.
* [Práticas recomendadas de desempenho 
  na web](/speed/docs/best-practices/rules_intro) 
  fornece mais dicas para otimizar o desempenho de rede da sua página web 
  ou aplicativo.




{# wf_devsite_translation #}
