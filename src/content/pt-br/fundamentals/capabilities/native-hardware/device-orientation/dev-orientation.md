project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O evento de orientação do dispositivo retorna dados de rotação, que inclui quanto o dispositivo está inclinando de frente para trás, lado a lado e, se o telefone ou laptop tiver um compasso, a direção do dispositivo.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Device orientation {: .page-title }

{% include "_shared/contributors/TODO.html" %}



O evento de orientação do dispositivo retorna dados de rotação, que inclui quanto o dispositivo está inclinando de frente para trás, lado a lado e, se o telefone ou laptop tiver um compasso, a direção do dispositivo.


## TL;DR {: .hide-from-toc }
- Use com moderação.
- Teste por suporte.
- 'Não atualize a interface do usuário em cada evento de orientação; em vez disso, sincronize para requestAnimationFrame.'


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

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

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


