project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 합성(compositing)은 화면에 표시하기 위해 페이지에서 페인트된 부분을 합치는 과정입니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# 컴포지터(compositor) 전용 속성 고수 및 레이어 수 관리 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

합성(compositing)은 화면에 표시하기 위해 페이지에서 페인트된 부분을
합치는 과정입니다.

이 영역에서 페이지 성능에 영향을 주는 두 가지 핵심 요소가 있습니다. 관리가 필요한 컴포지터 레이어 수와 애니메이션에 사용하는 속성이 바로 그것입니다.

### TL;DR {: .hide-from-toc }

* 애니메이션에 변형 및 불투명도 변경 사용을 고수합니다.
* `will-change` 또는 `translateZ`를 사용하여 이동 요소를 승격합니다.
* 승격 규칙의 남용을 피합니다. 레이어는 메모리와 관리가 필요합니다.

## 애니메이션에 변형 및 불투명도 변경 사용

레이아웃과 페인트를 모두 피하고 합성 변경만 요구하는 픽셀 파이프라인 버전이 최고의 성능을 제공합니다.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"  alt="레이아웃과 페인트가 없는 픽셀 파이프라인">

이를 달성하기 위해 컴포지터가 단독으로 처리할 수 있는 변경 속성을 고수해야 합니다. 현재 부합되는 속성으로는 **`transforms`** 및 **`opacity`**라는 두 개의 속성만 있습니다.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"  alt="레이아웃 또는 페인트를 트리거하지 않고 애니메이션을 적용할 수 있는 속성">

`transform` 및 `opacity` 사용 시 주의할 점은 이러한 속성을 변경하는 요소가 _자체 컴포지터 레이어_ 에 있어야 한다는 것입니다. 레이어를 만들기 위해 요소를 승격해야 합니다. 이에 대해서는 다음 섹션에서 설명합니다.

참고: 애니메이션을 해당 속성으로 제한할 수 없을지도 모른다고 염려되면 [FLIP 원칙](https://aerotwist.com/blog/flip-your-animations)을 참조하세요. 여기에서 애니메이션을 비용이 많이 드는 속성의 변형 및 불투명도 변경에 다시 매핑할 수 있습니다.

## 애니메이션을 적용할 요소 승격

'[페인트 복잡성 단순화 및 페인트 영역 줄이기](simplify-paint-complexity-and-reduce-paint-areas)' 섹션에서 언급한 것처럼, 애니메이션을 적용할 요소를 자체 레이어로 승격해야 합니다(합당한 사유가 있는 경우에만 시도하고 남용하지 마세요!).


    .moving-element {
      will-change: transform;
    }


또는 이전 브라우저나 will-change를 지원하지 않는 브라우저의 경우에는 다음을 사용합니다.


    .moving-element {
      transform: translateZ(0);
    }


그러면 변경이 들어오는 중이고 변경하려는 항목에 따라 브라우저가 잠재적으로 컴포지터 레이어 생성 등 프로비전을 만들 수 있음을 브라우저에게 사전 경고합니다.

## 레이어 관리 및 레이어 급증 피하기

레이어가 성능 개선에 도움이 된다는 사실을 인지하고 다음을 사용하여 페이지의 모든 요소를 승격하는 것은 매력적입니다.


    * {
      will-change: transform;
      transform: translateZ(0);
    }


이는 페이지의 모든 단일 요소를 승격하고 싶다는 우회적인 표현입니다. 여기에서 문제는 생성하는 모든 레이어가 메모리와 관리가 필요하며 이는 공짜가 아니라는 점입니다. 실제로 제한된 메모리를 가진 기기에서 성능에 미치는 영향이 레이어 생성의 이점을 훨씬 상회할 수 있습니다. 모든 레이어의 텍스처는 GPU로 업로드되어야 하며, 따라서 CPU와 GPU 간의 대역폭과 GPU에서 텍스처에 사용할 수 있는 메모리에 추가적인 제약이 있습니다.

Warning: 요소를 불필요하게 승격하지 마세요.

## Chrome DevTools를 사용하여 앱의 레이어 이해

<div class="attempt-right">
  <figure>
    <img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" alt="Chrome DevTools에서 페인트 프로파일러 전환">
  </figure>
</div>

요소가 레이어를 가지는 이유와 애플리케이션의 레이어를 이해하려면 Chrome DevTools의 Timeline에서 페인트 프로파일러를 활성화해야 합니다.

<div style="clear:both;"></div>

이 기능이 활성화된 상태에서 레코딩을 수행해야 합니다. 레코딩이 완료되면 개별 프레임을 클릭할 수 있습니다. 이 프레임은 초당 프레임 막대와 세부정보 사이에 있습니다.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"  alt="개발자가 프로파일링할 프레임">

이 항목을 클릭하면 세부정보: 레이어 탭에 새 옵션이 제공됩니다.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"  alt="Chrome DevTools의 레이어 탭 버튼">

이 옵션은 각 레이어가 생성된 이유와 함께 해당 프레임 동안 모든 레이어에서 이동, 스캔 및 확대/축소를 수행할 수 있는 새 보기를 표시합니다.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"  alt="Chrome DevTools의 레이어 보기">

이 보기를 사용하여 레이어 수를 추적할 수 있습니다. 스크롤이나 전환처럼 성능이 중요한 작업 동안 합성에 많은 시간을 소모한 경우(약 **4-5ms**를 목표로 설정해야 함), 여기에 나오는 정보를 사용하여 몇 개의 레이어가 있는지, 왜 생성되었는지 확인하여 앱에서 레이어 수를 관리할 수 있습니다.


{# wf_devsite_translation #}
