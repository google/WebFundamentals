project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A maioria dos navegadores e dispositivos tem acesso à localização geográfica do usuário. Saiba como trabalhar com a localização do usuário em seu site e aplicativos.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2014-01-01 #}

# Localização do usuário {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

A Geolocation API permite descobrir a localização do usuário, mas somente com o consentimento dele. Você pode usar esse recurso, por exemplo, para guiar um usuário ao destino e marcar com geolocalização conteúdos criados pelo usuário, como marcar o local em que uma foto foi tirada.

A Geolocation API também permite ver onde o usuário está e acompanhar seus
movimentos, sempre com a permissão do usuário (e somente enquanto a página estiver aberta). Assim, 
é possível criar diversos casos de uso interessantes, como integrar com sistemas de back-end para preparar uma ordem de coleta se o usuário estiver por perto.

Você precisa saber de algumas coisas quando usar a Geolocation API. Esse guia explica em detalhes os casos de uso e as soluções mais comuns.

Observação: a partir do Chrome 50, a [Geolocation API só funciona com contextos protegidos (HTTPS)](/web/updates/2016/04/geolocation-on-secure-contexts-only). Se seu site está hospedado em origem desprotegida (como `HTTP`), todas as solicitações de localização ao usuário **não** funcionarão.

### TL;DR {: .hide-from-toc }

* Use a geolocalização quando ela beneficia o usuário.
* Peça autorização em resposta clara a um gesto do usuário. 
* Use a detecção de recursos caso o navegador do usuário não ofereça suporte a geolocalização.
* Não só aprenda a implementar a geolocalização, aprenda a usar a geolocalização da melhor maneira possível.
* Teste a geolocalização no seu site.

## Quando usar geolocalização

*  Descubra em que ponto o usuário estará mais próximo de um local físico específico para personalizar 
   a experiência dele.
*  Personalize informações (como notícias) de acordo com a localização do usuário.
*  Mostre a posição de um usuário no mapa.
*  Marque os dados criados dentro do aplicativo com a localização do usuário 
   (ou seja, marque uma imagem com geolocalização).

## Peça autorização com consciência

Estudos recentes com usuários [mostraram](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)
que os usuários desconfiam de sites que simplesmente solicitam que mostrem sua
localização durante o carregamento da página. Então, quais são as práticas recomendadas?

### Presuma que os usuários não fornecerão sua localização

Muitos dos usuários não querem fornecer sua
localização e, por isso, você precisa adotar um estilo de desenvolvimento defensivo.

1. Resolva todos os erros da Geolocation API para poder adaptar seu
    site a essa condição.
2. Seja claro e explícito sobre sua necessidade da localização.
3. Use uma solução reserva se necessário.

### Use uma solução reserva se a geolocalização for necessária

Recomendamos que seu site ou aplicativo não exija
acesso à localização atual do usuário. Porém, se seu site ou aplicativo
precisar da localização atual do usuário, há soluções alternativas que permitem que você tenha
uma ideia bem aproximada de onde a pessoa está no momento.

Essas soluções geralmente funcionam analisando o endereço IP do usuário e mapeando-o
para o endereço físico registrado com o banco de dados RIPE. Muitas vezes,
essas localizações não são muito precisas e normalmente fornecem a posição da 
central de telecomunicação ou da torre de sinal de celular mais próxima do usuário. Em muitos
casos, eles podem ainda não ser tão precisos, especialmente se o usuário estiver em uma VPN
ou algum outro serviço de proxy.

### Sempre solicite acesso à localização por um gesto do usuário

Confirme que os usuários entendam por que você está pedindo acesso à sua localização e que
benefícios o seu acesso produz para ele. Solicitar a localização imediatamente na página inicial conforme 
o site carrega resulta em uma experiência desagradável para o usuário.

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>CERTO</b>: Sempre solicitar acesso à localização em resposta a um gesto do usuário.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>ERRADO</b>: Solicitar a localização na página inicial, durante o carregamento da página, o que gera uma experiência desagradável.
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Em vez disso, disponibilize ao usuário uma ação ou indicação de que
usar um recurso exigirá acesso à sua localização. A partir daí, o usuário associa com mais facilidade a solicitação de acesso do sistema com a ação
que acabou de ser iniciada.

### Dê uma indicação clara de que uma ação dará origem a uma solicitação de localização do usuário

[Em um estudo realizado pela equipe dos Anúncios do Google](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf),
quando um usuário recebeu uma solicitação para reservar um quarto de hotel em Boston para uma conferência
em um site de reserva de hotéis, recebeu também uma solicitação de compartilhamento da sua localização de GPS
imediatamente depois de tocar na ação "Buscar e reservar" na página inicial.

Em alguns casos, o usuário fica frustrado porque tem dificuldade de entender por que
são exibidos hotéis em São Francisco quando ele quer reservar um quarto em
Boston.

Uma experiência melhor é garantir que os usuários compreendam porque você está solicitando
a localização deles. Adicione um indicador bem conhecido que seja comum dentre
os dispositivos, como um localizador de cobertura ou uma indicação explícita para uma ação como 
"Encontrar nas proximidades".

<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      Use um localizador de cobertura
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      Uma indicação para ação específica para encontrar locais nas proximidades  
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Gentilmente solicite ao usuário permissão para acessar sua localização

Você não tem acesso a nada que os usuários fazem. Você sabe exatamente
quando o usuário não permite acesso à sua localização, mas não sabe
quando ele concede o acesso e só passa a saber que obteve acesso quando os resultados
aparecem.

É uma boa ideia "convidar" o usuário para a ação se você precisar que ele
realize a ação.

Recomendamos: 

1.  Configure um cronômetro que será acionado após um breve período — 5 segundos é
    um bom valor.
2.  Se receber uma mensagem de erro, mostre uma mensagem ao usuário.
3.  Se obtiver uma resposta positiva, desative o cronômetro e processe os resultados.
4.  Se após estourar o tempo você não obtiver uma resposta positiva, exiba uma
    notificação para o usuário.
5.  Se a resposta chegar depois e a notificação ainda estiver presente,
    remova-a da tela.

<div style="clear:both;"></div>

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

## Compatibilidade de navegadores

Atualmente, a maioria dos navegadores oferecem suporte à Geolocation API, mas é sempre
bom verificar a compatibilidade antes de fazer qualquer coisa.

Você pode verificar facilmente a compatibilidade testando a presença do
objeto geolocation:

    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }


## Determinando a localização atual do usuário

A Geolocation API oferece um método simples acionado uma única vez para obter a localização
do usuário: `getCurrentPosition()`. Chamar este método informa
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


Se essa é a primeira vez que um aplicativo deste domínio solicita
permissões, o navegador geralmente solicita a permissão do usuário. Dependendo do
navegador, também pode haver preferências para sempre permitir &mdash; ou nunca permitir &mdash; pedidos de permissão. Nesse caso, o processo de confirmação será ignorado.

Dependendo do dispositivo de localização que seu navegador usa, o objeto de posição
pode realmente conter muito mais do que apenas latitude e longitude, podendo incluir, por
exemplo, uma altitude ou uma direção. Não é possível prever
quais outras informações esse sistema de localização usará até que ele retorne
os dados.

## Acompanhando a localização do usuário

A Geolocation API permite que você obtenha a localização do usuário (com a permissão
dele) com uma única chamada para `getCurrentPosition()`.  

Se quiser monitorar continuamente a localização do usuário, use o método
`watchPosition()` da Geolocation API. Ele funciona de forma bem parecida com o
`getCurrentPosition()`, mas é acionado diversas vezes à medida que o software
de posicionamento:

1. Detecta com mais precisão a posição do usuário.
2. Determina que a posição do usuário está mudando.
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### Quando usar a geolocalização para acompanhar a localização do usuário

*  Para obter uma detecção mais precisa da localização do usuário.
*  Seu aplicativo precisa atualizar a interface do usuário com base na nova informação de 
 localização.
*  Seu aplicativo precisa atualizar a lógica de negócios quando o usuário entrar em determinada
   zona definida.


## Práticas recomendadas ao uso da geolocalização

### Sempre carregue e conserve a bateria

Verificar as mudanças de uma geolocalização não é uma operação gratuita. Embora
os sistemas operacionais talvez estejam absorvendo recursos de plataforma para permitir que os aplicativos
se conectem ao subsistema geográfico, você, como desenvolvedor web, não faz ideia de que tipo de suporte
o dispositivo do usuário tem para monitorar a localização do usuário e, enquanto você observa
uma posição, está envolvendo o dispositivo em mais inúmeros processamentos.

Quando não precisar mais acompanhar a posição do usuário, chame `clearWatch` para desativar
os sistemas de geolocalização.

###  Trate dos erros de forma suave

Infelizmente, nem todas as pesquisas de localização têm êxito. Talvez um GPS não
possa ser localizado ou o usuário tenha desabilitado repentinamente as pesquisas de localização. No caso de
erro, um segundo argumento (opcional) a `getCurrentPosition()` é chamado para que você possa notificar o usuário dentro do retorno de chamada:

    window.onload = function() {
      var startPos;
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
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };


### Reduza a necessidade de ativar hardware de geolocalização

Para muitos casos de uso, você não precisa da localização mais atual do usuário,
basta ter uma estimativa aproximada.

Use a propriedade opcional `maximumAge` para dizer ao navegador para usar um resultado de
geolocalização obtido recentemente. Isso não só retorna mais rápido se o usuário já tiver
solicitado os dados, mas também impede o navegador de ativar
a interface dos hardwares de geolocalização, como triangulação de Wi-Fi ou o GPS.

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


### Não deixe o usuário esperando, defina um tempo limite

A menos que você defina um tempo limite, sua solicitação para obter a posição atual pode nunca ser retornada.


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


### Dê preferência a uma localização aproximada no lugar da localização exata

Se quiser encontrar a loja mais próxima de um usuário, é improvável que você precise de
precisão de 1 metro. A API é projetada para fornecer uma localização 
geral que é retornada o mais rapidamente possível.

Mas, se você precisa de um alto nível de precisão, é possível neutralizar a configuração padrão
com a opção `enableHighAccuracy`. Use esse recurso com sabedoria: ele é mais
lento de processar e consome mais bateria.

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


## Emular geolocalização com o Chrome DevTools {: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

Depois de colocar a geolocalização para funcionar, pode ser uma boa ideia:

* Testar como o aplicativo funciona em diferentes geolocalizações.
* Verificar se o aplicativo simplifica seus recursos de forma harmoniosa quando a geolocalização não está disponível.

Você pode fazer ambos no Chrome DevTools.

[Abra o Chrome DevTools](/web/tools/chrome-devtools/#open) e, depois,
a [gaveta Console](/web/tools/chrome-devtools/console/#open_as_drawer).

[Abra o menu da gaveta Console](/web/tools/chrome-devtools/settings#drawer-tabs)
e clique na opção **Sensors** para abrir a gaveta "Sensors".

Aí, você pode neutralizar a localização como uma cidade grande pré-configurada,
inserir um local personalizado ou desativar a geolocalização configurando a neutralização
como **Location unavailable**.


{# wf_devsite_translation #}
