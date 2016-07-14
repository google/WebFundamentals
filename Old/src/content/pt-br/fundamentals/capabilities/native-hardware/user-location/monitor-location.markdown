---
title: "Monitor the user's location"
description: "O API da Geolocalização permite que você veja onde o usuário está e mantenha marcações nele conforme se move, sempre com a permissão do usuário."
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - Verifique a compatibilidade antes de usar a API.
    - Minimize o uso da observação da localização do usuário para economizar bateria.
    - Sempre resolva os erros.
---

<p class="intro">
  O API da Geolocalização permite que você veja onde o usuário está e mantenha marcações nele conforme se move, sempre com a permissão do usuário.
</p>

{% include shared/toc.liquid %}

A API é independente de dispositivo e não se preocupa em como o navegador determina o
local, desde que os clientes possam solicitar e receber dados de local de uma
forma padrão. O mecanismo subjacente pode ser via GPS, Wi-Fi. Como qualquer uma dessas pesquisas
levará algum tempo, a API é assíncrona; você transmite um método de
retorno de chamada sempre que solicita uma localização.

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Quando usar a geolocalização para ver a localização do usuário

* Para obter uma detecção mais precisa da localização do usuário.
* Seu aplicativo precisa atualizar a interface do usuário com base na nova informação de 
 localização.
* Seu aplicativo precisa atualizar a lógica de negócios quando o usuário inserir uma determinada
 zona definida.

## Visualizando a localização dos usuários

A API de Geolocalização permite que você obtenha a localização do usuário (com a permissão do
usuário) com uma única chamada para `getCurrentPosition()`.  

Se desejar monitorar continuadamente a localização do usuário, a API de
geolocalização tem um método chamado `watchPosition()`. Ele funciona de forma semelhante ao
`getCurrentPosition()`, mas ainda é acionado várias vezes como o software de
posicionamento:

1.  Obtém uma detecção mais precisa do usuário.
2.  As mudanças de posição do usuário.
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## Sempre carregue e conserve a bateria

Verificar as mudanças de uma geolocalização não é uma operação gratuita.  Embora
os sistemas operacionais possam estar introduzindo recursos de plataforma para permitir que os aplicativos
se conectem ao subssistema geográfico, você como desenvolvedor da Web não sabe que tipo de suporte
o dispositivo do usuário dispõe para monitorar a localização do usuário e, enquanto verifica
uma posição, você está carregando o dispositivo com muitos processamentos adicionais

Depois que já não precisar rastrear a posição do usuário, chame `clearWatch` para desligar
os sistemas de geolocalização.

## Sempre resolva os erros

Infelizmente, nem todas as pesquisas de localização têm êxito. Talvez um GPS não
possa ser localizado ou o usuário tenha desabilitado repentinamente as pesquisas de localização. Um segundo argumento
opcional para getCurrentPosition() será chamado no caso de um
erro, portanto, você pode notificar o usuário dentro do retorno de chamada:

{% highlight javascript %}
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
{% endhighlight %}


