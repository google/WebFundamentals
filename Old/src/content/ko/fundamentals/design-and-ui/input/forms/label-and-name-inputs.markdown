---
title: "올바른 레이블 및 이름 입력"
description: "모바일에서는 양식을 작성하기 힘듭니다. 가장 좋은 양식은 가장 적게 입력하는 양식입니다."
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - "양식 입력에서 항상 <code>label</code>을 사용하고 필드에 포커스가 맞춰지면 표시하십시오."
    - "<code>placeholder</code>를 사용하여 예상 입력에 대한 힌트를 제공하십시오."
    - "브라우저가 양식을 자동완성하도록 요소에 대해 설정된 <code>name</code>을 사용하고 <code>autocomplete</code> 특성을 포함하십시오."
notes:
  use-placeholders:
    - "자리 표시자는 사용자가 요소를 입력하기 시작하면 즉시 사라지므로 레이블을 대체하는 데 사용되지 않습니다. 자리 표시자는 필요한 형식과 콘텐츠를 사용자에게 안내하는 도우미로 사용되어야 합니다."
  recommend-input:
    - "<code>street-address</code>만 사용하거나 <code>address-line1</code> 및 <code>address-line2</code>를 모두 사용하십시오."
    - "<code>address-level1</code> 및 <code>address-level2</code>는 주소 형식에서 요구하는 경우에만 필요합니다."
  use-datalist:
    - "<code>datalist</code> 값은 제안으로 제공되므로 사용자가 그 제안을 꼭 선택할 필요는 없습니다."
  provide-real-time-validation:
    - "클라이언트측 입력 유효성 검사 시에도 데이터의 일관성과 보안을 보장하기 위해 서버 데이터 유효성을 검사하는 것은 항상 중요합니다."
  show-all-errors:
    - "양식의 모든 문제를 한 번에 하나씩 표시하지 말고 한꺼번에 사용자에게 보여줘야 합니다."
  request-auto-complete-flow:
    - "각종 개인 정보 또는 신용 카드 데이터를 요청하는 페이지는 SSL을 통해 제공해야 합니다. 그렇지 않은 경우 정보가 안전하지 않다는 경고 대화 상자가 표시됩니다."
comments:
  # 참고: 절 제목이나 URL이 변경되면 다음 약식 링크도 업데이트해야 합니다.
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  모바일에서는 양식을 작성하기 힘듭니다. 가장 좋은 양식은 가장 적게 입력하는 양식입니다. 좋은 양식은 문맥에 맞는 입력 유형을 제공합니다. 키는 사용자 입력 유형과 일치하도록 변경해야 합니다. 사용자가 달력에서 날짜를 선택합니다. 사용자에게 계속 정보를 제공하십시오. 유효성 검사 도구는 양식을 제출하기 전에 수행할 작업을 사용자에게 알려줘야 합니다.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### 레이블의 중요성

`label` 요소는 사용자에게 방향을 제시하고 양식 요소에 어떤 정보가 필요한지 알려줍니다.
  각 `label`은 입력 요소를 `label` 요소 내부에 배치하거나 "`for`" 특성을 사용하여 입력 요소와 연관됩니다.

  레이블을 양식 요소에 적용하면 터치 대상 크기를 늘릴 수도 있습니다. 사용자가 레이블이나 입력을 터치하여 입력 요소에 포커스를 둘 수 있습니다.



{% include_code src=_code/order.html snippet=labels %}

### 레이블 크기 조정 및 배치

레이블과 입력은 누르기 쉽도록 충분히 커야 합니다.  필드 레이블은 세로 뷰포트에서는 입력 요소 위에 있어야 하고 가로 뷰포트에서는 입력 요소 옆에 있어야 합니다.

  필드 레이블과 해당 입력 상자가 동시에 표시되도록 해야 합니다.
  사용자 지정 스크롤 핸들러 사용 시, 입력 요소를 페이지 상단으로 스크롤하여 레이블을 숨기거나, 입력 요소 이래 배치된 레이블이 가상 키보드로 가려질 수 있으므로 주의하십시오.



### 자리 표시자 사용

자리 표시자 특성은 주로 사용자가 요소를 입력하기 시작할 때까지 연한 텍스트로 값을 표시하는 방식으로 사용자에게 예상 입력에 대한 힌트를 제공합니다.



<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### 메타데이터를 사용하여 자동완성 활성화

자동으로 이름, 이메일 주소 및 기타 자주 사용하는 필드와 같은 공통 필드를 자동으로 채워서 시간을 절약해 주고 가상 키보드 및 소형 장치 등에서 잠재적인 입력 오류를 줄일 수 있도록 해주는 웹사이트에 대해 사용자는 호의적인 평가를 내립니다.




브라우저는 다양한 추론을 사용하여 [사용자가 이전에 지정한 데이터를 기반으로](https://support.google.com/chrome/answer/142893) [자동으로 채울](https://support.google.com/chrome/answer/142893) 수 있는 필드를 결정합니다. 각 입력 요소에 name 특성과 autocomplete 특성을 모두 제공하는 방식으로 브라우저에 힌트를 제공할 수 있습니다.






예를 들어, 사용자 이름, 이메일 주소 및 전화번호가 포함된 양식을 자동완성하도록 브라우저에게 힌트를 주려면 다음을 사용해야 합니다.


{% include_code src=_code/order.html snippet=autocomplete %}


### 권장 입력 `name` 및 `autocomplete` 특성 값


`autocomplete` 특성 값은 현재 [WHATWG HTML 표준](https://html.spec.whatwg.org/multipage/forms.html#autofill)의 일부입니다. 가장 일반적으로 사용되는 `autocomplete` 특성은 아래와 같습니다.

`autocomplete` 특성은 **`shipping `**`given-name` 또는 **`billing `**`street-address`와 같은 섹션 이름과 함께 사용될 수 있습니다. 브라우저는 여러 섹션을 연속적인 방식이 아니라 개별적으로 자동완성합니다.

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Content type">콘텐츠 유형</th>
      <th data-th="name attribute"><code>name</code> 특성</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> 특성</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">이름</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>name</code>
        <code>name</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code>(전체 이름)</li>
          <li><code>given-name</code>(이름)</li>
          <li><code>additional-name</code>(중간 이름)</li>
          <li><code>family-name</code>(성)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">이메일</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">주소</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>주소 한 줄 입력:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>주소 두 줄 입력:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code>(시/도)</li>
          <li><code>address-level2</code>(구/군/시)</li>
          <li><code>postal-code</code>(우편 번호)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">전화</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">신용 카드</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% include shared/remember.liquid title="Remember" list=page.notes.recommend-input %}

### `autofocus` 특성

예를 들어 Google 홈페이지처럼 사용자에게 특정 필드를 채우는 것만 요청하는 일부 양식의 경우 `autofocus` 특성을 추가할 수 있습니다.

  설정한 경우 데스크톱 브라우저가 즉시 포커스를 입력 필드로 이동하여 사용자가 양식을 빠르게 사용할 수 있습니다.
  모바일 브라우저는 키보드가 무작위로 나타나지 않도록 `autofocus` 특성을 무시합니다.



autofocus 특성은 키보드 포커스를 가로채서 잠재적으로 백스페이스 문자가 탐색에 사용되지 못하게 하므로 autofocus 특성 사용 시 주의하십시오.



{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


