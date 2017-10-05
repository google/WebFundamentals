project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A vista da árvore do DOM no painel Elements do Chrome DevTools exibe a estrutura do DOM da página web atual. Edite em tempo real o conteúdo e a estrutura da sua página com atualizações do DOM.

{# wf_updated_on: 2015-04-29 #}
{# wf_published_on: 2015-04-29 #}

# Editar o DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

A vista da árvore do DOM no painel Elements do Chrome DevTools exibe a estrutura do DOM da página web atual. Edite em tempo real o conteúdo e a estrutura da sua página com atualizações do DOM.


### TL;DR {: .hide-from-toc }
- O DOM define a estrutura da sua página. Cada nó do DOM é um elemento da página, por exemplo, um nó de cabeçalho ou de parágrafo.
- Edite em tempo real o conteúdo e a estrutura das suas páginas pelo DOM renderizado.
- No entanto, lembre-se de que você não pode modificar os arquivos de origem com mudanças no DOM no painel Elements. Recarregar a página apaga todas as modificações da árvore do DOM.
- Acompanhe as mudanças do DOM usando pontos de interrupção.


## Inspecionar um elemento {:#inspect-an-element}

Use o **painel Elements** para inspecionar todos os elementos na sua página em uma
árvore do DOM. Selecione qualquer elemento e inspecione os estilos aplicados a ele.

<video autoplay muted src="animations/inspect-element.mp4">
</video>

Existem diversas maneiras de inspecionar um elemento:

Clique com o botão direito em qualquer elemento da página e selecione **Inspect**.

![Inspecionar um elemento clicando com o botão direito](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

Pressione <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) ou <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd> (Mac) para abrir o
DevTools em modo de inspeção de elemento e, em seguida, passe o cursor sobre um elemento. O DevTools
destaca os elemento sobre o qual você passou o cursor automaticamente no
painel **Elements**. Clique no elemento para sair do modo de inspeção mantendo o
elemento em destaque dentro do painel **Elements**. 

Clique no botão **Inspect Element**
![Ícone Inspect](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline}
para ir para o modo de inspeção de elemento, e, então, clique em um elemento.

Use o método [`inspect`][inspect] no console, por exemplo,
`inspect(document.body)`.

## Navegar o DOM

Navegue pela estrutura do DOM usando o mouse ou o teclado.

Um nó recolhido tem uma seta ao lado apontada para a direita:
![nó recolhido](imgs/collapsed-node.png){:.inline}

Um nó expandido tem uma seta ao lado apontada para baixo:
![nó expandido](imgs/expanded-node.png){:.inline}

Usando o mouse:

* Clique uma vez para destacar um nó.
* Para expandir um nó, dê clique duplo em qualquer lugar nele ou clique na seta  
  próxima a ele.
* Para recolher um nó, clique na seta ao lado dele.

Usando o teclado:

* Pressione a tecla de **seta para cima** para selecionar o nó acima do atual.
* Pressione **seta para baixo** para selecionar o nó abaixo do atual.
* Pressione a tecla **seta para a direita** para expandir um nó recolhido. Pressione-a
  novamente para seguir para o primeiro secundário (agora expandido) do nó. Você pode 
 usar essa técnica para navegar rapidamente por nós profundamente aninhados.

### Navegar a trilha de navegação estruturada

Na parte inferior do painel Elements se encontra uma trilha de navegação estruturada. 

![Trilha de navegação estruturada](imgs/breadcrumb-body.png)

O nó selecionado é destacado em azul. O nó à esquerda fica o
parente do nó atual. Há esquerda se encontra o pai do nó pai.
E assim por diante, em toda a extensão da árvore.

![Estender trilha de navegação estruturada](imgs/breadcrumb-footer.png)

Se você navegar para cima na estrutura, o realce será movido:

![Navegar para cima na trilha de navegação estruturada](imgs/breadcrumb-trail.png)

O DevTools exibe quantos itens for possível na trilha.
Se a trilha inteira não couber na barra de status, uma elipse (...) 
mostra onde ela foi truncada. Clique na elipse para mostrar os 
elementos ocultos:

![Elipse na trilha de navegação estruturada](imgs/breadcrumb-ellipsis.png)

## Editar nós e atributos do DOM

Para editar o nome ou um atributo de um nó do DOM:

* Dê clique duplo diretamente no nome ou no atributo do nó.
* Realce o nó, pressione <kbd>Enter</kbd> e depois pressione <kbd>Tab</kbd>
  até que o nome ou atributo seja selecionado.
* Abra o [menu de mais ações](#more-actions) e selecione **Add Attribute**  ou 
  **Edit Attribute**. A opção **Edit Attribute** é sensível ao contexto, a parte que
 você clicar determina o que é editado.

A tag de fechamento é automaticamente atualizada quando você termina.

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### Editar um nó do DOM e seus filhos como HTML

Para editar um nó do DOM e seus filhos como HTML:

* Abra o [menu de mais ações](#more-actions) e selecione **Edit as HTML**. 
* Pressione <kbd>F2</kbd> (Windows / Linux) ou <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac).
* Pressione <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows/Linux) ou 
  <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac) para salvar as alterações. 
* Pressione <kbd>Esc</kbd> para sair do editor sem salvar.

![Editar como HTML](imgs/edit-as-html.png)

## Mover um nó do DOM

Clique, segure e arraste um nó para movê-lo.

<video autoplay muted src="animations/move-node.mp4">
</video>

## Excluir um nó do DOM

Para excluir um nó do DOM:

* Abra o [menu de mais ações](#more-actions) e selecione **Delete Node**.
* Selecione o nó e pressione a tecla <kbd>Delete</kbd>.

Observação: Se você excluir um nó por acidente, pressione <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd> (ou <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd> no Mac) para desfazer sua última ação.

## Mostrar menu more actions {:#more-actions}

O menu **more actions** permite interagir com um nó do DOM de diversas
maneiras. Para visualizar o menu, clique com o botão direito em um nó
ou selecione-o e pressione o botão **more actions** (![botão more 
action](imgs/more-actions-button.png){:.inline}). O botão só é 
exibido no elemento atualmente selecionado.

![Menu more actions](imgs/more-actions-menu.png)

## Rolar para a visualização

Quando você passa o mouse ou seleciona um nó do DOM, o nó renderizado é realçado 
na janela de visualização. Se o nó for rolado para fora da tela, você verá uma
mensagem no topo da janela de visualização se o nó estiver acima da
janela de visualização atual e uma mensagem no fundo se o nó estiver abaixo da janela de visualização
atual. Por exemplo, na captura de tela abaixo, o DevTools está indicando que o
elemento selecionado no painel **Elements** está abaixo da janela de visualização.

![Elemento abaixo da janela de visualização](imgs/below-viewport.png)

Para rolar a página para que o nó apareça na janela de visualização,
**clique com o botão direito** no nó e selecione **Scroll into View**.

## Definir pontos de interrupção do DOM

Defina pontos de interrupção do DOM para depurar aplicativos JavaScript complexos.
Por exemplo, se seu JavaScript estiver alterando a estilização de um elemento do DOM,
defina um ponto de interrupção a ser acionado quando os atributos do elemento forem modificados. Acione um ponto de interrupção em uma das seguintes mudanças do DOM: alteração de subárvore, alteração de atributo e remoção de nó.

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### Modificações de subárvore

Um ponto de interrupção de modificação de subárvore é acionado quando um elemento filho é adicionado, removido ou movido. Por exemplo, se você definir um ponto de interrupção de modificação da subárvore no elemento `main-content`, o código a seguir aciona o ponto de interrupção:


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### Modificações de atributos

Uma modificação de atributo ocorre quando o atributo de um elemento (`class, id, name`) é alterado dinamicamente:


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### Remoção de nó

Uma modificação de remoção de nó é acionada quando o nó
em questão é removido do DOM:


    document.getElementById('main-content').remove();
    

## Interagir com pontos de interrupção do DOM

Os painéis Elements e Sources incluem um painel para gerenciar os pontos de interrupção 
do DOM.

Cada ponto de interrupção é listado com um identificador de elemento e o tipo do ponto de interrupção.

![Painel de pontos de interrupção do DOM](imgs/dom-breakpoints-pane.png)

Interaja com cada ponto de interrupção listado de qualquer uma das seguintes maneiras:

* **Passe o cursor** sobre o identificador do elemento para exibir a posição correspondente 
  do elemento na página (semelhante a passar o cursor sobre nós no painel Elements).
* **Clique** em um elemento para selecioná-lo no painel Elements.
* **Marque ou desmarque** a caixa de seleção para ativar ou desativar o ponto de interrupção.

Ao acionar um ponto de interrupção do DOM, ele é destacado no painel DOM 
Breakpoints. O painel **Call Stack** exibe o **motivo** para uma 
pausa do depurador:

![Motivo do ponto de interrupção](imgs/breakpoint-reason.png)

## Visualizar detectores de evento de elemento

Visualize os detectores de evento JavaScript associados com um nó do DOM no painel 
**Event Listeners**. 

![painel event listeners](imgs/event-listeners-pane.png)

Os itens de nível superior no painel Event Listeners mostram os tipos de evento que têm 
detectores registrados.

Clique na seta ao lado do tipo de evento (por exemplo, `click`) para ver 
uma lista de detectores de evento registrados. Cada gerenciador é identificado por um identificador 
de elemento de tipo seletor CSS, como `document` ou 
`button#call-to-action`. Se mais de um gerenciador estiver registrado para o 
mesmo elemento, esse elemento será listado várias vezes.

Clique na janela de expansão ao lado do identificador de um elemento para ver as propriedades do gerenciador de evento. O painel Event Listeners lista as seguintes propriedades para cada detector:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Propriedades do detector de evento &amp; Descrição</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">Contém uma função de retorno de chamada. Clique com o botão direito na função e selecione <strong>Show Function Definition</strong> para ver onde a função está definida (se o código-fonte estiver disponível).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">Um valor booleano que define se o sinalizador <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> em <code>addEventListener</code> estava definido.</td>
    </tr>
  </tbody>
</table>

Observação: Muitas extensões do Chrome adicionam os próprios detectores de evento no DOM. Se você vir diversos detectores de evento que não foram definidos pelo seu código, pode ser conveniente reabrir a página em uma [janela anônima](https://support.google.com/chrome/answer/95464). As janelas anônimas impedem que as extensões sejam executadas por padrão.

### Visualizar detectores de evento do ancestral

{% comment %}

código para captura de tela

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">clique aqui</button>
  </div>
</body>
</html>

{% endcomment %}

Quando a caixa de seleção **Ancestors** é marcada, os detectores de evento dos 
ancestrais do nó selecionado são exibidos, além dos
detectores de evento do nó selecionado.

![opção ancestors ativada](imgs/ancestors-enabled.png)

Quando a caixa de seleção é desmarcada, somente os detectores de evento do 
nó selecionado são exibidos.

![opção ancestors desativada](imgs/ancestors-disabled.png)

### Visualizar detectores de estrutura

{% comment %}

código para captura de tela

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">clique aqui</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

Algumas estruturas e bibliotecas JavaScript encapsula eventos de DOM nativos nas 
APIs de evento personalizadas. No passado, isso dificultava a inspeção de detectores de evento
com o DevTools porque a definição da função só se referenciava de volta para 
o código da estrutura ou da biblioteca. O recurso **detectores de estrutura** soluciona 
esse problema.

Quando a caixa de seleção **Framework listeners** é marcada, o DevTools automaticamente 
resolve a estrutura ou a parte envolvida da biblioteca do código do evento e, em seguida,
ele informa onde você vinculou o evento no código.

![opção framework listeners ativada](imgs/framework-listeners-enabled.png)

Quando a caixa de seleção **Framework listeners** é desmarcada, o código do detector de evento
provavelmente será resolvido na estrutura ou no código da biblioteca. 

![opção framework listeners desativada](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
