project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 기본 DOM 순서의 중요성


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# DOM 순서가 중요 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



네이티브 요소는 DOM에서의 위치를 기준으로 탭 순서에 자동으로
삽입되기 때문에 네이티브 요소를 직접 사용해보면 포커스 동작을
확실히 이해할 수 있습니다.

예를 들어, DOM에 차례대로 3개의 버튼 요소가 있다고
가정합시다. `Tab`을 누르면 각 버튼으로 포커스가 순서대로 이동합니다. 아래의 코드 블록을
클릭해 포커스 탐색 시작점을 이동한 다음 `Tab` 키를 눌러 포커스를 버튼 순서대로
이동합니다.

    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

하지만 중요한 점은, CSS를 사용하면 DOM에서 한 가지 순서로
배치할 수 있지만 화면 상에는 순서가 다르게 나타난다는 사실입니다. 예를
들어, `float` 같은 CSS 속성을 사용하여 한 버튼을 오른쪽으로 이동하면
버튼이 화면 상에서 다른 순서로 나타납니다. 하지만 DOM에서는 순서가
동일하게 유지되므로 탭 순서도 그대로 유지됩니다. 사용자가 페이지를 탭 이동하면
버튼의 포커스가 직관적이지 않은 순서로 이동합니다. 아래의 코드 블록을
클릭해 포커스 탐색 시작점을 이동한 다음 `Tab` 키를 눌러 포커스를 버튼
순서대로 이동합니다.

    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

CSS를 사용해 화면에서 요소의 시각적 위치를 바꿀 때는 주의하세요.
위치를 바꾸면 탭 순서가 무작위로 달라진 것처럼 보일 수 있어,
키보드로 버튼을 선택하는 사용자에게 혼동을 줄 수 있기 때문입니다. 따라서
[섹션 1.3.2](http://webaim.org/standards/wcag/checklist#sc1.3.2){: .external }
의 Web AIM 검사 목록에는 읽기 순서와 탐색 순서는 코드 순서로 정해진 바와 같이 논리적이고
직관적이어야 한다고 되어 있습니다.

실수로 탭 순서를 잘못 배치하지 않았는지 확인하는 차원에서,
가끔 페이지를 탭 이동하면서 확인해 보세요. 그다지 어렵지도 않은 일이니
습관적으로 해보는 것이 좋습니다.

## 화면 밖 콘텐츠
보조 탐색 메뉴처럼, 현재 표시되지는 않지만 DOM에 계속 두어야 할 콘텐츠가 있다면
어떻게 해야 할까요? 이처럼 화면 밖에 있는데 포커스 대상이 되는
요소가 있을 때는 사용자가 페이지를 탭 이동하는 과정에서
마치 포커스가 사라졌다가 다시 나타나는 것처럼 보일 수 있습니다. 이는 분명히
바람직하지 못한 상황입니다. 패널이 화면 밖에 있을 때는 포커스를 받지 못하게 하고
사용자가 패널과 상호 작용할 수 있을 때만 포커스를 받을 수 있도록 하는 것이
이상적입니다.

![화면 밖의 슬라이드 인 패널이 포커스를 앗아갈 수 있음](imgs/slide-in-panel.png)

포커스가 어디로 사라져버렸는지 알아내느라 시간을 허비할 때도 가끔
있습니다. 이럴 때는 콘솔에서 `document.activeElement`를 사용해 현재 포커스가 맞춰진 요소를
찾아낼 수 있습니다.

포커스를 받는 화면 밖 요소가 무엇인지 알아내면 이를
`display: none` 또는 `visibility: hidden`으로 설정했다가 `display:
block` 또는 `visibility: visible`로 다시 설정한 후 사용자에게 표시할 수 있습니다.

![아무것도 표시하지 않도록 설정된 슬라이드 인 패널](imgs/slide-in-panel2.png)

![블록을 표시하도록 설정된 슬라이드 인 패널](imgs/slide-in-panel3.png)

개발자는 사이트를 게시하기 전에 각 페이지를 탭 이동하면서
탭 순서가 사라지지는 않는지, 논리적 순서를 벗어나 이동하지는 않는지 살펴보는 것이
좋습니다. 이런 문제가 있으면
`display: none` 또는 `visibility: hidden`으로 화면 밖 콘텐츠를 적절히 숨기거나
요소가 논리적 순서대로 표시되도록 DOM에서 요소의 물리적 위치를 다시
배열하세요.


{# wf_devsite_translation #}
