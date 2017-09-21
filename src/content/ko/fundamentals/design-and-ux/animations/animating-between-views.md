project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱에서 두 뷰 사이에 애니메이션을 적용하는 방법을 알아봅니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# 뷰 간 애니메이션 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

애플리케이션에서 목록 뷰와 세부정보 뷰 등 두 뷰 사이를 이동하거나 사이드바 탐색을 표시하는 경우가 종종 있습니다. 이러한 뷰 간 애니메이션은 사용자의 몰입도를 유지하고 프로젝트에 생명력을 불어넣습니다.

### TL;DR {: .hide-from-toc }
* 전환을 사용하여 뷰 사이를 이동하고, 레이아웃을 트리거하는 `left`, `top` 또는 기타 모든 속성의 사용을 피합니다.
* 사용하는 애니메이션은 간결하고 기간은 짧아야 합니다.
* 화면 크기가 커짐에 따라 애니메이션과 레이아웃이 어떻게 변하는지 고려합니다. 작은 화면에 적합한 애니메이션과 레이아웃이 데스크톱 화면에서는 이상하게 보일 수 있습니다.

이러한 뷰 전환의 모양과 동작은 다루고 있는 뷰 유형에 많이 의존합니다. 예를 들어, 뷰 상단의 모달 오버레이 애니메이션은 목록 뷰 및 세부정보 뷰 간의 전환과는 달라야 합니다.

Success: 모든 애니메이션에서 60fps를 유지해 보세요. 그러면, 버벅거리는 애니메이션이 사용자 환경을 방해하는 것을 막아줍니다. 애니메이션을 시작하기 전에 변경할 사항이 있는 경우 애니메이션 요소에 `will-change`를 설정해야 합니다. 뷰 전환을 위해 `will-change: transform`을 주로 사용합니다.

## 전환을 사용하여 뷰 간 이동

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="두 뷰 간 전환" />
  </figure>
</div>

단순화하여, 목록 뷰와 세부정보 뷰라는 두 뷰가 있다고 가정합시다. 사용자가 목록 뷰 내의 목록 항목을 누르면 세부정보 뷰가 슬라이드인하고 목록 뷰가 슬라이드아웃합니다.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="뷰 계층 구조." />
  </figure>
</div>

이 효과를 달성하려면 두 뷰에 대해 `overflow: hidden`으로 설정된 컨테이너가 필요합니다. 이러한 방식으로 두 뷰는 가로 스크롤바를 표시하지 않고 컨테이너 내부에 나란히 있을 수 있고, 각 뷰는 필요에 따라 컨테이너 내부에서 나란히 슬라이드할 수 있습니다.

<div style="clear:both;"></div>

다음은 컨테이너용 CSS입니다.


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

컨테이너의 위치는 `relative`로 설정되어 있습니다. 즉, 내부의 각 뷰를 왼쪽 상단의 절대 위치로 지정한 다음, 변형으로 주변을 이동할 수 있습니다. 이 접근방식은 레이아웃과 페인트를 트리거하기 때문에 `left` 속성을 사용하는 것보다 성능이 우수하며, 일반적으로 합리화하기 더 쉽습니다.


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

`transform` 속성에 `transition`을 추가하면 멋진 슬라이드 효과를 제공할 수 있습니다. 멋진 느낌을 주기 위해, [사용자설정 Easing 가이드](custom-easing)에서 설명한 대로 사용자설정 `cubic-bezier` 곡선을 사용합니다.


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

화면에서 벗어난 뷰는 오른쪽으로 전환되어야 하며 이 경우 세부정보 뷰를 이동해야 합니다.


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

이제 클래스를 처리하기 위해 소량의 자바스크립트가 필요합니다. 이는 뷰에서 적합한 클래스를 전환합니다.


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

마지막으로, 해당 클래스에 대해 CSS 선언을 추가합니다.


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

이를 확장하여 여러 뷰에 적용할 수 있으며, 기본 개념은 동일하게 유지됩니다. 즉, 보이지 않는 각 뷰는 화면에서 벗어나 있고 필요에 따라 가져오며, 현재 화면 속 뷰는 화면 밖으로 이동되어야 합니다.

Caution: 이러한 종류의 계층 구조를 다중 브라우저(cross-browser) 방식으로 만드는 것은 어려울 수 있습니다. 예를 들어, iOS는 플링 스크롤(fling scrolling)을 '재활성화'하려면 추가 CSS 속성  <code>-webkit-overflow-scrolling: touch</code>가 필요하지만, 표준 오버플로 속성으로 할 수 있는 것처럼 축을 제대로 제어하지 못합니다. 다양한 기기에서 구현을 테스트하세요!

이 기술은 뷰 간 전환뿐만 아니라 슬라이드바 탐색 요소와 같은 다른 슬라이드인 요소에도 적용될 수 있습니다. 유일한 차이는 다른 뷰를 이동할 필요가 없다는 점입니다.

## 애니메이션이 더 큰 화면에서 작동하도록 보장

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="큰 화면에서의 뷰 계층 구조" />
  </figure>
</div>

더 큰 화면의 경우 목록 뷰를 제거하지 않고 항상 유지하며, 세부정보 뷰를 오른쪽에서 슬라이드합니다. 탐색 뷰를 다루는 것과 거의 동일합니다.






{# wf_devsite_translation #}
