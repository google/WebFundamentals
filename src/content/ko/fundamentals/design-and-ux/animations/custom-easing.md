project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 프로젝트에 대한 사용자설정 easing 애니메이션을 만듭니다.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 사용자설정 easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

CSS에 포함된 easing 키워드를 사용하지 않거나, 웹 애니메이션 또는 자바스크립트 프레임워크를 사용할 수 있습니다. 이 경우에 고유한 곡선(또는 방정식)을 일반적으로 정의할 수 있으며 프로젝트에서 애니메이션의 느낌을 세밀하게 제어할 수 있습니다.

### TL;DR {: .hide-from-toc }
* 사용자설정 easing을 사용하여 프로젝트의 개성을 강화할 수 있습니다.
* 기본 애니메이션 곡선(ease-out, ease-in 등)과 닮았지만 여러 장소를 강조하는 3차원 베지어 곡선을 만들 수 있습니다.
* 탄성 또는 바운스 애니메이션 등 애니메이션 타이밍과 동작을 더욱 세밀하게 제어해야 하는 경우 자바스크립트를 사용합니다.


CSS로 애니메이션을 만드는 경우, 3차원 베지어 곡선을 정의하여 타이밍을 정의할 수 있다는 것을 알게 될 것입니다. 실제로 `ease`, `ease-in`, `ease-out` 및 `linear` 키워드는 사전 정의된 베지어 곡선에 매핑됩니다. 이에 대한 자세한 내용은 [CSS 전환 사양](http://www.w3.org/TR/css3-transitions/) 및 [웹 애니메이션 사양](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve)을 참조하세요.

이러한 베지어 곡선은 4개의 값, 즉 2쌍의 숫자를 취하며, 각 쌍은 3차원 베지어 곡선 제어점의 X 및 Y 좌표를 나타냅니다. 베지어 곡선의 시작 좌표는 (0, 0)이고 끝 좌표는 (1, 1)입니다. 두 제어점의 X 및 Y 값을 설정합니다. 두 제어점의 X 값은 0과 1 사이여야 하고, 각 제어점의 Y 값은 [0, 1] 제한을 초과할 수 있습니다(사양은 명확하지 않음).

각 제어점의 X 및 Y 값을 변경하면 아주 다른 곡선이 되므로 애니메이션의 느낌도 많이 달라집니다. 예를 들어, 첫 번째 제어점이 오른쪽 하단 영역에 있으면 애니메이션이 느리게 시작합니다. 첫 번째 제어점이 왼쪽 상단 영역에 있으면 애니메이션이 빠르게 시작합니다. 반대로, 두 번째 제어점이 그리드의 오른쪽 하단 영역에 있으면 빠르게 끝나고, 왼쪽 상단에 있으면 느리게 끝납니다.

다음은 일반적인 ease-in-out 곡선과 사용자설정 곡선의 비교입니다.

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="Ease-in-out 애니메이션 곡선" />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="사용자설정 애니메이션 곡선" />
  </figure>
</div>

[사용자설정 easing 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

다음은 사용자설정 곡선용 CSS입니다.


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

첫 번째 두 숫자는 첫 번째 제어점의 X 및 Y 좌표이고, 두 번째 두 숫자는 두 번째 제어점의 X 및 Y 좌표입니다.

사용자설정 곡선을 만드는 것은 매우 재미있고, 사용자설정 곡선으로 애니메이션의 느낌을 세밀하게 제어할 수 있습니다. 예를 들어, 위의 곡선은 전통적인 ease-in-out 곡선과 닮았지만 ease-in(또는 '시작') 부분이 짧고 끝의 감속 부분이 긴 것을 확인할 수 있습니다.

이 [애니메이션 곡선 도구](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external }를 체험해 보고, 곡선이 애니메이션의 느낌에 어떤 영향을 주는지 확인하세요.

## 더 세밀한 제어를 위해 자바스크립트 프레임워크 사용

3차원 베지어 곡선이 제공하는 것보다 더욱 세밀한 제어가 필요한 경우가 있습니다. 탄성 바운스 느낌을 원하는 경우 자바스크립트 프레임워크 사용을 고려할 수 있습니다. 그 이유는 CSS 또는 웹 애니메이션으로는 실현하기가 어려운 효과이기 때문입니다.

### TweenMax

강력한 라이브러리 중 하나는 [GreenSock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)(또는 초경량으로 유지하기를 원할 경우 TweenLite)이며, 작은 자바스크립트 라이브러리로 많은 부분을 제어할 수 있고 매우 풍성한 코드베이스를 제공합니다.

[elastic ease 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

TweenMax를 사용하려면 페이지에 이 스크립트를 포함해야 합니다.


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

스크립트가 포함된 후, 요소에 대해 TweenMax를 호출하고 원하는 easing과 원하는 속성을 알려줄 수 있습니다. 다양한 easing 옵션을 사용할 수 있습니다. 아래 코드는 elastic ease-out을 사용합니다.


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

여기서 설명한 모든 옵션에 대한 자세한 내용은 [TweenMax 설명서](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)를 참조하세요.





{# wf_devsite_translation #}
