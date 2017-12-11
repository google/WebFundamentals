project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Registrar no Console é algo eficaz para inspecionar o que sua página ou seu aplicativo faz. Vamos começar com console.log() e explorar outros usos avançados.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Diagnosticar e registrar no Console {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Registrar no Console é algo eficaz para inspecionar o que sua página ou seu aplicativo faz. Vamos começar com console.log() e explorar outros usos avançados.


### TL;DR {: .hide-from-toc }
- Use <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> para  registros básicos
- Use <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> e <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> para coisas que chamam a atenção
- Use <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> e <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> para agrupar mensagens relacionadas e evitar desorganização
- Use <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> para exibir mensagens de erro condicional


## Gravar no console

Use o método <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> para registros básicos no console. Ele assume uma ou mais expressões como parâmetros e grava seus valores atuais no console, concatenando diversos parâmetros em uma linha de espaço delimitado.

Executar esta linha de código no JavaScript:


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

Produzirá isto no Console:
![Registrar múltiplos](images/console-write-log-multiple.png)

## Preencher comandos automaticamente {:#autocomplete}

o digitar no Console, ele automaticamente exibe um menu suspenso de 
preenchimento automático de métodos relevantes correspondentes ao texto 
que você digitou. Isso inclui comandos anteriormente executados.

![exemplo de preenchimento automático](images/autocomplete.png)

## Organizar saída do Console{:#organizing}

### Agrupar mensagens

Você pode agrupar saídas relacionadas com comandos de grupo. O comando [`console.group()`](./console-reference#consolegroupobject-object-) assume um parâmetro com uma string para definir o nome do grupo. Depois de chamá-lo no JavaScript, o console começará a agrupar todas as saídas subsequentes.

para encerrar o agrupamento, você só precisa chamar [`console.groupEnd()`](./console-reference#consolegroupend) quando terminar.

Exemplo de entrada:


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

Exemplo de saída:
![Saída simples de grupo do console](images/console-write-group.png)

#### Grupos aninhados

Grupos de registro também podem ser aninhados. Isso é útil porque possibilita ver um grupo grande em partes pequenas.

Este exemplo mostra um grupo de registro para a fase de autenticação de um processo de acesso de login:


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

E esta é a saída dos grupos aninhados no console:
![Saída simples de grupo do console](images/console-write-nestedgroup.png)

#### Grupos de recolhimento automático

Ao usar grupos demasiadamente, pode ser útil não ver tudo o que acontece. Nesses momentos, você pode recolher grupos automaticamente chamando [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) em vez de `console.group()`:


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

Saída groupCollapsed():
![Grupo inicialmente recolhido](images/console-write-groupcollapsed.png)

## Erros e advertências

Erros e advertências funcionam da mesma forma que o registro normal. A única diferença é que `error()` e `warn()` têm estilos para chamar a atenção.

### console.error()

O método [`console.error()`](./console-reference#consoleerrorobject--object-) exibe um ícone vermelho junto de uma mensagem de texto vermelho:


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

vira

![Exemplo de erro de saída](images/console-write-error-server-not-resp.png)

### console.warn()

O método [`console.warn()`](./console-reference#consolewarnobject--object-) exibe um ícone de advertência amarelo com a mensagem de texto:


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

vira

![Exemplo de advertência](images/console-write-warning-too-few-nodes.png)

## Declarações

O método [`console.assert()`](./console-reference#consoleassertexpression-object) exibe uma string de erro condicionalmente (seu segundo parâmetro) somente se seu primeiro parâmetro avaliar como `false`.

### Uma declaração simples e como ela é exibida

O código a seguir gerará uma mensagem de erro no console somente se o número dos nós secundários que pertencem ao elemento `list` for superior a 500.


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

Como uma falha de declaração é exibida no console:
![Falha na declaração](images/console-write-assert-failed.png)

## Substituição e formatação de strings

O primeiro parâmetro passado a qualquer método de registro pode conter um ou mais especificadores de formato. Um especificador de formato é composto de um símbolo `%` seguido de uma letra que indica a formatação que se aplica ao valor. Os parâmetros depois da string aplicam-se aos marcadores em ordem.

O exemplo a seguir usa a string e formatadores de dígito para inserir valores na string de saída. Você verá "Sam has 100 points" no console.

    console.log("%s has %d points", "Sam", 100);

A lista completa de especificadores de formato é:

| Especificador | Saída                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | Formata o valor como uma string                                                     |
| %i or %d  | Formata o valor como um número inteiro                                                   |
| %f        | Formata o valor como um valor de ponto flutuante                                       |
| %o        | Formata o valor como um elemento de DOM expansível. Como visto no painel Elements     |
| %O        | Formata o valor como um objeto JavaScript expansível                              |
| %c        | Aplica regras de estilo CSS à string de saída conforme especificado pelo segundo parâmetro |

Este exemplo usa o especificador de dígito para formatar o valor de `document.childNodes.length`. Ele também usa o especificador de ponto flutuante para formatar o valor de `Date.now()`.

O código:


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

A saída do exemplo de código anterior:
[Exemplo de saída de substituição](images/console-write-log-multiple.png)

### Atribuir estilo à saída do console com CSS

O especificador de formato CSS permite personalizar a exibição no console.
Comece a string com o especificador e atribua o estilo que deseja aplicar como segundo parâmetro.

Teste este código:


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

..para deixar sua saída de registro grande e azul:

![String formatada](images/console-write-format-string.png)

### Formatar elementos de DOM como objetos JavaScript

Por padrão, elementos de DOM são registrados no console como representações do HTML, mas às vezes você pode querer acessar o elemento de DOM como um objeto JavaScript e verificar suas propriedades. Você pode usar o especificador de string `%o` (ver acima) ou usar o `console.dir` para fazer isso: 

![Registrar um elemento usando dir()](images/dir-element.png)




{# wf_devsite_translation #}
