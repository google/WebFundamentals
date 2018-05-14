project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Background and Foreground Colors Have Sufficient Contrast Ratio" Lighthouse audit.

{# wf_updated_on: 2017-02-04 #}
{# wf_published_on: 2017-01-20 #}

# 전경색과 배경색은 충분한 대비를 가지고 있어야 한다 {: .page-title }

## 왜 이 검사가 중요한가 {: #why }

시력이 약한 일부 사용자는 대비를 정확하게 감지하지 못합니다.
아주 밝거나 아주 어두운 많은 부분을 보지 못합니다.
모든 것이 똑같은 밝기로 보입니다.
텍스트가 명암비가 높지 않은 경우, 사용자는 말 그대로 전혀 보지 못합니다.

## 어떻게 이 검사를 통과하는가 {: #how }

충분한 대비를 가지지 않는 각 요소를 찾아서 수정하려면 다음을 따르세요:

1. [ChromeLens][CL] 설치.

1. DevTools 실행.

1. **ChromeLens** 탭 클릭.

1. **Run Accessibility Checks** 클릭. ChromeLens에서 테스트에 실패한 각 요소에 외곽선을 보여줍니다.

1. 외곽선이 생긴 요소에 마우스를 갖다대면 충분한 대비를 가지지 않은 요소를 찾습니다.

     <figure>
       <img src="images/chromelens-contrast-ratio.png"
         alt="ChromeLens, after running accessibility checks. An element is
         being hovered over in order to view its issues."
       <figcaption>
         <b>Figure 1</b>: 접근성 체크 실행 후 ChromeLens. 
         마우스를 갖다댄 요소의 이슈를 볼 수 있습니다.
       </figcaption>
     </figure>

1. 테스트를 실패한 요소의 전경색이나 배경색을 조정하여 최소 권장비율인 4.5대 1의 대비를 유지하십시오.
   비율을 게산하려면[contrast ratio][CR]를 참고하세요.

[CL]: https://chrome.google.com/webstore/detail/chromelens/idikgljglpfilbhaboonnpnnincjhjkd
[CR]: http://leaverou.github.io/contrast-ratio/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

이 검사는 aXe 접근성 엔진에 의해 제공됩니다.
더 자세한 정보는 [텍스트 요소는 전경색과 배경색 사이에 충분한 대비를 가져야한다][axe]를 참고하세요.

[axe]: https://dequeuniversity.com/rules/axe/1.1/color-contrast
