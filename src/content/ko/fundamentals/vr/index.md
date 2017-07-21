project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR {: .page-title }

Warning: WebVR은 아직 실험 단계이며 변경될 수 있습니다.

WebVR은 사용자가 보유한 VR 헤드셋과 VR 지원 기기(예: [Daydream 헤드셋](https://vr.google.com/daydream/) 및 픽셀폰)를 사용하여 브라우저에서 완전 몰입형 3D 경험을 제공하는 JavaScript API입니다.

<img src="img/getting-started-with-webvr.jpg" alt="WebVR 시작하기" />

## 지원 및 가용성

현재 WebVR API는 다음 브라우저에서 사용할 수 있습니다.

* [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)을 통한 Chrome Beta (M56+)
* Firefox Nightly
* Gear VR용 삼성 인터넷 브라우저 (참고: 현재 WebVR 사양의 이전 버전을 지원합니다.)

브라우저가 WebVR을 지원하지 않거나 이전 버전의 API를 사용하는 경우 [WebVR 폴리필](https://github.com/googlevr/webvr-polyfill)로 대체할 수 있습니다. 그러나 VR은 *성능에 매우 민감하며* 폴리필은 일반적으로 성능 비용이 상대적으로 높기 때문에 WebVR을 기본적으로 지원하지 않는 사용자에 대해 폴리필을 사용할지 여부를 고려해야 할 수 있습니다.

의심스러울 때는 낮은 성능으로 인해 사용자가 멀미를 일으키는 상황을 피하세요!

[WebVR에 대한 최신 상태를 확인하세요.](./status/)

## WebVR 콘텐츠 만들기

WebVR 콘텐츠를 만들려면 [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) 및 [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)와 같은 기존 기술뿐만 아니라 몇 가지 최신 API를 사용하고 여러 입력 유형과 헤드셋도 고려해야 합니다.

<div class="attempt-left">
  <h3>WebVR 시작하기</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="WebVR 시작하기" />
  </a>
  <p>
    WebGL 장면을 가져오고 VR API를 추가하여 WebVR을 시작합니다.<br>
    <a href="./getting-started-with-webvr/">자세히 알아보기</a>
  </p>
</div>
<div class="attempt-right">
  <h3>WebVR 장면에 입력 추가</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="WebVR 장면에 입력 추가" />
  </a>
  <p>
    상호작용은 매력적인 몰입형 경험을 제공하는 핵심 요소입니다.<br>
    <a href="./adding-input-to-a-webvr-scene/">시작하기</a>
  </p>
</div>

<div class="clearfix"></div>

### 추가 리소스

몇 가지 눈에 띄는 WebVR 리소스가 웹에 나타나기 시작했습니다.

* [WebVR API에 대해 알아보기](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [WebVR 샘플 참조](https://webvr.info/samples/)
* [Google Cardboard용 디자인](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## 성능 추적

<img src="img/oce.png" class="attempt-right" alt="WebVR 성능" />

WebVR 경험의 불편을 최소화하려면 일관된 (그리고 높은) 프레임 속도를 유지해야 합니다. 그렇게 하지 않으면 사용자에게 멀미를 유발할 수 있습니다!

휴대기기에서 새로고침 빈도는 일반적으로 60Hz입니다. 즉, 목표는 60fps(또는 프레임당 브라우저 오버헤드를 *포함하여* 프레임당 16ms)입니다. 데스크톱에서 목표는 일반적으로 90Hz(오버헤드를 포함하여 11ms)입니다.

이러한 목표를 달성하려면 [대상 기기에서 정기적으로](/web/tools/chrome-devtools/remote-debugging/) 테스트해야 하며 [Chrome DevTools의 타임라인을 사용하여 프레임당 비용을 측정해야 합니다](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## 점진적 향상 수용

<img src="img/touch-input.png" class="attempt-right" alt="도달 범위를 극대화하기 위해 점진적 향상 사용" />

사용자가 헤드 마운트 디스플레이(HMD) 또는 VR 지원 기기를 가지고 있지 않은 경우 어떻게 해야 할까요? 최선의 정답은 점진적 향상을 사용하는 것입니다.

1. 사용자가 VR 헤드셋에 액세스할 수 없는 키보드, 마우스 또는 터치스크린과 같은 일반적인 입력을 사용한다고 가정합니다.
2. 런타임 시 입력 및 헤드셋 사용 가능 여부의 변경 사항을 적용합니다.

[WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)를 사용하면 VR 환경에서 변경 사항을 감지하여 사용자 기기의 입력 및 보기 옵션 변경 사항을 검색하고 적용할 수 있습니다.

비 VR 환경을 먼저 가정하여 경험 범위를 극대화하고 사용자의 설정에 관계없이 최상의 경험을 제공할 수 있습니다.

자세한 내용은 [WebVR 장면에 입력 추가](./adding-input-to-a-webvr-scene/) 가이드를 참조하세요.


{# wf_devsite_translation #}
