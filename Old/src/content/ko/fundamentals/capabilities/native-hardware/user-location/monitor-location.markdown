---
title: "사용자 위치 모니터링"
description: "사용자의 동의가 있는 경우 Geolocation API를 사용하여 사용자의 위치를 확인하고 사용자의 이동을 계속 추적할 수 있습니다."
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 이 API를 사용하기 전에 호환성 여부를 검사합니다.
    - 배터리를 절약하려면 사용자 위치 확인 기능 사용을 최소화합니다.
    - 오류를 항상 처리합니다.
---

<p class="intro">
  "사용자의 동의가 있는 경우 Geolocation API를 사용하여 사용자의 위치를 확인하고 사용자의 이동을 계속 추적할 수 있습니다.
</p>

{% include shared/toc.liquid %}

이 API는 장치에 구속되지 않으므로 클라이언트가 표준 방식으로
위치 데이터를 요청하고 받을 수 있는 한, 브라우저가 위치를 확인하는
방법은 상관없습니다. 기본 메커니즘은 GPS, 와이파이를 사용하는 것입니다. 이러한 조회 작업은
모두 약간의 시간이 소요되고 이 API는 비동기식이므로 위치를 요청할 때마다
콜백 메서드를 API에 전달해야 합니다.

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Geolocation을 사용하여 사용자 위치를 확인하는 경우

* 사용자 위치에 대한 더욱 정밀한 추적을 원하는 경우
* 애플리케이션이 새 위치 정보를 기준으로 사용자 인터페이스를 업데이트해야 
 하는 경우
* 애플리케이션이 특정 정의된 영역으로 사용자가 들어갈 때 비즈니스 논리를
 업데이트해야 하는 경우

## 사용자 위치 확인하기

사용자의 동의가 있는 경우 Geolocation API를 사용하여 `getCurrentPosition()`을 한 번 호출하여
사용자 위치를 확인할 수 있습니다.  

사용자 위치를 지속적으로 모니터링하려는 경우 Geolocation API의
`watchPosition()` 메서드를 사용할 수 있습니다. 이 메서드는 `getCurrentPosition()`과
유사하게 작동하지만 다음과 같은 경우
여러 번 실행됩니다.

1.  위치 지정 소프트웨어가 사용자에 대한 더욱 정밀한 추적 정보를 확보하는 경우
2.  사용자 위치가 변하는 경우
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## 항상 해제된 상태를 유지하여 배터리 보존하기

지리 정보에 대한 변경 사항을 확인하는 것은 무료가 아닙니다.  운영
체제가 지리 하위 시스템에 애플리케이션을 연결하도록 지원하는
플랫폼 기능을 도입할 때 웹 개발자는 사용자 위치 모니터링과
관련하여 사용자 장치가 어떠한 기능을 지원하는지 전혀 알지 못하며, 위치를
확인하는 동안 수많은 추가 작업을 처리하도록 사용자 장치에 요청합니다.

사용자 위치를 추적할 필요가 없으면 `clearWatch`를 호출하여 지리
정보 시스템을 끄십시오.

## 오류를 항상 처리하기

안타깝게도 모든 위치 조회가 성공하는 것은 아닙니다. 아마도 GPS가
없거나 사용자가 갑자기 위치 조회 기능을 비활성화한 것이 원인일 수 있습니다. 오류가 발생하면
getCurrentPosition()의 두 번째 인수(선택 항목)가 호출되므로
콜백 내에서 사용자에게 이를 알릴 수 있습니다.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


