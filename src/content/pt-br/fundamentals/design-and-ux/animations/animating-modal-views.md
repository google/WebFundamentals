project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como animar visualizações modais em seus aplicativos.

{# wf_updated_on: 2016-08-24 #}
{# wf_published_on: 2014-08-08 #}

# Animar visualizações modais {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="Animando uma visualização modal." />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">Experimente</a>
    </figcaption>
  </figure>
</div>

As visualizações modais são destinadas a mensagens importantes e, por isso, você tem bons motivos para bloquear a interface do usuário. Use-as com cuidado, pois elas são disruptivas e podem facilmente prejudicar a experiência do usuário, se usadas em excesso. Mas, em algumas situações, elas são a alternativa correta e um pouco de animação dará vida às visualizações.

### TL;DR {: .hide-from-toc }
* Use visualizações modais de forma moderada; os usuários ficam frustrados se suas experiências são interrompidas desnecessariamente.
* Adicionar escala à animação proporciona um bom efeito de "queda".
* Remova a visualização modal rapidamente quando o usuário a dispensar. Entretanto, exiba a visualização modal na tela um pouco mais devagar, para evitar surpreender o usuário.

<div class="clearfix"></div>

A sobreposição modal deve estar linhada à janela de visualização, portanto, defina sua `position` como `fixed`:


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

Ela tem um valor inicial de `opacity` de 0, portanto, está oculta na visualização. Seu valor de `pointer-events` também deverá ser definido como `none` para que cliques e toques sejam transmitidos. Sem isso, todas as interações serão bloqueadas e a página ficará sem resposta. Por fim, como `opacity` e `transform` serão animados, eles precisarão ser marcados como 'mudando' com `will-change` (consulte também [Usando a propriedade will-change](animations-and-performance#using-the-will-change-property)).

Quando a visualização estiver visível, as interações precisarão ser aceitas e um valor de `opacity` de 1 será necessário:


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

Agora, sempre que a visualização modal for necessária, você poderá usar o JavaScript para ativar a classe "visible":


    modal.classList.add('visible');
    

Nesse momento, a visualização modal será exibida sem animações, portanto, você pode adicioná-las em
(veja também [Easing personalizado](custom-easing)):


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Adicionar `scale` à transformação faz com que a visualização pareça cair na tela suavemente, o que é um bom efeito. A transição padrão é aplicada às propriedades transform e opacity com uma curva personalizada e uma duração de 0,1 segundo.

A duração é muito curta, mas é ideal para quando o usuário dispensar a visualização e desejar voltar para seu aplicativo. O ponto negativo é que essa transição pode ser muito agressiva para quando a visualização modal for exibida. Para corrigir isso, substitua os valores de transição para a classe `visible`:


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Agora, a visualização modal leva 0,3 segundo para aparecer na tela, o que é um pouco menos agressivo, e será dispensada rapidamente, o que agradará o usuário.





{# wf_devsite_translation #}
