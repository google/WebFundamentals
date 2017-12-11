project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서비스 워커 수명 주기에 대해 자세히 알아봅니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# 서비스 워커 수명 주기 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

수명 주기는 서비스 워커의 가장 복잡한 부분입니다. 서비스 워커의
시도 대상과 이점을 모르는 경우 전쟁을 하는 것 같은 느낌이
들 수 있습니다. 그러나 작동 방식을 알게 되면 최상의 웹 및 기본 패턴을 혼합하여
사용자에게 원활하고 비개입적인 업데이트를 제공할 수 있습니다.

심도 있게 살펴보겠지만 각 섹션의 시작 부분에 있는 글머리 기호는
알아야 할 대부분의 항목을 포함합니다.

## 목적

수명 주기는 다음을 목적으로 합니다.

* 오프라인 우선을 가능하게 합니다.
* 현재 서비스 워커를 중단하지 않고 새로운 서비스 워커를 준비할 수
 있게 합니다.
* 범위 내 페이지를 동일한 서비스 워커가 제어합니다(또는 제어하는
 서비스 워커가 없음).
* 한 번에 한 버전의 사이트만 실행합니다.

마지막 목적은 매우 중요합니다. 서비스 워커가 없는 경우 사용자가 한 탭을
사이트에 로드한 다음 나중에 다른 탭을 열 수 있습니다. 이 경우 사이트의 두 버전이
동시에 실행될 수 있습니다. 문제가 없는 경우도 있지만 저장소를
다루는 경우 두 개의 탭이 공유 저장소를 관리하는 방법에 대해
매우 다른 의견을 가질 수 있습니다. 이로 인해 오류가 발생하거나
데이터 손실이 발생할 수 있습니다.

Caution: 사용자는 데이터 손실을 매우 싫어합니다. 데이터 손실이 발생하면 큰 슬픔에 빠질 수 있습니다.

## 첫 번째 서비스 워커

요약:

* `install` 이벤트는 서비스 워커가 받는 첫 번째 이벤트이며
 한 번만 발생합니다.
* `installEvent.waitUntil()`에 전달된 프라미스는 설치의
 기간과 성공 또는 실패에 대한 신호를 보냅니다.
* 서비스 워커는 설치 후 '활성화'될 때까지 `fetch` 및 `push`와
 같은 이벤트를 수신하지 않습니다.
* 페이지 요청 자체가 서비스 워커를 통과하지 않는 경우 기본적으로
 페이지 가져오기는 서비스 워커를 통과하지 않습니다. 따라서 서비스 워커의 영향을
 보려면 페이지를 새로 고쳐야 합니다.
* `clients.claim()`은 이 기본값을 재정의하고
 제어되지 않는 페이지를 제어할 수 있습니다.

<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">설치</text><text y="6.7" x="81.1" class="label">활성</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

다음 HTML을 사용해 봅시다.

    <!DOCTYPE html>
    An image will appear here in 3 seconds:
    <script>
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.log('Boo!', err));

      setTimeout(() => {
        const img = new Image();
        img.src = '/dog.svg';
        document.body.appendChild(img);
      }, 3000);
    </script>

이 코드는 서비스 워커를 등록하고 3초 후에 개 이미지를 추가합니다.

다음은 해당 서비스 워커인 `sw.js`입니다.

    self.addEventListener('install', event => {
      console.log('V1 installing…');

      // cache a cat SVG
      event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
      );
    });

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the cat SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
      }
    });

이는 고양이 이미지를 캐시하고 `/dog.svg` 요청이 있을 때마다
고양이 이미지를 제공합니다. 그러나 [위의 예시를
실행](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}하면 페이지를 처음으로 로드할 때 개가 표시됩니다. 새로 고치면
고양이가 표시됩니다.

참고: 고양이가 개보다 낫습니다. 정말 *그렇습니다*.

### 범위 및 제어

서비스 워커 등록의 기본 범위는 스크립트 URL에
상대적인 `./`입니다. 즉, `//example.com/foo/bar.js`에 서비스 워커를
등록한 경우 기본 범위는 `//example.com/foo/`입니다.

페이지, 워커 및 공유 워커 `clients`를 호출합니다. 서비스 워커는
범위 내에 있는 클라이언트만 제어할 수 있습니다. 클라이언트가 '제어되면'
가져오기는 범위 내 서비스 워커를 통과합니다. `navigator.serviceWorker.controller`를 통해 클라이언트가
제어되는지 여부를 탐지할 수 있으며, null 또는 서비스 워커 인스턴스일
것입니다.

### 다운로드, 파싱 및 실행

`.register()`를 호출하면 첫 번째 서비스 워커가 다운로드됩니다. 스크립트가
다운로드 또는 파싱하지 못하거나 초기 실행에서 오류가 발생할 경우
레지스터 프라미스가 거부되고 서비스 워커가 삭제됩니다.

Chrome의 DevTools는 콘솔과 Application 탭의
Service Workers 섹션에 오류를 표시합니다.

<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="서비스 워커 DevTools 탭에 표시된 오류">
</figure>

### 설치

서비스 워커가 가져오는 첫 번째 이벤트는 `install`입니다. 해당 이벤트는
서비스 워커가 실행되는 즉시 트리거되고 서비스 워커별로 한 번만 호출됩니다. 서비스 워커 스크립트를
변경하면 브라우저에서 다른 서비스 워커로
간주되며 고유한 `install` 이벤트를 가져옵니다. [업데이트](#updates)에 대해서는
나중에 자세히 다루겠습니다.

`install` 이벤트는 클라이언트를 제어하는 데 필요한 모든 것을 캐시할 수
있는 기회입니다. `event.waitUntil()`에 전달한 프라미스는 설치 완료 시점과
성공 여부를 브라우저에 알립니다.

프라미스가 거부되면 설치가 실패했다는 신호를 보내고 브라우저가
서비스 워커를 버립니다. 클라이언트를 제어하지 않습니다. 즉, `fetch` 이벤트의
캐시에 있는 'cat.svg'에 의존할 수 있습니다. 이는 종속성에 해당합니다.

### 활성화

서비스 워커가 클라이언트를 제어하고 `push` 및 `sync`와 같은
함수 이벤트를 처리할 준비가 되면 `activate` 이벤트가 발생합니다. 그러나
`.register()`라는 페이지가 제어된다는 의미는 아닙니다.

[데모](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}를
처음 로드할 때 서비스 워커가 활성화된 지 오랜 후에
`dog.svg`를 요청하더라도 요청은 처리되지 않고 여전히 개 이미지가
나타납니다. 페이지가 서비스 워커 없이 로드되고 하위 리소스가
로드되지 않는 경우 기본값은 *consistency*입니다. [데모](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}를
다시 로드하면(즉, 페이지를 새로 고치면) 페이지가 제어됩니다.
페이지와 이미지가 모두 `fetch` 이벤트를 통과하며
고양이가 대신 표시됩니다.

### clients.claim

서비스 워커가 활성화되면 서비스 워커 내에서 `clients.claim()`을 호출하여
제어되지 않은 클라이언트를 제어할 수 있습니다.

다음은 `activate` 이벤트에서
`clients.claim()`을 호출하는 [위 데모의 변형](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external}입니다. 처음에는 고양이가 보일
*것입니다*. 타이밍에 민감하기 때문에 '것입니다'를 사용했습니다. 이미지가
로드되기 전에 서비스 워커가 활성화되고 `clients.claim()`이
적용될 경우에만 고양이를 보게 됩니다.

네트워크를 통한 로드와 다른 방식으로 페이지를 로드하도록
서비스 워커를 사용하는 경우, 서비스 워커 없이 로드한 일부 클라이언트를 서비스 워커가
제어하기 때문에 `clients.claim()`이 번거로울 수 있습니다.

참고: 많은 사람들이 `clients.claim()`을 상용구로 포함하지만
저는 좀처럼 그렇게 하지 않습니다. 이는 첫 번째 로드에서만 문제가 되며 점진적 향상
덕분에 일반적으로 페이지가 서비스 워커 없이
정상적으로 작동합니다.

## 서비스 워커 업데이트 {: #updates}

요약:

* 다음의 경우에 업데이트가 트리거됩니다.
    * 범위 내 페이지 탐색 시
    * 이전 24시간 내에 업데이트 확인이 없는 상태에서 `push` 및 `sync`와
 같은 함수 이벤트 시
    * 서비스 워커 URL이 변경된 *경우에만* `.register()` 호출 시
* 업데이트를 가져올 때 서비스 워커 스크립트의 캐싱 헤더가
 적용됩니다(최대 24시간). 우리는 이와 같은 어려운 작업을 옵트인 동작으로
 만들 것입니다. 서비스 워커 스크립트에서 `max-age` 0을 원할
 수 있습니다.
* 서비스 워커는 브라우저에 이미 있는 것과 다른 바이트인 경우
 업데이트된 것으로 간주됩니다. (이를 확장하여 가져온
 스크립트/모듈도 포함할 것입니다.)
* 업데이트된 서비스 워커는 기존 서비스 워커와 함께 시작되며
 고유한 `install` 이벤트를 가져옵니다.
* 새 워커가 비정상 상태 코드(예: 404)이거나 파싱에 실패하거나
 실행 중에 오류가 발생하거나 설치 중에 거부되면 새 워커는 버려지고
 현재 워커는 활성 상태를 계속 유지합니다.
* 성공적으로 설치되면 업데이트된 워커는 기존 워커가 제로 클라이언트를
 제어할 때까지 `wait`합니다. (새로 고치는 동안 클라이언트가
중첩됩니다.)
* `self.skipWaiting()`은 대기를 방지합니다. 즉,
 설치를 마치자마자 서비스 워커가 활성화됩니다.

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">설치</text><text y="6.7" x="81.1" class="label">활성</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">대기<use height="10" width="10" xlink:href="#diagram-sw"/></text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

고양이가 아닌 말 그림으로 응답하도록 서비스 워커 스크립트를
변경했다고 가정합시다.

    const expectedCaches = ['static-v2'];

    self.addEventListener('install', event => {
      console.log('V2 installing…');

      // cache a horse SVG into a new cache, static-v2
      event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.svg'))
      );
    });

    self.addEventListener('activate', event => {
      // delete any caches that aren't in expectedCaches
      // which will get rid of static-v1
      event.waitUntil(
        caches.keys().then(keys => Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )).then(() => {
          console.log('V2 now ready to handle fetches!');
        })
      );
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the horse SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
      }
    });

참고: 말에 대해서는 특별히 피력할 의견이 없습니다.

[위의 데모를
확인하세요](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}. 여전히 고양이 이미지가 표시될 것입니다. 그 이유는 다음과 같습니다.

### 설치

캐시 이름을 `static-v1`에서 `static-v2`로 변경했습니다. 즉,
기존 서비스 워커가 계속 사용 중인 현재 캐시를 덮어쓰지 않고
새 캐시를 설정할 수 있습니다.

이 패턴은 네이티브 앱이 실행 파일과 함께 번들로 제공될 자산과 유사한
버전 특정 캐시를 만듭니다. `avatars`와 같은 버전 불특정 캐시도
있을 수 있습니다.

### 대기

설치 후 업데이트된 서비스 워커는 기존 서비스 워커가 더 이상
클라이언트를 제어하지 않을 때까지 활성화를 지연시킵니다. 이 상태를
'대기 중'이라고 하며, 브라우저가 한 번에 한 버전의 서비스 워커만
실행되도록 보장하는 방법입니다.

[업데이트된
데모](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}를 실행한 경우 V2 워커가 아직 활성화되지 않았으므로
고양이 그림이 계속 표시될 것입니다. DevTools의 'Application' 탭에서 대기 중인
새 서비스 워커를 볼 수 있습니다.

<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="새 서비스 워커가 대기 중임을 보여주는 DevTools">
</figure>

데모에 열린 탭이 하나뿐인 경우에도 페이지를 새로 고치는 것만으로는
새 버전을 인수하기에 충분하지 않습니다. 이는 브라우저 탐색의 작동 방식 때문입니다.
탐색할 때 응답 헤더가 수신될 때까지 현재 페이지가 사라지지
않으며, 응답에 `Content-Disposition` 헤더가 있으면
현재 페이지가 유지될 수 있습니다. 이 중첩 때문에 현재 서비스 워커는 새로 고치는 동안
항상 클라이언트를 제어합니다.

업데이트를 가져오려면 현재 서비스 워커를 사용하는 모든 탭을 닫거나
탭에서 벗어난 곳으로 이동합니다. 그런 다음 [다시 데모로
이동](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}하면 말이 표시될 것입니다.

이 패턴은 Chrome의 업데이트 방식과 유사합니다. Chrome 업데이트는 백그라운드에서
다운로드되지만 Chrome이 다시 시작될 때까지 적용되지 않습니다. 그동안 현재 버전을
중단 없이 계속 사용할 수 있습니다. 이는 개발 단계에서
고통스러운 작업이지만 DevTools는 이를 훨씬 쉽게 만드는 방법을 제공하는데,
이에 대해서는 [이 글의 뒷부분](#devtools)에서 다루겠습니다.

### 활성화

이전 서비스 워커가 사라지고 새 서비스 워커가 클라이언트를 제어할
수 있는 경우 이 작업이 시작됩니다. 이때가 이전 워커가 아직 사용 중인 동안
할 수 없던 작업(예: 데이터베이스 마이그레이션 및 캐시 지우기)을
수행하기에 이상적인 시간입니다.

위의 데모에서 거기에 있을 것으로 예상되는 캐시 목록을
유지하고 `activate` 이벤트에서 다른 캐시를 제거하여 이전
`static-v1` 캐시를 제거합니다.

Caution: 이전 버전에서 업데이트하지 않을 수도 있습니다. 그런 경우 여러 이전 버전의 서비스 워커가 있을 수 있습니다.

`event.waitUntil()`에 프라미스를 전달하면 프라미스가 해결될 때까지
함수 이벤트(`fetch`, `push`, `sync` 등)가 버퍼링됩니다. 따라서 `fetch` 이벤트가
발생하면 활성화가 완전히 완료된 것입니다.

Caution: 캐시 저장소 API는 '원본 저장소'(예: localStorage 및
IndexedDB)입니다. 동일한 원본(예: `yourname.github.io/myapp`)에서
많은 사이트를 실행하는 경우 다른 사이트의 캐시를 삭제하지 않도록
주의하세요. 이를 피하려면 캐시 이름에 현재 사이트 고유의 접두사(예:
`myapp-static-v1`)를 지정하고 `myapp-`로 시작하지 않는 캐시를 건드리지 마세요.

### 대기 단계 건너뛰기

대기 단계는 한 번에 하나의 사이트 버전만 실행하고 있음을 의미하지만
해당 기능이 필요하지 않은 경우 `self.skipWaiting()`을 호출하여
새 서비스 워커를 더 빨리 활성화할 수 있습니다.

그러면 서비스 워커가 현재 진행 중인 워커를 퇴장시키고
대기 단계에 진입하자마자(또는 이미 대기 단계에 있는 경우 즉시)
활성화됩니다. 이 경우 워커가 설치를 건너뛰는 것이 *아니라* 단지 대기할 뿐입니다.

대기 중 또는 대기 전에 해당하는 한 `skipWaiting()` 호출 시간은 실제로
중요하지 않습니다. `install` 이벤트에서 이를 호출하는 것은 매우 흔한 경우입니다.

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

그러나 서비스 워커에 대한 `postMessage()`의 결과로 이를
호출하기를 원할 수도 있습니다. 현 상태 그대로, 사용자 상호작용에 따라 `skipWaiting()`을 수행할 수 있습니다.

[여기에는 `skipWaiting()`을
사용하는 데모가 있습니다](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}. 다른 곳을 탐색할 필요 없이 소 그림이 표시될 것입니다.
`clients.claim()`과 마찬가지로 경쟁이므로 페이지가 이미지를
로드하려고 시도하기 전에 새 서비스 워커가 가져와서 설치하고 활성화하는 경우에만 소가 표시됩니다.

Caution: `skipWaiting()`은 새 서비스 워커가 이전 버전으로 로드된 페이지를
제어할 가능성이 높음을 의미합니다. 즉, 페이지 가져오기의 일부는
이전 서비스 워커가 처리했지만 후속 가져오기는
새 서비스 워커가 처리합니다. 중단 현상이 발생하는 경우에는
`skipWaiting()`을 사용하지 마세요.

### 수동 업데이트

이전에 언급했듯이 브라우저는 탐색 및 함수 이벤트 후에 자동으로
업데이트를 확인하지만 수동으로 트리거할 수도 있습니다.

    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

사용자가 다시 로드하지 않고 오랫동안 사이트를 사용할 것으로
예상되는 경우 특정 간격(예: 매시간)으로 `update()`를 호출할 수 있습니다.

### 서비스 워커 스크립트의 URL 변경 방지

[캐싱 모범 사례에 대한
저자의 게시글](https://jakearchibald.com/2016/caching-best-practices/){: .external}을
읽은 경우 서비스 워커의 각 버전에 고유한 URL을 제공하는 것을 고려할 수 있습니다.
**그렇게 하지 마세요!** 그것은 일반적으로 서비스 워커에 좋지 않습니다.
현재 위치에서 스크립트를 업데이트하면 됩니다.

이 경우 다음과 같은 문제가 발생할 수 있습니다.

1. `index.html`은 `sw-v1.js`를 서비스 워커로 등록합니다.
1. 오프라인 우선으로 작동하도록 `sw-v1.js`는 `index.html`을 캐시하고 제공합니다.
1. 새롭고 멋진 `sw-v2.js`를 등록하도록 `index.html`을 업데이트합니다.

위의 작업을 수행하면 `sw-v1.js`가 캐시에서 이전 버전의
`index.html`을 제공하기 때문에 사용자는 `sw-v2.js`를 받지 못합니다. 서비스 워커를
업데이트하기 위해 서비스 워커를 업데이트해야 하는 위치로
이동했습니다. 정말 짜증나는 일이죠.

그러나 [위의
데모](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}에서는 서비스 워커의 URL을 변경*했습니다*. 데모를 위해
버전 간에 전환할 수 있습니다. 이는 저자가 프로덕션에서
할 일이 아닙니다.

## 개발을 쉽게 만들기 {: #devtools}

서비스 워커 수명 주기는 사용자를 염두에 두고 작성되었지만
개발 중에는 약간의 어려움이 있습니다. 고맙게도 도움이 되는 몇 가지 도구가 있습니다.

### Update on reload(새로 고칠 때 업데이트)

이는 내가 가장 좋아하는 옵션입니다.

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="'Update on reload'를 표시하는 DevTools">
</figure>

이 옵션은 수명 주기를 개발자에게 친숙하게 변경합니다. 각 탐색은 다음을 수행합니다.

1. 서비스 워커를 다시 가져옵니다.
1. 바이트가 동일한 경우에도 새 버전으로 설치합니다. 즉,
`install` 이벤트가 실행되고 캐시가 업데이트됩니다.
1. 새로운 서비스 워커가 활성화되도록 대기 단계를 건너뜁니다.
1. 페이지를 탐색합니다.

즉, 두 번 새로 고치거나 탭을 닫지 않고도 각 탐색(새로고침 포함)에
대한 업데이트를 받습니다.

### Skip waiting(대기 건너뛰기)

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="'skip waiting'을 표시하는 DevTools">
</figure>

워커가 대기 중인 경우 DevTools에서 'skip waiting'을 눌러
즉시 '활성' 상태로 승격할 수 있습니다.

### Shift-새로고침

페이지를 강제로 새로 고치면(Shift-새로고침) 서비스 워커를 완전히
우회합니다. 이는 통제가 안 될 것입니다. 이 기능은 사양에 있으므로 서비스 워커를
지원하는 다른 브라우저에서 작동합니다.

## 업데이트 처리

서비스 워커는 [확장 가능한
웹](https://extensiblewebmanifesto.org/){: .external }의 일부로 설계되었습니다. 일반적으로 브라우저 개발자는
웹 개발자에 비해 웹 개발 실력이
떨어집니다. 따라서 브라우저 개발자는 *자신*이 좋아하는 패턴을
사용하여 특정 문제를 해결하는 협소한 고수준 API를 제공하는 대신
브라우저의 기능에 대한 액세스를 허용하고 사용자에게 가장
적합한 방식을 고려하여 작업을 허용해야 합니다.

따라서 가능한 한 많은 패턴을 활성화하려면 전체 업데이트 주기를 식별할 수 있어야 합니다.

    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.installing; // the installing worker, or undefined
      reg.waiting; // the waiting worker, or undefined
      reg.active; // the active worker, or undefined

      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has as skipped waiting and become
      // the new active worker. 
    });

## 수고하셨습니다!

휴우! 위에서 기술적인 이론을 많이 언급했습니다. 이와 관련된 몇 가지
실제 적용 사례에 대해 조만간 심도 있게 살펴볼 예정이니 기대하세요.


{# wf_devsite_translation #}
