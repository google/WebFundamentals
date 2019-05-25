project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-05-25 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# Priorização de recursos – Como o navegador pode ajudar você {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

O navegador entende que nem todo byte enviado tem o mesmo grau de
importância. Os navegadores têm dados heurísticos que tentam
fazer uma estimativa dos recursos mais importantes. Por isso, alguns deles devem ser carregados primeiro,
como o CSS antes de scripts e imagens.

Como em qualquer análise heurística, isso nem sempre funciona: o navegador pode
tomar a decisão errada. Normalmente isso acontece porque ele não tem informações suficientes
naquele momento. Este artigo explica como influenciar, de maneira adequada, a prioridade de conteúdo
nos navegadores modernos, permitindo que eles saibam suas necessidades futuras.

## Prioridades padrão no navegador

Como mencionado anteriormente, o navegador atribui prioridades relativas diferentes para
tipos diferentes de recursos, com base no nível de importância deles. Observe por
exemplo que uma tag `<script>` no `<head>` da sua página seria carregada no Chrome como prioridade
**High** (abaixo do CSS, que é prioridade **Highest**). Porém, essa prioridade seria alterada para
**Low** caso ela tivesse um atributo async (o que significa que ela pode ser carregada e executada
de forma assíncrona).

As prioridades tornam-se importantes ao analisar o desempenho de carregamento do seu site.
Além das técnicas comuns de
[medição](/web/fundamentals/performance/critical-rendering-path/measure-crp)
e de
[análise do caminho crítico de renderização](/web/fundamentals/performance/critical-rendering-path/analyzing-crp),
é útil conhecer a prioridade do Chrome para cada recurso. Você pode localizar essa informação no
painel “Network” das Ferramentas para Desenvolvedores do Chrome. Veja como isso aparece:


<figure>
  <div class="aspect-ratio"
       style="width: 1810px; --aspect-ratio-w: 1810; --aspect-ratio-h: 564">
    <img src="images/res-prio-priorities.png"
    alt="Exemplo de como as prioridades são exibidas nas Ferramentas para Desenvolvedores do Chrome">
  </div>
  <figcaption><b>Imagem 1</b>: prioridades nas Ferramentas para Desenvolvedores do Chrome. Talvez seja
 preciso ativar a coluna Priority clicando duas vezes nos cabeçalhos da coluna.
  </figcaption>
</figure>


Essas prioridades dão a você uma ideia de qual a importância relativa que o
navegador atribui a cada recurso. As diferenças sutis são
suficientes para que o navegador atribua uma prioridade diferente. Uma imagem que
é parte da renderização inicial, por exemplo, tem prioridade mais alta do que uma imagem que
é iniciada fora da tela. Se você quiser saber mais sobre as prioridades,
[este artigo de Addy Osmani](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}
mostra detalhes sobre o estado atual das prioridades no Chrome.

O que fazer se encontrar algum recurso com uma marcação de prioridade diferente
daquela que você queria?

Este artigo aborda três diferentes soluções declarativas, todas de tipos
relativamente `<link>` novos. Se seus recursos são essenciais para a experiência do usuário
mas estão sendo carregados em prioridade muito baixa, você tem duas formas
para tentar corrigir isso : o pré-carregamento ou a pré-conexão. Por outro lado, caso você queira que o
navegador ative alguns recursos somente quando já tiver terminado todo o
restante, tente a pré-busca.

Veremos todas as três opções:

## Pré-carregamento

O `<link rel="preload">` informa ao navegador que um recurso é parte necessária
da navegação atual e que ele deve ser ativado o
mais rápido possível. Veja como usá-lo:

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

Essa opção deve corresponder às suas expectativas, exceto talvez pelo atributo
“as”. Assim, você pode informar ao navegador que tipo de recurso está sendo
carregado para que ele seja gerenciado corretamente. O navegador não usa
os recursos pré-carregados, a menos que o tipo correto seja definido. O recurso é
carregado com a prioridade aplicada normalmente. No entanto, agora o navegador tem a informação
com antecedência, o que permite antecipar o processo de download.

Observe que o `<link rel="preload">` é uma instrução obrigatória do navegador.
Diferente de outras dicas de recurso que serão abordadas aqui, o navegador precisa
realizar essa instrução, já que ela não é só uma sugestão adicional. Por isso, é importante
testá-lo com cuidado para garantir que você não
busque algo duas vezes ou faça buscas desnecessárias.

Recursos que são buscados usando o `<link rel="preload">` mas não são usados pela
página atual em três segundos, acionarão um aviso no Console das Ferramentas para Desenvolvedores
do Chrome. Por isso, é importante ficar de olho neles.

<figure>
  <div class="aspect-ratio"
       style="width: 1050px; --aspect-ratio-w: 1050; --aspect-ratio-h: 244">
    <img src="images/res-prio-timeout.png"
    alt="Exemplo de erro de tempo limite no pré-carregamento nas Ferramentas para Desenvolvedores do Chrome">
  </div>
</figure>

### Caso de uso: fontes

Fontes são um ótimo exemplo de recursos tardiamente descobertos que devem ser buscados,
muitas vezes na parte inferior de um dos vários arquivos CSS carregados por uma página.

Para reduzir o tempo que o usuário tem que esperar pelo conteúdo de texto
do seu site e também evitar dissonâncias desagradáveis entre as fontes do sistema e as suas
favoritas, você pode usar o `<link rel="preload">` no seu HTML. Dessa forma, o
navegador entenderá imediatamente que uma fonte é necessária.

    <link rel="preload" as="font" crossorigin="anonymous" type="font/woff2" href="myfont.woff2">

O uso de `crossorigin` aqui é importante. Sem esse atributo,
a fonte pré-carregada é ignorada pelo navegador e uma nova busca é
feita. Isso ocorre porque o esperado é que as fontes sejam buscadas anonimamente pelo
navegador, e a solicitação de pré-carregamento só será feita dessa maneira por meio da utilização do atributo
`crossorigin`.

Atenção: se você estiver usando CDN, como o Google Fonts, verifique se os arquivos de fonte
pré-carregados correspondem aos do CSS, o que pode ser difícil devido a intervalos
unicode, pesos e variantes de fonte. Fontes também podem ser atualizadas regularmente.
Se você estiver pré-carregando uma versão antiga enquanto usa o CSS para uma nova versão,
pode acabar fazendo o download de duas versões da mesma fonte, desperdiçando a largura de banda
do usuário. Ao invés disso, use o `<link rel="preconnect">` para uma manutenção
simplificada.

### Caso de uso: caminho crítico CSS e JavaScript

Quando o assunto é o desempenho da página, um conceito útil é o “caminho crítico”.
Ele refere-se aos recursos que precisam ser carregados antes da
renderização inicial. Esses recursos, como o CSS, são importantes para trazer os primeiros
pixels para a tela do usuário.

Anteriormente, a recomendação era deixar esse conteúdo inline no seu HTML.
No entanto, quando você usa várias páginas e a renderização no servidor, isso se torna
um grande desperdício de bytes. Além disso, também deixa o controle de versão mais difícil, já que qualquer alteração no
código crítico invalida páginas inline.

O `<link rel="preload">` permite que você mantenha os benefícios do
controle de versão e armazenamento em cache do arquivo individual e, ao mesmo tempo, oferece um mecanismo para solicitar
o recurso o mais rápido possível.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

No caso do pré-carregamento, há um ponto negativo: você ainda está sujeito a uma viagem de ida e volta adicional.
Isso ocorre porque o navegador precisa primeiramente buscar o
HTML para só então encontrar os próximos recursos.

Uma forma de evitar essa viagem extra é usar o push
do [HTTP/2](/web/fundamentals/performance/http2/#server_push)
, onde você anexa antecipadamente os recursos importantes à mesma
conexão usada para enviar o HTML. Isso garante que não haja
inatividade entre o navegador do usuário, que está recuperando o HTML, e o início do
download dos recursos essenciais. No entanto, fique atento ao usar o push do HTTP/2.
Essa é uma forma muito poderosa de controlar a largura de banda do usuário  (“o servidor
sabe mais”) e deixa pouquíssimo espaço para que o navegador tome suas próprias
decisões, como não recuperar um arquivo que já esteja no cache, por exemplo.

## Pré-conexão

A `<link rel="preconnect">` informa ao navegador que sua página pretende
estabelecer uma conexão com outra origem e que você gostaria que o processo
começasse o mais rápido possível.

Estabelecer conexões costuma envolver um tempo significativo em redes lentas,
particularmente no caso de conexões seguras. Isso acontece porque elas envolvem buscas DNS
, redirecionamentos, e várias viagens de ida e volta até o servidor final, que
gerencia a solicitação do usuário. Organizar tudo isso com antecedência pode fazer com que seu
aplicativo pareça muito mais rápido ao usuário, sem afetar negativamente o uso
da largura de banda. Na maioria das vezes vale a pena aguardar até que a conexão seja estabelecida,
em vez de fazer a troca de dados.

Informar sua intenção ao navegador é tão simples quanto adicionar uma tag de link à
sua página:

    <link rel="preconnect" href="https://example.com">

Neste caso, permitimos que o navegador saiba que pretendemos nos conectar a
`example.com` e recuperar conteúdo de lá.

Embora a `<link rel="preconnect">` seja bastante leve, esse recurso ainda pode
consumir um tempo de CPU valioso, principalmente em conexões seguras. Isso é
especialmente ruim caso quando a conexão não é usada em até 10 segundos, já que o navegador
a fechará, desperdiçando todo o trabalho da conexão anterior.

Em geral, tente o usar o `<link rel="preload">` sempre que puder, já que ele tem um
ajuste de desempenho mais abrangente. No entanto, mantenha a `<link rel="preconnect">` como opção
para casos extremos. Vejamos alguns deles.

Note: na verdade, existe outro tipo de `<link>` relacionado a conexões:
`<link rel="dns-prefetch">`. Esse recurso gerencia somente as buscas DNS, por isso, é um
pequeno subconjunto da `<link rel="preconnect">`. No entanto, tem ampla compatibilidade com navegadores e
pode servir como um bom fallback.
Você pode usá-lo da mesma forma:
`<link rel="dns-prefetch" href="https://example.com">`

### Caso de uso: quando você sabe *de onde*, mas não *o que* está buscando

Devido a questões de versão, às vezes você acaba em uma situação onde
sabe que recuperará um recurso de determinado CDN, mas não conhece o caminho específico
para ele. Em outros casos, um dos vários recursos pode ser recuperado, dependendo
das consultas de mídia ou da verificação de recursos do ambiente de execução no navegador do usuário.

Nessas situações, e caso o recurso que você buscará seja importante, é
possível poupar o máximo de tempo usando uma conexão prévia com o servidor. O
navegador não iniciará a busca do arquivo antes que seja necessário (ou seja, quando a
solicitação for feita de alguma maneira a partir da sua página). No entanto, ele pode gerenciar os
aspectos da conexão antecipadamente, poupando o usuário da espera de várias viagens
de ida e volta.

### Caso de uso: streaming de mídia

Outra situação em que você pode querer poupar algum tempo na fase de conexão,
mas sem começar a recuperar o conteúdo imediatamente, é fazendo streaming de mídia
de uma origem diferente.

Dependendo da forma como a sua página lida com o conteúdo de streaming, talvez você queira esperar
até que seus scripts sejam carregados e estejam prontos para processar a transmissão. A pré-conexão
ajuda a evitar a o tempo de espera de uma única viagem de ida e volta, já que você está pronto para
começar a busca.

## Pré-busca

A `<link rel="prefetch">` é de certo modo diferente do `<link rel="preload">` e da
`<link rel="preconnect">`. Esse recurso não tenta fazer com que algo importante
aconteça mais rápido. Em vez disso, procura agir para que algo não-crítico aconteça antes ,
se houver chance.

Para isso, o navegador é informado a respeito de um recurso que talvez seja
necessário como parte de uma navegação futura ou interação do usuário, por exemplo.
Algo que *pode* ser necessário depois, caso o usuário execute a ação
esperada. Esses recursos são buscados na prioridade **Lowest** do Chrome,
quando a página atual é carregada e há largura de banda disponível.

Isso significa que a `prefetch` é mais adequada para antecipar a ação do
usuário. O recurso prepara o ambiente para isso, como a recuperação da página de detalhes do primeiro produto
em uma lista de resultados ou a recuperação da próxima página em conteúdo paginado.

    <link rel="prefetch" href="page-2.html">

No entanto, a pré-busca não funciona de maneira recorrente. No exemplo acima,
você só recuperaria o HTML e não faria o download antecipado de quaisquer recursos que a `page-2.html` precisasse,
a não ser que realizasse, de maneira explícita, a pré-busca deles
também.

### A pré-busca não funciona como modificação

É importante lembrar que você não pode usar a `<link rel="prefetch">` como uma forma de
baixar o nível de prioridade de um recurso existente. No HTML a seguir, você pode
pensar que declarar o `optional.css` em uma pré-busca reduziria a prioridade para
o `<link rel="stylesheet">` subsequente:

    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        Olá!
      </body>
    </html>

No entanto, isso fará com que sua folha de estilo seja buscada duas vezes (embora
com uma potencial ocorrência em cache na segunda vez), uma como prioridade **Highest**
e outra como prioridade **Lowest**, já que a pré-busca inicia uma busca
separada:

<figure>
  <div class="aspect-ratio"
       style="width: 1374px; --aspect-ratio-w: 1374; --aspect-ratio-h: 190">
    <img src="images/res-prio-prefetch.png"
         alt="Captura de tela das Ferramentas para Desenvolvedores do Chrome mostrando o optional.css sendo
              buscado duas vezes">
  </div>
</figure>

A busca dupla pode ser ruim para os usuários. Nesse caso, eles não só teriam que
esperar pelo CSS bloqueador de renderização, mas também teriam potencialmente
sua largura de banda desperdiçada pelo download duplo do arquivo. Lembre-se que a largura de banda dos usuários
pode ser tarifada. Analise suas solicitações de rede
minunciosamente e esteja atento a qualquer busca duplicada.

## Outras técnicas e ferramentas

O `<link rel="preload">`, a `<link rel="preconnect">`, e a `<link rel="prefetch">`
(assim como o bônus, `<link rel="dns-prefetch">`) são uma
excelente maneira de informar ao navegador, de forma declarativa, sobre recursos e
conexões antecipadamente, além de realizar ajustes quando algo acontece, conforme
necessário.

Há várias outras ferramentas e técnicas que você pode usar para ajustar a prioridade
e o controle do tempo de carregamento dos seus recursos. Leia
[push do servidor HTTP/2](/web/fundamentals/performance/http2/#server_push),
[como usar `IntersectionObserver` para fazer o carregamento lento de imagens e outras mídias](/web/updates/2016/04/intersectionobserver),
[evitar o bloqueador de renderização do CSS](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
com solicitações de mídia e bibliotecas como a
[loadCSS](https://github.com/filamentgroup/loadCSS){: .external}
e atraso de busca do JavaScript, compilar e executar com
[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
e
[adiar](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
