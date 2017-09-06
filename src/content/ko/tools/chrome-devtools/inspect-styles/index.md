project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 페이지의 HTML 및 CSS를 검사하고 편집합니다.

{# wf_updated_on: 2016-01-28 #}
{# wf_published_on: 2015-04-13 #}

# 페이지와 스타일 검사 및 편집 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools Elements 패널을 사용하면 페이지의
HTML 및 CSS를 검사하고 실시간 편집할 수 있습니다.

![Chrome DevTools Elements 패널](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- Elements 패널의 DOM 트리에서 모든 요소를 즉석에서 검사하고 편집할 수 있습니다.
- Styles 창에서 모든 선택된 요소에 적용된 CSS 규칙을 보고 변경할 수 있습니다.
- Computed 창에서 선택한 요소의 박스 모델을 보고 편집할 수 있습니다.
- Sources 패널에서 페이지에 로컬로 변경된 모든 내용을 볼 수 있습니다.


## DOM 노드 실시간 편집

DOM 노드를 실시간 편집하려면
[선택한 요소](#inspect-an-element)를 두 번 클릭한 뒤 변경하기만 하면 됩니다.

<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

DOM 트리 뷰에 현재 트리 상태가 표시됩니다.
여러 가지 이유로 인해 원래 로드한 HTML과 일치하지 않을 수 있습니다. 예를 들어,
자바스크립트를 사용하여 DOM 트리를 수정할 수 있습니다. 브라우저 엔진은
잘못된 작성자 마크업을 수정하려 시도하고 예측하지 못한 DOM을 만듭니다.

## 스타일 실시간 편집

**Styles** 창에서 스타일 속성 이름과 값을 실시간으로 편집할 수 있습니다. 모든 
스타일은 편집할 수 있습니다. 다만 회색으로 처리된 것만은 예외입니다(사용자 에이전트 
스타일시트의 경우와 마찬가지).

이름이나 값을 편집하려면 원하는 항목을 클릭하고 변경한 다음
<kbd class="kbd">Tab</kbd> 키 또는 <kbd class="kbd">Enter</kbd> 키를 눌러 변경 내용을 저장합니다.

![속성 이름 편집](imgs/edit-property-name.png)

CSS 수정 사항은 기본적으로 영구적이지 않으며, 변경한 내용은 페이지를 새로 고치면 
손실됩니다. 페이지를 새로 고쳐도 변경 내용이 지속되도록 하려면, [지속적 
작성](/web/tools/setup/setup-workflow)을 
설정합니다. 

## 박스 모델 매개변수 검사 및 편집

현재 요소의 박스 모델 매개변수를 검사하고 편집하려면
**Computed** 창을 사용합니다. 값을 클릭하기만 하면 박스 모델의 모든 값을
편집할 수 있습니다.

![Computed 창](imgs/computed-pane.png)

동심 직사각형 안에 **top**, **bottom**, **left**, **right**
 값이 있고, 각각 현재 요소의 **padding**, **border** 및 **margin**
속성을 나타냅니다. 

비 정적인 위치가 지정된 요소의 경우, **position** 사각형도 표시되며
이 안에 **top**, 
**right**, **bottom** 및 **left** 속성 값이 포함되어 있습니다.

![비 정적인 컴퓨팅 요소](imgs/computed-non-static.png)

`position: fixed` 및 `position: absolute` 요소의 경우, 가운데
필드에 선택한 요소의 실제 **offsetWidth × offsetHeight** 픽셀 치수가
포함되어 있습니다. 모든 값은 두 번 클릭하면 수정할 수 있으며, 이는 
Styles 창에 있는 속성 값을 수정하는 방법과 같습니다. 다만 이러한 변경은 
효과가 있을 것이라고 보장할 수는 없습니다.
구체적인 요소 위치 지정 사양에 따라 달라지기 때문입니다.

![f고정 컴퓨팅 요소](imgs/computed-fixed.png)

## 로컬 변경 사항 보기

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

페이지에 적용된 실시간 편집 기록을 보려면:

1. **Styles** 창에서 수정한 파일을 클릭합니다. DevTools가
**Sources** 패널을 표시합니다.
1. 해당 파일을 마우스 오른쪽 버튼으로 클릭합니다.
1. **Local modifications**를 선택합니다.

적용된 변경 사항을 탐색하려면:

* 최상위 파일 이름을 확장하여 수정이 발생한 시간
![수정이 발생한 시간](imgs/image_25.png){:.inline}
을 봅니다.
* 2단계 항목을 확장하여 수정에 해당하는 
[차이점(diff)](https://en.wikipedia.org/wiki/Diff)(수정 전후)
을 봅니다. 배경이 분홍색인 줄은 삭제를 의미하며
배경이 녹색인 줄은 추가를 의미합니다.

## 변경 취소

[지속적 작성을 설정](/web/tools/setup/setup-workflow)하지 않은 경우
페이지를 새로 고칠 때마다 실시간 편집한 내용이 모두 손실됩니다.

지속적 작성을 설정한 상태라고 가정하고 변경을 취소하려면:

* <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd>(Windows) 또는 
<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd>(Mac)를 사용하여 Elements 패널을 통해 
DOM 또는 스타일에 적용한 사소한 변경을 빠르게 취소합니다.

* 파일에 적용된 모든 로컬 수정 사항을 취소하려면, **Souces**
패널을 열고 파일 이름 옆의 **revert**를 선택합니다.

[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
