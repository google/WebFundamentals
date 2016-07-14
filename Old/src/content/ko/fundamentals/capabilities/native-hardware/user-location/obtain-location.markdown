---
title: "사용자의 현재 위치 가져오기"
description: "사용자의 동의가 있는 경우 Geolocation API를 사용하여 사용자의 위치를 파악할 수 있습니다."
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 이 API를 사용하기 전에 호환성 여부를 검사합니다.
    - 세부 위치보다 대략적인 위치를 선호합니다.
    - 오류를 항상 처리합니다.
    - 사용자 배터리를 절약하도록 데이터를 너무 자주 폴링하지 않습니다.
---

<p class="intro">
  사용자의 동의가 있는 경우 Geolocation API를 사용하여 사용자의 위치를 파악할 수 있습니다. 이 기능은 목적지 길 안내 등의 용도로 사용자 쿼리에 포함하여 사용할 수 있습니다. 사용자가 생성한 콘텐츠의 '지리적 위치 태그 지정'(예:사진 촬영 위치 표시)에도 사용할 수 있습니다.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

이 API는 장치에 구속되지 않으므로 클라이언트가 표준 방식으로
위치 데이터를 요청하고 받을 수 있는 한, 브라우저가 위치를 확인하는
방법은 상관없습니다. 기본 메커니즘은 GPS, 와이파이를 사용하거나
 사용자에게 직접 위치를 입력하도록 요청하는 것입니다. 이러한 조회 작업은
모두 약간의 시간이 소요되고 이 API는 비동기식이므로 위치를 요청할 때마다
콜백 메서드를 API에 전달해야 합니다.

## Geolocation을 사용하는 경우

* 사용자에게 가장 가까운 특정 물리적 위치를 찾아 
   맞춤화된 사용자 환경을 제공하려는 경우
* 사용자 위치 관련 정보(예: 뉴스)를 제공하려는 경우
* 사용자 위치를 지도에 표시하려는 경우
* 사용자 위치를 사용하여 애플리케이션에서 생성된 데이터에 태그를 지정하려는 경우 
   (예, 사진에 지리적 위치 태그 지정)


## 호환성 확인하기

대부분의 브라우저에서 Geolocation API를 지원하지만, 작업을
수행하기 전에 항상 지원 여부를 확인하는 것이 좋습니다.

지리 정보 개체의 존재 여부를 테스트하여 호환성을 쉽게 확인할
수 있습니다.

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## 사용자의 현재 위치 확인하기

Geolocation API는 사용자 위치를 확인하는 간단한 '단일 쇼트(one-shot)'
메서드 `getCurrentPosition()`을 제공합니다.  이 메서드에 대한 호출은 사용자의
현재 위치를 비동기식으로 보고합니다.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

이 도메인에서 애플리케이션이 처음으로 사용 권한을 요청한
경우, 브라우저가 일반적으로 사용자 동의를 확인합니다. 브라우저에
따라 사용 권한 조회를 항상 허용 또는 허용하지 않는 기본 설정도
있을 수 있습니다. 이 경우 확인 프로세스가 생략됩니다.

브라우저에서 사용하는 위치 장치에 따라 위치 개체에는 실제로 경위도뿐만
아니라 이외의 많은 정보가 포함될 수 있습니다. 예를 들어, 고도나 방향이 포함될 수 있습니다.  위치 시스템이 실제로 데이터를 반환할 때까지 이 시스템에서 어떠한 추가 정보를 사용하는지는 알 수 없습니다.

## 사이트에서 Geolocation 테스트하기

애플리케이션에서 HTML5 geolocation 지원 기능을 사용하는 경우 
다양한 경위도 값을 사용할 때 얻은 출력을 디버깅하는 데 유용할 수
있습니다.

DevTools는 navigator.geolocation의 위치 값을 재정의하고 재정의 메뉴에서
사용할 수 없는 geolocation을 시뮬레이션하는 기능을 모두 지원합니다.

<img src="images/emulategeolocation.png">

1. DevTools에서 재정의 메뉴를 엽니다.
2. "Override Geolocation"을 선택한 후 Lat = 41.4949819 및 Lon = -0.1461206을 입력합니다.
3. 페이지를 새로 고칩니다. 그러면 이제 geolocation에 대해 재정의된 위치가 사용됩니다.

## 오류를 항상 처리하기

안타깝게도 모든 위치 조회가 성공하는 것은 아닙니다. 아마도 GPS가
없거나 사용자가 갑자기 위치 조회 기능을 비활성화한 것이 원인일 수 있습니다. 오류가 발생하면
`getCurrentPosition()`의 두 번째 인수(선택 항목)가 호출되므로
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
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## 지리 정보 하드웨어를 시작해야 할 필요성 줄이기

대부분의 활용 사례에서는 사용자의 최신 위치를 사용할 필요가 없으며,
대략적인 추정 위치만 필요합니다.

`maximumAge` 속성(선택 항목)을 사용하면 최근에 가져온 지리 정보
결과를 사용하도록 브라우저에 지시할 수 있습니다.  이 속성은 사용자가 이전에 데이터를 요청했는지
여부를 신속하게 반환할 뿐만 아니라 브라우저가 더 이상 와이파이 삼각
측량 또는 GPS와 같은 지리 정보 하드웨어 인터페이스를 시작할 필요가 없도록 합니다.

{% highlight javascript %}
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
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## 사용자가 기다리지 않도록 제한 시간 설정하기

제한 시간을 설정하지 않으면 현재 위치 요청이 데이터를 반환하지 않을 수 있습니다.

{% highlight javascript %}
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
{% endhighlight %}

## 세부 위치보다 대략적인 위치 선호하기

사용자에게 가장 가까운 상점을 찾으려는 경우 결과를 산출하는 데 1미터의
정밀도가 필요한 경우는 없을 것입니다.  이 API는 최대한 빨리 반환되는 
대략적인 위치를 제공하도록 설계되었습니다.

높은 정밀도가 필요한 경우 `enableHighAccuracy` 옵션을 사용하여 기본
설정을 재정의할 수 있습니다.  이 옵션은 가급적 사용하지 마십시오.
이 옵션을 사용하면 처리하는 데 시간이 오래 걸리고 더 많은 배터리를 소모하게 됩니다.

{% highlight javascript %}
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
{% endhighlight %}


