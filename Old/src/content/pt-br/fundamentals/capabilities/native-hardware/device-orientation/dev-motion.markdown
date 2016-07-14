---
title: "Device motion"
description: "A movimentação do dispositivo fornece informações sobre a força de aceleração aplicada no dispositivo em um determinado momento e a taxa de rotação."
updated_on: 2014-10-21
key-takeaways:
  devmotion: 
    - "Use a movimentação do dispositivo quando a movimentação atual do dispositivo for necessária."
    - "<code>rotationRate</code> é fornecido em &deg;/seg."
    - "<code>acceleration</code> e <code>accelerationWithGravity</code> é fornecido em m/seg<sup>2</sup>."
    - "Preste atenção às diferenças entre as implementações do navegador."
---

<p class="intro">
  A movimentação do dispositivo fornece informações sobre a força de aceleração aplicada no dispositivo em um determinado momento e a taxa de rotação.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## Quando usar eventos de movimentação do dispositivo

Há várias utilizações para eventos de movimentação do dispositivo.  Por exemplo:

<ul>
  <li>O gesto de balançar para atualizar dados.</li>
  <li>Em jogos, para fazer com que as personagens pulem ou se movam.</li>
  <li>Para aplicativos de saúde e bem-estar</li>
</ul>

## Busque suporte e ouça os eventos

Para ouvir o `DeviceMotionEvent`, primeiro verifique se os eventos são
suportados pelo navegador.  Em seguida, anexe o escutador de eventos ao objeto `window` 
 para ouvir eventos `devicemotion`. 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## Lide com eventos de movimentação do dispositivo

O evento de movimentação do dispositivo aciona um intervalo regular e retorna dados sobre a
rotação (em &deg; por segundo) e aceleração (em m por segundo<sup>2</sup>)
do dispositivo, em qualquer ponto no tempo.  Alguns dispositivos não têm o equipamento
para excluir o efeito da gravidade.

O evento retorna quatro propriedades, 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="index.html#device-frame-coordinate">`acceleration`</a>, 
que exclui os efeitos da gravidade, 
<a href="index.html#rotation-data">`rotationRate`</a> e `interval`.

Por exemplo, vamos analisar um telefone deixado sobre uma mesa plana
com a tela virada para cima.

<table class="mdl-data-table mdl-js-data-table">
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
      <td data-th="State">Sem movimentação</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9,8]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando para cima, em direção ao céu</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14,81]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando apenas para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9,81]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando para cima &amp; para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14,81]</td>
    </tr>
  </tbody>
</table>

Por outro lado, se o telefone fosse segurado com a tela perpendicular ao
chão e diretamente visível para quem olha:

<table class="mdl-data-table mdl-js-data-table">
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
      <td data-th="State">Sem movimentação</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando para cima, em direção ao céu</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando apenas para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Movimentando para cima &amp; para a direita</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14,81, 0]</td>
    </tr>
  </tbody>
</table>

### Amostra: Calculando a aceleração máxima de um objeto

A única forma de usar eventos de movimentação do dispositivo é calculando a aceleração máxima
de um objeto.  Por exemplo, qual é a aceleração máxima de uma pessoa 
pulando.

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

Depois de tocar no botão Go!, o usuário é solicitado a pular!  Nesse momento,
a página armazena os valores de aceleração máximo (e mínimo), e depois do
pulo, diz ao usuário sua aceleração máxima.

