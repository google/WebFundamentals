---
description: "이 가이드는 PageSpeed Insights 규칙을 살펴봅니다: 크리티컬 렌더링 패스 최적화 시에 어떤 것에 주의를 기울여야 하는지, 이유는 어떤건지 알아봅니다."
title: "PageSpeed 규칙과 권고사항"
updated_on: 2015-10-06
translators:
  - captainpangyo
---

<p class="intro">
  이 가이드는 PageSpeed Insights 규칙을 살펴봅니다: 크리티컬 렌더링 패스 최적화 시에 어떤 것에 주의를 기울여야 하는지, 이유는 어떤건지 알아봅니다.
</p>

{% include shared/toc.liquid %}

## 렌더를 가로막는 JavaScript 와 CSS 제거하기

첫 렌더를 가장 빠르게 하기 위해서는, 페이지의 크리티컬 리소스를 최소화 하거나 가능하면 제거해야 하고, 다운로드 된 크리티컬 바이트 숫자를 최소하 하고, 크리티컬 패스 길이를 최적화 해야합니다.

## JavaScript 사용 최적화 하기

JavaScript 리소스는 `async` 태그를 사용하지 않거나 특별한 JavaScript 스니펫을 추가하지 않으면 파서 블락킹 입니다. 파서를 블락하는 JavaScript는 브라우저가 DOM을 형성하는 것을 막고, CSSOM 을 기다리게 합니다. 이는 첫 번째 렌더에서 상당한 시간을 지연시킵니다.

### async JavaScript 리소스 선호하기

Async 리소스는 다큐먼트 파서를 막지 않고 브라우저가 스크립트 실행에 앞서 CSSOM을 막지 않도로 합니다. 종종, 스크립트가 async 이면, 그 스크립트가 첫 번째 렌더에서 그리 중요하지 않음을 알 수 있습니다 - 첫번째 로딩이 된 다음에 async 스크립트가 로딩되는 것을 고려하면요

### 순차적으로 서버 호출하지 않기

`navigator.sendBeacon()` 메서드를 이용하여 `unload` 안의 XMLHttpRequests 에서 받은 데이터를 제한한다. 왜냐하면 많은 브라우저가 순차적 요청을 보내기 때문에, 가끔씩 확연하게 페이지 전환이 느려질 수 있다. 아래 코드는 어떻게 `navigator.sendBeacon()` 를 사용하여 `unload` 핸들러 대신에 `pagehide` 핸들러로 데이터를 서버에 보내는 지 보여준다.

{% highlight html %}
<script>
  function() {
    window.addEventListener('pagehide', logData, false);
    function logData() {
      navigator.sendBeacon(
        'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
        'Sent by a beacon!');
    }
  }();
</script>
{% endhighlight %}


새로나온 `fetch()` 메서드를 이용하면 비동기적으로 데이터 요청하기가 수월하다. 이 방법은 아직 널리 퍼져있지 않기 때문에, 사용하기 전에 기능 구현이 가능한지 점검해봐야 한다. 이 방법은 응답처리를 이벤트 핸들러가 아닌 Promise로 한다. XMLHttpRequest의 응답과는 다르게, fetch 응답은 크롬 43 버전부터 지원하는 스트림 객체로 이뤄져 있다. 이 말은 `json()` 에 대한 콜이 Promise 를 반환 한다는 의미다.

{% highlight html %}
<script>
fetch('./api/some.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +  response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
</script>
{% endhighlight %}

`fetch()` 메서드는 POST 요청 또한 처리할 수 있다.

{% highlight html %}
<script>
fetch(url, {
  method: 'post',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  body: 'foo=bar&lorem=ipsum'
}).then(function() { // Aditional code });
</script>
{% endhighlight %}

### JavaScript 파싱 지연하기

초기 렌더링에서 컨텐츠를 가시화 하는데 크리티컬하지 않은 비 필수 스크립트는 브라우저가 페이지 렌더링을 수행하는 부담을 최소화 하기 위해 지연되어야 합니다.

### 오래 실행되는 JavaScript 피하기

오래 실행되는 JavaScript는 브라우저가 DOM, CSSOM 를 생성하는 것과 페이지 렌더링을 막습니다. 결론적으로, 첫 렌더에 필수가 아닌 기능과 초기화 로직을 나중으로 미뤄야 합니다. 만약 길게 연결된 초기화 작업이 실행되어야 한다면, 브라우저가 사이사이에 다른 이벤트를 처리할 수 있도록 여러가지 단계로 쪼개는 것도 생각해봐야 합니다.

## CSS 사용 최적화 하기

CSS는 렌더 트리를 생성하기 위해 필요하고, JavaScript는 종종 초기 페이지 생성시에 CSS를 막습니다. 비필수적인 CSS는 주요하지 않음으로 표시를 해야합니다 (예, print 또는 다른 미디어쿼리), 그리고 크리티컬한 CSS의 양과 이를 로딩하는 시간은 가능한 한 작게 해야 합니다.

### CSS를 다큐멘트 헤더에 넣기

모든 CSS 리소스는 브라우저에서 `<link>` 태그를 인식하고 해당 CSS를 빨리 요청할 수 있도록 HTML 다큐멘트 안에서 최대한 일찍 정의되어야 합니다.

### CSS 임포트 기능 피하기

CSS import (`@import`) 디렉티브는 다른 스타일시트 파일에서 특정 규칙을 불러오는 것을 허용합니다. 그러나, 이러한 디렉티브들이 크리티컬 패스에 추가적인 왕복비용을 유도하므로 사용하지 않아야 합니다: 임포트 된 CSS 리소스는 `@import` 규칙을 가진 CSS가 수신되고 파싱된 후에 실행됩니다.

### 렌더링 막는 CSS를 다큐멘트 안에 넣기

최고 성능을 위해서는 크리티컬 CSS를 HTML 다큐멘트 안에 직접 포함해야 합니다. 이렇게 하면 크리티컬 패스의 추가적인 왕복비용을 줄일 수 있고, 만약 올바르게 사용되었다면 오직 HTML만 페이지 렌더링을 저해하는 "one roundtrip" 크리티컬 패스 길이가 됩니다.
