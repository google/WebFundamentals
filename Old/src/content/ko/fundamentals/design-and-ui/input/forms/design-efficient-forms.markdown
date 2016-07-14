---
title: "효과적인 양식 디자인"
description: "반복되는 작업을 피하고 필요한 정보만 요구하는 효과적인 양식을 디자인하고 여러 부분으로 구성된 양식에서 진행률을 사용자에게 알려줍니다."
updated_on: 2014-10-21
key-takeaways:
  tldr:
    - 기존 데이터를 사용하여 필드를 미리 채우고 자동 채우기를 활성화합니다.
    - 레이블이 명확히 지정된 진행률 표시줄을 사용하여 사용자가 여러 부분으로 구성된 양식을 완성할 수 있도록 합니다.
    - 사용자가 사이트를 떠나지 않고 스마트폰에서 달력 앱으로 이동할 수 있도록 시각적 달력을 제공합니다.
comments:
  # 참고: 절 제목이나 URL이 변경되면 다음 약식 링크도 업데이트해야 합니다.
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  반복되는 작업을 피하고 필요한 정보만 요구하는 효과적인 양식을 디자인하고 여러 부분으로 구성된 양식에서 진행률을 사용자에게 알려줍니다.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 반복되는 작업 및 필드 최소화

양식을 반복되는 작업 없이 필요한 필드만으로 구성하고 [자동 채우기](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete)를 활용하여 사용자가 미리 채워진 데이터로 쉽게 양식을 완성할 수 있도록 합니다.




<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="여러 부분으로 구성된 양식에 진행률 표시">
  <figcaption>
    Progressive.com 웹사이트는 사용자에게 우편 번호를 먼저 요구하고 양식의 다음 부분을 미리 채웁니다.
  </figcaption>
</figure>

사용자가 정보를 제공할 필요가 없도록 이미 알고 있는 정보를 미리 채우는 방법을 모색합니다.
  예를 들어, 배송 주소를 사용자가 가장 최근에 제공한 배송 주소로 미리 채웁니다.



## 사용자에게 진행률 표시

진행률 표시줄과 메뉴를 통해 다단계 양식과 과정의 전체적인 진행률을 정확히 알려줍니다.


<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="여러 부분으로 구성된 양식에 진행률 표시">
  <figcaption>
    - 레이블이 명확히 지정된 진행률 표시줄을 사용하여 사용자가 여러 부분으로 구성된 양식을 완성할 수 있도록 합니다.
  </figcaption>
</figure>

너무 복잡한 양식을 초기 단계에 배치하면, 사용자가 전체 과정을 진행하기 전에 사이트를 벗어날 가능성이 높습니다.
 


## 날짜 선택 시 시각적 달력 제공

사용자가 약속 및 여행 날짜를 잡을 때 사이트를 벗어나 달력 앱을 확인하지 않고 쉽게 처리할 수 있도록 하려면 시작 및 종료 날짜를 선택하는 레이블이 명확하게 지정된 시각적 달력을 제공하십시오.


 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="사용하기 편한 달력을 제공하는 호텔 웹사이트">
  <figcaption>
    날짜를 쉽게 선택할 수 있는 달력 위젯을 제공하는 호텔 예약 웹사이트.
  </figcaption>
</figure>


