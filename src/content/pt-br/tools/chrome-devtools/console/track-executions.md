project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aproveite a Console API para medir tempos de execução e contar execuções de declaração.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Medir e contar execuções {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Aproveite a Console API para medir tempos de execução e contar execuções de declaração.


### TL;DR {: .hide-from-toc }
- Use  <code>console.time()</code> e <code>console.timeEnd()</code> para controlar o tempo decorrido entre pontos de execução do código.
- Use  <code>console.count()</code> para contar quantas vezes a mesma string foi passada a uma função.


## Medir tempos de execução

O método [`time()`](./console-reference#consoletimelabel) inicia um novo cronômetro e é muito útil para medir quanto tempo algo levou. Passe uma string para o método para dar um nome ao marcador.

Quando quiser parar o cronômetro, chame [`timeEnd()`](./console-reference#consoletimeendlabel) e passe a ele a mesma string passada para o inicializador.

O console então registra o rótulo e o tempo decorrido quando o método `timeEnd()` é acionado.

### Exemplo básico

Veja como medimos a inicialização de um milhão de matrizes novas:


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

Isso resulta na seguinte saída no Console:
![Tempo decorrido](images/track-executions-time-duration.png)

### Cronômetros na linha do tempo

Quando um registro de [Linha do tempo](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) ocorre durante uma operação de `time()`, a linha do tempo também é anotada. Use-o quando quiser rastrear o que seu aplicativo faz e de onde ele vem.

A aparência de uma anotação de `time()`:

![Anotação de tempo na linha do tempo](images/track-executions-time-annotation-on-timeline.png)

### Marcar a linha do tempo

*Observação: O método `timeStamp()` só funciona quando um registro de Linha do tempo está em curso.*

O [painel Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) fornece uma visão geral completa de onde o motor gasta tempo.
Você pode adicionar um marcador à linha do tempo pelo console com [`timeStamp()`](./console-reference#consoletimestamplabel). Essa é uma forma fácil de correlacionar eventos do seu aplicativo com outros eventos.

O `timeStamp()` anota a Linha do tempo nos seguintes locais:

- Uma linha vertical amarela na vista de resumo e detalhes da Linha do tempo.
- Adiciona um registro à lista de eventos.

O exemplo a seguir mostra:


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

Resulta no seguinte timestamp da Linha do tempo:

![Timestamp na linha do tempo](images/track-executions-timestamp2.png)

## Contar execuções de declaração

Use o método `count()` para registrar uma string fornecida, além do número de vezes que essa mesma string foi fornecida. Quando a declaração exata é dada a `count()` na mesma linha, o número é aumentado.

Exemplo de código de uso do `count()` com conteúdo dinâmico:


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

Saída do exemplo de código:

![Exemplo de saída de console.count()](images/track-executions-console-count.png)




{# wf_devsite_translation #}
