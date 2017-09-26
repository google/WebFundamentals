project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Application 패널에서 쿠키를 검사하고 삭제합니다.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# 쿠키 검사 및 삭제 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}


<strong>Application</strong> 패널에서 쿠키를 검사하고 삭제합니다.

![쿠키 창](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- 쿠키에 대한 자세한 정보(이름, 값, 도메인, 크기 등)를 봅니다.
- 쿠키 하나만 삭제하거나 선택한 도메인에서 가져온 쿠키를 삭제하거나 모든 도메인의 모든 쿠키를 삭제합니다.


## 개요 {:#cookies}

쿠키를 보고 삭제하려면 **Cookies** 창을 사용합니다. 쿠키 값은 수정할 수
없습니다.

![쿠키 창][cookies]

쿠키는 도메인별로 나열됩니다. 여기에는 모든 중첩된 프레임은 물론 기본 문서도 
포함됩니다. 이러한 '프레임 그룹' 중 하나를 선택하면 해당 그룹의 모든 리소스, 모든 프레임에 대한 
모든 쿠키가 표시됩니다. 이렇게 그룹을 지정할 경우 유의해야 할 두 가지 결과가 
있습니다.

* 다른 도메인의 쿠키가 같은 프레임 그룹에 표시될 수 있습니다.
* 여러 프레임 그룹에 같은 쿠키가 나타날 수 있습니다.

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

## 필드 {:#fields}

다음 필드는 각 쿠키에 제공됩니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">쿠키 필드 및 설명</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">쿠키의 이름입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">쿠키의 값입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">쿠키의 도메인입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">쿠키의 경로입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">쿠키의 만료 시간 또는 최대 수명입니다. 세션 쿠키의 경우, 이 필드는 항상 'Session'입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">바이트 단위의 쿠키 크기입니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">이 항목이 있는 경우, 쿠키가 HTTP를 통해서만 사용된다는 것을 나타내며 자바스크립트 수정은 허용되지 않습니다.</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">이 항목이 있는 경우, 이 쿠키에 대한 통신이 반드시 암호화된 전송을 통해야 한다는 것을 나타냅니다.</td>
    </tr>
  </tbody>
</table>

## 쿠키 삭제 {:#delete}

쿠키를 삭제할 수 있는 몇 가지 방법이 있습니다.

* 쿠키를 선택하고 **delete** 버튼
(![삭제 버튼][delete]{:.inline})을 누르면 해당 쿠키만 삭제됩니다.
* **clear** 버튼(![지우기 버튼][cos]{:.inline})을 누르면 지정된 프레임 그룹의 모든 
쿠키가 삭제됩니다.
* 쿠키의 **Domain** 값을 마우스 오른쪽 버튼으로 클릭하고 **Clear all
 from "..."** (여기서 **"..."** 은 도메인 이름임)을 선택하면 해당 도메인의 쿠키가 모두
삭제됩니다.

[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
