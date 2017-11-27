project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: DevTools 콘솔에서 페이지의 항목 상태를 탐색합니다.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 식 평가 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
평가 기능 중 하나를 사용하여 DevTools 콘솔에서 페이지의 항목 상태를 탐색합니다.

DevTools 콘솔에서는 페이지에 있는 항목 상태를
바로 알 수 있습니다.
자바스크립트에 대한 지식과 자바스크립트를 지원하는 여러 가지 기능을 조합하여
입력한 식을 평가할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 식을 입력하여 평가합니다.
- 단축키 중 하나를 사용하여 요소를 선택합니다.
-  <code>inspect()</code>를 사용하여 DOM 요소와 자바스크립트 힙 객체를 검사합니다.
- $0 - 4를 사용하여 최근에 선택한 요소와 객체에 액세스합니다.


## 식 탐색

콘솔은
<kbd class="kbd">Enter</kbd>를 누르면 입력된 모든 자바스크립트 식을 평가합니다.
식을 입력하는 동안
속성 이름 제안이 나타납니다.
콘솔은 자동완성 및 탭 완성 기능도 제공합니다.

일치 항목이 여러 개 있는 경우
<kbd class="kbd">↑</kbd>와 <kbd class="kbd">↓</kbd>를 사용하여 해당 항목을 순환할 수 있습니다. <kbd class="kbd">→</kbd>를 누르면 현재 제안이 선택됩니다.
제안이 한 개 있는 경우
<kbd class="kbd">Tab</kbd>을 선택하세요.

![콘솔의 간단한 식](images/evaluate-expressions.png)

## 요소 선택

다음 단축키를 사용하여 요소를 선택합니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">단축키 &amp; 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">지정된 CSS 선택기와 일치하는 첫 번째 요소를 반환합니다.  <code>document.querySelector()</code>의 단축키입니다.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">지정된 CSS 선택기와 일치하는 모든 요소의 배열을 반환합니다.  <code>document.querySelectorAll()</code>의 별칭입니다.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">지정된 XPath와 일치하는 요소의 배열을 반환합니다.</td>
    </tr>
  </tbody>
</table>

대상 선택의 예:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## DOM 요소와 자바스크립트 힙 객체 검사

`inspect()` 함수는 DOM 요소 또는 자바스크립트 참조를
매개변수로 사용합니다.
DOM 요소를 제공하면
DevTools가 Elements 패널로 이동하여 해당 요소를 표시합니다.
자바스크립트 참조를 제공하면
Profile 패널로 이동합니다.

이 페이지의 콘솔에서 다음 코드를 실행하면
이 그림을 가져와서 Elements 패널에 표시합니다.
이는 `$_` 속성을 사용하여
마지막으로 평가된 식의 출력을 가져옵니다.

    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## 최근에 선택한 요소와 객체에 액세스

콘솔은 마지막으로 사용한 다섯 개의 요소와 객체를
간편히 액세스할 수 있도록 변수에 저장합니다.
$0 - 4를 사용하여
콘솔 내에서 해당 요소에 액세스합니다.
컴퓨터는 0부터 카운트를 시작한다는 점에 유의하세요.
즉, 최신 항목은 $0이고 가장 오래된 항목은 $4입니다.


{# wf_devsite_translation #}
