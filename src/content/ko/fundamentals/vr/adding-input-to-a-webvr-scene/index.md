project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ray Input 라이브러리를 사용하여 WebVR 장면에 입력을 추가하는 방법을 알아봅니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR 장면에 입력 추가 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Warning: WebVR은 아직 실험 단계이며 변경될 수 있습니다.

[WebVR 시작하기](../getting-started-with-webvr/) 섹션에서는 WebGL 장면을 가져와서 WebVR 기능을 추가하는 방법을 살펴봤습니다. 실행되는 동안 VR에서 장면을 둘러볼 수 있기 때문에 장면의 엔터티와 상호작용할 때 훨씬 재미있습니다.

![WebVR 장면에서 입력을 표시하는 레이 빔](./img/ray-input.jpg)

WebVR(및 일반적으로 3D)을 사용하면 다양한 입력이 가능하며, 이상적으로 말하자면 모든 입력을 고려할 뿐만 아니라 사용자의 상황이 바뀔 때마다 입력을 전환할 수 있습니다.

현재 사용할 수 있는 입력 유형은 다음과 같습니다.

<img class="attempt-right" src="../img/touch-input.png" alt="터치 입력 아이콘">

* **마우스**
* **터치**
* **가속도계 및 자이로스코프**
* **자유도가 없는 컨트롤러**(예: Cardboard). 뷰포트에 완전히 연결된 컨트롤러이며 일반적으로 뷰포트의 중심에서 상호작용이 발생한다고 가정합니다.
* **자유도가 3도인 컨트롤러**(예: Daydream Controller). 자유도가 3도인 컨트롤러는 방향 정보를 제공하지만 위치 정보는 제공하지 않습니다. 일반적으로 이러한 컨트롤러는 사람의 왼손 또는 오른손에 있는 것으로 가정하고 3D 공간에서 위치를 추정합니다.
* **자유도가 6도인 컨트롤러**(예: Oculus Rift 또는 Vive). 자유도가 6도인 컨트롤러는 방향 정보와 위치 정보를 모두 제공합니다. 이러한 컨트롤러는 일반적으로 기능 범위의 상단에 있으며 최상의 정확도를 제공합니다.

앞으로 WebVR이 발전하면서 새로운 입력 유형이 나올 수 있으므로 가급적 미래 지향적 코드를 제공해야 합니다. 그러나 모든 입력 순열을 처리하는 코드를 작성하는 것은 복잡하고 다루기 어려워질 수 있습니다. Boris Smus의 [Ray Input](https://github.com/borismus/ray-input) 라이브러리는 현재 사용 가능한 대부분의 입력 유형을 지원하는데, 여기서는 이를 토대로 설명하겠습니다.

이전 장면에서 [Ray Input을 사용하여 입력 핸들러를 추가](https://googlechrome.github.io/samples/web-vr/basic-input/)해 봅시다. 최종 코드는 [Google Chrome 샘플 저장소](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/)를 참조하세요.

## 페이지에 Ray Input 라이브러리 추가

간단히 스크립트 태그에 Ray Input을 직접 추가할 수 있습니다.

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

훨씬 큰 빌드 시스템의 일부로 Ray Input을 사용하는 경우에도 그런 방식으로 가져올 수 있습니다. [Ray Input README에 제공된 추가 정보](https://github.com/borismus/ray-input/blob/master/README.md)를 확인해야 합니다.

## 입력에 액세스하기

VR 디스플레이에 액세스한 후에 사용 가능한 모든 입력에 대한 액세스를 요청할 수 있습니다. 거기에서 이벤트 리스너를 추가할 수 있으며, 상자의 상태를 '선택 취소됨(deselected)'으로 기본 설정하도록 장면을 업데이트합니다.

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

`_getInput` 및 `_addInputEventListeners` 함수를 모두 들여다 봅시다.

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

Ray Input을 생성하려면 장면에서 Three.js 카메라를 전달하고 마우스, 터치 및 기타 필요한 이벤트 리스너를 바인딩할 수 있는 요소를 전달해야 합니다. 요소를 두 번째 매개변수로 전달하지 않으면 기본적으로 `window`에 바인딩되므로 사용자 인터페이스(UI)의 일부가 입력 이벤트를 받지 못할 수 있습니다!

또한 대체로 WebGL 캔버스 요소의 영역에 해당하는 작업 영역의 크기를 알려줘야 합니다.

## 장면 엔터티에 대해 상호작용 사용

그 다음으로, 추적할 대상과 수신할 이벤트를 Ray Input에 알려줘야 합니다.

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

마우스, 터치 또는 기타 컨트롤러를 사용하여 장면과 상호작용할 때 이러한 이벤트가 발생합니다. 장면에서 사용자가 상자를 가리키는지 여부에 따라 상자의 불투명도를 변경할 수 있습니다.

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

이 코드가 작동하려면 Three.js에서 상자의 재질이 투명도를 지원하도록 지정해야 합니다.

    this._box.material.transparent = true;

이제 마우스 및 터치 상호작용을 가립니다. Daydream Controller와 같이 자유도가 3도인 컨트롤러에 추가하는 과정을 살펴보겠습니다.

## Gamepad API 확장 프로그램 사용

현재 WebVR에서 Gamepad API를 사용하는 방법에 대한 두 가지 중요한 참고 사항을 이해해야 합니다.

* Chrome 56에서는 `chrome://flags`에서 Gamepad Extensions 플래그를 활성화해야 합니다. [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)을 사용하는 경우 Gamepad Extensions가 WebVR API와 함께 이미 활성화되어 있습니다. **로컬 개발의 경우 해당 플래그를 활성화해야 합니다**.

* 게임패드의 위치 정보(자유도가 3도인 컨트롤러에 대한 액세스 방법)는 **사용자가 VR 컨트롤러에서 버튼을 누르기만 하면 활성화됩니다**.

장면에 포인터를 표시하려면 사용자가 상호작용해야 하기 때문에 컨트롤러의 버튼을 누르도록 요청해야 합니다. 이를 수행하기에 가장 적합한 시기는 HMD(Head Mounted Display)에 나타내기 시작한 후입니다.

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

일반적으로 HTML 요소를 사용하여 사용자에게 해당 정보를 표시할 수 있지만 HMD는 WebGL 컨텍스트만 표시하므로 거기에 메시지를 나타내야 합니다. Three.js는 카메라 쪽을 항상 향하고 이미지를 그려 넣을 수 있는 [Sprite 프리미티브](https://threejs.org/docs/#Reference/Objects/Sprite)(일반적으로 'Billboarding'이라고 함)를 사용합니다.

![사용자에게 'Press Button' 메시지 표시](./img/press-a-button.jpg)

이를 수행하는 코드는 다음과 같습니다.

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

마지막으로, `_render` 함수에서 상호작용을 살펴보고 이를 사용하여 모달을 숨길 수 있습니다. 또한 HMD에 대해 `submitFrame()`을 호출하여 캔버스를 플러시하는 방식과 유사하게 업데이트할 시간을 Ray Input에 알려줘야 합니다.

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

## 장면에 포인터 메시 추가

사용자에게 상호작용을 허용할 뿐만 아니라 가리키고 있는 위치를 보여주는 항목을 표시할 수 있습니다. 이를 위해 Ray Input은 장면에 추가할 수 있는 메시를 제공합니다.

    this._scene.add(this._rayInput.getMesh());

이를 통해 컨트롤러(예: Cardboard)에서 움직임이 자유롭지 않은 HMD에 대한 십자선(reticle)과 움직임이 자유로운 HMD에 대한 빔과 같은 광선(ray)을 얻습니다. 마우스와 터치의 경우 십자선이 표시되지 않습니다.

![WebVR 장면에서 입력을 표시하는 레이 빔](./img/ray-input.jpg)

## 결론

개발 환경에 입력을 추가할 때 다음 사항을 명심해야 합니다.

* **점진적 향상을 수용해야 합니다.** 사용자가 목록에서 특정 입력 순열로 만든 항목을 사용할 수 있기 때문에 유형을 적절히 적용할 수 있도록 UI를 계획해야 합니다. 가능한 한 다양한 기기 및 입력을 테스트하여 도달 범위를 극대화합니다.

* **입력이 완벽하게 정확하지 않을 수 있습니다.** 특히 Daydream 컨트롤러는 자유도가 3도이지만 6도를 지원하는 공간에서 작동합니다. 즉, 방향이 올바른 3D 공간상의 위치를 가정해야 합니다. 이를 고려하여 입력 대상을 더 크게 만들고 적절한 간격을 확보하여 혼란을 피하는 것이 좋습니다.

몰입형 경험을 만들려면 장면에 입력을 추가해야 하는데 [Ray Input](https://github.com/borismus/ray-input)을 사용하면 이 작업을 훨씬 쉽게 할 수 있습니다.

진척 상항을 알려주세요!



{# wf_devsite_translation #}
