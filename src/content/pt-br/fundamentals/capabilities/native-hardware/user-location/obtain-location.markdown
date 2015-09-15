---
title: "Obtain the user's current location"
description: "O API da Geolocalização permite que você descubra onde o usuário está, sempre com a permissão do usuário."
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - Verifique a compatibilidade antes de usar a API.
    - Prefira uma localização aproximada em vez de uma localização refinada.
    - Sempre resolva os erros.
    - Não agrupe os dados com muita frequência para economizar bateria do usuário.

---

<p class="intro">
  O API da Geolocalização permite que você descubra onde o usuário está, sempre com a permissão do usuário. Essa funcionalidade pode ser usada como parte das consultas do usuário, por exemplo, para orientar alguém até um ponto de destino. Também pode ser usada para marcar geograficamente algum conteúdo que o usuário tenha criado para, por exemplo, marcar onde uma foto foi tirada.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

A API é independente de dispositivo e não se preocupa em como o navegador determina a
localização, desde que os clientes possam solicitar e receber dados de localização de uma
forma padrão. O mecanismo subjacente pode ser via GPS, Wi-Fi ou apenas
solicitando ao usuário para inserir sua localização manualmente. Como qualquer uma dessas pesquisas
levará algum tempo, a API é assíncrona; você transmite um método de
retorno de chamada sempre que solicita uma localização.

## Quando usar a Geolocalização

*  Descubra onde o usuário estará mais próximo de sua localização física para personalizar 
  a experiência do usuário.
*  Personalize a informação (como notícias) de acordo com a localização do usuário.
*  Mostre a posição de um usuário no mapa.
*  Marque os dados criados dentro do seu aplicativo com a localização do usuário 
 (isto é, geomarcar uma imagem).


## Verifique a Compatibilidade

A API de geolocalização agora é suportada pela maioria dos navegadores, mas é
recomendável sempre verificar o suporte antes de se tomar uma atitude.

Você pode verificar facilmente a compatibilidade testando a presença do
objeto de geolocalização:

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## Determine a localização atual do usuário

A API de geolocalização oferece um método simples de ‘disparo único' para obter a localização
do usuário `getCurrentPosition()`.  Uma chamada para este método irá relatar
assincronamente a localização atual do usuário.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

Se essa for a primeira vez que um aplicativo neste domínio solicita
permissões, o navegador geralmente solicitará a permissão do usuário. Dependendo do
navegador, também pode haver preferências para sempre permitir - ou não permitir -
pedidos de permissão. Nesse caso, o processo de confirmação será ignorado.

Dependendo do dispositivo de localização que seu navegador está usando, o objeto de posição
pode realmente conter muito mais do que apenas latitude e longitude, podendo incluir, por exemplo, uma altitude ou uma direção.  Você não poderá prever qual informação extra esse sistema de localização usará até que ele retorne os dados.

## Testando a geolocalização do seu site

Ao trabalhar com suporte de geolocalização HTML5 em um aplicativo, é aconselhável
depurar o resultado recebido ao usar diferentes valores para longitude
e latitude.

O DevTools suporta a sobreposição de valores de posição para navegador.geolocalização
e a simulação da geolocalização não ficando disponível no menu de substituição.

<img src="images/emulategeolocation.png">

1. Abra o menu de substituição no DevTools.
2. Marque “Substituir Geolocalização” e insira em Lat = 41.4949819 e Lon = -0.1461206.
3. Atualize a página e agora você usará as posições de substituição para a geolocalização.

##  Sempre resolva os erros

Infelizmente, nem todas as pesquisas de localização têm êxito. Talvez um GPS não
possa ser localizado ou o usuário tenha desabilitado repentinamente as pesquisas de localização. Um segundo argumento
opcional para `getCurrentPosition()` será chamado no caso de um
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
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## Reduza a necessidade de inicialização do equipamento de geolocalização

Para muitas casos de uso, você não precisa da localização mais atualizada do usuário,
precisa apenas de uma estimativa aproximada.

Use a propriedade opcional `maximumAge` para dizer ao navegador para usar um resultado de
geolocalização obtido recentemente.  Isso não apenas é retornado mais rápido se um usuário tiver
solicitado os dados antes, mas também evita que o navegador precise inicializar
suas interfaces do equipamento de geolocalização como a triangulação do Wi-Fi ou o GPS.

{% highlight javascript %}
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
{% endhighlight %}

## Não deixe o usuário aguardando, defina um tempo limite

A menos que você defina um tempo limite, sua solicitação para obter a posição atual pode nunca ter um retorno.

{% highlight javascript %}
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
{% endhighlight %}

## Prefira uma localização aproximada em vez de uma localização exata

Se você deseja localizar a loja mais próxima de um usuário, é improvável que necessite de
uma precisão de 1 metro para resolver isso.  A API é projetada para fornecer uma localização 
geral que é retornada o mais rapidamente possível.

Se você necessita de uma alta precisão, é possível substituir a configuração padrão
com a opção `enableHighAccuracy`.  Use com moderação: pode ser mais demorado
para resolver e consumir mais bateria.

{% highlight javascript %}
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
{% endhighlight %}


