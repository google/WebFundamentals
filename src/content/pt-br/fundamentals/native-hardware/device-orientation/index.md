project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os eventos de orientação e movimento do dispositivo oferecem acesso ao acelerômetro integrado, giroscópio e compasso em dispositivos móveis.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Device Orientation {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


Os eventos de orientação e movimento do dispositivo oferecem acesso ao acelerômetro integrado, giroscópio e compasso em dispositivos móveis.

Esses eventos podem ser usados para vários fins; por exemplo, nos jogos para 
controlar a direção da personagem ou determinar a altura na qual uma personagem 
deve pular. Quando usado com a Geolocalização, pode criar um sistema de navegação 
giro a giro mais preciso ou fornecer informações sobre onde fica uma loja.

<!-- TODO: Verify note type! -->
Note: Tenha <b>muito</b> cuidado ao decidir usar os eventos de orientação ou movimento do dispositivo.  Infelizmente, nem todos os navegadores usam o mesmo sistema de coordenadas e podem relatar valores diferentes em situações idênticas.

## Qual objetivo é utilizado?

Para utilizar os dados retornados pelos eventos de orientação e movimentação do dispositivo,
é importante compreender os valores fornecidos.  

### Frame de coordenada terrestre

O frame de coordenada terrestre, descrito através dos valores `X`, `Y` e `Z`, é alinhado 
com base na gravidade e na orientação magnética padrão.

<ul>
  <li>
    <b>X:</b> representa a direção leste-oeste (onde o leste é positivo).
  </li>
    <li>
    <b>Y:</b> representa a direção norte-sul (onde o norte é positivo).
  </li>
    <li>
    <b>Z:</b> representa uma direção para cima e para baixo, perpendicular ao chão
    (onde para cima é positivo).
  </li>
</ul>

### Frame de coordenada do dispositivo

O frame de coordenada do dispositivo, descrito através dos valores `x`, `y` e `z`, é alinhado 
com base no centro do dispositivo.

<img src="images/axes.png" alt="ilustração do frame de coordenada do dispositivo">
<!-- Agradecimentos especiais ao Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy) 
 por suas imagens, que são de domínio público. -->

<ul>
  <li>
    <b>x:</b> no plano da tela, positivo para a direita.
  </li>
    <li>
    <b>y:</b> no plano da tela, positivo em direção ao topo.
  </li>
    <li>
    <b>z:</b> perpendicular à tela ou ao teclado, positivo se estendendo
 .
  </li>
</ul>

Em um telefone ou tablet, a orientação do dispositivo é baseada na orientação
típica da tela.  Para telefones e tablets, baseia-se no dispositivo
estando no modo retrato. Para computadores desktop ou laptop, a orientação é 
considerada em relação ao teclado.

### Dados de rotação

Os dados de rotação são retornados como [ângulo de Euler](http://en.wikipedia.org/wiki/Euler_angles),
representando o número de graus de diferença entre o frame de coordenada
do dispositivo e o frame de coordenada terrestre.

<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> A orientação ao redor do eixo z e é 0&deg; quando o topo do
    dispositivo está apontado diretamente para o norte.  Conforme o dispositivo é girado no sentido anti-horário
    o valor de`alpha` aumenta.
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>beta:</b> A orientação ao redor do eixo x e é 0&deg; quando o topo e 
    a parte inferior do dispositivo estão equidistantes da superfície terrestre. O valor
    aumenta conforme o topo do dispositivo é inclinado em direção à superfície terrestre.
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> A rotação ao redor do eixo y e é 0&deg; quando a parte direita e
    esquerda do dispositivo estão equidistantes da superfície terrestre.  O valor
    aumenta conforme o lado direito do dispositivo é inclinado em direção à superfície terrestre. 
  </div>
</div>

<div style="clear:both;"></div>





## Device orientation 




O evento de orientação do dispositivo retorna dados de rotação, que inclui quanto o dispositivo está inclinando de frente para trás, lado a lado e, se o telefone ou laptop tiver um compasso, a direção do dispositivo.


### TL;DR {: .hide-from-toc }
- Use com moderação.
- Teste por suporte.
- 'Não atualize a interface do usuário em cada evento de orientação; em vez disso, sincronize para requestAnimationFrame.'


### Quando usar eventos de orientação do dispositivo

Há várias utilizações para eventos de orientação do dispositivo.  Por exemplo:

<ul>
  <li>Atualizar um mapa conforme o usuário se movimenta.</li>
  <li>Pequenos ajustes da interface do usuário, como por exemplo, adicionar efeitos paralaxe.</li>
  <li>Combinado com a geolocalização, pode ser usado para navegação por giro.</li>
</ul>

### Busque suporte e ouça os eventos

Para ouvir o `DeviceOrientationEvent`, primeiro verifique se os eventos são
suportados pelo navegador.  Em seguida, anexe o escutador de eventos ao objeto `window` 
para ouvir os eventos `deviceorientation`. 

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

### Lidar com eventos de orientação do dispositivo

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




## Device motion 




A movimentação do dispositivo fornece informações sobre a força de aceleração aplicada no dispositivo em um determinado momento e a taxa de rotação.


### TL;DR {: .hide-from-toc }
- Use a movimentação do dispositivo quando a movimentação atual do dispositivo for necessária.
- <code>rotationRate</code> é fornecido em &deg;/seg.
- <code>acceleration</code> e <code>accelerationWithGravity</code> é fornecido em m/seg<sup>2</sup>.
- Preste atenção às diferenças entre as implementações do navegador.


### Quando usar eventos de movimentação do dispositivo

Há várias utilizações para eventos de movimentação do dispositivo.  Por exemplo:

<ul>
  <li>O gesto de balançar para atualizar dados.</li>
  <li>Em jogos, para fazer com que as personagens pulem ou se movam.</li>
  <li>Para aplicativos de saúde e bem-estar</li>
</ul>

### Busque suporte e ouça os eventos

Para ouvir o `DeviceMotionEvent`, primeiro verifique se os eventos são
suportados pelo navegador.  Em seguida, anexe o escutador de eventos ao objeto `window` 
 para ouvir eventos `devicemotion`. 

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot" lang=javascript %}
</pre>

### Lide com eventos de movimentação do dispositivo

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

#### Amostra: Calculando a aceleração máxima de um objeto

A única forma de usar eventos de movimentação do dispositivo é calculando a aceleração máxima
de um objeto.  Por exemplo, qual é a aceleração máxima de uma pessoa 
pulando.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand" lang=javascript %}
</pre>

Depois de tocar no botão Go!, o usuário é solicitado a pular!  Nesse momento,
a página armazena os valores de aceleração máximo (e mínimo), e depois do
pulo, diz ao usuário sua aceleração máxima.

