project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os eventos de orientação e movimentação do dispositivo fornecem acesso ao acelerômetro, ao giroscópio e à bússola integrados aos dispositivos móveis.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-06-17 #}

# Orientação e movimentação do dispositivo {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Os eventos de orientação e movimentação do dispositivo oferecem acesso ao
acelerômetro, giroscópio e bússola integrados aos dispositivos móveis.

Esses eventos podem ser usados para muitos finalidades. Nos jogos, por exemplo, servem
para controlar a direção ou a ação de um personagem. Quando usados com geolocalização, eles podem
ajudar a criar uma navegação de curva a curva mais precisa ou fornecer informações sobre um
local específico.

Warning: nem todos os navegadores usam o mesmo sistema de coordenadas e, por isso, podem fornecer valores diferentes em situações idênticas. Esse problema melhorou com o tempo, mas não deixe de testar a sua situação.

## Resumo

* Detectar que lado do dispositivo está virado para cima e como o dispositivo está girando.
* Saber quando e como responder a eventos de orientação e movimentação.


## O que isso significa?

Para usar os dados retornados pelos eventos de orientação e movimentação do dispositivo,
é importante entender os valores fornecidos.  

### Frame de coordenada terrestre

O sistema de coordenadas terrestre, descrito pelos valores `X`, `Y` e `Z`, é alinhado
com base na gravidade e na orientação magnética padrão.

<table class="responsive">
<tr><th colspan="2">Sistema de coordenadas</th></tr>
<tr>
  <td><code>X</code></td>
  <td>Representa a os pontos cardeais leste-oeste (onde leste é positivo).</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>Representa os pontos cardeais norte-sul (onde norte é positivo).</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Representa as direções para cima ou para baixo, em perspectiva perpendicular ao chão
      (onde para cima é positivo).
  </td>
</tr>
</table>

### Frame de coordenada do dispositivo

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="ilustração do frame de coordenada do dispositivo">
    <figcaption>
      Ilustração do sistema de coordenadas do dispositivo
    </figcaption>
  </figure>
</div>

<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

O sistema de coordenadas do dispositivo, descrito pelos valores `x`, `y` e `z`, é alinhado
com base no centro do dispositivo.

<table class="responsive">
<tr><th colspan="2">Sistema de coordenadas</th></tr>
<tr>
  <td><code>X</code></td>
  <td>No plano da tela, é positivo à direita.</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>No plano da tela, é positivo em direção ao topo.</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Perpendicular à tela ou teclado, é positivo
    quando se afasta.
  </td>
</tr>
</table>

Em um telefone ou tablet, a orientação do dispositivo é baseada na orientação
típica da tela. Para telefones e tablets, ela é baseada no dispositivo
estando no modo retrato. Para computadores desktop ou laptop, a orientação é
considerada em relação ao teclado.

### Dados de rotação

Os dados de rotação são retornados como um [ângulo de Euler](https://en.wikipedia.org/wiki/Euler_angles),
representando o número de graus de diferença entre o sistema de coordenadas
do dispositivo e o sistema de coordenadas da Terra.

#### Alpha

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="ilustração do frame de coordenada do dispositivo">
    <figcaption>
      Ilustração de alfa no sistema de coordenadas do dispositivo
    </figcaption>
  </figure>
</div>

A rotação em torno do eixo de z. O valor de `alpha` é 0&deg; quando a parte superior do
dispositivo está apontada diretamente para o norte. Conforme o dispositivo é girado no sentido anti-horário,
o valor de `alpha` aumenta.

<div style="clear:both;"></div>

#### Beta

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="ilustração do frame de coordenada do dispositivo">
    <figcaption>
      Ilustração de beta no sistema de coordenadas do dispositivo
    </figcaption>
  </figure>
</div>

A rotação em torno do eixo de x. O valor de `beta` é 0&deg; quando a parte superior
e a inferior do dispositivo estão equidistantes da superfície da Terra. O valor
aumenta conforme a parte superior do dispositivo é inclinada em direção à superfície terrestre.

<div style="clear:both;"></div>

#### Gama

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="ilustração do frame de coordenada do dispositivo">
    <figcaption>
      Ilustração de gama no sistema de coordenadas do dispositivo
    </figcaption>
  </figure>
</div>

A rotação em torno do eixo de y. O valor de `gamma` é 0&deg; quando as extremidades direita e
esquerda do dispositivo estão equidistantes da superfície da Terra.  O valor
aumenta conforme o lado direito do dispositivo é inclinado em direção à superfície terrestre.

<div style="clear:both;"></div>

## Orientação do dispositivo

O evento de orientação do dispositivo retorna dados de rotação,  incluindo o valor
da inclinação da frente para trás e lateralmente e, se o telefone ou notebook
tiver uma bússola, para que direção o dispositivo está voltado.

Use com moderação.
Teste a compatibilidade.
Não atualiza a IU em todo evento de orientação, em vez disso, sincronize com `requestAnimationFrame`.

### Quando usar eventos de orientação do dispositivo

Existem diversos usos para os eventos de orientação do dispositivo. Veja alguns exemplos:

* Atualizar um mapa conforme o usuário se movimenta.
* Melhorias sutis na IU, por exemplo, adicionando efeitos de paralaxe.
* Combinados com geolocalização, podem ser usados para navegação de curva a curva.

### Verifique o suporte e ouça os eventos

Para detectar `DeviceOrientationEvent`, primeiro verifique se o navegador oferece suporte aos  eventos. Em seguida, anexe o ouvinte de eventos ao objeto `window` para ouvir os eventos `deviceorientation`. 

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      document.getElementById("doeSupported").innerText = "Supported!";
    }

### Gerencie os eventos de orientação do dispositivo

O evento de orientação do dispositivo é acionado quando o dispositivo se move ou altera sua 
orientação. Ele retorna dados da diferença entre o dispositivo na 
sua posição atual e o 
[sistema de coordenadas da |terra](#earth-coordinate-frame).

O evento geralmente retorna três propriedades: [`alpha`](#alpha), 
[`beta`](#beta) e [`gamma`](#gamma). No Mobile Safari, um parâmetro adicional
[`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external }
é retornado com a direção da bússola.

## Movimentação do dispositivo 

O evento de orientação do dispositivo retorna dados de rotação, incluindo o valor
da inclinação da frente para trás e lateralmente e, se o telefone ou notebook
tiver uma bússola, para que direção o dispositivo está voltado.

Use a movimentação do dispositivo quando a movimentação atual do dispositivo for necessária.
`rotationRate` é fornecido em &deg;/sec.
`acceleration` e `accelerationWithGravity` são fornecidos em m/sec<sup>2</sup>.
Não deixe de conhecer as diferenças entre as implementações em navegador.

### Quando usar eventos de movimentação do dispositivo

Existem diversos usos para os eventos de movimentação do dispositivo. Veja alguns exemplos:

* O gesto de balançar para atualizar dados.
* Nos jogos, para fazer o personagem pular ou se mover.
* Para aplicativos de exercícios físicos e bem-estar.


### Verifique o suporte e ouça os eventos

Para detectar `DeviceMotionEvent`, primeiro verifique se os eventos são
compatíveis com o navegador.  Em seguida, anexe um ouvinte de eventos ao objeto `window` 
para detectar os eventos `devicemotion`. 

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      setTimeout(stopJump, 3*1000);
    }

### Gerencie os eventos de movimentação do dispositivo

O evento de movimentação do dispositivo é acionado em um intervalo regular e retorna dados sobre a
rotação (em &deg;/segundo) e a aceleração (em m/segundo<sup>2</sup>)
do dispositivo naquele momento específico. Alguns dispositivos não têm o equipamento
para excluir o efeito da gravidade.

O evento retorna quatro propriedades: 
[`accelerationIncludingGravity`](#device-coordinate-frame), 
[`acceleration`](#device-coordinate-frame), que excluem os efeitos da
gravidade, [`rotationRate`](#rotation-data) e `interval`.

Por exemplo, vamos analisar um telefone deixado sobre uma mesa plana
com a tela virada para cima.

<table>
  <thead>
    <tr>
      <th data-th="State">Estado</th>
      <th data-th="Rotation">Rotação</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Aceleração (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Aceleração com gravidade (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Imóvel</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9,8]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo para cima, em direção ao céu</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14,81]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo apenas para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9,81]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo para cima e para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14,81]</td>
    </tr>
  </tbody>
</table>

Por outro lado, se o telefone fosse segurado com a tela perpendicular ao
chão e diretamente visível para quem olha:

<table>
  <thead>
    <tr>
      <th data-th="State">Estado</th>
      <th data-th="Rotation">Rotação</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Aceleração (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Aceleração com gravidade (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Imóvel</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo para cima, em direção ao céu</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo apenas para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movendo para cima e para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14,81, 0]</td>
    </tr>
  </tbody>
</table>

### Exemplo: Calculando a aceleração máxima de um objeto

Uma forma de usar eventos de movimentação do dispositivo é calculando a aceleração máxima
de um objeto. Por exemplo, qual é a aceleração máxima de uma pessoa 
pulando?

    if (evt.acceleration.x > jumpMax.x) {
      jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
      jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
      jumpMax.z = evt.acceleration.z;
    }


Depois de tocar no botão Go!, o usuário é instruído a pular! Nesse momento,
a página armazena os valores de aceleração máximo (e mínimo), e depois do
pulo, diz ao usuário sua aceleração máxima.


{# wf_devsite_translation #}
