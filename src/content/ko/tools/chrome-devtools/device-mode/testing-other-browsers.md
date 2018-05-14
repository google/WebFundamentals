project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 사이트가 Chrome과 Android에서 모두 잘 실행되는 것을 확인했다고 할 일이 끝난 것은 아닙니다. Device Mode로 iPhone과 같은 여러 다른 기기를 시뮬레이션할 수 있지만, 그래도 다른 브라우저 솔루션에서 에뮬레이션을 확인해보는 것이 좋습니다.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2015-04-13 #}

# 다른 브라우저 에뮬레이트 및 테스트 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

사이트가 Chrome과 Android에서 모두 잘 실행되는 것을 확인했다고 할 일이 끝난 것은 아닙니다. Device Mode로 iPhone과 같은 여러 다른 기기를 시뮬레이션할 수 있지만, 그래도 다른 브라우저 솔루션에서 에뮬레이션을 확인해보는 것이 좋습니다.


### TL;DR {: .hide-from-toc }
- 특정한 기기를 염두에 둔 것이 아니거나 부분 점검할 항목이 있는 경우, 최선의 선택지는 해당 기기를 브라우저 자체 내에서 에뮬레이트하는 것입니다.
- 기기 에뮬레이터와 시뮬레이터를 사용하면 자신의 워크스테이션을 사용하여 광범위한 기기에서 개발 사이트를 흉내 낼 수 있습니다.
- 클라우드 기반 에뮬레이터를 사용하면 다양한 플랫폼에서 사이트의 단위 테스트를 자동화할 수 있습니다.


## 브라우저 에뮬레이터

브라우저 에뮬레이터는 사이트 응답성을 테스트하기엔 좋지만 
모바일 브라우저에 표시되는 
API, CSS 지원 및 특정 동작의 차이를 에뮬레이트할 수 없습니다. 사이트를 실제 기기에서 실행되는 브라우저에서 테스트해야 모두 예상한 대로
작동하는지 확신할 수 있습니다.

### Firefox의 응답형 디자인 뷰

Firefox에는 [응답형 디자인 뷰](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
가 있어 특정 기기 관점에서 생각하던 것을 멈추고 대신
가장자리를 드래그하여 디자인이 일반 화면 크기나 개발자가
설정한 크기에서 어떻게 변하는지 살펴볼 수 있습니다.

### Edge의 F12 에뮬레이션

Windows Phone을 에뮬레이트하려면 Microsoft Edge의 [기본 제공 에뮬레이션](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/) 도구를 사용합니다.

Edge는 레거시 호환 기능이 탑재되지 않았으므로, 이전 버전의 Internet Explorer에서 페이지가 어떤 모습일지 시뮬레이션하려면 [IE 11의 에뮬레이션](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx)을 사용해야 합니다.

## 기기 에뮬레이터 및 시뮬레이터

기기 시뮬레이터와 에뮬레이터는 브라우저 환경만이 아니라 전체 기기를 시뮬레이션합니다. 이들은 OS 통합이 필요한 요소를 테스트하는 데 유용합니다(예를 들어 가상 키보드로 양식 입력).

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser">
  <figcaption>Android Emulator의 Stock Browser</figcaption>
</figure>

지금으로서는 Android Emulator에 Chrome을 설치할 방도가 없습니다. 다만 Android 브라우저, Chromium Content Shell 및 Firefox for Android를 사용할 수 있습니다. 이에 대한 내용은 이 가이드의 뒷부분에서 다룹니다. Chromium Content Shell은 동일한 Chrome 렌더링 엔진을 사용하지만 브라우저별 기능은 전혀 제공되지 않습니다.

Android Emulator는 Android SDK와 함께 제공되며 <a href="http://developer.android.com/sdk/installing/studio.html">여기에서
다운로드</a>할 수 있습니다. 그런 다음 지침에 따라 <a href="http://developer.android.com/tools/devices/managing-avds.html">가상 기기를 설치하고 </a> <a href="http://developer.android.com/tools/devices/emulator.html">에뮬레이터를 시작합니다</a>.

에뮬레이터가 부팅되면 브라우저 아이콘을 클릭합니다. 그러면 구버전의 Android용 Stock Browser에서 사이트를 테스트할 수 있습니다.

#### Android에서 Chromium Content Shell 사용

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell">
  <figcaption>Android Emulator Content Shell</figcaption>
</figure>

Android용 Chromium Content Shell을 설치하려면 에뮬레이터를 실행 중인 상태로 두고
명령 프롬프트 메시지가 나타나면 다음과 같은 명령을 실행합니다.

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

이제 Chromium Content Shell로 사이트를 테스트할 수 있습니다.


#### Android에서 Firefox 사용

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Android Emulator의 Firefox 아이콘">
  <figcaption>Android Emulator의 Firefox 아이콘</figcaption>
</figure>

Chromium의 Content Shell과 마찬가지로, 에뮬레이터에 Firefox를 설치하기 위한 APK를 가져올 수도 있습니다.

<a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a>에서 오른쪽 .apk 파일을 다운로드합니다.

여기에서 다음 명령을 사용하여 열려 있는 에뮬레이터 또는 연결된 Android 기기에 파일을 설치할 수 있습니다.

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### iOS 시뮬레이터

Mac OS X용 iOS 시뮬레이터는 Xcode가 함께 제공되며,
[App Store에서 설치](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)할 수 있습니다.

설치를 마친 후에 [Apple 관련 문서](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html)를 통해 시뮬레이터를 사용하는 방법을 알아봅니다.

참고: iOS 시뮬레이터를 사용할 때마다 매번 Xcode를 열어야 하는 불편을 피하려면 먼저 Xcode를 연 다음 도크의 iOS 시뮬레이터 아이콘을 마우스 오른쪽 버튼으로 클릭하고 `Keep in Dock`을 선택하면 됩니다. 이제 필요할 때마다 언제든 이 아이콘을 클릭하기만 하면 됩니다.

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="Modern IE VM">
  <figcaption>Modern IE VM</figcaption>
</figure>

Modern.IE 가상 머신을 사용하면 VirtualBox(또는 VMWare)를 통해 사용자의 컴퓨터에서 여러 가지 버전의 IE에 액세스할 수 있습니다. <a href="https://modern.ie/en-us/virtualization-tools#downloads">여기의 다운로드 페이지</a>에서 가상 머신을 선택하세요.


## 클라우드 기반 에뮬레이터 및 시뮬레이터

에뮬레이터를 사용할 수 없고 실제 기기도 이용할 수 없는 경우라면, 차선책으로 클라우드 기반 에뮬레이터를 사용하면 됩니다. 클라우드 기반 에뮬레이터를 실제 기기와 로컬 에뮬레이터와 비교할 경우 가장 큰 장점은 다양한 플랫폼에 걸쳐 사이트의 단위 테스트를 자동화할 수 있다는 점입니다.

* [BrowserStack(상용)](https://www.browserstack.com/automate)은 수동 테스트에 사용되는 가장 간편한 방법입니다. 운영체제를 선택하고 브라우저 버전과 기기 유형을 선택한 다음, 탐색할 URL을 선택하면 사용자와 상호작용할 수 있는 호스팅된 가상 머신이 나타납니다. 또한 같은 화면에서 여러 에뮬레이터를 실행할 수 있으므로 동시에 여러 기기에서 앱의 디자인을 테스트할 수 있습니다.
* [SauceLabs(상용)](https://saucelabs.com/){: .external }를 사용하면 에뮬레이터 내부에서 단위 테스트를 실행할 수 있고, 사이트의 흐름을 스크립팅하는 데 무척 유용합니다. 또한 나중에 이 과정을 녹화한 동영상을 다양한 기기에서 볼 수도 있습니다. 사이트에서 수동 테스트를 진행할 수도 있습니다.
* [Device Anywhere(상용)](http://www.keynote.com/solutions/testing/mobile-testing)는 
에뮬레이터가 아니라 사용자가 원격으로 제어할 수 있는 실제 기기를 사용합니다. 특정 기기에서 문제를 재현해야 하며, 이전 가이드에 소개된 여러 선택지 중 어느 것을 통해서도 버그를 확인할 수 없는 경우 매우 유용합니다.





{# wf_devsite_translation #}
