---
title: "애니메이션 및 성능"
description: "애니메이션은 성능이 우수해야 합니다. 그렇지 않으면 사용자에게 거부감을 줄 수 있습니다."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "애니메이션이 성능 문제를 일으키지 않도록 주의하십시오. 주어진 CSS 속성 애니메이션의 영향을 숙지하십시오."
    - "페이지의 기하학적 형태(레이아웃)를 변경하거나 그림 그리기를 유발하는 애니메이션 속성은 특히 비용이 많이 듭니다."
    - "가급적 변형 및 불투명도 변경을 고수하십시오."
    - "<code>will-change</code>를 사용하여 브라우저가 애니메이션 대상을 알 수 있도록 하십시오."
related-guides:
  blocking-css:
  -
      title: "CSS 차단 렌더링"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css.html
      section:
        id: critical-rendering-path
        title: "주요 렌더링 경로"
        href: performance/critical-rendering-path/
---
<p class="intro">
  애니메이션을 만들 때마다 60fps를 유지하도록 신경을 써야 합니다. 애니메이션이 버벅거리거나 정지하면 사용자의 눈에 띄고 거부감을 줄 수 있습니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

애니메이션 속성은 무료가 아니며 각 속성의 비용은 다릅니다. 예를 들어, 요소의 `width` 및 `height` 애니메이션은 기하학적 형태를 변경하고 페이지의 다른 요소를 이동하거나 크기를 변경할 수 있습니다. 이 프로세스를 레이아웃(Firefox와 같은 Gecko 기반 브라우저에서는 재배치)이라고 하며, 페이지에 많은 요소가 있는 경우 비용이 많이 들 수 있습니다. 레이아웃이 트리거될 때마다 페이지 또는 페이지의 일부를 그려야 하며, 이는 일반적으로 레이아웃 작업 자체보다 휠씬 많은 비용이 듭니다.

레이아웃 또는 그림 그리기를 트리거하는 애니메이션 속성은 가급적 피해야 합니다. 최신 브라우저의 경우 이는 애니메이션을 `opacity` 또는 `transform`으로 제한하는 것을 의미하며 이 둘은 브라우저에서 효과적으로 최적화될 수 있습니다. 애니메이션이 JavaScript 또는 CSS에 의해 처리되는지 여부는 상관이 없습니다.

개별 CSS 속성에 의해 트리거되는 작업의 전체 목록은 [CSS 트리거](http://csstriggers.com)을 참조하십시오. [HTML5 Rocks에서 고성능 애니메이션](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) 생성에 대한 전체 가이드도 참조하십시오.

{% include shared/related_guides.liquid inline=true list=page.related-guides.blocking-css %}

### will-change 속성 사용

[`will-change`](http://dev.w3.org/csswg/css-will-change/)를 사용하여 브라우저가 요소의 속성 변경 계획을 알 수 있도록 하는 것이 좋습니다. 그러면 개발자가 변경하기 전에 브라우저가 최적화할 수 있습니다. 하지만 브라우저가 리소스를 낭비하여 더 많은 성능 문제를 야기할 수 있으므로 `will-change`를 남용하지 않도록 주의하십시오.

일반적으로 사용자의 상호작용으로 또는 애플리케이션의 상태로 인해 다음 200ms 이내에 애니메이션이 트리거될 수 있는 경우 애니메이션 요소에 will-change를 적용하는 것이 좋습니다. 대부분의 경우 앱의 현재 보기에서 애니메이션할 요소는 변경할 속성에 대해 `will-change`를 활성화해야 합니다. 이전 가이드에서 사용한 상자 샘플의 경우, 변형 및 불투명도에 `will-change`를 추가하면 다음과 같게 됩니다.

{% highlight css %}
.box {
  will-change: transform, opacity;
}
{% endhighlight %}

이제 이를 지원하는 브라우저(예: Chrome, Firefox 및 Opera)가 최적화하여 해당 속성의 변경 또는 애니메이션을 지원합니다.

## CSS와 JavaScript의 성능 비교

웹 사이트에 CSS 및 JavaScript 애니메이션의 성능 관련 장단점을 비교 토론하는 페이지와 메모 스레드가 많이 있습니다. 다음 두 가지 사항을 유념하십시오.

* CSS 기반 애니메이션은 일반적으로 브라우저의 '기본 스레드'가 아닌 별도의 스레드에서 처리되며, 거기에서 스타일 지정, 레이아웃, 그림 그리기, JavaScript가 실행됩니다. 즉, 브라우저가 기본 스레드에서 비용이 많이 드는 작업을 실행 중인 경우 CSS 기반 애니메이션은 중단되지 않고 잠재적으로 계속 실행될 수 있습니다. 대부분의 경우 변형 및 불투명도 변경은 "컴포지터 스레드"라는 CSS 기반 애니메이션과 동일한 스레드가 처리할 수 있으므로, 애니메이션에서 이들을 사용하는 것이 좋습니다.
* 애니메이션이 그림 그리기 및/또는 레이아웃을 트리거하는 경우, 작업을 수행하기 위해 "기본 스레드"가 필요합니다. 이는 CSS 및 JavaScript 기반 애니메이션에 모두 적용되며, 레이아웃 또는 그림 그리기의 오버헤드는 CSS 또는 JavaScript 실행과 연관된 모든 작업에 악영향을 미치고 해결 불가능한 문제를 유발할 수 있습니다.

주어진 속성 애니메이션에 의해 어떤 작업이 트리거되는지 정확히 알고 싶은 경우 [CSS 트리거](http://csstriggers.com)를 참조하십시오.


