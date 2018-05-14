project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 네트워크를 통해 리소스가 수집되는 단계를 이해하는 것은 매우 중요합니다. 이는 로드 문제를 해결하기 위한 기반입니다.

{# wf_published_on: 2016-02-03 #}
{# wf_updated_on: 2016-02-03 #}

# Resource Timing의 이해 {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

네트워크를 통해 리소스가 수집되는 단계를 이해하는 것은 매우 중요합니다. 이는 로드 문제를 해결하기 위한 기반입니다.


### TL;DR {: .hide-from-toc }
- Resource Timing의 여러 단계를 이해합니다.
- 각 단계가 Resource Timing API에 무엇을 제공하는지 알아봅니다.
- 타임라인 그래프에서 다양한 성능 문제 지표를 구현합니다(예: 일련의 투명 막대 그래프 또는 큰 녹색 덩어리).


네크워크 요청은 모두 리소스로 간주됩니다.
이들은 네트워크를 통해 검색되므로, 리소스에는 Resource Timing이라는 용어로 표현되는 명확한 수명 주기가 있습니다.
Network 패널은 애플리케이션 개발자들이 이용하는 것과 같은 [Resource Timing API](http://www.w3.org/TR/resource-timing)를 사용합니다.

참고: 출처가 여러 곳인 리소스에 Resource Timing API를 사용할 경우에는
모든 리소스에 CORS 헤더가 있는지 확인하세요.

Resource Timing API는 각 자산이 수신되는 시간에 대한 풍부한 세부정보를 제공합니다.
요청 수명 주기의 기본 단계는 다음과 같습니다.

* 리디렉션
  * 즉시 `startTime`이 시작됩니다.
  * 리디렉션이 발생하면 `redirectStart`도 함께 시작됩니다.
  * 리디렉션이 이 단계가 끝날 때 발생하면 `redirectEnd`를 취합니다.
* 앱 캐시
  * 요청을 수행하는 애플리케이션 캐시인 경우 `fetchStart` 시간을 취합니다.
* DNS
  * DNS 요청 시작 시 `domainLookupStart` 시간을 취합니다.
  * DNS 요청 종료 시 `domainLookupEnd` 시간을 취합니다.
* TCP
  * 서버에 처음 연결할 때 `connectStart`를 취합니다.
  * TLS 또는 SSL이 사용 중인 경우에는 연결 보안을 위해 핸드셰이크가 시작될 때 `secureConnectionStart`가 시작됩니다.
  * 서버로 연결이 완료되면 `connectEnd`를 취합니다.
* 요청
  * 리소스 요청이 서버로 전송되고 나면 `requestStart`를 취합니다.
* 응답
  * `responseStart`는 서버가 요청에 처음 응답하는 시간입니다.
  * `responseEnd`는 요청이 끝나고 데이터를 검색할 때의 시간입니다.

![Resource Timing API 다이어그램](imgs/resource-timing-api.png)

## DevTools에서 보기

Network 패널의 주어진 입력 항목에 대한 전체 타이밍 정보를 보려면 세 가지 옵션이 있습니다.

1. 타임라인 열 아래의 타이밍 그래프로 마우스를 가져갑니다. 이렇게 하면 전체 타이밍 데이터를 보여주는 팝업 창이 나타납니다. 
2. 아무 항목이나 클릭하여 해당 항목의 Timing 탭을 엽니다. 
3. Resource Timing API를 사용하여 자바스크립트에서 원시 데이터를 검색합니다.

![Resource Timing 정보](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  이 코드는 DevTools 콘솔에서 실행할 수 있습니다.
  이 코드는 네트워크 타이밍 API를 사용하여 모든 리소스를 검색합니다.
  그런 다음 항목을 필터링하여 이름이 'style.css'인 항목을 찾습니다.
  이 항목을 찾으면 반환합니다.
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
</code>
</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Resource Timing 항목">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>Queuing</strong></dt>
  <dd>
    요청이 큐에 저장되면 다음을 나타냅니다.
      <ul>
        <li>
        렌더링 엔진이 이 요청을 연기했습니다. 이는 이 요청이 중요 리소스(예: 스크립트/스타일)보다 우선순위가 낮다고 간주되었기 때문입니다.
        이는 이미지에서 자주 발생합니다.
        </li>
        <li>
        요청이 곧 사용 가능하지만 지금은 사용할 수 없는 TCP 소켓을 기다리도록 보류되었습니다.
        </li>
        <li>
        브라우저가 HTTP 1에서 각 출처마다 <a href="https://crbug.com/12066">6개의 TCP 연결</a>만 허용하기 때문에 요청이 보류되었습니다.
        </li>
        <li>
        디스크 캐시 항목을 만드는 데 걸린 시간(대개 매우 빠름).
        </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> Stalled/Blocking</strong></dt>
  <dd>
    요청을 전송할 수 있게 되기까지 기다리는 데 소비한 시간.
    기다리는 이유는 Queueing에서 설명한 이유 중 하나가 될 수 있습니다.
    또한 이 시간에는 프록시 협상에 소비한 시간도 모두 포함됩니다.
  </dd>

  <dt class="proxy-negotiation"><strong> Proxy Negotiation</strong></dt>
  <dd>프록시 서버 연결과 협상하는 데 소비한 시간.</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> Lookup</strong></dt>
  <dd>
    DNS 검색을 수행하는 데 소비한 시간.
    페이지의 새 도메인마다 DNS 검색을 수행하는 데 한 번의 전체 왕복이 필요합니다.
  </dd>

  <dt class="initial-connection"><strong> Initial Connection / Connecting</strong></dt>
  <dd>연결을 설정하는 데 걸린 시간. 여기에는 <abbr title="Transmission Control Protocol">TCP </abbr> 핸드셰이크/재시도와 <abbr title="Secure Sockets Layer">SSL</abbr> 협상 등이 포함됩니다.

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>SSL 핸드셰이크를 완료하는 데 걸린 시간.</dd>

  <dt class="request-sent"><strong> Request Sent / Sending</strong></dt>
  <dd>
    네트워크 요청을 발급하는 데 걸린 시간.
    일반적으로 밀리초의 극히 일부분에 불과합니다.
  </dd>

  <dt class="ttfb"><strong> Waiting (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    최초 응답을 기다리는 데 보낸 시간으로, TTFB(Time To First Byte)라고도 합니다.
    이 시간은 서버까지 왕복하는 데 걸린 지연 시간에 서버가 응답을 전달하기를 기다리는 데 보낸 시간을 더한 것입니다.
  </dd>

  <dt class="content-download"><strong> Content Download / Downloading</strong></dt>
  <dd>응답 데이터를 수신하는 데 걸린 시간.</dd>
</dl>


## 네트워크 문제 진단

Network 패널을 통해 밝혀낼 수 있는 발생 가능한 문제는 무수히 많습니다.
이러한 문제를 찾아내려면 클라이언트와 서버의 통신 방법을 잘 이해해야 하고 프로토콜에 주어진 한계를 파악해야 합니다.

### 큐에 저장되거나 지연된 시리즈

확인된 가장 일반적인 문제는 큐에 저장되거나 지연된 일련의 항목입니다.
이런 현상이 나타나면 단일 클라이언트에서 너무 많은 리소스를 가져오고 있다는 의미입니다.
HTTP 1.0/1.1 연결의 경우, Chrome은 호스트당 최대 6개의 TCP 연결을 적용합니다.
한 번에 12개의 항목을 요청하는 경우, 첫 6개부터 먼저 시작되고 나머지 절반은 큐에 저장됩니다.
첫 절반 중 하나가 완료되면 큐에 대기 중인 첫 번째 항목이 요청 프로세스를 시작합니다.

![지연된 일련의 요청](imgs/stalled-request-series.png)

일반적인 HTTP 1 트래픽에 대해 이 문제를 해결하려면 [도메인 샤딩](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/)을 구현해야 합니다.
즉, 리소스를 제공할 애플리케이션에 여러 개의 하위 도메인을 만들어야 합니다.
그런 다음 리소스가 여러 하위 도메인 간에 균등하게 제공되도록 분할합니다.

HTTP 1 연결에 대한 해결 방안은 HTTP 2 연결에는 적용되지 **않습니다**.
사실, 오히려 해가 됩니다. HTTP 2를 배포한 경우, 리소스를 도메인 샤딩하지 마세요. 이는 HTTP 2의 작동 방식과 다르게 작동하기 때문입니다.
HTTP 2의 경우 서버에 단일 TCP 연결이 설정되어 멀티플렉싱된 연결 역할을 합니다.
따라서 HTTP 1에 적용되는 6개의 연결 제한을 제거하고, 단일 연결을 통해 여러 리소스를 동시에 전송할 수 있습니다.

### 느린 TTFB

<small>즉, 녹색이 많은 경우</small>

![고속 TTFB Indicator](imgs/indicator-of-high-ttfb.png)

느린 TTFB(Time to first byte)는 긴 대기 시간을 통해 파악할 수 있습니다.
이 시간은 [200ms 미만](/speed/docs/insights/Server)이 좋습니다.
높은 TTFB는 두 가지 주요 문제 중 하나를 나타냅니다. 다음 중 하나에 해당합니다.

1. 클라이언트와 서버 사이의 네트워크 상태가 잘못되었습니다. 또는
2. 서버 애플리케이션의 응답이 느립니다.

높은 TTFB 문제를 해결하려면, 먼저 네트워크를 가급적 많이 끊습니다.
이상적으로 애플리케이션을 로컬에서 호스팅하고 아직도 큰 TTFB가 있는지 확인합니다.
있는 경우, 애플리케이션을 응답 속도에 맞춰 최적화해야 합니다.
이는 데이터베이스 쿼리를 최적화하여 콘텐츠의 특정 부분에 대한 캐시를 구현해야 한다는 의미일 수도 있고, 웹 서버 구성을 수정해야 한다는 의미일 수도 있습니다.
백엔드가 느려질 수 있는 많은 이유가 있습니다.
소프트웨어를 조사하여 성능 기대치를 충족하지 않는 것이 무엇인지 알아내야 합니다.

TTFB가 로컬에서 너무 낮은 경우 클라이언트와 서버 사이의 네트워크가 문제입니다.
네트워크 순회를 저해하는 다양한 원인이 있을 수 있습니다.
클라이언트와 서버 사이에는 지점이 아주 많고, 각각 자체적인 연결 제한이 있고 이로 인해 문제가 발생할 수 있습니다.
이러한 문제를 줄이는 가장 간단한 방법은 애플리케이션을 다른 호스트에 배치한 다음 TTFB가 개선되는지 보는 것입니다.

### 처리 용량 확보

<small>즉, 파란색이 많은 경우</small>

![처리 용량 표시기](imgs/indicator-of-large-content.png)

콘텐츠 다운로드 단계에서 시간이 많이 소모되는 경우, 서버 응답 또는 연결을 개선해도 그다지 도움이 되지 않습니다.
주된 해결책은 전송되는 바이트 크기를 줄이는 것입니다.


{# wf_devsite_translation #}
