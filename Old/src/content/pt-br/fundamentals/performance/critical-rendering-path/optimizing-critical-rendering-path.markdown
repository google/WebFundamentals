---
title: "Como otimizar o caminho de processamento essencial"
description: "Para que a primeira renderização aconteça o mais rápido possível, precisamos otimizar três variáveis: minimizar o número de recursos essenciais, minimizar o número de bytes essenciais e minimizar a extensão do caminho essencial."
updated_on: 2014-04-28
---

Para que a primeira renderização aconteça o mais rápido possível, precisamos otimizar três variáveis:

* **Minimizar o número de recursos essenciais.**
* **Minimizar o número de bytes essenciais.**
* ** Minimizar a extensão do caminho essencial.**

Um recurso essencial é qualquer recurso que possa bloquear a renderização inicial da página. Quanto menos recursos desse tipo houver na página, menos trabalho o navegador precisa fazer para exibir o conteúdo na tela, e menor é a contenção de CPU e outros recursos.

Da mesma forma, quanto menos bytes essenciais o navegador precisar fazer o download, mais rápido ele poderá começar a processar o conteúdo e exibi-lo na tela. Para reduzir o número de bytes, podemos reduzir o número de recursos (eliminá-los ou torná-los não essenciais) e também garantir a diminuição do tamanho da transferência por meio da compactação e otimização de cada recurso.

Finalmente, a extensão do caminho essencial é uma função do gráfico de dependência entre todos os recursos essenciais necessários para a página e seu número de bytes: o download de alguns recursos só pode ser iniciado uma vez que um recurso anterior é processado, e, quanto maior o recurso, mais idas e voltas serão necessárias para fazer o download.

Em outras palavras, o número de recursos, seu número de bytes e a extensão do caminho essencial estão relacionados uns aos outros, mas não são exatamente iguais. Por exemplo, pode não ser possível reduzir o número de recursos essenciais ou diminuir a extensão do caminho essencial, mas a redução do número de bytes essenciais ainda pode ser uma otimização importante &mdash; e vice-versa.

**A sequência geral de etapas para otimizar o caminho de processamento essencial é:**

1. Analisar e caracterizar seu caminho essencial: número de recursos, bytes, extensão.
2. Minimizar o número de recursos essenciais: eliminá-los, adiar seu download, marcá-los como assíncronos etc.
3. Otimizar a ordem em que os recursos essenciais restantes são carregados: é melhor fazer o download de todos os recursos essenciais o quanto antes para diminuir a extensão do caminho essencial.
4. Otimizar o número de bytes essenciais para reduzir o tempo de download (número de idas e voltas).



