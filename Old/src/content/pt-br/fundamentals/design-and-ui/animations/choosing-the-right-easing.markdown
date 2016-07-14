---
title: "Choosing the Right Easing"
description: "Selecione o easing adequado para seu projeto, seja easing in, out ou ambos. Pode até mesmo ficar saltitante para obter manobras extras!"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "Use animações ease-out para elementos de interface de usuários; o Quintic é um ease-out ótimo e rápido."
    - "Certifique-se de usar a duração da animação; ease-outs e ease-ins devem ter de 200 ms a 500 ms, enquanto eases bounces e elastic devem ter duração mais longa, de 800 ms a 1200 ms."

---
<p class="intro">
  Já discutimos as várias opções disponíveis para easing em animações, então qual o tipo ideal para seus projetos e qual será a duração das animações?
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

No geral, um **ease-out** será a escolha correta e certamente um bom padrão. De início rápido, confere às animações capacidade de resposta, o que é desejável, seguido de certa desaceleração no final.

Há um grupo de equações de ease-out muito conhecidas além daquela especificada com a palavra-chave `ease-out` no CSS, que variam em ‘agressividade’. Para um efeito ease-out super rápido considere um [Quintic ease-out](http://easings.net/#easeOutQuint).

<img src="imgs/quintic-ease-out-markers.png" alt="Uma curva de animação Quintic ease-out" style="max-width: 300px"/>

{% link_sample _code/box-move-quintic-ease-out.html %}Veja uma animação Quintic ease-out.{% endlink_sample %}

Outras equações de easing, particularmente eases bounces ou elastic, devem ser usadas com moderação e apenas quando for adequado para o projeto. Uma animação desagradável pode fazer com que o usuário desista da experiência. Se seu projeto não for alegre e divertido, não tenha elementos da interface do usuário pulando pelo local! Por outro lado, se você estiver criando um site que deve ser leve e divertido, utilize os pulos!

Brinque com os eases, veja quais correspondem à personalidade do seu projeto e parta desse princípio. Uma lista completa de tipos de easing e algumas demonstrações podem ser encontradas em [easings.net](http://easings.net).

## Escolha a duração correta da animação

É importante que qualquer animação adicionada ao seu projeto tenha a duração correta. Se for curta demais, a animação parecerá agressiva e brusca; se for longa, será obstrutiva e chata.

* **Ease-outs: cerca de 200 ms a 500 ms**. Seus olhos terão tempo de ver a animação sem que ela pareça obstrutiva.
* **Ease-ins: cerca de 200 ms a 500 ms**. Lembre-se de que vai sacudir no final e nenhuma mudança na quantidade de tempo suavizará essa sensação.
* **Efeitos bounce ou elastic: cerca de 800 ms a 1200 ms**. Certifique-se de deixar tempo suficiente para que os efeitos elastic ou bounce sejam ‘concluídos’. Sem esse tempo extra, a parte elastic bouncing da animação será realmente agressiva e desagradável aos olhos.

Evidentemente estas são apenas orientações. Teste seus próprios eases e escolha aquele que melhor se adapta ao projeto.


