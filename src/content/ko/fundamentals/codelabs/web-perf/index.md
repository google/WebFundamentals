project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이 코드랩은 웹 앱 성능 병목 현상을 찾아서 해결하도록 도와드립니다.

{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# 웹 앱 성능 문제를 찾아서 해결 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




## 소개




이 코드랩은 앱/웹 성능에 대한 Udacity 과정([ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860))에서 다룬 내용의 일부로 구성된 텍스트 기반 버전입니다. 이 코드랩은 동영상 과정을 글로 옮겼다기보다는 이 과정의 원래 실습에서 다룬 최종 프로젝트를 사용하여 버벅거림 현상을 식별하고 수정하는 과정에 대해 간단명료하게 다룹니다.


## 개요




우리는 모두 애니메이션, 스크롤 또는 다른 사용자 상호작용 동안 표시 화면이 불규칙하게 점프하는 경향이 있는 앱을 살펴보았습니다. 이처럼 시각적으로 일관성이 없는 것은 흔히 *버벅거림* 또는 *떨림* 현상이라고 하는 성능 문제로, 사용자의 몰입을 방해하는 요소입니다. 이런 문제가 발생하면 앱을 사용하는 중에 생각의 흐름이 끊기게 되고 앱의 완성도와 전문성이 떨어진다는 인상을 심어주게 됩니다.

브라우저가 프레임을 만들고 표시하는 데 너무 오랜 시간을 소비할 경우 프레임을 건너뛰므로 해당 프레임이 전혀 표시되지 않습니다. 그 대신, 다음 프레임(또는 그 다음 프레임)이 표시되고 물체가 매끄럽게 움직이는 대신 그 틈을 건너뜁니다.

버벅거림 현상은 앱이 60fps로 일관되게 실행되도록 함으로써 피할 수 있습니다. 많은 요인이 앱의 프레임 속도에 영향을 미치며, 버벅거림 현상을 줄이거나 아예 없애고 원하는 속도를 달성하도록 자바스크립트 및 CSS를 코딩하는 다양한 방법이 있습니다.

이 코드랩에서는 버벅거림 현상을 일으키는 프레임 표시 병목 현상을 찾아 수정하는 데 도움을 줌으로써 여러분이 앱의 성능 문제에 접근하는 방식을 바꿔줍니다.

### 시작하기 전에 알아야 할 사항

*  *주요 렌더링 경로:*  렌더링 파이프라인 및 자바스크립트와 CSS가 이에 어떤 식으로 영향을 미치는지에 대해 이해하고 있어야 합니다. 자세한 내용은 [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) 및 [웹사이트 성능 최적화: 주요 렌더링 경로](https://www.udacity.com/course/website-performance-optimization--ud884)에 대한 Udacity 과정을 참조하세요.
*  *프레임과 프레임 속도:*  브라우저가 프레임을 생성하는 방법 및 60fps 속도가 매끄러운 표시에 왜 중요한지에 대해 알고 있어야 합니다. 자세한 내용은 [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) 및 [브라우저 렌더링 최적화: 60 FPS 웹 앱 빌드](https://www.udacity.com/course/browser-rendering-optimization--ud860)에 대한 Udacity 과정을 참조하세요.
*  *애플리케이션 수명 주기:*  앱 실행에서 응답, 애니메이션, 유휴 및 로드 부분을 이해하고 각 부분이 제공하는 좋은 기회를 인식해야 합니다. 자세한 내용은 [RAIL 성능 모델](/web/fundamentals/performance/rail)을 참조하세요.
*  *Chrome DevTools:*  DevTools 및 이를 활용하여 웹 앱, 특히 타임라인 도구를 분석하는 방법을 기본적으로 이해하고 있어야 합니다. 자세한 내용은 [런타임 성능 분석](/web/tools/chrome-devtools/rendering-tools/)을 참조하세요.

### 이 코드랩에서 배울 내용

* 표시 성능 병목 현상을 일으키는 애플리케이션 코드를 식별하는 방법
* 병목 현상을 줄이거나 아예 없애기 위해 코드를 분석하고 수정하는 방법

### 개발 작업 공간에 필요한 사항

* Google Chrome 브라우저, DevTools
* 실습 프로젝트를 위한 샘플 코드(아래 내용 참조)

### 버벅거림/떨림 현상

Jake Archibald가 제공한 'Jank Invaders'라는 게임을 통해 버벅거림 현상을 알아보도록 하겠습니다. 이 게임은 프레임 속도 및 성능 문제를 보여주도록 설계되었습니다. 스크린샷은 다음과 같습니다.

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

이 게임에서는 우주선이 화면의 한쪽에서 다른 쪽으로 움직입니다. 좋은 우주선은 매끄럽게 움직이지만, 나쁜 우주선('스파이 우주선')은 지그재그로 날아다닙니다. 작업: 매끄럽게 움직이는 우주선 사이에서 지그재그로 날아다니는 스파이 우주선을 찾아 가능한 한 빠르게 클릭하여 쏩니다. [이 게임으로 이동하려면 여기를 클릭하세요](http://jakearchibald.github.io/jank-invaders/). 게임으로 이동하여 즐겨보세요. 그리고 마쳤으면 다시 돌아오세요.

분명한 점은, 사용자가 버벅거림 현상을 인지하고 거의 예외 없이 더 나은 성능을 제공하는 앱을 선택한다는 사실입니다. 이러한 사실은 웹에서도 별반 다르지 않습니다. 아무리 훌륭한 사이트라도 성능이 불량하면 쓸모가 없어지게 되기 마련입니다. 이 코드랩은 프로젝트의 성능에 대해 생각해보고 일반적으로 발생하는 문제들을 파악하고 수정하는 방법을 살펴보는 데 도움이 됩니다. 여러분은 매끄럽고 원활한 60fps 프레임 속도를 달성할 목표로, 원활하지 않은 스크롤, 불안정한 업데이트 및 떨리는 애니메이션의 원인을 추적해야 합니다.


## 프로젝트 앱




먼저, 이 코드랩에서 디버그할 앱을 살펴보도록 하겠습니다. 모습은 다음과 같습니다.

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

이 사이트는 __Hacker News API__를 사용하여 최신 스토리와 해당 점수를 보여줍니다. 지금 현재로서는 앱의 성능이 아주 형편없고, 특히 모바일 환경에서 그러하지만 60fps에 도달하지 못할 이유는 없습니다. 이 코드랩의 끝부분에서 여러분은이러한 버벅거리는 앱을 60fps의 매력 있고 효율적인 환경으로변환하는 데 필요한 기술과 기법, 그리고 가장 중요한 의식을 갖추게 될 것입니다.

### 프로젝트 코드 가져오기

먼저, 애플리케이션 코드를 '이전' 버전과 '이후'버전 모두 가져와야 합니다. 저장소를 복제하거나 zip 파일만 다운로드할 수 있습니다.

* 성능 병목 형상이 있는 원래 앱은 이 [GitHub 저장소](http://github.com/udacity/news-aggregator)에 있습니다. 또한, [라이브 사이트](http://udacity.github.io/news-aggregator/)도 있으므로 보고 싶은 경우 확인해 보세요. 이것이 바로 여러분이 작업할 버전입니다.
* 성능 병목 현상이 없는 완성된 앱은 이 [GitHub 저장소](https://github.com/udacity/news-aggregator/tree/solution)에 있습니다. 이 수정된 버전을 참조용으로 사용할 수 있습니다.

### 원래 앱 실행

먼저, 버벅거리는 문제가 있는 앱의 원래 버전을 가동하고 실행합니다. Chrome에서 최상위 폴더(예: news-aggregator-master)에 있는 __index.html__을 엽니다. 앱을 약간 실험해 봅니다. 그러면 두 가지 주요 사용자 상호작용인 메인 화면에서의 스크롤 및 스토리 슬라이드 인/아웃에서의 간략한 수준의 성능 문제 두어 가지를 빠르게 알아차릴 수 있을 것입니다. 우리는 이러한 주요 문제에 집중하여 이 버벅거리는 앱의 성능을 향상시킬 수 있는 방법을 살펴볼 예정입니다.


## 실습 1: 목록 스크롤




메인 화면에서 스크롤을 수행하면 스토리 목록이 떨리는 것을 확인할 수 있습니다. 또한, 개별 스토리 점수 표시기(원 안에 표시된 숫자)가 값뿐만이 아니라 색상도 변경하는 것을 볼 수 있을 것입니다. 이 실습에서는 이러한 문제를 식별하고 이에 접근하는 방법을 결정하는 작업에 대해 다룹니다.

타임라인을 사용하여 메인 화면을 스크롤할 때 실제로 어떠한 일이 벌어지는지 확인해 봅시다. __JS Profile__ 확인란을 선택한 후에 기록을 시작해야 합니다. 새 기록을 시작하고, 목록을 약간 아래로 스크롤한 후 기록을 중지합니다. 

기록 맨 위쪽에 FPS 표시기가 녹색으로 나타납니다. 아래 스크린샷에서처럼, 가끔 스파이크가 발생하는 녹색 막대가 보일 것입니다. 녹색 막대가 이처럼 낮다는 사실은 화면이 60 FPS에 미치지 못했음을 나타냅니다.

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

기록을 확대해서 보면 스크롤 이벤트가 함수 호출된 다음에 여러 개의 레이아웃 이벤트가 따로 발생하는 것이 보일 것이며 각각 빨간색 경고 삼각형이 있습니다. 레이아웃 이벤트는 아래의 스크린샷에서 플레임 차트 하단에 매우 폭이 좁은 자주색으로 표시되는 이벤트입니다. 이것은 *강제 동기식 레이아웃*이 발생하고 있다는 확실한 징후입니다.

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

레이아웃 이벤트로 마우스를 가져가 식별한 후 클릭하면 세부 정보를 볼 수 있습니다. 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

레이아웃 이벤트의 세부 사항을 살펴보세요. 그러면 강제 동기식 레이아웃 경고가 app.js의`colorizeAndScaleStories` 함수에 의해 생성되고 있음을 확인할 수 있습니다.

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

다음 함수를 검토해 봅시다.

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

`height`, `width` 및 `line-height`가 액세스되고, 이로 인해 레이아웃이 실행됩니다. 불투명도도 설정되어 있으며(불투명도 변경은 레이아웃을 트리거하지 않음), 이 코드 줄이 재계산을 트리거하고, 레이아웃을 다시 트리거하는 새로운 스타일을 적용합니다. 함수의 메인 루프에 사용된 이 두 가지 기술은 강제 동기식 레이아웃 문제를 일으킵니다. 

다음으로, 스토리 점수 표시기에 미치는 시각적 효과를 살펴봅니다. 이 시각적 효과에서는 어떠한 정보 값도 추가되지 않습니다. 자바스크립트 대신 CSS 속성으로 효과를 실현할 수 있습니다. 하지만 효과를 완전히 삭제하는 것이 나을 수도 있습니다. 시사점: 경우에 따라 최상의 코드 수정 방법은 코드를 제거하는 것입니다.

`colorizeAndScaleStories` 함수에 대한 호출을 삭제합시다. app.js에서 줄 번호 88, 89, 305는 물론이고 함수 전체(줄 번호 255~286)를 주석으로 처리하세요. 이 코드랩에서 이후에 참조하는 줄 번호가 앱과 일치해야 할 것이므로 이들 줄을 삭제하지는 마세요. 이제 스토리 점수가 항상 똑같아 보이게 됩니다.

앱을 다시 실행하고 일부 스크롤 작업에 대한 타임라인 기록을 수행한 후 스크롤 이벤트를 확대해 봅니다. 이번에는 스크롤 후 한 번의 스타일 재계산만 발생하며 FPS 막대가 훨씬 더 높다는 것을 알 수 있습니다. 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

추가 레이아웃 및 해당 강제 동기식 레이아웃 경고가 사라졌으며, 프레임 속도는 우수한 수준입니다. 버벅거림 문제가 해결되었습니다.


## 실습 2: 스토리 연결




앱의 부드러운 동작에 영향을 미치는 또 다른 문제는 목록에 스토리를 추가할 때 스크롤이 버벅거리는 현상입니다. `scroll` 이벤트 리스너 코드에서 `loadStoryBatch`에 대한 호출에 주목하세요.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

이 함수는 로드될 때 페이지에 새 스토리를 삽입함으로써(특히 `appendChild`를 사용하여 DOM 노드를 추가함으로써) 페이지에 시각적인 변화를 줍니다. 이 함수뿐 아니라 이 함수를 사용하는 디자인 접근방식에도 본질적으로 잘못된 점은 없지만, 함수 호출 방식을 고려하세요.

`loadStoryBatch` 함수는 catch-as-catch-can이므로 페이지에서 다른 어떤 일이 일어나거나 브라우저가 프레임 생성 프로세스의 어느 지점에 있든 상관없이 `loadThreshold` 테스트를 기반으로 필요할 때마다 실행됩니다. 이는 스크립트 실행 시 자바스크립트 엔진이 렌더링 파이프라인에 주목하지 않기 때문입니다. 그런 직접성으로 인해, 특히 목록에 더 많은 스토리가 추가될 때 성능 문제가 발생합니다. *requestAnimationFrame*을 사용하여 이 문제를 해결할 수 있습니다.

requestAnimationFrame 호출 내부에서 페이지에 시각적 변화를 일으키는 일이 발생하는 것이 이상적입니다. `scroll` 이벤트 리스너 코드를 그런 식으로 수정해봅시다.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

이런 간단한 변화만으로 애니메이션 관련 스크립트가 파이프라인 프로세스에서 초기에 실행되어 작지만 의미 있는 성능 향상 효과를 제공합니다.


## 실습 3: 스토리 슬라이드 인/아웃(파트 1)




뉴스 제공 앱에 대해 문제가 있는 또 다른 영역은 스토리지 슬라이드 인/아웃에 대한 기본 동작입니다. 이는 스크롤을 제외하고 앱에서 가장 흔히 수행되는 사용자 상호작용 기능입니다.

평상시처럼, 스토리지 슬라이드 인/아웃에 대해 타임라인 기록을 수행하고 프레임 속도를 검토하는 것으로 시작합니다. 슬라이드 인/아웃은 실제로 다양한 기기에서 약간 버벅거리는 수준부터 기본적으로 불안정한 수준까지 그 범위가 다양할 수 있습니다. 반드시 휴대기기에서 [라이브 사이트](http://udacity.github.io/news-aggregator/)를 보세요. 단, 이는 모든 플랫폼에서 문제가 있습니다.

![59865afca1e508ef.png](img/59865afca1e508ef.png)

일반적으로, 빨간색 삼각형이 위에 있는 자주색 이벤트가 발생할 때마다 그 위로 마우스를 가져가서 클릭하여 세부 정보를 보고 무슨 일인지 검토하고 싶을 것입니다. 지금 당장은 타이머 실행 후에 발생한 강제 동기식 레이아웃에 관심이 있습니다. 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

슬라이드 인/아웃 애니메이션은 타이머를 실행하고 강제 동기식 레이아웃이 발생합니다. 세부 사항은 app.js 파일의 줄 번호 180을 가리킵니다. 이는 `animate`라고 하는 함수입니다. 다음 함수를 검토해 봅시다.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

가장 먼저 보게 될 사항 중 하나는 `animate`에 대한 다음 호출을 설정하는 `setTimeout`입니다. 이전 실습에서 배운 대로, 페이지에 대해 수행되는 시각적 작업은 일반적으로 `requestAnimationFrame`호출 안으로 들어가야 합니다. 하지만 특히 해당 `setTimeout`이 문제입니다.

여기서 명백하지만 손쉬운 수정 방법은 `animate`에 대한 각 호출을 `requestAnimationFrame` 내에 배치하여 해당 프레임 시퀀스의 시작 부분에서 실행되도록 예약하는 것입니다.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

또 다른 타임라인 기록을 수행하면 기기에 따라 보통 수준에서 상당한 수준의 성능 향상을 볼 수 있을 것입니다.

보너스 질문: 스토리 슬라이드 인/아웃 시 어떠한 일이 벌어지는지 생각해 보세요. 우리는 그저 스토리가 페이지에 나타났다가 사라지도록 하여, 콘텐츠를 표시했다가 숨길 뿐입니다. 이는 간단한 전환 프로세스처럼 보입니다. 그런데도 여기에 자바스크립트가 필요할까요? 아니면 CSS만으로도 처리가 가능할까요? 실습 5에서 이 시나리오를 다시 살펴보도록 하겠습니다.


## 실습 4: 메모리 낭비




버벅거리는 애니메이션이 웹 앱 및 페이지에서 성능 저하를 유발하는 유일한 원인은 아닙니다. 또 다른 주요 범인은 비효율적인 메모리 사용이며, 짐작했듯이 뉴스 제공 앱도 책임이 있습니다.

메인 목록에서 스토리 헤드라인이 클릭되면 앱이 스토리 콘텐츠를 빌드하고, 이를 페이지에 추가한 후 뷰로 슬라이드 인합니다. 이는 '페이지에 추가' 부분으로, 검토가 필요합니다. 편리하게도, 스토리 클릭을 처리하는 함수를 `onStoryClick`이라고 합니다. 이 함수를 살펴보도록 하겠습니다.

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

첫 번째 변수 선언 그룹 다음에 변수 `storyDetails`를 생성하고 해당 요소 유형, 속성 및 콘텐츠를 설정하는 네 개의 줄이 있습니다. 이 바로 다음에는 `appendChild` 메서드를 사용하여 `storyDetails`가 DOM에 새로운 노드로 추가되어 있습니다.

우선, 이것이 반드시 문제가 되지는 않습니다. 하지만, 앱이 사용될 때 낭비가 상당히 심해지게 됩니다. 물론, 사용자는 한 번에 하나의 스토리만 보지만, 각 보여지는 스토리에 대해 생성되는 새로운 노드는 절대로 폐기되지 않습니다. 몇 번의 클릭을 하고 나면 DOM이 더 이상 사용되지 않는 버려진 노드로 지저분하게 됩니다. 이러한 노드는 메모리를 차지하여 앱의 속도를 저하시킵니다. 앱이 사용되는 시간이 길어질수록 성능도 점점 더 저하되게 됩니다.

이 기능을 수행하는 더 나은 방법은 스크립트 앞부분에 현재 스토리를 유지하는 하나의 영구`storyDetails` 노드를 생성하고 믿을 수 있는 `innerHTML` 속성을 사용하여 새로운 노드를 생성하는 대신 매번 해당 콘텐츠를 재설정하는 것입니다. 즉, 다음 코드를 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

아래와 같이 바꾸면 됩니다.

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

이렇게 변경하면 장기적인 성능이 확실히 향상되지만, 단기적으로 보면 어떠한 이점도 없습니다. 

따라서 여전히 스토리지 슬라이드 인/아웃 문제 해결을 마무리지어야 합니다.


## 실습 5: 스토리 슬라이드 인/아웃(파트 2)




지금까지, 여러분은 앱의 전반적인 성능을 향상시켰을 뿐만 아니라 목록 스크롤과 같은 일부 특정 성능 문제도 해결했습니다. 하지만 향상된 앱을 실행해도 여전히 다른 주요 사용자 상호작용인 스토리 슬라이드 인/아웃에서 약간의 버벅거림이 있는 것을 볼 수 있습니다.

이 프로세스를 검토해 보도록 하겠습니다. 타임라인에서 자바스크립트 프로파일러를 켜고, 스토리 헤드라인을 클릭하여 이를 슬라이드 인한 후 스토리의 X 버튼을 클릭하여 슬라이드 아웃하는 동안 타임라인 기록을 수행합니다. 실습 3에서 보았듯이 `onStoryClick` 함수는 (여전히) 강제 동기식 레이아웃을 일으킵니다.

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

그 실습에서는 `animate` 함수 호출을 `requestAnimationFrame`에 넣었습니다. 이것은 확실히 도움이 되었지만 문제를 완전히 해결하지는 못했습니다. 

이전에 설명한 내용(및 [CSS 트리거](http://csstriggers.com/)에서 살펴본 내용)을 떠올려 보면 특정 속성을 사용하는 경우 렌더링 파이프라인의 특정 부분이 수행된다는 점이 기억날 것입니다. `animate`를 다시 한 번 더살펴봅시다.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

함수의 끝부분 근처에 `left` 속성이 설정되어 있고, 이는 브라우저가 레이아웃을 실행하도록 합니다. 바로 그 다음에, `style` 속성이 설정되어 있고, 이는 브라우저가 스타일 재계산을 실행하도록 합니다. 아시다시피, 하나의 프레임에서 이러한 작업이 두 번 이상 발생하면 강제 동기식 레이아웃이 발생합니다. 이 함수에서는 이 작업이 여러 번 발생합니다. 

`animate` 함수는 `showStory` 함수와 해당 자매 함수인 `hideStory` 내에 포함되어 있으며, 이 둘 모두 동일한 속성을 업데이트하므로 강제 동기식 레이아웃 문제를 일으킵니다.

이 코드랩의 앞부분에서 배웠듯이, 경우에 따라 최상의 코드 수정 방법은 코드를 제거하는 것입니다. 그렇습니다. `showStory` 및 `hideStory` 함수는 각자의 작업을 수행하지만, 단순한 효과여야 하는 항목에 대해 너무 복잡합니다. 그러면 잠시 그대로 두고 CSS를 대신 사용하여 작업이 수행되도록 할 수 있을지 알아봅시다. 다음 CSS 코드를 살펴보세요.

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

`.story-details` 클래스에서 가장 먼저 주목할 사항은 `left` 속성을 100%로 설정하는 것입니다. 화면 너비에 상관없이 이 설정은 전체 스토리 요소를 오른쪽으로 밀어 표시되는 페이지에서 완전히 밖으로 벗어나서 사실상 숨겨지도록 합니다. 

다음으로, `.story-details.visible` 및 `.story-details.hidden` 클래스에서 각 클래스에 `transform`을 설정하여 X(가로) 위치를 각각 100vw(*뷰포트 너비*) 및 0이 되도록 합니다. 적용을 마치면 이 클래스는 스토리 콘텐츠를 뷰 안으로 이동하거나 원래 화면 밖 위치로 되돌립니다.

그런 다음, 스토리 모양이 실제로 애니메이션처럼 보이고 갑자기 스냅인/스냅아웃되지 않도록 하기 위해 `transform`에 `transition`을 설정하여 작업이 수행되도록 0.3초(33ms)의 시간을 허용합니다. 이렇게 하면 매끄러운 슬라이드 인/아웃 시각적 효과가 보장됩니다.

끝으로, `will-change` 속성을 사용하여 브라우저에 곧 있을 `transform` 변경을 알립니다.

`showStory` 및 `hideStory` 함수로 돌아와서, 이제는 함수를 상당히 단순화하여 새 `visible` 및 `hidden` 클래스를 추가하거나 제거할 수 있습니다. 이를 통해 복잡한 스크립팅 없이 원하는 시각적 변경을 수행할 수 있습니다.

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

이 모든 것이 앱의 스토리슬라이드 인/아웃 성능에 상당히 긍정적인 이점이 있을 테지만, 확실히 알 수 있는 유일한 방법은 당연히 테스트하는 것뿐입니다. 스토리 슬라이드 인/아웃에 대해 타임라인 기록을 한 번 더 수행하고 살펴보세요.

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

앱의 성능이 훨씬 좋아지고, 모든 프레임이 이제 60fps 선보다 훨씬 아래에 있으며, 강제 동기식 레이아웃 경고가 사라졌습니다. 무엇보다도, 슬라이드 인/아웃 애니메이션을 수행하기 위해 자바스크립트를 더 이상 사용할 필요가 없습니다. 

기본적인 성능 향상 실습을 마쳤습니다.


## 축하합니다!




설명에 따라 원래 프로젝트 코드에 권장되는 변경 작업을 수행했다면 이제 애니메이션이 버벅거리는 현상 없이 60fps로 매끄럽게 실행되는 앱을 구축했을 것입니다.

### 지금까지 다룬 내용

이 코드랩에서는 다음 사항을 다루었습니다.

* 필수 사전 지식: 주요 렌더링 경로, 프레임 및 프레임 속도, 애플리케이션 수명 주기 및 Chrome DevTools
* 버벅거림 현상 개요: 버벅거림 현상의 정의, 버벅거림 현상이 발생하는 이유 및 버벅거림 현상을 시각적으로 파악하는 방법
* 프로젝트 앱: 의도된 동작, 매끄러운 애니메니션 구현에 실패하는 이유 및 이러한 문제를 파악하고 수정하는 방법

### 시사점

이 코드랩에서 주로 시사하는 바는 다음과 같습니다.

* 화면이 버벅거리는 애니메이션은 디자인 문제와 코드 문제 모두에 해당될 수 있습니다.
* 버벅거림 현상을 자각하거나 이러한 현상이 없는지는 사용자가 앱을 사용할지 여부를 결정하는 데 있어 중요한 요인으로 작용합니다.
* 아무리 사소한 속도 조정이라도 시간이 지남에 따라 앱의 전반적인 성능을 상당히 향상시킬 수 있습니다.

### 다음 단계

완성된 프로젝트 코드를 검토할 것을 권장합니다. 이러한 코드는 이 [GitHub 저장소](https://github.com/udacity/news-aggregator/tree/solution)에서 확인할 수 있습니다. 이 코드랩에서 시간을 가지고 다룬 것보다 더욱 향상된 코드가 들어 있음을 알 수 있을 것입니다. 앱의 '이전' 버전과 '이후' 버전을 비교하여 코드상의 차이점을 살펴보고 작성자가 앱의 성능을 향상시키기 위해 변경한 사항이 무엇인지 확인해 보세요.

### 감사합니다.

이 코드랩을 살펴봐주셔서 감사합니다. 저희는 항상 향상을 위해 노력하고 있습니다. 버그 문제를 발견했거나 제안 사항이나 문제점, 또는 의견이 있으면 아래의 피드백 링크를 통해 저희에게 연락하시기 바랍니다. 즐겁게 코딩해 보세요!




{# wf_devsite_translation #}
