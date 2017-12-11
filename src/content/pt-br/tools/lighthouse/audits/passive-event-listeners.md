project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “Site usa detectores de evento passivos para melhorar o desempenho de rolagem”.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Site usa detectores de evento passivos para melhorar o desempenho de rolagem {: .page-title }

## Por que a auditoria é importante {: #why }

Definir a opção `passive` nos seus detectores de eventos touch e wheel pode
melhorar o desempenho de rolagem.

Consulte [Melhorar desempenho de rolagem com detectores de evento passivos][blog] para
obter uma visão geral.

Consulte o [Explainer][explainer] na especificação do detector de evento
para obter detalhes técnicos.

[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## Como ser aprovado na auditoria {: #how }

Adicione o sinalizador `passive` a todos os detectores de evento que o Lighthouse
identificar. Em geral, você deve adicionar o sinalizador `passive` a todos os detectores de evento `wheel`,
`mousewheel`, `touchstart`, e `touchmove` que não
chamarem `preventDefault()`.

Em navegadores compatíveis com detectores de evento passivos, marcar um detector como
`passive` é tão simples como definir um sinalizador:

    document.addEventListener('touchstart', onTouchStart, {passive: true});

Entretanto, em navegadores incompatíveis com detectores de evento passivos, o terceiro
parâmetro é um booleano para indicar se o evento deve surgir ou capturar.
Portanto, a sintaxe acima pode causar consequências inesperadas.

Consulte o polyfill em [Detecção de recursos][polyfill] para saber como implementar
detectores de evento passivos com segurança.

[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse usa o seguinte algoritmo para sinalizar candidatos em potencial para
detectores de evento passivos:

1. Coletar todos os detectores de evento na página.
2. Remover dos filtros detectores non-touch e non-wheel.
3. Remover dos filtros detectores que chamem `preventDefault()`.
4. Remover dos filtros detectores originados de um host diferente
 do da página.

O Lighthouse remove dos filtros detectores de hosts diferentes porque você provavelmente não tem
controle sobre esses scripts. Por causa disso, observe que a auditoria do Lighthouse
não representa o desempenho de rolagem integral da sua página. Pode
haver scripts de terceiros que prejudiquem o desempenho de rolagem da página,
mas eles não são listados no relatório do Lighthouse.


{# wf_devsite_translation #}
