project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A maioria dos navegadores e dispositivos tem acesso à localização geográfica do usuário. Saiba como trabalhar com a localização do usuário em seu site e aplicativos.


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# User Location {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

O API de Geolocalização permite que você descubra onde o usuário está, sempre com a permissão do usuário. Essa funcionalidade pode ser usada como parte das consultas do usuário, por exemplo, para orientar alguém até um ponto de destino. Também pode ser usada para marcar  geograficamente algum conteúdo que o usuário tenha criado, como por exemplo,  para marcar onde uma foto foi tirada.

O API de Geolocalização também permite você veja onde o usuário está e mantenha marcações nele conforme
 se movimenta, sempre com a permissão do usuário (e apenas enquanto a página estiver aberta). Isso abre espaço para muitos casos de uso interessantes - como a integração com sistemas de backend para preparar um pedido de coleção, se o usuário estiver próximo.

Há muitas coisas que você precisa estar atento ao usar a API de Geolocalização e esse guia o ajudará com casos de uso e soluções comuns.



## Getting the user to consent to location sharing 

Como desenvolvedor da Web, ter acesso à localização do usuário abre um grande número de possibilidades como filtragem avançada, indicação do usuário em um mapa e oferta de sugestões proativas sobre coisas que o usuário pode fazer com base na sua posição atual.

Como usuário, sua localização física é uma parte da informação que você deseja
proteger e fornecer apenas para as pessoas que confia.  Esse é o motivo pelo qual o navegador
mostra um prompt quando o site solicita sua localização.


Estudos do usuário recentes <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">mostraram</a> que
os usuários desconfiam de sites que simplesmente solicitam que o usuário forneça sua
posição no carregamento da página. Portanto, quais são as práticas recomendadas?

### TL;DR {: .hide-from-toc }
- Assuma que os usuários não fornecerão a você sua localização.
- Deixe claro quando você precisa de acesso à localização do usuário.
- Não solicite acesso imediatamente no carregamento da página.


### Assuma que os usuários não fornecerão sua localização

Pode ser um problema, mas muitos dos seus usuários não desejam fornecer sua
localização, portanto, você precisa adotar um estilo de desenvolvimento defensivo.

1.  Resolver todos os erros da API de geolocalização para que você possa adaptar seu
    site a essa condição.
2.  Seja claro e explícito sobre sua necessidade por uma localização.
3.  Use uma solução de fallback, se necessário.

### Use um fallback se a geolocalização for necessária

Nossa recomendação é não vincular seu site ou aplicativo à exigência do
acesso pela localização atual do usuário, mas se o seu aplicativo ou site
realmente precisa, há soluções de terceiros que permitem obter
uma estimativa de onde a pessoa está no momento.

Essas soluções geralmente funcionam analisando o endereço IP do usuário e mapeando-o
para o endereço físico registrado com o banco de dados RIPE.  Esses locais
geralmente não são muito precisos, fornecendo uma posição do hub de telecomunicações
mais próximo do usuário ou a torre de transmissão de sinal de celular mais próxima.  Em muitos
casos, eles podem ainda não ser tão precisos, especialmente se o usuário estiver em VPN
ou algum outro serviço de proxy.

### Sempre solicite acesso a uma localização por um gesto do usuário

Certifique-se que o usuário compreenda o motivo de você estar solicitando sua localização e qual será o benefício
para ele.  Perguntar imediatamente na página inicial no carregamento
do site resulta em uma experiência desagradável para o usuário.


<figure class="attempt-left">
  <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
  <figcaption>Perguntar imediatamente na página inicial conforme o site carrega resulta em uma experiência desagradável para o usuário.</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
  <figcaption>Sempre solicite acesso a uma localização por um gesto do usuário.</figcaption>
</figure>
<div class="clearfix"></div>


Em vez disso, forneça ao usuário uma ação de clique clara ou uma indicação de que
uma operação exigirá o acesso à sua localização.  O usuário poderá
associar mais facilmente o prompt do sistema para obter acesso com a ação
que acabou de ser iniciada.

### Forneça uma indicação clara de que uma ação solicitará a localização do usuário

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">Em um estudo realizado pela equipe do Google Ads</a>, quando um usuário é solicitado a reservar um quarto de hotel em Boston para uma conferência que será realizada em um determinado hotel, ele é solicitado a compartilhar sua localização de GPS imediatamente depois de tocar na ação ‘Localize e Reserve’ na página inicial.

Em alguns casos, o usuário fica frustrado porque ele tem dificuldade de entender por quê
são exibidos hotéis em São Francisco quando ele deseja reservar um quarto em
Boston.

Uma melhor experiência é garantir que os usuários compreendam porquê você está solicitando
a localização deles. Adicione um significante bem conhecido que é comum entre
dispositivos, como um localizador de cobertura.

<img src="images/indication.png">

Ou considere uma chamada para ação muito explícita como “Encontre Próximo a Mim”.

<img src="images/nearme.png">

### Gentilmente solicite ao usuário permissão para acessar sua localização

Você não tem acesso a nenhuma das etapas que os usuário está realizando.  Você sabe exatamente
quando o usuário não permitem acesso à sua localização, mas não sabe
quando ele concede o acesso; você sabe apenas que obteve acesso quando os resultados aparecem.

É recomendavel “convidar" o usuário para a ação se você precisa dele para concluir a ação.

Recomendamos: 

1.  Configurar um temporizador que será acionado depois de um curto período - 5 segundos é um bom valor.
2.  Se receber uma mensagem de erro, mostre uma mensagem para o usuário.
3.  Se receber uma resposta positiva, desabilite o temporizador e processe os resultados.
4.  Se depois do tempo limite você ainda não recebeu uma resposta positiva, mostre uma notificação para o usuário.
5.  Se a resposta for recebida posteriormente e a notificação ainda estiver presente, remova-a da tela.


<div class="clearfix"></div>

    button.onclick = function() {
      var startPos;
      var element = document.getElementById("nudge");
    
      var showNudgeBanner = function() {
        nudge.style.display = "block";
      };
    
      var hideNudgeBanner = function() {
        nudge.style.display = "none";
      };
    
      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
    
      var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId); 
    
        // Do magic with location
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
    



## Obtain the user's current location 




O API da Geolocalização permite que você descubra onde o usuário está, sempre com a permissão do usuário. Essa funcionalidade pode ser usada como parte das consultas do usuário, por exemplo, para orientar alguém até um ponto de destino. Também pode ser usada para marcar geograficamente algum conteúdo que o usuário tenha criado para, por exemplo, marcar onde uma foto foi tirada.


### TL;DR {: .hide-from-toc }
- Verifique a compatibilidade antes de usar a API.
- Prefira uma localização aproximada em vez de uma localização refinada.
- Sempre resolva os erros.
- Não agrupe os dados com muita frequência para economizar bateria do usuário.


A API é independente de dispositivo e não se preocupa em como o navegador determina a
localização, desde que os clientes possam solicitar e receber dados de localização de uma
forma padrão. O mecanismo subjacente pode ser via GPS, Wi-Fi ou apenas
solicitando ao usuário para inserir sua localização manualmente. Como qualquer uma dessas pesquisas
levará algum tempo, a API é assíncrona; você transmite um método de
retorno de chamada sempre que solicita uma localização.

### Quando usar a Geolocalização

*  Descubra onde o usuário estará mais próximo de sua localização física para personalizar 
  a experiência do usuário.
*  Personalize a informação (como notícias) de acordo com a localização do usuário.
*  Mostre a posição de um usuário no mapa.
*  Marque os dados criados dentro do seu aplicativo com a localização do usuário 
 (isto é, geomarcar uma imagem).


### Verifique a Compatibilidade

A API de geolocalização agora é suportada pela maioria dos navegadores, mas é
recomendável sempre verificar o suporte antes de se tomar uma atitude.

Você pode verificar facilmente a compatibilidade testando a presença do
objeto de geolocalização:


    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    

### Determine a localização atual do usuário

A API de geolocalização oferece um método simples de ‘disparo único' para obter a localização
do usuário `getCurrentPosition()`.  Uma chamada para este método irá relatar
assincronamente a localização atual do usuário.


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
    

Se essa for a primeira vez que um aplicativo neste domínio solicita
permissões, o navegador geralmente solicitará a permissão do usuário. Dependendo do
navegador, também pode haver preferências para sempre permitir - ou não permitir -
pedidos de permissão. Nesse caso, o processo de confirmação será ignorado.

Dependendo do dispositivo de localização que seu navegador está usando, o objeto de posição
pode realmente conter muito mais do que apenas latitude e longitude, podendo incluir, por exemplo, uma altitude ou uma direção.  Você não poderá prever qual informação extra esse sistema de localização usará até que ele retorne os dados.

### Testando a geolocalização do seu site

Ao trabalhar com suporte de geolocalização HTML5 em um aplicativo, é aconselhável
depurar o resultado recebido ao usar diferentes valores para longitude
e latitude.

O DevTools suporta a sobreposição de valores de posição para navegador.geolocalização
e a simulação da geolocalização não ficando disponível no menu de substituição.

<img src="images/emulategeolocation.png">

1. Abra o menu de substituição no DevTools.
2. Marque “Substituir Geolocalização” e insira em Lat = 41.4949819 e Lon = -0.1461206.
3. Atualize a página e agora você usará as posições de substituição para a geolocalização.

###  Sempre resolva os erros

Infelizmente, nem todas as pesquisas de localização têm êxito. Talvez um GPS não
possa ser localizado ou o usuário tenha desabilitado repentinamente as pesquisas de localização. Um segundo argumento
opcional para `getCurrentPosition()` será chamado no caso de um
erro, portanto, você pode notificar o usuário dentro do retorno de chamada:


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
    

### Reduza a necessidade de inicialização do equipamento de geolocalização

Para muitas casos de uso, você não precisa da localização mais atualizada do usuário,
precisa apenas de uma estimativa aproximada.

Use a propriedade opcional `maximumAge` para dizer ao navegador para usar um resultado de
geolocalização obtido recentemente.  Isso não apenas é retornado mais rápido se um usuário tiver
solicitado os dados antes, mas também evita que o navegador precise inicializar
suas interfaces do equipamento de geolocalização como a triangulação do Wi-Fi ou o GPS.


    window.onload = function() {
      var startPos;
      var geoOptions = {
      	maximumAge: 5 * 60 * 1000,
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    

### Não deixe o usuário aguardando, defina um tempo limite

A menos que você defina um tempo limite, sua solicitação para obter a posição atual pode nunca ter um retorno.


    window.onload = function() {
      var startPos;
      var geoOptions = {
         timeout: 10 * 1000
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    

### Prefira uma localização aproximada em vez de uma localização exata

Se você deseja localizar a loja mais próxima de um usuário, é improvável que necessite de
uma precisão de 1 metro para resolver isso.  A API é projetada para fornecer uma localização 
geral que é retornada o mais rapidamente possível.

Se você necessita de uma alta precisão, é possível substituir a configuração padrão
com a opção `enableHighAccuracy`.  Use com moderação: pode ser mais demorado
para resolver e consumir mais bateria.


    window.onload = function() {
      var startPos;
      var geoOptions = {
        enableHighAccuracy: true
      }
    
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
    
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };
    




## Monitor the user's location 




O API da Geolocalização permite que você veja onde o usuário está e mantenha marcações nele conforme se move, sempre com a permissão do usuário.


A API é independente de dispositivo e não se preocupa em como o navegador determina o
local, desde que os clientes possam solicitar e receber dados de local de uma
forma padrão. O mecanismo subjacente pode ser via GPS, Wi-Fi. Como qualquer uma dessas pesquisas
levará algum tempo, a API é assíncrona; você transmite um método de
retorno de chamada sempre que solicita uma localização.

### TL;DR {: .hide-from-toc }
- Verifique a compatibilidade antes de usar a API.
- Minimize o uso da observação da localização do usuário para economizar bateria.
- Sempre resolva os erros.


### Quando usar a geolocalização para ver a localização do usuário

* Para obter uma detecção mais precisa da localização do usuário.
* Seu aplicativo precisa atualizar a interface do usuário com base na nova informação de 
 localização.
* Seu aplicativo precisa atualizar a lógica de negócios quando o usuário inserir uma determinada
 zona definida.

### Visualizando a localização dos usuários

A API de Geolocalização permite que você obtenha a localização do usuário (com a permissão do
usuário) com uma única chamada para `getCurrentPosition()`.  

Se desejar monitorar continuadamente a localização do usuário, a API de
geolocalização tem um método chamado `watchPosition()`. Ele funciona de forma semelhante ao
`getCurrentPosition()`, mas ainda é acionado várias vezes como o software de
posicionamento:

1.  Obtém uma detecção mais precisa do usuário.
2.  As mudanças de posição do usuário.
 
<div class="clearfix"></div>


    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });
    

### Sempre carregue e conserve a bateria

Verificar as mudanças de uma geolocalização não é uma operação gratuita.  Embora
os sistemas operacionais possam estar introduzindo recursos de plataforma para permitir que os aplicativos
se conectem ao subssistema geográfico, você como desenvolvedor da Web não sabe que tipo de suporte
o dispositivo do usuário dispõe para monitorar a localização do usuário e, enquanto verifica
uma posição, você está carregando o dispositivo com muitos processamentos adicionais

Depois que já não precisar rastrear a posição do usuário, chame `clearWatch` para desligar
os sistemas de geolocalização.

### Sempre resolva os erros

Infelizmente, nem todas as pesquisas de localização têm êxito. Talvez um GPS não
possa ser localizado ou o usuário tenha desabilitado repentinamente as pesquisas de localização. Um segundo argumento
opcional para getCurrentPosition() será chamado no caso de um
erro, portanto, você pode notificar o usuário dentro do retorno de chamada:


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(position) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.watchPosition(geoSuccess, geoError);
    };
    


