---
title: "Crie seu conteúdo e uma estrutura"
description: "O conteúdo é o elemento mais importante de qualquer site. Neste guia, mostraremos como elaborar rapidamente um plano para você desenvolver seu primeiro site para múltiplos dispositivos."
notes:
  styling:
    - Estilo virá mais tarde 
updated_on: 2014-04-23
related-guides:
  create-amazing-forms:
    -
      title: Crie formulários incríveis
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Formulários"
        href: fundamentals/input/form/
    -
      title: Rotule e denomine corretamente as inserções de dados
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Formulários"
        href: fundamentals/input/form/
    -
      title: Selecione o melhor tipo de inserção de dados
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Formulários"
        href: fundamentals/input/form/
  video:
    -
      title: Como usar vídeos de forma eficaz
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
    -
      title: Altere a posição inicial
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
    -
      title: Inclua uma imagem em formato pôster
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Vídeo"
        href: fundamentals/media/
  images:
    -
      title: Como usar imagens de forma eficaz
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Imagens"
        href: fundamentals/media/
    -
      title: Uso correto de imagens em marcações
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Imagens"
        href: fundamentals/media/
    -
      title: Otimização de imagens
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Imagens"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - "Primeiramente, identifique o conteúdo de que você precisa."
    - "Faça um esboço da arquitetura de informações para janelas de visualização largas e estreitas."
    - "Crie uma visualização básica da página que inclua o conteúdo sem detalhes de estilo."
---

<p class="intro">
  O conteúdo é o elemento mais importante de qualquer site. Então vamos criar um design a partir do conteúdo, evitando que o conteúdo seja limitado pelo design. Neste guia, identificaremos o conteúdo necessário, criaremos uma estrutura de páginas a partir desse conteúdo e apresentaremos a página em um layout simples e linear que funciona de maneira eficaz em janelas de visualização de tamanhos variados.
</p>

{% include shared/toc.liquid %}

## Crie a estrutura da página

Identificamos o que é necessário:

1.  Uma área que descreva em alto nível nosso produto, o curso `CS256: desenvolvimento da Web para dispositivos móveis`
2.  Um formulário para coletar informações dos usuários que estão interessados no nosso produto
3.  Uma descrição detalhada e um vídeo
4. Imagens do produto em ação
5. Uma tabela de dados com informações que comprovem o que foi dito

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

Também criamos uma arquitetura básica de informações e um layout para janelas de visualização largas e estreitas.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Janela estreita IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Janela larga IA">
</div>

Isso pode ser facilmente convertido nas seções básicas da estrutura de uma página que usaremos em todo este projeto.

{% include_code src=_code/addstructure.html snippet=structure %}

## Adicione conteúdo à página

A estrutura básica do site está completa. Sabemos quais seções são necessárias, o conteúdo que será exibido nessas seções e onde ele deve ser posicionado na arquitetura geral de informações. Agora podemos desenvolver nosso site.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Crie o título e o formulário

O título e o formulário de notificação de solicitação são os componentes fundamentais da nossa página. Eles devem ser apresentados imediatamente ao usuário.

No título, adicione texto simples para descrever o curso:

{% include_code src=_code/addheadline.html snippet=headline %}

Também é necessário preencher o formulário.
O formulário é simplificado e será usado para coletar o nome e o número de telefone dos usuários, além de uma indicação de horário para que possamos entrar em contato com eles.

Todos os formulários devem ter rótulos e marcadores de posição para que os usuários possam identificar facilmente os elementos, entender quais informações serão inseridas em cada campo e também ajudar as ferramentas de acessibilidade a compreender a estrutura do formulário.  O atributo de nome não apenas envia os dados do formulário ao servidor, mas também é usado para fornecer dicas importantes ao navegador sobre como preencher automaticamente o formulário para o usuário.

Adicionaremos tipos de semântica para agilizar e simplificar a inserção de dados pelos usuários em dispositivos móveis.  Por exemplo, ao inserir o número de telefone, o usuário verá apenas o teclado numérico.

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Crie a seção `Vídeo e informações`

A seção `Vídeo e informações` incluirá um conteúdo mais detalhado.
Ela oferecerá uma lista de recursos do nosso produto e um marcador de posição de vídeo que mostra aos usuários a utilização do produto.

{% include_code src=_code/addcontent.html snippet=section1 %}

Os vídeos são muito usados para descrever conteúdo de forma mais interativa e também para demonstrar um produto ou conceito.

Ao seguir as práticas recomendadas, você conseguirá integrar vídeos ao seu site de forma facilitada:

* Adicione um atributo `controles` para facilitar a reprodução do vídeo.
* Adicione uma imagem em formato pôster para oferecer uma visualização do conteúdo.
* Adicione diversos elementos `<source>` com base nos formatos de vídeo compatíveis.
* Adicione um texto substituto para permitir que os visitantes façam o download do vídeo se não conseguirem visualizá-lo na janela.

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Crie a seção `Imagens`

Os sites sem imagem geralmente são mais entediantes. Existem dois tipos de imagens:

*  Imagens de conteúdo &mdash; são adicionadas de forma in-line ao documento e usadas para fornecer informações adicionais sobre o conteúdo.
*  Imagens de estilo &mdash; em sua maioria, são posicionadas em segundo plano, com padrões e gradientes, e usadas para deixar o site mais atraente.  Essas imagens serão abordadas no [próximo artigo]({{page.nextPage.relative_url}}).

A seção `Imagens` da nossa página é um conjunto de imagens de conteúdo.

As imagens de conteúdo são importantes para transmitir o significado da página. Pense nelas como as imagens usadas em artigos de jornais. As imagens usadas são fotos dos tutores do projeto: Chris Wilson, Peter Lubbers e Sean Bennet.

{% include_code src=_code/addimages.html snippet=images lang=html %}

As imagens são dimensionadas em 100% da largura da tela. Essa formatação funciona com eficiência em dispositivos com tela estreita e não apresenta a mesma eficácia em janelas de visualização largas (como computadores).  Essa questão será abordada na seção de design ágil.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Muitas pessoas não conseguem visualizar as imagens e precisam fazer uso de tecnologias de assistência, como leitores de tela, que analisam os dados na página e transmitem verbalmente essas informações ao usuário.  É preciso incluir uma tag `alt` de descrição das imagens de conteúdo que possa ser informada pelo leitor de tela ao usuário.

Quando adicionar tags `alt`, procure manter o texto alternativo o mais breve possível ao descrever a imagem por completo.  Por exemplo, em nossa demonstração, esse atributo foi formatado para `Nome: função`. Assim, fornecemos informações suficientes para que o usuário entenda que a seção aborda os criadores e as funções deles.

### Adicione a seção de dados tabulados

A última seção é uma tabela simples que usamos para mostrar dados estatísticos específicos sobre o produto.

As tabelas devem ser usadas unicamente para apresentar dados, por exemplo, em matrizes de informações.

{% include_code src=_code/addcontent.html snippet=section3 %}

### Adicione um rodapé

A maioria dos sites precisa de um rodapé para exibir informações como Termos e Condições, isenções de responsabilidade e outros tipos de conteúdo que não precisam ser exibidos na área principal de navegação nem junto ao conteúdo principal da página.

Em nosso site, incluiremos links para os Termos e Condições, uma página com informações de contato e nossos perfis nas mídias sociais.

{% include_code src=_code/addcontent.html snippet=footer %}

## Índice

Criamos o esboço do site e identificamos todos os principais elementos estruturais.  Também verificamos se todo o conteúdo relevante está pronto e adequado para atender às nossas necessidades comerciais.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Você perceberá que a página ainda não está visualmente agradável, mas isso é algo intencional. 
O conteúdo é o aspecto mais importante de qualquer site, e precisamos garantir que a densidade e a arquitetura de informações estejam solidificadas. Este guia nos forneceu uma excelente base a partir da qual poderemos evoluir. No próximo guia, adicionaremos elementos de estilo ao conteúdo.



