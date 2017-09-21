project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS 또는 자바스크립트로 애니메이션을 만들 수 있습니다. 어떤 애니메이션을 왜 사용해야 하나요?

{# wf_updated_on: 2016-08-25 #}
{# wf_published_on: 2014-08-08 #}

# CSS와 자바스크립트 애니메이션 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

웹에서 CSS와 자바스크립트로 애니메이션을 만들 수 있습니다. 어느 것을 사용할지는 프로젝트의 기타 종속성과 원하는 효과의 종류에 따라 결정됩니다.

### TL;DR {: .hide-from-toc }
* UI 요소 상태 전환과 같은 간단한 '원샷(one-shot)' 전환에 CSS 애니메이션을 사용합니다.
* 바운스, 중지, 일시 중지, 되감기 또는 감속과 같은 고급 효과를 원할 경우에 자바스크립트 애니메이션을 사용합니다.
* 자바스크립트로 애니메이션을 만드는 경우, 자신에게 익숙한 Web Animations API 또는 최신 프레임워크를 사용합니다.


대부분의 기본 애니메이션은 CSS 또는 자바스크립트로 만들 수 있지만 투자하는 노력과 시간은 다릅니다([CSS와 자바스크립트의 성능 비교](animations-and-performance#css-vs-javascript-performance) 참조). 각각 장단점이 있지만 다음과 같은 규칙이 적용됩니다.

* **UI 요소에 대해 작고 자체적으로 포함된 상태가 있는 경우 CSS를 사용합니다.** CSS 전환 및 애니메이션은 측면에 탐색 메뉴를 나타내거나 도움말을 표시하는 데 적합합니다. 자바스크립트를 사용하여 상태를 제어할 수 있지만 애니메이션 자체는 CSS에 있게 됩니다.
* **애니메이션을 세밀하게 제어해야 하는 경우 자바스크립트를 사용합니다.** Web Animations API는 표준 기반의 접근방식이며, 현재 Chrome 및 Opera에서 사용할 수 있습니다. 이 접근방식은 실제 객체를 제공하며, 복잡한 객체 지향 애플리케이션에 이상적입니다. 자바스크립트는 중지, 일시 중지, 감속 또는 되감기해야 하는 경우에도 유용합니다.
* **전체 장면을 손으로 조정하려는 경우에는 `requestAnimationFrame`을 직접 사용합니다.** 이것은 고급 자바스크립트 접근방식이지만, 게임을 빌드하거나 HTML 캔버스에 그리는 경우에 유용할 수 있습니다.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

또는, 애니메이션 기능이 포함된 자바스크립트 프레임워크를 이미 사용 중인 경우(예: jQuery의 [`.animate()`](https://api.jquery.com/animate/){: .external } 메서드 또는 [GreenSock's TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)를 통해), 해당 프레임워크를 애니메이션에 사용하는 것이 전반적으로 더 편리하다는 것을 알 수 있습니다.

<div class="clearfix"></div>

##  CSS로 애니메이션 만들기

CSS로 애니메이션을 만드는 것이 화면에서 움직임을 표현하는 가장 간단한 방법입니다. 이 접근방식을 *선언적*이라고 하는 이유는, 일어나기 원하는 동작을 지정하기 때문입니다.

다음은 X축과 Y축 모두에서 요소를 100px 이동하는 CSS입니다. 이 과정은 500ms가 걸리도록 설정된 CSS 전환을 사용하여 수행됩니다. `move` 클래스가 추가되면 `transform` 값이 변경되고 전환이 시작됩니다.


    .box {
      -webkit-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 500ms;
    
      transform: translate(0, 0);
      transition: transform 500ms;
    }
    
    .box.move {
      -webkit-transform: translate(100px, 100px);
      transform: translate(100px, 100px);
    }
    
[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

전환 기간 이외에도, 애니메이션에 느낌을 적용하는 *easing* 옵션이 있습니다. Easing에 대한 자세한 내용은 [Easing의 기본 사항](the-basics-of-easing) 가이드를 참조하세요.

위의 스니펫처럼 별도의 CSS 클래스를 만들어 애니메이션을 관리하면 자바스크립트를 사용하여 각 애니메이션을 활성화/비활성화할 수 있습니다.


    box.classList.add('move');
    

이러한 방법으로 앱에 멋진 균형을 제공할 수 있습니다. 자바스크립트로 상태 관리에 중점을 두고, 대상 요소에서 적합한 클래스를 설정하고, 브라우저가 애니메이션을 처리하도록 할 수 있습니다. 이 경로를 따르면 요소에서 `transitionend` 이벤트를 수신 대기할 수 있지만, Internet Explorer는 이러한 이벤트를 지원하는 버전 10 이상인 경우에만 가능합니다. 다른 브라우저도 얼마 전부터 이 이벤트를 지원하고 있습니다.

전환의 끝에서 수신 대기하는 데 필요한 자바스크립트는 다음과 같습니다.


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

CSS 전환과 더불어 CSS 애니메이션도 사용할 수 있어야 합니다. 이를 통해 개별 애니메이션 키프레임, 기간 및 반복을 휠씬 세밀하게 제어할 수 있습니다.

참고: 애니메이션 초보자를 위해 설명하자면 키프레임은 손으로 그린 애니메이션에 사용하던 용어입니다. 애니메이터는 모션의 가장 핵심적인 부분을 캡처하는 키프레임이라는 특정 동작 프레임을 만든 다음, 키프레임 사이에 모든 개별 프레임을 그려 넣는 방식으로 진행합니다. 현재 CSS 애니메이션도 유사한 프로세스를 갖고 있으며, 주어진 시점에서 CSS 속성이 어떤 값을 가져야 하는지 브라우저에게 알려주고 그 간격을 채웁니다.

예를 들어, 전환과 동일한 방법으로 상자에 애니메이션을 적용할 수 있지만, 클릭과 같은 사용자 상호작용 없이 무한 반복으로 애니메이션 효과를 낼 수 있습니다. 여러 속성을 동시에 변경할 수도 있습니다.


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need), things get far
     * more verbose!
     */
    .box {
      /* Choose the animation */
      animation-name: movingBox;
    
      /* The animation’s duration */
      animation-duration: 1300ms;
    
      /* The number of times we want
          the animation to run */
      animation-iteration-count: infinite;
    
      /* Causes the animation to reverse
          on every odd iteration */
      animation-direction: alternate;
    }
    
    @keyframes movingBox {
      0% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
    
      25% {
        opacity: 0.9;
      }
    
      50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
      }
    
      100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
      }
    }
    

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

CSS 애니메이션으로 애니메이션 자체를 대상 요소와 독립적으로 정의하고, animation-name 속성을 사용하여 필요한 애니메이션을 선택합니다.

CSS 애니메이션은 여전히 대부분의 업체에서 프리픽스되고 있으며, `-webkit-`는 Safari, Safari Mobile 및 Android에서 사용되고 있습니다. Chrome, Opera, Internet Explorer 및 Firefox는 모두 프리픽스가 없이 출시됩니다. 필요한 CSS의 프리픽스 버전을 만드는 데 도움이 되는 많은 도구들이 있으며, 이를 통해 소스 파일에서 프리픽스되지 않은 버전을 작성할 수 있습니다.

## 자바스크립트 및 Web Animations API로 애니메이션 만들기

자바스크립트로 애니메이션을 만드는 것은 CSS 전환 또는 애니메이션을 작성하는 것보다 휠씬 복잡하지만, 일반적으로 개발자에게 더욱 강력한 성능을 제공합니다. [Web Animations API](https://w3c.github.io/web-animations/)를 사용하여 특정 CSS 속성에 애니메이션을 적용하거나 합성 가능한 효과 객체를 빌드할 수 있습니다.

자바스크립트 애니메이션이 *필수적*인 이유는, 코드의 일부분으로 인라인 작성되기 때문입니다. 또한 다른 객체 내에 캡슐화할 수도 있습니다. 아래는 이전에 설명한 CSS 전환을 재생성하도록 코드를 작성해야 하는 자바스크립트입니다.


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

기본적으로, 웹 애니메이션은 요소의 표현만을 수정합니다. 이동한 위치에 객체를 그대로 남겨두려면, 애니메이션이 완료된 후에 각 샘플에 따라 기본 스타일을 수정해야 합니다.

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

Web Animations API는 W3C의 새로운 표준입니다. 이 API는 Chrome 및 Opera에서 기본적으로 지원되며, [Firefox용으로 한창 개발 중](https://birtles.github.io/areweanimatedyet/){: .external }입니다. 다른 최신 브라우저의 경우 [폴리필을 사용할 수 있습니다](https://github.com/web-animations/web-animations-js).

자바스크립트 애니메이션에서는 모든 단계에서 요소 스타일을 완벽하게 제어할 수 있습니다. 즉, 애니메이션을 감속, 일시 중지, 중지 또는 되감기할 수 있으며 요소를 보면서 조작할 수 있습니다. 이는 특히 복잡한 객체 지향 애플리케이션을 빌드하는 경우에 유용한데, 그 이유는 동작을 적절히 캡슐화할 수 있기 때문입니다.


{# wf_devsite_translation #}
