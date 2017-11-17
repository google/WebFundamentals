project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 이 대화형 가이드를 따라 DevTools를 사용하여 강제 동기식 레이아웃을 진단하는 방법을 배워보세요.

{# wf_updated_on: 2016-03-31 #}
{# wf_published_on: 2015-04-13 #}

# 강제 동기식 레이아웃 진단 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

DevTools를 사용하여
강제 동기식 레이아웃을 진단하는 방법을 배워보세요.

이 가이드에서는 실시간 데모를 사용하여 
문제를 파악하고 해결하는 방식을 제시하여 [강제 동기식 레이아웃][fsl]을 디버그하는 방법을 알려드립니다.  이 데모에서는 
[`requestAnimationFrame()`][raf]를 사용하여 이미지를 애니메이션으로 만듭니다. 이는 
프레임 기반 애니메이션을 다룰 때 권장되는 방식입니다. 다만 이 경우 애니메이션 내에 상당량의 버벅거림이 
있습니다. 여러분의 목표는 버벅거림의 원인을 파악하여 문제를 해결해서
데모가 60fps의 아주 매끄러운 속도로 실행되게 하는 것입니다. 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## 데이터 수집

우선, 데이터를 캡처하여 페이지가 실행될 때 정확히 무슨 일이 일어나는지
확실히 파악해야 합니다. 

1. [데모](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html)를 엽니다.
1. DevTools의 **Timeline** 패널을 엽니다.
1. **JS Profile** 옵션을 활성화합니다. 나중에 Flame Chart를 분석할 때, 이 옵션을 보고
정확히 어떤 함수를 호출했는지 확인할 수 있습니다.
1. 페이지에서 **Start**를 클릭하여 애니메이션을 시작합니다. 
1. Timeline 패널에서 **Record** 버튼을 클릭하여 타임라인
기록을 시작합니다.
1. 2초간 기다립니다. 
1. **Record** 버튼을 다시 클릭하여 기록을 중단합니다. 

기록을 마쳤으면 Timeline 패널에 다음과 같은 내용이 표시되는 것이
정상입니다. 

![버벅거림 현상의 타임라인 기록 데모](imgs/demo-recording.png)

## 문제 파악

이제 데이터를 확보했으니 데이터에 무슨 의미가 있는지 파악할 차례입니다. 

간략하게 보면, 타임라인 기록의 **Summary** 창에서 
브라우저가 대부분의 시간을 렌더링에 보낸다는 사실을 확인할 수 있습니다. 일반적으로
[페이지의 레이아웃 작업을 최적화][layout]할 수 있다면 렌더링에 소모하는 시간을 절약할 수
있을 것입니다. 

![타임라인 요약](imgs/summary.png)

이제 **Overview** 창 바로 아래에 있는 분홍색 막대로 주의를 돌려봅시다.
이들은 프레임을 나타냅니다. 이 위로 마우스를 가져가면 해당 프레임에 대한 자세한 정보를
볼 수 있습니다.

![긴 프레임](imgs/long-frame.png)

프레임을 완료하려면 오랜 시간이 걸립니다. 애니메이션이 매끄럽게 재생되려면 60FPS를 목표로 삼는 것이 
좋습니다. 

이제 정확히 무엇이 잘못되었는지 진단할 때가 왔습니다. 마우스를 사용하여 콜 스택을
[확대][zoom]합니다. 

![확대된 타임라인 기록](imgs/zoom.png)

스택 맨 위에 `Animation Frame Fired` 이벤트가 있습니다. 이 이벤트가 발생할 때마다
`requestAnimationFrame()`에 전달한 함수가 호출됩니다.
`Animation Frame Fired` 아래 `Function Call`이 있고, 그 아래
`update`가 표시됩니다. `update()`라는 메서드가 
`requestAnimationFrame()`의 콜백이라는 사실을 추론할 수 있습니다. 

참고: 이곳은 앞서 활성화한 **JS Profile** 옵션이 유용하게 쓰이는 
곳입니다. 이 옵션이 비활성화되어 있는 경우, `Function Call`만 표시되며 그 뒤를 이어
작은 보라색 이벤트(다음에 논의)가 표시되지만 정확히 어떤 함수를
호출했는지 세부정보는 없습니다.

이제 `update`
이벤트 아래의 작은 보라색 이벤트 전체로 주의를 집중해 봅시다. 이들 이벤트 중 대다수는 상단이 빨간색입니다. 이것은 경고 표시입니다.
이들 이벤트 위로 마우스를 가져가면 페이지가 강제 리플로우의 희생자일 수 있다는 
DevTools 경고를 볼 수 있습니다. 강제 리플로우는
강제 동기식 레이아웃을 다른 이름으로 부르는 말일 뿐입니다. 

![레이아웃 이벤트 위로 마우스 가져가기](imgs/layout-hover.png)

이제 이 모든
강제 동기식 레이아웃을 초래하는 함수를 살펴볼 차례입니다. 레이아웃 이벤트를 클릭하여 선택합니다. 
이제 Summary 창에 이 이벤트에 대한 세부정보가 표시되어 있을 것입니다. 
**Layout Forced**(`update @ forcedsync.html:457`) 아래의 링크를 클릭하여
함수 정의로 점프합니다.

![함수 정의로 점프](imgs/jump.png)

이제 **Sources** 패널에서 함수 정의를 볼 수 있습니다. 

![Sources 패널에 표시된 함수 정의](imgs/definition.png)

`update()` 함수는
`requestAnimationCallback()`의 콜백 핸들러입니다. 이 핸들러는 이미지의 `offsetTop` 값을 기준으로 각 이미지의 
`left` 속성을 계산합니다. 따라서 브라우저가 즉시 강제로 새로운 레이아웃을 수행하여
올바른 값을 제공하도록 보장합니다.
애니메이션 프레임마다 레이아웃을 강제 적용하면 페이지 애니메이션에 버벅거림이 발생하는 원인이 
됩니다. 

이제 문제를 파악했으니 DevTools에서 직접 해결을
시도해볼 수 있습니다.

[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## DevTools 내에서 수정 사항 적용

이 스크립트는 HTML에 포함되어 있으므로 **Sources** 패널을 통해 편집할 수 없습니다.
(하지만 `*.js` 내의 스크립트는 Sources 패널에서 편집할 수 있습니다). 

하지만 변경 사항을 테스트하려면 해당 함수를 콘솔에서 재정의하면 됩니다.
HTML 파일에서 함수 정의를 복사하여 DevTools 콘솔에
붙여넣습니다. `offsetTop`을 사용하는 문을 삭제하고 그 아래에 있는 문의 주석 처리를 
제거합니다. 작업을 마치면 `Enter` 키를 누릅니다. 

![문제 있는 함수 재정의](imgs/redefinition.png)

애니메이션을 다시 시작합니다. 이제 전보다 훨씬 매끄러워진 것을 육안으로 확인할 수 있습니다. 

## 또 다른 기록으로 확인

또 다른 기록을 사용하여 애니메이션이 정말로 전보다
빠르고 성능이 우수한지 확인하는 것이 좋습니다. 

![최적화 이후 타임라인 기록](imgs/after.png)

훨씬 더 낫습니다.


{# wf_devsite_translation #}
