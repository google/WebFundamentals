project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google과 AnswerLab에서는 사용자가 다양한 모바일 사이트와 어떻게 상호작용하는지에 대한 연구를 시작했습니다. 이 연구의 목적은 '좋은 모바일 사이트란 어떤 것입니까?'라는 질문에 대답하는 것이었습니다.

{# wf_published_on: 2014-08-08 #}
{# wf_updated_on: 2017-07-12 #}

# 좋은 모바일 사이트란 어떤 것입니까? {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google과 AnswerLab에서는 이 질문에 대답하기 위해 [연구 조사](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals)를 수행했습니다. 

> 모바일 사용자는 매우 목적 지향적입니다. 이들은 자신이 필요한 것을
> 자신의 조건에 따라 즉시 찾고 싶어합니다. 

이 연구는 미국의 참가자를 대상으로 하는 119시간 분량의
실황 세션을 통해 수행되었습니다. 참가자는 다양한 종류의 모바일 사이트에서
주요 작업을 수행하라는 요청을 받았습니다. iOS 및 Android 사용자가 포함되었으며 이들 사용자가
자신의 전화에서 사이트를 테스트했습니다. 각 사이트에서 참가자는 전환에 관련된
작업(예: 구매 또는 예약)을 완료할 때 자신의 생각을 크게 말하라는
요청을 받았습니다.

이 연구에서는 5가지 범주로 구분된 25가지 모바일 사이트 디자인 원칙을
발표했습니다.

## 홈 페이지 및 사이트 탐색

Success: 모바일 홈 페이지에서 사용자와 원하는 콘텐츠를 연결하는 데 집중하세요.

### 콜투액션을 앞쪽과 중앙에 유지하세요

보조 작업은 [메뉴](/web/fundamentals/design-and-ux/responsive/)
또는 “하단부”(아래로 스크롤해야만 볼 수 있는 웹페이지 부분)를 통해 사용할 수 있도록 하세요.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자의 가장 일반적인 작업을 쉽게 사용할 수 있도록 하세요.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>금지</b>: '자세히 알아보기'와 같은 애매한 콜투액션으로 귀중한 상단부 공간을 낭비하지 마세요.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 메뉴를 짧고 보기 좋게 유지하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>권장</b>: 메뉴를 짧고 보기 좋게 유지하세요.
     </figcaption>
  </figure>
</div>

모바일 사용자는 원하는 것을 찾기 위해 긴 옵션 목록을 스크롤할
정도의 인내심이 없습니다. 사용성이 떨어지지 않으면서도, 최대한 항목 수가
적도록 메뉴를 재구성하세요.

<div style="clear:both;"></div>

### 홈 페이지로 쉽게 돌아가도록 하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>권장</b>: 홈 페이지로 쉽게 돌아가도록 하세요.
     </figcaption>
  </figure>
</div>

사용자는 모바일 페이지 왼쪽 상단의 로고를 누르면 홈페이지로 돌아갈 것으로 기대하며,
로고가 사용 불가능하거나 작동하지 않으면 실망하게 됩니다.

<div style="clear:both;"></div>

### 광고로 인해 화면이 가리지 않도록 하세요

대용량 앱 설치 삽입광고(예: 콘텐츠를 가리고 사용자에게 앱을
설치하도록 요청하는 전체 페이지 광고)는 사용자를 귀찮게 하며 작업 수행을
어렵게 합니다. 사용자를 귀찮게 만들 뿐만 아니라, 앱 설치 삽입광고를 사용하는
사이트는
[Google 모바일 친화성 테스트](https://search.google.com/test/mobile-friendly)를
통과하지 못하며, 이는 사이트의 검색 순위에 부정적인 영향을 미칩니다.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>권장</b>: 광고는 쉽게 닫을 수 있어야 하며, 사용자의 경험을 방해해서는 안 됩니다.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>금지</b>: 삽입광고(때로는 '도어 슬램'으로도 불림)는 대개 사용자를 귀찮게 하며 사이트 사용을 어렵게 만듭니다.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

## 사이트 검색

Success: 사이트 검색은 모바일 사용자가 원하는 것을 서둘러 찾도록 도와줍니다.

### 사이트 검색이 보이도록 만드세요

정보를 찾는 사용자는 일반적으로 검색을 이용하므로,
검색 필드는 페이지의 가장 눈에 띄는 위치에 있어야 합니다. 검색 상자를 메뉴에
숨기지 마세요.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>권장</b>: 검색이 보이도록 만드세요.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>금지</b>: 검색을 오버플로 메뉴에 숨기지 마세요.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 사이트 검색 결과가 관련되도록 만드세요

사용자는 자신이 원하는 것을 찾기 위해 여러 결과 페이지를 검색하지
않습니다. 자동 완성 쿼리와 맞춤법 교정 및 관련 쿼리 제안을 통해
사용자를 편하게 해주세요. 불필요한 작업을 반복하는
대신, [Google 맞춤검색 엔진](https://cse.google.com/cse/){: .external }과 같은 강력한 제품을 고려해 보세요.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>권장</b>: Macy's에서 어린이 용품만 반환합니다.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>금지</b>: kid라는 단어가 들어간 어떤 검색 결과도 반환하지 마세요.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### 결과를 좁히기 위해 필터를 구현하세요

연구 참가자들은 자신이 원하는 것을 찾기 위해 [필터](/custom-search/docs/structured_search)를
사용하며, 효과적인 필터가 없는 사이트는
포기합니다. 검색 결과 위에 필터를 배치하고, 특정 필터가 적용될 때
얼마나 많은 결과가 반환될지를 표시하여 사용자를 도와주세요.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>권장</b>: 필터링을 쉽게 만드세요.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>금지</b>: 필터 기능을 숨기지 마세요.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 더 나은 사이트 검색 결과로 사용자를 안내하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="사용자가 원하는 것을 질문하여 안내하는 Zappos.">
    <figcaption class="success">
      <b>권장</b>: 올바른 방향으로 사용자를 안내하여 원하는 것을 찾도록 도와주세요.
     </figcaption>
  </figure>
</div>

고객층이 다양한 사이트의 경우, 검색 상자를 표시하기 전에
몇 가지 질문을 하고, 이 질문에 대한 고객의 응답을 검색어 필터로 사용하여,
가장 관련된 고객으로부터 사용자가 더 나은 결과를 얻도록 하세요.

<div style="clear:both;"></div>

## 상거래 및 전환

Success: 여러분의 고객 여정을 이해하고 사용자가 자신의 조건에 따라 전환하도록 하세요. 

### 사용자가 커밋하기 전에 탐색하도록 하세요

사이트를 보려는데 먼저 등록하라고 요구하는 사이트에는
연구 참가자들이 실망을 합니다(특히 브랜드가 생소한 경우). 고객 정보가 여러분의
사업에 필수적일 수는 있지만, 너무 빨리 정보를 요청하면
등록이 줄어들 수 있습니다.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자가 로그인하지 않고도 사이트를 탐색할 수 있도록 하세요.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>금지</b>: 사이트에서 로그인 또는 등록 기능을 너무 앞쪽에 배치하지 마세요.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### 사용자가 게스트로서 구매할 수 있도록 하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자가 게스트 계정으로 구입할 수 있도록 하세요.
     </figcaption>
  </figure>
</div>

연구 참가자들은 게스트 결제가 “편리하고”, “간단하고”, “쉽고” “빠르다고”
생각합니다. 사용자는 구매 시에 계정 등록을 강제하는
사이트를 싫어합니다(특히 계정이 주는 혜택이
불분명할 때).

<div style="clear:both;"></div>

### 기존의 정보를 사용하여 편리성을 극대화하세요

등록된 사용자의 경우
[기본 설정을 미리
채우세요](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly). 신규 사용자에게는 친근한 타사 결제 서비스를 제공하세요.

### 복잡한 작업에는 클릭투콜 버튼을 사용하세요

호출 기능이 있는 기기에서
[클릭투콜 링크](/web/fundamentals/native-hardware/click-to-call/)를 사용하면,
사용자가 이 링크를 누르기만 하면 전화를 걸 수 있습니다. 대부분의 휴대기기에서는,
번호를 누르기 전에 사용자에게 확인 메시지가 표시되거나 번호 처리 방식을 물어보는 메뉴가
사용자에게 표시됩니다.

### 다른 기기에서 쉽게 종료할 수 있게 하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자가 또 다른 기기에서 탐색과 쇼핑을 계속할 수 있는 쉬운 방법을 제공하세요.
     </figcaption>
  </figure>
</div>

사용자는 종종 다른 기기에서 작업을 끝내고 싶어합니다. 예를 들어, 사용자가 더 큰 화면에서 항목을 보고
싶어할 수 있습니다. 또는 지금은 바빠서 나중에
종료하려는 경우도 있습니다. 이러한 고객 여정을 지원하려면, 사용자가 [소셜 네트워크에서
항목을 공유](/web/fundamentals/discovery-and-monetization/social-discovery/)하도록 하거나,
사용자가 사이트 내에서 바로 링크를 이메일로 보내도록 하세요.

<div style="clear:both;"></div>

## 양식 입력

Success: 사용 가능한 양식으로 매끄럽고 원활한 전환 경험을 제공하세요.


### 정보 입력을 간소화

사용자가 Return 키를 누르면 그 다음 필드로 자동으로 이동합니다. 일반적으로
사용자가 수행하는 단계가 적을수록 더 좋습니다.

### 가장 간단한 입력을 선택

각 시나리오에 대해 [가장 적절한 입력 유형](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)을
사용하세요. [`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist)와
같은 요소를
사용하여 제안 값을 필드에 제공하세요.

### 날짜 선택을 위해 시각적 달력을 제공

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>권장</b>: 가능하면 달력 위젯을 사용하세요.
     </figcaption>
  </figure>
</div>

시작 및 종료 날짜에 명확하게 레이블을 사용합니다. 사용자는 사이트를 안 떠나도 되며
달력 앱을 확인하여 날짜를 예약합니다.

<div style="clear:both;"></div>

### 레이블 작업이나 실시간 유효성 검사 시에 양식 오류를 최소화

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>권장</b>: 가능하면 콘텐츠를 미리 채우세요.
     </figcaption>
  </figure>
</div>

레이블 작업을 올바로 수행하고 유효성 검사를 실시간으로 수행합니다.

<div style="clear:both;"></div>

### 효과적인 양식 디자인

[자동완성](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)을
활용하면, 미리 채워진 데이터로 사용자가 쉽게 양식을 작성할 수 있습니다. 이미
알고 있는 정보로 필드를 미리 채우세요. 예를 들어, 배송 주소 및 청구지 주소를
검색할 경우,
[`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)를 사용하거나,
사용자가 배송 주소를 청구지 주소에 복사할 수 있도록 하세요(그 반대도 마찬가지). 

## 사용성 및 폼 팩터

Success: 경험을 향상시켜주는 사소한 것으로 모바일 사용자를 기쁘게 하세요.

### 전체 사이트를 모바일에 최적화

사용자 기기의 크기와 성능에 따라 변화하는 [반응형 레이아웃](/web/fundamentals/design-and-ux/responsive/)을
사용하세요. 연구
참가자들에 따르면 데스크톱과 모바일에 최적화된 페이지가 함께 있는
사이트는 데스크톱 전용 사이트에 비해 더 사용이 어렵다고 합니다.

### 사용자가 손가락으로 확대/축소를 수행하지 않게 하세요

사용자는 사이트에서 가로가 아닌 세로 스크롤을 좋아합니다.
크기가 큰 고정 너비 요소를 피하세요. 다른
화면에 다른 스타일을 적용하려면 [CSS 미디어 쿼리](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)를
사용하세요. 특정
[뷰포트 너비](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)로만
잘 표시되는 콘텐츠는 만들지 마세요.
사용자에게 가로 스크롤을 강제하는 사이트는 [Google 모바일 친화성 테스트](https://search.google.com/test/mobile-friendly)를
통과하지 못하며, 이는 사이트의 검색
순위에 부정적인 영향을 미칩니다.

### 제품 이미지를 확대 가능하게 만들기

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>권장</b>: 상세히 볼 수 있도록 제품 이미지를 확대 가능하게 만드세요.
     </figcaption>
  </figure>
</div>

소매 고객들은 사이트에서 상품을
[고해상도로 확대해서 보기](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)를
원합니다. 연구 참가자들은 구매 중인 상품을 볼 수 없을 때
실망했습니다.

<div style="clear:both;"></div>

### 가장 적합한 방향을 사용자에게 알려주세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>권장</b>: 가장 적합한 방향을 사용자에게 알려주세요.
     </figcaption>
  </figure>
</div>

방향을 전환하라는 어떤 메시지가 나타나기 전까지,
연구 참가자들은 동일한 화면 방향에 머무르는 경향이 있었습니다. 가로 모드와 세로 모드의 겸용으로 디자인하거나,
최적의 방향으로 전환하도록 사용자에게 제안하세요. 사용자가 방향 전환 제안을
무시하더라도 여러분의 중요한 콜투액션이
완료될 수 있도록 하세요.

<div style="clear:both;"></div>

### 사용자를 단일 브라우저 창에 머무르게 하세요

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>권장</b>: Macy's는 현장에서 쿠폰을 제공하여 사용자가 사이트에 머물도록 합니다.
     </figcaption>
  </figure>
</div>

사용자는 여러 창을 전환하는 데 어려움을 겪을 수 있으며,
사이트로 돌아가는 길을 찾지 못할 수도 있습니다. 새로운 창을 시작하는 콜투액션을 피하세요.
사용자가 사이트 밖으로 시선을 돌리게 만드는 여정을 식별하고, 사용자를 사이트 안에
머무르게 하는 기능을 제공하세요. 예를 들어, 여러분이 쿠폰을 받으면 사이트에서
바로 제품을 제공하고, 사용자가 쿠폰 거래를 위해 다른 사이트를
검색하지 않도록 하세요.

<div style="clear:both;"></div>

### '풀사이트'라는 레이블을 피하세요

연구 참가자들이 ‘모바일 사이트’와 ‘풀사이트’(즉, 데스크톱 사이트)라는
옵션을 보았을 때, 모바일 사이트는 콘텐츠가 부족하다고 생각했으며
그 대신 ‘풀사이트’를 선택하고 데스크톱 사이트로 이동했습니다.


### 왜 사용자 위치가 필요한지를 분명히 밝히세요

여러분이 왜 사용자의
[위치](/web/fundamentals/native-hardware/user-location/)를 요청하는지 그 이유를 사용자가 항상 알아야 합니다. 연구
참가자들이 또 다른 도시에서 호텔을 예약하려고 시도했는데,
여행 사이트가 자신들의 현재 위치를 감지하고 현재 도시에서 호텔을 제공하자 이들은
혼란을 느꼈습니다. 기본적으로 위치 필드는 비워두고, “나에게 가까운 위치 찾기”와 같은
명확한 콜투액션을 통해 사용자가 직접 입력하도록 하세요.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>권장</b>: 사용자 동작 시 위치에 대한 액세스를 항상 요청하세요.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>금지</b>: 사이트가 로드되자마자 홈 페이지에서 사용자 위치정보를 요청하면 사용자는 거부감을 갖게 됩니다.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
