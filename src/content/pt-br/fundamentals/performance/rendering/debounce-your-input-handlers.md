project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os gerenciadores de entrada são uma possível causa de problemas de desempenho nos aplicativos, pois podem bloquear a conclusão de quadros e provocar atividades adicionais e desnecessárias de layout.

{# wf_updated_on: 2015-10-06 #}
{# wf_published_on: 2015-03-20 #}

# Rejeição de ruído (debouncing) nos gerenciadores de entrada {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Os gerenciadores de entrada são uma possível causa de problemas de desempenho
nos aplicativos, pois podem bloquear a conclusão de quadros e gerar mais atividades de layout do que
o necessário.

### TL;DR {: .hide-from-toc }

* Evite gerenciadores de entrada com execução longa: eles podem bloquear a rolagem.
* Não faça mudanças de estilo nos gerenciadores de entrada.
* Rejeite ruído nos gerenciadores: armazene valores de evento e trate as mudanças de estilo no próximo retorno de chamada de requestAnimationFrame.

## Evite gerenciadores de entrada com execução longa

No caso mais rápido possível, quando um usuário interage com a página, o thread compositor da página pode pegar a entrada de toque do usuário e simplesmente mover o conteúdo. Isso não exige trabalho do encadeamento principal, onde são executados JavaScript, layout, estilos e coloração.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" alt="Rolagem leve; somente compositor.">

No entanto, se você anexar um gerenciador de entrada como `touchstart`, `touchmove` ou `touchend`, o thread do compositor deve aguardar o término da execução do gerenciador, pois você pode optar por chamar `preventDefault()` e evitar que a rolagem do toque ocorra. Mesmo se você não chamar `preventDefault()`, o compositor deve aguardar e, como a rolagem do usuário é bloqueada, pode resultar em oscilação e quadros ausentes.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="Rolagem pesada; o compositor está bloqueado no JavaScript.">

Resumindo, verifique se todos os gerenciadores de entrada usados são executados rapidamente e permitem que o compositor faça seu trabalho.

## Evite mudanças de estilo nos gerenciadores de entrada

Os gerenciadores de entrada, como os usados na rolagem e no toque, são agendados para executar logo antes de qualquer retorno de chamada do `requestAnimationFrame`.

Se você fizer uma mudança visual dentro de um desses gerenciadores, haverá mudanças de estilo pendentes no início do `requestAnimationFrame`. Se você ler _nesse momento_ as propriedades visuais no início do retorno de chamada do requestAnimationFrame, como sugerido em "[Evite layouts grandes e complexos e a troca frequente de layouts](avoid-large-complex-layouts-and-layout-thrashing)", acionará um layout síncrono forçado!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="Rolagem pesada; o compositor está bloqueado no JavaScript.">

## Retarde os gerenciadores de rolagem

A solução para ambos os problemas acima é a mesma: retarde sempre as alterações visuais para o próximo retorno de chamada do `requestAnimationFrame`:


    function onScroll (evt) {

      // Store the scroll value for laterz.
      lastScrollY = window.scrollY;

      // Prevent multiple rAF callbacks.
      if (scheduledAnimationFrame)
        return;

      scheduledAnimationFrame = true;
      requestAnimationFrame(readAndUpdatePage);
    }

    window.addEventListener('scroll', onScroll);


Esse retardo oferece o benefício adicional de manter os gerenciadores de entrada leves, o que é muito bom porque ações como rolagem ou toque não são mais bloqueadas em código com alto custo computacional!


{# wf_devsite_translation #}
