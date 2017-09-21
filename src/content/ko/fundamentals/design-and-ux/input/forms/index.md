project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 모바일에서는 양식을 작성하기 힘듭니다. 가장 좋은 양식은 가장 적게 입력하는 양식입니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-30 #}

# 멋진 양식 만들기 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

모바일에서는 양식을 작성하기 힘듭니다. 가장 좋은 양식은 가장 적게 입력하는 양식입니다. 좋은 양식은 문맥에 맞는 입력 유형을 제공합니다. 키는 사용자 입력 유형과 일치하도록 변경되어야 합니다. 사용자가 달력에서 날짜를 선택합니다. 사용자에게 계속 정보를 제공합니다. 유효성 검사 도구는 양식을 제출하기 전에 수행할 작업을 사용자에게 알려줘야 합니다.


## 효과적인 양식 디자인


반복되는 작업을 피하고 필요한 정보만 요구하는 효과적인 양식을 디자인하고, 여러 부분으로 구성된 양식에서 진행률을 사용자에게 알려줍니다.


### TL;DR {: .hide-from-toc }
- 기존 데이터를 사용하여 필드를 미리 채우고 자동완성을 활성화합니다.
- 레이블이 명확히 지정된 진행률 표시줄을 사용하여 사용자가 여러 부분으로 구성된 양식을 완성할 수 있도록 합니다.
- 사용자가 사이트를 떠나지 않고 자신의 스마트폰에서 달력 앱으로 이동할 수 있도록 시각적 달력을 제공합니다.


### 반복되는 작업 및 필드 최소화

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="여러 부분으로 구성된 양식에 진행률 표시">
  <figcaption>
    Progressive.com 웹사이트는 사용자에게 우편 번호를 먼저 요구하고 양식의 다음 부분을 미리 채웁니다.
  </figcaption>
</figure>

반복되는 작업 없이 양식을 필요한 필드만으로 구성하고, [자동완성](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete)을 활용하여 사용자가 미리 채워진 데이터로 쉽게 양식을 완성할 수 있도록 합니다.




사용자가 정보를 제공할 필요가 없도록, 여러분이 이미 알고 있는 정보를 미리 채우는 방법을 찾아봅니다.
  예를 들어, 배송 주소를 사용자가 가장 최근에 제공한 배송 주소로 미리 채웁니다.



<div style="clear:both;"></div>

### 사용자에게 진행률 표시

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="여러 부분으로 구성된 양식에 진행률 표시">
  <figcaption>
    레이블이 명확히 지정된 진행률 표시줄을 사용하여 사용자가 여러 부분으로 구성된 양식을 완성할 수 있도록 합니다.
  </figcaption>
</figure>

진행률 표시줄과 메뉴를 통해 다단계 양식과 과정의 전체적인 진행률을 정확히 알려줍니다.


너무 복잡한 양식을 초기 단계에 배치하면, 사용자가 전체 과정을 진행하기 전에 사이트를 벗어날 가능성이 높습니다.
 

<div style="clear:both;"></div>

### 날짜 선택 시 시각적 달력 제공

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="사용하기 편한 달력을 제공하는 호텔 웹사이트">
  <figcaption>
    날짜를 쉽게 선택할 수 있는 달력 위젯을 제공하는 호텔 예약 웹사이트.
  </figcaption>
</figure>

사용자가 약속 및 여행 날짜를 잡을 때 사이트를 벗어나 달력 앱을 확인하지 않고 쉽게 처리할 수 있도록 하려면, 시작 및 종료 날짜를 선택하는 레이블이 명확하게 지정된 시각적 달력을 제공하세요.


 

<div style="clear:both;"></div>

## 최선의 입력 유형 선택

적합한 입력 유형을 사용하여 정보 입력을 간소화하세요. 사용자는
전화번호를 입력하는 숫자 패드가 자동으로 표시되거나, 입력할 때
필드가 자동으로 전환되는 웹사이트를 호의적으로 평가합니다. 양식에서
불필요한 탭을 제거할 기회를 찾으세요.


### TL;DR {: .hide-from-toc }
- 데이터에 가장 적합한 입력 유형을 선택하여 입력을 단순화하세요.
-  <code>datalist</code> 요소로 사용자가 입력할 때 제안을 제시하세요.


### HTML5 입력 유형

HTML5에서 다양한 새 입력 유형이 도입되었습니다. 이러한 새 입력 유형은 브라우저에게 화상 키보드에 대해 어떤 유형의 키보드 레이아웃을 표시해야 하는지에 대한 힌트를 제공합니다.

  사용자가 키보드를 변경하지 않고 해당 입력 유형에 적합한 키만 표시하여 더욱 쉽게 필요한 정보를 입력할 수 있습니다.



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">입력 <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> URL 입력용입니다. 유효한 URI 스키마로 시작해야 합니다(예:
 <code>http://</code>, <code>ftp://</code> 또는 <code>mailto:</code>).
</td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>전화 번호 입력용입니다. 유효성 검사를 위해
특정 구문을 적용하지 <b>않습니다</b>.
따라서 특정 형식을 보장하려면 패턴을 사용하면 됩니다.
</td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>이메일 주소 입력용이며 @은 키보드에 기본적으로 표시되어야 합니다.
 2개 이상의
        이메일 주소가 제공되는 경우 여러 속성을 추가할 수 있습니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>플랫폼의 검색 필드와
        일치하는 방식으로 스타일이 지정된 텍스트 입력 필드입니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>숫자 입력용이며,
        유리 정수 또는 부동 소수점 값일 수 있습니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>숫자 입력용이지만, 숫자 입력 유형과 달리
        값이 그다지 중요하지 않습니다. 사용자에게 슬라이더 컨트롤로
        표시됩니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>날짜 및 시간 값 입력용이며,
        여기에서 제공하는 표준 시간대는 현지 표준 시간대입니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>날짜 입력 전용이며, 표준 시간대는
        제공하지 않습니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>시간 입력 전용이며, 표준 시간대는
        제공하지 않습니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>주 입력 전용이며, 표준 시간대는
        제공하지 않습니다.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>월 입력 전용이며, 표준 시간대는
        제공하지 않습니다.
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

Caution: 입력 유형을 선택할 때 현지화를 명심하세요.
일부 로케일에서는 쉼표(,) 대신 점(.)을 구분 기호로 사용합니다.

### datalist로 입력 중에 제안 제시

`datalist` 요소는 입력 유형이 아니라, 양식 필드와 연관된 제안 입력 값 목록입니다.
 사용자가 입력할 때 브라우저가 자동완성 옵션을 제안할 수 있습니다.
 사용자가 긴 목록을 검색하여 원하는 값을 찾아야 하고 해당 목록으로만 제한해야 하는 select 요소와 달리, `datalist` 요소는 사용자가 입력할 때 힌트를 제공합니다.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

참고:  <code>datalist</code> 값은 제안으로 제공되므로 사용자가 그 제안을 꼭 선택할 필요는 없습니다.

## 올바른 레이블 및 이름 입력

모바일에서는 양식을 작성하기 힘듭니다. 가장 좋은 양식은 가장 적게 입력하는 양식입니다. 좋은 양식은 문맥에 맞는 입력 유형을 제공합니다. 키는 사용자 입력 유형과 일치하도록 변경되어야 합니다. 사용자가 달력에서 날짜를 선택합니다. 사용자에게 계속 정보를 제공합니다. 유효성 검사 도구는 양식을 제출하기 전에 수행할 작업을 사용자에게 알려줘야 합니다.


### TL;DR {: .hide-from-toc }
- 양식 입력에서 항상  <code>label</code>을 사용하고 필드에 포커스가 맞춰질 때 표시되는지 확인하세요.
-  <code>placeholder</code>를 사용하여 예상 입력에 대한 힌트를 제공하세요.
- 브라우저가 양식을 자동완성하도록 요소에 대해 설정된  <code>name</code>을 사용하고  <code>autocomplete</code> 속성을 포함하세요.


### 레이블의 중요성

`label` 요소는 사용자에게 방향을 제시하고 양식 요소에 어떤 정보가 필요한지 알려줍니다.
  각 `label`은 입력 요소를 `label` 요소 내부에 배치하거나 "`for`" 속성을 사용하여 입력 요소와 연관됩니다.

  레이블을 양식 요소에 적용하면 터치 대상 크기를 늘릴 수도 있습니다. 사용자가 레이블이나 입력을 터치하여 입력 요소에 포커스를 둘 수 있습니다.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 레이블 크기 조정 및 배치

레이블과 입력은 누르기 쉽도록 충분히 커야 합니다.  필드 레이블은 세로 뷰포트에서는 입력 요소 위에 있어야 하고 가로 뷰포트에서는 입력 요소 옆에 있어야 합니다.

  필드 레이블과 해당 입력 상자가 동시에 표시되도록 해야 합니다.
  사용자설정 스크롤 핸들러 사용 시, 입력 요소를 페이지 상단으로 스크롤하여 레이블을 숨기거나, 입력 요소 아래 배치된 레이블이 가상 키보드로 가려질 수 있으므로 주의하세요.



### 자리표시자 사용

자리표시자 속성은 주로 사용자가 요소를 입력하기 시작할 때까지 연한 텍스트로 값을 표시하는 방식으로 사용자에게 예상 입력에 대한 힌트를 제공합니다.



<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Caution: 자리표시자는 사용자가 요소를 입력하기 시작하면 즉시 사라지므로 레이블을 대체하는 데 사용되지 않습니다.  자리표시자는 필요한 형식과 콘텐츠를 사용자에게 안내하는 도우미로 사용되어야 합니다.

### 메타데이터를 사용하여 자동완성 활성화

자동으로 이름, 이메일 주소 및 기타 자주 사용하는 필드와 같은 공통 필드를 자동으로 채워서 시간을 절약해 주고, 가상 키보드 및 소형 장치 등에서 잠재적인 입력 오류를 줄일 수 있도록 해주는 웹사이트에 대해 사용자는 호의적인 평가를 내립니다.




브라우저는 다양한 추론을 사용하여
[사용자가 이전에 지정한 데이터를 기반으로](https://support.google.com/chrome/answer/142893)
[자동으로 채울](https://support.google.com/chrome/answer/142893) 수 있는
필드를 결정합니다. 각 입력 요소에 `name` 속성과 `autocomplete` 속성을 모두 제공하는 방식으로 브라우저에 힌트를
제공할 수 있습니다.

참고: Chrome에서는 자동완성을 활성화하기 위해 `input` 요소를 `<form>` 태그에
래핑해야 합니다. 이 요소가 `form` 태그에 래핑되지 않은 경우 Chrome이
제안을 하기는 하지만 양식을 완성하지는 **않습니다**.

예를 들어, 사용자 이름, 이메일 주소 및 전화번호가 포함된 양식을 자동완성하도록 브라우저에게 힌트를 주려면 다음을 사용해야 합니다.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### 권장 입력 `name` 및 `autocomplete` 속성 값

`autocomplete` 속성 값은 현재 [WHATWG HTML 표준](https://html.spec.whatwg.org/multipage/forms.html#autofill)의 일부입니다. 가장 일반적으로 사용되는 `autocomplete` 속성은 아래와 같습니다.

`autocomplete` 속성은 **`shipping `**`given-name` 또는 **`billing `**`street-address`와 같은 섹션 이름과 함께 사용될 수 있습니다. 브라우저는 여러 섹션을 연속적인 방식이 아니라 개별적으로 자동완성합니다.

<table>
  <thead>
    <tr>
      <th data-th="Content type">콘텐츠 유형</th>
      <th data-th="name attribute"><code>name</code> 속성</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> 속성</th>
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
    <tr>
      <td data-th="Content type">사용자 이름</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">비밀번호</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code>(로그인 양식용)</li>
          <li><code>new-password</code>(가입 및 비밀번호 변경 양식용)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


참고:  <code>street-address</code>만을 사용하거나  <code>address-line1</code> 및  <code>address-line2</code>를 둘다 사용하세요.  <code>address-level1</code> 및  <code>address-level2</code>는 주소 형식에서 요구하는 경우에만 필요합니다.


### `autofocus` 속성

예를 들어,
Google 홈페이지처럼 사용자에게 특정 필드를 채우는 것만 요청하는 일부 양식의 경우 `autofocus` 속성을 추가할 수 있습니다.
  설정한 경우 데스크톱 브라우저가 즉시 포커스를 입력 필드로 이동하여 사용자가 양식을 빠르게 사용할 수 있습니다.
  모바일 브라우저는 키보드가 무작위로 나타나지 않도록 `autofocus` 속성을 무시합니다.



autofocus 속성은 키보드 포커스를 가로채서 잠재적으로 백스페이스 문자가 탐색에 사용되지 못하게 하므로 autofocus 속성 사용 시 주의하세요.




    <input type="text" autofocus ...>
    


## 실시간 유효성 검사 제공

실시간 데이터 유효성 검사는 데이터를 깨끗하게 유지할 뿐만 아니라 사용자 환경을 개선하는 데도 도움이 됩니다.  최신 브라우저는 실시간으로 데이터 유효성을 검사하고 사용자가 유효하지 않은 양식을 제출하는 것을 방지할 수 있는 여러 내장 도구를 지원합니다.  시각 신호를 사용하여 양식이 제대로 완성되었는지 표시해야 합니다.


### TL;DR {: .hide-from-toc }
-  <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code> 등과 같은 브라우저의 내장 유효성 검사 속성을 활용합니다.
- 유효성 검사 요구사항이 더 복잡한 경우 자바스크립트 및 Constraints Validation API를 사용합니다.
- 실시간으로 유효성 검사 오류를 표시하고, 사용자가 유효하지 않은 양식을 제출하려고 하면 수정해야 하는 모든 필드를 표시합니다.


### 다음 속성을 사용하여 입력 유효성 검사

#### `pattern` 속성

`pattern` 속성은 입력 필드의 유효성을 검사하는 데 사용되는 [정규식](https://en.wikipedia.org/wiki/Regular_expression)을
지정합니다. 예를 들어, 미국 우편 번호(5자리 숫자,
뒤에 추가로 대시와 4자리 숫자가 나오는 경우도 있음)의 유효성을 검사하려면
다음과 같이 `pattern`을 설정합니다.


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### 일반적인 정규식 패턴

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">정규식</th>
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

#### `required` 속성

`required` 속성이 있는 경우 해당 필드에 값을 채워야 양식을 제출할 수 있습니다.
 예를 들어, 우편 번호를 필수 항목으로 만들려면 다음과 같은 required 속성을 추가합니다.



    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

#### `min`, `max` 및 `step` 속성

날짜/시간 입력은 물론 숫자나 범위와 같은 숫자 입력의 경우, 최소값, 최대값, 슬라이더 또는 회전자 증감 단위를 지정할 수 있습니다.

  예를 들어, 신발 사이즈 입력을 최소 사이즈 1, 최대 사이즈 13, 증감 단위 0.5로 설정합니다.




    <input type="number" min="1" max="13" step="0.5" ...>
    

#### `maxlength` 속성

`maxlength` 속성을 사용하여 입력 또는 텍스트 상자의 최대 길이를 지정할 수 있습니다. 이는 사용자가 제공할 수 있는 정보의 길이를 제한하고자 할 경우에 유용합니다.

 예를 들어, 파일 이름을 12자로 제한하려면 다음을 사용할 수 있습니다.



    <input type="text" id="83filename" maxlength="12" ...>
    

#### `minlength` 속성

`minlength` 속성을 사용하여 입력 또는 텍스트 상자의 최소 길이를 지정할 수 있습니다. 이는 사용자가 제공해야 하는 정보의 최소 길이를 지정하고자 할 경우에 유용합니다.

 예를 들어, 파일 이름에 최소 8자가 필요함을 지정하려면 다음을 사용할 수 있습니다.



    <input type="text" id="83filename" minlength="8" ...>
    

#### `novalidate` 속성

때로는 양식에 잘못된 입력이 포함되었더라도 사용자가 양식을 제출할 수 있도록 허용하고 싶은 경우도 있습니다.
 이렇게 하려면 양식 요소 또는 개별 입력 필드에 `novalidate` 속성을 추가합니다.
 이 경우에도 모든 의사 클래스와 JavaScript API를 사용하여 양식이 유효한지 여부를 확인할 수 있습니다.



    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


Success: 클라이언트측 입력 유효성 검사 시에도 데이터의 일관성과 보안을 보장하기 위해 서버 데이터 유효성을 검사하는 것은 항상 중요합니다.

### 더욱 복잡한 실시간 유효성 검사에 자바스크립트 사용

기본 제공되는 유효성 검사와 정규식만으로 충분하지 않은 경우, 사용자설정 유효성 검사를 처리하는 강력한 도구인 [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)를 사용할 수 있습니다.

  이 API를 사용하여 사용자설정 오류 설정, 요소의 유효성 확인, 요소가 유효하지 않은 이유 확인 등과 같은 작업을 수행할 수 있습니다.



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">제약 조건 유효성 검사</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">사용자설정 유효성 검사 메시지 및  <code>customError</code>ValidityState 객체의  <code>ValidityState</code> 속성을  <code>true</code>로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">입력의 유효성 검사 테스트 실패 이유와 함께 문자열을 반환합니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">요소가 모든 제약 조건을 충족하면  <code>true</code>를 반환하고 그렇지 않은 경우  <code>false</code>를 반환합니다. 검사에서  <code>false</code> 반환 시 페이지의 응답 방법 결정은 개발자의 몫입니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">요소가 모든 제약 조건을 충족하면  <code>true</code>를 반환하고 그렇지 않은 경우  <code>false</code>를 반환합니다. 페이지가  <code>false</code>로 응답하면 제약 조건 문제가 사용자에게 보고됩니다.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">요소의 유효성 상태를 나타내는  <code>ValidityState</code> 객체를 반환합니다.</td>
    </tr>
  </tbody>
</table>



### 사용자설정 유효성 검사 메시지 설정

필드가 유효성 검사에 실패하면, `setCustomValidity()`를 사용하여 필드를 유효하지 않음으로 표시하고 실패한 이유를 설명합니다.
  예를 들어, 등록 양식에서 확인을 위해 사용자에게 이메일 주소를 두 번 입력하도록 요구할 수 있습니다.
  두 번째 입력에서 blur 이벤트를 사용하여 두 입력의 유효성을 검사하고 적합한 응답을 설정합니다.

  예:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 유효하지 않은 양식의 제출 차단

양식에 유효하지 않은 데이터가 있더라도 일부 브라우저는 사용자가 양식을 제출하는 것을 차단하지 못하기 때문에, 개발자는 제출 이벤트를 캐치하고 양식 요소에 `checkValidity()`를 사용하여 양식의 유효성을 확인해야 합니다.

  예:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 실시간으로 피드백 표시

사용자가 양식을 제출하기 전에 양식을 제대로 작성했는지 여부를
나타내는 시각적 표시를 제공하면 도움이 됩니다.
HTML5에서는 값이나 속성에 따라 입력 스타일을 지정하는 데 사용할 수 있는
다수의 의사 클래스가 새로 소개되었습니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">실시간 피드백</th>
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
      <td data-th="Use">필수 속성 집합이 있는 입력 요소의 스타일을 명시적으로 설정합니다.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">필수 속성 집합이 없는 입력 요소의 스타일을 명시적으로 설정합니다.</td>
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

유효성 검사는 즉시 발생합니다. 즉, 사용자가 아직 필드를 채울 기회를 갖지 못했더라도, 페이지가 로드될 때 필드가 유효하지 않음으로 표시될 수 있습니다.

  또한 사용자가 입력할 때 잘못된 스타일이 표시될 수도 있음을 의미합니다.
 이를 방지하기 위해 CSS와 자바스크립트를 조합하여 사용자가 필드를 선택한 경우에만 잘못된 스타일을 표시하도록 할 수 있습니다.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


Success: 양식의 모든 문제를 한 번에 하나씩 표시하지 말고 한꺼번에 사용자에게 보여줘야 합니다.




{# wf_devsite_translation #}
