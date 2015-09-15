---
title: "Device orientation"
description: "O evento de orientação do dispositivo retorna dados de rotação, que inclui quanto o dispositivo está inclinando de frente para trás, lado a lado e, se o telefone ou laptop tiver um compasso, a direção do dispositivo."
updated_on: 2014-10-21
key-takeaways:
  devorientation: 
    - Use com moderação.
    - Teste por suporte.
    - Não atualize a interface do usuário em cada evento de orientação; em vez disso, sincronize para requestAnimationFrame.
---

<p class="intro">
  O evento de orientação do dispositivo retorna dados de rotação, que inclui quanto o dispositivo está inclinando de frente para trás, lado a lado e, se o telefone ou laptop tiver um compasso, a direção do dispositivo.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## Quando usar eventos de orientação do dispositivo

Há várias utilizações para eventos de orientação do dispositivo.  Por exemplo:

<ul>
  <li>Atualizar um mapa conforme o usuário se movimenta.</li>
  <li>Pequenos ajustes da interface do usuário, como por exemplo, adicionar efeitos paralaxe.</li>
  <li>Combinado com a geolocalização, pode ser usado para navegação por giro.</li>
</ul>

## Busque suporte e ouça os eventos

Para ouvir o `DeviceOrientationEvent`, primeiro verifique se os eventos são
suportados pelo navegador.  Em seguida, anexe o escutador de eventos ao objeto `window` 
para ouvir os eventos `deviceorientation`. 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

## Lidar com eventos de orientação do dispositivo

O evento de orientação de dispositivo é acionado quando o dispositivo se move ou altera a 
orientação.  Retorna dados sobre a diferença entre o dispositivo na 
sua posição atual em relação ao <a href="index.html#earth-coordinate-frame">
Frame de coordenada terrestre</a>.

O evento geralmente retorna três propriedades, 
<a href="index.html#rotation-data">`alpha`</a>, 
<a href="index.html#rotation-data">`beta`</a> e 
<a href="index.html#rotation-data">`gamma`</a>.  No Mobile Safari e
parâmetro adicional<a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a> é retornado com o cabeçalho do
compasso.


