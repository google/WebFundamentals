project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '스크립트를 사용할 수 없을 때 페이지에 일부 콘텐츠 포함' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# 스크립트를 사용할 수 없을 때 페이지에 일부 콘텐츠 포함 {: .page-title }

## 감사가 중요한 이유 {: #why }

[점진적 개선](https://en.wikipedia.org/wiki/Progressive_enhancement)은
웹 개발 전략으로, 사이트를 최대한 많은 사람이 액세스할 수 있게
해줍니다. 점진적 개선의 가장 일반적인 정의는
다음과 같습니다.

기본 콘텐츠와 페이지 기능은
가장 기본적인 웹 기술만 활용하여 모든 브라우징 환경에서
페이지를 사용할 수 있어야 합니다. CSS를 사용한 정교한 스타일링이나 자바스크립트를 대화형으로 사용하는 등의 향상된 경험은
이러한 기술을 지원하는 브라우저 위에 레이어링할 수 있습니다.
 그러나 기본 콘텐츠와
페이지 기능은 CSS나 자바스크립트에 의존하지 말아야 합니다.

## 감사를 통과하는 방법 {: #how }

점진적 개선은 방대하고 논란의 여지가 있는 주제입니다. 어떤 사람은
점진적 개선 전략을 준수하기 위해 기본 콘텐츠와 페이지 기능은 HTML만 사용하도록
페이지를 레이어링해야 한다고 주장합니다. 이러한 접근방식에 대한 자세한 내용은 
[점진적 개선: 정의와 사용 방법](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)을
참조하세요.

어떤 사람은 엄격한 접근방식은 실행이 불가능하거나 최신 대규모 웹 애플리케이션에는 불필요하다고 생각하고
`<head>` 문서에서
완전히 중요한 페이지 스타일에만 인라인 주요 경로 CSS를 사용할 것을 제안합니다.
이 접근법에 대한 자세한 내용은 [주요 렌더링 경로](/web/fundamentals/performance/critical-rendering-path/)를 참조하세요.

이러한 내용을 고려하여 이 Lighthouse 감사는
자바스크립트를 비활성화했을 때 페이지가 비어 있지 않은지만 확인하는 단순한 검사를 수행합니다. 앱이
얼마나 엄격하게 점진적 개선을 준수할 것인지는 논의 중이지만
자바스크립트를 비활성화했을 때 모든 페이지가 적어도 *일부* 정보는 표시해야 한다는 것이 중론입니다.
이 페이지를 사용하려면 자바스크립트가 필요하다고 사용자에게 알리는 콘텐츠라도
있어야 합니다.

자바스크립트에 완전히 의존해야 하는 페이지의 경우
[`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
요소를 사용하여 이 페이지를 사용하려면 자바스크립트가 필요하다는 것을 사용자에게 알릴 수 있습니다. 이 방법은
빈 페이지로 두는 것보다는 낫습니다. 빈 페이지가 있으면 사용자는 페이지나 브라우저, 컴퓨터에 문제가 있다고
생각할 수 있기
때문입니다.

자바스크립트를 비활성화했을 때 사이트가 어떤 모습이고, 어떻게 실행되는지 확인하려면
Chrome DevTools의 [
자바스크립트 비활성화](/web/tools/chrome-devtools/settings#disable-js) 기능을 사용하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지에서 자바스크립트를 비활성화한 다음 페이지 HTML을 검사합니다. HTML이 비어 있으면
감사를 통과하지 못합니다. HTML이 비어 있지 않으면 감사를 통과합니다.



{# wf_devsite_translation #}
