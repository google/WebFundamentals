project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use pontos de interrupção para suspender código JavaScript e investigar valores de variáveis e da pilha de chamadas no momento da interrupção.

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Como configurar pontos de interrupção {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use pontos de interrupção para suspender código JavaScript e investigar
valores de variáveis e da pilha de chamadas no momento da
interrupção.

Após configurar os pontos de interrupção, aprenda a percorrer o código
e investigar variáveis e pilhas de chamadas em [Como percorrer o
código](step-code).


### TL;DR {: .hide-from-toc }
- A forma mais básica de configurar um ponto de interrupção é adicionar manualmente um deles a uma linha específica do código. Você pode configurar esses pontos de interrupção para serem acionados somente quando uma determinada condição é atendida.
- Além disso, é possível configurar pontos de interrupção que são acionados quando condições gerais são atendidas, como um evento, uma modificação do DOM ou uma exceção não capturada.


## Configurar um ponto de interrupção em uma determinada linha de código {:#line-number}

A configuração de um ponto de interrupção em uma determinada linha de código é útil quando você sabe
qual instrução quer investigar. Por exemplo, se o
seu fluxo de trabalho de acesso não estiver funcionando como o esperado e só houver uma função no
código que trata do acesso, é seguro presumir que o erro
provavelmente está nessa função. Nesse caso, faz sentido adicionar um
ponto de interrupção na primeira linha dessa função.

Quando você configurar um ponto de interrupção em uma linha de código, o código será sempre interrompido nessa
linha de código até que você remova ou desative o ponto de interrupção, ou torne-o
condicional.

Para configurar um ponto de interrupção em uma determinada linha de código, abra antes o painel **Sources**
e selecione o script na seção **File Navigator** à
esquerda. Se não conseguir ver o **File Navigator**, pressione o botão **Toggle file
navigator**
(![botão hide/show file navigator][fn]{:.devtools-inline}).


**Dica**: Se estiver trabalhando com código minificado, pressione o botão **pretty print**

(![botão pretty print][pp]{:.devtools-inline})
para torná-lo legível. 

No lado esquerdo do código-fonte, você pode ver números de linha. Esta região
é chamada de **calha de número de linha**. Clique na calha do número de linha para
adicionar um ponto de interrupção nessa linha de código.

![ponto de interrupção de número de linha][lnb]

Se uma expressão for distribuída em diversas linhas e você inserir um
ponto de interrupção em uma linha no meio da expressão, o DevTools configurará o ponto de interrupção
na próxima expressão. Por exemplo, se você tentar configurar o ponto de interrupção na linha
4 na captura de tela abaixo, o DevTools colocará o ponto de interrupção na linha 6.

![ponto de interrupção no meio da expressão](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### Tornar condicional um ponto de interrupção de número de linha

Um ponto de interrupção condicional somente será acionado quando a condição especificada
for verdadeira.

Clique com o botão direito em um número de linha que ainda não tem um ponto de interrupção e
pressione **Add conditional breakpoint** para criar um ponto de interrupção condicional.
Se você já adicionou um ponto de interrupção a uma linha de código e quiser tornar
esse ponto de interrupção condicional, clique com o botão direito e pressione **Edit breakpoint**.

Insira a condição no campo de texto e pressione <kbd>Enter</kbd>.

![adicionar condição][ac]

Os pontos de interrupção condicionais são dourados. 

![ponto de interrupção condicional][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### Excluir ou desativar um ponto de interrupção de número de linha

Se você quiser ignorar temporariamente um ponto de interrupção, desative-o.
Clique com o botão direito na **calha do número de linha** e selecione **Disable
breakpoint**.

![desativar ponto de interrupção][db]

Se você não precisar mais de um ponto de interrupção, exclua-o. Clique com o botão direito na 
**calha do número de linha** e selecione **Remove breakpoint**.

Você também pode gerenciar todos os pontos de interrupção de número de linha em todos os
scripts a partir de um único local. Esse local é o painel **Breakpoints**
no painel **Sources**.

Para excluir um ponto de interrupção da IU do painel **Breakpoints**, clique com o botão direito nele
e selecione **Remove breakpoint**.

![painel de pontos de interrupção][bp]

Para desativar um ponto de interrupção nesse painel, desative sua caixa de seleção.

Para desativar todos os pontos de interrupção, clique com o botão direito nesse painel e selecione **Deactivate
breakpoints**. O resultado será o mesmo da opção **Disable All
Breakpoints**.

Também é possível desativar todos os pontos de interrupção pressionando o botão **deactivate
breakpoints**
(![botão deactivate breakpoints][dbb]{:.devtools-inline}), também no painel 
**Sources**.

[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## Configurar um ponto de interrupção em uma modificação do DOM {:#dom}

Use um ponto de interrupção de modificação do DOM quando houver um bug no código que
modifica, exclui ou adiciona incorretamente um nó do DOM.

Em vez de procurar manualmente o código que causa a mudança, o
DevTools permite que você configure um ponto de interrupção no nó. Sempre que o nó ou,
em alguns casos, um de seus filhos, for adicionado, excluído ou alterado,
o DevTools interromperá a página e mostrará a linha exata de código
responsável pela mudança.

Veja a seguir uma demonstração ao vivo para aprender a configurar pontos de interrupção de modificação do DOM.
Clique em **Increment** para incrementar **Count** em um. Teste agora.

Neste tutorial interativo, o seu objetivo é configurar um ponto de interrupção de modificação do DOM
acionado quando **Count** for incrementado, permitindo que você inspecione o
código que modificou **Count**.

{% framebox height="auto" %}
<p><b>Demonstração de pontos de interrupção de modificação do DOM</b></p>
<button>Increment</button>
<p>Count: <span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

Para **adicionar o ponto de interrupção de modificação do DOM**:

1. Clique com o botão direito em **Count** e selecione **Inspect**. O DevTools destaca
   o nó com azul. Ele deveria ser um nó `<p>`. Você pode confirmar que está no
   nó correto clicando duas vezes nele, o que expande o nó e
   exibe seu conteúdo.

1. Clique com o botão direito no nó destacado e selecione **Break on** >
   **Subtree Modifications**. O ícone azul ![ícone DOM 
   breakpoint][icon]{:.devtools-inline} à esquerda do nó indica que um ponto de interrupção
   do DOM está configurado no nó. É um pouco difícil ver o ícone enquanto
   o nó está destacado, pois é um ícone azul em um fundo
   azul.

1. Voltando à demonstração, clique em **Increment**. O DevTools interrompe a página,
   vai para **Sources** e destaca a linha de código do script que está
   fazendo a mudança.

1. Pressione **Resume script execution** ![botão resume script
   execution][resume]{:.devtools-inline} duas vezes para
   retomar a execução do script. Você precisa pressionar o botão duas vezes porque o ponto de interrupção é
   acionado uma vez quando o texto da contagem é excluído e mais uma vez quando o
   texto é atualizado com a nova contagem.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

Para interromper quando um atributo do nó selecionado for alterado ou quando o 
nó selecionado for excluído, basta selecionar **Attributes modifications** ou
**Node Removal** em vez de **Subtree Modifications** na etapa 2 acima.

Dica: esses pontos de interrupção não são exclusivos. É possível ter dois ou todos esses três pontos de interrupção ativados em um único nó ao mesmo tempo.

Para **desativar temporariamente o ponto de interrupção**:

1. No DevTools, volte para **Elements**.
1. Clique em **DOM Breakpoints**. Se a janela do DevTools for pequena, **DOM
   Breakpoints** poderá estar oculto atrás do menu flutuante ![menu
   flutuante][overflow]{:.devtools-inline}. Você deverá ver uma caixa de seleção com o texto `p`
   ao lado e **Subtree Modified** abaixo do `p`.
1. Desative a caixa de seleção ao lado de **Subtree Modified**.
1. Tente clicar novamente em **Increment**. O contador é incrementado e o DevTools não
   interrompe a página.

Dica: passe o cursor sobre `p` para destacar o nó na janela de visualização. Clique em `p` para
selecionar o nó em **Elements**.

Para **excluir o ponto de interrupção**:

1. Acesse **DOM Breakpoints**.
1. Clique com o botão direito no ponto de interrupção que deseja excluir e selecione
   **Remove breakpoint**.

[icon]: imgs/dom-breakpoint-icon.png
[overflow]: imgs/overflow.png

### Mais informações sobre os tipos de ponto de interrupção de modificação do DOM

Veja a seguir informações mais detalhadas sobre exatamente quando e como cada tipo de
ponto de interrupção de modificação do DOM é acionado:

* **Modificações de subárvore**. Acionadas quando um secundário do nó
  selecionado é removido, adicionado, ou o conteúdo de um secundário é alterado. Não
  acionadas em mudanças de atributo do nó secundário nem em mudanças do
  nó atualmente selecionado.

* **Modificações de atributos**: Acionadas quando um atributo é adicionado ou removido
  no nó atualmente selecionado ou quando o valor de uma tributo muda.

* **Remoção de nó**: Acionado quando o nó selecionado no momento é removido.

## Interromper em XHR

Há duas formas de acionar pontos de interrupção em XHRs: quando *qualquer* XHR atinge
uma determinada fase do seu ciclo de vida (`readystatechange`, `load`, etc.) ou
quando o URL de um XHR corresponder a uma string específica. 

Se você quiser interromper em uma determinada fase do ciclo de vida do XHR, confira a categoria
**XHR** no [painel de pontos de interrupção de detector de evento](#events).

Para interromper quando o URL de um XHR corresponder a uma string específica, use a seção **XHR
Breakpoints** no painel **Sources**. 

![painel XHR breakpoints][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

Clique no botão como sinal de mais para adicionar um novo padrão de ponto de interrupção. Insira a string
no campo de texto e pressione <kbd>Enter</kbd> para salvá-la.

**Dica**: clique no sinal de mais e pressione imediatamente <kbd>Enter</kbd> para
acionar um ponto de interrupção antes que qualquer XHR seja enviado.

## Interromper quando um evento é acionado {:#events}

Use a seção **Event Listener Breakpoints** no painel **Sources** para
interromper quando um determinado evento (por exemplo, `click`) ou categoria de eventos (por exemplo, qualquer
evento de `mouse`) for acionado.

![painel event listener breakpoints][elbp]

O nível superior representa as categorias de eventos. Marque uma destas caixas de seleção
para pausar sempre que algum evento da categoria for acionado. Expanda
a categoria de nível superior para ver quais eventos ela abrange.

Se você quiser monitorar um evento específicos, encontre a categoria de nível superior à qual
o evento pertence e ative a caixa de seleção ao lado do evento de destino.

![painel event listener breakpoints expandido][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## Pontos de interrupção de exceção {:#exceptions}

Use pontos de interrupção de exceção para interromper um script quando
uma exceção é acionada e acessar a linha de código que acionou
a exceção.

A demonstração a seguir tem um bug. Siga as instruções abaixo
para aprender a corrigir o bug usando um ponto de interrupção de exceção.

{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>Random Number: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. Clique em **Print Random Number**. O rótulo **Random Number** abaixo do
   botão deveria imprimir um número aleatório, mas isso não está acontecendo.
   Esse é o bug que você corrigirá.
1. Pressione <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) para
   abrir o DevTools.
1. Clique na guia **Sources**.
1. Clique em **Pause on exceptions** ![Pausar em
   exceções][pause on exception]{:.devtools-inline}.
1. Clique em **Print Random Number** novamente para acionar o ponto de interrupção.
   O DevTools deve estar pausado na linha de código que contém
   `nodes.number.textContent = Math.random();`. Agora você sabe tudo
   o que é necessário para usar pontos de interrupção de exceção. O resto das instruções
   explica como resolver esse bug específico.
1. Na linha de código em que o DevTools está pausado, passe o cursor sobre `nodes`
   para garantir que o objeto esteja devidamente referenciado. Você verá
   que ele contém três propriedades: `button`, `num` e `__proto__`.
   Tudo aqui parece estar OK. A origem do bug não está aqui.
1. Passe o cursor sobre `number`. Você verá que ele é avaliado como `undefined`.
   Esse é o motivo do bug. O nome da propriedade deveria ser
   `num` e não `number`.
1. No DevTools, altere `nodes.number.textContent` para `nodes.num.textContent`.
1. Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) para salvar a alteração.
   O DevTools retoma automaticamente a execução do script após salvar uma alteração.
1. Pressione **Print Random Number** novamente para verificar se a correção resolveu
   o bug. O DevTools não deve mais pausar após o clique no botão, o que
   significa que o script não está mais acionando uma exceção.

[pause on exception]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
