---
title: "사용자 지정 Easing"
description: "프로젝트에 대한 사용자 지정 easing 애니메이션을 만듭니다."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "사용자 지정 easing을 사용하여 프로젝트의 개성을 강화할 수 있습니다."
    - "기본 애니메이션 곡선(ease-out, ease-in 등)과 닮았지만 여러 장소를 강조하는 3차원 베지어 곡선을 만들 수 있습니다."
    - "탄성 또는 바운스 애니메이션 등 애니메이션 타이밍과 동작을 더욱 세밀하게 제어해야 하는 경우 JavaScript를 사용합니다." 
---
<p class="intro">
  CSS에 포함된 easing 키워드를 사용하지 않거나 JavaScript 기반 애니메이션 라이브러리를 사용할 수 있습니다. 두 경우 모두 일반적으로 고유한 곡선(또는 방정식)을 정의하여 프로젝트에서 애니메이션의 느낌을 많이 제어할 수 있습니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

CSS로 애니메이션을 만드는 경우, 3차원 베지어 곡선을 정의하여 타이밍을 정의할 수 있다는 것을 알게 될 것입니다. 실제로, `ease`, `ease-in`, `ease-out` 및 `linear` 키워드는 사전 정의된 베지어 곡선에 매핑됩니다. 이에 대한 자세한 내용은 [CSS 전환 사양](http://www.w3.org/TR/css3-transitions/)을 참조하십시오.

CSS에서 이러한 베지어 곡선은 4개의 값, 즉 2쌍의 숫자를 취하며, 각 쌍은 3차원 베지어 곡선 제어점의 X 및 Y 좌표를 나타냅니다.  베지어 곡선의 시작 좌표는 (0, 0)이고 끝 좌표는 (1, 1)입니다. 두 제어점의 X 및 Y 값을 설정합니다. 두 제어점의 X 값은 0과 1 사이여야 하고, 각 제어점의 Y 값은 [0, 1] 제한을 초과할 수 있습니다(사양은 명확하지 않음)!

각 제어점의 X 및 Y 값을 변경하면 아주 다른 곡선이 되므로 애니메이션의 느낌도 많이 달라집니다. 예를 들어, 첫 번째 제어점이 오른쪽 하단에 있으면 애니메이션이 느리게 시작합니다. 첫 번째 제어점이 왼쪽 상단 영역에 있으면 애니메이션이 빠르게 시작합니다. 반대로, 두 번째 제어점이 그리드의 오른쪽 하단에 있으면 빠르게 끝나고, 왼쪽 상단에 있으면 느리게 끝납니다.

다음은 일반적인 ease-in-out 곡선과 사용자 지정 곡선의 비교입니다.

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Ease-in-out 애니메이션 곡선" />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="사용자 지정 애니메이션 곡선" />

{% link_sample _code/box-move-custom-curve.html %}사용자 지정 easing 애니메이션을 참조하십시오.{% endlink_sample %}

다음은 사용자 지정 곡선용 CSS입니다.

{% highlight css %}
transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
{% endhighlight %}

첫 번째 두 숫자는 첫 번째 제어점의 X 및 Y 좌표이고 두 번째 두 숫자는 두 번째 제어점의 X 및 Y 좌표입니다.

사용자 지정 곡선을 만드는 것은 매우 재미있고, 사용자 지정 곡선으로 애니메이션의 느낌을 세밀하게 제어할 수 있습니다. 예를 들어, 위의 곡선은 전통적인 ease-in-out 곡선과 닮았지만 ease-in(가속) 부분이 짧고 끝의 감속 부분이 긴 것을 확인할 수 있습니다.

이 {% link_sample _code/curve-playground.html %}애니메이션 곡선 도구{% endlink_sample %}를 체험해 보고 곡선이 애니메이션의 느낌에 어떤 영향을 주는지 확인하십시오.

## 세밀한 제어를 하려면 JavaScript 사용

3차원 베지어 곡선이 제공하는 것보다 더욱 세밀한 제어가 필요한 경우가 있습니다. 탄성 바운스 느낌을 원하거나 중간에 애니메이션 일부의 실행을 멈추기를 원할 수도 있는데, 두 가지 모두 CSS로는 어렵습니다. 이러한 경우에 JavaScript 애니메이션 라이브러리를 사용해야 합니다. 최고의 라이브러리 중 하나는 [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)로 (또는 초경량으로 유지하기를 원할 경우 TweenLite), 작은 JavaScript 라이브러리로 많은 부분을 제어할 수 있고 매우 풍성한 코드베이스를 제공합니다.

{% link_sample _code/box-move-elastic.html %}elastic ease 애니메이션을 참조하십시오.{% endlink_sample %}

TweenMax와 같은 라이브러리를 사용하려면 페이지에 다음 스크립트를 포함해야 합니다.

{% highlight html %}
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
{% endhighlight %}

그렇게 한 경우 요소에 대해 TweenMax를 호출하고 원하는 easing과 원하는 속성을 알려줄 수 있습니다. 다양한 easing 옵션을 사용할 수 있습니다. 아래 코드는 elastic ease-out을 사용합니다.

{% highlight javascript %}
var box = document.getElementById('my-box');
var animationDurationInSeconds = 1.5;

TweenMax.to(box, animationDurationInSeconds, {
  x: '100%',
  ease: 'Elastic.easeOut'
});
{% endhighlight %}

여기서 설명한 모든 옵션에 대한 자세한 내용은 [TweenMax 설명서](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/)를 참조하십시오.



