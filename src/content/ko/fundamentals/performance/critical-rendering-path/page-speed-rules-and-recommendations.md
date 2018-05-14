project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이 가이드에서는 PageSpeed Insights 규칙에 대해 살펴보고, 주요 렌더링 경로를 최적화할 때 주의해야 할 사항과 그 이유에 대해 알아봅니다.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# PageSpeed 규칙 및 권장 사항 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

이 가이드에서는 PageSpeed Insights 규칙에 대해 살펴보고, 주요 렌더링 경로를 최적화할 때 주의해야 할 사항과 그 이유에 대해 알아봅니다.


## 렌더링 차단 자바스크립트 및 CSS 제거

최초 렌더링을 가장 빠르게 수행하려면 페이지의 주요 리소스 수를 최소화하거나 (가능한 경우) 제거하고, 다운로드되는 주요 바이트 수를 최소화하고, 주요 경로 길이를 최적화해야 합니다.

## 자바스크립트 사용 최적화

자바스크립트 리소스는 `async`로 표시하거나 특별한 자바스크립트 스니펫을 추가하지 않은 경우 기본적으로 파서를 차단합니다. 파서 차단 자바스크립트는 CSSOM이 처리될 때까지 브라우저를 기다리게 하고 DOM 생성을 일시 중지합니다. 이는 최초 렌더링에 상당한 지연을 일으킬 수 있습니다.

### 비동기 자바스크립트 리소스 선호

비동기 리소스는 문서 파서의 차단을 해제하고, 브라우저가 스크립트를 실행하기 전에 CSSOM을 차단하지 않도록 합니다. 대개, 스크립트가 `async` 속성을 사용할 수 있다면 이는 해당 스크립트가 최초 렌더링에 필수적이지 않음을 의미합니다. 따라서, 초기 렌더링 후 스크립트의 비동기 로드를 고려해 보세요.

### 동기식 서버 호출 금지

`navigator.sendBeacon()` 메서드를 사용하여 `unload` 핸들러의 XMLHttpRequests에서
전송하는 데이터를 제한합니다. 많은 브라우저에서 이러한 요청이
동기식으로 처리되어야 하므로 페이지 전환이 때로는 현저하게 느려질 수 있습니다. 다음
코드는 `navigator.sendBeacon()`을 사용하여 `unload` 핸들러 대신
`pagehide` 핸들러에서 데이터를 서버로 보내는 방법을 보여줍니다.


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
    

새 `fetch()` 메서드를 사용하면 데이터를 비동기식으로 쉽게 요청할 수 있습니다. 이 메서드는 아직 모든 경우에 사용할 수 없으므로 사용하기 전에 기능 검색을 통해 이 메서드가 지원되는지 테스트해야 합니다. 이 메서드는 여러 이벤트 핸들러를 사용하지 않고 Promise로 응답을 처리합니다. XMLHttpRequest에 대한 응답과 달리, fetch 응답은 Chrome 43부터 지원되는 스트림 객체입니다. 이는 `json()` 호출도 Promise를 반환함을 의미합니다. 


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
    

`fetch()` 메서드는 POST 요청을 처리할 수도 있습니다.


    <script>
    fetch(url, {
      method: 'post',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'foo=bar&lorem=ipsum'  
    }).then(function() { // Aditional code });
    </script>
    

### 자바스크립트 파싱 지연

브라우저가 페이지를 렌더링하는 데 수행해야 할 작업을 최소화하려면, 초기 렌더링을 위해 표시되는 콘텐츠를 생성하는 데 중요하지 않은 모든 비필수 스크립트를 지연시키세요.

### 장기적으로 실행되는 자바스크립트 피하기

실행 시간이 긴 자바스크립트는 브라우저가 DOM 및 CSSOM을 생성하고 페이지를 렌더링하는 것을 차단합니다. 따라서, 최초 렌더링에 필수적이지 않은 초기화 로직과 기능을 나중으로 지연시켜야 합니다. 장기 초기화 작업 시퀀스를 실행해야 할 경우, 여러 단계로 나누어 브라우저가 이러한 단계 사이에 다른 이벤트를 처리할 수 있도록 해야 합니다.

## CSS 사용 최적화

CSS는 렌더링 트리를 생성하는 데 필요하며 자바스크립트가 초기 페이지 생성 시 CSS를 차단하는 경우가 많습니다. 비필수적인 CSS를 주요하지 않은 것으로 표시하고(예: 인쇄 및 기타 미디어 쿼리), 주요 CSS의 양과 이를 제공하는 시간을 가능한 한 작도록 해야 합니다.

### CSS를 문서 헤드에 넣기

브라우저에서 `<link>` 태그를 검색하고 해당 CSS에 대한 요청을 최대한 빨리 발송할 수 있도록, 모든 CSS 리소스를 가능한 한 HTML 문서의 앞쪽에 지정하세요.

### CSS 가져오기 피하기

CSS 가져오기(`@import`) 지시문을 사용하면 하나의 스타일시트에서 다른 스타일 시트 파일의 규칙을 가져올 수 있습니다. 하지만, 이러한 지시문은 주요 경로에 대한 추가 왕복을 유도하므로 사용을 피하세요. 가져온 CSS 리소스는 `@import` 규칙을 가진 CSS 스타일시트가 수신되고 파싱된 후에만 검색됩니다.

### 렌더링 차단 CSS를 인라인 처리

최상의 성능을 위해 주요 CSS를 HTML 문서에 직접 인라인으로 추가하는 것을 고려해야 합니다. 이 경우 주요 경로에 발생하는 추가적인 왕복이 제거되고, (제대로 처리된 경우) HTML만 차단 리소스인 '1회 왕복' 주요 경로 길이를 전달할 수 있습니다.



{# wf_devsite_translation #}
