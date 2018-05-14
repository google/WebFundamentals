project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 연결 상태가 나쁘거나 불안정한 경우 앱이나 사이트의 사용 느낌이 어떤지를 파악하여 이에 따라 빌드하는 것이 중요합니다. 다양한 도구가 도움이 될 수 있습니다.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2016-05-09 #}

# 낮은 대역폭 및 높은 지연 시간 이해 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

연결 상태가 나쁘거나 불안정한 경우 앱이나 사이트의 사용 느낌이 어떤지를 파악하여 이에 따라 빌드하는 것이 중요합니다. 다양한 도구가 도움이 될 수 있습니다.

## 낮은 대역폭 및 높은 지연 시간으로 테스트 {: #testing }

휴대기기에서 웹을 경험하는 사람들의 <a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">비중이 점점 더 많아지고 있습니다</a>. 심지어는 가정에서도 <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">많은 사람들이 자유롭게 이동하면서 사용하기 위해 고정 광대역 사용을 중지하고 있습니다</a>.

이러한 상황에서는 연결 상태가 나쁘거나 불안정한 경우 앱이나 사이트의 사용 느낌이 어떤지를 파악하는 것이 중요합니다. 다양한 소프트웨어 도구가 낮은 대역폭 및 높은 [지연 시간](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)을 [에뮬레이트 및 시뮬레이션](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference)하는 데 도움이 될 수 있습니다.

### 네트워크 제한 에뮬레이트

사이트를 빌드하거나 업데이트할 때에는 다양한 연결 조건에서 적합한 성능을 확인해야 합니다. 여러 도구가 유용할 수 있습니다.

#### 브라우저 도구

[Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions)를 사용하면 Chrome DevTools Network 패널에서 사전 설정 또는 맞춤 설정을 사용하여 다양한 업로드/다운로드 속도 및 [왕복 시간](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)으로 사이트를 테스트할 수 있습니다.

![Chrome DevTools 제한](images/chrome-devtools-throttling.png)

#### 시스템 도구

Network Link Conditioner는 [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) for Xcode를 설치한 경우 Mac에서 사용할 수 있는 기본 설정 패널입니다.

![Mac Network Link Conditioner 제어판](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner 설정](images/network-link-conditioner-settings.png)

![Mac Network Link Conditioner 맞춤 설정](images/network-link-conditioner-custom.png)

#### 기기 에뮬레이션

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed)를 사용하면 Android에서 앱(웹 브라우저 및 하이브리드 웹 앱 포함)을 실행하는 동안 다양한 네트워크 조건을 시뮬레이션할 수 있습니다.

![Android Emulator](images/android-emulator.png)

![Android Emulator 설정](images/android-emulator-settings.png)

iPhone의 경우, Network Link Conditioner를 사용하여 손상된 네트워크 조건을 시뮬레이션할 수 있습니다(위 참조).

### 다양한 위치 및 네트워크에서 테스트

연결 성능은 서버 위치와 네트워크 유형에 따라 달라집니다.

[WebPagetest](https://webpagetest.org)는 다양한 네트워크 및 호스트 위치를 사용하여 사이트에 대해 여러 가지 성능 테스트를 실행할 수 있는 온라인 서비스입니다. 예를 들면, 인도에 있는 서버에서 2G 네트워크를 통해 사이트를 시험해 보거나 미국 내 도시에서 케이블을 통해 사이트를 시험해 볼 수 있습니다.

![WebPagetest 설정](images/webpagetest.png)

위치를 선택하고, 고급 설정에서 연결 유형을 선택합니다. [스크립트](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)(예: 사이트 로그인)를 사용하거나 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis)를 사용하여 테스트를 자동화할 수도 있습니다. 이를 통해 연결 테스트를 빌드 프로세스나 성능 로깅에 포함할 수 있습니다.

[Fiddler](http://www.telerik.com/fiddler)는 [GeoEdge](http://www.geoedge.com/faq)를 통한 전역적 프록싱을 지원하고, 해당 사용자설정 규칙을 사용하여 모뎀 속도를 시뮬레이션할 수 있습니다.

![Fiddler 프록시](images/fiddler.png)

### 손상된 네트워크에서 테스트

소프트웨어 및 하드웨어 프록시를 통해 대역폭 제한, 패킷 지연 및 무작위 패킷 손실과 같은 문제가 있는 모바일 네트워크 조건을 에뮬레이트할 수 있습니다. 공유된 프록시나 손상된 네트워크에서는 개발자 팀이 자신의 워크플로에 실제 네트워크 테스트를 통합할 수 있습니다.

Facebook의 [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/)(ATC)은 트래픽을 형성하고 손상된 네트워크 조건을 에뮬레이트하는 데 사용할 수 있는 BSD에서 라이선스를 제공하는 애플리케이션 집합입니다.

![Facebook의 Augmented Traffic Control](images/augmented-traffic-control.png)

> Facebook은 2G 환경의 사람들이 어떻게 제품을 사용하는지 파악하는 데 도움이 되도록 [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/)도 실시했습니다. 화요일마다 직원에게 2G 연결을 시뮬레이션하는 옵션을 제공하는 팝업이 표시됩니다.

[Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS 프록시를 사용하여 [대역폭 및 지연 시간을 조정](http://www.charlesproxy.com/documentation/proxying/throttling/)할 수 있습니다. Charles는 상용 소프트웨어이지만, 무료 평가판을 사용할 수 있습니다.

![Charles 프록시 대역폭 및 지연 시간 설정](images/charles.png)

Charles에 대한 자세한 내용은 [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/)에서 확인할 수 있습니다.

## 불안정한 연결 및 'lie-fi' 처리 {: #lie-fi }

### lie-fi란?

<a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a>라는 용어는 최소한 2008년(전화가 <a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">이것</a>과 비슷하게 보였던 때)부터 존재해 왔으며, 보이는 것과 다른 연결 상태를 나타냅니다. 브라우저는 어떠한 이유에서든 연결이 되지 않았는데 연결이 된 것처럼 동작합니다.

연결 상태를 잘못 해석할 경우 브라우저(또는 자바스크립트)가 작업을 중단하고 실용적인 대안을 선택하는 대신 리소스를 계속 가져오려고 하므로 형편 없는 환경을 초래할 수 있습니다. lie-fi는 실제로 오프라인보다 안 좋을 수 있습니다. 최소한 기기가 확실히 오프라인인 경우 자바스크립트는 적절한 회피 조치를 수행할 수 있습니다.

점점 더 많은 사람들이 모바일로 전환하여 고정 광대역 환경에서 이탈하고 있으므로 lie-fi는 더 큰 문제가 될 가능성이 큽니다. 최신 [미국 인구 조사 데이터](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use)에 [고정 광대역 환경 이탈](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/)이 나와 있습니다. 다음 차트에서는 2015년도 가정에서의 모바일 인터넷 사용을 2013년과 비교하여 보여줍니다.

<img src="images/home-broadband.png" class="center" alt="특히, 수입이 적은 가정에서 고정 광대역 환경에서 모바일 환경으로의 전환을 보여주는 미국 인구 조사 데이터 기반 차트">

### 제한 시간을 사용하여 간헐적인 연결 처리

과거에는, [XHR을 사용한 해킹 방법](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline)이 간헐적인 연결을 테스트하는 데 사용되었습니다. 하지만, 서비스 워커는 네트워크 제한 시간을 설정하기 위한 더 안정적인 방법을 지원합니다. Jeff Posnick은 [Instant Loading with Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s)에서 [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) 제한 시간을 사용하여 이를 실현하는 방법을 설명하고 있습니다.


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );
    

[제한 시간 옵션](https://github.com/whatwg/fetch/issues/20)은 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)에 제공될 예정이며, [Streams API](https://www.w3.org/TR/streams-api/)는 콘텐츠 제공을 최적화하고 획일적인 요청을 피하는 방식으로 도움을 줍니다. Jake Archibald는 [Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s)에서 lie-fi를 해결하는 방법에 대해 자세한 정보를 제공합니다.


{# wf_devsite_translation #}
