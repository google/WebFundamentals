project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Windows, Mac 또는 Linux 컴퓨터에서 Android 기기의 라이브 콘텐츠를 원격으로 디버그합니다.

{# wf_updated_on: 2016-12-09 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Android 기기 원격 디버깅 시작하기 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Windows,
Mac 또는 Linux 컴퓨터에서 Android 기기의 라이브 콘텐츠를 원격으로 디버그합니다. 이 가이드는 다음을 수행하는 방법을 안내합니다.

* 원격 디버깅용 Android 기기를 설정하고
개발용 컴퓨터에서 검색합니다.
* 개발용 컴퓨터에서 Android 기기의 라이브 콘텐츠를 검사 및
디버그합니다.
* 개발용 컴퓨터에서 Android 기기의 콘텐츠를
DevTools 인스턴스로 스크린캐스트합니다.

![원격 디버깅 그림](imgs/remote-debugging.png)

## 요구사항 {: #requirements }

* 개발용 컴퓨터에 Chrome 32 이상 설치
* Windows를 사용 중인 경우 개발용 컴퓨터에 [USB 드라이버][drivers]
  설치 (_장치 관리자_ 가 USB 드라이버를 제대로 보고하는지 확인하세요.)
* Android 기기를 개발용 컴퓨터에 연결할 USB  케이블
* Android 4.0 이상
* Android용 Chrome이 Android 기기에 설치되어 있어야 합니다.

[drivers]: https://developer.android.com/tools/extras/oem-usb.html

## 1단계: Android 기기 찾기 {: #discover }

1. Android 기기에서 **Settings** > **Developer Options** >
   **Enable USB Debugging**을 선택합니다. Android 4.2 이상의 버전에서는 **Developer Options**가
기본적으로 숨겨져 있습니다. 활성화 방법에 대한 자세한 내용은 [온디바이스 개발자 옵션][android]
을 참조하세요.

[android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. 개발용 컴퓨터에서 Chrome을 엽니다. Google 계정으로
Chrome에 로그인해야 합니다. 원격 디버깅은
[시크릿 모드][incognito] 또는 [게스트 모드][guest]에서 작동하지 않습니다.

[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [DevTools를 엽니다](/web/tools/chrome-devtools/#open).

1. DevTools에서 **Main Menu**![기본 메뉴][main]{:.devtools-inline}를
클릭한 다음 **More tools** > **Remote devices**를 선택합니다. 

     ![원격 기기 창 열기][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. DevTools에서 다른 탭이 열려 있다면 **Settings** 탭을 엽니다.

1.**Discover USB devices** 가 활성화되어 있는지 확인합니다.

     ![USB 기기 활성화 확인][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Android 기기는 USB
케이블로 개발용 컴퓨터에 직접 연결합니다. 중간 USB 허브를 사용하지 마세요. Android 기기를
이 개발용 컴퓨터에 처음 연결할 경우
기기가 **Unknown** 아래에 **Pending Authorization** 텍스트와 함께
표시됩니다.

       ![알 수 없는 기기, 승인 대기 중][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 기기가 **Unknown**으로 표시되면 Android 기기에서 **Allow USB
Debugging** 권한 프롬프트를 수락합니다. **Unknown**은
Android 기기의 모델명으로 교체됩니다. 녹색 원과
**Connected** 텍스트가 나타나면 개발용 컴퓨터에서 Android 기기를 원격 디버깅할 준비가
완료되었다는 뜻입니다.

참고: 확인 단계에서 문제가 발생하면
Android 기기에서 **Settings** > **Developer Options** >
**Revoke USB Debugging Authorizations**를 선택하여 다시 시작합니다.

## 2단계: 개발용 컴퓨터에서 Android 기기의 콘텐츠 디버깅 {: #debug }

1. 아직 Android 기기에 Chrome이 열려 있지 않으면 지금 엽니다.

1. DevTools로 돌아와서 기기 모델명과 같은
탭을 클릭합니다. 이 페이지 위에 Android 기기 모델명이 보이고,
그 뒤에 일련번호가 있을 것입니다. 그 아래에는
기기에서 실행 중인 Chrome 버전이 있고
버전 번호가 괄호에 들어 있을 것입니다. 각각의 Chrome 탭에 섹션이 하나씩 할당됩니다. 이 섹션에서 해당 탭과
상호작용할 수 있습니다. WebView를 사용하는 앱이 있다면
해당 앱의 섹션도 보일 것입니다. 아래의 스크린샷에는
탭이나 WebViews가 열려 있지 않습니다.

       ![연결된 원격 기기][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. **New tab** 옆에 URL을 입력하고 **Open**을 클릭합니다. Android 기기의 새 탭에
페이지가 열립니다.

1. 조금 전에 연 URL 옆의 **Inspect**를 클릭합니다. 새 DevTools
인스턴스가 열립니다. Android 기기의 Chrome 버전에 따라
 개발용 컴퓨터에서 열리는 DevTools 버전이 결정됩니다.
   Android 기기에 매우 오래된 버전의 Chrome이 실행되고 있다면
DevTools 인스턴스가 익숙한 스타일과 매우 다를 수 있습니다.

### 추가 작업: 새로고침, 포커스 또는 탭 닫기 {: #more-actions }

새로고침, 포커스 또는 닫을 탭 옆에 있는 **More Options**![More Options][more]{:.devtools-inline} 탭을
클릭합니다.

[more]: /web/tools/chrome-devtools/images/three-dot.png

![탭 새로고침, 포커스 또는 닫기](imgs/reload.png)

### 요소 검사 {: #inspect }

DevTools 인스턴스의 **Elements** 패널로 이동하여
요소 위로 마우스를 가져가고 Android 기기의 뷰포트를 강조표시합니다.

Android 기기 화면에서 요소를 눌러서
**Elements** 패널에서 선택할 수 있습니다. DevTools 인스턴스에서 **Select Element**![Select
Element][select]{:.devtools-inline}를 선택한 다음
Android 기기 화면의 요소를 누릅니다. **Select Element**는
첫 번째 터치 이후 비활성화되므로 이 기능을 사용할 때마다
다시 활성화해야 합니다.

[select]: imgs/select-element.png

### Android 기기에서 개발용 컴퓨터로 스크린캐스트 {: #screencast }

**Toggle Screencast**![Toggle Screencast][screencast]{:.devtools-inline}
를 클릭하여 DevTools 인스턴스에서 Android 기기의 콘텐츠를 표시합니다.

[screencast]: imgs/toggle-screencast.png

다음과 같은 다양한 방법으로 스크린캐스트와 상호작용할 수 있습니다.

* 클릭은 탭으로 변환되어 기기에 적절한 터치 이벤트를 발생시킵니다. 
* 컴퓨터의 키 입력은 기기로 전송됩니다. 
* 손가락 모으기 동작을 시뮬레이션하려면 <kbd>Shift</kbd> 키를 누른 상태로 드래그합니다. 
* 스크롤하려면 트랙패드 또는 마우스 휠을 사용하거나 마우스
  포인터로 이동합니다.

스크린캐스트 참고 사항:

* 스크린캐스트는 페이지 콘텐츠만 표시합니다. 스크린캐스트의 투명한 부분은 
Chrome 검색 주소창, Android 상태 
표시줄 또는 Android 키보드 등과 같은 기기 인터페이스를 나타냅니다.
* 스크린캐스트는 프레임 속도에 부정적인 영향을 미칩니다. 페이지 성능을 더욱 정확히 알아내려면
스크롤이나 애니메이션을 측정할 때는
스크린캐스트를 비활성화하세요.
* Android 기기 화면이 잠기면 스크린캐스트의 콘텐츠가
사라집니다. Android 화면의 잠금을 해제하면 스크린캐스트가
자동으로 다시 시작됩니다.

## 피드백 {: #feedback }

이 가이드를 개선하는 데 도움을 주고 싶다면
아래 질문에 답해주세요!

{% framebox width="auto" height="auto" %}
<p>가이드를 성공적으로 완료했나요?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">예</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">아니요</button>
<p>이 가이드에 찾던 정보가 포함되어 있나요?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">예</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">아니요</button>
{% endframebox %}


{# wf_devsite_translation #}
