project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱에서 다운로드하는 데이터의 양은 시간이 지날수록 계속 늘어납니다. 최적의 성능을 제공하기 위해서는 최대한 많이 데이터 전달 과정을 최적화해야 합니다.


{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# 콘텐츠 효율성 최적화 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

웹 애플리케이션은 범위, 규모 및 기능 면에서 꾸준히 커지고 있습니다. 좋은 일이죠. 하지만, 기능이 더욱 풍부한 웹을 향한 끊임없는 행진은 각 애플리케이션에서 다운로드하는 데이터의 양이 꾸준한 속도로 계속해서 늘어나는 또 다른 동향을 이끌어 내고 있습니다. 최적의 성능을 제공하기 위해서는 모든 바이트 하나하나를 전달하는 과정을 최적화해야 합니다.

최신 웹 애플리케이션은 어떤 모습일까요? [HTTP Archive](http://httparchive.org/){: .external }에서 이에 대한 답을 얻을 수 있습니다. 이 프로젝트는 가장 인기 있는 사이트(Alexa Top 1M 목록에 등재된 300,000개 이상 사이트)를 주기적으로 크롤링하고 각 개별 대상에 대한 리소스 수, 콘텐츠 유형 및 기타 메타데이터에 대한 분석 정보를 기록하고 취합함으로써 웹이 어떻게 빌드되었는지 추적합니다.

<img src="images/http-archive-trends.png"  alt="HTTP Archive 동향">

<table class="">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>50번째 백분위수</th>
    <th>75번째 백분위수</th>
    <th>90번째 백분위수</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13KB</td>
  <td data-th="75%">26KB</td>
  <td data-th="90%">54KB</td>
</tr>
<tr>
  <td data-th="type">이미지</td>
  <td data-th="50%">528KB</td>
  <td data-th="75%">1213KB</td>
  <td data-th="90%">2384KB</td>
</tr>
<tr>
  <td data-th="type">자바스크립트</td>
  <td data-th="50%">207KB</td>
  <td data-th="75%">385KB</td>
  <td data-th="90%">587KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24KB</td>
  <td data-th="75%">53KB</td>
  <td data-th="90%">108KB</td>
</tr>
<tr>
  <td data-th="type">기타</td>
  <td data-th="50%">282KB</td>
  <td data-th="75%">308KB</td>
  <td data-th="90%">353KB</td>
</tr>
<tr>
  <td data-th="type"><strong>총계</strong></td>
  <td data-th="50%"><strong>1054KB</strong></td>
  <td data-th="75%"><strong>1985KB</strong></td>
  <td data-th="90%"><strong>3486KB</strong></td>
</tr>
</table>

위에 나와 있는 데이터는 2013년 1월부터 2014년 1월까지 웹에서 인기 있는 대상에 대해 다운로드된 바이트 수의 증가 동향을 보여줍니다. 물론, 모든 사이트가 동일한 속도로 증가하거나 동일한 양의 데이터를 필요로 하는 것은 아니며, 따라서 이 분포에서는 50번째(중간값), 75번째, 90번째 등 여러 분위수를 강조하여 나타냈습니다.

2014년 초반에 중간에 위치한 사이트는 총 전송된 바이트가 1054KB인 75개 요청으로 구성되어 있으며, 바이트(및 요청)의 총 수는 이전 년도 내내 꾸준한 속도로 계속 증가했습니다. 이 자체가 놀라운 일은 아니지만, 성능에 중요한 영향을 미칠 수 있습니다. 인터넷 속도는 점점 빨라지고 있지만 국가마다 빨라지는 정도가 다르고 많은 사용자가 여전히 데이터 제한과 비싼 종량제 요금에 시달리고 있습니다. 특히, 모바일 환경에서 말이죠.

데스크톱 환경과는 다르게, 웹 애플리케이션은 별도의 설치 과정이 필요 없습니다. URL만 입력하면 가동하고 실행할 수 있습니다. 이것이 웹의 핵심 기능입니다. 하지만 이를 위해서는 **수십 개, 때로는 수백 개의 다양한 리소스를 가져와야 합니다. 이러한 리소스의 데이터는 모두 합쳐서 수 메가바이트에 달할 수 있으며, 이 모든 것을 수백 밀리초 내에 가져와야만 우리가 지향하는 즉각적인 웹 환경을 구현할 수 있습니다.**

이러한 요구사항을 반영하여 즉각적인 웹 환경을 실현하는 것은 쉬운 일이 아닙니다. 불필요한 다운로드를 제거하고, 다양한 압축 기술을 통해 각 리소스의 전송 인코딩을 최적화하고, 중복되는 다운로드를 제거할 수 있는 경우 항상 캐싱을 활용함으로써 콘텐츠 효율성을 최적화해야 하기 때문입니다.


{# wf_devsite_translation #}
