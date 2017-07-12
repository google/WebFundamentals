project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Three.js에서 WebGL 장면을 가져와서 WebVR 기능을 추가하는 방법을 알아봅니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR 시작하기 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

Warning: WebVR은 아직 실험 단계이며 변경될 수 있습니다.

이 가이드에서는 WebVR API를 탐색하고 이를 사용하여 [Three.js](https://threejs.org/)로 빌드한 간단한 WebGL 장면을 개선합니다. 그러나 프로덕션 작업의 경우 [WebVR 상용구](https://github.com/borismus/webvr-boilerplate)와 같은 기존 솔루션으로 시작하기를 원할 수도 있습니다. Three.js에 대해 전혀 모르는 경우 [유용한 시작 가이드](https://aerotwist.com/tutorials/getting-started-with-three-js/)를 참조하세요. 진행하다가 막히는 부분이 있으면 관련 커뮤니티에 문의하세요.

[Google Chrome 샘플 저장소](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)에 있는 코드인 [와이어프레임 내부에 상자를 넣는 장면](https://googlechrome.github.io/samples/web-vr/hello-world/)부터 시작해 보겠습니다.

![Chrome 데스크톱에서 실행 중인 WebGL 장면](./img/desktop.jpg)

### 지원 관련 참고 사항

Chrome 56+에서 런타임 플래그 뒤에 WebVR을 포함할 수 있습니다. 해당 플래그를 활성화하면(`chrome://flags`로 이동하여 'WebVR' 검색) VR 작업을 로컬로 빌드하고 테스트할 수 있습니다. 방문자에게 WebVR을 지원하려면 [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)을 옵트인하여 원본에 대해 WebVR을 활성화할 수 있습니다.

[Web VR 폴리필](https://github.com/googlevr/webvr-polyfill)을 사용할 수도 있지만 폴리필을 사용하는 경우 성능이 상당히 저하됩니다. 대상 기기에서 확실히 테스트해야 하며 기기의 새로고침 빈도를 따라가지 못하는 항목은 제공해서는 안 됩니다. 프레임 속도가 느리거나 가변적인 경우 사용자가 상당히 불편을 느낄 수 있습니다.

자세한 내용은 [WebVR 상태](../status/) 페이지를 참조하세요.

## VR 디스플레이에 액세스하기

WebGL 장면에서 WebVR을 사용하려면 어떻게 해야 할까요? 먼저 navigator.getVRDisplays()를 사용하여 브라우저에 VR 디스플레이가 있는지 쿼리해야 합니다.

    navigator.getVRDisplays().then(displays => {
      // Filter down to devices that can present.
      displays = displays.filter(display => display.capabilities.canPresent);

      // If there are no devices available, quit out.
      if (displays.length === 0) {
        console.warn('No devices available able to present.');
        return;
      }

      // Store the first display we find. A more production-ready version should
      // allow the user to choose from their available displays.
      this._vr.display = displays[0];
      this._vr.display.depthNear = DemoVR.CAMERA_SETTINGS.near;
      this._vr.display.depthFar = DemoVR.CAMERA_SETTINGS.far;
    });

이 코드에서 몇 가지 주의할 사항이 있습니다.

1. **일부 기기는 헤드 마운트 디스플레이에 '표시'할 수 없습니다.** 가속도계 사용 또는 의사 VR 경험 등을 허용하지만 HMD를 사용하지 않는 기기가 있습니다. 이러한 기기의 경우 canPresent 부울이 false인데, 이를 확인해야 합니다.

2. **사용 가능한 VR 기기가 없을 수 있습니다.** 비 VAL 설정에 대해 잘 작동하는 환경을 만들고, VR의 가용성을 점진적 향상으로 취급해야 합니다.

3. **사용 가능한 VR 기기가 여러 개 있을 수 있습니다. **마찬가지로 사용 가능한 VR 기기가 여러 개 있을 수 있는데, 가능하다면 가장 적합한 기기를 선택하도록 허용해야 합니다.

## WebVR 에뮬레이션 Chrome DevTools 확장 프로그램 설치

테스트할 VR 지원 기기가 없는 경우도 있습니다. 이러한 경우 도움을 받을 수 있습니다. Jaume Elias가 [VR 기기를 에뮬레이트하는 Chrome DevTools 확장 프로그램](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil)을 만들었습니다.

![Jaume Elias의 Chrome 확장 프로그램을 사용하여 WebVR 에뮬레이트](./img/webvr-emulation.jpg)

실제 기기에서 테스트하는 것이 항상 바람직하지만(특히 성능 테스트의 경우) 이 확장 프로그램을 사용하면 빌드 중에 신속하게 디버그하는 데 도움이 됩니다.

## 기기에서 프레젠테이션 요청

'VR 모드'로 프레젠테이션을 시작하려면 기기에서 요청해야 합니다.

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent`는 [Web VR 사양](https://w3c.github.io/webvr/#vrlayer)에서 'VRLayer'라고 하는 배열을 취합니다. 이 배열은 본질적으로 VR 기기에 지정된 Canvas 요소의 래퍼입니다. 위의 코드 스니펫에서는 Three.js가 제공하는 Canvas 요소(`WebGLRenderer.domElement`)를 취하여 단일 VRLayer의 소스 속성으로 전달합니다. 그러면 `requestPresent`가 [프라미스](/web/fundamentals/getting-started/primers/promises)를 제공합니다. 프라미스는 요청이 성공하면 해결하고 실패하면 거부합니다.

## VR 장면 그리기

마지막으로 매우 흥미로운 VR 장면을 살펴보겠습니다.

![픽셀폰에서 실행 중인 WebVR 장면](../img/getting-started-with-webvr.jpg)

먼저 다음을 수행해야 합니다.

* 기기의 `requestAnimationFrame` 콜백을 사용하는지 확인합니다.
* VR 기기에서 현재 포즈, 방향 및 눈 정보를 요청합니다.
* WebGL 컨텍스트를 각 눈에 하나씩 두 개로 나누고 각각을 그립니다.

왜 창 객체에서 제공되는 것과 다른 `requestAnimationFrame`을 사용해야 하나요? 새로고침 빈도가 호스트 컴퓨터와 다를 수 있는 디스플레이로 작업하기 때문입니다. 헤드셋의 새로고침 빈도가 120Hz인 경우 해당 빈도에 따라 프레임을 생성해야 하며, 이는 호스트 컴퓨터가 화면을 60Hz로 새로 고치는 경우에도 마찬가지입니다. WebVR API는 호출할 서로 다른 `requestAnimationFrame` API를 제공하여 이를 처리합니다. 휴대기기의 경우 일반적으로 디스플레이가 하나뿐입니다. (그리고 Android의 경우 새로고침 빈도는 60Hz입니다.) 하지만 그런 경우에도 정확한 API를 사용하여 미래 지향적 코드를 제공하고 호환성을 최대한 높여야 합니다.

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

그런 다음,  `getFrameData()`를 사용하여 사람의 머리 위치 정보, 회전 및 올바르게 그리는 데 필요한 기타 정보를 요청해야 합니다.

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()`는 필요한 정보를 배치할 수 있는 객체를 취합니다. 해당 객체는 `new VRFrameData()`로 생성할 수 있는 `VRFrameData` 객체여야 합니다.

    this._vr.frameData = new VRFrameData();

프레임 데이터에는 다음과 같은 흥미로운 정보가 많이 있습니다.

* **timestamp**. 기기의 업데이트 타임스탬프입니다. 이 값은 VR 디스플레이에서 getFrameData가 처음으로 호출될 때 0에서 시작합니다.

* **leftProjectionMatrix** 및 **rightProjectionMatrix**. 장면에서 눈의 원근감을 설명하는 카메라의 행렬입니다. 이에 대해서는 바로 아래에서 설명하겠습니다.

* **leftViewMatrix** 및 **rightViewMatrix**. 장면에서 각 눈의 위치 정보를 제공하는 두 개의 추가 행렬입니다.

3D 작업에 대해 잘 모르는 경우 프로젝션 행렬과 모델 뷰 행렬은 어렵게 보일 수 있습니다. 여기에는 수학적 계산이 적용되지만 행렬의 작동 방식과 작업 내용에 대해 기술적으로 정확히 알 필요는 없습니다.

* **프로젝션 행렬.** 장면 내에서 원근감을 만드는 데 사용됩니다. 일반적으로 눈에서 멀리 이동할 때 장면의 객체의 배율을 왜곡하는 방식으로 이 작업을 수행합니다.

* **모델 뷰 행렬.** 3D 공간에서 객체의 위치를 지정하는 데 사용됩니다. 행렬 작동 방식 때문에 장면 그래프를 생성하고 그래프 아래로 이동하여 각 노드의 행렬을 곱하고 문제의 객체에 대한 최종 모델 뷰 행렬에 도달할 수 있습니다.

프로젝션 행렬과 모델 뷰 행렬에 대해 훨씬 심도 있게 설명하는 훌륭한 가이드가 웹에 많이 있으므로 필요한 경우 google에서 자세한 배경 정보를 검색해 보세요.

## 장면 렌더링 제어

필요한 행렬을 사용하여 왼쪽 눈에 대한 뷰를 그려봅시다. 먼저 render를 호출할 때마다 Three.js에 WebGL 컨텍스트를 지우지 말라고 알려줘야 합니다. 왜냐하면 오른쪽 눈에 대한 뷰를 포함하여 두 번 그려야 하는데, 오른쪽 눈에 대한 뷰를 그릴 때 왼쪽 눈에 대한 이미지를 손실하지 않아야 하기 때문입니다.

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

다음에는 왼쪽 절반만 그리도록 렌더러를 설정합시다.

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

이 코드는 GL 컨텍스트를 전체 화면(`window.inner*`)으로 가정하므로 VR에 매우 적합합니다. 이제 왼쪽 눈에 대한 두 행렬을 연결할 수 있습니다.

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

중요한 두 가지 구현 주의 사항이 있습니다.

* **이동의 대상은 카메라가 아니라 세계입니다.** 이전에 경험해 보지 않은 경우 약간 이상하게 보일 수 있지만 카메라를 원점(0, 0, 0)에 그대로 두고 세계를 이동하는 것은 흔한 그래픽 작업입니다. 너무 철학적으로 접근하지 않고 생각해 봅시다. 내가 10미터 앞으로 이동한 경우 내가 10미터 앞으로 이동한 것일까요, 아니면 세계가 10미터 뒤로 이동한 것일까요? 이는 관점에 따라 상대적이며 수학적 관점에서는 어느 쪽이든 문제가 안 됩니다. WebVR API는 '눈의 모델 행렬의 *역*'을 반환하므로 카메라 자체가 아닌 세계(우리의 코드에서 `this._scene`)에 적용될 것으로 예상됩니다.

* **값을 변경한 후 행렬을 직접 업데이트해야 합니다.** Three.js는 값을 매우 많이 캐시하는데(성능 우수!), 이는 변경 사항을 보려면 *반드시* 변경되었음을 알려줘야 함을 의미합니다. 이 작업은 `updateMatrixWorld()` 메서드로 수행합니다. 이 메서드는 부울을 사용하여 계산이 장면 그래프 아래로 전파되도록 보장합니다.

이제 거의 다 왔습니다! 마지막으로 오른쪽 눈에 대한 프로세스를 반복하는 단계를 수행하면 됩니다. 여기서는 오른쪽 눈의 뷰 렌더링에 영향을 미치지 않도록 왼쪽 눈에 대한 뷰를 그린 후에 렌더러의 깊이 계산을 지우겠습니다. 그런 다음 뷰포트를 오른쪽으로 업데이트하고 장면을 다시 그립니다.

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

이제 오른쪽 눈에 대한 두 행렬을 연결할 수 있습니다.

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

드디어 마쳤습니다! 사실 그다지 대단한지는 모르겠습니다.

## 기기에 업데이트 지시

정지한 객체를 움직이는 경우 디스플레이는 업데이트되지 않습니다. 이는 WebGL 컨텍스트에 수많은 렌더링을 할 수 있고 HMD가 실제로 자체 디스플레이를 업데이트할 시간을 모르기 때문입니다. 각 개별 눈의 이미지가 렌더링된 후 업데이트하는 것은 비효율적입니다. 따라서 submitFrame을 호출하여 업데이트를 직접 제어합니다.

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

이 코드를 추가하여 이제 정말로 *완료*했습니다. 최종 버전은 [Google Chrome 샘플 저장소](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world)를 참조하세요.

## 결론 및 리소스

WebVR은 콘텐츠에 몰입형 경험을 추가하는 정말 멋진 방법이며 Three.js와 같은 라이브러리를 사용하면 WebGL을 훨씬 쉽게 시작할 수 있습니다. 그러나 기억해야 할 몇 가지 중요한 사항이 있습니다.

* **처음부터 점진적 향상으로 빌드합니다.** 이 가이드에서 여러 번 언급했듯이 WebVR을 계층화할 수 있는 기본 수준의 훌륭한 경험을 구현하는 것이 중요합니다. 대부분의 경험은 마우스/터치 컨트롤로 구현할 수 있으며 가속도계 컨트롤을 통해 완전한 VR 경험으로 업그레이드할 수 있습니다. 잠재고객을 최대한으로 유지하는 것은 항상 중요합니다.

* **장면을 두 번 렌더링한다는 사실을 기억하세요.** 장면을 두 번 렌더링할 때 CPU 및 GPU의 계산 작업량을 줄이도록 세부정보 수준(LOD) 및 기타 기법에 대해 생각해야 할 수도 있습니다. 무엇보다도 견고한 프레임 속도를 유지해야 합니다! 아무리 좋은 기능이라도 멀미를 유발할 정도로 극단적인 불편함을 주어서는 안 됩니다!

* **실제 기기에서 테스트합니다.** 이는 이전 내용과 관련 있습니다. 특히 휴대기기를 대상으로 하는 경우 빌드 중인 항목을 테스트할 수 있는 실제 기기를 확보해야 합니다. ['노트북은 더러운 거짓말쟁이'](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405)라는 말이 있습니다.

찾아보면 WebVR 콘텐츠 제작과 관련하여 빠르게 시작하는 데 도움이 되는 리소스가 많이 있습니다.

* **[VRView](https://github.com/googlevr/vrview)**. 이 라이브러리는 360도 파노라마 사진과 동영상을 포함하는 데 도움이 됩니다.

* **[WebVR 상용구](https://github.com/borismus/webvr-boilerplate)**. WebVR 및 Three.js를 시작하는 데 도움이 됩니다.

* **[WebVR 폴리필](https://github.com/googlevr/webvr-polyfill)**. WebVR에 대한 필수 API를 다시 채웁니다. 폴리필을 사용하는 경우 성능이 저하되므로 이 기능이 제공되는 동안 사용자는 비 VR 경험을 사용하는 편이 좋을 수도 있습니다.

* **[Ray-Input](https://github.com/borismus/ray-input)**. VR 기기 및 비 VR 기기에 대한 다양한 입력 유형(예: 마우스, 터치 및 VR Gamepad 컨트롤러)을 처리하는 데 도움이 되는 라이브러리입니다.

이제 멋진 VR을 만들어 보세요!


{# wf_devsite_translation #}
