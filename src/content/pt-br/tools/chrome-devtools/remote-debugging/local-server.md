project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Hospede um site em um servidor Web da máquina de desenvolvimento e acesse o conteúdo com um dispositivo Android.

{# wf_updated_on: 2016-04-07 #}
{# wf_published_on: 2015-04-13 #}

# Acessar servidores locais {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Hospede um site em um servidor Web da máquina de desenvolvimento e 
acesse o conteúdo com um dispositivo Android.

Com um cabo USB e o Chrome DevTools, você pode executar um site em uma máquina de
desenvolvimento e visualizá-lo em um dispositivo Android. 


### TL;DR {: .hide-from-toc }
- O encaminhamento de portas permite visualizar conteúdo do servidor Web da sua máquina de desenvolvimento no seu dispositivo Android.
- Se o servidor Web estiver usando um domínio personalizado, é possível configurar o dispositivo Android para acessar o conteúdo nesse domínio com o mapeamento de domínio personalizado.


## Configurar o encaminhamento de portas {:#port-forwarding}

O encaminhamento de portas permite que seu dispositivo Android acesse o conteúdo
hospedado no servidor Web da máquina de desenvolvimento. O encaminhamento de portas funciona
com a criação de uma porta TCP de escuta no dispositivo Android, que mapeia uma porta TCP
na máquina de desenvolvimento. O tráfego entre as portas ocorre por conexão
USB entre o dispositivo Android e a máquina de desenvolvimento, assim,
a conexão não depende da configuração de rede.

Para ativar o encaminhamento de portas:

1. Configure a [depuração remota](.) entre a máquina de desenvolvimento
   e o dispositivo Android. Quando terminar, você verá o dispositivo
   Android no menu à esquerda da caixa de diálogo **Inspect Devices**, além de 
   um indicador de status **Connected**.
1. Na caixa de diálogo **Inspect Devices** do DevTools, ative **Port forwarding**.
1. Clique em **Add rule**.

   ![adicionar uma regra ao encaminhamento de portas](imgs/add-rule.png)
1. No campo de texto **Device port** à esquerda, insira o número da porta `localhost` 
   pela qual você quer poder acessar o site no dispositivo 
   Android. Por exemplo, se quiser acessar o site por `localhost:5000`, 
  você digitaria `5000`.
1. No campo de texto **Local address** à direita, digite o endereço IP ou 
   nome do host em que o site está sendo executado no servidor da web da máquina
de desenvolvimento, seguido do número da porta. Por exemplo, se seu site estiver em execução 
   em `localhost:7331`, você digitaria `localhost:7331`. 
1. Clique em **Add**.

Agora o encaminhamento de portas está configurado. Você pode ver um indicador de status do encaminhamento
de portas na guia do dispositivo dentro da caixa de diálogo **Inspect Devices**.

![status de encaminhamento de portas](imgs/port-forwarding-status.png)

Para visualizar o conteúdo, abra o Chrome no dispositivo Android e acesse 
a porta `localhost` especificada no campo **Device port**. Por 
exemplo, se digitou `5000` no campo, você deve ir para 
`localhost:5000`. 

## Mapear domínios locais personalizados {:#custom-domains}

O mapeamento de domínios personalizados permite que você visualize conteúdo em um dispositivo Android
de um servidor Web na sua máquina de desenvolvimento que está usando um domínio personalizado.

Por exemplo, suponha que seu site use uma biblioteca JavaScript de terceiros
que funcione apenas no domínio `chrome.devtools` colocado na lista de permissões. Assim, você cria
uma entrada no arquivo `hosts` da máquina de desenvolvimento para mapear este domínio 
para `localhost` (ou seja, `127.0.0.1 chrome.devtools`). Depois de configurar o mapeamento do domínio
personalizado e o encaminhamento de portas, você poderá visualizar o site no
dispositivo Android no URL `chrome.devtools`. 

### Configurar o encaminhamento de portas para o servidor proxy

Para mapear um domínio personalizado, você deve executar um servidor proxy na máquina de 
desenvolvimento. Exemplos de servidores proxy: [Charles][charles], [Squid][squid] 
e [Fiddler][fiddler].

Para configurar o encaminhamento de portas para um proxy:

1. Execute o servidor proxy e anote a porta que ele usar. **Observação**: o 
   servidor proxy e o seu servidor Web devem ser executados em portas diferentes.
1. Configure o [encaminhamento de portas](#port-forwarding) no seu dispositivo Android. Para o
   campo **local address**, insira `localhost:` seguido da porta em que
   o servidor proxy está em execução. Por exemplo, se estiver em execução na porta `8000`,
   você deve digitar `localhost:8000`. No campo **device port**, insira 
   o número no que deseja que seu dispositivo detecte, como `3333`.

[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### Definir configurações de proxy no seu dispositivo

Em seguida, você precisa configurar seu dispositivo Android para se comunicar com o 
servidor proxy. 

1. No dispositivo Android, acesse **Settings** > **Wi-Fi**.
1. Mantenha pressionado o nome da rede em que você está conectado.
   **Observação**: As configurações de proxy se aplicam por rede.
3. Toque em **Modify network**.
4. Toque em **Advanced options**. As configurações de proxy serão exibidas. 
5. Toque no menu **Proxy** e selecione **Manual**.
6. No campo **Proxy hostname**, insira `localhost`.
7. No campo **Proxy port**, digite o número da porta que digitou em
   **device port** na seção anterior.
8. Toque em **Save**.

Com essas configurações, seu dispositivo encaminhará todas as solicitações ao proxy da 
sua máquina de desenvolvimento. O proxy faz solicitações em nome do dispositivo, 
assim, solicitações do seu domínio local personalizado são resolvidas corretamente.

Agora você pode acessar domínios personalizados no dispositivo Android da mesma forma que 
na máquina de desenvolvimento. 

Se o servidor web estiver não estiver em execução em uma porta não padrão,
lembre-se de especificar a porta ao solicitar o conteúdo pelo dispositivo
Android. Por exemplo, se o servidor da web estiver usando o domínio personalizado 
`chrome.devtools` na porta `7331`, quando você visualizar o site pelo dispositivo
Android, deverá usar o URL `chrome.devtools:7331`. 

**Dica**: Para retomar a navegação normal, lembre-se de reverter as configurações de proxy no 
dispositivo Android depois de desconectar da máquina de desenvolvimento.


{# wf_devsite_translation #}
