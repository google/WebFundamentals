project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A tipografia é fundamental para um bom design, branding, legibilidade e acessibilidade. As fontes da Web possibilitam os itens acima e muito mais: o texto é selecionável, pesquisável, ampliável e de alto DPI (pontos por polegada), o que fornece consistência e textos nítidos independentemente do tamanho e da resolução da tela. As fontes da Web são vitais para um design, desempenho e experiência de usuário de qualidade.

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# Otimização de fontes da Web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



A tipografia é fundamental para um bom design, branding, legibilidade e acessibilidade. As fontes da Web possibilitam os itens acima e muito mais: o texto é selecionável, pesquisável, ampliável e de alto DPI (pontos por polegada), o que fornece consistência e textos nítidos independentemente do tamanho e da resolução da tela. As fontes da Web são vitais para um design, desempenho e experiência de usuário de qualidade.


A otimização das fontes da Web é uma tática fundamental para a estratégia geral de desempenho. Cada fonte é um recurso adicional, e algumas delas podem bloquear a renderização do texto. Porém, usar fontes da Web não quer dizer que a renderização tem de ser mais lenta. Ao contrário, uma fonte otimizada combinada com uma estratégia sensata para seu carregamento e aplicação na página pode ajudar a reduzir o tamanho total da página e melhorar os tempos de renderização.

## Anatomia de uma fonte da Web

### TL;DR {: .hide-from-toc }
- As fontes unicode podem conter milhares de glifos
- Há quatro formatos de fonte: WOFF2, WOFF, EOT, TTF
- Alguns formatos de fonte exigem o uso da compactação GZIP


Uma fonte da Web é uma coleção de glifos, e cada glifo é uma forma vetorizada que descreve uma letra ou símbolo. Como resultado, o tamanho de um arquivo específico de fonte é determinado por duas variantes simples: a complexidade dos caminhos de vetor de cada glifo e o número de glifos em uma determinada fonte. Por exemplo, a Open Sans, uma das fontes da Web mais populares, contém 897 glifos, que incluem caracteres de latim, grego e cirílico.

<img src="images/glyphs.png" class="center" alt="Tabela de glifos das fontes">

Ao escolher uma fonte, é importante considerar quais conjuntos de caracteres têm suporte. Se você precisa localizar o conteúdo de sua página para vários idiomas, terá de usar uma fonte que forneça uma aparência e uma experiência consistentes a seus usuários. Por exemplo, a [família tipográfica Noto do Google](https://www.google.com/get/noto/){: .external } procura oferecer suporte a todos os idiomas do mundo. No entanto, o tamanho total da Noto, com todos os idiomas incluídos, resulta em um download ZIP de mais de 130 MB. 

Usar fontes na Web requer cuidado na engenharia para garantir que a tipografia não atrapalhe o desempenho. Felizmente, a plataforma da Web fornece todas as formas geométricas básicas necessárias, e no resto deste guia nós veremos, na prática, como aproveitar o melhor dos dois mundos.

### Formatos de fontes da Web

Hoje, existem quatro formatos de contêiner de fontes em uso na Web: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://en.wikipedia.org/wiki/TrueType), [WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format) e [WOFF2](http://www.w3.org/TR/WOFF2/){: .external }. Apesar da ampla gama de opções, não há um formato único e universal que funcione em todos os navegadores novos e antigos: EOT é [somente IE](http://caniuse.com/#feat=eot), TTF é [parcialmente compatível com IE](http://caniuse.com/#search=ttf), WOFF desfruta do suporte mais amplo possível, mas [não está disponível para alguns navegadores mais antigos](http://caniuse.com/#feat=woff), e o suporte a WOFF 2.0 está [em andamento para muitos navegadores](http://caniuse.com/#feat=woff2).

Então em que pé estamos? Não há um formato único que funcione em todos os navegadores, o que significa que precisamos fornecer vários formatos para gerar uma experiência consistente:

* Fornecer a variante WOFF 2.0 para os navegadores com suporte
* Fornecer a variante WOFF para a maioria dos navegadores
* Fornecer a variante TTF para navegadores Android antigos (anteriores à versão 4.4)
* Fornecer a variante EOT a navegadores IE antigos (anteriores ao IE9)
^

Note: Tecnicamente, há também o <a href='http://caniuse.com/svg-fonts'>contêiner de fontes SVG</a>, mas ele não é compatível com IE ou Firefox e foi desativado no Google Chrome. Assim, seu uso é limitado e sua omissão neste guia é intencional.

### Redução do tamanho da fonte pela compactação

Uma fonte é uma coleção de glifos, os quais cada um é um conjunto de caminhos que descreve a forma da letra. Os glifos individuais são, logicamente, diferentes, mas eles ainda contêm uma grande quantidade de informações similares que podem ser compactadas com GZIP ou um compactador compatível: 

* Os formatos EOT e TTF não são compactados por padrão: verifique se seus servidores estão configurados para aplicar [a compactação GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) ao fornecer esses formatos.
* WOFF tem compactação incorporada: verifique se seu compactador de WOFF usa configurações de compactação otimizadas. 
* WOFF2 usa algoritmos de pré-processamento e compactação personalizados para fornecer redução de tamanho de arquivo de aproximadamente 30% em relação a outros formatos. Consulte [relatório](http://www.w3.org/TR/WOFF20ER/){: .external }.

Por último, vale salientar que alguns formatos de fonte contêm metadados adicionais, como [font hinting](http://en.wikipedia.org/wiki/Font_hinting, em inglês) e informações de [kerning](http://en.wikipedia.org/wiki/Kerning, em inglês) que podem não ser necessárias em algumas plataformas, o que possibilita maior otimização de tamanho de arquivo. Consulte seu compactador de fontes para ver as opções de otimização e, se você escolher essa opção, verifique se possui a infraestrutura adequada para testar e fornecer essas fontes otimizadas a cada navegador específico. Por exemplo, o Google Fonts mantém mais de 30 variantes otimizadas para cada fonte e detecta e fornece automaticamente a variante otimizada para cada plataforma e navegador.

Note: Considere o uso da <a href='http://en.wikipedia.org/wiki/Zopfli'>compactação Zopfli</a> para os formatos EOT, TTF e WOFF. Zopfli é um compactador compatível com zlib que fornece aproximadamente 5% a mais de redução nos tamanhos de arquivos em relação ao gzip.

## Como definir a família da fonte com @font-face

### TL;DR {: .hide-from-toc }
- Use a dica format() para especificar vários formatos de fonte
- Forme subconjuntos de grandes conjuntos de fontes unicode para aprimorar o desempenho: use o agrupamento de alcance unicode e forneça uma substituta manual de um subgrupo para navegadores mais antigos
- Reduza o número de variantes estilísticas de fontes para melhorar o desempenho de renderização da página e do texto


A CSS @font-face na regra possibilita definir o local de um recurso de fonte específico, suas características de estilo e os pontos de código unicode para os quais ela deve ser usada. Uma combinação dessas declarações de @font-face pode ser usada para criar uma `família de fontes`, que o navegador usará para avaliar quais recursos de fonte terão de ser transferidos e aplicados à página atual. Vejamos de perto como isso funciona.

### Seleção de formato

Cada declaração @font-face fornece o nome da família da fonte, que atua como um grupo lógico de várias declarações, [propriedades de fonte](http://www.w3.org/TR/css3-fonts/#font-prop-desc), como estilo, peso e extensão, e o [descritor src](http://www.w3.org/TR/css3-fonts/#src-desc), que especifica uma lista de locais para o recurso de fontes.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('ttf'),
           url('/fonts/awesome.eot') format('eot');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('ttf'),
           url('/fonts/awesome-i.eot') format('eot');
    }


Os exemplos acima definem uma única família _Awesome Font_ com dois estilos (normal e _italic_), cada um apontando para um conjunto de recursos de fonte diferente. Por sua vez, cada descritor `src` contém uma lista de variantes de recursos priorizada e separada por vírgulas: 

* A diretiva `local()` possibilita fazer referência, carregar e usar fontes instaladas localmente.
* A diretiva `url()` possibilita carregar fontes externas e tem permissão para conter uma dica opcional `format()`, indicando o formato da fonte referenciada pelo URL fornecido.

^
Note: A menos que você faça referência a uma das fontes padrão do sistema, na prática, é raro que o usuário o tenha instalado localmente, especialmente em dispositivos móveis, onde é efetivamente impossível `instalar` fontes adicionais. Assim, você sempre deve fornecer uma lista de locais externos de fontes.

Quando o navegador determina que a fonte é necessária, ele percorre a lista de recursos fornecida na ordem especificada e tenta carregar o recurso adequado. Seguindo o exemplo acima:

1. O navegador executa o layout da página e determina quais variantes de fonte são necessárias para renderizar um texto especificado na página.
2. Para cada fonte necessária, o navegador faz uma verificação para confirmar se a fonte está disponível localmente.
3. Se o arquivo não estiver disponível localmente, ele percorre as definições externas:
  * Se uma dica de formato estiver presente, o navegador verifica se ela é compatível antes de iniciar o download e avança para a próxima.
  * Se nenhuma dica de formato estiver presente, o navegador faz o download do recurso.

A combinação de diretivas locais e externas com as dicas de formato adequadas possibilita especificar todos os formatos de fonte disponíveis e permite que o navegador manipule o restante: ele detecta os recursos necessários e seleciona o formato otimizado em nosso nome.

Note: A ordem na qual as variantes das fontes são especificadas é importante. O navegador escolherá o primeiro formato com o qual ele é compatível. Por isso, se você deseja que os novos navegadores usem WOFF2, você precisa aplicar a declaração WOFF2 acima de WOFF e assim por diante.

### Agrupamento de subconjuntos de alcance de unicode

Além das propriedades de fonte, como estilo, peso e extensão, a regra @font-face possibilita definir um conjunto de pontos de código unicode compatíveis com cada recurso. Isso permite dividir uma grande fonte unicode em subconjuntos menores (por exemplo, latim, cirílico, grego) e só fazer o download dos glifos necessários para renderizar o texto em uma determinada página.

O [descritor de alcance de unicode](http://www.w3.org/TR/css3-fonts/#descdef-Unicode-range) possibilita especificar uma lista delimitada por vírgulas de valores de alcance, os quais podem estar em uma das três formas diferentes:

* Ponto de código único (por exemplo, U+416)
* Alcance de intervalo (por exemplo, U+400-4ff): indica os pontos de código de início e fim do alcance
* Alcance de caractere curinga (por exemplo, caracteres U+4??): `?` indicam um dígito hexadecimal

Por exemplo, podemos dividir nossa família _Awesome Font_ em subconjuntos de latim e japonês, os quais serão carregados por download pelo navegador conforme necessário: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: O agrupamento em subconjuntos de alcance de unicode é especialmente importante para idiomas asiáticos, em que o número de glifos é muito maior que nos idiomas ocidentais e uma fonte típica `full` (completa) geralmente é medida em megabytes em vez de dezenas de kilobytes.

O uso de subconjuntos de alcance de unicode e de arquivos separados para cada variante estilística da fonte possibilita definir uma família de fonte composta que seja rápida e mais eficiente para o download. O visitante só fará o download das variantes e subconjuntos de que ele precisar e não precisará fazer o download de subconjuntos cuja visualização ou uso pode nunca ocorrer na página. 

Dito isso, há uma pequena pegadinha no alcance de Unicode: [nem todos os navegadores oferecem suporte a ele](http://caniuse.com/#feat=font-Unicode-range) ainda. Alguns navegadores simplesmente ignoram a dica de alcance de unicode e fazem o download de todas as variantes, enquanto outros podem não processar a declaração @font-face. Para abordar isso, precisamos acionar a substituição de "subconjuntos manuais" para os navegadores mais antigos.

Como esses navegadores não conseguem selecionar apenas os subconjuntos necessários e criar uma fonte composta, temos de fornecer um recurso substituto de fonte única que contenha todos os subconjuntos necessários e oculte o resto do navegador. Por exemplo, se a página só usa caracteres do latim, podemos remover outros glifos e exibir esse conjunto particular como um recurso autônomo. 

1. **Como determinamos quais subconjuntos são necessários?** 
    - Se o agrupamento de alcance de unicode for compatível com o navegador, ele selecionará automaticamente o subconjunto adequado. A página só precisa fornecer os arquivos de subconjunto e especificar alcances de unicode adequados nas regras @font-face.
    - Se o alcance de unicode não for compatível, a página precisa ocultar todos os subconjuntos desnecessários, ou seja, o desenvolvedor tem de especificar os subconjuntos exigidos.
2. **Como geramos subconjuntos de fontes?**
    - Use a [ferramenta pyftsubset de código aberto](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) para agrupar em conjuntos e otimizar suas fontes.
    - Alguns serviços de fontes possibilitam o agrupamento manual de subconjuntos via parâmetros de consulta personalizada, que você pode usar para especificar manualmente o subconjunto exigido por sua página. Consulte a documentação de seu fornecedor de fontes.


### Seleção e síntese de fontes

Cada família de fontes é composta por múltiplas variantes estilísticas (regular, bold, italic) e múltiplos pesos para cada estilo, os quais, por sua vez, podem conter formas de glifo bem diferentes, por exemplo, espaçamento e tamanhos diferentes ou uma forma diferente no conjunto. 

<img src="images/font-weights.png" class="center" alt="Pesos das fontes">

Por exemplo, o diagrama acima ilustra uma família de fontes que oferece três pesos diferentes para negrito: 400 (regular), 700 (bold) e 900 (extra bold). Todas as variantes entre eles (indicadas em cinza) são automaticamente mapeadas pelo navegador para a variante mais próxima. 

> Quando um peso que não tem uma face é especificado, a face com o peso mais aproximado é utilizada em seu lugar. Em geral, os pesos de negrito delineiam faces com pesos maiores, e os pesos leves delineiam faces com pesos menores.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritmo de combinação de fontes CSS3</a>

Uma lógica similar se aplica a variantes _italic_. O designer de fontes controla quais variantes serão produzidas, e nós controlamos quais variantes usaremos na página. Já que cada variante representa um download diferente, é indicado manter um pequeno número de variantes. Por exemplo, podemos definir duas variantes de negrito para nossa família _Awesome Font_: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('ttf'),
           url('/fonts/awesome-l-700.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

O exemplo acima declara a família _Awesome Font_, que é composta de dois recursos que cobrem o mesmo conjunto de glifos do latim (U+000-5FF), mas oferece dois `pesos` diferentes: normal (400) e bold (700). Porém, o que acontece se uma de nossas regras de CSS especificar um peso de fonte diferente ou definir a propriedade font-style para itálico?

* Se não houver uma correspondência exata de fontes, o navegador fará uma substituição usando a correspondência mais próxima.
* Se não for encontrada uma correspondência estilística (por exemplo, se não declaramos variantes em itálico no exemplo acima), o navegador sintetizará sua própria variante de fonte. 

<img src="images/font-synthesis.png" class="center" alt="Síntese de fontes">

> Os autores precisam estar cientes de que abordagens sintetizadas podem não ser adequadas para scripts como cirílico, em que as formas de itálico são muito diferentes. É sempre melhor usar uma fonte que esteja realmente em itálico do que confiar em uma versão sintética.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">Estilo de fonte de CSS3</a>

O exemplo acima ilustra a diferença entre os resultados de fonte reais vs. sintetizadas para Open-Sans. Todas as variantes sintéticas são geradas a partir de uma única fonte de peso 400. Como é possível observar, há uma diferença notável nos resultados. Os detalhes de como gerar as variantes bold e oblique não são especificados. Por isso, os resultados irão variar de navegador para navegador, e também dependerão muito da fonte.

Note: Para atingir os melhores resultados em consistência e visual, procure não confiar na síntese de fontes. Em vez disso, minimize o número de variantes de fonte usadas e especifique seus locais, de forma que o navegador possa fazer o download das fontes e elas sejam usadas na página. Em alguns casos, uma variante sintetizada <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>pode ser uma opção viável</a>. Use-a com cautela.


## Como otimizar o carregamento e a renderização

### TL;DR {: .hide-from-toc }
- As solicitações das fontes são atrasadas até que a árvore de renderização seja criada, o que pode resultar em atraso na renderização do texto
- A API de carregamento de fontes possibilita a implementação de estratégias de carregamento e renderização de fontes personalizadas, que substituem o carregamento de fontes lazyload padrão
- A colocação de fontes in-line possibilita a substituição do carregamento de fontes lazyload padrão em navegadores mais antigos


Uma fonte da Web `full` que inclui todas as variantes estilísticas, as quais podem não ser necessárias, mais todos os glifos, que podem não ser usados, pode resultar em um download com muitos megabytes. Para resolver isso, a regra de CSS @font-face é elaborada especificamente para possibilitar a divisão da família em uma coleção de recursos: subconjuntos unicode, variantes de estilo distintas e assim por diante. 

Dadas essas declarações, o navegador detecta os subconjuntos e variantes exigidos e faz o download do conjunto necessário mínimo para renderizar o texto. Esse comportamento é muito conveniente, pois, se não formos cautelosos, ele também pode gerar um afunilamento de desempenho no caminho de processamento essencial e atrasar a renderização do texto, algo que certamente devemos evitar. 

### Fontes da Web e o caminho de processamento essencial

O lazyload de fontes carrega uma importante implicação oculta que pode atrasar a renderização do texto: o navegador deve [criar a árvore de renderização](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), que é dependente das árvores de DOM e CSSOM, antes de saber quais recursos de fonte ele precisará para renderizar o texto. Como resultado, as solicitações de fontes são atrasadas logo depois de outros recursos essenciais, e o navegador pode sofrer um bloqueio de renderização do texto até que o recurso seja buscado.

<img src="images/font-crp.png" class="center" alt="Caminho de processamento essencial da fonte">

1. O navegador solicita o documento HTML
2. O navegador começa a analisar a resposta HTML e a criar o DOM
3. O navegador detecta o CSS, o JS e outros recursos e envia as solicitações
4. O navegador cria o CSSOM assim que todo o conteúdo de CSS é recebido e o combina com a árvore de DOM para criar a árvore de renderização
  * As solicitações de fontes são enviadas assim que a árvore de renderização indica quais variantes de fontes são necessárias para renderizar o texto especificado na página
5. O navegador executa o layout e compõe o conteúdo na tela
  * Se a fonte ainda não estiver disponível, o navegador pode não renderizar pixels de texto
  * Quando a fonte estiver disponível, o navegador irá compor os pixels do texto

A `corrida` entre a primeira composição do conteúdo da página, que pode ser feita logo depois que a árvore de renderização é criada, e a solicitação para o recurso de fontes é o que cria o `problema do texto em branco`, em que o navegador pode renderizar o layout da página, mas omite o texto. O comportamento real difere entre vários navegadores:

* O Safari retém a renderização do texto até que o download da fonte seja concluído.
* O Google Chrome e o Firefox retêm a renderização das fontes até 3 segundos, após os quais é empregada uma fonte substituta. Assim que o download da fonte é concluído, eles renderizam novamente o texto com a fonte transferida.
* O IE renderiza imediatamente com a fonte substituta se a fonte da solicitação ainda não estiver disponível, e a renderiza novamente assim que o download da fonte for concluído.

As diferentes estratégias de renderização contam com argumentos sólidos contra e a seu favor: uns acham a segunda renderização inconveniente, enquanto outros preferem ver resultados imediatos e não se importam se a página refluir quando o download da fonte tiver sido concluído. Esse último argumento não será abordado aqui. O ponto mais importante é que o lazyload reduz o número de bytes, mas também tem potencial para atrasar a renderização do texto. A seguir, vejamos como esse comportamento pode ser otimizado.

### Como otimizar a renderização de fontes com a API de carregamento de fontes

[A API de carregamento de fontes](http://dev.w3.org/csswg/css-font-loading/) fornece uma interface de script para definir e manipular faces de fontes de CSS, rastrear o progresso do download e substituir o comportamento de lazyload padrão. Por exemplo, se tivermos certeza de que uma determinada variante de fonte será exigida, podemos defini-la e instruir o navegador a iniciar uma busca imediata pelo recurso da fonte:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for render tree, initiate immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may rerender text and cause a page reflow)
      // once the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default content is hidden, and rendered once font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply own render strategy here... 
    });
    

Além disso, como é possível verificar o status da fonte (pelo método [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) e rastrear o progresso do download, também podemos definir uma estratégia personalizada para renderizar o texto em nossas páginas: 

* Podemos reter a renderização do texto até que a fonte esteja disponível.
* Podemos implementar um tempo limite personalizado para cada fonte.
* Podemos usar uma fonte substituta para desbloquear a renderização e introduzir um novo estilo que use a fonte desejada assim que ela estiver disponível.

E o melhor de tudo, também podemos combinar as estratégias acima para diferentes conteúdos na página, por exemplo, reter a renderização do texto em algumas seções até que a fonte esteja disponível, usar uma fonte substituta e renderizar novamente quando o download estiver concluído, especificar diferentes tempos limite e assim por diante. 

Note: A API de carregamento de fontes ainda está <a href='http://caniuse.com/#feat=font-loading'>em desenvolvimento para alguns navegadores</a>. Considere usar o <a href='https://github.com/bramstein/fontloader'>polyfill FontLoader</a> ou a <a href='https://github.com/typekit/webfontloader'>biblioteca webfontloader</a> para uma funcionalidade semelhante, embora com a sobrecarga de uma dependência JavaScript adicional.

### Como otimizar a renderização de fontes com a colocação in-line

Uma estratégia alternativa simples ao uso da API de carregamento de fontes para eliminar o `problema de texto em branco` é colocar os conteúdos de fonte in-line em uma folha de estilos CSS:

* Fontes de estilos CSS com consultas de mídia correspondentes são transferidas automaticamente pelo navegador com alta prioridade quando eles são solicitados a criar o CSSOM.
* Colocar os dados de fonte in-line nas folhas de estilos CSS força o navegador a fazer o download da fonte com alta prioridade e sem ter de esperar pela árvore de renderização, ou seja, isso atua como um substituto manual ao comportamento de lazyload padrão.

A estratégia de colocação in-line não é tão flexível e não permite definir tempos limite personalizados ou estratégias de renderização para conteúdos diferentes, mas é uma solução simples e sólida que funciona em todos os navegadores. Para resultados ainda melhores, separe as fontes in-line em uma folha de estilos autônoma e as exiba com um grande max-age. Dessa forma, ao atualizar sua CSS, você não força os visitantes a fazer um novo download das fontes. 

Note: Use a colocação in-line de forma seletiva. Lembre-se de que @font-face usa o comportamento lazyload para evitar o download de variantes e subconjuntos de fontes desnecessários. Além disso, aumentar o tamanho de seu CSS por meio de uma colocação in-line agressiva impactará negativamente sobre seu <a href='/web/fundamentals/performance/critical-rendering-path/'>caminho de processamento essencial</a>. O navegador deve fazer o download de todas as CSS antes de criar o CSSOM e a árvore de renderização e de renderizar os conteúdos da página para a tela.

### Como otimizar a reutilização de fontes com o cache de HTTP

Os recursos de fontes são, normalmente, recursos estáticos que não veem atualizações frequentes. Como resultado, são ideais para um vencimento max-age longo. Confirme se você especificou um [cabeçalho ETag condicional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) e uma [política de controle de cache otimizada](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) para todos os recursos de fontes.   
    
Não é necessário armazenar fontes no localStorage ou por outros mecanismos: cada uma delas tem seu próprio conjunto de `pegadinhas` de desempenho. O cache HTTP do navegador, em combinação com a API de carregamento de fontes ou a biblioteca webfontloader, fornece o melhor e mais sólido mecanismo para fornecer recursos de fonte ao navegador.


## Lista de verificação da otimização

Ao contrário do que dita a crença popular, o uso de fontes da Web não precisa atrasar a renderização da página nem exercer um impacto negativo sobre outras métricas de desempenho. O uso otimizado das fontes pode gerar uma experiência de usuário muito superior, com melhorias em branding, legibilidade, usabilidade e capacidade de pesquisa, fornecendo ao mesmo tempo uma solução dimensionável e com várias resoluções que se adapta muito bem a todos os tamanhos e resoluções de tela. Não tenha medo de usar as fontes da Web. 

Dito isso, é bom lembrar que uma implementação ingênua pode acarretar grandes downloads e atrasos desnecessários. É aqui que precisamos resgatar o kit de ferramentas de otimização e ajudar o navegador, otimizando os próprios recursos de fontes e a forma como são buscados e usados em nossas páginas. 

1. **Inspecione e monitore o uso das fontes:** não use muitas fontes em suas páginas e, para cada fonte, minimize o número de variantes usadas. Isso ajuda a proporcionar uma experiência de usuário mais consistente e rápida.
2. **Agrupe os recursos das fontes em subconjuntos:** muitas fontes podem ser agrupadas em subconjuntos ou divididas em vários alcances de unicode para fornecer apenas os glifos exigidos por uma determinada página. Isso reduz o tamanho do arquivo e melhora a velocidade de download do recurso. No entanto, ao definir os subconjuntos, tenha cuidado para otimizá-los para a reutilização de fontes, por exemplo, não propiciando o download de um conjunto de caracteres que pode ser diferente do anterior, mas que se sobrepõe a ele em cada página. Uma prática recomendada é agrupar em subconjuntos com base no script, por exemplo, latim, cirílico e assim por diante.
3. **Forneça formatos de fonte otimizados para cada navegador:** cada fonte deve ser oferecida nos formatos WOFF2, WOFF, EOT e TTF. Não se esqueça de usar a compactação GZIP com os formatos EOT e TTF, pois eles não são compactados por padrão.
4. **Especifique políticas de revalidação e cache otimizado:** as fontes são recursos estáticos que não são atualizados com frequência. Certifique-se de que os servidores forneceram um carimbo de data e hora max-age de longa duração, além de um token de revalidação. Isso possibilita a reutilização eficiente das fontes entre páginas diferentes.
5. **Use a API de carregamento de fontes para otimizar o caminho de processamento essencial:** o comportamento de lazyload padrão pode resultar em atrasos na renderização do texto. A API de carregamento possibilita substituir esse comportamento por determinadas fontes e especificar estratégias personalizadas de renderização e tempo limite para conteúdos diferentes na página. Para navegadores mais antigos e que não são compatíveis com a API, você pode usar a biblioteca JavaScript webfontloader ou a estratégia de colocação in-line de CSS.


