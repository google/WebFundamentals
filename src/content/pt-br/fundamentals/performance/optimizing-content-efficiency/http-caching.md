project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O armazenamento em cache e reutilização de recursos buscados anteriormente é um aspecto crítico da otimização do desempenho.

{# wf_updated_on: 2016-08-30 #}
{# wf_published_on: 2013-12-31 #}

# Cache de HTTP {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

A recuperação de alguma coisa pela rede é lenta e dispendiosa. Respostas grandes exigem várias idas e voltas entre o cliente e o servidor, o que retarda sua disponibilidade e processamento pelo navegador, além de gerar custos de dados para o visitante. Como resultado, a capacidade de armazenar em cache e reutilizar recursos previamente recuperados é um aspecto crítico da otimização do desempenho.


A boa notícia é que todo navegador é fornecido com uma implementação de um cache de HTTP. Tudo que você tem que fazer é garantir que cada resposta de servidor forneça as diretivas de cabeçalho HTTP corretas para instruir o navegador sobre quando e por quanto tempo o navegador pode armazenar a resposta em cache.

Observação: Se você usar uma WebView para recuperar e exibir conteúdo da Web em seu aplicativo, pode ser necessário informar sinalizadores de configuração adicionais para garantir que o cache HTTP esteja ativado, que seu tamanho seja definido de acordo com o seu caso de uso e o cache seja persistido. Verifique a documentação da plataforma e confirme suas configurações!

<img src="images/http-request.png"  alt="Solicitação HTTP">

Quando o servidor retorna uma resposta, também emite uma coleção de cabeçalhos HTTP, descrevendo o tipo de conteúdo, o comprimento, as diretivas de armazenamento em cache, o token de validação e outras informações. Por exemplo, na troca acima, o servidor retorna uma resposta de 1024 bytes, instrui o cliente a armazená-la em cache por até 120 segundos e fornece um token de validação ("x234dff") que pode ser usado após a expiração da resposta para verificar se o recurso foi modificado.


## Validar respostas armazenadas em cache com ETags

### TL;DR {: .hide-from-toc }
* O servidor usa a ETag de cabeçalho HTTP para comunicar um token de validação.
* O token de validação permite verificações eficientes de atualização de recursos: nenhum dado é transferido se o recurso não foi alterado.


Assuma que se passaram 120 segundos desde nossa recuperação inicial e o navegador iniciou uma nova solicitação para o mesmo recurso. Primeiro, o navegador verifica o cache local e encontra a resposta anterior. Infelizmente, o navegador não pode usar a resposta anterior porque a resposta está expirada. Nesse ponto, o navegador pode despachar uma nova solicitação e recuperar uma nova resposta completa. No entanto, isso é ineficiente porque não há motivo para baixar a mesma informação que já está no cache.

Esse é o problema que os tokens de validação, como especificados no cabeçalho ETag, foram projetados para resolver. O servidor gera e retorna um token arbitrário, que é normalmente um hash ou outra impressão digital do conteúdo do arquivo. O cliente não precisa saber como a impressão digital é gerada; basta apenas enviá-la ao servidor na próxima solicitação. Se a impressão digital ainda for a mesma, o recurso não foi alterado e você pode evitar o download.

<img src="images/http-cache-control.png"  alt="Exemplo de Cache-Control de HTTP">

No exemplo anterior, o cliente fornece automaticamente o token ETag no cabeçalho de solicitação "If-None-Match" do HTTP. O servidor verifica o token em relação ao recurso atual. Se não houve alteração no token, o servidor retorna uma resposta "304 Not Modified", que informa ao navegador que a resposta que está no cache não foi alterada e pode ser renovada por outros 120 segundos. Observe que não é necessário baixar a resposta novamente, o que economiza tempo e largura de banda.

Como desenvolvedor Web, como você pode aproveitar a revalidação eficiente? O navegador faz todo o trabalho por nós. O navegador detecta automaticamente se um token de validação foi especificado previamente, ele anexa o token de validação a uma solicitação de saída e atualiza as marcações de data e hora de cache conforme a necessidade de acordo com a resposta recebida do servidor. **A única ação que resta fazer é garantir que o servidor esteja fornecendo os tokens ETag necessários. Verifique a documentação do seu servidor para consultar os sinalizadores de configuração necessários.**

Observação: Dica: O projeto HTML5 Boilerplate contém <a href='https://github.com/h5bp/server-configs'>exemplos de arquivos de configuração</a> para todos os servidores mais populares, com comentários detalhados para cada sinalizador e definição da configuração. Encontre seu servidor favorito na lista, procure as configurações adequadas e copie as configurações recomendadas ou confirme que seu servidor já as usa.

## Cache-Control

### TL;DR {: .hide-from-toc }
* Cada recurso pode definir usar sua política de armazenamento em cache por meio do cabeçalho Cache-Control do HTTP.
* As diretivas do Cache-Control controlam quem pode armazenar a resposta em cache e em que condições e por quanto tempo isso ocorre.


De uma perspectiva de otimização de desempenho, a melhor solicitação é a que não precisa se comunicar com o servidor: uma cópia local da resposta te permite eliminar toda a latência de rede e evitar os custos de dados na transferência de dados. Para isso, a especificação HTTP permite que o servidor retorne [diversas diretivas Cache-Control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) que controlam como, e por quanto tempo, o navegador e outros caches intermediários podem armazenar a resposta individual em cache.

Observação: O cabeçalho Cache-Control foi definido com parte da especificação HTTP/1.1 e substitui os cabeçalhos anteriores (por exemplo, Expires) usados para definir políticas de armazenamento de respostas em cache. Todos os navegadores modernos são compatíveis com Cache-Control, então isso é tudo que você precisa.

<img src="images/http-cache-control-highlight.png"  alt="Exemplo de Cache-Control de HTTP">

### "no-cache" e "no-store"

"no-cache" indica que a resposta retornada não pode ser usada para satisfazer uma solicitação subsequente para o mesmo URL sem antes verificar com o servidor se a resposta foi alterada. Como resultado, se um token de validação (ETag) adequado estiver presente, no-cache gera uma ida e volta para validar a resposta armazenada em cache, mas poderá eliminar o download caso o recurso não tenha sido alterado.

Em contrapartida, "no-store" é muito mais simples. Ele se limita a desautorizar o navegador e todos os caches intermediários a armazenar qualquer versão da resposta retornada&mdash;por exemplo, respostas contendo dados pessoais ou bancários privados. Sempre que o usuário solicitar esse ativo, uma solicitação será enviada ao servidor e uma resposta completa será baixada.

### "public" vs. "private"

Se a resposta for marcada como "public", poderá ser armazenada em cache, mesmo se tiver uma autenticação HTTP associada a ela e mesmo se o código de status da resposta não for normalmente armazenável em cache. Na maior parte das vezes, "public" não é realmente necessário, pois informações explícitas de armazenamento em cache (como "max-age") indicam que a resposta é armazenável em cache.

Por outro lado, respostas "private" podem ser armazenadas em cache pelo navegador. No entanto, estas respostas são tipicamente destinadas a um único usuário, e, portanto, não podem ser armazenadas em cache em nenhum cache intermediário. Por exemplo, o navegador de um usuário pode armazenar em cache uma página HTML com informações de usuário privadas, mas uma CDN não pode armazenar a página em cache.

### "max-age"

Essa diretiva especifica o tempo máximo, em segundos, que a resposta recuperada pode ser reutilizada, a partir do momento da solicitação. Por exemplo, "max-age=60" indica que a resposta pode ser armazenada em cache e reutilizada nos próximos 60 segundos.

## Definir a política ideal de Cache-Control

<img src="images/http-cache-decision-tree.png"  alt="Árvore de decisão do cache">

Siga a árvore de decisão acima para determinar a política ideal de armazenamento em cache para um determinado recurso ou conjunto de recursos que o seu aplicativo usa. Idealmente, você deve tentar armazenar no cache do cliente o maior número de respostas possível pelo maior período possível, bem como fornecer tokens de validação para cada resposta, permitindo uma revalidação eficiente.

<table class="responsive">
<thead>
  <tr>
    <th colspan="2">Diretivas de Cache-Control &amp; Explicação</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explanation">A resposta pode ser armazenada em cache pelo navegador e por qualquer cache intermediário (ou seja, é "pública") por até 1 dia (60 segundos x 60 minutos x 24 horas)</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explanation">A resposta pode ser armazenada em cache pelo navegador do cliente por até 10 minutos (60 segundos x 10 minutos).</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explanation">A resposta não pode ser armazenada em cache e deve ser recuperada totalmente em cada solicitação.</td>
</tr>
</table>

De acordo com o HTTP Archive, entre os 300.000 sites principais (pela classificação do Alexa), o navegador pode armazenar em cache [cerca de metade das respostas baixadas](http://httparchive.org/trends.php#maxage0), o que é uma enorme economia para visualizações de página e visitas repetidas. Obviamente, isso não significa que seu aplicativo específico pode armazenar 50% dos recursos em cache. Alguns sites podem armazenar em cache mais de 90% de seus recursos, enquanto outros sites podem ter uma grande quantidade de dados privados ou dependentes do tempo que nunca podem ser armazenados em cache.

**Confira suas páginas para identificar quais recursos podem ser armazenados em cache e garantir que retornem os cabeçalhos Cache-Control e ETag adequados.**

## Invalidar e atualizar respostas armazenadas em cache

### TL;DR {: .hide-from-toc }
* As respostas armazenadas em cache local são usadas até que o recurso "expire".
* A incorporação de uma impressão digital de conteúdo de arquivo no URL permite forçar a atualização para uma nova versão da resposta no cliente.
* Cada aplicativo precisa definir sua própria hierarquia de cache para ter o desempenho ideal.


Todas as solicitações HTTP efetuadas pelo navegador são antes encaminhadas ao cache do navegador, para verificar se há uma resposta válida armazenada no cache que possa ser usada para atender à solicitação. Se houver, a resposta será lida do cache, o que elimina a latência de rede e os custos de dados gerados pela transferência. 

**Todavia, e se você quiser atualizar ou invalidar uma resposta armazenada em cache?** Por exemplo, suponha que você determinou que seus visitantes armazenem uma folha de estilo CSS por até 24 horas (max-age=86400), mas seu designer acabou de confirmar uma atualização que você deseja disponibilizar a todos os usuários. Como você notifica todos os visitantes que têm uma cópia "obsoleta" do seu CSS armazenada em cache para que atualizem seus caches? Não é possível, a menos que se altere o URL do recurso.

Depois que uma resposta é armazenada em cache pelo navegador, a versão do cache é usada até que deixe de ser atual, conforme determinado por max-age, ou expire, ou seja eliminada do cache por algum outro motivo&mdash; por exemplo, se o usuário limpar o cache do navegador. Como resultado, usuários diferentes podem acabar usando versões diferentes do arquivo quando a página é construída. Os usuários que recuperaram recentemente o recurso usa a nova versão e os que armazenaram uma cópia anterior (mas ainda válida) no cache usa uma versão mais antiga da resposta.

**Como você pode obter o melhor das duas opções: armazenamento em cache do lado do cliente e atualizações rápidas?** Você pode alterar o URL do recurso e forçar o usuário a baixar a nova resposta sempre que seu conteúdo seja alterado. Tipicamente, isso é feito incorporando uma impressão digital do arquivo, ou um número de versão, em seu nome de arquivo&mdash; por exemplo, style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png"  alt="Hierarquia do cache">

A capacidade de definir políticas de armazenamento em cache por recurso permite definir "hierarquias de cache" que permitem controlar não apenas o tempo de armazenamento em cache, mas também a rapidez com que novas versões são vistas pelos visitantes. Para ilustrar isso, analise o exemplo acima:

* O HTML é marcado com "no-cache", o que significa que o navegador sempre revalida o documento em cada solicitação e recupera a versão mais recente, caso o conteúdo seja alterado. Além disso, dentro da marcação HTML, você incorporou impressões digitais nos URLs para ativos CSS e JavaScript. Se o conteúdo desses arquivos for alterado, o HTML da página também é alterado e uma nova cópia da resposta HTML é baixada.
* Os navegadores e caches intermediários (por exemplo, CDN) permitem o armazenamento de CSS em cache com expiração definida para 1 ano. Observe que você pode usar "expirações distantes no futuro" de 1 ano com segurança, pois incorporou as impressões digitais do arquivo no seu nome de arquivo. Se o CSS for atualizado, o URL também é alterado.
* No caso do JavaScript, a expiração também é definida para um ano, mas ele é marcado como privado, possivelmente porque contém alguns dados de usuário privados que a CDN não deve armazenar em cache.
* A imagem é armazenada em cache sem versão ou impressão digital única, e a expiração é definida como um dia.

A combinação de ETag, Cache-Control e URLs únicos permite fornecer o melhor das duas opções: tempos de expiração longos, controle sobre onde a resposta pode ser armazenada e atualizações sob demanda.

## Lista de verificação de armazenamento em cache

Não existe uma única melhor política de cache. Dependendo dos padrões de tráfego, do tipo de dados servido e de requisitos de atualização dos dados específicos de aplicativos, é obrigatório definir as configurações adequadas para cada recurso, bem como a "hierarquia geral de armazenamento em cache".

Veja a seguir algumas dicas e técnicas a considerar durante a definição da estratégia de armazenamento em cache:

* **Use URLs consistentes:** se você servir o mesmo conteúdo em URLs diferentes, esse conteúdo será recuperado e armazenado várias vezes. Dica: observe que os [URLs diferenciam minúsculas de maiúsculas](http://www.w3.org/TR/WD-html40-970708/htmlweb.html).
* **Certifique-se de que o servidor fornece um token de validação (ETag):** os tokens de validação eliminam a necessidade de transferir os mesmos bytes quando um recurso não foi alterado no servidor.
* **Identifique quais recursos podem ser armazenados em cache por intermediários:** os recursos com respostas idênticas para todos os usuários são ótimos candidatos para armazenamento em cache por uma CDN ou por outros intermediários.
* **Determine o ciclo de vida ideal do cache para cada recurso:** recursos diferentes podem ter requisitos de atualização diferentes. Examine e determine o max-age adequado para cada um.
* **Determine a melhor hierarquia de cache para seu site:** a combinação de URLs de recursos com impressões digitais de conteúdo e os ciclos de vida curtos ou sem cache para documentos HTML permitem controlar a rapidez com que as atualizações são obtidas pelo cliente.
* **Minimize a rotatividade:** alguns recursos são atualizados com maior frequência que os demais. Se determinada parte de um recurso (por exemplo, função JavaScript ou um conjunto de estilos CSS) for atualizada frequentemente, considere fornecer esse código em um arquivo separado. Isso permitirá que o restante do conteúdo (por exemplo, código de biblioteca que não é alterado com frequência) seja recuperado do cache e minimizará a quantidade de conteúdo baixado sempre que uma atualização for recuperada.



{# wf_devsite_translation #}
