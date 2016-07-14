---
title: "Armazenar HTTP em cache"
description: "Buscar alguma coisa na rede é um processo lento e caro: respostas amplas exigem muitas viagens de ida e volta entre o cliente e o servidor, o que atrasa sua disponibilidade para o processamento do navegador, além de gerar custos para o visitante. Como resultado, a capacidade de armazenar em cache e reutilizar recursos buscados anteriormente é um aspecto crítico da otimização do desempenho."
updated_on: 2014-01-05
key-takeaways:
  validate-etags:
    - "O token de validação é comunicado pelo servidor por meio do cabeçalho HTTP ETag"
    - "O token de validação permite verificar a atualização de recursos com eficiência: não há transferência de dados se o recurso não foi modificado."
  cache-control:
    - "Cada recurso pode definir sua política de armazenamento em cache por meio do cabeçalho HTTP Controle de cache"
    - "As diretivas do Controle de cache controlam quem pode armazenar a resposta em cache, em que condições e por quanto tempo"
  invalidate-cache:
    - "Respostas armazenadas em cache localmente são usadas até que o recurso `expire`"
    - "Integrar a impressão digital de conteúdo de um arquivo ao URL permite forçar o cliente a fazer a atualização para uma nova versão da resposta"
    - "Cada aplicativo precisa definir a própria hieraraquia de cache para o desempenho ideal"
notes:
  webview-cache:
    - "Se estiver usando um Modo de exibição da Web para buscar e exibir conteúdo da Web em seu aplicativo, pode ser necessário fornecer mais sinalizadores de configuração para garantir que o cache de HTTP seja habilitado, que seu tamanho seja suficiente para seu caso de uso e que o cache seja persistente. Verifique a documentação da plataforma e confirme suas configurações."
  boilerplate-configs:
    - "Dica: o projeto de texto clichê HTML5 contém <a href='https://github.com/h5bp/server-configs'>modelos de arquivos de configuração</a> para a maioria dos servidores mais conhecidos, com comentários detalhados para cada sinalizador de configuração e configuração. Encontre o servidor de sua preferência na lista, procure as configurações apropriadas e copie/confirme que seu servidor esteja com as configurações recomendadas."
  cache-control:
    - "O cabeçalho Controle de cache foi definido como parte da especificação HTTP/1.1 e substitui cabeçalhos anteriores (por exemplo, Vencimento) usados para definir políticas de resposta do armazenamento em cache. Todos os navegadores atuais são compatíveis com Controle de cache, portanto só precisaremos disso."
---

<p class="intro">
  Buscar alguma coisa na rede é um processo lento e caro: respostas amplas exigem muitas viagens de ida e volta entre o cliente e o servidor, o que atrasa sua disponibilidade para o processamento do navegador, além de gerar custos para o visitante. Como resultado, a capacidade de armazenar em cache e reutilizar recursos buscados anteriormente é um aspecto crítico da otimização do desempenho.
</p>


{% include shared/toc.liquid %}

Boas notícias, todos os navegadores vêm com uma implementação de cache HTTP. Só precisamos garantir que a resposta de cada servidor forneça diretivas de cabeçalho HTTP corretas para informar ao navegador quando e por quanto tempo a resposta pode ser armazenada em cache.

{% include shared/remember.liquid character="{" position="left" title="" list=page.notes.webview-cache %}

<img src="images/http-request.png" class="center" alt="Solicitação HTTP">

Quando o servidor retorna uma resposta, ele também emite um conjunto de cabeçalhos HTTP que descrevem o tipo de conteúdo, a extensão, diretivas de armazenamento em cache, token de validação e outros. Por exemplo, na interação anterior, o servidor retorna uma resposta de 1024 bytes, instrui o cliente a armazená-la em cache por até 120 segundos e fornece um token de validação (`x234dff`) que pode ser usado depois da expiração da resposta para verificar se o recurso foi modificado.


## Validar respostas armazenadas em cache com ETags

{% include shared/takeaway.liquid list=page.key-takeaways.validate-etags %}

Digamos que 120 segundos tenham passado desde a busca inicial e que o navegador tenha iniciado uma nova solicitação para o mesmo recurso. Primeiro, o navegador verifica o cache local e encontra a resposta anterior. Ele não pode usá-la, pois ela está `expirada`. Nesse momento, ele poderia simplesmente emitir uma nova solicitação e buscar a nova resposta completa, mas esse processo é ineficiente porque, se o recurso não foi alterado, não é necessário fazer o download dos mesmos bytes que já estão em cache.

Para resolver esse problema, foram desenvolvidos tokens de validação, conforme especificados no cabeçalho ETag: o servidor gera e retorna um token arbitrário, que normalmente é um hash ou alguma outra impressão digital do conteúdo do arquivo. O cliente não precisa saber como a impressão digital é gerada, ele só precisa enviá-la ao servidor na próxima solicitação: se a impressão digital ainda for a mesma, então o recurso não foi alterado e podemos ignorar o download.

<img src="images/http-cache-control.png" class="center" alt="Exemplo de Controle de cache HTTP">

No exemplo acima, o cliente fornece automaticamente o token ETag no cabeçalho de solicitação HTTP `If-None-Match`, o servidor faz a correspondência do token com o recurso atual e, se ele não tiver sido alterado, retorna uma resposta `304 - Não modificado` que informa ao navegador que a resposta que ele tem em cache não mudou e pode ser renovada por mais 120 segundos. Não é necessário fazer o download da resposta mais uma vez. Isso poupa tempo e largura de banda.

Como desenvolvedor Web, como você aproveita a revalidação eficiente? O navegador faz todo o trabalho para você: ele detecta automaticamente se um token de validação foi especificado anteriormente, acrescenta-o à solicitação enviada e atualiza os carimbos de data/hora conforme necessário, com base na resposta recebida do servidor. **Nós só precisamos garantir que o servidor esteja fornecendo os tokens ETag necessários: verifique a documentação de seu servidor para saber quais são os sinalizadores de configuração necessários.**

{% include shared/remember.liquid list=page.notes.boilerplate-configs %}


## Controle de cache

{% include shared/takeaway.liquid list=page.key-takeaways.cache-control %}

A melhor solicitação é uma solicitação que não precise se comunicar com o servidor: uma cópia local da resposta permite eliminar toda a latência de rede e evita cargas de dados para a transferência de dados. Para isso, a especificação HTTP permite que o servidor retorne um [número de diretivas diferentes de Controle de cache](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) que controlam como e por quanto tempo cada resposta pode ser armazenada em cache pelo navegador e outros caches intermediários.

{% include shared/remember.liquid list=page.notes.cache-control %}

<img src="images/http-cache-control-highlight.png" class="center" alt="Exemplo de Controle de cache HTTP">

### `no-cache` e `no-store`

`no-cache` indica que a resposta retornada não pode ser usada para satisfazer a uma solicitação subsequente ao mesmo URL sem antes verificar com o servidor se a resposta foi alterada. Como resultado, se um token de validação adequado (ETag) estiver presente, o no-cache acionará uma viagem de ida e volta para validar a resposta armazenada em cache, mas pode eliminar o download se o recurso não tiver sido alterado.

Em contrapartida, `no-store` é muito mais simples, pois ele simplesmente proíbe o navegador e todos os caches intermediários de armazenar uma versão da resposta retornada, por exemplo, uma que contenha dados pessoais ou dados bancários. Sempre que o usuário solicita esse recurso, uma solicitação é enviada ao servidor e uma resposta completa é transferida.

### `pública` versus `particular`

Se a resposta for marcada como `pública`, ela pode ser armazenada em cache, mesmo se tiver autenticação HTTP associada e mesmo quando o código de status da resposta normalmente não puder ser armazenado em cache. Na maioria das vezes, a opção `pública` não é necessária, pois informações explícitas sobre o armazenamento em cache (como `max-age`) indicam
que a resposta pode ser armazenada em cache de qualquer maneira.

Em contrapartida, as respostas `particulares` podem ser armazenadas em cache pelo navegador, mas normalmente são destinadas a um só usuário, portanto, não podem ser armazenadas por um cache intermediário. Por exemplo, uma página HTML com informações particulares do usuário pode ser armazenada em cache pelo navegador desse usuário, mas não por um CDN.

### `max-age`

Essa diretiva especifica o tempo máximo em segundos em que a resposta buscada pode ser reutilizada a partir do momento da solicitação. Por exemplo, `max-age=60` indica que a resposta pode ser armazenada em cache e reutilizada nos próximos 60 segundos.

## Definição da política ideal de Controle de cache

<img src="images/http-cache-decision-tree.png" class="center" alt="Árvore de decisão de cache">

Siga a árvore de decisão acima para determinar a política de armazenamento em cache ideal para um determinado recurso ou conjunto de recursos utilizados por seu aplicativo. O ideal é que você armazene o maior número de respostas possível no cliente pelo maior período possível e que forneça tokens de validação para cada resposta para permitir que a revalidação seja eficiente.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th width="30%">Diretivas de controle de cache</th>
    <th>Explicação</th>
  </tr>
</thead>
<tr>
  <td data-th="controle de cache">max-age=86400</td>
  <td data-th="explicação">A resposta pode ser armazenada em cache pelo navegador e por qualquer cache intermediário (ou seja, ela é `pública`) por até um dia (60 segundos x 60 minutos x 24 horas)</td>
</tr>
<tr>
  <td data-th="controle de cache">particular, max-age=600</td>
  <td data-th="explicação">A resposta só pode ser armazenada em cache pelo navegador do cliente por até 10 minutos (60 segundos x 10 minutos)</td>
</tr>
<tr>
  <td data-th="controle de cache">no-store</td>
  <td data-th="explicação">A resposta não pode ser armazenada em cache e deve ser buscada em cada solicitação.</td>
</tr>
</table>

De acordo com o HTTP Archive, entre os principais 300.000 sites (pela classificação Alexa), [aproximadamente metade das respostas transferidas pode ser armazenada em cache](http://httparchive.org/trends.php#maxage0) pelo navegador, o que poupa muitas exibições de página e visitas repetidas. É claro que isso não significa que seu aplicativo tenha 50% de recursos que podem ser armazenados em cache: alguns sites podem armazenar em cache até aproximadamente 90% de seus recursos, enquanto outros têm muitos dados particulares ou suscetíveis ao tempo, que não podem ser armazenados em cache.

**Faça a auditoria de suas páginas para identificar que recursos podem ser armazenados em cache e garantir que eles retornem cabeçalhos de Controle de cache e ETag apropriados.**


## Invalidar e atualizar respostas armazenadas em cache

{% include shared/takeaway.liquid list=page.key-takeaways.invalidate-cache %}

Todas as solicitações HTTP feitas pelo navegador são enviadas primeiro ao cache do navegador para verificar se há uma resposta válida armazenada em cache que possa ser usada para atender à solicitação. Se houver uma correspondência, a resposta é lida do cache e eliminamos a latência de rede e os custos de dados gerados pela transferência. **Mas, e se quisermos atualizar ou invalidar uma resposta armazenada em cache?**

Por exemplo, digamos que nossos visitantes possam armazenar em cache uma folha de estilos de CSS por até 24 horas (max-age=86400), mas nosso designer acabou de enviar uma atualização que queremos disponibilizar para todos os usuários. Como informamos a todos os visitantes que estão com uma cópia `velha` do nosso CSS armazenada em cache que eles devem atualizar seus caches? É uma pegadinha. Não podemos fazer isso. Pelo menos não sem alterar o URL do recurso.

Uma vez que a resposta é armazenada em cache pelo navegador, a versão em cache será usada até que ela não seja mais atual, conforme determina a max-age, ou expire, ou até que seja apagada do cache por algum outro motivo, por exemplo se o usuário limpar o cache do navegador. Como resultado, diferentes usuários podem terminar usando diferentes versões do arquivo quando a página é construída. Usuários que acabaram de buscar um recurso terão a nova versão, enquanto usuários que armazenaram em cache uma cópia anterior (mas ainda válida) terão a versão mais antiga da resposta.

**Então, como podemos ter o melhor dos dois mundos: armazenamento em cache pelo cliente e atualizações rápidas?** É fácil. Podemos alterar o URL do recurso e forçar o usuário a fazer o download da nova resposta sempre que o conteúdo mudar. Normalmente, isso é feito por meio da integração de uma impressão digital do arquivo, ou um número de versão, no nome do arquivo, por exemplo, estilo.**x234dff**.css.

<img src="images/http-cache-hierarchy.png" class="center" alt="Hierarquia de cache">
efinir `hierarquias de cache`, com as quais é possível controlar não só o período do armazenamento em cache, mas também com que velocidade as novas versões são visualizadas pelo visitante. Por exemplo, analisaremos o exemplo anterior:

* O HTML está marcado com `no-cache`, o que significa que o navegador sempre revalidará o documento a cada solicitação e buscará a versão mais recente se o conteúdo mudar. Além disso, dentro da marcação HTML, integramos
A capacidade de definir políticas de armazenamento em cache por recurso permite d impressões digitais nos URLs para recursos de CSS e JavaScript: se o conteúdo desses arquivos mudar, o HTML da página também mudará e será feito o download da nova cópia da resposta HTML.
* O CSS tem permissão para ser armazenado por navegadores e por caches intermediários (por exemplo, um CDN) e está configurado para expirar em um ano. Podemos usar esse prazo longo de expiração com segurança porque integramos a impressão digital do arquivo em seu nome: se o CSS for atualizado, o URL também mudará.
* O JavaScript também está configurado para expirar em um ano, mas está marcado como particular, talvez porque contenha alguns dados pessoais do usuário que o CDN não deve armazenar em cache.
* A imagem é armazenada em cache sem uma versão ou impressão digital única e é configurada para expirar em um dia.

A combinação entre ETag, controle de cache e URLs únicos permite oferecer o melhor de todos os mundos: tempos de expiração longos, controle sobre onde a resposta pode ser armazenada em cache e atualizações sob demanda.

## Lista de verificação de cache

Não há uma política de cache ideal. Dependendo de seus padrões de tráfego, tipos de dados veiculados e requisitos específicos do aplicativo em relação à atualização dos dados, você precisará definir e ajustar as configurações apropriadas por recurso, além da `hierarquia de cache` geral.

Algumas dicas e técnicas para considerar enquanto você trabalha em sua estratégia de armazenamento em cache:

1. **Use URLs consistentes:** se você veicular o mesmo conteúdo com URLs diferentes, esse conteúdo será buscado e armazenado várias vezes. Dica: os [URLs diferenciam maiúsculas e minúsculas](http://www.w3.org/TR/WD-html40-970708/htmlweb.html)!
2. **O servidor deve fornecer um token de validação (ETag):** os tokens de validação eliminam a necessidade de transferir os mesmos bytes quando um recurso não foi alterado no servidor.
3. **Identifique os recursos que podem ser armazenados em cache por intermediários:** os recursos com respostas idênticas para todos os usuários são ótimos candidatos ao armazenamento em cache por um CDN e outros intermediários.
4. **Determine a duração ideal do cache para cada recurso:** diferentes recursos podem ter diferentes requisitos de atualização. Faça auditorias e determine a max-age apropriada para cada um.
5. **Determine a melhor hierarquia de cache para seu site:** a combinação entre URLs de recursos com impressões digitais de conteúdo e cache com pouca duração ou sem cache para documentos HTML permite que você controle a velocidade com que as atualizações chegam até o cliente.
6. **Minimize a variação:** alguns recursos são atualizados com mais frequência que outros. Se uma determinada parte de um recurso (por exemplo, função de JavaScript ou conjunto de estilos de CSS) for atualizada com frequência, considere fornecer esse código como um arquivo independente. Fazer isso permite que o resto do conteúdo (por exemplo, código da biblioteca que não muda com frequência) seja buscado no cache e minimiza o volume de conteúdo transferido a cada busca por atualizações.




