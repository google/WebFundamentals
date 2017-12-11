project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 리소스를 프레임, 도메인, 유형 또는 기타 기준에 따라 구성합니다.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# 리소스 검사 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

리소스를 프레임, 도메인, 유형 또는 기타
기준에 따라 구성합니다.


### TL;DR {: .hide-from-toc }
- <strong>Application</strong> 패널의 <strong>Frames</strong> 창을 사용하면 리소스를 프레임별로 구성할 수 있습니다.
- 또한 <strong>group by folder</strong> 선택 항목을 비활성화하여 <strong>Sources</strong> 패널에서 리소스를 프레임별로 볼 수도 있습니다.
- 리소스를 도메인 및 폴더별로 보려면 <strong>Sources</strong> 패널을 사용합니다.
- <strong>Network</strong> 패널에서 리소스를 이름 및 기타 기준으로 필터링합니다.


## 리소스를 프레임별로 구성 {:#frames}

**Application** 패널의 **Frames** 창을 사용하면 페이지 리소스를 프레임별로
구성하여 표시할 수 있습니다.

![프레임 세부정보][frames]

* 최상위 단계(위의 스크린샷에서 `top`)는 기본 문서입니다.
* 그 아래는(예: 위의 스크린샷에서 `widget2`) 기본 문서의 
하위 프레임입니다. 이러한 하위 프레임 중 하나를 확장하면 해당 프레임의 출처인 
리소스를 볼 수 있습니다.
* 하위 프레임 아래는 이미지, 스크립트 및 기본 문서의 
기타 리소스입니다.
* 마지막은 기본 문서 자체입니다.

리소스를 클릭하면 해당 리소스의 미리보기를 볼 수 있습니다.

리소스를 마우스 오른쪽 버튼으로 클릭하면 **Network** 패널에서 보거나 새 탭에서 열거나,
URL을 복사하거나 저장할 수 있습니다.

![리소스 보기][resource]

리소스를 프레임별로 볼 수도 있습니다.
**Sources** 패널에서, 탐색기의 오버플로 메뉴를 클릭한 다음 **Group by folder**
옵션을 비활성화하여 폴더별로 리소스 그룹 지정을 중지하면 됩니다.

![폴더별로 그룹 지정 옵션](imgs/group-by-folder.png)

그러면 리소스가 프레임 기준으로만 나열됩니다.

![폴더 없음](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## 도메인 및 폴더별로 리소스 구성 {:#sources}

리소스를 도메인 및 디렉토리별로 구성하여 보려면, **Sources**
패널을 사용합니다.

![sources 패널](imgs/sources.png)

## 리소스를 이름, 유형 또는 기타 기준으로 필터링 {:#filter}

리소스를 이름, 유형 및 이외에도 광범위한 기타 기준으로
필터링하려면 **Network** 패널을 사용합니다. 자세한 내용은 아래의 가이드를 참조하세요.

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
