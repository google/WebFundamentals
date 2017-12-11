project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Cadeias de solicitação críticas".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Cadeias de solicitação críticas  {: .page-title }

## Por que a auditoria é importante {: #why }

A cadeia de solicitação crítica é um conceito da estratégia de otimização
Caminho crítico de renderização (CRP). O CRP permite que o navegador carregue uma página com a maior rapidez possível,
priorizando quais recursos são carregados e em que
ordem isso ocorre.

Consulte os documentos sobre [caminho crítico
de renderização](/web/fundamentals/performance/critical-rendering-path/) para saber
mais.

## Como ser aprovado na auditoria {: #how }

No momento, esta auditoria não está estruturada para "aprovação" ou "reprovação". As
informações fornecidas por esta auditoria oferecem uma oportunidade para melhorar
o desempenho do carregamento de páginas do aplicativo.

Na versão do Lighthouse como extensão do Chrome, o relatório gera um diagrama
como este:

<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

Esse diagrama representa as cadeias de solicitação críticas da página. O caminho de
`lighthouse/` para `/css` é uma cadeia. O caminho de `lighthouse/` para
`css/devsite-googler-buttons.css` é outra cadeia. E assim por diante. A pontuação
superior da auditoria representa esse número de cadeias. Por exemplo, o diagrama
acima teria uma "pontuação" de sete.

Além disso, o diagrama detalha o tempo gasto e o número de bytes
necessário para baixar cada recurso.

Você pode usar esse diagrama para aprimorar o CRP com as seguintes ações:

* Minimizar o número de recursos críticos, eliminando-os, retardando
  seu download, marcando-os como async e assim por diante.
* Otimizar o número de bytes críticos para reduzir o tempo de download (número
  de idas e voltas).
* Otimizar a ordem em que os recursos críticos restantes são carregados,
  baixando todos os ativos críticos o mais cedo possível para reduzir o comprimento
  do caminho crítico.

A otimização de qualquer desses fatores resultará em um carregamento de página mais rápido.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse usa a prioridade de rede como proxy para identificar recursos críticos
bloqueadores de renderização. Consulte [Prioridades de agendamento de recursos
do Chrome](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)
para obter mais informações sobre como o Chrome define essas prioridades.

Os dados sobre cadeias de solicitação críticas, tamanhos de recursos e tempo gasto no download
de recursos são extraídos do Chrome Debugger Protocol.


{# wf_devsite_translation #}
