project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A tipografia é fundamental para proporcionar design, uso de marca, legibilidade e acessibilidade de boa qualidade. Além de oferecer tudo isso, as webfonts permitem selecionar, pesquisar, alterar o zoom e facilitar o uso de alto DPI em textos, proporcionando uma renderização de texto consistente e nítida, independentemente do tamanho e da resolução da tela.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-09-19 #}
{# wf_blink_components: Blink>CSS #}

# Otimização de webfonts {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

A tipografia é fundamental para proporcionar design, uso de marca, legibilidade e acessibilidade de boa qualidade. Além de oferecer
tudo isso, as webfonts permitem selecionar, pesquisar, alterar o zoom e facilitar o uso de alto DPI em textos,
proporcionando uma renderização de texto consistente e nítida, independentemente do tamanho e da resolução da tela. As webfonts
são essenciais para oferecer design, experiência de usuário (UX) e desempenho de qualidade.

A otimização de webfonts é um fator crítico da estratégia geral de desempenho. Cada fonte é um
recurso adicional, e algumas fontes podem bloquear a renderização do texto. No entanto, o
uso de webfonts na página não significa que sua renderização será necessariamente mais lenta. Pelo contrário, fontes otimizadas, combinadas
com uma estratégia sensata para a forma como elas são carregadas e aplicadas na página, podem ajudar a reduzir o
tamanho total e o tempo de renderização.


## Anatomia de uma webfont

### TL;DR {: .hide-from-toc }
* As fontes Unicode podem conter milhares de glifos.
* Há quatro formatos de fonte: WOFF2, WOFF, EOT e TTF.
* Alguns formatos de fonte exigem o uso de compressão.


Uma *webfont* é uma coleção de glifos. Cada glifo é uma forma vetorial que descreve uma letra ou
símbolo. Como resultado, duas variáveis simples determinam o tamanho de um arquivo de fonte específico: a
complexidade dos caminhos vetoriais de cada glifo e o número de glifos em cada fonte. A Open Sans, por
exemplo, é uma das webfonts mais comuns e contém 897 glifos que incluem caracteres
latinos, gregos e cirílicos.

<img src="images/glyphs.png"  alt="Tabela de glifos da fonte">

Ao escolher uma fonte, é importante considerar quais conjuntos de caracteres serão permitidos. Se você precisar
localizar o conteúdo da página para vários idiomas, deverá usar uma fonte que possa oferecer aparência e experiência
consistentes aos usuários. Por exemplo, [a família
de fontes Noto do Google](https://www.google.com/get/noto/){: .external } pretende ser compatível com todos os idiomas do mundo.
Observe, contudo, que o tamanho total do Noto, com todos os idiomas incluídos, resulta em um
download de ZIP com mais de 1,1 GB.

Obviamente, usar fontes na Web requer engenharia cautelosa para garantir que a tipografia não
atrapalhe o desempenho. Felizmente, a plataforma da Web oferece todos os componentes básicos. O restante
deste guia fornece uma forma prática de conseguir o melhor dos dois mundos.

### Formatos de webfonts

Existem atualmente quatro formatos de contêiner de fontes em uso na Web:
[EOT](https://en.wikipedia.org/wiki/Embedded_OpenType),
[TTF](https://en.wikipedia.org/wiki/TrueType),
[WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format) e
[WOFF2](https://www.w3.org/TR/WOFF2/){: .external }. Apesar da grande variedade de
opções, não há um único formato universal que funcione em todos os navegadores atuais e antigos: o EOT é
[compatível somente com o IE](http://caniuse.com/#feat=eot), o TTF é [parcialmente
compatível com o IE](http://caniuse.com/#search=ttf), o WOFF oferece a compatibilidade mais ampla, mas [não está disponível
em alguns navegadores antigos](http://caniuse.com/#feat=woff) e a compatibilidade com o WOFF 2.0 [ainda está sendo desenvolvida em
muitos navegadores](http://caniuse.com/#feat=woff2).

Então, como ficamos? Não há um único formato que funcione em todos os navegadores, o que significa
que temos de fornecer vários formatos para oferecer uma experiência consistente:

* Disponibilize a variante WOFF 2.0 para os navegadores compatíveis.
* Disponibilize a variante WOFF para a maioria dos navegadores.
* Disponibilize a variante TTF para navegadores Android antigos (anteriores à versão 4.4).
* Disponibilize a variante EOT para navegadores IE antigos (anteriores à versão IE9).

Note: tecnicamente, há outro formato de contêiner, o <a href='http://caniuse.com/svg-fonts'>contêiner de fonte
SVG</a>, mas o IE e o Firefox nunca ofereceram suporte e agora ele está obsoleto no Chrome. Deste
modo, ele tem uso limitado e é intencionalmente omitido neste guia.

### Reduzir o tamanho da fonte com compressão

Uma fonte é uma coleção de glifos, e cada glifo é um conjunto de caminhos que descreve a forma da letra. Os
glifos individuais são diferentes, mas contêm muitas informações semelhantes que podem ser
comprimidas com GZIP ou um compressor compatível:

* Os formatos EOT e TTF não são comprimidos por padrão. Verifique se os servidores estão configurados para
aplicar [compressão GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)
ao fornecer esses formatos.
* O WOFF tem compressão incorporada. Verifique se o compressor de WOFF está usando as configurações de compressão
ideais.
* O WOFF2 usa algoritmos personalizados de pré-processamento e compressão para oferecer uma redução de tamanho de arquivo cerca de 30% maior
que os outros formatos. Para maiores informações, consulte
[o relatório de avaliação de WOFF 2.0](http://www.w3.org/TR/WOFF20ER/){: .external }.

Por fim, é bom saber que alguns formatos de fonte contêm metadados adicionais, como informações de
[hinting](https://en.wikipedia.org/wiki/Font_hinting) e
[kerning](https://en.wikipedia.org/wiki/Kerning) de fontes, que podem ser desnecessárias em algumas
plataformas, o que permite otimizar ainda mais o tamanho do arquivo. Consulte as opções de otimização
disponíveis em seu compressor de fontes. Se você escolher essa opção, verifique se tem a
infraestrutura adequada para testar e fornecer essas fontes otimizadas para cada navegador. Por exemplo, o [Google
Fonts](https://fonts.google.com/) mantém mais de 30 variantes otimizadas para cada fonte e
detecta e fornece automaticamente a variante ideal para cada plataforma e navegador.

Note: considere o uso da <a href='http://en.wikipedia.org/wiki/Zopfli'>compressão Zopfli</a> para os formatos
EOT, TTF e WOFF. O Zopfli é um compressor compatível com zlib que oferece um ganho de compressão de cerca de 5% em
relação ao gzip.

## Definir uma família de fontes com @font-face

### TL;DR {: .hide-from-toc }
* Use a dica `format()` para especificar vários formatos de fonte.
* Para fontes Unicode grandes, crie subconjuntos para melhorar o desempenho. Use a criação de subconjuntos com Unicode-range e forneça um fallback de criação
manual de subconjuntos para navegadores mais antigos.
* Reduza o número de variantes de estilos de fontes para melhorar o desempenho da página e a renderização de texto.


A at-rule CSS do `@font-face` permite definir o local de um determinado recurso de fonte, suas características de
estilo e os codepoints Unicode para os quais deve ser usado. Uma combinação dessas declarações
`@font-face pode ser usada para construir uma "família de fontes", usada pelo navegador para
avaliar quais recursos de fonte devem ser baixados e aplicados à página atual.

### Seleção de formatos

Cada declaração `@font-face` especifica o nome da família de fontes, que atua como um grupo lógico de
várias declarações, [properties de fonte](http://www.w3.org/TR/css3-fonts/#font-prop-desc) como
estilo, peso e extensão, bem como o [descritor src](http://www.w3.org/TR/css3-fonts/#src-desc),
que especifica uma lista priorizada de locais do recurso de fonte.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'),
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'),
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


Antes de mais nada, observe que os exemplos acima definem uma única família, _Awesome Font_, com dois estilos (normal
e _itálico_), cada um deles apontando para um conjunto diferente de recursos de fonte. Por sua vez, cada descritor `src`
contém uma lista priorizada de variantes do recurso, separadas por vírgula:

* A diretiva `local()` permite referenciar, carregar e usar fontes instaladas localmente.
* A diretiva `url()` permite carregar fontes externas e pode conter uma dica opcional
`format()`, indicando o formato da fonte referenciada pelo URL especificado.


Note: a menos que você referencie uma das fontes de sistema padrão, é raro que o usuário tenha essa fonte
instalada localmente, particularmente em dispositivos móveis, em que na verdade é impossível "instalar"
fontes adicionais. Por via das dúvidas, você deve sempre começar com uma entrada `local()`, para então fornecer uma
lista de entradas `url()` .

Quando o navegador determina que a fonte é necessária, percorre a lista de recursos
fornecida na ordem especificada e tenta carregar o recurso apropriado. Por exemplo, seguindo o
exemplo acima:

1. O navegador executa o layout da página e determina quais variantes de fontes são necessárias para renderizar o
texto especificado na página.
1. Para cada fonte necessária, o navegador verifica se a fonte está disponível localmente.
1. Se a fonte não está disponível localmente, o navegador percorre as definições externas:
    * Se uma dica de formato estiver presente, o navegador verificará se ela é permitida antes de iniciar o
      download. Se não oferecer suporte para a dica, o navegador avança para a próxima.
    * Se nenhuma dica de formato estiver presente, o navegador fará o download do recurso.

A combinação de diretivas locais e externas com dicas de formato adequadas permite especificar
todos os formatos de fonte disponíveis e deixar que o navegador se encarregue do resto. O navegador determina quais
recursos são necessários e seleciona o formato ideal.

Note: a ordem de especificação das variantes das fontes é importante. O navegador escolhe o primeiro
formato compatível. Portanto, se você quiser que os navegadores mais recentes usem WOFF2, coloque a
declaração do WOFF2 acima do WOFF e assim por diante.

### Criar subconjuntos com unicode-range

Além das properties de fonte como estilo, peso e extensão, a regra
`@font-face` permite definir um conjunto de codepoints Unicode compatível com
cada recurso. Isso nos permite dividir uma fonte Unicode grande em subconjuntos
menores (por exemplo, subconjuntos latino, cirílico e grego) e fazer o download apenas dos glifos necessários para
renderizar o texto em uma determinada página.

O [descritor unicode-range](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) permite
especificar uma lista delimitada por vírgulas contendo valores de intervalos. Cada intervalo pode ter um destes três formatos
diferentes:

* Codepoint único (por exemplo, `U+416`)
* Intervalo (por exemplo, `U+400-4ff`): indica os codepoints inicial e final de um intervalo
* Intervalo de caracteres curinga (por exemplo, `U+4??`): `?` indicam qualquer dígito hexadecimal

Por exemplo, você pode dividir sua família _Awesome Font_ nos subconjuntos
latino e japonês, que serão baixados individualmente pelo navegador conforme a necessidade:


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'),
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }


Note: a criação de subconjuntos com unicode-range é particularmente importante para idiomas asiáticos, onde o número de
glifos é muito maior que nos idiomas ocidentais e uma fonte "completa" normalmente é medida em
megabytes em vez de dezenas de kilobytes.

O uso de subconjuntos de intervalos Unicode e de arquivos separados para cada variante de estilo da fonte permite
definir uma família de fontes composta com download mais rápido e eficiente. Os visitantes fazem o download
apenas das variantes e dos subconjuntos necessários e não são forçados a fazer o download de subconjuntos que
nunca serão vistos ou usados na página.

No entanto, há um pequeno problema no unicode-range: [nem todos os
navegadores são compatíveis](http://caniuse.com/#feat=font-unicode-range) ainda. Alguns navegadores
simplesmente ignoram a dica unicode-range e fazem o download de todas as variantes.
Outros sequer processam a declaração `@font-face`. Para resolver isso, precisamos de um fallback de
"criação manual de subconjuntos" para navegadores mais antigos.

Como os navegadores antigos não têm inteligência suficiente para selecionar apenas os subconjuntos necessários e não podem construir
uma fonte composta, é preciso um fallback para fornecer um único recurso de fonte que contenha todos os subconjuntos
necessários e ocultar os demais do navegador. Por exemplo, se a página usar apenas
caracteres latinos, pode-se eliminar outros glifos e disponibilizar esse subconjunto específico como um recurso
independente.

1. **Como determinar os subconjuntos necessários?**
    * Se o navegador for compatível com a criação de subconjuntos com unicode-range, o subconjunto correto será selecionado
      automaticamente. A página precisa apenas fornecer os arquivos de subconjuntos e especificar unicode-ranges
      adequados nas regras de `@font-face`.
    * If the browser doesn't support unicode-range subsetting, then the page needs to hide all
      unnecessary subsets; that is, the developer must specify the required subsets.
1. **Como gerar subconjuntos de fontes?**
    - Use a [ferramenta de código aberto pyftsubset](https://github.com/behdad/fonttools/){: .external } para
    criar subconjuntos e otimizar suas fontes.
    - Alguns serviços de fontes permitem a criação manual de subconjuntos por meio de parâmetros de consulta personalizada, que podem ser usados para especificar
    manualmente o subconjunto necessário para a página. Consulte a documentação do provedor
    de fontes.


### Seleção e sintetização de fontes

Cada família de fontes é composta de diversas variantes de estilo (regular, negrito, itálico) e diversos
pesos para cada estilo. Por sua vez, cada um deles pode conter formas de glifos muito diferentes&mdash;por
exemplo, espaçamento ou tamanho diferentes ou uma forma totalmente distinta.

<img src="images/font-weights.png"  alt="Pesos da fonte">

Por exemplo, o diagrama acima ilustra uma família de fontes que oferece três
pesos de negrito diferentes: 400 (regular), 700 (negrito) e 900 (negrito extra). Todas as
outras variantes intermediárias (indicadas em cinza) são mapeadas automaticamente para a
variante mais próxima pelo navegador.



> Quando um peso especificado não tem um tipo de fonte correspondente, é usado um tipo de fonte com peso próximo. Geralmente,
pesos de negrito são mapeados a tipos de fonte com pesos maiores e pesos leves são mapeados a tipos de fonte com pesos
menores.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritmo de correspondência de
fontes CSS3</a>



Uma lógica similar é aplicada às variantes _itálicas_. O designer de fontes controla quais
variantes serão produzidas, e você controla quais variantes usará na
página. Como cada variante é um download separado, é uma boa ideia ter poucas
variantes. Por exemplo, você pode definir duas variantes em negrito para sua
família _Awesome Font_:


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'),
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }


O exemplo acima declara a família _Awesome Font_, que é composta por dois recursos que abrangem
o mesmo conjunto de glifos latinos (`U+000-5FF`), mas oferecem dois "pesos" diferentes: normal (400) e negrito
(700). No entanto, o que acontecerá se uma de suas regras CSS especificar um peso de fonte diferente ou definir a property
font-style como itálico?

- Se uma correspondência exata de fonte não estiver disponível, o navegador substitui a correspondência mais próxima.
- Se nenhuma correspondência de estilo for encontrada (por exemplo, nenhuma variante em itálico foi declarada no exemplo
acima), o navegador sintetizará sua própria variante de fonte.

<img src="images/font-synthesis.png"  alt="Sintetização de fonte">


Warning: os autores também devem estar cientes de que abordagens sintetizadas podem não ser adequadas para sistemas de escrita
como o cirílico, em que o itálico tem formas muito diferentes. Para uma fidelidade adequada nesses sistemas de escrita,
use uma fonte itálica real.

O exemplo acima ilustra a diferença entre a fonte Open Sans real e a
sintetizada. Todas as variantes sintetizadas foram geradas de uma única fonte com peso 400. Como você pode ver,
há uma diferença visível nos resultados. Os detalhes de como gerar as
variantes de negrito e oblíquo não são especificados. Portanto, os resultados variam de navegador para navegador e
dependem muito da fonte.

Note: para melhor consistência e resultados visuais mais adequados, não sintetize fontes. Em vez disso, minimize o
número de variantes de fontes usadas e especifique seus locais para que o navegador possa fazer o download
quando forem usadas na página. Por outro lado, em alguns casos uma variante sintetizada <a
href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>pode ser uma
opção viável</a>, mas seja cauteloso ao usar variantes sintetizadas.

## Otimizar o carregamento e a renderização

### TL;DR {: .hide-from-toc }
* Por padrão, as solicitações de fonte são postergadas até que a árvore de renderização seja construída,
o que pode resultar em atraso na renderização de texto.
* O `<link rel="preload">`, a property CSS `font-display` e a Font Loading API
fornecem os ganchos necessários para implementar a estratégia de carregamento e renderização de fontes personalizadas
, neutralizando o comportamento padrão.


Uma webfont "completa", incluindo todas as variantes de estilo (que podem ser desnecessárias) e todos os glifos
(que podem não ser usados) pode resultar facilmente em um download de vários megabytes. Para resolver isso, a regra CSS
`@font-face` foi criada especificamente para permitir a divisão da família de fontes em uma
coleção de recursos: subconjuntos Unicode, variantes de estilo distintas e assim por diante.

Com essas declarações, o navegador identifica os subconjuntos e variantes úteis e faz o download do
conjunto mínimo necessário para renderizar o texto, o que é muito conveniente. No entanto, se você não for
cauteloso, pode também criar um gargalo de desempenho no caminho crítico de renderização e atrasar a
renderização de texto.

### O comportamento padrão

O carregamento lento de fontes traz uma importante implicação oculta que pode atrasar a renderização de texto. O
navegador deve [construir a árvore de
renderização](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), que é
dependente das árvores do DOM e do CSSOM, antes de saber quais recursos de fonte serão necessários
para renderizar o texto. Como resultado, as solicitações de fontes são atrasadas para bem depois de outros recursos essenciais e o
navegador pode ser impedido de renderizar o texto até que o recurso seja recuperado.

<img src="images/font-crp.png"  alt="Caminho crítico de renderização da fonte">

1. O navegador solicita o documento HTML.
1. O navegador começa a analisar a resposta HTML e a construir o DOM.
1. O navegador descobre o CSS, o JS e outros recursos e envia solicitações.
1. Depois de receber todo o conteúdo CSS, o navegador constrói o CSSOM e o combina com a árvore
do DOM para construir a árvore de renderização.
    - As solicitações de fonte são enviadas após a árvore de renderização indicar quais variantes da fonte são necessárias para
    renderizar o texto especificado na página.
1. O navegador executa o layout e exibe o conteúdo na tela.
    - Se a fonte ainda não estiver disponível, o navegador pode não renderizar nenhum pixel de texto.
    - Depois que a fonte está disponível, o navegador exibe os pixels de texto.

A "corrida" entre a primeira exibição do conteúdo da página, que pode ser feita logo
após a criação da árvore de renderização, e a solicitação dos recursos de fonte é a responsável
pelo "problema do texto em branco", fazendo com que o navegador renderize o layout da página
omitindo todo o texto.

A próxima seção descreve várias opções para personalização desse comportamento padrão.

### Pré-carregar seus recursos de webfont

Se há alta probabilidade de que sua página precisará de uma webfont específica hospedada
em um URL que você já conheça, você pode aproveitar um novo recurso da plataforma
da Web: [`<link rel="preload">`](/web/fundamentals/performance/resource-prioritization).

Ele permite que você inclua um elemento no HTML, normalmente como parte do
`<head>`, que ativará uma solicitação para a webfont logo no início do caminho
crítico de renderização, sem ter que esperar que o CSSOM seja criado.

O `<link rel="preload">` disponibiliza uma "dica" ao navegador, informando que certo recurso
será necessário em breve, mas sem dizer ao navegador *como* usá-lo.
Você precisa usar o pré-carregamento em conjunto com uma definição CSS `@font-face`
apropriada para instruir o navegador sobre o que fazer com determinado URL de webfont.

```html
<head>
  <!-- Other tags... -->
  <link rel="preload" href="/fonts/awesome-l.woff2" as="font">
</head>
```

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

Nem todos os navegadores [são compatíveis com o `<link rel="preload">`](https://caniuse.com/#feat=link-rel-preload).
Nesses casos, o `<link rel="preload">` será simplesmente ignorado. Mas todos os
navegadores compatíveis com pré-carregamento também são compatíveis com WOFF2, então é nesse
formato que você deve fazer o pré-carregamento.

Atenção: usar o `<link rel="preload">` fará uma solicitação
incondicional e de alta prioridade para o URL da webfont, independentemente de ela ser
necessária na página. Se houver uma chance razoável de que a cópia remota da
webfont não será necessária (por exemplo, porque a definição `@font-face` inclui
uma entrada `local()` para uma fonte comum, como a Roboto), então o uso do
`<link rel="preload">` resultará em uma solicitação desperdiçada. Alguns navegadores exibirão
uma aviso no Console de Ferramentas para Desenvolvedores quando um recurso for pré-carregado
mas não efetivamente usado.

### Personalizar o atraso na renderização de texto

Embora o pré-carregamento torne mais provável que uma webfont esteja disponível quando o
conteúdo da página for renderizado, ele não oferece garantias. Você ainda precisa considerar
como os navegadores se comportam ao renderizar textos que usam uma `font-family` que ainda não
está disponível.

#### Comportamentos dos navegadores

A "corrida" entre a primeira exibição do conteúdo da página, que pode ser feita logo
após a criação da árvore de renderização, e a solicitação dos recursos de fonte é a responsável
pelo "problema do texto em branco", fazendo com que o navegador renderize o layout da página
omitindo todo o texto. A maioria dos navegadores implementam um tempo limite máximo para esperar
pelo download de uma webfont. Após esse limite, um fallback será usado. Os
navegadores diferem na implementação:

<table>
  <thead>
    <tr>
      <th data-th="Browser">Navegador</th>
      <th data-th="Timeout">Tempo limite</th>
      <th data-th="Fallback">Fallback</th>
      <th data-th="Swap">Troca</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser">
        <strong>Chrome 35+</strong>
      </td>
      <td data-th="Timeout">
        Três segundos
      </td>
      <td data-th="Fallback">
        Sim
      </td>
      <td data-th="Swap">
        Sim
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Opera</strong>
      </td>
      <td data-th="Timeout">
        Três segundos
      </td>
      <td data-th="Fallback">
        Sim
      </td>
      <td data-th="Swap">
        Sim
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Firefox</strong>
      </td>
      <td data-th="Timeout">
        Três segundos
      </td>
      <td data-th="Fallback">
        Sim
      </td>
      <td data-th="Swap">
        Sim
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Internet Explorer</strong>
      </td>
      <td data-th="Timeout">
        Zero segundo
      </td>
      <td data-th="Fallback">
        Sim
      </td>
      <td data-th="Swap">
        Sim
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Safari</strong>
      </td>
      <td data-th="Timeout">
        Sem tempo limite
      </td>
      <td data-th="Fallback">
        N/A
      </td>
      <td data-th="Swap">
        N/A
      </td>
    </tr>
  </tbody>
</table>

- O Chrome e o Firefox têm um tempo limite de três segundos. Depois dele, o texto é exibido
com a fonte de fallback. Se a fonte conseguir fazer o download,
ocorrerá uma troca e o texto será renderizado com a fonte pretendida.
- O Internet Explorer tem um tempo limite de zero segundo, o que resulta numa renderização de texto
imediata. Se a fonte solicitada ainda não estiver disponível, um fallback é usado e o
texto é renderizado novamente depois, quando ela estiver acessível.
- O Safari não tem comportamento de tempo limite (ou, ao menos, nada além de um tempo limite de rede
padrão).

Para garantir consistência no futuro, o CSS Working Group propôs um novo
descritor`@font-face`,
[`font-display`](https://drafts.csswg.org/css-fonts-4/#font-display-desc) e uma
property correspondente para controlar como uma fonte para download é renderizada antes de ser
carregada.

#### O tempo limite para exibição da fonte

Semelhante aos comportamentos existentes de tempo limite de fonte que alguns navegadores implementam
hoje, o `font-display` segmenta o tempo de vida de uma fonte em três períodos
principais:

1. O primeiro é o **período de bloqueio da fonte**. Durante esse período, se o
tipo de fonte não é carregado, qualquer elemento que tentar usá-lo deverá renderizar
com um tipo de fonte de fallback invisível. Se o tipo de fonte for carregado com sucesso durante
o período de bloqueio, ele será usado normalmente.
2. O **período de troca da fonte** ocorre imediatamente após o período de bloqueio da fonte. Durante
esse período, se o tipo de fonte não é carregado, qualquer elemento que tentar usá-lo
deverá renderizar com um tipo de fonte de fallback invisível. Se o tipo de fonte for carregado com sucesso
durante o período de troca, ele será usado normalmente.
3. O **período de falha da fonte** ocorre imediatamente após o
período de troca da fonte. Se o tipo de fonte ainda não estiver carregado quando esse período começar,
ele será marcado como uma falha de carregamento, o que causa o uso normal de fonte de fallback. Caso contrário, o tipo de
fonte será usado normalmente.

Entender esses períodos significa que você pode usar o `font-display` para decidir como sua
fonte deve ser renderizada, dependendo do sucesso e do momento do download da fonte.

#### Como usar o font-display

Para trabalhar com a property `font-display`, adicione-a às suas regras `@font-face`:

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  font-display: auto; /* or block, swap, fallback, optional */
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

O `font-display` é compatível atualmente com o seguinte intervalo de valores:
`auto | block | swap | fallback | optional`.

- O **`auto`** usa qualquer estratégia de exibição de fonte usada pelo user agent. A maioria dos navegadores
atualmente têm uma estratégia padrão similar ao `block`.

- O **`block`** dá ao tipo de fonte um curto período de bloqueio (três segundos é o recomendado na maioria dos casos)
e um período de troca infinito. Em outras palavras, primeiro o navegador desenha um texto "invisível"
caso a fonte não tenha sido carregada, mas troca o tipo de fonte assim que ela
é carregada. Para fazer isso, o navegador cria um tipo de fonte anônimo com métricas
semelhantes às da fonte selecionada, mas com todos os glifos sem conter "tinta".
Esse valor só deve ser usado se a renderização de texto em um tipo de fonte específico
for necessária para a usabilidade da página.

- O **`swap`** dá ao tipo de fonte um período de bloqueio de zero segundo e um período de troca infinito.
Isso significa que o navegador desenha o texto imediatamente com um fallback, caso o tipo de fonte
não tenha sido carregado, mas troca o tipo de fonte assim que ele é carregado. Semelhante ao `block`,
esse valor deve ser usado apenas quando a renderização de texto em uma fonte específica for
importante para a página, mas a renderização de qualquer fonte ainda transmitirá
a mensagem correta. Textos de logotipo são bons candidatos para **troca** já que a exibição do nome
de uma empresa usando um fallback razoável transmitirá a mensagem, mas
com o possível uso da fonte oficial na sequência.

- O **`fallback`** dá ao tipo de fonte um período de bloqueio extremamente pequeno (100 ms ou menos é o
recomendado na maioria dos casos) e um curto período de troca (três segundos é o recomendado
na maioria dos casos). Em outras palavras, primeiramente o tipo de fonte é renderizado com um fallback
caso não tenha sido carregado, mas a fonte é trocada assim que ela é carregada. No entanto,
se passar muito tempo, o fallback será usado pelo restante do tempo de vida
da página. O `fallback` é um bom candidato para itens como textos que você gostaria
que o usuário começasse a ler o mais rápido possível, sem que a experiência seja perturbada
pela alteração de texto enquanto a nova fonte carrega.

- O **`optional`** dá ao tipo de fonte um período de bloqueio extremamente pequeno (100 ms ou menos é o
recomendado na maioria dos casos) e um período de troca de zero segundo. Semelhante ao `fallback`,
essa é uma boa escolha para quando o download da fonte é algo interessante,
mas não essencial para a experiência. O valor `optional` deixa ao
navegador a decisão sobre iniciar o download da fonte (o que ele pode escolher não fazer
ou aplicar baixa prioridade), dependendo do que considerar
melhor para o usuário. Isso pode ser benéfico em situações nas quais o usuário está com
conexão fraca e o download de uma fonte pode não ser o melhor uso dos recursos.

O `font-display` está [ganhando adoção](https://caniuse.com/#feat=css-font-rendering-controls)
em muitos navegadores modernos. Você pode esperar consistência no comportamento
dos navegadores com a expansão da implementação.


### A Font Loading API

Usados juntos, o `<link rel="preload">` e o CSS `font-display` proporcionam aos desenvolvedores
um ótimo controle sobre o carregamento e a renderização de fontes, sem acrescentar muita
sobrecarga. Mas se você precisa de personalizações adicionais e está disposto a lidar
com a sobrecarga introduzida pela execução do JavaScript, há outra opção.

A [Font Loading API](https://www.w3.org/TR/css-font-loading/) oferece uma interface de script para
definir e manipular tipos de fonte CSS, controlar o andamento dos downloads e modificar o comportamento padrão de
carregamento lento. Por exemplo, se não tiver certeza se uma variante de fonte específica será necessária, você pode
defini-la e solicitar que o navegador inicie uma recuperação imediata do recurso de fonte:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });

    // don't wait for the render tree, initiate an immediate fetch!
    font.load().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";

      // OR... by default the content is hidden,
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";

      // OR... apply your own render strategy here...
    });


Além disso, como você pode verificar o status da fonte (usando o método
[check()](https://www.w3.org/TR/css-font-loading/#font-face-set-check)) e acompanhar o andamento do
download, pode também definir uma estratégia personalizada para renderizar texto nas páginas:

- É possível parar toda a renderização de texto até que a fonte esteja disponível.
- É possível implementar um tempo limite personalizado para cada fonte.
- É possível usar a fonte de fallback para desbloquear a renderização e injetar um novo estilo que usará a fonte desejada
depois que ela ficar disponível.

O melhor de tudo é que você também pode combinar as estratégias acima em conteúdos diferentes da página. Por
exemplo, atrasar a renderização em algumas seções até que a fonte esteja disponível, usar uma fonte de fallback e renderizar novamente após o download da
fonte, especificar tempos limite distintos e assim por
diante.

Note: a Font Loading API ainda está <a href='http://caniuse.com/#feat=font-loading'>em
desenvolvimento em alguns navegadores</a>. Considere o uso do <a
href='https://github.com/bramstein/fontloader'polyfill FontLoader</a> ou da <a
href='https://github.com/typekit/webfontloader'biblioteca webfontloader</a> para oferecer
funcionalidade similar, embora com o custo adicional de mais uma dependência de JavaScript.

### O armazenamento em cache apropriado é obrigatório

Normalmente, os recursos de fonte são estáticos e raramente atualizados. Portanto, são
ideais para uma expiração longa de max-age. Não deixe de especificar um [cabeçalho ETag
condicional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags),
e uma [política ideal de
Cache-Control](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) para
todos os recursos de fonte.

Se seu aplicativo da Web usa um [service worker](/web/fundamentals/primers/service-workers/),
disponibilizar recursos de fonte com uma [estratégia que prioriza
o cache](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network)
é apropriado na maioria dos casos de uso.

Você não deve armazenar fontes usando o
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
ou o [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API);
cada um deles tem seus próprios problemas de desempenho. O cache HTTP do navegador
oferece o melhor e mais robusto mecanismo para fornecer recursos de fonte ao
navegador.


## Lista de verificação de otimização

Ao contrário do que muitos pensam, o uso de webfonts não precisa atrasar a renderização da página nem ter um
impacto negativo em outras métricas de desempenho. Um uso de fontes bem otimizado pode oferecer uma experiência do usuário muito
melhor: ótimo uso de marca e melhor legibilidade, usabilidade e capacidade de pesquisa, sem deixar de oferecer uma solução escalonável
para várias resoluções que se adapta bem a todos os formatos e
resoluções de tela. Não tenha receio de usar as webfonts.

Por outro lado, uma implementação simplista pode gerar downloads grandes e demoras desnecessárias. Você precisa
ajudar o navegador, otimizando os próprios recursos de fonte e a forma como são recuperados e usados nas
páginas.

- **Confira e monitore o uso de fontes:** não use fontes demais nas páginas. Para cada fonte,
minimize o número de variantes usadas. Isso ajuda a produzir uma experiência mais consistente e rápida
para seus usuários.
- **Crie um subconjunto dos recursos de fonte:** várias fontes permitem a criação de subconjuntos ou a divisão em vários intervalos unicode para
fornecer apenas os glifos necessários para uma determinada página. Isso reduz o tamanho do arquivo e aumenta a
velocidade do download do recurso. No entanto, ao definir os subconjuntos, tenha o cuidado de otimizar considerando a
reutilização de fontes. Por exemplo, não faça o download de um conjunto de caracteres separado mas contendo caracteres iguais em cada página. Uma
boa prática é criar um subconjunto de acordo com o sistema de escrita: por exemplo, latino, cirílico e assim por diante.
- **Forneça formatos de fonte otimizados para cada navegador:** cada fonte deve ser fornecida nos
formatos WOFF2, WOFF, EOT e TTF. Não deixe de aplicar a compressão GZIP aos formatos EOT e TTF porque eles não são
comprimidos por padrão.
- **Dê prioridade ao `local()` em sua lista `src`:** listar primeiramente o `local('Font Name')` na lista
`src` assegura que as solicitações HTTP não sejam feitas para fontes que já estão instaladas.
- **Personalize o carregamento e a renderização de fonte usando o `<link rel="preload">`, o `font-display`, ou a Font
Loading API:** configurar o comportamento de carregamento lento pode resultar em atraso na renderização de texto. Esses recursos de
plataformas da Web permitem modificar esse comportamento para determinadas fontes e especificar estratégias personalizadas de renderização e
tempo limite para conteúdos diferentes da página.
- **Especifique políticas de revalidação e de armazenamento em cache ideal:** as fontes são
recursos estáticos, raramente atualizados. Verifique se os servidores fornecem um carimbo de data/hora de max-age longo e um token de
revalidação para possibilitar a reutilização eficiente de fontes em páginas distintas. Ao usar um service
worker, uma estratégia que prioriza o cache é apropriada.

*Este artigo contém contribuições de [Monica Dinculescu](https://meowni.ca/posts/web-fonts/),
[Rob Dodson](/web/updates/2016/02/font-display) e Jeff Posnick.*

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
