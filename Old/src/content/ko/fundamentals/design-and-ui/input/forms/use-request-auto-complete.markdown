---
title: "requestAutocomplete API로 결제 단순화"
description: "<code>requestAutocomplete</code>는 사용자가 양식을 작성하는 데 도움이 되도록 고안되었지만, 장바구니 포기율이 <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>97%에 이를 수 있는</a> 모바일 웹 전자상거래에 현재 가장 많이 사용되고 있습니다 ."
updated_on: 2014-10-21
key-takeaways:
  use-request-auto-complete:
    - <code>requestAutocomplete</code>는 결제 과정을 휠씬 단순화하고 사용자 경험을 개선할 수 있습니다.
    - <code>requestAutocomplete</code>를 제공하면 결제 양식을 숨기고 바로 확인 페이지를 표시할 수 있습니다.
    - 입력 필드에 적합한 자동완성 특성을 포함합니다.
notes:
  use-placeholders:
    - 포커스를 요소에 가져가면 자리 표시자가 즉시 사라지므로 자리 표시자는  레이블을 대체하는 데 사용되지 않습니다. 자리 표시자는 필요한 형식과 콘텐츠를 사용자에게 안내하는 도우미로 사용되어야 합니다.
  recommend-input:
    - 자동완성은 양식 메서드가 게시된 경우에만 작동합니다. 
  use-datalist:
    - <code>datalist</code> 값은 제안으로 제공되므로 사용자가 그 제안을 꼭 선택할 필요는 없습니다.
  provide-real-time-validation:
    - 클라이언트측 입력 유효성 검사 시에도 데이터의 일관성과 보안을 보장하기 위해 서버 데이터 유효성을 검사하는 것은 항상 중요합니다.
  show-all-errors:
    - 양식의 모든 문제를 한 번에 하나씩 표시하지 말고 한꺼번에 사용자에게 보여줘야 합니다.
  request-auto-complete-flow:
    - 각종 개인 정보 또는 신용 카드 데이터를 요청하는 페이지는 SSL을 통해 제공해야 합니다. 그렇지 않은 경우 정보가 안전하지 않다는 경고 대화 상자가 표시됩니다.
---
<p class="intro">
  <code>requestAutocomplete</code>는 사용자가 양식을 작성하는 데 도움이 되도록 고안되었지만, 장바구니 포기율이 <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>97%에 이를 수 있는</a> 모바일 웹 전자상거래에 현재 가장 많이 사용되고 있습니다 . 슈퍼마켓에서 원하는 물건을 카트에 가득 채운 고객 중 97%가  카트의 물건을 제자리에 되돌려 놓고 나가는 모습을 상상해 보십시오.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

사이트가 특정 지불 제공업체에 의존하지 않고, `requestAutocomplete`가 브라우저에서 지불 세부정보(예: 이름, 주소 및 신용 카드 정보 등)를 요청하며, 다른 자동완성 필드와 마찬가지로 이러한 세부정보가 브라우저를 통해 선택적으로 저장됩니다.




{% ytvideo ljYeHwGgzQk %}

### `requestAutocomplete` 흐름

결제 양식을 표시하는 페이지를 로드하는 대신 `requestAutocomplete` 대화 상자를 표시하는 것이 좋습니다.
 순조롭게 진행되면 양식이 표시되지 않습니다.
  필드 이름을 변경하지 않고 기존 양식에 `requestAutocomplete`를 쉽게 추가할 수 있습니다.
  각 양식 요소에 `autocomplete` 특성을 적합한 값으로 간단히 추가하고 양식 요소에 `requestAutocomplete()` 함수를 추가합니다.

 그러면 브라우저가 나머지를 처리합니다.


<img src="imgs/rac_flow.png" class="center" alt="자동완성 흐름 요청">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

`form` 요소의 `requestAutocomplete` 함수는 브라우저에게 양식을 채우도록 지시합니다.
  보안상 이 함수는 터치나 마우스 클릭과 같은 사용자 제스처를 통해 호출해야 합니다.
 그런 다음 필드를 채울 수 있는 사용자 권한과 필드에 채울 세부정보를 묻는 대화 상자가 표시됩니다.



{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

`requestAutocomplete`가 성공적으로 완료되면 
`autocomplete` 이벤트가 발생하고, 양식을 완료하지 못한 경우에는 `autocompleteerror` 이벤트가 발생합니다.
  이 과정이 성공적으로 완료되고 양식의 유효성이 검사되면 양식을 제출하고 최종 확인을 진행합니다.



{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}


