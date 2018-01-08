project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O Chrome DevTools fornece ferramentas para ajudar a corrigir páginas da Web acionando exceções e erros de depuração no JavaScript.

{# wf_updated_on: 2015-05-12 #}
{# wf_published_on: 2015-04-13 #}

# Gestão de erros e exceções {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
O Chrome DevTools fornece ferramentas para ajudar a corrigir páginas da Web acionando exceções e erros de depuração no JavaScript.

Exceções de página e erros de JavaScript na verdade são muito úteis — se você conseguir chegar aos detalhes por trás delas. Quando uma página apresenta uma exceção ou um script produz um erro, o Console fornece informações confiáveis e específicas para ajudar a localizar e corrigir o problema. 

No Console, você pode controlar exceções e rastrear o caminho de execução que levou a elas, capturá-las explícita ou implicitamente (ou ignorá-las) e até configurar gerenciadores de erro para coletar e processar os dados da exceção automaticamente.


### TL;DR {: .hide-from-toc }
- Ative Pause on Exceptions para depurar o código quando a exceção for acionada.
- Ative a pilha de chamadas JavaScript atual usando  <code>console.trace</code>.
- Insira declarações no seu código e acione exceções usando  <code>console.assert()</code>.
- Registre erros que acontecem no navegador usando  <code>window.onerror</code>.


## Controlar exceções

Quando acontecer um erro, abra o console do DevTools (`Ctrl+Shift+J`/`Cmd+Option+J`) para visualizar as mensagens de erro do JavaScript.
Cada mensagem tem um link para o arquivo, além de o número da linha, para o qual você pode navegar.

Um exemplo de exceção:
![Exemplo de exceção](images/track-exceptions-tracking-exceptions.jpg)

### Visualizar rastreamento de pilha de exceções

Nem sempre é óbvio qual caminho de execução levou a um erro.
Pilhas de chamadas JavaScript completas acompanham exceções no console.
Expanda estas mensagens do console para ver a estrutura das pilhas e navegue para os locais correspondentes no código:

![Rastreamento de pilha de exceção](images/track-exceptions-exception-stack-trace.jpg)

### Pausar em exceções de JavaScript

Na próxima vez em que uma exceção aparecer,
pause a execução do JavaScript e verifique a pilha de chamadas,
variáveis do escopo e o estado do seu aplicativo.
Um botão de interrupção dos três estados no fim do painel Scripts permite alternar entre diferentes modos de gerenciamento de exceção: ![Botão de pausa](images/track-exceptions-pause-gray.png){:.inline}

Opte entre pausar em todas as exceções, somente em exceções não capturadas ou até ignore todas as exceções.

![Pausar execução](images/track-exceptions-pause-execution.jpg)

## Gerar rastreamentos de pilha

Entenda melhor como sua página da web se comporta
exibindo mensagens de erro no console.
Torne os registros mais informativos incluindo rastreamentos de pilha associados. Há diversas formas de fazer isso.

### Error.stack
Cada objeto Error tem uma propriedade string chamada de pilha que contém o rastreamento de pilha:

![Exemplo de Error.stack](images/track-exceptions-error-stack.jpg)

### console.trace()

Equipe seu código com chamadas de [`console.trace()`](./console-reference#consoletraceobject) que mostrem as pilhas de chamada JavaScript atuais:

![Exemplo de console.trace()](images/track-exceptions-console-trace.jpg)

### console.assert()

Insira declarações no seu código JavaScript chamando [`console.assert()`](./console-reference#consoleassertexpression-object)
com a condição do erro como o primeiro parâmetro.
Quando esta expressão avalia como falso,
você verá um registro correspondente no console:

![Exemplo de console.assert()](images/track-exceptions-console-assert.jpg)

## Como avaliar o rastreamento de pilha para encontrar acionadores

Vejamos como usar as ferramentas que acabou de conhecer
para encontrar a causa real de um erro.
Veja uma página HTML simples que inclui dois scripts:

![Exemplo de código](images/track-exceptions-example-code.png)

Quando o usuário clica na página,
o parágrafo muda seu texto interno
e a função `callLibMethod()` fornecida por `lib.js` é chamada.

Esta função gera um `console.log`
e, em seguida, chama `console.slog`,
um método não fornecido pela API Console.
Isto deve disparar um erro.

Quando a página está em execução e você clica nela,
este erro é disparado:

![Erro disparado](images/track-exceptions-example-error-triggered.png)

Clique na seta para poder expandir a mensagem de erro:

![Mensagem de erro expandida](images/track-exceptions-example-error-message-expanded.png)

O Console informa que o erro foi disparado em `lib.js`, linha 4,
que foi chamado por `script.js` no retorno de chamada `addEventListener`,
uma função anônima, na linha 3.

Este é um exemplo muito simples,
mas mesmo a depuração de rastreamento de registros mais complicada segue o mesmo processo.

## Gerenciar exceções em tempo de execução usando window.onerror

O Chrome expõe a função do gerenciador de `window.onerror`,
chamada sempre que um erro ocorre na execução do código JavaScript.
Sempre que uma exceção JavaScript é apresentada no contexto da janela e
não é capturada por um bloco try/catch,
a função é invocada com a mensagem da exceção,
o URL do arquivo em que a exceção foi acionada
e o número da linha desse arquivo,
passados como três argumentos, nessa ordem.

Pode ser útil para você definir um gerenciador de erros para coletar informações sobre exceções não capturadas e relatá-las de volta ao seu servidor usando uma chamada de AJAX POST, por exemplo. Desta forma, você pode registrar todos os erros que acontecem no navegador do usuário e receber notificações deles.

Exemplo de uso de `window.onerror`:

![Exemplo de gerenciador de window.onerror](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
