project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-28 #}

# O padrão PRPL {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Dogfood: sentimos que o PRPL tem muito potencial. Nesse momento, 
estamos usando a experimentação que ele oferece enquanto iteramos as ideias no 
padrão e coletamos mais dados sobre em que pontos ele oferece os maiores benefícios.

A web para dispositivos móveis é muito lenta. Ao longo dos anos, a web evoluiu de uma plataforma
centrada em documentos para uma plataforma de aplicativos de nível mundial. Graças aos
avanços da plataforma (como os
[Service Workers](/web/fundamentals/getting-started/primers/service-workers)) e das ferramentas
e técnicas que usamos para criar aplicativos, os usuários podem fazer na web praticamente tudo que
fazem em um aplicativo nativo.

Ao mesmo tempo, o grosso da computação passou das poderosas máquinas
desktop com conexões de rede rápidas e confiáveis para os relativamente insuficientes
dispositivos móveis, com conexões que muitas vezes são lentas, instáveis ou ambos. Isso acontece
principalmente em partes do mundo onde estão os próximos bilhões
de usuários que estão chegando ao mundo digital conectado.

Infelizmente, os padrões que imaginamos para criar e implementar aplicativos web cheios de recursos
e poderosos na era do computador normalmente geravam aplicativos que demoravam
muito para carregar em dispositivos móveis — tanto que muitos usuários simplesmente desistiam.

Isso se mostra uma oportunidade para criar novos padrões que aproveitem os recursos
da plataforma web moderna para fornecer experiências web móvel de forma granular e mais rápida.
O PRPL é um desses padrões.

## O padrão PRPL

PRPL é um padrão de estruturação e fornecimento de Progressive Web Apps (PWAs) com
ênfase no desempenho de lançamento e fornecimento do aplicativo. Ele significa:

*  **Push** (enviar) recursos críticos para a rota do URL inicial.
*  **Render** (renderizar) a rota inicial.
*  **Pre-cache** (armazenar em cache) as demais rotas.
*  **Lazy-load** (carregar com atraso) e criar demais rotas de acordo com a ação do usuário.

Além de visar aos objetivos e padrões fundamentais dos PWAs, o PRPL busca
a otimização para gerar:

* Menor tempo possível antes do início da interação
    * Especialmente no primeiro uso (independentemente do ponto de entrada)
    * Especialmente em dispositivos móveis comuns
* Máximo armazenamento em cache eficiente, especialmente ao longo do tempo, à medida que mais atualizações são lançadas
* Simplicidade de desenvolvimento e implementação

O PRPL se inspira em um conjunto de recursos modernos da plataforma web, mas é possível
aplicá-lo sem fazer valer todas as letras da sigla ou usar todos os
recursos.

Na verdade, o PRPL é mais voltado para uma mentalidade e visão de longo prazo no que diz respeito a melhorar o
desempenho da web móvel, nem tanto para tecnologias ou
técnicas específicas. Os conceitos por trás do PRPL não são novos, mas a abordagem foi moldada e
constituída pela equipe do Polymer e revelada na [Google I/O
2016](https://www.youtube.com/watch?v=J4i0xJnQUzU).

A demonstração de uma loja eletrônica do Polymer, o [Shop](https://shop.polymer-project.org), é um ótimo
exemplo de aplicativo que usa PRPL para fornecer recursos de forma granular.
Ele permite a interatividade em cada rota de forma extremamente rápida em dispositivos móveis
comuns.

![A demonstração do Shop do Polymer se torna interativa em 1,75 segundos](images/app-build-prpl-shop.png)

Francamente, para a maioria dos projetos para o mundo real, é muito cedo para entender a visão PRPL
na sua forma essencial e completa — mas definitivamente não é muito cedo para adotar
o conceito ou começar a abordar a visão por vários ângulos diferentes. Há muitas
etapas práticas que os desenvolvedores de aplicativo, de ferramentas e fornecedores de navegador
podem adotar ao buscar atingir o PRPL hoje.

## Estrutura do aplicativo

O PRPL funciona bem se você tiver um aplicativo de página única (SPA) com a seguinte
estrutura:

-   O principal _entrypoint_ do aplicativo que é fornecido a partir de qualquer
    rota válida. Esse arquivo deve ser muito pequeno, já que será fornecido por
    diferentes URLs e, portanto, armazenado em cache diversas vezes. Todos os URLs de recurso
    do ponto de entrada precisam ser absolutos, já que podem ser fornecidos por
    URLs não primários.

-   O _shell_ ou shell do aplicativo, que contém a lógica principal do aplicativo, o roteador
    e outros.

-   _Fragmentos_ do aplicativo carregados com atraso. Um fragmento pode representar o código de
    uma determinada vista ou outro código que pode ser carregado com atraso (por exemplo,
    partes do aplicativo principal não necessárias para a primeira gravação, como menus que não
    são exibidos até o usuário interagir com o aplicativo). O shell é responsável por
    importar os fragmentos dinamicamente, de acordo com a necessidade.

O servidor e o service worker trabalham juntos para pré-armazenar os recursos em cache para as
rotas inativas.

Quando o usuário troca de rota, o aplicativo adia o carregamento de todos os recursos necessários que
ainda não foram armazenados em cache e cria as vistas solicitadas. Acessos repetidos às rotas
devem ser interativos de forma imediata. Nisso o Service Worker ajuda muito.

O diagrama abaixo mostra os componentes de um aplicativo simples que podem ser estruturados
usando [Web Components](http://webcomponents.org/):

![diagrama de um aplicativo que tem duas vistas, com ambas tendo dependências individuais
e compartilhadas](images/app-build-components.png)

Note: embora o HTML Imports seja a estratégia de agrupamento preferida do Polymer, você pode
usar agrupamento baseado em rotas e divisão de código para ter uma configuração parecida com a que se consegue com
agrupadores de módulo JavaScript modernos

Nesse diagrama, as linhas tracejadas representam _dependências estáticas_: recursos
externos identificados nos arquivos pelas tags `<link>` e `<script>`. As linhas
pontilhadas representam _dependências dinâmicas_ ou _carregadas sob demanda_: arquivos carregados
conforme a necessidade pelo shell.

O processo de compilação compila um gráfico de todas essas dependências e o servidor
usa essa informação para fornecer os arquivos com eficiência. Além disso, ele compila um conjunto de
agrupamentos vulcanizados para navegadores que não oferecem suporte a HTTP/2.

### Ponto de entrada do aplicativo

O ponto de entrada deve importar e instanciar o shell, além de carregar
condicionalmente todo polyfill necessário.

As principais considerações para o ponto de entrada são:

-   Ter o menor número possível de dependências estáticas, ou seja, não muito mais do que o próprio shell do aplicativo.
-   Carrega os polyfills necessários condicionalmente.
-   Usa caminhos absolutos para todas as dependências.

### App Shell

O shell é responsável pelo roteamento e normalmente contém a principal IU de navegação
do aplicativo.

O aplicativo deve carregar fragmentos com atraso à medida que forem necessários. Por exemplo, quando o usuário
muda para uma nova rota, ele importa o(s) fragmento(s) associado(s) a
ela. Isso pode dar origem a uma nova solicitação ao servidor ou simplesmente carregar o
recurso armazenado em cache.

O shell (incluindo suas dependências estáticas) deve conter tudo o que é necessário
para a primeira gravação.

## Resultado da compilação

Embora não seja um requisito muito complicado do uso do PRPL, seu processo de compilação pode
produzir duas versões:

-   Uma versão não agrupada voltada para combinações de servidor/navegador compatíveis com
    HTTP/2 para fornecer os recursos de que o navegador precisa para produzir uma rápida primeira gravação 
    otimizando o armazenamento em cache ao mesmo tempo. O fornecimento desses recursos pode ser acionado
    com eficiência por [`<link rel="preload">`][Resource hints] ou [HTTP/2 Push].

-   Uma versão agrupada voltada para minimizar o número de idas e voltas necessárias para
    fazer o aplicativo funcionar em combinações de servidor/navegador que não são compatíveis com
    envio (push) de servidor.

Sua lógica de servidor deve fornecer a versão adequada para cada navegador.

### Versão agrupada

Para navegadores que não trabalham com HTTP/2, o processo de compilação pode produzir um conjunto
de diferentes agrupamentos: um para o shell e outro para cada
fragmento. O diagrama abaixo mostra como um aplicativo simples seria agrupado, novamente usando o
Web Components:

![diagrama do mesmo aplicativo de antes, em que há três dependências
agrupadas](images/app-build-bundles.png)

Toda dependência compartilhada por dois ou mais fragmentos é agrupada junto com o shell e
suas dependências estáticas.

Cada fragmento e suas dependências estáticas _não compartilhadas_ são agrupadas em um único
grupo. O servidor deve retornar a versão adequada do fragmento
(agrupada ou não agrupada), dependendo do navegador. Isso significa que o código do shell
pode carregar `detail-view.html` com atraso _sem precisar saber se o arquivo está agrupado
ou não_. Ele trabalha com base no servidor e no navegador para carregar as dependências da
forma mais eficiente possível.


## Por trás dos panos: HTTP/2 e envio push de servidor do HTTP/2

O [HTTP/2] permite downloads _multiplexados_ em uma única
conexão. Assim, diversos arquivos pequenos podem ser baixados com mais eficiência.

O [envio push de servidor do HTTP/2][HTTP/2 Push] permite que o servidor
envie recursos com antecedência ao navegador.

Se quiser um exemplo de como o envio push de servidor do HTTP/2 acelera os downloads, imagine como o
navegador busca um arquivo HTML com uma folha de estilo vinculada a ele.

No HTTP/1:

*   O navegador solicita o arquivo HTML.
*   O servidor retorna o arquivo HTML e o navegador começa a analisá-lo.
*   O navegador encontra a tag `<link rel="stylesheet">` e cria uma nova
    solicitação para a folha de estilos.
*   O navegador recebe a folha de estilos.

Com o envio push do HTTP/2:

*   O navegador solicita o arquivo HTML.
*   O servidor retorna o arquivo HTML e envia por push a folha de estilos ao mesmo
    tempo.
*   O navegador começa a analisar o HTML. No momento em que ele encontra `<link
    rel="stylesheet">, a folha de estilos já está armazena﻿da em cache.

Nos casos mais simples, o envio push de servidor do HTTP/2 elimina uma única resposta
a solicitação HTTP.

Com o HTTP/1, os desenvolvedores agrupam recursos para reduzir o número de solicitações
HTTP necessárias para renderizar uma página. No entanto, agrupar pode reduzir a eficiência
do cache do navegador. Se os recursos de toda página forem combinados em um único
pacote, toda página receberá o próprio pacote e o navegador não conseguirá identificar os recursos
compartilhados.

A combinação de HTTP/2 e envio push de servidor do HTTP/2 oferece os _benefícios_ do
agrupamento (latência reduzida) sem agrupar realmente. Manter os recursos separados
significa poder armazená-los em cache com eficiência e compartilhá-los entre as páginas.

O envio push do HTTP/2 precisa ser utilizado com cuidado, já que ele força os dados ao navegador,
mesmo se o arquivo já estiver no cache local do navegador ou a largura de banda já
estiver saturada. Se usado de forma incorreta, pode prejudicar o desempenho. As 
[`<link rel="preload">`][Resource hints] podem ser uma boa alternativa para permitir 
que o navegador tome decisões inteligentes sobre a priorização das solicitações.  

## Conclusão

Carregar o código das rotas de forma mais granular e permitir que os navegadores programem
o trabalho da melhor forma tem um potencial enorme de acelerar o início da interatividade nos
aplicativos. Precisamos de **melhores arquiteturas que disponibilizem a
interatividade rapidamente**, e o padrão PRPL é um exemplo interessante de como
atingir esse objetivo em dispositivos comuns.

Tudo se baseia em ter espaço simultâneo suficiente depois de carregar as
abstrações. Se a abertura de um link é atrasada em segundos por script que impede
que eventos de entrada sejam enviados, há um indício sólido de que é preciso melhorar
o desempenho. Esse é um problema comum com aplicativos criados com base
em bibliotecas JavaScript grandes, em que a IU é renderizada como se parecesse
funcionar mas, na verdade, não funciona.

Superando esse desafio, o PRPL pode ajudar a fornecer o código funcional mínimo necessário para tornar a rota em que
os usuários caem interativa

[HTTP/2]: /web/fundamentals/performance/http2/
[Resource hints]: /web/updates/2016/03/link-rel-preload
[HTTP/2 Push]: /web/fundamentals/performance/http2/#server-push


{# wf_devsite_translation #}
