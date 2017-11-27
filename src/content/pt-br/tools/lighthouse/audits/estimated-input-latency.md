project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Latência estimada de entrada".

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Latência estimada de entrada  {: .page-title }

## Por que a auditoria é importante {: #why }

A capacidade de resposta da entrada é um fator importante na forma como os usuários percebem o desempenho
de um aplicativo. Os aplicativos têm 100 ms para responder à entrada do usuário. Se a resposta demorar mais do que isso,
o usuário considerará o aplicativo lento. Consulte [Medição de desempenho com o modelo
RAIL](/web/fundamentals/performance/rail) para obter mais informações.

Consulte a seção [O que é testado pela auditoria](#what) deste documento para saber porque
o limite testado por esta auditoria é de 50 ms (em vez de
100 ms, o limite recomendado pelo modelo RAIL).

## Como ser aprovado na auditoria {: #how }

Para que o aplicativo responda à entrada do usuário com mais rapidez, é necessário executar a forma
de execução do código no navegador. Confira a série de técnicas descritas
nos documentos sobre [Desempenho da renderização](/web/fundamentals/performance/rendering/).
 Essas dicas variam da transferência de computação para web workers a fim de
liberar o encadeamento principal à refatoração de seletores do CSS para executar
menos cálculos ou uso de propriedades CSS que minimizam a quantidade de
operações que fazem uso intensivo do navegador.

Uma restrição importante desta auditoria: ela não é uma medição completa da
latência de entrada. Como explicado na seção [O que este documento testa](#what)
deste documento, esta auditoria não mede o tempo real que um aplicativo
demora para responder a uma entrada do usuário. Em outras palavras, ela não mede se a resposta do aplicativo
à entrada do usuário está visualmente completa.

Para medir isso manualmente, faça uma gravação com o
Timeline do Chrome DevTools. Consulte [Como usar a ferramenta
Timeline](/web/tools/chrome-devtools/evaluate-performance/timeline-tool) para obter mais
ajuda. A ideia básica é iniciar uma gravação, executar a entrada do usuário que
você quer medir, interromper a gravação e analisar o diagrama de chamas
para garantir que todas as fases do [pipeline de
pixels](/web/fundamentals/performance/rendering/#the_pixel_pipeline) sejam
concluídas em até 50 ms.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O modelo de desempenho RAIL recomenda que os aplicativos respondam à entrada do usuário em até
100 ms, mas o limite usado pelo Lighthouse é 50 ms. Por quê?

O motivo é que o Lighthouse usa uma métrica substituta para medir a eficiência da
resposta do aplicativo à entrada do usuário: a disponibilidade do encadeamento principal. O Lighthouse
supõe que o aplicativo precisa de 50 ms para responder completamente à entrada do usuário
(de todas as execuções de JavaScript até a pintura física dos novos
pixels na tela). Se o encadeamento principal ficar indisponível por 50 ms ou mais,
não restará tempo suficiente para que o aplicativo conclua a resposta.

Há uma probabilidade de 90% de que um usuário constatará uma latência de entrada com
um valor igual ou inferior ao relatado pelo Lighthouse. Os 10% de usuários restantes podem esperar alguma
latência adicional.


{# wf_devsite_translation #}
