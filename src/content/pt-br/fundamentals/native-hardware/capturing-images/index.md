project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A maioria dos navegadores pode obter acesso à câmera do usuário.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2016-08-23 #}

# Como capturar uma imagem do usuário {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Atualmente, muitos navegadores têm o recurso de acessar inserções de dados de áudio e vídeo do 
usuário. No entanto, dependendo do navegador, essa pode ser uma experiência dinâmica e 
integrada ou delegada a outro aplicativo do dispositivo do usuário.

## Comece com o simples e evolua aos poucos

A coisa mais fácil a se fazer é simplesmente solicitar ao usuário um arquivo
pré-gravado. Faça isso criando um elemento "input" de arquivo simples e adicionando 
um filtro `accept` que indique que só podemos aceitar arquivos de imagem e que o ideal seria 
obtê-los diretamente da câmera.

    <input type="file" accept="image/*" capture>

Esse método funciona em todas as plataformas. Em computadores, o usuário poderá 
carregar um arquivo de imagem do sistema de arquivos. No Safari
para iOS, esse método abrirá o aplicativo da câmera, permitindo capturar uma imagem 
e enviá-la para a página da web. No Android, esse método dará ao usuário 
a opção de definir que aplicativo será usado para capturar a imagem antes de enviá-la para
a página da web.

Em seguida, os dados podem ser ligados a um `<form>` ou manipulados com JavaScript pela 
detecção de um evento `onchange` no elemento "input" e, depois, lendo 
a propriedade `files` do `target` do evento.

### Capturar um único quadro

Obter acesso ao arquivo de imagem é bem simples.

    <input type="file" accept="image/*" capture="camera" id="camera">
    <img id="frame">
    <script>
      var camera = document.getElementById('camera');
      var frame = document.getElementById('frame');

      camera.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the image file.
        frame.src = URL.createObjectURL(file);
      });
    </script>

Depois que você tiver acesso ao arquivo, pode fazer o que quiser com ele. Por 
exemplo, é possível:

* Anexá-lo diretamente a um elemento `<canvas>` para poder manipulá-lo
* Baixar no dispositivo do usuário
* Carregá-lo em um servidor anexando-o a uma `XMLHttpRequest` 

Embora usar o método do elemento "input" para obter acesso a imagens seja 
universal, é a opção menos vantajosa porque ele não está diretamente 
integrado à página da web e, em computadores, não pode acessar a webcam do usuário.

## Acesse a câmera de forma interativa

Os navegadores modernos podem obter acesso direto à câmera, o que permite criar
experiências totalmente integradas com a página web para que o usuário não precise
sair do navegador em nenhum momento.

Aviso: acesso direto à câmera é um recurso poderoso e, por isso, requer autorização 
do usuário e o seu site precisa estar em uma origem segura (HTTPS).

### Obtenha acesso à câmera

Podemos acessar a câmera e o microfone diretamente usando uma API na especificação 
WebRTC chamada `getUserMedia()`. Assim, enviamos uma solicitação de 
acesso às câmeras e microfones ao usuário.

Se a resposta for positiva, a API retornará um `MediaStream` que contém dados
da câmera e poderemos anexá-lo a um elemento `<video>` e reproduzi-lo
para ver uma prévia em tempo real ou anexá-lo a um `<canvas>` para obter
uma imagem instantânea.

Para obter dados da câmera, basta definir `video: true` no objeto de 
restrições passado à API de `getUserMedia()`

    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Por si só, isso não é tão útil. Tudo que podemos fazer e obter os dados de vídeo e
reproduzi-lo.

### Tire uma foto com a câmera

Para acessar os dados brutos da câmera, temos que pegar o fluxo criado por
`getUserMedia()` e processar os dados. Ao contrário da `Web Audio`, não há uma 
API de processamento de fluxo dedicada para vídeos na web, por isso temos que recorrer a um 
pouquinho do jeitinho brasileiro para capturar uma foto da câmera do usuário.

Esse processo acontece assim:

1. Crie um objeto "canvas" que armazenará o quadro da câmera
2. Obtenha acesso ao fluxo da câmera
3. Anexe-o a um elemento "video"
4. Quando quiser capturar um quadro preciso, adicione os dados do elemento "video" a 
   um objeto "canvas" usando `drawImage()`.

Pronto!

    <video id="player" controls autoplay></video>
    <button id="capture">Capture</button>
    <canvas id="snapshot" width=320 height=240></canvas>
    <script>
      var player = document.getElementById('player'); 
      var snapshotCanvas = document.getElementById('snapshot');
      var captureButton = document.getElementById('capture');

      var handleSuccess = function(stream) {
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
      };

      captureButton.addEventListener('click', function() {
        var context = snapshot.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, snapshotCanvas.width, 
            snapshotCanvas.height);
      });

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

Quando tiver os dados da câmera armazenados no "canvas", você vai poder fazer
muitas coisas com eles. Como: 

* Carregá-los direto no servidor.
* Armazenar localmente
* Aplicar efeitos modernos à imagem

### Pare de transmitir da câmera quando não for necessário

É uma boa prática parar de usar a câmera quando ela não é necessária.
Isso não só economiza bateria e capacidade de processamento, mas também faz 
com que os usuários confiem no seu aplicativo.

Para parar de acessar a câmera, basta chamar `stop()` em cada trilha de vídeo 
do fluxo retornado por `getUserMedia()`.

<pre class="prettyprint">
&lt;video id="player" controls autoplay>&lt;/video>
&lt;button id="capture">Capture&lt;/button>
&lt;canvas id="snapshot" width=320 height=240>&lt;/canvas>
&lt;script>
  var player = document.getElementById('player'); 
  var snapshotCanvas = document.getElementById('snapshot');
  var captureButton = document.getElementById('capture');
  <strong>var videoTracks;</strong>

  var handleSuccess = function(stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    <strong>videoTracks = stream.getVideoTracks();</strong>
  };

  captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    <strong>// Stop all video streams.
    videoTracks.forEach(function(track) {track.stop()});</strong>
  });

  navigator.mediaDevices.getUserMedia({video: true})
      .then(handleSuccess);
&lt;/script>
</pre>

## Peça autorização para usar a câmera com responsabilidade

Se o usuário ainda não tiver concedido acesso à câmera para o seu site,
no instante em que você chamar `getUserMedia`, o navegador pedirá que o usuário
autorize o seu site a acessá-la. 

Os usuários odeiam receber solicitações de permissão de acesso a dispositivos importantes 
do seu aparelho e muitas vezes bloqueiam a solicitação ou a ignoram se não 
entendem por que a solicitação foi criada. A abordagem mais 
indicada é só pedir acesso à câmera na primeira vez em que ela for necessária. Depois que o usuário
conceder acesso, ele não receberá mais solicitações de permissão de acesso. Porém, se o usuário não der a permissão, 
você não poderá acessar novamente, a menos que ele mude manualmente as configurações de permissão 
da câmera.

Aviso: pedir acesso à câmera durante o carregamento de uma página fará com 
que a maioria dos usuários não conceda permissão de acesso a ela.

## Compatibilidade

Saiba mais sobre a implementação em navegadores para dispositivo móvel e computador:
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

Recomendamos também usar o paliativo [adapter.js](https://github.com/webrtc/adapter) para proteger os aplicativos de mudanças na especificação WebRTC e diferenças de prefixo.


{# wf_devsite_translation #}
