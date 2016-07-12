---
title: "인코딩과 텍스트 기반 리소스의 전송 크기 최적화 하기"
description: "불필요한 리소스 다운로딩을 하지 않는 것과 함께, 페이시 로딩 속도를 향상 시킬 수 있는 최선의 방법은 리소스을 최적화 하고 압축하여 전체적인 다운로드 사이즈를 최소화 하는 것입니다."
updated_on: 2015-10-06
translation_priority: 0
translators:
  - captainpangyo
key-takeaways:
  compression-101:
    - 압축은 적은 비트수를 이용하여 정보를 인코딩하는 과정.
    - 불필요한 데이터를 제거하는 것은 최고의 결과를 낳는다.
    - 압축 기술과 압축 알고리즘은 무수히 많다.
    - 최적의 압축을 하려면 여러가지 기술을 혼용해야 한다.
  minification:
    - 특정 컨텐츠 최적화는 전송하려는 리소스의 상당한 양을 줄일 수 있다.
    - 특정 컨텐츠 최적화는 개발/배포 싸이클에 가장 잘 적용될 수 있다.
  text-compression:
    - GZIP은 CSS, Javascript, HTML와 같은 텍스트 기반 리소스에서 가장 잘 수행된다.
    - 대부분의 최신 브라우저들은 GZIP 압축을 지원하고 자동으로 요청한다.
    - GZIP 압축을 사용할 수 있도록 서버를 구성해야 한다.
    - 몇몇의 CDNs는 GZIP 사용을 위한 추가적인 관리가 필요하다.
notes:
  jquery-minify:
    - "압축이 안된 JQuery 라이브러리는 현재 300KB 정도 크기다. 동일한 라이브러리로 압축된 버전(주석제거 등)은 약 3배 정도 작다: ~100KB."
  gzip:
    - "믿거나 말거나, GZIP가 리소스의 크기를 늘릴 수 있는 경우가 있다. 일반적으로, 리소스이 매우 작거나 GZIP 사전의 오버헤드가 압축으로 절약할 수 있는 양보다 높을 경우 일어난다, 또한 만약 리소스이 이미 잘 압축이 되어 있는 경우도 포함된다. 몇몇 서버는 이러한 문제를 방지하기 위해 “최소 파일 크기 한계점” 을 정의하도록 요구한다."
---

<p class="intro">
  불필요한 리소스 다운로딩을 하지 않는 것과 함께, 페이시 로딩 속도를 향상 시킬 수 있는 최선의 방법은 리소스을 최적화 하고 압축하여 전체적인 다운로드 사이즈를 최소화 하는 것입니다.
</p>

{% include shared/toc.liquid %}

## 데이터 압축 101

일단 불필요한 리소스들을 제거하고 나면, 다음 단계는 브라우저가 다운 받아야 하는 전체적인 리소스의 양을 줄이는 것입니다 - 예를 들어, 압축하기. 리소스의 타입에 따라서 - 텍스트, 이미지, 폰트 등 - 처리하는데 다른 여러가지의 기술들이 있습니다: 서버에서 사용 가능한 일반적인 툴들, 특정 컨텐츠 타입을 위한 전처리 최적화 방법, 개발자의 입력이 필요한 특정 리소스 최적화 등

최적의 퍼포먼스를 내기 위해서는 이 기술들의 조합이 필요합니다.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

데이터의 크기를 줄이는 과정은 "데이터 압축"으로 알려져 있습니다. 그리고 이 분야는 많은 연구가 필요한 분야입니다. 많은 사람들이 알고리즘, 기술, 압축 비율, 압축 스피드, 다양한 압축툴의 메모리를 개선하기 위해서 자신들의 커리어를 바칩니다. 말할 것도 없이, 이 주제에 대한 전반적인 토론은 여기서 다루지 않습니다, 하지만 높은 레벨에서 어떻게 압축이 이뤄지고, 페이지에서 요청하는 다양한 리소스들의 사이즈를 줄이는 기술들에 대해서 이해하는 것은 매우 중요합니다.

이 기술들이 실제로 어떻게 일어나는지 주요 원리를 설명하기 위해서, 아래 예제를 통해 어떻게 우리가 간단한 텍스트 메시지 형식을 최적화 할 수 있는지 살펴봅시다.

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. 메시지는 #로 표시된 임의의 어노태이션들을 포함합니다. 어노태이션은 이 메시지의 어떤 의미나 동작에 영향을 끼치지 않습니다.
1. 메시지는 키 - 값 쌍으로 이루어진 헤더들을 포함합니다. 그리고 이것은 메시지의 시작부에 위치합니다.
1. 메시지는 텍스트 페이로드를 포함합니다.

현재 200 글자 길이인 위 메시지 크기를 줄이기 위해 어떤 것을 할 수 있을까요?

1. 주석들이 흥미롭기는 하지만, 이 메시지는 의미가 없다는 것을 우리는 알고 있습니다. 따라서, 메시지를 전송할 때, 이 부분을 제거합니다.
1. 헤더를 인코딩 하기 위한 몇가지 효율적인 방법이 있을 수 있습니다. 예를 들어, 메시지가 형식이나 날짜를 항상 포함할 지는 모르지만, 그 것들을 짧은 정수 ID로 변환하고 송신할 수 있습니다. 이처럼, 우리는 아직 확실하지 않기 때문에, 현재 이상태로 잠시 놔두도록 하겠습니다.
1. 페이로드는 텍스트 형식만 가능합니다. "시크릿 메시지" 형태기 때문에 우리는 정확히 그 내용이 무엇인지 알지 못합니다. 단순히 텍스트 형태만 봤을 때는 중복이 많은 것을 확인할 수 있습니다. 아마 우리가, 반복적인 문자들을 보내는 것 대신에, 반복 문자의 수를 세고 그 문자들을 효율적으로 인코딩 할 수 있지 않을까요?
    * 예를 들어, "AAA" 를 "3A" 라고 하거나 3개 A의 순서로 인코딩

이 기술들을 조합하여 아래와 같은 결과가 나왔습니다.

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

이 새로운 메시지의 문자수는 56입니다. 이 것은 기존 메시지의 72%를 압축한 것을 의미합니다. 나쁘지 않습니다, 모든 것이 고려가 되었고, 우린 이제 막 시작했거든요.

물론, 호기심이 생길지 모릅니다. 이 모든 것이 좋아보이지만, 이게 과연 어떻게 페이지의 최적화에 영향을 미칠까요? 한가지 확실한 것은 우리는 우리만의 압축 알고리즘을 만들진 않을 것입니다. 그럴 것인가요? 정답은 아니요 입니다. 이러한 방법처럼, 우리는 우리 페이지의 다양한 리소스들을 압축할 때, 정확히 같은 기술방식과 사고를 사용할 것입니다: 전처리, 특정 컨텍스트 최적화, 다른 컨텐츠를 위한 다른 알고리즘 등


## 최소화: 전처리 & 특정 컨텍스트 최적화

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

불필요한 데이터와 중복 데이터를 압축하는 최선의 방법은 그 것들을 모두 제거하는 것입니다. 물론, 우리가 그냥 임의의 데이터를 지울 수는 없습니다. 하지만, 특정 데이터 형식과 속성을 알 수 있는 특정 컨텍스트에서, 실제 의미에 영향을 주지 않고도 페이로드의 크기를 상당하게 줄일 수 있습니다.

{% include_code src=_code/minify.html snippet=full %}

위 간단한 HTML 페이지를 보면, HTML 마크업, CSS 스타일, Javascript 와 같이 세개의 다른 컨텐츠 타입이 포함되어 있습니다. HTML 마크업, CSS 규칙, Javascript 콘텐츠를 유효하게 하려면 각기 다른 규칙들을 사용합니다, 주석처리와 기타도 마찬가지입니다. 우리가 어떻게 이 페이지의 크기를 줄일 수 있을까요?

* 코드 주석은 개발자들의 가장 친한 친구입니다. 하지만 브라우저가 이 것들을 볼 필요는 없습니다. CSS (`/* … */`), HTML (`<!-- … -->`), and JavaScript (`// …`) 와 같은 주석들을 제거해버리면 페이지의 크기의 상당량을 줄일 수 있습니다.
* "똑똑한" CSS 압축기는 우리가 비효율적인 방식으로 ‘.awesome-container’ 에 대한 스타일 규칙을 정의한 것을 알 수 있습니다. 두개로 나눠진 스타일을 한개로 합치게 되면 다른 스타일 규칙에 영향을 주지 않고도, 바이트 숫자를 줄일 수 있습니다.
* 공백 (스페이스와 탭)은 HTML, CSS, Javascript 등에서 편의를 위해서 사용됩니다. 압축기에서는 추가적으로 이 공백들을 모두 제거할 수 있습니다.

^
{% include_code src=_code/minified.html snippet=full %}

위 스텝들을 적용하고 나니, 페이지의 문자수가 406에서 150으로 감소되었습니다 - 약 63%의 압축이 된 것이다! 분명히, 이건 가독성이 좋지 않습니다. 하지만, 꼭 가독성을 고려할 필요는 없습니다: 원래의 페이지를 "개발용" 으로 유지하고, 우리가 페이지를 웹사이트에 릴리즈 할 때 마다 위 스텝처럼 최적화 작업을 하면 됩니다.

한 스텝 뒤로 가서, 위 예제는 주요점을 시사합니다: 압축기의 일반적인 목표 - 임의의 텍스트를 압축하기 위해 설계된 압축기 - 가 페이지 압축을 충분히 수행할 수 있다는 것입니다. 하지만, 그 압축기가 주석을 없애거나, 불필요한 CSS 규칙 분할을 막거나, 특정 컨텐츠 최적화들을 하는지는 확인할 수 없을 것입니다. 이러한 이유로, 전처리 / 최소화 / 특정 컨텍스트 최적화 등의 기능들이 합쳐지면 막강한 툴이 될 수 있을 것입니다.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

유사하게, 위 기술들이 텍스트 기반의 리소스을 넘어 이미지, 비디오, 메타데이터와 다양한 페이로드를 포함하고 있는 다른 컨텐츠 형식에도 적용될 수 있습니다. 예를 들면, 당신이 카메라로 사진을 찍을 때 마다, 사진은 일반적으로 많은 정보들을 포함하고 있습니다: 카메라 설정, 위치, 등등. 당신의 어플리케이션에 따라서, 이 데이터가 매우 중요하거나 (예. 사진 공유 사이트) 아니면 완전히 필요가 없을 수 있기 때문에 이것을 제거해야 하는지 고민해야 합니다. 실제로, 이 메타데이터가 모든 이미지마다 몇십 키로 바이트의 사이즈를 추가할 수 있습니다.

간단히 말해서, 효율적인 리소스 최적화의 첫 번째 단계는 다른 컨텐츠 형식들을 저장하는 인벤토리를 만드는 것입니다. 그리고, 리소스의 크기를 줄이기 위해 어떤 특정 컨텐츠를 최적화 할 것인지 고민합니다- 그렇게 함으로써 상당한 양을 줄일 수 있습니다. 그리고 나서, 그것들이 어떤 방법들인지 파악하고 나면, 이 최적화 방법들을 자동화하여 당신의 빌드와 배포 과정에 추가합니다 - 이 것이 최적화 기법을 올바르게 사용하는 유일한 방법입니다.

## GZIP을 이용한 텍스트 압축

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](https://en.wikipedia.org/wiki/Gzip) 는 어떤 바이트 스트림에도 적용될 수 있는 일반적인 압축기 입니다: 기본 구현 방식은, 이전에 본 컨텐츠를 기억하여 중복 데이터 프레그먼트를 찾아 효율적으로 교체하는 것입니다 - 궁금하다면 이 링크를 참조하세요, [great low-level explanation of GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). 그러나, 실제로 GZIP은 텍스트 기반 컨텐츠에서 가장 잘 수행합니다, 종종 더 큰 파일들에 대해 70-90% 의 압축비율을 보입니다. 반면에 이미 다른 알고리즘을 이용하여 압축된 리소스(예. 대부분의 이미지 형식)들에 대해 GZIP을 수행하면, 결과가 개선되지 않을 수 있습니다.

모든 최신 브라우저들은 모든 HTTP 요청에 대한 GZIP 압축을 지원합니다: 우리의 할 일은 클라이언트의 요청을 받았을 때, 서버가 압축된 리소스을 다룰 수 있도록 적절하게 서버를 구성하는 것 입니다.


<table class="mdl-data-table mdl-js-data-table">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Library</th>
    <th>Size</th>
    <th>Compressed size</th>
    <th>Compression ratio</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

위 테이블은 가장 유명한 몇 개의 Javscript 라이브러리와 CSS 프레임워크에 GZIP 압축을 수행한 결과를 나타냅니다. 압축을 통해 60 에서 88% 정도 크기가 줄어들었고, 심지어 이미 최소화 되어 있던 파일 (".min" 확장자를 지닌 파일) 도 더 많은 크기가 줄어들었습니다.

1. **특정 컨텐츠 최적화를 먼저 적용합니다: CSS, JS, and HTML 최소화기.**
1. **GZIP으로 최소화된 파일들을 압축합니다.**

훌륭한 점은 GZIP을 이용하면 구현하는 부분에 있어 매우 간단하면서도 최고 효율의 최적화를 할 수 있다는 점입니다- 아쉽게도, 많은 사람들이 GZIP을 구현하지 않습니다. 대부분의 웹 서버들은 당신을 대신하여 컨텐츠를 압축하기 때문에, 당신은 단지 서버가 GZIP 압축에서 혜택을 보면서도 적절하게 압축할 수 있도록 구성해주면 됩니다.

당신의 서버를 위해서 어떤 설정이 가장 나을까요? HTML5 보일레플레이트 프로젝트는 가장 대중적인 서버들의 설정파일 샘플과, 설정 값, 설정 방식에 대한 자세한 주석까지 포함하고 있습니다: 해당 리스트에서 당신이 좋아하는 서버를 찾아보세요, 그리고 GZIP 섹션을 살펴보세요, 추천받은 설정대로 서버가 구성되어 있는지 확인해보세요.

<img src="images/transfer-vs-actual-size.png" class="center" alt="DevTools demo of actual vs transfer size">

GZIP의 실행을 확인하는 가장 쉽고 빠른 방법은 Chrome DevTools에서 Network Panel에 있는 "Size / Content" 줄을 확인하면 됩니다: "Size" 는 리소스의 전송 크기를 의미하고, "Content"는 압축되지 않은 리소스의 크기를 의미합니다. 위 그림의 HTML을 보면, GZIP이 전송하는 동안 98.8KB을 절약한 것을 확인할 수 있습니다.

{% include shared/remember.liquid list=page.notes.gzip %}

마지막으로 주의할 점 : 대부분의 서버들이 사용자에게 서비스를 제공할 때, 자동적으로 리소스들을 압축하는 반면에, 몇몇 CDNs 는 GZIP 리소스이 제공될 수 있도록 추가적인 관리와 수작업이 필요합니다. 당신의 사이트를 점검해보고, 리소스들이 올바르게 압축되고 있는지 한번 확인해보세요!
