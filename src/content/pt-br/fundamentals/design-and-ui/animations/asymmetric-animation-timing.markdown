---
title: "Asymmetric Animation Timing"
description: "A quebra de simetria proporciona contraste e atração aos seus projetos. Saiba quando e como aplicar isso aos seus projetos."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "Use temporização da animação assimétrica para proporcionar personalidade e contraste ao seu trabalho."
    - "Sempre favoreça a interação do usuário; use durações curtas ao responder a toques ou cliques e reserve durações mais lentas para quando não houver resposta."
---

<p class="intro">
  A assimetria da duração da sua animação ajuda a experiência do usuário permitindo que você expresse personalidade enquanto ao mesmo tempo responde rapidamente às interações do usuário. Também proporciona um sensação de contraste, o que torna a interface mais visualmente atraente.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

Como na maioria das “regras” de animação, você deve testar para descobrir o que funciona para o seu aplicativo. Mas quando falamos da experiência do usuário, eles são sempre muito impacientes. A regra de ouro aqui é **sempre responder a interação do usuário rapidamente**. Tendo dito isso, a maioria das vezes a ação do usuário é assimétrica e, portanto, a animação também deve ser.

Por exemplo, quando um usuário toca para exibir uma navegação de barra lateral, você deve exibi-la na tela o mais rapidamente possível, com uma duração de cerca de 100 ms. No entanto, quando o usuário recolhe o menu, você pode animar a exibição um pouco mais lentamente, digamos em cerca de 300 ms.

Por outro lado, quando você exibe em uma visualização modal, normalmente uma mensagem de erro, ou alguma outra mensagem crítica, será exibida. Nesses casos, recomenda-se exibir a visualização um pouco mais lentamente, novamente em cerca de 300 ms. Mas o recolhimento, que é acionado pelo usuário, deve acontecer muito rapidamente.

A regra geral é:

* Animações da interface do usuário acionadas por uma interação do usuário, como as transições de visualização ou  a exibição de um elemento, têm introdução rápida (curta duração) e saída lenta (duração mais longa).
* Animações da interface do usuário acionadas pelo seu código, como erros ou exibições modais, têm introdução mais lenta (duração mais longa) e saída rápida (duração curta).


