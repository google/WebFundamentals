project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Adicione breakpoints no Chrome DevTools para rapidamente e efetivamente debugar código problemático.

{# wf_updated_on: 2015-09-02 #}
{# wf_published_on: 2000-01-01 #}

# Como trabalhar com breakpoints {: .page-title }


Usar breakpoints é uma das maneiras mais efetivas de debugar código. Breakpoints
permitem que você pause a execução de um script e então investigue o <i>call stack</i>
e os valores das variáveis em um determinado momento. Existem dois tipos de breakpoints
à sua disposição: manuais qe condicionais.

* Breakpoints manuais são breakpoints individuais que você define em uma
  linha específica de código. Você pode defini-los usando a interface do Chrome DevTools, ou
  inserindo a palavra chave `debugger` no seu código.
* Breakpoints condicionais são acionados quando uma condição específica for
  válida (por exemplo, um evento `onclick` é disparado, uma exceção é lançada, e
  assim por diante). Você habilita eles através da interface do DevTools,
  e então o DevTools automaticamente interrompe a execução sempre
  que a condição especificada for válida.


### TL;DR {: .hide-from-toc }
- Use breakpoints manuais para pausar a execução do script em uma determinada linha de código.
- Use breakpoints condicionais para pausar quando uma determinada condição for valida.
- 'Defina breakpoints condicionais para alterações do DOM, requisições XHR, event listeners, e exceções não tratadas.'


## Visualize os breakpoints

Visualize os breakpoints existentes a qualquer momento no painel Sources:

1. Abra o menu do Chrome ![menu do Chrome](imgs/image_0.png){:.inline}.
2. Escolha **Mais ferramentas** > **Ferramentas do desenvolvedor**, ou clique com o botão direito em algum elemento
   da página e escolha **Inspecionar** no menu de contexto.
3. Selecione o painel **Sources**.

Os breakpoints são exibidos na barra lateral, agrupados por tipos.

![Barra lateral de breakpoints](imgs/image_1.png)

## Crie breakpoints manuais

Breakpoints manuais são breakpoints que você define em uma única linha de código. Existem duas maneiras de
de definir breakpoints manuais, por meio da interface do DevTools, ou inserindo a palavra chave `debugger`
no seu código.

Use breakpoints manuais quando você tiver uma forte suspeita de onde seu código está falhando,
e quiser inspecionar a pilha de chamadas e os valores das variáveis naquele exato momento.

### Adicione um breakpoint manual em uma única linha de código

Para adicionar um breakpoint de linha:

* Clique no número da linha na linha em que você deseja
  definir o breakpoint. Você pode adicionar múltiplos breakpoints clicando no
  número de cada linha.
* Insira a palavra chave `debugger`no seu código, do qual é
  equivalente a definir um breakpoint naquela linha.

![Line breakpoint](imgs/image_2.png)

Para temporariamente desabilitar um breakpoint, desmarque seu respectivo checkbox na barra lateral.

Para remover um breakpoint, clique no número da linha novamente. Ou, clique com o botão direito
no breakpoint na barra lateral, e então selecione **Remove breakpoint**.

## Crie breakpoints condicionais

Breakpoints condicionais são disparados quando uma condição específica for
cumprida (por exemplo, um evento `onclick` é disparado, ou uma exceção é lançada).
Você habilita eles usando a interface do DevTools,
e então o DevTools automaticamente pausa a execução sempre que a condição
especificada for atendida.

Use breakpoints condicionais quando você precisar definir diversos breakpoints de uma vez.
Por exemplo, suponha que você está tendo erros quando nós do DOM são removidos.
Existem 20 lugares diferentes de onde o erro pode estar se originando. Ao invés de
colocar um breakpoint manual antes de cada instrução suspeita, você pode definir
apenas um breakpoint condicional. O breakpoint é acionado sempre que qualquer código
remover um nó do DOM.

O DevTools fornece quatro tipos de breakpoints condicionais:

* Eventos de mutação do DOM (inserções, modificações, deleções)
* `XMLHttpRequest`
* listeners de eventos do JavaScript
* Exceções não tratadas

### Pause antes do evento de mutação do DOM

Use o breakpoint do evento de mutação do DOM quando o script estiver prestes a inserir, alterar,
ou deletar um nó do DOM e você quiser isolar e observar a mudança enquanto ela ocorre.
A execução pausa pausa quando um nó específico do DOM estiver prestes a ser modificado, antes que a modificação
seja aplicada (veja também [Edite o DOM](/web/tools/chrome-devtools/inspect-styles/edit-dom)).

Para adicionar um breakpoint de mutação do DOM, abra o painel Elements e clique com o botão direito em algum elemento.
A partir do menu de contexto, clique **Break on…**, e então escolha uma das opções:
**Subtree modifications**, **Attributes modifications**, ou **Node removal**.

![Breakpoint de mutação do DOM](imgs/image_3.png)

Temporariamente desabilit um breakpoint do DOM limpando seu checkbox na barra lateral.

Para remover um breakpoint do DOM, clique com o botão direito no elemento novamente, e então clique
**Break on…**, e então escolha a opção já habilitada. Ou, clique com o botão direito no
breakpoint na barra lateral e escolha **Remove breakpoint**.

### Pause no `XMLHttpRequest`

Existem duas maneiras de você criar breakpoints condicionais para um `XMLHttpRequest`:

* Quando a URL de uma requisição conter uma string específica. O DevTools pausa antes
  que a requisição seja enviada.
* Antes de um evento `XMLHttpRequest` específico (por exemplo, `load`, `timeout`, `error`). O DevTools
  pausa antes que o evento `XMLHttpRequest` específico seja disparado.

#### Pause quando a URL do XMLHttpRequest tiver uma string específica

Para pausar quando a URL de uma `XMLHttpRequest` tiver uma string específica:

1. Clique no botão **Add XHR breakpoint**
   ![Adicione o breakpoint XHR](imgs/image_4.png){:.inline} na barra lateral.
2. No campo **Break when URL contains**, digite a string que a
   URL deverá conter quando você quiser que a requisição XHR pare e pressione
   **Enter**.

![XMLHttpRequest breakpoint](imgs/image_5.png)

Para editar o campo, dê um clique duplo no breakpoint.

Para remover o breakpoint, clique direito no breakpoint na barra lateral, e então
escolha **Remove breakpoint**.

#### Pause antes de evento `XMLHttpRequest` específico

Para pausar antes que um evento `XMLHttpRequest` específico seja disparado:

1. Vá para o painel **Event Listener Breakpoints**.
2. Abra o menu dropdown **XHR**.
3. Selecione o estágio no ciclo de vida do evento do qual você pausar.
   O DevTools naquele estágio para todos os eventos `XMLHttpRequest`.

![Breakpoints disponíveis para eventos XMLHttpRequest](imgs/xhr-events.png)

### Pause antes que o listener do evento JavaScript seja disparado

Use o breakpoint do listener do evento JavaScript
quando você quiser ver como um determinado evento
(tal como keypress ou dblclick) for processado pelo script.
A execução pausa antes que o listener do evento seja disparado (veja também
[Veja listeners de evento do elemento](/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom#view-element-event-listeners)).

Para adicionar um breakpoint de listener de evento JavaScript:

1. Expanda a seção **Event Listener Breakpoints** na barra lateral,
   e então expanda a categoria do listener onde você quer pausar
   (**Animation**, **Clipboard**, **Control**, etc.).
2. Sob a categoria expandida, clique no checkbox para o(s) tipo(s)
   de listener que devem disparar uma pausa. Para escolher todos os possíveis
   tipos de listener em uma categoria, clique no checkbox para a própria categoria.

![Breakpoint de listener de evento](imgs/image_6.png)

Remova um breakpoint de listener de evento limpando seu checkbox.

### Pause em exceções não tratadas

Clique no botão **Pause on Exceptions**
(![botão "pause on exceptions"](imgs/pause-on-exception-button.png){:.inline})
no painel **Sources** do DevTools para pausar a execução do script em qualquer
exceção não tratada.

Na animação abaixo, o botão **Pause on Exceptions** é clicado, um
botão na página é clicado, e uma exceção não tratada é disparada.
O DevTools automaticamente pausa na linha onde a exceção é lançada.

<video src="animations/pause-on-uncaught-exception.mp4">
</video>

You can also view the call stack leading up to an uncaught exception
in the DevTools console. In the animation below, a button is clicked,
an uncaught exception is triggered,
and then the carat next to the uncaught exception message (`Uncaught 0`) in the
DevTools console is clicked. The call stack leading up to the exception
is displayed in the console.

<video src="animations/exception-in-console.mp4">
</video>

## Nunca Pause Aqui {#never-pause-here}

Ás vezes breakpoints condicionais farão o DevTools pausar repetidamente
em uma linha que não é relevante ao problema que você está debugando. Você pode dizer
para o debugger nunca pausar em uma linha específica.

1. Clique com o botão direito no número da linha.
2. Selecione "Never pause here" a partir do menu de contexto.

![Never Pause Here](imgs/never-pause-here.png)

Você também pode usar essa técnica para desabilitar as instruções `debugger`.


Translated By: 
{% include "web/_shared/contributors/alansilva.html" %}
