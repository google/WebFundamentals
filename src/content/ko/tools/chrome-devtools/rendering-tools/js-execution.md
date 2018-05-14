project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools CPU Profiler를 사용하여 고비용 함수를 식별합니다.

{# wf_updated_on: 2016-03-30 #}
{# wf_published_on: 2015-04-13 #}

# 자바스크립트 실행 속도 개선 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools CPU
Profiler를 사용하여 고비용 함수를 식별합니다.

![CPU 프로필](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- CPU Profiler를 사용하여 정확히 어느 함수를 호출하였는지, 각각 얼마나 시간이 걸렸는지 기록할 수 있습니다.
- 프로필을 Flame Chart로 시각화합니다.


## CPU 프로필 기록 {:#record-profile}

자바스크립트에 버벅거림이 있는 것을 발견하면, 자바스크립트 CPU 프로필을 수집합니다.
CPU 프로필에는 페이지 함수의 어디에서 실행 시간이 소모되었는지 표시됩니다.

1. DevTools의 **Profiles** 패널로 이동합니다.
2. **Collect JavaScript CPU Profile** 라디오 버튼을 선택합니다.
3. **Start**를 누릅니다.
4. 무엇을 분석하려 하는지에 따라 페이지를 새로 고치거나 
페이지와 상호작용하거나, 그저 페이지를 실행시키기만 할 수도 있습니다. 
5. 작업을 마쳤으면 **Stop** 버튼을 누릅니다. 

또한 [Command Line API][profile]를 사용하여 명령줄에서 프로필을 기록하고
그룹화할 수도 있습니다.

[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## CPU 프로필 보기 {:#view-profile}

기록을 마쳤으면 DevTools가 해당 기록에서 가져온 데이터를 사용하여 자동으로 Profile 패널을
채웁니다. 

기본 뷰는 **Heavy (Bottom Up)**입니다. 이 뷰를 사용하면 
성능에 가장 크게 영향을 미치는 함수가 무엇인지 확인하고 그러한 함수로 이어지는 
호출 경로를 검사할 수 있습니다. 

### 정렬 순서 변경 {:#sort}

정렬 순서를 변경하려면, 
**선택한 함수에 포커스** 아이콘
(![선택한 함수에 포커스 아이콘](imgs/focus.png){:.inline}) 옆에 있는 드롭다운 메뉴를 클릭한 다음 
다음 옵션 중에서 하나를 선택합니다.

**Chart**. 기록의 시간순 Flame Chart를 표시합니다.

![flame chart](imgs/flamechart.png)

**Heavy (Bottom Up)**. 함수를 성능에 미치는 영향을 기준으로 나열하며 개발자가 
함수의 호출 경로를 검사할 수 있습니다. 이는 기본 뷰입니다. 

![heavy chart](imgs/heavy.png)

**Tree (Top Down)**. 호출 구조의 전반적인 모양을 표시하되
콜 스택 맨 위부터 시작합니다. 

![tree chart](imgs/tree.png)

### 함수 제외 {:#exclude}

CPU 프로필에서 함수를 제외하려면 해당 항목을 클릭하여 선택한 다음 
**exclude selected function** 아이콘(![함수 제외 아이콘](imgs/exclude.png){:.inline})을
누릅니다. 제외된 함수를
호출한 호출자에게 제외된 함수의 총 시간이 부과됩니다.

**모든 함수 복원** 아이콘
(![모든 함수 복원 아이콘](imgs/restore.png){:.inline})
을 클릭하면 제외된 함수를 모두 기록으로 다시 복원합니다.

## CPU 프로필을 Flame Chart로 보기 {:#flame-chart}

Flame Chart 뷰는 CPU 프로필이 시간이 지나면서 어떻게 변하는지 시각적으로
나타냅니다. 

[CPU 프로필을 기록](#record-profile)하고 나서 기록을
Flame Chart 형태로 보려면 [정렬 순서](#sort)를 **Chart**로 변경합니다.

![Flame Chart 뷰](imgs/flamechart.png)

Flame Chart는 두 부분으로 분할되어 있습니다.

1. **Overview**. 전체 기록의 조감도입니다.
   막대 높이가 콜 스택의 깊이와 
같습니다. 따라서 막대가 높을수록 콜 스택도 깊다는 뜻입니다. 

2. **Call Stacks**. 기록 중에 호출된 
함수에 대한 심층 뷰입니다. 가로축은 시간이고 세로축은 
콜 스택입니다. 스택은 하향식으로 구성되어 있습니다. 따라서 맨 위의 함수가 그 아래 있는 함수를 호출하고, 
같은 방식으로 이어집니다. 

   함수는 무작위로 색이 지정됩니다. 다른 패널에서 사용된 색과 아무런 
연관 관계가 없습니다. 하지만 함수는 전체 호출에 걸쳐 항상 모두 동일한 색이 지정되므로
실행 패턴을 확인할 수 있습니다. 

![주석처리된 Flame Chart](imgs/annotated-cpu-flame.png)

콜 스택의 높이가 높다고 반드시 중요한 것은 아닙니다. 그저 호출된 함수가 많다는 뜻일
뿐입니다. 하지만 막대의 너비가 넓으면 호출이 완료되는 데 시간이 오래 걸렸다는 
뜻입니다. 이러한 항목은 최적화 후보입니다. 

### 기록의 특정 부분 확대 {:#zoom}

개요의 좌우를 오가며 마우스로 클릭한 상태로 끌어오면 콜 스택의 특정 부분만 
확대할 수 있습니다. 확대하고 나면 해당 콜 스택이
개발자가 선택한 기록 부분을 자동으로 표시합니다.

![확대한 Flame Chart](imgs/benchmark-zoom.png)

### 함수 세부정보 보기 {:#flame-chart-function-details}

함수를 클릭하면 **Sources** 패널에서 해당 정의를 볼 수 있습니다.

함수 위로 마우스를 가져가면 해당 이름과 타이밍 데이터가 표시됩니다. 제공되는 정보는 
다음과 같습니다. 

*  **Name**. 함수의 이름입니다.
*  **Self time**. 함수의 현재 호출을 완료하는 데 얼마나 걸렸는지 
나타냅니다. 여기에는 함수 자체에 포함된 문만 완료하는 데 걸린 시간이 포함되며, 
호출된 모든 함수를 포함하지는 않습니다.
*  **Total Time**. 이 함수와 해당 함수가 호출한 모든 함수의 현재 호출을 완료하는 데 
걸린 시간입니다.
*  **URL**. 함수 정의의 위치를 
`file.js:100` 형식으로 나타낸 것입니다. 여기서 `file.js`는 함수가 정의된 위치의 파일 이름이고 
`100`은 해당 정의의 줄 번호입니다.
*  **Aggregated self time**. 기록 전체를 가로질러 함수의 모든 호출에 대한 
집계 시간이며, 여기에는 이 함수로 인해 호출된 함수는 
포함하지 않습니다.
*  **Aggregated total time**. 해당 함수의 모든 호출에 걸린 총 시간을 집계한 것으로, 
이 함수가 호출한 다른 모든 함수도 포함합니다.
*  **Not optimized**. 프로파일러가 해당 함수에 대해 가능한 최적화를
감지하면 여기에 나열합니다.

![함수 세부정보를 Flame Chart로 보기](imgs/details.png)


{# wf_devsite_translation #}
