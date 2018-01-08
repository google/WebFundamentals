project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 애니메이션을 부드럽게 하고 가중치를 주는 방법을 배웁니다.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# easing의 기본 사항 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

본질적으로 어떤 것도 한 지점에서 다른 지점으로 선형 이동하지 않습니다. 실제로, 물건이 이동할 때 가속하거나 감속하는 경향이 있습니다. 우리의 뇌는 이러한 종류의 모션을 예상하므로 애니메이션을 만들 때 이러한 모션을 활용해야 합니다. 자연스러운 모션은 앱 사용자에게 편안한 느낌을 주고 전반적인 사용 환경을 개선해 줍니다.

### TL;DR {: .hide-from-toc }
* easing은 애니메이션을 자연스럽게 만듭니다.
* UI 요소에 대해 ease-out 애니메이션을 선택합니다.
* 짧게 유지할 수 있는 경우를 제외하고 ease-in 또는 ease-in-out 애니메이션을 피하세요. 최종 사용자에게 굼뜬 느낌을 줄 수 있습니다.


전통적인 애니메이션에서 느린 시작 후 가속하는 모션을 'slow in'이라고 하고 빠른 시작 후 감속하는 모션을 'slow out'이라고 합니다. 웹에서는 각 모션에 대해 'ease in' 및 'ease out'이라는 용어를 주로 사용합니다. 두 모션이 조합된 경우는 'ease in out'이라고 합니다. easing은 실제로 애니메이션을 더욱 부드럽고 편안한 느낌이 들게 만드는 프로세스입니다.

## easing 키워드

CSS 전환 및 애니메이션을 통해 [애니메이션에 사용할 easing 종류를 선택](choosing-the-right-easing)할 수 있습니다. 애니메이션의 easing(`timing`이라고도 함)에 영향을 주는 키워드를 사용할 수 있습니다. 또한 [easing을 완전히 사용자설정](custom-easing)하여 앱의 개성을 훨씬 자유롭게 표현할 수 있습니다.

다음은 CSS에서 사용할 수 있는 키워드 중 일부입니다.

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

출처: [CSS 전환, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

`steps` 키워드를 사용하여 불연속 단계를 지닌 전환을 생성할 수도 있지만, 위에 나열된 키워드는 자연스러운 느낌의 애니메이션을 생성하는 데 가장 유용합니다.

## 선형 애니메이션

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="선형 ease 애니메이션 곡선" />
  </figure>
</div>

easing을 사용하지 않은 애니메이션을 **선형**이라고 합니다. 선형 전환의 그래프는 다음과 유사합니다.

시간 경과에 따라, 값이 균일하게 증가합니다. 선형 모션을 사용할 경우, 로봇처럼 부자연스러운 느낌을 주므로 사용자가 불편함을 느낄 수 있습니다. 일반적으로, 선형 모션을 피해야 합니다.

애니메이션 코딩에 CSS를 사용하든 자바스크립트를 사용하든 상관없이 항상 선형 모션에 대한 옵션이 있습니다. 

[선형 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

CSS로 위의 효과를 달성하려면 다음과 같은 코드를 작성해야 합니다.


    transition: transform 500ms linear;
    


## Ease-out 애니메이션

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="Ease-out 애니메이션 곡선" />
  </figure>
</div>

Easing out은 선형보다 더 빠르게 애니메이션을 시작하며 마지막에 감속합니다.

Easing out은 빠른 시작으로 애니메이션에 반응 효과를 주면서도 마지막에 자연스러운 감속 효과를 나타내기 때문에, 일반적으로 사용자 인터페이스 작업에 가장 적합합니다.

[Ease-out 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

ease out 효과를 달성하는 많은 방법이 있지만 가장 간단한 방법은 CSS의 `ease-out` 키워드입니다.


    transition: transform 500ms ease-out;
    


## Ease-in 애니메이션

<div class="attempt-right">
  <figure>
    <img src="images/ease-in.png" alt="Ease-in 애니메이션 곡선" />
  </figure>
</div>

Ease-in 애니메이션은 ease-out 애니메이션과 반대로 느리게 시작했다가 빠르게 끝납니다.

이러한 종류의 애니메이션은 무거운 돌이 떨어지는 것처럼 느리게 시작하고 낮은 쿵 소리와 함께 빠르게 지면을 때립니다.

하지만 상호작용 관점에서 ease-in은 갑작스럽게 끝나기 때문에 약간 부자연스러운 느낌이 들 수 있습니다. 실제 세상에서 움직임은 단순히 갑자기 멈추는 것이 아니라 감속하는 경향이 있기 때문입니다. 또한 ease-in은 시작 시 굼뜨게 움직이는 듯한 잘못된 효과로 인해 사이트나 앱에서 반응 인지에 부정적 영향을 미칠 수 있습니다.

[Ease-in 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

ease-in 애니메이션을 사용하려면 ease-out 및 선형 애니메이션과 유사하게 다음 키워드를 사용할 수 있습니다.


    transition: transform 500ms ease-in;
    

## Ease-in-out 애니메이션

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="Ease-in-out 애니메이션 곡선" />
  </figure>
</div>

Easing in 및 easing out은 차량의 가속 및 감속과 유사하며, 적절히 조합하여 사용하면 easing out만 사용하는 것보다 더욱 드라마틱한 효과를 제공할 수 있습니다.

ease-in은 애니메이션을 더디게 시작하기 때문에 애니메이션 기간을 지나치게 오래 설정하지 마세요. 일반적으로 300-500ms 사이의 임의 값이 적합하지만, 정확한 값은 프로젝트의 느낌에 따라 상당히 달라집니다. 그러나 느린 시작, 빠른 중간, 느린 종료로 인해 애니메이션의 대비가 증가하여 사용자에게 만족감을 줄 수 있습니다.

[Ease-in-out 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


Ease-in-out 애니메이션을 구현하려면, 다음 `ease-in-out` CSS 키워드를 사용할 수 있습니다.


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
