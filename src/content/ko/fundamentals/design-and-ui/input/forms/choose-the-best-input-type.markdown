---
title: "최선의 입력 유형 선택"
description: "적합한 입력 유형을 사용하여 정보 입력을 간소화하십시오. 사용자는 전화번호를 입력하는 숫자 패드가 자동으로 표시되거나 입력할 때 필드가 자동으로 전환되는 웹사이트를 호의적으로 평가합니다. 양식에서 불필요한 탭을 제거할 기회를 찾으십시오."
updated_on: 2014-10-21
key-takeaways:
  choose-best-input-type:
    - 데이터에 가장 적합한 입력 유형을 선택하여 입력을 단순화합니다.
    - <code>datalist</code> 요소로 사용자가 입력할 때 제안을 제시합니다.
notes:
  use-placeholders:
    - 포커스를 요소에 가져가면 자리 표시자가 즉시 사라지므로 자리 표시자는 레이블을 대체하는 데 사용되지 않습니다.  자리 표시자는 필요한 형식과 콘텐츠를 사용자에게 안내하는 도우미로 사용되어야 합니다.

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
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---
<p class="intro">
  적합한 입력 유형을 사용하여 정보 입력을 간소화하십시오. 사용자는 전화번호를 입력하는 숫자 패드가 자동으로 표시되거나 입력할 때 필드가 자동으로 전환되는 웹사이트를 호의적으로 평가합니다. 양식에서 불필요한 탭을 제거할 기회를 찾으십시오.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

### HTML5 입력 유형

HTML5에서 다양한 새 입력 유형이 도입되었습니다. 이러한 새 입력 유형은 브라우저에게 화상 키보드에 대해 어떤 유형의 키보드 레이아웃을 표시해야 하는지에 대한 힌트를 제공합니다.

  사용자가 키보드를 변경하지 않고 해당 입력 유형에 적합한 키만 표시하여 더욱 쉽게 필요한 정보를 입력할 수 있습니다.



<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Input type">입력 <code>type</code></th>
      <th data-th="Typical keyboard">일반 키보드</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> URL 입력용입니다. 유효한 URI 스키마로 시작해야 합니다(예: <code>http://</code>, <code>ftp://</code> 또는 <code>mailto:</code>).

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>전화번호 입력용입니다. 유효성 검사를 위해 특정 구문을 적용하지 <b>않습니다</b>. 따라서 특정 형식을 보장하려면 패턴을 사용하면 됩니다.

  
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>이메일 주소 입력용이며 @은 키보드에 기본적으로 표시되어야 합니다.
 2개 이상의 이메일 주소를 제공하려면 여러 특성을 추가할 수 있습니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>플랫폼의 검색 필드와 일치하는 방식으로 스타일이 지정된 텍스트 입력 필드입니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>숫자 입력용이며, 유리 정수 또는 부동 소수점 값일 수 있습니다. 

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>숫자 입력용이지만 숫자 입력 유형과 달리 값이 그다지 중요하지 않습니다.
 사용자에게 슬라이더 컨트롤로 표시됩니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>날짜 및 시간 값 입력용이며, 여기에서 제공하는 표준 시간대는 현지 표준 시간대입니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>날짜 입력 전용이며 표준 시간대는 제공하지 않습니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>시간 입력 전용이며 표준 시간대는 제공하지 않습니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>주 입력 전용이며 표준 시간대는 제공하지 않습니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>월 입력 전용이며 표준 시간대는 제공하지 않습니다.

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>색 선택용입니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### datalist로 입력 중에 제안 제시

`datalist` 요소는 입력 유형이 아니라 양식 필드와 연관된 제안 입력 값 목록입니다.
 사용자가 입력할 때 브라우저가 자동완성 옵션을 제안할 수 있습니다.
 사용자가 긴 목록을 검색하여 원하는 값을 찾아야 하고 해당 목록으로만 제한하는 선택 요소와 달리 `datalist` 요소는 사용자가 입력할 때 힌트를 제공합니다.



{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


