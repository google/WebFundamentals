project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 사이트에 수많은 이미지와 동영상이 있지만 이를 줄이고 싶지 않다면, 지연 로딩이 초기 페이지 로드 시간을 향상하고 페이지당 페이로드를 낮추는 데 가장 적합한 기술일 수 있습니다.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# 이미지 및 동영상의 지연 로딩 {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

웹사이트의 통상적인 페이로드 내
[이미지](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)
및 [동영상](http://beta.httparchive.org/reports/page-weight#bytesVideo)의 비율은
상당합니다. 안타깝게도 프로젝트
이해관계자가 기존 애플리케이션에서 미디어 리소스를 줄이고
싶어하지 않을 수 있습니다. 이러한 교착 상태는 특히 모든 관련 당사자가
사이트 성능 향상을 원하지만 그 방법에 대해서는 합의하지 못했을 때 답답할 수 있습니다.
다행히도 지연 로딩은 초기 페이지 페이로드_및_
로드 시간을 줄이면서도 콘텐츠를 풍부하게 유지하는 해결 방법을 제공합니다.

## 지연 로딩이란 무엇입니까?

지연 로딩은 페이지
로드 시간에 중요하지 않은 리소스의 로딩을 늦추는 기술입니다. 그 대신 중요하지 않은 리소스는 필요한 순간에
로드됩니다. 이미지의 경우, "중요하지 않은 것"이란 보통
"화면 밖"과 같은 의미를 갖습니다. Lighthouse를 이용했으며 개선을 위해 몇 가지
기회를 검토했다면, [화면 밖 이미지
감사](/web/tools/lighthouse/audits/offscreen-images)의 양식으로 해당 범위의 몇 가지
지침을 본 적이 있을 것입니다.

<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Lighthouse의 화면 밖 이미지
감사 스크린샷.">
  <figcaption><b>그림 1</b>. Lighthouse의 성능 감사 중 하나는 지연 로딩 후보인 화면 밖 이미지를
식별하는 것입니다.</figcaption>
</figure>

이미 지연 로딩이 실행되는 것을 본 적이 있을 것입니다. 지연 로딩은 다음과
같이 진행됩니다.

- 페이지에 도달하여 콘텐츠를 읽으면서 스크롤을 시작합니다.
- 특정 지점에서 자리표시자 이미지를 표시 영역으로 스크롤합니다.
- 자리표시자 이미지가 순간 최종 이미지로 교체됩니다.

이미지 지연 로딩의 예는 유명한 퍼블리싱 플랫폼인
[Medium](https://medium.com/)에서 찾을 수 있습니다. 페이지 로드 시
가벼운 자리표시자 이미지를 로드하고, 표시 영역으로 스크롤되었을 때 지연 로딩된 이미지로
교체합니다.

<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="브라우징 중의
Medium 웹사이트 스크린샷. 지연 로딩의 실행을 보여줍니다. 블러 처리된
자리표시자가 왼쪽에 있고, 로드된 리소스가 오른쪽에 있습니다.">
  <figcaption><b>그림 2</b>. 실행 중인 이미지 지연 로딩의 예. 자리표시자
이미지가 페이지 로드 시에 로드되고(왼쪽),
표시 영역으로 스크롤 되었을 때 필요한 순간에 최종 이미지가 로드됩니다.</figcaption>
</figure>

지연 로딩이 친숙하지 않다면 이 기술이 얼마나
유용하며 그 이점은 무엇인지 궁금할 것입니다. 읽고 알아보세요!

## 이미지 또는 동영상을 그냥_로딩_하는 대신 지연 로드하는 이유는 무엇인가요?

사용자가 절대 볼 일이 없는 것을 로딩하고 있을 수 있기 때문입니다. 이것이 문제가 되는
이유에는 몇 가지가 있습니다.

- 데이터를 낭비합니다. 사용자가 실제로 볼 다른 리소스 다운로드에 필요한 귀중한
대역폭을 사용하기는 하지만, 무제한 연결에서는 이것이
최악의 일은 아닙니다. 하지만, 데이터 제한
요금제에서는 사용자가 절대 볼 일이 없는 리소스의 로딩은
비용의 낭비입니다.
- 처리 시간, 배터리, 기타 시스템 리소스를 낭비합니다. 미디어 리소스가
다운로드된 후, 브라우저는 반드시 이 콘텐츠를
표시 영역으로 디코딩 및 렌더링해야 합니다.

이미지와 동영상을 지연 로드할 때, 성능에 긍정적인 영향을 미치는 초기 페이지 로드 시간, 초기
페이지 가중치, 시스템 리소스 사용량을
줄일 수 있습니다. 이 지침에서는 일부 기술을 다루고, 이미지 및 동영상의
지연 로딩 및 [자주 사용되는
라이브러리](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries)에 관한 지침을 제공합니다.

## 이미지 지연 로딩

이미지 지연 로딩 메커니즘은 이론상으로 간단하지만 사실 세부적인 부분은 조금
까다롭습니다. 또한, 지연 로딩의 이점을 누릴 수 있는
두 가지 사용 사례가 있습니다. HTML
내 인라인 이미지의 지연 로딩부터 시작해 봅시다.

### 인라인 이미지

가장 흔한 지연 로딩 후보는 `<img>` 요소에 사용되는 것과 같은 이미지입니다.
`<img>` 요소를 지연 로드할 때, 이러한 요소가
표시 영역에 있는지 확인하기 위해 자바스크립트를 이용합니다. 표시 영역에 있는 경우 `src`(때로는 `srcset`) 속성이 원하는 이미지 콘텐츠에 URL로
게재됩니다.

#### Intersection observer 사용

이전에 지연 로딩 코드를 작성한 적이 있다면 `scroll`이나 `resize`와 같은 이벤트 핸들러를 이용하여
작업했을 것입니다. 이러한 접근 방식이
여러 브라우저에서 가장 호환성이 좋긴 하지만, 현대의
브라우저는 [Intersection
observer API](/web/updates/2016/04/intersectionobserver)를 통해 요소 확인 작업을 수행하는 더욱 우수하고 효율적인 방식을 제공합니다.

참고: 모든 브라우저가 Intersection observer를 지원하는 것은 아닙니다. 브라우저 간 호환성이
필수적이라면, 저성능이지만 호환성은
더 뛰어난 스크롤을 이용하여 이미지를 지연 로드하고
이벤트 핸들러의 크기를 조정하는 방법을 보여주는 [다음
섹션](#using_event_handlers_the_most_compatible_way)을 읽어보세요.

Intersection observer는 다양한
이벤트 핸들러에 의존하는 코드보다 사용하고 읽기 쉽습니다. 개발자가 장황한 요소 가시성 감지 코드를 작성하지 않고 옵저버를 감시
요소에 등록하기만 하면 되기 때문입니다. 개발자가 해야 할
일은 요소가 가시화되었을 때
무엇을 할지 결정하는 것뿐입니다. 이 기본 마크업 패턴을 지연 로드된 `<img>`
요소로 가정해 봅시다.

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="저는 이미지입니다!">
```

이 마크업에서 중점을 두어야 하는 세 가지 관련 항목이 있습니다.

1. `class` 속성: 자바스크립트에서
선택할 요소.
2. `src` 속성: 페이지가 처음 로드되었을 때 나타나는
자리표시자 이미지를 참조.
3. `data-src` 및 `data-srcset` 속성: 요소가 표시 영역에 있을 때 로드할 이미지의 URL을 담고 있는 자리표시자
속성.

이제 이 마크업 패턴을 이용하여 이미지를
지연 로드하는 데 자바스크립트의 Intersection observer를 사용하는 방법을 알아봅시다.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

문서의 `DOMContentLoaded` 이벤트에서 이 스크립트가 `lazy` 클래스의 모든
`<img>`에 대한 DOM을 조회합니다. Intersection observer를 사용할 수 있는 경우,
`img.lazy` 요소가
표시 영역에 진입했을 때 콜백을 실행하는 신규 옵저버를 생성합니다. [이 CodePen의
예시](https://codepen.io/malchata/pen/YeMyrQ)에서 코드의 동작을 확인하세요.

참고: 이 코드는
`isIntersecting`라는 이름의 Intersection observer 방식을 이용하고 있으며, Edge 15의 Intersection observer
구현에서는 이용할 수 없습니다. 따라서 상기한 지연 로딩 코드(및 기타 유사 코드
스니펫)이 실패합니다. [이 GitHub
이슈](https://github.com/w3c/IntersectionObserver/issues/211)를 참조하여 전체
기능 검색 조건부에 관한 지침을 확인하세요.

그러나 Intersection observer의 단점은 [여러 브라우저에 양호한
지원을 제공](https://caniuse.com/#feat=intersectionobserver)하지만,
범용은 아니라는 점입니다. 지원되지 않는 브라우저를 [폴리필
해야 하거나](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
위의 코드에서 제안한 바와 같이 이용 가능성을 감지하기 때문에
결과적으로 더 오래된 호환 방식으로 돌아가게 됩니다.

#### 이벤트 핸들러 사용(호환성이 가장 좋은 방식)

지연 로딩에는_반드시_ Intersection observer를 이용해야 하지만,
애플리케이션 요구사항에서는 브라우저 호환성이 필수적일 수도 있습니다. [Intersection obesrver
지원을 폴리필해도
되지만_](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)(가장
쉬운 방법),
[`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll),
[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize)이나
혹은
[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)
이벤트 핸들러를
[`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)와
함께 사용하는 코드로 돌아와 요소가 표시 영역에 있는지 결정하게 될 수도 있습니다.

이전과 동일한 마크업 패턴을 가정했을 때, 다음 자바스크립트는
지연 로딩 기능을 제공합니다.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

이 코드는 `scroll` 이벤트 핸들러 내 `getBoundingClientRect`를 이용하여
`img.lazy` 요소가 표시 영역에 있는지 확인합니다. `setTimeout` 호출은
지연 처리에 이용되며, `active` 변수는 기능 호출 차단에
사용되는 처리 상태를 포함합니다. 이미지가 지연 로드되었으므로 요소
배열에서 삭제됩니다. 요소 배열의 `length`가 `0`에 도달하면 스크롤
이벤트 핸들러 코드가 삭제됩니다. [이 CodePen
예시](https://codepen.io/malchata/pen/mXoZGx)에서 코드의 동작을 확인할 수 있습니다.

이 코드는 대부분의 브라우저에서 작동하지만, 반복적인 `setTimeout` 호출
내 코드가 차단되더라도 낭비될 수 있으므로
잠재적인 성능 문제가 있습니다. 이 예시에서 문서 스크롤이나 창 크기 조정 시 표시 영역에 이미지가 있는지와 무관하게 200ms마다
확인이
실행됩니다. 게다가, 개발자는 지연 로딩할 요소가 얼마나 남아있는지
추적하고 스크롤 이벤트 핸들러를 바인딩 해제하는 지루한 작업을
해야 합니다.

간단히 말하면 다음과 같습니다. 가능할 때마다 Intersection observer를 이용하고, 가능한
한 폭넓은 호환성이 애플리케이션 요구사항에 필수적이라면
이벤트 핸들러로 돌아갑니다.

### CSS의 이미지

`<img>` 태그는 웹페이지에서 이미지를 사용하는 가장 흔한 방법이지만, 이미지는
CSS
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
속성(및 기타 속성)으로도 호출할 수 있습니다. 가시성과 무관하게
로드하는 `<img>` 요소와는 달리, CSS의 이미지 로딩 동작은
예측을 통해 수행됩니다. [문서 및 CSS 객체
모델](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
및 [렌더
트리](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)가
빌드되었을 때, 브라우저는 외부 리소스를 요청하기 전에 문서에
CSS가 어떻게 적용되었는지 검사합니다. 브라우저에서 외부 리소스와 관련한 CSS 규칙이 현재
구축된 대로 문서에 적용되지
않는다고 판단한 경우, 이를 요청하지 않습니다.

이러한 예측 행동은 자바스크립트로 CSS 이미지의 로딩을 지연하는 데 사용하여, 요소가 표시 영역 내에 있는 순간을 결정하고
그 후 배경 이미지 호출 스타일을
적용하는
클래스를 해당 요소에 할당합니다. 이로써 초기 로드할 때가 아니라 필요할 때
이미지가 다운로드됩니다. 대형 영웅
배경 이미지가 담긴 요소를 예로 들어보겠습니다.

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

`div.lazy-background` 요소는 일반적으로 일부 CSS에서 호출된 영웅 배경
이미지를 담고 있습니다. 그러나 이 지연 로딩 예시에서는 `visible`
클래스를 통해 `div.lazy-background` 요소의 `background-image` 속성을
분리할 수 있습니다. 이 속성은 표시 영역에 있을 때 요소에 추가됩니다.

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

여기서부터 자바스크립트를 이용하여 요소가 표시 영역에 있는지 확인하고(Intersection observer
사용), `visible` 클래스를 해당 시점의
`div.lazy-background` 요소에 할당합니다. 그러면 이미지를 로드합니다.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

앞서 말했듯이 현재 모든 브라우저가 지원하는 것은 아니므로 Intersection observer의 대체재나
폴리필을 확보해야 합니다.
[이 CodePen의 데모](https://codepen.io/malchata/pen/wyLMpR)에서
코드의 동작을 확인하세요.

## 동영상 지연 로딩

이미지 요소처럼 동영상도 지연 로드할 수 있습니다. 일반적인 환경에서
동영상을 로드할 때 `<video>` 요소를 이용합니다(단, [`<img>`를
사용한 대체
방식](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)이 제한적인 구현 방식으로
부상하고 있습니다). 그러면 사용 사례에 따라_어떻게_ `<video>`를 지연 로드해야
할까요? 서로 다른 해결 방법이 필요한 몇 가지 시나리오를 논의해
봅시다.

### 자동 재생되지 않는 동영상

사용자가 재생을 시작한 동영상의 경우(즉, 동영상이 자동 재생되지_않음_), `<video>` 요소의 [`preload`
속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)을
특정하는 것이
바람직합니다.

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

여기서는 `none` 값의 `preload` 속성을 이용하여 브라우저가_어떠한_동영상 데이터도
미리 로드하지 않도록 방지합니다. 자리를 메우기 위해 `poster`
속성을 사용하여 `<video>` 요소에 자리표시자를 제공합니다. 이렇게 하는 이유는
동영상 로딩의 동작 기본값이 브라우저마다 다르기 때문입니다.

- Chrome에서는 `preload`에 대한 기본값이 `auto`였으나, Chrome 64부터는
`metadata`가 기본이 되었습니다. 그렇다고 하더라도, Chrome의 PC 버전에서는 동영상의
일부가 `Content-Range` 헤더를 이용하여 미리 로드될 수 있습니다. Firefox, Edge 및
Internet Explorer 11도 유사하게 동작합니다.
- Chrome PC 버전과 마찬가지로 Safari 11.0 PC 버전도 일부
동영상을 미리 로드합니다. 11.2 버전(현재 Safari의 기술 미리보기 버전)에서는
동영상 메타데이터만이 미리 로드됩니다. [iOS의 Safari에서는 동영상이 절대로
미리 로드되지 않습니다](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9).
- [데이터 절약 모드](https://support.google.com/chrome/answer/2392284)가
활성화되었을 때, `preload`의 기본값은 `none`입니다.

`preload`에 관한 브라우저의 동작 기본값이 고정되지 않았으므로,
명시하는 것이 가장 좋습니다. 사용자가
재생을 시작한 경우, `preload="none"`을 이용하는 것이
모든 플랫폼의 동영상 로딩을 지연하는 가장 쉬운 방법입니다. `preload` 속성은 동영상 콘텐츠
로딩을 지연하는 유일한 방법이 아닙니다. [_동영상
미리 로드로 빠른 재생_](/web/fundamentals/media/fast-playback-with-video-preload)이 자바스크립트 내
동영상 재생을 작업하는 데 아이디어와 통계를 제공할 수 있을 것입니다.

안타깝게도, 이 방법은 애니메이션 GIF대신 동영상을 이용하려는 경우에는
유용하지 않은 것으로 알려져 있습니다. 이 부분은 다음에 다룹니다.

### 애니메이션 GIF의 대체물로 동작하는 동영상의 경우

애니메이션 GIF는 폭넓게 이용되지만, 여러 방면에서 동영상에
상응하는 미디어에 비해 특히 파일 크기 출력에서 뒤떨어집니다. 애니메이션 GIF는
수 MB 범위의 데이터로 늘어날 수 있습니다. 유사한 시각 품질의 동영상은 훨씬
작습니다.

`<video>` 요소를 애니메이션 GIF대신
사용하는 것은 `<img>` 요소만큼이나 간단하지 않습니다. 애니메이션 GIF의 본질은 다음의
세 가지 동작입니다.

1. 로드 시 자동으로 재생됩니다.
2. 계속 루프됩니다([항상 그런 것은
아님](https://davidwalsh.name/prevent-gif-loop)).
3. 오디오 트랙이 없습니다.

`<video>` 요소로 이렇게 하는 경우는 다음과 같습니다.

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

`autoplay`, `muted`, `loop` 속성은 그 명칭 그대로입니다.
[`playsinline`은
iOS에서 발생하는 자동 재생에 필요합니다](https://webkit.org/blog/6784/new-video-policies-for-ios/). 이제 여러 플랫폼에서 작동하는
서비스 가능 GIF 대체 동영상이 생겼습니다. 하지만 이것을
지연 로딩하려면 어떻게 해야 합니까? [Chrome은 사용자를 위해 동영상 지연
로드를 제공](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg),
하지만 모든 브라우저가 최적화 동작을 제공하는 것을 기대할 수 없습니다.
잠재고객과 애플리케이션 요구사항에 따라, 스스로
해결해야 할 수 있습니다. 시작하려면 `<video>` 마크업을 다음과 같이 수정합니다.

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

[`poster`
속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster)가 추가된 것을 보았을 것입니다.
이 속성은 사용자가 동영상이 지연 로드될 때까지 `<video>` 요소의 자리를
차지하는 자리표시자를 지정할 수 있도록 합니다. 이전 `<img>` 지연 로딩 예시처럼,
`data-src` 속성 내 동영상 URL을 각 `<source>`
요소에 보관합니다. 여기서부터 이전 Intersection observer 기반 이미지 지연 로딩 예시와
유사한 일부 자바스크립트를 이용합니다.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

`<video>` 요소를 지연 로드할 때, 모든 하위
`<source>` 요소에 걸쳐 반복하고 `data-src` 속성을 `src` 속성으로 전환해야 합니다. 이것을
완료하면 해당 요소의 `load` 방식 호출을 통해 동영상 로딩을
트리거해야 합니다. 그 후 미디어가 `autoplay` 속성마다
자동으로 재생을 시작합니다.

이 방식을 사용하면 애니메이션 GIF 동작을 에뮬레이트하는 동영상 솔루션을 갖추면서도,
애니메이션 GIF만큼의 높은 데이터 사용량을
유발하지 않고 해당 콘텐츠를 지연 로드할 수 있습니다.

## 라이브러리 지연 로딩

이면에서 지연 로딩이_어떻게_작동하는지 궁금하지 않고 라이브러리만
가져가고 싶다면(그래도 괜찮습니다!), 수많은 선택지가
있습니다. 많은 라이브러리는 이 가이드에서
보인 것과 유사한 마크업 패턴을 이용합니다. 몇 가지 유용한 지연 로딩 라이브러리를
여기에 제시합니다.

- [lazysizes](https://github.com/aFarkas/lazysizes)는 이미지 및 iframe을 지연 로드하는 지연
로딩 라이브러리로, 전체 기능을 갖추고 있습니다. 이 라이브러리에서 사용하는 패턴은 여기에서 나타낸 코드 예시와 상당히
유사합니다. `<img>` 요소의
`lazyload` 클래스로 자동 바인딩하며 사용자가
`data-src` 및/또는 `data-srcset` 속성의 이미지 URL을 지정해야 하고, 각각의
콘텐츠는 `src` 및/또는 `srcset`으로 스왑됩니다. Intersection observer를 사용하며(폴리필 가능),
[여러
플러그인](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo)으로 확장하여 동영상 지연 로드와 같은 작업을 할
수 있습니다.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js)는 Intersection observer만을 이용하는 초경량
옵션입니다. 따라서 성능은 매우 우수하지만
구형 브라우저에서 사용하기 전에 폴리필해야 합니다.
- [blazy](https://github.com/dinbror/blazy)는 경량 지연 로더(1.4 KB 가중치)로
소개된 유사한 옵션입니다. 지연 크기로 인해
타사 유틸리티의 로딩이 필요하지 않으며, IE7 이상에서도 작동합니다.
안타깝게도 이 라이브러리는 Intersection observer를 사용하지 않습니다.
- [yall.js](https://github.com/malchata/yall.js)는 제가 작성했으며, IntersectionObserver를 사용하고
이벤트 핸들러로 되돌아가는 라이브러리입니다. IE11
및 주요 브라우저와 호환됩니다.
- React 특정 지연 로딩 라이브러리를 찾고 있다면,
[react-lazyload](https://github.com/jasonslyvia/react-lazyload)를 고려해볼 수 있습니다. Intersection observer를 사용하지는 않지만, React을 통한 애플리케이션 개발에 익숙한 개발자를 위해
친숙한 지연
로딩 이미지 방식을_제공_합니다.

각 지연 로딩 라이브러리는 꼼꼼하게 문서화되어 있으며, 다양한 지연 로딩 시도를 위한 수많은 마크업
패턴이 있습니다. 수정하는 데 시간을 보내고 싶지 않다면,
라이브러리만 가져가세요. 수고를 덜어줍니다.

## 무엇이 잘못될 수 있을까요?

이미지 및 동영상 지연 로딩에는 긍정적이고 상당한 성능
이점이 있지만, 가볍게 여겨서는 안 되는 작업입니다. 잘못하면 의도치 않은
결과가 발생할 수 있습니다. 따라서 다음
사항을 명심하는 것이 중요합니다.

### 구분선에 유의하기

자바스크립트로
페이지의 모든 미디어 리소스를 지연 로드하고 싶을 수 있지만, 이런 유혹을 참아야 합니다. 첫 화면에서
보이는 부분에 있는 항목은 지연 로드하지 말아야 합니다. 이러한 리소스는 중요한
자산이므로, 일반적으로 로드되어야 합니다.

중요한 미디어 리소스를 지연 로딩대신
일반적인 방식으로 로딩하는 것에 대한 주된 이유는 지연 로딩이 스크립트가 로딩을 완료하고
실행을 시작하여 DOM 상호작용이
가능할 때까지 이러한 리소스의 로딩을 지연한다는 것입니다. 스크롤을 내려야 보이는 화면의 이미지의 경우에는 괜찮지만, 첫 화면의
주요 리소스는 표준 `<img>` 요소로 로드하는 것이 더 빠릅니다.

물론 최근에는 너무 다양한 크기의 여러 화면에서 웹사이트를
보기 때문에 그 구분점이 확실하지 않습니다. 노트북에서 첫 화면에 보이는 것이
휴대기기에서는_스크롤을 내려야_보일 수 있습니다. 모든 상황에서 이 문제를
최적으로 해결하는 완전 무결한 방책은 없습니다. 페이지의 주요 자산의 인벤토리를 수행하고 통상적인
방식으로 이러한 이미지를
로드해야 합니다.

또한 지연 로딩을 트리거하는 임계값으로
이러한 구분선을 명확하게 하고 싶지 않을 수 있습니다. 구분선 아래의 일정 거리까지
버퍼 영역을 구축하여 사용자가 표시 영역까지 스크롤하기 한참 전에 이미지가 로딩을 시작하도록 하는 것이
의도한 바에 적합할 수 있습니다. 예를 들어, Intersection observer API를
사용하면 사용자가 신규 `IntersectionObserver` 인스턴스를 생성했을 때
옵션 객체 내에서 `rootMargin` 속성을 지정할 수 있습니다. 이 방법은
요소에 효과적으로 버퍼를 제공하여 요소가 표시 영역에 도달하기
전에 지연 로딩 동작을 트리거합니다.

```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin: "0px 0px 256px 0px"
});
```

`rootMargin` 값이 CSS
`margin` 속성에서 지정한 값과 유사해 보이는 것은 실제로 그렇기 때문입니다. 이 경우, 관찰 요소의
아래 여백을 256픽셀로
넓혔습니다(브라우저 표시 영역 기본값. 단, 특정 요소에서 `root`
속성을 이용하여 변경 가능). 즉, 이미지 요소가
표시 영역의 256픽셀 내에 있을 때 콜백 함수가 실행되며, 사용자가 실제로 보기 전에 이미지 로딩이
시작된다는 것을 의미합니다.

스크롤 이벤트 핸들링 코드와 동일한 효과를 달성하려면
`getBoundingClientRect` 확인이 버퍼를 포함하도록 조정하기만 하면 됩니다. 그러면 Intersection observer를 지원하지 않는 브라우저에서도 동일한
효과를 얻을 수 있습니다.

### 레이아웃 이동 및 자리표시자

자리표시자가 사용되지 않으면 미디어 지연 로딩으로 인해 레이아웃이 이동할 수 있습니다.
이러한 변화는 사용자를 혼란스럽게 하며, 시스템 리소스 소모와 쟁크 현상(jank)을 발생시키는
소모적인 DOM 레이아웃 작업을 트리거합니다. 최소한
타겟 이미지와 동일한 수치를 갖는 단색 자리표시자나 미디어
항목이 로드되기 전에 콘텐츠를 보여주는
[LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) 또는
[SQIP](https://github.com/technopagan/sqip)와 같은 기술을 고려해야
합니다.

`<img>` 태그의 경우, 속성이 최종 이미지 URL로 업데이트되기 전까지
`src`는 자리표시자에 포인트해야 합니다. `<video>`
요소의 `poster` 속성을 이용하여 자리표시자 이미지에 포인트합니다. 또한, `width`와
`height` 속성을 `<img>` 및 `<video>` 태그 모두에 사용합니다. 이렇게 하면
자리표시자에서 최종 이미지로 전환하더라도 미디어 로드 중 렌더링된
요소의 크기를 변경하지 않습니다.

### 이미지 디코딩 지연

자바스크립트로 대형 이미지를 로딩하거나 DOM에 드롭하면
기본 스레드가 중지되어 사용자 인터페이스가 디코딩 중
잠시 반응하지 않게 될 수 있습니다. DOM으로 삽입하기 전에 [`decode`
방식을 이용한 비동기식 이미지 디코딩](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)
을 하면 이러한 쟁크 현상을 줄일 수 있습니다. 다만
다음에 주의해야 합니다. 이 방식은 아직 모든 곳에서 이용할 수 없으며,
지연 로딩 로직을 복잡하게 합니다. 사용하려면 이 점을 확인해야 합니다. 아래는 폴백에 `Image.decode()`를
이용하는 방법입니다.

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

[이 CodePen 링크](https://codepen.io/malchata/pen/WzeZGW)를 이용하여 이 예시와
유사한 코드가 작동하는 것을 확인해 보세요. 대부분의 이미지가 상당히 작다면
큰 효과를 볼 수 없지만
대형 이미지를 지연 로딩하거나 DOM에 삽입할 때의 쟁크(jank) 현상을 줄이는 데는 도움이 됩니다.

### 로드되지 않을 때

때때로 미디어 리소스가 다양한 이유로 로드에 실패하거나
오류가 발생할 수 있습니다. 언제 이러한 일이 발생하나요? 경우에 따라 다르지만, 여기에 한가지 가상 시나리오를 제시해
보겠습니다. 짧은 시간(예:
5분)동안 HTML 캐싱 정책을 보유하며 사용자가 사이트를 방문_하거나_사용자가 오래된 탭을
장시간(예: 수시간) 열어두었으며 콘텐츠를 읽고자 다시 돌아왔습니다.
이 프로세스의 일정 시점에서 재배포가 발생합니다. 배포 중
이미지 리소스의 이름이 해시 기반 버전 관리로 인해 변경되거나
모두 삭제됩니다. 사용자가 이미지를 지연 로드할 때가 되면 리소스를
이용할 수 없으므로 실패합니다.

비교적 흔치 않게 발생하긴 하지만, 지연 로딩이 실패할 때를 대비하여
백업 계획을 마련하는 것이 좋습니다. 이미지의 경우, 이러한 해결 방법은 다음과
같을 수 있습니다.

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

이 오류 이벤트에서 무엇을 할지는 애플리케이션에 따라 다릅니다. 예를 들어,
이미지 자리표시자 영역을
사용자가 이미지를 다시 로드할 수 있는 버튼으로 교체하거나 이미지 자리표시자 영역에 오류 메시지만을
표시해도 됩니다.

다른 시나리오도 발생할 수 있습니다. 무엇을 하든, 오류가 발생했을 때
사용자에게 알림을 제공하거나 문제가 발생했을 때 취할 수 있는 동작을 제공하는 것이
좋습니다.

### 자바스크립트 가용성

자바스크립트를 항상 이용할 수 있다고 가정해서는 안 됩니다. 이미지를 지연 로드하려면
자바스크립트를 사용할 수 없는 경우에 이미지를 표시하는 `<noscript>` 마크업을 제공하는 것을
고려해 보세요. 가장 단순한 폴백의 예에는
자바스크립트가 꺼졌을 때 이미지 제공에 `<noscript>` 요소를 이용하는 것이 있습니다.

```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="저는 이미지입니다!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="저는 이미지입니다!">
</noscript>
```

자바스크립트가 꺼지면 사용자는 자리표시자 이미지 및 `<noscript>` 요소를 포함한
이미지_모두_를 보게 됩니다. 이를 피하기 위해 다음과 같이 `no-js` 클래스를 `<html>` 태그에
배치할 수 있습니다.

```html
<html class="no-js">
```

그런 다음, 자바스크립트가 켜진 경우 `<html>`
요소에서 `no-js` 클래스를 삭제하는 `<link>` 태그를 통해 스타일 시트가
요청되기 전에 인라인 스크립트 한 줄을 `<head>`에 배치합니다.

```html
<script>document.documentElement.classList.remove("no-js");</script>
```

마지막으로, 다음과 같이 몇 가지 CSS를 이용하여
자바스크립트를 이용할 수 없을 때 지연 클래스 요소를 숨기기만 하면 됩니다.

```css
.no-js .lazy {
  display: none;
}
```

이 방법은 자리표시자 이미지가 로딩되는 것을 막지는 못하지만, 결과는
더 바람직합니다. 자바스크립트를 끈 사람들은 자리표시자
이미지보다 더 나은 결과를 볼 수 있습니다. 이는 자리표시자보다 더 우수하고, 의미 없는 콘텐츠가
전혀 없습니다.

## 결론

주의를 기울여 사용하면, 이미지 및 동영상 지연 로딩은 사이트의 초기
로드 시간 및 페이지 페이로드를 크게 줄일 수 있습니다. 사용자는 불필요한 네트워크
활동과 결코 볼 일이 없는 미디어 리소스의 프로세스 비용을 발생시키지 않으면서도
여전히 보고 싶은 리소스를 볼 수 있습니다.

성능 향상 기술에 관한 한, 지연 로딩은 논쟁의
여지가 없습니다. 사이트에 많은 인라인 이미지를 보유하고 있다면
불필요한 다운로드를 절감하기에 매우 적합한 방법입니다. 사이트 사용자 및
프로젝트 이해관계자도 기뻐할 것입니다.

_[François
Beaufort](/web/resources/contributors/beaufortfrancois), Dean Hume, [Ilya
Grigork](/web/resources/contributors/ilyagrigorik), [Paul
Irish](/web/resources/contributors/paulirish), [Addy
Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), 그리고 Martin Schierle 님께
귀중한 의견으로 이 글의 품질을 크게 향상하는 데 도움을 주신 점에 특히 감사드립니다.
