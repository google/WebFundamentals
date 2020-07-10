project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Windows, Mac 또는 Linux 컴퓨터에서 Android 기기의 라이브 콘텐츠를 원격으로 디버그합니다.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

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

<figure>
  <img src="imgs/remote-debugging.png"
       alt="원격 디버깅을 이용하면 Android 기기에서 실행 중인 페이지를
            개발용 컴퓨터에서 검사할 수 있습니다."/>
  <figcaption>
    <b>그림 1</b>. 원격 디버깅을 이용하면 Android 기기에서 실행 중인 페이지를
    개발용 컴퓨터에서 검사할 수 있습니다.
  </figcaption>
</figure>

## 1단계: Android 기기 찾기 {: #discover }

아래 워크플로는 대부분의 사용자에게 해당됩니다. [문제해결: DevTools가
Android 기기를 검색하지 못합니다](#troubleshooting)를 참조하여 추가적인 도움을 받을 수 있습니다.

1. Android에서 **개발자 옵션** 화면을 엽니다. [온디바이스 개발자 옵션
   구성](https://developer.android.com/studio/debug/dev-options.html)을 참조하세요{:.external}.
1. **Enable USB Debugging**을 선택합니다.
1. 개발용 컴퓨터에서 Chrome을 엽니다.
1. [DevTools를 엽니다](/web/tools/chrome-devtools/#open).
1. DevTools에서 **Main Menu** ![메인 메뉴][main]를 클릭하고{:.devtools-inline} 
   **More tools** > **Remote devices**를 선택합니다. 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="Main Menu를 통해 Remote Devices 탭 열기."/>
       <figcaption>
         <b>그림 2</b>. <b>Main Menu</b>를 통해 <b>Remote Devices</b> 탭 열기.
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. DevTools에서 **Settings** 탭을 엽니다.

1. **Discover USB devices** 확인란이 활성화되었는지 확인합니다.

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="Discover USB Devices 확인란이
           활성화되었습니다."/>
       <figcaption>
         <b>그림 3</b>. <b>Discover USB Devices</b> 확인란이 활성화되었습니다.
       </figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Android 기기를 USB
  케이블로 개발용 컴퓨터에 직접 연결합니다. 처음으로 연결할 때, 보통 DevTools가 알 수 없는
 기기를 검색한 것을 볼 수 있습니다. Android 기기의
   모델명 아래에 초록색 점과 **Connected**라는 텍스트가 보이면 DevTools가 성공적으로
   기기와의 연결을 구축한 것입니다. [2단계](#debug)로 계속.

     <figure>
       <img src="imgs/unknown-device.png" alt="Remote Devices 탭이 성공적으로 승인 대기 중인
           알 수 없는 기기를 검색했습니다."/>
       <figcaption>
         <b>그림 4</b>. <b>Remote Devices </b> 탭이 성공적으로 승인 대기 중인
         알 수 없는 기기를 검색했습니다.
         </figcaption>
     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. 기기가 **Unknown**으로 표시되면 Android 기기에서 **Allow USB
   Debugging** 권한 프롬프트를 수락합니다. 

### 문제해결: DevTools가 Android 기기를 검색하지 못합니다. {: #troubleshooting }

하드웨어가 올바르게 설정되었는지 확인합니다.

* USB 허브를 사용 중이라면 Android 기기를
 개발용 컴퓨터에 직접 연결해 봅니다.
* Android 기기와 개발용 컴퓨터를 연결하는 USB를 제거했다가
  다시 연결해 봅니다. 이때 Android 및 개발용 컴퓨터 화면의
  잠금이 해제되어 있어야 합니다.
* USB 케이블이 작동하는지 확인합니다. Android 기기의
  파일을 개발용 컴퓨터에서 검사할 수 있어야 합니다.

소프트웨어가 올바르게 설정되었는지 확인합니다.

* 개발용 컴퓨터가 Windows를 구동 중이라면 Android 기기용 USB 드라이버의
  수동 설치를 시도합니다. [OEM USB 드라이버 설치][drivers]를 참조하세요{:.external}.
* 일부 Windows와 Android 기기(특히 삼성)의 조합에는 별도의
  설정이 필요합니다. [Chrome DevTools가 연결된 기기를 검색하지 못합니다][SO]를 참조하세요{:.external}.

Android 기기에서 **Allow USB Debugging** 창이 나타나지 않는다면 다음을 시도해 보세요.

* DevTools이 개발용 컴퓨터에서 포커스 상태이고 Android 홈화면이 보일 때
  USB 케이블의 연결을 해제했다가 다시 연결합니다. 즉,
  Android나 개발용 컴퓨터 화면이
  잠겨 있으면 때때로 알림창이 나타나지 않을 수 있습니다.
* Android 기기 및 개발용
  컴퓨터의 표시 설정을 업데이트하여 절전 모드로 들어가지 않도록 합니다.
* Android의 USB 모드를 PTP로 설정합니다. [Galaxy S4에서 USB 디버깅 승인
  대화상자가 나타나지 않습니다](https://android.stackexchange.com/questions/101933){: .external }를 참조하세요.
* Android 기기 화면의 **개발자 옵션**에서 **Revoke USB Debugging Authorizations**를 선택하여
  새로운 상태로 재설정합니다.

이 섹션이나 [Chrome DevTools 기기가 기기를 연결했을 때
검색하지 못합니다][SO]{: .external}에서 언급되지 않은 해결책을 찾았다면Stack
Overflow 질문에 답을 추가하거나 [webfundamentals 저장소에 이슈를 시작][issue]하세요{:.external}!

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## 2단계: 개발용 컴퓨터에서 Android 기기의 콘텐츠 디버깅 {: #debug }

1. Android 기기에서 Chrome을 엽니다.
1. **원격 기기** 탭에서 Android 기기 모델명과 일치하는 탭을 클릭합니다.
   이 페이지 위에 Android 기기 모델명과
   일련번호가 표시됩니다. 그 아래에는 기기에서 실행 중인 Chrome 버전이 있고
   버전 번호가 괄호에 들어 있을 것입니다. 각각의 열려있는 Chrome 탭에 섹션이 하나씩 할당됩니다. 이 섹션에서 해당 탭과
   상호작용할 수 있습니다. WebView를 사용하는 앱이 있다면
   해당 앱의 섹션도 보일 것입니다. <b>그림 5</b> 열린 탭이나 WebViews 없음.

     <figure>
       <img src="imgs/connected-remote-device.png" alt="연결된 원격 기기."/>
       <figcaption>
         <b>그림 5</b>. 연결된 원격 기기.
       </figcaption>
     </figure>

1. **New tab** 텍스트 상자에 URL을 입력한 다음 **Open**을 클릭합니다. Android 기기의 새 탭에
   페이지가 열립니다.

1. 조금 전에 연 URL 옆의 **Inspect**를 클릭합니다. 새 DevTools
  인스턴스가 열립니다. Android 기기의 Chrome 버전에 따라
   개발용 컴퓨터에서 열리는 DevTools 버전이 결정됩니다.
   Android 기기에 매우 오래된 버전의 Chrome이 실행되고 있다면
   DevTools 인스턴스가 익숙한 스타일과 매우 다를 수 있습니다.

### 추가 작업: 새로고침, 포커스 또는 탭 닫기 {: #more-actions }

새로고침, 포커스, 닫기를 하고 싶은 탭의 옆에 있는 **More Options** ![더 많은 옵션][more]를{:.devtools-inline} 
클릭합니다.

[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="새로고침, 포커스, 탭 닫기 메뉴."/>
  <figcaption>
    <b>그림 6</b>. 새로고침, 포커스, 탭닫기 메뉴
  </figcaption>
</figure>

### 요소 검사 {: #inspect }

DevTools 인스턴스의 **Elements** 패널로 이동하여
요소 위로 마우스를 가져가고 Android 기기의 표시 영역을 강조표시합니다.

**Elements** 패널에서
Android 기기 화면의 요소를 탭할 수도 있습니다. DevTools 인스턴스에서 **Select Element** ![요소
선택][select]를{:.devtools-inline} 선택한 다음
Android 기기 화면의 요소를 탭합니다. **Select Element**는
첫 번째 터치 이후 비활성화되므로 이 기능을 사용할 때마다
다시 활성화해야 합니다.

[select]: imgs/select-element.png

### Android 화면을 개발용 컴퓨터에 스크린캐스트 {: #screencast }

**Toggle Screencast** ![스크린캐스트 전환][screencast]를 클릭하여{:.devtools-inline}
DevTools 인스턴스에서 Android 기기의 콘텐츠를 표시합니다.

[screencast]: imgs/toggle-screencast.png

다음과 같은 다양한 방법으로 스크린캐스트와 상호작용할 수 있습니다.

* 클릭은 탭으로 변환되어 기기에 적절한 터치 이벤트를 발생시킵니다. 
* 컴퓨터의 키 입력은 기기로 전송됩니다. 
* 손가락 모으기 동작을 시뮬레이션하려면 <kbd>Shift</kbd> 키를 누른 상태로 드래그합니다. 
* 스크롤하려면 트랙패드 또는 마우스 휠을 사용하거나 마우스
  포인터로 이동시킵니다.

스크린캐스트 참고 사항:

* 스크린캐스트는 페이지 콘텐츠만 표시합니다. 스크린캐스트의 투명한 부분은 
  Chrome 주소 표시줄, Android 상태 
  표시줄 또는 Android 키보드 등과 같은 기기 인터페이스를 나타냅니다.
* 스크린캐스트는 프레임 속도에 부정적인 영향을 미칩니다. 페이지 성능을 더욱 정확히 알아내려면
  스크롤이나 애니메이션을 측정할 때는
  스크린캐스트를 중지하세요.
* Android 기기 화면이 잠기면 스크린캐스트의 콘텐츠가
  사라집니다. Android 화면의 잠금을 해제하면 스크린캐스트가
  자동으로 다시 시작됩니다.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
