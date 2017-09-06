project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Siga este guia interativo para saber como usar o DevTools para diagnosticar layouts síncronos forçados.

{# wf_updated_on: 2016-03-31 #}
{# wf_published_on: 2015-04-13 #}

# Diagnosticar layouts síncronos forçados {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Saiba como usar o DevTools para Diagnosticar layouts síncronos 
forçados.

Neste guia, você aprenderá a depurar [layouts síncronos forçados][fsl]
identificando e corrigindo problemas em uma demonstração ao vivo.  A demonstração anima imagens 
usando [`requestAnimationFrame()`][raf], que é a abordagem recomendada para 
animação com base em quadros. No entanto, há uma quantidade considerável de instabilidade na 
animação. O seu objetivo é identificar a causa da instabilidade e corrigir o problema 
para que a demonstração execute suavemente a 60 FPS. 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## Coletar dados

Em primeiro lugar, é necessário capturar dados para que você possa entender exatamente o que acontece
durante a execução da página. 

1. Abra a [demonstração](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html).
1. Abra o painel **Timeline** do DevTools.
1. Ative a opção **JS Profile**. Ao analisar o diagrama de chamas mais tarde, esta
   opção permitirá ver exatamente que funções foram chamadas.
1. Clique em **Start** na página para iniciar a animação.
1. Clique no botão **Record** no painel Timeline para iniciar a gravação
   na Timeline.
1. Aguarde por dois segundos.
1. Clique no botão **Record** novamente para parar a gravação. 

Após o término da gravação, o painel Timeline deverá exibir algo parecido
com a tela a seguir. 

![gravação de demonstração instável com a timeline](imgs/demo-recording.png)

## Identificar o problema

Agora que você já tem os dados, é hora de começar a entendê-los. 

Imediatamente, você poderá ver no painel **Summary** da gravação na Timeline 
que o navegador gastou a maior parte do tempo renderizando. De modo geral, se for
possível [otimizar as operações de layout da página][layout], você poderá reduzir
o tempo da renderização. 

![Resumo da Timeline](imgs/summary.png)

Agora, examine as barras rosa logo abaixo do painel **Overview**.
Elas representam quadros. Passe o cursor sobre elas para ver mais informações sobre o
quadro.

![quadro longo](imgs/long-frame.png)

Os quadros estão demorando muito para concluir. Para obter animações suaves, você precisa
visar 60 FPS. 

Agora é hora de diagnosticar exatamente o que está errado. Use o mouse para 
[aumentar o zoom][zoom] em uma pilha de chamada. 

![gravação da timeline com o zoom aumentado](imgs/zoom.png)

A parte superior da pilha é um evento `Animation Frame Fired`. A função que você
passou a `requestAnimationFrame()` é chamada sempre que este evento é ativado.
Abaixo de `Animation Frame Fired`, você pode ver `Function Call` e, abaixo dela,
`update`. Você pode inferir que um método `update()` é o retorno de chamada de
`requestAnimationFrame()`. 

Observação: É neste local que a opção **JS Profile** que você ativo mais cedo se torna 
útil. Se ela tiver sido desativada, você só verá `Function Call` seguida
de todos os eventos roxos pequenos (abordados a seguir), sem detalhes sobre exatamente
que funções foram chamadas.

Agora, concentre sua atenção em todos os eventos roxos pequenos abaixo do evento `update`.
 A parte superior de muitos desses eventos é vermelha. Esse é um sinal de alerta.
Passe o cursor sobre esse eventos para ver que o DevTools está alertando você de que sua 
página pode estar sendo vítima de refluxo forçado. O reflow forçado é apenas um outro nome para 
layouts síncronos forçados. 

![passar o cursor sobre um evento de layout](imgs/layout-hover.png)

Agora, vamos examinar a função que está causando todos os 
layouts síncronos forçados. Clique em um dos eventos de layout para selecioná-lo.
No painel Summary, você agora deve ver detalhes sobre este evento. Clique no
link em **Layout Forced** (`update @ forcedsync.html:457`) para passar
à definição da função.

![passe para a definição da função](imgs/jump.png)

A definição da função deve estar exibida no painel **Sources**. 

![definição da função no painel sources](imgs/definition.png)

A função `update()` é o gerenciador de retorno de chamada de 
`requestAnimationCallback()`. O gerenciador computa cada propriedade `left` da imagem
com base no valor `offsetTop` da imagem. Isso força o navegador a executar
um novo layout imediatamente para garantir que ele forneça o valor correto.
Forçar um layout em todo quadro da animação é a causa das animações
instáveis na página. 

Agora que você já identificou o problema, pode tentar corrigi-lo diretamente
no DevTools.

[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## Aplicar a correção no DevTools

Esse script é incorporado no HTML. Portanto, não é possível editá-lo no painel **Sources**
(no entanto, scripts em `*.js` podem ser editados no painel Sources). 

Contudo, para testar as mudanças, você pode redefinir a função no Console.
Copie a definição de função do arquivo HTML e cole no Console
do DevTools. Exclua a declaração que usa `offsetTop` e retire o comentário da logo
abaixo dela. Pressione `Enter` após conclusão. 

![redefinir a função problemática](imgs/redefinition.png)

Reinicie a animação. Você pode perceber visualmente que agora está muito mais suave. 

## Verificar com outra gravação

É sempre uma boa prática fazer outra gravação e verificar se a 
animação está realmente mais rápida e com melhor desempenho do que antes. 

![gravação da timeline após a otimização](imgs/after.png)

Muito melhor.


{# wf_devsite_translation #}
