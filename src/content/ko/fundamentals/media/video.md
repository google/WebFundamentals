project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 동영상을 사이트에 추가하고 모든 기기에서 사용자에게 최고의 경험을 제공하는 가장 간단한 방법을 알아봅니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-15 #}

# 동영상 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

사용자는 동영상을 좋아합니다. 동영상은 재미있고 유용한 정보를 제공할 수 있습니다. 휴대기기에서 동영상은
정보를 소비하기에 용이한 방법일 수 있습니다. 그러나 동영상은 대역폭을 차지하며,
모든 플랫폼에서 항상 동일하게 작동하는 것은 아닙니다. 사용자는 동영상이 로드되는
대기 시간을 싫어하며, 재생을 눌렀는데 아무런 반응이 없으면 싫어합니다. 동영상을 사이트에 추가하고
모든 기기에서 사용자에게 최고의 경험을 제공하는 가장 간단한 방법을
알아봅니다.


## 동영상 추가 

### TL;DR {: .hide-from-toc }
- `video` 요소를 사용하여 사이트에서 동영상을 로드하고, 디코딩하고, 재생합니다.
- 다양한 모바일 플랫폼을 포괄하도록 여러 형식으로 동영상을 제작합니다.
- 동영상의 크기를 올바로 지정하여 동영상이 컨테이너를 오버플로하지 않도록 하세요.
- 접근성이 중요합니다. `track` 요소를 `video` 요소의 하위 항목으로 추가합니다.


### 동영상 요소 추가

`video` 요소를 사용하여 사이트에서 동영상을 로드하고, 디코딩하고, 재생합니다.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>이 브라우저에서는 동영상 요소를 지원하지 않습니다.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Your browser does not support the video element.</p>
    </video>
    

### 여러 파일 형식을 지정

모든 브라우저가 동일한 동영상 형식을 지원하는 것은 아닙니다. `<source>` 요소를 사용하면,
사용자의 브라우저가 해당 형식 중 하나를 지원하지 않을 경우
대안으로 여러 형식을 지정할 수 있습니다.

예:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

브라우저가 `<source>` 태그를 파싱할 때, 다운로드하고
재생할 파일을 결정하기 위해 선택 항목인 `type` 속성을 사용합니다. 브라우저가
`WebM`을 지원하면 chrome.webm이 재생되고, 지원하지 않으면
MPEG-4 동영상의 재생이 가능한지 확인합니다.

웹에서 동영상 및 오디오의 작동 방식을 자세히 알아보려면
[A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)를 참조하세요.

이 접근방식은 다른 HTML 또는
서버측 스크립팅을 제공할 때에 비해 특히 모바일에서 여러 가지 이점이 있습니다.

* 개발자가 선호 순서대로 형식을 나열할 수 있습니다.
* 기본 클라이언트측 전환은 지연 시간을 줄여주며, 단 한번의 요청으로
 콘텐츠를 가져옵니다.
* 형식 선택을 브라우저에게 맡기는 것은 사용자 에이전트 감지와 함께
 서버측 지원 데이터베이스를 사용하는 것보다 더 간단하고 빠르고 안정적입니다.
* 각 파일 소스의 유형을 지정하면 네트워크 성능이 개선됩니다.
 브라우저는 해당 형식을 감지하기 위해 동영상의 일부를 다운로드하지 않고도 동영상 소스를 선택할 수 있습니다.

이 모든 사항들은 모바일 상황에서 특히 중요합니다.
모바일에서는 대역폭과 지연 시간이 중요하며 사용자의 인내심도 한계가 있습니다.
유형 속성을 포함시키지 않으면, 지원되지 않는 유형을 가진
여러 소스가 있는 경우 성능에 영향을 미칠 수 있습니다.

모바일 브라우저 개발자 도구를 사용하여, [type 속성이 있는](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external } 네트워크 동작과 [type 속성이 없는](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external } 네트워크 동작을 비교합니다.

또한 브라우저 개발자 도구의 응답 헤더에서
[서버가 올바른 MIME 유형을 보고하는지 확인하세요](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types).
그렇지 않으면 동영상 소스 유형 확인 기능이 작동하지 않습니다.

### 시작 및 종료 시간 지정

대역폭을 절약하고 사이트의 반응성을 더 높여보세요. Media
Fragments API를 사용하여 시작 및 종료 시간을 동영상 요소에 추가해보세요.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>이 브라우저에서는 동영상 요소를 지원하지 않습니다.</p>
</video>

미디어 프래그먼트를 추가하려면 `#t=[start_time][,end_time]`을
미디어 URL에 추가하면 됩니다. 예를 들어, 5 ~ 10초 사이의 동영상을 재생하려면,
다음과 같이 지정합니다.


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

또한 Media Fragments API를 사용하면, 여러 파일을
인코딩하여 제공하지 않고도 동일한 동영상에서 여러 개의 뷰를 제공할 수
있습니다(DVD의 신호 지점과 유사).


Caution: iOS를 제외한 대부분의 플랫폼은 Media Fragments API를 지원합니다. 또한, 서버가 Range Requests를 지원하는지 확인하세요. 기본적으로, 대부분의 서버는 Range Requests를 지원하지만, 일부 호스팅 서비스는 이 기능이 꺼져 있을 수도 있습니다.

브라우저 개발자 도구를 사용하여, 응답 헤더에서 `Accept-Ranges: bytes`를
확인합니다.

<img class="center" alt="Chrome DevTools 스크린샷: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### 포스터 이미지 포함

포스터 속성을 `video` 요소에 추가하면, 사용자가 동영상을 다운로드하거나
재생을 시작하지 않고도, 요소가 로드되는 즉시 콘텐츠를
파악할 수 있습니다.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

또한 동영상 `src`가 깨진 경우나 제공된 동영상 형식이 지원되지 않는 경우,
포스터가 대안이 될 수도 있습니다. 포스터 이미지의 유일한 단점은
추가적인 파일 요청이 필요하며, 이로 인해 대역폭이 소모되고
렌더링이 필요하다는 것입니다. 자세한 내용은 [이미지 최적화](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)를 참조하세요.

다음은 포스터 이미지가 없는 동영상과 있는 동영상을 나란히 비교한 것입니다. 동영상이 아님을 보여주기 위해 포스터 이미지를 회색 처리했습니다.

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome 스크린샷, 세로 모드: 포스터 없음" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Android Chrome 스크린샷, 세로 모드: 포스터 없음
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome 스크린샷, 세로 모드: 포스터 있음" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Android Chrome 스크린샷, 세로 모드: 포스터 있음
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## 이전 플랫폼에 대안을 제공 

모든 동영상 형식이 모든 플랫폼에서 지원되는 것은 아닙니다. 주요 플랫폼에서
어떤 형식이 지원되는지 확인하고, 여러분의 동영상이 이들 형식에서
잘 작동하는지 확인하세요.


### 어떤 형식이 지원되는지 확인 {: #check-formats }

`canPlayType()`을 사용하여 어떤 동영상 형식이 지원되는지 알아봅니다. 이 메서드는
`mime-type`과 선택 항목인 코덱으로 구성된 문자열 인수를 취하며,
다음 값 중 하나를 반환합니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">반환 값 및 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(빈 문자열)</td>
      <td data-th="Description">컨테이너 및/또는 코덱이 지원되지 않습니다.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        컨테이너 및 코덱이 지원될 수도 있지만, 확인을 위해
브라우저가 일부 동영상을 다운로드해야 합니다.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">형식이 지원되는 것으로 보입니다.
      </td>
    </tr>
  </tbody>
</table>

다음은 Chrome에서 실행될 때 `canPlayType()` 인수 및 반환 값의
몇 가지 예입니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">유형 및 응답</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(빈 문자열)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(빈 문자열)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(빈 문자열)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### 여러 형식으로 동영상 제작

동일한 동영상을 다른 형식으로 저장할 수 있는 다양한 도구들이 있습니다.

* 데스크톱 도구: [FFmpeg](//ffmpeg.org/)
* GUI 애플리케이션: [Miro](http://www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* 온라인 인코딩/트랜스코딩 서비스:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### 사용된 형식 확인

어떤 동영상 형식이 브라우저에서 실제로 선택되었는지 알고 싶으세요?

자바스크립트에서는 사용된 소스를 반환하기 위해 동영상의 `currentSrc` 속성을 사용합니다.



## 동영상의 크기를 올바로 지정 

파일 크기는 사용자의 만족도를 높여주는 중요한 요소입니다.


### TL;DR {: .hide-from-toc }
- 플랫폼이 처리할 수 있는 용량보다 더 큰 프레임이나 더 높은 화질의 동영상을 제공하지 마세요.
- 불필요하게 동영상을 길게 만들지 마세요.
- 동영상이 길면 다운로드와 탐색 중에 끊김이 발생할 수 있습니다. 일부 브라우저는 동영상이 다운로드될 때까지 기다렸다가 재생을 시작할 수도 있습니다.


### 동영상 크기 확인

인코딩 시에, 실제 동영상 프레임 크기가
동영상 요소 크기와 다를 수도 있습니다(이미지가 실제 크기로
표시되지 않는 것과 마찬가지).

동영상의 인코딩 크기를 확인하려면, 동영상 요소 `videoWidth`
및 `videoHeight` 속성을 사용합니다. `width` 및 `height`는 동영상 요소의 크기를 반환합니다.
이 요소는 CSS 또는 인라인 너비 및 높이 특성을 사용하여
크기가 지정되었을 수 있습니다.

### 동영상이 컨테이너를 오버플로하지 않도록 보장

동영상 요소가 뷰포트에 비해 너무 큰 경우
컨테이너를 오버플로할 수 있습니다. 그러면 사용자가 콘텐츠를 볼 수 없거나 컨트롤을
사용하지 못할 수 있습니다.

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome 스크린샷, 세로 모드: 스타일이 지정되지 않은 동영상 요소가 뷰포트를 오버플로" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Android Chrome 스크린샷, 세로 모드: 스타일이 지정되지 않은 동영상 요소가 뷰포트를 오버플로
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome 스크린샷, 가로 모드: 스타일이 지정되지 않은 동영상 요소가 뷰포트를 오버플로" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Android Chrome 스크린샷, 가로 모드: 스타일이 지정되지 않은 동영상 요소가 뷰포트를 오버플로
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

자바스크립트 또는 CSS를 사용하여 동영상 크기를 제어할 수 있습니다. 자바스크립트 라이브러리와
플러그인(예: [FitVids](http://fitvidsjs.com/))을 사용하면
YouTube 및 기타 소스의 Flash 동영상에 대해서도 적절한 크기와
가로세로 비율을 유지할 수 있습니다.

[CSS 미디어 쿼리](/web/fundamentals/design-and-ux/responsive/#css-media-queries)를 사용하여 뷰포트 크기에 따라 요소의 크기를 지정하세요. `max-width: 100%`가 기본값입니다.

iframe에 있는 미디어 콘텐츠의 경우(예: YouTube 동영상),
반응형 접근방식을 시도해 보세요([John Surdakowski의 제안](http://avexdesigns.com/responsive-youtube-embed/)과 유사).


Caution: 원래 동영상과 가로세로 비율이 달라지므로, 요소의 크기를 강제로 조정하지 마세요. 찌그러지거나 늘어난 모양은 보기 좋지 않습니다.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

[반응형 샘플](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }을
[비반응형 샘플](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external }과 비교해 보세요.


## 동영상 플레이어 사용자설정

플랫폼이 다르면 동영상도 다르게 표시됩니다. 모바일 솔루션에서는
기기의 방향을 고려해야 합니다. Fullscreen API를 사용하여 동영상 콘텐츠의
전체 화면 보기를 제어하세요.


### 여러 기기에서 기기의 방향 작동 방식

데스크톱 모니터나 노트북에서는 기기 방향이 문제가 되지 않지만,
모바일 및 태블릿용으로 웹페이지 디자인을 고려할 때는 기기 방향이 매우 중요합니다.

iPhone의 Safari에서는 세로 모드 방향과 가로 모드 방향이
훌륭하게 전환됩니다.

<div class="attempt-left">
  <figure>
    <img  alt="iPhone의 Safari에서 재생되는 동영상의 스크린샷, 세로 모드" src="images/iPhone-video-playing-portrait.png">
    <figcaption>iPhone의 Safari에서 재생되는 동영상의 스크린샷, 세로 모드</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="iPhone의 Safari에서 재생되는 동영상의 스크린샷, 가로 모드" src="images/iPhone-video-playing-landscape.png">
    <figcaption>iPhone의 Safari에서 재생되는 동영상의 스크린샷, 가로 모드</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Android의 iPad 및 Chrome에서는 기기 방향이 문제가 될 수 있습니다.
예를 들어, 사용자설정 기능이 없다면 iPad에서
가로 모드 방향으로 재생되는 동영상은 다음과 같습니다.

<img alt="iPad Retina의 Safari에서 재생되는 동영상의 스크린샷, 가로 모드"
src="images/iPad-Retina-landscape-video-playing.png">

CSS에서 동영상을 `width: 100%` 또는 `max-width: 100%`로 설정하면
상당수의 기기 방향 레이아웃 문제를 해결할 수 있습니다. 또한
전체 화면을 대안으로 고려할 수도 있습니다.

## 인라인 또는 전체 화면 표시

<img class="attempt-right" alt="iPhone에서 동영상 요소의 스크린샷, 세로 모드" src="images/iPhone-video-with-poster.png">

플랫폼이 다르면 동영상도 다르게 표시됩니다. iPhone의 Safari에서는
동영상 요소를 인라인으로 웹페이지에 표시하지만, 동영상 재생은 전체 화면 모드에서 수행합니다.

<div style="clear:both;"></div>

<img class="attempt-right" alt="Android의 Chrome에서 재생되는 동영상의 스크린샷, 세로 모드" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Android에서 사용자는 전체 화면 아이콘을 클릭하여 전체 화면 모드를
요청할 수 있습니다. 그러나 기본값은 동영상을 인라인으로 재생하는 것입니다.

<div style="clear:both;"></div>

<img class="attempt-right" alt="iPad Retina의 Safari에서 재생되는 동영상의 스크린샷, 가로 모드" src="images/iPad-Retina-landscape-video-playing.png">

iPad의 Safari에서는 동영상을 인라인으로 재생합니다.

<div style="clear:both;"></div>

### 콘텐츠의 전체 화면 표시 제어

전체 화면 동영상 재생을 강제하지 않는 플랫폼에서는 Fullscreen API가
[널리 지원됩니다](http://caniuse.com/#feat=fullscreen). 이 API를 사용하여
콘텐츠 또는 페이지의 전체 화면 표시를 제어합니다.

동영상과 같은 요소를 전체 화면에 표시하려면 다음과 같이 합니다.

    elem.requestFullScreen();
    

전체 문서를 전체 화면에 표시하려면 다음과 같이 합니다.

    document.body.requestFullScreen();
    

또한 전체 화면 상태의 변화를 수신 대기할 수도 있습니다.

    video.addEventListener("fullscreenchange", handler);
    

아니면, 요소가 현재 전체 화면 모드에 있는지 확인하세요.

    console.log("In full screen mode: ", video.displayingFullscreen);
    

또한 CSS `:fullscreen` 의사 클래스를 사용하면 요소가 전체 화면
모드에서 표시되는 방식을 변경할 수 있습니다.

<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>이 브라우저에서는 동영상 요소를 지원하지 않습니다.</p>
</video>

Fullscreen API를 지원하는 기기에서는, 썸네일
이미지를 동영상의 자리표시자로 사용해보세요.

실제 동작을 보려면, [데모](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }를 확인하세요.

Dogfood: `requestFullScreen()`은 공급업체에서 프리픽스될 수도 있으며, 브라우저 간의 완벽한 호환성을 위해 추가적인 코드가 필요할 수 있습니다.

<div style="clear:both;"></div>




## 접근성이 중요합니다

접근성은 어떤 기능이 아닙니다. 보거나 들을 수 없는 사용자는 캡션이나 설명 없이는 동영상을 전혀 경험할 수가 없습니다. 이들 사용자가 겪는 어려움에 비한다면 캡션이나 설명을 동영상에 추가하는 시간은 사소한 것입니다. 모든 사용자들에게 최소한의 기본적인 환경을 제공하세요.


### 접근성 향상을 위해 캡션 포함

<img class="attempt-right" alt="Android상의 Chrome에서 트랙 요소를 사용하여 표시된 캡션을 보여주는 스크린샷" src="images/Chrome-Android-track-landscape-5x3.jpg">

모바일에서 미디어의 접근성을 향상시키려면, 트랙 요소를 사용하여
자막 또는 설명을 포함하세요.

<div style="clear:both;"></div>

### 트랙 요소 추가

캡션을 동영상에 추가하는 것은 매우 쉽습니다.
그냥 트랙 요소를 동영상 요소의 하위 항목으로 추가하면 됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

트랙 요소 `src` 속성은 트랙 파일의 위치를 지정합니다.

## 트랙 파일에 캡션 정의

트랙 파일은 WebVTT 형식의 시간 '신호'로 구성됩니다.

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

Dogfood: 데스크톱에서 트랙 요소는 Android용 Chrome, iOS Safari 그리고 Firefox를 제외한 모든 최신 브라우저에서 지원됩니다([caniuse.com/track](http://caniuse.com/track) 참조). 또한 여러 가지 폴리필을 사용할 수도 있습니다. [Captionator](http://captionatorjs.com/){: .external }를 권장합니다.




## 빠른 참조

### 동영상 요소 속성

동영상 요소 속성과 그 정의에 대한 전체 목록은
[동영상 요소 사양](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)을 참조하세요.

<table>
  <thead>
    <tr>
      <th>속성</th>
      <th>지원</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">모든 브라우저</td>
      <td data-th="Description">동영상의 주소(URL)</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">모든 브라우저</td>
      <td data-th="Description">동영상 콘텐츠를 다운로드할 필요가 없이 동영상 요소가 표시되자마자 브라우저에 나타날 수 있는 이미지 파일의 주소(URL)입니다.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">모든 모바일 브라우저는 preload를 무시합니다.</td>
      <td data-th="Description">재생하기 전에 메타데이터(또는 일부 동영상)를 사전 로드하도록 브라우저에 알려줍니다. 옵션은 none, metadata 또는 auto입니다(자세한 내용은 <a href="#preload">사전 로드</a> 섹션 참조). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">iPhone 또는 Android에서는 지원되지 않으며, 모든 데스크톱 브라우저, iPad, Firefox와 Android용 Opera에서는 지원됩니다.</td>
      <td data-th="Description">최대한 빨리 다운로드와 재생을 시작합니다(자세한 내용은 <a href="#autoplay">자동 재생</a> 섹션 참조).</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">모든 브라우저</td>
      <td data-th="Description">동영상을 반복합니다.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">모든 브라우저</td>
      <td data-th="Description">기본 동영상 컨트롤을 표시합니다(재생, 일시 중지 등).</td>
    </tr>
  </tbody>
</table>

### 자동 재생 {: #autoplay }

데스크톱의 경우 `autoplay`는 동영상을 즉시 다운로드하여 재생하도록 브라우저에 알려줍니다. iOS와 Android용 Chrome의 경우 `autoplay`가 작동하지 않으며, 동영상을 재생하려면 사용자가 화면을 탭해야 합니다.

자동 재생 기능이 가능한 플랫폼이라도
이 기능을 사용하는 것이 적절한지 여부를 고려해야 합니다.

* 데이터 사용은 많은 비용이 들 수 있습니다.
* 미리 물어보지 않고 미디어가 다운로드와 재생을 시작한다면,
대역폭과 CPU 사용량이 갑자기 증가할 수 있고 이로 인해 페이지 렌더링이 지연될 수 있습니다.
* 동영상 또는 오디오 재생이 사용자에게 방해가 되는 경우가 있을 수 있습니다.

자동 재생 동작은 
[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean))를 통해 Android WebView에 구성될 수 있으며,
기본값은 true이지만 WebView 앱에서 이 설정을 해제할 수 있습니다.

### 사전 로드 {: #preload }

`preload` 속성은 사전 로드할 정보나 콘텐츠의 크기를 
브라우저에 알려줍니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">값 및 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">사용자가 동영상을 못볼 수도 있습니다. 아무것도 사전 로드하지 않습니다.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">최소한의 동영상과 함께 메타데이터(기간, 크기, 텍스트 트랙)를 사전 로드합니다.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">전체 동영상을 즉시 다운로드하는 것이 바람직한 것으로 여겨집니다.</td>
    </tr>
  </tbody>
</table>

다른 플랫폼에서는 `preload` 속성의 효과가 다릅니다.
예를 들어, Chrome의 경우 데스크톱에서 25초의 동영상을 버퍼링하지만 iOS 또는
Android에서는 전혀 버퍼링이 없습니다. 즉, 데스크톱에는 발생하지 않는 재생 시작 시 지연이 모바일에는
발생할 수도 있습니다.
자세한 내용은 [Steve Souder의 테스트 페이지](//stevesouders.com/tests/mediaevents.php)를
참조하세요.

### 자바스크립트

[HTML5 Rocks 동영상 문서](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)에
동영상 재생을 제어하는 데 사용되는 자바스크립트 속성, 메서드 및 이벤트에 대해
간략히 설명되어 있습니다. 이 문서의 내용을 여기에 포함해 두었으며,
관련이 있는 경우 이 문서의 내용을 모바일 관련 사항으로 업데이트했습니다.

#### 속성

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">속성 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">재생 위치를 초 단위로 가져오거나 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">동영상의 현재 볼륨 수준을 가져오거나 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">오디오 음소거를 가져오거나 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">재생 속도를 가져오거나 설정합니다. 1은 정방향 보통 속도를 나타냅니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">동영상이 얼마나 버퍼링되어 재생 준비가 되었는지에 대한 정보입니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">재생 중인 동영상의 주소입니다.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">픽셀 단위의 동영상 너비입니다(이 너비는 동영상 요소 너비와는 다를 수 있음).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">픽셀 단위의 동영상 높이입니다(이 높이는 동영상 요소 높이와는 다를 수 있음).</td>
    </tr>
  </tbody>
</table>

모바일에서는 `playbackRate`([데모 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }) 또는 `volume`이 지원되지 않습니다.

#### 메서드

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">메서드 및 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">재생을 시작하지 않고 동영상 소스를 로드하거나 다시 로드합니다(예: 자바스크립트를 사용하여 동영상 소스가 변경된 경우).</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">동영상을 현재 위치에서 재생합니다.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">동영상을 현재 위치에서 일시 중지합니다.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">어떤 형식이 지원되는지 알아봅니다(<a href="#check-formats">어떤 형식이 지원되는지 확인</a> 참조).</td>
    </tr>
  </tbody>
</table>

모바일(Android의 Opera는 제외)의 경우 버튼 클릭 등의
사용자 액션에 응답하여 호출되어야만 `play()` 및 `pause()`가 작동합니다.
[데모](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }를 참조하세요.
(마찬가지로, 삽입된 YouTube 동영상 등의 콘텐츠에 대해 재생을 시작할 수
없습니다.)

#### 이벤트

다음은 발생할 수 있는 미디어 이벤트의 일부에 불과합니다. 전체 목록에 대해서는
Mozilla 개발자 네트워크의 [미디어 이벤트](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
페이지를 참조하세요.

<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">이벤트 및 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">브라우저가 동영상을 중단없이 끝까지 재생할 수 있다고 판단할 만큼 데이터가 충분한 경우 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">동영상의 재생이 끝난 경우 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">오류가 발생하는 경우 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">동영상 재생이 처음 시작되거나 일시 중지 후 다시 시작되는 경우 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">다운로드 진행률을 나타내기 위해 주기적으로 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">다른 작업이 완료되길 기다리며 작업이 지연되는 경우 실행됩니다.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">브라우저가 동영상 메타데이터(기간, 크기 및 텍스트 트랙)의 로드를 마친 경우 실행됩니다.</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
