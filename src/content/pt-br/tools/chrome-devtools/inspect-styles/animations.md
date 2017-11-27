project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Inspecione e modifique animações com o Animation Inspector do Chrome DevTools.

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# Inspecionar animações {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Inspecione e modifique animações com o Animation Inspector
do Chrome DevTools.

![Animation Inspector](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- Capture animações abrindo o Animation Inspector. Ele detecta animações e as classifica em grupos automaticamente.
- Inspecione animações desacelerando-as, reproduzindo-as ou visualizando o código-fonte.
- Modifique animações alterando a sincronização, o atraso, a duração ou os deslocamentos do quadro-chave.


## Visão geral {:#overview}

O Animation Inspector do Chrome DevTools tem dois objetivos principais. 

* Inspecionar animações. Se quiser desacelerar, reproduzir ou inspecionar o 
  código-fonte de um grupo de animações. 
* Modificar animações. Se quiser modificar a sincronização, o atraso, a duração ou 
  ajustes de quadro-chave de um grupo de animações. Edição de bézier e edição 
  de quadro-chave ainda não são compatíveis. 

O Animation Inspector é compatível com animações CSS,
transições CSS e animações Web. Animações `requestAnimationFrame` não
são atualmente permitidas.

### O que é um grupo de animações?

Um grupo de animações é um conjunto de animações que 
*parecem* ser relacionadas. Atualmente, a web não tem um conceito efetivo
para grupo de animações, então os designers e desenvolvedores de animação precisam compor 
e sincronizar animações individuais para que pareçam ter efeito visual 
coerente. O Animation Inspector prevê quais animações são relacionadas com base 
no tempo de início (excluindo atrasos e outros) e agrupa-as lado a lado.
Em outras palavras, um conjunto de animações acionadas no mesmo bloco de script 
são agrupadas, mas, se forem assíncronas, são agrupadas 
separadamente. 

## Primeiros passos

Há duas formas de abrir o Animation Inspector:

* Acesse a seção **Styles** (no painel **Elements**) e pressione o botão 
  **Animations** (![botão 
animations](imgs/animations-button.png){:.inline}). 
* Abra o menu de comando e digite `Drawer: Show Animations`. 

O Animation Inspector abre em uma aba próxima a gaveta Console. Como ela
é uma guia gaveta, você pode usá-la de qualquer painel do DevTools. 

![Animation Inspector vazio](imgs/empty-ai.png)

O Animation Inspector é organizado em quatro seções principais (ou painéis). Este
guia se refere a cada painel da seguinte forma:

1. **Controls**. Aqui, você pode apagar todos os grupos de animações
   capturados no momento ou alterar a velocidade do grupo de animações selecionado no momento.
2. **Overview**. Selecione um Grupo de animações aqui para inspecionar 
  e modificar no painel **Details**.
3. **Timeline**. Pause e inicie uma animação aqui, ou siga direto para um ponto 
  específico na animação.
4. **Details**. Inspecione e modifique o
   grupo de animações selecionado. 

![Animation Inspector anotado](imgs/annotated-animation-inspector.png)

Para capturar uma animação, basta executar a interação que aciona a
animação com o Animation Inspector aberto. Se uma animação for acionada 
no carregamento de uma página, você pode ajudar o Animation Inspector a detectar a animação 
recarregando a página. 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## Inspecionar animações {:#inspect}

Depois de capturar uma animação, há algumas formas de reproduzi-la:

* Passe o cursor sobre a imagem em miniatura no painel **Overview** para visualizar uma prévia dela.
* Selecione o Grupo de animação no painel **Overview** (para que ele seja exibido
  no painel **Details**) e pressione o botão **replay**
  (![botão replay](imgs/replay-button.png){:.inline}). A animação é
  reproduzida na janela de visualização.
  Clique nos botões **animation speed** (![botões animation 
  speed](imgs/animation-speed-buttons.png){:.inline}) para alterar a velocidade 
  da visualização do grupo de animações selecionado no momento. Você pode usar a barra 
  vertical vermelha para alterar a posição atual. 
* Clique e arraste a barra vertical vermelha para remover a animação da janela de visualização. 

### Visualizar detalhes da animação

Depois de capturar um grupo de animações, clique nele no painel **Overview** para 
visualizar seus detalhes. No painel **Details**, cada animação tem
sua própria linha. 

![Detalhes do grupo de animações](imgs/animation-group-details.png)

Passe o cursor sobre uma animação para destacá-la na janela de visualização. Clique na animação
para selecioná-la no painel **Elements**. 

![Passe o cursor sobre uma animação para destacá-la na 
janela de visualização](imgs/highlight-animation.png)

A seção mais escura à esquerda de uma animação é sua definição. A seção mais
esmaecida à direita representa as iterações. Por exemplo, na captura 
de tela abaixo, as seções 2 e 3 representam iterações da seção 1. 

![Diagrama das iterações de uma animação](imgs/animation-iterations.png)

Se dois elementos tiverem a mesma animação aplicada a eles, o Animation 
Inspector atribui a mesma cor a eles. A cor em si é aleatória e não 
tem significado.
Por exemplo, na captura de tela abaixo, os dois elementos `div.eye.left::after` 
e `div.eye.right::after` têm a mesma animação (`eyes`) aplicada a eles, 
assim como os elementos `div.feet::before` e `div.feet::after`. 

![Animações com códigos de cor](imgs/color-coded-animations.png)

## Modificar animações {:#modify}

Há três maneiras para modificar uma animação com o Animation Inspector:

* Duração da animação.
* Sincronização de quadros-chave.
* Atraso no horário de início.

Para esta seção, suponha que a captura de tela abaixo representa a animação
original:

![Animação original antes da modificação](imgs/modify-original.png)

Para alterar a duração de uma animação, clique e arraste o primeiro ou o último 
círculo.

![Duração modificada](imgs/modify-duration.png)

Se a animação definir qualquer regra de quadro-chave, elas serão representadas como
círculos internos brancos. Clique e arraste um desses círculos para alterar os tempos do 
quadro-chave.

![Quadro-chave modificado](imgs/modify-keyframe.png)

Para adicionar um atraso a uma animação, clique e arraste para qualquer lugar exceto os 
círculos. 

![Atraso modificado](imgs/modify-delay.png)


{# wf_devsite_translation #}
