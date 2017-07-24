project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A tipografia é fundamental para proporcionar design, uso de marca, legibilidade e acessibilidade de boa qualidade. Além de oferecer tudo isso, as fontes da Web permitem selecionar, pesquisar, alterar o zoom e facilitar o uso de alto DPI em textos, proporcionando uma renderização de texto consistente e nítida, independentemente do tamanho e da resolução da tela.

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2014-09-19 #}

# Otimização de fontes da web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

A tipografia é fundamental para proporcionar design, uso de marca, legibilidade e acessibilidade de boa qualidade. Além de oferecer tudo isso, as fontes da Web permitem selecionar, pesquisar, alterar o zoom e facilitar o uso de alto DPI em textos, proporcionando uma renderização de texto consistente e nítida, independentemente do tamanho e da resolução da tela. As fontes da Web são essenciais para oferecer design, experiência de usuário (UX) e desempenho de qualidade.

A otimização das fontes da Web é um fator crítico da estratégia geral de desempenho. Cada fonte é um recurso adicional, e algumas fontes podem bloquear a renderização do texto. No entanto, o uso de fontes da Web na página não significa que sua renderização será necessariamente mais lenta. Pelo contrário, fontes otimizadas, combinadas com uma estratégia sensata para a forma como elas são carregadas e aplicadas na página, podem ajudar a reduzir seu tamanho total e seu tempo de renderização.


## Anatomia de uma fonte da Web

### TL;DR {: .hide-from-toc }
* As fontes Unicode podem conter milhares de glifos.
* Há quatro formatos de fonte: WOFF2, WOFF, EOT e TTF.
* Alguns formatos de fontes exigem o uso de compressão GZIP.


Uma *fonte da Web* é uma coleção de glifos. Cada glifo é uma forma vetorial que descreve uma letra ou símbolo. Como resultado, duas variáveis simples determinam o tamanho de um arquivo de fonte específico: a complexidade dos caminhos vetoriais de cada glifo e o número de glifos em cada fonte. Por exemplo, Open Sans, uma das fontes da Web mais comuns, contém 897 glifos, que incluem caracteres latinos, gregos e cirílicos.

<img src="images/glyphs.png"  alt="Tabela de glifos da fonte">

Ao escolher uma fonte, é importante considerar quais conjuntos de caracteres serão permitidos. Se você precisar localizar o conteúdo da página para vários idiomas, deverá usar uma fonte que possa oferecer aparência e experiência consistentes aos usuários. Por exemplo, [a família de fontes Noto do Google](https://www.google.com/get/noto/){: .external } pretende ser compatível com todos os idiomas do mundo. Observe, contudo, que o tamanho total do Noto, com todos os idiomas incluídos, resulta em um download de ZIP com mais de 130 MB.

Obviamente, usar fontes na Web requer engenharia cautelosa para garantir que a tipografia não atrapalhe o desempenho. Felizmente, a plataforma da Web oferece todos os componentes básicos. O restante deste guia fornece uma forma prática de obter o melhor dos dois mundos.

### Formatos da fonte da Web

Existem atualmente quatro formatos de contêiner de fontes usados na Web: [EOT](https://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](https://en.wikipedia.org/wiki/TrueType), [WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format) e [WOFF2](https://www.w3.org/TR/WOFF2/){: .external }. Infelizmente, apesar da grande variedade de opções, não há um único formato universal que funcione em todos os navegadores atuais e antigos: O EOT é [compatível somente com o IE](http://caniuse.com/#feat=eot), o TTF é [parcialmente compatível com o IE](http://caniuse.com/#search=ttf), o WOFF oferece a compatibilidade mais ampla, mas [não está disponível em alguns navegadores antigos](http://caniuse.com/#feat=woff) e a compatibilidade com o WOFF 2.0 [ainda está sendo desenvolvida em muitos navegadores](http://caniuse.com/#feat=woff2).

Então, como ficamos? Não há um único formato que funcione em todos os navegadores, o que significa que temos de fornecer vários formatos para oferecer uma experiência consistente:

* Sirva a variante WOFF 2.0 para os navegadores compatíveis.
* Sirva a variante WOFF para a maioria dos navegadores.
* Sirva a variante TTF para navegadores Android antigos (anteriores à versão 4.4).
* Sirva a variante EOT para navegadores IE antigos (anteriores à versão IE9).

Observação: Tecnicamente, há outro formato de contêiner, o <a href='http://caniuse.com/svg-fonts'>contêiner de fonte SVG</a>, mas o IE e o Firefox nunca o suportaram, e agora ele está obsoleto no Chrome. Deste modo, ele tem uso limitado e é intencionalmente omitido neste guia.

### Reduzir o tamanho da fonte com compressão

Uma fonte é uma coleção de glifos, e cada glifo é um conjunto de caminhos que descreve a forma da letra. Os glifos individuais são diferentes, mas contêm muitas informações semelhantes que podem ser comprimidas com GZIP ou um compressor compatível: 

* Os formatos EOT e TTF não são comprimidos por padrão. Verifique se os servidores estão configurados para aplicar [compressão GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) ao fornecer esses formatos.
* O WOFF tem compressão incorporada. Verifique se o seu compressor de WOFF está usando as configurações de compressão ideais. 
* O WOFF2 usa algoritmos personalizados de pré-processamento e compressão para oferecer uma redução de tamanho de arquivo cerca de 30% maior que os outros formatos. Para obter mais informações, consulte [o relatório de avaliação de WOFF 2.0](http://www.w3.org/TR/WOFF20ER/){: .external }.

Por fim, é bom saber que alguns formatos de fonte contêm metadados adicionais, como informações de [hinting](https://en.wikipedia.org/wiki/Font_hinting) e [kerning](https://en.wikipedia.org/wiki/Kerning) de fontes, que podem ser desnecessárias em algumas plataformas, o que permite otimizar ainda mais o tamanho do arquivo. Consulte as opções de otimização disponíveis em seu compressor de fontes. Se você escolher essa opção, verifique se tem a infraestrutura adequada para testar e fornecer essas fontes otimizadas para cada navegador. Por exemplo, o Google Fonts mantém mais de 30 variantes otimizadas para cada fonte e detecta e fornece automaticamente a variante ideal para cada plataforma e navegador.

Observação: Considere o uso da <a href='http://en.wikipedia.org/wiki/Zopfli'>compressão Zopfli</a> para os formatos EOT, TTF e WOFF. O Zopfli é um compressor compatível com zlib que oferece um ganho de compressão de ~5% em relação ao gzip.

## Definir família de fontes com o @font-face

### TL;DR {: .hide-from-toc }
* Use a dica `format()` para especificar vários formatos de fonte.
* Para fontes Unicode grandes, crie subconjuntos para melhorar o desempenho. Use a criação de subconjuntos com Unicode-range e forneça um fallback de criação manual de subconjuntos para navegadores mais antigos.
* Reduza o número de variantes de estilos de fontes para melhorar o desempenho da página e a renderização de texto.


A at-rule CSS do @font-face permite definir a localização de um determinado recurso de fonte, suas características de estilo e os codepoints Unicode para os quais deve ser usado. Uma combinação dessas declarações @font-face pode ser usada para construir uma "família de fontes", usada pelo navegador para avaliar quais recursos de fonte devem ser baixados e aplicados à página atual.

### Seleção de formatos

Cada declaração @font-face especifica o nome da família de fontes, que atua como um grupo lógico de várias declarações, [propriedades de fonte](http://www.w3.org/TR/css3-fonts/#font-prop-desc) como estilo, peso e extensão, bem como o [descritor src](http://www.w3.org/TR/css3-fonts/#src-desc), que especifica uma lista priorizada de localizações do recurso de fonte.


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


Antes de mais nada, observe que os exemplos acima definem uma única família, _Awesome Font_, com dois estilos (normal e _itálico_), cada um deles apontando para um conjunto diferente de recursos de fonte. Por sua vez, cada descritor `src` contém uma lista priorizada 
 de variantes do recurso, separadas por vírgula: 

* A diretiva `local()` permite referenciar, carregar e usar fontes instaladas localmente.
* A diretiva `url()` permite carregar fontes externas e podem conter uma dica opcional `format()`, indicando o formato da fonte referenciada pelo URL especificado.


Observação: A menos que você referencie uma das fontes de sistema padrão, na prática é raro que o usuário tenha essa fonte instalada localmente, particularmente em dispositivos móveis, onde na verdade é impossível 'instalar' fontes adicionais. Como resultado, forneça sempre uma lista de locais externos de fontes.

Quando o navegador determina que a fonte é necessária, percorre a lista de recursos fornecida na ordem especificada e tenta carregar o recurso apropriado. Por exemplo, seguindo o exemplo acima:

1. O navegador executa o layout da página e determina quais variantes de fontes são necessárias para renderizar o texto especificado na página.
1. Para cada fonte necessária, o navegador verifica se a fonte está disponível localmente.
1. Se a fonte não está disponível localmente, o navegador percorre as definições externas:
    * Se uma dica de formato estiver presente, o navegador verificará se ela é permitida antes de iniciar o download. Se não suportar a dica, o navegador avança para a próxima.
    * Se nenhuma dica de formato estiver presente, o navegador baixará o recurso.

A combinação de diretivas locais e externas com dicas de formato adequadas permite especificar todos os formatos de fonte disponíveis e deixar que o navegador se encarregue do resto. O navegador determina quais recursos são necessários e seleciona o formato ideal.

Observação: A ordem de especificação das variantes das fontes é importante. O navegador escolhe o primeiro formato compatível. Portanto, se você quiser que os navegadores mais recentes usem WOFF2, coloque a declaração do WOFF2 acima do WOFF e assim por diante.

### Criar subconjuntos com unicode-range

Além das propriedades de fonte como estilo, peso e extensão, a 
regra @font-face permite definir um conjunto de codepoints Unicode compatível com 
cada recurso. Isso nos permite dividir uma fonte Unicode grande em subconjuntos 
menores (por exemplo, subconjuntos latino, cirílico e grego) e baixar apenas os glifos necessários para renderizar o texto em uma determinada página.

O [descritor unicode-range](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) permite especificar uma lista delimitada por vírgulas contendo valores de intervalos. Cada intervalo pode ter um destes três formatos diferentes:

* Único codepoint (por exemplo, U+416)
* Intervalo (por exemplo, U+400-4ff): indica os codepoints inicial e final de um intervalo
* Intervalo de caracteres curinga (por exemplo, U+4??): caracteres '?' indicam qualquer dígito hexadecimal

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
    

Observação: A criação de subconjuntos com unicode-range é particularmente importante para idiomas asiáticos, onde o número de glifos é muito maior que nos idiomas ocidentais e uma fonte 'completa' normalmente é medida em megabytes em vez de dezenas de kilobytes.

O uso de subconjuntos de intervalos Unicode, e de arquivos separados para cada variante de estilo da fonte permite definir uma família de fontes composta com download mais rápido e eficiente. Os visitantes baixam apenas as variantes e subconjuntos necessários e não são forçados a baixar subconjuntos que nunca serão vistos ou usados na página. 

No entanto, há um pequeno problema no unicode-range: [nem todos os 
navegadores são compatíveis](http://caniuse.com/#feat=font-unicode-range) (ainda). Alguns navegadores 
simplesmente ignoram a dica unicode-range e baixam todas as variantes. 
Outros sequer processam a declaração @font-face. Para resolver isso, precisamos de um fallback de "criação manual de subconjuntos" para navegadores mais antigos.

Como os navegadores antigos não têm inteligência suficiente para selecionar apenas os subconjuntos necessários e não podem construir uma fonte composta, é preciso um fallback para fornecer um único recurso de fonte que contém todos os subconjuntos necessários e ocultar os demais do navegador. Por exemplo, se a página usar apenas caracteres latinos, pode-se eliminar outros glifos e servir esse subconjunto específico como um recurso independente. 

1. **Como determinar os subconjuntos necessários?** 
    * Se o navegador suportar a criação de subconjuntos com unicode-range, o subconjunto correto será selecionado automaticamente. A página precisa apenas fornecer os arquivos de subconjuntos e especificar unicode-ranges adequados nas regras de @font-face.
    * Se o navegador não suportar a criação de subconjuntos com unicode-range, a página precisará ocultar todos os subconjuntos desnecessários. Ou seja, o desenvolvedor terá de especificar os subconjuntos necessários.
1. **Como gerar subconjuntos de fontes?**
    - Use a [ferramenta de código aberto pyftsubset](https://github.com/behdad/fonttools/){: .external } para criar subconjuntos e otimizar suas fontes.
    - Alguns serviços de fontes permitem a criação manual de subconjuntos por meio de parâmetros de consulta personalizada, que podem ser usados para especificar manualmente o subconjunto necessário para a página. Consulte a documentação do seu provedor de fontes.


### Seleção e sintetização de fontes

Cada família de fontes é composta de diversas variantes de estilo (regular, negrito, itálico) e diversos pesos para cada estilo. Por sua vez, cada um deles pode conter formas de glifos muito diferentes &mdash; por exemplo, espaçamento ou tamanho diferentes ou uma forma totalmente distinta. 

<img src="images/font-weights.png"  alt="Pesos da fonte">

Por exemplo, o diagrama acima ilustra uma família de fontes que oferece três 
pesos de negrito diferentes: 400 (regular), 700 (negrito) E 900 (extra negrito). Todas as 
outras variantes intermediárias (indicadas em cinza) são mapeadas automaticamente à 
variante mais próxima pelo navegador. 



> Quando um peso especificado não tem uma face correspondente, é usada uma face com peso próximo. Geralmente, pesos de negrito são mapeados a faces com pesos maiores e pesos leves são mapeados a faces com pesos menores.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">fonte CSS3 correspondente ao algoritmo</a>



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
    

O exemplo acima declara a família _Awesome Font_, que é composta de dois recursos que abrangem o mesmo conjunto de glifos latinos (U+000-5FF)., mas oferecem dois "pesos" diferentes: normal (400) e negrito (700). No entanto, o que acontecerá se uma de suas regras CSS especificar um peso de fonte diferente ou definir a propriedade 
font-style como itálico?

* Se uma correspondência exata de fonte não estiver disponível, o navegador substitui a correspondência mais próxima.
* Se nenhuma correspondência de estilo for encontrada (por exemplo, se nenhuma variante em itálico no exemplo acima foi declarada), o navegador sintetizará sua própria variante de fonte. 

<img src="images/font-synthesis.png"  alt="Sintetização de fonte">


> Os autores também devem estar cientes de que abordagens sintetizadas podem não ser adequadas para letras como cirílico, onde o itálico tem formas muito diferentes. É sempre melhor usar uma fonte itálica real que uma versão sintetizada.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">font-style CSS3</a>


O exemplo acima ilustra a diferença entre a fonte Open-Sans real e a sintetizada. Todas as variantes sintetizadas foram geradas de uma única fonte com peso 400. Como você pode ver, há uma diferença visível nos resultados. Os detalhes de como gerar as variantes negrito e oblíquos não são especificados. Portanto, os resultados serão variam de navegador para navegador, e dependem muito da fonte.

Observação: Para obter consistência e resultados visuais melhores, não sintetize fontes. Em vez disso, minimize o número de variantes de fontes usadas e especifique seus locais para que o browser possa baixá-las quando usadas na página. Por outro lado, em alguns casos uma variante sintetizada <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'> pode ser uma opção viável</a>, mas seja cauteloso ao usar variantes sintetizadas.

## Otimizar carga e renderização

### TL;DR {: .hide-from-toc }
* As solicitações de fonte são postergadas até que a árvore de renderização seja construída, o que pode resultar em renderização de texto retardada.
* A Font Loading API permite implementar estratégias personalizadas de carga e renderização de fontes para modificar sua carga retardada padrão.
* As fontes em linha permitem modificar a carga retardada padrão de fontes em navegadores mais antigos.

Uma fonte da Web "completa", incluindo todas as variantes de estilo (que podem ser desnecessárias) e todos os glifos (que podem não ser usados) pode resultar facilmente em um download de vários megabytes. Para resolver isso, a regra do CSS @font-face foi criada especificamente para permitir a divisão da família de fontes em uma coleção de recursos: subconjuntos Unicode, variantes de estilo distintas e assim por diante. 

Com essas declarações, o navegador identifica os subconjuntos e variantes úteis e baixa o conjunto mínimo necessário para renderizar o texto, o que é muito conveniente. No entanto, se você não for cauteloso, pode também criar um gargalo de desempenho no caminho crítico de renderização e retardar a renderização do texto. 

### Fontes da Web e o caminho crítico de renderização

A carga retardada de fontes traz uma importante implicação oculta que pode retardar a renderização de texto. O navegador deve [construir a árvore de renderização](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), que é dependente das árvores do DOM e do CSSOM, antes de saber quais recursos de fontes serão necessários para renderizar o texto. Como resultado, as solicitações de fontes são retardadas para bem depois de outros recursos essenciais, e o navegador pode ser impedido de renderizar o texto até que o recurso seja recuperado.

<img src="images/font-crp.png"  alt="Caminho crítico de renderização da fonte">

1. O navegador solicita o documento HTML.
1. O navegador começa analisar a resposta HTML e a construir o DOM.
1. O navegador descobre o CSS, o JS e outros recursos e envia solicitações.
1. O navegador constrói o CSSOM após todo o conteúdo CSS ser recebido e combina com uma árvore do DOM para construir a árvore de renderização.
    * As solicitações de fonte serão enviadas depois que a árvore de renderização indicar quais variantes da fonte serão necessárias para renderizar o texto especificado na página
1. O navegador executa o layout e pinta o conteúdo na tela.
    * Se a fonte ainda não estiver disponível, o navegador pode não renderizar nenhum pixel de texto.
    * Depois que a fonte está disponível, o navegador pintará os pixels de texto.

A "corrida" entre a primeira pintura do conteúdo da página, que pode ser feita logo 
após a criação da árvore de renderização, e a solicitação dos recursos de fonte é a responsável 
 pelo "problema do texto em branco", fazendo com que o navegador renderize o layout da página 
omitindo todo o texto. O comportamento real difere entre os diversos navegadores:

* O Safari retarda a renderização de texto até a conclusão do download da fonte.
* O Chrome e o Firefox retardam a renderização de fonte por até 3 segundos; depois disso, eles usam fonte de fallback. Quando o download da fonte é concluído, eles renderizam o texto novamente com a fonte baixada.
* O IE renderiza o texto imediatamente com a fonte de fallback caso a fonte solicitada não esteja disponível e volta a renderizar o texto depois que o download da fonte é concluído.

Há bons argumentos a favor e contra as diferentes estratégias de renderização. Algumas pessoas não gostam da nova renderização e outras preferem ver resultados imediatos e não se incomodam com o reflow da página quando o download da fonte termina. Não entraremos no mérito dessa discussão agora. O ponto importante é que a carga retardada 
reduz o número de bytes, mas também pode retardar a renderização do texto. A próxima seção descreve como você pode otimizar este comportamento.

### Otimizar a renderização de fontes com a Font Loading API

A [Font Loading API](http://dev.w3.org/csswg/css-font-loading/) oferece uma interface de scripting para definir e manipular faces de fontes CSS, controlar o andamento de seus downloads e modificar seu comportamento padrão de carga retardada. Por exemplo, se não tiver certeza que uma variante de fonte específica será necessária, pode-se defini-la e solicitar que o navegador inicie uma recuperação imediata do recurso de fonte:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for the render tree, initiate an immediate fetch!
    
    font.ready().then(function() {
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
    

Além disso, como pode checar o status da fonte (usando o método [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) e acompanhar o andamento do download, você também pode definir uma estratégia personalizada para renderizar texto nas páginas: 

* Pode-se retardar toda a renderização de texto até que a fonte esteja disponível.
* Pode-se implementar um tempo limite personalizado para cada fonte.
* Pode-se usar a fonte de fallback para desbloquear a renderização e injetar um novo estilo que usará a fonte desejada depois que esta ficar disponível.

O melhor de tudo é que você também pode combinar as estratégias acima em conteúdos diferentes na página. Por exemplo, retardar a renderização em algumas seções até que a fonte esteja disponível, usar um fallback e renderizar novamente após o download da fonte, especificar tempos limite distintos e assim por diante. 

Observação: A Font Loading API ainda está <a href='http://caniuse.com/#feat=font-loading'>em desenvolvimento em alguns navegadores</a>. Considere o uso do <a href='https://github.com/bramstein/fontloader'>polyfill FontLoader</a> ou da <a href='https://github.com/typekit/webfontloader'>biblioteca webfontloader</a> para oferecer funcionalidade similar, embora com o custo adicional de mais uma dependência de JavaScript.

### Otimizar a renderização da fonte com fontes em linha

Em vez de usar a Font Loading API para eliminar o "problema de texto em branco", uma estratégia alternativa simples é especificar o conteúdo da fonte em linha em uma folha de estilo CSS:

* As folhas de estilo CSS com as correspondentes consultas de mídia são baixadas automaticamente e com alta prioridade pelo navegador, pois são necessárias para construir o CSSOM.
* Os dados da fonte em linha na folha de estilo CSS forçam o navegador a baixar a fonte com alta prioridade e sem aguardar a árvore de renderização. Ou seja, é uma modificação manual no comportamento padrão de carga retardada.

A estratégia em linha não é tão flexível e não permite personalizar tempos limite ou renderização para conteúdos diferentes, mas é uma solução simples e robusta que funciona em todos os navegadores. Para obter os melhores resultados, separe as fontes em linha em uma folha de estilo independente e sirva-as com um max-age longo. Desta forma, quando atualizar o CSS, você não forçará os visitantes a baixar as fontes novamente. 

Observação: Use fontes em linha com critério. Lembre-se de que o @font-face usa o comportamento de carga retardada para evitar o download de variantes e subconjuntos de fontes desnecessários. Além disso, o uso agressivo de fontes em linha aumenta o tamanho do CSS, afetando negativamente o <a href='/web/fundamentals/performance/critical-rendering-path/'>caminho crítico de renderização</a>. O navegador tem de baixar todo o CSS antes de construir o CSSOM, criar a árvore de renderização e renderizar o conteúdo da página na tela.

### Otimizar a reutilização de fontes com o cache do HTTP

Normalmente, os recursos de fonte são estáticos e raramente atualizados. Portanto, são ideais para uma expiração longa de max-age. Não deixe de especificar um [cabeçalho ETag condicional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) e uma [política ideal de Cache-Control](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) para todos os recursos de fonte.
    
Não há necessidade de armazenar fontes em localStorage ou usando outros mecanismos. Todos 
têm seus próprios problemas de desempenho. O cache HTTP do navegador, 
combinado com a Font Loading API ou a com a biblioteca webfontloader, oferece o 
melhor e mais robusto mecanismo para fornecer recursos de fonte ao navegador.


## Lista de verificação de otimização

Ao contrário do que muitos pensam, o uso de fontes da Web não precisa retardar a renderização da página nem ter um impacto negativo em outras métricas de desempenho. O uso de fontes bem otimizado pode oferecer uma experiência do usuário muito melhor: ótimo uso de marca e melhor legibilidade, usabilidade e capacidade de pesquisa, sem deixar de oferecer uma solução escalável para várias resoluções que se adapta bem a todos os formatos e resoluções de tela. Não tenha receio de usar as fontes da Web! 

Por outro lado, uma implementação simplista pode gerar downloads grandes e demoras desnecessárias. Você precisa ajudar o navegador, otimizando os próprios ativos de fonte e a forma como são recuperados e usados nas páginas. 

* **Confira e monitore o uso de fontes:** não use fontes demais nas páginas. Para cada fonte, minimize o número de variantes usadas. Isso ajuda a produzir uma experiência mais consistente e rápida para seus usuários.
* **Crie um subconjunto dos recursos de fontes:** várias fontes permitem a criação de subconjuntos, ou a divisão em vários intervalos unicode, para fornecer apenas os glifos necessários para uma determinada página. Isso reduz o tamanho do arquivo e aumenta a velocidade do download do recurso. No entanto, ao definir os subconjuntos, tenha o cuidado de otimizar considerando a reutilização de fontes. Por exemplo, não baixe um conjunto diferente, mas com conjuntos de caracteres iguais, em cada página. Uma boa prática é criar um subconjunto de acordo com o script: por exemplo, latino, cirílico e assim por diante.
* **Forneça formatos de fonte otimizados para cada navegador:** cada fonte deve ser fornecida nos formatos WOFF2, WOFF, EOT e TTF. Não deixe de aplicar a compressão GZIP aos formatos EOT e TTF, pois eles não são comprimidos por padrão.
* **Especifique políticas de revalidação e de armazenamento em cache ideal:** as fontes são recursos estáticos, raramente atualizados. Verifique se os servidores fornecem uma marcação de data e hora de max-age longo e um token de revalidação para possibilitar a reutilização eficiente de fontes entre páginas distintas.
* **Use a Font Loading API para otimizar o caminho crítico de renderização:** o comportamento padrão de carga retardada pode atrasar a renderização do texto. A Font Loading API permite modificar esse comportamento para determinadas fontes e especificar estratégias personalizadas de renderização e tempo limite para conteúdos diferentes na página. Para navegadores antigos incompatíveis com a API, você pode usar a biblioteca JavaScript Web Font Loader ou usar a estratégia de fontes em linha do CSS.


{# wf_devsite_translation #}
