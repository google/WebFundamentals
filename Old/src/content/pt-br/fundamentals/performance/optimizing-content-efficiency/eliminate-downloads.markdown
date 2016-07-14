---
title: "Eliminar downloads desnecessários"
description: "O recurso mais rápido e mais otimizado é um recurso não enviado. Você fez a auditoria de seus recursos recentemente? Você deveria fazer isso periodicamente para garantir que todos os recursos ajudem a oferecer uma experiência melhor para o usuário."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Faça o inventário de todos os recursos próprios e de terceiros em suas páginas"
    - "Meça o desempenho de cada recurso: seu valor e seu desempenho técnico"
    - "Determine se os recursos estão oferecendo valor suficiente"
---

<p class="intro">
  O recurso mais rápido e mais otimizado é um recurso não enviado. Você fez a auditoria de seus recursos recentemente? Você deveria fazer isso periodicamente para garantir que todos os recursos ajudem a oferecer uma experiência melhor para o usuário.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

O recurso mais rápido e mais otimizado é um recurso não enviado. É claro que essa frase pode parecer óbvia, mas na prática ela é negligenciada: como engenheiro de desempenho, é sua obrigação estar de olhos abertos para qualquer oportunidade de eliminar recursos desnecessários de seu aplicativo. Questionar é uma boa prática, além de revisar periodicamente as premissas implícitas e explícitas com sua equipe. Alguns exemplos:

* Sempre incluímos o recurso X em nossas páginas, mas o custo de transferi-lo e exibi-lo neutraliza o valor que ele oferece aos usuários? Podemos medir e comprovar seu valor?
* O recurso, especialmente se for de terceiros, oferece desempenho consistente? Esse recurso está ou precisa estar no caminho essencial? Se o recurso está no caminho essencial, ele poderia ser um ponto único de falha para nosso site, ou seja, se o recurso estiver indisponível, ele afetará o desempenho e a experiência do usuário em nossas páginas?
* Esse recurso precisa ou tem um SLA? Esse recurso segue práticas recomendadas de desempenho: compactação, armazenamento em cache etc.?

Muitas vezes, nossas páginas contêm recursos que são desnecessários, ou pior, que diminuem o desempenho da página sem oferecer muito valor ao visitante do site em que está hospedada. Isso se aplica a recursos e widgets próprios e de terceiros:

* O site A decidiu exibir um carrossel de fotos em sua página inicial para que o visitante pudesse visualizar várias fotos com um clique rápido. Todas as fotos são carregadas quando a página é carregada, e o usuário passa de uma foto para outra.
    * **Pergunta:** você já mediu quantos usuários visualizam várias fotos no carrossel? Você pode estar gerando sobrecarga com o download de recursos desnecessários que nunca são visualizados pela maioria dos visitantes.
* O site B decidiu instalar um widget de terceiros para exibir conteúdo relacionado, melhorar a participação social ou fornecer outros serviços.
    * **Pergunta:** você mediu quantos visitantes usam o widget ou clicam no conteúdo fornecido por ele? A interação gerada por esse widget é suficiente para justificar sua carga?

Como você pode ver, embora eliminar downloads desnecessários pareça ser algo trivial, na prática não é bem assim, pois muitas vezes é preciso pensar e medir com cuidado para tomar a decisão. Na verdade, para obter os melhores resultados, você deveria fazer o inventário e revisar periodicamente essas perguntas para cada recurso das suas páginas.



