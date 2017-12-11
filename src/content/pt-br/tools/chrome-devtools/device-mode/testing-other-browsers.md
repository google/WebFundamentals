project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Seu trabalho não acaba depois de garantir que o site funciona perfeitamente no Chrome e no Android. Embora o Device Mode possa simular diversos outros dispositivos, como iPhones, recomendamos que você confira soluções de emulação para outros navegadores.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2015-04-13 #}

# Emular e testar outros navegadores {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Seu trabalho não acaba depois de garantir que o site funciona perfeitamente no Chrome e no Android. Embora o Device Mode possa simular diversos outros dispositivos, como iPhones, recomendamos que você confira soluções de emulação para outros navegadores.


### TL;DR {: .hide-from-toc }
- Quando não tiver um determinado dispositivo ou quiser fazer uma verificação pontual, a melhor opção é emular o dispositivo dentro do próprio navegador.
- Emuladores e simuladores de dispositivo permitem reproduzir o site em desenvolvimento em diversos dispositivos a partir da estação de trabalho.
- Emuladores baseados na nuvem permite automatizar testes de unidade para o site em diferentes plataformas.


## Emuladores de navegador

Os emuladores de navegador são ótimos para testar a capacidade de resposta de um site, mas não
emulam diferenças na API, a compatibilidade com CSS e determinados comportamentos que você veria
em um navegador para dispositivos móveis. Teste seu site em navegadores executados em dispositivos reais para garantir
que todos os comportamentos estejam corretos.

### Visualização de design responsivo do Firefox

O Firefox tem uma [visualização de design responsivo](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
que incentiva você a não pensar mais em termos de dispositivos específicos e, em vez disso,
explorar como seu design muda em tamanhos de tela comuns ou definir um tamanho personalizado
arrastando as bordas.

### Emulação F12 do Edge

Para emular Windows Phones, use a [emulação incorporada](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/) do Microsoft Edge.

Como o Edge não tem compatibilidade com versões legadas, use a [emulação do IE 11](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx) para simular a aparência da sua página em versões mais antigas do Internet Explorer.

## Emuladores e simuladores de dispositivos

Emuladores e simuladores de dispositivos simulam não só o ambiente de navegação, mas todo o dispositivo. Eles são úteis para testar elementos que precisam de integração de SO, por exemplo, entradas de formulário com teclados virtuais.

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Navegador Stock do Android Emulator">
  <figcaption>Navegador Stock no Android Emulator</figcaption>
</figure>

No momento, não é possível instalar o Chrome em um emulador de Android. No entanto, você pode usar o Navegador do Android, o Chromium Content Shell e o Firefox para Android, sobre os quais falaremos mais à frente neste guia. O Chromium Content Shell usa o mesmo mecanismo de renderização do Chrome, mas vem sem nenhum recurso específico do navegador.

O Android Emulator vem com o Android SDK, que você precisa <a href="http://developer.android.com/sdk/installing/studio.html">baixar
aqui</a>. Depois, siga as instruções para <a href="http://developer.android.com/tools/devices/managing-avds.html">configurar um dispositivo virtual</a> e <a href="http://developer.android.com/tools/devices/emulator.html">inicialize o emulador</a>.

Depois que o emulador for inicializado, clique no ícone de navegador para testar o site no antigo navegador Stock para Android.

#### Chromium Content Shell no Android

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Content Shell do Android Emulator">
  <figcaption>Content Shell do Android Emulator</figcaption>
</figure>

Para instalar o Chromium Content Shell para Android, deixe o emulador em execução
e execute os seguintes comandos em um prompt de comando:

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

Agora você pode testar seu site com o Chromium Content Shell.


#### Firefox para Android

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Ícone do Firefox no Android Emulator">
  <figcaption>Ícone do Firefox no Android Emulator</figcaption>
</figure>

Similar ao Content Shell do Chromium, você pode obter um APK para instalar o Firefox no emulador.

Baixe o arquivo .apk correto em <a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a>.

Então, você pode instalar o arquivo em um emulador aberto ou um dispositivo Android conectado com o seguinte comando:

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### iOS Simulator

O iOS Simulator para Mac OS X vem com o Xcode, que você pode [instalar da
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

Quando terminar, saiba como trabalhar com o simulador na [documentação da Apple](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html).

Observação: Para evitar a necessidade de abrir o Xcode sempre que quiser usar o iOS Simulator, abra-o, clique com o botão direito do iOS Simulator no seu dock e selecione `Keep in Dock`. Agora, basta clicar neste ícone sempre que precisar.

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="VM do Modern IE">
  <figcaption>VM do Modern IE</figcaption>
</figure>

As máquinas virtuais do Modern.IE permitem acessar diferentes versões do IE no computador pelo VirtualBox (ou VMWare). Escolha uma máquina virtual na página de <a href="https://modern.ie/en-us/virtualization-tools#downloads">download aqui</a>.


## Emuladores e simuladores baseados na nuvem

Se não puder usar os emuladores e não tiver acesso a dispositivos reais, os emuladores baseados na nuvem são a melhor opção. Uma grande vantagem dos emuladores com base em nuvem em relação aos dispositivos reais e emuladores locais é que você pode automatizar os testes de unidade do seu site para diferentes plataformas.

* O [BrowserStack (comercial)](https://www.browserstack.com/automate) é o modo mais fácil de usar para testes manuais. Você seleciona um sistema operacional, a versão do navegador e o tipo do dispositivo, seleciona um URL para navegar e ele fornece uma máquina virtual hospedada com a qual você pode interagir. Você ainda pode acionar diversos emuladores na mesma tela, o que permite testar o visual e o funcionamento do seu aplicativo em diversos dispositivos ao mesmo tempo.
* O [SauceLabs (comercial)](https://saucelabs.com/){: .external } permite executar testes de unidade dentro de um emulador, o que pode ser muito útil para determinar um fluxo pelo site e assistir à gravação em vídeo dele depois em vários dispositivos. Você ainda pode realizar testes manuais no site.
* [Device Anywhere (comercial)](http://www.keynote.com/solutions/testing/mobile-testing) não
usa emuladores, mas sim dispositivos reais que você controla remotamente. Isto é muito útil caso que você precise reproduzir um problema em um dispositivo específico e não consiga encontrar o erro em nenhuma das opções dos guias anteriores.





{# wf_devsite_translation #}
