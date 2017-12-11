project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Telas de toque, chips de GPS e acelerômetros podem ser difíceis de testar, já que a maioria dos computadores não tem esses recursos. Os emuladores de sensor do Chrome DevTools reduzem a sobrecarga dos testes com a emulação de sensores comuns de dispositivos móveis.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Emular sensores: geolocalização e acelerômetro {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Os chips de GPS e os acelerômetros podem ser difíceis de testar, já que a maioria dos computadores não tem esses recursos. O painel de emulação de sensores do Chrome DevTools reduz a sobrecarga dos testes com a emulação de sensores comuns de dispositivos móveis.


### TL;DR {: .hide-from-toc }
- Emule as coordenadas de geolocalização para testar modificações de geolocalização.
- Simule a orientação do dispositivo para testar dados do acelerômetro.


## Acessar controles do sensor

<div class="wf-devtools-flex">
  <div>
    <p>Para acessar os controles do sensor do Chrome DevTools:</p>
    <ol>
      <li>Abra o menu principal do DevTools e</li>
      <li>Em <strong>More Tools</strong>, clique em <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="Navegue para o painel Sensors">
  </div>
</div>

Observação: Se seu aplicativo detectar sensores onload usando JavaScript (como o Modernizr), certifique-se de recarregar a página depois de ativar os emuladores de sensor.

## Modificar dados de geolocalização

Diferentemente dos computadores, os dispositivos móveis normalmente usam hardware de GPS para detectar a localização. No painel Sensors, é possível simular coordenadas de geolocalização para usar com a <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>.

<div class="wf-devtools-flex">
  <div>
    <p>Ative a emulação de geolocalização marcando a caixa de seleção <strong>Emulate geolocation coordinates</strong> no painel de sensores da gaveta de emulação.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="emulador de geolocalização ativado">
  </div>
</div>

Você pode usar esse emulador para modificar os valores da posição para `navigator.geolocation`, assim como simular casos em que os dados de geolocalização estão indisponíveis.

## Emular acelerômetro (orientação do dispositivo)

<div class="wf-devtools-flex">
  <div>
    <p>Para testar os dados de acelerômetro que vêm da <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a>, ative o emulador de acelerômetro marcando a caixa de seleção <strong>Accelerometer</strong> no painel Sensors.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="Controle do acelerômetro">
  </div>
</div>

É possível manipular os seguintes parâmetros de orientação:

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>Rotação no eixo Z.</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>Inclinação lateral.</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>Inclinação vertical.</dd>
</dl>

Além disso, você pode clicar e arrastar o modelo de acelerômetro para a orientação desejada.

Experimente o emulador de acelerômetro com esta [demonstração de orientação do dispositivo](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html).




{# wf_devsite_translation #}
