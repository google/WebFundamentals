---
title: "콘텐츠 효율 최적화"
description: "애플리케이션이 다운로드하는 데이터량은 시간이 지나면서 계속 증가합니다. 따라서 최고의 성능을 자랑하는 애플리케이션을 만들고 싶다면, 데이터 전송을 가능한 최적화해야 합니다."
updated_on: 2015-10-06
translation_priority: 0
translators:
  - jeokrang
---

<p class="intro">
웹 애플리케이션은 범위나 규모, 그리고 기능면에서 꾸준히 성장하고 있습니다. 좋은 일이죠. 하지만 더 풍부한 웹을 만들려는 지칠줄 모르는 진보는 개별 애플리케이션이 다운로드하는 데이터량을 계속해서 일정한 속도로 증가하게 만들었습니다. 이제 우리는 데이터를 전달하는 각 과정과 모든 바이트를 최적화해서 최고의 성능을 사용자에게 제공해야 합니다.
</p>

현대의 웹 애플리케이션은 어떤 모습일까요? [HTTP Archive](http://httparchive.org/)에서 그 해답을 얻을 수 있습니다. 이 프로젝트는 인기 순위 상위권에 있는 사이트(Alexa의 상위 100 만건의 사이트 목록 중 300,000 건 이상)를 주기적으로 크롤링하고 기록합니다. 각 사이트의 리소스 수와 콘텐츠의 형태, 그리고 기타 특정한 목적으로 사용하는 메타 데이터를 수집하고 분석해서 웹이 어떻게 만들어졌는지 추적합니다. 

<img src="images/http-archive-trends.png" class="center" alt="HTTP Archive trends">

<table class="mdl-data-table mdl-js-data-table">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>50th percentile</th>
    <th>75th percentile</th>
    <th>90th percentile</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Images</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Other</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Total</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

위에 있는 데이터를 보면 2013년 1월부터 2014년 1월 사이에 일반적인 웹 사이트에서 사용자가 다운로드한 데이터량이 증가하였음을 알 수 있습니다. 물론 모든 사이트의 데이터 전송량이 같은 비율로 증가한 것은 아니며, 같은 양의 데이터를 다운로드할 것을 사용자에게 요구한 것도 아닙니다. 그래서 분포 내에서 50번째(중간), 75번재, 90번째의 다른 분위수를 이용했습니다

중간에 위치한 사이트는 2014년 초에 75개의 네트워크 요청을 했고, 총 1054kb의 데이터를 전송 받았습니다. 데이터의 총량(네트워크 요청을 포함해서)은 이전 년도 대비 꾸준한 속도로 계속 증가하고 있군요. 이 자체가 놀라운 일은 아니지만 성능에 심각한 영향을 미칠 수 있습니다. 인터넷 속도는 점점 더 빨라지고 있지만, 국가마다 빨라지는 정도가 다르고 여전히 많은 사용자가 데이터량 제한과 비싼 종량제 요금에 시달리고 있습니다. 특히 모바일 환경에서 말이죠.

데스크톱 환경과는 다르게, 웹 애플리케이션은 따로 설치할 필요가 없습니다. 그저 사용자는 url을 입력하는 걸로 사이트를 실행할 수 있습니다. 이는 웹의 핵심 기능입니다. 하지만 이를 위해서 **수십 개, 때로는 수백 개의 다양한 자원을 가져와야 합니다. 이러한 자원의 크기는 모두 합쳐서 몇 메가 바이트에 달할 수도 있습니다. 이 모든 것을 수백 밀리 초 내에 가져올 수 있어야 우리가 목표로 하는, 즉시 반응하는 웹 환경을 사용자에게 제공할 수 있습니다.**

이러한 요구를 반영하여 빠르게 실행되는 웹 경험을 만들기란 쉬운 일이 아닙니다. 불필요한 다운로드를 제거하고, 다양한 압축 기술로 각 자원의 전송 인코딩을 최적화하고, 캐시를 활용하여 불필요한 다운로드를 제거함으로써 콘텐츠 효율을 최적화해야합니다. 
