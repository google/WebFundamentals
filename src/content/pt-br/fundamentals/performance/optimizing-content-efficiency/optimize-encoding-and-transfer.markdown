---
title: "Otimização da codificação e do tamanho de transferência de recursos baseados em texto"
description: "Após eliminar todos os recursos desnecessários, a próxima etapa é minimizar o tamanho total dos recursos que dos quais o navegador precisa fazer o download. Isso significa compactá-los por meio de algoritmos de compactação genéricos (GZip) ou específicos para cada tipo de conteúdo."
updated_on: 2014-09-12
key-takeaways:
  compression-101:
    - A compactação é o processo de codificar informações usando menos bits
    - Eliminar dados desnecessários sempre leva aos melhores resultados
    - Há vários algoritmos e técnicas de compactação diferentes
    - É preciso usar várias técnicas para alcançar a melhor compactação
  minification:
    - As otimizações específicas para cada tipo de conteúdo podem reduzir de maneira significativa o tamanho dos recursos exibidos.
    - As otimizações específicas para cada tipo de conteúdo são mais bem aplicadas como parte de nosso ciclo de criação/lançamento.
  text-compression:
    - "O GZIP funciona melhor em recursos baseados em texto: CSS, JavaScript e HTML"
    - Todos os navegadores modernos aceitam a compactação com o GZIP e a solicitam automaticamente
    - É preciso configurar o servidor para ativar a compactação com o GZIP
    - Algumas CDNs exigem cuidados especiais para ativar o GZIP
notes:
  jquery-minify:
    - "Atualmente a versão de desenvolvimento descompactada da biblioteca JQuery se aproxima de 300 KB. A mesma biblioteca, porém reduzida (com comentários removidos etc.) é cerca de 3 x menor: ~100 KB."
  gzip:
    - "Surpreendentemente, há casos em que o GZIP pode até aumentar o tamanho do recurso. Normalmente, isso acontece quando o recurso é muito pequeno e a sobrecarga do dicionário do GZIP é mais alta do que a redução alcançada pela compactação. Isso também pode ocorrer quando o recurso já está bem compactado. Alguns servidores permitem que você especifique um `limite mínimo de tamanho do arquivo` para evitar esse problema."
---

<p class="intro">
  A funcionalidade, as pretensões e o escopo dos nossos aplicativos da Web continuam a crescer e isso é bom. No entanto, a incessante caminhada em direção a uma Web mais avançada leva a outra tendência: o volume de dados transferidos por cada aplicativo continua a crescer em ritmo constante. Para proporcionar um bom desempenho, é preciso otimizar a exibição de absolutamente todos os bytes.
</p>

{% include shared/toc.liquid %}


## Introdução à compactação de dados

Após eliminar todos os recursos desnecessários, a próxima etapa é minimizar o tamanho total dos recursos que o navegador precisa transferir por download, ou seja, compactá-los. Dependendo do tipo de recurso (texto, imagens, fontes etc.), temos várias técnicas diferentes disponíveis: ferramentas genéricas que podem ser habilitadas no servidor, otimizações pré-processamento para tipos específicos de conteúdo e otimizações para recursos específicos que exigem dados fornecidos pelo programador.

Proporcionar o melhor desempenho possível depende da combinação de todas essas técnicas.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

O processo de redução do tamanho dos dados é chamado de `compactação de dados` e consiste em uma área de estudo independente: muitas pessoas dedicam suas carreiras ao desenvolvimento de algoritmos, técnicas e otimizações para melhorar as taxas de compactação, a agilidade e os requisitos de memória de vários compactadores. Obviamente, não abordaremos esse assunto em detalhes. Mesmo assim, é importante entender como a compactação funciona em alto nível e quais técnicas estão disponíveis para reduzir o tamanho dos vários recursos exigidos pelas páginas.

Para ilustrar os princípios fundamentais dessas técnicas na prática, pensaremos em como otimizar um simples formato de mensagem de texto inventado exclusivamente para este exemplo:

  #Veja abaixo uma mensagem de texto que consiste em um conjunto de cabeçalhos no
  #formato valor-chave, seguido por uma nova linha e pela mensagem criptografada.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. As mensagens podem conter anotações aleatórias indicadas pelo prefixo `#`. As anotações não afetam o significado nem o comportamento da mensagem.
2. As mensagens podem conter `cabeçalhos` que são pares de valor-chave (separados por `:`) e precisam aparecer no início da mensagem.
3. As mensagens também possuem cargas de texto.

O que podemos fazer para reduzir o tamanho da mensagem acima, que atualmente tem 200 caracteres?

1. O comentário é interessante, mas sabemos que não afeta o significado da mensagem, então é melhor eliminá-lo ao transmitir a mensagem.
2. Provavelmente existem algumas técnicas inteligentes para codificar os cabeçalhos de maneira eficiente. Por exemplo, não sabemos se todas as mensagens possuem `formato` e `data`, mas se soubéssemos, poderíamos convertê-los em códigos inteiros e enviar somente eles. Como não sabemos se esse é o caso, deixaremos como está.
3. A carga é somente texto e, mesmo não conhecendo seu verdadeiro conteúdo (aparentemente é uma `mensagem secreta`), só de olhar para ela já dá pra ver várias redundâncias. Será que há uma maneira de, em vez de enviar letras repetidas, simplesmente contá-las e codificá-las de maneira mais eficiente?
    * Por exemplo, `AAA` se torna `3A` (sequência de três letras `A`).


Com a combinação das técnicas, chegamos ao seguinte resultado:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

A nova mensagem tem 56 caracteres, indicando que conseguimos reduzir a mensagem original em 72%. Nada mal, considerando as limitações. E estamos somente começando.

Talvez você esteja se perguntando como isso pode ajudar a otimizar suas páginas da Web. Será que precisaremos criar nossos próprios algoritmos de compactação? Não. No entanto, você verá que usaremos exatamente as mesmas técnicas e o mesmo modo de pensar para otimizar vários recursos em nossas páginas: pré-processamento, otimizações baseadas no contexto e algoritmos diferentes para conteúdos diferentes.


## Minificação: processamento e otimizações baseadas no contexto

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

A melhor maneira de compactar dados redundantes ou desnecessários é simplesmente os excluindo. Não podemos apagar dados aleatoriamente, mas em alguns contextos em que conhecemos o conteúdo específico do formato de dados e suas propriedades, é possível reduzir de maneira significativa o tamanho da carga sem afetar o significado.

{% include_code src=_code/minify.html snippet=full %}

Considere a simples página HTML acima e os três tipos diferentes de conteúdo que ela possui: marcações HTML, estilos CSS e JavaScript. Cada um desses tipos de conteúdo tem regras diferentes para definir quais marcações HTML, regras CSS ou conteúdo JavaScript são válidos, regras diferentes para indicar comentários etc. Como podemos reduzir o tamanho dessa página?

* Comentários de código são o melhor amigo de um programador, mas o navegador não precisa vê-los. A simples remoção dos comentários de CSS (`/* ... */`), HTML (`<!-- ... -->`) e JavaScript (`// ...`) pode reduzir bastante o tamanho total da página.
* Um compactador CSS `inteligente` pode detectar que estamos definindo regras para `.awesome-container` de maneira ineficiente e transformar as duas declarações em apenas uma sem afetar outros estilos e reduzindo ainda mais o número de bytes.
* Os espaços em branco (espaços e tabulações) são uma comodidade para os desenvolvedores de HTML, CSS e JavaScript. Um compactador extra pode remover todas as tabulações e espaços.

^
{% include_code src=_code/minified.html snippet=full %}

Após executar as etapas acima, nossa página passou de 406 para 150 caracteres: uma compactação de 63%. A verdade é que não ficou muito legível, mas também não precisa ficar. É possível manter a página original como a `versão em desenvolvimento` e depois executar as etapas acima quando a página estiver pronta para ser ativada no site.

Recapitulando, o exemplo acima ilustra uma questão importante: um compactador genérico (do tipo desenvolvido para compactar textos aleatórios) também poderia realizar uma boa compactação da página acima. No entanto, ele nunca seria capaz de remover os comentários, recolher as regras CSS ou realizar as várias otimizações específicas para o tipo de conteúdo. É por isso que o pré-processamento, a minificação e a otimização voltada para o contexto podem ser ferramentas poderosas.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

Da mesma forma, as técnicas acima podem ser ampliadas para além dos recursos baseados em texto. Imagens, vídeos e outros tipos de conteúdo também têm suas próprias formas de metadados e várias cargas. Por exemplo, sempre que você fotografa com uma câmera, a foto normalmente agrega várias informações adicionais: configuração da câmera, localização etc. Dependendo do seu aplicativo, esses dados podem ser essenciais (por exemplo, um site de compartilhamento de fotos) ou completamente inúteis, e você deve considerar se vale a pena removê-los. Na prática, esses metadados podem adicionar até dezenas de kilobytes em cada imagem.

Resumindo, o primeiro passo para otimizar a eficiência dos seus recursos é criar um inventário de diferentes tipos de conteúdo e considerar quais otimizações específicas é possível aplicar para reduzir o tamanho deles. Isso pode gerar reduções significativas. Em seguida, depois de decidir quais são as otimizações, faça a automação adicionando-as aos processos de criação e lançamento. Essa é a única maneira de garantir que as otimizações permanecerão.

## Compactação de texto com o GZIP

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

O [GZIP](http://en.wikipedia.org/wiki/Gzip) é um compactador genérico que pode ser aplicado a qualquer fluxo de bytes. Internamente, ele lembra alguns conteúdos vistos antes e tenta encontrar e substituir fragmentos de dados duplicados de uma maneira eficiente. Os curiosos podem ler essa [ótima explicação sobre como o GZIP funciona nos bastidores](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). No entanto, na prática o GZIP funciona melhor para conteúdo baseado em texto, frequentemente alcançando taxas de compactação de até 70% a 90% para arquivos maiores. Já para os recursos que foram compactados com outros algoritmos (por exemplo, a maioria dos formatos de imagem), o GZIP traz pouca ou nenhuma melhoria.

Todos os navegadores modernos oferecem suporte e negociam automaticamente a compactação com GZIP para todas as solicitações HTTP. Nosso trabalho é garantir que o servidor esteja configurado corretamente para exibir o recurso compactado quando ele for solicitado pelo cliente.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Biblioteca</th>
    <th>Tamanho</th>
    <th>Tamanho compactado</th>
    <th>Taxa de compactação</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="biblioteca">jquery-1.11.0.js</td>
  <td data-th="tamanho">276 KB</td>
  <td data-th="compactado">82 KB</td>
  <td data-th="redução">70%</td>
</tr>
<tr>
  <td data-th="biblioteca">jquery-1.11.0.min.js</td>
  <td data-th="tamanho">94 KB</td>
  <td data-th="compactado">33 KB</td>
  <td data-th="redução">65%</td>
</tr>
<tr>
  <td data-th="biblioteca">angular-1.2.15.js</td>
  <td data-th="tamanho">729 KB</td>
  <td data-th="compactado">182 KB</td>
  <td data-th="redução">75%</td>
</tr>
<tr>
  <td data-th="biblioteca">angular-1.2.15.min.js</td>
  <td data-th="tamanho">101 KB</td>
  <td data-th="compactado">37 KB</td>
  <td data-th="redução">63%</td>
</tr>
<tr>
  <td data-th="biblioteca">bootstrap-3.1.1.css</td>
  <td data-th="tamanho">118 KB</td>
  <td data-th="compactado">18 KB</td>
  <td data-th="redução">85%</td>
</tr>
<tr>
  <td data-th="biblioteca">bootstrap-3.1.1.min.css</td>
  <td data-th="tamanho">98 KB</td>
  <td data-th="compactado">17 KB</td>
  <td data-th="redução">83%</td>
</tr>
<tr>
  <td data-th="biblioteca">foundation-5.css</td>
  <td data-th="tamanho">186 KB</td>
  <td data-th="compactado">22 KB</td>
  <td data-th="redução">88%</td>
</tr>
<tr>
  <td data-th="biblioteca">foundation-5.min.css</td>
  <td data-th="tamanho">146 KB</td>
  <td data-th="compactado">18 KB</td>
  <td data-th="redução">88%</td>
</tr>
</tbody>
</table>

A tabela acima ilustra as reduções alcançadas pela compactação com o GZIP de algumas das bibliotecas JavaScript e estruturas CSS. As reduções variam de 60% a 88% e a combinação dos arquivos reduzidos (identificados pela extensão `.min` no nome do arquivo), juntamente com o GZIP, aumentam ainda mais a taxa de compactação.

1. **Aplique primeiro as otimizações específicas para o tipo de conteúdo: minificadores de CSS, JS e HTML.**
2. **Execute o GZIP para compactar o resultado reduzido.**

O melhor é que a ativação do GZIP é uma das otimizações mais simples e que mais compensam. Porém, muitas pessoas ainda se esquecem de implementá-la. A maioria dos navegadores faz a compactação de dados automaticamente, e você só precisa verificar se o servidor está configurado corretamente para compactar todos os tipos de conteúdo que podem se beneficiar da compactação com o GZIP.

Qual é a melhor configuração para seu servidor? O projeto HTML5 Boilerplate contém [exemplos de arquivos de configuração](https://github.com/h5bp/server-configs) para todos os servidores mais conhecidos, com comentários detalhados sobre cada sinalizador e configuração: encontre seu servidor preferido na lista, procure a seção do GZIP e verifique se o servidor está com as configurações recomendadas.

<img src="images/transfer-vs-actual-size.png" class="center" alt="Demonstração do tamanho de transferência vs. tamanho real no DevTools">

Uma forma simples e rápida de ver o GZIP em ação é abrir o Chrome DevTools e inspecionar a coluna `Tamanho / Conteúdo` no painel de Rede: `tamanho` indica o tamanho de transferência do recurso e `conteúdo` indica o tamanho descompactado. Para o recurso HTML do exemplo acima, o GZIP gerou uma redução de 24,8 KB durante a transferência.

{% include shared/remember.liquid list=page.notes.gzip %}

Por fim, embora a maioria dos navegadores faça a compactação automática dos recursos ao exibi-los para o usuário, algumas CDNs exigem maiores cuidados e ações manuais para garantir que o recurso compactado pelo GZIPseja exibido. Faça uma auditoria no seu site para verificar se seus recursos estão realmente [compactados](http://www.whatsmyip.org/http-compression-test/).





