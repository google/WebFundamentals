project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Depure remotamente conteúdo ativo de um dispositivo Android em um computador Windows, Mac ou Linux.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Primeiros passos com a depuração remota de dispositivos Android {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Depure remotamente conteúdo ativo de um dispositivo Android remotamente em um computador 
Windows, Mac ou Linux. Este tutorial ensina a:

* configurar seu dispositivo Android para a depuração remota e descobri-lo usando sua
  máquina de desenvolvimento;
* inspecionar e depurar conteúdo ativo no seu dispositivo Android usando sua
  máquina de desenvolvimento;
* fazer screencast do conteúdo de um dispositivo Android para uma instância do DevTools em sua
  máquina de desenvolvimento.

<figure>
  <img src="imgs/remote-debugging.png"
       alt="A depuração remota permite inspecionar uma página em execução em um dispositivo Android
            de sua máquina de desenvolvimento."/>
  <figcaption>
    <b>Imagem 1</b>. A depuração remota permite inspecionar uma página em execução em um dispositivo Android
            da sua máquina de desenvolvimento.
  </figcaption>
</figure>

## Etapa 1: descobrir o dispositivo Android {: #discover }

O fluxo de trabalho abaixo funciona para a maioria dos usuários. Veja [Solução de problemas: o DevTools não está detectando o dispositivo
Android](#troubleshooting) para mais ajuda.

1. Abra a tela **Developer Options** no Android. Veja [Configurar as Opções do desenvolvedor no
   dispositivo](https://developer.android.com/studio/debug/dev-options.html){:.external}.
1. Selecione **Enable USB Debugging**.
1. Na máquina de desenvolvimento, abra o Chrome.
1. [Abra o DevTools](/web/tools/chrome-devtools/#open).
1. No DevTools, clique em **Main Menu** ![Menu principal][main]{:.devtools-inline} 
   e selecione **More tools** > **Remote devices**. 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="Abrir a guia Remote Devices por meio do Main Menu."/>
       <figcaption>
         <b>Imagem 2</b>. Abrir a guia <b>Remote Devices</b> por meio do <b>Main Menu</b>
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. No DevTools, abra a guia **Settings**.

1. Verifique se a caixa de seleção **Discover USB devices** está ativada.

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="A caixa de seleção Discover USB Devices está
           ativada."/>
       <figcaption>
         <b>Imagem 3</b>. A caixa de seleção <b>Discover USB Devices</b> está ativada
       </figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Conecte diretamente o dispositivo Android à máquina de desenvolvimento usando um cabo
   USB. A primeira vez que você faz isso, você geralmente percebe que o DevTools detectou um dispositivo
   desconhecido. Se você ver um ponto verde e o texto **Connected** abaixo do nome do
   modelo do seu dispositivo Android, o DevTools estabeleceu a conexão para
   o dispositivo. Continuar para a [Etapa 2](#debug)

     <figure>
       <img src="imgs/unknown-device.png" alt="A guia Remote Devices detectou
           um dispositivo desconhecido que aguarda autorização."/>
       <figcaption>
         <b>Imagem 4</b>. A guia <b>Remote Devices</b> detectou um dispositivo
         desconhecido que aguarda autorização
       </figcaption>
     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Se o seu dispositivo estiver aparecendo como **Unknown**, aceite a solicitação de permissão **Allow USB
   Debugging** em seu dispositivo Android. 

### Solução de problemas: O DevTools não está detectando o dispositivo Android {: #troubleshooting }

Certifique-se de que seu hardware esteja configurado corretamente:

* Se você estiver usando um hub USB, tente conectar seu dispositivo Android diretamente à sua
  máquina de desenvolvimento.
* Tente desconectar o cabo USB entre o dispositivo Android e a máquina de desenvolvimento e
  conectá-lo novamente. Faça isso enquanto as telas de seu Android e da máquina de desenvolvimento
 estiverem desbloqueadas.
* Certifique-se de que o seu cabo USB funciona. Deve ser possível inspecionar arquivos em seu dispositivo Android
  de sua máquina de desenvolvimento.

Certifique-se de que seu software esteja configurado corretamente:

* Se sua máquina de desenvolvimento estiver executando o Windows, tente instalar manualmente os drivers USB para
  seu dispositivo Android. Veja [Instalar drivers USB OEM][drivers]{:.external}.
* Algumas combinações de dispositivos Windows e Android (especialmente Samsung) exigem configurações
  adicionais. Veja [Dispositivos Chrome DevTools não detectam o dispositivo quando conectado][SO]{:.external}.

Se você não vir o prompt **Allow USB Debugging** no seu dispositivo Android, tente:

* desconectar e reconectar o cabo USB enquanto o DevTools está em foco
  na sua máquina de desenvolvimento e a tela inicial do Android está aparecendo. Em outras palavras,
  às vezes o prompt não aparece quando as telas do Android ou da sua máquina de desenvolvimento
  estão bloqueadas;
* atualizar as configurações de tela do dispositivo Android e da máquina de
  desenvolvimento para que eles nunca fiquem suspensos;
* configurar o modo USB do Android para PTP. Veja [a caixa de diálogo O Galaxy S4 não mostra a autorização para
 depuração USB](https://android.stackexchange.com/questions/101933){: .external };
* selecionar **Revoke USB Debugging Authorizations** na tela **Developer Options** no
 dispositivo Android para redefini-lo para um novo estado.

Se você encontrar uma solução que não se encontre nesta seção ou em [Dispositivos Chrome DevTools
não detectam dispositivo quando conectado no][SO]{: .external}, adicione uma resposta a essa pergunta do Stack
Overflow ou [abra um problema no repositório do webfundamentals][issue]{:.external}!

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## Etapa 2: depurar conteúdo no dispositivo Android em uma máquina de desenvolvimento {: #debug }

1. Abra o Chrome em seu dispositivo Android.
1. Em **Remote Devices**, clique na guia que corresponde ao nome do modelo do seu dispositivo Android.
   Na parte superior da página, você verá o nome do modelo   do dispositivo Android, seguido pelo número
   de série. Abaixo, você verá a versão do Chrome executado no dispositivo, com
   o número de versão entre parênteses. Cada guia aberta do Chrome tem a própria seção. Você pode
   interagir com essa guia nessa seção. Se um aplicativo estiver usando o WebView, você também verá
    uma seção para cada um desses aplicativos. Na <b>Imagem 5</b> não há guias nem WebViews abertos.

     <figure>
       <img src="imgs/connected-remote-device.png" alt="Um dispositivo remoto conectado."/>
       <figcaption>
         <b>Imagem 5</b>. Um dispositivo remoto conectado
       </figcaption>
     </figure>

1. Na caixa de texto **New tab**, insira um URL e clique em **Open**. A página abre
   em uma nova guia no seu dispositivo Android.

1. Clique em **Inspect** ao lado do URL que acabou de abrir. Será aberta uma nova
   instância do DevTools. A versão do Chrome executada no dispositivo Android
   determina a versão do DevTools aberta na máquina de desenvolvimento.
   Portanto, se a versão do Chrome em execução no dispositivo Android for muito antiga, a
   instância do DevTools poderá ser bem diferente da habitual.

### Mais ações: atualizar, atribuir foco ou fechar uma guia {: #more-actions }

Clique em **More Options** ![Mais opções][more]{:.devtools-inline} ao lado da
guia que você quer atualizar, atribuir foco ou fechar.

[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="O menu para recarregar, atribuir foco ou fechar uma guia."/>
  <figcaption>
    <b>Imagem 6</b>. O menu para recarregar, atribuir foco ou fechar uma guia
  </figcaption>
</figure>

### Inspecionar elementos {: #inspect }

Acesse o painel **Elements** da instância do DevTools e passe o cursor sobre um
elemento para destacá-lo na janela de visualização do dispositivo Android.

Também é possível tocar em um elemento na tela do dispositivo Android para selecioná-lo no
painel **Elements**. Clique em **Select Element** ![Selecionar
Elemento][select]{:.devtools-inline} na instância do DevTools e toque
o elemento na tela do dispositivo Android. Observe que **Select Element**
é desativado após o primeiro toque. Portanto, é necessário reativá-lo sempre que
você quiser usar esse recurso.

[select]: imgs/select-element.png

### Transmitir a tela do Android para a máquina de desenvolvimento {: #screencast }

Clique em **Toggle Screencast** ![Alternar screencast][screencast]{:.devtools-inline}
para ver o conteúdo do dispositivo Android na instância do DevTools.

[screencast]: imgs/toggle-screencast.png

Você pode interagir com o screencast de diversas maneiras:

* Os cliques são convertidos em toques, acionando eventos de toque corretos no dispositivo. 
* O comando das teclas pressionadas no computador é enviado ao dispositivo. 
* Para simular um gesto de pinça, mantenha <kbd>Shift</kbd> pressionado enquanto arrasta. 
* Para rolar, use o trackpad, a barra de roda do mouse ou navegue com o cursor do
  mouse.

Algumas observações sobre screencasts:

* Os screencasts exibem somente o conteúdo da página. As partes transparentes do screencast 
  representam interfaces do dispositivo, como a barra de endereço do Chrome, a barra 
  de status ou o teclado do Android.
* Os screencasts afetam negativamente as taxas de frames. Desative screencasts durante
  a medição de rolagens ou animações para ter uma noção mais precisa do
  desempenho da página.
* Se a tela do dispositivo Android bloquear, o conteúdo do screencast
  desaparecerá. Desbloqueie a tela do dispositivo Android para retomar automaticamente o
  screencast.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
