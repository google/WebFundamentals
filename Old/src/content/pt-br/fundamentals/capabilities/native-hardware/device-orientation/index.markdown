---
title: "Device Orientation"
description: "Os eventos de orientação e movimento do dispositivo oferecem acesso ao acelerômetro integrado, giroscópio e compasso em dispositivos móveis."
updated_on: 2014-10-21
notes:
  not-stable:
    - "Tenha <b>muito</b> cuidado ao decidir usar os eventos de orientação ou movimento do dispositivo.  Infelizmente, nem todos os navegadores usam o mesmo sistema de coordenadas e podem relatar valores diferentes em situações idênticas."
---
<p class="intro">
  Os eventos de orientação e movimento do dispositivo oferecem acesso ao acelerômetro integrado, giroscópio e compasso em dispositivos móveis.
</p>

Esses eventos podem ser usados para vários fins; por exemplo, nos jogos para 
controlar a direção da personagem ou determinar a altura na qual uma personagem 
deve pular. Quando usado com a Geolocalização, pode criar um sistema de navegação 
giro a giro mais preciso ou fornecer informações sobre onde fica uma loja.

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

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



