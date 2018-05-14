project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use a Console API para gravar informações no console, criar perfis JavaScript e iniciar uma sessão de depuração.

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Referência da Console API {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Use a Console API para gravar informações no console,
criar perfis JavaScript e iniciar uma sessão de depuração.


## console.assert(expression, object) {:#assert}

Grava um [erro](#error) no console quando a expressão avaliada é 
`false`. 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![Exemplo de console.assert()](images/assert.png)

## console.clear() {:#clear}

Apaga o console.


    console.clear();
    

Se a caixa de seleção [**Preserve log**](index#preserve-log) estiver marcada, 
`console.clear()` está desativado. No entanto, pressionar o botão **clear console** 
(![botão clear console](images/clear-console-button.png){:.inline})
ou digitar o atalho <kbd>Ctrl</kbd>+<kbd>L</kbd> com o Console em
foco ainda funciona. 

Consulte [Apagar o console](index#clearing) para saber mais.

## console.count(label) {:#count}

Grava o número de vezes em que `count()` foi invocado na mesma 
linha com o mesmo rótulo.


    function login(name) {
      console.count(name + ' logged in');
    }
    

![Exemplo de console.count()](images/count.png)

Consulte [Contar execuções de declaração][cse] para obter mais exemplos.

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

Idêntico a [`console.log()`](#log).

## console.dir(object) {:#dir}

Gera uma representação JavaScript do objeto especificado. Se o objeto 
sendo registrado é um elemento HTML, as propriedades da sua representação de DOM 
são geradas conforme exibido abaixo:


    console.dir(document.body);
    

![Exemplo de `console.dir()`](images/dir.png)

Saiba mais sobre o formatador de objeto de equivalência de funcionalidade (`%O`) e muito mais 
em [Substituição e formatação de strings][of].

[de]: console-write#string-substitution-and-formatting

## console.dirxml(object)

Gera uma representação XML dos elementos descendentes de `object` se 
possível, ou a representação JavaScript se não for possível. Chamar `console.dirxml()`
em elementos HTML e XML é equivalente a chamar [`console.log()`](#log).


    console.dirxml(document);
    

![Exemplo de console.dirxml()](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

Gera uma mensagem semelhante a [`console.log()`](#log), estiliza a mensagem 
como um erro e inclui um rastreamento de pilha de onde o método foi 
chamado.


    console.error('error: name is undefined');
    

![Exemplo de console.error()](images/error.png)

## console.group(object[, object, ...])

Inicia um novo grupo de registro com um título opcional. Todas as saídas do console que
ocorrerem após `console.group()` e antes `console.groupEnd()` são visualmente
agrupadas. 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![Exemplo de console.group()](images/group.png)

Você também pode aninhar grupos:


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![Exemplo de nested console.group()](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

## console.groupCollapsed(object[, object, ...])

Cria um novo grupo de registro que fica inicialmente fechado em vez de aberto. 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

Fecha um grupo de registro. Consulte [`console.group`](#group) para obter um exemplo.

## console.info(object [, object, ...])

Gera uma mensagem como [`console.log()`](#log), mas também exibe um ícone (círculo
azul com "i" branco) perto da saída. 

## console.log(object [, object, ...]) {:#log}

Exibe uma mensagem no console. Passe um ou mais objetos a este método.
Cada objeto é avaliado e concatenado em uma string de espaço delimitado.


    console.log('Hello, Logs!');
    

### Especificadores de formato {:#format-specifiers}

O primeiro objeto que você passar pode conter um ou mais **especificadores de formato**. Um
especificador de formato é composto do sinal de porcentagem (`%`) seguido de uma letra
que indica a formatação a aplicar. 

Guias relacionados:

* [Organizar a saída do console](console-write)

## console.profile([label]) {:#profile}

Inicia um perfil de CPU JavaScript com um rótulo opcional. Para concluir o 
perfil, chame `console.profileEnd()`. Cada perfil é adicionado ao painel **Profiles**
.


    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

Interrompe a sessão de criação de perfil de CPU do JavaScript atual, se houver uma em progresso, e 
gera o relatório para o painel **Profiles**.

Consulte [`console.profile()`](#profile) para obter um exemplo.

## console.time(label) {:#time}

Inicia um novo cronômetro com um rótulo associado. Quando `console.timeEnd()` é 
chamado com o mesmo rótulo, o cronômetro é parado e o tempo decorrido é
exibido no console. Os valores do cronômetro são precisos até os submilissegundos.
As strings passadas a `time()` e `timeEnd()` devem ser iguais, senão o cronômetro
não finalizará.


    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![Exemplo de console.time()](images/time.png)

## console.timeEnd(label) {:#timeend}

Para o cronômetro atual, se houver um em progresso, e apresenta o rótulo do cronômetro
seguido do tempo decorrido no Console. 

Consulte [`console.time()`](#time) para obter um exemplo. 

## console.timeStamp([label]) {:#timestamp}

Adiciona um evento à **linha do tempo** durante uma sessão de gravação. 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![Exemplo de console.timeStamp()](images/timestamp.png)

Guias relacionados:

* [Usar a ferramenta
 Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)

## console.trace(object) {:#trace}

Gera um rastreamento de pilha do ponto onde o método foi chamado. 

    console.trace();

![Exemplo de console.trace()](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

Gera uma mensagem como [`console.log()`](#log), mas também exibe um ícone de aviso 
amarelo ao lado da mensagem registrada.

    console.warn('user limit reached!');

![Exemplo de console.warn()](images/warn.png)


{# wf_devsite_translation #}
