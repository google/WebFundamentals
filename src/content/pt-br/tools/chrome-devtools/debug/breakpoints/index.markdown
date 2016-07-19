---
title: "Debugando com Breakpoints"
description: "O Chrome DevTools inclui recursos poderosos de breakpoint que auxiliam á descobrir e solucionar erros de lógica no seu código JavaScript."
updated_on: 2015-04-14
translators:
  - alan
translation_priority: 0
---

<p class="intro">
  O Chrome DevTools inclui recursos poderosos de breakpoint que auxiliam á descobrir e solucionar erros de lógica no seu código JavaScript. Use diferentes tipos de breakpoint para controlar exatamente quais condições podem acionar uma pausa na execução do script.
</p>

Conforme você desenvolve a sua página web,
você vai querer localizar e corrigir bugs no seu JavaScript.
Mas em um script em execução,
o código com erro irá quase sempre ser processado
antes que você possa identifica-lo.

Pause o JavaScript em execução em diversos pontos
para que você possa determinar seu progresso ou examinar os valores de suas variáveis.
Os breakpoints do Chrome DevTools permitem que você pause seu código
sem ter que usar a força bruta de expressões
tais como `alert("ok até aqui")` ou `alert("x = " + x)`.
