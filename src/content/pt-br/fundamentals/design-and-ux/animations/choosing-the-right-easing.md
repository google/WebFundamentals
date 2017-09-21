project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Selecione o easing adequado para seu projeto, seja easing in, out ou ambos. Você pode até mesmo usar bounces para deixar tudo mais divertido!

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Escolher o easing certo {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Já discutimos as várias opções disponíveis para easing em animações, então, qual é o tipo ideal para seus projetos e qual deve ser a duração das animações?

### TL;DR {: .hide-from-toc }
* Use animações ease-out para elementos de interface de usuários; o Quintic é um ease-out ótimo e rápido.
* Use a duração da animação; ease-outs e ease-ins devem ter de 200 ms a 500 ms, enquanto eases bounces e elastic devem ter duração mais longa, de 800 ms a 1200 ms.


<img src="images/quintic-ease-out-markers.png" alt="Uma curva de animação Quintic ease-out" style="max-width: 300px" class="attempt-right"/>

No geral, um **ease-out** é a escolha correta e certamente é um bom padrão. Ela tem um início rápido, confere às animações capacidade de resposta, o que é desejável, mas com uma certa desaceleração no final.

Há um grupo de equações de ease-out muito conhecidas além daquela especificada com a palavra-chave `ease-out` no CSS, que variam em "agressividade". Para obter um efeito ease-out muito rápido, considere um [Quintic ease-out](http://easings.net/#easeOutQuint).


[Veja uma animação Quintic ease-out](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

Outras equações de easing, particularmente eases bounces ou elastic, devem ser usadas em moderação e apenas quando for adequado para o projeto. Uma animação desagradável pode fazer com que o usuário desista da experiência. Se o objetivo do seu projeto não for ser divertido, não adicione animações de bounce nos elementos da IU. Por outro lado, se estiver criando um site que deva ser alegre, use os bounces que quiser!

Brinque com os eases, veja quais correspondem à personalidade do seu projeto e parta desse princípio. Para ver uma lista completa dos tipos de easing e demonstrações, consulte [easings.net](http://easings.net).

## Escolha a duração correta da animação

É importante que qualquer animação adicionada ao seu projeto tenha a duração correta. Se for curta demais, a animação parecerá agressiva e brusca; se for longa, será obstrutiva e chata.

* **Ease-outs: cerca de 200 ms a 500 ms**. Seus olhos terão tempo de ver a animação sem que ela pareça obstrutiva.
* **Ease-ins: cerca de 200 ms a 500 ms**. Lembre-se de que haverá um choque no final e nenhuma mudança na quantidade de tempo suavizará esse impacto.
* **Efeitos bounce ou elastic: cerca de 800 ms a 1200 ms**. Deixe tempo suficiente para que os efeitos elastic ou bounce sejam "concluídos". Sem esse tempo adicional, a parte elastic bouncing da animação será agressiva e desagradável aos olhos.

Evidentemente, estas são apenas orientações. Teste seus próprios eases e escolha aquele que melhor se adapte ao seu projeto.




{# wf_devsite_translation #}
