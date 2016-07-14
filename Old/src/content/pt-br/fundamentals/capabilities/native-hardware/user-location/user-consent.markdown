---
title: "Getting the user to consent to location sharing"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - Assuma que os usuários não fornecerão a você sua localização.
    - Deixe claro quando você precisa de acesso à localização do usuário.
    - Não solicite acesso imediatamente no carregamento da página.
comments:
  # OBSERVAÇÃO: Se os títulos da seção ou URL mudarem, os seguintes shortlinks devem ser atualizados
 - g.co/mobilesiteprinciple25
---

<p class="intro">
  Como desenvolvedor da Web, ter acesso à localização do usuário abre um grande número de possibilidades como filtragem avançada, indicação do usuário em um mapa e oferta de sugestões proativas sobre coisas que o usuário pode fazer com base na sua posição atual.
</p>

Como usuário, sua localização física é uma parte da informação que você deseja
proteger e fornecer apenas para as pessoas que confia.  Esse é o motivo pelo qual o navegador
mostra um prompt quando o site solicita sua localização.

{% include shared/toc.liquid %}

Estudos do usuário recentes <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">mostraram</a> que
os usuários desconfiam de sites que simplesmente solicitam que o usuário forneça sua
posição no carregamento da página. Portanto, quais são as práticas recomendadas?

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Assuma que os usuários não fornecerão sua localização

Pode ser um problema, mas muitos dos seus usuários não desejam fornecer sua
localização, portanto, você precisa adotar um estilo de desenvolvimento defensivo.

1.  Resolver todos os erros da API de geolocalização para que você possa adaptar seu
    site a essa condição.
2.  Seja claro e explícito sobre sua necessidade por uma localização.
3.  Use uma solução de fallback, se necessário.

## Use um fallback se a geolocalização for necessária

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

## Sempre solicite acesso a uma localização por um gesto do usuário

Certifique-se que o usuário compreenda o motivo de você estar solicitando sua localização e qual será o benefício
para ele.  Perguntar imediatamente na página inicial no carregamento
do site resulta em uma experiência desagradável para o usuário.

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>Perguntar imediatamente na página inicial conforme o site carrega resulta em uma experiência desagradável para o usuário.</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption>Sempre solicite acesso a uma localização por um gesto do usuário.</figcaption>
      </figure>
  </div>
</div>

Em vez disso, forneça ao usuário uma ação de clique clara ou uma indicação de que
uma operação exigirá o acesso à sua localização.  O usuário poderá
associar mais facilmente o prompt do sistema para obter acesso com a ação
que acabou de ser iniciada.

## Forneça uma indicação clara de que uma ação solicitará a localização do usuário

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

## Gentilmente solicite ao usuário permissão para acessar sua localização

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

{% highlight javascript %}
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
{% endhighlight %}

