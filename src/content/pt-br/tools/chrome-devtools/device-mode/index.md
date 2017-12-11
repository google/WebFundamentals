project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use dispositivos virtuais no Device Mode do Chrome para criar sites que priorizam os dispositivos móveis.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Simular dispositivos móveis com Device Mode {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Use o Device Mode do Chrome DevTools para criar sites totalmente responsivos e que priorizam dispositivos móveis. Saiba como usá-lo para simular diversos dispositivos diferentes e seus recursos.

Aviso: O Device Mode oferece uma boa aproximação de como seu site
ficará em um dispositivo móvel, mas, para ter uma perspectiva completa, teste
seu site em dispositivos reais. O DevTools não pode emular as características
de desempenho de dispositivos móveis, por exemplo.


## Resumo

* Emule seu site em [diferentes tamanhos e resoluções de tela](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports), incluindo telas Retina.
* Projete com responsividade visualizando e [inspecionando consultas de mídia CSS](/web/tools/chrome-devtools/iterate/device-mode/media-queries).
* Avalie o desempenho do seu site usando o [emulador de rede](/web/tools/chrome-devtools/network-performance/network-conditions), sem afetar o tráfego de outras abas.
* [Simule entradas de dispositivo](/web/tools/chrome-devtools/device-mode/device-input-and-sensors) com precisão para eventos de toque, geolocalização e orientação do dispositivo

## Alternar Device Mode {: #toggle }

Use o botão **Device Mode** para ativar ou desativar o Device Mode.

![Início do Device Mode](imgs/device-mode-initial-view.png)

Quando o Device Mode está ativado, o ícone é azul
(![Device Mode ativado](imgs/device-mode-on.png)).

Quando ele está desativado, o ícone é cinza
(![Device Mode desativado](imgs/device-mode-off.png)).

O Device Mode é ativado por padrão. 

Você também pode alternar o Device Mode pressionando
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Mac) ou
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Windows, Linux).
Para usar esse atalho, o mouse deve estar focado na janela do DevTools.
Se ele estiver focado na janela de visualização, você acionará o [atalho de alternar usuário
do Chrome](https://support.google.com/chrome/answer/157179).





{# wf_devsite_translation #}
