---
title: "실시간 유효성 검사"
description: "실시간 데이터 유효성 검사는 데이터를 깨끗하게 유지할 뿐만 아니라 사용자 경험을 개선하는 데도 도움이 됩니다.  최신 브라우저는 실시간으로 데이터 유효성을 검사하고 사용자가 유효하지 않은 양식을 제출하는 것을 방지할 수 있는 여러 내장 도구를 지원합니다.  시각 신호를 사용하여 양식이 제대로 완성되었는지 표시해야 합니다."
updated_on: 2014-10-21
key-takeaways:
  provide-real-time-validation:
    - "<code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code> 등과 같은 브라우저의 내장 유효성 검사 특성을 활용합니다."
    - "유효성 검사 요구사항이 더 복잡한 경우 JavaScript 및 Constraints Validation API를 사용합니다."
    - "실시간으로 유효성 검사 오류를 표시하고 사용자가 유효하지 않은 양식을 제출하려고 하면 수정해야 하는 모든 필드를 표시합니다."
notes:
  use-placeholders:
    - "포커스를 요소에 가져가면 자리 표시자가 즉시 사라지므로 자리 표시자는 레이블을 대체하는 데 사용되지 않습니다. 자리 표시자는 필요한 형식과 콘텐츠를 사용자에게 안내하는 도우미로 사용되어야 합니다."
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
comments:
  # 참고: 절 제목이나 URL이 변경되면 다음 약식 링크도 업데이트해야 합니다.
  - g.co/mobilesiteprinciple17b
---
<p class="intro">
  실시간 데이터 유효성 검사는 데이터를 깨끗하게 유지할 뿐만 아니라 사용자 경험을 개선하는 데도 도움이 됩니다.  최신 브라우저는 실시간으로 데이터 유효성을 검사하고 사용자가 유효하지 않은 양식을 제출하는 것을 방지할 수 있는 여러 내장 도구를 지원합니다.  시각 신호를 사용하여 양식이 제대로 완성되었는지 표시해야 합니다.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### 다음 특성을 사용하여 입력 유효성 검사

#### `pattern` 특성

`pattern` 특성은 입력 필드의 유효성을 검사하는 데 사용되는 [정규식](http://en.wikipedia.org/wiki/Regular_expression)을 지정합니다.

 예를 들어, 미국 우편 번호(5자리 숫자, 뒤에 추가로 대시와 4자리 숫자가 나오는 경우도 있음)의 유효성을 검사하려면 다음과 같이 `pattern`을 설정합니다.



{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### 일반적인 정규식 패턴

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Description">설명</th>
      <th data-th="Regular expression">정규식</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">우편 주소</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">우편 번호(미국)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 주소(IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 주소(IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 주소(IPv4와 IPv6 모두)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
    <tr>
      <td data-th="Description">신용 카드 번호</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">사회 보장 번호</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">북미 전화번호</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### `required` 특성

`required` 특성이 있는 경우 해당 필드에 값을 채워야 양식을 제출할 수 있습니다.
 예를 들어, 우편 번호를 필수 항목으로 만들려면 다음과 같은 required 특성을 추가합니다.


{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### `min`, `max` 및 `step` 특성

날짜/시간 입력은 물론 숫자나 범위와 같은 숫자 입력의 경우, 최솟값, 최댓값, 슬라이더 또는 회전자 증감 단위를 지정할 수 있습니다.

  예를 들어, 신발 사이즈 입력을 최소 사이즈 1, 최대 사이즈 13, 증감 단위 0.5로 설정합니다.



{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### `maxlength` 특성

`maxlength` 특성을 사용하여 입력 또는 텍스트 상자의 최대 길이를 지정할 수 있습니다. 이는 사용자가 제공할 수 있는 정보의 길이를 제한하고자 할 경우에 유용합니다.

 예를 들어, 파일 이름을 12자로 제한하려면 다음을 사용할 수 있습니다.


{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### `minlength` 특성

`minlength` 특성을 사용하여 입력 또는 텍스트 상자의 최소 길이를 지정할 수 있습니다. 이는 사용자가 제공해야 하는 정보의 최소 길이를 지정하고자 할 경우에 유용합니다.

 예를 들어, 파일 이름에 최소 8자가 필요함을 지정하려면 다음을 사용할 수 있습니다.


{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### `novalidate` 특성

때로는 양식에 잘못된 입력이 포함되었더라도 사용자가 양식을 제출할 수 있도록 하고 싶은 경우도 있습니다.
 이렇게 하려면 양식 요소 또는 개별 입력 필드에 `novalidate` 특성을 추가합니다.
 이 경우에도 모든 의사 클래스와 JavaScript API를 사용하여 양식이 유효한지 여부를 확인할 수 있습니다.


{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

### 더욱 복잡한 실시간 유효성 검사에 JavaScript 사용

기본 제공되는 유효성 검사와 정규식만으로 충분하지 않은 경우, 사용자 지정 유효성 검사를 처리하는 강력한 도구인 [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)를 사용할 수 있습니다.

  이 API를 사용하여 사용자 지정 오류 설정, 요소의 유효성 확인, 요소가 유효하지 않은 이유 확인 등과 같은 작업을 수행할 수 있습니다.



<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">사용자 지정 유효성 검사 메시지 및 <code>ValidityState</code> 개체의 <code>customError</code> 속성을 <code>true</code>로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">입력의 유효성 검사 테스트 실패 이유를 포함한 문자열을 반환합니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">요소가 모든 제약 조건을 충족하면 <code>true</code>를 반환하고 그렇지 않은 경우 <code>false</code>를 반환합니다. 검사에서 <code>false</code> 반환 시 페이지의 응답 방법 결정은 개발자의 몫입니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">요소가 모든 제약 조건을 충족하면 <code>true</code>를 반환하고 그렇지 않은 경우 <code>false</code>를 반환합니다. 페이지가 <code>false</code>로 응답하면 제약 조건 문제가 사용자에게 보고됩니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">요소의 유효성 상태를 나타내는 <code>ValidityState</code> 개체를 반환합니다.</td>
    </tr>
  </tbody>
</table>

#### 사용자 지정 유효성 검사 메시지

필드가 유효성 검사에 실패하면 `setCustomValidity()`를 사용하여 필드를 유효하지 않음으로 표시하고 실패한 이유를 설명합니다.
  예를 들어, 등록 양식에서 확인을 위해 사용자에게 이메일 주소를 두 번 입력하도록 요구할 수 있습니다.
  두 번째 입력에서 blur 이벤트를 사용하여 두 입력의 유효성을 검사하고 적합한 응답을 설정합니다.

  예:

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### 유효하지 않은 양식의 제출 차단

양식에 유효하지 않은 데이터가 있더라도 일부 브라우저는 사용자가 양식을 제출하는 것을 차단하지 못하기 때문에 개발자는 제출 이벤트를 캐치하고 양식 요소에 `checkValidity()`를 사용하여 양식의 유효성을 확인해야 합니다.

  예:

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### 실시간으로 피드백 표시

사용자가 양식을 제출하기 전에 양식을 제대로 작성했는지 여부를 나타내는 시각적 표시를 제공하면 도움이 됩니다.

HTML5에서 값이나 특성에 따라 입력 스타일을 지정하는 데 사용할 수 있는 다수의 의사 클래스가 새로 소개되었습니다.


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Pseudo-class">의사 클래스</th>
      <th data-th="Use">용도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">값이 모든 유효성 검사 요구사항을 충족하는 경우 사용할 입력 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">값이 모든 유효성 검사 요구사항을 충족하지 않는 경우 사용할 입력 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">필수 특성 집합이 있는 입력 요소의 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">필수 특성 집합이 없는 입력 요소의 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">값이 범위 안에 있는 숫자 입력 요소의 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">값이 범위 밖에 있는 숫자 입력 요소의 스타일을 명시적으로 설정합니다.</td>
    </tr>
  </tbody>
</table>

유효성 검사는 즉시 발생합니다. 즉, 사용자가 아직 필드를 채울 기회를 갖지 못했더라도 페이지가 로드될 때 필드가 유효하지 않음으로 표시될 수 있습니다.

  또한 사용자가 입력할 때 잘못된 스타일이 표시될 수도 있음을 의미합니다.
 이를 방지하기 위해 CSS와 JavaScript를 조합하여 사용자가 필드를 선택한 경우에만 잘못된 스타일을 표시하도록 할 수 있습니다.


{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.notes.show-all-errors %}


