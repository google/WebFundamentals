project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Depure remotamente conteúdo ativo de um dispositivo Android em um computador Windows, Mac ou Linux.

{# wf_updated_on: 2016-12-09 #}
{# wf_published_on: 2015-04-13 #}

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

* Configurar seu dispositivo Android para a depuração remota e descobri-lo usando sua
  máquina de desenvolvimento.
* Inspecionar e depurar conteúdo ativo no seu dispositivo Android usando sua
  máquina de desenvolvimento.
* Fazer screencast do conteúdo de um dispositivo Android para uma instância do DevTools em sua
  máquina de desenvolvimento.

![ilustração de depuração remota](imgs/remote-debugging.png)

## Requisitos {: #requirements }

* Chrome 32 ou posterior instalado na máquina de desenvolvimento.
* [Drivers USB][drivers] instalados na máquina de desenvolvimento, se estiver usando
  Windows. Assegure que o _Device Manager_ identifique o dispositivo USB correto.
* Um cabo USB para conectar o dispositivo Android à máquina de desenvolvimento.
* Android 4.0 ou posterior.
* Chrome for Android instalado no dispositivo Android.

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

## Etapa 1: descobrir o dispositivo Android {: #discover }

1. No dispositivo Android, selecione **Settings** > **Developer Options** >
   **Enable USB Debugging**. Por padrão, **Developer Options** está oculto no
   Android 4.2 ou posterior. Consulte [Ativar opções do desenvolvedor no dispositivo][android]
   para saber como ativá-las.

[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. Na máquina de desenvolvimento, abra o Chrome. Você deve fazer login no
   Chrome com uma das suas contas do Google. A depuração remota não funciona no
   [modo de navegação anônima][incognito] ou no [modo visitante][guest].

[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [Abra o DevTools](/web/tools/chrome-devtools/#open).

1. No DevTools, clique em **Main Menu** ![Main Menu][main]{:.devtools-inline} 
   e selecione **More tools** > **Remote devices**. 

     ![Abrir a gaveta de dispositivos remotos][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. No DevTools, clique na guia **Settings**, se outra guia estiver sendo exibida.

1. Verifique se **Discover USB devices** está ativado.

     ![Discover USB devices está ativado][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Conecte diretamente o dispositivo Android à máquina de desenvolvimento usando um cabo
   USB. Não use nenhum hub USB intermediário. Se esta for a primeira vez
   que o dispositivo Android é conectado a essa máquina de desenvolvimento, o dispositivo
   será exibido em **Unknown**, com o texto **Pending Authorization** abaixo
   dele.

       ![Dispositivo desconhecido, autorização pendente][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Se o dispositivo for exibido como **Unknown**, aceite a solicitação de permissão **Allow USB
   Debugging** no dispositivo Android. **Unknown** será
   substituído pelo nome do modelo do dispositivo Android. O círculo verde
   e o texto **Connected** indicam que você está pronto para depurar
   remotamente o dispositivo Android na máquina de desenvolvimento.

Observação: se ocorrer algum problema no processo de descoberta, você poderá 
reiniciá-lo selecionando **Settings** > **Developer Options** >
**Revoke USB Debugging Authorizations** no dispositivo Android.

## Etapa 2: depurar conteúdo no dispositivo Android em uma máquina de desenvolvimento {: #debug }

1. Se o Chrome ainda não estiver aberto no dispositivo Android, abra-o agora.

1. No DevTools, clique na guia correspondente ao nome do modelo
   do dispositivo. Na parte superior dessa página, você verá o nome do modelo
   do dispositivo Android, seguido pelo número de série. Abaixo, você verá a versão
   do Chrome executado no dispositivo, com o número de versão
   entre parênteses. Cada guia aberta do Chrome tem a sua própria seção. Você pode interagir
   com essa guia nessa seção. Se qualquer aplicativo estiver usando o WebView, você
   também verá uma seção para cada um desses aplicativos. A captura de tela abaixo não
   tem nenhuma guia ou WebView aberta.

       ![Dispositivo remoto conectado][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. Ao lado de **New tab**, insira um URL e clique em **Open**. A página abre
   em uma nova guia no dispositivo Android.

1. Clique em **Inspect** ao lado do URL que acabou de abrir. Será aberta uma nova
   instância do DevTools. A versão do Chrome executada no dispositivo Android
   determina a versão do DevTools aberta na máquina de desenvolvimento.
   Portanto, se o dispositivo Android estiver executando uma versão bastante antiga do Chrome, a
   instância do DevTools poderá ser bem diferente da habitual.

### Mais ações: atualizar, atribuir foco ou fechar uma guia {: #more-actions }

Clique em **More Options** ![Mais opções][more]{:.devtools-inline} ao lado da
guia que você quer atualizar, atribuir foco ou fechar.

[more]: /web/tools/chrome-devtools/images/three-dot.png

![atualizar, atribuir foco ou fechar uma guia](imgs/reload.png)

### Inspecionar elementos {: #inspect }

Acesse o painel **Elements** da instância do DevTools e passe o cursor sobre um
elemento para destacá-lo na janela de visualização do dispositivo Android.

Também é possível tocar em um elemento na tela do dispositivo Android para selecioná-lo no
painel **Elements**. Clique em **Select Element** ![Selecionar
elemento][select]{:.devtools-inline} na instância do DevTools e toque
o elemento na tela do dispositivo Android. Observe que **Select Element**
é desativado após o primeiro toque. Portanto, é necessário reativá-lo sempre que
você quiser usar esse recurso.

[select]: imgs/select-element.png

### Fazer screencast do dispositivo Android para a máquina de desenvolvimento {: #screencast }

Clique em **Toggle Screencast** ![Alternar screencast][screencast]{:.devtools-inline}
para ver o conteúdo do dispositivo Android na instância do DevTools.

[screencast]: imgs/toggle-screencast.png

Você pode interagir com a tela transmitida de diversas maneiras:

* Os cliques são convertidos em toques, acionando eventos de toque corretos no dispositivo. 
* O comando das teclas pressionadas no computador é enviado ao dispositivo. 
* Para simular um gesto de pinça, mantenha <kbd>Shift</kbd> pressionado enquanto arrasta. 
* Para rolar, use o trackpad, a barra de roda do mouse ou navegue com o cursor do
  mouse.

Algumas observações sobre screencasts:

* Os screencasts exibem somente o conteúdo da página. As partes transparentes do screencast 
  representam interfaces do dispositivo, como a omnibox do Chrome, a barra de status do 
  Android ou o teclado do Android.
* Os screencasts afetam negativamente as taxas de quadros. Desative screencasts durante
  a medição de rolagens ou animações para ter uma noção mais precisa do
  desempenho da página.
* Se a tela do dispositivo Android bloquear, o conteúdo do screencast
  desaparecerá. Desbloqueie a tela do dispositivo Android para retomar automaticamente o
  screencast.

## Comentários {: #feedback }

Se você quiser nos ajudar a melhorar este tutorial, responda as
seguintes perguntas.

{% framebox width="auto" height="auto" %}
<p>Você concluiu o tutorial com êxito?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">Sim</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">Não</button>
<p>O tutorial tinha as informações que você estava procurando?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">Sim</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">Não</button>
{% endframebox %}


{# wf_devsite_translation #}
