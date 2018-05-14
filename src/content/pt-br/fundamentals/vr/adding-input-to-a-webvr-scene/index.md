project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Descubra como usar a biblioteca Ray Input para adicionar interação à sua cena da WebVR.

{# wf_updated_on: 2016-12-12 #}
{# wf_published_on: 2016-12-12 #}

# Adicionar interação a uma cena da WebVR {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Aviso: a WebVR ainda é experimental e, por isso, está sujeita a mudanças.

Na seção [Primeiros passos com a WebVR](../getting-started-with-webvr/), falamos sobre como adicionar uma funcionalidade da WebVR a uma cena WebGL. Embora isso funcione, e você possa ver em 360º na cena em RV, ainda tem muita diversão na interação com elementos da cena.

![Um feixe de raio que mostra interação em uma cena da WebVR](./img/ray-input.jpg)

Com a WebVR (e 3D em geral), podem haver diversos tipos de interação e, em termos ideais, queremos não só considerar todos eles, mas alternar entre eles à medida que o contexto do usuário muda.

Uma pesquisa rápida dos tipos de interação disponíveis atualmente inclui:

<img class="attempt-right" src="../img/touch-input.png" alt="Ícone de interação por toque">

* **Mouse.**
* **Toque.**
* **Acelerômetro e giroscópio.**
* **Controladores sem grau de liberdade** (como o Cardboard). Esses são controladores totalmente atrelados à janela de visualização e, normalmente, presume-se que a interação se origine no centro da janela de visualização.
* **Controladores com 3 graus de liberdade** (como o controlador Daydream). Um controlador com 3 graus fornece informações de orientação, mas não de localização. Normalmente, presume-se que a pessoa segure que esses controles na mão direita ou na esquerda, e sua posição no espaço 3D é estimada.
* **Controladores com 6 graus de liberdade** (como o Oculus Rift e o Vive). Todo controlador com 6 graus de liberdade fornece informações de orientação e de localização. Normalmente, eles estão no máximo da possibilidade dos recursos tecnológicos e tem a melhor precisão.

No futuro, quando a WebVR se consolidar, podemos até ver novos tipos de interação, o que significa que nosso código precisa ser o mais voltado para o futuro possível. Porém, escrever código para tratar de todas as trocas de interação pode ser bem complicado e pesado. A biblioteca [Ray Input](https://github.com/borismus/ray-input), de Boris Smus, já fornece um início muito à frente, oferecendo suporte à maioria dos tipos de interação disponíveis hoje, então, vamos começar por ele.

Partindo da cena anterior, vamos [adicionar gerenciadores de interação com o Ray Input](https://googlechrome.github.io/samples/web-vr/basic-input/). Se quiser dar uma olhada no código final, acesse o [repositório de exemplos do Google Chrome](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/).

## Adicionar a biblioteca Ray Input à página

Para simplificar, podemos adicionar o Ray Input diretamente com a tag "script":

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

Se estiver usando o Ray Input como parte de um sistema de compilação maior, é possível importá-lo por esse sistema também. O [LEIA-ME do Ray Input tem mais informações](https://github.com/borismus/ray-input/blob/master/README.md), vale a pena dar uma olhada.

## Obter acesso às interações

Depois de obter acesso a todas as exibições de RV, podemos solicitar acesso a todas as interações disponíveis. A partir daí, podemos adicionar ouvintes de evento e atualizar a cena para configurar como padrão a não seleção do estado da nossa caixa.

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

Let’s take a look inside both the `_getInput` and `_addInputEventListeners` functions.

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

Criar um Ray Input envolve passar a câmera de Three.js a ele a partir da cena, e um elemento a que ele pode vincular mouse, toque ou qualquer outro ouvinte de evento necessário. Se você não passar por um elemento como o segundo parâmetro ele falhará ao tentar vincular com `window`, o que pode impedir que partes da sua interface do usuário (IU) receba eventos de interação.

Outro ponto que você precisa ter atenção é informar ao Ray Input o tamanho da área com que ele precisa trabalhar, que, na maioria dos casos, é a área da tela do WebGL.

## Permitir interatividade com elementos da cena

Agora, precisamos informar ao Ray Input o que acompanhar e que eventos temos interesse em receber.

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

As you interact with the scene, whether by mouse, touch, or other controllers, these events will fire. In the scene we can make our box’s opacity change based on whether the user is pointing at it.

    _onSelected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 1;
    }

    _onDeselected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 0.5;
    }

Para isso funcionar, precisamos garantir que informemos o Three.js de que o material da caixa deve ser compatível com transparência.

    this._box.material.transparent = true;

Isso deve ser suficiente para interações de mouse e toque. Vejamos o que faz parte da adição de um controlador de 3 graus de liberdade, como o Daydream.

## Ativar extensões da Gamepad API

Há dois fatores importantes que você deve conhecer sobre o uso da Gamepad API na WebVR de hoje em dia:

* No Chrome 56, você precisará ativar o sinalizador de extensões do Gamepad em `chrome://flags`. Se você tem um [Teste na origem](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md), as extensões do Gamepad já estarão ativadas junto com as WebVR APIs. **Para desenvolvimento local, você precisará do sinalizador ativo**.

* As informações de "pose" do controlador (que é como você obtém acesso a esses 3 graus de liberdade) **só são ativados quando o usuário pressiona um botão no controlador de RV**.

Como o usuário precisa interagir antes de podermos exibir uma indicação na cena, precisaremos pedir a ele que pressione um botão no controlador. A melhor hora de fazer isso é depois que começarmos a apresentação para o dispositivo de realidade virtual (HMD).

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

Normalmente, você esperaria usar Elementos HTML para exibir essas informações aos usuários, mas o HMD está exibindo um contexto da WebGL (e nada mais), então precisamos esboçar uma mensagem. O Three.js tem um [Sprite primitivo](https://threejs.org/docs/#Reference/Objects/Sprite) que sempre fica virado para a câmera (normalmente chamado de "Ponto focal"), e podemos delinear uma imagem dentro dele.

![Exibição de uma mensagem "Press Button" aos usuários](./img/press-a-button.jpg)

O código para fazer isso fica mais ou menos assim.

    _showPressButtonModal () {
      // Get the message texture, but disable mipmapping so it doesn't look blurry.
      const map = new THREE.TextureLoader().load('./images/press-button.jpg');
      map.generateMipmaps = false;
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;

      // Create the sprite and place it into the scene.
      const material = new THREE.SpriteMaterial({
        map, color: 0xFFFFFF
      });

      this._modal = new THREE.Sprite(material);
      this._modal.position.z = -4;
      this._modal.scale.x = 2;
      this._modal.scale.y = 2;
      this._scene.add(this._modal);

      // Finally set a flag so we can pick this up in the _render function.
      this._isShowingPressButtonModal = true;
    }

Por fim, na função `_render`, podemos acompanhar as interações e usá-la para esconder o modal. Além disso, precisamos informar o Ray Input sobre quando atualizar, parecido como a forma com que chamamos `submitFrame()` no HMD para esvaziar a tela dele.

    _render () {
      if (this._rayInput) {
        if (this._isShowingPressButtonModal &&
            this._rayInput.controller.wasGamepadPressed) {
          this._hidePressButtonModal();
        }

        this._rayInput.update();

      }
      …
    }

## Adicionar a malha de indicação à cena

Assim como permitir interações, é provável que queiramos exibir alguma coisa ao usuário que mostre para onde ele está apontando. O Ray Input fornece uma malha poligonal que você pode adicionar à cena com essa única finalidade.

    this._scene.add(this._rayInput.getMesh());

Com isso, obtemos um retículo dos HMDs sem liberdade de movimento no controlador (como o Cardboard), e um raio similar a um feixe para os HMDs com liberdade de movimento. Para mouse e toque, não há retículos exibidos.

![Um feixe de raio que mostra interação em uma cena da WebVR](./img/ray-input.jpg)

## Conclusões

Há algumas coisas bem importantes a considerar na hora de adicionar interação às suas experiências.

* **Você deve aceitar o Progressive Enhancement de braços abertos.** Já que uma pessoa pode usar o que você criou com qualquer caminho de troca de interações da lista, você deve se esforçar para planejar a sua IU de tal forma que possa se adaptar bem entre os tipos. Sempre que puder, teste em diversos dispositivos e interações para maximizar o alcance.

* **As interações podem não ser perfeitamente precisas.** Em especial, o controlador Daydream tem 3 graus de liberdade, mas está operando em um espaço que comporta 6. Isso significa que, embora sua orientação esteja correta, sua posição no espaço 3D tem que ser presumida. Para levar isso em consideração, pode ser uma boa ideia aumentar os pontos de interação e garantir espaçamento adequado para evitar confusão.

Adicionar interação a uma cena é fundamental para criar uma experiência imersiva, e com o [Ray Input](https://github.com/borismus/ray-input) é muito mais fácil.

Mostre para a gente como você está usando ele!



{# wf_devsite_translation #}
