project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Esta seção descreve termos comuns usados na análise de memória e aplica-se a diversas ferramentas de criação de perfis de memória para diferentes idiomas.

{# wf_updated_on: 2015-05-18 #}
{# wf_published_on: 2015-05-18 #}

# Terminologia de memória {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Esta seção descreve termos comuns usados na análise de memória e aplica-se a diversas ferramentas de criação de perfis de memória para diferentes idiomas.

Os termos e noções descritos aqui são referentes ao
[criador de perfis de pilha do Chrome DevTools](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Se você já trabalhou com Java, .NET ou outro criador de perfil de memória, isto será uma recapitulação.


## Tamanhos de objeto

Pense na memória como um gráfico com tipos primitivos (como números e strings) e objetos (matrizes associativas). Isso pode ser representado visualmente como um gráfico com diversos pontos interconectados, desta forma:

![Representação visual da memória](imgs/thinkgraph.png)

Um objeto pode reter memória de duas formas:

* Diretamente pelo próprio objeto.

* Implicitamente, mantendo referências a outros objetos e, portanto, evitando que esses objetos sejam descartados automaticamente por um coletor de lixo (abreviando, **GC**).

Ao trabalhar com o criador de perfis de pilha no DevTools (uma ferramenta para investigar problemas de memória encontrada em "Profiles"), você provavelmente analisará algumas colunas de informações diferentes. Duas colunas importantes são <strong>Shallow Size</strong> e <strong>Retained Size</strong>. Mas, o que representam essas colunas?

![Shallow e Retained Size](imgs/shallow-retained.png)

### Tamanho superficial

Esse é o tamanho da memória retida pelo próprio objeto.

Objetos típicos do JavaScript têm alguma memória reservada para descrição e armazenamento de valores imediatos. Normalmente, somente matrizes e strings podem ter um shallow size (tamanho superficial). No entanto, a memória principal de strings e matrizes externas muitas vezes fica na memória do renderizador, expondo apenas um pequeno objeto agrupador na pilha do JavaScript.

A memória do renderizador é toda a memória do processo em que uma página inspecionada é renderizada: memória nativa + memória da pilha JS da página + memória da pilha JS de todos os workers dedicados iniciados pela página. No entanto, mesmo um objeto pequeno pode manter indiretamente uma grande quantidade de memória, evitando que outros objetos sejam descartados pelo processo automático de coleta de lixo.

### Tamanho retido

É o tamanho da memória liberada quando o próprio objeto é excluído juntamente com seus objetos dependentes que foram tornados inacessíveis para as **raízes GC**.

As **raízes GC** são compostas por *identificadores* criados (localmente ou globalmente) ao fazer uma referência do código nativo para um objeto JavaScript fora do V8. Todos esses identificadores podem ser encontrados dentro de um resumo de pilha em **GC roots** > **Handle scope** e **GC roots** > **Global handles**. Descrever os identificadores nesta documentação sem entrar nos detalhes da implementação do navegador pode ser confuso. Você não precisa se preocupar com raízes GC e identificadores.

Existe muitas raízes GC internas e a maioria delas não é interessante para os usuários. A partir do ponto de vista dos aplicativos, há dois tipos de raiz:

* Objeto global de janela (em cada iframe). Há um campo de distância nos resumos de pilha, que é o número de referências a propriedade no caminho de retenção mais curto da janela.

* A árvore do DOM de documentos consiste em todos os nós do DOM nativos acessíveis que passam pelo documento. Nem todos eles necessariamente têm agrupadores JS, mas, se tiverem, ficarão ativos enquanto o documento ficar.

* Às vezes, os objetos podem ser retidos pelo contexto do depurador e pelo console do DevTools (por exemplo, após avaliação do console). Crie instantâneos de pilha com console limpo e sem pontos de interrupção ativos no depurador.

O gráfico de memória começa com uma raiz, que pode ser o objeto `window` do navegador ou o objeto `Global` de um módulo Node.js. Você não tem controle sobre a coleta de lixo desse objeto raiz.

![Não é possível controlar o objeto raiz](imgs/dontcontrol.png)

Tudo que for inacessível da raiz estará sujeito à coleta de lixo.

Observação: as colunas Shallow e Retained size representam dados em bytes.

## Árvore de retenção de objetos

A pilha é uma rede de objetos interconectados. No mundo matemático, esta estrutura é chamada de *gráfico*, ou gráfico de memória. Um gráfico é construído com *nós* conectados por meio de *bordas* e ambos recebem rótulos.

* Os **nós** (*ou objetos*) são rotulados usando o nome da função do *construtor* que foi usada para criá-los.
* As **bordas** são rotuladas usando os nomes das *propriedades*.

Saiba [como gravar um perfil usando o criador de perfil de pilha](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Uma das coisas que mais chama a atenção
na gravação do criador de perfil de pilha abaixo tem a ver com distância:
a distância da raiz de GC.
Se quase todos os objetos do mesmo tipo estiverem à mesma distância,
e alguns a uma distância maior, vale a pena investigar isso.

![Distância da raiz](imgs/root.png)

## Dominadores

Os objetos dominadores são compostos por uma estrutura de árvore porque cada objeto tem exatamente um dominador. Um dominador de um objeto pode não ter referências diretas a um objeto que domina. Ou seja, a árvore do dominador não é uma árvore abrangente do gráfico.

No diagrama abaixo:

* O nó 1 é o dominante do nó 2
* O nó 2 é o dominante dos nós 3, 4 e 6
* O nó 3 é o dominante do nó 5
* O nó 5 é o dominante do nó 8
* O nó 6 é o dominante do nó 7

![Estrutura de árvore do dominador](imgs/dominatorsspanning.png)

No exemplo abaixo, o nó `#3` é o dominador de `#10`, mas `#7` também existe em todos os caminhos simples de GC até `#10`. Portanto, um objeto B será um dominador de um objeto A se B existir em todos os caminhos simples da raiz para o objeto A.

![Ilustração animada de um dominador](imgs/dominators.gif)

## Detalhes específicos do V8

Ao criar um perfil de memória, é útil compreender porque os instantâneos de pilha têm uma determinada aparência. Esta seção descreve alguns tópicos relacionados à memória, correspondentes especificamente à **máquina virtual V8 do JavaScript** (VM V8 ou VM).

### Representação de objetos do JavaScript

Existem três tipos primitivos:

* Números (por exemplo, 3,14159...)
* Booleanos (verdadeiro ou falso)
* Strings (por exemplo, 'Werner Heisenberg')

Eles não podem fazer referência a outros valores e são sempre folhas ou nós de terminação.

Os **números** podem ser armazenados como:

* valores de um número inteiro de 31 bits imediato chamado de **números inteiros pequenos** (*SMIs*).
* objetos de pilha, conhecidos como **números de pilha**. Os números de pilha são usados para armazenar valores que não se adequam a formulários SMI, como *duplos*, ou quando um valor precisa ser *demarcado*, como na definição de suas propriedades.

As **strings** podem ser armazenadas:

* na **pilha da VM** ou
* externamente na **memória do renderizador**. Um *objeto agrupador* é criado e usado para acessar armazenamento externo em que, por exemplo, origens de script e outros conteúdos recebidos da Web são armazenados, em vez de copiados para a pilha da VM.

A memória de novos objetos JavaScript é alocada de uma pilha JavaScript dedicada (ou **pilha da VM**). Esses objetos são gerenciados pelo coletor de lixo do V8 e, portanto, permanecerão ativos enquanto houver pelo menos uma referência forte a eles.

Os **objetos nativos** são todo o resto que não está na pilha JavaScript. Objetos nativos, diferentemente de objetos de pilha, não são gerenciados pelo coletor de lixo do V8 durante o ciclo de vida, e só podem ser acessados pelo JavaScript usando seu objeto agrupador do JavaScript.

Uma **cons string** é um objeto composto de pares de strings armazenados e, em seguida, unidos, e é resultado de concatenação. A união dos conteúdos de *cons string* ocorre somente quando necessário. Um exemplo seria quando uma substring de uma string unida precisa ser construída.

Por exemplo, se você concatenar **a** e **b**, terá uma string (a, b) que representa o resultado da concatenação. Se você concatenar posteriormente **d** com esse resultado, terá outra cons string ((a, b), d).

**Matrizes** - uma matriz é um objeto com chaves numéricas. Elas são amplamente usadas na VM do V8 para armazenar grandes quantidades de dados. Os conjuntos de pares chave-valor usados como dicionários são baseados em matrizes.

Um objeto JavaScript típico pode ser um dos dois tipos de matriz usados para armazenamento:

* propriedades nomeadas e
* elementos numéricos

Em casos em que há um número bem pequeno de propriedades, elas podem ser armazenadas internamente no próprio objeto JavaScript.

**Mapa** - um objeto que descreve o tipo de objeto e seu layout. Por exemplo, os mapas são usados para descrever hierarquias de objetos implícitos para oferecer [acesso rápido a propriedades](/v8/design.html#prop_access).

### Grupos de objetos

Cada grupo de objetos nativos é composto por objetos que mantêm referências mútuas entre si. Considere, por exemplo, uma subárvore do DOM em que cada nó tem uma ligação a seus parentes e conecta-se ao próximo secundário e próximo semelhante, formando, assim, um gráfico conectado. Observe que objetos nativos não são representados na pilha JavaScript — por isso têm tamanho zero. Em vez disso, são criados objetos agrupadores.

Cada objeto agrupador mantém uma referência ao objeto nativo correspondente para redirecionar comandos a ele. Por definição, um grupo de objetos detém objetos de agrupador. No entanto, isso não cria um ciclo não coletável, já que o GC é inteligente o suficiente para liberar grupos de objetos cujos agrupadores não são mais referenciados. Mas esquecer de liberar um único agrupador reterá todo o grupo e todos os agrupadores associados.



{# wf_devsite_translation #}
