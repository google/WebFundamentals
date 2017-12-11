project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '뷰포트 메타 태그가 있는 HTML' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 뷰포트 메타 태그가 있는 HTML {: .page-title }

## 감사가 중요한 이유 {: #why }

뷰포트 메타 태그가 없으면 휴대기기는 일반적 데스크톱 화면 너비로
페이지를 렌더링한 다음 모바일 화면에 맞게 페이지 크기를 조정합니다. 뷰포트를
설정하면 뷰포트의 너비와 크기를 제어할 수 있습니다.
자세한 내용은 다음 링크를 참조하세요.

* [뷰포트 구성](/speed/docs/insights/ConfigureViewport)
* [뷰포트 설정](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)

## 감사를 통과하는 방법 {: #how }

HTML의 `<head>`에 뷰포트 `<meta>` 태그를 추가합니다.

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

`width=device-width` 키-값 쌍은 뷰포트의 너비를 기기의 너비로 설정합니다.
 `initial-scale=1` 키-값 쌍은 페이지를 방문했을 때
처음 확대/축소 수준을 설정합니다.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 문서의 `<head>`에
`<meta name="viewport">` 태그가 있는지 검사합니다. 또한, 노드에 `content` 속성이 있고
이 속성 값에 `width=` 텍스트가 포함되는지 검사합니다. 그러나
`width`가 `device-width`와 같은지는 검사하지 않습니다. 
`initial-scale` 키-값 쌍도 검사하지 않습니다.


{# wf_devsite_translation #}
