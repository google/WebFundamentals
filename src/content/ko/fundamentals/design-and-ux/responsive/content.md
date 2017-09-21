project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 다양한 범위의 사용자와 기기용으로 빌드할 경우, 레이아웃 및 그래픽 디자인뿐만 아니라 콘텐츠도 고려하세요.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-05-10 #}

# 다중 기기 콘텐츠 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## 사람들이 웹페이지를 읽는 방식

[미국 정부 웹 작성 안내서](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html)에는 사람들이 웹에서 작성할 때 원하는 바가 요약되어 있습니다.

> 웹용 콘텐츠나 문서를 작성할 때 평이한 언어를 사용하면 사용자가 손쉽게 필요한 내용을 쉽게 찾아서 그 내용을 이해한 후 필요에 따라 사용할 수 있습니다.
>
> 또한, 실행 가능하고 찾아서 공유할 수 있어야 합니다.

연구에 따르면 [사람들은 웹페이지를 읽는 것이 아니라 스캔합니다](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/). 평균적으로 [사람들은 웹페이지 콘텐츠의 20–28%만을 읽습니다](https://www.nngroup.com/articles/how-little-do-users-read/). 화면에서 읽는 것은 종이에서 읽는 것보다 훨씬 더 느립니다. 정보에 접근하고 이해하기 어려우면, 사람들은 여러분의 사이트를 포기하고 떠날 것입니다.

## 모바일용으로 작성하는 방법

주제에 초점을 맞추고 스토리를 정확히 얘기하세요. 다양한 기기와 뷰포트에서 작동하도록 작성하려면, 처음부터 요점을 전달해야 합니다(일반적으로 [처음 네 단락에서 약 70단어 이내](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610)).

사람들이 내 사이트에서 원하는 것이 무엇인지 스스로에게 물어보세요. 그들이 무엇인가를 찾고 있나요? 사람들이 정보를 찾기 위해 사이트를 방문한다면, 이들이 목표를 달성하도록 돕는 데 모든 텍스트가 집중되어야 합니다. 문장은 [능동태](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice)로 작성하고 구체적으로 취할 행동과 해결책을 제시하세요.

불필요한 내용은 제외하고 방문자가 원하는 내용만 게시하세요.

[영국 정부 연구 조사](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)에서도 역시 다음과 같은 사실을 보여줍니다.

80%를 넘는 사람들이 분명한 언어로 작성된 문장을 선호했습니다.
> 글에서 다루는 이슈가 복잡할수록 그 선호도는 더욱 높아졌습니다(예: 97%가 라틴어인 'inter alia'보다 'among
> other things'를 선호함).
>
> 교육 수준이 높고 전문 지식이 많은 사람일수록
> 평이한 언어에 대한 선호도가 높았습니다.

즉, 박식한 기술 전문가들에게도 평이한 언어와 짧은 단어와 간단한 문장 구조를 사용하세요. 별다른 이유가 없는 경우에는, 목소리의 어조를 대화체로 유지하세요. 저널리즘의 고전적 원칙 중 하나는 똑똑한 11살 어린이에게 말하듯이 쓰라는 것입니다.

## 향후 수십억 사용자

휴대기기의 독자를 위해서는 삭감식(pared-down) 작성 방식이 특히 중요합니다. 이 방식은 뷰포트가 작은 저가 휴대폰용 콘텐츠를 생성할 때 매우 중요합니다. 이러한 휴대폰은 더 많은 스크롤이 필요하며 화질과 반응성이 떨어질 수도 있습니다.

향후 수십억 온라인 사용자의 대다수는 저가의 기기를 보유할 것입니다. 이들은 장황하고 지루한 콘텐츠나 자신의 모국어로 읽을 수 없는 콘텐츠를 탐색하는 데 자신의 데이터 예산을 쓰려고 하지 않을 것입니다. 텍스트를 다듬으세요. 짧은 문장, 최소한의 구두점, 5줄 이하의 단락, 한 줄의 표제를 사용하세요. 반응형 텍스트의 사용을 고려하세요(예: 더 작은 뷰포트에는 더 짧은 헤드라인 사용). 그러나 [단점을 고려하세요](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/).

텍스트를 최소화하는 접근방식은 또한 콘텐츠의 현지화와 세계화도 더 쉽게 해주며, 콘텐츠가 소셜 미디어에서 인용될 가능성도 더 높여줍니다.

결론:

* 단순하게 만드세요
* 불필요한 것을 줄이세요
* 요점을 전달하세요


## 불필요한 콘텐츠 제거

바이트 크기 측면에서, 웹페이지의 크기가 [점점 더 늘어나고 있습니다](http://httparchive.org/trends.php#bytesTotal&reqTotal).

[반응형 디자인 기법](/web/fundamentals/design-and-ux/responsive/)을 사용하면 더 작은 뷰포트에서 다양한 콘텐츠를 제공할 수 있지만, 처음부터 텍스트, 이미지 및 콘텐츠를 간소화하여 시작하는 것이 현명합니다.

> 웹 사용자들은 대개 액션 지향적으로, 책을 읽기 위해 상체를 뒤로 젖히는 것이 아니라 현재 질문에 대한 해답을 찾기 위해 '상체를 앞으로 기울입니다'.
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

스스로에게 물어보세요. 사람들이 내 사이트를 방문하여 무엇을 하고자 할까?

모든 페이지 요소들이 사용자의 목표를 달성하는 데 도움이 될까?

### 중복 페이지 요소 제거

[HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml)에 따르면, 평균 웹페이지의 경우 약 7만 개의 HTML 파일과 9개 이상의 요청으로 구성됩니다.

많은 유명 사이트들은 심지어 모바일에서도 페이지당 수천 개의 HTML 요소와 수천 개의 코드 줄을 사용합니다. 과도한 HTML 파일 크기가 [페이지 로드를 더 느리게 만들지 않을 수도 있지만](http://jsbin.com/zofavunapo/1/edit?html,js,output), 무거운 HTML 페이로드는 콘텐츠 팽창의 신호일 수 있습니다. html 파일이 더 클수록 요소나 텍스트 콘텐츠 또는 양쪽이 더 많아집니다.

HTML의 복잡도를 줄이면 페이지 크기도 줄어들고, 현지화 및 세계화에 도움이 될 수 있고, 반응형 디자인을 더 쉽게 계획하고 디버깅할 수 있게 될 것입니다. 더욱 효율적인 HTML 작성에 대한 자세한 내용은, [고성능 HTML](https://samdutton.wordpress.com/2015/04/02/high-performance-html/)을 참조하세요.

> 사용자가 여러분의 앱에서 원하는 것을 찾을 때까지의 단계 수가 늘어날수록 각 단계마다 20%의 사용자가 이탈할 것입니다.
>
>— [Gabor Cselle, Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

이 말은 콘텐츠에도 그대로 적용됩니다. 사용자가 원하는 것을 최대한 빨리 찾을 수 있게 하세요.

아무런 이유 없이 모바일 사용자에게서 콘텐츠를 숨기지 마세요. [콘텐츠 패리티](http://bradfrost.com/blog/mobile/content-parity/)를 목표로 하세요. 어떤 기능이 모바일 사용자에게 필요없을 것이라는 추측은 누군가에게는 틀릴 수도 있습니다. 리소스가 있다면, 다양한 뷰포트 크기에 맞는 동일한 콘텐츠의 대체 버전을 만드세요(콘텐츠가 우선순위가 높은 페이지 요소에만 해당하는 경우에도 적용됨).

콘텐츠 관리 및 워크플로를 고려하세요. 레거시 시스템이 레거시 콘텐츠를 생성하나요?

### 텍스트 단순화

웹이 모바일로 이동하면 작성 방식을 변경해야 합니다. 단순하게 만들고 불필요한 것을 줄이고 요점을 전달하세요.

### 중복 이미지 제거

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-images.png" alt="이미지 전송 크기와 이미지 요청 수가 점점 커지고 있음을 보여주는 HTTP Archive" />
    <figcaption><a href="http://httparchive.org/trends.php#bytesImg&reqImg">HTTP Archive 데이터</a>에 따르면 평균적인 웹페이지의 경우 이미지에 대해 54회의 요청이 이루어진다고 합니다.</figcaption>
  </figure>
</div>

이미지는 보기에 좋고, 재미있고 정보를 제공하지만, 또한 페이지의 실제 공간을 차지하고, 페이지 무게를 늘리고, 파일 요청 수를 증가시킵니다. [연결 상태가 악화되면 지연 시간도 악화되므로](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), 웹이 모바일로 이동하면 과도한 이미지 파일 요청으로 인해 문제가 늘어나게 됩니다.


<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="콘텐츠 유형별 페이지당 평균 바이트 크기를 보여주는 HTTP Archive 원형 차트(약 60%가 이미지)">
    <figcaption>이미지는 페이지 크기의 60% 이상을 차지합니다.</figcaption>
  </figure>
</div>

이미지는 전원도 소모합니다. 배터리를 가장 많이 소모하는 것이 화면이고 두 번째가 무선입니다. 이미지 요청이 많을수록, 무선 사용량이 늘어나고 배터리가 더 빨리 소모됩니다. 단순히 이미지를 렌더링만 해도 전원이 소모되며, 이것은 크기와 횟수에 비례합니다. Stanford 보고서 [Who Killed My Battery?](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)를 확인해 보세요.

가능하면 이미지를 제거하세요!

다음은 몇 가지 제안입니다.

* 이미지가 없거나 이미지를 적게 사용하는 디자인을 고려하세요. [텍스트만으로도 아름다울 수 있습니다](https://onepagelove.com/tag/text-only)! 스스로에게 물어보세요. '방문객이 내 사이트에서 원하는 것이 무엇일까? 그 과정에서 이미지가 도움이 될까?'
* 예전에는 표제와 기타 텍스트를 그래픽으로 저장하는 것이 일반적이었습니다. 이 접근방식은 뷰포트 크기의 변화에 잘 반응하지 않으며, 페이지 크기와 지연 시간을 증가시킵니다. 또한 텍스트를 그래픽으로 사용하면 검색 엔진에서 이 텍스트를 찾을 수 없으며, 스크린 리더와 기타 보조 기술로 이 텍스트에 액세스할 수 없습니다. 가능하면 '실제' 텍스트를 사용하세요. 웹 글꼴 및 CSS로 아름다운 서체를 만들 수 있습니다.
* 그라데이션, 그림자, 둥근 모서리 및 [배경 텍스처](http://lea.verou.me/css3patterns/){: .external }, [모든 최신 브라우저에 의해 지원되는](http://caniuse.com/#search=shadows) 기능에 이미지 대신 CSS를 사용하세요. 그러나 CSS가 이미지보다 더 나을 수 있지만, [처리 및 렌더링 페널티](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/)가 있을 수 있으며 특히 모바일에서는 심각하다는 사실에 유의하세요.
* 배경 이미지는 모바일에서 거의 효과가 없습니다. [미디어 쿼리를 사용](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/)하면 작은 뷰포트에서 배경 이미지를 피할 수 있습니다.
* 스플래시 화면 이미지를 피하세요.
* [UI 애니메이션에 CSS를 사용하세요](/web/fundamentals/design-and-ux/animations/).
* 문자 모양을 이해하세요. 이미지를 사용하는 대신, 필요한 경우 웹 글꼴과 함께 [유니코드 기호 및 아이콘](https://en.wikipedia.org/wiki/List_of_Unicode_characters)을 사용하세요.
* [아이콘 글꼴](http://weloveiconfonts.com/#zocial)을 고려하세요. 이 글꼴은 무한 확장이 가능한 벡터 그래픽이며, 전체 이미지 세트를 하나의 글꼴로 다운로드할 수 있습니다. (그러나 [이러한 문제](https://sarasoueidan.com/blog/icon-fonts-to-svg/)에 주의하세요.)
* `<canvas>` 요소를 사용하면 자바스크립트에서 선, 곡선, 텍스트 및 기타 이미지로부터 이미지를 빌드할 수 있습니다.
* [인라인 SVG 또는 데이터 URI 이미지](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/)는 페이지 크기를 줄이지는 않지만, 리소스 요청 수를 줄여서 지연 시간을 줄일 수 있습니다. 인라인 SVG에는 [모바일 및 데스크톱 브라우저에 대한 뛰어난 지원](http://caniuse.com/#feat=svg-html5)이 있으며, [최적화 도구](http://petercollingridge.appspot.com/svg-optimiser)로 SVG 크기를 상당히 줄일 수 있습니다. 마찬가지로, 데이터 URI도 [잘 지원됩니다](http://caniuse.com/datauri). 모두 CSS에서 인라인으로 포함될 수 있습니다.
* 애니메이션 GIF 대신 `<video>` 사용을 고려하세요. [동영상 요소는 모바일에서 모든 브라우저가 지원합니다](http://caniuse.com/video)(Opera Mini는 제외).

자세한 내용은 [이미지 최적화](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) 및 [이미지 제거 및 바꾸기](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images)를 참조하세요.


## 다양한 뷰포트 크기에 잘 어울리도록 콘텐츠 디자인 {: #viewport }

> '제품을 만드세요. 작은 화면을 위해 제품을 재구성하지 마세요. 뛰어난 모바일
> 제품은 만들어지는 것이지, 이식되는 것이 아닙니다.'
>
>— <a href="https://goo.gl/KBAXj0">Mobile Design and Development</a>, Brian Fling


뛰어난 디자이너는 '모바일에 최적화'하지 않으며 다양한 기기에서 작동하는 반응형 사이트를 구축하려고 합니다. 다양한 기기에서 성공적인 작동을 위해서는 텍스트와 기타 페이지 콘텐츠의 구조가 매우 중요합니다.

향후 수십억의 온라인 사용자 중 상당수는 뷰포트가 작은 저가의 기기를 사용할 것입니다. 저해상도의 3.5" 또는 4" 화면에서는 읽기가 어려울 수 있습니다.

다음은 두 휴대폰이 함께 있는 사진입니다.

![고사양 및 저가 스마트폰에서 블로그 게시물의 사진 비교 화면](imgs/devices-photo.jpg)

화면이 큰 경우에는, 텍스트가 작아도 읽기 쉽습니다.

화면이 작은 경우에는 브라우저가 레이아웃을 올바로 렌더링하지만, 확대하더라도 텍스트를 읽기가 어렵습니다. 화면이 흐리고 '컬러 캐스트' 현상(흰색이 흰색처럼 보이지 않음)이 발생하며 콘텐츠의 가독성이 떨어집니다.

### 모바일용 콘텐츠 디자인

다양한 뷰포트용으로 빌드하는 경우, 콘텐츠뿐 아니라 레이아웃 및 그래픽 디자인, 즉
[더미 콘텐츠가 아닌 실제 텍스트와 이미지가 있는 디자인](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website)도 고려하세요.

> '콘텐츠는 디자인보다 우선합니다. 콘텐츠가 없는 디자인은 디자인이 아니며 장식에 불과합니다.'
>
>— Jeffrey Zeldman

* [사용자는 F자 형태로 웹페이지를 읽는 경향이 있습니다](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/). 따라서 가장 중요한 콘텐츠를 맨 위에 놓으세요.
* 사용자는 목적을 가지고 여러분의 사이트를 방문합니다. 사용자의 목적이 무엇인지 스스로에게 물어보고 그 이외의 모든 것은 제거하세요. 시각적 장식과 텍스트 장식, 레거시 콘텐츠, 과도한 링크 및 기타 지저분한 것들은 과감히 제거하세요.
* 소셜 공유 아이콘에 주의하세요. 이런 아이콘은 레이아웃을 지저분하게 만들 수 있으며, 그 코드로 인해 페이지 로딩이 느려질 수 있습니다.
* 고정된 기기 크기가 아니라, 콘텐츠용 [반응형 레이아웃](/web/fundamentals/design-and-ux/responsive/)을 디자인하세요.

### 콘텐츠 테스트

Success: 무엇을 하든 간에 **테스트하세요**!

* Chrome DevTools 및 기타 [에뮬레이션 도구](/web/fundamentals/performance/poor-connectivity/)를 사용하여 작은 뷰포트에서 가독성을 확인하세요.
* [저대역폭 및 긴 지연 시간 조건에서 콘텐츠를 테스트하세요](/web/fundamentals/performance/poor-connectivity/). 다양한 연결 시나리오에서 콘텐츠를 사용해 보세요.
* 저가 휴대폰에서 콘텐츠를 읽고 상호작용을 체험해 보세요.
* 여러분의 앱과 사이트를 친구와 동료들에게 사용해보도록 요청하세요.
* 간단한 기기 테스트 실험실을 만들어 보세요. Google Mini Mobile Device Lab의 [GitHub 저장소](https://github.com/GoogleChrome/MiniMobileDeviceLab)에서는 자신만의 실험실을 만드는 방법에 대해 소개합니다. [OpenSTF](https://github.com/openstf/stf)는 여러 대의 Android 기기에서 웹사이트를 테스트하기 위한 간단한 웹 애플리케이션입니다.

다음은 운영 중인 OpenSTF입니다.

[![OpenSTF 인터페이스](imgs/stf.png)](https://github.com/openstf/stf)

콘텐츠를 소비하고 정보를 얻기 위해 점점 더 많은 휴대기기가 사용되고 있으며 단순히 통신, 게임 및 미디어만을 위한 기기가 아닙니다.

따라서 기기 간 레이아웃, 인터페이스 및 상호작용 디자인을 고려할 때 다양한 뷰포트에서 올바로 작동하도록 콘텐츠를 계획하고 콘텐츠의 우선순위를 지정하는 것이 점점 더 중요해지고 있습니다.


## 데이터 비용 이해

웹페이지가 점점 더 커지고 있습니다. <br><br><a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a>에 따르면, <a href="http://httparchive.org/about.php#listofurls">상위 100만개 사이트</a>의 평균 페이지 크기가 이제 2MB를 넘습니다.


사용자들은 느리거나 비싸다고 생각하는 사이트나 앱을 회피하므로, 페이지와 앱 구성 요소의 로딩 비용을 이해하는 것이 매우 중요합니다.

페이지 크기를 줄이면 수익도 높일 수 있습니다. [YouTube의 Chris Zacharias](http://blog.chriszacharias.com/page-weight-matters)에 따르면, 시청 페이지 크기를 1.2MB에서 250KB로 줄이자 다음과 같은 현상이 발생했습니다.

> 이전에는 YouTube를 사용할 수 없었던 수많은 사람들이 갑자기 사용할 수 있게 되었습니다.

즉, 페이지 크기를 줄이면 **완전히 새로운 시장을 개척할 수 있습니다**.

### 페이지 크기 계산 {: #weight }

페이지 크기를 계산하기 위한 여러 가지 도구가 있습니다. Chrome DevTools Network 패널은 모든 리소스의 전체 바이트 크기를 보여주며, 개별 자산 유형의 크기를 알아낼 수 있습니다. 또한 어떤 항목이 브라우저 캐시로부터 검색되었는지 확인할 수도 있습니다.

![리소스 크기를 보여주는 Chrome DevTools Network 패널](imgs/chrome-dev-tools.png)

Firefox 및 기타 브라우저도 유사한 도구를 제공합니다.

[WebPagetest](http://webpagetest.org)에서는 최초 페이지 로드와 이후의 로드를 테스트하는 기능을 제공합니다. [스크립트](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)(예: 사이트에 로그인)를 사용하거나 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis)를 사용하여 테스트를 자동화할 수 있습니다. 다음 예시는([developers.google.com/web](/web/) 로드) 캐싱이 성공했고 후속 페이지 로드에서 추가 리소스가 필요없음을 보여줍니다.

![최초 및 반복 페이지 방문 시의 전체 바이트 크기를 보여주는 WebPagetest 결과](imgs/webpagetest-first-and-repeat.png)

WebPagetest는 또한 MIME 유형별로 크기와 요청을 분류해 줍니다.

![MIME 유형별로 요청과 바이트를 보여주는 WebPagetest 원형 차트](imgs/webpagetest-requests-and-bytes-pie-charts.png)

### 페이지 비용 계산

많은 사용자에게 데이터는 단순히 바이트와 성능에만 영향을 미치는 것이 아니라 금전적 비용도 발생시킵니다.

[What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } 사이트에서 사이트 로드에 들어가는 실제 비용을 산출할 수 있습니다. 아래 히스토그램은 [amazon.com](https://www.amazon.com/)을 로드하는 데 들어가는 비용을 보여줍니다(선불 데이터 요금제 사용).

![amazon.com 홈페이지 로드 시 12개국의 추정 데이터 비용](imgs/what-does-my-site-cost.png)

이 경우 수입에 대한 상대적 구매능력은 고려하지 않습니다. [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/)의 데이터는 데이터의 비용을 보여줍니다.

<table>
  <tr>
    <td></td>
    <td><strong>500MB 데이터 요금제<br>비용(USD)</strong></td>
    <td><strong>시간당 최저<br>임금(USD)</strong></td>
    <td><strong>500MB 데이터 요금제를<br>지불하기 위한 노동 시간</strong></td>
  </tr>
  <tr>
    <td>인도</td>
    <td>$3.38</td>
    <td>$0.20</td>
    <td>17시간</td>
  </tr>
  <tr>
    <td>인도네시아</td>
    <td>$2.39</td>
    <td>$0.43</td>
    <td>6시간</td>
  </tr>
  <tr>
    <td>브라질</td>
    <td>$13.77</td>
    <td>$1.04</td>
    <td>13시간</td>
  </tr>
</table>


페이지 크기는 이머징 마켓만의 문제는 아닙니다. 많은 국가의 사람들이 데이터 제한 모바일 요금제를 사용하며, 여러분의 사이트나 앱이 느리거나 비싸다고 생각되면 회피할 것입니다. 심지어 '무제한' 셀룰러 및 WiFi 데이터 요금제에서도 일반적으로 데이터 한도가 있으며 이 한도를 넘어가면 차단되거나 조정됩니다.

결론: 페이지 크기는 성능과 금전적 비용에 영향을 미칩니다. [콘텐츠 효율성 최적화](/web/fundamentals/performance/optimizing-content-efficiency/)에서는 비용 절감 방법을 보여줍니다.


{# wf_devsite_translation #}
