---
title: "위치 공유에 대한 사용자 동의 얻기"
description: ""
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 사용자가 본인의 위치를 제공하지 않을 것임을 가정합니다.
    - 사용자 위치에 액세스해야 하는 이유를 명확히 설명합니다.
    - 페이지가 로드하자마자 액세스 요청 메시지를 표시하지 않습니다.
comments:
  # 참고: 절 제목이나 URL이 변경되면 다음 약식 링크도 업데이트해야 합니다.
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  웹 개발자가 사용자의 위치에 대한 액세스 권한을 가지면 고급 필터링, 지도에 사용자 위치 표시, 현재 위치를 기반으로 사용자가 할 수 있는 것에 대한 적극적인 추천과 같은 굉장히 많은 작업을 할 수 있는 가능성이 열립니다.
</p>

사용자는 자신의 물리적 위치를 보호하고 신뢰할 수 있는 사람에게만
제공하길 원하는 정보로 간주합니다.  이 때문에
사이트에서 사용자의 위치를 요청할 때 브라우저가 메시지를 표시합니다.

{% include shared/toc.liquid %}

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">최근 사용자 연구</a>에 따르면
사용자는 페이지 로드 시 위치 정보를 요청하는 메시지를 표시하는 사이트를
신뢰하지 않습니다. 그렇다면 어떻게 하는 것이 가장 좋을까요?

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## 사용자가 본인의 위치를 제공하지 않을 것임을 가정하기

대부분의 사용자가 본인의 위치를 제공하기를
원치 않을 것이므로 개발자는 방어적인 개발 스타일을 채택해야 합니다.

1.  이러한 상황에 맞게 사이트를 조정할 수 있도록 Geolocation API에서
    발생하는 모든 오류를 처리합니다.
2.  위치 정보가 필요한 이유를 명확하게 설명합니다.
3.  필요한 경우 폴백 솔루션을 사용합니다.

## 지리적 위치 정보가 필요한 경우 폴백 사용하기

사이트 또는 애플리케이션에 사용자의 현재
위치에 대한 액세스가 필요하지 않도록 하는 것이 좋지만
애플리케이션 또는 사이트에 사용자의 현재 위치에 대한 액세스가 반드시
필요할 경우 사용자의 현재 위치를 추측할 수 있는 타사 솔루션을 사용할 수 있습니다.

이러한 솔루션은 흔히 사용자의 IP 주소를 확인하고 이 주소를 RIPE 데이터베이스에
등록되어 있는 물리적 주소에 매핑하는 방식으로 작동합니다.  일반적으로
사용자에게 가장 가까운 전자 통신 허브의 위치나 가장 가까운 휴대폰
기지국 위치가 제공되므로 이 위치는 정확도가 떨어질 수 있습니다.  대부분의
경우 이 정보는 그렇게 정확하지 않을 수 있습니다. 특히 사용자가 VPN이나
일부 프록시 서비스를 이용하는 경우 정확도가 낮을 수 있습니다.

## 사용자 제스처 시 위치에 대한 액세스 항상 요청하기

사용자의 위치를 요청하는 이유와 위치 정보 제공 시 사용자가 얻게 되는 이점을
사용자에게 확실히 이해시켜야 합니다.  사이트가 로드하자마자 홈 페이지에서 사용자 위치
정보를 요청하면 사용자는 거부감을 갖게 됩니다.

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>사이트가 로드하자마자 홈 페이지에서 사용자 위치 정보를 요청하면 사용자는 거부감을 갖게 됩니다.</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption>사용자 제스처 시 위치에 대한 액세스를 항상 요청합니다.</figcaption>
      </figure>
  </div>
</div>

대신 작업을 수행하는 데 사용자 위치에 대한 액세스가 필요함을 사용자에게 알리는 설명 또는 
명확한 동작 호출을 제공해야 합니다.  그러면 사용자는
액세스를 요청하는 시스템 메시지와 방금 시작된 동작을 더욱 손쉽게
연관시킬 수 있습니다.

## 동작을 수행하는 데 사용자 위치가 필요함을 알리는 명확한 설명 제공하기

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">Google Ads 팀의 연구</a>에서 곧 있을 회의에 참여하기 위해 보스톤 지역의 호텔 객실을 예약하도록 요청받은 사용자가 특정 호텔 사이트의 홈 페이지에서 '찾기 및 예약하기' 동작 호출을 누르면 즉시 사용자의 GPS 위치 공유 요청 메시지가 표시되었습니다.

보스톤 지역의 객실을 예약해야 하는데 샌프란시스코의
호텔을 표시할 이유를 이해할 수 없어 사용자가 불만을
표시한 경우도 있었습니다.

사용자의 위치 정보를 요청하는 이유를 사용자에게 더 확실히 이해시키면
사용자의 거부감은 줄어듭니다. 거리계와 같이 장치 전체에서
일반적으로 사용되는 잘 알려진 기표(signifier)를 추가합니다.

<img src="images/indication.png">

또는 "나에게 가까운 위치 찾기"와 같은 매우 명확한 동작 호출을 고려합니다.

<img src="images/nearme.png">

## 사용자의 위치에 대한 사용 권한을 제공하도록 유도하기

개발자는 사용자가 수행하는 단계에 대한 액세스 권한이 없습니다.  개발자는 사용자가
위치에 대한 액세스를 허용하지 않은 경우는 확실히 파악할 수 있지만
사용자가 액세스를 부여할 때는 알지 못합니다. 결과가 표시될 때만 액세스가 부여되었음을 파악할 수 있습니다.

동작 완료가 필요한 경우 사용자의 동작을 '유도'하는 것이 좋습니다.

권장 사항: 

1.  짧은 시간 후에 트리거하는 타이머를 설정합니다. 5초가 권장됩니다.
2.  오류가 발생하면 사용자에게 오류 메시지를 표시합니다.
3.  긍정적인 응답을 얻은 경우 타이머를 해제하고 결과를 처리합니다.
4.  시간이 초과된 후에 긍정적인 응답을 얻지 못한 경우 사용자에게 알림 메시지를 표시합니다.
5.  그 후에 응답을 얻었는데 알림이 계속 표시되어 있을 경우 화면에서 알림을 제거합니다.

{% highlight javascript %}
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
{% endhighlight %}

