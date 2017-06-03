project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 주요 렌더링 경로를 최적화하는 것은 현재 사용자 작업과 관련된 콘텐츠 표시의 우선순위를 지정하는 것을 말합니다.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# 주요 렌더링 경로 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


_주요 렌더링 경로 최적화_ 란 현재 사용자 작업과 관련된 콘텐츠 표시의
우선순위를 지정하는 것을 말합니다.

빠른 웹 환경을 제공하려면 브라우저가 많은 작업을 수행해야 합니다. 이러한 작업
대부분은 웹 개발자에게 숨겨져 있습니다. 즉, 개발자가 마크업을 작성하면 그저 멋진
페이지가 화면에 표시될 뿐이죠. 그렇다면 브라우저가
HTML, CSS 및 자바스크립트를 사용하여 화면에 렌더링된 픽셀로 변환하는 과정은 정확히 어떻게 될까요?

성능을 최적화하려면 HTML, CSS 및 자바스크립트 바이트를 수신한 후
렌더링된 픽셀로 변환하기 위해 필요한 처리까지, 그 사이에 포함된 중간 단계에서
어떠한 일이 일어나는지를 파악하기만 하면 됩니다. 이러한 단계가 바로
**주요 렌더링 경로**입니다.

<img src="images/progressive-rendering.png"  alt="프로그레시브 페이지 렌더링">

주요 렌더링 경로를 최적화하면 최초 페이지 렌더링에 걸리는 시간을
상당히 단축시킬 수 있습니다. 또한, 주요
렌더링 경로에 대한 이해를 토대로 뛰어난 성능의 대화형 애플리케이션을
빌드할 수도 있습니다. 대화형 업데이트 프로세스도 이와 동일합니다. 연속 루프에서 실행되며 이상적인 속도는 초당 60프레임입니다. 그러나 먼저 브라우저에서 간단한 페이지를 표시하는 방법을 살펴봅시다.

<a href="constructing-the-object-model" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Constructing the Object Model">
  <button>다음 차례: 객체 모델 생성</button>
</a>

{% include "web/_shared/udacity/ud884.html" %}


{# wf_devsite_translation #}
