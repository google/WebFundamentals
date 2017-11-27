project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use o painel Styles do Chrome DevTools para inspecionar e modificar os estilos CSS associados a um elemento.

{# wf_updated_on: 2016-02-25 #}
{# wf_published_on: 2015-04-13 #}

# Editar estilos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Use o painel <strong>Styles</strong> para modificar os estilos CSS
associados a um elemento.

![Painel Styles](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- O painel Styles permite alterar o CSS de todas as formas possíveis, localmente, incluindo editando estilos existentes, adicionando novos estilos e adicionando regras para estilos.
- Se quiser que os estilos persistam (para que não desapareçam após um recarregamento), você deve persisti-los no espaço de trabalho de desenvolvimento.


## Inspecionar estilos aplicados a um elemento

[Selecione um elemento](edit-dom#inspect-an-element) para inspecionar seus estilos.
O painel **Styles** exibe as regras de CSS que se aplicam ao elemento selecionado, 
em ordem decrescente de prioridade:

* No topo, está `element.style`. Esses são os estilos aplicados diretamente 
  ao elemento usando a propriedade style (por exemplo, 
  `<p style="color:green">`) ou no DevTools.

* Abaixo deles, ficam as regras de CSS correspondentes do elemento. Por exemplo, na
  imagem abaixo, o elemento selecionado recebe `line-height:24px` de
  uma regra definida em `tools.css`.

* Abaixo delas, ficam os estilos herdados, que incluem regras de estilo 
  herdáveis que correspondem aos ancestrais do elemento selecionado. Por exemplo, na
 captura de tela no elemento selecionado herda `display:list-item` de
 `user agent stylesheet`.

Os rótulos na imagem abaixo correspondem aos itens numerados abaixo dela.

![Painel Annotated Styles](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. Estilos associados a um seletor correspondente ao elemento.
2. [Folhas de estilo do user-agent](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)
 são claramente rotuladas e, muitas vezes, são modificadas pelo CSS na página da Web.
3. Regras que foram modificadas por **regras em cascata** são exibidas com
 texto riscado.
4. Estilos **herdados** são exibidos como um grupo no cabeçalho "Inherited
 from `<NODE>`". Clique no nó do DOM no cabeçalho para navegar para
   sua posição na vista da árvore do DOM. (A [tabela de propriedades
   CSS 2.1](http://www.w3.org/TR/CSS21/propidx.html) mostra quais propriedades
   são herdáveis.)
5. Dados com coloração cinza são regras não definidas, mas
   **calculadas em tempo de execução**.

Entender como a cascata e as heranças funcionam é essencial para
depurar os estilos. A cascata tem relação com como as declarações em CSS têm
pesos para determinar que regras têm precedência ao sobrepor outra regra. A herança tem relação com como os elementos HTML herdam
propriedades CSS dos elementos contidos (ancestrais). Para saber mais,
consulte a [documentação do W3C sobre a cascata](http://www.w3.org/TR/CSS2/cascade.html).

## Inspecionar elementos afetados por um seletor

Passe o cursor sobre um seletor CSS no painel **Styles** para visualizar todos
os elementos que são afetados pelo seletor. Por exemplo, na imagem 
abaixo, o cursor está parado sobre o seletor 
`.wf-tools-guide__section-link a`. Na página ativa, você pode ver todos os elementos 
`<a>` afetados pelo seletor. 

![visualizando elementos afetados pelo seletor](imgs/selector-hover.png)

**Observação**: esse recurso destaca apenas os elementos na janela de visualização; é possível 
que outros elementos fora da janela de visualização também sejam afetados pelo seletor. 

## Adicionar, ativar e desativar classes CSS {:#classes}

Clique no botão **.cls** para visualizar todas as classes CSS associadas ao
elemento selecionado. A partir daí, você pode:

* Ativar ou desativar as classes atualmente associadas ao elemento.
* Adicione novas classes ao elemento. 

![painel classes](imgs/classes.png)

## Editar o nome ou o valor de uma propriedade existente

Clique no nome ou no valor de uma propriedade CSS para editá-lo. Embora o nome ou valor fique 
em destaque, pressione <kbd>Tab</kbd> para seguir para a próxima propriedade, nome
ou seletor. Segure a tecla <kbd>Shift</kbd> e pressione <kbd>Tab</kbd> para mover para trás.

Ao editar o valor numérico de uma propriedade CSS, aumente ou reduza esse valor com os 
seguintes atalhos de teclado:

* <kbd>Seta para cima</kbd> e <kbd>seta para baixo</kbd> para aumentar e diminuir o valor em 1,
   ou em 0,1 se o valor atual estiver entre -1 e 1.
* <kbd>Alt</kbd>+<kbd>seta para cima</kbd> e <kbd>Alt</kbd>+<kbd>seta para baixo</kbd> para 
  aumentar e diminuir o valor em 0,1.
* <kbd>Shift</kbd>+<kbd>seta para cima</kbd> para aumentar em 10 e
  <kbd>Shift</kbd>+<kbd>seta para baixo</kbd> para reduzir em 10.
* <kbd>Shift</kbd>+<kbd>Page Up</kbd> (Windows, Linux) ou 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>seta para cima</kbd> (Mac) para aumentar o 
  valor em 100. <kbd>Shift</kbd>+<kbd>Page Down</kbd> (Windows, Linux) ou 
  <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>seta para baixo</kbd> (Mac) para aumentar o 
  valor em 100. 

## Adicionar uma nova declaração de propriedade

Clique em um espaço em branco dentro de uma regra CSS editável para criar uma nova declaração.
Digite ou cole o CSS no painel **Styles**. As propriedades e seus 
valores são analisados e inseridos nos campos corretos.

Observação: para ativar ou desativar uma declaração de estilo, marque ou desmarque a caixa de seleção ao lado dele.

## Adicionar regra de estilo

Clique no botão **New Style Rule** 
(![botão new style rule](imgs/new-style-rule.png){:.inline}) para adicionar uma 
nova regra CSS. 

Mantenha o botão pressionado para escolher a folha de estilo a que a regra será adicionada. 

## Adicionar ou remover estilos dinâmicos (pseudoclasses) {:#pseudo-classes}

Você pode definir seletores de pseudoclasse dinâmicos manualmente (como `:active`, 
`:focus`, `:hover` e `:visited`) em elementos. 

Há duas formas de definir esses estados dinâmicos em um elemento:

* Clique com o botão direito em um elemento dentro do painel **Elements** e, em seguida, selecione
  a pseudoclasse-alvo do menu para ativar ou desativá-lo.
  
  ![clique com o botão direito no elemento 
  para ativar o seletor de pseudoclasses](imgs/pseudoclass-rightclick.png)

* Selecione um elemento no painel **Elements**, clique no botão **:hov**
 no painel **Styles** e use as caixas de seleção para ativar ou desativar os 
 seletores do elemento selecionado.

  ![painel :hov](imgs/hov.png)

## Adicionar background-color ou color a uma regra de estilo

O painel **Styles** fornece um atalho para adicionar declarações de `color` e
`background-color` a uma regra de estilo.

No canto inferior direito da regra de estilo há um ícone de três pontos. Você deve 
passar o cursor sobre a regra de estilo para vê-lo.

![ícone de três pontos no conjunto de regras](imgs/rule-set-three-dots-icon.png)

Passe o cursor sobre esse ícone para revelar botões para adicionar uma declaração de `color` 
(![adicionar declaração de color](imgs/add-color.png){:.inline})
ou uma declaração de `background-color` (![adicionar declaração de 
background-color](imgs/add-background-color.png){:.inline}). Clique em um destes
botões para adicionar a declaração à regra de estilo. 

## Modificar cores com o Color Picker {:#color-picker}

Para abrir o **Color Picker**, encontre uma declaração CSS no painel **Styles** 
que defina uma cor (como `color: blue`). À esquerda do valor da 
declaração há um quadrado colorido pequeno. O cor dele corresponde ao 
valor da declaração. Clique nesse quadrado para abrir o **Color Picker**.

![abrir o color picker](imgs/open-color-picker.jpg)

Você pode interagir com o **Color Picker** de diversas maneiras:

1. **Conta-gotas**. Consulte [Conta-gotas](#eyedropper) para obter mais informações.
2. **Cor atual**. Uma representação visual do **valor atual**.
3. **Valor atual**. Uma representação hexadecimal, RGBA ou HSL da 
   **cor atual**.
4. **Paleta de cores**. Consulte [Paleta de cores](#color-palettes) para obter mais
   informações.
5. **Seletor de tom e sombra**.
6. **Seletor de matiz**.
7. **Seletor de opacidade**.
8. **Seletor de valor da cor**. Clique para alternar entre RGBA, HSL e
   hexadecimal.
9. **Seletor da paleta de cores**. Clique para selecionar diferentes modelos.

![color picker anotado](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### Conta-gotas {:#eyedropper}

Clique no botão **eyedropper** para ativá-lo
(![conta-gotas ativado](imgs/eyedropper-enabled.png){:.inline}), passe o cursor sobre uma
cor na página ativa e clique para definir o valor
da declaração atualmente selecionada à cor sobre a qual o cursor está parado.

![o conta-gotas em ação](imgs/eyedropper.jpg)

### Paleta de cores {:#color-palettes}

O **Color Picker** oferece a seguinte paleta de cores:

* **Cores da página**. Um conjunto de cores gerado automaticamente pelo CSS 
  da página.
* **Material Design**. Uma coleção de cores de acordo com as 
  [especificações do Material Design][md]. 
* **Personalizado**. Um conjunto das cores que você escolher. O DevTools salva sua paleta 
  personalizada, mesmo entre páginas, até você apagá-la. 

#### Modificar uma paleta de cores personalizada {:#custom-color-palette}

Pressione o botão de **sinal de soma** para adicionar a cor atual à paleta.
Mantenha uma cor pressionada para arrastá-la para uma posição diferente ou arraste-a 
para o ícone de **lixeira** para excluí-la. Clique com o botão direito em uma cor e selecione
**Remove color** para excluí-la. Selecione **Remove all to the right** para excluir
todas as cores à direita da cor atualmente selecionada. Clique com o botão direito
em qualquer local da região da paleta de cores e selecione **Clear template** para 
excluir todas as cores do modelo.

## Visualizar e editar propriedades CSS personalizadas (variáveis CSS) {:#custom-properties}

Você pode visualizar e editar declarações que definam e usem [propriedades CSS 
personalizadas][introdução] (informalmente conhecidas como variáveis CSS) assim como qualquer outra 
declaração. 

As propriedades personalizadas normalmente são [definidas][def] no seletor `:root`
. Para visualizar uma propriedade personalizada definida em `:root`, inspecione o elemento `html`
.

![propriedade personalizada definida em :root](imgs/css-var-defined-on-root.png)

No entanto, propriedades personalizadas não precisam ser definidas no seletor `:root`.
Se você a definiu em outro local, inspecione o elemento no qual ela foi definida para
visualizar a definição.

Você pode visualizar e editar valores de declarações que usem propriedades personalizadas
assim como qualquer outro valor de declaração. 

Se você vir o valor de uma declaração como `var(--main-color)`, como na imagem
abaixo, significa que a declaração está usando propriedades personalizadas. Esses
valores podem ser editados como qualquer outro valor de declaração. No momento, não
existe uma maneira para ir para a definição da propriedade personalizada.

![usando uma propriedade personalizada](imgs/css-var-in-use.png)

[introdução]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## Editar Sass, Less ou Stylus

Se você estiver usando Sass, Less, Stylus ou qualquer outro pré-processador CSS, editar os arquivos de saída de CSS gerados no editor Styles não será útil, pois eles não são mapeados para a origem.

Com mapas de origem CSS, o DevTools pode automaticamente mapear os arquivos gerados para os arquivos de origem, o que permite que você os edite em tempo real no painel Sources e visualize os resultados sem precisar sair do DevTools ou atualizar a página. 

### O fluxo de trabalho do pré-processador

Quando você inspeciona um elemento cujos estilos são fornecidos por um arquivo CSS gerado, o painel Elements exibe um link para o arquivo de origem, não para o arquivo CSS gerado.

![Painel Elements mostrando folha de estilo .scss](imgs/sass-debugging.png)

Para ir para o arquivo de origem:

1. Clique no link para abrir o arquivo de origem (editável) no painel Sources.
2. Pressione <kbd class="kbd">Ctrl</kbd> + **Click** (ou <kbd class="kbd">Cmd</kbd> + **clique**) no nome ou valor de qualquer propriedade CSS para abrir o arquivo de origem e ir para a linha apropriada.

![Painel Sources mostrando arquivo .scss](imgs/sass-sources.png)

Quando você salva alterações em um arquivo do pré-processador CSS no DevTools, o pré-processador CSS deve gerar os arquivos CSS novamente. Em seguida, o DevTools recarrega o arquivo CSS recém-gerado.

### Ativar/desativar mapas de origem e recarregamento automático de CSS

**Os mapas de origem CSS são ativados por padrão**. Você pode escolher ativar o recarregamento automático de arquivos CSS gerados. Para ativar os mapas de origem de CSS e o recarregamento de CSS:

1. Abra as configurações do DevTools e clique em **General**.
2. Marque **Enable CSS source maps** e **Auto-reload generated CSS**.

### Requisitos e pegadinhas

- **As alterações feitas em um editor externo** não são detectadas pelo DevTools até que a aba Sources que contém o arquivo de origem associado receba foco novamente.
- **A edição manual de um arquivo CSS** gerado por Sass/LESS/outro compilador interromperá a associação do mapa de origem até que a página seja recarregada.
- **Como usar <a href="/web/tools/setup/setup-workflow">espaços de trabalho</a>?** Certifique-se de que o arquivo CSS gerado seja mapeado no espaço de trabalho. Você pode verificar isso conferindo a árvore à direita do painel Sources e vendo se o CSS é fornecido pela sua pasta local.
- **Para o DevTools recarregar estilos automaticamente** quando você alterar o arquivo de origem, seu pré-processador deve estar configurado para gerar arquivos CSS sempre que um arquivo de origem for alterado. Caso contrário, você precisará gerar os arquivos CSS novamente manualmente e recarregar a página para ver as alterações.
- **Você deve acessar o site ou aplicativo por um servidor web** (não por um URL **file://**), e o servidor deve fornecer os arquivos CSS, os mapas de origem (.css.map) e os arquivos de origem (.scss etc.).
- Se você _não_ estiver usando o recurso Workspaces, o servidor da Web também deverá fornecer o cabeçalho `Last-Modified`.

Saiba como configurar mapas de origem em [Configurar pré-processadores de CSS e JS](/web/tools/setup/setup-preprocessors).




{# wf_devsite_translation #}
