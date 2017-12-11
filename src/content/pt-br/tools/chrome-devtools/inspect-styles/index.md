project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecione e edite o HTML e o CSS das suas páginas.

{# wf_updated_on: 2016-01-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspecionar e editar páginas e estilos {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecione e edite em tempo real o HTML e o CSS de uma página usando 
o painel Elements do Chrome DevTools.

![Painel Elements do Chrome DevTools](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- Inspecione e edite instantaneamente qualquer elemento na árvore do DOM no painel Elements.
- Visualize e altere as regras de CSS aplicadas a qualquer elemento no painel Styles.
- Visualize e edite o modelo de caixa de um elemento selecionado no painel Computed.
- Visualize todas as mudanças feitas na sua página localmente no painel Sources.


## Editar um nó do DOM em tempo real

Para editar um nó do DOM em tempo real, basta clicar duas vezes em um 
[elemento selecionado](#inspect-an-element) e fazer alterações:

<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

A visualização em árvore do DOM mostra o estado atual da árvore; ele pode não corresponder 
ao HTML carregado originalmente por diferentes motivos. Por exemplo, 
você pode modificar a árvore do DOM usando JavaScript, o mecanismo do navegador pode tentar 
corrigir a marcação de autor inválida e produzir um DOM inesperado.

## Editar um estilo em tempo real

Edite os nomes e valores da propriedade style em tempo real no painel **Styles**. Todos
os estilos são editáveis, exceto os cinzas (como no caso
com folhas de estilo do user-agent).

Para editar um nome ou valor, clique nele, faça as alterações e pressione
<kbd class="kbd">Tab</kbd> ou <kbd class="kbd">Enter</kbd> para salvá-las.

![editar nome de propriedade](imgs/edit-property-name.png)

Por padrão, suas modificações no CSS não são permanentes, elas são perdidas 
ao recarregar a página. Configure a [criação 
persistente](/web/tools/setup/setup-workflow) se quiser manter as 
alterações entre carregamentos de página. 

## Examinar e editar os parâmetros de modelo de caixa

Examine e edite os parâmetros de modelo de caixa do elemento atual usando o 
**painel Computed**. Todos os valores no modelo de caixa são editáveis; basta clicar 
neles.

![Painel Computed](imgs/computed-pane.png)

Os retângulos concêntricos contêm os valores **top**, **bottom**, **left** e **right**
para as propriedades **padding**, **border** e **margin**
 do elemento. 

Para elementos posicionados de forma não estatística, um retângulo **position** 
também é exibido, contendo os valores das propriedades **top**, 
**right**, **bottom** e **left**.

![elemento calculado não estático](imgs/computed-non-static.png)

Para elementos `position: fixed` e `position: absolute`, o campo central 
contém as dimensões **offsetWidth × offsetHeight** reais em pixels 
do elemento selecionado. Todos os valores podem ser modificados clicando duas vezes 
neles, como os valores da propriedade no painel Styles. Entretanto, não é garantido que as alterações 
terão efeito, pois isso está sujeito aos dados específicos de posicionamento 
do elemento concreto.

![elemento calculado fixo](imgs/computed-fixed.png)

## Visualizar alterações locais

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

Para visualizar um histórico de alterações realizadas em tempo real na sua página:

1. No painel **Styles**, clique no arquivo que você modificou. O DevTools
  leva você ao painel **Sources**.
1. Clique com o botão direito no arquivo.
1. Selecione **Local modifications**.

Para explorar as alterações realizadas:

* Expanda os nomes de arquivo de nível superior para visualizar a hora 
  ![hora da modificação](imgs/image_25.png){:.inline} 
   em que uma modificação ocorreu.
* Expanda os itens de segundo nível para visualizar uma 
  [comparação](https://en.wikipedia.org/wiki/Diff) (antes e depois) 
  correspondente à modificação. Uma linha com um plano de fundo rosa significa 
 uma remoção e uma linha com um plano de fundo verde significa uma adição.

## Desfazer alterações

Se você não [configurou a criação persistente](/web/tools/setup/setup-workflow), 
todas as edições realizadas em tempo real serão perdidas sempre que você recarregar a página.

Pressupondo que você tenha configurado a criação persistente, para desfazer alterações:

* Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) ou 
  <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) para desfazer 
  rapidamente mudanças pequenas para o DOM ou estilos pelo painel Elements.

* Para desfazer todas as modificações locais feitas em um arquivo, abra o painel **Sources** 
 e selecione **revert** ao lado do nome do arquivo.

[inspecionar]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
