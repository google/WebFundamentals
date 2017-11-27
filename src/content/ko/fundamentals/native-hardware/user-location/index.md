project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 대부분의 브라우저와 기기는 사용자의 지리적 위치 정보에 액세스할 수 있습니다. 사이트 및 앱에서 사용자의 위치를 활용하는 방법을 살펴봅니다.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2014-01-01 #}

# 사용자 위치 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Geolocation API를 사용하면 사용자의 동의하에 사용자 위치를 확인할 수 있습니다. 이 기능으로 사용자를 목적지까지 안내하고 사용자 생성 콘텐츠에 위치 태그(예: 사용자가 사진을 촬영한 위치 표시)를 지정할 수 있습니다.

사용자의 동의가 있는 경우 Geolocation API를 사용하여 사용자의 위치를 확인하고 사용자의 이동을 계속 추적할 수 있습니다(페이지가 열려 있는 동안만).
 이 기능을 이용해서 여러 가지
사용 사례를 만들 수 있습니다. 예를 들어 백엔드 시스템과 통합해서 사용자가 근처에 있을 때 컬렉션 주문을 준비합니다.

Geolocation API를 사용할 때는 유의할 점이 많습니다. 이 가이드는 일반적인 사용 사례와 솔루션을 안내합니다.

참고: Chrome 50부터 [Geolocation API는 보안 컨텍스트(HTTPS)에서만 작동합니다](/web/updates/2016/04/geolocation-on-secure-contexts-only). 사이트가 비보안 출처(예: `HTTP`)에서 호스팅되는 경우 사용자 위치 요청은 작동하지 **않습니다**.

### TL;DR {: .hide-from-toc }

* 사용자에게 도움이 될 때 위치정보를 사용합니다.
* 사용자 동작에 대한 명확한 반응으로 권한을 요청합니다. 
* 사용자 브라우저가 위치정보를 지원하지 않으면 기능 탐지를 사용합니다.
* 위치정보를 구현하는 방법뿐만 아니라 위치정보를 가장 적절히 사용하는 방법까지 배웁니다.
* 사이트에서 위치정보를 테스트합니다.

## 위치정보를 사용하는 경우

*  사용자에게 가장 가까운 특정 물리적 위치를 찾아
맞춤화된 사용자 환경을 제공하려는 경우
*  사용자 위치 관련 정보(예: 뉴스)를 제공하려는 경우
*  사용자 위치를 지도에 표시하려는 경우
*  사용자 위치를 사용하여 애플리케이션에서 생성된 데이터에 태그를 지정하려는 경우
   (예: 사진에 위치 태그 지정)

## 책임감 있게 권한 요청

최근 사용자 연구에
따르면 사용자는 페이지 로드 시 위치 정보를 요청하는 메시지를 표시하는 사이트를
신뢰하지 않는 것으로 [밝혀졌습니다](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf). 그렇다면 어떻게 하는 것이 가장 좋을까요?

### 사용자가 본인의 위치를 제공하지 않을 것임을 가정하기

대부분의 사용자가 본인의 위치를 제공하기를
원치 않을 것이므로 개발자는 방어적인 개발 스타일을 채택해야 합니다.

1.  이러한 상황에 맞게 사이트를 조정할 수 있도록, Geolocation API에서
    발생하는 모든 오류를 처리합니다.
2.  위치 정보가 필요한 이유를 명확하게 설명합니다.
3.  필요한 경우 대체 솔루션을 사용합니다.

### 지리적 위치 정보가 필요한 경우 폴백 사용하기

사이트 또는 애플리케이션에서 사용자의 현재 위치에 대한
액세스 권한을 요청하지 않는 것이 좋습니다. 그러나 사이트 또는 애플리케이션에
사용자의 현재 위치가 필요하다면
현재 위치를 가장 가깝게 추정할 수 있는 타사 솔루션이 있습니다.

이러한 솔루션은 흔히 사용자의 IP 주소를 확인하고 이 주소를 RIPE 데이터베이스에
등록되어 있는 물리적 주소에 매핑하는 방식으로 작동합니다. 이런 위치는
매우 정확하지 않은 경우가 많고, 주로 사용자에게 가장 가까운
전기통신 허브나 이동전화 기지국 위치를 제공합니다. 대부분의
경우 이 정보는 그렇게 정확하지 않을 수 있습니다. 특히 사용자가 VPN이나
일부 프록시 서비스를 이용하는 경우 정확도가 낮을 수 있습니다.

### 사용자 동작 시 위치에 대한 액세스를 항상 요청하기

사용자의 위치를 요청하는 이유와 위치 정보 제공 시 사용자가 얻게 되는 이점을
사용자에게 확실히 이해시켜야 합니다. 사이트가 로드되자마자 홈 페이지에서 사용자 위치
정보를 요청하면 사용자는 거부감을 갖게 됩니다.

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자 동작 시 위치에 대한 액세스를 항상 요청합니다.
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>금지</b>: 사이트가 로드되자마자 홈 페이지에서 사용자 위치 정보를 요청하면 사용자는 거부감을 갖게 됩니다.
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

대신 작업을 수행하는 데 사용자 위치에 대한 액세스가 필요함을 사용자에게 알리는 설명 또는
명확한 콜투액션을 제공해야 합니다. 그러면 사용자는 액세스를 요청하는 시스템 메시지와 방금 시작된 동작을 더욱 손쉽게
연관시킬 수 있습니다.

### 동작을 수행하는 데 사용자 위치가 필요함을 알리는 명확한 설명 제공하기

[Google 광고 팀의 연구](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)에서는,
곧 있을 회의에 참여하기 위해 보스톤 지역의 호텔 객실을 예약하도록 요청받은 사용자가 특정 호텔 사이트의 홈 페이지에서 '찾기 및 예약하기' 콜투액션을 누르면
즉시 사용자의 GPS 위치 공유 요청 메시지가 표시되었습니다.


보스톤 지역의 객실을 예약해야 하는데 샌프란시스코의
호텔을 표시한 이유를 이해하기 어려워 사용자가 불만을
표시한 경우도 있었습니다.

사용자의 위치 정보를 요청하는 이유를 사용자에게 더 확실히 이해시키면
사용자의 거부감은 줄어듭니다. 거리계와 같은 장치 전체에서
일반적으로 사용되는 잘 알려진 기표(signifier)나 “나에게 가까운 위치 찾기”와 같은
명확한 콜투액션을 추가합니다.

<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      거리계 사용
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      나에게 가까운 위치를 찾기 위한 특정 콜투액션
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 사용자의 위치에 대한 사용 권한을 제공하도록 유도하기

개발자는 사용자가 하는 일에 액세스할 권한은 없습니다. 개발자는 사용자가
위치에 대한 액세스를 허용하지 않은 경우는 확실히 파악할 수 있지만
사용자가 액세스를 부여할 때는 알지 못합니다. 결과가 표시될 때만 액세스가 부여되었음을 파악할 수 있습니다.


동작 완료가 필요한 경우 사용자의 동작을 '유도'하는 것이 좋습니다.


권장 사항: 

1.  짧은 시간 후에 트리거되는 타이머를 설정합니다.
5초가 권장 값입니다.
2.  오류가 발생하면 사용자에게 오류 메시지를 표시합니다.
3.  긍정적인 응답을 얻은 경우 타이머를 해제하고 결과를 처리합니다.
4.  시간이 초과된 후에 긍정적인 응답을 얻지 못한 경우,
사용자에게 알림 메시지를 표시합니다.
5.  그 후에 응답을 얻었는데 알림이 계속 표시된다면, 화면에서 알림을 제거합니다.


<div style="clear:both;"></div>

    button.onclick = function() {
      var startPos;
      var element = document.getElementById("nudge");

      var showNudgeBanner = function() {
        nudge.style.display = "block";
      };

      var hideNudgeBanner = function() {
        nudge.style.display = "none";
      };

      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

      var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId); 

        // Do magic with location
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };

## 브라우저 지원

현재 대부분 브라우저가 Geolocation API를 지원하지만
무언가 하기 전에 항상 지원 여부를 확인하는 것이 좋습니다.

위치정보 객체의 존재 여부를 테스트하여 호환성을 쉽게 확인할
수 있습니다.

    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }


## 사용자의 현재 위치 확인

Geolocation API는 사용자 위치를 확인하는 간단한 '원샷'
메서드인 `getCurrentPosition()`을 제공합니다. 이 메서드에 대한 호출은 사용자의
현재 위치를 비동기식으로 보고합니다.

    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };


이 도메인에서 애플리케이션이 처음으로 사용 권한을 요청한
경우, 브라우저가 일반적으로 사용자 동의를 확인합니다. 브라우저에
따라 사용 권한 조회를 항상 허용하거나 &mdash;허용하지 않는&mdash; 기본 설정도 있을 수 있습니다. 이 경우 확인 프로세스가 생략됩니다.

브라우저에서 사용하는 위치 기기에 따라 위치 객체에는 실제로 경위도뿐만
아니라 이외의 많은 정보가 포함될 수 있습니다. 예를 들어, 고도나 방향이 포함될 수 있습니다.
 위치 시스템이 실제로 데이터를
반환할 때까지 이 시스템에서 어떠한 추가 정보를 사용하는지는 알 수 없습니다.


## 사용자 위치 모니터링

사용자의 동의가 있는 경우 Geolocation API를 사용하여 `getCurrentPosition()`을 한 번 호출하여
사용자 위치를 확인할 수 있습니다.  

사용자 위치를 연속적으로 모니터링하려면 Geolocation
API 메서드 `watchPosition()`을 사용합니다. 이 메서드는 `getCurrentPosition()`과
유사하게 작동하지만 다음과 같은 경우
여러 번 실행됩니다.

1.  위치 지정 소프트웨어가 사용자에 대한 더욱 정밀한 추적 정보를 확보하는 경우
2.  사용자 위치가 변하는 것을 확인하는 경우
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### 위치정보를 사용하여 사용자 위치를 확인하는 경우

*  사용자 위치에 대한 더욱 정밀한 추적을 원하는 경우
*  애플리케이션이 새 위치 정보를 기준으로 사용자 인터페이스를 업데이트해야
하는 경우
*  특정 정의된 영역으로 사용자가 들어갈 때 애플리케이션이 비즈니스 논리를
업데이트해야 하는 경우


## 위치정보 사용 모범 사례

### 항상 해제된 상태를 유지하여 배터리 보존하기

위치정보에 대한 변경 사항을 확인하는 것은 무료가 아닙니다. 운영
체제가 지리 하위 시스템에 애플리케이션을 연결하도록 지원하는
플랫폼 기능을 도입할 때, 웹 개발자는 사용자 위치 모니터링과
관련하여 사용자 기기가 어떠한 기능을 지원하는지 전혀 알지 못하며, 위치를
확인하는 동안 수많은 추가 작업을 처리하도록 사용자 기기에 요청합니다.

사용자 위치를 추적할 필요가 없으면 `clearWatch`를 호출하여
위치정보 시스템을 끄세요.

###  오류를 적절히 처리

안타깝게도 모든 위치 조회가 성공하는 것은 아닙니다. 아마도 GPS가
없거나 사용자가 갑자기 위치 조회 기능을 비활성화한 것이 원인일 수 있습니다. 오류가 발생하면`getCurrentPosition()`의 두 번째 인수(선택 항목)가 호출되므로
콜백 내에서 사용자에게 이를 알릴 수 있습니다.

    window.onload = function() {
      var startPos;
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
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };


### 위치정보 하드웨어를 시작할 필요성 축소

대부분 사용 사례에서 사용자의 최신 위치를 사용할 필요가 없고, 대략적인 추정치만 필요합니다.


`maximumAge` 속성(선택 항목)을 사용하면 최근에 가져온 위치정보
결과를 사용하도록 브라우저에 지시할 수 있습니다. 이 속성은 사용자가 이전에 데이터를 요청했는지
여부를 신속하게 반환할 뿐만 아니라 브라우저가 더 이상 와이파이 삼각
측량 또는 GPS와 같은 위치정보 하드웨어 인터페이스를 시작할 필요가 없도록 합니다.

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


### 사용자가 기다리지 않도록 제한 시간 설정

제한 시간을 설정하지 않으면 현재 위치 요청이 데이터를 반환하지 않을 수 있습니다.


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


### 세부 위치보다 대략적인 위치 선호

사용자에게 가장 가까운 상점을 찾으려는 경우, 1미터의
정밀도가 필요한 경우는 없을 것입니다. 이 API는 최대한 빨리 반환되는
대략적인 위치를 제공하도록 설계되었습니다.

매우 정확한 위치가 필요하다면
`enableHighAccuracy` 옵션으로 기본 설정을 재정의할 수 있습니다. 되도록 이 옵션은 사용하지 마세요.
분석에 시간이 더 걸리고 배터리도 많이 소모합니다.

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


## Chrome DevTools로 위치정보 에뮬레이트 {: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

위치정보를 설정하면 다음과 같은 작업을 수행할 수 있습니다.

* 다양한 위치정보에서 앱이 동작하는 방식 테스트
* 위치정보가 제공되지 않을 경우 앱이 정상적으로 성능이 저하되는지 확인

Chrome DevTools에서 이 두 가지를 모두 수행할 수 있습니다.

[Chrome DevTools를 열고](/web/tools/chrome-devtools/#open)
[Console Drawer를 엽니다](/web/tools/chrome-devtools/console/#open_as_drawer).

[Console Drawer 메뉴를 열고](/web/tools/chrome-devtools/settings#drawer-tabs)
**Sensors** 옵션을 클릭하여 Sensors Drawer를 표시합니다.

여기서 위치를 사전 설정된 주요 도시로 재정의하거나,
사용자설정 위치를 입력하거나,
재정의를 **Location unavailable**로 설정하여 위치정보를 비활성화할 수 있습니다.


{# wf_devsite_translation #}
