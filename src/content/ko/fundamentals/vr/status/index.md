project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR 경험을 빌드할 때 유의해야 할 사항뿐만 아니라 WebVR 상태에 대한 최신 정보를 제공합니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR 상태 및 고려 사항 {: .page-title }

Warning: WebVR은 아직 실험 단계이며 변경될 수 있습니다.

## WebVR 구현 상태

현재 WebVR API는 다음 브라우저에서 사용할 수 있습니다.

* [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)을 통한 Chrome Beta (M56+)
* Firefox Nightly
* Gear VR용 삼성 인터넷 브라우저 (참고: 현재 WebVR 사양의 이전 버전을 지원합니다.)

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

브라우저 구현 상태에 대한 자세한 내용은 [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed)을 참조하세요.

## 고려 사항

현재 WebVR 경험을 빌드할 때 다음 사항을 기억해야 합니다.

* **HTTPS를 통해 WebVR 콘텐츠를 제공해야 합니다.** 그렇지 않으면 브라우저가 사용자에게 경고를 표시합니다.
    * 자세한 내용은 [서버에서 HTTPS 사용](/web/fundamentals/security/encrypt-in-transit/enable-https)을 참조하세요.
* **Chrome은 현재 Android에서 기본 WebVR만 지원합니다.** Daydream 헤드셋을 픽셀폰과 함께 사용해야 합니다.
* **[WebVR 폴리필](https://github.com/googlevr/webvr-polyfill)은 사양의 기본 구현과 항상 일대일로 매칭되지 않을 수도 있습니다.** 폴리필을 사용하려면 VR 지원 기기와 비 VR 기기에서 모두 확인해야 합니다.
* **사용자가 코드에서 사용하려면 먼저 VR 컨트롤러 버튼을 클릭해야 합니다**. 일반적으로 VR 경험을 시작할 때 컨트롤러 버튼을 누르라는 메시지를 사용자에게 표시하는 방식으로 코드에서 이를 구현해야 합니다.
* **Chrome 56에서 로컬로 실행 중일 때는 Gamepad 포즈 정보를 활성화해야 합니다**. Chrome 56에서 Gamepad Extensions 런타임 플래그를 활성화하지 않으면 localhost에서 실행될 때 게임패드 정보에 포즈(또는 위치) 정보가 포함되지 않습니다. Origin Trial을 실행하는 경우 WebVR API를 사용하여 Gamepad Extensions를 활성화할 수 있습니다.


{# wf_devsite_translation #}
