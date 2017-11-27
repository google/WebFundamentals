project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O Device Mode do Chrome DevTools permite simular como seu site em desenvolvimento ficará na produção em diversos dispositivos.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Testar janelas de visualização responsivas e específicas de dispositivo {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

O Device Mode atualizado (desde o Chrome 49) é uma parte integrante do novo DevTools que prioriza a mobilidade e estende a barra principal do DevTools. Saiba como usar seus controles para simular uma grande variedade de dispositivos ou expandir totalmente a capacidade de resposta.


### TL;DR {: .hide-from-toc }
- Teste a capacidade de resposta do seu site usando o emulador de tela do Device Mode.
- Salve predefinições personalizadas para poder acessá-las facilmente depois.
- O Device Mode não substitui os testes com dispositivos reais. Esteja ciente das suas limitações.


## Usar os controles da janela de visualização {: #viewport-controls }

![Device Mode ativado](imgs/device-mode.png)

Os controles da janela de visualização permitem que você teste seu site em diversos dispositivos e com total capacidade de resposta. Há dois modos:

  1. **Responsivo**. Torna a janela de visualização livremente dimensionável com alças grandes em ambos os lados.
  2. **Específico do dispositivo**. Bloqueia a janela de visualização no tamanho exato da janela de visualização de um dispositivo específico e emula determinadas características do dispositivo.

## Modo responsivo

Recomendamos usar o **Modo responsivo** como modo de trabalho padrão. Use-o durante o desenvolvimento ativo do seu site e aplicativo e redimensione a janela de visualização com frequência para criar um design totalmente responsivo que se adapte a até mesmo tipos de dispositivos desconhecidos e futuros.

Para aproveitar ao máximo o Modo responsivo, ative a [barra de consultas de mídia](#media-queries).

### Personalizar o tamanho da janela de visualização

Arraste as grandes alças de redimensionamento da janela de visualização ou clique nos valores na barra de menu para ter um controle mais preciso.

## Modo específico de dispositivo

Use o **Modo específico de dispositivo** quando se aproximar do fim do desenvolvimento ativo e quiser aperfeiçoar a aparência do seu site em celulares específicos (por exemplo, um celular iPhone ou Nexus específico).

### Predefinições de dispositivo incorporadas

<div class="wf-devtools-flex">
  <div>
  <p>Incluímos os dispositivos mais populares atualmente no menu suspenso de dispositivo. Depois de selecionar um dispositivo, cada predefinição configura a emulação de determinadas características do dispositivo automaticamente:</p>
  <ul>
    <li>Define a string "User Agent" (UA) correta.</li>
    <li>Define a resolução e o DPI (taxa de pixels) do dispositivo.</li>
    <li>Emula eventos de toque (se aplicável).</li>
    <li>Emula sobreposições à barra de rolagem e meta viewport.</li>
    <li>Dimensiona (aprimora) automaticamente o texto de páginas sem uma janela de visualização definida.</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="selecione um dispositivo">
  </div>
</div>

### Adicionar predefinições de dispositivo personalizadas

O Device Mode oferece uma grande variedade de dispositivos para emulação. Você pode adicionar um 
dispositivo personalizado caso encontre um dispositivo de nicho ou um caso extremo que não seja coberto. 

<div class="wf-devtools-flex">
  <div>
  <p>Para adicionar um dispositivo personalizado:</p>
  <ol>
    <li>Acesse Settings no DevTools.</li>
    <li>Clique na guia <strong>Devices</strong>.</li>
    <li>Clique em <strong>Add custom device</strong>.</li>
    <li>Insira o nome, comprimento, altura, DPI e 
     a string user-agent do dispositivo.</li>
     <li>Clique em <strong>Add</strong>.</li>
  </ol>
  <p>Seu dispositivo personalizado agora está disponível no menu suspenso <strong>Device</strong>.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="selecione um dispositivo">
  </div>
</div>

### Estados e orientação do dispositivo

![Alternar orientação](imgs/change-orientation.png)

Ao emular um dispositivo específico, a barra de ferramentas do Device Mode exibe um controle adicional que serve principalmente como forma de alternar a orientação entre paisagem e retrato.

<div class="wf-devtools-flex">
  <div>
    <p>Em alguns dispositivos, o controle faz mais do que apenas mudança de orientação. Para dispositivos compatíveis, como o Nexus 5X, você terá um menu suspenso que permite emular determinados estados do dispositivo, como:</p>
    <ul>
      <li>IU padrão de navegador</li>
      <li>Com a barra de navegação do Chrome</li>
      <li>Com teclado aberto</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="Alterar a IU do dispositivo">
  </div>
</div>

### Zoom to fit  

<div class="wf-devtools-flex">
  <div>
  <p>Às vezes, você precisará testar um dispositivo que tem resolução maior do que o espaço disponível na janela do navegador. Nesses casos, a opção <strong>Zoom to fit</strong> é muito útil:</p>
  <ol>
    <li><strong>Fit to Window</strong> definirá o nível de aproximação automaticamente de acordo com o espaço máximo disponível.</li>
    <li><strong>Explicit percentages</strong> são úteis caso você queira testar o DPI em imagens, por exemplo.</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="Zoom to Fit">
  </div>
</div>

## Controles opcionais (por exemplo, toque, consultas de mídia, DPR)

<div class="wf-devtools-flex">
  <div>
  <p>Os controles opcionais podem ser alterados ou ativados clicando nos três pontos pequenos à direita da barra de ferramentas do dispositivo. As opções atuais incluem</p>
  <ul>
    <li>Tipo de user-agent (emula eventos de UA e toque)</li>
    <li>Proporção de pixels do dispositivo</li>
    <li>Consultas de mídia</li>
    <li>Réguas</li>
    <li>Configurar rede (UA, limitação de rede)</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Configurações do Device Mode">
  </div>
</div>

Continue lendo para saber mais sobre as opções específicas.

### Tipo de user-agent

A opção **User Agent Type**, ou tipo de dispositivo, permite alterar o tipo de
dispositivo. Os valores possíveis são:

  1. Mobile
  2. Desktop
  3. Desktop with touch

Alterar essa configuração influenciará na emulação do evento de toque e da janela de visualização do dispositivo móvel,
além de alterar a string UA. Assim, se quiser criar um site responsivo para
computador e quiser testar os efeitos de passar o cursor, altere para "Desktop" no Modo responsivo.

**Dica**: Você também pode definir o user-agent na gaveta [**Network conditions**][nc]
.


### Proporção de pixels do dispositivo (DPR)

Se quiser emular um dispositivo com Retina em uma máquina sem Retina, ou vice-versa, 
ajuste a opção **Device pixel ratio**. A **device pixel 
ratio** (DPR) é a relação entre pixels lógicos e físicos.
Os dispositivos com telas Retina, como o Nexus 6P, têm maior densidade de pixels 
que os dispositivos padrão, o que pode afetar a nitidez e o tamanho do conteúdo 
visual.

Alguns exemplos de sensibilidade à "proporção de pixels do dispositivo" (DPR) na Web são:

* Consultas de mídia CSS como:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* Regras CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
.

* O atributo [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 
  em imagens.

* A propriedade `window.devicePixelRatio`.

Se tiver uma tela Retina nativa, você perceberá que ativos com poucos "pontos por polegada" 
(DPI) parecem pixelados enquanto ativos com mais DPI são nítidos. Para simular 
este efeito em uma tela comum, defina o DPR como 2 e dimensione a janela de visualização 
ajustando o zoom. Um ativo 2x continuará nítido, enquanto um 1x parecerá 
pixelado.

### Consultas de mídia {: #media-queries }

[Consultas de mídia](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)
são uma parte essencial do design para Web responsivo. Para visualizar o inspetor de consultas de mídia,
clique em **Show Media queries** no menu de três pontos. O DevTools detecta consultas
de mídia na sua folha de estilo e exibe-as como barras coloridas na régua superior.

![Mostrar consultas de mídia](imgs/show-media-queries.png)

![Inspetor de consultas de mídia](imgs/media-query-inspector-ruler.png)

As consultas de mídia têm o seguinte código de cores:

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>Consultas visando uma largura máxima.</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>Consultas visando larguras dentro de um intervalo.</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>Consultas visando uma largura mínima.</td>
    </tr>
  </tbody>
</table>

#### Visualizar uma consulta de mídia rapidamente

Clique em uma barra de consulta de mídia para ajustar o tamanho da janela de visualização e os estilos de visualização para
os tamanhos de tela de destino.

#### Visualizar o CSS associado

Clique com o botão direito em uma barra para visualizar onde a consulta de mídia está definida no CSS e ir diretamente
para a definição no código-fonte.

![Visualização de consultas de mídia no Web Fundamentals](imgs/reveal-source-code.png)

### Réguas

Ative a opção Rulers para mostrar réguas de pixels ao lado da janela de visualização.

### Configurar rede (UA, limitação de rede)

Selecionar a opção Configure network abrirá um painel na gaveta que permitirá que você altere
comportamentos relacionados à rede:

  1. **Disk Cache**: Desativar Disk Cache impede que as páginas e seus ativos sejam
 armazenados em cache pelo navegador enquanto o DevTools está aberto.
  2. **Network Throttling**: Leia mais sobre [Limitação de rede aqui](/web/tools/chrome-devtools/network-performance/network-conditions).
  3. **User Agent**: Permite definir a modificação de uma string UA (User Agent)
     específica.

**Dica**: Você também pode abrir a gaveta **Network conditions** no 
[menu principal][nc].

## Limitações

O Device Mode tem algumas limitações.

* **Componentes do dispositivo**
  * O comportamento do CPU e do GPU não são emulados.
* **IU do navegador**
  * Telas do sistema, como a barra de endereço, não são emuladas.
  * Telas nativas, como elementos `<select>`, não são emuladas como uma lista modal.
  * Algumas melhorias, como a entrada de números para abrir um teclado, podem variar do comportamento real do dispositivo.
* **Funcionalidade do navegador**
  * O WebGL opera no emulador, mas não é compatível com dispositivos iOS 7.
  * MathML não é compatível com o Chrome, mas é com dispositivos iOS 7.
  * O [erro de zoom na orientação do iOS 5](https://github.com/scottjehl/device-bugs/issues/2) não é emulado.
  * A propriedade CSS line-height opera no emulador, mas não é compatível com o Opera Mini.
  * Os limites de regra do CSS, como os do [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), não são emulados.
* **AppCache**
  * O emulador não modifica o <abbr title="User Agent">UA</abbr> para [arquivos de manifesto](https://code.google.com/p/chromium/issues/detail?id=334120) ou [solicitações de origem da vista](https://code.google.com/p/chromium/issues/detail?id=119767) do AppCache.

Apesar dessas limitações, o Device Mode é robusto o suficiente para a maioria das tarefas.
Quando precisar testar em um dispositivo real, você pode usar a 
[Depuração remota](/web/tools/chrome-devtools/debug/remote-debugging) 
para obter informações adicionais.


[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
