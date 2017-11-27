project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ARIA 레이블을 사용하여 액세스 가능한 요소 설명 생성


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# ARIA 레이블과 관계 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## 레이블

ARIA는 요소에 레이블과 설명을 추가하기 위한 여러 가지 메커니즘을 제공합니다.
사실, ARIA는 액세스 가능한 도움말이나 설명 텍스트를 추가할 수 있는 유일한 방법입니다. ARIA가
액세스 가능한 레이블을 생성하기 위해 사용하는 속성을 살펴봅시다.

### aria-label

`aria-label`을 사용하여 액세스 가능한 레이블로 사용할 문자열을 지정할 수 있습니다.
aria-label은 `label` 요소처럼 다른 네이티브 레이블링 메커니즘을 모두 무시합니다.
예를 들어, `button`에 텍스트 콘텐츠와 `aria-label`이 모두 있는 경우
`aria-label` 값만 사용됩니다.

텍스트 대신 그래픽을 사용하는 버튼과 같이, 요소의 목적을 시각적으로 표시할 때 `aria-label` 속성을
사용할 수
있습니다. 하지만 이미지만 사용하여 목적을 표시하는 버튼과 같은
시각적 표시를 인식할 수 없는 사용자를 위해 다른 방법으로
요소의 목적을 명확히 표시해야 합니다.

![aria-label을 사용하여 이미지로만 표시된 버튼 식별](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby`를 사용하면 어떤 요소의 레이블로서 DOM에 있는 다른 요소의 ID를
지정할 수 있습니다.

![aria-labelledby를 사용하여 라디오 그룹 식별](imgs/aria-labelledby.jpg)

이는 마치 몇 가지 키의 차이점이 있는 `label` 요소를 사용하는 것과 같습니다.

 1. `aria-labelledby`는 레이블 지정 가능한 요소뿐 아니라 어떤 요소에서든 사용할 수 있습니다.
 1. `label` 요소는 자신이 레이블을 지정하는 대상을 참조하지만
    `aria-labelledby`의 경우에는 관계가 뒤바뀝니다. 즉, 레이블을 지정하는 대상이
    레이블을 지정하는 주체를 참조합니다.
 1. 한 레이블 요소만 레이블 지정 가능한 요소와 연결할 수 있지만,
    `aria-labelledby`는 IDREF 목록을 선택하여 여러 요소에서 레이블을
    작성할 수 있습니다. 레이블은 IDREF가 지정되는 순서대로
    연결됩니다.
 1. `aria-labelledby`를 사용하여 숨겨져 있거나 접근성 트리에 없는 요소를
    참조할 수 있습니다. 예를 들어, 레이블을 지정하려는
    요소 옆에 숨겨진 `span`을 추가하고 `aria-labelledby`로 참조할 수
    있습니다.
 1. 하지만 ARIA는 접근성 트리에만 영향을 주므로 `aria-labelledby`를
    사용하면 `label` 요소를 사용할 때처럼 친숙한 레이블 클릭 동작을 구현할 수는
    없습니다.

중요한 점은, `aria-labelledby`가 한 요소에 대한 다른 **모든** 이름 소스를 재정의한다는
점입니다. 예를 들어, 어떤 요소에 `aria-labelledby`와
`aria-label`이 모두 있거나 `aria-labelledby`와 네이티브 HTML `label`이 있는 경우에는
`aria-labelledby` 레이블이 항상 우선합니다.

## 관계

`aria-labelledby`는 *관계 속성*의 예입니다. 관계
속성은 DOM 관계와는 무관하게 페이지에 있는 요소들 사이의 의미 체계 관계를
생성합니다. `aria-labelledby`의 경우 의미 체계
관계는 '이 요소가 저 요소에 레이블을 지정한다'는 것입니다.

ARIA 사양에는 [8가지 관계
속성](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }이 나와 있습니다.
그중 6가지인 `aria-activedescendant`, `aria-controls`, `aria-describedby`,
`aria-labelledby`, `aria-owns`는 하나 또는 그 이상의 요소를 참조하여
페이지에 있는 요소들 사이에 새로운 링크를 생성합니다. 각각의 경우에 있어
그 링크의 의미와 사용자에게 표시되는 방식이 차이점입니다.

### aria-owns

`aria-owns`는 가장 널리 사용되는 ARIA 관계 중 하나입니다. 이 속성을
사용하여 DOM에 있는 별개의
요소를 현재 요소의 하위 요소로 처리해야 한다고 보조 기술에 알려주거나
기존 하위 요소를 다른 순서로 재정렬할 수 있습니다. 예를 들어, 시각적으로는 어떤 팝업 하위 메뉴가
상위 메뉴 근처에 배치되어 있지만 시각적 표시에 영향을 주므로
DOM 상위 항목의 하위 항목일 수는 없는 경우에는
`aria-owns`를 사용하여 하위 메뉴를 상위 메뉴의 하위 메뉴로 스크린 리더에 표시할 수
있습니다.

![aria-owns를 사용하여 메뉴와 하위 메뉴 사이의 관계 설정](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant`는 관련된 역할을 수행합니다. 페이지의 활성 요소는
포커스가 있는 요소인 것과 마찬가지로, 요소의 활성 하위 항목을 설정하여
상위 항목에 실제로 포커스가 있을 때 그 요소를 사용자에게
포커스된 요소로 표시해야 함을 보조 기술에 알려줄 수 있습니다. 예를 들어,
목록 상자에서 목록 상자 컨테이너에 페이지 포커스를 남겨두고 싶지만
`aria-activedescendant` 속성은 현재 선택한 목록 항목에 맞춰
계속 업데이트된 상태로 유지할 수도 있습니다. 이를 통해 보조 기술 쪽에는 현재 선택한 항목이 마치 포커스된
항목인 것처럼 나타나게 할 수 있습니다.

![aria-activedescendant를 사용하여 목록 상자에서의 관계 설정](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby`는
`aria-labelledby`가 레이블을 제공하는 것과 똑같은 방식으로 액세스 가능한 설명을 제공합니다. `aria-labelledby`와 마찬가지로, `aria-describedby`는
DOM에서 숨겨지거나
보조 기술에서 숨겨졌는지에 상관없이 다른 방법으로는 보이지 않는 요소를 참조할 수 있습니다. 이는
보조 기술 사용자에게만 적용되든 모든 사용자에게 적용되든 상관없이, 사용자에게 추가적인 설명문이 필요할 때 유용한
기법입니다.

일반적인 예로, 최소 비밀번호 요건을 설명하는 텍스트가
함께 제공되는 비밀번호 입력란이 있습니다. 이런 설명은
레이블과는 달리 사용자에게 표시될 수도, 표시되지 않을 수도 있습니다.
이런 설명에 액세스할지 선택권을 부여하거나, 다른 모든 정보 다음에 나오도록 하거나,
다른 내용이 먼저 그 자리에 표시되도록 할 수도 있습니다. 예를 들어, 사용자가 정보를 입력하면
입력 정보가 다시 에코되어 요소의 설명을
가로막을 수 있습니다. 따라서 설명은 필수 정보가 아니라 보충 정보를 전달하기에
훌륭한 방법이며, 요소의 역할과 같이 더욱 중요한 정보를 전달하는 데
방해되지 않습니다.

![aria-describedby를 사용하여 비밀번호 입력란과의 관계 설정](imgs/aria-describedby.jpg)

### aria-posinset 및 aria-setsize

나머지 관계 속성은 앞서 설명한 속성과는 약간 다르며 함께 사용합니다.
`aria-posinset`("position in set")와 `aria-setsize`("size of set")는
목록과 같이 집합을 이루고 있는 형제 요소 간의 관계를 정의하는 속성입니다.

DOM에 있는 요소로는 집합의 크기를 결정할 수 없을 때(예:
지연 렌더링을 사용하여 DOM에 있는 큰 목록을 모두 한 번에 포함하지 않도록
할 때) `aria-setsize`는 실제 집합 크기를 지정할 수 있고
`aria-posinset`는 집합에서 요소의 위치를 지정할 수 있습니다. 예를 들어,
요소 개수가 1,000개인 집합의 경우 DOM에서 특정 요소가 맨 처음에 나타나더라도
`aria-posinset`가 857이라고 하고
동적 HTML 기술을 사용해 사용자가 필요할 때 전체 목록을 탐색하도록
할 수 있습니다.

![aria-posinset와 aria-setsize를 사용하여 목록에서의 관계 설정](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
