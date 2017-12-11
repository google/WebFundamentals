project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprenda a navegar pelo Console JavaScript do Chrome DevTools.

{# wf_updated_on: 2016-02-01 #}
{# wf_published_on: 2015-05-10 #}

# Usar o Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Aprenda a: abrir o DevTools Console, empilhar mensagens 
redundantes ou exibi-las em suas próprias linhas, apagar ou forçar 
uma saída ou salvá-la em um arquivo, filtrar a saída e acessar configurações
adicionais do Console.

### TL;DR {: .hide-from-toc }
- Abra o Console como um painel dedicado ou como uma gaveta próxima a outro painel.
- Empilhe mensagens redundantes ou exiba-as nas suas próprias linhas.
- Apague ou force a saída entre páginas, ou salve-a em um arquivo.
- Filtre a saída por nível de gravidade ocultando mensagens de rede ou por padrões de expressão regular.

## Abrir o Console

Acesse o Console como um painel dedicado em tela inteira:

![O painel do Console](images/console-panel.png)

Ou como uma gaveta que é aberta ao lado de qualquer painel:

![A gaveta do Console](images/console-drawer.png)

### Abrir como um painel

Para abrir o painel **Console** dedicado:

* Pressione <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows/Linux) ou
  <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd> (Mac).
* Se o DevTools já estiver aberto, pressione o botão **Console**.

Quando abrir o painel do Console, a gaveta do Console será recolhida automaticamente.

### Abrir como uma gaveta

Para abrir o Console como uma gaveta próxima a qualquer outro painel:

* Pressione <kbd>Esc</kbd> com o DevTools em foco.
* Pressione o botão **Customize and control DevTools** e
 **Show console**.

![Mostrar console](images/show-console.png)

## Empilhamento de mensagens

Se uma mensagem for repetida consecutivamente, em vez de gerar cada
instância da mensagem em uma nova linha, o Console "empilha" as mensagens
e exibe um número na margem esquerda. O número indica quantas vezes
a mensagem foi repetida.

![Empilhamento de mensagens](images/message-stacking.png)

Se preferir uma entrada de linha exclusiva para cada registro, ative **Show timestamp**
nas configurações do DevTools.

![Mostrar timestamp](images/show-timestamps.png)

Como o timestamp de cada mensagem é diferente, cada uma delas é exibida em
sua própria linha.

![Console com timestamp](images/timestamped-console.png)

## Trabalhar com o histórico do Console

### Apagar o histórico {: #clearing}

Você pode apagar o histórico do console realizando qualquer um dos procedimentos a seguir:

* Clique com o botão direito no Console e pressione **Clear console**.
* Digite `clear()` no Console.
* Chame `console.clear()` a partir do código JavaScript.
* Digite <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd> 
 (Mac, Windows, Linux).

### Manter o histórico{: #preserve-log}

Marque a caixa de seleção **Preserve log** na parte superior do console para manter
o histórico do console entre atualizações ou mudanças de página. As mensagens serão armazenadas
até que você apague o Console ou feche a guia.

### Salvar o histórico

Clique com o botão direito no Console e selecione **Save as** para salvar a saída
do console em um arquivo de registros.

![Salvar Console em arquivo de registros](images/console-save-as.png)

## Selecionar contexto de execução {: #execution-context }

O menu suspenso destacado em azul na captura de tela abaixo é chamado de
**Execution Context Selector**.

![Execution Context Selector](images/execution-context-selector.png)

Geralmente, o contexto é definido como `top` (o frame superior da página).

Outros frames e extensões são operados em seus próprios contextos. Para trabalhar com esses
outros contextos, você precisa selecioná-los no menu suspenso. Por exemplo,
se você quiser ver a saída de registro de um elemento `<iframe>` e modificar
uma variável que existe nesse contexto, você deve selecioná-lo no menu suspenso
Execution Context Selector.

O contexto padrão do Console é `top`, a não ser que você acesse o DevTools
inspecionando um elemento em outro contexto. Por exemplo, se você inspecionar
um elemento `<p>` em um `<iframe>`, o DevTools definirá o Execution Context
Selector para o contexto desse `<iframe>`.

Ao trabalhar em um contexto diferente de `top`, o DevTools destaca o
Execution Context Selector em vermelho, como na captura de tela abaixo. Isso ocorre porque
os desenvolvedores raramente precisam trabalhar em contextos diferentes de `top`. Pode ser
bastante confuso digitar uma variável, esperando um valor, apenas para ver que
esse valor é `undefined` (porque ele foi definido para um contexto diferente).

![Execution Context Selector destacado em vermelho](images/non-top-context.png)

## Filtrar a saída do Console

Clique no botão **Filter** 
(![botão Filter](images/filter-button.png){:.inline})
para filtrar a saída do console. Você pode filtrar por nível de gravidade, por uma expressão 
regular ou ocultando mensagens de rede.

![Saída do Console filtrada](images/filtered-console.png)

Filtrar por nível de gravidade é equivalente ao seguinte:

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">Opção &amp; Mostra</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>Mostra toda a saída do console</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td>Mostra apenas a saída de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a>.</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td>Mostra apenas a saída de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a>.</td>
  </tr>
  <tr>
    <td>Info</td>
    <td>Mostra apenas a saída de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a>.</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td>Mostra apenas a saída de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a>.</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td>Mostra apenas a saída de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a> e <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a>.</td>
  </tr>
  </tbody>
</table>

## Configurações adicionais

Abra as configurações do DevTools, acesse a guia **General** e role a página até
a seção **Console** para fazer configurações adicionais.

![Configurações do Console](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">Configuração &amp; Descrição</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Ocultar mensagens de rede</td>
    <td>Por padrão, o console reporta problemas na rede. Ativar isso instrui o console a não exibir registros para esses erros. Por exemplo, erros das séries 404 e 500 não serão registrados.</td>
  </tr>
  <tr>
    <td>Registrar XMLHttpRequests</td>
    <td>Determina se o console registra cada XMLHttpRequest.</td>
  </tr>
  <tr>
    <td>Manter registro após navegação</td>
    <td>Mantém o histórico do console durante atualizações de página ou navegação.</td>
  </tr>
  <tr>
    <td>Mostrar timestamps</td>
    <td>Adiciona uma marcação de data e hora ao início de cada mensagem do console exibida quando a chamada é feita. Útil para depurar quando determinado evento ocorre. Isso desativará o empilhamento de mensagens.</td>
  </tr>
  <tr>
    <td>Ativar formatadores personalizados</td>
    <td>Controla a <a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">formatação</a> de objetos JavaScript.</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
