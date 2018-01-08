project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 사용자가 휴대기기를 사용할 때 직면할 네트워크 조건은 간과하기 쉬운 부분입니다. DevTools를 사용하여 여러 가지 네트워크 조건을 에뮬레이트하세요. 각종 로드 시간 문제를 해결하여 사용자 만족을 이끌어낼 수 있습니다.

{# wf_updated_on: 2015-07-20 #}
{# wf_published_on: 2015-04-13 #}

# 다양한 네트워크 조건하에서 성능 최적화 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

사용자가 휴대기기를 사용할 때 직면할 네트워크 조건은 간과하기 쉬운 부분입니다. DevTools를 사용하여 여러 가지 네트워크 조건을 에뮬레이트하세요. 각종 로드 시간 문제를 해결하여 사용자 만족을 이끌어낼 수 있습니다.


### TL;DR {: .hide-from-toc }
- Chrome DevTools 네트워크 에뮬레이터를 사용하여 다른 탭으로의 트래픽에 영향을 주지 않고 사이트 성능을 평가할 수 있습니다.
- 각자의 대상 소비자 네트워크 조건에 맞는 사용자설정 프로필을 사용할 수 있습니다.


## 네트워크 연결 에뮬레이트

네트워크 조정을 통해 Edge, 3G는 물론 오프라인을 포함한 다양한 네트워크 연결에 대해 사이트를 테스트할 수 있습니다. 
이렇게 하면 최대 다운로드 및 업로드 처리 속도(데이터 전송 속도)가 제한됩니다. 
지연 시간을 조작하면 연결 왕복 시간(RTT)에 최소 지연이 강제 적용됩니다.

네트워크 조정은 Network 패널을 통해 활성화됩니다.
드롭다운 메뉴에서 연결을 선택하여 네트워크 제한과 지연 시간 조작을 적용합니다.

![네트워크 제한 선택](imgs/throttle-selection.png)

**팁**: 네트워크 제한은 
[Network conditions](#network-conditions) 창을 통해서도 설정할 수 있습니다.

제한(Throttle)이 활성화되면 패널 표시기에 경고 아이콘이 표시됩니다.
이는 개발자가 다른 패널에 있을 때 제한이 활성화되었다고 알려주기 위한 것입니다.

![경고 표시기가 있는 네트워크 패널 선택기](imgs/throttling-enabled.png)

## 사용자설정 제한

DevTools는 기본 조건의 완벽한 기반을 제공합니다.
대상 사용자의 기본 조건에 맞추려면 사용자설정 조건을 추가해야 하는 경우도 있습니다.

조건을 추가하려면 드롭다운 메뉴를 열어 조건을 적용합니다.
**custom** 헤더 아래에서 **Add...** 옵션을 찾아 선택합니다.
그러면 'Throttling' 탭이 있는 DevTools 설정 대화상자가 열립니다.

![제한 설정 색인](imgs/throttle-index.png)

먼저, **Add custom profile** 버튼을 클릭합니다.
그러면 프로필 조건을 제공할 수 있는 인라인 양식이 열립니다.
양식을 정확하게 작성한 다음 요구사항에 부합하는 조건이 생성되면 **Add** 버튼을 누릅니다.

![제한 설정 사용자설정 제한 추가](imgs/add-custom-throttle.png)

기존 사용자설정 프로필을 수정하려면 입력 항목 위로 마우스를 가져가면 됩니다.
마우스를 가져가면 해당 입력 항목 옆에 **Edit** 및 **Delete** 아이콘이 표시됩니다.

![제한 설정 사용자설정 입력 항목 수정](imgs/hover-to-modify-custom-throttle.png)

이제 설정 대화상자를 닫아도 됩니다.
새 사용자설정 프로필이 **custom** 헤더 아래 표시되어 조건을 선택할 수 있습니다.

## Network conditions 창 열기 {:#network-conditions}

다른 DevTools 패널이
**Network conditions** 창과 함께 열려 있는 동안 네트워크 기능에 액세스할 수 있습니다. 

![Network conditions 창](imgs/network-drawer.png)

DevTools 기본 메뉴에서 창에 액세스합니다(**기본 메뉴** > **More Tools** >
**Network Conditions**).

![Network Conditions 창 열기](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
