project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools Animation Inspector로 애니메이션을 검사하고 수정합니다.

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# 애니메이션 검사 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools Animation Inspector로 애니메이션을
검사하고 수정합니다.

![animation inspector](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- Animation Inspector를 열어 애니메이션을 캡처합니다. 그러면 이 검사기가 자동으로 애니메이션을 감지하여 여러 그룹으로 정렬합니다.
- 애니메이션 속도를 느리게 하거나, 다시 재생하거나, 소스 코드를 보는 등 여러 가지 방법으로 애니메이션을 검사할 수 있습니다.
- 애니메이션을 수정하려면 타이밍, 지연, 재생 시간 또는 키프레임 오프셋을 변경하면 됩니다.


## 개요 {:#overview}

Chrome DevTools Animation Inspector는 크게 두 가지 용도로 사용됩니다. 

* 애니메이션 검사. 애니메이션 그룹의 속도를 늦추거나, 다시 재생하거나, 
소스 코드를 검사할 수 있습니다. 
* 애니메이션 수정. 애니메이션 그룹의 타이밍, 지연, 재생 시간 
또는 키프레임 오프셋을 수정할 수 있습니다. 베지어 편집과 키프레임 
편집은 현재 지원되지 않습니다. 

Animation Inspector는 CSS 애니메이션,
CSS 변환 및 웹 애니메이션을 지원합니다. `requestAnimationFrame` 애니메이션은
현재 지원되지 않습니다.

### 애니메이션 그룹이란?

애니메이션 그룹은 서로 연관된 것처럼
*보이는* 일련의 애니메이션입니다. 현재 웹에는 그룹 애니메이션이라는 
개념이 제대로 정립되지 않았기 때문에, 모션 디자이너와 개발자가 각각의 애니메이션을 구성하고 
타이밍을 맞춰야만 하나의 일관된 시각적 효과를 나타낼 수 
있습니다. Animation Inspector는 
시작 시간(지연 등은 제외)에 따라 어느 애니메이션이 서로 관련이 있는지 에측하여 이를 모두 나란히 그룹으로 지정합니다.
즉, 동일한 스크립트 블록에서 트리거되는 모든 애니메이션 집합이 
함께 그룹으로 묶이게 됩니다. 하지만 비동기식 애니메이션은 별도로 그룹이 
지정됩니다. 

## 시작하기

Animation Inspector를 여는 두 가지 방법이 있습니다.

* **Styles** 창(**Elements** 패널에 있음)으로 이동하여 
**Animations** 버튼(![애니메이션 
 버튼](imgs/animations-button.png){:.inline})을 누릅니다. 
* 명령 메뉴를 열고 `Drawer: Show Animations`를 입력합니다. 

Animation Inspector가 콘솔 창 옆에 탭으로 열립니다. 이 탭은
Drawer 탭이기 때문에 DevTools 패널 어디에서나 사용할 수 있습니다. 

![빈 Animation Inspector](imgs/empty-ai.png)

Animation Inspector는 크게 네 개의 섹션(또는 창)으로 그룹이 지정됩니다. 이 
가이드에서는 각 창을 다음과 같이 지칭합니다.

1. **Controls**. 여기에서 현재 캡처된 애니메이션
그룹을 모두 지우거나 현재 선택한 애니메이션 그룹의 속도를 변경할 수 있습니다.
2. **Overview**. 조사할 애니메이션 그룹을 선택하고 
**Details** 창에서 수정합니다. 
3. **Timeline**. 애니메이션을 일시 중지하고 시작하거나, 애니메이션의 특정 
지점으로 점프합니다. 
4. **Details**. 현재 선택한
   애니메이션 그룹을 검사하고 수정합니다. 

![주석 Animation Inspector](imgs/annotated-animation-inspector.png)

애니메이션을 캡처하려면 Animation Inspector가 열려 있는 동안 애니메이션을 트리거하는 상호작용을
수행하기만 하면 됩니다. 페이지를 로드할 때 애니메이션이 
트리거되는 경우, 페이지를 새로 고치면 Animation Inspector가 애니메이션을 
감지하는 데 도움이 됩니다. 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## 애니메이션 검사 {:#inspect}

애니메이션을 캡처한 후에 이를 재생할 수 있는 몇 가지 방법이 있습니다.

* **Overview** 창에서 애니메이션의 썸네일 이미지에 마우스를 가져가서 미리 볼 수 있습니다.
* **Overview** 창에서 애니메이션 그룹을 선택하고(**Details** 창에
표시되도록 함) **재생** 버튼
(![재생 버튼](imgs/replay-button.png){:.inline})을 누릅니다. 해당 애니메이션이
 뷰포트에서 재생됩니다.
  **애니메이션 속도** 버튼(![애니메이션 속도
버튼](imgs/animation-speed-buttons.png){:.inline})을 클릭하면 현재 선택한 애니메이션 그룹의 미리보기
속도를 변경할 수 있습니다. 빨간색 세로 막대를 사용하면 
현재 위치를 변경할 수 있습니다. 
* 빨간색 세로 막대를 클릭하여 끌어오면 뷰포트 애니메이션을 스크럽할 수 있습니다. 

### 애니메이션 세부정보 보기

애니메이션 그룹을 캡처한 후에 이를 **Overview** 창에서 클릭하여 
세부정보를 봅니다. **Details** 창에서 각각의 애니메이션은 자체
행을 가집니다. 

![애니메이션 그룹 세부정보](imgs/animation-group-details.png)

애니메이션 위로 마우스를 가져가면 뷰포트에서 강조표시됩니다. 애니메이션을
클릭하면 해당 항목이 **Elements** 패널에서 선택됩니다. 

![애니메이션 위로 마우스를 가져가서 
뷰포트에서 강조표시](imgs/highlight-animation.png)

가장 왼쪽에 있는, 애니메이션에서 어둡게 표시되는 부분은 해당 항목의 정의입니다. 오른쪽에 있는, 
좀 더 색이 바랜 부분은 반복을 나타냅니다. 예를 들어
아래의 스크린샷에서 두 번째와 세 번째 섹션은 첫 번째 섹션의 반복을 나타냅니다. 

![애니메이션 반복의 다이어그램](imgs/animation-iterations.png)

두 요소에 동일한 애니메이션이 적용된 경우, Animation
Inspector가 이들 요소에 같은 색상을 할당합니다. 색상 자체는 무작위로 정해지며 
아무런 의미도 없습니다.
예를 들어 아래 스크린샷의 경우, 두 개의 요소 `div.eye.left::after` 
및 `div.eye.right::after`에 동일한 애니메이션(`eyes`)이 적용되어 있으며, 
`div.feet::before` 및 `div.feet::after` 요소에서도 마찬가지입니다. 

![색상이 구분된 애니메이션](imgs/color-coded-animations.png)

## 애니메이션 수정 {:#modify}

Animation Inspector로 애니메이션을 수정하는 방법은 세 가지가 있습니다.

* 애니메이션 기간
* 키프레임 타이밍
* 시작 시간 지연

이 섹션에서는 아래의 스크린샷이 원본
애니메이션을 나타낸다고 가정합니다.

![수정하기 전의 원본 애니메이션](imgs/modify-original.png)

애니메이션의 재생 시간을 변경하려면, 첫 번째 또는 마지막
원을 클릭하고 드래그합니다.

![수정된 재생 시간](imgs/modify-duration.png)

애니메이션에서 키프레임 규칙을 정의한 경우, 안쪽에 흰색 원으로
표시됩니다. 이들 중 하나를 클릭하여 드래그하면 키프레임의 타이밍을 변경할 수
있습니다.

![수정된 키프레임](imgs/modify-keyframe.png)

애니메이션에 지연을 추가하려면, 이를 클릭하여 원을 제외한 위치로
드래그합니다. 

![수정된 지연](imgs/modify-delay.png)


{# wf_devsite_translation #}
