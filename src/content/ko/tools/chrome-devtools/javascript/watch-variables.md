project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools를 사용하면 애플리케이션 전체에 걸쳐 여러 변수를 쉽게 확인할 수 있습니다.

{# wf_published_on: 2016-02-11 #}
{# wf_updated_on: 2016-02-11 #}

# 소스에서 변수 조사 {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Chrome DevTools를 사용하면 애플리케이션 전체에 걸쳐 여러 변수를 쉽게 확인할 수 있습니다.
소스 내에서 변수를 조사하면 콘솔에서 벗어나 코드를 개선하는 데 집중할 수 있습니다.

Sources 창은 애플리케이션에서 변수를 조사하는 기능을 제공합니다.
이 기능은 디버거 사이드바의 조사 섹션에 있습니다.
이 기능을 활용하면 콘솔에 객체를 반복적으로 로깅할 필요가 없습니다.

![디버거의 Watch 섹션](imgs/sources-watch-variables-location.png)

## 변수 추가

조사 목록에 변수를 추가하려면 섹션 제목 오른쪽의 추가 아이콘을 사용합니다.
그러면 조사할 변수 이름을 입력하는 인라인 입력란이 열립니다.
입력하고 나서 <kbd>Enter</kbd> 키를 눌러서 목록에 추가합니다.

![조사 목록에 추가 버튼](imgs/add-variable-to-watch.png)

변수가 추가되면 감시자가 해당 변수의 현재 값을 보여줍니다.
변수가 설정되지 않았거나 변수를 찾을 수 없는 경우 해당 값에 대해 <samp>&lt;Not Available&gt;</samp>이 표시됩니다.

![조사 목록에 정의되지 않은 변수](imgs/undefined-variable-in-watch.png)

## 변수 업데이트

애플리케이션이 계속 작동함에 따라 변수 값이 변경될 수 있습니다.
단계적으로 실행하는 경우를 제외하고 조사 목록은 변수를 실시간으로 보여주지 않습니다.
[중단점](add-breakpoints)을 사용하여 단계적으로 실행하는 경우, 조사된 값이 자동으로 업데이트됩니다.
목록에 있는 변수들을 수동으로 다시 확인하려면 섹션 제목 오른쪽에 있는 새로고침 버튼을 누릅니다.

![조사 변수 새로고침 버튼](imgs/refresh-variables-being-watched.png)

새로고침을 요청하면 현재 애플리케이션 상태를 다시 확인합니다.
조사된 항목이 모두 현재 값으로 업데이트됩니다.

![업데이트된 조사 대상 변수](imgs/updated-variable-being-watched.png)

## 변수 삭제

조사 대상 항목을 최소한으로 유지하여 작업 속도를 높이기 위해 조사 목록에서 변수를 삭제해야 하는 경우가 있을 수 있습니다.
이렇게 하려면 변수를 마우스로 가리킨 다음 오른쪽에 나타나는 삭제 아이콘을 클릭합니다.

![변수를 마우스로 가리켜 조사 목록에서 삭제](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
