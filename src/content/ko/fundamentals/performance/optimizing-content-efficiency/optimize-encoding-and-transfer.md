project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 불필요한 리소스 다운로드를 제거한 후 페이지 로드 속도를 향상시키기 위해 할 수 있는 가장 좋은 작업은 나머지 리소스를 최적화하고 압축하여 전체 다운로드 크기를 최소화하는 것입니다.

{# wf_updated_on: 2016-08-26 #}
{# wf_published_on: 2014-03-31 #}

# 텍스트 기반 자산의 인코딩 및 전송 크기 최적화 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

불필요한 리소스 다운로드를 제거한 후 페이지 로드 속도를 향상시키기 위해 할 수 있는 가장 좋은 작업은 나머지 리소스를 최적화하고 압축하여 전체 다운로드 크기를 최소화하는 것입니다.

## 데이터 압축 101

불필요한 리소스를 제거한 후 그 다음 단계는 브라우저가 다운로드해야 하는 남은 리소스를 압축하는 것입니다. 리소스 유형(텍스트, 이미지, 글꼴 등)에 따라 선택할 수 있는 다양한 기술들이 많이 있습니다. 즉, 서버에서 활성화될 수 있는 일반 도구, 특정 콘텐츠 유형에 대한 사전 처리 최적화, 개발자의 입력을 필요로 하는 리소스별 최적화가 이에 해당됩니다.

최상의 성능을 제공하려면 이 모든 기술의 조합이 필요합니다.

### TL;DR {: .hide-from-toc }

- 압축은 더 적은 비트를 사용하여 정보를 인코딩하는 프로세스입니다.
- 불필요한 데이터를 제거하면 항상 최상의 결과가 도출됩니다.
- 많은 다양한 압축 기술과 알고리즘이 있습니다.
- 최상의 압축을 달성하려면 다양한 기술이 필요합니다.

데이터 크기를 줄이는 프로세스를 *데이터 압축*이라고 합니다. 다양한 압축 프로그램의 압축율, 속도 및 메모리 요구사항을 개선하기 위해 많은 사람들이 알고리즘, 기술 및 최적화 작업에 기여해 왔습니다. 데이터 압축에 대한 자세한 논의는 여기에서 다루지 않습니다. 하지만 압축이 작동하는 방식과 페이지에 필요한 다양한 자산의 크기를 줄이기 위해 여러분이 사용할 수 있는 기술을 대략적이라도 이해하는 것이 중요합니다.

이러한 기술의 핵심 원리를 설명하기 위해, 단순한 텍스트 메시지 형식을 최적화하는 프로세스를 생각해 보겠습니다. 이 메시지 형식은 이 예시에만 적용됩니다.

```
# Below is a secret message, which consists of a set of headers in
# key-value format followed by a newline and the encrypted message.
format: secret-cipher
date: 08/25/16
AAAZZBBBBEEEMMM EEETTTAAA
```

1. 메시지에는 '#' 접두사로 지정된 임의 주석이 포함될 수 있습니다. 주석은 메시지의 의미나 기타 동작에 영향을 주지 않습니다.
2. 메시지에는 키-값 쌍(':'으로 구분)이며 메시지 시작 부분에 나타나는 *헤더*가 포함될 수 있습니다.
3. 메시지는 텍스트 페이로드를 가집니다.

위 메시지의 크기(현재 200자)를 줄이기 위해 어떤 작업을 수행할 수 있나요?

1. 주석은 흥미롭지만, 메시지의 의미에는 실제로 영향을 주지 않으므로 메시지를 전송할 때 이를 제거합니다.
2. 효율적인 방법으로 헤더를 인코딩할 수 있는 좋은 기술들이 있습니다. 예를 들어, 모든 메시지에 '형식' 및 '날짜'가 있다는 것을 안다면, 이 메시지를 짧은 정수 ID로 변환하여 전송할 수 있습니다. 하지만, 이것을 확신할 수 없으므로 현재는 그대로 둘 것입니다.
3. 페이로드는 텍스트만으로 구성되며, 해당 콘텐츠가 정말로 무엇인지는 알지 못하지만(외관상 '비밀 메시지'를 사용), 텍스트를 보기만 해도 여기에 많은 중복 항목이 있다는 것을 알 수 있습니다. 아마도, 반복되는 문자를 보내는 대신 반복되는 문자의 수를 세어 이를 더욱 효율적으로 인코딩할 수 있지 않습니다. 예를 들어, 'AAA'는 '3A'가 되며 이것은 A가 세 개 연속됨을 나타냅니다.

이러한 기술을 조합하면 다음 결과가 생성됩니다.

```
format: secret-cipher
date: 08/25/16
3A2Z4B3E3M 3E3T3A
```

새로운 메시지는 길이가 56자이며, 이것은 원본 메시지를 72%나 압축한 것입니다.

이 기술은 모두 훌륭하지만 웹페이지를 최적화하는 데 어떤 식으로 도움이 될까요? 우리는 압축 알고리즘을 직접 발명하려고 시도하지는 않을 것입니다. 하지만 페이지의 다양한 리소스를 최적화할 때 완전히 동일한 기법과 사고 프로세스를 사용할 수 있습니다(예: 사전 처리, 상황별 최적화 및 콘텐츠별로 서로 다른 알고리즘).

## 최소화: 사전 처리 및 상황별 최적화

### TL;DR {: .hide-from-toc }

- 콘텐츠별 최적화는 제공되는 리소스의 크기를 상당히 줄일 수 있습니다.
- 콘텐츠별 최적화는 빌드/릴리스 주기의 일부로 가장 잘 적용됩니다.

중복된 데이터나 불필요한 데이터를 압축하는 최상의 방법은 이러한 데이터를 모두 제거하는 것입니다. 우리가 임의 데이터를 삭제할 수는 없지만, 데이터 형식과 해당 속성에 대한 콘텐츠 관련 지식을 가지고 있는 몇몇 상황에서는 실제 의미에 영향을 미치지 않고 페이로드의 크기를 상당히 줄일 수 있는 경우가 많습니다.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>


[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

위에 나와 있는 단순한 HTML 페이지와 이 페이지에 포함된 세 가지 서로 다른 콘텐츠 유형인 HTML 마크업, CSS 스타일 및 자바스크립트를 살펴봅시다. 이러한 각 콘텐츠 유형은 유효한 콘텐츠를 구성하는 항목에 대한 규칙이 각각 다르고, 주석을 지정하기 위한 규칙도 각각 다릅니다. 이 페이지의 크기를 줄이려면 어떻게 해야 할까요?

- 코드 주석은 개발자에게 최고의 친구이지만, 브라우저는 이 주석을 볼 필요가 없습니다. 간단하게 CSS(`/* … */`), HTML(`<!-- … -->`) 및 자바스크립트(`// …`) 주석을 제거하면 페이지의 총 크기를 상당히 줄일 수 있습니다.
- '지능적인' CSS 압축 프로그램은 우리가 '.awesome-container'에 대한 규칙을 정의하는 데 비효율적인 방법을 사용하고 있음을 알아차리고 다른 스타일에 영향을 미치지 않고 두 선언을 하나로 축소하여 더 많은 바이트를 절약할 수 있습니다.
- 공백(스페이스 및 탭)은 HTML, CSS 및 자바스크립트에서 개발자가 편리하게 이용할 수 있는 항목입니다. 추가 압축 프로그램은 모든 탭과 스페이스를 제거할 수 있습니다.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>


[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

위 단계를 적용하면 페이지가 406자에서 150자로 줄어들어 63%의 압축 절감 효과를 얻게 됩니다. 맞습니다. 이 페이지는 가독성이 그다지 좋지 않지만, 그럴 필요도 없습니다. 원래 페이지를 '개발 버전'으로 유지한 후 페이지를 웹사이트에 릴리스할 준비가 될 때마다 위의 단계를 적용할 수 있습니다.

한 걸음 물러서서 보면, 위의 예시는 중요한 점을 보여줍니다. 임의 텍스트를 압축하도록 설계된 범용 압축 프로그램은 아마도 위의 페이지를 훌륭히 압축할 수 있겠지만, 주석을 제거하거나 CSS 규칙을 축소하는 방법 또는 수십 개의 기타 콘텐츠별 최적화에 대해서는 절대로 알지 못할 것입니다. 이것이 바로 사전 처리/최소화/상황 인식 최적화가 이렇게 강력한 도구가 될 수 있는 이유입니다.

참고: 일례로, JQuery 라이브러리의 압축되지 않은 개발 버전은 현재 300KB에 육박합니다. 이와 동일한 라이브러리이지만 최소화된(주석 제거 등) 라이브러리는 3배 더 작은 100KB 정도입니다.

이와 유사하게, 위에 설명된 기법은 텍스트 기반 자산을 넘어 확장될 수 있습니다. 이미지, 동영상 및 기타 콘텐츠 유형은 모두 고유한 형식의 메타데이터 및 다양한 페이로드를 포함합니다. 예를 들어, 카메라로 사진을 찍을 때마다 사진에는 일반적으로 카메라 설정, 위치 등의 많은 추가 정보도 포함됩니다. 애플리케이션에 따라 이 데이터는 중요할 수도 있고(예: 사진 공유 사이트), 전혀 쓸모가 없을 수도 있습니다. 이 경우에는 제거할 가치가 있는지 여부를 고려해야 합니다. 실제로, 모든 이미지에서 이러한 메타데이터의 크기는 총 수십 킬로바이트일 수 있습니다.

간단히 말하자면, 자산 효율성을 최적화하기 위한 첫 번째 단계로 다양한 콘텐츠 유형에 대한 인벤토리를 빌드하고 해당 크기를 줄이기 위해 적용할 수 있는 콘텐츠별 최적화의 종류를 생각해야 합니다. 그런 후, 적용 가능한 최적화 종류가 무엇인지 파악했으면, 이러한 최적화를 빌드 및 릴리스 프로세스에 추가하여 자동화하고 이 최적화가 적용되도록 보장합니다.

## GZIP을 사용한 텍스트 압축

### TL;DR {: .hide-from-toc }

- GZIP은 텍스트 기반 자산인 CSS, 자바스크립트, HTML에서 최상의 성능을 냅니다.
- 모든 최신 브라우저는 GZIP 압축을 지원하고 이를 자동으로 요청합니다.
- 서버는 GZIP 압축을 활성화하도록 구성되어야 합니다.
- 일부 CDN의 경우 특별히 주의하여 GZIP이 활성화되었는지 확인해야 합니다.

[GZIP](https://en.wikipedia.org/wiki/Gzip)은 모든 바이트 스트림에 적용할 수 있는 범용 압축 프로그램입니다. 이 프로그램은 이전에 표시된 콘텐츠의 일부를 기억하고 중복된 데이터 프래그먼트를 효율적인 방법으로 찾아 바꾸려고 시도합니다. (궁금한 점이 있으면 [GZIP에 대한 자세한 설명](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s)에서 확인해 보세요.) 하지만, 실제로 GZIP은 텍스트 기반 콘텐츠에서 최고의 성능을 나타냅니다. 이는 종종 대규모 파일에 대해 70-90%의 압축율을 실현하지만, 다른 알고리즘을 통해 이미 압축된 자산(예: 대부분 이미지 형식)에 대해 GZIP을 실행할 경우에는 향상이 거의 또는 전혀 이루어지지 않습니다.

모든 최신 브라우저는 GZIP 압축을 지원하고 모든 HTTP 요청에 대해 자동으로 GZIP 압축을 수행합니다. 여러분은 클라이언트로부터 요청이 있을 때 압축된 리소스를 제공하도록 서버가 올바로 구성되었는지 확인해야 합니다.


<table>
<thead>
  <tr>
    <th>라이브러리</th>
    <th>크기</th>
    <th>압축 크기</th>
    <th>압축율</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276KB</td>
  <td data-th="compressed">82KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94KB</td>
  <td data-th="compressed">33KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729KB</td>
  <td data-th="compressed">182KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101KB</td>
  <td data-th="compressed">37KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118KB</td>
  <td data-th="compressed">18KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98KB</td>
  <td data-th="compressed">17KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186KB</td>
  <td data-th="compressed">22KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146KB</td>
  <td data-th="compressed">18KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>


위의 표에서는 가장 인기 있는 자바스크립트 라이브러리와 CSS 프레임워크 중 몇 가지에 대해 GZIP 압축으로 얻을 수 있는 절감 효과를 보여줍니다. 이러한 절감 효과는 60%에서 88% 사이이며, 최소화된 파일(파일 이름에서 '.min'으로 식별됨)과 GZIP을 함께 사용하면 더 큰 절감 효과를 얻을 수 있습니다.

1. **먼저, 콘텐츠별 최적화인 CSS, JS 및 HTML 최소화기(minifier)를 적용합니다.**
2. **GZIP을 적용하여 최소화된 출력을 압축합니다.**

GZIP을 사용하는 것이 가장 단순한 구현과 가장 높은 이점을 제공하는 최적화 중 하나이지만, 많은 사람들이 여전히 이를 구현하지 않습니다. 대부분의 웹 서버가 여러분을 대신하여 콘텐츠를 압축하므로, 여러분은 서버가 GZIP 압축에서 이점을 얻을 수 있는 모든 콘텐츠 유형을 압축하도록 올바르게 구성되었는지 확인하기만 하면 됩니다.

HTML5 상용구 프로젝트에는 가장 인기 있는 모든 서버에 대한 [샘플 구성 파일](https://github.com/h5bp/server-configs)이 각 구성 플래그 및 설정의 상세 주석과 함께 들어 있습니다. 서버에 대한 최적의 구성을 결정하려면 다음을 수행하세요.

- 목록에서 원하는 서버를 찾습니다.
- GZIP 섹션을 검색합니다.
- 서버가 권장 설정으로 구성되었는지 확인합니다.

<img src="images/transfer-vs-actual-size.png" alt="실제 크기와 전송 크기를 비교하여 보여주는 DevTools 데모">

현재 작동 중인 GZIP을 간단하고 빠르게 확인하는 방법은 Chrome DevTools를 열고 Network 패널에서 'Size / Content' 열을 확인하는 것입니다. 'Size'는 자산의 전송 크기를 나타내고, 'Content'는 압축되지 않은 자산 크기를 나타냅니다. 앞서 예시의 HTML 자산에 대해 GZIP은 전송 중에 98.8 KB를 줄였습니다.

참고: 때로는 GZIP이 자산의 크기를 늘리기도 합니다. 일반적으로, 자산이 매우 작고 GZIP 사전의 오버헤드가 압축으로 인해 절감되는 양보다 큰 경우나 리소스가 이미 훌륭히 압축된 경우 그럴 수 있습니다. 이 문제를 피하기 위해 일부 서버에서는 '최소 파일 크기 임계값'을 지정할 수 있습니다.

끝으로, 대부분의 서버는 자산을 사용자에게 제공할 때 이러한 자산을 자동으로 압축하는 반면, 일부 CDN에서는 특별히 주의하고 수작업을 통해 GZIP 자산이 제공되는지 확인해야 합니다. 사이트에 대한 감사를 수행하여 자산이 실제로 [압축되고 있는지](http://www.whatsmyip.org/http-compression-test/) 확인하세요.
