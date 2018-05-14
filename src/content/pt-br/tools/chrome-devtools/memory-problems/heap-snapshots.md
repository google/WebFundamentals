project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Saiba como registrar resumos de pilha com o criador de perfil de pilha do Chrome DevTools e encontrar vazamentos de memória.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-06-08 #}

# Como registrar instantâneos de pilha {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Saiba como registrar resumos de pilha com o criador de perfil de pilha do Chrome DevTools e encontrar vazamentos de memória.

O criador de perfil de pilha do Chrome DevTools mostra a distribuição de memória
pelos objetos JavaScript e nós DOM relacionados em uma página
(consulte também [Árvore de retenção de objetos](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree)).
Use-o para capturar snapshots de pilha do JS, analisar gráficos de memória,
comparar instantâneos e encontrar vazamentos de memória.


## Capturar um instantâneo

No painel Profiles, escolha **Take Heap Snapshot** e clique em **Start** ou pressione <span class="kbd">Cmd</span> + <span class="kbd">E</span> ou <span class="kbd">Ctrl</span> + <span class="kbd">E</span>:

![Selecionar o tipo de criação do perfil](imgs/profiling-type.png)

Os **instantâneos** são armazenados inicialmente na memória de processo do renderizador.
Eles são transferidos ao DevTools sob demanda quando você clica no ícone do instantâneo para visualizá-lo.

Após o carregamento e a análise do instantâneo no DevTools,
o número abaixo do título do instantâneo é exibido, mostrando o tamanho dotal dos
[objetos JavaScript acessíveis](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes):

![Tamanho total dos objetos acessíveis](imgs/total-size.png)

Observação: somente os objetos acessíveis são incluídos nos instantâneos. Além disso, a captura de um instantâneo sempre começa com uma coleta de lixo.

## Limpar instantâneos

Remova instantâneos (do DevTools e da memória do renderizador) pressionando o ícone Clear all profiles:

![Remover instantâneos](imgs/remove-snapshots.png)

O fechamento da janela do DevTools não excluir os perfis da memória do renderizador. Ao reabrir o DevTools, todos os resumos capturadas anteriormente reaparecerão na lista de resumos.

<p class="note"><strong>Exemplo:</strong> Experimente este exemplo de  <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">objetos dispersos</a> e gere um perfil usando o Criador de perfil de pilha. Você deve ver um número de alocações de itens (objetos).</p>

## Visualizar instantâneos

Visualize instantâneos de diferentes perspectivas para tarefas diferentes.

A **visualização Summary** mostra objetos agrupados pelo nome do construtor. Use-o para buscar objetos (e seu uso de memória) com base no tipo agrupado pelo nome do construtor. Ela é particularmente útil para
[localizar vazamentos do DOM](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks).

A **visualização Comparison** exibe as diferenças entre dois instantâneos. Use-a para comparar dois (ou mais) resumos da memória de antes e depois de uma operação. A inspeção da diferença entre a memória liberada e a contagem de referência permite confirmar a presença e a causa de um vazamento de memória.

A **visualização Containment** permite explorar o conteúdo da pilha. Ela fornece uma melhor visualização da estrutura do objeto, ajudando a analisar objetos referenciados no espaço de nome global (janela) para descobrir o que está mantendo-os ativos. Use-a para analisar fechamentos e examinar detalhadamente seus objetos.

A **visualização Dominators** mostra a
[árvore de dominadores](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)
e pode ser útil para encontrar pontos de acumulação.
Essa visualização ajuda a confirmar se nenhuma referência inesperada a objetos permanece e se a exclusão/coleta de lixo está realmente funcionando.

Para alternar entre as visualizações, use o seletor na parte inferior da visualização:

![Seletor de alternância de visualizações](imgs/switch-views.png)

Observação: nem todas as propriedades são armazenadas na pilha do JavaScript. As propriedades implementadas que usam elementos que executam código nativo não são capturadas. Além disso, os valores que não são strings, como números, não são capturados.

### Visualização Summary

Inicialmente, um instantâneo abre a visualização Summary, exibindo totais do objeto que podem ser expandidos para mostrar instâncias:

![Visualização Summary](imgs/summary-view.png)

As entradas de nível superior são linhas de "total". Elas exibem:

* **Constructor** representa todos os objetos criados usando este construtor.
* O **número de instâncias no objeto** é exibido na # coluna.
* A coluna **Shallow size** exibe a soma de tamanhos superficiais de todos os objetos criados por determinada função do construtor. O shallow size (tamanho superficial) é o tamanho da memória detida por um objeto (geralmente, matrizes e strings têm tamanhos superficiais maiores). Veja também [Tamanhos de objeto](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* A coluna **Retained size** exibe o tamanho retido máximo dentre o mesmo conjunto de objetos. A quantidade de memória que pode ser liberada depois que um objeto é excluído (e isso torna seus dependentes inacessíveis) é chamada de tamanho retido. Veja também [Tamanhos de objeto](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* **Distance** exibe a distância para a raiz usando o caminho de nós simples mais curto.

A expansão de uma linha de total na visualização superior exibe todas as suas instâncias. Para cada instância, os tamanhos superficial e retido são exibidos nas colunas correspondentes. O número depois do caractere @ é o ID único do objeto, o que permite comparar instantâneos de pilha por objeto.

Lembre-se de que os objetos amarelos têm referências ao JavaScript e os objetos vermelhos são nós desconectados referenciados por um com fundo amarelo.

**A que correspondem as diversas entradas de construtor (grupo) no criador de perfil de pilha?**

![Grupos de construtor](imgs/constructor-groups.jpg)

* **(global property)** – intermedeia objetos entre um objeto global (como "janela") e um objeto referenciado por ele. Se um objeto for criado usando um construtor Person e for detido por um objeto global, o caminho de retenção será [global] > (global property) > Person. Isto contrasta com a norma, onde os objetos referenciam-se mútua e diretamente. Temos objetos intermediários para fins de desempenho. Globais são modificados regularmente e as otimizações de acesso à propriedade fazem um bom trabalho com objetos não globais que não são aplicáveis para globais.

* **(roots)** – As entradas da raiz na vista da árvore de retenção são as entidades que têm referências ao objeto selecionado. Elas também podem ter referências criadas pelo mecanismo por finalidades próprias. O mecanismo tem caches que referenciam objetos, mas todas essas referências são fracas e não impedem que um objeto seja coletado, já que não há referências realmente sólidas.

* **(closure)** – uma contagem de referências a um grupo de objetos por meio de fechamentos de função

* **(array, string, number, regexp)** – uma lista de tipos de objeto com propriedades que referenciam uma Matriz, uma String, um Número ou expressão regular.

* **(compiled code)** – simplesmente tudo relacionado ao código compilado. Script é parecido com uma função, mas corresponde ao corpo de um &lt;script&gt;. SharedFunctionInfos (SFI) são objetos que ficam entre funções e o código compilado. As funções normalmente têm um contexto, enquanto que os SFIs, não.

* **HTMLDivElement**, **HTMLAnchorElement**, **DocumentFragment** etc. – referências a elementos ou objetos de documento de um determinado tipo referenciados pelo código.


<p class="note"><strong>Exemplo:</strong> experimente esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">página de demonstração</a> para compreender como a visualização Summary pode ser usada.</p>

### Visualização Comparison

Encontre objetos com vazamento comparando vários instantâneos entre si. Para verificar se uma determinada operação do aplicativo não cria vazamentos (por exemplo, normalmente um par de operações direta e inversa, como abrir um documento e depois fechá-lo, não deve deixar nenhum lixo), você pode seguir este cenário:

1. Capture um instantâneo da pilha antes de realizar uma operação.
2. Realize uma operação (interaja com uma página de uma forma que acredite que cause um vazamento).
3. Realize uma operação inversa (faça a interação oposta e repita-a algumas vezes).
4. Capture um segundo instantâneo da pilha e altere sua visualização para Comparison, comparando-o com o instantâneo 1.

A diferença entre os dois instantâneos é exibida na visualização Comparison. Ao expandir uma entrada total, são exibidas as instâncias de objeto adicionadas e excluídas:

![Visualização Comparison](imgs/comparison-view.png)

<p class="note"><strong>Exemplo:</strong> experimente esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">página de demonstração</a> para ter uma ideia de como usar a comparação de instantâneos para detectar vazamentos.</p>

### Visualização Containment

A visualização Containment é essencialmente uma "visualização geral" da estrutura dos objetos de um aplicativo. Ela permite observar dentro de fechamentos de funções para ver os objetos internos da VM que compõem os objetos do JavaScript e compreender quanta memória o aplicativo usa em um nível bem baixo.

A visualização oferece diversos pontos de entrada:

* **Objetos DOMWindow** são considerados objetos "globais" para o código JavaScript.
* **Raízes GC** são as raízes GC efetivamente usadas pelo lixo da MV. As raízes GC podem ser compostas de mapas de objeto embutidos, tabelas de símbolo, pilhas de encadeamento da MV, caches de compilação, escopos de identificador e identificadores globais.
* **Objetos nativos** são objetos do navegador inseridos na máquina virtual do JavaScript para permitir automação como, por exemplo, nós do DOM e regras CSS.

![Visualização Containment](imgs/containment-view.png)

<p class="note">
  <strong>Exemplo:</strong> experimente esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">página de demonstração</a> para descobrir como explorar fechamentos e gerenciadores de evento usando a visualização.
</p>

<strong>Uma dica sobre fechamentos</strong>

É muito útil nomear as funções para permitir distinguir facilmente os fechamentos no instantâneo. Por exemplo, este exemplo não usa funções nomeadas:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

Enquanto este exemplo usa:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![Nomear funções para distinguir fechamentos](imgs/domleaks.png)

<p class="note">
    <strong>Exemplos:</strong>
    experimente este exemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">por que o eval é ruim</a> para analisar o impacto de fechamentos na memória. Você também pode ter interesse em continuar com este exemplo que mostra a gravação de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">alocações de pilha</a>.
</p>

### Visualização Dominators

A visualização [Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) exibe a árvore de dominadores para o gráfico de pilha.
Ela é parecida com a visualização Containment, mas não tem o nome das propriedades.
Isso ocorre porque um dominador de um objeto pode não ter referências diretas a ele;
a árvore de dominadores não é uma árvore abrangente do gráfico.
Mas isso ajuda,
já que é útil para identificar rapidamente pontos de acúmulo de memória.

<p class="note"><strong>Observação:</strong> no Chrome Canary, a visualização Dominators pode ser ativada acessando Settings > Show advanced heap snapshot properties e reiniciando o DevTools.</p>

![Visualização Dominators](imgs/dominators-view.png)

<p class="note">
    <strong>Exemplos:</strong>
    experimente esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">demonstração</a> para praticar a procura de pontos de acúmulo. Continue com este exemplo de encontrar <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">caminhos de retenção e dominadores</a>.
</p>

## Buscar codificação em cores

As propriedades e os valores de propriedade de objetos têm diferentes tipos e,
por isso, são coloridos. Cada propriedade tem um dos quatro tipos:

* **a: property** — propriedade regular com um nome, acessado pelo operador . (ponto), ou por notação em [ ] (colchetes), por exemplo, ["foo bar"];
* **0: element** — propriedade regular com um índice numérico, acessada por notação em [ ] (colchetes);
* **a: context var** — variável no contexto de uma função, acessível por seu nome de dentro de um fechamento de função;
* **a: system prop** — propriedade adicionada pela VM do JavaScript, não acessível pelo código JavaScript.

Objetos designados como `System `não têm um tipo de JavaScript correspondente. Elas fazem parte da implementação do sistema de objetos da MV JavaScript. O V8 aloca a maior parte dos seus objetos internos na mesma pilha que os objetos JS do usuário. Esses são apenas detalhes internos do v8.

## Encontrar um objeto específico

Para encontrar um objeto na pilha coletada, você pode pesquisar usando <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> e informando o ID do objeto.

## Descobrir vazamentos do DOM

O criador de perfis de pilha tem a capacidade de refletir dependências bidirecionais
entre objetos nativos do navegador (nós do DOM, regras CSS) e objetos JavaScript.
Isso ajuda a descobrir eventuais vazamentos invisíveis que ocorrem
devido a subárvores do DOM desconectadas que foram esquecidas e ficaram flutuando por aí.

Os vazamentos no DOM podem ser maiores do que você pensa.
Considere o exemplo a seguir - quando #tree é GC?


      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` mantém uma referência ao seu pai (parentNode) e de forma recursiva
até `#tree`. Portanto, somente quando leafRef for anulado, TODA a árvore em
`#tree` será candidata a GC.

![Subárvores do DOM](imgs/treegc.png)

<p class="note">
    <strong>Exemplos:</strong>
    experimente este exemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">nós do DOM com vazamento</a> para entender onde os nós do DOM podem vazar e como detectar esses vazamentos. Você pode continuar examinando este exemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">vazamentos no DOM maiores do que o esperado</a>.
</p>

Para ler mais sobre os vazamentos no DOM e fundamentos da análise de memória, confira
[Como encontrar e depurar vazamentos de memória com o Chrome DevTools](http://slid.es/gruizdevilla/memory), de Gonzalo Ruiz de Villa.

<p class="note">
    <strong>Exemplo:</strong>
    experimente esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">demonstração</a> para testar árvores do DOM desconectadas.
</p>




{# wf_devsite_translation #}
