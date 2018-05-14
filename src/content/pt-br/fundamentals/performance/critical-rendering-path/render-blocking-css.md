project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Por padrão, o CSS é tratado como um recurso bloqueador da renderização. Saiba como impedi-lo de bloquear a renderização.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# CSS bloqueador de renderização {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Por padrão, o CSS é tratado como um recurso bloqueador de renderização, o que significa que o
navegador não renderiza nenhum conteúdo processado até que o CSSOM seja
construído. Certifique-se de manter o seu CSS enxuto, entregá-lo o mais
rápido possível e usar tipos e consultas de mídia para desbloquear a renderização.

Na [construção da árvore de renderização](render-tree-construction), vimos que o caminho crítico de renderização exige que o DOM e o CSSOM construam a árvore de renderização. Isso gera impacto importante no desempenho: **tanto o HTML quanto o CSS são recursos bloqueadores de renderização.** Isso é óbvio para o HTML, pois sem o DOM, não temos nada para renderizar. Mas o requisito do CSS pode ser menos evidente. O que acontece se tentarmos renderizar uma página normal sem que o CSS bloqueie a renderização?

### TL;DR {: .hide-from-toc }
- Por padrão, o CSS é tratado como um recurso bloqueador de renderização.
- Os tipos e consultas de mídia nos permitem marcar alguns recursos CSS como não bloqueadores de renderização.
- O navegador baixa todos os recursos CSS, independentemente do comportamento de bloqueio.


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="NYTimes com CSS">
    <figcaption>O New York Times com CSS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes sem CSS">
    <figcaption>O New York Times sem CSS (FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

O exemplo acima, que mostra o site do NYTimes com e sem CSS, demonstra por que a renderização é bloqueada até o CSS estar disponível---sem CSS, a página fica relativamente inutilizável. A experiência à direita muitas vezes é chamada de um "instante de conteúdo não estilizado" (FOUC). O navegador bloqueia a renderização até que tenha tanto o DOM quanto o CSSOM.

> **_CSS é um recurso bloqueador de renderização. Leve-o ao cliente o quanto antes para otimizar o tempo da primeira renderização._**

Porém, e se temos alguns estilos CSS que são usados somente em determinadas circunstâncias, por exemplo, quando a página está sendo exibida ou projetada em um monitor maior? Seria ótimo se pudéssemos não bloquear a renderização nesses recursos.

Os "tipos de mídia" e as "consultas de mídia" do CSS nos permitem apresentar soluções a estes casos de uso:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Uma [consulta de mídia](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness) consiste em um tipo de mídia e zero ou mais expressões que verificam as condições de determinados recursos de mídia. Por exemplo, a primeira declaração da nossa folha de estilos não fornece um tipo ou consulta de mídia, por isso, se aplica a todos os casos, o que, em outras palavras, significa que sempre haverá bloqueio de renderização. Por outro lado, a segunda declaração da folha de estilos aplica-se somente quando o conteúdo está sendo gravado---talvez você queira reorganizar o layout, alterar as fontes e fazer outras coisas e, por isso, essa declaração da folha de estilo não precisa bloquear a renderização da página quando ela for carregada pela primeira vez. Finalmente, a última declaração da folha de estilo traz uma "consulta de mídia", que é executada pelo navegador. Se as condições forem atendidas, o navegador bloqueará a renderização até que a folha de estilo seja baixada e processada.

Usando consultas de mídia, podemos adaptar a apresentação a casos de uso específicos, como exibição ou impressão, bem como para condições dinâmicas, como alterações na orientação da tela e eventos de redimensionamento, entre outros. **Ao declarar os ativos da sua folha de estilo, preste muita atenção aos tipos e consultas de mídia: eles geram impacto muito grande no desempenho do caminho crítico de renderização.**

Vamos considerar alguns exemplos práticos:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* A primeira declaração bloqueia a renderização e atende a todas as condições.
* A segunda declaração também bloqueia a renderização. O tipo padrão é "all". Se você não especificar nenhum tipo, ele será definido implicitamente como "all". Portanto, a primeira e segunda declarações são, na verdade, equivalentes.
* A terceira declaração tem uma consulta de mídia dinâmica que é avaliada durante o carregamento da página. Dependendo da orientação do dispositivo durante o carregamento da página, portrait.css pode bloquear a renderização ou não.
* A última declaração só é aplicada quando a página está sendo gravada. Portanto, não bloqueia a renderização na primeira carga da página no navegador.

Por fim, observe que "bloqueador de renderização" indica apenas se o navegador tem que suspender a renderização inicial da página durante a execução desse recurso. Em todo caso, o navegador ainda baixa o ativo CSS, embora com menor prioridade para os recursos não bloqueadores.

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>A seguir: Agregar interatividade com JavaScript</button>
</a>


{# wf_devsite_translation #}
