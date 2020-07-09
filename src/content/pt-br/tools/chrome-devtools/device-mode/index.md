project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Use dispositivos virtuais no Device Mode do Chrome para criar sites que priorizam os dispositivos móveis.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# Simular dispositivos móveis com o Device Mode no Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use o Device Mode para visualizar como sua página ficará e funcionará em um dispositivo móvel.

Device Mode é o nome de um conjunto de recursos avulsos no Chrome DevTools que
ajuda você a simular dispositivos móveis. Esses recursos incluem:

* [Simulação de uma janela de visualização móvel](#viewport)
* [Controle de rede](#network)
* [Controle de CPU](#cpu)
* [Simulação de geolocalização](#geolocation)
* [Definição de orientação](#orientation)

## Limitações {: #limitations }

Pense no Device Mode como uma [aproximação de primeira ordem][approximation]{:.external} de como sua
página ficará em um dispositivo móvel. Com o Device Mode você não precisa executar seu código
em um dispositivo móvel. Você simula a experiência do usuário de dispositivos móveis no seu laptop ou computador desktop.

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

Existem alguns aspectos dos dispositivos móveis que o DevTools nunca conseguirá simular. Por
exemplo, a arquitetura das CPUs de dispositivos móveis é muito diferente da arquitetura das CPUs de um laptop
ou computador desktop. Se você tiver dúvidas, o melhor a fazer é executar sua página em um dispositivo móvel.
Use a [Depuração remota](/web/tools/chrome-devtools/remote-debugging/) para visualizar, alterar, depurar
e definir o código de uma página a partir do seu laptop ou computador desktop enquanto ele é executado em um dispositivo móvel.

## Simular uma janela de visualização de um dispositivo móvel {: #viewport }

Clique em **Toggle Device Toolbar** ![Alternar barra de ferramentas do dispositivo][TDB]{: .inline-icon } para abrir a IU que
permite a você simular uma janela de visualização de um dispositivo móvel.

[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="A barra de ferramentas do dispositivo."/>
  <figcaption>
    <b>Imagem 1</b>. A barra de ferramentas do dispositivo
  </figcaption>
</figure>

Por padrão, a barra de ferramentas do dispositivo abre em modo de janela de visualização responsiva.

### Modo de janela de visualização responsiva {: #responsive }

Arraste as alças para redimensionar a janela de visualização para qualquer dimensão desejada. Ou insira valores específicos
nos campos de largura e altura. Na **Imagem 2**, a largura está definida como `628`, e a altura como
`662`.

<figure>
  <img src="imgs/responsive-handles.png"
       alt="As alças para alterar as dimensões da janela de visualização quando no Modo de janela de visualização responsiva."/>
  <figcaption>
    <b>Imagem 2</b>. As alças para alterar as dimensões da janela de visualização no Modo de janela de visualização responsiva.
  </figcaption>
</figure>

#### Mostrar consultas de mídias {: #queries }

Para mostrar os pontos de interrupção de consultas de mídia acima da sua janela de visualização, clique em **More options** e selecione **Show media
queries**.

<figure>
  <img src="imgs/show-media-queries.png"
       alt="Mostrar consultas de mídias."/>
  <figcaption>
    <b>Imagem 3</b>. Mostrar consultas de mídia
  </figcaption>
</figure>

Clique em um ponto de interrupção para alterar a largura da janela de visualização de modo que o ponto de interrupção seja acionado.

<figure>
  <img src="imgs/breakpoint.png"
       alt="Clique em um ponto de interrupção para alterar a largura da janela de visualização."/>
  <figcaption>
    <b>Imagem 4</b>. Clique em um ponto de interrupção para alterar a largura da janela de visualização
  </figcaption>
</figure>

### Modo de janela de visualização do dispositivo móvel {: #device }

Pra simular as dimensões de um dispositivo móvel específico, selecione-o na lista **Device**.

<figure>
  <img src="imgs/device-list.png"
       alt="A lista de dispositivos."/>
  <figcaption>
    <b>Imagem 5</b>. A lista de dispositivos
  </figcaption>
</figure>

#### Gire a janela de visualização para usar a orientação paisagem {: #landscape }

Clique em **Rotate** ![Girar](imgs/rotate.png){: .inline-icon } para girar a janela de visualização e usar a orientação paisagem.

<figure>
  <img src="imgs/landscape.png"
       alt="Orientação paisagem."/>
  <figcaption>
    <b>Imagem 6</b>. Orientação paisagem
  </figcaption>
</figure>

O botão **Rotate** desaparece se a **barra de ferramentas do dispositivo** for estreita.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="A barra de ferramentas do dispositivo."/>
  <figcaption>
    <b>Imagem 7</b>. A barra de ferramentas do dispositivo
  </figcaption>
</figure>

Veja também [Definir orientação](#orientation).

#### Mostrar frame do dispositivo {: #frame }

Ao simular as dimensões de um dispositivo móvel específico, como um iPhone 6, abra **More options**
e selecione **Show device frame** para exibir o frame do dispositivo físico ao redor da janela de visualização.

Note: Se você não visualizar um frame de dispositivo para um dispositivo em particular, isso provavelmente significa que o DevTools
não possui uma arte para essa opção específica.

<figure>
  <img src="imgs/show-device-frame.png"
       alt="Mostrar frame do dispositivo."/>
  <figcaption>
    <b>Imagem 8</b>. Mostrar frame do dispositivo
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="O frame do dispositivo para o iPhone 6."/>
  <figcaption>
    <b>Imagem 9</b>. O frame do dispositivo para o iPhone 6
  </figcaption>
</figure>

### Mostrar réguas {: #rulers }

Clique em **More options** e selecione **Show rulers** para visualizar as réguas acima e à esquerda
da sua janela de visualização. A unidade de dimensionamento das réguas é o pixel.

<figure>
  <img src="imgs/show-rulers.png"
       alt="Mostrar réguas."/>
  <figcaption>
    <b>Imagem 10</b>. Mostrar réguas
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="Réguas acima e à esquerda da janela de visualização."/>
  <figcaption>
    <b>Imagem 11</b>. Réguas acima e à esquerda da janela de visualização
  </figcaption>
</figure>

### Aumente o zoom da janela de visualização {: #zoom }

Use a lista de **Zoom** para aumentar ou diminuir o zoom.

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="Zoom."/>
  <figcaption>
    <b>Imagem 11</b>. Zoom
  </figcaption>
</figure>

## Limitar a rede e a CPU {: #throttle }

Para limitar a rede e a CPU, selecione **Mid-tier mobile** ou **Low-end mobile**
na lista **Throttle**.

<figure>
  <img src="imgs/throttling.png"
       alt="A lista Throttle."/>
  <figcaption>
    <b>Imagem 12</b>. A lista Throttle
  </figcaption>
</figure>

O **Mid-tier mobile** simula uma conexão 3G rápida e limita sua CPU de modo que ela fique quatro vezes
mais lenta que o normal. O **Low-end mobile** simula uma conexão 3G lenta e limita sua CPU 6 de modo que ela fique seis vezes mais lenta que o normal.
Tenha em mente que o limite é relativo à capacidade normal do seu laptop ou computador desktop.

Observe que a lista **Throttle** ficará escondida se a **barra de ferramentas do dispositivo** for estreita.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="A barra de ferramentas do dispositivo."/>
  <figcaption>
    <b>Imagem 13</b>. A barra de ferramentas do dispositivo
  </figcaption>
</figure>

### Limitar apenas a CPU {: #cpu }

Para limitar somente a CPU e não a rede, acesse o painel **Performance**, clique em
**Capture Settings** ![Configurações de captura][capture]{:.inline-icon}e selecione
**4x slowdown** ou **6x slowdown** na lista **CPU**.

<figure>
  <img src="imgs/cpu.png"
       alt="A lista CPU."/>
  <figcaption>
    <b>Imagem 14</b>. A lista CPU
  </figcaption>
</figure>

### Limitar apenas a rede {: #network }

Para limitar somente a rede e não a CPU, acesse o painel **Network** e selecione
**Fast 3G** ou **Slow 3G** na lista **Throttle**.

<figure>
  <img src="imgs/network.png"
       alt="A lista Throttle."/>
  <figcaption>
    <b>Imagem 14</b>. A lista Throttle
  </figcaption>
</figure>

Ou pressione <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) ou
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) para abrir
o menu de comando, digite `3G` e selecione **Enable fast 3G throttling** ou
**Enable slow 3G throttling**.

<figure>
  <img src="imgs/commandmenu.png"
       alt="O menu de comando."/>
  <figcaption>
    <b>Imagem 15</b>. O menu de comando
  </figcaption>
</figure>

Você também pode definir o limite da rede no painel **Performance**. Clique em
**Capture Settings** ![Configurações de captura][capture]{: .inline-icon } e depois
selecione **Fast 3G** ou **Slow 3G** na lista **Network**.

<figure>
  <img src="imgs/network2.png"
       alt="Configuração de limite da rede no painel Performance."/>
  <figcaption>
    <b>Imagem 16</b>. Configuração de limite da rede no painel Performance
  </figcaption>
</figure>

## Modificar geolocalização {: #geolocation }

Para abrir a IU de modificação da geolocalização, clique em **Customize and control DevTools**
![Personalizar e controlar DevTools][customize]{: .inline-icon } e selecione
**More tools** > **Sensors**.

<figure>
  <img src="imgs/sensors.png"
       alt="Sensores"/>
  <figcaption>
    <b>Imagem 17</b>. Sensores
  </figcaption>
</figure>

Ou pressione <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) ou
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) para abrir
o menu de comando, digite `Sensors` e selecione **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Mostrar sensores"/>
  <figcaption>
    <b>Imagem 18</b>. Mostrar sensores
  </figcaption>
</figure>

Selecione uma das predefinições da lista **Geolocation** ou selecione **Custom location**
para inserir as próprias coordenadas. Você também pode selecionar **Location unavailable** para testar como sua
página se comporta quando a geolocalização está em estado de erro.

<figure>
  <img src="imgs/geolocation.png"
       alt="Geolocalização"/>
  <figcaption>
    <b>Imagem 19</b>. Geolocalização
  </figcaption>
</figure>

## Definir orientação {: #orientation }

Para abrir a IU de orientação, clique em **Customize and control DevTools**
![Personalizar e controlar DevTools][customize].{: .inline-icon } e selecione
**More tools** > **Sensors**.


<figure>
  <img src="imgs/sensors.png"
       alt="Sensores"/>
  <figcaption>
    <b>Imagem 20</b>. Sensores
  </figcaption>
</figure>

Ou pressione <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) ou
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) para abrir
o menu de comando, digite `Sensors` e selecione **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Mostrar sensores"/>
  <figcaption>
    <b>Imagem 21</b>. Mostrar sensores
  </figcaption>
</figure>

Selecione uma das predefinições da lista **Orientation** ou selecione **Custom orientation**
para definir seus próprios valores Alfa, Beta e Gama.

<figure>
  <img src="imgs/orientation.png"
       alt="Orientação"/>
  <figcaption>
    <b>Imagem 22</b>. Orientação
  </figcaption>
</figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}

Consulte [Junte-se à comunidade DevTools](/web/tools/chrome-devtools/#community) para ver outras maneiras
de enviar seu feedback.
