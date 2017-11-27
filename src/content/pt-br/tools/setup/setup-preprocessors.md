project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Saiba como configurar pré-processadores de CSS e JS para ajudar a escrever código com mais eficiência.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-08-03 #}

# Configurar pré-processadores de CSS e JS {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Os pré-processadores de CSS, como o Sass, assim como os pré-processadores e transcompiladores de JS podem acelerar muito seu desenvolvimento quando usados corretamente. Saiba como configurá-los.


### TL;DR {: .hide-from-toc }
- Os pré-processadores permitem usar recursos em CSS e JavaScript com que seu navegador não é compatível nativamente, por exemplo, variáveis CSS.
- Se estiver usando pré-processadores, mapeie os arquivos-fonte originais à saída renderizada usando o Source Maps.
- Certifique-se de que seu servidor Web possa fornecer Source Maps.
- Use um pré-processador compatível para gerar Source Maps automaticamente.


## O que é um pré-processador?

Um pré-processador obtém um arquivo-fonte arbitrário e converte-o em algo que o navegador entenda. 

Com CSS como saída, eles são usados para adicionar recursos que, de outra maneira, não existiriam (ainda): Variáveis CSS, aninhamento e muito mais. Exemplos notáveis nesta categoria são o [Sass](http://sass-lang.com/), o [Less](http://lesscss.org/){: .external } e o [Stylus](https://learnboost.github.io/stylus/).

Com JavaScript como saída, eles convertem (compilam) a partir de uma linguagem totalmente diferente, ou convertem (transcompilam) um superconjunto ou um novo padrão de linguagem para o padrão atual. Exemplos notáveis nesta categoria são o [CoffeeScript](http://coffeescript.org/){: .external } e o ES6 (via [Babel](https://babeljs.io/)).

## Depurar e editar conteúdo pré-processado

Assim que estiver no navegador e usar o DevTools para [editar o CSS](/web/tools/chrome-devtools/inspect-styles/edit-styles) ou depurar o JavaScript, um problema se torna muito aparente: o que você está vendo não reflete sua origem, e não ajuda de verdade a resolver o problema.

Para resolver isso, a maioria dos pré-processadores modernos são compatíveis com um recurso chamado <b>Source Maps</b>.

### O que são Source Maps?

Um mapa de origem é um formato de mapeamento baseado em JSOn que cria uma relação entre um arquivo minificado e suas origens. Ao desenvolver para produção, além de minificar e combinar arquivos JavaScript, você gera um mapa de origem que detém informações sobre seus arquivos originais.

### Como o Source Maps funciona

Para cada arquivo CSS que produz, um pré-processador de CSS gera um arquivo de mapa de origem (.map), além do CSS compilado. O arquivo de mapa de origem é um arquivo JSON que define um mapeamento entre cada declaração de CSS gerada e a linha correspondente no arquivo de origem.

Cada arquivo CSS contém uma anotação que especifica o URL de seu arquivo de mapa de origem, embutido em um comentário especial na última linha do arquivo:

    /*# sourceMappingURL=<url> */

Por exemplo, dado um arquivo de origem do Sass chamado **styles.scss**:

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

O Sass gera um arquivo CSS, **styles.css**, com a anotação sourceMappingURL:

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

Abaixo há um exemplo de arquivo de mapa de origem:

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## Verificar se o servidor web pode fornecer Mapas de origem

Alguns servidores web, como o Google App Engine, por exemplo, exigem configuração explícita para cada tipo de arquivo fornecido. Neste caso, os Mapas de origem devem ser fornecidos com um tipo MIME de `application/json`, mas o Chrome, na verdade, [aceitará qualquer tipo de conteúdo](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files), por exemplo, `application/octet-stream`.

### Bônus: Mapeamento de origem via cabeçalho personalizado 

Se você não quiser um comentário adicional no arquivo, use o campo do cabeçalho HTTP no arquivo JavaScript minificado para dizer ao DevTools onde encontrar o mapa de origem. Isso requer configuração ou personalização do servidor web e está além do escopo deste documento.

    X-SourceMap: /path/to/file.js.map

Como o comentário, isso diz ao DevTools e a outras ferramentas onde procurar o mapa de origem associado a um arquivo JavaScript. Esse cabeçalho ainda resolve o problema de referenciar Mapas de origem em linguagens não compatíveis com comentários de uma linha.

## Pré-processadores compatíveis

Praticamente todos os compilados para a linguagem JavaScript têm uma opção de gerar Mapas de origem hoje — incluindo Coffeescript, TypeScript, JSX e muitos outros. Você ainda pode usar os Mapas de origem no lado do servidor dentro do Nó, no nosso CSS com o Sass, Less, dentre outras funções, usando browserify, que dá a você capacidade de exigir node-style, e usando as ferramentas de minificação, como o uglify-js, que também adiciona a capacidade essencial de gerar Mapas de origem multinível.

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compilador</th>
      <th width="40%" data-th="Command">Comando</th>
      <th data-th="Instructions">Instruções</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">O sinalizador -m (--map) é tudo o que se precisa para o compilador produzir um mapa de origem, ele também tratará de adicionar o pragma do comentário sourceMapURL no arquivo produzido para você.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">A sinalização -sourcemap gerará o mapa e adicionará o pragma do comentário.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">Para <code>--source-maps=file</code>cada arquivo de saída finalizado em <code>.js</code>, haverá um arquivo de mapa de origem finalizado em <code>.map</code>. Para  <code>source-maps='inline'</code>, cada arquivo de saída finalizado em  <code>.js</code> acabará com um comentário contendo o mapa de origem criptografado em um  <code>data:</code>URL.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">Use --source-maps ou -s para gerar Mapas de origem. Use <code>--source-maps inline</code> para Mapas de origem embutidos.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">Esse é um comando muito básico necessário para gerar um mapa de origem para "file.js". Isso também adicionará o pragma do comentário ao arquivo de saída.</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">Compilador</th>
      <th width="40%" data-th="Command">Comando</th>
      <th data-th="Instructions">Instruções</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Os Mapas de origem são compatíveis com o Sass desde a versão 3.3.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">Implementado na versão 1.5.0. Consulte o<a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">problema nº 1050</a> para obter detalhes e padrões de uso.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">Esse incorporará o mapa de origem como uma string criptografa de base64 diretamente no arquivo de saída.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">Como alternativa, você pode adicionar `sourcemap: true` a seu arquivo config.rb.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">Siga o link para ver como usá-lo e absorver um mapa de origem de entrada.</td>
    </tr>
  </tbody>
</table>

## Mapas de origem e o DevTools

Agora que você já configurou os Mapas de origem corretamente, pode ficar feliz em saber que o DevTools tem compatibilidade embutida para Mapas de origem com base em CSS e em JS.

### Como editar CSS pré-processado

Siga para [Editar Sass, Less ou Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles) para saber mais sobre como editar e atualizar estilos vinculados a um mapa de origem diretamente no DevTools.

### Como editar e depurar JavaScript pré-processado

Saiba mais sobre como depurar JavaScript minificado, compilado ou transcompilado no painel Sources em [Mapear código pré-processado no código-fonte](/web/tools/chrome-devtools/debug/readability/source-maps).


{# wf_devsite_translation #}
