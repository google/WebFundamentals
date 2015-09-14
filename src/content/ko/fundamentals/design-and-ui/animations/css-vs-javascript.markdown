---
title: "CSS 애니메이션과 JavaScript 애니메이션 비교"
description: "CSS 또는 JavaScript로 애니메이션을 만들 수 있습니다. 어떤 애니메이션을 왜 사용해야 하나요?"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "UI 요소 상태 전환과 같은 간단한 '단일 쇼트(one-shot)' 전환에 CSS 애니메이션을 사용합니다."
    - "바운스, 중지, 일시 중지, 되감기 또는 감속과 같은 고급 효과를 원할 경우에 JavaScript 애니메이션을 사용합니다."
    - "JavaScript로 애니메이션 만들 경우 TweenMax 또는 TweenLite(더 가벼운 솔루션을 원할 경우)를 사용합니다."

notes:
  keyframes:
    - "애니메이션 초보자를 위해 설명하자면 키프레임은 손으로 그린 애니메이션에 사용하던 용어입니다. 애니메이터는 모션의 가장 핵심적인 부분을 캡처하는 키프레임이라는 특정 동작 프레임을 만든 다음 키프레임 사이에 모든 개별 프레임을 그려 넣는 방식으로 진행합니다. 현재 CSS 애니메이션도 유사한 프로세스를 갖고 있으며, 주어진 시점에서 CSS 속성이 어떤 값을 가져야 하는지 브라우저에게 알려주고 그 간격을 채웁니다."
  setinterval:
    - "웹에서 애니메이션에 setInterval 또는 setTimeout을 사용하는 코드를 찾을 수 있습니다. 애니메이션이 화면의 새로 고침 빈도에 동기화되지 않고 떨리거나 튀는 경향이 있으므로 해당 코드는 부적절합니다. 항상 이러한 코드를 피하고 대신 올바로 동기화되는 requestAnimationFrame을 사용하십시오."

---
<p class="intro">
  웹에서 CSS와 JavaScript로 애니메이션을 만들 수 있습니다. 어느 것을 사용할지는 프로젝트의 기타 종속성과 원하는 효과의 종류에 따라 결정됩니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

대부분의 기본 애니메이션은 CSS 또는 JavaScript로 만들 수 있지만 투자하는 노력과 시간은 다릅니다([CSS와 JavaScript의 성능 비교]({{site.fundamentals}}/look-and-feel/animations/animations-and-performance.html#css-vs-javascript-performance) 참조). 각각 장단점이 있지만 다음과 같은 규칙이 적용됩니다.

* **UI 요소에 대해 작고 자체적으로 포함된 상태가 있는 경우 CSS를 사용합니다.** CSS 전환 및 애니메이션은 측면에 탐색 메뉴를 나타내거나 툴팁을 표시하는 데 적합합니다. JavaScript를 사용하여 상태를 제어할 수 있지만 애니메이션 자체는 CSS에 있게 됩니다.
* **애니메이션을 세밀하게 제어해야 하는 경우에 JavaScript를 사용합니다.** 터치 위치를 동적으로 추적하거나, 중지, 일시 중지, 감속 또는 거꾸로 재생해야 하는 경우 주로 JavaScript를 사용해야 합니다.

애니메이션 기능이 포함된 jQuery 또는 JavaScript 프레임워크를 이미 사용 중인 경우, CSS로 전환하지 않고 해당 프레임워크를 애니메이션에 사용하는 것이 전반적으로 훨씬 편리하다는 것을 알 수 있습니다.

### CSS로 애니메이션 만들기

CSS로 애니메이션을 만드는 것이 화면에서 움직임을 표현하는 가장 간단한 방법입니다.

다음은 X축과 Y축 모두에서 요소를 100px 이동하는 CSS입니다. 이 과정은 500ms가 걸리도록 설정된 CSS 전환을 사용하여 수행됩니다. `move` 클래스가 추가되면 `transform` 값이 변경되고 전환이 시작됩니다.

{% highlight css %}
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
{% endhighlight %}

{% link_sample _code/box-move-simple.html %}샘플 보기{% endlink_sample %}

전환 기간 이외에도 애니메이션에 느낌을 적용하는 easing 옵션이 있습니다. 자세한 내용은 [“Easing의 기본 사항”](the-basics-of-easing.html) 가이드를 참조하십시오.

위의 코드 조각처럼 별도의 CSS 클래스를 만들어 애니메이션을 관리하면 JavaScript를 사용하여 각 애니메이션을 활성화/비활성화할 수 있습니다.

{% highlight javascript %}
box.classList.add('move');
{% endhighlight %}

이러한 방법으로 앱에 매우 멋진 균형을 제공할 수 있습니다. JavaScript로 상태 관리에 중점을 두고, 대상 요소에서 적합한 클래스를 설정하고, 브라우저가 애니메이션을 처리하도록 할 수 있습니다. 이 경로를 따르면 요소에서 `transitionend` 이벤트를 수신 대기할 수 있지만, Internet Explorer은 이러한 이벤트를 지원하는 버전 10 이상인 경우에만 가능합니다. 다른 브라우저도 얼마 전부터 이 이벤트를 지원했습니다.

전환의 끝에서 수신 대기하는 데 필요한 JavaScript는 다음과 같습니다.

{% highlight javascript %}
var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}
{% endhighlight %}

CSS 전환과 더불어 CSS 애니메이션도 사용할 수 있어야 합니다. 이를 통해 개별 애니메이션 키프레임, 기간 및 반복을 휠씬 세밀하게 제어할 수 있습니다.

{% include shared/remember.liquid title="Note" list=page.notes.keyframes %}

예를 들어, 전환과 동일한 방법으로 상자에 애니메이션을 적용할 수 있지만, 클릭과 같은 사용자 상호작용 없이 무한 반복으로 애니메이션 효과를 낼 수 있습니다. 여러 속성을 동시에 변경할 수도 있습니다.

{% highlight css %}
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need) things get far
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
{% endhighlight %}

{% link_sample _code/box-move-keyframes.html %}샘플 보기{% endlink_sample %}

CSS 애니메이션으로 애니메이션 자체를 대상 요소와 독립적으로 정의하고, animation-name 속성을 사용하여 필요한 애니메이션을 선택합니다.

CSS Animations는 여전히 대부분의 업체에서 프리픽스되고 있으며, `-webkit-`는 Chrome, Safari, Opera, Safari Mobile 및 Android Browser에서 사용되고 있습니다. Internet Explorer와 Firefox는 모두 프리픽스 없이 출시됩니다. 필요한 CSS의 프리픽스 버전을 만드는 데 도움이 되는 많은 도구들이 있으며, 이를 통해 소스 파일에서 프리픽스되지 않은 버전을 작성할 수 있습니다.

### JavaScript로 애니메이션 만들기

JavaScript로 애니메이션을 만드는 것은 CSS 전환 또는 애니메이션을 작성하는 것보다 휠씬 복잡하지만, 일반적으로 개발자에게 더욱 강력한 성능을 제공합니다. 일반적인 접근방식은 `requestAnimationFrame`을 사용하고, 애니메이션의 각 프레임에서 애니메이션을 적용 중인 요소의 각 속성 값을 수동으로 지정하는 것입니다.

{% include shared/remember.liquid title="Note" list=page.notes.setinterval %}

아래는 이전에 설명한 CSS 전환을 재생성하도록 코드를 작성해야 하는 JavaScript입니다.

{% highlight javascript %}
function Box () {

  var animationStartTime = 0;
  var animationDuration = 500;
  var target = document.querySelector('.box');

  this.startAnimation = function() {
    animationStartTime = Date.now();
    requestAnimationFrame(update);
  };

  function update() {
    var currentTime = Date.now();
    var positionInAnimation = (currentTime - animationStartTime) / animationDuration;

    var xPosition = positionInAnimation * 100;
    var yPosition = positionInAnimation * 100;

    target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';

    if (positionInAnimation <= 1)
      requestAnimationFrame(update);
  }
}

var box = new Box();
box.startAnimation();
{% endhighlight %}

{% link_sample _code/box-move-js.html %}샘플 보기{% endlink_sample %}

이 코드는 더 많은 경우를 포함하도록 확장해야 하기 때문에 매우 복잡하고 관리하기 어렵습니다. 따라서 애니메이션에 사용할 수 있는 많은 JavaScript 라이브러리 중 하나를 선택하면 도움이 됩니다. 프로젝트에서 이미 jQuery를 사용 중인 경우, 이를 활용하고 [`.animate()`](http://api.jquery.com/animate/) 함수를 사용할 수 있습니다. 반면에 전용 라이브러리가 필요한 경우 매우 강력한 [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)를 참조하십시오. 파일 크기 면에서 더욱 친숙한 TweenLite라는 라이트 버전이 있습니다.

JavaScript 애니메이션을 사용하면 모든 단계에서 요소 스타일을 완벽히 제어할 수 있기 때문에, 애니메이션을 감속, 일시 중지, 중지 또는 거꾸로 재생하거나 적절히 조작할 수 있습니다.


